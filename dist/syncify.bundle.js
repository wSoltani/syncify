// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var rc=Object.defineProperty,cc=Object.defineProperties;var lc=Object.getOwnPropertyDescriptors;var Et=Object.getOwnPropertySymbols;var Fa=Object.prototype.hasOwnProperty,Ya=Object.prototype.propertyIsEnumerable;var ja=(e,n,t)=>n in e?rc(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,g=(e,n)=>{for(var t in n||(n={}))Fa.call(n,t)&&ja(e,t,n[t]);if(Et)for(var t of Et(n))Ya.call(n,t)&&ja(e,t,n[t]);return e},N=(e,n)=>cc(e,lc(n));var xi=(e,n)=>{var t={};for(var i in e)Fa.call(e,i)&&n.indexOf(i)<0&&(t[i]=e[i]);if(e!=null&&Et)for(var i of Et(e))n.indexOf(i)<0&&Ya.call(e,i)&&(t[i]=e[i]);return t};var Un,$,yc,uc,fc,dc,pc,mc,gc;function Wa(e){({createElement:Un,Fragment:$,useCallback:yc,useEffect:uc,useLayoutEffect:fc,useMemo:dc,useReducer:pc,useRef:mc,useState:gc}=e)}var qa=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
   Spotify modal can size naturally instead of being forced/cropped. */
.syncify-modal-shell .main-trackCreditsModal-header,
.main-trackCreditsModal-header:has(+ * .syncify-panel),
.main-trackCreditsModal-header:has(~ * .syncify-panel) {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 12px !important;
    padding: 16px 20px 8px !important;
}

.syncify-modal-shell .main-trackCreditsModal-header h1,
.main-trackCreditsModal-header:has(+ * .syncify-panel) h1,
.main-trackCreditsModal-header:has(~ * .syncify-panel) h1 {
    margin: 0 !important;
    font-size: 18px !important;
    line-height: 1.25 !important;
}

/* The mark before the title. */
.syncify-modal-shell .main-trackCreditsModal-header h1 {
    display: flex !important;
    align-items: center !important;
    gap: 10px !important;
}

.syncify-modal-mark {
    display: inline-flex;
    flex: 0 0 auto;
}

.syncify-modal-shell .main-trackCreditsModal-mainSection,
.syncify-modal-shell .main-trackCreditsModal-content,
.main-trackCreditsModal-mainSection:has(.syncify-panel),
.main-trackCreditsModal-content:has(.syncify-panel) {
    box-sizing: border-box !important;
    max-height: calc(100vh - 140px) !important;
    padding: 10px 20px 18px !important;
    overflow-y: auto !important;
    overflow-x: hidden !important;
}

.syncify-modal-shell .syncify-modal-close {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 32px !important;
    height: 32px !important;
    min-width: 32px !important;
    padding: 0 !important;
    border: 0 !important;
    border-radius: 999px !important;
    color: var(--spice-subtext) !important;
    background: transparent !important;
    cursor: pointer !important;
    /* A tall window reaches up under Spotify's title bar, which drags the
       window and takes the clicks. */
    -webkit-app-region: no-drag !important;
    transition:
        color 120ms ease,
        background-color 120ms ease,
        transform 120ms ease !important;
}

.syncify-modal-shell .syncify-modal-close svg {
    width: 18px !important;
    height: 18px !important;
    fill: none !important;
    stroke: currentColor !important;
    stroke-width: 2 !important;
    stroke-linecap: round !important;
    stroke-linejoin: round !important;
    pointer-events: none !important;
}

.syncify-modal-shell .syncify-modal-close:hover {
    color: var(--spice-text) !important;
    background: rgba(255, 255, 255, 0.12) !important;
}

.syncify-modal-shell .syncify-modal-close:active {
    transform: scale(0.96) !important;
}

/* Colors come from the active Spicetify theme, with Spotify's defaults as
   fallbacks, so Syncify blends into whatever theme the user runs. */
.syncify-panel {
    --syncify-text: var(--spice-text, #fff);
    --syncify-muted: var(--spice-subtext, #b3b3b3);
    --syncify-accent: var(--spice-button, #1ed760);
    --syncify-accent-text: var(--spice-button-text, #000);
    --syncify-warning: #f6c343;
    --syncify-error: var(--spice-notification-error, #f15e6c);
    --syncify-surface: rgba(var(--spice-rgb-text, 255, 255, 255), 0.06);
    --syncify-surface-hover: rgba(var(--spice-rgb-text, 255, 255, 255), 0.1);
    --syncify-divider: rgba(var(--spice-rgb-text, 255, 255, 255), 0.1);

    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    min-width: 0;
    color: var(--syncify-text);
    font-size: 14px;
    line-height: 1.45;
}

.syncify-panel *,
.syncify-panel *::before {
    box-sizing: border-box;
}

/* The claim notice shown when Spotify starts */

.syncify-claim-notice {
    margin: 0;
}

.syncify-muted {
    margin: 0;
    color: var(--syncify-muted);
    font-size: 13px;
}

/* Status */

.syncify-status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
}

.syncify-status-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
}

.syncify-status-title {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.25;
}

.syncify-alert {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 12px;
    border-left: 3px solid var(--syncify-warning);
    border-radius: 4px;
    background: var(--syncify-surface);
    font-size: 13px;
}

.syncify-alert[data-kind="error"] {
    border-left-color: var(--syncify-error);
}

.syncify-alert-actions {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 12px;
}

.syncify-manual {
    flex-direction: column;
    align-items: stretch;
}

.syncify-manual-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

.syncify-code {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 8px 10px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.35);
}

.syncify-code code {
    flex: 1 1 auto;
    min-width: 0;
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    font-size: 12px;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    user-select: all;
}

.syncify-alert .syncify-code .syncify-text-button {
    font-weight: 700;
}

.syncify-inline-button {
    font-size: inherit;
    text-decoration: underline;
}

/* The Secure nudge, under the status */

.syncify-nudge {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 8px;
    background: var(--syncify-surface);
}

.syncify-nudge .syncify-setting-text {
    flex: 1 1 auto;
}

.syncify-nudge-actions {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 16px;
}

/* Sections */

.syncify-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 16px;
    border-top: 1px solid var(--syncify-divider);
}

.syncify-section-title,
.syncify-accordion-title {
    margin: 0 0 4px;
    color: var(--syncify-muted);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.syncify-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

.syncify-section-header .syncify-section-title {
    margin-bottom: 0;
}

.syncify-section-controls {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
}

/* Accordion: one section open at a time */

.syncify-accordion {
    display: flex;
    flex-direction: column;
}

.syncify-accordion-header {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    min-height: 44px;
    padding: 0 8px 0 0;
    border: 0;
    border-top: 1px solid var(--syncify-divider);
    color: var(--syncify-muted);
    background: none;
    font: inherit;
    text-align: left;
    cursor: pointer;
}

.syncify-accordion-title {
    flex: 1 1 auto;
    margin: 0;
    color: inherit;
}

.syncify-accordion-header:hover,
.syncify-accordion-header[aria-expanded="true"] {
    color: var(--syncify-text);
}

.syncify-accordion-body {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 4px 0 12px;
}

.syncify-chevron {
    flex: 0 0 auto;
    width: 16px;
    height: 16px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: transform 150ms ease;
}

/* A closed section's status, as an icon before its chevron. */
.syncify-accordion-status {
    display: inline-flex;
    flex: 0 0 auto;
}

.syncify-accordion-status svg {
    width: 16px;
    height: 16px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.syncify-accordion-status[data-kind="ok"] {
    color: var(--syncify-accent);
}

.syncify-accordion-status[data-kind="warning"],
.syncify-accordion-status[data-kind="pending"] {
    color: var(--syncify-warning);
}

.syncify-accordion-status[data-kind="count"] {
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    color: var(--syncify-text);
    background: var(--syncify-surface-hover);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0;
}

.syncify-accordion-status[data-kind="dot"]::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: var(--syncify-accent);
}

[aria-expanded="true"] > .syncify-chevron {
    transform: rotate(90deg);
}

.syncify-disclosure {
    display: inline-flex;
    align-items: center;
    gap: 4px;
}

.syncify-disclosure .syncify-chevron {
    width: 14px;
    height: 14px;
}

/* Backups */

.syncify-backup-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.syncify-backup {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 8px 10px;
    border: 0;
    border-radius: 6px;
    color: inherit;
    background: transparent;
    font: inherit;
    text-align: left;
    cursor: pointer;
}

.syncify-backup:hover:not(:disabled),
.syncify-backup[data-selected="true"] {
    background: var(--syncify-surface);
}

.syncify-backup:disabled {
    cursor: default;
    opacity: 0.6;
}

.syncify-radio {
    flex: 0 0 auto;
    width: 16px;
    height: 16px;
    border: 2px solid var(--syncify-muted);
    border-radius: 50%;
}

.syncify-backup[data-selected="true"] .syncify-radio {
    border: 5px solid var(--syncify-accent);
}

.syncify-backup-text {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-width: 0;
}

.syncify-backup-date::first-letter {
    text-transform: uppercase;
}

.syncify-backup-text > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* Holds the first backup's place until the backups are read. */
.syncify-backup-skeleton {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 10px;
}

.syncify-backup-text > .syncify-skeleton-line {
    width: 120px;
    height: 12px;
    margin: 4px 0;
    border-radius: 4px;
    background: var(--syncify-surface-hover);
}

.syncify-backup-text > .syncify-skeleton-line.wide {
    width: 200px;
}

/* The safety copy sits apart, below the recent backups. */
.syncify-backup-divider {
    margin: 6px 0 2px;
    border-top: 1px dashed var(--syncify-divider);
}

.syncify-shield {
    flex: 0 0 auto;
    width: 18px;
    height: 18px;
    fill: var(--syncify-muted);
}

.syncify-backup-note {
    color: var(--syncify-muted);
    font-size: 12px;
}

/* The dot between facts: drawn, its middle on the middle of the capitals. */
.syncify-sep {
    display: inline-block;
    flex-shrink: 0;
    width: 4px;
    height: 4px;
    margin: 0 0.4em;
    border-radius: 50%;
    background: currentColor;
    vertical-align: calc(0.5cap - 2px);
}

.syncify-sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: pre;
    border: 0;
}

.syncify-parts {
    min-width: 0;
}

.syncify-tag {
    flex: 0 0 auto;
    padding: 2px 8px;
    border-radius: 999px;
    color: var(--syncify-muted);
    background: var(--syncify-surface);
    font-size: 12px;
    font-weight: 600;
}

.syncify-confirm {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px;
    border-radius: 6px;
    background: var(--syncify-surface);
}

.syncify-confirm p {
    margin: 0;
}

.syncify-confirm-title {
    font-weight: 700;
}

.syncify-confirm > .syncify-disclosure {
    align-self: flex-start;
}

/* Account */

.syncify-field {
    display: flex;
    align-items: center;
    gap: 8px;
}

.syncify-input {
    flex: 1 1 auto;
    min-width: 0;
    padding: 8px 10px;
    border: 0;
    border-radius: 4px;
    color: var(--syncify-text);
    background: var(--syncify-surface-hover);
    font: inherit;
    font-size: 14px;
}

.syncify-input::placeholder {
    color: var(--syncify-muted);
    opacity: 1;
}

.syncify-code-input {
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    letter-spacing: 0.3em;
}

.syncify-account-links {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.syncify-account-email {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.syncify-account-state {
    display: inline-flex;
    align-items: center;
    gap: 6px;
}

.syncify-clock,
.syncify-lock,
.syncify-external {
    flex: 0 0 auto;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.syncify-clock {
    width: 14px;
    height: 14px;
}

.syncify-lock {
    width: 16px;
    height: 16px;
}

.syncify-external {
    width: 12px;
    height: 12px;
}

.syncify-account-actions {
    display: flex;
    flex: 0 0 auto;
    flex-wrap: wrap;
    gap: 16px;
}

/* A secured backup on a device that isn't signed in to it */
.syncify-locked {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0;
    padding: 8px 10px;
    color: var(--syncify-muted);
    font-size: 13px;
}

/* Restore preview */

.syncify-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.syncify-chip {
    padding: 2px 10px;
    border-radius: 999px;
    color: var(--syncify-muted);
    background: var(--syncify-surface-hover);
    font-size: 12px;
    font-weight: 700;
}

.syncify-chip[data-change="added"],
.syncify-mark[data-change="added"] {
    color: var(--syncify-accent);
}

.syncify-chip[data-change="removed"],
.syncify-mark[data-change="removed"] {
    color: var(--syncify-error);
}

.syncify-chip[data-change="off"] {
    color: var(--syncify-warning);
}

.syncify-changes {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.syncify-change-group {
    margin: 0 0 2px;
    color: var(--syncify-muted);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.syncify-change-list {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    list-style: none;
}

.syncify-change {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 28px;
    font-size: 13px;
}

.syncify-mark {
    flex: 0 0 auto;
    width: 16px;
    color: var(--syncify-muted);
    font-weight: 700;
    text-align: center;
}

.syncify-change-name {
    flex: 1 1 auto;
    min-width: 0;
    overflow-wrap: anywhere;
}

.syncify-change-detail {
    color: var(--syncify-muted);
}

.syncify-source {
    display: inline-flex;
    flex: 0 1 auto;
    align-items: center;
    max-width: 50%;
    overflow-wrap: anywhere;
    gap: 4px;
    color: var(--syncify-muted);
    font-size: 12px;
}

/* Turns on an item a restore leaves off by default. */
.syncify-item-switch {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 4px;
    color: var(--syncify-muted);
    font-size: 12px;
    cursor: pointer;
}

.syncify-item-switch input {
    margin: 0;
    accent-color: var(--syncify-accent);
}

.syncify-warning-icon {
    flex: 0 0 auto;
    width: 14px;
    height: 14px;
    fill: none;
    stroke: var(--syncify-warning);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.syncify-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
}

.syncify-actions-hint {
    flex: 1 1 200px;
}

/* Share codes */

.syncify-share-code code {
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    letter-spacing: 0.05em;
}

/* The code field: as tall and round as the Preview button beside it, in the
   code font once something is typed. */
.syncify-share-input {
    height: 40px;
    padding: 0 16px;
    border-radius: 999px;
    box-shadow: inset 0 0 0 1px transparent;
    transition: box-shadow 120ms ease;
}

.syncify-share-input:not(:placeholder-shown) {
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    letter-spacing: 0.05em;
}

.syncify-share-input:hover:not(:disabled) {
    box-shadow: inset 0 0 0 1px var(--syncify-muted);
}

.syncify-share-input + .syncify-button {
    height: 40px;
}

/* Add to my setup and Replace my setup, side by side. */
.syncify-share-modes {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.syncify-share-modes .syncify-backup {
    flex: 1 1 160px;
    width: auto;
}

/* Loading a code, then sharing this setup, split by a dashed line: solid
   lines only split sections. */
.syncify-share-load {
    flex-wrap: wrap;
    gap: 8px 12px;
}

.syncify-share-load-label {
    flex: 0 0 auto;
    color: var(--syncify-text);
}

.syncify-share-title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
}

/* A first code's handle and the code's name: labels in one column, inputs
   sized for what they hold rather than the whole row. */
.syncify-share-handle-note {
    grid-column: 1 / -1;
    /* Wraps within the columns instead of widening them. */
    contain: inline-size;
    margin: 4px 0 0;
}

.syncify-share-handle-problem {
    grid-column: 2;
    color: var(--syncify-error);
}

.syncify-share-fields {
    display: grid;
    grid-template-columns: max-content minmax(0, 260px);
    justify-content: start;
    align-items: center;
    gap: 8px 12px;
}

/* A first code's handle: the @ stays put in front of what's typed. */
.syncify-handle-input {
    display: flex;
    align-items: center;
    gap: 2px;
    color: var(--syncify-muted);
}

.syncify-handle-input:has(input:focus-visible) {
    outline: 2px solid var(--syncify-text);
    outline-offset: 2px;
}

.syncify-handle-input input {
    flex: 1 1 auto;
    min-width: 0;
    padding: 0;
    border: 0;
    color: var(--syncify-text);
    background: none;
    font: inherit;
}

.syncify-panel .syncify-handle-input input:focus-visible {
    outline: 0;
}

.syncify-share-part {
    margin-top: 4px;
    padding-top: 12px;
    border-top: 1px dashed var(--syncify-divider);
}

.syncify-share-code {
    align-items: center;
}

.syncify-share-code code {
    font-size: 14px;
    font-weight: 700;
}

.syncify-text-button[data-danger="true"],
.syncify-text-button[data-danger="true"]:hover:not(:disabled) {
    color: var(--syncify-error);
}

/* Your codes, one card with a row per code. */
section[aria-label="Your codes"] {
    margin-top: 8px;
}

.syncify-share-codes {
    padding: 0 12px;
    border-radius: 8px;
    background: var(--syncify-surface);
}

.syncify-share-codes > li {
    padding: 10px 0;
}

/* Syncify picks: each item a square in its kind's color (Syncify's kind
   colors, as on the website), then the count. */
.syncify-pick-detail {
    display: flex;
    align-items: center;
    gap: 8px;
}

.syncify-pips {
    display: inline-flex;
    gap: 3px;
}

.syncify-pip {
    width: 8px;
    height: 8px;
    border-radius: 2px;
}

.syncify-pip[data-kind="extension"] {
    background: #6cd1d1;
}

.syncify-pip[data-kind="theme"] {
    background: #efa4c1;
}

.syncify-pip[data-kind="snippet"] {
    background: #d3c48c;
}

/* Your codes, with new hearts beside it when there are any. */
.syncify-codes-heading {
    display: flex;
    align-items: center;
    gap: 8px;
}

.syncify-codes-heading .syncify-tag {
    letter-spacing: normal;
    text-transform: none;
}

.syncify-tag[data-tone="new"] {
    color: var(--syncify-accent-text);
    background: var(--syncify-accent);
}

.syncify-share-codes > li + li {
    border-top: 1px dashed var(--syncify-divider);
}

/* Spotify turns text selection off; a code's name and code can be selected. */
.syncify-share-codes .syncify-setting-text {
    user-select: text;
}

/* Buttons */

.syncify-button {
    flex: 0 0 auto;
    padding: 8px 18px;
    border: 0;
    border-radius: 999px;
    color: var(--syncify-accent-text);
    background: var(--syncify-accent);
    font: inherit;
    font-weight: 700;
    white-space: nowrap;
    cursor: pointer;
    transition:
        transform 100ms ease,
        filter 100ms ease;
}

.syncify-button:hover:not(:disabled) {
    filter: brightness(1.08);
    transform: scale(1.03);
}

.syncify-button.secondary {
    color: var(--syncify-text);
    background: transparent;
    box-shadow: inset 0 0 0 1px var(--syncify-muted);
}

.syncify-button.secondary:hover:not(:disabled) {
    box-shadow: inset 0 0 0 1px var(--syncify-text);
}

.syncify-button:disabled {
    cursor: default;
    opacity: 0.5;
}

.syncify-text-button {
    padding: 0;
    border: 0;
    color: var(--syncify-muted);
    background: none;
    font: inherit;
    font-size: 13px;
    cursor: pointer;
}

.syncify-text-button:hover:not(:disabled) {
    color: var(--syncify-text);
    text-decoration: underline;
}

.syncify-text-button:disabled {
    cursor: default;
    opacity: 0.6;
}

.syncify-alert .syncify-text-button {
    flex: 0 0 auto;
    color: var(--syncify-text);
    font-weight: 700;
}

.syncify-icon-button {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;
    border: 0;
    border-radius: 999px;
    color: var(--syncify-muted);
    background: none;
    cursor: pointer;
}

.syncify-icon-button:hover {
    color: var(--syncify-text);
    background: var(--syncify-surface-hover);
}

.syncify-icon-button svg {
    width: 16px;
    height: 16px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
}

/* Settings */

.syncify-setting {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    min-height: 40px;
}

label.syncify-setting {
    cursor: pointer;
}

.syncify-setting-text {
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.syncify-switch {
    position: relative;
    flex: 0 0 auto;
    width: 36px;
    height: 20px;
    margin: 0;
    border-radius: 999px;
    background: var(--syncify-muted);
    appearance: none;
    cursor: pointer;
    transition: background-color 150ms ease;
}

.syncify-switch::before {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #fff;
    content: "";
    transition: transform 150ms ease;
}

.syncify-switch:checked {
    background: var(--syncify-accent);
}

.syncify-switch:checked::before {
    transform: translateX(16px);
}

.syncify-switch:disabled {
    cursor: default;
    opacity: 0.5;
}

/* Selects draw their own chevron, away from the edge. */
.syncify-select-field {
    position: relative;
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    max-width: 55%;
    min-width: 0;
}

/* In a section header the field sizes to its text, against the right edge. */
.syncify-section-controls .syncify-select-field {
    max-width: none;
}

.syncify-select-field .syncify-chevron {
    position: absolute;
    right: 10px;
    width: 14px;
    height: 14px;
    color: var(--syncify-muted);
    transform: rotate(90deg);
    pointer-events: none;
}

.syncify-select {
    max-width: 100%;
    padding: 6px 32px 6px 10px;
    appearance: none;
    border: 0;
    border-radius: 4px;
    color: var(--syncify-text);
    background: var(--syncify-surface);
    font: inherit;
    font-size: 13px;
    cursor: pointer;
}

.syncify-select:hover:not(:disabled) {
    background: var(--syncify-surface-hover);
}

.syncify-select option {
    color: #fff;
    background: #282828;
}

.syncify-shortcut {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 12px;
}

.syncify-key {
    min-width: 80px;
    padding: 5px 10px;
    border: 0;
    border-radius: 4px;
    color: var(--syncify-text);
    background: var(--syncify-surface);
    box-shadow: inset 0 -2px 0 var(--syncify-divider);
    font: inherit;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
}

.syncify-key:hover {
    background: var(--syncify-surface-hover);
}

.syncify-key[data-recording="true"] {
    color: var(--syncify-accent);
    box-shadow: inset 0 0 0 1px var(--syncify-accent);
}

.syncify-panel :focus-visible {
    outline: 2px solid var(--syncify-text);
    outline-offset: 2px;
}

/* Footer */

.syncify-footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px 16px;
    padding-top: 16px;
    border-top: 1px solid var(--syncify-divider);
    color: var(--syncify-muted);
    font-size: 12px;
}

.syncify-footer-version {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 12px;
}

.syncify-footer .syncify-update {
    color: var(--syncify-accent);
    font-weight: 700;
}

.syncify-footer-links {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.syncify-footer .syncify-text-button {
    font-size: 12px;
}

@media (max-width: 560px) {
    .syncify-modal-shell .main-trackCreditsModal-mainSection,
    .syncify-modal-shell .main-trackCreditsModal-content,
    .main-trackCreditsModal-mainSection:has(.syncify-panel),
    .main-trackCreditsModal-content:has(.syncify-panel) {
        max-height: calc(100vh - 110px) !important;
        padding: 10px 14px 14px !important;
    }

    .syncify-status,
    .syncify-setting {
        align-items: stretch;
        flex-direction: column;
        gap: 10px;
    }

    .syncify-select {
        max-width: none;
    }

}
`;var Ga=`/* Shared values for every part. Colors come from the active Spicetify theme,
   with Spotify's own as fallbacks, so Syncify fits any theme. Every corner is
   a quarter of the side it sits on, like Syncify's pips. */
.syncify-ui {
    --syncify-color-text: var(--spice-text, #fff);
    --syncify-color-muted: var(--spice-subtext, #b3b3b3);
    --syncify-color-accent: var(--spice-button, #1ed760);
    --syncify-color-on-accent: var(--spice-button-text, #000);
    --syncify-color-warning: #f6c343;
    --syncify-color-error: var(--spice-notification-error, #f15e6c);
    --syncify-color-surface: rgba(var(--spice-rgb-text, 255, 255, 255), 0.07);
    --syncify-color-surface-strong: rgba(var(--spice-rgb-text, 255, 255, 255), 0.12);
    --syncify-color-divider: rgba(var(--spice-rgb-text, 255, 255, 255), 0.1);
    --syncify-color-warning-surface: color-mix(in srgb, var(--syncify-color-warning) 10%, transparent);
    --syncify-color-raised: color-mix(in srgb, var(--spice-card, #282828), var(--syncify-color-text) 6%);
    --syncify-color-backdrop: rgba(0, 0, 0, 0.6);

    /* Syncify's kind colors, the same as on the website. */
    --syncify-kind-extension: #6cd1d1;
    --syncify-kind-theme: #efa4c1;
    --syncify-kind-snippet: #d3c48c;
    --syncify-kind-app: #88bcf2;

    --syncify-corner: 0.25;
    --syncify-radius-surface: 10px;

    --syncify-size-control: 36px;
    --syncify-size-control-medium: 32px;
    --syncify-size-control-small: 28px;
    --syncify-size-control-tiny: 24px;
    --syncify-size-tab: 40px;
    --syncify-size-row: 56px;
    --syncify-size-row-single: 44px;
    --syncify-size-check: 18px;
    --syncify-size-pip: 12px;
    --syncify-size-mark: 8px;
    --syncify-size-mark-large: 20px;
    --syncify-size-dot: 4px;
    --syncify-size-icon: 16px;
    --syncify-size-menu: 200px;
    --syncify-line: 1px;
    --syncify-ring: 2px;

    --syncify-space-0: 2px;
    --syncify-space-1: 4px;
    --syncify-space-2: 8px;
    --syncify-space-3: 12px;
    --syncify-space-4: 16px;
    --syncify-space-5: 20px;
    --syncify-space-6: 24px;

    --syncify-text-title: 20px;
    --syncify-text-heading: 18px;
    --syncify-text-body: 14px;
    --syncify-text-small: 13px;
    --syncify-text-label: 12px;
    --syncify-text-tiny: 11px;

    color: var(--syncify-color-text);
    font-size: var(--syncify-text-body);
    line-height: 1.45;
}

.syncify-ui *,
.syncify-ui *::before,
.syncify-ui *::after {
    box-sizing: border-box;
}

.syncify-ui :focus-visible {
    outline: var(--syncify-ring) solid var(--syncify-color-text);
    outline-offset: var(--syncify-ring);
}

/* Text inside a control is trimmed to its capitals, so centering the box
   centers the capitals and an icon beside them sits on their middle. */
.syncify-cap {
    white-space: nowrap;
}

@supports (text-box: trim-both cap alphabetic) {
    .syncify-cap {
        text-box: trim-both cap alphabetic;
    }
}

/* Read by screen readers, not shown. */
.syncify-visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: pre;
    border: 0;
}
`;var Va=`.syncify-icon {
    flex: 0 0 auto;
    width: var(--syncify-size-icon);
    height: var(--syncify-size-icon);
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.syncify-icon[data-filled="true"] {
    fill: currentColor;
    stroke: none;
}
`;var Ja=`.syncify-btn,
.syncify-icon-btn {
    --syncify-btn-size: var(--syncify-size-control);

    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    gap: var(--syncify-space-2);
    height: var(--syncify-btn-size);
    margin: 0;
    padding: 0 var(--syncify-space-4);
    border: 0;
    border-radius: calc(var(--syncify-btn-size) * var(--syncify-corner));
    color: var(--syncify-color-on-accent);
    background: var(--syncify-color-accent);
    font: inherit;
    font-weight: 700;
    cursor: pointer;
    transition:
        filter 100ms ease,
        background-color 100ms ease,
        color 100ms ease;
}

.syncify-btn[data-size="small"] {
    --syncify-btn-size: var(--syncify-size-control-small);
    padding: 0 var(--syncify-space-3);
    font-size: var(--syncify-text-small);
}

.syncify-btn[data-size="tiny"] {
    --syncify-btn-size: var(--syncify-size-control-tiny);
    padding: 0 var(--syncify-space-2);
    font-size: var(--syncify-text-label);
}

.syncify-btn[data-variant="secondary"] {
    color: var(--syncify-color-text);
    background: var(--syncify-color-surface-strong);
}

.syncify-btn[data-variant="danger"] {
    color: var(--syncify-color-on-accent);
    background: var(--syncify-color-error);
}

.syncify-btn[data-variant="text"],
.syncify-btn[data-variant="subtle"] {
    padding: 0 var(--syncify-space-2);
    color: var(--syncify-color-text);
    background: transparent;
    font-weight: 600;
}

.syncify-btn[data-variant="subtle"] {
    color: var(--syncify-color-muted);
}

.syncify-btn:is([data-variant="primary"], [data-variant="danger"]):hover:not(:disabled) {
    filter: brightness(1.08);
}

.syncify-btn[data-variant="secondary"]:hover:not(:disabled) {
    background: color-mix(in srgb, var(--syncify-color-surface-strong), var(--syncify-color-text) 8%);
}

.syncify-btn:is([data-variant="text"], [data-variant="subtle"]):hover:not(:disabled),
.syncify-icon-btn:hover:not(:disabled) {
    color: var(--syncify-color-text);
    background: var(--syncify-color-surface);
}

.syncify-icon-btn {
    --syncify-btn-size: var(--syncify-size-control-small);

    width: var(--syncify-btn-size);
    padding: 0;
    color: var(--syncify-color-muted);
    background: transparent;
}

.syncify-btn:disabled,
.syncify-icon-btn:disabled {
    cursor: default;
    opacity: 0.45;
}
`;var Xa=`.syncify-switch-control {
    --syncify-switch-width: 32px;
    --syncify-switch-height: 18px;
    --syncify-switch-knob: 12px;
    --syncify-switch-inset: calc((var(--syncify-switch-height) - var(--syncify-switch-knob)) / 2);

    position: relative;
    flex: 0 0 auto;
    width: var(--syncify-switch-width);
    height: var(--syncify-switch-height);
    margin: 0;
    border-radius: calc(var(--syncify-switch-height) * var(--syncify-corner));
    background: var(--syncify-color-surface-strong);
    appearance: none;
    cursor: pointer;
    transition: background-color 150ms ease;
}

.syncify-switch-control::before {
    position: absolute;
    top: var(--syncify-switch-inset);
    left: var(--syncify-switch-inset);
    width: var(--syncify-switch-knob);
    height: var(--syncify-switch-knob);
    border-radius: calc(var(--syncify-switch-knob) * var(--syncify-corner));
    background: var(--syncify-color-muted);
    content: "";
    transition:
        transform 150ms ease,
        background-color 150ms ease;
}

.syncify-switch-control:checked {
    background: var(--syncify-color-accent);
}

.syncify-switch-control:checked::before {
    background: var(--syncify-color-on-accent);
    transform: translateX(
        calc(var(--syncify-switch-width) - var(--syncify-switch-knob) - 2 * var(--syncify-switch-inset))
    );
}

.syncify-switch-control:disabled {
    cursor: default;
    opacity: 0.45;
}
`;var Za=`.syncify-checkbox {
    --syncify-checkbox-glyph: 12px;

    position: relative;
    flex: 0 0 auto;
    width: var(--syncify-size-check);
    height: var(--syncify-size-check);
    margin: 0;
    border-radius: calc(var(--syncify-size-check) * var(--syncify-corner));
    box-shadow: inset 0 0 0 var(--syncify-ring) var(--syncify-color-muted);
    appearance: none;
    cursor: pointer;
}

.syncify-checkbox:checked {
    background: var(--syncify-color-accent);
    box-shadow: none;
}

/* The check, drawn in the color that sits on the accent. */
.syncify-checkbox:checked::before {
    position: absolute;
    inset: 0;
    background: var(--syncify-color-on-accent);
    content: "";
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12.5l4.5 4.5L19 7.5'/%3E%3C/svg%3E")
        center / var(--syncify-checkbox-glyph) no-repeat;
}

.syncify-checkbox:disabled {
    cursor: default;
    opacity: 0.45;
}
`;var Qa=`.syncify-setting-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--syncify-space-4);
    min-height: var(--syncify-size-row-single);
}

label.syncify-setting-row {
    cursor: pointer;
}

label.syncify-setting-row[data-disabled="true"] {
    cursor: default;
}

.syncify-setting-row-text {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-width: 0;
}

.syncify-setting-row-label {
    font-weight: 600;
    overflow-wrap: anywhere;
}

.syncify-setting-row-value {
    color: var(--syncify-color-muted);
    font-size: var(--syncify-text-small);
    overflow-wrap: anywhere;
}

/* Inside a group, the dashed line; solid lines only split sections. */
.syncify-setting-group {
    display: flex;
    flex-direction: column;
}

/* Drawn over the row's edge, so the line doesn't move the row's content. */
.syncify-setting-group > * + * {
    position: relative;
}

.syncify-setting-group > * + *::before {
    position: absolute;
    inset: 0 0 auto;
    border-top: var(--syncify-line) dashed var(--syncify-color-divider);
    content: "";
}
`;var es=`/* Facts on one line, wrapping between facts. Each fact is trimmed to its
   capitals, so the dots sit on their middle; the row gap gives back the
   space the trim takes from a wrapped line. */
.syncify-meta {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    column-gap: var(--syncify-space-2);
    min-width: 0;
    color: var(--syncify-color-muted);
    font-size: var(--syncify-text-small);
}

@supports (text-box: trim-both cap alphabetic) {
    .syncify-meta {
        row-gap: calc(1lh - 1cap);
    }

    .syncify-meta-part {
        text-box: trim-both cap alphabetic;
    }
}

.syncify-dot {
    flex: 0 0 auto;
    width: var(--syncify-size-dot);
    height: var(--syncify-size-dot);
    border-radius: calc(var(--syncify-size-dot) * var(--syncify-corner));
    background: currentColor;
    opacity: 0.7;
}
`;var ns=`.syncify-list {
    display: flex;
    flex-direction: column;
    gap: var(--syncify-space-0);
    margin: 0;
    padding: 0;
    list-style: none;
}

.syncify-list-item {
    display: flex;
    flex-direction: column;
}

.syncify-list-divider {
    margin: var(--syncify-space-1) var(--syncify-space-3);
    border-top: var(--syncify-line) dashed var(--syncify-color-divider);
}

.syncify-row {
    display: flex;
    align-items: center;
    gap: var(--syncify-space-3);
    width: 100%;
    min-height: var(--syncify-size-row);
    margin: 0;
    padding: var(--syncify-space-2) var(--syncify-space-3);
    border: 0;
    border-radius: var(--syncify-radius-surface);
    color: inherit;
    background: none;
    font: inherit;
    text-align: left;
}

.syncify-row[data-lines="1"] {
    min-height: var(--syncify-size-row-single);
}

button.syncify-row {
    cursor: pointer;
}

button.syncify-row:hover:not(:disabled) {
    background: var(--syncify-color-surface);
}

button.syncify-row:disabled {
    cursor: default;
    opacity: 0.6;
}

.syncify-row-text {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-width: 0;
}

.syncify-row-name {
    display: flex;
    align-items: center;
    gap: var(--syncify-space-2);
    min-width: 0;
    font-weight: 600;
}

.syncify-row-name-text {
    min-width: 0;
    overflow-wrap: anywhere;
}

/* A mark after the name sits on the capitals' middle. */
@supports (text-box: trim-both cap alphabetic) {
    .syncify-row-name {
        padding-block: calc((1lh - 1cap) / 2);
    }

    .syncify-row-name-text {
        text-box: trim-both cap alphabetic;
    }
}

.syncify-row-end {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: var(--syncify-space-1);
}

.syncify-row-chevron {
    color: var(--syncify-color-muted);
}
`;var ts=`.syncify-field-group {
    display: flex;
    flex-direction: column;
    gap: var(--syncify-space-2);
    min-width: 0;
}

.syncify-field-label {
    align-self: flex-start;
    font-size: var(--syncify-text-small);
    font-weight: 700;
}

.syncify-field-row {
    display: flex;
    align-items: center;
    gap: var(--syncify-space-2);
}

.syncify-input-box {
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    min-width: 0;
    height: var(--syncify-size-control);
    padding: 0 var(--syncify-space-3);
    border-radius: calc(var(--syncify-size-control) * var(--syncify-corner));
    color: var(--syncify-color-muted);
    background: var(--syncify-color-surface);
    cursor: text;
}

.syncify-input-box:focus-within {
    outline: var(--syncify-ring) solid var(--syncify-color-text);
    outline-offset: var(--syncify-ring);
}

.syncify-input-box[data-invalid="true"] {
    box-shadow: inset 0 0 0 var(--syncify-ring) var(--syncify-color-error);
}

.syncify-input-box[data-disabled="true"] {
    cursor: default;
    opacity: 0.6;
}

.syncify-input-control {
    flex: 1 1 auto;
    width: 100%;
    min-width: 0;
    height: 100%;
    margin: 0;
    padding: 0;
    border: 0;
    color: var(--syncify-color-text);
    background: none;
    font: inherit;
}

.syncify-ui .syncify-input-control:focus-visible {
    outline: 0;
}

.syncify-input-control::placeholder {
    color: var(--syncify-color-muted);
    opacity: 1;
}

.syncify-input-control[data-mono="true"]:not(:placeholder-shown) {
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    letter-spacing: 0.05em;
}

.syncify-field-error {
    color: var(--syncify-color-error);
    font-size: var(--syncify-text-small);
}
`;var is=`.syncify-menu {
    position: fixed;
    inset: auto;
    z-index: 1;
    display: flex;
    flex-direction: column;
    /* Grows to fit its longest choice, never wider than the window. */
    width: max-content;
    min-width: var(--syncify-size-menu);
    max-width: calc(100vw - 2 * var(--syncify-space-1));
    margin: 0;
    padding: var(--syncify-space-1);
    border: 0;
    border-radius: var(--syncify-radius-surface);
    color: var(--syncify-color-text);
    background: var(--syncify-color-raised);
    box-shadow: 0 0 0 var(--syncify-line) var(--syncify-color-divider);
}

.syncify-menu-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--syncify-space-2);
    width: 100%;
    height: var(--syncify-size-control);
    margin: 0;
    padding: 0 var(--syncify-space-3);
    border: 0;
    border-radius: calc(var(--syncify-size-control) * var(--syncify-corner));
    color: inherit;
    background: none;
    font: inherit;
    font-weight: 600;
    text-align: left;
    white-space: nowrap;
    cursor: pointer;
}

.syncify-menu-item:hover:not(:disabled),
.syncify-menu-item:focus-visible {
    background: var(--syncify-color-surface);
}

.syncify-ui .syncify-menu-item:focus-visible {
    outline-offset: calc(-1 * var(--syncify-ring));
}

.syncify-menu-item[data-danger="true"] {
    color: var(--syncify-color-error);
}

.syncify-menu-item[aria-checked="true"] .syncify-icon {
    color: var(--syncify-color-accent);
}

.syncify-menu-item:disabled {
    cursor: default;
    opacity: 0.45;
}

/* The button that shows a setting's current choice. */
.syncify-menu-value {
    display: inline-flex;
    flex: 0 1 auto;
    align-items: center;
    gap: var(--syncify-space-2);
    min-width: 0;
    height: var(--syncify-size-control-medium);
    margin: 0;
    padding: 0 var(--syncify-space-3);
    border: 0;
    border-radius: calc(var(--syncify-size-control-medium) * var(--syncify-corner));
    color: var(--syncify-color-text);
    background: var(--syncify-color-surface);
    font: inherit;
    font-size: var(--syncify-text-small);
    font-weight: 600;
    cursor: pointer;
}

.syncify-menu-value:hover:not(:disabled) {
    background: var(--syncify-color-surface-strong);
}

.syncify-menu-value .syncify-icon {
    color: var(--syncify-color-muted);
}

.syncify-menu-value:disabled {
    cursor: default;
    opacity: 0.45;
}
`;var as=`.syncify-meter {
    --syncify-meter-bar-width: 16px;
    --syncify-meter-bar-height: 8px;
    --syncify-meter-bar-gap: 3px;

    display: inline-flex;
    align-items: center;
    gap: var(--syncify-space-3);
    color: var(--syncify-color-muted);
    font-size: var(--syncify-text-small);
    font-weight: 600;
}

.syncify-meter-bars {
    display: flex;
    gap: var(--syncify-meter-bar-gap);
}

.syncify-meter-bar {
    width: var(--syncify-meter-bar-width);
    height: var(--syncify-meter-bar-height);
    border-radius: calc(var(--syncify-meter-bar-height) * var(--syncify-corner));
    background: var(--syncify-color-surface-strong);
}

.syncify-meter-bar[data-used="true"] {
    background: var(--syncify-color-accent);
}

/* Full: the count says so in the warning color. */
.syncify-meter[data-full="true"] {
    color: var(--syncify-color-warning);
}

.syncify-meter[data-full="true"] .syncify-meter-bar[data-used="true"] {
    background: var(--syncify-color-warning);
}
`;var ss=`.syncify-mark-square {
    --syncify-mark-size: var(--syncify-size-mark);
    --syncify-mark-color: var(--syncify-color-accent);

    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: var(--syncify-mark-size);
    height: var(--syncify-mark-size);
    border-radius: calc(var(--syncify-mark-size) * var(--syncify-corner));
    color: var(--syncify-color-on-accent);
    background: var(--syncify-mark-color);
}

.syncify-mark-square[data-size="large"] {
    --syncify-mark-size: var(--syncify-size-mark-large);
}

.syncify-mark-square[data-tone="warning"] {
    --syncify-mark-color: var(--syncify-color-warning);
}

.syncify-mark-square[data-tone="error"] {
    --syncify-mark-color: var(--syncify-color-error);
}

.syncify-mark-square .syncify-icon {
    --syncify-size-icon: calc(var(--syncify-mark-size) * 0.7);

    stroke-width: 3;
}

.syncify-badge {
    --syncify-badge-size: var(--syncify-size-check);

    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    min-width: var(--syncify-badge-size);
    height: var(--syncify-badge-size);
    padding: 0 var(--syncify-space-1);
    border-radius: calc(var(--syncify-badge-size) * var(--syncify-corner));
    color: var(--syncify-color-text);
    background: var(--syncify-color-surface-strong);
    font-size: var(--syncify-text-tiny);
    font-weight: 700;
}
`;var os=`.syncify-notice {
    display: flex;
    align-items: center;
    gap: var(--syncify-space-3);
    padding: var(--syncify-space-3) var(--syncify-space-3) var(--syncify-space-3) var(--syncify-space-4);
    border-radius: var(--syncify-radius-surface);
    background: var(--syncify-color-surface);
}

.syncify-notice[data-tone="warning"] {
    background: var(--syncify-color-warning-surface);
}

/* The mark sits on the first line's capitals, however many lines follow. */
.syncify-notice-body {
    display: flex;
    flex: 1 1 auto;
    align-items: flex-start;
    gap: var(--syncify-space-3);
    min-width: 0;
}

.syncify-notice-mark {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    height: 1lh;
}

.syncify-notice-text {
    flex: 1 1 auto;
    min-width: 0;
    overflow-wrap: anywhere;
}

@supports (text-box: trim-both cap alphabetic) {
    .syncify-notice-mark {
        height: 1cap;
    }

    .syncify-notice-text {
        text-box: trim-both cap alphabetic;
    }
}

.syncify-notice-actions {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: var(--syncify-space-2);
}
`;var rs=`.syncify-dialog {
    --syncify-dialog-width: 420px;

    width: min(var(--syncify-dialog-width), 100% - 2 * var(--syncify-space-4));
    margin: auto;
    padding: var(--syncify-space-6);
    border: 0;
    border-radius: var(--syncify-radius-surface);
    color: var(--syncify-color-text);
    background: var(--syncify-color-raised);
}

.syncify-dialog::backdrop {
    background: var(--syncify-color-backdrop);
}

.syncify-dialog-content {
    display: flex;
    flex-direction: column;
    gap: var(--syncify-space-4);
}

.syncify-dialog-title {
    margin: 0;
    font-size: var(--syncify-text-heading);
    font-weight: 700;
    line-height: 1.25;
    overflow-wrap: anywhere;
}

.syncify-dialog-text {
    display: flex;
    flex-direction: column;
    gap: var(--syncify-space-2);
}

.syncify-dialog-text p {
    margin: 0;
}

.syncify-dialog-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: var(--syncify-space-2);
}
`;var cs=`.syncify-tabs {
    display: flex;
    gap: var(--syncify-space-1);
    box-shadow: inset 0 calc(-1 * var(--syncify-line)) 0 var(--syncify-color-divider);
}

/* The open tab's bar is drawn over its bottom edge, so it doesn't move the
   label off center. */
.syncify-tab {
    --syncify-tab-bar: var(--syncify-ring);

    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    gap: var(--syncify-space-2);
    height: var(--syncify-size-tab);
    margin: 0;
    padding: 0 var(--syncify-space-3);
    border: 0;
    color: var(--syncify-color-muted);
    background: none;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
}

.syncify-tab:hover {
    color: var(--syncify-color-text);
}

.syncify-tab[aria-selected="true"] {
    color: var(--syncify-color-text);
    box-shadow: inset 0 calc(-1 * var(--syncify-tab-bar)) 0 var(--syncify-color-accent);
}

.syncify-tab .syncify-icon {
    color: var(--syncify-color-accent);
    stroke-width: 3;
}

.syncify-tab-panel {
    display: flex;
    flex-direction: column;
    gap: var(--syncify-space-3);
}

.syncify-ui .syncify-tab-panel:focus-visible {
    outline-offset: var(--syncify-space-1);
}
`;var ls=`.syncify-pip-square {
    flex: 0 0 auto;
    width: var(--syncify-size-pip);
    height: var(--syncify-size-pip);
    border-radius: calc(var(--syncify-size-pip) * var(--syncify-corner));
    background: var(--syncify-kind-extension);
}

.syncify-pip-square[data-kind="theme"] {
    background: var(--syncify-kind-theme);
}

.syncify-pip-square[data-kind="snippet"] {
    background: var(--syncify-kind-snippet);
}

.syncify-pip-square[data-kind="app"] {
    background: var(--syncify-kind-app);
}
`;var ys=`.syncify-section-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--syncify-space-3);
    min-height: var(--syncify-size-control-small);
}

.syncify-section-label-title {
    margin: 0;
    color: var(--syncify-color-muted);
    font-size: var(--syncify-text-label);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}
`;var us=`.syncify-keycap {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    height: var(--syncify-size-control-medium);
    margin: 0;
    padding: 0 var(--syncify-space-3);
    border: 0;
    border-radius: calc(var(--syncify-size-control-medium) * var(--syncify-corner));
    color: var(--syncify-color-text);
    background: var(--syncify-color-surface);
    font: inherit;
    font-size: var(--syncify-text-small);
    font-weight: 700;
    cursor: pointer;
}

.syncify-keycap:hover {
    background: var(--syncify-color-surface-strong);
}

.syncify-keycap[data-recording="true"] {
    color: var(--syncify-color-accent);
    box-shadow: inset 0 0 0 var(--syncify-line) var(--syncify-color-accent);
}
`;var fs=`/* A bar as tall as the capitals of the text it stands in for. */
.syncify-skeleton {
    display: block;
    width: 30%;
    height: 1cap;
    border-radius: calc(1cap * var(--syncify-corner));
    background: var(--syncify-color-surface-strong);
}

/* The meta line isn't trimmed like the name, so its bar keeps the line's height. */
.syncify-skeleton[data-width="meta"] {
    width: 50%;
    margin-block: calc((1lh - 1cap) / 2);
    font-size: var(--syncify-text-small);
}
`;var ds=[Ga,Va,Ja,Xa,Za,Qa,es,ns,ts,is,as,ss,os,rs,cs,ls,ys,us,fs].join(`
`);var vi=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var ps=`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="-2.5 -2.5 37 37" aria-hidden="true" focusable="false"><defs><mask id="syncify-mark-gap" maskUnits="userSpaceOnUse" x="-2" y="-2" width="36" height="36"><rect x="-2" y="-2" width="36" height="36" fill="#fff"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></mask></defs><g mask="url(#syncify-mark-gap)"><g transform="rotate(15 16 16)"><path d="M16 16L16 7.4A8.6 8.6 0 0 1 24.6 16Z" fill="#6cd1d1" transform="translate(0.42 -0.42)"/><path d="M16 16L24.6 16A8.6 8.6 0 0 1 16 24.6Z" fill="#efa4c1" transform="translate(0.42 0.42)"/><path d="M16 16L16 24.6A8.6 8.6 0 0 1 7.4 16Z" fill="#d3c48c" transform="translate(-0.42 0.42)"/><path d="M16 16L7.4 16A8.6 8.6 0 0 1 16 7.4Z" fill="#88bcf2" transform="translate(-0.42 -0.42)"/></g></g><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 28.03A12.4 12.4 0 1 1 28.03 19"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91"/></g></svg>
`;var $c="syncify",pn="state";function Ci(){let e;try{e=window.indexedDB}catch(n){return Promise.resolve(null)}return e?new Promise(n=>{let t;try{t=e.open($c,1)}catch(i){n(null);return}t.onupgradeneeded=()=>{t.result.createObjectStore(pn)},t.onerror=()=>n(null),t.onblocked=()=>n(null),t.onsuccess=()=>n(t.result)}):Promise.resolve(null)}function Ni(e,n){let t=Ci().then(i=>new Promise((a,o)=>{if(!i){o(new Error("IndexedDB isn't available."));return}try{let r=i.transaction(pn,e),y=n(r.objectStore(pn));r.oncomplete=()=>{i.close(),a(y.result)},r.onerror=r.onabort=()=>{var d;i.close(),o((d=r.error)!=null?d:new Error("IndexedDB failed."))}}catch(r){i.close(),o(r)}}));return Promise.race([t,new Promise((i,a)=>setTimeout(()=>a(new Error("IndexedDB took too long.")),2e3))])}function mn(e){return Ni("readonly",n=>n.get(e))}async function gn(e,n){await Ni("readwrite",t=>t.put(n,e))}async function ms(e){await Ni("readwrite",n=>n.delete(e))}var ve={extensionName:"Syncify",version:"1.17.1",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",discordUrl:"https://syncify.wsoltani.com/discord",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com",shareUrl:"https://syncs.wsoltani.com"};function U(){var n,t,i,a,o,r,y,d,p,m;let e=window.SyncifyConfig;return{extensionName:(n=Ue(e==null?void 0:e.extensionName))!=null?n:ve.extensionName,version:(t=gs(e==null?void 0:e.version))!=null?t:ve.version,workerUrl:(i=Ue(e==null?void 0:e.workerUrl))!=null?i:ve.workerUrl,webUrl:(a=Ue(e==null?void 0:e.webUrl))!=null?a:ve.webUrl,githubUrl:(o=Ue(e==null?void 0:e.githubUrl))!=null?o:ve.githubUrl,kofiUrl:(r=Ue(e==null?void 0:e.kofiUrl))!=null?r:ve.kofiUrl,discordUrl:(y=Ue(e==null?void 0:e.discordUrl))!=null?y:ve.discordUrl,issueUrl:(d=Ue(e==null?void 0:e.issueUrl))!=null?d:ve.issueUrl,releasesUrl:(p=Ue(e==null?void 0:e.releasesUrl))!=null?p:ve.releasesUrl,shareUrl:(m=Ue(e==null?void 0:e.shareUrl))!=null?m:ve.shareUrl}}function Ue(e){return gs(e)}function gs(e){return typeof e=="string"&&e.trim()?e.trim():null}var Kc="x-syncify-version",Hc="x-syncify-install",zc="x-syncify-timezone",hs="install-id",bs="syncify:install-id",jc=2e3,_t=null;async function ks(){let e={[Kc]:U().version,[Hc]:(await Ei()).id},n=Wc();return n&&(e[zc]=n),e}function Ei(){return _t!=null||(_t=Fc().catch(()=>({id:It(),inDatabase:!1}))),_t}async function Fc(){let e=await Promise.race([Yc(),new Promise(n=>setTimeout(()=>n(null),jc))]);if(e)return{id:e,inDatabase:!0};try{let n=window.localStorage.getItem(bs);if(n&&Ss(n))return{id:n,inDatabase:!1};let t=It();return window.localStorage.setItem(bs,t),{id:t,inDatabase:!1}}catch(n){return{id:It(),inDatabase:!1}}}async function Yc(){let e=await Ci();return e?new Promise(n=>{let t=null;try{let i=e.transaction(pn,"readwrite"),a=i.objectStore(pn),o=a.get(hs);o.onsuccess=()=>{if(typeof o.result=="string"&&Ss(o.result)){t=o.result;return}t=It(),a.put(t,hs)},i.oncomplete=()=>{e.close(),n(t)},i.onerror=i.onabort=()=>{e.close(),n(null)}}catch(i){e.close(),n(null)}}):null}function It(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let n=[...e].map(t=>t.toString(16).padStart(2,"0"));return[n.slice(0,4).join(""),n.slice(4,6).join(""),n.slice(6,8).join(""),n.slice(8,10).join(""),n.slice(10).join("")].join("-")}function Ss(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(e)}function Wc(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(e){return null}}var qc="syncify-signature-v1",Gc={name:"ECDSA",hash:"SHA-256"};function Rt(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function Tt(e){return _i(new Uint8Array(await crypto.subtle.exportKey("raw",e)))}async function Bn(e,n,t,i,a){let o=await Vc(n,t,i,a),r=await crypto.subtle.sign(Gc,e,o);return _i(new Uint8Array(r))}async function Vc(e,n,t,i){let{pathname:a,search:o}=new URL(t),r=new TextEncoder,y=_i(new Uint8Array(await crypto.subtle.digest("SHA-256",r.encode(i))));return r.encode([qc,e,n.toUpperCase(),a+o,y].join(`
`))}function _i(e){let n="";for(let t=0;t<e.length;t++)n+=String.fromCharCode(e[t]);return btoa(n).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var ws="device-key",Ii="session",xs="salt",nn=null,$n,vs={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function hn(e){if(nn)return nn;let n=await mn(ws);return Jc(n)?(nn=Promise.resolve(n),n):e?(nn=Rt().then(async t=>(await gn(ws,t),t)),nn.catch(()=>{nn=null}),nn):null}async function le(){let e=await mn(Ii);return Xc(e)?e:null}function Ri(e){return gn(Ii,e)}async function tn(){await ms(Ii).catch(()=>{})}async function Pt(){if($n===void 0){let e=await mn(xs).catch(()=>{});$n=typeof e=="string"?e:null}return $n}async function At(e){e!==$n&&($n=e,await gn(xs,e).catch(()=>{}))}function Mt(){return vs}function Cs(e){vs=e}function Jc(e){let n=e;return!!(n&&n.privateKey instanceof CryptoKey&&n.publicKey instanceof CryptoKey)}function Xc(e){let n=e;return!!(n&&typeof n.token=="string"&&n.token&&typeof n.email=="string")}var Ns="install-key",bn=null;function Es(){return bn!=null||(bn=Zc()),bn.catch(()=>{bn=null}),bn.catch(()=>null)}async function Zc(){if(!(await Ei()).inDatabase)return null;let e=await mn(Ns),n=el(e)?e:await Qc();return{privateKey:n.privateKey,publicKey:await Tt(n.publicKey)}}async function Qc(){let e=await Rt();return await gn(Ns,e),e}function el(e){let n=e;return!!(n&&n.privateKey instanceof CryptoKey&&n.publicKey instanceof CryptoKey)}var nl="/api/auth/email-otp/send-verification-otp",tl="/api/auth/sign-in/email-otp",il="/api/auth/get-session",al="/api/auth/sign-out",sl="/api/auth/link",ol="x-syncify-device-key",rl="x-syncify-signature",_s="x-syncify-salt",cl="none",ll={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again.",link_failed:"Couldn't open the website. Try again."},E=class extends Error{constructor(t,i=null,a=null){var o;super((o=ll[t])!=null?o:"Sign-in failed. Try again.");this.code=t;this.retryAfter=i;this.share=a;this.name="AccountError"}};function an(e){return e instanceof E?e.message:"Sign-in failed. Try again."}async function Is(e,n={}){let t=await Hn(nl,{method:"POST",body:JSON.stringify(g({email:e,type:"sign-in"},n.nudge?{nudge:!0}:{}))});return typeof(t==null?void 0:t.resend_in)=="number"?t.resend_in:60}async function Rs(e,n){var o;let t=await hn(!0).catch(()=>{throw new E("no_device_key")}),i=await Hn(tl,{method:"POST",body:JSON.stringify({email:e,otp:n}),keys:t,sendPublicKey:!0});if(typeof(i==null?void 0:i.token)!="string"||!i.token)throw new E("sign_in_failed");let a={token:i.token,email:typeof((o=i.user)==null?void 0:o.email)=="string"?i.user.email:e};return await Ri(a).catch(()=>{throw new E("no_device_key")}),Ti=!0,a}var Ti=!1;async function Ts(){var n;let e=await le();if(!e||Ti)return e;try{let t=await Dt(e,il,"GET");Ti=!0;let i=(n=t==null?void 0:t.user)==null?void 0:n.email;if(typeof i!="string"||i===e.email)return e;let a=N(g({},e),{email:i});return await Ri(a).catch(()=>{}),a}catch(t){if(t instanceof E&&t.code==="signed_out")return null;throw t}}async function Ps(){let e=await le().catch(()=>null);e&&await Dt(e,al,"POST").catch(()=>{}),await tn()}async function As(){let e=await le();if(!e)throw new E("signed_out");let n=await Dt(e,sl,"POST"),t=typeof(n==null?void 0:n.url)=="string"?n.url:"",i=new URL(U().webUrl).origin;if(!t.startsWith(`${i}/link#`))throw new E("link_failed");return t}async function Kn(e,n,t){let i=await le();if(!i)throw new E("signed_out");return Dt(i,e,n,t)}async function Ms(e,n,t){let i=await le().catch(()=>null),a=i?await hn(!1).catch(()=>null):null;await Hn(e,g({method:"POST",body:JSON.stringify(n),headers:t,keepalive:!0},i&&a?{token:i.token,keys:a}:{}))}async function Dt(e,n,t,i){let a=await hn(!1);if(!a)throw await tn(),new E("signed_out");return Hn(n,g({method:t,token:e.token,keys:a},i===void 0?{}:{body:JSON.stringify(i)}))}async function Hn(e,n,t=!1){var b,k,S;let i=`${U().webUrl.replace(/\/+$/,"")}${e}`,a=g({},n.headers);if(n.body!==void 0&&(a["content-type"]="application/json"),n.token&&(a.authorization=`Bearer ${n.token}`),n.keys){let R=(b=await Pt())!=null?b:cl;a[_s]=R,a[rl]=await Bn(n.keys.privateKey,R,n.method,i,(k=n.body)!=null?k:""),n.sendPublicKey&&(a[ol]=await Tt(n.keys.publicKey))}let o;try{o=await fetch(i,{method:n.method,headers:a,body:n.body,keepalive:n.keepalive})}catch(R){throw new E("offline")}let r=o.headers.get(_s);r&&await At(r);let y=await o.json().catch(()=>null);if(o.ok)return y;let d=typeof(y==null?void 0:y.code)=="string"?y.code:o.status===503?"unavailable":"failed";if(d==="stale_salt"&&n.keys&&!t)return Hn(e,n,!0);d==="signed_out"&&await tn();let p=Number(o.headers.get("retry-after")),m=y==null?void 0:y.share;throw new E(d,Number.isFinite(p)&&p>0?p:(S=yl[d])!=null?S:null,typeof(m==null?void 0:m.code)=="string"?{code:m.code,link:typeof m.link=="string"?m.link:null}:null)}var yl={resend_wait:60,too_many_requests:60,send_failed:60};var ul="x-syncify-user-hash",fl="x-syncify-identity",dl="x-syncify-signature",pl="x-syncify-install-key",ml="x-syncify-install-signature",Pi="x-syncify-salt",gl="none",hl="/restores",bl="/installs",kl="hash",Ds=3,zn=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}},Ce=class extends Error{constructor(t){super(t==="not_linked"?"Couldn't read that Spotify account's backups.":"Sign in to restore this backup.");this.code=t;this.name="LockedError"}},sn=class extends Error{constructor(){super("This Spotify account doesn't accept backups from this install. Sign in to back up."),this.name="InstallRefusedError"}};async function Os(e,n,t){var o;let i=await Fe(e,n,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(t)});if(i.status===403&&((o=await i.json().catch(()=>null))==null?void 0:o.code)==="install_refused")throw new sn;if(!i.ok)throw new Error(`Backup failed with HTTP ${i.status}.`);let a=await i.json().catch(()=>null);return{unchanged:(a==null?void 0:a.unchanged)===!0,unapproved:(a==null?void 0:a.quarantined)===!0}}async function Us(e,n,t,i){let a=await Fe(e,n,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({install:t,action:i})},bl);if(a.ok)return;let o=await a.json().catch(()=>null);if((o==null?void 0:o.code)!=="not_pending")throw new Error(`Couldn't answer with HTTP ${a.status}.`)}async function Ai(e,n,t){var S,R,_,A;let i=await Fe(e,n,{method:"GET"},$s("/",t));if(i.status===404){let T=await i.json().catch(()=>null);return{exists:!1,payload:null,backups:[],safetyCopy:null,claim:jn(T==null?void 0:T.claim),unapproved:[],install:Ls(T==null?void 0:T.install),nudge:!1}}if(!i.ok)throw new Error(`Restore failed with HTTP ${i.status}.`);let a=await i.json(),o=jn(a.claim),r=Ls(a.install),y=a.nudge===!0;delete a.claim,delete a.install,delete a.nudge;let d=[a,...(S=a.backup_history)!=null?S:[]];if(!d.every(T=>T.backup))return{exists:!0,payload:a,backups:d.slice(0,Ds),safetyCopy:(R=d[Ds])!=null?R:null,claim:o,unapproved:[],install:r,nudge:y};let p=d.filter(T=>{var P;return((P=T.backup)==null?void 0:P.kind)==="rolling"}),m=(_=d.find(T=>{var P;return((P=T.backup)==null?void 0:P.kind)==="anchor"}))!=null?_:null,b=d.filter(T=>{var P;return((P=T.backup)==null?void 0:P.kind)==="quarantined"}),k=(A=p[0])!=null?A:m;return k?p.length===0&&m?{exists:!0,payload:k,backups:[m],safetyCopy:null,claim:o,unapproved:b,install:r,nudge:y}:{exists:!0,payload:k,backups:p,safetyCopy:m,claim:o,unapproved:b,install:r,nudge:y}:{exists:!1,payload:null,backups:[],safetyCopy:null,claim:o,unapproved:b,install:r,nudge:y}}async function Bs(e,n,t,i){try{await Fe(e,n,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:t}),keepalive:!0},$s(hl,i))}catch(a){}}async function Fe(e,n,t,i="",a=!1){var _,A,T,P,G;let o=i?`${e.replace(/\/+$/,"")}${i}`:e,r=(_=t.method)!=null?_:"GET",y=await le().catch(()=>null),d=y?await hn(!1).catch(()=>null):null,p=await Es(),m={},b=(A=await Pt())!=null?A:gl;y&&d&&(m.authorization=`Bearer ${y.token}`,m[Pi]=b,m[dl]=await Bn(d.privateKey,b,r,o,(T=t.body)!=null?T:"")),p&&(m[Pi]=b,m[pl]=p.publicKey,m[ml]=await Bn(p.privateKey,b,r,o,(P=t.body)!=null?P:""));let k=await fetch(o,N(g({},t),{headers:g(N(g(g({},t.headers),await ks()),{[ul]:n.hash,[fl]:n.field}),m)})),S=k.headers.get(Pi);if(S&&await At(S),k.status===426)throw new zn;if(k.status!==401)return k;let R=(G=await k.clone().json().catch(()=>null))==null?void 0:G.code;if(!a){if(R==="stale_salt"&&(y||p))return Fe(e,n,t,i,!0);if(R==="signed_out"&&y)return await tn(),Fe(e,n,t,i,!0)}throw R==="claimed"||R==="not_owner"||R==="not_linked"?new Ce(R):(R==="signed_out"&&await tn(),new E(typeof R=="string"?R:"failed"))}function $s(e,n){return n?`${e}?${kl}=${encodeURIComponent(n)}`:e}function Ls(e){let n=e;if(!n||typeof n.trust!="string")return null;let t=Array.isArray(n.waiting)?n.waiting:[];return{trusted:n.trust!=="pending"&&n.trust!=="rejected",refused:n.trust==="rejected",waiting:t.flatMap(i=>{let a=i;return a&&typeof a.id=="string"&&typeof a.first_seen_at=="number"?[{id:a.id,device:typeof a.device=="string"?a.device:null,first_seen_at:a.first_seen_at}]:[]})}}function jn(e){let n=e;return!n||typeof n.mine!="boolean"?null:n.status==="final"?{status:"final",mine:n.mine}:n.status==="undone"?typeof n.undone_at=="number"?{status:"undone",mine:!1,email:typeof n.email=="string"?n.email:null,undone_at:n.undone_at}:null:n.status!=="pending"||typeof n.final_at!="number"?null:g({status:"pending",mine:n.mine,email:typeof n.email=="string"?n.email:null,final_at:n.final_at,held:n.held===!0},n.not_me===!0?{not_me:!0}:{})}async function Lt(e){let n=new TextEncoder().encode(e),t=await crypto.subtle.digest("SHA-256",n);return[...new Uint8Array(t)].map(i=>i.toString(16).padStart(2,"0")).join("")}function Fn(e){return JSON.stringify(Mi(e))}function Mi(e){return Array.isArray(e)?e.map(Mi):e&&typeof e=="object"?Object.keys(e).sort().reduce((n,t)=>(n[t]=Mi(e[t]),n),{}):e}function Ks(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var Sl=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,wl=100,xl="marketplace:installed-extensions",vl="marketplace:installed-themes",Cl="marketplace:theme-installed",Nl="marketplace:installed:",El="marketplace";function Li(e){return Spicetify.Config?Oi(Spicetify.Config,e):null}function Oi(e,n){var o;let t=Ye(e),i=new Set(_l(n)),a=((o=n[Cl])==null?void 0:o.includes(Nl))===!0;return{current_theme:a?El:t.current_theme,color_scheme:a?"":t.color_scheme,extensions:t.extensions.filter(r=>!i.has(r)),custom_apps:t.custom_apps}}function Ye(e){let n=e&&typeof e=="object"?e:{};return{current_theme:Di(n.current_theme)?n.current_theme:"",color_scheme:Di(n.color_scheme)?n.color_scheme:"",extensions:Hs(n.extensions),custom_apps:Hs(n.custom_apps)}}function Fs(e,n){return Fn(Ye(e))===Fn(Ye(n))}function Hs(e){return Array.isArray(e)?[...new Set(e.filter(Di))].sort().slice(0,wl):[]}function Di(e){return typeof e=="string"&&Sl.test(e)}function _l(e){let n=zs(e[xl]).map(i=>{var o;let a=(o=js(e[i]))==null?void 0:o.manifest;return a&&typeof a=="object"?a.main:void 0}),t=zs(e[vl]).flatMap(i=>{var o;let a=(o=js(e[i]))==null?void 0:o.include;return Array.isArray(a)?a:[]});return[...n,...t].flatMap(i=>{let a=typeof i=="string"?i.split("/").pop():void 0;return a?[a]:[]})}function zs(e){try{let n=e?JSON.parse(e):[];return Array.isArray(n)?n.filter(t=>typeof t=="string"):[]}catch(n){return[]}}function js(e){try{let n=e?JSON.parse(e):null;return n&&typeof n=="object"&&!Array.isArray(n)?n:null}catch(n){return null}}var Il=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],Rl="marketplace:installed:",Ys=`${Rl}snippet:`,Tl="wsoltani/syncify",Pl="marketplace",Ws={added:0,removed:1,unchanged:2};function J(e){let n=new Map;for(let[t,i]of Il)for(let a of Ll(e[t]))n.has(a)||n.set(a,Ml(a,i,e[a]));return[...n.values()]}function Yn(e,n,t,i){let a=new Set(e.map(d=>d.key)),o=new Map(t.map(d=>[d.key,d])),r=[...e.map(d=>{let p=o.get(d.key);return N(g({},d),{change:p?"unchanged":"added",isNew:!p||p.sources.join(" ")!==d.sources.join(" ")})}),...t.filter(d=>!a.has(d.key)).map(d=>N(g({},d),{change:Wn(d,e)?"unchanged":"removed",isNew:!1}))].sort((d,p)=>Ws[d.change]-Ws[p.change]||d.name.localeCompare(p.name)),y={added:0,removed:0,unchanged:0};for(let d of r)y[d.change]+=1;return{items:r,counts:y,manual:Al(n,i)}}function Wn(e,n){return e.type==="extension"&&Ut(e)&&!n.some(Ut)}function Ut(e){var n;return((n=e.repo)==null?void 0:n.toLowerCase())===Tl}function Al(e,n){if(!e)return[];let t=Ye(e),i=Ye(n),a=[...t.extensions.filter(r=>!i.extensions.includes(r)).map(r=>({type:"extension",name:r})),...t.custom_apps.filter(r=>!i.custom_apps.includes(r)).map(r=>({type:"custom_app",name:r}))],o=t.current_theme;return o&&o!==Pl&&(o!==i.current_theme||t.color_scheme!==i.color_scheme)&&a.push(g({type:"theme",name:o},t.color_scheme?{scheme:t.color_scheme}:{})),a}function Ml(e,n,t){var d,p;let i=qs(t),a=qs(i==null?void 0:i.manifest),o=Ot(i==null?void 0:i.user),r=Ot(i==null?void 0:i.repo),y=(p=(d=Ot(i==null?void 0:i.title))!=null?d:Ot(a==null?void 0:a.name))!=null?p:e.startsWith(Ys)?e.slice(Ys.length):e.split("/").pop()||e;return{key:e,type:n,name:y,repo:n!=="snippet"&&o&&r?`${o}/${r}`:null,sources:Dl(n,i),custom:n==="snippet"&&(i==null?void 0:i.custom)===!0}}function Dl(e,n){return n?(e==="extension"?[n.extensionURL]:e==="theme"?[n.cssURL,n.schemesURL,...Array.isArray(n.include)?n.include:[]]:[]).filter(i=>typeof i=="string"&&i!==""):[]}function Ot(e){return typeof e=="string"&&e.trim()?e.trim():null}function Ll(e){try{let n=e?JSON.parse(e):[];return Array.isArray(n)?n.filter(t=>typeof t=="string"):[]}catch(n){return[]}}function qs(e){let n=e;if(typeof e=="string")try{n=JSON.parse(e)}catch(t){return null}return n&&typeof n=="object"&&!Array.isArray(n)?n:null}var Bt="spicetify-marketplace";var qn="settings";async function Gs(){let e=await Xs();if(e.kind!=="ok")return null;try{let n=await Zs(e.db,"readonly",i=>i.getAll());if(!n)return null;let t={};for(let i of n)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(t[i.key]=i.value);return t}finally{e.db.close()}}async function Vs(e,n=[]){let t=await Xs();if(t.kind==="unavailable")return"unavailable";let i=t.kind==="ok"?t.db:await Ol();if(!i)return"failed";try{return await Zs(i,"readwrite",o=>{let r;for(let[y,d]of Object.entries(e))r=o.put({key:y,value:d});for(let y of n)r=o.delete(y);return r})===null?"failed":"written"}finally{i.close()}}function Js(){var e;try{return(e=window.indexedDB)!=null?e:null}catch(n){return null}}async function Xs(){let e=Js();return e?await Ul(e)?{kind:"missing"}:new Promise(n=>{let t=!1,i=e.open(Bt);i.onupgradeneeded=()=>{t=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),n({kind:"unavailable"})},i.onblocked=()=>n({kind:"unavailable"}),i.onsuccess=()=>{let a=i.result;if(t){a.close(),Bl(e).then(()=>n({kind:"missing"}));return}if(!a.objectStoreNames.contains(qn)){a.close(),n({kind:"unavailable"});return}n({kind:"ok",db:a})}}):{kind:"unavailable"}}function Ol(){let e=Js();return e?new Promise(n=>{let t=e.open(Bt,1);t.onupgradeneeded=()=>{let i=t.result;i.objectStoreNames.contains(qn)||i.createObjectStore(qn,{keyPath:"key"})},t.onerror=()=>{console.warn("Syncify could not create Marketplace storage",t.error),n(null)},t.onblocked=()=>n(null),t.onsuccess=()=>n(t.result)}):Promise.resolve(null)}async function Ul(e){if(typeof e.databases!="function")return!1;try{return!(await e.databases()).some(t=>t.name===Bt)}catch(n){return!1}}function Bl(e){return new Promise(n=>{let t=e.deleteDatabase(Bt);t.onsuccess=()=>n(),t.onerror=()=>n(),t.onblocked=()=>n()})}function Zs(e,n,t){return new Promise(i=>{let a;try{a=e.transaction(qn,n)}catch(p){console.warn("Syncify could not open a Marketplace transaction",p),i(null);return}let o,r=!1,y=p=>{r||(r=!0,i(p))};a.oncomplete=()=>y(o),a.onerror=()=>{console.warn("Syncify Marketplace transaction failed",a.error),y(null)},a.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",a.error),y(null)};let d;try{d=t(a.objectStore(qn))}catch(p){console.warn("Syncify Marketplace request could not be issued",p),y(null);return}d&&(d.onsuccess=()=>{o=d.result},d.onerror=()=>{console.warn("Syncify Marketplace request failed",d.error),y(null)})})}var Ui="marketplace:",Kt=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function me(){let e=ql(),n=await Gs();if(n)for(let[t,i]of Object.entries(n))t.startsWith(Ui)&&(e[t]=i);return e}var Kl=new Set(["marketplace:active-tab","marketplace:sort"]),Bi="marketplace:installed:",$t="marketplace:theme-installed",Hl=["stars","tags","lastUpdated","created"];async function Ht(e,n){let t={};for(let[i,a]of Object.entries(e))Kl.has(i)||(t[i]=i.startsWith(Bi)?zl(a):a);return n&&(t.spicetify_config=Ye(n)),Lt(Fn(t))}function zl(e){try{let n=JSON.parse(e);if(!n||typeof n!="object"||Array.isArray(n))return e;for(let t of Hl)delete n[t];return n}catch(n){return e}}async function zt(){let e=await me(),n=Li(e);return{keyCount:Object.keys(e).length,hash:await Ht(e,n),installedItemCount:Yl(e),installedItems:jt(e),items:J(e),spicetifyConfig:n,marketplaceAvailable:Wl(e),activeTheme:Gn(e[$t])}}function Gn(e){if(!e)return null;if(e.startsWith(Bi))return e;try{let n=JSON.parse(e);return typeof n=="string"?n:null}catch(n){return null}}async function Qs(){let e=await me(),n=Li(e);return g({schema_version:2,metadata:{last_sync_datetime:new Date().toISOString(),device_info:Ks(),marketplace_key_count:Object.keys(e).length},payload_hash:await Ht(e,n),marketplace_data:{keys:e}},n?{spicetify_config:n}:{})}async function eo(e,n=[]){var o,r;let t={},i=(r=(o=e.marketplace_data)==null?void 0:o.keys)!=null?r:{};for(let[y,d]of Object.entries(i))y.startsWith(Ui)&&(t[y]=d);if(Object.keys(t).length===0)return 0;await jl(t),n.length>0&&await Fl(t,n);let a=Ki(await me(),t);return await $i(t,a),Object.keys(t).length}async function $i(e,n=[]){for(let[i,a]of Object.entries(e))window.localStorage.setItem(i,a);for(let i of n)window.localStorage.removeItem(i);if(await Vs(e,n)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try again.")}function Ki(e,n){let t=new Set(Kt.flatMap(r=>{var y;return Ft((y=n[r])!=null?y:e[r]).map(String)})),i=jt(e).filter(r=>r.startsWith(Bi)&&!t.has(r)),a=i.filter(r=>e[r]!==void 0&&n[r]===void 0),o=e[$t];return o&&n[$t]===void 0&&i.some(r=>o.includes(r))&&a.push($t),a}async function jl(e){let n=await me(),t=J(e),i=J(n).filter(r=>Wn(r,t));if(i.length===0)return;let a="marketplace:installed-extensions",o=Ft(e[a]).map(String);for(let r of i)o.includes(r.key)||o.push(r.key),e[r.key]=n[r.key];e[a]=JSON.stringify(o)}async function Fl(e,n){let t=await me(),i=jt(t);for(let a of Kt){if(e[a]===void 0)continue;let o=Ft(e[a]).map(String).filter(r=>!n.includes(r)||i.includes(r));e[a]=JSON.stringify(o)}for(let a of n)t[a]!==void 0?e[a]=t[a]:delete e[a]}function Yl(e){return jt(e).length}function jt(e){return Kt.flatMap(n=>Ft(e[n]).map(String))}function Wl(e){return!!(window.Marketplace||Kt.some(t=>e[t]!==void 0)||e["marketplace:tabs"]!==void 0)}function no(e,n){return n===0?!1:e===0?!0:e<Math.max(2,Math.floor(n*.5))}function ql(){let e={};for(let n=0;n<window.localStorage.length;n+=1){let t=window.localStorage.key(n);if(!(t!=null&&t.startsWith(Ui)))continue;let i=window.localStorage.getItem(t);i!==null&&(e[t]=i)}return e}function Ft(e){if(!e)return[];try{let n=JSON.parse(e);return Array.isArray(n)?n:[]}catch(n){return[]}}var Gl="raw.githubusercontent.com",Vl="cdn.jsdelivr.net",to=".github.io";function zi(e){var t;if(e.protocol!=="https:")return null;let n=e.pathname.split("/").filter(Boolean);if(e.host===Gl)return Hi(n[0],n[1]);if(e.host===Vl)return n[0]==="gh"?Hi(n[1],(t=n[2])==null?void 0:t.split("@")[0]):null;if(e.host.endsWith(to)){let i=e.host.slice(0,-to.length);return i.includes(".")?null:Hi(i,n.length>1?n[0]:e.host)}return null}function Hi(e,n){return e&&n?`${e}/${n}`:null}var Jl={extension:"spicetify-extensions",theme:"spicetify-themes"},Xl="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",Zl="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",Ql="https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/",ey="https://api.github.com/repos",ny=5e3,ty=20,io="syncify:repo-topics",ao=10080*60*1e3,iy=200;function We(e){return(e==null?void 0:e.kind)==="host"||(e==null?void 0:e.kind)==="repo"||(e==null?void 0:e.kind)==="blocked"||(e==null?void 0:e.kind)==="catalog"}function Xn(e){let n=new Map;for(let t of e){if(t.change==="removed")continue;if(t.custom){n.set(t.key,{kind:"custom"});continue}let i=ay(t);i&&n.set(t.key,i)}return n}async function Zn(e,n){let t=new Map,i=e.filter(r=>r.change!=="removed"&&r.isNew&&!n.has(r.key));if(i.length===0)return t;let a=i.filter(r=>r.type==="snippet"),o=i.filter(r=>r.type!=="snippet");if(a.length>0){let r=await ji();for(let y of a)r?Yt(r,y.name)||t.set(y.key,{kind:"catalog"}):t.set(y.key,{kind:"unchecked"})}if(o.length>0){let r=await ry(),y=yy(),d=0;await Promise.all(o.map(async p=>{let m=sy(p),b=Jl[p.type];if(!m||!b)return;if(r===null){t.set(p.key,{kind:"unchecked"});return}if(oy(m,r)){t.set(p.key,{kind:"blocked"});return}let k=ly(y,m);k===void 0&&d<ty&&(d+=1,k=await cy(m),k!==void 0&&(y[m.toLowerCase()]={topics:k,at:Date.now()})),k===void 0?t.set(p.key,{kind:"unchecked"}):(k===null||!k.includes(b))&&t.set(p.key,{kind:"catalog"})})),uy(y)}return t}function ay(e){let n=null;for(let t of e.sources){let i;try{i=new URL(t)}catch(o){return{kind:"host",host:t.slice(0,40)}}let a=zi(i);if(!a)return{kind:"host",host:i.host};e.repo&&a.toLowerCase()!==e.repo.toLowerCase()&&(n!=null||(n=a))}return n?{kind:"repo",repo:n}:null}function sy(e){for(let n of e.sources)try{let t=zi(new URL(n));if(t)return t}catch(t){}return e.repo}function oy(e,n){let t=`https://github.com/${e}`.toLowerCase();return n.some(i=>{let a=i.toLowerCase();if(!a.includes("*"))return a===t;let o=a.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${o}$`).test(t)})}function so(e){return e.replace(/\n/g,"").trim().toLowerCase()}function Yt(e,n){return e.get(so(n))}var Vn=null,Jn=null;function ry(){return Vn!=null||(Vn=oo(Xl).then(e=>{let n=e==null?void 0:e.repos;return Array.isArray(n)?n.filter(t=>typeof t=="string"&&!t.startsWith("//")):(Vn=null,null)})),Vn}function ji(){return Jn!=null||(Jn=oo(Zl).then(e=>{if(!Array.isArray(e))return Jn=null,null;let n=new Map;for(let t of e){if(typeof(t==null?void 0:t.title)!="string"||typeof t.code!="string")continue;let i=typeof t.preview=="string"?t.preview:null;n.set(so(t.title),g({title:t.title,code:t.code,description:typeof t.description=="string"?t.description:""},i?{imageURL:i.startsWith("http")?i:`${Ql}${i}`}:{}))}return n})),Jn}async function cy(e){let n=await ro(`${ey}/${e}`);if((n==null?void 0:n.status)===404)return null;if(!(n!=null&&n.ok))return;let t=await n.json().catch(()=>null);return Array.isArray(t==null?void 0:t.topics)?t.topics.filter(i=>typeof i=="string"):void 0}async function oo(e){let n=await ro(e);return n!=null&&n.ok?n.json().catch(()=>null):null}async function ro(e){let n=typeof AbortController=="function"?new AbortController:null,t=setTimeout(()=>n==null?void 0:n.abort(),ny);try{return await fetch(e,{signal:n==null?void 0:n.signal})}catch(i){return null}finally{clearTimeout(t)}}function ly(e,n){let t=e[n.toLowerCase()];return t&&Date.now()-t.at<ao?t.topics:void 0}function yy(){var e;try{let n=JSON.parse((e=localStorage.getItem(io))!=null?e:"{}");return n&&typeof n=="object"?n:{}}catch(n){return{}}}function uy(e){let n=Date.now(),t=Object.entries(e).filter(([,i])=>n-i.at<ao).sort(([,i],[,a])=>a.at-i.at).slice(0,iy);try{localStorage.setItem(io,JSON.stringify(Object.fromEntries(t)))}catch(i){}}var fy=/^[0-9A-HJKMNP-TV-Z]{6}$/,dy=6,py="SYN-",uo=60,Fi=20,fo=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],my="marketplace:installed:",Bd=`${my}snippet:`,on="marketplace:theme-installed",co="marketplace",lo={added:0,removed:1,unchanged:2},gy=new RegExp(`^[a-z0-9][a-z0-9_-]{1,${Fi-2}}[a-z0-9]$`);function po(e){let n=e.trim().replace(/^@/,"").toLowerCase();return/[^a-z0-9_-]/.test(n)?"Only letters, digits, _ and -":n.length<3?"At least 3 characters":!/^[a-z0-9]/.test(n)||!/[a-z0-9]$/.test(n)?"Start and end with a letter or digit":null}function Ne(e){return`${py}${e}`}function mo(e){let n=e.trim();if(n.length>200)return null;if(n.includes("/")){let i=n.split(/[?#]/)[0].replace(/\/+$/,"");n=i.slice(i.lastIndexOf("/")+1).replace(/\.json$/i,"")}n=n.toUpperCase().replace(/[\s-]/g,""),n.length===dy+3&&n.startsWith("SYN")&&(n=n.slice(3));let t=n.replace(/O/g,"0").replace(/[IL]/g,"1");return fy.test(t)?t:null}function go(e){let n=e;return!n||typeof n.code!="string"||!n.keys||typeof n.keys!="object"||!Object.values(n.keys).every(t=>typeof t=="string")?null:{code:n.code,name:typeof n.name=="string"&&n.name?n.name:null,creator:typeof n.creator=="string"&&gy.test(n.creator)?n.creator:null,updated_at:typeof n.updated_at=="number"?n.updated_at:0,keys:n.keys}}async function ho(e,n){let t=e.filter(r=>!Ut(r)).map(r=>N(g({},r),{change:"added",isNew:!0})),i=Xn(t);for(let r of t)!i.has(r.key)&&!hy(r,n[r.key])&&i.set(r.key,{kind:"catalog"});let a=await Zn(t,i),o=new Map;for(let[r,y]of[...a,...i])y.kind!=="unchecked"&&o.set(r,y);return{items:t,leftOut:o}}function hy(e,n){if(e.type==="snippet")return!0;if(!e.repo)return!1;let t=Sy(n);return e.type==="extension"?typeof(t==null?void 0:t.extensionURL)=="string"&&t.extensionURL!=="":typeof(t==null?void 0:t.cssURL)=="string"&&t.cssURL!==""}function bo(e,n){let t={};for(let[a,o]of fo){let r=n.filter(y=>y.type===o&&e[y.key]!==void 0).map(y=>y.key);t[a]=JSON.stringify(r);for(let y of r)t[y]=e[y]}let i=Gn(e[on]);return i&&n.some(a=>a.key===i)&&(t[on]=e[on]),t}function ko(e,n,t,i,a,o){let r=o==="replace"?Yn(n,void 0,t,i):by(n,t),y=Gn(e.keys[on]),d=y!==null&&n.some(m=>m.key===y)&&i!==null&&i.current_theme!==co,p=y!==null&&y!==a?n.find(m=>m.key===y):void 0;return g(N(g({},r),{manual:d?[{type:"theme",name:co}]:[]}),p?{theme:{key:p.key,name:p.name}}:{})}function by(e,n){let t=new Set(n.map(r=>r.key)),i=new Set(e.map(r=>r.key)),a=[...e.map(r=>t.has(r.key)?N(g({},r),{change:"unchanged",isNew:!1}):N(g({},r),{change:"added",isNew:!0})),...n.filter(r=>!i.has(r.key)).map(r=>N(g({},r),{change:"unchanged",isNew:!1}))].sort((r,y)=>lo[r.change]-lo[y.change]||r.name.localeCompare(y.name)),o={added:0,removed:0,unchanged:0};for(let r of a)o[r.change]+=1;return{items:a,counts:o,manual:[]}}function So(e,n){return new Set(e.items.filter(t=>t.type==="snippet"&&t.change==="added"&&(!n||!Yt(n,t.name))).map(t=>t.key))}async function wo(e,n,t,i){let a=await me(),o=J(a),r=J(e.keys),y={};for(let[b,k]of fo){let S=yo(a[b]),_=[...n==="add"?S:S.filter(A=>t.includes(A)||o.some(T=>T.key===A&&Wn(T,r)))];for(let A of r){if(A.type!==k||t.includes(A.key))continue;let T=S.includes(A.key);if(n==="add"&&T)continue;let P=k==="snippet"?ky(A,i,a[A.key]):e.keys[A.key];P!==void 0&&(y[A.key]=P,_.includes(A.key)||_.push(A.key))}y[b]=JSON.stringify(_)}let d=Gn(e.keys[on]),p=yo(y["marketplace:installed-themes"]);d&&p.includes(d)&&!t.includes(d)&&(y[on]=e.keys[on]);let m=Ki(a,y);return await $i(y,m),Object.keys(y).length+m.length}function ky(e,n,t){let i=n?Yt(n,e.name):void 0;return i?JSON.stringify(g({code:i.code,title:i.title,description:i.description},i.imageURL?{imageURL:i.imageURL}:{})):t}function yo(e){try{let n=e?JSON.parse(e):[];return Array.isArray(n)?n.filter(t=>typeof t=="string"):[]}catch(n){return[]}}function Sy(e){try{let n=e?JSON.parse(e):null;return n&&typeof n=="object"&&!Array.isArray(n)?n:null}catch(n){return null}}var Qn="/api/shares",wy=`${Qn}/update`,xy=`${Qn}/delete`,vy=`${Qn}/import`,Cy="x-syncify-user-hash",Ny="discover/presets.json",Ey={no_code:"This code doesn't exist.",too_many_codes:"You can't make more share codes. Delete one to make another.",daily_limit:"Too many changes to share codes today. Try again tomorrow.",too_large:"This setup is too big to share.",invalid_name:"Names can be up to 60 characters.",empty:"There's nothing to share yet. Install something from Marketplace first.",invalid_items:"Syncify couldn't read some items. Reload Spotify and try again.",source:"Some items don't load from GitHub. Reload Spotify and try again.",blocked:"Some items are on Marketplace's block list. Reload Spotify and try again.",custom_snippet:"Custom snippets can't be shared. Reload Spotify and try again.",unchecked:"Couldn't check Marketplace's block list. Try again in a minute.",publish_failed:"Couldn't publish the code. Press Update on it to try again.",delete_failed:"Couldn't delete the code. Try again.",same_setup:"You already shared this setup.",invalid_handle:"Handles are 3 to 20 letters, digits, _ or -, starting and ending with a letter or digit.",reserved_handle:"That handle isn't allowed. Pick another.",handle_taken:"That handle is taken. Pick another.",unavailable:"Share codes aren't available yet."},_y=new Set(["offline","signed_out","invalid_signature","stale_salt","no_device_key","too_many_requests"]);function Wt(e,n=null){var t;return e instanceof E&&_y.has(e.code)?an(e):e instanceof E&&e.code==="too_many_codes"&&n!==null?`You have ${n} share codes already. Delete one to make another.`:(t=e instanceof E?Ey[e.code]:void 0)!=null?t:"Something went wrong. Try again."}async function Yi(){var n;let e=await Kn(Qn,"GET");return{codes:Array.isArray(e==null?void 0:e.codes)?e.codes.flatMap(t=>{let i=Iy(t);return i?[i]:[]}):[],newHearts:typeof(e==null?void 0:e.new_hearts)=="number"?e.new_hearts:0,max:typeof(e==null?void 0:e.max)=="number"?e.max:null,profile:typeof((n=e==null?void 0:e.profile)==null?void 0:n.handle)=="string"?{handle:e.profile.handle,link:typeof e.profile.link=="string"?e.profile.link:null}:null,suggestedHandle:typeof(e==null?void 0:e.suggested_handle)=="string"?e.suggested_handle:null}}async function xo(e,n,t){return Io(await Kn(Qn,"POST",g({name:e,keys:n},t===void 0?{}:{handle:t})))}function Wi(e){return`${U().shareUrl.replace(/\/+$/,"")}/@${e}`}async function vo(e,n,t){return Io(await Kn(wy,"POST",{code:e,name:n,keys:t}))}async function Co(e){try{await Kn(xy,"POST",{code:e})}catch(n){if(n instanceof E&&n.code==="no_code")return;throw n}}async function No(e){let n=U().shareUrl.replace(/\/+$/,""),t;try{t=await fetch(`${n}/${e}.json`)}catch(a){throw new E("offline")}if(t.status===404||t.status===403)throw new E("no_code");if(!t.ok)throw new E("failed");let i=go(await t.json().catch(()=>null));if(!i||i.code!==e)throw new E("no_code");return i}async function Eo(){let e=U().shareUrl.replace(/\/+$/,"");try{let n=await fetch(`${e}/${Ny}`);if(!n.ok)return null;let t=await n.json();return Array.isArray(t.posts)?t.posts.flatMap(i=>{let a=Py(i);return a?[a]:[]}):null}catch(n){return null}}async function _o(e,n,t=!1){try{await Ms(vy,g({code:e},t?{source:"preset"}:{}),{[Cy]:n.hash})}catch(i){}}function Iy(e){let n=e;return!n||typeof n.code!="string"?null:{code:n.code,name:typeof n.name=="string"&&n.name?n.name:null,link:typeof n.link=="string"?n.link:null,item_count:typeof n.item_count=="number"?n.item_count:0,imports:typeof n.imports=="number"?n.imports:0,created_at:typeof n.created_at=="number"?n.created_at:0,updated_at:typeof n.updated_at=="number"?n.updated_at:0,hearts:Ty(e.post),posted:Ry(e.post)}}function Ry(e){let n=e==null?void 0:e.status;return typeof n=="string"&&n!=="removed"}function Ty(e){let n=e;return(n==null?void 0:n.status)==="public"&&n.hidden!==!0&&typeof n.hearts=="number"?n.hearts:null}function Py(e){let n=e,t=i=>Number.isSafeInteger(i)&&i>=0?i:0;return!n||typeof n.code!="string"?null:{code:n.code,name:typeof n.name=="string"?n.name:Ne(n.code),extensions:t(n.extensions),themes:t(n.themes),snippets:t(n.snippets)}}function Io(e){let n=e;if(typeof(n==null?void 0:n.code)!="string")throw new E("failed");return{code:n.code,link:typeof n.link=="string"?n.link:null,leftOut:Array.isArray(n.left_out)?n.left_out.length:0}}var Ro="/claims",Ay="/claims/cancel",My={no_backup:"Back up first, then secure your backup.",unsupported_identity:"This Spotify account can't be secured.",too_many_accounts:"Your account already has 10 Spotify accounts linked.",undone:"This backup can't be secured with your account.",offline:"Couldn't reach Syncify. Check your connection and try again."},qe=class extends Error{constructor(t){var i;super((i=My[t])!=null?i:"Couldn't secure your backup. Try again.");this.code=t;this.name="ClaimError"}};async function To(e,n){let t=await qi(e,n,"GET",Ro);if(!t.ok)throw new qe(await Gi(t));let i=await t.json().catch(()=>null);return{claim:jn(i==null?void 0:i.claim),accounts:Array.isArray(i==null?void 0:i.accounts)?i.accounts.filter(Dy):null}}async function Po(e,n){let t=await qi(e,n,"POST",Ro);if(!t.ok)throw new qe(await Gi(t));let i=await t.json().catch(()=>null);return jn(i==null?void 0:i.claim)}async function Ao(e,n){let t=await qi(e,n,"POST",Ay);if(t.status===404)return"cancelled";if(!t.ok)throw new qe(await Gi(t));let i=await t.json().catch(()=>null);return(i==null?void 0:i.held)===!0?"checking":"cancelled"}async function qi(e,n,t,i){try{return await Fe(e,n,{method:t},i)}catch(a){throw a instanceof TypeError?new qe("offline"):a}}async function Gi(e){let n=await e.json().catch(()=>null);return typeof(n==null?void 0:n.code)=="string"?n.code:"failed"}function Dy(e){let n=e;return!!(n&&typeof n.hash=="string"&&(n.status==="pending"||n.status==="final"||n.status==="cancelled"||n.status==="unlinked"))}var Sn={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},Ly=/^([a-z0-9]|f([1-9]|1[0-2]))$/,Oy=250,Uy=40,Vi=null,qt=null,kn=null;function Mo(){return/mac/i.test(navigator.platform||navigator.userAgent)}function Do(e){if(e===null)return null;if(!e||typeof e!="object")return Sn;let n=e;return typeof n.key!="string"||!Ly.test(n.key)?Sn:{key:n.key,ctrl:!!n.ctrl,alt:!!n.alt,shift:!!n.shift,meta:!!n.meta}}function et(e){if(!e)return"Off";let n=e.key.toUpperCase();return Mo()?[e.ctrl?"\u2318":"",e.alt?"\u2325":"",e.shift?"\u21E7":"",n].join(""):[e.ctrl&&"Ctrl",e.meta&&"Win",e.alt&&"Alt",e.shift&&"Shift",n].filter(Boolean).join("+")}function Lo(e){if(e.key==="Escape")return{kind:"cancel"};let n=By(e.code);if(!n)return{kind:"ignore"};let t=Mo();if(t&&e.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:n,ctrl:t?e.metaKey:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:t?!1:e.metaKey},a=n.startsWith("f")&&n.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!a?{kind:"error",message:`Include ${t?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function By(e){var t,i;let n=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(e);return n?((i=(t=n[1])!=null?t:n[2])!=null?i:n[3]).toLowerCase():null}function Oo(e){var n;if(kn&&$y(kn,e))return!1;try{let t=Spicetify.Mousetrap,i=(n=t.trigger)==null?void 0:n.call(t)._directMap;if(!i)return!1;let a=Ji(e);return Object.keys(i).some(o=>o.startsWith(`${a}:`))}catch(t){return!1}}function Xi(e,n,t=0){if(Vi=n,qt=e,!Uo()){if(t>=Uy){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>Xi(qt,n,t+1),Oy);return}Zi(qt)}function Zi(e){if(qt=e,!Uo()||!Vi)return;let n=Vi;try{if(kn&&Spicetify.Keyboard._deregisterShortcut(kn),kn=null,!e)return;Spicetify.Keyboard.registerShortcut(e,t=>{t.preventDefault(),n()}),kn=e,console.debug("[Syncify]","Keyboard shortcut registered",et(e))}catch(t){console.warn("[Syncify]","Failed to register keyboard shortcut",t)}}function Uo(){var e;return typeof((e=Spicetify.Keyboard)==null?void 0:e.registerShortcut)=="function"}function Ji(e){return[e.ctrl&&"mod",e.meta&&"meta",e.alt&&"alt",e.shift&&"shift",e.key].filter(Boolean).join("+")}function $y(e,n){return Ji(e)===Ji(n)}var Qi="both",Ky=["both","topbar","menu"],nt=null,tt=null,Gt=!1;function Bo(e){return Ky.includes(e)?e:Qi}function $o(){var e;return typeof((e=Spicetify.Menu)==null?void 0:e.Item)=="function"}function Ko(e){nt=e.topbarButton,tt=e.menuItem}function Vt(e){let n=e!=="menu"||!tt,t=e!=="topbar";if(nt!=null&&nt.element&&(nt.element.style.display=n?"":"none"),!!tt)try{t&&!Gt?(tt.register(),Gt=!0):!t&&Gt&&(tt.deregister(),Gt=!1)}catch(i){console.warn("[Syncify]","Failed to update profile menu item",i)}}var Xt="syncify:config",Jt={workerUrl:U().workerUrl,autoBackupEnabled:!1,shortcut:Sn,entryPoint:Qi};function ge(){var t,i;let e=U(),n=(i=(t=Spicetify.LocalStorage)==null?void 0:t.get(Xt))!=null?i:window.localStorage.getItem(Xt);if(!n)return N(g({},Jt),{workerUrl:e.workerUrl});try{let a=JSON.parse(n);return{workerUrl:e.workerUrl,autoBackupEnabled:a.autoBackupEnabled===void 0?Jt.autoBackupEnabled:!!a.autoBackupEnabled,shortcut:a.shortcut===void 0?Jt.shortcut:Do(a.shortcut),entryPoint:Bo(a.entryPoint)}}catch(a){return N(g({},Jt),{workerUrl:e.workerUrl})}}function Zt(e){var t;let n=JSON.stringify({workerUrl:U().workerUrl,autoBackupEnabled:e.autoBackupEnabled,shortcut:e.shortcut,entryPoint:e.entryPoint});if((t=Spicetify.LocalStorage)!=null&&t.set){Spicetify.LocalStorage.set(Xt,n);return}window.localStorage.setItem(Xt,n)}function it(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}var Hy=["username","canonicalUsername","id","uri","displayName"];async function Ee(){let{value:e,field:n}=await zy();return{hash:await Lt(e),field:n}}async function zy(){var a;let e=(a=Spicetify.Platform)==null?void 0:a.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let n=await e.getUser(),t=Hy.find(o=>(n==null?void 0:n[o])!=null),i=t?n[t]:void 0;if(!t||!i)throw new Error("Unable to resolve the active Spotify user.");return{value:i,field:t}}async function st(e){if(!it(e))throw new Error("Syncify backup service is not configured.");let[n,t]=await Promise.all([Ee(),Qs()]);if(t.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:i,unapproved:a}=await Os(e.workerUrl,n,t);return{payload:t,unchanged:i,unapproved:a}}async function wn(e,n){var y;if(!it(e))throw new Error("Syncify backup service is not configured.");let t=await Ai(e.workerUrl,await Ee(),n),[i,a,o]=await Promise.all([Promise.all(t.backups.map(na)),t.safetyCopy?na(t.safetyCopy):null,Promise.all(t.unapproved.map(na))]),r=i.filter((d,p)=>i.findIndex(m=>m.payload_hash===d.payload_hash)===p);return N(g({},t),{payload:(y=r[0])!=null?y:null,backups:r,safetyCopy:a&&!r.some(d=>d.payload_hash===a.payload_hash)?a:null,unapproved:o.filter(d=>!r.some(p=>p.payload_hash===d.payload_hash))})}var ea=new Map;async function na(e){var o,r,y;let n=(r=(o=e.marketplace_data)==null?void 0:o.keys)!=null?r:{},t=e.spicetify_config?Oi(e.spicetify_config,n):void 0,i=`${e.payload_hash} ${(y=e.metadata)==null?void 0:y.last_sync_datetime}`,a=ea.get(i);return a||(a=Ht(n,t),ea.set(i,a),a.catch(()=>ea.delete(i))),N(g(g({},e),t?{spicetify_config:t}:{}),{payload_hash:await a})}async function Ho(e){let n=await Ai(ot(e),await Ee());return{claim:n.claim,install:n.install,nudge:n.nudge}}async function zo(e,n,t,i=[]){var y;let a=n!=null?n:(await wn(e)).payload;if(!a)throw new Error("No Syncify cloud backup was found for this Spotify account.");let o=await eo(a,i),r=(y=a.backup)==null?void 0:y.id;return r&&it(e)&&Ee().then(d=>Bs(e.workerUrl,d,r,t)).catch(()=>{}),{payload:a,restoredCount:o}}var at=class extends Error{constructor(t){super("Couldn't back up your setup first, so nothing changed.");this.reason=t;this.name="SafetyBackupError"}};async function jo(e,n,t,i,a,o=!1){try{await st(e)}catch(y){throw new at(y)}let r=await wo(n,t,i,a);return Ee().then(y=>_o(n.code,y,o)).catch(()=>{}),r}async function Fo(e){let n=await Ee(),t=await To(ot(e),n);return N(g({},t),{hash:n.hash})}async function Yo(e){await Po(ot(e),await Ee())}async function Qt(e,n,t){await Us(ot(e),await Ee(),n,t)}async function ei(e){return Ao(ot(e),await Ee())}function ot(e){if(!it(e))throw new Error("Syncify backup service is not configured.");return e.workerUrl}var Wo="syncify:nudge-hidden-until",qo="syncify:nudge-panel-shown";function Go(e=Date.now()){let n=Number(Zo(Wo));return Number.isFinite(n)&&n>e}function Vo(e=Date.now()){Qo(Wo,String(e+30*864e5))}function Jo(){return Zo(qo)!==null}function Xo(){Qo(qo,"1")}function Zo(e){var n,t;return(t=(n=Spicetify.LocalStorage)==null?void 0:n.get(e))!=null?t:window.localStorage.getItem(e)}function Qo(e,n){var t;(t=Spicetify.LocalStorage)!=null&&t.set?Spicetify.LocalStorage.set(e,n):window.localStorage.setItem(e,n)}var ta="syncify:claim-check-day",er="syncify:undone-claim-shown";async function nr(e){var t,i;let n=ge();if(n.workerUrl){if(!n.autoBackupEnabled)return jy(e);try{let[a,o]=await Promise.all([zt(),wn(n)]);tr(o,e);let r=(i=(t=o.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?i:0;if(o.exists&&no(a.keyCount,r)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(o.backups.some(d=>d.payload_hash===a.hash)||a.keyCount===0)return;let{unapproved:y}=await st(n);Spicetify.showNotification(y?"Syncify: backed up, waiting for approval":"Syncify auto-backup complete")}catch(a){if(a instanceof Ce||a instanceof sn){Spicetify.showNotification("Syncify: sign in to keep backing up",!0,8e3);return}let o=a instanceof Error?a.message:String(a);console.warn("Syncify startup sync failed:",a),Spicetify.showNotification(`Syncify auto-sync skipped: ${o}`,!0,8e3)}}}async function jy(e){let n=new Date().toLocaleDateString("en-CA");if(ir(ta)!==n)try{let t=await Ho(ge());ia(ta,n),tr(t,e)}catch(t){if(t instanceof Ce){ia(ta,n);return}console.warn("Syncify claim check failed:",t)}}function tr(e,n){var o;let t=Fy(e.claim),i=Yy(e.claim),a=(o=e.install)==null?void 0:o.waiting[0];t?n.onClaim(t):i?n.onUndone(i)&&ia(er,String(i.undone_at)):a?n.onInstall(a):e.nudge&&!Jo()&&n.onNudge()}function Fy(e){return(e==null?void 0:e.status)==="pending"&&!e.mine&&!e.not_me?e:null}function Yy(e){return(e==null?void 0:e.status)==="undone"&&ir(er)!==String(e.undone_at)?e:null}function ir(e){var n,t;return(t=(n=Spicetify.LocalStorage)==null?void 0:n.get(e))!=null?t:window.localStorage.getItem(e)}function ia(e,n){var t;(t=Spicetify.LocalStorage)!=null&&t.set?Spicetify.LocalStorage.set(e,n):window.localStorage.setItem(e,n)}var sa="syncify:pending-restore",Wy=600*1e3,qy=2e3,Gy=15e3,Vy="marketplace:theme-installed",Jy="raw.githubusercontent.com",Xy=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],_e=null,aa=new Set,or=new Map;function rr(){return _e}function cr(e){return aa.add(e),()=>aa.delete(e)}function lr(){_e&&pr(N(g({},_e),{manual:[]}))}function ti(e,n="restore"){try{localStorage.setItem(sa,JSON.stringify({at:Date.now(),manual:e,kind:n}))}catch(t){}}function yr(){var e;ti((e=_e==null?void 0:_e.manual)!=null?e:[],_e==null?void 0:_e.kind),window.location.reload()}function ur(){mr()&&(document.addEventListener("load",e=>ar(e.target,"load"),!0),document.addEventListener("error",e=>ar(e.target,"error"),!0))}async function fr(){let e=mr();if(!e)return;try{localStorage.removeItem(sa)}catch(r){}let n=Date.now(),t=await sr();for(;t.loaded<t.total&&Date.now()-n<Gy;)await new Promise(r=>setTimeout(r,qy)),t=await sr();pr(N(g({kind:e.kind,at:Date.now()},t),{manual:e.manual}));let i=t.loaded===t.total&&e.manual.length===0,a=e.kind==="share"?"Setup applied":"Backup restored",o=e.kind==="share"?"loaded":"restored";Spicetify.showNotification(i?`Syncify: ${a}; ${t.total} ${t.total===1?"item":"items"}`:`Syncify: ${o} ${t.loaded} of ${t.total}. Open Syncify for details.`,!1,8e3)}function dr(e){let n=e.map(t=>t.type==="extension"?`spicetify config extensions ${ni(t.name)}`:t.type==="custom_app"?`spicetify config custom_apps ${ni(t.name)}`:`spicetify config current_theme ${ni(t.name)}${t.scheme?` color_scheme ${ni(t.scheme)}`:""}`);return n.length>0?[...n,"spicetify apply"]:[]}function ni(e){return/^[\w.@+/-]+$/.test(e)?e:`"${e}"`}function pr(e){_e=e;for(let n of aa)n(e)}function mr(){var e;try{let n=JSON.parse((e=localStorage.getItem(sa))!=null?e:"null");return!n||Date.now()-n.at>Wy?null:{manual:Array.isArray(n.manual)?n.manual:[],kind:n.kind==="share"?"share":"restore"}}catch(n){return null}}function ar(e,n){e instanceof HTMLScriptElement&&e.src&&or.set(rt(e.src),n)}async function sr(){var i;let e=await me(),n=(i=e[Vy])!=null?i:"",t=J(e).filter(a=>a.type==="extension"&&a.sources.length>0||a.type==="theme"&&n.includes(a.key)||a.type==="snippet");return{loaded:t.filter(Zy).length,total:t.length}}function Zy(e){var n,t;if(e.type==="snippet"){let i=document.querySelector("style.marketplaceSnippets");return((n=i==null?void 0:i.textContent)==null?void 0:n.includes(`/* ${e.name} - `))===!0}if(e.type==="theme"){let i=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((t=i==null?void 0:i.textContent)!=null&&t.trim())}return Qy(e.sources[0]).some(eu)}function Qy(e){let n;try{n=new URL(e)}catch(r){return[]}if(n.host!==Jy)return[rt(n.href)];let[t,i,a,...o]=n.pathname.split("/").filter(Boolean);return!t||!i||!a||o.length===0?[]:Xy.map(r=>rt(`https://${r}/gh/${t}/${i}@${a}/${o.join("/")}`))}function eu(e){let n=or.get(e);return n?n==="load":[...document.querySelectorAll("script[src]")].some(i=>rt(i.src)===e)&&performance.getEntriesByType("resource").some(i=>rt(i.name)===e)}function rt(e){try{let n=new URL(e);return`${n.origin}${n.pathname}`}catch(n){return e}}function oa(e,n){return n===void 0?e:N(g({},e),{key:n})}function s(e,n,t){let o=n,{children:i}=o,a=xi(o,["children"]);return i===void 0?Un(e,oa(a,t)):Un(e,oa(a,t),i)}function l(e,n,t){let r=n,{children:i}=r,a=xi(r,["children"]),o=Array.isArray(i)?i:[i];return Un(e,oa(a,t),...o)}function ra(e){return`A new install${e.device?` on ${e.device}`:""} wants to back up this Spotify account.`}function gr(e){let t=Spicetify.React.useState,{install:i}=e,[a,o]=t(!1),[r,y]=t(null);async function d(p){o(!0),y(null);try{await Qt(ge(),i.id,p),Spicetify.showNotification(p==="approve"?"Syncify: install approved":"Syncify: install refused"),e.onDone(p)}catch(m){y(m instanceof Error?m.message:String(m)),o(!1)}}return l($,{children:[l("p",{className:"syncify-claim-notice",children:[ra(i)," Approve it if it's yours."]}),r?s("div",{className:"syncify-alert","data-kind":"error",role:"alert",children:r}):null,l("div",{className:"syncify-actions",children:[s("button",{className:"syncify-text-button",type:"button",onClick:e.onClose,disabled:a,children:"Close"}),s("button",{className:"syncify-button secondary",type:"button",onClick:()=>{d("reject")},disabled:a,children:"Not mine"}),s("button",{className:"syncify-button",type:"button",onClick:()=>{d("approve")},disabled:a,children:"Approve"})]})]})}var nu="syncify:beta",hr=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function br(){var e;return(e=window.SyncifyLoader)!=null?e:null}function tu(){try{return window.localStorage.getItem(nu)==="true"}catch(e){return!1}}async function kr(e){let n=tu()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(n.map(i=>iu(`${e}/${i}`)))).reduce((i,a)=>a&&(!i||la(a,i)>0)?a:i,null)}function ca(e){return typeof e=="string"&&hr.test(e)}function la(e,n){let[t,i]=[e,n].map(a=>{var p;let[,o,r,y,d]=(p=hr.exec(a))!=null?p:[];return[o,r,y,d!=null?d:1/0].map(Number)});for(let a=0;a<t.length;a+=1)if(t[a]!==i[a])return t[a]<i[a]?-1:1;return 0}async function iu(e,n=3e3){let t=typeof AbortController=="function"?new AbortController:null,i=setTimeout(()=>t==null?void 0:t.abort(),n);try{let a=await fetch(e,{signal:t==null?void 0:t.signal});if(!a.ok)return null;let o=await a.json();return ca(o==null?void 0:o.version)?o.version:null}catch(a){return null}finally{clearTimeout(i)}}var fa="syncify:share-code-count",au=600;function su(){var n,t;let e=Number((t=(n=Spicetify.LocalStorage)==null?void 0:n.get(fa))!=null?t:NaN);return Number.isInteger(e)&&e>=0?e:null}function Sr(e){var n,t;e===null?(n=Spicetify.LocalStorage)==null||n.remove(fa):(t=Spicetify.LocalStorage)==null||t.set(fa,String(e))}var da="syncify:handle";function ou(){var n;let e=(n=Spicetify.LocalStorage)==null?void 0:n.get(da);return e==null?void 0:e||null}function ya(e){var n,t;e===void 0?(n=Spicetify.LocalStorage)==null||n.remove(da):(t=Spicetify.LocalStorage)==null||t.set(da,e!=null?e:"")}var v=null;function ma(e={}){var Aa,Ma,Da,La,Oa,Ua,Ba,$a,Ka;let n=Spicetify.React,t=n.useEffect,i=n.useMemo,a=n.useState,o=n.useRef,[r,y]=a(()=>ge()),[d,p]=a(()=>v!=null&&v.remote.exists?"success":"idle"),[m,b]=a(null),[k,S]=a(0),[R,_]=a([]),[A,T]=a([]),[P,G]=a(null),[Ve,Ie]=a(null),[X,te]=a(null),[j,Re]=a(null),[z,ie]=a(()=>{var c;return(c=v==null?void 0:v.remote.payload)!=null?c:null}),[ae,w]=a(()=>{var c;return(c=v==null?void 0:v.remote.backups)!=null?c:[]}),[I,K]=a(()=>{var c;return(c=v==null?void 0:v.remote.safetyCopy)!=null?c:null}),[F,V]=a(()=>{var c;return(c=v==null?void 0:v.remote.unapproved)!=null?c:[]}),[se,Te]=a(()=>{var c;return(c=v==null?void 0:v.remote.install)!=null?c:null}),[ye,yt]=a(!1),[Nn,ut]=a(()=>new Set),[M,ue]=a(()=>{var c;return(c=v==null?void 0:v.remote.payload)!=null?c:null}),[Pe,rn]=a(v!==null),[cn,Z]=a(!1),[Y,oe]=a(!1),[Ae,En]=a(null),[O,re]=a(!1),[Be,he]=a(null),[be,_n]=a((Aa=e.section)!=null?Aa:null),[Je,ln]=a(!1),[C,$e]=a(()=>rr()),[ft,Xe]=a(!1),[Q,dt]=a(!1),[Me,pt]=a(null),[De,H]=a(()=>su()),[Ke,ce]=a(()=>ou()),[W,Le]=a(void 0),[B,li]=a(()=>{var c;return(c=v==null?void 0:v.lockedBy)!=null?c:null}),[He,In]=a(()=>{var c;return(c=v==null?void 0:v.remote.claim)!=null?c:null}),[ke,Ze]=a(()=>{var c;return(c=v==null?void 0:v.claims)!=null?c:null}),[fe,Rn]=a(!1),[mt,yn]=a(null),[yi,Qe]=a(()=>{var c;return(c=v==null?void 0:v.remote.nudge)!=null?c:!1}),[Tn,gt]=a(()=>Go()),[ui,fi]=a(e.secure===!0),Pn=o(!1),[un,An]=a(!1),[f,h]=a(null),[x,de]=a(null),Mn=o(null),Se=i(()=>U(),[]),fn=i(()=>I?[...ae,I]:ae,[ae,I]),di=f?[]:F,pi=f?(Ma=x==null?void 0:x.backups)!=null?Ma:[]:ae,ka=f?(Da=x==null?void 0:x.safetyCopy)!=null?Da:null:I,Sa=i(()=>{var c;return new Map([...fn,...F,...(c=x==null?void 0:x.backups)!=null?c:[],...x!=null&&x.safetyCopy?[x.safetyCopy]:[]].map(u=>[u,J(u.marketplace_data.keys)]))},[fn,F,x]),ht=c=>{var u;return(u=Sa.get(c))!=null?u:J(c.marketplace_data.keys)},Hr=c=>ht(c).map(u=>u.key),zr=c=>ht(c).length,ee=i(()=>cn&&M?Yn(ht(M),M.spicetify_config,A,P):null,[cn,M,Sa,A,P]),ze=i(()=>ee?Xn(ee.items):null,[ee]),bt=i(()=>new Map([...Ae!=null?Ae:[],...ze!=null?ze:[]]),[Ae,ze]),kt=((La=M==null?void 0:M.backup)==null?void 0:La.kind)==="quarantined",wa=i(()=>{var c;return new Set(((c=ee==null?void 0:ee.items)!=null?c:[]).filter(u=>{var D;return u.change!=="removed"&&u.isNew&&(kt||We(bt.get(u.key))||((D=bt.get(u.key))==null?void 0:D.kind)==="unchecked")}).map(u=>u.key))},[ee,bt,kt]),jr=[...wa].filter(c=>!Nn.has(c)),xa=ee!==null&&Ae===null,mi=i(()=>$o(),[]),va=i(()=>br()!==null,[]),pe=d==="loading",St=(m==null?void 0:m.kind)==="warning"||(m==null?void 0:m.kind)==="error"?m:null,wt=!!(j&&ae.some(c=>c.payload_hash===j)),Ca=!!(z&&j&&!wt),Na=!!(z&&j&&z.payload_hash===j),Ea=!!(M&&j&&M.payload_hash===j),xt=f!==null||Je||!Na||fn.length<2,Fr=xt?pi:pi.slice(0,1),vt=(He==null?void 0:He.status)==="pending"&&!He.mine?He:null,dn=yu(ke,B,vt!==null),Yr=!Tn&&!B&&z!==null&&be!=="account"&&(W?dn.kind==="open":W===null&&yi),Ct=(Oa=se==null?void 0:se.waiting[0])!=null?Oa:null,_a=!se||se.trusted||B||dn.kind==="secured"?null:se.refused?"This Spotify account refused backups from this install. Sign in to back up from it.":"This install isn't approved yet. Its backups are kept apart until you approve it from another install or sign in.",gi=(W?((Ua=ke==null?void 0:ke.accounts)!=null?Ua:[]).filter(c=>c.status==="final"):[]).map((c,u)=>({hash:c.hash,label:`Spotify account ${u+1}${c.device_info?` from ${c.device_info}`:""}`})).filter(c=>c.hash!==(ke==null?void 0:ke.hash)),Wr=!!(j&&k>0&&!fn.some(c=>c.payload_hash===j));t(()=>(le().catch(()=>null).then(c=>Le(u=>u!=null?u:c)),we({silent:!0}),Zr(),cr($e)),[]),t(()=>{if(En(null),!ee||!ze)return;[...ze.values()].some(We)&&oe(!0);let c=!0;return Zn(ee.items,ze).then(u=>{c&&(En(u),[...u.values()].some(We)&&oe(!0))}),()=>{c=!1}},[ee,ze]),t(()=>{if(!O)return;let c=u=>{var Oe;if(!((Oe=Mn.current)!=null&&Oe.isConnected)){re(!1),he(null);return}u.preventDefault(),u.stopImmediatePropagation();let D=Lo(u);if(D.kind!=="ignore"){if(D.kind==="cancel"){re(!1),he(null);return}if(D.kind==="error"){he(D.message);return}if(Oo(D.shortcut)){he(`${et(D.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}re(!1),hi(D.shortcut)}};return window.addEventListener("keydown",c,!0),()=>window.removeEventListener("keydown",c,!0)},[O,r]);async function Ia(){let c=await zt();return Re(c.hash),S(c.installedItemCount),_(c.installedItems),T(c.items),G(c.spicetifyConfig),Ie(c.activeTheme),te(c.marketplaceAvailable),c}async function we(c){try{Z(!1),(!(c!=null&&c.silent)||!v)&&p("loading"),c!=null&&c.silent||b({kind:"info",text:"Checking your Syncify backup\u2026"}),await Ia();let u,D=null;try{u=await wn(r)}catch(en){if(!(en instanceof Ce))throw en;u=Ru,D=en.code}let Oe=await le().catch(()=>null),xe=Oe?await Fo(r).catch(()=>null):null,q=Oe?await le().catch(()=>null):null;v={remote:u,lockedBy:D,claims:q?xe:null},Le(q),Ze(q?xe:null),li(D),D&&_n("account"),In(u.claim),h(null),de(null),ie(u.payload),w(u.backups),K(u.safetyCopy),V(u.unapproved),Te(u.install),Qe(u.nudge),ue(u.payload),rn(!0),p(u.exists?"success":"idle"),!(c!=null&&c.silent)&&!D&&b(u.exists&&u.payload?{kind:"success",text:`Backup found from ${ct(u.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(u){Ln(u)}}async function Nt(){Rn(!0),yn(null);try{await Yo(r)}catch(c){c instanceof qe&&["claim_pending","claimed"].includes(c.code)||yn(c instanceof Error?c.message:String(c))}finally{await we({silent:!0}),Rn(!1)}}function qr(){fi(!0),W?Nt():Dn("account")}function Gr(){Vo(),gt(!0)}t(()=>{!e.secure||Pn.current||fe||!W||dn.kind!=="open"||B||(Pn.current=!0,Nt())},[W,dn.kind,B,fe]);function Vr(c){Le(c),Pn.current=!0,!B&&z?Nt():we({silent:!0})}function Ra(){Sr(null),H(null),ya(void 0),ce(void 0),Le(null),Ze(null),yn(null),we({silent:!0})}async function Jr(){An(!0);try{Spicetify.showNotification(ha(await ei(r))),await we({silent:!0})}catch(c){b({kind:"error",text:c instanceof Error?c.message:String(c)})}finally{An(!1)}}async function Xr(c){if(Z(!1),h(c),de(null),!c){ue(z);return}ue(null);try{let u=await wn(r,c);de(u),ue(u.payload)}catch(u){h(null),ue(z),Ln(u)}}async function Zr(){let c=Se.version;if(!ca(c))return;let u=await kr(Se.releasesUrl);u&&la(u,c)>0&&pt(u)}function Qr(c){let u=N(g({},r),{autoBackupEnabled:c});y(u),Zt(u),b({kind:"success",text:c?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}function hi(c){let u=N(g({},r),{shortcut:c});y(u),Zt(u),Zi(c),he(null),b({kind:"success",text:c?`${et(c)} now opens Syncify.`:"Keyboard shortcut turned off."})}function ec(c){let u=N(g({},r),{entryPoint:c});y(u),Zt(u),Vt(c)}function Dn(c){_n(c),c!=="settings"&&re(!1)}function nc(){he(null),re(!0)}async function tc(){var c;try{Z(!1),p("loading"),b({kind:"info",text:"Backing up your extensions and themes\u2026"});let{payload:u,unchanged:D,unapproved:Oe}=await st(r);if(await Ia(),Oe){await we({silent:!0}),b({kind:"warning",text:"Backed up, but kept apart until this install is approved."}),Spicetify.showNotification("Syncify: backed up, waiting for approval");return}if(D){rn(!0),p("success"),b({kind:"success",text:"Everything is already backed up."}),Spicetify.showNotification("Syncify: everything is already backed up");return}let xe=[u,...ae.filter(q=>q.payload_hash!==u.payload_hash)].slice(0,Iu);v&&(v=N(g({},v),{remote:N(g({},v.remote),{exists:!0,payload:u,backups:xe,safetyCopy:((c=v.remote.safetyCopy)==null?void 0:c.payload_hash)===u.payload_hash?null:v.remote.safetyCopy})})),ie(u),w(xe),K(q=>(q==null?void 0:q.payload_hash)===u.payload_hash?null:q),ue(u),rn(!0),p("success"),b({kind:"success",text:`Backed up ${u.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(u){Ln(u)}}async function Ta(c){if(Ct){yt(!0);try{await Qt(r,Ct.id,c),Spicetify.showNotification(c==="approve"?"Syncify: install approved":"Syncify: install refused"),await we({silent:!0})}catch(u){Ln(u)}finally{yt(!1)}}}function ic(c=M){if(X===!1){let u="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";b({kind:"error",text:u}),Spicetify.showNotification(u,!0,6e3);return}if(!c){let u="No Syncify cloud backup was found for this Spotify account.";b({kind:"error",text:u}),Spicetify.showNotification(u,!0,6e3);return}ue(c),oe(!1),ut(new Set),Z(!0)}async function ac(){let c=M?Yn(ht(M),M.spicetify_config,A,P).manual:[];try{Z(!1),p("loading"),b({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:u,restoredCount:D}=await zo(r,M!=null?M:void 0,f!=null?f:void 0,jr);ue(u),p("success"),b({kind:"success",text:`Restored ${D} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),ti(c),setTimeout(()=>window.location.reload(),1e3)}catch(u){Ln(u)}}async function sc(c){await Tr(c)&&(Xe(!0),setTimeout(()=>Xe(!1),2e3))}function je(c){if(c.startsWith("mailto:")){window.location.href=c;return}window.open(c,"_blank","noopener,noreferrer")}function Ln(c){if(p("error"),c instanceof zn){dt(!0),b(null);return}if(c instanceof sn){b({kind:"error",text:c.message}),we({silent:!0});return}if(c instanceof Ce&&c.code!=="not_linked"){b(null),we({silent:!0});return}let u=c instanceof Error?c.message:String(c);b({kind:"error",text:u}),Spicetify.showNotification(u,!0,6e3)}function bi(c,u){var Ha,za;let D=(M==null?void 0:M.payload_hash)===c.payload_hash,Oe=c.payload_hash===j,xe=ct(c.metadata.last_sync_datetime),q=Er(zr(c)),en=(za=(Ha=c.backup)==null?void 0:Ha.name)!=null?za:null;return l("button",{className:"syncify-backup",role:"radio","aria-checked":D,"data-selected":D?"true":"false",type:"button",title:u!=null&&u.isSafetyCopy?"Kept aside and updated about once a week, so a burst of new backups can't replace it":u!=null&&u.isUnapproved?"From an install this Spotify account hasn't approved":void 0,onClick:()=>{ue(c),Z(!1)},disabled:pe,children:[s("span",{className:"syncify-radio","aria-hidden":"true"}),u!=null&&u.isSafetyCopy?l("span",{className:"syncify-backup-text",children:[l("span",{children:["Safety copy",l("span",{className:"syncify-backup-note",children:[s(vn,{}),"updated weekly"]})]}),s("span",{className:"syncify-muted",children:s(Ge,{parts:[en,xe,q]})})]}):u!=null&&u.isUnapproved?l("span",{className:"syncify-backup-text",children:[l("span",{children:["Not approved",l("span",{className:"syncify-backup-note",children:[s(vn,{}),xe]})]}),s("span",{className:"syncify-muted",children:s(Ge,{parts:[q,`from ${c.metadata.device_info}`]})})]}):en?l("span",{className:"syncify-backup-text",children:[s("span",{children:en}),s("span",{className:"syncify-muted syncify-backup-date",children:s(Ge,{parts:[xe,q,`from ${c.metadata.device_info}`]})})]}):l("span",{className:"syncify-backup-text",children:[s("span",{className:"syncify-backup-date",children:xe}),s("span",{className:"syncify-muted",children:s(Ge,{parts:[q,`from ${c.metadata.device_info}`]})})]}),Oe?s("span",{className:"syncify-tag",title:"What's on this device now",children:"Current"}):null,u!=null&&u.isSafetyCopy?s(Cr,{}):null,u!=null&&u.isUnapproved?s(ba,{}):null]},`${c.payload_hash}-${c.metadata.last_sync_datetime}`)}function ki(c){c.stopPropagation()}let oc=Q?"Update Syncify to keep backing up":B?"Sign in to restore":Pe?z?Ca?"Changes since your last backup":"Everything is backed up":"No backup yet":d==="error"?"Couldn't check your backup":"Checking your backup\u2026",Si=Q?"Your backups are safe":B?B==="not_owner"?"Secured by another account":"This backup is secured":Pe?z?Ca?Pu(z,Hr(z),R,P):`Last backup ${ct(z.metadata.last_sync_datetime)}`:"Save your extensions and themes so you can restore them after a reinstall or on another computer.":null,Pa=!!(C&&!Q&&Date.now()-C.at<_u),On=!!(C&&C.loaded===C.total),wi=dr((Ba=C==null?void 0:C.manual)!=null?Ba:[]);return l("div",{className:"syncify-panel",ref:Mn,onClick:ki,onMouseDown:ki,onPointerDown:ki,children:[Q?l("div",{className:"syncify-alert","data-kind":"error",role:"alert",children:[s("span",{children:"This version of Syncify is no longer supported."}),s("button",{className:"syncify-text-button",type:"button",onClick:()=>je(`${Se.githubUrl}#updating`),children:"How to update"})]}):null,vt?l("div",{className:"syncify-alert",role:"alert",children:[s("span",{children:ga(vt)}),vt.not_me?null:s("span",{className:"syncify-alert-actions",children:s("button",{className:"syncify-text-button",type:"button",onClick:()=>{Jr()},disabled:un,children:"Not me"})})]}):null,Ct?l("div",{className:"syncify-alert",role:"alert",children:[s("span",{children:ra(Ct)}),l("span",{className:"syncify-alert-actions",children:[s("button",{className:"syncify-text-button",type:"button",onClick:()=>{Ta("reject")},disabled:ye,children:"Not mine"}),s("button",{className:"syncify-text-button",type:"button",onClick:()=>{Ta("approve")},disabled:ye,children:"Approve"})]})]}):null,_a?s("div",{className:"syncify-alert",role:"status",children:s("span",{children:_a})}):null,wi.length>0?l("div",{className:"syncify-alert syncify-manual",role:"status",children:[l("span",{className:"syncify-manual-header",children:[s("span",{children:C.manual.length===1?"1 isn't from Marketplace. Add it in a terminal:":`${C.manual.length} aren't from Marketplace. Add them in a terminal:`}),s("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:lr,children:s(pa,{})})]}),l("span",{className:"syncify-code",children:[s("code",{children:wi.join(`
`)}),s("button",{className:"syncify-text-button",type:"button",onClick:()=>{sc(wi.join(`
`))},children:ft?"Copied":"Copy"})]})]}):null,St?l("div",{className:"syncify-alert","data-kind":St.kind,children:[s("span",{children:St.text}),l("span",{className:"syncify-alert-actions",children:[St.kind==="error"?s("button",{className:"syncify-text-button",type:"button",onClick:()=>{we()},disabled:pe,children:"Try again"}):null,s("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>b(null),children:s(pa,{})})]})]}):null,l("section",{className:"syncify-status","aria-live":"polite",children:[Pa&&C?l("div",{className:"syncify-status-text",children:[s("h3",{className:"syncify-status-title",children:C.kind==="share"?On?"Setup loaded":`Loaded ${C.loaded} of ${C.total}`:On?"Backup restored":`Restored ${C.loaded} of ${C.total}`}),s("p",{className:"syncify-muted",children:On?C.total===0?"Nothing from Marketplace to load":`${C.loaded} of ${C.total} loaded`:"Missing something? Reload Spotify once more."}),On?l("p",{className:"syncify-muted",children:[C.kind==="share"?"Syncify set it up for you?":"Syncify saved your setup?"," ",s("button",{className:"syncify-text-button syncify-inline-button",type:"button",onClick:()=>je(Se.kofiUrl),children:"Support it on Ko-fi"})]}):null]}):l("div",{className:"syncify-status-text",children:[s("h3",{className:"syncify-status-title",children:oc}),s("p",{className:"syncify-muted",children:s(Ge,{parts:[...Array.isArray(Si)?Si:[Si],`${Er(k)} on this device`]})})]}),Pa&&!On?s("button",{className:"syncify-button secondary",type:"button",onClick:yr,children:"Reload"}):s("button",{className:"syncify-button",type:"button",onClick:tc,disabled:pe||wt||Q||B!==null,title:B?"Sign in to back up":wt?"No changes since your last backup":void 0,children:pe?"Working\u2026":wt?"Backed up":"Back up now"})]}),Yr?l("div",{className:"syncify-nudge",role:"region","aria-label":"Secure your backup",children:[s(Cr,{}),l("span",{className:"syncify-setting-text",children:[s("span",{children:"Secure your backup"}),s("span",{className:"syncify-muted",children:"So only you can restore it"})]}),l("span",{className:"syncify-nudge-actions",children:[s("button",{className:"syncify-text-button",type:"button",onClick:Gr,disabled:fe,children:"Not now"}),s("button",{className:"syncify-button",type:"button",onClick:qr,disabled:fe||pe,children:fe?"Securing\u2026":"Secure"})]})]}):null,!Pe||B||ae.length>0||F.length>0||gi.length>0?l("section",{className:"syncify-section","aria-label":"Backups",children:[l("div",{className:"syncify-section-header",children:[s("h4",{className:"syncify-section-title",children:"Backups"}),l("span",{className:"syncify-section-controls",children:[!f&&Na&&fn.length>1?l("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":Je,"aria-controls":"syncify-backup-list",onClick:()=>{ln(!Je),Z(!1)},children:[Je?"Show less":`Show all ${fn.length}`,s(xn,{})]}):null,!B&&gi.length>0?l("span",{className:"syncify-select-field",children:[l("select",{className:"syncify-select","aria-label":"Show backups from",value:f!=null?f:"",onChange:c=>{Xr(c.currentTarget.value||null)},disabled:pe,children:[s("option",{value:"",children:"This Spotify account"}),gi.map(c=>s("option",{value:c.hash,children:c.label},c.hash))]}),s(xn,{})]}):null]})]}),Pe?B?l("p",{className:"syncify-locked",children:[s(Eu,{}),s("span",{children:B==="not_owner"?"Sign in with the account that secured them":"Sign in to see and restore your backups"})]}):f&&!x?s("p",{className:"syncify-muted",children:"Loading backups\u2026"}):pi.length===0&&di.length===0?s("p",{className:"syncify-muted",children:"No backups yet."}):l($,{children:[l("div",{className:"syncify-backup-list",id:"syncify-backup-list",role:"radiogroup","aria-label":"Choose a backup to restore",children:[Fr.map(c=>bi(c)),xt&&ka?l($,{children:[s("div",{className:"syncify-backup-divider",role:"presentation"}),bi(ka,{isSafetyCopy:!0})]}):null,xt&&di.length>0?l($,{children:[s("div",{className:"syncify-backup-divider",role:"presentation"}),di.map(c=>bi(c,{isUnapproved:!0}))]}):null]}),xt?X===!1?s("p",{className:"syncify-muted",children:"Install Spicetify Marketplace to restore a backup."}):cn?l("div",{className:"syncify-confirm",children:[l("p",{className:"syncify-confirm-title",children:["Restore"," ",M?(Ka=($a=M.backup)==null?void 0:$a.name)!=null?Ka:ct(M.metadata.last_sync_datetime):"this backup","?"]}),kt?s("div",{className:"syncify-alert",children:"An install this Spotify account hasn't approved made this backup. Its items stay off unless you turn them on."}):null,ee?s(Ir,{preview:ee,checks:bt,off:wa,allowed:Nn,unapproved:kt,onAllow:(c,u)=>{let D=new Set(Nn);u?D.add(c):D.delete(c),ut(D)},expanded:Y,onToggle:()=>oe(!Y)}):null,l("div",{className:"syncify-actions",children:[Wr?s("div",{className:"syncify-alert syncify-actions-hint",children:"Your current setup isn't backed up."}):null,s("button",{className:"syncify-button secondary",type:"button",onClick:()=>Z(!1),disabled:pe,children:"Cancel"}),s("button",{className:"syncify-button",type:"button",onClick:ac,disabled:pe||xa,children:xa?"Checking\u2026":"Restore"})]})]}):l("div",{className:"syncify-actions",children:[Ea?s("span",{className:"syncify-muted syncify-actions-hint",children:"This backup is already current."}):null,s("button",{className:"syncify-button secondary",type:"button",onClick:()=>ic(),disabled:pe||!M||Ea,children:"Restore backup"})]}):null]}):l("div",{className:"syncify-backup-skeleton","aria-hidden":"true",children:[s("span",{className:"syncify-radio"}),l("span",{className:"syncify-backup-text",children:[s("span",{className:"syncify-skeleton-line"}),s("span",{className:"syncify-skeleton-line wide"})]})]})]}):null,l("div",{className:"syncify-accordion",children:[s(ua,{id:"share",title:"Share",openSection:be,onToggle:Dn,status:W&&De?{kind:"count",label:`${De} ${De===1?"code":"codes"}`,text:String(De)}:null,children:s(du,{config:r,session:W,localItems:A,localConfig:P,localTheme:Ve,marketplaceAvailable:X,busy:pe,onSignIn:()=>Dn("account"),onSignedOut:Ra,onCodeCount:c=>{Sr(c),H(c)},onHandle:c=>{ya(c),ce(c)}})}),s(ua,{id:"account",title:"Account",openSection:be,onToggle:Dn,status:vu(W,B,dn),children:s(uu,{session:W,locked:B,secure:dn,securing:fe,secureError:mt,onSecure:()=>{Nt()},nudge:ui,onSignedIn:Vr,onSignedOut:Ra,onOpenWebsite:je,handle:Ke,onHandle:c=>{ya(c),ce(c)}})}),l(ua,{id:"settings",title:"Settings",openSection:be,onToggle:Dn,status:Me?{kind:"dot",label:`Syncify ${Me} is out`}:null,children:[l("label",{className:"syncify-setting",children:[l("span",{className:"syncify-setting-text",children:[s("span",{children:"Back up automatically"}),s("span",{className:"syncify-muted",children:"When Spotify starts and something has changed"})]}),s("input",{className:"syncify-switch",type:"checkbox",role:"switch",checked:r.autoBackupEnabled&&!Q,onChange:c=>Qr(c.currentTarget.checked),disabled:pe||Q})]}),l("label",{className:"syncify-setting",children:[l("span",{className:"syncify-setting-text",children:[s("span",{children:"Open Syncify from"}),mi?r.entryPoint==="menu"&&!r.shortcut?s("span",{className:"syncify-muted",children:"Keep a shortcut in case a Spotify update breaks the menu"}):null:s("span",{className:"syncify-muted",children:"The profile menu isn't available in this Spicetify version"})]}),l("span",{className:"syncify-select-field",children:[s("select",{className:"syncify-select",value:mi?r.entryPoint:"topbar",onChange:c=>ec(c.currentTarget.value),disabled:!mi,children:Tu.map(c=>s("option",{value:c.value,children:c.label},c.value))}),s(xn,{})]})]}),l("div",{className:"syncify-setting",children:[l("span",{className:"syncify-setting-text",children:[s("span",{children:"Keyboard shortcut"}),O&&!Be?s("span",{className:"syncify-muted",children:"Press a key combination, or Esc to cancel"}):null]}),l("span",{className:"syncify-shortcut",children:[r.shortcut&&!O?s("button",{className:"syncify-text-button",type:"button",onClick:()=>hi(null),children:"Turn off"}):null,!r.shortcut&&!O?s("button",{className:"syncify-text-button",type:"button",onClick:()=>hi(Sn),children:"Use default"}):null,s("button",{className:"syncify-key",type:"button","data-recording":O?"true":"false",onClick:()=>O?re(!1):nc(),title:"Click to change",children:O?"Press keys\u2026":r.shortcut?et(r.shortcut):"Off"})]})]}),Be?s("div",{className:"syncify-alert",role:"alert",children:Be}):null]})]}),l("footer",{className:"syncify-footer",children:[l("span",{className:"syncify-footer-version",children:[l("span",{children:["Syncify ",Se.version]}),Me?s("button",{className:"syncify-text-button syncify-update",type:"button",onClick:()=>va?window.location.reload():je(`${Se.githubUrl}#updating`),children:s(Ge,{parts:[`${Me} is out`,va?"Reload":"How to update"]})}):null]}),l("span",{className:"syncify-footer-links",children:[s("button",{className:"syncify-text-button",type:"button",onClick:()=>je(Se.issueUrl),children:"Report an issue"}),s("button",{className:"syncify-text-button",type:"button",onClick:()=>je(Se.githubUrl),children:"GitHub"}),s("button",{className:"syncify-text-button",type:"button",onClick:()=>je(Se.discordUrl),children:"Discord"}),s("button",{className:"syncify-text-button",type:"button",onClick:()=>je(Se.kofiUrl),children:"Support on Ko-fi"})]})]})]})}var wr={added:{mark:"+",label:"Added"},removed:{mark:"\u2212",label:"Removed"},unchanged:{mark:"=",label:"Unchanged"}},_r=[["extension","Extensions"],["theme","Themes"],["snippet","Snippets"]],ru={extension:"extension",custom_app:"custom app",theme:"theme"};function Ir(e){let n=Spicetify.React,{items:t,counts:i,manual:a,theme:o}=e.preview,r=[...e.off].filter(y=>!e.allowed.has(y)).length;return l($,{children:[l("div",{className:"syncify-chips","aria-label":"What changes on this device",children:[i.added?l("span",{className:"syncify-chip","data-change":"added",children:["+",i.added," added"]}):null,i.removed?l("span",{className:"syncify-chip","data-change":"removed",children:["\u2212",i.removed," removed"]}):null,i.unchanged?l("span",{className:"syncify-chip",children:[i.unchanged," unchanged"]}):null,a.length?l("span",{className:"syncify-chip",children:[a.length," to add manually"]}):null,o&&(!e.off.has(o.key)||e.allowed.has(o.key))?l("span",{className:"syncify-chip",children:["Switches your theme to ",o.name]}):null,r?l("span",{className:"syncify-chip","data-change":"off",children:[r," off"]}):null]}),t.length||a.length?l("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":e.expanded,"aria-controls":"syncify-restore-changes",onClick:e.onToggle,children:[e.expanded?"Hide changes":"Show changes",s(xn,{})]}):null,e.expanded?l("div",{className:"syncify-changes",id:"syncify-restore-changes",children:[_r.map(([y,d])=>{let p=t.filter(m=>m.type===y);return p.length===0?null:l("section",{"aria-label":d,children:[s("h5",{className:"syncify-change-group",children:d}),s("ul",{className:"syncify-change-list",children:p.map(m=>{var b,k;return l("li",{className:"syncify-change",children:[s("span",{className:"syncify-mark","data-change":m.change,role:"img","aria-label":wr[m.change].label,children:wr[m.change].mark}),l("span",{className:"syncify-change-name",children:[m.name,m.repo?l("span",{className:"syncify-change-detail",children:[s(vn,{}),m.repo]}):null]}),e.checks.has(m.key)?s(Rr,{check:e.checks.get(m.key)}):e.unapproved&&e.off.has(m.key)?l("span",{className:"syncify-source","data-warning":"true",children:[s(ba,{}),"Not approved"]}):null,e.off.has(m.key)&&!((b=e.fixed)!=null&&b.has(m.key))?l("label",{className:"syncify-item-switch",children:[s("input",{type:"checkbox",checked:e.allowed.has(m.key),onChange:S=>e.onAllow(m.key,S.currentTarget.checked)}),(k=e.switchLabel)!=null?k:"Restore"]}):null]},m.key)})})]},y)}),a.length?l("section",{"aria-label":"Add manually",children:[s("h5",{className:"syncify-change-group",children:"Add manually"}),s("ul",{className:"syncify-change-list",children:a.map(y=>l("li",{className:"syncify-change",children:[s("span",{className:"syncify-mark","aria-hidden":"true"}),l("span",{className:"syncify-change-name",children:[y.name,l("span",{className:"syncify-change-detail",children:[s(vn,{}),ru[y.type],y.scheme?`, ${y.scheme}`:""]})]})]},`${y.type}:${y.name}`))})]}):null]}):null]})}var cu={host:"Loads from outside GitHub",repo:"Its code is in a different repo than the one it names",blocked:"On Marketplace's block list",catalog:"Not in Marketplace's catalog",unchecked:"GitHub couldn't be reached to check it",custom:"A snippet made in Marketplace, not from its list"};function Rr(e){let n=Spicetify.React,{check:t}=e,i=We(t),a=t.kind==="host"?`Code from ${t.host}`:t.kind==="repo"?`Code from ${t.repo}`:t.kind==="blocked"?"Blocked by Marketplace":t.kind==="catalog"?"Not in Marketplace":t.kind==="unchecked"?"Not checked":"Custom";return l("span",{className:"syncify-source","data-warning":i?"true":"false",title:cu[t.kind],children:[i?s(ba,{}):null,a]})}var lu={owner:"This backup isn't secured. Someone using this Spotify account said it isn't yours.",admin:"This backup isn't secured. Syncify couldn't confirm it's yours.",undone:"This backup is no longer secured by your account."};function yu(e,n,t){var r,y;if(n==="not_owner")return{kind:"other-account"};if(!e)return t?{kind:"other-claim"}:{kind:"unknown"};let{claim:i}=e;if((i==null?void 0:i.status)==="final"){if(!i.mine)return{kind:"other-account"};let d=((r=e.accounts)!=null?r:[]).filter(p=>p.status==="final").length;return{kind:"secured",linkedCount:Math.max(d,1)}}if((i==null?void 0:i.status)==="pending")return i.mine?{kind:"pending",finalAt:i.final_at,held:i.held}:{kind:"other-claim"};let a=((y=e.accounts)!=null?y:[]).filter(d=>d.hash===e.hash),o=a[a.length-1];return(o==null?void 0:o.status)==="unlinked"?{kind:"ended",reason:"undone"}:(o==null?void 0:o.status)==="cancelled"&&o.cancelled_by!=="claimer"?{kind:"ended",reason:o.cancelled_by==="owner"?"owner":"admin"}:{kind:"open"}}function uu(e){let n=Spicetify.React,t=n.useEffect,i=n.useState,{session:a,secure:o}=e,[r,y]=i(()=>Mt()),[d,p]=i(()=>Mt().email),[m,b]=i(""),[k,S]=i(!1),[R,_]=i(null),[A,T]=i(()=>Date.now()),{handle:P,onHandle:G}=e;t(()=>{if(!a||P!==void 0)return;let w=!0;return Yi().then(I=>{var K,F;w&&G((F=(K=I.profile)==null?void 0:K.handle)!=null?F:null)}).catch(()=>{}),()=>{w=!1}},[a,P]);let Ve=!!(r.codeSentAt&&A-r.codeSentAt<bu),Ie=Math.max(0,Math.ceil((r.retryAt-A)/1e3)),X=r.retryEmail===null||r.retryEmail===d.trim().toLowerCase()?Ie:0;t(()=>{if(!a)return;let w=!0;return Ts().then(I=>{!w||I||(_({kind:"warning",text:an(new E("signed_out"))}),e.onSignedOut())}).catch(()=>{}),()=>{w=!1}},[a==null?void 0:a.token]),t(()=>{if(r.retryAt<=Date.now())return;let w=setInterval(()=>{T(Date.now()),r.retryAt<=Date.now()&&clearInterval(w)},1e3);return()=>clearInterval(w)},[r.retryAt]);function te(w){let I=g(g({},Mt()),w);Cs(I),y(I),T(Date.now())}async function j(w){var K;let I=w.trim();if(!Su.test(I)){_({kind:"error",text:"Enter a valid email address."});return}S(!0),_(null);try{let F=await Is(I,{nudge:e.nudge});te({email:I,codeSentAt:Date.now(),retryAt:Date.now()+F*1e3,retryEmail:I.toLowerCase()}),b("")}catch(F){let V=F instanceof E?F:null,se=(K=V==null?void 0:V.retryAfter)!=null?K:null,Te=se&&se<=ku?Date.now()+se*1e3:0,ye=(V==null?void 0:V.code)==="too_many_requests"?null:I.toLowerCase();if((V==null?void 0:V.code)==="resend_wait"){te({email:I,codeSentAt:r.email===I&&r.codeSentAt?r.codeSentAt:Date.now(),retryAt:Te,retryEmail:ye});return}Te&&te({retryAt:Te,retryEmail:ye}),_({kind:"error",text:an(F)})}finally{S(!1)}}async function Re(){S(!0),_(null);try{let w=await Rs(r.email,m);te({codeSentAt:null}),b(""),e.onSignedIn(w)}catch(w){_({kind:"error",text:an(w)});let I=w instanceof E?w.code:null;(I==="too_many_attempts"||I==="code_expired")&&b("")}finally{S(!1)}}async function z(){var I;let w=(I=a==null?void 0:a.email)!=null?I:"";S(!0),_(null),await Ps(),te({email:w,codeSentAt:null}),p(w),S(!1),e.onSignedOut()}async function ie(){S(!0),_(null);try{e.onOpenWebsite(await As())}catch(w){let I=w instanceof E&&w.code==="signed_out";_({kind:I?"warning":"error",text:an(w)}),I&&e.onSignedOut()}finally{S(!1)}}let ae=R?s("div",{className:"syncify-alert","data-kind":R.kind==="error"?"error":void 0,role:"alert",children:R.text}):null;if(a===void 0)return null;if(a){let w=o.kind==="open"||o.kind==="other-claim"||o.kind==="ended"&&o.reason!=="undone";return l($,{children:[l("div",{className:"syncify-setting",children:[l("span",{className:"syncify-setting-text",children:[s("span",{className:"syncify-account-email",children:a.email}),o.kind==="secured"?s("span",{className:"syncify-muted",children:s(Ge,{parts:["Backup secured",o.linkedCount===1?"1 Spotify account linked":`${o.linkedCount} Spotify accounts linked`]})}):o.kind==="pending"?l("span",{className:"syncify-muted syncify-account-state",children:[s(Dr,{}),s("span",{children:o.held?"Syncify is checking your request to secure this backup":`Your backup will be secured ${Ar(o.finalAt)}`})]}):o.kind==="other-account"?s("span",{className:"syncify-muted",children:"This backup is secured by another account"}):s("span",{className:"syncify-muted",children:"Signed in"})]}),l("span",{className:"syncify-account-actions",children:[l("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-label":"Manage on the website",onClick:()=>{ie()},disabled:k,children:["Manage",s(Nr,{})]}),s("button",{className:"syncify-text-button",type:"button",onClick:()=>{z()},disabled:k,children:"Sign out"})]})]}),P?l("div",{className:"syncify-setting",children:[l("span",{className:"syncify-setting-text",children:[l("span",{children:["@",P]}),s("span",{className:"syncify-muted",children:"Your handle"})]}),l("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-label":"Open your profile",onClick:()=>e.onOpenWebsite(Wi(P)),children:["Profile",s(Nr,{})]})]}):null,w?l("div",{className:"syncify-setting",children:[l("span",{className:"syncify-setting-text",children:[s("span",{children:"Secure your backup"}),s("span",{className:"syncify-muted",children:"So only you can restore it"})]}),s("button",{className:"syncify-button",type:"button",onClick:e.onSecure,disabled:k||e.securing||o.kind==="other-claim",children:e.securing?"Securing\u2026":o.kind==="ended"?"Secure again":"Secure"})]}):null,o.kind==="ended"?s("div",{className:"syncify-alert",role:"status",children:lu[o.reason]}):null,e.secureError?s("div",{className:"syncify-alert","data-kind":"error",role:"alert",children:e.secureError}):null,ae]})}return l($,{children:[s("div",{className:"syncify-setting",children:e.locked?l("span",{className:"syncify-setting-text",children:[s("span",{children:"Sign in to restore"}),s("span",{className:"syncify-muted",children:"With the email that secured this backup"})]}):l("span",{className:"syncify-setting-text",children:[s("span",{children:"Secure your backup"}),s("span",{className:"syncify-muted",children:"So only you can restore it"})]})}),l("form",{className:"syncify-confirm",noValidate:!0,onSubmit:w=>{w.preventDefault(),!k&&(Ve?m.length===si&&Re():X||j(d))},children:[Ve?l($,{children:[l("p",{className:"syncify-muted",children:["Code sent to ",wu(r.email)]}),l("div",{className:"syncify-field",children:[s("input",{className:"syncify-input syncify-code-input",type:"text",inputMode:"numeric",autoComplete:"one-time-code","aria-label":"6-digit code",placeholder:"123456",maxLength:si,value:m,onChange:w=>b(w.currentTarget.value.replace(/\D/g,"").slice(0,si)),autoFocus:!0}),s("button",{className:"syncify-button",type:"submit",disabled:k||m.length!==si,children:k?"Verifying\u2026":"Verify"})]}),l("p",{className:"syncify-muted syncify-account-links",children:[s("button",{className:"syncify-text-button",type:"button",onClick:()=>{j(r.email)},disabled:k||Ie>0,children:Ie>0?`Resend in ${vr(Ie)}`:"Resend code"}),s("button",{className:"syncify-text-button",type:"button",onClick:()=>{te({codeSentAt:null}),b(""),_(null)},disabled:k,children:"Use another email"})]})]}):l($,{children:[l("div",{className:"syncify-field",children:[s("input",{className:"syncify-input",type:"email",autoComplete:"email","aria-label":"Email",placeholder:"you@example.com",value:d,onChange:w=>p(w.currentTarget.value),autoFocus:!0}),s("button",{className:"syncify-button",type:"submit",disabled:k||X>0||!d.trim(),children:k?"Sending\u2026":"Send code"})]}),s("p",{className:"syncify-muted",children:X>0?`Send another code in ${vr(X)}`:"We only email sign-in codes."})]}),ae]})]})}var fu=[["add","Add to my setup"],["replace","Replace my setup"]];function du(e){var An;let n=Spicetify.React,t=n.useEffect,i=n.useMemo,a=n.useRef,o=n.useState,{session:r}=e,[y,d]=o(""),[p,m]=o(!1),[b,k]=o(null),[S,R]=o(null),[_,A]=o(null),[T,P]=o(null),[G,Ve]=o("add"),[Ie,X]=o(!1),[te,j]=o(()=>new Set),[Re,z]=o(null),[ie,ae]=o(void 0),[w,I]=o(!1),[K,F]=o(null),[V,se]=o(0),Te=a(!1),[ye,yt]=o(null),[Nn,ut]=o(null),[M,ue]=o(null),[Pe,rn]=o(""),[cn,Z]=o(null),[Y,oe]=o(null),[Ae,En]=o(""),[O,re]=o(null),[Be,he]=o(!1),[be,_n]=o(!1),[Je,ln]=o(null),[C,$e]=o(null),[ft,Xe]=o(null),[Q,dt]=o(!1),[Me,pt]=o(null),De=a(0),H=i(()=>S?ko(S.file,S.items,e.localItems,e.localConfig,e.localTheme,G):null,[S,e.localItems,e.localConfig,e.localTheme,G]),Ke=i(()=>{if(!H||!S)return null;let f=new Set(S.items.map(h=>h.key));return H.items.filter(h=>h.change!=="removed"&&f.has(h.key)&&(G==="replace"||h.isNew))},[H,S,G]),ce=i(()=>Ke?Xn(Ke):null,[Ke]),W=i(()=>new Map([...Re!=null?Re:[],...ce!=null?ce:[]]),[Re,ce]),Le=i(()=>H&&ie!==void 0?So(H,ie):new Set,[H,ie]),B=i(()=>{var f;return new Set([...((f=H==null?void 0:H.items)!=null?f:[]).filter(h=>{var x;return h.change!=="removed"&&h.isNew&&(We(W.get(h.key))||((x=W.get(h.key))==null?void 0:x.kind)==="unchecked")}).map(h=>h.key),...Le])},[H,W,Le]),li=[...B].filter(f=>Le.has(f)||!te.has(f)),He=H!==null&&(Re===null||ie===void 0),In=O?O.items.filter(f=>!O.leftOut.has(f.key)):[],ke=!!(K&&ye!==null&&K.length>=ye),Ze=Y!==null&&Y.code===null&&!Nn,fe=Ze?po(Pe):null,[Rn,mt]=o(null);t(()=>{if(!fe){mt(null);return}let f=window.setTimeout(()=>mt(fe),au);return()=>window.clearTimeout(f)},[fe]),t(()=>{if(z(null),!Ke||!ce)return;[...ce.values()].some(We)&&X(!0);let f=!0;return Zn(Ke,ce).then(h=>{f&&(z(h),[...h.values()].some(We)&&X(!0))}),()=>{f=!1}},[Ke,ce]),t(()=>{Eo().then(A)},[]),t(()=>{F(null),oe(null),$e(null),Te.current=!1,r&&Qe()},[r==null?void 0:r.token]);async function yn(f){let h=f!=null?f:mo(y);if(k(null),R(null),!h){k(Wt(new E("no_code")));return}m(!0),P(f!=null?f:null);try{let x=await No(h);Ve("add"),j(new Set),X(!1),R({file:x,items:J(x.keys),pick:f!==void 0}),ji().then(ae)}catch(x){k(Wt(x))}finally{m(!1),P(null)}}async function yi(){if(!(!S||!H)){I(!0),k(null);try{await jo(e.config,S.file,G,li,ie!=null?ie:null,S.pick),Spicetify.showNotification("Syncify: setup loaded. Reloading\u2026"),ti(H.manual,"share"),setTimeout(()=>window.location.reload(),1e3)}catch(f){I(!1),k(f instanceof at?`${f.message} ${mu(f.reason)}`:f instanceof Error?f.message:String(f))}}}async function Qe(){var f,h;Z(null);try{let x=await Yi();F(x.codes),Te.current||(Te.current=!0,se(x.newHearts)),e.onCodeCount(x.codes.length),yt(x.max),ut(x.profile),e.onHandle((h=(f=x.profile)==null?void 0:f.handle)!=null?h:null),ue(x.suggestedHandle)}catch(x){Tn(x,Z)}}function Tn(f,h){h(Wt(f,ye)),f instanceof E&&f.code==="signed_out"&&e.onSignedOut()}async function gt(f){var x;let h=++De.current;oe({code:f}),En((x=f==null?void 0:f.name)!=null?x:""),rn(M!=null?M:""),re(null),he(!1),ln(null),$e(null),Xe(null);try{let de=await me(),Mn=await ho(J(de),de);if(h!==De.current)return;re(g({keys:de},Mn)),Mn.leftOut.size>0&&he(!0)}catch(de){if(h!==De.current)return;oe(null),ln(de instanceof Error?de.message:String(de))}}function ui(){De.current+=1,oe(null),re(null)}async function fi(){if(!Y||!O)return;_n(!0),ln(null);let f=bo(O.keys,In);try{let h=Y.code?await vo(Y.code.code,Ae.trim(),f):await xo(Ae.trim(),f,Ze?Pe.trim():void 0);$e(N(g({},h),{outcome:Y.code?"updated":"created"})),oe(null),re(null),await Qe()}catch(h){if(h instanceof E&&h.code==="same_setup"&&h.share){$e(N(g({},h.share),{leftOut:0,outcome:"existing"})),oe(null),re(null);return}Tn(h,ln),h instanceof E&&h.code==="publish_failed"&&(oe(null),Qe())}finally{_n(!1)}}async function Pn(f){dt(!0),Z(null);try{await Co(f),Xe(null),(C==null?void 0:C.code)===f&&$e(null),await Qe()}catch(h){Tn(h,Z)}finally{dt(!1)}}async function un(f,h){await Tr(f)&&(pt(h),setTimeout(()=>pt(x=>x===h?null:x),2e3))}return l($,{children:[l("form",{className:"syncify-field syncify-share-load",noValidate:!0,onSubmit:f=>{f.preventDefault(),!p&&!w&&y.trim()&&yn()},children:[s("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-input",children:"Load a setup"}),s("input",{className:"syncify-input syncify-share-input",id:"syncify-share-input",type:"text",placeholder:"Paste a code or a link",autoComplete:"off",spellCheck:!1,value:y,onChange:f=>d(f.currentTarget.value),disabled:w}),s("button",{className:"syncify-button secondary",type:"submit",disabled:p||w||!y.trim(),children:p?"Loading\u2026":"Preview"})]}),b?s("div",{className:"syncify-alert","data-kind":"error",role:"alert",children:b}):null,S&&H?l("div",{className:"syncify-confirm",children:[l("span",{className:"syncify-share-title",children:[l("p",{className:"syncify-confirm-title",children:["Load ",(An=S.file.name)!=null?An:Ne(S.file.code),"?"]}),S.file.creator?l("button",{className:"syncify-text-button",type:"button",title:"Open their profile",onClick:()=>window.open(Wi(S.file.creator),"_blank","noopener,noreferrer"),children:["by @",S.file.creator]}):null]}),s("div",{className:"syncify-share-modes",role:"radiogroup","aria-label":"How to load it",children:fu.map(([f,h])=>l("button",{className:"syncify-backup",role:"radio","aria-checked":G===f,"data-selected":G===f?"true":"false",type:"button",onClick:()=>Ve(f),disabled:w,children:[s("span",{className:"syncify-radio","aria-hidden":"true"}),s("span",{className:"syncify-backup-text",children:s("span",{children:h})})]},f))}),s(Ir,{preview:H,checks:W,off:B,fixed:Le,switchLabel:"Load",allowed:te,unapproved:!1,onAllow:(f,h)=>{let x=new Set(te);h?x.add(f):x.delete(f),j(x)},expanded:Ie,onToggle:()=>X(!Ie)}),e.marketplaceAvailable===!1?s("p",{className:"syncify-muted",children:"Install Spicetify Marketplace to load a setup."}):l("div",{className:"syncify-actions",children:[s("button",{className:"syncify-button secondary",type:"button",onClick:()=>R(null),disabled:w,children:"Cancel"}),s("button",{className:"syncify-button",type:"button",onClick:()=>{yi()},disabled:w||He||e.busy,children:w?"Applying\u2026":He?"Checking\u2026":"Apply"})]})]}):null,_?l("section",{className:"syncify-share-part","aria-label":_.length>0?"Syncify picks":"Discover",children:[_.length>0?s("h5",{className:"syncify-change-group",children:"Syncify picks"}):null,l("ul",{className:"syncify-change-list syncify-share-codes",children:[_.map(f=>l("li",{className:"syncify-setting",children:[l("span",{className:"syncify-setting-text",children:[s("span",{className:"syncify-account-email",children:f.name}),l("span",{className:"syncify-muted syncify-pick-detail",children:[s(hu,{pick:f}),ai(f.extensions+f.themes+f.snippets,"item")]})]}),s("button",{className:"syncify-text-button",type:"button",disabled:p||w,onClick:()=>{yn(f.code)},children:T===f.code?"Loading\u2026":"Preview"})]},f.code)),l("li",{className:"syncify-setting",children:[l("span",{className:"syncify-setting-text",children:[s("span",{children:"Find more setups"}),s("span",{className:"syncify-muted",children:"People's setups on Discover"})]}),s("button",{className:"syncify-button secondary",type:"button",onClick:()=>window.open(`${U().webUrl.replace(/\/+$/,"")}/discover`,"_blank","noopener,noreferrer"),children:"Open Discover"})]})]})]}):null,r===void 0?null:r?l($,{children:[l("div",{className:"syncify-setting syncify-share-part",children:[l("span",{className:"syncify-setting-text",children:[s("span",{children:"Share this setup"}),s("span",{className:"syncify-muted",children:K&&K.length>0&&ye!==null?gu(ye-K.length):"Get a code anyone can load"})]}),s("button",{className:"syncify-button secondary",type:"button",onClick:()=>{gt(null)},disabled:Y!==null||K===null||ke||e.marketplaceAvailable===!1,title:ke?"Delete a code to make another":void 0,children:"Share"})]}),Y?l("div",{className:"syncify-confirm",children:[s("p",{className:"syncify-confirm-title",children:Y.code?`Update ${Ne(Y.code.code)} with this setup?`:"Share this setup?"}),O?l($,{children:[l("div",{className:"syncify-chips","aria-label":"What goes in",children:[l("span",{className:"syncify-chip",children:[In.length," going in"]}),O.leftOut.size?l("span",{className:"syncify-chip","data-change":"off",children:[O.leftOut.size," left out"]}):null]}),O.items.length?l("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":Be,"aria-controls":"syncify-share-items",onClick:()=>he(!Be),children:[Be?"Hide items":"Show items",s(xn,{})]}):null,Be?s(pu,{items:O.items,leftOut:O.leftOut}):null,l("div",{className:"syncify-share-fields",children:[s("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-name",children:"Setup name"}),s("input",{id:"syncify-share-name",className:"syncify-input",type:"text",placeholder:"Optional",maxLength:uo,value:Ae,onChange:f=>En(f.currentTarget.value),disabled:be}),Ze?l($,{children:[s("p",{className:"syncify-muted syncify-share-handle-note",children:"It's your first time creating a share code. Pick a handle for your profile:"}),s("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-handle",children:"Your handle"}),l("span",{className:"syncify-input syncify-handle-input",children:[s("span",{"aria-hidden":"true",children:"@"}),s("input",{id:"syncify-share-handle",type:"text",placeholder:"handle",autoComplete:"off",spellCheck:!1,maxLength:Fi,value:Pe,onChange:f=>rn(f.currentTarget.value.replace(/^@/,"")),disabled:be})]}),Pe&&Rn?s("span",{className:"syncify-share-handle-problem",role:"alert",children:Rn}):null]}):null]})]}):s("p",{className:"syncify-muted",children:"Checking your items\u2026"}),l("div",{className:"syncify-actions",children:[s("button",{className:"syncify-button secondary",type:"button",onClick:ui,disabled:be,children:"Cancel"}),s("button",{className:"syncify-button",type:"button",onClick:()=>{fi()},disabled:!O||In.length===0||be||Ze&&fe!==null,children:O?be?Y.code?"Updating\u2026":"Creating\u2026":Y.code?"Update":"Create code":"Checking\u2026"})]})]}):null,Je?s("div",{className:"syncify-alert","data-kind":"error",role:"alert",children:Je}):null,C?l("div",{className:"syncify-confirm",children:[l("span",{className:"syncify-manual-header",children:[s("span",{className:"syncify-confirm-title",children:C.outcome==="existing"?"You already shared this setup":C.outcome==="updated"?"Code updated":"Your code is ready"}),s("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>$e(null),children:s(pa,{})})]}),l("span",{className:"syncify-code syncify-share-code",children:[s("code",{children:Ne(C.code)}),s("button",{className:"syncify-text-button",type:"button",onClick:()=>{un(Ne(C.code),"saved-code")},children:Me==="saved-code"?"Copied":"Copy"}),C.link?s("button",{className:"syncify-text-button",type:"button",onClick:()=>{un(C.link,"saved-link")},children:Me==="saved-link"?"Copied":"Get link"}):null]}),C.leftOut?s("p",{className:"syncify-muted",children:C.leftOut===1?"1 snippet isn't in Marketplace's list anymore, so it was left out.":`${C.leftOut} snippets aren't in Marketplace's list anymore, so they were left out.`}):null,C.outcome==="created"&&_?l("div",{className:"syncify-setting",children:[l("span",{className:"syncify-setting-text",children:[s("span",{children:"Post it on Discover"}),s("span",{className:"syncify-muted",children:"Let people find it and try it"})]}),s("button",{className:"syncify-button secondary",type:"button",onClick:()=>window.open(`${U().webUrl.replace(/\/+$/,"")}/discover?post=${encodeURIComponent(C.code)}`,"_blank","noopener,noreferrer"),children:"Post"})]}):null]}):null,cn?l("div",{className:"syncify-alert","data-kind":"error",role:"alert",children:[s("span",{children:cn}),s("span",{className:"syncify-alert-actions",children:s("button",{className:"syncify-text-button",type:"button",onClick:()=>{Qe()},children:"Try again"})})]}):null,K&&K.length>0?l("section",{"aria-label":"Your codes",children:[l("h5",{className:"syncify-change-group syncify-codes-heading",children:["Your codes",V>0?s("span",{className:"syncify-tag","data-tone":"new",children:ai(V,"new heart")}):null]}),s("ul",{className:"syncify-change-list syncify-share-codes",children:K.map(f=>{var h;return l("li",{className:"syncify-setting",children:[l("span",{className:"syncify-setting-text",children:[s("span",{className:"syncify-account-email",children:(h=f.name)!=null?h:Ne(f.code)}),s("span",{className:"syncify-muted",children:ft===f.code?f.posted?"Delete it? Its link stops working and its post comes off Discover.":"Delete it? Its link stops working.":s(Ge,{parts:[f.name?Ne(f.code):null,ai(f.item_count,"item"),`Used by ${f.imports}`,f.hearts===null?null:ai(f.hearts,"heart")]})})]}),s("span",{className:"syncify-account-actions",children:ft===f.code?l($,{children:[s("button",{className:"syncify-text-button",type:"button",onClick:()=>Xe(null),disabled:Q,children:"Cancel"}),s("button",{className:"syncify-text-button","data-danger":"true",type:"button",onClick:()=>{Pn(f.code)},disabled:Q,children:Q?"Deleting\u2026":"Delete"})]}):l($,{children:[s("button",{className:"syncify-text-button",type:"button",onClick:()=>{gt(f)},disabled:Y!==null||Q,children:"Update"}),s("button",{className:"syncify-text-button",type:"button",onClick:()=>{un(Ne(f.code),`code:${f.code}`)},children:Me===`code:${f.code}`?"Copied":"Copy"}),f.link?s("button",{className:"syncify-text-button",type:"button",onClick:()=>{un(f.link,`link:${f.code}`)},children:Me===`link:${f.code}`?"Copied":"Get link"}):null,s("button",{className:"syncify-text-button",type:"button",onClick:()=>Xe(f.code),disabled:Q,children:"Delete"})]})})]},f.code)})})]}):null]}):l("div",{className:"syncify-setting syncify-share-part",children:[l("span",{className:"syncify-setting-text",children:[s("span",{children:"Share this setup"}),s("span",{className:"syncify-muted",children:"Get a code anyone can load"})]}),s("button",{className:"syncify-button secondary",type:"button",onClick:e.onSignIn,children:"Sign in to share"})]})]})}var xr={in:{mark:"+",label:"Goes in"},out:{mark:"\u2212",label:"Left out"}};function pu(e){let n=Spicetify.React;return s("div",{className:"syncify-changes",id:"syncify-share-items",children:_r.map(([t,i])=>{let a=e.items.filter(o=>o.type===t).sort((o,r)=>o.name.localeCompare(r.name));return a.length===0?null:l("section",{"aria-label":i,children:[s("h5",{className:"syncify-change-group",children:i}),s("ul",{className:"syncify-change-list",children:a.map(o=>{let r=e.leftOut.get(o.key),y=r?xr.out:xr.in;return l("li",{className:"syncify-change",children:[s("span",{className:"syncify-mark","data-change":r?"removed":"added",role:"img","aria-label":y.label,children:y.mark}),l("span",{className:"syncify-change-name",children:[o.name,o.repo?l("span",{className:"syncify-change-detail",children:[s(vn,{}),o.repo]}):null]}),r?s(Rr,{check:r}):null]},o.key)})})]},t)})})}function mu(e){return e instanceof Ce?"Sign in to back up.":e instanceof Error?e.message:String(e)}async function Tr(e){var n;try{return await navigator.clipboard.writeText(e),!0}catch(t){let i=(n=Spicetify.Platform)==null?void 0:n.ClipboardAPI;return i!=null&&i.copy?(await i.copy(e),!0):!1}}function gu(e){return e<=0?"No codes left, delete one to make another":`${e} ${e===1?"code":"codes"} left`}var ii=12;function vn(){let e=Spicetify.React;return l($,{children:[s("span",{className:"syncify-sep","aria-hidden":"true"}),s("span",{className:"syncify-sr-only",children:", "})]})}function Ge(e){let n=Spicetify.React,t=e.parts.filter(i=>!!i);return s("span",{className:"syncify-parts",children:t.map((i,a)=>l(n.Fragment,{children:[a>0?s(vn,{}):null,i]},a))})}function hu(e){let n=Spicetify.React,{extensions:t,themes:i,snippets:a}=e.pick,o=[...Array(Math.min(t,ii)).fill("extension"),...Array(Math.min(i,ii)).fill("theme"),...Array(Math.min(a,ii)).fill("snippet")].slice(0,ii);return s("span",{className:"syncify-pips","aria-hidden":"true",children:o.map((r,y)=>s("span",{className:"syncify-pip","data-kind":r},y))})}function ai(e,n){return`${e} ${n}${e===1?"":"s"}`}var si=6,bu=600*1e3,ku=300,Su=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function wu(e){let n=e.lastIndexOf("@");return n<1?e:`${e[0]}***${e.slice(n)}`}function Pr(e){let n=new Date(e),t=new Date;return n.toDateString()===t.toDateString()?"today":n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===t.getFullYear()?void 0:"numeric"})}function Ar(e){let n=Pr(e);return n==="today"?n:`on ${n}`}function xu(e){let n=Pr(e);return n==="today"?n:`before ${n}`}function ga(e){var t;if(e.not_me)return"Syncify is checking this claim.";let n=`${(t=e.email)!=null?t:"Someone"} is securing this backup.`;return e.held?`${n} Syncify is checking it.`:`${n} If that isn't you, press Not me ${xu(e.final_at)}.`}function Mr(e){var n;return`This backup is no longer secured by ${(n=e.email)!=null?n:"another account"}.`}function ha(e){return e==="cancelled"?"Syncify: claim cancelled":"Syncify: sent for a check"}function vr(e){return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function ua(e){let n=Spicetify.React,t=e.openSection===e.id,i=`syncify-section-${e.id}`;return l("section",{className:"syncify-accordion-section","aria-label":e.title,children:[l("button",{className:"syncify-accordion-header",type:"button","aria-expanded":t,"aria-controls":i,onClick:()=>e.onToggle(t?null:e.id),children:[s("span",{className:"syncify-accordion-title",children:e.title}),!t&&e.status?s("span",{className:"syncify-accordion-status","data-kind":e.status.kind,role:"img","aria-label":e.status.label,title:e.status.label,children:e.status.kind==="ok"?s(Cu,{}):e.status.kind==="warning"?s(Nu,{}):e.status.kind==="pending"?s(Dr,{}):e.status.kind==="count"?e.status.text:null}):null,s(xn,{})]}),t?s("div",{className:"syncify-accordion-body",id:i,children:e.children}):null]})}function Cr(){let e=Spicetify.React;return s("svg",{className:"syncify-shield",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:s("path",{d:"M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"})})}function ba(){let e=Spicetify.React;return l("svg",{className:"syncify-warning-icon",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[s("path",{d:"M12 3 2 21h20z"}),s("path",{d:"M12 10v5"}),s("path",{d:"M12 18h.01"})]})}function vu(e,n,t){return n?{kind:"warning",label:"Sign in to see your backups"}:e?t.kind==="secured"?{kind:"ok",label:"Signed in, backup secured"}:t.kind==="pending"?{kind:"pending",label:t.held?"Backup not secured yet":`Your backup will be secured ${Ar(t.finalAt)}`}:t.kind==="open"?{kind:"warning",label:"Backup not secured yet"}:t.kind==="ended"?{kind:"warning",label:"Backup not secured"}:{kind:"ok",label:"Signed in"}:null}function Cu(){let e=Spicetify.React;return l("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[s("circle",{cx:"12",cy:"12",r:"10"}),s("path",{d:"m9 12 2 2 4-4"})]})}function Nu(){let e=Spicetify.React;return l("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[s("circle",{cx:"12",cy:"12",r:"10"}),s("path",{d:"M12 8v4"}),s("path",{d:"M12 16h.01"})]})}function xn(){let e=Spicetify.React;return s("svg",{className:"syncify-chevron",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:s("path",{d:"m9 6 6 6-6 6"})})}function Eu(){let e=Spicetify.React;return l("svg",{className:"syncify-lock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[s("rect",{x:"5",y:"11",width:"14",height:"10",rx:"2"}),s("path",{d:"M8 11V7a4 4 0 0 1 8 0v4"})]})}function Dr(){let e=Spicetify.React;return l("svg",{className:"syncify-clock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[s("circle",{cx:"12",cy:"12",r:"9"}),s("path",{d:"M12 7v5l3 2"})]})}function Nr(){let e=Spicetify.React;return l("svg",{className:"syncify-external",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[s("path",{d:"M14 4h6v6"}),s("path",{d:"M20 4 10 14"}),s("path",{d:"M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"})]})}function pa(){let e=Spicetify.React;return l("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[s("path",{d:"M18 6 6 18"}),s("path",{d:"m6 6 12 12"})]})}var _u=600*1e3,Iu=3,Ru={exists:!1,payload:null,backups:[],safetyCopy:null,claim:null,unapproved:[],install:null,nudge:!1},Tu=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function Pu(e,n,t,i){var R;let a=new Set(n),o=new Set(t),r=t.filter(_=>!a.has(_)).length,y=n.filter(_=>!o.has(_)).length,d=(R=e.spicetify_config)!=null?R:null,p=!!(i&&!d),m=!p&&(i&&d?!Fs(i,d):i!==d),b=[r?`${r} added`:null,y?`${y} removed`:null,m?"Spicetify config changed":null].filter(Boolean),k=ct(e.metadata.last_sync_datetime),S=b.length?`${b.join(", ")} since ${k}`:`Last backup ${k}`;return p?[S,"Spicetify config not saved yet"]:[S]}function Er(e){return e===1?"1 extension or theme":`${e} extensions and themes`}function ct(e){let n=new Date(e);if(Number.isNaN(n.getTime()))return e;let t=n.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),i=new Date,a=new Date(i);return a.setDate(i.getDate()-1),n.toDateString()===i.toDateString()?`today, ${t}`:n.toDateString()===a.toDateString()?`yesterday, ${t}`:`${n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===i.getFullYear()?void 0:"numeric"})}, ${t}`}function Lr(e){let t=Spicetify.React.useState,{claim:i}=e,[a,o]=t(!1),[r,y]=t(null);async function d(){o(!0),y(null);try{Spicetify.showNotification(ha(await ei(ge()))),e.onClose()}catch(p){y(p instanceof Error?p.message:String(p)),o(!1)}}return l("div",{className:"syncify-panel",children:[s("p",{className:"syncify-claim-notice",children:ga(i)}),r?s("div",{className:"syncify-alert","data-kind":"error",role:"alert",children:r}):null,l("div",{className:"syncify-actions",children:[s("button",{className:"syncify-text-button",type:"button",onClick:e.onClose,disabled:a,children:"Close"}),s("button",{className:"syncify-button",type:"button",onClick:()=>{d()},disabled:a,children:"Not me"})]})]})}function Or(e){let n=Spicetify.React;return l("div",{className:"syncify-panel",children:[s("p",{className:"syncify-claim-notice",children:Mr(e.claim)}),s("div",{className:"syncify-actions",children:s("button",{className:"syncify-button",type:"button",onClick:e.onClose,children:"Close"})})]})}function Ur(e){let n=Spicetify.React;return l("div",{className:"syncify-panel",children:[s("p",{className:"syncify-claim-notice",children:"Your backup isn't secured yet. Anyone who knows your Spotify username can restore it or claim it as theirs. Secure it with your email so only you can."}),l("div",{className:"syncify-actions",children:[s("button",{className:"syncify-text-button",type:"button",onClick:e.onClose,children:"Not now"}),s("button",{className:"syncify-button",type:"button",onClick:t=>{t.stopPropagation(),e.onSecure()},children:"Secure"})]})]})}var oi="[Syncify]";function ne(e,n){if(n===void 0){console.debug(oi,e);return}console.debug(oi,e,n)}function lt(e,n){if(n===void 0){console.warn(oi,e);return}console.warn(oi,e,n)}function Au(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var $r="syncify-styles";function Mu(){if(document.getElementById($r)){ne("Another copy of Syncify is running; stopping this one");return}Wa(Spicetify.React),Du();let e=ge();Ko({topbarButton:Lu(),menuItem:Hu()}),Vt(e.entryPoint),Xi(e.shortcut,ci),nr({onClaim:n=>{Fu(n)},onUndone:Yu,onInstall:Wu,onNudge:qu}).catch(n=>{lt("Startup sync check failed",n)}),fr().catch(n=>{lt("Restore check failed",n)})}function Du(){let e=document.createElement("style");e.id=$r,e.textContent=`${ds}
${qa}`,document.head.appendChild(e)}function Lu(){let{extensionName:e}=U(),n=new Spicetify.Topbar.Button(e,vi,t=>{ne("Topbar button clicked",ri(t)),ci()},!1,!0);return Kr(n),Bu(n),ju(n),ne("Topbar button registered",ri(n)),n}function Kr(e){var t;let n=e;e.element.style.setProperty("-webkit-app-region","no-drag"),(t=n.button)==null||t.style.setProperty("-webkit-app-region","no-drag")}var Br=".main-actionButtons",Ou=".Root__globalNav, .Root__top-bar",Uu=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function Bu(e){if(typeof MutationObserver=="undefined")return;let n=!1,t=null,i=()=>{n=!1,o();let r=e.element,y=document.querySelector(Br);!r||!y||y.contains(r)||(y.prepend(r),$u(e),Kr(e),ne("Topbar button re-attached",ri(e)))},a=new MutationObserver(()=>{n||(n=!0,setTimeout(i,250))}),o=()=>{var d;if(t!=null&&t.isConnected)return;let r=document.querySelector(Br),y=(d=r==null?void 0:r.closest(Ou))!=null?d:r==null?void 0:r.parentElement;if(a.disconnect(),t=y!=null?y:null,!y){a.observe(document.body,{childList:!0,subtree:!0});return}a.observe(y,{childList:!0,subtree:!0});for(let p=y.parentElement;p;p=p.parentElement)a.observe(p,{childList:!0})};i()}function $u(e){let n=Ku(e);if(!n||n.className&&n.className!=="undefined")return;let t=Array.from(document.querySelectorAll(Uu)).find(i=>!e.element.contains(i));t!=null&&t.className&&(n.className=t.className)}function Ku(e){return e.button}function Hu(){var e;if(typeof((e=Spicetify.Menu)==null?void 0:e.Item)!="function")return null;try{return new Spicetify.Menu.Item(U().extensionName,!1,()=>ci(),zu())}catch(n){return lt("Failed to create profile menu item",n),null}}function zu(){return vi.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function ju(e){Object.assign(window,{SyncifyDebug:{button:e,element:e.element,openModal:ci,inspect:()=>ri(e),clickElement:()=>{var n;return(n=e.element)==null?void 0:n.click()},clickInnerButton:()=>{var n;return(n=e.button)==null?void 0:n.click()},clickCallback:()=>e.onClick(e)}})}function ri(e){var n,t,i,a,o;return{label:e.label,disabled:e.disabled,isRight:e.isRight,hasElement:!!e.element,elementConnected:(n=e.element)==null?void 0:n.isConnected,elementDisabled:(t=e.element)==null?void 0:t.disabled,elementAriaDisabled:(i=e.element)==null?void 0:i.getAttribute("aria-disabled"),elementClass:(a=e.element)==null?void 0:a.className,appRegion:e.element?getComputedStyle(e.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:e.button?getComputedStyle(e.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:e.element?getComputedStyle(e.element).pointerEvents:null,visibility:e.element?getComputedStyle(e.element).visibility:null,display:e.element?getComputedStyle(e.element).display:null,rect:(o=e.element)==null?void 0:o.getBoundingClientRect().toJSON()}}var L=null;function ci(){if(L!=null&&L.container.isConnected){ne("Closing modal"),Spicetify.PopupModal.hide();return}ne("Opening modal"),Cn(s(ma,{}))}async function Fu(e){L!=null&&L.container.isConnected||(ne("Opening claim notice"),Cn(s(Lr,{claim:e,onClose:()=>Spicetify.PopupModal.hide()})))}function Yu(e){return L!=null&&L.container.isConnected?!1:(ne("Opening undone claim notice"),Cn(s(Or,{claim:e,onClose:()=>Spicetify.PopupModal.hide()})),!0)}function Wu(e){if(L!=null&&L.container.isConnected)return;ne("Opening install notice");let n=()=>Spicetify.PopupModal.hide();Cn(s("div",{className:"syncify-panel",children:s(gr,{install:e,onDone:n,onClose:n})}))}function qu(){L!=null&&L.container.isConnected||(ne("Opening nudge notice"),Xo(),Cn(s(Ur,{onSecure:()=>Cn(s(ma,{section:"account",secure:!0})),onClose:()=>Spicetify.PopupModal.hide()})))}function Cn(e){var t;(t=L==null?void 0:L.root)==null||t.unmount();let n=document.createElement("div");L={container:n,root:null};try{Spicetify.PopupModal.display({title:U().extensionName,content:n,isLarge:!1})}catch(i){throw lt("Failed to open PopupModal",i),i}Gu(n),Ju(n,e)}function Gu(e){requestAnimationFrame(()=>{let n=Vu(e);n==null||n.classList.add("syncify-modal-shell");let t=n==null?void 0:n.querySelector(".main-trackCreditsModal-header h1");if(t&&!t.querySelector(".syncify-modal-mark")){let a=document.createElement("span");a.className="syncify-modal-mark",a.innerHTML=ps,t.prepend(a)}let i=n==null?void 0:n.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');i&&(i.classList.add("syncify-modal-close"),i.setAttribute("aria-label",`Close ${U().extensionName}`),i.title="Close",i.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function Vu(e){let n=e.parentElement;for(;n&&n!==document.body;){if(n.querySelector(".main-trackCreditsModal-header"))return n;n=n.parentElement}return e.closest('[class*="trackCreditsModal"]')}function Ju(e,n){try{if(typeof Spicetify.ReactDOM.createRoot=="function"){let t=Spicetify.ReactDOM.createRoot(e);t.render(n),(L==null?void 0:L.container)===e&&(L.root=t),ne("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(n,e),ne("Modal rendered",{renderer:"render"})}catch(t){throw lt("Failed to render modal",t),t}}ur();(function e(){if(!Au()){setTimeout(e,100);return}ne("Spicetify APIs ready"),Mu()})();})();
