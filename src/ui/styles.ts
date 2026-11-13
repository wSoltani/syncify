import { kitStyles } from "./kit/styles";
import shell from "./window/shell.css";
import window from "./window/window.css";
import backups from "./backups/backups.css";
import changes from "./changes/changes.css";
import share from "./share/share.css";
import account from "./account/account.css";
import settings from "./settings/settings.css";
import notices from "./notices/notices.css";

/** Every Syncify style, the kit first so screens can build on it. */
export const syncifyStyles = [kitStyles, shell, window, changes, backups, share, account, settings, notices].join("\n");
