// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var Ws=Object.defineProperty,Ys=Object.defineProperties;var zs=Object.getOwnPropertyDescriptors;var Ei=Object.getOwnPropertySymbols;var qs=Object.prototype.hasOwnProperty,Vs=Object.prototype.propertyIsEnumerable;var Ni=(e,n,t)=>n in e?Ws(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,m=(e,n)=>{for(var t in n||(n={}))qs.call(n,t)&&Ni(e,t,n[t]);if(Ei)for(var t of Ei(n))Vs.call(n,t)&&Ni(e,t,n[t]);return e},v=(e,n)=>Ys(e,zs(n));var _i=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var rt=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var Xs="syncify",we="state";function ct(){let e;try{e=window.indexedDB}catch(n){return Promise.resolve(null)}return e?new Promise(n=>{let t;try{t=e.open(Xs,1)}catch(i){n(null);return}t.onupgradeneeded=()=>{t.result.createObjectStore(we)},t.onerror=()=>n(null),t.onblocked=()=>n(null),t.onsuccess=()=>n(t.result)}):Promise.resolve(null)}function lt(e,n){let t=ct().then(i=>new Promise((o,s)=>{if(!i){s(new Error("IndexedDB isn't available."));return}try{let a=i.transaction(we,e),u=n(a.objectStore(we));a.oncomplete=()=>{i.close(),o(u.result)},a.onerror=a.onabort=()=>{var c;i.close(),s((c=a.error)!=null?c:new Error("IndexedDB failed."))}}catch(a){i.close(),s(a)}}));return Promise.race([t,new Promise((i,o)=>setTimeout(()=>o(new Error("IndexedDB took too long.")),2e3))])}function xe(e){return lt("readonly",n=>n.get(e))}async function ve(e,n){await lt("readwrite",t=>t.put(n,e))}async function Ti(e){await lt("readwrite",n=>n.delete(e))}var Z={extensionName:"Syncify",version:"1.11.0",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com"};function M(){var n,t,i,o,s,a,u,c;let e=window.SyncifyConfig;return{extensionName:(n=ue(e==null?void 0:e.extensionName))!=null?n:Z.extensionName,version:(t=Pi(e==null?void 0:e.version))!=null?t:Z.version,workerUrl:(i=ue(e==null?void 0:e.workerUrl))!=null?i:Z.workerUrl,webUrl:(o=ue(e==null?void 0:e.webUrl))!=null?o:Z.webUrl,githubUrl:(s=ue(e==null?void 0:e.githubUrl))!=null?s:Z.githubUrl,kofiUrl:(a=ue(e==null?void 0:e.kofiUrl))!=null?a:Z.kofiUrl,issueUrl:(u=ue(e==null?void 0:e.issueUrl))!=null?u:Z.issueUrl,releasesUrl:(c=ue(e==null?void 0:e.releasesUrl))!=null?c:Z.releasesUrl}}function ue(e){return Pi(e)}function Pi(e){return typeof e=="string"&&e.trim()?e.trim():null}var Zs="x-syncify-version",Qs="x-syncify-install",ea="x-syncify-timezone",Ai="install-id",Mi="syncify:install-id",na=2e3,hn=null;async function Di(){let e={[Zs]:M().version,[Qs]:(await ut()).id},n=oa();return n&&(e[ea]=n),e}function ut(){return hn!=null||(hn=ta().catch(()=>({id:Sn(),inDatabase:!1}))),hn}async function ta(){let e=await Promise.race([ia(),new Promise(n=>setTimeout(()=>n(null),na))]);if(e)return{id:e,inDatabase:!0};try{let n=window.localStorage.getItem(Mi);if(n&&Bi(n))return{id:n,inDatabase:!1};let t=Sn();return window.localStorage.setItem(Mi,t),{id:t,inDatabase:!1}}catch(n){return{id:Sn(),inDatabase:!1}}}async function ia(){let e=await ct();return e?new Promise(n=>{let t=null;try{let i=e.transaction(we,"readwrite"),o=i.objectStore(we),s=o.get(Ai);s.onsuccess=()=>{if(typeof s.result=="string"&&Bi(s.result)){t=s.result;return}t=Sn(),o.put(t,Ai)},i.oncomplete=()=>{e.close(),n(t)},i.onerror=i.onabort=()=>{e.close(),n(null)}}catch(i){e.close(),n(null)}}):null}function Sn(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let n=[...e].map(t=>t.toString(16).padStart(2,"0"));return[n.slice(0,4).join(""),n.slice(4,6).join(""),n.slice(6,8).join(""),n.slice(8,10).join(""),n.slice(10).join("")].join("-")}function Bi(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(e)}function oa(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(e){return null}}var sa="syncify-signature-v1",aa={name:"ECDSA",hash:"SHA-256"};function kn(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function bn(e){return yt(new Uint8Array(await crypto.subtle.exportKey("raw",e)))}async function Ue(e,n,t,i,o){let s=await ra(n,t,i,o),a=await crypto.subtle.sign(aa,e,s);return yt(new Uint8Array(a))}async function ra(e,n,t,i){let{pathname:o,search:s}=new URL(t),a=new TextEncoder,u=yt(new Uint8Array(await crypto.subtle.digest("SHA-256",a.encode(i))));return a.encode([sa,e,n.toUpperCase(),o+s,u].join(`
`))}function yt(e){let n="";for(let t=0;t<e.length;t++)n+=String.fromCharCode(e[t]);return btoa(n).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var Li="device-key",ft="session",Oi="salt",ye=null,Ke,Ui={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function je(e){if(ye)return ye;let n=await xe(Li);return ca(n)?(ye=Promise.resolve(n),n):e?(ye=kn().then(async t=>(await ve(Li,t),t)),ye.catch(()=>{ye=null}),ye):null}async function R(){let e=await xe(ft);return la(e)?e:null}function dt(e){return ve(ft,e)}async function fe(){await Ti(ft).catch(()=>{})}async function wn(){if(Ke===void 0){let e=await xe(Oi).catch(()=>{});Ke=typeof e=="string"?e:null}return Ke}async function xn(e){e!==Ke&&(Ke=e,await ve(Oi,e).catch(()=>{}))}function vn(){return Ui}function Ki(e){Ui=e}function ca(e){let n=e;return!!(n&&n.privateKey instanceof CryptoKey&&n.publicKey instanceof CryptoKey)}function la(e){let n=e;return!!(n&&typeof n.token=="string"&&n.token&&typeof n.email=="string")}var ji="install-key",Ce=null;function $i(){return Ce!=null||(Ce=ua()),Ce.catch(()=>{Ce=null}),Ce.catch(()=>null)}async function ua(){if(!(await ut()).inDatabase)return null;let e=await xe(ji),n=fa(e)?e:await ya();return{privateKey:n.privateKey,publicKey:await bn(n.publicKey)}}async function ya(){let e=await kn();return await ve(ji,e),e}function fa(e){let n=e;return!!(n&&n.privateKey instanceof CryptoKey&&n.publicKey instanceof CryptoKey)}var da="/api/auth/email-otp/send-verification-otp",pa="/api/auth/sign-in/email-otp",ma="/api/auth/get-session",ga="/api/auth/sign-out",ha="/api/auth/link",Sa="x-syncify-device-key",ka="x-syncify-signature",Hi="x-syncify-salt",ba="none",wa={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again.",link_failed:"Couldn't open the website. Try again."},N=class extends Error{constructor(t,i=null){var o;super((o=wa[t])!=null?o:"Sign-in failed. Try again.");this.code=t;this.retryAfter=i;this.name="AccountError"}};function $e(e){return e instanceof N?e.message:"Sign-in failed. Try again."}async function Ri(e){let n=await Cn(da,{method:"POST",body:JSON.stringify({email:e,type:"sign-in"})});return typeof(n==null?void 0:n.resend_in)=="number"?n.resend_in:60}async function Fi(e,n){var s;let t=await je(!0).catch(()=>{throw new N("no_device_key")}),i=await Cn(pa,{method:"POST",body:JSON.stringify({email:e,otp:n}),keys:t,sendPublicKey:!0});if(typeof(i==null?void 0:i.token)!="string"||!i.token)throw new N("sign_in_failed");let o={token:i.token,email:typeof((s=i.user)==null?void 0:s.email)=="string"?i.user.email:e};return await dt(o).catch(()=>{throw new N("no_device_key")}),pt=!0,o}var pt=!1;async function Wi(){var n;let e=await R();if(!e||pt)return e;try{let t=await mt(e,ma,"GET");pt=!0;let i=(n=t==null?void 0:t.user)==null?void 0:n.email;if(typeof i!="string"||i===e.email)return e;let o=v(m({},e),{email:i});return await dt(o).catch(()=>{}),o}catch(t){if(t instanceof N&&t.code==="signed_out")return null;throw t}}async function Yi(){let e=await R().catch(()=>null);e&&await mt(e,ga,"POST").catch(()=>{}),await fe()}async function zi(){let e=await R();if(!e)throw new N("signed_out");let n=await mt(e,ha,"POST"),t=typeof(n==null?void 0:n.url)=="string"?n.url:"",i=new URL(M().webUrl).origin;if(!t.startsWith(`${i}/link#`))throw new N("link_failed");return t}async function mt(e,n,t){let i=await je(!1);if(!i)throw await fe(),new N("signed_out");return Cn(n,{method:t,token:e.token,keys:i})}async function Cn(e,n,t=!1){var f,h,d;let i=`${M().webUrl.replace(/\/+$/,"")}${e}`,o={};if(n.body!==void 0&&(o["content-type"]="application/json"),n.token&&(o.authorization=`Bearer ${n.token}`),n.keys){let b=(f=await wn())!=null?f:ba;o[Hi]=b,o[ka]=await Ue(n.keys.privateKey,b,n.method,i,(h=n.body)!=null?h:""),n.sendPublicKey&&(o[Sa]=await bn(n.keys.publicKey))}let s;try{s=await fetch(i,{method:n.method,headers:o,body:n.body})}catch(b){throw new N("offline")}let a=s.headers.get(Hi);a&&await xn(a);let u=await s.json().catch(()=>null);if(s.ok)return u;let c=typeof(u==null?void 0:u.code)=="string"?u.code:s.status===503?"unavailable":"failed";if(c==="stale_salt"&&n.keys&&!t)return Cn(e,n,!0);c==="signed_out"&&await fe();let y=Number(s.headers.get("retry-after"));throw new N(c,Number.isFinite(y)&&y>0?y:(d=xa[c])!=null?d:null)}var xa={resend_wait:60,too_many_requests:60,send_failed:60};var va="x-syncify-user-hash",Ca="x-syncify-identity",Ia="x-syncify-signature",Ea="x-syncify-install-key",Na="x-syncify-install-signature",gt="x-syncify-salt",_a="none",Ta="/restores",Pa="/installs",Aa="hash",qi=3,He=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}},z=class extends Error{constructor(t){super(t==="not_linked"?"Couldn't read that Spotify account's backups.":"Sign in to restore this backup.");this.code=t;this.name="LockedError"}},de=class extends Error{constructor(){super("This Spotify account doesn't accept backups from this install. Sign in to back up."),this.name="InstallRefusedError"}};async function Gi(e,n,t){var s;let i=await Q(e,n,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(t)});if(i.status===403&&((s=await i.json().catch(()=>null))==null?void 0:s.code)==="install_refused")throw new de;if(!i.ok)throw new Error(`Backup failed with HTTP ${i.status}.`);let o=await i.json().catch(()=>null);return{unchanged:(o==null?void 0:o.unchanged)===!0,unapproved:(o==null?void 0:o.quarantined)===!0}}async function Ji(e,n,t,i){let o=await Q(e,n,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({install:t,action:i})},Pa);if(o.ok)return;let s=await o.json().catch(()=>null);if((s==null?void 0:s.code)!=="not_pending")throw new Error(`Couldn't answer with HTTP ${o.status}.`)}async function ht(e,n,t){var d,b,C,S;let i=await Q(e,n,{method:"GET"},Zi("/",t));if(i.status===404){let w=await i.json().catch(()=>null);return{exists:!1,payload:null,backups:[],safetyCopy:null,claim:Re(w==null?void 0:w.claim),unapproved:[],install:Vi(w==null?void 0:w.install)}}if(!i.ok)throw new Error(`Restore failed with HTTP ${i.status}.`);let o=await i.json(),s=Re(o.claim),a=Vi(o.install);delete o.claim,delete o.install;let u=[o,...(d=o.backup_history)!=null?d:[]];if(!u.every(w=>w.backup))return{exists:!0,payload:o,backups:u.slice(0,qi),safetyCopy:(b=u[qi])!=null?b:null,claim:s,unapproved:[],install:a};let c=u.filter(w=>{var I;return((I=w.backup)==null?void 0:I.kind)==="rolling"}),y=(C=u.find(w=>{var I;return((I=w.backup)==null?void 0:I.kind)==="anchor"}))!=null?C:null,f=u.filter(w=>{var I;return((I=w.backup)==null?void 0:I.kind)==="quarantined"}),h=(S=c[0])!=null?S:y;return h?c.length===0&&y?{exists:!0,payload:h,backups:[y],safetyCopy:null,claim:s,unapproved:f,install:a}:{exists:!0,payload:h,backups:c,safetyCopy:y,claim:s,unapproved:f,install:a}:{exists:!1,payload:null,backups:[],safetyCopy:null,claim:s,unapproved:f,install:a}}async function Xi(e,n,t,i){try{await Q(e,n,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:t}),keepalive:!0},Zi(Ta,i))}catch(o){}}async function Q(e,n,t,i="",o=!1){var S,w,I,te,$;let s=i?`${e.replace(/\/+$/,"")}${i}`:e,a=(S=t.method)!=null?S:"GET",u=await R().catch(()=>null),c=u?await je(!1).catch(()=>null):null,y=await $i(),f={},h=(w=await wn())!=null?w:_a;u&&c&&(f.authorization=`Bearer ${u.token}`,f[gt]=h,f[Ia]=await Ue(c.privateKey,h,a,s,(I=t.body)!=null?I:"")),y&&(f[gt]=h,f[Ea]=y.publicKey,f[Na]=await Ue(y.privateKey,h,a,s,(te=t.body)!=null?te:""));let d=await fetch(s,v(m({},t),{headers:m(v(m(m({},t.headers),await Di()),{[va]:n.hash,[Ca]:n.field}),f)})),b=d.headers.get(gt);if(b&&await xn(b),d.status===426)throw new He;if(d.status!==401)return d;let C=($=await d.clone().json().catch(()=>null))==null?void 0:$.code;if(!o){if(C==="stale_salt"&&(u||y))return Q(e,n,t,i,!0);if(C==="signed_out"&&u)return await fe(),Q(e,n,t,i,!0)}throw C==="claimed"||C==="not_owner"||C==="not_linked"?new z(C):(C==="signed_out"&&await fe(),new N(typeof C=="string"?C:"failed"))}function Zi(e,n){return n?`${e}?${Aa}=${encodeURIComponent(n)}`:e}function Vi(e){let n=e;if(!n||typeof n.trust!="string")return null;let t=Array.isArray(n.waiting)?n.waiting:[];return{trusted:n.trust!=="pending"&&n.trust!=="rejected",refused:n.trust==="rejected",waiting:t.flatMap(i=>{let o=i;return o&&typeof o.id=="string"&&typeof o.first_seen_at=="number"?[{id:o.id,device:typeof o.device=="string"?o.device:null,first_seen_at:o.first_seen_at}]:[]})}}function Re(e){let n=e;return!n||typeof n.mine!="boolean"?null:n.status==="final"?{status:"final",mine:n.mine}:n.status!=="pending"||typeof n.final_at!="number"?null:{status:"pending",mine:n.mine,email:typeof n.email=="string"?n.email:null,final_at:n.final_at,held:n.held===!0}}var Qi="/claims",Ma="/claims/cancel",Da={no_backup:"Back up first, then secure your backup.",unsupported_identity:"This Spotify account can't be secured.",too_many_accounts:"Your account already has 10 Spotify accounts linked.",offline:"Couldn't reach Syncify. Check your connection and try again."},ee=class extends Error{constructor(t){var i;super((i=Da[t])!=null?i:"Couldn't secure your backup. Try again.");this.code=t;this.name="ClaimError"}};async function eo(e,n){let t=await St(e,n,"GET",Qi);if(!t.ok)throw new ee(await kt(t));let i=await t.json().catch(()=>null);return{claim:Re(i==null?void 0:i.claim),accounts:Array.isArray(i==null?void 0:i.accounts)?i.accounts.filter(Ba):null}}async function no(e,n){let t=await St(e,n,"POST",Qi);if(!t.ok)throw new ee(await kt(t));let i=await t.json().catch(()=>null);return Re(i==null?void 0:i.claim)}async function to(e,n){let t=await St(e,n,"POST",Ma);if(!t.ok&&t.status!==404)throw new ee(await kt(t))}async function St(e,n,t,i){try{return await Q(e,n,{method:t},i)}catch(o){throw o instanceof TypeError?new ee("offline"):o}}async function kt(e){let n=await e.json().catch(()=>null);return typeof(n==null?void 0:n.code)=="string"?n.code:"failed"}function Ba(e){let n=e;return!!(n&&typeof n.hash=="string"&&(n.status==="pending"||n.status==="final"||n.status==="cancelled"))}var Ee={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},La=/^([a-z0-9]|f([1-9]|1[0-2]))$/,Oa=250,Ua=40,bt=null,In=null,Ie=null;function io(){return/mac/i.test(navigator.platform||navigator.userAgent)}function oo(e){if(e===null)return null;if(!e||typeof e!="object")return Ee;let n=e;return typeof n.key!="string"||!La.test(n.key)?Ee:{key:n.key,ctrl:!!n.ctrl,alt:!!n.alt,shift:!!n.shift,meta:!!n.meta}}function Fe(e){if(!e)return"Off";let n=e.key.toUpperCase();return io()?[e.ctrl?"\u2318":"",e.alt?"\u2325":"",e.shift?"\u21E7":"",n].join(""):[e.ctrl&&"Ctrl",e.meta&&"Win",e.alt&&"Alt",e.shift&&"Shift",n].filter(Boolean).join("+")}function so(e){if(e.key==="Escape")return{kind:"cancel"};let n=Ka(e.code);if(!n)return{kind:"ignore"};let t=io();if(t&&e.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:n,ctrl:t?e.metaKey:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:t?!1:e.metaKey},o=n.startsWith("f")&&n.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!o?{kind:"error",message:`Include ${t?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function Ka(e){var t,i;let n=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(e);return n?((i=(t=n[1])!=null?t:n[2])!=null?i:n[3]).toLowerCase():null}function ao(e){var n;if(Ie&&ja(Ie,e))return!1;try{let t=Spicetify.Mousetrap,i=(n=t.trigger)==null?void 0:n.call(t)._directMap;if(!i)return!1;let o=wt(e);return Object.keys(i).some(s=>s.startsWith(`${o}:`))}catch(t){return!1}}function xt(e,n,t=0){if(bt=n,In=e,!ro()){if(t>=Ua){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>xt(In,n,t+1),Oa);return}vt(In)}function vt(e){if(In=e,!ro()||!bt)return;let n=bt;try{if(Ie&&Spicetify.Keyboard._deregisterShortcut(Ie),Ie=null,!e)return;Spicetify.Keyboard.registerShortcut(e,t=>{t.preventDefault(),n()}),Ie=e,console.debug("[Syncify]","Keyboard shortcut registered",Fe(e))}catch(t){console.warn("[Syncify]","Failed to register keyboard shortcut",t)}}function ro(){var e;return typeof((e=Spicetify.Keyboard)==null?void 0:e.registerShortcut)=="function"}function wt(e){return[e.ctrl&&"mod",e.meta&&"meta",e.alt&&"alt",e.shift&&"shift",e.key].filter(Boolean).join("+")}function ja(e,n){return wt(e)===wt(n)}var Ct="both",$a=["both","topbar","menu"],We=null,Ye=null,En=!1;function co(e){return $a.includes(e)?e:Ct}function lo(){var e;return typeof((e=Spicetify.Menu)==null?void 0:e.Item)=="function"}function uo(e){We=e.topbarButton,Ye=e.menuItem}function Nn(e){let n=e!=="menu"||!Ye,t=e!=="topbar";if(We!=null&&We.element&&(We.element.style.display=n?"":"none"),!!Ye)try{t&&!En?(Ye.register(),En=!0):!t&&En&&(Ye.deregister(),En=!1)}catch(i){console.warn("[Syncify]","Failed to update profile menu item",i)}}var Tn="syncify:config",_n={workerUrl:M().workerUrl,autoBackupEnabled:!1,shortcut:Ee,entryPoint:Ct};function K(){var t,i;let e=M(),n=(i=(t=Spicetify.LocalStorage)==null?void 0:t.get(Tn))!=null?i:window.localStorage.getItem(Tn);if(!n)return v(m({},_n),{workerUrl:e.workerUrl});try{let o=JSON.parse(n);return{workerUrl:e.workerUrl,autoBackupEnabled:o.autoBackupEnabled===void 0?_n.autoBackupEnabled:!!o.autoBackupEnabled,shortcut:o.shortcut===void 0?_n.shortcut:oo(o.shortcut),entryPoint:co(o.entryPoint)}}catch(o){return v(m({},_n),{workerUrl:e.workerUrl})}}function Pn(e){var t;let n=JSON.stringify({workerUrl:M().workerUrl,autoBackupEnabled:e.autoBackupEnabled,shortcut:e.shortcut,entryPoint:e.entryPoint});if((t=Spicetify.LocalStorage)!=null&&t.set){Spicetify.LocalStorage.set(Tn,n);return}window.localStorage.setItem(Tn,n)}function ze(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}async function An(e){let n=new TextEncoder().encode(e),t=await crypto.subtle.digest("SHA-256",n);return[...new Uint8Array(t)].map(i=>i.toString(16).padStart(2,"0")).join("")}function qe(e){return JSON.stringify(It(e))}function It(e){return Array.isArray(e)?e.map(It):e&&typeof e=="object"?Object.keys(e).sort().reduce((n,t)=>(n[t]=It(e[t]),n),{}):e}var Ha=["username","canonicalUsername","id","uri","displayName"];async function q(){let{value:e,field:n}=await Ra();return{hash:await An(e),field:n}}async function Ra(){var o;let e=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let n=await e.getUser(),t=Ha.find(s=>(n==null?void 0:n[s])!=null),i=t?n[t]:void 0;if(!t||!i)throw new Error("Unable to resolve the active Spotify user.");return{value:i,field:t}}var Fa=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,Wa=100,Ya="marketplace:installed-extensions",za="marketplace:installed-themes",qa="marketplace:theme-installed",Va="marketplace:installed:",Ga="marketplace";function Nt(e){return Spicetify.Config?_t(Spicetify.Config,e):null}function _t(e,n){var s;let t=ne(e),i=new Set(Ja(n)),o=((s=n[qa])==null?void 0:s.includes(Va))===!0;return{current_theme:o?Ga:t.current_theme,color_scheme:o?"":t.color_scheme,extensions:t.extensions.filter(a=>!i.has(a)),custom_apps:t.custom_apps}}function ne(e){let n=e&&typeof e=="object"?e:{};return{current_theme:Et(n.current_theme)?n.current_theme:"",color_scheme:Et(n.color_scheme)?n.color_scheme:"",extensions:yo(n.extensions),custom_apps:yo(n.custom_apps)}}function mo(e,n){return qe(ne(e))===qe(ne(n))}function yo(e){return Array.isArray(e)?[...new Set(e.filter(Et))].sort().slice(0,Wa):[]}function Et(e){return typeof e=="string"&&Fa.test(e)}function Ja(e){let n=fo(e[Ya]).map(i=>{var s;let o=(s=po(e[i]))==null?void 0:s.manifest;return o&&typeof o=="object"?o.main:void 0}),t=fo(e[za]).flatMap(i=>{var s;let o=(s=po(e[i]))==null?void 0:s.include;return Array.isArray(o)?o:[]});return[...n,...t].flatMap(i=>{let o=typeof i=="string"?i.split("/").pop():void 0;return o?[o]:[]})}function fo(e){try{let n=e?JSON.parse(e):[];return Array.isArray(n)?n.filter(t=>typeof t=="string"):[]}catch(n){return[]}}function po(e){try{let n=e?JSON.parse(e):null;return n&&typeof n=="object"&&!Array.isArray(n)?n:null}catch(n){return null}}function go(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var Xa=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],Za="marketplace:installed:",ho=`${Za}snippet:`,Qa="wsoltani/syncify",er="marketplace",So={added:0,removed:1,unchanged:2};function V(e){let n=new Map;for(let[t,i]of Xa)for(let o of or(e[t]))n.has(o)||n.set(o,tr(o,i,e[o]));return[...n.values()]}function Tt(e,n,t,i){let o=new Set(e.map(c=>c.key)),s=new Map(t.map(c=>[c.key,c])),a=[...e.map(c=>{let y=s.get(c.key);return v(m({},c),{change:y?"unchanged":"added",isNew:!y||y.sources.join(" ")!==c.sources.join(" ")})}),...t.filter(c=>!o.has(c.key)).map(c=>v(m({},c),{change:Pt(c,e)?"unchanged":"removed",isNew:!1}))].sort((c,y)=>So[c.change]-So[y.change]||c.name.localeCompare(y.name)),u={added:0,removed:0,unchanged:0};for(let c of a)u[c.change]+=1;return{items:a,counts:u,manual:nr(n,i)}}function Pt(e,n){return e.type==="extension"&&ko(e)&&!n.some(ko)}function ko(e){var n;return((n=e.repo)==null?void 0:n.toLowerCase())===Qa}function nr(e,n){if(!e)return[];let t=ne(e),i=ne(n),o=[...t.extensions.filter(a=>!i.extensions.includes(a)).map(a=>({type:"extension",name:a})),...t.custom_apps.filter(a=>!i.custom_apps.includes(a)).map(a=>({type:"custom_app",name:a}))],s=t.current_theme;return s&&s!==er&&(s!==i.current_theme||t.color_scheme!==i.color_scheme)&&o.push(m({type:"theme",name:s},t.color_scheme?{scheme:t.color_scheme}:{})),o}function tr(e,n,t){var c,y;let i=bo(t),o=bo(i==null?void 0:i.manifest),s=Mn(i==null?void 0:i.user),a=Mn(i==null?void 0:i.repo),u=(y=(c=Mn(i==null?void 0:i.title))!=null?c:Mn(o==null?void 0:o.name))!=null?y:e.startsWith(ho)?e.slice(ho.length):e.split("/").pop()||e;return{key:e,type:n,name:u,repo:n!=="snippet"&&s&&a?`${s}/${a}`:null,sources:ir(n,i),custom:n==="snippet"&&(i==null?void 0:i.custom)===!0}}function ir(e,n){return n?(e==="extension"?[n.extensionURL]:e==="theme"?[n.cssURL,n.schemesURL,...Array.isArray(n.include)?n.include:[]]:[]).filter(i=>typeof i=="string"&&i!==""):[]}function Mn(e){return typeof e=="string"&&e.trim()?e.trim():null}function or(e){try{let n=e?JSON.parse(e):[];return Array.isArray(n)?n.filter(t=>typeof t=="string"):[]}catch(n){return[]}}function bo(e){let n=e;if(typeof e=="string")try{n=JSON.parse(e)}catch(t){return null}return n&&typeof n=="object"&&!Array.isArray(n)?n:null}var Dn="spicetify-marketplace";var Ve="settings";async function wo(){let e=await Co();if(e.kind!=="ok")return null;try{let n=await Io(e.db,"readonly",i=>i.getAll());if(!n)return null;let t={};for(let i of n)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(t[i.key]=i.value);return t}finally{e.db.close()}}async function xo(e){let n=await Co();if(n.kind==="unavailable")return"unavailable";let t=n.kind==="ok"?n.db:await sr();if(!t)return"failed";try{return await Io(t,"readwrite",o=>{let s;for(let[a,u]of Object.entries(e))s=o.put({key:a,value:u});return s})===null?"failed":"written"}finally{t.close()}}function vo(){var e;try{return(e=window.indexedDB)!=null?e:null}catch(n){return null}}async function Co(){let e=vo();return e?await ar(e)?{kind:"missing"}:new Promise(n=>{let t=!1,i=e.open(Dn);i.onupgradeneeded=()=>{t=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),n({kind:"unavailable"})},i.onblocked=()=>n({kind:"unavailable"}),i.onsuccess=()=>{let o=i.result;if(t){o.close(),rr(e).then(()=>n({kind:"missing"}));return}if(!o.objectStoreNames.contains(Ve)){o.close(),n({kind:"unavailable"});return}n({kind:"ok",db:o})}}):{kind:"unavailable"}}function sr(){let e=vo();return e?new Promise(n=>{let t=e.open(Dn,1);t.onupgradeneeded=()=>{let i=t.result;i.objectStoreNames.contains(Ve)||i.createObjectStore(Ve,{keyPath:"key"})},t.onerror=()=>{console.warn("Syncify could not create Marketplace storage",t.error),n(null)},t.onblocked=()=>n(null),t.onsuccess=()=>n(t.result)}):Promise.resolve(null)}async function ar(e){if(typeof e.databases!="function")return!1;try{return!(await e.databases()).some(t=>t.name===Dn)}catch(n){return!1}}function rr(e){return new Promise(n=>{let t=e.deleteDatabase(Dn);t.onsuccess=()=>n(),t.onerror=()=>n(),t.onblocked=()=>n()})}function Io(e,n,t){return new Promise(i=>{let o;try{o=e.transaction(Ve,n)}catch(y){console.warn("Syncify could not open a Marketplace transaction",y),i(null);return}let s,a=!1,u=y=>{a||(a=!0,i(y))};o.oncomplete=()=>u(s),o.onerror=()=>{console.warn("Syncify Marketplace transaction failed",o.error),u(null)},o.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",o.error),u(null)};let c;try{c=t(o.objectStore(Ve))}catch(y){console.warn("Syncify Marketplace request could not be issued",y),u(null);return}c&&(c.onsuccess=()=>{s=c.result},c.onerror=()=>{console.warn("Syncify Marketplace request failed",c.error),u(null)})})}var At="marketplace:",Mt=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function Ne(){let e=hr(),n=await wo();if(n)for(let[t,i]of Object.entries(n))t.startsWith(At)&&(e[t]=i);return e}var lr=new Set(["marketplace:active-tab","marketplace:sort"]),ur="marketplace:installed:",yr=["stars","tags","lastUpdated","created"];async function Bn(e,n){let t={};for(let[i,o]of Object.entries(e))lr.has(i)||(t[i]=i.startsWith(ur)?fr(o):o);return n&&(t.spicetify_config=ne(n)),An(qe(t))}function fr(e){try{let n=JSON.parse(e);if(!n||typeof n!="object"||Array.isArray(n))return e;for(let t of yr)delete n[t];return n}catch(n){return e}}async function Ln(){let e=await Ne(),n=Nt(e);return{keyCount:Object.keys(e).length,hash:await Bn(e,n),installedItemCount:mr(e),installedItems:Dt(e),items:V(e),spicetifyConfig:n,marketplaceAvailable:gr(e)}}async function Eo(){let e=await Ne(),n=Nt(e);return m({schema_version:2,metadata:{last_sync_datetime:new Date().toISOString(),device_info:go(),marketplace_key_count:Object.keys(e).length},payload_hash:await Bn(e,n),marketplace_data:{keys:e}},n?{spicetify_config:n}:{})}async function No(e,n=[]){var a,u;let t={},i=(u=(a=e.marketplace_data)==null?void 0:a.keys)!=null?u:{};for(let[c,y]of Object.entries(i))c.startsWith(At)&&(t[c]=y);if(Object.keys(t).length===0)return 0;await dr(t),n.length>0&&await pr(t,n);let o=Object.keys(t);for(let c of o)window.localStorage.setItem(c,t[c]);if(await xo(t)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try the restore again.");return o.length}async function dr(e){let n=await Ne(),t=V(e),i=V(n).filter(a=>Pt(a,t));if(i.length===0)return;let o="marketplace:installed-extensions",s=Bt(e[o]).map(String);for(let a of i)s.includes(a.key)||s.push(a.key),e[a.key]=n[a.key];e[o]=JSON.stringify(s)}async function pr(e,n){let t=await Ne(),i=Dt(t);for(let o of Mt){if(e[o]===void 0)continue;let s=Bt(e[o]).map(String).filter(a=>!n.includes(a)||i.includes(a));e[o]=JSON.stringify(s)}for(let o of n)t[o]!==void 0?e[o]=t[o]:delete e[o]}function mr(e){return Dt(e).length}function Dt(e){return Mt.flatMap(n=>Bt(e[n]).map(String))}function gr(e){return!!(window.Marketplace||Mt.some(t=>e[t]!==void 0)||e["marketplace:tabs"]!==void 0)}function _o(e,n){return n===0?!1:e===0?!0:e<Math.max(2,Math.floor(n*.5))}function hr(){let e={};for(let n=0;n<window.localStorage.length;n+=1){let t=window.localStorage.key(n);if(!(t!=null&&t.startsWith(At)))continue;let i=window.localStorage.getItem(t);i!==null&&(e[t]=i)}return e}function Bt(e){if(!e)return[];try{let n=JSON.parse(e);return Array.isArray(n)?n:[]}catch(n){return[]}}async function On(e){if(!ze(e))throw new Error("Syncify backup service is not configured.");let[n,t]=await Promise.all([q(),Eo()]);if(t.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:i,unapproved:o}=await Gi(e.workerUrl,n,t);return{payload:t,unchanged:i,unapproved:o}}async function _e(e,n){var u;if(!ze(e))throw new Error("Syncify backup service is not configured.");let t=await ht(e.workerUrl,await q(),n),[i,o,s]=await Promise.all([Promise.all(t.backups.map(Ot)),t.safetyCopy?Ot(t.safetyCopy):null,Promise.all(t.unapproved.map(Ot))]),a=i.filter((c,y)=>i.findIndex(f=>f.payload_hash===c.payload_hash)===y);return v(m({},t),{payload:(u=a[0])!=null?u:null,backups:a,safetyCopy:o&&!a.some(c=>c.payload_hash===o.payload_hash)?o:null,unapproved:s.filter(c=>!a.some(y=>y.payload_hash===c.payload_hash))})}var Lt=new Map;async function Ot(e){var s,a,u;let n=(a=(s=e.marketplace_data)==null?void 0:s.keys)!=null?a:{},t=e.spicetify_config?_t(e.spicetify_config,n):void 0,i=`${e.payload_hash} ${(u=e.metadata)==null?void 0:u.last_sync_datetime}`,o=Lt.get(i);return o||(o=Bn(n,t),Lt.set(i,o),o.catch(()=>Lt.delete(i))),v(m(m({},e),t?{spicetify_config:t}:{}),{payload_hash:await o})}async function To(e){let n=await ht(Ge(e),await q());return{claim:n.claim,install:n.install}}async function Po(e,n,t,i=[]){var u;let o=n!=null?n:(await _e(e)).payload;if(!o)throw new Error("No Syncify cloud backup was found for this Spotify account.");let s=await No(o,i),a=(u=o.backup)==null?void 0:u.id;return a&&ze(e)&&q().then(c=>Xi(e.workerUrl,c,a,t)).catch(()=>{}),{payload:o,restoredCount:s}}async function Ao(e){let n=await q(),t=await eo(Ge(e),n);return v(m({},t),{hash:n.hash})}async function Mo(e){await no(Ge(e),await q())}async function Un(e,n,t){await Ji(Ge(e),await q(),n,t)}async function Kn(e){await to(Ge(e),await q())}function Ge(e){if(!ze(e))throw new Error("Syncify backup service is not configured.");return e.workerUrl}var jn="syncify:claim-check-day";async function Bo(e){var t,i,o;let n=K();if(n.workerUrl){if(!n.autoBackupEnabled)return Sr(e);try{let[s,a]=await Promise.all([Ln(),_e(n)]);Lo(a,e);let u=(i=(t=a.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?i:0;if(a.exists&&_o(s.keyCount,u)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((o=a.payload)==null?void 0:o.payload_hash)===s.hash||s.keyCount===0)return;let{unapproved:c}=await On(n);Spicetify.showNotification(c?"Syncify: backed up, waiting for approval":"Syncify auto-backup complete")}catch(s){if(s instanceof z||s instanceof de){Spicetify.showNotification("Syncify: sign in to keep backing up",!0,8e3);return}let a=s instanceof Error?s.message:String(s);console.warn("Syncify startup sync failed:",s),Spicetify.showNotification(`Syncify auto-sync skipped: ${a}`,!0,8e3)}}}async function Sr(e){let n=new Date().toLocaleDateString("en-CA");if(br()!==n)try{let t=await To(K());Do(n),Lo(t,e)}catch(t){if(t instanceof z){Do(n);return}console.warn("Syncify claim check failed:",t)}}function Lo(e,n){var o;let t=kr(e.claim),i=(o=e.install)==null?void 0:o.waiting[0];t?n.onClaim(t):i&&n.onInstall(i)}function kr(e){return(e==null?void 0:e.status)==="pending"&&!e.mine?e:null}function br(){var e,n;return(n=(e=Spicetify.LocalStorage)==null?void 0:e.get(jn))!=null?n:window.localStorage.getItem(jn)}function Do(e){var n;(n=Spicetify.LocalStorage)!=null&&n.set?Spicetify.LocalStorage.set(jn,e):window.localStorage.setItem(jn,e)}var Kt="syncify:pending-restore",wr=600*1e3,xr=2e3,vr=15e3,Cr="marketplace:theme-installed",Ir="raw.githubusercontent.com",Er=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],pe=null,Ut=new Set,Ko=new Map;function jo(){return pe}function $o(e){return Ut.add(e),()=>Ut.delete(e)}function Ho(){pe&&zo(v(m({},pe),{manual:[]}))}function jt(e){try{localStorage.setItem(Kt,JSON.stringify({at:Date.now(),manual:e}))}catch(n){}}function Ro(){var e;jt((e=pe==null?void 0:pe.manual)!=null?e:[]),window.location.reload()}function Fo(){qo()&&(document.addEventListener("load",e=>Oo(e.target,"load"),!0),document.addEventListener("error",e=>Oo(e.target,"error"),!0))}async function Wo(){let e=qo();if(!e)return;try{localStorage.removeItem(Kt)}catch(o){}let n=Date.now(),t=await Uo();for(;t.loaded<t.total&&Date.now()-n<vr;)await new Promise(o=>setTimeout(o,xr)),t=await Uo();zo(v(m({at:Date.now()},t),{manual:e.manual}));let i=t.loaded===t.total&&e.manual.length===0;Spicetify.showNotification(i?`Syncify: backup restored. ${Nr(t)}.`:`Syncify: restored ${t.loaded} of ${t.total}. Open Syncify for details.`,!1,8e3)}function Yo(e){let n=e.map(t=>t.type==="extension"?`spicetify config extensions ${$n(t.name)}`:t.type==="custom_app"?`spicetify config custom_apps ${$n(t.name)}`:`spicetify config current_theme ${$n(t.name)}${t.scheme?` color_scheme ${$n(t.scheme)}`:""}`);return n.length>0?[...n,"spicetify apply"]:[]}function Nr(e){return e.total===1?"It loaded":`All ${e.total} loaded`}function $n(e){return/^[\w.@+/-]+$/.test(e)?e:`"${e}"`}function zo(e){pe=e;for(let n of Ut)n(e)}function qo(){var e;try{let n=JSON.parse((e=localStorage.getItem(Kt))!=null?e:"null");return!n||Date.now()-n.at>wr?null:{manual:Array.isArray(n.manual)?n.manual:[]}}catch(n){return null}}function Oo(e,n){e instanceof HTMLScriptElement&&e.src&&Ko.set(Je(e.src),n)}async function Uo(){var i;let e=await Ne(),n=(i=e[Cr])!=null?i:"",t=V(e).filter(o=>o.type==="extension"&&o.sources.length>0||o.type==="theme"&&n.includes(o.key)||o.type==="snippet");return{loaded:t.filter(_r).length,total:t.length}}function _r(e){var n,t;if(e.type==="snippet"){let i=document.querySelector("style.marketplaceSnippets");return((n=i==null?void 0:i.textContent)==null?void 0:n.includes(`/* ${e.name} - `))===!0}if(e.type==="theme"){let i=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((t=i==null?void 0:i.textContent)!=null&&t.trim())}return Tr(e.sources[0]).some(Pr)}function Tr(e){let n;try{n=new URL(e)}catch(a){return[]}if(n.host!==Ir)return[Je(n.href)];let[t,i,o,...s]=n.pathname.split("/").filter(Boolean);return!t||!i||!o||s.length===0?[]:Er.map(a=>Je(`https://${a}/gh/${t}/${i}@${o}/${s.join("/")}`))}function Pr(e){let n=Ko.get(e);return n?n==="load":[...document.querySelectorAll("script[src]")].some(i=>Je(i.src)===e)&&performance.getEntriesByType("resource").some(i=>Je(i.name)===e)}function Je(e){try{let n=new URL(e);return`${n.origin}${n.pathname}`}catch(n){return e}}var Ar="raw.githubusercontent.com",Mr={extension:"spicetify-extensions",theme:"spicetify-themes"},Dr="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",Br="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",Lr="https://api.github.com/repos",Or=5e3,Ur=20,Vo="syncify:repo-topics",Go=10080*60*1e3,Kr=200;function Qe(e){return(e==null?void 0:e.kind)==="host"||(e==null?void 0:e.kind)==="repo"||(e==null?void 0:e.kind)==="blocked"||(e==null?void 0:e.kind)==="catalog"}function Jo(e){let n=new Map;for(let t of e){if(t.change==="removed")continue;if(t.custom){n.set(t.key,{kind:"custom"});continue}let i=jr(t);i&&n.set(t.key,i)}return n}async function Xo(e,n){let t=new Map,i=e.filter(a=>a.change!=="removed"&&a.isNew&&!n.has(a.key));if(i.length===0)return t;let o=i.filter(a=>a.type==="snippet"),s=i.filter(a=>a.type!=="snippet");if(o.length>0){let a=await Fr();for(let u of o)a?a.has(Qo(u.name))||t.set(u.key,{kind:"catalog"}):t.set(u.key,{kind:"unchecked"})}if(s.length>0){let a=await Rr(),u=zr(),c=0;await Promise.all(s.map(async y=>{let f=$r(y),h=Mr[y.type];if(!f||!h)return;if(a===null){t.set(y.key,{kind:"unchecked"});return}if(Hr(f,a)){t.set(y.key,{kind:"blocked"});return}let d=Yr(u,f);d===void 0&&c<Ur&&(c+=1,d=await Wr(f),d!==void 0&&(u[f.toLowerCase()]={topics:d,at:Date.now()})),d===void 0?t.set(y.key,{kind:"unchecked"}):(d===null||!d.includes(h))&&t.set(y.key,{kind:"catalog"})})),qr(u)}return t}function jr(e){let n=null;for(let t of e.sources){let i;try{i=new URL(t)}catch(s){return{kind:"host",host:t.slice(0,40)}}if(i.host!==Ar)return{kind:"host",host:i.host};let o=Zo(i);o&&e.repo&&o.toLowerCase()!==e.repo.toLowerCase()&&(n!=null||(n=o))}return n?{kind:"repo",repo:n}:null}function $r(e){for(let n of e.sources)try{let t=Zo(new URL(n));if(t)return t}catch(t){}return e.repo}function Zo(e){let[n,t]=e.pathname.split("/").filter(Boolean);return n&&t?`${n}/${t}`:null}function Hr(e,n){let t=`https://github.com/${e}`.toLowerCase();return n.some(i=>{let o=i.toLowerCase();if(!o.includes("*"))return o===t;let s=o.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${s}$`).test(t)})}function Qo(e){return e.replace(/\n/g,"").trim().toLowerCase()}var Xe=null,Ze=null;function Rr(){return Xe!=null||(Xe=es(Dr).then(e=>{let n=e==null?void 0:e.repos;return Array.isArray(n)?n.filter(t=>typeof t=="string"&&!t.startsWith("//")):(Xe=null,null)})),Xe}function Fr(){return Ze!=null||(Ze=es(Br).then(e=>Array.isArray(e)?new Set(e.flatMap(n=>typeof(n==null?void 0:n.title)=="string"?[Qo(n.title)]:[])):(Ze=null,null))),Ze}async function Wr(e){let n=await ns(`${Lr}/${e}`);if((n==null?void 0:n.status)===404)return null;if(!(n!=null&&n.ok))return;let t=await n.json().catch(()=>null);return Array.isArray(t==null?void 0:t.topics)?t.topics.filter(i=>typeof i=="string"):void 0}async function es(e){let n=await ns(e);return n!=null&&n.ok?n.json().catch(()=>null):null}async function ns(e){let n=typeof AbortController=="function"?new AbortController:null,t=setTimeout(()=>n==null?void 0:n.abort(),Or);try{return await fetch(e,{signal:n==null?void 0:n.signal})}catch(i){return null}finally{clearTimeout(t)}}function Yr(e,n){let t=e[n.toLowerCase()];return t&&Date.now()-t.at<Go?t.topics:void 0}function zr(){var e;try{let n=JSON.parse((e=localStorage.getItem(Vo))!=null?e:"{}");return n&&typeof n=="object"?n:{}}catch(n){return{}}}function qr(e){let n=Date.now(),t=Object.entries(e).filter(([,i])=>n-i.at<Go).sort(([,i],[,o])=>o.at-i.at).slice(0,Kr);try{localStorage.setItem(Vo,JSON.stringify(Object.fromEntries(t)))}catch(i){}}function $t(e){return`A new install${e.device?` on ${e.device}`:""} wants to back up this Spotify account.`}function ts(e){let n=Spicetify.React,t=n.useState,{install:i}=e,[o,s]=t(!1),[a,u]=t(null);async function c(y){s(!0),u(null);try{await Un(K(),i.id,y),Spicetify.showNotification(y==="approve"?"Syncify: install approved":"Syncify: install refused"),e.onDone(y)}catch(f){u(f instanceof Error?f.message:String(f)),s(!1)}}return n.createElement(n.Fragment,null,n.createElement("p",{className:"syncify-claim-notice"},$t(i)," Approve it if it's yours."),a?n.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},a):null,n.createElement("div",{className:"syncify-actions"},n.createElement("button",{className:"syncify-text-button",type:"button",onClick:e.onClose,disabled:o},"Close"),n.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{c("reject")},disabled:o},"Not mine"),n.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{c("approve")},disabled:o},"Approve")))}var Vr="syncify:beta",is=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function os(){var e;return(e=window.SyncifyLoader)!=null?e:null}function Gr(){try{return window.localStorage.getItem(Vr)==="true"}catch(e){return!1}}async function ss(e){let n=Gr()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(n.map(i=>Jr(`${e}/${i}`)))).reduce((i,o)=>o&&(!i||Rt(o,i)>0)?o:i,null)}function Ht(e){return typeof e=="string"&&is.test(e)}function Rt(e,n){let[t,i]=[e,n].map(o=>{var y;let[,s,a,u,c]=(y=is.exec(o))!=null?y:[];return[s,a,u,c!=null?c:1/0].map(Number)});for(let o=0;o<t.length;o+=1)if(t[o]!==i[o])return t[o]<i[o]?-1:1;return 0}async function Jr(e,n=3e3){let t=typeof AbortController=="function"?new AbortController:null,i=setTimeout(()=>t==null?void 0:t.abort(),n);try{let o=await fetch(e,{signal:t==null?void 0:t.signal});if(!o.ok)return null;let s=await o.json();return Ht(s==null?void 0:s.version)?s.version:null}catch(o){return null}finally{clearTimeout(i)}}function ys(){var ki,bi,wi,xi,vi,Ci,Ii;let e=Spicetify.React,n=e.useEffect,t=e.useMemo,i=e.useState,o=e.useRef,[s,a]=i(()=>K()),[u,c]=i("idle"),[y,f]=i(null),[h,d]=i(0),[b,C]=i([]),[S,w]=i([]),[I,te]=i(null),[$,me]=i(null),[T,tn]=i(null),[B,on]=i(null),[ie,Pe]=i([]),[p,k]=i(null),[oe,se]=i([]),[P,Ae]=i(null),[ge,Me]=i(!1),[Yn,zt]=i(()=>new Set),[x,F]=i(null),[sn,zn]=i(!1),[qn,G]=i(!1),[qt,an]=i(!1),[De,Vt]=i(null),[J,he]=i(!1),[Vn,Se]=i(null),[Gt,Jt]=i(null),[rn,gs]=i(!1),[A,hs]=i(()=>jo()),[Ss,Xt]=i(!1),[ae,ks]=i(!1),[Zt,bs]=i(null),[Qt,cn]=i(void 0),[L,ws]=i(null),[Be,xs]=i(null),[re,ei]=i(null),[vs,ni]=i(!1),[Cs,Gn]=i(null),[Is,ti]=i(!1),[U,Jn]=i(null),[D,Xn]=i(null),ii=o(null),W=t(()=>M(),[]),ke=t(()=>p?[...ie,p]:ie,[ie,p]),Zn=U?[]:oe,Qn=U?(ki=D==null?void 0:D.backups)!=null?ki:[]:ie,oi=U?(bi=D==null?void 0:D.safetyCopy)!=null?bi:null:p,si=t(()=>{var r;return new Map([...ke,...oe,...(r=D==null?void 0:D.backups)!=null?r:[],...D!=null&&D.safetyCopy?[D.safetyCopy]:[]].map(l=>[l,V(l.marketplace_data.keys)]))},[ke,oe,D]),ln=r=>{var l;return(l=si.get(r))!=null?l:V(r.marketplace_data.keys)},Es=r=>ln(r).map(l=>l.key),Ns=r=>ln(r).length,O=t(()=>qn&&x?Tt(ln(x),x.spicetify_config,S,I):null,[qn,x,si,S,I]),X=t(()=>O?Jo(O.items):null,[O]),un=t(()=>new Map([...De!=null?De:[],...X!=null?X:[]]),[De,X]),yn=((wi=x==null?void 0:x.backup)==null?void 0:wi.kind)==="quarantined",ai=t(()=>{var r;return new Set(((r=O==null?void 0:O.items)!=null?r:[]).filter(l=>{var g;return l.change!=="removed"&&l.isNew&&(yn||Qe(un.get(l.key))||((g=un.get(l.key))==null?void 0:g.kind)==="unchecked")}).map(l=>l.key))},[O,un,yn]),_s=[...ai].filter(r=>!Yn.has(r)),ri=O!==null&&De===null,et=t(()=>lo(),[]),ci=t(()=>os()!==null,[]),Y=u==="loading",fn=(y==null?void 0:y.kind)==="warning"||(y==null?void 0:y.kind)==="error"?y:null,li=!!(B&&T&&B.payload_hash!==T),Le=!!(B&&T&&B.payload_hash===T),ui=!!(x&&T&&x.payload_hash===T),dn=U!==null||rn||!Le||ke.length<2,Ts=dn?Qn:Qn.slice(0,1),pn=(Be==null?void 0:Be.status)==="pending"&&!Be.mine?Be:null,yi=tc(re,L,pn!==null),mn=(xi=P==null?void 0:P.waiting[0])!=null?xi:null,fi=!P||P.trusted||L||yi.kind==="secured"?null:P.refused?"This Spotify account refused backups from this install. Sign in to back up from it.":"This install isn't approved yet. Its backups are kept apart until you approve it from another install or sign in.",nt=(Qt?((vi=re==null?void 0:re.accounts)!=null?vi:[]).filter(r=>r.status==="final"):[]).map((r,l)=>({hash:r.hash,label:`Spotify account ${l+1}${r.device_info?` \xB7 from ${r.device_info}`:""}`})).filter(r=>r.hash!==(re==null?void 0:re.hash)),Ps=!!(T&&h>0&&!ke.some(r=>r.payload_hash===T));n(()=>(R().catch(()=>null).then(r=>cn(l=>l!=null?l:r)),H({silent:!0}),Ls(),$o(hs)),[]),n(()=>{if(Vt(null),!O||!X)return;[...X.values()].some(Qe)&&an(!0);let r=!0;return Xo(O.items,X).then(l=>{r&&(Vt(l),[...l.values()].some(Qe)&&an(!0))}),()=>{r=!1}},[O,X]),n(()=>{if(!J)return;let r=l=>{var E;if(!((E=ii.current)!=null&&E.isConnected)){he(!1),Se(null);return}l.preventDefault(),l.stopImmediatePropagation();let g=so(l);if(g.kind!=="ignore"){if(g.kind==="cancel"){he(!1),Se(null);return}if(g.kind==="error"){Se(g.message);return}if(ao(g.shortcut)){Se(`${Fe(g.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}he(!1),tt(g.shortcut)}};return window.addEventListener("keydown",r,!0),()=>window.removeEventListener("keydown",r,!0)},[J,s]);async function di(){let r=await Ln();return tn(r.hash),d(r.installedItemCount),C(r.installedItems),w(r.items),te(r.spicetifyConfig),me(r.marketplaceAvailable),r}async function H(r){try{G(!1),c("loading"),r!=null&&r.silent||f({kind:"info",text:"Checking your Syncify backup\u2026"}),await di();let l,g=null;try{l=await _e(s)}catch(at){if(!(at instanceof z))throw at;l=pc,g=at.code}let E=await R().catch(()=>null),le=E?await Ao(s).catch(()=>null):null,be=E?await R().catch(()=>null):null;cn(be),ei(be?le:null),ws(g),g&&Jt("account"),xs(l.claim),Jn(null),Xn(null),on(l.payload),Pe(l.backups),k(l.safetyCopy),se(l.unapproved),Ae(l.install),F(l.payload),zn(!0),c(l.exists?"success":"idle"),!(r!=null&&r.silent)&&!g&&f(l.exists&&l.payload?{kind:"success",text:`Backup found from ${Te(l.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(l){Oe(l)}}async function pi(){ni(!0),Gn(null);try{await Mo(s)}catch(r){r instanceof ee&&["claim_pending","claimed"].includes(r.code)||Gn(r instanceof Error?r.message:String(r))}finally{await H({silent:!0}),ni(!1)}}function As(r){cn(r),!L&&B?pi():H({silent:!0})}function Ms(){cn(null),ei(null),Gn(null),H({silent:!0})}async function Ds(){ti(!0);try{await Kn(s),Spicetify.showNotification("Syncify: claim sent for review"),await H({silent:!0})}catch(r){f({kind:"error",text:r instanceof Error?r.message:String(r)})}finally{ti(!1)}}async function Bs(r){if(G(!1),Jn(r),Xn(null),!r){F(B);return}F(null);try{let l=await _e(s,r);Xn(l),F(l.payload)}catch(l){Jn(null),F(B),Oe(l)}}async function Ls(){let r=W.version;if(!Ht(r))return;let l=await ss(W.releasesUrl);l&&Rt(l,r)>0&&bs(l)}function Os(r){let l=v(m({},s),{autoBackupEnabled:r});a(l),Pn(l),f({kind:"success",text:r?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}function tt(r){let l=v(m({},s),{shortcut:r});a(l),Pn(l),vt(r),Se(null),f({kind:"success",text:r?`${Fe(r)} now opens Syncify.`:"Keyboard shortcut turned off."})}function Us(r){let l=v(m({},s),{entryPoint:r});a(l),Pn(l),Nn(r)}function mi(r){Jt(r),r!=="settings"&&he(!1)}function Ks(){Se(null),he(!0)}async function js(){try{G(!1),c("loading"),f({kind:"info",text:"Backing up your extensions and themes\u2026"});let{payload:r,unchanged:l,unapproved:g}=await On(s);if(await di(),g){await H({silent:!0}),f({kind:"warning",text:"Backed up, but kept apart until this install is approved."}),Spicetify.showNotification("Syncify: backed up, waiting for approval");return}if(l){zn(!0),c("success"),f({kind:"success",text:"Everything is already backed up."}),Spicetify.showNotification("Syncify: everything is already backed up");return}on(r),Pe(E=>[r,...E.filter(le=>le.payload_hash!==r.payload_hash)].slice(0,dc)),k(E=>(E==null?void 0:E.payload_hash)===r.payload_hash?null:E),F(r),zn(!0),c("success"),f({kind:"success",text:`Backed up ${r.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(r){Oe(r)}}async function gi(r){if(mn){Me(!0);try{await Un(s,mn.id,r),Spicetify.showNotification(r==="approve"?"Syncify: install approved":"Syncify: install refused"),await H({silent:!0})}catch(l){Oe(l)}finally{Me(!1)}}}function $s(r=x){if($===!1){let l="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";f({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3);return}if(!r){let l="No Syncify cloud backup was found for this Spotify account.";f({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3);return}F(r),an(!1),zt(new Set),G(!0)}async function Hs(){let r=x?Tt(ln(x),x.spicetify_config,S,I).manual:[];try{G(!1),c("loading"),f({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:l,restoredCount:g}=await Po(s,x!=null?x:void 0,U!=null?U:void 0,_s);F(l),c("success"),f({kind:"success",text:`Restored ${g} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),jt(r),setTimeout(()=>window.location.reload(),1e3)}catch(l){Oe(l)}}async function Rs(r){var l;try{await navigator.clipboard.writeText(r)}catch(g){let E=(l=Spicetify.Platform)==null?void 0:l.ClipboardAPI;if(!(E!=null&&E.copy))return;await E.copy(r)}Xt(!0),setTimeout(()=>Xt(!1),2e3)}function ce(r){if(r.startsWith("mailto:")){window.location.href=r;return}window.open(r,"_blank","noopener,noreferrer")}function Oe(r){if(c("error"),r instanceof He){ks(!0),f(null);return}if(r instanceof de){f({kind:"error",text:r.message}),H({silent:!0});return}if(r instanceof z&&r.code!=="not_linked"){f(null),H({silent:!0});return}let l=r instanceof Error?r.message:String(r);f({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3)}function it(r,l){let g=(x==null?void 0:x.payload_hash)===r.payload_hash,E=r.payload_hash===T,le=Te(r.metadata.last_sync_datetime),be=us(Ns(r));return e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":g,"data-selected":g?"true":"false",type:"button",key:`${r.payload_hash}-${r.metadata.last_sync_datetime}`,title:l!=null&&l.isSafetyCopy?"Kept aside and updated about once a week, so a burst of new backups can't replace it":l!=null&&l.isUnapproved?"From an install this Spotify account hasn't approved":void 0,onClick:()=>{F(r),G(!1)},disabled:Y},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),l!=null&&l.isSafetyCopy?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Safety copy"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 updated weekly")),e.createElement("span",{className:"syncify-muted"},le," \xB7 ",be)):l!=null&&l.isUnapproved?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Not approved"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 ",le)),e.createElement("span",{className:"syncify-muted"},be," \xB7 from ",r.metadata.device_info)):e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-backup-date"},le),e.createElement("span",{className:"syncify-muted"},be," \xB7 from ",r.metadata.device_info)),E?e.createElement("span",{className:"syncify-tag",title:"What's on this device now"},"Current"):null,l!=null&&l.isSafetyCopy?e.createElement(cc,null):null,l!=null&&l.isUnapproved?e.createElement(Wt,null):null)}function ot(r){r.stopPropagation()}let Fs=ae?"Update Syncify to keep backing up":L?"Sign in to restore":sn?B?li?"Changes since your last backup":"Everything is backed up":"No backup yet":u==="error"?"Couldn't check your backup":"Checking your backup\u2026",hi=ae?"Your backups are safe":L?L==="not_owner"?"Secured by another account":"This backup is secured":sn?B?li?gc(B,Es(B),b,I):`Last backup ${Te(B.metadata.last_sync_datetime)}`:"Save your extensions and themes so you can restore them after a reinstall or on another computer.":null,Si=!!(A&&!ae&&Date.now()-A.at<fc),gn=!!(A&&A.loaded===A.total),st=Yo((Ci=A==null?void 0:A.manual)!=null?Ci:[]);return e.createElement("div",{className:"syncify-panel",ref:ii,onClick:ot,onMouseDown:ot,onPointerDown:ot},ae?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,"This version of Syncify is no longer supported."),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ce(`${W.githubUrl}#updating`)},"How to update")):null,pn?e.createElement("div",{className:"syncify-alert",role:"alert"},e.createElement("span",null,(Ii=pn.email)!=null?Ii:"Someone"," is claiming this backup.",pn.held?" Syncify is reviewing it.":null),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Ds()},disabled:Is},"Not me")):null,mn?e.createElement("div",{className:"syncify-alert",role:"alert"},e.createElement("span",null,$t(mn)),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{gi("reject")},disabled:ge},"Not mine"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{gi("approve")},disabled:ge},"Approve"))):null,fi?e.createElement("div",{className:"syncify-alert",role:"status"},e.createElement("span",null,fi)):null,st.length>0?e.createElement("div",{className:"syncify-alert syncify-manual",role:"status"},e.createElement("span",{className:"syncify-manual-header"},e.createElement("span",null,A.manual.length===1?"1 isn't from Marketplace. Add it in a terminal:":`${A.manual.length} aren't from Marketplace. Add them in a terminal:`),e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:Ho},e.createElement(ls,null))),e.createElement("span",{className:"syncify-code"},e.createElement("code",null,st.join(`
`)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Rs(st.join(`
`))}},Ss?"Copied":"Copy"))):null,fn?e.createElement("div",{className:"syncify-alert","data-kind":fn.kind},e.createElement("span",null,fn.text),e.createElement("span",{className:"syncify-alert-actions"},fn.kind==="error"?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{H()},disabled:Y},"Try again"):null,e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>f(null)},e.createElement(ls,null)))):null,e.createElement("section",{className:"syncify-status","aria-live":"polite"},Si&&A?e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},gn?"Backup restored":`Restored ${A.loaded} of ${A.total}`),e.createElement("p",{className:"syncify-muted"},gn?A.total===0?"Nothing from Marketplace to load":`${A.loaded} of ${A.total} loaded`:"Missing something? Reload Spotify once more."),gn?e.createElement("p",{className:"syncify-muted"},"Syncify saved your setup?"," ",e.createElement("button",{className:"syncify-text-button syncify-inline-button",type:"button",onClick:()=>ce(W.kofiUrl)},"Support it on Ko-fi")):null):e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},Fs),e.createElement("p",{className:"syncify-muted"},hi?`${hi} \xB7 `:"",us(h)," on this device")),Si&&!gn?e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:Ro},"Reload"):e.createElement("button",{className:"syncify-button",type:"button",onClick:js,disabled:Y||Le||ae||L!==null,title:L?"Sign in to back up":Le?"No changes since your last backup":void 0},Y?"Working\u2026":Le?"Backed up":"Back up now")),!sn||L||ie.length>0||oe.length>0||nt.length>0?e.createElement("section",{className:"syncify-section","aria-label":"Backups"},e.createElement("div",{className:"syncify-section-header"},e.createElement("h4",{className:"syncify-section-title"},"Backups"),e.createElement("span",{className:"syncify-section-controls"},!U&&Le&&ke.length>1?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":rn,"aria-controls":"syncify-backup-list",onClick:()=>{gs(!rn),G(!1)}},rn?"Show less":`Show all ${ke.length}`,e.createElement(en,null)):null,!L&&nt.length>0?e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select","aria-label":"Show backups from",value:U!=null?U:"",onChange:r=>{Bs(r.currentTarget.value||null)},disabled:Y},e.createElement("option",{value:""},"This Spotify account"),nt.map(r=>e.createElement("option",{key:r.hash,value:r.hash},r.label))),e.createElement(en,null)):null)),sn?L?e.createElement("p",{className:"syncify-locked"},e.createElement(lc,null),e.createElement("span",null,L==="not_owner"?"Sign in with the account that secured them":"Sign in to see and restore your backups")):U&&!D?e.createElement("p",{className:"syncify-muted"},"Loading backups\u2026"):Qn.length===0&&Zn.length===0?e.createElement("p",{className:"syncify-muted"},"No backups yet."):e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-list",id:"syncify-backup-list",role:"radiogroup","aria-label":"Choose a backup to restore"},Ts.map(r=>it(r)),dn&&oi?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),it(oi,{isSafetyCopy:!0})):null,dn&&Zn.length>0?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),Zn.map(r=>it(r,{isUnapproved:!0}))):null),dn?$===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to restore a backup."):qn?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},"Restore"," ",x?Te(x.metadata.last_sync_datetime):"this backup","?"),yn?e.createElement("div",{className:"syncify-alert"},"An install this Spotify account hasn't approved made this backup. Its items stay off unless you turn them on."):null,O?e.createElement(Qr,{preview:O,checks:un,off:ai,allowed:Yn,unapproved:yn,onAllow:(r,l)=>{let g=new Set(Yn);l?g.add(r):g.delete(r),zt(g)},expanded:qt,onToggle:()=>an(!qt)}):null,e.createElement("div",{className:"syncify-actions"},Ps?e.createElement("div",{className:"syncify-alert syncify-actions-hint"},"Your current setup isn't backed up."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>G(!1),disabled:Y},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:Hs,disabled:Y||ri},ri?"Checking\u2026":"Restore"))):e.createElement("div",{className:"syncify-actions"},ui?e.createElement("span",{className:"syncify-muted syncify-actions-hint"},"This backup is already current."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>$s(),disabled:Y||!x||ui},"Restore backup")):null):e.createElement("div",{className:"syncify-backup-skeleton","aria-hidden":"true"},e.createElement("span",{className:"syncify-radio"}),e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-skeleton-line"}),e.createElement("span",{className:"syncify-skeleton-line wide"})))):null,e.createElement("div",{className:"syncify-accordion"},e.createElement(cs,{id:"account",title:"Account",openSection:Gt,onToggle:mi},e.createElement(ic,{session:Qt,locked:L,secure:yi,securing:vs,secureError:Cs,onSecure:()=>{pi()},onSignedIn:As,onSignedOut:Ms,onOpenWebsite:ce})),e.createElement(cs,{id:"settings",title:"Settings",openSection:Gt,onToggle:mi},e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Back up automatically"),e.createElement("span",{className:"syncify-muted"},"When Spotify starts and something has changed")),e.createElement("input",{className:"syncify-switch",type:"checkbox",role:"switch",checked:s.autoBackupEnabled&&!ae,onChange:r=>Os(r.currentTarget.checked),disabled:Y||ae})),e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Open Syncify from"),et?s.entryPoint==="menu"&&!s.shortcut?e.createElement("span",{className:"syncify-muted"},"Keep a shortcut in case a Spotify update breaks the menu"):null:e.createElement("span",{className:"syncify-muted"},"The profile menu isn't available in this Spicetify version")),e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select",value:et?s.entryPoint:"topbar",onChange:r=>Us(r.currentTarget.value),disabled:!et},mc.map(r=>e.createElement("option",{key:r.value,value:r.value},r.label))),e.createElement(en,null))),e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Keyboard shortcut"),J&&!Vn?e.createElement("span",{className:"syncify-muted"},"Press a key combination, or Esc to cancel"):null),e.createElement("span",{className:"syncify-shortcut"},s.shortcut&&!J?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>tt(null)},"Turn off"):null,!s.shortcut&&!J?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>tt(Ee)},"Use default"):null,e.createElement("button",{className:"syncify-key",type:"button","data-recording":J?"true":"false",onClick:()=>J?he(!1):Ks(),title:"Click to change"},J?"Press keys\u2026":s.shortcut?Fe(s.shortcut):"Off"))),Vn?e.createElement("div",{className:"syncify-alert",role:"alert"},Vn):null)),e.createElement("footer",{className:"syncify-footer"},e.createElement("span",{className:"syncify-footer-version"},e.createElement("span",null,"Syncify ",W.version),Zt?e.createElement("button",{className:"syncify-text-button syncify-update",type:"button",onClick:()=>ci?window.location.reload():ce(`${W.githubUrl}#updating`)},Zt," is out \xB7 ",ci?"Reload":"How to update"):null),e.createElement("span",{className:"syncify-footer-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ce(W.issueUrl)},"Report an issue"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ce(W.githubUrl)},"GitHub"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ce(W.kofiUrl)},"Support on Ko-fi"))))}var as={added:{mark:"+",label:"Added"},removed:{mark:"\u2212",label:"Removed"},unchanged:{mark:"=",label:"Unchanged"}},Xr=[["extension","Extensions"],["theme","Themes"],["snippet","Snippets"]],Zr={extension:"extension",custom_app:"custom app",theme:"theme"};function Qr(e){let n=Spicetify.React,{items:t,counts:i,manual:o}=e.preview,s=[...e.off].filter(a=>!e.allowed.has(a)).length;return n.createElement(n.Fragment,null,n.createElement("div",{className:"syncify-chips","aria-label":"What changes on this device"},i.added?n.createElement("span",{className:"syncify-chip","data-change":"added"},"+",i.added," added"):null,i.removed?n.createElement("span",{className:"syncify-chip","data-change":"removed"},"\u2212",i.removed," removed"):null,i.unchanged?n.createElement("span",{className:"syncify-chip"},i.unchanged," unchanged"):null,o.length?n.createElement("span",{className:"syncify-chip"},o.length," to add manually"):null,s?n.createElement("span",{className:"syncify-chip","data-change":"off"},s," off"):null),t.length||o.length?n.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":e.expanded,"aria-controls":"syncify-restore-changes",onClick:e.onToggle},e.expanded?"Hide changes":"Show changes",n.createElement(en,null)):null,e.expanded?n.createElement("div",{className:"syncify-changes",id:"syncify-restore-changes"},Xr.map(([a,u])=>{let c=t.filter(y=>y.type===a);return c.length===0?null:n.createElement("section",{key:a,"aria-label":u},n.createElement("h5",{className:"syncify-change-group"},u),n.createElement("ul",{className:"syncify-change-list"},c.map(y=>n.createElement("li",{className:"syncify-change",key:y.key},n.createElement("span",{className:"syncify-mark","data-change":y.change,role:"img","aria-label":as[y.change].label},as[y.change].mark),n.createElement("span",{className:"syncify-change-name"},y.name,y.repo?n.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",y.repo):null),e.checks.has(y.key)?n.createElement(nc,{check:e.checks.get(y.key)}):e.unapproved&&e.off.has(y.key)?n.createElement("span",{className:"syncify-source","data-warning":"true"},n.createElement(Wt,null),"Not approved"):null,e.off.has(y.key)?n.createElement("label",{className:"syncify-item-switch"},n.createElement("input",{type:"checkbox",checked:e.allowed.has(y.key),onChange:f=>e.onAllow(y.key,f.currentTarget.checked)}),"Restore"):null))))}),o.length?n.createElement("section",{"aria-label":"Add manually"},n.createElement("h5",{className:"syncify-change-group"},"Add manually"),n.createElement("ul",{className:"syncify-change-list"},o.map(a=>n.createElement("li",{className:"syncify-change",key:`${a.type}:${a.name}`},n.createElement("span",{className:"syncify-mark","aria-hidden":"true"}),n.createElement("span",{className:"syncify-change-name"},a.name,n.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",Zr[a.type],a.scheme?`, ${a.scheme}`:"")))))):null):null)}var ec={host:"Loads from outside GitHub",repo:"Its code is in a different repo than the one it names",blocked:"On Marketplace's block list",catalog:"Not in Marketplace's catalog",unchecked:"GitHub couldn't be reached to check it",custom:"A snippet made in Marketplace, not from its list"};function nc(e){let n=Spicetify.React,{check:t}=e,i=Qe(t),o=t.kind==="host"?`Code from ${t.host}`:t.kind==="repo"?`Code from ${t.repo}`:t.kind==="blocked"?"Blocked by Marketplace":t.kind==="catalog"?"Not in Marketplace":t.kind==="unchecked"?"Not checked":"Custom";return n.createElement("span",{className:"syncify-source","data-warning":i?"true":"false",title:ec[t.kind]},i?n.createElement(Wt,null):null,o)}function tc(e,n,t){var a,u;if(n==="not_owner")return{kind:"other-account"};if(!e)return t?{kind:"other-claim"}:{kind:"unknown"};let{claim:i}=e;if((i==null?void 0:i.status)==="final"){if(!i.mine)return{kind:"other-account"};let c=((a=e.accounts)!=null?a:[]).filter(y=>y.status==="final").length;return{kind:"secured",linkedCount:Math.max(c,1)}}if((i==null?void 0:i.status)==="pending")return i.mine?{kind:"pending",finalAt:i.final_at,held:i.held}:{kind:"other-claim"};let o=((u=e.accounts)!=null?u:[]).filter(c=>c.hash===e.hash),s=o[o.length-1];return(s==null?void 0:s.status)==="cancelled"&&s.cancelled_by==="owner"?{kind:"cancelled"}:{kind:"open"}}function ic(e){let n=Spicetify.React,t=n.useEffect,i=n.useState,{session:o,secure:s}=e,[a,u]=i(()=>vn()),[c,y]=i(()=>vn().email),[f,h]=i(""),[d,b]=i(!1),[C,S]=i(null),[w,I]=i(()=>Date.now()),te=!!(a.codeSentAt&&w-a.codeSentAt<oc),$=Math.max(0,Math.ceil((a.retryAt-w)/1e3)),me=a.retryEmail===null||a.retryEmail===c.trim().toLowerCase()?$:0;t(()=>{if(!o)return;let p=!0;return Wi().then(k=>{!p||k||(S({kind:"warning",text:$e(new N("signed_out"))}),e.onSignedOut())}).catch(()=>{}),()=>{p=!1}},[o==null?void 0:o.token]),t(()=>{if(a.retryAt<=Date.now())return;let p=setInterval(()=>{I(Date.now()),a.retryAt<=Date.now()&&clearInterval(p)},1e3);return()=>clearInterval(p)},[a.retryAt]);function T(p){let k=m(m({},vn()),p);Ki(k),u(k),I(Date.now())}async function tn(p){var oe;let k=p.trim();if(!ac.test(k)){S({kind:"error",text:"Enter a valid email address."});return}b(!0),S(null);try{let se=await Ri(k);T({email:k,codeSentAt:Date.now(),retryAt:Date.now()+se*1e3,retryEmail:k.toLowerCase()}),h("")}catch(se){let P=se instanceof N?se:null,Ae=(oe=P==null?void 0:P.retryAfter)!=null?oe:null,ge=Ae&&Ae<=sc?Date.now()+Ae*1e3:0,Me=(P==null?void 0:P.code)==="too_many_requests"?null:k.toLowerCase();if((P==null?void 0:P.code)==="resend_wait"){T({email:k,codeSentAt:a.email===k&&a.codeSentAt?a.codeSentAt:Date.now(),retryAt:ge,retryEmail:Me});return}ge&&T({retryAt:ge,retryEmail:Me}),S({kind:"error",text:$e(se)})}finally{b(!1)}}async function B(){b(!0),S(null);try{let p=await Fi(a.email,f);T({codeSentAt:null}),h(""),e.onSignedIn(p)}catch(p){S({kind:"error",text:$e(p)});let k=p instanceof N?p.code:null;(k==="too_many_attempts"||k==="code_expired")&&h("")}finally{b(!1)}}async function on(){var k;let p=(k=o==null?void 0:o.email)!=null?k:"";b(!0),S(null),await Yi(),T({email:p,codeSentAt:null}),y(p),b(!1),e.onSignedOut()}async function ie(){b(!0),S(null);try{e.onOpenWebsite(await zi())}catch(p){let k=p instanceof N&&p.code==="signed_out";S({kind:k?"warning":"error",text:$e(p)}),k&&e.onSignedOut()}finally{b(!1)}}let Pe=C?n.createElement("div",{className:"syncify-alert","data-kind":C.kind==="error"?"error":void 0,role:"alert"},C.text):null;if(o===void 0)return null;if(o){let p=s.kind==="open"||s.kind==="other-claim"||s.kind==="cancelled";return n.createElement(n.Fragment,null,n.createElement("div",{className:"syncify-setting"},n.createElement("span",{className:"syncify-setting-text"},n.createElement("span",{className:"syncify-account-email"},o.email),s.kind==="secured"?n.createElement("span",{className:"syncify-muted"},"Backup secured \xB7"," ",s.linkedCount===1?"1 Spotify account linked":`${s.linkedCount} Spotify accounts linked`):s.kind==="pending"?n.createElement("span",{className:"syncify-muted syncify-account-state"},n.createElement(uc,null),n.createElement("span",null,"Securing this backup \xB7"," ",s.held?"in review":`final ${Ft(s.finalAt)}`)):s.kind==="other-account"?n.createElement("span",{className:"syncify-muted"},"This backup is secured by another account"):n.createElement("span",{className:"syncify-muted"},"Signed in")),n.createElement("span",{className:"syncify-account-actions"},n.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-label":"Manage on the website",onClick:()=>{ie()},disabled:d},"Manage",n.createElement(yc,null)),n.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{on()},disabled:d},"Sign out"))),p?n.createElement("div",{className:"syncify-setting"},n.createElement("span",{className:"syncify-setting-text"},n.createElement("span",null,"Secure your backup"),n.createElement("span",{className:"syncify-muted"},"So only you can restore it")),n.createElement("button",{className:"syncify-button",type:"button",onClick:e.onSecure,disabled:d||e.securing||s.kind==="other-claim"},e.securing?"Securing\u2026":s.kind==="cancelled"?"Secure again":"Secure")):null,s.kind==="other-claim"?n.createElement("div",{className:"syncify-alert",role:"status"},"Another claim is pending. If it isn't yours, press Not me above and Syncify will review it."):s.kind==="cancelled"?n.createElement("div",{className:"syncify-alert",role:"status"},"Your claim was cancelled from this Spotify account."):null,e.secureError?n.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.secureError):null,Pe)}return n.createElement(n.Fragment,null,n.createElement("div",{className:"syncify-setting"},e.locked?n.createElement("span",{className:"syncify-setting-text"},n.createElement("span",null,"Sign in to restore"),n.createElement("span",{className:"syncify-muted"},"With the email that secured this backup")):n.createElement("span",{className:"syncify-setting-text"},n.createElement("span",null,"Secure your backup"),n.createElement("span",{className:"syncify-muted"},"So only you can restore it"))),n.createElement("form",{className:"syncify-confirm",noValidate:!0,onSubmit:p=>{p.preventDefault(),!d&&(te?f.length===Hn&&B():me||tn(c))}},te?n.createElement(n.Fragment,null,n.createElement("p",{className:"syncify-muted"},"Code sent to ",rc(a.email)),n.createElement("div",{className:"syncify-field"},n.createElement("input",{className:"syncify-input syncify-code-input",type:"text",inputMode:"numeric",autoComplete:"one-time-code","aria-label":"6-digit code",placeholder:"123456",maxLength:Hn,value:f,onChange:p=>h(p.currentTarget.value.replace(/\D/g,"").slice(0,Hn)),autoFocus:!0}),n.createElement("button",{className:"syncify-button",type:"submit",disabled:d||f.length!==Hn},d?"Verifying\u2026":"Verify")),n.createElement("p",{className:"syncify-muted syncify-account-links"},n.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{tn(a.email)},disabled:d||$>0},$>0?`Resend in ${rs($)}`:"Resend code"),n.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{T({codeSentAt:null}),h(""),S(null)},disabled:d},"Use another email"))):n.createElement(n.Fragment,null,n.createElement("div",{className:"syncify-field"},n.createElement("input",{className:"syncify-input",type:"email",autoComplete:"email","aria-label":"Email",placeholder:"you@example.com",value:c,onChange:p=>y(p.currentTarget.value),autoFocus:!0}),n.createElement("button",{className:"syncify-button",type:"submit",disabled:d||me>0||!c.trim()},d?"Sending\u2026":"Send code")),n.createElement("p",{className:"syncify-muted"},me>0?`Send another code in ${rs(me)}`:"We only email sign-in codes.")),Pe))}var Hn=6,oc=600*1e3,sc=300,ac=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function rc(e){let n=e.lastIndexOf("@");return n<1?e:`${e[0]}***${e.slice(n)}`}function Ft(e){let n=Te(new Date(e).toISOString());return n.startsWith("today")?n:`on ${n}`}function rs(e){return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function cs(e){let n=Spicetify.React,t=e.openSection===e.id,i=`syncify-section-${e.id}`;return n.createElement("section",{className:"syncify-accordion-section","aria-label":e.title},n.createElement("button",{className:"syncify-accordion-header",type:"button","aria-expanded":t,"aria-controls":i,onClick:()=>e.onToggle(t?null:e.id)},n.createElement("span",{className:"syncify-accordion-title"},e.title),n.createElement(en,null)),t?n.createElement("div",{className:"syncify-accordion-body",id:i},e.children):null)}function cc(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-shield",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"}))}function Wt(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-warning-icon",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M12 3 2 21h20z"}),e.createElement("path",{d:"M12 10v5"}),e.createElement("path",{d:"M12 18h.01"}))}function en(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-chevron",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"m9 6 6 6-6 6"}))}function lc(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-lock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("rect",{x:"5",y:"11",width:"14",height:"10",rx:"2"}),e.createElement("path",{d:"M8 11V7a4 4 0 0 1 8 0v4"}))}function uc(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-clock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("circle",{cx:"12",cy:"12",r:"9"}),e.createElement("path",{d:"M12 7v5l3 2"}))}function yc(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-external",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M14 4h6v6"}),e.createElement("path",{d:"M20 4 10 14"}),e.createElement("path",{d:"M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"}))}function ls(){let e=Spicetify.React;return e.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M18 6 6 18"}),e.createElement("path",{d:"m6 6 12 12"}))}var fc=600*1e3,dc=3,pc={exists:!1,payload:null,backups:[],safetyCopy:null,claim:null,unapproved:[],install:null},mc=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function gc(e,n,t,i){var C;let o=new Set(n),s=new Set(t),a=t.filter(S=>!o.has(S)).length,u=n.filter(S=>!s.has(S)).length,c=(C=e.spicetify_config)!=null?C:null,y=!!(i&&!c),f=!y&&(i&&c?!mo(i,c):i!==c),h=[a?`${a} added`:null,u?`${u} removed`:null,f?"Spicetify config changed":null].filter(Boolean),d=Te(e.metadata.last_sync_datetime),b=h.length?`${h.join(", ")} since ${d}`:`Last backup ${d}`;return y?`${b} \xB7 Spicetify config not saved yet`:b}function us(e){return e===1?"1 extension or theme":`${e} extensions and themes`}function Te(e){let n=new Date(e);if(Number.isNaN(n.getTime()))return e;let t=n.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),i=new Date,o=new Date(i);return o.setDate(i.getDate()-1),n.toDateString()===i.toDateString()?`today, ${t}`:n.toDateString()===o.toDateString()?`yesterday, ${t}`:`${n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===i.getFullYear()?void 0:"numeric"})}, ${t}`}function fs(e){var y;let n=Spicetify.React,t=n.useState,{claim:i}=e,[o,s]=t(!1),[a,u]=t(null);async function c(){s(!0),u(null);try{await Kn(K()),Spicetify.showNotification("Syncify: claim sent for review"),e.onClose()}catch(f){u(f instanceof Error?f.message:String(f)),s(!1)}}return n.createElement("div",{className:"syncify-panel"},n.createElement("p",{className:"syncify-claim-notice"},(y=i.email)!=null?y:"Someone"," is claiming this backup."," ",i.held?"Syncify is reviewing it.":`It goes through ${Ft(i.final_at)} unless you stop it.`),a?n.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},a):null,n.createElement("div",{className:"syncify-actions"},n.createElement("button",{className:"syncify-text-button",type:"button",onClick:e.onClose,disabled:o},"Close"),n.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{c()},disabled:o},"Not me")))}var Rn="[Syncify]";function j(e,n){if(n===void 0){console.debug(Rn,e);return}console.debug(Rn,e,n)}function nn(e,n){if(n===void 0){console.warn(Rn,e);return}console.warn(Rn,e,n)}function hc(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var ps="syncify-styles";function Sc(){if(document.getElementById(ps)){j("Another copy of Syncify is running; stopping this one");return}kc();let e=K();uo({topbarButton:bc(),menuItem:Ec()}),Nn(e.entryPoint),xt(e.shortcut,Wn),Bo({onClaim:Tc,onInstall:Pc}).catch(n=>{nn("Startup sync check failed",n)}),Wo().catch(n=>{nn("Restore check failed",n)})}function kc(){let e=document.createElement("style");e.id=ps,e.textContent=_i,document.head.appendChild(e)}function bc(){let{extensionName:e}=M(),n=new Spicetify.Topbar.Button(e,rt,t=>{j("Topbar button clicked",Fn(t)),Wn()},!1,!0);return ms(n),vc(n),_c(n),j("Topbar button registered",Fn(n)),n}function ms(e){var t;let n=e;e.element.style.setProperty("-webkit-app-region","no-drag"),(t=n.button)==null||t.style.setProperty("-webkit-app-region","no-drag")}var ds=".main-actionButtons",wc=".Root__globalNav, .Root__top-bar",xc=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function vc(e){if(typeof MutationObserver=="undefined")return;let n=!1,t=null,i=()=>{n=!1,s();let a=e.element,u=document.querySelector(ds);!a||!u||u.contains(a)||(u.prepend(a),Cc(e),ms(e),j("Topbar button re-attached",Fn(e)))},o=new MutationObserver(()=>{n||(n=!0,setTimeout(i,250))}),s=()=>{var c;if(t!=null&&t.isConnected)return;let a=document.querySelector(ds),u=(c=a==null?void 0:a.closest(wc))!=null?c:a==null?void 0:a.parentElement;if(o.disconnect(),t=u!=null?u:null,!u){o.observe(document.body,{childList:!0,subtree:!0});return}o.observe(u,{childList:!0,subtree:!0});for(let y=u.parentElement;y;y=y.parentElement)o.observe(y,{childList:!0})};i()}function Cc(e){let n=Ic(e);if(!n||n.className&&n.className!=="undefined")return;let t=Array.from(document.querySelectorAll(xc)).find(i=>!e.element.contains(i));t!=null&&t.className&&(n.className=t.className)}function Ic(e){return e.button}function Ec(){var e;if(typeof((e=Spicetify.Menu)==null?void 0:e.Item)!="function")return null;try{return new Spicetify.Menu.Item(M().extensionName,!1,()=>Wn(),Nc())}catch(n){return nn("Failed to create profile menu item",n),null}}function Nc(){return rt.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function _c(e){Object.assign(window,{SyncifyDebug:{button:e,element:e.element,openModal:Wn,inspect:()=>Fn(e),clickElement:()=>{var n;return(n=e.element)==null?void 0:n.click()},clickInnerButton:()=>{var n;return(n=e.button)==null?void 0:n.click()},clickCallback:()=>e.onClick(e)}})}function Fn(e){var n,t,i,o,s;return{label:e.label,disabled:e.disabled,isRight:e.isRight,hasElement:!!e.element,elementConnected:(n=e.element)==null?void 0:n.isConnected,elementDisabled:(t=e.element)==null?void 0:t.disabled,elementAriaDisabled:(i=e.element)==null?void 0:i.getAttribute("aria-disabled"),elementClass:(o=e.element)==null?void 0:o.className,appRegion:e.element?getComputedStyle(e.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:e.button?getComputedStyle(e.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:e.element?getComputedStyle(e.element).pointerEvents:null,visibility:e.element?getComputedStyle(e.element).visibility:null,display:e.element?getComputedStyle(e.element).display:null,rect:(s=e.element)==null?void 0:s.getBoundingClientRect().toJSON()}}var _=null;function Wn(){if(_!=null&&_.container.isConnected){j("Closing modal"),Spicetify.PopupModal.hide();return}j("Opening modal"),Yt(Spicetify.React.createElement(ys))}function Tc(e){_!=null&&_.container.isConnected||(j("Opening claim notice"),Yt(Spicetify.React.createElement(fs,{claim:e,onClose:()=>Spicetify.PopupModal.hide()})))}function Pc(e){if(_!=null&&_.container.isConnected)return;j("Opening install notice");let n=()=>Spicetify.PopupModal.hide();Yt(Spicetify.React.createElement("div",{className:"syncify-panel"},Spicetify.React.createElement(ts,{install:e,onDone:n,onClose:n})))}function Yt(e){var t;(t=_==null?void 0:_.root)==null||t.unmount();let n=document.createElement("div");_={container:n,root:null};try{Spicetify.PopupModal.display({title:M().extensionName,content:n,isLarge:!1})}catch(i){throw nn("Failed to open PopupModal",i),i}Ac(n),Dc(n,e)}function Ac(e){requestAnimationFrame(()=>{let n=Mc(e);n==null||n.classList.add("syncify-modal-shell");let t=n==null?void 0:n.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');t&&(t.classList.add("syncify-modal-close"),t.setAttribute("aria-label",`Close ${M().extensionName}`),t.title="Close",t.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function Mc(e){let n=e.parentElement;for(;n&&n!==document.body;){if(n.querySelector(".main-trackCreditsModal-header"))return n;n=n.parentElement}return e.closest('[class*="trackCreditsModal"]')}function Dc(e,n){try{if(typeof Spicetify.ReactDOM.createRoot=="function"){let t=Spicetify.ReactDOM.createRoot(e);t.render(n),(_==null?void 0:_.container)===e&&(_.root=t),j("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(n,e),j("Modal rendered",{renderer:"render"})}catch(t){throw nn("Failed to render modal",t),t}}Fo();(function e(){if(!hc()){setTimeout(e,100);return}j("Spicetify APIs ready"),Sc()})();})();
