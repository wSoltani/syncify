import { useEffect } from "react";
import { profileUrl } from "../../api/sharesApi";
import { displayCode, type ShareMode } from "../../core/shareCodes";
import { ChangeList } from "../changes/ChangeList";
import { changesLabel } from "../changes/listChanges";
import { Button, Menu, Notice, SectionHeader, SettingRow, TabPanel, useStableId } from "../kit";
import { openExternal } from "../window/openExternal";
import type { useShareLoad } from "./useShareLoad";

const MODES: [ShareMode, string][] = [
  ["add", "Add to my setup"],
  ["replace", "Replace my setup"],
];

/**
 * What loading a code changes, in place of the tab: how to load it, changes
 * first, the rest folded, warnings written out, and the actions in view.
 */
export function SharePreview(props: {
  idBase: string;
  load: ReturnType<typeof useShareLoad>;
  marketplaceAvailable: boolean | null;
  /** A backup or a restore is running. */
  busy: boolean;
}) {
  const { load } = props;
  const headingId = useStableId("share-heading");
  const file = load.shared?.file;

  // Opened from a field or a row that's gone now: focus moves to the heading.
  useEffect(() => {
    document.getElementById(headingId)?.focus();
  }, [headingId]);

  if (!file || !load.changes) return null;
  const marketplaceMissing = props.marketplaceAvailable === false;
  const creator = file.creator;

  const actions = (
    <>
      <Button variant="secondary" onClick={load.close} disabled={load.applying}>
        Cancel
      </Button>
      <Button
        onClick={() => void load.apply()}
        disabled={load.applying || load.checking || props.busy || marketplaceMissing}
      >
        {load.applying ? "Loading…" : load.checking ? "Checking…" : changesLabel("Load", load.changes.count)}
      </Button>
    </>
  );

  return (
    <TabPanel idBase={props.idBase} id="share" actions={actions}>
      <SectionHeader
        title={`Load ${file.name ?? displayCode(file.code)}`}
        id={headingId}
        focusable
        end={
          creator ? (
            <Button variant="text" onClick={() => openExternal(profileUrl(creator))}>
              {`by @${creator}`}
            </Button>
          ) : undefined
        }
      />
      {load.applyError ? <Notice tone="error">{load.applyError}</Notice> : null}
      {marketplaceMissing ? <Notice tone="warning">Install Spicetify Marketplace to load a setup.</Notice> : null}
      <SettingRow label="How to load it">
        <Menu
          label="How to load it"
          trigger={{ value: MODES.find(([mode]) => mode === load.mode)?.[1] ?? "" }}
          items={MODES.map(([mode, label]) => ({
            label,
            checked: load.mode === mode,
            onSelect: () => load.setMode(mode),
          }))}
          disabled={load.applying}
        />
      </SettingRow>
      <ChangeList
        changes={load.changes}
        label="What loading it changes"
        includeLabel={(name) => `Load ${name}`}
        onInclude={load.allow}
        disabled={load.applying}
      />
      {load.theme ? <Notice tone="info">{`Your theme switches to ${load.theme.name}.`}</Notice> : null}
      {load.changes.warnings.map((warning) => (
        <Notice tone="warning" key={warning}>
          {warning}
        </Notice>
      ))}
    </TabPanel>
  );
}
