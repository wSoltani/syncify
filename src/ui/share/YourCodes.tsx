import { useEffect, useState } from "react";
import type { ShareCode } from "../../api/sharesApi";
import { displayCode } from "../../core/shareCodes";
import { copyToClipboard } from "../clipboard";
import { formatCount } from "../format";
import { Button, Dialog, List, ListRow, Menu, Meta, Meter, Notice, SectionHeader, SkeletonRow } from "../kit";
import { openExternal } from "../window/openExternal";
import { codeFacts, codeTitle, deleteCodeText, discoverUrl } from "./shareText";
import type { SavedCode, useComposeCode } from "./useComposeCode";
import type { useShareCodes } from "./useShareCodes";

// How long Copy and Get link say Copied.
const COPIED_SHOWN_MS = 2000;

/**
 * The account's codes against its limit, each with Copy and Get link, the
 * rest behind its ⋯ menu, then Create a code.
 */
export function YourCodes(props: {
  codes: ReturnType<typeof useShareCodes>;
  compose: ReturnType<typeof useComposeCode>;
  /** Discover is open, so a code can be posted there. */
  discoverOpen: boolean;
  marketplaceAvailable: boolean | null;
}) {
  const { codes, compose } = props;
  const [deleting, setDeleting] = useState<ShareCode | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(null), COPIED_SHOWN_MS);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy(text: string, id: string) {
    if (await copyToClipboard(text)) setCopied(id);
  }

  async function confirmDelete() {
    if (!deleting) return;
    if (await codes.remove(deleting.code)) {
      compose.forgetSaved(deleting.code);
      setDeleting(null);
    }
  }

  const list = codes.codes;
  return (
    <section className="syncify-share-part" aria-label="Your codes">
      <SectionHeader
        title={
          <>
            Your codes
            {codes.newHearts > 0 ? (
              <span className="syncify-share-hearts">{formatCount(codes.newHearts, "new heart")}</span>
            ) : null}
          </>
        }
        end={list && codes.max !== null ? <Meter used={list.length} max={codes.max} label="Share codes" /> : undefined}
      />
      {codes.error ? (
        <Notice
          tone="error"
          actions={
            <Button variant="text" onClick={() => void codes.load()}>
              Try again
            </Button>
          }
        >
          {codes.error}
        </Notice>
      ) : null}
      {compose.saved ? (
        <SavedNotice
          saved={compose.saved}
          copied={copied}
          onCopy={(text, id) => void copy(text, id)}
          discoverOpen={props.discoverOpen}
          onDismiss={compose.dismissSaved}
        />
      ) : null}
      {compose.error && !compose.compose ? <Notice tone="error">{compose.error}</Notice> : null}
      {list === null ? (
        codes.error ? null : (
          <List label="Loading your codes">
            <SkeletonRow />
          </List>
        )
      ) : list.length > 0 ? (
        <List label="Your codes">
          {list.map((code) => (
            <ListRow
              key={code.code}
              name={codeTitle(code)}
              meta={
                <Meta
                  parts={[
                    code.name ? <code className="syncify-share-code">{displayCode(code.code)}</code> : null,
                    ...codeFacts(code),
                  ]}
                />
              }
              end={
                <span className="syncify-share-code-actions">
                  <Button variant="text" onClick={() => void copy(displayCode(code.code), `code:${code.code}`)}>
                    {copied === `code:${code.code}` ? "Copied" : "Copy"}
                  </Button>
                  {code.link ? (
                    <Button variant="text" onClick={() => void copy(code.link ?? "", `link:${code.code}`)}>
                      {copied === `link:${code.code}` ? "Copied" : "Get link"}
                    </Button>
                  ) : null}
                  <Menu
                    trigger="more"
                    label={`More for ${codeTitle(code)}`}
                    disabled={compose.compose !== null || codes.deleting}
                    items={[
                      { label: "Update", onSelect: () => void compose.start(code) },
                      ...(props.discoverOpen && !code.posted
                        ? [{ label: "Post to Discover", onSelect: () => openExternal(discoverUrl(code.code)) }]
                        : []),
                      { label: "Delete", danger: true, onSelect: () => setDeleting(code) },
                    ]}
                  />
                </span>
              }
            />
          ))}
        </List>
      ) : null}
      {list !== null ? (
        <div className="syncify-share-create">
          <Button
            variant="secondary"
            onClick={() => void compose.start(null)}
            disabled={compose.compose !== null || codes.atMax || props.marketplaceAvailable === false}
          >
            Create a code
          </Button>
        </div>
      ) : null}
      <Dialog
        open={deleting !== null}
        onClose={() => setDeleting(null)}
        title={deleting ? `Delete ${codeTitle(deleting)}` : ""}
        actions={
          <>
            <Button variant="secondary" onClick={() => setDeleting(null)} disabled={codes.deleting}>
              Keep it
            </Button>
            <Button variant="danger" onClick={() => void confirmDelete()} disabled={codes.deleting}>
              {codes.deleting ? "Deleting…" : "Delete code"}
            </Button>
          </>
        }
      >
        {deleting ? deleteCodeText(deleting) : null}
      </Dialog>
    </section>
  );
}

/** The code just made or updated, ready to copy, or the one that holds this setup already. */
function SavedNotice(props: {
  saved: SavedCode;
  copied: string | null;
  onCopy(text: string, id: string): void;
  discoverOpen: boolean;
  onDismiss(): void;
}) {
  const { saved } = props;
  const code = displayCode(saved.code);
  const link = saved.link;
  const title =
    saved.outcome === "existing"
      ? "You shared this setup already as"
      : saved.outcome === "updated"
        ? "Code updated:"
        : "Your code is ready:";

  return (
    <Notice
      tone="info"
      live
      actions={
        <>
          <Button variant="text" onClick={() => props.onCopy(code, "saved-code")}>
            {props.copied === "saved-code" ? "Copied" : "Copy"}
          </Button>
          {link ? (
            <Button variant="text" onClick={() => props.onCopy(link, "saved-link")}>
              {props.copied === "saved-link" ? "Copied" : "Get link"}
            </Button>
          ) : null}
          {/* A new code, once Discover is open: the website's Post your setup, started on it. */}
          {saved.outcome === "created" && props.discoverOpen ? (
            <Button variant="text" onClick={() => openExternal(discoverUrl(saved.code))}>
              Post to Discover
            </Button>
          ) : null}
          <Button variant="subtle" onClick={props.onDismiss}>
            Dismiss
          </Button>
        </>
      }
    >
      <span>
        {title} <code className="syncify-share-code">{code}</code>
      </span>
      {saved.leftOut > 0 ? (
        <span className="syncify-share-left-out">
          {saved.leftOut === 1
            ? "1 snippet isn't in Marketplace's list anymore, so it was left out."
            : `${saved.leftOut} snippets aren't in Marketplace's list anymore, so they were left out.`}
        </span>
      ) : null}
    </Notice>
  );
}
