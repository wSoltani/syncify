import { describe, expect, it } from "vitest";
import { cleanPairingCode, formatPairingCode, pairingCode } from "./pairingCode";

describe("pairingCode", () => {
  // The backup service's test checks the same key and code (test/trust.spec.ts).
  it("gives the code the backup service works out for the same key", async () => {
    expect(await pairingCode("syncify-pairing-test-key")).toBe("K1CYES");
  });

  it("shows it in two halves and reads it back however it was typed", () => {
    expect(formatPairingCode("K1CYES")).toBe("K1C YES");
    expect(cleanPairingCode(" k1c-yes ")).toBe("K1CYES");
  });
});
