import { useEffect } from "react";
import type { ItemType } from "../../core/restorePreview";
import { HANDLE_MAX, NAME_MAX } from "../../core/shareCodes";
import { describeCheck } from "../changes/listChanges";
import { formatItemCount } from "../format";
import {
  Button,
  Field,
  List,
  ListRow,
  Meta,
  Notice,
  Pip,
  SectionHeader,
  SkeletonRow,
  TabPanel,
  useStableId,
  type Kind,
} from "../kit";
import { codeTitle } from "./shareText";
import type { useComposeCode } from "./useComposeCode";

const KINDS: Record<ItemType, Kind> = { extension: "extension", theme: "theme", snippet: "snippet" };

/**
 * Making a code, or updating one, in place of the tab: its name, a handle
 * when the account has none, then every item, with what's left out first so
 * it can't be missed.
 */
export function ComposeCode(props: { idBase: string; compose: ReturnType<typeof useComposeCode> }) {
  const { compose } = props;
  const headingId = useStableId("compose-heading");
  const updating = compose.compose?.code ?? null;
  const { draft, saving } = compose;

  useEffect(() => {
    document.getElementById(headingId)?.focus();
  }, [headingId]);

  const items = draft
    ? [...draft.items].sort(
        (a, b) =>
          Number(draft.leftOut.has(b.key)) - Number(draft.leftOut.has(a.key)) || a.name.localeCompare(b.name),
      )
    : [];

  const actions = (
    <>
      <Button variant="secondary" onClick={compose.cancel} disabled={saving}>
        Cancel
      </Button>
      <Button onClick={() => void compose.save()} disabled={!draft || compose.included.length === 0 || saving}>
        {!draft
          ? "Checking…"
          : saving
            ? updating
              ? "Updating…"
              : "Creating…"
            : updating
              ? "Update code"
              : "Create code"}
      </Button>
    </>
  );

  return (
    <TabPanel idBase={props.idBase} id="share" actions={actions}>
      <SectionHeader
        title={updating ? `Update ${codeTitle(updating)}` : "Create a code"}
        id={headingId}
        focusable
      />
      {compose.error ? <Notice tone="error">{compose.error}</Notice> : null}
      <Field
        label="Setup name (optional)"
        value={compose.name}
        onChange={compose.setName}
        maxLength={NAME_MAX}
        disabled={saving}
      />
      {compose.askHandle ? (
        <Field
          label="Pick a handle for your profile"
          value={compose.handle}
          onChange={compose.setHandle}
          onBlur={compose.checkHandle}
          error={compose.handleError}
          prefix="@"
          maxLength={HANDLE_MAX}
          disabled={saving}
        />
      ) : null}
      {draft && compose.included.length === 0 ? (
        <Notice tone="warning">Nothing here can go in a code. Add something from Marketplace first.</Notice>
      ) : null}
      <SectionHeader
        title="What goes in"
        end={draft ? <Meta parts={[formatItemCount(compose.included.length)]} /> : undefined}
      />
      {draft ? (
        <List label="What goes in">
          {items.map((item) => {
            const check = draft.leftOut.get(item.key);
            const meta = [check ? describeCheck(check) : null, item.repo].filter(Boolean);
            return (
              <ListRow
                key={item.key}
                leading={<Pip kind={KINDS[item.type]} />}
                name={item.name}
                meta={meta.length > 0 ? <Meta parts={meta} /> : undefined}
                end={check ? <span className="syncify-change-label syncify-cap">Left out</span> : undefined}
              />
            );
          })}
        </List>
      ) : (
        <List label="Checking your items">
          <SkeletonRow />
          <SkeletonRow />
        </List>
      )}
    </TabPanel>
  );
}
