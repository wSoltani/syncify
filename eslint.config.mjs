import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

// Spicetify's own type declarations are copied in as they are.
const vendored = ["src/types/spicetify.d.ts"];

export default defineConfig(
  { ignores: ["dist/**", "node_modules/**", ...vendored] },
  {
    files: ["src/**/*.{ts,tsx}", "vitest.config.ts"],
    extends: [js.configs.recommended, tseslint.configs.strict, reactHooks.configs.flat.recommended],
    languageOptions: { globals: globals.browser },
    rules: {
      // Marketplace's storage is a plain map of keys: dropping one is a delete.
      "@typescript-eslint/no-dynamic-delete": "off",
    },
  },
  {
    files: ["*.{js,mjs}", "scripts/**/*.mjs"],
    extends: [js.configs.recommended],
    languageOptions: { globals: globals.node },
  },
);
