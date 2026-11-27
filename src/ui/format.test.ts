import { describe, expect, it } from "vitest";
import { describeSecuredElsewhere, waitingInstallTitle } from "./claimText";
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
  it("names who secured the backup, and what stays this Syncify's", () => {
    const one = { status: "final" as const, mine: false as const, emails: ["a@example.com"] };
    expect(describeSecuredElsewhere(one, false)).toEqual({
      title: "This backup is secured by a@example.com",
      text: "If that's your email, sign in to see your backups. If it isn't, the backups you make here stay yours.",
    });
    expect(describeSecuredElsewhere(one, true).text).toBe(
      "You're signed in with a different email. The backups you make here stay yours.",
    );

    const three = { ...one, emails: ["a@example.com", "b@example.com", "c@example.com"] };
    expect(describeSecuredElsewhere(three, false)).toEqual({
      title: "This backup is secured by a@example.com, b@example.com and c@example.com",
      text: "If one of them is your email, sign in to see your backups. If none is, the backups you make here stay yours.",
    });
    expect(describeSecuredElsewhere({ ...one, emails: three.emails.slice(0, 2) }, true).title).toBe(
      "This backup is secured by a@example.com and b@example.com",
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
