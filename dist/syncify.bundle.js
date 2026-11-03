// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var Ir=Object.defineProperty,_r=Object.defineProperties;var Er=Object.getOwnPropertyDescriptors;var Os=Object.getOwnPropertySymbols;var Pr=Object.prototype.hasOwnProperty,Tr=Object.prototype.propertyIsEnumerable;var Us=(n,e,t)=>e in n?Ir(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,p=(n,e)=>{for(var t in e||(e={}))Pr.call(e,t)&&Us(n,t,e[t]);if(Os)for(var t of Os(e))Tr.call(e,t)&&Us(n,t,e[t]);return n},N=(n,e)=>_r(n,Er(e));var Bs=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var $s=`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="-2.5 -2.5 37 37" aria-hidden="true" focusable="false"><defs><mask id="syncify-mark-gap" maskUnits="userSpaceOnUse" x="-2" y="-2" width="36" height="36"><rect x="-2" y="-2" width="36" height="36" fill="#fff"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></mask></defs><g mask="url(#syncify-mark-gap)"><g transform="rotate(15 16 16)"><path d="M16 16L16 7.4A8.6 8.6 0 0 1 24.6 16Z" fill="#6cd1d1" transform="translate(0.42 -0.42)"/><path d="M16 16L24.6 16A8.6 8.6 0 0 1 16 24.6Z" fill="#efa4c1" transform="translate(0.42 0.42)"/><path d="M16 16L16 24.6A8.6 8.6 0 0 1 7.4 16Z" fill="#d3c48c" transform="translate(-0.42 0.42)"/><path d="M16 16L7.4 16A8.6 8.6 0 0 1 16 7.4Z" fill="#88bcf2" transform="translate(-0.42 -0.42)"/></g></g><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 28.03A12.4 12.4 0 1 1 28.03 19"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91"/></g></svg>
`;var Dr="syncify",yn="state";function bi(){let n;try{n=window.indexedDB}catch(e){return Promise.resolve(null)}return n?new Promise(e=>{let t;try{t=n.open(Dr,1)}catch(i){e(null);return}t.onupgradeneeded=()=>{t.result.createObjectStore(yn)},t.onerror=()=>e(null),t.onblocked=()=>e(null),t.onsuccess=()=>e(t.result)}):Promise.resolve(null)}function wi(n,e){let t=bi().then(i=>new Promise((s,a)=>{if(!i){a(new Error("IndexedDB isn't available."));return}try{let o=i.transaction(yn,n),c=e(o.objectStore(yn));o.oncomplete=()=>{i.close(),s(c.result)},o.onerror=o.onabort=()=>{var d;i.close(),a((d=o.error)!=null?d:new Error("IndexedDB failed."))}}catch(o){i.close(),a(o)}}));return Promise.race([t,new Promise((i,s)=>setTimeout(()=>s(new Error("IndexedDB took too long.")),2e3))])}function fn(n){return wi("readonly",e=>e.get(n))}async function pn(n,e){await wi("readwrite",t=>t.put(e,n))}async function Ks(n){await wi("readwrite",e=>e.delete(n))}var be={extensionName:"Syncify",version:"1.16.0",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",discordUrl:"https://syncify.wsoltani.com/discord",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com",shareUrl:"https://syncs.wsoltani.com"};function D(){var e,t,i,s,a,o,c,d,y,f;let n=window.SyncifyConfig;return{extensionName:(e=De(n==null?void 0:n.extensionName))!=null?e:be.extensionName,version:(t=Hs(n==null?void 0:n.version))!=null?t:be.version,workerUrl:(i=De(n==null?void 0:n.workerUrl))!=null?i:be.workerUrl,webUrl:(s=De(n==null?void 0:n.webUrl))!=null?s:be.webUrl,githubUrl:(a=De(n==null?void 0:n.githubUrl))!=null?a:be.githubUrl,kofiUrl:(o=De(n==null?void 0:n.kofiUrl))!=null?o:be.kofiUrl,discordUrl:(c=De(n==null?void 0:n.discordUrl))!=null?c:be.discordUrl,issueUrl:(d=De(n==null?void 0:n.issueUrl))!=null?d:be.issueUrl,releasesUrl:(y=De(n==null?void 0:n.releasesUrl))!=null?y:be.releasesUrl,shareUrl:(f=De(n==null?void 0:n.shareUrl))!=null?f:be.shareUrl}}function De(n){return Hs(n)}function Hs(n){return typeof n=="string"&&n.trim()?n.trim():null}var Or="x-syncify-version",Ur="x-syncify-install",Br="x-syncify-timezone",js="install-id",Fs="syncify:install-id",$r=2e3,xt=null;async function Ys(){let n={[Or]:D().version,[Ur]:(await xi()).id},e=jr();return e&&(n[Br]=e),n}function xi(){return xt!=null||(xt=Kr().catch(()=>({id:vt(),inDatabase:!1}))),xt}async function Kr(){let n=await Promise.race([Hr(),new Promise(e=>setTimeout(()=>e(null),$r))]);if(n)return{id:n,inDatabase:!0};try{let e=window.localStorage.getItem(Fs);if(e&&Ws(e))return{id:e,inDatabase:!1};let t=vt();return window.localStorage.setItem(Fs,t),{id:t,inDatabase:!1}}catch(e){return{id:vt(),inDatabase:!1}}}async function Hr(){let n=await bi();return n?new Promise(e=>{let t=null;try{let i=n.transaction(yn,"readwrite"),s=i.objectStore(yn),a=s.get(js);a.onsuccess=()=>{if(typeof a.result=="string"&&Ws(a.result)){t=a.result;return}t=vt(),s.put(t,js)},i.oncomplete=()=>{n.close(),e(t)},i.onerror=i.onabort=()=>{n.close(),e(null)}}catch(i){n.close(),e(null)}}):null}function vt(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let n=crypto.getRandomValues(new Uint8Array(16));n[6]=n[6]&15|64,n[8]=n[8]&63|128;let e=[...n].map(t=>t.toString(16).padStart(2,"0"));return[e.slice(0,4).join(""),e.slice(4,6).join(""),e.slice(6,8).join(""),e.slice(8,10).join(""),e.slice(10).join("")].join("-")}function Ws(n){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(n)}function jr(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(n){return null}}var Fr="syncify-signature-v1",Yr={name:"ECDSA",hash:"SHA-256"};function Ct(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function Nt(n){return vi(new Uint8Array(await crypto.subtle.exportKey("raw",n)))}async function On(n,e,t,i,s){let a=await Wr(e,t,i,s),o=await crypto.subtle.sign(Yr,n,a);return vi(new Uint8Array(o))}async function Wr(n,e,t,i){let{pathname:s,search:a}=new URL(t),o=new TextEncoder,c=vi(new Uint8Array(await crypto.subtle.digest("SHA-256",o.encode(i))));return o.encode([Fr,n,e.toUpperCase(),s+a,c].join(`
`))}function vi(n){let e="";for(let t=0;t<n.length;t++)e+=String.fromCharCode(n[t]);return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var zs="device-key",Ci="session",qs="salt",Qe=null,Un,Gs={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function mn(n){if(Qe)return Qe;let e=await fn(zs);return zr(e)?(Qe=Promise.resolve(e),e):n?(Qe=Ct().then(async t=>(await pn(zs,t),t)),Qe.catch(()=>{Qe=null}),Qe):null}async function G(){let n=await fn(Ci);return qr(n)?n:null}function Ni(n){return pn(Ci,n)}async function Re(){await Ks(Ci).catch(()=>{})}async function It(){if(Un===void 0){let n=await fn(qs).catch(()=>{});Un=typeof n=="string"?n:null}return Un}async function _t(n){n!==Un&&(Un=n,await pn(qs,n).catch(()=>{}))}function Et(){return Gs}function Vs(n){Gs=n}function zr(n){let e=n;return!!(e&&e.privateKey instanceof CryptoKey&&e.publicKey instanceof CryptoKey)}function qr(n){let e=n;return!!(e&&typeof e.token=="string"&&e.token&&typeof e.email=="string")}var Js="install-key",gn=null;function Xs(){return gn!=null||(gn=Gr()),gn.catch(()=>{gn=null}),gn.catch(()=>null)}async function Gr(){if(!(await xi()).inDatabase)return null;let n=await fn(Js),e=Jr(n)?n:await Vr();return{privateKey:e.privateKey,publicKey:await Nt(e.publicKey)}}async function Vr(){let n=await Ct();return await pn(Js,n),n}function Jr(n){let e=n;return!!(e&&e.privateKey instanceof CryptoKey&&e.publicKey instanceof CryptoKey)}var Xr="/api/auth/email-otp/send-verification-otp",Zr="/api/auth/sign-in/email-otp",Qr="/api/auth/get-session",Rr="/api/auth/sign-out",ec="/api/auth/link",nc="x-syncify-device-key",tc="x-syncify-signature",Zs="x-syncify-salt",ic="none",sc={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again.",link_failed:"Couldn't open the website. Try again."},v=class extends Error{constructor(t,i=null,s=null){var a;super((a=sc[t])!=null?a:"Sign-in failed. Try again.");this.code=t;this.retryAfter=i;this.share=s;this.name="AccountError"}};function en(n){return n instanceof v?n.message:"Sign-in failed. Try again."}async function Qs(n,e={}){let t=await $n(Xr,{method:"POST",body:JSON.stringify(p({email:n,type:"sign-in"},e.nudge?{nudge:!0}:{}))});return typeof(t==null?void 0:t.resend_in)=="number"?t.resend_in:60}async function Rs(n,e){var a;let t=await mn(!0).catch(()=>{throw new v("no_device_key")}),i=await $n(Zr,{method:"POST",body:JSON.stringify({email:n,otp:e}),keys:t,sendPublicKey:!0});if(typeof(i==null?void 0:i.token)!="string"||!i.token)throw new v("sign_in_failed");let s={token:i.token,email:typeof((a=i.user)==null?void 0:a.email)=="string"?i.user.email:n};return await Ni(s).catch(()=>{throw new v("no_device_key")}),Ii=!0,s}var Ii=!1;async function eo(){var e;let n=await G();if(!n||Ii)return n;try{let t=await Pt(n,Qr,"GET");Ii=!0;let i=(e=t==null?void 0:t.user)==null?void 0:e.email;if(typeof i!="string"||i===n.email)return n;let s=N(p({},n),{email:i});return await Ni(s).catch(()=>{}),s}catch(t){if(t instanceof v&&t.code==="signed_out")return null;throw t}}async function no(){let n=await G().catch(()=>null);n&&await Pt(n,Rr,"POST").catch(()=>{}),await Re()}async function to(){let n=await G();if(!n)throw new v("signed_out");let e=await Pt(n,ec,"POST"),t=typeof(e==null?void 0:e.url)=="string"?e.url:"",i=new URL(D().webUrl).origin;if(!t.startsWith(`${i}/link#`))throw new v("link_failed");return t}async function Bn(n,e,t){let i=await G();if(!i)throw new v("signed_out");return Pt(i,n,e,t)}async function io(n,e,t){let i=await G().catch(()=>null),s=i?await mn(!1).catch(()=>null):null;await $n(n,p({method:"POST",body:JSON.stringify(e),headers:t,keepalive:!0},i&&s?{token:i.token,keys:s}:{}))}async function Pt(n,e,t,i){let s=await mn(!1);if(!s)throw await Re(),new v("signed_out");return $n(e,p({method:t,token:n.token,keys:s},i===void 0?{}:{body:JSON.stringify(i)}))}async function $n(n,e,t=!1){var g,h,S;let i=`${D().webUrl.replace(/\/+$/,"")}${n}`,s=p({},e.headers);if(e.body!==void 0&&(s["content-type"]="application/json"),e.token&&(s.authorization=`Bearer ${e.token}`),e.keys){let _=(g=await It())!=null?g:ic;s[Zs]=_,s[tc]=await On(e.keys.privateKey,_,e.method,i,(h=e.body)!=null?h:""),e.sendPublicKey&&(s[nc]=await Nt(e.keys.publicKey))}let a;try{a=await fetch(i,{method:e.method,headers:s,body:e.body,keepalive:e.keepalive})}catch(_){throw new v("offline")}let o=a.headers.get(Zs);o&&await _t(o);let c=await a.json().catch(()=>null);if(a.ok)return c;let d=typeof(c==null?void 0:c.code)=="string"?c.code:a.status===503?"unavailable":"failed";if(d==="stale_salt"&&e.keys&&!t)return $n(n,e,!0);d==="signed_out"&&await Re();let y=Number(a.headers.get("retry-after")),f=c==null?void 0:c.share;throw new v(d,Number.isFinite(y)&&y>0?y:(S=oc[d])!=null?S:null,typeof(f==null?void 0:f.code)=="string"?{code:f.code,link:typeof f.link=="string"?f.link:null}:null)}var oc={resend_wait:60,too_many_requests:60,send_failed:60};var ac="x-syncify-user-hash",rc="x-syncify-identity",cc="x-syncify-signature",lc="x-syncify-install-key",uc="x-syncify-install-signature",_i="x-syncify-salt",dc="none",yc="/restores",fc="/installs",pc="hash",so=3,Kn=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}},we=class extends Error{constructor(t){super(t==="not_linked"?"Couldn't read that Spotify account's backups.":"Sign in to restore this backup.");this.code=t;this.name="LockedError"}},nn=class extends Error{constructor(){super("This Spotify account doesn't accept backups from this install. Sign in to back up."),this.name="InstallRefusedError"}};async function ao(n,e,t){var a;let i=await Fe(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(t)});if(i.status===403&&((a=await i.json().catch(()=>null))==null?void 0:a.code)==="install_refused")throw new nn;if(!i.ok)throw new Error(`Backup failed with HTTP ${i.status}.`);let s=await i.json().catch(()=>null);return{unchanged:(s==null?void 0:s.unchanged)===!0,unapproved:(s==null?void 0:s.quarantined)===!0}}async function ro(n,e,t,i){let s=await Fe(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({install:t,action:i})},fc);if(s.ok)return;let a=await s.json().catch(()=>null);if((a==null?void 0:a.code)!=="not_pending")throw new Error(`Couldn't answer with HTTP ${s.status}.`)}async function Ei(n,e,t){var S,_,C,T;let i=await Fe(n,e,{method:"GET"},lo("/",t));if(i.status===404){let E=await i.json().catch(()=>null);return{exists:!1,payload:null,backups:[],safetyCopy:null,claim:Hn(E==null?void 0:E.claim),unapproved:[],install:oo(E==null?void 0:E.install),nudge:!1}}if(!i.ok)throw new Error(`Restore failed with HTTP ${i.status}.`);let s=await i.json(),a=Hn(s.claim),o=oo(s.install),c=s.nudge===!0;delete s.claim,delete s.install,delete s.nudge;let d=[s,...(S=s.backup_history)!=null?S:[]];if(!d.every(E=>E.backup))return{exists:!0,payload:s,backups:d.slice(0,so),safetyCopy:(_=d[so])!=null?_:null,claim:a,unapproved:[],install:o,nudge:c};let y=d.filter(E=>{var P;return((P=E.backup)==null?void 0:P.kind)==="rolling"}),f=(C=d.find(E=>{var P;return((P=E.backup)==null?void 0:P.kind)==="anchor"}))!=null?C:null,g=d.filter(E=>{var P;return((P=E.backup)==null?void 0:P.kind)==="quarantined"}),h=(T=y[0])!=null?T:f;return h?y.length===0&&f?{exists:!0,payload:h,backups:[f],safetyCopy:null,claim:a,unapproved:g,install:o,nudge:c}:{exists:!0,payload:h,backups:y,safetyCopy:f,claim:a,unapproved:g,install:o,nudge:c}:{exists:!1,payload:null,backups:[],safetyCopy:null,claim:a,unapproved:g,install:o,nudge:c}}async function co(n,e,t,i){try{await Fe(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:t}),keepalive:!0},lo(yc,i))}catch(s){}}async function Fe(n,e,t,i="",s=!1){var C,T,E,P,z;let a=i?`${n.replace(/\/+$/,"")}${i}`:n,o=(C=t.method)!=null?C:"GET",c=await G().catch(()=>null),d=c?await mn(!1).catch(()=>null):null,y=await Xs(),f={},g=(T=await It())!=null?T:dc;c&&d&&(f.authorization=`Bearer ${c.token}`,f[_i]=g,f[cc]=await On(d.privateKey,g,o,a,(E=t.body)!=null?E:"")),y&&(f[_i]=g,f[lc]=y.publicKey,f[uc]=await On(y.privateKey,g,o,a,(P=t.body)!=null?P:""));let h=await fetch(a,N(p({},t),{headers:p(N(p(p({},t.headers),await Ys()),{[ac]:e.hash,[rc]:e.field}),f)})),S=h.headers.get(_i);if(S&&await _t(S),h.status===426)throw new Kn;if(h.status!==401)return h;let _=(z=await h.clone().json().catch(()=>null))==null?void 0:z.code;if(!s){if(_==="stale_salt"&&(c||y))return Fe(n,e,t,i,!0);if(_==="signed_out"&&c)return await Re(),Fe(n,e,t,i,!0)}throw _==="claimed"||_==="not_owner"||_==="not_linked"?new we(_):(_==="signed_out"&&await Re(),new v(typeof _=="string"?_:"failed"))}function lo(n,e){return e?`${n}?${pc}=${encodeURIComponent(e)}`:n}function oo(n){let e=n;if(!e||typeof e.trust!="string")return null;let t=Array.isArray(e.waiting)?e.waiting:[];return{trusted:e.trust!=="pending"&&e.trust!=="rejected",refused:e.trust==="rejected",waiting:t.flatMap(i=>{let s=i;return s&&typeof s.id=="string"&&typeof s.first_seen_at=="number"?[{id:s.id,device:typeof s.device=="string"?s.device:null,first_seen_at:s.first_seen_at}]:[]})}}function Hn(n){let e=n;return!e||typeof e.mine!="boolean"?null:e.status==="final"?{status:"final",mine:e.mine}:e.status!=="pending"||typeof e.final_at!="number"?null:p({status:"pending",mine:e.mine,email:typeof e.email=="string"?e.email:null,final_at:e.final_at,held:e.held===!0},e.waiting===!0?{waiting:!0}:{})}async function Tt(n){let e=new TextEncoder().encode(n),t=await crypto.subtle.digest("SHA-256",e);return[...new Uint8Array(t)].map(i=>i.toString(16).padStart(2,"0")).join("")}function jn(n){return JSON.stringify(Pi(n))}function Pi(n){return Array.isArray(n)?n.map(Pi):n&&typeof n=="object"?Object.keys(n).sort().reduce((e,t)=>(e[t]=Pi(n[t]),e),{}):n}function uo(){let n=navigator.userAgent;return/Windows/i.test(n)?"Windows":/Mac OS|Macintosh/i.test(n)?"macOS":/Linux/i.test(n)?"Linux":n}var mc=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,gc=100,hc="marketplace:installed-extensions",Sc="marketplace:installed-themes",kc="marketplace:theme-installed",bc="marketplace:installed:",wc="marketplace";function Ai(n){return Spicetify.Config?Mi(Spicetify.Config,n):null}function Mi(n,e){var a;let t=Ye(n),i=new Set(xc(e)),s=((a=e[kc])==null?void 0:a.includes(bc))===!0;return{current_theme:s?wc:t.current_theme,color_scheme:s?"":t.color_scheme,extensions:t.extensions.filter(o=>!i.has(o)),custom_apps:t.custom_apps}}function Ye(n){let e=n&&typeof n=="object"?n:{};return{current_theme:Ti(e.current_theme)?e.current_theme:"",color_scheme:Ti(e.color_scheme)?e.color_scheme:"",extensions:yo(e.extensions),custom_apps:yo(e.custom_apps)}}function mo(n,e){return jn(Ye(n))===jn(Ye(e))}function yo(n){return Array.isArray(n)?[...new Set(n.filter(Ti))].sort().slice(0,gc):[]}function Ti(n){return typeof n=="string"&&mc.test(n)}function xc(n){let e=fo(n[hc]).map(i=>{var a;let s=(a=po(n[i]))==null?void 0:a.manifest;return s&&typeof s=="object"?s.main:void 0}),t=fo(n[Sc]).flatMap(i=>{var a;let s=(a=po(n[i]))==null?void 0:a.include;return Array.isArray(s)?s:[]});return[...e,...t].flatMap(i=>{let s=typeof i=="string"?i.split("/").pop():void 0;return s?[s]:[]})}function fo(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function po(n){try{let e=n?JSON.parse(n):null;return e&&typeof e=="object"&&!Array.isArray(e)?e:null}catch(e){return null}}var vc=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],Cc="marketplace:installed:",go=`${Cc}snippet:`,Nc="wsoltani/syncify",Ic="marketplace",ho={added:0,removed:1,unchanged:2};function V(n){let e=new Map;for(let[t,i]of vc)for(let s of Tc(n[t]))e.has(s)||e.set(s,Ec(s,i,n[s]));return[...e.values()]}function Fn(n,e,t,i){let s=new Set(n.map(d=>d.key)),a=new Map(t.map(d=>[d.key,d])),o=[...n.map(d=>{let y=a.get(d.key);return N(p({},d),{change:y?"unchanged":"added",isNew:!y||y.sources.join(" ")!==d.sources.join(" ")})}),...t.filter(d=>!s.has(d.key)).map(d=>N(p({},d),{change:Yn(d,n)?"unchanged":"removed",isNew:!1}))].sort((d,y)=>ho[d.change]-ho[y.change]||d.name.localeCompare(y.name)),c={added:0,removed:0,unchanged:0};for(let d of o)c[d.change]+=1;return{items:o,counts:c,manual:_c(e,i)}}function Yn(n,e){return n.type==="extension"&&Mt(n)&&!e.some(Mt)}function Mt(n){var e;return((e=n.repo)==null?void 0:e.toLowerCase())===Nc}function _c(n,e){if(!n)return[];let t=Ye(n),i=Ye(e),s=[...t.extensions.filter(o=>!i.extensions.includes(o)).map(o=>({type:"extension",name:o})),...t.custom_apps.filter(o=>!i.custom_apps.includes(o)).map(o=>({type:"custom_app",name:o}))],a=t.current_theme;return a&&a!==Ic&&(a!==i.current_theme||t.color_scheme!==i.color_scheme)&&s.push(p({type:"theme",name:a},t.color_scheme?{scheme:t.color_scheme}:{})),s}function Ec(n,e,t){var d,y;let i=So(t),s=So(i==null?void 0:i.manifest),a=At(i==null?void 0:i.user),o=At(i==null?void 0:i.repo),c=(y=(d=At(i==null?void 0:i.title))!=null?d:At(s==null?void 0:s.name))!=null?y:n.startsWith(go)?n.slice(go.length):n.split("/").pop()||n;return{key:n,type:e,name:c,repo:e!=="snippet"&&a&&o?`${a}/${o}`:null,sources:Pc(e,i),custom:e==="snippet"&&(i==null?void 0:i.custom)===!0}}function Pc(n,e){return e?(n==="extension"?[e.extensionURL]:n==="theme"?[e.cssURL,e.schemesURL,...Array.isArray(e.include)?e.include:[]]:[]).filter(i=>typeof i=="string"&&i!==""):[]}function At(n){return typeof n=="string"&&n.trim()?n.trim():null}function Tc(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function So(n){let e=n;if(typeof n=="string")try{e=JSON.parse(n)}catch(t){return null}return e&&typeof e=="object"&&!Array.isArray(e)?e:null}var Lt="spicetify-marketplace";var Wn="settings";async function ko(){let n=await xo();if(n.kind!=="ok")return null;try{let e=await vo(n.db,"readonly",i=>i.getAll());if(!e)return null;let t={};for(let i of e)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(t[i.key]=i.value);return t}finally{n.db.close()}}async function bo(n,e=[]){let t=await xo();if(t.kind==="unavailable")return"unavailable";let i=t.kind==="ok"?t.db:await Ac();if(!i)return"failed";try{return await vo(i,"readwrite",a=>{let o;for(let[c,d]of Object.entries(n))o=a.put({key:c,value:d});for(let c of e)o=a.delete(c);return o})===null?"failed":"written"}finally{i.close()}}function wo(){var n;try{return(n=window.indexedDB)!=null?n:null}catch(e){return null}}async function xo(){let n=wo();return n?await Mc(n)?{kind:"missing"}:new Promise(e=>{let t=!1,i=n.open(Lt);i.onupgradeneeded=()=>{t=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),e({kind:"unavailable"})},i.onblocked=()=>e({kind:"unavailable"}),i.onsuccess=()=>{let s=i.result;if(t){s.close(),Lc(n).then(()=>e({kind:"missing"}));return}if(!s.objectStoreNames.contains(Wn)){s.close(),e({kind:"unavailable"});return}e({kind:"ok",db:s})}}):{kind:"unavailable"}}function Ac(){let n=wo();return n?new Promise(e=>{let t=n.open(Lt,1);t.onupgradeneeded=()=>{let i=t.result;i.objectStoreNames.contains(Wn)||i.createObjectStore(Wn,{keyPath:"key"})},t.onerror=()=>{console.warn("Syncify could not create Marketplace storage",t.error),e(null)},t.onblocked=()=>e(null),t.onsuccess=()=>e(t.result)}):Promise.resolve(null)}async function Mc(n){if(typeof n.databases!="function")return!1;try{return!(await n.databases()).some(t=>t.name===Lt)}catch(e){return!1}}function Lc(n){return new Promise(e=>{let t=n.deleteDatabase(Lt);t.onsuccess=()=>e(),t.onerror=()=>e(),t.onblocked=()=>e()})}function vo(n,e,t){return new Promise(i=>{let s;try{s=n.transaction(Wn,e)}catch(y){console.warn("Syncify could not open a Marketplace transaction",y),i(null);return}let a,o=!1,c=y=>{o||(o=!0,i(y))};s.oncomplete=()=>c(a),s.onerror=()=>{console.warn("Syncify Marketplace transaction failed",s.error),c(null)},s.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",s.error),c(null)};let d;try{d=t(s.objectStore(Wn))}catch(y){console.warn("Syncify Marketplace request could not be issued",y),c(null);return}d&&(d.onsuccess=()=>{a=d.result},d.onerror=()=>{console.warn("Syncify Marketplace request failed",d.error),c(null)})})}var Li="marketplace:",Ot=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function ye(){let n=Fc(),e=await ko();if(e)for(let[t,i]of Object.entries(e))t.startsWith(Li)&&(n[t]=i);return n}var Oc=new Set(["marketplace:active-tab","marketplace:sort"]),Di="marketplace:installed:",Dt="marketplace:theme-installed",Uc=["stars","tags","lastUpdated","created"];async function Ut(n,e){let t={};for(let[i,s]of Object.entries(n))Oc.has(i)||(t[i]=i.startsWith(Di)?Bc(s):s);return e&&(t.spicetify_config=Ye(e)),Tt(jn(t))}function Bc(n){try{let e=JSON.parse(n);if(!e||typeof e!="object"||Array.isArray(e))return n;for(let t of Uc)delete e[t];return e}catch(e){return n}}async function Bt(){let n=await ye(),e=Ai(n);return{keyCount:Object.keys(n).length,hash:await Ut(n,e),installedItemCount:Hc(n),installedItems:$t(n),items:V(n),spicetifyConfig:e,marketplaceAvailable:jc(n),activeTheme:zn(n[Dt])}}function zn(n){if(!n)return null;if(n.startsWith(Di))return n;try{let e=JSON.parse(n);return typeof e=="string"?e:null}catch(e){return null}}async function Co(){let n=await ye(),e=Ai(n);return p({schema_version:2,metadata:{last_sync_datetime:new Date().toISOString(),device_info:uo(),marketplace_key_count:Object.keys(n).length},payload_hash:await Ut(n,e),marketplace_data:{keys:n}},e?{spicetify_config:e}:{})}async function No(n,e=[]){var a,o;let t={},i=(o=(a=n.marketplace_data)==null?void 0:a.keys)!=null?o:{};for(let[c,d]of Object.entries(i))c.startsWith(Li)&&(t[c]=d);if(Object.keys(t).length===0)return 0;await $c(t),e.length>0&&await Kc(t,e);let s=Ui(await ye(),t);return await Oi(t,s),Object.keys(t).length}async function Oi(n,e=[]){for(let[i,s]of Object.entries(n))window.localStorage.setItem(i,s);for(let i of e)window.localStorage.removeItem(i);if(await bo(n,e)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try again.")}function Ui(n,e){let t=new Set(Ot.flatMap(o=>{var c;return Kt((c=e[o])!=null?c:n[o]).map(String)})),i=$t(n).filter(o=>o.startsWith(Di)&&!t.has(o)),s=i.filter(o=>n[o]!==void 0&&e[o]===void 0),a=n[Dt];return a&&e[Dt]===void 0&&i.some(o=>a.includes(o))&&s.push(Dt),s}async function $c(n){let e=await ye(),t=V(n),i=V(e).filter(o=>Yn(o,t));if(i.length===0)return;let s="marketplace:installed-extensions",a=Kt(n[s]).map(String);for(let o of i)a.includes(o.key)||a.push(o.key),n[o.key]=e[o.key];n[s]=JSON.stringify(a)}async function Kc(n,e){let t=await ye(),i=$t(t);for(let s of Ot){if(n[s]===void 0)continue;let a=Kt(n[s]).map(String).filter(o=>!e.includes(o)||i.includes(o));n[s]=JSON.stringify(a)}for(let s of e)t[s]!==void 0?n[s]=t[s]:delete n[s]}function Hc(n){return $t(n).length}function $t(n){return Ot.flatMap(e=>Kt(n[e]).map(String))}function jc(n){return!!(window.Marketplace||Ot.some(t=>n[t]!==void 0)||n["marketplace:tabs"]!==void 0)}function Io(n,e){return e===0?!1:n===0?!0:n<Math.max(2,Math.floor(e*.5))}function Fc(){let n={};for(let e=0;e<window.localStorage.length;e+=1){let t=window.localStorage.key(e);if(!(t!=null&&t.startsWith(Li)))continue;let i=window.localStorage.getItem(t);i!==null&&(n[t]=i)}return n}function Kt(n){if(!n)return[];try{let e=JSON.parse(n);return Array.isArray(e)?e:[]}catch(e){return[]}}var Yc="raw.githubusercontent.com",Wc="cdn.jsdelivr.net",_o=".github.io";function $i(n){var t;if(n.protocol!=="https:")return null;let e=n.pathname.split("/").filter(Boolean);if(n.host===Yc)return Bi(e[0],e[1]);if(n.host===Wc)return e[0]==="gh"?Bi(e[1],(t=e[2])==null?void 0:t.split("@")[0]):null;if(n.host.endsWith(_o)){let i=n.host.slice(0,-_o.length);return i.includes(".")?null:Bi(i,e.length>1?e[0]:n.host)}return null}function Bi(n,e){return n&&e?`${n}/${e}`:null}var zc={extension:"spicetify-extensions",theme:"spicetify-themes"},qc="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",Gc="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",Vc="https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/",Jc="https://api.github.com/repos",Xc=5e3,Zc=20,Eo="syncify:repo-topics",Po=10080*60*1e3,Qc=200;function We(n){return(n==null?void 0:n.kind)==="host"||(n==null?void 0:n.kind)==="repo"||(n==null?void 0:n.kind)==="blocked"||(n==null?void 0:n.kind)==="catalog"}function Vn(n){let e=new Map;for(let t of n){if(t.change==="removed")continue;if(t.custom){e.set(t.key,{kind:"custom"});continue}let i=Rc(t);i&&e.set(t.key,i)}return e}async function Jn(n,e){let t=new Map,i=n.filter(o=>o.change!=="removed"&&o.isNew&&!e.has(o.key));if(i.length===0)return t;let s=i.filter(o=>o.type==="snippet"),a=i.filter(o=>o.type!=="snippet");if(s.length>0){let o=await Ki();for(let c of s)o?Ht(o,c.name)||t.set(c.key,{kind:"catalog"}):t.set(c.key,{kind:"unchecked"})}if(a.length>0){let o=await tl(),c=ol(),d=0;await Promise.all(a.map(async y=>{let f=el(y),g=zc[y.type];if(!f||!g)return;if(o===null){t.set(y.key,{kind:"unchecked"});return}if(nl(f,o)){t.set(y.key,{kind:"blocked"});return}let h=sl(c,f);h===void 0&&d<Zc&&(d+=1,h=await il(f),h!==void 0&&(c[f.toLowerCase()]={topics:h,at:Date.now()})),h===void 0?t.set(y.key,{kind:"unchecked"}):(h===null||!h.includes(g))&&t.set(y.key,{kind:"catalog"})})),al(c)}return t}function Rc(n){let e=null;for(let t of n.sources){let i;try{i=new URL(t)}catch(a){return{kind:"host",host:t.slice(0,40)}}let s=$i(i);if(!s)return{kind:"host",host:i.host};n.repo&&s.toLowerCase()!==n.repo.toLowerCase()&&(e!=null||(e=s))}return e?{kind:"repo",repo:e}:null}function el(n){for(let e of n.sources)try{let t=$i(new URL(e));if(t)return t}catch(t){}return n.repo}function nl(n,e){let t=`https://github.com/${n}`.toLowerCase();return e.some(i=>{let s=i.toLowerCase();if(!s.includes("*"))return s===t;let a=s.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${a}$`).test(t)})}function To(n){return n.replace(/\n/g,"").trim().toLowerCase()}function Ht(n,e){return n.get(To(e))}var qn=null,Gn=null;function tl(){return qn!=null||(qn=Ao(qc).then(n=>{let e=n==null?void 0:n.repos;return Array.isArray(e)?e.filter(t=>typeof t=="string"&&!t.startsWith("//")):(qn=null,null)})),qn}function Ki(){return Gn!=null||(Gn=Ao(Gc).then(n=>{if(!Array.isArray(n))return Gn=null,null;let e=new Map;for(let t of n){if(typeof(t==null?void 0:t.title)!="string"||typeof t.code!="string")continue;let i=typeof t.preview=="string"?t.preview:null;e.set(To(t.title),p({title:t.title,code:t.code,description:typeof t.description=="string"?t.description:""},i?{imageURL:i.startsWith("http")?i:`${Vc}${i}`}:{}))}return e})),Gn}async function il(n){let e=await Mo(`${Jc}/${n}`);if((e==null?void 0:e.status)===404)return null;if(!(e!=null&&e.ok))return;let t=await e.json().catch(()=>null);return Array.isArray(t==null?void 0:t.topics)?t.topics.filter(i=>typeof i=="string"):void 0}async function Ao(n){let e=await Mo(n);return e!=null&&e.ok?e.json().catch(()=>null):null}async function Mo(n){let e=typeof AbortController=="function"?new AbortController:null,t=setTimeout(()=>e==null?void 0:e.abort(),Xc);try{return await fetch(n,{signal:e==null?void 0:e.signal})}catch(i){return null}finally{clearTimeout(t)}}function sl(n,e){let t=n[e.toLowerCase()];return t&&Date.now()-t.at<Po?t.topics:void 0}function ol(){var n;try{let e=JSON.parse((n=localStorage.getItem(Eo))!=null?n:"{}");return e&&typeof e=="object"?e:{}}catch(e){return{}}}function al(n){let e=Date.now(),t=Object.entries(n).filter(([,i])=>e-i.at<Po).sort(([,i],[,s])=>s.at-i.at).slice(0,Qc);try{localStorage.setItem(Eo,JSON.stringify(Object.fromEntries(t)))}catch(i){}}var rl=/^[0-9A-HJKMNP-TV-Z]{6}$/,cl=6,ll="SYN-",Uo=60,Hi=20,Bo=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],ul="marketplace:installed:",Yd=`${ul}snippet:`,tn="marketplace:theme-installed",Lo="marketplace",Do={added:0,removed:1,unchanged:2},dl=new RegExp(`^[a-z0-9][a-z0-9_-]{1,${Hi-2}}[a-z0-9]$`);function $o(n){let e=n.trim().replace(/^@/,"").toLowerCase();return/[^a-z0-9_-]/.test(e)?"Only letters, digits, _ and -":e.length<3?"At least 3 characters":!/^[a-z0-9]/.test(e)||!/[a-z0-9]$/.test(e)?"Start and end with a letter or digit":null}function xe(n){return`${ll}${n}`}function Ko(n){let e=n.trim();if(e.length>200)return null;if(e.includes("/")){let i=e.split(/[?#]/)[0].replace(/\/+$/,"");e=i.slice(i.lastIndexOf("/")+1).replace(/\.json$/i,"")}e=e.toUpperCase().replace(/[\s-]/g,""),e.length===cl+3&&e.startsWith("SYN")&&(e=e.slice(3));let t=e.replace(/O/g,"0").replace(/[IL]/g,"1");return rl.test(t)?t:null}function Ho(n){let e=n;return!e||typeof e.code!="string"||!e.keys||typeof e.keys!="object"||!Object.values(e.keys).every(t=>typeof t=="string")?null:{code:e.code,name:typeof e.name=="string"&&e.name?e.name:null,creator:typeof e.creator=="string"&&dl.test(e.creator)?e.creator:null,updated_at:typeof e.updated_at=="number"?e.updated_at:0,keys:e.keys}}async function jo(n,e){let t=n.filter(o=>!Mt(o)).map(o=>N(p({},o),{change:"added",isNew:!0})),i=Vn(t);for(let o of t)!i.has(o.key)&&!yl(o,e[o.key])&&i.set(o.key,{kind:"catalog"});let s=await Jn(t,i),a=new Map;for(let[o,c]of[...s,...i])c.kind!=="unchecked"&&a.set(o,c);return{items:t,leftOut:a}}function yl(n,e){if(n.type==="snippet")return!0;if(!n.repo)return!1;let t=ml(e);return n.type==="extension"?typeof(t==null?void 0:t.extensionURL)=="string"&&t.extensionURL!=="":typeof(t==null?void 0:t.cssURL)=="string"&&t.cssURL!==""}function Fo(n,e){let t={};for(let[s,a]of Bo){let o=e.filter(c=>c.type===a&&n[c.key]!==void 0).map(c=>c.key);t[s]=JSON.stringify(o);for(let c of o)t[c]=n[c]}let i=zn(n[tn]);return i&&e.some(s=>s.key===i)&&(t[tn]=n[tn]),t}function Yo(n,e,t,i,s,a){let o=a==="replace"?Fn(e,void 0,t,i):fl(e,t),c=zn(n.keys[tn]),d=c!==null&&e.some(f=>f.key===c)&&i!==null&&i.current_theme!==Lo,y=c!==null&&c!==s?e.find(f=>f.key===c):void 0;return p(N(p({},o),{manual:d?[{type:"theme",name:Lo}]:[]}),y?{theme:{key:y.key,name:y.name}}:{})}function fl(n,e){let t=new Set(e.map(o=>o.key)),i=new Set(n.map(o=>o.key)),s=[...n.map(o=>t.has(o.key)?N(p({},o),{change:"unchanged",isNew:!1}):N(p({},o),{change:"added",isNew:!0})),...e.filter(o=>!i.has(o.key)).map(o=>N(p({},o),{change:"unchanged",isNew:!1}))].sort((o,c)=>Do[o.change]-Do[c.change]||o.name.localeCompare(c.name)),a={added:0,removed:0,unchanged:0};for(let o of s)a[o.change]+=1;return{items:s,counts:a,manual:[]}}function Wo(n,e){return new Set(n.items.filter(t=>t.type==="snippet"&&t.change==="added"&&(!e||!Ht(e,t.name))).map(t=>t.key))}async function zo(n,e,t,i){let s=await ye(),a=V(s),o=V(n.keys),c={};for(let[g,h]of Bo){let S=Oo(s[g]),C=[...e==="add"?S:S.filter(T=>t.includes(T)||a.some(E=>E.key===T&&Yn(E,o)))];for(let T of o){if(T.type!==h||t.includes(T.key))continue;let E=S.includes(T.key);if(e==="add"&&E)continue;let P=h==="snippet"?pl(T,i,s[T.key]):n.keys[T.key];P!==void 0&&(c[T.key]=P,C.includes(T.key)||C.push(T.key))}c[g]=JSON.stringify(C)}let d=zn(n.keys[tn]),y=Oo(c["marketplace:installed-themes"]);d&&y.includes(d)&&!t.includes(d)&&(c[tn]=n.keys[tn]);let f=Ui(s,c);return await Oi(c,f),Object.keys(c).length+f.length}function pl(n,e,t){let i=e?Ht(e,n.name):void 0;return i?JSON.stringify(p({code:i.code,title:i.title,description:i.description},i.imageURL?{imageURL:i.imageURL}:{})):t}function Oo(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function ml(n){try{let e=n?JSON.parse(n):null;return e&&typeof e=="object"&&!Array.isArray(e)?e:null}catch(e){return null}}var Xn="/api/shares",gl=`${Xn}/update`,hl=`${Xn}/delete`,Sl=`${Xn}/import`,kl="x-syncify-user-hash",bl="discover/presets.json",wl={no_code:"This code doesn't exist.",too_many_codes:"You can't make more share codes. Delete one to make another.",daily_limit:"Too many changes to share codes today. Try again tomorrow.",too_large:"This setup is too big to share.",invalid_name:"Names can be up to 60 characters.",empty:"There's nothing to share yet. Install something from Marketplace first.",invalid_items:"Syncify couldn't read some items. Reload Spotify and try again.",source:"Some items don't load from GitHub. Reload Spotify and try again.",blocked:"Some items are on Marketplace's block list. Reload Spotify and try again.",custom_snippet:"Custom snippets can't be shared. Reload Spotify and try again.",unchecked:"Couldn't check Marketplace's block list. Try again in a minute.",publish_failed:"Couldn't publish the code. Press Update on it to try again.",delete_failed:"Couldn't delete the code. Try again.",same_setup:"You already shared this setup.",invalid_handle:"Handles are 3 to 20 letters, digits, _ or -, starting and ending with a letter or digit.",reserved_handle:"That handle isn't allowed. Pick another.",handle_taken:"That handle is taken. Pick another.",unavailable:"Share codes aren't available yet."},xl=new Set(["offline","signed_out","invalid_signature","stale_salt","no_device_key","too_many_requests"]);function jt(n,e=null){var t;return n instanceof v&&xl.has(n.code)?en(n):n instanceof v&&n.code==="too_many_codes"&&e!==null?`You have ${e} share codes already. Delete one to make another.`:(t=n instanceof v?wl[n.code]:void 0)!=null?t:"Something went wrong. Try again."}async function ji(){var e;let n=await Bn(Xn,"GET");return{codes:Array.isArray(n==null?void 0:n.codes)?n.codes.flatMap(t=>{let i=vl(t);return i?[i]:[]}):[],newHearts:typeof(n==null?void 0:n.new_hearts)=="number"?n.new_hearts:0,max:typeof(n==null?void 0:n.max)=="number"?n.max:null,profile:typeof((e=n==null?void 0:n.profile)==null?void 0:e.handle)=="string"?{handle:n.profile.handle,link:typeof n.profile.link=="string"?n.profile.link:null}:null,suggestedHandle:typeof(n==null?void 0:n.suggested_handle)=="string"?n.suggested_handle:null}}async function qo(n,e,t){return Qo(await Bn(Xn,"POST",p({name:n,keys:e},t===void 0?{}:{handle:t})))}function Fi(n){return`${D().shareUrl.replace(/\/+$/,"")}/@${n}`}async function Go(n,e,t){return Qo(await Bn(gl,"POST",{code:n,name:e,keys:t}))}async function Vo(n){try{await Bn(hl,"POST",{code:n})}catch(e){if(e instanceof v&&e.code==="no_code")return;throw e}}async function Jo(n){let e=D().shareUrl.replace(/\/+$/,""),t;try{t=await fetch(`${e}/${n}.json`)}catch(s){throw new v("offline")}if(t.status===404||t.status===403)throw new v("no_code");if(!t.ok)throw new v("failed");let i=Ho(await t.json().catch(()=>null));if(!i||i.code!==n)throw new v("no_code");return i}async function Xo(){let n=D().shareUrl.replace(/\/+$/,"");try{let e=await fetch(`${n}/${bl}`);if(!e.ok)return null;let t=await e.json();return Array.isArray(t.posts)?t.posts.flatMap(i=>{let s=Il(i);return s?[s]:[]}):null}catch(e){return null}}async function Zo(n,e,t=!1){try{await io(Sl,p({code:n},t?{source:"preset"}:{}),{[kl]:e.hash})}catch(i){}}function vl(n){let e=n;return!e||typeof e.code!="string"?null:{code:e.code,name:typeof e.name=="string"&&e.name?e.name:null,link:typeof e.link=="string"?e.link:null,item_count:typeof e.item_count=="number"?e.item_count:0,imports:typeof e.imports=="number"?e.imports:0,created_at:typeof e.created_at=="number"?e.created_at:0,updated_at:typeof e.updated_at=="number"?e.updated_at:0,hearts:Nl(n.post),posted:Cl(n.post)}}function Cl(n){let e=n==null?void 0:n.status;return typeof e=="string"&&e!=="removed"}function Nl(n){let e=n;return(e==null?void 0:e.status)==="public"&&e.hidden!==!0&&typeof e.hearts=="number"?e.hearts:null}function Il(n){let e=n,t=i=>Number.isSafeInteger(i)&&i>=0?i:0;return!e||typeof e.code!="string"?null:{code:e.code,name:typeof e.name=="string"?e.name:xe(e.code),extensions:t(e.extensions),themes:t(e.themes),snippets:t(e.snippets)}}function Qo(n){let e=n;if(typeof(e==null?void 0:e.code)!="string")throw new v("failed");return{code:e.code,link:typeof e.link=="string"?e.link:null,leftOut:Array.isArray(e.left_out)?e.left_out.length:0}}var Ro="/claims",_l="/claims/cancel",El={no_backup:"Back up first, then secure your backup.",unsupported_identity:"This Spotify account can't be secured.",too_many_accounts:"Your account already has 10 Spotify accounts linked.",offline:"Couldn't reach Syncify. Check your connection and try again."},ze=class extends Error{constructor(t){var i;super((i=El[t])!=null?i:"Couldn't secure your backup. Try again.");this.code=t;this.name="ClaimError"}};async function ea(n,e){let t=await Yi(n,e,"GET",Ro);if(!t.ok)throw new ze(await Wi(t));let i=await t.json().catch(()=>null);return{claim:Hn(i==null?void 0:i.claim),accounts:Array.isArray(i==null?void 0:i.accounts)?i.accounts.filter(Pl):null}}async function na(n,e){let t=await Yi(n,e,"POST",Ro);if(!t.ok)throw new ze(await Wi(t));let i=await t.json().catch(()=>null);return Hn(i==null?void 0:i.claim)}async function ta(n,e){let t=await Yi(n,e,"POST",_l);if(!t.ok&&t.status!==404)throw new ze(await Wi(t))}async function Yi(n,e,t,i){try{return await Fe(n,e,{method:t},i)}catch(s){throw s instanceof TypeError?new ze("offline"):s}}async function Wi(n){let e=await n.json().catch(()=>null);return typeof(e==null?void 0:e.code)=="string"?e.code:"failed"}function Pl(n){let e=n;return!!(e&&typeof e.hash=="string"&&(e.status==="pending"||e.status==="final"||e.status==="cancelled"))}var Sn={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},Tl=/^([a-z0-9]|f([1-9]|1[0-2]))$/,Al=250,Ml=40,zi=null,Ft=null,hn=null;function ia(){return/mac/i.test(navigator.platform||navigator.userAgent)}function sa(n){if(n===null)return null;if(!n||typeof n!="object")return Sn;let e=n;return typeof e.key!="string"||!Tl.test(e.key)?Sn:{key:e.key,ctrl:!!e.ctrl,alt:!!e.alt,shift:!!e.shift,meta:!!e.meta}}function Zn(n){if(!n)return"Off";let e=n.key.toUpperCase();return ia()?[n.ctrl?"\u2318":"",n.alt?"\u2325":"",n.shift?"\u21E7":"",e].join(""):[n.ctrl&&"Ctrl",n.meta&&"Win",n.alt&&"Alt",n.shift&&"Shift",e].filter(Boolean).join("+")}function oa(n){if(n.key==="Escape")return{kind:"cancel"};let e=Ll(n.code);if(!e)return{kind:"ignore"};let t=ia();if(t&&n.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:e,ctrl:t?n.metaKey:n.ctrlKey,alt:n.altKey,shift:n.shiftKey,meta:t?!1:n.metaKey},s=e.startsWith("f")&&e.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!s?{kind:"error",message:`Include ${t?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function Ll(n){var t,i;let e=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(n);return e?((i=(t=e[1])!=null?t:e[2])!=null?i:e[3]).toLowerCase():null}function aa(n){var e;if(hn&&Dl(hn,n))return!1;try{let t=Spicetify.Mousetrap,i=(e=t.trigger)==null?void 0:e.call(t)._directMap;if(!i)return!1;let s=qi(n);return Object.keys(i).some(a=>a.startsWith(`${s}:`))}catch(t){return!1}}function Gi(n,e,t=0){if(zi=e,Ft=n,!ra()){if(t>=Ml){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>Gi(Ft,e,t+1),Al);return}Vi(Ft)}function Vi(n){if(Ft=n,!ra()||!zi)return;let e=zi;try{if(hn&&Spicetify.Keyboard._deregisterShortcut(hn),hn=null,!n)return;Spicetify.Keyboard.registerShortcut(n,t=>{t.preventDefault(),e()}),hn=n,console.debug("[Syncify]","Keyboard shortcut registered",Zn(n))}catch(t){console.warn("[Syncify]","Failed to register keyboard shortcut",t)}}function ra(){var n;return typeof((n=Spicetify.Keyboard)==null?void 0:n.registerShortcut)=="function"}function qi(n){return[n.ctrl&&"mod",n.meta&&"meta",n.alt&&"alt",n.shift&&"shift",n.key].filter(Boolean).join("+")}function Dl(n,e){return qi(n)===qi(e)}var Ji="both",Ol=["both","topbar","menu"],Qn=null,Rn=null,Yt=!1;function ca(n){return Ol.includes(n)?n:Ji}function la(){var n;return typeof((n=Spicetify.Menu)==null?void 0:n.Item)=="function"}function ua(n){Qn=n.topbarButton,Rn=n.menuItem}function Wt(n){let e=n!=="menu"||!Rn,t=n!=="topbar";if(Qn!=null&&Qn.element&&(Qn.element.style.display=e?"":"none"),!!Rn)try{t&&!Yt?(Rn.register(),Yt=!0):!t&&Yt&&(Rn.deregister(),Yt=!1)}catch(i){console.warn("[Syncify]","Failed to update profile menu item",i)}}var qt="syncify:config",zt={workerUrl:D().workerUrl,autoBackupEnabled:!1,shortcut:Sn,entryPoint:Ji};function fe(){var t,i;let n=D(),e=(i=(t=Spicetify.LocalStorage)==null?void 0:t.get(qt))!=null?i:window.localStorage.getItem(qt);if(!e)return N(p({},zt),{workerUrl:n.workerUrl});try{let s=JSON.parse(e);return{workerUrl:n.workerUrl,autoBackupEnabled:s.autoBackupEnabled===void 0?zt.autoBackupEnabled:!!s.autoBackupEnabled,shortcut:s.shortcut===void 0?zt.shortcut:sa(s.shortcut),entryPoint:ca(s.entryPoint)}}catch(s){return N(p({},zt),{workerUrl:n.workerUrl})}}function Gt(n){var t;let e=JSON.stringify({workerUrl:D().workerUrl,autoBackupEnabled:n.autoBackupEnabled,shortcut:n.shortcut,entryPoint:n.entryPoint});if((t=Spicetify.LocalStorage)!=null&&t.set){Spicetify.LocalStorage.set(qt,e);return}window.localStorage.setItem(qt,e)}function et(n){return typeof n.workerUrl=="string"&&n.workerUrl.length>0}var Ul=["username","canonicalUsername","id","uri","displayName"];async function ve(){let{value:n,field:e}=await Bl();return{hash:await Tt(n),field:e}}async function Bl(){var s;let n=(s=Spicetify.Platform)==null?void 0:s.UserAPI;if(!(n!=null&&n.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let e=await n.getUser(),t=Ul.find(a=>(e==null?void 0:e[a])!=null),i=t?e[t]:void 0;if(!t||!i)throw new Error("Unable to resolve the active Spotify user.");return{value:i,field:t}}async function tt(n){if(!et(n))throw new Error("Syncify backup service is not configured.");let[e,t]=await Promise.all([ve(),Co()]);if(t.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:i,unapproved:s}=await ao(n.workerUrl,e,t);return{payload:t,unchanged:i,unapproved:s}}async function kn(n,e){var c;if(!et(n))throw new Error("Syncify backup service is not configured.");let t=await Ei(n.workerUrl,await ve(),e),[i,s,a]=await Promise.all([Promise.all(t.backups.map(Zi)),t.safetyCopy?Zi(t.safetyCopy):null,Promise.all(t.unapproved.map(Zi))]),o=i.filter((d,y)=>i.findIndex(f=>f.payload_hash===d.payload_hash)===y);return N(p({},t),{payload:(c=o[0])!=null?c:null,backups:o,safetyCopy:s&&!o.some(d=>d.payload_hash===s.payload_hash)?s:null,unapproved:a.filter(d=>!o.some(y=>y.payload_hash===d.payload_hash))})}var Xi=new Map;async function Zi(n){var a,o,c;let e=(o=(a=n.marketplace_data)==null?void 0:a.keys)!=null?o:{},t=n.spicetify_config?Mi(n.spicetify_config,e):void 0,i=`${n.payload_hash} ${(c=n.metadata)==null?void 0:c.last_sync_datetime}`,s=Xi.get(i);return s||(s=Ut(e,t),Xi.set(i,s),s.catch(()=>Xi.delete(i))),N(p(p({},n),t?{spicetify_config:t}:{}),{payload_hash:await s})}async function da(n){let e=await Ei(it(n),await ve());return{claim:e.claim,install:e.install,nudge:e.nudge}}async function ya(n,e,t,i=[]){var c;let s=e!=null?e:(await kn(n)).payload;if(!s)throw new Error("No Syncify cloud backup was found for this Spotify account.");let a=await No(s,i),o=(c=s.backup)==null?void 0:c.id;return o&&et(n)&&ve().then(d=>co(n.workerUrl,d,o,t)).catch(()=>{}),{payload:s,restoredCount:a}}var nt=class extends Error{constructor(t){super("Couldn't back up your setup first, so nothing changed.");this.reason=t;this.name="SafetyBackupError"}};async function fa(n,e,t,i,s,a=!1){try{await tt(n)}catch(c){throw new nt(c)}let o=await zo(e,t,i,s);return ve().then(c=>Zo(e.code,c,a)).catch(()=>{}),o}async function pa(n){let e=await ve(),t=await ea(it(n),e);return N(p({},t),{hash:e.hash})}async function ma(n){await na(it(n),await ve())}async function Vt(n,e,t){await ro(it(n),await ve(),e,t)}async function Jt(n){await ta(it(n),await ve())}function it(n){if(!et(n))throw new Error("Syncify backup service is not configured.");return n.workerUrl}var ga="syncify:nudge-hidden-until",ha="syncify:nudge-panel-shown";function Sa(n=Date.now()){let e=Number(xa(ga));return Number.isFinite(e)&&e>n}function ka(n=Date.now()){va(ga,String(n+30*864e5))}function ba(){return xa(ha)!==null}function wa(){va(ha,"1")}function xa(n){var e,t;return(t=(e=Spicetify.LocalStorage)==null?void 0:e.get(n))!=null?t:window.localStorage.getItem(n)}function va(n,e){var t;(t=Spicetify.LocalStorage)!=null&&t.set?Spicetify.LocalStorage.set(n,e):window.localStorage.setItem(n,e)}var Xt="syncify:claim-check-day";async function Na(n){var t,i;let e=fe();if(e.workerUrl){if(!e.autoBackupEnabled)return $l(n);try{let[s,a]=await Promise.all([Bt(),kn(e)]);Ia(a,n);let o=(i=(t=a.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?i:0;if(a.exists&&Io(s.keyCount,o)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(a.backups.some(d=>d.payload_hash===s.hash)||s.keyCount===0)return;let{unapproved:c}=await tt(e);Spicetify.showNotification(c?"Syncify: backed up, waiting for approval":"Syncify auto-backup complete")}catch(s){if(s instanceof we||s instanceof nn){Spicetify.showNotification("Syncify: sign in to keep backing up",!0,8e3);return}let a=s instanceof Error?s.message:String(s);console.warn("Syncify startup sync failed:",s),Spicetify.showNotification(`Syncify auto-sync skipped: ${a}`,!0,8e3)}}}async function $l(n){let e=new Date().toLocaleDateString("en-CA");if(Hl()!==e)try{let t=await da(fe());Ca(e),Ia(t,n)}catch(t){if(t instanceof we){Ca(e);return}console.warn("Syncify claim check failed:",t)}}function Ia(n,e){var s;let t=Kl(n.claim),i=(s=n.install)==null?void 0:s.waiting[0];t?e.onClaim(t):i?e.onInstall(i):n.nudge&&!ba()&&e.onNudge()}function Kl(n){return(n==null?void 0:n.status)==="pending"&&!n.mine?n:null}function Hl(){var n,e;return(e=(n=Spicetify.LocalStorage)==null?void 0:n.get(Xt))!=null?e:window.localStorage.getItem(Xt)}function Ca(n){var e;(e=Spicetify.LocalStorage)!=null&&e.set?Spicetify.LocalStorage.set(Xt,n):window.localStorage.setItem(Xt,n)}var Ri="syncify:pending-restore",jl=600*1e3,Fl=2e3,Yl=15e3,Wl="marketplace:theme-installed",zl="raw.githubusercontent.com",ql=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],Ce=null,Qi=new Set,Pa=new Map;function Ta(){return Ce}function Aa(n){return Qi.add(n),()=>Qi.delete(n)}function Ma(){Ce&&Ba(N(p({},Ce),{manual:[]}))}function Qt(n,e="restore"){try{localStorage.setItem(Ri,JSON.stringify({at:Date.now(),manual:n,kind:e}))}catch(t){}}function La(){var n;Qt((n=Ce==null?void 0:Ce.manual)!=null?n:[],Ce==null?void 0:Ce.kind),window.location.reload()}function Da(){$a()&&(document.addEventListener("load",n=>_a(n.target,"load"),!0),document.addEventListener("error",n=>_a(n.target,"error"),!0))}async function Oa(){let n=$a();if(!n)return;try{localStorage.removeItem(Ri)}catch(o){}let e=Date.now(),t=await Ea();for(;t.loaded<t.total&&Date.now()-e<Yl;)await new Promise(o=>setTimeout(o,Fl)),t=await Ea();Ba(N(p({kind:n.kind,at:Date.now()},t),{manual:n.manual}));let i=t.loaded===t.total&&n.manual.length===0,s=n.kind==="share"?"Setup applied":"Backup restored",a=n.kind==="share"?"loaded":"restored";Spicetify.showNotification(i?`Syncify: ${s}; ${t.total} ${t.total===1?"item":"items"}`:`Syncify: ${a} ${t.loaded} of ${t.total}. Open Syncify for details.`,!1,8e3)}function Ua(n){let e=n.map(t=>t.type==="extension"?`spicetify config extensions ${Zt(t.name)}`:t.type==="custom_app"?`spicetify config custom_apps ${Zt(t.name)}`:`spicetify config current_theme ${Zt(t.name)}${t.scheme?` color_scheme ${Zt(t.scheme)}`:""}`);return e.length>0?[...e,"spicetify apply"]:[]}function Zt(n){return/^[\w.@+/-]+$/.test(n)?n:`"${n}"`}function Ba(n){Ce=n;for(let e of Qi)e(n)}function $a(){var n;try{let e=JSON.parse((n=localStorage.getItem(Ri))!=null?n:"null");return!e||Date.now()-e.at>jl?null:{manual:Array.isArray(e.manual)?e.manual:[],kind:e.kind==="share"?"share":"restore"}}catch(e){return null}}function _a(n,e){n instanceof HTMLScriptElement&&n.src&&Pa.set(st(n.src),e)}async function Ea(){var i;let n=await ye(),e=(i=n[Wl])!=null?i:"",t=V(n).filter(s=>s.type==="extension"&&s.sources.length>0||s.type==="theme"&&e.includes(s.key)||s.type==="snippet");return{loaded:t.filter(Gl).length,total:t.length}}function Gl(n){var e,t;if(n.type==="snippet"){let i=document.querySelector("style.marketplaceSnippets");return((e=i==null?void 0:i.textContent)==null?void 0:e.includes(`/* ${n.name} - `))===!0}if(n.type==="theme"){let i=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((t=i==null?void 0:i.textContent)!=null&&t.trim())}return Vl(n.sources[0]).some(Jl)}function Vl(n){let e;try{e=new URL(n)}catch(o){return[]}if(e.host!==zl)return[st(e.href)];let[t,i,s,...a]=e.pathname.split("/").filter(Boolean);return!t||!i||!s||a.length===0?[]:ql.map(o=>st(`https://${o}/gh/${t}/${i}@${s}/${a.join("/")}`))}function Jl(n){let e=Pa.get(n);return e?e==="load":[...document.querySelectorAll("script[src]")].some(i=>st(i.src)===n)&&performance.getEntriesByType("resource").some(i=>st(i.name)===n)}function st(n){try{let e=new URL(n);return`${e.origin}${e.pathname}`}catch(e){return n}}function es(n){return`A new install${n.device?` on ${n.device}`:""} wants to back up this Spotify account.`}function Ka(n){let e=Spicetify.React,t=e.useState,{install:i}=n,[s,a]=t(!1),[o,c]=t(null);async function d(y){a(!0),c(null);try{await Vt(fe(),i.id,y),Spicetify.showNotification(y==="approve"?"Syncify: install approved":"Syncify: install refused"),n.onDone(y)}catch(f){c(f instanceof Error?f.message:String(f)),a(!1)}}return e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-claim-notice"},es(i)," Approve it if it's yours."),o?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},o):null,e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:n.onClose,disabled:s},"Close"),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{d("reject")},disabled:s},"Not mine"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{d("approve")},disabled:s},"Approve")))}var Xl="syncify:beta",Ha=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function ja(){var n;return(n=window.SyncifyLoader)!=null?n:null}function Zl(){try{return window.localStorage.getItem(Xl)==="true"}catch(n){return!1}}async function Fa(n){let e=Zl()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(e.map(i=>Ql(`${n}/${i}`)))).reduce((i,s)=>s&&(!i||ts(s,i)>0)?s:i,null)}function ns(n){return typeof n=="string"&&Ha.test(n)}function ts(n,e){let[t,i]=[n,e].map(s=>{var y;let[,a,o,c,d]=(y=Ha.exec(s))!=null?y:[];return[a,o,c,d!=null?d:1/0].map(Number)});for(let s=0;s<t.length;s+=1)if(t[s]!==i[s])return t[s]<i[s]?-1:1;return 0}async function Ql(n,e=3e3){let t=typeof AbortController=="function"?new AbortController:null,i=setTimeout(()=>t==null?void 0:t.abort(),e);try{let s=await fetch(n,{signal:t==null?void 0:t.signal});if(!s.ok)return null;let a=await s.json();return ns(a==null?void 0:a.version)?a.version:null}catch(s){return null}finally{clearTimeout(i)}}var os="syncify:share-code-count",Rl=600;function eu(){var e,t;let n=Number((t=(e=Spicetify.LocalStorage)==null?void 0:e.get(os))!=null?t:NaN);return Number.isInteger(n)&&n>=0?n:null}function Ya(n){var e,t;n===null?(e=Spicetify.LocalStorage)==null||e.remove(os):(t=Spicetify.LocalStorage)==null||t.set(os,String(n))}var as="syncify:handle";function nu(){var e;let n=(e=Spicetify.LocalStorage)==null?void 0:e.get(as);return n==null?void 0:n||null}function is(n){var e,t;n===void 0?(e=Spicetify.LocalStorage)==null||e.remove(as):(t=Spicetify.LocalStorage)==null||t.set(as,n!=null?n:"")}var w=null;function ti(n={}){var vs,Cs,Ns,Is,_s,Es,Ps,Ts,As,Ms;let e=Spicetify.React,t=e.useEffect,i=e.useMemo,s=e.useState,a=e.useRef,[o,c]=s(()=>fe()),[d,y]=s(()=>w!=null&&w.remote.exists?"success":"idle"),[f,g]=s(null),[h,S]=s(0),[_,C]=s([]),[T,E]=s([]),[P,z]=s(null),[qe,Ne]=s(null),[J,R]=s(null),[j,Ie]=s(null),[K,ee]=s(()=>{var r;return(r=w==null?void 0:w.remote.payload)!=null?r:null}),[ne,k]=s(()=>{var r;return(r=w==null?void 0:w.remote.backups)!=null?r:[]}),[I,B]=s(()=>{var r;return(r=w==null?void 0:w.remote.safetyCopy)!=null?r:null}),[F,q]=s(()=>{var r;return(r=w==null?void 0:w.remote.unapproved)!=null?r:[]}),[te,_e]=s(()=>{var r;return(r=w==null?void 0:w.remote.install)!=null?r:null}),[re,at]=s(!1),[Cn,rt]=s(()=>new Set),[A,ce]=s(()=>{var r;return(r=w==null?void 0:w.remote.payload)!=null?r:null}),[Ee,sn]=s(w!==null),[on,X]=s(!1),[Y,ie]=s(!1),[Pe,Nn]=s(null),[L,se]=s(!1),[Ue,pe]=s(null),[me,In]=s((vs=n.section)!=null?vs:null),[Ge,an]=s(!1),[x,Be]=s(()=>Ta()),[ct,Ve]=s(!1),[Z,lt]=s(!1),[Te,ut]=s(null),[Ae,$]=s(()=>eu()),[$e,oe]=s(()=>nu()),[H,Me]=s(void 0),[O,ai]=s(()=>{var r;return(r=w==null?void 0:w.lockedBy)!=null?r:null}),[Ke,_n]=s(()=>{var r;return(r=w==null?void 0:w.remote.claim)!=null?r:null}),[ge,Je]=s(()=>{var r;return(r=w==null?void 0:w.claims)!=null?r:null}),[le,En]=s(!1),[dt,rn]=s(null),[ri,Xe]=s(()=>{var r;return(r=w==null?void 0:w.remote.nudge)!=null?r:!1}),[Pn,yt]=s(()=>Sa()),[ci,li]=s(n.secure===!0),Tn=a(!1),[cn,An]=s(!1),[u,m]=s(null),[b,ue]=s(null),Mn=a(null),he=i(()=>D(),[]),ln=i(()=>I?[...ne,I]:ne,[ne,I]),ui=u?[]:F,di=u?(Cs=b==null?void 0:b.backups)!=null?Cs:[]:ne,us=u?(Ns=b==null?void 0:b.safetyCopy)!=null?Ns:null:I,ds=i(()=>{var r;return new Map([...ln,...F,...(r=b==null?void 0:b.backups)!=null?r:[],...b!=null&&b.safetyCopy?[b.safetyCopy]:[]].map(l=>[l,V(l.marketplace_data.keys)]))},[ln,F,b]),ft=r=>{var l;return(l=ds.get(r))!=null?l:V(r.marketplace_data.keys)},ar=r=>ft(r).map(l=>l.key),rr=r=>ft(r).length,Q=i(()=>on&&A?Fn(ft(A),A.spicetify_config,T,P):null,[on,A,ds,T,P]),He=i(()=>Q?Vn(Q.items):null,[Q]),pt=i(()=>new Map([...Pe!=null?Pe:[],...He!=null?He:[]]),[Pe,He]),mt=((Is=A==null?void 0:A.backup)==null?void 0:Is.kind)==="quarantined",ys=i(()=>{var r;return new Set(((r=Q==null?void 0:Q.items)!=null?r:[]).filter(l=>{var M;return l.change!=="removed"&&l.isNew&&(mt||We(pt.get(l.key))||((M=pt.get(l.key))==null?void 0:M.kind)==="unchecked")}).map(l=>l.key))},[Q,pt,mt]),cr=[...ys].filter(r=>!Cn.has(r)),fs=Q!==null&&Pe===null,yi=i(()=>la(),[]),ps=i(()=>ja()!==null,[]),de=d==="loading",gt=(f==null?void 0:f.kind)==="warning"||(f==null?void 0:f.kind)==="error"?f:null,ht=!!(j&&ne.some(r=>r.payload_hash===j)),ms=!!(K&&j&&!ht),gs=!!(K&&j&&K.payload_hash===j),hs=!!(A&&j&&A.payload_hash===j),St=u!==null||Ge||!gs||ln.length<2,lr=St?di:di.slice(0,1),kt=(Ke==null?void 0:Ke.status)==="pending"&&!Ke.mine?Ke:null,un=su(ge,O,kt!==null),ur=!Pn&&!O&&K!==null&&me!=="account"&&(H?un.kind==="open":H===null&&ri),bt=(_s=te==null?void 0:te.waiting[0])!=null?_s:null,Ss=!te||te.trusted||O||un.kind==="secured"?null:te.refused?"This Spotify account refused backups from this install. Sign in to back up from it.":"This install isn't approved yet. Its backups are kept apart until you approve it from another install or sign in.",fi=(H?((Es=ge==null?void 0:ge.accounts)!=null?Es:[]).filter(r=>r.status==="final"):[]).map((r,l)=>({hash:r.hash,label:`Spotify account ${l+1}${r.device_info?` from ${r.device_info}`:""}`})).filter(r=>r.hash!==(ge==null?void 0:ge.hash)),dr=!!(j&&h>0&&!ln.some(r=>r.payload_hash===j));t(()=>(G().catch(()=>null).then(r=>Me(l=>l!=null?l:r)),Se({silent:!0}),hr(),Aa(Be)),[]),t(()=>{if(Nn(null),!Q||!He)return;[...He.values()].some(We)&&ie(!0);let r=!0;return Jn(Q.items,He).then(l=>{r&&(Nn(l),[...l.values()].some(We)&&ie(!0))}),()=>{r=!1}},[Q,He]),t(()=>{if(!L)return;let r=l=>{var Le;if(!((Le=Mn.current)!=null&&Le.isConnected)){se(!1),pe(null);return}l.preventDefault(),l.stopImmediatePropagation();let M=oa(l);if(M.kind!=="ignore"){if(M.kind==="cancel"){se(!1),pe(null);return}if(M.kind==="error"){pe(M.message);return}if(aa(M.shortcut)){pe(`${Zn(M.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}se(!1),pi(M.shortcut)}};return window.addEventListener("keydown",r,!0),()=>window.removeEventListener("keydown",r,!0)},[L,o]);async function ks(){let r=await Bt();return Ie(r.hash),S(r.installedItemCount),C(r.installedItems),E(r.items),z(r.spicetifyConfig),Ne(r.activeTheme),R(r.marketplaceAvailable),r}async function Se(r){try{X(!1),(!(r!=null&&r.silent)||!w)&&y("loading"),r!=null&&r.silent||g({kind:"info",text:"Checking your Syncify backup\u2026"}),await ks();let l,M=null;try{l=await kn(o)}catch(Ze){if(!(Ze instanceof we))throw Ze;l=xu,M=Ze.code}let Le=await G().catch(()=>null),ke=Le?await pa(o).catch(()=>null):null,W=Le?await G().catch(()=>null):null;w={remote:l,lockedBy:M,claims:W?ke:null},Me(W),Je(W?ke:null),ai(M),M&&In("account"),_n(l.claim),m(null),ue(null),ee(l.payload),k(l.backups),B(l.safetyCopy),q(l.unapproved),_e(l.install),Xe(l.nudge),ce(l.payload),sn(!0),y(l.exists?"success":"idle"),!(r!=null&&r.silent)&&!M&&g(l.exists&&l.payload?{kind:"success",text:`Backup found from ${bn(l.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(l){Ln(l)}}async function wt(){En(!0),rn(null);try{await ma(o)}catch(r){r instanceof ze&&["claim_pending","claimed"].includes(r.code)||rn(r instanceof Error?r.message:String(r))}finally{await Se({silent:!0}),En(!1)}}function yr(){li(!0),H?wt():dn("account")}function fr(){ka(),yt(!0)}t(()=>{!n.secure||Tn.current||le||!H||un.kind!=="open"||O||(Tn.current=!0,wt())},[H,un.kind,O,le]);function pr(r){Me(r),Tn.current=!0,!O&&K?wt():Se({silent:!0})}function bs(){Ya(null),$(null),is(void 0),oe(void 0),Me(null),Je(null),rn(null),Se({silent:!0})}async function mr(){An(!0);try{await Jt(o),Spicetify.showNotification("Syncify: claim sent for review"),await Se({silent:!0})}catch(r){g({kind:"error",text:r instanceof Error?r.message:String(r)})}finally{An(!1)}}async function gr(r){if(X(!1),m(r),ue(null),!r){ce(K);return}ce(null);try{let l=await kn(o,r);ue(l),ce(l.payload)}catch(l){m(null),ce(K),Ln(l)}}async function hr(){let r=he.version;if(!ns(r))return;let l=await Fa(he.releasesUrl);l&&ts(l,r)>0&&ut(l)}function Sr(r){let l=N(p({},o),{autoBackupEnabled:r});c(l),Gt(l),g({kind:"success",text:r?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}function pi(r){let l=N(p({},o),{shortcut:r});c(l),Gt(l),Vi(r),pe(null),g({kind:"success",text:r?`${Zn(r)} now opens Syncify.`:"Keyboard shortcut turned off."})}function kr(r){let l=N(p({},o),{entryPoint:r});c(l),Gt(l),Wt(r)}function dn(r){In(r),r!=="settings"&&se(!1)}function br(){pe(null),se(!0)}async function wr(){var r;try{X(!1),y("loading"),g({kind:"info",text:"Backing up your extensions and themes\u2026"});let{payload:l,unchanged:M,unapproved:Le}=await tt(o);if(await ks(),Le){await Se({silent:!0}),g({kind:"warning",text:"Backed up, but kept apart until this install is approved."}),Spicetify.showNotification("Syncify: backed up, waiting for approval");return}if(M){sn(!0),y("success"),g({kind:"success",text:"Everything is already backed up."}),Spicetify.showNotification("Syncify: everything is already backed up");return}let ke=[l,...ne.filter(W=>W.payload_hash!==l.payload_hash)].slice(0,wu);w&&(w=N(p({},w),{remote:N(p({},w.remote),{exists:!0,payload:l,backups:ke,safetyCopy:((r=w.remote.safetyCopy)==null?void 0:r.payload_hash)===l.payload_hash?null:w.remote.safetyCopy})})),ee(l),k(ke),B(W=>(W==null?void 0:W.payload_hash)===l.payload_hash?null:W),ce(l),sn(!0),y("success"),g({kind:"success",text:`Backed up ${l.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(l){Ln(l)}}async function ws(r){if(bt){at(!0);try{await Vt(o,bt.id,r),Spicetify.showNotification(r==="approve"?"Syncify: install approved":"Syncify: install refused"),await Se({silent:!0})}catch(l){Ln(l)}finally{at(!1)}}}function xr(r=A){if(J===!1){let l="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";g({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3);return}if(!r){let l="No Syncify cloud backup was found for this Spotify account.";g({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3);return}ce(r),ie(!1),rt(new Set),X(!0)}async function vr(){let r=A?Fn(ft(A),A.spicetify_config,T,P).manual:[];try{X(!1),y("loading"),g({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:l,restoredCount:M}=await ya(o,A!=null?A:void 0,u!=null?u:void 0,cr);ce(l),y("success"),g({kind:"success",text:`Restored ${M} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),Qt(r),setTimeout(()=>window.location.reload(),1e3)}catch(l){Ln(l)}}async function Cr(r){await Ra(r)&&(Ve(!0),setTimeout(()=>Ve(!1),2e3))}function je(r){if(r.startsWith("mailto:")){window.location.href=r;return}window.open(r,"_blank","noopener,noreferrer")}function Ln(r){if(y("error"),r instanceof Kn){lt(!0),g(null);return}if(r instanceof nn){g({kind:"error",text:r.message}),Se({silent:!0});return}if(r instanceof we&&r.code!=="not_linked"){g(null),Se({silent:!0});return}let l=r instanceof Error?r.message:String(r);g({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3)}function mi(r,l){var Ls,Ds;let M=(A==null?void 0:A.payload_hash)===r.payload_hash,Le=r.payload_hash===j,ke=bn(r.metadata.last_sync_datetime),W=Ja(rr(r)),Ze=(Ds=(Ls=r.backup)==null?void 0:Ls.name)!=null?Ds:null;return e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":M,"data-selected":M?"true":"false",type:"button",key:`${r.payload_hash}-${r.metadata.last_sync_datetime}`,title:l!=null&&l.isSafetyCopy?"Kept aside and updated about once a week, so a burst of new backups can't replace it":l!=null&&l.isUnapproved?"From an install this Spotify account hasn't approved":void 0,onClick:()=>{ce(r),X(!1)},disabled:de},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),l!=null&&l.isSafetyCopy?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Safety copy",e.createElement("span",{className:"syncify-backup-note"},e.createElement(xn,null),"updated weekly")),e.createElement("span",{className:"syncify-muted"},e.createElement(Oe,{parts:[Ze,ke,W]}))):l!=null&&l.isUnapproved?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Not approved",e.createElement("span",{className:"syncify-backup-note"},e.createElement(xn,null),ke)),e.createElement("span",{className:"syncify-muted"},e.createElement(Oe,{parts:[W,`from ${r.metadata.device_info}`]}))):Ze?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,Ze),e.createElement("span",{className:"syncify-muted syncify-backup-date"},e.createElement(Oe,{parts:[ke,W,`from ${r.metadata.device_info}`]}))):e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-backup-date"},ke),e.createElement("span",{className:"syncify-muted"},e.createElement(Oe,{parts:[W,`from ${r.metadata.device_info}`]}))),Le?e.createElement("span",{className:"syncify-tag",title:"What's on this device now"},"Current"):null,l!=null&&l.isSafetyCopy?e.createElement(Ga,null):null,l!=null&&l.isUnapproved?e.createElement(ls,null):null)}function gi(r){r.stopPropagation()}let Nr=Z?"Update Syncify to keep backing up":O?"Sign in to restore":Ee?K?ms?"Changes since your last backup":"Everything is backed up":"No backup yet":d==="error"?"Couldn't check your backup":"Checking your backup\u2026",hi=Z?"Your backups are safe":O?O==="not_owner"?"Secured by another account":"This backup is secured":Ee?K?ms?Cu(K,ar(K),_,P):`Last backup ${bn(K.metadata.last_sync_datetime)}`:"Save your extensions and themes so you can restore them after a reinstall or on another computer.":null,xs=!!(x&&!Z&&Date.now()-x.at<bu),Dn=!!(x&&x.loaded===x.total),Si=Ua((Ps=x==null?void 0:x.manual)!=null?Ps:[]);return e.createElement("div",{className:"syncify-panel",ref:Mn,onClick:gi,onMouseDown:gi,onPointerDown:gi},Z?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,"This version of Syncify is no longer supported."),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>je(`${he.githubUrl}#updating`)},"How to update")):null,kt?e.createElement("div",{className:"syncify-alert",role:"alert"},e.createElement("span",null,(Ts=kt.email)!=null?Ts:"Someone"," is claiming this backup.",H===null?" If that's you, sign in to finish.":kt.held?" Syncify is reviewing it.":null),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{mr()},disabled:cn},"Not me"),H===null?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>dn("account")},"That's me, sign in"):null)):null,bt?e.createElement("div",{className:"syncify-alert",role:"alert"},e.createElement("span",null,es(bt)),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{ws("reject")},disabled:re},"Not mine"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{ws("approve")},disabled:re},"Approve"))):null,Ss?e.createElement("div",{className:"syncify-alert",role:"status"},e.createElement("span",null,Ss)):null,Si.length>0?e.createElement("div",{className:"syncify-alert syncify-manual",role:"status"},e.createElement("span",{className:"syncify-manual-header"},e.createElement("span",null,x.manual.length===1?"1 isn't from Marketplace. Add it in a terminal:":`${x.manual.length} aren't from Marketplace. Add them in a terminal:`),e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:Ma},e.createElement(rs,null))),e.createElement("span",{className:"syncify-code"},e.createElement("code",null,Si.join(`
`)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Cr(Si.join(`
`))}},ct?"Copied":"Copy"))):null,gt?e.createElement("div",{className:"syncify-alert","data-kind":gt.kind},e.createElement("span",null,gt.text),e.createElement("span",{className:"syncify-alert-actions"},gt.kind==="error"?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Se()},disabled:de},"Try again"):null,e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>g(null)},e.createElement(rs,null)))):null,e.createElement("section",{className:"syncify-status","aria-live":"polite"},xs&&x?e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},x.kind==="share"?Dn?"Setup loaded":`Loaded ${x.loaded} of ${x.total}`:Dn?"Backup restored":`Restored ${x.loaded} of ${x.total}`),e.createElement("p",{className:"syncify-muted"},Dn?x.total===0?"Nothing from Marketplace to load":`${x.loaded} of ${x.total} loaded`:"Missing something? Reload Spotify once more."),Dn?e.createElement("p",{className:"syncify-muted"},x.kind==="share"?"Syncify set it up for you?":"Syncify saved your setup?"," ",e.createElement("button",{className:"syncify-text-button syncify-inline-button",type:"button",onClick:()=>je(he.kofiUrl)},"Support it on Ko-fi")):null):e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},Nr),e.createElement("p",{className:"syncify-muted"},e.createElement(Oe,{parts:[...Array.isArray(hi)?hi:[hi],`${Ja(h)} on this device`]}))),xs&&!Dn?e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:La},"Reload"):e.createElement("button",{className:"syncify-button",type:"button",onClick:wr,disabled:de||ht||Z||O!==null,title:O?"Sign in to back up":ht?"No changes since your last backup":void 0},de?"Working\u2026":ht?"Backed up":"Back up now")),ur?e.createElement("div",{className:"syncify-nudge",role:"region","aria-label":"Secure your backup"},e.createElement(Ga,null),e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it")),e.createElement("span",{className:"syncify-nudge-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:fr,disabled:le},"Not now"),e.createElement("button",{className:"syncify-button",type:"button",onClick:yr,disabled:le||de},le?"Securing\u2026":"Secure"))):null,!Ee||O||ne.length>0||F.length>0||fi.length>0?e.createElement("section",{className:"syncify-section","aria-label":"Backups"},e.createElement("div",{className:"syncify-section-header"},e.createElement("h4",{className:"syncify-section-title"},"Backups"),e.createElement("span",{className:"syncify-section-controls"},!u&&gs&&ln.length>1?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":Ge,"aria-controls":"syncify-backup-list",onClick:()=>{an(!Ge),X(!1)}},Ge?"Show less":`Show all ${ln.length}`,e.createElement(wn,null)):null,!O&&fi.length>0?e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select","aria-label":"Show backups from",value:u!=null?u:"",onChange:r=>{gr(r.currentTarget.value||null)},disabled:de},e.createElement("option",{value:""},"This Spotify account"),fi.map(r=>e.createElement("option",{key:r.hash,value:r.hash},r.label))),e.createElement(wn,null)):null)),Ee?O?e.createElement("p",{className:"syncify-locked"},e.createElement(ku,null),e.createElement("span",null,O==="not_owner"?"Sign in with the account that secured them":"Sign in to see and restore your backups")):u&&!b?e.createElement("p",{className:"syncify-muted"},"Loading backups\u2026"):di.length===0&&ui.length===0?e.createElement("p",{className:"syncify-muted"},"No backups yet."):e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-list",id:"syncify-backup-list",role:"radiogroup","aria-label":"Choose a backup to restore"},lr.map(r=>mi(r)),St&&us?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),mi(us,{isSafetyCopy:!0})):null,St&&ui.length>0?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),ui.map(r=>mi(r,{isUnapproved:!0}))):null),St?J===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to restore a backup."):on?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},"Restore"," ",A?(Ms=(As=A.backup)==null?void 0:As.name)!=null?Ms:bn(A.metadata.last_sync_datetime):"this backup","?"),mt?e.createElement("div",{className:"syncify-alert"},"An install this Spotify account hasn't approved made this backup. Its items stay off unless you turn them on."):null,Q?e.createElement(Za,{preview:Q,checks:pt,off:ys,allowed:Cn,unapproved:mt,onAllow:(r,l)=>{let M=new Set(Cn);l?M.add(r):M.delete(r),rt(M)},expanded:Y,onToggle:()=>ie(!Y)}):null,e.createElement("div",{className:"syncify-actions"},dr?e.createElement("div",{className:"syncify-alert syncify-actions-hint"},"Your current setup isn't backed up."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>X(!1),disabled:de},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:vr,disabled:de||fs},fs?"Checking\u2026":"Restore"))):e.createElement("div",{className:"syncify-actions"},hs?e.createElement("span",{className:"syncify-muted syncify-actions-hint"},"This backup is already current."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>xr(),disabled:de||!A||hs},"Restore backup")):null):e.createElement("div",{className:"syncify-backup-skeleton","aria-hidden":"true"},e.createElement("span",{className:"syncify-radio"}),e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-skeleton-line"}),e.createElement("span",{className:"syncify-skeleton-line wide"})))):null,e.createElement("div",{className:"syncify-accordion"},e.createElement(ss,{id:"share",title:"Share",openSection:me,onToggle:dn,status:H&&Ae?{kind:"count",label:`${Ae} ${Ae===1?"code":"codes"}`,text:String(Ae)}:null},e.createElement(ru,{config:o,session:H,localItems:T,localConfig:P,localTheme:qe,marketplaceAvailable:J,busy:de,onSignIn:()=>dn("account"),onSignedOut:bs,onCodeCount:r=>{Ya(r),$(r)},onHandle:r=>{is(r),oe(r)}})),e.createElement(ss,{id:"account",title:"Account",openSection:me,onToggle:dn,status:gu(H,O,un)},e.createElement(ou,{session:H,locked:O,secure:un,securing:le,secureError:dt,onSecure:()=>{wt()},nudge:ci,onSignedIn:pr,onSignedOut:bs,onOpenWebsite:je,handle:$e,onHandle:r=>{is(r),oe(r)}})),e.createElement(ss,{id:"settings",title:"Settings",openSection:me,onToggle:dn,status:Te?{kind:"dot",label:`Syncify ${Te} is out`}:null},e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Back up automatically"),e.createElement("span",{className:"syncify-muted"},"When Spotify starts and something has changed")),e.createElement("input",{className:"syncify-switch",type:"checkbox",role:"switch",checked:o.autoBackupEnabled&&!Z,onChange:r=>Sr(r.currentTarget.checked),disabled:de||Z})),e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Open Syncify from"),yi?o.entryPoint==="menu"&&!o.shortcut?e.createElement("span",{className:"syncify-muted"},"Keep a shortcut in case a Spotify update breaks the menu"):null:e.createElement("span",{className:"syncify-muted"},"The profile menu isn't available in this Spicetify version")),e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select",value:yi?o.entryPoint:"topbar",onChange:r=>kr(r.currentTarget.value),disabled:!yi},vu.map(r=>e.createElement("option",{key:r.value,value:r.value},r.label))),e.createElement(wn,null))),e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Keyboard shortcut"),L&&!Ue?e.createElement("span",{className:"syncify-muted"},"Press a key combination, or Esc to cancel"):null),e.createElement("span",{className:"syncify-shortcut"},o.shortcut&&!L?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>pi(null)},"Turn off"):null,!o.shortcut&&!L?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>pi(Sn)},"Use default"):null,e.createElement("button",{className:"syncify-key",type:"button","data-recording":L?"true":"false",onClick:()=>L?se(!1):br(),title:"Click to change"},L?"Press keys\u2026":o.shortcut?Zn(o.shortcut):"Off"))),Ue?e.createElement("div",{className:"syncify-alert",role:"alert"},Ue):null)),e.createElement("footer",{className:"syncify-footer"},e.createElement("span",{className:"syncify-footer-version"},e.createElement("span",null,"Syncify ",he.version),Te?e.createElement("button",{className:"syncify-text-button syncify-update",type:"button",onClick:()=>ps?window.location.reload():je(`${he.githubUrl}#updating`)},e.createElement(Oe,{parts:[`${Te} is out`,ps?"Reload":"How to update"]})):null),e.createElement("span",{className:"syncify-footer-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>je(he.issueUrl)},"Report an issue"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>je(he.githubUrl)},"GitHub"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>je(he.discordUrl)},"Discord"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>je(he.kofiUrl)},"Support on Ko-fi"))))}var Wa={added:{mark:"+",label:"Added"},removed:{mark:"\u2212",label:"Removed"},unchanged:{mark:"=",label:"Unchanged"}},Xa=[["extension","Extensions"],["theme","Themes"],["snippet","Snippets"]],tu={extension:"extension",custom_app:"custom app",theme:"theme"};function Za(n){let e=Spicetify.React,{items:t,counts:i,manual:s,theme:a}=n.preview,o=[...n.off].filter(c=>!n.allowed.has(c)).length;return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-chips","aria-label":"What changes on this device"},i.added?e.createElement("span",{className:"syncify-chip","data-change":"added"},"+",i.added," added"):null,i.removed?e.createElement("span",{className:"syncify-chip","data-change":"removed"},"\u2212",i.removed," removed"):null,i.unchanged?e.createElement("span",{className:"syncify-chip"},i.unchanged," unchanged"):null,s.length?e.createElement("span",{className:"syncify-chip"},s.length," to add manually"):null,a&&(!n.off.has(a.key)||n.allowed.has(a.key))?e.createElement("span",{className:"syncify-chip"},"Switches your theme to ",a.name):null,o?e.createElement("span",{className:"syncify-chip","data-change":"off"},o," off"):null),t.length||s.length?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":n.expanded,"aria-controls":"syncify-restore-changes",onClick:n.onToggle},n.expanded?"Hide changes":"Show changes",e.createElement(wn,null)):null,n.expanded?e.createElement("div",{className:"syncify-changes",id:"syncify-restore-changes"},Xa.map(([c,d])=>{let y=t.filter(f=>f.type===c);return y.length===0?null:e.createElement("section",{key:c,"aria-label":d},e.createElement("h5",{className:"syncify-change-group"},d),e.createElement("ul",{className:"syncify-change-list"},y.map(f=>{var g,h;return e.createElement("li",{className:"syncify-change",key:f.key},e.createElement("span",{className:"syncify-mark","data-change":f.change,role:"img","aria-label":Wa[f.change].label},Wa[f.change].mark),e.createElement("span",{className:"syncify-change-name"},f.name,f.repo?e.createElement("span",{className:"syncify-change-detail"},e.createElement(xn,null),f.repo):null),n.checks.has(f.key)?e.createElement(Qa,{check:n.checks.get(f.key)}):n.unapproved&&n.off.has(f.key)?e.createElement("span",{className:"syncify-source","data-warning":"true"},e.createElement(ls,null),"Not approved"):null,n.off.has(f.key)&&!((g=n.fixed)!=null&&g.has(f.key))?e.createElement("label",{className:"syncify-item-switch"},e.createElement("input",{type:"checkbox",checked:n.allowed.has(f.key),onChange:S=>n.onAllow(f.key,S.currentTarget.checked)}),(h=n.switchLabel)!=null?h:"Restore"):null)})))}),s.length?e.createElement("section",{"aria-label":"Add manually"},e.createElement("h5",{className:"syncify-change-group"},"Add manually"),e.createElement("ul",{className:"syncify-change-list"},s.map(c=>e.createElement("li",{className:"syncify-change",key:`${c.type}:${c.name}`},e.createElement("span",{className:"syncify-mark","aria-hidden":"true"}),e.createElement("span",{className:"syncify-change-name"},c.name,e.createElement("span",{className:"syncify-change-detail"},e.createElement(xn,null),tu[c.type],c.scheme?`, ${c.scheme}`:"")))))):null):null)}var iu={host:"Loads from outside GitHub",repo:"Its code is in a different repo than the one it names",blocked:"On Marketplace's block list",catalog:"Not in Marketplace's catalog",unchecked:"GitHub couldn't be reached to check it",custom:"A snippet made in Marketplace, not from its list"};function Qa(n){let e=Spicetify.React,{check:t}=n,i=We(t),s=t.kind==="host"?`Code from ${t.host}`:t.kind==="repo"?`Code from ${t.repo}`:t.kind==="blocked"?"Blocked by Marketplace":t.kind==="catalog"?"Not in Marketplace":t.kind==="unchecked"?"Not checked":"Custom";return e.createElement("span",{className:"syncify-source","data-warning":i?"true":"false",title:iu[t.kind]},i?e.createElement(ls,null):null,s)}function su(n,e,t){var o,c;if(e==="not_owner")return{kind:"other-account"};if(!n)return t?{kind:"other-claim"}:{kind:"unknown"};let{claim:i}=n;if((i==null?void 0:i.status)==="final"){if(!i.mine)return{kind:"other-account"};let d=((o=n.accounts)!=null?o:[]).filter(y=>y.status==="final").length;return{kind:"secured",linkedCount:Math.max(d,1)}}if((i==null?void 0:i.status)==="pending")return i.mine?{kind:"pending",finalAt:i.final_at,held:i.held,waiting:i.waiting===!0}:{kind:"other-claim"};let s=((c=n.accounts)!=null?c:[]).filter(d=>d.hash===n.hash),a=s[s.length-1];return(a==null?void 0:a.status)==="cancelled"&&a.cancelled_by==="owner"?{kind:"cancelled"}:{kind:"open"}}function ou(n){let e=Spicetify.React,t=e.useEffect,i=e.useState,{session:s,secure:a}=n,[o,c]=i(()=>Et()),[d,y]=i(()=>Et().email),[f,g]=i(""),[h,S]=i(!1),[_,C]=i(null),[T,E]=i(()=>Date.now()),{handle:P,onHandle:z}=n;t(()=>{if(!s||P!==void 0)return;let k=!0;return ji().then(I=>{var B,F;k&&z((F=(B=I.profile)==null?void 0:B.handle)!=null?F:null)}).catch(()=>{}),()=>{k=!1}},[s,P]);let qe=!!(o.codeSentAt&&T-o.codeSentAt<yu),Ne=Math.max(0,Math.ceil((o.retryAt-T)/1e3)),J=o.retryEmail===null||o.retryEmail===d.trim().toLowerCase()?Ne:0;t(()=>{if(!s)return;let k=!0;return eo().then(I=>{!k||I||(C({kind:"warning",text:en(new v("signed_out"))}),n.onSignedOut())}).catch(()=>{}),()=>{k=!1}},[s==null?void 0:s.token]),t(()=>{if(o.retryAt<=Date.now())return;let k=setInterval(()=>{E(Date.now()),o.retryAt<=Date.now()&&clearInterval(k)},1e3);return()=>clearInterval(k)},[o.retryAt]);function R(k){let I=p(p({},Et()),k);Vs(I),c(I),E(Date.now())}async function j(k){var B;let I=k.trim();if(!pu.test(I)){C({kind:"error",text:"Enter a valid email address."});return}S(!0),C(null);try{let F=await Qs(I,{nudge:n.nudge});R({email:I,codeSentAt:Date.now(),retryAt:Date.now()+F*1e3,retryEmail:I.toLowerCase()}),g("")}catch(F){let q=F instanceof v?F:null,te=(B=q==null?void 0:q.retryAfter)!=null?B:null,_e=te&&te<=fu?Date.now()+te*1e3:0,re=(q==null?void 0:q.code)==="too_many_requests"?null:I.toLowerCase();if((q==null?void 0:q.code)==="resend_wait"){R({email:I,codeSentAt:o.email===I&&o.codeSentAt?o.codeSentAt:Date.now(),retryAt:_e,retryEmail:re});return}_e&&R({retryAt:_e,retryEmail:re}),C({kind:"error",text:en(F)})}finally{S(!1)}}async function Ie(){S(!0),C(null);try{let k=await Rs(o.email,f);R({codeSentAt:null}),g(""),n.onSignedIn(k)}catch(k){C({kind:"error",text:en(k)});let I=k instanceof v?k.code:null;(I==="too_many_attempts"||I==="code_expired")&&g("")}finally{S(!1)}}async function K(){var I;let k=(I=s==null?void 0:s.email)!=null?I:"";S(!0),C(null),await no(),R({email:k,codeSentAt:null}),y(k),S(!1),n.onSignedOut()}async function ee(){S(!0),C(null);try{n.onOpenWebsite(await to())}catch(k){let I=k instanceof v&&k.code==="signed_out";C({kind:I?"warning":"error",text:en(k)}),I&&n.onSignedOut()}finally{S(!1)}}let ne=_?e.createElement("div",{className:"syncify-alert","data-kind":_.kind==="error"?"error":void 0,role:"alert"},_.text):null;if(s===void 0)return null;if(s){let k=a.kind==="open"||a.kind==="other-claim"||a.kind==="cancelled";return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",{className:"syncify-account-email"},s.email),a.kind==="secured"?e.createElement("span",{className:"syncify-muted"},e.createElement(Oe,{parts:["Backup secured",a.linkedCount===1?"1 Spotify account linked":`${a.linkedCount} Spotify accounts linked`]})):a.kind==="pending"?e.createElement("span",{className:"syncify-muted syncify-account-state"},e.createElement(er,null),e.createElement("span",null,e.createElement(Oe,{parts:["Securing this backup",a.waiting?"waiting on sign-in":a.held?"in review":`final ${cs(a.finalAt)}`]}))):a.kind==="other-account"?e.createElement("span",{className:"syncify-muted"},"This backup is secured by another account"):e.createElement("span",{className:"syncify-muted"},"Signed in")),e.createElement("span",{className:"syncify-account-actions"},e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-label":"Manage on the website",onClick:()=>{ee()},disabled:h},"Manage",e.createElement(Va,null)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{K()},disabled:h},"Sign out"))),P?e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"@",P),e.createElement("span",{className:"syncify-muted"},"Your handle")),e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-label":"Open your profile",onClick:()=>n.onOpenWebsite(Fi(P))},"Profile",e.createElement(Va,null))):null,k?e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it")),e.createElement("button",{className:"syncify-button",type:"button",onClick:n.onSecure,disabled:h||n.securing||a.kind==="other-claim"},n.securing?"Securing\u2026":a.kind==="cancelled"?"Secure again":"Secure")):null,a.kind==="other-claim"?e.createElement("div",{className:"syncify-alert",role:"status"},"Another claim is pending. If it isn't yours, press Not me above and Syncify will review it."):a.kind==="cancelled"?e.createElement("div",{className:"syncify-alert",role:"status"},"Your claim was cancelled from this Spotify account."):a.kind==="pending"&&a.waiting?e.createElement("div",{className:"syncify-alert",role:"status"},"Syncify ran on this Spotify account without you signed in, maybe after a Spotify update or on another computer. Sign in to Syncify there to finish linking."):null,n.secureError?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},n.secureError):null,ne)}return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting"},n.locked?e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Sign in to restore"),e.createElement("span",{className:"syncify-muted"},"With the email that secured this backup")):e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it"))),e.createElement("form",{className:"syncify-confirm",noValidate:!0,onSubmit:k=>{k.preventDefault(),!h&&(qe?f.length===ni&&Ie():J||j(d))}},qe?e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-muted"},"Code sent to ",mu(o.email)),e.createElement("div",{className:"syncify-field"},e.createElement("input",{className:"syncify-input syncify-code-input",type:"text",inputMode:"numeric",autoComplete:"one-time-code","aria-label":"6-digit code",placeholder:"123456",maxLength:ni,value:f,onChange:k=>g(k.currentTarget.value.replace(/\D/g,"").slice(0,ni)),autoFocus:!0}),e.createElement("button",{className:"syncify-button",type:"submit",disabled:h||f.length!==ni},h?"Verifying\u2026":"Verify")),e.createElement("p",{className:"syncify-muted syncify-account-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{j(o.email)},disabled:h||Ne>0},Ne>0?`Resend in ${qa(Ne)}`:"Resend code"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{R({codeSentAt:null}),g(""),C(null)},disabled:h},"Use another email"))):e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-field"},e.createElement("input",{className:"syncify-input",type:"email",autoComplete:"email","aria-label":"Email",placeholder:"you@example.com",value:d,onChange:k=>y(k.currentTarget.value),autoFocus:!0}),e.createElement("button",{className:"syncify-button",type:"submit",disabled:h||J>0||!d.trim()},h?"Sending\u2026":"Send code")),e.createElement("p",{className:"syncify-muted"},J>0?`Send another code in ${qa(J)}`:"We only email sign-in codes.")),ne))}var au=[["add","Add to my setup"],["replace","Replace my setup"]];function ru(n){var An;let e=Spicetify.React,t=e.useEffect,i=e.useMemo,s=e.useRef,a=e.useState,{session:o}=n,[c,d]=a(""),[y,f]=a(!1),[g,h]=a(null),[S,_]=a(null),[C,T]=a(null),[E,P]=a(null),[z,qe]=a("add"),[Ne,J]=a(!1),[R,j]=a(()=>new Set),[Ie,K]=a(null),[ee,ne]=a(void 0),[k,I]=a(!1),[B,F]=a(null),[q,te]=a(0),_e=s(!1),[re,at]=a(null),[Cn,rt]=a(null),[A,ce]=a(null),[Ee,sn]=a(""),[on,X]=a(null),[Y,ie]=a(null),[Pe,Nn]=a(""),[L,se]=a(null),[Ue,pe]=a(!1),[me,In]=a(!1),[Ge,an]=a(null),[x,Be]=a(null),[ct,Ve]=a(null),[Z,lt]=a(!1),[Te,ut]=a(null),Ae=s(0),$=i(()=>S?Yo(S.file,S.items,n.localItems,n.localConfig,n.localTheme,z):null,[S,n.localItems,n.localConfig,n.localTheme,z]),$e=i(()=>{if(!$||!S)return null;let u=new Set(S.items.map(m=>m.key));return $.items.filter(m=>m.change!=="removed"&&u.has(m.key)&&(z==="replace"||m.isNew))},[$,S,z]),oe=i(()=>$e?Vn($e):null,[$e]),H=i(()=>new Map([...Ie!=null?Ie:[],...oe!=null?oe:[]]),[Ie,oe]),Me=i(()=>$&&ee!==void 0?Wo($,ee):new Set,[$,ee]),O=i(()=>{var u;return new Set([...((u=$==null?void 0:$.items)!=null?u:[]).filter(m=>{var b;return m.change!=="removed"&&m.isNew&&(We(H.get(m.key))||((b=H.get(m.key))==null?void 0:b.kind)==="unchecked")}).map(m=>m.key),...Me])},[$,H,Me]),ai=[...O].filter(u=>Me.has(u)||!R.has(u)),Ke=$!==null&&(Ie===null||ee===void 0),_n=L?L.items.filter(u=>!L.leftOut.has(u.key)):[],ge=!!(B&&re!==null&&B.length>=re),Je=Y!==null&&Y.code===null&&!Cn,le=Je?$o(Ee):null,[En,dt]=a(null);t(()=>{if(!le){dt(null);return}let u=window.setTimeout(()=>dt(le),Rl);return()=>window.clearTimeout(u)},[le]),t(()=>{if(K(null),!$e||!oe)return;[...oe.values()].some(We)&&J(!0);let u=!0;return Jn($e,oe).then(m=>{u&&(K(m),[...m.values()].some(We)&&J(!0))}),()=>{u=!1}},[$e,oe]),t(()=>{Xo().then(T)},[]),t(()=>{F(null),ie(null),Be(null),_e.current=!1,o&&Xe()},[o==null?void 0:o.token]);async function rn(u){let m=u!=null?u:Ko(c);if(h(null),_(null),!m){h(jt(new v("no_code")));return}f(!0),P(u!=null?u:null);try{let b=await Jo(m);qe("add"),j(new Set),J(!1),_({file:b,items:V(b.keys),pick:u!==void 0}),Ki().then(ne)}catch(b){h(jt(b))}finally{f(!1),P(null)}}async function ri(){if(!(!S||!$)){I(!0),h(null);try{await fa(n.config,S.file,z,ai,ee!=null?ee:null,S.pick),Spicetify.showNotification("Syncify: setup loaded. Reloading\u2026"),Qt($.manual,"share"),setTimeout(()=>window.location.reload(),1e3)}catch(u){I(!1),h(u instanceof nt?`${u.message} ${lu(u.reason)}`:u instanceof Error?u.message:String(u))}}}async function Xe(){var u,m;X(null);try{let b=await ji();F(b.codes),_e.current||(_e.current=!0,te(b.newHearts)),n.onCodeCount(b.codes.length),at(b.max),rt(b.profile),n.onHandle((m=(u=b.profile)==null?void 0:u.handle)!=null?m:null),ce(b.suggestedHandle)}catch(b){Pn(b,X)}}function Pn(u,m){m(jt(u,re)),u instanceof v&&u.code==="signed_out"&&n.onSignedOut()}async function yt(u){var b;let m=++Ae.current;ie({code:u}),Nn((b=u==null?void 0:u.name)!=null?b:""),sn(A!=null?A:""),se(null),pe(!1),an(null),Be(null),Ve(null);try{let ue=await ye(),Mn=await jo(V(ue),ue);if(m!==Ae.current)return;se(p({keys:ue},Mn)),Mn.leftOut.size>0&&pe(!0)}catch(ue){if(m!==Ae.current)return;ie(null),an(ue instanceof Error?ue.message:String(ue))}}function ci(){Ae.current+=1,ie(null),se(null)}async function li(){if(!Y||!L)return;In(!0),an(null);let u=Fo(L.keys,_n);try{let m=Y.code?await Go(Y.code.code,Pe.trim(),u):await qo(Pe.trim(),u,Je?Ee.trim():void 0);Be(N(p({},m),{outcome:Y.code?"updated":"created"})),ie(null),se(null),await Xe()}catch(m){if(m instanceof v&&m.code==="same_setup"&&m.share){Be(N(p({},m.share),{leftOut:0,outcome:"existing"})),ie(null),se(null);return}Pn(m,an),m instanceof v&&m.code==="publish_failed"&&(ie(null),Xe())}finally{In(!1)}}async function Tn(u){lt(!0),X(null);try{await Vo(u),Ve(null),(x==null?void 0:x.code)===u&&Be(null),await Xe()}catch(m){Pn(m,X)}finally{lt(!1)}}async function cn(u,m){await Ra(u)&&(ut(m),setTimeout(()=>ut(b=>b===m?null:b),2e3))}return e.createElement(e.Fragment,null,e.createElement("form",{className:"syncify-field syncify-share-load",noValidate:!0,onSubmit:u=>{u.preventDefault(),!y&&!k&&c.trim()&&rn()}},e.createElement("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-input"},"Load a setup"),e.createElement("input",{className:"syncify-input syncify-share-input",id:"syncify-share-input",type:"text",placeholder:"Paste a code or a link",autoComplete:"off",spellCheck:!1,value:c,onChange:u=>d(u.currentTarget.value),disabled:k}),e.createElement("button",{className:"syncify-button secondary",type:"submit",disabled:y||k||!c.trim()},y?"Loading\u2026":"Preview")),g?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},g):null,S&&$?e.createElement("div",{className:"syncify-confirm"},e.createElement("span",{className:"syncify-share-title"},e.createElement("p",{className:"syncify-confirm-title"},"Load ",(An=S.file.name)!=null?An:xe(S.file.code),"?"),S.file.creator?e.createElement("button",{className:"syncify-text-button",type:"button",title:"Open their profile",onClick:()=>window.open(Fi(S.file.creator),"_blank","noopener,noreferrer")},"by @",S.file.creator):null),e.createElement("div",{className:"syncify-share-modes",role:"radiogroup","aria-label":"How to load it"},au.map(([u,m])=>e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":z===u,"data-selected":z===u?"true":"false",type:"button",key:u,onClick:()=>qe(u),disabled:k},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,m))))),e.createElement(Za,{preview:$,checks:H,off:O,fixed:Me,switchLabel:"Load",allowed:R,unapproved:!1,onAllow:(u,m)=>{let b=new Set(R);m?b.add(u):b.delete(u),j(b)},expanded:Ne,onToggle:()=>J(!Ne)}),n.marketplaceAvailable===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to load a setup."):e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>_(null),disabled:k},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{ri()},disabled:k||Ke||n.busy},k?"Applying\u2026":Ke?"Checking\u2026":"Apply"))):null,C?e.createElement("section",{className:"syncify-share-part","aria-label":C.length>0?"Syncify picks":"Discover"},C.length>0?e.createElement("h5",{className:"syncify-change-group"},"Syncify picks"):null,e.createElement("ul",{className:"syncify-change-list syncify-share-codes"},C.map(u=>e.createElement("li",{className:"syncify-setting",key:u.code},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",{className:"syncify-account-email"},u.name),e.createElement("span",{className:"syncify-muted syncify-pick-detail"},e.createElement(du,{pick:u}),ei(u.extensions+u.themes+u.snippets,"item"))),e.createElement("button",{className:"syncify-text-button",type:"button",disabled:y||k,onClick:()=>{rn(u.code)}},E===u.code?"Loading\u2026":"Preview"))),e.createElement("li",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Find more setups"),e.createElement("span",{className:"syncify-muted"},"People's setups on Discover")),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>window.open(`${D().webUrl.replace(/\/+$/,"")}/discover`,"_blank","noopener,noreferrer")},"Open Discover")))):null,o===void 0?null:o?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting syncify-share-part"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Share this setup"),e.createElement("span",{className:"syncify-muted"},B&&B.length>0&&re!==null?uu(re-B.length):"Get a code anyone can load")),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{yt(null)},disabled:Y!==null||B===null||ge||n.marketplaceAvailable===!1,title:ge?"Delete a code to make another":void 0},"Share")),Y?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},Y.code?`Update ${xe(Y.code.code)} with this setup?`:"Share this setup?"),L?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-chips","aria-label":"What goes in"},e.createElement("span",{className:"syncify-chip"},_n.length," going in"),L.leftOut.size?e.createElement("span",{className:"syncify-chip","data-change":"off"},L.leftOut.size," left out"):null),L.items.length?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":Ue,"aria-controls":"syncify-share-items",onClick:()=>pe(!Ue)},Ue?"Hide items":"Show items",e.createElement(wn,null)):null,Ue?e.createElement(cu,{items:L.items,leftOut:L.leftOut}):null,e.createElement("div",{className:"syncify-share-fields"},e.createElement("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-name"},"Setup name"),e.createElement("input",{id:"syncify-share-name",className:"syncify-input",type:"text",placeholder:"Optional",maxLength:Uo,value:Pe,onChange:u=>Nn(u.currentTarget.value),disabled:me}),Je?e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-muted syncify-share-handle-note"},"It's your first time creating a share code. Pick a handle for your profile:"),e.createElement("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-handle"},"Your handle"),e.createElement("span",{className:"syncify-input syncify-handle-input"},e.createElement("span",{"aria-hidden":"true"},"@"),e.createElement("input",{id:"syncify-share-handle",type:"text",placeholder:"handle",autoComplete:"off",spellCheck:!1,maxLength:Hi,value:Ee,onChange:u=>sn(u.currentTarget.value.replace(/^@/,"")),disabled:me})),Ee&&En?e.createElement("span",{className:"syncify-share-handle-problem",role:"alert"},En):null):null)):e.createElement("p",{className:"syncify-muted"},"Checking your items\u2026"),e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:ci,disabled:me},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{li()},disabled:!L||_n.length===0||me||Je&&le!==null},L?me?Y.code?"Updating\u2026":"Creating\u2026":Y.code?"Update":"Create code":"Checking\u2026"))):null,Ge?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},Ge):null,x?e.createElement("div",{className:"syncify-confirm"},e.createElement("span",{className:"syncify-manual-header"},e.createElement("span",{className:"syncify-confirm-title"},x.outcome==="existing"?"You already shared this setup":x.outcome==="updated"?"Code updated":"Your code is ready"),e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>Be(null)},e.createElement(rs,null))),e.createElement("span",{className:"syncify-code syncify-share-code"},e.createElement("code",null,xe(x.code)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{cn(xe(x.code),"saved-code")}},Te==="saved-code"?"Copied":"Copy"),x.link?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{cn(x.link,"saved-link")}},Te==="saved-link"?"Copied":"Get link"):null),x.leftOut?e.createElement("p",{className:"syncify-muted"},x.leftOut===1?"1 snippet isn't in Marketplace's list anymore, so it was left out.":`${x.leftOut} snippets aren't in Marketplace's list anymore, so they were left out.`):null,x.outcome==="created"&&C?e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Post it on Discover"),e.createElement("span",{className:"syncify-muted"},"Let people find it and try it")),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>window.open(`${D().webUrl.replace(/\/+$/,"")}/discover?post=${encodeURIComponent(x.code)}`,"_blank","noopener,noreferrer")},"Post")):null):null,on?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,on),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Xe()}},"Try again"))):null,B&&B.length>0?e.createElement("section",{"aria-label":"Your codes"},e.createElement("h5",{className:"syncify-change-group syncify-codes-heading"},"Your codes",q>0?e.createElement("span",{className:"syncify-tag","data-tone":"new"},ei(q,"new heart")):null),e.createElement("ul",{className:"syncify-change-list syncify-share-codes"},B.map(u=>{var m;return e.createElement("li",{className:"syncify-setting",key:u.code},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",{className:"syncify-account-email"},(m=u.name)!=null?m:xe(u.code)),e.createElement("span",{className:"syncify-muted"},ct===u.code?u.posted?"Delete it? Its link stops working and its post comes off Discover.":"Delete it? Its link stops working.":e.createElement(Oe,{parts:[u.name?xe(u.code):null,ei(u.item_count,"item"),`Used by ${u.imports}`,u.hearts===null?null:ei(u.hearts,"heart")]}))),e.createElement("span",{className:"syncify-account-actions"},ct===u.code?e.createElement(e.Fragment,null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Ve(null),disabled:Z},"Cancel"),e.createElement("button",{className:"syncify-text-button","data-danger":"true",type:"button",onClick:()=>{Tn(u.code)},disabled:Z},Z?"Deleting\u2026":"Delete")):e.createElement(e.Fragment,null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{yt(u)},disabled:Y!==null||Z},"Update"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{cn(xe(u.code),`code:${u.code}`)}},Te===`code:${u.code}`?"Copied":"Copy"),u.link?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{cn(u.link,`link:${u.code}`)}},Te===`link:${u.code}`?"Copied":"Get link"):null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Ve(u.code),disabled:Z},"Delete"))))}))):null):e.createElement("div",{className:"syncify-setting syncify-share-part"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Share this setup"),e.createElement("span",{className:"syncify-muted"},"Get a code anyone can load")),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:n.onSignIn},"Sign in to share")))}var za={in:{mark:"+",label:"Goes in"},out:{mark:"\u2212",label:"Left out"}};function cu(n){let e=Spicetify.React;return e.createElement("div",{className:"syncify-changes",id:"syncify-share-items"},Xa.map(([t,i])=>{let s=n.items.filter(a=>a.type===t).sort((a,o)=>a.name.localeCompare(o.name));return s.length===0?null:e.createElement("section",{key:t,"aria-label":i},e.createElement("h5",{className:"syncify-change-group"},i),e.createElement("ul",{className:"syncify-change-list"},s.map(a=>{let o=n.leftOut.get(a.key),c=o?za.out:za.in;return e.createElement("li",{className:"syncify-change",key:a.key},e.createElement("span",{className:"syncify-mark","data-change":o?"removed":"added",role:"img","aria-label":c.label},c.mark),e.createElement("span",{className:"syncify-change-name"},a.name,a.repo?e.createElement("span",{className:"syncify-change-detail"},e.createElement(xn,null),a.repo):null),o?e.createElement(Qa,{check:o}):null)})))}))}function lu(n){return n instanceof we?"Sign in to back up.":n instanceof Error?n.message:String(n)}async function Ra(n){var e;try{return await navigator.clipboard.writeText(n),!0}catch(t){let i=(e=Spicetify.Platform)==null?void 0:e.ClipboardAPI;return i!=null&&i.copy?(await i.copy(n),!0):!1}}function uu(n){return n<=0?"No codes left, delete one to make another":`${n} ${n===1?"code":"codes"} left`}var Rt=12;function xn(){let n=Spicetify.React;return n.createElement(n.Fragment,null,n.createElement("span",{className:"syncify-sep","aria-hidden":"true"}),n.createElement("span",{className:"syncify-sr-only"},", "))}function Oe(n){let e=Spicetify.React,t=n.parts.filter(i=>!!i);return e.createElement("span",{className:"syncify-parts"},t.map((i,s)=>e.createElement(e.Fragment,{key:s},s>0?e.createElement(xn,null):null,i)))}function du(n){let e=Spicetify.React,{extensions:t,themes:i,snippets:s}=n.pick,a=[...Array(Math.min(t,Rt)).fill("extension"),...Array(Math.min(i,Rt)).fill("theme"),...Array(Math.min(s,Rt)).fill("snippet")].slice(0,Rt);return e.createElement("span",{className:"syncify-pips","aria-hidden":"true"},a.map((o,c)=>e.createElement("span",{className:"syncify-pip","data-kind":o,key:c})))}function ei(n,e){return`${n} ${e}${n===1?"":"s"}`}var ni=6,yu=600*1e3,fu=300,pu=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function mu(n){let e=n.lastIndexOf("@");return e<1?n:`${n[0]}***${n.slice(e)}`}function cs(n){let e=bn(new Date(n).toISOString());return e.startsWith("today")?e:`on ${e}`}function qa(n){return`${Math.floor(n/60)}:${String(n%60).padStart(2,"0")}`}function ss(n){let e=Spicetify.React,t=n.openSection===n.id,i=`syncify-section-${n.id}`;return e.createElement("section",{className:"syncify-accordion-section","aria-label":n.title},e.createElement("button",{className:"syncify-accordion-header",type:"button","aria-expanded":t,"aria-controls":i,onClick:()=>n.onToggle(t?null:n.id)},e.createElement("span",{className:"syncify-accordion-title"},n.title),!t&&n.status?e.createElement("span",{className:"syncify-accordion-status","data-kind":n.status.kind,role:"img","aria-label":n.status.label,title:n.status.label},n.status.kind==="ok"?e.createElement(hu,null):n.status.kind==="warning"?e.createElement(Su,null):n.status.kind==="pending"?e.createElement(er,null):n.status.kind==="count"?n.status.text:null):null,e.createElement(wn,null)),t?e.createElement("div",{className:"syncify-accordion-body",id:i},n.children):null)}function Ga(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-shield",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"}))}function ls(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-warning-icon",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M12 3 2 21h20z"}),n.createElement("path",{d:"M12 10v5"}),n.createElement("path",{d:"M12 18h.01"}))}function gu(n,e,t){return e?{kind:"warning",label:"Sign in to see your backups"}:n?t.kind==="secured"?{kind:"ok",label:"Signed in, backup secured"}:t.kind==="pending"?{kind:"pending",label:"Linking this Spotify account"}:t.kind==="open"||t.kind==="cancelled"?{kind:"warning",label:"Backup not secured yet"}:{kind:"ok",label:"Signed in"}:null}function hu(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"10"}),n.createElement("path",{d:"m9 12 2 2 4-4"}))}function Su(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"10"}),n.createElement("path",{d:"M12 8v4"}),n.createElement("path",{d:"M12 16h.01"}))}function wn(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-chevron",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"m9 6 6 6-6 6"}))}function ku(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-lock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("rect",{x:"5",y:"11",width:"14",height:"10",rx:"2"}),n.createElement("path",{d:"M8 11V7a4 4 0 0 1 8 0v4"}))}function er(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-clock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"9"}),n.createElement("path",{d:"M12 7v5l3 2"}))}function Va(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-external",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M14 4h6v6"}),n.createElement("path",{d:"M20 4 10 14"}),n.createElement("path",{d:"M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"}))}function rs(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M18 6 6 18"}),n.createElement("path",{d:"m6 6 12 12"}))}var bu=600*1e3,wu=3,xu={exists:!1,payload:null,backups:[],safetyCopy:null,claim:null,unapproved:[],install:null,nudge:!1},vu=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function Cu(n,e,t,i){var _;let s=new Set(e),a=new Set(t),o=t.filter(C=>!s.has(C)).length,c=e.filter(C=>!a.has(C)).length,d=(_=n.spicetify_config)!=null?_:null,y=!!(i&&!d),f=!y&&(i&&d?!mo(i,d):i!==d),g=[o?`${o} added`:null,c?`${c} removed`:null,f?"Spicetify config changed":null].filter(Boolean),h=bn(n.metadata.last_sync_datetime),S=g.length?`${g.join(", ")} since ${h}`:`Last backup ${h}`;return y?[S,"Spicetify config not saved yet"]:[S]}function Ja(n){return n===1?"1 extension or theme":`${n} extensions and themes`}function bn(n){let e=new Date(n);if(Number.isNaN(e.getTime()))return n;let t=e.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),i=new Date,s=new Date(i);return s.setDate(i.getDate()-1),e.toDateString()===i.toDateString()?`today, ${t}`:e.toDateString()===s.toDateString()?`yesterday, ${t}`:`${e.toLocaleDateString(void 0,{month:"short",day:"numeric",year:e.getFullYear()===i.getFullYear()?void 0:"numeric"})}, ${t}`}function nr(n){var y;let e=Spicetify.React,t=e.useState,{claim:i}=n,[s,a]=t(!1),[o,c]=t(null);async function d(){a(!0),c(null);try{await Jt(fe()),Spicetify.showNotification("Syncify: claim sent for review"),n.onClose()}catch(f){c(f instanceof Error?f.message:String(f)),a(!1)}}return e.createElement("div",{className:"syncify-panel"},e.createElement("p",{className:"syncify-claim-notice"},(y=i.email)!=null?y:"Someone"," is claiming this backup."," ",n.signedIn?i.held?"Syncify is reviewing it.":`It goes through ${cs(i.final_at)} unless you stop it.`:"If that's you, sign in to finish."),o?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},o):null,e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:n.onClose,disabled:s},"Close"),e.createElement("button",{className:n.signedIn?"syncify-button":"syncify-button secondary",type:"button",onClick:()=>{d()},disabled:s},"Not me"),n.signedIn?null:e.createElement("button",{className:"syncify-button",type:"button",onClick:n.onSignIn,disabled:s},"That's me, sign in")))}function tr(n){let e=Spicetify.React;return e.createElement("div",{className:"syncify-panel"},e.createElement("p",{className:"syncify-claim-notice"},"Your backup isn't secured yet. Anyone who knows your Spotify username can restore it or claim it as theirs. Secure it with your email so only you can."),e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:n.onClose},"Not now"),e.createElement("button",{className:"syncify-button",type:"button",onClick:n.onSecure},"Secure")))}var ii="[Syncify]";function ae(n,e){if(e===void 0){console.debug(ii,n);return}console.debug(ii,n,e)}function ot(n,e){if(e===void 0){console.warn(ii,n);return}console.warn(ii,n,e)}function Nu(){var n;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((n=Spicetify==null?void 0:Spicetify.Topbar)!=null&&n.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var sr="syncify-styles";function Iu(){if(document.getElementById(sr)){ae("Another copy of Syncify is running; stopping this one");return}_u();let n=fe();ua({topbarButton:Eu(),menuItem:Du()}),Wt(n.entryPoint),Gi(n.shortcut,oi),Na({onClaim:e=>{Bu(e)},onInstall:$u,onNudge:Ku}).catch(e=>{ot("Startup sync check failed",e)}),Oa().catch(e=>{ot("Restore check failed",e)})}function _u(){let n=document.createElement("style");n.id=sr,n.textContent=Bs,document.head.appendChild(n)}function Eu(){let{extensionName:n}=D(),e=new Spicetify.Topbar.Button(n,ki,t=>{ae("Topbar button clicked",si(t)),oi()},!1,!0);return or(e),Au(e),Uu(e),ae("Topbar button registered",si(e)),e}function or(n){var t;let e=n;n.element.style.setProperty("-webkit-app-region","no-drag"),(t=e.button)==null||t.style.setProperty("-webkit-app-region","no-drag")}var ir=".main-actionButtons",Pu=".Root__globalNav, .Root__top-bar",Tu=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function Au(n){if(typeof MutationObserver=="undefined")return;let e=!1,t=null,i=()=>{e=!1,a();let o=n.element,c=document.querySelector(ir);!o||!c||c.contains(o)||(c.prepend(o),Mu(n),or(n),ae("Topbar button re-attached",si(n)))},s=new MutationObserver(()=>{e||(e=!0,setTimeout(i,250))}),a=()=>{var d;if(t!=null&&t.isConnected)return;let o=document.querySelector(ir),c=(d=o==null?void 0:o.closest(Pu))!=null?d:o==null?void 0:o.parentElement;if(s.disconnect(),t=c!=null?c:null,!c){s.observe(document.body,{childList:!0,subtree:!0});return}s.observe(c,{childList:!0,subtree:!0});for(let y=c.parentElement;y;y=y.parentElement)s.observe(y,{childList:!0})};i()}function Mu(n){let e=Lu(n);if(!e||e.className&&e.className!=="undefined")return;let t=Array.from(document.querySelectorAll(Tu)).find(i=>!n.element.contains(i));t!=null&&t.className&&(e.className=t.className)}function Lu(n){return n.button}function Du(){var n;if(typeof((n=Spicetify.Menu)==null?void 0:n.Item)!="function")return null;try{return new Spicetify.Menu.Item(D().extensionName,!1,()=>oi(),Ou())}catch(e){return ot("Failed to create profile menu item",e),null}}function Ou(){return ki.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function Uu(n){Object.assign(window,{SyncifyDebug:{button:n,element:n.element,openModal:oi,inspect:()=>si(n),clickElement:()=>{var e;return(e=n.element)==null?void 0:e.click()},clickInnerButton:()=>{var e;return(e=n.button)==null?void 0:e.click()},clickCallback:()=>n.onClick(n)}})}function si(n){var e,t,i,s,a;return{label:n.label,disabled:n.disabled,isRight:n.isRight,hasElement:!!n.element,elementConnected:(e=n.element)==null?void 0:e.isConnected,elementDisabled:(t=n.element)==null?void 0:t.disabled,elementAriaDisabled:(i=n.element)==null?void 0:i.getAttribute("aria-disabled"),elementClass:(s=n.element)==null?void 0:s.className,appRegion:n.element?getComputedStyle(n.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:n.button?getComputedStyle(n.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:n.element?getComputedStyle(n.element).pointerEvents:null,visibility:n.element?getComputedStyle(n.element).visibility:null,display:n.element?getComputedStyle(n.element).display:null,rect:(a=n.element)==null?void 0:a.getBoundingClientRect().toJSON()}}var U=null;function oi(){if(U!=null&&U.container.isConnected){ae("Closing modal"),Spicetify.PopupModal.hide();return}ae("Opening modal"),vn(Spicetify.React.createElement(ti))}async function Bu(n){let e=await G().catch(()=>null);U!=null&&U.container.isConnected||(ae("Opening claim notice"),vn(Spicetify.React.createElement(nr,{claim:n,signedIn:e!==null,onSignIn:()=>vn(Spicetify.React.createElement(ti,{section:"account"})),onClose:()=>Spicetify.PopupModal.hide()})))}function $u(n){if(U!=null&&U.container.isConnected)return;ae("Opening install notice");let e=()=>Spicetify.PopupModal.hide();vn(Spicetify.React.createElement("div",{className:"syncify-panel"},Spicetify.React.createElement(Ka,{install:n,onDone:e,onClose:e})))}function Ku(){U!=null&&U.container.isConnected||(ae("Opening nudge notice"),wa(),vn(Spicetify.React.createElement(tr,{onSecure:()=>vn(Spicetify.React.createElement(ti,{section:"account",secure:!0})),onClose:()=>Spicetify.PopupModal.hide()})))}function vn(n){var t;(t=U==null?void 0:U.root)==null||t.unmount();let e=document.createElement("div");U={container:e,root:null};try{Spicetify.PopupModal.display({title:D().extensionName,content:e,isLarge:!1})}catch(i){throw ot("Failed to open PopupModal",i),i}Hu(e),Fu(e,n)}function Hu(n){requestAnimationFrame(()=>{let e=ju(n);e==null||e.classList.add("syncify-modal-shell");let t=e==null?void 0:e.querySelector(".main-trackCreditsModal-header h1");if(t&&!t.querySelector(".syncify-modal-mark")){let s=document.createElement("span");s.className="syncify-modal-mark",s.innerHTML=$s,t.prepend(s)}let i=e==null?void 0:e.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');i&&(i.classList.add("syncify-modal-close"),i.setAttribute("aria-label",`Close ${D().extensionName}`),i.title="Close",i.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function ju(n){let e=n.parentElement;for(;e&&e!==document.body;){if(e.querySelector(".main-trackCreditsModal-header"))return e;e=e.parentElement}return n.closest('[class*="trackCreditsModal"]')}function Fu(n,e){try{if(typeof Spicetify.ReactDOM.createRoot=="function"){let t=Spicetify.ReactDOM.createRoot(n);t.render(e),(U==null?void 0:U.container)===n&&(U.root=t),ae("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(e,n),ae("Modal rendered",{renderer:"render"})}catch(t){throw ot("Failed to render modal",t),t}}Da();(function n(){if(!Nu()){setTimeout(n,100);return}ae("Spicetify APIs ready"),Iu()})();})();
