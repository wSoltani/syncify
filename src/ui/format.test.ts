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
    const claim = { status: "pending" as const, mine: false, email: null, final_at: today, held: false, can_cancel: true };
    expect(describeOtherClaim({ ...claim, held: true }, false)).toEqual({
      title: "Someone is securing this backup",
      text: "Syncify is checking who is securing it.",
    });
    // Signed out, it can be this person's own claim.
    expect(describeOtherClaim(claim, false).text).toBe(
      "If that's your email, sign in. If it isn't, press Not me today to stop them.",
    );
    expect(describeOtherClaim(claim, true).text).toBe("If that isn't you, press Not me today to stop them.");
  });

  it("promises nothing a Not me can't do", () => {
    // Only a Syncify that backed up here first stops a claim.
    const claim = { status: "pending" as const, mine: false, email: "a@example.com", final_at: today, held: false, can_cancel: false };
    expect(describeOtherClaim(claim, true)).toEqual({
      title: "a@example.com is securing this backup",
      text: "The backups you made here stay yours.",
    });
    expect(describeOtherClaim(claim, false).text).toBe(
      "If that's your email, sign in. If it isn't, the backups you made here stay yours.",
    );
  });

  it("names who secured the backup, and what stays this Syncify's", () => {
    expect(describeOtherClaim({ status: "final", mine: false, email: "a@example.com" }, false)).toEqual({
      title: "This backup is secured by a@example.com",
      text: "If that's your email, sign in to see your backups. If it isn't, the backups you make here stay yours.",
    });
    expect(describeOtherClaim({ status: "final", mine: false }, true)).toEqual({
      title: "This backup is secured",
      text: "You're signed in with a different email. The backups you make here stay yours.",
    });
  });

  it("names who no longer secures the backup", () => {
    expect(undoneClaimTitle({ status: "undone", mine: false, email: null, undone_at: 0 })).toBe(
      "This backup is no longer secured",
    );
  });

  it("asks about backups it can't place, naming the system only when known", () => {
    const now = new Date(2026, 10, 22, 12, 0);
    const nov20 = new Date(2026, 10, 20, 9, 0).getTime();
    expect(waitingInstallTitle({ id: "w", device: "Windows", first_seen_at: nov20 }, now)).toBe(
      "Did you back up from Windows on Nov 20?",
    );
    expect(waitingInstallTitle({ id: "w", device: null, first_seen_at: nov20 }, now)).toBe(
      "Did you back up with Syncify on Nov 20?",
    );
    // A raw user agent isn't a name.
    expect(waitingInstallTitle({ id: "w", device: "Mozilla/5.0 (X11)", first_seen_at: nov20 }, now)).toBe(
      "Did you back up with Syncify on Nov 20?",
    );
    expect(waitingInstallTitle({ id: "w", device: "macOS", first_seen_at: now.getTime() }, now)).toBe(
      "Did you back up from macOS today?",
    );
  });
});
