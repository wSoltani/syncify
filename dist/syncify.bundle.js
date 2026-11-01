// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var vr=Object.defineProperty,Cr=Object.defineProperties;var Nr=Object.getOwnPropertyDescriptors;var Lo=Object.getOwnPropertySymbols;var Ir=Object.prototype.hasOwnProperty,Er=Object.prototype.propertyIsEnumerable;var Do=(n,e,t)=>e in n?vr(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,p=(n,e)=>{for(var t in e||(e={}))Ir.call(e,t)&&Do(n,t,e[t]);if(Lo)for(var t of Lo(e))Er.call(e,t)&&Do(n,t,e[t]);return n},C=(n,e)=>Cr(n,Nr(e));var Oo=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var gi=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var Uo=`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="-2.5 -2.5 37 37" aria-hidden="true" focusable="false"><defs><mask id="syncify-mark-gap" maskUnits="userSpaceOnUse" x="-2" y="-2" width="36" height="36"><rect x="-2" y="-2" width="36" height="36" fill="#fff"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></mask></defs><g mask="url(#syncify-mark-gap)"><g transform="rotate(15 16 16)"><path d="M16 16L16 7.4A8.6 8.6 0 0 1 24.6 16Z" fill="#6cd1d1" transform="translate(0.42 -0.42)"/><path d="M16 16L24.6 16A8.6 8.6 0 0 1 16 24.6Z" fill="#efa4c1" transform="translate(0.42 0.42)"/><path d="M16 16L16 24.6A8.6 8.6 0 0 1 7.4 16Z" fill="#d3c48c" transform="translate(-0.42 0.42)"/><path d="M16 16L7.4 16A8.6 8.6 0 0 1 16 7.4Z" fill="#88bcf2" transform="translate(-0.42 -0.42)"/></g></g><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 28.03A12.4 12.4 0 1 1 28.03 19"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91"/></g></svg>
`;var Ar="syncify",dn="state";function hi(){let n;try{n=window.indexedDB}catch(e){return Promise.resolve(null)}return n?new Promise(e=>{let t;try{t=n.open(Ar,1)}catch(i){e(null);return}t.onupgradeneeded=()=>{t.result.createObjectStore(dn)},t.onerror=()=>e(null),t.onblocked=()=>e(null),t.onsuccess=()=>e(t.result)}):Promise.resolve(null)}function Si(n,e){let t=hi().then(i=>new Promise((o,a)=>{if(!i){a(new Error("IndexedDB isn't available."));return}try{let s=i.transaction(dn,n),c=e(s.objectStore(dn));s.oncomplete=()=>{i.close(),o(c.result)},s.onerror=s.onabort=()=>{var d;i.close(),a((d=s.error)!=null?d:new Error("IndexedDB failed."))}}catch(s){i.close(),a(s)}}));return Promise.race([t,new Promise((i,o)=>setTimeout(()=>o(new Error("IndexedDB took too long.")),2e3))])}function yn(n){return Si("readonly",e=>e.get(n))}async function fn(n,e){await Si("readwrite",t=>t.put(e,n))}async function Bo(n){await Si("readwrite",e=>e.delete(n))}var Le={extensionName:"Syncify",version:"1.14.0",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com",shareUrl:"https://syncs.wsoltani.com"};function D(){var e,t,i,o,a,s,c,d,y;let n=window.SyncifyConfig;return{extensionName:(e=He(n==null?void 0:n.extensionName))!=null?e:Le.extensionName,version:(t=$o(n==null?void 0:n.version))!=null?t:Le.version,workerUrl:(i=He(n==null?void 0:n.workerUrl))!=null?i:Le.workerUrl,webUrl:(o=He(n==null?void 0:n.webUrl))!=null?o:Le.webUrl,githubUrl:(a=He(n==null?void 0:n.githubUrl))!=null?a:Le.githubUrl,kofiUrl:(s=He(n==null?void 0:n.kofiUrl))!=null?s:Le.kofiUrl,issueUrl:(c=He(n==null?void 0:n.issueUrl))!=null?c:Le.issueUrl,releasesUrl:(d=He(n==null?void 0:n.releasesUrl))!=null?d:Le.releasesUrl,shareUrl:(y=He(n==null?void 0:n.shareUrl))!=null?y:Le.shareUrl}}function He(n){return $o(n)}function $o(n){return typeof n=="string"&&n.trim()?n.trim():null}var Mr="x-syncify-version",Lr="x-syncify-install",Dr="x-syncify-timezone",Ko="install-id",Ho="syncify:install-id",Or=2e3,bt=null;async function jo(){let n={[Mr]:D().version,[Lr]:(await ki()).id},e=$r();return e&&(n[Dr]=e),n}function ki(){return bt!=null||(bt=Ur().catch(()=>({id:wt(),inDatabase:!1}))),bt}async function Ur(){let n=await Promise.race([Br(),new Promise(e=>setTimeout(()=>e(null),Or))]);if(n)return{id:n,inDatabase:!0};try{let e=window.localStorage.getItem(Ho);if(e&&Fo(e))return{id:e,inDatabase:!1};let t=wt();return window.localStorage.setItem(Ho,t),{id:t,inDatabase:!1}}catch(e){return{id:wt(),inDatabase:!1}}}async function Br(){let n=await hi();return n?new Promise(e=>{let t=null;try{let i=n.transaction(dn,"readwrite"),o=i.objectStore(dn),a=o.get(Ko);a.onsuccess=()=>{if(typeof a.result=="string"&&Fo(a.result)){t=a.result;return}t=wt(),o.put(t,Ko)},i.oncomplete=()=>{n.close(),e(t)},i.onerror=i.onabort=()=>{n.close(),e(null)}}catch(i){n.close(),e(null)}}):null}function wt(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let n=crypto.getRandomValues(new Uint8Array(16));n[6]=n[6]&15|64,n[8]=n[8]&63|128;let e=[...n].map(t=>t.toString(16).padStart(2,"0"));return[e.slice(0,4).join(""),e.slice(4,6).join(""),e.slice(6,8).join(""),e.slice(8,10).join(""),e.slice(10).join("")].join("-")}function Fo(n){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(n)}function $r(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(n){return null}}var Kr="syncify-signature-v1",Hr={name:"ECDSA",hash:"SHA-256"};function xt(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function vt(n){return bi(new Uint8Array(await crypto.subtle.exportKey("raw",n)))}async function Dn(n,e,t,i,o){let a=await jr(e,t,i,o),s=await crypto.subtle.sign(Hr,n,a);return bi(new Uint8Array(s))}async function jr(n,e,t,i){let{pathname:o,search:a}=new URL(t),s=new TextEncoder,c=bi(new Uint8Array(await crypto.subtle.digest("SHA-256",s.encode(i))));return s.encode([Kr,n,e.toUpperCase(),o+a,c].join(`
`))}function bi(n){let e="";for(let t=0;t<n.length;t++)e+=String.fromCharCode(n[t]);return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var Yo="device-key",wi="session",Wo="salt",Re=null,On,zo={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function pn(n){if(Re)return Re;let e=await yn(Yo);return Fr(e)?(Re=Promise.resolve(e),e):n?(Re=xt().then(async t=>(await fn(Yo,t),t)),Re.catch(()=>{Re=null}),Re):null}async function G(){let n=await yn(wi);return Yr(n)?n:null}function xi(n){return fn(wi,n)}async function Ze(){await Bo(wi).catch(()=>{})}async function Ct(){if(On===void 0){let n=await yn(Wo).catch(()=>{});On=typeof n=="string"?n:null}return On}async function Nt(n){n!==On&&(On=n,await fn(Wo,n).catch(()=>{}))}function It(){return zo}function qo(n){zo=n}function Fr(n){let e=n;return!!(e&&e.privateKey instanceof CryptoKey&&e.publicKey instanceof CryptoKey)}function Yr(n){let e=n;return!!(e&&typeof e.token=="string"&&e.token&&typeof e.email=="string")}var Go="install-key",mn=null;function Vo(){return mn!=null||(mn=Wr()),mn.catch(()=>{mn=null}),mn.catch(()=>null)}async function Wr(){if(!(await ki()).inDatabase)return null;let n=await yn(Go),e=qr(n)?n:await zr();return{privateKey:e.privateKey,publicKey:await vt(e.publicKey)}}async function zr(){let n=await xt();return await fn(Go,n),n}function qr(n){let e=n;return!!(e&&e.privateKey instanceof CryptoKey&&e.publicKey instanceof CryptoKey)}var Gr="/api/auth/email-otp/send-verification-otp",Vr="/api/auth/sign-in/email-otp",Jr="/api/auth/get-session",Xr="/api/auth/sign-out",Rr="/api/auth/link",Zr="x-syncify-device-key",Qr="x-syncify-signature",Jo="x-syncify-salt",ec="none",nc={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again.",link_failed:"Couldn't open the website. Try again."},v=class extends Error{constructor(t,i=null,o=null){var a;super((a=nc[t])!=null?a:"Sign-in failed. Try again.");this.code=t;this.retryAfter=i;this.share=o;this.name="AccountError"}};function Qe(n){return n instanceof v?n.message:"Sign-in failed. Try again."}async function Xo(n,e={}){let t=await Bn(Gr,{method:"POST",body:JSON.stringify(p({email:n,type:"sign-in"},e.nudge?{nudge:!0}:{}))});return typeof(t==null?void 0:t.resend_in)=="number"?t.resend_in:60}async function Ro(n,e){var a;let t=await pn(!0).catch(()=>{throw new v("no_device_key")}),i=await Bn(Vr,{method:"POST",body:JSON.stringify({email:n,otp:e}),keys:t,sendPublicKey:!0});if(typeof(i==null?void 0:i.token)!="string"||!i.token)throw new v("sign_in_failed");let o={token:i.token,email:typeof((a=i.user)==null?void 0:a.email)=="string"?i.user.email:n};return await xi(o).catch(()=>{throw new v("no_device_key")}),vi=!0,o}var vi=!1;async function Zo(){var e;let n=await G();if(!n||vi)return n;try{let t=await Et(n,Jr,"GET");vi=!0;let i=(e=t==null?void 0:t.user)==null?void 0:e.email;if(typeof i!="string"||i===n.email)return n;let o=C(p({},n),{email:i});return await xi(o).catch(()=>{}),o}catch(t){if(t instanceof v&&t.code==="signed_out")return null;throw t}}async function Qo(){let n=await G().catch(()=>null);n&&await Et(n,Xr,"POST").catch(()=>{}),await Ze()}async function es(){let n=await G();if(!n)throw new v("signed_out");let e=await Et(n,Rr,"POST"),t=typeof(e==null?void 0:e.url)=="string"?e.url:"",i=new URL(D().webUrl).origin;if(!t.startsWith(`${i}/link#`))throw new v("link_failed");return t}async function Un(n,e,t){let i=await G();if(!i)throw new v("signed_out");return Et(i,n,e,t)}async function ns(n,e,t){let i=await G().catch(()=>null),o=i?await pn(!1).catch(()=>null):null;await Bn(n,p({method:"POST",body:JSON.stringify(e),headers:t,keepalive:!0},i&&o?{token:i.token,keys:o}:{}))}async function Et(n,e,t,i){let o=await pn(!1);if(!o)throw await Ze(),new v("signed_out");return Bn(e,p({method:t,token:n.token,keys:o},i===void 0?{}:{body:JSON.stringify(i)}))}async function Bn(n,e,t=!1){var g,h,S;let i=`${D().webUrl.replace(/\/+$/,"")}${n}`,o=p({},e.headers);if(e.body!==void 0&&(o["content-type"]="application/json"),e.token&&(o.authorization=`Bearer ${e.token}`),e.keys){let E=(g=await Ct())!=null?g:ec;o[Jo]=E,o[Qr]=await Dn(e.keys.privateKey,E,e.method,i,(h=e.body)!=null?h:""),e.sendPublicKey&&(o[Zr]=await vt(e.keys.publicKey))}let a;try{a=await fetch(i,{method:e.method,headers:o,body:e.body,keepalive:e.keepalive})}catch(E){throw new v("offline")}let s=a.headers.get(Jo);s&&await Nt(s);let c=await a.json().catch(()=>null);if(a.ok)return c;let d=typeof(c==null?void 0:c.code)=="string"?c.code:a.status===503?"unavailable":"failed";if(d==="stale_salt"&&e.keys&&!t)return Bn(n,e,!0);d==="signed_out"&&await Ze();let y=Number(a.headers.get("retry-after")),f=c==null?void 0:c.share;throw new v(d,Number.isFinite(y)&&y>0?y:(S=tc[d])!=null?S:null,typeof(f==null?void 0:f.code)=="string"?{code:f.code,link:typeof f.link=="string"?f.link:null}:null)}var tc={resend_wait:60,too_many_requests:60,send_failed:60};var ic="x-syncify-user-hash",oc="x-syncify-identity",sc="x-syncify-signature",ac="x-syncify-install-key",rc="x-syncify-install-signature",Ci="x-syncify-salt",cc="none",lc="/restores",uc="/installs",dc="hash",ts=3,$n=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}},ke=class extends Error{constructor(t){super(t==="not_linked"?"Couldn't read that Spotify account's backups.":"Sign in to restore this backup.");this.code=t;this.name="LockedError"}},en=class extends Error{constructor(){super("This Spotify account doesn't accept backups from this install. Sign in to back up."),this.name="InstallRefusedError"}};async function os(n,e,t){var a;let i=await je(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(t)});if(i.status===403&&((a=await i.json().catch(()=>null))==null?void 0:a.code)==="install_refused")throw new en;if(!i.ok)throw new Error(`Backup failed with HTTP ${i.status}.`);let o=await i.json().catch(()=>null);return{unchanged:(o==null?void 0:o.unchanged)===!0,unapproved:(o==null?void 0:o.quarantined)===!0}}async function ss(n,e,t,i){let o=await je(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({install:t,action:i})},uc);if(o.ok)return;let a=await o.json().catch(()=>null);if((a==null?void 0:a.code)!=="not_pending")throw new Error(`Couldn't answer with HTTP ${o.status}.`)}async function Ni(n,e,t){var S,E,N,P;let i=await je(n,e,{method:"GET"},rs("/",t));if(i.status===404){let _=await i.json().catch(()=>null);return{exists:!1,payload:null,backups:[],safetyCopy:null,claim:Kn(_==null?void 0:_.claim),unapproved:[],install:is(_==null?void 0:_.install),nudge:!1}}if(!i.ok)throw new Error(`Restore failed with HTTP ${i.status}.`);let o=await i.json(),a=Kn(o.claim),s=is(o.install),c=o.nudge===!0;delete o.claim,delete o.install,delete o.nudge;let d=[o,...(S=o.backup_history)!=null?S:[]];if(!d.every(_=>_.backup))return{exists:!0,payload:o,backups:d.slice(0,ts),safetyCopy:(E=d[ts])!=null?E:null,claim:a,unapproved:[],install:s,nudge:c};let y=d.filter(_=>{var T;return((T=_.backup)==null?void 0:T.kind)==="rolling"}),f=(N=d.find(_=>{var T;return((T=_.backup)==null?void 0:T.kind)==="anchor"}))!=null?N:null,g=d.filter(_=>{var T;return((T=_.backup)==null?void 0:T.kind)==="quarantined"}),h=(P=y[0])!=null?P:f;return h?y.length===0&&f?{exists:!0,payload:h,backups:[f],safetyCopy:null,claim:a,unapproved:g,install:s,nudge:c}:{exists:!0,payload:h,backups:y,safetyCopy:f,claim:a,unapproved:g,install:s,nudge:c}:{exists:!1,payload:null,backups:[],safetyCopy:null,claim:a,unapproved:g,install:s,nudge:c}}async function as(n,e,t,i){try{await je(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:t}),keepalive:!0},rs(lc,i))}catch(o){}}async function je(n,e,t,i="",o=!1){var N,P,_,T,z;let a=i?`${n.replace(/\/+$/,"")}${i}`:n,s=(N=t.method)!=null?N:"GET",c=await G().catch(()=>null),d=c?await pn(!1).catch(()=>null):null,y=await Vo(),f={},g=(P=await Ct())!=null?P:cc;c&&d&&(f.authorization=`Bearer ${c.token}`,f[Ci]=g,f[sc]=await Dn(d.privateKey,g,s,a,(_=t.body)!=null?_:"")),y&&(f[Ci]=g,f[ac]=y.publicKey,f[rc]=await Dn(y.privateKey,g,s,a,(T=t.body)!=null?T:""));let h=await fetch(a,C(p({},t),{headers:p(C(p(p({},t.headers),await jo()),{[ic]:e.hash,[oc]:e.field}),f)})),S=h.headers.get(Ci);if(S&&await Nt(S),h.status===426)throw new $n;if(h.status!==401)return h;let E=(z=await h.clone().json().catch(()=>null))==null?void 0:z.code;if(!o){if(E==="stale_salt"&&(c||y))return je(n,e,t,i,!0);if(E==="signed_out"&&c)return await Ze(),je(n,e,t,i,!0)}throw E==="claimed"||E==="not_owner"||E==="not_linked"?new ke(E):(E==="signed_out"&&await Ze(),new v(typeof E=="string"?E:"failed"))}function rs(n,e){return e?`${n}?${dc}=${encodeURIComponent(e)}`:n}function is(n){let e=n;if(!e||typeof e.trust!="string")return null;let t=Array.isArray(e.waiting)?e.waiting:[];return{trusted:e.trust!=="pending"&&e.trust!=="rejected",refused:e.trust==="rejected",waiting:t.flatMap(i=>{let o=i;return o&&typeof o.id=="string"&&typeof o.first_seen_at=="number"?[{id:o.id,device:typeof o.device=="string"?o.device:null,first_seen_at:o.first_seen_at}]:[]})}}function Kn(n){let e=n;return!e||typeof e.mine!="boolean"?null:e.status==="final"?{status:"final",mine:e.mine}:e.status!=="pending"||typeof e.final_at!="number"?null:p({status:"pending",mine:e.mine,email:typeof e.email=="string"?e.email:null,final_at:e.final_at,held:e.held===!0},e.waiting===!0?{waiting:!0}:{})}async function _t(n){let e=new TextEncoder().encode(n),t=await crypto.subtle.digest("SHA-256",e);return[...new Uint8Array(t)].map(i=>i.toString(16).padStart(2,"0")).join("")}function Hn(n){return JSON.stringify(Ii(n))}function Ii(n){return Array.isArray(n)?n.map(Ii):n&&typeof n=="object"?Object.keys(n).sort().reduce((e,t)=>(e[t]=Ii(n[t]),e),{}):n}function cs(){let n=navigator.userAgent;return/Windows/i.test(n)?"Windows":/Mac OS|Macintosh/i.test(n)?"macOS":/Linux/i.test(n)?"Linux":n}var yc=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,fc=100,pc="marketplace:installed-extensions",mc="marketplace:installed-themes",gc="marketplace:theme-installed",hc="marketplace:installed:",Sc="marketplace";function _i(n){return Spicetify.Config?Ti(Spicetify.Config,n):null}function Ti(n,e){var a;let t=Fe(n),i=new Set(kc(e)),o=((a=e[gc])==null?void 0:a.includes(hc))===!0;return{current_theme:o?Sc:t.current_theme,color_scheme:o?"":t.color_scheme,extensions:t.extensions.filter(s=>!i.has(s)),custom_apps:t.custom_apps}}function Fe(n){let e=n&&typeof n=="object"?n:{};return{current_theme:Ei(e.current_theme)?e.current_theme:"",color_scheme:Ei(e.color_scheme)?e.color_scheme:"",extensions:ls(e.extensions),custom_apps:ls(e.custom_apps)}}function ys(n,e){return Hn(Fe(n))===Hn(Fe(e))}function ls(n){return Array.isArray(n)?[...new Set(n.filter(Ei))].sort().slice(0,fc):[]}function Ei(n){return typeof n=="string"&&yc.test(n)}function kc(n){let e=us(n[pc]).map(i=>{var a;let o=(a=ds(n[i]))==null?void 0:a.manifest;return o&&typeof o=="object"?o.main:void 0}),t=us(n[mc]).flatMap(i=>{var a;let o=(a=ds(n[i]))==null?void 0:a.include;return Array.isArray(o)?o:[]});return[...e,...t].flatMap(i=>{let o=typeof i=="string"?i.split("/").pop():void 0;return o?[o]:[]})}function us(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function ds(n){try{let e=n?JSON.parse(n):null;return e&&typeof e=="object"&&!Array.isArray(e)?e:null}catch(e){return null}}var bc=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],wc="marketplace:installed:",fs=`${wc}snippet:`,xc="wsoltani/syncify",vc="marketplace",ps={added:0,removed:1,unchanged:2};function V(n){let e=new Map;for(let[t,i]of bc)for(let o of Ec(n[t]))e.has(o)||e.set(o,Nc(o,i,n[o]));return[...e.values()]}function jn(n,e,t,i){let o=new Set(n.map(d=>d.key)),a=new Map(t.map(d=>[d.key,d])),s=[...n.map(d=>{let y=a.get(d.key);return C(p({},d),{change:y?"unchanged":"added",isNew:!y||y.sources.join(" ")!==d.sources.join(" ")})}),...t.filter(d=>!o.has(d.key)).map(d=>C(p({},d),{change:Fn(d,n)?"unchanged":"removed",isNew:!1}))].sort((d,y)=>ps[d.change]-ps[y.change]||d.name.localeCompare(y.name)),c={added:0,removed:0,unchanged:0};for(let d of s)c[d.change]+=1;return{items:s,counts:c,manual:Cc(e,i)}}function Fn(n,e){return n.type==="extension"&&Pt(n)&&!e.some(Pt)}function Pt(n){var e;return((e=n.repo)==null?void 0:e.toLowerCase())===xc}function Cc(n,e){if(!n)return[];let t=Fe(n),i=Fe(e),o=[...t.extensions.filter(s=>!i.extensions.includes(s)).map(s=>({type:"extension",name:s})),...t.custom_apps.filter(s=>!i.custom_apps.includes(s)).map(s=>({type:"custom_app",name:s}))],a=t.current_theme;return a&&a!==vc&&(a!==i.current_theme||t.color_scheme!==i.color_scheme)&&o.push(p({type:"theme",name:a},t.color_scheme?{scheme:t.color_scheme}:{})),o}function Nc(n,e,t){var d,y;let i=ms(t),o=ms(i==null?void 0:i.manifest),a=Tt(i==null?void 0:i.user),s=Tt(i==null?void 0:i.repo),c=(y=(d=Tt(i==null?void 0:i.title))!=null?d:Tt(o==null?void 0:o.name))!=null?y:n.startsWith(fs)?n.slice(fs.length):n.split("/").pop()||n;return{key:n,type:e,name:c,repo:e!=="snippet"&&a&&s?`${a}/${s}`:null,sources:Ic(e,i),custom:e==="snippet"&&(i==null?void 0:i.custom)===!0}}function Ic(n,e){return e?(n==="extension"?[e.extensionURL]:n==="theme"?[e.cssURL,e.schemesURL,...Array.isArray(e.include)?e.include:[]]:[]).filter(i=>typeof i=="string"&&i!==""):[]}function Tt(n){return typeof n=="string"&&n.trim()?n.trim():null}function Ec(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function ms(n){let e=n;if(typeof n=="string")try{e=JSON.parse(n)}catch(t){return null}return e&&typeof e=="object"&&!Array.isArray(e)?e:null}var At="spicetify-marketplace";var Yn="settings";async function gs(){let n=await ks();if(n.kind!=="ok")return null;try{let e=await bs(n.db,"readonly",i=>i.getAll());if(!e)return null;let t={};for(let i of e)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(t[i.key]=i.value);return t}finally{n.db.close()}}async function hs(n,e=[]){let t=await ks();if(t.kind==="unavailable")return"unavailable";let i=t.kind==="ok"?t.db:await _c();if(!i)return"failed";try{return await bs(i,"readwrite",a=>{let s;for(let[c,d]of Object.entries(n))s=a.put({key:c,value:d});for(let c of e)s=a.delete(c);return s})===null?"failed":"written"}finally{i.close()}}function Ss(){var n;try{return(n=window.indexedDB)!=null?n:null}catch(e){return null}}async function ks(){let n=Ss();return n?await Tc(n)?{kind:"missing"}:new Promise(e=>{let t=!1,i=n.open(At);i.onupgradeneeded=()=>{t=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),e({kind:"unavailable"})},i.onblocked=()=>e({kind:"unavailable"}),i.onsuccess=()=>{let o=i.result;if(t){o.close(),Pc(n).then(()=>e({kind:"missing"}));return}if(!o.objectStoreNames.contains(Yn)){o.close(),e({kind:"unavailable"});return}e({kind:"ok",db:o})}}):{kind:"unavailable"}}function _c(){let n=Ss();return n?new Promise(e=>{let t=n.open(At,1);t.onupgradeneeded=()=>{let i=t.result;i.objectStoreNames.contains(Yn)||i.createObjectStore(Yn,{keyPath:"key"})},t.onerror=()=>{console.warn("Syncify could not create Marketplace storage",t.error),e(null)},t.onblocked=()=>e(null),t.onsuccess=()=>e(t.result)}):Promise.resolve(null)}async function Tc(n){if(typeof n.databases!="function")return!1;try{return!(await n.databases()).some(t=>t.name===At)}catch(e){return!1}}function Pc(n){return new Promise(e=>{let t=n.deleteDatabase(At);t.onsuccess=()=>e(),t.onerror=()=>e(),t.onblocked=()=>e()})}function bs(n,e,t){return new Promise(i=>{let o;try{o=n.transaction(Yn,e)}catch(y){console.warn("Syncify could not open a Marketplace transaction",y),i(null);return}let a,s=!1,c=y=>{s||(s=!0,i(y))};o.oncomplete=()=>c(a),o.onerror=()=>{console.warn("Syncify Marketplace transaction failed",o.error),c(null)},o.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",o.error),c(null)};let d;try{d=t(o.objectStore(Yn))}catch(y){console.warn("Syncify Marketplace request could not be issued",y),c(null);return}d&&(d.onsuccess=()=>{a=d.result},d.onerror=()=>{console.warn("Syncify Marketplace request failed",d.error),c(null)})})}var Pi="marketplace:",Lt=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function ye(){let n=Kc(),e=await gs();if(e)for(let[t,i]of Object.entries(e))t.startsWith(Pi)&&(n[t]=i);return n}var Mc=new Set(["marketplace:active-tab","marketplace:sort"]),Ai="marketplace:installed:",Mt="marketplace:theme-installed",Lc=["stars","tags","lastUpdated","created"];async function Dt(n,e){let t={};for(let[i,o]of Object.entries(n))Mc.has(i)||(t[i]=i.startsWith(Ai)?Dc(o):o);return e&&(t.spicetify_config=Fe(e)),_t(Hn(t))}function Dc(n){try{let e=JSON.parse(n);if(!e||typeof e!="object"||Array.isArray(e))return n;for(let t of Lc)delete e[t];return e}catch(e){return n}}async function Ot(){let n=await ye(),e=_i(n);return{keyCount:Object.keys(n).length,hash:await Dt(n,e),installedItemCount:Bc(n),installedItems:Ut(n),items:V(n),spicetifyConfig:e,marketplaceAvailable:$c(n),activeTheme:Wn(n[Mt])}}function Wn(n){if(!n)return null;if(n.startsWith(Ai))return n;try{let e=JSON.parse(n);return typeof e=="string"?e:null}catch(e){return null}}async function ws(){let n=await ye(),e=_i(n);return p({schema_version:2,metadata:{last_sync_datetime:new Date().toISOString(),device_info:cs(),marketplace_key_count:Object.keys(n).length},payload_hash:await Dt(n,e),marketplace_data:{keys:n}},e?{spicetify_config:e}:{})}async function xs(n,e=[]){var a,s;let t={},i=(s=(a=n.marketplace_data)==null?void 0:a.keys)!=null?s:{};for(let[c,d]of Object.entries(i))c.startsWith(Pi)&&(t[c]=d);if(Object.keys(t).length===0)return 0;await Oc(t),e.length>0&&await Uc(t,e);let o=Li(await ye(),t);return await Mi(t,o),Object.keys(t).length}async function Mi(n,e=[]){for(let[i,o]of Object.entries(n))window.localStorage.setItem(i,o);for(let i of e)window.localStorage.removeItem(i);if(await hs(n,e)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try again.")}function Li(n,e){let t=new Set(Lt.flatMap(s=>{var c;return Bt((c=e[s])!=null?c:n[s]).map(String)})),i=Ut(n).filter(s=>s.startsWith(Ai)&&!t.has(s)),o=i.filter(s=>n[s]!==void 0&&e[s]===void 0),a=n[Mt];return a&&e[Mt]===void 0&&i.some(s=>a.includes(s))&&o.push(Mt),o}async function Oc(n){let e=await ye(),t=V(n),i=V(e).filter(s=>Fn(s,t));if(i.length===0)return;let o="marketplace:installed-extensions",a=Bt(n[o]).map(String);for(let s of i)a.includes(s.key)||a.push(s.key),n[s.key]=e[s.key];n[o]=JSON.stringify(a)}async function Uc(n,e){let t=await ye(),i=Ut(t);for(let o of Lt){if(n[o]===void 0)continue;let a=Bt(n[o]).map(String).filter(s=>!e.includes(s)||i.includes(s));n[o]=JSON.stringify(a)}for(let o of e)t[o]!==void 0?n[o]=t[o]:delete n[o]}function Bc(n){return Ut(n).length}function Ut(n){return Lt.flatMap(e=>Bt(n[e]).map(String))}function $c(n){return!!(window.Marketplace||Lt.some(t=>n[t]!==void 0)||n["marketplace:tabs"]!==void 0)}function vs(n,e){return e===0?!1:n===0?!0:n<Math.max(2,Math.floor(e*.5))}function Kc(){let n={};for(let e=0;e<window.localStorage.length;e+=1){let t=window.localStorage.key(e);if(!(t!=null&&t.startsWith(Pi)))continue;let i=window.localStorage.getItem(t);i!==null&&(n[t]=i)}return n}function Bt(n){if(!n)return[];try{let e=JSON.parse(n);return Array.isArray(e)?e:[]}catch(e){return[]}}var Hc="raw.githubusercontent.com",jc="cdn.jsdelivr.net",Cs=".github.io";function Oi(n){var t;if(n.protocol!=="https:")return null;let e=n.pathname.split("/").filter(Boolean);if(n.host===Hc)return Di(e[0],e[1]);if(n.host===jc)return e[0]==="gh"?Di(e[1],(t=e[2])==null?void 0:t.split("@")[0]):null;if(n.host.endsWith(Cs)){let i=n.host.slice(0,-Cs.length);return i.includes(".")?null:Di(i,e.length>1?e[0]:n.host)}return null}function Di(n,e){return n&&e?`${n}/${e}`:null}var Fc={extension:"spicetify-extensions",theme:"spicetify-themes"},Yc="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",Wc="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",zc="https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/",qc="https://api.github.com/repos",Gc=5e3,Vc=20,Ns="syncify:repo-topics",Is=10080*60*1e3,Jc=200;function Ye(n){return(n==null?void 0:n.kind)==="host"||(n==null?void 0:n.kind)==="repo"||(n==null?void 0:n.kind)==="blocked"||(n==null?void 0:n.kind)==="catalog"}function Gn(n){let e=new Map;for(let t of n){if(t.change==="removed")continue;if(t.custom){e.set(t.key,{kind:"custom"});continue}let i=Xc(t);i&&e.set(t.key,i)}return e}async function Vn(n,e){let t=new Map,i=n.filter(s=>s.change!=="removed"&&s.isNew&&!e.has(s.key));if(i.length===0)return t;let o=i.filter(s=>s.type==="snippet"),a=i.filter(s=>s.type!=="snippet");if(o.length>0){let s=await Ui();for(let c of o)s?$t(s,c.name)||t.set(c.key,{kind:"catalog"}):t.set(c.key,{kind:"unchecked"})}if(a.length>0){let s=await Qc(),c=tl(),d=0;await Promise.all(a.map(async y=>{let f=Rc(y),g=Fc[y.type];if(!f||!g)return;if(s===null){t.set(y.key,{kind:"unchecked"});return}if(Zc(f,s)){t.set(y.key,{kind:"blocked"});return}let h=nl(c,f);h===void 0&&d<Vc&&(d+=1,h=await el(f),h!==void 0&&(c[f.toLowerCase()]={topics:h,at:Date.now()})),h===void 0?t.set(y.key,{kind:"unchecked"}):(h===null||!h.includes(g))&&t.set(y.key,{kind:"catalog"})})),il(c)}return t}function Xc(n){let e=null;for(let t of n.sources){let i;try{i=new URL(t)}catch(a){return{kind:"host",host:t.slice(0,40)}}let o=Oi(i);if(!o)return{kind:"host",host:i.host};n.repo&&o.toLowerCase()!==n.repo.toLowerCase()&&(e!=null||(e=o))}return e?{kind:"repo",repo:e}:null}function Rc(n){for(let e of n.sources)try{let t=Oi(new URL(e));if(t)return t}catch(t){}return n.repo}function Zc(n,e){let t=`https://github.com/${n}`.toLowerCase();return e.some(i=>{let o=i.toLowerCase();if(!o.includes("*"))return o===t;let a=o.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${a}$`).test(t)})}function Es(n){return n.replace(/\n/g,"").trim().toLowerCase()}function $t(n,e){return n.get(Es(e))}var zn=null,qn=null;function Qc(){return zn!=null||(zn=_s(Yc).then(n=>{let e=n==null?void 0:n.repos;return Array.isArray(e)?e.filter(t=>typeof t=="string"&&!t.startsWith("//")):(zn=null,null)})),zn}function Ui(){return qn!=null||(qn=_s(Wc).then(n=>{if(!Array.isArray(n))return qn=null,null;let e=new Map;for(let t of n){if(typeof(t==null?void 0:t.title)!="string"||typeof t.code!="string")continue;let i=typeof t.preview=="string"?t.preview:null;e.set(Es(t.title),p({title:t.title,code:t.code,description:typeof t.description=="string"?t.description:""},i?{imageURL:i.startsWith("http")?i:`${zc}${i}`}:{}))}return e})),qn}async function el(n){let e=await Ts(`${qc}/${n}`);if((e==null?void 0:e.status)===404)return null;if(!(e!=null&&e.ok))return;let t=await e.json().catch(()=>null);return Array.isArray(t==null?void 0:t.topics)?t.topics.filter(i=>typeof i=="string"):void 0}async function _s(n){let e=await Ts(n);return e!=null&&e.ok?e.json().catch(()=>null):null}async function Ts(n){let e=typeof AbortController=="function"?new AbortController:null,t=setTimeout(()=>e==null?void 0:e.abort(),Gc);try{return await fetch(n,{signal:e==null?void 0:e.signal})}catch(i){return null}finally{clearTimeout(t)}}function nl(n,e){let t=n[e.toLowerCase()];return t&&Date.now()-t.at<Is?t.topics:void 0}function tl(){var n;try{let e=JSON.parse((n=localStorage.getItem(Ns))!=null?n:"{}");return e&&typeof e=="object"?e:{}}catch(e){return{}}}function il(n){let e=Date.now(),t=Object.entries(n).filter(([,i])=>e-i.at<Is).sort(([,i],[,o])=>o.at-i.at).slice(0,Jc);try{localStorage.setItem(Ns,JSON.stringify(Object.fromEntries(t)))}catch(i){}}var ol=/^[0-9A-HJKMNP-TV-Z]{6}$/,sl=6,al="SYN-",Ls=60,Bi=20,Ds=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],rl="marketplace:installed:",Hd=`${rl}snippet:`,nn="marketplace:theme-installed",Ps="marketplace",As={added:0,removed:1,unchanged:2},cl=new RegExp(`^[a-z0-9][a-z0-9_-]{1,${Bi-2}}[a-z0-9]$`);function Os(n){let e=n.trim().replace(/^@/,"").toLowerCase();return/[^a-z0-9_-]/.test(e)?"Only letters, digits, _ and -":e.length<3?"At least 3 characters":!/^[a-z0-9]/.test(e)||!/[a-z0-9]$/.test(e)?"Start and end with a letter or digit":null}function be(n){return`${al}${n}`}function Us(n){let e=n.trim();if(e.length>200)return null;if(e.includes("/")){let i=e.split(/[?#]/)[0].replace(/\/+$/,"");e=i.slice(i.lastIndexOf("/")+1).replace(/\.json$/i,"")}e=e.toUpperCase().replace(/[\s-]/g,""),e.length===sl+3&&e.startsWith("SYN")&&(e=e.slice(3));let t=e.replace(/O/g,"0").replace(/[IL]/g,"1");return ol.test(t)?t:null}function Bs(n){let e=n;return!e||typeof e.code!="string"||!e.keys||typeof e.keys!="object"||!Object.values(e.keys).every(t=>typeof t=="string")?null:{code:e.code,name:typeof e.name=="string"&&e.name?e.name:null,creator:typeof e.creator=="string"&&cl.test(e.creator)?e.creator:null,updated_at:typeof e.updated_at=="number"?e.updated_at:0,keys:e.keys}}async function $s(n,e){let t=n.filter(s=>!Pt(s)).map(s=>C(p({},s),{change:"added",isNew:!0})),i=Gn(t);for(let s of t)!i.has(s.key)&&!ll(s,e[s.key])&&i.set(s.key,{kind:"catalog"});let o=await Vn(t,i),a=new Map;for(let[s,c]of[...o,...i])c.kind!=="unchecked"&&a.set(s,c);return{items:t,leftOut:a}}function ll(n,e){if(n.type==="snippet")return!0;if(!n.repo)return!1;let t=yl(e);return n.type==="extension"?typeof(t==null?void 0:t.extensionURL)=="string"&&t.extensionURL!=="":typeof(t==null?void 0:t.cssURL)=="string"&&t.cssURL!==""}function Ks(n,e){let t={};for(let[o,a]of Ds){let s=e.filter(c=>c.type===a&&n[c.key]!==void 0).map(c=>c.key);t[o]=JSON.stringify(s);for(let c of s)t[c]=n[c]}let i=Wn(n[nn]);return i&&e.some(o=>o.key===i)&&(t[nn]=n[nn]),t}function Hs(n,e,t,i,o,a){let s=a==="replace"?jn(e,void 0,t,i):ul(e,t),c=Wn(n.keys[nn]),d=c!==null&&e.some(f=>f.key===c)&&i!==null&&i.current_theme!==Ps,y=c!==null&&c!==o?e.find(f=>f.key===c):void 0;return p(C(p({},s),{manual:d?[{type:"theme",name:Ps}]:[]}),y?{theme:{key:y.key,name:y.name}}:{})}function ul(n,e){let t=new Set(e.map(s=>s.key)),i=new Set(n.map(s=>s.key)),o=[...n.map(s=>t.has(s.key)?C(p({},s),{change:"unchanged",isNew:!1}):C(p({},s),{change:"added",isNew:!0})),...e.filter(s=>!i.has(s.key)).map(s=>C(p({},s),{change:"unchanged",isNew:!1}))].sort((s,c)=>As[s.change]-As[c.change]||s.name.localeCompare(c.name)),a={added:0,removed:0,unchanged:0};for(let s of o)a[s.change]+=1;return{items:o,counts:a,manual:[]}}function js(n,e){return new Set(n.items.filter(t=>t.type==="snippet"&&t.change==="added"&&(!e||!$t(e,t.name))).map(t=>t.key))}async function Fs(n,e,t,i){let o=await ye(),a=V(o),s=V(n.keys),c={};for(let[g,h]of Ds){let S=Ms(o[g]),N=[...e==="add"?S:S.filter(P=>t.includes(P)||a.some(_=>_.key===P&&Fn(_,s)))];for(let P of s){if(P.type!==h||t.includes(P.key))continue;let _=S.includes(P.key);if(e==="add"&&_)continue;let T=h==="snippet"?dl(P,i,o[P.key]):n.keys[P.key];T!==void 0&&(c[P.key]=T,N.includes(P.key)||N.push(P.key))}c[g]=JSON.stringify(N)}let d=Wn(n.keys[nn]),y=Ms(c["marketplace:installed-themes"]);d&&y.includes(d)&&!t.includes(d)&&(c[nn]=n.keys[nn]);let f=Li(o,c);return await Mi(c,f),Object.keys(c).length+f.length}function dl(n,e,t){let i=e?$t(e,n.name):void 0;return i?JSON.stringify(p({code:i.code,title:i.title,description:i.description},i.imageURL?{imageURL:i.imageURL}:{})):t}function Ms(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function yl(n){try{let e=n?JSON.parse(n):null;return e&&typeof e=="object"&&!Array.isArray(e)?e:null}catch(e){return null}}var Jn="/api/shares",fl=`${Jn}/update`,pl=`${Jn}/delete`,ml=`${Jn}/import`,gl="x-syncify-user-hash",hl="discover/presets.json",Sl={no_code:"This code doesn't exist.",too_many_codes:"You can't make more share codes. Delete one to make another.",daily_limit:"Too many changes to share codes today. Try again tomorrow.",too_large:"This setup is too big to share.",invalid_name:"Names can be up to 60 characters.",empty:"There's nothing to share yet. Install something from Marketplace first.",invalid_items:"Syncify couldn't read some items. Reload Spotify and try again.",source:"Some items don't load from GitHub. Reload Spotify and try again.",blocked:"Some items are on Marketplace's block list. Reload Spotify and try again.",custom_snippet:"Custom snippets can't be shared. Reload Spotify and try again.",unchecked:"Couldn't check Marketplace's block list. Try again in a minute.",publish_failed:"Couldn't publish the code. Press Update on it to try again.",delete_failed:"Couldn't delete the code. Try again.",same_setup:"You already shared this setup.",invalid_handle:"Handles are 3 to 20 letters, digits, _ or -, starting and ending with a letter or digit.",reserved_handle:"That handle isn't allowed. Pick another.",handle_taken:"That handle is taken. Pick another.",unavailable:"Share codes aren't available yet."},kl=new Set(["offline","signed_out","invalid_signature","stale_salt","no_device_key","too_many_requests"]);function Kt(n,e=null){var t;return n instanceof v&&kl.has(n.code)?Qe(n):n instanceof v&&n.code==="too_many_codes"&&e!==null?`You have ${e} share codes already. Delete one to make another.`:(t=n instanceof v?Sl[n.code]:void 0)!=null?t:"Something went wrong. Try again."}async function $i(){var e;let n=await Un(Jn,"GET");return{codes:Array.isArray(n==null?void 0:n.codes)?n.codes.flatMap(t=>{let i=bl(t);return i?[i]:[]}):[],newHearts:typeof(n==null?void 0:n.new_hearts)=="number"?n.new_hearts:0,max:typeof(n==null?void 0:n.max)=="number"?n.max:null,profile:typeof((e=n==null?void 0:n.profile)==null?void 0:e.handle)=="string"?{handle:n.profile.handle,link:typeof n.profile.link=="string"?n.profile.link:null}:null,suggestedHandle:typeof(n==null?void 0:n.suggested_handle)=="string"?n.suggested_handle:null}}async function Ys(n,e,t){return Js(await Un(Jn,"POST",p({name:n,keys:e},t===void 0?{}:{handle:t})))}function Ki(n){return`${D().shareUrl.replace(/\/+$/,"")}/@${n}`}async function Ws(n,e,t){return Js(await Un(fl,"POST",{code:n,name:e,keys:t}))}async function zs(n){try{await Un(pl,"POST",{code:n})}catch(e){if(e instanceof v&&e.code==="no_code")return;throw e}}async function qs(n){let e=D().shareUrl.replace(/\/+$/,""),t;try{t=await fetch(`${e}/${n}.json`)}catch(o){throw new v("offline")}if(t.status===404||t.status===403)throw new v("no_code");if(!t.ok)throw new v("failed");let i=Bs(await t.json().catch(()=>null));if(!i||i.code!==n)throw new v("no_code");return i}async function Gs(){let n=D().shareUrl.replace(/\/+$/,"");try{let e=await fetch(`${n}/${hl}`);if(!e.ok)return null;let t=await e.json();return Array.isArray(t.posts)?t.posts.flatMap(i=>{let o=vl(i);return o?[o]:[]}):null}catch(e){return null}}async function Vs(n,e,t=!1){try{await ns(ml,p({code:n},t?{source:"preset"}:{}),{[gl]:e.hash})}catch(i){}}function bl(n){let e=n;return!e||typeof e.code!="string"?null:{code:e.code,name:typeof e.name=="string"&&e.name?e.name:null,link:typeof e.link=="string"?e.link:null,item_count:typeof e.item_count=="number"?e.item_count:0,imports:typeof e.imports=="number"?e.imports:0,created_at:typeof e.created_at=="number"?e.created_at:0,updated_at:typeof e.updated_at=="number"?e.updated_at:0,hearts:xl(n.post),posted:wl(n.post)}}function wl(n){let e=n==null?void 0:n.status;return typeof e=="string"&&e!=="removed"}function xl(n){let e=n;return(e==null?void 0:e.status)==="public"&&e.hidden!==!0&&typeof e.hearts=="number"?e.hearts:null}function vl(n){let e=n,t=i=>Number.isSafeInteger(i)&&i>=0?i:0;return!e||typeof e.code!="string"?null:{code:e.code,name:typeof e.name=="string"?e.name:be(e.code),extensions:t(e.extensions),themes:t(e.themes),snippets:t(e.snippets)}}function Js(n){let e=n;if(typeof(e==null?void 0:e.code)!="string")throw new v("failed");return{code:e.code,link:typeof e.link=="string"?e.link:null,leftOut:Array.isArray(e.left_out)?e.left_out.length:0}}var Xs="/claims",Cl="/claims/cancel",Nl={no_backup:"Back up first, then secure your backup.",unsupported_identity:"This Spotify account can't be secured.",too_many_accounts:"Your account already has 10 Spotify accounts linked.",offline:"Couldn't reach Syncify. Check your connection and try again."},We=class extends Error{constructor(t){var i;super((i=Nl[t])!=null?i:"Couldn't secure your backup. Try again.");this.code=t;this.name="ClaimError"}};async function Rs(n,e){let t=await Hi(n,e,"GET",Xs);if(!t.ok)throw new We(await ji(t));let i=await t.json().catch(()=>null);return{claim:Kn(i==null?void 0:i.claim),accounts:Array.isArray(i==null?void 0:i.accounts)?i.accounts.filter(Il):null}}async function Zs(n,e){let t=await Hi(n,e,"POST",Xs);if(!t.ok)throw new We(await ji(t));let i=await t.json().catch(()=>null);return Kn(i==null?void 0:i.claim)}async function Qs(n,e){let t=await Hi(n,e,"POST",Cl);if(!t.ok&&t.status!==404)throw new We(await ji(t))}async function Hi(n,e,t,i){try{return await je(n,e,{method:t},i)}catch(o){throw o instanceof TypeError?new We("offline"):o}}async function ji(n){let e=await n.json().catch(()=>null);return typeof(e==null?void 0:e.code)=="string"?e.code:"failed"}function Il(n){let e=n;return!!(e&&typeof e.hash=="string"&&(e.status==="pending"||e.status==="final"||e.status==="cancelled"))}var hn={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},El=/^([a-z0-9]|f([1-9]|1[0-2]))$/,_l=250,Tl=40,Fi=null,Ht=null,gn=null;function ea(){return/mac/i.test(navigator.platform||navigator.userAgent)}function na(n){if(n===null)return null;if(!n||typeof n!="object")return hn;let e=n;return typeof e.key!="string"||!El.test(e.key)?hn:{key:e.key,ctrl:!!e.ctrl,alt:!!e.alt,shift:!!e.shift,meta:!!e.meta}}function Xn(n){if(!n)return"Off";let e=n.key.toUpperCase();return ea()?[n.ctrl?"\u2318":"",n.alt?"\u2325":"",n.shift?"\u21E7":"",e].join(""):[n.ctrl&&"Ctrl",n.meta&&"Win",n.alt&&"Alt",n.shift&&"Shift",e].filter(Boolean).join("+")}function ta(n){if(n.key==="Escape")return{kind:"cancel"};let e=Pl(n.code);if(!e)return{kind:"ignore"};let t=ea();if(t&&n.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:e,ctrl:t?n.metaKey:n.ctrlKey,alt:n.altKey,shift:n.shiftKey,meta:t?!1:n.metaKey},o=e.startsWith("f")&&e.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!o?{kind:"error",message:`Include ${t?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function Pl(n){var t,i;let e=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(n);return e?((i=(t=e[1])!=null?t:e[2])!=null?i:e[3]).toLowerCase():null}function ia(n){var e;if(gn&&Al(gn,n))return!1;try{let t=Spicetify.Mousetrap,i=(e=t.trigger)==null?void 0:e.call(t)._directMap;if(!i)return!1;let o=Yi(n);return Object.keys(i).some(a=>a.startsWith(`${o}:`))}catch(t){return!1}}function Wi(n,e,t=0){if(Fi=e,Ht=n,!oa()){if(t>=Tl){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>Wi(Ht,e,t+1),_l);return}zi(Ht)}function zi(n){if(Ht=n,!oa()||!Fi)return;let e=Fi;try{if(gn&&Spicetify.Keyboard._deregisterShortcut(gn),gn=null,!n)return;Spicetify.Keyboard.registerShortcut(n,t=>{t.preventDefault(),e()}),gn=n,console.debug("[Syncify]","Keyboard shortcut registered",Xn(n))}catch(t){console.warn("[Syncify]","Failed to register keyboard shortcut",t)}}function oa(){var n;return typeof((n=Spicetify.Keyboard)==null?void 0:n.registerShortcut)=="function"}function Yi(n){return[n.ctrl&&"mod",n.meta&&"meta",n.alt&&"alt",n.shift&&"shift",n.key].filter(Boolean).join("+")}function Al(n,e){return Yi(n)===Yi(e)}var qi="both",Ml=["both","topbar","menu"],Rn=null,Zn=null,jt=!1;function sa(n){return Ml.includes(n)?n:qi}function aa(){var n;return typeof((n=Spicetify.Menu)==null?void 0:n.Item)=="function"}function ra(n){Rn=n.topbarButton,Zn=n.menuItem}function Ft(n){let e=n!=="menu"||!Zn,t=n!=="topbar";if(Rn!=null&&Rn.element&&(Rn.element.style.display=e?"":"none"),!!Zn)try{t&&!jt?(Zn.register(),jt=!0):!t&&jt&&(Zn.deregister(),jt=!1)}catch(i){console.warn("[Syncify]","Failed to update profile menu item",i)}}var Wt="syncify:config",Yt={workerUrl:D().workerUrl,autoBackupEnabled:!1,shortcut:hn,entryPoint:qi};function fe(){var t,i;let n=D(),e=(i=(t=Spicetify.LocalStorage)==null?void 0:t.get(Wt))!=null?i:window.localStorage.getItem(Wt);if(!e)return C(p({},Yt),{workerUrl:n.workerUrl});try{let o=JSON.parse(e);return{workerUrl:n.workerUrl,autoBackupEnabled:o.autoBackupEnabled===void 0?Yt.autoBackupEnabled:!!o.autoBackupEnabled,shortcut:o.shortcut===void 0?Yt.shortcut:na(o.shortcut),entryPoint:sa(o.entryPoint)}}catch(o){return C(p({},Yt),{workerUrl:n.workerUrl})}}function zt(n){var t;let e=JSON.stringify({workerUrl:D().workerUrl,autoBackupEnabled:n.autoBackupEnabled,shortcut:n.shortcut,entryPoint:n.entryPoint});if((t=Spicetify.LocalStorage)!=null&&t.set){Spicetify.LocalStorage.set(Wt,e);return}window.localStorage.setItem(Wt,e)}function Qn(n){return typeof n.workerUrl=="string"&&n.workerUrl.length>0}var Ll=["username","canonicalUsername","id","uri","displayName"];async function we(){let{value:n,field:e}=await Dl();return{hash:await _t(n),field:e}}async function Dl(){var o;let n=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(n!=null&&n.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let e=await n.getUser(),t=Ll.find(a=>(e==null?void 0:e[a])!=null),i=t?e[t]:void 0;if(!t||!i)throw new Error("Unable to resolve the active Spotify user.");return{value:i,field:t}}async function nt(n){if(!Qn(n))throw new Error("Syncify backup service is not configured.");let[e,t]=await Promise.all([we(),ws()]);if(t.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:i,unapproved:o}=await os(n.workerUrl,e,t);return{payload:t,unchanged:i,unapproved:o}}async function Sn(n,e){var c;if(!Qn(n))throw new Error("Syncify backup service is not configured.");let t=await Ni(n.workerUrl,await we(),e),[i,o,a]=await Promise.all([Promise.all(t.backups.map(Vi)),t.safetyCopy?Vi(t.safetyCopy):null,Promise.all(t.unapproved.map(Vi))]),s=i.filter((d,y)=>i.findIndex(f=>f.payload_hash===d.payload_hash)===y);return C(p({},t),{payload:(c=s[0])!=null?c:null,backups:s,safetyCopy:o&&!s.some(d=>d.payload_hash===o.payload_hash)?o:null,unapproved:a.filter(d=>!s.some(y=>y.payload_hash===d.payload_hash))})}var Gi=new Map;async function Vi(n){var a,s,c;let e=(s=(a=n.marketplace_data)==null?void 0:a.keys)!=null?s:{},t=n.spicetify_config?Ti(n.spicetify_config,e):void 0,i=`${n.payload_hash} ${(c=n.metadata)==null?void 0:c.last_sync_datetime}`,o=Gi.get(i);return o||(o=Dt(e,t),Gi.set(i,o),o.catch(()=>Gi.delete(i))),C(p(p({},n),t?{spicetify_config:t}:{}),{payload_hash:await o})}async function ca(n){let e=await Ni(tt(n),await we());return{claim:e.claim,install:e.install,nudge:e.nudge}}async function la(n,e,t,i=[]){var c;let o=e!=null?e:(await Sn(n)).payload;if(!o)throw new Error("No Syncify cloud backup was found for this Spotify account.");let a=await xs(o,i),s=(c=o.backup)==null?void 0:c.id;return s&&Qn(n)&&we().then(d=>as(n.workerUrl,d,s,t)).catch(()=>{}),{payload:o,restoredCount:a}}var et=class extends Error{constructor(t){super("Couldn't back up your setup first, so nothing changed.");this.reason=t;this.name="SafetyBackupError"}};async function ua(n,e,t,i,o,a=!1){try{await nt(n)}catch(c){throw new et(c)}let s=await Fs(e,t,i,o);return we().then(c=>Vs(e.code,c,a)).catch(()=>{}),s}async function da(n){let e=await we(),t=await Rs(tt(n),e);return C(p({},t),{hash:e.hash})}async function ya(n){await Zs(tt(n),await we())}async function qt(n,e,t){await ss(tt(n),await we(),e,t)}async function Gt(n){await Qs(tt(n),await we())}function tt(n){if(!Qn(n))throw new Error("Syncify backup service is not configured.");return n.workerUrl}var fa="syncify:nudge-hidden-until",pa="syncify:nudge-panel-shown";function ma(n=Date.now()){let e=Number(ka(fa));return Number.isFinite(e)&&e>n}function ga(n=Date.now()){ba(fa,String(n+30*864e5))}function ha(){return ka(pa)!==null}function Sa(){ba(pa,"1")}function ka(n){var e,t;return(t=(e=Spicetify.LocalStorage)==null?void 0:e.get(n))!=null?t:window.localStorage.getItem(n)}function ba(n,e){var t;(t=Spicetify.LocalStorage)!=null&&t.set?Spicetify.LocalStorage.set(n,e):window.localStorage.setItem(n,e)}var Vt="syncify:claim-check-day";async function xa(n){var t,i,o;let e=fe();if(e.workerUrl){if(!e.autoBackupEnabled)return Ol(n);try{let[a,s]=await Promise.all([Ot(),Sn(e)]);va(s,n);let c=(i=(t=s.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?i:0;if(s.exists&&vs(a.keyCount,c)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((o=s.payload)==null?void 0:o.payload_hash)===a.hash||a.keyCount===0)return;let{unapproved:d}=await nt(e);Spicetify.showNotification(d?"Syncify: backed up, waiting for approval":"Syncify auto-backup complete")}catch(a){if(a instanceof ke||a instanceof en){Spicetify.showNotification("Syncify: sign in to keep backing up",!0,8e3);return}let s=a instanceof Error?a.message:String(a);console.warn("Syncify startup sync failed:",a),Spicetify.showNotification(`Syncify auto-sync skipped: ${s}`,!0,8e3)}}}async function Ol(n){let e=new Date().toLocaleDateString("en-CA");if(Bl()!==e)try{let t=await ca(fe());wa(e),va(t,n)}catch(t){if(t instanceof ke){wa(e);return}console.warn("Syncify claim check failed:",t)}}function va(n,e){var o;let t=Ul(n.claim),i=(o=n.install)==null?void 0:o.waiting[0];t?e.onClaim(t):i?e.onInstall(i):n.nudge&&!ha()&&e.onNudge()}function Ul(n){return(n==null?void 0:n.status)==="pending"&&!n.mine?n:null}function Bl(){var n,e;return(e=(n=Spicetify.LocalStorage)==null?void 0:n.get(Vt))!=null?e:window.localStorage.getItem(Vt)}function wa(n){var e;(e=Spicetify.LocalStorage)!=null&&e.set?Spicetify.LocalStorage.set(Vt,n):window.localStorage.setItem(Vt,n)}var Xi="syncify:pending-restore",$l=600*1e3,Kl=2e3,Hl=15e3,jl="marketplace:theme-installed",Fl="raw.githubusercontent.com",Yl=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],xe=null,Ji=new Set,Ia=new Map;function Ea(){return xe}function _a(n){return Ji.add(n),()=>Ji.delete(n)}function Ta(){xe&&Da(C(p({},xe),{manual:[]}))}function Xt(n,e="restore"){try{localStorage.setItem(Xi,JSON.stringify({at:Date.now(),manual:n,kind:e}))}catch(t){}}function Pa(){var n;Xt((n=xe==null?void 0:xe.manual)!=null?n:[],xe==null?void 0:xe.kind),window.location.reload()}function Aa(){Oa()&&(document.addEventListener("load",n=>Ca(n.target,"load"),!0),document.addEventListener("error",n=>Ca(n.target,"error"),!0))}async function Ma(){let n=Oa();if(!n)return;try{localStorage.removeItem(Xi)}catch(s){}let e=Date.now(),t=await Na();for(;t.loaded<t.total&&Date.now()-e<Hl;)await new Promise(s=>setTimeout(s,Kl)),t=await Na();Da(C(p({kind:n.kind,at:Date.now()},t),{manual:n.manual}));let i=t.loaded===t.total&&n.manual.length===0,o=n.kind==="share"?"Setup applied":"Backup restored",a=n.kind==="share"?"loaded":"restored";Spicetify.showNotification(i?`Syncify: ${o}; ${t.total} ${t.total===1?"item":"items"}`:`Syncify: ${a} ${t.loaded} of ${t.total}. Open Syncify for details.`,!1,8e3)}function La(n){let e=n.map(t=>t.type==="extension"?`spicetify config extensions ${Jt(t.name)}`:t.type==="custom_app"?`spicetify config custom_apps ${Jt(t.name)}`:`spicetify config current_theme ${Jt(t.name)}${t.scheme?` color_scheme ${Jt(t.scheme)}`:""}`);return e.length>0?[...e,"spicetify apply"]:[]}function Jt(n){return/^[\w.@+/-]+$/.test(n)?n:`"${n}"`}function Da(n){xe=n;for(let e of Ji)e(n)}function Oa(){var n;try{let e=JSON.parse((n=localStorage.getItem(Xi))!=null?n:"null");return!e||Date.now()-e.at>$l?null:{manual:Array.isArray(e.manual)?e.manual:[],kind:e.kind==="share"?"share":"restore"}}catch(e){return null}}function Ca(n,e){n instanceof HTMLScriptElement&&n.src&&Ia.set(it(n.src),e)}async function Na(){var i;let n=await ye(),e=(i=n[jl])!=null?i:"",t=V(n).filter(o=>o.type==="extension"&&o.sources.length>0||o.type==="theme"&&e.includes(o.key)||o.type==="snippet");return{loaded:t.filter(Wl).length,total:t.length}}function Wl(n){var e,t;if(n.type==="snippet"){let i=document.querySelector("style.marketplaceSnippets");return((e=i==null?void 0:i.textContent)==null?void 0:e.includes(`/* ${n.name} - `))===!0}if(n.type==="theme"){let i=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((t=i==null?void 0:i.textContent)!=null&&t.trim())}return zl(n.sources[0]).some(ql)}function zl(n){let e;try{e=new URL(n)}catch(s){return[]}if(e.host!==Fl)return[it(e.href)];let[t,i,o,...a]=e.pathname.split("/").filter(Boolean);return!t||!i||!o||a.length===0?[]:Yl.map(s=>it(`https://${s}/gh/${t}/${i}@${o}/${a.join("/")}`))}function ql(n){let e=Ia.get(n);return e?e==="load":[...document.querySelectorAll("script[src]")].some(i=>it(i.src)===n)&&performance.getEntriesByType("resource").some(i=>it(i.name)===n)}function it(n){try{let e=new URL(n);return`${e.origin}${e.pathname}`}catch(e){return n}}function Ri(n){return`A new install${n.device?` on ${n.device}`:""} wants to back up this Spotify account.`}function Ua(n){let e=Spicetify.React,t=e.useState,{install:i}=n,[o,a]=t(!1),[s,c]=t(null);async function d(y){a(!0),c(null);try{await qt(fe(),i.id,y),Spicetify.showNotification(y==="approve"?"Syncify: install approved":"Syncify: install refused"),n.onDone(y)}catch(f){c(f instanceof Error?f.message:String(f)),a(!1)}}return e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-claim-notice"},Ri(i)," Approve it if it's yours."),s?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},s):null,e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:n.onClose,disabled:o},"Close"),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{d("reject")},disabled:o},"Not mine"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{d("approve")},disabled:o},"Approve")))}var Gl="syncify:beta",Ba=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function $a(){var n;return(n=window.SyncifyLoader)!=null?n:null}function Vl(){try{return window.localStorage.getItem(Gl)==="true"}catch(n){return!1}}async function Ka(n){let e=Vl()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(e.map(i=>Jl(`${n}/${i}`)))).reduce((i,o)=>o&&(!i||Qi(o,i)>0)?o:i,null)}function Zi(n){return typeof n=="string"&&Ba.test(n)}function Qi(n,e){let[t,i]=[n,e].map(o=>{var y;let[,a,s,c,d]=(y=Ba.exec(o))!=null?y:[];return[a,s,c,d!=null?d:1/0].map(Number)});for(let o=0;o<t.length;o+=1)if(t[o]!==i[o])return t[o]<i[o]?-1:1;return 0}async function Jl(n,e=3e3){let t=typeof AbortController=="function"?new AbortController:null,i=setTimeout(()=>t==null?void 0:t.abort(),e);try{let o=await fetch(n,{signal:t==null?void 0:t.signal});if(!o.ok)return null;let a=await o.json();return Zi(a==null?void 0:a.version)?a.version:null}catch(o){return null}finally{clearTimeout(i)}}var to="syncify:share-code-count",Xl=600;function Rl(){var e,t;let n=Number((t=(e=Spicetify.LocalStorage)==null?void 0:e.get(to))!=null?t:NaN);return Number.isInteger(n)&&n>=0?n:null}function Ha(n){var e,t;n===null?(e=Spicetify.LocalStorage)==null||e.remove(to):(t=Spicetify.LocalStorage)==null||t.set(to,String(n))}var io="syncify:handle";function Zl(){var e;let n=(e=Spicetify.LocalStorage)==null?void 0:e.get(io);return n==null?void 0:n||null}function eo(n){var e,t;n===void 0?(e=Spicetify.LocalStorage)==null||e.remove(io):(t=Spicetify.LocalStorage)==null||t.set(io,n!=null?n:"")}var w=null;function ei(n={}){var wo,xo,vo,Co,No,Io,Eo,_o,To,Po;let e=Spicetify.React,t=e.useEffect,i=e.useMemo,o=e.useState,a=e.useRef,[s,c]=o(()=>fe()),[d,y]=o(()=>w!=null&&w.remote.exists?"success":"idle"),[f,g]=o(null),[h,S]=o(0),[E,N]=o([]),[P,_]=o([]),[T,z]=o(null),[ze,ve]=o(null),[J,Q]=o(null),[Y,Ce]=o(null),[B,ee]=o(()=>{var r;return(r=w==null?void 0:w.remote.payload)!=null?r:null}),[ae,k]=o(()=>{var r;return(r=w==null?void 0:w.remote.backups)!=null?r:[]}),[I,$]=o(()=>{var r;return(r=w==null?void 0:w.remote.safetyCopy)!=null?r:null}),[j,q]=o(()=>{var r;return(r=w==null?void 0:w.remote.unapproved)!=null?r:[]}),[ne,Ne]=o(()=>{var r;return(r=w==null?void 0:w.remote.install)!=null?r:null}),[re,st]=o(!1),[xn,at]=o(()=>new Set),[A,ce]=o(()=>{var r;return(r=w==null?void 0:w.remote.payload)!=null?r:null}),[Ie,tn]=o(w!==null),[on,X]=o(!1),[F,te]=o(!1),[Ee,vn]=o(null),[L,ie]=o(!1),[De,pe]=o(null),[me,Cn]=o((wo=n.section)!=null?wo:null),[qe,sn]=o(!1),[x,Oe]=o(()=>Ea()),[rt,Ge]=o(!1),[R,ct]=o(!1),[_e,lt]=o(null),[Te,K]=o(()=>Rl()),[Ue,oe]=o(()=>Zl()),[H,Pe]=o(void 0),[O,oi]=o(()=>{var r;return(r=w==null?void 0:w.lockedBy)!=null?r:null}),[Be,Nn]=o(()=>{var r;return(r=w==null?void 0:w.remote.claim)!=null?r:null}),[ge,Ve]=o(()=>{var r;return(r=w==null?void 0:w.claims)!=null?r:null}),[le,In]=o(!1),[ut,an]=o(null),[si,Je]=o(()=>{var r;return(r=w==null?void 0:w.remote.nudge)!=null?r:!1}),[En,dt]=o(()=>ma()),[ai,ri]=o(n.secure===!0),_n=a(!1),[rn,Tn]=o(!1),[u,m]=o(null),[b,ue]=o(null),Pn=a(null),Ae=i(()=>D(),[]),cn=i(()=>I?[...ae,I]:ae,[ae,I]),ci=u?[]:j,li=u?(xo=b==null?void 0:b.backups)!=null?xo:[]:ae,ro=u?(vo=b==null?void 0:b.safetyCopy)!=null?vo:null:I,co=i(()=>{var r;return new Map([...cn,...j,...(r=b==null?void 0:b.backups)!=null?r:[],...b!=null&&b.safetyCopy?[b.safetyCopy]:[]].map(l=>[l,V(l.marketplace_data.keys)]))},[cn,j,b]),yt=r=>{var l;return(l=co.get(r))!=null?l:V(r.marketplace_data.keys)},ir=r=>yt(r).map(l=>l.key),or=r=>yt(r).length,Z=i(()=>on&&A?jn(yt(A),A.spicetify_config,P,T):null,[on,A,co,P,T]),$e=i(()=>Z?Gn(Z.items):null,[Z]),ft=i(()=>new Map([...Ee!=null?Ee:[],...$e!=null?$e:[]]),[Ee,$e]),pt=((Co=A==null?void 0:A.backup)==null?void 0:Co.kind)==="quarantined",lo=i(()=>{var r;return new Set(((r=Z==null?void 0:Z.items)!=null?r:[]).filter(l=>{var M;return l.change!=="removed"&&l.isNew&&(pt||Ye(ft.get(l.key))||((M=ft.get(l.key))==null?void 0:M.kind)==="unchecked")}).map(l=>l.key))},[Z,ft,pt]),sr=[...lo].filter(r=>!xn.has(r)),uo=Z!==null&&Ee===null,ui=i(()=>aa(),[]),yo=i(()=>$a()!==null,[]),de=d==="loading",mt=(f==null?void 0:f.kind)==="warning"||(f==null?void 0:f.kind)==="error"?f:null,fo=!!(B&&Y&&B.payload_hash!==Y),An=!!(B&&Y&&B.payload_hash===Y),po=!!(A&&Y&&A.payload_hash===Y),gt=u!==null||qe||!An||cn.length<2,ar=gt?li:li.slice(0,1),ht=(Be==null?void 0:Be.status)==="pending"&&!Be.mine?Be:null,ln=nu(ge,O,ht!==null),rr=!En&&!O&&B!==null&&me!=="account"&&(H?ln.kind==="open":H===null&&si),St=(No=ne==null?void 0:ne.waiting[0])!=null?No:null,mo=!ne||ne.trusted||O||ln.kind==="secured"?null:ne.refused?"This Spotify account refused backups from this install. Sign in to back up from it.":"This install isn't approved yet. Its backups are kept apart until you approve it from another install or sign in.",di=(H?((Io=ge==null?void 0:ge.accounts)!=null?Io:[]).filter(r=>r.status==="final"):[]).map((r,l)=>({hash:r.hash,label:`Spotify account ${l+1}${r.device_info?` \xB7 from ${r.device_info}`:""}`})).filter(r=>r.hash!==(ge==null?void 0:ge.hash)),cr=!!(Y&&h>0&&!cn.some(r=>r.payload_hash===Y));t(()=>(G().catch(()=>null).then(r=>Pe(l=>l!=null?l:r)),he({silent:!0}),pr(),_a(Oe)),[]),t(()=>{if(vn(null),!Z||!$e)return;[...$e.values()].some(Ye)&&te(!0);let r=!0;return Vn(Z.items,$e).then(l=>{r&&(vn(l),[...l.values()].some(Ye)&&te(!0))}),()=>{r=!1}},[Z,$e]),t(()=>{if(!L)return;let r=l=>{var Me;if(!((Me=Pn.current)!=null&&Me.isConnected)){ie(!1),pe(null);return}l.preventDefault(),l.stopImmediatePropagation();let M=ta(l);if(M.kind!=="ignore"){if(M.kind==="cancel"){ie(!1),pe(null);return}if(M.kind==="error"){pe(M.message);return}if(ia(M.shortcut)){pe(`${Xn(M.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}ie(!1),yi(M.shortcut)}};return window.addEventListener("keydown",r,!0),()=>window.removeEventListener("keydown",r,!0)},[L,s]);async function go(){let r=await Ot();return Ce(r.hash),S(r.installedItemCount),N(r.installedItems),_(r.items),z(r.spicetifyConfig),ve(r.activeTheme),Q(r.marketplaceAvailable),r}async function he(r){try{X(!1),(!(r!=null&&r.silent)||!w)&&y("loading"),r!=null&&r.silent||g({kind:"info",text:"Checking your Syncify backup\u2026"}),await go();let l,M=null;try{l=await Sn(s)}catch(Ke){if(!(Ke instanceof ke))throw Ke;l=ku,M=Ke.code}let Me=await G().catch(()=>null),Se=Me?await da(s).catch(()=>null):null,W=Me?await G().catch(()=>null):null;w={remote:l,lockedBy:M,claims:W?Se:null},Pe(W),Ve(W?Se:null),oi(M),M&&Cn("account"),Nn(l.claim),m(null),ue(null),ee(l.payload),k(l.backups),$(l.safetyCopy),q(l.unapproved),Ne(l.install),Je(l.nudge),ce(l.payload),tn(!0),y(l.exists?"success":"idle"),!(r!=null&&r.silent)&&!M&&g(l.exists&&l.payload?{kind:"success",text:`Backup found from ${kn(l.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(l){Mn(l)}}async function kt(){In(!0),an(null);try{await ya(s)}catch(r){r instanceof We&&["claim_pending","claimed"].includes(r.code)||an(r instanceof Error?r.message:String(r))}finally{await he({silent:!0}),In(!1)}}function lr(){ri(!0),H?kt():un("account")}function ur(){ga(),dt(!0)}t(()=>{!n.secure||_n.current||le||!H||ln.kind!=="open"||O||(_n.current=!0,kt())},[H,ln.kind,O,le]);function dr(r){Pe(r),_n.current=!0,!O&&B?kt():he({silent:!0})}function ho(){Ha(null),K(null),eo(void 0),oe(void 0),Pe(null),Ve(null),an(null),he({silent:!0})}async function yr(){Tn(!0);try{await Gt(s),Spicetify.showNotification("Syncify: claim sent for review"),await he({silent:!0})}catch(r){g({kind:"error",text:r instanceof Error?r.message:String(r)})}finally{Tn(!1)}}async function fr(r){if(X(!1),m(r),ue(null),!r){ce(B);return}ce(null);try{let l=await Sn(s,r);ue(l),ce(l.payload)}catch(l){m(null),ce(B),Mn(l)}}async function pr(){let r=Ae.version;if(!Zi(r))return;let l=await Ka(Ae.releasesUrl);l&&Qi(l,r)>0&&lt(l)}function mr(r){let l=C(p({},s),{autoBackupEnabled:r});c(l),zt(l),g({kind:"success",text:r?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}function yi(r){let l=C(p({},s),{shortcut:r});c(l),zt(l),zi(r),pe(null),g({kind:"success",text:r?`${Xn(r)} now opens Syncify.`:"Keyboard shortcut turned off."})}function gr(r){let l=C(p({},s),{entryPoint:r});c(l),zt(l),Ft(r)}function un(r){Cn(r),r!=="settings"&&ie(!1)}function hr(){pe(null),ie(!0)}async function Sr(){var r;try{X(!1),y("loading"),g({kind:"info",text:"Backing up your extensions and themes\u2026"});let{payload:l,unchanged:M,unapproved:Me}=await nt(s);if(await go(),Me){await he({silent:!0}),g({kind:"warning",text:"Backed up, but kept apart until this install is approved."}),Spicetify.showNotification("Syncify: backed up, waiting for approval");return}if(M){tn(!0),y("success"),g({kind:"success",text:"Everything is already backed up."}),Spicetify.showNotification("Syncify: everything is already backed up");return}let Se=[l,...ae.filter(W=>W.payload_hash!==l.payload_hash)].slice(0,Su);w&&(w=C(p({},w),{remote:C(p({},w.remote),{exists:!0,payload:l,backups:Se,safetyCopy:((r=w.remote.safetyCopy)==null?void 0:r.payload_hash)===l.payload_hash?null:w.remote.safetyCopy})})),ee(l),k(Se),$(W=>(W==null?void 0:W.payload_hash)===l.payload_hash?null:W),ce(l),tn(!0),y("success"),g({kind:"success",text:`Backed up ${l.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(l){Mn(l)}}async function So(r){if(St){st(!0);try{await qt(s,St.id,r),Spicetify.showNotification(r==="approve"?"Syncify: install approved":"Syncify: install refused"),await he({silent:!0})}catch(l){Mn(l)}finally{st(!1)}}}function kr(r=A){if(J===!1){let l="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";g({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3);return}if(!r){let l="No Syncify cloud backup was found for this Spotify account.";g({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3);return}ce(r),te(!1),at(new Set),X(!0)}async function br(){let r=A?jn(yt(A),A.spicetify_config,P,T).manual:[];try{X(!1),y("loading"),g({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:l,restoredCount:M}=await la(s,A!=null?A:void 0,u!=null?u:void 0,sr);ce(l),y("success"),g({kind:"success",text:`Restored ${M} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),Xt(r),setTimeout(()=>window.location.reload(),1e3)}catch(l){Mn(l)}}async function wr(r){await Xa(r)&&(Ge(!0),setTimeout(()=>Ge(!1),2e3))}function Xe(r){if(r.startsWith("mailto:")){window.location.href=r;return}window.open(r,"_blank","noopener,noreferrer")}function Mn(r){if(y("error"),r instanceof $n){ct(!0),g(null);return}if(r instanceof en){g({kind:"error",text:r.message}),he({silent:!0});return}if(r instanceof ke&&r.code!=="not_linked"){g(null),he({silent:!0});return}let l=r instanceof Error?r.message:String(r);g({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3)}function fi(r,l){var Ao,Mo;let M=(A==null?void 0:A.payload_hash)===r.payload_hash,Me=r.payload_hash===Y,Se=kn(r.metadata.last_sync_datetime),W=qa(or(r)),Ke=(Mo=(Ao=r.backup)==null?void 0:Ao.name)!=null?Mo:null;return e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":M,"data-selected":M?"true":"false",type:"button",key:`${r.payload_hash}-${r.metadata.last_sync_datetime}`,title:l!=null&&l.isSafetyCopy?"Kept aside and updated about once a week, so a burst of new backups can't replace it":l!=null&&l.isUnapproved?"From an install this Spotify account hasn't approved":void 0,onClick:()=>{ce(r),X(!1)},disabled:de},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),l!=null&&l.isSafetyCopy?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Safety copy"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 updated weekly")),e.createElement("span",{className:"syncify-muted"},Ke?`${Ke} \xB7 `:"",Se," \xB7 ",W)):l!=null&&l.isUnapproved?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Not approved"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 ",Se)),e.createElement("span",{className:"syncify-muted"},W," \xB7 from ",r.metadata.device_info)):Ke?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,Ke),e.createElement("span",{className:"syncify-muted syncify-backup-date"},Se," \xB7 ",W," \xB7 from ",r.metadata.device_info)):e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-backup-date"},Se),e.createElement("span",{className:"syncify-muted"},W," \xB7 from ",r.metadata.device_info)),Me?e.createElement("span",{className:"syncify-tag",title:"What's on this device now"},"Current"):null,l!=null&&l.isSafetyCopy?e.createElement(Wa,null):null,l!=null&&l.isUnapproved?e.createElement(ao,null):null)}function pi(r){r.stopPropagation()}let xr=R?"Update Syncify to keep backing up":O?"Sign in to restore":Ie?B?fo?"Changes since your last backup":"Everything is backed up":"No backup yet":d==="error"?"Couldn't check your backup":"Checking your backup\u2026",ko=R?"Your backups are safe":O?O==="not_owner"?"Secured by another account":"This backup is secured":Ie?B?fo?wu(B,ir(B),E,T):`Last backup ${kn(B.metadata.last_sync_datetime)}`:"Save your extensions and themes so you can restore them after a reinstall or on another computer.":null,bo=!!(x&&!R&&Date.now()-x.at<hu),Ln=!!(x&&x.loaded===x.total),mi=La((Eo=x==null?void 0:x.manual)!=null?Eo:[]);return e.createElement("div",{className:"syncify-panel",ref:Pn,onClick:pi,onMouseDown:pi,onPointerDown:pi},R?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,"This version of Syncify is no longer supported."),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Xe(`${Ae.githubUrl}#updating`)},"How to update")):null,ht?e.createElement("div",{className:"syncify-alert",role:"alert"},e.createElement("span",null,(_o=ht.email)!=null?_o:"Someone"," is claiming this backup.",H===null?" If that's you, sign in to finish.":ht.held?" Syncify is reviewing it.":null),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{yr()},disabled:rn},"Not me"),H===null?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>un("account")},"That's me, sign in"):null)):null,St?e.createElement("div",{className:"syncify-alert",role:"alert"},e.createElement("span",null,Ri(St)),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{So("reject")},disabled:re},"Not mine"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{So("approve")},disabled:re},"Approve"))):null,mo?e.createElement("div",{className:"syncify-alert",role:"status"},e.createElement("span",null,mo)):null,mi.length>0?e.createElement("div",{className:"syncify-alert syncify-manual",role:"status"},e.createElement("span",{className:"syncify-manual-header"},e.createElement("span",null,x.manual.length===1?"1 isn't from Marketplace. Add it in a terminal:":`${x.manual.length} aren't from Marketplace. Add them in a terminal:`),e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:Ta},e.createElement(oo,null))),e.createElement("span",{className:"syncify-code"},e.createElement("code",null,mi.join(`
`)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{wr(mi.join(`
`))}},rt?"Copied":"Copy"))):null,mt?e.createElement("div",{className:"syncify-alert","data-kind":mt.kind},e.createElement("span",null,mt.text),e.createElement("span",{className:"syncify-alert-actions"},mt.kind==="error"?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{he()},disabled:de},"Try again"):null,e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>g(null)},e.createElement(oo,null)))):null,e.createElement("section",{className:"syncify-status","aria-live":"polite"},bo&&x?e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},x.kind==="share"?Ln?"Setup loaded":`Loaded ${x.loaded} of ${x.total}`:Ln?"Backup restored":`Restored ${x.loaded} of ${x.total}`),e.createElement("p",{className:"syncify-muted"},Ln?x.total===0?"Nothing from Marketplace to load":`${x.loaded} of ${x.total} loaded`:"Missing something? Reload Spotify once more."),Ln&&x.kind==="restore"?e.createElement("p",{className:"syncify-muted"},"Syncify saved your setup?"," ",e.createElement("button",{className:"syncify-text-button syncify-inline-button",type:"button",onClick:()=>Xe(Ae.kofiUrl)},"Support it on Ko-fi")):null):e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},xr),e.createElement("p",{className:"syncify-muted"},ko?`${ko} \xB7 `:"",qa(h)," on this device")),bo&&!Ln?e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:Pa},"Reload"):e.createElement("button",{className:"syncify-button",type:"button",onClick:Sr,disabled:de||An||R||O!==null,title:O?"Sign in to back up":An?"No changes since your last backup":void 0},de?"Working\u2026":An?"Backed up":"Back up now")),rr?e.createElement("div",{className:"syncify-nudge",role:"region","aria-label":"Secure your backup"},e.createElement(Wa,null),e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it")),e.createElement("span",{className:"syncify-nudge-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:ur,disabled:le},"Not now"),e.createElement("button",{className:"syncify-button",type:"button",onClick:lr,disabled:le||de},le?"Securing\u2026":"Secure"))):null,!Ie||O||ae.length>0||j.length>0||di.length>0?e.createElement("section",{className:"syncify-section","aria-label":"Backups"},e.createElement("div",{className:"syncify-section-header"},e.createElement("h4",{className:"syncify-section-title"},"Backups"),e.createElement("span",{className:"syncify-section-controls"},!u&&An&&cn.length>1?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":qe,"aria-controls":"syncify-backup-list",onClick:()=>{sn(!qe),X(!1)}},qe?"Show less":`Show all ${cn.length}`,e.createElement(bn,null)):null,!O&&di.length>0?e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select","aria-label":"Show backups from",value:u!=null?u:"",onChange:r=>{fr(r.currentTarget.value||null)},disabled:de},e.createElement("option",{value:""},"This Spotify account"),di.map(r=>e.createElement("option",{key:r.hash,value:r.hash},r.label))),e.createElement(bn,null)):null)),Ie?O?e.createElement("p",{className:"syncify-locked"},e.createElement(gu,null),e.createElement("span",null,O==="not_owner"?"Sign in with the account that secured them":"Sign in to see and restore your backups")):u&&!b?e.createElement("p",{className:"syncify-muted"},"Loading backups\u2026"):li.length===0&&ci.length===0?e.createElement("p",{className:"syncify-muted"},"No backups yet."):e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-list",id:"syncify-backup-list",role:"radiogroup","aria-label":"Choose a backup to restore"},ar.map(r=>fi(r)),gt&&ro?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),fi(ro,{isSafetyCopy:!0})):null,gt&&ci.length>0?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),ci.map(r=>fi(r,{isUnapproved:!0}))):null),gt?J===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to restore a backup."):on?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},"Restore"," ",A?(Po=(To=A.backup)==null?void 0:To.name)!=null?Po:kn(A.metadata.last_sync_datetime):"this backup","?"),pt?e.createElement("div",{className:"syncify-alert"},"An install this Spotify account hasn't approved made this backup. Its items stay off unless you turn them on."):null,Z?e.createElement(Va,{preview:Z,checks:ft,off:lo,allowed:xn,unapproved:pt,onAllow:(r,l)=>{let M=new Set(xn);l?M.add(r):M.delete(r),at(M)},expanded:F,onToggle:()=>te(!F)}):null,e.createElement("div",{className:"syncify-actions"},cr?e.createElement("div",{className:"syncify-alert syncify-actions-hint"},"Your current setup isn't backed up."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>X(!1),disabled:de},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:br,disabled:de||uo},uo?"Checking\u2026":"Restore"))):e.createElement("div",{className:"syncify-actions"},po?e.createElement("span",{className:"syncify-muted syncify-actions-hint"},"This backup is already current."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>kr(),disabled:de||!A||po},"Restore backup")):null):e.createElement("div",{className:"syncify-backup-skeleton","aria-hidden":"true"},e.createElement("span",{className:"syncify-radio"}),e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-skeleton-line"}),e.createElement("span",{className:"syncify-skeleton-line wide"})))):null,e.createElement("div",{className:"syncify-accordion"},e.createElement(no,{id:"share",title:"Share",openSection:me,onToggle:un,status:H&&Te?{kind:"count",label:`${Te} ${Te===1?"code":"codes"}`,text:String(Te)}:null},e.createElement(ou,{config:s,session:H,localItems:P,localConfig:T,localTheme:ze,marketplaceAvailable:J,busy:de,onSignIn:()=>un("account"),onSignedOut:ho,onCodeCount:r=>{Ha(r),K(r)},onHandle:r=>{eo(r),oe(r)}})),e.createElement(no,{id:"account",title:"Account",openSection:me,onToggle:un,status:fu(H,O,ln)},e.createElement(tu,{session:H,locked:O,secure:ln,securing:le,secureError:ut,onSecure:()=>{kt()},nudge:ai,onSignedIn:dr,onSignedOut:ho,onOpenWebsite:Xe,handle:Ue,onHandle:r=>{eo(r),oe(r)}})),e.createElement(no,{id:"settings",title:"Settings",openSection:me,onToggle:un,status:_e?{kind:"dot",label:`Syncify ${_e} is out`}:null},e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Back up automatically"),e.createElement("span",{className:"syncify-muted"},"When Spotify starts and something has changed")),e.createElement("input",{className:"syncify-switch",type:"checkbox",role:"switch",checked:s.autoBackupEnabled&&!R,onChange:r=>mr(r.currentTarget.checked),disabled:de||R})),e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Open Syncify from"),ui?s.entryPoint==="menu"&&!s.shortcut?e.createElement("span",{className:"syncify-muted"},"Keep a shortcut in case a Spotify update breaks the menu"):null:e.createElement("span",{className:"syncify-muted"},"The profile menu isn't available in this Spicetify version")),e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select",value:ui?s.entryPoint:"topbar",onChange:r=>gr(r.currentTarget.value),disabled:!ui},bu.map(r=>e.createElement("option",{key:r.value,value:r.value},r.label))),e.createElement(bn,null))),e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Keyboard shortcut"),L&&!De?e.createElement("span",{className:"syncify-muted"},"Press a key combination, or Esc to cancel"):null),e.createElement("span",{className:"syncify-shortcut"},s.shortcut&&!L?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>yi(null)},"Turn off"):null,!s.shortcut&&!L?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>yi(hn)},"Use default"):null,e.createElement("button",{className:"syncify-key",type:"button","data-recording":L?"true":"false",onClick:()=>L?ie(!1):hr(),title:"Click to change"},L?"Press keys\u2026":s.shortcut?Xn(s.shortcut):"Off"))),De?e.createElement("div",{className:"syncify-alert",role:"alert"},De):null)),e.createElement("footer",{className:"syncify-footer"},e.createElement("span",{className:"syncify-footer-version"},e.createElement("span",null,"Syncify ",Ae.version),_e?e.createElement("button",{className:"syncify-text-button syncify-update",type:"button",onClick:()=>yo?window.location.reload():Xe(`${Ae.githubUrl}#updating`)},_e," is out \xB7 ",yo?"Reload":"How to update"):null),e.createElement("span",{className:"syncify-footer-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Xe(Ae.issueUrl)},"Report an issue"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Xe(Ae.githubUrl)},"GitHub"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Xe(Ae.kofiUrl)},"Support on Ko-fi"))))}var ja={added:{mark:"+",label:"Added"},removed:{mark:"\u2212",label:"Removed"},unchanged:{mark:"=",label:"Unchanged"}},Ga=[["extension","Extensions"],["theme","Themes"],["snippet","Snippets"]],Ql={extension:"extension",custom_app:"custom app",theme:"theme"};function Va(n){let e=Spicetify.React,{items:t,counts:i,manual:o,theme:a}=n.preview,s=[...n.off].filter(c=>!n.allowed.has(c)).length;return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-chips","aria-label":"What changes on this device"},i.added?e.createElement("span",{className:"syncify-chip","data-change":"added"},"+",i.added," added"):null,i.removed?e.createElement("span",{className:"syncify-chip","data-change":"removed"},"\u2212",i.removed," removed"):null,i.unchanged?e.createElement("span",{className:"syncify-chip"},i.unchanged," unchanged"):null,o.length?e.createElement("span",{className:"syncify-chip"},o.length," to add manually"):null,a&&(!n.off.has(a.key)||n.allowed.has(a.key))?e.createElement("span",{className:"syncify-chip"},"Switches your theme to ",a.name):null,s?e.createElement("span",{className:"syncify-chip","data-change":"off"},s," off"):null),t.length||o.length?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":n.expanded,"aria-controls":"syncify-restore-changes",onClick:n.onToggle},n.expanded?"Hide changes":"Show changes",e.createElement(bn,null)):null,n.expanded?e.createElement("div",{className:"syncify-changes",id:"syncify-restore-changes"},Ga.map(([c,d])=>{let y=t.filter(f=>f.type===c);return y.length===0?null:e.createElement("section",{key:c,"aria-label":d},e.createElement("h5",{className:"syncify-change-group"},d),e.createElement("ul",{className:"syncify-change-list"},y.map(f=>{var g,h;return e.createElement("li",{className:"syncify-change",key:f.key},e.createElement("span",{className:"syncify-mark","data-change":f.change,role:"img","aria-label":ja[f.change].label},ja[f.change].mark),e.createElement("span",{className:"syncify-change-name"},f.name,f.repo?e.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",f.repo):null),n.checks.has(f.key)?e.createElement(Ja,{check:n.checks.get(f.key)}):n.unapproved&&n.off.has(f.key)?e.createElement("span",{className:"syncify-source","data-warning":"true"},e.createElement(ao,null),"Not approved"):null,n.off.has(f.key)&&!((g=n.fixed)!=null&&g.has(f.key))?e.createElement("label",{className:"syncify-item-switch"},e.createElement("input",{type:"checkbox",checked:n.allowed.has(f.key),onChange:S=>n.onAllow(f.key,S.currentTarget.checked)}),(h=n.switchLabel)!=null?h:"Restore"):null)})))}),o.length?e.createElement("section",{"aria-label":"Add manually"},e.createElement("h5",{className:"syncify-change-group"},"Add manually"),e.createElement("ul",{className:"syncify-change-list"},o.map(c=>e.createElement("li",{className:"syncify-change",key:`${c.type}:${c.name}`},e.createElement("span",{className:"syncify-mark","aria-hidden":"true"}),e.createElement("span",{className:"syncify-change-name"},c.name,e.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",Ql[c.type],c.scheme?`, ${c.scheme}`:"")))))):null):null)}var eu={host:"Loads from outside GitHub",repo:"Its code is in a different repo than the one it names",blocked:"On Marketplace's block list",catalog:"Not in Marketplace's catalog",unchecked:"GitHub couldn't be reached to check it",custom:"A snippet made in Marketplace, not from its list"};function Ja(n){let e=Spicetify.React,{check:t}=n,i=Ye(t),o=t.kind==="host"?`Code from ${t.host}`:t.kind==="repo"?`Code from ${t.repo}`:t.kind==="blocked"?"Blocked by Marketplace":t.kind==="catalog"?"Not in Marketplace":t.kind==="unchecked"?"Not checked":"Custom";return e.createElement("span",{className:"syncify-source","data-warning":i?"true":"false",title:eu[t.kind]},i?e.createElement(ao,null):null,o)}function nu(n,e,t){var s,c;if(e==="not_owner")return{kind:"other-account"};if(!n)return t?{kind:"other-claim"}:{kind:"unknown"};let{claim:i}=n;if((i==null?void 0:i.status)==="final"){if(!i.mine)return{kind:"other-account"};let d=((s=n.accounts)!=null?s:[]).filter(y=>y.status==="final").length;return{kind:"secured",linkedCount:Math.max(d,1)}}if((i==null?void 0:i.status)==="pending")return i.mine?{kind:"pending",finalAt:i.final_at,held:i.held,waiting:i.waiting===!0}:{kind:"other-claim"};let o=((c=n.accounts)!=null?c:[]).filter(d=>d.hash===n.hash),a=o[o.length-1];return(a==null?void 0:a.status)==="cancelled"&&a.cancelled_by==="owner"?{kind:"cancelled"}:{kind:"open"}}function tu(n){let e=Spicetify.React,t=e.useEffect,i=e.useState,{session:o,secure:a}=n,[s,c]=i(()=>It()),[d,y]=i(()=>It().email),[f,g]=i(""),[h,S]=i(!1),[E,N]=i(null),[P,_]=i(()=>Date.now()),{handle:T,onHandle:z}=n;t(()=>{if(!o||T!==void 0)return;let k=!0;return $i().then(I=>{var $,j;k&&z((j=($=I.profile)==null?void 0:$.handle)!=null?j:null)}).catch(()=>{}),()=>{k=!1}},[o,T]);let ze=!!(s.codeSentAt&&P-s.codeSentAt<lu),ve=Math.max(0,Math.ceil((s.retryAt-P)/1e3)),J=s.retryEmail===null||s.retryEmail===d.trim().toLowerCase()?ve:0;t(()=>{if(!o)return;let k=!0;return Zo().then(I=>{!k||I||(N({kind:"warning",text:Qe(new v("signed_out"))}),n.onSignedOut())}).catch(()=>{}),()=>{k=!1}},[o==null?void 0:o.token]),t(()=>{if(s.retryAt<=Date.now())return;let k=setInterval(()=>{_(Date.now()),s.retryAt<=Date.now()&&clearInterval(k)},1e3);return()=>clearInterval(k)},[s.retryAt]);function Q(k){let I=p(p({},It()),k);qo(I),c(I),_(Date.now())}async function Y(k){var $;let I=k.trim();if(!du.test(I)){N({kind:"error",text:"Enter a valid email address."});return}S(!0),N(null);try{let j=await Xo(I,{nudge:n.nudge});Q({email:I,codeSentAt:Date.now(),retryAt:Date.now()+j*1e3,retryEmail:I.toLowerCase()}),g("")}catch(j){let q=j instanceof v?j:null,ne=($=q==null?void 0:q.retryAfter)!=null?$:null,Ne=ne&&ne<=uu?Date.now()+ne*1e3:0,re=(q==null?void 0:q.code)==="too_many_requests"?null:I.toLowerCase();if((q==null?void 0:q.code)==="resend_wait"){Q({email:I,codeSentAt:s.email===I&&s.codeSentAt?s.codeSentAt:Date.now(),retryAt:Ne,retryEmail:re});return}Ne&&Q({retryAt:Ne,retryEmail:re}),N({kind:"error",text:Qe(j)})}finally{S(!1)}}async function Ce(){S(!0),N(null);try{let k=await Ro(s.email,f);Q({codeSentAt:null}),g(""),n.onSignedIn(k)}catch(k){N({kind:"error",text:Qe(k)});let I=k instanceof v?k.code:null;(I==="too_many_attempts"||I==="code_expired")&&g("")}finally{S(!1)}}async function B(){var I;let k=(I=o==null?void 0:o.email)!=null?I:"";S(!0),N(null),await Qo(),Q({email:k,codeSentAt:null}),y(k),S(!1),n.onSignedOut()}async function ee(){S(!0),N(null);try{n.onOpenWebsite(await es())}catch(k){let I=k instanceof v&&k.code==="signed_out";N({kind:I?"warning":"error",text:Qe(k)}),I&&n.onSignedOut()}finally{S(!1)}}let ae=E?e.createElement("div",{className:"syncify-alert","data-kind":E.kind==="error"?"error":void 0,role:"alert"},E.text):null;if(o===void 0)return null;if(o){let k=a.kind==="open"||a.kind==="other-claim"||a.kind==="cancelled";return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",{className:"syncify-account-email"},o.email),a.kind==="secured"?e.createElement("span",{className:"syncify-muted"},"Backup secured \xB7"," ",a.linkedCount===1?"1 Spotify account linked":`${a.linkedCount} Spotify accounts linked`):a.kind==="pending"?e.createElement("span",{className:"syncify-muted syncify-account-state"},e.createElement(Ra,null),e.createElement("span",null,"Securing this backup \xB7"," ",a.waiting?"waiting on sign-in":a.held?"in review":`final ${so(a.finalAt)}`)):a.kind==="other-account"?e.createElement("span",{className:"syncify-muted"},"This backup is secured by another account"):e.createElement("span",{className:"syncify-muted"},"Signed in")),e.createElement("span",{className:"syncify-account-actions"},e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-label":"Manage on the website",onClick:()=>{ee()},disabled:h},"Manage",e.createElement(za,null)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{B()},disabled:h},"Sign out"))),T?e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"@",T),e.createElement("span",{className:"syncify-muted"},"Your handle")),e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-label":"Open your profile",onClick:()=>n.onOpenWebsite(Ki(T))},"Profile",e.createElement(za,null))):null,k?e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it")),e.createElement("button",{className:"syncify-button",type:"button",onClick:n.onSecure,disabled:h||n.securing||a.kind==="other-claim"},n.securing?"Securing\u2026":a.kind==="cancelled"?"Secure again":"Secure")):null,a.kind==="other-claim"?e.createElement("div",{className:"syncify-alert",role:"status"},"Another claim is pending. If it isn't yours, press Not me above and Syncify will review it."):a.kind==="cancelled"?e.createElement("div",{className:"syncify-alert",role:"status"},"Your claim was cancelled from this Spotify account."):a.kind==="pending"&&a.waiting?e.createElement("div",{className:"syncify-alert",role:"status"},"Syncify ran on this Spotify account without you signed in, maybe after a Spotify update or on another computer. Sign in to Syncify there to finish linking."):null,n.secureError?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},n.secureError):null,ae)}return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting"},n.locked?e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Sign in to restore"),e.createElement("span",{className:"syncify-muted"},"With the email that secured this backup")):e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it"))),e.createElement("form",{className:"syncify-confirm",noValidate:!0,onSubmit:k=>{k.preventDefault(),!h&&(ze?f.length===Qt&&Ce():J||Y(d))}},ze?e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-muted"},"Code sent to ",yu(s.email)),e.createElement("div",{className:"syncify-field"},e.createElement("input",{className:"syncify-input syncify-code-input",type:"text",inputMode:"numeric",autoComplete:"one-time-code","aria-label":"6-digit code",placeholder:"123456",maxLength:Qt,value:f,onChange:k=>g(k.currentTarget.value.replace(/\D/g,"").slice(0,Qt)),autoFocus:!0}),e.createElement("button",{className:"syncify-button",type:"submit",disabled:h||f.length!==Qt},h?"Verifying\u2026":"Verify")),e.createElement("p",{className:"syncify-muted syncify-account-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Y(s.email)},disabled:h||ve>0},ve>0?`Resend in ${Ya(ve)}`:"Resend code"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Q({codeSentAt:null}),g(""),N(null)},disabled:h},"Use another email"))):e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-field"},e.createElement("input",{className:"syncify-input",type:"email",autoComplete:"email","aria-label":"Email",placeholder:"you@example.com",value:d,onChange:k=>y(k.currentTarget.value),autoFocus:!0}),e.createElement("button",{className:"syncify-button",type:"submit",disabled:h||J>0||!d.trim()},h?"Sending\u2026":"Send code")),e.createElement("p",{className:"syncify-muted"},J>0?`Send another code in ${Ya(J)}`:"We only email sign-in codes.")),ae))}var iu=[["add","Add to my setup"],["replace","Replace my setup"]];function ou(n){var Tn;let e=Spicetify.React,t=e.useEffect,i=e.useMemo,o=e.useRef,a=e.useState,{session:s}=n,[c,d]=a(""),[y,f]=a(!1),[g,h]=a(null),[S,E]=a(null),[N,P]=a(null),[_,T]=a(null),[z,ze]=a("add"),[ve,J]=a(!1),[Q,Y]=a(()=>new Set),[Ce,B]=a(null),[ee,ae]=a(void 0),[k,I]=a(!1),[$,j]=a(null),[q,ne]=a(0),Ne=o(!1),[re,st]=a(null),[xn,at]=a(null),[A,ce]=a(null),[Ie,tn]=a(""),[on,X]=a(null),[F,te]=a(null),[Ee,vn]=a(""),[L,ie]=a(null),[De,pe]=a(!1),[me,Cn]=a(!1),[qe,sn]=a(null),[x,Oe]=a(null),[rt,Ge]=a(null),[R,ct]=a(!1),[_e,lt]=a(null),Te=o(0),K=i(()=>S?Hs(S.file,S.items,n.localItems,n.localConfig,n.localTheme,z):null,[S,n.localItems,n.localConfig,n.localTheme,z]),Ue=i(()=>{if(!K||!S)return null;let u=new Set(S.items.map(m=>m.key));return K.items.filter(m=>m.change!=="removed"&&u.has(m.key)&&(z==="replace"||m.isNew))},[K,S,z]),oe=i(()=>Ue?Gn(Ue):null,[Ue]),H=i(()=>new Map([...Ce!=null?Ce:[],...oe!=null?oe:[]]),[Ce,oe]),Pe=i(()=>K&&ee!==void 0?js(K,ee):new Set,[K,ee]),O=i(()=>{var u;return new Set([...((u=K==null?void 0:K.items)!=null?u:[]).filter(m=>{var b;return m.change!=="removed"&&m.isNew&&(Ye(H.get(m.key))||((b=H.get(m.key))==null?void 0:b.kind)==="unchecked")}).map(m=>m.key),...Pe])},[K,H,Pe]),oi=[...O].filter(u=>Pe.has(u)||!Q.has(u)),Be=K!==null&&(Ce===null||ee===void 0),Nn=L?L.items.filter(u=>!L.leftOut.has(u.key)):[],ge=!!($&&re!==null&&$.length>=re),Ve=F!==null&&F.code===null&&!xn,le=Ve?Os(Ie):null,[In,ut]=a(null);t(()=>{if(!le){ut(null);return}let u=window.setTimeout(()=>ut(le),Xl);return()=>window.clearTimeout(u)},[le]),t(()=>{if(B(null),!Ue||!oe)return;[...oe.values()].some(Ye)&&J(!0);let u=!0;return Vn(Ue,oe).then(m=>{u&&(B(m),[...m.values()].some(Ye)&&J(!0))}),()=>{u=!1}},[Ue,oe]),t(()=>{Gs().then(P)},[]),t(()=>{j(null),te(null),Oe(null),Ne.current=!1,s&&Je()},[s==null?void 0:s.token]);async function an(u){let m=u!=null?u:Us(c);if(h(null),E(null),!m){h(Kt(new v("no_code")));return}f(!0),T(u!=null?u:null);try{let b=await qs(m);ze("add"),Y(new Set),J(!1),E({file:b,items:V(b.keys),pick:u!==void 0}),Ui().then(ae)}catch(b){h(Kt(b))}finally{f(!1),T(null)}}async function si(){if(!(!S||!K)){I(!0),h(null);try{await ua(n.config,S.file,z,oi,ee!=null?ee:null,S.pick),Spicetify.showNotification("Syncify: setup loaded. Reloading\u2026"),Xt(K.manual,"share"),setTimeout(()=>window.location.reload(),1e3)}catch(u){I(!1),h(u instanceof et?`${u.message} ${au(u.reason)}`:u instanceof Error?u.message:String(u))}}}async function Je(){var u,m;X(null);try{let b=await $i();j(b.codes),Ne.current||(Ne.current=!0,ne(b.newHearts)),n.onCodeCount(b.codes.length),st(b.max),at(b.profile),n.onHandle((m=(u=b.profile)==null?void 0:u.handle)!=null?m:null),ce(b.suggestedHandle)}catch(b){En(b,X)}}function En(u,m){m(Kt(u,re)),u instanceof v&&u.code==="signed_out"&&n.onSignedOut()}async function dt(u){var b;let m=++Te.current;te({code:u}),vn((b=u==null?void 0:u.name)!=null?b:""),tn(A!=null?A:""),ie(null),pe(!1),sn(null),Oe(null),Ge(null);try{let ue=await ye(),Pn=await $s(V(ue),ue);if(m!==Te.current)return;ie(p({keys:ue},Pn)),Pn.leftOut.size>0&&pe(!0)}catch(ue){if(m!==Te.current)return;te(null),sn(ue instanceof Error?ue.message:String(ue))}}function ai(){Te.current+=1,te(null),ie(null)}async function ri(){if(!F||!L)return;Cn(!0),sn(null);let u=Ks(L.keys,Nn);try{let m=F.code?await Ws(F.code.code,Ee.trim(),u):await Ys(Ee.trim(),u,Ve?Ie.trim():void 0);Oe(C(p({},m),{outcome:F.code?"updated":"created"})),te(null),ie(null),await Je()}catch(m){if(m instanceof v&&m.code==="same_setup"&&m.share){Oe(C(p({},m.share),{leftOut:0,outcome:"existing"})),te(null),ie(null);return}En(m,sn),m instanceof v&&m.code==="publish_failed"&&(te(null),Je())}finally{Cn(!1)}}async function _n(u){ct(!0),X(null);try{await zs(u),Ge(null),(x==null?void 0:x.code)===u&&Oe(null),await Je()}catch(m){En(m,X)}finally{ct(!1)}}async function rn(u,m){await Xa(u)&&(lt(m),setTimeout(()=>lt(b=>b===m?null:b),2e3))}return e.createElement(e.Fragment,null,e.createElement("form",{className:"syncify-field syncify-share-load",noValidate:!0,onSubmit:u=>{u.preventDefault(),!y&&!k&&c.trim()&&an()}},e.createElement("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-input"},"Load a setup"),e.createElement("input",{className:"syncify-input syncify-share-input",id:"syncify-share-input",type:"text",placeholder:"Paste a code or a link",autoComplete:"off",spellCheck:!1,value:c,onChange:u=>d(u.currentTarget.value),disabled:k}),e.createElement("button",{className:"syncify-button secondary",type:"submit",disabled:y||k||!c.trim()},y?"Loading\u2026":"Preview")),g?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},g):null,S&&K?e.createElement("div",{className:"syncify-confirm"},e.createElement("span",{className:"syncify-share-title"},e.createElement("p",{className:"syncify-confirm-title"},"Load ",(Tn=S.file.name)!=null?Tn:be(S.file.code),"?"),S.file.creator?e.createElement("button",{className:"syncify-text-button",type:"button",title:"Open their profile",onClick:()=>window.open(Ki(S.file.creator),"_blank","noopener,noreferrer")},"by @",S.file.creator):null),e.createElement("div",{className:"syncify-share-modes",role:"radiogroup","aria-label":"How to load it"},iu.map(([u,m])=>e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":z===u,"data-selected":z===u?"true":"false",type:"button",key:u,onClick:()=>ze(u),disabled:k},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,m))))),e.createElement(Va,{preview:K,checks:H,off:O,fixed:Pe,switchLabel:"Load",allowed:Q,unapproved:!1,onAllow:(u,m)=>{let b=new Set(Q);m?b.add(u):b.delete(u),Y(b)},expanded:ve,onToggle:()=>J(!ve)}),n.marketplaceAvailable===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to load a setup."):e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>E(null),disabled:k},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{si()},disabled:k||Be||n.busy},k?"Applying\u2026":Be?"Checking\u2026":"Apply"))):null,N?e.createElement("section",{className:"syncify-share-part","aria-label":N.length>0?"Syncify picks":"Discover"},N.length>0?e.createElement("h5",{className:"syncify-change-group"},"Syncify picks"):null,e.createElement("ul",{className:"syncify-change-list syncify-share-codes"},N.map(u=>e.createElement("li",{className:"syncify-setting",key:u.code},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",{className:"syncify-account-email"},u.name),e.createElement("span",{className:"syncify-muted syncify-pick-detail"},e.createElement(cu,{pick:u}),Zt(u.extensions+u.themes+u.snippets,"item"))),e.createElement("button",{className:"syncify-text-button",type:"button",disabled:y||k,onClick:()=>{an(u.code)}},_===u.code?"Loading\u2026":"Preview"))),e.createElement("li",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Find more setups"),e.createElement("span",{className:"syncify-muted"},"People's setups on Discover")),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>window.open(`${D().webUrl.replace(/\/+$/,"")}/discover`,"_blank","noopener,noreferrer")},"Open Discover")))):null,s===void 0?null:s?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting syncify-share-part"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Share this setup"),e.createElement("span",{className:"syncify-muted"},$&&$.length>0&&re!==null?ru(re-$.length):"Get a code anyone can load")),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{dt(null)},disabled:F!==null||$===null||ge||n.marketplaceAvailable===!1,title:ge?"Delete a code to make another":void 0},"Share")),F?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},F.code?`Update ${be(F.code.code)} with this setup?`:"Share this setup?"),L?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-chips","aria-label":"What goes in"},e.createElement("span",{className:"syncify-chip"},Nn.length," going in"),L.leftOut.size?e.createElement("span",{className:"syncify-chip","data-change":"off"},L.leftOut.size," left out"):null),L.items.length?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":De,"aria-controls":"syncify-share-items",onClick:()=>pe(!De)},De?"Hide items":"Show items",e.createElement(bn,null)):null,De?e.createElement(su,{items:L.items,leftOut:L.leftOut}):null,e.createElement("div",{className:"syncify-share-fields"},e.createElement("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-name"},"Setup name"),e.createElement("input",{id:"syncify-share-name",className:"syncify-input",type:"text",placeholder:"Optional",maxLength:Ls,value:Ee,onChange:u=>vn(u.currentTarget.value),disabled:me}),Ve?e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-muted syncify-share-handle-note"},"It's your first time creating a share code. Pick a handle for your profile:"),e.createElement("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-handle"},"Your handle"),e.createElement("span",{className:"syncify-input syncify-handle-input"},e.createElement("span",{"aria-hidden":"true"},"@"),e.createElement("input",{id:"syncify-share-handle",type:"text",placeholder:"handle",autoComplete:"off",spellCheck:!1,maxLength:Bi,value:Ie,onChange:u=>tn(u.currentTarget.value.replace(/^@/,"")),disabled:me})),Ie&&In?e.createElement("span",{className:"syncify-share-handle-problem",role:"alert"},In):null):null)):e.createElement("p",{className:"syncify-muted"},"Checking your items\u2026"),e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:ai,disabled:me},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{ri()},disabled:!L||Nn.length===0||me||Ve&&le!==null},L?me?F.code?"Updating\u2026":"Creating\u2026":F.code?"Update":"Create code":"Checking\u2026"))):null,qe?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},qe):null,x?e.createElement("div",{className:"syncify-confirm"},e.createElement("span",{className:"syncify-manual-header"},e.createElement("span",{className:"syncify-confirm-title"},x.outcome==="existing"?"You already shared this setup":x.outcome==="updated"?"Code updated":"Your code is ready"),e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>Oe(null)},e.createElement(oo,null))),e.createElement("span",{className:"syncify-code syncify-share-code"},e.createElement("code",null,be(x.code)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{rn(be(x.code),"saved-code")}},_e==="saved-code"?"Copied":"Copy"),x.link?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{rn(x.link,"saved-link")}},_e==="saved-link"?"Copied":"Get link"):null),x.leftOut?e.createElement("p",{className:"syncify-muted"},x.leftOut===1?"1 snippet isn't in Marketplace's list anymore, so it was left out.":`${x.leftOut} snippets aren't in Marketplace's list anymore, so they were left out.`):null):null,on?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,on),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Je()}},"Try again"))):null,$&&$.length>0?e.createElement("section",{"aria-label":"Your codes"},e.createElement("h5",{className:"syncify-change-group syncify-codes-heading"},"Your codes",q>0?e.createElement("span",{className:"syncify-tag","data-tone":"new"},Zt(q,"new heart")):null),e.createElement("ul",{className:"syncify-change-list syncify-share-codes"},$.map(u=>{var m;return e.createElement("li",{className:"syncify-setting",key:u.code},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",{className:"syncify-account-email"},(m=u.name)!=null?m:be(u.code)),e.createElement("span",{className:"syncify-muted"},rt===u.code?u.posted?"Delete it? Its link stops working and its post comes off Discover.":"Delete it? Its link stops working.":[u.name?be(u.code):null,Zt(u.item_count,"item"),`Used by ${u.imports}`,u.hearts===null?null:Zt(u.hearts,"heart")].filter(Boolean).join(" \xB7 "))),e.createElement("span",{className:"syncify-account-actions"},rt===u.code?e.createElement(e.Fragment,null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Ge(null),disabled:R},"Cancel"),e.createElement("button",{className:"syncify-text-button","data-danger":"true",type:"button",onClick:()=>{_n(u.code)},disabled:R},R?"Deleting\u2026":"Delete")):e.createElement(e.Fragment,null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{dt(u)},disabled:F!==null||R},"Update"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{rn(be(u.code),`code:${u.code}`)}},_e===`code:${u.code}`?"Copied":"Copy"),u.link?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{rn(u.link,`link:${u.code}`)}},_e===`link:${u.code}`?"Copied":"Get link"):null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Ge(u.code),disabled:R},"Delete"))))}))):null):e.createElement("div",{className:"syncify-setting syncify-share-part"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Share this setup"),e.createElement("span",{className:"syncify-muted"},"Get a code anyone can load")),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:n.onSignIn},"Sign in to share")))}var Fa={in:{mark:"+",label:"Goes in"},out:{mark:"\u2212",label:"Left out"}};function su(n){let e=Spicetify.React;return e.createElement("div",{className:"syncify-changes",id:"syncify-share-items"},Ga.map(([t,i])=>{let o=n.items.filter(a=>a.type===t).sort((a,s)=>a.name.localeCompare(s.name));return o.length===0?null:e.createElement("section",{key:t,"aria-label":i},e.createElement("h5",{className:"syncify-change-group"},i),e.createElement("ul",{className:"syncify-change-list"},o.map(a=>{let s=n.leftOut.get(a.key),c=s?Fa.out:Fa.in;return e.createElement("li",{className:"syncify-change",key:a.key},e.createElement("span",{className:"syncify-mark","data-change":s?"removed":"added",role:"img","aria-label":c.label},c.mark),e.createElement("span",{className:"syncify-change-name"},a.name,a.repo?e.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",a.repo):null),s?e.createElement(Ja,{check:s}):null)})))}))}function au(n){return n instanceof ke?"Sign in to back up.":n instanceof Error?n.message:String(n)}async function Xa(n){var e;try{return await navigator.clipboard.writeText(n),!0}catch(t){let i=(e=Spicetify.Platform)==null?void 0:e.ClipboardAPI;return i!=null&&i.copy?(await i.copy(n),!0):!1}}function ru(n){return n<=0?"No codes left, delete one to make another":`${n} ${n===1?"code":"codes"} left`}var Rt=12;function cu(n){let e=Spicetify.React,{extensions:t,themes:i,snippets:o}=n.pick,a=[...Array(Math.min(t,Rt)).fill("extension"),...Array(Math.min(i,Rt)).fill("theme"),...Array(Math.min(o,Rt)).fill("snippet")].slice(0,Rt);return e.createElement("span",{className:"syncify-pips","aria-hidden":"true"},a.map((s,c)=>e.createElement("span",{className:"syncify-pip","data-kind":s,key:c})))}function Zt(n,e){return`${n} ${e}${n===1?"":"s"}`}var Qt=6,lu=600*1e3,uu=300,du=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function yu(n){let e=n.lastIndexOf("@");return e<1?n:`${n[0]}***${n.slice(e)}`}function so(n){let e=kn(new Date(n).toISOString());return e.startsWith("today")?e:`on ${e}`}function Ya(n){return`${Math.floor(n/60)}:${String(n%60).padStart(2,"0")}`}function no(n){let e=Spicetify.React,t=n.openSection===n.id,i=`syncify-section-${n.id}`;return e.createElement("section",{className:"syncify-accordion-section","aria-label":n.title},e.createElement("button",{className:"syncify-accordion-header",type:"button","aria-expanded":t,"aria-controls":i,onClick:()=>n.onToggle(t?null:n.id)},e.createElement("span",{className:"syncify-accordion-title"},n.title),!t&&n.status?e.createElement("span",{className:"syncify-accordion-status","data-kind":n.status.kind,role:"img","aria-label":n.status.label,title:n.status.label},n.status.kind==="ok"?e.createElement(pu,null):n.status.kind==="warning"?e.createElement(mu,null):n.status.kind==="pending"?e.createElement(Ra,null):n.status.kind==="count"?n.status.text:null):null,e.createElement(bn,null)),t?e.createElement("div",{className:"syncify-accordion-body",id:i},n.children):null)}function Wa(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-shield",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"}))}function ao(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-warning-icon",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M12 3 2 21h20z"}),n.createElement("path",{d:"M12 10v5"}),n.createElement("path",{d:"M12 18h.01"}))}function fu(n,e,t){return e?{kind:"warning",label:"Sign in to see your backups"}:n?t.kind==="secured"?{kind:"ok",label:"Signed in, backup secured"}:t.kind==="pending"?{kind:"pending",label:"Linking this Spotify account"}:t.kind==="open"||t.kind==="cancelled"?{kind:"warning",label:"Backup not secured yet"}:{kind:"ok",label:"Signed in"}:null}function pu(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"10"}),n.createElement("path",{d:"m9 12 2 2 4-4"}))}function mu(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"10"}),n.createElement("path",{d:"M12 8v4"}),n.createElement("path",{d:"M12 16h.01"}))}function bn(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-chevron",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"m9 6 6 6-6 6"}))}function gu(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-lock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("rect",{x:"5",y:"11",width:"14",height:"10",rx:"2"}),n.createElement("path",{d:"M8 11V7a4 4 0 0 1 8 0v4"}))}function Ra(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-clock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"9"}),n.createElement("path",{d:"M12 7v5l3 2"}))}function za(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-external",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M14 4h6v6"}),n.createElement("path",{d:"M20 4 10 14"}),n.createElement("path",{d:"M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"}))}function oo(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M18 6 6 18"}),n.createElement("path",{d:"m6 6 12 12"}))}var hu=600*1e3,Su=3,ku={exists:!1,payload:null,backups:[],safetyCopy:null,claim:null,unapproved:[],install:null,nudge:!1},bu=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function wu(n,e,t,i){var E;let o=new Set(e),a=new Set(t),s=t.filter(N=>!o.has(N)).length,c=e.filter(N=>!a.has(N)).length,d=(E=n.spicetify_config)!=null?E:null,y=!!(i&&!d),f=!y&&(i&&d?!ys(i,d):i!==d),g=[s?`${s} added`:null,c?`${c} removed`:null,f?"Spicetify config changed":null].filter(Boolean),h=kn(n.metadata.last_sync_datetime),S=g.length?`${g.join(", ")} since ${h}`:`Last backup ${h}`;return y?`${S} \xB7 Spicetify config not saved yet`:S}function qa(n){return n===1?"1 extension or theme":`${n} extensions and themes`}function kn(n){let e=new Date(n);if(Number.isNaN(e.getTime()))return n;let t=e.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),i=new Date,o=new Date(i);return o.setDate(i.getDate()-1),e.toDateString()===i.toDateString()?`today, ${t}`:e.toDateString()===o.toDateString()?`yesterday, ${t}`:`${e.toLocaleDateString(void 0,{month:"short",day:"numeric",year:e.getFullYear()===i.getFullYear()?void 0:"numeric"})}, ${t}`}function Za(n){var y;let e=Spicetify.React,t=e.useState,{claim:i}=n,[o,a]=t(!1),[s,c]=t(null);async function d(){a(!0),c(null);try{await Gt(fe()),Spicetify.showNotification("Syncify: claim sent for review"),n.onClose()}catch(f){c(f instanceof Error?f.message:String(f)),a(!1)}}return e.createElement("div",{className:"syncify-panel"},e.createElement("p",{className:"syncify-claim-notice"},(y=i.email)!=null?y:"Someone"," is claiming this backup."," ",n.signedIn?i.held?"Syncify is reviewing it.":`It goes through ${so(i.final_at)} unless you stop it.`:"If that's you, sign in to finish."),s?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},s):null,e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:n.onClose,disabled:o},"Close"),e.createElement("button",{className:n.signedIn?"syncify-button":"syncify-button secondary",type:"button",onClick:()=>{d()},disabled:o},"Not me"),n.signedIn?null:e.createElement("button",{className:"syncify-button",type:"button",onClick:n.onSignIn,disabled:o},"That's me, sign in")))}function Qa(n){let e=Spicetify.React;return e.createElement("div",{className:"syncify-panel"},e.createElement("p",{className:"syncify-claim-notice"},"Your backup isn't secured yet. Anyone who knows your Spotify username can restore it or claim it as theirs. Secure it with your email so only you can."),e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:n.onClose},"Not now"),e.createElement("button",{className:"syncify-button",type:"button",onClick:n.onSecure},"Secure")))}var ni="[Syncify]";function se(n,e){if(e===void 0){console.debug(ni,n);return}console.debug(ni,n,e)}function ot(n,e){if(e===void 0){console.warn(ni,n);return}console.warn(ni,n,e)}function xu(){var n;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((n=Spicetify==null?void 0:Spicetify.Topbar)!=null&&n.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var nr="syncify-styles";function vu(){if(document.getElementById(nr)){se("Another copy of Syncify is running; stopping this one");return}Cu();let n=fe();ra({topbarButton:Nu(),menuItem:Au()}),Ft(n.entryPoint),Wi(n.shortcut,ii),xa({onClaim:e=>{Du(e)},onInstall:Ou,onNudge:Uu}).catch(e=>{ot("Startup sync check failed",e)}),Ma().catch(e=>{ot("Restore check failed",e)})}function Cu(){let n=document.createElement("style");n.id=nr,n.textContent=Oo,document.head.appendChild(n)}function Nu(){let{extensionName:n}=D(),e=new Spicetify.Topbar.Button(n,gi,t=>{se("Topbar button clicked",ti(t)),ii()},!1,!0);return tr(e),_u(e),Lu(e),se("Topbar button registered",ti(e)),e}function tr(n){var t;let e=n;n.element.style.setProperty("-webkit-app-region","no-drag"),(t=e.button)==null||t.style.setProperty("-webkit-app-region","no-drag")}var er=".main-actionButtons",Iu=".Root__globalNav, .Root__top-bar",Eu=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function _u(n){if(typeof MutationObserver=="undefined")return;let e=!1,t=null,i=()=>{e=!1,a();let s=n.element,c=document.querySelector(er);!s||!c||c.contains(s)||(c.prepend(s),Tu(n),tr(n),se("Topbar button re-attached",ti(n)))},o=new MutationObserver(()=>{e||(e=!0,setTimeout(i,250))}),a=()=>{var d;if(t!=null&&t.isConnected)return;let s=document.querySelector(er),c=(d=s==null?void 0:s.closest(Iu))!=null?d:s==null?void 0:s.parentElement;if(o.disconnect(),t=c!=null?c:null,!c){o.observe(document.body,{childList:!0,subtree:!0});return}o.observe(c,{childList:!0,subtree:!0});for(let y=c.parentElement;y;y=y.parentElement)o.observe(y,{childList:!0})};i()}function Tu(n){let e=Pu(n);if(!e||e.className&&e.className!=="undefined")return;let t=Array.from(document.querySelectorAll(Eu)).find(i=>!n.element.contains(i));t!=null&&t.className&&(e.className=t.className)}function Pu(n){return n.button}function Au(){var n;if(typeof((n=Spicetify.Menu)==null?void 0:n.Item)!="function")return null;try{return new Spicetify.Menu.Item(D().extensionName,!1,()=>ii(),Mu())}catch(e){return ot("Failed to create profile menu item",e),null}}function Mu(){return gi.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function Lu(n){Object.assign(window,{SyncifyDebug:{button:n,element:n.element,openModal:ii,inspect:()=>ti(n),clickElement:()=>{var e;return(e=n.element)==null?void 0:e.click()},clickInnerButton:()=>{var e;return(e=n.button)==null?void 0:e.click()},clickCallback:()=>n.onClick(n)}})}function ti(n){var e,t,i,o,a;return{label:n.label,disabled:n.disabled,isRight:n.isRight,hasElement:!!n.element,elementConnected:(e=n.element)==null?void 0:e.isConnected,elementDisabled:(t=n.element)==null?void 0:t.disabled,elementAriaDisabled:(i=n.element)==null?void 0:i.getAttribute("aria-disabled"),elementClass:(o=n.element)==null?void 0:o.className,appRegion:n.element?getComputedStyle(n.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:n.button?getComputedStyle(n.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:n.element?getComputedStyle(n.element).pointerEvents:null,visibility:n.element?getComputedStyle(n.element).visibility:null,display:n.element?getComputedStyle(n.element).display:null,rect:(a=n.element)==null?void 0:a.getBoundingClientRect().toJSON()}}var U=null;function ii(){if(U!=null&&U.container.isConnected){se("Closing modal"),Spicetify.PopupModal.hide();return}se("Opening modal"),wn(Spicetify.React.createElement(ei))}async function Du(n){let e=await G().catch(()=>null);U!=null&&U.container.isConnected||(se("Opening claim notice"),wn(Spicetify.React.createElement(Za,{claim:n,signedIn:e!==null,onSignIn:()=>wn(Spicetify.React.createElement(ei,{section:"account"})),onClose:()=>Spicetify.PopupModal.hide()})))}function Ou(n){if(U!=null&&U.container.isConnected)return;se("Opening install notice");let e=()=>Spicetify.PopupModal.hide();wn(Spicetify.React.createElement("div",{className:"syncify-panel"},Spicetify.React.createElement(Ua,{install:n,onDone:e,onClose:e})))}function Uu(){U!=null&&U.container.isConnected||(se("Opening nudge notice"),Sa(),wn(Spicetify.React.createElement(Qa,{onSecure:()=>wn(Spicetify.React.createElement(ei,{section:"account",secure:!0})),onClose:()=>Spicetify.PopupModal.hide()})))}function wn(n){var t;(t=U==null?void 0:U.root)==null||t.unmount();let e=document.createElement("div");U={container:e,root:null};try{Spicetify.PopupModal.display({title:D().extensionName,content:e,isLarge:!1})}catch(i){throw ot("Failed to open PopupModal",i),i}Bu(e),Ku(e,n)}function Bu(n){requestAnimationFrame(()=>{let e=$u(n);e==null||e.classList.add("syncify-modal-shell");let t=e==null?void 0:e.querySelector(".main-trackCreditsModal-header h1");if(t&&!t.querySelector(".syncify-modal-mark")){let o=document.createElement("span");o.className="syncify-modal-mark",o.innerHTML=Uo,t.prepend(o)}let i=e==null?void 0:e.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');i&&(i.classList.add("syncify-modal-close"),i.setAttribute("aria-label",`Close ${D().extensionName}`),i.title="Close",i.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function $u(n){let e=n.parentElement;for(;e&&e!==document.body;){if(e.querySelector(".main-trackCreditsModal-header"))return e;e=e.parentElement}return n.closest('[class*="trackCreditsModal"]')}function Ku(n,e){try{if(typeof Spicetify.ReactDOM.createRoot=="function"){let t=Spicetify.ReactDOM.createRoot(n);t.render(e),(U==null?void 0:U.container)===n&&(U.root=t),se("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(e,n),se("Modal rendered",{renderer:"render"})}catch(t){throw ot("Failed to render modal",t),t}}Aa();(function n(){if(!xu()){setTimeout(n,100);return}se("Spicetify APIs ready"),vu()})();})();
