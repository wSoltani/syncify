import type { AccountTabStatus } from "../account/secureState";
import { formatCount } from "../format";
import { Badge, CheckIcon, Mark, Tabs, type TabItem } from "../kit";

export type WindowTab = "backups" | "share" | "account" | "settings";

/**
 * Backups, Share, Account and Settings, each with what's worth knowing
 * before opening it: the code count, a check or a mark, and an update.
 */
export function WindowTabs(props: {
  idBase: string;
  selected: WindowTab;
  onSelect(tab: WindowTab): void;
  /** Signed in with share codes. */
  codeCount: number | null;
  account: AccountTabStatus | null;
  /** A newer Syncify is out. */
  newerVersion: string | null;
}) {
  const { codeCount, account, newerVersion } = props;
  const tabs: TabItem<WindowTab>[] = [
    { id: "backups", label: "Backups" },
    {
      id: "share",
      label: "Share",
      status: codeCount ? <Badge count={codeCount} label={formatCount(codeCount, "code")} /> : undefined,
    },
    {
      id: "account",
      label: "Account",
      status: !account ? undefined : account.kind === "ok" ? (
        <span className="syncify-tab-check" role="img" aria-label={account.label}>
          <CheckIcon />
        </span>
      ) : (
        <Mark tone="warning" label={account.label} />
      ),
    },
    {
      id: "settings",
      label: "Settings",
      status: newerVersion ? <Mark tone="info" label={`Syncify ${newerVersion} is out`} /> : undefined,
    },
  ];

  return <Tabs tabs={tabs} selected={props.selected} onSelect={props.onSelect} idBase={props.idBase} label="Syncify" />;
}
