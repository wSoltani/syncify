import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";

// Checks registry/registry.json against its schema and against the rules a
// schema can't express. With --out it also writes the compact copy that CI
// uploads as registry.json.

export const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const registryPath = join(rootDir, "registry", "registry.json");
export const schemaPath = join(rootDir, "registry", "registry.schema.json");

// Keys and databases that Spicetify, Marketplace and Syncify use for
// themselves. No item may claim them.
const RESERVED_KEYS = ["marketplace:", "spicetify", "syncify"];
const RESERVED_DATABASES = ["spicetify", "syncify"];

const isPrefix = (key) => key.endsWith("*");
const stem = (key) => (isPrefix(key) ? key.slice(0, -1) : key);

// Whether one key or prefix can match a key the other matches too.
export function keysOverlap(a, b) {
  if (isPrefix(a) && isPrefix(b)) {
    return stem(a).startsWith(stem(b)) || stem(b).startsWith(stem(a));
  }
  if (isPrefix(a)) return b.startsWith(stem(a));
  if (isPrefix(b)) return a.startsWith(stem(b));
  return a === b;
}

// Whether every key that `key` matches is also matched by `cover`.
function covers(cover, key) {
  return isPrefix(cover) ? stem(key).startsWith(stem(cover)) : cover === key;
}

function location(item) {
  const storage = item.storage ?? { type: "localStorage" };
  return storage.type === "indexedDB"
    ? `IndexedDB ${storage.database}/${storage.store}`
    : "localStorage";
}

function overlapsReserved(key, reserved) {
  return reserved.some((name) => keysOverlap(key, `${name}*`));
}

export function checkRegistry(registry, schema) {
  const ajv = new Ajv2020({ allErrors: true, strict: true, strictRequired: false });
  if (!ajv.validate(schema, registry)) {
    return ajv.errors.map(
      (error) => `${error.instancePath || "/"} ${error.message}`,
    );
  }

  const errors = [];
  const { sizes, accountLimit, items } = registry;

  if (!(sizes.small < sizes.medium && sizes.medium < sizes.large)) {
    errors.push("sizes must grow from small to medium to large");
  }
  if (sizes.large > accountLimit) {
    errors.push("sizes.large can't be more than accountLimit");
  }

  items.forEach((item, index) => {
    const previous = items[index - 1];
    if (previous && previous.id >= item.id) {
      errors.push(
        previous.id === item.id
          ? `${item.id} is listed twice`
          : `${item.id} must come before ${previous.id}: items are sorted by id`,
      );
    }
  });

  for (const item of items) {
    const exclude = item.exclude ?? [];
    const lists = Object.keys(item.lists ?? {});
    const storage = item.storage ?? { type: "localStorage" };

    for (const key of item.keys) {
      const excludedBy = exclude.find((excluded) => covers(excluded, key));
      if (excludedBy) {
        errors.push(`${item.id}: ${key} is in keys but ${excludedBy} excludes it`);
      }
    }

    for (const name of lists) {
      if (!item.keys.includes(name)) {
        errors.push(`${item.id}: list ${name} must also be in keys`);
      }
    }

    if (storage.type === "localStorage") {
      for (const key of [...item.keys, ...exclude]) {
        if (overlapsReserved(key, RESERVED_KEYS)) {
          errors.push(
            `${item.id}: ${key} belongs to Spicetify, Marketplace or Syncify`,
          );
        }
      }
    } else if (overlapsReserved(storage.database, RESERVED_DATABASES)) {
      errors.push(
        `${item.id}: database ${storage.database} belongs to Spicetify, Marketplace or Syncify`,
      );
    }
  }

  // Two items writing the same key would overwrite each other on restore.
  // Sorted by stem, every key a claim can clash with follows it directly, so
  // this stays fast however many items the registry grows to.
  const claims = items
    .flatMap((item) =>
      item.keys.map((key) => ({ id: item.id, key, stem: stem(key), where: location(item) })),
    )
    .sort((a, b) =>
      a.where === b.where ? (a.stem < b.stem ? -1 : a.stem > b.stem ? 1 : 0) : a.where < b.where ? -1 : 1,
    );
  for (let i = 0; i < claims.length; i++) {
    const claim = claims[i];
    for (let j = i + 1; j < claims.length; j++) {
      const other = claims[j];
      if (other.where !== claim.where || !other.stem.startsWith(claim.stem)) break;
      if (other.id === claim.id || !keysOverlap(claim.key, other.key)) continue;
      const keys = claim.key === other.key ? claim.key : `${claim.key} and ${other.key}`;
      errors.push(`${claim.id} and ${other.id} both claim ${keys} in ${claim.where}`);
    }
  }

  return errors;
}

export async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function main() {
  const args = process.argv.slice(2);
  const outIndex = args.indexOf("--out");
  const out = outIndex === -1 ? null : args[outIndex + 1];
  const file = args.find((arg, index) => !arg.startsWith("--") && index !== outIndex + 1);

  const registry = await readJson(file ?? registryPath);
  const errors = checkRegistry(registry, await readJson(schemaPath));

  if (errors.length > 0) {
    for (const error of errors) console.error(`::error::${error}`);
    process.exit(1);
  }

  if (out) {
    // Syncify only reads the data, so the copy it downloads leaves out the
    // schema link and spacing.
    const published = { ...registry };
    delete published.$schema;
    await writeFile(out, JSON.stringify(published));
  }
  console.log(`registry.json is valid: ${registry.items.length} items`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await main();
