import { useEffect, useState } from "react";
import { fetchPicks, type SharePick } from "../../api/sharesApi";
import type { AccountSession } from "../../core/account";
import type { InstalledItem } from "../../core/restorePreview";
import type { SyncifyConfig, SyncifySpicetifyConfig } from "../../types/syncify";
import { formatCount } from "../format";
import { Button, Field, List, ListRow, Meta, Pip, SectionHeader, SettingRow, TabPanel } from "../kit";
import { openExternal } from "../window/openExternal";
import { ComposeCode } from "./ComposeCode";
import { SharePreview } from "./SharePreview";
import { discoverUrl, pickKinds } from "./shareText";
import { useComposeCode } from "./useComposeCode";
import { useShareCodes } from "./useShareCodes";
import { useShareLoad } from "./useShareLoad";
import { YourCodes } from "./YourCodes";

/**
 * Load a setup anyone shared, try a Syncify pick, and signed in, share this
 * setup as a code. A preview or a new code opens in place of the tab.
 */
export function ShareTab(props: {
  idBase: string;
  config: SyncifyConfig;
  /** undefined until the stored session has been read. */
  session: AccountSession | null | undefined;
  localItems: InstalledItem[];
  localConfig: SyncifySpicetifyConfig | null;
  /** Marketplace's active theme here, null when none is set. */
  localTheme: string | null;
  marketplaceAvailable: boolean | null;
  /** A backup or a restore is running. */
  busy: boolean;
  onSignIn(): void;
  onSignedOut(): void;
  onCodeCount(count: number): void;
  onHandle(handle: string | null): void;
}) {
  const { session } = props;
  const load = useShareLoad(props);
  const codes = useShareCodes(props);
  const compose = useComposeCode({
    token: session?.token,
    hasHandle: codes.profile !== null,
    suggestedHandle: codes.suggestedHandle,
    reload: codes.load,
    fail: codes.fail,
  });
  // Syncify picks, read when the tab opens; null until Discover opens (no
  // picks file), which also hides Find more setups and Post to Discover.
  const [picks, setPicks] = useState<SharePick[] | null>(null);

  useEffect(() => {
    void fetchPicks().then(setPicks);
  }, []);

  if (load.shared) {
    return (
      <SharePreview
        idBase={props.idBase}
        load={load}
        marketplaceAvailable={props.marketplaceAvailable}
        busy={props.busy}
      />
    );
  }
  if (compose.compose) return <ComposeCode idBase={props.idBase} compose={compose} />;

  const typed = load.input.trim();
  return (
    <TabPanel idBase={props.idBase} id="share">
      <form
        className="syncify-share-part"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          if (!load.fetching && typed) void load.open();
        }}
      >
        <Field
          label="Load a setup"
          value={load.input}
          onChange={load.setInput}
          placeholder="Paste a code or a link"
          error={load.error}
          action={
            <Button variant="secondary" type="submit" disabled={load.fetching !== null || !typed}>
              {load.fetching && !load.fetching.pick ? "Loading…" : "Load"}
            </Button>
          }
        />
      </form>

      {picks ? (
        <section className="syncify-share-part" aria-label={picks.length > 0 ? "Syncify picks" : "Discover"}>
          {picks.length > 0 ? <SectionHeader title="Syncify picks" /> : null}
          <List>
            {picks.map((pick) => (
              <ListRow
                key={pick.code}
                name={pick.name}
                meta={
                  <Meta
                    parts={[
                      <span className="syncify-share-pips" key="pips">
                        {pickKinds(pick).map((kind, index) => (
                          <Pip kind={kind} key={index} />
                        ))}
                      </span>,
                      load.fetching?.code === pick.code
                        ? "Loading…"
                        : formatCount(pick.extensions + pick.themes + pick.snippets, "item"),
                    ]}
                  />
                }
                onOpen={() => void load.open(pick.code)}
                openLabel={`Preview ${pick.name}`}
                disabled={load.fetching !== null}
              />
            ))}
            <ListRow
              name="Find more setups on Discover"
              end={
                <Button variant="secondary" size="small" onClick={() => openExternal(discoverUrl())}>
                  Open
                </Button>
              }
            />
          </List>
        </section>
      ) : null}

      {session === undefined ? null : session === null ? (
        <div className="syncify-share-part">
          <SettingRow label="Sign in to share this setup as a code">
            <Button variant="secondary" onClick={props.onSignIn}>
              Sign in
            </Button>
          </SettingRow>
        </div>
      ) : (
        <YourCodes
          codes={codes}
          compose={compose}
          discoverOpen={picks !== null}
          marketplaceAvailable={props.marketplaceAvailable}
        />
      )}
    </TabPanel>
  );
}
