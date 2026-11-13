import { kitStyles } from "./kit/styles";
import shell from "./window/shell.css";
import window from "./window/window.css";
import backups from "./backups/backups.css";
// Share, Account, Settings and the launch notices, until they move to the kit.
import legacy from "./legacy.css";

/** Every Syncify style, the kit first so screens can build on it. */
export const syncifyStyles = [kitStyles, shell, window, backups, legacy].join("\n");
