import { afterEach, expect, it, vi } from "vitest";
import { createPayload, hashSnapshot } from "./marketplace";

afterEach(() => {
  localStorage.clear();
  vi.unstubAllGlobals();
});

it("carries registered settings in a backup, out of its hash", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () =>
      Response.json({
        format: 1,
        sizes: { small: 16384, medium: 65536, large: 131072 },
        accountLimit: 262144,
        items: [{ id: "someone/trash/trash.js", addedBy: "owner", keys: ["trash-enabled"], exclude: [] }],
      }),
    ),
  );
  vi.stubGlobal("Spicetify", {});
  localStorage.setItem("marketplace:installed-extensions", "[]");
  localStorage.setItem("trash-enabled", "true");

  const payload = await createPayload();

  expect(payload.extension_settings).toEqual({
    "someone/trash/trash.js": { storage: "localStorage", values: { "trash-enabled": "true" } },
  });
  expect(payload.payload_hash).toBe(await hashSnapshot(payload.marketplace_data.keys, payload.spicetify_config));
});
