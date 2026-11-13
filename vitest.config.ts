import { defineConfig } from "vitest/config";

// Tests render with React itself; the extension gets Spotify's at runtime.
export default defineConfig({
  test: {
    environment: "happy-dom",
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["src/test/setup.ts"],
  },
});
