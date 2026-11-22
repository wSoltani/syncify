import { describe, expect, it } from "vitest";
import { describeOtherClaim, notMeBy, securedOn, undoneClaimTitle, waitingInstallTitle } from "./claimText";
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

  it("writes someone else's claim as a title and a sentence", () => {
    const claim = { status: "pending" as const, mine: false, email: null, final_at: today, held: false };
    expect(describeOtherClaim({ ...claim, held: true }, false)).toEqual({
      title: "Someone is securing this backup",
      text: "Syncify is checking who is securing it.",
    });
    expect(describeOtherClaim({ ...claim, not_me: true }, false)).toEqual({
      title: "Syncify is checking who is securing this backup",
      text: null,
    });
    // Signed out, it can be this person's own claim.
    expect(describeOtherClaim(claim, false).text).toBe(
      "If that's your email, sign in to Syncify here. If it isn't, press Not me today.",
    );
    expect(describeOtherClaim(claim, true).text).toBe("If that isn't you, press Not me today.");
  });

  it("names who no longer secures the backup", () => {
    expect(undoneClaimTitle({ status: "undone", mine: false, email: null, undone_at: 0 })).toBe(
      "This backup is no longer secured by another account",
    );
  });

  it("names the waiting device when known", () => {
    expect(waitingInstallTitle({ id: "w", device: null, first_seen_at: 0 })).toBe(
      "Another device wants to back up this Spotify account",
    );
    expect(waitingInstallTitle({ id: "w", device: "Windows", first_seen_at: 0 })).toBe(
      "Syncify on Windows wants to back up this Spotify account",
    );
  });
});
