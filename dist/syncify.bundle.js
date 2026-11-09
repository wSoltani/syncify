// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var Ir=Object.defineProperty,Tr=Object.defineProperties;var Pr=Object.getOwnPropertyDescriptors;var Uo=Object.getOwnPropertySymbols;var Ar=Object.prototype.hasOwnProperty,Mr=Object.prototype.propertyIsEnumerable;var Bo=(n,e,t)=>e in n?Ir(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,p=(n,e)=>{for(var t in e||(e={}))Ar.call(e,t)&&Bo(n,t,e[t]);if(Uo)for(var t of Uo(e))Mr.call(e,t)&&Bo(n,t,e[t]);return n},N=(n,e)=>Tr(n,Pr(e));var $o=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var Si=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var Ko=`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="-2.5 -2.5 37 37" aria-hidden="true" focusable="false"><defs><mask id="syncify-mark-gap" maskUnits="userSpaceOnUse" x="-2" y="-2" width="36" height="36"><rect x="-2" y="-2" width="36" height="36" fill="#fff"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></mask></defs><g mask="url(#syncify-mark-gap)"><g transform="rotate(15 16 16)"><path d="M16 16L16 7.4A8.6 8.6 0 0 1 24.6 16Z" fill="#6cd1d1" transform="translate(0.42 -0.42)"/><path d="M16 16L24.6 16A8.6 8.6 0 0 1 16 24.6Z" fill="#efa4c1" transform="translate(0.42 0.42)"/><path d="M16 16L16 24.6A8.6 8.6 0 0 1 7.4 16Z" fill="#d3c48c" transform="translate(-0.42 0.42)"/><path d="M16 16L7.4 16A8.6 8.6 0 0 1 16 7.4Z" fill="#88bcf2" transform="translate(-0.42 -0.42)"/></g></g><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 28.03A12.4 12.4 0 1 1 28.03 19"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91"/></g></svg>
`;var Ur="syncify",dn="state";function ki(){let n;try{n=window.indexedDB}catch(e){return Promise.resolve(null)}return n?new Promise(e=>{let t;try{t=n.open(Ur,1)}catch(i){e(null);return}t.onupgradeneeded=()=>{t.result.createObjectStore(dn)},t.onerror=()=>e(null),t.onblocked=()=>e(null),t.onsuccess=()=>e(t.result)}):Promise.resolve(null)}function bi(n,e){let t=ki().then(i=>new Promise((o,a)=>{if(!i){a(new Error("IndexedDB isn't available."));return}try{let s=i.transaction(dn,n),c=e(s.objectStore(dn));s.oncomplete=()=>{i.close(),o(c.result)},s.onerror=s.onabort=()=>{var d;i.close(),a((d=s.error)!=null?d:new Error("IndexedDB failed."))}}catch(s){i.close(),a(s)}}));return Promise.race([t,new Promise((i,o)=>setTimeout(()=>o(new Error("IndexedDB took too long.")),2e3))])}function yn(n){return bi("readonly",e=>e.get(n))}async function fn(n,e){await bi("readwrite",t=>t.put(e,n))}async function Ho(n){await bi("readwrite",e=>e.delete(n))}var be={extensionName:"Syncify",version:"1.16.0",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",discordUrl:"https://syncify.wsoltani.com/discord",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com",shareUrl:"https://syncs.wsoltani.com"};function L(){var e,t,i,o,a,s,c,d,y,f;let n=window.SyncifyConfig;return{extensionName:(e=Le(n==null?void 0:n.extensionName))!=null?e:be.extensionName,version:(t=jo(n==null?void 0:n.version))!=null?t:be.version,workerUrl:(i=Le(n==null?void 0:n.workerUrl))!=null?i:be.workerUrl,webUrl:(o=Le(n==null?void 0:n.webUrl))!=null?o:be.webUrl,githubUrl:(a=Le(n==null?void 0:n.githubUrl))!=null?a:be.githubUrl,kofiUrl:(s=Le(n==null?void 0:n.kofiUrl))!=null?s:be.kofiUrl,discordUrl:(c=Le(n==null?void 0:n.discordUrl))!=null?c:be.discordUrl,issueUrl:(d=Le(n==null?void 0:n.issueUrl))!=null?d:be.issueUrl,releasesUrl:(y=Le(n==null?void 0:n.releasesUrl))!=null?y:be.releasesUrl,shareUrl:(f=Le(n==null?void 0:n.shareUrl))!=null?f:be.shareUrl}}function Le(n){return jo(n)}function jo(n){return typeof n=="string"&&n.trim()?n.trim():null}var Br="x-syncify-version",$r="x-syncify-install",Kr="x-syncify-timezone",Fo="install-id",Yo="syncify:install-id",Hr=2e3,xt=null;async function Wo(){let n={[Br]:L().version,[$r]:(await wi()).id},e=Yr();return e&&(n[Kr]=e),n}function wi(){return xt!=null||(xt=jr().catch(()=>({id:vt(),inDatabase:!1}))),xt}async function jr(){let n=await Promise.race([Fr(),new Promise(e=>setTimeout(()=>e(null),Hr))]);if(n)return{id:n,inDatabase:!0};try{let e=window.localStorage.getItem(Yo);if(e&&zo(e))return{id:e,inDatabase:!1};let t=vt();return window.localStorage.setItem(Yo,t),{id:t,inDatabase:!1}}catch(e){return{id:vt(),inDatabase:!1}}}async function Fr(){let n=await ki();return n?new Promise(e=>{let t=null;try{let i=n.transaction(dn,"readwrite"),o=i.objectStore(dn),a=o.get(Fo);a.onsuccess=()=>{if(typeof a.result=="string"&&zo(a.result)){t=a.result;return}t=vt(),o.put(t,Fo)},i.oncomplete=()=>{n.close(),e(t)},i.onerror=i.onabort=()=>{n.close(),e(null)}}catch(i){n.close(),e(null)}}):null}function vt(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let n=crypto.getRandomValues(new Uint8Array(16));n[6]=n[6]&15|64,n[8]=n[8]&63|128;let e=[...n].map(t=>t.toString(16).padStart(2,"0"));return[e.slice(0,4).join(""),e.slice(4,6).join(""),e.slice(6,8).join(""),e.slice(8,10).join(""),e.slice(10).join("")].join("-")}function zo(n){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(n)}function Yr(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(n){return null}}var Wr="syncify-signature-v1",zr={name:"ECDSA",hash:"SHA-256"};function Ct(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function Nt(n){return xi(new Uint8Array(await crypto.subtle.exportKey("raw",n)))}async function Dn(n,e,t,i,o){let a=await qr(e,t,i,o),s=await crypto.subtle.sign(zr,n,a);return xi(new Uint8Array(s))}async function qr(n,e,t,i){let{pathname:o,search:a}=new URL(t),s=new TextEncoder,c=xi(new Uint8Array(await crypto.subtle.digest("SHA-256",s.encode(i))));return s.encode([Wr,n,e.toUpperCase(),o+a,c].join(`
`))}function xi(n){let e="";for(let t=0;t<n.length;t++)e+=String.fromCharCode(n[t]);return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var qo="device-key",vi="session",Go="salt",Re=null,Ln,Vo={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function pn(n){if(Re)return Re;let e=await yn(qo);return Gr(e)?(Re=Promise.resolve(e),e):n?(Re=Ct().then(async t=>(await fn(qo,t),t)),Re.catch(()=>{Re=null}),Re):null}async function se(){let n=await yn(vi);return Vr(n)?n:null}function Ci(n){return fn(vi,n)}async function Qe(){await Ho(vi).catch(()=>{})}async function _t(){if(Ln===void 0){let n=await yn(Go).catch(()=>{});Ln=typeof n=="string"?n:null}return Ln}async function Et(n){n!==Ln&&(Ln=n,await fn(Go,n).catch(()=>{}))}function It(){return Vo}function Jo(n){Vo=n}function Gr(n){let e=n;return!!(e&&e.privateKey instanceof CryptoKey&&e.publicKey instanceof CryptoKey)}function Vr(n){let e=n;return!!(e&&typeof e.token=="string"&&e.token&&typeof e.email=="string")}var Xo="install-key",mn=null;function Zo(){return mn!=null||(mn=Jr()),mn.catch(()=>{mn=null}),mn.catch(()=>null)}async function Jr(){if(!(await wi()).inDatabase)return null;let n=await yn(Xo),e=Zr(n)?n:await Xr();return{privateKey:e.privateKey,publicKey:await Nt(e.publicKey)}}async function Xr(){let n=await Ct();return await fn(Xo,n),n}function Zr(n){let e=n;return!!(e&&e.privateKey instanceof CryptoKey&&e.publicKey instanceof CryptoKey)}var Rr="/api/auth/email-otp/send-verification-otp",Qr="/api/auth/sign-in/email-otp",ec="/api/auth/get-session",nc="/api/auth/sign-out",tc="/api/auth/link",ic="x-syncify-device-key",oc="x-syncify-signature",Ro="x-syncify-salt",sc="none",ac={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again.",link_failed:"Couldn't open the website. Try again."},v=class extends Error{constructor(t,i=null,o=null){var a;super((a=ac[t])!=null?a:"Sign-in failed. Try again.");this.code=t;this.retryAfter=i;this.share=o;this.name="AccountError"}};function en(n){return n instanceof v?n.message:"Sign-in failed. Try again."}async function Qo(n,e={}){let t=await Un(Rr,{method:"POST",body:JSON.stringify(p({email:n,type:"sign-in"},e.nudge?{nudge:!0}:{}))});return typeof(t==null?void 0:t.resend_in)=="number"?t.resend_in:60}async function es(n,e){var a;let t=await pn(!0).catch(()=>{throw new v("no_device_key")}),i=await Un(Qr,{method:"POST",body:JSON.stringify({email:n,otp:e}),keys:t,sendPublicKey:!0});if(typeof(i==null?void 0:i.token)!="string"||!i.token)throw new v("sign_in_failed");let o={token:i.token,email:typeof((a=i.user)==null?void 0:a.email)=="string"?i.user.email:n};return await Ci(o).catch(()=>{throw new v("no_device_key")}),Ni=!0,o}var Ni=!1;async function ns(){var e;let n=await se();if(!n||Ni)return n;try{let t=await Tt(n,ec,"GET");Ni=!0;let i=(e=t==null?void 0:t.user)==null?void 0:e.email;if(typeof i!="string"||i===n.email)return n;let o=N(p({},n),{email:i});return await Ci(o).catch(()=>{}),o}catch(t){if(t instanceof v&&t.code==="signed_out")return null;throw t}}async function ts(){let n=await se().catch(()=>null);n&&await Tt(n,nc,"POST").catch(()=>{}),await Qe()}async function is(){let n=await se();if(!n)throw new v("signed_out");let e=await Tt(n,tc,"POST"),t=typeof(e==null?void 0:e.url)=="string"?e.url:"",i=new URL(L().webUrl).origin;if(!t.startsWith(`${i}/link#`))throw new v("link_failed");return t}async function On(n,e,t){let i=await se();if(!i)throw new v("signed_out");return Tt(i,n,e,t)}async function os(n,e,t){let i=await se().catch(()=>null),o=i?await pn(!1).catch(()=>null):null;await Un(n,p({method:"POST",body:JSON.stringify(e),headers:t,keepalive:!0},i&&o?{token:i.token,keys:o}:{}))}async function Tt(n,e,t,i){let o=await pn(!1);if(!o)throw await Qe(),new v("signed_out");return Un(e,p({method:t,token:n.token,keys:o},i===void 0?{}:{body:JSON.stringify(i)}))}async function Un(n,e,t=!1){var g,h,S;let i=`${L().webUrl.replace(/\/+$/,"")}${n}`,o=p({},e.headers);if(e.body!==void 0&&(o["content-type"]="application/json"),e.token&&(o.authorization=`Bearer ${e.token}`),e.keys){let E=(g=await _t())!=null?g:sc;o[Ro]=E,o[oc]=await Dn(e.keys.privateKey,E,e.method,i,(h=e.body)!=null?h:""),e.sendPublicKey&&(o[ic]=await Nt(e.keys.publicKey))}let a;try{a=await fetch(i,{method:e.method,headers:o,body:e.body,keepalive:e.keepalive})}catch(E){throw new v("offline")}let s=a.headers.get(Ro);s&&await Et(s);let c=await a.json().catch(()=>null);if(a.ok)return c;let d=typeof(c==null?void 0:c.code)=="string"?c.code:a.status===503?"unavailable":"failed";if(d==="stale_salt"&&e.keys&&!t)return Un(n,e,!0);d==="signed_out"&&await Qe();let y=Number(a.headers.get("retry-after")),f=c==null?void 0:c.share;throw new v(d,Number.isFinite(y)&&y>0?y:(S=rc[d])!=null?S:null,typeof(f==null?void 0:f.code)=="string"?{code:f.code,link:typeof f.link=="string"?f.link:null}:null)}var rc={resend_wait:60,too_many_requests:60,send_failed:60};var cc="x-syncify-user-hash",lc="x-syncify-identity",uc="x-syncify-signature",dc="x-syncify-install-key",yc="x-syncify-install-signature",_i="x-syncify-salt",fc="none",pc="/restores",mc="/installs",gc="hash",ss=3,Bn=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}},we=class extends Error{constructor(t){super(t==="not_linked"?"Couldn't read that Spotify account's backups.":"Sign in to restore this backup.");this.code=t;this.name="LockedError"}},nn=class extends Error{constructor(){super("This Spotify account doesn't accept backups from this install. Sign in to back up."),this.name="InstallRefusedError"}};async function rs(n,e,t){var a;let i=await je(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(t)});if(i.status===403&&((a=await i.json().catch(()=>null))==null?void 0:a.code)==="install_refused")throw new nn;if(!i.ok)throw new Error(`Backup failed with HTTP ${i.status}.`);let o=await i.json().catch(()=>null);return{unchanged:(o==null?void 0:o.unchanged)===!0,unapproved:(o==null?void 0:o.quarantined)===!0}}async function cs(n,e,t,i){let o=await je(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({install:t,action:i})},mc);if(o.ok)return;let a=await o.json().catch(()=>null);if((a==null?void 0:a.code)!=="not_pending")throw new Error(`Couldn't answer with HTTP ${o.status}.`)}async function Ei(n,e,t){var S,E,C,P;let i=await je(n,e,{method:"GET"},us("/",t));if(i.status===404){let I=await i.json().catch(()=>null);return{exists:!1,payload:null,backups:[],safetyCopy:null,claim:$n(I==null?void 0:I.claim),unapproved:[],install:as(I==null?void 0:I.install),nudge:!1}}if(!i.ok)throw new Error(`Restore failed with HTTP ${i.status}.`);let o=await i.json(),a=$n(o.claim),s=as(o.install),c=o.nudge===!0;delete o.claim,delete o.install,delete o.nudge;let d=[o,...(S=o.backup_history)!=null?S:[]];if(!d.every(I=>I.backup))return{exists:!0,payload:o,backups:d.slice(0,ss),safetyCopy:(E=d[ss])!=null?E:null,claim:a,unapproved:[],install:s,nudge:c};let y=d.filter(I=>{var T;return((T=I.backup)==null?void 0:T.kind)==="rolling"}),f=(C=d.find(I=>{var T;return((T=I.backup)==null?void 0:T.kind)==="anchor"}))!=null?C:null,g=d.filter(I=>{var T;return((T=I.backup)==null?void 0:T.kind)==="quarantined"}),h=(P=y[0])!=null?P:f;return h?y.length===0&&f?{exists:!0,payload:h,backups:[f],safetyCopy:null,claim:a,unapproved:g,install:s,nudge:c}:{exists:!0,payload:h,backups:y,safetyCopy:f,claim:a,unapproved:g,install:s,nudge:c}:{exists:!1,payload:null,backups:[],safetyCopy:null,claim:a,unapproved:g,install:s,nudge:c}}async function ls(n,e,t,i){try{await je(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:t}),keepalive:!0},us(pc,i))}catch(o){}}async function je(n,e,t,i="",o=!1){var C,P,I,T,z;let a=i?`${n.replace(/\/+$/,"")}${i}`:n,s=(C=t.method)!=null?C:"GET",c=await se().catch(()=>null),d=c?await pn(!1).catch(()=>null):null,y=await Zo(),f={},g=(P=await _t())!=null?P:fc;c&&d&&(f.authorization=`Bearer ${c.token}`,f[_i]=g,f[uc]=await Dn(d.privateKey,g,s,a,(I=t.body)!=null?I:"")),y&&(f[_i]=g,f[dc]=y.publicKey,f[yc]=await Dn(y.privateKey,g,s,a,(T=t.body)!=null?T:""));let h=await fetch(a,N(p({},t),{headers:p(N(p(p({},t.headers),await Wo()),{[cc]:e.hash,[lc]:e.field}),f)})),S=h.headers.get(_i);if(S&&await Et(S),h.status===426)throw new Bn;if(h.status!==401)return h;let E=(z=await h.clone().json().catch(()=>null))==null?void 0:z.code;if(!o){if(E==="stale_salt"&&(c||y))return je(n,e,t,i,!0);if(E==="signed_out"&&c)return await Qe(),je(n,e,t,i,!0)}throw E==="claimed"||E==="not_owner"||E==="not_linked"?new we(E):(E==="signed_out"&&await Qe(),new v(typeof E=="string"?E:"failed"))}function us(n,e){return e?`${n}?${gc}=${encodeURIComponent(e)}`:n}function as(n){let e=n;if(!e||typeof e.trust!="string")return null;let t=Array.isArray(e.waiting)?e.waiting:[];return{trusted:e.trust!=="pending"&&e.trust!=="rejected",refused:e.trust==="rejected",waiting:t.flatMap(i=>{let o=i;return o&&typeof o.id=="string"&&typeof o.first_seen_at=="number"?[{id:o.id,device:typeof o.device=="string"?o.device:null,first_seen_at:o.first_seen_at}]:[]})}}function $n(n){let e=n;return!e||typeof e.mine!="boolean"?null:e.status==="final"?{status:"final",mine:e.mine}:e.status!=="pending"||typeof e.final_at!="number"?null:p({status:"pending",mine:e.mine,email:typeof e.email=="string"?e.email:null,final_at:e.final_at,held:e.held===!0},e.not_me===!0?{not_me:!0}:{})}async function Pt(n){let e=new TextEncoder().encode(n),t=await crypto.subtle.digest("SHA-256",e);return[...new Uint8Array(t)].map(i=>i.toString(16).padStart(2,"0")).join("")}function Kn(n){return JSON.stringify(Ii(n))}function Ii(n){return Array.isArray(n)?n.map(Ii):n&&typeof n=="object"?Object.keys(n).sort().reduce((e,t)=>(e[t]=Ii(n[t]),e),{}):n}function ds(){let n=navigator.userAgent;return/Windows/i.test(n)?"Windows":/Mac OS|Macintosh/i.test(n)?"macOS":/Linux/i.test(n)?"Linux":n}var hc=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,Sc=100,kc="marketplace:installed-extensions",bc="marketplace:installed-themes",wc="marketplace:theme-installed",xc="marketplace:installed:",vc="marketplace";function Pi(n){return Spicetify.Config?Ai(Spicetify.Config,n):null}function Ai(n,e){var a;let t=Fe(n),i=new Set(Cc(e)),o=((a=e[wc])==null?void 0:a.includes(xc))===!0;return{current_theme:o?vc:t.current_theme,color_scheme:o?"":t.color_scheme,extensions:t.extensions.filter(s=>!i.has(s)),custom_apps:t.custom_apps}}function Fe(n){let e=n&&typeof n=="object"?n:{};return{current_theme:Ti(e.current_theme)?e.current_theme:"",color_scheme:Ti(e.color_scheme)?e.color_scheme:"",extensions:ys(e.extensions),custom_apps:ys(e.custom_apps)}}function ms(n,e){return Kn(Fe(n))===Kn(Fe(e))}function ys(n){return Array.isArray(n)?[...new Set(n.filter(Ti))].sort().slice(0,Sc):[]}function Ti(n){return typeof n=="string"&&hc.test(n)}function Cc(n){let e=fs(n[kc]).map(i=>{var a;let o=(a=ps(n[i]))==null?void 0:a.manifest;return o&&typeof o=="object"?o.main:void 0}),t=fs(n[bc]).flatMap(i=>{var a;let o=(a=ps(n[i]))==null?void 0:a.include;return Array.isArray(o)?o:[]});return[...e,...t].flatMap(i=>{let o=typeof i=="string"?i.split("/").pop():void 0;return o?[o]:[]})}function fs(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function ps(n){try{let e=n?JSON.parse(n):null;return e&&typeof e=="object"&&!Array.isArray(e)?e:null}catch(e){return null}}var Nc=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],_c="marketplace:installed:",gs=`${_c}snippet:`,Ec="wsoltani/syncify",Ic="marketplace",hs={added:0,removed:1,unchanged:2};function G(n){let e=new Map;for(let[t,i]of Nc)for(let o of Mc(n[t]))e.has(o)||e.set(o,Pc(o,i,n[o]));return[...e.values()]}function Hn(n,e,t,i){let o=new Set(n.map(d=>d.key)),a=new Map(t.map(d=>[d.key,d])),s=[...n.map(d=>{let y=a.get(d.key);return N(p({},d),{change:y?"unchanged":"added",isNew:!y||y.sources.join(" ")!==d.sources.join(" ")})}),...t.filter(d=>!o.has(d.key)).map(d=>N(p({},d),{change:jn(d,n)?"unchanged":"removed",isNew:!1}))].sort((d,y)=>hs[d.change]-hs[y.change]||d.name.localeCompare(y.name)),c={added:0,removed:0,unchanged:0};for(let d of s)c[d.change]+=1;return{items:s,counts:c,manual:Tc(e,i)}}function jn(n,e){return n.type==="extension"&&Mt(n)&&!e.some(Mt)}function Mt(n){var e;return((e=n.repo)==null?void 0:e.toLowerCase())===Ec}function Tc(n,e){if(!n)return[];let t=Fe(n),i=Fe(e),o=[...t.extensions.filter(s=>!i.extensions.includes(s)).map(s=>({type:"extension",name:s})),...t.custom_apps.filter(s=>!i.custom_apps.includes(s)).map(s=>({type:"custom_app",name:s}))],a=t.current_theme;return a&&a!==Ic&&(a!==i.current_theme||t.color_scheme!==i.color_scheme)&&o.push(p({type:"theme",name:a},t.color_scheme?{scheme:t.color_scheme}:{})),o}function Pc(n,e,t){var d,y;let i=Ss(t),o=Ss(i==null?void 0:i.manifest),a=At(i==null?void 0:i.user),s=At(i==null?void 0:i.repo),c=(y=(d=At(i==null?void 0:i.title))!=null?d:At(o==null?void 0:o.name))!=null?y:n.startsWith(gs)?n.slice(gs.length):n.split("/").pop()||n;return{key:n,type:e,name:c,repo:e!=="snippet"&&a&&s?`${a}/${s}`:null,sources:Ac(e,i),custom:e==="snippet"&&(i==null?void 0:i.custom)===!0}}function Ac(n,e){return e?(n==="extension"?[e.extensionURL]:n==="theme"?[e.cssURL,e.schemesURL,...Array.isArray(e.include)?e.include:[]]:[]).filter(i=>typeof i=="string"&&i!==""):[]}function At(n){return typeof n=="string"&&n.trim()?n.trim():null}function Mc(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function Ss(n){let e=n;if(typeof n=="string")try{e=JSON.parse(n)}catch(t){return null}return e&&typeof e=="object"&&!Array.isArray(e)?e:null}var Dt="spicetify-marketplace";var Fn="settings";async function ks(){let n=await xs();if(n.kind!=="ok")return null;try{let e=await vs(n.db,"readonly",i=>i.getAll());if(!e)return null;let t={};for(let i of e)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(t[i.key]=i.value);return t}finally{n.db.close()}}async function bs(n,e=[]){let t=await xs();if(t.kind==="unavailable")return"unavailable";let i=t.kind==="ok"?t.db:await Dc();if(!i)return"failed";try{return await vs(i,"readwrite",a=>{let s;for(let[c,d]of Object.entries(n))s=a.put({key:c,value:d});for(let c of e)s=a.delete(c);return s})===null?"failed":"written"}finally{i.close()}}function ws(){var n;try{return(n=window.indexedDB)!=null?n:null}catch(e){return null}}async function xs(){let n=ws();return n?await Lc(n)?{kind:"missing"}:new Promise(e=>{let t=!1,i=n.open(Dt);i.onupgradeneeded=()=>{t=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),e({kind:"unavailable"})},i.onblocked=()=>e({kind:"unavailable"}),i.onsuccess=()=>{let o=i.result;if(t){o.close(),Oc(n).then(()=>e({kind:"missing"}));return}if(!o.objectStoreNames.contains(Fn)){o.close(),e({kind:"unavailable"});return}e({kind:"ok",db:o})}}):{kind:"unavailable"}}function Dc(){let n=ws();return n?new Promise(e=>{let t=n.open(Dt,1);t.onupgradeneeded=()=>{let i=t.result;i.objectStoreNames.contains(Fn)||i.createObjectStore(Fn,{keyPath:"key"})},t.onerror=()=>{console.warn("Syncify could not create Marketplace storage",t.error),e(null)},t.onblocked=()=>e(null),t.onsuccess=()=>e(t.result)}):Promise.resolve(null)}async function Lc(n){if(typeof n.databases!="function")return!1;try{return!(await n.databases()).some(t=>t.name===Dt)}catch(e){return!1}}function Oc(n){return new Promise(e=>{let t=n.deleteDatabase(Dt);t.onsuccess=()=>e(),t.onerror=()=>e(),t.onblocked=()=>e()})}function vs(n,e,t){return new Promise(i=>{let o;try{o=n.transaction(Fn,e)}catch(y){console.warn("Syncify could not open a Marketplace transaction",y),i(null);return}let a,s=!1,c=y=>{s||(s=!0,i(y))};o.oncomplete=()=>c(a),o.onerror=()=>{console.warn("Syncify Marketplace transaction failed",o.error),c(null)},o.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",o.error),c(null)};let d;try{d=t(o.objectStore(Fn))}catch(y){console.warn("Syncify Marketplace request could not be issued",y),c(null);return}d&&(d.onsuccess=()=>{a=d.result},d.onerror=()=>{console.warn("Syncify Marketplace request failed",d.error),c(null)})})}var Mi="marketplace:",Ot=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function ye(){let n=Wc(),e=await ks();if(e)for(let[t,i]of Object.entries(e))t.startsWith(Mi)&&(n[t]=i);return n}var Bc=new Set(["marketplace:active-tab","marketplace:sort"]),Di="marketplace:installed:",Lt="marketplace:theme-installed",$c=["stars","tags","lastUpdated","created"];async function Ut(n,e){let t={};for(let[i,o]of Object.entries(n))Bc.has(i)||(t[i]=i.startsWith(Di)?Kc(o):o);return e&&(t.spicetify_config=Fe(e)),Pt(Kn(t))}function Kc(n){try{let e=JSON.parse(n);if(!e||typeof e!="object"||Array.isArray(e))return n;for(let t of $c)delete e[t];return e}catch(e){return n}}async function Bt(){let n=await ye(),e=Pi(n);return{keyCount:Object.keys(n).length,hash:await Ut(n,e),installedItemCount:Fc(n),installedItems:$t(n),items:G(n),spicetifyConfig:e,marketplaceAvailable:Yc(n),activeTheme:Yn(n[Lt])}}function Yn(n){if(!n)return null;if(n.startsWith(Di))return n;try{let e=JSON.parse(n);return typeof e=="string"?e:null}catch(e){return null}}async function Cs(){let n=await ye(),e=Pi(n);return p({schema_version:2,metadata:{last_sync_datetime:new Date().toISOString(),device_info:ds(),marketplace_key_count:Object.keys(n).length},payload_hash:await Ut(n,e),marketplace_data:{keys:n}},e?{spicetify_config:e}:{})}async function Ns(n,e=[]){var a,s;let t={},i=(s=(a=n.marketplace_data)==null?void 0:a.keys)!=null?s:{};for(let[c,d]of Object.entries(i))c.startsWith(Mi)&&(t[c]=d);if(Object.keys(t).length===0)return 0;await Hc(t),e.length>0&&await jc(t,e);let o=Oi(await ye(),t);return await Li(t,o),Object.keys(t).length}async function Li(n,e=[]){for(let[i,o]of Object.entries(n))window.localStorage.setItem(i,o);for(let i of e)window.localStorage.removeItem(i);if(await bs(n,e)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try again.")}function Oi(n,e){let t=new Set(Ot.flatMap(s=>{var c;return Kt((c=e[s])!=null?c:n[s]).map(String)})),i=$t(n).filter(s=>s.startsWith(Di)&&!t.has(s)),o=i.filter(s=>n[s]!==void 0&&e[s]===void 0),a=n[Lt];return a&&e[Lt]===void 0&&i.some(s=>a.includes(s))&&o.push(Lt),o}async function Hc(n){let e=await ye(),t=G(n),i=G(e).filter(s=>jn(s,t));if(i.length===0)return;let o="marketplace:installed-extensions",a=Kt(n[o]).map(String);for(let s of i)a.includes(s.key)||a.push(s.key),n[s.key]=e[s.key];n[o]=JSON.stringify(a)}async function jc(n,e){let t=await ye(),i=$t(t);for(let o of Ot){if(n[o]===void 0)continue;let a=Kt(n[o]).map(String).filter(s=>!e.includes(s)||i.includes(s));n[o]=JSON.stringify(a)}for(let o of e)t[o]!==void 0?n[o]=t[o]:delete n[o]}function Fc(n){return $t(n).length}function $t(n){return Ot.flatMap(e=>Kt(n[e]).map(String))}function Yc(n){return!!(window.Marketplace||Ot.some(t=>n[t]!==void 0)||n["marketplace:tabs"]!==void 0)}function _s(n,e){return e===0?!1:n===0?!0:n<Math.max(2,Math.floor(e*.5))}function Wc(){let n={};for(let e=0;e<window.localStorage.length;e+=1){let t=window.localStorage.key(e);if(!(t!=null&&t.startsWith(Mi)))continue;let i=window.localStorage.getItem(t);i!==null&&(n[t]=i)}return n}function Kt(n){if(!n)return[];try{let e=JSON.parse(n);return Array.isArray(e)?e:[]}catch(e){return[]}}var zc="raw.githubusercontent.com",qc="cdn.jsdelivr.net",Es=".github.io";function Bi(n){var t;if(n.protocol!=="https:")return null;let e=n.pathname.split("/").filter(Boolean);if(n.host===zc)return Ui(e[0],e[1]);if(n.host===qc)return e[0]==="gh"?Ui(e[1],(t=e[2])==null?void 0:t.split("@")[0]):null;if(n.host.endsWith(Es)){let i=n.host.slice(0,-Es.length);return i.includes(".")?null:Ui(i,e.length>1?e[0]:n.host)}return null}function Ui(n,e){return n&&e?`${n}/${e}`:null}var Gc={extension:"spicetify-extensions",theme:"spicetify-themes"},Vc="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",Jc="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",Xc="https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/",Zc="https://api.github.com/repos",Rc=5e3,Qc=20,Is="syncify:repo-topics",Ts=10080*60*1e3,el=200;function Ye(n){return(n==null?void 0:n.kind)==="host"||(n==null?void 0:n.kind)==="repo"||(n==null?void 0:n.kind)==="blocked"||(n==null?void 0:n.kind)==="catalog"}function qn(n){let e=new Map;for(let t of n){if(t.change==="removed")continue;if(t.custom){e.set(t.key,{kind:"custom"});continue}let i=nl(t);i&&e.set(t.key,i)}return e}async function Gn(n,e){let t=new Map,i=n.filter(s=>s.change!=="removed"&&s.isNew&&!e.has(s.key));if(i.length===0)return t;let o=i.filter(s=>s.type==="snippet"),a=i.filter(s=>s.type!=="snippet");if(o.length>0){let s=await $i();for(let c of o)s?Ht(s,c.name)||t.set(c.key,{kind:"catalog"}):t.set(c.key,{kind:"unchecked"})}if(a.length>0){let s=await ol(),c=rl(),d=0;await Promise.all(a.map(async y=>{let f=tl(y),g=Gc[y.type];if(!f||!g)return;if(s===null){t.set(y.key,{kind:"unchecked"});return}if(il(f,s)){t.set(y.key,{kind:"blocked"});return}let h=al(c,f);h===void 0&&d<Qc&&(d+=1,h=await sl(f),h!==void 0&&(c[f.toLowerCase()]={topics:h,at:Date.now()})),h===void 0?t.set(y.key,{kind:"unchecked"}):(h===null||!h.includes(g))&&t.set(y.key,{kind:"catalog"})})),cl(c)}return t}function nl(n){let e=null;for(let t of n.sources){let i;try{i=new URL(t)}catch(a){return{kind:"host",host:t.slice(0,40)}}let o=Bi(i);if(!o)return{kind:"host",host:i.host};n.repo&&o.toLowerCase()!==n.repo.toLowerCase()&&(e!=null||(e=o))}return e?{kind:"repo",repo:e}:null}function tl(n){for(let e of n.sources)try{let t=Bi(new URL(e));if(t)return t}catch(t){}return n.repo}function il(n,e){let t=`https://github.com/${n}`.toLowerCase();return e.some(i=>{let o=i.toLowerCase();if(!o.includes("*"))return o===t;let a=o.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${a}$`).test(t)})}function Ps(n){return n.replace(/\n/g,"").trim().toLowerCase()}function Ht(n,e){return n.get(Ps(e))}var Wn=null,zn=null;function ol(){return Wn!=null||(Wn=As(Vc).then(n=>{let e=n==null?void 0:n.repos;return Array.isArray(e)?e.filter(t=>typeof t=="string"&&!t.startsWith("//")):(Wn=null,null)})),Wn}function $i(){return zn!=null||(zn=As(Jc).then(n=>{if(!Array.isArray(n))return zn=null,null;let e=new Map;for(let t of n){if(typeof(t==null?void 0:t.title)!="string"||typeof t.code!="string")continue;let i=typeof t.preview=="string"?t.preview:null;e.set(Ps(t.title),p({title:t.title,code:t.code,description:typeof t.description=="string"?t.description:""},i?{imageURL:i.startsWith("http")?i:`${Xc}${i}`}:{}))}return e})),zn}async function sl(n){let e=await Ms(`${Zc}/${n}`);if((e==null?void 0:e.status)===404)return null;if(!(e!=null&&e.ok))return;let t=await e.json().catch(()=>null);return Array.isArray(t==null?void 0:t.topics)?t.topics.filter(i=>typeof i=="string"):void 0}async function As(n){let e=await Ms(n);return e!=null&&e.ok?e.json().catch(()=>null):null}async function Ms(n){let e=typeof AbortController=="function"?new AbortController:null,t=setTimeout(()=>e==null?void 0:e.abort(),Rc);try{return await fetch(n,{signal:e==null?void 0:e.signal})}catch(i){return null}finally{clearTimeout(t)}}function al(n,e){let t=n[e.toLowerCase()];return t&&Date.now()-t.at<Ts?t.topics:void 0}function rl(){var n;try{let e=JSON.parse((n=localStorage.getItem(Is))!=null?n:"{}");return e&&typeof e=="object"?e:{}}catch(e){return{}}}function cl(n){let e=Date.now(),t=Object.entries(n).filter(([,i])=>e-i.at<Ts).sort(([,i],[,o])=>o.at-i.at).slice(0,el);try{localStorage.setItem(Is,JSON.stringify(Object.fromEntries(t)))}catch(i){}}var ll=/^[0-9A-HJKMNP-TV-Z]{6}$/,ul=6,dl="SYN-",Us=60,Ki=20,Bs=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],yl="marketplace:installed:",Gd=`${yl}snippet:`,tn="marketplace:theme-installed",Ds="marketplace",Ls={added:0,removed:1,unchanged:2},fl=new RegExp(`^[a-z0-9][a-z0-9_-]{1,${Ki-2}}[a-z0-9]$`);function $s(n){let e=n.trim().replace(/^@/,"").toLowerCase();return/[^a-z0-9_-]/.test(e)?"Only letters, digits, _ and -":e.length<3?"At least 3 characters":!/^[a-z0-9]/.test(e)||!/[a-z0-9]$/.test(e)?"Start and end with a letter or digit":null}function xe(n){return`${dl}${n}`}function Ks(n){let e=n.trim();if(e.length>200)return null;if(e.includes("/")){let i=e.split(/[?#]/)[0].replace(/\/+$/,"");e=i.slice(i.lastIndexOf("/")+1).replace(/\.json$/i,"")}e=e.toUpperCase().replace(/[\s-]/g,""),e.length===ul+3&&e.startsWith("SYN")&&(e=e.slice(3));let t=e.replace(/O/g,"0").replace(/[IL]/g,"1");return ll.test(t)?t:null}function Hs(n){let e=n;return!e||typeof e.code!="string"||!e.keys||typeof e.keys!="object"||!Object.values(e.keys).every(t=>typeof t=="string")?null:{code:e.code,name:typeof e.name=="string"&&e.name?e.name:null,creator:typeof e.creator=="string"&&fl.test(e.creator)?e.creator:null,updated_at:typeof e.updated_at=="number"?e.updated_at:0,keys:e.keys}}async function js(n,e){let t=n.filter(s=>!Mt(s)).map(s=>N(p({},s),{change:"added",isNew:!0})),i=qn(t);for(let s of t)!i.has(s.key)&&!pl(s,e[s.key])&&i.set(s.key,{kind:"catalog"});let o=await Gn(t,i),a=new Map;for(let[s,c]of[...o,...i])c.kind!=="unchecked"&&a.set(s,c);return{items:t,leftOut:a}}function pl(n,e){if(n.type==="snippet")return!0;if(!n.repo)return!1;let t=hl(e);return n.type==="extension"?typeof(t==null?void 0:t.extensionURL)=="string"&&t.extensionURL!=="":typeof(t==null?void 0:t.cssURL)=="string"&&t.cssURL!==""}function Fs(n,e){let t={};for(let[o,a]of Bs){let s=e.filter(c=>c.type===a&&n[c.key]!==void 0).map(c=>c.key);t[o]=JSON.stringify(s);for(let c of s)t[c]=n[c]}let i=Yn(n[tn]);return i&&e.some(o=>o.key===i)&&(t[tn]=n[tn]),t}function Ys(n,e,t,i,o,a){let s=a==="replace"?Hn(e,void 0,t,i):ml(e,t),c=Yn(n.keys[tn]),d=c!==null&&e.some(f=>f.key===c)&&i!==null&&i.current_theme!==Ds,y=c!==null&&c!==o?e.find(f=>f.key===c):void 0;return p(N(p({},s),{manual:d?[{type:"theme",name:Ds}]:[]}),y?{theme:{key:y.key,name:y.name}}:{})}function ml(n,e){let t=new Set(e.map(s=>s.key)),i=new Set(n.map(s=>s.key)),o=[...n.map(s=>t.has(s.key)?N(p({},s),{change:"unchanged",isNew:!1}):N(p({},s),{change:"added",isNew:!0})),...e.filter(s=>!i.has(s.key)).map(s=>N(p({},s),{change:"unchanged",isNew:!1}))].sort((s,c)=>Ls[s.change]-Ls[c.change]||s.name.localeCompare(c.name)),a={added:0,removed:0,unchanged:0};for(let s of o)a[s.change]+=1;return{items:o,counts:a,manual:[]}}function Ws(n,e){return new Set(n.items.filter(t=>t.type==="snippet"&&t.change==="added"&&(!e||!Ht(e,t.name))).map(t=>t.key))}async function zs(n,e,t,i){let o=await ye(),a=G(o),s=G(n.keys),c={};for(let[g,h]of Bs){let S=Os(o[g]),C=[...e==="add"?S:S.filter(P=>t.includes(P)||a.some(I=>I.key===P&&jn(I,s)))];for(let P of s){if(P.type!==h||t.includes(P.key))continue;let I=S.includes(P.key);if(e==="add"&&I)continue;let T=h==="snippet"?gl(P,i,o[P.key]):n.keys[P.key];T!==void 0&&(c[P.key]=T,C.includes(P.key)||C.push(P.key))}c[g]=JSON.stringify(C)}let d=Yn(n.keys[tn]),y=Os(c["marketplace:installed-themes"]);d&&y.includes(d)&&!t.includes(d)&&(c[tn]=n.keys[tn]);let f=Oi(o,c);return await Li(c,f),Object.keys(c).length+f.length}function gl(n,e,t){let i=e?Ht(e,n.name):void 0;return i?JSON.stringify(p({code:i.code,title:i.title,description:i.description},i.imageURL?{imageURL:i.imageURL}:{})):t}function Os(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function hl(n){try{let e=n?JSON.parse(n):null;return e&&typeof e=="object"&&!Array.isArray(e)?e:null}catch(e){return null}}var Vn="/api/shares",Sl=`${Vn}/update`,kl=`${Vn}/delete`,bl=`${Vn}/import`,wl="x-syncify-user-hash",xl="discover/presets.json",vl={no_code:"This code doesn't exist.",too_many_codes:"You can't make more share codes. Delete one to make another.",daily_limit:"Too many changes to share codes today. Try again tomorrow.",too_large:"This setup is too big to share.",invalid_name:"Names can be up to 60 characters.",empty:"There's nothing to share yet. Install something from Marketplace first.",invalid_items:"Syncify couldn't read some items. Reload Spotify and try again.",source:"Some items don't load from GitHub. Reload Spotify and try again.",blocked:"Some items are on Marketplace's block list. Reload Spotify and try again.",custom_snippet:"Custom snippets can't be shared. Reload Spotify and try again.",unchecked:"Couldn't check Marketplace's block list. Try again in a minute.",publish_failed:"Couldn't publish the code. Press Update on it to try again.",delete_failed:"Couldn't delete the code. Try again.",same_setup:"You already shared this setup.",invalid_handle:"Handles are 3 to 20 letters, digits, _ or -, starting and ending with a letter or digit.",reserved_handle:"That handle isn't allowed. Pick another.",handle_taken:"That handle is taken. Pick another.",unavailable:"Share codes aren't available yet."},Cl=new Set(["offline","signed_out","invalid_signature","stale_salt","no_device_key","too_many_requests"]);function jt(n,e=null){var t;return n instanceof v&&Cl.has(n.code)?en(n):n instanceof v&&n.code==="too_many_codes"&&e!==null?`You have ${e} share codes already. Delete one to make another.`:(t=n instanceof v?vl[n.code]:void 0)!=null?t:"Something went wrong. Try again."}async function Hi(){var e;let n=await On(Vn,"GET");return{codes:Array.isArray(n==null?void 0:n.codes)?n.codes.flatMap(t=>{let i=Nl(t);return i?[i]:[]}):[],newHearts:typeof(n==null?void 0:n.new_hearts)=="number"?n.new_hearts:0,max:typeof(n==null?void 0:n.max)=="number"?n.max:null,profile:typeof((e=n==null?void 0:n.profile)==null?void 0:e.handle)=="string"?{handle:n.profile.handle,link:typeof n.profile.link=="string"?n.profile.link:null}:null,suggestedHandle:typeof(n==null?void 0:n.suggested_handle)=="string"?n.suggested_handle:null}}async function qs(n,e,t){return Rs(await On(Vn,"POST",p({name:n,keys:e},t===void 0?{}:{handle:t})))}function ji(n){return`${L().shareUrl.replace(/\/+$/,"")}/@${n}`}async function Gs(n,e,t){return Rs(await On(Sl,"POST",{code:n,name:e,keys:t}))}async function Vs(n){try{await On(kl,"POST",{code:n})}catch(e){if(e instanceof v&&e.code==="no_code")return;throw e}}async function Js(n){let e=L().shareUrl.replace(/\/+$/,""),t;try{t=await fetch(`${e}/${n}.json`)}catch(o){throw new v("offline")}if(t.status===404||t.status===403)throw new v("no_code");if(!t.ok)throw new v("failed");let i=Hs(await t.json().catch(()=>null));if(!i||i.code!==n)throw new v("no_code");return i}async function Xs(){let n=L().shareUrl.replace(/\/+$/,"");try{let e=await fetch(`${n}/${xl}`);if(!e.ok)return null;let t=await e.json();return Array.isArray(t.posts)?t.posts.flatMap(i=>{let o=Il(i);return o?[o]:[]}):null}catch(e){return null}}async function Zs(n,e,t=!1){try{await os(bl,p({code:n},t?{source:"preset"}:{}),{[wl]:e.hash})}catch(i){}}function Nl(n){let e=n;return!e||typeof e.code!="string"?null:{code:e.code,name:typeof e.name=="string"&&e.name?e.name:null,link:typeof e.link=="string"?e.link:null,item_count:typeof e.item_count=="number"?e.item_count:0,imports:typeof e.imports=="number"?e.imports:0,created_at:typeof e.created_at=="number"?e.created_at:0,updated_at:typeof e.updated_at=="number"?e.updated_at:0,hearts:El(n.post),posted:_l(n.post)}}function _l(n){let e=n==null?void 0:n.status;return typeof e=="string"&&e!=="removed"}function El(n){let e=n;return(e==null?void 0:e.status)==="public"&&e.hidden!==!0&&typeof e.hearts=="number"?e.hearts:null}function Il(n){let e=n,t=i=>Number.isSafeInteger(i)&&i>=0?i:0;return!e||typeof e.code!="string"?null:{code:e.code,name:typeof e.name=="string"?e.name:xe(e.code),extensions:t(e.extensions),themes:t(e.themes),snippets:t(e.snippets)}}function Rs(n){let e=n;if(typeof(e==null?void 0:e.code)!="string")throw new v("failed");return{code:e.code,link:typeof e.link=="string"?e.link:null,leftOut:Array.isArray(e.left_out)?e.left_out.length:0}}var Qs="/claims",Tl="/claims/cancel",Pl={no_backup:"Back up first, then secure your backup.",unsupported_identity:"This Spotify account can't be secured.",too_many_accounts:"Your account already has 10 Spotify accounts linked.",undone:"This backup can't be secured with your account.",offline:"Couldn't reach Syncify. Check your connection and try again."},We=class extends Error{constructor(t){var i;super((i=Pl[t])!=null?i:"Couldn't secure your backup. Try again.");this.code=t;this.name="ClaimError"}};async function ea(n,e){let t=await Fi(n,e,"GET",Qs);if(!t.ok)throw new We(await Yi(t));let i=await t.json().catch(()=>null);return{claim:$n(i==null?void 0:i.claim),accounts:Array.isArray(i==null?void 0:i.accounts)?i.accounts.filter(Al):null}}async function na(n,e){let t=await Fi(n,e,"POST",Qs);if(!t.ok)throw new We(await Yi(t));let i=await t.json().catch(()=>null);return $n(i==null?void 0:i.claim)}async function ta(n,e){let t=await Fi(n,e,"POST",Tl);if(t.status===404)return"cancelled";if(!t.ok)throw new We(await Yi(t));let i=await t.json().catch(()=>null);return(i==null?void 0:i.held)===!0?"checking":"cancelled"}async function Fi(n,e,t,i){try{return await je(n,e,{method:t},i)}catch(o){throw o instanceof TypeError?new We("offline"):o}}async function Yi(n){let e=await n.json().catch(()=>null);return typeof(e==null?void 0:e.code)=="string"?e.code:"failed"}function Al(n){let e=n;return!!(e&&typeof e.hash=="string"&&(e.status==="pending"||e.status==="final"||e.status==="cancelled"||e.status==="unlinked"))}var hn={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},Ml=/^([a-z0-9]|f([1-9]|1[0-2]))$/,Dl=250,Ll=40,Wi=null,Ft=null,gn=null;function ia(){return/mac/i.test(navigator.platform||navigator.userAgent)}function oa(n){if(n===null)return null;if(!n||typeof n!="object")return hn;let e=n;return typeof e.key!="string"||!Ml.test(e.key)?hn:{key:e.key,ctrl:!!e.ctrl,alt:!!e.alt,shift:!!e.shift,meta:!!e.meta}}function Jn(n){if(!n)return"Off";let e=n.key.toUpperCase();return ia()?[n.ctrl?"\u2318":"",n.alt?"\u2325":"",n.shift?"\u21E7":"",e].join(""):[n.ctrl&&"Ctrl",n.meta&&"Win",n.alt&&"Alt",n.shift&&"Shift",e].filter(Boolean).join("+")}function sa(n){if(n.key==="Escape")return{kind:"cancel"};let e=Ol(n.code);if(!e)return{kind:"ignore"};let t=ia();if(t&&n.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:e,ctrl:t?n.metaKey:n.ctrlKey,alt:n.altKey,shift:n.shiftKey,meta:t?!1:n.metaKey},o=e.startsWith("f")&&e.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!o?{kind:"error",message:`Include ${t?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function Ol(n){var t,i;let e=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(n);return e?((i=(t=e[1])!=null?t:e[2])!=null?i:e[3]).toLowerCase():null}function aa(n){var e;if(gn&&Ul(gn,n))return!1;try{let t=Spicetify.Mousetrap,i=(e=t.trigger)==null?void 0:e.call(t)._directMap;if(!i)return!1;let o=zi(n);return Object.keys(i).some(a=>a.startsWith(`${o}:`))}catch(t){return!1}}function qi(n,e,t=0){if(Wi=e,Ft=n,!ra()){if(t>=Ll){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>qi(Ft,e,t+1),Dl);return}Gi(Ft)}function Gi(n){if(Ft=n,!ra()||!Wi)return;let e=Wi;try{if(gn&&Spicetify.Keyboard._deregisterShortcut(gn),gn=null,!n)return;Spicetify.Keyboard.registerShortcut(n,t=>{t.preventDefault(),e()}),gn=n,console.debug("[Syncify]","Keyboard shortcut registered",Jn(n))}catch(t){console.warn("[Syncify]","Failed to register keyboard shortcut",t)}}function ra(){var n;return typeof((n=Spicetify.Keyboard)==null?void 0:n.registerShortcut)=="function"}function zi(n){return[n.ctrl&&"mod",n.meta&&"meta",n.alt&&"alt",n.shift&&"shift",n.key].filter(Boolean).join("+")}function Ul(n,e){return zi(n)===zi(e)}var Vi="both",Bl=["both","topbar","menu"],Xn=null,Zn=null,Yt=!1;function ca(n){return Bl.includes(n)?n:Vi}function la(){var n;return typeof((n=Spicetify.Menu)==null?void 0:n.Item)=="function"}function ua(n){Xn=n.topbarButton,Zn=n.menuItem}function Wt(n){let e=n!=="menu"||!Zn,t=n!=="topbar";if(Xn!=null&&Xn.element&&(Xn.element.style.display=e?"":"none"),!!Zn)try{t&&!Yt?(Zn.register(),Yt=!0):!t&&Yt&&(Zn.deregister(),Yt=!1)}catch(i){console.warn("[Syncify]","Failed to update profile menu item",i)}}var qt="syncify:config",zt={workerUrl:L().workerUrl,autoBackupEnabled:!1,shortcut:hn,entryPoint:Vi};function fe(){var t,i;let n=L(),e=(i=(t=Spicetify.LocalStorage)==null?void 0:t.get(qt))!=null?i:window.localStorage.getItem(qt);if(!e)return N(p({},zt),{workerUrl:n.workerUrl});try{let o=JSON.parse(e);return{workerUrl:n.workerUrl,autoBackupEnabled:o.autoBackupEnabled===void 0?zt.autoBackupEnabled:!!o.autoBackupEnabled,shortcut:o.shortcut===void 0?zt.shortcut:oa(o.shortcut),entryPoint:ca(o.entryPoint)}}catch(o){return N(p({},zt),{workerUrl:n.workerUrl})}}function Gt(n){var t;let e=JSON.stringify({workerUrl:L().workerUrl,autoBackupEnabled:n.autoBackupEnabled,shortcut:n.shortcut,entryPoint:n.entryPoint});if((t=Spicetify.LocalStorage)!=null&&t.set){Spicetify.LocalStorage.set(qt,e);return}window.localStorage.setItem(qt,e)}function Rn(n){return typeof n.workerUrl=="string"&&n.workerUrl.length>0}var $l=["username","canonicalUsername","id","uri","displayName"];async function ve(){let{value:n,field:e}=await Kl();return{hash:await Pt(n),field:e}}async function Kl(){var o;let n=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(n!=null&&n.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let e=await n.getUser(),t=$l.find(a=>(e==null?void 0:e[a])!=null),i=t?e[t]:void 0;if(!t||!i)throw new Error("Unable to resolve the active Spotify user.");return{value:i,field:t}}async function et(n){if(!Rn(n))throw new Error("Syncify backup service is not configured.");let[e,t]=await Promise.all([ve(),Cs()]);if(t.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:i,unapproved:o}=await rs(n.workerUrl,e,t);return{payload:t,unchanged:i,unapproved:o}}async function Sn(n,e){var c;if(!Rn(n))throw new Error("Syncify backup service is not configured.");let t=await Ei(n.workerUrl,await ve(),e),[i,o,a]=await Promise.all([Promise.all(t.backups.map(Xi)),t.safetyCopy?Xi(t.safetyCopy):null,Promise.all(t.unapproved.map(Xi))]),s=i.filter((d,y)=>i.findIndex(f=>f.payload_hash===d.payload_hash)===y);return N(p({},t),{payload:(c=s[0])!=null?c:null,backups:s,safetyCopy:o&&!s.some(d=>d.payload_hash===o.payload_hash)?o:null,unapproved:a.filter(d=>!s.some(y=>y.payload_hash===d.payload_hash))})}var Ji=new Map;async function Xi(n){var a,s,c;let e=(s=(a=n.marketplace_data)==null?void 0:a.keys)!=null?s:{},t=n.spicetify_config?Ai(n.spicetify_config,e):void 0,i=`${n.payload_hash} ${(c=n.metadata)==null?void 0:c.last_sync_datetime}`,o=Ji.get(i);return o||(o=Ut(e,t),Ji.set(i,o),o.catch(()=>Ji.delete(i))),N(p(p({},n),t?{spicetify_config:t}:{}),{payload_hash:await o})}async function da(n){let e=await Ei(nt(n),await ve());return{claim:e.claim,install:e.install,nudge:e.nudge}}async function ya(n,e,t,i=[]){var c;let o=e!=null?e:(await Sn(n)).payload;if(!o)throw new Error("No Syncify cloud backup was found for this Spotify account.");let a=await Ns(o,i),s=(c=o.backup)==null?void 0:c.id;return s&&Rn(n)&&ve().then(d=>ls(n.workerUrl,d,s,t)).catch(()=>{}),{payload:o,restoredCount:a}}var Qn=class extends Error{constructor(t){super("Couldn't back up your setup first, so nothing changed.");this.reason=t;this.name="SafetyBackupError"}};async function fa(n,e,t,i,o,a=!1){try{await et(n)}catch(c){throw new Qn(c)}let s=await zs(e,t,i,o);return ve().then(c=>Zs(e.code,c,a)).catch(()=>{}),s}async function pa(n){let e=await ve(),t=await ea(nt(n),e);return N(p({},t),{hash:e.hash})}async function ma(n){await na(nt(n),await ve())}async function Vt(n,e,t){await cs(nt(n),await ve(),e,t)}async function Jt(n){return ta(nt(n),await ve())}function nt(n){if(!Rn(n))throw new Error("Syncify backup service is not configured.");return n.workerUrl}var ga="syncify:nudge-hidden-until",ha="syncify:nudge-panel-shown";function Sa(n=Date.now()){let e=Number(xa(ga));return Number.isFinite(e)&&e>n}function ka(n=Date.now()){va(ga,String(n+30*864e5))}function ba(){return xa(ha)!==null}function wa(){va(ha,"1")}function xa(n){var e,t;return(t=(e=Spicetify.LocalStorage)==null?void 0:e.get(n))!=null?t:window.localStorage.getItem(n)}function va(n,e){var t;(t=Spicetify.LocalStorage)!=null&&t.set?Spicetify.LocalStorage.set(n,e):window.localStorage.setItem(n,e)}var Xt="syncify:claim-check-day";async function Na(n){var t,i;let e=fe();if(e.workerUrl){if(!e.autoBackupEnabled)return Hl(n);try{let[o,a]=await Promise.all([Bt(),Sn(e)]);_a(a,n);let s=(i=(t=a.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?i:0;if(a.exists&&_s(o.keyCount,s)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(a.backups.some(d=>d.payload_hash===o.hash)||o.keyCount===0)return;let{unapproved:c}=await et(e);Spicetify.showNotification(c?"Syncify: backed up, waiting for approval":"Syncify auto-backup complete")}catch(o){if(o instanceof we||o instanceof nn){Spicetify.showNotification("Syncify: sign in to keep backing up",!0,8e3);return}let a=o instanceof Error?o.message:String(o);console.warn("Syncify startup sync failed:",o),Spicetify.showNotification(`Syncify auto-sync skipped: ${a}`,!0,8e3)}}}async function Hl(n){let e=new Date().toLocaleDateString("en-CA");if(Fl()!==e)try{let t=await da(fe());Ca(e),_a(t,n)}catch(t){if(t instanceof we){Ca(e);return}console.warn("Syncify claim check failed:",t)}}function _a(n,e){var o;let t=jl(n.claim),i=(o=n.install)==null?void 0:o.waiting[0];t?e.onClaim(t):i?e.onInstall(i):n.nudge&&!ba()&&e.onNudge()}function jl(n){return(n==null?void 0:n.status)==="pending"&&!n.mine&&!n.not_me?n:null}function Fl(){var n,e;return(e=(n=Spicetify.LocalStorage)==null?void 0:n.get(Xt))!=null?e:window.localStorage.getItem(Xt)}function Ca(n){var e;(e=Spicetify.LocalStorage)!=null&&e.set?Spicetify.LocalStorage.set(Xt,n):window.localStorage.setItem(Xt,n)}var Ri="syncify:pending-restore",Yl=600*1e3,Wl=2e3,zl=15e3,ql="marketplace:theme-installed",Gl="raw.githubusercontent.com",Vl=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],Ce=null,Zi=new Set,Ta=new Map;function Pa(){return Ce}function Aa(n){return Zi.add(n),()=>Zi.delete(n)}function Ma(){Ce&&Ba(N(p({},Ce),{manual:[]}))}function Rt(n,e="restore"){try{localStorage.setItem(Ri,JSON.stringify({at:Date.now(),manual:n,kind:e}))}catch(t){}}function Da(){var n;Rt((n=Ce==null?void 0:Ce.manual)!=null?n:[],Ce==null?void 0:Ce.kind),window.location.reload()}function La(){$a()&&(document.addEventListener("load",n=>Ea(n.target,"load"),!0),document.addEventListener("error",n=>Ea(n.target,"error"),!0))}async function Oa(){let n=$a();if(!n)return;try{localStorage.removeItem(Ri)}catch(s){}let e=Date.now(),t=await Ia();for(;t.loaded<t.total&&Date.now()-e<zl;)await new Promise(s=>setTimeout(s,Wl)),t=await Ia();Ba(N(p({kind:n.kind,at:Date.now()},t),{manual:n.manual}));let i=t.loaded===t.total&&n.manual.length===0,o=n.kind==="share"?"Setup applied":"Backup restored",a=n.kind==="share"?"loaded":"restored";Spicetify.showNotification(i?`Syncify: ${o}; ${t.total} ${t.total===1?"item":"items"}`:`Syncify: ${a} ${t.loaded} of ${t.total}. Open Syncify for details.`,!1,8e3)}function Ua(n){let e=n.map(t=>t.type==="extension"?`spicetify config extensions ${Zt(t.name)}`:t.type==="custom_app"?`spicetify config custom_apps ${Zt(t.name)}`:`spicetify config current_theme ${Zt(t.name)}${t.scheme?` color_scheme ${Zt(t.scheme)}`:""}`);return e.length>0?[...e,"spicetify apply"]:[]}function Zt(n){return/^[\w.@+/-]+$/.test(n)?n:`"${n}"`}function Ba(n){Ce=n;for(let e of Zi)e(n)}function $a(){var n;try{let e=JSON.parse((n=localStorage.getItem(Ri))!=null?n:"null");return!e||Date.now()-e.at>Yl?null:{manual:Array.isArray(e.manual)?e.manual:[],kind:e.kind==="share"?"share":"restore"}}catch(e){return null}}function Ea(n,e){n instanceof HTMLScriptElement&&n.src&&Ta.set(tt(n.src),e)}async function Ia(){var i;let n=await ye(),e=(i=n[ql])!=null?i:"",t=G(n).filter(o=>o.type==="extension"&&o.sources.length>0||o.type==="theme"&&e.includes(o.key)||o.type==="snippet");return{loaded:t.filter(Jl).length,total:t.length}}function Jl(n){var e,t;if(n.type==="snippet"){let i=document.querySelector("style.marketplaceSnippets");return((e=i==null?void 0:i.textContent)==null?void 0:e.includes(`/* ${n.name} - `))===!0}if(n.type==="theme"){let i=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((t=i==null?void 0:i.textContent)!=null&&t.trim())}return Xl(n.sources[0]).some(Zl)}function Xl(n){let e;try{e=new URL(n)}catch(s){return[]}if(e.host!==Gl)return[tt(e.href)];let[t,i,o,...a]=e.pathname.split("/").filter(Boolean);return!t||!i||!o||a.length===0?[]:Vl.map(s=>tt(`https://${s}/gh/${t}/${i}@${o}/${a.join("/")}`))}function Zl(n){let e=Ta.get(n);return e?e==="load":[...document.querySelectorAll("script[src]")].some(i=>tt(i.src)===n)&&performance.getEntriesByType("resource").some(i=>tt(i.name)===n)}function tt(n){try{let e=new URL(n);return`${e.origin}${e.pathname}`}catch(e){return n}}function Qi(n){return`A new install${n.device?` on ${n.device}`:""} wants to back up this Spotify account.`}function Ka(n){let e=Spicetify.React,t=e.useState,{install:i}=n,[o,a]=t(!1),[s,c]=t(null);async function d(y){a(!0),c(null);try{await Vt(fe(),i.id,y),Spicetify.showNotification(y==="approve"?"Syncify: install approved":"Syncify: install refused"),n.onDone(y)}catch(f){c(f instanceof Error?f.message:String(f)),a(!1)}}return e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-claim-notice"},Qi(i)," Approve it if it's yours."),s?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},s):null,e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:n.onClose,disabled:o},"Close"),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{d("reject")},disabled:o},"Not mine"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{d("approve")},disabled:o},"Approve")))}var Rl="syncify:beta",Ha=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function ja(){var n;return(n=window.SyncifyLoader)!=null?n:null}function Ql(){try{return window.localStorage.getItem(Rl)==="true"}catch(n){return!1}}async function Fa(n){let e=Ql()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(e.map(i=>eu(`${n}/${i}`)))).reduce((i,o)=>o&&(!i||no(o,i)>0)?o:i,null)}function eo(n){return typeof n=="string"&&Ha.test(n)}function no(n,e){let[t,i]=[n,e].map(o=>{var y;let[,a,s,c,d]=(y=Ha.exec(o))!=null?y:[];return[a,s,c,d!=null?d:1/0].map(Number)});for(let o=0;o<t.length;o+=1)if(t[o]!==i[o])return t[o]<i[o]?-1:1;return 0}async function eu(n,e=3e3){let t=typeof AbortController=="function"?new AbortController:null,i=setTimeout(()=>t==null?void 0:t.abort(),e);try{let o=await fetch(n,{signal:t==null?void 0:t.signal});if(!o.ok)return null;let a=await o.json();return eo(a==null?void 0:a.version)?a.version:null}catch(o){return null}finally{clearTimeout(i)}}var oo="syncify:share-code-count",nu=600;function tu(){var e,t;let n=Number((t=(e=Spicetify.LocalStorage)==null?void 0:e.get(oo))!=null?t:NaN);return Number.isInteger(n)&&n>=0?n:null}function Ya(n){var e,t;n===null?(e=Spicetify.LocalStorage)==null||e.remove(oo):(t=Spicetify.LocalStorage)==null||t.set(oo,String(n))}var so="syncify:handle";function iu(){var e;let n=(e=Spicetify.LocalStorage)==null?void 0:e.get(so);return n==null?void 0:n||null}function to(n){var e,t;n===void 0?(e=Spicetify.LocalStorage)==null||e.remove(so):(t=Spicetify.LocalStorage)==null||t.set(so,n!=null?n:"")}var w=null;function ro(n={}){var No,_o,Eo,Io,To,Po,Ao,Mo,Do;let e=Spicetify.React,t=e.useEffect,i=e.useMemo,o=e.useState,a=e.useRef,[s,c]=o(()=>fe()),[d,y]=o(()=>w!=null&&w.remote.exists?"success":"idle"),[f,g]=o(null),[h,S]=o(0),[E,C]=o([]),[P,I]=o([]),[T,z]=o(null),[qe,Ne]=o(null),[V,R]=o(null),[H,_e]=o(null),[K,Q]=o(()=>{var r;return(r=w==null?void 0:w.remote.payload)!=null?r:null}),[ee,k]=o(()=>{var r;return(r=w==null?void 0:w.remote.backups)!=null?r:[]}),[_,B]=o(()=>{var r;return(r=w==null?void 0:w.remote.safetyCopy)!=null?r:null}),[j,q]=o(()=>{var r;return(r=w==null?void 0:w.remote.unapproved)!=null?r:[]}),[ne,Ee]=o(()=>{var r;return(r=w==null?void 0:w.remote.install)!=null?r:null}),[re,at]=o(!1),[wn,rt]=o(()=>new Set),[A,ce]=o(()=>{var r;return(r=w==null?void 0:w.remote.payload)!=null?r:null}),[Ie,on]=o(w!==null),[sn,J]=o(!1),[F,te]=o(!1),[Te,xn]=o(null),[D,ie]=o(!1),[Oe,pe]=o(null),[me,vn]=o((No=n.section)!=null?No:null),[Ge,an]=o(!1),[x,Ue]=o(()=>Pa()),[ct,Ve]=o(!1),[X,lt]=o(!1),[Pe,ut]=o(null),[Ae,$]=o(()=>tu()),[Be,oe]=o(()=>iu()),[Y,Me]=o(void 0),[O,si]=o(()=>{var r;return(r=w==null?void 0:w.lockedBy)!=null?r:null}),[$e,Cn]=o(()=>{var r;return(r=w==null?void 0:w.remote.claim)!=null?r:null}),[ge,Je]=o(()=>{var r;return(r=w==null?void 0:w.claims)!=null?r:null}),[le,Nn]=o(!1),[dt,rn]=o(null),[ai,Xe]=o(()=>{var r;return(r=w==null?void 0:w.remote.nudge)!=null?r:!1}),[_n,yt]=o(()=>Sa()),[ri,ci]=o(n.secure===!0),En=a(!1),[cn,In]=o(!1),[u,m]=o(null),[b,ue]=o(null),Tn=a(null),he=i(()=>L(),[]),ln=i(()=>_?[...ee,_]:ee,[ee,_]),li=u?[]:j,ui=u?(_o=b==null?void 0:b.backups)!=null?_o:[]:ee,yo=u?(Eo=b==null?void 0:b.safetyCopy)!=null?Eo:null:_,fo=i(()=>{var r;return new Map([...ln,...j,...(r=b==null?void 0:b.backups)!=null?r:[],...b!=null&&b.safetyCopy?[b.safetyCopy]:[]].map(l=>[l,G(l.marketplace_data.keys)]))},[ln,j,b]),ft=r=>{var l;return(l=fo.get(r))!=null?l:G(r.marketplace_data.keys)},cr=r=>ft(r).map(l=>l.key),lr=r=>ft(r).length,Z=i(()=>sn&&A?Hn(ft(A),A.spicetify_config,P,T):null,[sn,A,fo,P,T]),Ke=i(()=>Z?qn(Z.items):null,[Z]),pt=i(()=>new Map([...Te!=null?Te:[],...Ke!=null?Ke:[]]),[Te,Ke]),mt=((Io=A==null?void 0:A.backup)==null?void 0:Io.kind)==="quarantined",po=i(()=>{var r;return new Set(((r=Z==null?void 0:Z.items)!=null?r:[]).filter(l=>{var M;return l.change!=="removed"&&l.isNew&&(mt||Ye(pt.get(l.key))||((M=pt.get(l.key))==null?void 0:M.kind)==="unchecked")}).map(l=>l.key))},[Z,pt,mt]),ur=[...po].filter(r=>!wn.has(r)),mo=Z!==null&&Te===null,di=i(()=>la(),[]),go=i(()=>ja()!==null,[]),de=d==="loading",gt=(f==null?void 0:f.kind)==="warning"||(f==null?void 0:f.kind)==="error"?f:null,ht=!!(H&&ee.some(r=>r.payload_hash===H)),ho=!!(K&&H&&!ht),So=!!(K&&H&&K.payload_hash===H),ko=!!(A&&H&&A.payload_hash===H),St=u!==null||Ge||!So||ln.length<2,dr=St?ui:ui.slice(0,1),kt=($e==null?void 0:$e.status)==="pending"&&!$e.mine?$e:null,un=ru(ge,O,kt!==null),yr=!_n&&!O&&K!==null&&me!=="account"&&(Y?un.kind==="open":Y===null&&ai),bt=(To=ne==null?void 0:ne.waiting[0])!=null?To:null,bo=!ne||ne.trusted||O||un.kind==="secured"?null:ne.refused?"This Spotify account refused backups from this install. Sign in to back up from it.":"This install isn't approved yet. Its backups are kept apart until you approve it from another install or sign in.",yi=(Y?((Po=ge==null?void 0:ge.accounts)!=null?Po:[]).filter(r=>r.status==="final"):[]).map((r,l)=>({hash:r.hash,label:`Spotify account ${l+1}${r.device_info?` from ${r.device_info}`:""}`})).filter(r=>r.hash!==(ge==null?void 0:ge.hash)),fr=!!(H&&h>0&&!ln.some(r=>r.payload_hash===H));t(()=>(se().catch(()=>null).then(r=>Me(l=>l!=null?l:r)),Se({silent:!0}),kr(),Aa(Ue)),[]),t(()=>{if(xn(null),!Z||!Ke)return;[...Ke.values()].some(Ye)&&te(!0);let r=!0;return Gn(Z.items,Ke).then(l=>{r&&(xn(l),[...l.values()].some(Ye)&&te(!0))}),()=>{r=!1}},[Z,Ke]),t(()=>{if(!D)return;let r=l=>{var De;if(!((De=Tn.current)!=null&&De.isConnected)){ie(!1),pe(null);return}l.preventDefault(),l.stopImmediatePropagation();let M=sa(l);if(M.kind!=="ignore"){if(M.kind==="cancel"){ie(!1),pe(null);return}if(M.kind==="error"){pe(M.message);return}if(aa(M.shortcut)){pe(`${Jn(M.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}ie(!1),fi(M.shortcut)}};return window.addEventListener("keydown",r,!0),()=>window.removeEventListener("keydown",r,!0)},[D,s]);async function wo(){let r=await Bt();return _e(r.hash),S(r.installedItemCount),C(r.installedItems),I(r.items),z(r.spicetifyConfig),Ne(r.activeTheme),R(r.marketplaceAvailable),r}async function Se(r){try{J(!1),(!(r!=null&&r.silent)||!w)&&y("loading"),r!=null&&r.silent||g({kind:"info",text:"Checking your Syncify backup\u2026"}),await wo();let l,M=null;try{l=await Sn(s)}catch(Ze){if(!(Ze instanceof we))throw Ze;l=_u,M=Ze.code}let De=await se().catch(()=>null),ke=De?await pa(s).catch(()=>null):null,W=De?await se().catch(()=>null):null;w={remote:l,lockedBy:M,claims:W?ke:null},Me(W),Je(W?ke:null),si(M),M&&vn("account"),Cn(l.claim),m(null),ue(null),Q(l.payload),k(l.backups),B(l.safetyCopy),q(l.unapproved),Ee(l.install),Xe(l.nudge),ce(l.payload),on(!0),y(l.exists?"success":"idle"),!(r!=null&&r.silent)&&!M&&g(l.exists&&l.payload?{kind:"success",text:`Backup found from ${it(l.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(l){An(l)}}async function wt(){Nn(!0),rn(null);try{await ma(s)}catch(r){r instanceof We&&["claim_pending","claimed"].includes(r.code)||rn(r instanceof Error?r.message:String(r))}finally{await Se({silent:!0}),Nn(!1)}}function pr(){ci(!0),Y?wt():Pn("account")}function mr(){ka(),yt(!0)}t(()=>{!n.secure||En.current||le||!Y||un.kind!=="open"||O||(En.current=!0,wt())},[Y,un.kind,O,le]);function gr(r){Me(r),En.current=!0,!O&&K?wt():Se({silent:!0})}function xo(){Ya(null),$(null),to(void 0),oe(void 0),Me(null),Je(null),rn(null),Se({silent:!0})}async function hr(){In(!0);try{Spicetify.showNotification(lo(await Jt(s))),await Se({silent:!0})}catch(r){g({kind:"error",text:r instanceof Error?r.message:String(r)})}finally{In(!1)}}async function Sr(r){if(J(!1),m(r),ue(null),!r){ce(K);return}ce(null);try{let l=await Sn(s,r);ue(l),ce(l.payload)}catch(l){m(null),ce(K),An(l)}}async function kr(){let r=he.version;if(!eo(r))return;let l=await Fa(he.releasesUrl);l&&no(l,r)>0&&ut(l)}function br(r){let l=N(p({},s),{autoBackupEnabled:r});c(l),Gt(l),g({kind:"success",text:r?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}function fi(r){let l=N(p({},s),{shortcut:r});c(l),Gt(l),Gi(r),pe(null),g({kind:"success",text:r?`${Jn(r)} now opens Syncify.`:"Keyboard shortcut turned off."})}function wr(r){let l=N(p({},s),{entryPoint:r});c(l),Gt(l),Wt(r)}function Pn(r){vn(r),r!=="settings"&&ie(!1)}function xr(){pe(null),ie(!0)}async function vr(){var r;try{J(!1),y("loading"),g({kind:"info",text:"Backing up your extensions and themes\u2026"});let{payload:l,unchanged:M,unapproved:De}=await et(s);if(await wo(),De){await Se({silent:!0}),g({kind:"warning",text:"Backed up, but kept apart until this install is approved."}),Spicetify.showNotification("Syncify: backed up, waiting for approval");return}if(M){on(!0),y("success"),g({kind:"success",text:"Everything is already backed up."}),Spicetify.showNotification("Syncify: everything is already backed up");return}let ke=[l,...ee.filter(W=>W.payload_hash!==l.payload_hash)].slice(0,Nu);w&&(w=N(p({},w),{remote:N(p({},w.remote),{exists:!0,payload:l,backups:ke,safetyCopy:((r=w.remote.safetyCopy)==null?void 0:r.payload_hash)===l.payload_hash?null:w.remote.safetyCopy})})),Q(l),k(ke),B(W=>(W==null?void 0:W.payload_hash)===l.payload_hash?null:W),ce(l),on(!0),y("success"),g({kind:"success",text:`Backed up ${l.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(l){An(l)}}async function vo(r){if(bt){at(!0);try{await Vt(s,bt.id,r),Spicetify.showNotification(r==="approve"?"Syncify: install approved":"Syncify: install refused"),await Se({silent:!0})}catch(l){An(l)}finally{at(!1)}}}function Cr(r=A){if(V===!1){let l="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";g({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3);return}if(!r){let l="No Syncify cloud backup was found for this Spotify account.";g({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3);return}ce(r),te(!1),rt(new Set),J(!0)}async function Nr(){let r=A?Hn(ft(A),A.spicetify_config,P,T).manual:[];try{J(!1),y("loading"),g({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:l,restoredCount:M}=await ya(s,A!=null?A:void 0,u!=null?u:void 0,ur);ce(l),y("success"),g({kind:"success",text:`Restored ${M} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),Rt(r),setTimeout(()=>window.location.reload(),1e3)}catch(l){An(l)}}async function _r(r){await Qa(r)&&(Ve(!0),setTimeout(()=>Ve(!1),2e3))}function He(r){if(r.startsWith("mailto:")){window.location.href=r;return}window.open(r,"_blank","noopener,noreferrer")}function An(r){if(y("error"),r instanceof Bn){lt(!0),g(null);return}if(r instanceof nn){g({kind:"error",text:r.message}),Se({silent:!0});return}if(r instanceof we&&r.code!=="not_linked"){g(null),Se({silent:!0});return}let l=r instanceof Error?r.message:String(r);g({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3)}function pi(r,l){var Lo,Oo;let M=(A==null?void 0:A.payload_hash)===r.payload_hash,De=r.payload_hash===H,ke=it(r.metadata.last_sync_datetime),W=Ja(lr(r)),Ze=(Oo=(Lo=r.backup)==null?void 0:Lo.name)!=null?Oo:null;return e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":M,"data-selected":M?"true":"false",type:"button",key:`${r.payload_hash}-${r.metadata.last_sync_datetime}`,title:l!=null&&l.isSafetyCopy?"Kept aside and updated about once a week, so a burst of new backups can't replace it":l!=null&&l.isUnapproved?"From an install this Spotify account hasn't approved":void 0,onClick:()=>{ce(r),J(!1)},disabled:de},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),l!=null&&l.isSafetyCopy?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Safety copy",e.createElement("span",{className:"syncify-backup-note"},e.createElement(bn,null),"updated weekly")),e.createElement("span",{className:"syncify-muted"},e.createElement(ze,{parts:[Ze,ke,W]}))):l!=null&&l.isUnapproved?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Not approved",e.createElement("span",{className:"syncify-backup-note"},e.createElement(bn,null),ke)),e.createElement("span",{className:"syncify-muted"},e.createElement(ze,{parts:[W,`from ${r.metadata.device_info}`]}))):Ze?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,Ze),e.createElement("span",{className:"syncify-muted syncify-backup-date"},e.createElement(ze,{parts:[ke,W,`from ${r.metadata.device_info}`]}))):e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-backup-date"},ke),e.createElement("span",{className:"syncify-muted"},e.createElement(ze,{parts:[W,`from ${r.metadata.device_info}`]}))),De?e.createElement("span",{className:"syncify-tag",title:"What's on this device now"},"Current"):null,l!=null&&l.isSafetyCopy?e.createElement(Ga,null):null,l!=null&&l.isUnapproved?e.createElement(uo,null):null)}function mi(r){r.stopPropagation()}let Er=X?"Update Syncify to keep backing up":O?"Sign in to restore":Ie?K?ho?"Changes since your last backup":"Everything is backed up":"No backup yet":d==="error"?"Couldn't check your backup":"Checking your backup\u2026",gi=X?"Your backups are safe":O?O==="not_owner"?"Secured by another account":"This backup is secured":Ie?K?ho?Iu(K,cr(K),E,T):`Last backup ${it(K.metadata.last_sync_datetime)}`:"Save your extensions and themes so you can restore them after a reinstall or on another computer.":null,Co=!!(x&&!X&&Date.now()-x.at<Cu),Mn=!!(x&&x.loaded===x.total),hi=Ua((Ao=x==null?void 0:x.manual)!=null?Ao:[]);return e.createElement("div",{className:"syncify-panel",ref:Tn,onClick:mi,onMouseDown:mi,onPointerDown:mi},X?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,"This version of Syncify is no longer supported."),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>He(`${he.githubUrl}#updating`)},"How to update")):null,kt?e.createElement("div",{className:"syncify-alert",role:"alert"},e.createElement("span",null,co(kt)),kt.not_me?null:e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{hr()},disabled:cn},"Not me"))):null,bt?e.createElement("div",{className:"syncify-alert",role:"alert"},e.createElement("span",null,Qi(bt)),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{vo("reject")},disabled:re},"Not mine"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{vo("approve")},disabled:re},"Approve"))):null,bo?e.createElement("div",{className:"syncify-alert",role:"status"},e.createElement("span",null,bo)):null,hi.length>0?e.createElement("div",{className:"syncify-alert syncify-manual",role:"status"},e.createElement("span",{className:"syncify-manual-header"},e.createElement("span",null,x.manual.length===1?"1 isn't from Marketplace. Add it in a terminal:":`${x.manual.length} aren't from Marketplace. Add them in a terminal:`),e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:Ma},e.createElement(ao,null))),e.createElement("span",{className:"syncify-code"},e.createElement("code",null,hi.join(`
`)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{_r(hi.join(`
`))}},ct?"Copied":"Copy"))):null,gt?e.createElement("div",{className:"syncify-alert","data-kind":gt.kind},e.createElement("span",null,gt.text),e.createElement("span",{className:"syncify-alert-actions"},gt.kind==="error"?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Se()},disabled:de},"Try again"):null,e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>g(null)},e.createElement(ao,null)))):null,e.createElement("section",{className:"syncify-status","aria-live":"polite"},Co&&x?e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},x.kind==="share"?Mn?"Setup loaded":`Loaded ${x.loaded} of ${x.total}`:Mn?"Backup restored":`Restored ${x.loaded} of ${x.total}`),e.createElement("p",{className:"syncify-muted"},Mn?x.total===0?"Nothing from Marketplace to load":`${x.loaded} of ${x.total} loaded`:"Missing something? Reload Spotify once more."),Mn?e.createElement("p",{className:"syncify-muted"},x.kind==="share"?"Syncify set it up for you?":"Syncify saved your setup?"," ",e.createElement("button",{className:"syncify-text-button syncify-inline-button",type:"button",onClick:()=>He(he.kofiUrl)},"Support it on Ko-fi")):null):e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},Er),e.createElement("p",{className:"syncify-muted"},e.createElement(ze,{parts:[...Array.isArray(gi)?gi:[gi],`${Ja(h)} on this device`]}))),Co&&!Mn?e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:Da},"Reload"):e.createElement("button",{className:"syncify-button",type:"button",onClick:vr,disabled:de||ht||X||O!==null,title:O?"Sign in to back up":ht?"No changes since your last backup":void 0},de?"Working\u2026":ht?"Backed up":"Back up now")),yr?e.createElement("div",{className:"syncify-nudge",role:"region","aria-label":"Secure your backup"},e.createElement(Ga,null),e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it")),e.createElement("span",{className:"syncify-nudge-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:mr,disabled:le},"Not now"),e.createElement("button",{className:"syncify-button",type:"button",onClick:pr,disabled:le||de},le?"Securing\u2026":"Secure"))):null,!Ie||O||ee.length>0||j.length>0||yi.length>0?e.createElement("section",{className:"syncify-section","aria-label":"Backups"},e.createElement("div",{className:"syncify-section-header"},e.createElement("h4",{className:"syncify-section-title"},"Backups"),e.createElement("span",{className:"syncify-section-controls"},!u&&So&&ln.length>1?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":Ge,"aria-controls":"syncify-backup-list",onClick:()=>{an(!Ge),J(!1)}},Ge?"Show less":`Show all ${ln.length}`,e.createElement(kn,null)):null,!O&&yi.length>0?e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select","aria-label":"Show backups from",value:u!=null?u:"",onChange:r=>{Sr(r.currentTarget.value||null)},disabled:de},e.createElement("option",{value:""},"This Spotify account"),yi.map(r=>e.createElement("option",{key:r.hash,value:r.hash},r.label))),e.createElement(kn,null)):null)),Ie?O?e.createElement("p",{className:"syncify-locked"},e.createElement(vu,null),e.createElement("span",null,O==="not_owner"?"Sign in with the account that secured them":"Sign in to see and restore your backups")):u&&!b?e.createElement("p",{className:"syncify-muted"},"Loading backups\u2026"):ui.length===0&&li.length===0?e.createElement("p",{className:"syncify-muted"},"No backups yet."):e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-list",id:"syncify-backup-list",role:"radiogroup","aria-label":"Choose a backup to restore"},dr.map(r=>pi(r)),St&&yo?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),pi(yo,{isSafetyCopy:!0})):null,St&&li.length>0?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),li.map(r=>pi(r,{isUnapproved:!0}))):null),St?V===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to restore a backup."):sn?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},"Restore"," ",A?(Do=(Mo=A.backup)==null?void 0:Mo.name)!=null?Do:it(A.metadata.last_sync_datetime):"this backup","?"),mt?e.createElement("div",{className:"syncify-alert"},"An install this Spotify account hasn't approved made this backup. Its items stay off unless you turn them on."):null,Z?e.createElement(Za,{preview:Z,checks:pt,off:po,allowed:wn,unapproved:mt,onAllow:(r,l)=>{let M=new Set(wn);l?M.add(r):M.delete(r),rt(M)},expanded:F,onToggle:()=>te(!F)}):null,e.createElement("div",{className:"syncify-actions"},fr?e.createElement("div",{className:"syncify-alert syncify-actions-hint"},"Your current setup isn't backed up."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>J(!1),disabled:de},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:Nr,disabled:de||mo},mo?"Checking\u2026":"Restore"))):e.createElement("div",{className:"syncify-actions"},ko?e.createElement("span",{className:"syncify-muted syncify-actions-hint"},"This backup is already current."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>Cr(),disabled:de||!A||ko},"Restore backup")):null):e.createElement("div",{className:"syncify-backup-skeleton","aria-hidden":"true"},e.createElement("span",{className:"syncify-radio"}),e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-skeleton-line"}),e.createElement("span",{className:"syncify-skeleton-line wide"})))):null,e.createElement("div",{className:"syncify-accordion"},e.createElement(io,{id:"share",title:"Share",openSection:me,onToggle:Pn,status:Y&&Ae?{kind:"count",label:`${Ae} ${Ae===1?"code":"codes"}`,text:String(Ae)}:null},e.createElement(uu,{config:s,session:Y,localItems:P,localConfig:T,localTheme:qe,marketplaceAvailable:V,busy:de,onSignIn:()=>Pn("account"),onSignedOut:xo,onCodeCount:r=>{Ya(r),$(r)},onHandle:r=>{to(r),oe(r)}})),e.createElement(io,{id:"account",title:"Account",openSection:me,onToggle:Pn,status:bu(Y,O,un)},e.createElement(cu,{session:Y,locked:O,secure:un,securing:le,secureError:dt,onSecure:()=>{wt()},nudge:ri,onSignedIn:gr,onSignedOut:xo,onOpenWebsite:He,handle:Be,onHandle:r=>{to(r),oe(r)}})),e.createElement(io,{id:"settings",title:"Settings",openSection:me,onToggle:Pn,status:Pe?{kind:"dot",label:`Syncify ${Pe} is out`}:null},e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Back up automatically"),e.createElement("span",{className:"syncify-muted"},"When Spotify starts and something has changed")),e.createElement("input",{className:"syncify-switch",type:"checkbox",role:"switch",checked:s.autoBackupEnabled&&!X,onChange:r=>br(r.currentTarget.checked),disabled:de||X})),e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Open Syncify from"),di?s.entryPoint==="menu"&&!s.shortcut?e.createElement("span",{className:"syncify-muted"},"Keep a shortcut in case a Spotify update breaks the menu"):null:e.createElement("span",{className:"syncify-muted"},"The profile menu isn't available in this Spicetify version")),e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select",value:di?s.entryPoint:"topbar",onChange:r=>wr(r.currentTarget.value),disabled:!di},Eu.map(r=>e.createElement("option",{key:r.value,value:r.value},r.label))),e.createElement(kn,null))),e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Keyboard shortcut"),D&&!Oe?e.createElement("span",{className:"syncify-muted"},"Press a key combination, or Esc to cancel"):null),e.createElement("span",{className:"syncify-shortcut"},s.shortcut&&!D?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>fi(null)},"Turn off"):null,!s.shortcut&&!D?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>fi(hn)},"Use default"):null,e.createElement("button",{className:"syncify-key",type:"button","data-recording":D?"true":"false",onClick:()=>D?ie(!1):xr(),title:"Click to change"},D?"Press keys\u2026":s.shortcut?Jn(s.shortcut):"Off"))),Oe?e.createElement("div",{className:"syncify-alert",role:"alert"},Oe):null)),e.createElement("footer",{className:"syncify-footer"},e.createElement("span",{className:"syncify-footer-version"},e.createElement("span",null,"Syncify ",he.version),Pe?e.createElement("button",{className:"syncify-text-button syncify-update",type:"button",onClick:()=>go?window.location.reload():He(`${he.githubUrl}#updating`)},e.createElement(ze,{parts:[`${Pe} is out`,go?"Reload":"How to update"]})):null),e.createElement("span",{className:"syncify-footer-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>He(he.issueUrl)},"Report an issue"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>He(he.githubUrl)},"GitHub"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>He(he.discordUrl)},"Discord"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>He(he.kofiUrl)},"Support on Ko-fi"))))}var Wa={added:{mark:"+",label:"Added"},removed:{mark:"\u2212",label:"Removed"},unchanged:{mark:"=",label:"Unchanged"}},Xa=[["extension","Extensions"],["theme","Themes"],["snippet","Snippets"]],ou={extension:"extension",custom_app:"custom app",theme:"theme"};function Za(n){let e=Spicetify.React,{items:t,counts:i,manual:o,theme:a}=n.preview,s=[...n.off].filter(c=>!n.allowed.has(c)).length;return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-chips","aria-label":"What changes on this device"},i.added?e.createElement("span",{className:"syncify-chip","data-change":"added"},"+",i.added," added"):null,i.removed?e.createElement("span",{className:"syncify-chip","data-change":"removed"},"\u2212",i.removed," removed"):null,i.unchanged?e.createElement("span",{className:"syncify-chip"},i.unchanged," unchanged"):null,o.length?e.createElement("span",{className:"syncify-chip"},o.length," to add manually"):null,a&&(!n.off.has(a.key)||n.allowed.has(a.key))?e.createElement("span",{className:"syncify-chip"},"Switches your theme to ",a.name):null,s?e.createElement("span",{className:"syncify-chip","data-change":"off"},s," off"):null),t.length||o.length?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":n.expanded,"aria-controls":"syncify-restore-changes",onClick:n.onToggle},n.expanded?"Hide changes":"Show changes",e.createElement(kn,null)):null,n.expanded?e.createElement("div",{className:"syncify-changes",id:"syncify-restore-changes"},Xa.map(([c,d])=>{let y=t.filter(f=>f.type===c);return y.length===0?null:e.createElement("section",{key:c,"aria-label":d},e.createElement("h5",{className:"syncify-change-group"},d),e.createElement("ul",{className:"syncify-change-list"},y.map(f=>{var g,h;return e.createElement("li",{className:"syncify-change",key:f.key},e.createElement("span",{className:"syncify-mark","data-change":f.change,role:"img","aria-label":Wa[f.change].label},Wa[f.change].mark),e.createElement("span",{className:"syncify-change-name"},f.name,f.repo?e.createElement("span",{className:"syncify-change-detail"},e.createElement(bn,null),f.repo):null),n.checks.has(f.key)?e.createElement(Ra,{check:n.checks.get(f.key)}):n.unapproved&&n.off.has(f.key)?e.createElement("span",{className:"syncify-source","data-warning":"true"},e.createElement(uo,null),"Not approved"):null,n.off.has(f.key)&&!((g=n.fixed)!=null&&g.has(f.key))?e.createElement("label",{className:"syncify-item-switch"},e.createElement("input",{type:"checkbox",checked:n.allowed.has(f.key),onChange:S=>n.onAllow(f.key,S.currentTarget.checked)}),(h=n.switchLabel)!=null?h:"Restore"):null)})))}),o.length?e.createElement("section",{"aria-label":"Add manually"},e.createElement("h5",{className:"syncify-change-group"},"Add manually"),e.createElement("ul",{className:"syncify-change-list"},o.map(c=>e.createElement("li",{className:"syncify-change",key:`${c.type}:${c.name}`},e.createElement("span",{className:"syncify-mark","aria-hidden":"true"}),e.createElement("span",{className:"syncify-change-name"},c.name,e.createElement("span",{className:"syncify-change-detail"},e.createElement(bn,null),ou[c.type],c.scheme?`, ${c.scheme}`:"")))))):null):null)}var su={host:"Loads from outside GitHub",repo:"Its code is in a different repo than the one it names",blocked:"On Marketplace's block list",catalog:"Not in Marketplace's catalog",unchecked:"GitHub couldn't be reached to check it",custom:"A snippet made in Marketplace, not from its list"};function Ra(n){let e=Spicetify.React,{check:t}=n,i=Ye(t),o=t.kind==="host"?`Code from ${t.host}`:t.kind==="repo"?`Code from ${t.repo}`:t.kind==="blocked"?"Blocked by Marketplace":t.kind==="catalog"?"Not in Marketplace":t.kind==="unchecked"?"Not checked":"Custom";return e.createElement("span",{className:"syncify-source","data-warning":i?"true":"false",title:su[t.kind]},i?e.createElement(uo,null):null,o)}var au={owner:"This backup isn't secured. Someone using this Spotify account said it isn't yours.",admin:"This backup isn't secured. Syncify couldn't confirm it's yours.",undone:"This backup is no longer secured by your account."};function ru(n,e,t){var s,c;if(e==="not_owner")return{kind:"other-account"};if(!n)return t?{kind:"other-claim"}:{kind:"unknown"};let{claim:i}=n;if((i==null?void 0:i.status)==="final"){if(!i.mine)return{kind:"other-account"};let d=((s=n.accounts)!=null?s:[]).filter(y=>y.status==="final").length;return{kind:"secured",linkedCount:Math.max(d,1)}}if((i==null?void 0:i.status)==="pending")return i.mine?{kind:"pending",finalAt:i.final_at,held:i.held}:{kind:"other-claim"};let o=((c=n.accounts)!=null?c:[]).filter(d=>d.hash===n.hash),a=o[o.length-1];return(a==null?void 0:a.status)==="unlinked"?{kind:"ended",reason:"undone"}:(a==null?void 0:a.status)==="cancelled"&&a.cancelled_by!=="claimer"?{kind:"ended",reason:a.cancelled_by==="owner"?"owner":"admin"}:{kind:"open"}}function cu(n){let e=Spicetify.React,t=e.useEffect,i=e.useState,{session:o,secure:a}=n,[s,c]=i(()=>It()),[d,y]=i(()=>It().email),[f,g]=i(""),[h,S]=i(!1),[E,C]=i(null),[P,I]=i(()=>Date.now()),{handle:T,onHandle:z}=n;t(()=>{if(!o||T!==void 0)return;let k=!0;return Hi().then(_=>{var B,j;k&&z((j=(B=_.profile)==null?void 0:B.handle)!=null?j:null)}).catch(()=>{}),()=>{k=!1}},[o,T]);let qe=!!(s.codeSentAt&&P-s.codeSentAt<mu),Ne=Math.max(0,Math.ceil((s.retryAt-P)/1e3)),V=s.retryEmail===null||s.retryEmail===d.trim().toLowerCase()?Ne:0;t(()=>{if(!o)return;let k=!0;return ns().then(_=>{!k||_||(C({kind:"warning",text:en(new v("signed_out"))}),n.onSignedOut())}).catch(()=>{}),()=>{k=!1}},[o==null?void 0:o.token]),t(()=>{if(s.retryAt<=Date.now())return;let k=setInterval(()=>{I(Date.now()),s.retryAt<=Date.now()&&clearInterval(k)},1e3);return()=>clearInterval(k)},[s.retryAt]);function R(k){let _=p(p({},It()),k);Jo(_),c(_),I(Date.now())}async function H(k){var B;let _=k.trim();if(!hu.test(_)){C({kind:"error",text:"Enter a valid email address."});return}S(!0),C(null);try{let j=await Qo(_,{nudge:n.nudge});R({email:_,codeSentAt:Date.now(),retryAt:Date.now()+j*1e3,retryEmail:_.toLowerCase()}),g("")}catch(j){let q=j instanceof v?j:null,ne=(B=q==null?void 0:q.retryAfter)!=null?B:null,Ee=ne&&ne<=gu?Date.now()+ne*1e3:0,re=(q==null?void 0:q.code)==="too_many_requests"?null:_.toLowerCase();if((q==null?void 0:q.code)==="resend_wait"){R({email:_,codeSentAt:s.email===_&&s.codeSentAt?s.codeSentAt:Date.now(),retryAt:Ee,retryEmail:re});return}Ee&&R({retryAt:Ee,retryEmail:re}),C({kind:"error",text:en(j)})}finally{S(!1)}}async function _e(){S(!0),C(null);try{let k=await es(s.email,f);R({codeSentAt:null}),g(""),n.onSignedIn(k)}catch(k){C({kind:"error",text:en(k)});let _=k instanceof v?k.code:null;(_==="too_many_attempts"||_==="code_expired")&&g("")}finally{S(!1)}}async function K(){var _;let k=(_=o==null?void 0:o.email)!=null?_:"";S(!0),C(null),await ts(),R({email:k,codeSentAt:null}),y(k),S(!1),n.onSignedOut()}async function Q(){S(!0),C(null);try{n.onOpenWebsite(await is())}catch(k){let _=k instanceof v&&k.code==="signed_out";C({kind:_?"warning":"error",text:en(k)}),_&&n.onSignedOut()}finally{S(!1)}}let ee=E?e.createElement("div",{className:"syncify-alert","data-kind":E.kind==="error"?"error":void 0,role:"alert"},E.text):null;if(o===void 0)return null;if(o){let k=a.kind==="open"||a.kind==="other-claim"||a.kind==="ended"&&a.reason!=="undone";return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",{className:"syncify-account-email"},o.email),a.kind==="secured"?e.createElement("span",{className:"syncify-muted"},e.createElement(ze,{parts:["Backup secured",a.linkedCount===1?"1 Spotify account linked":`${a.linkedCount} Spotify accounts linked`]})):a.kind==="pending"?e.createElement("span",{className:"syncify-muted syncify-account-state"},e.createElement(tr,null),e.createElement("span",null,a.held?"Syncify is checking your request to secure this backup":`Your backup will be secured ${nr(a.finalAt)}`)):a.kind==="other-account"?e.createElement("span",{className:"syncify-muted"},"This backup is secured by another account"):e.createElement("span",{className:"syncify-muted"},"Signed in")),e.createElement("span",{className:"syncify-account-actions"},e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-label":"Manage on the website",onClick:()=>{Q()},disabled:h},"Manage",e.createElement(Va,null)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{K()},disabled:h},"Sign out"))),T?e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"@",T),e.createElement("span",{className:"syncify-muted"},"Your handle")),e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-label":"Open your profile",onClick:()=>n.onOpenWebsite(ji(T))},"Profile",e.createElement(Va,null))):null,k?e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it")),e.createElement("button",{className:"syncify-button",type:"button",onClick:n.onSecure,disabled:h||n.securing||a.kind==="other-claim"},n.securing?"Securing\u2026":a.kind==="ended"?"Secure again":"Secure")):null,a.kind==="ended"?e.createElement("div",{className:"syncify-alert",role:"status"},au[a.reason]):null,n.secureError?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},n.secureError):null,ee)}return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting"},n.locked?e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Sign in to restore"),e.createElement("span",{className:"syncify-muted"},"With the email that secured this backup")):e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it"))),e.createElement("form",{className:"syncify-confirm",noValidate:!0,onSubmit:k=>{k.preventDefault(),!h&&(qe?f.length===ni&&_e():V||H(d))}},qe?e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-muted"},"Code sent to ",Su(s.email)),e.createElement("div",{className:"syncify-field"},e.createElement("input",{className:"syncify-input syncify-code-input",type:"text",inputMode:"numeric",autoComplete:"one-time-code","aria-label":"6-digit code",placeholder:"123456",maxLength:ni,value:f,onChange:k=>g(k.currentTarget.value.replace(/\D/g,"").slice(0,ni)),autoFocus:!0}),e.createElement("button",{className:"syncify-button",type:"submit",disabled:h||f.length!==ni},h?"Verifying\u2026":"Verify")),e.createElement("p",{className:"syncify-muted syncify-account-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{H(s.email)},disabled:h||Ne>0},Ne>0?`Resend in ${qa(Ne)}`:"Resend code"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{R({codeSentAt:null}),g(""),C(null)},disabled:h},"Use another email"))):e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-field"},e.createElement("input",{className:"syncify-input",type:"email",autoComplete:"email","aria-label":"Email",placeholder:"you@example.com",value:d,onChange:k=>y(k.currentTarget.value),autoFocus:!0}),e.createElement("button",{className:"syncify-button",type:"submit",disabled:h||V>0||!d.trim()},h?"Sending\u2026":"Send code")),e.createElement("p",{className:"syncify-muted"},V>0?`Send another code in ${qa(V)}`:"We only email sign-in codes.")),ee))}var lu=[["add","Add to my setup"],["replace","Replace my setup"]];function uu(n){var In;let e=Spicetify.React,t=e.useEffect,i=e.useMemo,o=e.useRef,a=e.useState,{session:s}=n,[c,d]=a(""),[y,f]=a(!1),[g,h]=a(null),[S,E]=a(null),[C,P]=a(null),[I,T]=a(null),[z,qe]=a("add"),[Ne,V]=a(!1),[R,H]=a(()=>new Set),[_e,K]=a(null),[Q,ee]=a(void 0),[k,_]=a(!1),[B,j]=a(null),[q,ne]=a(0),Ee=o(!1),[re,at]=a(null),[wn,rt]=a(null),[A,ce]=a(null),[Ie,on]=a(""),[sn,J]=a(null),[F,te]=a(null),[Te,xn]=a(""),[D,ie]=a(null),[Oe,pe]=a(!1),[me,vn]=a(!1),[Ge,an]=a(null),[x,Ue]=a(null),[ct,Ve]=a(null),[X,lt]=a(!1),[Pe,ut]=a(null),Ae=o(0),$=i(()=>S?Ys(S.file,S.items,n.localItems,n.localConfig,n.localTheme,z):null,[S,n.localItems,n.localConfig,n.localTheme,z]),Be=i(()=>{if(!$||!S)return null;let u=new Set(S.items.map(m=>m.key));return $.items.filter(m=>m.change!=="removed"&&u.has(m.key)&&(z==="replace"||m.isNew))},[$,S,z]),oe=i(()=>Be?qn(Be):null,[Be]),Y=i(()=>new Map([..._e!=null?_e:[],...oe!=null?oe:[]]),[_e,oe]),Me=i(()=>$&&Q!==void 0?Ws($,Q):new Set,[$,Q]),O=i(()=>{var u;return new Set([...((u=$==null?void 0:$.items)!=null?u:[]).filter(m=>{var b;return m.change!=="removed"&&m.isNew&&(Ye(Y.get(m.key))||((b=Y.get(m.key))==null?void 0:b.kind)==="unchecked")}).map(m=>m.key),...Me])},[$,Y,Me]),si=[...O].filter(u=>Me.has(u)||!R.has(u)),$e=$!==null&&(_e===null||Q===void 0),Cn=D?D.items.filter(u=>!D.leftOut.has(u.key)):[],ge=!!(B&&re!==null&&B.length>=re),Je=F!==null&&F.code===null&&!wn,le=Je?$s(Ie):null,[Nn,dt]=a(null);t(()=>{if(!le){dt(null);return}let u=window.setTimeout(()=>dt(le),nu);return()=>window.clearTimeout(u)},[le]),t(()=>{if(K(null),!Be||!oe)return;[...oe.values()].some(Ye)&&V(!0);let u=!0;return Gn(Be,oe).then(m=>{u&&(K(m),[...m.values()].some(Ye)&&V(!0))}),()=>{u=!1}},[Be,oe]),t(()=>{Xs().then(P)},[]),t(()=>{j(null),te(null),Ue(null),Ee.current=!1,s&&Xe()},[s==null?void 0:s.token]);async function rn(u){let m=u!=null?u:Ks(c);if(h(null),E(null),!m){h(jt(new v("no_code")));return}f(!0),T(u!=null?u:null);try{let b=await Js(m);qe("add"),H(new Set),V(!1),E({file:b,items:G(b.keys),pick:u!==void 0}),$i().then(ee)}catch(b){h(jt(b))}finally{f(!1),T(null)}}async function ai(){if(!(!S||!$)){_(!0),h(null);try{await fa(n.config,S.file,z,si,Q!=null?Q:null,S.pick),Spicetify.showNotification("Syncify: setup loaded. Reloading\u2026"),Rt($.manual,"share"),setTimeout(()=>window.location.reload(),1e3)}catch(u){_(!1),h(u instanceof Qn?`${u.message} ${yu(u.reason)}`:u instanceof Error?u.message:String(u))}}}async function Xe(){var u,m;J(null);try{let b=await Hi();j(b.codes),Ee.current||(Ee.current=!0,ne(b.newHearts)),n.onCodeCount(b.codes.length),at(b.max),rt(b.profile),n.onHandle((m=(u=b.profile)==null?void 0:u.handle)!=null?m:null),ce(b.suggestedHandle)}catch(b){_n(b,J)}}function _n(u,m){m(jt(u,re)),u instanceof v&&u.code==="signed_out"&&n.onSignedOut()}async function yt(u){var b;let m=++Ae.current;te({code:u}),xn((b=u==null?void 0:u.name)!=null?b:""),on(A!=null?A:""),ie(null),pe(!1),an(null),Ue(null),Ve(null);try{let ue=await ye(),Tn=await js(G(ue),ue);if(m!==Ae.current)return;ie(p({keys:ue},Tn)),Tn.leftOut.size>0&&pe(!0)}catch(ue){if(m!==Ae.current)return;te(null),an(ue instanceof Error?ue.message:String(ue))}}function ri(){Ae.current+=1,te(null),ie(null)}async function ci(){if(!F||!D)return;vn(!0),an(null);let u=Fs(D.keys,Cn);try{let m=F.code?await Gs(F.code.code,Te.trim(),u):await qs(Te.trim(),u,Je?Ie.trim():void 0);Ue(N(p({},m),{outcome:F.code?"updated":"created"})),te(null),ie(null),await Xe()}catch(m){if(m instanceof v&&m.code==="same_setup"&&m.share){Ue(N(p({},m.share),{leftOut:0,outcome:"existing"})),te(null),ie(null);return}_n(m,an),m instanceof v&&m.code==="publish_failed"&&(te(null),Xe())}finally{vn(!1)}}async function En(u){lt(!0),J(null);try{await Vs(u),Ve(null),(x==null?void 0:x.code)===u&&Ue(null),await Xe()}catch(m){_n(m,J)}finally{lt(!1)}}async function cn(u,m){await Qa(u)&&(ut(m),setTimeout(()=>ut(b=>b===m?null:b),2e3))}return e.createElement(e.Fragment,null,e.createElement("form",{className:"syncify-field syncify-share-load",noValidate:!0,onSubmit:u=>{u.preventDefault(),!y&&!k&&c.trim()&&rn()}},e.createElement("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-input"},"Load a setup"),e.createElement("input",{className:"syncify-input syncify-share-input",id:"syncify-share-input",type:"text",placeholder:"Paste a code or a link",autoComplete:"off",spellCheck:!1,value:c,onChange:u=>d(u.currentTarget.value),disabled:k}),e.createElement("button",{className:"syncify-button secondary",type:"submit",disabled:y||k||!c.trim()},y?"Loading\u2026":"Preview")),g?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},g):null,S&&$?e.createElement("div",{className:"syncify-confirm"},e.createElement("span",{className:"syncify-share-title"},e.createElement("p",{className:"syncify-confirm-title"},"Load ",(In=S.file.name)!=null?In:xe(S.file.code),"?"),S.file.creator?e.createElement("button",{className:"syncify-text-button",type:"button",title:"Open their profile",onClick:()=>window.open(ji(S.file.creator),"_blank","noopener,noreferrer")},"by @",S.file.creator):null),e.createElement("div",{className:"syncify-share-modes",role:"radiogroup","aria-label":"How to load it"},lu.map(([u,m])=>e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":z===u,"data-selected":z===u?"true":"false",type:"button",key:u,onClick:()=>qe(u),disabled:k},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,m))))),e.createElement(Za,{preview:$,checks:Y,off:O,fixed:Me,switchLabel:"Load",allowed:R,unapproved:!1,onAllow:(u,m)=>{let b=new Set(R);m?b.add(u):b.delete(u),H(b)},expanded:Ne,onToggle:()=>V(!Ne)}),n.marketplaceAvailable===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to load a setup."):e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>E(null),disabled:k},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{ai()},disabled:k||$e||n.busy},k?"Applying\u2026":$e?"Checking\u2026":"Apply"))):null,C?e.createElement("section",{className:"syncify-share-part","aria-label":C.length>0?"Syncify picks":"Discover"},C.length>0?e.createElement("h5",{className:"syncify-change-group"},"Syncify picks"):null,e.createElement("ul",{className:"syncify-change-list syncify-share-codes"},C.map(u=>e.createElement("li",{className:"syncify-setting",key:u.code},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",{className:"syncify-account-email"},u.name),e.createElement("span",{className:"syncify-muted syncify-pick-detail"},e.createElement(pu,{pick:u}),ei(u.extensions+u.themes+u.snippets,"item"))),e.createElement("button",{className:"syncify-text-button",type:"button",disabled:y||k,onClick:()=>{rn(u.code)}},I===u.code?"Loading\u2026":"Preview"))),e.createElement("li",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Find more setups"),e.createElement("span",{className:"syncify-muted"},"People's setups on Discover")),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>window.open(`${L().webUrl.replace(/\/+$/,"")}/discover`,"_blank","noopener,noreferrer")},"Open Discover")))):null,s===void 0?null:s?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting syncify-share-part"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Share this setup"),e.createElement("span",{className:"syncify-muted"},B&&B.length>0&&re!==null?fu(re-B.length):"Get a code anyone can load")),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{yt(null)},disabled:F!==null||B===null||ge||n.marketplaceAvailable===!1,title:ge?"Delete a code to make another":void 0},"Share")),F?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},F.code?`Update ${xe(F.code.code)} with this setup?`:"Share this setup?"),D?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-chips","aria-label":"What goes in"},e.createElement("span",{className:"syncify-chip"},Cn.length," going in"),D.leftOut.size?e.createElement("span",{className:"syncify-chip","data-change":"off"},D.leftOut.size," left out"):null),D.items.length?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":Oe,"aria-controls":"syncify-share-items",onClick:()=>pe(!Oe)},Oe?"Hide items":"Show items",e.createElement(kn,null)):null,Oe?e.createElement(du,{items:D.items,leftOut:D.leftOut}):null,e.createElement("div",{className:"syncify-share-fields"},e.createElement("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-name"},"Setup name"),e.createElement("input",{id:"syncify-share-name",className:"syncify-input",type:"text",placeholder:"Optional",maxLength:Us,value:Te,onChange:u=>xn(u.currentTarget.value),disabled:me}),Je?e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-muted syncify-share-handle-note"},"It's your first time creating a share code. Pick a handle for your profile:"),e.createElement("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-handle"},"Your handle"),e.createElement("span",{className:"syncify-input syncify-handle-input"},e.createElement("span",{"aria-hidden":"true"},"@"),e.createElement("input",{id:"syncify-share-handle",type:"text",placeholder:"handle",autoComplete:"off",spellCheck:!1,maxLength:Ki,value:Ie,onChange:u=>on(u.currentTarget.value.replace(/^@/,"")),disabled:me})),Ie&&Nn?e.createElement("span",{className:"syncify-share-handle-problem",role:"alert"},Nn):null):null)):e.createElement("p",{className:"syncify-muted"},"Checking your items\u2026"),e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:ri,disabled:me},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{ci()},disabled:!D||Cn.length===0||me||Je&&le!==null},D?me?F.code?"Updating\u2026":"Creating\u2026":F.code?"Update":"Create code":"Checking\u2026"))):null,Ge?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},Ge):null,x?e.createElement("div",{className:"syncify-confirm"},e.createElement("span",{className:"syncify-manual-header"},e.createElement("span",{className:"syncify-confirm-title"},x.outcome==="existing"?"You already shared this setup":x.outcome==="updated"?"Code updated":"Your code is ready"),e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>Ue(null)},e.createElement(ao,null))),e.createElement("span",{className:"syncify-code syncify-share-code"},e.createElement("code",null,xe(x.code)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{cn(xe(x.code),"saved-code")}},Pe==="saved-code"?"Copied":"Copy"),x.link?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{cn(x.link,"saved-link")}},Pe==="saved-link"?"Copied":"Get link"):null),x.leftOut?e.createElement("p",{className:"syncify-muted"},x.leftOut===1?"1 snippet isn't in Marketplace's list anymore, so it was left out.":`${x.leftOut} snippets aren't in Marketplace's list anymore, so they were left out.`):null,x.outcome==="created"&&C?e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Post it on Discover"),e.createElement("span",{className:"syncify-muted"},"Let people find it and try it")),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>window.open(`${L().webUrl.replace(/\/+$/,"")}/discover?post=${encodeURIComponent(x.code)}`,"_blank","noopener,noreferrer")},"Post")):null):null,sn?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,sn),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Xe()}},"Try again"))):null,B&&B.length>0?e.createElement("section",{"aria-label":"Your codes"},e.createElement("h5",{className:"syncify-change-group syncify-codes-heading"},"Your codes",q>0?e.createElement("span",{className:"syncify-tag","data-tone":"new"},ei(q,"new heart")):null),e.createElement("ul",{className:"syncify-change-list syncify-share-codes"},B.map(u=>{var m;return e.createElement("li",{className:"syncify-setting",key:u.code},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",{className:"syncify-account-email"},(m=u.name)!=null?m:xe(u.code)),e.createElement("span",{className:"syncify-muted"},ct===u.code?u.posted?"Delete it? Its link stops working and its post comes off Discover.":"Delete it? Its link stops working.":e.createElement(ze,{parts:[u.name?xe(u.code):null,ei(u.item_count,"item"),`Used by ${u.imports}`,u.hearts===null?null:ei(u.hearts,"heart")]}))),e.createElement("span",{className:"syncify-account-actions"},ct===u.code?e.createElement(e.Fragment,null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Ve(null),disabled:X},"Cancel"),e.createElement("button",{className:"syncify-text-button","data-danger":"true",type:"button",onClick:()=>{En(u.code)},disabled:X},X?"Deleting\u2026":"Delete")):e.createElement(e.Fragment,null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{yt(u)},disabled:F!==null||X},"Update"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{cn(xe(u.code),`code:${u.code}`)}},Pe===`code:${u.code}`?"Copied":"Copy"),u.link?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{cn(u.link,`link:${u.code}`)}},Pe===`link:${u.code}`?"Copied":"Get link"):null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Ve(u.code),disabled:X},"Delete"))))}))):null):e.createElement("div",{className:"syncify-setting syncify-share-part"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Share this setup"),e.createElement("span",{className:"syncify-muted"},"Get a code anyone can load")),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:n.onSignIn},"Sign in to share")))}var za={in:{mark:"+",label:"Goes in"},out:{mark:"\u2212",label:"Left out"}};function du(n){let e=Spicetify.React;return e.createElement("div",{className:"syncify-changes",id:"syncify-share-items"},Xa.map(([t,i])=>{let o=n.items.filter(a=>a.type===t).sort((a,s)=>a.name.localeCompare(s.name));return o.length===0?null:e.createElement("section",{key:t,"aria-label":i},e.createElement("h5",{className:"syncify-change-group"},i),e.createElement("ul",{className:"syncify-change-list"},o.map(a=>{let s=n.leftOut.get(a.key),c=s?za.out:za.in;return e.createElement("li",{className:"syncify-change",key:a.key},e.createElement("span",{className:"syncify-mark","data-change":s?"removed":"added",role:"img","aria-label":c.label},c.mark),e.createElement("span",{className:"syncify-change-name"},a.name,a.repo?e.createElement("span",{className:"syncify-change-detail"},e.createElement(bn,null),a.repo):null),s?e.createElement(Ra,{check:s}):null)})))}))}function yu(n){return n instanceof we?"Sign in to back up.":n instanceof Error?n.message:String(n)}async function Qa(n){var e;try{return await navigator.clipboard.writeText(n),!0}catch(t){let i=(e=Spicetify.Platform)==null?void 0:e.ClipboardAPI;return i!=null&&i.copy?(await i.copy(n),!0):!1}}function fu(n){return n<=0?"No codes left, delete one to make another":`${n} ${n===1?"code":"codes"} left`}var Qt=12;function bn(){let n=Spicetify.React;return n.createElement(n.Fragment,null,n.createElement("span",{className:"syncify-sep","aria-hidden":"true"}),n.createElement("span",{className:"syncify-sr-only"},", "))}function ze(n){let e=Spicetify.React,t=n.parts.filter(i=>!!i);return e.createElement("span",{className:"syncify-parts"},t.map((i,o)=>e.createElement(e.Fragment,{key:o},o>0?e.createElement(bn,null):null,i)))}function pu(n){let e=Spicetify.React,{extensions:t,themes:i,snippets:o}=n.pick,a=[...Array(Math.min(t,Qt)).fill("extension"),...Array(Math.min(i,Qt)).fill("theme"),...Array(Math.min(o,Qt)).fill("snippet")].slice(0,Qt);return e.createElement("span",{className:"syncify-pips","aria-hidden":"true"},a.map((s,c)=>e.createElement("span",{className:"syncify-pip","data-kind":s,key:c})))}function ei(n,e){return`${n} ${e}${n===1?"":"s"}`}var ni=6,mu=600*1e3,gu=300,hu=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function Su(n){let e=n.lastIndexOf("@");return e<1?n:`${n[0]}***${n.slice(e)}`}function er(n){let e=new Date(n),t=new Date;return e.toDateString()===t.toDateString()?"today":e.toLocaleDateString(void 0,{month:"short",day:"numeric",year:e.getFullYear()===t.getFullYear()?void 0:"numeric"})}function nr(n){let e=er(n);return e==="today"?e:`on ${e}`}function ku(n){let e=er(n);return e==="today"?e:`before ${e}`}function co(n){var t;if(n.not_me)return"Syncify is checking this claim.";let e=`${(t=n.email)!=null?t:"Someone"} is securing this backup.`;return n.held?`${e} Syncify is checking it.`:`${e} If that isn't you, press Not me ${ku(n.final_at)}.`}function lo(n){return n==="cancelled"?"Syncify: claim cancelled":"Syncify: sent for a check"}function qa(n){return`${Math.floor(n/60)}:${String(n%60).padStart(2,"0")}`}function io(n){let e=Spicetify.React,t=n.openSection===n.id,i=`syncify-section-${n.id}`;return e.createElement("section",{className:"syncify-accordion-section","aria-label":n.title},e.createElement("button",{className:"syncify-accordion-header",type:"button","aria-expanded":t,"aria-controls":i,onClick:()=>n.onToggle(t?null:n.id)},e.createElement("span",{className:"syncify-accordion-title"},n.title),!t&&n.status?e.createElement("span",{className:"syncify-accordion-status","data-kind":n.status.kind,role:"img","aria-label":n.status.label,title:n.status.label},n.status.kind==="ok"?e.createElement(wu,null):n.status.kind==="warning"?e.createElement(xu,null):n.status.kind==="pending"?e.createElement(tr,null):n.status.kind==="count"?n.status.text:null):null,e.createElement(kn,null)),t?e.createElement("div",{className:"syncify-accordion-body",id:i},n.children):null)}function Ga(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-shield",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"}))}function uo(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-warning-icon",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M12 3 2 21h20z"}),n.createElement("path",{d:"M12 10v5"}),n.createElement("path",{d:"M12 18h.01"}))}function bu(n,e,t){return e?{kind:"warning",label:"Sign in to see your backups"}:n?t.kind==="secured"?{kind:"ok",label:"Signed in, backup secured"}:t.kind==="pending"?{kind:"pending",label:t.held?"Backup not secured yet":`Your backup will be secured ${nr(t.finalAt)}`}:t.kind==="open"?{kind:"warning",label:"Backup not secured yet"}:t.kind==="ended"?{kind:"warning",label:"Backup not secured"}:{kind:"ok",label:"Signed in"}:null}function wu(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"10"}),n.createElement("path",{d:"m9 12 2 2 4-4"}))}function xu(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"10"}),n.createElement("path",{d:"M12 8v4"}),n.createElement("path",{d:"M12 16h.01"}))}function kn(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-chevron",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"m9 6 6 6-6 6"}))}function vu(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-lock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("rect",{x:"5",y:"11",width:"14",height:"10",rx:"2"}),n.createElement("path",{d:"M8 11V7a4 4 0 0 1 8 0v4"}))}function tr(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-clock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"9"}),n.createElement("path",{d:"M12 7v5l3 2"}))}function Va(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-external",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M14 4h6v6"}),n.createElement("path",{d:"M20 4 10 14"}),n.createElement("path",{d:"M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"}))}function ao(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M18 6 6 18"}),n.createElement("path",{d:"m6 6 12 12"}))}var Cu=600*1e3,Nu=3,_u={exists:!1,payload:null,backups:[],safetyCopy:null,claim:null,unapproved:[],install:null,nudge:!1},Eu=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function Iu(n,e,t,i){var E;let o=new Set(e),a=new Set(t),s=t.filter(C=>!o.has(C)).length,c=e.filter(C=>!a.has(C)).length,d=(E=n.spicetify_config)!=null?E:null,y=!!(i&&!d),f=!y&&(i&&d?!ms(i,d):i!==d),g=[s?`${s} added`:null,c?`${c} removed`:null,f?"Spicetify config changed":null].filter(Boolean),h=it(n.metadata.last_sync_datetime),S=g.length?`${g.join(", ")} since ${h}`:`Last backup ${h}`;return y?[S,"Spicetify config not saved yet"]:[S]}function Ja(n){return n===1?"1 extension or theme":`${n} extensions and themes`}function it(n){let e=new Date(n);if(Number.isNaN(e.getTime()))return n;let t=e.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),i=new Date,o=new Date(i);return o.setDate(i.getDate()-1),e.toDateString()===i.toDateString()?`today, ${t}`:e.toDateString()===o.toDateString()?`yesterday, ${t}`:`${e.toLocaleDateString(void 0,{month:"short",day:"numeric",year:e.getFullYear()===i.getFullYear()?void 0:"numeric"})}, ${t}`}function ir(n){let e=Spicetify.React,t=e.useState,{claim:i}=n,[o,a]=t(!1),[s,c]=t(null);async function d(){a(!0),c(null);try{Spicetify.showNotification(lo(await Jt(fe()))),n.onClose()}catch(y){c(y instanceof Error?y.message:String(y)),a(!1)}}return e.createElement("div",{className:"syncify-panel"},e.createElement("p",{className:"syncify-claim-notice"},co(i)),s?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},s):null,e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:n.onClose,disabled:o},"Close"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{d()},disabled:o},"Not me")))}function or(n){let e=Spicetify.React;return e.createElement("div",{className:"syncify-panel"},e.createElement("p",{className:"syncify-claim-notice"},"Your backup isn't secured yet. Anyone who knows your Spotify username can restore it or claim it as theirs. Secure it with your email so only you can."),e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:n.onClose},"Not now"),e.createElement("button",{className:"syncify-button",type:"button",onClick:n.onSecure},"Secure")))}var ti="[Syncify]";function ae(n,e){if(e===void 0){console.debug(ti,n);return}console.debug(ti,n,e)}function ot(n,e){if(e===void 0){console.warn(ti,n);return}console.warn(ti,n,e)}function Tu(){var n;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((n=Spicetify==null?void 0:Spicetify.Topbar)!=null&&n.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var ar="syncify-styles";function Pu(){if(document.getElementById(ar)){ae("Another copy of Syncify is running; stopping this one");return}Au();let n=fe();ua({topbarButton:Mu(),menuItem:$u()}),Wt(n.entryPoint),qi(n.shortcut,oi),Na({onClaim:e=>{ju(e)},onInstall:Fu,onNudge:Yu}).catch(e=>{ot("Startup sync check failed",e)}),Oa().catch(e=>{ot("Restore check failed",e)})}function Au(){let n=document.createElement("style");n.id=ar,n.textContent=$o,document.head.appendChild(n)}function Mu(){let{extensionName:n}=L(),e=new Spicetify.Topbar.Button(n,Si,t=>{ae("Topbar button clicked",ii(t)),oi()},!1,!0);return rr(e),Ou(e),Hu(e),ae("Topbar button registered",ii(e)),e}function rr(n){var t;let e=n;n.element.style.setProperty("-webkit-app-region","no-drag"),(t=e.button)==null||t.style.setProperty("-webkit-app-region","no-drag")}var sr=".main-actionButtons",Du=".Root__globalNav, .Root__top-bar",Lu=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function Ou(n){if(typeof MutationObserver=="undefined")return;let e=!1,t=null,i=()=>{e=!1,a();let s=n.element,c=document.querySelector(sr);!s||!c||c.contains(s)||(c.prepend(s),Uu(n),rr(n),ae("Topbar button re-attached",ii(n)))},o=new MutationObserver(()=>{e||(e=!0,setTimeout(i,250))}),a=()=>{var d;if(t!=null&&t.isConnected)return;let s=document.querySelector(sr),c=(d=s==null?void 0:s.closest(Du))!=null?d:s==null?void 0:s.parentElement;if(o.disconnect(),t=c!=null?c:null,!c){o.observe(document.body,{childList:!0,subtree:!0});return}o.observe(c,{childList:!0,subtree:!0});for(let y=c.parentElement;y;y=y.parentElement)o.observe(y,{childList:!0})};i()}function Uu(n){let e=Bu(n);if(!e||e.className&&e.className!=="undefined")return;let t=Array.from(document.querySelectorAll(Lu)).find(i=>!n.element.contains(i));t!=null&&t.className&&(e.className=t.className)}function Bu(n){return n.button}function $u(){var n;if(typeof((n=Spicetify.Menu)==null?void 0:n.Item)!="function")return null;try{return new Spicetify.Menu.Item(L().extensionName,!1,()=>oi(),Ku())}catch(e){return ot("Failed to create profile menu item",e),null}}function Ku(){return Si.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function Hu(n){Object.assign(window,{SyncifyDebug:{button:n,element:n.element,openModal:oi,inspect:()=>ii(n),clickElement:()=>{var e;return(e=n.element)==null?void 0:e.click()},clickInnerButton:()=>{var e;return(e=n.button)==null?void 0:e.click()},clickCallback:()=>n.onClick(n)}})}function ii(n){var e,t,i,o,a;return{label:n.label,disabled:n.disabled,isRight:n.isRight,hasElement:!!n.element,elementConnected:(e=n.element)==null?void 0:e.isConnected,elementDisabled:(t=n.element)==null?void 0:t.disabled,elementAriaDisabled:(i=n.element)==null?void 0:i.getAttribute("aria-disabled"),elementClass:(o=n.element)==null?void 0:o.className,appRegion:n.element?getComputedStyle(n.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:n.button?getComputedStyle(n.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:n.element?getComputedStyle(n.element).pointerEvents:null,visibility:n.element?getComputedStyle(n.element).visibility:null,display:n.element?getComputedStyle(n.element).display:null,rect:(a=n.element)==null?void 0:a.getBoundingClientRect().toJSON()}}var U=null;function oi(){if(U!=null&&U.container.isConnected){ae("Closing modal"),Spicetify.PopupModal.hide();return}ae("Opening modal"),st(Spicetify.React.createElement(ro))}async function ju(n){U!=null&&U.container.isConnected||(ae("Opening claim notice"),st(Spicetify.React.createElement(ir,{claim:n,onClose:()=>Spicetify.PopupModal.hide()})))}function Fu(n){if(U!=null&&U.container.isConnected)return;ae("Opening install notice");let e=()=>Spicetify.PopupModal.hide();st(Spicetify.React.createElement("div",{className:"syncify-panel"},Spicetify.React.createElement(Ka,{install:n,onDone:e,onClose:e})))}function Yu(){U!=null&&U.container.isConnected||(ae("Opening nudge notice"),wa(),st(Spicetify.React.createElement(or,{onSecure:()=>st(Spicetify.React.createElement(ro,{section:"account",secure:!0})),onClose:()=>Spicetify.PopupModal.hide()})))}function st(n){var t;(t=U==null?void 0:U.root)==null||t.unmount();let e=document.createElement("div");U={container:e,root:null};try{Spicetify.PopupModal.display({title:L().extensionName,content:e,isLarge:!1})}catch(i){throw ot("Failed to open PopupModal",i),i}Wu(e),qu(e,n)}function Wu(n){requestAnimationFrame(()=>{let e=zu(n);e==null||e.classList.add("syncify-modal-shell");let t=e==null?void 0:e.querySelector(".main-trackCreditsModal-header h1");if(t&&!t.querySelector(".syncify-modal-mark")){let o=document.createElement("span");o.className="syncify-modal-mark",o.innerHTML=Ko,t.prepend(o)}let i=e==null?void 0:e.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');i&&(i.classList.add("syncify-modal-close"),i.setAttribute("aria-label",`Close ${L().extensionName}`),i.title="Close",i.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function zu(n){let e=n.parentElement;for(;e&&e!==document.body;){if(e.querySelector(".main-trackCreditsModal-header"))return e;e=e.parentElement}return n.closest('[class*="trackCreditsModal"]')}function qu(n,e){try{if(typeof Spicetify.ReactDOM.createRoot=="function"){let t=Spicetify.ReactDOM.createRoot(n);t.render(e),(U==null?void 0:U.container)===n&&(U.root=t),ae("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(e,n),ae("Modal rendered",{renderer:"render"})}catch(t){throw ot("Failed to render modal",t),t}}La();(function n(){if(!Tu()){setTimeout(n,100);return}ae("Spicetify APIs ready"),Pu()})();})();
