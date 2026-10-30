// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var La=Object.defineProperty,Ua=Object.defineProperties;var Ba=Object.getOwnPropertyDescriptors;var so=Object.getOwnPropertySymbols;var Ka=Object.prototype.hasOwnProperty,$a=Object.prototype.propertyIsEnumerable;var ao=(n,e,t)=>e in n?La(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,h=(n,e)=>{for(var t in e||(e={}))Ka.call(e,t)&&ao(n,t,e[t]);if(so)for(var t of so(e))$a.call(e,t)&&ao(n,t,e[t]);return n},I=(n,e)=>Ua(n,Ba(e));var ro=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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

.syncify-share-input,
.syncify-share-code code {
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    letter-spacing: 0.05em;
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

/* Sharing sits apart from loading a code. */
.syncify-share-part {
    margin-top: 8px;
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

.syncify-share-codes {
    gap: 4px;
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

    .syncify-share-codes {
        gap: 12px;
    }
}
`;var Gt=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var Fa="syncify",nn="state";function Vt(){let n;try{n=window.indexedDB}catch(e){return Promise.resolve(null)}return n?new Promise(e=>{let t;try{t=n.open(Fa,1)}catch(i){e(null);return}t.onupgradeneeded=()=>{t.result.createObjectStore(nn)},t.onerror=()=>e(null),t.onblocked=()=>e(null),t.onsuccess=()=>e(t.result)}):Promise.resolve(null)}function Jt(n,e){let t=Vt().then(i=>new Promise((o,a)=>{if(!i){a(new Error("IndexedDB isn't available."));return}try{let s=i.transaction(nn,n),c=e(s.objectStore(nn));s.oncomplete=()=>{i.close(),o(c.result)},s.onerror=s.onabort=()=>{var l;i.close(),a((l=s.error)!=null?l:new Error("IndexedDB failed."))}}catch(s){i.close(),a(s)}}));return Promise.race([t,new Promise((i,o)=>setTimeout(()=>o(new Error("IndexedDB took too long.")),2e3))])}function tn(n){return Jt("readonly",e=>e.get(n))}async function on(n,e){await Jt("readwrite",t=>t.put(e,n))}async function co(n){await Jt("readwrite",e=>e.delete(n))}var xe={extensionName:"Syncify",version:"1.12.0",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com",shareUrl:"https://syncs.wsoltani.com"};function O(){var e,t,i,o,a,s,c,l,y;let n=window.SyncifyConfig;return{extensionName:(e=_e(n==null?void 0:n.extensionName))!=null?e:xe.extensionName,version:(t=lo(n==null?void 0:n.version))!=null?t:xe.version,workerUrl:(i=_e(n==null?void 0:n.workerUrl))!=null?i:xe.workerUrl,webUrl:(o=_e(n==null?void 0:n.webUrl))!=null?o:xe.webUrl,githubUrl:(a=_e(n==null?void 0:n.githubUrl))!=null?a:xe.githubUrl,kofiUrl:(s=_e(n==null?void 0:n.kofiUrl))!=null?s:xe.kofiUrl,issueUrl:(c=_e(n==null?void 0:n.issueUrl))!=null?c:xe.issueUrl,releasesUrl:(l=_e(n==null?void 0:n.releasesUrl))!=null?l:xe.releasesUrl,shareUrl:(y=_e(n==null?void 0:n.shareUrl))!=null?y:xe.shareUrl}}function _e(n){return lo(n)}function lo(n){return typeof n=="string"&&n.trim()?n.trim():null}var Ya="x-syncify-version",Wa="x-syncify-install",Ra="x-syncify-timezone",uo="install-id",yo="syncify:install-id",za=2e3,nt=null;async function fo(){let n={[Ya]:O().version,[Wa]:(await Xt()).id},e=Va();return e&&(n[Ra]=e),n}function Xt(){return nt!=null||(nt=qa().catch(()=>({id:tt(),inDatabase:!1}))),nt}async function qa(){let n=await Promise.race([Ga(),new Promise(e=>setTimeout(()=>e(null),za))]);if(n)return{id:n,inDatabase:!0};try{let e=window.localStorage.getItem(yo);if(e&&po(e))return{id:e,inDatabase:!1};let t=tt();return window.localStorage.setItem(yo,t),{id:t,inDatabase:!1}}catch(e){return{id:tt(),inDatabase:!1}}}async function Ga(){let n=await Vt();return n?new Promise(e=>{let t=null;try{let i=n.transaction(nn,"readwrite"),o=i.objectStore(nn),a=o.get(uo);a.onsuccess=()=>{if(typeof a.result=="string"&&po(a.result)){t=a.result;return}t=tt(),o.put(t,uo)},i.oncomplete=()=>{n.close(),e(t)},i.onerror=i.onabort=()=>{n.close(),e(null)}}catch(i){n.close(),e(null)}}):null}function tt(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let n=crypto.getRandomValues(new Uint8Array(16));n[6]=n[6]&15|64,n[8]=n[8]&63|128;let e=[...n].map(t=>t.toString(16).padStart(2,"0"));return[e.slice(0,4).join(""),e.slice(4,6).join(""),e.slice(6,8).join(""),e.slice(8,10).join(""),e.slice(10).join("")].join("-")}function po(n){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(n)}function Va(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(n){return null}}var Ja="syncify-signature-v1",Xa={name:"ECDSA",hash:"SHA-256"};function it(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function ot(n){return Zt(new Uint8Array(await crypto.subtle.exportKey("raw",n)))}async function wn(n,e,t,i,o){let a=await Za(e,t,i,o),s=await crypto.subtle.sign(Xa,n,a);return Zt(new Uint8Array(s))}async function Za(n,e,t,i){let{pathname:o,search:a}=new URL(t),s=new TextEncoder,c=Zt(new Uint8Array(await crypto.subtle.digest("SHA-256",s.encode(i))));return s.encode([Ja,n,e.toUpperCase(),o+a,c].join(`
`))}function Zt(n){let e="";for(let t=0;t<n.length;t++)e+=String.fromCharCode(n[t]);return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var mo="device-key",Qt="session",go="salt",Ke=null,xn,ho={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function sn(n){if(Ke)return Ke;let e=await tn(mo);return Qa(e)?(Ke=Promise.resolve(e),e):n?(Ke=it().then(async t=>(await on(mo,t),t)),Ke.catch(()=>{Ke=null}),Ke):null}async function G(){let n=await tn(Qt);return er(n)?n:null}function ei(n){return on(Qt,n)}async function $e(){await co(Qt).catch(()=>{})}async function st(){if(xn===void 0){let n=await tn(go).catch(()=>{});xn=typeof n=="string"?n:null}return xn}async function at(n){n!==xn&&(xn=n,await on(go,n).catch(()=>{}))}function rt(){return ho}function So(n){ho=n}function Qa(n){let e=n;return!!(e&&e.privateKey instanceof CryptoKey&&e.publicKey instanceof CryptoKey)}function er(n){let e=n;return!!(e&&typeof e.token=="string"&&e.token&&typeof e.email=="string")}var ko="install-key",an=null;function bo(){return an!=null||(an=nr()),an.catch(()=>{an=null}),an.catch(()=>null)}async function nr(){if(!(await Xt()).inDatabase)return null;let n=await tn(ko),e=ir(n)?n:await tr();return{privateKey:e.privateKey,publicKey:await ot(e.publicKey)}}async function tr(){let n=await it();return await on(ko,n),n}function ir(n){let e=n;return!!(e&&e.privateKey instanceof CryptoKey&&e.publicKey instanceof CryptoKey)}var or="/api/auth/email-otp/send-verification-otp",sr="/api/auth/sign-in/email-otp",ar="/api/auth/get-session",rr="/api/auth/sign-out",cr="/api/auth/link",lr="x-syncify-device-key",ur="x-syncify-signature",wo="x-syncify-salt",yr="none",fr={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again.",link_failed:"Couldn't open the website. Try again."},x=class extends Error{constructor(t,i=null){var o;super((o=fr[t])!=null?o:"Sign-in failed. Try again.");this.code=t;this.retryAfter=i;this.name="AccountError"}};function je(n){return n instanceof x?n.message:"Sign-in failed. Try again."}async function xo(n){let e=await Cn(or,{method:"POST",body:JSON.stringify({email:n,type:"sign-in"})});return typeof(e==null?void 0:e.resend_in)=="number"?e.resend_in:60}async function vo(n,e){var a;let t=await sn(!0).catch(()=>{throw new x("no_device_key")}),i=await Cn(sr,{method:"POST",body:JSON.stringify({email:n,otp:e}),keys:t,sendPublicKey:!0});if(typeof(i==null?void 0:i.token)!="string"||!i.token)throw new x("sign_in_failed");let o={token:i.token,email:typeof((a=i.user)==null?void 0:a.email)=="string"?i.user.email:n};return await ei(o).catch(()=>{throw new x("no_device_key")}),ni=!0,o}var ni=!1;async function Co(){var e;let n=await G();if(!n||ni)return n;try{let t=await ct(n,ar,"GET");ni=!0;let i=(e=t==null?void 0:t.user)==null?void 0:e.email;if(typeof i!="string"||i===n.email)return n;let o=I(h({},n),{email:i});return await ei(o).catch(()=>{}),o}catch(t){if(t instanceof x&&t.code==="signed_out")return null;throw t}}async function Io(){let n=await G().catch(()=>null);n&&await ct(n,rr,"POST").catch(()=>{}),await $e()}async function No(){let n=await G();if(!n)throw new x("signed_out");let e=await ct(n,cr,"POST"),t=typeof(e==null?void 0:e.url)=="string"?e.url:"",i=new URL(O().webUrl).origin;if(!t.startsWith(`${i}/link#`))throw new x("link_failed");return t}async function vn(n,e,t){let i=await G();if(!i)throw new x("signed_out");return ct(i,n,e,t)}async function Eo(n,e,t){let i=await G().catch(()=>null),o=i?await sn(!1).catch(()=>null):null;await Cn(n,h({method:"POST",body:JSON.stringify(e),headers:t,keepalive:!0},i&&o?{token:i.token,keys:o}:{}))}async function ct(n,e,t,i){let o=await sn(!1);if(!o)throw await $e(),new x("signed_out");return Cn(e,h({method:t,token:n.token,keys:o},i===void 0?{}:{body:JSON.stringify(i)}))}async function Cn(n,e,t=!1){var d,p,m;let i=`${O().webUrl.replace(/\/+$/,"")}${n}`,o=h({},e.headers);if(e.body!==void 0&&(o["content-type"]="application/json"),e.token&&(o.authorization=`Bearer ${e.token}`),e.keys){let b=(d=await st())!=null?d:yr;o[wo]=b,o[ur]=await wn(e.keys.privateKey,b,e.method,i,(p=e.body)!=null?p:""),e.sendPublicKey&&(o[lr]=await ot(e.keys.publicKey))}let a;try{a=await fetch(i,{method:e.method,headers:o,body:e.body,keepalive:e.keepalive})}catch(b){throw new x("offline")}let s=a.headers.get(wo);s&&await at(s);let c=await a.json().catch(()=>null);if(a.ok)return c;let l=typeof(c==null?void 0:c.code)=="string"?c.code:a.status===503?"unavailable":"failed";if(l==="stale_salt"&&e.keys&&!t)return Cn(n,e,!0);l==="signed_out"&&await $e();let y=Number(a.headers.get("retry-after"));throw new x(l,Number.isFinite(y)&&y>0?y:(m=dr[l])!=null?m:null)}var dr={resend_wait:60,too_many_requests:60,send_failed:60};var pr="x-syncify-user-hash",mr="x-syncify-identity",gr="x-syncify-signature",hr="x-syncify-install-key",Sr="x-syncify-install-signature",ti="x-syncify-salt",kr="none",br="/restores",wr="/installs",xr="hash",_o=3,In=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}},ge=class extends Error{constructor(t){super(t==="not_linked"?"Couldn't read that Spotify account's backups.":"Sign in to restore this backup.");this.code=t;this.name="LockedError"}},He=class extends Error{constructor(){super("This Spotify account doesn't accept backups from this install. Sign in to back up."),this.name="InstallRefusedError"}};async function Po(n,e,t){var a;let i=await Te(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(t)});if(i.status===403&&((a=await i.json().catch(()=>null))==null?void 0:a.code)==="install_refused")throw new He;if(!i.ok)throw new Error(`Backup failed with HTTP ${i.status}.`);let o=await i.json().catch(()=>null);return{unchanged:(o==null?void 0:o.unchanged)===!0,unapproved:(o==null?void 0:o.quarantined)===!0}}async function Ao(n,e,t,i){let o=await Te(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({install:t,action:i})},wr);if(o.ok)return;let a=await o.json().catch(()=>null);if((a==null?void 0:a.code)!=="not_pending")throw new Error(`Couldn't answer with HTTP ${o.status}.`)}async function ii(n,e,t){var m,b,E,w;let i=await Te(n,e,{method:"GET"},Oo("/",t));if(i.status===404){let k=await i.json().catch(()=>null);return{exists:!1,payload:null,backups:[],safetyCopy:null,claim:Nn(k==null?void 0:k.claim),unapproved:[],install:To(k==null?void 0:k.install)}}if(!i.ok)throw new Error(`Restore failed with HTTP ${i.status}.`);let o=await i.json(),a=Nn(o.claim),s=To(o.install);delete o.claim,delete o.install;let c=[o,...(m=o.backup_history)!=null?m:[]];if(!c.every(k=>k.backup))return{exists:!0,payload:o,backups:c.slice(0,_o),safetyCopy:(b=c[_o])!=null?b:null,claim:a,unapproved:[],install:s};let l=c.filter(k=>{var T;return((T=k.backup)==null?void 0:T.kind)==="rolling"}),y=(E=c.find(k=>{var T;return((T=k.backup)==null?void 0:T.kind)==="anchor"}))!=null?E:null,d=c.filter(k=>{var T;return((T=k.backup)==null?void 0:T.kind)==="quarantined"}),p=(w=l[0])!=null?w:y;return p?l.length===0&&y?{exists:!0,payload:p,backups:[y],safetyCopy:null,claim:a,unapproved:d,install:s}:{exists:!0,payload:p,backups:l,safetyCopy:y,claim:a,unapproved:d,install:s}:{exists:!1,payload:null,backups:[],safetyCopy:null,claim:a,unapproved:d,install:s}}async function Mo(n,e,t,i){try{await Te(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:t}),keepalive:!0},Oo(br,i))}catch(o){}}async function Te(n,e,t,i="",o=!1){var w,k,T,A,J;let a=i?`${n.replace(/\/+$/,"")}${i}`:n,s=(w=t.method)!=null?w:"GET",c=await G().catch(()=>null),l=c?await sn(!1).catch(()=>null):null,y=await bo(),d={},p=(k=await st())!=null?k:kr;c&&l&&(d.authorization=`Bearer ${c.token}`,d[ti]=p,d[gr]=await wn(l.privateKey,p,s,a,(T=t.body)!=null?T:"")),y&&(d[ti]=p,d[hr]=y.publicKey,d[Sr]=await wn(y.privateKey,p,s,a,(A=t.body)!=null?A:""));let m=await fetch(a,I(h({},t),{headers:h(I(h(h({},t.headers),await fo()),{[pr]:e.hash,[mr]:e.field}),d)})),b=m.headers.get(ti);if(b&&await at(b),m.status===426)throw new In;if(m.status!==401)return m;let E=(J=await m.clone().json().catch(()=>null))==null?void 0:J.code;if(!o){if(E==="stale_salt"&&(c||y))return Te(n,e,t,i,!0);if(E==="signed_out"&&c)return await $e(),Te(n,e,t,i,!0)}throw E==="claimed"||E==="not_owner"||E==="not_linked"?new ge(E):(E==="signed_out"&&await $e(),new x(typeof E=="string"?E:"failed"))}function Oo(n,e){return e?`${n}?${xr}=${encodeURIComponent(e)}`:n}function To(n){let e=n;if(!e||typeof e.trust!="string")return null;let t=Array.isArray(e.waiting)?e.waiting:[];return{trusted:e.trust!=="pending"&&e.trust!=="rejected",refused:e.trust==="rejected",waiting:t.flatMap(i=>{let o=i;return o&&typeof o.id=="string"&&typeof o.first_seen_at=="number"?[{id:o.id,device:typeof o.device=="string"?o.device:null,first_seen_at:o.first_seen_at}]:[]})}}function Nn(n){let e=n;return!e||typeof e.mine!="boolean"?null:e.status==="final"?{status:"final",mine:e.mine}:e.status!=="pending"||typeof e.final_at!="number"?null:h({status:"pending",mine:e.mine,email:typeof e.email=="string"?e.email:null,final_at:e.final_at,held:e.held===!0},e.waiting===!0?{waiting:!0}:{})}async function lt(n){let e=new TextEncoder().encode(n),t=await crypto.subtle.digest("SHA-256",e);return[...new Uint8Array(t)].map(i=>i.toString(16).padStart(2,"0")).join("")}function En(n){return JSON.stringify(oi(n))}function oi(n){return Array.isArray(n)?n.map(oi):n&&typeof n=="object"?Object.keys(n).sort().reduce((e,t)=>(e[t]=oi(n[t]),e),{}):n}function Do(){let n=navigator.userAgent;return/Windows/i.test(n)?"Windows":/Mac OS|Macintosh/i.test(n)?"macOS":/Linux/i.test(n)?"Linux":n}var vr=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,Cr=100,Ir="marketplace:installed-extensions",Nr="marketplace:installed-themes",Er="marketplace:theme-installed",_r="marketplace:installed:",Tr="marketplace";function ai(n){return Spicetify.Config?ri(Spicetify.Config,n):null}function ri(n,e){var a;let t=Pe(n),i=new Set(Pr(e)),o=((a=e[Er])==null?void 0:a.includes(_r))===!0;return{current_theme:o?Tr:t.current_theme,color_scheme:o?"":t.color_scheme,extensions:t.extensions.filter(s=>!i.has(s)),custom_apps:t.custom_apps}}function Pe(n){let e=n&&typeof n=="object"?n:{};return{current_theme:si(e.current_theme)?e.current_theme:"",color_scheme:si(e.color_scheme)?e.color_scheme:"",extensions:Lo(e.extensions),custom_apps:Lo(e.custom_apps)}}function Ko(n,e){return En(Pe(n))===En(Pe(e))}function Lo(n){return Array.isArray(n)?[...new Set(n.filter(si))].sort().slice(0,Cr):[]}function si(n){return typeof n=="string"&&vr.test(n)}function Pr(n){let e=Uo(n[Ir]).map(i=>{var a;let o=(a=Bo(n[i]))==null?void 0:a.manifest;return o&&typeof o=="object"?o.main:void 0}),t=Uo(n[Nr]).flatMap(i=>{var a;let o=(a=Bo(n[i]))==null?void 0:a.include;return Array.isArray(o)?o:[]});return[...e,...t].flatMap(i=>{let o=typeof i=="string"?i.split("/").pop():void 0;return o?[o]:[]})}function Uo(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function Bo(n){try{let e=n?JSON.parse(n):null;return e&&typeof e=="object"&&!Array.isArray(e)?e:null}catch(e){return null}}var Ar=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],Mr="marketplace:installed:",$o=`${Mr}snippet:`,Or="wsoltani/syncify",Dr="marketplace",jo={added:0,removed:1,unchanged:2};function V(n){let e=new Map;for(let[t,i]of Ar)for(let o of Kr(n[t]))e.has(o)||e.set(o,Ur(o,i,n[o]));return[...e.values()]}function _n(n,e,t,i){let o=new Set(n.map(l=>l.key)),a=new Map(t.map(l=>[l.key,l])),s=[...n.map(l=>{let y=a.get(l.key);return I(h({},l),{change:y?"unchanged":"added",isNew:!y||y.sources.join(" ")!==l.sources.join(" ")})}),...t.filter(l=>!o.has(l.key)).map(l=>I(h({},l),{change:Tn(l,n)?"unchanged":"removed",isNew:!1}))].sort((l,y)=>jo[l.change]-jo[y.change]||l.name.localeCompare(y.name)),c={added:0,removed:0,unchanged:0};for(let l of s)c[l.change]+=1;return{items:s,counts:c,manual:Lr(e,i)}}function Tn(n,e){return n.type==="extension"&&yt(n)&&!e.some(yt)}function yt(n){var e;return((e=n.repo)==null?void 0:e.toLowerCase())===Or}function Lr(n,e){if(!n)return[];let t=Pe(n),i=Pe(e),o=[...t.extensions.filter(s=>!i.extensions.includes(s)).map(s=>({type:"extension",name:s})),...t.custom_apps.filter(s=>!i.custom_apps.includes(s)).map(s=>({type:"custom_app",name:s}))],a=t.current_theme;return a&&a!==Dr&&(a!==i.current_theme||t.color_scheme!==i.color_scheme)&&o.push(h({type:"theme",name:a},t.color_scheme?{scheme:t.color_scheme}:{})),o}function Ur(n,e,t){var l,y;let i=Ho(t),o=Ho(i==null?void 0:i.manifest),a=ut(i==null?void 0:i.user),s=ut(i==null?void 0:i.repo),c=(y=(l=ut(i==null?void 0:i.title))!=null?l:ut(o==null?void 0:o.name))!=null?y:n.startsWith($o)?n.slice($o.length):n.split("/").pop()||n;return{key:n,type:e,name:c,repo:e!=="snippet"&&a&&s?`${a}/${s}`:null,sources:Br(e,i),custom:e==="snippet"&&(i==null?void 0:i.custom)===!0}}function Br(n,e){return e?(n==="extension"?[e.extensionURL]:n==="theme"?[e.cssURL,e.schemesURL,...Array.isArray(e.include)?e.include:[]]:[]).filter(i=>typeof i=="string"&&i!==""):[]}function ut(n){return typeof n=="string"&&n.trim()?n.trim():null}function Kr(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function Ho(n){let e=n;if(typeof n=="string")try{e=JSON.parse(n)}catch(t){return null}return e&&typeof e=="object"&&!Array.isArray(e)?e:null}var ft="spicetify-marketplace";var Pn="settings";async function Fo(){let n=await Ro();if(n.kind!=="ok")return null;try{let e=await zo(n.db,"readonly",i=>i.getAll());if(!e)return null;let t={};for(let i of e)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(t[i.key]=i.value);return t}finally{n.db.close()}}async function Yo(n,e=[]){let t=await Ro();if(t.kind==="unavailable")return"unavailable";let i=t.kind==="ok"?t.db:await $r();if(!i)return"failed";try{return await zo(i,"readwrite",a=>{let s;for(let[c,l]of Object.entries(n))s=a.put({key:c,value:l});for(let c of e)s=a.delete(c);return s})===null?"failed":"written"}finally{i.close()}}function Wo(){var n;try{return(n=window.indexedDB)!=null?n:null}catch(e){return null}}async function Ro(){let n=Wo();return n?await jr(n)?{kind:"missing"}:new Promise(e=>{let t=!1,i=n.open(ft);i.onupgradeneeded=()=>{t=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),e({kind:"unavailable"})},i.onblocked=()=>e({kind:"unavailable"}),i.onsuccess=()=>{let o=i.result;if(t){o.close(),Hr(n).then(()=>e({kind:"missing"}));return}if(!o.objectStoreNames.contains(Pn)){o.close(),e({kind:"unavailable"});return}e({kind:"ok",db:o})}}):{kind:"unavailable"}}function $r(){let n=Wo();return n?new Promise(e=>{let t=n.open(ft,1);t.onupgradeneeded=()=>{let i=t.result;i.objectStoreNames.contains(Pn)||i.createObjectStore(Pn,{keyPath:"key"})},t.onerror=()=>{console.warn("Syncify could not create Marketplace storage",t.error),e(null)},t.onblocked=()=>e(null),t.onsuccess=()=>e(t.result)}):Promise.resolve(null)}async function jr(n){if(typeof n.databases!="function")return!1;try{return!(await n.databases()).some(t=>t.name===ft)}catch(e){return!1}}function Hr(n){return new Promise(e=>{let t=n.deleteDatabase(ft);t.onsuccess=()=>e(),t.onerror=()=>e(),t.onblocked=()=>e()})}function zo(n,e,t){return new Promise(i=>{let o;try{o=n.transaction(Pn,e)}catch(y){console.warn("Syncify could not open a Marketplace transaction",y),i(null);return}let a,s=!1,c=y=>{s||(s=!0,i(y))};o.oncomplete=()=>c(a),o.onerror=()=>{console.warn("Syncify Marketplace transaction failed",o.error),c(null)},o.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",o.error),c(null)};let l;try{l=t(o.objectStore(Pn))}catch(y){console.warn("Syncify Marketplace request could not be issued",y),c(null);return}l&&(l.onsuccess=()=>{a=l.result},l.onerror=()=>{console.warn("Syncify Marketplace request failed",l.error),c(null)})})}var li="marketplace:",dt=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function le(){let n=Jr(),e=await Fo();if(e)for(let[t,i]of Object.entries(e))t.startsWith(li)&&(n[t]=i);return n}var Yr=new Set(["marketplace:active-tab","marketplace:sort"]),qo="marketplace:installed:",ci="marketplace:theme-installed",Wr=["stars","tags","lastUpdated","created"];async function pt(n,e){let t={};for(let[i,o]of Object.entries(n))Yr.has(i)||(t[i]=i.startsWith(qo)?Rr(o):o);return e&&(t.spicetify_config=Pe(e)),lt(En(t))}function Rr(n){try{let e=JSON.parse(n);if(!e||typeof e!="object"||Array.isArray(e))return n;for(let t of Wr)delete e[t];return e}catch(e){return n}}async function mt(){let n=await le(),e=ai(n);return{keyCount:Object.keys(n).length,hash:await pt(n,e),installedItemCount:Gr(n),installedItems:gt(n),items:V(n),spicetifyConfig:e,marketplaceAvailable:Vr(n)}}async function Go(){let n=await le(),e=ai(n);return h({schema_version:2,metadata:{last_sync_datetime:new Date().toISOString(),device_info:Do(),marketplace_key_count:Object.keys(n).length},payload_hash:await pt(n,e),marketplace_data:{keys:n}},e?{spicetify_config:e}:{})}async function Vo(n,e=[]){var a,s;let t={},i=(s=(a=n.marketplace_data)==null?void 0:a.keys)!=null?s:{};for(let[c,l]of Object.entries(i))c.startsWith(li)&&(t[c]=l);if(Object.keys(t).length===0)return 0;await zr(t),e.length>0&&await qr(t,e);let o=yi(await le(),t);return await ui(t,o),Object.keys(t).length}async function ui(n,e=[]){for(let[i,o]of Object.entries(n))window.localStorage.setItem(i,o);for(let i of e)window.localStorage.removeItem(i);if(await Yo(n,e)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try again.")}function yi(n,e){let t=new Set(dt.flatMap(s=>{var c;return ht((c=e[s])!=null?c:n[s]).map(String)})),i=gt(n).filter(s=>s.startsWith(qo)&&!t.has(s)),o=i.filter(s=>n[s]!==void 0&&e[s]===void 0),a=n[ci];return a&&e[ci]===void 0&&i.some(s=>a.includes(s))&&o.push(ci),o}async function zr(n){let e=await le(),t=V(n),i=V(e).filter(s=>Tn(s,t));if(i.length===0)return;let o="marketplace:installed-extensions",a=ht(n[o]).map(String);for(let s of i)a.includes(s.key)||a.push(s.key),n[s.key]=e[s.key];n[o]=JSON.stringify(a)}async function qr(n,e){let t=await le(),i=gt(t);for(let o of dt){if(n[o]===void 0)continue;let a=ht(n[o]).map(String).filter(s=>!e.includes(s)||i.includes(s));n[o]=JSON.stringify(a)}for(let o of e)t[o]!==void 0?n[o]=t[o]:delete n[o]}function Gr(n){return gt(n).length}function gt(n){return dt.flatMap(e=>ht(n[e]).map(String))}function Vr(n){return!!(window.Marketplace||dt.some(t=>n[t]!==void 0)||n["marketplace:tabs"]!==void 0)}function Jo(n,e){return e===0?!1:n===0?!0:n<Math.max(2,Math.floor(e*.5))}function Jr(){let n={};for(let e=0;e<window.localStorage.length;e+=1){let t=window.localStorage.key(e);if(!(t!=null&&t.startsWith(li)))continue;let i=window.localStorage.getItem(t);i!==null&&(n[t]=i)}return n}function ht(n){if(!n)return[];try{let e=JSON.parse(n);return Array.isArray(e)?e:[]}catch(e){return[]}}var Xr="raw.githubusercontent.com",Zr="cdn.jsdelivr.net",Xo=".github.io";function di(n){var t;if(n.protocol!=="https:")return null;let e=n.pathname.split("/").filter(Boolean);if(n.host===Xr)return fi(e[0],e[1]);if(n.host===Zr)return e[0]==="gh"?fi(e[1],(t=e[2])==null?void 0:t.split("@")[0]):null;if(n.host.endsWith(Xo)){let i=n.host.slice(0,-Xo.length);return i.includes(".")?null:fi(i,e.length>1?e[0]:n.host)}return null}function fi(n,e){return n&&e?`${n}/${e}`:null}var Qr={extension:"spicetify-extensions",theme:"spicetify-themes"},ec="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",nc="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",tc="https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/",ic="https://api.github.com/repos",oc=5e3,sc=20,Zo="syncify:repo-topics",Qo=10080*60*1e3,ac=200;function Ae(n){return(n==null?void 0:n.kind)==="host"||(n==null?void 0:n.kind)==="repo"||(n==null?void 0:n.kind)==="blocked"||(n==null?void 0:n.kind)==="catalog"}function On(n){let e=new Map;for(let t of n){if(t.change==="removed")continue;if(t.custom){e.set(t.key,{kind:"custom"});continue}let i=rc(t);i&&e.set(t.key,i)}return e}async function Dn(n,e){let t=new Map,i=n.filter(s=>s.change!=="removed"&&s.isNew&&!e.has(s.key));if(i.length===0)return t;let o=i.filter(s=>s.type==="snippet"),a=i.filter(s=>s.type!=="snippet");if(o.length>0){let s=await pi();for(let c of o)s?St(s,c.name)||t.set(c.key,{kind:"catalog"}):t.set(c.key,{kind:"unchecked"})}if(a.length>0){let s=await uc(),c=dc(),l=0;await Promise.all(a.map(async y=>{let d=cc(y),p=Qr[y.type];if(!d||!p)return;if(s===null){t.set(y.key,{kind:"unchecked"});return}if(lc(d,s)){t.set(y.key,{kind:"blocked"});return}let m=fc(c,d);m===void 0&&l<sc&&(l+=1,m=await yc(d),m!==void 0&&(c[d.toLowerCase()]={topics:m,at:Date.now()})),m===void 0?t.set(y.key,{kind:"unchecked"}):(m===null||!m.includes(p))&&t.set(y.key,{kind:"catalog"})})),pc(c)}return t}function rc(n){let e=null;for(let t of n.sources){let i;try{i=new URL(t)}catch(a){return{kind:"host",host:t.slice(0,40)}}let o=di(i);if(!o)return{kind:"host",host:i.host};n.repo&&o.toLowerCase()!==n.repo.toLowerCase()&&(e!=null||(e=o))}return e?{kind:"repo",repo:e}:null}function cc(n){for(let e of n.sources)try{let t=di(new URL(e));if(t)return t}catch(t){}return n.repo}function lc(n,e){let t=`https://github.com/${n}`.toLowerCase();return e.some(i=>{let o=i.toLowerCase();if(!o.includes("*"))return o===t;let a=o.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${a}$`).test(t)})}function es(n){return n.replace(/\n/g,"").trim().toLowerCase()}function St(n,e){return n.get(es(e))}var An=null,Mn=null;function uc(){return An!=null||(An=ns(ec).then(n=>{let e=n==null?void 0:n.repos;return Array.isArray(e)?e.filter(t=>typeof t=="string"&&!t.startsWith("//")):(An=null,null)})),An}function pi(){return Mn!=null||(Mn=ns(nc).then(n=>{if(!Array.isArray(n))return Mn=null,null;let e=new Map;for(let t of n){if(typeof(t==null?void 0:t.title)!="string"||typeof t.code!="string")continue;let i=typeof t.preview=="string"?t.preview:null;e.set(es(t.title),h({title:t.title,code:t.code,description:typeof t.description=="string"?t.description:""},i?{imageURL:i.startsWith("http")?i:`${tc}${i}`}:{}))}return e})),Mn}async function yc(n){let e=await ts(`${ic}/${n}`);if((e==null?void 0:e.status)===404)return null;if(!(e!=null&&e.ok))return;let t=await e.json().catch(()=>null);return Array.isArray(t==null?void 0:t.topics)?t.topics.filter(i=>typeof i=="string"):void 0}async function ns(n){let e=await ts(n);return e!=null&&e.ok?e.json().catch(()=>null):null}async function ts(n){let e=typeof AbortController=="function"?new AbortController:null,t=setTimeout(()=>e==null?void 0:e.abort(),oc);try{return await fetch(n,{signal:e==null?void 0:e.signal})}catch(i){return null}finally{clearTimeout(t)}}function fc(n,e){let t=n[e.toLowerCase()];return t&&Date.now()-t.at<Qo?t.topics:void 0}function dc(){var n;try{let e=JSON.parse((n=localStorage.getItem(Zo))!=null?n:"{}");return e&&typeof e=="object"?e:{}}catch(e){return{}}}function pc(n){let e=Date.now(),t=Object.entries(n).filter(([,i])=>e-i.at<Qo).sort(([,i],[,o])=>o.at-i.at).slice(0,ac);try{localStorage.setItem(Zo,JSON.stringify(Object.fromEntries(t)))}catch(i){}}var mc=/^[0-9A-HJKMNP-TV-Z]{6}$/,gc=6,hc="SYN-",as=60,rs=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],cs="marketplace:installed:",$u=`${cs}snippet:`,Fe="marketplace:theme-installed",is="marketplace",os={added:0,removed:1,unchanged:2};function Ye(n){return`${hc}${n}`}function ls(n){let e=n.trim();if(e.length>200)return null;if(e.includes("/")){let i=e.split(/[?#]/)[0].replace(/\/+$/,"");e=i.slice(i.lastIndexOf("/")+1).replace(/\.json$/i,"")}e=e.toUpperCase().replace(/[\s-]/g,""),e.length===gc+3&&e.startsWith("SYN")&&(e=e.slice(3));let t=e.replace(/O/g,"0").replace(/[IL]/g,"1");return mc.test(t)?t:null}function us(n){let e=n;return!e||typeof e.code!="string"||!e.keys||typeof e.keys!="object"||!Object.values(e.keys).every(t=>typeof t=="string")?null:{code:e.code,name:typeof e.name=="string"&&e.name?e.name:null,updated_at:typeof e.updated_at=="number"?e.updated_at:0,keys:e.keys}}async function ys(n,e){let t=n.filter(s=>!yt(s)).map(s=>I(h({},s),{change:"added",isNew:!0})),i=On(t);for(let s of t)!i.has(s.key)&&!Sc(s,e[s.key])&&i.set(s.key,{kind:"catalog"});let o=await Dn(t,i),a=new Map;for(let[s,c]of[...o,...i])c.kind!=="unchecked"&&a.set(s,c);return{items:t,leftOut:a}}function Sc(n,e){if(n.type==="snippet")return!0;if(!n.repo)return!1;let t=wc(e);return n.type==="extension"?typeof(t==null?void 0:t.extensionURL)=="string"&&t.extensionURL!=="":typeof(t==null?void 0:t.cssURL)=="string"&&t.cssURL!==""}function fs(n,e){let t={};for(let[o,a]of rs){let s=e.filter(c=>c.type===a&&n[c.key]!==void 0).map(c=>c.key);t[o]=JSON.stringify(s);for(let c of s)t[c]=n[c]}let i=mi(n[Fe]);return i&&e.some(o=>o.key===i)&&(t[Fe]=n[Fe]),t}function ds(n,e,t,i,o){let a=o==="replace"?_n(e,void 0,t,i):kc(e,t),s=mi(n.keys[Fe]),c=s!==null&&e.some(l=>l.key===s)&&i!==null&&i.current_theme!==is;return I(h({},a),{manual:c?[{type:"theme",name:is}]:[]})}function kc(n,e){let t=new Set(e.map(s=>s.key)),i=new Set(n.map(s=>s.key)),o=[...n.map(s=>t.has(s.key)?I(h({},s),{change:"unchanged",isNew:!1}):I(h({},s),{change:"added",isNew:!0})),...e.filter(s=>!i.has(s.key)).map(s=>I(h({},s),{change:"unchanged",isNew:!1}))].sort((s,c)=>os[s.change]-os[c.change]||s.name.localeCompare(c.name)),a={added:0,removed:0,unchanged:0};for(let s of o)a[s.change]+=1;return{items:o,counts:a,manual:[]}}function ps(n,e){return new Set(n.items.filter(t=>t.type==="snippet"&&t.change==="added"&&(!e||!St(e,t.name))).map(t=>t.key))}async function ms(n,e,t,i){let o=await le(),a=V(o),s=V(n.keys),c={};for(let[p,m]of rs){let b=ss(o[p]),w=[...e==="add"?b:b.filter(k=>t.includes(k)||a.some(T=>T.key===k&&Tn(T,s)))];for(let k of s){if(k.type!==m||t.includes(k.key))continue;let T=b.includes(k.key);if(e==="add"&&T)continue;let A=m==="snippet"?bc(k,i,o[k.key]):n.keys[k.key];A!==void 0&&(c[k.key]=A,w.includes(k.key)||w.push(k.key))}c[p]=JSON.stringify(w)}let l=mi(n.keys[Fe]),y=ss(c["marketplace:installed-themes"]);l&&y.includes(l)&&!t.includes(l)&&(c[Fe]=n.keys[Fe]);let d=yi(o,c);return await ui(c,d),Object.keys(c).length+d.length}function bc(n,e,t){let i=e?St(e,n.name):void 0;return i?JSON.stringify(h({code:i.code,title:i.title,description:i.description},i.imageURL?{imageURL:i.imageURL}:{})):t}function mi(n){if(!n)return null;if(n.startsWith(cs))return n;try{let e=JSON.parse(n);return typeof e=="string"?e:null}catch(e){return null}}function ss(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function wc(n){try{let e=n?JSON.parse(n):null;return e&&typeof e=="object"&&!Array.isArray(e)?e:null}catch(e){return null}}var Ln="/api/shares",xc=`${Ln}/update`,vc=`${Ln}/delete`,Cc=`${Ln}/import`,Ic="x-syncify-user-hash",Nc={no_code:"This code doesn't exist.",too_many_codes:"You can't make more share codes. Delete one to make another.",daily_limit:"Too many changes to share codes today. Try again tomorrow.",too_large:"This setup is too big to share.",invalid_name:"Names are up to 60 characters.",empty:"There's nothing to share yet. Install something from Marketplace first.",invalid_items:"Syncify couldn't read some items. Reload Spotify and try again.",source:"Some items don't load from GitHub. Reload Spotify and try again.",blocked:"Some items are on Marketplace's block list. Reload Spotify and try again.",custom_snippet:"Custom snippets can't be shared. Reload Spotify and try again.",unchecked:"Couldn't check Marketplace's block list. Try again in a minute.",publish_failed:"Couldn't publish the code. Press Update on it to try again.",delete_failed:"Couldn't delete the code. Try again.",unavailable:"Share codes aren't available yet."},Ec=new Set(["offline","signed_out","invalid_signature","stale_salt","no_device_key","too_many_requests"]);function kt(n,e=null){var t;return n instanceof x&&Ec.has(n.code)?je(n):n instanceof x&&n.code==="too_many_codes"&&e!==null?`You have ${e} share codes already. Delete one to make another.`:(t=n instanceof x?Nc[n.code]:void 0)!=null?t:"Something went wrong. Try again."}async function gs(){let n=await vn(Ln,"GET");return{codes:Array.isArray(n==null?void 0:n.codes)?n.codes.flatMap(e=>{let t=_c(e);return t?[t]:[]}):[],max:typeof(n==null?void 0:n.max)=="number"?n.max:null}}async function hs(n,e){return xs(await vn(Ln,"POST",{name:n,keys:e}))}async function Ss(n,e,t){return xs(await vn(xc,"POST",{code:n,name:e,keys:t}))}async function ks(n){try{await vn(vc,"POST",{code:n})}catch(e){if(e instanceof x&&e.code==="no_code")return;throw e}}async function bs(n){let e=O().shareUrl.replace(/\/+$/,""),t;try{t=await fetch(`${e}/${n}.json`)}catch(o){throw new x("offline")}if(t.status===404||t.status===403)throw new x("no_code");if(!t.ok)throw new x("failed");let i=us(await t.json().catch(()=>null));if(!i||i.code!==n)throw new x("no_code");return i}async function ws(n,e){try{await Eo(Cc,{code:n},{[Ic]:e.hash})}catch(t){}}function _c(n){let e=n;return!e||typeof e.code!="string"?null:{code:e.code,name:typeof e.name=="string"&&e.name?e.name:null,link:typeof e.link=="string"?e.link:null,item_count:typeof e.item_count=="number"?e.item_count:0,imports:typeof e.imports=="number"?e.imports:0,created_at:typeof e.created_at=="number"?e.created_at:0,updated_at:typeof e.updated_at=="number"?e.updated_at:0}}function xs(n){let e=n;if(typeof(e==null?void 0:e.code)!="string")throw new x("failed");return{code:e.code,link:typeof e.link=="string"?e.link:null,leftOut:Array.isArray(e.left_out)?e.left_out.length:0}}var vs="/claims",Tc="/claims/cancel",Pc={no_backup:"Back up first, then secure your backup.",unsupported_identity:"This Spotify account can't be secured.",too_many_accounts:"Your account already has 10 Spotify accounts linked.",offline:"Couldn't reach Syncify. Check your connection and try again."},Me=class extends Error{constructor(t){var i;super((i=Pc[t])!=null?i:"Couldn't secure your backup. Try again.");this.code=t;this.name="ClaimError"}};async function Cs(n,e){let t=await gi(n,e,"GET",vs);if(!t.ok)throw new Me(await hi(t));let i=await t.json().catch(()=>null);return{claim:Nn(i==null?void 0:i.claim),accounts:Array.isArray(i==null?void 0:i.accounts)?i.accounts.filter(Ac):null}}async function Is(n,e){let t=await gi(n,e,"POST",vs);if(!t.ok)throw new Me(await hi(t));let i=await t.json().catch(()=>null);return Nn(i==null?void 0:i.claim)}async function Ns(n,e){let t=await gi(n,e,"POST",Tc);if(!t.ok&&t.status!==404)throw new Me(await hi(t))}async function gi(n,e,t,i){try{return await Te(n,e,{method:t},i)}catch(o){throw o instanceof TypeError?new Me("offline"):o}}async function hi(n){let e=await n.json().catch(()=>null);return typeof(e==null?void 0:e.code)=="string"?e.code:"failed"}function Ac(n){let e=n;return!!(e&&typeof e.hash=="string"&&(e.status==="pending"||e.status==="final"||e.status==="cancelled"))}var cn={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},Mc=/^([a-z0-9]|f([1-9]|1[0-2]))$/,Oc=250,Dc=40,Si=null,bt=null,rn=null;function Es(){return/mac/i.test(navigator.platform||navigator.userAgent)}function _s(n){if(n===null)return null;if(!n||typeof n!="object")return cn;let e=n;return typeof e.key!="string"||!Mc.test(e.key)?cn:{key:e.key,ctrl:!!e.ctrl,alt:!!e.alt,shift:!!e.shift,meta:!!e.meta}}function Un(n){if(!n)return"Off";let e=n.key.toUpperCase();return Es()?[n.ctrl?"\u2318":"",n.alt?"\u2325":"",n.shift?"\u21E7":"",e].join(""):[n.ctrl&&"Ctrl",n.meta&&"Win",n.alt&&"Alt",n.shift&&"Shift",e].filter(Boolean).join("+")}function Ts(n){if(n.key==="Escape")return{kind:"cancel"};let e=Lc(n.code);if(!e)return{kind:"ignore"};let t=Es();if(t&&n.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:e,ctrl:t?n.metaKey:n.ctrlKey,alt:n.altKey,shift:n.shiftKey,meta:t?!1:n.metaKey},o=e.startsWith("f")&&e.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!o?{kind:"error",message:`Include ${t?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function Lc(n){var t,i;let e=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(n);return e?((i=(t=e[1])!=null?t:e[2])!=null?i:e[3]).toLowerCase():null}function Ps(n){var e;if(rn&&Uc(rn,n))return!1;try{let t=Spicetify.Mousetrap,i=(e=t.trigger)==null?void 0:e.call(t)._directMap;if(!i)return!1;let o=ki(n);return Object.keys(i).some(a=>a.startsWith(`${o}:`))}catch(t){return!1}}function bi(n,e,t=0){if(Si=e,bt=n,!As()){if(t>=Dc){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>bi(bt,e,t+1),Oc);return}wi(bt)}function wi(n){if(bt=n,!As()||!Si)return;let e=Si;try{if(rn&&Spicetify.Keyboard._deregisterShortcut(rn),rn=null,!n)return;Spicetify.Keyboard.registerShortcut(n,t=>{t.preventDefault(),e()}),rn=n,console.debug("[Syncify]","Keyboard shortcut registered",Un(n))}catch(t){console.warn("[Syncify]","Failed to register keyboard shortcut",t)}}function As(){var n;return typeof((n=Spicetify.Keyboard)==null?void 0:n.registerShortcut)=="function"}function ki(n){return[n.ctrl&&"mod",n.meta&&"meta",n.alt&&"alt",n.shift&&"shift",n.key].filter(Boolean).join("+")}function Uc(n,e){return ki(n)===ki(e)}var xi="both",Bc=["both","topbar","menu"],Bn=null,Kn=null,wt=!1;function Ms(n){return Bc.includes(n)?n:xi}function Os(){var n;return typeof((n=Spicetify.Menu)==null?void 0:n.Item)=="function"}function Ds(n){Bn=n.topbarButton,Kn=n.menuItem}function xt(n){let e=n!=="menu"||!Kn,t=n!=="topbar";if(Bn!=null&&Bn.element&&(Bn.element.style.display=e?"":"none"),!!Kn)try{t&&!wt?(Kn.register(),wt=!0):!t&&wt&&(Kn.deregister(),wt=!1)}catch(i){console.warn("[Syncify]","Failed to update profile menu item",i)}}var Ct="syncify:config",vt={workerUrl:O().workerUrl,autoBackupEnabled:!1,shortcut:cn,entryPoint:xi};function ue(){var t,i;let n=O(),e=(i=(t=Spicetify.LocalStorage)==null?void 0:t.get(Ct))!=null?i:window.localStorage.getItem(Ct);if(!e)return I(h({},vt),{workerUrl:n.workerUrl});try{let o=JSON.parse(e);return{workerUrl:n.workerUrl,autoBackupEnabled:o.autoBackupEnabled===void 0?vt.autoBackupEnabled:!!o.autoBackupEnabled,shortcut:o.shortcut===void 0?vt.shortcut:_s(o.shortcut),entryPoint:Ms(o.entryPoint)}}catch(o){return I(h({},vt),{workerUrl:n.workerUrl})}}function It(n){var t;let e=JSON.stringify({workerUrl:O().workerUrl,autoBackupEnabled:n.autoBackupEnabled,shortcut:n.shortcut,entryPoint:n.entryPoint});if((t=Spicetify.LocalStorage)!=null&&t.set){Spicetify.LocalStorage.set(Ct,e);return}window.localStorage.setItem(Ct,e)}function $n(n){return typeof n.workerUrl=="string"&&n.workerUrl.length>0}var Kc=["username","canonicalUsername","id","uri","displayName"];async function he(){let{value:n,field:e}=await $c();return{hash:await lt(n),field:e}}async function $c(){var o;let n=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(n!=null&&n.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let e=await n.getUser(),t=Kc.find(a=>(e==null?void 0:e[a])!=null),i=t?e[t]:void 0;if(!t||!i)throw new Error("Unable to resolve the active Spotify user.");return{value:i,field:t}}async function Hn(n){if(!$n(n))throw new Error("Syncify backup service is not configured.");let[e,t]=await Promise.all([he(),Go()]);if(t.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:i,unapproved:o}=await Po(n.workerUrl,e,t);return{payload:t,unchanged:i,unapproved:o}}async function ln(n,e){var c;if(!$n(n))throw new Error("Syncify backup service is not configured.");let t=await ii(n.workerUrl,await he(),e),[i,o,a]=await Promise.all([Promise.all(t.backups.map(Ci)),t.safetyCopy?Ci(t.safetyCopy):null,Promise.all(t.unapproved.map(Ci))]),s=i.filter((l,y)=>i.findIndex(d=>d.payload_hash===l.payload_hash)===y);return I(h({},t),{payload:(c=s[0])!=null?c:null,backups:s,safetyCopy:o&&!s.some(l=>l.payload_hash===o.payload_hash)?o:null,unapproved:a.filter(l=>!s.some(y=>y.payload_hash===l.payload_hash))})}var vi=new Map;async function Ci(n){var a,s,c;let e=(s=(a=n.marketplace_data)==null?void 0:a.keys)!=null?s:{},t=n.spicetify_config?ri(n.spicetify_config,e):void 0,i=`${n.payload_hash} ${(c=n.metadata)==null?void 0:c.last_sync_datetime}`,o=vi.get(i);return o||(o=pt(e,t),vi.set(i,o),o.catch(()=>vi.delete(i))),I(h(h({},n),t?{spicetify_config:t}:{}),{payload_hash:await o})}async function Ls(n){let e=await ii(Fn(n),await he());return{claim:e.claim,install:e.install}}async function Us(n,e,t,i=[]){var c;let o=e!=null?e:(await ln(n)).payload;if(!o)throw new Error("No Syncify cloud backup was found for this Spotify account.");let a=await Vo(o,i),s=(c=o.backup)==null?void 0:c.id;return s&&$n(n)&&he().then(l=>Mo(n.workerUrl,l,s,t)).catch(()=>{}),{payload:o,restoredCount:a}}var jn=class extends Error{constructor(t){super("Couldn't back up your setup first, so nothing changed.");this.reason=t;this.name="SafetyBackupError"}};async function Bs(n,e,t,i,o){try{await Hn(n)}catch(s){throw new jn(s)}let a=await ms(e,t,i,o);return he().then(s=>ws(e.code,s)).catch(()=>{}),a}async function Ks(n){let e=await he(),t=await Cs(Fn(n),e);return I(h({},t),{hash:e.hash})}async function $s(n){await Is(Fn(n),await he())}async function Nt(n,e,t){await Ao(Fn(n),await he(),e,t)}async function Et(n){await Ns(Fn(n),await he())}function Fn(n){if(!$n(n))throw new Error("Syncify backup service is not configured.");return n.workerUrl}var _t="syncify:claim-check-day";async function Hs(n){var t,i,o;let e=ue();if(e.workerUrl){if(!e.autoBackupEnabled)return jc(n);try{let[a,s]=await Promise.all([mt(),ln(e)]);Fs(s,n);let c=(i=(t=s.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?i:0;if(s.exists&&Jo(a.keyCount,c)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((o=s.payload)==null?void 0:o.payload_hash)===a.hash||a.keyCount===0)return;let{unapproved:l}=await Hn(e);Spicetify.showNotification(l?"Syncify: backed up, waiting for approval":"Syncify auto-backup complete")}catch(a){if(a instanceof ge||a instanceof He){Spicetify.showNotification("Syncify: sign in to keep backing up",!0,8e3);return}let s=a instanceof Error?a.message:String(a);console.warn("Syncify startup sync failed:",a),Spicetify.showNotification(`Syncify auto-sync skipped: ${s}`,!0,8e3)}}}async function jc(n){let e=new Date().toLocaleDateString("en-CA");if(Fc()!==e)try{let t=await Ls(ue());js(e),Fs(t,n)}catch(t){if(t instanceof ge){js(e);return}console.warn("Syncify claim check failed:",t)}}function Fs(n,e){var o;let t=Hc(n.claim),i=(o=n.install)==null?void 0:o.waiting[0];t?e.onClaim(t):i&&e.onInstall(i)}function Hc(n){return(n==null?void 0:n.status)==="pending"&&!n.mine?n:null}function Fc(){var n,e;return(e=(n=Spicetify.LocalStorage)==null?void 0:n.get(_t))!=null?e:window.localStorage.getItem(_t)}function js(n){var e;(e=Spicetify.LocalStorage)!=null&&e.set?Spicetify.LocalStorage.set(_t,n):window.localStorage.setItem(_t,n)}var Ni="syncify:pending-restore",Yc=600*1e3,Wc=2e3,Rc=15e3,zc="marketplace:theme-installed",qc="raw.githubusercontent.com",Gc=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],Se=null,Ii=new Set,Rs=new Map;function zs(){return Se}function qs(n){return Ii.add(n),()=>Ii.delete(n)}function Gs(){Se&&Qs(I(h({},Se),{manual:[]}))}function Pt(n,e="restore"){try{localStorage.setItem(Ni,JSON.stringify({at:Date.now(),manual:n,kind:e}))}catch(t){}}function Vs(){var n;Pt((n=Se==null?void 0:Se.manual)!=null?n:[],Se==null?void 0:Se.kind),window.location.reload()}function Js(){ea()&&(document.addEventListener("load",n=>Ys(n.target,"load"),!0),document.addEventListener("error",n=>Ys(n.target,"error"),!0))}async function Xs(){let n=ea();if(!n)return;try{localStorage.removeItem(Ni)}catch(s){}let e=Date.now(),t=await Ws();for(;t.loaded<t.total&&Date.now()-e<Rc;)await new Promise(s=>setTimeout(s,Wc)),t=await Ws();Qs(I(h({kind:n.kind,at:Date.now()},t),{manual:n.manual}));let i=t.loaded===t.total&&n.manual.length===0,o=n.kind==="share"?"setup loaded":"backup restored",a=n.kind==="share"?"loaded":"restored";Spicetify.showNotification(i?`Syncify: ${o}. ${Vc(t)}.`:`Syncify: ${a} ${t.loaded} of ${t.total}. Open Syncify for details.`,!1,8e3)}function Zs(n){let e=n.map(t=>t.type==="extension"?`spicetify config extensions ${Tt(t.name)}`:t.type==="custom_app"?`spicetify config custom_apps ${Tt(t.name)}`:`spicetify config current_theme ${Tt(t.name)}${t.scheme?` color_scheme ${Tt(t.scheme)}`:""}`);return e.length>0?[...e,"spicetify apply"]:[]}function Vc(n){return n.total===1?"It loaded":`All ${n.total} loaded`}function Tt(n){return/^[\w.@+/-]+$/.test(n)?n:`"${n}"`}function Qs(n){Se=n;for(let e of Ii)e(n)}function ea(){var n;try{let e=JSON.parse((n=localStorage.getItem(Ni))!=null?n:"null");return!e||Date.now()-e.at>Yc?null:{manual:Array.isArray(e.manual)?e.manual:[],kind:e.kind==="share"?"share":"restore"}}catch(e){return null}}function Ys(n,e){n instanceof HTMLScriptElement&&n.src&&Rs.set(Yn(n.src),e)}async function Ws(){var i;let n=await le(),e=(i=n[zc])!=null?i:"",t=V(n).filter(o=>o.type==="extension"&&o.sources.length>0||o.type==="theme"&&e.includes(o.key)||o.type==="snippet");return{loaded:t.filter(Jc).length,total:t.length}}function Jc(n){var e,t;if(n.type==="snippet"){let i=document.querySelector("style.marketplaceSnippets");return((e=i==null?void 0:i.textContent)==null?void 0:e.includes(`/* ${n.name} - `))===!0}if(n.type==="theme"){let i=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((t=i==null?void 0:i.textContent)!=null&&t.trim())}return Xc(n.sources[0]).some(Zc)}function Xc(n){let e;try{e=new URL(n)}catch(s){return[]}if(e.host!==qc)return[Yn(e.href)];let[t,i,o,...a]=e.pathname.split("/").filter(Boolean);return!t||!i||!o||a.length===0?[]:Gc.map(s=>Yn(`https://${s}/gh/${t}/${i}@${o}/${a.join("/")}`))}function Zc(n){let e=Rs.get(n);return e?e==="load":[...document.querySelectorAll("script[src]")].some(i=>Yn(i.src)===n)&&performance.getEntriesByType("resource").some(i=>Yn(i.name)===n)}function Yn(n){try{let e=new URL(n);return`${e.origin}${e.pathname}`}catch(e){return n}}function Ei(n){return`A new install${n.device?` on ${n.device}`:""} wants to back up this Spotify account.`}function na(n){let e=Spicetify.React,t=e.useState,{install:i}=n,[o,a]=t(!1),[s,c]=t(null);async function l(y){a(!0),c(null);try{await Nt(ue(),i.id,y),Spicetify.showNotification(y==="approve"?"Syncify: install approved":"Syncify: install refused"),n.onDone(y)}catch(d){c(d instanceof Error?d.message:String(d)),a(!1)}}return e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-claim-notice"},Ei(i)," Approve it if it's yours."),s?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},s):null,e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:n.onClose,disabled:o},"Close"),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{l("reject")},disabled:o},"Not mine"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{l("approve")},disabled:o},"Approve")))}var Qc="syncify:beta",ta=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function ia(){var n;return(n=window.SyncifyLoader)!=null?n:null}function el(){try{return window.localStorage.getItem(Qc)==="true"}catch(n){return!1}}async function oa(n){let e=el()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(e.map(i=>nl(`${n}/${i}`)))).reduce((i,o)=>o&&(!i||Ti(o,i)>0)?o:i,null)}function _i(n){return typeof n=="string"&&ta.test(n)}function Ti(n,e){let[t,i]=[n,e].map(o=>{var y;let[,a,s,c,l]=(y=ta.exec(o))!=null?y:[];return[a,s,c,l!=null?l:1/0].map(Number)});for(let o=0;o<t.length;o+=1)if(t[o]!==i[o])return t[o]<i[o]?-1:1;return 0}async function nl(n,e=3e3){let t=typeof AbortController=="function"?new AbortController:null,i=setTimeout(()=>t==null?void 0:t.abort(),e);try{let o=await fetch(n,{signal:t==null?void 0:t.signal});if(!o.ok)return null;let a=await o.json();return _i(a==null?void 0:a.version)?a.version:null}catch(o){return null}finally{clearTimeout(i)}}function Mi(n={}){var Xi,Zi,Qi,eo,no,to,io,oo;let e=Spicetify.React,t=e.useEffect,i=e.useMemo,o=e.useState,a=e.useRef,[s,c]=o(()=>ue()),[l,y]=o("idle"),[d,p]=o(null),[m,b]=o(0),[E,w]=o([]),[k,T]=o([]),[A,J]=o(null),[ie,Y]=o(null),[$,oe]=o(null),[B,Q]=o(null),[se,S]=o([]),[v,ae]=o(null),[ee,W]=o([]),[j,D]=o(null),[ne,We]=o(!1),[Re,K]=o(()=>new Set),[N,R]=o(null),[ve,Ce]=o(!1),[ze,re]=o(!1),[Oe,L]=o(!1),[ce,fn]=o(null),[X,te]=o(!1),[qe,fe]=o(null),[Ge,De]=o((Xi=n.section)!=null?Xi:null),[P,Ie]=o(!1),[C,Ve]=o(()=>zs()),[Je,dn]=o(!1),[ke,Rn]=o(!1),[Xe,zn]=o(null),[Le,Ze]=o(void 0),[M,pn]=o(null),[Ne,Ut]=o(null),[be,qn]=o(null),[mn,gn]=o(!1),[f,g]=o(null),[z,de]=o(!1),[H,Bt]=o(null),[F,Kt]=o(null),Li=a(null),we=i(()=>O(),[]),Qe=i(()=>v?[...se,v]:se,[se,v]),$t=H?[]:ee,jt=H?(Zi=F==null?void 0:F.backups)!=null?Zi:[]:se,Ui=H?(Qi=F==null?void 0:F.safetyCopy)!=null?Qi:null:v,Bi=i(()=>{var r;return new Map([...Qe,...ee,...(r=F==null?void 0:F.backups)!=null?r:[],...F!=null&&F.safetyCopy?[F.safetyCopy]:[]].map(u=>[u,V(u.marketplace_data.keys)]))},[Qe,ee,F]),Gn=r=>{var u;return(u=Bi.get(r))!=null?u:V(r.marketplace_data.keys)},Sa=r=>Gn(r).map(u=>u.key),ka=r=>Gn(r).length,Z=i(()=>ze&&N?_n(Gn(N),N.spicetify_config,k,A):null,[ze,N,Bi,k,A]),Ee=i(()=>Z?On(Z.items):null,[Z]),Vn=i(()=>new Map([...ce!=null?ce:[],...Ee!=null?Ee:[]]),[ce,Ee]),Jn=((eo=N==null?void 0:N.backup)==null?void 0:eo.kind)==="quarantined",Ki=i(()=>{var r;return new Set(((r=Z==null?void 0:Z.items)!=null?r:[]).filter(u=>{var _;return u.change!=="removed"&&u.isNew&&(Jn||Ae(Vn.get(u.key))||((_=Vn.get(u.key))==null?void 0:_.kind)==="unchecked")}).map(u=>u.key))},[Z,Vn,Jn]),ba=[...Ki].filter(r=>!Re.has(r)),$i=Z!==null&&ce===null,Ht=i(()=>Os(),[]),ji=i(()=>ia()!==null,[]),pe=l==="loading",Xn=(d==null?void 0:d.kind)==="warning"||(d==null?void 0:d.kind)==="error"?d:null,Hi=!!(B&&$&&B.payload_hash!==$),hn=!!(B&&$&&B.payload_hash===$),Fi=!!(N&&$&&N.payload_hash===$),Zn=H!==null||P||!hn||Qe.length<2,wa=Zn?jt:jt.slice(0,1),Qn=(Ne==null?void 0:Ne.status)==="pending"&&!Ne.mine?Ne:null,Yi=ol(be,M,Qn!==null),et=(no=j==null?void 0:j.waiting[0])!=null?no:null,Wi=!j||j.trusted||M||Yi.kind==="secured"?null:j.refused?"This Spotify account refused backups from this install. Sign in to back up from it.":"This install isn't approved yet. Its backups are kept apart until you approve it from another install or sign in.",Ft=(Le?((to=be==null?void 0:be.accounts)!=null?to:[]).filter(r=>r.status==="final"):[]).map((r,u)=>({hash:r.hash,label:`Spotify account ${u+1}${r.device_info?` \xB7 from ${r.device_info}`:""}`})).filter(r=>r.hash!==(be==null?void 0:be.hash)),xa=!!($&&m>0&&!Qe.some(r=>r.payload_hash===$));t(()=>(G().catch(()=>null).then(r=>Ze(u=>u!=null?u:r)),me({silent:!0}),Na(),qs(Ve)),[]),t(()=>{if(fn(null),!Z||!Ee)return;[...Ee.values()].some(Ae)&&L(!0);let r=!0;return Dn(Z.items,Ee).then(u=>{r&&(fn(u),[...u.values()].some(Ae)&&L(!0))}),()=>{r=!1}},[Z,Ee]),t(()=>{if(!X)return;let r=u=>{var q;if(!((q=Li.current)!=null&&q.isConnected)){te(!1),fe(null);return}u.preventDefault(),u.stopImmediatePropagation();let _=Ts(u);if(_.kind!=="ignore"){if(_.kind==="cancel"){te(!1),fe(null);return}if(_.kind==="error"){fe(_.message);return}if(Ps(_.shortcut)){fe(`${Un(_.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}te(!1),Yt(_.shortcut)}};return window.addEventListener("keydown",r,!0),()=>window.removeEventListener("keydown",r,!0)},[X,s]);async function Ri(){let r=await mt();return oe(r.hash),b(r.installedItemCount),w(r.installedItems),T(r.items),J(r.spicetifyConfig),Y(r.marketplaceAvailable),r}async function me(r){try{re(!1),y("loading"),r!=null&&r.silent||p({kind:"info",text:"Checking your Syncify backup\u2026"}),await Ri();let u,_=null;try{u=await ln(s)}catch(qt){if(!(qt instanceof ge))throw qt;u=bl,_=qt.code}let q=await G().catch(()=>null),Be=q?await Ks(s).catch(()=>null):null,en=q?await G().catch(()=>null):null;Ze(en),qn(en?Be:null),pn(_),_&&De("account"),Ut(u.claim),Bt(null),Kt(null),Q(u.payload),S(u.backups),ae(u.safetyCopy),W(u.unapproved),D(u.install),R(u.payload),Ce(!0),y(u.exists?"success":"idle"),!(r!=null&&r.silent)&&!_&&p(u.exists&&u.payload?{kind:"success",text:`Backup found from ${un(u.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(u){kn(u)}}async function zi(){gn(!0),g(null);try{await $s(s)}catch(r){r instanceof Me&&["claim_pending","claimed"].includes(r.code)||g(r instanceof Error?r.message:String(r))}finally{await me({silent:!0}),gn(!1)}}function va(r){Ze(r),!M&&B?zi():me({silent:!0})}function qi(){Ze(null),qn(null),g(null),me({silent:!0})}async function Ca(){de(!0);try{await Et(s),Spicetify.showNotification("Syncify: claim sent for review"),await me({silent:!0})}catch(r){p({kind:"error",text:r instanceof Error?r.message:String(r)})}finally{de(!1)}}async function Ia(r){if(re(!1),Bt(r),Kt(null),!r){R(B);return}R(null);try{let u=await ln(s,r);Kt(u),R(u.payload)}catch(u){Bt(null),R(B),kn(u)}}async function Na(){let r=we.version;if(!_i(r))return;let u=await oa(we.releasesUrl);u&&Ti(u,r)>0&&zn(u)}function Ea(r){let u=I(h({},s),{autoBackupEnabled:r});c(u),It(u),p({kind:"success",text:r?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}function Yt(r){let u=I(h({},s),{shortcut:r});c(u),It(u),wi(r),fe(null),p({kind:"success",text:r?`${Un(r)} now opens Syncify.`:"Keyboard shortcut turned off."})}function _a(r){let u=I(h({},s),{entryPoint:r});c(u),It(u),xt(r)}function Sn(r){De(r),r!=="settings"&&te(!1)}function Ta(){fe(null),te(!0)}async function Pa(){try{re(!1),y("loading"),p({kind:"info",text:"Backing up your extensions and themes\u2026"});let{payload:r,unchanged:u,unapproved:_}=await Hn(s);if(await Ri(),_){await me({silent:!0}),p({kind:"warning",text:"Backed up, but kept apart until this install is approved."}),Spicetify.showNotification("Syncify: backed up, waiting for approval");return}if(u){Ce(!0),y("success"),p({kind:"success",text:"Everything is already backed up."}),Spicetify.showNotification("Syncify: everything is already backed up");return}Q(r),S(q=>[r,...q.filter(Be=>Be.payload_hash!==r.payload_hash)].slice(0,kl)),ae(q=>(q==null?void 0:q.payload_hash)===r.payload_hash?null:q),R(r),Ce(!0),y("success"),p({kind:"success",text:`Backed up ${r.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(r){kn(r)}}async function Gi(r){if(et){We(!0);try{await Nt(s,et.id,r),Spicetify.showNotification(r==="approve"?"Syncify: install approved":"Syncify: install refused"),await me({silent:!0})}catch(u){kn(u)}finally{We(!1)}}}function Aa(r=N){if(ie===!1){let u="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";p({kind:"error",text:u}),Spicetify.showNotification(u,!0,6e3);return}if(!r){let u="No Syncify cloud backup was found for this Spotify account.";p({kind:"error",text:u}),Spicetify.showNotification(u,!0,6e3);return}R(r),L(!1),K(new Set),re(!0)}async function Ma(){let r=N?_n(Gn(N),N.spicetify_config,k,A).manual:[];try{re(!1),y("loading"),p({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:u,restoredCount:_}=await Us(s,N!=null?N:void 0,H!=null?H:void 0,ba);R(u),y("success"),p({kind:"success",text:`Restored ${_} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),Pt(r),setTimeout(()=>window.location.reload(),1e3)}catch(u){kn(u)}}async function Oa(r){await da(r)&&(dn(!0),setTimeout(()=>dn(!1),2e3))}function Ue(r){if(r.startsWith("mailto:")){window.location.href=r;return}window.open(r,"_blank","noopener,noreferrer")}function kn(r){if(y("error"),r instanceof In){Rn(!0),p(null);return}if(r instanceof He){p({kind:"error",text:r.message}),me({silent:!0});return}if(r instanceof ge&&r.code!=="not_linked"){p(null),me({silent:!0});return}let u=r instanceof Error?r.message:String(r);p({kind:"error",text:u}),Spicetify.showNotification(u,!0,6e3)}function Wt(r,u){let _=(N==null?void 0:N.payload_hash)===r.payload_hash,q=r.payload_hash===$,Be=un(r.metadata.last_sync_datetime),en=la(ka(r));return e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":_,"data-selected":_?"true":"false",type:"button",key:`${r.payload_hash}-${r.metadata.last_sync_datetime}`,title:u!=null&&u.isSafetyCopy?"Kept aside and updated about once a week, so a burst of new backups can't replace it":u!=null&&u.isUnapproved?"From an install this Spotify account hasn't approved":void 0,onClick:()=>{R(r),re(!1)},disabled:pe},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),u!=null&&u.isSafetyCopy?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Safety copy"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 updated weekly")),e.createElement("span",{className:"syncify-muted"},Be," \xB7 ",en)):u!=null&&u.isUnapproved?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Not approved"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 ",Be)),e.createElement("span",{className:"syncify-muted"},en," \xB7 from ",r.metadata.device_info)):e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-backup-date"},Be),e.createElement("span",{className:"syncify-muted"},en," \xB7 from ",r.metadata.device_info)),q?e.createElement("span",{className:"syncify-tag",title:"What's on this device now"},"Current"):null,u!=null&&u.isSafetyCopy?e.createElement(pl,null):null,u!=null&&u.isUnapproved?e.createElement(Di,null):null)}function Rt(r){r.stopPropagation()}let Da=ke?"Update Syncify to keep backing up":M?"Sign in to restore":ve?B?Hi?"Changes since your last backup":"Everything is backed up":"No backup yet":l==="error"?"Couldn't check your backup":"Checking your backup\u2026",Vi=ke?"Your backups are safe":M?M==="not_owner"?"Secured by another account":"This backup is secured":ve?B?Hi?xl(B,Sa(B),E,A):`Last backup ${un(B.metadata.last_sync_datetime)}`:"Save your extensions and themes so you can restore them after a reinstall or on another computer.":null,Ji=!!(C&&!ke&&Date.now()-C.at<Sl),bn=!!(C&&C.loaded===C.total),zt=Zs((io=C==null?void 0:C.manual)!=null?io:[]);return e.createElement("div",{className:"syncify-panel",ref:Li,onClick:Rt,onMouseDown:Rt,onPointerDown:Rt},ke?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,"This version of Syncify is no longer supported."),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Ue(`${we.githubUrl}#updating`)},"How to update")):null,Qn?e.createElement("div",{className:"syncify-alert",role:"alert"},e.createElement("span",null,(oo=Qn.email)!=null?oo:"Someone"," is claiming this backup.",Le===null?" If that's you, sign in to finish.":Qn.held?" Syncify is reviewing it.":null),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Ca()},disabled:z},"Not me"),Le===null?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Sn("account")},"That's me, sign in"):null)):null,et?e.createElement("div",{className:"syncify-alert",role:"alert"},e.createElement("span",null,Ei(et)),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Gi("reject")},disabled:ne},"Not mine"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Gi("approve")},disabled:ne},"Approve"))):null,Wi?e.createElement("div",{className:"syncify-alert",role:"status"},e.createElement("span",null,Wi)):null,zt.length>0?e.createElement("div",{className:"syncify-alert syncify-manual",role:"status"},e.createElement("span",{className:"syncify-manual-header"},e.createElement("span",null,C.manual.length===1?"1 isn't from Marketplace. Add it in a terminal:":`${C.manual.length} aren't from Marketplace. Add them in a terminal:`),e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:Gs},e.createElement(Ai,null))),e.createElement("span",{className:"syncify-code"},e.createElement("code",null,zt.join(`
`)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Oa(zt.join(`
`))}},Je?"Copied":"Copy"))):null,Xn?e.createElement("div",{className:"syncify-alert","data-kind":Xn.kind},e.createElement("span",null,Xn.text),e.createElement("span",{className:"syncify-alert-actions"},Xn.kind==="error"?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{me()},disabled:pe},"Try again"):null,e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>p(null)},e.createElement(Ai,null)))):null,e.createElement("section",{className:"syncify-status","aria-live":"polite"},Ji&&C?e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},C.kind==="share"?bn?"Setup loaded":`Loaded ${C.loaded} of ${C.total}`:bn?"Backup restored":`Restored ${C.loaded} of ${C.total}`),e.createElement("p",{className:"syncify-muted"},bn?C.total===0?"Nothing from Marketplace to load":`${C.loaded} of ${C.total} loaded`:"Missing something? Reload Spotify once more."),bn&&C.kind==="restore"?e.createElement("p",{className:"syncify-muted"},"Syncify saved your setup?"," ",e.createElement("button",{className:"syncify-text-button syncify-inline-button",type:"button",onClick:()=>Ue(we.kofiUrl)},"Support it on Ko-fi")):null):e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},Da),e.createElement("p",{className:"syncify-muted"},Vi?`${Vi} \xB7 `:"",la(m)," on this device")),Ji&&!bn?e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:Vs},"Reload"):e.createElement("button",{className:"syncify-button",type:"button",onClick:Pa,disabled:pe||hn||ke||M!==null,title:M?"Sign in to back up":hn?"No changes since your last backup":void 0},pe?"Working\u2026":hn?"Backed up":"Back up now")),!ve||M||se.length>0||ee.length>0||Ft.length>0?e.createElement("section",{className:"syncify-section","aria-label":"Backups"},e.createElement("div",{className:"syncify-section-header"},e.createElement("h4",{className:"syncify-section-title"},"Backups"),e.createElement("span",{className:"syncify-section-controls"},!H&&hn&&Qe.length>1?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":P,"aria-controls":"syncify-backup-list",onClick:()=>{Ie(!P),re(!1)}},P?"Show less":`Show all ${Qe.length}`,e.createElement(yn,null)):null,!M&&Ft.length>0?e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select","aria-label":"Show backups from",value:H!=null?H:"",onChange:r=>{Ia(r.currentTarget.value||null)},disabled:pe},e.createElement("option",{value:""},"This Spotify account"),Ft.map(r=>e.createElement("option",{key:r.hash,value:r.hash},r.label))),e.createElement(yn,null)):null)),ve?M?e.createElement("p",{className:"syncify-locked"},e.createElement(ml,null),e.createElement("span",null,M==="not_owner"?"Sign in with the account that secured them":"Sign in to see and restore your backups")):H&&!F?e.createElement("p",{className:"syncify-muted"},"Loading backups\u2026"):jt.length===0&&$t.length===0?e.createElement("p",{className:"syncify-muted"},"No backups yet."):e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-list",id:"syncify-backup-list",role:"radiogroup","aria-label":"Choose a backup to restore"},wa.map(r=>Wt(r)),Zn&&Ui?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),Wt(Ui,{isSafetyCopy:!0})):null,Zn&&$t.length>0?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),$t.map(r=>Wt(r,{isUnapproved:!0}))):null),Zn?ie===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to restore a backup."):ze?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},"Restore"," ",N?un(N.metadata.last_sync_datetime):"this backup","?"),Jn?e.createElement("div",{className:"syncify-alert"},"An install this Spotify account hasn't approved made this backup. Its items stay off unless you turn them on."):null,Z?e.createElement(ya,{preview:Z,checks:Vn,off:Ki,allowed:Re,unapproved:Jn,onAllow:(r,u)=>{let _=new Set(Re);u?_.add(r):_.delete(r),K(_)},expanded:Oe,onToggle:()=>L(!Oe)}):null,e.createElement("div",{className:"syncify-actions"},xa?e.createElement("div",{className:"syncify-alert syncify-actions-hint"},"Your current setup isn't backed up."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>re(!1),disabled:pe},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:Ma,disabled:pe||$i},$i?"Checking\u2026":"Restore"))):e.createElement("div",{className:"syncify-actions"},Fi?e.createElement("span",{className:"syncify-muted syncify-actions-hint"},"This backup is already current."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>Aa(),disabled:pe||!N||Fi},"Restore backup")):null):e.createElement("div",{className:"syncify-backup-skeleton","aria-hidden":"true"},e.createElement("span",{className:"syncify-radio"}),e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-skeleton-line"}),e.createElement("span",{className:"syncify-skeleton-line wide"})))):null,e.createElement("div",{className:"syncify-accordion"},e.createElement(Pi,{id:"share",title:"Share",openSection:Ge,onToggle:Sn},e.createElement(rl,{config:s,session:Le,localItems:k,localConfig:A,marketplaceAvailable:ie,busy:pe,onSignIn:()=>Sn("account"),onSignedOut:qi})),e.createElement(Pi,{id:"account",title:"Account",openSection:Ge,onToggle:Sn},e.createElement(sl,{session:Le,locked:M,secure:Yi,securing:mn,secureError:f,onSecure:()=>{zi()},onSignedIn:va,onSignedOut:qi,onOpenWebsite:Ue})),e.createElement(Pi,{id:"settings",title:"Settings",openSection:Ge,onToggle:Sn},e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Back up automatically"),e.createElement("span",{className:"syncify-muted"},"When Spotify starts and something has changed")),e.createElement("input",{className:"syncify-switch",type:"checkbox",role:"switch",checked:s.autoBackupEnabled&&!ke,onChange:r=>Ea(r.currentTarget.checked),disabled:pe||ke})),e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Open Syncify from"),Ht?s.entryPoint==="menu"&&!s.shortcut?e.createElement("span",{className:"syncify-muted"},"Keep a shortcut in case a Spotify update breaks the menu"):null:e.createElement("span",{className:"syncify-muted"},"The profile menu isn't available in this Spicetify version")),e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select",value:Ht?s.entryPoint:"topbar",onChange:r=>_a(r.currentTarget.value),disabled:!Ht},wl.map(r=>e.createElement("option",{key:r.value,value:r.value},r.label))),e.createElement(yn,null))),e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Keyboard shortcut"),X&&!qe?e.createElement("span",{className:"syncify-muted"},"Press a key combination, or Esc to cancel"):null),e.createElement("span",{className:"syncify-shortcut"},s.shortcut&&!X?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Yt(null)},"Turn off"):null,!s.shortcut&&!X?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Yt(cn)},"Use default"):null,e.createElement("button",{className:"syncify-key",type:"button","data-recording":X?"true":"false",onClick:()=>X?te(!1):Ta(),title:"Click to change"},X?"Press keys\u2026":s.shortcut?Un(s.shortcut):"Off"))),qe?e.createElement("div",{className:"syncify-alert",role:"alert"},qe):null)),e.createElement("footer",{className:"syncify-footer"},e.createElement("span",{className:"syncify-footer-version"},e.createElement("span",null,"Syncify ",we.version),Xe?e.createElement("button",{className:"syncify-text-button syncify-update",type:"button",onClick:()=>ji?window.location.reload():Ue(`${we.githubUrl}#updating`)},Xe," is out \xB7 ",ji?"Reload":"How to update"):null),e.createElement("span",{className:"syncify-footer-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Ue(we.issueUrl)},"Report an issue"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Ue(we.githubUrl)},"GitHub"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Ue(we.kofiUrl)},"Support on Ko-fi"))))}var sa={added:{mark:"+",label:"Added"},removed:{mark:"\u2212",label:"Removed"},unchanged:{mark:"=",label:"Unchanged"}},ua=[["extension","Extensions"],["theme","Themes"],["snippet","Snippets"]],tl={extension:"extension",custom_app:"custom app",theme:"theme"};function ya(n){let e=Spicetify.React,{items:t,counts:i,manual:o}=n.preview,a=[...n.off].filter(s=>!n.allowed.has(s)).length;return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-chips","aria-label":"What changes on this device"},i.added?e.createElement("span",{className:"syncify-chip","data-change":"added"},"+",i.added," added"):null,i.removed?e.createElement("span",{className:"syncify-chip","data-change":"removed"},"\u2212",i.removed," removed"):null,i.unchanged?e.createElement("span",{className:"syncify-chip"},i.unchanged," unchanged"):null,o.length?e.createElement("span",{className:"syncify-chip"},o.length," to add manually"):null,a?e.createElement("span",{className:"syncify-chip","data-change":"off"},a," off"):null),t.length||o.length?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":n.expanded,"aria-controls":"syncify-restore-changes",onClick:n.onToggle},n.expanded?"Hide changes":"Show changes",e.createElement(yn,null)):null,n.expanded?e.createElement("div",{className:"syncify-changes",id:"syncify-restore-changes"},ua.map(([s,c])=>{let l=t.filter(y=>y.type===s);return l.length===0?null:e.createElement("section",{key:s,"aria-label":c},e.createElement("h5",{className:"syncify-change-group"},c),e.createElement("ul",{className:"syncify-change-list"},l.map(y=>{var d,p;return e.createElement("li",{className:"syncify-change",key:y.key},e.createElement("span",{className:"syncify-mark","data-change":y.change,role:"img","aria-label":sa[y.change].label},sa[y.change].mark),e.createElement("span",{className:"syncify-change-name"},y.name,y.repo?e.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",y.repo):null),n.checks.has(y.key)?e.createElement(fa,{check:n.checks.get(y.key)}):n.unapproved&&n.off.has(y.key)?e.createElement("span",{className:"syncify-source","data-warning":"true"},e.createElement(Di,null),"Not approved"):null,n.off.has(y.key)&&!((d=n.fixed)!=null&&d.has(y.key))?e.createElement("label",{className:"syncify-item-switch"},e.createElement("input",{type:"checkbox",checked:n.allowed.has(y.key),onChange:m=>n.onAllow(y.key,m.currentTarget.checked)}),(p=n.switchLabel)!=null?p:"Restore"):null)})))}),o.length?e.createElement("section",{"aria-label":"Add manually"},e.createElement("h5",{className:"syncify-change-group"},"Add manually"),e.createElement("ul",{className:"syncify-change-list"},o.map(s=>e.createElement("li",{className:"syncify-change",key:`${s.type}:${s.name}`},e.createElement("span",{className:"syncify-mark","aria-hidden":"true"}),e.createElement("span",{className:"syncify-change-name"},s.name,e.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",tl[s.type],s.scheme?`, ${s.scheme}`:"")))))):null):null)}var il={host:"Loads from outside GitHub",repo:"Its code is in a different repo than the one it names",blocked:"On Marketplace's block list",catalog:"Not in Marketplace's catalog",unchecked:"GitHub couldn't be reached to check it",custom:"A snippet made in Marketplace, not from its list"};function fa(n){let e=Spicetify.React,{check:t}=n,i=Ae(t),o=t.kind==="host"?`Code from ${t.host}`:t.kind==="repo"?`Code from ${t.repo}`:t.kind==="blocked"?"Blocked by Marketplace":t.kind==="catalog"?"Not in Marketplace":t.kind==="unchecked"?"Not checked":"Custom";return e.createElement("span",{className:"syncify-source","data-warning":i?"true":"false",title:il[t.kind]},i?e.createElement(Di,null):null,o)}function ol(n,e,t){var s,c;if(e==="not_owner")return{kind:"other-account"};if(!n)return t?{kind:"other-claim"}:{kind:"unknown"};let{claim:i}=n;if((i==null?void 0:i.status)==="final"){if(!i.mine)return{kind:"other-account"};let l=((s=n.accounts)!=null?s:[]).filter(y=>y.status==="final").length;return{kind:"secured",linkedCount:Math.max(l,1)}}if((i==null?void 0:i.status)==="pending")return i.mine?{kind:"pending",finalAt:i.final_at,held:i.held,waiting:i.waiting===!0}:{kind:"other-claim"};let o=((c=n.accounts)!=null?c:[]).filter(l=>l.hash===n.hash),a=o[o.length-1];return(a==null?void 0:a.status)==="cancelled"&&a.cancelled_by==="owner"?{kind:"cancelled"}:{kind:"open"}}function sl(n){let e=Spicetify.React,t=e.useEffect,i=e.useState,{session:o,secure:a}=n,[s,c]=i(()=>rt()),[l,y]=i(()=>rt().email),[d,p]=i(""),[m,b]=i(!1),[E,w]=i(null),[k,T]=i(()=>Date.now()),A=!!(s.codeSentAt&&k-s.codeSentAt<ul),J=Math.max(0,Math.ceil((s.retryAt-k)/1e3)),ie=s.retryEmail===null||s.retryEmail===l.trim().toLowerCase()?J:0;t(()=>{if(!o)return;let S=!0;return Co().then(v=>{!S||v||(w({kind:"warning",text:je(new x("signed_out"))}),n.onSignedOut())}).catch(()=>{}),()=>{S=!1}},[o==null?void 0:o.token]),t(()=>{if(s.retryAt<=Date.now())return;let S=setInterval(()=>{T(Date.now()),s.retryAt<=Date.now()&&clearInterval(S)},1e3);return()=>clearInterval(S)},[s.retryAt]);function Y(S){let v=h(h({},rt()),S);So(v),c(v),T(Date.now())}async function $(S){var ae;let v=S.trim();if(!fl.test(v)){w({kind:"error",text:"Enter a valid email address."});return}b(!0),w(null);try{let ee=await xo(v);Y({email:v,codeSentAt:Date.now(),retryAt:Date.now()+ee*1e3,retryEmail:v.toLowerCase()}),p("")}catch(ee){let W=ee instanceof x?ee:null,j=(ae=W==null?void 0:W.retryAfter)!=null?ae:null,D=j&&j<=yl?Date.now()+j*1e3:0,ne=(W==null?void 0:W.code)==="too_many_requests"?null:v.toLowerCase();if((W==null?void 0:W.code)==="resend_wait"){Y({email:v,codeSentAt:s.email===v&&s.codeSentAt?s.codeSentAt:Date.now(),retryAt:D,retryEmail:ne});return}D&&Y({retryAt:D,retryEmail:ne}),w({kind:"error",text:je(ee)})}finally{b(!1)}}async function oe(){b(!0),w(null);try{let S=await vo(s.email,d);Y({codeSentAt:null}),p(""),n.onSignedIn(S)}catch(S){w({kind:"error",text:je(S)});let v=S instanceof x?S.code:null;(v==="too_many_attempts"||v==="code_expired")&&p("")}finally{b(!1)}}async function B(){var v;let S=(v=o==null?void 0:o.email)!=null?v:"";b(!0),w(null),await Io(),Y({email:S,codeSentAt:null}),y(S),b(!1),n.onSignedOut()}async function Q(){b(!0),w(null);try{n.onOpenWebsite(await No())}catch(S){let v=S instanceof x&&S.code==="signed_out";w({kind:v?"warning":"error",text:je(S)}),v&&n.onSignedOut()}finally{b(!1)}}let se=E?e.createElement("div",{className:"syncify-alert","data-kind":E.kind==="error"?"error":void 0,role:"alert"},E.text):null;if(o===void 0)return null;if(o){let S=a.kind==="open"||a.kind==="other-claim"||a.kind==="cancelled";return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",{className:"syncify-account-email"},o.email),a.kind==="secured"?e.createElement("span",{className:"syncify-muted"},"Backup secured \xB7"," ",a.linkedCount===1?"1 Spotify account linked":`${a.linkedCount} Spotify accounts linked`):a.kind==="pending"?e.createElement("span",{className:"syncify-muted syncify-account-state"},e.createElement(gl,null),e.createElement("span",null,"Securing this backup \xB7"," ",a.waiting?"waiting on sign-in":a.held?"in review":`final ${Oi(a.finalAt)}`)):a.kind==="other-account"?e.createElement("span",{className:"syncify-muted"},"This backup is secured by another account"):e.createElement("span",{className:"syncify-muted"},"Signed in")),e.createElement("span",{className:"syncify-account-actions"},e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-label":"Manage on the website",onClick:()=>{Q()},disabled:m},"Manage",e.createElement(hl,null)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{B()},disabled:m},"Sign out"))),S?e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it")),e.createElement("button",{className:"syncify-button",type:"button",onClick:n.onSecure,disabled:m||n.securing||a.kind==="other-claim"},n.securing?"Securing\u2026":a.kind==="cancelled"?"Secure again":"Secure")):null,a.kind==="other-claim"?e.createElement("div",{className:"syncify-alert",role:"status"},"Another claim is pending. If it isn't yours, press Not me above and Syncify will review it."):a.kind==="cancelled"?e.createElement("div",{className:"syncify-alert",role:"status"},"Your claim was cancelled from this Spotify account."):a.kind==="pending"&&a.waiting?e.createElement("div",{className:"syncify-alert",role:"status"},"Syncify ran on this Spotify account without you signed in, maybe after a Spotify update or on another computer. Sign in to Syncify there to finish linking."):null,n.secureError?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},n.secureError):null,se)}return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting"},n.locked?e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Sign in to restore"),e.createElement("span",{className:"syncify-muted"},"With the email that secured this backup")):e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it"))),e.createElement("form",{className:"syncify-confirm",noValidate:!0,onSubmit:S=>{S.preventDefault(),!m&&(A?d.length===At&&oe():ie||$(l))}},A?e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-muted"},"Code sent to ",dl(s.email)),e.createElement("div",{className:"syncify-field"},e.createElement("input",{className:"syncify-input syncify-code-input",type:"text",inputMode:"numeric",autoComplete:"one-time-code","aria-label":"6-digit code",placeholder:"123456",maxLength:At,value:d,onChange:S=>p(S.currentTarget.value.replace(/\D/g,"").slice(0,At)),autoFocus:!0}),e.createElement("button",{className:"syncify-button",type:"submit",disabled:m||d.length!==At},m?"Verifying\u2026":"Verify")),e.createElement("p",{className:"syncify-muted syncify-account-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{$(s.email)},disabled:m||J>0},J>0?`Resend in ${ca(J)}`:"Resend code"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Y({codeSentAt:null}),p(""),w(null)},disabled:m},"Use another email"))):e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-field"},e.createElement("input",{className:"syncify-input",type:"email",autoComplete:"email","aria-label":"Email",placeholder:"you@example.com",value:l,onChange:S=>y(S.currentTarget.value),autoFocus:!0}),e.createElement("button",{className:"syncify-button",type:"submit",disabled:m||ie>0||!l.trim()},m?"Sending\u2026":"Send code")),e.createElement("p",{className:"syncify-muted"},ie>0?`Send another code in ${ca(ie)}`:"We only email sign-in codes.")),se))}var al=[["add","Add to my setup"],["replace","Replace my setup"]];function rl(n){var gn;let e=Spicetify.React,t=e.useEffect,i=e.useMemo,o=e.useRef,a=e.useState,{session:s}=n,[c,l]=a(""),[y,d]=a(!1),[p,m]=a(null),[b,E]=a(null),[w,k]=a("add"),[T,A]=a(!1),[J,ie]=a(()=>new Set),[Y,$]=a(null),[oe,B]=a(void 0),[Q,se]=a(!1),[S,v]=a(null),[ae,ee]=a(null),[W,j]=a(null),[D,ne]=a(null),[We,Re]=a(""),[K,N]=a(null),[R,ve]=a(!1),[Ce,ze]=a(!1),[re,Oe]=a(null),[L,ce]=a(null),[fn,X]=a(null),[te,qe]=a(!1),[fe,Ge]=a(null),De=o(0),P=i(()=>b?ds(b.file,b.items,n.localItems,n.localConfig,w):null,[b,n.localItems,n.localConfig,w]),Ie=i(()=>{if(!P||!b)return null;let f=new Set(b.items.map(g=>g.key));return P.items.filter(g=>g.change!=="removed"&&f.has(g.key)&&(w==="replace"||g.isNew))},[P,b,w]),C=i(()=>Ie?On(Ie):null,[Ie]),Ve=i(()=>new Map([...Y!=null?Y:[],...C!=null?C:[]]),[Y,C]),Je=i(()=>P&&oe!==void 0?ps(P,oe):new Set,[P,oe]),dn=i(()=>{var f;return new Set([...((f=P==null?void 0:P.items)!=null?f:[]).filter(g=>{var z;return g.change!=="removed"&&g.isNew&&(Ae(Ve.get(g.key))||((z=Ve.get(g.key))==null?void 0:z.kind)==="unchecked")}).map(g=>g.key),...Je])},[P,Ve,Je]),ke=[...dn].filter(f=>Je.has(f)||!J.has(f)),Rn=P!==null&&(Y===null||oe===void 0),Xe=K?K.items.filter(f=>!K.leftOut.has(f.key)):[],zn=!!(S&&ae!==null&&S.length>=ae);t(()=>{if($(null),!Ie||!C)return;[...C.values()].some(Ae)&&A(!0);let f=!0;return Dn(Ie,C).then(g=>{f&&($(g),[...g.values()].some(Ae)&&A(!0))}),()=>{f=!1}},[Ie,C]),t(()=>{v(null),ne(null),ce(null),s&&M()},[s==null?void 0:s.token]);async function Le(){let f=ls(c);if(m(null),E(null),!f){m(kt(new x("no_code")));return}d(!0);try{let g=await bs(f);k("add"),ie(new Set),A(!1),E({file:g,items:V(g.keys)}),pi().then(B)}catch(g){m(kt(g))}finally{d(!1)}}async function Ze(){if(!(!b||!P)){se(!0),m(null);try{await Bs(n.config,b.file,w,ke,oe!=null?oe:null),Spicetify.showNotification("Syncify: setup loaded. Reloading\u2026"),Pt(P.manual,"share"),setTimeout(()=>window.location.reload(),1e3)}catch(f){se(!1),m(f instanceof jn?`${f.message} ${ll(f.reason)}`:f instanceof Error?f.message:String(f))}}}async function M(){j(null);try{let f=await gs();v(f.codes),ee(f.max)}catch(f){pn(f,j)}}function pn(f,g){g(kt(f,ae)),f instanceof x&&f.code==="signed_out"&&n.onSignedOut()}async function Ne(f){var z;let g=++De.current;ne({code:f}),Re((z=f==null?void 0:f.name)!=null?z:""),N(null),ve(!1),Oe(null),ce(null),X(null);try{let de=await le(),H=await ys(V(de),de);if(g!==De.current)return;N(h({keys:de},H)),H.leftOut.size>0&&ve(!0)}catch(de){if(g!==De.current)return;ne(null),Oe(de instanceof Error?de.message:String(de))}}function Ut(){De.current+=1,ne(null),N(null)}async function be(){if(!D||!K)return;ze(!0),Oe(null);let f=fs(K.keys,Xe);try{let g=D.code?await Ss(D.code.code,We.trim(),f):await hs(We.trim(),f);ce(I(h({},g),{updated:D.code!==null})),ne(null),N(null),await M()}catch(g){pn(g,Oe),g instanceof x&&g.code==="publish_failed"&&(ne(null),M())}finally{ze(!1)}}async function qn(f){qe(!0),j(null);try{await ks(f),X(null),(L==null?void 0:L.code)===f&&ce(null),await M()}catch(g){pn(g,j)}finally{qe(!1)}}async function mn(f,g){await da(f)&&(Ge(g),setTimeout(()=>Ge(z=>z===g?null:z),2e3))}return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Have a code?"),e.createElement("span",{className:"syncify-muted"},"Load a setup someone shared"))),e.createElement("form",{className:"syncify-field",noValidate:!0,onSubmit:f=>{f.preventDefault(),!y&&!Q&&c.trim()&&Le()}},e.createElement("input",{className:"syncify-input syncify-share-input",type:"text","aria-label":"Share code or link",placeholder:"SYN-7KQ2M9",autoComplete:"off",spellCheck:!1,value:c,onChange:f=>l(f.currentTarget.value),disabled:Q}),e.createElement("button",{className:"syncify-button secondary",type:"submit",disabled:y||Q||!c.trim()},y?"Loading\u2026":"Preview")),p?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},p):null,b&&P?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},"Load ",(gn=b.file.name)!=null?gn:Ye(b.file.code),"?"),e.createElement("div",{className:"syncify-share-modes",role:"radiogroup","aria-label":"How to load it"},al.map(([f,g])=>e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":w===f,"data-selected":w===f?"true":"false",type:"button",key:f,onClick:()=>k(f),disabled:Q},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,g))))),e.createElement(ya,{preview:P,checks:Ve,off:dn,fixed:Je,switchLabel:"Load",allowed:J,unapproved:!1,onAllow:(f,g)=>{let z=new Set(J);g?z.add(f):z.delete(f),ie(z)},expanded:T,onToggle:()=>A(!T)}),n.marketplaceAvailable===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to load a setup."):e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>E(null),disabled:Q},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{Ze()},disabled:Q||Rn||n.busy},Q?"Applying\u2026":Rn?"Checking\u2026":"Apply"))):null,s===void 0?null:s?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting syncify-share-part"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Share this setup"),e.createElement("span",{className:"syncify-muted"},S&&S.length>0&&ae!==null?`${S.length} of ${ae} codes`:"Get a code anyone can load")),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{Ne(null)},disabled:D!==null||S===null||zn||n.marketplaceAvailable===!1,title:zn?"Delete a code to make another":void 0},"Share")),D?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},D.code?`Update ${Ye(D.code.code)} with this setup?`:"Share this setup?"),K?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-chips","aria-label":"What goes in"},e.createElement("span",{className:"syncify-chip"},Xe.length," going in"),K.leftOut.size?e.createElement("span",{className:"syncify-chip","data-change":"off"},K.leftOut.size," left out"):null),K.items.length?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":R,"aria-controls":"syncify-share-items",onClick:()=>ve(!R)},R?"Hide items":"Show items",e.createElement(yn,null)):null,R?e.createElement(cl,{items:K.items,leftOut:K.leftOut}):null,e.createElement("input",{className:"syncify-input",type:"text","aria-label":"Name",placeholder:"Name (optional)",maxLength:as,value:We,onChange:f=>Re(f.currentTarget.value),disabled:Ce})):e.createElement("p",{className:"syncify-muted"},"Checking your items\u2026"),e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:Ut,disabled:Ce},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{be()},disabled:!K||Xe.length===0||Ce},K?Ce?D.code?"Updating\u2026":"Creating\u2026":D.code?"Update":"Create code":"Checking\u2026"))):null,re?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},re):null,L?e.createElement("div",{className:"syncify-confirm"},e.createElement("span",{className:"syncify-manual-header"},e.createElement("span",{className:"syncify-confirm-title"},L.updated?"Code updated":"Your code is ready"),e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>ce(null)},e.createElement(Ai,null))),e.createElement("span",{className:"syncify-code syncify-share-code"},e.createElement("code",null,Ye(L.code)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{mn(Ye(L.code),"saved-code")}},fe==="saved-code"?"Copied":"Copy code"),L.link?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{mn(L.link,"saved-link")}},fe==="saved-link"?"Copied":"Copy link"):null),L.leftOut?e.createElement("p",{className:"syncify-muted"},L.leftOut===1?"1 snippet isn't in Marketplace's list anymore, so it was left out.":`${L.leftOut} snippets aren't in Marketplace's list anymore, so they were left out.`):null):null,W?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,W),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{M()}},"Try again"))):null,S&&S.length>0?e.createElement("section",{"aria-label":"Your codes"},e.createElement("h5",{className:"syncify-change-group"},"Your codes"),e.createElement("ul",{className:"syncify-change-list syncify-share-codes"},S.map(f=>{var g;return e.createElement("li",{className:"syncify-setting",key:f.code},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",{className:"syncify-account-email"},(g=f.name)!=null?g:Ye(f.code)),e.createElement("span",{className:"syncify-muted"},fn===f.code?"Delete it? Its link stops working.":[f.name?Ye(f.code):null,ra(f.item_count,"item"),ra(f.imports,"import")].filter(Boolean).join(" \xB7 "))),e.createElement("span",{className:"syncify-account-actions"},fn===f.code?e.createElement(e.Fragment,null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>X(null),disabled:te},"Cancel"),e.createElement("button",{className:"syncify-text-button","data-danger":"true",type:"button",onClick:()=>{qn(f.code)},disabled:te},te?"Deleting\u2026":"Delete")):e.createElement(e.Fragment,null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Ne(f)},disabled:D!==null||te},"Update"),f.link?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{mn(f.link,f.code)}},fe===f.code?"Copied":"Copy link"):null,e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>X(f.code),disabled:te},"Delete"))))}))):null):e.createElement("div",{className:"syncify-setting syncify-share-part"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Share this setup"),e.createElement("span",{className:"syncify-muted"},"Get a code anyone can load")),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:n.onSignIn},"Sign in to share")))}var aa={in:{mark:"+",label:"Goes in"},out:{mark:"\u2212",label:"Left out"}};function cl(n){let e=Spicetify.React;return e.createElement("div",{className:"syncify-changes",id:"syncify-share-items"},ua.map(([t,i])=>{let o=n.items.filter(a=>a.type===t).sort((a,s)=>a.name.localeCompare(s.name));return o.length===0?null:e.createElement("section",{key:t,"aria-label":i},e.createElement("h5",{className:"syncify-change-group"},i),e.createElement("ul",{className:"syncify-change-list"},o.map(a=>{let s=n.leftOut.get(a.key),c=s?aa.out:aa.in;return e.createElement("li",{className:"syncify-change",key:a.key},e.createElement("span",{className:"syncify-mark","data-change":s?"removed":"added",role:"img","aria-label":c.label},c.mark),e.createElement("span",{className:"syncify-change-name"},a.name,a.repo?e.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",a.repo):null),s?e.createElement(fa,{check:s}):null)})))}))}function ll(n){return n instanceof ge?"Sign in to back up.":n instanceof Error?n.message:String(n)}async function da(n){var e;try{return await navigator.clipboard.writeText(n),!0}catch(t){let i=(e=Spicetify.Platform)==null?void 0:e.ClipboardAPI;return i!=null&&i.copy?(await i.copy(n),!0):!1}}function ra(n,e){return`${n} ${e}${n===1?"":"s"}`}var At=6,ul=600*1e3,yl=300,fl=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function dl(n){let e=n.lastIndexOf("@");return e<1?n:`${n[0]}***${n.slice(e)}`}function Oi(n){let e=un(new Date(n).toISOString());return e.startsWith("today")?e:`on ${e}`}function ca(n){return`${Math.floor(n/60)}:${String(n%60).padStart(2,"0")}`}function Pi(n){let e=Spicetify.React,t=n.openSection===n.id,i=`syncify-section-${n.id}`;return e.createElement("section",{className:"syncify-accordion-section","aria-label":n.title},e.createElement("button",{className:"syncify-accordion-header",type:"button","aria-expanded":t,"aria-controls":i,onClick:()=>n.onToggle(t?null:n.id)},e.createElement("span",{className:"syncify-accordion-title"},n.title),e.createElement(yn,null)),t?e.createElement("div",{className:"syncify-accordion-body",id:i},n.children):null)}function pl(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-shield",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"}))}function Di(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-warning-icon",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M12 3 2 21h20z"}),n.createElement("path",{d:"M12 10v5"}),n.createElement("path",{d:"M12 18h.01"}))}function yn(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-chevron",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"m9 6 6 6-6 6"}))}function ml(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-lock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("rect",{x:"5",y:"11",width:"14",height:"10",rx:"2"}),n.createElement("path",{d:"M8 11V7a4 4 0 0 1 8 0v4"}))}function gl(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-clock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"9"}),n.createElement("path",{d:"M12 7v5l3 2"}))}function hl(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-external",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M14 4h6v6"}),n.createElement("path",{d:"M20 4 10 14"}),n.createElement("path",{d:"M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"}))}function Ai(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M18 6 6 18"}),n.createElement("path",{d:"m6 6 12 12"}))}var Sl=600*1e3,kl=3,bl={exists:!1,payload:null,backups:[],safetyCopy:null,claim:null,unapproved:[],install:null},wl=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function xl(n,e,t,i){var E;let o=new Set(e),a=new Set(t),s=t.filter(w=>!o.has(w)).length,c=e.filter(w=>!a.has(w)).length,l=(E=n.spicetify_config)!=null?E:null,y=!!(i&&!l),d=!y&&(i&&l?!Ko(i,l):i!==l),p=[s?`${s} added`:null,c?`${c} removed`:null,d?"Spicetify config changed":null].filter(Boolean),m=un(n.metadata.last_sync_datetime),b=p.length?`${p.join(", ")} since ${m}`:`Last backup ${m}`;return y?`${b} \xB7 Spicetify config not saved yet`:b}function la(n){return n===1?"1 extension or theme":`${n} extensions and themes`}function un(n){let e=new Date(n);if(Number.isNaN(e.getTime()))return n;let t=e.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),i=new Date,o=new Date(i);return o.setDate(i.getDate()-1),e.toDateString()===i.toDateString()?`today, ${t}`:e.toDateString()===o.toDateString()?`yesterday, ${t}`:`${e.toLocaleDateString(void 0,{month:"short",day:"numeric",year:e.getFullYear()===i.getFullYear()?void 0:"numeric"})}, ${t}`}function pa(n){var y;let e=Spicetify.React,t=e.useState,{claim:i}=n,[o,a]=t(!1),[s,c]=t(null);async function l(){a(!0),c(null);try{await Et(ue()),Spicetify.showNotification("Syncify: claim sent for review"),n.onClose()}catch(d){c(d instanceof Error?d.message:String(d)),a(!1)}}return e.createElement("div",{className:"syncify-panel"},e.createElement("p",{className:"syncify-claim-notice"},(y=i.email)!=null?y:"Someone"," is claiming this backup."," ",n.signedIn?i.held?"Syncify is reviewing it.":`It goes through ${Oi(i.final_at)} unless you stop it.`:"If that's you, sign in to finish."),s?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},s):null,e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:n.onClose,disabled:o},"Close"),e.createElement("button",{className:n.signedIn?"syncify-button":"syncify-button secondary",type:"button",onClick:()=>{l()},disabled:o},"Not me"),n.signedIn?null:e.createElement("button",{className:"syncify-button",type:"button",onClick:n.onSignIn,disabled:o},"That's me, sign in")))}var Mt="[Syncify]";function ye(n,e){if(e===void 0){console.debug(Mt,n);return}console.debug(Mt,n,e)}function Wn(n,e){if(e===void 0){console.warn(Mt,n);return}console.warn(Mt,n,e)}function vl(){var n;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((n=Spicetify==null?void 0:Spicetify.Topbar)!=null&&n.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var ga="syncify-styles";function Cl(){if(document.getElementById(ga)){ye("Another copy of Syncify is running; stopping this one");return}Il();let n=ue();Ds({topbarButton:Nl(),menuItem:Ml()}),xt(n.entryPoint),bi(n.shortcut,Lt),Hs({onClaim:e=>{Ll(e)},onInstall:Ul}).catch(e=>{Wn("Startup sync check failed",e)}),Xs().catch(e=>{Wn("Restore check failed",e)})}function Il(){let n=document.createElement("style");n.id=ga,n.textContent=ro,document.head.appendChild(n)}function Nl(){let{extensionName:n}=O(),e=new Spicetify.Topbar.Button(n,Gt,t=>{ye("Topbar button clicked",Ot(t)),Lt()},!1,!0);return ha(e),Tl(e),Dl(e),ye("Topbar button registered",Ot(e)),e}function ha(n){var t;let e=n;n.element.style.setProperty("-webkit-app-region","no-drag"),(t=e.button)==null||t.style.setProperty("-webkit-app-region","no-drag")}var ma=".main-actionButtons",El=".Root__globalNav, .Root__top-bar",_l=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function Tl(n){if(typeof MutationObserver=="undefined")return;let e=!1,t=null,i=()=>{e=!1,a();let s=n.element,c=document.querySelector(ma);!s||!c||c.contains(s)||(c.prepend(s),Pl(n),ha(n),ye("Topbar button re-attached",Ot(n)))},o=new MutationObserver(()=>{e||(e=!0,setTimeout(i,250))}),a=()=>{var l;if(t!=null&&t.isConnected)return;let s=document.querySelector(ma),c=(l=s==null?void 0:s.closest(El))!=null?l:s==null?void 0:s.parentElement;if(o.disconnect(),t=c!=null?c:null,!c){o.observe(document.body,{childList:!0,subtree:!0});return}o.observe(c,{childList:!0,subtree:!0});for(let y=c.parentElement;y;y=y.parentElement)o.observe(y,{childList:!0})};i()}function Pl(n){let e=Al(n);if(!e||e.className&&e.className!=="undefined")return;let t=Array.from(document.querySelectorAll(_l)).find(i=>!n.element.contains(i));t!=null&&t.className&&(e.className=t.className)}function Al(n){return n.button}function Ml(){var n;if(typeof((n=Spicetify.Menu)==null?void 0:n.Item)!="function")return null;try{return new Spicetify.Menu.Item(O().extensionName,!1,()=>Lt(),Ol())}catch(e){return Wn("Failed to create profile menu item",e),null}}function Ol(){return Gt.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function Dl(n){Object.assign(window,{SyncifyDebug:{button:n,element:n.element,openModal:Lt,inspect:()=>Ot(n),clickElement:()=>{var e;return(e=n.element)==null?void 0:e.click()},clickInnerButton:()=>{var e;return(e=n.button)==null?void 0:e.click()},clickCallback:()=>n.onClick(n)}})}function Ot(n){var e,t,i,o,a;return{label:n.label,disabled:n.disabled,isRight:n.isRight,hasElement:!!n.element,elementConnected:(e=n.element)==null?void 0:e.isConnected,elementDisabled:(t=n.element)==null?void 0:t.disabled,elementAriaDisabled:(i=n.element)==null?void 0:i.getAttribute("aria-disabled"),elementClass:(o=n.element)==null?void 0:o.className,appRegion:n.element?getComputedStyle(n.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:n.button?getComputedStyle(n.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:n.element?getComputedStyle(n.element).pointerEvents:null,visibility:n.element?getComputedStyle(n.element).visibility:null,display:n.element?getComputedStyle(n.element).display:null,rect:(a=n.element)==null?void 0:a.getBoundingClientRect().toJSON()}}var U=null;function Lt(){if(U!=null&&U.container.isConnected){ye("Closing modal"),Spicetify.PopupModal.hide();return}ye("Opening modal"),Dt(Spicetify.React.createElement(Mi))}async function Ll(n){let e=await G().catch(()=>null);U!=null&&U.container.isConnected||(ye("Opening claim notice"),Dt(Spicetify.React.createElement(pa,{claim:n,signedIn:e!==null,onSignIn:()=>Dt(Spicetify.React.createElement(Mi,{section:"account"})),onClose:()=>Spicetify.PopupModal.hide()})))}function Ul(n){if(U!=null&&U.container.isConnected)return;ye("Opening install notice");let e=()=>Spicetify.PopupModal.hide();Dt(Spicetify.React.createElement("div",{className:"syncify-panel"},Spicetify.React.createElement(na,{install:n,onDone:e,onClose:e})))}function Dt(n){var t;(t=U==null?void 0:U.root)==null||t.unmount();let e=document.createElement("div");U={container:e,root:null};try{Spicetify.PopupModal.display({title:O().extensionName,content:e,isLarge:!1})}catch(i){throw Wn("Failed to open PopupModal",i),i}Bl(e),$l(e,n)}function Bl(n){requestAnimationFrame(()=>{let e=Kl(n);e==null||e.classList.add("syncify-modal-shell");let t=e==null?void 0:e.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');t&&(t.classList.add("syncify-modal-close"),t.setAttribute("aria-label",`Close ${O().extensionName}`),t.title="Close",t.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function Kl(n){let e=n.parentElement;for(;e&&e!==document.body;){if(e.querySelector(".main-trackCreditsModal-header"))return e;e=e.parentElement}return n.closest('[class*="trackCreditsModal"]')}function $l(n,e){try{if(typeof Spicetify.ReactDOM.createRoot=="function"){let t=Spicetify.ReactDOM.createRoot(n);t.render(e),(U==null?void 0:U.container)===n&&(U.root=t),ye("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(e,n),ye("Modal rendered",{renderer:"render"})}catch(t){throw Wn("Failed to render modal",t),t}}Js();(function n(){if(!vl()){setTimeout(n,100);return}ye("Spicetify APIs ready"),Cl()})();})();
