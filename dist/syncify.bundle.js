// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var zs=Object.defineProperty,qs=Object.defineProperties;var Vs=Object.getOwnPropertyDescriptors;var _i=Object.getOwnPropertySymbols;var Gs=Object.prototype.hasOwnProperty,Js=Object.prototype.propertyIsEnumerable;var Ti=(e,t,n)=>t in e?zs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,m=(e,t)=>{for(var n in t||(t={}))Gs.call(t,n)&&Ti(e,n,t[n]);if(_i)for(var n of _i(t))Js.call(t,n)&&Ti(e,n,t[n]);return e},v=(e,t)=>qs(e,Vs(t));var Pi=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var rn=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var Qs="syncify",we="state";function cn(){let e;try{e=window.indexedDB}catch(t){return Promise.resolve(null)}return e?new Promise(t=>{let n;try{n=e.open(Qs,1)}catch(i){t(null);return}n.onupgradeneeded=()=>{n.result.createObjectStore(we)},n.onerror=()=>t(null),n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}function ln(e,t){let n=cn().then(i=>new Promise((o,s)=>{if(!i){s(new Error("IndexedDB isn't available."));return}try{let a=i.transaction(we,e),u=t(a.objectStore(we));a.oncomplete=()=>{i.close(),o(u.result)},a.onerror=a.onabort=()=>{var c;i.close(),s((c=a.error)!=null?c:new Error("IndexedDB failed."))}}catch(a){i.close(),s(a)}}));return Promise.race([n,new Promise((i,o)=>setTimeout(()=>o(new Error("IndexedDB took too long.")),2e3))])}function xe(e){return ln("readonly",t=>t.get(e))}async function ve(e,t){await ln("readwrite",n=>n.put(t,e))}async function Ai(e){await ln("readwrite",t=>t.delete(e))}var Z={extensionName:"Syncify",version:"1.11.0",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com"};function M(){var t,n,i,o,s,a,u,c;let e=window.SyncifyConfig;return{extensionName:(t=ue(e==null?void 0:e.extensionName))!=null?t:Z.extensionName,version:(n=Mi(e==null?void 0:e.version))!=null?n:Z.version,workerUrl:(i=ue(e==null?void 0:e.workerUrl))!=null?i:Z.workerUrl,webUrl:(o=ue(e==null?void 0:e.webUrl))!=null?o:Z.webUrl,githubUrl:(s=ue(e==null?void 0:e.githubUrl))!=null?s:Z.githubUrl,kofiUrl:(a=ue(e==null?void 0:e.kofiUrl))!=null?a:Z.kofiUrl,issueUrl:(u=ue(e==null?void 0:e.issueUrl))!=null?u:Z.issueUrl,releasesUrl:(c=ue(e==null?void 0:e.releasesUrl))!=null?c:Z.releasesUrl}}function ue(e){return Mi(e)}function Mi(e){return typeof e=="string"&&e.trim()?e.trim():null}var ea="x-syncify-version",ta="x-syncify-install",na="x-syncify-timezone",Di="install-id",Li="syncify:install-id",ia=2e3,gt=null;async function Bi(){let e={[ea]:M().version,[ta]:(await un()).id},t=aa();return t&&(e[na]=t),e}function un(){return gt!=null||(gt=oa().catch(()=>({id:ht(),inDatabase:!1}))),gt}async function oa(){let e=await Promise.race([sa(),new Promise(t=>setTimeout(()=>t(null),ia))]);if(e)return{id:e,inDatabase:!0};try{let t=window.localStorage.getItem(Li);if(t&&Oi(t))return{id:t,inDatabase:!1};let n=ht();return window.localStorage.setItem(Li,n),{id:n,inDatabase:!1}}catch(t){return{id:ht(),inDatabase:!1}}}async function sa(){let e=await cn();return e?new Promise(t=>{let n=null;try{let i=e.transaction(we,"readwrite"),o=i.objectStore(we),s=o.get(Di);s.onsuccess=()=>{if(typeof s.result=="string"&&Oi(s.result)){n=s.result;return}n=ht(),o.put(n,Di)},i.oncomplete=()=>{e.close(),t(n)},i.onerror=i.onabort=()=>{e.close(),t(null)}}catch(i){e.close(),t(null)}}):null}function ht(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t=[...e].map(n=>n.toString(16).padStart(2,"0"));return[t.slice(0,4).join(""),t.slice(4,6).join(""),t.slice(6,8).join(""),t.slice(8,10).join(""),t.slice(10).join("")].join("-")}function Oi(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(e)}function aa(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(e){return null}}var ra="syncify-signature-v1",ca={name:"ECDSA",hash:"SHA-256"};function St(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function kt(e){return yn(new Uint8Array(await crypto.subtle.exportKey("raw",e)))}async function Ue(e,t,n,i,o){let s=await la(t,n,i,o),a=await crypto.subtle.sign(ca,e,s);return yn(new Uint8Array(a))}async function la(e,t,n,i){let{pathname:o,search:s}=new URL(n),a=new TextEncoder,u=yn(new Uint8Array(await crypto.subtle.digest("SHA-256",a.encode(i))));return a.encode([ra,e,t.toUpperCase(),o+s,u].join(`
`))}function yn(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var Ui="device-key",fn="session",Ki="salt",ye=null,Ke,ji={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function je(e){if(ye)return ye;let t=await xe(Ui);return ua(t)?(ye=Promise.resolve(t),t):e?(ye=St().then(async n=>(await ve(Ui,n),n)),ye.catch(()=>{ye=null}),ye):null}async function R(){let e=await xe(fn);return ya(e)?e:null}function dn(e){return ve(fn,e)}async function fe(){await Ai(fn).catch(()=>{})}async function bt(){if(Ke===void 0){let e=await xe(Ki).catch(()=>{});Ke=typeof e=="string"?e:null}return Ke}async function wt(e){e!==Ke&&(Ke=e,await ve(Ki,e).catch(()=>{}))}function xt(){return ji}function $i(e){ji=e}function ua(e){let t=e;return!!(t&&t.privateKey instanceof CryptoKey&&t.publicKey instanceof CryptoKey)}function ya(e){let t=e;return!!(t&&typeof t.token=="string"&&t.token&&typeof t.email=="string")}var Hi="install-key",Ce=null;function Ri(){return Ce!=null||(Ce=fa()),Ce.catch(()=>{Ce=null}),Ce.catch(()=>null)}async function fa(){if(!(await un()).inDatabase)return null;let e=await xe(Hi),t=pa(e)?e:await da();return{privateKey:t.privateKey,publicKey:await kt(t.publicKey)}}async function da(){let e=await St();return await ve(Hi,e),e}function pa(e){let t=e;return!!(t&&t.privateKey instanceof CryptoKey&&t.publicKey instanceof CryptoKey)}var ma="/api/auth/email-otp/send-verification-otp",ga="/api/auth/sign-in/email-otp",ha="/api/auth/get-session",Sa="/api/auth/sign-out",ka="/api/auth/link",ba="x-syncify-device-key",wa="x-syncify-signature",Fi="x-syncify-salt",xa="none",va={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again.",link_failed:"Couldn't open the website. Try again."},N=class extends Error{constructor(n,i=null){var o;super((o=va[n])!=null?o:"Sign-in failed. Try again.");this.code=n;this.retryAfter=i;this.name="AccountError"}};function $e(e){return e instanceof N?e.message:"Sign-in failed. Try again."}async function Wi(e){let t=await vt(ma,{method:"POST",body:JSON.stringify({email:e,type:"sign-in"})});return typeof(t==null?void 0:t.resend_in)=="number"?t.resend_in:60}async function Yi(e,t){var s;let n=await je(!0).catch(()=>{throw new N("no_device_key")}),i=await vt(ga,{method:"POST",body:JSON.stringify({email:e,otp:t}),keys:n,sendPublicKey:!0});if(typeof(i==null?void 0:i.token)!="string"||!i.token)throw new N("sign_in_failed");let o={token:i.token,email:typeof((s=i.user)==null?void 0:s.email)=="string"?i.user.email:e};return await dn(o).catch(()=>{throw new N("no_device_key")}),pn=!0,o}var pn=!1;async function zi(){var t;let e=await R();if(!e||pn)return e;try{let n=await mn(e,ha,"GET");pn=!0;let i=(t=n==null?void 0:n.user)==null?void 0:t.email;if(typeof i!="string"||i===e.email)return e;let o=v(m({},e),{email:i});return await dn(o).catch(()=>{}),o}catch(n){if(n instanceof N&&n.code==="signed_out")return null;throw n}}async function qi(){let e=await R().catch(()=>null);e&&await mn(e,Sa,"POST").catch(()=>{}),await fe()}async function Vi(){let e=await R();if(!e)throw new N("signed_out");let t=await mn(e,ka,"POST"),n=typeof(t==null?void 0:t.url)=="string"?t.url:"",i=new URL(M().webUrl).origin;if(!n.startsWith(`${i}/link#`))throw new N("link_failed");return n}async function mn(e,t,n){let i=await je(!1);if(!i)throw await fe(),new N("signed_out");return vt(t,{method:n,token:e.token,keys:i})}async function vt(e,t,n=!1){var f,h,d;let i=`${M().webUrl.replace(/\/+$/,"")}${e}`,o={};if(t.body!==void 0&&(o["content-type"]="application/json"),t.token&&(o.authorization=`Bearer ${t.token}`),t.keys){let b=(f=await bt())!=null?f:xa;o[Fi]=b,o[wa]=await Ue(t.keys.privateKey,b,t.method,i,(h=t.body)!=null?h:""),t.sendPublicKey&&(o[ba]=await kt(t.keys.publicKey))}let s;try{s=await fetch(i,{method:t.method,headers:o,body:t.body})}catch(b){throw new N("offline")}let a=s.headers.get(Fi);a&&await wt(a);let u=await s.json().catch(()=>null);if(s.ok)return u;let c=typeof(u==null?void 0:u.code)=="string"?u.code:s.status===503?"unavailable":"failed";if(c==="stale_salt"&&t.keys&&!n)return vt(e,t,!0);c==="signed_out"&&await fe();let y=Number(s.headers.get("retry-after"));throw new N(c,Number.isFinite(y)&&y>0?y:(d=Ca[c])!=null?d:null)}var Ca={resend_wait:60,too_many_requests:60,send_failed:60};var Ia="x-syncify-user-hash",Ea="x-syncify-identity",Na="x-syncify-signature",_a="x-syncify-install-key",Ta="x-syncify-install-signature",gn="x-syncify-salt",Pa="none",Aa="/restores",Ma="/installs",Da="hash",Gi=3,He=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}},z=class extends Error{constructor(n){super(n==="not_linked"?"Couldn't read that Spotify account's backups.":"Sign in to restore this backup.");this.code=n;this.name="LockedError"}},de=class extends Error{constructor(){super("This Spotify account doesn't accept backups from this install. Sign in to back up."),this.name="InstallRefusedError"}};async function Xi(e,t,n){var s;let i=await Q(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(n)});if(i.status===403&&((s=await i.json().catch(()=>null))==null?void 0:s.code)==="install_refused")throw new de;if(!i.ok)throw new Error(`Backup failed with HTTP ${i.status}.`);let o=await i.json().catch(()=>null);return{unchanged:(o==null?void 0:o.unchanged)===!0,unapproved:(o==null?void 0:o.quarantined)===!0}}async function Zi(e,t,n,i){let o=await Q(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({install:n,action:i})},Ma);if(o.ok)return;let s=await o.json().catch(()=>null);if((s==null?void 0:s.code)!=="not_pending")throw new Error(`Couldn't answer with HTTP ${o.status}.`)}async function hn(e,t,n){var d,b,C,S;let i=await Q(e,t,{method:"GET"},eo("/",n));if(i.status===404){let w=await i.json().catch(()=>null);return{exists:!1,payload:null,backups:[],safetyCopy:null,claim:Re(w==null?void 0:w.claim),unapproved:[],install:Ji(w==null?void 0:w.install)}}if(!i.ok)throw new Error(`Restore failed with HTTP ${i.status}.`);let o=await i.json(),s=Re(o.claim),a=Ji(o.install);delete o.claim,delete o.install;let u=[o,...(d=o.backup_history)!=null?d:[]];if(!u.every(w=>w.backup))return{exists:!0,payload:o,backups:u.slice(0,Gi),safetyCopy:(b=u[Gi])!=null?b:null,claim:s,unapproved:[],install:a};let c=u.filter(w=>{var I;return((I=w.backup)==null?void 0:I.kind)==="rolling"}),y=(C=u.find(w=>{var I;return((I=w.backup)==null?void 0:I.kind)==="anchor"}))!=null?C:null,f=u.filter(w=>{var I;return((I=w.backup)==null?void 0:I.kind)==="quarantined"}),h=(S=c[0])!=null?S:y;return h?c.length===0&&y?{exists:!0,payload:h,backups:[y],safetyCopy:null,claim:s,unapproved:f,install:a}:{exists:!0,payload:h,backups:c,safetyCopy:y,claim:s,unapproved:f,install:a}:{exists:!1,payload:null,backups:[],safetyCopy:null,claim:s,unapproved:f,install:a}}async function Qi(e,t,n,i){try{await Q(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:n}),keepalive:!0},eo(Aa,i))}catch(o){}}async function Q(e,t,n,i="",o=!1){var S,w,I,ne,$;let s=i?`${e.replace(/\/+$/,"")}${i}`:e,a=(S=n.method)!=null?S:"GET",u=await R().catch(()=>null),c=u?await je(!1).catch(()=>null):null,y=await Ri(),f={},h=(w=await bt())!=null?w:Pa;u&&c&&(f.authorization=`Bearer ${u.token}`,f[gn]=h,f[Na]=await Ue(c.privateKey,h,a,s,(I=n.body)!=null?I:"")),y&&(f[gn]=h,f[_a]=y.publicKey,f[Ta]=await Ue(y.privateKey,h,a,s,(ne=n.body)!=null?ne:""));let d=await fetch(s,v(m({},n),{headers:m(v(m(m({},n.headers),await Bi()),{[Ia]:t.hash,[Ea]:t.field}),f)})),b=d.headers.get(gn);if(b&&await wt(b),d.status===426)throw new He;if(d.status!==401)return d;let C=($=await d.clone().json().catch(()=>null))==null?void 0:$.code;if(!o){if(C==="stale_salt"&&(u||y))return Q(e,t,n,i,!0);if(C==="signed_out"&&u)return await fe(),Q(e,t,n,i,!0)}throw C==="claimed"||C==="not_owner"||C==="not_linked"?new z(C):(C==="signed_out"&&await fe(),new N(typeof C=="string"?C:"failed"))}function eo(e,t){return t?`${e}?${Da}=${encodeURIComponent(t)}`:e}function Ji(e){let t=e;if(!t||typeof t.trust!="string")return null;let n=Array.isArray(t.waiting)?t.waiting:[];return{trusted:t.trust!=="pending"&&t.trust!=="rejected",refused:t.trust==="rejected",waiting:n.flatMap(i=>{let o=i;return o&&typeof o.id=="string"&&typeof o.first_seen_at=="number"?[{id:o.id,device:typeof o.device=="string"?o.device:null,first_seen_at:o.first_seen_at}]:[]})}}function Re(e){let t=e;return!t||typeof t.mine!="boolean"?null:t.status==="final"?{status:"final",mine:t.mine}:t.status!=="pending"||typeof t.final_at!="number"?null:{status:"pending",mine:t.mine,email:typeof t.email=="string"?t.email:null,final_at:t.final_at,held:t.held===!0}}var to="/claims",La="/claims/cancel",Ba={no_backup:"Back up first, then secure your backup.",unsupported_identity:"This Spotify account can't be secured.",too_many_accounts:"Your account already has 10 Spotify accounts linked.",offline:"Couldn't reach Syncify. Check your connection and try again."},ee=class extends Error{constructor(n){var i;super((i=Ba[n])!=null?i:"Couldn't secure your backup. Try again.");this.code=n;this.name="ClaimError"}};async function no(e,t){let n=await Sn(e,t,"GET",to);if(!n.ok)throw new ee(await kn(n));let i=await n.json().catch(()=>null);return{claim:Re(i==null?void 0:i.claim),accounts:Array.isArray(i==null?void 0:i.accounts)?i.accounts.filter(Oa):null}}async function io(e,t){let n=await Sn(e,t,"POST",to);if(!n.ok)throw new ee(await kn(n));let i=await n.json().catch(()=>null);return Re(i==null?void 0:i.claim)}async function oo(e,t){let n=await Sn(e,t,"POST",La);if(!n.ok&&n.status!==404)throw new ee(await kn(n))}async function Sn(e,t,n,i){try{return await Q(e,t,{method:n},i)}catch(o){throw o instanceof TypeError?new ee("offline"):o}}async function kn(e){let t=await e.json().catch(()=>null);return typeof(t==null?void 0:t.code)=="string"?t.code:"failed"}function Oa(e){let t=e;return!!(t&&typeof t.hash=="string"&&(t.status==="pending"||t.status==="final"||t.status==="cancelled"))}var Ee={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},Ua=/^([a-z0-9]|f([1-9]|1[0-2]))$/,Ka=250,ja=40,bn=null,Ct=null,Ie=null;function so(){return/mac/i.test(navigator.platform||navigator.userAgent)}function ao(e){if(e===null)return null;if(!e||typeof e!="object")return Ee;let t=e;return typeof t.key!="string"||!Ua.test(t.key)?Ee:{key:t.key,ctrl:!!t.ctrl,alt:!!t.alt,shift:!!t.shift,meta:!!t.meta}}function Fe(e){if(!e)return"Off";let t=e.key.toUpperCase();return so()?[e.ctrl?"\u2318":"",e.alt?"\u2325":"",e.shift?"\u21E7":"",t].join(""):[e.ctrl&&"Ctrl",e.meta&&"Win",e.alt&&"Alt",e.shift&&"Shift",t].filter(Boolean).join("+")}function ro(e){if(e.key==="Escape")return{kind:"cancel"};let t=$a(e.code);if(!t)return{kind:"ignore"};let n=so();if(n&&e.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:t,ctrl:n?e.metaKey:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:n?!1:e.metaKey},o=t.startsWith("f")&&t.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!o?{kind:"error",message:`Include ${n?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function $a(e){var n,i;let t=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(e);return t?((i=(n=t[1])!=null?n:t[2])!=null?i:t[3]).toLowerCase():null}function co(e){var t;if(Ie&&Ha(Ie,e))return!1;try{let n=Spicetify.Mousetrap,i=(t=n.trigger)==null?void 0:t.call(n)._directMap;if(!i)return!1;let o=wn(e);return Object.keys(i).some(s=>s.startsWith(`${o}:`))}catch(n){return!1}}function xn(e,t,n=0){if(bn=t,Ct=e,!lo()){if(n>=ja){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>xn(Ct,t,n+1),Ka);return}vn(Ct)}function vn(e){if(Ct=e,!lo()||!bn)return;let t=bn;try{if(Ie&&Spicetify.Keyboard._deregisterShortcut(Ie),Ie=null,!e)return;Spicetify.Keyboard.registerShortcut(e,n=>{n.preventDefault(),t()}),Ie=e,console.debug("[Syncify]","Keyboard shortcut registered",Fe(e))}catch(n){console.warn("[Syncify]","Failed to register keyboard shortcut",n)}}function lo(){var e;return typeof((e=Spicetify.Keyboard)==null?void 0:e.registerShortcut)=="function"}function wn(e){return[e.ctrl&&"mod",e.meta&&"meta",e.alt&&"alt",e.shift&&"shift",e.key].filter(Boolean).join("+")}function Ha(e,t){return wn(e)===wn(t)}var Cn="both",Ra=["both","topbar","menu"],We=null,Ye=null,It=!1;function uo(e){return Ra.includes(e)?e:Cn}function yo(){var e;return typeof((e=Spicetify.Menu)==null?void 0:e.Item)=="function"}function fo(e){We=e.topbarButton,Ye=e.menuItem}function Et(e){let t=e!=="menu"||!Ye,n=e!=="topbar";if(We!=null&&We.element&&(We.element.style.display=t?"":"none"),!!Ye)try{n&&!It?(Ye.register(),It=!0):!n&&It&&(Ye.deregister(),It=!1)}catch(i){console.warn("[Syncify]","Failed to update profile menu item",i)}}var _t="syncify:config",Nt={workerUrl:M().workerUrl,autoBackupEnabled:!1,shortcut:Ee,entryPoint:Cn};function K(){var n,i;let e=M(),t=(i=(n=Spicetify.LocalStorage)==null?void 0:n.get(_t))!=null?i:window.localStorage.getItem(_t);if(!t)return v(m({},Nt),{workerUrl:e.workerUrl});try{let o=JSON.parse(t);return{workerUrl:e.workerUrl,autoBackupEnabled:o.autoBackupEnabled===void 0?Nt.autoBackupEnabled:!!o.autoBackupEnabled,shortcut:o.shortcut===void 0?Nt.shortcut:ao(o.shortcut),entryPoint:uo(o.entryPoint)}}catch(o){return v(m({},Nt),{workerUrl:e.workerUrl})}}function Tt(e){var n;let t=JSON.stringify({workerUrl:M().workerUrl,autoBackupEnabled:e.autoBackupEnabled,shortcut:e.shortcut,entryPoint:e.entryPoint});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set(_t,t);return}window.localStorage.setItem(_t,t)}function ze(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}async function Pt(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return[...new Uint8Array(n)].map(i=>i.toString(16).padStart(2,"0")).join("")}function qe(e){return JSON.stringify(In(e))}function In(e){return Array.isArray(e)?e.map(In):e&&typeof e=="object"?Object.keys(e).sort().reduce((t,n)=>(t[n]=In(e[n]),t),{}):e}var Fa=["username","canonicalUsername","id","uri","displayName"];async function q(){let{value:e,field:t}=await Wa();return{hash:await Pt(e),field:t}}async function Wa(){var o;let e=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let t=await e.getUser(),n=Fa.find(s=>(t==null?void 0:t[s])!=null),i=n?t[n]:void 0;if(!n||!i)throw new Error("Unable to resolve the active Spotify user.");return{value:i,field:n}}var Ya=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,za=100,qa="marketplace:installed-extensions",Va="marketplace:installed-themes",Ga="marketplace:theme-installed",Ja="marketplace:installed:",Xa="marketplace";function Nn(e){return Spicetify.Config?_n(Spicetify.Config,e):null}function _n(e,t){var s;let n=te(e),i=new Set(Za(t)),o=((s=t[Ga])==null?void 0:s.includes(Ja))===!0;return{current_theme:o?Xa:n.current_theme,color_scheme:o?"":n.color_scheme,extensions:n.extensions.filter(a=>!i.has(a)),custom_apps:n.custom_apps}}function te(e){let t=e&&typeof e=="object"?e:{};return{current_theme:En(t.current_theme)?t.current_theme:"",color_scheme:En(t.color_scheme)?t.color_scheme:"",extensions:po(t.extensions),custom_apps:po(t.custom_apps)}}function ho(e,t){return qe(te(e))===qe(te(t))}function po(e){return Array.isArray(e)?[...new Set(e.filter(En))].sort().slice(0,za):[]}function En(e){return typeof e=="string"&&Ya.test(e)}function Za(e){let t=mo(e[qa]).map(i=>{var s;let o=(s=go(e[i]))==null?void 0:s.manifest;return o&&typeof o=="object"?o.main:void 0}),n=mo(e[Va]).flatMap(i=>{var s;let o=(s=go(e[i]))==null?void 0:s.include;return Array.isArray(o)?o:[]});return[...t,...n].flatMap(i=>{let o=typeof i=="string"?i.split("/").pop():void 0;return o?[o]:[]})}function mo(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function go(e){try{let t=e?JSON.parse(e):null;return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch(t){return null}}function So(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var Qa=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],er="marketplace:installed:",ko=`${er}snippet:`,tr="wsoltani/syncify",nr="marketplace",bo={added:0,removed:1,unchanged:2};function V(e){let t=new Map;for(let[n,i]of Qa)for(let o of ar(e[n]))t.has(o)||t.set(o,or(o,i,e[o]));return[...t.values()]}function Tn(e,t,n,i){let o=new Set(e.map(c=>c.key)),s=new Map(n.map(c=>[c.key,c])),a=[...e.map(c=>{let y=s.get(c.key);return v(m({},c),{change:y?"unchanged":"added",isNew:!y||y.sources.join(" ")!==c.sources.join(" ")})}),...n.filter(c=>!o.has(c.key)).map(c=>v(m({},c),{change:Pn(c,e)?"unchanged":"removed",isNew:!1}))].sort((c,y)=>bo[c.change]-bo[y.change]||c.name.localeCompare(y.name)),u={added:0,removed:0,unchanged:0};for(let c of a)u[c.change]+=1;return{items:a,counts:u,manual:ir(t,i)}}function Pn(e,t){return e.type==="extension"&&wo(e)&&!t.some(wo)}function wo(e){var t;return((t=e.repo)==null?void 0:t.toLowerCase())===tr}function ir(e,t){if(!e)return[];let n=te(e),i=te(t),o=[...n.extensions.filter(a=>!i.extensions.includes(a)).map(a=>({type:"extension",name:a})),...n.custom_apps.filter(a=>!i.custom_apps.includes(a)).map(a=>({type:"custom_app",name:a}))],s=n.current_theme;return s&&s!==nr&&(s!==i.current_theme||n.color_scheme!==i.color_scheme)&&o.push(m({type:"theme",name:s},n.color_scheme?{scheme:n.color_scheme}:{})),o}function or(e,t,n){var c,y;let i=xo(n),o=xo(i==null?void 0:i.manifest),s=At(i==null?void 0:i.user),a=At(i==null?void 0:i.repo),u=(y=(c=At(i==null?void 0:i.title))!=null?c:At(o==null?void 0:o.name))!=null?y:e.startsWith(ko)?e.slice(ko.length):e.split("/").pop()||e;return{key:e,type:t,name:u,repo:t!=="snippet"&&s&&a?`${s}/${a}`:null,sources:sr(t,i),custom:t==="snippet"&&(i==null?void 0:i.custom)===!0}}function sr(e,t){return t?(e==="extension"?[t.extensionURL]:e==="theme"?[t.cssURL,t.schemesURL,...Array.isArray(t.include)?t.include:[]]:[]).filter(i=>typeof i=="string"&&i!==""):[]}function At(e){return typeof e=="string"&&e.trim()?e.trim():null}function ar(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function xo(e){let t=e;if(typeof e=="string")try{t=JSON.parse(e)}catch(n){return null}return t&&typeof t=="object"&&!Array.isArray(t)?t:null}var Mt="spicetify-marketplace";var Ve="settings";async function vo(){let e=await Eo();if(e.kind!=="ok")return null;try{let t=await No(e.db,"readonly",i=>i.getAll());if(!t)return null;let n={};for(let i of t)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(n[i.key]=i.value);return n}finally{e.db.close()}}async function Co(e){let t=await Eo();if(t.kind==="unavailable")return"unavailable";let n=t.kind==="ok"?t.db:await rr();if(!n)return"failed";try{return await No(n,"readwrite",o=>{let s;for(let[a,u]of Object.entries(e))s=o.put({key:a,value:u});return s})===null?"failed":"written"}finally{n.close()}}function Io(){var e;try{return(e=window.indexedDB)!=null?e:null}catch(t){return null}}async function Eo(){let e=Io();return e?await cr(e)?{kind:"missing"}:new Promise(t=>{let n=!1,i=e.open(Mt);i.onupgradeneeded=()=>{n=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),t({kind:"unavailable"})},i.onblocked=()=>t({kind:"unavailable"}),i.onsuccess=()=>{let o=i.result;if(n){o.close(),lr(e).then(()=>t({kind:"missing"}));return}if(!o.objectStoreNames.contains(Ve)){o.close(),t({kind:"unavailable"});return}t({kind:"ok",db:o})}}):{kind:"unavailable"}}function rr(){let e=Io();return e?new Promise(t=>{let n=e.open(Mt,1);n.onupgradeneeded=()=>{let i=n.result;i.objectStoreNames.contains(Ve)||i.createObjectStore(Ve,{keyPath:"key"})},n.onerror=()=>{console.warn("Syncify could not create Marketplace storage",n.error),t(null)},n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}async function cr(e){if(typeof e.databases!="function")return!1;try{return!(await e.databases()).some(n=>n.name===Mt)}catch(t){return!1}}function lr(e){return new Promise(t=>{let n=e.deleteDatabase(Mt);n.onsuccess=()=>t(),n.onerror=()=>t(),n.onblocked=()=>t()})}function No(e,t,n){return new Promise(i=>{let o;try{o=e.transaction(Ve,t)}catch(y){console.warn("Syncify could not open a Marketplace transaction",y),i(null);return}let s,a=!1,u=y=>{a||(a=!0,i(y))};o.oncomplete=()=>u(s),o.onerror=()=>{console.warn("Syncify Marketplace transaction failed",o.error),u(null)},o.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",o.error),u(null)};let c;try{c=n(o.objectStore(Ve))}catch(y){console.warn("Syncify Marketplace request could not be issued",y),u(null);return}c&&(c.onsuccess=()=>{s=c.result},c.onerror=()=>{console.warn("Syncify Marketplace request failed",c.error),u(null)})})}var An="marketplace:",Mn=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function Ne(){let e=kr(),t=await vo();if(t)for(let[n,i]of Object.entries(t))n.startsWith(An)&&(e[n]=i);return e}var yr=new Set(["marketplace:active-tab","marketplace:sort"]),fr="marketplace:installed:",dr=["stars","tags","lastUpdated","created"];async function Dt(e,t){let n={};for(let[i,o]of Object.entries(e))yr.has(i)||(n[i]=i.startsWith(fr)?pr(o):o);return t&&(n.spicetify_config=te(t)),Pt(qe(n))}function pr(e){try{let t=JSON.parse(e);if(!t||typeof t!="object"||Array.isArray(t))return e;for(let n of dr)delete t[n];return t}catch(t){return e}}async function Lt(){let e=await Ne(),t=Nn(e);return{keyCount:Object.keys(e).length,hash:await Dt(e,t),installedItemCount:hr(e),installedItems:Dn(e),items:V(e),spicetifyConfig:t,marketplaceAvailable:Sr(e)}}async function _o(){let e=await Ne(),t=Nn(e);return m({schema_version:2,metadata:{last_sync_datetime:new Date().toISOString(),device_info:So(),marketplace_key_count:Object.keys(e).length},payload_hash:await Dt(e,t),marketplace_data:{keys:e}},t?{spicetify_config:t}:{})}async function To(e,t=[]){var a,u;let n={},i=(u=(a=e.marketplace_data)==null?void 0:a.keys)!=null?u:{};for(let[c,y]of Object.entries(i))c.startsWith(An)&&(n[c]=y);if(Object.keys(n).length===0)return 0;await mr(n),t.length>0&&await gr(n,t);let o=Object.keys(n);for(let c of o)window.localStorage.setItem(c,n[c]);if(await Co(n)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try the restore again.");return o.length}async function mr(e){let t=await Ne(),n=V(e),i=V(t).filter(a=>Pn(a,n));if(i.length===0)return;let o="marketplace:installed-extensions",s=Ln(e[o]).map(String);for(let a of i)s.includes(a.key)||s.push(a.key),e[a.key]=t[a.key];e[o]=JSON.stringify(s)}async function gr(e,t){let n=await Ne(),i=Dn(n);for(let o of Mn){if(e[o]===void 0)continue;let s=Ln(e[o]).map(String).filter(a=>!t.includes(a)||i.includes(a));e[o]=JSON.stringify(s)}for(let o of t)n[o]!==void 0?e[o]=n[o]:delete e[o]}function hr(e){return Dn(e).length}function Dn(e){return Mn.flatMap(t=>Ln(e[t]).map(String))}function Sr(e){return!!(window.Marketplace||Mn.some(n=>e[n]!==void 0)||e["marketplace:tabs"]!==void 0)}function Po(e,t){return t===0?!1:e===0?!0:e<Math.max(2,Math.floor(t*.5))}function kr(){let e={};for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);if(!(n!=null&&n.startsWith(An)))continue;let i=window.localStorage.getItem(n);i!==null&&(e[n]=i)}return e}function Ln(e){if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch(t){return[]}}async function Bt(e){if(!ze(e))throw new Error("Syncify backup service is not configured.");let[t,n]=await Promise.all([q(),_o()]);if(n.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:i,unapproved:o}=await Xi(e.workerUrl,t,n);return{payload:n,unchanged:i,unapproved:o}}async function _e(e,t){var u;if(!ze(e))throw new Error("Syncify backup service is not configured.");let n=await hn(e.workerUrl,await q(),t),[i,o,s]=await Promise.all([Promise.all(n.backups.map(On)),n.safetyCopy?On(n.safetyCopy):null,Promise.all(n.unapproved.map(On))]),a=i.filter((c,y)=>i.findIndex(f=>f.payload_hash===c.payload_hash)===y);return v(m({},n),{payload:(u=a[0])!=null?u:null,backups:a,safetyCopy:o&&!a.some(c=>c.payload_hash===o.payload_hash)?o:null,unapproved:s.filter(c=>!a.some(y=>y.payload_hash===c.payload_hash))})}var Bn=new Map;async function On(e){var s,a,u;let t=(a=(s=e.marketplace_data)==null?void 0:s.keys)!=null?a:{},n=e.spicetify_config?_n(e.spicetify_config,t):void 0,i=`${e.payload_hash} ${(u=e.metadata)==null?void 0:u.last_sync_datetime}`,o=Bn.get(i);return o||(o=Dt(t,n),Bn.set(i,o),o.catch(()=>Bn.delete(i))),v(m(m({},e),n?{spicetify_config:n}:{}),{payload_hash:await o})}async function Ao(e){let t=await hn(Ge(e),await q());return{claim:t.claim,install:t.install}}async function Mo(e,t,n,i=[]){var u;let o=t!=null?t:(await _e(e)).payload;if(!o)throw new Error("No Syncify cloud backup was found for this Spotify account.");let s=await To(o,i),a=(u=o.backup)==null?void 0:u.id;return a&&ze(e)&&q().then(c=>Qi(e.workerUrl,c,a,n)).catch(()=>{}),{payload:o,restoredCount:s}}async function Do(e){let t=await q(),n=await no(Ge(e),t);return v(m({},n),{hash:t.hash})}async function Lo(e){await io(Ge(e),await q())}async function Ot(e,t,n){await Zi(Ge(e),await q(),t,n)}async function Ut(e){await oo(Ge(e),await q())}function Ge(e){if(!ze(e))throw new Error("Syncify backup service is not configured.");return e.workerUrl}var Kt="syncify:claim-check-day";async function Oo(e){var n,i,o;let t=K();if(t.workerUrl){if(!t.autoBackupEnabled)return br(e);try{let[s,a]=await Promise.all([Lt(),_e(t)]);Uo(a,e);let u=(i=(n=a.payload)==null?void 0:n.metadata.marketplace_key_count)!=null?i:0;if(a.exists&&Po(s.keyCount,u)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((o=a.payload)==null?void 0:o.payload_hash)===s.hash||s.keyCount===0)return;let{unapproved:c}=await Bt(t);Spicetify.showNotification(c?"Syncify: backed up, waiting for approval":"Syncify auto-backup complete")}catch(s){if(s instanceof z||s instanceof de){Spicetify.showNotification("Syncify: sign in to keep backing up",!0,8e3);return}let a=s instanceof Error?s.message:String(s);console.warn("Syncify startup sync failed:",s),Spicetify.showNotification(`Syncify auto-sync skipped: ${a}`,!0,8e3)}}}async function br(e){let t=new Date().toLocaleDateString("en-CA");if(xr()!==t)try{let n=await Ao(K());Bo(t),Uo(n,e)}catch(n){if(n instanceof z){Bo(t);return}console.warn("Syncify claim check failed:",n)}}function Uo(e,t){var o;let n=wr(e.claim),i=(o=e.install)==null?void 0:o.waiting[0];n?t.onClaim(n):i&&t.onInstall(i)}function wr(e){return(e==null?void 0:e.status)==="pending"&&!e.mine?e:null}function xr(){var e,t;return(t=(e=Spicetify.LocalStorage)==null?void 0:e.get(Kt))!=null?t:window.localStorage.getItem(Kt)}function Bo(e){var t;(t=Spicetify.LocalStorage)!=null&&t.set?Spicetify.LocalStorage.set(Kt,e):window.localStorage.setItem(Kt,e)}var Kn="syncify:pending-restore",vr=600*1e3,Cr=2e3,Ir=15e3,Er="marketplace:theme-installed",Nr="raw.githubusercontent.com",_r=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],pe=null,Un=new Set,$o=new Map;function Ho(){return pe}function Ro(e){return Un.add(e),()=>Un.delete(e)}function Fo(){pe&&Vo(v(m({},pe),{manual:[]}))}function jn(e){try{localStorage.setItem(Kn,JSON.stringify({at:Date.now(),manual:e}))}catch(t){}}function Wo(){var e;jn((e=pe==null?void 0:pe.manual)!=null?e:[]),window.location.reload()}function Yo(){Go()&&(document.addEventListener("load",e=>Ko(e.target,"load"),!0),document.addEventListener("error",e=>Ko(e.target,"error"),!0))}async function zo(){let e=Go();if(!e)return;try{localStorage.removeItem(Kn)}catch(o){}let t=Date.now(),n=await jo();for(;n.loaded<n.total&&Date.now()-t<Ir;)await new Promise(o=>setTimeout(o,Cr)),n=await jo();Vo(v(m({at:Date.now()},n),{manual:e.manual}));let i=n.loaded===n.total&&e.manual.length===0;Spicetify.showNotification(i?`Syncify: backup restored. ${Tr(n)}.`:`Syncify: restored ${n.loaded} of ${n.total}. Open Syncify for details.`,!1,8e3)}function qo(e){let t=e.map(n=>n.type==="extension"?`spicetify config extensions ${jt(n.name)}`:n.type==="custom_app"?`spicetify config custom_apps ${jt(n.name)}`:`spicetify config current_theme ${jt(n.name)}${n.scheme?` color_scheme ${jt(n.scheme)}`:""}`);return t.length>0?[...t,"spicetify apply"]:[]}function Tr(e){return e.total===1?"It loaded":`All ${e.total} loaded`}function jt(e){return/^[\w.@+/-]+$/.test(e)?e:`"${e}"`}function Vo(e){pe=e;for(let t of Un)t(e)}function Go(){var e;try{let t=JSON.parse((e=localStorage.getItem(Kn))!=null?e:"null");return!t||Date.now()-t.at>vr?null:{manual:Array.isArray(t.manual)?t.manual:[]}}catch(t){return null}}function Ko(e,t){e instanceof HTMLScriptElement&&e.src&&$o.set(Je(e.src),t)}async function jo(){var i;let e=await Ne(),t=(i=e[Er])!=null?i:"",n=V(e).filter(o=>o.type==="extension"&&o.sources.length>0||o.type==="theme"&&t.includes(o.key)||o.type==="snippet");return{loaded:n.filter(Pr).length,total:n.length}}function Pr(e){var t,n;if(e.type==="snippet"){let i=document.querySelector("style.marketplaceSnippets");return((t=i==null?void 0:i.textContent)==null?void 0:t.includes(`/* ${e.name} - `))===!0}if(e.type==="theme"){let i=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((n=i==null?void 0:i.textContent)!=null&&n.trim())}return Ar(e.sources[0]).some(Mr)}function Ar(e){let t;try{t=new URL(e)}catch(a){return[]}if(t.host!==Nr)return[Je(t.href)];let[n,i,o,...s]=t.pathname.split("/").filter(Boolean);return!n||!i||!o||s.length===0?[]:_r.map(a=>Je(`https://${a}/gh/${n}/${i}@${o}/${s.join("/")}`))}function Mr(e){let t=$o.get(e);return t?t==="load":[...document.querySelectorAll("script[src]")].some(i=>Je(i.src)===e)&&performance.getEntriesByType("resource").some(i=>Je(i.name)===e)}function Je(e){try{let t=new URL(e);return`${t.origin}${t.pathname}`}catch(t){return e}}var Dr="raw.githubusercontent.com",Lr="cdn.jsdelivr.net",Jo=".github.io";function Hn(e){var n;if(e.protocol!=="https:")return null;let t=e.pathname.split("/").filter(Boolean);if(e.host===Dr)return $n(t[0],t[1]);if(e.host===Lr)return t[0]==="gh"?$n(t[1],(n=t[2])==null?void 0:n.split("@")[0]):null;if(e.host.endsWith(Jo)){let i=e.host.slice(0,-Jo.length);return i.includes(".")?null:$n(i,t.length>1?t[0]:e.host)}return null}function $n(e,t){return e&&t?`${e}/${t}`:null}var Br={extension:"spicetify-extensions",theme:"spicetify-themes"},Or="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",Ur="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",Kr="https://api.github.com/repos",jr=5e3,$r=20,Xo="syncify:repo-topics",Zo=10080*60*1e3,Hr=200;function Qe(e){return(e==null?void 0:e.kind)==="host"||(e==null?void 0:e.kind)==="repo"||(e==null?void 0:e.kind)==="blocked"||(e==null?void 0:e.kind)==="catalog"}function Qo(e){let t=new Map;for(let n of e){if(n.change==="removed")continue;if(n.custom){t.set(n.key,{kind:"custom"});continue}let i=Rr(n);i&&t.set(n.key,i)}return t}async function es(e,t){let n=new Map,i=e.filter(a=>a.change!=="removed"&&a.isNew&&!t.has(a.key));if(i.length===0)return n;let o=i.filter(a=>a.type==="snippet"),s=i.filter(a=>a.type!=="snippet");if(o.length>0){let a=await zr();for(let u of o)a?a.has(ts(u.name))||n.set(u.key,{kind:"catalog"}):n.set(u.key,{kind:"unchecked"})}if(s.length>0){let a=await Yr(),u=Gr(),c=0;await Promise.all(s.map(async y=>{let f=Fr(y),h=Br[y.type];if(!f||!h)return;if(a===null){n.set(y.key,{kind:"unchecked"});return}if(Wr(f,a)){n.set(y.key,{kind:"blocked"});return}let d=Vr(u,f);d===void 0&&c<$r&&(c+=1,d=await qr(f),d!==void 0&&(u[f.toLowerCase()]={topics:d,at:Date.now()})),d===void 0?n.set(y.key,{kind:"unchecked"}):(d===null||!d.includes(h))&&n.set(y.key,{kind:"catalog"})})),Jr(u)}return n}function Rr(e){let t=null;for(let n of e.sources){let i;try{i=new URL(n)}catch(s){return{kind:"host",host:n.slice(0,40)}}let o=Hn(i);if(!o)return{kind:"host",host:i.host};e.repo&&o.toLowerCase()!==e.repo.toLowerCase()&&(t!=null||(t=o))}return t?{kind:"repo",repo:t}:null}function Fr(e){for(let t of e.sources)try{let n=Hn(new URL(t));if(n)return n}catch(n){}return e.repo}function Wr(e,t){let n=`https://github.com/${e}`.toLowerCase();return t.some(i=>{let o=i.toLowerCase();if(!o.includes("*"))return o===n;let s=o.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${s}$`).test(n)})}function ts(e){return e.replace(/\n/g,"").trim().toLowerCase()}var Xe=null,Ze=null;function Yr(){return Xe!=null||(Xe=ns(Or).then(e=>{let t=e==null?void 0:e.repos;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&!n.startsWith("//")):(Xe=null,null)})),Xe}function zr(){return Ze!=null||(Ze=ns(Ur).then(e=>Array.isArray(e)?new Set(e.flatMap(t=>typeof(t==null?void 0:t.title)=="string"?[ts(t.title)]:[])):(Ze=null,null))),Ze}async function qr(e){let t=await is(`${Kr}/${e}`);if((t==null?void 0:t.status)===404)return null;if(!(t!=null&&t.ok))return;let n=await t.json().catch(()=>null);return Array.isArray(n==null?void 0:n.topics)?n.topics.filter(i=>typeof i=="string"):void 0}async function ns(e){let t=await is(e);return t!=null&&t.ok?t.json().catch(()=>null):null}async function is(e){let t=typeof AbortController=="function"?new AbortController:null,n=setTimeout(()=>t==null?void 0:t.abort(),jr);try{return await fetch(e,{signal:t==null?void 0:t.signal})}catch(i){return null}finally{clearTimeout(n)}}function Vr(e,t){let n=e[t.toLowerCase()];return n&&Date.now()-n.at<Zo?n.topics:void 0}function Gr(){var e;try{let t=JSON.parse((e=localStorage.getItem(Xo))!=null?e:"{}");return t&&typeof t=="object"?t:{}}catch(t){return{}}}function Jr(e){let t=Date.now(),n=Object.entries(e).filter(([,i])=>t-i.at<Zo).sort(([,i],[,o])=>o.at-i.at).slice(0,Hr);try{localStorage.setItem(Xo,JSON.stringify(Object.fromEntries(n)))}catch(i){}}function Rn(e){return`A new install${e.device?` on ${e.device}`:""} wants to back up this Spotify account.`}function os(e){let t=Spicetify.React,n=t.useState,{install:i}=e,[o,s]=n(!1),[a,u]=n(null);async function c(y){s(!0),u(null);try{await Ot(K(),i.id,y),Spicetify.showNotification(y==="approve"?"Syncify: install approved":"Syncify: install refused"),e.onDone(y)}catch(f){u(f instanceof Error?f.message:String(f)),s(!1)}}return t.createElement(t.Fragment,null,t.createElement("p",{className:"syncify-claim-notice"},Rn(i)," Approve it if it's yours."),a?t.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},a):null,t.createElement("div",{className:"syncify-actions"},t.createElement("button",{className:"syncify-text-button",type:"button",onClick:e.onClose,disabled:o},"Close"),t.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{c("reject")},disabled:o},"Not mine"),t.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{c("approve")},disabled:o},"Approve")))}var Xr="syncify:beta",ss=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function as(){var e;return(e=window.SyncifyLoader)!=null?e:null}function Zr(){try{return window.localStorage.getItem(Xr)==="true"}catch(e){return!1}}async function rs(e){let t=Zr()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(t.map(i=>Qr(`${e}/${i}`)))).reduce((i,o)=>o&&(!i||Wn(o,i)>0)?o:i,null)}function Fn(e){return typeof e=="string"&&ss.test(e)}function Wn(e,t){let[n,i]=[e,t].map(o=>{var y;let[,s,a,u,c]=(y=ss.exec(o))!=null?y:[];return[s,a,u,c!=null?c:1/0].map(Number)});for(let o=0;o<n.length;o+=1)if(n[o]!==i[o])return n[o]<i[o]?-1:1;return 0}async function Qr(e,t=3e3){let n=typeof AbortController=="function"?new AbortController:null,i=setTimeout(()=>n==null?void 0:n.abort(),t);try{let o=await fetch(e,{signal:n==null?void 0:n.signal});if(!o.ok)return null;let s=await o.json();return Fn(s==null?void 0:s.version)?s.version:null}catch(o){return null}finally{clearTimeout(i)}}function ds(){var wi,xi,vi,Ci,Ii,Ei,Ni;let e=Spicetify.React,t=e.useEffect,n=e.useMemo,i=e.useState,o=e.useRef,[s,a]=i(()=>K()),[u,c]=i("idle"),[y,f]=i(null),[h,d]=i(0),[b,C]=i([]),[S,w]=i([]),[I,ne]=i(null),[$,me]=i(null),[T,nt]=i(null),[L,it]=i(null),[ie,Pe]=i([]),[p,k]=i(null),[oe,se]=i([]),[P,Ae]=i(null),[ge,Me]=i(!1),[Wt,Vn]=i(()=>new Set),[x,F]=i(null),[ot,Yt]=i(!1),[zt,G]=i(!1),[Gn,st]=i(!1),[De,Jn]=i(null),[J,he]=i(!1),[qt,Se]=i(null),[Xn,Zn]=i(null),[at,Ss]=i(!1),[A,ks]=i(()=>Ho()),[bs,Qn]=i(!1),[ae,ws]=i(!1),[ei,xs]=i(null),[ti,rt]=i(void 0),[B,vs]=i(null),[Le,Cs]=i(null),[re,ni]=i(null),[Is,ii]=i(!1),[Es,Vt]=i(null),[Ns,oi]=i(!1),[U,Gt]=i(null),[D,Jt]=i(null),si=o(null),W=n(()=>M(),[]),ke=n(()=>p?[...ie,p]:ie,[ie,p]),Xt=U?[]:oe,Zt=U?(wi=D==null?void 0:D.backups)!=null?wi:[]:ie,ai=U?(xi=D==null?void 0:D.safetyCopy)!=null?xi:null:p,ri=n(()=>{var r;return new Map([...ke,...oe,...(r=D==null?void 0:D.backups)!=null?r:[],...D!=null&&D.safetyCopy?[D.safetyCopy]:[]].map(l=>[l,V(l.marketplace_data.keys)]))},[ke,oe,D]),ct=r=>{var l;return(l=ri.get(r))!=null?l:V(r.marketplace_data.keys)},_s=r=>ct(r).map(l=>l.key),Ts=r=>ct(r).length,O=n(()=>zt&&x?Tn(ct(x),x.spicetify_config,S,I):null,[zt,x,ri,S,I]),X=n(()=>O?Qo(O.items):null,[O]),lt=n(()=>new Map([...De!=null?De:[],...X!=null?X:[]]),[De,X]),ut=((vi=x==null?void 0:x.backup)==null?void 0:vi.kind)==="quarantined",ci=n(()=>{var r;return new Set(((r=O==null?void 0:O.items)!=null?r:[]).filter(l=>{var g;return l.change!=="removed"&&l.isNew&&(ut||Qe(lt.get(l.key))||((g=lt.get(l.key))==null?void 0:g.kind)==="unchecked")}).map(l=>l.key))},[O,lt,ut]),Ps=[...ci].filter(r=>!Wt.has(r)),li=O!==null&&De===null,Qt=n(()=>yo(),[]),ui=n(()=>as()!==null,[]),Y=u==="loading",yt=(y==null?void 0:y.kind)==="warning"||(y==null?void 0:y.kind)==="error"?y:null,yi=!!(L&&T&&L.payload_hash!==T),Be=!!(L&&T&&L.payload_hash===T),fi=!!(x&&T&&x.payload_hash===T),ft=U!==null||at||!Be||ke.length<2,As=ft?Zt:Zt.slice(0,1),dt=(Le==null?void 0:Le.status)==="pending"&&!Le.mine?Le:null,di=sc(re,B,dt!==null),pt=(Ci=P==null?void 0:P.waiting[0])!=null?Ci:null,pi=!P||P.trusted||B||di.kind==="secured"?null:P.refused?"This Spotify account refused backups from this install. Sign in to back up from it.":"This install isn't approved yet. Its backups are kept apart until you approve it from another install or sign in.",en=(ti?((Ii=re==null?void 0:re.accounts)!=null?Ii:[]).filter(r=>r.status==="final"):[]).map((r,l)=>({hash:r.hash,label:`Spotify account ${l+1}${r.device_info?` \xB7 from ${r.device_info}`:""}`})).filter(r=>r.hash!==(re==null?void 0:re.hash)),Ms=!!(T&&h>0&&!ke.some(r=>r.payload_hash===T));t(()=>(R().catch(()=>null).then(r=>rt(l=>l!=null?l:r)),H({silent:!0}),Us(),Ro(ks)),[]),t(()=>{if(Jn(null),!O||!X)return;[...X.values()].some(Qe)&&st(!0);let r=!0;return es(O.items,X).then(l=>{r&&(Jn(l),[...l.values()].some(Qe)&&st(!0))}),()=>{r=!1}},[O,X]),t(()=>{if(!J)return;let r=l=>{var E;if(!((E=si.current)!=null&&E.isConnected)){he(!1),Se(null);return}l.preventDefault(),l.stopImmediatePropagation();let g=ro(l);if(g.kind!=="ignore"){if(g.kind==="cancel"){he(!1),Se(null);return}if(g.kind==="error"){Se(g.message);return}if(co(g.shortcut)){Se(`${Fe(g.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}he(!1),tn(g.shortcut)}};return window.addEventListener("keydown",r,!0),()=>window.removeEventListener("keydown",r,!0)},[J,s]);async function mi(){let r=await Lt();return nt(r.hash),d(r.installedItemCount),C(r.installedItems),w(r.items),ne(r.spicetifyConfig),me(r.marketplaceAvailable),r}async function H(r){try{G(!1),c("loading"),r!=null&&r.silent||f({kind:"info",text:"Checking your Syncify backup\u2026"}),await mi();let l,g=null;try{l=await _e(s)}catch(an){if(!(an instanceof z))throw an;l=hc,g=an.code}let E=await R().catch(()=>null),le=E?await Do(s).catch(()=>null):null,be=E?await R().catch(()=>null):null;rt(be),ni(be?le:null),vs(g),g&&Zn("account"),Cs(l.claim),Gt(null),Jt(null),it(l.payload),Pe(l.backups),k(l.safetyCopy),se(l.unapproved),Ae(l.install),F(l.payload),Yt(!0),c(l.exists?"success":"idle"),!(r!=null&&r.silent)&&!g&&f(l.exists&&l.payload?{kind:"success",text:`Backup found from ${Te(l.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(l){Oe(l)}}async function gi(){ii(!0),Vt(null);try{await Lo(s)}catch(r){r instanceof ee&&["claim_pending","claimed"].includes(r.code)||Vt(r instanceof Error?r.message:String(r))}finally{await H({silent:!0}),ii(!1)}}function Ds(r){rt(r),!B&&L?gi():H({silent:!0})}function Ls(){rt(null),ni(null),Vt(null),H({silent:!0})}async function Bs(){oi(!0);try{await Ut(s),Spicetify.showNotification("Syncify: claim sent for review"),await H({silent:!0})}catch(r){f({kind:"error",text:r instanceof Error?r.message:String(r)})}finally{oi(!1)}}async function Os(r){if(G(!1),Gt(r),Jt(null),!r){F(L);return}F(null);try{let l=await _e(s,r);Jt(l),F(l.payload)}catch(l){Gt(null),F(L),Oe(l)}}async function Us(){let r=W.version;if(!Fn(r))return;let l=await rs(W.releasesUrl);l&&Wn(l,r)>0&&xs(l)}function Ks(r){let l=v(m({},s),{autoBackupEnabled:r});a(l),Tt(l),f({kind:"success",text:r?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}function tn(r){let l=v(m({},s),{shortcut:r});a(l),Tt(l),vn(r),Se(null),f({kind:"success",text:r?`${Fe(r)} now opens Syncify.`:"Keyboard shortcut turned off."})}function js(r){let l=v(m({},s),{entryPoint:r});a(l),Tt(l),Et(r)}function hi(r){Zn(r),r!=="settings"&&he(!1)}function $s(){Se(null),he(!0)}async function Hs(){try{G(!1),c("loading"),f({kind:"info",text:"Backing up your extensions and themes\u2026"});let{payload:r,unchanged:l,unapproved:g}=await Bt(s);if(await mi(),g){await H({silent:!0}),f({kind:"warning",text:"Backed up, but kept apart until this install is approved."}),Spicetify.showNotification("Syncify: backed up, waiting for approval");return}if(l){Yt(!0),c("success"),f({kind:"success",text:"Everything is already backed up."}),Spicetify.showNotification("Syncify: everything is already backed up");return}it(r),Pe(E=>[r,...E.filter(le=>le.payload_hash!==r.payload_hash)].slice(0,gc)),k(E=>(E==null?void 0:E.payload_hash)===r.payload_hash?null:E),F(r),Yt(!0),c("success"),f({kind:"success",text:`Backed up ${r.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(r){Oe(r)}}async function Si(r){if(pt){Me(!0);try{await Ot(s,pt.id,r),Spicetify.showNotification(r==="approve"?"Syncify: install approved":"Syncify: install refused"),await H({silent:!0})}catch(l){Oe(l)}finally{Me(!1)}}}function Rs(r=x){if($===!1){let l="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";f({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3);return}if(!r){let l="No Syncify cloud backup was found for this Spotify account.";f({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3);return}F(r),st(!1),Vn(new Set),G(!0)}async function Fs(){let r=x?Tn(ct(x),x.spicetify_config,S,I).manual:[];try{G(!1),c("loading"),f({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:l,restoredCount:g}=await Mo(s,x!=null?x:void 0,U!=null?U:void 0,Ps);F(l),c("success"),f({kind:"success",text:`Restored ${g} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),jn(r),setTimeout(()=>window.location.reload(),1e3)}catch(l){Oe(l)}}async function Ws(r){var l;try{await navigator.clipboard.writeText(r)}catch(g){let E=(l=Spicetify.Platform)==null?void 0:l.ClipboardAPI;if(!(E!=null&&E.copy))return;await E.copy(r)}Qn(!0),setTimeout(()=>Qn(!1),2e3)}function ce(r){if(r.startsWith("mailto:")){window.location.href=r;return}window.open(r,"_blank","noopener,noreferrer")}function Oe(r){if(c("error"),r instanceof He){ws(!0),f(null);return}if(r instanceof de){f({kind:"error",text:r.message}),H({silent:!0});return}if(r instanceof z&&r.code!=="not_linked"){f(null),H({silent:!0});return}let l=r instanceof Error?r.message:String(r);f({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3)}function nn(r,l){let g=(x==null?void 0:x.payload_hash)===r.payload_hash,E=r.payload_hash===T,le=Te(r.metadata.last_sync_datetime),be=fs(Ts(r));return e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":g,"data-selected":g?"true":"false",type:"button",key:`${r.payload_hash}-${r.metadata.last_sync_datetime}`,title:l!=null&&l.isSafetyCopy?"Kept aside and updated about once a week, so a burst of new backups can't replace it":l!=null&&l.isUnapproved?"From an install this Spotify account hasn't approved":void 0,onClick:()=>{F(r),G(!1)},disabled:Y},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),l!=null&&l.isSafetyCopy?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Safety copy"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 updated weekly")),e.createElement("span",{className:"syncify-muted"},le," \xB7 ",be)):l!=null&&l.isUnapproved?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Not approved"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 ",le)),e.createElement("span",{className:"syncify-muted"},be," \xB7 from ",r.metadata.device_info)):e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-backup-date"},le),e.createElement("span",{className:"syncify-muted"},be," \xB7 from ",r.metadata.device_info)),E?e.createElement("span",{className:"syncify-tag",title:"What's on this device now"},"Current"):null,l!=null&&l.isSafetyCopy?e.createElement(yc,null):null,l!=null&&l.isUnapproved?e.createElement(zn,null):null)}function on(r){r.stopPropagation()}let Ys=ae?"Update Syncify to keep backing up":B?"Sign in to restore":ot?L?yi?"Changes since your last backup":"Everything is backed up":"No backup yet":u==="error"?"Couldn't check your backup":"Checking your backup\u2026",ki=ae?"Your backups are safe":B?B==="not_owner"?"Secured by another account":"This backup is secured":ot?L?yi?kc(L,_s(L),b,I):`Last backup ${Te(L.metadata.last_sync_datetime)}`:"Save your extensions and themes so you can restore them after a reinstall or on another computer.":null,bi=!!(A&&!ae&&Date.now()-A.at<mc),mt=!!(A&&A.loaded===A.total),sn=qo((Ei=A==null?void 0:A.manual)!=null?Ei:[]);return e.createElement("div",{className:"syncify-panel",ref:si,onClick:on,onMouseDown:on,onPointerDown:on},ae?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,"This version of Syncify is no longer supported."),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ce(`${W.githubUrl}#updating`)},"How to update")):null,dt?e.createElement("div",{className:"syncify-alert",role:"alert"},e.createElement("span",null,(Ni=dt.email)!=null?Ni:"Someone"," is claiming this backup.",dt.held?" Syncify is reviewing it.":null),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Bs()},disabled:Ns},"Not me")):null,pt?e.createElement("div",{className:"syncify-alert",role:"alert"},e.createElement("span",null,Rn(pt)),e.createElement("span",{className:"syncify-alert-actions"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Si("reject")},disabled:ge},"Not mine"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Si("approve")},disabled:ge},"Approve"))):null,pi?e.createElement("div",{className:"syncify-alert",role:"status"},e.createElement("span",null,pi)):null,sn.length>0?e.createElement("div",{className:"syncify-alert syncify-manual",role:"status"},e.createElement("span",{className:"syncify-manual-header"},e.createElement("span",null,A.manual.length===1?"1 isn't from Marketplace. Add it in a terminal:":`${A.manual.length} aren't from Marketplace. Add them in a terminal:`),e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:Fo},e.createElement(ys,null))),e.createElement("span",{className:"syncify-code"},e.createElement("code",null,sn.join(`
`)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Ws(sn.join(`
`))}},bs?"Copied":"Copy"))):null,yt?e.createElement("div",{className:"syncify-alert","data-kind":yt.kind},e.createElement("span",null,yt.text),e.createElement("span",{className:"syncify-alert-actions"},yt.kind==="error"?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{H()},disabled:Y},"Try again"):null,e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>f(null)},e.createElement(ys,null)))):null,e.createElement("section",{className:"syncify-status","aria-live":"polite"},bi&&A?e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},mt?"Backup restored":`Restored ${A.loaded} of ${A.total}`),e.createElement("p",{className:"syncify-muted"},mt?A.total===0?"Nothing from Marketplace to load":`${A.loaded} of ${A.total} loaded`:"Missing something? Reload Spotify once more."),mt?e.createElement("p",{className:"syncify-muted"},"Syncify saved your setup?"," ",e.createElement("button",{className:"syncify-text-button syncify-inline-button",type:"button",onClick:()=>ce(W.kofiUrl)},"Support it on Ko-fi")):null):e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},Ys),e.createElement("p",{className:"syncify-muted"},ki?`${ki} \xB7 `:"",fs(h)," on this device")),bi&&!mt?e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:Wo},"Reload"):e.createElement("button",{className:"syncify-button",type:"button",onClick:Hs,disabled:Y||Be||ae||B!==null,title:B?"Sign in to back up":Be?"No changes since your last backup":void 0},Y?"Working\u2026":Be?"Backed up":"Back up now")),!ot||B||ie.length>0||oe.length>0||en.length>0?e.createElement("section",{className:"syncify-section","aria-label":"Backups"},e.createElement("div",{className:"syncify-section-header"},e.createElement("h4",{className:"syncify-section-title"},"Backups"),e.createElement("span",{className:"syncify-section-controls"},!U&&Be&&ke.length>1?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":at,"aria-controls":"syncify-backup-list",onClick:()=>{Ss(!at),G(!1)}},at?"Show less":`Show all ${ke.length}`,e.createElement(et,null)):null,!B&&en.length>0?e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select","aria-label":"Show backups from",value:U!=null?U:"",onChange:r=>{Os(r.currentTarget.value||null)},disabled:Y},e.createElement("option",{value:""},"This Spotify account"),en.map(r=>e.createElement("option",{key:r.hash,value:r.hash},r.label))),e.createElement(et,null)):null)),ot?B?e.createElement("p",{className:"syncify-locked"},e.createElement(fc,null),e.createElement("span",null,B==="not_owner"?"Sign in with the account that secured them":"Sign in to see and restore your backups")):U&&!D?e.createElement("p",{className:"syncify-muted"},"Loading backups\u2026"):Zt.length===0&&Xt.length===0?e.createElement("p",{className:"syncify-muted"},"No backups yet."):e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-list",id:"syncify-backup-list",role:"radiogroup","aria-label":"Choose a backup to restore"},As.map(r=>nn(r)),ft&&ai?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),nn(ai,{isSafetyCopy:!0})):null,ft&&Xt.length>0?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),Xt.map(r=>nn(r,{isUnapproved:!0}))):null),ft?$===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to restore a backup."):zt?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},"Restore"," ",x?Te(x.metadata.last_sync_datetime):"this backup","?"),ut?e.createElement("div",{className:"syncify-alert"},"An install this Spotify account hasn't approved made this backup. Its items stay off unless you turn them on."):null,O?e.createElement(nc,{preview:O,checks:lt,off:ci,allowed:Wt,unapproved:ut,onAllow:(r,l)=>{let g=new Set(Wt);l?g.add(r):g.delete(r),Vn(g)},expanded:Gn,onToggle:()=>st(!Gn)}):null,e.createElement("div",{className:"syncify-actions"},Ms?e.createElement("div",{className:"syncify-alert syncify-actions-hint"},"Your current setup isn't backed up."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>G(!1),disabled:Y},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:Fs,disabled:Y||li},li?"Checking\u2026":"Restore"))):e.createElement("div",{className:"syncify-actions"},fi?e.createElement("span",{className:"syncify-muted syncify-actions-hint"},"This backup is already current."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>Rs(),disabled:Y||!x||fi},"Restore backup")):null):e.createElement("div",{className:"syncify-backup-skeleton","aria-hidden":"true"},e.createElement("span",{className:"syncify-radio"}),e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-skeleton-line"}),e.createElement("span",{className:"syncify-skeleton-line wide"})))):null,e.createElement("div",{className:"syncify-accordion"},e.createElement(us,{id:"account",title:"Account",openSection:Xn,onToggle:hi},e.createElement(ac,{session:ti,locked:B,secure:di,securing:Is,secureError:Es,onSecure:()=>{gi()},onSignedIn:Ds,onSignedOut:Ls,onOpenWebsite:ce})),e.createElement(us,{id:"settings",title:"Settings",openSection:Xn,onToggle:hi},e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Back up automatically"),e.createElement("span",{className:"syncify-muted"},"When Spotify starts and something has changed")),e.createElement("input",{className:"syncify-switch",type:"checkbox",role:"switch",checked:s.autoBackupEnabled&&!ae,onChange:r=>Ks(r.currentTarget.checked),disabled:Y||ae})),e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Open Syncify from"),Qt?s.entryPoint==="menu"&&!s.shortcut?e.createElement("span",{className:"syncify-muted"},"Keep a shortcut in case a Spotify update breaks the menu"):null:e.createElement("span",{className:"syncify-muted"},"The profile menu isn't available in this Spicetify version")),e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select",value:Qt?s.entryPoint:"topbar",onChange:r=>js(r.currentTarget.value),disabled:!Qt},Sc.map(r=>e.createElement("option",{key:r.value,value:r.value},r.label))),e.createElement(et,null))),e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Keyboard shortcut"),J&&!qt?e.createElement("span",{className:"syncify-muted"},"Press a key combination, or Esc to cancel"):null),e.createElement("span",{className:"syncify-shortcut"},s.shortcut&&!J?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>tn(null)},"Turn off"):null,!s.shortcut&&!J?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>tn(Ee)},"Use default"):null,e.createElement("button",{className:"syncify-key",type:"button","data-recording":J?"true":"false",onClick:()=>J?he(!1):$s(),title:"Click to change"},J?"Press keys\u2026":s.shortcut?Fe(s.shortcut):"Off"))),qt?e.createElement("div",{className:"syncify-alert",role:"alert"},qt):null)),e.createElement("footer",{className:"syncify-footer"},e.createElement("span",{className:"syncify-footer-version"},e.createElement("span",null,"Syncify ",W.version),ei?e.createElement("button",{className:"syncify-text-button syncify-update",type:"button",onClick:()=>ui?window.location.reload():ce(`${W.githubUrl}#updating`)},ei," is out \xB7 ",ui?"Reload":"How to update"):null),e.createElement("span",{className:"syncify-footer-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ce(W.issueUrl)},"Report an issue"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ce(W.githubUrl)},"GitHub"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ce(W.kofiUrl)},"Support on Ko-fi"))))}var cs={added:{mark:"+",label:"Added"},removed:{mark:"\u2212",label:"Removed"},unchanged:{mark:"=",label:"Unchanged"}},ec=[["extension","Extensions"],["theme","Themes"],["snippet","Snippets"]],tc={extension:"extension",custom_app:"custom app",theme:"theme"};function nc(e){let t=Spicetify.React,{items:n,counts:i,manual:o}=e.preview,s=[...e.off].filter(a=>!e.allowed.has(a)).length;return t.createElement(t.Fragment,null,t.createElement("div",{className:"syncify-chips","aria-label":"What changes on this device"},i.added?t.createElement("span",{className:"syncify-chip","data-change":"added"},"+",i.added," added"):null,i.removed?t.createElement("span",{className:"syncify-chip","data-change":"removed"},"\u2212",i.removed," removed"):null,i.unchanged?t.createElement("span",{className:"syncify-chip"},i.unchanged," unchanged"):null,o.length?t.createElement("span",{className:"syncify-chip"},o.length," to add manually"):null,s?t.createElement("span",{className:"syncify-chip","data-change":"off"},s," off"):null),n.length||o.length?t.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":e.expanded,"aria-controls":"syncify-restore-changes",onClick:e.onToggle},e.expanded?"Hide changes":"Show changes",t.createElement(et,null)):null,e.expanded?t.createElement("div",{className:"syncify-changes",id:"syncify-restore-changes"},ec.map(([a,u])=>{let c=n.filter(y=>y.type===a);return c.length===0?null:t.createElement("section",{key:a,"aria-label":u},t.createElement("h5",{className:"syncify-change-group"},u),t.createElement("ul",{className:"syncify-change-list"},c.map(y=>t.createElement("li",{className:"syncify-change",key:y.key},t.createElement("span",{className:"syncify-mark","data-change":y.change,role:"img","aria-label":cs[y.change].label},cs[y.change].mark),t.createElement("span",{className:"syncify-change-name"},y.name,y.repo?t.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",y.repo):null),e.checks.has(y.key)?t.createElement(oc,{check:e.checks.get(y.key)}):e.unapproved&&e.off.has(y.key)?t.createElement("span",{className:"syncify-source","data-warning":"true"},t.createElement(zn,null),"Not approved"):null,e.off.has(y.key)?t.createElement("label",{className:"syncify-item-switch"},t.createElement("input",{type:"checkbox",checked:e.allowed.has(y.key),onChange:f=>e.onAllow(y.key,f.currentTarget.checked)}),"Restore"):null))))}),o.length?t.createElement("section",{"aria-label":"Add manually"},t.createElement("h5",{className:"syncify-change-group"},"Add manually"),t.createElement("ul",{className:"syncify-change-list"},o.map(a=>t.createElement("li",{className:"syncify-change",key:`${a.type}:${a.name}`},t.createElement("span",{className:"syncify-mark","aria-hidden":"true"}),t.createElement("span",{className:"syncify-change-name"},a.name,t.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",tc[a.type],a.scheme?`, ${a.scheme}`:"")))))):null):null)}var ic={host:"Loads from outside GitHub",repo:"Its code is in a different repo than the one it names",blocked:"On Marketplace's block list",catalog:"Not in Marketplace's catalog",unchecked:"GitHub couldn't be reached to check it",custom:"A snippet made in Marketplace, not from its list"};function oc(e){let t=Spicetify.React,{check:n}=e,i=Qe(n),o=n.kind==="host"?`Code from ${n.host}`:n.kind==="repo"?`Code from ${n.repo}`:n.kind==="blocked"?"Blocked by Marketplace":n.kind==="catalog"?"Not in Marketplace":n.kind==="unchecked"?"Not checked":"Custom";return t.createElement("span",{className:"syncify-source","data-warning":i?"true":"false",title:ic[n.kind]},i?t.createElement(zn,null):null,o)}function sc(e,t,n){var a,u;if(t==="not_owner")return{kind:"other-account"};if(!e)return n?{kind:"other-claim"}:{kind:"unknown"};let{claim:i}=e;if((i==null?void 0:i.status)==="final"){if(!i.mine)return{kind:"other-account"};let c=((a=e.accounts)!=null?a:[]).filter(y=>y.status==="final").length;return{kind:"secured",linkedCount:Math.max(c,1)}}if((i==null?void 0:i.status)==="pending")return i.mine?{kind:"pending",finalAt:i.final_at,held:i.held}:{kind:"other-claim"};let o=((u=e.accounts)!=null?u:[]).filter(c=>c.hash===e.hash),s=o[o.length-1];return(s==null?void 0:s.status)==="cancelled"&&s.cancelled_by==="owner"?{kind:"cancelled"}:{kind:"open"}}function ac(e){let t=Spicetify.React,n=t.useEffect,i=t.useState,{session:o,secure:s}=e,[a,u]=i(()=>xt()),[c,y]=i(()=>xt().email),[f,h]=i(""),[d,b]=i(!1),[C,S]=i(null),[w,I]=i(()=>Date.now()),ne=!!(a.codeSentAt&&w-a.codeSentAt<rc),$=Math.max(0,Math.ceil((a.retryAt-w)/1e3)),me=a.retryEmail===null||a.retryEmail===c.trim().toLowerCase()?$:0;n(()=>{if(!o)return;let p=!0;return zi().then(k=>{!p||k||(S({kind:"warning",text:$e(new N("signed_out"))}),e.onSignedOut())}).catch(()=>{}),()=>{p=!1}},[o==null?void 0:o.token]),n(()=>{if(a.retryAt<=Date.now())return;let p=setInterval(()=>{I(Date.now()),a.retryAt<=Date.now()&&clearInterval(p)},1e3);return()=>clearInterval(p)},[a.retryAt]);function T(p){let k=m(m({},xt()),p);$i(k),u(k),I(Date.now())}async function nt(p){var oe;let k=p.trim();if(!lc.test(k)){S({kind:"error",text:"Enter a valid email address."});return}b(!0),S(null);try{let se=await Wi(k);T({email:k,codeSentAt:Date.now(),retryAt:Date.now()+se*1e3,retryEmail:k.toLowerCase()}),h("")}catch(se){let P=se instanceof N?se:null,Ae=(oe=P==null?void 0:P.retryAfter)!=null?oe:null,ge=Ae&&Ae<=cc?Date.now()+Ae*1e3:0,Me=(P==null?void 0:P.code)==="too_many_requests"?null:k.toLowerCase();if((P==null?void 0:P.code)==="resend_wait"){T({email:k,codeSentAt:a.email===k&&a.codeSentAt?a.codeSentAt:Date.now(),retryAt:ge,retryEmail:Me});return}ge&&T({retryAt:ge,retryEmail:Me}),S({kind:"error",text:$e(se)})}finally{b(!1)}}async function L(){b(!0),S(null);try{let p=await Yi(a.email,f);T({codeSentAt:null}),h(""),e.onSignedIn(p)}catch(p){S({kind:"error",text:$e(p)});let k=p instanceof N?p.code:null;(k==="too_many_attempts"||k==="code_expired")&&h("")}finally{b(!1)}}async function it(){var k;let p=(k=o==null?void 0:o.email)!=null?k:"";b(!0),S(null),await qi(),T({email:p,codeSentAt:null}),y(p),b(!1),e.onSignedOut()}async function ie(){b(!0),S(null);try{e.onOpenWebsite(await Vi())}catch(p){let k=p instanceof N&&p.code==="signed_out";S({kind:k?"warning":"error",text:$e(p)}),k&&e.onSignedOut()}finally{b(!1)}}let Pe=C?t.createElement("div",{className:"syncify-alert","data-kind":C.kind==="error"?"error":void 0,role:"alert"},C.text):null;if(o===void 0)return null;if(o){let p=s.kind==="open"||s.kind==="other-claim"||s.kind==="cancelled";return t.createElement(t.Fragment,null,t.createElement("div",{className:"syncify-setting"},t.createElement("span",{className:"syncify-setting-text"},t.createElement("span",{className:"syncify-account-email"},o.email),s.kind==="secured"?t.createElement("span",{className:"syncify-muted"},"Backup secured \xB7"," ",s.linkedCount===1?"1 Spotify account linked":`${s.linkedCount} Spotify accounts linked`):s.kind==="pending"?t.createElement("span",{className:"syncify-muted syncify-account-state"},t.createElement(dc,null),t.createElement("span",null,"Securing this backup \xB7"," ",s.held?"in review":`final ${Yn(s.finalAt)}`)):s.kind==="other-account"?t.createElement("span",{className:"syncify-muted"},"This backup is secured by another account"):t.createElement("span",{className:"syncify-muted"},"Signed in")),t.createElement("span",{className:"syncify-account-actions"},t.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-label":"Manage on the website",onClick:()=>{ie()},disabled:d},"Manage",t.createElement(pc,null)),t.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{it()},disabled:d},"Sign out"))),p?t.createElement("div",{className:"syncify-setting"},t.createElement("span",{className:"syncify-setting-text"},t.createElement("span",null,"Secure your backup"),t.createElement("span",{className:"syncify-muted"},"So only you can restore it")),t.createElement("button",{className:"syncify-button",type:"button",onClick:e.onSecure,disabled:d||e.securing||s.kind==="other-claim"},e.securing?"Securing\u2026":s.kind==="cancelled"?"Secure again":"Secure")):null,s.kind==="other-claim"?t.createElement("div",{className:"syncify-alert",role:"status"},"Another claim is pending. If it isn't yours, press Not me above and Syncify will review it."):s.kind==="cancelled"?t.createElement("div",{className:"syncify-alert",role:"status"},"Your claim was cancelled from this Spotify account."):null,e.secureError?t.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.secureError):null,Pe)}return t.createElement(t.Fragment,null,t.createElement("div",{className:"syncify-setting"},e.locked?t.createElement("span",{className:"syncify-setting-text"},t.createElement("span",null,"Sign in to restore"),t.createElement("span",{className:"syncify-muted"},"With the email that secured this backup")):t.createElement("span",{className:"syncify-setting-text"},t.createElement("span",null,"Secure your backup"),t.createElement("span",{className:"syncify-muted"},"So only you can restore it"))),t.createElement("form",{className:"syncify-confirm",noValidate:!0,onSubmit:p=>{p.preventDefault(),!d&&(ne?f.length===$t&&L():me||nt(c))}},ne?t.createElement(t.Fragment,null,t.createElement("p",{className:"syncify-muted"},"Code sent to ",uc(a.email)),t.createElement("div",{className:"syncify-field"},t.createElement("input",{className:"syncify-input syncify-code-input",type:"text",inputMode:"numeric",autoComplete:"one-time-code","aria-label":"6-digit code",placeholder:"123456",maxLength:$t,value:f,onChange:p=>h(p.currentTarget.value.replace(/\D/g,"").slice(0,$t)),autoFocus:!0}),t.createElement("button",{className:"syncify-button",type:"submit",disabled:d||f.length!==$t},d?"Verifying\u2026":"Verify")),t.createElement("p",{className:"syncify-muted syncify-account-links"},t.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{nt(a.email)},disabled:d||$>0},$>0?`Resend in ${ls($)}`:"Resend code"),t.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{T({codeSentAt:null}),h(""),S(null)},disabled:d},"Use another email"))):t.createElement(t.Fragment,null,t.createElement("div",{className:"syncify-field"},t.createElement("input",{className:"syncify-input",type:"email",autoComplete:"email","aria-label":"Email",placeholder:"you@example.com",value:c,onChange:p=>y(p.currentTarget.value),autoFocus:!0}),t.createElement("button",{className:"syncify-button",type:"submit",disabled:d||me>0||!c.trim()},d?"Sending\u2026":"Send code")),t.createElement("p",{className:"syncify-muted"},me>0?`Send another code in ${ls(me)}`:"We only email sign-in codes.")),Pe))}var $t=6,rc=600*1e3,cc=300,lc=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function uc(e){let t=e.lastIndexOf("@");return t<1?e:`${e[0]}***${e.slice(t)}`}function Yn(e){let t=Te(new Date(e).toISOString());return t.startsWith("today")?t:`on ${t}`}function ls(e){return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function us(e){let t=Spicetify.React,n=e.openSection===e.id,i=`syncify-section-${e.id}`;return t.createElement("section",{className:"syncify-accordion-section","aria-label":e.title},t.createElement("button",{className:"syncify-accordion-header",type:"button","aria-expanded":n,"aria-controls":i,onClick:()=>e.onToggle(n?null:e.id)},t.createElement("span",{className:"syncify-accordion-title"},e.title),t.createElement(et,null)),n?t.createElement("div",{className:"syncify-accordion-body",id:i},e.children):null)}function yc(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-shield",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"}))}function zn(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-warning-icon",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M12 3 2 21h20z"}),e.createElement("path",{d:"M12 10v5"}),e.createElement("path",{d:"M12 18h.01"}))}function et(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-chevron",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"m9 6 6 6-6 6"}))}function fc(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-lock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("rect",{x:"5",y:"11",width:"14",height:"10",rx:"2"}),e.createElement("path",{d:"M8 11V7a4 4 0 0 1 8 0v4"}))}function dc(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-clock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("circle",{cx:"12",cy:"12",r:"9"}),e.createElement("path",{d:"M12 7v5l3 2"}))}function pc(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-external",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M14 4h6v6"}),e.createElement("path",{d:"M20 4 10 14"}),e.createElement("path",{d:"M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"}))}function ys(){let e=Spicetify.React;return e.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M18 6 6 18"}),e.createElement("path",{d:"m6 6 12 12"}))}var mc=600*1e3,gc=3,hc={exists:!1,payload:null,backups:[],safetyCopy:null,claim:null,unapproved:[],install:null},Sc=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function kc(e,t,n,i){var C;let o=new Set(t),s=new Set(n),a=n.filter(S=>!o.has(S)).length,u=t.filter(S=>!s.has(S)).length,c=(C=e.spicetify_config)!=null?C:null,y=!!(i&&!c),f=!y&&(i&&c?!ho(i,c):i!==c),h=[a?`${a} added`:null,u?`${u} removed`:null,f?"Spicetify config changed":null].filter(Boolean),d=Te(e.metadata.last_sync_datetime),b=h.length?`${h.join(", ")} since ${d}`:`Last backup ${d}`;return y?`${b} \xB7 Spicetify config not saved yet`:b}function fs(e){return e===1?"1 extension or theme":`${e} extensions and themes`}function Te(e){let t=new Date(e);if(Number.isNaN(t.getTime()))return e;let n=t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),i=new Date,o=new Date(i);return o.setDate(i.getDate()-1),t.toDateString()===i.toDateString()?`today, ${n}`:t.toDateString()===o.toDateString()?`yesterday, ${n}`:`${t.toLocaleDateString(void 0,{month:"short",day:"numeric",year:t.getFullYear()===i.getFullYear()?void 0:"numeric"})}, ${n}`}function ps(e){var y;let t=Spicetify.React,n=t.useState,{claim:i}=e,[o,s]=n(!1),[a,u]=n(null);async function c(){s(!0),u(null);try{await Ut(K()),Spicetify.showNotification("Syncify: claim sent for review"),e.onClose()}catch(f){u(f instanceof Error?f.message:String(f)),s(!1)}}return t.createElement("div",{className:"syncify-panel"},t.createElement("p",{className:"syncify-claim-notice"},(y=i.email)!=null?y:"Someone"," is claiming this backup."," ",i.held?"Syncify is reviewing it.":`It goes through ${Yn(i.final_at)} unless you stop it.`),a?t.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},a):null,t.createElement("div",{className:"syncify-actions"},t.createElement("button",{className:"syncify-text-button",type:"button",onClick:e.onClose,disabled:o},"Close"),t.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{c()},disabled:o},"Not me")))}var Ht="[Syncify]";function j(e,t){if(t===void 0){console.debug(Ht,e);return}console.debug(Ht,e,t)}function tt(e,t){if(t===void 0){console.warn(Ht,e);return}console.warn(Ht,e,t)}function bc(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var gs="syncify-styles";function wc(){if(document.getElementById(gs)){j("Another copy of Syncify is running; stopping this one");return}xc();let e=K();fo({topbarButton:vc(),menuItem:Tc()}),Et(e.entryPoint),xn(e.shortcut,Ft),Oo({onClaim:Mc,onInstall:Dc}).catch(t=>{tt("Startup sync check failed",t)}),zo().catch(t=>{tt("Restore check failed",t)})}function xc(){let e=document.createElement("style");e.id=gs,e.textContent=Pi,document.head.appendChild(e)}function vc(){let{extensionName:e}=M(),t=new Spicetify.Topbar.Button(e,rn,n=>{j("Topbar button clicked",Rt(n)),Ft()},!1,!0);return hs(t),Ec(t),Ac(t),j("Topbar button registered",Rt(t)),t}function hs(e){var n;let t=e;e.element.style.setProperty("-webkit-app-region","no-drag"),(n=t.button)==null||n.style.setProperty("-webkit-app-region","no-drag")}var ms=".main-actionButtons",Cc=".Root__globalNav, .Root__top-bar",Ic=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function Ec(e){if(typeof MutationObserver=="undefined")return;let t=!1,n=null,i=()=>{t=!1,s();let a=e.element,u=document.querySelector(ms);!a||!u||u.contains(a)||(u.prepend(a),Nc(e),hs(e),j("Topbar button re-attached",Rt(e)))},o=new MutationObserver(()=>{t||(t=!0,setTimeout(i,250))}),s=()=>{var c;if(n!=null&&n.isConnected)return;let a=document.querySelector(ms),u=(c=a==null?void 0:a.closest(Cc))!=null?c:a==null?void 0:a.parentElement;if(o.disconnect(),n=u!=null?u:null,!u){o.observe(document.body,{childList:!0,subtree:!0});return}o.observe(u,{childList:!0,subtree:!0});for(let y=u.parentElement;y;y=y.parentElement)o.observe(y,{childList:!0})};i()}function Nc(e){let t=_c(e);if(!t||t.className&&t.className!=="undefined")return;let n=Array.from(document.querySelectorAll(Ic)).find(i=>!e.element.contains(i));n!=null&&n.className&&(t.className=n.className)}function _c(e){return e.button}function Tc(){var e;if(typeof((e=Spicetify.Menu)==null?void 0:e.Item)!="function")return null;try{return new Spicetify.Menu.Item(M().extensionName,!1,()=>Ft(),Pc())}catch(t){return tt("Failed to create profile menu item",t),null}}function Pc(){return rn.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function Ac(e){Object.assign(window,{SyncifyDebug:{button:e,element:e.element,openModal:Ft,inspect:()=>Rt(e),clickElement:()=>{var t;return(t=e.element)==null?void 0:t.click()},clickInnerButton:()=>{var t;return(t=e.button)==null?void 0:t.click()},clickCallback:()=>e.onClick(e)}})}function Rt(e){var t,n,i,o,s;return{label:e.label,disabled:e.disabled,isRight:e.isRight,hasElement:!!e.element,elementConnected:(t=e.element)==null?void 0:t.isConnected,elementDisabled:(n=e.element)==null?void 0:n.disabled,elementAriaDisabled:(i=e.element)==null?void 0:i.getAttribute("aria-disabled"),elementClass:(o=e.element)==null?void 0:o.className,appRegion:e.element?getComputedStyle(e.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:e.button?getComputedStyle(e.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:e.element?getComputedStyle(e.element).pointerEvents:null,visibility:e.element?getComputedStyle(e.element).visibility:null,display:e.element?getComputedStyle(e.element).display:null,rect:(s=e.element)==null?void 0:s.getBoundingClientRect().toJSON()}}var _=null;function Ft(){if(_!=null&&_.container.isConnected){j("Closing modal"),Spicetify.PopupModal.hide();return}j("Opening modal"),qn(Spicetify.React.createElement(ds))}function Mc(e){_!=null&&_.container.isConnected||(j("Opening claim notice"),qn(Spicetify.React.createElement(ps,{claim:e,onClose:()=>Spicetify.PopupModal.hide()})))}function Dc(e){if(_!=null&&_.container.isConnected)return;j("Opening install notice");let t=()=>Spicetify.PopupModal.hide();qn(Spicetify.React.createElement("div",{className:"syncify-panel"},Spicetify.React.createElement(os,{install:e,onDone:t,onClose:t})))}function qn(e){var n;(n=_==null?void 0:_.root)==null||n.unmount();let t=document.createElement("div");_={container:t,root:null};try{Spicetify.PopupModal.display({title:M().extensionName,content:t,isLarge:!1})}catch(i){throw tt("Failed to open PopupModal",i),i}Lc(t),Oc(t,e)}function Lc(e){requestAnimationFrame(()=>{let t=Bc(e);t==null||t.classList.add("syncify-modal-shell");let n=t==null?void 0:t.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');n&&(n.classList.add("syncify-modal-close"),n.setAttribute("aria-label",`Close ${M().extensionName}`),n.title="Close",n.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function Bc(e){let t=e.parentElement;for(;t&&t!==document.body;){if(t.querySelector(".main-trackCreditsModal-header"))return t;t=t.parentElement}return e.closest('[class*="trackCreditsModal"]')}function Oc(e,t){try{if(typeof Spicetify.ReactDOM.createRoot=="function"){let n=Spicetify.ReactDOM.createRoot(e);n.render(t),(_==null?void 0:_.container)===e&&(_.root=n),j("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(t,e),j("Modal rendered",{renderer:"render"})}catch(n){throw tt("Failed to render modal",n),n}}Yo();(function e(){if(!bc()){setTimeout(e,100);return}j("Spicetify APIs ready"),wc()})();})();
