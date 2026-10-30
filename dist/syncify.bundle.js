// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var Va=Object.defineProperty,Ja=Object.defineProperties;var Xa=Object.getOwnPropertyDescriptors;var ho=Object.getOwnPropertySymbols;var Za=Object.prototype.hasOwnProperty,Qa=Object.prototype.propertyIsEnumerable;var So=(n,e,t)=>e in n?Va(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,g=(n,e)=>{for(var t in e||(e={}))Za.call(e,t)&&So(n,t,e[t]);if(ho)for(var t of ho(e))Qa.call(e,t)&&So(n,t,e[t]);return n},C=(n,e)=>Ja(n,Xa(e));var ko=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var ni=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var bo=`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="-2.5 -2.5 37 37" aria-hidden="true" focusable="false"><defs><mask id="syncify-mark-gap" maskUnits="userSpaceOnUse" x="-2" y="-2" width="36" height="36"><rect x="-2" y="-2" width="36" height="36" fill="#fff"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></mask></defs><g mask="url(#syncify-mark-gap)"><g transform="rotate(15 16 16)"><path d="M16 16L16 7.4A8.6 8.6 0 0 1 24.6 16Z" fill="#6cd1d1" transform="translate(0.42 -0.42)"/><path d="M16 16L24.6 16A8.6 8.6 0 0 1 16 24.6Z" fill="#efa4c1" transform="translate(0.42 0.42)"/><path d="M16 16L16 24.6A8.6 8.6 0 0 1 7.4 16Z" fill="#d3c48c" transform="translate(-0.42 0.42)"/><path d="M16 16L7.4 16A8.6 8.6 0 0 1 16 7.4Z" fill="#88bcf2" transform="translate(-0.42 -0.42)"/></g></g><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 28.03A12.4 12.4 0 1 1 28.03 19"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91"/></g></svg>
`;var ir="syncify",cn="state";function ti(){let n;try{n=window.indexedDB}catch(e){return Promise.resolve(null)}return n?new Promise(e=>{let t;try{t=n.open(ir,1)}catch(i){e(null);return}t.onupgradeneeded=()=>{t.result.createObjectStore(cn)},t.onerror=()=>e(null),t.onblocked=()=>e(null),t.onsuccess=()=>e(t.result)}):Promise.resolve(null)}function ii(n,e){let t=ti().then(i=>new Promise((o,a)=>{if(!i){a(new Error("IndexedDB isn't available."));return}try{let s=i.transaction(cn,n),c=e(s.objectStore(cn));s.oncomplete=()=>{i.close(),o(c.result)},s.onerror=s.onabort=()=>{var u;i.close(),a((u=s.error)!=null?u:new Error("IndexedDB failed."))}}catch(s){i.close(),a(s)}}));return Promise.race([t,new Promise((i,o)=>setTimeout(()=>o(new Error("IndexedDB took too long.")),2e3))])}function ln(n){return ii("readonly",e=>e.get(n))}async function un(n,e){await ii("readwrite",t=>t.put(e,n))}async function wo(n){await ii("readwrite",e=>e.delete(n))}var Te={extensionName:"Syncify",version:"1.13.1",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com",shareUrl:"https://syncs.wsoltani.com"};function $(){var e,t,i,o,a,s,c,u,d;let n=window.SyncifyConfig;return{extensionName:(e=Be(n==null?void 0:n.extensionName))!=null?e:Te.extensionName,version:(t=xo(n==null?void 0:n.version))!=null?t:Te.version,workerUrl:(i=Be(n==null?void 0:n.workerUrl))!=null?i:Te.workerUrl,webUrl:(o=Be(n==null?void 0:n.webUrl))!=null?o:Te.webUrl,githubUrl:(a=Be(n==null?void 0:n.githubUrl))!=null?a:Te.githubUrl,kofiUrl:(s=Be(n==null?void 0:n.kofiUrl))!=null?s:Te.kofiUrl,issueUrl:(c=Be(n==null?void 0:n.issueUrl))!=null?c:Te.issueUrl,releasesUrl:(u=Be(n==null?void 0:n.releasesUrl))!=null?u:Te.releasesUrl,shareUrl:(d=Be(n==null?void 0:n.shareUrl))!=null?d:Te.shareUrl}}function Be(n){return xo(n)}function xo(n){return typeof n=="string"&&n.trim()?n.trim():null}var or="x-syncify-version",sr="x-syncify-install",ar="x-syncify-timezone",vo="install-id",Co="syncify:install-id",rr=2e3,ct=null;async function No(){let n={[or]:$().version,[sr]:(await oi()).id},e=ur();return e&&(n[ar]=e),n}function oi(){return ct!=null||(ct=cr().catch(()=>({id:lt(),inDatabase:!1}))),ct}async function cr(){let n=await Promise.race([lr(),new Promise(e=>setTimeout(()=>e(null),rr))]);if(n)return{id:n,inDatabase:!0};try{let e=window.localStorage.getItem(Co);if(e&&Io(e))return{id:e,inDatabase:!1};let t=lt();return window.localStorage.setItem(Co,t),{id:t,inDatabase:!1}}catch(e){return{id:lt(),inDatabase:!1}}}async function lr(){let n=await ti();return n?new Promise(e=>{let t=null;try{let i=n.transaction(cn,"readwrite"),o=i.objectStore(cn),a=o.get(vo);a.onsuccess=()=>{if(typeof a.result=="string"&&Io(a.result)){t=a.result;return}t=lt(),o.put(t,vo)},i.oncomplete=()=>{n.close(),e(t)},i.onerror=i.onabort=()=>{n.close(),e(null)}}catch(i){n.close(),e(null)}}):null}function lt(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let n=crypto.getRandomValues(new Uint8Array(16));n[6]=n[6]&15|64,n[8]=n[8]&63|128;let e=[...n].map(t=>t.toString(16).padStart(2,"0"));return[e.slice(0,4).join(""),e.slice(4,6).join(""),e.slice(6,8).join(""),e.slice(8,10).join(""),e.slice(10).join("")].join("-")}function Io(n){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(n)}function ur(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(n){return null}}var dr="syncify-signature-v1",yr={name:"ECDSA",hash:"SHA-256"};function ut(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function dt(n){return si(new Uint8Array(await crypto.subtle.exportKey("raw",n)))}async function In(n,e,t,i,o){let a=await fr(e,t,i,o),s=await crypto.subtle.sign(yr,n,a);return si(new Uint8Array(s))}async function fr(n,e,t,i){let{pathname:o,search:a}=new URL(t),s=new TextEncoder,c=si(new Uint8Array(await crypto.subtle.digest("SHA-256",s.encode(i))));return s.encode([dr,n,e.toUpperCase(),o+a,c].join(`
`))}function si(n){let e="";for(let t=0;t<n.length;t++)e+=String.fromCharCode(n[t]);return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var Eo="device-key",ai="session",_o="salt",Ve=null,En,To={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function dn(n){if(Ve)return Ve;let e=await ln(Eo);return pr(e)?(Ve=Promise.resolve(e),e):n?(Ve=ut().then(async t=>(await un(Eo,t),t)),Ve.catch(()=>{Ve=null}),Ve):null}async function V(){let n=await ln(ai);return mr(n)?n:null}function ri(n){return un(ai,n)}async function Je(){await wo(ai).catch(()=>{})}async function yt(){if(En===void 0){let n=await ln(_o).catch(()=>{});En=typeof n=="string"?n:null}return En}async function ft(n){n!==En&&(En=n,await un(_o,n).catch(()=>{}))}function pt(){return To}function Po(n){To=n}function pr(n){let e=n;return!!(e&&e.privateKey instanceof CryptoKey&&e.publicKey instanceof CryptoKey)}function mr(n){let e=n;return!!(e&&typeof e.token=="string"&&e.token&&typeof e.email=="string")}var Ao="install-key",yn=null;function Mo(){return yn!=null||(yn=gr()),yn.catch(()=>{yn=null}),yn.catch(()=>null)}async function gr(){if(!(await oi()).inDatabase)return null;let n=await ln(Ao),e=Sr(n)?n:await hr();return{privateKey:e.privateKey,publicKey:await dt(e.publicKey)}}async function hr(){let n=await ut();return await un(Ao,n),n}function Sr(n){let e=n;return!!(e&&e.privateKey instanceof CryptoKey&&e.publicKey instanceof CryptoKey)}var kr="/api/auth/email-otp/send-verification-otp",br="/api/auth/sign-in/email-otp",wr="/api/auth/get-session",xr="/api/auth/sign-out",vr="/api/auth/link",Cr="x-syncify-device-key",Nr="x-syncify-signature",Lo="x-syncify-salt",Ir="none",Er={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again.",link_failed:"Couldn't open the website. Try again."},v=class extends Error{constructor(t,i=null,o=null){var a;super((a=Er[t])!=null?a:"Sign-in failed. Try again.");this.code=t;this.retryAfter=i;this.share=o;this.name="AccountError"}};function Xe(n){return n instanceof v?n.message:"Sign-in failed. Try again."}async function Oo(n){let e=await Tn(kr,{method:"POST",body:JSON.stringify({email:n,type:"sign-in"})});return typeof(e==null?void 0:e.resend_in)=="number"?e.resend_in:60}async function Do(n,e){var a;let t=await dn(!0).catch(()=>{throw new v("no_device_key")}),i=await Tn(br,{method:"POST",body:JSON.stringify({email:n,otp:e}),keys:t,sendPublicKey:!0});if(typeof(i==null?void 0:i.token)!="string"||!i.token)throw new v("sign_in_failed");let o={token:i.token,email:typeof((a=i.user)==null?void 0:a.email)=="string"?i.user.email:n};return await ri(o).catch(()=>{throw new v("no_device_key")}),ci=!0,o}var ci=!1;async function Uo(){var e;let n=await V();if(!n||ci)return n;try{let t=await mt(n,wr,"GET");ci=!0;let i=(e=t==null?void 0:t.user)==null?void 0:e.email;if(typeof i!="string"||i===n.email)return n;let o=C(g({},n),{email:i});return await ri(o).catch(()=>{}),o}catch(t){if(t instanceof v&&t.code==="signed_out")return null;throw t}}async function Bo(){let n=await V().catch(()=>null);n&&await mt(n,xr,"POST").catch(()=>{}),await Je()}async function $o(){let n=await V();if(!n)throw new v("signed_out");let e=await mt(n,vr,"POST"),t=typeof(e==null?void 0:e.url)=="string"?e.url:"",i=new URL($().webUrl).origin;if(!t.startsWith(`${i}/link#`))throw new v("link_failed");return t}async function _n(n,e,t){let i=await V();if(!i)throw new v("signed_out");return mt(i,n,e,t)}async function Ko(n,e,t){let i=await V().catch(()=>null),o=i?await dn(!1).catch(()=>null):null;await Tn(n,g({method:"POST",body:JSON.stringify(e),headers:t,keepalive:!0},i&&o?{token:i.token,keys:o}:{}))}async function mt(n,e,t,i){let o=await dn(!1);if(!o)throw await Je(),new v("signed_out");return Tn(e,g({method:t,token:n.token,keys:o},i===void 0?{}:{body:JSON.stringify(i)}))}async function Tn(n,e,t=!1){var m,h,S;let i=`${$().webUrl.replace(/\/+$/,"")}${n}`,o=g({},e.headers);if(e.body!==void 0&&(o["content-type"]="application/json"),e.token&&(o.authorization=`Bearer ${e.token}`),e.keys){let N=(m=await yt())!=null?m:Ir;o[Lo]=N,o[Nr]=await In(e.keys.privateKey,N,e.method,i,(h=e.body)!=null?h:""),e.sendPublicKey&&(o[Cr]=await dt(e.keys.publicKey))}let a;try{a=await fetch(i,{method:e.method,headers:o,body:e.body,keepalive:e.keepalive})}catch(N){throw new v("offline")}let s=a.headers.get(Lo);s&&await ft(s);let c=await a.json().catch(()=>null);if(a.ok)return c;let u=typeof(c==null?void 0:c.code)=="string"?c.code:a.status===503?"unavailable":"failed";if(u==="stale_salt"&&e.keys&&!t)return Tn(n,e,!0);u==="signed_out"&&await Je();let d=Number(a.headers.get("retry-after")),f=c==null?void 0:c.share;throw new v(u,Number.isFinite(d)&&d>0?d:(S=_r[u])!=null?S:null,typeof(f==null?void 0:f.code)=="string"?{code:f.code,link:typeof f.link=="string"?f.link:null}:null)}var _r={resend_wait:60,too_many_requests:60,send_failed:60};var Tr="x-syncify-user-hash",Pr="x-syncify-identity",Ar="x-syncify-signature",Mr="x-syncify-install-key",Lr="x-syncify-install-signature",li="x-syncify-salt",Or="none",Dr="/restores",Ur="/installs",Br="hash",Ho=3,Pn=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}},pe=class extends Error{constructor(t){super(t==="not_linked"?"Couldn't read that Spotify account's backups.":"Sign in to restore this backup.");this.code=t;this.name="LockedError"}},Ze=class extends Error{constructor(){super("This Spotify account doesn't accept backups from this install. Sign in to back up."),this.name="InstallRefusedError"}};async function Fo(n,e,t){var a;let i=await $e(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(t)});if(i.status===403&&((a=await i.json().catch(()=>null))==null?void 0:a.code)==="install_refused")throw new Ze;if(!i.ok)throw new Error(`Backup failed with HTTP ${i.status}.`);let o=await i.json().catch(()=>null);return{unchanged:(o==null?void 0:o.unchanged)===!0,unapproved:(o==null?void 0:o.quarantined)===!0}}async function Yo(n,e,t,i){let o=await $e(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({install:t,action:i})},Ur);if(o.ok)return;let a=await o.json().catch(()=>null);if((a==null?void 0:a.code)!=="not_pending")throw new Error(`Couldn't answer with HTTP ${o.status}.`)}async function ui(n,e,t){var h,S,N,x;let i=await $e(n,e,{method:"GET"},zo("/",t));if(i.status===404){let b=await i.json().catch(()=>null);return{exists:!1,payload:null,backups:[],safetyCopy:null,claim:An(b==null?void 0:b.claim),unapproved:[],install:jo(b==null?void 0:b.install)}}if(!i.ok)throw new Error(`Restore failed with HTTP ${i.status}.`);let o=await i.json(),a=An(o.claim),s=jo(o.install);delete o.claim,delete o.install;let c=[o,...(h=o.backup_history)!=null?h:[]];if(!c.every(b=>b.backup))return{exists:!0,payload:o,backups:c.slice(0,Ho),safetyCopy:(S=c[Ho])!=null?S:null,claim:a,unapproved:[],install:s};let u=c.filter(b=>{var T;return((T=b.backup)==null?void 0:T.kind)==="rolling"}),d=(N=c.find(b=>{var T;return((T=b.backup)==null?void 0:T.kind)==="anchor"}))!=null?N:null,f=c.filter(b=>{var T;return((T=b.backup)==null?void 0:T.kind)==="quarantined"}),m=(x=u[0])!=null?x:d;return m?u.length===0&&d?{exists:!0,payload:m,backups:[d],safetyCopy:null,claim:a,unapproved:f,install:s}:{exists:!0,payload:m,backups:u,safetyCopy:d,claim:a,unapproved:f,install:s}:{exists:!1,payload:null,backups:[],safetyCopy:null,claim:a,unapproved:f,install:s}}async function Wo(n,e,t,i){try{await $e(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:t}),keepalive:!0},zo(Dr,i))}catch(o){}}async function $e(n,e,t,i="",o=!1){var x,b,T,O,le;let a=i?`${n.replace(/\/+$/,"")}${i}`:n,s=(x=t.method)!=null?x:"GET",c=await V().catch(()=>null),u=c?await dn(!1).catch(()=>null):null,d=await Mo(),f={},m=(b=await yt())!=null?b:Or;c&&u&&(f.authorization=`Bearer ${c.token}`,f[li]=m,f[Ar]=await In(u.privateKey,m,s,a,(T=t.body)!=null?T:"")),d&&(f[li]=m,f[Mr]=d.publicKey,f[Lr]=await In(d.privateKey,m,s,a,(O=t.body)!=null?O:""));let h=await fetch(a,C(g({},t),{headers:g(C(g(g({},t.headers),await No()),{[Tr]:e.hash,[Pr]:e.field}),f)})),S=h.headers.get(li);if(S&&await ft(S),h.status===426)throw new Pn;if(h.status!==401)return h;let N=(le=await h.clone().json().catch(()=>null))==null?void 0:le.code;if(!o){if(N==="stale_salt"&&(c||d))return $e(n,e,t,i,!0);if(N==="signed_out"&&c)return await Je(),$e(n,e,t,i,!0)}throw N==="claimed"||N==="not_owner"||N==="not_linked"?new pe(N):(N==="signed_out"&&await Je(),new v(typeof N=="string"?N:"failed"))}function zo(n,e){return e?`${n}?${Br}=${encodeURIComponent(e)}`:n}function jo(n){let e=n;if(!e||typeof e.trust!="string")return null;let t=Array.isArray(e.waiting)?e.waiting:[];return{trusted:e.trust!=="pending"&&e.trust!=="rejected",refused:e.trust==="rejected",waiting:t.flatMap(i=>{let o=i;return o&&typeof o.id=="string"&&typeof o.first_seen_at=="number"?[{id:o.id,device:typeof o.device=="string"?o.device:null,first_seen_at:o.first_seen_at}]:[]})}}function An(n){let e=n;return!e||typeof e.mine!="boolean"?null:e.status==="final"?{status:"final",mine:e.mine}:e.status!=="pending"||typeof e.final_at!="number"?null:g({status:"pending",mine:e.mine,email:typeof e.email=="string"?e.email:null,final_at:e.final_at,held:e.held===!0},e.waiting===!0?{waiting:!0}:{})}async function gt(n){let e=new TextEncoder().encode(n),t=await crypto.subtle.digest("SHA-256",e);return[...new Uint8Array(t)].map(i=>i.toString(16).padStart(2,"0")).join("")}function Mn(n){return JSON.stringify(di(n))}function di(n){return Array.isArray(n)?n.map(di):n&&typeof n=="object"?Object.keys(n).sort().reduce((e,t)=>(e[t]=di(n[t]),e),{}):n}function qo(){let n=navigator.userAgent;return/Windows/i.test(n)?"Windows":/Mac OS|Macintosh/i.test(n)?"macOS":/Linux/i.test(n)?"Linux":n}var $r=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,Kr=100,Hr="marketplace:installed-extensions",jr="marketplace:installed-themes",Fr="marketplace:theme-installed",Yr="marketplace:installed:",Wr="marketplace";function fi(n){return Spicetify.Config?pi(Spicetify.Config,n):null}function pi(n,e){var a;let t=Ke(n),i=new Set(zr(e)),o=((a=e[Fr])==null?void 0:a.includes(Yr))===!0;return{current_theme:o?Wr:t.current_theme,color_scheme:o?"":t.color_scheme,extensions:t.extensions.filter(s=>!i.has(s)),custom_apps:t.custom_apps}}function Ke(n){let e=n&&typeof n=="object"?n:{};return{current_theme:yi(e.current_theme)?e.current_theme:"",color_scheme:yi(e.color_scheme)?e.color_scheme:"",extensions:Go(e.extensions),custom_apps:Go(e.custom_apps)}}function Jo(n,e){return Mn(Ke(n))===Mn(Ke(e))}function Go(n){return Array.isArray(n)?[...new Set(n.filter(yi))].sort().slice(0,Kr):[]}function yi(n){return typeof n=="string"&&$r.test(n)}function zr(n){let e=Ro(n[Hr]).map(i=>{var a;let o=(a=Vo(n[i]))==null?void 0:a.manifest;return o&&typeof o=="object"?o.main:void 0}),t=Ro(n[jr]).flatMap(i=>{var a;let o=(a=Vo(n[i]))==null?void 0:a.include;return Array.isArray(o)?o:[]});return[...e,...t].flatMap(i=>{let o=typeof i=="string"?i.split("/").pop():void 0;return o?[o]:[]})}function Ro(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function Vo(n){try{let e=n?JSON.parse(n):null;return e&&typeof e=="object"&&!Array.isArray(e)?e:null}catch(e){return null}}var qr=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],Gr="marketplace:installed:",Xo=`${Gr}snippet:`,Rr="wsoltani/syncify",Vr="marketplace",Zo={added:0,removed:1,unchanged:2};function J(n){let e=new Map;for(let[t,i]of qr)for(let o of Qr(n[t]))e.has(o)||e.set(o,Xr(o,i,n[o]));return[...e.values()]}function Ln(n,e,t,i){let o=new Set(n.map(u=>u.key)),a=new Map(t.map(u=>[u.key,u])),s=[...n.map(u=>{let d=a.get(u.key);return C(g({},u),{change:d?"unchanged":"added",isNew:!d||d.sources.join(" ")!==u.sources.join(" ")})}),...t.filter(u=>!o.has(u.key)).map(u=>C(g({},u),{change:On(u,n)?"unchanged":"removed",isNew:!1}))].sort((u,d)=>Zo[u.change]-Zo[d.change]||u.name.localeCompare(d.name)),c={added:0,removed:0,unchanged:0};for(let u of s)c[u.change]+=1;return{items:s,counts:c,manual:Jr(e,i)}}function On(n,e){return n.type==="extension"&&St(n)&&!e.some(St)}function St(n){var e;return((e=n.repo)==null?void 0:e.toLowerCase())===Rr}function Jr(n,e){if(!n)return[];let t=Ke(n),i=Ke(e),o=[...t.extensions.filter(s=>!i.extensions.includes(s)).map(s=>({type:"extension",name:s})),...t.custom_apps.filter(s=>!i.custom_apps.includes(s)).map(s=>({type:"custom_app",name:s}))],a=t.current_theme;return a&&a!==Vr&&(a!==i.current_theme||t.color_scheme!==i.color_scheme)&&o.push(g({type:"theme",name:a},t.color_scheme?{scheme:t.color_scheme}:{})),o}function Xr(n,e,t){var u,d;let i=Qo(t),o=Qo(i==null?void 0:i.manifest),a=ht(i==null?void 0:i.user),s=ht(i==null?void 0:i.repo),c=(d=(u=ht(i==null?void 0:i.title))!=null?u:ht(o==null?void 0:o.name))!=null?d:n.startsWith(Xo)?n.slice(Xo.length):n.split("/").pop()||n;return{key:n,type:e,name:c,repo:e!=="snippet"&&a&&s?`${a}/${s}`:null,sources:Zr(e,i),custom:e==="snippet"&&(i==null?void 0:i.custom)===!0}}function Zr(n,e){return e?(n==="extension"?[e.extensionURL]:n==="theme"?[e.cssURL,e.schemesURL,...Array.isArray(e.include)?e.include:[]]:[]).filter(i=>typeof i=="string"&&i!==""):[]}function ht(n){return typeof n=="string"&&n.trim()?n.trim():null}function Qr(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function Qo(n){let e=n;if(typeof n=="string")try{e=JSON.parse(n)}catch(t){return null}return e&&typeof e=="object"&&!Array.isArray(e)?e:null}var kt="spicetify-marketplace";var Dn="settings";async function es(){let n=await is();if(n.kind!=="ok")return null;try{let e=await os(n.db,"readonly",i=>i.getAll());if(!e)return null;let t={};for(let i of e)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(t[i.key]=i.value);return t}finally{n.db.close()}}async function ns(n,e=[]){let t=await is();if(t.kind==="unavailable")return"unavailable";let i=t.kind==="ok"?t.db:await ec();if(!i)return"failed";try{return await os(i,"readwrite",a=>{let s;for(let[c,u]of Object.entries(n))s=a.put({key:c,value:u});for(let c of e)s=a.delete(c);return s})===null?"failed":"written"}finally{i.close()}}function ts(){var n;try{return(n=window.indexedDB)!=null?n:null}catch(e){return null}}async function is(){let n=ts();return n?await nc(n)?{kind:"missing"}:new Promise(e=>{let t=!1,i=n.open(kt);i.onupgradeneeded=()=>{t=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),e({kind:"unavailable"})},i.onblocked=()=>e({kind:"unavailable"}),i.onsuccess=()=>{let o=i.result;if(t){o.close(),tc(n).then(()=>e({kind:"missing"}));return}if(!o.objectStoreNames.contains(Dn)){o.close(),e({kind:"unavailable"});return}e({kind:"ok",db:o})}}):{kind:"unavailable"}}function ec(){let n=ts();return n?new Promise(e=>{let t=n.open(kt,1);t.onupgradeneeded=()=>{let i=t.result;i.objectStoreNames.contains(Dn)||i.createObjectStore(Dn,{keyPath:"key"})},t.onerror=()=>{console.warn("Syncify could not create Marketplace storage",t.error),e(null)},t.onblocked=()=>e(null),t.onsuccess=()=>e(t.result)}):Promise.resolve(null)}async function nc(n){if(typeof n.databases!="function")return!1;try{return!(await n.databases()).some(t=>t.name===kt)}catch(e){return!1}}function tc(n){return new Promise(e=>{let t=n.deleteDatabase(kt);t.onsuccess=()=>e(),t.onerror=()=>e(),t.onblocked=()=>e()})}function os(n,e,t){return new Promise(i=>{let o;try{o=n.transaction(Dn,e)}catch(d){console.warn("Syncify could not open a Marketplace transaction",d),i(null);return}let a,s=!1,c=d=>{s||(s=!0,i(d))};o.oncomplete=()=>c(a),o.onerror=()=>{console.warn("Syncify Marketplace transaction failed",o.error),c(null)},o.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",o.error),c(null)};let u;try{u=t(o.objectStore(Dn))}catch(d){console.warn("Syncify Marketplace request could not be issued",d),c(null);return}u&&(u.onsuccess=()=>{a=u.result},u.onerror=()=>{console.warn("Syncify Marketplace request failed",u.error),c(null)})})}var gi="marketplace:",bt=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function ae(){let n=dc(),e=await es();if(e)for(let[t,i]of Object.entries(e))t.startsWith(gi)&&(n[t]=i);return n}var oc=new Set(["marketplace:active-tab","marketplace:sort"]),ss="marketplace:installed:",mi="marketplace:theme-installed",sc=["stars","tags","lastUpdated","created"];async function wt(n,e){let t={};for(let[i,o]of Object.entries(n))oc.has(i)||(t[i]=i.startsWith(ss)?ac(o):o);return e&&(t.spicetify_config=Ke(e)),gt(Mn(t))}function ac(n){try{let e=JSON.parse(n);if(!e||typeof e!="object"||Array.isArray(e))return n;for(let t of sc)delete e[t];return e}catch(e){return n}}async function xt(){let n=await ae(),e=fi(n);return{keyCount:Object.keys(n).length,hash:await wt(n,e),installedItemCount:lc(n),installedItems:vt(n),items:J(n),spicetifyConfig:e,marketplaceAvailable:uc(n)}}async function as(){let n=await ae(),e=fi(n);return g({schema_version:2,metadata:{last_sync_datetime:new Date().toISOString(),device_info:qo(),marketplace_key_count:Object.keys(n).length},payload_hash:await wt(n,e),marketplace_data:{keys:n}},e?{spicetify_config:e}:{})}async function rs(n,e=[]){var a,s;let t={},i=(s=(a=n.marketplace_data)==null?void 0:a.keys)!=null?s:{};for(let[c,u]of Object.entries(i))c.startsWith(gi)&&(t[c]=u);if(Object.keys(t).length===0)return 0;await rc(t),e.length>0&&await cc(t,e);let o=Si(await ae(),t);return await hi(t,o),Object.keys(t).length}async function hi(n,e=[]){for(let[i,o]of Object.entries(n))window.localStorage.setItem(i,o);for(let i of e)window.localStorage.removeItem(i);if(await ns(n,e)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try again.")}function Si(n,e){let t=new Set(bt.flatMap(s=>{var c;return Ct((c=e[s])!=null?c:n[s]).map(String)})),i=vt(n).filter(s=>s.startsWith(ss)&&!t.has(s)),o=i.filter(s=>n[s]!==void 0&&e[s]===void 0),a=n[mi];return a&&e[mi]===void 0&&i.some(s=>a.includes(s))&&o.push(mi),o}async function rc(n){let e=await ae(),t=J(n),i=J(e).filter(s=>On(s,t));if(i.length===0)return;let o="marketplace:installed-extensions",a=Ct(n[o]).map(String);for(let s of i)a.includes(s.key)||a.push(s.key),n[s.key]=e[s.key];n[o]=JSON.stringify(a)}async function cc(n,e){let t=await ae(),i=vt(t);for(let o of bt){if(n[o]===void 0)continue;let a=Ct(n[o]).map(String).filter(s=>!e.includes(s)||i.includes(s));n[o]=JSON.stringify(a)}for(let o of e)t[o]!==void 0?n[o]=t[o]:delete n[o]}function lc(n){return vt(n).length}function vt(n){return bt.flatMap(e=>Ct(n[e]).map(String))}function uc(n){return!!(window.Marketplace||bt.some(t=>n[t]!==void 0)||n["marketplace:tabs"]!==void 0)}function cs(n,e){return e===0?!1:n===0?!0:n<Math.max(2,Math.floor(e*.5))}function dc(){let n={};for(let e=0;e<window.localStorage.length;e+=1){let t=window.localStorage.key(e);if(!(t!=null&&t.startsWith(gi)))continue;let i=window.localStorage.getItem(t);i!==null&&(n[t]=i)}return n}function Ct(n){if(!n)return[];try{let e=JSON.parse(n);return Array.isArray(e)?e:[]}catch(e){return[]}}var yc="raw.githubusercontent.com",fc="cdn.jsdelivr.net",ls=".github.io";function bi(n){var t;if(n.protocol!=="https:")return null;let e=n.pathname.split("/").filter(Boolean);if(n.host===yc)return ki(e[0],e[1]);if(n.host===fc)return e[0]==="gh"?ki(e[1],(t=e[2])==null?void 0:t.split("@")[0]):null;if(n.host.endsWith(ls)){let i=n.host.slice(0,-ls.length);return i.includes(".")?null:ki(i,e.length>1?e[0]:n.host)}return null}function ki(n,e){return n&&e?`${n}/${e}`:null}var pc={extension:"spicetify-extensions",theme:"spicetify-themes"},mc="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",gc="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",hc="https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/",Sc="https://api.github.com/repos",kc=5e3,bc=20,us="syncify:repo-topics",ds=10080*60*1e3,wc=200;function He(n){return(n==null?void 0:n.kind)==="host"||(n==null?void 0:n.kind)==="repo"||(n==null?void 0:n.kind)==="blocked"||(n==null?void 0:n.kind)==="catalog"}function $n(n){let e=new Map;for(let t of n){if(t.change==="removed")continue;if(t.custom){e.set(t.key,{kind:"custom"});continue}let i=xc(t);i&&e.set(t.key,i)}return e}async function Kn(n,e){let t=new Map,i=n.filter(s=>s.change!=="removed"&&s.isNew&&!e.has(s.key));if(i.length===0)return t;let o=i.filter(s=>s.type==="snippet"),a=i.filter(s=>s.type!=="snippet");if(o.length>0){let s=await wi();for(let c of o)s?Nt(s,c.name)||t.set(c.key,{kind:"catalog"}):t.set(c.key,{kind:"unchecked"})}if(a.length>0){let s=await Nc(),c=_c(),u=0;await Promise.all(a.map(async d=>{let f=vc(d),m=pc[d.type];if(!f||!m)return;if(s===null){t.set(d.key,{kind:"unchecked"});return}if(Cc(f,s)){t.set(d.key,{kind:"blocked"});return}let h=Ec(c,f);h===void 0&&u<bc&&(u+=1,h=await Ic(f),h!==void 0&&(c[f.toLowerCase()]={topics:h,at:Date.now()})),h===void 0?t.set(d.key,{kind:"unchecked"}):(h===null||!h.includes(m))&&t.set(d.key,{kind:"catalog"})})),Tc(c)}return t}function xc(n){let e=null;for(let t of n.sources){let i;try{i=new URL(t)}catch(a){return{kind:"host",host:t.slice(0,40)}}let o=bi(i);if(!o)return{kind:"host",host:i.host};n.repo&&o.toLowerCase()!==n.repo.toLowerCase()&&(e!=null||(e=o))}return e?{kind:"repo",repo:e}:null}function vc(n){for(let e of n.sources)try{let t=bi(new URL(e));if(t)return t}catch(t){}return n.repo}function Cc(n,e){let t=`https://github.com/${n}`.toLowerCase();return e.some(i=>{let o=i.toLowerCase();if(!o.includes("*"))return o===t;let a=o.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${a}$`).test(t)})}function ys(n){return n.replace(/\n/g,"").trim().toLowerCase()}function Nt(n,e){return n.get(ys(e))}var Un=null,Bn=null;function Nc(){return Un!=null||(Un=fs(mc).then(n=>{let e=n==null?void 0:n.repos;return Array.isArray(e)?e.filter(t=>typeof t=="string"&&!t.startsWith("//")):(Un=null,null)})),Un}function wi(){return Bn!=null||(Bn=fs(gc).then(n=>{if(!Array.isArray(n))return Bn=null,null;let e=new Map;for(let t of n){if(typeof(t==null?void 0:t.title)!="string"||typeof t.code!="string")continue;let i=typeof t.preview=="string"?t.preview:null;e.set(ys(t.title),g({title:t.title,code:t.code,description:typeof t.description=="string"?t.description:""},i?{imageURL:i.startsWith("http")?i:`${hc}${i}`}:{}))}return e})),Bn}async function Ic(n){let e=await ps(`${Sc}/${n}`);if((e==null?void 0:e.status)===404)return null;if(!(e!=null&&e.ok))return;let t=await e.json().catch(()=>null);return Array.isArray(t==null?void 0:t.topics)?t.topics.filter(i=>typeof i=="string"):void 0}async function fs(n){let e=await ps(n);return e!=null&&e.ok?e.json().catch(()=>null):null}async function ps(n){let e=typeof AbortController=="function"?new AbortController:null,t=setTimeout(()=>e==null?void 0:e.abort(),kc);try{return await fetch(n,{signal:e==null?void 0:e.signal})}catch(i){return null}finally{clearTimeout(t)}}function Ec(n,e){let t=n[e.toLowerCase()];return t&&Date.now()-t.at<ds?t.topics:void 0}function _c(){var n;try{let e=JSON.parse((n=localStorage.getItem(us))!=null?n:"{}");return e&&typeof e=="object"?e:{}}catch(e){return{}}}function Tc(n){let e=Date.now(),t=Object.entries(n).filter(([,i])=>e-i.at<ds).sort(([,i],[,o])=>o.at-i.at).slice(0,wc);try{localStorage.setItem(us,JSON.stringify(Object.fromEntries(t)))}catch(i){}}var Pc=/^[0-9A-HJKMNP-TV-Z]{6}$/,Ac=6,Mc="SYN-",Ss=60,xi=20,ks=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],bs="marketplace:installed:",rd=`${bs}snippet:`,Qe="marketplace:theme-installed",ms="marketplace",gs={added:0,removed:1,unchanged:2},Lc=new RegExp(`^[a-z0-9][a-z0-9_-]{1,${xi-2}}[a-z0-9]$`);function ws(n){let e=n.trim().replace(/^@/,"").toLowerCase();return/[^a-z0-9_-]/.test(e)?"Only letters, digits, _ and -":e.length<3?"At least 3 characters":!/^[a-z0-9]/.test(e)||!/[a-z0-9]$/.test(e)?"Start and end with a letter or digit":null}function je(n){return`${Mc}${n}`}function xs(n){let e=n.trim();if(e.length>200)return null;if(e.includes("/")){let i=e.split(/[?#]/)[0].replace(/\/+$/,"");e=i.slice(i.lastIndexOf("/")+1).replace(/\.json$/i,"")}e=e.toUpperCase().replace(/[\s-]/g,""),e.length===Ac+3&&e.startsWith("SYN")&&(e=e.slice(3));let t=e.replace(/O/g,"0").replace(/[IL]/g,"1");return Pc.test(t)?t:null}function vs(n){let e=n;return!e||typeof e.code!="string"||!e.keys||typeof e.keys!="object"||!Object.values(e.keys).every(t=>typeof t=="string")?null:{code:e.code,name:typeof e.name=="string"&&e.name?e.name:null,creator:typeof e.creator=="string"&&Lc.test(e.creator)?e.creator:null,updated_at:typeof e.updated_at=="number"?e.updated_at:0,keys:e.keys}}async function Cs(n,e){let t=n.filter(s=>!St(s)).map(s=>C(g({},s),{change:"added",isNew:!0})),i=$n(t);for(let s of t)!i.has(s.key)&&!Oc(s,e[s.key])&&i.set(s.key,{kind:"catalog"});let o=await Kn(t,i),a=new Map;for(let[s,c]of[...o,...i])c.kind!=="unchecked"&&a.set(s,c);return{items:t,leftOut:a}}function Oc(n,e){if(n.type==="snippet")return!0;if(!n.repo)return!1;let t=Bc(e);return n.type==="extension"?typeof(t==null?void 0:t.extensionURL)=="string"&&t.extensionURL!=="":typeof(t==null?void 0:t.cssURL)=="string"&&t.cssURL!==""}function Ns(n,e){let t={};for(let[o,a]of ks){let s=e.filter(c=>c.type===a&&n[c.key]!==void 0).map(c=>c.key);t[o]=JSON.stringify(s);for(let c of s)t[c]=n[c]}let i=vi(n[Qe]);return i&&e.some(o=>o.key===i)&&(t[Qe]=n[Qe]),t}function Is(n,e,t,i,o){let a=o==="replace"?Ln(e,void 0,t,i):Dc(e,t),s=vi(n.keys[Qe]),c=s!==null&&e.some(u=>u.key===s)&&i!==null&&i.current_theme!==ms;return C(g({},a),{manual:c?[{type:"theme",name:ms}]:[]})}function Dc(n,e){let t=new Set(e.map(s=>s.key)),i=new Set(n.map(s=>s.key)),o=[...n.map(s=>t.has(s.key)?C(g({},s),{change:"unchanged",isNew:!1}):C(g({},s),{change:"added",isNew:!0})),...e.filter(s=>!i.has(s.key)).map(s=>C(g({},s),{change:"unchanged",isNew:!1}))].sort((s,c)=>gs[s.change]-gs[c.change]||s.name.localeCompare(c.name)),a={added:0,removed:0,unchanged:0};for(let s of o)a[s.change]+=1;return{items:o,counts:a,manual:[]}}function Es(n,e){return new Set(n.items.filter(t=>t.type==="snippet"&&t.change==="added"&&(!e||!Nt(e,t.name))).map(t=>t.key))}async function _s(n,e,t,i){let o=await ae(),a=J(o),s=J(n.keys),c={};for(let[m,h]of ks){let S=hs(o[m]),x=[...e==="add"?S:S.filter(b=>t.includes(b)||a.some(T=>T.key===b&&On(T,s)))];for(let b of s){if(b.type!==h||t.includes(b.key))continue;let T=S.includes(b.key);if(e==="add"&&T)continue;let O=h==="snippet"?Uc(b,i,o[b.key]):n.keys[b.key];O!==void 0&&(c[b.key]=O,x.includes(b.key)||x.push(b.key))}c[m]=JSON.stringify(x)}let u=vi(n.keys[Qe]),d=hs(c["marketplace:installed-themes"]);u&&d.includes(u)&&!t.includes(u)&&(c[Qe]=n.keys[Qe]);let f=Si(o,c);return await hi(c,f),Object.keys(c).length+f.length}function Uc(n,e,t){let i=e?Nt(e,n.name):void 0;return i?JSON.stringify(g({code:i.code,title:i.title,description:i.description},i.imageURL?{imageURL:i.imageURL}:{})):t}function vi(n){if(!n)return null;if(n.startsWith(bs))return n;try{let e=JSON.parse(n);return typeof e=="string"?e:null}catch(e){return null}}function hs(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function Bc(n){try{let e=n?JSON.parse(n):null;return e&&typeof e=="object"&&!Array.isArray(e)?e:null}catch(e){return null}}var Hn="/api/shares",$c=`${Hn}/update`,Kc=`${Hn}/delete`,Hc=`${Hn}/import`,jc="x-syncify-user-hash",Fc={no_code:"This code doesn't exist.",too_many_codes:"You can't make more share codes. Delete one to make another.",daily_limit:"Too many changes to share codes today. Try again tomorrow.",too_large:"This setup is too big to share.",invalid_name:"Names are up to 60 characters.",empty:"There's nothing to share yet. Install something from Marketplace first.",invalid_items:"Syncify couldn't read some items. Reload Spotify and try again.",source:"Some items don't load from GitHub. Reload Spotify and try again.",blocked:"Some items are on Marketplace's block list. Reload Spotify and try again.",custom_snippet:"Custom snippets can't be shared. Reload Spotify and try again.",unchecked:"Couldn't check Marketplace's block list. Try again in a minute.",publish_failed:"Couldn't publish the code. Press Update on it to try again.",delete_failed:"Couldn't delete the code. Try again.",same_setup:"You already shared this setup.",invalid_handle:"Handles are 3 to 20 letters, digits, _ or -, starting and ending with a letter or digit.",reserved_handle:"That handle isn't allowed. Pick another.",handle_taken:"That handle is taken. Pick another.",unavailable:"Share codes aren't available yet."},Yc=new Set(["offline","signed_out","invalid_signature","stale_salt","no_device_key","too_many_requests"]);function It(n,e=null){var t;return n instanceof v&&Yc.has(n.code)?Xe(n):n instanceof v&&n.code==="too_many_codes"&&e!==null?`You have ${e} share codes already. Delete one to make another.`:(t=n instanceof v?Fc[n.code]:void 0)!=null?t:"Something went wrong. Try again."}async function Ci(){var e;let n=await _n(Hn,"GET");return{codes:Array.isArray(n==null?void 0:n.codes)?n.codes.flatMap(t=>{let i=Wc(t);return i?[i]:[]}):[],max:typeof(n==null?void 0:n.max)=="number"?n.max:null,profile:typeof((e=n==null?void 0:n.profile)==null?void 0:e.handle)=="string"?{handle:n.profile.handle,link:typeof n.profile.link=="string"?n.profile.link:null}:null,suggestedHandle:typeof(n==null?void 0:n.suggested_handle)=="string"?n.suggested_handle:null}}async function Ts(n,e,t){return Os(await _n(Hn,"POST",g({name:n,keys:e},t===void 0?{}:{handle:t})))}function Ni(n){return`${$().shareUrl.replace(/\/+$/,"")}/@${n}`}async function Ps(n,e,t){return Os(await _n($c,"POST",{code:n,name:e,keys:t}))}async function As(n){try{await _n(Kc,"POST",{code:n})}catch(e){if(e instanceof v&&e.code==="no_code")return;throw e}}async function Ms(n){let e=$().shareUrl.replace(/\/+$/,""),t;try{t=await fetch(`${e}/${n}.json`)}catch(o){throw new v("offline")}if(t.status===404||t.status===403)throw new v("no_code");if(!t.ok)throw new v("failed");let i=vs(await t.json().catch(()=>null));if(!i||i.code!==n)throw new v("no_code");return i}async function Ls(n,e){try{await Ko(Hc,{code:n},{[jc]:e.hash})}catch(t){}}function Wc(n){let e=n;return!e||typeof e.code!="string"?null:{code:e.code,name:typeof e.name=="string"&&e.name?e.name:null,link:typeof e.link=="string"?e.link:null,item_count:typeof e.item_count=="number"?e.item_count:0,imports:typeof e.imports=="number"?e.imports:0,created_at:typeof e.created_at=="number"?e.created_at:0,updated_at:typeof e.updated_at=="number"?e.updated_at:0}}function Os(n){let e=n;if(typeof(e==null?void 0:e.code)!="string")throw new v("failed");return{code:e.code,link:typeof e.link=="string"?e.link:null,leftOut:Array.isArray(e.left_out)?e.left_out.length:0}}var Ds="/claims",zc="/claims/cancel",qc={no_backup:"Back up first, then secure your backup.",unsupported_identity:"This Spotify account can't be secured.",too_many_accounts:"Your account already has 10 Spotify accounts linked.",offline:"Couldn't reach Syncify. Check your connection and try again."},Fe=class extends Error{constructor(t){var i;super((i=qc[t])!=null?i:"Couldn't secure your backup. Try again.");this.code=t;this.name="ClaimError"}};async function Us(n,e){let t=await Ii(n,e,"GET",Ds);if(!t.ok)throw new Fe(await Ei(t));let i=await t.json().catch(()=>null);return{claim:An(i==null?void 0:i.claim),accounts:Array.isArray(i==null?void 0:i.accounts)?i.accounts.filter(Gc):null}}async function Bs(n,e){let t=await Ii(n,e,"POST",Ds);if(!t.ok)throw new Fe(await Ei(t));let i=await t.json().catch(()=>null);return An(i==null?void 0:i.claim)}async function $s(n,e){let t=await Ii(n,e,"POST",zc);if(!t.ok&&t.status!==404)throw new Fe(await Ei(t))}async function Ii(n,e,t,i){try{return await $e(n,e,{method:t},i)}catch(o){throw o instanceof TypeError?new Fe("offline"):o}}async function Ei(n){let e=await n.json().catch(()=>null);return typeof(e==null?void 0:e.code)=="string"?e.code:"failed"}function Gc(n){let e=n;return!!(e&&typeof e.hash=="string"&&(e.status==="pending"||e.status==="final"||e.status==="cancelled"))}var pn={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},Rc=/^([a-z0-9]|f([1-9]|1[0-2]))$/,Vc=250,Jc=40,_i=null,Et=null,fn=null;function Ks(){return/mac/i.test(navigator.platform||navigator.userAgent)}function Hs(n){if(n===null)return null;if(!n||typeof n!="object")return pn;let e=n;return typeof e.key!="string"||!Rc.test(e.key)?pn:{key:e.key,ctrl:!!e.ctrl,alt:!!e.alt,shift:!!e.shift,meta:!!e.meta}}function jn(n){if(!n)return"Off";let e=n.key.toUpperCase();return Ks()?[n.ctrl?"\u2318":"",n.alt?"\u2325":"",n.shift?"\u21E7":"",e].join(""):[n.ctrl&&"Ctrl",n.meta&&"Win",n.alt&&"Alt",n.shift&&"Shift",e].filter(Boolean).join("+")}function js(n){if(n.key==="Escape")return{kind:"cancel"};let e=Xc(n.code);if(!e)return{kind:"ignore"};let t=Ks();if(t&&n.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:e,ctrl:t?n.metaKey:n.ctrlKey,alt:n.altKey,shift:n.shiftKey,meta:t?!1:n.metaKey},o=e.startsWith("f")&&e.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!o?{kind:"error",message:`Include ${t?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function Xc(n){var t,i;let e=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(n);return e?((i=(t=e[1])!=null?t:e[2])!=null?i:e[3]).toLowerCase():null}function Fs(n){var e;if(fn&&Zc(fn,n))return!1;try{let t=Spicetify.Mousetrap,i=(e=t.trigger)==null?void 0:e.call(t)._directMap;if(!i)return!1;let o=Ti(n);return Object.keys(i).some(a=>a.startsWith(`${o}:`))}catch(t){return!1}}function Pi(n,e,t=0){if(_i=e,Et=n,!Ys()){if(t>=Jc){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>Pi(Et,e,t+1),Vc);return}Ai(Et)}function Ai(n){if(Et=n,!Ys()||!_i)return;let e=_i;try{if(fn&&Spicetify.Keyboard._deregisterShortcut(fn),fn=null,!n)return;Spicetify.Keyboard.registerShortcut(n,t=>{t.preventDefault(),e()}),fn=n,console.debug("[Syncify]","Keyboard shortcut registered",jn(n))}catch(t){console.warn("[Syncify]","Failed to register keyboard shortcut",t)}}function Ys(){var n;return typeof((n=Spicetify.Keyboard)==null?void 0:n.registerShortcut)=="function"}function Ti(n){return[n.ctrl&&"mod",n.meta&&"meta",n.alt&&"alt",n.shift&&"shift",n.key].filter(Boolean).join("+")}function Zc(n,e){return Ti(n)===Ti(e)}var Mi="both",Qc=["both","topbar","menu"],Fn=null,Yn=null,_t=!1;function Ws(n){return Qc.includes(n)?n:Mi}function zs(){var n;return typeof((n=Spicetify.Menu)==null?void 0:n.Item)=="function"}function qs(n){Fn=n.topbarButton,Yn=n.menuItem}function Tt(n){let e=n!=="menu"||!Yn,t=n!=="topbar";if(Fn!=null&&Fn.element&&(Fn.element.style.display=e?"":"none"),!!Yn)try{t&&!_t?(Yn.register(),_t=!0):!t&&_t&&(Yn.deregister(),_t=!1)}catch(i){console.warn("[Syncify]","Failed to update profile menu item",i)}}var At="syncify:config",Pt={workerUrl:$().workerUrl,autoBackupEnabled:!1,shortcut:pn,entryPoint:Mi};function re(){var t,i;let n=$(),e=(i=(t=Spicetify.LocalStorage)==null?void 0:t.get(At))!=null?i:window.localStorage.getItem(At);if(!e)return C(g({},Pt),{workerUrl:n.workerUrl});try{let o=JSON.parse(e);return{workerUrl:n.workerUrl,autoBackupEnabled:o.autoBackupEnabled===void 0?Pt.autoBackupEnabled:!!o.autoBackupEnabled,shortcut:o.shortcut===void 0?Pt.shortcut:Hs(o.shortcut),entryPoint:Ws(o.entryPoint)}}catch(o){return C(g({},Pt),{workerUrl:n.workerUrl})}}function Mt(n){var t;let e=JSON.stringify({workerUrl:$().workerUrl,autoBackupEnabled:n.autoBackupEnabled,shortcut:n.shortcut,entryPoint:n.entryPoint});if((t=Spicetify.LocalStorage)!=null&&t.set){Spicetify.LocalStorage.set(At,e);return}window.localStorage.setItem(At,e)}function Wn(n){return typeof n.workerUrl=="string"&&n.workerUrl.length>0}var el=["username","canonicalUsername","id","uri","displayName"];async function me(){let{value:n,field:e}=await nl();return{hash:await gt(n),field:e}}async function nl(){var o;let n=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(n!=null&&n.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let e=await n.getUser(),t=el.find(a=>(e==null?void 0:e[a])!=null),i=t?e[t]:void 0;if(!t||!i)throw new Error("Unable to resolve the active Spotify user.");return{value:i,field:t}}async function qn(n){if(!Wn(n))throw new Error("Syncify backup service is not configured.");let[e,t]=await Promise.all([me(),as()]);if(t.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:i,unapproved:o}=await Fo(n.workerUrl,e,t);return{payload:t,unchanged:i,unapproved:o}}async function mn(n,e){var c;if(!Wn(n))throw new Error("Syncify backup service is not configured.");let t=await ui(n.workerUrl,await me(),e),[i,o,a]=await Promise.all([Promise.all(t.backups.map(Oi)),t.safetyCopy?Oi(t.safetyCopy):null,Promise.all(t.unapproved.map(Oi))]),s=i.filter((u,d)=>i.findIndex(f=>f.payload_hash===u.payload_hash)===d);return C(g({},t),{payload:(c=s[0])!=null?c:null,backups:s,safetyCopy:o&&!s.some(u=>u.payload_hash===o.payload_hash)?o:null,unapproved:a.filter(u=>!s.some(d=>d.payload_hash===u.payload_hash))})}var Li=new Map;async function Oi(n){var a,s,c;let e=(s=(a=n.marketplace_data)==null?void 0:a.keys)!=null?s:{},t=n.spicetify_config?pi(n.spicetify_config,e):void 0,i=`${n.payload_hash} ${(c=n.metadata)==null?void 0:c.last_sync_datetime}`,o=Li.get(i);return o||(o=wt(e,t),Li.set(i,o),o.catch(()=>Li.delete(i))),C(g(g({},n),t?{spicetify_config:t}:{}),{payload_hash:await o})}async function Gs(n){let e=await ui(Gn(n),await me());return{claim:e.claim,install:e.install}}async function Rs(n,e,t,i=[]){var c;let o=e!=null?e:(await mn(n)).payload;if(!o)throw new Error("No Syncify cloud backup was found for this Spotify account.");let a=await rs(o,i),s=(c=o.backup)==null?void 0:c.id;return s&&Wn(n)&&me().then(u=>Wo(n.workerUrl,u,s,t)).catch(()=>{}),{payload:o,restoredCount:a}}var zn=class extends Error{constructor(t){super("Couldn't back up your setup first, so nothing changed.");this.reason=t;this.name="SafetyBackupError"}};async function Vs(n,e,t,i,o){try{await qn(n)}catch(s){throw new zn(s)}let a=await _s(e,t,i,o);return me().then(s=>Ls(e.code,s)).catch(()=>{}),a}async function Js(n){let e=await me(),t=await Us(Gn(n),e);return C(g({},t),{hash:e.hash})}async function Xs(n){await Bs(Gn(n),await me())}async function Lt(n,e,t){await Yo(Gn(n),await me(),e,t)}async function Ot(n){await $s(Gn(n),await me())}function Gn(n){if(!Wn(n))throw new Error("Syncify backup service is not configured.");return n.workerUrl}var Dt="syncify:claim-check-day";async function Qs(n){var t,i,o;let e=re();if(e.workerUrl){if(!e.autoBackupEnabled)return tl(n);try{let[a,s]=await Promise.all([xt(),mn(e)]);ea(s,n);let c=(i=(t=s.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?i:0;if(s.exists&&cs(a.keyCount,c)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((o=s.payload)==null?void 0:o.payload_hash)===a.hash||a.keyCount===0)return;let{unapproved:u}=await qn(e);Spicetify.showNotification(u?"Syncify: backed up, waiting for approval":"Syncify auto-backup complete")}catch(a){if(a instanceof pe||a instanceof Ze){Spicetify.showNotification("Syncify: sign in to keep backing up",!0,8e3);return}let s=a instanceof Error?a.message:String(a);console.warn("Syncify startup sync failed:",a),Spicetify.showNotification(`Syncify auto-sync skipped: ${s}`,!0,8e3)}}}async function tl(n){let e=new Date().toLocaleDateString("en-CA");if(ol()!==e)try{let t=await Gs(re());Zs(e),ea(t,n)}catch(t){if(t instanceof pe){Zs(e);return}console.warn("Syncify claim check failed:",t)}}function ea(n,e){var o;let t=il(n.claim),i=(o=n.install)==null?void 0:o.waiting[0];t?e.onClaim(t):i&&e.onInstall(i)}function il(n){return(n==null?void 0:n.status)==="pending"&&!n.mine?n:null}function ol(){var n,e;return(e=(n=Spicetify.LocalStorage)==null?void 0:n.get(Dt))!=null?e:window.localStorage.getItem(Dt)}function Zs(n){var e;(e=Spicetify.LocalStorage)!=null&&e.set?Spicetify.LocalStorage.set(Dt,n):window.localStorage.setItem(Dt,n)}var Ui="syncify:pending-restore",sl=600*1e3,al=2e3,rl=15e3,cl="marketplace:theme-installed",ll="raw.githubusercontent.com",ul=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],ge=null,Di=new Set,ia=new Map;function oa(){return ge}function sa(n){return Di.add(n),()=>Di.delete(n)}function aa(){ge&&da(C(g({},ge),{manual:[]}))}function Bt(n,e="restore"){try{localStorage.setItem(Ui,JSON.stringify({at:Date.now(),manual:n,kind:e}))}catch(t){}}function ra(){var n;Bt((n=ge==null?void 0:ge.manual)!=null?n:[],ge==null?void 0:ge.kind),window.location.reload()}function ca(){ya()&&(document.addEventListener("load",n=>na(n.target,"load"),!0),document.addEventListener("error",n=>na(n.target,"error"),!0))}async function la(){let n=ya();if(!n)return;try{localStorage.removeItem(Ui)}catch(s){}let e=Date.now(),t=await ta();for(;t.loaded<t.total&&Date.now()-e<rl;)await new Promise(s=>setTimeout(s,al)),t=await ta();da(C(g({kind:n.kind,at:Date.now()},t),{manual:n.manual}));let i=t.loaded===t.total&&n.manual.length===0,o=n.kind==="share"?"Setup applied":"Backup restored",a=n.kind==="share"?"loaded":"restored";Spicetify.showNotification(i?`Syncify: ${o}; ${t.total} ${t.total===1?"item":"items"}`:`Syncify: ${a} ${t.loaded} of ${t.total}. Open Syncify for details.`,!1,8e3)}function ua(n){let e=n.map(t=>t.type==="extension"?`spicetify config extensions ${Ut(t.name)}`:t.type==="custom_app"?`spicetify config custom_apps ${Ut(t.name)}`:`spicetify config current_theme ${Ut(t.name)}${t.scheme?` color_scheme ${Ut(t.scheme)}`:""}`);return e.length>0?[...e,"spicetify apply"]:[]}function Ut(n){return/^[\w.@+/-]+$/.test(n)?n:`"${n}"`}function da(n){ge=n;for(let e of Di)e(n)}function ya(){var n;try{let e=JSON.parse((n=localStorage.getItem(Ui))!=null?n:"null");return!e||Date.now()-e.at>sl?null:{manual:Array.isArray(e.manual)?e.manual:[],kind:e.kind==="share"?"share":"restore"}}catch(e){return null}}function na(n,e){n instanceof HTMLScriptElement&&n.src&&ia.set(Rn(n.src),e)}async function ta(){var i;let n=await ae(),e=(i=n[cl])!=null?i:"",t=J(n).filter(o=>o.type==="extension"&&o.sources.length>0||o.type==="theme"&&e.includes(o.key)||o.type==="snippet");return{loaded:t.filter(dl).length,total:t.length}}function dl(n){var e,t;if(n.type==="snippet"){let i=document.querySelector("style.marketplaceSnippets");return((e=i==null?void 0:i.textContent)==null?void 0:e.includes(`/* ${n.name} - `))===!0}if(n.type==="theme"){let i=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((t=i==null?void 0:i.textContent)!=null&&t.trim())}return yl(n.sources[0]).some(fl)}function yl(n){let e;try{e=new URL(n)}catch(s){return[]}if(e.host!==ll)return[Rn(e.href)];let[t,i,o,...a]=e.pathname.split("/").filter(Boolean);return!t||!i||!o||a.length===0?[]:ul.map(s=>Rn(`https://${s}/gh/${t}/${i}@${o}/${a.join("/")}`))}function fl(n){let e=ia.get(n);return e?e==="load":[...document.querySelectorAll("script[src]")].some(i=>Rn(i.src)===n)&&performance.getEntriesByType("resource").some(i=>Rn(i.name)===n)}function Rn(n){try{let e=new URL(n);return`${e.origin}${e.pathname}`}catch(e){return n}}function Bi(n){return`A new install${n.device?` on ${n.device}`:""} wants to back up this Spotify account.`}function fa(n){let e=Spicetify.React,t=e.useState,{install:i}=n,[o,a]=t(!1),[s,c]=t(null);async function u(d){a(!0),c(null);try{await Lt(re(),i.id,d),Spicetify.showNotification(d==="approve"?"Syncify: install approved":"Syncify: install refused"),n.onDone(d)}catch(f){c(f instanceof Error?f.message:String(f)),a(!1)}}return e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-claim-notice"},Bi(i)," Approve it if it's yours."),s?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},s):null,e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:n.onClose,disabled:o},"Close"),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{u("reject")},disabled:o},"Not mine"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{u("approve")},disabled:o},"Approve")))}var pl="syncify:beta",pa=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function ma(){var n;return(n=window.SyncifyLoader)!=null?n:null}function ml(){try{return window.localStorage.getItem(pl)==="true"}catch(n){return!1}}async function ga(n){let e=ml()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(e.map(i=>gl(`${n}/${i}`)))).reduce((i,o)=>o&&(!i||Ki(o,i)>0)?o:i,null)}function $i(n){return typeof n=="string"&&pa.test(n)}function Ki(n,e){let[t,i]=[n,e].map(o=>{var d;let[,a,s,c,u]=(d=pa.exec(o))!=null?d:[];return[a,s,c,u!=null?u:1/0].map(Number)});for(let o=0;o<t.length;o+=1)if(t[o]!==i[o])return t[o]<i[o]?-1:1;return 0}async function gl(n,e=3e3){let t=typeof AbortController=="function"?new AbortController:null,i=setTimeout(()=>t==null?void 0:t.abort(),e);try{let o=await fetch(n,{signal:t==null?void 0:t.signal});if(!o.ok)return null;let a=await o.json();return $i(a==null?void 0:a.version)?a.version:null}catch(o){return null}finally{clearTimeout(i)}}var Fi="syncify:share-code-count",hl=600;function Sl(){var e,t;let n=Number((t=(e=Spicetify.LocalStorage)==null?void 0:e.get(Fi))!=null?t:NaN);return Number.isInteger(n)&&n>=0?n:null}function ha(n){var e,t;n===null?(e=Spicetify.LocalStorage)==null||e.remove(Fi):(t=Spicetify.LocalStorage)==null||t.set(Fi,String(n))}var Yi="syncify:handle";function kl(){var e;let n=(e=Spicetify.LocalStorage)==null?void 0:e.get(Yi);return n==null?void 0:n||null}function Hi(n){var e,t;n===void 0?(e=Spicetify.LocalStorage)==null||e.remove(Yi):(t=Spicetify.LocalStorage)==null||t.set(Yi,n!=null?n:"")}var w=null;function zi(n={}){var co,lo,uo,yo,fo,po,mo,go;let e=Spicetify.React,t=e.useEffect,i=e.useMemo,o=e.useState,a=e.useRef,[s,c]=o(()=>re()),[u,d]=o(()=>w!=null&&w.remote.exists?"success":"idle"),[f,m]=o(null),[h,S]=o(0),[N,x]=o([]),[b,T]=o([]),[O,le]=o(null),[he,Q]=o(null),[K,z]=o(null),[H,ee]=o(()=>{var r;return(r=w==null?void 0:w.remote.payload)!=null?r:null}),[te,G]=o(()=>{var r;return(r=w==null?void 0:w.remote.backups)!=null?r:[]}),[ue,k]=o(()=>{var r;return(r=w==null?void 0:w.remote.safetyCopy)!=null?r:null}),[I,Se]=o(()=>{var r;return(r=w==null?void 0:w.remote.unapproved)!=null?r:[]}),[j,q]=o(()=>{var r;return(r=w==null?void 0:w.remote.install)!=null?r:null}),[Pe,ie]=o(!1),[ke,Sn]=o(()=>new Set),[E,A]=o(()=>{var r;return(r=w==null?void 0:w.remote.payload)!=null?r:null}),[ne,Ye]=o(w!==null),[en,D]=o(!1),[Ae,be]=o(!1),[we,Me]=o(null),[oe,xe]=o(!1),[Le,U]=o(null),[de,kn]=o((co=n.section)!=null?co:null),[ve,We]=o(!1),[M,nn]=o(()=>oa()),[Jn,ze]=o(!1),[L,Oe]=o(!1),[X,tn]=o(null),[Ce,bn]=o(()=>Sl()),[Yt,on]=o(()=>kl()),[se,qe]=o(void 0),[B,sn]=o(()=>{var r;return(r=w==null?void 0:w.lockedBy)!=null?r:null}),[De,Xn]=o(()=>{var r;return(r=w==null?void 0:w.remote.claim)!=null?r:null}),[Ne,Zn]=o(()=>{var r;return(r=w==null?void 0:w.claims)!=null?r:null}),[Ge,an]=o(!1),[Qn,wn]=o(null),[Wt,et]=o(!1),[F,rn]=o(null),[y,p]=o(null),P=a(null),Y=i(()=>$(),[]),Ie=i(()=>ue?[...te,ue]:te,[te,ue]),zt=F?[]:I,qt=F?(lo=y==null?void 0:y.backups)!=null?lo:[]:te,Ri=F?(uo=y==null?void 0:y.safetyCopy)!=null?uo:null:ue,Vi=i(()=>{var r;return new Map([...Ie,...I,...(r=y==null?void 0:y.backups)!=null?r:[],...y!=null&&y.safetyCopy?[y.safetyCopy]:[]].map(l=>[l,J(l.marketplace_data.keys)]))},[Ie,I,y]),nt=r=>{var l;return(l=Vi.get(r))!=null?l:J(r.marketplace_data.keys)},Ma=r=>nt(r).map(l=>l.key),La=r=>nt(r).length,Z=i(()=>en&&E?Ln(nt(E),E.spicetify_config,b,O):null,[en,E,Vi,b,O]),Ue=i(()=>Z?$n(Z.items):null,[Z]),tt=i(()=>new Map([...we!=null?we:[],...Ue!=null?Ue:[]]),[we,Ue]),it=((yo=E==null?void 0:E.backup)==null?void 0:yo.kind)==="quarantined",Ji=i(()=>{var r;return new Set(((r=Z==null?void 0:Z.items)!=null?r:[]).filter(l=>{var _;return l.change!=="removed"&&l.isNew&&(it||He(tt.get(l.key))||((_=tt.get(l.key))==null?void 0:_.kind)==="unchecked")}).map(l=>l.key))},[Z,tt,it]),Oa=[...Ji].filter(r=>!ke.has(r)),Xi=Z!==null&&we===null,Gt=i(()=>zs(),[]),Zi=i(()=>ma()!==null,[]),ye=u==="loading",ot=(f==null?void 0:f.kind)==="warning"||(f==null?void 0:f.kind)==="error"?f:null,Qi=!!(H&&K&&H.payload_hash!==K),xn=!!(H&&K&&H.payload_hash===K),eo=!!(E&&K&&E.payload_hash===K),st=F!==null||ve||!xn||Ie.length<2,Da=st?qt:qt.slice(0,1),at=(De==null?void 0:De.status)==="pending"&&!De.mine?De:null,Rt=xl(Ne,B,at!==null),rt=(fo=j==null?void 0:j.waiting[0])!=null?fo:null,no=!j||j.trusted||B||Rt.kind==="secured"?null:j.refused?"This Spotify account refused backups from this install. Sign in to back up from it.":"This install isn't approved yet. Its backups are kept apart until you approve it from another install or sign in.",Vt=(se?((po=Ne==null?void 0:Ne.accounts)!=null?po:[]).filter(r=>r.status==="final"):[]).map((r,l)=>({hash:r.hash,label:`Spotify account ${l+1}${r.device_info?` \xB7 from ${r.device_info}`:""}`})).filter(r=>r.hash!==(Ne==null?void 0:Ne.hash)),Ua=!!(K&&h>0&&!Ie.some(r=>r.payload_hash===K));t(()=>(V().catch(()=>null).then(r=>qe(l=>l!=null?l:r)),fe({silent:!0}),Ha(),sa(nn)),[]),t(()=>{if(Me(null),!Z||!Ue)return;[...Ue.values()].some(He)&&be(!0);let r=!0;return Kn(Z.items,Ue).then(l=>{r&&(Me(l),[...l.values()].some(He)&&be(!0))}),()=>{r=!1}},[Z,Ue]),t(()=>{if(!oe)return;let r=l=>{var Ee;if(!((Ee=P.current)!=null&&Ee.isConnected)){xe(!1),U(null);return}l.preventDefault(),l.stopImmediatePropagation();let _=js(l);if(_.kind!=="ignore"){if(_.kind==="cancel"){xe(!1),U(null);return}if(_.kind==="error"){U(_.message);return}if(Fs(_.shortcut)){U(`${jn(_.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}xe(!1),Jt(_.shortcut)}};return window.addEventListener("keydown",r,!0),()=>window.removeEventListener("keydown",r,!0)},[oe,s]);async function to(){let r=await xt();return z(r.hash),S(r.installedItemCount),x(r.installedItems),T(r.items),le(r.spicetifyConfig),Q(r.marketplaceAvailable),r}async function fe(r){try{D(!1),(!(r!=null&&r.silent)||!w)&&d("loading"),r!=null&&r.silent||m({kind:"info",text:"Checking your Syncify backup\u2026"}),await to();let l,_=null;try{l=await mn(s)}catch(ei){if(!(ei instanceof pe))throw ei;l=jl,_=ei.code}let Ee=await V().catch(()=>null),_e=Ee?await Js(s).catch(()=>null):null,R=Ee?await V().catch(()=>null):null;w={remote:l,lockedBy:_,claims:R?_e:null},qe(R),Zn(R?_e:null),sn(_),_&&kn("account"),Xn(l.claim),rn(null),p(null),ee(l.payload),G(l.backups),k(l.safetyCopy),Se(l.unapproved),q(l.install),A(l.payload),Ye(!0),d(l.exists?"success":"idle"),!(r!=null&&r.silent)&&!_&&m(l.exists&&l.payload?{kind:"success",text:`Backup found from ${gn(l.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(l){Cn(l)}}async function io(){an(!0),wn(null);try{await Xs(s)}catch(r){r instanceof Fe&&["claim_pending","claimed"].includes(r.code)||wn(r instanceof Error?r.message:String(r))}finally{await fe({silent:!0}),an(!1)}}function Ba(r){qe(r),!B&&H?io():fe({silent:!0})}function oo(){ha(null),bn(null),Hi(void 0),on(void 0),qe(null),Zn(null),wn(null),fe({silent:!0})}async function $a(){et(!0);try{await Ot(s),Spicetify.showNotification("Syncify: claim sent for review"),await fe({silent:!0})}catch(r){m({kind:"error",text:r instanceof Error?r.message:String(r)})}finally{et(!1)}}async function Ka(r){if(D(!1),rn(r),p(null),!r){A(H);return}A(null);try{let l=await mn(s,r);p(l),A(l.payload)}catch(l){rn(null),A(H),Cn(l)}}async function Ha(){let r=Y.version;if(!$i(r))return;let l=await ga(Y.releasesUrl);l&&Ki(l,r)>0&&tn(l)}function ja(r){let l=C(g({},s),{autoBackupEnabled:r});c(l),Mt(l),m({kind:"success",text:r?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}function Jt(r){let l=C(g({},s),{shortcut:r});c(l),Mt(l),Ai(r),U(null),m({kind:"success",text:r?`${jn(r)} now opens Syncify.`:"Keyboard shortcut turned off."})}function Fa(r){let l=C(g({},s),{entryPoint:r});c(l),Mt(l),Tt(r)}function vn(r){kn(r),r!=="settings"&&xe(!1)}function Ya(){U(null),xe(!0)}async function Wa(){var r;try{D(!1),d("loading"),m({kind:"info",text:"Backing up your extensions and themes\u2026"});let{payload:l,unchanged:_,unapproved:Ee}=await qn(s);if(await to(),Ee){await fe({silent:!0}),m({kind:"warning",text:"Backed up, but kept apart until this install is approved."}),Spicetify.showNotification("Syncify: backed up, waiting for approval");return}if(_){Ye(!0),d("success"),m({kind:"success",text:"Everything is already backed up."}),Spicetify.showNotification("Syncify: everything is already backed up");return}let _e=[l,...te.filter(R=>R.payload_hash!==l.payload_hash)].slice(0,Hl);w&&(w=C(g({},w),{remote:C(g({},w.remote),{exists:!0,payload:l,backups:_e,safetyCopy:((r=w.remote.safetyCopy)==null?void 0:r.payload_hash)===l.payload_hash?null:w.remote.safetyCopy})})),ee(l),G(_e),k(R=>(R==null?void 0:R.payload_hash)===l.payload_hash?null:R),A(l),Ye(!0),d("success"),m({kind:"success",text:`Backed up ${l.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(l){Cn(l)}}async function so(r){if(rt){ie(!0);try{await Lt(s,rt.id,r),Spicetify.showNotification(r==="approve"?"Syncify: install approved":"Syncify: install refused"),await fe({silent:!0})}catch(l){Cn(l)}finally{ie(!1)}}}function za(r=E){if(he===!1){let l="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";m({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3);return}if(!r){let l="No Syncify cloud backup was found for this Spotify account.";m({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3);return}A(r),be(!1),Sn(new Set),D(!0)}async function qa(){let r=E?Ln(nt(E),E.spicetify_config,b,O).manual:[];try{D(!1),d("loading"),m({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:l,restoredCount:_}=await Rs(s,E!=null?E:void 0,F!=null?F:void 0,Oa);A(l),d("success"),m({kind:"success",text:`Restored ${_} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),Bt(r),setTimeout(()=>window.location.reload(),1e3)}catch(l){Cn(l)}}async function Ga(r){await Ia(r)&&(ze(!0),setTimeout(()=>ze(!1),2e3))}function Re(r){if(r.startsWith("mailto:")){window.location.href=r;return}window.open(r,"_blank","noopener,noreferrer")}function Cn(r){if(d("error"),r instanceof Pn){Oe(!0),m(null);return}if(r instanceof Ze){m({kind:"error",text:r.message}),fe({silent:!0});return}if(r instanceof pe&&r.code!=="not_linked"){m(null),fe({silent:!0});return}let l=r instanceof Error?r.message:String(r);m({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3)}function Xt(r,l){let _=(E==null?void 0:E.payload_hash)===r.payload_hash,Ee=r.payload_hash===K,_e=gn(r.metadata.last_sync_datetime),R=xa(La(r));return e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":_,"data-selected":_?"true":"false",type:"button",key:`${r.payload_hash}-${r.metadata.last_sync_datetime}`,title:l!=null&&l.isSafetyCopy?"Kept aside and updated about once a week, so a burst of new backups can't replace it":l!=null&&l.isUnapproved?"From an install this Spotify account hasn't approved":void 0,onClick:()=>{A(r),D(!1)},disabled:ye},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),l!=null&&l.isSafetyCopy?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Safety copy"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 updated weekly")),e.createElement("span",{className:"syncify-muted"},_e," \xB7 ",R)):l!=null&&l.isUnapproved?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Not approved"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 ",_e)),e.createElement("span",{className:"syncify-muted"},R," \xB7 from ",r.metadata.device_info)):e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-backup-date"},_e),e.createElement("span",{className:"syncify-muted"},R," \xB7 from ",r.metadata.device_info)),Ee?e.createElement("span",{className:"syncify-tag",title:"What's on this device now"},"Current"):null,l!=null&&l.isSafetyCopy?e.createElement(Ol,null):null,l!=null&&l.isUnapproved?e.createElement(Gi,null):null)}function Zt(r){r.stopPropagation()}let Ra=L?"Update Syncify to keep backing up":B?"Sign in to restore":ne?H?Qi?"Changes since your last backup":"Everything is backed up":"No backup yet":u==="error"?"Couldn't check your backup":"Checking your backup\u2026",ao=L?"Your backups are safe":B?B==="not_owner"?"Secured by another account":"This backup is secured":ne?H?Qi?Yl(H,Ma(H),N,O):`Last backup ${gn(H.metadata.last_sync_datetime)}`:"Save your extensions and themes so you can restore them after a reinstall or on another computer.":null,ro=!!(M&&!L&&Date.now()-M.at<Kl),Nn=!!(M&&M.loaded===M.total),Qt=ua((mo=M==null?void 0:M.manual)!=null?mo:[]);return e.createElement("div",{className:"syncify-panel",ref:P,onClick:Zt,onMouseDown:Zt,onPointerDown:Zt},L?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,"This version of Syncify is no longer supported."),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Re(`${Y.githubUrl}#updating`)},"How to update")):null,at?e.createElement("div",{className:"syncify-alert",role:"alert"},e.createElement("span",null,(go=at.email)!=null?go:"Someone"," is claiming this backup.",se===null?" If that's you, sign in to finish.":at.held?" Syncify is reviewing it.":null),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{$a()},disabled:Wt},"Not me"),se===null?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>vn("account")},"That's me, sign in"):null)):null,rt?e.createElement("div",{className:"syncify-alert",role:"alert"},e.createElement("span",null,Bi(rt)),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{so("reject")},disabled:Pe},"Not mine"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{so("approve")},disabled:Pe},"Approve"))):null,no?e.createElement("div",{className:"syncify-alert",role:"status"},e.createElement("span",null,no)):null,Qt.length>0?e.createElement("div",{className:"syncify-alert syncify-manual",role:"status"},e.createElement("span",{className:"syncify-manual-header"},e.createElement("span",null,M.manual.length===1?"1 isn't from Marketplace. Add it in a terminal:":`${M.manual.length} aren't from Marketplace. Add them in a terminal:`),e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:aa},e.createElement(Wi,null))),e.createElement("span",{className:"syncify-code"},e.createElement("code",null,Qt.join(`
`)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Ga(Qt.join(`
`))}},Jn?"Copied":"Copy"))):null,ot?e.createElement("div",{className:"syncify-alert","data-kind":ot.kind},e.createElement("span",null,ot.text),e.createElement("span",{className:"syncify-alert-actions"},ot.kind==="error"?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{fe()},disabled:ye},"Try again"):null,e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>m(null)},e.createElement(Wi,null)))):null,e.createElement("section",{className:"syncify-status","aria-live":"polite"},ro&&M?e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},M.kind==="share"?Nn?"Setup loaded":`Loaded ${M.loaded} of ${M.total}`:Nn?"Backup restored":`Restored ${M.loaded} of ${M.total}`),e.createElement("p",{className:"syncify-muted"},Nn?M.total===0?"Nothing from Marketplace to load":`${M.loaded} of ${M.total} loaded`:"Missing something? Reload Spotify once more."),Nn&&M.kind==="restore"?e.createElement("p",{className:"syncify-muted"},"Syncify saved your setup?"," ",e.createElement("button",{className:"syncify-text-button syncify-inline-button",type:"button",onClick:()=>Re(Y.kofiUrl)},"Support it on Ko-fi")):null):e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},Ra),e.createElement("p",{className:"syncify-muted"},ao?`${ao} \xB7 `:"",xa(h)," on this device")),ro&&!Nn?e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:ra},"Reload"):e.createElement("button",{className:"syncify-button",type:"button",onClick:Wa,disabled:ye||xn||L||B!==null,title:B?"Sign in to back up":xn?"No changes since your last backup":void 0},ye?"Working\u2026":xn?"Backed up":"Back up now")),!ne||B||te.length>0||I.length>0||Vt.length>0?e.createElement("section",{className:"syncify-section","aria-label":"Backups"},e.createElement("div",{className:"syncify-section-header"},e.createElement("h4",{className:"syncify-section-title"},"Backups"),e.createElement("span",{className:"syncify-section-controls"},!F&&xn&&Ie.length>1?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":ve,"aria-controls":"syncify-backup-list",onClick:()=>{We(!ve),D(!1)}},ve?"Show less":`Show all ${Ie.length}`,e.createElement(hn,null)):null,!B&&Vt.length>0?e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select","aria-label":"Show backups from",value:F!=null?F:"",onChange:r=>{Ka(r.currentTarget.value||null)},disabled:ye},e.createElement("option",{value:""},"This Spotify account"),Vt.map(r=>e.createElement("option",{key:r.hash,value:r.hash},r.label))),e.createElement(hn,null)):null)),ne?B?e.createElement("p",{className:"syncify-locked"},e.createElement($l,null),e.createElement("span",null,B==="not_owner"?"Sign in with the account that secured them":"Sign in to see and restore your backups")):F&&!y?e.createElement("p",{className:"syncify-muted"},"Loading backups\u2026"):qt.length===0&&zt.length===0?e.createElement("p",{className:"syncify-muted"},"No backups yet."):e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-list",id:"syncify-backup-list",role:"radiogroup","aria-label":"Choose a backup to restore"},Da.map(r=>Xt(r)),st&&Ri?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),Xt(Ri,{isSafetyCopy:!0})):null,st&&zt.length>0?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),zt.map(r=>Xt(r,{isUnapproved:!0}))):null),st?he===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to restore a backup."):en?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},"Restore"," ",E?gn(E.metadata.last_sync_datetime):"this backup","?"),it?e.createElement("div",{className:"syncify-alert"},"An install this Spotify account hasn't approved made this backup. Its items stay off unless you turn them on."):null,Z?e.createElement(Ca,{preview:Z,checks:tt,off:Ji,allowed:ke,unapproved:it,onAllow:(r,l)=>{let _=new Set(ke);l?_.add(r):_.delete(r),Sn(_)},expanded:Ae,onToggle:()=>be(!Ae)}):null,e.createElement("div",{className:"syncify-actions"},Ua?e.createElement("div",{className:"syncify-alert syncify-actions-hint"},"Your current setup isn't backed up."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>D(!1),disabled:ye},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:qa,disabled:ye||Xi},Xi?"Checking\u2026":"Restore"))):e.createElement("div",{className:"syncify-actions"},eo?e.createElement("span",{className:"syncify-muted syncify-actions-hint"},"This backup is already current."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>za(),disabled:ye||!E||eo},"Restore backup")):null):e.createElement("div",{className:"syncify-backup-skeleton","aria-hidden":"true"},e.createElement("span",{className:"syncify-radio"}),e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-skeleton-line"}),e.createElement("span",{className:"syncify-skeleton-line wide"})))):null,e.createElement("div",{className:"syncify-accordion"},e.createElement(ji,{id:"share",title:"Share",openSection:de,onToggle:vn,status:se&&Ce?{kind:"count",label:`${Ce} ${Ce===1?"code":"codes"}`,text:String(Ce)}:null},e.createElement(Nl,{config:s,session:se,localItems:b,localConfig:O,marketplaceAvailable:he,busy:ye,onSignIn:()=>vn("account"),onSignedOut:oo,onCodeCount:r=>{ha(r),bn(r)},onHandle:r=>{Hi(r),on(r)}})),e.createElement(ji,{id:"account",title:"Account",openSection:de,onToggle:vn,status:Dl(se,B,Rt)},e.createElement(vl,{session:se,locked:B,secure:Rt,securing:Ge,secureError:Qn,onSecure:()=>{io()},onSignedIn:Ba,onSignedOut:oo,onOpenWebsite:Re,handle:Yt,onHandle:r=>{Hi(r),on(r)}})),e.createElement(ji,{id:"settings",title:"Settings",openSection:de,onToggle:vn,status:X?{kind:"dot",label:`Syncify ${X} is out`}:null},e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Back up automatically"),e.createElement("span",{className:"syncify-muted"},"When Spotify starts and something has changed")),e.createElement("input",{className:"syncify-switch",type:"checkbox",role:"switch",checked:s.autoBackupEnabled&&!L,onChange:r=>ja(r.currentTarget.checked),disabled:ye||L})),e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Open Syncify from"),Gt?s.entryPoint==="menu"&&!s.shortcut?e.createElement("span",{className:"syncify-muted"},"Keep a shortcut in case a Spotify update breaks the menu"):null:e.createElement("span",{className:"syncify-muted"},"The profile menu isn't available in this Spicetify version")),e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select",value:Gt?s.entryPoint:"topbar",onChange:r=>Fa(r.currentTarget.value),disabled:!Gt},Fl.map(r=>e.createElement("option",{key:r.value,value:r.value},r.label))),e.createElement(hn,null))),e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Keyboard shortcut"),oe&&!Le?e.createElement("span",{className:"syncify-muted"},"Press a key combination, or Esc to cancel"):null),e.createElement("span",{className:"syncify-shortcut"},s.shortcut&&!oe?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Jt(null)},"Turn off"):null,!s.shortcut&&!oe?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Jt(pn)},"Use default"):null,e.createElement("button",{className:"syncify-key",type:"button","data-recording":oe?"true":"false",onClick:()=>oe?xe(!1):Ya(),title:"Click to change"},oe?"Press keys\u2026":s.shortcut?jn(s.shortcut):"Off"))),Le?e.createElement("div",{className:"syncify-alert",role:"alert"},Le):null)),e.createElement("footer",{className:"syncify-footer"},e.createElement("span",{className:"syncify-footer-version"},e.createElement("span",null,"Syncify ",Y.version),X?e.createElement("button",{className:"syncify-text-button syncify-update",type:"button",onClick:()=>Zi?window.location.reload():Re(`${Y.githubUrl}#updating`)},X," is out \xB7 ",Zi?"Reload":"How to update"):null),e.createElement("span",{className:"syncify-footer-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Re(Y.issueUrl)},"Report an issue"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Re(Y.githubUrl)},"GitHub"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Re(Y.kofiUrl)},"Support on Ko-fi"))))}var Sa={added:{mark:"+",label:"Added"},removed:{mark:"\u2212",label:"Removed"},unchanged:{mark:"=",label:"Unchanged"}},va=[["extension","Extensions"],["theme","Themes"],["snippet","Snippets"]],bl={extension:"extension",custom_app:"custom app",theme:"theme"};function Ca(n){let e=Spicetify.React,{items:t,counts:i,manual:o}=n.preview,a=[...n.off].filter(s=>!n.allowed.has(s)).length;return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-chips","aria-label":"What changes on this device"},i.added?e.createElement("span",{className:"syncify-chip","data-change":"added"},"+",i.added," added"):null,i.removed?e.createElement("span",{className:"syncify-chip","data-change":"removed"},"\u2212",i.removed," removed"):null,i.unchanged?e.createElement("span",{className:"syncify-chip"},i.unchanged," unchanged"):null,o.length?e.createElement("span",{className:"syncify-chip"},o.length," to add manually"):null,a?e.createElement("span",{className:"syncify-chip","data-change":"off"},a," off"):null),t.length||o.length?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":n.expanded,"aria-controls":"syncify-restore-changes",onClick:n.onToggle},n.expanded?"Hide changes":"Show changes",e.createElement(hn,null)):null,n.expanded?e.createElement("div",{className:"syncify-changes",id:"syncify-restore-changes"},va.map(([s,c])=>{let u=t.filter(d=>d.type===s);return u.length===0?null:e.createElement("section",{key:s,"aria-label":c},e.createElement("h5",{className:"syncify-change-group"},c),e.createElement("ul",{className:"syncify-change-list"},u.map(d=>{var f,m;return e.createElement("li",{className:"syncify-change",key:d.key},e.createElement("span",{className:"syncify-mark","data-change":d.change,role:"img","aria-label":Sa[d.change].label},Sa[d.change].mark),e.createElement("span",{className:"syncify-change-name"},d.name,d.repo?e.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",d.repo):null),n.checks.has(d.key)?e.createElement(Na,{check:n.checks.get(d.key)}):n.unapproved&&n.off.has(d.key)?e.createElement("span",{className:"syncify-source","data-warning":"true"},e.createElement(Gi,null),"Not approved"):null,n.off.has(d.key)&&!((f=n.fixed)!=null&&f.has(d.key))?e.createElement("label",{className:"syncify-item-switch"},e.createElement("input",{type:"checkbox",checked:n.allowed.has(d.key),onChange:h=>n.onAllow(d.key,h.currentTarget.checked)}),(m=n.switchLabel)!=null?m:"Restore"):null)})))}),o.length?e.createElement("section",{"aria-label":"Add manually"},e.createElement("h5",{className:"syncify-change-group"},"Add manually"),e.createElement("ul",{className:"syncify-change-list"},o.map(s=>e.createElement("li",{className:"syncify-change",key:`${s.type}:${s.name}`},e.createElement("span",{className:"syncify-mark","aria-hidden":"true"}),e.createElement("span",{className:"syncify-change-name"},s.name,e.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",bl[s.type],s.scheme?`, ${s.scheme}`:"")))))):null):null)}var wl={host:"Loads from outside GitHub",repo:"Its code is in a different repo than the one it names",blocked:"On Marketplace's block list",catalog:"Not in Marketplace's catalog",unchecked:"GitHub couldn't be reached to check it",custom:"A snippet made in Marketplace, not from its list"};function Na(n){let e=Spicetify.React,{check:t}=n,i=He(t),o=t.kind==="host"?`Code from ${t.host}`:t.kind==="repo"?`Code from ${t.repo}`:t.kind==="blocked"?"Blocked by Marketplace":t.kind==="catalog"?"Not in Marketplace":t.kind==="unchecked"?"Not checked":"Custom";return e.createElement("span",{className:"syncify-source","data-warning":i?"true":"false",title:wl[t.kind]},i?e.createElement(Gi,null):null,o)}function xl(n,e,t){var s,c;if(e==="not_owner")return{kind:"other-account"};if(!n)return t?{kind:"other-claim"}:{kind:"unknown"};let{claim:i}=n;if((i==null?void 0:i.status)==="final"){if(!i.mine)return{kind:"other-account"};let u=((s=n.accounts)!=null?s:[]).filter(d=>d.status==="final").length;return{kind:"secured",linkedCount:Math.max(u,1)}}if((i==null?void 0:i.status)==="pending")return i.mine?{kind:"pending",finalAt:i.final_at,held:i.held,waiting:i.waiting===!0}:{kind:"other-claim"};let o=((c=n.accounts)!=null?c:[]).filter(u=>u.hash===n.hash),a=o[o.length-1];return(a==null?void 0:a.status)==="cancelled"&&a.cancelled_by==="owner"?{kind:"cancelled"}:{kind:"open"}}function vl(n){let e=Spicetify.React,t=e.useEffect,i=e.useState,{session:o,secure:a}=n,[s,c]=i(()=>pt()),[u,d]=i(()=>pt().email),[f,m]=i(""),[h,S]=i(!1),[N,x]=i(null),[b,T]=i(()=>Date.now()),{handle:O,onHandle:le}=n;t(()=>{if(!o||O!==void 0)return;let k=!0;return Ci().then(I=>{var Se,j;k&&le((j=(Se=I.profile)==null?void 0:Se.handle)!=null?j:null)}).catch(()=>{}),()=>{k=!1}},[o,O]);let he=!!(s.codeSentAt&&b-s.codeSentAt<Pl),Q=Math.max(0,Math.ceil((s.retryAt-b)/1e3)),K=s.retryEmail===null||s.retryEmail===u.trim().toLowerCase()?Q:0;t(()=>{if(!o)return;let k=!0;return Uo().then(I=>{!k||I||(x({kind:"warning",text:Xe(new v("signed_out"))}),n.onSignedOut())}).catch(()=>{}),()=>{k=!1}},[o==null?void 0:o.token]),t(()=>{if(s.retryAt<=Date.now())return;let k=setInterval(()=>{T(Date.now()),s.retryAt<=Date.now()&&clearInterval(k)},1e3);return()=>clearInterval(k)},[s.retryAt]);function z(k){let I=g(g({},pt()),k);Po(I),c(I),T(Date.now())}async function H(k){var Se;let I=k.trim();if(!Ml.test(I)){x({kind:"error",text:"Enter a valid email address."});return}S(!0),x(null);try{let j=await Oo(I);z({email:I,codeSentAt:Date.now(),retryAt:Date.now()+j*1e3,retryEmail:I.toLowerCase()}),m("")}catch(j){let q=j instanceof v?j:null,Pe=(Se=q==null?void 0:q.retryAfter)!=null?Se:null,ie=Pe&&Pe<=Al?Date.now()+Pe*1e3:0,ke=(q==null?void 0:q.code)==="too_many_requests"?null:I.toLowerCase();if((q==null?void 0:q.code)==="resend_wait"){z({email:I,codeSentAt:s.email===I&&s.codeSentAt?s.codeSentAt:Date.now(),retryAt:ie,retryEmail:ke});return}ie&&z({retryAt:ie,retryEmail:ke}),x({kind:"error",text:Xe(j)})}finally{S(!1)}}async function ee(){S(!0),x(null);try{let k=await Do(s.email,f);z({codeSentAt:null}),m(""),n.onSignedIn(k)}catch(k){x({kind:"error",text:Xe(k)});let I=k instanceof v?k.code:null;(I==="too_many_attempts"||I==="code_expired")&&m("")}finally{S(!1)}}async function te(){var I;let k=(I=o==null?void 0:o.email)!=null?I:"";S(!0),x(null),await Bo(),z({email:k,codeSentAt:null}),d(k),S(!1),n.onSignedOut()}async function G(){S(!0),x(null);try{n.onOpenWebsite(await $o())}catch(k){let I=k instanceof v&&k.code==="signed_out";x({kind:I?"warning":"error",text:Xe(k)}),I&&n.onSignedOut()}finally{S(!1)}}let ue=N?e.createElement("div",{className:"syncify-alert","data-kind":N.kind==="error"?"error":void 0,role:"alert"},N.text):null;if(o===void 0)return null;if(o){let k=a.kind==="open"||a.kind==="other-claim"||a.kind==="cancelled";return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",{className:"syncify-account-email"},o.email),a.kind==="secured"?e.createElement("span",{className:"syncify-muted"},"Backup secured \xB7"," ",a.linkedCount===1?"1 Spotify account linked":`${a.linkedCount} Spotify accounts linked`):a.kind==="pending"?e.createElement("span",{className:"syncify-muted syncify-account-state"},e.createElement(Ea,null),e.createElement("span",null,"Securing this backup \xB7"," ",a.waiting?"waiting on sign-in":a.held?"in review":`final ${qi(a.finalAt)}`)):a.kind==="other-account"?e.createElement("span",{className:"syncify-muted"},"This backup is secured by another account"):e.createElement("span",{className:"syncify-muted"},"Signed in")),e.createElement("span",{className:"syncify-account-actions"},e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-label":"Manage on the website",onClick:()=>{G()},disabled:h},"Manage",e.createElement(wa,null)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{te()},disabled:h},"Sign out"))),O?e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"@",O),e.createElement("span",{className:"syncify-muted"},"Your handle")),e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-label":"Open your profile",onClick:()=>n.onOpenWebsite(Ni(O))},"Profile",e.createElement(wa,null))):null,k?e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it")),e.createElement("button",{className:"syncify-button",type:"button",onClick:n.onSecure,disabled:h||n.securing||a.kind==="other-claim"},n.securing?"Securing\u2026":a.kind==="cancelled"?"Secure again":"Secure")):null,a.kind==="other-claim"?e.createElement("div",{className:"syncify-alert",role:"status"},"Another claim is pending. If it isn't yours, press Not me above and Syncify will review it."):a.kind==="cancelled"?e.createElement("div",{className:"syncify-alert",role:"status"},"Your claim was cancelled from this Spotify account."):a.kind==="pending"&&a.waiting?e.createElement("div",{className:"syncify-alert",role:"status"},"Syncify ran on this Spotify account without you signed in, maybe after a Spotify update or on another computer. Sign in to Syncify there to finish linking."):null,n.secureError?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},n.secureError):null,ue)}return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting"},n.locked?e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Sign in to restore"),e.createElement("span",{className:"syncify-muted"},"With the email that secured this backup")):e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it"))),e.createElement("form",{className:"syncify-confirm",noValidate:!0,onSubmit:k=>{k.preventDefault(),!h&&(he?f.length===$t&&ee():K||H(u))}},he?e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-muted"},"Code sent to ",Ll(s.email)),e.createElement("div",{className:"syncify-field"},e.createElement("input",{className:"syncify-input syncify-code-input",type:"text",inputMode:"numeric",autoComplete:"one-time-code","aria-label":"6-digit code",placeholder:"123456",maxLength:$t,value:f,onChange:k=>m(k.currentTarget.value.replace(/\D/g,"").slice(0,$t)),autoFocus:!0}),e.createElement("button",{className:"syncify-button",type:"submit",disabled:h||f.length!==$t},h?"Verifying\u2026":"Verify")),e.createElement("p",{className:"syncify-muted syncify-account-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{H(s.email)},disabled:h||Q>0},Q>0?`Resend in ${ba(Q)}`:"Resend code"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{z({codeSentAt:null}),m(""),x(null)},disabled:h},"Use another email"))):e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-field"},e.createElement("input",{className:"syncify-input",type:"email",autoComplete:"email","aria-label":"Email",placeholder:"you@example.com",value:u,onChange:k=>d(k.currentTarget.value),autoFocus:!0}),e.createElement("button",{className:"syncify-button",type:"submit",disabled:h||K>0||!u.trim()},h?"Sending\u2026":"Send code")),e.createElement("p",{className:"syncify-muted"},K>0?`Send another code in ${ba(K)}`:"We only email sign-in codes.")),ue))}var Cl=[["add","Add to my setup"],["replace","Replace my setup"]];function Nl(n){var rn;let e=Spicetify.React,t=e.useEffect,i=e.useMemo,o=e.useRef,a=e.useState,{session:s}=n,[c,u]=a(""),[d,f]=a(!1),[m,h]=a(null),[S,N]=a(null),[x,b]=a("add"),[T,O]=a(!1),[le,he]=a(()=>new Set),[Q,K]=a(null),[z,H]=a(void 0),[ee,te]=a(!1),[G,ue]=a(null),[k,I]=a(null),[Se,j]=a(null),[q,Pe]=a(null),[ie,ke]=a(""),[Sn,E]=a(null),[A,ne]=a(null),[Ye,en]=a(""),[D,Ae]=a(null),[be,we]=a(!1),[Me,oe]=a(!1),[xe,Le]=a(null),[U,de]=a(null),[kn,ve]=a(null),[We,M]=a(!1),[nn,Jn]=a(null),ze=o(0),L=i(()=>S?Is(S.file,S.items,n.localItems,n.localConfig,x):null,[S,n.localItems,n.localConfig,x]),Oe=i(()=>{if(!L||!S)return null;let y=new Set(S.items.map(p=>p.key));return L.items.filter(p=>p.change!=="removed"&&y.has(p.key)&&(x==="replace"||p.isNew))},[L,S,x]),X=i(()=>Oe?$n(Oe):null,[Oe]),tn=i(()=>new Map([...Q!=null?Q:[],...X!=null?X:[]]),[Q,X]),Ce=i(()=>L&&z!==void 0?Es(L,z):new Set,[L,z]),bn=i(()=>{var y;return new Set([...((y=L==null?void 0:L.items)!=null?y:[]).filter(p=>{var P;return p.change!=="removed"&&p.isNew&&(He(tn.get(p.key))||((P=tn.get(p.key))==null?void 0:P.kind)==="unchecked")}).map(p=>p.key),...Ce])},[L,tn,Ce]),Yt=[...bn].filter(y=>Ce.has(y)||!le.has(y)),on=L!==null&&(Q===null||z===void 0),se=D?D.items.filter(y=>!D.leftOut.has(y.key)):[],qe=!!(G&&k!==null&&G.length>=k),B=A!==null&&A.code===null&&!Se,sn=B?ws(ie):null,[De,Xn]=a(null);t(()=>{if(!sn){Xn(null);return}let y=window.setTimeout(()=>Xn(sn),hl);return()=>window.clearTimeout(y)},[sn]),t(()=>{if(K(null),!Oe||!X)return;[...X.values()].some(He)&&O(!0);let y=!0;return Kn(Oe,X).then(p=>{y&&(K(p),[...p.values()].some(He)&&O(!0))}),()=>{y=!1}},[Oe,X]),t(()=>{ue(null),ne(null),de(null),s&&Ge()},[s==null?void 0:s.token]);async function Ne(){let y=xs(c);if(h(null),N(null),!y){h(It(new v("no_code")));return}f(!0);try{let p=await Ms(y);b("add"),he(new Set),O(!1),N({file:p,items:J(p.keys)}),wi().then(H)}catch(p){h(It(p))}finally{f(!1)}}async function Zn(){if(!(!S||!L)){te(!0),h(null);try{await Vs(n.config,S.file,x,Yt,z!=null?z:null),Spicetify.showNotification("Syncify: setup loaded. Reloading\u2026"),Bt(L.manual,"share"),setTimeout(()=>window.location.reload(),1e3)}catch(y){te(!1),h(y instanceof zn?`${y.message} ${El(y.reason)}`:y instanceof Error?y.message:String(y))}}}async function Ge(){var y,p;E(null);try{let P=await Ci();ue(P.codes),n.onCodeCount(P.codes.length),I(P.max),j(P.profile),n.onHandle((p=(y=P.profile)==null?void 0:y.handle)!=null?p:null),Pe(P.suggestedHandle)}catch(P){an(P,E)}}function an(y,p){p(It(y,k)),y instanceof v&&y.code==="signed_out"&&n.onSignedOut()}async function Qn(y){var P;let p=++ze.current;ne({code:y}),en((P=y==null?void 0:y.name)!=null?P:""),ke(q!=null?q:""),Ae(null),we(!1),Le(null),de(null),ve(null);try{let Y=await ae(),Ie=await Cs(J(Y),Y);if(p!==ze.current)return;Ae(g({keys:Y},Ie)),Ie.leftOut.size>0&&we(!0)}catch(Y){if(p!==ze.current)return;ne(null),Le(Y instanceof Error?Y.message:String(Y))}}function wn(){ze.current+=1,ne(null),Ae(null)}async function Wt(){if(!A||!D)return;oe(!0),Le(null);let y=Ns(D.keys,se);try{let p=A.code?await Ps(A.code.code,Ye.trim(),y):await Ts(Ye.trim(),y,B?ie.trim():void 0);de(C(g({},p),{outcome:A.code?"updated":"created"})),ne(null),Ae(null),await Ge()}catch(p){if(p instanceof v&&p.code==="same_setup"&&p.share){de(C(g({},p.share),{leftOut:0,outcome:"existing"})),ne(null),Ae(null);return}an(p,Le),p instanceof v&&p.code==="publish_failed"&&(ne(null),Ge())}finally{oe(!1)}}async function et(y){M(!0),E(null);try{await As(y),ve(null),(U==null?void 0:U.code)===y&&de(null),await Ge()}catch(p){an(p,E)}finally{M(!1)}}async function F(y,p){await Ia(y)&&(Jn(p),setTimeout(()=>Jn(P=>P===p?null:P),2e3))}return e.createElement(e.Fragment,null,e.createElement("form",{className:"syncify-field syncify-share-load",noValidate:!0,onSubmit:y=>{y.preventDefault(),!d&&!ee&&c.trim()&&Ne()}},e.createElement("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-input"},"Load a setup"),e.createElement("input",{className:"syncify-input syncify-share-input",id:"syncify-share-input",type:"text",placeholder:"Paste a code or a link",autoComplete:"off",spellCheck:!1,value:c,onChange:y=>u(y.currentTarget.value),disabled:ee}),e.createElement("button",{className:"syncify-button secondary",type:"submit",disabled:d||ee||!c.trim()},d?"Loading\u2026":"Preview")),m?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},m):null,S&&L?e.createElement("div",{className:"syncify-confirm"},e.createElement("span",{className:"syncify-share-title"},e.createElement("p",{className:"syncify-confirm-title"},"Load ",(rn=S.file.name)!=null?rn:je(S.file.code),"?"),S.file.creator?e.createElement("button",{className:"syncify-text-button",type:"button",title:"Open their profile",onClick:()=>window.open(Ni(S.file.creator),"_blank","noopener,noreferrer")},"by @",S.file.creator):null),e.createElement("div",{className:"syncify-share-modes",role:"radiogroup","aria-label":"How to load it"},Cl.map(([y,p])=>e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":x===y,"data-selected":x===y?"true":"false",type:"button",key:y,onClick:()=>b(y),disabled:ee},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,p))))),e.createElement(Ca,{preview:L,checks:tn,off:bn,fixed:Ce,switchLabel:"Load",allowed:le,unapproved:!1,onAllow:(y,p)=>{let P=new Set(le);p?P.add(y):P.delete(y),he(P)},expanded:T,onToggle:()=>O(!T)}),n.marketplaceAvailable===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to load a setup."):e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>N(null),disabled:ee},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{Zn()},disabled:ee||on||n.busy},ee?"Applying\u2026":on?"Checking\u2026":"Apply"))):null,s===void 0?null:s?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting syncify-share-part"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Share this setup"),e.createElement("span",{className:"syncify-muted"},G&&G.length>0&&k!==null?_l(k-G.length):"Get a code anyone can load")),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{Qn(null)},disabled:A!==null||G===null||qe||n.marketplaceAvailable===!1,title:qe?"Delete a code to make another":void 0},"Share")),A?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},A.code?`Update ${je(A.code.code)} with this setup?`:"Share this setup?"),D?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-chips","aria-label":"What goes in"},e.createElement("span",{className:"syncify-chip"},se.length," going in"),D.leftOut.size?e.createElement("span",{className:"syncify-chip","data-change":"off"},D.leftOut.size," left out"):null),D.items.length?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":be,"aria-controls":"syncify-share-items",onClick:()=>we(!be)},be?"Hide items":"Show items",e.createElement(hn,null)):null,be?e.createElement(Il,{items:D.items,leftOut:D.leftOut}):null,e.createElement("div",{className:"syncify-share-fields"},e.createElement("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-name"},"Setup name"),e.createElement("input",{id:"syncify-share-name",className:"syncify-input",type:"text",placeholder:"Optional",maxLength:Ss,value:Ye,onChange:y=>en(y.currentTarget.value),disabled:Me}),B?e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-muted syncify-share-handle-note"},"It's your first time creating a share code. Pick a handle for your profile:"),e.createElement("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-handle"},"Your handle"),e.createElement("span",{className:"syncify-input syncify-handle-input"},e.createElement("span",{"aria-hidden":"true"},"@"),e.createElement("input",{id:"syncify-share-handle",type:"text",placeholder:"handle",autoComplete:"off",spellCheck:!1,maxLength:xi,value:ie,onChange:y=>ke(y.currentTarget.value.replace(/^@/,"")),disabled:Me})),ie&&De?e.createElement("span",{className:"syncify-share-handle-problem",role:"alert"},De):null):null)):e.createElement("p",{className:"syncify-muted"},"Checking your items\u2026"),e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:wn,disabled:Me},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{Wt()},disabled:!D||se.length===0||Me||B&&sn!==null},D?Me?A.code?"Updating\u2026":"Creating\u2026":A.code?"Update":"Create code":"Checking\u2026"))):null,xe?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},xe):null,U?e.createElement("div",{className:"syncify-confirm"},e.createElement("span",{className:"syncify-manual-header"},e.createElement("span",{className:"syncify-confirm-title"},U.outcome==="existing"?"You already shared this setup":U.outcome==="updated"?"Code updated":"Your code is ready"),e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>de(null)},e.createElement(Wi,null))),e.createElement("span",{className:"syncify-code syncify-share-code"},e.createElement("code",null,je(U.code)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{F(je(U.code),"saved-code")}},nn==="saved-code"?"Copied":"Copy"),U.link?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{F(U.link,"saved-link")}},nn==="saved-link"?"Copied":"Get link"):null),U.leftOut?e.createElement("p",{className:"syncify-muted"},U.leftOut===1?"1 snippet isn't in Marketplace's list anymore, so it was left out.":`${U.leftOut} snippets aren't in Marketplace's list anymore, so they were left out.`):null):null,Sn?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,Sn),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Ge()}},"Try again"))):null,G&&G.length>0?e.createElement("section",{"aria-label":"Your codes"},e.createElement("h5",{className:"syncify-change-group"},"Your codes"),e.createElement("ul",{className:"syncify-change-list syncify-share-codes"},G.map(y=>{var p;return e.createElement("li",{className:"syncify-setting",key:y.code},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",{className:"syncify-account-email"},(p=y.name)!=null?p:je(y.code)),e.createElement("span",{className:"syncify-muted"},kn===y.code?"Delete it? Its link stops working.":[y.name?je(y.code):null,Tl(y.item_count,"item"),`Used by ${y.imports}`].filter(Boolean).join(" \xB7 "))),e.createElement("span",{className:"syncify-account-actions"},kn===y.code?e.createElement(e.Fragment,null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ve(null),disabled:We},"Cancel"),e.createElement("button",{className:"syncify-text-button","data-danger":"true",type:"button",onClick:()=>{et(y.code)},disabled:We},We?"Deleting\u2026":"Delete")):e.createElement(e.Fragment,null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Qn(y)},disabled:A!==null||We},"Update"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{F(je(y.code),`code:${y.code}`)}},nn===`code:${y.code}`?"Copied":"Copy"),y.link?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{F(y.link,`link:${y.code}`)}},nn===`link:${y.code}`?"Copied":"Get link"):null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ve(y.code),disabled:We},"Delete"))))}))):null):e.createElement("div",{className:"syncify-setting syncify-share-part"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Share this setup"),e.createElement("span",{className:"syncify-muted"},"Get a code anyone can load")),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:n.onSignIn},"Sign in to share")))}var ka={in:{mark:"+",label:"Goes in"},out:{mark:"\u2212",label:"Left out"}};function Il(n){let e=Spicetify.React;return e.createElement("div",{className:"syncify-changes",id:"syncify-share-items"},va.map(([t,i])=>{let o=n.items.filter(a=>a.type===t).sort((a,s)=>a.name.localeCompare(s.name));return o.length===0?null:e.createElement("section",{key:t,"aria-label":i},e.createElement("h5",{className:"syncify-change-group"},i),e.createElement("ul",{className:"syncify-change-list"},o.map(a=>{let s=n.leftOut.get(a.key),c=s?ka.out:ka.in;return e.createElement("li",{className:"syncify-change",key:a.key},e.createElement("span",{className:"syncify-mark","data-change":s?"removed":"added",role:"img","aria-label":c.label},c.mark),e.createElement("span",{className:"syncify-change-name"},a.name,a.repo?e.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",a.repo):null),s?e.createElement(Na,{check:s}):null)})))}))}function El(n){return n instanceof pe?"Sign in to back up.":n instanceof Error?n.message:String(n)}async function Ia(n){var e;try{return await navigator.clipboard.writeText(n),!0}catch(t){let i=(e=Spicetify.Platform)==null?void 0:e.ClipboardAPI;return i!=null&&i.copy?(await i.copy(n),!0):!1}}function _l(n){return n<=0?"No codes left, delete one to make another":`${n} ${n===1?"code":"codes"} left`}function Tl(n,e){return`${n} ${e}${n===1?"":"s"}`}var $t=6,Pl=600*1e3,Al=300,Ml=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function Ll(n){let e=n.lastIndexOf("@");return e<1?n:`${n[0]}***${n.slice(e)}`}function qi(n){let e=gn(new Date(n).toISOString());return e.startsWith("today")?e:`on ${e}`}function ba(n){return`${Math.floor(n/60)}:${String(n%60).padStart(2,"0")}`}function ji(n){let e=Spicetify.React,t=n.openSection===n.id,i=`syncify-section-${n.id}`;return e.createElement("section",{className:"syncify-accordion-section","aria-label":n.title},e.createElement("button",{className:"syncify-accordion-header",type:"button","aria-expanded":t,"aria-controls":i,onClick:()=>n.onToggle(t?null:n.id)},e.createElement("span",{className:"syncify-accordion-title"},n.title),!t&&n.status?e.createElement("span",{className:"syncify-accordion-status","data-kind":n.status.kind,role:"img","aria-label":n.status.label,title:n.status.label},n.status.kind==="ok"?e.createElement(Ul,null):n.status.kind==="warning"?e.createElement(Bl,null):n.status.kind==="pending"?e.createElement(Ea,null):n.status.kind==="count"?n.status.text:null):null,e.createElement(hn,null)),t?e.createElement("div",{className:"syncify-accordion-body",id:i},n.children):null)}function Ol(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-shield",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"}))}function Gi(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-warning-icon",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M12 3 2 21h20z"}),n.createElement("path",{d:"M12 10v5"}),n.createElement("path",{d:"M12 18h.01"}))}function Dl(n,e,t){return e?{kind:"warning",label:"Sign in to see your backups"}:n?t.kind==="secured"?{kind:"ok",label:"Signed in, backup secured"}:t.kind==="pending"?{kind:"pending",label:"Linking this Spotify account"}:t.kind==="open"||t.kind==="cancelled"?{kind:"warning",label:"Backup not secured yet"}:{kind:"ok",label:"Signed in"}:null}function Ul(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"10"}),n.createElement("path",{d:"m9 12 2 2 4-4"}))}function Bl(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"10"}),n.createElement("path",{d:"M12 8v4"}),n.createElement("path",{d:"M12 16h.01"}))}function hn(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-chevron",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"m9 6 6 6-6 6"}))}function $l(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-lock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("rect",{x:"5",y:"11",width:"14",height:"10",rx:"2"}),n.createElement("path",{d:"M8 11V7a4 4 0 0 1 8 0v4"}))}function Ea(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-clock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"9"}),n.createElement("path",{d:"M12 7v5l3 2"}))}function wa(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-external",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M14 4h6v6"}),n.createElement("path",{d:"M20 4 10 14"}),n.createElement("path",{d:"M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"}))}function Wi(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M18 6 6 18"}),n.createElement("path",{d:"m6 6 12 12"}))}var Kl=600*1e3,Hl=3,jl={exists:!1,payload:null,backups:[],safetyCopy:null,claim:null,unapproved:[],install:null},Fl=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function Yl(n,e,t,i){var N;let o=new Set(e),a=new Set(t),s=t.filter(x=>!o.has(x)).length,c=e.filter(x=>!a.has(x)).length,u=(N=n.spicetify_config)!=null?N:null,d=!!(i&&!u),f=!d&&(i&&u?!Jo(i,u):i!==u),m=[s?`${s} added`:null,c?`${c} removed`:null,f?"Spicetify config changed":null].filter(Boolean),h=gn(n.metadata.last_sync_datetime),S=m.length?`${m.join(", ")} since ${h}`:`Last backup ${h}`;return d?`${S} \xB7 Spicetify config not saved yet`:S}function xa(n){return n===1?"1 extension or theme":`${n} extensions and themes`}function gn(n){let e=new Date(n);if(Number.isNaN(e.getTime()))return n;let t=e.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),i=new Date,o=new Date(i);return o.setDate(i.getDate()-1),e.toDateString()===i.toDateString()?`today, ${t}`:e.toDateString()===o.toDateString()?`yesterday, ${t}`:`${e.toLocaleDateString(void 0,{month:"short",day:"numeric",year:e.getFullYear()===i.getFullYear()?void 0:"numeric"})}, ${t}`}function _a(n){var d;let e=Spicetify.React,t=e.useState,{claim:i}=n,[o,a]=t(!1),[s,c]=t(null);async function u(){a(!0),c(null);try{await Ot(re()),Spicetify.showNotification("Syncify: claim sent for review"),n.onClose()}catch(f){c(f instanceof Error?f.message:String(f)),a(!1)}}return e.createElement("div",{className:"syncify-panel"},e.createElement("p",{className:"syncify-claim-notice"},(d=i.email)!=null?d:"Someone"," is claiming this backup."," ",n.signedIn?i.held?"Syncify is reviewing it.":`It goes through ${qi(i.final_at)} unless you stop it.`:"If that's you, sign in to finish."),s?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},s):null,e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:n.onClose,disabled:o},"Close"),e.createElement("button",{className:n.signedIn?"syncify-button":"syncify-button secondary",type:"button",onClick:()=>{u()},disabled:o},"Not me"),n.signedIn?null:e.createElement("button",{className:"syncify-button",type:"button",onClick:n.onSignIn,disabled:o},"That's me, sign in")))}var Kt="[Syncify]";function ce(n,e){if(e===void 0){console.debug(Kt,n);return}console.debug(Kt,n,e)}function Vn(n,e){if(e===void 0){console.warn(Kt,n);return}console.warn(Kt,n,e)}function Wl(){var n;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((n=Spicetify==null?void 0:Spicetify.Topbar)!=null&&n.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var Pa="syncify-styles";function zl(){if(document.getElementById(Pa)){ce("Another copy of Syncify is running; stopping this one");return}ql();let n=re();qs({topbarButton:Gl(),menuItem:Ql()}),Tt(n.entryPoint),Pi(n.shortcut,Ft),Qs({onClaim:e=>{tu(e)},onInstall:iu}).catch(e=>{Vn("Startup sync check failed",e)}),la().catch(e=>{Vn("Restore check failed",e)})}function ql(){let n=document.createElement("style");n.id=Pa,n.textContent=ko,document.head.appendChild(n)}function Gl(){let{extensionName:n}=$(),e=new Spicetify.Topbar.Button(n,ni,t=>{ce("Topbar button clicked",Ht(t)),Ft()},!1,!0);return Aa(e),Jl(e),nu(e),ce("Topbar button registered",Ht(e)),e}function Aa(n){var t;let e=n;n.element.style.setProperty("-webkit-app-region","no-drag"),(t=e.button)==null||t.style.setProperty("-webkit-app-region","no-drag")}var Ta=".main-actionButtons",Rl=".Root__globalNav, .Root__top-bar",Vl=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function Jl(n){if(typeof MutationObserver=="undefined")return;let e=!1,t=null,i=()=>{e=!1,a();let s=n.element,c=document.querySelector(Ta);!s||!c||c.contains(s)||(c.prepend(s),Xl(n),Aa(n),ce("Topbar button re-attached",Ht(n)))},o=new MutationObserver(()=>{e||(e=!0,setTimeout(i,250))}),a=()=>{var u;if(t!=null&&t.isConnected)return;let s=document.querySelector(Ta),c=(u=s==null?void 0:s.closest(Rl))!=null?u:s==null?void 0:s.parentElement;if(o.disconnect(),t=c!=null?c:null,!c){o.observe(document.body,{childList:!0,subtree:!0});return}o.observe(c,{childList:!0,subtree:!0});for(let d=c.parentElement;d;d=d.parentElement)o.observe(d,{childList:!0})};i()}function Xl(n){let e=Zl(n);if(!e||e.className&&e.className!=="undefined")return;let t=Array.from(document.querySelectorAll(Vl)).find(i=>!n.element.contains(i));t!=null&&t.className&&(e.className=t.className)}function Zl(n){return n.button}function Ql(){var n;if(typeof((n=Spicetify.Menu)==null?void 0:n.Item)!="function")return null;try{return new Spicetify.Menu.Item($().extensionName,!1,()=>Ft(),eu())}catch(e){return Vn("Failed to create profile menu item",e),null}}function eu(){return ni.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function nu(n){Object.assign(window,{SyncifyDebug:{button:n,element:n.element,openModal:Ft,inspect:()=>Ht(n),clickElement:()=>{var e;return(e=n.element)==null?void 0:e.click()},clickInnerButton:()=>{var e;return(e=n.button)==null?void 0:e.click()},clickCallback:()=>n.onClick(n)}})}function Ht(n){var e,t,i,o,a;return{label:n.label,disabled:n.disabled,isRight:n.isRight,hasElement:!!n.element,elementConnected:(e=n.element)==null?void 0:e.isConnected,elementDisabled:(t=n.element)==null?void 0:t.disabled,elementAriaDisabled:(i=n.element)==null?void 0:i.getAttribute("aria-disabled"),elementClass:(o=n.element)==null?void 0:o.className,appRegion:n.element?getComputedStyle(n.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:n.button?getComputedStyle(n.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:n.element?getComputedStyle(n.element).pointerEvents:null,visibility:n.element?getComputedStyle(n.element).visibility:null,display:n.element?getComputedStyle(n.element).display:null,rect:(a=n.element)==null?void 0:a.getBoundingClientRect().toJSON()}}var W=null;function Ft(){if(W!=null&&W.container.isConnected){ce("Closing modal"),Spicetify.PopupModal.hide();return}ce("Opening modal"),jt(Spicetify.React.createElement(zi))}async function tu(n){let e=await V().catch(()=>null);W!=null&&W.container.isConnected||(ce("Opening claim notice"),jt(Spicetify.React.createElement(_a,{claim:n,signedIn:e!==null,onSignIn:()=>jt(Spicetify.React.createElement(zi,{section:"account"})),onClose:()=>Spicetify.PopupModal.hide()})))}function iu(n){if(W!=null&&W.container.isConnected)return;ce("Opening install notice");let e=()=>Spicetify.PopupModal.hide();jt(Spicetify.React.createElement("div",{className:"syncify-panel"},Spicetify.React.createElement(fa,{install:n,onDone:e,onClose:e})))}function jt(n){var t;(t=W==null?void 0:W.root)==null||t.unmount();let e=document.createElement("div");W={container:e,root:null};try{Spicetify.PopupModal.display({title:$().extensionName,content:e,isLarge:!1})}catch(i){throw Vn("Failed to open PopupModal",i),i}ou(e),au(e,n)}function ou(n){requestAnimationFrame(()=>{let e=su(n);e==null||e.classList.add("syncify-modal-shell");let t=e==null?void 0:e.querySelector(".main-trackCreditsModal-header h1");if(t&&!t.querySelector(".syncify-modal-mark")){let o=document.createElement("span");o.className="syncify-modal-mark",o.innerHTML=bo,t.prepend(o)}let i=e==null?void 0:e.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');i&&(i.classList.add("syncify-modal-close"),i.setAttribute("aria-label",`Close ${$().extensionName}`),i.title="Close",i.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function su(n){let e=n.parentElement;for(;e&&e!==document.body;){if(e.querySelector(".main-trackCreditsModal-header"))return e;e=e.parentElement}return n.closest('[class*="trackCreditsModal"]')}function au(n,e){try{if(typeof Spicetify.ReactDOM.createRoot=="function"){let t=Spicetify.ReactDOM.createRoot(n);t.render(e),(W==null?void 0:W.container)===n&&(W.root=t),ce("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(e,n),ce("Modal rendered",{renderer:"render"})}catch(t){throw Vn("Failed to render modal",t),t}}ca();(function n(){if(!Wl()){setTimeout(n,100);return}ce("Spicetify APIs ready"),zl()})();})();
