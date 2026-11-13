import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

// Code moves onto the shared kit screen by screen; each part is linted once
// it's rebuilt, and the whole of src once the old window is gone.
const linted = [
  "src/react/**/*.ts",
  "src/ui/kit/**/*.{ts,tsx}",
  "src/ui/window/**/*.{ts,tsx}",
  "src/ui/backups/**/*.{ts,tsx}",
  "src/ui/account/secureState.ts",
  "src/ui/share/**/*.{ts,tsx}",
  "src/ui/changes/**/*.{ts,tsx}",
  "src/ui/*.{ts,tsx}",
  "src/test/**/*.ts",
  "vitest.config.ts",
];

export default defineConfig(
  { ignores: ["dist/**", "node_modules/**"] },
  {
    files: linted,
    extends: [js.configs.recommended, tseslint.configs.strict, reactHooks.configs.flat.recommended],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["*.{js,mjs}", "scripts/**/*.mjs"],
    extends: [js.configs.recommended],
    languageOptions: { globals: globals.node },
  },
);
