// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var Js=Object.defineProperty,Xs=Object.defineProperties;var Zs=Object.getOwnPropertyDescriptors;var Mi=Object.getOwnPropertySymbols;var Qs=Object.prototype.hasOwnProperty,ea=Object.prototype.propertyIsEnumerable;var Di=(n,e,t)=>e in n?Js(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,g=(n,e)=>{for(var t in e||(e={}))Qs.call(e,t)&&Di(n,t,e[t]);if(Mi)for(var t of Mi(e))ea.call(e,t)&&Di(n,t,e[t]);return n},v=(n,e)=>Xs(n,Zs(e));var Li=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var dt=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var ia="syncify",xe="state";function pt(){let n;try{n=window.indexedDB}catch(e){return Promise.resolve(null)}return n?new Promise(e=>{let t;try{t=n.open(ia,1)}catch(i){e(null);return}t.onupgradeneeded=()=>{t.result.createObjectStore(xe)},t.onerror=()=>e(null),t.onblocked=()=>e(null),t.onsuccess=()=>e(t.result)}):Promise.resolve(null)}function mt(n,e){let t=pt().then(i=>new Promise((o,a)=>{if(!i){a(new Error("IndexedDB isn't available."));return}try{let s=i.transaction(xe,n),l=e(s.objectStore(xe));s.oncomplete=()=>{i.close(),o(l.result)},s.onerror=s.onabort=()=>{var u;i.close(),a((u=s.error)!=null?u:new Error("IndexedDB failed."))}}catch(s){i.close(),a(s)}}));return Promise.race([t,new Promise((i,o)=>setTimeout(()=>o(new Error("IndexedDB took too long.")),2e3))])}function ve(n){return mt("readonly",e=>e.get(n))}async function Ce(n,e){await mt("readwrite",t=>t.put(e,n))}async function Bi(n){await mt("readwrite",e=>e.delete(n))}var ie={extensionName:"Syncify",version:"1.12.0",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com"};function P(){var e,t,i,o,a,s,l,u;let n=window.SyncifyConfig;return{extensionName:(e=fe(n==null?void 0:n.extensionName))!=null?e:ie.extensionName,version:(t=Oi(n==null?void 0:n.version))!=null?t:ie.version,workerUrl:(i=fe(n==null?void 0:n.workerUrl))!=null?i:ie.workerUrl,webUrl:(o=fe(n==null?void 0:n.webUrl))!=null?o:ie.webUrl,githubUrl:(a=fe(n==null?void 0:n.githubUrl))!=null?a:ie.githubUrl,kofiUrl:(s=fe(n==null?void 0:n.kofiUrl))!=null?s:ie.kofiUrl,issueUrl:(l=fe(n==null?void 0:n.issueUrl))!=null?l:ie.issueUrl,releasesUrl:(u=fe(n==null?void 0:n.releasesUrl))!=null?u:ie.releasesUrl}}function fe(n){return Oi(n)}function Oi(n){return typeof n=="string"&&n.trim()?n.trim():null}var oa="x-syncify-version",sa="x-syncify-install",aa="x-syncify-timezone",Ui="install-id",Ki="syncify:install-id",ra=2e3,hn=null;async function ji(){let n={[oa]:P().version,[sa]:(await gt()).id},e=ua();return e&&(n[aa]=e),n}function gt(){return hn!=null||(hn=ca().catch(()=>({id:Sn(),inDatabase:!1}))),hn}async function ca(){let n=await Promise.race([la(),new Promise(e=>setTimeout(()=>e(null),ra))]);if(n)return{id:n,inDatabase:!0};try{let e=window.localStorage.getItem(Ki);if(e&&$i(e))return{id:e,inDatabase:!1};let t=Sn();return window.localStorage.setItem(Ki,t),{id:t,inDatabase:!1}}catch(e){return{id:Sn(),inDatabase:!1}}}async function la(){let n=await pt();return n?new Promise(e=>{let t=null;try{let i=n.transaction(xe,"readwrite"),o=i.objectStore(xe),a=o.get(Ui);a.onsuccess=()=>{if(typeof a.result=="string"&&$i(a.result)){t=a.result;return}t=Sn(),o.put(t,Ui)},i.oncomplete=()=>{n.close(),e(t)},i.onerror=i.onabort=()=>{n.close(),e(null)}}catch(i){n.close(),e(null)}}):null}function Sn(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let n=crypto.getRandomValues(new Uint8Array(16));n[6]=n[6]&15|64,n[8]=n[8]&63|128;let e=[...n].map(t=>t.toString(16).padStart(2,"0"));return[e.slice(0,4).join(""),e.slice(4,6).join(""),e.slice(6,8).join(""),e.slice(8,10).join(""),e.slice(10).join("")].join("-")}function $i(n){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(n)}function ua(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(n){return null}}var ya="syncify-signature-v1",fa={name:"ECDSA",hash:"SHA-256"};function bn(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function kn(n){return ht(new Uint8Array(await crypto.subtle.exportKey("raw",n)))}async function Ue(n,e,t,i,o){let a=await da(e,t,i,o),s=await crypto.subtle.sign(fa,n,a);return ht(new Uint8Array(s))}async function da(n,e,t,i){let{pathname:o,search:a}=new URL(t),s=new TextEncoder,l=ht(new Uint8Array(await crypto.subtle.digest("SHA-256",s.encode(i))));return s.encode([ya,n,e.toUpperCase(),o+a,l].join(`
`))}function ht(n){let e="";for(let t=0;t<n.length;t++)e+=String.fromCharCode(n[t]);return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var Hi="device-key",St="session",Ri="salt",de=null,Ke,Fi={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function je(n){if(de)return de;let e=await ve(Hi);return pa(e)?(de=Promise.resolve(e),e):n?(de=bn().then(async t=>(await Ce(Hi,t),t)),de.catch(()=>{de=null}),de):null}async function U(){let n=await ve(St);return ma(n)?n:null}function bt(n){return Ce(St,n)}async function pe(){await Bi(St).catch(()=>{})}async function wn(){if(Ke===void 0){let n=await ve(Ri).catch(()=>{});Ke=typeof n=="string"?n:null}return Ke}async function xn(n){n!==Ke&&(Ke=n,await Ce(Ri,n).catch(()=>{}))}function vn(){return Fi}function Wi(n){Fi=n}function pa(n){let e=n;return!!(e&&e.privateKey instanceof CryptoKey&&e.publicKey instanceof CryptoKey)}function ma(n){let e=n;return!!(e&&typeof e.token=="string"&&e.token&&typeof e.email=="string")}var Yi="install-key",Ie=null;function zi(){return Ie!=null||(Ie=ga()),Ie.catch(()=>{Ie=null}),Ie.catch(()=>null)}async function ga(){if(!(await gt()).inDatabase)return null;let n=await ve(Yi),e=Sa(n)?n:await ha();return{privateKey:e.privateKey,publicKey:await kn(e.publicKey)}}async function ha(){let n=await bn();return await Ce(Yi,n),n}function Sa(n){let e=n;return!!(e&&e.privateKey instanceof CryptoKey&&e.publicKey instanceof CryptoKey)}var ba="/api/auth/email-otp/send-verification-otp",ka="/api/auth/sign-in/email-otp",wa="/api/auth/get-session",xa="/api/auth/sign-out",va="/api/auth/link",Ca="x-syncify-device-key",Ia="x-syncify-signature",qi="x-syncify-salt",Ea="none",Na={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again.",link_failed:"Couldn't open the website. Try again."},E=class extends Error{constructor(t,i=null){var o;super((o=Na[t])!=null?o:"Sign-in failed. Try again.");this.code=t;this.retryAfter=i;this.name="AccountError"}};function $e(n){return n instanceof E?n.message:"Sign-in failed. Try again."}async function Vi(n){let e=await Cn(ba,{method:"POST",body:JSON.stringify({email:n,type:"sign-in"})});return typeof(e==null?void 0:e.resend_in)=="number"?e.resend_in:60}async function Gi(n,e){var a;let t=await je(!0).catch(()=>{throw new E("no_device_key")}),i=await Cn(ka,{method:"POST",body:JSON.stringify({email:n,otp:e}),keys:t,sendPublicKey:!0});if(typeof(i==null?void 0:i.token)!="string"||!i.token)throw new E("sign_in_failed");let o={token:i.token,email:typeof((a=i.user)==null?void 0:a.email)=="string"?i.user.email:n};return await bt(o).catch(()=>{throw new E("no_device_key")}),kt=!0,o}var kt=!1;async function Ji(){var e;let n=await U();if(!n||kt)return n;try{let t=await wt(n,wa,"GET");kt=!0;let i=(e=t==null?void 0:t.user)==null?void 0:e.email;if(typeof i!="string"||i===n.email)return n;let o=v(g({},n),{email:i});return await bt(o).catch(()=>{}),o}catch(t){if(t instanceof E&&t.code==="signed_out")return null;throw t}}async function Xi(){let n=await U().catch(()=>null);n&&await wt(n,xa,"POST").catch(()=>{}),await pe()}async function Zi(){let n=await U();if(!n)throw new E("signed_out");let e=await wt(n,va,"POST"),t=typeof(e==null?void 0:e.url)=="string"?e.url:"",i=new URL(P().webUrl).origin;if(!t.startsWith(`${i}/link#`))throw new E("link_failed");return t}async function wt(n,e,t){let i=await je(!1);if(!i)throw await pe(),new E("signed_out");return Cn(e,{method:t,token:n.token,keys:i})}async function Cn(n,e,t=!1){var f,d,p;let i=`${P().webUrl.replace(/\/+$/,"")}${n}`,o={};if(e.body!==void 0&&(o["content-type"]="application/json"),e.token&&(o.authorization=`Bearer ${e.token}`),e.keys){let k=(f=await wn())!=null?f:Ea;o[qi]=k,o[Ia]=await Ue(e.keys.privateKey,k,e.method,i,(d=e.body)!=null?d:""),e.sendPublicKey&&(o[Ca]=await kn(e.keys.publicKey))}let a;try{a=await fetch(i,{method:e.method,headers:o,body:e.body})}catch(k){throw new E("offline")}let s=a.headers.get(qi);s&&await xn(s);let l=await a.json().catch(()=>null);if(a.ok)return l;let u=typeof(l==null?void 0:l.code)=="string"?l.code:a.status===503?"unavailable":"failed";if(u==="stale_salt"&&e.keys&&!t)return Cn(n,e,!0);u==="signed_out"&&await pe();let y=Number(a.headers.get("retry-after"));throw new E(u,Number.isFinite(y)&&y>0?y:(p=_a[u])!=null?p:null)}var _a={resend_wait:60,too_many_requests:60,send_failed:60};var Ta="x-syncify-user-hash",Pa="x-syncify-identity",Aa="x-syncify-signature",Ma="x-syncify-install-key",Da="x-syncify-install-signature",xt="x-syncify-salt",La="none",Ba="/restores",Oa="/installs",Ua="hash",Qi=3,He=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}},G=class extends Error{constructor(t){super(t==="not_linked"?"Couldn't read that Spotify account's backups.":"Sign in to restore this backup.");this.code=t;this.name="LockedError"}},me=class extends Error{constructor(){super("This Spotify account doesn't accept backups from this install. Sign in to back up."),this.name="InstallRefusedError"}};async function no(n,e,t){var a;let i=await oe(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(t)});if(i.status===403&&((a=await i.json().catch(()=>null))==null?void 0:a.code)==="install_refused")throw new me;if(!i.ok)throw new Error(`Backup failed with HTTP ${i.status}.`);let o=await i.json().catch(()=>null);return{unchanged:(o==null?void 0:o.unchanged)===!0,unapproved:(o==null?void 0:o.quarantined)===!0}}async function to(n,e,t,i){let o=await oe(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({install:t,action:i})},Oa);if(o.ok)return;let a=await o.json().catch(()=>null);if((a==null?void 0:a.code)!=="not_pending")throw new Error(`Couldn't answer with HTTP ${o.status}.`)}async function vt(n,e,t){var p,k,C,w;let i=await oe(n,e,{method:"GET"},oo("/",t));if(i.status===404){let b=await i.json().catch(()=>null);return{exists:!1,payload:null,backups:[],safetyCopy:null,claim:Re(b==null?void 0:b.claim),unapproved:[],install:eo(b==null?void 0:b.install)}}if(!i.ok)throw new Error(`Restore failed with HTTP ${i.status}.`);let o=await i.json(),a=Re(o.claim),s=eo(o.install);delete o.claim,delete o.install;let l=[o,...(p=o.backup_history)!=null?p:[]];if(!l.every(b=>b.backup))return{exists:!0,payload:o,backups:l.slice(0,Qi),safetyCopy:(k=l[Qi])!=null?k:null,claim:a,unapproved:[],install:s};let u=l.filter(b=>{var _;return((_=b.backup)==null?void 0:_.kind)==="rolling"}),y=(C=l.find(b=>{var _;return((_=b.backup)==null?void 0:_.kind)==="anchor"}))!=null?C:null,f=l.filter(b=>{var _;return((_=b.backup)==null?void 0:_.kind)==="quarantined"}),d=(w=u[0])!=null?w:y;return d?u.length===0&&y?{exists:!0,payload:d,backups:[y],safetyCopy:null,claim:a,unapproved:f,install:s}:{exists:!0,payload:d,backups:u,safetyCopy:y,claim:a,unapproved:f,install:s}:{exists:!1,payload:null,backups:[],safetyCopy:null,claim:a,unapproved:f,install:s}}async function io(n,e,t,i){try{await oe(n,e,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:t}),keepalive:!0},oo(Ba,i))}catch(o){}}async function oe(n,e,t,i="",o=!1){var w,b,_,H,Y;let a=i?`${n.replace(/\/+$/,"")}${i}`:n,s=(w=t.method)!=null?w:"GET",l=await U().catch(()=>null),u=l?await je(!1).catch(()=>null):null,y=await zi(),f={},d=(b=await wn())!=null?b:La;l&&u&&(f.authorization=`Bearer ${l.token}`,f[xt]=d,f[Aa]=await Ue(u.privateKey,d,s,a,(_=t.body)!=null?_:"")),y&&(f[xt]=d,f[Ma]=y.publicKey,f[Da]=await Ue(y.privateKey,d,s,a,(H=t.body)!=null?H:""));let p=await fetch(a,v(g({},t),{headers:g(v(g(g({},t.headers),await ji()),{[Ta]:e.hash,[Pa]:e.field}),f)})),k=p.headers.get(xt);if(k&&await xn(k),p.status===426)throw new He;if(p.status!==401)return p;let C=(Y=await p.clone().json().catch(()=>null))==null?void 0:Y.code;if(!o){if(C==="stale_salt"&&(l||y))return oe(n,e,t,i,!0);if(C==="signed_out"&&l)return await pe(),oe(n,e,t,i,!0)}throw C==="claimed"||C==="not_owner"||C==="not_linked"?new G(C):(C==="signed_out"&&await pe(),new E(typeof C=="string"?C:"failed"))}function oo(n,e){return e?`${n}?${Ua}=${encodeURIComponent(e)}`:n}function eo(n){let e=n;if(!e||typeof e.trust!="string")return null;let t=Array.isArray(e.waiting)?e.waiting:[];return{trusted:e.trust!=="pending"&&e.trust!=="rejected",refused:e.trust==="rejected",waiting:t.flatMap(i=>{let o=i;return o&&typeof o.id=="string"&&typeof o.first_seen_at=="number"?[{id:o.id,device:typeof o.device=="string"?o.device:null,first_seen_at:o.first_seen_at}]:[]})}}function Re(n){let e=n;return!e||typeof e.mine!="boolean"?null:e.status==="final"?{status:"final",mine:e.mine}:e.status!=="pending"||typeof e.final_at!="number"?null:g({status:"pending",mine:e.mine,email:typeof e.email=="string"?e.email:null,final_at:e.final_at,held:e.held===!0},e.waiting===!0?{waiting:!0}:{})}var so="/claims",Ka="/claims/cancel",ja={no_backup:"Back up first, then secure your backup.",unsupported_identity:"This Spotify account can't be secured.",too_many_accounts:"Your account already has 10 Spotify accounts linked.",offline:"Couldn't reach Syncify. Check your connection and try again."},se=class extends Error{constructor(t){var i;super((i=ja[t])!=null?i:"Couldn't secure your backup. Try again.");this.code=t;this.name="ClaimError"}};async function ao(n,e){let t=await Ct(n,e,"GET",so);if(!t.ok)throw new se(await It(t));let i=await t.json().catch(()=>null);return{claim:Re(i==null?void 0:i.claim),accounts:Array.isArray(i==null?void 0:i.accounts)?i.accounts.filter($a):null}}async function ro(n,e){let t=await Ct(n,e,"POST",so);if(!t.ok)throw new se(await It(t));let i=await t.json().catch(()=>null);return Re(i==null?void 0:i.claim)}async function co(n,e){let t=await Ct(n,e,"POST",Ka);if(!t.ok&&t.status!==404)throw new se(await It(t))}async function Ct(n,e,t,i){try{return await oe(n,e,{method:t},i)}catch(o){throw o instanceof TypeError?new se("offline"):o}}async function It(n){let e=await n.json().catch(()=>null);return typeof(e==null?void 0:e.code)=="string"?e.code:"failed"}function $a(n){let e=n;return!!(e&&typeof e.hash=="string"&&(e.status==="pending"||e.status==="final"||e.status==="cancelled"))}var Ne={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},Ha=/^([a-z0-9]|f([1-9]|1[0-2]))$/,Ra=250,Fa=40,Et=null,In=null,Ee=null;function lo(){return/mac/i.test(navigator.platform||navigator.userAgent)}function uo(n){if(n===null)return null;if(!n||typeof n!="object")return Ne;let e=n;return typeof e.key!="string"||!Ha.test(e.key)?Ne:{key:e.key,ctrl:!!e.ctrl,alt:!!e.alt,shift:!!e.shift,meta:!!e.meta}}function Fe(n){if(!n)return"Off";let e=n.key.toUpperCase();return lo()?[n.ctrl?"\u2318":"",n.alt?"\u2325":"",n.shift?"\u21E7":"",e].join(""):[n.ctrl&&"Ctrl",n.meta&&"Win",n.alt&&"Alt",n.shift&&"Shift",e].filter(Boolean).join("+")}function yo(n){if(n.key==="Escape")return{kind:"cancel"};let e=Wa(n.code);if(!e)return{kind:"ignore"};let t=lo();if(t&&n.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:e,ctrl:t?n.metaKey:n.ctrlKey,alt:n.altKey,shift:n.shiftKey,meta:t?!1:n.metaKey},o=e.startsWith("f")&&e.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!o?{kind:"error",message:`Include ${t?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function Wa(n){var t,i;let e=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(n);return e?((i=(t=e[1])!=null?t:e[2])!=null?i:e[3]).toLowerCase():null}function fo(n){var e;if(Ee&&Ya(Ee,n))return!1;try{let t=Spicetify.Mousetrap,i=(e=t.trigger)==null?void 0:e.call(t)._directMap;if(!i)return!1;let o=Nt(n);return Object.keys(i).some(a=>a.startsWith(`${o}:`))}catch(t){return!1}}function _t(n,e,t=0){if(Et=e,In=n,!po()){if(t>=Fa){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>_t(In,e,t+1),Ra);return}Tt(In)}function Tt(n){if(In=n,!po()||!Et)return;let e=Et;try{if(Ee&&Spicetify.Keyboard._deregisterShortcut(Ee),Ee=null,!n)return;Spicetify.Keyboard.registerShortcut(n,t=>{t.preventDefault(),e()}),Ee=n,console.debug("[Syncify]","Keyboard shortcut registered",Fe(n))}catch(t){console.warn("[Syncify]","Failed to register keyboard shortcut",t)}}function po(){var n;return typeof((n=Spicetify.Keyboard)==null?void 0:n.registerShortcut)=="function"}function Nt(n){return[n.ctrl&&"mod",n.meta&&"meta",n.alt&&"alt",n.shift&&"shift",n.key].filter(Boolean).join("+")}function Ya(n,e){return Nt(n)===Nt(e)}var Pt="both",za=["both","topbar","menu"],We=null,Ye=null,En=!1;function mo(n){return za.includes(n)?n:Pt}function go(){var n;return typeof((n=Spicetify.Menu)==null?void 0:n.Item)=="function"}function ho(n){We=n.topbarButton,Ye=n.menuItem}function Nn(n){let e=n!=="menu"||!Ye,t=n!=="topbar";if(We!=null&&We.element&&(We.element.style.display=e?"":"none"),!!Ye)try{t&&!En?(Ye.register(),En=!0):!t&&En&&(Ye.deregister(),En=!1)}catch(i){console.warn("[Syncify]","Failed to update profile menu item",i)}}var Tn="syncify:config",_n={workerUrl:P().workerUrl,autoBackupEnabled:!1,shortcut:Ne,entryPoint:Pt};function j(){var t,i;let n=P(),e=(i=(t=Spicetify.LocalStorage)==null?void 0:t.get(Tn))!=null?i:window.localStorage.getItem(Tn);if(!e)return v(g({},_n),{workerUrl:n.workerUrl});try{let o=JSON.parse(e);return{workerUrl:n.workerUrl,autoBackupEnabled:o.autoBackupEnabled===void 0?_n.autoBackupEnabled:!!o.autoBackupEnabled,shortcut:o.shortcut===void 0?_n.shortcut:uo(o.shortcut),entryPoint:mo(o.entryPoint)}}catch(o){return v(g({},_n),{workerUrl:n.workerUrl})}}function Pn(n){var t;let e=JSON.stringify({workerUrl:P().workerUrl,autoBackupEnabled:n.autoBackupEnabled,shortcut:n.shortcut,entryPoint:n.entryPoint});if((t=Spicetify.LocalStorage)!=null&&t.set){Spicetify.LocalStorage.set(Tn,e);return}window.localStorage.setItem(Tn,e)}function ze(n){return typeof n.workerUrl=="string"&&n.workerUrl.length>0}async function An(n){let e=new TextEncoder().encode(n),t=await crypto.subtle.digest("SHA-256",e);return[...new Uint8Array(t)].map(i=>i.toString(16).padStart(2,"0")).join("")}function qe(n){return JSON.stringify(At(n))}function At(n){return Array.isArray(n)?n.map(At):n&&typeof n=="object"?Object.keys(n).sort().reduce((e,t)=>(e[t]=At(n[t]),e),{}):n}var qa=["username","canonicalUsername","id","uri","displayName"];async function J(){let{value:n,field:e}=await Va();return{hash:await An(n),field:e}}async function Va(){var o;let n=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(n!=null&&n.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let e=await n.getUser(),t=qa.find(a=>(e==null?void 0:e[a])!=null),i=t?e[t]:void 0;if(!t||!i)throw new Error("Unable to resolve the active Spotify user.");return{value:i,field:t}}var Ga=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,Ja=100,Xa="marketplace:installed-extensions",Za="marketplace:installed-themes",Qa="marketplace:theme-installed",er="marketplace:installed:",nr="marketplace";function Dt(n){return Spicetify.Config?Lt(Spicetify.Config,n):null}function Lt(n,e){var a;let t=ae(n),i=new Set(tr(e)),o=((a=e[Qa])==null?void 0:a.includes(er))===!0;return{current_theme:o?nr:t.current_theme,color_scheme:o?"":t.color_scheme,extensions:t.extensions.filter(s=>!i.has(s)),custom_apps:t.custom_apps}}function ae(n){let e=n&&typeof n=="object"?n:{};return{current_theme:Mt(e.current_theme)?e.current_theme:"",color_scheme:Mt(e.color_scheme)?e.color_scheme:"",extensions:So(e.extensions),custom_apps:So(e.custom_apps)}}function wo(n,e){return qe(ae(n))===qe(ae(e))}function So(n){return Array.isArray(n)?[...new Set(n.filter(Mt))].sort().slice(0,Ja):[]}function Mt(n){return typeof n=="string"&&Ga.test(n)}function tr(n){let e=bo(n[Xa]).map(i=>{var a;let o=(a=ko(n[i]))==null?void 0:a.manifest;return o&&typeof o=="object"?o.main:void 0}),t=bo(n[Za]).flatMap(i=>{var a;let o=(a=ko(n[i]))==null?void 0:a.include;return Array.isArray(o)?o:[]});return[...e,...t].flatMap(i=>{let o=typeof i=="string"?i.split("/").pop():void 0;return o?[o]:[]})}function bo(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function ko(n){try{let e=n?JSON.parse(n):null;return e&&typeof e=="object"&&!Array.isArray(e)?e:null}catch(e){return null}}function xo(){let n=navigator.userAgent;return/Windows/i.test(n)?"Windows":/Mac OS|Macintosh/i.test(n)?"macOS":/Linux/i.test(n)?"Linux":n}var ir=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],or="marketplace:installed:",vo=`${or}snippet:`,sr="wsoltani/syncify",ar="marketplace",Co={added:0,removed:1,unchanged:2};function X(n){let e=new Map;for(let[t,i]of ir)for(let o of ur(n[t]))e.has(o)||e.set(o,cr(o,i,n[o]));return[...e.values()]}function Bt(n,e,t,i){let o=new Set(n.map(u=>u.key)),a=new Map(t.map(u=>[u.key,u])),s=[...n.map(u=>{let y=a.get(u.key);return v(g({},u),{change:y?"unchanged":"added",isNew:!y||y.sources.join(" ")!==u.sources.join(" ")})}),...t.filter(u=>!o.has(u.key)).map(u=>v(g({},u),{change:Ot(u,n)?"unchanged":"removed",isNew:!1}))].sort((u,y)=>Co[u.change]-Co[y.change]||u.name.localeCompare(y.name)),l={added:0,removed:0,unchanged:0};for(let u of s)l[u.change]+=1;return{items:s,counts:l,manual:rr(e,i)}}function Ot(n,e){return n.type==="extension"&&Io(n)&&!e.some(Io)}function Io(n){var e;return((e=n.repo)==null?void 0:e.toLowerCase())===sr}function rr(n,e){if(!n)return[];let t=ae(n),i=ae(e),o=[...t.extensions.filter(s=>!i.extensions.includes(s)).map(s=>({type:"extension",name:s})),...t.custom_apps.filter(s=>!i.custom_apps.includes(s)).map(s=>({type:"custom_app",name:s}))],a=t.current_theme;return a&&a!==ar&&(a!==i.current_theme||t.color_scheme!==i.color_scheme)&&o.push(g({type:"theme",name:a},t.color_scheme?{scheme:t.color_scheme}:{})),o}function cr(n,e,t){var u,y;let i=Eo(t),o=Eo(i==null?void 0:i.manifest),a=Mn(i==null?void 0:i.user),s=Mn(i==null?void 0:i.repo),l=(y=(u=Mn(i==null?void 0:i.title))!=null?u:Mn(o==null?void 0:o.name))!=null?y:n.startsWith(vo)?n.slice(vo.length):n.split("/").pop()||n;return{key:n,type:e,name:l,repo:e!=="snippet"&&a&&s?`${a}/${s}`:null,sources:lr(e,i),custom:e==="snippet"&&(i==null?void 0:i.custom)===!0}}function lr(n,e){return e?(n==="extension"?[e.extensionURL]:n==="theme"?[e.cssURL,e.schemesURL,...Array.isArray(e.include)?e.include:[]]:[]).filter(i=>typeof i=="string"&&i!==""):[]}function Mn(n){return typeof n=="string"&&n.trim()?n.trim():null}function ur(n){try{let e=n?JSON.parse(n):[];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch(e){return[]}}function Eo(n){let e=n;if(typeof n=="string")try{e=JSON.parse(n)}catch(t){return null}return e&&typeof e=="object"&&!Array.isArray(e)?e:null}var Dn="spicetify-marketplace";var Ve="settings";async function No(){let n=await Po();if(n.kind!=="ok")return null;try{let e=await Ao(n.db,"readonly",i=>i.getAll());if(!e)return null;let t={};for(let i of e)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(t[i.key]=i.value);return t}finally{n.db.close()}}async function _o(n,e=[]){let t=await Po();if(t.kind==="unavailable")return"unavailable";let i=t.kind==="ok"?t.db:await yr();if(!i)return"failed";try{return await Ao(i,"readwrite",a=>{let s;for(let[l,u]of Object.entries(n))s=a.put({key:l,value:u});for(let l of e)s=a.delete(l);return s})===null?"failed":"written"}finally{i.close()}}function To(){var n;try{return(n=window.indexedDB)!=null?n:null}catch(e){return null}}async function Po(){let n=To();return n?await fr(n)?{kind:"missing"}:new Promise(e=>{let t=!1,i=n.open(Dn);i.onupgradeneeded=()=>{t=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),e({kind:"unavailable"})},i.onblocked=()=>e({kind:"unavailable"}),i.onsuccess=()=>{let o=i.result;if(t){o.close(),dr(n).then(()=>e({kind:"missing"}));return}if(!o.objectStoreNames.contains(Ve)){o.close(),e({kind:"unavailable"});return}e({kind:"ok",db:o})}}):{kind:"unavailable"}}function yr(){let n=To();return n?new Promise(e=>{let t=n.open(Dn,1);t.onupgradeneeded=()=>{let i=t.result;i.objectStoreNames.contains(Ve)||i.createObjectStore(Ve,{keyPath:"key"})},t.onerror=()=>{console.warn("Syncify could not create Marketplace storage",t.error),e(null)},t.onblocked=()=>e(null),t.onsuccess=()=>e(t.result)}):Promise.resolve(null)}async function fr(n){if(typeof n.databases!="function")return!1;try{return!(await n.databases()).some(t=>t.name===Dn)}catch(e){return!1}}function dr(n){return new Promise(e=>{let t=n.deleteDatabase(Dn);t.onsuccess=()=>e(),t.onerror=()=>e(),t.onblocked=()=>e()})}function Ao(n,e,t){return new Promise(i=>{let o;try{o=n.transaction(Ve,e)}catch(y){console.warn("Syncify could not open a Marketplace transaction",y),i(null);return}let a,s=!1,l=y=>{s||(s=!0,i(y))};o.oncomplete=()=>l(a),o.onerror=()=>{console.warn("Syncify Marketplace transaction failed",o.error),l(null)},o.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",o.error),l(null)};let u;try{u=t(o.objectStore(Ve))}catch(y){console.warn("Syncify Marketplace request could not be issued",y),l(null);return}u&&(u.onsuccess=()=>{a=u.result},u.onerror=()=>{console.warn("Syncify Marketplace request failed",u.error),l(null)})})}var Kt="marketplace:",Ln=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function ge(){let n=Cr(),e=await No();if(e)for(let[t,i]of Object.entries(e))t.startsWith(Kt)&&(n[t]=i);return n}var mr=new Set(["marketplace:active-tab","marketplace:sort"]),Mo="marketplace:installed:",Ut="marketplace:theme-installed",gr=["stars","tags","lastUpdated","created"];async function Bn(n,e){let t={};for(let[i,o]of Object.entries(n))mr.has(i)||(t[i]=i.startsWith(Mo)?hr(o):o);return e&&(t.spicetify_config=ae(e)),An(qe(t))}function hr(n){try{let e=JSON.parse(n);if(!e||typeof e!="object"||Array.isArray(e))return n;for(let t of gr)delete e[t];return e}catch(e){return n}}async function On(){let n=await ge(),e=Dt(n);return{keyCount:Object.keys(n).length,hash:await Bn(n,e),installedItemCount:xr(n),installedItems:Un(n),items:X(n),spicetifyConfig:e,marketplaceAvailable:vr(n)}}async function Do(){let n=await ge(),e=Dt(n);return g({schema_version:2,metadata:{last_sync_datetime:new Date().toISOString(),device_info:xo(),marketplace_key_count:Object.keys(n).length},payload_hash:await Bn(n,e),marketplace_data:{keys:n}},e?{spicetify_config:e}:{})}async function Lo(n,e=[]){var a,s;let t={},i=(s=(a=n.marketplace_data)==null?void 0:a.keys)!=null?s:{};for(let[l,u]of Object.entries(i))l.startsWith(Kt)&&(t[l]=u);if(Object.keys(t).length===0)return 0;await kr(t),e.length>0&&await wr(t,e);let o=br(await ge(),t);return await Sr(t,o),Object.keys(t).length}async function Sr(n,e=[]){for(let[i,o]of Object.entries(n))window.localStorage.setItem(i,o);for(let i of e)window.localStorage.removeItem(i);if(await _o(n,e)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try again.")}function br(n,e){let t=new Set(Ln.flatMap(s=>{var l;return Kn((l=e[s])!=null?l:n[s]).map(String)})),i=Un(n).filter(s=>s.startsWith(Mo)&&!t.has(s)),o=i.filter(s=>n[s]!==void 0&&e[s]===void 0),a=n[Ut];return a&&e[Ut]===void 0&&i.some(s=>a.includes(s))&&o.push(Ut),o}async function kr(n){let e=await ge(),t=X(n),i=X(e).filter(s=>Ot(s,t));if(i.length===0)return;let o="marketplace:installed-extensions",a=Kn(n[o]).map(String);for(let s of i)a.includes(s.key)||a.push(s.key),n[s.key]=e[s.key];n[o]=JSON.stringify(a)}async function wr(n,e){let t=await ge(),i=Un(t);for(let o of Ln){if(n[o]===void 0)continue;let a=Kn(n[o]).map(String).filter(s=>!e.includes(s)||i.includes(s));n[o]=JSON.stringify(a)}for(let o of e)t[o]!==void 0?n[o]=t[o]:delete n[o]}function xr(n){return Un(n).length}function Un(n){return Ln.flatMap(e=>Kn(n[e]).map(String))}function vr(n){return!!(window.Marketplace||Ln.some(t=>n[t]!==void 0)||n["marketplace:tabs"]!==void 0)}function Bo(n,e){return e===0?!1:n===0?!0:n<Math.max(2,Math.floor(e*.5))}function Cr(){let n={};for(let e=0;e<window.localStorage.length;e+=1){let t=window.localStorage.key(e);if(!(t!=null&&t.startsWith(Kt)))continue;let i=window.localStorage.getItem(t);i!==null&&(n[t]=i)}return n}function Kn(n){if(!n)return[];try{let e=JSON.parse(n);return Array.isArray(e)?e:[]}catch(e){return[]}}async function jn(n){if(!ze(n))throw new Error("Syncify backup service is not configured.");let[e,t]=await Promise.all([J(),Do()]);if(t.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:i,unapproved:o}=await no(n.workerUrl,e,t);return{payload:t,unchanged:i,unapproved:o}}async function _e(n,e){var l;if(!ze(n))throw new Error("Syncify backup service is not configured.");let t=await vt(n.workerUrl,await J(),e),[i,o,a]=await Promise.all([Promise.all(t.backups.map($t)),t.safetyCopy?$t(t.safetyCopy):null,Promise.all(t.unapproved.map($t))]),s=i.filter((u,y)=>i.findIndex(f=>f.payload_hash===u.payload_hash)===y);return v(g({},t),{payload:(l=s[0])!=null?l:null,backups:s,safetyCopy:o&&!s.some(u=>u.payload_hash===o.payload_hash)?o:null,unapproved:a.filter(u=>!s.some(y=>y.payload_hash===u.payload_hash))})}var jt=new Map;async function $t(n){var a,s,l;let e=(s=(a=n.marketplace_data)==null?void 0:a.keys)!=null?s:{},t=n.spicetify_config?Lt(n.spicetify_config,e):void 0,i=`${n.payload_hash} ${(l=n.metadata)==null?void 0:l.last_sync_datetime}`,o=jt.get(i);return o||(o=Bn(e,t),jt.set(i,o),o.catch(()=>jt.delete(i))),v(g(g({},n),t?{spicetify_config:t}:{}),{payload_hash:await o})}async function Oo(n){let e=await vt(Ge(n),await J());return{claim:e.claim,install:e.install}}async function Uo(n,e,t,i=[]){var l;let o=e!=null?e:(await _e(n)).payload;if(!o)throw new Error("No Syncify cloud backup was found for this Spotify account.");let a=await Lo(o,i),s=(l=o.backup)==null?void 0:l.id;return s&&ze(n)&&J().then(u=>io(n.workerUrl,u,s,t)).catch(()=>{}),{payload:o,restoredCount:a}}async function Ko(n){let e=await J(),t=await ao(Ge(n),e);return v(g({},t),{hash:e.hash})}async function jo(n){await ro(Ge(n),await J())}async function $n(n,e,t){await to(Ge(n),await J(),e,t)}async function Hn(n){await co(Ge(n),await J())}function Ge(n){if(!ze(n))throw new Error("Syncify backup service is not configured.");return n.workerUrl}var Rn="syncify:claim-check-day";async function Ho(n){var t,i,o;let e=j();if(e.workerUrl){if(!e.autoBackupEnabled)return Ir(n);try{let[a,s]=await Promise.all([On(),_e(e)]);Ro(s,n);let l=(i=(t=s.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?i:0;if(s.exists&&Bo(a.keyCount,l)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((o=s.payload)==null?void 0:o.payload_hash)===a.hash||a.keyCount===0)return;let{unapproved:u}=await jn(e);Spicetify.showNotification(u?"Syncify: backed up, waiting for approval":"Syncify auto-backup complete")}catch(a){if(a instanceof G||a instanceof me){Spicetify.showNotification("Syncify: sign in to keep backing up",!0,8e3);return}let s=a instanceof Error?a.message:String(a);console.warn("Syncify startup sync failed:",a),Spicetify.showNotification(`Syncify auto-sync skipped: ${s}`,!0,8e3)}}}async function Ir(n){let e=new Date().toLocaleDateString("en-CA");if(Nr()!==e)try{let t=await Oo(j());$o(e),Ro(t,n)}catch(t){if(t instanceof G){$o(e);return}console.warn("Syncify claim check failed:",t)}}function Ro(n,e){var o;let t=Er(n.claim),i=(o=n.install)==null?void 0:o.waiting[0];t?e.onClaim(t):i&&e.onInstall(i)}function Er(n){return(n==null?void 0:n.status)==="pending"&&!n.mine?n:null}function Nr(){var n,e;return(e=(n=Spicetify.LocalStorage)==null?void 0:n.get(Rn))!=null?e:window.localStorage.getItem(Rn)}function $o(n){var e;(e=Spicetify.LocalStorage)!=null&&e.set?Spicetify.LocalStorage.set(Rn,n):window.localStorage.setItem(Rn,n)}var Rt="syncify:pending-restore",_r=600*1e3,Tr=2e3,Pr=15e3,Ar="marketplace:theme-installed",Mr="raw.githubusercontent.com",Dr=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],he=null,Ht=new Set,Yo=new Map;function zo(){return he}function qo(n){return Ht.add(n),()=>Ht.delete(n)}function Vo(){he&&Qo(v(g({},he),{manual:[]}))}function Ft(n){try{localStorage.setItem(Rt,JSON.stringify({at:Date.now(),manual:n}))}catch(e){}}function Go(){var n;Ft((n=he==null?void 0:he.manual)!=null?n:[]),window.location.reload()}function Jo(){es()&&(document.addEventListener("load",n=>Fo(n.target,"load"),!0),document.addEventListener("error",n=>Fo(n.target,"error"),!0))}async function Xo(){let n=es();if(!n)return;try{localStorage.removeItem(Rt)}catch(o){}let e=Date.now(),t=await Wo();for(;t.loaded<t.total&&Date.now()-e<Pr;)await new Promise(o=>setTimeout(o,Tr)),t=await Wo();Qo(v(g({at:Date.now()},t),{manual:n.manual}));let i=t.loaded===t.total&&n.manual.length===0;Spicetify.showNotification(i?`Syncify: backup restored. ${Lr(t)}.`:`Syncify: restored ${t.loaded} of ${t.total}. Open Syncify for details.`,!1,8e3)}function Zo(n){let e=n.map(t=>t.type==="extension"?`spicetify config extensions ${Fn(t.name)}`:t.type==="custom_app"?`spicetify config custom_apps ${Fn(t.name)}`:`spicetify config current_theme ${Fn(t.name)}${t.scheme?` color_scheme ${Fn(t.scheme)}`:""}`);return e.length>0?[...e,"spicetify apply"]:[]}function Lr(n){return n.total===1?"It loaded":`All ${n.total} loaded`}function Fn(n){return/^[\w.@+/-]+$/.test(n)?n:`"${n}"`}function Qo(n){he=n;for(let e of Ht)e(n)}function es(){var n;try{let e=JSON.parse((n=localStorage.getItem(Rt))!=null?n:"null");return!e||Date.now()-e.at>_r?null:{manual:Array.isArray(e.manual)?e.manual:[]}}catch(e){return null}}function Fo(n,e){n instanceof HTMLScriptElement&&n.src&&Yo.set(Je(n.src),e)}async function Wo(){var i;let n=await ge(),e=(i=n[Ar])!=null?i:"",t=X(n).filter(o=>o.type==="extension"&&o.sources.length>0||o.type==="theme"&&e.includes(o.key)||o.type==="snippet");return{loaded:t.filter(Br).length,total:t.length}}function Br(n){var e,t;if(n.type==="snippet"){let i=document.querySelector("style.marketplaceSnippets");return((e=i==null?void 0:i.textContent)==null?void 0:e.includes(`/* ${n.name} - `))===!0}if(n.type==="theme"){let i=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((t=i==null?void 0:i.textContent)!=null&&t.trim())}return Or(n.sources[0]).some(Ur)}function Or(n){let e;try{e=new URL(n)}catch(s){return[]}if(e.host!==Mr)return[Je(e.href)];let[t,i,o,...a]=e.pathname.split("/").filter(Boolean);return!t||!i||!o||a.length===0?[]:Dr.map(s=>Je(`https://${s}/gh/${t}/${i}@${o}/${a.join("/")}`))}function Ur(n){let e=Yo.get(n);return e?e==="load":[...document.querySelectorAll("script[src]")].some(i=>Je(i.src)===n)&&performance.getEntriesByType("resource").some(i=>Je(i.name)===n)}function Je(n){try{let e=new URL(n);return`${e.origin}${e.pathname}`}catch(e){return n}}var Kr="raw.githubusercontent.com",jr="cdn.jsdelivr.net",ns=".github.io";function Yt(n){var t;if(n.protocol!=="https:")return null;let e=n.pathname.split("/").filter(Boolean);if(n.host===Kr)return Wt(e[0],e[1]);if(n.host===jr)return e[0]==="gh"?Wt(e[1],(t=e[2])==null?void 0:t.split("@")[0]):null;if(n.host.endsWith(ns)){let i=n.host.slice(0,-ns.length);return i.includes(".")?null:Wt(i,e.length>1?e[0]:n.host)}return null}function Wt(n,e){return n&&e?`${n}/${e}`:null}var $r={extension:"spicetify-extensions",theme:"spicetify-themes"},Hr="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",Rr="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",Fr="https://api.github.com/repos",Wr=5e3,Yr=20,ts="syncify:repo-topics",is=10080*60*1e3,zr=200;function Qe(n){return(n==null?void 0:n.kind)==="host"||(n==null?void 0:n.kind)==="repo"||(n==null?void 0:n.kind)==="blocked"||(n==null?void 0:n.kind)==="catalog"}function os(n){let e=new Map;for(let t of n){if(t.change==="removed")continue;if(t.custom){e.set(t.key,{kind:"custom"});continue}let i=qr(t);i&&e.set(t.key,i)}return e}async function ss(n,e){let t=new Map,i=n.filter(s=>s.change!=="removed"&&s.isNew&&!e.has(s.key));if(i.length===0)return t;let o=i.filter(s=>s.type==="snippet"),a=i.filter(s=>s.type!=="snippet");if(o.length>0){let s=await Xr();for(let l of o)s?s.has(as(l.name))||t.set(l.key,{kind:"catalog"}):t.set(l.key,{kind:"unchecked"})}if(a.length>0){let s=await Jr(),l=ec(),u=0;await Promise.all(a.map(async y=>{let f=Vr(y),d=$r[y.type];if(!f||!d)return;if(s===null){t.set(y.key,{kind:"unchecked"});return}if(Gr(f,s)){t.set(y.key,{kind:"blocked"});return}let p=Qr(l,f);p===void 0&&u<Yr&&(u+=1,p=await Zr(f),p!==void 0&&(l[f.toLowerCase()]={topics:p,at:Date.now()})),p===void 0?t.set(y.key,{kind:"unchecked"}):(p===null||!p.includes(d))&&t.set(y.key,{kind:"catalog"})})),nc(l)}return t}function qr(n){let e=null;for(let t of n.sources){let i;try{i=new URL(t)}catch(a){return{kind:"host",host:t.slice(0,40)}}let o=Yt(i);if(!o)return{kind:"host",host:i.host};n.repo&&o.toLowerCase()!==n.repo.toLowerCase()&&(e!=null||(e=o))}return e?{kind:"repo",repo:e}:null}function Vr(n){for(let e of n.sources)try{let t=Yt(new URL(e));if(t)return t}catch(t){}return n.repo}function Gr(n,e){let t=`https://github.com/${n}`.toLowerCase();return e.some(i=>{let o=i.toLowerCase();if(!o.includes("*"))return o===t;let a=o.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${a}$`).test(t)})}function as(n){return n.replace(/\n/g,"").trim().toLowerCase()}var Xe=null,Ze=null;function Jr(){return Xe!=null||(Xe=rs(Hr).then(n=>{let e=n==null?void 0:n.repos;return Array.isArray(e)?e.filter(t=>typeof t=="string"&&!t.startsWith("//")):(Xe=null,null)})),Xe}function Xr(){return Ze!=null||(Ze=rs(Rr).then(n=>Array.isArray(n)?new Set(n.flatMap(e=>typeof(e==null?void 0:e.title)=="string"?[as(e.title)]:[])):(Ze=null,null))),Ze}async function Zr(n){let e=await cs(`${Fr}/${n}`);if((e==null?void 0:e.status)===404)return null;if(!(e!=null&&e.ok))return;let t=await e.json().catch(()=>null);return Array.isArray(t==null?void 0:t.topics)?t.topics.filter(i=>typeof i=="string"):void 0}async function rs(n){let e=await cs(n);return e!=null&&e.ok?e.json().catch(()=>null):null}async function cs(n){let e=typeof AbortController=="function"?new AbortController:null,t=setTimeout(()=>e==null?void 0:e.abort(),Wr);try{return await fetch(n,{signal:e==null?void 0:e.signal})}catch(i){return null}finally{clearTimeout(t)}}function Qr(n,e){let t=n[e.toLowerCase()];return t&&Date.now()-t.at<is?t.topics:void 0}function ec(){var n;try{let e=JSON.parse((n=localStorage.getItem(ts))!=null?n:"{}");return e&&typeof e=="object"?e:{}}catch(e){return{}}}function nc(n){let e=Date.now(),t=Object.entries(n).filter(([,i])=>e-i.at<is).sort(([,i],[,o])=>o.at-i.at).slice(0,zr);try{localStorage.setItem(ts,JSON.stringify(Object.fromEntries(t)))}catch(i){}}function zt(n){return`A new install${n.device?` on ${n.device}`:""} wants to back up this Spotify account.`}function ls(n){let e=Spicetify.React,t=e.useState,{install:i}=n,[o,a]=t(!1),[s,l]=t(null);async function u(y){a(!0),l(null);try{await $n(j(),i.id,y),Spicetify.showNotification(y==="approve"?"Syncify: install approved":"Syncify: install refused"),n.onDone(y)}catch(f){l(f instanceof Error?f.message:String(f)),a(!1)}}return e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-claim-notice"},zt(i)," Approve it if it's yours."),s?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},s):null,e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:n.onClose,disabled:o},"Close"),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{u("reject")},disabled:o},"Not mine"),e.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{u("approve")},disabled:o},"Approve")))}var tc="syncify:beta",us=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function ys(){var n;return(n=window.SyncifyLoader)!=null?n:null}function ic(){try{return window.localStorage.getItem(tc)==="true"}catch(n){return!1}}async function fs(n){let e=ic()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(e.map(i=>oc(`${n}/${i}`)))).reduce((i,o)=>o&&(!i||Vt(o,i)>0)?o:i,null)}function qt(n){return typeof n=="string"&&us.test(n)}function Vt(n,e){let[t,i]=[n,e].map(o=>{var y;let[,a,s,l,u]=(y=us.exec(o))!=null?y:[];return[a,s,l,u!=null?u:1/0].map(Number)});for(let o=0;o<t.length;o+=1)if(t[o]!==i[o])return t[o]<i[o]?-1:1;return 0}async function oc(n,e=3e3){let t=typeof AbortController=="function"?new AbortController:null,i=setTimeout(()=>t==null?void 0:t.abort(),e);try{let o=await fetch(n,{signal:t==null?void 0:t.signal});if(!o.ok)return null;let a=await o.json();return qt(a==null?void 0:a.version)?a.version:null}catch(o){return null}finally{clearTimeout(i)}}function Gt(n={}){var Ci,Ii,Ei,Ni,_i,Ti,Pi,Ai;let e=Spicetify.React,t=e.useEffect,i=e.useMemo,o=e.useState,a=e.useRef,[s,l]=o(()=>j()),[u,y]=o("idle"),[f,d]=o(null),[p,k]=o(0),[C,w]=o([]),[b,_]=o([]),[H,Y]=o(null),[re,Z]=o(null),[B,Gn]=o(null),[M,tn]=o(null),[Q,m]=o([]),[S,Pe]=o(null),[R,K]=o([]),[F,Ae]=o(null),[Me,Zt]=o(!1),[Jn,Qt]=o(()=>new Set),[x,z]=o(null),[on,Xn]=o(!1),[Zn,ee]=o(!1),[ei,sn]=o(!1),[De,ni]=o(null),[ne,Se]=o(!1),[Qn,be]=o(null),[ti,ii]=o((Ci=n.section)!=null?Ci:null),[an,xs]=o(!1),[T,vs]=o(()=>zo()),[Cs,oi]=o(!1),[ce,Is]=o(!1),[si,Es]=o(null),[rn,cn]=o(void 0),[D,Ns]=o(null),[Le,_s]=o(null),[le,ai]=o(null),[Ts,ri]=o(!1),[Ps,et]=o(null),[As,ci]=o(!1),[O,nt]=o(null),[A,tt]=o(null),li=a(null),q=i(()=>P(),[]),ke=i(()=>S?[...Q,S]:Q,[Q,S]),it=O?[]:R,ot=O?(Ii=A==null?void 0:A.backups)!=null?Ii:[]:Q,ui=O?(Ei=A==null?void 0:A.safetyCopy)!=null?Ei:null:S,yi=i(()=>{var r;return new Map([...ke,...R,...(r=A==null?void 0:A.backups)!=null?r:[],...A!=null&&A.safetyCopy?[A.safetyCopy]:[]].map(c=>[c,X(c.marketplace_data.keys)]))},[ke,R,A]),ln=r=>{var c;return(c=yi.get(r))!=null?c:X(r.marketplace_data.keys)},Ms=r=>ln(r).map(c=>c.key),Ds=r=>ln(r).length,L=i(()=>Zn&&x?Bt(ln(x),x.spicetify_config,b,H):null,[Zn,x,yi,b,H]),te=i(()=>L?os(L.items):null,[L]),un=i(()=>new Map([...De!=null?De:[],...te!=null?te:[]]),[De,te]),yn=((Ni=x==null?void 0:x.backup)==null?void 0:Ni.kind)==="quarantined",fi=i(()=>{var r;return new Set(((r=L==null?void 0:L.items)!=null?r:[]).filter(c=>{var h;return c.change!=="removed"&&c.isNew&&(yn||Qe(un.get(c.key))||((h=un.get(c.key))==null?void 0:h.kind)==="unchecked")}).map(c=>c.key))},[L,un,yn]),Ls=[...fi].filter(r=>!Jn.has(r)),di=L!==null&&De===null,st=i(()=>go(),[]),pi=i(()=>ys()!==null,[]),V=u==="loading",fn=(f==null?void 0:f.kind)==="warning"||(f==null?void 0:f.kind)==="error"?f:null,mi=!!(M&&B&&M.payload_hash!==B),Be=!!(M&&B&&M.payload_hash===B),gi=!!(x&&B&&x.payload_hash===B),dn=O!==null||an||!Be||ke.length<2,Bs=dn?ot:ot.slice(0,1),pn=(Le==null?void 0:Le.status)==="pending"&&!Le.mine?Le:null,hi=uc(le,D,pn!==null),mn=(_i=F==null?void 0:F.waiting[0])!=null?_i:null,Si=!F||F.trusted||D||hi.kind==="secured"?null:F.refused?"This Spotify account refused backups from this install. Sign in to back up from it.":"This install isn't approved yet. Its backups are kept apart until you approve it from another install or sign in.",at=(rn?((Ti=le==null?void 0:le.accounts)!=null?Ti:[]).filter(r=>r.status==="final"):[]).map((r,c)=>({hash:r.hash,label:`Spotify account ${c+1}${r.device_info?` \xB7 from ${r.device_info}`:""}`})).filter(r=>r.hash!==(le==null?void 0:le.hash)),Os=!!(B&&p>0&&!ke.some(r=>r.payload_hash===B));t(()=>(U().catch(()=>null).then(r=>cn(c=>c!=null?c:r)),W({silent:!0}),Hs(),qo(vs)),[]),t(()=>{if(ni(null),!L||!te)return;[...te.values()].some(Qe)&&sn(!0);let r=!0;return ss(L.items,te).then(c=>{r&&(ni(c),[...c.values()].some(Qe)&&sn(!0))}),()=>{r=!1}},[L,te]),t(()=>{if(!ne)return;let r=c=>{var I;if(!((I=li.current)!=null&&I.isConnected)){Se(!1),be(null);return}c.preventDefault(),c.stopImmediatePropagation();let h=yo(c);if(h.kind!=="ignore"){if(h.kind==="cancel"){Se(!1),be(null);return}if(h.kind==="error"){be(h.message);return}if(fo(h.shortcut)){be(`${Fe(h.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}Se(!1),rt(h.shortcut)}};return window.addEventListener("keydown",r,!0),()=>window.removeEventListener("keydown",r,!0)},[ne,s]);async function bi(){let r=await On();return Gn(r.hash),k(r.installedItemCount),w(r.installedItems),_(r.items),Y(r.spicetifyConfig),Z(r.marketplaceAvailable),r}async function W(r){try{ee(!1),y("loading"),r!=null&&r.silent||d({kind:"info",text:"Checking your Syncify backup\u2026"}),await bi();let c,h=null;try{c=await _e(s)}catch(ft){if(!(ft instanceof G))throw ft;c=xc,h=ft.code}let I=await U().catch(()=>null),ye=I?await Ko(s).catch(()=>null):null,we=I?await U().catch(()=>null):null;cn(we),ai(we?ye:null),Ns(h),h&&ii("account"),_s(c.claim),nt(null),tt(null),tn(c.payload),m(c.backups),Pe(c.safetyCopy),K(c.unapproved),Ae(c.install),z(c.payload),Xn(!0),y(c.exists?"success":"idle"),!(r!=null&&r.silent)&&!h&&d(c.exists&&c.payload?{kind:"success",text:`Backup found from ${Te(c.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(c){Oe(c)}}async function ki(){ri(!0),et(null);try{await jo(s)}catch(r){r instanceof se&&["claim_pending","claimed"].includes(r.code)||et(r instanceof Error?r.message:String(r))}finally{await W({silent:!0}),ri(!1)}}function Us(r){cn(r),!D&&M?ki():W({silent:!0})}function Ks(){cn(null),ai(null),et(null),W({silent:!0})}async function js(){ci(!0);try{await Hn(s),Spicetify.showNotification("Syncify: claim sent for review"),await W({silent:!0})}catch(r){d({kind:"error",text:r instanceof Error?r.message:String(r)})}finally{ci(!1)}}async function $s(r){if(ee(!1),nt(r),tt(null),!r){z(M);return}z(null);try{let c=await _e(s,r);tt(c),z(c.payload)}catch(c){nt(null),z(M),Oe(c)}}async function Hs(){let r=q.version;if(!qt(r))return;let c=await fs(q.releasesUrl);c&&Vt(c,r)>0&&Es(c)}function Rs(r){let c=v(g({},s),{autoBackupEnabled:r});l(c),Pn(c),d({kind:"success",text:r?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}function rt(r){let c=v(g({},s),{shortcut:r});l(c),Pn(c),Tt(r),be(null),d({kind:"success",text:r?`${Fe(r)} now opens Syncify.`:"Keyboard shortcut turned off."})}function Fs(r){let c=v(g({},s),{entryPoint:r});l(c),Pn(c),Nn(r)}function ct(r){ii(r),r!=="settings"&&Se(!1)}function Ws(){be(null),Se(!0)}async function Ys(){try{ee(!1),y("loading"),d({kind:"info",text:"Backing up your extensions and themes\u2026"});let{payload:r,unchanged:c,unapproved:h}=await jn(s);if(await bi(),h){await W({silent:!0}),d({kind:"warning",text:"Backed up, but kept apart until this install is approved."}),Spicetify.showNotification("Syncify: backed up, waiting for approval");return}if(c){Xn(!0),y("success"),d({kind:"success",text:"Everything is already backed up."}),Spicetify.showNotification("Syncify: everything is already backed up");return}tn(r),m(I=>[r,...I.filter(ye=>ye.payload_hash!==r.payload_hash)].slice(0,wc)),Pe(I=>(I==null?void 0:I.payload_hash)===r.payload_hash?null:I),z(r),Xn(!0),y("success"),d({kind:"success",text:`Backed up ${r.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(r){Oe(r)}}async function wi(r){if(mn){Zt(!0);try{await $n(s,mn.id,r),Spicetify.showNotification(r==="approve"?"Syncify: install approved":"Syncify: install refused"),await W({silent:!0})}catch(c){Oe(c)}finally{Zt(!1)}}}function zs(r=x){if(re===!1){let c="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";d({kind:"error",text:c}),Spicetify.showNotification(c,!0,6e3);return}if(!r){let c="No Syncify cloud backup was found for this Spotify account.";d({kind:"error",text:c}),Spicetify.showNotification(c,!0,6e3);return}z(r),sn(!1),Qt(new Set),ee(!0)}async function qs(){let r=x?Bt(ln(x),x.spicetify_config,b,H).manual:[];try{ee(!1),y("loading"),d({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:c,restoredCount:h}=await Uo(s,x!=null?x:void 0,O!=null?O:void 0,Ls);z(c),y("success"),d({kind:"success",text:`Restored ${h} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),Ft(r),setTimeout(()=>window.location.reload(),1e3)}catch(c){Oe(c)}}async function Vs(r){var c;try{await navigator.clipboard.writeText(r)}catch(h){let I=(c=Spicetify.Platform)==null?void 0:c.ClipboardAPI;if(!(I!=null&&I.copy))return;await I.copy(r)}oi(!0),setTimeout(()=>oi(!1),2e3)}function ue(r){if(r.startsWith("mailto:")){window.location.href=r;return}window.open(r,"_blank","noopener,noreferrer")}function Oe(r){if(y("error"),r instanceof He){Is(!0),d(null);return}if(r instanceof me){d({kind:"error",text:r.message}),W({silent:!0});return}if(r instanceof G&&r.code!=="not_linked"){d(null),W({silent:!0});return}let c=r instanceof Error?r.message:String(r);d({kind:"error",text:c}),Spicetify.showNotification(c,!0,6e3)}function lt(r,c){let h=(x==null?void 0:x.payload_hash)===r.payload_hash,I=r.payload_hash===B,ye=Te(r.metadata.last_sync_datetime),we=hs(Ds(r));return e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":h,"data-selected":h?"true":"false",type:"button",key:`${r.payload_hash}-${r.metadata.last_sync_datetime}`,title:c!=null&&c.isSafetyCopy?"Kept aside and updated about once a week, so a burst of new backups can't replace it":c!=null&&c.isUnapproved?"From an install this Spotify account hasn't approved":void 0,onClick:()=>{z(r),ee(!1)},disabled:V},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),c!=null&&c.isSafetyCopy?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Safety copy"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 updated weekly")),e.createElement("span",{className:"syncify-muted"},ye," \xB7 ",we)):c!=null&&c.isUnapproved?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Not approved"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 ",ye)),e.createElement("span",{className:"syncify-muted"},we," \xB7 from ",r.metadata.device_info)):e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-backup-date"},ye),e.createElement("span",{className:"syncify-muted"},we," \xB7 from ",r.metadata.device_info)),I?e.createElement("span",{className:"syncify-tag",title:"What's on this device now"},"Current"):null,c!=null&&c.isSafetyCopy?e.createElement(gc,null):null,c!=null&&c.isUnapproved?e.createElement(Xt,null):null)}function ut(r){r.stopPropagation()}let Gs=ce?"Update Syncify to keep backing up":D?"Sign in to restore":on?M?mi?"Changes since your last backup":"Everything is backed up":"No backup yet":u==="error"?"Couldn't check your backup":"Checking your backup\u2026",xi=ce?"Your backups are safe":D?D==="not_owner"?"Secured by another account":"This backup is secured":on?M?mi?Cc(M,Ms(M),C,H):`Last backup ${Te(M.metadata.last_sync_datetime)}`:"Save your extensions and themes so you can restore them after a reinstall or on another computer.":null,vi=!!(T&&!ce&&Date.now()-T.at<kc),gn=!!(T&&T.loaded===T.total),yt=Zo((Pi=T==null?void 0:T.manual)!=null?Pi:[]);return e.createElement("div",{className:"syncify-panel",ref:li,onClick:ut,onMouseDown:ut,onPointerDown:ut},ce?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,"This version of Syncify is no longer supported."),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ue(`${q.githubUrl}#updating`)},"How to update")):null,pn?e.createElement("div",{className:"syncify-alert",role:"alert"},e.createElement("span",null,(Ai=pn.email)!=null?Ai:"Someone"," is claiming this backup.",rn===null?" If that's you, sign in to finish.":pn.held?" Syncify is reviewing it.":null),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{js()},disabled:As},"Not me"),rn===null?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ct("account")},"That's me, sign in"):null)):null,mn?e.createElement("div",{className:"syncify-alert",role:"alert"},e.createElement("span",null,zt(mn)),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{wi("reject")},disabled:Me},"Not mine"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{wi("approve")},disabled:Me},"Approve"))):null,Si?e.createElement("div",{className:"syncify-alert",role:"status"},e.createElement("span",null,Si)):null,yt.length>0?e.createElement("div",{className:"syncify-alert syncify-manual",role:"status"},e.createElement("span",{className:"syncify-manual-header"},e.createElement("span",null,T.manual.length===1?"1 isn't from Marketplace. Add it in a terminal:":`${T.manual.length} aren't from Marketplace. Add them in a terminal:`),e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:Vo},e.createElement(gs,null))),e.createElement("span",{className:"syncify-code"},e.createElement("code",null,yt.join(`
`)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Vs(yt.join(`
`))}},Cs?"Copied":"Copy"))):null,fn?e.createElement("div",{className:"syncify-alert","data-kind":fn.kind},e.createElement("span",null,fn.text),e.createElement("span",{className:"syncify-alert-actions"},fn.kind==="error"?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{W()},disabled:V},"Try again"):null,e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>d(null)},e.createElement(gs,null)))):null,e.createElement("section",{className:"syncify-status","aria-live":"polite"},vi&&T?e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},gn?"Backup restored":`Restored ${T.loaded} of ${T.total}`),e.createElement("p",{className:"syncify-muted"},gn?T.total===0?"Nothing from Marketplace to load":`${T.loaded} of ${T.total} loaded`:"Missing something? Reload Spotify once more."),gn?e.createElement("p",{className:"syncify-muted"},"Syncify saved your setup?"," ",e.createElement("button",{className:"syncify-text-button syncify-inline-button",type:"button",onClick:()=>ue(q.kofiUrl)},"Support it on Ko-fi")):null):e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},Gs),e.createElement("p",{className:"syncify-muted"},xi?`${xi} \xB7 `:"",hs(p)," on this device")),vi&&!gn?e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:Go},"Reload"):e.createElement("button",{className:"syncify-button",type:"button",onClick:Ys,disabled:V||Be||ce||D!==null,title:D?"Sign in to back up":Be?"No changes since your last backup":void 0},V?"Working\u2026":Be?"Backed up":"Back up now")),!on||D||Q.length>0||R.length>0||at.length>0?e.createElement("section",{className:"syncify-section","aria-label":"Backups"},e.createElement("div",{className:"syncify-section-header"},e.createElement("h4",{className:"syncify-section-title"},"Backups"),e.createElement("span",{className:"syncify-section-controls"},!O&&Be&&ke.length>1?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":an,"aria-controls":"syncify-backup-list",onClick:()=>{xs(!an),ee(!1)}},an?"Show less":`Show all ${ke.length}`,e.createElement(en,null)):null,!D&&at.length>0?e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select","aria-label":"Show backups from",value:O!=null?O:"",onChange:r=>{$s(r.currentTarget.value||null)},disabled:V},e.createElement("option",{value:""},"This Spotify account"),at.map(r=>e.createElement("option",{key:r.hash,value:r.hash},r.label))),e.createElement(en,null)):null)),on?D?e.createElement("p",{className:"syncify-locked"},e.createElement(hc,null),e.createElement("span",null,D==="not_owner"?"Sign in with the account that secured them":"Sign in to see and restore your backups")):O&&!A?e.createElement("p",{className:"syncify-muted"},"Loading backups\u2026"):ot.length===0&&it.length===0?e.createElement("p",{className:"syncify-muted"},"No backups yet."):e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-list",id:"syncify-backup-list",role:"radiogroup","aria-label":"Choose a backup to restore"},Bs.map(r=>lt(r)),dn&&ui?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),lt(ui,{isSafetyCopy:!0})):null,dn&&it.length>0?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),it.map(r=>lt(r,{isUnapproved:!0}))):null),dn?re===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to restore a backup."):Zn?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},"Restore"," ",x?Te(x.metadata.last_sync_datetime):"this backup","?"),yn?e.createElement("div",{className:"syncify-alert"},"An install this Spotify account hasn't approved made this backup. Its items stay off unless you turn them on."):null,L?e.createElement(rc,{preview:L,checks:un,off:fi,allowed:Jn,unapproved:yn,onAllow:(r,c)=>{let h=new Set(Jn);c?h.add(r):h.delete(r),Qt(h)},expanded:ei,onToggle:()=>sn(!ei)}):null,e.createElement("div",{className:"syncify-actions"},Os?e.createElement("div",{className:"syncify-alert syncify-actions-hint"},"Your current setup isn't backed up."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>ee(!1),disabled:V},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:qs,disabled:V||di},di?"Checking\u2026":"Restore"))):e.createElement("div",{className:"syncify-actions"},gi?e.createElement("span",{className:"syncify-muted syncify-actions-hint"},"This backup is already current."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>zs(),disabled:V||!x||gi},"Restore backup")):null):e.createElement("div",{className:"syncify-backup-skeleton","aria-hidden":"true"},e.createElement("span",{className:"syncify-radio"}),e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-skeleton-line"}),e.createElement("span",{className:"syncify-skeleton-line wide"})))):null,e.createElement("div",{className:"syncify-accordion"},e.createElement(ms,{id:"account",title:"Account",openSection:ti,onToggle:ct},e.createElement(yc,{session:rn,locked:D,secure:hi,securing:Ts,secureError:Ps,onSecure:()=>{ki()},onSignedIn:Us,onSignedOut:Ks,onOpenWebsite:ue})),e.createElement(ms,{id:"settings",title:"Settings",openSection:ti,onToggle:ct},e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Back up automatically"),e.createElement("span",{className:"syncify-muted"},"When Spotify starts and something has changed")),e.createElement("input",{className:"syncify-switch",type:"checkbox",role:"switch",checked:s.autoBackupEnabled&&!ce,onChange:r=>Rs(r.currentTarget.checked),disabled:V||ce})),e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Open Syncify from"),st?s.entryPoint==="menu"&&!s.shortcut?e.createElement("span",{className:"syncify-muted"},"Keep a shortcut in case a Spotify update breaks the menu"):null:e.createElement("span",{className:"syncify-muted"},"The profile menu isn't available in this Spicetify version")),e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select",value:st?s.entryPoint:"topbar",onChange:r=>Fs(r.currentTarget.value),disabled:!st},vc.map(r=>e.createElement("option",{key:r.value,value:r.value},r.label))),e.createElement(en,null))),e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Keyboard shortcut"),ne&&!Qn?e.createElement("span",{className:"syncify-muted"},"Press a key combination, or Esc to cancel"):null),e.createElement("span",{className:"syncify-shortcut"},s.shortcut&&!ne?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>rt(null)},"Turn off"):null,!s.shortcut&&!ne?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>rt(Ne)},"Use default"):null,e.createElement("button",{className:"syncify-key",type:"button","data-recording":ne?"true":"false",onClick:()=>ne?Se(!1):Ws(),title:"Click to change"},ne?"Press keys\u2026":s.shortcut?Fe(s.shortcut):"Off"))),Qn?e.createElement("div",{className:"syncify-alert",role:"alert"},Qn):null)),e.createElement("footer",{className:"syncify-footer"},e.createElement("span",{className:"syncify-footer-version"},e.createElement("span",null,"Syncify ",q.version),si?e.createElement("button",{className:"syncify-text-button syncify-update",type:"button",onClick:()=>pi?window.location.reload():ue(`${q.githubUrl}#updating`)},si," is out \xB7 ",pi?"Reload":"How to update"):null),e.createElement("span",{className:"syncify-footer-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ue(q.issueUrl)},"Report an issue"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ue(q.githubUrl)},"GitHub"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ue(q.kofiUrl)},"Support on Ko-fi"))))}var ds={added:{mark:"+",label:"Added"},removed:{mark:"\u2212",label:"Removed"},unchanged:{mark:"=",label:"Unchanged"}},sc=[["extension","Extensions"],["theme","Themes"],["snippet","Snippets"]],ac={extension:"extension",custom_app:"custom app",theme:"theme"};function rc(n){let e=Spicetify.React,{items:t,counts:i,manual:o}=n.preview,a=[...n.off].filter(s=>!n.allowed.has(s)).length;return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-chips","aria-label":"What changes on this device"},i.added?e.createElement("span",{className:"syncify-chip","data-change":"added"},"+",i.added," added"):null,i.removed?e.createElement("span",{className:"syncify-chip","data-change":"removed"},"\u2212",i.removed," removed"):null,i.unchanged?e.createElement("span",{className:"syncify-chip"},i.unchanged," unchanged"):null,o.length?e.createElement("span",{className:"syncify-chip"},o.length," to add manually"):null,a?e.createElement("span",{className:"syncify-chip","data-change":"off"},a," off"):null),t.length||o.length?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":n.expanded,"aria-controls":"syncify-restore-changes",onClick:n.onToggle},n.expanded?"Hide changes":"Show changes",e.createElement(en,null)):null,n.expanded?e.createElement("div",{className:"syncify-changes",id:"syncify-restore-changes"},sc.map(([s,l])=>{let u=t.filter(y=>y.type===s);return u.length===0?null:e.createElement("section",{key:s,"aria-label":l},e.createElement("h5",{className:"syncify-change-group"},l),e.createElement("ul",{className:"syncify-change-list"},u.map(y=>e.createElement("li",{className:"syncify-change",key:y.key},e.createElement("span",{className:"syncify-mark","data-change":y.change,role:"img","aria-label":ds[y.change].label},ds[y.change].mark),e.createElement("span",{className:"syncify-change-name"},y.name,y.repo?e.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",y.repo):null),n.checks.has(y.key)?e.createElement(lc,{check:n.checks.get(y.key)}):n.unapproved&&n.off.has(y.key)?e.createElement("span",{className:"syncify-source","data-warning":"true"},e.createElement(Xt,null),"Not approved"):null,n.off.has(y.key)?e.createElement("label",{className:"syncify-item-switch"},e.createElement("input",{type:"checkbox",checked:n.allowed.has(y.key),onChange:f=>n.onAllow(y.key,f.currentTarget.checked)}),"Restore"):null))))}),o.length?e.createElement("section",{"aria-label":"Add manually"},e.createElement("h5",{className:"syncify-change-group"},"Add manually"),e.createElement("ul",{className:"syncify-change-list"},o.map(s=>e.createElement("li",{className:"syncify-change",key:`${s.type}:${s.name}`},e.createElement("span",{className:"syncify-mark","aria-hidden":"true"}),e.createElement("span",{className:"syncify-change-name"},s.name,e.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",ac[s.type],s.scheme?`, ${s.scheme}`:"")))))):null):null)}var cc={host:"Loads from outside GitHub",repo:"Its code is in a different repo than the one it names",blocked:"On Marketplace's block list",catalog:"Not in Marketplace's catalog",unchecked:"GitHub couldn't be reached to check it",custom:"A snippet made in Marketplace, not from its list"};function lc(n){let e=Spicetify.React,{check:t}=n,i=Qe(t),o=t.kind==="host"?`Code from ${t.host}`:t.kind==="repo"?`Code from ${t.repo}`:t.kind==="blocked"?"Blocked by Marketplace":t.kind==="catalog"?"Not in Marketplace":t.kind==="unchecked"?"Not checked":"Custom";return e.createElement("span",{className:"syncify-source","data-warning":i?"true":"false",title:cc[t.kind]},i?e.createElement(Xt,null):null,o)}function uc(n,e,t){var s,l;if(e==="not_owner")return{kind:"other-account"};if(!n)return t?{kind:"other-claim"}:{kind:"unknown"};let{claim:i}=n;if((i==null?void 0:i.status)==="final"){if(!i.mine)return{kind:"other-account"};let u=((s=n.accounts)!=null?s:[]).filter(y=>y.status==="final").length;return{kind:"secured",linkedCount:Math.max(u,1)}}if((i==null?void 0:i.status)==="pending")return i.mine?{kind:"pending",finalAt:i.final_at,held:i.held,waiting:i.waiting===!0}:{kind:"other-claim"};let o=((l=n.accounts)!=null?l:[]).filter(u=>u.hash===n.hash),a=o[o.length-1];return(a==null?void 0:a.status)==="cancelled"&&a.cancelled_by==="owner"?{kind:"cancelled"}:{kind:"open"}}function yc(n){let e=Spicetify.React,t=e.useEffect,i=e.useState,{session:o,secure:a}=n,[s,l]=i(()=>vn()),[u,y]=i(()=>vn().email),[f,d]=i(""),[p,k]=i(!1),[C,w]=i(null),[b,_]=i(()=>Date.now()),H=!!(s.codeSentAt&&b-s.codeSentAt<fc),Y=Math.max(0,Math.ceil((s.retryAt-b)/1e3)),re=s.retryEmail===null||s.retryEmail===u.trim().toLowerCase()?Y:0;t(()=>{if(!o)return;let m=!0;return Ji().then(S=>{!m||S||(w({kind:"warning",text:$e(new E("signed_out"))}),n.onSignedOut())}).catch(()=>{}),()=>{m=!1}},[o==null?void 0:o.token]),t(()=>{if(s.retryAt<=Date.now())return;let m=setInterval(()=>{_(Date.now()),s.retryAt<=Date.now()&&clearInterval(m)},1e3);return()=>clearInterval(m)},[s.retryAt]);function Z(m){let S=g(g({},vn()),m);Wi(S),l(S),_(Date.now())}async function B(m){var Pe;let S=m.trim();if(!pc.test(S)){w({kind:"error",text:"Enter a valid email address."});return}k(!0),w(null);try{let R=await Vi(S);Z({email:S,codeSentAt:Date.now(),retryAt:Date.now()+R*1e3,retryEmail:S.toLowerCase()}),d("")}catch(R){let K=R instanceof E?R:null,F=(Pe=K==null?void 0:K.retryAfter)!=null?Pe:null,Ae=F&&F<=dc?Date.now()+F*1e3:0,Me=(K==null?void 0:K.code)==="too_many_requests"?null:S.toLowerCase();if((K==null?void 0:K.code)==="resend_wait"){Z({email:S,codeSentAt:s.email===S&&s.codeSentAt?s.codeSentAt:Date.now(),retryAt:Ae,retryEmail:Me});return}Ae&&Z({retryAt:Ae,retryEmail:Me}),w({kind:"error",text:$e(R)})}finally{k(!1)}}async function Gn(){k(!0),w(null);try{let m=await Gi(s.email,f);Z({codeSentAt:null}),d(""),n.onSignedIn(m)}catch(m){w({kind:"error",text:$e(m)});let S=m instanceof E?m.code:null;(S==="too_many_attempts"||S==="code_expired")&&d("")}finally{k(!1)}}async function M(){var S;let m=(S=o==null?void 0:o.email)!=null?S:"";k(!0),w(null),await Xi(),Z({email:m,codeSentAt:null}),y(m),k(!1),n.onSignedOut()}async function tn(){k(!0),w(null);try{n.onOpenWebsite(await Zi())}catch(m){let S=m instanceof E&&m.code==="signed_out";w({kind:S?"warning":"error",text:$e(m)}),S&&n.onSignedOut()}finally{k(!1)}}let Q=C?e.createElement("div",{className:"syncify-alert","data-kind":C.kind==="error"?"error":void 0,role:"alert"},C.text):null;if(o===void 0)return null;if(o){let m=a.kind==="open"||a.kind==="other-claim"||a.kind==="cancelled";return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",{className:"syncify-account-email"},o.email),a.kind==="secured"?e.createElement("span",{className:"syncify-muted"},"Backup secured \xB7"," ",a.linkedCount===1?"1 Spotify account linked":`${a.linkedCount} Spotify accounts linked`):a.kind==="pending"?e.createElement("span",{className:"syncify-muted syncify-account-state"},e.createElement(Sc,null),e.createElement("span",null,"Securing this backup \xB7"," ",a.waiting?"waiting on sign-in":a.held?"in review":`final ${Jt(a.finalAt)}`)):a.kind==="other-account"?e.createElement("span",{className:"syncify-muted"},"This backup is secured by another account"):e.createElement("span",{className:"syncify-muted"},"Signed in")),e.createElement("span",{className:"syncify-account-actions"},e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-label":"Manage on the website",onClick:()=>{tn()},disabled:p},"Manage",e.createElement(bc,null)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{M()},disabled:p},"Sign out"))),m?e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it")),e.createElement("button",{className:"syncify-button",type:"button",onClick:n.onSecure,disabled:p||n.securing||a.kind==="other-claim"},n.securing?"Securing\u2026":a.kind==="cancelled"?"Secure again":"Secure")):null,a.kind==="other-claim"?e.createElement("div",{className:"syncify-alert",role:"status"},"Another claim is pending. If it isn't yours, press Not me above and Syncify will review it."):a.kind==="cancelled"?e.createElement("div",{className:"syncify-alert",role:"status"},"Your claim was cancelled from this Spotify account."):a.kind==="pending"&&a.waiting?e.createElement("div",{className:"syncify-alert",role:"status"},"Syncify ran on this Spotify account without you signed in, maybe after a Spotify update or on another computer. Sign in to Syncify there to finish linking."):null,n.secureError?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},n.secureError):null,Q)}return e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting"},n.locked?e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Sign in to restore"),e.createElement("span",{className:"syncify-muted"},"With the email that secured this backup")):e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it"))),e.createElement("form",{className:"syncify-confirm",noValidate:!0,onSubmit:m=>{m.preventDefault(),!p&&(H?f.length===Wn&&Gn():re||B(u))}},H?e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-muted"},"Code sent to ",mc(s.email)),e.createElement("div",{className:"syncify-field"},e.createElement("input",{className:"syncify-input syncify-code-input",type:"text",inputMode:"numeric",autoComplete:"one-time-code","aria-label":"6-digit code",placeholder:"123456",maxLength:Wn,value:f,onChange:m=>d(m.currentTarget.value.replace(/\D/g,"").slice(0,Wn)),autoFocus:!0}),e.createElement("button",{className:"syncify-button",type:"submit",disabled:p||f.length!==Wn},p?"Verifying\u2026":"Verify")),e.createElement("p",{className:"syncify-muted syncify-account-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{B(s.email)},disabled:p||Y>0},Y>0?`Resend in ${ps(Y)}`:"Resend code"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Z({codeSentAt:null}),d(""),w(null)},disabled:p},"Use another email"))):e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-field"},e.createElement("input",{className:"syncify-input",type:"email",autoComplete:"email","aria-label":"Email",placeholder:"you@example.com",value:u,onChange:m=>y(m.currentTarget.value),autoFocus:!0}),e.createElement("button",{className:"syncify-button",type:"submit",disabled:p||re>0||!u.trim()},p?"Sending\u2026":"Send code")),e.createElement("p",{className:"syncify-muted"},re>0?`Send another code in ${ps(re)}`:"We only email sign-in codes.")),Q))}var Wn=6,fc=600*1e3,dc=300,pc=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function mc(n){let e=n.lastIndexOf("@");return e<1?n:`${n[0]}***${n.slice(e)}`}function Jt(n){let e=Te(new Date(n).toISOString());return e.startsWith("today")?e:`on ${e}`}function ps(n){return`${Math.floor(n/60)}:${String(n%60).padStart(2,"0")}`}function ms(n){let e=Spicetify.React,t=n.openSection===n.id,i=`syncify-section-${n.id}`;return e.createElement("section",{className:"syncify-accordion-section","aria-label":n.title},e.createElement("button",{className:"syncify-accordion-header",type:"button","aria-expanded":t,"aria-controls":i,onClick:()=>n.onToggle(t?null:n.id)},e.createElement("span",{className:"syncify-accordion-title"},n.title),e.createElement(en,null)),t?e.createElement("div",{className:"syncify-accordion-body",id:i},n.children):null)}function gc(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-shield",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"}))}function Xt(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-warning-icon",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M12 3 2 21h20z"}),n.createElement("path",{d:"M12 10v5"}),n.createElement("path",{d:"M12 18h.01"}))}function en(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-chevron",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"m9 6 6 6-6 6"}))}function hc(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-lock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("rect",{x:"5",y:"11",width:"14",height:"10",rx:"2"}),n.createElement("path",{d:"M8 11V7a4 4 0 0 1 8 0v4"}))}function Sc(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-clock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("circle",{cx:"12",cy:"12",r:"9"}),n.createElement("path",{d:"M12 7v5l3 2"}))}function bc(){let n=Spicetify.React;return n.createElement("svg",{className:"syncify-external",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M14 4h6v6"}),n.createElement("path",{d:"M20 4 10 14"}),n.createElement("path",{d:"M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"}))}function gs(){let n=Spicetify.React;return n.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},n.createElement("path",{d:"M18 6 6 18"}),n.createElement("path",{d:"m6 6 12 12"}))}var kc=600*1e3,wc=3,xc={exists:!1,payload:null,backups:[],safetyCopy:null,claim:null,unapproved:[],install:null},vc=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function Cc(n,e,t,i){var C;let o=new Set(e),a=new Set(t),s=t.filter(w=>!o.has(w)).length,l=e.filter(w=>!a.has(w)).length,u=(C=n.spicetify_config)!=null?C:null,y=!!(i&&!u),f=!y&&(i&&u?!wo(i,u):i!==u),d=[s?`${s} added`:null,l?`${l} removed`:null,f?"Spicetify config changed":null].filter(Boolean),p=Te(n.metadata.last_sync_datetime),k=d.length?`${d.join(", ")} since ${p}`:`Last backup ${p}`;return y?`${k} \xB7 Spicetify config not saved yet`:k}function hs(n){return n===1?"1 extension or theme":`${n} extensions and themes`}function Te(n){let e=new Date(n);if(Number.isNaN(e.getTime()))return n;let t=e.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),i=new Date,o=new Date(i);return o.setDate(i.getDate()-1),e.toDateString()===i.toDateString()?`today, ${t}`:e.toDateString()===o.toDateString()?`yesterday, ${t}`:`${e.toLocaleDateString(void 0,{month:"short",day:"numeric",year:e.getFullYear()===i.getFullYear()?void 0:"numeric"})}, ${t}`}function Ss(n){var y;let e=Spicetify.React,t=e.useState,{claim:i}=n,[o,a]=t(!1),[s,l]=t(null);async function u(){a(!0),l(null);try{await Hn(j()),Spicetify.showNotification("Syncify: claim sent for review"),n.onClose()}catch(f){l(f instanceof Error?f.message:String(f)),a(!1)}}return e.createElement("div",{className:"syncify-panel"},e.createElement("p",{className:"syncify-claim-notice"},(y=i.email)!=null?y:"Someone"," is claiming this backup."," ",n.signedIn?i.held?"Syncify is reviewing it.":`It goes through ${Jt(i.final_at)} unless you stop it.`:"If that's you, sign in to finish."),s?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},s):null,e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:n.onClose,disabled:o},"Close"),e.createElement("button",{className:n.signedIn?"syncify-button":"syncify-button secondary",type:"button",onClick:()=>{u()},disabled:o},"Not me"),n.signedIn?null:e.createElement("button",{className:"syncify-button",type:"button",onClick:n.onSignIn,disabled:o},"That's me, sign in")))}var Yn="[Syncify]";function $(n,e){if(e===void 0){console.debug(Yn,n);return}console.debug(Yn,n,e)}function nn(n,e){if(e===void 0){console.warn(Yn,n);return}console.warn(Yn,n,e)}function Ic(){var n;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((n=Spicetify==null?void 0:Spicetify.Topbar)!=null&&n.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var ks="syncify-styles";function Ec(){if(document.getElementById(ks)){$("Another copy of Syncify is running; stopping this one");return}Nc();let n=j();ho({topbarButton:_c(),menuItem:Lc()}),Nn(n.entryPoint),_t(n.shortcut,Vn),Ho({onClaim:e=>{Uc(e)},onInstall:Kc}).catch(e=>{nn("Startup sync check failed",e)}),Xo().catch(e=>{nn("Restore check failed",e)})}function Nc(){let n=document.createElement("style");n.id=ks,n.textContent=Li,document.head.appendChild(n)}function _c(){let{extensionName:n}=P(),e=new Spicetify.Topbar.Button(n,dt,t=>{$("Topbar button clicked",zn(t)),Vn()},!1,!0);return ws(e),Ac(e),Oc(e),$("Topbar button registered",zn(e)),e}function ws(n){var t;let e=n;n.element.style.setProperty("-webkit-app-region","no-drag"),(t=e.button)==null||t.style.setProperty("-webkit-app-region","no-drag")}var bs=".main-actionButtons",Tc=".Root__globalNav, .Root__top-bar",Pc=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function Ac(n){if(typeof MutationObserver=="undefined")return;let e=!1,t=null,i=()=>{e=!1,a();let s=n.element,l=document.querySelector(bs);!s||!l||l.contains(s)||(l.prepend(s),Mc(n),ws(n),$("Topbar button re-attached",zn(n)))},o=new MutationObserver(()=>{e||(e=!0,setTimeout(i,250))}),a=()=>{var u;if(t!=null&&t.isConnected)return;let s=document.querySelector(bs),l=(u=s==null?void 0:s.closest(Tc))!=null?u:s==null?void 0:s.parentElement;if(o.disconnect(),t=l!=null?l:null,!l){o.observe(document.body,{childList:!0,subtree:!0});return}o.observe(l,{childList:!0,subtree:!0});for(let y=l.parentElement;y;y=y.parentElement)o.observe(y,{childList:!0})};i()}function Mc(n){let e=Dc(n);if(!e||e.className&&e.className!=="undefined")return;let t=Array.from(document.querySelectorAll(Pc)).find(i=>!n.element.contains(i));t!=null&&t.className&&(e.className=t.className)}function Dc(n){return n.button}function Lc(){var n;if(typeof((n=Spicetify.Menu)==null?void 0:n.Item)!="function")return null;try{return new Spicetify.Menu.Item(P().extensionName,!1,()=>Vn(),Bc())}catch(e){return nn("Failed to create profile menu item",e),null}}function Bc(){return dt.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function Oc(n){Object.assign(window,{SyncifyDebug:{button:n,element:n.element,openModal:Vn,inspect:()=>zn(n),clickElement:()=>{var e;return(e=n.element)==null?void 0:e.click()},clickInnerButton:()=>{var e;return(e=n.button)==null?void 0:e.click()},clickCallback:()=>n.onClick(n)}})}function zn(n){var e,t,i,o,a;return{label:n.label,disabled:n.disabled,isRight:n.isRight,hasElement:!!n.element,elementConnected:(e=n.element)==null?void 0:e.isConnected,elementDisabled:(t=n.element)==null?void 0:t.disabled,elementAriaDisabled:(i=n.element)==null?void 0:i.getAttribute("aria-disabled"),elementClass:(o=n.element)==null?void 0:o.className,appRegion:n.element?getComputedStyle(n.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:n.button?getComputedStyle(n.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:n.element?getComputedStyle(n.element).pointerEvents:null,visibility:n.element?getComputedStyle(n.element).visibility:null,display:n.element?getComputedStyle(n.element).display:null,rect:(a=n.element)==null?void 0:a.getBoundingClientRect().toJSON()}}var N=null;function Vn(){if(N!=null&&N.container.isConnected){$("Closing modal"),Spicetify.PopupModal.hide();return}$("Opening modal"),qn(Spicetify.React.createElement(Gt))}async function Uc(n){let e=await U().catch(()=>null);N!=null&&N.container.isConnected||($("Opening claim notice"),qn(Spicetify.React.createElement(Ss,{claim:n,signedIn:e!==null,onSignIn:()=>qn(Spicetify.React.createElement(Gt,{section:"account"})),onClose:()=>Spicetify.PopupModal.hide()})))}function Kc(n){if(N!=null&&N.container.isConnected)return;$("Opening install notice");let e=()=>Spicetify.PopupModal.hide();qn(Spicetify.React.createElement("div",{className:"syncify-panel"},Spicetify.React.createElement(ls,{install:n,onDone:e,onClose:e})))}function qn(n){var t;(t=N==null?void 0:N.root)==null||t.unmount();let e=document.createElement("div");N={container:e,root:null};try{Spicetify.PopupModal.display({title:P().extensionName,content:e,isLarge:!1})}catch(i){throw nn("Failed to open PopupModal",i),i}jc(e),Hc(e,n)}function jc(n){requestAnimationFrame(()=>{let e=$c(n);e==null||e.classList.add("syncify-modal-shell");let t=e==null?void 0:e.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');t&&(t.classList.add("syncify-modal-close"),t.setAttribute("aria-label",`Close ${P().extensionName}`),t.title="Close",t.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function $c(n){let e=n.parentElement;for(;e&&e!==document.body;){if(e.querySelector(".main-trackCreditsModal-header"))return e;e=e.parentElement}return n.closest('[class*="trackCreditsModal"]')}function Hc(n,e){try{if(typeof Spicetify.ReactDOM.createRoot=="function"){let t=Spicetify.ReactDOM.createRoot(n);t.render(e),(N==null?void 0:N.container)===n&&(N.root=t),$("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(e,n),$("Modal rendered",{renderer:"render"})}catch(t){throw nn("Failed to render modal",t),t}}Jo();(function n(){if(!Ic()){setTimeout(n,100);return}$("Spicetify APIs ready"),Ec()})();})();
