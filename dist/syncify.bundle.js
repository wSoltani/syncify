// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var er=Object.defineProperty,nr=Object.defineProperties;var tr=Object.getOwnPropertyDescriptors;var Co=Object.getOwnPropertySymbols;var ir=Object.prototype.hasOwnProperty,or=Object.prototype.propertyIsEnumerable;var No=(n,e,t)=>e in n?er(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,g=(n,e)=>{for(var t in e||(e={}))ir.call(e,t)&&No(n,t,e[t]);if(Co)for(var t of Co(e))or.call(e,t)&&No(n,t,e[t]);return n},N=(n,e)=>nr(n,tr(e));var Io=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var si=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var Eo=`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="-2.5 -2.5 37 37" aria-hidden="true" focusable="false"><defs><mask id="syncify-mark-gap" maskUnits="userSpaceOnUse" x="-2" y="-2" width="36" height="36"><rect x="-2" y="-2" width="36" height="36" fill="#fff"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></mask></defs><g mask="url(#syncify-mark-gap)"><g transform="rotate(15 16 16)"><path d="M16 16L16 7.4A8.6 8.6 0 0 1 24.6 16Z" fill="#6cd1d1" transform="translate(0.42 -0.42)"/><path d="M16 16L24.6 16A8.6 8.6 0 0 1 16 24.6Z" fill="#efa4c1" transform="translate(0.42 0.42)"/><path d="M16 16L16 24.6A8.6 8.6 0 0 1 7.4 16Z" fill="#d3c48c" transform="translate(-0.42 0.42)"/><path d="M16 16L7.4 16A8.6 8.6 0 0 1 16 7.4Z" fill="#88bcf2" transform="translate(-0.42 -0.42)"/></g></g><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 28.03A12.4 12.4 0 1 1 28.03 19"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91"/></g></svg>
`;var cr="syncify",ln="state";function ai(){let n;try{n=window.indexedDB}catch(e){return Promise.resolve(null)}return n?new Promise(e=>{let t;try{t=n.open(cr,1)}catch(i){e(null);return}t.onupgradeneeded=()=>{t.result.createObjectStore(ln)},t.onerror=()=>e(null),t.onblocked=()=>e(null),t.onsuccess=()=>e(t.result)}):Promise.resolve(null)}function ri(n,e){let t=ai().then(i=>new Promise((o,a)=>{if(!i){a(new Error("IndexedDB isn't available."));return}try{let s=i.transaction(ln,n),c=e(s.objectStore(ln));s.oncomplete=()=>{i.close(),o(c.result)},s.onerror=s.onabort=()=>{var u;i.close(),a((u=s.error)!=null?u:new Error("IndexedDB failed."))}}catch(s){i.close(),a(s)}}));return Promise.race([t,new Promise((i,o)=>setTimeout(()=>o(new Error("IndexedDB took too long.")),2e3))])}function un(n){return ri("readonly",e=>e.get(n))}async function dn(n,e){await ri("readwrite",t=>t.put(e,n))}async function _o(n){await ri("readwrite",e=>e.delete(n))}var Te={extensionName:"Syncify",version:"1.13.2",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com",shareUrl:"https://syncs.wsoltani.com"};function O(){var e,t,i,o,a,s,c,u,y;let n=window.SyncifyConfig;return{extensionName:(e=Be(n==null?void 0:n.extensionName))!=null?e:Te.extensionName,version:(t=To(n==null?void 0:n.version))!=null?t:Te.version,workerUrl:(i=Be(n==null?void 0:n.workerUrl))!=null?i:Te.workerUrl,webUrl:(o=Be(n==null?void 0:n.webUrl))!=null?o:Te.webUrl,githubUrl:(a=Be(n==null?void 0:n.githubUrl))!=null?a:Te.githubUrl,kofiUrl:(s=Be(n==null?void 0:n.kofiUrl))!=null?s:Te.kofiUrl,issueUrl:(c=Be(n==null?void 0:n.issueUrl))!=null?c:Te.issueUrl,releasesUrl:(u=Be(n==null?void 0:n.releasesUrl))!=null?u:Te.releasesUrl,shareUrl:(y=Be(n==null?void 0:n.shareUrl))!=null?y:Te.shareUrl}}function Be(n){return To(n)}function To(n){return typeof n=="string"&&n.trim()?n.trim():null}var lr="x-syncify-version",ur="x-syncify-install",dr="x-syncify-timezone",Po="install-id",Ao="syncify:install-id",yr=2e3,yt=null;async function Mo(){let n={[lr]:O().version,[ur]:(await ci()).id},e=mr();return e&&(n[dr]=e),n}function ci(){return yt!=null||(yt=fr().catch(()=>({id:ft(),inDatabase:!1}))),yt}async function fr(){let n=await Promise.race([pr(),new Promise(e=>setTimeout(()=>e(null),yr))]);if(n)return{id:n,inDatabase:!0};try{let e=window.localStorage.getItem(Ao);if(e&&Lo(e))return{id:e,inDatabase:!1};let t=ft();return window.localStorage.setItem(Ao,t),{id:t,inDatabase:!1}}catch(e){return{id:ft(),inDatabase:!1}}}async function pr(){let n=await ai();return n?new Promise(e=>{let t=null;try{let i=n.transaction(ln,"readwrite"),o=i.objectStore(ln),a=o.get(Po);a.onsuccess=()=>{if(typeof a.result=="string"&&Lo(a.result)){t=a.result;return}t=ft(),o.put(t,Po)},i.oncomplete=()=>{n.close(),e(t)},i.onerror=i.onabort=()=>{n.close(),e(null)}}catch(i){n.close(),e(null)}}):null}function ft(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let n=crypto.getRandomValues(new Uint8Array(16));n[6]=n[6]&15|64,n[8]=n[8]&63|128;let e=[...n].map(t=>t.toString(16).padStart(2,"0"));return[e.slice(0,4).join(""),e.slice(4,6).join(""),e.slice(6,8).join(""),e.slice(8,10).join(""),e.slice(10).join("")].join("-")}function Lo(n){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(n)}function mr(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(n){return null}}var gr="syncify-signature-v1",hr={name:"ECDSA",hash:"SHA-256"};function pt(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function mt(n){return li(new Uint8Array(await crypto.subtle.exportKey("raw",n)))}async function Pn(n,e,t,i,o){let a=await Sr(e,t,i,o),s=await crypto.subtle.sign(hr,n,a);return li(new Uint8Array(s))}async function Sr(n,e,t,i){let{pathname:o,search:a}=new URL(t),s=new TextEncoder,c=li(new Uint8Array(await crypto.subtle.digest("SHA-256",s.encode(i))));return s.encode([gr,n,e.toUpperCase(),o+a,c].join(`
`))}function li(n){let e="";for(let t=0;t<n.length;t++)e+=String.fromCharCode(n[t]);return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var Oo="device-key",ui="session",Do="salt",Re=null,An,Uo={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function yn(n){if(Re)return Re;let e=await un(Oo);return kr(e)?(Re=Promise.resolve(e),e):n?(Re=pt().then(async t=>(await dn(Oo,t),t)),Re.catch(()=>{Re=null}),Re):null}async function R(){let n=await un(ui);return br(n)?n:null}function di(n){return dn(ui,n)}async function Ve(){await _o(ui).catch(()=>{})}async function gt(){if(An===void 0){let n=await un(Do).catch(()=>{});An=typeof n=="string"?n:null}return An}async function ht(n){n!==An&&(An=n,await dn(Do,n).catch(()=>{}))}function St(){return Uo}function Bo(n){Uo=n}function kr(n){let e=n;return!!(e&&e.privateKey instanceof CryptoKey&&e.publicKey instanceof CryptoKey)}function br(n){let e=n;return!!(e&&typeof e.token=="string"&&e.token&&typeof e.email=="string")}var $o="install-key",fn=null;function Ko(){return fn!=null||(fn=wr()),fn.catch(()=>{fn=null}),fn.catch(()=>null)}async function wr(){if(!(await ci()).inDatabase)return null;let n=await un($o),e=vr(n)?n:await xr();return{privateKey:e.privateKey,publicKey:await mt(e.publicKey)}}async function xr(){let n=await pt();return await dn($o,n),n}function vr(n){let e=n;return!!(e&&e.privateKey instanceof CryptoKey&&e.publicKey instanceof CryptoKey)}var Cr="/api/auth/email-otp/send-verification-otp",Nr="/api/auth/sign-in/email-otp",Ir="/api/auth/get-session",Er="/api/auth/sign-out",_r="/api/auth/link",Tr="x-syncify-device-key",Pr="x-syncify-signature",Ho="x-syncify-salt",Ar="none",Mr={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again.",link_failed:"Couldn't open the website. Try again."},C=class extends Error{constructor(t,i=null,o=null){var a;super((a=Mr[t])!=null?a:"Sign-in failed. Try again.");this.code=t;this.retryAfter=i;this.share=o;this.name="AccountError"}};function Je(n){return n instanceof C?n.message:"Sign-in failed. Try again."}async function jo(n){let e=await Ln(Cr,{method:"POST",body:JSON.stringify({email:n,type:"sign-in"})});return typeof(e==null?void 0:e.resend_in)=="number"?e.resend_in:60}async function Fo(n,e){var a;let t=await yn(!0).catch(()=>{throw new C("no_device_key")}),i=await Ln(Nr,{method:"POST",body:JSON.stringify({email:n,otp:e}),keys:t,sendPublicKey:!0});if(typeof(i==null?void 0:i.token)!="string"||!i.token)throw new C("sign_in_failed");let o={token:i.token,email:typeof((a=i.user)==null?void 0:a.email)=="string"?i.user.email:n};return await di(o).catch(()=>{throw new C("no_device_key")}),yi=!0,o}var yi=!1;async function Yo(){var e;let n=await R();if(!n||yi)return n;try{let t=await kt(n,Ir,"GET");yi=!0;let i=(e=t==null?void 0:t.user)==null?void 0:e.email;if(typeof i!="string"||i===n.email)return n;let o=N(g({},n),{email:i});return await di(o).catch(()=>{}),o}catch(t){if(t instanceof C&&t.code==="signed_out")return null;throw t}}async function Wo(){let n=await R().catch(()=>null);n&&await kt(n,Er,"POST").catch(()=>{}),await Ve()}async function zo(){let n=await R();if(!n)throw new C("signed_out");let e=await kt(n,_r,"POST"),t=typeof(e==null?void 0:e.url)=="string"?e.url:"",i=new URL(O().webUrl).origin;if(!t.startsWith(`${i}/link#`))throw new C("link_failed");return t}async function Mn(n,e,t){let i=await R();if(!i)throw new C("signed_out");return kt(i,n,e,t)}async function qo(n,e,t){let i=await R().catch(()=>null),o=i?await yn(!1).catch(()=>null):null;await Ln(n,g({method:"POST",body:JSON.stringify(e),headers:t,keepalive:!0},i&&o?{token:i.token,keys:o}:{}))}async function kt(n,e,t,i){let o=await yn(!1);if(!o)throw await Ve(),new C("signed_out");return Ln(e,g({method:t,token:n.token,keys:o},i===void 0?{}:{body:JSON.stringify(i)}))}async function Ln(n,e,t=!1){var m,h,S;let i=`${O().webUrl.replace(/\/+$/,"")}${n}`,o=g({},e.headers);if(e.body!==void 0&&(o["content-type"]="application/json"),e.token&&(o.authorization=`Bearer ${e.token}`),e.keys){let E=(m=await gt())!=null?m:Ar;o[Ho]=E,o[Pr]=await Pn(e.keys.privateKey,E,e.method,i,(h=e.body)!=null?h:""),e.sendPublicKey&&(o[Tr]=await mt(e.keys.publicKey))}let a;try{a=await fetch(i,{method:e.method,headers:o,body:e.body,keepalive:e.keepalive})}catch(E){throw new C("offline")}let s=a.headers.get(Ho);s&&await ht(s);let c=await a.json().catch(()=>null);if(a.ok)return c;let u=typeof(c==null?void 0:c.code)=="string"?c.code:a.status===503?"unavailable":"failed";if(u==="stale_salt"&&e.keys&&!t)return Ln(n,e,!0);u==="signed_out"&&await Ve();let y=Number(a.headers.get("retry-after")),f=c==null?void 0:c.share;throw new C(u,Number.isFinite(y)&&y>0?y:(S=Lr[u])!=null?S:null,typeof(f==null?void 0:f.code)=="string"?{code:f.code,link:typeof f.link=="string"?f.link:null}:null)}var Lr={resend_wait:60,too_many_requests:60,send_failed:60};var Or="x-syncify-user-hash",Dr="x-syncify-identity",Ur="x-syncify-signature",Br="x-syncify-install-key",$r="x-syncify-install-signature",fi="x-syncify-salt",Kr="none",Hr="/restores",jr="/installs",Fr="hash",Go=3,On=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}},ke=class extends Error{constructor(t){super(t==="not_linked"?"Couldn't read that Spotify account's backups.":"Sign in to restore this backup.");this.code=t;this.name="LockedError"}},Xe=class extends Error{constructor(){super("This Spotify account doesn't accept backups from this install. Sign in to back up."),this.name="InstallRefusedError"}};async function Vo(n,e,t){var a;let i=await $e(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(t)});if(i.status===403&&((a=await i.json().catch(()=>null))==null?void 0:a.code)==="install_refused")throw new Xe;if(!i.ok)throw new Error(`Backup failed with HTTP ${i.status}.`);let o=await i.json().catch(()=>null);return{unchanged:(o==null?void 0:o.unchanged)===!0,unapproved:(o==null?void 0:o.quarantined)===!0}}async function Jo(n,e,t,i){let o=await $e(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({install:t,action:i})},jr);if(o.ok)return;let a=await o.json().catch(()=>null);if((a==null?void 0:a.code)!=="not_pending")throw new Error(`Couldn't answer with HTTP ${o.status}.`)}async function pi(n,e,t){var h,S,E,v;let i=await $e(n,e,{method:"GET"},Zo("/",t));if(i.status===404){let b=await i.json().catch(()=>null);return{exists:!1,payload:null,backups:[],safetyCopy:null,claim:Dn(b==null?void 0:b.claim),unapproved:[],install:Ro(b==null?void 0:b.install)}}if(!i.ok)throw new Error(`Restore failed with HTTP ${i.status}.`);let o=await i.json(),a=Dn(o.claim),s=Ro(o.install);delete o.claim,delete o.install;let c=[o,...(h=o.backup_history)!=null?h:[]];if(!c.every(b=>b.backup))return{exists:!0,payload:o,backups:c.slice(0,Go),safetyCopy:(S=c[Go])!=null?S:null,claim:a,unapproved:[],install:s};let u=c.filter(b=>{var P;return((P=b.backup)==null?void 0:P.kind)==="rolling"}),y=(E=c.find(b=>{var P;return((P=b.backup)==null?void 0:P.kind)==="anchor"}))!=null?E:null,f=c.filter(b=>{var P;return((P=b.backup)==null?void 0:P.kind)==="quarantined"}),m=(v=u[0])!=null?v:y;return m?u.length===0&&y?{exists:!0,payload:m,backups:[y],safetyCopy:null,claim:a,unapproved:f,install:s}:{exists:!0,payload:m,backups:u,safetyCopy:y,claim:a,unapproved:f,install:s}:{exists:!1,payload:null,backups:[],safetyCopy:null,claim:a,unapproved:f,install:s}}async function Xo(n,e,t,i){try{await $e(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:t}),keepalive:!0},Zo(Hr,i))}catch(o){}}async function $e(n,e,t,i="",o=!1){var v,b,P,M,de;let a=i?`${n.replace(/\/+$/,"")}${i}`:n,s=(v=t.method)!=null?v:"GET",c=await R().catch(()=>null),u=c?await yn(!1).catch(()=>null):null,y=await Ko(),f={},m=(b=await gt())!=null?b:Kr;c&&u&&(f.authorization=`Bearer ${c.token}`,f[fi]=m,f[Ur]=await Pn(u.privateKey,m,s,a,(P=t.body)!=null?P:"")),y&&(f[fi]=m,f[Br]=y.publicKey,f[$r]=await Pn(y.privateKey,m,s,a,(M=t.body)!=null?M:""));let h=await fetch(a,N(g({},t),{headers:g(N(g(g({},t.headers),await Mo()),{[Or]:e.hash,[Dr]:e.field}),f)})),S=h.headers.get(fi);if(S&&await ht(S),h.status===426)throw new On;if(h.status!==401)return h;let E=(de=await h.clone().json().catch(()=>null))==null?void 0:de.code;if(!o){if(E==="stale_salt"&&(c||y))return $e(n,e,t,i,!0);if(E==="signed_out"&&c)return await Ve(),$e(n,e,t,i,!0)}throw E==="claimed"||E==="not_owner"||E==="not_linked"?new ke(E):(E==="signed_out"&&await Ve(),new C(typeof E=="string"?E:"failed"))}function Zo(n,e){return e?`${n}?${Fr}=${encodeURIComponent(e)}`:n}function Ro(n){let e=n;if(!e||typeof e.trust!="string")return null;let t=Array.isArray(e.waiting)?e.waiting:[];return{trusted:e.trust!=="pending"&&e.trust!=="rejected",refused:e.trust==="rejected",waiting:t.flatMap(i=>{let o=i;return o&&typeof o.id=="string"&&typeof o.first_seen_at=="number"?[{id:o.id,device:typeof o.device=="string"?o.device:null,first_seen_at:o.first_seen_at}]:[]})}}function Dn(n){let e=n;return!e||typeof e.mine!="boolean"?null:e.status==="final"?{status:"final",mine:e.mine}:e.status!=="pending"||typeof e.final_at!="number"?null:g({status:"pending",mine:e.mine,email:typeof e.email=="string"?e.email:null,final_at:e.final_at,held:e.held===!0},e.waiting===!0?{waiting:!0}:{})}async function bt(n){let e=new TextEncoder().encode(n),t=await crypto.subtle.digest("SHA-256",e);return[...new Uint8Array(t)].map(i=>i.toString(16).padStart(2,"0")).join("")}function Un(n){return JSON.stringify(mi(n))}function mi(n){return Array.isArray(n)?n.map(mi):n&&typeof n=="object"?Object.keys(n).sort().reduce((e,t)=>(e[t]=mi(n[t]),e),{}):n}function Qo(){let n=navigator.userAgent;return/Windows/i.test(n)?"Windows":/Mac OS|Macintosh/i.test(n)?"macOS":/Linux/i.test(n)?"Linux":n}var Yr=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,Wr=100,zr="marketplace:installed-extensions",qr="marketplace:installed-themes",Gr="marketplace:theme-installed",Rr="marketplace:installed:",Vr="marketplace";function hi(n){return Spicetify.Config?Si(Spicetify.Config,n):null}function Si(n,e){var a;let t=Ke(n),i=new Set(Jr(e)),o=((a=e[Gr])==null?void 0:a.includes(Rr))===!0;return{current_theme:o?Vr:t.current_theme,color_scheme:o?"":t.color_scheme,extensions:t.extensions.filter(s=>!i.has(s)),custom_apps:t.custom_apps}}function Ke(n){let e=n&&typeof n=="object"?n:{};return{current_theme:gi(e.current_theme)?e.current_theme:"",color_scheme:gi(e.color_scheme)?e.color_scheme:"",extensions:es(e.extensions),custom_apps:es(e.custom_apps)}}function is(n,e){return Un(Ke(n))===Un(Ke(e))}function es(n){return Array.isArray(n)?[...new Set(n.filter(gi))].sort().slice(0,Wr):[]}function gi(n){return typeof n=="string"&&Yr.test(n)}function Jr(n){let e=ns(n[zr]).map(i=>{var a;let o=(a=ts(n[i]))==null?void 0:a.manifest;return o&&typeof o=="object"?o.main:void 0}),t=ns(n[qr]).flatMap(i=>{var a;let o=(a=ts(n[i]))==null?void 0:a.include;return Array.isArray(o)?o:[]});return[...e,...t].flatMap(i=>{let o=typeof i=="string"?i.split("/").pop():void 0;return o?[o]:[]})}function ns(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function ts(n){try{let e=n?JSON.parse(n):null;return e&&typeof e=="object"&&!Array.isArray(e)?e:null}catch(e){return null}}var Xr=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],Zr="marketplace:installed:",os=`${Zr}snippet:`,Qr="wsoltani/syncify",ec="marketplace",ss={added:0,removed:1,unchanged:2};function V(n){let e=new Map;for(let[t,i]of Xr)for(let o of oc(n[t]))e.has(o)||e.set(o,tc(o,i,n[o]));return[...e.values()]}function Bn(n,e,t,i){let o=new Set(n.map(u=>u.key)),a=new Map(t.map(u=>[u.key,u])),s=[...n.map(u=>{let y=a.get(u.key);return N(g({},u),{change:y?"unchanged":"added",isNew:!y||y.sources.join(" ")!==u.sources.join(" ")})}),...t.filter(u=>!o.has(u.key)).map(u=>N(g({},u),{change:$n(u,n)?"unchanged":"removed",isNew:!1}))].sort((u,y)=>ss[u.change]-ss[y.change]||u.name.localeCompare(y.name)),c={added:0,removed:0,unchanged:0};for(let u of s)c[u.change]+=1;return{items:s,counts:c,manual:nc(e,i)}}function $n(n,e){return n.type==="extension"&&xt(n)&&!e.some(xt)}function xt(n){var e;return((e=n.repo)==null?void 0:e.toLowerCase())===Qr}function nc(n,e){if(!n)return[];let t=Ke(n),i=Ke(e),o=[...t.extensions.filter(s=>!i.extensions.includes(s)).map(s=>({type:"extension",name:s})),...t.custom_apps.filter(s=>!i.custom_apps.includes(s)).map(s=>({type:"custom_app",name:s}))],a=t.current_theme;return a&&a!==ec&&(a!==i.current_theme||t.color_scheme!==i.color_scheme)&&o.push(g({type:"theme",name:a},t.color_scheme?{scheme:t.color_scheme}:{})),o}function tc(n,e,t){var u,y;let i=as(t),o=as(i==null?void 0:i.manifest),a=wt(i==null?void 0:i.user),s=wt(i==null?void 0:i.repo),c=(y=(u=wt(i==null?void 0:i.title))!=null?u:wt(o==null?void 0:o.name))!=null?y:n.startsWith(os)?n.slice(os.length):n.split("/").pop()||n;return{key:n,type:e,name:c,repo:e!=="snippet"&&a&&s?`${a}/${s}`:null,sources:ic(e,i),custom:e==="snippet"&&(i==null?void 0:i.custom)===!0}}function ic(n,e){return e?(n==="extension"?[e.extensionURL]:n==="theme"?[e.cssURL,e.schemesURL,...Array.isArray(e.include)?e.include:[]]:[]).filter(i=>typeof i=="string"&&i!==""):[]}function wt(n){return typeof n=="string"&&n.trim()?n.trim():null}function oc(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function as(n){let e=n;if(typeof n=="string")try{e=JSON.parse(n)}catch(t){return null}return e&&typeof e=="object"&&!Array.isArray(e)?e:null}var vt="spicetify-marketplace";var Kn="settings";async function rs(){let n=await us();if(n.kind!=="ok")return null;try{let e=await ds(n.db,"readonly",i=>i.getAll());if(!e)return null;let t={};for(let i of e)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(t[i.key]=i.value);return t}finally{n.db.close()}}async function cs(n,e=[]){let t=await us();if(t.kind==="unavailable")return"unavailable";let i=t.kind==="ok"?t.db:await sc();if(!i)return"failed";try{return await ds(i,"readwrite",a=>{let s;for(let[c,u]of Object.entries(n))s=a.put({key:c,value:u});for(let c of e)s=a.delete(c);return s})===null?"failed":"written"}finally{i.close()}}function ls(){var n;try{return(n=window.indexedDB)!=null?n:null}catch(e){return null}}async function us(){let n=ls();return n?await ac(n)?{kind:"missing"}:new Promise(e=>{let t=!1,i=n.open(vt);i.onupgradeneeded=()=>{t=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),e({kind:"unavailable"})},i.onblocked=()=>e({kind:"unavailable"}),i.onsuccess=()=>{let o=i.result;if(t){o.close(),rc(n).then(()=>e({kind:"missing"}));return}if(!o.objectStoreNames.contains(Kn)){o.close(),e({kind:"unavailable"});return}e({kind:"ok",db:o})}}):{kind:"unavailable"}}function sc(){let n=ls();return n?new Promise(e=>{let t=n.open(vt,1);t.onupgradeneeded=()=>{let i=t.result;i.objectStoreNames.contains(Kn)||i.createObjectStore(Kn,{keyPath:"key"})},t.onerror=()=>{console.warn("Syncify could not create Marketplace storage",t.error),e(null)},t.onblocked=()=>e(null),t.onsuccess=()=>e(t.result)}):Promise.resolve(null)}async function ac(n){if(typeof n.databases!="function")return!1;try{return!(await n.databases()).some(t=>t.name===vt)}catch(e){return!1}}function rc(n){return new Promise(e=>{let t=n.deleteDatabase(vt);t.onsuccess=()=>e(),t.onerror=()=>e(),t.onblocked=()=>e()})}function ds(n,e,t){return new Promise(i=>{let o;try{o=n.transaction(Kn,e)}catch(y){console.warn("Syncify could not open a Marketplace transaction",y),i(null);return}let a,s=!1,c=y=>{s||(s=!0,i(y))};o.oncomplete=()=>c(a),o.onerror=()=>{console.warn("Syncify Marketplace transaction failed",o.error),c(null)},o.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",o.error),c(null)};let u;try{u=t(o.objectStore(Kn))}catch(y){console.warn("Syncify Marketplace request could not be issued",y),c(null);return}u&&(u.onsuccess=()=>{a=u.result},u.onerror=()=>{console.warn("Syncify Marketplace request failed",u.error),c(null)})})}var ki="marketplace:",Nt=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function ce(){let n=gc(),e=await rs();if(e)for(let[t,i]of Object.entries(e))t.startsWith(ki)&&(n[t]=i);return n}var lc=new Set(["marketplace:active-tab","marketplace:sort"]),bi="marketplace:installed:",Ct="marketplace:theme-installed",uc=["stars","tags","lastUpdated","created"];async function It(n,e){let t={};for(let[i,o]of Object.entries(n))lc.has(i)||(t[i]=i.startsWith(bi)?dc(o):o);return e&&(t.spicetify_config=Ke(e)),bt(Un(t))}function dc(n){try{let e=JSON.parse(n);if(!e||typeof e!="object"||Array.isArray(e))return n;for(let t of uc)delete e[t];return e}catch(e){return n}}async function Et(){let n=await ce(),e=hi(n);return{keyCount:Object.keys(n).length,hash:await It(n,e),installedItemCount:pc(n),installedItems:_t(n),items:V(n),spicetifyConfig:e,marketplaceAvailable:mc(n),activeTheme:Hn(n[Ct])}}function Hn(n){if(!n)return null;if(n.startsWith(bi))return n;try{let e=JSON.parse(n);return typeof e=="string"?e:null}catch(e){return null}}async function ys(){let n=await ce(),e=hi(n);return g({schema_version:2,metadata:{last_sync_datetime:new Date().toISOString(),device_info:Qo(),marketplace_key_count:Object.keys(n).length},payload_hash:await It(n,e),marketplace_data:{keys:n}},e?{spicetify_config:e}:{})}async function fs(n,e=[]){var a,s;let t={},i=(s=(a=n.marketplace_data)==null?void 0:a.keys)!=null?s:{};for(let[c,u]of Object.entries(i))c.startsWith(ki)&&(t[c]=u);if(Object.keys(t).length===0)return 0;await yc(t),e.length>0&&await fc(t,e);let o=xi(await ce(),t);return await wi(t,o),Object.keys(t).length}async function wi(n,e=[]){for(let[i,o]of Object.entries(n))window.localStorage.setItem(i,o);for(let i of e)window.localStorage.removeItem(i);if(await cs(n,e)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try again.")}function xi(n,e){let t=new Set(Nt.flatMap(s=>{var c;return Tt((c=e[s])!=null?c:n[s]).map(String)})),i=_t(n).filter(s=>s.startsWith(bi)&&!t.has(s)),o=i.filter(s=>n[s]!==void 0&&e[s]===void 0),a=n[Ct];return a&&e[Ct]===void 0&&i.some(s=>a.includes(s))&&o.push(Ct),o}async function yc(n){let e=await ce(),t=V(n),i=V(e).filter(s=>$n(s,t));if(i.length===0)return;let o="marketplace:installed-extensions",a=Tt(n[o]).map(String);for(let s of i)a.includes(s.key)||a.push(s.key),n[s.key]=e[s.key];n[o]=JSON.stringify(a)}async function fc(n,e){let t=await ce(),i=_t(t);for(let o of Nt){if(n[o]===void 0)continue;let a=Tt(n[o]).map(String).filter(s=>!e.includes(s)||i.includes(s));n[o]=JSON.stringify(a)}for(let o of e)t[o]!==void 0?n[o]=t[o]:delete n[o]}function pc(n){return _t(n).length}function _t(n){return Nt.flatMap(e=>Tt(n[e]).map(String))}function mc(n){return!!(window.Marketplace||Nt.some(t=>n[t]!==void 0)||n["marketplace:tabs"]!==void 0)}function ps(n,e){return e===0?!1:n===0?!0:n<Math.max(2,Math.floor(e*.5))}function gc(){let n={};for(let e=0;e<window.localStorage.length;e+=1){let t=window.localStorage.key(e);if(!(t!=null&&t.startsWith(ki)))continue;let i=window.localStorage.getItem(t);i!==null&&(n[t]=i)}return n}function Tt(n){if(!n)return[];try{let e=JSON.parse(n);return Array.isArray(e)?e:[]}catch(e){return[]}}var hc="raw.githubusercontent.com",Sc="cdn.jsdelivr.net",ms=".github.io";function Ci(n){var t;if(n.protocol!=="https:")return null;let e=n.pathname.split("/").filter(Boolean);if(n.host===hc)return vi(e[0],e[1]);if(n.host===Sc)return e[0]==="gh"?vi(e[1],(t=e[2])==null?void 0:t.split("@")[0]):null;if(n.host.endsWith(ms)){let i=n.host.slice(0,-ms.length);return i.includes(".")?null:vi(i,e.length>1?e[0]:n.host)}return null}function vi(n,e){return n&&e?`${n}/${e}`:null}var kc={extension:"spicetify-extensions",theme:"spicetify-themes"},bc="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",wc="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",xc="https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/",vc="https://api.github.com/repos",Cc=5e3,Nc=20,gs="syncify:repo-topics",hs=10080*60*1e3,Ic=200;function He(n){return(n==null?void 0:n.kind)==="host"||(n==null?void 0:n.kind)==="repo"||(n==null?void 0:n.kind)==="blocked"||(n==null?void 0:n.kind)==="catalog"}function Yn(n){let e=new Map;for(let t of n){if(t.change==="removed")continue;if(t.custom){e.set(t.key,{kind:"custom"});continue}let i=Ec(t);i&&e.set(t.key,i)}return e}async function Wn(n,e){let t=new Map,i=n.filter(s=>s.change!=="removed"&&s.isNew&&!e.has(s.key));if(i.length===0)return t;let o=i.filter(s=>s.type==="snippet"),a=i.filter(s=>s.type!=="snippet");if(o.length>0){let s=await Ni();for(let c of o)s?Pt(s,c.name)||t.set(c.key,{kind:"catalog"}):t.set(c.key,{kind:"unchecked"})}if(a.length>0){let s=await Pc(),c=Lc(),u=0;await Promise.all(a.map(async y=>{let f=_c(y),m=kc[y.type];if(!f||!m)return;if(s===null){t.set(y.key,{kind:"unchecked"});return}if(Tc(f,s)){t.set(y.key,{kind:"blocked"});return}let h=Mc(c,f);h===void 0&&u<Nc&&(u+=1,h=await Ac(f),h!==void 0&&(c[f.toLowerCase()]={topics:h,at:Date.now()})),h===void 0?t.set(y.key,{kind:"unchecked"}):(h===null||!h.includes(m))&&t.set(y.key,{kind:"catalog"})})),Oc(c)}return t}function Ec(n){let e=null;for(let t of n.sources){let i;try{i=new URL(t)}catch(a){return{kind:"host",host:t.slice(0,40)}}let o=Ci(i);if(!o)return{kind:"host",host:i.host};n.repo&&o.toLowerCase()!==n.repo.toLowerCase()&&(e!=null||(e=o))}return e?{kind:"repo",repo:e}:null}function _c(n){for(let e of n.sources)try{let t=Ci(new URL(e));if(t)return t}catch(t){}return n.repo}function Tc(n,e){let t=`https://github.com/${n}`.toLowerCase();return e.some(i=>{let o=i.toLowerCase();if(!o.includes("*"))return o===t;let a=o.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${a}$`).test(t)})}function Ss(n){return n.replace(/\n/g,"").trim().toLowerCase()}function Pt(n,e){return n.get(Ss(e))}var jn=null,Fn=null;function Pc(){return jn!=null||(jn=ks(bc).then(n=>{let e=n==null?void 0:n.repos;return Array.isArray(e)?e.filter(t=>typeof t=="string"&&!t.startsWith("//")):(jn=null,null)})),jn}function Ni(){return Fn!=null||(Fn=ks(wc).then(n=>{if(!Array.isArray(n))return Fn=null,null;let e=new Map;for(let t of n){if(typeof(t==null?void 0:t.title)!="string"||typeof t.code!="string")continue;let i=typeof t.preview=="string"?t.preview:null;e.set(Ss(t.title),g({title:t.title,code:t.code,description:typeof t.description=="string"?t.description:""},i?{imageURL:i.startsWith("http")?i:`${xc}${i}`}:{}))}return e})),Fn}async function Ac(n){let e=await bs(`${vc}/${n}`);if((e==null?void 0:e.status)===404)return null;if(!(e!=null&&e.ok))return;let t=await e.json().catch(()=>null);return Array.isArray(t==null?void 0:t.topics)?t.topics.filter(i=>typeof i=="string"):void 0}async function ks(n){let e=await bs(n);return e!=null&&e.ok?e.json().catch(()=>null):null}async function bs(n){let e=typeof AbortController=="function"?new AbortController:null,t=setTimeout(()=>e==null?void 0:e.abort(),Cc);try{return await fetch(n,{signal:e==null?void 0:e.signal})}catch(i){return null}finally{clearTimeout(t)}}function Mc(n,e){let t=n[e.toLowerCase()];return t&&Date.now()-t.at<hs?t.topics:void 0}function Lc(){var n;try{let e=JSON.parse((n=localStorage.getItem(gs))!=null?n:"{}");return e&&typeof e=="object"?e:{}}catch(e){return{}}}function Oc(n){let e=Date.now(),t=Object.entries(n).filter(([,i])=>e-i.at<hs).sort(([,i],[,o])=>o.at-i.at).slice(0,Ic);try{localStorage.setItem(gs,JSON.stringify(Object.fromEntries(t)))}catch(i){}}var Dc=/^[0-9A-HJKMNP-TV-Z]{6}$/,Uc=6,Bc="SYN-",Cs=60,Ii=20,Ns=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],$c="marketplace:installed:",fd=`${$c}snippet:`,Ze="marketplace:theme-installed",ws="marketplace",xs={added:0,removed:1,unchanged:2},Kc=new RegExp(`^[a-z0-9][a-z0-9_-]{1,${Ii-2}}[a-z0-9]$`);function Is(n){let e=n.trim().replace(/^@/,"").toLowerCase();return/[^a-z0-9_-]/.test(e)?"Only letters, digits, _ and -":e.length<3?"At least 3 characters":!/^[a-z0-9]/.test(e)||!/[a-z0-9]$/.test(e)?"Start and end with a letter or digit":null}function je(n){return`${Bc}${n}`}function Es(n){let e=n.trim();if(e.length>200)return null;if(e.includes("/")){let i=e.split(/[?#]/)[0].replace(/\/+$/,"");e=i.slice(i.lastIndexOf("/")+1).replace(/\.json$/i,"")}e=e.toUpperCase().replace(/[\s-]/g,""),e.length===Uc+3&&e.startsWith("SYN")&&(e=e.slice(3));let t=e.replace(/O/g,"0").replace(/[IL]/g,"1");return Dc.test(t)?t:null}function _s(n){let e=n;return!e||typeof e.code!="string"||!e.keys||typeof e.keys!="object"||!Object.values(e.keys).every(t=>typeof t=="string")?null:{code:e.code,name:typeof e.name=="string"&&e.name?e.name:null,creator:typeof e.creator=="string"&&Kc.test(e.creator)?e.creator:null,updated_at:typeof e.updated_at=="number"?e.updated_at:0,keys:e.keys}}async function Ts(n,e){let t=n.filter(s=>!xt(s)).map(s=>N(g({},s),{change:"added",isNew:!0})),i=Yn(t);for(let s of t)!i.has(s.key)&&!Hc(s,e[s.key])&&i.set(s.key,{kind:"catalog"});let o=await Wn(t,i),a=new Map;for(let[s,c]of[...o,...i])c.kind!=="unchecked"&&a.set(s,c);return{items:t,leftOut:a}}function Hc(n,e){if(n.type==="snippet")return!0;if(!n.repo)return!1;let t=Yc(e);return n.type==="extension"?typeof(t==null?void 0:t.extensionURL)=="string"&&t.extensionURL!=="":typeof(t==null?void 0:t.cssURL)=="string"&&t.cssURL!==""}function Ps(n,e){let t={};for(let[o,a]of Ns){let s=e.filter(c=>c.type===a&&n[c.key]!==void 0).map(c=>c.key);t[o]=JSON.stringify(s);for(let c of s)t[c]=n[c]}let i=Hn(n[Ze]);return i&&e.some(o=>o.key===i)&&(t[Ze]=n[Ze]),t}function As(n,e,t,i,o,a){let s=a==="replace"?Bn(e,void 0,t,i):jc(e,t),c=Hn(n.keys[Ze]),u=c!==null&&e.some(f=>f.key===c)&&i!==null&&i.current_theme!==ws,y=c!==null&&c!==o?e.find(f=>f.key===c):void 0;return g(N(g({},s),{manual:u?[{type:"theme",name:ws}]:[]}),y?{theme:{key:y.key,name:y.name}}:{})}function jc(n,e){let t=new Set(e.map(s=>s.key)),i=new Set(n.map(s=>s.key)),o=[...n.map(s=>t.has(s.key)?N(g({},s),{change:"unchanged",isNew:!1}):N(g({},s),{change:"added",isNew:!0})),...e.filter(s=>!i.has(s.key)).map(s=>N(g({},s),{change:"unchanged",isNew:!1}))].sort((s,c)=>xs[s.change]-xs[c.change]||s.name.localeCompare(c.name)),a={added:0,removed:0,unchanged:0};for(let s of o)a[s.change]+=1;return{items:o,counts:a,manual:[]}}function Ms(n,e){return new Set(n.items.filter(t=>t.type==="snippet"&&t.change==="added"&&(!e||!Pt(e,t.name))).map(t=>t.key))}async function Ls(n,e,t,i){let o=await ce(),a=V(o),s=V(n.keys),c={};for(let[m,h]of Ns){let S=vs(o[m]),v=[...e==="add"?S:S.filter(b=>t.includes(b)||a.some(P=>P.key===b&&$n(P,s)))];for(let b of s){if(b.type!==h||t.includes(b.key))continue;let P=S.includes(b.key);if(e==="add"&&P)continue;let M=h==="snippet"?Fc(b,i,o[b.key]):n.keys[b.key];M!==void 0&&(c[b.key]=M,v.includes(b.key)||v.push(b.key))}c[m]=JSON.stringify(v)}let u=Hn(n.keys[Ze]),y=vs(c["marketplace:installed-themes"]);u&&y.includes(u)&&!t.includes(u)&&(c[Ze]=n.keys[Ze]);let f=xi(o,c);return await wi(c,f),Object.keys(c).length+f.length}function Fc(n,e,t){let i=e?Pt(e,n.name):void 0;return i?JSON.stringify(g({code:i.code,title:i.title,description:i.description},i.imageURL?{imageURL:i.imageURL}:{})):t}function vs(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function Yc(n){try{let e=n?JSON.parse(n):null;return e&&typeof e=="object"&&!Array.isArray(e)?e:null}catch(e){return null}}var zn="/api/shares",Wc=`${zn}/update`,zc=`${zn}/delete`,qc=`${zn}/import`,Gc="x-syncify-user-hash",Rc={no_code:"This code doesn't exist.",too_many_codes:"You can't make more share codes. Delete one to make another.",daily_limit:"Too many changes to share codes today. Try again tomorrow.",too_large:"This setup is too big to share.",invalid_name:"Names can be up to 60 characters.",empty:"There's nothing to share yet. Install something from Marketplace first.",invalid_items:"Syncify couldn't read some items. Reload Spotify and try again.",source:"Some items don't load from GitHub. Reload Spotify and try again.",blocked:"Some items are on Marketplace's block list. Reload Spotify and try again.",custom_snippet:"Custom snippets can't be shared. Reload Spotify and try again.",unchecked:"Couldn't check Marketplace's block list. Try again in a minute.",publish_failed:"Couldn't publish the code. Press Update on it to try again.",delete_failed:"Couldn't delete the code. Try again.",same_setup:"You already shared this setup.",invalid_handle:"Handles are 3 to 20 letters, digits, _ or -, starting and ending with a letter or digit.",reserved_handle:"That handle isn't allowed. Pick another.",handle_taken:"That handle is taken. Pick another.",unavailable:"Share codes aren't available yet."},Vc=new Set(["offline","signed_out","invalid_signature","stale_salt","no_device_key","too_many_requests"]);function At(n,e=null){var t;return n instanceof C&&Vc.has(n.code)?Je(n):n instanceof C&&n.code==="too_many_codes"&&e!==null?`You have ${e} share codes already. Delete one to make another.`:(t=n instanceof C?Rc[n.code]:void 0)!=null?t:"Something went wrong. Try again."}async function Ei(){var e;let n=await Mn(zn,"GET");return{codes:Array.isArray(n==null?void 0:n.codes)?n.codes.flatMap(t=>{let i=Jc(t);return i?[i]:[]}):[],max:typeof(n==null?void 0:n.max)=="number"?n.max:null,profile:typeof((e=n==null?void 0:n.profile)==null?void 0:e.handle)=="string"?{handle:n.profile.handle,link:typeof n.profile.link=="string"?n.profile.link:null}:null,suggestedHandle:typeof(n==null?void 0:n.suggested_handle)=="string"?n.suggested_handle:null}}async function Os(n,e,t){return Ks(await Mn(zn,"POST",g({name:n,keys:e},t===void 0?{}:{handle:t})))}function _i(n){return`${O().shareUrl.replace(/\/+$/,"")}/@${n}`}async function Ds(n,e,t){return Ks(await Mn(Wc,"POST",{code:n,name:e,keys:t}))}async function Us(n){try{await Mn(zc,"POST",{code:n})}catch(e){if(e instanceof C&&e.code==="no_code")return;throw e}}async function Bs(n){let e=O().shareUrl.replace(/\/+$/,""),t;try{t=await fetch(`${e}/${n}.json`)}catch(o){throw new C("offline")}if(t.status===404||t.status===403)throw new C("no_code");if(!t.ok)throw new C("failed");let i=_s(await t.json().catch(()=>null));if(!i||i.code!==n)throw new C("no_code");return i}async function $s(n,e){try{await qo(qc,{code:n},{[Gc]:e.hash})}catch(t){}}function Jc(n){let e=n;return!e||typeof e.code!="string"?null:{code:e.code,name:typeof e.name=="string"&&e.name?e.name:null,link:typeof e.link=="string"?e.link:null,item_count:typeof e.item_count=="number"?e.item_count:0,imports:typeof e.imports=="number"?e.imports:0,created_at:typeof e.created_at=="number"?e.created_at:0,updated_at:typeof e.updated_at=="number"?e.updated_at:0}}function Ks(n){let e=n;if(typeof(e==null?void 0:e.code)!="string")throw new C("failed");return{code:e.code,link:typeof e.link=="string"?e.link:null,leftOut:Array.isArray(e.left_out)?e.left_out.length:0}}var Hs="/claims",Xc="/claims/cancel",Zc={no_backup:"Back up first, then secure your backup.",unsupported_identity:"This Spotify account can't be secured.",too_many_accounts:"Your account already has 10 Spotify accounts linked.",offline:"Couldn't reach Syncify. Check your connection and try again."},Fe=class extends Error{constructor(t){var i;super((i=Zc[t])!=null?i:"Couldn't secure your backup. Try again.");this.code=t;this.name="ClaimError"}};async function js(n,e){let t=await Ti(n,e,"GET",Hs);if(!t.ok)throw new Fe(await Pi(t));let i=await t.json().catch(()=>null);return{claim:Dn(i==null?void 0:i.claim),accounts:Array.isArray(i==null?void 0:i.accounts)?i.accounts.filter(Qc):null}}async function Fs(n,e){let t=await Ti(n,e,"POST",Hs);if(!t.ok)throw new Fe(await Pi(t));let i=await t.json().catch(()=>null);return Dn(i==null?void 0:i.claim)}async function Ys(n,e){let t=await Ti(n,e,"POST",Xc);if(!t.ok&&t.status!==404)throw new Fe(await Pi(t))}async function Ti(n,e,t,i){try{return await $e(n,e,{method:t},i)}catch(o){throw o instanceof TypeError?new Fe("offline"):o}}async function Pi(n){let e=await n.json().catch(()=>null);return typeof(e==null?void 0:e.code)=="string"?e.code:"failed"}function Qc(n){let e=n;return!!(e&&typeof e.hash=="string"&&(e.status==="pending"||e.status==="final"||e.status==="cancelled"))}var mn={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},el=/^([a-z0-9]|f([1-9]|1[0-2]))$/,nl=250,tl=40,Ai=null,Mt=null,pn=null;function Ws(){return/mac/i.test(navigator.platform||navigator.userAgent)}function zs(n){if(n===null)return null;if(!n||typeof n!="object")return mn;let e=n;return typeof e.key!="string"||!el.test(e.key)?mn:{key:e.key,ctrl:!!e.ctrl,alt:!!e.alt,shift:!!e.shift,meta:!!e.meta}}function qn(n){if(!n)return"Off";let e=n.key.toUpperCase();return Ws()?[n.ctrl?"\u2318":"",n.alt?"\u2325":"",n.shift?"\u21E7":"",e].join(""):[n.ctrl&&"Ctrl",n.meta&&"Win",n.alt&&"Alt",n.shift&&"Shift",e].filter(Boolean).join("+")}function qs(n){if(n.key==="Escape")return{kind:"cancel"};let e=il(n.code);if(!e)return{kind:"ignore"};let t=Ws();if(t&&n.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:e,ctrl:t?n.metaKey:n.ctrlKey,alt:n.altKey,shift:n.shiftKey,meta:t?!1:n.metaKey},o=e.startsWith("f")&&e.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!o?{kind:"error",message:`Include ${t?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function il(n){var t,i;let e=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(n);return e?((i=(t=e[1])!=null?t:e[2])!=null?i:e[3]).toLowerCase():null}function Gs(n){var e;if(pn&&ol(pn,n))return!1;try{let t=Spicetify.Mousetrap,i=(e=t.trigger)==null?void 0:e.call(t)._directMap;if(!i)return!1;let o=Mi(n);return Object.keys(i).some(a=>a.startsWith(`${o}:`))}catch(t){return!1}}function Li(n,e,t=0){if(Ai=e,Mt=n,!Rs()){if(t>=tl){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>Li(Mt,e,t+1),nl);return}Oi(Mt)}function Oi(n){if(Mt=n,!Rs()||!Ai)return;let e=Ai;try{if(pn&&Spicetify.Keyboard._deregisterShortcut(pn),pn=null,!n)return;Spicetify.Keyboard.registerShortcut(n,t=>{t.preventDefault(),e()}),pn=n,console.debug("[Syncify]","Keyboard shortcut registered",qn(n))}catch(t){console.warn("[Syncify]","Failed to register keyboard shortcut",t)}}function Rs(){var n;return typeof((n=Spicetify.Keyboard)==null?void 0:n.registerShortcut)=="function"}function Mi(n){return[n.ctrl&&"mod",n.meta&&"meta",n.alt&&"alt",n.shift&&"shift",n.key].filter(Boolean).join("+")}function ol(n,e){return Mi(n)===Mi(e)}var Di="both",sl=["both","topbar","menu"],Gn=null,Rn=null,Lt=!1;function Vs(n){return sl.includes(n)?n:Di}function Js(){var n;return typeof((n=Spicetify.Menu)==null?void 0:n.Item)=="function"}function Xs(n){Gn=n.topbarButton,Rn=n.menuItem}function Ot(n){let e=n!=="menu"||!Rn,t=n!=="topbar";if(Gn!=null&&Gn.element&&(Gn.element.style.display=e?"":"none"),!!Rn)try{t&&!Lt?(Rn.register(),Lt=!0):!t&&Lt&&(Rn.deregister(),Lt=!1)}catch(i){console.warn("[Syncify]","Failed to update profile menu item",i)}}var Ut="syncify:config",Dt={workerUrl:O().workerUrl,autoBackupEnabled:!1,shortcut:mn,entryPoint:Di};function le(){var t,i;let n=O(),e=(i=(t=Spicetify.LocalStorage)==null?void 0:t.get(Ut))!=null?i:window.localStorage.getItem(Ut);if(!e)return N(g({},Dt),{workerUrl:n.workerUrl});try{let o=JSON.parse(e);return{workerUrl:n.workerUrl,autoBackupEnabled:o.autoBackupEnabled===void 0?Dt.autoBackupEnabled:!!o.autoBackupEnabled,shortcut:o.shortcut===void 0?Dt.shortcut:zs(o.shortcut),entryPoint:Vs(o.entryPoint)}}catch(o){return N(g({},Dt),{workerUrl:n.workerUrl})}}function Bt(n){var t;let e=JSON.stringify({workerUrl:O().workerUrl,autoBackupEnabled:n.autoBackupEnabled,shortcut:n.shortcut,entryPoint:n.entryPoint});if((t=Spicetify.LocalStorage)!=null&&t.set){Spicetify.LocalStorage.set(Ut,e);return}window.localStorage.setItem(Ut,e)}function Vn(n){return typeof n.workerUrl=="string"&&n.workerUrl.length>0}var al=["username","canonicalUsername","id","uri","displayName"];async function be(){let{value:n,field:e}=await rl();return{hash:await bt(n),field:e}}async function rl(){var o;let n=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(n!=null&&n.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let e=await n.getUser(),t=al.find(a=>(e==null?void 0:e[a])!=null),i=t?e[t]:void 0;if(!t||!i)throw new Error("Unable to resolve the active Spotify user.");return{value:i,field:t}}async function Xn(n){if(!Vn(n))throw new Error("Syncify backup service is not configured.");let[e,t]=await Promise.all([be(),ys()]);if(t.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:i,unapproved:o}=await Vo(n.workerUrl,e,t);return{payload:t,unchanged:i,unapproved:o}}async function gn(n,e){var c;if(!Vn(n))throw new Error("Syncify backup service is not configured.");let t=await pi(n.workerUrl,await be(),e),[i,o,a]=await Promise.all([Promise.all(t.backups.map(Bi)),t.safetyCopy?Bi(t.safetyCopy):null,Promise.all(t.unapproved.map(Bi))]),s=i.filter((u,y)=>i.findIndex(f=>f.payload_hash===u.payload_hash)===y);return N(g({},t),{payload:(c=s[0])!=null?c:null,backups:s,safetyCopy:o&&!s.some(u=>u.payload_hash===o.payload_hash)?o:null,unapproved:a.filter(u=>!s.some(y=>y.payload_hash===u.payload_hash))})}var Ui=new Map;async function Bi(n){var a,s,c;let e=(s=(a=n.marketplace_data)==null?void 0:a.keys)!=null?s:{},t=n.spicetify_config?Si(n.spicetify_config,e):void 0,i=`${n.payload_hash} ${(c=n.metadata)==null?void 0:c.last_sync_datetime}`,o=Ui.get(i);return o||(o=It(e,t),Ui.set(i,o),o.catch(()=>Ui.delete(i))),N(g(g({},n),t?{spicetify_config:t}:{}),{payload_hash:await o})}async function Zs(n){let e=await pi(Zn(n),await be());return{claim:e.claim,install:e.install}}async function Qs(n,e,t,i=[]){var c;let o=e!=null?e:(await gn(n)).payload;if(!o)throw new Error("No Syncify cloud backup was found for this Spotify account.");let a=await fs(o,i),s=(c=o.backup)==null?void 0:c.id;return s&&Vn(n)&&be().then(u=>Xo(n.workerUrl,u,s,t)).catch(()=>{}),{payload:o,restoredCount:a}}var Jn=class extends Error{constructor(t){super("Couldn't back up your setup first, so nothing changed.");this.reason=t;this.name="SafetyBackupError"}};async function ea(n,e,t,i,o){try{await Xn(n)}catch(s){throw new Jn(s)}let a=await Ls(e,t,i,o);return be().then(s=>$s(e.code,s)).catch(()=>{}),a}async function na(n){let e=await be(),t=await js(Zn(n),e);return N(g({},t),{hash:e.hash})}async function ta(n){await Fs(Zn(n),await be())}async function $t(n,e,t){await Jo(Zn(n),await be(),e,t)}async function Kt(n){await Ys(Zn(n),await be())}function Zn(n){if(!Vn(n))throw new Error("Syncify backup service is not configured.");return n.workerUrl}var Ht="syncify:claim-check-day";async function oa(n){var t,i,o;let e=le();if(e.workerUrl){if(!e.autoBackupEnabled)return cl(n);try{let[a,s]=await Promise.all([Et(),gn(e)]);sa(s,n);let c=(i=(t=s.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?i:0;if(s.exists&&ps(a.keyCount,c)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((o=s.payload)==null?void 0:o.payload_hash)===a.hash||a.keyCount===0)return;let{unapproved:u}=await Xn(e);Spicetify.showNotification(u?"Syncify: backed up, waiting for approval":"Syncify auto-backup complete")}catch(a){if(a instanceof ke||a instanceof Xe){Spicetify.showNotification("Syncify: sign in to keep backing up",!0,8e3);return}let s=a instanceof Error?a.message:String(a);console.warn("Syncify startup sync failed:",a),Spicetify.showNotification(`Syncify auto-sync skipped: ${s}`,!0,8e3)}}}async function cl(n){let e=new Date().toLocaleDateString("en-CA");if(ul()!==e)try{let t=await Zs(le());ia(e),sa(t,n)}catch(t){if(t instanceof ke){ia(e);return}console.warn("Syncify claim check failed:",t)}}function sa(n,e){var o;let t=ll(n.claim),i=(o=n.install)==null?void 0:o.waiting[0];t?e.onClaim(t):i&&e.onInstall(i)}function ll(n){return(n==null?void 0:n.status)==="pending"&&!n.mine?n:null}function ul(){var n,e;return(e=(n=Spicetify.LocalStorage)==null?void 0:n.get(Ht))!=null?e:window.localStorage.getItem(Ht)}function ia(n){var e;(e=Spicetify.LocalStorage)!=null&&e.set?Spicetify.LocalStorage.set(Ht,n):window.localStorage.setItem(Ht,n)}var Ki="syncify:pending-restore",dl=600*1e3,yl=2e3,fl=15e3,pl="marketplace:theme-installed",ml="raw.githubusercontent.com",gl=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],we=null,$i=new Set,ca=new Map;function la(){return we}function ua(n){return $i.add(n),()=>$i.delete(n)}function da(){we&&ga(N(g({},we),{manual:[]}))}function Ft(n,e="restore"){try{localStorage.setItem(Ki,JSON.stringify({at:Date.now(),manual:n,kind:e}))}catch(t){}}function ya(){var n;Ft((n=we==null?void 0:we.manual)!=null?n:[],we==null?void 0:we.kind),window.location.reload()}function fa(){ha()&&(document.addEventListener("load",n=>aa(n.target,"load"),!0),document.addEventListener("error",n=>aa(n.target,"error"),!0))}async function pa(){let n=ha();if(!n)return;try{localStorage.removeItem(Ki)}catch(s){}let e=Date.now(),t=await ra();for(;t.loaded<t.total&&Date.now()-e<fl;)await new Promise(s=>setTimeout(s,yl)),t=await ra();ga(N(g({kind:n.kind,at:Date.now()},t),{manual:n.manual}));let i=t.loaded===t.total&&n.manual.length===0,o=n.kind==="share"?"Setup applied":"Backup restored",a=n.kind==="share"?"loaded":"restored";Spicetify.showNotification(i?`Syncify: ${o}; ${t.total} ${t.total===1?"item":"items"}`:`Syncify: ${a} ${t.loaded} of ${t.total}. Open Syncify for details.`,!1,8e3)}function ma(n){let e=n.map(t=>t.type==="extension"?`spicetify config extensions ${jt(t.name)}`:t.type==="custom_app"?`spicetify config custom_apps ${jt(t.name)}`:`spicetify config current_theme ${jt(t.name)}${t.scheme?` color_scheme ${jt(t.scheme)}`:""}`);return e.length>0?[...e,"spicetify apply"]:[]}function jt(n){return/^[\w.@+/-]+$/.test(n)?n:`"${n}"`}function ga(n){we=n;for(let e of $i)e(n)}function ha(){var n;try{let e=JSON.parse((n=localStorage.getItem(Ki))!=null?n:"null");return!e||Date.now()-e.at>dl?null:{manual:Array.isArray(e.manual)?e.manual:[],kind:e.kind==="share"?"share":"restore"}}catch(e){return null}}function aa(n,e){n instanceof HTMLScriptElement&&n.src&&ca.set(Qn(n.src),e)}async function ra(){var i;let n=await ce(),e=(i=n[pl])!=null?i:"",t=V(n).filter(o=>o.type==="extension"&&o.sources.length>0||o.type==="theme"&&e.includes(o.key)||o.type==="snippet");return{loaded:t.filter(hl).length,total:t.length}}function hl(n){var e,t;if(n.type==="snippet"){let i=document.querySelector("style.marketplaceSnippets");return((e=i==null?void 0:i.textContent)==null?void 0:e.includes(`/* ${n.name} - `))===!0}if(n.type==="theme"){let i=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((t=i==null?void 0:i.textContent)!=null&&t.trim())}return Sl(n.sources[0]).some(kl)}function Sl(n){let e;try{e=new URL(n)}catch(s){return[]}if(e.host!==ml)return[Qn(e.href)];let[t,i,o,...a]=e.pathname.split("/").filter(Boolean);return!t||!i||!o||a.length===0?[]:gl.map(s=>Qn(`https://${s}/gh/${t}/${i}@${o}/${a.join("/")}`))}function kl(n){let e=ca.get(n);return e?e==="load":[...document.querySelectorAll("script[src]")].some(i=>Qn(i.src)===n)&&performance.getEntriesByType("resource").some(i=>Qn(i.name)===n)}function Qn(n){try{let e=new URL(n);return`${e.origin}${e.pathname}`}catch(e){return n}}function Hi(n){return`A new install${n.device?` on ${n.device}`:""} wants to back up this Spotify account.`}function Sa(n){let e=Spicetify.React,t=e.useState,{install:i}=n,[o,a]=t(!1),[s,c]=t(null);async function u(y){a(!0),c(null);try{await $t(le(),i.id,y),Spicetify.showNotification(y==="approve"?"Syncify: install approved":"Syncify: install refused"),n.onDone(y)}catch(f){c(f instanceof Error?f.message:String(f)),a(!1)}}return e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-claim-notice"},Hi(i)," Approve it if it's yours."),s?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},s):null,e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:n.onClose,disabled:o},"Close"),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{u("reject")},disabled:o},"Not mine"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{u("approve")},disabled:o},"Approve")))}var bl="syncify:beta",ka=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function ba(){var n;return(n=window.SyncifyLoader)!=null?n:null}function wl(){try{return window.localStorage.getItem(bl)==="true"}catch(n){return!1}}async function wa(n){let e=wl()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(e.map(i=>xl(`${n}/${i}`)))).reduce((i,o)=>o&&(!i||Fi(o,i)>0)?o:i,null)}function ji(n){return typeof n=="string"&&ka.test(n)}function Fi(n,e){let[t,i]=[n,e].map(o=>{var y;let[,a,s,c,u]=(y=ka.exec(o))!=null?y:[];return[a,s,c,u!=null?u:1/0].map(Number)});for(let o=0;o<t.length;o+=1)if(t[o]!==i[o])return t[o]<i[o]?-1:1;return 0}async function xl(n,e=3e3){let t=typeof AbortController=="function"?new AbortController:null,i=setTimeout(()=>t==null?void 0:t.abort(),e);try{let o=await fetch(n,{signal:t==null?void 0:t.signal});if(!o.ok)return null;let a=await o.json();return ji(a==null?void 0:a.version)?a.version:null}catch(o){return null}finally{clearTimeout(i)}}var zi="syncify:share-code-count",vl=600;function Cl(){var e,t;let n=Number((t=(e=Spicetify.LocalStorage)==null?void 0:e.get(zi))!=null?t:NaN);return Number.isInteger(n)&&n>=0?n:null}function xa(n){var e,t;n===null?(e=Spicetify.LocalStorage)==null||e.remove(zi):(t=Spicetify.LocalStorage)==null||t.set(zi,String(n))}var qi="syncify:handle";function Nl(){var e;let n=(e=Spicetify.LocalStorage)==null?void 0:e.get(qi);return n==null?void 0:n||null}function Yi(n){var e,t;n===void 0?(e=Spicetify.LocalStorage)==null||e.remove(qi):(t=Spicetify.LocalStorage)==null||t.set(qi,n!=null?n:"")}var w=null;function Ri(n={}){var yo,fo,po,mo,go,ho,So,ko,bo,wo;let e=Spicetify.React,t=e.useEffect,i=e.useMemo,o=e.useState,a=e.useRef,[s,c]=o(()=>le()),[u,y]=o(()=>w!=null&&w.remote.exists?"success":"idle"),[f,m]=o(null),[h,S]=o(0),[E,v]=o([]),[b,P]=o([]),[M,de]=o(null),[Ye,ne]=o(null),[se,H]=o(null),[q,ae]=o(null),[D,G]=o(()=>{var r;return(r=w==null?void 0:w.remote.payload)!=null?r:null}),[te,k]=o(()=>{var r;return(r=w==null?void 0:w.remote.backups)!=null?r:[]}),[_,ye]=o(()=>{var r;return(r=w==null?void 0:w.remote.safetyCopy)!=null?r:null}),[Y,W]=o(()=>{var r;return(r=w==null?void 0:w.remote.unapproved)!=null?r:[]}),[ie,fe]=o(()=>{var r;return(r=w==null?void 0:w.remote.install)!=null?r:null}),[Pe,kn]=o(!1),[Ae,j]=o(()=>new Set),[I,J]=o(()=>{var r;return(r=w==null?void 0:w.remote.payload)!=null?r:null}),[We,U]=o(w!==null),[xe,X]=o(!1),[Qe,pe]=o(!1),[Me,bn]=o(null),[Z,L]=o(!1),[me,ve]=o(null),[Le,Oe]=o((yo=n.section)!=null?yo:null),[ze,en]=o(!1),[A,nn]=o(()=>la()),[B,Ce]=o(!1),[F,tn]=o(!1),[Ne,nt]=o(null),[on,wn]=o(()=>Cl()),[xn,sn]=o(()=>Nl()),[oe,Ie]=o(void 0),[$,tt]=o(()=>{var r;return(r=w==null?void 0:w.lockedBy)!=null?r:null}),[qe,Rt]=o(()=>{var r;return(r=w==null?void 0:w.remote.claim)!=null?r:null}),[Q,an]=o(()=>{var r;return(r=w==null?void 0:w.claims)!=null?r:null}),[it,ot]=o(!1),[Vt,vn]=o(null),[rn,Cn]=o(!1),[d,p]=o(null),[x,re]=o(null),Nn=a(null),Ee=i(()=>O(),[]),cn=i(()=>_?[...te,_]:te,[te,_]),Jt=d?[]:Y,Xt=d?(fo=x==null?void 0:x.backups)!=null?fo:[]:te,Xi=d?(po=x==null?void 0:x.safetyCopy)!=null?po:null:_,Zi=i(()=>{var r;return new Map([...cn,...Y,...(r=x==null?void 0:x.backups)!=null?r:[],...x!=null&&x.safetyCopy?[x.safetyCopy]:[]].map(l=>[l,V(l.marketplace_data.keys)]))},[cn,Y,x]),st=r=>{var l;return(l=Zi.get(r))!=null?l:V(r.marketplace_data.keys)},Ba=r=>st(r).map(l=>l.key),$a=r=>st(r).length,ee=i(()=>xe&&I?Bn(st(I),I.spicetify_config,b,M):null,[xe,I,Zi,b,M]),De=i(()=>ee?Yn(ee.items):null,[ee]),at=i(()=>new Map([...Me!=null?Me:[],...De!=null?De:[]]),[Me,De]),rt=((mo=I==null?void 0:I.backup)==null?void 0:mo.kind)==="quarantined",Qi=i(()=>{var r;return new Set(((r=ee==null?void 0:ee.items)!=null?r:[]).filter(l=>{var T;return l.change!=="removed"&&l.isNew&&(rt||He(at.get(l.key))||((T=at.get(l.key))==null?void 0:T.kind)==="unchecked")}).map(l=>l.key))},[ee,at,rt]),Ka=[...Qi].filter(r=>!Ae.has(r)),eo=ee!==null&&Me===null,Zt=i(()=>Js(),[]),no=i(()=>ba()!==null,[]),ge=u==="loading",ct=(f==null?void 0:f.kind)==="warning"||(f==null?void 0:f.kind)==="error"?f:null,to=!!(D&&q&&D.payload_hash!==q),In=!!(D&&q&&D.payload_hash===q),io=!!(I&&q&&I.payload_hash===q),lt=d!==null||ze||!In||cn.length<2,Ha=lt?Xt:Xt.slice(0,1),ut=(qe==null?void 0:qe.status)==="pending"&&!qe.mine?qe:null,Qt=_l(Q,$,ut!==null),dt=(go=ie==null?void 0:ie.waiting[0])!=null?go:null,oo=!ie||ie.trusted||$||Qt.kind==="secured"?null:ie.refused?"This Spotify account refused backups from this install. Sign in to back up from it.":"This install isn't approved yet. Its backups are kept apart until you approve it from another install or sign in.",ei=(oe?((ho=Q==null?void 0:Q.accounts)!=null?ho:[]).filter(r=>r.status==="final"):[]).map((r,l)=>({hash:r.hash,label:`Spotify account ${l+1}${r.device_info?` \xB7 from ${r.device_info}`:""}`})).filter(r=>r.hash!==(Q==null?void 0:Q.hash)),ja=!!(q&&h>0&&!cn.some(r=>r.payload_hash===q));t(()=>(R().catch(()=>null).then(r=>Ie(l=>l!=null?l:r)),he({silent:!0}),za(),ua(nn)),[]),t(()=>{if(bn(null),!ee||!De)return;[...De.values()].some(He)&&pe(!0);let r=!0;return Wn(ee.items,De).then(l=>{r&&(bn(l),[...l.values()].some(He)&&pe(!0))}),()=>{r=!1}},[ee,De]),t(()=>{if(!Z)return;let r=l=>{var _e;if(!((_e=Nn.current)!=null&&_e.isConnected)){L(!1),ve(null);return}l.preventDefault(),l.stopImmediatePropagation();let T=qs(l);if(T.kind!=="ignore"){if(T.kind==="cancel"){L(!1),ve(null);return}if(T.kind==="error"){ve(T.message);return}if(Gs(T.shortcut)){ve(`${qn(T.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}L(!1),ni(T.shortcut)}};return window.addEventListener("keydown",r,!0),()=>window.removeEventListener("keydown",r,!0)},[Z,s]);async function so(){let r=await Et();return ae(r.hash),S(r.installedItemCount),v(r.installedItems),P(r.items),de(r.spicetifyConfig),ne(r.activeTheme),H(r.marketplaceAvailable),r}async function he(r){try{X(!1),(!(r!=null&&r.silent)||!w)&&y("loading"),r!=null&&r.silent||m({kind:"info",text:"Checking your Syncify backup\u2026"}),await so();let l,T=null;try{l=await gn(s)}catch(Ue){if(!(Ue instanceof ke))throw Ue;l=Gl,T=Ue.code}let _e=await R().catch(()=>null),Se=_e?await na(s).catch(()=>null):null,z=_e?await R().catch(()=>null):null;w={remote:l,lockedBy:T,claims:z?Se:null},Ie(z),an(z?Se:null),tt(T),T&&Oe("account"),Rt(l.claim),p(null),re(null),G(l.payload),k(l.backups),ye(l.safetyCopy),W(l.unapproved),fe(l.install),J(l.payload),U(!0),y(l.exists?"success":"idle"),!(r!=null&&r.silent)&&!T&&m(l.exists&&l.payload?{kind:"success",text:`Backup found from ${hn(l.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(l){_n(l)}}async function ao(){ot(!0),vn(null);try{await ta(s)}catch(r){r instanceof Fe&&["claim_pending","claimed"].includes(r.code)||vn(r instanceof Error?r.message:String(r))}finally{await he({silent:!0}),ot(!1)}}function Fa(r){Ie(r),!$&&D?ao():he({silent:!0})}function ro(){xa(null),wn(null),Yi(void 0),sn(void 0),Ie(null),an(null),vn(null),he({silent:!0})}async function Ya(){Cn(!0);try{await Kt(s),Spicetify.showNotification("Syncify: claim sent for review"),await he({silent:!0})}catch(r){m({kind:"error",text:r instanceof Error?r.message:String(r)})}finally{Cn(!1)}}async function Wa(r){if(X(!1),p(r),re(null),!r){J(D);return}J(null);try{let l=await gn(s,r);re(l),J(l.payload)}catch(l){p(null),J(D),_n(l)}}async function za(){let r=Ee.version;if(!ji(r))return;let l=await wa(Ee.releasesUrl);l&&Fi(l,r)>0&&nt(l)}function qa(r){let l=N(g({},s),{autoBackupEnabled:r});c(l),Bt(l),m({kind:"success",text:r?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}function ni(r){let l=N(g({},s),{shortcut:r});c(l),Bt(l),Oi(r),ve(null),m({kind:"success",text:r?`${qn(r)} now opens Syncify.`:"Keyboard shortcut turned off."})}function Ga(r){let l=N(g({},s),{entryPoint:r});c(l),Bt(l),Ot(r)}function En(r){Oe(r),r!=="settings"&&L(!1)}function Ra(){ve(null),L(!0)}async function Va(){var r;try{X(!1),y("loading"),m({kind:"info",text:"Backing up your extensions and themes\u2026"});let{payload:l,unchanged:T,unapproved:_e}=await Xn(s);if(await so(),_e){await he({silent:!0}),m({kind:"warning",text:"Backed up, but kept apart until this install is approved."}),Spicetify.showNotification("Syncify: backed up, waiting for approval");return}if(T){U(!0),y("success"),m({kind:"success",text:"Everything is already backed up."}),Spicetify.showNotification("Syncify: everything is already backed up");return}let Se=[l,...te.filter(z=>z.payload_hash!==l.payload_hash)].slice(0,ql);w&&(w=N(g({},w),{remote:N(g({},w.remote),{exists:!0,payload:l,backups:Se,safetyCopy:((r=w.remote.safetyCopy)==null?void 0:r.payload_hash)===l.payload_hash?null:w.remote.safetyCopy})})),G(l),k(Se),ye(z=>(z==null?void 0:z.payload_hash)===l.payload_hash?null:z),J(l),U(!0),y("success"),m({kind:"success",text:`Backed up ${l.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(l){_n(l)}}async function co(r){if(dt){kn(!0);try{await $t(s,dt.id,r),Spicetify.showNotification(r==="approve"?"Syncify: install approved":"Syncify: install refused"),await he({silent:!0})}catch(l){_n(l)}finally{kn(!1)}}}function Ja(r=I){if(se===!1){let l="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";m({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3);return}if(!r){let l="No Syncify cloud backup was found for this Spotify account.";m({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3);return}J(r),pe(!1),j(new Set),X(!0)}async function Xa(){let r=I?Bn(st(I),I.spicetify_config,b,M).manual:[];try{X(!1),y("loading"),m({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:l,restoredCount:T}=await Qs(s,I!=null?I:void 0,d!=null?d:void 0,Ka);J(l),y("success"),m({kind:"success",text:`Restored ${T} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),Ft(r),setTimeout(()=>window.location.reload(),1e3)}catch(l){_n(l)}}async function Za(r){await Aa(r)&&(Ce(!0),setTimeout(()=>Ce(!1),2e3))}function Ge(r){if(r.startsWith("mailto:")){window.location.href=r;return}window.open(r,"_blank","noopener,noreferrer")}function _n(r){if(y("error"),r instanceof On){tn(!0),m(null);return}if(r instanceof Xe){m({kind:"error",text:r.message}),he({silent:!0});return}if(r instanceof ke&&r.code!=="not_linked"){m(null),he({silent:!0});return}let l=r instanceof Error?r.message:String(r);m({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3)}function ti(r,l){var xo,vo;let T=(I==null?void 0:I.payload_hash)===r.payload_hash,_e=r.payload_hash===q,Se=hn(r.metadata.last_sync_datetime),z=Ea($a(r)),Ue=(vo=(xo=r.backup)==null?void 0:xo.name)!=null?vo:null;return e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":T,"data-selected":T?"true":"false",type:"button",key:`${r.payload_hash}-${r.metadata.last_sync_datetime}`,title:l!=null&&l.isSafetyCopy?"Kept aside and updated about once a week, so a burst of new backups can't replace it":l!=null&&l.isUnapproved?"From an install this Spotify account hasn't approved":void 0,onClick:()=>{J(r),X(!1)},disabled:ge},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),l!=null&&l.isSafetyCopy?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Safety copy"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 updated weekly")),e.createElement("span",{className:"syncify-muted"},Ue?`${Ue} \xB7 `:"",Se," \xB7 ",z)):l!=null&&l.isUnapproved?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Not approved"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 ",Se)),e.createElement("span",{className:"syncify-muted"},z," \xB7 from ",r.metadata.device_info)):Ue?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,Ue),e.createElement("span",{className:"syncify-muted syncify-backup-date"},Se," \xB7 ",z," \xB7 from ",r.metadata.device_info)):e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-backup-date"},Se),e.createElement("span",{className:"syncify-muted"},z," \xB7 from ",r.metadata.device_info)),_e?e.createElement("span",{className:"syncify-tag",title:"What's on this device now"},"Current"):null,l!=null&&l.isSafetyCopy?e.createElement(Hl,null):null,l!=null&&l.isUnapproved?e.createElement(Ji,null):null)}function ii(r){r.stopPropagation()}let Qa=F?"Update Syncify to keep backing up":$?"Sign in to restore":We?D?to?"Changes since your last backup":"Everything is backed up":"No backup yet":u==="error"?"Couldn't check your backup":"Checking your backup\u2026",lo=F?"Your backups are safe":$?$==="not_owner"?"Secured by another account":"This backup is secured":We?D?to?Vl(D,Ba(D),E,M):`Last backup ${hn(D.metadata.last_sync_datetime)}`:"Save your extensions and themes so you can restore them after a reinstall or on another computer.":null,uo=!!(A&&!F&&Date.now()-A.at<zl),Tn=!!(A&&A.loaded===A.total),oi=ma((So=A==null?void 0:A.manual)!=null?So:[]);return e.createElement("div",{className:"syncify-panel",ref:Nn,onClick:ii,onMouseDown:ii,onPointerDown:ii},F?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,"This version of Syncify is no longer supported."),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Ge(`${Ee.githubUrl}#updating`)},"How to update")):null,ut?e.createElement("div",{className:"syncify-alert",role:"alert"},e.createElement("span",null,(ko=ut.email)!=null?ko:"Someone"," is claiming this backup.",oe===null?" If that's you, sign in to finish.":ut.held?" Syncify is reviewing it.":null),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Ya()},disabled:rn},"Not me"),oe===null?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>En("account")},"That's me, sign in"):null)):null,dt?e.createElement("div",{className:"syncify-alert",role:"alert"},e.createElement("span",null,Hi(dt)),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{co("reject")},disabled:Pe},"Not mine"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{co("approve")},disabled:Pe},"Approve"))):null,oo?e.createElement("div",{className:"syncify-alert",role:"status"},e.createElement("span",null,oo)):null,oi.length>0?e.createElement("div",{className:"syncify-alert syncify-manual",role:"status"},e.createElement("span",{className:"syncify-manual-header"},e.createElement("span",null,A.manual.length===1?"1 isn't from Marketplace. Add it in a terminal:":`${A.manual.length} aren't from Marketplace. Add them in a terminal:`),e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:da},e.createElement(Gi,null))),e.createElement("span",{className:"syncify-code"},e.createElement("code",null,oi.join(`
`)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Za(oi.join(`
`))}},B?"Copied":"Copy"))):null,ct?e.createElement("div",{className:"syncify-alert","data-kind":ct.kind},e.createElement("span",null,ct.text),e.createElement("span",{className:"syncify-alert-actions"},ct.kind==="error"?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{he()},disabled:ge},"Try again"):null,e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>m(null)},e.createElement(Gi,null)))):null,e.createElement("section",{className:"syncify-status","aria-live":"polite"},uo&&A?e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},A.kind==="share"?Tn?"Setup loaded":`Loaded ${A.loaded} of ${A.total}`:Tn?"Backup restored":`Restored ${A.loaded} of ${A.total}`),e.createElement("p",{className:"syncify-muted"},Tn?A.total===0?"Nothing from Marketplace to load":`${A.loaded} of ${A.total} loaded`:"Missing something? Reload Spotify once more."),Tn&&A.kind==="restore"?e.createElement("p",{className:"syncify-muted"},"Syncify saved your setup?"," ",e.createElement("button",{className:"syncify-text-button syncify-inline-button",type:"button",onClick:()=>Ge(Ee.kofiUrl)},"Support it on Ko-fi")):null):e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},Qa),e.createElement("p",{className:"syncify-muted"},lo?`${lo} \xB7 `:"",Ea(h)," on this device")),uo&&!Tn?e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:ya},"Reload"):e.createElement("button",{className:"syncify-button",type:"button",onClick:Va,disabled:ge||In||F||$!==null,title:$?"Sign in to back up":In?"No changes since your last backup":void 0},ge?"Working\u2026":In?"Backed up":"Back up now")),!We||$||te.length>0||Y.length>0||ei.length>0?e.createElement("section",{className:"syncify-section","aria-label":"Backups"},e.createElement("div",{className:"syncify-section-header"},e.createElement("h4",{className:"syncify-section-title"},"Backups"),e.createElement("span",{className:"syncify-section-controls"},!d&&In&&cn.length>1?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":ze,"aria-controls":"syncify-backup-list",onClick:()=>{en(!ze),X(!1)}},ze?"Show less":`Show all ${cn.length}`,e.createElement(Sn,null)):null,!$&&ei.length>0?e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select","aria-label":"Show backups from",value:d!=null?d:"",onChange:r=>{Wa(r.currentTarget.value||null)},disabled:ge},e.createElement("option",{value:""},"This Spotify account"),ei.map(r=>e.createElement("option",{key:r.hash,value:r.hash},r.label))),e.createElement(Sn,null)):null)),We?$?e.createElement("p",{className:"syncify-locked"},e.createElement(Wl,null),e.createElement("span",null,$==="not_owner"?"Sign in with the account that secured them":"Sign in to see and restore your backups")):d&&!x?e.createElement("p",{className:"syncify-muted"},"Loading backups\u2026"):Xt.length===0&&Jt.length===0?e.createElement("p",{className:"syncify-muted"},"No backups yet."):e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-list",id:"syncify-backup-list",role:"radiogroup","aria-label":"Choose a backup to restore"},Ha.map(r=>ti(r)),lt&&Xi?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),ti(Xi,{isSafetyCopy:!0})):null,lt&&Jt.length>0?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),Jt.map(r=>ti(r,{isUnapproved:!0}))):null),lt?se===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to restore a backup."):xe?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},"Restore"," ",I?(wo=(bo=I.backup)==null?void 0:bo.name)!=null?wo:hn(I.metadata.last_sync_datetime):"this backup","?"),rt?e.createElement("div",{className:"syncify-alert"},"An install this Spotify account hasn't approved made this backup. Its items stay off unless you turn them on."):null,ee?e.createElement(Ta,{preview:ee,checks:at,off:Qi,allowed:Ae,unapproved:rt,onAllow:(r,l)=>{let T=new Set(Ae);l?T.add(r):T.delete(r),j(T)},expanded:Qe,onToggle:()=>pe(!Qe)}):null,e.createElement("div",{className:"syncify-actions"},ja?e.createElement("div",{className:"syncify-alert syncify-actions-hint"},"Your current setup isn't backed up."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>X(!1),disabled:ge},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:Xa,disabled:ge||eo},eo?"Checking\u2026":"Restore"))):e.createElement("div",{className:"syncify-actions"},io?e.createElement("span",{className:"syncify-muted syncify-actions-hint"},"This backup is already current."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>Ja(),disabled:ge||!I||io},"Restore backup")):null):e.createElement("div",{className:"syncify-backup-skeleton","aria-hidden":"true"},e.createElement("span",{className:"syncify-radio"}),e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-skeleton-line"}),e.createElement("span",{className:"syncify-skeleton-line wide"})))):null,e.createElement("div",{className:"syncify-accordion"},e.createElement(Wi,{id:"share",title:"Share",openSection:Le,onToggle:En,status:oe&&on?{kind:"count",label:`${on} ${on===1?"code":"codes"}`,text:String(on)}:null},e.createElement(Al,{config:s,session:oe,localItems:b,localConfig:M,localTheme:Ye,marketplaceAvailable:se,busy:ge,onSignIn:()=>En("account"),onSignedOut:ro,onCodeCount:r=>{xa(r),wn(r)},onHandle:r=>{Yi(r),sn(r)}})),e.createElement(Wi,{id:"account",title:"Account",openSection:Le,onToggle:En,status:jl(oe,$,Qt)},e.createElement(Tl,{session:oe,locked:$,secure:Qt,securing:it,secureError:Vt,onSecure:()=>{ao()},onSignedIn:Fa,onSignedOut:ro,onOpenWebsite:Ge,handle:xn,onHandle:r=>{Yi(r),sn(r)}})),e.createElement(Wi,{id:"settings",title:"Settings",openSection:Le,onToggle:En,status:Ne?{kind:"dot",label:`Syncify ${Ne} is out`}:null},e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Back up automatically"),e.createElement("span",{className:"syncify-muted"},"When Spotify starts and something has changed")),e.createElement("input",{className:"syncify-switch",type:"checkbox",role:"switch",checked:s.autoBackupEnabled&&!F,onChange:r=>qa(r.currentTarget.checked),disabled:ge||F})),e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Open Syncify from"),Zt?s.entryPoint==="menu"&&!s.shortcut?e.createElement("span",{className:"syncify-muted"},"Keep a shortcut in case a Spotify update breaks the menu"):null:e.createElement("span",{className:"syncify-muted"},"The profile menu isn't available in this Spicetify version")),e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select",value:Zt?s.entryPoint:"topbar",onChange:r=>Ga(r.currentTarget.value),disabled:!Zt},Rl.map(r=>e.createElement("option",{key:r.value,value:r.value},r.label))),e.createElement(Sn,null))),e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Keyboard shortcut"),Z&&!me?e.createElement("span",{className:"syncify-muted"},"Press a key combination, or Esc to cancel"):null),e.createElement("span",{className:"syncify-shortcut"},s.shortcut&&!Z?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ni(null)},"Turn off"):null,!s.shortcut&&!Z?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ni(mn)},"Use default"):null,e.createElement("button",{className:"syncify-key",type:"button","data-recording":Z?"true":"false",onClick:()=>Z?L(!1):Ra(),title:"Click to change"},Z?"Press keys\u2026":s.shortcut?qn(s.shortcut):"Off"))),me?e.createElement("div",{className:"syncify-alert",role:"alert"},me):null)),e.createElement("footer",{className:"syncify-footer"},e.createElement("span",{className:"syncify-footer-version"},e.createElement("span",null,"Syncify ",Ee.version),Ne?e.createElement("button",{className:"syncify-text-button syncify-update",type:"button",onClick:()=>no?window.location.reload():Ge(`${Ee.githubUrl}#updating`)},Ne," is out \xB7 ",no?"Reload":"How to update"):null),e.createElement("span",{className:"syncify-footer-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Ge(Ee.issueUrl)},"Report an issue"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Ge(Ee.githubUrl)},"GitHub"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Ge(Ee.kofiUrl)},"Support on Ko-fi"))))}var va={added:{mark:"+",label:"Added"},removed:{mark:"\u2212",label:"Removed"},unchanged:{mark:"=",label:"Unchanged"}},_a=[["extension","Extensions"],["theme","Themes"],["snippet","Snippets"]],Il={extension:"extension",custom_app:"custom app",theme:"theme"};function Ta(n){let e=Spicetify.React,{items:t,counts:i,manual:o,theme:a}=n.preview,s=[...n.off].filter(c=>!n.allowed.has(c)).length;return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-chips","aria-label":"What changes on this device"},i.added?e.createElement("span",{className:"syncify-chip","data-change":"added"},"+",i.added," added"):null,i.removed?e.createElement("span",{className:"syncify-chip","data-change":"removed"},"\u2212",i.removed," removed"):null,i.unchanged?e.createElement("span",{className:"syncify-chip"},i.unchanged," unchanged"):null,o.length?e.createElement("span",{className:"syncify-chip"},o.length," to add manually"):null,a&&(!n.off.has(a.key)||n.allowed.has(a.key))?e.createElement("span",{className:"syncify-chip"},"Switches your theme to ",a.name):null,s?e.createElement("span",{className:"syncify-chip","data-change":"off"},s," off"):null),t.length||o.length?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":n.expanded,"aria-controls":"syncify-restore-changes",onClick:n.onToggle},n.expanded?"Hide changes":"Show changes",e.createElement(Sn,null)):null,n.expanded?e.createElement("div",{className:"syncify-changes",id:"syncify-restore-changes"},_a.map(([c,u])=>{let y=t.filter(f=>f.type===c);return y.length===0?null:e.createElement("section",{key:c,"aria-label":u},e.createElement("h5",{className:"syncify-change-group"},u),e.createElement("ul",{className:"syncify-change-list"},y.map(f=>{var m,h;return e.createElement("li",{className:"syncify-change",key:f.key},e.createElement("span",{className:"syncify-mark","data-change":f.change,role:"img","aria-label":va[f.change].label},va[f.change].mark),e.createElement("span",{className:"syncify-change-name"},f.name,f.repo?e.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",f.repo):null),n.checks.has(f.key)?e.createElement(Pa,{check:n.checks.get(f.key)}):n.unapproved&&n.off.has(f.key)?e.createElement("span",{className:"syncify-source","data-warning":"true"},e.createElement(Ji,null),"Not approved"):null,n.off.has(f.key)&&!((m=n.fixed)!=null&&m.has(f.key))?e.createElement("label",{className:"syncify-item-switch"},e.createElement("input",{type:"checkbox",checked:n.allowed.has(f.key),onChange:S=>n.onAllow(f.key,S.currentTarget.checked)}),(h=n.switchLabel)!=null?h:"Restore"):null)})))}),o.length?e.createElement("section",{"aria-label":"Add manually"},e.createElement("h5",{className:"syncify-change-group"},"Add manually"),e.createElement("ul",{className:"syncify-change-list"},o.map(c=>e.createElement("li",{className:"syncify-change",key:`${c.type}:${c.name}`},e.createElement("span",{className:"syncify-mark","aria-hidden":"true"}),e.createElement("span",{className:"syncify-change-name"},c.name,e.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",Il[c.type],c.scheme?`, ${c.scheme}`:"")))))):null):null)}var El={host:"Loads from outside GitHub",repo:"Its code is in a different repo than the one it names",blocked:"On Marketplace's block list",catalog:"Not in Marketplace's catalog",unchecked:"GitHub couldn't be reached to check it",custom:"A snippet made in Marketplace, not from its list"};function Pa(n){let e=Spicetify.React,{check:t}=n,i=He(t),o=t.kind==="host"?`Code from ${t.host}`:t.kind==="repo"?`Code from ${t.repo}`:t.kind==="blocked"?"Blocked by Marketplace":t.kind==="catalog"?"Not in Marketplace":t.kind==="unchecked"?"Not checked":"Custom";return e.createElement("span",{className:"syncify-source","data-warning":i?"true":"false",title:El[t.kind]},i?e.createElement(Ji,null):null,o)}function _l(n,e,t){var s,c;if(e==="not_owner")return{kind:"other-account"};if(!n)return t?{kind:"other-claim"}:{kind:"unknown"};let{claim:i}=n;if((i==null?void 0:i.status)==="final"){if(!i.mine)return{kind:"other-account"};let u=((s=n.accounts)!=null?s:[]).filter(y=>y.status==="final").length;return{kind:"secured",linkedCount:Math.max(u,1)}}if((i==null?void 0:i.status)==="pending")return i.mine?{kind:"pending",finalAt:i.final_at,held:i.held,waiting:i.waiting===!0}:{kind:"other-claim"};let o=((c=n.accounts)!=null?c:[]).filter(u=>u.hash===n.hash),a=o[o.length-1];return(a==null?void 0:a.status)==="cancelled"&&a.cancelled_by==="owner"?{kind:"cancelled"}:{kind:"open"}}function Tl(n){let e=Spicetify.React,t=e.useEffect,i=e.useState,{session:o,secure:a}=n,[s,c]=i(()=>St()),[u,y]=i(()=>St().email),[f,m]=i(""),[h,S]=i(!1),[E,v]=i(null),[b,P]=i(()=>Date.now()),{handle:M,onHandle:de}=n;t(()=>{if(!o||M!==void 0)return;let k=!0;return Ei().then(_=>{var ye,Y;k&&de((Y=(ye=_.profile)==null?void 0:ye.handle)!=null?Y:null)}).catch(()=>{}),()=>{k=!1}},[o,M]);let Ye=!!(s.codeSentAt&&b-s.codeSentAt<Ul),ne=Math.max(0,Math.ceil((s.retryAt-b)/1e3)),se=s.retryEmail===null||s.retryEmail===u.trim().toLowerCase()?ne:0;t(()=>{if(!o)return;let k=!0;return Yo().then(_=>{!k||_||(v({kind:"warning",text:Je(new C("signed_out"))}),n.onSignedOut())}).catch(()=>{}),()=>{k=!1}},[o==null?void 0:o.token]),t(()=>{if(s.retryAt<=Date.now())return;let k=setInterval(()=>{P(Date.now()),s.retryAt<=Date.now()&&clearInterval(k)},1e3);return()=>clearInterval(k)},[s.retryAt]);function H(k){let _=g(g({},St()),k);Bo(_),c(_),P(Date.now())}async function q(k){var ye;let _=k.trim();if(!$l.test(_)){v({kind:"error",text:"Enter a valid email address."});return}S(!0),v(null);try{let Y=await jo(_);H({email:_,codeSentAt:Date.now(),retryAt:Date.now()+Y*1e3,retryEmail:_.toLowerCase()}),m("")}catch(Y){let W=Y instanceof C?Y:null,ie=(ye=W==null?void 0:W.retryAfter)!=null?ye:null,fe=ie&&ie<=Bl?Date.now()+ie*1e3:0,Pe=(W==null?void 0:W.code)==="too_many_requests"?null:_.toLowerCase();if((W==null?void 0:W.code)==="resend_wait"){H({email:_,codeSentAt:s.email===_&&s.codeSentAt?s.codeSentAt:Date.now(),retryAt:fe,retryEmail:Pe});return}fe&&H({retryAt:fe,retryEmail:Pe}),v({kind:"error",text:Je(Y)})}finally{S(!1)}}async function ae(){S(!0),v(null);try{let k=await Fo(s.email,f);H({codeSentAt:null}),m(""),n.onSignedIn(k)}catch(k){v({kind:"error",text:Je(k)});let _=k instanceof C?k.code:null;(_==="too_many_attempts"||_==="code_expired")&&m("")}finally{S(!1)}}async function D(){var _;let k=(_=o==null?void 0:o.email)!=null?_:"";S(!0),v(null),await Wo(),H({email:k,codeSentAt:null}),y(k),S(!1),n.onSignedOut()}async function G(){S(!0),v(null);try{n.onOpenWebsite(await zo())}catch(k){let _=k instanceof C&&k.code==="signed_out";v({kind:_?"warning":"error",text:Je(k)}),_&&n.onSignedOut()}finally{S(!1)}}let te=E?e.createElement("div",{className:"syncify-alert","data-kind":E.kind==="error"?"error":void 0,role:"alert"},E.text):null;if(o===void 0)return null;if(o){let k=a.kind==="open"||a.kind==="other-claim"||a.kind==="cancelled";return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",{className:"syncify-account-email"},o.email),a.kind==="secured"?e.createElement("span",{className:"syncify-muted"},"Backup secured \xB7"," ",a.linkedCount===1?"1 Spotify account linked":`${a.linkedCount} Spotify accounts linked`):a.kind==="pending"?e.createElement("span",{className:"syncify-muted syncify-account-state"},e.createElement(Ma,null),e.createElement("span",null,"Securing this backup \xB7"," ",a.waiting?"waiting on sign-in":a.held?"in review":`final ${Vi(a.finalAt)}`)):a.kind==="other-account"?e.createElement("span",{className:"syncify-muted"},"This backup is secured by another account"):e.createElement("span",{className:"syncify-muted"},"Signed in")),e.createElement("span",{className:"syncify-account-actions"},e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-label":"Manage on the website",onClick:()=>{G()},disabled:h},"Manage",e.createElement(Ia,null)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{D()},disabled:h},"Sign out"))),M?e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"@",M),e.createElement("span",{className:"syncify-muted"},"Your handle")),e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-label":"Open your profile",onClick:()=>n.onOpenWebsite(_i(M))},"Profile",e.createElement(Ia,null))):null,k?e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it")),e.createElement("button",{className:"syncify-button",type:"button",onClick:n.onSecure,disabled:h||n.securing||a.kind==="other-claim"},n.securing?"Securing\u2026":a.kind==="cancelled"?"Secure again":"Secure")):null,a.kind==="other-claim"?e.createElement("div",{className:"syncify-alert",role:"status"},"Another claim is pending. If it isn't yours, press Not me above and Syncify will review it."):a.kind==="cancelled"?e.createElement("div",{className:"syncify-alert",role:"status"},"Your claim was cancelled from this Spotify account."):a.kind==="pending"&&a.waiting?e.createElement("div",{className:"syncify-alert",role:"status"},"Syncify ran on this Spotify account without you signed in, maybe after a Spotify update or on another computer. Sign in to Syncify there to finish linking."):null,n.secureError?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},n.secureError):null,te)}return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting"},n.locked?e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Sign in to restore"),e.createElement("span",{className:"syncify-muted"},"With the email that secured this backup")):e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it"))),e.createElement("form",{className:"syncify-confirm",noValidate:!0,onSubmit:k=>{k.preventDefault(),!h&&(Ye?f.length===Yt&&ae():se||q(u))}},Ye?e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-muted"},"Code sent to ",Kl(s.email)),e.createElement("div",{className:"syncify-field"},e.createElement("input",{className:"syncify-input syncify-code-input",type:"text",inputMode:"numeric",autoComplete:"one-time-code","aria-label":"6-digit code",placeholder:"123456",maxLength:Yt,value:f,onChange:k=>m(k.currentTarget.value.replace(/\D/g,"").slice(0,Yt)),autoFocus:!0}),e.createElement("button",{className:"syncify-button",type:"submit",disabled:h||f.length!==Yt},h?"Verifying\u2026":"Verify")),e.createElement("p",{className:"syncify-muted syncify-account-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{q(s.email)},disabled:h||ne>0},ne>0?`Resend in ${Na(ne)}`:"Resend code"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{H({codeSentAt:null}),m(""),v(null)},disabled:h},"Use another email"))):e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-field"},e.createElement("input",{className:"syncify-input",type:"email",autoComplete:"email","aria-label":"Email",placeholder:"you@example.com",value:u,onChange:k=>y(k.currentTarget.value),autoFocus:!0}),e.createElement("button",{className:"syncify-button",type:"submit",disabled:h||se>0||!u.trim()},h?"Sending\u2026":"Send code")),e.createElement("p",{className:"syncify-muted"},se>0?`Send another code in ${Na(se)}`:"We only email sign-in codes.")),te))}var Pl=[["add","Add to my setup"],["replace","Replace my setup"]];function Al(n){var Cn;let e=Spicetify.React,t=e.useEffect,i=e.useMemo,o=e.useRef,a=e.useState,{session:s}=n,[c,u]=a(""),[y,f]=a(!1),[m,h]=a(null),[S,E]=a(null),[v,b]=a("add"),[P,M]=a(!1),[de,Ye]=a(()=>new Set),[ne,se]=a(null),[H,q]=a(void 0),[ae,D]=a(!1),[G,te]=a(null),[k,_]=a(null),[ye,Y]=a(null),[W,ie]=a(null),[fe,Pe]=a(""),[kn,Ae]=a(null),[j,I]=a(null),[J,We]=a(""),[U,xe]=a(null),[X,Qe]=a(!1),[pe,Me]=a(!1),[bn,Z]=a(null),[L,me]=a(null),[ve,Le]=a(null),[Oe,ze]=a(!1),[en,A]=a(null),nn=o(0),B=i(()=>S?As(S.file,S.items,n.localItems,n.localConfig,n.localTheme,v):null,[S,n.localItems,n.localConfig,n.localTheme,v]),Ce=i(()=>{if(!B||!S)return null;let d=new Set(S.items.map(p=>p.key));return B.items.filter(p=>p.change!=="removed"&&d.has(p.key)&&(v==="replace"||p.isNew))},[B,S,v]),F=i(()=>Ce?Yn(Ce):null,[Ce]),tn=i(()=>new Map([...ne!=null?ne:[],...F!=null?F:[]]),[ne,F]),Ne=i(()=>B&&H!==void 0?Ms(B,H):new Set,[B,H]),nt=i(()=>{var d;return new Set([...((d=B==null?void 0:B.items)!=null?d:[]).filter(p=>{var x;return p.change!=="removed"&&p.isNew&&(He(tn.get(p.key))||((x=tn.get(p.key))==null?void 0:x.kind)==="unchecked")}).map(p=>p.key),...Ne])},[B,tn,Ne]),on=[...nt].filter(d=>Ne.has(d)||!de.has(d)),wn=B!==null&&(ne===null||H===void 0),xn=U?U.items.filter(d=>!U.leftOut.has(d.key)):[],sn=!!(G&&k!==null&&G.length>=k),oe=j!==null&&j.code===null&&!ye,Ie=oe?Is(fe):null,[$,tt]=a(null);t(()=>{if(!Ie){tt(null);return}let d=window.setTimeout(()=>tt(Ie),vl);return()=>window.clearTimeout(d)},[Ie]),t(()=>{if(se(null),!Ce||!F)return;[...F.values()].some(He)&&M(!0);let d=!0;return Wn(Ce,F).then(p=>{d&&(se(p),[...p.values()].some(He)&&M(!0))}),()=>{d=!1}},[Ce,F]),t(()=>{te(null),I(null),me(null),s&&Q()},[s==null?void 0:s.token]);async function qe(){let d=Es(c);if(h(null),E(null),!d){h(At(new C("no_code")));return}f(!0);try{let p=await Bs(d);b("add"),Ye(new Set),M(!1),E({file:p,items:V(p.keys)}),Ni().then(q)}catch(p){h(At(p))}finally{f(!1)}}async function Rt(){if(!(!S||!B)){D(!0),h(null);try{await ea(n.config,S.file,v,on,H!=null?H:null),Spicetify.showNotification("Syncify: setup loaded. Reloading\u2026"),Ft(B.manual,"share"),setTimeout(()=>window.location.reload(),1e3)}catch(d){D(!1),h(d instanceof Jn?`${d.message} ${Ll(d.reason)}`:d instanceof Error?d.message:String(d))}}}async function Q(){var d,p;Ae(null);try{let x=await Ei();te(x.codes),n.onCodeCount(x.codes.length),_(x.max),Y(x.profile),n.onHandle((p=(d=x.profile)==null?void 0:d.handle)!=null?p:null),ie(x.suggestedHandle)}catch(x){an(x,Ae)}}function an(d,p){p(At(d,k)),d instanceof C&&d.code==="signed_out"&&n.onSignedOut()}async function it(d){var x;let p=++nn.current;I({code:d}),We((x=d==null?void 0:d.name)!=null?x:""),Pe(W!=null?W:""),xe(null),Qe(!1),Z(null),me(null),Le(null);try{let re=await ce(),Nn=await Ts(V(re),re);if(p!==nn.current)return;xe(g({keys:re},Nn)),Nn.leftOut.size>0&&Qe(!0)}catch(re){if(p!==nn.current)return;I(null),Z(re instanceof Error?re.message:String(re))}}function ot(){nn.current+=1,I(null),xe(null)}async function Vt(){if(!j||!U)return;Me(!0),Z(null);let d=Ps(U.keys,xn);try{let p=j.code?await Ds(j.code.code,J.trim(),d):await Os(J.trim(),d,oe?fe.trim():void 0);me(N(g({},p),{outcome:j.code?"updated":"created"})),I(null),xe(null),await Q()}catch(p){if(p instanceof C&&p.code==="same_setup"&&p.share){me(N(g({},p.share),{leftOut:0,outcome:"existing"})),I(null),xe(null);return}an(p,Z),p instanceof C&&p.code==="publish_failed"&&(I(null),Q())}finally{Me(!1)}}async function vn(d){ze(!0),Ae(null);try{await Us(d),Le(null),(L==null?void 0:L.code)===d&&me(null),await Q()}catch(p){an(p,Ae)}finally{ze(!1)}}async function rn(d,p){await Aa(d)&&(A(p),setTimeout(()=>A(x=>x===p?null:x),2e3))}return e.createElement(e.Fragment,null,e.createElement("form",{className:"syncify-field syncify-share-load",noValidate:!0,onSubmit:d=>{d.preventDefault(),!y&&!ae&&c.trim()&&qe()}},e.createElement("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-input"},"Load a setup"),e.createElement("input",{className:"syncify-input syncify-share-input",id:"syncify-share-input",type:"text",placeholder:"Paste a code or a link",autoComplete:"off",spellCheck:!1,value:c,onChange:d=>u(d.currentTarget.value),disabled:ae}),e.createElement("button",{className:"syncify-button secondary",type:"submit",disabled:y||ae||!c.trim()},y?"Loading\u2026":"Preview")),m?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},m):null,S&&B?e.createElement("div",{className:"syncify-confirm"},e.createElement("span",{className:"syncify-share-title"},e.createElement("p",{className:"syncify-confirm-title"},"Load ",(Cn=S.file.name)!=null?Cn:je(S.file.code),"?"),S.file.creator?e.createElement("button",{className:"syncify-text-button",type:"button",title:"Open their profile",onClick:()=>window.open(_i(S.file.creator),"_blank","noopener,noreferrer")},"by @",S.file.creator):null),e.createElement("div",{className:"syncify-share-modes",role:"radiogroup","aria-label":"How to load it"},Pl.map(([d,p])=>e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":v===d,"data-selected":v===d?"true":"false",type:"button",key:d,onClick:()=>b(d),disabled:ae},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,p))))),e.createElement(Ta,{preview:B,checks:tn,off:nt,fixed:Ne,switchLabel:"Load",allowed:de,unapproved:!1,onAllow:(d,p)=>{let x=new Set(de);p?x.add(d):x.delete(d),Ye(x)},expanded:P,onToggle:()=>M(!P)}),n.marketplaceAvailable===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to load a setup."):e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>E(null),disabled:ae},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{Rt()},disabled:ae||wn||n.busy},ae?"Applying\u2026":wn?"Checking\u2026":"Apply"))):null,s===void 0?null:s?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting syncify-share-part"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Share this setup"),e.createElement("span",{className:"syncify-muted"},G&&G.length>0&&k!==null?Ol(k-G.length):"Get a code anyone can load")),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{it(null)},disabled:j!==null||G===null||sn||n.marketplaceAvailable===!1,title:sn?"Delete a code to make another":void 0},"Share")),j?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},j.code?`Update ${je(j.code.code)} with this setup?`:"Share this setup?"),U?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-chips","aria-label":"What goes in"},e.createElement("span",{className:"syncify-chip"},xn.length," going in"),U.leftOut.size?e.createElement("span",{className:"syncify-chip","data-change":"off"},U.leftOut.size," left out"):null),U.items.length?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":X,"aria-controls":"syncify-share-items",onClick:()=>Qe(!X)},X?"Hide items":"Show items",e.createElement(Sn,null)):null,X?e.createElement(Ml,{items:U.items,leftOut:U.leftOut}):null,e.createElement("div",{className:"syncify-share-fields"},e.createElement("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-name"},"Setup name"),e.createElement("input",{id:"syncify-share-name",className:"syncify-input",type:"text",placeholder:"Optional",maxLength:Cs,value:J,onChange:d=>We(d.currentTarget.value),disabled:pe}),oe?e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-muted syncify-share-handle-note"},"It's your first time creating a share code. Pick a handle for your profile:"),e.createElement("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-handle"},"Your handle"),e.createElement("span",{className:"syncify-input syncify-handle-input"},e.createElement("span",{"aria-hidden":"true"},"@"),e.createElement("input",{id:"syncify-share-handle",type:"text",placeholder:"handle",autoComplete:"off",spellCheck:!1,maxLength:Ii,value:fe,onChange:d=>Pe(d.currentTarget.value.replace(/^@/,"")),disabled:pe})),fe&&$?e.createElement("span",{className:"syncify-share-handle-problem",role:"alert"},$):null):null)):e.createElement("p",{className:"syncify-muted"},"Checking your items\u2026"),e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:ot,disabled:pe},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{Vt()},disabled:!U||xn.length===0||pe||oe&&Ie!==null},U?pe?j.code?"Updating\u2026":"Creating\u2026":j.code?"Update":"Create code":"Checking\u2026"))):null,bn?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},bn):null,L?e.createElement("div",{className:"syncify-confirm"},e.createElement("span",{className:"syncify-manual-header"},e.createElement("span",{className:"syncify-confirm-title"},L.outcome==="existing"?"You already shared this setup":L.outcome==="updated"?"Code updated":"Your code is ready"),e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>me(null)},e.createElement(Gi,null))),e.createElement("span",{className:"syncify-code syncify-share-code"},e.createElement("code",null,je(L.code)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{rn(je(L.code),"saved-code")}},en==="saved-code"?"Copied":"Copy"),L.link?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{rn(L.link,"saved-link")}},en==="saved-link"?"Copied":"Get link"):null),L.leftOut?e.createElement("p",{className:"syncify-muted"},L.leftOut===1?"1 snippet isn't in Marketplace's list anymore, so it was left out.":`${L.leftOut} snippets aren't in Marketplace's list anymore, so they were left out.`):null):null,kn?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,kn),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Q()}},"Try again"))):null,G&&G.length>0?e.createElement("section",{"aria-label":"Your codes"},e.createElement("h5",{className:"syncify-change-group"},"Your codes"),e.createElement("ul",{className:"syncify-change-list syncify-share-codes"},G.map(d=>{var p;return e.createElement("li",{className:"syncify-setting",key:d.code},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",{className:"syncify-account-email"},(p=d.name)!=null?p:je(d.code)),e.createElement("span",{className:"syncify-muted"},ve===d.code?"Delete it? Its link stops working.":[d.name?je(d.code):null,Dl(d.item_count,"item"),`Used by ${d.imports}`].filter(Boolean).join(" \xB7 "))),e.createElement("span",{className:"syncify-account-actions"},ve===d.code?e.createElement(e.Fragment,null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Le(null),disabled:Oe},"Cancel"),e.createElement("button",{className:"syncify-text-button","data-danger":"true",type:"button",onClick:()=>{vn(d.code)},disabled:Oe},Oe?"Deleting\u2026":"Delete")):e.createElement(e.Fragment,null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{it(d)},disabled:j!==null||Oe},"Update"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{rn(je(d.code),`code:${d.code}`)}},en===`code:${d.code}`?"Copied":"Copy"),d.link?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{rn(d.link,`link:${d.code}`)}},en===`link:${d.code}`?"Copied":"Get link"):null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Le(d.code),disabled:Oe},"Delete"))))}))):null):e.createElement("div",{className:"syncify-setting syncify-share-part"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Share this setup"),e.createElement("span",{className:"syncify-muted"},"Get a code anyone can load")),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:n.onSignIn},"Sign in to share")))}var Ca={in:{mark:"+",label:"Goes in"},out:{mark:"\u2212",label:"Left out"}};function Ml(n){let e=Spicetify.React;return e.createElement("div",{className:"syncify-changes",id:"syncify-share-items"},_a.map(([t,i])=>{let o=n.items.filter(a=>a.type===t).sort((a,s)=>a.name.localeCompare(s.name));return o.length===0?null:e.createElement("section",{key:t,"aria-label":i},e.createElement("h5",{className:"syncify-change-group"},i),e.createElement("ul",{className:"syncify-change-list"},o.map(a=>{let s=n.leftOut.get(a.key),c=s?Ca.out:Ca.in;return e.createElement("li",{className:"syncify-change",key:a.key},e.createElement("span",{className:"syncify-mark","data-change":s?"removed":"added",role:"img","aria-label":c.label},c.mark),e.createElement("span",{className:"syncify-change-name"},a.name,a.repo?e.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",a.repo):null),s?e.createElement(Pa,{check:s}):null)})))}))}function Ll(n){return n instanceof ke?"Sign in to back up.":n instanceof Error?n.message:String(n)}async function Aa(n){var e;try{return await navigator.clipboard.writeText(n),!0}catch(t){let i=(e=Spicetify.Platform)==null?void 0:e.ClipboardAPI;return i!=null&&i.copy?(await i.copy(n),!0):!1}}function Ol(n){return n<=0?"No codes left, delete one to make another":`${n} ${n===1?"code":"codes"} left`}function Dl(n,e){return`${n} ${e}${n===1?"":"s"}`}var Yt=6,Ul=600*1e3,Bl=300,$l=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function Kl(n){let e=n.lastIndexOf("@");return e<1?n:`${n[0]}***${n.slice(e)}`}function Vi(n){let e=hn(new Date(n).toISOString());return e.startsWith("today")?e:`on ${e}`}function Na(n){return`${Math.floor(n/60)}:${String(n%60).padStart(2,"0")}`}function Wi(n){let e=Spicetify.React,t=n.openSection===n.id,i=`syncify-section-${n.id}`;return e.createElement("section",{className:"syncify-accordion-section","aria-label":n.title},e.createElement("button",{className:"syncify-accordion-header",type:"button","aria-expanded":t,"aria-controls":i,onClick:()=>n.onToggle(t?null:n.id)},e.createElement("span",{className:"syncify-accordion-title"},n.title),!t&&n.status?e.createElement("span",{className:"syncify-accordion-status","data-kind":n.status.kind,role:"img","aria-label":n.status.label,title:n.status.label},n.status.kind==="ok"?e.createElement(Fl,null):n.status.kind==="warning"?e.createElement(Yl,null):n.status.kind==="pending"?e.createElement(Ma,null):n.status.kind==="count"?n.status.text:null):null,e.createElement(Sn,null)),t?e.createElement("div",{className:"syncify-accordion-body",id:i},n.children):null)}function Hl(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-shield",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"}))}function Ji(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-warning-icon",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M12 3 2 21h20z"}),n.createElement("path",{d:"M12 10v5"}),n.createElement("path",{d:"M12 18h.01"}))}function jl(n,e,t){return e?{kind:"warning",label:"Sign in to see your backups"}:n?t.kind==="secured"?{kind:"ok",label:"Signed in, backup secured"}:t.kind==="pending"?{kind:"pending",label:"Linking this Spotify account"}:t.kind==="open"||t.kind==="cancelled"?{kind:"warning",label:"Backup not secured yet"}:{kind:"ok",label:"Signed in"}:null}function Fl(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"10"}),n.createElement("path",{d:"m9 12 2 2 4-4"}))}function Yl(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"10"}),n.createElement("path",{d:"M12 8v4"}),n.createElement("path",{d:"M12 16h.01"}))}function Sn(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-chevron",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"m9 6 6 6-6 6"}))}function Wl(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-lock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("rect",{x:"5",y:"11",width:"14",height:"10",rx:"2"}),n.createElement("path",{d:"M8 11V7a4 4 0 0 1 8 0v4"}))}function Ma(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-clock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"9"}),n.createElement("path",{d:"M12 7v5l3 2"}))}function Ia(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-external",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M14 4h6v6"}),n.createElement("path",{d:"M20 4 10 14"}),n.createElement("path",{d:"M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"}))}function Gi(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M18 6 6 18"}),n.createElement("path",{d:"m6 6 12 12"}))}var zl=600*1e3,ql=3,Gl={exists:!1,payload:null,backups:[],safetyCopy:null,claim:null,unapproved:[],install:null},Rl=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function Vl(n,e,t,i){var E;let o=new Set(e),a=new Set(t),s=t.filter(v=>!o.has(v)).length,c=e.filter(v=>!a.has(v)).length,u=(E=n.spicetify_config)!=null?E:null,y=!!(i&&!u),f=!y&&(i&&u?!is(i,u):i!==u),m=[s?`${s} added`:null,c?`${c} removed`:null,f?"Spicetify config changed":null].filter(Boolean),h=hn(n.metadata.last_sync_datetime),S=m.length?`${m.join(", ")} since ${h}`:`Last backup ${h}`;return y?`${S} \xB7 Spicetify config not saved yet`:S}function Ea(n){return n===1?"1 extension or theme":`${n} extensions and themes`}function hn(n){let e=new Date(n);if(Number.isNaN(e.getTime()))return n;let t=e.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),i=new Date,o=new Date(i);return o.setDate(i.getDate()-1),e.toDateString()===i.toDateString()?`today, ${t}`:e.toDateString()===o.toDateString()?`yesterday, ${t}`:`${e.toLocaleDateString(void 0,{month:"short",day:"numeric",year:e.getFullYear()===i.getFullYear()?void 0:"numeric"})}, ${t}`}function La(n){var y;let e=Spicetify.React,t=e.useState,{claim:i}=n,[o,a]=t(!1),[s,c]=t(null);async function u(){a(!0),c(null);try{await Kt(le()),Spicetify.showNotification("Syncify: claim sent for review"),n.onClose()}catch(f){c(f instanceof Error?f.message:String(f)),a(!1)}}return e.createElement("div",{className:"syncify-panel"},e.createElement("p",{className:"syncify-claim-notice"},(y=i.email)!=null?y:"Someone"," is claiming this backup."," ",n.signedIn?i.held?"Syncify is reviewing it.":`It goes through ${Vi(i.final_at)} unless you stop it.`:"If that's you, sign in to finish."),s?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},s):null,e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:n.onClose,disabled:o},"Close"),e.createElement("button",{className:n.signedIn?"syncify-button":"syncify-button secondary",type:"button",onClick:()=>{u()},disabled:o},"Not me"),n.signedIn?null:e.createElement("button",{className:"syncify-button",type:"button",onClick:n.onSignIn,disabled:o},"That's me, sign in")))}var Wt="[Syncify]";function ue(n,e){if(e===void 0){console.debug(Wt,n);return}console.debug(Wt,n,e)}function et(n,e){if(e===void 0){console.warn(Wt,n);return}console.warn(Wt,n,e)}function Jl(){var n;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((n=Spicetify==null?void 0:Spicetify.Topbar)!=null&&n.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var Da="syncify-styles";function Xl(){if(document.getElementById(Da)){ue("Another copy of Syncify is running; stopping this one");return}Zl();let n=le();Xs({topbarButton:Ql(),menuItem:su()}),Ot(n.entryPoint),Li(n.shortcut,Gt),oa({onClaim:e=>{cu(e)},onInstall:lu}).catch(e=>{et("Startup sync check failed",e)}),pa().catch(e=>{et("Restore check failed",e)})}function Zl(){let n=document.createElement("style");n.id=Da,n.textContent=Io,document.head.appendChild(n)}function Ql(){let{extensionName:n}=O(),e=new Spicetify.Topbar.Button(n,si,t=>{ue("Topbar button clicked",zt(t)),Gt()},!1,!0);return Ua(e),tu(e),ru(e),ue("Topbar button registered",zt(e)),e}function Ua(n){var t;let e=n;n.element.style.setProperty("-webkit-app-region","no-drag"),(t=e.button)==null||t.style.setProperty("-webkit-app-region","no-drag")}var Oa=".main-actionButtons",eu=".Root__globalNav, .Root__top-bar",nu=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function tu(n){if(typeof MutationObserver=="undefined")return;let e=!1,t=null,i=()=>{e=!1,a();let s=n.element,c=document.querySelector(Oa);!s||!c||c.contains(s)||(c.prepend(s),iu(n),Ua(n),ue("Topbar button re-attached",zt(n)))},o=new MutationObserver(()=>{e||(e=!0,setTimeout(i,250))}),a=()=>{var u;if(t!=null&&t.isConnected)return;let s=document.querySelector(Oa),c=(u=s==null?void 0:s.closest(eu))!=null?u:s==null?void 0:s.parentElement;if(o.disconnect(),t=c!=null?c:null,!c){o.observe(document.body,{childList:!0,subtree:!0});return}o.observe(c,{childList:!0,subtree:!0});for(let y=c.parentElement;y;y=y.parentElement)o.observe(y,{childList:!0})};i()}function iu(n){let e=ou(n);if(!e||e.className&&e.className!=="undefined")return;let t=Array.from(document.querySelectorAll(nu)).find(i=>!n.element.contains(i));t!=null&&t.className&&(e.className=t.className)}function ou(n){return n.button}function su(){var n;if(typeof((n=Spicetify.Menu)==null?void 0:n.Item)!="function")return null;try{return new Spicetify.Menu.Item(O().extensionName,!1,()=>Gt(),au())}catch(e){return et("Failed to create profile menu item",e),null}}function au(){return si.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function ru(n){Object.assign(window,{SyncifyDebug:{button:n,element:n.element,openModal:Gt,inspect:()=>zt(n),clickElement:()=>{var e;return(e=n.element)==null?void 0:e.click()},clickInnerButton:()=>{var e;return(e=n.button)==null?void 0:e.click()},clickCallback:()=>n.onClick(n)}})}function zt(n){var e,t,i,o,a;return{label:n.label,disabled:n.disabled,isRight:n.isRight,hasElement:!!n.element,elementConnected:(e=n.element)==null?void 0:e.isConnected,elementDisabled:(t=n.element)==null?void 0:t.disabled,elementAriaDisabled:(i=n.element)==null?void 0:i.getAttribute("aria-disabled"),elementClass:(o=n.element)==null?void 0:o.className,appRegion:n.element?getComputedStyle(n.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:n.button?getComputedStyle(n.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:n.element?getComputedStyle(n.element).pointerEvents:null,visibility:n.element?getComputedStyle(n.element).visibility:null,display:n.element?getComputedStyle(n.element).display:null,rect:(a=n.element)==null?void 0:a.getBoundingClientRect().toJSON()}}var K=null;function Gt(){if(K!=null&&K.container.isConnected){ue("Closing modal"),Spicetify.PopupModal.hide();return}ue("Opening modal"),qt(Spicetify.React.createElement(Ri))}async function cu(n){let e=await R().catch(()=>null);K!=null&&K.container.isConnected||(ue("Opening claim notice"),qt(Spicetify.React.createElement(La,{claim:n,signedIn:e!==null,onSignIn:()=>qt(Spicetify.React.createElement(Ri,{section:"account"})),onClose:()=>Spicetify.PopupModal.hide()})))}function lu(n){if(K!=null&&K.container.isConnected)return;ue("Opening install notice");let e=()=>Spicetify.PopupModal.hide();qt(Spicetify.React.createElement("div",{className:"syncify-panel"},Spicetify.React.createElement(Sa,{install:n,onDone:e,onClose:e})))}function qt(n){var t;(t=K==null?void 0:K.root)==null||t.unmount();let e=document.createElement("div");K={container:e,root:null};try{Spicetify.PopupModal.display({title:O().extensionName,content:e,isLarge:!1})}catch(i){throw et("Failed to open PopupModal",i),i}uu(e),yu(e,n)}function uu(n){requestAnimationFrame(()=>{let e=du(n);e==null||e.classList.add("syncify-modal-shell");let t=e==null?void 0:e.querySelector(".main-trackCreditsModal-header h1");if(t&&!t.querySelector(".syncify-modal-mark")){let o=document.createElement("span");o.className="syncify-modal-mark",o.innerHTML=Eo,t.prepend(o)}let i=e==null?void 0:e.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');i&&(i.classList.add("syncify-modal-close"),i.setAttribute("aria-label",`Close ${O().extensionName}`),i.title="Close",i.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function du(n){let e=n.parentElement;for(;e&&e!==document.body;){if(e.querySelector(".main-trackCreditsModal-header"))return e;e=e.parentElement}return n.closest('[class*="trackCreditsModal"]')}function yu(n,e){try{if(typeof Spicetify.ReactDOM.createRoot=="function"){let t=Spicetify.ReactDOM.createRoot(n);t.render(e),(K==null?void 0:K.container)===n&&(K.root=t),ue("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(e,n),ue("Modal rendered",{renderer:"render"})}catch(t){throw et("Failed to render modal",t),t}}fa();(function n(){if(!Jl()){setTimeout(n,100);return}ue("Spicetify APIs ready"),Xl()})();})();
