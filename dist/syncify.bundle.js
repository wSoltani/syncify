// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var xr=Object.defineProperty,vr=Object.defineProperties;var Cr=Object.getOwnPropertyDescriptors;var Mo=Object.getOwnPropertySymbols;var Nr=Object.prototype.hasOwnProperty,Ir=Object.prototype.propertyIsEnumerable;var Lo=(n,e,t)=>e in n?xr(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,p=(n,e)=>{for(var t in e||(e={}))Nr.call(e,t)&&Lo(n,t,e[t]);if(Mo)for(var t of Mo(e))Ir.call(e,t)&&Lo(n,t,e[t]);return n},v=(n,e)=>vr(n,Cr(e));var Do=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var pi=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var Oo=`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="-2.5 -2.5 37 37" aria-hidden="true" focusable="false"><defs><mask id="syncify-mark-gap" maskUnits="userSpaceOnUse" x="-2" y="-2" width="36" height="36"><rect x="-2" y="-2" width="36" height="36" fill="#fff"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></mask></defs><g mask="url(#syncify-mark-gap)"><g transform="rotate(15 16 16)"><path d="M16 16L16 7.4A8.6 8.6 0 0 1 24.6 16Z" fill="#6cd1d1" transform="translate(0.42 -0.42)"/><path d="M16 16L24.6 16A8.6 8.6 0 0 1 16 24.6Z" fill="#efa4c1" transform="translate(0.42 0.42)"/><path d="M16 16L16 24.6A8.6 8.6 0 0 1 7.4 16Z" fill="#d3c48c" transform="translate(-0.42 0.42)"/><path d="M16 16L7.4 16A8.6 8.6 0 0 1 16 7.4Z" fill="#88bcf2" transform="translate(-0.42 -0.42)"/></g></g><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 28.03A12.4 12.4 0 1 1 28.03 19"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91"/></g></svg>
`;var Pr="syncify",hn="state";function mi(){let n;try{n=window.indexedDB}catch(e){return Promise.resolve(null)}return n?new Promise(e=>{let t;try{t=n.open(Pr,1)}catch(i){e(null);return}t.onupgradeneeded=()=>{t.result.createObjectStore(hn)},t.onerror=()=>e(null),t.onblocked=()=>e(null),t.onsuccess=()=>e(t.result)}):Promise.resolve(null)}function gi(n,e){let t=mi().then(i=>new Promise((o,a)=>{if(!i){a(new Error("IndexedDB isn't available."));return}try{let s=i.transaction(hn,n),c=e(s.objectStore(hn));s.oncomplete=()=>{i.close(),o(c.result)},s.onerror=s.onabort=()=>{var u;i.close(),a((u=s.error)!=null?u:new Error("IndexedDB failed."))}}catch(s){i.close(),a(s)}}));return Promise.race([t,new Promise((i,o)=>setTimeout(()=>o(new Error("IndexedDB took too long.")),2e3))])}function Sn(n){return gi("readonly",e=>e.get(n))}async function kn(n,e){await gi("readwrite",t=>t.put(e,n))}async function Uo(n){await gi("readwrite",e=>e.delete(n))}var De={extensionName:"Syncify",version:"1.14.0",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com",shareUrl:"https://syncs.wsoltani.com"};function D(){var e,t,i,o,a,s,c,u,y;let n=window.SyncifyConfig;return{extensionName:(e=$e(n==null?void 0:n.extensionName))!=null?e:De.extensionName,version:(t=Bo(n==null?void 0:n.version))!=null?t:De.version,workerUrl:(i=$e(n==null?void 0:n.workerUrl))!=null?i:De.workerUrl,webUrl:(o=$e(n==null?void 0:n.webUrl))!=null?o:De.webUrl,githubUrl:(a=$e(n==null?void 0:n.githubUrl))!=null?a:De.githubUrl,kofiUrl:(s=$e(n==null?void 0:n.kofiUrl))!=null?s:De.kofiUrl,issueUrl:(c=$e(n==null?void 0:n.issueUrl))!=null?c:De.issueUrl,releasesUrl:(u=$e(n==null?void 0:n.releasesUrl))!=null?u:De.releasesUrl,shareUrl:(y=$e(n==null?void 0:n.shareUrl))!=null?y:De.shareUrl}}function $e(n){return Bo(n)}function Bo(n){return typeof n=="string"&&n.trim()?n.trim():null}var Ar="x-syncify-version",Mr="x-syncify-install",Lr="x-syncify-timezone",$o="install-id",Ko="syncify:install-id",Dr=2e3,kt=null;async function Ho(){let n={[Ar]:D().version,[Mr]:(await hi()).id},e=Br();return e&&(n[Lr]=e),n}function hi(){return kt!=null||(kt=Or().catch(()=>({id:bt(),inDatabase:!1}))),kt}async function Or(){let n=await Promise.race([Ur(),new Promise(e=>setTimeout(()=>e(null),Dr))]);if(n)return{id:n,inDatabase:!0};try{let e=window.localStorage.getItem(Ko);if(e&&jo(e))return{id:e,inDatabase:!1};let t=bt();return window.localStorage.setItem(Ko,t),{id:t,inDatabase:!1}}catch(e){return{id:bt(),inDatabase:!1}}}async function Ur(){let n=await mi();return n?new Promise(e=>{let t=null;try{let i=n.transaction(hn,"readwrite"),o=i.objectStore(hn),a=o.get($o);a.onsuccess=()=>{if(typeof a.result=="string"&&jo(a.result)){t=a.result;return}t=bt(),o.put(t,$o)},i.oncomplete=()=>{n.close(),e(t)},i.onerror=i.onabort=()=>{n.close(),e(null)}}catch(i){n.close(),e(null)}}):null}function bt(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let n=crypto.getRandomValues(new Uint8Array(16));n[6]=n[6]&15|64,n[8]=n[8]&63|128;let e=[...n].map(t=>t.toString(16).padStart(2,"0"));return[e.slice(0,4).join(""),e.slice(4,6).join(""),e.slice(6,8).join(""),e.slice(8,10).join(""),e.slice(10).join("")].join("-")}function jo(n){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(n)}function Br(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(n){return null}}var $r="syncify-signature-v1",Kr={name:"ECDSA",hash:"SHA-256"};function wt(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function xt(n){return Si(new Uint8Array(await crypto.subtle.exportKey("raw",n)))}async function Dn(n,e,t,i,o){let a=await Hr(e,t,i,o),s=await crypto.subtle.sign(Kr,n,a);return Si(new Uint8Array(s))}async function Hr(n,e,t,i){let{pathname:o,search:a}=new URL(t),s=new TextEncoder,c=Si(new Uint8Array(await crypto.subtle.digest("SHA-256",s.encode(i))));return s.encode([$r,n,e.toUpperCase(),o+a,c].join(`
`))}function Si(n){let e="";for(let t=0;t<n.length;t++)e+=String.fromCharCode(n[t]);return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var Fo="device-key",ki="session",Yo="salt",en=null,On,Wo={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function bn(n){if(en)return en;let e=await Sn(Fo);return jr(e)?(en=Promise.resolve(e),e):n?(en=wt().then(async t=>(await kn(Fo,t),t)),en.catch(()=>{en=null}),en):null}async function J(){let n=await Sn(ki);return Fr(n)?n:null}function bi(n){return kn(ki,n)}async function nn(){await Uo(ki).catch(()=>{})}async function vt(){if(On===void 0){let n=await Sn(Yo).catch(()=>{});On=typeof n=="string"?n:null}return On}async function Ct(n){n!==On&&(On=n,await kn(Yo,n).catch(()=>{}))}function Nt(){return Wo}function zo(n){Wo=n}function jr(n){let e=n;return!!(e&&e.privateKey instanceof CryptoKey&&e.publicKey instanceof CryptoKey)}function Fr(n){let e=n;return!!(e&&typeof e.token=="string"&&e.token&&typeof e.email=="string")}var qo="install-key",wn=null;function Go(){return wn!=null||(wn=Yr()),wn.catch(()=>{wn=null}),wn.catch(()=>null)}async function Yr(){if(!(await hi()).inDatabase)return null;let n=await Sn(qo),e=zr(n)?n:await Wr();return{privateKey:e.privateKey,publicKey:await xt(e.publicKey)}}async function Wr(){let n=await wt();return await kn(qo,n),n}function zr(n){let e=n;return!!(e&&e.privateKey instanceof CryptoKey&&e.publicKey instanceof CryptoKey)}var qr="/api/auth/email-otp/send-verification-otp",Gr="/api/auth/sign-in/email-otp",Vr="/api/auth/get-session",Jr="/api/auth/sign-out",Xr="/api/auth/link",Rr="x-syncify-device-key",Zr="x-syncify-signature",Vo="x-syncify-salt",Qr="none",ec={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again.",link_failed:"Couldn't open the website. Try again."},x=class extends Error{constructor(t,i=null,o=null){var a;super((a=ec[t])!=null?a:"Sign-in failed. Try again.");this.code=t;this.retryAfter=i;this.share=o;this.name="AccountError"}};function tn(n){return n instanceof x?n.message:"Sign-in failed. Try again."}async function Jo(n,e={}){let t=await Bn(qr,{method:"POST",body:JSON.stringify(p({email:n,type:"sign-in"},e.nudge?{nudge:!0}:{}))});return typeof(t==null?void 0:t.resend_in)=="number"?t.resend_in:60}async function Xo(n,e){var a;let t=await bn(!0).catch(()=>{throw new x("no_device_key")}),i=await Bn(Gr,{method:"POST",body:JSON.stringify({email:n,otp:e}),keys:t,sendPublicKey:!0});if(typeof(i==null?void 0:i.token)!="string"||!i.token)throw new x("sign_in_failed");let o={token:i.token,email:typeof((a=i.user)==null?void 0:a.email)=="string"?i.user.email:n};return await bi(o).catch(()=>{throw new x("no_device_key")}),wi=!0,o}var wi=!1;async function Ro(){var e;let n=await J();if(!n||wi)return n;try{let t=await It(n,Vr,"GET");wi=!0;let i=(e=t==null?void 0:t.user)==null?void 0:e.email;if(typeof i!="string"||i===n.email)return n;let o=v(p({},n),{email:i});return await bi(o).catch(()=>{}),o}catch(t){if(t instanceof x&&t.code==="signed_out")return null;throw t}}async function Zo(){let n=await J().catch(()=>null);n&&await It(n,Jr,"POST").catch(()=>{}),await nn()}async function Qo(){let n=await J();if(!n)throw new x("signed_out");let e=await It(n,Xr,"POST"),t=typeof(e==null?void 0:e.url)=="string"?e.url:"",i=new URL(D().webUrl).origin;if(!t.startsWith(`${i}/link#`))throw new x("link_failed");return t}async function Un(n,e,t){let i=await J();if(!i)throw new x("signed_out");return It(i,n,e,t)}async function es(n,e,t){let i=await J().catch(()=>null),o=i?await bn(!1).catch(()=>null):null;await Bn(n,p({method:"POST",body:JSON.stringify(e),headers:t,keepalive:!0},i&&o?{token:i.token,keys:o}:{}))}async function It(n,e,t,i){let o=await bn(!1);if(!o)throw await nn(),new x("signed_out");return Bn(e,p({method:t,token:n.token,keys:o},i===void 0?{}:{body:JSON.stringify(i)}))}async function Bn(n,e,t=!1){var m,h,k;let i=`${D().webUrl.replace(/\/+$/,"")}${n}`,o=p({},e.headers);if(e.body!==void 0&&(o["content-type"]="application/json"),e.token&&(o.authorization=`Bearer ${e.token}`),e.keys){let N=(m=await vt())!=null?m:Qr;o[Vo]=N,o[Zr]=await Dn(e.keys.privateKey,N,e.method,i,(h=e.body)!=null?h:""),e.sendPublicKey&&(o[Rr]=await xt(e.keys.publicKey))}let a;try{a=await fetch(i,{method:e.method,headers:o,body:e.body,keepalive:e.keepalive})}catch(N){throw new x("offline")}let s=a.headers.get(Vo);s&&await Ct(s);let c=await a.json().catch(()=>null);if(a.ok)return c;let u=typeof(c==null?void 0:c.code)=="string"?c.code:a.status===503?"unavailable":"failed";if(u==="stale_salt"&&e.keys&&!t)return Bn(n,e,!0);u==="signed_out"&&await nn();let y=Number(a.headers.get("retry-after")),f=c==null?void 0:c.share;throw new x(u,Number.isFinite(y)&&y>0?y:(k=nc[u])!=null?k:null,typeof(f==null?void 0:f.code)=="string"?{code:f.code,link:typeof f.link=="string"?f.link:null}:null)}var nc={resend_wait:60,too_many_requests:60,send_failed:60};var tc="x-syncify-user-hash",ic="x-syncify-identity",oc="x-syncify-signature",sc="x-syncify-install-key",ac="x-syncify-install-signature",xi="x-syncify-salt",rc="none",cc="/restores",lc="/installs",uc="hash",ns=3,$n=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}},xe=class extends Error{constructor(t){super(t==="not_linked"?"Couldn't read that Spotify account's backups.":"Sign in to restore this backup.");this.code=t;this.name="LockedError"}},on=class extends Error{constructor(){super("This Spotify account doesn't accept backups from this install. Sign in to back up."),this.name="InstallRefusedError"}};async function is(n,e,t){var a;let i=await Ke(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(t)});if(i.status===403&&((a=await i.json().catch(()=>null))==null?void 0:a.code)==="install_refused")throw new on;if(!i.ok)throw new Error(`Backup failed with HTTP ${i.status}.`);let o=await i.json().catch(()=>null);return{unchanged:(o==null?void 0:o.unchanged)===!0,unapproved:(o==null?void 0:o.quarantined)===!0}}async function os(n,e,t,i){let o=await Ke(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({install:t,action:i})},lc);if(o.ok)return;let a=await o.json().catch(()=>null);if((a==null?void 0:a.code)!=="not_pending")throw new Error(`Couldn't answer with HTTP ${o.status}.`)}async function vi(n,e,t){var k,N,E,T;let i=await Ke(n,e,{method:"GET"},as("/",t));if(i.status===404){let w=await i.json().catch(()=>null);return{exists:!1,payload:null,backups:[],safetyCopy:null,claim:Kn(w==null?void 0:w.claim),unapproved:[],install:ts(w==null?void 0:w.install),nudge:!1}}if(!i.ok)throw new Error(`Restore failed with HTTP ${i.status}.`);let o=await i.json(),a=Kn(o.claim),s=ts(o.install),c=o.nudge===!0;delete o.claim,delete o.install,delete o.nudge;let u=[o,...(k=o.backup_history)!=null?k:[]];if(!u.every(w=>w.backup))return{exists:!0,payload:o,backups:u.slice(0,ns),safetyCopy:(N=u[ns])!=null?N:null,claim:a,unapproved:[],install:s,nudge:c};let y=u.filter(w=>{var _;return((_=w.backup)==null?void 0:_.kind)==="rolling"}),f=(E=u.find(w=>{var _;return((_=w.backup)==null?void 0:_.kind)==="anchor"}))!=null?E:null,m=u.filter(w=>{var _;return((_=w.backup)==null?void 0:_.kind)==="quarantined"}),h=(T=y[0])!=null?T:f;return h?y.length===0&&f?{exists:!0,payload:h,backups:[f],safetyCopy:null,claim:a,unapproved:m,install:s,nudge:c}:{exists:!0,payload:h,backups:y,safetyCopy:f,claim:a,unapproved:m,install:s,nudge:c}:{exists:!1,payload:null,backups:[],safetyCopy:null,claim:a,unapproved:m,install:s,nudge:c}}async function ss(n,e,t,i){try{await Ke(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:t}),keepalive:!0},as(cc,i))}catch(o){}}async function Ke(n,e,t,i="",o=!1){var E,T,w,_,Ie;let a=i?`${n.replace(/\/+$/,"")}${i}`:n,s=(E=t.method)!=null?E:"GET",c=await J().catch(()=>null),u=c?await bn(!1).catch(()=>null):null,y=await Go(),f={},m=(T=await vt())!=null?T:rc;c&&u&&(f.authorization=`Bearer ${c.token}`,f[xi]=m,f[oc]=await Dn(u.privateKey,m,s,a,(w=t.body)!=null?w:"")),y&&(f[xi]=m,f[sc]=y.publicKey,f[ac]=await Dn(y.privateKey,m,s,a,(_=t.body)!=null?_:""));let h=await fetch(a,v(p({},t),{headers:p(v(p(p({},t.headers),await Ho()),{[tc]:e.hash,[ic]:e.field}),f)})),k=h.headers.get(xi);if(k&&await Ct(k),h.status===426)throw new $n;if(h.status!==401)return h;let N=(Ie=await h.clone().json().catch(()=>null))==null?void 0:Ie.code;if(!o){if(N==="stale_salt"&&(c||y))return Ke(n,e,t,i,!0);if(N==="signed_out"&&c)return await nn(),Ke(n,e,t,i,!0)}throw N==="claimed"||N==="not_owner"||N==="not_linked"?new xe(N):(N==="signed_out"&&await nn(),new x(typeof N=="string"?N:"failed"))}function as(n,e){return e?`${n}?${uc}=${encodeURIComponent(e)}`:n}function ts(n){let e=n;if(!e||typeof e.trust!="string")return null;let t=Array.isArray(e.waiting)?e.waiting:[];return{trusted:e.trust!=="pending"&&e.trust!=="rejected",refused:e.trust==="rejected",waiting:t.flatMap(i=>{let o=i;return o&&typeof o.id=="string"&&typeof o.first_seen_at=="number"?[{id:o.id,device:typeof o.device=="string"?o.device:null,first_seen_at:o.first_seen_at}]:[]})}}function Kn(n){let e=n;return!e||typeof e.mine!="boolean"?null:e.status==="final"?{status:"final",mine:e.mine}:e.status!=="pending"||typeof e.final_at!="number"?null:p({status:"pending",mine:e.mine,email:typeof e.email=="string"?e.email:null,final_at:e.final_at,held:e.held===!0},e.waiting===!0?{waiting:!0}:{})}async function Et(n){let e=new TextEncoder().encode(n),t=await crypto.subtle.digest("SHA-256",e);return[...new Uint8Array(t)].map(i=>i.toString(16).padStart(2,"0")).join("")}function Hn(n){return JSON.stringify(Ci(n))}function Ci(n){return Array.isArray(n)?n.map(Ci):n&&typeof n=="object"?Object.keys(n).sort().reduce((e,t)=>(e[t]=Ci(n[t]),e),{}):n}function rs(){let n=navigator.userAgent;return/Windows/i.test(n)?"Windows":/Mac OS|Macintosh/i.test(n)?"macOS":/Linux/i.test(n)?"Linux":n}var dc=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,yc=100,fc="marketplace:installed-extensions",pc="marketplace:installed-themes",mc="marketplace:theme-installed",gc="marketplace:installed:",hc="marketplace";function Ii(n){return Spicetify.Config?Ei(Spicetify.Config,n):null}function Ei(n,e){var a;let t=He(n),i=new Set(Sc(e)),o=((a=e[mc])==null?void 0:a.includes(gc))===!0;return{current_theme:o?hc:t.current_theme,color_scheme:o?"":t.color_scheme,extensions:t.extensions.filter(s=>!i.has(s)),custom_apps:t.custom_apps}}function He(n){let e=n&&typeof n=="object"?n:{};return{current_theme:Ni(e.current_theme)?e.current_theme:"",color_scheme:Ni(e.color_scheme)?e.color_scheme:"",extensions:cs(e.extensions),custom_apps:cs(e.custom_apps)}}function ds(n,e){return Hn(He(n))===Hn(He(e))}function cs(n){return Array.isArray(n)?[...new Set(n.filter(Ni))].sort().slice(0,yc):[]}function Ni(n){return typeof n=="string"&&dc.test(n)}function Sc(n){let e=ls(n[fc]).map(i=>{var a;let o=(a=us(n[i]))==null?void 0:a.manifest;return o&&typeof o=="object"?o.main:void 0}),t=ls(n[pc]).flatMap(i=>{var a;let o=(a=us(n[i]))==null?void 0:a.include;return Array.isArray(o)?o:[]});return[...e,...t].flatMap(i=>{let o=typeof i=="string"?i.split("/").pop():void 0;return o?[o]:[]})}function ls(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function us(n){try{let e=n?JSON.parse(n):null;return e&&typeof e=="object"&&!Array.isArray(e)?e:null}catch(e){return null}}var kc=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],bc="marketplace:installed:",ys=`${bc}snippet:`,wc="wsoltani/syncify",xc="marketplace",fs={added:0,removed:1,unchanged:2};function X(n){let e=new Map;for(let[t,i]of kc)for(let o of Ic(n[t]))e.has(o)||e.set(o,Cc(o,i,n[o]));return[...e.values()]}function jn(n,e,t,i){let o=new Set(n.map(u=>u.key)),a=new Map(t.map(u=>[u.key,u])),s=[...n.map(u=>{let y=a.get(u.key);return v(p({},u),{change:y?"unchanged":"added",isNew:!y||y.sources.join(" ")!==u.sources.join(" ")})}),...t.filter(u=>!o.has(u.key)).map(u=>v(p({},u),{change:Fn(u,n)?"unchanged":"removed",isNew:!1}))].sort((u,y)=>fs[u.change]-fs[y.change]||u.name.localeCompare(y.name)),c={added:0,removed:0,unchanged:0};for(let u of s)c[u.change]+=1;return{items:s,counts:c,manual:vc(e,i)}}function Fn(n,e){return n.type==="extension"&&Tt(n)&&!e.some(Tt)}function Tt(n){var e;return((e=n.repo)==null?void 0:e.toLowerCase())===wc}function vc(n,e){if(!n)return[];let t=He(n),i=He(e),o=[...t.extensions.filter(s=>!i.extensions.includes(s)).map(s=>({type:"extension",name:s})),...t.custom_apps.filter(s=>!i.custom_apps.includes(s)).map(s=>({type:"custom_app",name:s}))],a=t.current_theme;return a&&a!==xc&&(a!==i.current_theme||t.color_scheme!==i.color_scheme)&&o.push(p({type:"theme",name:a},t.color_scheme?{scheme:t.color_scheme}:{})),o}function Cc(n,e,t){var u,y;let i=ps(t),o=ps(i==null?void 0:i.manifest),a=_t(i==null?void 0:i.user),s=_t(i==null?void 0:i.repo),c=(y=(u=_t(i==null?void 0:i.title))!=null?u:_t(o==null?void 0:o.name))!=null?y:n.startsWith(ys)?n.slice(ys.length):n.split("/").pop()||n;return{key:n,type:e,name:c,repo:e!=="snippet"&&a&&s?`${a}/${s}`:null,sources:Nc(e,i),custom:e==="snippet"&&(i==null?void 0:i.custom)===!0}}function Nc(n,e){return e?(n==="extension"?[e.extensionURL]:n==="theme"?[e.cssURL,e.schemesURL,...Array.isArray(e.include)?e.include:[]]:[]).filter(i=>typeof i=="string"&&i!==""):[]}function _t(n){return typeof n=="string"&&n.trim()?n.trim():null}function Ic(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function ps(n){let e=n;if(typeof n=="string")try{e=JSON.parse(n)}catch(t){return null}return e&&typeof e=="object"&&!Array.isArray(e)?e:null}var Pt="spicetify-marketplace";var Yn="settings";async function ms(){let n=await Ss();if(n.kind!=="ok")return null;try{let e=await ks(n.db,"readonly",i=>i.getAll());if(!e)return null;let t={};for(let i of e)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(t[i.key]=i.value);return t}finally{n.db.close()}}async function gs(n,e=[]){let t=await Ss();if(t.kind==="unavailable")return"unavailable";let i=t.kind==="ok"?t.db:await Ec();if(!i)return"failed";try{return await ks(i,"readwrite",a=>{let s;for(let[c,u]of Object.entries(n))s=a.put({key:c,value:u});for(let c of e)s=a.delete(c);return s})===null?"failed":"written"}finally{i.close()}}function hs(){var n;try{return(n=window.indexedDB)!=null?n:null}catch(e){return null}}async function Ss(){let n=hs();return n?await _c(n)?{kind:"missing"}:new Promise(e=>{let t=!1,i=n.open(Pt);i.onupgradeneeded=()=>{t=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),e({kind:"unavailable"})},i.onblocked=()=>e({kind:"unavailable"}),i.onsuccess=()=>{let o=i.result;if(t){o.close(),Tc(n).then(()=>e({kind:"missing"}));return}if(!o.objectStoreNames.contains(Yn)){o.close(),e({kind:"unavailable"});return}e({kind:"ok",db:o})}}):{kind:"unavailable"}}function Ec(){let n=hs();return n?new Promise(e=>{let t=n.open(Pt,1);t.onupgradeneeded=()=>{let i=t.result;i.objectStoreNames.contains(Yn)||i.createObjectStore(Yn,{keyPath:"key"})},t.onerror=()=>{console.warn("Syncify could not create Marketplace storage",t.error),e(null)},t.onblocked=()=>e(null),t.onsuccess=()=>e(t.result)}):Promise.resolve(null)}async function _c(n){if(typeof n.databases!="function")return!1;try{return!(await n.databases()).some(t=>t.name===Pt)}catch(e){return!1}}function Tc(n){return new Promise(e=>{let t=n.deleteDatabase(Pt);t.onsuccess=()=>e(),t.onerror=()=>e(),t.onblocked=()=>e()})}function ks(n,e,t){return new Promise(i=>{let o;try{o=n.transaction(Yn,e)}catch(y){console.warn("Syncify could not open a Marketplace transaction",y),i(null);return}let a,s=!1,c=y=>{s||(s=!0,i(y))};o.oncomplete=()=>c(a),o.onerror=()=>{console.warn("Syncify Marketplace transaction failed",o.error),c(null)},o.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",o.error),c(null)};let u;try{u=t(o.objectStore(Yn))}catch(y){console.warn("Syncify Marketplace request could not be issued",y),c(null);return}u&&(u.onsuccess=()=>{a=u.result},u.onerror=()=>{console.warn("Syncify Marketplace request failed",u.error),c(null)})})}var _i="marketplace:",Mt=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function pe(){let n=$c(),e=await ms();if(e)for(let[t,i]of Object.entries(e))t.startsWith(_i)&&(n[t]=i);return n}var Ac=new Set(["marketplace:active-tab","marketplace:sort"]),Ti="marketplace:installed:",At="marketplace:theme-installed",Mc=["stars","tags","lastUpdated","created"];async function Lt(n,e){let t={};for(let[i,o]of Object.entries(n))Ac.has(i)||(t[i]=i.startsWith(Ti)?Lc(o):o);return e&&(t.spicetify_config=He(e)),Et(Hn(t))}function Lc(n){try{let e=JSON.parse(n);if(!e||typeof e!="object"||Array.isArray(e))return n;for(let t of Mc)delete e[t];return e}catch(e){return n}}async function Dt(){let n=await pe(),e=Ii(n);return{keyCount:Object.keys(n).length,hash:await Lt(n,e),installedItemCount:Uc(n),installedItems:Ot(n),items:X(n),spicetifyConfig:e,marketplaceAvailable:Bc(n),activeTheme:Wn(n[At])}}function Wn(n){if(!n)return null;if(n.startsWith(Ti))return n;try{let e=JSON.parse(n);return typeof e=="string"?e:null}catch(e){return null}}async function bs(){let n=await pe(),e=Ii(n);return p({schema_version:2,metadata:{last_sync_datetime:new Date().toISOString(),device_info:rs(),marketplace_key_count:Object.keys(n).length},payload_hash:await Lt(n,e),marketplace_data:{keys:n}},e?{spicetify_config:e}:{})}async function ws(n,e=[]){var a,s;let t={},i=(s=(a=n.marketplace_data)==null?void 0:a.keys)!=null?s:{};for(let[c,u]of Object.entries(i))c.startsWith(_i)&&(t[c]=u);if(Object.keys(t).length===0)return 0;await Dc(t),e.length>0&&await Oc(t,e);let o=Ai(await pe(),t);return await Pi(t,o),Object.keys(t).length}async function Pi(n,e=[]){for(let[i,o]of Object.entries(n))window.localStorage.setItem(i,o);for(let i of e)window.localStorage.removeItem(i);if(await gs(n,e)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try again.")}function Ai(n,e){let t=new Set(Mt.flatMap(s=>{var c;return Ut((c=e[s])!=null?c:n[s]).map(String)})),i=Ot(n).filter(s=>s.startsWith(Ti)&&!t.has(s)),o=i.filter(s=>n[s]!==void 0&&e[s]===void 0),a=n[At];return a&&e[At]===void 0&&i.some(s=>a.includes(s))&&o.push(At),o}async function Dc(n){let e=await pe(),t=X(n),i=X(e).filter(s=>Fn(s,t));if(i.length===0)return;let o="marketplace:installed-extensions",a=Ut(n[o]).map(String);for(let s of i)a.includes(s.key)||a.push(s.key),n[s.key]=e[s.key];n[o]=JSON.stringify(a)}async function Oc(n,e){let t=await pe(),i=Ot(t);for(let o of Mt){if(n[o]===void 0)continue;let a=Ut(n[o]).map(String).filter(s=>!e.includes(s)||i.includes(s));n[o]=JSON.stringify(a)}for(let o of e)t[o]!==void 0?n[o]=t[o]:delete n[o]}function Uc(n){return Ot(n).length}function Ot(n){return Mt.flatMap(e=>Ut(n[e]).map(String))}function Bc(n){return!!(window.Marketplace||Mt.some(t=>n[t]!==void 0)||n["marketplace:tabs"]!==void 0)}function xs(n,e){return e===0?!1:n===0?!0:n<Math.max(2,Math.floor(e*.5))}function $c(){let n={};for(let e=0;e<window.localStorage.length;e+=1){let t=window.localStorage.key(e);if(!(t!=null&&t.startsWith(_i)))continue;let i=window.localStorage.getItem(t);i!==null&&(n[t]=i)}return n}function Ut(n){if(!n)return[];try{let e=JSON.parse(n);return Array.isArray(e)?e:[]}catch(e){return[]}}var Kc="raw.githubusercontent.com",Hc="cdn.jsdelivr.net",vs=".github.io";function Li(n){var t;if(n.protocol!=="https:")return null;let e=n.pathname.split("/").filter(Boolean);if(n.host===Kc)return Mi(e[0],e[1]);if(n.host===Hc)return e[0]==="gh"?Mi(e[1],(t=e[2])==null?void 0:t.split("@")[0]):null;if(n.host.endsWith(vs)){let i=n.host.slice(0,-vs.length);return i.includes(".")?null:Mi(i,e.length>1?e[0]:n.host)}return null}function Mi(n,e){return n&&e?`${n}/${e}`:null}var jc={extension:"spicetify-extensions",theme:"spicetify-themes"},Fc="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",Yc="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",Wc="https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/",zc="https://api.github.com/repos",qc=5e3,Gc=20,Cs="syncify:repo-topics",Ns=10080*60*1e3,Vc=200;function je(n){return(n==null?void 0:n.kind)==="host"||(n==null?void 0:n.kind)==="repo"||(n==null?void 0:n.kind)==="blocked"||(n==null?void 0:n.kind)==="catalog"}function Gn(n){let e=new Map;for(let t of n){if(t.change==="removed")continue;if(t.custom){e.set(t.key,{kind:"custom"});continue}let i=Jc(t);i&&e.set(t.key,i)}return e}async function Vn(n,e){let t=new Map,i=n.filter(s=>s.change!=="removed"&&s.isNew&&!e.has(s.key));if(i.length===0)return t;let o=i.filter(s=>s.type==="snippet"),a=i.filter(s=>s.type!=="snippet");if(o.length>0){let s=await Di();for(let c of o)s?Bt(s,c.name)||t.set(c.key,{kind:"catalog"}):t.set(c.key,{kind:"unchecked"})}if(a.length>0){let s=await Zc(),c=nl(),u=0;await Promise.all(a.map(async y=>{let f=Xc(y),m=jc[y.type];if(!f||!m)return;if(s===null){t.set(y.key,{kind:"unchecked"});return}if(Rc(f,s)){t.set(y.key,{kind:"blocked"});return}let h=el(c,f);h===void 0&&u<Gc&&(u+=1,h=await Qc(f),h!==void 0&&(c[f.toLowerCase()]={topics:h,at:Date.now()})),h===void 0?t.set(y.key,{kind:"unchecked"}):(h===null||!h.includes(m))&&t.set(y.key,{kind:"catalog"})})),tl(c)}return t}function Jc(n){let e=null;for(let t of n.sources){let i;try{i=new URL(t)}catch(a){return{kind:"host",host:t.slice(0,40)}}let o=Li(i);if(!o)return{kind:"host",host:i.host};n.repo&&o.toLowerCase()!==n.repo.toLowerCase()&&(e!=null||(e=o))}return e?{kind:"repo",repo:e}:null}function Xc(n){for(let e of n.sources)try{let t=Li(new URL(e));if(t)return t}catch(t){}return n.repo}function Rc(n,e){let t=`https://github.com/${n}`.toLowerCase();return e.some(i=>{let o=i.toLowerCase();if(!o.includes("*"))return o===t;let a=o.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${a}$`).test(t)})}function Is(n){return n.replace(/\n/g,"").trim().toLowerCase()}function Bt(n,e){return n.get(Is(e))}var zn=null,qn=null;function Zc(){return zn!=null||(zn=Es(Fc).then(n=>{let e=n==null?void 0:n.repos;return Array.isArray(e)?e.filter(t=>typeof t=="string"&&!t.startsWith("//")):(zn=null,null)})),zn}function Di(){return qn!=null||(qn=Es(Yc).then(n=>{if(!Array.isArray(n))return qn=null,null;let e=new Map;for(let t of n){if(typeof(t==null?void 0:t.title)!="string"||typeof t.code!="string")continue;let i=typeof t.preview=="string"?t.preview:null;e.set(Is(t.title),p({title:t.title,code:t.code,description:typeof t.description=="string"?t.description:""},i?{imageURL:i.startsWith("http")?i:`${Wc}${i}`}:{}))}return e})),qn}async function Qc(n){let e=await _s(`${zc}/${n}`);if((e==null?void 0:e.status)===404)return null;if(!(e!=null&&e.ok))return;let t=await e.json().catch(()=>null);return Array.isArray(t==null?void 0:t.topics)?t.topics.filter(i=>typeof i=="string"):void 0}async function Es(n){let e=await _s(n);return e!=null&&e.ok?e.json().catch(()=>null):null}async function _s(n){let e=typeof AbortController=="function"?new AbortController:null,t=setTimeout(()=>e==null?void 0:e.abort(),qc);try{return await fetch(n,{signal:e==null?void 0:e.signal})}catch(i){return null}finally{clearTimeout(t)}}function el(n,e){let t=n[e.toLowerCase()];return t&&Date.now()-t.at<Ns?t.topics:void 0}function nl(){var n;try{let e=JSON.parse((n=localStorage.getItem(Cs))!=null?n:"{}");return e&&typeof e=="object"?e:{}}catch(e){return{}}}function tl(n){let e=Date.now(),t=Object.entries(n).filter(([,i])=>e-i.at<Ns).sort(([,i],[,o])=>o.at-i.at).slice(0,Vc);try{localStorage.setItem(Cs,JSON.stringify(Object.fromEntries(t)))}catch(i){}}var il=/^[0-9A-HJKMNP-TV-Z]{6}$/,ol=6,sl="SYN-",Ms=60,Oi=20,Ls=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],al="marketplace:installed:",Kd=`${al}snippet:`,sn="marketplace:theme-installed",Ts="marketplace",Ps={added:0,removed:1,unchanged:2},rl=new RegExp(`^[a-z0-9][a-z0-9_-]{1,${Oi-2}}[a-z0-9]$`);function Ds(n){let e=n.trim().replace(/^@/,"").toLowerCase();return/[^a-z0-9_-]/.test(e)?"Only letters, digits, _ and -":e.length<3?"At least 3 characters":!/^[a-z0-9]/.test(e)||!/[a-z0-9]$/.test(e)?"Start and end with a letter or digit":null}function ve(n){return`${sl}${n}`}function Os(n){let e=n.trim();if(e.length>200)return null;if(e.includes("/")){let i=e.split(/[?#]/)[0].replace(/\/+$/,"");e=i.slice(i.lastIndexOf("/")+1).replace(/\.json$/i,"")}e=e.toUpperCase().replace(/[\s-]/g,""),e.length===ol+3&&e.startsWith("SYN")&&(e=e.slice(3));let t=e.replace(/O/g,"0").replace(/[IL]/g,"1");return il.test(t)?t:null}function Us(n){let e=n;return!e||typeof e.code!="string"||!e.keys||typeof e.keys!="object"||!Object.values(e.keys).every(t=>typeof t=="string")?null:{code:e.code,name:typeof e.name=="string"&&e.name?e.name:null,creator:typeof e.creator=="string"&&rl.test(e.creator)?e.creator:null,updated_at:typeof e.updated_at=="number"?e.updated_at:0,keys:e.keys}}async function Bs(n,e){let t=n.filter(s=>!Tt(s)).map(s=>v(p({},s),{change:"added",isNew:!0})),i=Gn(t);for(let s of t)!i.has(s.key)&&!cl(s,e[s.key])&&i.set(s.key,{kind:"catalog"});let o=await Vn(t,i),a=new Map;for(let[s,c]of[...o,...i])c.kind!=="unchecked"&&a.set(s,c);return{items:t,leftOut:a}}function cl(n,e){if(n.type==="snippet")return!0;if(!n.repo)return!1;let t=dl(e);return n.type==="extension"?typeof(t==null?void 0:t.extensionURL)=="string"&&t.extensionURL!=="":typeof(t==null?void 0:t.cssURL)=="string"&&t.cssURL!==""}function $s(n,e){let t={};for(let[o,a]of Ls){let s=e.filter(c=>c.type===a&&n[c.key]!==void 0).map(c=>c.key);t[o]=JSON.stringify(s);for(let c of s)t[c]=n[c]}let i=Wn(n[sn]);return i&&e.some(o=>o.key===i)&&(t[sn]=n[sn]),t}function Ks(n,e,t,i,o,a){let s=a==="replace"?jn(e,void 0,t,i):ll(e,t),c=Wn(n.keys[sn]),u=c!==null&&e.some(f=>f.key===c)&&i!==null&&i.current_theme!==Ts,y=c!==null&&c!==o?e.find(f=>f.key===c):void 0;return p(v(p({},s),{manual:u?[{type:"theme",name:Ts}]:[]}),y?{theme:{key:y.key,name:y.name}}:{})}function ll(n,e){let t=new Set(e.map(s=>s.key)),i=new Set(n.map(s=>s.key)),o=[...n.map(s=>t.has(s.key)?v(p({},s),{change:"unchanged",isNew:!1}):v(p({},s),{change:"added",isNew:!0})),...e.filter(s=>!i.has(s.key)).map(s=>v(p({},s),{change:"unchanged",isNew:!1}))].sort((s,c)=>Ps[s.change]-Ps[c.change]||s.name.localeCompare(c.name)),a={added:0,removed:0,unchanged:0};for(let s of o)a[s.change]+=1;return{items:o,counts:a,manual:[]}}function Hs(n,e){return new Set(n.items.filter(t=>t.type==="snippet"&&t.change==="added"&&(!e||!Bt(e,t.name))).map(t=>t.key))}async function js(n,e,t,i){let o=await pe(),a=X(o),s=X(n.keys),c={};for(let[m,h]of Ls){let k=As(o[m]),E=[...e==="add"?k:k.filter(T=>t.includes(T)||a.some(w=>w.key===T&&Fn(w,s)))];for(let T of s){if(T.type!==h||t.includes(T.key))continue;let w=k.includes(T.key);if(e==="add"&&w)continue;let _=h==="snippet"?ul(T,i,o[T.key]):n.keys[T.key];_!==void 0&&(c[T.key]=_,E.includes(T.key)||E.push(T.key))}c[m]=JSON.stringify(E)}let u=Wn(n.keys[sn]),y=As(c["marketplace:installed-themes"]);u&&y.includes(u)&&!t.includes(u)&&(c[sn]=n.keys[sn]);let f=Ai(o,c);return await Pi(c,f),Object.keys(c).length+f.length}function ul(n,e,t){let i=e?Bt(e,n.name):void 0;return i?JSON.stringify(p({code:i.code,title:i.title,description:i.description},i.imageURL?{imageURL:i.imageURL}:{})):t}function As(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function dl(n){try{let e=n?JSON.parse(n):null;return e&&typeof e=="object"&&!Array.isArray(e)?e:null}catch(e){return null}}var Jn="/api/shares",yl=`${Jn}/update`,fl=`${Jn}/delete`,pl=`${Jn}/import`,ml="x-syncify-user-hash",gl="discover/presets.json",hl={no_code:"This code doesn't exist.",too_many_codes:"You can't make more share codes. Delete one to make another.",daily_limit:"Too many changes to share codes today. Try again tomorrow.",too_large:"This setup is too big to share.",invalid_name:"Names can be up to 60 characters.",empty:"There's nothing to share yet. Install something from Marketplace first.",invalid_items:"Syncify couldn't read some items. Reload Spotify and try again.",source:"Some items don't load from GitHub. Reload Spotify and try again.",blocked:"Some items are on Marketplace's block list. Reload Spotify and try again.",custom_snippet:"Custom snippets can't be shared. Reload Spotify and try again.",unchecked:"Couldn't check Marketplace's block list. Try again in a minute.",publish_failed:"Couldn't publish the code. Press Update on it to try again.",delete_failed:"Couldn't delete the code. Try again.",same_setup:"You already shared this setup.",invalid_handle:"Handles are 3 to 20 letters, digits, _ or -, starting and ending with a letter or digit.",reserved_handle:"That handle isn't allowed. Pick another.",handle_taken:"That handle is taken. Pick another.",unavailable:"Share codes aren't available yet."},Sl=new Set(["offline","signed_out","invalid_signature","stale_salt","no_device_key","too_many_requests"]);function $t(n,e=null){var t;return n instanceof x&&Sl.has(n.code)?tn(n):n instanceof x&&n.code==="too_many_codes"&&e!==null?`You have ${e} share codes already. Delete one to make another.`:(t=n instanceof x?hl[n.code]:void 0)!=null?t:"Something went wrong. Try again."}async function Ui(){var e;let n=await Un(Jn,"GET");return{codes:Array.isArray(n==null?void 0:n.codes)?n.codes.flatMap(t=>{let i=kl(t);return i?[i]:[]}):[],newHearts:typeof(n==null?void 0:n.new_hearts)=="number"?n.new_hearts:0,max:typeof(n==null?void 0:n.max)=="number"?n.max:null,profile:typeof((e=n==null?void 0:n.profile)==null?void 0:e.handle)=="string"?{handle:n.profile.handle,link:typeof n.profile.link=="string"?n.profile.link:null}:null,suggestedHandle:typeof(n==null?void 0:n.suggested_handle)=="string"?n.suggested_handle:null}}async function Fs(n,e,t){return Vs(await Un(Jn,"POST",p({name:n,keys:e},t===void 0?{}:{handle:t})))}function Bi(n){return`${D().shareUrl.replace(/\/+$/,"")}/@${n}`}async function Ys(n,e,t){return Vs(await Un(yl,"POST",{code:n,name:e,keys:t}))}async function Ws(n){try{await Un(fl,"POST",{code:n})}catch(e){if(e instanceof x&&e.code==="no_code")return;throw e}}async function zs(n){let e=D().shareUrl.replace(/\/+$/,""),t;try{t=await fetch(`${e}/${n}.json`)}catch(o){throw new x("offline")}if(t.status===404||t.status===403)throw new x("no_code");if(!t.ok)throw new x("failed");let i=Us(await t.json().catch(()=>null));if(!i||i.code!==n)throw new x("no_code");return i}async function qs(){let n=D().shareUrl.replace(/\/+$/,"");try{let e=await fetch(`${n}/${gl}`);if(!e.ok)return[];let t=await e.json();return Array.isArray(t.posts)?t.posts.flatMap(i=>{let o=wl(i);return o?[o]:[]}):[]}catch(e){return[]}}async function Gs(n,e,t=!1){try{await es(pl,p({code:n},t?{source:"preset"}:{}),{[ml]:e.hash})}catch(i){}}function kl(n){let e=n;return!e||typeof e.code!="string"?null:{code:e.code,name:typeof e.name=="string"&&e.name?e.name:null,link:typeof e.link=="string"?e.link:null,item_count:typeof e.item_count=="number"?e.item_count:0,imports:typeof e.imports=="number"?e.imports:0,created_at:typeof e.created_at=="number"?e.created_at:0,updated_at:typeof e.updated_at=="number"?e.updated_at:0,hearts:bl(n.post)}}function bl(n){let e=n;return(e==null?void 0:e.status)==="public"&&e.hidden!==!0&&typeof e.hearts=="number"?e.hearts:null}function wl(n){let e=n,t=i=>typeof i=="number"&&i>=0?i:0;return!e||typeof e.code!="string"?null:{code:e.code,name:typeof e.name=="string"?e.name:ve(e.code),extensions:t(e.extensions),themes:t(e.themes),snippets:t(e.snippets)}}function Vs(n){let e=n;if(typeof(e==null?void 0:e.code)!="string")throw new x("failed");return{code:e.code,link:typeof e.link=="string"?e.link:null,leftOut:Array.isArray(e.left_out)?e.left_out.length:0}}var Js="/claims",xl="/claims/cancel",vl={no_backup:"Back up first, then secure your backup.",unsupported_identity:"This Spotify account can't be secured.",too_many_accounts:"Your account already has 10 Spotify accounts linked.",offline:"Couldn't reach Syncify. Check your connection and try again."},Fe=class extends Error{constructor(t){var i;super((i=vl[t])!=null?i:"Couldn't secure your backup. Try again.");this.code=t;this.name="ClaimError"}};async function Xs(n,e){let t=await $i(n,e,"GET",Js);if(!t.ok)throw new Fe(await Ki(t));let i=await t.json().catch(()=>null);return{claim:Kn(i==null?void 0:i.claim),accounts:Array.isArray(i==null?void 0:i.accounts)?i.accounts.filter(Cl):null}}async function Rs(n,e){let t=await $i(n,e,"POST",Js);if(!t.ok)throw new Fe(await Ki(t));let i=await t.json().catch(()=>null);return Kn(i==null?void 0:i.claim)}async function Zs(n,e){let t=await $i(n,e,"POST",xl);if(!t.ok&&t.status!==404)throw new Fe(await Ki(t))}async function $i(n,e,t,i){try{return await Ke(n,e,{method:t},i)}catch(o){throw o instanceof TypeError?new Fe("offline"):o}}async function Ki(n){let e=await n.json().catch(()=>null);return typeof(e==null?void 0:e.code)=="string"?e.code:"failed"}function Cl(n){let e=n;return!!(e&&typeof e.hash=="string"&&(e.status==="pending"||e.status==="final"||e.status==="cancelled"))}var vn={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},Nl=/^([a-z0-9]|f([1-9]|1[0-2]))$/,Il=250,El=40,Hi=null,Kt=null,xn=null;function Qs(){return/mac/i.test(navigator.platform||navigator.userAgent)}function ea(n){if(n===null)return null;if(!n||typeof n!="object")return vn;let e=n;return typeof e.key!="string"||!Nl.test(e.key)?vn:{key:e.key,ctrl:!!e.ctrl,alt:!!e.alt,shift:!!e.shift,meta:!!e.meta}}function Xn(n){if(!n)return"Off";let e=n.key.toUpperCase();return Qs()?[n.ctrl?"\u2318":"",n.alt?"\u2325":"",n.shift?"\u21E7":"",e].join(""):[n.ctrl&&"Ctrl",n.meta&&"Win",n.alt&&"Alt",n.shift&&"Shift",e].filter(Boolean).join("+")}function na(n){if(n.key==="Escape")return{kind:"cancel"};let e=_l(n.code);if(!e)return{kind:"ignore"};let t=Qs();if(t&&n.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:e,ctrl:t?n.metaKey:n.ctrlKey,alt:n.altKey,shift:n.shiftKey,meta:t?!1:n.metaKey},o=e.startsWith("f")&&e.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!o?{kind:"error",message:`Include ${t?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function _l(n){var t,i;let e=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(n);return e?((i=(t=e[1])!=null?t:e[2])!=null?i:e[3]).toLowerCase():null}function ta(n){var e;if(xn&&Tl(xn,n))return!1;try{let t=Spicetify.Mousetrap,i=(e=t.trigger)==null?void 0:e.call(t)._directMap;if(!i)return!1;let o=ji(n);return Object.keys(i).some(a=>a.startsWith(`${o}:`))}catch(t){return!1}}function Fi(n,e,t=0){if(Hi=e,Kt=n,!ia()){if(t>=El){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>Fi(Kt,e,t+1),Il);return}Yi(Kt)}function Yi(n){if(Kt=n,!ia()||!Hi)return;let e=Hi;try{if(xn&&Spicetify.Keyboard._deregisterShortcut(xn),xn=null,!n)return;Spicetify.Keyboard.registerShortcut(n,t=>{t.preventDefault(),e()}),xn=n,console.debug("[Syncify]","Keyboard shortcut registered",Xn(n))}catch(t){console.warn("[Syncify]","Failed to register keyboard shortcut",t)}}function ia(){var n;return typeof((n=Spicetify.Keyboard)==null?void 0:n.registerShortcut)=="function"}function ji(n){return[n.ctrl&&"mod",n.meta&&"meta",n.alt&&"alt",n.shift&&"shift",n.key].filter(Boolean).join("+")}function Tl(n,e){return ji(n)===ji(e)}var Wi="both",Pl=["both","topbar","menu"],Rn=null,Zn=null,Ht=!1;function oa(n){return Pl.includes(n)?n:Wi}function sa(){var n;return typeof((n=Spicetify.Menu)==null?void 0:n.Item)=="function"}function aa(n){Rn=n.topbarButton,Zn=n.menuItem}function jt(n){let e=n!=="menu"||!Zn,t=n!=="topbar";if(Rn!=null&&Rn.element&&(Rn.element.style.display=e?"":"none"),!!Zn)try{t&&!Ht?(Zn.register(),Ht=!0):!t&&Ht&&(Zn.deregister(),Ht=!1)}catch(i){console.warn("[Syncify]","Failed to update profile menu item",i)}}var Yt="syncify:config",Ft={workerUrl:D().workerUrl,autoBackupEnabled:!1,shortcut:vn,entryPoint:Wi};function me(){var t,i;let n=D(),e=(i=(t=Spicetify.LocalStorage)==null?void 0:t.get(Yt))!=null?i:window.localStorage.getItem(Yt);if(!e)return v(p({},Ft),{workerUrl:n.workerUrl});try{let o=JSON.parse(e);return{workerUrl:n.workerUrl,autoBackupEnabled:o.autoBackupEnabled===void 0?Ft.autoBackupEnabled:!!o.autoBackupEnabled,shortcut:o.shortcut===void 0?Ft.shortcut:ea(o.shortcut),entryPoint:oa(o.entryPoint)}}catch(o){return v(p({},Ft),{workerUrl:n.workerUrl})}}function Wt(n){var t;let e=JSON.stringify({workerUrl:D().workerUrl,autoBackupEnabled:n.autoBackupEnabled,shortcut:n.shortcut,entryPoint:n.entryPoint});if((t=Spicetify.LocalStorage)!=null&&t.set){Spicetify.LocalStorage.set(Yt,e);return}window.localStorage.setItem(Yt,e)}function Qn(n){return typeof n.workerUrl=="string"&&n.workerUrl.length>0}var Al=["username","canonicalUsername","id","uri","displayName"];async function Ce(){let{value:n,field:e}=await Ml();return{hash:await Et(n),field:e}}async function Ml(){var o;let n=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(n!=null&&n.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let e=await n.getUser(),t=Al.find(a=>(e==null?void 0:e[a])!=null),i=t?e[t]:void 0;if(!t||!i)throw new Error("Unable to resolve the active Spotify user.");return{value:i,field:t}}async function nt(n){if(!Qn(n))throw new Error("Syncify backup service is not configured.");let[e,t]=await Promise.all([Ce(),bs()]);if(t.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:i,unapproved:o}=await is(n.workerUrl,e,t);return{payload:t,unchanged:i,unapproved:o}}async function Cn(n,e){var c;if(!Qn(n))throw new Error("Syncify backup service is not configured.");let t=await vi(n.workerUrl,await Ce(),e),[i,o,a]=await Promise.all([Promise.all(t.backups.map(qi)),t.safetyCopy?qi(t.safetyCopy):null,Promise.all(t.unapproved.map(qi))]),s=i.filter((u,y)=>i.findIndex(f=>f.payload_hash===u.payload_hash)===y);return v(p({},t),{payload:(c=s[0])!=null?c:null,backups:s,safetyCopy:o&&!s.some(u=>u.payload_hash===o.payload_hash)?o:null,unapproved:a.filter(u=>!s.some(y=>y.payload_hash===u.payload_hash))})}var zi=new Map;async function qi(n){var a,s,c;let e=(s=(a=n.marketplace_data)==null?void 0:a.keys)!=null?s:{},t=n.spicetify_config?Ei(n.spicetify_config,e):void 0,i=`${n.payload_hash} ${(c=n.metadata)==null?void 0:c.last_sync_datetime}`,o=zi.get(i);return o||(o=Lt(e,t),zi.set(i,o),o.catch(()=>zi.delete(i))),v(p(p({},n),t?{spicetify_config:t}:{}),{payload_hash:await o})}async function ra(n){let e=await vi(tt(n),await Ce());return{claim:e.claim,install:e.install,nudge:e.nudge}}async function ca(n,e,t,i=[]){var c;let o=e!=null?e:(await Cn(n)).payload;if(!o)throw new Error("No Syncify cloud backup was found for this Spotify account.");let a=await ws(o,i),s=(c=o.backup)==null?void 0:c.id;return s&&Qn(n)&&Ce().then(u=>ss(n.workerUrl,u,s,t)).catch(()=>{}),{payload:o,restoredCount:a}}var et=class extends Error{constructor(t){super("Couldn't back up your setup first, so nothing changed.");this.reason=t;this.name="SafetyBackupError"}};async function la(n,e,t,i,o,a=!1){try{await nt(n)}catch(c){throw new et(c)}let s=await js(e,t,i,o);return Ce().then(c=>Gs(e.code,c,a)).catch(()=>{}),s}async function ua(n){let e=await Ce(),t=await Xs(tt(n),e);return v(p({},t),{hash:e.hash})}async function da(n){await Rs(tt(n),await Ce())}async function zt(n,e,t){await os(tt(n),await Ce(),e,t)}async function qt(n){await Zs(tt(n),await Ce())}function tt(n){if(!Qn(n))throw new Error("Syncify backup service is not configured.");return n.workerUrl}var ya="syncify:nudge-hidden-until",fa="syncify:nudge-panel-shown";function pa(n=Date.now()){let e=Number(Sa(ya));return Number.isFinite(e)&&e>n}function ma(n=Date.now()){ka(ya,String(n+30*864e5))}function ga(){return Sa(fa)!==null}function ha(){ka(fa,"1")}function Sa(n){var e,t;return(t=(e=Spicetify.LocalStorage)==null?void 0:e.get(n))!=null?t:window.localStorage.getItem(n)}function ka(n,e){var t;(t=Spicetify.LocalStorage)!=null&&t.set?Spicetify.LocalStorage.set(n,e):window.localStorage.setItem(n,e)}var Gt="syncify:claim-check-day";async function wa(n){var t,i,o;let e=me();if(e.workerUrl){if(!e.autoBackupEnabled)return Ll(n);try{let[a,s]=await Promise.all([Dt(),Cn(e)]);xa(s,n);let c=(i=(t=s.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?i:0;if(s.exists&&xs(a.keyCount,c)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((o=s.payload)==null?void 0:o.payload_hash)===a.hash||a.keyCount===0)return;let{unapproved:u}=await nt(e);Spicetify.showNotification(u?"Syncify: backed up, waiting for approval":"Syncify auto-backup complete")}catch(a){if(a instanceof xe||a instanceof on){Spicetify.showNotification("Syncify: sign in to keep backing up",!0,8e3);return}let s=a instanceof Error?a.message:String(a);console.warn("Syncify startup sync failed:",a),Spicetify.showNotification(`Syncify auto-sync skipped: ${s}`,!0,8e3)}}}async function Ll(n){let e=new Date().toLocaleDateString("en-CA");if(Ol()!==e)try{let t=await ra(me());ba(e),xa(t,n)}catch(t){if(t instanceof xe){ba(e);return}console.warn("Syncify claim check failed:",t)}}function xa(n,e){var o;let t=Dl(n.claim),i=(o=n.install)==null?void 0:o.waiting[0];t?e.onClaim(t):i?e.onInstall(i):n.nudge&&!ga()&&e.onNudge()}function Dl(n){return(n==null?void 0:n.status)==="pending"&&!n.mine?n:null}function Ol(){var n,e;return(e=(n=Spicetify.LocalStorage)==null?void 0:n.get(Gt))!=null?e:window.localStorage.getItem(Gt)}function ba(n){var e;(e=Spicetify.LocalStorage)!=null&&e.set?Spicetify.LocalStorage.set(Gt,n):window.localStorage.setItem(Gt,n)}var Vi="syncify:pending-restore",Ul=600*1e3,Bl=2e3,$l=15e3,Kl="marketplace:theme-installed",Hl="raw.githubusercontent.com",jl=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],Ne=null,Gi=new Set,Na=new Map;function Ia(){return Ne}function Ea(n){return Gi.add(n),()=>Gi.delete(n)}function _a(){Ne&&La(v(p({},Ne),{manual:[]}))}function Jt(n,e="restore"){try{localStorage.setItem(Vi,JSON.stringify({at:Date.now(),manual:n,kind:e}))}catch(t){}}function Ta(){var n;Jt((n=Ne==null?void 0:Ne.manual)!=null?n:[],Ne==null?void 0:Ne.kind),window.location.reload()}function Pa(){Da()&&(document.addEventListener("load",n=>va(n.target,"load"),!0),document.addEventListener("error",n=>va(n.target,"error"),!0))}async function Aa(){let n=Da();if(!n)return;try{localStorage.removeItem(Vi)}catch(s){}let e=Date.now(),t=await Ca();for(;t.loaded<t.total&&Date.now()-e<$l;)await new Promise(s=>setTimeout(s,Bl)),t=await Ca();La(v(p({kind:n.kind,at:Date.now()},t),{manual:n.manual}));let i=t.loaded===t.total&&n.manual.length===0,o=n.kind==="share"?"Setup applied":"Backup restored",a=n.kind==="share"?"loaded":"restored";Spicetify.showNotification(i?`Syncify: ${o}; ${t.total} ${t.total===1?"item":"items"}`:`Syncify: ${a} ${t.loaded} of ${t.total}. Open Syncify for details.`,!1,8e3)}function Ma(n){let e=n.map(t=>t.type==="extension"?`spicetify config extensions ${Vt(t.name)}`:t.type==="custom_app"?`spicetify config custom_apps ${Vt(t.name)}`:`spicetify config current_theme ${Vt(t.name)}${t.scheme?` color_scheme ${Vt(t.scheme)}`:""}`);return e.length>0?[...e,"spicetify apply"]:[]}function Vt(n){return/^[\w.@+/-]+$/.test(n)?n:`"${n}"`}function La(n){Ne=n;for(let e of Gi)e(n)}function Da(){var n;try{let e=JSON.parse((n=localStorage.getItem(Vi))!=null?n:"null");return!e||Date.now()-e.at>Ul?null:{manual:Array.isArray(e.manual)?e.manual:[],kind:e.kind==="share"?"share":"restore"}}catch(e){return null}}function va(n,e){n instanceof HTMLScriptElement&&n.src&&Na.set(it(n.src),e)}async function Ca(){var i;let n=await pe(),e=(i=n[Kl])!=null?i:"",t=X(n).filter(o=>o.type==="extension"&&o.sources.length>0||o.type==="theme"&&e.includes(o.key)||o.type==="snippet");return{loaded:t.filter(Fl).length,total:t.length}}function Fl(n){var e,t;if(n.type==="snippet"){let i=document.querySelector("style.marketplaceSnippets");return((e=i==null?void 0:i.textContent)==null?void 0:e.includes(`/* ${n.name} - `))===!0}if(n.type==="theme"){let i=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((t=i==null?void 0:i.textContent)!=null&&t.trim())}return Yl(n.sources[0]).some(Wl)}function Yl(n){let e;try{e=new URL(n)}catch(s){return[]}if(e.host!==Hl)return[it(e.href)];let[t,i,o,...a]=e.pathname.split("/").filter(Boolean);return!t||!i||!o||a.length===0?[]:jl.map(s=>it(`https://${s}/gh/${t}/${i}@${o}/${a.join("/")}`))}function Wl(n){let e=Na.get(n);return e?e==="load":[...document.querySelectorAll("script[src]")].some(i=>it(i.src)===n)&&performance.getEntriesByType("resource").some(i=>it(i.name)===n)}function it(n){try{let e=new URL(n);return`${e.origin}${e.pathname}`}catch(e){return n}}function Ji(n){return`A new install${n.device?` on ${n.device}`:""} wants to back up this Spotify account.`}function Oa(n){let e=Spicetify.React,t=e.useState,{install:i}=n,[o,a]=t(!1),[s,c]=t(null);async function u(y){a(!0),c(null);try{await zt(me(),i.id,y),Spicetify.showNotification(y==="approve"?"Syncify: install approved":"Syncify: install refused"),n.onDone(y)}catch(f){c(f instanceof Error?f.message:String(f)),a(!1)}}return e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-claim-notice"},Ji(i)," Approve it if it's yours."),s?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},s):null,e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:n.onClose,disabled:o},"Close"),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{u("reject")},disabled:o},"Not mine"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{u("approve")},disabled:o},"Approve")))}var zl="syncify:beta",Ua=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function Ba(){var n;return(n=window.SyncifyLoader)!=null?n:null}function ql(){try{return window.localStorage.getItem(zl)==="true"}catch(n){return!1}}async function $a(n){let e=ql()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(e.map(i=>Gl(`${n}/${i}`)))).reduce((i,o)=>o&&(!i||Ri(o,i)>0)?o:i,null)}function Xi(n){return typeof n=="string"&&Ua.test(n)}function Ri(n,e){let[t,i]=[n,e].map(o=>{var y;let[,a,s,c,u]=(y=Ua.exec(o))!=null?y:[];return[a,s,c,u!=null?u:1/0].map(Number)});for(let o=0;o<t.length;o+=1)if(t[o]!==i[o])return t[o]<i[o]?-1:1;return 0}async function Gl(n,e=3e3){let t=typeof AbortController=="function"?new AbortController:null,i=setTimeout(()=>t==null?void 0:t.abort(),e);try{let o=await fetch(n,{signal:t==null?void 0:t.signal});if(!o.ok)return null;let a=await o.json();return Xi(a==null?void 0:a.version)?a.version:null}catch(o){return null}finally{clearTimeout(i)}}var eo="syncify:share-code-count",Vl=600;function Jl(){var e,t;let n=Number((t=(e=Spicetify.LocalStorage)==null?void 0:e.get(eo))!=null?t:NaN);return Number.isInteger(n)&&n>=0?n:null}function Ka(n){var e,t;n===null?(e=Spicetify.LocalStorage)==null||e.remove(eo):(t=Spicetify.LocalStorage)==null||t.set(eo,String(n))}var no="syncify:handle";function Xl(){var e;let n=(e=Spicetify.LocalStorage)==null?void 0:e.get(no);return n==null?void 0:n||null}function Zi(n){var e,t;n===void 0?(e=Spicetify.LocalStorage)==null||e.remove(no):(t=Spicetify.LocalStorage)==null||t.set(no,n!=null?n:"")}var b=null;function Zt(n={}){var bo,wo,xo,vo,Co,No,Io,Eo,_o,To;let e=Spicetify.React,t=e.useEffect,i=e.useMemo,o=e.useState,a=e.useRef,[s,c]=o(()=>me()),[u,y]=o(()=>b!=null&&b.remote.exists?"success":"idle"),[f,m]=o(null),[h,k]=o(0),[N,E]=o([]),[T,w]=o([]),[_,Ie]=o(null),[Ee,ge]=o(null),[re,G]=o(null),[Y,ce]=o(null),[K,R]=o(()=>{var r;return(r=b==null?void 0:b.remote.payload)!=null?r:null}),[ee,S]=o(()=>{var r;return(r=b==null?void 0:b.remote.backups)!=null?r:[]}),[C,le]=o(()=>{var r;return(r=b==null?void 0:b.remote.safetyCopy)!=null?r:null}),[W,H]=o(()=>{var r;return(r=b==null?void 0:b.remote.unapproved)!=null?r:[]}),[ne,Ye]=o(()=>{var r;return(r=b==null?void 0:b.remote.install)!=null?r:null}),[We,an]=o(!1),[_n,ze]=o(()=>new Set),[A,te]=o(()=>{var r;return(r=b==null?void 0:b.remote.payload)!=null?r:null}),[_e,j]=o(b!==null),[ue,ie]=o(!1),[Tn,$]=o(!1),[de,qe]=o(null),[oe,se]=o(!1),[rn,Te]=o(null),[Pe,F]=o((bo=n.section)!=null?bo:null),[ye,st]=o(!1),[M,Ge]=o(()=>Ia()),[at,Ve]=o(!1),[he,cn]=o(!1),[O,Oe]=o(null),[Z,Je]=o(()=>Jl()),[ln,un]=o(()=>Xl()),[V,Xe]=o(void 0),[L,rt]=o(()=>{var r;return(r=b==null?void 0:b.lockedBy)!=null?r:null}),[Se,dn]=o(()=>{var r;return(r=b==null?void 0:b.remote.claim)!=null?r:null}),[ke,Pn]=o(()=>{var r;return(r=b==null?void 0:b.claims)!=null?r:null}),[Ae,ct]=o(!1),[Re,Ze]=o(null),[lt,ti]=o(()=>{var r;return(r=b==null?void 0:b.remote.nudge)!=null?r:!1}),[ii,oi]=o(()=>pa()),[yn,ut]=o(n.secure===!0),d=a(!1),[g,I]=o(!1),[U,fn]=o(null),[z,si]=o(null),so=a(null),Me=i(()=>D(),[]),pn=i(()=>C?[...ee,C]:ee,[ee,C]),ai=U?[]:W,ri=U?(wo=z==null?void 0:z.backups)!=null?wo:[]:ee,ao=U?(xo=z==null?void 0:z.safetyCopy)!=null?xo:null:C,ro=i(()=>{var r;return new Map([...pn,...W,...(r=z==null?void 0:z.backups)!=null?r:[],...z!=null&&z.safetyCopy?[z.safetyCopy]:[]].map(l=>[l,X(l.marketplace_data.keys)]))},[pn,W,z]),dt=r=>{var l;return(l=ro.get(r))!=null?l:X(r.marketplace_data.keys)},tr=r=>dt(r).map(l=>l.key),ir=r=>dt(r).length,Q=i(()=>ue&&A?jn(dt(A),A.spicetify_config,T,_):null,[ue,A,ro,T,_]),Ue=i(()=>Q?Gn(Q.items):null,[Q]),yt=i(()=>new Map([...de!=null?de:[],...Ue!=null?Ue:[]]),[de,Ue]),ft=((vo=A==null?void 0:A.backup)==null?void 0:vo.kind)==="quarantined",co=i(()=>{var r;return new Set(((r=Q==null?void 0:Q.items)!=null?r:[]).filter(l=>{var P;return l.change!=="removed"&&l.isNew&&(ft||je(yt.get(l.key))||((P=yt.get(l.key))==null?void 0:P.kind)==="unchecked")}).map(l=>l.key))},[Q,yt,ft]),or=[...co].filter(r=>!_n.has(r)),lo=Q!==null&&de===null,ci=i(()=>sa(),[]),uo=i(()=>Ba()!==null,[]),fe=u==="loading",pt=(f==null?void 0:f.kind)==="warning"||(f==null?void 0:f.kind)==="error"?f:null,yo=!!(K&&Y&&K.payload_hash!==Y),An=!!(K&&Y&&K.payload_hash===Y),fo=!!(A&&Y&&A.payload_hash===Y),mt=U!==null||ye||!An||pn.length<2,sr=mt?ri:ri.slice(0,1),gt=(Se==null?void 0:Se.status)==="pending"&&!Se.mine?Se:null,mn=Ql(ke,L,gt!==null),ar=!ii&&!L&&K!==null&&Pe!=="account"&&(V?mn.kind==="open":V===null&&lt),ht=(Co=ne==null?void 0:ne.waiting[0])!=null?Co:null,po=!ne||ne.trusted||L||mn.kind==="secured"?null:ne.refused?"This Spotify account refused backups from this install. Sign in to back up from it.":"This install isn't approved yet. Its backups are kept apart until you approve it from another install or sign in.",li=(V?((No=ke==null?void 0:ke.accounts)!=null?No:[]).filter(r=>r.status==="final"):[]).map((r,l)=>({hash:r.hash,label:`Spotify account ${l+1}${r.device_info?` \xB7 from ${r.device_info}`:""}`})).filter(r=>r.hash!==(ke==null?void 0:ke.hash)),rr=!!(Y&&h>0&&!pn.some(r=>r.payload_hash===Y));t(()=>(J().catch(()=>null).then(r=>Xe(l=>l!=null?l:r)),be({silent:!0}),fr(),Ea(Ge)),[]),t(()=>{if(qe(null),!Q||!Ue)return;[...Ue.values()].some(je)&&$(!0);let r=!0;return Vn(Q.items,Ue).then(l=>{r&&(qe(l),[...l.values()].some(je)&&$(!0))}),()=>{r=!1}},[Q,Ue]),t(()=>{if(!oe)return;let r=l=>{var Le;if(!((Le=so.current)!=null&&Le.isConnected)){se(!1),Te(null);return}l.preventDefault(),l.stopImmediatePropagation();let P=na(l);if(P.kind!=="ignore"){if(P.kind==="cancel"){se(!1),Te(null);return}if(P.kind==="error"){Te(P.message);return}if(ta(P.shortcut)){Te(`${Xn(P.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}se(!1),ui(P.shortcut)}};return window.addEventListener("keydown",r,!0),()=>window.removeEventListener("keydown",r,!0)},[oe,s]);async function mo(){let r=await Dt();return ce(r.hash),k(r.installedItemCount),E(r.installedItems),w(r.items),Ie(r.spicetifyConfig),ge(r.activeTheme),G(r.marketplaceAvailable),r}async function be(r){try{ie(!1),(!(r!=null&&r.silent)||!b)&&y("loading"),r!=null&&r.silent||m({kind:"info",text:"Checking your Syncify backup\u2026"}),await mo();let l,P=null;try{l=await Cn(s)}catch(Be){if(!(Be instanceof xe))throw Be;l=Su,P=Be.code}let Le=await J().catch(()=>null),we=Le?await ua(s).catch(()=>null):null,q=Le?await J().catch(()=>null):null;b={remote:l,lockedBy:P,claims:q?we:null},Xe(q),Pn(q?we:null),rt(P),P&&F("account"),dn(l.claim),fn(null),si(null),R(l.payload),S(l.backups),le(l.safetyCopy),H(l.unapproved),Ye(l.install),ti(l.nudge),te(l.payload),j(!0),y(l.exists?"success":"idle"),!(r!=null&&r.silent)&&!P&&m(l.exists&&l.payload?{kind:"success",text:`Backup found from ${Nn(l.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(l){Mn(l)}}async function St(){ct(!0),Ze(null);try{await da(s)}catch(r){r instanceof Fe&&["claim_pending","claimed"].includes(r.code)||Ze(r instanceof Error?r.message:String(r))}finally{await be({silent:!0}),ct(!1)}}function cr(){ut(!0),V?St():gn("account")}function lr(){ma(),oi(!0)}t(()=>{!n.secure||d.current||Ae||!V||mn.kind!=="open"||L||(d.current=!0,St())},[V,mn.kind,L,Ae]);function ur(r){Xe(r),d.current=!0,!L&&K?St():be({silent:!0})}function go(){Ka(null),Je(null),Zi(void 0),un(void 0),Xe(null),Pn(null),Ze(null),be({silent:!0})}async function dr(){I(!0);try{await qt(s),Spicetify.showNotification("Syncify: claim sent for review"),await be({silent:!0})}catch(r){m({kind:"error",text:r instanceof Error?r.message:String(r)})}finally{I(!1)}}async function yr(r){if(ie(!1),fn(r),si(null),!r){te(K);return}te(null);try{let l=await Cn(s,r);si(l),te(l.payload)}catch(l){fn(null),te(K),Mn(l)}}async function fr(){let r=Me.version;if(!Xi(r))return;let l=await $a(Me.releasesUrl);l&&Ri(l,r)>0&&Oe(l)}function pr(r){let l=v(p({},s),{autoBackupEnabled:r});c(l),Wt(l),m({kind:"success",text:r?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}function ui(r){let l=v(p({},s),{shortcut:r});c(l),Wt(l),Yi(r),Te(null),m({kind:"success",text:r?`${Xn(r)} now opens Syncify.`:"Keyboard shortcut turned off."})}function mr(r){let l=v(p({},s),{entryPoint:r});c(l),Wt(l),jt(r)}function gn(r){F(r),r!=="settings"&&se(!1)}function gr(){Te(null),se(!0)}async function hr(){var r;try{ie(!1),y("loading"),m({kind:"info",text:"Backing up your extensions and themes\u2026"});let{payload:l,unchanged:P,unapproved:Le}=await nt(s);if(await mo(),Le){await be({silent:!0}),m({kind:"warning",text:"Backed up, but kept apart until this install is approved."}),Spicetify.showNotification("Syncify: backed up, waiting for approval");return}if(P){j(!0),y("success"),m({kind:"success",text:"Everything is already backed up."}),Spicetify.showNotification("Syncify: everything is already backed up");return}let we=[l,...ee.filter(q=>q.payload_hash!==l.payload_hash)].slice(0,hu);b&&(b=v(p({},b),{remote:v(p({},b.remote),{exists:!0,payload:l,backups:we,safetyCopy:((r=b.remote.safetyCopy)==null?void 0:r.payload_hash)===l.payload_hash?null:b.remote.safetyCopy})})),R(l),S(we),le(q=>(q==null?void 0:q.payload_hash)===l.payload_hash?null:q),te(l),j(!0),y("success"),m({kind:"success",text:`Backed up ${l.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(l){Mn(l)}}async function ho(r){if(ht){an(!0);try{await zt(s,ht.id,r),Spicetify.showNotification(r==="approve"?"Syncify: install approved":"Syncify: install refused"),await be({silent:!0})}catch(l){Mn(l)}finally{an(!1)}}}function Sr(r=A){if(re===!1){let l="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";m({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3);return}if(!r){let l="No Syncify cloud backup was found for this Spotify account.";m({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3);return}te(r),$(!1),ze(new Set),ie(!0)}async function kr(){let r=A?jn(dt(A),A.spicetify_config,T,_).manual:[];try{ie(!1),y("loading"),m({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:l,restoredCount:P}=await ca(s,A!=null?A:void 0,U!=null?U:void 0,or);te(l),y("success"),m({kind:"success",text:`Restored ${P} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),Jt(r),setTimeout(()=>window.location.reload(),1e3)}catch(l){Mn(l)}}async function br(r){await Ja(r)&&(Ve(!0),setTimeout(()=>Ve(!1),2e3))}function Qe(r){if(r.startsWith("mailto:")){window.location.href=r;return}window.open(r,"_blank","noopener,noreferrer")}function Mn(r){if(y("error"),r instanceof $n){cn(!0),m(null);return}if(r instanceof on){m({kind:"error",text:r.message}),be({silent:!0});return}if(r instanceof xe&&r.code!=="not_linked"){m(null),be({silent:!0});return}let l=r instanceof Error?r.message:String(r);m({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3)}function di(r,l){var Po,Ao;let P=(A==null?void 0:A.payload_hash)===r.payload_hash,Le=r.payload_hash===Y,we=Nn(r.metadata.last_sync_datetime),q=za(ir(r)),Be=(Ao=(Po=r.backup)==null?void 0:Po.name)!=null?Ao:null;return e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":P,"data-selected":P?"true":"false",type:"button",key:`${r.payload_hash}-${r.metadata.last_sync_datetime}`,title:l!=null&&l.isSafetyCopy?"Kept aside and updated about once a week, so a burst of new backups can't replace it":l!=null&&l.isUnapproved?"From an install this Spotify account hasn't approved":void 0,onClick:()=>{te(r),ie(!1)},disabled:fe},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),l!=null&&l.isSafetyCopy?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Safety copy"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 updated weekly")),e.createElement("span",{className:"syncify-muted"},Be?`${Be} \xB7 `:"",we," \xB7 ",q)):l!=null&&l.isUnapproved?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Not approved"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 ",we)),e.createElement("span",{className:"syncify-muted"},q," \xB7 from ",r.metadata.device_info)):Be?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,Be),e.createElement("span",{className:"syncify-muted syncify-backup-date"},we," \xB7 ",q," \xB7 from ",r.metadata.device_info)):e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-backup-date"},we),e.createElement("span",{className:"syncify-muted"},q," \xB7 from ",r.metadata.device_info)),Le?e.createElement("span",{className:"syncify-tag",title:"What's on this device now"},"Current"):null,l!=null&&l.isSafetyCopy?e.createElement(Ya,null):null,l!=null&&l.isUnapproved?e.createElement(oo,null):null)}function yi(r){r.stopPropagation()}let wr=he?"Update Syncify to keep backing up":L?"Sign in to restore":_e?K?yo?"Changes since your last backup":"Everything is backed up":"No backup yet":u==="error"?"Couldn't check your backup":"Checking your backup\u2026",So=he?"Your backups are safe":L?L==="not_owner"?"Secured by another account":"This backup is secured":_e?K?yo?bu(K,tr(K),N,_):`Last backup ${Nn(K.metadata.last_sync_datetime)}`:"Save your extensions and themes so you can restore them after a reinstall or on another computer.":null,ko=!!(M&&!he&&Date.now()-M.at<gu),Ln=!!(M&&M.loaded===M.total),fi=Ma((Io=M==null?void 0:M.manual)!=null?Io:[]);return e.createElement("div",{className:"syncify-panel",ref:so,onClick:yi,onMouseDown:yi,onPointerDown:yi},he?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,"This version of Syncify is no longer supported."),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Qe(`${Me.githubUrl}#updating`)},"How to update")):null,gt?e.createElement("div",{className:"syncify-alert",role:"alert"},e.createElement("span",null,(Eo=gt.email)!=null?Eo:"Someone"," is claiming this backup.",V===null?" If that's you, sign in to finish.":gt.held?" Syncify is reviewing it.":null),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{dr()},disabled:g},"Not me"),V===null?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>gn("account")},"That's me, sign in"):null)):null,ht?e.createElement("div",{className:"syncify-alert",role:"alert"},e.createElement("span",null,Ji(ht)),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{ho("reject")},disabled:We},"Not mine"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{ho("approve")},disabled:We},"Approve"))):null,po?e.createElement("div",{className:"syncify-alert",role:"status"},e.createElement("span",null,po)):null,fi.length>0?e.createElement("div",{className:"syncify-alert syncify-manual",role:"status"},e.createElement("span",{className:"syncify-manual-header"},e.createElement("span",null,M.manual.length===1?"1 isn't from Marketplace. Add it in a terminal:":`${M.manual.length} aren't from Marketplace. Add them in a terminal:`),e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:_a},e.createElement(to,null))),e.createElement("span",{className:"syncify-code"},e.createElement("code",null,fi.join(`
`)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{br(fi.join(`
`))}},at?"Copied":"Copy"))):null,pt?e.createElement("div",{className:"syncify-alert","data-kind":pt.kind},e.createElement("span",null,pt.text),e.createElement("span",{className:"syncify-alert-actions"},pt.kind==="error"?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{be()},disabled:fe},"Try again"):null,e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>m(null)},e.createElement(to,null)))):null,e.createElement("section",{className:"syncify-status","aria-live":"polite"},ko&&M?e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},M.kind==="share"?Ln?"Setup loaded":`Loaded ${M.loaded} of ${M.total}`:Ln?"Backup restored":`Restored ${M.loaded} of ${M.total}`),e.createElement("p",{className:"syncify-muted"},Ln?M.total===0?"Nothing from Marketplace to load":`${M.loaded} of ${M.total} loaded`:"Missing something? Reload Spotify once more."),Ln&&M.kind==="restore"?e.createElement("p",{className:"syncify-muted"},"Syncify saved your setup?"," ",e.createElement("button",{className:"syncify-text-button syncify-inline-button",type:"button",onClick:()=>Qe(Me.kofiUrl)},"Support it on Ko-fi")):null):e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},wr),e.createElement("p",{className:"syncify-muted"},So?`${So} \xB7 `:"",za(h)," on this device")),ko&&!Ln?e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:Ta},"Reload"):e.createElement("button",{className:"syncify-button",type:"button",onClick:hr,disabled:fe||An||he||L!==null,title:L?"Sign in to back up":An?"No changes since your last backup":void 0},fe?"Working\u2026":An?"Backed up":"Back up now")),ar?e.createElement("div",{className:"syncify-nudge",role:"region","aria-label":"Secure your backup"},e.createElement(Ya,null),e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it")),e.createElement("span",{className:"syncify-nudge-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:lr,disabled:Ae},"Not now"),e.createElement("button",{className:"syncify-button",type:"button",onClick:cr,disabled:Ae||fe},Ae?"Securing\u2026":"Secure"))):null,!_e||L||ee.length>0||W.length>0||li.length>0?e.createElement("section",{className:"syncify-section","aria-label":"Backups"},e.createElement("div",{className:"syncify-section-header"},e.createElement("h4",{className:"syncify-section-title"},"Backups"),e.createElement("span",{className:"syncify-section-controls"},!U&&An&&pn.length>1?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":ye,"aria-controls":"syncify-backup-list",onClick:()=>{st(!ye),ie(!1)}},ye?"Show less":`Show all ${pn.length}`,e.createElement(In,null)):null,!L&&li.length>0?e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select","aria-label":"Show backups from",value:U!=null?U:"",onChange:r=>{yr(r.currentTarget.value||null)},disabled:fe},e.createElement("option",{value:""},"This Spotify account"),li.map(r=>e.createElement("option",{key:r.hash,value:r.hash},r.label))),e.createElement(In,null)):null)),_e?L?e.createElement("p",{className:"syncify-locked"},e.createElement(mu,null),e.createElement("span",null,L==="not_owner"?"Sign in with the account that secured them":"Sign in to see and restore your backups")):U&&!z?e.createElement("p",{className:"syncify-muted"},"Loading backups\u2026"):ri.length===0&&ai.length===0?e.createElement("p",{className:"syncify-muted"},"No backups yet."):e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-list",id:"syncify-backup-list",role:"radiogroup","aria-label":"Choose a backup to restore"},sr.map(r=>di(r)),mt&&ao?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),di(ao,{isSafetyCopy:!0})):null,mt&&ai.length>0?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),ai.map(r=>di(r,{isUnapproved:!0}))):null),mt?re===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to restore a backup."):ue?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},"Restore"," ",A?(To=(_o=A.backup)==null?void 0:_o.name)!=null?To:Nn(A.metadata.last_sync_datetime):"this backup","?"),ft?e.createElement("div",{className:"syncify-alert"},"An install this Spotify account hasn't approved made this backup. Its items stay off unless you turn them on."):null,Q?e.createElement(Ga,{preview:Q,checks:yt,off:co,allowed:_n,unapproved:ft,onAllow:(r,l)=>{let P=new Set(_n);l?P.add(r):P.delete(r),ze(P)},expanded:Tn,onToggle:()=>$(!Tn)}):null,e.createElement("div",{className:"syncify-actions"},rr?e.createElement("div",{className:"syncify-alert syncify-actions-hint"},"Your current setup isn't backed up."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>ie(!1),disabled:fe},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:kr,disabled:fe||lo},lo?"Checking\u2026":"Restore"))):e.createElement("div",{className:"syncify-actions"},fo?e.createElement("span",{className:"syncify-muted syncify-actions-hint"},"This backup is already current."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>Sr(),disabled:fe||!A||fo},"Restore backup")):null):e.createElement("div",{className:"syncify-backup-skeleton","aria-hidden":"true"},e.createElement("span",{className:"syncify-radio"}),e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-skeleton-line"}),e.createElement("span",{className:"syncify-skeleton-line wide"})))):null,e.createElement("div",{className:"syncify-accordion"},e.createElement(Qi,{id:"share",title:"Share",openSection:Pe,onToggle:gn,status:V&&Z?{kind:"count",label:`${Z} ${Z===1?"code":"codes"}`,text:String(Z)}:null},e.createElement(tu,{config:s,session:V,localItems:T,localConfig:_,localTheme:Ee,marketplaceAvailable:re,busy:fe,onSignIn:()=>gn("account"),onSignedOut:go,onCodeCount:r=>{Ka(r),Je(r)},onHandle:r=>{Zi(r),un(r)}})),e.createElement(Qi,{id:"account",title:"Account",openSection:Pe,onToggle:gn,status:yu(V,L,mn)},e.createElement(eu,{session:V,locked:L,secure:mn,securing:Ae,secureError:Re,onSecure:()=>{St()},nudge:yn,onSignedIn:ur,onSignedOut:go,onOpenWebsite:Qe,handle:ln,onHandle:r=>{Zi(r),un(r)}})),e.createElement(Qi,{id:"settings",title:"Settings",openSection:Pe,onToggle:gn,status:O?{kind:"dot",label:`Syncify ${O} is out`}:null},e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Back up automatically"),e.createElement("span",{className:"syncify-muted"},"When Spotify starts and something has changed")),e.createElement("input",{className:"syncify-switch",type:"checkbox",role:"switch",checked:s.autoBackupEnabled&&!he,onChange:r=>pr(r.currentTarget.checked),disabled:fe||he})),e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Open Syncify from"),ci?s.entryPoint==="menu"&&!s.shortcut?e.createElement("span",{className:"syncify-muted"},"Keep a shortcut in case a Spotify update breaks the menu"):null:e.createElement("span",{className:"syncify-muted"},"The profile menu isn't available in this Spicetify version")),e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select",value:ci?s.entryPoint:"topbar",onChange:r=>mr(r.currentTarget.value),disabled:!ci},ku.map(r=>e.createElement("option",{key:r.value,value:r.value},r.label))),e.createElement(In,null))),e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Keyboard shortcut"),oe&&!rn?e.createElement("span",{className:"syncify-muted"},"Press a key combination, or Esc to cancel"):null),e.createElement("span",{className:"syncify-shortcut"},s.shortcut&&!oe?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ui(null)},"Turn off"):null,!s.shortcut&&!oe?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ui(vn)},"Use default"):null,e.createElement("button",{className:"syncify-key",type:"button","data-recording":oe?"true":"false",onClick:()=>oe?se(!1):gr(),title:"Click to change"},oe?"Press keys\u2026":s.shortcut?Xn(s.shortcut):"Off"))),rn?e.createElement("div",{className:"syncify-alert",role:"alert"},rn):null)),e.createElement("footer",{className:"syncify-footer"},e.createElement("span",{className:"syncify-footer-version"},e.createElement("span",null,"Syncify ",Me.version),O?e.createElement("button",{className:"syncify-text-button syncify-update",type:"button",onClick:()=>uo?window.location.reload():Qe(`${Me.githubUrl}#updating`)},O," is out \xB7 ",uo?"Reload":"How to update"):null),e.createElement("span",{className:"syncify-footer-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Qe(Me.issueUrl)},"Report an issue"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Qe(Me.githubUrl)},"GitHub"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Qe(Me.kofiUrl)},"Support on Ko-fi"))))}var Ha={added:{mark:"+",label:"Added"},removed:{mark:"\u2212",label:"Removed"},unchanged:{mark:"=",label:"Unchanged"}},qa=[["extension","Extensions"],["theme","Themes"],["snippet","Snippets"]],Rl={extension:"extension",custom_app:"custom app",theme:"theme"};function Ga(n){let e=Spicetify.React,{items:t,counts:i,manual:o,theme:a}=n.preview,s=[...n.off].filter(c=>!n.allowed.has(c)).length;return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-chips","aria-label":"What changes on this device"},i.added?e.createElement("span",{className:"syncify-chip","data-change":"added"},"+",i.added," added"):null,i.removed?e.createElement("span",{className:"syncify-chip","data-change":"removed"},"\u2212",i.removed," removed"):null,i.unchanged?e.createElement("span",{className:"syncify-chip"},i.unchanged," unchanged"):null,o.length?e.createElement("span",{className:"syncify-chip"},o.length," to add manually"):null,a&&(!n.off.has(a.key)||n.allowed.has(a.key))?e.createElement("span",{className:"syncify-chip"},"Switches your theme to ",a.name):null,s?e.createElement("span",{className:"syncify-chip","data-change":"off"},s," off"):null),t.length||o.length?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":n.expanded,"aria-controls":"syncify-restore-changes",onClick:n.onToggle},n.expanded?"Hide changes":"Show changes",e.createElement(In,null)):null,n.expanded?e.createElement("div",{className:"syncify-changes",id:"syncify-restore-changes"},qa.map(([c,u])=>{let y=t.filter(f=>f.type===c);return y.length===0?null:e.createElement("section",{key:c,"aria-label":u},e.createElement("h5",{className:"syncify-change-group"},u),e.createElement("ul",{className:"syncify-change-list"},y.map(f=>{var m,h;return e.createElement("li",{className:"syncify-change",key:f.key},e.createElement("span",{className:"syncify-mark","data-change":f.change,role:"img","aria-label":Ha[f.change].label},Ha[f.change].mark),e.createElement("span",{className:"syncify-change-name"},f.name,f.repo?e.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",f.repo):null),n.checks.has(f.key)?e.createElement(Va,{check:n.checks.get(f.key)}):n.unapproved&&n.off.has(f.key)?e.createElement("span",{className:"syncify-source","data-warning":"true"},e.createElement(oo,null),"Not approved"):null,n.off.has(f.key)&&!((m=n.fixed)!=null&&m.has(f.key))?e.createElement("label",{className:"syncify-item-switch"},e.createElement("input",{type:"checkbox",checked:n.allowed.has(f.key),onChange:k=>n.onAllow(f.key,k.currentTarget.checked)}),(h=n.switchLabel)!=null?h:"Restore"):null)})))}),o.length?e.createElement("section",{"aria-label":"Add manually"},e.createElement("h5",{className:"syncify-change-group"},"Add manually"),e.createElement("ul",{className:"syncify-change-list"},o.map(c=>e.createElement("li",{className:"syncify-change",key:`${c.type}:${c.name}`},e.createElement("span",{className:"syncify-mark","aria-hidden":"true"}),e.createElement("span",{className:"syncify-change-name"},c.name,e.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",Rl[c.type],c.scheme?`, ${c.scheme}`:"")))))):null):null)}var Zl={host:"Loads from outside GitHub",repo:"Its code is in a different repo than the one it names",blocked:"On Marketplace's block list",catalog:"Not in Marketplace's catalog",unchecked:"GitHub couldn't be reached to check it",custom:"A snippet made in Marketplace, not from its list"};function Va(n){let e=Spicetify.React,{check:t}=n,i=je(t),o=t.kind==="host"?`Code from ${t.host}`:t.kind==="repo"?`Code from ${t.repo}`:t.kind==="blocked"?"Blocked by Marketplace":t.kind==="catalog"?"Not in Marketplace":t.kind==="unchecked"?"Not checked":"Custom";return e.createElement("span",{className:"syncify-source","data-warning":i?"true":"false",title:Zl[t.kind]},i?e.createElement(oo,null):null,o)}function Ql(n,e,t){var s,c;if(e==="not_owner")return{kind:"other-account"};if(!n)return t?{kind:"other-claim"}:{kind:"unknown"};let{claim:i}=n;if((i==null?void 0:i.status)==="final"){if(!i.mine)return{kind:"other-account"};let u=((s=n.accounts)!=null?s:[]).filter(y=>y.status==="final").length;return{kind:"secured",linkedCount:Math.max(u,1)}}if((i==null?void 0:i.status)==="pending")return i.mine?{kind:"pending",finalAt:i.final_at,held:i.held,waiting:i.waiting===!0}:{kind:"other-claim"};let o=((c=n.accounts)!=null?c:[]).filter(u=>u.hash===n.hash),a=o[o.length-1];return(a==null?void 0:a.status)==="cancelled"&&a.cancelled_by==="owner"?{kind:"cancelled"}:{kind:"open"}}function eu(n){let e=Spicetify.React,t=e.useEffect,i=e.useState,{session:o,secure:a}=n,[s,c]=i(()=>Nt()),[u,y]=i(()=>Nt().email),[f,m]=i(""),[h,k]=i(!1),[N,E]=i(null),[T,w]=i(()=>Date.now()),{handle:_,onHandle:Ie}=n;t(()=>{if(!o||_!==void 0)return;let S=!0;return Ui().then(C=>{var le,W;S&&Ie((W=(le=C.profile)==null?void 0:le.handle)!=null?W:null)}).catch(()=>{}),()=>{S=!1}},[o,_]);let Ee=!!(s.codeSentAt&&T-s.codeSentAt<cu),ge=Math.max(0,Math.ceil((s.retryAt-T)/1e3)),re=s.retryEmail===null||s.retryEmail===u.trim().toLowerCase()?ge:0;t(()=>{if(!o)return;let S=!0;return Ro().then(C=>{!S||C||(E({kind:"warning",text:tn(new x("signed_out"))}),n.onSignedOut())}).catch(()=>{}),()=>{S=!1}},[o==null?void 0:o.token]),t(()=>{if(s.retryAt<=Date.now())return;let S=setInterval(()=>{w(Date.now()),s.retryAt<=Date.now()&&clearInterval(S)},1e3);return()=>clearInterval(S)},[s.retryAt]);function G(S){let C=p(p({},Nt()),S);zo(C),c(C),w(Date.now())}async function Y(S){var le;let C=S.trim();if(!uu.test(C)){E({kind:"error",text:"Enter a valid email address."});return}k(!0),E(null);try{let W=await Jo(C,{nudge:n.nudge});G({email:C,codeSentAt:Date.now(),retryAt:Date.now()+W*1e3,retryEmail:C.toLowerCase()}),m("")}catch(W){let H=W instanceof x?W:null,ne=(le=H==null?void 0:H.retryAfter)!=null?le:null,Ye=ne&&ne<=lu?Date.now()+ne*1e3:0,We=(H==null?void 0:H.code)==="too_many_requests"?null:C.toLowerCase();if((H==null?void 0:H.code)==="resend_wait"){G({email:C,codeSentAt:s.email===C&&s.codeSentAt?s.codeSentAt:Date.now(),retryAt:Ye,retryEmail:We});return}Ye&&G({retryAt:Ye,retryEmail:We}),E({kind:"error",text:tn(W)})}finally{k(!1)}}async function ce(){k(!0),E(null);try{let S=await Xo(s.email,f);G({codeSentAt:null}),m(""),n.onSignedIn(S)}catch(S){E({kind:"error",text:tn(S)});let C=S instanceof x?S.code:null;(C==="too_many_attempts"||C==="code_expired")&&m("")}finally{k(!1)}}async function K(){var C;let S=(C=o==null?void 0:o.email)!=null?C:"";k(!0),E(null),await Zo(),G({email:S,codeSentAt:null}),y(S),k(!1),n.onSignedOut()}async function R(){k(!0),E(null);try{n.onOpenWebsite(await Qo())}catch(S){let C=S instanceof x&&S.code==="signed_out";E({kind:C?"warning":"error",text:tn(S)}),C&&n.onSignedOut()}finally{k(!1)}}let ee=N?e.createElement("div",{className:"syncify-alert","data-kind":N.kind==="error"?"error":void 0,role:"alert"},N.text):null;if(o===void 0)return null;if(o){let S=a.kind==="open"||a.kind==="other-claim"||a.kind==="cancelled";return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",{className:"syncify-account-email"},o.email),a.kind==="secured"?e.createElement("span",{className:"syncify-muted"},"Backup secured \xB7"," ",a.linkedCount===1?"1 Spotify account linked":`${a.linkedCount} Spotify accounts linked`):a.kind==="pending"?e.createElement("span",{className:"syncify-muted syncify-account-state"},e.createElement(Xa,null),e.createElement("span",null,"Securing this backup \xB7"," ",a.waiting?"waiting on sign-in":a.held?"in review":`final ${io(a.finalAt)}`)):a.kind==="other-account"?e.createElement("span",{className:"syncify-muted"},"This backup is secured by another account"):e.createElement("span",{className:"syncify-muted"},"Signed in")),e.createElement("span",{className:"syncify-account-actions"},e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-label":"Manage on the website",onClick:()=>{R()},disabled:h},"Manage",e.createElement(Wa,null)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{K()},disabled:h},"Sign out"))),_?e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"@",_),e.createElement("span",{className:"syncify-muted"},"Your handle")),e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-label":"Open your profile",onClick:()=>n.onOpenWebsite(Bi(_))},"Profile",e.createElement(Wa,null))):null,S?e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it")),e.createElement("button",{className:"syncify-button",type:"button",onClick:n.onSecure,disabled:h||n.securing||a.kind==="other-claim"},n.securing?"Securing\u2026":a.kind==="cancelled"?"Secure again":"Secure")):null,a.kind==="other-claim"?e.createElement("div",{className:"syncify-alert",role:"status"},"Another claim is pending. If it isn't yours, press Not me above and Syncify will review it."):a.kind==="cancelled"?e.createElement("div",{className:"syncify-alert",role:"status"},"Your claim was cancelled from this Spotify account."):a.kind==="pending"&&a.waiting?e.createElement("div",{className:"syncify-alert",role:"status"},"Syncify ran on this Spotify account without you signed in, maybe after a Spotify update or on another computer. Sign in to Syncify there to finish linking."):null,n.secureError?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},n.secureError):null,ee)}return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting"},n.locked?e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Sign in to restore"),e.createElement("span",{className:"syncify-muted"},"With the email that secured this backup")):e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it"))),e.createElement("form",{className:"syncify-confirm",noValidate:!0,onSubmit:S=>{S.preventDefault(),!h&&(Ee?f.length===Rt&&ce():re||Y(u))}},Ee?e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-muted"},"Code sent to ",du(s.email)),e.createElement("div",{className:"syncify-field"},e.createElement("input",{className:"syncify-input syncify-code-input",type:"text",inputMode:"numeric",autoComplete:"one-time-code","aria-label":"6-digit code",placeholder:"123456",maxLength:Rt,value:f,onChange:S=>m(S.currentTarget.value.replace(/\D/g,"").slice(0,Rt)),autoFocus:!0}),e.createElement("button",{className:"syncify-button",type:"submit",disabled:h||f.length!==Rt},h?"Verifying\u2026":"Verify")),e.createElement("p",{className:"syncify-muted syncify-account-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Y(s.email)},disabled:h||ge>0},ge>0?`Resend in ${Fa(ge)}`:"Resend code"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{G({codeSentAt:null}),m(""),E(null)},disabled:h},"Use another email"))):e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-field"},e.createElement("input",{className:"syncify-input",type:"email",autoComplete:"email","aria-label":"Email",placeholder:"you@example.com",value:u,onChange:S=>y(S.currentTarget.value),autoFocus:!0}),e.createElement("button",{className:"syncify-button",type:"submit",disabled:h||re>0||!u.trim()},h?"Sending\u2026":"Send code")),e.createElement("p",{className:"syncify-muted"},re>0?`Send another code in ${Fa(re)}`:"We only email sign-in codes.")),ee))}var nu=[["add","Add to my setup"],["replace","Replace my setup"]];function tu(n){var ut;let e=Spicetify.React,t=e.useEffect,i=e.useMemo,o=e.useRef,a=e.useState,{session:s}=n,[c,u]=a(""),[y,f]=a(!1),[m,h]=a(null),[k,N]=a(null),[E,T]=a([]),[w,_]=a("add"),[Ie,Ee]=a(!1),[ge,re]=a(()=>new Set),[G,Y]=a(null),[ce,K]=a(void 0),[R,ee]=a(!1),[S,C]=a(null),[le,W]=a(0),[H,ne]=a(null),[Ye,We]=a(null),[an,_n]=a(null),[ze,A]=a(""),[te,_e]=a(null),[j,ue]=a(null),[ie,Tn]=a(""),[$,de]=a(null),[qe,oe]=a(!1),[se,rn]=a(!1),[Te,Pe]=a(null),[F,ye]=a(null),[st,M]=a(null),[Ge,at]=a(!1),[Ve,he]=a(null),cn=o(0),O=i(()=>k?Ks(k.file,k.items,n.localItems,n.localConfig,n.localTheme,w):null,[k,n.localItems,n.localConfig,n.localTheme,w]),Oe=i(()=>{if(!O||!k)return null;let d=new Set(k.items.map(g=>g.key));return O.items.filter(g=>g.change!=="removed"&&d.has(g.key)&&(w==="replace"||g.isNew))},[O,k,w]),Z=i(()=>Oe?Gn(Oe):null,[Oe]),Je=i(()=>new Map([...G!=null?G:[],...Z!=null?Z:[]]),[G,Z]),ln=i(()=>O&&ce!==void 0?Hs(O,ce):new Set,[O,ce]),un=i(()=>{var d;return new Set([...((d=O==null?void 0:O.items)!=null?d:[]).filter(g=>{var I;return g.change!=="removed"&&g.isNew&&(je(Je.get(g.key))||((I=Je.get(g.key))==null?void 0:I.kind)==="unchecked")}).map(g=>g.key),...ln])},[O,Je,ln]),V=[...un].filter(d=>ln.has(d)||!ge.has(d)),Xe=O!==null&&(G===null||ce===void 0),L=$?$.items.filter(d=>!$.leftOut.has(d.key)):[],rt=!!(S&&H!==null&&S.length>=H),Se=j!==null&&j.code===null&&!Ye,dn=Se?Ds(ze):null,[ke,Pn]=a(null);t(()=>{if(!dn){Pn(null);return}let d=window.setTimeout(()=>Pn(dn),Vl);return()=>window.clearTimeout(d)},[dn]),t(()=>{if(Y(null),!Oe||!Z)return;[...Z.values()].some(je)&&Ee(!0);let d=!0;return Vn(Oe,Z).then(g=>{d&&(Y(g),[...g.values()].some(je)&&Ee(!0))}),()=>{d=!1}},[Oe,Z]),t(()=>{qs().then(T)},[]),t(()=>{C(null),ue(null),ye(null),s&&Re()},[s==null?void 0:s.token]);async function Ae(d){let g=d!=null?d:Os(c);if(h(null),N(null),!g){h($t(new x("no_code")));return}f(!0);try{let I=await zs(g);_("add"),re(new Set),Ee(!1),N({file:I,items:X(I.keys),pick:d!==void 0}),Di().then(K)}catch(I){h($t(I))}finally{f(!1)}}async function ct(){if(!(!k||!O)){ee(!0),h(null);try{await la(n.config,k.file,w,V,ce!=null?ce:null,k.pick),Spicetify.showNotification("Syncify: setup loaded. Reloading\u2026"),Jt(O.manual,"share"),setTimeout(()=>window.location.reload(),1e3)}catch(d){ee(!1),h(d instanceof et?`${d.message} ${ou(d.reason)}`:d instanceof Error?d.message:String(d))}}}async function Re(){var d,g;_e(null);try{let I=await Ui();C(I.codes),W(I.newHearts),n.onCodeCount(I.codes.length),ne(I.max),We(I.profile),n.onHandle((g=(d=I.profile)==null?void 0:d.handle)!=null?g:null),_n(I.suggestedHandle)}catch(I){Ze(I,_e)}}function Ze(d,g){g($t(d,H)),d instanceof x&&d.code==="signed_out"&&n.onSignedOut()}async function lt(d){var I;let g=++cn.current;ue({code:d}),Tn((I=d==null?void 0:d.name)!=null?I:""),A(an!=null?an:""),de(null),oe(!1),Pe(null),ye(null),M(null);try{let U=await pe(),fn=await Bs(X(U),U);if(g!==cn.current)return;de(p({keys:U},fn)),fn.leftOut.size>0&&oe(!0)}catch(U){if(g!==cn.current)return;ue(null),Pe(U instanceof Error?U.message:String(U))}}function ti(){cn.current+=1,ue(null),de(null)}async function ii(){if(!j||!$)return;rn(!0),Pe(null);let d=$s($.keys,L);try{let g=j.code?await Ys(j.code.code,ie.trim(),d):await Fs(ie.trim(),d,Se?ze.trim():void 0);ye(v(p({},g),{outcome:j.code?"updated":"created"})),ue(null),de(null),await Re()}catch(g){if(g instanceof x&&g.code==="same_setup"&&g.share){ye(v(p({},g.share),{leftOut:0,outcome:"existing"})),ue(null),de(null);return}Ze(g,Pe),g instanceof x&&g.code==="publish_failed"&&(ue(null),Re())}finally{rn(!1)}}async function oi(d){at(!0),_e(null);try{await Ws(d),M(null),(F==null?void 0:F.code)===d&&ye(null),await Re()}catch(g){Ze(g,_e)}finally{at(!1)}}async function yn(d,g){await Ja(d)&&(he(g),setTimeout(()=>he(I=>I===g?null:I),2e3))}return e.createElement(e.Fragment,null,e.createElement("form",{className:"syncify-field syncify-share-load",noValidate:!0,onSubmit:d=>{d.preventDefault(),!y&&!R&&c.trim()&&Ae()}},e.createElement("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-input"},"Load a setup"),e.createElement("input",{className:"syncify-input syncify-share-input",id:"syncify-share-input",type:"text",placeholder:"Paste a code or a link",autoComplete:"off",spellCheck:!1,value:c,onChange:d=>u(d.currentTarget.value),disabled:R}),e.createElement("button",{className:"syncify-button secondary",type:"submit",disabled:y||R||!c.trim()},y?"Loading\u2026":"Preview")),m?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},m):null,k&&O?e.createElement("div",{className:"syncify-confirm"},e.createElement("span",{className:"syncify-share-title"},e.createElement("p",{className:"syncify-confirm-title"},"Load ",(ut=k.file.name)!=null?ut:ve(k.file.code),"?"),k.file.creator?e.createElement("button",{className:"syncify-text-button",type:"button",title:"Open their profile",onClick:()=>window.open(Bi(k.file.creator),"_blank","noopener,noreferrer")},"by @",k.file.creator):null),e.createElement("div",{className:"syncify-share-modes",role:"radiogroup","aria-label":"How to load it"},nu.map(([d,g])=>e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":w===d,"data-selected":w===d?"true":"false",type:"button",key:d,onClick:()=>_(d),disabled:R},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,g))))),e.createElement(Ga,{preview:O,checks:Je,off:un,fixed:ln,switchLabel:"Load",allowed:ge,unapproved:!1,onAllow:(d,g)=>{let I=new Set(ge);g?I.add(d):I.delete(d),re(I)},expanded:Ie,onToggle:()=>Ee(!Ie)}),n.marketplaceAvailable===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to load a setup."):e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>N(null),disabled:R},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{ct()},disabled:R||Xe||n.busy},R?"Applying\u2026":Xe?"Checking\u2026":"Apply"))):null,E.length>0?e.createElement("section",{className:"syncify-share-part","aria-label":"Syncify picks"},e.createElement("h5",{className:"syncify-change-group"},"Syncify picks"),e.createElement("ul",{className:"syncify-change-list syncify-share-codes"},E.map(d=>e.createElement("li",{className:"syncify-setting",key:d.code},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",{className:"syncify-account-email"},d.name),e.createElement("span",{className:"syncify-muted syncify-pick-detail"},e.createElement(ru,{pick:d}),Xt(d.extensions+d.themes+d.snippets,"item"))),e.createElement("button",{className:"syncify-text-button",type:"button",disabled:y||R,onClick:()=>{Ae(d.code)}},"Preview"))),e.createElement("li",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Find more setups"),e.createElement("span",{className:"syncify-muted"},"People's setups on Discover")),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>window.open(`${D().webUrl.replace(/\/+$/,"")}/discover`,"_blank","noopener,noreferrer")},"Open Discover")))):null,s===void 0?null:s?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting syncify-share-part"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Share this setup"),e.createElement("span",{className:"syncify-muted"},S&&S.length>0&&H!==null?su(H-S.length):"Get a code anyone can load")),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{lt(null)},disabled:j!==null||S===null||rt||n.marketplaceAvailable===!1,title:rt?"Delete a code to make another":void 0},"Share")),j?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},j.code?`Update ${ve(j.code.code)} with this setup?`:"Share this setup?"),$?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-chips","aria-label":"What goes in"},e.createElement("span",{className:"syncify-chip"},L.length," going in"),$.leftOut.size?e.createElement("span",{className:"syncify-chip","data-change":"off"},$.leftOut.size," left out"):null),$.items.length?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":qe,"aria-controls":"syncify-share-items",onClick:()=>oe(!qe)},qe?"Hide items":"Show items",e.createElement(In,null)):null,qe?e.createElement(iu,{items:$.items,leftOut:$.leftOut}):null,e.createElement("div",{className:"syncify-share-fields"},e.createElement("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-name"},"Setup name"),e.createElement("input",{id:"syncify-share-name",className:"syncify-input",type:"text",placeholder:"Optional",maxLength:Ms,value:ie,onChange:d=>Tn(d.currentTarget.value),disabled:se}),Se?e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-muted syncify-share-handle-note"},"It's your first time creating a share code. Pick a handle for your profile:"),e.createElement("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-handle"},"Your handle"),e.createElement("span",{className:"syncify-input syncify-handle-input"},e.createElement("span",{"aria-hidden":"true"},"@"),e.createElement("input",{id:"syncify-share-handle",type:"text",placeholder:"handle",autoComplete:"off",spellCheck:!1,maxLength:Oi,value:ze,onChange:d=>A(d.currentTarget.value.replace(/^@/,"")),disabled:se})),ze&&ke?e.createElement("span",{className:"syncify-share-handle-problem",role:"alert"},ke):null):null)):e.createElement("p",{className:"syncify-muted"},"Checking your items\u2026"),e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:ti,disabled:se},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{ii()},disabled:!$||L.length===0||se||Se&&dn!==null},$?se?j.code?"Updating\u2026":"Creating\u2026":j.code?"Update":"Create code":"Checking\u2026"))):null,Te?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},Te):null,F?e.createElement("div",{className:"syncify-confirm"},e.createElement("span",{className:"syncify-manual-header"},e.createElement("span",{className:"syncify-confirm-title"},F.outcome==="existing"?"You already shared this setup":F.outcome==="updated"?"Code updated":"Your code is ready"),e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>ye(null)},e.createElement(to,null))),e.createElement("span",{className:"syncify-code syncify-share-code"},e.createElement("code",null,ve(F.code)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{yn(ve(F.code),"saved-code")}},Ve==="saved-code"?"Copied":"Copy"),F.link?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{yn(F.link,"saved-link")}},Ve==="saved-link"?"Copied":"Get link"):null),F.leftOut?e.createElement("p",{className:"syncify-muted"},F.leftOut===1?"1 snippet isn't in Marketplace's list anymore, so it was left out.":`${F.leftOut} snippets aren't in Marketplace's list anymore, so they were left out.`):null):null,te?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,te),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Re()}},"Try again"))):null,S&&S.length>0?e.createElement("section",{"aria-label":"Your codes"},e.createElement("h5",{className:"syncify-change-group syncify-codes-heading"},"Your codes",le>0?e.createElement("span",{className:"syncify-tag","data-tone":"new"},Xt(le,"new heart")):null),e.createElement("ul",{className:"syncify-change-list syncify-share-codes"},S.map(d=>{var g;return e.createElement("li",{className:"syncify-setting",key:d.code},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",{className:"syncify-account-email"},(g=d.name)!=null?g:ve(d.code)),e.createElement("span",{className:"syncify-muted"},st===d.code?d.hearts===null?"Delete it? Its link stops working.":"Delete it? Its link and its Discover post stop working.":[d.name?ve(d.code):null,Xt(d.item_count,"item"),`Used by ${d.imports}`,d.hearts===null?null:Xt(d.hearts,"heart")].filter(Boolean).join(" \xB7 "))),e.createElement("span",{className:"syncify-account-actions"},st===d.code?e.createElement(e.Fragment,null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>M(null),disabled:Ge},"Cancel"),e.createElement("button",{className:"syncify-text-button","data-danger":"true",type:"button",onClick:()=>{oi(d.code)},disabled:Ge},Ge?"Deleting\u2026":"Delete")):e.createElement(e.Fragment,null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{lt(d)},disabled:j!==null||Ge},"Update"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{yn(ve(d.code),`code:${d.code}`)}},Ve===`code:${d.code}`?"Copied":"Copy"),d.link?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{yn(d.link,`link:${d.code}`)}},Ve===`link:${d.code}`?"Copied":"Get link"):null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>M(d.code),disabled:Ge},"Delete"))))}))):null):e.createElement("div",{className:"syncify-setting syncify-share-part"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Share this setup"),e.createElement("span",{className:"syncify-muted"},"Get a code anyone can load")),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:n.onSignIn},"Sign in to share")))}var ja={in:{mark:"+",label:"Goes in"},out:{mark:"\u2212",label:"Left out"}};function iu(n){let e=Spicetify.React;return e.createElement("div",{className:"syncify-changes",id:"syncify-share-items"},qa.map(([t,i])=>{let o=n.items.filter(a=>a.type===t).sort((a,s)=>a.name.localeCompare(s.name));return o.length===0?null:e.createElement("section",{key:t,"aria-label":i},e.createElement("h5",{className:"syncify-change-group"},i),e.createElement("ul",{className:"syncify-change-list"},o.map(a=>{let s=n.leftOut.get(a.key),c=s?ja.out:ja.in;return e.createElement("li",{className:"syncify-change",key:a.key},e.createElement("span",{className:"syncify-mark","data-change":s?"removed":"added",role:"img","aria-label":c.label},c.mark),e.createElement("span",{className:"syncify-change-name"},a.name,a.repo?e.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",a.repo):null),s?e.createElement(Va,{check:s}):null)})))}))}function ou(n){return n instanceof xe?"Sign in to back up.":n instanceof Error?n.message:String(n)}async function Ja(n){var e;try{return await navigator.clipboard.writeText(n),!0}catch(t){let i=(e=Spicetify.Platform)==null?void 0:e.ClipboardAPI;return i!=null&&i.copy?(await i.copy(n),!0):!1}}function su(n){return n<=0?"No codes left, delete one to make another":`${n} ${n===1?"code":"codes"} left`}var au=12;function ru(n){let e=Spicetify.React,t=[...Array(n.pick.extensions).fill("extension"),...Array(n.pick.themes).fill("theme"),...Array(n.pick.snippets).fill("snippet")].slice(0,au);return e.createElement("span",{className:"syncify-pips","aria-hidden":"true"},t.map((i,o)=>e.createElement("span",{className:"syncify-pip","data-kind":i,key:o})))}function Xt(n,e){return`${n} ${e}${n===1?"":"s"}`}var Rt=6,cu=600*1e3,lu=300,uu=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function du(n){let e=n.lastIndexOf("@");return e<1?n:`${n[0]}***${n.slice(e)}`}function io(n){let e=Nn(new Date(n).toISOString());return e.startsWith("today")?e:`on ${e}`}function Fa(n){return`${Math.floor(n/60)}:${String(n%60).padStart(2,"0")}`}function Qi(n){let e=Spicetify.React,t=n.openSection===n.id,i=`syncify-section-${n.id}`;return e.createElement("section",{className:"syncify-accordion-section","aria-label":n.title},e.createElement("button",{className:"syncify-accordion-header",type:"button","aria-expanded":t,"aria-controls":i,onClick:()=>n.onToggle(t?null:n.id)},e.createElement("span",{className:"syncify-accordion-title"},n.title),!t&&n.status?e.createElement("span",{className:"syncify-accordion-status","data-kind":n.status.kind,role:"img","aria-label":n.status.label,title:n.status.label},n.status.kind==="ok"?e.createElement(fu,null):n.status.kind==="warning"?e.createElement(pu,null):n.status.kind==="pending"?e.createElement(Xa,null):n.status.kind==="count"?n.status.text:null):null,e.createElement(In,null)),t?e.createElement("div",{className:"syncify-accordion-body",id:i},n.children):null)}function Ya(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-shield",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"}))}function oo(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-warning-icon",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M12 3 2 21h20z"}),n.createElement("path",{d:"M12 10v5"}),n.createElement("path",{d:"M12 18h.01"}))}function yu(n,e,t){return e?{kind:"warning",label:"Sign in to see your backups"}:n?t.kind==="secured"?{kind:"ok",label:"Signed in, backup secured"}:t.kind==="pending"?{kind:"pending",label:"Linking this Spotify account"}:t.kind==="open"||t.kind==="cancelled"?{kind:"warning",label:"Backup not secured yet"}:{kind:"ok",label:"Signed in"}:null}function fu(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"10"}),n.createElement("path",{d:"m9 12 2 2 4-4"}))}function pu(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"10"}),n.createElement("path",{d:"M12 8v4"}),n.createElement("path",{d:"M12 16h.01"}))}function In(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-chevron",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"m9 6 6 6-6 6"}))}function mu(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-lock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("rect",{x:"5",y:"11",width:"14",height:"10",rx:"2"}),n.createElement("path",{d:"M8 11V7a4 4 0 0 1 8 0v4"}))}function Xa(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-clock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"9"}),n.createElement("path",{d:"M12 7v5l3 2"}))}function Wa(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-external",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M14 4h6v6"}),n.createElement("path",{d:"M20 4 10 14"}),n.createElement("path",{d:"M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"}))}function to(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M18 6 6 18"}),n.createElement("path",{d:"m6 6 12 12"}))}var gu=600*1e3,hu=3,Su={exists:!1,payload:null,backups:[],safetyCopy:null,claim:null,unapproved:[],install:null,nudge:!1},ku=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function bu(n,e,t,i){var N;let o=new Set(e),a=new Set(t),s=t.filter(E=>!o.has(E)).length,c=e.filter(E=>!a.has(E)).length,u=(N=n.spicetify_config)!=null?N:null,y=!!(i&&!u),f=!y&&(i&&u?!ds(i,u):i!==u),m=[s?`${s} added`:null,c?`${c} removed`:null,f?"Spicetify config changed":null].filter(Boolean),h=Nn(n.metadata.last_sync_datetime),k=m.length?`${m.join(", ")} since ${h}`:`Last backup ${h}`;return y?`${k} \xB7 Spicetify config not saved yet`:k}function za(n){return n===1?"1 extension or theme":`${n} extensions and themes`}function Nn(n){let e=new Date(n);if(Number.isNaN(e.getTime()))return n;let t=e.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),i=new Date,o=new Date(i);return o.setDate(i.getDate()-1),e.toDateString()===i.toDateString()?`today, ${t}`:e.toDateString()===o.toDateString()?`yesterday, ${t}`:`${e.toLocaleDateString(void 0,{month:"short",day:"numeric",year:e.getFullYear()===i.getFullYear()?void 0:"numeric"})}, ${t}`}function Ra(n){var y;let e=Spicetify.React,t=e.useState,{claim:i}=n,[o,a]=t(!1),[s,c]=t(null);async function u(){a(!0),c(null);try{await qt(me()),Spicetify.showNotification("Syncify: claim sent for review"),n.onClose()}catch(f){c(f instanceof Error?f.message:String(f)),a(!1)}}return e.createElement("div",{className:"syncify-panel"},e.createElement("p",{className:"syncify-claim-notice"},(y=i.email)!=null?y:"Someone"," is claiming this backup."," ",n.signedIn?i.held?"Syncify is reviewing it.":`It goes through ${io(i.final_at)} unless you stop it.`:"If that's you, sign in to finish."),s?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},s):null,e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:n.onClose,disabled:o},"Close"),e.createElement("button",{className:n.signedIn?"syncify-button":"syncify-button secondary",type:"button",onClick:()=>{u()},disabled:o},"Not me"),n.signedIn?null:e.createElement("button",{className:"syncify-button",type:"button",onClick:n.onSignIn,disabled:o},"That's me, sign in")))}function Za(n){let e=Spicetify.React;return e.createElement("div",{className:"syncify-panel"},e.createElement("p",{className:"syncify-claim-notice"},"Your backup isn't secured yet. Anyone who knows your Spotify username can restore it or claim it as theirs. Secure it with your email so only you can."),e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:n.onClose},"Not now"),e.createElement("button",{className:"syncify-button",type:"button",onClick:n.onSecure},"Secure")))}var Qt="[Syncify]";function ae(n,e){if(e===void 0){console.debug(Qt,n);return}console.debug(Qt,n,e)}function ot(n,e){if(e===void 0){console.warn(Qt,n);return}console.warn(Qt,n,e)}function wu(){var n;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((n=Spicetify==null?void 0:Spicetify.Topbar)!=null&&n.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var er="syncify-styles";function xu(){if(document.getElementById(er)){ae("Another copy of Syncify is running; stopping this one");return}vu();let n=me();aa({topbarButton:Cu(),menuItem:Pu()}),jt(n.entryPoint),Fi(n.shortcut,ni),wa({onClaim:e=>{Lu(e)},onInstall:Du,onNudge:Ou}).catch(e=>{ot("Startup sync check failed",e)}),Aa().catch(e=>{ot("Restore check failed",e)})}function vu(){let n=document.createElement("style");n.id=er,n.textContent=Do,document.head.appendChild(n)}function Cu(){let{extensionName:n}=D(),e=new Spicetify.Topbar.Button(n,pi,t=>{ae("Topbar button clicked",ei(t)),ni()},!1,!0);return nr(e),Eu(e),Mu(e),ae("Topbar button registered",ei(e)),e}function nr(n){var t;let e=n;n.element.style.setProperty("-webkit-app-region","no-drag"),(t=e.button)==null||t.style.setProperty("-webkit-app-region","no-drag")}var Qa=".main-actionButtons",Nu=".Root__globalNav, .Root__top-bar",Iu=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function Eu(n){if(typeof MutationObserver=="undefined")return;let e=!1,t=null,i=()=>{e=!1,a();let s=n.element,c=document.querySelector(Qa);!s||!c||c.contains(s)||(c.prepend(s),_u(n),nr(n),ae("Topbar button re-attached",ei(n)))},o=new MutationObserver(()=>{e||(e=!0,setTimeout(i,250))}),a=()=>{var u;if(t!=null&&t.isConnected)return;let s=document.querySelector(Qa),c=(u=s==null?void 0:s.closest(Nu))!=null?u:s==null?void 0:s.parentElement;if(o.disconnect(),t=c!=null?c:null,!c){o.observe(document.body,{childList:!0,subtree:!0});return}o.observe(c,{childList:!0,subtree:!0});for(let y=c.parentElement;y;y=y.parentElement)o.observe(y,{childList:!0})};i()}function _u(n){let e=Tu(n);if(!e||e.className&&e.className!=="undefined")return;let t=Array.from(document.querySelectorAll(Iu)).find(i=>!n.element.contains(i));t!=null&&t.className&&(e.className=t.className)}function Tu(n){return n.button}function Pu(){var n;if(typeof((n=Spicetify.Menu)==null?void 0:n.Item)!="function")return null;try{return new Spicetify.Menu.Item(D().extensionName,!1,()=>ni(),Au())}catch(e){return ot("Failed to create profile menu item",e),null}}function Au(){return pi.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function Mu(n){Object.assign(window,{SyncifyDebug:{button:n,element:n.element,openModal:ni,inspect:()=>ei(n),clickElement:()=>{var e;return(e=n.element)==null?void 0:e.click()},clickInnerButton:()=>{var e;return(e=n.button)==null?void 0:e.click()},clickCallback:()=>n.onClick(n)}})}function ei(n){var e,t,i,o,a;return{label:n.label,disabled:n.disabled,isRight:n.isRight,hasElement:!!n.element,elementConnected:(e=n.element)==null?void 0:e.isConnected,elementDisabled:(t=n.element)==null?void 0:t.disabled,elementAriaDisabled:(i=n.element)==null?void 0:i.getAttribute("aria-disabled"),elementClass:(o=n.element)==null?void 0:o.className,appRegion:n.element?getComputedStyle(n.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:n.button?getComputedStyle(n.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:n.element?getComputedStyle(n.element).pointerEvents:null,visibility:n.element?getComputedStyle(n.element).visibility:null,display:n.element?getComputedStyle(n.element).display:null,rect:(a=n.element)==null?void 0:a.getBoundingClientRect().toJSON()}}var B=null;function ni(){if(B!=null&&B.container.isConnected){ae("Closing modal"),Spicetify.PopupModal.hide();return}ae("Opening modal"),En(Spicetify.React.createElement(Zt))}async function Lu(n){let e=await J().catch(()=>null);B!=null&&B.container.isConnected||(ae("Opening claim notice"),En(Spicetify.React.createElement(Ra,{claim:n,signedIn:e!==null,onSignIn:()=>En(Spicetify.React.createElement(Zt,{section:"account"})),onClose:()=>Spicetify.PopupModal.hide()})))}function Du(n){if(B!=null&&B.container.isConnected)return;ae("Opening install notice");let e=()=>Spicetify.PopupModal.hide();En(Spicetify.React.createElement("div",{className:"syncify-panel"},Spicetify.React.createElement(Oa,{install:n,onDone:e,onClose:e})))}function Ou(){B!=null&&B.container.isConnected||(ae("Opening nudge notice"),ha(),En(Spicetify.React.createElement(Za,{onSecure:()=>En(Spicetify.React.createElement(Zt,{section:"account",secure:!0})),onClose:()=>Spicetify.PopupModal.hide()})))}function En(n){var t;(t=B==null?void 0:B.root)==null||t.unmount();let e=document.createElement("div");B={container:e,root:null};try{Spicetify.PopupModal.display({title:D().extensionName,content:e,isLarge:!1})}catch(i){throw ot("Failed to open PopupModal",i),i}Uu(e),$u(e,n)}function Uu(n){requestAnimationFrame(()=>{let e=Bu(n);e==null||e.classList.add("syncify-modal-shell");let t=e==null?void 0:e.querySelector(".main-trackCreditsModal-header h1");if(t&&!t.querySelector(".syncify-modal-mark")){let o=document.createElement("span");o.className="syncify-modal-mark",o.innerHTML=Oo,t.prepend(o)}let i=e==null?void 0:e.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');i&&(i.classList.add("syncify-modal-close"),i.setAttribute("aria-label",`Close ${D().extensionName}`),i.title="Close",i.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function Bu(n){let e=n.parentElement;for(;e&&e!==document.body;){if(e.querySelector(".main-trackCreditsModal-header"))return e;e=e.parentElement}return n.closest('[class*="trackCreditsModal"]')}function $u(n,e){try{if(typeof Spicetify.ReactDOM.createRoot=="function"){let t=Spicetify.ReactDOM.createRoot(n);t.render(e),(B==null?void 0:B.container)===n&&(B.root=t),ae("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(e,n),ae("Modal rendered",{renderer:"render"})}catch(t){throw ot("Failed to render modal",t),t}}Pa();(function n(){if(!wu()){setTimeout(n,100);return}ae("Spicetify APIs ready"),xu()})();})();
