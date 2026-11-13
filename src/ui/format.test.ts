import { describe, expect, it } from "vitest";
import { notMeBy, otherClaimText, securedOn, waitingInstallTitle } from "./claimText";
import { formatBackupDate, formatCount, formatItemCount, joinNames } from "./format";

describe("formatItemCount", () => {
  it("counts items in the singular and plural", () => {
    expect(formatItemCount(1)).toBe("1 item");
    expect(formatItemCount(0)).toBe("0 items");
    expect(formatCount(3, "code")).toBe("3 codes");
  });
});

describe("formatBackupDate", () => {
  const now = new Date(2026, 10, 13, 12, 0);

  it("names today and yesterday", () => {
    expect(formatBackupDate(new Date(2026, 10, 13, 9, 30).toISOString(), now)).toMatch(/^today, /);
    expect(formatBackupDate(new Date(2026, 10, 12, 22, 42).toISOString(), now)).toMatch(/^yesterday, /);
  });

  it("adds the year only for another year", () => {
    expect(formatBackupDate(new Date(2026, 10, 6, 18, 56).toISOString(), now)).not.toContain("2026");
    expect(formatBackupDate(new Date(2025, 10, 6, 18, 56).toISOString(), now)).toContain("2025");
  });

  it("keeps a value it can't read", () => {
    expect(formatBackupDate("not a date", now)).toBe("not a date");
  });
});

describe("joinNames", () => {
  it("joins with commas and a final and", () => {
    expect(joinNames([])).toBe("");
    expect(joinNames(["Comfy"])).toBe("Comfy");
    expect(joinNames(["Lyrics Plus", "Comfy"])).toBe("Lyrics Plus and Comfy");
    expect(joinNames(["Lyrics Plus", "Comfy", "Shuffle+"])).toBe("Lyrics Plus, Comfy and Shuffle+");
  });
});

describe("claim text", () => {
  const today = Date.now();
  const later = new Date(new Date().getFullYear(), 11, 31).getTime();

  it("says today, or the day", () => {
    expect(securedOn(today)).toBe("today");
    expect(notMeBy(today)).toBe("today");
    if (new Date(later).toDateString() !== new Date().toDateString()) {
      expect(securedOn(later)).toMatch(/^on /);
      expect(notMeBy(later)).toMatch(/^by /);
    }
  });

  it("writes someone else's claim as sentences", () => {
    expect(
      otherClaimText({ status: "pending", mine: false, email: null, final_at: today, held: true }),
    ).toBe("Someone is securing this backup. Syncify is checking it.");
    expect(
      otherClaimText({ status: "pending", mine: false, email: null, final_at: today, held: false, not_me: true }),
    ).toBe("Syncify is checking this claim.");
  });

  it("names the waiting install's device when known", () => {
    expect(waitingInstallTitle({ id: "w", device: null, first_seen_at: 0 })).toBe(
      "A new install wants to back up this Spotify account",
    );
  });
});
