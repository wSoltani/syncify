import { kitStyles } from "./kit/styles";
import shell from "./window/shell.css";
import window from "./window/window.css";
import backups from "./backups/backups.css";
import account from "./account/account.css";
import settings from "./settings/settings.css";
import notices from "./notices/notices.css";
// The Share tab, until it moves to the kit.
import legacy from "./legacy.css";

/** Every Syncify style, the kit first so screens can build on it. */
export const syncifyStyles = [kitStyles, shell, window, backups, account, settings, notices, legacy].join("\n");
