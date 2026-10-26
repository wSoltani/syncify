// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var cs=Object.defineProperty,ls=Object.defineProperties;var us=Object.getOwnPropertyDescriptors;var Fn=Object.getOwnPropertySymbols;var ys=Object.prototype.hasOwnProperty,fs=Object.prototype.propertyIsEnumerable;var Yn=(e,t,n)=>t in e?cs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,m=(e,t)=>{for(var n in t||(t={}))ys.call(t,n)&&Yn(e,n,t[n]);if(Fn)for(var n of Fn(t))fs.call(t,n)&&Yn(e,n,t[n]);return e},w=(e,t)=>ls(e,us(t));var Wn=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
    width: 14px;
    height: 14px;
}

.syncify-account-actions {
    display: flex;
    flex: 0 0 auto;
    flex-wrap: wrap;
    gap: 8px;
}

.syncify-manage {
    display: inline-flex;
    align-items: center;
    gap: 6px;
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
`;var jt=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var ms="syncify",me="state";function Kt(){let e;try{e=window.indexedDB}catch(t){return Promise.resolve(null)}return e?new Promise(t=>{let n;try{n=e.open(ms,1)}catch(i){t(null);return}n.onupgradeneeded=()=>{n.result.createObjectStore(me)},n.onerror=()=>t(null),n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}function Ht(e,t){let n=Kt().then(i=>new Promise((o,s)=>{if(!i){s(new Error("IndexedDB isn't available."));return}try{let a=i.transaction(me,e),l=t(a.objectStore(me));a.oncomplete=()=>{i.close(),o(l.result)},a.onerror=a.onabort=()=>{var c;i.close(),s((c=a.error)!=null?c:new Error("IndexedDB failed."))}}catch(a){i.close(),s(a)}}));return Promise.race([n,new Promise((i,o)=>setTimeout(()=>o(new Error("IndexedDB took too long.")),2e3))])}function et(e){return Ht("readonly",t=>t.get(e))}async function tt(e,t){await Ht("readwrite",n=>n.put(t,e))}async function zn(e){await Ht("readwrite",t=>t.delete(e))}var q={extensionName:"Syncify",version:"1.9.0",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com"};function _(){var t,n,i,o,s,a,l,c;let e=window.SyncifyConfig;return{extensionName:(t=se(e==null?void 0:e.extensionName))!=null?t:q.extensionName,version:(n=qn(e==null?void 0:e.version))!=null?n:q.version,workerUrl:(i=se(e==null?void 0:e.workerUrl))!=null?i:q.workerUrl,webUrl:(o=se(e==null?void 0:e.webUrl))!=null?o:q.webUrl,githubUrl:(s=se(e==null?void 0:e.githubUrl))!=null?s:q.githubUrl,kofiUrl:(a=se(e==null?void 0:e.kofiUrl))!=null?a:q.kofiUrl,issueUrl:(l=se(e==null?void 0:e.issueUrl))!=null?l:q.issueUrl,releasesUrl:(c=se(e==null?void 0:e.releasesUrl))!=null?c:q.releasesUrl}}function se(e){return qn(e)}function qn(e){return typeof e=="string"&&e.trim()?e.trim():null}var gs="x-syncify-version",hs="x-syncify-install",Ss="x-syncify-timezone",Vn="install-id",Gn="syncify:install-id",ks=2e3,nt=null;async function Jn(){let e={[gs]:_().version,[hs]:await bs()},t=vs();return t&&(e[Ss]=t),e}function bs(){return nt!=null||(nt=ws().catch(()=>it())),nt}async function ws(){let e=await Promise.race([xs(),new Promise(t=>setTimeout(()=>t(null),ks))]);if(e)return e;try{let t=window.localStorage.getItem(Gn);if(t&&Xn(t))return t;let n=it();return window.localStorage.setItem(Gn,n),n}catch(t){return it()}}async function xs(){let e=await Kt();return e?new Promise(t=>{let n=null;try{let i=e.transaction(me,"readwrite"),o=i.objectStore(me),s=o.get(Vn);s.onsuccess=()=>{if(typeof s.result=="string"&&Xn(s.result)){n=s.result;return}n=it(),o.put(n,Vn)},i.oncomplete=()=>{e.close(),t(n)},i.onerror=i.onabort=()=>{e.close(),t(null)}}catch(i){e.close(),t(null)}}):null}function it(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t=[...e].map(n=>n.toString(16).padStart(2,"0"));return[t.slice(0,4).join(""),t.slice(4,6).join(""),t.slice(6,8).join(""),t.slice(8,10).join(""),t.slice(10).join("")].join("-")}function Xn(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(e)}function vs(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(e){return null}}var Cs="syncify-signature-v1",Es={name:"ECDSA",hash:"SHA-256"};function Zn(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function Qn(e){return Ft(new Uint8Array(await crypto.subtle.exportKey("raw",e)))}async function ot(e,t,n,i,o){let s=await _s(t,n,i,o),a=await crypto.subtle.sign(Es,e,s);return Ft(new Uint8Array(a))}async function _s(e,t,n,i){let{pathname:o,search:s}=new URL(n),a=new TextEncoder,l=Ft(new Uint8Array(await crypto.subtle.digest("SHA-256",a.encode(i))));return a.encode([Cs,e,t.toUpperCase(),o+s,l].join(`
`))}function Ft(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var ei="device-key",Yt="session",ti="salt",re=null,Ee,ni={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function _e(e){if(re)return re;let t=await et(ei);return Is(t)?(re=Promise.resolve(t),t):e?(re=Zn().then(async n=>(await tt(ei,n),n)),re.catch(()=>{re=null}),re):null}async function $(){let e=await et(Yt);return Ns(e)?e:null}function Wt(e){return tt(Yt,e)}async function ae(){await zn(Yt).catch(()=>{})}async function st(){if(Ee===void 0){let e=await et(ti).catch(()=>{});Ee=typeof e=="string"?e:null}return Ee}async function rt(e){e!==Ee&&(Ee=e,await tt(ti,e).catch(()=>{}))}function at(){return ni}function ii(e){ni=e}function Is(e){let t=e;return!!(t&&t.privateKey instanceof CryptoKey&&t.publicKey instanceof CryptoKey)}function Ns(e){let t=e;return!!(t&&typeof t.token=="string"&&t.token&&typeof t.email=="string")}var Ts="/api/auth/email-otp/send-verification-otp",Ps="/api/auth/sign-in/email-otp",As="/api/auth/get-session",Ms="/api/auth/sign-out",Bs="/api/auth/link",Ds="x-syncify-device-key",Os="x-syncify-signature",oi="x-syncify-salt",Ls="none",Us={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again.",link_failed:"Couldn't open the website. Try again."},v=class extends Error{constructor(n,i=null){var o;super((o=Us[n])!=null?o:"Sign-in failed. Try again.");this.code=n;this.retryAfter=i;this.name="AccountError"}};function Ie(e){return e instanceof v?e.message:"Sign-in failed. Try again."}async function si(e){let t=await ct(Ts,{method:"POST",body:JSON.stringify({email:e,type:"sign-in"})});return typeof(t==null?void 0:t.resend_in)=="number"?t.resend_in:60}async function ri(e,t){var s;let n=await _e(!0).catch(()=>{throw new v("no_device_key")}),i=await ct(Ps,{method:"POST",body:JSON.stringify({email:e,otp:t}),keys:n,sendPublicKey:!0});if(typeof(i==null?void 0:i.token)!="string"||!i.token)throw new v("sign_in_failed");let o={token:i.token,email:typeof((s=i.user)==null?void 0:s.email)=="string"?i.user.email:e};return await Wt(o).catch(()=>{throw new v("no_device_key")}),zt=!0,o}var zt=!1;async function ai(){var t;let e=await $();if(!e||zt)return e;try{let n=await qt(e,As,"GET");zt=!0;let i=(t=n==null?void 0:n.user)==null?void 0:t.email;if(typeof i!="string"||i===e.email)return e;let o=w(m({},e),{email:i});return await Wt(o).catch(()=>{}),o}catch(n){if(n instanceof v&&n.code==="signed_out")return null;throw n}}async function ci(){let e=await $().catch(()=>null);e&&await qt(e,Ms,"POST").catch(()=>{}),await ae()}async function li(){let e=await $();if(!e)throw new v("signed_out");let t=await qt(e,Bs,"POST"),n=typeof(t==null?void 0:t.url)=="string"?t.url:"",i=new URL(_().webUrl).origin;if(!n.startsWith(`${i}/link#`))throw new v("link_failed");return n}async function qt(e,t,n){let i=await _e(!1);if(!i)throw await ae(),new v("signed_out");return ct(t,{method:n,token:e.token,keys:i})}async function ct(e,t,n=!1){var d,k,f;let i=`${_().webUrl.replace(/\/+$/,"")}${e}`,o={};if(t.body!==void 0&&(o["content-type"]="application/json"),t.token&&(o.authorization=`Bearer ${t.token}`),t.keys){let g=(d=await st())!=null?d:Ls;o[oi]=g,o[Os]=await ot(t.keys.privateKey,g,t.method,i,(k=t.body)!=null?k:""),t.sendPublicKey&&(o[Ds]=await Qn(t.keys.publicKey))}let s;try{s=await fetch(i,{method:t.method,headers:o,body:t.body})}catch(g){throw new v("offline")}let a=s.headers.get(oi);a&&await rt(a);let l=await s.json().catch(()=>null);if(s.ok)return l;let c=typeof(l==null?void 0:l.code)=="string"?l.code:s.status===503?"unavailable":"failed";if(c==="stale_salt"&&t.keys&&!n)return ct(e,t,!0);c==="signed_out"&&await ae();let y=Number(s.headers.get("retry-after"));throw new v(c,Number.isFinite(y)&&y>0?y:(f=Rs[c])!=null?f:null)}var Rs={resend_wait:60,too_many_requests:60,send_failed:60};var $s="x-syncify-user-hash",js="x-syncify-identity",Ks="x-syncify-signature",ui="x-syncify-salt",Hs="none",Fs="/restores",Ys="hash",yi=3,Ne=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}},V=class extends Error{constructor(n){super(n==="not_linked"?"Couldn't read that Spotify account's backups.":"Sign in to restore this backup.");this.code=n;this.name="LockedError"}};async function fi(e,t,n){let i=await ce(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(n)});if(!i.ok)throw new Error(`Backup failed with HTTP ${i.status}.`);let o=await i.json().catch(()=>null);return{unchanged:(o==null?void 0:o.unchanged)===!0}}async function di(e,t,n){var y,d,k;let i=await ce(e,t,{method:"GET"},mi("/",n));if(i.status===404){let f=await i.json().catch(()=>null);return{exists:!1,payload:null,backups:[],safetyCopy:null,claim:Te(f==null?void 0:f.claim)}}if(!i.ok)throw new Error(`Restore failed with HTTP ${i.status}.`);let o=await i.json(),s=Te(o.claim);delete o.claim;let a=[o,...(y=o.backup_history)!=null?y:[]];if(!a.every(f=>f.backup))return{exists:!0,payload:o,backups:a.slice(0,yi),safetyCopy:(d=a[yi])!=null?d:null,claim:s};let l=a.filter(f=>{var g;return((g=f.backup)==null?void 0:g.kind)==="rolling"}),c=(k=a.find(f=>{var g;return((g=f.backup)==null?void 0:g.kind)==="anchor"}))!=null?k:null;return l.length===0&&c?{exists:!0,payload:o,backups:[c],safetyCopy:null,claim:s}:{exists:!0,payload:o,backups:l,safetyCopy:c,claim:s}}async function pi(e,t,n,i){try{await ce(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:n}),keepalive:!0},mi(Fs,i))}catch(o){}}async function ce(e,t,n,i="",o=!1){var g,B,x,X;let s=i?`${e.replace(/\/+$/,"")}${i}`:e,a=(g=n.method)!=null?g:"GET",l=await $().catch(()=>null),c=l?await _e(!1).catch(()=>null):null,y={};if(l&&c){let U=(B=await st())!=null?B:Hs;y.authorization=`Bearer ${l.token}`,y[ui]=U,y[Ks]=await ot(c.privateKey,U,a,s,(x=n.body)!=null?x:"")}let d=await fetch(s,w(m({},n),{headers:m(w(m(m({},n.headers),await Jn()),{[$s]:t.hash,[js]:t.field}),y)})),k=d.headers.get(ui);if(k&&await rt(k),d.status===426)throw new Ne;if(d.status!==401)return d;let f=(X=await d.clone().json().catch(()=>null))==null?void 0:X.code;if(!o){if(f==="stale_salt"&&l)return ce(e,t,n,i,!0);if(f==="signed_out"&&l)return await ae(),ce(e,t,n,i,!0)}throw f==="claimed"||f==="not_owner"||f==="not_linked"?new V(f):(f==="signed_out"&&await ae(),new v(typeof f=="string"?f:"failed"))}function mi(e,t){return t?`${e}?${Ys}=${encodeURIComponent(t)}`:e}function Te(e){let t=e;return!t||typeof t.mine!="boolean"?null:t.status==="final"?{status:"final",mine:t.mine}:t.status!=="pending"||typeof t.final_at!="number"?null:{status:"pending",mine:t.mine,email:typeof t.email=="string"?t.email:null,final_at:t.final_at}}var gi="/claims",Ws="/claims/cancel",zs={no_backup:"Back up first, then secure your backup.",unsupported_identity:"This Spotify account can't be secured.",too_many_accounts:"Your account already has 10 Spotify accounts linked.",offline:"Couldn't reach Syncify. Check your connection and try again."},G=class extends Error{constructor(n){var i;super((i=zs[n])!=null?i:"Couldn't secure your backup. Try again.");this.code=n;this.name="ClaimError"}};async function hi(e,t){let n=await Vt(e,t,"GET",gi);if(!n.ok)throw new G(await Gt(n));let i=await n.json().catch(()=>null);return{claim:Te(i==null?void 0:i.claim),disputed:(i==null?void 0:i.disputed)===!0,accounts:Array.isArray(i==null?void 0:i.accounts)?i.accounts.filter(qs):null}}async function Si(e,t){let n=await Vt(e,t,"POST",gi);if(!n.ok)throw new G(await Gt(n));let i=await n.json().catch(()=>null);return Te(i==null?void 0:i.claim)}async function ki(e,t){let n=await Vt(e,t,"POST",Ws);if(!n.ok&&n.status!==404)throw new G(await Gt(n))}async function Vt(e,t,n,i){try{return await ce(e,t,{method:n},i)}catch(o){throw o instanceof TypeError?new G("offline"):o}}async function Gt(e){let t=await e.json().catch(()=>null);return typeof(t==null?void 0:t.code)=="string"?t.code:"failed"}function qs(e){let t=e;return!!(t&&typeof t.hash=="string"&&(t.status==="pending"||t.status==="final"||t.status==="cancelled"))}var he={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},Vs=/^([a-z0-9]|f([1-9]|1[0-2]))$/,Gs=250,Js=40,Jt=null,lt=null,ge=null;function bi(){return/mac/i.test(navigator.platform||navigator.userAgent)}function wi(e){if(e===null)return null;if(!e||typeof e!="object")return he;let t=e;return typeof t.key!="string"||!Vs.test(t.key)?he:{key:t.key,ctrl:!!t.ctrl,alt:!!t.alt,shift:!!t.shift,meta:!!t.meta}}function Pe(e){if(!e)return"Off";let t=e.key.toUpperCase();return bi()?[e.ctrl?"\u2318":"",e.alt?"\u2325":"",e.shift?"\u21E7":"",t].join(""):[e.ctrl&&"Ctrl",e.meta&&"Win",e.alt&&"Alt",e.shift&&"Shift",t].filter(Boolean).join("+")}function xi(e){if(e.key==="Escape")return{kind:"cancel"};let t=Xs(e.code);if(!t)return{kind:"ignore"};let n=bi();if(n&&e.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:t,ctrl:n?e.metaKey:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:n?!1:e.metaKey},o=t.startsWith("f")&&t.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!o?{kind:"error",message:`Include ${n?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function Xs(e){var n,i;let t=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(e);return t?((i=(n=t[1])!=null?n:t[2])!=null?i:t[3]).toLowerCase():null}function vi(e){var t;if(ge&&Zs(ge,e))return!1;try{let n=Spicetify.Mousetrap,i=(t=n.trigger)==null?void 0:t.call(n)._directMap;if(!i)return!1;let o=Xt(e);return Object.keys(i).some(s=>s.startsWith(`${o}:`))}catch(n){return!1}}function Zt(e,t,n=0){if(Jt=t,lt=e,!Ci()){if(n>=Js){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>Zt(lt,t,n+1),Gs);return}Qt(lt)}function Qt(e){if(lt=e,!Ci()||!Jt)return;let t=Jt;try{if(ge&&Spicetify.Keyboard._deregisterShortcut(ge),ge=null,!e)return;Spicetify.Keyboard.registerShortcut(e,n=>{n.preventDefault(),t()}),ge=e,console.debug("[Syncify]","Keyboard shortcut registered",Pe(e))}catch(n){console.warn("[Syncify]","Failed to register keyboard shortcut",n)}}function Ci(){var e;return typeof((e=Spicetify.Keyboard)==null?void 0:e.registerShortcut)=="function"}function Xt(e){return[e.ctrl&&"mod",e.meta&&"meta",e.alt&&"alt",e.shift&&"shift",e.key].filter(Boolean).join("+")}function Zs(e,t){return Xt(e)===Xt(t)}var en="both",Qs=["both","topbar","menu"],Ae=null,Me=null,ut=!1;function Ei(e){return Qs.includes(e)?e:en}function _i(){var e;return typeof((e=Spicetify.Menu)==null?void 0:e.Item)=="function"}function Ii(e){Ae=e.topbarButton,Me=e.menuItem}function yt(e){let t=e!=="menu"||!Me,n=e!=="topbar";if(Ae!=null&&Ae.element&&(Ae.element.style.display=t?"":"none"),!!Me)try{n&&!ut?(Me.register(),ut=!0):!n&&ut&&(Me.deregister(),ut=!1)}catch(i){console.warn("[Syncify]","Failed to update profile menu item",i)}}var dt="syncify:config",ft={workerUrl:_().workerUrl,autoBackupEnabled:!1,shortcut:he,entryPoint:en};function Se(){var n,i;let e=_(),t=(i=(n=Spicetify.LocalStorage)==null?void 0:n.get(dt))!=null?i:window.localStorage.getItem(dt);if(!t)return w(m({},ft),{workerUrl:e.workerUrl});try{let o=JSON.parse(t);return{workerUrl:e.workerUrl,autoBackupEnabled:o.autoBackupEnabled===void 0?ft.autoBackupEnabled:!!o.autoBackupEnabled,shortcut:o.shortcut===void 0?ft.shortcut:wi(o.shortcut),entryPoint:Ei(o.entryPoint)}}catch(o){return w(m({},ft),{workerUrl:e.workerUrl})}}function pt(e){var n;let t=JSON.stringify({workerUrl:_().workerUrl,autoBackupEnabled:e.autoBackupEnabled,shortcut:e.shortcut,entryPoint:e.entryPoint});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set(dt,t);return}window.localStorage.setItem(dt,t)}function Be(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}async function mt(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return[...new Uint8Array(n)].map(i=>i.toString(16).padStart(2,"0")).join("")}function De(e){return JSON.stringify(tn(e))}function tn(e){return Array.isArray(e)?e.map(tn):e&&typeof e=="object"?Object.keys(e).sort().reduce((t,n)=>(t[n]=tn(e[n]),t),{}):e}var er=["username","canonicalUsername","id","uri","displayName"];async function le(){let{value:e,field:t}=await tr();return{hash:await mt(e),field:t}}async function tr(){var o;let e=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let t=await e.getUser(),n=er.find(s=>(t==null?void 0:t[s])!=null),i=n?t[n]:void 0;if(!n||!i)throw new Error("Unable to resolve the active Spotify user.");return{value:i,field:n}}var nr=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,ir=100,or="marketplace:installed-extensions",sr="marketplace:installed-themes",rr="marketplace:theme-installed",ar="marketplace:installed:",cr="marketplace";function on(e){return Spicetify.Config?sn(Spicetify.Config,e):null}function sn(e,t){var s;let n=J(e),i=new Set(lr(t)),o=((s=t[rr])==null?void 0:s.includes(ar))===!0;return{current_theme:o?cr:n.current_theme,color_scheme:o?"":n.color_scheme,extensions:n.extensions.filter(a=>!i.has(a)),custom_apps:n.custom_apps}}function J(e){let t=e&&typeof e=="object"?e:{};return{current_theme:nn(t.current_theme)?t.current_theme:"",color_scheme:nn(t.color_scheme)?t.color_scheme:"",extensions:Ni(t.extensions),custom_apps:Ni(t.custom_apps)}}function Ai(e,t){return De(J(e))===De(J(t))}function Ni(e){return Array.isArray(e)?[...new Set(e.filter(nn))].sort().slice(0,ir):[]}function nn(e){return typeof e=="string"&&nr.test(e)}function lr(e){let t=Ti(e[or]).map(i=>{var s;let o=(s=Pi(e[i]))==null?void 0:s.manifest;return o&&typeof o=="object"?o.main:void 0}),n=Ti(e[sr]).flatMap(i=>{var s;let o=(s=Pi(e[i]))==null?void 0:s.include;return Array.isArray(o)?o:[]});return[...t,...n].flatMap(i=>{let o=typeof i=="string"?i.split("/").pop():void 0;return o?[o]:[]})}function Ti(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function Pi(e){try{let t=e?JSON.parse(e):null;return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch(t){return null}}function Mi(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var ur=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],yr="marketplace:installed:",Bi=`${yr}snippet:`,fr="wsoltani/syncify",dr="marketplace",Di={added:0,removed:1,unchanged:2};function K(e){let t=new Map;for(let[n,i]of ur)for(let o of hr(e[n]))t.has(o)||t.set(o,mr(o,i,e[o]));return[...t.values()]}function rn(e,t,n,i){let o=new Set(e.map(c=>c.key)),s=new Map(n.map(c=>[c.key,c])),a=[...e.map(c=>{let y=s.get(c.key);return w(m({},c),{change:y?"unchanged":"added",isNew:!y||y.sources.join(" ")!==c.sources.join(" ")})}),...n.filter(c=>!o.has(c.key)).map(c=>w(m({},c),{change:an(c,e)?"unchanged":"removed",isNew:!1}))].sort((c,y)=>Di[c.change]-Di[y.change]||c.name.localeCompare(y.name)),l={added:0,removed:0,unchanged:0};for(let c of a)l[c.change]+=1;return{items:a,counts:l,manual:pr(t,i)}}function an(e,t){return e.type==="extension"&&Oi(e)&&!t.some(Oi)}function Oi(e){var t;return((t=e.repo)==null?void 0:t.toLowerCase())===fr}function pr(e,t){if(!e)return[];let n=J(e),i=J(t),o=[...n.extensions.filter(a=>!i.extensions.includes(a)).map(a=>({type:"extension",name:a})),...n.custom_apps.filter(a=>!i.custom_apps.includes(a)).map(a=>({type:"custom_app",name:a}))],s=n.current_theme;return s&&s!==dr&&(s!==i.current_theme||n.color_scheme!==i.color_scheme)&&o.push(m({type:"theme",name:s},n.color_scheme?{scheme:n.color_scheme}:{})),o}function mr(e,t,n){var c,y;let i=Li(n),o=Li(i==null?void 0:i.manifest),s=gt(i==null?void 0:i.user),a=gt(i==null?void 0:i.repo),l=(y=(c=gt(i==null?void 0:i.title))!=null?c:gt(o==null?void 0:o.name))!=null?y:e.startsWith(Bi)?e.slice(Bi.length):e.split("/").pop()||e;return{key:e,type:t,name:l,repo:t!=="snippet"&&s&&a?`${s}/${a}`:null,sources:gr(t,i),custom:t==="snippet"&&(i==null?void 0:i.custom)===!0}}function gr(e,t){return t?(e==="extension"?[t.extensionURL]:e==="theme"?[t.cssURL,t.schemesURL,...Array.isArray(t.include)?t.include:[]]:[]).filter(i=>typeof i=="string"&&i!==""):[]}function gt(e){return typeof e=="string"&&e.trim()?e.trim():null}function hr(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function Li(e){let t=e;if(typeof e=="string")try{t=JSON.parse(e)}catch(n){return null}return t&&typeof t=="object"&&!Array.isArray(t)?t:null}var ht="spicetify-marketplace";var Oe="settings";async function Ui(){let e=await ji();if(e.kind!=="ok")return null;try{let t=await Ki(e.db,"readonly",i=>i.getAll());if(!t)return null;let n={};for(let i of t)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(n[i.key]=i.value);return n}finally{e.db.close()}}async function Ri(e){let t=await ji();if(t.kind==="unavailable")return"unavailable";let n=t.kind==="ok"?t.db:await Sr();if(!n)return"failed";try{return await Ki(n,"readwrite",o=>{let s;for(let[a,l]of Object.entries(e))s=o.put({key:a,value:l});return s})===null?"failed":"written"}finally{n.close()}}function $i(){var e;try{return(e=window.indexedDB)!=null?e:null}catch(t){return null}}async function ji(){let e=$i();return e?await kr(e)?{kind:"missing"}:new Promise(t=>{let n=!1,i=e.open(ht);i.onupgradeneeded=()=>{n=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),t({kind:"unavailable"})},i.onblocked=()=>t({kind:"unavailable"}),i.onsuccess=()=>{let o=i.result;if(n){o.close(),br(e).then(()=>t({kind:"missing"}));return}if(!o.objectStoreNames.contains(Oe)){o.close(),t({kind:"unavailable"});return}t({kind:"ok",db:o})}}):{kind:"unavailable"}}function Sr(){let e=$i();return e?new Promise(t=>{let n=e.open(ht,1);n.onupgradeneeded=()=>{let i=n.result;i.objectStoreNames.contains(Oe)||i.createObjectStore(Oe,{keyPath:"key"})},n.onerror=()=>{console.warn("Syncify could not create Marketplace storage",n.error),t(null)},n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}async function kr(e){if(typeof e.databases!="function")return!1;try{return!(await e.databases()).some(n=>n.name===ht)}catch(t){return!1}}function br(e){return new Promise(t=>{let n=e.deleteDatabase(ht);n.onsuccess=()=>t(),n.onerror=()=>t(),n.onblocked=()=>t()})}function Ki(e,t,n){return new Promise(i=>{let o;try{o=e.transaction(Oe,t)}catch(y){console.warn("Syncify could not open a Marketplace transaction",y),i(null);return}let s,a=!1,l=y=>{a||(a=!0,i(y))};o.oncomplete=()=>l(s),o.onerror=()=>{console.warn("Syncify Marketplace transaction failed",o.error),l(null)},o.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",o.error),l(null)};let c;try{c=n(o.objectStore(Oe))}catch(y){console.warn("Syncify Marketplace request could not be issued",y),l(null);return}c&&(c.onsuccess=()=>{s=c.result},c.onerror=()=>{console.warn("Syncify Marketplace request failed",c.error),l(null)})})}var cn="marketplace:",Hi=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function Le(){let e=Tr(),t=await Ui();if(t)for(let[n,i]of Object.entries(t))n.startsWith(cn)&&(e[n]=i);return e}var xr=new Set(["marketplace:active-tab","marketplace:sort"]),vr="marketplace:installed:",Cr=["stars","tags","lastUpdated","created"];async function St(e,t){let n={};for(let[i,o]of Object.entries(e))xr.has(i)||(n[i]=i.startsWith(vr)?Er(o):o);return t&&(n.spicetify_config=J(t)),mt(De(n))}function Er(e){try{let t=JSON.parse(e);if(!t||typeof t!="object"||Array.isArray(t))return e;for(let n of Cr)delete t[n];return t}catch(t){return e}}async function kt(){let e=await Le(),t=on(e);return{keyCount:Object.keys(e).length,hash:await St(e,t),installedItemCount:Ir(e),installedItems:Wi(e),items:K(e),spicetifyConfig:t,marketplaceAvailable:Nr(e)}}async function Fi(){let e=await Le(),t=on(e);return m({schema_version:2,metadata:{last_sync_datetime:new Date().toISOString(),device_info:Mi(),marketplace_key_count:Object.keys(e).length},payload_hash:await St(e,t),marketplace_data:{keys:e}},t?{spicetify_config:t}:{})}async function Yi(e){var s,a;let t={},n=(a=(s=e.marketplace_data)==null?void 0:s.keys)!=null?a:{};for(let[l,c]of Object.entries(n))l.startsWith(cn)&&(t[l]=c);if(Object.keys(t).length===0)return 0;await _r(t);let i=Object.keys(t);for(let l of i)window.localStorage.setItem(l,t[l]);if(await Ri(t)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try the restore again.");return i.length}async function _r(e){let t=await Le(),n=K(e),i=K(t).filter(a=>an(a,n));if(i.length===0)return;let o="marketplace:installed-extensions",s=qi(e[o]).map(String);for(let a of i)s.includes(a.key)||s.push(a.key),e[a.key]=t[a.key];e[o]=JSON.stringify(s)}function Ir(e){return Wi(e).length}function Wi(e){return Hi.flatMap(t=>qi(e[t]).map(String))}function Nr(e){return!!(window.Marketplace||Hi.some(n=>e[n]!==void 0)||e["marketplace:tabs"]!==void 0)}function zi(e,t){return t===0?!1:e===0?!0:e<Math.max(2,Math.floor(t*.5))}function Tr(){let e={};for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);if(!(n!=null&&n.startsWith(cn)))continue;let i=window.localStorage.getItem(n);i!==null&&(e[n]=i)}return e}function qi(e){if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch(t){return[]}}async function bt(e){if(!Be(e))throw new Error("Syncify backup service is not configured.");let[t,n]=await Promise.all([le(),Fi()]);if(n.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:i}=await fi(e.workerUrl,t,n);return{payload:n,unchanged:i}}async function ke(e,t){var a;if(!Be(e))throw new Error("Syncify backup service is not configured.");let n=await di(e.workerUrl,await le(),t),[i,o]=await Promise.all([Promise.all(n.backups.map(Vi)),n.safetyCopy?Vi(n.safetyCopy):null]),s=i.filter((l,c)=>i.findIndex(y=>y.payload_hash===l.payload_hash)===c);return w(m({},n),{payload:(a=s[0])!=null?a:null,backups:s,safetyCopy:o&&!s.some(l=>l.payload_hash===o.payload_hash)?o:null})}var ln=new Map;async function Vi(e){var s,a,l;let t=(a=(s=e.marketplace_data)==null?void 0:s.keys)!=null?a:{},n=e.spicetify_config?sn(e.spicetify_config,t):void 0,i=`${e.payload_hash} ${(l=e.metadata)==null?void 0:l.last_sync_datetime}`,o=ln.get(i);return o||(o=St(t,n),ln.set(i,o),o.catch(()=>ln.delete(i))),w(m(m({},e),n?{spicetify_config:n}:{}),{payload_hash:await o})}async function Gi(e,t,n){var a;let i=t!=null?t:(await ke(e)).payload;if(!i)throw new Error("No Syncify cloud backup was found for this Spotify account.");let o=await Yi(i),s=(a=i.backup)==null?void 0:a.id;return s&&Be(e)&&le().then(l=>pi(e.workerUrl,l,s,n)).catch(()=>{}),{payload:i,restoredCount:o}}async function Ji(e){let t=await le(),n=await hi(un(e),t);return w(m({},n),{hash:t.hash})}async function Xi(e){await Si(un(e),await le())}async function Zi(e){await ki(un(e),await le())}function un(e){if(!Be(e))throw new Error("Syncify backup service is not configured.");return e.workerUrl}async function Qi(){var t,n,i;let e=Se();if(!(!e.workerUrl||!e.autoBackupEnabled))try{let[o,s]=await Promise.all([kt(),ke(e)]),a=(n=(t=s.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?n:0;if(s.exists&&zi(o.keyCount,a)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((i=s.payload)==null?void 0:i.payload_hash)===o.hash||o.keyCount===0)return;await bt(e),Spicetify.showNotification("Syncify auto-backup complete")}catch(o){if(o instanceof V){Spicetify.showNotification("Syncify: sign in to keep backing up",!0,8e3);return}let s=o instanceof Error?o.message:String(o);console.warn("Syncify startup sync failed:",o),Spicetify.showNotification(`Syncify auto-sync skipped: ${s}`,!0,8e3)}}var fn="syncify:pending-restore",Pr=600*1e3,Ar=2e3,Mr=15e3,Br="marketplace:theme-installed",Dr="raw.githubusercontent.com",Or=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],ue=null,yn=new Set,no=new Map;function io(){return ue}function oo(e){return yn.add(e),()=>yn.delete(e)}function so(){ue&&uo(w(m({},ue),{manual:[]}))}function dn(e){try{localStorage.setItem(fn,JSON.stringify({at:Date.now(),manual:e}))}catch(t){}}function ro(){var e;dn((e=ue==null?void 0:ue.manual)!=null?e:[]),window.location.reload()}function ao(){yo()&&(document.addEventListener("load",e=>eo(e.target,"load"),!0),document.addEventListener("error",e=>eo(e.target,"error"),!0))}async function co(){let e=yo();if(!e)return;try{localStorage.removeItem(fn)}catch(o){}let t=Date.now(),n=await to();for(;n.loaded<n.total&&Date.now()-t<Mr;)await new Promise(o=>setTimeout(o,Ar)),n=await to();uo(w(m({at:Date.now()},n),{manual:e.manual}));let i=n.loaded===n.total&&e.manual.length===0;Spicetify.showNotification(i?`Syncify: backup restored. ${Lr(n)}.`:`Syncify: restored ${n.loaded} of ${n.total}. Open Syncify for details.`,!1,8e3)}function lo(e){let t=e.map(n=>n.type==="extension"?`spicetify config extensions ${wt(n.name)}`:n.type==="custom_app"?`spicetify config custom_apps ${wt(n.name)}`:`spicetify config current_theme ${wt(n.name)}${n.scheme?` color_scheme ${wt(n.scheme)}`:""}`);return t.length>0?[...t,"spicetify apply"]:[]}function Lr(e){return e.total===1?"It loaded":`All ${e.total} loaded`}function wt(e){return/^[\w.@+/-]+$/.test(e)?e:`"${e}"`}function uo(e){ue=e;for(let t of yn)t(e)}function yo(){var e;try{let t=JSON.parse((e=localStorage.getItem(fn))!=null?e:"null");return!t||Date.now()-t.at>Pr?null:{manual:Array.isArray(t.manual)?t.manual:[]}}catch(t){return null}}function eo(e,t){e instanceof HTMLScriptElement&&e.src&&no.set(Ue(e.src),t)}async function to(){var i;let e=await Le(),t=(i=e[Br])!=null?i:"",n=K(e).filter(o=>o.type==="extension"&&o.sources.length>0||o.type==="theme"&&t.includes(o.key)||o.type==="snippet");return{loaded:n.filter(Ur).length,total:n.length}}function Ur(e){var t,n;if(e.type==="snippet"){let i=document.querySelector("style.marketplaceSnippets");return((t=i==null?void 0:i.textContent)==null?void 0:t.includes(`/* ${e.name} - `))===!0}if(e.type==="theme"){let i=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((n=i==null?void 0:i.textContent)!=null&&n.trim())}return Rr(e.sources[0]).some($r)}function Rr(e){let t;try{t=new URL(e)}catch(a){return[]}if(t.host!==Dr)return[Ue(t.href)];let[n,i,o,...s]=t.pathname.split("/").filter(Boolean);return!n||!i||!o||s.length===0?[]:Or.map(a=>Ue(`https://${a}/gh/${n}/${i}@${o}/${s.join("/")}`))}function $r(e){let t=no.get(e);return t?t==="load":[...document.querySelectorAll("script[src]")].some(i=>Ue(i.src)===e)&&performance.getEntriesByType("resource").some(i=>Ue(i.name)===e)}function Ue(e){try{let t=new URL(e);return`${t.origin}${t.pathname}`}catch(t){return e}}var jr="raw.githubusercontent.com",Kr={extension:"spicetify-extensions",theme:"spicetify-themes"},Hr="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",Fr="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",Yr="https://api.github.com/repos",Wr=5e3,zr=20,fo="syncify:repo-topics",po=10080*60*1e3,qr=200;function xt(e){return(e==null?void 0:e.kind)==="host"||(e==null?void 0:e.kind)==="repo"||(e==null?void 0:e.kind)==="blocked"||(e==null?void 0:e.kind)==="catalog"}function mo(e){let t=new Map;for(let n of e){if(n.change==="removed")continue;if(n.custom){t.set(n.key,{kind:"custom"});continue}let i=Vr(n);i&&t.set(n.key,i)}return t}async function go(e,t){let n=new Map,i=e.filter(a=>a.change!=="removed"&&a.isNew&&!t.has(a.key));if(i.length===0)return n;let o=i.filter(a=>a.type==="snippet"),s=i.filter(a=>a.type!=="snippet");if(o.length>0){let a=await Zr();for(let l of o)a?a.has(So(l.name))||n.set(l.key,{kind:"catalog"}):n.set(l.key,{kind:"unchecked"})}if(s.length>0){let a=await Xr(),l=ta(),c=0;await Promise.all(s.map(async y=>{let d=Gr(y),k=Kr[y.type];if(!d||!k)return;if(a===null){n.set(y.key,{kind:"unchecked"});return}if(Jr(d,a)){n.set(y.key,{kind:"blocked"});return}let f=ea(l,d);f===void 0&&c<zr&&(c+=1,f=await Qr(d),f!==void 0&&(l[d.toLowerCase()]={topics:f,at:Date.now()})),f===void 0?n.set(y.key,{kind:"unchecked"}):(f===null||!f.includes(k))&&n.set(y.key,{kind:"catalog"})})),na(l)}return n}function Vr(e){let t=null;for(let n of e.sources){let i;try{i=new URL(n)}catch(s){return{kind:"host",host:n.slice(0,40)}}if(i.host!==jr)return{kind:"host",host:i.host};let o=ho(i);o&&e.repo&&o.toLowerCase()!==e.repo.toLowerCase()&&(t!=null||(t=o))}return t?{kind:"repo",repo:t}:null}function Gr(e){for(let t of e.sources)try{let n=ho(new URL(t));if(n)return n}catch(n){}return e.repo}function ho(e){let[t,n]=e.pathname.split("/").filter(Boolean);return t&&n?`${t}/${n}`:null}function Jr(e,t){let n=`https://github.com/${e}`.toLowerCase();return t.some(i=>{let o=i.toLowerCase();if(!o.includes("*"))return o===n;let s=o.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${s}$`).test(n)})}function So(e){return e.replace(/\n/g,"").trim().toLowerCase()}var Re=null,$e=null;function Xr(){return Re!=null||(Re=ko(Hr).then(e=>{let t=e==null?void 0:e.repos;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&!n.startsWith("//")):(Re=null,null)})),Re}function Zr(){return $e!=null||($e=ko(Fr).then(e=>Array.isArray(e)?new Set(e.flatMap(t=>typeof(t==null?void 0:t.title)=="string"?[So(t.title)]:[])):($e=null,null))),$e}async function Qr(e){let t=await bo(`${Yr}/${e}`);if((t==null?void 0:t.status)===404)return null;if(!(t!=null&&t.ok))return;let n=await t.json().catch(()=>null);return Array.isArray(n==null?void 0:n.topics)?n.topics.filter(i=>typeof i=="string"):void 0}async function ko(e){let t=await bo(e);return t!=null&&t.ok?t.json().catch(()=>null):null}async function bo(e){let t=typeof AbortController=="function"?new AbortController:null,n=setTimeout(()=>t==null?void 0:t.abort(),Wr);try{return await fetch(e,{signal:t==null?void 0:t.signal})}catch(i){return null}finally{clearTimeout(n)}}function ea(e,t){let n=e[t.toLowerCase()];return n&&Date.now()-n.at<po?n.topics:void 0}function ta(){var e;try{let t=JSON.parse((e=localStorage.getItem(fo))!=null?e:"{}");return t&&typeof t=="object"?t:{}}catch(t){return{}}}function na(e){let t=Date.now(),n=Object.entries(e).filter(([,i])=>t-i.at<po).sort(([,i],[,o])=>o.at-i.at).slice(0,qr);try{localStorage.setItem(fo,JSON.stringify(Object.fromEntries(n)))}catch(i){}}var ia="syncify:beta",wo=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function xo(){var e;return(e=window.SyncifyLoader)!=null?e:null}function oa(){try{return window.localStorage.getItem(ia)==="true"}catch(e){return!1}}async function vo(e){let t=oa()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(t.map(i=>sa(`${e}/${i}`)))).reduce((i,o)=>o&&(!i||mn(o,i)>0)?o:i,null)}function pn(e){return typeof e=="string"&&wo.test(e)}function mn(e,t){let[n,i]=[e,t].map(o=>{var y;let[,s,a,l,c]=(y=wo.exec(o))!=null?y:[];return[s,a,l,c!=null?c:1/0].map(Number)});for(let o=0;o<n.length;o+=1)if(n[o]!==i[o])return n[o]<i[o]?-1:1;return 0}async function sa(e,t=3e3){let n=typeof AbortController=="function"?new AbortController:null,i=setTimeout(()=>n==null?void 0:n.abort(),t);try{let o=await fetch(e,{signal:n==null?void 0:n.signal});if(!o.ok)return null;let s=await o.json();return pn(s==null?void 0:s.version)?s.version:null}catch(o){return null}finally{clearTimeout(i)}}function To(){var Rn,$n,jn,Kn,Hn;let e=Spicetify.React,t=e.useEffect,n=e.useMemo,i=e.useState,o=e.useRef,[s,a]=i(()=>Se()),[l,c]=i("idle"),[y,d]=i(null),[k,f]=i(0),[g,B]=i([]),[x,X]=i([]),[U,He]=i(null),[Z,ye]=i(null),[C,Fe]=i(null),[T,Ye]=i(null),[Q,we]=i([]),[p,S]=i(null),[b,I]=i(null),[A,ee]=i(!1),[te,D]=i(!1),[gn,We]=i(!1),[ze,hn]=i(null),[F,fe]=i(!1),[It,de]=i(null),[Sn,kn]=i(null),[qe,Bo]=i(!1),[E,Do]=i(()=>io()),[Oo,bn]=i(!1),[ne,Lo]=i(!1),[wn,Uo]=i(null),[xn,Ve]=i(void 0),[M,Ro]=i(null),[xe,$o]=i(null),[ie,vn]=i(null),[jo,Cn]=i(!1),[Ko,Nt]=i(null),[Ho,En]=i(!1),[O,Tt]=i(null),[N,Pt]=i(null),_n=o(null),R=n(()=>_(),[]),pe=n(()=>p?[...Q,p]:Q,[Q,p]),At=O?(Rn=N==null?void 0:N.backups)!=null?Rn:[]:Q,In=O?($n=N==null?void 0:N.safetyCopy)!=null?$n:null:p,Nn=n(()=>{var r;return new Map([...pe,...(r=N==null?void 0:N.backups)!=null?r:[],...N!=null&&N.safetyCopy?[N.safetyCopy]:[]].map(u=>[u,K(u.marketplace_data.keys)]))},[pe,N]),Ge=r=>{var u;return(u=Nn.get(r))!=null?u:K(r.marketplace_data.keys)},Fo=r=>Ge(r).map(u=>u.key),Yo=r=>Ge(r).length,Y=n(()=>te&&b?rn(Ge(b),b.spicetify_config,x,U):null,[te,b,Nn,x,U]),W=n(()=>Y?mo(Y.items):null,[Y]),Wo=n(()=>new Map([...ze!=null?ze:[],...W!=null?W:[]]),[ze,W]),Mt=n(()=>_i(),[]),Tn=n(()=>xo()!==null,[]),j=l==="loading",Je=(y==null?void 0:y.kind)==="warning"||(y==null?void 0:y.kind)==="error"?y:null,Pn=!!(T&&C&&T.payload_hash!==C),ve=!!(T&&C&&T.payload_hash===C),An=!!(b&&C&&b.payload_hash===C),Bt=O!==null||qe||!ve||pe.length<2,zo=Bt?At:At.slice(0,1),Dt=(xe==null?void 0:xe.status)==="pending"&&!xe.mine?xe:null,qo=ya(ie,M,Dt!==null),Ot=(xn?((jn=ie==null?void 0:ie.accounts)!=null?jn:[]).filter(r=>r.status==="final"):[]).map((r,u)=>({hash:r.hash,label:`Spotify account ${u+1}${r.device_info?` \xB7 from ${r.device_info}`:""}`})).filter(r=>r.hash!==(ie==null?void 0:ie.hash)),Vo=!!(C&&k>0&&!pe.some(r=>r.payload_hash===C));t(()=>($().catch(()=>null).then(r=>Ve(u=>u!=null?u:r)),oe({silent:!0}),Qo(),oo(Do)),[]),t(()=>{if(hn(null),!Y||!W)return;[...W.values()].some(xt)&&We(!0);let r=!0;return go(Y.items,W).then(u=>{r&&(hn(u),[...u.values()].some(xt)&&We(!0))}),()=>{r=!1}},[Y,W]),t(()=>{if(!F)return;let r=u=>{var P;if(!((P=_n.current)!=null&&P.isConnected)){fe(!1),de(null);return}u.preventDefault(),u.stopImmediatePropagation();let h=xi(u);if(h.kind!=="ignore"){if(h.kind==="cancel"){fe(!1),de(null);return}if(h.kind==="error"){de(h.message);return}if(vi(h.shortcut)){de(`${Pe(h.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}fe(!1),Lt(h.shortcut)}};return window.addEventListener("keydown",r,!0),()=>window.removeEventListener("keydown",r,!0)},[F,s]);async function Mn(){let r=await kt();return Fe(r.hash),f(r.installedItemCount),B(r.installedItems),X(r.items),He(r.spicetifyConfig),ye(r.marketplaceAvailable),r}async function oe(r){try{D(!1),c("loading"),r!=null&&r.silent||d({kind:"info",text:"Checking your Syncify backup\u2026"}),await Mn();let u,h=null;try{u=await ke(s)}catch($t){if(!($t instanceof V))throw $t;u=Ea,h=$t.code}let P=await $().catch(()=>null),Qe=P?await Ji(s).catch(()=>null):null,Ce=P?await $().catch(()=>null):null;Ve(Ce),vn(Ce?Qe:null),Ro(h),h&&kn("account"),$o(u.claim),Tt(null),Pt(null),Ye(u.payload),we(u.backups),S(u.safetyCopy),I(u.payload),ee(!0),c(u.exists?"success":"idle"),!(r!=null&&r.silent)&&!h&&d(u.exists&&u.payload?{kind:"success",text:`Backup found from ${be(u.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(u){Xe(u)}}async function Bn(){Cn(!0),Nt(null);try{await Xi(s)}catch(r){r instanceof G&&["claim_pending","claimed","claim_disputed"].includes(r.code)||Nt(r instanceof Error?r.message:String(r))}finally{await oe({silent:!0}),Cn(!1)}}function Go(r){Ve(r),!M&&T?Bn():oe({silent:!0})}function Jo(){Ve(null),vn(null),Nt(null),oe({silent:!0})}async function Xo(){En(!0);try{await Zi(s),Spicetify.showNotification("Syncify: claim cancelled"),await oe({silent:!0})}catch(r){d({kind:"error",text:r instanceof Error?r.message:String(r)})}finally{En(!1)}}async function Zo(r){if(D(!1),Tt(r),Pt(null),!r){I(T);return}I(null);try{let u=await ke(s,r);Pt(u),I(u.payload)}catch(u){Tt(null),I(T),Xe(u)}}async function Qo(){let r=R.version;if(!pn(r))return;let u=await vo(R.releasesUrl);u&&mn(u,r)>0&&Uo(u)}function es(r){let u=w(m({},s),{autoBackupEnabled:r});a(u),pt(u),d({kind:"success",text:r?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}function Lt(r){let u=w(m({},s),{shortcut:r});a(u),pt(u),Qt(r),de(null),d({kind:"success",text:r?`${Pe(r)} now opens Syncify.`:"Keyboard shortcut turned off."})}function ts(r){let u=w(m({},s),{entryPoint:r});a(u),pt(u),yt(r)}function Dn(r){kn(r),r!=="settings"&&fe(!1)}function ns(){de(null),fe(!0)}async function is(){try{D(!1),c("loading"),d({kind:"info",text:"Backing up your extensions and themes\u2026"});let{payload:r,unchanged:u}=await bt(s);if(await Mn(),u){ee(!0),c("success"),d({kind:"success",text:"Everything is already backed up."}),Spicetify.showNotification("Syncify: everything is already backed up");return}Ye(r),we(h=>[r,...h.filter(P=>P.payload_hash!==r.payload_hash)].slice(0,Ca)),S(h=>(h==null?void 0:h.payload_hash)===r.payload_hash?null:h),I(r),ee(!0),c("success"),d({kind:"success",text:`Backed up ${r.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(r){Xe(r)}}function os(r=b){if(Z===!1){let u="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";d({kind:"error",text:u}),Spicetify.showNotification(u,!0,6e3);return}if(!r){let u="No Syncify cloud backup was found for this Spotify account.";d({kind:"error",text:u}),Spicetify.showNotification(u,!0,6e3);return}I(r),We(!1),D(!0)}async function ss(){let r=b?rn(Ge(b),b.spicetify_config,x,U).manual:[];try{D(!1),c("loading"),d({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:u,restoredCount:h}=await Gi(s,b!=null?b:void 0,O!=null?O:void 0);I(u),c("success"),d({kind:"success",text:`Restored ${h} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),dn(r),setTimeout(()=>window.location.reload(),1e3)}catch(u){Xe(u)}}async function rs(r){var u;try{await navigator.clipboard.writeText(r)}catch(h){let P=(u=Spicetify.Platform)==null?void 0:u.ClipboardAPI;if(!(P!=null&&P.copy))return;await P.copy(r)}bn(!0),setTimeout(()=>bn(!1),2e3)}function z(r){if(r.startsWith("mailto:")){window.location.href=r;return}window.open(r,"_blank","noopener,noreferrer")}function Xe(r){if(c("error"),r instanceof Ne){Lo(!0),d(null);return}if(r instanceof V&&r.code!=="not_linked"){d(null),oe({silent:!0});return}let u=r instanceof Error?r.message:String(r);d({kind:"error",text:u}),Spicetify.showNotification(u,!0,6e3)}function On(r,u){let h=(b==null?void 0:b.payload_hash)===r.payload_hash,P=r.payload_hash===C,Qe=be(r.metadata.last_sync_datetime),Ce=No(Yo(r));return e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":h,"data-selected":h?"true":"false",type:"button",key:`${r.payload_hash}-${r.metadata.last_sync_datetime}`,title:u!=null&&u.isSafetyCopy?"Kept aside and updated about once a week, so a burst of new backups can't replace it":void 0,onClick:()=>{I(r),D(!1)},disabled:j},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),u!=null&&u.isSafetyCopy?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Safety copy"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 updated weekly")),e.createElement("span",{className:"syncify-muted"},Qe," \xB7 ",Ce)):e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-backup-date"},Qe),e.createElement("span",{className:"syncify-muted"},Ce," \xB7 from ",r.metadata.device_info)),P?e.createElement("span",{className:"syncify-tag",title:"What's on this device now"},"Current"):null,u!=null&&u.isSafetyCopy?e.createElement(Sa,null):null)}function Ut(r){r.stopPropagation()}let as=ne?"Update Syncify to keep backing up":M?"Sign in to restore":A?T?Pn?"Changes since your last backup":"Everything is backed up":"No backup yet":l==="error"?"Couldn't check your backup":"Checking your backup\u2026",Ln=ne?"Your backups are safe":M?M==="not_owner"?"Secured by another account":"This backup is secured":A?T?Pn?Ia(T,Fo(T),g,U):`Last backup ${be(T.metadata.last_sync_datetime)}`:"Save your extensions and themes so you can restore them after a reinstall or on another computer.":null,Un=!!(E&&!ne&&Date.now()-E.at<va),Ze=!!(E&&E.loaded===E.total),Rt=lo((Kn=E==null?void 0:E.manual)!=null?Kn:[]);return e.createElement("div",{className:"syncify-panel",ref:_n,onClick:Ut,onMouseDown:Ut,onPointerDown:Ut},ne?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,"This version of Syncify is no longer supported."),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>z(`${R.githubUrl}#updating`)},"How to update")):null,Dt?e.createElement("div",{className:"syncify-alert",role:"alert"},e.createElement("span",null,(Hn=Dt.email)!=null?Hn:"Someone"," is claiming this backup."),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Xo()},disabled:Ho},"Not me, cancel it")):null,Rt.length>0?e.createElement("div",{className:"syncify-alert syncify-manual",role:"status"},e.createElement("span",{className:"syncify-manual-header"},e.createElement("span",null,E.manual.length===1?"1 isn't from Marketplace. Add it in a terminal:":`${E.manual.length} aren't from Marketplace. Add them in a terminal:`),e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:so},e.createElement(Io,null))),e.createElement("span",{className:"syncify-code"},e.createElement("code",null,Rt.join(`
`)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{rs(Rt.join(`
`))}},Oo?"Copied":"Copy"))):null,Je?e.createElement("div",{className:"syncify-alert","data-kind":Je.kind},e.createElement("span",null,Je.text),e.createElement("span",{className:"syncify-alert-actions"},Je.kind==="error"?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{oe()},disabled:j},"Try again"):null,e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>d(null)},e.createElement(Io,null)))):null,e.createElement("section",{className:"syncify-status","aria-live":"polite"},Un&&E?e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},Ze?"Backup restored":`Restored ${E.loaded} of ${E.total}`),e.createElement("p",{className:"syncify-muted"},Ze?E.total===0?"Nothing from Marketplace to load":`${E.loaded} of ${E.total} loaded`:"Missing something? Reload Spotify once more."),Ze?e.createElement("p",{className:"syncify-muted"},"Syncify saved your setup?"," ",e.createElement("button",{className:"syncify-text-button syncify-inline-button",type:"button",onClick:()=>z(R.kofiUrl)},"Support it on Ko-fi")):null):e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},as),e.createElement("p",{className:"syncify-muted"},Ln?`${Ln} \xB7 `:"",No(k)," on this device")),Un&&!Ze?e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:ro},"Reload"):e.createElement("button",{className:"syncify-button",type:"button",onClick:is,disabled:j||ve||ne||M!==null,title:M?"Sign in to back up":ve?"No changes since your last backup":void 0},j?"Working\u2026":ve?"Backed up":"Back up now")),M||Q.length>0||Ot.length>0?e.createElement("section",{className:"syncify-section","aria-label":"Backups"},e.createElement("div",{className:"syncify-section-header"},e.createElement("h4",{className:"syncify-section-title"},"Backups"),e.createElement("span",{className:"syncify-section-controls"},!O&&ve&&pe.length>1?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":qe,"aria-controls":"syncify-backup-list",onClick:()=>{Bo(!qe),D(!1)}},qe?"Show less":`Show all ${pe.length}`,e.createElement(je,null)):null,!M&&Ot.length>0?e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select","aria-label":"Show backups from",value:O!=null?O:"",onChange:r=>{Zo(r.currentTarget.value||null)},disabled:j},e.createElement("option",{value:""},"This Spotify account"),Ot.map(r=>e.createElement("option",{key:r.hash,value:r.hash},r.label))),e.createElement(je,null)):null)),M?e.createElement("p",{className:"syncify-locked"},e.createElement(ba,null),e.createElement("span",null,M==="not_owner"?"Sign in with the account that secured them":"Sign in to see and restore your backups")):O&&!N?e.createElement("p",{className:"syncify-muted"},"Loading backups\u2026"):At.length===0?e.createElement("p",{className:"syncify-muted"},"No backups yet."):e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-list",id:"syncify-backup-list",role:"radiogroup","aria-label":"Choose a backup to restore"},zo.map(r=>On(r)),Bt&&In?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),On(In,{isSafetyCopy:!0})):null),Bt?Z===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to restore a backup."):te?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},"Restore"," ",b?be(b.metadata.last_sync_datetime):"this backup","?"),Y?e.createElement(ca,{preview:Y,checks:Wo,expanded:gn,onToggle:()=>We(!gn)}):null,e.createElement("div",{className:"syncify-actions"},Vo?e.createElement("div",{className:"syncify-alert syncify-actions-hint"},"Your current setup isn't backed up."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>D(!1),disabled:j},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:ss,disabled:j},"Restore"))):e.createElement("div",{className:"syncify-actions"},An?e.createElement("span",{className:"syncify-muted syncify-actions-hint"},"This backup is already current."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>os(),disabled:j||!b||An},"Restore backup")):null)):null,e.createElement("div",{className:"syncify-accordion"},e.createElement(_o,{id:"account",title:"Account",openSection:Sn,onToggle:Dn},e.createElement(fa,{session:xn,locked:M,secure:qo,securing:jo,secureError:Ko,onSecure:()=>{Bn()},onSignedIn:Go,onSignedOut:Jo,onOpenWebsite:z,onReportIssue:()=>z(R.issueUrl)})),e.createElement(_o,{id:"settings",title:"Settings",openSection:Sn,onToggle:Dn},e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Back up automatically"),e.createElement("span",{className:"syncify-muted"},"When Spotify starts and something has changed")),e.createElement("input",{className:"syncify-switch",type:"checkbox",role:"switch",checked:s.autoBackupEnabled&&!ne,onChange:r=>es(r.currentTarget.checked),disabled:j||ne})),e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Open Syncify from"),Mt?s.entryPoint==="menu"&&!s.shortcut?e.createElement("span",{className:"syncify-muted"},"Keep a shortcut in case a Spotify update breaks the menu"):null:e.createElement("span",{className:"syncify-muted"},"The profile menu isn't available in this Spicetify version")),e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select",value:Mt?s.entryPoint:"topbar",onChange:r=>ts(r.currentTarget.value),disabled:!Mt},_a.map(r=>e.createElement("option",{key:r.value,value:r.value},r.label))),e.createElement(je,null))),e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Keyboard shortcut"),F&&!It?e.createElement("span",{className:"syncify-muted"},"Press a key combination, or Esc to cancel"):null),e.createElement("span",{className:"syncify-shortcut"},s.shortcut&&!F?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Lt(null)},"Turn off"):null,!s.shortcut&&!F?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Lt(he)},"Use default"):null,e.createElement("button",{className:"syncify-key",type:"button","data-recording":F?"true":"false",onClick:()=>F?fe(!1):ns(),title:"Click to change"},F?"Press keys\u2026":s.shortcut?Pe(s.shortcut):"Off"))),It?e.createElement("div",{className:"syncify-alert",role:"alert"},It):null)),e.createElement("footer",{className:"syncify-footer"},e.createElement("span",{className:"syncify-footer-version"},e.createElement("span",null,"Syncify ",R.version),wn?e.createElement("button",{className:"syncify-text-button syncify-update",type:"button",onClick:()=>Tn?window.location.reload():z(`${R.githubUrl}#updating`)},wn," is out \xB7 ",Tn?"Reload":"How to update"):null),e.createElement("span",{className:"syncify-footer-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>z(R.issueUrl)},"Report an issue"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>z(R.githubUrl)},"GitHub"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>z(R.kofiUrl)},"Support on Ko-fi"))))}var Co={added:{mark:"+",label:"Added"},removed:{mark:"\u2212",label:"Removed"},unchanged:{mark:"=",label:"Unchanged"}},ra=[["extension","Extensions"],["theme","Themes"],["snippet","Snippets"]],aa={extension:"extension",custom_app:"custom app",theme:"theme"};function ca(e){let t=Spicetify.React,{items:n,counts:i,manual:o}=e.preview;return t.createElement(t.Fragment,null,t.createElement("div",{className:"syncify-chips","aria-label":"What changes on this device"},i.added?t.createElement("span",{className:"syncify-chip","data-change":"added"},"+",i.added," added"):null,i.removed?t.createElement("span",{className:"syncify-chip","data-change":"removed"},"\u2212",i.removed," removed"):null,i.unchanged?t.createElement("span",{className:"syncify-chip"},i.unchanged," unchanged"):null,o.length?t.createElement("span",{className:"syncify-chip"},o.length," to add manually"):null),n.length||o.length?t.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":e.expanded,"aria-controls":"syncify-restore-changes",onClick:e.onToggle},e.expanded?"Hide changes":"Show changes",t.createElement(je,null)):null,e.expanded?t.createElement("div",{className:"syncify-changes",id:"syncify-restore-changes"},ra.map(([s,a])=>{let l=n.filter(c=>c.type===s);return l.length===0?null:t.createElement("section",{key:s,"aria-label":a},t.createElement("h5",{className:"syncify-change-group"},a),t.createElement("ul",{className:"syncify-change-list"},l.map(c=>t.createElement("li",{className:"syncify-change",key:c.key},t.createElement("span",{className:"syncify-mark","data-change":c.change,role:"img","aria-label":Co[c.change].label},Co[c.change].mark),t.createElement("span",{className:"syncify-change-name"},c.name,c.repo?t.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",c.repo):null),e.checks.has(c.key)?t.createElement(ua,{check:e.checks.get(c.key)}):null))))}),o.length?t.createElement("section",{"aria-label":"Add manually"},t.createElement("h5",{className:"syncify-change-group"},"Add manually"),t.createElement("ul",{className:"syncify-change-list"},o.map(s=>t.createElement("li",{className:"syncify-change",key:`${s.type}:${s.name}`},t.createElement("span",{className:"syncify-mark","aria-hidden":"true"}),t.createElement("span",{className:"syncify-change-name"},s.name,t.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",aa[s.type],s.scheme?`, ${s.scheme}`:"")))))):null):null)}var la={host:"Loads from outside GitHub",repo:"Its code is in a different repo than the one it names",blocked:"On Marketplace's block list",catalog:"Not in Marketplace's catalog",unchecked:"GitHub couldn't be reached to check it",custom:"A snippet made in Marketplace, not from its list"};function ua(e){let t=Spicetify.React,{check:n}=e,i=xt(n),o=n.kind==="host"?`Code from ${n.host}`:n.kind==="repo"?`Code from ${n.repo}`:n.kind==="blocked"?"Blocked by Marketplace":n.kind==="catalog"?"Not in Marketplace":n.kind==="unchecked"?"Not checked":"Custom";return t.createElement("span",{className:"syncify-source","data-warning":i?"true":"false",title:la[n.kind]},i?t.createElement(ka,null):null,o)}function ya(e,t,n){var a,l;if(t==="not_owner")return{kind:"other-account"};if(!e)return n?{kind:"other-claim"}:{kind:"unknown"};let{claim:i}=e;if((i==null?void 0:i.status)==="final"){if(!i.mine)return{kind:"other-account"};let c=((a=e.accounts)!=null?a:[]).filter(y=>y.status==="final").length;return{kind:"secured",linkedCount:Math.max(c,1)}}if((i==null?void 0:i.status)==="pending")return i.mine?{kind:"pending",finalAt:i.final_at}:{kind:"other-claim"};if(e.disputed)return{kind:"disputed"};let o=((l=e.accounts)!=null?l:[]).filter(c=>c.hash===e.hash),s=o[o.length-1];return(s==null?void 0:s.status)==="cancelled"&&s.cancelled_by==="owner"?{kind:"cancelled"}:{kind:"open"}}function fa(e){let t=Spicetify.React,n=t.useEffect,i=t.useState,{session:o,secure:s}=e,[a,l]=i(()=>at()),[c,y]=i(()=>at().email),[d,k]=i(""),[f,g]=i(!1),[B,x]=i(null),[X,U]=i(()=>Date.now()),He=!!(a.codeSentAt&&X-a.codeSentAt<da),Z=Math.max(0,Math.ceil((a.retryAt-X)/1e3)),ye=a.retryEmail===null||a.retryEmail===c.trim().toLowerCase()?Z:0;n(()=>{if(!o)return;let p=!0;return ai().then(S=>{!p||S||(x({kind:"warning",text:Ie(new v("signed_out"))}),e.onSignedOut())}).catch(()=>{}),()=>{p=!1}},[o==null?void 0:o.token]),n(()=>{if(a.retryAt<=Date.now())return;let p=setInterval(()=>{U(Date.now()),a.retryAt<=Date.now()&&clearInterval(p)},1e3);return()=>clearInterval(p)},[a.retryAt]);function C(p){let S=m(m({},at()),p);ii(S),l(S),U(Date.now())}async function Fe(p){var b;let S=p.trim();if(!ma.test(S)){x({kind:"error",text:"Enter a valid email address."});return}g(!0),x(null);try{let I=await si(S);C({email:S,codeSentAt:Date.now(),retryAt:Date.now()+I*1e3,retryEmail:S.toLowerCase()}),k("")}catch(I){let A=I instanceof v?I:null,ee=(b=A==null?void 0:A.retryAfter)!=null?b:null,te=ee&&ee<=pa?Date.now()+ee*1e3:0,D=(A==null?void 0:A.code)==="too_many_requests"?null:S.toLowerCase();if((A==null?void 0:A.code)==="resend_wait"){C({email:S,codeSentAt:a.email===S&&a.codeSentAt?a.codeSentAt:Date.now(),retryAt:te,retryEmail:D});return}te&&C({retryAt:te,retryEmail:D}),x({kind:"error",text:Ie(I)})}finally{g(!1)}}async function T(){g(!0),x(null);try{let p=await ri(a.email,d);C({codeSentAt:null}),k(""),e.onSignedIn(p)}catch(p){x({kind:"error",text:Ie(p)});let S=p instanceof v?p.code:null;(S==="too_many_attempts"||S==="code_expired")&&k("")}finally{g(!1)}}async function Ye(){var S;let p=(S=o==null?void 0:o.email)!=null?S:"";g(!0),x(null),await ci(),C({email:p,codeSentAt:null}),y(p),g(!1),e.onSignedOut()}async function Q(){g(!0),x(null);try{e.onOpenWebsite(await li())}catch(p){let S=p instanceof v&&p.code==="signed_out";x({kind:S?"warning":"error",text:Ie(p)}),S&&e.onSignedOut()}finally{g(!1)}}let we=B?t.createElement("div",{className:"syncify-alert","data-kind":B.kind==="error"?"error":void 0,role:"alert"},B.text):null;if(o===void 0)return null;if(o){let p=s.kind==="open"||s.kind==="other-claim"||s.kind==="cancelled"||s.kind==="disputed";return t.createElement(t.Fragment,null,t.createElement("div",{className:"syncify-setting"},t.createElement("span",{className:"syncify-setting-text"},t.createElement("span",{className:"syncify-account-email"},o.email),s.kind==="secured"?t.createElement("span",{className:"syncify-muted"},"Backup secured \xB7"," ",s.linkedCount===1?"1 Spotify account linked":`${s.linkedCount} Spotify accounts linked`):s.kind==="pending"?t.createElement("span",{className:"syncify-muted syncify-account-state"},t.createElement(wa,null),t.createElement("span",null,"Securing this backup \xB7 final ",ha(s.finalAt))):s.kind==="other-account"?t.createElement("span",{className:"syncify-muted"},"This backup is secured by another account"):t.createElement("span",{className:"syncify-muted"},"Signed in")),t.createElement("span",{className:"syncify-account-actions"},t.createElement("button",{className:"syncify-button secondary syncify-manage",type:"button","aria-label":"Manage on the website",onClick:()=>{Q()},disabled:f},"Manage",t.createElement(xa,null)),t.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{Ye()},disabled:f},"Sign out"))),p?t.createElement("div",{className:"syncify-setting"},t.createElement("span",{className:"syncify-setting-text"},t.createElement("span",null,"Secure your backup"),t.createElement("span",{className:"syncify-muted"},"So only you can restore it")),t.createElement("button",{className:"syncify-button",type:"button",onClick:e.onSecure,disabled:f||e.securing||s.kind==="other-claim"||s.kind==="disputed"},e.securing?"Securing\u2026":s.kind==="cancelled"?"Secure again":"Secure")):null,s.kind==="other-claim"?t.createElement("div",{className:"syncify-alert",role:"status"},"Another claim is pending. Cancel it above to secure this backup yourself."):s.kind==="cancelled"?t.createElement("div",{className:"syncify-alert",role:"status"},"Your claim was cancelled from this Spotify account."):s.kind==="disputed"?t.createElement("div",{className:"syncify-alert",role:"status"},t.createElement("span",null,"This backup can't be secured for now."),t.createElement("button",{className:"syncify-text-button",type:"button",onClick:e.onReportIssue},"Report an issue")):null,e.secureError?t.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.secureError):null,we)}return t.createElement(t.Fragment,null,t.createElement("div",{className:"syncify-setting"},e.locked?t.createElement("span",{className:"syncify-setting-text"},t.createElement("span",null,"Sign in to restore"),t.createElement("span",{className:"syncify-muted"},"With the email that secured this backup")):t.createElement("span",{className:"syncify-setting-text"},t.createElement("span",null,"Secure your backup"),t.createElement("span",{className:"syncify-muted"},"So only you can restore it"))),t.createElement("form",{className:"syncify-confirm",noValidate:!0,onSubmit:p=>{p.preventDefault(),!f&&(He?d.length===vt&&T():ye||Fe(c))}},He?t.createElement(t.Fragment,null,t.createElement("p",{className:"syncify-muted"},"Code sent to ",ga(a.email)),t.createElement("div",{className:"syncify-field"},t.createElement("input",{className:"syncify-input syncify-code-input",type:"text",inputMode:"numeric",autoComplete:"one-time-code","aria-label":"6-digit code",placeholder:"123456",maxLength:vt,value:d,onChange:p=>k(p.currentTarget.value.replace(/\D/g,"").slice(0,vt)),autoFocus:!0}),t.createElement("button",{className:"syncify-button",type:"submit",disabled:f||d.length!==vt},f?"Verifying\u2026":"Verify")),t.createElement("p",{className:"syncify-muted syncify-account-links"},t.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Fe(a.email)},disabled:f||Z>0},Z>0?`Resend in ${Eo(Z)}`:"Resend code"),t.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{C({codeSentAt:null}),k(""),x(null)},disabled:f},"Use another email"))):t.createElement(t.Fragment,null,t.createElement("div",{className:"syncify-field"},t.createElement("input",{className:"syncify-input",type:"email",autoComplete:"email","aria-label":"Email",placeholder:"you@example.com",value:c,onChange:p=>y(p.currentTarget.value),autoFocus:!0}),t.createElement("button",{className:"syncify-button",type:"submit",disabled:f||ye>0||!c.trim()},f?"Sending\u2026":"Send code")),t.createElement("p",{className:"syncify-muted"},ye>0?`Send another code in ${Eo(ye)}`:"We only email sign-in codes.")),we))}var vt=6,da=600*1e3,pa=300,ma=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function ga(e){let t=e.lastIndexOf("@");return t<1?e:`${e[0]}***${e.slice(t)}`}function ha(e){let t=be(new Date(e).toISOString());return t.startsWith("today")?t:`on ${t}`}function Eo(e){return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function _o(e){let t=Spicetify.React,n=e.openSection===e.id,i=`syncify-section-${e.id}`;return t.createElement("section",{className:"syncify-accordion-section","aria-label":e.title},t.createElement("button",{className:"syncify-accordion-header",type:"button","aria-expanded":n,"aria-controls":i,onClick:()=>e.onToggle(n?null:e.id)},t.createElement("span",{className:"syncify-accordion-title"},e.title),t.createElement(je,null)),n?t.createElement("div",{className:"syncify-accordion-body",id:i},e.children):null)}function Sa(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-shield",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"}))}function ka(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-warning-icon",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M12 3 2 21h20z"}),e.createElement("path",{d:"M12 10v5"}),e.createElement("path",{d:"M12 18h.01"}))}function je(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-chevron",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"m9 6 6 6-6 6"}))}function ba(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-lock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("rect",{x:"5",y:"11",width:"14",height:"10",rx:"2"}),e.createElement("path",{d:"M8 11V7a4 4 0 0 1 8 0v4"}))}function wa(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-clock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("circle",{cx:"12",cy:"12",r:"9"}),e.createElement("path",{d:"M12 7v5l3 2"}))}function xa(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-external",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M14 4h6v6"}),e.createElement("path",{d:"M20 4 10 14"}),e.createElement("path",{d:"M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"}))}function Io(){let e=Spicetify.React;return e.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M18 6 6 18"}),e.createElement("path",{d:"m6 6 12 12"}))}var va=600*1e3,Ca=3,Ea={exists:!1,payload:null,backups:[],safetyCopy:null,claim:null},_a=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function Ia(e,t,n,i){var B;let o=new Set(t),s=new Set(n),a=n.filter(x=>!o.has(x)).length,l=t.filter(x=>!s.has(x)).length,c=(B=e.spicetify_config)!=null?B:null,y=!!(i&&!c),d=!y&&(i&&c?!Ai(i,c):i!==c),k=[a?`${a} added`:null,l?`${l} removed`:null,d?"Spicetify config changed":null].filter(Boolean),f=be(e.metadata.last_sync_datetime),g=k.length?`${k.join(", ")} since ${f}`:`Last backup ${f}`;return y?`${g} \xB7 Spicetify config not saved yet`:g}function No(e){return e===1?"1 extension or theme":`${e} extensions and themes`}function be(e){let t=new Date(e);if(Number.isNaN(t.getTime()))return e;let n=t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),i=new Date,o=new Date(i);return o.setDate(i.getDate()-1),t.toDateString()===i.toDateString()?`today, ${n}`:t.toDateString()===o.toDateString()?`yesterday, ${n}`:`${t.toLocaleDateString(void 0,{month:"short",day:"numeric",year:t.getFullYear()===i.getFullYear()?void 0:"numeric"})}, ${n}`}var Ct="[Syncify]";function H(e,t){if(t===void 0){console.debug(Ct,e);return}console.debug(Ct,e,t)}function Ke(e,t){if(t===void 0){console.warn(Ct,e);return}console.warn(Ct,e,t)}function Na(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var Ao="syncify-styles";function Ta(){if(document.getElementById(Ao)){H("Another copy of Syncify is running; stopping this one");return}Pa();let e=Se();Ii({topbarButton:Aa(),menuItem:Ua()}),yt(e.entryPoint),Zt(e.shortcut,_t),Qi().catch(t=>{Ke("Startup sync check failed",t)}),co().catch(t=>{Ke("Restore check failed",t)})}function Pa(){let e=document.createElement("style");e.id=Ao,e.textContent=Wn,document.head.appendChild(e)}function Aa(){let{extensionName:e}=_(),t=new Spicetify.Topbar.Button(e,jt,n=>{H("Topbar button clicked",Et(n)),_t()},!1,!0);return Mo(t),Da(t),$a(t),H("Topbar button registered",Et(t)),t}function Mo(e){var n;let t=e;e.element.style.setProperty("-webkit-app-region","no-drag"),(n=t.button)==null||n.style.setProperty("-webkit-app-region","no-drag")}var Po=".main-actionButtons",Ma=".Root__globalNav, .Root__top-bar",Ba=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function Da(e){if(typeof MutationObserver=="undefined")return;let t=!1,n=null,i=()=>{t=!1,s();let a=e.element,l=document.querySelector(Po);!a||!l||l.contains(a)||(l.prepend(a),Oa(e),Mo(e),H("Topbar button re-attached",Et(e)))},o=new MutationObserver(()=>{t||(t=!0,setTimeout(i,250))}),s=()=>{var c;if(n!=null&&n.isConnected)return;let a=document.querySelector(Po),l=(c=a==null?void 0:a.closest(Ma))!=null?c:a==null?void 0:a.parentElement;if(o.disconnect(),n=l!=null?l:null,!l){o.observe(document.body,{childList:!0,subtree:!0});return}o.observe(l,{childList:!0,subtree:!0});for(let y=l.parentElement;y;y=y.parentElement)o.observe(y,{childList:!0})};i()}function Oa(e){let t=La(e);if(!t||t.className&&t.className!=="undefined")return;let n=Array.from(document.querySelectorAll(Ba)).find(i=>!e.element.contains(i));n!=null&&n.className&&(t.className=n.className)}function La(e){return e.button}function Ua(){var e;if(typeof((e=Spicetify.Menu)==null?void 0:e.Item)!="function")return null;try{return new Spicetify.Menu.Item(_().extensionName,!1,()=>_t(),Ra())}catch(t){return Ke("Failed to create profile menu item",t),null}}function Ra(){return jt.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function $a(e){Object.assign(window,{SyncifyDebug:{button:e,element:e.element,openModal:_t,inspect:()=>Et(e),clickElement:()=>{var t;return(t=e.element)==null?void 0:t.click()},clickInnerButton:()=>{var t;return(t=e.button)==null?void 0:t.click()},clickCallback:()=>e.onClick(e)}})}function Et(e){var t,n,i,o,s;return{label:e.label,disabled:e.disabled,isRight:e.isRight,hasElement:!!e.element,elementConnected:(t=e.element)==null?void 0:t.isConnected,elementDisabled:(n=e.element)==null?void 0:n.disabled,elementAriaDisabled:(i=e.element)==null?void 0:i.getAttribute("aria-disabled"),elementClass:(o=e.element)==null?void 0:o.className,appRegion:e.element?getComputedStyle(e.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:e.button?getComputedStyle(e.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:e.element?getComputedStyle(e.element).pointerEvents:null,visibility:e.element?getComputedStyle(e.element).visibility:null,display:e.element?getComputedStyle(e.element).display:null,rect:(s=e.element)==null?void 0:s.getBoundingClientRect().toJSON()}}var L=null;function _t(){var t;if(L!=null&&L.container.isConnected){H("Closing modal"),Spicetify.PopupModal.hide();return}H("Opening modal"),(t=L==null?void 0:L.root)==null||t.unmount();let e=document.createElement("div");L={container:e,root:null};try{Spicetify.PopupModal.display({title:_().extensionName,content:e,isLarge:!1})}catch(n){throw Ke("Failed to open PopupModal",n),n}ja(e),Ha(e)}function ja(e){requestAnimationFrame(()=>{let t=Ka(e);t==null||t.classList.add("syncify-modal-shell");let n=t==null?void 0:t.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');n&&(n.classList.add("syncify-modal-close"),n.setAttribute("aria-label",`Close ${_().extensionName}`),n.title="Close",n.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function Ka(e){let t=e.parentElement;for(;t&&t!==document.body;){if(t.querySelector(".main-trackCreditsModal-header"))return t;t=t.parentElement}return e.closest('[class*="trackCreditsModal"]')}function Ha(e){try{let t=Spicetify.React.createElement(To);if(typeof Spicetify.ReactDOM.createRoot=="function"){let n=Spicetify.ReactDOM.createRoot(e);n.render(t),(L==null?void 0:L.container)===e&&(L.root=n),H("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(t,e),H("Modal rendered",{renderer:"render"})}catch(t){throw Ke("Failed to render modal",t),t}}ao();(function e(){if(!Na()){setTimeout(e,100);return}H("Spicetify APIs ready"),Ta()})();})();
