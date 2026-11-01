// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var Nr=Object.defineProperty,Ir=Object.defineProperties;var Er=Object.getOwnPropertyDescriptors;var Ds=Object.getOwnPropertySymbols;var _r=Object.prototype.hasOwnProperty,Tr=Object.prototype.propertyIsEnumerable;var Os=(n,e,t)=>e in n?Nr(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,p=(n,e)=>{for(var t in e||(e={}))_r.call(e,t)&&Os(n,t,e[t]);if(Ds)for(var t of Ds(e))Tr.call(e,t)&&Os(n,t,e[t]);return n},C=(n,e)=>Ir(n,Er(e));var Us=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var ki=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var Bs=`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="-2.5 -2.5 37 37" aria-hidden="true" focusable="false"><defs><mask id="syncify-mark-gap" maskUnits="userSpaceOnUse" x="-2" y="-2" width="36" height="36"><rect x="-2" y="-2" width="36" height="36" fill="#fff"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></mask></defs><g mask="url(#syncify-mark-gap)"><g transform="rotate(15 16 16)"><path d="M16 16L16 7.4A8.6 8.6 0 0 1 24.6 16Z" fill="#6cd1d1" transform="translate(0.42 -0.42)"/><path d="M16 16L24.6 16A8.6 8.6 0 0 1 16 24.6Z" fill="#efa4c1" transform="translate(0.42 0.42)"/><path d="M16 16L16 24.6A8.6 8.6 0 0 1 7.4 16Z" fill="#d3c48c" transform="translate(-0.42 0.42)"/><path d="M16 16L7.4 16A8.6 8.6 0 0 1 16 7.4Z" fill="#88bcf2" transform="translate(-0.42 -0.42)"/></g></g><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 28.03A12.4 12.4 0 1 1 28.03 19"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91"/></g></svg>
`;var Lr="syncify",yn="state";function bi(){let n;try{n=window.indexedDB}catch(e){return Promise.resolve(null)}return n?new Promise(e=>{let t;try{t=n.open(Lr,1)}catch(i){e(null);return}t.onupgradeneeded=()=>{t.result.createObjectStore(yn)},t.onerror=()=>e(null),t.onblocked=()=>e(null),t.onsuccess=()=>e(t.result)}):Promise.resolve(null)}function wi(n,e){let t=bi().then(i=>new Promise((s,a)=>{if(!i){a(new Error("IndexedDB isn't available."));return}try{let o=i.transaction(yn,n),c=e(o.objectStore(yn));o.oncomplete=()=>{i.close(),s(c.result)},o.onerror=o.onabort=()=>{var d;i.close(),a((d=o.error)!=null?d:new Error("IndexedDB failed."))}}catch(o){i.close(),a(o)}}));return Promise.race([t,new Promise((i,s)=>setTimeout(()=>s(new Error("IndexedDB took too long.")),2e3))])}function fn(n){return wi("readonly",e=>e.get(n))}async function pn(n,e){await wi("readwrite",t=>t.put(e,n))}async function $s(n){await wi("readwrite",e=>e.delete(n))}var Le={extensionName:"Syncify",version:"1.14.0",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com",shareUrl:"https://syncs.wsoltani.com"};function D(){var e,t,i,s,a,o,c,d,y;let n=window.SyncifyConfig;return{extensionName:(e=He(n==null?void 0:n.extensionName))!=null?e:Le.extensionName,version:(t=Ks(n==null?void 0:n.version))!=null?t:Le.version,workerUrl:(i=He(n==null?void 0:n.workerUrl))!=null?i:Le.workerUrl,webUrl:(s=He(n==null?void 0:n.webUrl))!=null?s:Le.webUrl,githubUrl:(a=He(n==null?void 0:n.githubUrl))!=null?a:Le.githubUrl,kofiUrl:(o=He(n==null?void 0:n.kofiUrl))!=null?o:Le.kofiUrl,issueUrl:(c=He(n==null?void 0:n.issueUrl))!=null?c:Le.issueUrl,releasesUrl:(d=He(n==null?void 0:n.releasesUrl))!=null?d:Le.releasesUrl,shareUrl:(y=He(n==null?void 0:n.shareUrl))!=null?y:Le.shareUrl}}function He(n){return Ks(n)}function Ks(n){return typeof n=="string"&&n.trim()?n.trim():null}var Dr="x-syncify-version",Or="x-syncify-install",Ur="x-syncify-timezone",Hs="install-id",js="syncify:install-id",Br=2e3,xt=null;async function Fs(){let n={[Dr]:D().version,[Or]:(await xi()).id},e=Hr();return e&&(n[Ur]=e),n}function xi(){return xt!=null||(xt=$r().catch(()=>({id:vt(),inDatabase:!1}))),xt}async function $r(){let n=await Promise.race([Kr(),new Promise(e=>setTimeout(()=>e(null),Br))]);if(n)return{id:n,inDatabase:!0};try{let e=window.localStorage.getItem(js);if(e&&Ys(e))return{id:e,inDatabase:!1};let t=vt();return window.localStorage.setItem(js,t),{id:t,inDatabase:!1}}catch(e){return{id:vt(),inDatabase:!1}}}async function Kr(){let n=await bi();return n?new Promise(e=>{let t=null;try{let i=n.transaction(yn,"readwrite"),s=i.objectStore(yn),a=s.get(Hs);a.onsuccess=()=>{if(typeof a.result=="string"&&Ys(a.result)){t=a.result;return}t=vt(),s.put(t,Hs)},i.oncomplete=()=>{n.close(),e(t)},i.onerror=i.onabort=()=>{n.close(),e(null)}}catch(i){n.close(),e(null)}}):null}function vt(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let n=crypto.getRandomValues(new Uint8Array(16));n[6]=n[6]&15|64,n[8]=n[8]&63|128;let e=[...n].map(t=>t.toString(16).padStart(2,"0"));return[e.slice(0,4).join(""),e.slice(4,6).join(""),e.slice(6,8).join(""),e.slice(8,10).join(""),e.slice(10).join("")].join("-")}function Ys(n){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(n)}function Hr(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(n){return null}}var jr="syncify-signature-v1",Fr={name:"ECDSA",hash:"SHA-256"};function Ct(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function Nt(n){return vi(new Uint8Array(await crypto.subtle.exportKey("raw",n)))}async function Un(n,e,t,i,s){let a=await Yr(e,t,i,s),o=await crypto.subtle.sign(Fr,n,a);return vi(new Uint8Array(o))}async function Yr(n,e,t,i){let{pathname:s,search:a}=new URL(t),o=new TextEncoder,c=vi(new Uint8Array(await crypto.subtle.digest("SHA-256",o.encode(i))));return o.encode([jr,n,e.toUpperCase(),s+a,c].join(`
`))}function vi(n){let e="";for(let t=0;t<n.length;t++)e+=String.fromCharCode(n[t]);return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var Ws="device-key",Ci="session",zs="salt",Re=null,Bn,qs={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function mn(n){if(Re)return Re;let e=await fn(Ws);return Wr(e)?(Re=Promise.resolve(e),e):n?(Re=Ct().then(async t=>(await pn(Ws,t),t)),Re.catch(()=>{Re=null}),Re):null}async function G(){let n=await fn(Ci);return zr(n)?n:null}function Ni(n){return pn(Ci,n)}async function Qe(){await $s(Ci).catch(()=>{})}async function It(){if(Bn===void 0){let n=await fn(zs).catch(()=>{});Bn=typeof n=="string"?n:null}return Bn}async function Et(n){n!==Bn&&(Bn=n,await pn(zs,n).catch(()=>{}))}function _t(){return qs}function Gs(n){qs=n}function Wr(n){let e=n;return!!(e&&e.privateKey instanceof CryptoKey&&e.publicKey instanceof CryptoKey)}function zr(n){let e=n;return!!(e&&typeof e.token=="string"&&e.token&&typeof e.email=="string")}var Vs="install-key",gn=null;function Js(){return gn!=null||(gn=qr()),gn.catch(()=>{gn=null}),gn.catch(()=>null)}async function qr(){if(!(await xi()).inDatabase)return null;let n=await fn(Vs),e=Vr(n)?n:await Gr();return{privateKey:e.privateKey,publicKey:await Nt(e.publicKey)}}async function Gr(){let n=await Ct();return await pn(Vs,n),n}function Vr(n){let e=n;return!!(e&&e.privateKey instanceof CryptoKey&&e.publicKey instanceof CryptoKey)}var Jr="/api/auth/email-otp/send-verification-otp",Xr="/api/auth/sign-in/email-otp",Zr="/api/auth/get-session",Rr="/api/auth/sign-out",Qr="/api/auth/link",ec="x-syncify-device-key",nc="x-syncify-signature",Xs="x-syncify-salt",tc="none",ic={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again.",link_failed:"Couldn't open the website. Try again."},v=class extends Error{constructor(t,i=null,s=null){var a;super((a=ic[t])!=null?a:"Sign-in failed. Try again.");this.code=t;this.retryAfter=i;this.share=s;this.name="AccountError"}};function en(n){return n instanceof v?n.message:"Sign-in failed. Try again."}async function Zs(n,e={}){let t=await Kn(Jr,{method:"POST",body:JSON.stringify(p({email:n,type:"sign-in"},e.nudge?{nudge:!0}:{}))});return typeof(t==null?void 0:t.resend_in)=="number"?t.resend_in:60}async function Rs(n,e){var a;let t=await mn(!0).catch(()=>{throw new v("no_device_key")}),i=await Kn(Xr,{method:"POST",body:JSON.stringify({email:n,otp:e}),keys:t,sendPublicKey:!0});if(typeof(i==null?void 0:i.token)!="string"||!i.token)throw new v("sign_in_failed");let s={token:i.token,email:typeof((a=i.user)==null?void 0:a.email)=="string"?i.user.email:n};return await Ni(s).catch(()=>{throw new v("no_device_key")}),Ii=!0,s}var Ii=!1;async function Qs(){var e;let n=await G();if(!n||Ii)return n;try{let t=await Tt(n,Zr,"GET");Ii=!0;let i=(e=t==null?void 0:t.user)==null?void 0:e.email;if(typeof i!="string"||i===n.email)return n;let s=C(p({},n),{email:i});return await Ni(s).catch(()=>{}),s}catch(t){if(t instanceof v&&t.code==="signed_out")return null;throw t}}async function eo(){let n=await G().catch(()=>null);n&&await Tt(n,Rr,"POST").catch(()=>{}),await Qe()}async function no(){let n=await G();if(!n)throw new v("signed_out");let e=await Tt(n,Qr,"POST"),t=typeof(e==null?void 0:e.url)=="string"?e.url:"",i=new URL(D().webUrl).origin;if(!t.startsWith(`${i}/link#`))throw new v("link_failed");return t}async function $n(n,e,t){let i=await G();if(!i)throw new v("signed_out");return Tt(i,n,e,t)}async function to(n,e,t){let i=await G().catch(()=>null),s=i?await mn(!1).catch(()=>null):null;await Kn(n,p({method:"POST",body:JSON.stringify(e),headers:t,keepalive:!0},i&&s?{token:i.token,keys:s}:{}))}async function Tt(n,e,t,i){let s=await mn(!1);if(!s)throw await Qe(),new v("signed_out");return Kn(e,p({method:t,token:n.token,keys:s},i===void 0?{}:{body:JSON.stringify(i)}))}async function Kn(n,e,t=!1){var g,h,S;let i=`${D().webUrl.replace(/\/+$/,"")}${n}`,s=p({},e.headers);if(e.body!==void 0&&(s["content-type"]="application/json"),e.token&&(s.authorization=`Bearer ${e.token}`),e.keys){let E=(g=await It())!=null?g:tc;s[Xs]=E,s[nc]=await Un(e.keys.privateKey,E,e.method,i,(h=e.body)!=null?h:""),e.sendPublicKey&&(s[ec]=await Nt(e.keys.publicKey))}let a;try{a=await fetch(i,{method:e.method,headers:s,body:e.body,keepalive:e.keepalive})}catch(E){throw new v("offline")}let o=a.headers.get(Xs);o&&await Et(o);let c=await a.json().catch(()=>null);if(a.ok)return c;let d=typeof(c==null?void 0:c.code)=="string"?c.code:a.status===503?"unavailable":"failed";if(d==="stale_salt"&&e.keys&&!t)return Kn(n,e,!0);d==="signed_out"&&await Qe();let y=Number(a.headers.get("retry-after")),f=c==null?void 0:c.share;throw new v(d,Number.isFinite(y)&&y>0?y:(S=sc[d])!=null?S:null,typeof(f==null?void 0:f.code)=="string"?{code:f.code,link:typeof f.link=="string"?f.link:null}:null)}var sc={resend_wait:60,too_many_requests:60,send_failed:60};var oc="x-syncify-user-hash",ac="x-syncify-identity",rc="x-syncify-signature",cc="x-syncify-install-key",lc="x-syncify-install-signature",Ei="x-syncify-salt",uc="none",dc="/restores",yc="/installs",fc="hash",io=3,Hn=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}},ke=class extends Error{constructor(t){super(t==="not_linked"?"Couldn't read that Spotify account's backups.":"Sign in to restore this backup.");this.code=t;this.name="LockedError"}},nn=class extends Error{constructor(){super("This Spotify account doesn't accept backups from this install. Sign in to back up."),this.name="InstallRefusedError"}};async function oo(n,e,t){var a;let i=await je(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(t)});if(i.status===403&&((a=await i.json().catch(()=>null))==null?void 0:a.code)==="install_refused")throw new nn;if(!i.ok)throw new Error(`Backup failed with HTTP ${i.status}.`);let s=await i.json().catch(()=>null);return{unchanged:(s==null?void 0:s.unchanged)===!0,unapproved:(s==null?void 0:s.quarantined)===!0}}async function ao(n,e,t,i){let s=await je(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({install:t,action:i})},yc);if(s.ok)return;let a=await s.json().catch(()=>null);if((a==null?void 0:a.code)!=="not_pending")throw new Error(`Couldn't answer with HTTP ${s.status}.`)}async function _i(n,e,t){var S,E,N,P;let i=await je(n,e,{method:"GET"},co("/",t));if(i.status===404){let _=await i.json().catch(()=>null);return{exists:!1,payload:null,backups:[],safetyCopy:null,claim:jn(_==null?void 0:_.claim),unapproved:[],install:so(_==null?void 0:_.install),nudge:!1}}if(!i.ok)throw new Error(`Restore failed with HTTP ${i.status}.`);let s=await i.json(),a=jn(s.claim),o=so(s.install),c=s.nudge===!0;delete s.claim,delete s.install,delete s.nudge;let d=[s,...(S=s.backup_history)!=null?S:[]];if(!d.every(_=>_.backup))return{exists:!0,payload:s,backups:d.slice(0,io),safetyCopy:(E=d[io])!=null?E:null,claim:a,unapproved:[],install:o,nudge:c};let y=d.filter(_=>{var T;return((T=_.backup)==null?void 0:T.kind)==="rolling"}),f=(N=d.find(_=>{var T;return((T=_.backup)==null?void 0:T.kind)==="anchor"}))!=null?N:null,g=d.filter(_=>{var T;return((T=_.backup)==null?void 0:T.kind)==="quarantined"}),h=(P=y[0])!=null?P:f;return h?y.length===0&&f?{exists:!0,payload:h,backups:[f],safetyCopy:null,claim:a,unapproved:g,install:o,nudge:c}:{exists:!0,payload:h,backups:y,safetyCopy:f,claim:a,unapproved:g,install:o,nudge:c}:{exists:!1,payload:null,backups:[],safetyCopy:null,claim:a,unapproved:g,install:o,nudge:c}}async function ro(n,e,t,i){try{await je(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:t}),keepalive:!0},co(dc,i))}catch(s){}}async function je(n,e,t,i="",s=!1){var N,P,_,T,z;let a=i?`${n.replace(/\/+$/,"")}${i}`:n,o=(N=t.method)!=null?N:"GET",c=await G().catch(()=>null),d=c?await mn(!1).catch(()=>null):null,y=await Js(),f={},g=(P=await It())!=null?P:uc;c&&d&&(f.authorization=`Bearer ${c.token}`,f[Ei]=g,f[rc]=await Un(d.privateKey,g,o,a,(_=t.body)!=null?_:"")),y&&(f[Ei]=g,f[cc]=y.publicKey,f[lc]=await Un(y.privateKey,g,o,a,(T=t.body)!=null?T:""));let h=await fetch(a,C(p({},t),{headers:p(C(p(p({},t.headers),await Fs()),{[oc]:e.hash,[ac]:e.field}),f)})),S=h.headers.get(Ei);if(S&&await Et(S),h.status===426)throw new Hn;if(h.status!==401)return h;let E=(z=await h.clone().json().catch(()=>null))==null?void 0:z.code;if(!s){if(E==="stale_salt"&&(c||y))return je(n,e,t,i,!0);if(E==="signed_out"&&c)return await Qe(),je(n,e,t,i,!0)}throw E==="claimed"||E==="not_owner"||E==="not_linked"?new ke(E):(E==="signed_out"&&await Qe(),new v(typeof E=="string"?E:"failed"))}function co(n,e){return e?`${n}?${fc}=${encodeURIComponent(e)}`:n}function so(n){let e=n;if(!e||typeof e.trust!="string")return null;let t=Array.isArray(e.waiting)?e.waiting:[];return{trusted:e.trust!=="pending"&&e.trust!=="rejected",refused:e.trust==="rejected",waiting:t.flatMap(i=>{let s=i;return s&&typeof s.id=="string"&&typeof s.first_seen_at=="number"?[{id:s.id,device:typeof s.device=="string"?s.device:null,first_seen_at:s.first_seen_at}]:[]})}}function jn(n){let e=n;return!e||typeof e.mine!="boolean"?null:e.status==="final"?{status:"final",mine:e.mine}:e.status!=="pending"||typeof e.final_at!="number"?null:p({status:"pending",mine:e.mine,email:typeof e.email=="string"?e.email:null,final_at:e.final_at,held:e.held===!0},e.waiting===!0?{waiting:!0}:{})}async function Pt(n){let e=new TextEncoder().encode(n),t=await crypto.subtle.digest("SHA-256",e);return[...new Uint8Array(t)].map(i=>i.toString(16).padStart(2,"0")).join("")}function Fn(n){return JSON.stringify(Ti(n))}function Ti(n){return Array.isArray(n)?n.map(Ti):n&&typeof n=="object"?Object.keys(n).sort().reduce((e,t)=>(e[t]=Ti(n[t]),e),{}):n}function lo(){let n=navigator.userAgent;return/Windows/i.test(n)?"Windows":/Mac OS|Macintosh/i.test(n)?"macOS":/Linux/i.test(n)?"Linux":n}var pc=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,mc=100,gc="marketplace:installed-extensions",hc="marketplace:installed-themes",Sc="marketplace:theme-installed",kc="marketplace:installed:",bc="marketplace";function Ai(n){return Spicetify.Config?Mi(Spicetify.Config,n):null}function Mi(n,e){var a;let t=Fe(n),i=new Set(wc(e)),s=((a=e[Sc])==null?void 0:a.includes(kc))===!0;return{current_theme:s?bc:t.current_theme,color_scheme:s?"":t.color_scheme,extensions:t.extensions.filter(o=>!i.has(o)),custom_apps:t.custom_apps}}function Fe(n){let e=n&&typeof n=="object"?n:{};return{current_theme:Pi(e.current_theme)?e.current_theme:"",color_scheme:Pi(e.color_scheme)?e.color_scheme:"",extensions:uo(e.extensions),custom_apps:uo(e.custom_apps)}}function po(n,e){return Fn(Fe(n))===Fn(Fe(e))}function uo(n){return Array.isArray(n)?[...new Set(n.filter(Pi))].sort().slice(0,mc):[]}function Pi(n){return typeof n=="string"&&pc.test(n)}function wc(n){let e=yo(n[gc]).map(i=>{var a;let s=(a=fo(n[i]))==null?void 0:a.manifest;return s&&typeof s=="object"?s.main:void 0}),t=yo(n[hc]).flatMap(i=>{var a;let s=(a=fo(n[i]))==null?void 0:a.include;return Array.isArray(s)?s:[]});return[...e,...t].flatMap(i=>{let s=typeof i=="string"?i.split("/").pop():void 0;return s?[s]:[]})}function yo(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function fo(n){try{let e=n?JSON.parse(n):null;return e&&typeof e=="object"&&!Array.isArray(e)?e:null}catch(e){return null}}var xc=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],vc="marketplace:installed:",mo=`${vc}snippet:`,Cc="wsoltani/syncify",Nc="marketplace",go={added:0,removed:1,unchanged:2};function V(n){let e=new Map;for(let[t,i]of xc)for(let s of Tc(n[t]))e.has(s)||e.set(s,Ec(s,i,n[s]));return[...e.values()]}function Yn(n,e,t,i){let s=new Set(n.map(d=>d.key)),a=new Map(t.map(d=>[d.key,d])),o=[...n.map(d=>{let y=a.get(d.key);return C(p({},d),{change:y?"unchanged":"added",isNew:!y||y.sources.join(" ")!==d.sources.join(" ")})}),...t.filter(d=>!s.has(d.key)).map(d=>C(p({},d),{change:Wn(d,n)?"unchanged":"removed",isNew:!1}))].sort((d,y)=>go[d.change]-go[y.change]||d.name.localeCompare(y.name)),c={added:0,removed:0,unchanged:0};for(let d of o)c[d.change]+=1;return{items:o,counts:c,manual:Ic(e,i)}}function Wn(n,e){return n.type==="extension"&&Mt(n)&&!e.some(Mt)}function Mt(n){var e;return((e=n.repo)==null?void 0:e.toLowerCase())===Cc}function Ic(n,e){if(!n)return[];let t=Fe(n),i=Fe(e),s=[...t.extensions.filter(o=>!i.extensions.includes(o)).map(o=>({type:"extension",name:o})),...t.custom_apps.filter(o=>!i.custom_apps.includes(o)).map(o=>({type:"custom_app",name:o}))],a=t.current_theme;return a&&a!==Nc&&(a!==i.current_theme||t.color_scheme!==i.color_scheme)&&s.push(p({type:"theme",name:a},t.color_scheme?{scheme:t.color_scheme}:{})),s}function Ec(n,e,t){var d,y;let i=ho(t),s=ho(i==null?void 0:i.manifest),a=At(i==null?void 0:i.user),o=At(i==null?void 0:i.repo),c=(y=(d=At(i==null?void 0:i.title))!=null?d:At(s==null?void 0:s.name))!=null?y:n.startsWith(mo)?n.slice(mo.length):n.split("/").pop()||n;return{key:n,type:e,name:c,repo:e!=="snippet"&&a&&o?`${a}/${o}`:null,sources:_c(e,i),custom:e==="snippet"&&(i==null?void 0:i.custom)===!0}}function _c(n,e){return e?(n==="extension"?[e.extensionURL]:n==="theme"?[e.cssURL,e.schemesURL,...Array.isArray(e.include)?e.include:[]]:[]).filter(i=>typeof i=="string"&&i!==""):[]}function At(n){return typeof n=="string"&&n.trim()?n.trim():null}function Tc(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function ho(n){let e=n;if(typeof n=="string")try{e=JSON.parse(n)}catch(t){return null}return e&&typeof e=="object"&&!Array.isArray(e)?e:null}var Lt="spicetify-marketplace";var zn="settings";async function So(){let n=await wo();if(n.kind!=="ok")return null;try{let e=await xo(n.db,"readonly",i=>i.getAll());if(!e)return null;let t={};for(let i of e)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(t[i.key]=i.value);return t}finally{n.db.close()}}async function ko(n,e=[]){let t=await wo();if(t.kind==="unavailable")return"unavailable";let i=t.kind==="ok"?t.db:await Pc();if(!i)return"failed";try{return await xo(i,"readwrite",a=>{let o;for(let[c,d]of Object.entries(n))o=a.put({key:c,value:d});for(let c of e)o=a.delete(c);return o})===null?"failed":"written"}finally{i.close()}}function bo(){var n;try{return(n=window.indexedDB)!=null?n:null}catch(e){return null}}async function wo(){let n=bo();return n?await Ac(n)?{kind:"missing"}:new Promise(e=>{let t=!1,i=n.open(Lt);i.onupgradeneeded=()=>{t=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),e({kind:"unavailable"})},i.onblocked=()=>e({kind:"unavailable"}),i.onsuccess=()=>{let s=i.result;if(t){s.close(),Mc(n).then(()=>e({kind:"missing"}));return}if(!s.objectStoreNames.contains(zn)){s.close(),e({kind:"unavailable"});return}e({kind:"ok",db:s})}}):{kind:"unavailable"}}function Pc(){let n=bo();return n?new Promise(e=>{let t=n.open(Lt,1);t.onupgradeneeded=()=>{let i=t.result;i.objectStoreNames.contains(zn)||i.createObjectStore(zn,{keyPath:"key"})},t.onerror=()=>{console.warn("Syncify could not create Marketplace storage",t.error),e(null)},t.onblocked=()=>e(null),t.onsuccess=()=>e(t.result)}):Promise.resolve(null)}async function Ac(n){if(typeof n.databases!="function")return!1;try{return!(await n.databases()).some(t=>t.name===Lt)}catch(e){return!1}}function Mc(n){return new Promise(e=>{let t=n.deleteDatabase(Lt);t.onsuccess=()=>e(),t.onerror=()=>e(),t.onblocked=()=>e()})}function xo(n,e,t){return new Promise(i=>{let s;try{s=n.transaction(zn,e)}catch(y){console.warn("Syncify could not open a Marketplace transaction",y),i(null);return}let a,o=!1,c=y=>{o||(o=!0,i(y))};s.oncomplete=()=>c(a),s.onerror=()=>{console.warn("Syncify Marketplace transaction failed",s.error),c(null)},s.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",s.error),c(null)};let d;try{d=t(s.objectStore(zn))}catch(y){console.warn("Syncify Marketplace request could not be issued",y),c(null);return}d&&(d.onsuccess=()=>{a=d.result},d.onerror=()=>{console.warn("Syncify Marketplace request failed",d.error),c(null)})})}var Li="marketplace:",Ot=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function ye(){let n=jc(),e=await So();if(e)for(let[t,i]of Object.entries(e))t.startsWith(Li)&&(n[t]=i);return n}var Dc=new Set(["marketplace:active-tab","marketplace:sort"]),Di="marketplace:installed:",Dt="marketplace:theme-installed",Oc=["stars","tags","lastUpdated","created"];async function Ut(n,e){let t={};for(let[i,s]of Object.entries(n))Dc.has(i)||(t[i]=i.startsWith(Di)?Uc(s):s);return e&&(t.spicetify_config=Fe(e)),Pt(Fn(t))}function Uc(n){try{let e=JSON.parse(n);if(!e||typeof e!="object"||Array.isArray(e))return n;for(let t of Oc)delete e[t];return e}catch(e){return n}}async function Bt(){let n=await ye(),e=Ai(n);return{keyCount:Object.keys(n).length,hash:await Ut(n,e),installedItemCount:Kc(n),installedItems:$t(n),items:V(n),spicetifyConfig:e,marketplaceAvailable:Hc(n),activeTheme:qn(n[Dt])}}function qn(n){if(!n)return null;if(n.startsWith(Di))return n;try{let e=JSON.parse(n);return typeof e=="string"?e:null}catch(e){return null}}async function vo(){let n=await ye(),e=Ai(n);return p({schema_version:2,metadata:{last_sync_datetime:new Date().toISOString(),device_info:lo(),marketplace_key_count:Object.keys(n).length},payload_hash:await Ut(n,e),marketplace_data:{keys:n}},e?{spicetify_config:e}:{})}async function Co(n,e=[]){var a,o;let t={},i=(o=(a=n.marketplace_data)==null?void 0:a.keys)!=null?o:{};for(let[c,d]of Object.entries(i))c.startsWith(Li)&&(t[c]=d);if(Object.keys(t).length===0)return 0;await Bc(t),e.length>0&&await $c(t,e);let s=Ui(await ye(),t);return await Oi(t,s),Object.keys(t).length}async function Oi(n,e=[]){for(let[i,s]of Object.entries(n))window.localStorage.setItem(i,s);for(let i of e)window.localStorage.removeItem(i);if(await ko(n,e)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try again.")}function Ui(n,e){let t=new Set(Ot.flatMap(o=>{var c;return Kt((c=e[o])!=null?c:n[o]).map(String)})),i=$t(n).filter(o=>o.startsWith(Di)&&!t.has(o)),s=i.filter(o=>n[o]!==void 0&&e[o]===void 0),a=n[Dt];return a&&e[Dt]===void 0&&i.some(o=>a.includes(o))&&s.push(Dt),s}async function Bc(n){let e=await ye(),t=V(n),i=V(e).filter(o=>Wn(o,t));if(i.length===0)return;let s="marketplace:installed-extensions",a=Kt(n[s]).map(String);for(let o of i)a.includes(o.key)||a.push(o.key),n[o.key]=e[o.key];n[s]=JSON.stringify(a)}async function $c(n,e){let t=await ye(),i=$t(t);for(let s of Ot){if(n[s]===void 0)continue;let a=Kt(n[s]).map(String).filter(o=>!e.includes(o)||i.includes(o));n[s]=JSON.stringify(a)}for(let s of e)t[s]!==void 0?n[s]=t[s]:delete n[s]}function Kc(n){return $t(n).length}function $t(n){return Ot.flatMap(e=>Kt(n[e]).map(String))}function Hc(n){return!!(window.Marketplace||Ot.some(t=>n[t]!==void 0)||n["marketplace:tabs"]!==void 0)}function No(n,e){return e===0?!1:n===0?!0:n<Math.max(2,Math.floor(e*.5))}function jc(){let n={};for(let e=0;e<window.localStorage.length;e+=1){let t=window.localStorage.key(e);if(!(t!=null&&t.startsWith(Li)))continue;let i=window.localStorage.getItem(t);i!==null&&(n[t]=i)}return n}function Kt(n){if(!n)return[];try{let e=JSON.parse(n);return Array.isArray(e)?e:[]}catch(e){return[]}}var Fc="raw.githubusercontent.com",Yc="cdn.jsdelivr.net",Io=".github.io";function $i(n){var t;if(n.protocol!=="https:")return null;let e=n.pathname.split("/").filter(Boolean);if(n.host===Fc)return Bi(e[0],e[1]);if(n.host===Yc)return e[0]==="gh"?Bi(e[1],(t=e[2])==null?void 0:t.split("@")[0]):null;if(n.host.endsWith(Io)){let i=n.host.slice(0,-Io.length);return i.includes(".")?null:Bi(i,e.length>1?e[0]:n.host)}return null}function Bi(n,e){return n&&e?`${n}/${e}`:null}var Wc={extension:"spicetify-extensions",theme:"spicetify-themes"},zc="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",qc="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",Gc="https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/",Vc="https://api.github.com/repos",Jc=5e3,Xc=20,Eo="syncify:repo-topics",_o=10080*60*1e3,Zc=200;function Ye(n){return(n==null?void 0:n.kind)==="host"||(n==null?void 0:n.kind)==="repo"||(n==null?void 0:n.kind)==="blocked"||(n==null?void 0:n.kind)==="catalog"}function Jn(n){let e=new Map;for(let t of n){if(t.change==="removed")continue;if(t.custom){e.set(t.key,{kind:"custom"});continue}let i=Rc(t);i&&e.set(t.key,i)}return e}async function Xn(n,e){let t=new Map,i=n.filter(o=>o.change!=="removed"&&o.isNew&&!e.has(o.key));if(i.length===0)return t;let s=i.filter(o=>o.type==="snippet"),a=i.filter(o=>o.type!=="snippet");if(s.length>0){let o=await Ki();for(let c of s)o?Ht(o,c.name)||t.set(c.key,{kind:"catalog"}):t.set(c.key,{kind:"unchecked"})}if(a.length>0){let o=await nl(),c=sl(),d=0;await Promise.all(a.map(async y=>{let f=Qc(y),g=Wc[y.type];if(!f||!g)return;if(o===null){t.set(y.key,{kind:"unchecked"});return}if(el(f,o)){t.set(y.key,{kind:"blocked"});return}let h=il(c,f);h===void 0&&d<Xc&&(d+=1,h=await tl(f),h!==void 0&&(c[f.toLowerCase()]={topics:h,at:Date.now()})),h===void 0?t.set(y.key,{kind:"unchecked"}):(h===null||!h.includes(g))&&t.set(y.key,{kind:"catalog"})})),ol(c)}return t}function Rc(n){let e=null;for(let t of n.sources){let i;try{i=new URL(t)}catch(a){return{kind:"host",host:t.slice(0,40)}}let s=$i(i);if(!s)return{kind:"host",host:i.host};n.repo&&s.toLowerCase()!==n.repo.toLowerCase()&&(e!=null||(e=s))}return e?{kind:"repo",repo:e}:null}function Qc(n){for(let e of n.sources)try{let t=$i(new URL(e));if(t)return t}catch(t){}return n.repo}function el(n,e){let t=`https://github.com/${n}`.toLowerCase();return e.some(i=>{let s=i.toLowerCase();if(!s.includes("*"))return s===t;let a=s.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${a}$`).test(t)})}function To(n){return n.replace(/\n/g,"").trim().toLowerCase()}function Ht(n,e){return n.get(To(e))}var Gn=null,Vn=null;function nl(){return Gn!=null||(Gn=Po(zc).then(n=>{let e=n==null?void 0:n.repos;return Array.isArray(e)?e.filter(t=>typeof t=="string"&&!t.startsWith("//")):(Gn=null,null)})),Gn}function Ki(){return Vn!=null||(Vn=Po(qc).then(n=>{if(!Array.isArray(n))return Vn=null,null;let e=new Map;for(let t of n){if(typeof(t==null?void 0:t.title)!="string"||typeof t.code!="string")continue;let i=typeof t.preview=="string"?t.preview:null;e.set(To(t.title),p({title:t.title,code:t.code,description:typeof t.description=="string"?t.description:""},i?{imageURL:i.startsWith("http")?i:`${Gc}${i}`}:{}))}return e})),Vn}async function tl(n){let e=await Ao(`${Vc}/${n}`);if((e==null?void 0:e.status)===404)return null;if(!(e!=null&&e.ok))return;let t=await e.json().catch(()=>null);return Array.isArray(t==null?void 0:t.topics)?t.topics.filter(i=>typeof i=="string"):void 0}async function Po(n){let e=await Ao(n);return e!=null&&e.ok?e.json().catch(()=>null):null}async function Ao(n){let e=typeof AbortController=="function"?new AbortController:null,t=setTimeout(()=>e==null?void 0:e.abort(),Jc);try{return await fetch(n,{signal:e==null?void 0:e.signal})}catch(i){return null}finally{clearTimeout(t)}}function il(n,e){let t=n[e.toLowerCase()];return t&&Date.now()-t.at<_o?t.topics:void 0}function sl(){var n;try{let e=JSON.parse((n=localStorage.getItem(Eo))!=null?n:"{}");return e&&typeof e=="object"?e:{}}catch(e){return{}}}function ol(n){let e=Date.now(),t=Object.entries(n).filter(([,i])=>e-i.at<_o).sort(([,i],[,s])=>s.at-i.at).slice(0,Zc);try{localStorage.setItem(Eo,JSON.stringify(Object.fromEntries(t)))}catch(i){}}var al=/^[0-9A-HJKMNP-TV-Z]{6}$/,rl=6,cl="SYN-",Oo=60,Hi=20,Uo=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],ll="marketplace:installed:",Fd=`${ll}snippet:`,tn="marketplace:theme-installed",Mo="marketplace",Lo={added:0,removed:1,unchanged:2},ul=new RegExp(`^[a-z0-9][a-z0-9_-]{1,${Hi-2}}[a-z0-9]$`);function Bo(n){let e=n.trim().replace(/^@/,"").toLowerCase();return/[^a-z0-9_-]/.test(e)?"Only letters, digits, _ and -":e.length<3?"At least 3 characters":!/^[a-z0-9]/.test(e)||!/[a-z0-9]$/.test(e)?"Start and end with a letter or digit":null}function be(n){return`${cl}${n}`}function $o(n){let e=n.trim();if(e.length>200)return null;if(e.includes("/")){let i=e.split(/[?#]/)[0].replace(/\/+$/,"");e=i.slice(i.lastIndexOf("/")+1).replace(/\.json$/i,"")}e=e.toUpperCase().replace(/[\s-]/g,""),e.length===rl+3&&e.startsWith("SYN")&&(e=e.slice(3));let t=e.replace(/O/g,"0").replace(/[IL]/g,"1");return al.test(t)?t:null}function Ko(n){let e=n;return!e||typeof e.code!="string"||!e.keys||typeof e.keys!="object"||!Object.values(e.keys).every(t=>typeof t=="string")?null:{code:e.code,name:typeof e.name=="string"&&e.name?e.name:null,creator:typeof e.creator=="string"&&ul.test(e.creator)?e.creator:null,updated_at:typeof e.updated_at=="number"?e.updated_at:0,keys:e.keys}}async function Ho(n,e){let t=n.filter(o=>!Mt(o)).map(o=>C(p({},o),{change:"added",isNew:!0})),i=Jn(t);for(let o of t)!i.has(o.key)&&!dl(o,e[o.key])&&i.set(o.key,{kind:"catalog"});let s=await Xn(t,i),a=new Map;for(let[o,c]of[...s,...i])c.kind!=="unchecked"&&a.set(o,c);return{items:t,leftOut:a}}function dl(n,e){if(n.type==="snippet")return!0;if(!n.repo)return!1;let t=pl(e);return n.type==="extension"?typeof(t==null?void 0:t.extensionURL)=="string"&&t.extensionURL!=="":typeof(t==null?void 0:t.cssURL)=="string"&&t.cssURL!==""}function jo(n,e){let t={};for(let[s,a]of Uo){let o=e.filter(c=>c.type===a&&n[c.key]!==void 0).map(c=>c.key);t[s]=JSON.stringify(o);for(let c of o)t[c]=n[c]}let i=qn(n[tn]);return i&&e.some(s=>s.key===i)&&(t[tn]=n[tn]),t}function Fo(n,e,t,i,s,a){let o=a==="replace"?Yn(e,void 0,t,i):yl(e,t),c=qn(n.keys[tn]),d=c!==null&&e.some(f=>f.key===c)&&i!==null&&i.current_theme!==Mo,y=c!==null&&c!==s?e.find(f=>f.key===c):void 0;return p(C(p({},o),{manual:d?[{type:"theme",name:Mo}]:[]}),y?{theme:{key:y.key,name:y.name}}:{})}function yl(n,e){let t=new Set(e.map(o=>o.key)),i=new Set(n.map(o=>o.key)),s=[...n.map(o=>t.has(o.key)?C(p({},o),{change:"unchanged",isNew:!1}):C(p({},o),{change:"added",isNew:!0})),...e.filter(o=>!i.has(o.key)).map(o=>C(p({},o),{change:"unchanged",isNew:!1}))].sort((o,c)=>Lo[o.change]-Lo[c.change]||o.name.localeCompare(c.name)),a={added:0,removed:0,unchanged:0};for(let o of s)a[o.change]+=1;return{items:s,counts:a,manual:[]}}function Yo(n,e){return new Set(n.items.filter(t=>t.type==="snippet"&&t.change==="added"&&(!e||!Ht(e,t.name))).map(t=>t.key))}async function Wo(n,e,t,i){let s=await ye(),a=V(s),o=V(n.keys),c={};for(let[g,h]of Uo){let S=Do(s[g]),N=[...e==="add"?S:S.filter(P=>t.includes(P)||a.some(_=>_.key===P&&Wn(_,o)))];for(let P of o){if(P.type!==h||t.includes(P.key))continue;let _=S.includes(P.key);if(e==="add"&&_)continue;let T=h==="snippet"?fl(P,i,s[P.key]):n.keys[P.key];T!==void 0&&(c[P.key]=T,N.includes(P.key)||N.push(P.key))}c[g]=JSON.stringify(N)}let d=qn(n.keys[tn]),y=Do(c["marketplace:installed-themes"]);d&&y.includes(d)&&!t.includes(d)&&(c[tn]=n.keys[tn]);let f=Ui(s,c);return await Oi(c,f),Object.keys(c).length+f.length}function fl(n,e,t){let i=e?Ht(e,n.name):void 0;return i?JSON.stringify(p({code:i.code,title:i.title,description:i.description},i.imageURL?{imageURL:i.imageURL}:{})):t}function Do(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function pl(n){try{let e=n?JSON.parse(n):null;return e&&typeof e=="object"&&!Array.isArray(e)?e:null}catch(e){return null}}var Zn="/api/shares",ml=`${Zn}/update`,gl=`${Zn}/delete`,hl=`${Zn}/import`,Sl="x-syncify-user-hash",kl="discover/presets.json",bl={no_code:"This code doesn't exist.",too_many_codes:"You can't make more share codes. Delete one to make another.",daily_limit:"Too many changes to share codes today. Try again tomorrow.",too_large:"This setup is too big to share.",invalid_name:"Names can be up to 60 characters.",empty:"There's nothing to share yet. Install something from Marketplace first.",invalid_items:"Syncify couldn't read some items. Reload Spotify and try again.",source:"Some items don't load from GitHub. Reload Spotify and try again.",blocked:"Some items are on Marketplace's block list. Reload Spotify and try again.",custom_snippet:"Custom snippets can't be shared. Reload Spotify and try again.",unchecked:"Couldn't check Marketplace's block list. Try again in a minute.",publish_failed:"Couldn't publish the code. Press Update on it to try again.",delete_failed:"Couldn't delete the code. Try again.",same_setup:"You already shared this setup.",invalid_handle:"Handles are 3 to 20 letters, digits, _ or -, starting and ending with a letter or digit.",reserved_handle:"That handle isn't allowed. Pick another.",handle_taken:"That handle is taken. Pick another.",unavailable:"Share codes aren't available yet."},wl=new Set(["offline","signed_out","invalid_signature","stale_salt","no_device_key","too_many_requests"]);function jt(n,e=null){var t;return n instanceof v&&wl.has(n.code)?en(n):n instanceof v&&n.code==="too_many_codes"&&e!==null?`You have ${e} share codes already. Delete one to make another.`:(t=n instanceof v?bl[n.code]:void 0)!=null?t:"Something went wrong. Try again."}async function ji(){var e;let n=await $n(Zn,"GET");return{codes:Array.isArray(n==null?void 0:n.codes)?n.codes.flatMap(t=>{let i=xl(t);return i?[i]:[]}):[],newHearts:typeof(n==null?void 0:n.new_hearts)=="number"?n.new_hearts:0,max:typeof(n==null?void 0:n.max)=="number"?n.max:null,profile:typeof((e=n==null?void 0:n.profile)==null?void 0:e.handle)=="string"?{handle:n.profile.handle,link:typeof n.profile.link=="string"?n.profile.link:null}:null,suggestedHandle:typeof(n==null?void 0:n.suggested_handle)=="string"?n.suggested_handle:null}}async function zo(n,e,t){return Zo(await $n(Zn,"POST",p({name:n,keys:e},t===void 0?{}:{handle:t})))}function Fi(n){return`${D().shareUrl.replace(/\/+$/,"")}/@${n}`}async function qo(n,e,t){return Zo(await $n(ml,"POST",{code:n,name:e,keys:t}))}async function Go(n){try{await $n(gl,"POST",{code:n})}catch(e){if(e instanceof v&&e.code==="no_code")return;throw e}}async function Vo(n){let e=D().shareUrl.replace(/\/+$/,""),t;try{t=await fetch(`${e}/${n}.json`)}catch(s){throw new v("offline")}if(t.status===404||t.status===403)throw new v("no_code");if(!t.ok)throw new v("failed");let i=Ko(await t.json().catch(()=>null));if(!i||i.code!==n)throw new v("no_code");return i}async function Jo(){let n=D().shareUrl.replace(/\/+$/,"");try{let e=await fetch(`${n}/${kl}`);if(!e.ok)return null;let t=await e.json();return Array.isArray(t.posts)?t.posts.flatMap(i=>{let s=Nl(i);return s?[s]:[]}):null}catch(e){return null}}async function Xo(n,e,t=!1){try{await to(hl,p({code:n},t?{source:"preset"}:{}),{[Sl]:e.hash})}catch(i){}}function xl(n){let e=n;return!e||typeof e.code!="string"?null:{code:e.code,name:typeof e.name=="string"&&e.name?e.name:null,link:typeof e.link=="string"?e.link:null,item_count:typeof e.item_count=="number"?e.item_count:0,imports:typeof e.imports=="number"?e.imports:0,created_at:typeof e.created_at=="number"?e.created_at:0,updated_at:typeof e.updated_at=="number"?e.updated_at:0,hearts:Cl(n.post),posted:vl(n.post)}}function vl(n){let e=n==null?void 0:n.status;return typeof e=="string"&&e!=="removed"}function Cl(n){let e=n;return(e==null?void 0:e.status)==="public"&&e.hidden!==!0&&typeof e.hearts=="number"?e.hearts:null}function Nl(n){let e=n,t=i=>Number.isSafeInteger(i)&&i>=0?i:0;return!e||typeof e.code!="string"?null:{code:e.code,name:typeof e.name=="string"?e.name:be(e.code),extensions:t(e.extensions),themes:t(e.themes),snippets:t(e.snippets)}}function Zo(n){let e=n;if(typeof(e==null?void 0:e.code)!="string")throw new v("failed");return{code:e.code,link:typeof e.link=="string"?e.link:null,leftOut:Array.isArray(e.left_out)?e.left_out.length:0}}var Ro="/claims",Il="/claims/cancel",El={no_backup:"Back up first, then secure your backup.",unsupported_identity:"This Spotify account can't be secured.",too_many_accounts:"Your account already has 10 Spotify accounts linked.",offline:"Couldn't reach Syncify. Check your connection and try again."},We=class extends Error{constructor(t){var i;super((i=El[t])!=null?i:"Couldn't secure your backup. Try again.");this.code=t;this.name="ClaimError"}};async function Qo(n,e){let t=await Yi(n,e,"GET",Ro);if(!t.ok)throw new We(await Wi(t));let i=await t.json().catch(()=>null);return{claim:jn(i==null?void 0:i.claim),accounts:Array.isArray(i==null?void 0:i.accounts)?i.accounts.filter(_l):null}}async function ea(n,e){let t=await Yi(n,e,"POST",Ro);if(!t.ok)throw new We(await Wi(t));let i=await t.json().catch(()=>null);return jn(i==null?void 0:i.claim)}async function na(n,e){let t=await Yi(n,e,"POST",Il);if(!t.ok&&t.status!==404)throw new We(await Wi(t))}async function Yi(n,e,t,i){try{return await je(n,e,{method:t},i)}catch(s){throw s instanceof TypeError?new We("offline"):s}}async function Wi(n){let e=await n.json().catch(()=>null);return typeof(e==null?void 0:e.code)=="string"?e.code:"failed"}function _l(n){let e=n;return!!(e&&typeof e.hash=="string"&&(e.status==="pending"||e.status==="final"||e.status==="cancelled"))}var Sn={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},Tl=/^([a-z0-9]|f([1-9]|1[0-2]))$/,Pl=250,Al=40,zi=null,Ft=null,hn=null;function ta(){return/mac/i.test(navigator.platform||navigator.userAgent)}function ia(n){if(n===null)return null;if(!n||typeof n!="object")return Sn;let e=n;return typeof e.key!="string"||!Tl.test(e.key)?Sn:{key:e.key,ctrl:!!e.ctrl,alt:!!e.alt,shift:!!e.shift,meta:!!e.meta}}function Rn(n){if(!n)return"Off";let e=n.key.toUpperCase();return ta()?[n.ctrl?"\u2318":"",n.alt?"\u2325":"",n.shift?"\u21E7":"",e].join(""):[n.ctrl&&"Ctrl",n.meta&&"Win",n.alt&&"Alt",n.shift&&"Shift",e].filter(Boolean).join("+")}function sa(n){if(n.key==="Escape")return{kind:"cancel"};let e=Ml(n.code);if(!e)return{kind:"ignore"};let t=ta();if(t&&n.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:e,ctrl:t?n.metaKey:n.ctrlKey,alt:n.altKey,shift:n.shiftKey,meta:t?!1:n.metaKey},s=e.startsWith("f")&&e.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!s?{kind:"error",message:`Include ${t?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function Ml(n){var t,i;let e=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(n);return e?((i=(t=e[1])!=null?t:e[2])!=null?i:e[3]).toLowerCase():null}function oa(n){var e;if(hn&&Ll(hn,n))return!1;try{let t=Spicetify.Mousetrap,i=(e=t.trigger)==null?void 0:e.call(t)._directMap;if(!i)return!1;let s=qi(n);return Object.keys(i).some(a=>a.startsWith(`${s}:`))}catch(t){return!1}}function Gi(n,e,t=0){if(zi=e,Ft=n,!aa()){if(t>=Al){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>Gi(Ft,e,t+1),Pl);return}Vi(Ft)}function Vi(n){if(Ft=n,!aa()||!zi)return;let e=zi;try{if(hn&&Spicetify.Keyboard._deregisterShortcut(hn),hn=null,!n)return;Spicetify.Keyboard.registerShortcut(n,t=>{t.preventDefault(),e()}),hn=n,console.debug("[Syncify]","Keyboard shortcut registered",Rn(n))}catch(t){console.warn("[Syncify]","Failed to register keyboard shortcut",t)}}function aa(){var n;return typeof((n=Spicetify.Keyboard)==null?void 0:n.registerShortcut)=="function"}function qi(n){return[n.ctrl&&"mod",n.meta&&"meta",n.alt&&"alt",n.shift&&"shift",n.key].filter(Boolean).join("+")}function Ll(n,e){return qi(n)===qi(e)}var Ji="both",Dl=["both","topbar","menu"],Qn=null,et=null,Yt=!1;function ra(n){return Dl.includes(n)?n:Ji}function ca(){var n;return typeof((n=Spicetify.Menu)==null?void 0:n.Item)=="function"}function la(n){Qn=n.topbarButton,et=n.menuItem}function Wt(n){let e=n!=="menu"||!et,t=n!=="topbar";if(Qn!=null&&Qn.element&&(Qn.element.style.display=e?"":"none"),!!et)try{t&&!Yt?(et.register(),Yt=!0):!t&&Yt&&(et.deregister(),Yt=!1)}catch(i){console.warn("[Syncify]","Failed to update profile menu item",i)}}var qt="syncify:config",zt={workerUrl:D().workerUrl,autoBackupEnabled:!1,shortcut:Sn,entryPoint:Ji};function fe(){var t,i;let n=D(),e=(i=(t=Spicetify.LocalStorage)==null?void 0:t.get(qt))!=null?i:window.localStorage.getItem(qt);if(!e)return C(p({},zt),{workerUrl:n.workerUrl});try{let s=JSON.parse(e);return{workerUrl:n.workerUrl,autoBackupEnabled:s.autoBackupEnabled===void 0?zt.autoBackupEnabled:!!s.autoBackupEnabled,shortcut:s.shortcut===void 0?zt.shortcut:ia(s.shortcut),entryPoint:ra(s.entryPoint)}}catch(s){return C(p({},zt),{workerUrl:n.workerUrl})}}function Gt(n){var t;let e=JSON.stringify({workerUrl:D().workerUrl,autoBackupEnabled:n.autoBackupEnabled,shortcut:n.shortcut,entryPoint:n.entryPoint});if((t=Spicetify.LocalStorage)!=null&&t.set){Spicetify.LocalStorage.set(qt,e);return}window.localStorage.setItem(qt,e)}function nt(n){return typeof n.workerUrl=="string"&&n.workerUrl.length>0}var Ol=["username","canonicalUsername","id","uri","displayName"];async function we(){let{value:n,field:e}=await Ul();return{hash:await Pt(n),field:e}}async function Ul(){var s;let n=(s=Spicetify.Platform)==null?void 0:s.UserAPI;if(!(n!=null&&n.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let e=await n.getUser(),t=Ol.find(a=>(e==null?void 0:e[a])!=null),i=t?e[t]:void 0;if(!t||!i)throw new Error("Unable to resolve the active Spotify user.");return{value:i,field:t}}async function it(n){if(!nt(n))throw new Error("Syncify backup service is not configured.");let[e,t]=await Promise.all([we(),vo()]);if(t.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:i,unapproved:s}=await oo(n.workerUrl,e,t);return{payload:t,unchanged:i,unapproved:s}}async function kn(n,e){var c;if(!nt(n))throw new Error("Syncify backup service is not configured.");let t=await _i(n.workerUrl,await we(),e),[i,s,a]=await Promise.all([Promise.all(t.backups.map(Zi)),t.safetyCopy?Zi(t.safetyCopy):null,Promise.all(t.unapproved.map(Zi))]),o=i.filter((d,y)=>i.findIndex(f=>f.payload_hash===d.payload_hash)===y);return C(p({},t),{payload:(c=o[0])!=null?c:null,backups:o,safetyCopy:s&&!o.some(d=>d.payload_hash===s.payload_hash)?s:null,unapproved:a.filter(d=>!o.some(y=>y.payload_hash===d.payload_hash))})}var Xi=new Map;async function Zi(n){var a,o,c;let e=(o=(a=n.marketplace_data)==null?void 0:a.keys)!=null?o:{},t=n.spicetify_config?Mi(n.spicetify_config,e):void 0,i=`${n.payload_hash} ${(c=n.metadata)==null?void 0:c.last_sync_datetime}`,s=Xi.get(i);return s||(s=Ut(e,t),Xi.set(i,s),s.catch(()=>Xi.delete(i))),C(p(p({},n),t?{spicetify_config:t}:{}),{payload_hash:await s})}async function ua(n){let e=await _i(st(n),await we());return{claim:e.claim,install:e.install,nudge:e.nudge}}async function da(n,e,t,i=[]){var c;let s=e!=null?e:(await kn(n)).payload;if(!s)throw new Error("No Syncify cloud backup was found for this Spotify account.");let a=await Co(s,i),o=(c=s.backup)==null?void 0:c.id;return o&&nt(n)&&we().then(d=>ro(n.workerUrl,d,o,t)).catch(()=>{}),{payload:s,restoredCount:a}}var tt=class extends Error{constructor(t){super("Couldn't back up your setup first, so nothing changed.");this.reason=t;this.name="SafetyBackupError"}};async function ya(n,e,t,i,s,a=!1){try{await it(n)}catch(c){throw new tt(c)}let o=await Wo(e,t,i,s);return we().then(c=>Xo(e.code,c,a)).catch(()=>{}),o}async function fa(n){let e=await we(),t=await Qo(st(n),e);return C(p({},t),{hash:e.hash})}async function pa(n){await ea(st(n),await we())}async function Vt(n,e,t){await ao(st(n),await we(),e,t)}async function Jt(n){await na(st(n),await we())}function st(n){if(!nt(n))throw new Error("Syncify backup service is not configured.");return n.workerUrl}var ma="syncify:nudge-hidden-until",ga="syncify:nudge-panel-shown";function ha(n=Date.now()){let e=Number(wa(ma));return Number.isFinite(e)&&e>n}function Sa(n=Date.now()){xa(ma,String(n+30*864e5))}function ka(){return wa(ga)!==null}function ba(){xa(ga,"1")}function wa(n){var e,t;return(t=(e=Spicetify.LocalStorage)==null?void 0:e.get(n))!=null?t:window.localStorage.getItem(n)}function xa(n,e){var t;(t=Spicetify.LocalStorage)!=null&&t.set?Spicetify.LocalStorage.set(n,e):window.localStorage.setItem(n,e)}var Xt="syncify:claim-check-day";async function Ca(n){var t,i,s;let e=fe();if(e.workerUrl){if(!e.autoBackupEnabled)return Bl(n);try{let[a,o]=await Promise.all([Bt(),kn(e)]);Na(o,n);let c=(i=(t=o.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?i:0;if(o.exists&&No(a.keyCount,c)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((s=o.payload)==null?void 0:s.payload_hash)===a.hash||a.keyCount===0)return;let{unapproved:d}=await it(e);Spicetify.showNotification(d?"Syncify: backed up, waiting for approval":"Syncify auto-backup complete")}catch(a){if(a instanceof ke||a instanceof nn){Spicetify.showNotification("Syncify: sign in to keep backing up",!0,8e3);return}let o=a instanceof Error?a.message:String(a);console.warn("Syncify startup sync failed:",a),Spicetify.showNotification(`Syncify auto-sync skipped: ${o}`,!0,8e3)}}}async function Bl(n){let e=new Date().toLocaleDateString("en-CA");if(Kl()!==e)try{let t=await ua(fe());va(e),Na(t,n)}catch(t){if(t instanceof ke){va(e);return}console.warn("Syncify claim check failed:",t)}}function Na(n,e){var s;let t=$l(n.claim),i=(s=n.install)==null?void 0:s.waiting[0];t?e.onClaim(t):i?e.onInstall(i):n.nudge&&!ka()&&e.onNudge()}function $l(n){return(n==null?void 0:n.status)==="pending"&&!n.mine?n:null}function Kl(){var n,e;return(e=(n=Spicetify.LocalStorage)==null?void 0:n.get(Xt))!=null?e:window.localStorage.getItem(Xt)}function va(n){var e;(e=Spicetify.LocalStorage)!=null&&e.set?Spicetify.LocalStorage.set(Xt,n):window.localStorage.setItem(Xt,n)}var Qi="syncify:pending-restore",Hl=600*1e3,jl=2e3,Fl=15e3,Yl="marketplace:theme-installed",Wl="raw.githubusercontent.com",zl=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],xe=null,Ri=new Set,_a=new Map;function Ta(){return xe}function Pa(n){return Ri.add(n),()=>Ri.delete(n)}function Aa(){xe&&Ua(C(p({},xe),{manual:[]}))}function Rt(n,e="restore"){try{localStorage.setItem(Qi,JSON.stringify({at:Date.now(),manual:n,kind:e}))}catch(t){}}function Ma(){var n;Rt((n=xe==null?void 0:xe.manual)!=null?n:[],xe==null?void 0:xe.kind),window.location.reload()}function La(){Ba()&&(document.addEventListener("load",n=>Ia(n.target,"load"),!0),document.addEventListener("error",n=>Ia(n.target,"error"),!0))}async function Da(){let n=Ba();if(!n)return;try{localStorage.removeItem(Qi)}catch(o){}let e=Date.now(),t=await Ea();for(;t.loaded<t.total&&Date.now()-e<Fl;)await new Promise(o=>setTimeout(o,jl)),t=await Ea();Ua(C(p({kind:n.kind,at:Date.now()},t),{manual:n.manual}));let i=t.loaded===t.total&&n.manual.length===0,s=n.kind==="share"?"Setup applied":"Backup restored",a=n.kind==="share"?"loaded":"restored";Spicetify.showNotification(i?`Syncify: ${s}; ${t.total} ${t.total===1?"item":"items"}`:`Syncify: ${a} ${t.loaded} of ${t.total}. Open Syncify for details.`,!1,8e3)}function Oa(n){let e=n.map(t=>t.type==="extension"?`spicetify config extensions ${Zt(t.name)}`:t.type==="custom_app"?`spicetify config custom_apps ${Zt(t.name)}`:`spicetify config current_theme ${Zt(t.name)}${t.scheme?` color_scheme ${Zt(t.scheme)}`:""}`);return e.length>0?[...e,"spicetify apply"]:[]}function Zt(n){return/^[\w.@+/-]+$/.test(n)?n:`"${n}"`}function Ua(n){xe=n;for(let e of Ri)e(n)}function Ba(){var n;try{let e=JSON.parse((n=localStorage.getItem(Qi))!=null?n:"null");return!e||Date.now()-e.at>Hl?null:{manual:Array.isArray(e.manual)?e.manual:[],kind:e.kind==="share"?"share":"restore"}}catch(e){return null}}function Ia(n,e){n instanceof HTMLScriptElement&&n.src&&_a.set(ot(n.src),e)}async function Ea(){var i;let n=await ye(),e=(i=n[Yl])!=null?i:"",t=V(n).filter(s=>s.type==="extension"&&s.sources.length>0||s.type==="theme"&&e.includes(s.key)||s.type==="snippet");return{loaded:t.filter(ql).length,total:t.length}}function ql(n){var e,t;if(n.type==="snippet"){let i=document.querySelector("style.marketplaceSnippets");return((e=i==null?void 0:i.textContent)==null?void 0:e.includes(`/* ${n.name} - `))===!0}if(n.type==="theme"){let i=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((t=i==null?void 0:i.textContent)!=null&&t.trim())}return Gl(n.sources[0]).some(Vl)}function Gl(n){let e;try{e=new URL(n)}catch(o){return[]}if(e.host!==Wl)return[ot(e.href)];let[t,i,s,...a]=e.pathname.split("/").filter(Boolean);return!t||!i||!s||a.length===0?[]:zl.map(o=>ot(`https://${o}/gh/${t}/${i}@${s}/${a.join("/")}`))}function Vl(n){let e=_a.get(n);return e?e==="load":[...document.querySelectorAll("script[src]")].some(i=>ot(i.src)===n)&&performance.getEntriesByType("resource").some(i=>ot(i.name)===n)}function ot(n){try{let e=new URL(n);return`${e.origin}${e.pathname}`}catch(e){return n}}function es(n){return`A new install${n.device?` on ${n.device}`:""} wants to back up this Spotify account.`}function $a(n){let e=Spicetify.React,t=e.useState,{install:i}=n,[s,a]=t(!1),[o,c]=t(null);async function d(y){a(!0),c(null);try{await Vt(fe(),i.id,y),Spicetify.showNotification(y==="approve"?"Syncify: install approved":"Syncify: install refused"),n.onDone(y)}catch(f){c(f instanceof Error?f.message:String(f)),a(!1)}}return e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-claim-notice"},es(i)," Approve it if it's yours."),o?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},o):null,e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:n.onClose,disabled:s},"Close"),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{d("reject")},disabled:s},"Not mine"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{d("approve")},disabled:s},"Approve")))}var Jl="syncify:beta",Ka=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function Ha(){var n;return(n=window.SyncifyLoader)!=null?n:null}function Xl(){try{return window.localStorage.getItem(Jl)==="true"}catch(n){return!1}}async function ja(n){let e=Xl()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(e.map(i=>Zl(`${n}/${i}`)))).reduce((i,s)=>s&&(!i||ts(s,i)>0)?s:i,null)}function ns(n){return typeof n=="string"&&Ka.test(n)}function ts(n,e){let[t,i]=[n,e].map(s=>{var y;let[,a,o,c,d]=(y=Ka.exec(s))!=null?y:[];return[a,o,c,d!=null?d:1/0].map(Number)});for(let s=0;s<t.length;s+=1)if(t[s]!==i[s])return t[s]<i[s]?-1:1;return 0}async function Zl(n,e=3e3){let t=typeof AbortController=="function"?new AbortController:null,i=setTimeout(()=>t==null?void 0:t.abort(),e);try{let s=await fetch(n,{signal:t==null?void 0:t.signal});if(!s.ok)return null;let a=await s.json();return ns(a==null?void 0:a.version)?a.version:null}catch(s){return null}finally{clearTimeout(i)}}var os="syncify:share-code-count",Rl=600;function Ql(){var e,t;let n=Number((t=(e=Spicetify.LocalStorage)==null?void 0:e.get(os))!=null?t:NaN);return Number.isInteger(n)&&n>=0?n:null}function Fa(n){var e,t;n===null?(e=Spicetify.LocalStorage)==null||e.remove(os):(t=Spicetify.LocalStorage)==null||t.set(os,String(n))}var as="syncify:handle";function eu(){var e;let n=(e=Spicetify.LocalStorage)==null?void 0:e.get(as);return n==null?void 0:n||null}function is(n){var e,t;n===void 0?(e=Spicetify.LocalStorage)==null||e.remove(as):(t=Spicetify.LocalStorage)==null||t.set(as,n!=null?n:"")}var w=null;function ti(n={}){var xs,vs,Cs,Ns,Is,Es,_s,Ts,Ps,As;let e=Spicetify.React,t=e.useEffect,i=e.useMemo,s=e.useState,a=e.useRef,[o,c]=s(()=>fe()),[d,y]=s(()=>w!=null&&w.remote.exists?"success":"idle"),[f,g]=s(null),[h,S]=s(0),[E,N]=s([]),[P,_]=s([]),[T,z]=s(null),[ze,ve]=s(null),[J,Q]=s(null),[Y,Ce]=s(null),[B,ee]=s(()=>{var r;return(r=w==null?void 0:w.remote.payload)!=null?r:null}),[ae,k]=s(()=>{var r;return(r=w==null?void 0:w.remote.backups)!=null?r:[]}),[I,$]=s(()=>{var r;return(r=w==null?void 0:w.remote.safetyCopy)!=null?r:null}),[j,q]=s(()=>{var r;return(r=w==null?void 0:w.remote.unapproved)!=null?r:[]}),[ne,Ne]=s(()=>{var r;return(r=w==null?void 0:w.remote.install)!=null?r:null}),[re,rt]=s(!1),[Cn,ct]=s(()=>new Set),[A,ce]=s(()=>{var r;return(r=w==null?void 0:w.remote.payload)!=null?r:null}),[Ie,sn]=s(w!==null),[on,X]=s(!1),[F,te]=s(!1),[Ee,Nn]=s(null),[L,ie]=s(!1),[Oe,pe]=s(null),[me,In]=s((xs=n.section)!=null?xs:null),[qe,an]=s(!1),[x,Ue]=s(()=>Ta()),[lt,Ge]=s(!1),[Z,ut]=s(!1),[_e,dt]=s(null),[Te,K]=s(()=>Ql()),[Be,se]=s(()=>eu()),[H,Pe]=s(void 0),[O,ai]=s(()=>{var r;return(r=w==null?void 0:w.lockedBy)!=null?r:null}),[$e,En]=s(()=>{var r;return(r=w==null?void 0:w.remote.claim)!=null?r:null}),[ge,Ve]=s(()=>{var r;return(r=w==null?void 0:w.claims)!=null?r:null}),[le,_n]=s(!1),[yt,rn]=s(null),[ri,Je]=s(()=>{var r;return(r=w==null?void 0:w.remote.nudge)!=null?r:!1}),[Tn,ft]=s(()=>ha()),[ci,li]=s(n.secure===!0),Pn=a(!1),[cn,An]=s(!1),[u,m]=s(null),[b,ue]=s(null),Mn=a(null),Ae=i(()=>D(),[]),ln=i(()=>I?[...ae,I]:ae,[ae,I]),ui=u?[]:j,di=u?(vs=b==null?void 0:b.backups)!=null?vs:[]:ae,us=u?(Cs=b==null?void 0:b.safetyCopy)!=null?Cs:null:I,ds=i(()=>{var r;return new Map([...ln,...j,...(r=b==null?void 0:b.backups)!=null?r:[],...b!=null&&b.safetyCopy?[b.safetyCopy]:[]].map(l=>[l,V(l.marketplace_data.keys)]))},[ln,j,b]),pt=r=>{var l;return(l=ds.get(r))!=null?l:V(r.marketplace_data.keys)},or=r=>pt(r).map(l=>l.key),ar=r=>pt(r).length,R=i(()=>on&&A?Yn(pt(A),A.spicetify_config,P,T):null,[on,A,ds,P,T]),Ke=i(()=>R?Jn(R.items):null,[R]),mt=i(()=>new Map([...Ee!=null?Ee:[],...Ke!=null?Ke:[]]),[Ee,Ke]),gt=((Ns=A==null?void 0:A.backup)==null?void 0:Ns.kind)==="quarantined",ys=i(()=>{var r;return new Set(((r=R==null?void 0:R.items)!=null?r:[]).filter(l=>{var M;return l.change!=="removed"&&l.isNew&&(gt||Ye(mt.get(l.key))||((M=mt.get(l.key))==null?void 0:M.kind)==="unchecked")}).map(l=>l.key))},[R,mt,gt]),rr=[...ys].filter(r=>!Cn.has(r)),fs=R!==null&&Ee===null,yi=i(()=>ca(),[]),ps=i(()=>Ha()!==null,[]),de=d==="loading",ht=(f==null?void 0:f.kind)==="warning"||(f==null?void 0:f.kind)==="error"?f:null,ms=!!(B&&Y&&B.payload_hash!==Y),Ln=!!(B&&Y&&B.payload_hash===Y),gs=!!(A&&Y&&A.payload_hash===Y),St=u!==null||qe||!Ln||ln.length<2,cr=St?di:di.slice(0,1),kt=($e==null?void 0:$e.status)==="pending"&&!$e.mine?$e:null,un=iu(ge,O,kt!==null),lr=!Tn&&!O&&B!==null&&me!=="account"&&(H?un.kind==="open":H===null&&ri),bt=(Is=ne==null?void 0:ne.waiting[0])!=null?Is:null,hs=!ne||ne.trusted||O||un.kind==="secured"?null:ne.refused?"This Spotify account refused backups from this install. Sign in to back up from it.":"This install isn't approved yet. Its backups are kept apart until you approve it from another install or sign in.",fi=(H?((Es=ge==null?void 0:ge.accounts)!=null?Es:[]).filter(r=>r.status==="final"):[]).map((r,l)=>({hash:r.hash,label:`Spotify account ${l+1}${r.device_info?` from ${r.device_info}`:""}`})).filter(r=>r.hash!==(ge==null?void 0:ge.hash)),ur=!!(Y&&h>0&&!ln.some(r=>r.payload_hash===Y));t(()=>(G().catch(()=>null).then(r=>Pe(l=>l!=null?l:r)),he({silent:!0}),gr(),Pa(Ue)),[]),t(()=>{if(Nn(null),!R||!Ke)return;[...Ke.values()].some(Ye)&&te(!0);let r=!0;return Xn(R.items,Ke).then(l=>{r&&(Nn(l),[...l.values()].some(Ye)&&te(!0))}),()=>{r=!1}},[R,Ke]),t(()=>{if(!L)return;let r=l=>{var Me;if(!((Me=Mn.current)!=null&&Me.isConnected)){ie(!1),pe(null);return}l.preventDefault(),l.stopImmediatePropagation();let M=sa(l);if(M.kind!=="ignore"){if(M.kind==="cancel"){ie(!1),pe(null);return}if(M.kind==="error"){pe(M.message);return}if(oa(M.shortcut)){pe(`${Rn(M.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}ie(!1),pi(M.shortcut)}};return window.addEventListener("keydown",r,!0),()=>window.removeEventListener("keydown",r,!0)},[L,o]);async function Ss(){let r=await Bt();return Ce(r.hash),S(r.installedItemCount),N(r.installedItems),_(r.items),z(r.spicetifyConfig),ve(r.activeTheme),Q(r.marketplaceAvailable),r}async function he(r){try{X(!1),(!(r!=null&&r.silent)||!w)&&y("loading"),r!=null&&r.silent||g({kind:"info",text:"Checking your Syncify backup\u2026"}),await Ss();let l,M=null;try{l=await kn(o)}catch(Ze){if(!(Ze instanceof ke))throw Ze;l=wu,M=Ze.code}let Me=await G().catch(()=>null),Se=Me?await fa(o).catch(()=>null):null,W=Me?await G().catch(()=>null):null;w={remote:l,lockedBy:M,claims:W?Se:null},Pe(W),Ve(W?Se:null),ai(M),M&&In("account"),En(l.claim),m(null),ue(null),ee(l.payload),k(l.backups),$(l.safetyCopy),q(l.unapproved),Ne(l.install),Je(l.nudge),ce(l.payload),sn(!0),y(l.exists?"success":"idle"),!(r!=null&&r.silent)&&!M&&g(l.exists&&l.payload?{kind:"success",text:`Backup found from ${bn(l.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(l){Dn(l)}}async function wt(){_n(!0),rn(null);try{await pa(o)}catch(r){r instanceof We&&["claim_pending","claimed"].includes(r.code)||rn(r instanceof Error?r.message:String(r))}finally{await he({silent:!0}),_n(!1)}}function dr(){li(!0),H?wt():dn("account")}function yr(){Sa(),ft(!0)}t(()=>{!n.secure||Pn.current||le||!H||un.kind!=="open"||O||(Pn.current=!0,wt())},[H,un.kind,O,le]);function fr(r){Pe(r),Pn.current=!0,!O&&B?wt():he({silent:!0})}function ks(){Fa(null),K(null),is(void 0),se(void 0),Pe(null),Ve(null),rn(null),he({silent:!0})}async function pr(){An(!0);try{await Jt(o),Spicetify.showNotification("Syncify: claim sent for review"),await he({silent:!0})}catch(r){g({kind:"error",text:r instanceof Error?r.message:String(r)})}finally{An(!1)}}async function mr(r){if(X(!1),m(r),ue(null),!r){ce(B);return}ce(null);try{let l=await kn(o,r);ue(l),ce(l.payload)}catch(l){m(null),ce(B),Dn(l)}}async function gr(){let r=Ae.version;if(!ns(r))return;let l=await ja(Ae.releasesUrl);l&&ts(l,r)>0&&dt(l)}function hr(r){let l=C(p({},o),{autoBackupEnabled:r});c(l),Gt(l),g({kind:"success",text:r?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}function pi(r){let l=C(p({},o),{shortcut:r});c(l),Gt(l),Vi(r),pe(null),g({kind:"success",text:r?`${Rn(r)} now opens Syncify.`:"Keyboard shortcut turned off."})}function Sr(r){let l=C(p({},o),{entryPoint:r});c(l),Gt(l),Wt(r)}function dn(r){In(r),r!=="settings"&&ie(!1)}function kr(){pe(null),ie(!0)}async function br(){var r;try{X(!1),y("loading"),g({kind:"info",text:"Backing up your extensions and themes\u2026"});let{payload:l,unchanged:M,unapproved:Me}=await it(o);if(await Ss(),Me){await he({silent:!0}),g({kind:"warning",text:"Backed up, but kept apart until this install is approved."}),Spicetify.showNotification("Syncify: backed up, waiting for approval");return}if(M){sn(!0),y("success"),g({kind:"success",text:"Everything is already backed up."}),Spicetify.showNotification("Syncify: everything is already backed up");return}let Se=[l,...ae.filter(W=>W.payload_hash!==l.payload_hash)].slice(0,bu);w&&(w=C(p({},w),{remote:C(p({},w.remote),{exists:!0,payload:l,backups:Se,safetyCopy:((r=w.remote.safetyCopy)==null?void 0:r.payload_hash)===l.payload_hash?null:w.remote.safetyCopy})})),ee(l),k(Se),$(W=>(W==null?void 0:W.payload_hash)===l.payload_hash?null:W),ce(l),sn(!0),y("success"),g({kind:"success",text:`Backed up ${l.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(l){Dn(l)}}async function bs(r){if(bt){rt(!0);try{await Vt(o,bt.id,r),Spicetify.showNotification(r==="approve"?"Syncify: install approved":"Syncify: install refused"),await he({silent:!0})}catch(l){Dn(l)}finally{rt(!1)}}}function wr(r=A){if(J===!1){let l="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";g({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3);return}if(!r){let l="No Syncify cloud backup was found for this Spotify account.";g({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3);return}ce(r),te(!1),ct(new Set),X(!0)}async function xr(){let r=A?Yn(pt(A),A.spicetify_config,P,T).manual:[];try{X(!1),y("loading"),g({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:l,restoredCount:M}=await da(o,A!=null?A:void 0,u!=null?u:void 0,rr);ce(l),y("success"),g({kind:"success",text:`Restored ${M} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),Rt(r),setTimeout(()=>window.location.reload(),1e3)}catch(l){Dn(l)}}async function vr(r){await Ra(r)&&(Ge(!0),setTimeout(()=>Ge(!1),2e3))}function Xe(r){if(r.startsWith("mailto:")){window.location.href=r;return}window.open(r,"_blank","noopener,noreferrer")}function Dn(r){if(y("error"),r instanceof Hn){ut(!0),g(null);return}if(r instanceof nn){g({kind:"error",text:r.message}),he({silent:!0});return}if(r instanceof ke&&r.code!=="not_linked"){g(null),he({silent:!0});return}let l=r instanceof Error?r.message:String(r);g({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3)}function mi(r,l){var Ms,Ls;let M=(A==null?void 0:A.payload_hash)===r.payload_hash,Me=r.payload_hash===Y,Se=bn(r.metadata.last_sync_datetime),W=Va(ar(r)),Ze=(Ls=(Ms=r.backup)==null?void 0:Ms.name)!=null?Ls:null;return e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":M,"data-selected":M?"true":"false",type:"button",key:`${r.payload_hash}-${r.metadata.last_sync_datetime}`,title:l!=null&&l.isSafetyCopy?"Kept aside and updated about once a week, so a burst of new backups can't replace it":l!=null&&l.isUnapproved?"From an install this Spotify account hasn't approved":void 0,onClick:()=>{ce(r),X(!1)},disabled:de},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),l!=null&&l.isSafetyCopy?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Safety copy",e.createElement("span",{className:"syncify-backup-note"},e.createElement(xn,null),"updated weekly")),e.createElement("span",{className:"syncify-muted"},e.createElement(De,{parts:[Ze,Se,W]}))):l!=null&&l.isUnapproved?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Not approved",e.createElement("span",{className:"syncify-backup-note"},e.createElement(xn,null),Se)),e.createElement("span",{className:"syncify-muted"},e.createElement(De,{parts:[W,`from ${r.metadata.device_info}`]}))):Ze?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,Ze),e.createElement("span",{className:"syncify-muted syncify-backup-date"},e.createElement(De,{parts:[Se,W,`from ${r.metadata.device_info}`]}))):e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-backup-date"},Se),e.createElement("span",{className:"syncify-muted"},e.createElement(De,{parts:[W,`from ${r.metadata.device_info}`]}))),Me?e.createElement("span",{className:"syncify-tag",title:"What's on this device now"},"Current"):null,l!=null&&l.isSafetyCopy?e.createElement(qa,null):null,l!=null&&l.isUnapproved?e.createElement(ls,null):null)}function gi(r){r.stopPropagation()}let Cr=Z?"Update Syncify to keep backing up":O?"Sign in to restore":Ie?B?ms?"Changes since your last backup":"Everything is backed up":"No backup yet":d==="error"?"Couldn't check your backup":"Checking your backup\u2026",hi=Z?"Your backups are safe":O?O==="not_owner"?"Secured by another account":"This backup is secured":Ie?B?ms?vu(B,or(B),E,T):`Last backup ${bn(B.metadata.last_sync_datetime)}`:"Save your extensions and themes so you can restore them after a reinstall or on another computer.":null,ws=!!(x&&!Z&&Date.now()-x.at<ku),On=!!(x&&x.loaded===x.total),Si=Oa((_s=x==null?void 0:x.manual)!=null?_s:[]);return e.createElement("div",{className:"syncify-panel",ref:Mn,onClick:gi,onMouseDown:gi,onPointerDown:gi},Z?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,"This version of Syncify is no longer supported."),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Xe(`${Ae.githubUrl}#updating`)},"How to update")):null,kt?e.createElement("div",{className:"syncify-alert",role:"alert"},e.createElement("span",null,(Ts=kt.email)!=null?Ts:"Someone"," is claiming this backup.",H===null?" If that's you, sign in to finish.":kt.held?" Syncify is reviewing it.":null),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{pr()},disabled:cn},"Not me"),H===null?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>dn("account")},"That's me, sign in"):null)):null,bt?e.createElement("div",{className:"syncify-alert",role:"alert"},e.createElement("span",null,es(bt)),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{bs("reject")},disabled:re},"Not mine"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{bs("approve")},disabled:re},"Approve"))):null,hs?e.createElement("div",{className:"syncify-alert",role:"status"},e.createElement("span",null,hs)):null,Si.length>0?e.createElement("div",{className:"syncify-alert syncify-manual",role:"status"},e.createElement("span",{className:"syncify-manual-header"},e.createElement("span",null,x.manual.length===1?"1 isn't from Marketplace. Add it in a terminal:":`${x.manual.length} aren't from Marketplace. Add them in a terminal:`),e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:Aa},e.createElement(rs,null))),e.createElement("span",{className:"syncify-code"},e.createElement("code",null,Si.join(`
`)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{vr(Si.join(`
`))}},lt?"Copied":"Copy"))):null,ht?e.createElement("div",{className:"syncify-alert","data-kind":ht.kind},e.createElement("span",null,ht.text),e.createElement("span",{className:"syncify-alert-actions"},ht.kind==="error"?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{he()},disabled:de},"Try again"):null,e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>g(null)},e.createElement(rs,null)))):null,e.createElement("section",{className:"syncify-status","aria-live":"polite"},ws&&x?e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},x.kind==="share"?On?"Setup loaded":`Loaded ${x.loaded} of ${x.total}`:On?"Backup restored":`Restored ${x.loaded} of ${x.total}`),e.createElement("p",{className:"syncify-muted"},On?x.total===0?"Nothing from Marketplace to load":`${x.loaded} of ${x.total} loaded`:"Missing something? Reload Spotify once more."),On&&x.kind==="restore"?e.createElement("p",{className:"syncify-muted"},"Syncify saved your setup?"," ",e.createElement("button",{className:"syncify-text-button syncify-inline-button",type:"button",onClick:()=>Xe(Ae.kofiUrl)},"Support it on Ko-fi")):null):e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},Cr),e.createElement("p",{className:"syncify-muted"},e.createElement(De,{parts:[...Array.isArray(hi)?hi:[hi],`${Va(h)} on this device`]}))),ws&&!On?e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:Ma},"Reload"):e.createElement("button",{className:"syncify-button",type:"button",onClick:br,disabled:de||Ln||Z||O!==null,title:O?"Sign in to back up":Ln?"No changes since your last backup":void 0},de?"Working\u2026":Ln?"Backed up":"Back up now")),lr?e.createElement("div",{className:"syncify-nudge",role:"region","aria-label":"Secure your backup"},e.createElement(qa,null),e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it")),e.createElement("span",{className:"syncify-nudge-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:yr,disabled:le},"Not now"),e.createElement("button",{className:"syncify-button",type:"button",onClick:dr,disabled:le||de},le?"Securing\u2026":"Secure"))):null,!Ie||O||ae.length>0||j.length>0||fi.length>0?e.createElement("section",{className:"syncify-section","aria-label":"Backups"},e.createElement("div",{className:"syncify-section-header"},e.createElement("h4",{className:"syncify-section-title"},"Backups"),e.createElement("span",{className:"syncify-section-controls"},!u&&Ln&&ln.length>1?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":qe,"aria-controls":"syncify-backup-list",onClick:()=>{an(!qe),X(!1)}},qe?"Show less":`Show all ${ln.length}`,e.createElement(wn,null)):null,!O&&fi.length>0?e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select","aria-label":"Show backups from",value:u!=null?u:"",onChange:r=>{mr(r.currentTarget.value||null)},disabled:de},e.createElement("option",{value:""},"This Spotify account"),fi.map(r=>e.createElement("option",{key:r.hash,value:r.hash},r.label))),e.createElement(wn,null)):null)),Ie?O?e.createElement("p",{className:"syncify-locked"},e.createElement(Su,null),e.createElement("span",null,O==="not_owner"?"Sign in with the account that secured them":"Sign in to see and restore your backups")):u&&!b?e.createElement("p",{className:"syncify-muted"},"Loading backups\u2026"):di.length===0&&ui.length===0?e.createElement("p",{className:"syncify-muted"},"No backups yet."):e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-list",id:"syncify-backup-list",role:"radiogroup","aria-label":"Choose a backup to restore"},cr.map(r=>mi(r)),St&&us?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),mi(us,{isSafetyCopy:!0})):null,St&&ui.length>0?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),ui.map(r=>mi(r,{isUnapproved:!0}))):null),St?J===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to restore a backup."):on?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},"Restore"," ",A?(As=(Ps=A.backup)==null?void 0:Ps.name)!=null?As:bn(A.metadata.last_sync_datetime):"this backup","?"),gt?e.createElement("div",{className:"syncify-alert"},"An install this Spotify account hasn't approved made this backup. Its items stay off unless you turn them on."):null,R?e.createElement(Xa,{preview:R,checks:mt,off:ys,allowed:Cn,unapproved:gt,onAllow:(r,l)=>{let M=new Set(Cn);l?M.add(r):M.delete(r),ct(M)},expanded:F,onToggle:()=>te(!F)}):null,e.createElement("div",{className:"syncify-actions"},ur?e.createElement("div",{className:"syncify-alert syncify-actions-hint"},"Your current setup isn't backed up."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>X(!1),disabled:de},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:xr,disabled:de||fs},fs?"Checking\u2026":"Restore"))):e.createElement("div",{className:"syncify-actions"},gs?e.createElement("span",{className:"syncify-muted syncify-actions-hint"},"This backup is already current."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>wr(),disabled:de||!A||gs},"Restore backup")):null):e.createElement("div",{className:"syncify-backup-skeleton","aria-hidden":"true"},e.createElement("span",{className:"syncify-radio"}),e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-skeleton-line"}),e.createElement("span",{className:"syncify-skeleton-line wide"})))):null,e.createElement("div",{className:"syncify-accordion"},e.createElement(ss,{id:"share",title:"Share",openSection:me,onToggle:dn,status:H&&Te?{kind:"count",label:`${Te} ${Te===1?"code":"codes"}`,text:String(Te)}:null},e.createElement(au,{config:o,session:H,localItems:P,localConfig:T,localTheme:ze,marketplaceAvailable:J,busy:de,onSignIn:()=>dn("account"),onSignedOut:ks,onCodeCount:r=>{Fa(r),K(r)},onHandle:r=>{is(r),se(r)}})),e.createElement(ss,{id:"account",title:"Account",openSection:me,onToggle:dn,status:mu(H,O,un)},e.createElement(su,{session:H,locked:O,secure:un,securing:le,secureError:yt,onSecure:()=>{wt()},nudge:ci,onSignedIn:fr,onSignedOut:ks,onOpenWebsite:Xe,handle:Be,onHandle:r=>{is(r),se(r)}})),e.createElement(ss,{id:"settings",title:"Settings",openSection:me,onToggle:dn,status:_e?{kind:"dot",label:`Syncify ${_e} is out`}:null},e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Back up automatically"),e.createElement("span",{className:"syncify-muted"},"When Spotify starts and something has changed")),e.createElement("input",{className:"syncify-switch",type:"checkbox",role:"switch",checked:o.autoBackupEnabled&&!Z,onChange:r=>hr(r.currentTarget.checked),disabled:de||Z})),e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Open Syncify from"),yi?o.entryPoint==="menu"&&!o.shortcut?e.createElement("span",{className:"syncify-muted"},"Keep a shortcut in case a Spotify update breaks the menu"):null:e.createElement("span",{className:"syncify-muted"},"The profile menu isn't available in this Spicetify version")),e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select",value:yi?o.entryPoint:"topbar",onChange:r=>Sr(r.currentTarget.value),disabled:!yi},xu.map(r=>e.createElement("option",{key:r.value,value:r.value},r.label))),e.createElement(wn,null))),e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Keyboard shortcut"),L&&!Oe?e.createElement("span",{className:"syncify-muted"},"Press a key combination, or Esc to cancel"):null),e.createElement("span",{className:"syncify-shortcut"},o.shortcut&&!L?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>pi(null)},"Turn off"):null,!o.shortcut&&!L?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>pi(Sn)},"Use default"):null,e.createElement("button",{className:"syncify-key",type:"button","data-recording":L?"true":"false",onClick:()=>L?ie(!1):kr(),title:"Click to change"},L?"Press keys\u2026":o.shortcut?Rn(o.shortcut):"Off"))),Oe?e.createElement("div",{className:"syncify-alert",role:"alert"},Oe):null)),e.createElement("footer",{className:"syncify-footer"},e.createElement("span",{className:"syncify-footer-version"},e.createElement("span",null,"Syncify ",Ae.version),_e?e.createElement("button",{className:"syncify-text-button syncify-update",type:"button",onClick:()=>ps?window.location.reload():Xe(`${Ae.githubUrl}#updating`)},e.createElement(De,{parts:[`${_e} is out`,ps?"Reload":"How to update"]})):null),e.createElement("span",{className:"syncify-footer-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Xe(Ae.issueUrl)},"Report an issue"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Xe(Ae.githubUrl)},"GitHub"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Xe(Ae.kofiUrl)},"Support on Ko-fi"))))}var Ya={added:{mark:"+",label:"Added"},removed:{mark:"\u2212",label:"Removed"},unchanged:{mark:"=",label:"Unchanged"}},Ja=[["extension","Extensions"],["theme","Themes"],["snippet","Snippets"]],nu={extension:"extension",custom_app:"custom app",theme:"theme"};function Xa(n){let e=Spicetify.React,{items:t,counts:i,manual:s,theme:a}=n.preview,o=[...n.off].filter(c=>!n.allowed.has(c)).length;return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-chips","aria-label":"What changes on this device"},i.added?e.createElement("span",{className:"syncify-chip","data-change":"added"},"+",i.added," added"):null,i.removed?e.createElement("span",{className:"syncify-chip","data-change":"removed"},"\u2212",i.removed," removed"):null,i.unchanged?e.createElement("span",{className:"syncify-chip"},i.unchanged," unchanged"):null,s.length?e.createElement("span",{className:"syncify-chip"},s.length," to add manually"):null,a&&(!n.off.has(a.key)||n.allowed.has(a.key))?e.createElement("span",{className:"syncify-chip"},"Switches your theme to ",a.name):null,o?e.createElement("span",{className:"syncify-chip","data-change":"off"},o," off"):null),t.length||s.length?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":n.expanded,"aria-controls":"syncify-restore-changes",onClick:n.onToggle},n.expanded?"Hide changes":"Show changes",e.createElement(wn,null)):null,n.expanded?e.createElement("div",{className:"syncify-changes",id:"syncify-restore-changes"},Ja.map(([c,d])=>{let y=t.filter(f=>f.type===c);return y.length===0?null:e.createElement("section",{key:c,"aria-label":d},e.createElement("h5",{className:"syncify-change-group"},d),e.createElement("ul",{className:"syncify-change-list"},y.map(f=>{var g,h;return e.createElement("li",{className:"syncify-change",key:f.key},e.createElement("span",{className:"syncify-mark","data-change":f.change,role:"img","aria-label":Ya[f.change].label},Ya[f.change].mark),e.createElement("span",{className:"syncify-change-name"},f.name,f.repo?e.createElement("span",{className:"syncify-change-detail"},e.createElement(xn,null),f.repo):null),n.checks.has(f.key)?e.createElement(Za,{check:n.checks.get(f.key)}):n.unapproved&&n.off.has(f.key)?e.createElement("span",{className:"syncify-source","data-warning":"true"},e.createElement(ls,null),"Not approved"):null,n.off.has(f.key)&&!((g=n.fixed)!=null&&g.has(f.key))?e.createElement("label",{className:"syncify-item-switch"},e.createElement("input",{type:"checkbox",checked:n.allowed.has(f.key),onChange:S=>n.onAllow(f.key,S.currentTarget.checked)}),(h=n.switchLabel)!=null?h:"Restore"):null)})))}),s.length?e.createElement("section",{"aria-label":"Add manually"},e.createElement("h5",{className:"syncify-change-group"},"Add manually"),e.createElement("ul",{className:"syncify-change-list"},s.map(c=>e.createElement("li",{className:"syncify-change",key:`${c.type}:${c.name}`},e.createElement("span",{className:"syncify-mark","aria-hidden":"true"}),e.createElement("span",{className:"syncify-change-name"},c.name,e.createElement("span",{className:"syncify-change-detail"},e.createElement(xn,null),nu[c.type],c.scheme?`, ${c.scheme}`:"")))))):null):null)}var tu={host:"Loads from outside GitHub",repo:"Its code is in a different repo than the one it names",blocked:"On Marketplace's block list",catalog:"Not in Marketplace's catalog",unchecked:"GitHub couldn't be reached to check it",custom:"A snippet made in Marketplace, not from its list"};function Za(n){let e=Spicetify.React,{check:t}=n,i=Ye(t),s=t.kind==="host"?`Code from ${t.host}`:t.kind==="repo"?`Code from ${t.repo}`:t.kind==="blocked"?"Blocked by Marketplace":t.kind==="catalog"?"Not in Marketplace":t.kind==="unchecked"?"Not checked":"Custom";return e.createElement("span",{className:"syncify-source","data-warning":i?"true":"false",title:tu[t.kind]},i?e.createElement(ls,null):null,s)}function iu(n,e,t){var o,c;if(e==="not_owner")return{kind:"other-account"};if(!n)return t?{kind:"other-claim"}:{kind:"unknown"};let{claim:i}=n;if((i==null?void 0:i.status)==="final"){if(!i.mine)return{kind:"other-account"};let d=((o=n.accounts)!=null?o:[]).filter(y=>y.status==="final").length;return{kind:"secured",linkedCount:Math.max(d,1)}}if((i==null?void 0:i.status)==="pending")return i.mine?{kind:"pending",finalAt:i.final_at,held:i.held,waiting:i.waiting===!0}:{kind:"other-claim"};let s=((c=n.accounts)!=null?c:[]).filter(d=>d.hash===n.hash),a=s[s.length-1];return(a==null?void 0:a.status)==="cancelled"&&a.cancelled_by==="owner"?{kind:"cancelled"}:{kind:"open"}}function su(n){let e=Spicetify.React,t=e.useEffect,i=e.useState,{session:s,secure:a}=n,[o,c]=i(()=>_t()),[d,y]=i(()=>_t().email),[f,g]=i(""),[h,S]=i(!1),[E,N]=i(null),[P,_]=i(()=>Date.now()),{handle:T,onHandle:z}=n;t(()=>{if(!s||T!==void 0)return;let k=!0;return ji().then(I=>{var $,j;k&&z((j=($=I.profile)==null?void 0:$.handle)!=null?j:null)}).catch(()=>{}),()=>{k=!1}},[s,T]);let ze=!!(o.codeSentAt&&P-o.codeSentAt<du),ve=Math.max(0,Math.ceil((o.retryAt-P)/1e3)),J=o.retryEmail===null||o.retryEmail===d.trim().toLowerCase()?ve:0;t(()=>{if(!s)return;let k=!0;return Qs().then(I=>{!k||I||(N({kind:"warning",text:en(new v("signed_out"))}),n.onSignedOut())}).catch(()=>{}),()=>{k=!1}},[s==null?void 0:s.token]),t(()=>{if(o.retryAt<=Date.now())return;let k=setInterval(()=>{_(Date.now()),o.retryAt<=Date.now()&&clearInterval(k)},1e3);return()=>clearInterval(k)},[o.retryAt]);function Q(k){let I=p(p({},_t()),k);Gs(I),c(I),_(Date.now())}async function Y(k){var $;let I=k.trim();if(!fu.test(I)){N({kind:"error",text:"Enter a valid email address."});return}S(!0),N(null);try{let j=await Zs(I,{nudge:n.nudge});Q({email:I,codeSentAt:Date.now(),retryAt:Date.now()+j*1e3,retryEmail:I.toLowerCase()}),g("")}catch(j){let q=j instanceof v?j:null,ne=($=q==null?void 0:q.retryAfter)!=null?$:null,Ne=ne&&ne<=yu?Date.now()+ne*1e3:0,re=(q==null?void 0:q.code)==="too_many_requests"?null:I.toLowerCase();if((q==null?void 0:q.code)==="resend_wait"){Q({email:I,codeSentAt:o.email===I&&o.codeSentAt?o.codeSentAt:Date.now(),retryAt:Ne,retryEmail:re});return}Ne&&Q({retryAt:Ne,retryEmail:re}),N({kind:"error",text:en(j)})}finally{S(!1)}}async function Ce(){S(!0),N(null);try{let k=await Rs(o.email,f);Q({codeSentAt:null}),g(""),n.onSignedIn(k)}catch(k){N({kind:"error",text:en(k)});let I=k instanceof v?k.code:null;(I==="too_many_attempts"||I==="code_expired")&&g("")}finally{S(!1)}}async function B(){var I;let k=(I=s==null?void 0:s.email)!=null?I:"";S(!0),N(null),await eo(),Q({email:k,codeSentAt:null}),y(k),S(!1),n.onSignedOut()}async function ee(){S(!0),N(null);try{n.onOpenWebsite(await no())}catch(k){let I=k instanceof v&&k.code==="signed_out";N({kind:I?"warning":"error",text:en(k)}),I&&n.onSignedOut()}finally{S(!1)}}let ae=E?e.createElement("div",{className:"syncify-alert","data-kind":E.kind==="error"?"error":void 0,role:"alert"},E.text):null;if(s===void 0)return null;if(s){let k=a.kind==="open"||a.kind==="other-claim"||a.kind==="cancelled";return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",{className:"syncify-account-email"},s.email),a.kind==="secured"?e.createElement("span",{className:"syncify-muted"},e.createElement(De,{parts:["Backup secured",a.linkedCount===1?"1 Spotify account linked":`${a.linkedCount} Spotify accounts linked`]})):a.kind==="pending"?e.createElement("span",{className:"syncify-muted syncify-account-state"},e.createElement(Qa,null),e.createElement("span",null,e.createElement(De,{parts:["Securing this backup",a.waiting?"waiting on sign-in":a.held?"in review":`final ${cs(a.finalAt)}`]}))):a.kind==="other-account"?e.createElement("span",{className:"syncify-muted"},"This backup is secured by another account"):e.createElement("span",{className:"syncify-muted"},"Signed in")),e.createElement("span",{className:"syncify-account-actions"},e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-label":"Manage on the website",onClick:()=>{ee()},disabled:h},"Manage",e.createElement(Ga,null)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{B()},disabled:h},"Sign out"))),T?e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"@",T),e.createElement("span",{className:"syncify-muted"},"Your handle")),e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-label":"Open your profile",onClick:()=>n.onOpenWebsite(Fi(T))},"Profile",e.createElement(Ga,null))):null,k?e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it")),e.createElement("button",{className:"syncify-button",type:"button",onClick:n.onSecure,disabled:h||n.securing||a.kind==="other-claim"},n.securing?"Securing\u2026":a.kind==="cancelled"?"Secure again":"Secure")):null,a.kind==="other-claim"?e.createElement("div",{className:"syncify-alert",role:"status"},"Another claim is pending. If it isn't yours, press Not me above and Syncify will review it."):a.kind==="cancelled"?e.createElement("div",{className:"syncify-alert",role:"status"},"Your claim was cancelled from this Spotify account."):a.kind==="pending"&&a.waiting?e.createElement("div",{className:"syncify-alert",role:"status"},"Syncify ran on this Spotify account without you signed in, maybe after a Spotify update or on another computer. Sign in to Syncify there to finish linking."):null,n.secureError?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},n.secureError):null,ae)}return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting"},n.locked?e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Sign in to restore"),e.createElement("span",{className:"syncify-muted"},"With the email that secured this backup")):e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it"))),e.createElement("form",{className:"syncify-confirm",noValidate:!0,onSubmit:k=>{k.preventDefault(),!h&&(ze?f.length===ni&&Ce():J||Y(d))}},ze?e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-muted"},"Code sent to ",pu(o.email)),e.createElement("div",{className:"syncify-field"},e.createElement("input",{className:"syncify-input syncify-code-input",type:"text",inputMode:"numeric",autoComplete:"one-time-code","aria-label":"6-digit code",placeholder:"123456",maxLength:ni,value:f,onChange:k=>g(k.currentTarget.value.replace(/\D/g,"").slice(0,ni)),autoFocus:!0}),e.createElement("button",{className:"syncify-button",type:"submit",disabled:h||f.length!==ni},h?"Verifying\u2026":"Verify")),e.createElement("p",{className:"syncify-muted syncify-account-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Y(o.email)},disabled:h||ve>0},ve>0?`Resend in ${za(ve)}`:"Resend code"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Q({codeSentAt:null}),g(""),N(null)},disabled:h},"Use another email"))):e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-field"},e.createElement("input",{className:"syncify-input",type:"email",autoComplete:"email","aria-label":"Email",placeholder:"you@example.com",value:d,onChange:k=>y(k.currentTarget.value),autoFocus:!0}),e.createElement("button",{className:"syncify-button",type:"submit",disabled:h||J>0||!d.trim()},h?"Sending\u2026":"Send code")),e.createElement("p",{className:"syncify-muted"},J>0?`Send another code in ${za(J)}`:"We only email sign-in codes.")),ae))}var ou=[["add","Add to my setup"],["replace","Replace my setup"]];function au(n){var An;let e=Spicetify.React,t=e.useEffect,i=e.useMemo,s=e.useRef,a=e.useState,{session:o}=n,[c,d]=a(""),[y,f]=a(!1),[g,h]=a(null),[S,E]=a(null),[N,P]=a(null),[_,T]=a(null),[z,ze]=a("add"),[ve,J]=a(!1),[Q,Y]=a(()=>new Set),[Ce,B]=a(null),[ee,ae]=a(void 0),[k,I]=a(!1),[$,j]=a(null),[q,ne]=a(0),Ne=s(!1),[re,rt]=a(null),[Cn,ct]=a(null),[A,ce]=a(null),[Ie,sn]=a(""),[on,X]=a(null),[F,te]=a(null),[Ee,Nn]=a(""),[L,ie]=a(null),[Oe,pe]=a(!1),[me,In]=a(!1),[qe,an]=a(null),[x,Ue]=a(null),[lt,Ge]=a(null),[Z,ut]=a(!1),[_e,dt]=a(null),Te=s(0),K=i(()=>S?Fo(S.file,S.items,n.localItems,n.localConfig,n.localTheme,z):null,[S,n.localItems,n.localConfig,n.localTheme,z]),Be=i(()=>{if(!K||!S)return null;let u=new Set(S.items.map(m=>m.key));return K.items.filter(m=>m.change!=="removed"&&u.has(m.key)&&(z==="replace"||m.isNew))},[K,S,z]),se=i(()=>Be?Jn(Be):null,[Be]),H=i(()=>new Map([...Ce!=null?Ce:[],...se!=null?se:[]]),[Ce,se]),Pe=i(()=>K&&ee!==void 0?Yo(K,ee):new Set,[K,ee]),O=i(()=>{var u;return new Set([...((u=K==null?void 0:K.items)!=null?u:[]).filter(m=>{var b;return m.change!=="removed"&&m.isNew&&(Ye(H.get(m.key))||((b=H.get(m.key))==null?void 0:b.kind)==="unchecked")}).map(m=>m.key),...Pe])},[K,H,Pe]),ai=[...O].filter(u=>Pe.has(u)||!Q.has(u)),$e=K!==null&&(Ce===null||ee===void 0),En=L?L.items.filter(u=>!L.leftOut.has(u.key)):[],ge=!!($&&re!==null&&$.length>=re),Ve=F!==null&&F.code===null&&!Cn,le=Ve?Bo(Ie):null,[_n,yt]=a(null);t(()=>{if(!le){yt(null);return}let u=window.setTimeout(()=>yt(le),Rl);return()=>window.clearTimeout(u)},[le]),t(()=>{if(B(null),!Be||!se)return;[...se.values()].some(Ye)&&J(!0);let u=!0;return Xn(Be,se).then(m=>{u&&(B(m),[...m.values()].some(Ye)&&J(!0))}),()=>{u=!1}},[Be,se]),t(()=>{Jo().then(P)},[]),t(()=>{j(null),te(null),Ue(null),Ne.current=!1,o&&Je()},[o==null?void 0:o.token]);async function rn(u){let m=u!=null?u:$o(c);if(h(null),E(null),!m){h(jt(new v("no_code")));return}f(!0),T(u!=null?u:null);try{let b=await Vo(m);ze("add"),Y(new Set),J(!1),E({file:b,items:V(b.keys),pick:u!==void 0}),Ki().then(ae)}catch(b){h(jt(b))}finally{f(!1),T(null)}}async function ri(){if(!(!S||!K)){I(!0),h(null);try{await ya(n.config,S.file,z,ai,ee!=null?ee:null,S.pick),Spicetify.showNotification("Syncify: setup loaded. Reloading\u2026"),Rt(K.manual,"share"),setTimeout(()=>window.location.reload(),1e3)}catch(u){I(!1),h(u instanceof tt?`${u.message} ${cu(u.reason)}`:u instanceof Error?u.message:String(u))}}}async function Je(){var u,m;X(null);try{let b=await ji();j(b.codes),Ne.current||(Ne.current=!0,ne(b.newHearts)),n.onCodeCount(b.codes.length),rt(b.max),ct(b.profile),n.onHandle((m=(u=b.profile)==null?void 0:u.handle)!=null?m:null),ce(b.suggestedHandle)}catch(b){Tn(b,X)}}function Tn(u,m){m(jt(u,re)),u instanceof v&&u.code==="signed_out"&&n.onSignedOut()}async function ft(u){var b;let m=++Te.current;te({code:u}),Nn((b=u==null?void 0:u.name)!=null?b:""),sn(A!=null?A:""),ie(null),pe(!1),an(null),Ue(null),Ge(null);try{let ue=await ye(),Mn=await Ho(V(ue),ue);if(m!==Te.current)return;ie(p({keys:ue},Mn)),Mn.leftOut.size>0&&pe(!0)}catch(ue){if(m!==Te.current)return;te(null),an(ue instanceof Error?ue.message:String(ue))}}function ci(){Te.current+=1,te(null),ie(null)}async function li(){if(!F||!L)return;In(!0),an(null);let u=jo(L.keys,En);try{let m=F.code?await qo(F.code.code,Ee.trim(),u):await zo(Ee.trim(),u,Ve?Ie.trim():void 0);Ue(C(p({},m),{outcome:F.code?"updated":"created"})),te(null),ie(null),await Je()}catch(m){if(m instanceof v&&m.code==="same_setup"&&m.share){Ue(C(p({},m.share),{leftOut:0,outcome:"existing"})),te(null),ie(null);return}Tn(m,an),m instanceof v&&m.code==="publish_failed"&&(te(null),Je())}finally{In(!1)}}async function Pn(u){ut(!0),X(null);try{await Go(u),Ge(null),(x==null?void 0:x.code)===u&&Ue(null),await Je()}catch(m){Tn(m,X)}finally{ut(!1)}}async function cn(u,m){await Ra(u)&&(dt(m),setTimeout(()=>dt(b=>b===m?null:b),2e3))}return e.createElement(e.Fragment,null,e.createElement("form",{className:"syncify-field syncify-share-load",noValidate:!0,onSubmit:u=>{u.preventDefault(),!y&&!k&&c.trim()&&rn()}},e.createElement("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-input"},"Load a setup"),e.createElement("input",{className:"syncify-input syncify-share-input",id:"syncify-share-input",type:"text",placeholder:"Paste a code or a link",autoComplete:"off",spellCheck:!1,value:c,onChange:u=>d(u.currentTarget.value),disabled:k}),e.createElement("button",{className:"syncify-button secondary",type:"submit",disabled:y||k||!c.trim()},y?"Loading\u2026":"Preview")),g?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},g):null,S&&K?e.createElement("div",{className:"syncify-confirm"},e.createElement("span",{className:"syncify-share-title"},e.createElement("p",{className:"syncify-confirm-title"},"Load ",(An=S.file.name)!=null?An:be(S.file.code),"?"),S.file.creator?e.createElement("button",{className:"syncify-text-button",type:"button",title:"Open their profile",onClick:()=>window.open(Fi(S.file.creator),"_blank","noopener,noreferrer")},"by @",S.file.creator):null),e.createElement("div",{className:"syncify-share-modes",role:"radiogroup","aria-label":"How to load it"},ou.map(([u,m])=>e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":z===u,"data-selected":z===u?"true":"false",type:"button",key:u,onClick:()=>ze(u),disabled:k},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,m))))),e.createElement(Xa,{preview:K,checks:H,off:O,fixed:Pe,switchLabel:"Load",allowed:Q,unapproved:!1,onAllow:(u,m)=>{let b=new Set(Q);m?b.add(u):b.delete(u),Y(b)},expanded:ve,onToggle:()=>J(!ve)}),n.marketplaceAvailable===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to load a setup."):e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>E(null),disabled:k},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{ri()},disabled:k||$e||n.busy},k?"Applying\u2026":$e?"Checking\u2026":"Apply"))):null,N?e.createElement("section",{className:"syncify-share-part","aria-label":N.length>0?"Syncify picks":"Discover"},N.length>0?e.createElement("h5",{className:"syncify-change-group"},"Syncify picks"):null,e.createElement("ul",{className:"syncify-change-list syncify-share-codes"},N.map(u=>e.createElement("li",{className:"syncify-setting",key:u.code},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",{className:"syncify-account-email"},u.name),e.createElement("span",{className:"syncify-muted syncify-pick-detail"},e.createElement(uu,{pick:u}),ei(u.extensions+u.themes+u.snippets,"item"))),e.createElement("button",{className:"syncify-text-button",type:"button",disabled:y||k,onClick:()=>{rn(u.code)}},_===u.code?"Loading\u2026":"Preview"))),e.createElement("li",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Find more setups"),e.createElement("span",{className:"syncify-muted"},"People's setups on Discover")),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>window.open(`${D().webUrl.replace(/\/+$/,"")}/discover`,"_blank","noopener,noreferrer")},"Open Discover")))):null,o===void 0?null:o?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting syncify-share-part"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Share this setup"),e.createElement("span",{className:"syncify-muted"},$&&$.length>0&&re!==null?lu(re-$.length):"Get a code anyone can load")),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{ft(null)},disabled:F!==null||$===null||ge||n.marketplaceAvailable===!1,title:ge?"Delete a code to make another":void 0},"Share")),F?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},F.code?`Update ${be(F.code.code)} with this setup?`:"Share this setup?"),L?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-chips","aria-label":"What goes in"},e.createElement("span",{className:"syncify-chip"},En.length," going in"),L.leftOut.size?e.createElement("span",{className:"syncify-chip","data-change":"off"},L.leftOut.size," left out"):null),L.items.length?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":Oe,"aria-controls":"syncify-share-items",onClick:()=>pe(!Oe)},Oe?"Hide items":"Show items",e.createElement(wn,null)):null,Oe?e.createElement(ru,{items:L.items,leftOut:L.leftOut}):null,e.createElement("div",{className:"syncify-share-fields"},e.createElement("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-name"},"Setup name"),e.createElement("input",{id:"syncify-share-name",className:"syncify-input",type:"text",placeholder:"Optional",maxLength:Oo,value:Ee,onChange:u=>Nn(u.currentTarget.value),disabled:me}),Ve?e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-muted syncify-share-handle-note"},"It's your first time creating a share code. Pick a handle for your profile:"),e.createElement("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-handle"},"Your handle"),e.createElement("span",{className:"syncify-input syncify-handle-input"},e.createElement("span",{"aria-hidden":"true"},"@"),e.createElement("input",{id:"syncify-share-handle",type:"text",placeholder:"handle",autoComplete:"off",spellCheck:!1,maxLength:Hi,value:Ie,onChange:u=>sn(u.currentTarget.value.replace(/^@/,"")),disabled:me})),Ie&&_n?e.createElement("span",{className:"syncify-share-handle-problem",role:"alert"},_n):null):null)):e.createElement("p",{className:"syncify-muted"},"Checking your items\u2026"),e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:ci,disabled:me},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{li()},disabled:!L||En.length===0||me||Ve&&le!==null},L?me?F.code?"Updating\u2026":"Creating\u2026":F.code?"Update":"Create code":"Checking\u2026"))):null,qe?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},qe):null,x?e.createElement("div",{className:"syncify-confirm"},e.createElement("span",{className:"syncify-manual-header"},e.createElement("span",{className:"syncify-confirm-title"},x.outcome==="existing"?"You already shared this setup":x.outcome==="updated"?"Code updated":"Your code is ready"),e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>Ue(null)},e.createElement(rs,null))),e.createElement("span",{className:"syncify-code syncify-share-code"},e.createElement("code",null,be(x.code)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{cn(be(x.code),"saved-code")}},_e==="saved-code"?"Copied":"Copy"),x.link?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{cn(x.link,"saved-link")}},_e==="saved-link"?"Copied":"Get link"):null),x.leftOut?e.createElement("p",{className:"syncify-muted"},x.leftOut===1?"1 snippet isn't in Marketplace's list anymore, so it was left out.":`${x.leftOut} snippets aren't in Marketplace's list anymore, so they were left out.`):null):null,on?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,on),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Je()}},"Try again"))):null,$&&$.length>0?e.createElement("section",{"aria-label":"Your codes"},e.createElement("h5",{className:"syncify-change-group syncify-codes-heading"},"Your codes",q>0?e.createElement("span",{className:"syncify-tag","data-tone":"new"},ei(q,"new heart")):null),e.createElement("ul",{className:"syncify-change-list syncify-share-codes"},$.map(u=>{var m;return e.createElement("li",{className:"syncify-setting",key:u.code},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",{className:"syncify-account-email"},(m=u.name)!=null?m:be(u.code)),e.createElement("span",{className:"syncify-muted"},lt===u.code?u.posted?"Delete it? Its link stops working and its post comes off Discover.":"Delete it? Its link stops working.":e.createElement(De,{parts:[u.name?be(u.code):null,ei(u.item_count,"item"),`Used by ${u.imports}`,u.hearts===null?null:ei(u.hearts,"heart")]}))),e.createElement("span",{className:"syncify-account-actions"},lt===u.code?e.createElement(e.Fragment,null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Ge(null),disabled:Z},"Cancel"),e.createElement("button",{className:"syncify-text-button","data-danger":"true",type:"button",onClick:()=>{Pn(u.code)},disabled:Z},Z?"Deleting\u2026":"Delete")):e.createElement(e.Fragment,null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{ft(u)},disabled:F!==null||Z},"Update"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{cn(be(u.code),`code:${u.code}`)}},_e===`code:${u.code}`?"Copied":"Copy"),u.link?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{cn(u.link,`link:${u.code}`)}},_e===`link:${u.code}`?"Copied":"Get link"):null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Ge(u.code),disabled:Z},"Delete"))))}))):null):e.createElement("div",{className:"syncify-setting syncify-share-part"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Share this setup"),e.createElement("span",{className:"syncify-muted"},"Get a code anyone can load")),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:n.onSignIn},"Sign in to share")))}var Wa={in:{mark:"+",label:"Goes in"},out:{mark:"\u2212",label:"Left out"}};function ru(n){let e=Spicetify.React;return e.createElement("div",{className:"syncify-changes",id:"syncify-share-items"},Ja.map(([t,i])=>{let s=n.items.filter(a=>a.type===t).sort((a,o)=>a.name.localeCompare(o.name));return s.length===0?null:e.createElement("section",{key:t,"aria-label":i},e.createElement("h5",{className:"syncify-change-group"},i),e.createElement("ul",{className:"syncify-change-list"},s.map(a=>{let o=n.leftOut.get(a.key),c=o?Wa.out:Wa.in;return e.createElement("li",{className:"syncify-change",key:a.key},e.createElement("span",{className:"syncify-mark","data-change":o?"removed":"added",role:"img","aria-label":c.label},c.mark),e.createElement("span",{className:"syncify-change-name"},a.name,a.repo?e.createElement("span",{className:"syncify-change-detail"},e.createElement(xn,null),a.repo):null),o?e.createElement(Za,{check:o}):null)})))}))}function cu(n){return n instanceof ke?"Sign in to back up.":n instanceof Error?n.message:String(n)}async function Ra(n){var e;try{return await navigator.clipboard.writeText(n),!0}catch(t){let i=(e=Spicetify.Platform)==null?void 0:e.ClipboardAPI;return i!=null&&i.copy?(await i.copy(n),!0):!1}}function lu(n){return n<=0?"No codes left, delete one to make another":`${n} ${n===1?"code":"codes"} left`}var Qt=12;function xn(){let n=Spicetify.React;return n.createElement(n.Fragment,null,n.createElement("span",{className:"syncify-sep","aria-hidden":"true"}),n.createElement("span",{className:"syncify-sr-only"},", "))}function De(n){let e=Spicetify.React,t=n.parts.filter(i=>!!i);return e.createElement("span",{className:"syncify-parts"},t.map((i,s)=>e.createElement(e.Fragment,{key:s},s>0?e.createElement(xn,null):null,i)))}function uu(n){let e=Spicetify.React,{extensions:t,themes:i,snippets:s}=n.pick,a=[...Array(Math.min(t,Qt)).fill("extension"),...Array(Math.min(i,Qt)).fill("theme"),...Array(Math.min(s,Qt)).fill("snippet")].slice(0,Qt);return e.createElement("span",{className:"syncify-pips","aria-hidden":"true"},a.map((o,c)=>e.createElement("span",{className:"syncify-pip","data-kind":o,key:c})))}function ei(n,e){return`${n} ${e}${n===1?"":"s"}`}var ni=6,du=600*1e3,yu=300,fu=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function pu(n){let e=n.lastIndexOf("@");return e<1?n:`${n[0]}***${n.slice(e)}`}function cs(n){let e=bn(new Date(n).toISOString());return e.startsWith("today")?e:`on ${e}`}function za(n){return`${Math.floor(n/60)}:${String(n%60).padStart(2,"0")}`}function ss(n){let e=Spicetify.React,t=n.openSection===n.id,i=`syncify-section-${n.id}`;return e.createElement("section",{className:"syncify-accordion-section","aria-label":n.title},e.createElement("button",{className:"syncify-accordion-header",type:"button","aria-expanded":t,"aria-controls":i,onClick:()=>n.onToggle(t?null:n.id)},e.createElement("span",{className:"syncify-accordion-title"},n.title),!t&&n.status?e.createElement("span",{className:"syncify-accordion-status","data-kind":n.status.kind,role:"img","aria-label":n.status.label,title:n.status.label},n.status.kind==="ok"?e.createElement(gu,null):n.status.kind==="warning"?e.createElement(hu,null):n.status.kind==="pending"?e.createElement(Qa,null):n.status.kind==="count"?n.status.text:null):null,e.createElement(wn,null)),t?e.createElement("div",{className:"syncify-accordion-body",id:i},n.children):null)}function qa(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-shield",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"}))}function ls(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-warning-icon",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M12 3 2 21h20z"}),n.createElement("path",{d:"M12 10v5"}),n.createElement("path",{d:"M12 18h.01"}))}function mu(n,e,t){return e?{kind:"warning",label:"Sign in to see your backups"}:n?t.kind==="secured"?{kind:"ok",label:"Signed in, backup secured"}:t.kind==="pending"?{kind:"pending",label:"Linking this Spotify account"}:t.kind==="open"||t.kind==="cancelled"?{kind:"warning",label:"Backup not secured yet"}:{kind:"ok",label:"Signed in"}:null}function gu(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"10"}),n.createElement("path",{d:"m9 12 2 2 4-4"}))}function hu(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"10"}),n.createElement("path",{d:"M12 8v4"}),n.createElement("path",{d:"M12 16h.01"}))}function wn(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-chevron",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"m9 6 6 6-6 6"}))}function Su(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-lock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("rect",{x:"5",y:"11",width:"14",height:"10",rx:"2"}),n.createElement("path",{d:"M8 11V7a4 4 0 0 1 8 0v4"}))}function Qa(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-clock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"9"}),n.createElement("path",{d:"M12 7v5l3 2"}))}function Ga(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-external",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M14 4h6v6"}),n.createElement("path",{d:"M20 4 10 14"}),n.createElement("path",{d:"M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"}))}function rs(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M18 6 6 18"}),n.createElement("path",{d:"m6 6 12 12"}))}var ku=600*1e3,bu=3,wu={exists:!1,payload:null,backups:[],safetyCopy:null,claim:null,unapproved:[],install:null,nudge:!1},xu=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function vu(n,e,t,i){var E;let s=new Set(e),a=new Set(t),o=t.filter(N=>!s.has(N)).length,c=e.filter(N=>!a.has(N)).length,d=(E=n.spicetify_config)!=null?E:null,y=!!(i&&!d),f=!y&&(i&&d?!po(i,d):i!==d),g=[o?`${o} added`:null,c?`${c} removed`:null,f?"Spicetify config changed":null].filter(Boolean),h=bn(n.metadata.last_sync_datetime),S=g.length?`${g.join(", ")} since ${h}`:`Last backup ${h}`;return y?[S,"Spicetify config not saved yet"]:[S]}function Va(n){return n===1?"1 extension or theme":`${n} extensions and themes`}function bn(n){let e=new Date(n);if(Number.isNaN(e.getTime()))return n;let t=e.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),i=new Date,s=new Date(i);return s.setDate(i.getDate()-1),e.toDateString()===i.toDateString()?`today, ${t}`:e.toDateString()===s.toDateString()?`yesterday, ${t}`:`${e.toLocaleDateString(void 0,{month:"short",day:"numeric",year:e.getFullYear()===i.getFullYear()?void 0:"numeric"})}, ${t}`}function er(n){var y;let e=Spicetify.React,t=e.useState,{claim:i}=n,[s,a]=t(!1),[o,c]=t(null);async function d(){a(!0),c(null);try{await Jt(fe()),Spicetify.showNotification("Syncify: claim sent for review"),n.onClose()}catch(f){c(f instanceof Error?f.message:String(f)),a(!1)}}return e.createElement("div",{className:"syncify-panel"},e.createElement("p",{className:"syncify-claim-notice"},(y=i.email)!=null?y:"Someone"," is claiming this backup."," ",n.signedIn?i.held?"Syncify is reviewing it.":`It goes through ${cs(i.final_at)} unless you stop it.`:"If that's you, sign in to finish."),o?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},o):null,e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:n.onClose,disabled:s},"Close"),e.createElement("button",{className:n.signedIn?"syncify-button":"syncify-button secondary",type:"button",onClick:()=>{d()},disabled:s},"Not me"),n.signedIn?null:e.createElement("button",{className:"syncify-button",type:"button",onClick:n.onSignIn,disabled:s},"That's me, sign in")))}function nr(n){let e=Spicetify.React;return e.createElement("div",{className:"syncify-panel"},e.createElement("p",{className:"syncify-claim-notice"},"Your backup isn't secured yet. Anyone who knows your Spotify username can restore it or claim it as theirs. Secure it with your email so only you can."),e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:n.onClose},"Not now"),e.createElement("button",{className:"syncify-button",type:"button",onClick:n.onSecure},"Secure")))}var ii="[Syncify]";function oe(n,e){if(e===void 0){console.debug(ii,n);return}console.debug(ii,n,e)}function at(n,e){if(e===void 0){console.warn(ii,n);return}console.warn(ii,n,e)}function Cu(){var n;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((n=Spicetify==null?void 0:Spicetify.Topbar)!=null&&n.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var ir="syncify-styles";function Nu(){if(document.getElementById(ir)){oe("Another copy of Syncify is running; stopping this one");return}Iu();let n=fe();la({topbarButton:Eu(),menuItem:Lu()}),Wt(n.entryPoint),Gi(n.shortcut,oi),Ca({onClaim:e=>{Uu(e)},onInstall:Bu,onNudge:$u}).catch(e=>{at("Startup sync check failed",e)}),Da().catch(e=>{at("Restore check failed",e)})}function Iu(){let n=document.createElement("style");n.id=ir,n.textContent=Us,document.head.appendChild(n)}function Eu(){let{extensionName:n}=D(),e=new Spicetify.Topbar.Button(n,ki,t=>{oe("Topbar button clicked",si(t)),oi()},!1,!0);return sr(e),Pu(e),Ou(e),oe("Topbar button registered",si(e)),e}function sr(n){var t;let e=n;n.element.style.setProperty("-webkit-app-region","no-drag"),(t=e.button)==null||t.style.setProperty("-webkit-app-region","no-drag")}var tr=".main-actionButtons",_u=".Root__globalNav, .Root__top-bar",Tu=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function Pu(n){if(typeof MutationObserver=="undefined")return;let e=!1,t=null,i=()=>{e=!1,a();let o=n.element,c=document.querySelector(tr);!o||!c||c.contains(o)||(c.prepend(o),Au(n),sr(n),oe("Topbar button re-attached",si(n)))},s=new MutationObserver(()=>{e||(e=!0,setTimeout(i,250))}),a=()=>{var d;if(t!=null&&t.isConnected)return;let o=document.querySelector(tr),c=(d=o==null?void 0:o.closest(_u))!=null?d:o==null?void 0:o.parentElement;if(s.disconnect(),t=c!=null?c:null,!c){s.observe(document.body,{childList:!0,subtree:!0});return}s.observe(c,{childList:!0,subtree:!0});for(let y=c.parentElement;y;y=y.parentElement)s.observe(y,{childList:!0})};i()}function Au(n){let e=Mu(n);if(!e||e.className&&e.className!=="undefined")return;let t=Array.from(document.querySelectorAll(Tu)).find(i=>!n.element.contains(i));t!=null&&t.className&&(e.className=t.className)}function Mu(n){return n.button}function Lu(){var n;if(typeof((n=Spicetify.Menu)==null?void 0:n.Item)!="function")return null;try{return new Spicetify.Menu.Item(D().extensionName,!1,()=>oi(),Du())}catch(e){return at("Failed to create profile menu item",e),null}}function Du(){return ki.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function Ou(n){Object.assign(window,{SyncifyDebug:{button:n,element:n.element,openModal:oi,inspect:()=>si(n),clickElement:()=>{var e;return(e=n.element)==null?void 0:e.click()},clickInnerButton:()=>{var e;return(e=n.button)==null?void 0:e.click()},clickCallback:()=>n.onClick(n)}})}function si(n){var e,t,i,s,a;return{label:n.label,disabled:n.disabled,isRight:n.isRight,hasElement:!!n.element,elementConnected:(e=n.element)==null?void 0:e.isConnected,elementDisabled:(t=n.element)==null?void 0:t.disabled,elementAriaDisabled:(i=n.element)==null?void 0:i.getAttribute("aria-disabled"),elementClass:(s=n.element)==null?void 0:s.className,appRegion:n.element?getComputedStyle(n.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:n.button?getComputedStyle(n.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:n.element?getComputedStyle(n.element).pointerEvents:null,visibility:n.element?getComputedStyle(n.element).visibility:null,display:n.element?getComputedStyle(n.element).display:null,rect:(a=n.element)==null?void 0:a.getBoundingClientRect().toJSON()}}var U=null;function oi(){if(U!=null&&U.container.isConnected){oe("Closing modal"),Spicetify.PopupModal.hide();return}oe("Opening modal"),vn(Spicetify.React.createElement(ti))}async function Uu(n){let e=await G().catch(()=>null);U!=null&&U.container.isConnected||(oe("Opening claim notice"),vn(Spicetify.React.createElement(er,{claim:n,signedIn:e!==null,onSignIn:()=>vn(Spicetify.React.createElement(ti,{section:"account"})),onClose:()=>Spicetify.PopupModal.hide()})))}function Bu(n){if(U!=null&&U.container.isConnected)return;oe("Opening install notice");let e=()=>Spicetify.PopupModal.hide();vn(Spicetify.React.createElement("div",{className:"syncify-panel"},Spicetify.React.createElement($a,{install:n,onDone:e,onClose:e})))}function $u(){U!=null&&U.container.isConnected||(oe("Opening nudge notice"),ba(),vn(Spicetify.React.createElement(nr,{onSecure:()=>vn(Spicetify.React.createElement(ti,{section:"account",secure:!0})),onClose:()=>Spicetify.PopupModal.hide()})))}function vn(n){var t;(t=U==null?void 0:U.root)==null||t.unmount();let e=document.createElement("div");U={container:e,root:null};try{Spicetify.PopupModal.display({title:D().extensionName,content:e,isLarge:!1})}catch(i){throw at("Failed to open PopupModal",i),i}Ku(e),ju(e,n)}function Ku(n){requestAnimationFrame(()=>{let e=Hu(n);e==null||e.classList.add("syncify-modal-shell");let t=e==null?void 0:e.querySelector(".main-trackCreditsModal-header h1");if(t&&!t.querySelector(".syncify-modal-mark")){let s=document.createElement("span");s.className="syncify-modal-mark",s.innerHTML=Bs,t.prepend(s)}let i=e==null?void 0:e.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');i&&(i.classList.add("syncify-modal-close"),i.setAttribute("aria-label",`Close ${D().extensionName}`),i.title="Close",i.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function Hu(n){let e=n.parentElement;for(;e&&e!==document.body;){if(e.querySelector(".main-trackCreditsModal-header"))return e;e=e.parentElement}return n.closest('[class*="trackCreditsModal"]')}function ju(n,e){try{if(typeof Spicetify.ReactDOM.createRoot=="function"){let t=Spicetify.ReactDOM.createRoot(n);t.render(e),(U==null?void 0:U.container)===n&&(U.root=t),oe("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(e,n),oe("Modal rendered",{renderer:"render"})}catch(t){throw at("Failed to render modal",t),t}}La();(function n(){if(!Cu()){setTimeout(n,100);return}oe("Spicetify APIs ready"),Nu()})();})();
