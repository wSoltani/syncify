// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var Ha=Object.defineProperty,Fa=Object.defineProperties;var Ya=Object.getOwnPropertyDescriptors;var lo=Object.getOwnPropertySymbols;var Wa=Object.prototype.hasOwnProperty,Ra=Object.prototype.propertyIsEnumerable;var uo=(n,e,t)=>e in n?Ha(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,g=(n,e)=>{for(var t in e||(e={}))Wa.call(e,t)&&uo(n,t,e[t]);if(lo)for(var t of lo(e))Ra.call(e,t)&&uo(n,t,e[t]);return n},C=(n,e)=>Fa(n,Ya(e));var yo=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var Xt=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var fo=`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="-2.5 -2.5 37 37" aria-hidden="true" focusable="false"><defs><mask id="syncify-mark-gap" maskUnits="userSpaceOnUse" x="-2" y="-2" width="36" height="36"><rect x="-2" y="-2" width="36" height="36" fill="#fff"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></mask></defs><g mask="url(#syncify-mark-gap)"><g transform="rotate(15 16 16)"><path d="M16 16L16 7.4A8.6 8.6 0 0 1 24.6 16Z" fill="#6cd1d1" transform="translate(0.42 -0.42)"/><path d="M16 16L24.6 16A8.6 8.6 0 0 1 16 24.6Z" fill="#efa4c1" transform="translate(0.42 0.42)"/><path d="M16 16L16 24.6A8.6 8.6 0 0 1 7.4 16Z" fill="#d3c48c" transform="translate(-0.42 0.42)"/><path d="M16 16L7.4 16A8.6 8.6 0 0 1 16 7.4Z" fill="#88bcf2" transform="translate(-0.42 -0.42)"/></g></g><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 28.03A12.4 12.4 0 1 1 28.03 19"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91"/></g></svg>
`;var Va="syncify",on="state";function Zt(){let n;try{n=window.indexedDB}catch(e){return Promise.resolve(null)}return n?new Promise(e=>{let t;try{t=n.open(Va,1)}catch(i){e(null);return}t.onupgradeneeded=()=>{t.result.createObjectStore(on)},t.onerror=()=>e(null),t.onblocked=()=>e(null),t.onsuccess=()=>e(t.result)}):Promise.resolve(null)}function Qt(n,e){let t=Zt().then(i=>new Promise((o,a)=>{if(!i){a(new Error("IndexedDB isn't available."));return}try{let s=i.transaction(on,n),c=e(s.objectStore(on));s.oncomplete=()=>{i.close(),o(c.result)},s.onerror=s.onabort=()=>{var u;i.close(),a((u=s.error)!=null?u:new Error("IndexedDB failed."))}}catch(s){i.close(),a(s)}}));return Promise.race([t,new Promise((i,o)=>setTimeout(()=>o(new Error("IndexedDB took too long.")),2e3))])}function sn(n){return Qt("readonly",e=>e.get(n))}async function an(n,e){await Qt("readwrite",t=>t.put(e,n))}async function po(n){await Qt("readwrite",e=>e.delete(n))}var Ie={extensionName:"Syncify",version:"1.13.1",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com",shareUrl:"https://syncs.wsoltani.com"};function O(){var e,t,i,o,a,s,c,u,y;let n=window.SyncifyConfig;return{extensionName:(e=Le(n==null?void 0:n.extensionName))!=null?e:Ie.extensionName,version:(t=mo(n==null?void 0:n.version))!=null?t:Ie.version,workerUrl:(i=Le(n==null?void 0:n.workerUrl))!=null?i:Ie.workerUrl,webUrl:(o=Le(n==null?void 0:n.webUrl))!=null?o:Ie.webUrl,githubUrl:(a=Le(n==null?void 0:n.githubUrl))!=null?a:Ie.githubUrl,kofiUrl:(s=Le(n==null?void 0:n.kofiUrl))!=null?s:Ie.kofiUrl,issueUrl:(c=Le(n==null?void 0:n.issueUrl))!=null?c:Ie.issueUrl,releasesUrl:(u=Le(n==null?void 0:n.releasesUrl))!=null?u:Ie.releasesUrl,shareUrl:(y=Le(n==null?void 0:n.shareUrl))!=null?y:Ie.shareUrl}}function Le(n){return mo(n)}function mo(n){return typeof n=="string"&&n.trim()?n.trim():null}var Ja="x-syncify-version",Xa="x-syncify-install",Za="x-syncify-timezone",go="install-id",ho="syncify:install-id",Qa=2e3,tt=null;async function So(){let n={[Ja]:O().version,[Xa]:(await ei()).id},e=tr();return e&&(n[Za]=e),n}function ei(){return tt!=null||(tt=er().catch(()=>({id:it(),inDatabase:!1}))),tt}async function er(){let n=await Promise.race([nr(),new Promise(e=>setTimeout(()=>e(null),Qa))]);if(n)return{id:n,inDatabase:!0};try{let e=window.localStorage.getItem(ho);if(e&&ko(e))return{id:e,inDatabase:!1};let t=it();return window.localStorage.setItem(ho,t),{id:t,inDatabase:!1}}catch(e){return{id:it(),inDatabase:!1}}}async function nr(){let n=await Zt();return n?new Promise(e=>{let t=null;try{let i=n.transaction(on,"readwrite"),o=i.objectStore(on),a=o.get(go);a.onsuccess=()=>{if(typeof a.result=="string"&&ko(a.result)){t=a.result;return}t=it(),o.put(t,go)},i.oncomplete=()=>{n.close(),e(t)},i.onerror=i.onabort=()=>{n.close(),e(null)}}catch(i){n.close(),e(null)}}):null}function it(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let n=crypto.getRandomValues(new Uint8Array(16));n[6]=n[6]&15|64,n[8]=n[8]&63|128;let e=[...n].map(t=>t.toString(16).padStart(2,"0"));return[e.slice(0,4).join(""),e.slice(4,6).join(""),e.slice(6,8).join(""),e.slice(8,10).join(""),e.slice(10).join("")].join("-")}function ko(n){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(n)}function tr(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(n){return null}}var ir="syncify-signature-v1",or={name:"ECDSA",hash:"SHA-256"};function ot(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function st(n){return ni(new Uint8Array(await crypto.subtle.exportKey("raw",n)))}async function wn(n,e,t,i,o){let a=await sr(e,t,i,o),s=await crypto.subtle.sign(or,n,a);return ni(new Uint8Array(s))}async function sr(n,e,t,i){let{pathname:o,search:a}=new URL(t),s=new TextEncoder,c=ni(new Uint8Array(await crypto.subtle.digest("SHA-256",s.encode(i))));return s.encode([ir,n,e.toUpperCase(),o+a,c].join(`
`))}function ni(n){let e="";for(let t=0;t<n.length;t++)e+=String.fromCharCode(n[t]);return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var bo="device-key",ti="session",wo="salt",Ye=null,xn,xo={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function rn(n){if(Ye)return Ye;let e=await sn(bo);return ar(e)?(Ye=Promise.resolve(e),e):n?(Ye=ot().then(async t=>(await an(bo,t),t)),Ye.catch(()=>{Ye=null}),Ye):null}async function G(){let n=await sn(ti);return rr(n)?n:null}function ii(n){return an(ti,n)}async function We(){await po(ti).catch(()=>{})}async function at(){if(xn===void 0){let n=await sn(wo).catch(()=>{});xn=typeof n=="string"?n:null}return xn}async function rt(n){n!==xn&&(xn=n,await an(wo,n).catch(()=>{}))}function ct(){return xo}function vo(n){xo=n}function ar(n){let e=n;return!!(e&&e.privateKey instanceof CryptoKey&&e.publicKey instanceof CryptoKey)}function rr(n){let e=n;return!!(e&&typeof e.token=="string"&&e.token&&typeof e.email=="string")}var Co="install-key",cn=null;function No(){return cn!=null||(cn=cr()),cn.catch(()=>{cn=null}),cn.catch(()=>null)}async function cr(){if(!(await ei()).inDatabase)return null;let n=await sn(Co),e=ur(n)?n:await lr();return{privateKey:e.privateKey,publicKey:await st(e.publicKey)}}async function lr(){let n=await ot();return await an(Co,n),n}function ur(n){let e=n;return!!(e&&e.privateKey instanceof CryptoKey&&e.publicKey instanceof CryptoKey)}var yr="/api/auth/email-otp/send-verification-otp",dr="/api/auth/sign-in/email-otp",fr="/api/auth/get-session",pr="/api/auth/sign-out",mr="/api/auth/link",gr="x-syncify-device-key",hr="x-syncify-signature",Io="x-syncify-salt",Sr="none",kr={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again.",link_failed:"Couldn't open the website. Try again."},v=class extends Error{constructor(t,i=null,o=null){var a;super((a=kr[t])!=null?a:"Sign-in failed. Try again.");this.code=t;this.retryAfter=i;this.share=o;this.name="AccountError"}};function Re(n){return n instanceof v?n.message:"Sign-in failed. Try again."}async function Eo(n){let e=await Cn(yr,{method:"POST",body:JSON.stringify({email:n,type:"sign-in"})});return typeof(e==null?void 0:e.resend_in)=="number"?e.resend_in:60}async function _o(n,e){var a;let t=await rn(!0).catch(()=>{throw new v("no_device_key")}),i=await Cn(dr,{method:"POST",body:JSON.stringify({email:n,otp:e}),keys:t,sendPublicKey:!0});if(typeof(i==null?void 0:i.token)!="string"||!i.token)throw new v("sign_in_failed");let o={token:i.token,email:typeof((a=i.user)==null?void 0:a.email)=="string"?i.user.email:n};return await ii(o).catch(()=>{throw new v("no_device_key")}),oi=!0,o}var oi=!1;async function To(){var e;let n=await G();if(!n||oi)return n;try{let t=await lt(n,fr,"GET");oi=!0;let i=(e=t==null?void 0:t.user)==null?void 0:e.email;if(typeof i!="string"||i===n.email)return n;let o=C(g({},n),{email:i});return await ii(o).catch(()=>{}),o}catch(t){if(t instanceof v&&t.code==="signed_out")return null;throw t}}async function Po(){let n=await G().catch(()=>null);n&&await lt(n,pr,"POST").catch(()=>{}),await We()}async function Ao(){let n=await G();if(!n)throw new v("signed_out");let e=await lt(n,mr,"POST"),t=typeof(e==null?void 0:e.url)=="string"?e.url:"",i=new URL(O().webUrl).origin;if(!t.startsWith(`${i}/link#`))throw new v("link_failed");return t}async function vn(n,e,t){let i=await G();if(!i)throw new v("signed_out");return lt(i,n,e,t)}async function Mo(n,e,t){let i=await G().catch(()=>null),o=i?await rn(!1).catch(()=>null):null;await Cn(n,g({method:"POST",body:JSON.stringify(e),headers:t,keepalive:!0},i&&o?{token:i.token,keys:o}:{}))}async function lt(n,e,t,i){let o=await rn(!1);if(!o)throw await We(),new v("signed_out");return Cn(e,g({method:t,token:n.token,keys:o},i===void 0?{}:{body:JSON.stringify(i)}))}async function Cn(n,e,t=!1){var p,h,b;let i=`${O().webUrl.replace(/\/+$/,"")}${n}`,o=g({},e.headers);if(e.body!==void 0&&(o["content-type"]="application/json"),e.token&&(o.authorization=`Bearer ${e.token}`),e.keys){let N=(p=await at())!=null?p:Sr;o[Io]=N,o[hr]=await wn(e.keys.privateKey,N,e.method,i,(h=e.body)!=null?h:""),e.sendPublicKey&&(o[gr]=await st(e.keys.publicKey))}let a;try{a=await fetch(i,{method:e.method,headers:o,body:e.body,keepalive:e.keepalive})}catch(N){throw new v("offline")}let s=a.headers.get(Io);s&&await rt(s);let c=await a.json().catch(()=>null);if(a.ok)return c;let u=typeof(c==null?void 0:c.code)=="string"?c.code:a.status===503?"unavailable":"failed";if(u==="stale_salt"&&e.keys&&!t)return Cn(n,e,!0);u==="signed_out"&&await We();let y=Number(a.headers.get("retry-after")),f=c==null?void 0:c.share;throw new v(u,Number.isFinite(y)&&y>0?y:(b=br[u])!=null?b:null,typeof(f==null?void 0:f.code)=="string"?{code:f.code,link:typeof f.link=="string"?f.link:null}:null)}var br={resend_wait:60,too_many_requests:60,send_failed:60};var wr="x-syncify-user-hash",xr="x-syncify-identity",vr="x-syncify-signature",Cr="x-syncify-install-key",Nr="x-syncify-install-signature",si="x-syncify-salt",Ir="none",Er="/restores",_r="/installs",Tr="hash",Lo=3,Nn=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}},ke=class extends Error{constructor(t){super(t==="not_linked"?"Couldn't read that Spotify account's backups.":"Sign in to restore this backup.");this.code=t;this.name="LockedError"}},ze=class extends Error{constructor(){super("This Spotify account doesn't accept backups from this install. Sign in to back up."),this.name="InstallRefusedError"}};async function Do(n,e,t){var a;let i=await Oe(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(t)});if(i.status===403&&((a=await i.json().catch(()=>null))==null?void 0:a.code)==="install_refused")throw new ze;if(!i.ok)throw new Error(`Backup failed with HTTP ${i.status}.`);let o=await i.json().catch(()=>null);return{unchanged:(o==null?void 0:o.unchanged)===!0,unapproved:(o==null?void 0:o.quarantined)===!0}}async function Uo(n,e,t,i){let o=await Oe(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({install:t,action:i})},_r);if(o.ok)return;let a=await o.json().catch(()=>null);if((a==null?void 0:a.code)!=="not_pending")throw new Error(`Couldn't answer with HTTP ${o.status}.`)}async function ai(n,e,t){var h,b,N,x;let i=await Oe(n,e,{method:"GET"},Ko("/",t));if(i.status===404){let k=await i.json().catch(()=>null);return{exists:!1,payload:null,backups:[],safetyCopy:null,claim:In(k==null?void 0:k.claim),unapproved:[],install:Oo(k==null?void 0:k.install)}}if(!i.ok)throw new Error(`Restore failed with HTTP ${i.status}.`);let o=await i.json(),a=In(o.claim),s=Oo(o.install);delete o.claim,delete o.install;let c=[o,...(h=o.backup_history)!=null?h:[]];if(!c.every(k=>k.backup))return{exists:!0,payload:o,backups:c.slice(0,Lo),safetyCopy:(b=c[Lo])!=null?b:null,claim:a,unapproved:[],install:s};let u=c.filter(k=>{var P;return((P=k.backup)==null?void 0:P.kind)==="rolling"}),y=(N=c.find(k=>{var P;return((P=k.backup)==null?void 0:P.kind)==="anchor"}))!=null?N:null,f=c.filter(k=>{var P;return((P=k.backup)==null?void 0:P.kind)==="quarantined"}),p=(x=u[0])!=null?x:y;return p?u.length===0&&y?{exists:!0,payload:p,backups:[y],safetyCopy:null,claim:a,unapproved:f,install:s}:{exists:!0,payload:p,backups:u,safetyCopy:y,claim:a,unapproved:f,install:s}:{exists:!1,payload:null,backups:[],safetyCopy:null,claim:a,unapproved:f,install:s}}async function Bo(n,e,t,i){try{await Oe(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:t}),keepalive:!0},Ko(Er,i))}catch(o){}}async function Oe(n,e,t,i="",o=!1){var x,k,P,M,J;let a=i?`${n.replace(/\/+$/,"")}${i}`:n,s=(x=t.method)!=null?x:"GET",c=await G().catch(()=>null),u=c?await rn(!1).catch(()=>null):null,y=await No(),f={},p=(k=await at())!=null?k:Ir;c&&u&&(f.authorization=`Bearer ${c.token}`,f[si]=p,f[vr]=await wn(u.privateKey,p,s,a,(P=t.body)!=null?P:"")),y&&(f[si]=p,f[Cr]=y.publicKey,f[Nr]=await wn(y.privateKey,p,s,a,(M=t.body)!=null?M:""));let h=await fetch(a,C(g({},t),{headers:g(C(g(g({},t.headers),await So()),{[wr]:e.hash,[xr]:e.field}),f)})),b=h.headers.get(si);if(b&&await rt(b),h.status===426)throw new Nn;if(h.status!==401)return h;let N=(J=await h.clone().json().catch(()=>null))==null?void 0:J.code;if(!o){if(N==="stale_salt"&&(c||y))return Oe(n,e,t,i,!0);if(N==="signed_out"&&c)return await We(),Oe(n,e,t,i,!0)}throw N==="claimed"||N==="not_owner"||N==="not_linked"?new ke(N):(N==="signed_out"&&await We(),new v(typeof N=="string"?N:"failed"))}function Ko(n,e){return e?`${n}?${Tr}=${encodeURIComponent(e)}`:n}function Oo(n){let e=n;if(!e||typeof e.trust!="string")return null;let t=Array.isArray(e.waiting)?e.waiting:[];return{trusted:e.trust!=="pending"&&e.trust!=="rejected",refused:e.trust==="rejected",waiting:t.flatMap(i=>{let o=i;return o&&typeof o.id=="string"&&typeof o.first_seen_at=="number"?[{id:o.id,device:typeof o.device=="string"?o.device:null,first_seen_at:o.first_seen_at}]:[]})}}function In(n){let e=n;return!e||typeof e.mine!="boolean"?null:e.status==="final"?{status:"final",mine:e.mine}:e.status!=="pending"||typeof e.final_at!="number"?null:g({status:"pending",mine:e.mine,email:typeof e.email=="string"?e.email:null,final_at:e.final_at,held:e.held===!0},e.waiting===!0?{waiting:!0}:{})}async function ut(n){let e=new TextEncoder().encode(n),t=await crypto.subtle.digest("SHA-256",e);return[...new Uint8Array(t)].map(i=>i.toString(16).padStart(2,"0")).join("")}function En(n){return JSON.stringify(ri(n))}function ri(n){return Array.isArray(n)?n.map(ri):n&&typeof n=="object"?Object.keys(n).sort().reduce((e,t)=>(e[t]=ri(n[t]),e),{}):n}function $o(){let n=navigator.userAgent;return/Windows/i.test(n)?"Windows":/Mac OS|Macintosh/i.test(n)?"macOS":/Linux/i.test(n)?"Linux":n}var Pr=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,Ar=100,Mr="marketplace:installed-extensions",Lr="marketplace:installed-themes",Or="marketplace:theme-installed",Dr="marketplace:installed:",Ur="marketplace";function li(n){return Spicetify.Config?ui(Spicetify.Config,n):null}function ui(n,e){var a;let t=De(n),i=new Set(Br(e)),o=((a=e[Or])==null?void 0:a.includes(Dr))===!0;return{current_theme:o?Ur:t.current_theme,color_scheme:o?"":t.color_scheme,extensions:t.extensions.filter(s=>!i.has(s)),custom_apps:t.custom_apps}}function De(n){let e=n&&typeof n=="object"?n:{};return{current_theme:ci(e.current_theme)?e.current_theme:"",color_scheme:ci(e.color_scheme)?e.color_scheme:"",extensions:jo(e.extensions),custom_apps:jo(e.custom_apps)}}function Yo(n,e){return En(De(n))===En(De(e))}function jo(n){return Array.isArray(n)?[...new Set(n.filter(ci))].sort().slice(0,Ar):[]}function ci(n){return typeof n=="string"&&Pr.test(n)}function Br(n){let e=Ho(n[Mr]).map(i=>{var a;let o=(a=Fo(n[i]))==null?void 0:a.manifest;return o&&typeof o=="object"?o.main:void 0}),t=Ho(n[Lr]).flatMap(i=>{var a;let o=(a=Fo(n[i]))==null?void 0:a.include;return Array.isArray(o)?o:[]});return[...e,...t].flatMap(i=>{let o=typeof i=="string"?i.split("/").pop():void 0;return o?[o]:[]})}function Ho(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function Fo(n){try{let e=n?JSON.parse(n):null;return e&&typeof e=="object"&&!Array.isArray(e)?e:null}catch(e){return null}}var Kr=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],$r="marketplace:installed:",Wo=`${$r}snippet:`,jr="wsoltani/syncify",Hr="marketplace",Ro={added:0,removed:1,unchanged:2};function V(n){let e=new Map;for(let[t,i]of Kr)for(let o of Rr(n[t]))e.has(o)||e.set(o,Yr(o,i,n[o]));return[...e.values()]}function _n(n,e,t,i){let o=new Set(n.map(u=>u.key)),a=new Map(t.map(u=>[u.key,u])),s=[...n.map(u=>{let y=a.get(u.key);return C(g({},u),{change:y?"unchanged":"added",isNew:!y||y.sources.join(" ")!==u.sources.join(" ")})}),...t.filter(u=>!o.has(u.key)).map(u=>C(g({},u),{change:Tn(u,n)?"unchanged":"removed",isNew:!1}))].sort((u,y)=>Ro[u.change]-Ro[y.change]||u.name.localeCompare(y.name)),c={added:0,removed:0,unchanged:0};for(let u of s)c[u.change]+=1;return{items:s,counts:c,manual:Fr(e,i)}}function Tn(n,e){return n.type==="extension"&&dt(n)&&!e.some(dt)}function dt(n){var e;return((e=n.repo)==null?void 0:e.toLowerCase())===jr}function Fr(n,e){if(!n)return[];let t=De(n),i=De(e),o=[...t.extensions.filter(s=>!i.extensions.includes(s)).map(s=>({type:"extension",name:s})),...t.custom_apps.filter(s=>!i.custom_apps.includes(s)).map(s=>({type:"custom_app",name:s}))],a=t.current_theme;return a&&a!==Hr&&(a!==i.current_theme||t.color_scheme!==i.color_scheme)&&o.push(g({type:"theme",name:a},t.color_scheme?{scheme:t.color_scheme}:{})),o}function Yr(n,e,t){var u,y;let i=zo(t),o=zo(i==null?void 0:i.manifest),a=yt(i==null?void 0:i.user),s=yt(i==null?void 0:i.repo),c=(y=(u=yt(i==null?void 0:i.title))!=null?u:yt(o==null?void 0:o.name))!=null?y:n.startsWith(Wo)?n.slice(Wo.length):n.split("/").pop()||n;return{key:n,type:e,name:c,repo:e!=="snippet"&&a&&s?`${a}/${s}`:null,sources:Wr(e,i),custom:e==="snippet"&&(i==null?void 0:i.custom)===!0}}function Wr(n,e){return e?(n==="extension"?[e.extensionURL]:n==="theme"?[e.cssURL,e.schemesURL,...Array.isArray(e.include)?e.include:[]]:[]).filter(i=>typeof i=="string"&&i!==""):[]}function yt(n){return typeof n=="string"&&n.trim()?n.trim():null}function Rr(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function zo(n){let e=n;if(typeof n=="string")try{e=JSON.parse(n)}catch(t){return null}return e&&typeof e=="object"&&!Array.isArray(e)?e:null}var ft="spicetify-marketplace";var Pn="settings";async function qo(){let n=await Jo();if(n.kind!=="ok")return null;try{let e=await Xo(n.db,"readonly",i=>i.getAll());if(!e)return null;let t={};for(let i of e)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(t[i.key]=i.value);return t}finally{n.db.close()}}async function Go(n,e=[]){let t=await Jo();if(t.kind==="unavailable")return"unavailable";let i=t.kind==="ok"?t.db:await zr();if(!i)return"failed";try{return await Xo(i,"readwrite",a=>{let s;for(let[c,u]of Object.entries(n))s=a.put({key:c,value:u});for(let c of e)s=a.delete(c);return s})===null?"failed":"written"}finally{i.close()}}function Vo(){var n;try{return(n=window.indexedDB)!=null?n:null}catch(e){return null}}async function Jo(){let n=Vo();return n?await qr(n)?{kind:"missing"}:new Promise(e=>{let t=!1,i=n.open(ft);i.onupgradeneeded=()=>{t=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),e({kind:"unavailable"})},i.onblocked=()=>e({kind:"unavailable"}),i.onsuccess=()=>{let o=i.result;if(t){o.close(),Gr(n).then(()=>e({kind:"missing"}));return}if(!o.objectStoreNames.contains(Pn)){o.close(),e({kind:"unavailable"});return}e({kind:"ok",db:o})}}):{kind:"unavailable"}}function zr(){let n=Vo();return n?new Promise(e=>{let t=n.open(ft,1);t.onupgradeneeded=()=>{let i=t.result;i.objectStoreNames.contains(Pn)||i.createObjectStore(Pn,{keyPath:"key"})},t.onerror=()=>{console.warn("Syncify could not create Marketplace storage",t.error),e(null)},t.onblocked=()=>e(null),t.onsuccess=()=>e(t.result)}):Promise.resolve(null)}async function qr(n){if(typeof n.databases!="function")return!1;try{return!(await n.databases()).some(t=>t.name===ft)}catch(e){return!1}}function Gr(n){return new Promise(e=>{let t=n.deleteDatabase(ft);t.onsuccess=()=>e(),t.onerror=()=>e(),t.onblocked=()=>e()})}function Xo(n,e,t){return new Promise(i=>{let o;try{o=n.transaction(Pn,e)}catch(y){console.warn("Syncify could not open a Marketplace transaction",y),i(null);return}let a,s=!1,c=y=>{s||(s=!0,i(y))};o.oncomplete=()=>c(a),o.onerror=()=>{console.warn("Syncify Marketplace transaction failed",o.error),c(null)},o.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",o.error),c(null)};let u;try{u=t(o.objectStore(Pn))}catch(y){console.warn("Syncify Marketplace request could not be issued",y),c(null);return}u&&(u.onsuccess=()=>{a=u.result},u.onerror=()=>{console.warn("Syncify Marketplace request failed",u.error),c(null)})})}var di="marketplace:",pt=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function pe(){let n=ic(),e=await qo();if(e)for(let[t,i]of Object.entries(e))t.startsWith(di)&&(n[t]=i);return n}var Jr=new Set(["marketplace:active-tab","marketplace:sort"]),Zo="marketplace:installed:",yi="marketplace:theme-installed",Xr=["stars","tags","lastUpdated","created"];async function mt(n,e){let t={};for(let[i,o]of Object.entries(n))Jr.has(i)||(t[i]=i.startsWith(Zo)?Zr(o):o);return e&&(t.spicetify_config=De(e)),ut(En(t))}function Zr(n){try{let e=JSON.parse(n);if(!e||typeof e!="object"||Array.isArray(e))return n;for(let t of Xr)delete e[t];return e}catch(e){return n}}async function gt(){let n=await pe(),e=li(n);return{keyCount:Object.keys(n).length,hash:await mt(n,e),installedItemCount:nc(n),installedItems:ht(n),items:V(n),spicetifyConfig:e,marketplaceAvailable:tc(n)}}async function Qo(){let n=await pe(),e=li(n);return g({schema_version:2,metadata:{last_sync_datetime:new Date().toISOString(),device_info:$o(),marketplace_key_count:Object.keys(n).length},payload_hash:await mt(n,e),marketplace_data:{keys:n}},e?{spicetify_config:e}:{})}async function es(n,e=[]){var a,s;let t={},i=(s=(a=n.marketplace_data)==null?void 0:a.keys)!=null?s:{};for(let[c,u]of Object.entries(i))c.startsWith(di)&&(t[c]=u);if(Object.keys(t).length===0)return 0;await Qr(t),e.length>0&&await ec(t,e);let o=pi(await pe(),t);return await fi(t,o),Object.keys(t).length}async function fi(n,e=[]){for(let[i,o]of Object.entries(n))window.localStorage.setItem(i,o);for(let i of e)window.localStorage.removeItem(i);if(await Go(n,e)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try again.")}function pi(n,e){let t=new Set(pt.flatMap(s=>{var c;return St((c=e[s])!=null?c:n[s]).map(String)})),i=ht(n).filter(s=>s.startsWith(Zo)&&!t.has(s)),o=i.filter(s=>n[s]!==void 0&&e[s]===void 0),a=n[yi];return a&&e[yi]===void 0&&i.some(s=>a.includes(s))&&o.push(yi),o}async function Qr(n){let e=await pe(),t=V(n),i=V(e).filter(s=>Tn(s,t));if(i.length===0)return;let o="marketplace:installed-extensions",a=St(n[o]).map(String);for(let s of i)a.includes(s.key)||a.push(s.key),n[s.key]=e[s.key];n[o]=JSON.stringify(a)}async function ec(n,e){let t=await pe(),i=ht(t);for(let o of pt){if(n[o]===void 0)continue;let a=St(n[o]).map(String).filter(s=>!e.includes(s)||i.includes(s));n[o]=JSON.stringify(a)}for(let o of e)t[o]!==void 0?n[o]=t[o]:delete n[o]}function nc(n){return ht(n).length}function ht(n){return pt.flatMap(e=>St(n[e]).map(String))}function tc(n){return!!(window.Marketplace||pt.some(t=>n[t]!==void 0)||n["marketplace:tabs"]!==void 0)}function ns(n,e){return e===0?!1:n===0?!0:n<Math.max(2,Math.floor(e*.5))}function ic(){let n={};for(let e=0;e<window.localStorage.length;e+=1){let t=window.localStorage.key(e);if(!(t!=null&&t.startsWith(di)))continue;let i=window.localStorage.getItem(t);i!==null&&(n[t]=i)}return n}function St(n){if(!n)return[];try{let e=JSON.parse(n);return Array.isArray(e)?e:[]}catch(e){return[]}}var oc="raw.githubusercontent.com",sc="cdn.jsdelivr.net",ts=".github.io";function gi(n){var t;if(n.protocol!=="https:")return null;let e=n.pathname.split("/").filter(Boolean);if(n.host===oc)return mi(e[0],e[1]);if(n.host===sc)return e[0]==="gh"?mi(e[1],(t=e[2])==null?void 0:t.split("@")[0]):null;if(n.host.endsWith(ts)){let i=n.host.slice(0,-ts.length);return i.includes(".")?null:mi(i,e.length>1?e[0]:n.host)}return null}function mi(n,e){return n&&e?`${n}/${e}`:null}var ac={extension:"spicetify-extensions",theme:"spicetify-themes"},rc="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",cc="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",lc="https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/",uc="https://api.github.com/repos",yc=5e3,dc=20,is="syncify:repo-topics",os=10080*60*1e3,fc=200;function Ue(n){return(n==null?void 0:n.kind)==="host"||(n==null?void 0:n.kind)==="repo"||(n==null?void 0:n.kind)==="blocked"||(n==null?void 0:n.kind)==="catalog"}function Ln(n){let e=new Map;for(let t of n){if(t.change==="removed")continue;if(t.custom){e.set(t.key,{kind:"custom"});continue}let i=pc(t);i&&e.set(t.key,i)}return e}async function On(n,e){let t=new Map,i=n.filter(s=>s.change!=="removed"&&s.isNew&&!e.has(s.key));if(i.length===0)return t;let o=i.filter(s=>s.type==="snippet"),a=i.filter(s=>s.type!=="snippet");if(o.length>0){let s=await hi();for(let c of o)s?kt(s,c.name)||t.set(c.key,{kind:"catalog"}):t.set(c.key,{kind:"unchecked"})}if(a.length>0){let s=await hc(),c=bc(),u=0;await Promise.all(a.map(async y=>{let f=mc(y),p=ac[y.type];if(!f||!p)return;if(s===null){t.set(y.key,{kind:"unchecked"});return}if(gc(f,s)){t.set(y.key,{kind:"blocked"});return}let h=kc(c,f);h===void 0&&u<dc&&(u+=1,h=await Sc(f),h!==void 0&&(c[f.toLowerCase()]={topics:h,at:Date.now()})),h===void 0?t.set(y.key,{kind:"unchecked"}):(h===null||!h.includes(p))&&t.set(y.key,{kind:"catalog"})})),wc(c)}return t}function pc(n){let e=null;for(let t of n.sources){let i;try{i=new URL(t)}catch(a){return{kind:"host",host:t.slice(0,40)}}let o=gi(i);if(!o)return{kind:"host",host:i.host};n.repo&&o.toLowerCase()!==n.repo.toLowerCase()&&(e!=null||(e=o))}return e?{kind:"repo",repo:e}:null}function mc(n){for(let e of n.sources)try{let t=gi(new URL(e));if(t)return t}catch(t){}return n.repo}function gc(n,e){let t=`https://github.com/${n}`.toLowerCase();return e.some(i=>{let o=i.toLowerCase();if(!o.includes("*"))return o===t;let a=o.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${a}$`).test(t)})}function ss(n){return n.replace(/\n/g,"").trim().toLowerCase()}function kt(n,e){return n.get(ss(e))}var An=null,Mn=null;function hc(){return An!=null||(An=as(rc).then(n=>{let e=n==null?void 0:n.repos;return Array.isArray(e)?e.filter(t=>typeof t=="string"&&!t.startsWith("//")):(An=null,null)})),An}function hi(){return Mn!=null||(Mn=as(cc).then(n=>{if(!Array.isArray(n))return Mn=null,null;let e=new Map;for(let t of n){if(typeof(t==null?void 0:t.title)!="string"||typeof t.code!="string")continue;let i=typeof t.preview=="string"?t.preview:null;e.set(ss(t.title),g({title:t.title,code:t.code,description:typeof t.description=="string"?t.description:""},i?{imageURL:i.startsWith("http")?i:`${lc}${i}`}:{}))}return e})),Mn}async function Sc(n){let e=await rs(`${uc}/${n}`);if((e==null?void 0:e.status)===404)return null;if(!(e!=null&&e.ok))return;let t=await e.json().catch(()=>null);return Array.isArray(t==null?void 0:t.topics)?t.topics.filter(i=>typeof i=="string"):void 0}async function as(n){let e=await rs(n);return e!=null&&e.ok?e.json().catch(()=>null):null}async function rs(n){let e=typeof AbortController=="function"?new AbortController:null,t=setTimeout(()=>e==null?void 0:e.abort(),yc);try{return await fetch(n,{signal:e==null?void 0:e.signal})}catch(i){return null}finally{clearTimeout(t)}}function kc(n,e){let t=n[e.toLowerCase()];return t&&Date.now()-t.at<os?t.topics:void 0}function bc(){var n;try{let e=JSON.parse((n=localStorage.getItem(is))!=null?n:"{}");return e&&typeof e=="object"?e:{}}catch(e){return{}}}function wc(n){let e=Date.now(),t=Object.entries(n).filter(([,i])=>e-i.at<os).sort(([,i],[,o])=>o.at-i.at).slice(0,fc);try{localStorage.setItem(is,JSON.stringify(Object.fromEntries(t)))}catch(i){}}var xc=/^[0-9A-HJKMNP-TV-Z]{6}$/,vc=6,Cc="SYN-",ys=60,ds=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],fs="marketplace:installed:",Xu=`${fs}snippet:`,qe="marketplace:theme-installed",cs="marketplace",ls={added:0,removed:1,unchanged:2};function Be(n){return`${Cc}${n}`}function ps(n){let e=n.trim();if(e.length>200)return null;if(e.includes("/")){let i=e.split(/[?#]/)[0].replace(/\/+$/,"");e=i.slice(i.lastIndexOf("/")+1).replace(/\.json$/i,"")}e=e.toUpperCase().replace(/[\s-]/g,""),e.length===vc+3&&e.startsWith("SYN")&&(e=e.slice(3));let t=e.replace(/O/g,"0").replace(/[IL]/g,"1");return xc.test(t)?t:null}function ms(n){let e=n;return!e||typeof e.code!="string"||!e.keys||typeof e.keys!="object"||!Object.values(e.keys).every(t=>typeof t=="string")?null:{code:e.code,name:typeof e.name=="string"&&e.name?e.name:null,updated_at:typeof e.updated_at=="number"?e.updated_at:0,keys:e.keys}}async function gs(n,e){let t=n.filter(s=>!dt(s)).map(s=>C(g({},s),{change:"added",isNew:!0})),i=Ln(t);for(let s of t)!i.has(s.key)&&!Nc(s,e[s.key])&&i.set(s.key,{kind:"catalog"});let o=await On(t,i),a=new Map;for(let[s,c]of[...o,...i])c.kind!=="unchecked"&&a.set(s,c);return{items:t,leftOut:a}}function Nc(n,e){if(n.type==="snippet")return!0;if(!n.repo)return!1;let t=_c(e);return n.type==="extension"?typeof(t==null?void 0:t.extensionURL)=="string"&&t.extensionURL!=="":typeof(t==null?void 0:t.cssURL)=="string"&&t.cssURL!==""}function hs(n,e){let t={};for(let[o,a]of ds){let s=e.filter(c=>c.type===a&&n[c.key]!==void 0).map(c=>c.key);t[o]=JSON.stringify(s);for(let c of s)t[c]=n[c]}let i=Si(n[qe]);return i&&e.some(o=>o.key===i)&&(t[qe]=n[qe]),t}function Ss(n,e,t,i,o){let a=o==="replace"?_n(e,void 0,t,i):Ic(e,t),s=Si(n.keys[qe]),c=s!==null&&e.some(u=>u.key===s)&&i!==null&&i.current_theme!==cs;return C(g({},a),{manual:c?[{type:"theme",name:cs}]:[]})}function Ic(n,e){let t=new Set(e.map(s=>s.key)),i=new Set(n.map(s=>s.key)),o=[...n.map(s=>t.has(s.key)?C(g({},s),{change:"unchanged",isNew:!1}):C(g({},s),{change:"added",isNew:!0})),...e.filter(s=>!i.has(s.key)).map(s=>C(g({},s),{change:"unchanged",isNew:!1}))].sort((s,c)=>ls[s.change]-ls[c.change]||s.name.localeCompare(c.name)),a={added:0,removed:0,unchanged:0};for(let s of o)a[s.change]+=1;return{items:o,counts:a,manual:[]}}function ks(n,e){return new Set(n.items.filter(t=>t.type==="snippet"&&t.change==="added"&&(!e||!kt(e,t.name))).map(t=>t.key))}async function bs(n,e,t,i){let o=await pe(),a=V(o),s=V(n.keys),c={};for(let[p,h]of ds){let b=us(o[p]),x=[...e==="add"?b:b.filter(k=>t.includes(k)||a.some(P=>P.key===k&&Tn(P,s)))];for(let k of s){if(k.type!==h||t.includes(k.key))continue;let P=b.includes(k.key);if(e==="add"&&P)continue;let M=h==="snippet"?Ec(k,i,o[k.key]):n.keys[k.key];M!==void 0&&(c[k.key]=M,x.includes(k.key)||x.push(k.key))}c[p]=JSON.stringify(x)}let u=Si(n.keys[qe]),y=us(c["marketplace:installed-themes"]);u&&y.includes(u)&&!t.includes(u)&&(c[qe]=n.keys[qe]);let f=pi(o,c);return await fi(c,f),Object.keys(c).length+f.length}function Ec(n,e,t){let i=e?kt(e,n.name):void 0;return i?JSON.stringify(g({code:i.code,title:i.title,description:i.description},i.imageURL?{imageURL:i.imageURL}:{})):t}function Si(n){if(!n)return null;if(n.startsWith(fs))return n;try{let e=JSON.parse(n);return typeof e=="string"?e:null}catch(e){return null}}function us(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function _c(n){try{let e=n?JSON.parse(n):null;return e&&typeof e=="object"&&!Array.isArray(e)?e:null}catch(e){return null}}var Dn="/api/shares",Tc=`${Dn}/update`,Pc=`${Dn}/delete`,Ac=`${Dn}/import`,Mc="x-syncify-user-hash",Lc={no_code:"This code doesn't exist.",too_many_codes:"You can't make more share codes. Delete one to make another.",daily_limit:"Too many changes to share codes today. Try again tomorrow.",too_large:"This setup is too big to share.",invalid_name:"Names are up to 60 characters.",empty:"There's nothing to share yet. Install something from Marketplace first.",invalid_items:"Syncify couldn't read some items. Reload Spotify and try again.",source:"Some items don't load from GitHub. Reload Spotify and try again.",blocked:"Some items are on Marketplace's block list. Reload Spotify and try again.",custom_snippet:"Custom snippets can't be shared. Reload Spotify and try again.",unchecked:"Couldn't check Marketplace's block list. Try again in a minute.",publish_failed:"Couldn't publish the code. Press Update on it to try again.",delete_failed:"Couldn't delete the code. Try again.",same_setup:"You already shared this setup.",unavailable:"Share codes aren't available yet."},Oc=new Set(["offline","signed_out","invalid_signature","stale_salt","no_device_key","too_many_requests"]);function bt(n,e=null){var t;return n instanceof v&&Oc.has(n.code)?Re(n):n instanceof v&&n.code==="too_many_codes"&&e!==null?`You have ${e} share codes already. Delete one to make another.`:(t=n instanceof v?Lc[n.code]:void 0)!=null?t:"Something went wrong. Try again."}async function ws(){let n=await vn(Dn,"GET");return{codes:Array.isArray(n==null?void 0:n.codes)?n.codes.flatMap(e=>{let t=Dc(e);return t?[t]:[]}):[],max:typeof(n==null?void 0:n.max)=="number"?n.max:null}}async function xs(n,e){return Es(await vn(Dn,"POST",{name:n,keys:e}))}async function vs(n,e,t){return Es(await vn(Tc,"POST",{code:n,name:e,keys:t}))}async function Cs(n){try{await vn(Pc,"POST",{code:n})}catch(e){if(e instanceof v&&e.code==="no_code")return;throw e}}async function Ns(n){let e=O().shareUrl.replace(/\/+$/,""),t;try{t=await fetch(`${e}/${n}.json`)}catch(o){throw new v("offline")}if(t.status===404||t.status===403)throw new v("no_code");if(!t.ok)throw new v("failed");let i=ms(await t.json().catch(()=>null));if(!i||i.code!==n)throw new v("no_code");return i}async function Is(n,e){try{await Mo(Ac,{code:n},{[Mc]:e.hash})}catch(t){}}function Dc(n){let e=n;return!e||typeof e.code!="string"?null:{code:e.code,name:typeof e.name=="string"&&e.name?e.name:null,link:typeof e.link=="string"?e.link:null,item_count:typeof e.item_count=="number"?e.item_count:0,imports:typeof e.imports=="number"?e.imports:0,created_at:typeof e.created_at=="number"?e.created_at:0,updated_at:typeof e.updated_at=="number"?e.updated_at:0}}function Es(n){let e=n;if(typeof(e==null?void 0:e.code)!="string")throw new v("failed");return{code:e.code,link:typeof e.link=="string"?e.link:null,leftOut:Array.isArray(e.left_out)?e.left_out.length:0}}var _s="/claims",Uc="/claims/cancel",Bc={no_backup:"Back up first, then secure your backup.",unsupported_identity:"This Spotify account can't be secured.",too_many_accounts:"Your account already has 10 Spotify accounts linked.",offline:"Couldn't reach Syncify. Check your connection and try again."},Ke=class extends Error{constructor(t){var i;super((i=Bc[t])!=null?i:"Couldn't secure your backup. Try again.");this.code=t;this.name="ClaimError"}};async function Ts(n,e){let t=await ki(n,e,"GET",_s);if(!t.ok)throw new Ke(await bi(t));let i=await t.json().catch(()=>null);return{claim:In(i==null?void 0:i.claim),accounts:Array.isArray(i==null?void 0:i.accounts)?i.accounts.filter(Kc):null}}async function Ps(n,e){let t=await ki(n,e,"POST",_s);if(!t.ok)throw new Ke(await bi(t));let i=await t.json().catch(()=>null);return In(i==null?void 0:i.claim)}async function As(n,e){let t=await ki(n,e,"POST",Uc);if(!t.ok&&t.status!==404)throw new Ke(await bi(t))}async function ki(n,e,t,i){try{return await Oe(n,e,{method:t},i)}catch(o){throw o instanceof TypeError?new Ke("offline"):o}}async function bi(n){let e=await n.json().catch(()=>null);return typeof(e==null?void 0:e.code)=="string"?e.code:"failed"}function Kc(n){let e=n;return!!(e&&typeof e.hash=="string"&&(e.status==="pending"||e.status==="final"||e.status==="cancelled"))}var un={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},$c=/^([a-z0-9]|f([1-9]|1[0-2]))$/,jc=250,Hc=40,wi=null,wt=null,ln=null;function Ms(){return/mac/i.test(navigator.platform||navigator.userAgent)}function Ls(n){if(n===null)return null;if(!n||typeof n!="object")return un;let e=n;return typeof e.key!="string"||!$c.test(e.key)?un:{key:e.key,ctrl:!!e.ctrl,alt:!!e.alt,shift:!!e.shift,meta:!!e.meta}}function Un(n){if(!n)return"Off";let e=n.key.toUpperCase();return Ms()?[n.ctrl?"\u2318":"",n.alt?"\u2325":"",n.shift?"\u21E7":"",e].join(""):[n.ctrl&&"Ctrl",n.meta&&"Win",n.alt&&"Alt",n.shift&&"Shift",e].filter(Boolean).join("+")}function Os(n){if(n.key==="Escape")return{kind:"cancel"};let e=Fc(n.code);if(!e)return{kind:"ignore"};let t=Ms();if(t&&n.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:e,ctrl:t?n.metaKey:n.ctrlKey,alt:n.altKey,shift:n.shiftKey,meta:t?!1:n.metaKey},o=e.startsWith("f")&&e.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!o?{kind:"error",message:`Include ${t?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function Fc(n){var t,i;let e=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(n);return e?((i=(t=e[1])!=null?t:e[2])!=null?i:e[3]).toLowerCase():null}function Ds(n){var e;if(ln&&Yc(ln,n))return!1;try{let t=Spicetify.Mousetrap,i=(e=t.trigger)==null?void 0:e.call(t)._directMap;if(!i)return!1;let o=xi(n);return Object.keys(i).some(a=>a.startsWith(`${o}:`))}catch(t){return!1}}function vi(n,e,t=0){if(wi=e,wt=n,!Us()){if(t>=Hc){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>vi(wt,e,t+1),jc);return}Ci(wt)}function Ci(n){if(wt=n,!Us()||!wi)return;let e=wi;try{if(ln&&Spicetify.Keyboard._deregisterShortcut(ln),ln=null,!n)return;Spicetify.Keyboard.registerShortcut(n,t=>{t.preventDefault(),e()}),ln=n,console.debug("[Syncify]","Keyboard shortcut registered",Un(n))}catch(t){console.warn("[Syncify]","Failed to register keyboard shortcut",t)}}function Us(){var n;return typeof((n=Spicetify.Keyboard)==null?void 0:n.registerShortcut)=="function"}function xi(n){return[n.ctrl&&"mod",n.meta&&"meta",n.alt&&"alt",n.shift&&"shift",n.key].filter(Boolean).join("+")}function Yc(n,e){return xi(n)===xi(e)}var Ni="both",Wc=["both","topbar","menu"],Bn=null,Kn=null,xt=!1;function Bs(n){return Wc.includes(n)?n:Ni}function Ks(){var n;return typeof((n=Spicetify.Menu)==null?void 0:n.Item)=="function"}function $s(n){Bn=n.topbarButton,Kn=n.menuItem}function vt(n){let e=n!=="menu"||!Kn,t=n!=="topbar";if(Bn!=null&&Bn.element&&(Bn.element.style.display=e?"":"none"),!!Kn)try{t&&!xt?(Kn.register(),xt=!0):!t&&xt&&(Kn.deregister(),xt=!1)}catch(i){console.warn("[Syncify]","Failed to update profile menu item",i)}}var Nt="syncify:config",Ct={workerUrl:O().workerUrl,autoBackupEnabled:!1,shortcut:un,entryPoint:Ni};function me(){var t,i;let n=O(),e=(i=(t=Spicetify.LocalStorage)==null?void 0:t.get(Nt))!=null?i:window.localStorage.getItem(Nt);if(!e)return C(g({},Ct),{workerUrl:n.workerUrl});try{let o=JSON.parse(e);return{workerUrl:n.workerUrl,autoBackupEnabled:o.autoBackupEnabled===void 0?Ct.autoBackupEnabled:!!o.autoBackupEnabled,shortcut:o.shortcut===void 0?Ct.shortcut:Ls(o.shortcut),entryPoint:Bs(o.entryPoint)}}catch(o){return C(g({},Ct),{workerUrl:n.workerUrl})}}function It(n){var t;let e=JSON.stringify({workerUrl:O().workerUrl,autoBackupEnabled:n.autoBackupEnabled,shortcut:n.shortcut,entryPoint:n.entryPoint});if((t=Spicetify.LocalStorage)!=null&&t.set){Spicetify.LocalStorage.set(Nt,e);return}window.localStorage.setItem(Nt,e)}function $n(n){return typeof n.workerUrl=="string"&&n.workerUrl.length>0}var Rc=["username","canonicalUsername","id","uri","displayName"];async function be(){let{value:n,field:e}=await zc();return{hash:await ut(n),field:e}}async function zc(){var o;let n=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(n!=null&&n.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let e=await n.getUser(),t=Rc.find(a=>(e==null?void 0:e[a])!=null),i=t?e[t]:void 0;if(!t||!i)throw new Error("Unable to resolve the active Spotify user.");return{value:i,field:t}}async function Hn(n){if(!$n(n))throw new Error("Syncify backup service is not configured.");let[e,t]=await Promise.all([be(),Qo()]);if(t.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:i,unapproved:o}=await Do(n.workerUrl,e,t);return{payload:t,unchanged:i,unapproved:o}}async function yn(n,e){var c;if(!$n(n))throw new Error("Syncify backup service is not configured.");let t=await ai(n.workerUrl,await be(),e),[i,o,a]=await Promise.all([Promise.all(t.backups.map(Ei)),t.safetyCopy?Ei(t.safetyCopy):null,Promise.all(t.unapproved.map(Ei))]),s=i.filter((u,y)=>i.findIndex(f=>f.payload_hash===u.payload_hash)===y);return C(g({},t),{payload:(c=s[0])!=null?c:null,backups:s,safetyCopy:o&&!s.some(u=>u.payload_hash===o.payload_hash)?o:null,unapproved:a.filter(u=>!s.some(y=>y.payload_hash===u.payload_hash))})}var Ii=new Map;async function Ei(n){var a,s,c;let e=(s=(a=n.marketplace_data)==null?void 0:a.keys)!=null?s:{},t=n.spicetify_config?ui(n.spicetify_config,e):void 0,i=`${n.payload_hash} ${(c=n.metadata)==null?void 0:c.last_sync_datetime}`,o=Ii.get(i);return o||(o=mt(e,t),Ii.set(i,o),o.catch(()=>Ii.delete(i))),C(g(g({},n),t?{spicetify_config:t}:{}),{payload_hash:await o})}async function js(n){let e=await ai(Fn(n),await be());return{claim:e.claim,install:e.install}}async function Hs(n,e,t,i=[]){var c;let o=e!=null?e:(await yn(n)).payload;if(!o)throw new Error("No Syncify cloud backup was found for this Spotify account.");let a=await es(o,i),s=(c=o.backup)==null?void 0:c.id;return s&&$n(n)&&be().then(u=>Bo(n.workerUrl,u,s,t)).catch(()=>{}),{payload:o,restoredCount:a}}var jn=class extends Error{constructor(t){super("Couldn't back up your setup first, so nothing changed.");this.reason=t;this.name="SafetyBackupError"}};async function Fs(n,e,t,i,o){try{await Hn(n)}catch(s){throw new jn(s)}let a=await bs(e,t,i,o);return be().then(s=>Is(e.code,s)).catch(()=>{}),a}async function Ys(n){let e=await be(),t=await Ts(Fn(n),e);return C(g({},t),{hash:e.hash})}async function Ws(n){await Ps(Fn(n),await be())}async function Et(n,e,t){await Uo(Fn(n),await be(),e,t)}async function _t(n){await As(Fn(n),await be())}function Fn(n){if(!$n(n))throw new Error("Syncify backup service is not configured.");return n.workerUrl}var Tt="syncify:claim-check-day";async function zs(n){var t,i,o;let e=me();if(e.workerUrl){if(!e.autoBackupEnabled)return qc(n);try{let[a,s]=await Promise.all([gt(),yn(e)]);qs(s,n);let c=(i=(t=s.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?i:0;if(s.exists&&ns(a.keyCount,c)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((o=s.payload)==null?void 0:o.payload_hash)===a.hash||a.keyCount===0)return;let{unapproved:u}=await Hn(e);Spicetify.showNotification(u?"Syncify: backed up, waiting for approval":"Syncify auto-backup complete")}catch(a){if(a instanceof ke||a instanceof ze){Spicetify.showNotification("Syncify: sign in to keep backing up",!0,8e3);return}let s=a instanceof Error?a.message:String(a);console.warn("Syncify startup sync failed:",a),Spicetify.showNotification(`Syncify auto-sync skipped: ${s}`,!0,8e3)}}}async function qc(n){let e=new Date().toLocaleDateString("en-CA");if(Vc()!==e)try{let t=await js(me());Rs(e),qs(t,n)}catch(t){if(t instanceof ke){Rs(e);return}console.warn("Syncify claim check failed:",t)}}function qs(n,e){var o;let t=Gc(n.claim),i=(o=n.install)==null?void 0:o.waiting[0];t?e.onClaim(t):i&&e.onInstall(i)}function Gc(n){return(n==null?void 0:n.status)==="pending"&&!n.mine?n:null}function Vc(){var n,e;return(e=(n=Spicetify.LocalStorage)==null?void 0:n.get(Tt))!=null?e:window.localStorage.getItem(Tt)}function Rs(n){var e;(e=Spicetify.LocalStorage)!=null&&e.set?Spicetify.LocalStorage.set(Tt,n):window.localStorage.setItem(Tt,n)}var Ti="syncify:pending-restore",Jc=600*1e3,Xc=2e3,Zc=15e3,Qc="marketplace:theme-installed",el="raw.githubusercontent.com",nl=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],we=null,_i=new Set,Js=new Map;function Xs(){return we}function Zs(n){return _i.add(n),()=>_i.delete(n)}function Qs(){we&&oa(C(g({},we),{manual:[]}))}function At(n,e="restore"){try{localStorage.setItem(Ti,JSON.stringify({at:Date.now(),manual:n,kind:e}))}catch(t){}}function ea(){var n;At((n=we==null?void 0:we.manual)!=null?n:[],we==null?void 0:we.kind),window.location.reload()}function na(){sa()&&(document.addEventListener("load",n=>Gs(n.target,"load"),!0),document.addEventListener("error",n=>Gs(n.target,"error"),!0))}async function ta(){let n=sa();if(!n)return;try{localStorage.removeItem(Ti)}catch(s){}let e=Date.now(),t=await Vs();for(;t.loaded<t.total&&Date.now()-e<Zc;)await new Promise(s=>setTimeout(s,Xc)),t=await Vs();oa(C(g({kind:n.kind,at:Date.now()},t),{manual:n.manual}));let i=t.loaded===t.total&&n.manual.length===0,o=n.kind==="share"?"Setup applied":"Backup restored",a=n.kind==="share"?"loaded":"restored";Spicetify.showNotification(i?`Syncify: ${o}; ${t.total} ${t.total===1?"item":"items"}`:`Syncify: ${a} ${t.loaded} of ${t.total}. Open Syncify for details.`,!1,8e3)}function ia(n){let e=n.map(t=>t.type==="extension"?`spicetify config extensions ${Pt(t.name)}`:t.type==="custom_app"?`spicetify config custom_apps ${Pt(t.name)}`:`spicetify config current_theme ${Pt(t.name)}${t.scheme?` color_scheme ${Pt(t.scheme)}`:""}`);return e.length>0?[...e,"spicetify apply"]:[]}function Pt(n){return/^[\w.@+/-]+$/.test(n)?n:`"${n}"`}function oa(n){we=n;for(let e of _i)e(n)}function sa(){var n;try{let e=JSON.parse((n=localStorage.getItem(Ti))!=null?n:"null");return!e||Date.now()-e.at>Jc?null:{manual:Array.isArray(e.manual)?e.manual:[],kind:e.kind==="share"?"share":"restore"}}catch(e){return null}}function Gs(n,e){n instanceof HTMLScriptElement&&n.src&&Js.set(Yn(n.src),e)}async function Vs(){var i;let n=await pe(),e=(i=n[Qc])!=null?i:"",t=V(n).filter(o=>o.type==="extension"&&o.sources.length>0||o.type==="theme"&&e.includes(o.key)||o.type==="snippet");return{loaded:t.filter(tl).length,total:t.length}}function tl(n){var e,t;if(n.type==="snippet"){let i=document.querySelector("style.marketplaceSnippets");return((e=i==null?void 0:i.textContent)==null?void 0:e.includes(`/* ${n.name} - `))===!0}if(n.type==="theme"){let i=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((t=i==null?void 0:i.textContent)!=null&&t.trim())}return il(n.sources[0]).some(ol)}function il(n){let e;try{e=new URL(n)}catch(s){return[]}if(e.host!==el)return[Yn(e.href)];let[t,i,o,...a]=e.pathname.split("/").filter(Boolean);return!t||!i||!o||a.length===0?[]:nl.map(s=>Yn(`https://${s}/gh/${t}/${i}@${o}/${a.join("/")}`))}function ol(n){let e=Js.get(n);return e?e==="load":[...document.querySelectorAll("script[src]")].some(i=>Yn(i.src)===n)&&performance.getEntriesByType("resource").some(i=>Yn(i.name)===n)}function Yn(n){try{let e=new URL(n);return`${e.origin}${e.pathname}`}catch(e){return n}}function Pi(n){return`A new install${n.device?` on ${n.device}`:""} wants to back up this Spotify account.`}function aa(n){let e=Spicetify.React,t=e.useState,{install:i}=n,[o,a]=t(!1),[s,c]=t(null);async function u(y){a(!0),c(null);try{await Et(me(),i.id,y),Spicetify.showNotification(y==="approve"?"Syncify: install approved":"Syncify: install refused"),n.onDone(y)}catch(f){c(f instanceof Error?f.message:String(f)),a(!1)}}return e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-claim-notice"},Pi(i)," Approve it if it's yours."),s?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},s):null,e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:n.onClose,disabled:o},"Close"),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{u("reject")},disabled:o},"Not mine"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{u("approve")},disabled:o},"Approve")))}var sl="syncify:beta",ra=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function ca(){var n;return(n=window.SyncifyLoader)!=null?n:null}function al(){try{return window.localStorage.getItem(sl)==="true"}catch(n){return!1}}async function la(n){let e=al()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(e.map(i=>rl(`${n}/${i}`)))).reduce((i,o)=>o&&(!i||Mi(o,i)>0)?o:i,null)}function Ai(n){return typeof n=="string"&&ra.test(n)}function Mi(n,e){let[t,i]=[n,e].map(o=>{var y;let[,a,s,c,u]=(y=ra.exec(o))!=null?y:[];return[a,s,c,u!=null?u:1/0].map(Number)});for(let o=0;o<t.length;o+=1)if(t[o]!==i[o])return t[o]<i[o]?-1:1;return 0}async function rl(n,e=3e3){let t=typeof AbortController=="function"?new AbortController:null,i=setTimeout(()=>t==null?void 0:t.abort(),e);try{let o=await fetch(n,{signal:t==null?void 0:t.signal});if(!o.ok)return null;let a=await o.json();return Ai(a==null?void 0:a.version)?a.version:null}catch(o){return null}finally{clearTimeout(i)}}var Oi="syncify:share-code-count";function cl(){var e,t;let n=Number((t=(e=Spicetify.LocalStorage)==null?void 0:e.get(Oi))!=null?t:NaN);return Number.isInteger(n)&&n>=0?n:null}function ua(n){var e,t;n===null?(e=Spicetify.LocalStorage)==null||e.remove(Oi):(t=Spicetify.LocalStorage)==null||t.set(Oi,String(n))}var w=null;function Ui(n={}){var no,to,io,oo,so,ao,ro,co;let e=Spicetify.React,t=e.useEffect,i=e.useMemo,o=e.useState,a=e.useRef,[s,c]=o(()=>me()),[u,y]=o(()=>w!=null&&w.remote.exists?"success":"idle"),[f,p]=o(null),[h,b]=o(0),[N,x]=o([]),[k,P]=o([]),[M,J]=o(null),[ce,Y]=o(null),[j,le]=o(null),[K,ne]=o(()=>{var r;return(r=w==null?void 0:w.remote.payload)!=null?r:null}),[te,S]=o(()=>{var r;return(r=w==null?void 0:w.remote.backups)!=null?r:[]}),[I,ue]=o(()=>{var r;return(r=w==null?void 0:w.remote.safetyCopy)!=null?r:null}),[ie,W]=o(()=>{var r;return(r=w==null?void 0:w.remote.unapproved)!=null?r:[]}),[H,D]=o(()=>{var r;return(r=w==null?void 0:w.remote.install)!=null?r:null}),[X,Ge]=o(!1),[Ve,$]=o(()=>new Set),[_,R]=o(()=>{var r;return(r=w==null?void 0:w.remote.payload)!=null?r:null}),[Ee,_e]=o(w!==null),[Je,ye]=o(!1),[$e,L]=o(!1),[oe,pn]=o(null),[Z,se]=o(!1),[Xe,de]=o(null),[Ze,je]=o((no=n.section)!=null?no:null),[A,Te]=o(!1),[E,Qe]=o(()=>Xs()),[en,mn]=o(!1),[xe,Rn]=o(!1),[Pe,zn]=o(null),[nn,qn]=o(()=>cl()),[Q,Ae]=o(void 0),[U,Bt]=o(()=>{var r;return(r=w==null?void 0:w.lockedBy)!=null?r:null}),[He,Kt]=o(()=>{var r;return(r=w==null?void 0:w.remote.claim)!=null?r:null}),[ae,gn]=o(()=>{var r;return(r=w==null?void 0:w.claims)!=null?r:null}),[d,m]=o(!1),[z,fe]=o(null),[Gn,$i]=o(!1),[re,$t]=o(null),[F,jt]=o(null),ji=a(null),ve=i(()=>O(),[]),tn=i(()=>I?[...te,I]:te,[te,I]),Ht=re?[]:ie,Ft=re?(to=F==null?void 0:F.backups)!=null?to:[]:te,Hi=re?(io=F==null?void 0:F.safetyCopy)!=null?io:null:I,Fi=i(()=>{var r;return new Map([...tn,...ie,...(r=F==null?void 0:F.backups)!=null?r:[],...F!=null&&F.safetyCopy?[F.safetyCopy]:[]].map(l=>[l,V(l.marketplace_data.keys)]))},[tn,ie,F]),Vn=r=>{var l;return(l=Fi.get(r))!=null?l:V(r.marketplace_data.keys)},Ca=r=>Vn(r).map(l=>l.key),Na=r=>Vn(r).length,ee=i(()=>Je&&_?_n(Vn(_),_.spicetify_config,k,M):null,[Je,_,Fi,k,M]),Me=i(()=>ee?Ln(ee.items):null,[ee]),Jn=i(()=>new Map([...oe!=null?oe:[],...Me!=null?Me:[]]),[oe,Me]),Xn=((oo=_==null?void 0:_.backup)==null?void 0:oo.kind)==="quarantined",Yi=i(()=>{var r;return new Set(((r=ee==null?void 0:ee.items)!=null?r:[]).filter(l=>{var T;return l.change!=="removed"&&l.isNew&&(Xn||Ue(Jn.get(l.key))||((T=Jn.get(l.key))==null?void 0:T.kind)==="unchecked")}).map(l=>l.key))},[ee,Jn,Xn]),Ia=[...Yi].filter(r=>!Ve.has(r)),Wi=ee!==null&&oe===null,Yt=i(()=>Ks(),[]),Ri=i(()=>ca()!==null,[]),he=u==="loading",Zn=(f==null?void 0:f.kind)==="warning"||(f==null?void 0:f.kind)==="error"?f:null,zi=!!(K&&j&&K.payload_hash!==j),hn=!!(K&&j&&K.payload_hash===j),qi=!!(_&&j&&_.payload_hash===j),Qn=re!==null||A||!hn||tn.length<2,Ea=Qn?Ft:Ft.slice(0,1),et=(He==null?void 0:He.status)==="pending"&&!He.mine?He:null,Wt=yl(ae,U,et!==null),nt=(so=H==null?void 0:H.waiting[0])!=null?so:null,Gi=!H||H.trusted||U||Wt.kind==="secured"?null:H.refused?"This Spotify account refused backups from this install. Sign in to back up from it.":"This install isn't approved yet. Its backups are kept apart until you approve it from another install or sign in.",Rt=(Q?((ao=ae==null?void 0:ae.accounts)!=null?ao:[]).filter(r=>r.status==="final"):[]).map((r,l)=>({hash:r.hash,label:`Spotify account ${l+1}${r.device_info?` \xB7 from ${r.device_info}`:""}`})).filter(r=>r.hash!==(ae==null?void 0:ae.hash)),_a=!!(j&&h>0&&!tn.some(r=>r.payload_hash===j));t(()=>(G().catch(()=>null).then(r=>Ae(l=>l!=null?l:r)),Se({silent:!0}),Ma(),Zs(Qe)),[]),t(()=>{if(pn(null),!ee||!Me)return;[...Me.values()].some(Ue)&&L(!0);let r=!0;return On(ee.items,Me).then(l=>{r&&(pn(l),[...l.values()].some(Ue)&&L(!0))}),()=>{r=!1}},[ee,Me]),t(()=>{if(!Z)return;let r=l=>{var Ce;if(!((Ce=ji.current)!=null&&Ce.isConnected)){se(!1),de(null);return}l.preventDefault(),l.stopImmediatePropagation();let T=Os(l);if(T.kind!=="ignore"){if(T.kind==="cancel"){se(!1),de(null);return}if(T.kind==="error"){de(T.message);return}if(Ds(T.shortcut)){de(`${Un(T.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}se(!1),zt(T.shortcut)}};return window.addEventListener("keydown",r,!0),()=>window.removeEventListener("keydown",r,!0)},[Z,s]);async function Vi(){let r=await gt();return le(r.hash),b(r.installedItemCount),x(r.installedItems),P(r.items),J(r.spicetifyConfig),Y(r.marketplaceAvailable),r}async function Se(r){try{ye(!1),(!(r!=null&&r.silent)||!w)&&y("loading"),r!=null&&r.silent||p({kind:"info",text:"Checking your Syncify backup\u2026"}),await Vi();let l,T=null;try{l=await yn(s)}catch(Jt){if(!(Jt instanceof ke))throw Jt;l=Al,T=Jt.code}let Ce=await G().catch(()=>null),Ne=Ce?await Ys(s).catch(()=>null):null,q=Ce?await G().catch(()=>null):null;w={remote:l,lockedBy:T,claims:q?Ne:null},Ae(q),gn(q?Ne:null),Bt(T),T&&je("account"),Kt(l.claim),$t(null),jt(null),ne(l.payload),S(l.backups),ue(l.safetyCopy),W(l.unapproved),D(l.install),R(l.payload),_e(!0),y(l.exists?"success":"idle"),!(r!=null&&r.silent)&&!T&&p(l.exists&&l.payload?{kind:"success",text:`Backup found from ${dn(l.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(l){kn(l)}}async function Ji(){m(!0),fe(null);try{await Ws(s)}catch(r){r instanceof Ke&&["claim_pending","claimed"].includes(r.code)||fe(r instanceof Error?r.message:String(r))}finally{await Se({silent:!0}),m(!1)}}function Ta(r){Ae(r),!U&&K?Ji():Se({silent:!0})}function Xi(){ua(null),qn(null),Ae(null),gn(null),fe(null),Se({silent:!0})}async function Pa(){$i(!0);try{await _t(s),Spicetify.showNotification("Syncify: claim sent for review"),await Se({silent:!0})}catch(r){p({kind:"error",text:r instanceof Error?r.message:String(r)})}finally{$i(!1)}}async function Aa(r){if(ye(!1),$t(r),jt(null),!r){R(K);return}R(null);try{let l=await yn(s,r);jt(l),R(l.payload)}catch(l){$t(null),R(K),kn(l)}}async function Ma(){let r=ve.version;if(!Ai(r))return;let l=await la(ve.releasesUrl);l&&Mi(l,r)>0&&zn(l)}function La(r){let l=C(g({},s),{autoBackupEnabled:r});c(l),It(l),p({kind:"success",text:r?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}function zt(r){let l=C(g({},s),{shortcut:r});c(l),It(l),Ci(r),de(null),p({kind:"success",text:r?`${Un(r)} now opens Syncify.`:"Keyboard shortcut turned off."})}function Oa(r){let l=C(g({},s),{entryPoint:r});c(l),It(l),vt(r)}function Sn(r){je(r),r!=="settings"&&se(!1)}function Da(){de(null),se(!0)}async function Ua(){var r;try{ye(!1),y("loading"),p({kind:"info",text:"Backing up your extensions and themes\u2026"});let{payload:l,unchanged:T,unapproved:Ce}=await Hn(s);if(await Vi(),Ce){await Se({silent:!0}),p({kind:"warning",text:"Backed up, but kept apart until this install is approved."}),Spicetify.showNotification("Syncify: backed up, waiting for approval");return}if(T){_e(!0),y("success"),p({kind:"success",text:"Everything is already backed up."}),Spicetify.showNotification("Syncify: everything is already backed up");return}let Ne=[l,...te.filter(q=>q.payload_hash!==l.payload_hash)].slice(0,Pl);w&&(w=C(g({},w),{remote:C(g({},w.remote),{exists:!0,payload:l,backups:Ne,safetyCopy:((r=w.remote.safetyCopy)==null?void 0:r.payload_hash)===l.payload_hash?null:w.remote.safetyCopy})})),ne(l),S(Ne),ue(q=>(q==null?void 0:q.payload_hash)===l.payload_hash?null:q),R(l),_e(!0),y("success"),p({kind:"success",text:`Backed up ${l.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(l){kn(l)}}async function Zi(r){if(nt){Ge(!0);try{await Et(s,nt.id,r),Spicetify.showNotification(r==="approve"?"Syncify: install approved":"Syncify: install refused"),await Se({silent:!0})}catch(l){kn(l)}finally{Ge(!1)}}}function Ba(r=_){if(ce===!1){let l="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";p({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3);return}if(!r){let l="No Syncify cloud backup was found for this Spotify account.";p({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3);return}R(r),L(!1),$(new Set),ye(!0)}async function Ka(){let r=_?_n(Vn(_),_.spicetify_config,k,M).manual:[];try{ye(!1),y("loading"),p({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:l,restoredCount:T}=await Hs(s,_!=null?_:void 0,re!=null?re:void 0,Ia);R(l),y("success"),p({kind:"success",text:`Restored ${T} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),At(r),setTimeout(()=>window.location.reload(),1e3)}catch(l){kn(l)}}async function $a(r){await Sa(r)&&(mn(!0),setTimeout(()=>mn(!1),2e3))}function Fe(r){if(r.startsWith("mailto:")){window.location.href=r;return}window.open(r,"_blank","noopener,noreferrer")}function kn(r){if(y("error"),r instanceof Nn){Rn(!0),p(null);return}if(r instanceof ze){p({kind:"error",text:r.message}),Se({silent:!0});return}if(r instanceof ke&&r.code!=="not_linked"){p(null),Se({silent:!0});return}let l=r instanceof Error?r.message:String(r);p({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3)}function qt(r,l){let T=(_==null?void 0:_.payload_hash)===r.payload_hash,Ce=r.payload_hash===j,Ne=dn(r.metadata.last_sync_datetime),q=pa(Na(r));return e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":T,"data-selected":T?"true":"false",type:"button",key:`${r.payload_hash}-${r.metadata.last_sync_datetime}`,title:l!=null&&l.isSafetyCopy?"Kept aside and updated about once a week, so a burst of new backups can't replace it":l!=null&&l.isUnapproved?"From an install this Spotify account hasn't approved":void 0,onClick:()=>{R(r),ye(!1)},disabled:he},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),l!=null&&l.isSafetyCopy?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Safety copy"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 updated weekly")),e.createElement("span",{className:"syncify-muted"},Ne," \xB7 ",q)):l!=null&&l.isUnapproved?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Not approved"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 ",Ne)),e.createElement("span",{className:"syncify-muted"},q," \xB7 from ",r.metadata.device_info)):e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-backup-date"},Ne),e.createElement("span",{className:"syncify-muted"},q," \xB7 from ",r.metadata.device_info)),Ce?e.createElement("span",{className:"syncify-tag",title:"What's on this device now"},"Current"):null,l!=null&&l.isSafetyCopy?e.createElement(vl,null):null,l!=null&&l.isUnapproved?e.createElement(Ki,null):null)}function Gt(r){r.stopPropagation()}let ja=xe?"Update Syncify to keep backing up":U?"Sign in to restore":Ee?K?zi?"Changes since your last backup":"Everything is backed up":"No backup yet":u==="error"?"Couldn't check your backup":"Checking your backup\u2026",Qi=xe?"Your backups are safe":U?U==="not_owner"?"Secured by another account":"This backup is secured":Ee?K?zi?Ll(K,Ca(K),N,M):`Last backup ${dn(K.metadata.last_sync_datetime)}`:"Save your extensions and themes so you can restore them after a reinstall or on another computer.":null,eo=!!(E&&!xe&&Date.now()-E.at<Tl),bn=!!(E&&E.loaded===E.total),Vt=ia((ro=E==null?void 0:E.manual)!=null?ro:[]);return e.createElement("div",{className:"syncify-panel",ref:ji,onClick:Gt,onMouseDown:Gt,onPointerDown:Gt},xe?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,"This version of Syncify is no longer supported."),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Fe(`${ve.githubUrl}#updating`)},"How to update")):null,et?e.createElement("div",{className:"syncify-alert",role:"alert"},e.createElement("span",null,(co=et.email)!=null?co:"Someone"," is claiming this backup.",Q===null?" If that's you, sign in to finish.":et.held?" Syncify is reviewing it.":null),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Pa()},disabled:Gn},"Not me"),Q===null?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Sn("account")},"That's me, sign in"):null)):null,nt?e.createElement("div",{className:"syncify-alert",role:"alert"},e.createElement("span",null,Pi(nt)),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Zi("reject")},disabled:X},"Not mine"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Zi("approve")},disabled:X},"Approve"))):null,Gi?e.createElement("div",{className:"syncify-alert",role:"status"},e.createElement("span",null,Gi)):null,Vt.length>0?e.createElement("div",{className:"syncify-alert syncify-manual",role:"status"},e.createElement("span",{className:"syncify-manual-header"},e.createElement("span",null,E.manual.length===1?"1 isn't from Marketplace. Add it in a terminal:":`${E.manual.length} aren't from Marketplace. Add them in a terminal:`),e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:Qs},e.createElement(Di,null))),e.createElement("span",{className:"syncify-code"},e.createElement("code",null,Vt.join(`
`)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{$a(Vt.join(`
`))}},en?"Copied":"Copy"))):null,Zn?e.createElement("div",{className:"syncify-alert","data-kind":Zn.kind},e.createElement("span",null,Zn.text),e.createElement("span",{className:"syncify-alert-actions"},Zn.kind==="error"?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Se()},disabled:he},"Try again"):null,e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>p(null)},e.createElement(Di,null)))):null,e.createElement("section",{className:"syncify-status","aria-live":"polite"},eo&&E?e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},E.kind==="share"?bn?"Setup loaded":`Loaded ${E.loaded} of ${E.total}`:bn?"Backup restored":`Restored ${E.loaded} of ${E.total}`),e.createElement("p",{className:"syncify-muted"},bn?E.total===0?"Nothing from Marketplace to load":`${E.loaded} of ${E.total} loaded`:"Missing something? Reload Spotify once more."),bn&&E.kind==="restore"?e.createElement("p",{className:"syncify-muted"},"Syncify saved your setup?"," ",e.createElement("button",{className:"syncify-text-button syncify-inline-button",type:"button",onClick:()=>Fe(ve.kofiUrl)},"Support it on Ko-fi")):null):e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},ja),e.createElement("p",{className:"syncify-muted"},Qi?`${Qi} \xB7 `:"",pa(h)," on this device")),eo&&!bn?e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:ea},"Reload"):e.createElement("button",{className:"syncify-button",type:"button",onClick:Ua,disabled:he||hn||xe||U!==null,title:U?"Sign in to back up":hn?"No changes since your last backup":void 0},he?"Working\u2026":hn?"Backed up":"Back up now")),!Ee||U||te.length>0||ie.length>0||Rt.length>0?e.createElement("section",{className:"syncify-section","aria-label":"Backups"},e.createElement("div",{className:"syncify-section-header"},e.createElement("h4",{className:"syncify-section-title"},"Backups"),e.createElement("span",{className:"syncify-section-controls"},!re&&hn&&tn.length>1?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":A,"aria-controls":"syncify-backup-list",onClick:()=>{Te(!A),ye(!1)}},A?"Show less":`Show all ${tn.length}`,e.createElement(fn,null)):null,!U&&Rt.length>0?e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select","aria-label":"Show backups from",value:re!=null?re:"",onChange:r=>{Aa(r.currentTarget.value||null)},disabled:he},e.createElement("option",{value:""},"This Spotify account"),Rt.map(r=>e.createElement("option",{key:r.hash,value:r.hash},r.label))),e.createElement(fn,null)):null)),Ee?U?e.createElement("p",{className:"syncify-locked"},e.createElement(El,null),e.createElement("span",null,U==="not_owner"?"Sign in with the account that secured them":"Sign in to see and restore your backups")):re&&!F?e.createElement("p",{className:"syncify-muted"},"Loading backups\u2026"):Ft.length===0&&Ht.length===0?e.createElement("p",{className:"syncify-muted"},"No backups yet."):e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-list",id:"syncify-backup-list",role:"radiogroup","aria-label":"Choose a backup to restore"},Ea.map(r=>qt(r)),Qn&&Hi?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),qt(Hi,{isSafetyCopy:!0})):null,Qn&&Ht.length>0?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),Ht.map(r=>qt(r,{isUnapproved:!0}))):null),Qn?ce===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to restore a backup."):Je?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},"Restore"," ",_?dn(_.metadata.last_sync_datetime):"this backup","?"),Xn?e.createElement("div",{className:"syncify-alert"},"An install this Spotify account hasn't approved made this backup. Its items stay off unless you turn them on."):null,ee?e.createElement(ga,{preview:ee,checks:Jn,off:Yi,allowed:Ve,unapproved:Xn,onAllow:(r,l)=>{let T=new Set(Ve);l?T.add(r):T.delete(r),$(T)},expanded:$e,onToggle:()=>L(!$e)}):null,e.createElement("div",{className:"syncify-actions"},_a?e.createElement("div",{className:"syncify-alert syncify-actions-hint"},"Your current setup isn't backed up."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>ye(!1),disabled:he},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:Ka,disabled:he||Wi},Wi?"Checking\u2026":"Restore"))):e.createElement("div",{className:"syncify-actions"},qi?e.createElement("span",{className:"syncify-muted syncify-actions-hint"},"This backup is already current."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>Ba(),disabled:he||!_||qi},"Restore backup")):null):e.createElement("div",{className:"syncify-backup-skeleton","aria-hidden":"true"},e.createElement("span",{className:"syncify-radio"}),e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-skeleton-line"}),e.createElement("span",{className:"syncify-skeleton-line wide"})))):null,e.createElement("div",{className:"syncify-accordion"},e.createElement(Li,{id:"share",title:"Share",openSection:Ze,onToggle:Sn,status:Q&&nn?{kind:"count",label:`${nn} ${nn===1?"code":"codes"}`,text:String(nn)}:null},e.createElement(pl,{config:s,session:Q,localItems:k,localConfig:M,marketplaceAvailable:ce,busy:he,onSignIn:()=>Sn("account"),onSignedOut:Xi,onCodeCount:r=>{ua(r),qn(r)}})),e.createElement(Li,{id:"account",title:"Account",openSection:Ze,onToggle:Sn,status:Cl(Q,U,Wt)},e.createElement(dl,{session:Q,locked:U,secure:Wt,securing:d,secureError:z,onSecure:()=>{Ji()},onSignedIn:Ta,onSignedOut:Xi,onOpenWebsite:Fe})),e.createElement(Li,{id:"settings",title:"Settings",openSection:Ze,onToggle:Sn,status:Pe?{kind:"dot",label:`Syncify ${Pe} is out`}:null},e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Back up automatically"),e.createElement("span",{className:"syncify-muted"},"When Spotify starts and something has changed")),e.createElement("input",{className:"syncify-switch",type:"checkbox",role:"switch",checked:s.autoBackupEnabled&&!xe,onChange:r=>La(r.currentTarget.checked),disabled:he||xe})),e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Open Syncify from"),Yt?s.entryPoint==="menu"&&!s.shortcut?e.createElement("span",{className:"syncify-muted"},"Keep a shortcut in case a Spotify update breaks the menu"):null:e.createElement("span",{className:"syncify-muted"},"The profile menu isn't available in this Spicetify version")),e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select",value:Yt?s.entryPoint:"topbar",onChange:r=>Oa(r.currentTarget.value),disabled:!Yt},Ml.map(r=>e.createElement("option",{key:r.value,value:r.value},r.label))),e.createElement(fn,null))),e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Keyboard shortcut"),Z&&!Xe?e.createElement("span",{className:"syncify-muted"},"Press a key combination, or Esc to cancel"):null),e.createElement("span",{className:"syncify-shortcut"},s.shortcut&&!Z?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>zt(null)},"Turn off"):null,!s.shortcut&&!Z?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>zt(un)},"Use default"):null,e.createElement("button",{className:"syncify-key",type:"button","data-recording":Z?"true":"false",onClick:()=>Z?se(!1):Da(),title:"Click to change"},Z?"Press keys\u2026":s.shortcut?Un(s.shortcut):"Off"))),Xe?e.createElement("div",{className:"syncify-alert",role:"alert"},Xe):null)),e.createElement("footer",{className:"syncify-footer"},e.createElement("span",{className:"syncify-footer-version"},e.createElement("span",null,"Syncify ",ve.version),Pe?e.createElement("button",{className:"syncify-text-button syncify-update",type:"button",onClick:()=>Ri?window.location.reload():Fe(`${ve.githubUrl}#updating`)},Pe," is out \xB7 ",Ri?"Reload":"How to update"):null),e.createElement("span",{className:"syncify-footer-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Fe(ve.issueUrl)},"Report an issue"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Fe(ve.githubUrl)},"GitHub"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Fe(ve.kofiUrl)},"Support on Ko-fi"))))}var ya={added:{mark:"+",label:"Added"},removed:{mark:"\u2212",label:"Removed"},unchanged:{mark:"=",label:"Unchanged"}},ma=[["extension","Extensions"],["theme","Themes"],["snippet","Snippets"]],ll={extension:"extension",custom_app:"custom app",theme:"theme"};function ga(n){let e=Spicetify.React,{items:t,counts:i,manual:o}=n.preview,a=[...n.off].filter(s=>!n.allowed.has(s)).length;return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-chips","aria-label":"What changes on this device"},i.added?e.createElement("span",{className:"syncify-chip","data-change":"added"},"+",i.added," added"):null,i.removed?e.createElement("span",{className:"syncify-chip","data-change":"removed"},"\u2212",i.removed," removed"):null,i.unchanged?e.createElement("span",{className:"syncify-chip"},i.unchanged," unchanged"):null,o.length?e.createElement("span",{className:"syncify-chip"},o.length," to add manually"):null,a?e.createElement("span",{className:"syncify-chip","data-change":"off"},a," off"):null),t.length||o.length?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":n.expanded,"aria-controls":"syncify-restore-changes",onClick:n.onToggle},n.expanded?"Hide changes":"Show changes",e.createElement(fn,null)):null,n.expanded?e.createElement("div",{className:"syncify-changes",id:"syncify-restore-changes"},ma.map(([s,c])=>{let u=t.filter(y=>y.type===s);return u.length===0?null:e.createElement("section",{key:s,"aria-label":c},e.createElement("h5",{className:"syncify-change-group"},c),e.createElement("ul",{className:"syncify-change-list"},u.map(y=>{var f,p;return e.createElement("li",{className:"syncify-change",key:y.key},e.createElement("span",{className:"syncify-mark","data-change":y.change,role:"img","aria-label":ya[y.change].label},ya[y.change].mark),e.createElement("span",{className:"syncify-change-name"},y.name,y.repo?e.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",y.repo):null),n.checks.has(y.key)?e.createElement(ha,{check:n.checks.get(y.key)}):n.unapproved&&n.off.has(y.key)?e.createElement("span",{className:"syncify-source","data-warning":"true"},e.createElement(Ki,null),"Not approved"):null,n.off.has(y.key)&&!((f=n.fixed)!=null&&f.has(y.key))?e.createElement("label",{className:"syncify-item-switch"},e.createElement("input",{type:"checkbox",checked:n.allowed.has(y.key),onChange:h=>n.onAllow(y.key,h.currentTarget.checked)}),(p=n.switchLabel)!=null?p:"Restore"):null)})))}),o.length?e.createElement("section",{"aria-label":"Add manually"},e.createElement("h5",{className:"syncify-change-group"},"Add manually"),e.createElement("ul",{className:"syncify-change-list"},o.map(s=>e.createElement("li",{className:"syncify-change",key:`${s.type}:${s.name}`},e.createElement("span",{className:"syncify-mark","aria-hidden":"true"}),e.createElement("span",{className:"syncify-change-name"},s.name,e.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",ll[s.type],s.scheme?`, ${s.scheme}`:"")))))):null):null)}var ul={host:"Loads from outside GitHub",repo:"Its code is in a different repo than the one it names",blocked:"On Marketplace's block list",catalog:"Not in Marketplace's catalog",unchecked:"GitHub couldn't be reached to check it",custom:"A snippet made in Marketplace, not from its list"};function ha(n){let e=Spicetify.React,{check:t}=n,i=Ue(t),o=t.kind==="host"?`Code from ${t.host}`:t.kind==="repo"?`Code from ${t.repo}`:t.kind==="blocked"?"Blocked by Marketplace":t.kind==="catalog"?"Not in Marketplace":t.kind==="unchecked"?"Not checked":"Custom";return e.createElement("span",{className:"syncify-source","data-warning":i?"true":"false",title:ul[t.kind]},i?e.createElement(Ki,null):null,o)}function yl(n,e,t){var s,c;if(e==="not_owner")return{kind:"other-account"};if(!n)return t?{kind:"other-claim"}:{kind:"unknown"};let{claim:i}=n;if((i==null?void 0:i.status)==="final"){if(!i.mine)return{kind:"other-account"};let u=((s=n.accounts)!=null?s:[]).filter(y=>y.status==="final").length;return{kind:"secured",linkedCount:Math.max(u,1)}}if((i==null?void 0:i.status)==="pending")return i.mine?{kind:"pending",finalAt:i.final_at,held:i.held,waiting:i.waiting===!0}:{kind:"other-claim"};let o=((c=n.accounts)!=null?c:[]).filter(u=>u.hash===n.hash),a=o[o.length-1];return(a==null?void 0:a.status)==="cancelled"&&a.cancelled_by==="owner"?{kind:"cancelled"}:{kind:"open"}}function dl(n){let e=Spicetify.React,t=e.useEffect,i=e.useState,{session:o,secure:a}=n,[s,c]=i(()=>ct()),[u,y]=i(()=>ct().email),[f,p]=i(""),[h,b]=i(!1),[N,x]=i(null),[k,P]=i(()=>Date.now()),M=!!(s.codeSentAt&&k-s.codeSentAt<kl),J=Math.max(0,Math.ceil((s.retryAt-k)/1e3)),ce=s.retryEmail===null||s.retryEmail===u.trim().toLowerCase()?J:0;t(()=>{if(!o)return;let S=!0;return To().then(I=>{!S||I||(x({kind:"warning",text:Re(new v("signed_out"))}),n.onSignedOut())}).catch(()=>{}),()=>{S=!1}},[o==null?void 0:o.token]),t(()=>{if(s.retryAt<=Date.now())return;let S=setInterval(()=>{P(Date.now()),s.retryAt<=Date.now()&&clearInterval(S)},1e3);return()=>clearInterval(S)},[s.retryAt]);function Y(S){let I=g(g({},ct()),S);vo(I),c(I),P(Date.now())}async function j(S){var ue;let I=S.trim();if(!wl.test(I)){x({kind:"error",text:"Enter a valid email address."});return}b(!0),x(null);try{let ie=await Eo(I);Y({email:I,codeSentAt:Date.now(),retryAt:Date.now()+ie*1e3,retryEmail:I.toLowerCase()}),p("")}catch(ie){let W=ie instanceof v?ie:null,H=(ue=W==null?void 0:W.retryAfter)!=null?ue:null,D=H&&H<=bl?Date.now()+H*1e3:0,X=(W==null?void 0:W.code)==="too_many_requests"?null:I.toLowerCase();if((W==null?void 0:W.code)==="resend_wait"){Y({email:I,codeSentAt:s.email===I&&s.codeSentAt?s.codeSentAt:Date.now(),retryAt:D,retryEmail:X});return}D&&Y({retryAt:D,retryEmail:X}),x({kind:"error",text:Re(ie)})}finally{b(!1)}}async function le(){b(!0),x(null);try{let S=await _o(s.email,f);Y({codeSentAt:null}),p(""),n.onSignedIn(S)}catch(S){x({kind:"error",text:Re(S)});let I=S instanceof v?S.code:null;(I==="too_many_attempts"||I==="code_expired")&&p("")}finally{b(!1)}}async function K(){var I;let S=(I=o==null?void 0:o.email)!=null?I:"";b(!0),x(null),await Po(),Y({email:S,codeSentAt:null}),y(S),b(!1),n.onSignedOut()}async function ne(){b(!0),x(null);try{n.onOpenWebsite(await Ao())}catch(S){let I=S instanceof v&&S.code==="signed_out";x({kind:I?"warning":"error",text:Re(S)}),I&&n.onSignedOut()}finally{b(!1)}}let te=N?e.createElement("div",{className:"syncify-alert","data-kind":N.kind==="error"?"error":void 0,role:"alert"},N.text):null;if(o===void 0)return null;if(o){let S=a.kind==="open"||a.kind==="other-claim"||a.kind==="cancelled";return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",{className:"syncify-account-email"},o.email),a.kind==="secured"?e.createElement("span",{className:"syncify-muted"},"Backup secured \xB7"," ",a.linkedCount===1?"1 Spotify account linked":`${a.linkedCount} Spotify accounts linked`):a.kind==="pending"?e.createElement("span",{className:"syncify-muted syncify-account-state"},e.createElement(ka,null),e.createElement("span",null,"Securing this backup \xB7"," ",a.waiting?"waiting on sign-in":a.held?"in review":`final ${Bi(a.finalAt)}`)):a.kind==="other-account"?e.createElement("span",{className:"syncify-muted"},"This backup is secured by another account"):e.createElement("span",{className:"syncify-muted"},"Signed in")),e.createElement("span",{className:"syncify-account-actions"},e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-label":"Manage on the website",onClick:()=>{ne()},disabled:h},"Manage",e.createElement(_l,null)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{K()},disabled:h},"Sign out"))),S?e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it")),e.createElement("button",{className:"syncify-button",type:"button",onClick:n.onSecure,disabled:h||n.securing||a.kind==="other-claim"},n.securing?"Securing\u2026":a.kind==="cancelled"?"Secure again":"Secure")):null,a.kind==="other-claim"?e.createElement("div",{className:"syncify-alert",role:"status"},"Another claim is pending. If it isn't yours, press Not me above and Syncify will review it."):a.kind==="cancelled"?e.createElement("div",{className:"syncify-alert",role:"status"},"Your claim was cancelled from this Spotify account."):a.kind==="pending"&&a.waiting?e.createElement("div",{className:"syncify-alert",role:"status"},"Syncify ran on this Spotify account without you signed in, maybe after a Spotify update or on another computer. Sign in to Syncify there to finish linking."):null,n.secureError?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},n.secureError):null,te)}return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting"},n.locked?e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Sign in to restore"),e.createElement("span",{className:"syncify-muted"},"With the email that secured this backup")):e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it"))),e.createElement("form",{className:"syncify-confirm",noValidate:!0,onSubmit:S=>{S.preventDefault(),!h&&(M?f.length===Mt&&le():ce||j(u))}},M?e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-muted"},"Code sent to ",xl(s.email)),e.createElement("div",{className:"syncify-field"},e.createElement("input",{className:"syncify-input syncify-code-input",type:"text",inputMode:"numeric",autoComplete:"one-time-code","aria-label":"6-digit code",placeholder:"123456",maxLength:Mt,value:f,onChange:S=>p(S.currentTarget.value.replace(/\D/g,"").slice(0,Mt)),autoFocus:!0}),e.createElement("button",{className:"syncify-button",type:"submit",disabled:h||f.length!==Mt},h?"Verifying\u2026":"Verify")),e.createElement("p",{className:"syncify-muted syncify-account-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{j(s.email)},disabled:h||J>0},J>0?`Resend in ${fa(J)}`:"Resend code"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Y({codeSentAt:null}),p(""),x(null)},disabled:h},"Use another email"))):e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-field"},e.createElement("input",{className:"syncify-input",type:"email",autoComplete:"email","aria-label":"Email",placeholder:"you@example.com",value:u,onChange:S=>y(S.currentTarget.value),autoFocus:!0}),e.createElement("button",{className:"syncify-button",type:"submit",disabled:h||ce>0||!u.trim()},h?"Sending\u2026":"Send code")),e.createElement("p",{className:"syncify-muted"},ce>0?`Send another code in ${fa(ce)}`:"We only email sign-in codes.")),te))}var fl=[["add","Add to my setup"],["replace","Replace my setup"]];function pl(n){var gn;let e=Spicetify.React,t=e.useEffect,i=e.useMemo,o=e.useRef,a=e.useState,{session:s}=n,[c,u]=a(""),[y,f]=a(!1),[p,h]=a(null),[b,N]=a(null),[x,k]=a("add"),[P,M]=a(!1),[J,ce]=a(()=>new Set),[Y,j]=a(null),[le,K]=a(void 0),[ne,te]=a(!1),[S,I]=a(null),[ue,ie]=a(null),[W,H]=a(null),[D,X]=a(null),[Ge,Ve]=a(""),[$,_]=a(null),[R,Ee]=a(!1),[_e,Je]=a(!1),[ye,$e]=a(null),[L,oe]=a(null),[pn,Z]=a(null),[se,Xe]=a(!1),[de,Ze]=a(null),je=o(0),A=i(()=>b?Ss(b.file,b.items,n.localItems,n.localConfig,x):null,[b,n.localItems,n.localConfig,x]),Te=i(()=>{if(!A||!b)return null;let d=new Set(b.items.map(m=>m.key));return A.items.filter(m=>m.change!=="removed"&&d.has(m.key)&&(x==="replace"||m.isNew))},[A,b,x]),E=i(()=>Te?Ln(Te):null,[Te]),Qe=i(()=>new Map([...Y!=null?Y:[],...E!=null?E:[]]),[Y,E]),en=i(()=>A&&le!==void 0?ks(A,le):new Set,[A,le]),mn=i(()=>{var d;return new Set([...((d=A==null?void 0:A.items)!=null?d:[]).filter(m=>{var z;return m.change!=="removed"&&m.isNew&&(Ue(Qe.get(m.key))||((z=Qe.get(m.key))==null?void 0:z.kind)==="unchecked")}).map(m=>m.key),...en])},[A,Qe,en]),xe=[...mn].filter(d=>en.has(d)||!J.has(d)),Rn=A!==null&&(Y===null||le===void 0),Pe=$?$.items.filter(d=>!$.leftOut.has(d.key)):[],zn=!!(S&&ue!==null&&S.length>=ue);t(()=>{if(j(null),!Te||!E)return;[...E.values()].some(Ue)&&M(!0);let d=!0;return On(Te,E).then(m=>{d&&(j(m),[...m.values()].some(Ue)&&M(!0))}),()=>{d=!1}},[Te,E]),t(()=>{I(null),X(null),oe(null),s&&Q()},[s==null?void 0:s.token]);async function nn(){let d=ps(c);if(h(null),N(null),!d){h(bt(new v("no_code")));return}f(!0);try{let m=await Ns(d);k("add"),ce(new Set),M(!1),N({file:m,items:V(m.keys)}),hi().then(K)}catch(m){h(bt(m))}finally{f(!1)}}async function qn(){if(!(!b||!A)){te(!0),h(null);try{await Fs(n.config,b.file,x,xe,le!=null?le:null),Spicetify.showNotification("Syncify: setup loaded. Reloading\u2026"),At(A.manual,"share"),setTimeout(()=>window.location.reload(),1e3)}catch(d){te(!1),h(d instanceof jn?`${d.message} ${gl(d.reason)}`:d instanceof Error?d.message:String(d))}}}async function Q(){H(null);try{let d=await ws();I(d.codes),n.onCodeCount(d.codes.length),ie(d.max)}catch(d){Ae(d,H)}}function Ae(d,m){m(bt(d,ue)),d instanceof v&&d.code==="signed_out"&&n.onSignedOut()}async function U(d){var z;let m=++je.current;X({code:d}),Ve((z=d==null?void 0:d.name)!=null?z:""),_(null),Ee(!1),$e(null),oe(null),Z(null);try{let fe=await pe(),Gn=await gs(V(fe),fe);if(m!==je.current)return;_(g({keys:fe},Gn)),Gn.leftOut.size>0&&Ee(!0)}catch(fe){if(m!==je.current)return;X(null),$e(fe instanceof Error?fe.message:String(fe))}}function Bt(){je.current+=1,X(null),_(null)}async function He(){if(!D||!$)return;Je(!0),$e(null);let d=hs($.keys,Pe);try{let m=D.code?await vs(D.code.code,Ge.trim(),d):await xs(Ge.trim(),d);oe(C(g({},m),{outcome:D.code?"updated":"created"})),X(null),_(null),await Q()}catch(m){if(m instanceof v&&m.code==="same_setup"&&m.share){oe(C(g({},m.share),{leftOut:0,outcome:"existing"})),X(null),_(null);return}Ae(m,$e),m instanceof v&&m.code==="publish_failed"&&(X(null),Q())}finally{Je(!1)}}async function Kt(d){Xe(!0),H(null);try{await Cs(d),Z(null),(L==null?void 0:L.code)===d&&oe(null),await Q()}catch(m){Ae(m,H)}finally{Xe(!1)}}async function ae(d,m){await Sa(d)&&(Ze(m),setTimeout(()=>Ze(z=>z===m?null:z),2e3))}return e.createElement(e.Fragment,null,e.createElement("form",{className:"syncify-field syncify-share-load",noValidate:!0,onSubmit:d=>{d.preventDefault(),!y&&!ne&&c.trim()&&nn()}},e.createElement("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-input"},"Load a setup"),e.createElement("input",{className:"syncify-input syncify-share-input",id:"syncify-share-input",type:"text",placeholder:"Paste a code or a link",autoComplete:"off",spellCheck:!1,value:c,onChange:d=>u(d.currentTarget.value),disabled:ne}),e.createElement("button",{className:"syncify-button secondary",type:"submit",disabled:y||ne||!c.trim()},y?"Loading\u2026":"Preview")),p?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},p):null,b&&A?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},"Load ",(gn=b.file.name)!=null?gn:Be(b.file.code),"?"),e.createElement("div",{className:"syncify-share-modes",role:"radiogroup","aria-label":"How to load it"},fl.map(([d,m])=>e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":x===d,"data-selected":x===d?"true":"false",type:"button",key:d,onClick:()=>k(d),disabled:ne},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,m))))),e.createElement(ga,{preview:A,checks:Qe,off:mn,fixed:en,switchLabel:"Load",allowed:J,unapproved:!1,onAllow:(d,m)=>{let z=new Set(J);m?z.add(d):z.delete(d),ce(z)},expanded:P,onToggle:()=>M(!P)}),n.marketplaceAvailable===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to load a setup."):e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>N(null),disabled:ne},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{qn()},disabled:ne||Rn||n.busy},ne?"Applying\u2026":Rn?"Checking\u2026":"Apply"))):null,s===void 0?null:s?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting syncify-share-part"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Share this setup"),e.createElement("span",{className:"syncify-muted"},S&&S.length>0&&ue!==null?hl(ue-S.length):"Get a code anyone can load")),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{U(null)},disabled:D!==null||S===null||zn||n.marketplaceAvailable===!1,title:zn?"Delete a code to make another":void 0},"Share")),D?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},D.code?`Update ${Be(D.code.code)} with this setup?`:"Share this setup?"),$?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-chips","aria-label":"What goes in"},e.createElement("span",{className:"syncify-chip"},Pe.length," going in"),$.leftOut.size?e.createElement("span",{className:"syncify-chip","data-change":"off"},$.leftOut.size," left out"):null),$.items.length?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":R,"aria-controls":"syncify-share-items",onClick:()=>Ee(!R)},R?"Hide items":"Show items",e.createElement(fn,null)):null,R?e.createElement(ml,{items:$.items,leftOut:$.leftOut}):null,e.createElement("input",{className:"syncify-input",type:"text","aria-label":"Name",placeholder:"Name (optional)",maxLength:ys,value:Ge,onChange:d=>Ve(d.currentTarget.value),disabled:_e})):e.createElement("p",{className:"syncify-muted"},"Checking your items\u2026"),e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:Bt,disabled:_e},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{He()},disabled:!$||Pe.length===0||_e},$?_e?D.code?"Updating\u2026":"Creating\u2026":D.code?"Update":"Create code":"Checking\u2026"))):null,ye?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},ye):null,L?e.createElement("div",{className:"syncify-confirm"},e.createElement("span",{className:"syncify-manual-header"},e.createElement("span",{className:"syncify-confirm-title"},L.outcome==="existing"?"You already shared this setup":L.outcome==="updated"?"Code updated":"Your code is ready"),e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>oe(null)},e.createElement(Di,null))),e.createElement("span",{className:"syncify-code syncify-share-code"},e.createElement("code",null,Be(L.code)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{ae(Be(L.code),"saved-code")}},de==="saved-code"?"Copied":"Copy"),L.link?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{ae(L.link,"saved-link")}},de==="saved-link"?"Copied":"Get link"):null),L.leftOut?e.createElement("p",{className:"syncify-muted"},L.leftOut===1?"1 snippet isn't in Marketplace's list anymore, so it was left out.":`${L.leftOut} snippets aren't in Marketplace's list anymore, so they were left out.`):null):null,W?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,W),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Q()}},"Try again"))):null,S&&S.length>0?e.createElement("section",{"aria-label":"Your codes"},e.createElement("h5",{className:"syncify-change-group"},"Your codes"),e.createElement("ul",{className:"syncify-change-list syncify-share-codes"},S.map(d=>{var m;return e.createElement("li",{className:"syncify-setting",key:d.code},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",{className:"syncify-account-email"},(m=d.name)!=null?m:Be(d.code)),e.createElement("span",{className:"syncify-muted"},pn===d.code?"Delete it? Its link stops working.":[d.name?Be(d.code):null,Sl(d.item_count,"item"),`Used by ${d.imports}`].filter(Boolean).join(" \xB7 "))),e.createElement("span",{className:"syncify-account-actions"},pn===d.code?e.createElement(e.Fragment,null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Z(null),disabled:se},"Cancel"),e.createElement("button",{className:"syncify-text-button","data-danger":"true",type:"button",onClick:()=>{Kt(d.code)},disabled:se},se?"Deleting\u2026":"Delete")):e.createElement(e.Fragment,null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{U(d)},disabled:D!==null||se},"Update"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{ae(Be(d.code),`code:${d.code}`)}},de===`code:${d.code}`?"Copied":"Copy"),d.link?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{ae(d.link,`link:${d.code}`)}},de===`link:${d.code}`?"Copied":"Get link"):null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Z(d.code),disabled:se},"Delete"))))}))):null):e.createElement("div",{className:"syncify-setting syncify-share-part"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Share this setup"),e.createElement("span",{className:"syncify-muted"},"Get a code anyone can load")),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:n.onSignIn},"Sign in to share")))}var da={in:{mark:"+",label:"Goes in"},out:{mark:"\u2212",label:"Left out"}};function ml(n){let e=Spicetify.React;return e.createElement("div",{className:"syncify-changes",id:"syncify-share-items"},ma.map(([t,i])=>{let o=n.items.filter(a=>a.type===t).sort((a,s)=>a.name.localeCompare(s.name));return o.length===0?null:e.createElement("section",{key:t,"aria-label":i},e.createElement("h5",{className:"syncify-change-group"},i),e.createElement("ul",{className:"syncify-change-list"},o.map(a=>{let s=n.leftOut.get(a.key),c=s?da.out:da.in;return e.createElement("li",{className:"syncify-change",key:a.key},e.createElement("span",{className:"syncify-mark","data-change":s?"removed":"added",role:"img","aria-label":c.label},c.mark),e.createElement("span",{className:"syncify-change-name"},a.name,a.repo?e.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",a.repo):null),s?e.createElement(ha,{check:s}):null)})))}))}function gl(n){return n instanceof ke?"Sign in to back up.":n instanceof Error?n.message:String(n)}async function Sa(n){var e;try{return await navigator.clipboard.writeText(n),!0}catch(t){let i=(e=Spicetify.Platform)==null?void 0:e.ClipboardAPI;return i!=null&&i.copy?(await i.copy(n),!0):!1}}function hl(n){return n<=0?"No codes left, delete one to make another":`${n} ${n===1?"code":"codes"} left`}function Sl(n,e){return`${n} ${e}${n===1?"":"s"}`}var Mt=6,kl=600*1e3,bl=300,wl=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function xl(n){let e=n.lastIndexOf("@");return e<1?n:`${n[0]}***${n.slice(e)}`}function Bi(n){let e=dn(new Date(n).toISOString());return e.startsWith("today")?e:`on ${e}`}function fa(n){return`${Math.floor(n/60)}:${String(n%60).padStart(2,"0")}`}function Li(n){let e=Spicetify.React,t=n.openSection===n.id,i=`syncify-section-${n.id}`;return e.createElement("section",{className:"syncify-accordion-section","aria-label":n.title},e.createElement("button",{className:"syncify-accordion-header",type:"button","aria-expanded":t,"aria-controls":i,onClick:()=>n.onToggle(t?null:n.id)},e.createElement("span",{className:"syncify-accordion-title"},n.title),!t&&n.status?e.createElement("span",{className:"syncify-accordion-status","data-kind":n.status.kind,role:"img","aria-label":n.status.label,title:n.status.label},n.status.kind==="ok"?e.createElement(Nl,null):n.status.kind==="warning"?e.createElement(Il,null):n.status.kind==="pending"?e.createElement(ka,null):n.status.kind==="count"?n.status.text:null):null,e.createElement(fn,null)),t?e.createElement("div",{className:"syncify-accordion-body",id:i},n.children):null)}function vl(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-shield",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"}))}function Ki(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-warning-icon",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M12 3 2 21h20z"}),n.createElement("path",{d:"M12 10v5"}),n.createElement("path",{d:"M12 18h.01"}))}function Cl(n,e,t){return e?{kind:"warning",label:"Sign in to see your backups"}:n?t.kind==="secured"?{kind:"ok",label:"Signed in, backup secured"}:t.kind==="pending"?{kind:"pending",label:"Linking this Spotify account"}:t.kind==="open"||t.kind==="cancelled"?{kind:"warning",label:"Backup not secured yet"}:{kind:"ok",label:"Signed in"}:null}function Nl(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"10"}),n.createElement("path",{d:"m9 12 2 2 4-4"}))}function Il(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"10"}),n.createElement("path",{d:"M12 8v4"}),n.createElement("path",{d:"M12 16h.01"}))}function fn(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-chevron",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"m9 6 6 6-6 6"}))}function El(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-lock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("rect",{x:"5",y:"11",width:"14",height:"10",rx:"2"}),n.createElement("path",{d:"M8 11V7a4 4 0 0 1 8 0v4"}))}function ka(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-clock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"9"}),n.createElement("path",{d:"M12 7v5l3 2"}))}function _l(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-external",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M14 4h6v6"}),n.createElement("path",{d:"M20 4 10 14"}),n.createElement("path",{d:"M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"}))}function Di(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M18 6 6 18"}),n.createElement("path",{d:"m6 6 12 12"}))}var Tl=600*1e3,Pl=3,Al={exists:!1,payload:null,backups:[],safetyCopy:null,claim:null,unapproved:[],install:null},Ml=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function Ll(n,e,t,i){var N;let o=new Set(e),a=new Set(t),s=t.filter(x=>!o.has(x)).length,c=e.filter(x=>!a.has(x)).length,u=(N=n.spicetify_config)!=null?N:null,y=!!(i&&!u),f=!y&&(i&&u?!Yo(i,u):i!==u),p=[s?`${s} added`:null,c?`${c} removed`:null,f?"Spicetify config changed":null].filter(Boolean),h=dn(n.metadata.last_sync_datetime),b=p.length?`${p.join(", ")} since ${h}`:`Last backup ${h}`;return y?`${b} \xB7 Spicetify config not saved yet`:b}function pa(n){return n===1?"1 extension or theme":`${n} extensions and themes`}function dn(n){let e=new Date(n);if(Number.isNaN(e.getTime()))return n;let t=e.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),i=new Date,o=new Date(i);return o.setDate(i.getDate()-1),e.toDateString()===i.toDateString()?`today, ${t}`:e.toDateString()===o.toDateString()?`yesterday, ${t}`:`${e.toLocaleDateString(void 0,{month:"short",day:"numeric",year:e.getFullYear()===i.getFullYear()?void 0:"numeric"})}, ${t}`}function ba(n){var y;let e=Spicetify.React,t=e.useState,{claim:i}=n,[o,a]=t(!1),[s,c]=t(null);async function u(){a(!0),c(null);try{await _t(me()),Spicetify.showNotification("Syncify: claim sent for review"),n.onClose()}catch(f){c(f instanceof Error?f.message:String(f)),a(!1)}}return e.createElement("div",{className:"syncify-panel"},e.createElement("p",{className:"syncify-claim-notice"},(y=i.email)!=null?y:"Someone"," is claiming this backup."," ",n.signedIn?i.held?"Syncify is reviewing it.":`It goes through ${Bi(i.final_at)} unless you stop it.`:"If that's you, sign in to finish."),s?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},s):null,e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:n.onClose,disabled:o},"Close"),e.createElement("button",{className:n.signedIn?"syncify-button":"syncify-button secondary",type:"button",onClick:()=>{u()},disabled:o},"Not me"),n.signedIn?null:e.createElement("button",{className:"syncify-button",type:"button",onClick:n.onSignIn,disabled:o},"That's me, sign in")))}var Lt="[Syncify]";function ge(n,e){if(e===void 0){console.debug(Lt,n);return}console.debug(Lt,n,e)}function Wn(n,e){if(e===void 0){console.warn(Lt,n);return}console.warn(Lt,n,e)}function Ol(){var n;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((n=Spicetify==null?void 0:Spicetify.Topbar)!=null&&n.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var xa="syncify-styles";function Dl(){if(document.getElementById(xa)){ge("Another copy of Syncify is running; stopping this one");return}Ul();let n=me();$s({topbarButton:Bl(),menuItem:Yl()}),vt(n.entryPoint),vi(n.shortcut,Ut),zs({onClaim:e=>{zl(e)},onInstall:ql}).catch(e=>{Wn("Startup sync check failed",e)}),ta().catch(e=>{Wn("Restore check failed",e)})}function Ul(){let n=document.createElement("style");n.id=xa,n.textContent=yo,document.head.appendChild(n)}function Bl(){let{extensionName:n}=O(),e=new Spicetify.Topbar.Button(n,Xt,t=>{ge("Topbar button clicked",Ot(t)),Ut()},!1,!0);return va(e),jl(e),Rl(e),ge("Topbar button registered",Ot(e)),e}function va(n){var t;let e=n;n.element.style.setProperty("-webkit-app-region","no-drag"),(t=e.button)==null||t.style.setProperty("-webkit-app-region","no-drag")}var wa=".main-actionButtons",Kl=".Root__globalNav, .Root__top-bar",$l=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function jl(n){if(typeof MutationObserver=="undefined")return;let e=!1,t=null,i=()=>{e=!1,a();let s=n.element,c=document.querySelector(wa);!s||!c||c.contains(s)||(c.prepend(s),Hl(n),va(n),ge("Topbar button re-attached",Ot(n)))},o=new MutationObserver(()=>{e||(e=!0,setTimeout(i,250))}),a=()=>{var u;if(t!=null&&t.isConnected)return;let s=document.querySelector(wa),c=(u=s==null?void 0:s.closest(Kl))!=null?u:s==null?void 0:s.parentElement;if(o.disconnect(),t=c!=null?c:null,!c){o.observe(document.body,{childList:!0,subtree:!0});return}o.observe(c,{childList:!0,subtree:!0});for(let y=c.parentElement;y;y=y.parentElement)o.observe(y,{childList:!0})};i()}function Hl(n){let e=Fl(n);if(!e||e.className&&e.className!=="undefined")return;let t=Array.from(document.querySelectorAll($l)).find(i=>!n.element.contains(i));t!=null&&t.className&&(e.className=t.className)}function Fl(n){return n.button}function Yl(){var n;if(typeof((n=Spicetify.Menu)==null?void 0:n.Item)!="function")return null;try{return new Spicetify.Menu.Item(O().extensionName,!1,()=>Ut(),Wl())}catch(e){return Wn("Failed to create profile menu item",e),null}}function Wl(){return Xt.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function Rl(n){Object.assign(window,{SyncifyDebug:{button:n,element:n.element,openModal:Ut,inspect:()=>Ot(n),clickElement:()=>{var e;return(e=n.element)==null?void 0:e.click()},clickInnerButton:()=>{var e;return(e=n.button)==null?void 0:e.click()},clickCallback:()=>n.onClick(n)}})}function Ot(n){var e,t,i,o,a;return{label:n.label,disabled:n.disabled,isRight:n.isRight,hasElement:!!n.element,elementConnected:(e=n.element)==null?void 0:e.isConnected,elementDisabled:(t=n.element)==null?void 0:t.disabled,elementAriaDisabled:(i=n.element)==null?void 0:i.getAttribute("aria-disabled"),elementClass:(o=n.element)==null?void 0:o.className,appRegion:n.element?getComputedStyle(n.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:n.button?getComputedStyle(n.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:n.element?getComputedStyle(n.element).pointerEvents:null,visibility:n.element?getComputedStyle(n.element).visibility:null,display:n.element?getComputedStyle(n.element).display:null,rect:(a=n.element)==null?void 0:a.getBoundingClientRect().toJSON()}}var B=null;function Ut(){if(B!=null&&B.container.isConnected){ge("Closing modal"),Spicetify.PopupModal.hide();return}ge("Opening modal"),Dt(Spicetify.React.createElement(Ui))}async function zl(n){let e=await G().catch(()=>null);B!=null&&B.container.isConnected||(ge("Opening claim notice"),Dt(Spicetify.React.createElement(ba,{claim:n,signedIn:e!==null,onSignIn:()=>Dt(Spicetify.React.createElement(Ui,{section:"account"})),onClose:()=>Spicetify.PopupModal.hide()})))}function ql(n){if(B!=null&&B.container.isConnected)return;ge("Opening install notice");let e=()=>Spicetify.PopupModal.hide();Dt(Spicetify.React.createElement("div",{className:"syncify-panel"},Spicetify.React.createElement(aa,{install:n,onDone:e,onClose:e})))}function Dt(n){var t;(t=B==null?void 0:B.root)==null||t.unmount();let e=document.createElement("div");B={container:e,root:null};try{Spicetify.PopupModal.display({title:O().extensionName,content:e,isLarge:!1})}catch(i){throw Wn("Failed to open PopupModal",i),i}Gl(e),Jl(e,n)}function Gl(n){requestAnimationFrame(()=>{let e=Vl(n);e==null||e.classList.add("syncify-modal-shell");let t=e==null?void 0:e.querySelector(".main-trackCreditsModal-header h1");if(t&&!t.querySelector(".syncify-modal-mark")){let o=document.createElement("span");o.className="syncify-modal-mark",o.innerHTML=fo,t.prepend(o)}let i=e==null?void 0:e.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');i&&(i.classList.add("syncify-modal-close"),i.setAttribute("aria-label",`Close ${O().extensionName}`),i.title="Close",i.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function Vl(n){let e=n.parentElement;for(;e&&e!==document.body;){if(e.querySelector(".main-trackCreditsModal-header"))return e;e=e.parentElement}return n.closest('[class*="trackCreditsModal"]')}function Jl(n,e){try{if(typeof Spicetify.ReactDOM.createRoot=="function"){let t=Spicetify.ReactDOM.createRoot(n);t.render(e),(B==null?void 0:B.container)===n&&(B.root=t),ge("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(e,n),ge("Modal rendered",{renderer:"render"})}catch(t){throw Wn("Failed to render modal",t),t}}na();(function n(){if(!Ol()){setTimeout(n,100);return}ge("Spicetify APIs ready"),Dl()})();})();
