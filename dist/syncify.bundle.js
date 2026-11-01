// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var br=Object.defineProperty,wr=Object.defineProperties;var xr=Object.getOwnPropertyDescriptors;var Po=Object.getOwnPropertySymbols;var vr=Object.prototype.hasOwnProperty,Cr=Object.prototype.propertyIsEnumerable;var Ao=(n,e,t)=>e in n?br(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,m=(n,e)=>{for(var t in e||(e={}))vr.call(e,t)&&Ao(n,t,e[t]);if(Po)for(var t of Po(e))Cr.call(e,t)&&Ao(n,t,e[t]);return n},v=(n,e)=>wr(n,xr(e));var Mo=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var di=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var Lo=`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="-2.5 -2.5 37 37" aria-hidden="true" focusable="false"><defs><mask id="syncify-mark-gap" maskUnits="userSpaceOnUse" x="-2" y="-2" width="36" height="36"><rect x="-2" y="-2" width="36" height="36" fill="#fff"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></mask></defs><g mask="url(#syncify-mark-gap)"><g transform="rotate(15 16 16)"><path d="M16 16L16 7.4A8.6 8.6 0 0 1 24.6 16Z" fill="#6cd1d1" transform="translate(0.42 -0.42)"/><path d="M16 16L24.6 16A8.6 8.6 0 0 1 16 24.6Z" fill="#efa4c1" transform="translate(0.42 0.42)"/><path d="M16 16L16 24.6A8.6 8.6 0 0 1 7.4 16Z" fill="#d3c48c" transform="translate(-0.42 0.42)"/><path d="M16 16L7.4 16A8.6 8.6 0 0 1 16 7.4Z" fill="#88bcf2" transform="translate(-0.42 -0.42)"/></g></g><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 28.03A12.4 12.4 0 1 1 28.03 19"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91"/></g></svg>
`;var _r="syncify",mn="state";function yi(){let n;try{n=window.indexedDB}catch(e){return Promise.resolve(null)}return n?new Promise(e=>{let t;try{t=n.open(_r,1)}catch(i){e(null);return}t.onupgradeneeded=()=>{t.result.createObjectStore(mn)},t.onerror=()=>e(null),t.onblocked=()=>e(null),t.onsuccess=()=>e(t.result)}):Promise.resolve(null)}function fi(n,e){let t=yi().then(i=>new Promise((o,a)=>{if(!i){a(new Error("IndexedDB isn't available."));return}try{let s=i.transaction(mn,n),c=e(s.objectStore(mn));s.oncomplete=()=>{i.close(),o(c.result)},s.onerror=s.onabort=()=>{var u;i.close(),a((u=s.error)!=null?u:new Error("IndexedDB failed."))}}catch(s){i.close(),a(s)}}));return Promise.race([t,new Promise((i,o)=>setTimeout(()=>o(new Error("IndexedDB took too long.")),2e3))])}function gn(n){return fi("readonly",e=>e.get(n))}async function hn(n,e){await fi("readwrite",t=>t.put(e,n))}async function Do(n){await fi("readwrite",e=>e.delete(n))}var Le={extensionName:"Syncify",version:"1.14.0",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com",shareUrl:"https://syncs.wsoltani.com"};function U(){var e,t,i,o,a,s,c,u,d;let n=window.SyncifyConfig;return{extensionName:(e=He(n==null?void 0:n.extensionName))!=null?e:Le.extensionName,version:(t=Oo(n==null?void 0:n.version))!=null?t:Le.version,workerUrl:(i=He(n==null?void 0:n.workerUrl))!=null?i:Le.workerUrl,webUrl:(o=He(n==null?void 0:n.webUrl))!=null?o:Le.webUrl,githubUrl:(a=He(n==null?void 0:n.githubUrl))!=null?a:Le.githubUrl,kofiUrl:(s=He(n==null?void 0:n.kofiUrl))!=null?s:Le.kofiUrl,issueUrl:(c=He(n==null?void 0:n.issueUrl))!=null?c:Le.issueUrl,releasesUrl:(u=He(n==null?void 0:n.releasesUrl))!=null?u:Le.releasesUrl,shareUrl:(d=He(n==null?void 0:n.shareUrl))!=null?d:Le.shareUrl}}function He(n){return Oo(n)}function Oo(n){return typeof n=="string"&&n.trim()?n.trim():null}var Tr="x-syncify-version",Pr="x-syncify-install",Ar="x-syncify-timezone",Uo="install-id",Bo="syncify:install-id",Mr=2e3,ht=null;async function $o(){let n={[Tr]:U().version,[Pr]:(await pi()).id},e=Or();return e&&(n[Ar]=e),n}function pi(){return ht!=null||(ht=Lr().catch(()=>({id:St(),inDatabase:!1}))),ht}async function Lr(){let n=await Promise.race([Dr(),new Promise(e=>setTimeout(()=>e(null),Mr))]);if(n)return{id:n,inDatabase:!0};try{let e=window.localStorage.getItem(Bo);if(e&&Ko(e))return{id:e,inDatabase:!1};let t=St();return window.localStorage.setItem(Bo,t),{id:t,inDatabase:!1}}catch(e){return{id:St(),inDatabase:!1}}}async function Dr(){let n=await yi();return n?new Promise(e=>{let t=null;try{let i=n.transaction(mn,"readwrite"),o=i.objectStore(mn),a=o.get(Uo);a.onsuccess=()=>{if(typeof a.result=="string"&&Ko(a.result)){t=a.result;return}t=St(),o.put(t,Uo)},i.oncomplete=()=>{n.close(),e(t)},i.onerror=i.onabort=()=>{n.close(),e(null)}}catch(i){n.close(),e(null)}}):null}function St(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let n=crypto.getRandomValues(new Uint8Array(16));n[6]=n[6]&15|64,n[8]=n[8]&63|128;let e=[...n].map(t=>t.toString(16).padStart(2,"0"));return[e.slice(0,4).join(""),e.slice(4,6).join(""),e.slice(6,8).join(""),e.slice(8,10).join(""),e.slice(10).join("")].join("-")}function Ko(n){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(n)}function Or(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(n){return null}}var Ur="syncify-signature-v1",Br={name:"ECDSA",hash:"SHA-256"};function kt(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function bt(n){return mi(new Uint8Array(await crypto.subtle.exportKey("raw",n)))}async function Dn(n,e,t,i,o){let a=await $r(e,t,i,o),s=await crypto.subtle.sign(Br,n,a);return mi(new Uint8Array(s))}async function $r(n,e,t,i){let{pathname:o,search:a}=new URL(t),s=new TextEncoder,c=mi(new Uint8Array(await crypto.subtle.digest("SHA-256",s.encode(i))));return s.encode([Ur,n,e.toUpperCase(),o+a,c].join(`
`))}function mi(n){let e="";for(let t=0;t<n.length;t++)e+=String.fromCharCode(n[t]);return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var Ho="device-key",gi="session",jo="salt",Xe=null,On,Fo={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function Sn(n){if(Xe)return Xe;let e=await gn(Ho);return Kr(e)?(Xe=Promise.resolve(e),e):n?(Xe=kt().then(async t=>(await hn(Ho,t),t)),Xe.catch(()=>{Xe=null}),Xe):null}async function R(){let n=await gn(gi);return Hr(n)?n:null}function hi(n){return hn(gi,n)}async function Ze(){await Do(gi).catch(()=>{})}async function wt(){if(On===void 0){let n=await gn(jo).catch(()=>{});On=typeof n=="string"?n:null}return On}async function xt(n){n!==On&&(On=n,await hn(jo,n).catch(()=>{}))}function vt(){return Fo}function Yo(n){Fo=n}function Kr(n){let e=n;return!!(e&&e.privateKey instanceof CryptoKey&&e.publicKey instanceof CryptoKey)}function Hr(n){let e=n;return!!(e&&typeof e.token=="string"&&e.token&&typeof e.email=="string")}var Wo="install-key",kn=null;function zo(){return kn!=null||(kn=jr()),kn.catch(()=>{kn=null}),kn.catch(()=>null)}async function jr(){if(!(await pi()).inDatabase)return null;let n=await gn(Wo),e=Yr(n)?n:await Fr();return{privateKey:e.privateKey,publicKey:await bt(e.publicKey)}}async function Fr(){let n=await kt();return await hn(Wo,n),n}function Yr(n){let e=n;return!!(e&&e.privateKey instanceof CryptoKey&&e.publicKey instanceof CryptoKey)}var Wr="/api/auth/email-otp/send-verification-otp",zr="/api/auth/sign-in/email-otp",qr="/api/auth/get-session",Gr="/api/auth/sign-out",Vr="/api/auth/link",Jr="x-syncify-device-key",Rr="x-syncify-signature",qo="x-syncify-salt",Xr="none",Zr={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again.",link_failed:"Couldn't open the website. Try again."},x=class extends Error{constructor(t,i=null,o=null){var a;super((a=Zr[t])!=null?a:"Sign-in failed. Try again.");this.code=t;this.retryAfter=i;this.share=o;this.name="AccountError"}};function Qe(n){return n instanceof x?n.message:"Sign-in failed. Try again."}async function Go(n,e={}){let t=await Bn(Wr,{method:"POST",body:JSON.stringify(m({email:n,type:"sign-in"},e.nudge?{nudge:!0}:{}))});return typeof(t==null?void 0:t.resend_in)=="number"?t.resend_in:60}async function Vo(n,e){var a;let t=await Sn(!0).catch(()=>{throw new x("no_device_key")}),i=await Bn(zr,{method:"POST",body:JSON.stringify({email:n,otp:e}),keys:t,sendPublicKey:!0});if(typeof(i==null?void 0:i.token)!="string"||!i.token)throw new x("sign_in_failed");let o={token:i.token,email:typeof((a=i.user)==null?void 0:a.email)=="string"?i.user.email:n};return await hi(o).catch(()=>{throw new x("no_device_key")}),Si=!0,o}var Si=!1;async function Jo(){var e;let n=await R();if(!n||Si)return n;try{let t=await Ct(n,qr,"GET");Si=!0;let i=(e=t==null?void 0:t.user)==null?void 0:e.email;if(typeof i!="string"||i===n.email)return n;let o=v(m({},n),{email:i});return await hi(o).catch(()=>{}),o}catch(t){if(t instanceof x&&t.code==="signed_out")return null;throw t}}async function Ro(){let n=await R().catch(()=>null);n&&await Ct(n,Gr,"POST").catch(()=>{}),await Ze()}async function Xo(){let n=await R();if(!n)throw new x("signed_out");let e=await Ct(n,Vr,"POST"),t=typeof(e==null?void 0:e.url)=="string"?e.url:"",i=new URL(U().webUrl).origin;if(!t.startsWith(`${i}/link#`))throw new x("link_failed");return t}async function Un(n,e,t){let i=await R();if(!i)throw new x("signed_out");return Ct(i,n,e,t)}async function Zo(n,e,t){let i=await R().catch(()=>null),o=i?await Sn(!1).catch(()=>null):null;await Bn(n,m({method:"POST",body:JSON.stringify(e),headers:t,keepalive:!0},i&&o?{token:i.token,keys:o}:{}))}async function Ct(n,e,t,i){let o=await Sn(!1);if(!o)throw await Ze(),new x("signed_out");return Bn(e,m({method:t,token:n.token,keys:o},i===void 0?{}:{body:JSON.stringify(i)}))}async function Bn(n,e,t=!1){var g,h,S;let i=`${U().webUrl.replace(/\/+$/,"")}${n}`,o=m({},e.headers);if(e.body!==void 0&&(o["content-type"]="application/json"),e.token&&(o.authorization=`Bearer ${e.token}`),e.keys){let I=(g=await wt())!=null?g:Xr;o[qo]=I,o[Rr]=await Dn(e.keys.privateKey,I,e.method,i,(h=e.body)!=null?h:""),e.sendPublicKey&&(o[Jr]=await bt(e.keys.publicKey))}let a;try{a=await fetch(i,{method:e.method,headers:o,body:e.body,keepalive:e.keepalive})}catch(I){throw new x("offline")}let s=a.headers.get(qo);s&&await xt(s);let c=await a.json().catch(()=>null);if(a.ok)return c;let u=typeof(c==null?void 0:c.code)=="string"?c.code:a.status===503?"unavailable":"failed";if(u==="stale_salt"&&e.keys&&!t)return Bn(n,e,!0);u==="signed_out"&&await Ze();let d=Number(a.headers.get("retry-after")),f=c==null?void 0:c.share;throw new x(u,Number.isFinite(d)&&d>0?d:(S=Qr[u])!=null?S:null,typeof(f==null?void 0:f.code)=="string"?{code:f.code,link:typeof f.link=="string"?f.link:null}:null)}var Qr={resend_wait:60,too_many_requests:60,send_failed:60};var ec="x-syncify-user-hash",nc="x-syncify-identity",tc="x-syncify-signature",ic="x-syncify-install-key",oc="x-syncify-install-signature",ki="x-syncify-salt",sc="none",ac="/restores",rc="/installs",cc="hash",Qo=3,$n=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}},be=class extends Error{constructor(t){super(t==="not_linked"?"Couldn't read that Spotify account's backups.":"Sign in to restore this backup.");this.code=t;this.name="LockedError"}},en=class extends Error{constructor(){super("This Spotify account doesn't accept backups from this install. Sign in to back up."),this.name="InstallRefusedError"}};async function ns(n,e,t){var a;let i=await je(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(t)});if(i.status===403&&((a=await i.json().catch(()=>null))==null?void 0:a.code)==="install_refused")throw new en;if(!i.ok)throw new Error(`Backup failed with HTTP ${i.status}.`);let o=await i.json().catch(()=>null);return{unchanged:(o==null?void 0:o.unchanged)===!0,unapproved:(o==null?void 0:o.quarantined)===!0}}async function ts(n,e,t,i){let o=await je(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({install:t,action:i})},rc);if(o.ok)return;let a=await o.json().catch(()=>null);if((a==null?void 0:a.code)!=="not_pending")throw new Error(`Couldn't answer with HTTP ${o.status}.`)}async function bi(n,e,t){var S,I,w,T;let i=await je(n,e,{method:"GET"},os("/",t));if(i.status===404){let E=await i.json().catch(()=>null);return{exists:!1,payload:null,backups:[],safetyCopy:null,claim:Kn(E==null?void 0:E.claim),unapproved:[],install:es(E==null?void 0:E.install),nudge:!1}}if(!i.ok)throw new Error(`Restore failed with HTTP ${i.status}.`);let o=await i.json(),a=Kn(o.claim),s=es(o.install),c=o.nudge===!0;delete o.claim,delete o.install,delete o.nudge;let u=[o,...(S=o.backup_history)!=null?S:[]];if(!u.every(E=>E.backup))return{exists:!0,payload:o,backups:u.slice(0,Qo),safetyCopy:(I=u[Qo])!=null?I:null,claim:a,unapproved:[],install:s,nudge:c};let d=u.filter(E=>{var C;return((C=E.backup)==null?void 0:C.kind)==="rolling"}),f=(w=u.find(E=>{var C;return((C=E.backup)==null?void 0:C.kind)==="anchor"}))!=null?w:null,g=u.filter(E=>{var C;return((C=E.backup)==null?void 0:C.kind)==="quarantined"}),h=(T=d[0])!=null?T:f;return h?d.length===0&&f?{exists:!0,payload:h,backups:[f],safetyCopy:null,claim:a,unapproved:g,install:s,nudge:c}:{exists:!0,payload:h,backups:d,safetyCopy:f,claim:a,unapproved:g,install:s,nudge:c}:{exists:!1,payload:null,backups:[],safetyCopy:null,claim:a,unapproved:g,install:s,nudge:c}}async function is(n,e,t,i){try{await je(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:t}),keepalive:!0},os(ac,i))}catch(o){}}async function je(n,e,t,i="",o=!1){var w,T,E,C,fe;let a=i?`${n.replace(/\/+$/,"")}${i}`:n,s=(w=t.method)!=null?w:"GET",c=await R().catch(()=>null),u=c?await Sn(!1).catch(()=>null):null,d=await zo(),f={},g=(T=await wt())!=null?T:sc;c&&u&&(f.authorization=`Bearer ${c.token}`,f[ki]=g,f[tc]=await Dn(u.privateKey,g,s,a,(E=t.body)!=null?E:"")),d&&(f[ki]=g,f[ic]=d.publicKey,f[oc]=await Dn(d.privateKey,g,s,a,(C=t.body)!=null?C:""));let h=await fetch(a,v(m({},t),{headers:m(v(m(m({},t.headers),await $o()),{[ec]:e.hash,[nc]:e.field}),f)})),S=h.headers.get(ki);if(S&&await xt(S),h.status===426)throw new $n;if(h.status!==401)return h;let I=(fe=await h.clone().json().catch(()=>null))==null?void 0:fe.code;if(!o){if(I==="stale_salt"&&(c||d))return je(n,e,t,i,!0);if(I==="signed_out"&&c)return await Ze(),je(n,e,t,i,!0)}throw I==="claimed"||I==="not_owner"||I==="not_linked"?new be(I):(I==="signed_out"&&await Ze(),new x(typeof I=="string"?I:"failed"))}function os(n,e){return e?`${n}?${cc}=${encodeURIComponent(e)}`:n}function es(n){let e=n;if(!e||typeof e.trust!="string")return null;let t=Array.isArray(e.waiting)?e.waiting:[];return{trusted:e.trust!=="pending"&&e.trust!=="rejected",refused:e.trust==="rejected",waiting:t.flatMap(i=>{let o=i;return o&&typeof o.id=="string"&&typeof o.first_seen_at=="number"?[{id:o.id,device:typeof o.device=="string"?o.device:null,first_seen_at:o.first_seen_at}]:[]})}}function Kn(n){let e=n;return!e||typeof e.mine!="boolean"?null:e.status==="final"?{status:"final",mine:e.mine}:e.status!=="pending"||typeof e.final_at!="number"?null:m({status:"pending",mine:e.mine,email:typeof e.email=="string"?e.email:null,final_at:e.final_at,held:e.held===!0},e.waiting===!0?{waiting:!0}:{})}async function Nt(n){let e=new TextEncoder().encode(n),t=await crypto.subtle.digest("SHA-256",e);return[...new Uint8Array(t)].map(i=>i.toString(16).padStart(2,"0")).join("")}function Hn(n){return JSON.stringify(wi(n))}function wi(n){return Array.isArray(n)?n.map(wi):n&&typeof n=="object"?Object.keys(n).sort().reduce((e,t)=>(e[t]=wi(n[t]),e),{}):n}function ss(){let n=navigator.userAgent;return/Windows/i.test(n)?"Windows":/Mac OS|Macintosh/i.test(n)?"macOS":/Linux/i.test(n)?"Linux":n}var lc=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,uc=100,dc="marketplace:installed-extensions",yc="marketplace:installed-themes",fc="marketplace:theme-installed",pc="marketplace:installed:",mc="marketplace";function vi(n){return Spicetify.Config?Ci(Spicetify.Config,n):null}function Ci(n,e){var a;let t=Fe(n),i=new Set(gc(e)),o=((a=e[fc])==null?void 0:a.includes(pc))===!0;return{current_theme:o?mc:t.current_theme,color_scheme:o?"":t.color_scheme,extensions:t.extensions.filter(s=>!i.has(s)),custom_apps:t.custom_apps}}function Fe(n){let e=n&&typeof n=="object"?n:{};return{current_theme:xi(e.current_theme)?e.current_theme:"",color_scheme:xi(e.color_scheme)?e.color_scheme:"",extensions:as(e.extensions),custom_apps:as(e.custom_apps)}}function ls(n,e){return Hn(Fe(n))===Hn(Fe(e))}function as(n){return Array.isArray(n)?[...new Set(n.filter(xi))].sort().slice(0,uc):[]}function xi(n){return typeof n=="string"&&lc.test(n)}function gc(n){let e=rs(n[dc]).map(i=>{var a;let o=(a=cs(n[i]))==null?void 0:a.manifest;return o&&typeof o=="object"?o.main:void 0}),t=rs(n[yc]).flatMap(i=>{var a;let o=(a=cs(n[i]))==null?void 0:a.include;return Array.isArray(o)?o:[]});return[...e,...t].flatMap(i=>{let o=typeof i=="string"?i.split("/").pop():void 0;return o?[o]:[]})}function rs(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function cs(n){try{let e=n?JSON.parse(n):null;return e&&typeof e=="object"&&!Array.isArray(e)?e:null}catch(e){return null}}var hc=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],Sc="marketplace:installed:",us=`${Sc}snippet:`,kc="wsoltani/syncify",bc="marketplace",ds={added:0,removed:1,unchanged:2};function X(n){let e=new Map;for(let[t,i]of hc)for(let o of Cc(n[t]))e.has(o)||e.set(o,xc(o,i,n[o]));return[...e.values()]}function jn(n,e,t,i){let o=new Set(n.map(u=>u.key)),a=new Map(t.map(u=>[u.key,u])),s=[...n.map(u=>{let d=a.get(u.key);return v(m({},u),{change:d?"unchanged":"added",isNew:!d||d.sources.join(" ")!==u.sources.join(" ")})}),...t.filter(u=>!o.has(u.key)).map(u=>v(m({},u),{change:Fn(u,n)?"unchanged":"removed",isNew:!1}))].sort((u,d)=>ds[u.change]-ds[d.change]||u.name.localeCompare(d.name)),c={added:0,removed:0,unchanged:0};for(let u of s)c[u.change]+=1;return{items:s,counts:c,manual:wc(e,i)}}function Fn(n,e){return n.type==="extension"&&Et(n)&&!e.some(Et)}function Et(n){var e;return((e=n.repo)==null?void 0:e.toLowerCase())===kc}function wc(n,e){if(!n)return[];let t=Fe(n),i=Fe(e),o=[...t.extensions.filter(s=>!i.extensions.includes(s)).map(s=>({type:"extension",name:s})),...t.custom_apps.filter(s=>!i.custom_apps.includes(s)).map(s=>({type:"custom_app",name:s}))],a=t.current_theme;return a&&a!==bc&&(a!==i.current_theme||t.color_scheme!==i.color_scheme)&&o.push(m({type:"theme",name:a},t.color_scheme?{scheme:t.color_scheme}:{})),o}function xc(n,e,t){var u,d;let i=ys(t),o=ys(i==null?void 0:i.manifest),a=It(i==null?void 0:i.user),s=It(i==null?void 0:i.repo),c=(d=(u=It(i==null?void 0:i.title))!=null?u:It(o==null?void 0:o.name))!=null?d:n.startsWith(us)?n.slice(us.length):n.split("/").pop()||n;return{key:n,type:e,name:c,repo:e!=="snippet"&&a&&s?`${a}/${s}`:null,sources:vc(e,i),custom:e==="snippet"&&(i==null?void 0:i.custom)===!0}}function vc(n,e){return e?(n==="extension"?[e.extensionURL]:n==="theme"?[e.cssURL,e.schemesURL,...Array.isArray(e.include)?e.include:[]]:[]).filter(i=>typeof i=="string"&&i!==""):[]}function It(n){return typeof n=="string"&&n.trim()?n.trim():null}function Cc(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function ys(n){let e=n;if(typeof n=="string")try{e=JSON.parse(n)}catch(t){return null}return e&&typeof e=="object"&&!Array.isArray(e)?e:null}var _t="spicetify-marketplace";var Yn="settings";async function fs(){let n=await gs();if(n.kind!=="ok")return null;try{let e=await hs(n.db,"readonly",i=>i.getAll());if(!e)return null;let t={};for(let i of e)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(t[i.key]=i.value);return t}finally{n.db.close()}}async function ps(n,e=[]){let t=await gs();if(t.kind==="unavailable")return"unavailable";let i=t.kind==="ok"?t.db:await Nc();if(!i)return"failed";try{return await hs(i,"readwrite",a=>{let s;for(let[c,u]of Object.entries(n))s=a.put({key:c,value:u});for(let c of e)s=a.delete(c);return s})===null?"failed":"written"}finally{i.close()}}function ms(){var n;try{return(n=window.indexedDB)!=null?n:null}catch(e){return null}}async function gs(){let n=ms();return n?await Ic(n)?{kind:"missing"}:new Promise(e=>{let t=!1,i=n.open(_t);i.onupgradeneeded=()=>{t=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),e({kind:"unavailable"})},i.onblocked=()=>e({kind:"unavailable"}),i.onsuccess=()=>{let o=i.result;if(t){o.close(),Ec(n).then(()=>e({kind:"missing"}));return}if(!o.objectStoreNames.contains(Yn)){o.close(),e({kind:"unavailable"});return}e({kind:"ok",db:o})}}):{kind:"unavailable"}}function Nc(){let n=ms();return n?new Promise(e=>{let t=n.open(_t,1);t.onupgradeneeded=()=>{let i=t.result;i.objectStoreNames.contains(Yn)||i.createObjectStore(Yn,{keyPath:"key"})},t.onerror=()=>{console.warn("Syncify could not create Marketplace storage",t.error),e(null)},t.onblocked=()=>e(null),t.onsuccess=()=>e(t.result)}):Promise.resolve(null)}async function Ic(n){if(typeof n.databases!="function")return!1;try{return!(await n.databases()).some(t=>t.name===_t)}catch(e){return!1}}function Ec(n){return new Promise(e=>{let t=n.deleteDatabase(_t);t.onsuccess=()=>e(),t.onerror=()=>e(),t.onblocked=()=>e()})}function hs(n,e,t){return new Promise(i=>{let o;try{o=n.transaction(Yn,e)}catch(d){console.warn("Syncify could not open a Marketplace transaction",d),i(null);return}let a,s=!1,c=d=>{s||(s=!0,i(d))};o.oncomplete=()=>c(a),o.onerror=()=>{console.warn("Syncify Marketplace transaction failed",o.error),c(null)},o.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",o.error),c(null)};let u;try{u=t(o.objectStore(Yn))}catch(d){console.warn("Syncify Marketplace request could not be issued",d),c(null);return}u&&(u.onsuccess=()=>{a=u.result},u.onerror=()=>{console.warn("Syncify Marketplace request failed",u.error),c(null)})})}var Ni="marketplace:",Pt=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function de(){let n=Uc(),e=await fs();if(e)for(let[t,i]of Object.entries(e))t.startsWith(Ni)&&(n[t]=i);return n}var Tc=new Set(["marketplace:active-tab","marketplace:sort"]),Ii="marketplace:installed:",Tt="marketplace:theme-installed",Pc=["stars","tags","lastUpdated","created"];async function At(n,e){let t={};for(let[i,o]of Object.entries(n))Tc.has(i)||(t[i]=i.startsWith(Ii)?Ac(o):o);return e&&(t.spicetify_config=Fe(e)),Nt(Hn(t))}function Ac(n){try{let e=JSON.parse(n);if(!e||typeof e!="object"||Array.isArray(e))return n;for(let t of Pc)delete e[t];return e}catch(e){return n}}async function Mt(){let n=await de(),e=vi(n);return{keyCount:Object.keys(n).length,hash:await At(n,e),installedItemCount:Dc(n),installedItems:Lt(n),items:X(n),spicetifyConfig:e,marketplaceAvailable:Oc(n),activeTheme:Wn(n[Tt])}}function Wn(n){if(!n)return null;if(n.startsWith(Ii))return n;try{let e=JSON.parse(n);return typeof e=="string"?e:null}catch(e){return null}}async function Ss(){let n=await de(),e=vi(n);return m({schema_version:2,metadata:{last_sync_datetime:new Date().toISOString(),device_info:ss(),marketplace_key_count:Object.keys(n).length},payload_hash:await At(n,e),marketplace_data:{keys:n}},e?{spicetify_config:e}:{})}async function ks(n,e=[]){var a,s;let t={},i=(s=(a=n.marketplace_data)==null?void 0:a.keys)!=null?s:{};for(let[c,u]of Object.entries(i))c.startsWith(Ni)&&(t[c]=u);if(Object.keys(t).length===0)return 0;await Mc(t),e.length>0&&await Lc(t,e);let o=_i(await de(),t);return await Ei(t,o),Object.keys(t).length}async function Ei(n,e=[]){for(let[i,o]of Object.entries(n))window.localStorage.setItem(i,o);for(let i of e)window.localStorage.removeItem(i);if(await ps(n,e)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try again.")}function _i(n,e){let t=new Set(Pt.flatMap(s=>{var c;return Dt((c=e[s])!=null?c:n[s]).map(String)})),i=Lt(n).filter(s=>s.startsWith(Ii)&&!t.has(s)),o=i.filter(s=>n[s]!==void 0&&e[s]===void 0),a=n[Tt];return a&&e[Tt]===void 0&&i.some(s=>a.includes(s))&&o.push(Tt),o}async function Mc(n){let e=await de(),t=X(n),i=X(e).filter(s=>Fn(s,t));if(i.length===0)return;let o="marketplace:installed-extensions",a=Dt(n[o]).map(String);for(let s of i)a.includes(s.key)||a.push(s.key),n[s.key]=e[s.key];n[o]=JSON.stringify(a)}async function Lc(n,e){let t=await de(),i=Lt(t);for(let o of Pt){if(n[o]===void 0)continue;let a=Dt(n[o]).map(String).filter(s=>!e.includes(s)||i.includes(s));n[o]=JSON.stringify(a)}for(let o of e)t[o]!==void 0?n[o]=t[o]:delete n[o]}function Dc(n){return Lt(n).length}function Lt(n){return Pt.flatMap(e=>Dt(n[e]).map(String))}function Oc(n){return!!(window.Marketplace||Pt.some(t=>n[t]!==void 0)||n["marketplace:tabs"]!==void 0)}function bs(n,e){return e===0?!1:n===0?!0:n<Math.max(2,Math.floor(e*.5))}function Uc(){let n={};for(let e=0;e<window.localStorage.length;e+=1){let t=window.localStorage.key(e);if(!(t!=null&&t.startsWith(Ni)))continue;let i=window.localStorage.getItem(t);i!==null&&(n[t]=i)}return n}function Dt(n){if(!n)return[];try{let e=JSON.parse(n);return Array.isArray(e)?e:[]}catch(e){return[]}}var Bc="raw.githubusercontent.com",$c="cdn.jsdelivr.net",ws=".github.io";function Pi(n){var t;if(n.protocol!=="https:")return null;let e=n.pathname.split("/").filter(Boolean);if(n.host===Bc)return Ti(e[0],e[1]);if(n.host===$c)return e[0]==="gh"?Ti(e[1],(t=e[2])==null?void 0:t.split("@")[0]):null;if(n.host.endsWith(ws)){let i=n.host.slice(0,-ws.length);return i.includes(".")?null:Ti(i,e.length>1?e[0]:n.host)}return null}function Ti(n,e){return n&&e?`${n}/${e}`:null}var Kc={extension:"spicetify-extensions",theme:"spicetify-themes"},Hc="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",jc="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",Fc="https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/",Yc="https://api.github.com/repos",Wc=5e3,zc=20,xs="syncify:repo-topics",vs=10080*60*1e3,qc=200;function Ye(n){return(n==null?void 0:n.kind)==="host"||(n==null?void 0:n.kind)==="repo"||(n==null?void 0:n.kind)==="blocked"||(n==null?void 0:n.kind)==="catalog"}function Gn(n){let e=new Map;for(let t of n){if(t.change==="removed")continue;if(t.custom){e.set(t.key,{kind:"custom"});continue}let i=Gc(t);i&&e.set(t.key,i)}return e}async function Vn(n,e){let t=new Map,i=n.filter(s=>s.change!=="removed"&&s.isNew&&!e.has(s.key));if(i.length===0)return t;let o=i.filter(s=>s.type==="snippet"),a=i.filter(s=>s.type!=="snippet");if(o.length>0){let s=await Ai();for(let c of o)s?Ot(s,c.name)||t.set(c.key,{kind:"catalog"}):t.set(c.key,{kind:"unchecked"})}if(a.length>0){let s=await Rc(),c=Qc(),u=0;await Promise.all(a.map(async d=>{let f=Vc(d),g=Kc[d.type];if(!f||!g)return;if(s===null){t.set(d.key,{kind:"unchecked"});return}if(Jc(f,s)){t.set(d.key,{kind:"blocked"});return}let h=Zc(c,f);h===void 0&&u<zc&&(u+=1,h=await Xc(f),h!==void 0&&(c[f.toLowerCase()]={topics:h,at:Date.now()})),h===void 0?t.set(d.key,{kind:"unchecked"}):(h===null||!h.includes(g))&&t.set(d.key,{kind:"catalog"})})),el(c)}return t}function Gc(n){let e=null;for(let t of n.sources){let i;try{i=new URL(t)}catch(a){return{kind:"host",host:t.slice(0,40)}}let o=Pi(i);if(!o)return{kind:"host",host:i.host};n.repo&&o.toLowerCase()!==n.repo.toLowerCase()&&(e!=null||(e=o))}return e?{kind:"repo",repo:e}:null}function Vc(n){for(let e of n.sources)try{let t=Pi(new URL(e));if(t)return t}catch(t){}return n.repo}function Jc(n,e){let t=`https://github.com/${n}`.toLowerCase();return e.some(i=>{let o=i.toLowerCase();if(!o.includes("*"))return o===t;let a=o.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${a}$`).test(t)})}function Cs(n){return n.replace(/\n/g,"").trim().toLowerCase()}function Ot(n,e){return n.get(Cs(e))}var zn=null,qn=null;function Rc(){return zn!=null||(zn=Ns(Hc).then(n=>{let e=n==null?void 0:n.repos;return Array.isArray(e)?e.filter(t=>typeof t=="string"&&!t.startsWith("//")):(zn=null,null)})),zn}function Ai(){return qn!=null||(qn=Ns(jc).then(n=>{if(!Array.isArray(n))return qn=null,null;let e=new Map;for(let t of n){if(typeof(t==null?void 0:t.title)!="string"||typeof t.code!="string")continue;let i=typeof t.preview=="string"?t.preview:null;e.set(Cs(t.title),m({title:t.title,code:t.code,description:typeof t.description=="string"?t.description:""},i?{imageURL:i.startsWith("http")?i:`${Fc}${i}`}:{}))}return e})),qn}async function Xc(n){let e=await Is(`${Yc}/${n}`);if((e==null?void 0:e.status)===404)return null;if(!(e!=null&&e.ok))return;let t=await e.json().catch(()=>null);return Array.isArray(t==null?void 0:t.topics)?t.topics.filter(i=>typeof i=="string"):void 0}async function Ns(n){let e=await Is(n);return e!=null&&e.ok?e.json().catch(()=>null):null}async function Is(n){let e=typeof AbortController=="function"?new AbortController:null,t=setTimeout(()=>e==null?void 0:e.abort(),Wc);try{return await fetch(n,{signal:e==null?void 0:e.signal})}catch(i){return null}finally{clearTimeout(t)}}function Zc(n,e){let t=n[e.toLowerCase()];return t&&Date.now()-t.at<vs?t.topics:void 0}function Qc(){var n;try{let e=JSON.parse((n=localStorage.getItem(xs))!=null?n:"{}");return e&&typeof e=="object"?e:{}}catch(e){return{}}}function el(n){let e=Date.now(),t=Object.entries(n).filter(([,i])=>e-i.at<vs).sort(([,i],[,o])=>o.at-i.at).slice(0,qc);try{localStorage.setItem(xs,JSON.stringify(Object.fromEntries(t)))}catch(i){}}var nl=/^[0-9A-HJKMNP-TV-Z]{6}$/,tl=6,il="SYN-",Ps=60,Mi=20,As=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],ol="marketplace:installed:",Ld=`${ol}snippet:`,nn="marketplace:theme-installed",Es="marketplace",_s={added:0,removed:1,unchanged:2},sl=new RegExp(`^[a-z0-9][a-z0-9_-]{1,${Mi-2}}[a-z0-9]$`);function Ms(n){let e=n.trim().replace(/^@/,"").toLowerCase();return/[^a-z0-9_-]/.test(e)?"Only letters, digits, _ and -":e.length<3?"At least 3 characters":!/^[a-z0-9]/.test(e)||!/[a-z0-9]$/.test(e)?"Start and end with a letter or digit":null}function We(n){return`${il}${n}`}function Ls(n){let e=n.trim();if(e.length>200)return null;if(e.includes("/")){let i=e.split(/[?#]/)[0].replace(/\/+$/,"");e=i.slice(i.lastIndexOf("/")+1).replace(/\.json$/i,"")}e=e.toUpperCase().replace(/[\s-]/g,""),e.length===tl+3&&e.startsWith("SYN")&&(e=e.slice(3));let t=e.replace(/O/g,"0").replace(/[IL]/g,"1");return nl.test(t)?t:null}function Ds(n){let e=n;return!e||typeof e.code!="string"||!e.keys||typeof e.keys!="object"||!Object.values(e.keys).every(t=>typeof t=="string")?null:{code:e.code,name:typeof e.name=="string"&&e.name?e.name:null,creator:typeof e.creator=="string"&&sl.test(e.creator)?e.creator:null,updated_at:typeof e.updated_at=="number"?e.updated_at:0,keys:e.keys}}async function Os(n,e){let t=n.filter(s=>!Et(s)).map(s=>v(m({},s),{change:"added",isNew:!0})),i=Gn(t);for(let s of t)!i.has(s.key)&&!al(s,e[s.key])&&i.set(s.key,{kind:"catalog"});let o=await Vn(t,i),a=new Map;for(let[s,c]of[...o,...i])c.kind!=="unchecked"&&a.set(s,c);return{items:t,leftOut:a}}function al(n,e){if(n.type==="snippet")return!0;if(!n.repo)return!1;let t=ll(e);return n.type==="extension"?typeof(t==null?void 0:t.extensionURL)=="string"&&t.extensionURL!=="":typeof(t==null?void 0:t.cssURL)=="string"&&t.cssURL!==""}function Us(n,e){let t={};for(let[o,a]of As){let s=e.filter(c=>c.type===a&&n[c.key]!==void 0).map(c=>c.key);t[o]=JSON.stringify(s);for(let c of s)t[c]=n[c]}let i=Wn(n[nn]);return i&&e.some(o=>o.key===i)&&(t[nn]=n[nn]),t}function Bs(n,e,t,i,o,a){let s=a==="replace"?jn(e,void 0,t,i):rl(e,t),c=Wn(n.keys[nn]),u=c!==null&&e.some(f=>f.key===c)&&i!==null&&i.current_theme!==Es,d=c!==null&&c!==o?e.find(f=>f.key===c):void 0;return m(v(m({},s),{manual:u?[{type:"theme",name:Es}]:[]}),d?{theme:{key:d.key,name:d.name}}:{})}function rl(n,e){let t=new Set(e.map(s=>s.key)),i=new Set(n.map(s=>s.key)),o=[...n.map(s=>t.has(s.key)?v(m({},s),{change:"unchanged",isNew:!1}):v(m({},s),{change:"added",isNew:!0})),...e.filter(s=>!i.has(s.key)).map(s=>v(m({},s),{change:"unchanged",isNew:!1}))].sort((s,c)=>_s[s.change]-_s[c.change]||s.name.localeCompare(c.name)),a={added:0,removed:0,unchanged:0};for(let s of o)a[s.change]+=1;return{items:o,counts:a,manual:[]}}function $s(n,e){return new Set(n.items.filter(t=>t.type==="snippet"&&t.change==="added"&&(!e||!Ot(e,t.name))).map(t=>t.key))}async function Ks(n,e,t,i){let o=await de(),a=X(o),s=X(n.keys),c={};for(let[g,h]of As){let S=Ts(o[g]),w=[...e==="add"?S:S.filter(T=>t.includes(T)||a.some(E=>E.key===T&&Fn(E,s)))];for(let T of s){if(T.type!==h||t.includes(T.key))continue;let E=S.includes(T.key);if(e==="add"&&E)continue;let C=h==="snippet"?cl(T,i,o[T.key]):n.keys[T.key];C!==void 0&&(c[T.key]=C,w.includes(T.key)||w.push(T.key))}c[g]=JSON.stringify(w)}let u=Wn(n.keys[nn]),d=Ts(c["marketplace:installed-themes"]);u&&d.includes(u)&&!t.includes(u)&&(c[nn]=n.keys[nn]);let f=_i(o,c);return await Ei(c,f),Object.keys(c).length+f.length}function cl(n,e,t){let i=e?Ot(e,n.name):void 0;return i?JSON.stringify(m({code:i.code,title:i.title,description:i.description},i.imageURL?{imageURL:i.imageURL}:{})):t}function Ts(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function ll(n){try{let e=n?JSON.parse(n):null;return e&&typeof e=="object"&&!Array.isArray(e)?e:null}catch(e){return null}}var Jn="/api/shares",ul=`${Jn}/update`,dl=`${Jn}/delete`,yl=`${Jn}/import`,fl="x-syncify-user-hash",pl={no_code:"This code doesn't exist.",too_many_codes:"You can't make more share codes. Delete one to make another.",daily_limit:"Too many changes to share codes today. Try again tomorrow.",too_large:"This setup is too big to share.",invalid_name:"Names can be up to 60 characters.",empty:"There's nothing to share yet. Install something from Marketplace first.",invalid_items:"Syncify couldn't read some items. Reload Spotify and try again.",source:"Some items don't load from GitHub. Reload Spotify and try again.",blocked:"Some items are on Marketplace's block list. Reload Spotify and try again.",custom_snippet:"Custom snippets can't be shared. Reload Spotify and try again.",unchecked:"Couldn't check Marketplace's block list. Try again in a minute.",publish_failed:"Couldn't publish the code. Press Update on it to try again.",delete_failed:"Couldn't delete the code. Try again.",same_setup:"You already shared this setup.",invalid_handle:"Handles are 3 to 20 letters, digits, _ or -, starting and ending with a letter or digit.",reserved_handle:"That handle isn't allowed. Pick another.",handle_taken:"That handle is taken. Pick another.",unavailable:"Share codes aren't available yet."},ml=new Set(["offline","signed_out","invalid_signature","stale_salt","no_device_key","too_many_requests"]);function Ut(n,e=null){var t;return n instanceof x&&ml.has(n.code)?Qe(n):n instanceof x&&n.code==="too_many_codes"&&e!==null?`You have ${e} share codes already. Delete one to make another.`:(t=n instanceof x?pl[n.code]:void 0)!=null?t:"Something went wrong. Try again."}async function Li(){var e;let n=await Un(Jn,"GET");return{codes:Array.isArray(n==null?void 0:n.codes)?n.codes.flatMap(t=>{let i=gl(t);return i?[i]:[]}):[],max:typeof(n==null?void 0:n.max)=="number"?n.max:null,profile:typeof((e=n==null?void 0:n.profile)==null?void 0:e.handle)=="string"?{handle:n.profile.handle,link:typeof n.profile.link=="string"?n.profile.link:null}:null,suggestedHandle:typeof(n==null?void 0:n.suggested_handle)=="string"?n.suggested_handle:null}}async function Hs(n,e,t){return zs(await Un(Jn,"POST",m({name:n,keys:e},t===void 0?{}:{handle:t})))}function Di(n){return`${U().shareUrl.replace(/\/+$/,"")}/@${n}`}async function js(n,e,t){return zs(await Un(ul,"POST",{code:n,name:e,keys:t}))}async function Fs(n){try{await Un(dl,"POST",{code:n})}catch(e){if(e instanceof x&&e.code==="no_code")return;throw e}}async function Ys(n){let e=U().shareUrl.replace(/\/+$/,""),t;try{t=await fetch(`${e}/${n}.json`)}catch(o){throw new x("offline")}if(t.status===404||t.status===403)throw new x("no_code");if(!t.ok)throw new x("failed");let i=Ds(await t.json().catch(()=>null));if(!i||i.code!==n)throw new x("no_code");return i}async function Ws(n,e){try{await Zo(yl,{code:n},{[fl]:e.hash})}catch(t){}}function gl(n){let e=n;return!e||typeof e.code!="string"?null:{code:e.code,name:typeof e.name=="string"&&e.name?e.name:null,link:typeof e.link=="string"?e.link:null,item_count:typeof e.item_count=="number"?e.item_count:0,imports:typeof e.imports=="number"?e.imports:0,created_at:typeof e.created_at=="number"?e.created_at:0,updated_at:typeof e.updated_at=="number"?e.updated_at:0}}function zs(n){let e=n;if(typeof(e==null?void 0:e.code)!="string")throw new x("failed");return{code:e.code,link:typeof e.link=="string"?e.link:null,leftOut:Array.isArray(e.left_out)?e.left_out.length:0}}var qs="/claims",hl="/claims/cancel",Sl={no_backup:"Back up first, then secure your backup.",unsupported_identity:"This Spotify account can't be secured.",too_many_accounts:"Your account already has 10 Spotify accounts linked.",offline:"Couldn't reach Syncify. Check your connection and try again."},ze=class extends Error{constructor(t){var i;super((i=Sl[t])!=null?i:"Couldn't secure your backup. Try again.");this.code=t;this.name="ClaimError"}};async function Gs(n,e){let t=await Oi(n,e,"GET",qs);if(!t.ok)throw new ze(await Ui(t));let i=await t.json().catch(()=>null);return{claim:Kn(i==null?void 0:i.claim),accounts:Array.isArray(i==null?void 0:i.accounts)?i.accounts.filter(kl):null}}async function Vs(n,e){let t=await Oi(n,e,"POST",qs);if(!t.ok)throw new ze(await Ui(t));let i=await t.json().catch(()=>null);return Kn(i==null?void 0:i.claim)}async function Js(n,e){let t=await Oi(n,e,"POST",hl);if(!t.ok&&t.status!==404)throw new ze(await Ui(t))}async function Oi(n,e,t,i){try{return await je(n,e,{method:t},i)}catch(o){throw o instanceof TypeError?new ze("offline"):o}}async function Ui(n){let e=await n.json().catch(()=>null);return typeof(e==null?void 0:e.code)=="string"?e.code:"failed"}function kl(n){let e=n;return!!(e&&typeof e.hash=="string"&&(e.status==="pending"||e.status==="final"||e.status==="cancelled"))}var wn={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},bl=/^([a-z0-9]|f([1-9]|1[0-2]))$/,wl=250,xl=40,Bi=null,Bt=null,bn=null;function Rs(){return/mac/i.test(navigator.platform||navigator.userAgent)}function Xs(n){if(n===null)return null;if(!n||typeof n!="object")return wn;let e=n;return typeof e.key!="string"||!bl.test(e.key)?wn:{key:e.key,ctrl:!!e.ctrl,alt:!!e.alt,shift:!!e.shift,meta:!!e.meta}}function Rn(n){if(!n)return"Off";let e=n.key.toUpperCase();return Rs()?[n.ctrl?"\u2318":"",n.alt?"\u2325":"",n.shift?"\u21E7":"",e].join(""):[n.ctrl&&"Ctrl",n.meta&&"Win",n.alt&&"Alt",n.shift&&"Shift",e].filter(Boolean).join("+")}function Zs(n){if(n.key==="Escape")return{kind:"cancel"};let e=vl(n.code);if(!e)return{kind:"ignore"};let t=Rs();if(t&&n.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:e,ctrl:t?n.metaKey:n.ctrlKey,alt:n.altKey,shift:n.shiftKey,meta:t?!1:n.metaKey},o=e.startsWith("f")&&e.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!o?{kind:"error",message:`Include ${t?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function vl(n){var t,i;let e=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(n);return e?((i=(t=e[1])!=null?t:e[2])!=null?i:e[3]).toLowerCase():null}function Qs(n){var e;if(bn&&Cl(bn,n))return!1;try{let t=Spicetify.Mousetrap,i=(e=t.trigger)==null?void 0:e.call(t)._directMap;if(!i)return!1;let o=$i(n);return Object.keys(i).some(a=>a.startsWith(`${o}:`))}catch(t){return!1}}function Ki(n,e,t=0){if(Bi=e,Bt=n,!ea()){if(t>=xl){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>Ki(Bt,e,t+1),wl);return}Hi(Bt)}function Hi(n){if(Bt=n,!ea()||!Bi)return;let e=Bi;try{if(bn&&Spicetify.Keyboard._deregisterShortcut(bn),bn=null,!n)return;Spicetify.Keyboard.registerShortcut(n,t=>{t.preventDefault(),e()}),bn=n,console.debug("[Syncify]","Keyboard shortcut registered",Rn(n))}catch(t){console.warn("[Syncify]","Failed to register keyboard shortcut",t)}}function ea(){var n;return typeof((n=Spicetify.Keyboard)==null?void 0:n.registerShortcut)=="function"}function $i(n){return[n.ctrl&&"mod",n.meta&&"meta",n.alt&&"alt",n.shift&&"shift",n.key].filter(Boolean).join("+")}function Cl(n,e){return $i(n)===$i(e)}var ji="both",Nl=["both","topbar","menu"],Xn=null,Zn=null,$t=!1;function na(n){return Nl.includes(n)?n:ji}function ta(){var n;return typeof((n=Spicetify.Menu)==null?void 0:n.Item)=="function"}function ia(n){Xn=n.topbarButton,Zn=n.menuItem}function Kt(n){let e=n!=="menu"||!Zn,t=n!=="topbar";if(Xn!=null&&Xn.element&&(Xn.element.style.display=e?"":"none"),!!Zn)try{t&&!$t?(Zn.register(),$t=!0):!t&&$t&&(Zn.deregister(),$t=!1)}catch(i){console.warn("[Syncify]","Failed to update profile menu item",i)}}var jt="syncify:config",Ht={workerUrl:U().workerUrl,autoBackupEnabled:!1,shortcut:wn,entryPoint:ji};function ye(){var t,i;let n=U(),e=(i=(t=Spicetify.LocalStorage)==null?void 0:t.get(jt))!=null?i:window.localStorage.getItem(jt);if(!e)return v(m({},Ht),{workerUrl:n.workerUrl});try{let o=JSON.parse(e);return{workerUrl:n.workerUrl,autoBackupEnabled:o.autoBackupEnabled===void 0?Ht.autoBackupEnabled:!!o.autoBackupEnabled,shortcut:o.shortcut===void 0?Ht.shortcut:Xs(o.shortcut),entryPoint:na(o.entryPoint)}}catch(o){return v(m({},Ht),{workerUrl:n.workerUrl})}}function Ft(n){var t;let e=JSON.stringify({workerUrl:U().workerUrl,autoBackupEnabled:n.autoBackupEnabled,shortcut:n.shortcut,entryPoint:n.entryPoint});if((t=Spicetify.LocalStorage)!=null&&t.set){Spicetify.LocalStorage.set(jt,e);return}window.localStorage.setItem(jt,e)}function Qn(n){return typeof n.workerUrl=="string"&&n.workerUrl.length>0}var Il=["username","canonicalUsername","id","uri","displayName"];async function we(){let{value:n,field:e}=await El();return{hash:await Nt(n),field:e}}async function El(){var o;let n=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(n!=null&&n.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let e=await n.getUser(),t=Il.find(a=>(e==null?void 0:e[a])!=null),i=t?e[t]:void 0;if(!t||!i)throw new Error("Unable to resolve the active Spotify user.");return{value:i,field:t}}async function nt(n){if(!Qn(n))throw new Error("Syncify backup service is not configured.");let[e,t]=await Promise.all([we(),Ss()]);if(t.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:i,unapproved:o}=await ns(n.workerUrl,e,t);return{payload:t,unchanged:i,unapproved:o}}async function xn(n,e){var c;if(!Qn(n))throw new Error("Syncify backup service is not configured.");let t=await bi(n.workerUrl,await we(),e),[i,o,a]=await Promise.all([Promise.all(t.backups.map(Yi)),t.safetyCopy?Yi(t.safetyCopy):null,Promise.all(t.unapproved.map(Yi))]),s=i.filter((u,d)=>i.findIndex(f=>f.payload_hash===u.payload_hash)===d);return v(m({},t),{payload:(c=s[0])!=null?c:null,backups:s,safetyCopy:o&&!s.some(u=>u.payload_hash===o.payload_hash)?o:null,unapproved:a.filter(u=>!s.some(d=>d.payload_hash===u.payload_hash))})}var Fi=new Map;async function Yi(n){var a,s,c;let e=(s=(a=n.marketplace_data)==null?void 0:a.keys)!=null?s:{},t=n.spicetify_config?Ci(n.spicetify_config,e):void 0,i=`${n.payload_hash} ${(c=n.metadata)==null?void 0:c.last_sync_datetime}`,o=Fi.get(i);return o||(o=At(e,t),Fi.set(i,o),o.catch(()=>Fi.delete(i))),v(m(m({},n),t?{spicetify_config:t}:{}),{payload_hash:await o})}async function oa(n){let e=await bi(tt(n),await we());return{claim:e.claim,install:e.install,nudge:e.nudge}}async function sa(n,e,t,i=[]){var c;let o=e!=null?e:(await xn(n)).payload;if(!o)throw new Error("No Syncify cloud backup was found for this Spotify account.");let a=await ks(o,i),s=(c=o.backup)==null?void 0:c.id;return s&&Qn(n)&&we().then(u=>is(n.workerUrl,u,s,t)).catch(()=>{}),{payload:o,restoredCount:a}}var et=class extends Error{constructor(t){super("Couldn't back up your setup first, so nothing changed.");this.reason=t;this.name="SafetyBackupError"}};async function aa(n,e,t,i,o){try{await nt(n)}catch(s){throw new et(s)}let a=await Ks(e,t,i,o);return we().then(s=>Ws(e.code,s)).catch(()=>{}),a}async function ra(n){let e=await we(),t=await Gs(tt(n),e);return v(m({},t),{hash:e.hash})}async function ca(n){await Vs(tt(n),await we())}async function Yt(n,e,t){await ts(tt(n),await we(),e,t)}async function Wt(n){await Js(tt(n),await we())}function tt(n){if(!Qn(n))throw new Error("Syncify backup service is not configured.");return n.workerUrl}var la="syncify:nudge-hidden-until",ua="syncify:nudge-panel-shown";function da(n=Date.now()){let e=Number(ma(la));return Number.isFinite(e)&&e>n}function ya(n=Date.now()){ga(la,String(n+30*864e5))}function fa(){return ma(ua)!==null}function pa(){ga(ua,"1")}function ma(n){var e,t;return(t=(e=Spicetify.LocalStorage)==null?void 0:e.get(n))!=null?t:window.localStorage.getItem(n)}function ga(n,e){var t;(t=Spicetify.LocalStorage)!=null&&t.set?Spicetify.LocalStorage.set(n,e):window.localStorage.setItem(n,e)}var zt="syncify:claim-check-day";async function Sa(n){var t,i,o;let e=ye();if(e.workerUrl){if(!e.autoBackupEnabled)return _l(n);try{let[a,s]=await Promise.all([Mt(),xn(e)]);ka(s,n);let c=(i=(t=s.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?i:0;if(s.exists&&bs(a.keyCount,c)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((o=s.payload)==null?void 0:o.payload_hash)===a.hash||a.keyCount===0)return;let{unapproved:u}=await nt(e);Spicetify.showNotification(u?"Syncify: backed up, waiting for approval":"Syncify auto-backup complete")}catch(a){if(a instanceof be||a instanceof en){Spicetify.showNotification("Syncify: sign in to keep backing up",!0,8e3);return}let s=a instanceof Error?a.message:String(a);console.warn("Syncify startup sync failed:",a),Spicetify.showNotification(`Syncify auto-sync skipped: ${s}`,!0,8e3)}}}async function _l(n){let e=new Date().toLocaleDateString("en-CA");if(Pl()!==e)try{let t=await oa(ye());ha(e),ka(t,n)}catch(t){if(t instanceof be){ha(e);return}console.warn("Syncify claim check failed:",t)}}function ka(n,e){var o;let t=Tl(n.claim),i=(o=n.install)==null?void 0:o.waiting[0];t?e.onClaim(t):i?e.onInstall(i):n.nudge&&!fa()&&e.onNudge()}function Tl(n){return(n==null?void 0:n.status)==="pending"&&!n.mine?n:null}function Pl(){var n,e;return(e=(n=Spicetify.LocalStorage)==null?void 0:n.get(zt))!=null?e:window.localStorage.getItem(zt)}function ha(n){var e;(e=Spicetify.LocalStorage)!=null&&e.set?Spicetify.LocalStorage.set(zt,n):window.localStorage.setItem(zt,n)}var zi="syncify:pending-restore",Al=600*1e3,Ml=2e3,Ll=15e3,Dl="marketplace:theme-installed",Ol="raw.githubusercontent.com",Ul=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],xe=null,Wi=new Set,xa=new Map;function va(){return xe}function Ca(n){return Wi.add(n),()=>Wi.delete(n)}function Na(){xe&&Pa(v(m({},xe),{manual:[]}))}function Gt(n,e="restore"){try{localStorage.setItem(zi,JSON.stringify({at:Date.now(),manual:n,kind:e}))}catch(t){}}function Ia(){var n;Gt((n=xe==null?void 0:xe.manual)!=null?n:[],xe==null?void 0:xe.kind),window.location.reload()}function Ea(){Aa()&&(document.addEventListener("load",n=>ba(n.target,"load"),!0),document.addEventListener("error",n=>ba(n.target,"error"),!0))}async function _a(){let n=Aa();if(!n)return;try{localStorage.removeItem(zi)}catch(s){}let e=Date.now(),t=await wa();for(;t.loaded<t.total&&Date.now()-e<Ll;)await new Promise(s=>setTimeout(s,Ml)),t=await wa();Pa(v(m({kind:n.kind,at:Date.now()},t),{manual:n.manual}));let i=t.loaded===t.total&&n.manual.length===0,o=n.kind==="share"?"Setup applied":"Backup restored",a=n.kind==="share"?"loaded":"restored";Spicetify.showNotification(i?`Syncify: ${o}; ${t.total} ${t.total===1?"item":"items"}`:`Syncify: ${a} ${t.loaded} of ${t.total}. Open Syncify for details.`,!1,8e3)}function Ta(n){let e=n.map(t=>t.type==="extension"?`spicetify config extensions ${qt(t.name)}`:t.type==="custom_app"?`spicetify config custom_apps ${qt(t.name)}`:`spicetify config current_theme ${qt(t.name)}${t.scheme?` color_scheme ${qt(t.scheme)}`:""}`);return e.length>0?[...e,"spicetify apply"]:[]}function qt(n){return/^[\w.@+/-]+$/.test(n)?n:`"${n}"`}function Pa(n){xe=n;for(let e of Wi)e(n)}function Aa(){var n;try{let e=JSON.parse((n=localStorage.getItem(zi))!=null?n:"null");return!e||Date.now()-e.at>Al?null:{manual:Array.isArray(e.manual)?e.manual:[],kind:e.kind==="share"?"share":"restore"}}catch(e){return null}}function ba(n,e){n instanceof HTMLScriptElement&&n.src&&xa.set(it(n.src),e)}async function wa(){var i;let n=await de(),e=(i=n[Dl])!=null?i:"",t=X(n).filter(o=>o.type==="extension"&&o.sources.length>0||o.type==="theme"&&e.includes(o.key)||o.type==="snippet");return{loaded:t.filter(Bl).length,total:t.length}}function Bl(n){var e,t;if(n.type==="snippet"){let i=document.querySelector("style.marketplaceSnippets");return((e=i==null?void 0:i.textContent)==null?void 0:e.includes(`/* ${n.name} - `))===!0}if(n.type==="theme"){let i=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((t=i==null?void 0:i.textContent)!=null&&t.trim())}return $l(n.sources[0]).some(Kl)}function $l(n){let e;try{e=new URL(n)}catch(s){return[]}if(e.host!==Ol)return[it(e.href)];let[t,i,o,...a]=e.pathname.split("/").filter(Boolean);return!t||!i||!o||a.length===0?[]:Ul.map(s=>it(`https://${s}/gh/${t}/${i}@${o}/${a.join("/")}`))}function Kl(n){let e=xa.get(n);return e?e==="load":[...document.querySelectorAll("script[src]")].some(i=>it(i.src)===n)&&performance.getEntriesByType("resource").some(i=>it(i.name)===n)}function it(n){try{let e=new URL(n);return`${e.origin}${e.pathname}`}catch(e){return n}}function qi(n){return`A new install${n.device?` on ${n.device}`:""} wants to back up this Spotify account.`}function Ma(n){let e=Spicetify.React,t=e.useState,{install:i}=n,[o,a]=t(!1),[s,c]=t(null);async function u(d){a(!0),c(null);try{await Yt(ye(),i.id,d),Spicetify.showNotification(d==="approve"?"Syncify: install approved":"Syncify: install refused"),n.onDone(d)}catch(f){c(f instanceof Error?f.message:String(f)),a(!1)}}return e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-claim-notice"},qi(i)," Approve it if it's yours."),s?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},s):null,e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:n.onClose,disabled:o},"Close"),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{u("reject")},disabled:o},"Not mine"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{u("approve")},disabled:o},"Approve")))}var Hl="syncify:beta",La=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function Da(){var n;return(n=window.SyncifyLoader)!=null?n:null}function jl(){try{return window.localStorage.getItem(Hl)==="true"}catch(n){return!1}}async function Oa(n){let e=jl()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(e.map(i=>Fl(`${n}/${i}`)))).reduce((i,o)=>o&&(!i||Vi(o,i)>0)?o:i,null)}function Gi(n){return typeof n=="string"&&La.test(n)}function Vi(n,e){let[t,i]=[n,e].map(o=>{var d;let[,a,s,c,u]=(d=La.exec(o))!=null?d:[];return[a,s,c,u!=null?u:1/0].map(Number)});for(let o=0;o<t.length;o+=1)if(t[o]!==i[o])return t[o]<i[o]?-1:1;return 0}async function Fl(n,e=3e3){let t=typeof AbortController=="function"?new AbortController:null,i=setTimeout(()=>t==null?void 0:t.abort(),e);try{let o=await fetch(n,{signal:t==null?void 0:t.signal});if(!o.ok)return null;let a=await o.json();return Gi(a==null?void 0:a.version)?a.version:null}catch(o){return null}finally{clearTimeout(i)}}var Xi="syncify:share-code-count",Yl=600;function Wl(){var e,t;let n=Number((t=(e=Spicetify.LocalStorage)==null?void 0:e.get(Xi))!=null?t:NaN);return Number.isInteger(n)&&n>=0?n:null}function Ua(n){var e,t;n===null?(e=Spicetify.LocalStorage)==null||e.remove(Xi):(t=Spicetify.LocalStorage)==null||t.set(Xi,String(n))}var Zi="syncify:handle";function zl(){var e;let n=(e=Spicetify.LocalStorage)==null?void 0:e.get(Zi);return n==null?void 0:n||null}function Ji(n){var e,t;n===void 0?(e=Spicetify.LocalStorage)==null||e.remove(Zi):(t=Spicetify.LocalStorage)==null||t.set(Zi,n!=null?n:"")}var b=null;function Jt(n={}){var So,ko,bo,wo,xo,vo,Co,No,Io,Eo;let e=Spicetify.React,t=e.useEffect,i=e.useMemo,o=e.useState,a=e.useRef,[s,c]=o(()=>ye()),[u,d]=o(()=>b!=null&&b.remote.exists?"success":"idle"),[f,g]=o(null),[h,S]=o(0),[I,w]=o([]),[T,E]=o([]),[C,fe]=o(null),[qe,ie]=o(null),[ce,j]=o(null),[V,le]=o(null),[B,J]=o(()=>{var r;return(r=b==null?void 0:b.remote.payload)!=null?r:null}),[oe,k]=o(()=>{var r;return(r=b==null?void 0:b.remote.backups)!=null?r:[]}),[_,pe]=o(()=>{var r;return(r=b==null?void 0:b.remote.safetyCopy)!=null?r:null}),[W,z]=o(()=>{var r;return(r=b==null?void 0:b.remote.unapproved)!=null?r:[]}),[se,me]=o(()=>{var r;return(r=b==null?void 0:b.remote.install)!=null?r:null}),[De,In]=o(!1),[Oe,F]=o(()=>new Set),[N,Z]=o(()=>{var r;return(r=b==null?void 0:b.remote.payload)!=null?r:null}),[Ge,$]=o(b!==null),[ve,Q]=o(!1),[tn,ge]=o(!1),[Ue,En]=o(null),[ee,L]=o(!1),[he,Ce]=o(null),[Ne,Be]=o((So=n.section)!=null?So:null),[Ve,on]=o(!1),[A,sn]=o(()=>va()),[K,Ie]=o(!1),[Y,an]=o(!1),[Ee,st]=o(null),[rn,_n]=o(()=>Wl()),[Tn,cn]=o(()=>zl()),[H,_e]=o(void 0),[D,at]=o(()=>{var r;return(r=b==null?void 0:b.lockedBy)!=null?r:null}),[Je,Qt]=o(()=>{var r;return(r=b==null?void 0:b.remote.claim)!=null?r:null}),[ne,ln]=o(()=>{var r;return(r=b==null?void 0:b.claims)!=null?r:null}),[Te,rt]=o(!1),[ei,Pn]=o(null),[un,ct]=o(()=>{var r;return(r=b==null?void 0:b.remote.nudge)!=null?r:!1}),[y,p]=o(()=>da()),[M,Pe]=o(n.secure===!0),dn=a(!1),[Qa,to]=o(!1),[ae,ni]=o(null),[q,ti]=o(null),io=a(null),Ae=i(()=>U(),[]),yn=i(()=>_?[...oe,_]:oe,[oe,_]),ii=ae?[]:W,oi=ae?(ko=q==null?void 0:q.backups)!=null?ko:[]:oe,oo=ae?(bo=q==null?void 0:q.safetyCopy)!=null?bo:null:_,so=i(()=>{var r;return new Map([...yn,...W,...(r=q==null?void 0:q.backups)!=null?r:[],...q!=null&&q.safetyCopy?[q.safetyCopy]:[]].map(l=>[l,X(l.marketplace_data.keys)]))},[yn,W,q]),lt=r=>{var l;return(l=so.get(r))!=null?l:X(r.marketplace_data.keys)},er=r=>lt(r).map(l=>l.key),nr=r=>lt(r).length,te=i(()=>ve&&N?jn(lt(N),N.spicetify_config,T,C):null,[ve,N,so,T,C]),$e=i(()=>te?Gn(te.items):null,[te]),ut=i(()=>new Map([...Ue!=null?Ue:[],...$e!=null?$e:[]]),[Ue,$e]),dt=((wo=N==null?void 0:N.backup)==null?void 0:wo.kind)==="quarantined",ao=i(()=>{var r;return new Set(((r=te==null?void 0:te.items)!=null?r:[]).filter(l=>{var P;return l.change!=="removed"&&l.isNew&&(dt||Ye(ut.get(l.key))||((P=ut.get(l.key))==null?void 0:P.kind)==="unchecked")}).map(l=>l.key))},[te,ut,dt]),tr=[...ao].filter(r=>!Oe.has(r)),ro=te!==null&&Ue===null,si=i(()=>ta(),[]),co=i(()=>Da()!==null,[]),ue=u==="loading",yt=(f==null?void 0:f.kind)==="warning"||(f==null?void 0:f.kind)==="error"?f:null,lo=!!(B&&V&&B.payload_hash!==V),An=!!(B&&V&&B.payload_hash===V),uo=!!(N&&V&&N.payload_hash===V),ft=ae!==null||Ve||!An||yn.length<2,ir=ft?oi:oi.slice(0,1),pt=(Je==null?void 0:Je.status)==="pending"&&!Je.mine?Je:null,fn=Vl(ne,D,pt!==null),or=!y&&!D&&B!==null&&Ne!=="account"&&(H?fn.kind==="open":H===null&&un),mt=(xo=se==null?void 0:se.waiting[0])!=null?xo:null,yo=!se||se.trusted||D||fn.kind==="secured"?null:se.refused?"This Spotify account refused backups from this install. Sign in to back up from it.":"This install isn't approved yet. Its backups are kept apart until you approve it from another install or sign in.",ai=(H?((vo=ne==null?void 0:ne.accounts)!=null?vo:[]).filter(r=>r.status==="final"):[]).map((r,l)=>({hash:r.hash,label:`Spotify account ${l+1}${r.device_info?` \xB7 from ${r.device_info}`:""}`})).filter(r=>r.hash!==(ne==null?void 0:ne.hash)),sr=!!(V&&h>0&&!yn.some(r=>r.payload_hash===V));t(()=>(R().catch(()=>null).then(r=>_e(l=>l!=null?l:r)),Se({silent:!0}),dr(),Ca(sn)),[]),t(()=>{if(En(null),!te||!$e)return;[...$e.values()].some(Ye)&&ge(!0);let r=!0;return Vn(te.items,$e).then(l=>{r&&(En(l),[...l.values()].some(Ye)&&ge(!0))}),()=>{r=!1}},[te,$e]),t(()=>{if(!ee)return;let r=l=>{var Me;if(!((Me=io.current)!=null&&Me.isConnected)){L(!1),Ce(null);return}l.preventDefault(),l.stopImmediatePropagation();let P=Zs(l);if(P.kind!=="ignore"){if(P.kind==="cancel"){L(!1),Ce(null);return}if(P.kind==="error"){Ce(P.message);return}if(Qs(P.shortcut)){Ce(`${Rn(P.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}L(!1),ri(P.shortcut)}};return window.addEventListener("keydown",r,!0),()=>window.removeEventListener("keydown",r,!0)},[ee,s]);async function fo(){let r=await Mt();return le(r.hash),S(r.installedItemCount),w(r.installedItems),E(r.items),fe(r.spicetifyConfig),ie(r.activeTheme),j(r.marketplaceAvailable),r}async function Se(r){try{Q(!1),(!(r!=null&&r.silent)||!b)&&d("loading"),r!=null&&r.silent||g({kind:"info",text:"Checking your Syncify backup\u2026"}),await fo();let l,P=null;try{l=await xn(s)}catch(Ke){if(!(Ke instanceof be))throw Ke;l=yu,P=Ke.code}let Me=await R().catch(()=>null),ke=Me?await ra(s).catch(()=>null):null,G=Me?await R().catch(()=>null):null;b={remote:l,lockedBy:P,claims:G?ke:null},_e(G),ln(G?ke:null),at(P),P&&Be("account"),Qt(l.claim),ni(null),ti(null),J(l.payload),k(l.backups),pe(l.safetyCopy),z(l.unapproved),me(l.install),ct(l.nudge),Z(l.payload),$(!0),d(l.exists?"success":"idle"),!(r!=null&&r.silent)&&!P&&g(l.exists&&l.payload?{kind:"success",text:`Backup found from ${vn(l.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(l){Mn(l)}}async function gt(){rt(!0),Pn(null);try{await ca(s)}catch(r){r instanceof ze&&["claim_pending","claimed"].includes(r.code)||Pn(r instanceof Error?r.message:String(r))}finally{await Se({silent:!0}),rt(!1)}}function ar(){Pe(!0),H?gt():pn("account")}function rr(){ya(),p(!0)}t(()=>{!n.secure||dn.current||Te||!H||fn.kind!=="open"||D||(dn.current=!0,gt())},[H,fn.kind,D,Te]);function cr(r){_e(r),dn.current=!0,!D&&B?gt():Se({silent:!0})}function po(){Ua(null),_n(null),Ji(void 0),cn(void 0),_e(null),ln(null),Pn(null),Se({silent:!0})}async function lr(){to(!0);try{await Wt(s),Spicetify.showNotification("Syncify: claim sent for review"),await Se({silent:!0})}catch(r){g({kind:"error",text:r instanceof Error?r.message:String(r)})}finally{to(!1)}}async function ur(r){if(Q(!1),ni(r),ti(null),!r){Z(B);return}Z(null);try{let l=await xn(s,r);ti(l),Z(l.payload)}catch(l){ni(null),Z(B),Mn(l)}}async function dr(){let r=Ae.version;if(!Gi(r))return;let l=await Oa(Ae.releasesUrl);l&&Vi(l,r)>0&&st(l)}function yr(r){let l=v(m({},s),{autoBackupEnabled:r});c(l),Ft(l),g({kind:"success",text:r?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}function ri(r){let l=v(m({},s),{shortcut:r});c(l),Ft(l),Hi(r),Ce(null),g({kind:"success",text:r?`${Rn(r)} now opens Syncify.`:"Keyboard shortcut turned off."})}function fr(r){let l=v(m({},s),{entryPoint:r});c(l),Ft(l),Kt(r)}function pn(r){Be(r),r!=="settings"&&L(!1)}function pr(){Ce(null),L(!0)}async function mr(){var r;try{Q(!1),d("loading"),g({kind:"info",text:"Backing up your extensions and themes\u2026"});let{payload:l,unchanged:P,unapproved:Me}=await nt(s);if(await fo(),Me){await Se({silent:!0}),g({kind:"warning",text:"Backed up, but kept apart until this install is approved."}),Spicetify.showNotification("Syncify: backed up, waiting for approval");return}if(P){$(!0),d("success"),g({kind:"success",text:"Everything is already backed up."}),Spicetify.showNotification("Syncify: everything is already backed up");return}let ke=[l,...oe.filter(G=>G.payload_hash!==l.payload_hash)].slice(0,du);b&&(b=v(m({},b),{remote:v(m({},b.remote),{exists:!0,payload:l,backups:ke,safetyCopy:((r=b.remote.safetyCopy)==null?void 0:r.payload_hash)===l.payload_hash?null:b.remote.safetyCopy})})),J(l),k(ke),pe(G=>(G==null?void 0:G.payload_hash)===l.payload_hash?null:G),Z(l),$(!0),d("success"),g({kind:"success",text:`Backed up ${l.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(l){Mn(l)}}async function mo(r){if(mt){In(!0);try{await Yt(s,mt.id,r),Spicetify.showNotification(r==="approve"?"Syncify: install approved":"Syncify: install refused"),await Se({silent:!0})}catch(l){Mn(l)}finally{In(!1)}}}function gr(r=N){if(ce===!1){let l="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";g({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3);return}if(!r){let l="No Syncify cloud backup was found for this Spotify account.";g({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3);return}Z(r),ge(!1),F(new Set),Q(!0)}async function hr(){let r=N?jn(lt(N),N.spicetify_config,T,C).manual:[];try{Q(!1),d("loading"),g({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:l,restoredCount:P}=await sa(s,N!=null?N:void 0,ae!=null?ae:void 0,tr);Z(l),d("success"),g({kind:"success",text:`Restored ${P} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),Gt(r),setTimeout(()=>window.location.reload(),1e3)}catch(l){Mn(l)}}async function Sr(r){await qa(r)&&(Ie(!0),setTimeout(()=>Ie(!1),2e3))}function Re(r){if(r.startsWith("mailto:")){window.location.href=r;return}window.open(r,"_blank","noopener,noreferrer")}function Mn(r){if(d("error"),r instanceof $n){an(!0),g(null);return}if(r instanceof en){g({kind:"error",text:r.message}),Se({silent:!0});return}if(r instanceof be&&r.code!=="not_linked"){g(null),Se({silent:!0});return}let l=r instanceof Error?r.message:String(r);g({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3)}function ci(r,l){var _o,To;let P=(N==null?void 0:N.payload_hash)===r.payload_hash,Me=r.payload_hash===V,ke=vn(r.metadata.last_sync_datetime),G=Fa(nr(r)),Ke=(To=(_o=r.backup)==null?void 0:_o.name)!=null?To:null;return e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":P,"data-selected":P?"true":"false",type:"button",key:`${r.payload_hash}-${r.metadata.last_sync_datetime}`,title:l!=null&&l.isSafetyCopy?"Kept aside and updated about once a week, so a burst of new backups can't replace it":l!=null&&l.isUnapproved?"From an install this Spotify account hasn't approved":void 0,onClick:()=>{Z(r),Q(!1)},disabled:ue},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),l!=null&&l.isSafetyCopy?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Safety copy"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 updated weekly")),e.createElement("span",{className:"syncify-muted"},Ke?`${Ke} \xB7 `:"",ke," \xB7 ",G)):l!=null&&l.isUnapproved?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Not approved"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 ",ke)),e.createElement("span",{className:"syncify-muted"},G," \xB7 from ",r.metadata.device_info)):Ke?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,Ke),e.createElement("span",{className:"syncify-muted syncify-backup-date"},ke," \xB7 ",G," \xB7 from ",r.metadata.device_info)):e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-backup-date"},ke),e.createElement("span",{className:"syncify-muted"},G," \xB7 from ",r.metadata.device_info)),Me?e.createElement("span",{className:"syncify-tag",title:"What's on this device now"},"Current"):null,l!=null&&l.isSafetyCopy?e.createElement(Ha,null):null,l!=null&&l.isUnapproved?e.createElement(no,null):null)}function li(r){r.stopPropagation()}let kr=Y?"Update Syncify to keep backing up":D?"Sign in to restore":Ge?B?lo?"Changes since your last backup":"Everything is backed up":"No backup yet":u==="error"?"Couldn't check your backup":"Checking your backup\u2026",go=Y?"Your backups are safe":D?D==="not_owner"?"Secured by another account":"This backup is secured":Ge?B?lo?pu(B,er(B),I,C):`Last backup ${vn(B.metadata.last_sync_datetime)}`:"Save your extensions and themes so you can restore them after a reinstall or on another computer.":null,ho=!!(A&&!Y&&Date.now()-A.at<uu),Ln=!!(A&&A.loaded===A.total),ui=Ta((Co=A==null?void 0:A.manual)!=null?Co:[]);return e.createElement("div",{className:"syncify-panel",ref:io,onClick:li,onMouseDown:li,onPointerDown:li},Y?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,"This version of Syncify is no longer supported."),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Re(`${Ae.githubUrl}#updating`)},"How to update")):null,pt?e.createElement("div",{className:"syncify-alert",role:"alert"},e.createElement("span",null,(No=pt.email)!=null?No:"Someone"," is claiming this backup.",H===null?" If that's you, sign in to finish.":pt.held?" Syncify is reviewing it.":null),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{lr()},disabled:Qa},"Not me"),H===null?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>pn("account")},"That's me, sign in"):null)):null,mt?e.createElement("div",{className:"syncify-alert",role:"alert"},e.createElement("span",null,qi(mt)),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{mo("reject")},disabled:De},"Not mine"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{mo("approve")},disabled:De},"Approve"))):null,yo?e.createElement("div",{className:"syncify-alert",role:"status"},e.createElement("span",null,yo)):null,ui.length>0?e.createElement("div",{className:"syncify-alert syncify-manual",role:"status"},e.createElement("span",{className:"syncify-manual-header"},e.createElement("span",null,A.manual.length===1?"1 isn't from Marketplace. Add it in a terminal:":`${A.manual.length} aren't from Marketplace. Add them in a terminal:`),e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:Na},e.createElement(Qi,null))),e.createElement("span",{className:"syncify-code"},e.createElement("code",null,ui.join(`
`)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Sr(ui.join(`
`))}},K?"Copied":"Copy"))):null,yt?e.createElement("div",{className:"syncify-alert","data-kind":yt.kind},e.createElement("span",null,yt.text),e.createElement("span",{className:"syncify-alert-actions"},yt.kind==="error"?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Se()},disabled:ue},"Try again"):null,e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>g(null)},e.createElement(Qi,null)))):null,e.createElement("section",{className:"syncify-status","aria-live":"polite"},ho&&A?e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},A.kind==="share"?Ln?"Setup loaded":`Loaded ${A.loaded} of ${A.total}`:Ln?"Backup restored":`Restored ${A.loaded} of ${A.total}`),e.createElement("p",{className:"syncify-muted"},Ln?A.total===0?"Nothing from Marketplace to load":`${A.loaded} of ${A.total} loaded`:"Missing something? Reload Spotify once more."),Ln&&A.kind==="restore"?e.createElement("p",{className:"syncify-muted"},"Syncify saved your setup?"," ",e.createElement("button",{className:"syncify-text-button syncify-inline-button",type:"button",onClick:()=>Re(Ae.kofiUrl)},"Support it on Ko-fi")):null):e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},kr),e.createElement("p",{className:"syncify-muted"},go?`${go} \xB7 `:"",Fa(h)," on this device")),ho&&!Ln?e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:Ia},"Reload"):e.createElement("button",{className:"syncify-button",type:"button",onClick:mr,disabled:ue||An||Y||D!==null,title:D?"Sign in to back up":An?"No changes since your last backup":void 0},ue?"Working\u2026":An?"Backed up":"Back up now")),or?e.createElement("div",{className:"syncify-nudge",role:"region","aria-label":"Secure your backup"},e.createElement(Ha,null),e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it")),e.createElement("span",{className:"syncify-nudge-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:rr,disabled:Te},"Not now"),e.createElement("button",{className:"syncify-button",type:"button",onClick:ar,disabled:Te||ue},Te?"Securing\u2026":"Secure"))):null,!Ge||D||oe.length>0||W.length>0||ai.length>0?e.createElement("section",{className:"syncify-section","aria-label":"Backups"},e.createElement("div",{className:"syncify-section-header"},e.createElement("h4",{className:"syncify-section-title"},"Backups"),e.createElement("span",{className:"syncify-section-controls"},!ae&&An&&yn.length>1?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":Ve,"aria-controls":"syncify-backup-list",onClick:()=>{on(!Ve),Q(!1)}},Ve?"Show less":`Show all ${yn.length}`,e.createElement(Cn,null)):null,!D&&ai.length>0?e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select","aria-label":"Show backups from",value:ae!=null?ae:"",onChange:r=>{ur(r.currentTarget.value||null)},disabled:ue},e.createElement("option",{value:""},"This Spotify account"),ai.map(r=>e.createElement("option",{key:r.hash,value:r.hash},r.label))),e.createElement(Cn,null)):null)),Ge?D?e.createElement("p",{className:"syncify-locked"},e.createElement(lu,null),e.createElement("span",null,D==="not_owner"?"Sign in with the account that secured them":"Sign in to see and restore your backups")):ae&&!q?e.createElement("p",{className:"syncify-muted"},"Loading backups\u2026"):oi.length===0&&ii.length===0?e.createElement("p",{className:"syncify-muted"},"No backups yet."):e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-list",id:"syncify-backup-list",role:"radiogroup","aria-label":"Choose a backup to restore"},ir.map(r=>ci(r)),ft&&oo?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),ci(oo,{isSafetyCopy:!0})):null,ft&&ii.length>0?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),ii.map(r=>ci(r,{isUnapproved:!0}))):null),ft?ce===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to restore a backup."):ve?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},"Restore"," ",N?(Eo=(Io=N.backup)==null?void 0:Io.name)!=null?Eo:vn(N.metadata.last_sync_datetime):"this backup","?"),dt?e.createElement("div",{className:"syncify-alert"},"An install this Spotify account hasn't approved made this backup. Its items stay off unless you turn them on."):null,te?e.createElement(Wa,{preview:te,checks:ut,off:ao,allowed:Oe,unapproved:dt,onAllow:(r,l)=>{let P=new Set(Oe);l?P.add(r):P.delete(r),F(P)},expanded:tn,onToggle:()=>ge(!tn)}):null,e.createElement("div",{className:"syncify-actions"},sr?e.createElement("div",{className:"syncify-alert syncify-actions-hint"},"Your current setup isn't backed up."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>Q(!1),disabled:ue},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:hr,disabled:ue||ro},ro?"Checking\u2026":"Restore"))):e.createElement("div",{className:"syncify-actions"},uo?e.createElement("span",{className:"syncify-muted syncify-actions-hint"},"This backup is already current."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>gr(),disabled:ue||!N||uo},"Restore backup")):null):e.createElement("div",{className:"syncify-backup-skeleton","aria-hidden":"true"},e.createElement("span",{className:"syncify-radio"}),e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-skeleton-line"}),e.createElement("span",{className:"syncify-skeleton-line wide"})))):null,e.createElement("div",{className:"syncify-accordion"},e.createElement(Ri,{id:"share",title:"Share",openSection:Ne,onToggle:pn,status:H&&rn?{kind:"count",label:`${rn} ${rn===1?"code":"codes"}`,text:String(rn)}:null},e.createElement(Xl,{config:s,session:H,localItems:T,localConfig:C,localTheme:qe,marketplaceAvailable:ce,busy:ue,onSignIn:()=>pn("account"),onSignedOut:po,onCodeCount:r=>{Ua(r),_n(r)},onHandle:r=>{Ji(r),cn(r)}})),e.createElement(Ri,{id:"account",title:"Account",openSection:Ne,onToggle:pn,status:au(H,D,fn)},e.createElement(Jl,{session:H,locked:D,secure:fn,securing:Te,secureError:ei,onSecure:()=>{gt()},nudge:M,onSignedIn:cr,onSignedOut:po,onOpenWebsite:Re,handle:Tn,onHandle:r=>{Ji(r),cn(r)}})),e.createElement(Ri,{id:"settings",title:"Settings",openSection:Ne,onToggle:pn,status:Ee?{kind:"dot",label:`Syncify ${Ee} is out`}:null},e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Back up automatically"),e.createElement("span",{className:"syncify-muted"},"When Spotify starts and something has changed")),e.createElement("input",{className:"syncify-switch",type:"checkbox",role:"switch",checked:s.autoBackupEnabled&&!Y,onChange:r=>yr(r.currentTarget.checked),disabled:ue||Y})),e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Open Syncify from"),si?s.entryPoint==="menu"&&!s.shortcut?e.createElement("span",{className:"syncify-muted"},"Keep a shortcut in case a Spotify update breaks the menu"):null:e.createElement("span",{className:"syncify-muted"},"The profile menu isn't available in this Spicetify version")),e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select",value:si?s.entryPoint:"topbar",onChange:r=>fr(r.currentTarget.value),disabled:!si},fu.map(r=>e.createElement("option",{key:r.value,value:r.value},r.label))),e.createElement(Cn,null))),e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Keyboard shortcut"),ee&&!he?e.createElement("span",{className:"syncify-muted"},"Press a key combination, or Esc to cancel"):null),e.createElement("span",{className:"syncify-shortcut"},s.shortcut&&!ee?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ri(null)},"Turn off"):null,!s.shortcut&&!ee?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ri(wn)},"Use default"):null,e.createElement("button",{className:"syncify-key",type:"button","data-recording":ee?"true":"false",onClick:()=>ee?L(!1):pr(),title:"Click to change"},ee?"Press keys\u2026":s.shortcut?Rn(s.shortcut):"Off"))),he?e.createElement("div",{className:"syncify-alert",role:"alert"},he):null)),e.createElement("footer",{className:"syncify-footer"},e.createElement("span",{className:"syncify-footer-version"},e.createElement("span",null,"Syncify ",Ae.version),Ee?e.createElement("button",{className:"syncify-text-button syncify-update",type:"button",onClick:()=>co?window.location.reload():Re(`${Ae.githubUrl}#updating`)},Ee," is out \xB7 ",co?"Reload":"How to update"):null),e.createElement("span",{className:"syncify-footer-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Re(Ae.issueUrl)},"Report an issue"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Re(Ae.githubUrl)},"GitHub"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Re(Ae.kofiUrl)},"Support on Ko-fi"))))}var Ba={added:{mark:"+",label:"Added"},removed:{mark:"\u2212",label:"Removed"},unchanged:{mark:"=",label:"Unchanged"}},Ya=[["extension","Extensions"],["theme","Themes"],["snippet","Snippets"]],ql={extension:"extension",custom_app:"custom app",theme:"theme"};function Wa(n){let e=Spicetify.React,{items:t,counts:i,manual:o,theme:a}=n.preview,s=[...n.off].filter(c=>!n.allowed.has(c)).length;return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-chips","aria-label":"What changes on this device"},i.added?e.createElement("span",{className:"syncify-chip","data-change":"added"},"+",i.added," added"):null,i.removed?e.createElement("span",{className:"syncify-chip","data-change":"removed"},"\u2212",i.removed," removed"):null,i.unchanged?e.createElement("span",{className:"syncify-chip"},i.unchanged," unchanged"):null,o.length?e.createElement("span",{className:"syncify-chip"},o.length," to add manually"):null,a&&(!n.off.has(a.key)||n.allowed.has(a.key))?e.createElement("span",{className:"syncify-chip"},"Switches your theme to ",a.name):null,s?e.createElement("span",{className:"syncify-chip","data-change":"off"},s," off"):null),t.length||o.length?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":n.expanded,"aria-controls":"syncify-restore-changes",onClick:n.onToggle},n.expanded?"Hide changes":"Show changes",e.createElement(Cn,null)):null,n.expanded?e.createElement("div",{className:"syncify-changes",id:"syncify-restore-changes"},Ya.map(([c,u])=>{let d=t.filter(f=>f.type===c);return d.length===0?null:e.createElement("section",{key:c,"aria-label":u},e.createElement("h5",{className:"syncify-change-group"},u),e.createElement("ul",{className:"syncify-change-list"},d.map(f=>{var g,h;return e.createElement("li",{className:"syncify-change",key:f.key},e.createElement("span",{className:"syncify-mark","data-change":f.change,role:"img","aria-label":Ba[f.change].label},Ba[f.change].mark),e.createElement("span",{className:"syncify-change-name"},f.name,f.repo?e.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",f.repo):null),n.checks.has(f.key)?e.createElement(za,{check:n.checks.get(f.key)}):n.unapproved&&n.off.has(f.key)?e.createElement("span",{className:"syncify-source","data-warning":"true"},e.createElement(no,null),"Not approved"):null,n.off.has(f.key)&&!((g=n.fixed)!=null&&g.has(f.key))?e.createElement("label",{className:"syncify-item-switch"},e.createElement("input",{type:"checkbox",checked:n.allowed.has(f.key),onChange:S=>n.onAllow(f.key,S.currentTarget.checked)}),(h=n.switchLabel)!=null?h:"Restore"):null)})))}),o.length?e.createElement("section",{"aria-label":"Add manually"},e.createElement("h5",{className:"syncify-change-group"},"Add manually"),e.createElement("ul",{className:"syncify-change-list"},o.map(c=>e.createElement("li",{className:"syncify-change",key:`${c.type}:${c.name}`},e.createElement("span",{className:"syncify-mark","aria-hidden":"true"}),e.createElement("span",{className:"syncify-change-name"},c.name,e.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",ql[c.type],c.scheme?`, ${c.scheme}`:"")))))):null):null)}var Gl={host:"Loads from outside GitHub",repo:"Its code is in a different repo than the one it names",blocked:"On Marketplace's block list",catalog:"Not in Marketplace's catalog",unchecked:"GitHub couldn't be reached to check it",custom:"A snippet made in Marketplace, not from its list"};function za(n){let e=Spicetify.React,{check:t}=n,i=Ye(t),o=t.kind==="host"?`Code from ${t.host}`:t.kind==="repo"?`Code from ${t.repo}`:t.kind==="blocked"?"Blocked by Marketplace":t.kind==="catalog"?"Not in Marketplace":t.kind==="unchecked"?"Not checked":"Custom";return e.createElement("span",{className:"syncify-source","data-warning":i?"true":"false",title:Gl[t.kind]},i?e.createElement(no,null):null,o)}function Vl(n,e,t){var s,c;if(e==="not_owner")return{kind:"other-account"};if(!n)return t?{kind:"other-claim"}:{kind:"unknown"};let{claim:i}=n;if((i==null?void 0:i.status)==="final"){if(!i.mine)return{kind:"other-account"};let u=((s=n.accounts)!=null?s:[]).filter(d=>d.status==="final").length;return{kind:"secured",linkedCount:Math.max(u,1)}}if((i==null?void 0:i.status)==="pending")return i.mine?{kind:"pending",finalAt:i.final_at,held:i.held,waiting:i.waiting===!0}:{kind:"other-claim"};let o=((c=n.accounts)!=null?c:[]).filter(u=>u.hash===n.hash),a=o[o.length-1];return(a==null?void 0:a.status)==="cancelled"&&a.cancelled_by==="owner"?{kind:"cancelled"}:{kind:"open"}}function Jl(n){let e=Spicetify.React,t=e.useEffect,i=e.useState,{session:o,secure:a}=n,[s,c]=i(()=>vt()),[u,d]=i(()=>vt().email),[f,g]=i(""),[h,S]=i(!1),[I,w]=i(null),[T,E]=i(()=>Date.now()),{handle:C,onHandle:fe}=n;t(()=>{if(!o||C!==void 0)return;let k=!0;return Li().then(_=>{var pe,W;k&&fe((W=(pe=_.profile)==null?void 0:pe.handle)!=null?W:null)}).catch(()=>{}),()=>{k=!1}},[o,C]);let qe=!!(s.codeSentAt&&T-s.codeSentAt<tu),ie=Math.max(0,Math.ceil((s.retryAt-T)/1e3)),ce=s.retryEmail===null||s.retryEmail===u.trim().toLowerCase()?ie:0;t(()=>{if(!o)return;let k=!0;return Jo().then(_=>{!k||_||(w({kind:"warning",text:Qe(new x("signed_out"))}),n.onSignedOut())}).catch(()=>{}),()=>{k=!1}},[o==null?void 0:o.token]),t(()=>{if(s.retryAt<=Date.now())return;let k=setInterval(()=>{E(Date.now()),s.retryAt<=Date.now()&&clearInterval(k)},1e3);return()=>clearInterval(k)},[s.retryAt]);function j(k){let _=m(m({},vt()),k);Yo(_),c(_),E(Date.now())}async function V(k){var pe;let _=k.trim();if(!ou.test(_)){w({kind:"error",text:"Enter a valid email address."});return}S(!0),w(null);try{let W=await Go(_,{nudge:n.nudge});j({email:_,codeSentAt:Date.now(),retryAt:Date.now()+W*1e3,retryEmail:_.toLowerCase()}),g("")}catch(W){let z=W instanceof x?W:null,se=(pe=z==null?void 0:z.retryAfter)!=null?pe:null,me=se&&se<=iu?Date.now()+se*1e3:0,De=(z==null?void 0:z.code)==="too_many_requests"?null:_.toLowerCase();if((z==null?void 0:z.code)==="resend_wait"){j({email:_,codeSentAt:s.email===_&&s.codeSentAt?s.codeSentAt:Date.now(),retryAt:me,retryEmail:De});return}me&&j({retryAt:me,retryEmail:De}),w({kind:"error",text:Qe(W)})}finally{S(!1)}}async function le(){S(!0),w(null);try{let k=await Vo(s.email,f);j({codeSentAt:null}),g(""),n.onSignedIn(k)}catch(k){w({kind:"error",text:Qe(k)});let _=k instanceof x?k.code:null;(_==="too_many_attempts"||_==="code_expired")&&g("")}finally{S(!1)}}async function B(){var _;let k=(_=o==null?void 0:o.email)!=null?_:"";S(!0),w(null),await Ro(),j({email:k,codeSentAt:null}),d(k),S(!1),n.onSignedOut()}async function J(){S(!0),w(null);try{n.onOpenWebsite(await Xo())}catch(k){let _=k instanceof x&&k.code==="signed_out";w({kind:_?"warning":"error",text:Qe(k)}),_&&n.onSignedOut()}finally{S(!1)}}let oe=I?e.createElement("div",{className:"syncify-alert","data-kind":I.kind==="error"?"error":void 0,role:"alert"},I.text):null;if(o===void 0)return null;if(o){let k=a.kind==="open"||a.kind==="other-claim"||a.kind==="cancelled";return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",{className:"syncify-account-email"},o.email),a.kind==="secured"?e.createElement("span",{className:"syncify-muted"},"Backup secured \xB7"," ",a.linkedCount===1?"1 Spotify account linked":`${a.linkedCount} Spotify accounts linked`):a.kind==="pending"?e.createElement("span",{className:"syncify-muted syncify-account-state"},e.createElement(Ga,null),e.createElement("span",null,"Securing this backup \xB7"," ",a.waiting?"waiting on sign-in":a.held?"in review":`final ${eo(a.finalAt)}`)):a.kind==="other-account"?e.createElement("span",{className:"syncify-muted"},"This backup is secured by another account"):e.createElement("span",{className:"syncify-muted"},"Signed in")),e.createElement("span",{className:"syncify-account-actions"},e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-label":"Manage on the website",onClick:()=>{J()},disabled:h},"Manage",e.createElement(ja,null)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{B()},disabled:h},"Sign out"))),C?e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"@",C),e.createElement("span",{className:"syncify-muted"},"Your handle")),e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-label":"Open your profile",onClick:()=>n.onOpenWebsite(Di(C))},"Profile",e.createElement(ja,null))):null,k?e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it")),e.createElement("button",{className:"syncify-button",type:"button",onClick:n.onSecure,disabled:h||n.securing||a.kind==="other-claim"},n.securing?"Securing\u2026":a.kind==="cancelled"?"Secure again":"Secure")):null,a.kind==="other-claim"?e.createElement("div",{className:"syncify-alert",role:"status"},"Another claim is pending. If it isn't yours, press Not me above and Syncify will review it."):a.kind==="cancelled"?e.createElement("div",{className:"syncify-alert",role:"status"},"Your claim was cancelled from this Spotify account."):a.kind==="pending"&&a.waiting?e.createElement("div",{className:"syncify-alert",role:"status"},"Syncify ran on this Spotify account without you signed in, maybe after a Spotify update or on another computer. Sign in to Syncify there to finish linking."):null,n.secureError?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},n.secureError):null,oe)}return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting"},n.locked?e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Sign in to restore"),e.createElement("span",{className:"syncify-muted"},"With the email that secured this backup")):e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it"))),e.createElement("form",{className:"syncify-confirm",noValidate:!0,onSubmit:k=>{k.preventDefault(),!h&&(qe?f.length===Vt&&le():ce||V(u))}},qe?e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-muted"},"Code sent to ",su(s.email)),e.createElement("div",{className:"syncify-field"},e.createElement("input",{className:"syncify-input syncify-code-input",type:"text",inputMode:"numeric",autoComplete:"one-time-code","aria-label":"6-digit code",placeholder:"123456",maxLength:Vt,value:f,onChange:k=>g(k.currentTarget.value.replace(/\D/g,"").slice(0,Vt)),autoFocus:!0}),e.createElement("button",{className:"syncify-button",type:"submit",disabled:h||f.length!==Vt},h?"Verifying\u2026":"Verify")),e.createElement("p",{className:"syncify-muted syncify-account-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{V(s.email)},disabled:h||ie>0},ie>0?`Resend in ${Ka(ie)}`:"Resend code"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{j({codeSentAt:null}),g(""),w(null)},disabled:h},"Use another email"))):e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-field"},e.createElement("input",{className:"syncify-input",type:"email",autoComplete:"email","aria-label":"Email",placeholder:"you@example.com",value:u,onChange:k=>d(k.currentTarget.value),autoFocus:!0}),e.createElement("button",{className:"syncify-button",type:"submit",disabled:h||ce>0||!u.trim()},h?"Sending\u2026":"Send code")),e.createElement("p",{className:"syncify-muted"},ce>0?`Send another code in ${Ka(ce)}`:"We only email sign-in codes.")),oe))}var Rl=[["add","Add to my setup"],["replace","Replace my setup"]];function Xl(n){var ct;let e=Spicetify.React,t=e.useEffect,i=e.useMemo,o=e.useRef,a=e.useState,{session:s}=n,[c,u]=a(""),[d,f]=a(!1),[g,h]=a(null),[S,I]=a(null),[w,T]=a("add"),[E,C]=a(!1),[fe,qe]=a(()=>new Set),[ie,ce]=a(null),[j,V]=a(void 0),[le,B]=a(!1),[J,oe]=a(null),[k,_]=a(null),[pe,W]=a(null),[z,se]=a(null),[me,De]=a(""),[In,Oe]=a(null),[F,N]=a(null),[Z,Ge]=a(""),[$,ve]=a(null),[Q,tn]=a(!1),[ge,Ue]=a(!1),[En,ee]=a(null),[L,he]=a(null),[Ce,Ne]=a(null),[Be,Ve]=a(!1),[on,A]=a(null),sn=o(0),K=i(()=>S?Bs(S.file,S.items,n.localItems,n.localConfig,n.localTheme,w):null,[S,n.localItems,n.localConfig,n.localTheme,w]),Ie=i(()=>{if(!K||!S)return null;let y=new Set(S.items.map(p=>p.key));return K.items.filter(p=>p.change!=="removed"&&y.has(p.key)&&(w==="replace"||p.isNew))},[K,S,w]),Y=i(()=>Ie?Gn(Ie):null,[Ie]),an=i(()=>new Map([...ie!=null?ie:[],...Y!=null?Y:[]]),[ie,Y]),Ee=i(()=>K&&j!==void 0?$s(K,j):new Set,[K,j]),st=i(()=>{var y;return new Set([...((y=K==null?void 0:K.items)!=null?y:[]).filter(p=>{var M;return p.change!=="removed"&&p.isNew&&(Ye(an.get(p.key))||((M=an.get(p.key))==null?void 0:M.kind)==="unchecked")}).map(p=>p.key),...Ee])},[K,an,Ee]),rn=[...st].filter(y=>Ee.has(y)||!fe.has(y)),_n=K!==null&&(ie===null||j===void 0),Tn=$?$.items.filter(y=>!$.leftOut.has(y.key)):[],cn=!!(J&&k!==null&&J.length>=k),H=F!==null&&F.code===null&&!pe,_e=H?Ms(me):null,[D,at]=a(null);t(()=>{if(!_e){at(null);return}let y=window.setTimeout(()=>at(_e),Yl);return()=>window.clearTimeout(y)},[_e]),t(()=>{if(ce(null),!Ie||!Y)return;[...Y.values()].some(Ye)&&C(!0);let y=!0;return Vn(Ie,Y).then(p=>{y&&(ce(p),[...p.values()].some(Ye)&&C(!0))}),()=>{y=!1}},[Ie,Y]),t(()=>{oe(null),N(null),he(null),s&&ne()},[s==null?void 0:s.token]);async function Je(){let y=Ls(c);if(h(null),I(null),!y){h(Ut(new x("no_code")));return}f(!0);try{let p=await Ys(y);T("add"),qe(new Set),C(!1),I({file:p,items:X(p.keys)}),Ai().then(V)}catch(p){h(Ut(p))}finally{f(!1)}}async function Qt(){if(!(!S||!K)){B(!0),h(null);try{await aa(n.config,S.file,w,rn,j!=null?j:null),Spicetify.showNotification("Syncify: setup loaded. Reloading\u2026"),Gt(K.manual,"share"),setTimeout(()=>window.location.reload(),1e3)}catch(y){B(!1),h(y instanceof et?`${y.message} ${Ql(y.reason)}`:y instanceof Error?y.message:String(y))}}}async function ne(){var y,p;Oe(null);try{let M=await Li();oe(M.codes),n.onCodeCount(M.codes.length),_(M.max),W(M.profile),n.onHandle((p=(y=M.profile)==null?void 0:y.handle)!=null?p:null),se(M.suggestedHandle)}catch(M){ln(M,Oe)}}function ln(y,p){p(Ut(y,k)),y instanceof x&&y.code==="signed_out"&&n.onSignedOut()}async function Te(y){var M;let p=++sn.current;N({code:y}),Ge((M=y==null?void 0:y.name)!=null?M:""),De(z!=null?z:""),ve(null),tn(!1),ee(null),he(null),Ne(null);try{let Pe=await de(),dn=await Os(X(Pe),Pe);if(p!==sn.current)return;ve(m({keys:Pe},dn)),dn.leftOut.size>0&&tn(!0)}catch(Pe){if(p!==sn.current)return;N(null),ee(Pe instanceof Error?Pe.message:String(Pe))}}function rt(){sn.current+=1,N(null),ve(null)}async function ei(){if(!F||!$)return;Ue(!0),ee(null);let y=Us($.keys,Tn);try{let p=F.code?await js(F.code.code,Z.trim(),y):await Hs(Z.trim(),y,H?me.trim():void 0);he(v(m({},p),{outcome:F.code?"updated":"created"})),N(null),ve(null),await ne()}catch(p){if(p instanceof x&&p.code==="same_setup"&&p.share){he(v(m({},p.share),{leftOut:0,outcome:"existing"})),N(null),ve(null);return}ln(p,ee),p instanceof x&&p.code==="publish_failed"&&(N(null),ne())}finally{Ue(!1)}}async function Pn(y){Ve(!0),Oe(null);try{await Fs(y),Ne(null),(L==null?void 0:L.code)===y&&he(null),await ne()}catch(p){ln(p,Oe)}finally{Ve(!1)}}async function un(y,p){await qa(y)&&(A(p),setTimeout(()=>A(M=>M===p?null:M),2e3))}return e.createElement(e.Fragment,null,e.createElement("form",{className:"syncify-field syncify-share-load",noValidate:!0,onSubmit:y=>{y.preventDefault(),!d&&!le&&c.trim()&&Je()}},e.createElement("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-input"},"Load a setup"),e.createElement("input",{className:"syncify-input syncify-share-input",id:"syncify-share-input",type:"text",placeholder:"Paste a code or a link",autoComplete:"off",spellCheck:!1,value:c,onChange:y=>u(y.currentTarget.value),disabled:le}),e.createElement("button",{className:"syncify-button secondary",type:"submit",disabled:d||le||!c.trim()},d?"Loading\u2026":"Preview")),g?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},g):null,S&&K?e.createElement("div",{className:"syncify-confirm"},e.createElement("span",{className:"syncify-share-title"},e.createElement("p",{className:"syncify-confirm-title"},"Load ",(ct=S.file.name)!=null?ct:We(S.file.code),"?"),S.file.creator?e.createElement("button",{className:"syncify-text-button",type:"button",title:"Open their profile",onClick:()=>window.open(Di(S.file.creator),"_blank","noopener,noreferrer")},"by @",S.file.creator):null),e.createElement("div",{className:"syncify-share-modes",role:"radiogroup","aria-label":"How to load it"},Rl.map(([y,p])=>e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":w===y,"data-selected":w===y?"true":"false",type:"button",key:y,onClick:()=>T(y),disabled:le},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,p))))),e.createElement(Wa,{preview:K,checks:an,off:st,fixed:Ee,switchLabel:"Load",allowed:fe,unapproved:!1,onAllow:(y,p)=>{let M=new Set(fe);p?M.add(y):M.delete(y),qe(M)},expanded:E,onToggle:()=>C(!E)}),n.marketplaceAvailable===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to load a setup."):e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>I(null),disabled:le},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{Qt()},disabled:le||_n||n.busy},le?"Applying\u2026":_n?"Checking\u2026":"Apply"))):null,s===void 0?null:s?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting syncify-share-part"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Share this setup"),e.createElement("span",{className:"syncify-muted"},J&&J.length>0&&k!==null?eu(k-J.length):"Get a code anyone can load")),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{Te(null)},disabled:F!==null||J===null||cn||n.marketplaceAvailable===!1,title:cn?"Delete a code to make another":void 0},"Share")),F?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},F.code?`Update ${We(F.code.code)} with this setup?`:"Share this setup?"),$?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-chips","aria-label":"What goes in"},e.createElement("span",{className:"syncify-chip"},Tn.length," going in"),$.leftOut.size?e.createElement("span",{className:"syncify-chip","data-change":"off"},$.leftOut.size," left out"):null),$.items.length?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":Q,"aria-controls":"syncify-share-items",onClick:()=>tn(!Q)},Q?"Hide items":"Show items",e.createElement(Cn,null)):null,Q?e.createElement(Zl,{items:$.items,leftOut:$.leftOut}):null,e.createElement("div",{className:"syncify-share-fields"},e.createElement("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-name"},"Setup name"),e.createElement("input",{id:"syncify-share-name",className:"syncify-input",type:"text",placeholder:"Optional",maxLength:Ps,value:Z,onChange:y=>Ge(y.currentTarget.value),disabled:ge}),H?e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-muted syncify-share-handle-note"},"It's your first time creating a share code. Pick a handle for your profile:"),e.createElement("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-handle"},"Your handle"),e.createElement("span",{className:"syncify-input syncify-handle-input"},e.createElement("span",{"aria-hidden":"true"},"@"),e.createElement("input",{id:"syncify-share-handle",type:"text",placeholder:"handle",autoComplete:"off",spellCheck:!1,maxLength:Mi,value:me,onChange:y=>De(y.currentTarget.value.replace(/^@/,"")),disabled:ge})),me&&D?e.createElement("span",{className:"syncify-share-handle-problem",role:"alert"},D):null):null)):e.createElement("p",{className:"syncify-muted"},"Checking your items\u2026"),e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:rt,disabled:ge},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{ei()},disabled:!$||Tn.length===0||ge||H&&_e!==null},$?ge?F.code?"Updating\u2026":"Creating\u2026":F.code?"Update":"Create code":"Checking\u2026"))):null,En?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},En):null,L?e.createElement("div",{className:"syncify-confirm"},e.createElement("span",{className:"syncify-manual-header"},e.createElement("span",{className:"syncify-confirm-title"},L.outcome==="existing"?"You already shared this setup":L.outcome==="updated"?"Code updated":"Your code is ready"),e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>he(null)},e.createElement(Qi,null))),e.createElement("span",{className:"syncify-code syncify-share-code"},e.createElement("code",null,We(L.code)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{un(We(L.code),"saved-code")}},on==="saved-code"?"Copied":"Copy"),L.link?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{un(L.link,"saved-link")}},on==="saved-link"?"Copied":"Get link"):null),L.leftOut?e.createElement("p",{className:"syncify-muted"},L.leftOut===1?"1 snippet isn't in Marketplace's list anymore, so it was left out.":`${L.leftOut} snippets aren't in Marketplace's list anymore, so they were left out.`):null):null,In?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,In),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{ne()}},"Try again"))):null,J&&J.length>0?e.createElement("section",{"aria-label":"Your codes"},e.createElement("h5",{className:"syncify-change-group"},"Your codes"),e.createElement("ul",{className:"syncify-change-list syncify-share-codes"},J.map(y=>{var p;return e.createElement("li",{className:"syncify-setting",key:y.code},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",{className:"syncify-account-email"},(p=y.name)!=null?p:We(y.code)),e.createElement("span",{className:"syncify-muted"},Ce===y.code?"Delete it? Its link stops working.":[y.name?We(y.code):null,nu(y.item_count,"item"),`Used by ${y.imports}`].filter(Boolean).join(" \xB7 "))),e.createElement("span",{className:"syncify-account-actions"},Ce===y.code?e.createElement(e.Fragment,null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Ne(null),disabled:Be},"Cancel"),e.createElement("button",{className:"syncify-text-button","data-danger":"true",type:"button",onClick:()=>{Pn(y.code)},disabled:Be},Be?"Deleting\u2026":"Delete")):e.createElement(e.Fragment,null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Te(y)},disabled:F!==null||Be},"Update"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{un(We(y.code),`code:${y.code}`)}},on===`code:${y.code}`?"Copied":"Copy"),y.link?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{un(y.link,`link:${y.code}`)}},on===`link:${y.code}`?"Copied":"Get link"):null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Ne(y.code),disabled:Be},"Delete"))))}))):null):e.createElement("div",{className:"syncify-setting syncify-share-part"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Share this setup"),e.createElement("span",{className:"syncify-muted"},"Get a code anyone can load")),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:n.onSignIn},"Sign in to share")))}var $a={in:{mark:"+",label:"Goes in"},out:{mark:"\u2212",label:"Left out"}};function Zl(n){let e=Spicetify.React;return e.createElement("div",{className:"syncify-changes",id:"syncify-share-items"},Ya.map(([t,i])=>{let o=n.items.filter(a=>a.type===t).sort((a,s)=>a.name.localeCompare(s.name));return o.length===0?null:e.createElement("section",{key:t,"aria-label":i},e.createElement("h5",{className:"syncify-change-group"},i),e.createElement("ul",{className:"syncify-change-list"},o.map(a=>{let s=n.leftOut.get(a.key),c=s?$a.out:$a.in;return e.createElement("li",{className:"syncify-change",key:a.key},e.createElement("span",{className:"syncify-mark","data-change":s?"removed":"added",role:"img","aria-label":c.label},c.mark),e.createElement("span",{className:"syncify-change-name"},a.name,a.repo?e.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",a.repo):null),s?e.createElement(za,{check:s}):null)})))}))}function Ql(n){return n instanceof be?"Sign in to back up.":n instanceof Error?n.message:String(n)}async function qa(n){var e;try{return await navigator.clipboard.writeText(n),!0}catch(t){let i=(e=Spicetify.Platform)==null?void 0:e.ClipboardAPI;return i!=null&&i.copy?(await i.copy(n),!0):!1}}function eu(n){return n<=0?"No codes left, delete one to make another":`${n} ${n===1?"code":"codes"} left`}function nu(n,e){return`${n} ${e}${n===1?"":"s"}`}var Vt=6,tu=600*1e3,iu=300,ou=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function su(n){let e=n.lastIndexOf("@");return e<1?n:`${n[0]}***${n.slice(e)}`}function eo(n){let e=vn(new Date(n).toISOString());return e.startsWith("today")?e:`on ${e}`}function Ka(n){return`${Math.floor(n/60)}:${String(n%60).padStart(2,"0")}`}function Ri(n){let e=Spicetify.React,t=n.openSection===n.id,i=`syncify-section-${n.id}`;return e.createElement("section",{className:"syncify-accordion-section","aria-label":n.title},e.createElement("button",{className:"syncify-accordion-header",type:"button","aria-expanded":t,"aria-controls":i,onClick:()=>n.onToggle(t?null:n.id)},e.createElement("span",{className:"syncify-accordion-title"},n.title),!t&&n.status?e.createElement("span",{className:"syncify-accordion-status","data-kind":n.status.kind,role:"img","aria-label":n.status.label,title:n.status.label},n.status.kind==="ok"?e.createElement(ru,null):n.status.kind==="warning"?e.createElement(cu,null):n.status.kind==="pending"?e.createElement(Ga,null):n.status.kind==="count"?n.status.text:null):null,e.createElement(Cn,null)),t?e.createElement("div",{className:"syncify-accordion-body",id:i},n.children):null)}function Ha(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-shield",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"}))}function no(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-warning-icon",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M12 3 2 21h20z"}),n.createElement("path",{d:"M12 10v5"}),n.createElement("path",{d:"M12 18h.01"}))}function au(n,e,t){return e?{kind:"warning",label:"Sign in to see your backups"}:n?t.kind==="secured"?{kind:"ok",label:"Signed in, backup secured"}:t.kind==="pending"?{kind:"pending",label:"Linking this Spotify account"}:t.kind==="open"||t.kind==="cancelled"?{kind:"warning",label:"Backup not secured yet"}:{kind:"ok",label:"Signed in"}:null}function ru(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"10"}),n.createElement("path",{d:"m9 12 2 2 4-4"}))}function cu(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"10"}),n.createElement("path",{d:"M12 8v4"}),n.createElement("path",{d:"M12 16h.01"}))}function Cn(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-chevron",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"m9 6 6 6-6 6"}))}function lu(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-lock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("rect",{x:"5",y:"11",width:"14",height:"10",rx:"2"}),n.createElement("path",{d:"M8 11V7a4 4 0 0 1 8 0v4"}))}function Ga(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-clock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"9"}),n.createElement("path",{d:"M12 7v5l3 2"}))}function ja(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-external",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M14 4h6v6"}),n.createElement("path",{d:"M20 4 10 14"}),n.createElement("path",{d:"M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"}))}function Qi(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M18 6 6 18"}),n.createElement("path",{d:"m6 6 12 12"}))}var uu=600*1e3,du=3,yu={exists:!1,payload:null,backups:[],safetyCopy:null,claim:null,unapproved:[],install:null,nudge:!1},fu=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function pu(n,e,t,i){var I;let o=new Set(e),a=new Set(t),s=t.filter(w=>!o.has(w)).length,c=e.filter(w=>!a.has(w)).length,u=(I=n.spicetify_config)!=null?I:null,d=!!(i&&!u),f=!d&&(i&&u?!ls(i,u):i!==u),g=[s?`${s} added`:null,c?`${c} removed`:null,f?"Spicetify config changed":null].filter(Boolean),h=vn(n.metadata.last_sync_datetime),S=g.length?`${g.join(", ")} since ${h}`:`Last backup ${h}`;return d?`${S} \xB7 Spicetify config not saved yet`:S}function Fa(n){return n===1?"1 extension or theme":`${n} extensions and themes`}function vn(n){let e=new Date(n);if(Number.isNaN(e.getTime()))return n;let t=e.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),i=new Date,o=new Date(i);return o.setDate(i.getDate()-1),e.toDateString()===i.toDateString()?`today, ${t}`:e.toDateString()===o.toDateString()?`yesterday, ${t}`:`${e.toLocaleDateString(void 0,{month:"short",day:"numeric",year:e.getFullYear()===i.getFullYear()?void 0:"numeric"})}, ${t}`}function Va(n){var d;let e=Spicetify.React,t=e.useState,{claim:i}=n,[o,a]=t(!1),[s,c]=t(null);async function u(){a(!0),c(null);try{await Wt(ye()),Spicetify.showNotification("Syncify: claim sent for review"),n.onClose()}catch(f){c(f instanceof Error?f.message:String(f)),a(!1)}}return e.createElement("div",{className:"syncify-panel"},e.createElement("p",{className:"syncify-claim-notice"},(d=i.email)!=null?d:"Someone"," is claiming this backup."," ",n.signedIn?i.held?"Syncify is reviewing it.":`It goes through ${eo(i.final_at)} unless you stop it.`:"If that's you, sign in to finish."),s?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},s):null,e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:n.onClose,disabled:o},"Close"),e.createElement("button",{className:n.signedIn?"syncify-button":"syncify-button secondary",type:"button",onClick:()=>{u()},disabled:o},"Not me"),n.signedIn?null:e.createElement("button",{className:"syncify-button",type:"button",onClick:n.onSignIn,disabled:o},"That's me, sign in")))}function Ja(n){let e=Spicetify.React;return e.createElement("div",{className:"syncify-panel"},e.createElement("p",{className:"syncify-claim-notice"},"Your backup isn't secured yet. Anyone who knows your Spotify username can restore it or claim it as theirs. Secure it with your email so only you can."),e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:n.onClose},"Not now"),e.createElement("button",{className:"syncify-button",type:"button",onClick:n.onSecure},"Secure")))}var Rt="[Syncify]";function re(n,e){if(e===void 0){console.debug(Rt,n);return}console.debug(Rt,n,e)}function ot(n,e){if(e===void 0){console.warn(Rt,n);return}console.warn(Rt,n,e)}function mu(){var n;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((n=Spicetify==null?void 0:Spicetify.Topbar)!=null&&n.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var Xa="syncify-styles";function gu(){if(document.getElementById(Xa)){re("Another copy of Syncify is running; stopping this one");return}hu();let n=ye();ia({topbarButton:Su(),menuItem:Cu()}),Kt(n.entryPoint),Ki(n.shortcut,Zt),Sa({onClaim:e=>{Eu(e)},onInstall:_u,onNudge:Tu}).catch(e=>{ot("Startup sync check failed",e)}),_a().catch(e=>{ot("Restore check failed",e)})}function hu(){let n=document.createElement("style");n.id=Xa,n.textContent=Mo,document.head.appendChild(n)}function Su(){let{extensionName:n}=U(),e=new Spicetify.Topbar.Button(n,di,t=>{re("Topbar button clicked",Xt(t)),Zt()},!1,!0);return Za(e),wu(e),Iu(e),re("Topbar button registered",Xt(e)),e}function Za(n){var t;let e=n;n.element.style.setProperty("-webkit-app-region","no-drag"),(t=e.button)==null||t.style.setProperty("-webkit-app-region","no-drag")}var Ra=".main-actionButtons",ku=".Root__globalNav, .Root__top-bar",bu=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function wu(n){if(typeof MutationObserver=="undefined")return;let e=!1,t=null,i=()=>{e=!1,a();let s=n.element,c=document.querySelector(Ra);!s||!c||c.contains(s)||(c.prepend(s),xu(n),Za(n),re("Topbar button re-attached",Xt(n)))},o=new MutationObserver(()=>{e||(e=!0,setTimeout(i,250))}),a=()=>{var u;if(t!=null&&t.isConnected)return;let s=document.querySelector(Ra),c=(u=s==null?void 0:s.closest(ku))!=null?u:s==null?void 0:s.parentElement;if(o.disconnect(),t=c!=null?c:null,!c){o.observe(document.body,{childList:!0,subtree:!0});return}o.observe(c,{childList:!0,subtree:!0});for(let d=c.parentElement;d;d=d.parentElement)o.observe(d,{childList:!0})};i()}function xu(n){let e=vu(n);if(!e||e.className&&e.className!=="undefined")return;let t=Array.from(document.querySelectorAll(bu)).find(i=>!n.element.contains(i));t!=null&&t.className&&(e.className=t.className)}function vu(n){return n.button}function Cu(){var n;if(typeof((n=Spicetify.Menu)==null?void 0:n.Item)!="function")return null;try{return new Spicetify.Menu.Item(U().extensionName,!1,()=>Zt(),Nu())}catch(e){return ot("Failed to create profile menu item",e),null}}function Nu(){return di.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function Iu(n){Object.assign(window,{SyncifyDebug:{button:n,element:n.element,openModal:Zt,inspect:()=>Xt(n),clickElement:()=>{var e;return(e=n.element)==null?void 0:e.click()},clickInnerButton:()=>{var e;return(e=n.button)==null?void 0:e.click()},clickCallback:()=>n.onClick(n)}})}function Xt(n){var e,t,i,o,a;return{label:n.label,disabled:n.disabled,isRight:n.isRight,hasElement:!!n.element,elementConnected:(e=n.element)==null?void 0:e.isConnected,elementDisabled:(t=n.element)==null?void 0:t.disabled,elementAriaDisabled:(i=n.element)==null?void 0:i.getAttribute("aria-disabled"),elementClass:(o=n.element)==null?void 0:o.className,appRegion:n.element?getComputedStyle(n.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:n.button?getComputedStyle(n.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:n.element?getComputedStyle(n.element).pointerEvents:null,visibility:n.element?getComputedStyle(n.element).visibility:null,display:n.element?getComputedStyle(n.element).display:null,rect:(a=n.element)==null?void 0:a.getBoundingClientRect().toJSON()}}var O=null;function Zt(){if(O!=null&&O.container.isConnected){re("Closing modal"),Spicetify.PopupModal.hide();return}re("Opening modal"),Nn(Spicetify.React.createElement(Jt))}async function Eu(n){let e=await R().catch(()=>null);O!=null&&O.container.isConnected||(re("Opening claim notice"),Nn(Spicetify.React.createElement(Va,{claim:n,signedIn:e!==null,onSignIn:()=>Nn(Spicetify.React.createElement(Jt,{section:"account"})),onClose:()=>Spicetify.PopupModal.hide()})))}function _u(n){if(O!=null&&O.container.isConnected)return;re("Opening install notice");let e=()=>Spicetify.PopupModal.hide();Nn(Spicetify.React.createElement("div",{className:"syncify-panel"},Spicetify.React.createElement(Ma,{install:n,onDone:e,onClose:e})))}function Tu(){O!=null&&O.container.isConnected||(re("Opening nudge notice"),pa(),Nn(Spicetify.React.createElement(Ja,{onSecure:()=>Nn(Spicetify.React.createElement(Jt,{section:"account",secure:!0})),onClose:()=>Spicetify.PopupModal.hide()})))}function Nn(n){var t;(t=O==null?void 0:O.root)==null||t.unmount();let e=document.createElement("div");O={container:e,root:null};try{Spicetify.PopupModal.display({title:U().extensionName,content:e,isLarge:!1})}catch(i){throw ot("Failed to open PopupModal",i),i}Pu(e),Mu(e,n)}function Pu(n){requestAnimationFrame(()=>{let e=Au(n);e==null||e.classList.add("syncify-modal-shell");let t=e==null?void 0:e.querySelector(".main-trackCreditsModal-header h1");if(t&&!t.querySelector(".syncify-modal-mark")){let o=document.createElement("span");o.className="syncify-modal-mark",o.innerHTML=Lo,t.prepend(o)}let i=e==null?void 0:e.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');i&&(i.classList.add("syncify-modal-close"),i.setAttribute("aria-label",`Close ${U().extensionName}`),i.title="Close",i.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function Au(n){let e=n.parentElement;for(;e&&e!==document.body;){if(e.querySelector(".main-trackCreditsModal-header"))return e;e=e.parentElement}return n.closest('[class*="trackCreditsModal"]')}function Mu(n,e){try{if(typeof Spicetify.ReactDOM.createRoot=="function"){let t=Spicetify.ReactDOM.createRoot(n);t.render(e),(O==null?void 0:O.container)===n&&(O.root=t),re("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(e,n),re("Modal rendered",{renderer:"render"})}catch(t){throw ot("Failed to render modal",t),t}}Ea();(function n(){if(!mu()){setTimeout(n,100);return}re("Spicetify APIs ready"),gu()})();})();
