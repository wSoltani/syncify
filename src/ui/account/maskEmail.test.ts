import { describe, expect, it } from "vitest";
import { maskEmail } from "./maskEmail";
import { formatCountdown } from "./useSignIn";

describe("maskEmail", () => {
  it("keeps the first and last letter, one star for each letter between", () => {
    expect(maskEmail("alice@example.com")).toBe("a***e@example.com");
    expect(maskEmail("abc@example.com")).toBe("a*c@example.com");
  });

  it("keeps names of two letters or fewer, and text that isn't an email", () => {
    expect(maskEmail("ab@example.com")).toBe("ab@example.com");
    expect(maskEmail("not an email")).toBe("not an email");
  });
});

describe("formatCountdown", () => {
  it("writes minutes and two-digit seconds", () => {
    expect(formatCountdown(45)).toBe("0:45");
    expect(formatCountdown(65)).toBe("1:05");
  });
});
