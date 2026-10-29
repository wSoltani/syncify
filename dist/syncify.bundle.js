// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var ms=Object.defineProperty,gs=Object.defineProperties;var hs=Object.getOwnPropertyDescriptors;var qn=Object.getOwnPropertySymbols;var Ss=Object.prototype.hasOwnProperty,ks=Object.prototype.propertyIsEnumerable;var Vn=(e,t,n)=>t in e?ms(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,m=(e,t)=>{for(var n in t||(t={}))Ss.call(t,n)&&Vn(e,n,t[n]);if(qn)for(var n of qn(t))ks.call(t,n)&&Vn(e,n,t[n]);return e},w=(e,t)=>gs(e,hs(t));var Gn=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var Ft=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var xs="syncify",ge="state";function Yt(){let e;try{e=window.indexedDB}catch(t){return Promise.resolve(null)}return e?new Promise(t=>{let n;try{n=e.open(xs,1)}catch(i){t(null);return}n.onupgradeneeded=()=>{n.result.createObjectStore(ge)},n.onerror=()=>t(null),n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}function Wt(e,t){let n=Yt().then(i=>new Promise((o,s)=>{if(!i){s(new Error("IndexedDB isn't available."));return}try{let r=i.transaction(ge,e),l=t(r.objectStore(ge));r.oncomplete=()=>{i.close(),o(l.result)},r.onerror=r.onabort=()=>{var c;i.close(),s((c=r.error)!=null?c:new Error("IndexedDB failed."))}}catch(r){i.close(),s(r)}}));return Promise.race([n,new Promise((i,o)=>setTimeout(()=>o(new Error("IndexedDB took too long.")),2e3))])}function tt(e){return Wt("readonly",t=>t.get(e))}async function nt(e,t){await Wt("readwrite",n=>n.put(t,e))}async function Jn(e){await Wt("readwrite",t=>t.delete(e))}var V={extensionName:"Syncify",version:"1.10.0",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com"};function _(){var t,n,i,o,s,r,l,c;let e=window.SyncifyConfig;return{extensionName:(t=ae(e==null?void 0:e.extensionName))!=null?t:V.extensionName,version:(n=Xn(e==null?void 0:e.version))!=null?n:V.version,workerUrl:(i=ae(e==null?void 0:e.workerUrl))!=null?i:V.workerUrl,webUrl:(o=ae(e==null?void 0:e.webUrl))!=null?o:V.webUrl,githubUrl:(s=ae(e==null?void 0:e.githubUrl))!=null?s:V.githubUrl,kofiUrl:(r=ae(e==null?void 0:e.kofiUrl))!=null?r:V.kofiUrl,issueUrl:(l=ae(e==null?void 0:e.issueUrl))!=null?l:V.issueUrl,releasesUrl:(c=ae(e==null?void 0:e.releasesUrl))!=null?c:V.releasesUrl}}function ae(e){return Xn(e)}function Xn(e){return typeof e=="string"&&e.trim()?e.trim():null}var vs="x-syncify-version",Cs="x-syncify-install",Es="x-syncify-timezone",Zn="install-id",Qn="syncify:install-id",_s=2e3,it=null;async function ei(){let e={[vs]:_().version,[Cs]:await Is()},t=Ps();return t&&(e[Es]=t),e}function Is(){return it!=null||(it=Ns().catch(()=>ot())),it}async function Ns(){let e=await Promise.race([Ts(),new Promise(t=>setTimeout(()=>t(null),_s))]);if(e)return e;try{let t=window.localStorage.getItem(Qn);if(t&&ti(t))return t;let n=ot();return window.localStorage.setItem(Qn,n),n}catch(t){return ot()}}async function Ts(){let e=await Yt();return e?new Promise(t=>{let n=null;try{let i=e.transaction(ge,"readwrite"),o=i.objectStore(ge),s=o.get(Zn);s.onsuccess=()=>{if(typeof s.result=="string"&&ti(s.result)){n=s.result;return}n=ot(),o.put(n,Zn)},i.oncomplete=()=>{e.close(),t(n)},i.onerror=i.onabort=()=>{e.close(),t(null)}}catch(i){e.close(),t(null)}}):null}function ot(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t=[...e].map(n=>n.toString(16).padStart(2,"0"));return[t.slice(0,4).join(""),t.slice(4,6).join(""),t.slice(6,8).join(""),t.slice(8,10).join(""),t.slice(10).join("")].join("-")}function ti(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(e)}function Ps(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(e){return null}}var As="syncify-signature-v1",Ms={name:"ECDSA",hash:"SHA-256"};function ni(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function ii(e){return zt(new Uint8Array(await crypto.subtle.exportKey("raw",e)))}async function st(e,t,n,i,o){let s=await Bs(t,n,i,o),r=await crypto.subtle.sign(Ms,e,s);return zt(new Uint8Array(r))}async function Bs(e,t,n,i){let{pathname:o,search:s}=new URL(n),r=new TextEncoder,l=zt(new Uint8Array(await crypto.subtle.digest("SHA-256",r.encode(i))));return r.encode([As,e,t.toUpperCase(),o+s,l].join(`
`))}function zt(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var oi="device-key",qt="session",si="salt",ce=null,Ee,ri={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function _e(e){if(ce)return ce;let t=await tt(oi);return Ds(t)?(ce=Promise.resolve(t),t):e?(ce=ni().then(async n=>(await nt(oi,n),n)),ce.catch(()=>{ce=null}),ce):null}async function $(){let e=await tt(qt);return Ls(e)?e:null}function Vt(e){return nt(qt,e)}async function le(){await Jn(qt).catch(()=>{})}async function rt(){if(Ee===void 0){let e=await tt(si).catch(()=>{});Ee=typeof e=="string"?e:null}return Ee}async function at(e){e!==Ee&&(Ee=e,await nt(si,e).catch(()=>{}))}function ct(){return ri}function ai(e){ri=e}function Ds(e){let t=e;return!!(t&&t.privateKey instanceof CryptoKey&&t.publicKey instanceof CryptoKey)}function Ls(e){let t=e;return!!(t&&typeof t.token=="string"&&t.token&&typeof t.email=="string")}var Os="/api/auth/email-otp/send-verification-otp",Us="/api/auth/sign-in/email-otp",$s="/api/auth/get-session",Ks="/api/auth/sign-out",Rs="/api/auth/link",js="x-syncify-device-key",Hs="x-syncify-signature",ci="x-syncify-salt",Fs="none",Ys={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again.",link_failed:"Couldn't open the website. Try again."},v=class extends Error{constructor(n,i=null){var o;super((o=Ys[n])!=null?o:"Sign-in failed. Try again.");this.code=n;this.retryAfter=i;this.name="AccountError"}};function Ie(e){return e instanceof v?e.message:"Sign-in failed. Try again."}async function li(e){let t=await lt(Os,{method:"POST",body:JSON.stringify({email:e,type:"sign-in"})});return typeof(t==null?void 0:t.resend_in)=="number"?t.resend_in:60}async function ui(e,t){var s;let n=await _e(!0).catch(()=>{throw new v("no_device_key")}),i=await lt(Us,{method:"POST",body:JSON.stringify({email:e,otp:t}),keys:n,sendPublicKey:!0});if(typeof(i==null?void 0:i.token)!="string"||!i.token)throw new v("sign_in_failed");let o={token:i.token,email:typeof((s=i.user)==null?void 0:s.email)=="string"?i.user.email:e};return await Vt(o).catch(()=>{throw new v("no_device_key")}),Gt=!0,o}var Gt=!1;async function yi(){var t;let e=await $();if(!e||Gt)return e;try{let n=await Jt(e,$s,"GET");Gt=!0;let i=(t=n==null?void 0:n.user)==null?void 0:t.email;if(typeof i!="string"||i===e.email)return e;let o=w(m({},e),{email:i});return await Vt(o).catch(()=>{}),o}catch(n){if(n instanceof v&&n.code==="signed_out")return null;throw n}}async function fi(){let e=await $().catch(()=>null);e&&await Jt(e,Ks,"POST").catch(()=>{}),await le()}async function di(){let e=await $();if(!e)throw new v("signed_out");let t=await Jt(e,Rs,"POST"),n=typeof(t==null?void 0:t.url)=="string"?t.url:"",i=new URL(_().webUrl).origin;if(!n.startsWith(`${i}/link#`))throw new v("link_failed");return n}async function Jt(e,t,n){let i=await _e(!1);if(!i)throw await le(),new v("signed_out");return lt(t,{method:n,token:e.token,keys:i})}async function lt(e,t,n=!1){var d,k,f;let i=`${_().webUrl.replace(/\/+$/,"")}${e}`,o={};if(t.body!==void 0&&(o["content-type"]="application/json"),t.token&&(o.authorization=`Bearer ${t.token}`),t.keys){let g=(d=await rt())!=null?d:Fs;o[ci]=g,o[Hs]=await st(t.keys.privateKey,g,t.method,i,(k=t.body)!=null?k:""),t.sendPublicKey&&(o[js]=await ii(t.keys.publicKey))}let s;try{s=await fetch(i,{method:t.method,headers:o,body:t.body})}catch(g){throw new v("offline")}let r=s.headers.get(ci);r&&await at(r);let l=await s.json().catch(()=>null);if(s.ok)return l;let c=typeof(l==null?void 0:l.code)=="string"?l.code:s.status===503?"unavailable":"failed";if(c==="stale_salt"&&t.keys&&!n)return lt(e,t,!0);c==="signed_out"&&await le();let y=Number(s.headers.get("retry-after"));throw new v(c,Number.isFinite(y)&&y>0?y:(f=Ws[c])!=null?f:null)}var Ws={resend_wait:60,too_many_requests:60,send_failed:60};var zs="x-syncify-user-hash",qs="x-syncify-identity",Vs="x-syncify-signature",pi="x-syncify-salt",Gs="none",Js="/restores",Xs="hash",mi=3,Ne=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}},H=class extends Error{constructor(n){super(n==="not_linked"?"Couldn't read that Spotify account's backups.":"Sign in to restore this backup.");this.code=n;this.name="LockedError"}};async function gi(e,t,n){let i=await ue(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(n)});if(!i.ok)throw new Error(`Backup failed with HTTP ${i.status}.`);let o=await i.json().catch(()=>null);return{unchanged:(o==null?void 0:o.unchanged)===!0}}async function Xt(e,t,n){var y,d,k;let i=await ue(e,t,{method:"GET"},Si("/",n));if(i.status===404){let f=await i.json().catch(()=>null);return{exists:!1,payload:null,backups:[],safetyCopy:null,claim:Te(f==null?void 0:f.claim)}}if(!i.ok)throw new Error(`Restore failed with HTTP ${i.status}.`);let o=await i.json(),s=Te(o.claim);delete o.claim;let r=[o,...(y=o.backup_history)!=null?y:[]];if(!r.every(f=>f.backup))return{exists:!0,payload:o,backups:r.slice(0,mi),safetyCopy:(d=r[mi])!=null?d:null,claim:s};let l=r.filter(f=>{var g;return((g=f.backup)==null?void 0:g.kind)==="rolling"}),c=(k=r.find(f=>{var g;return((g=f.backup)==null?void 0:g.kind)==="anchor"}))!=null?k:null;return l.length===0&&c?{exists:!0,payload:o,backups:[c],safetyCopy:null,claim:s}:{exists:!0,payload:o,backups:l,safetyCopy:c,claim:s}}async function hi(e,t,n,i){try{await ue(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:n}),keepalive:!0},Si(Js,i))}catch(o){}}async function ue(e,t,n,i="",o=!1){var g,D,x,Z;let s=i?`${e.replace(/\/+$/,"")}${i}`:e,r=(g=n.method)!=null?g:"GET",l=await $().catch(()=>null),c=l?await _e(!1).catch(()=>null):null,y={};if(l&&c){let U=(D=await rt())!=null?D:Gs;y.authorization=`Bearer ${l.token}`,y[pi]=U,y[Vs]=await st(c.privateKey,U,r,s,(x=n.body)!=null?x:"")}let d=await fetch(s,w(m({},n),{headers:m(w(m(m({},n.headers),await ei()),{[zs]:t.hash,[qs]:t.field}),y)})),k=d.headers.get(pi);if(k&&await at(k),d.status===426)throw new Ne;if(d.status!==401)return d;let f=(Z=await d.clone().json().catch(()=>null))==null?void 0:Z.code;if(!o){if(f==="stale_salt"&&l)return ue(e,t,n,i,!0);if(f==="signed_out"&&l)return await le(),ue(e,t,n,i,!0)}throw f==="claimed"||f==="not_owner"||f==="not_linked"?new H(f):(f==="signed_out"&&await le(),new v(typeof f=="string"?f:"failed"))}function Si(e,t){return t?`${e}?${Xs}=${encodeURIComponent(t)}`:e}function Te(e){let t=e;return!t||typeof t.mine!="boolean"?null:t.status==="final"?{status:"final",mine:t.mine}:t.status!=="pending"||typeof t.final_at!="number"?null:{status:"pending",mine:t.mine,email:typeof t.email=="string"?t.email:null,final_at:t.final_at,held:t.held===!0}}var ki="/claims",Zs="/claims/cancel",Qs={no_backup:"Back up first, then secure your backup.",unsupported_identity:"This Spotify account can't be secured.",too_many_accounts:"Your account already has 10 Spotify accounts linked.",offline:"Couldn't reach Syncify. Check your connection and try again."},G=class extends Error{constructor(n){var i;super((i=Qs[n])!=null?i:"Couldn't secure your backup. Try again.");this.code=n;this.name="ClaimError"}};async function bi(e,t){let n=await Zt(e,t,"GET",ki);if(!n.ok)throw new G(await Qt(n));let i=await n.json().catch(()=>null);return{claim:Te(i==null?void 0:i.claim),accounts:Array.isArray(i==null?void 0:i.accounts)?i.accounts.filter(er):null}}async function wi(e,t){let n=await Zt(e,t,"POST",ki);if(!n.ok)throw new G(await Qt(n));let i=await n.json().catch(()=>null);return Te(i==null?void 0:i.claim)}async function xi(e,t){let n=await Zt(e,t,"POST",Zs);if(!n.ok&&n.status!==404)throw new G(await Qt(n))}async function Zt(e,t,n,i){try{return await ue(e,t,{method:n},i)}catch(o){throw o instanceof TypeError?new G("offline"):o}}async function Qt(e){let t=await e.json().catch(()=>null);return typeof(t==null?void 0:t.code)=="string"?t.code:"failed"}function er(e){let t=e;return!!(t&&typeof t.hash=="string"&&(t.status==="pending"||t.status==="final"||t.status==="cancelled"))}var Se={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},tr=/^([a-z0-9]|f([1-9]|1[0-2]))$/,nr=250,ir=40,en=null,ut=null,he=null;function vi(){return/mac/i.test(navigator.platform||navigator.userAgent)}function Ci(e){if(e===null)return null;if(!e||typeof e!="object")return Se;let t=e;return typeof t.key!="string"||!tr.test(t.key)?Se:{key:t.key,ctrl:!!t.ctrl,alt:!!t.alt,shift:!!t.shift,meta:!!t.meta}}function Pe(e){if(!e)return"Off";let t=e.key.toUpperCase();return vi()?[e.ctrl?"\u2318":"",e.alt?"\u2325":"",e.shift?"\u21E7":"",t].join(""):[e.ctrl&&"Ctrl",e.meta&&"Win",e.alt&&"Alt",e.shift&&"Shift",t].filter(Boolean).join("+")}function Ei(e){if(e.key==="Escape")return{kind:"cancel"};let t=or(e.code);if(!t)return{kind:"ignore"};let n=vi();if(n&&e.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:t,ctrl:n?e.metaKey:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:n?!1:e.metaKey},o=t.startsWith("f")&&t.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!o?{kind:"error",message:`Include ${n?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function or(e){var n,i;let t=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(e);return t?((i=(n=t[1])!=null?n:t[2])!=null?i:t[3]).toLowerCase():null}function _i(e){var t;if(he&&sr(he,e))return!1;try{let n=Spicetify.Mousetrap,i=(t=n.trigger)==null?void 0:t.call(n)._directMap;if(!i)return!1;let o=tn(e);return Object.keys(i).some(s=>s.startsWith(`${o}:`))}catch(n){return!1}}function nn(e,t,n=0){if(en=t,ut=e,!Ii()){if(n>=ir){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>nn(ut,t,n+1),nr);return}on(ut)}function on(e){if(ut=e,!Ii()||!en)return;let t=en;try{if(he&&Spicetify.Keyboard._deregisterShortcut(he),he=null,!e)return;Spicetify.Keyboard.registerShortcut(e,n=>{n.preventDefault(),t()}),he=e,console.debug("[Syncify]","Keyboard shortcut registered",Pe(e))}catch(n){console.warn("[Syncify]","Failed to register keyboard shortcut",n)}}function Ii(){var e;return typeof((e=Spicetify.Keyboard)==null?void 0:e.registerShortcut)=="function"}function tn(e){return[e.ctrl&&"mod",e.meta&&"meta",e.alt&&"alt",e.shift&&"shift",e.key].filter(Boolean).join("+")}function sr(e,t){return tn(e)===tn(t)}var sn="both",rr=["both","topbar","menu"],Ae=null,Me=null,yt=!1;function Ni(e){return rr.includes(e)?e:sn}function Ti(){var e;return typeof((e=Spicetify.Menu)==null?void 0:e.Item)=="function"}function Pi(e){Ae=e.topbarButton,Me=e.menuItem}function ft(e){let t=e!=="menu"||!Me,n=e!=="topbar";if(Ae!=null&&Ae.element&&(Ae.element.style.display=t?"":"none"),!!Me)try{n&&!yt?(Me.register(),yt=!0):!n&&yt&&(Me.deregister(),yt=!1)}catch(i){console.warn("[Syncify]","Failed to update profile menu item",i)}}var pt="syncify:config",dt={workerUrl:_().workerUrl,autoBackupEnabled:!1,shortcut:Se,entryPoint:sn};function F(){var n,i;let e=_(),t=(i=(n=Spicetify.LocalStorage)==null?void 0:n.get(pt))!=null?i:window.localStorage.getItem(pt);if(!t)return w(m({},dt),{workerUrl:e.workerUrl});try{let o=JSON.parse(t);return{workerUrl:e.workerUrl,autoBackupEnabled:o.autoBackupEnabled===void 0?dt.autoBackupEnabled:!!o.autoBackupEnabled,shortcut:o.shortcut===void 0?dt.shortcut:Ci(o.shortcut),entryPoint:Ni(o.entryPoint)}}catch(o){return w(m({},dt),{workerUrl:e.workerUrl})}}function mt(e){var n;let t=JSON.stringify({workerUrl:_().workerUrl,autoBackupEnabled:e.autoBackupEnabled,shortcut:e.shortcut,entryPoint:e.entryPoint});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set(pt,t);return}window.localStorage.setItem(pt,t)}function Be(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}async function gt(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return[...new Uint8Array(n)].map(i=>i.toString(16).padStart(2,"0")).join("")}function De(e){return JSON.stringify(rn(e))}function rn(e){return Array.isArray(e)?e.map(rn):e&&typeof e=="object"?Object.keys(e).sort().reduce((t,n)=>(t[n]=rn(e[n]),t),{}):e}var ar=["username","canonicalUsername","id","uri","displayName"];async function J(){let{value:e,field:t}=await cr();return{hash:await gt(e),field:t}}async function cr(){var o;let e=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let t=await e.getUser(),n=ar.find(s=>(t==null?void 0:t[s])!=null),i=n?t[n]:void 0;if(!n||!i)throw new Error("Unable to resolve the active Spotify user.");return{value:i,field:n}}var lr=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,ur=100,yr="marketplace:installed-extensions",fr="marketplace:installed-themes",dr="marketplace:theme-installed",pr="marketplace:installed:",mr="marketplace";function cn(e){return Spicetify.Config?ln(Spicetify.Config,e):null}function ln(e,t){var s;let n=X(e),i=new Set(gr(t)),o=((s=t[dr])==null?void 0:s.includes(pr))===!0;return{current_theme:o?mr:n.current_theme,color_scheme:o?"":n.color_scheme,extensions:n.extensions.filter(r=>!i.has(r)),custom_apps:n.custom_apps}}function X(e){let t=e&&typeof e=="object"?e:{};return{current_theme:an(t.current_theme)?t.current_theme:"",color_scheme:an(t.color_scheme)?t.color_scheme:"",extensions:Ai(t.extensions),custom_apps:Ai(t.custom_apps)}}function Di(e,t){return De(X(e))===De(X(t))}function Ai(e){return Array.isArray(e)?[...new Set(e.filter(an))].sort().slice(0,ur):[]}function an(e){return typeof e=="string"&&lr.test(e)}function gr(e){let t=Mi(e[yr]).map(i=>{var s;let o=(s=Bi(e[i]))==null?void 0:s.manifest;return o&&typeof o=="object"?o.main:void 0}),n=Mi(e[fr]).flatMap(i=>{var s;let o=(s=Bi(e[i]))==null?void 0:s.include;return Array.isArray(o)?o:[]});return[...t,...n].flatMap(i=>{let o=typeof i=="string"?i.split("/").pop():void 0;return o?[o]:[]})}function Mi(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function Bi(e){try{let t=e?JSON.parse(e):null;return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch(t){return null}}function Li(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var hr=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],Sr="marketplace:installed:",Oi=`${Sr}snippet:`,kr="wsoltani/syncify",br="marketplace",Ui={added:0,removed:1,unchanged:2};function Y(e){let t=new Map;for(let[n,i]of hr)for(let o of Cr(e[n]))t.has(o)||t.set(o,xr(o,i,e[o]));return[...t.values()]}function un(e,t,n,i){let o=new Set(e.map(c=>c.key)),s=new Map(n.map(c=>[c.key,c])),r=[...e.map(c=>{let y=s.get(c.key);return w(m({},c),{change:y?"unchanged":"added",isNew:!y||y.sources.join(" ")!==c.sources.join(" ")})}),...n.filter(c=>!o.has(c.key)).map(c=>w(m({},c),{change:yn(c,e)?"unchanged":"removed",isNew:!1}))].sort((c,y)=>Ui[c.change]-Ui[y.change]||c.name.localeCompare(y.name)),l={added:0,removed:0,unchanged:0};for(let c of r)l[c.change]+=1;return{items:r,counts:l,manual:wr(t,i)}}function yn(e,t){return e.type==="extension"&&$i(e)&&!t.some($i)}function $i(e){var t;return((t=e.repo)==null?void 0:t.toLowerCase())===kr}function wr(e,t){if(!e)return[];let n=X(e),i=X(t),o=[...n.extensions.filter(r=>!i.extensions.includes(r)).map(r=>({type:"extension",name:r})),...n.custom_apps.filter(r=>!i.custom_apps.includes(r)).map(r=>({type:"custom_app",name:r}))],s=n.current_theme;return s&&s!==br&&(s!==i.current_theme||n.color_scheme!==i.color_scheme)&&o.push(m({type:"theme",name:s},n.color_scheme?{scheme:n.color_scheme}:{})),o}function xr(e,t,n){var c,y;let i=Ki(n),o=Ki(i==null?void 0:i.manifest),s=ht(i==null?void 0:i.user),r=ht(i==null?void 0:i.repo),l=(y=(c=ht(i==null?void 0:i.title))!=null?c:ht(o==null?void 0:o.name))!=null?y:e.startsWith(Oi)?e.slice(Oi.length):e.split("/").pop()||e;return{key:e,type:t,name:l,repo:t!=="snippet"&&s&&r?`${s}/${r}`:null,sources:vr(t,i),custom:t==="snippet"&&(i==null?void 0:i.custom)===!0}}function vr(e,t){return t?(e==="extension"?[t.extensionURL]:e==="theme"?[t.cssURL,t.schemesURL,...Array.isArray(t.include)?t.include:[]]:[]).filter(i=>typeof i=="string"&&i!==""):[]}function ht(e){return typeof e=="string"&&e.trim()?e.trim():null}function Cr(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function Ki(e){let t=e;if(typeof e=="string")try{t=JSON.parse(e)}catch(n){return null}return t&&typeof t=="object"&&!Array.isArray(t)?t:null}var St="spicetify-marketplace";var Le="settings";async function Ri(){let e=await Fi();if(e.kind!=="ok")return null;try{let t=await Yi(e.db,"readonly",i=>i.getAll());if(!t)return null;let n={};for(let i of t)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(n[i.key]=i.value);return n}finally{e.db.close()}}async function ji(e){let t=await Fi();if(t.kind==="unavailable")return"unavailable";let n=t.kind==="ok"?t.db:await Er();if(!n)return"failed";try{return await Yi(n,"readwrite",o=>{let s;for(let[r,l]of Object.entries(e))s=o.put({key:r,value:l});return s})===null?"failed":"written"}finally{n.close()}}function Hi(){var e;try{return(e=window.indexedDB)!=null?e:null}catch(t){return null}}async function Fi(){let e=Hi();return e?await _r(e)?{kind:"missing"}:new Promise(t=>{let n=!1,i=e.open(St);i.onupgradeneeded=()=>{n=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),t({kind:"unavailable"})},i.onblocked=()=>t({kind:"unavailable"}),i.onsuccess=()=>{let o=i.result;if(n){o.close(),Ir(e).then(()=>t({kind:"missing"}));return}if(!o.objectStoreNames.contains(Le)){o.close(),t({kind:"unavailable"});return}t({kind:"ok",db:o})}}):{kind:"unavailable"}}function Er(){let e=Hi();return e?new Promise(t=>{let n=e.open(St,1);n.onupgradeneeded=()=>{let i=n.result;i.objectStoreNames.contains(Le)||i.createObjectStore(Le,{keyPath:"key"})},n.onerror=()=>{console.warn("Syncify could not create Marketplace storage",n.error),t(null)},n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}async function _r(e){if(typeof e.databases!="function")return!1;try{return!(await e.databases()).some(n=>n.name===St)}catch(t){return!1}}function Ir(e){return new Promise(t=>{let n=e.deleteDatabase(St);n.onsuccess=()=>t(),n.onerror=()=>t(),n.onblocked=()=>t()})}function Yi(e,t,n){return new Promise(i=>{let o;try{o=e.transaction(Le,t)}catch(y){console.warn("Syncify could not open a Marketplace transaction",y),i(null);return}let s,r=!1,l=y=>{r||(r=!0,i(y))};o.oncomplete=()=>l(s),o.onerror=()=>{console.warn("Syncify Marketplace transaction failed",o.error),l(null)},o.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",o.error),l(null)};let c;try{c=n(o.objectStore(Le))}catch(y){console.warn("Syncify Marketplace request could not be issued",y),l(null);return}c&&(c.onsuccess=()=>{s=c.result},c.onerror=()=>{console.warn("Syncify Marketplace request failed",c.error),l(null)})})}var fn="marketplace:",Wi=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function Oe(){let e=Or(),t=await Ri();if(t)for(let[n,i]of Object.entries(t))n.startsWith(fn)&&(e[n]=i);return e}var Tr=new Set(["marketplace:active-tab","marketplace:sort"]),Pr="marketplace:installed:",Ar=["stars","tags","lastUpdated","created"];async function kt(e,t){let n={};for(let[i,o]of Object.entries(e))Tr.has(i)||(n[i]=i.startsWith(Pr)?Mr(o):o);return t&&(n.spicetify_config=X(t)),gt(De(n))}function Mr(e){try{let t=JSON.parse(e);if(!t||typeof t!="object"||Array.isArray(t))return e;for(let n of Ar)delete t[n];return t}catch(t){return e}}async function bt(){let e=await Oe(),t=cn(e);return{keyCount:Object.keys(e).length,hash:await kt(e,t),installedItemCount:Dr(e),installedItems:Vi(e),items:Y(e),spicetifyConfig:t,marketplaceAvailable:Lr(e)}}async function zi(){let e=await Oe(),t=cn(e);return m({schema_version:2,metadata:{last_sync_datetime:new Date().toISOString(),device_info:Li(),marketplace_key_count:Object.keys(e).length},payload_hash:await kt(e,t),marketplace_data:{keys:e}},t?{spicetify_config:t}:{})}async function qi(e){var s,r;let t={},n=(r=(s=e.marketplace_data)==null?void 0:s.keys)!=null?r:{};for(let[l,c]of Object.entries(n))l.startsWith(fn)&&(t[l]=c);if(Object.keys(t).length===0)return 0;await Br(t);let i=Object.keys(t);for(let l of i)window.localStorage.setItem(l,t[l]);if(await ji(t)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try the restore again.");return i.length}async function Br(e){let t=await Oe(),n=Y(e),i=Y(t).filter(r=>yn(r,n));if(i.length===0)return;let o="marketplace:installed-extensions",s=Ji(e[o]).map(String);for(let r of i)s.includes(r.key)||s.push(r.key),e[r.key]=t[r.key];e[o]=JSON.stringify(s)}function Dr(e){return Vi(e).length}function Vi(e){return Wi.flatMap(t=>Ji(e[t]).map(String))}function Lr(e){return!!(window.Marketplace||Wi.some(n=>e[n]!==void 0)||e["marketplace:tabs"]!==void 0)}function Gi(e,t){return t===0?!1:e===0?!0:e<Math.max(2,Math.floor(t*.5))}function Or(){let e={};for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);if(!(n!=null&&n.startsWith(fn)))continue;let i=window.localStorage.getItem(n);i!==null&&(e[n]=i)}return e}function Ji(e){if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch(t){return[]}}async function wt(e){if(!Be(e))throw new Error("Syncify backup service is not configured.");let[t,n]=await Promise.all([J(),zi()]);if(n.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:i}=await gi(e.workerUrl,t,n);return{payload:n,unchanged:i}}async function ke(e,t){var r;if(!Be(e))throw new Error("Syncify backup service is not configured.");let n=await Xt(e.workerUrl,await J(),t),[i,o]=await Promise.all([Promise.all(n.backups.map(Xi)),n.safetyCopy?Xi(n.safetyCopy):null]),s=i.filter((l,c)=>i.findIndex(y=>y.payload_hash===l.payload_hash)===c);return w(m({},n),{payload:(r=s[0])!=null?r:null,backups:s,safetyCopy:o&&!s.some(l=>l.payload_hash===o.payload_hash)?o:null})}var dn=new Map;async function Xi(e){var s,r,l;let t=(r=(s=e.marketplace_data)==null?void 0:s.keys)!=null?r:{},n=e.spicetify_config?ln(e.spicetify_config,t):void 0,i=`${e.payload_hash} ${(l=e.metadata)==null?void 0:l.last_sync_datetime}`,o=dn.get(i);return o||(o=kt(t,n),dn.set(i,o),o.catch(()=>dn.delete(i))),w(m(m({},e),n?{spicetify_config:n}:{}),{payload_hash:await o})}async function Zi(e){return(await Xt(vt(e),await J())).claim}async function Qi(e,t,n){var r;let i=t!=null?t:(await ke(e)).payload;if(!i)throw new Error("No Syncify cloud backup was found for this Spotify account.");let o=await qi(i),s=(r=i.backup)==null?void 0:r.id;return s&&Be(e)&&J().then(l=>hi(e.workerUrl,l,s,n)).catch(()=>{}),{payload:i,restoredCount:o}}async function eo(e){let t=await J(),n=await bi(vt(e),t);return w(m({},n),{hash:t.hash})}async function to(e){await wi(vt(e),await J())}async function xt(e){await xi(vt(e),await J())}function vt(e){if(!Be(e))throw new Error("Syncify backup service is not configured.");return e.workerUrl}var Ct="syncify:claim-check-day";async function io(e){var n,i,o;let t=F();if(t.workerUrl){if(!t.autoBackupEnabled)return Ur(e);try{let[s,r]=await Promise.all([bt(),ke(t)]),l=oo(r.claim);l&&e(l);let c=(i=(n=r.payload)==null?void 0:n.metadata.marketplace_key_count)!=null?i:0;if(r.exists&&Gi(s.keyCount,c)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((o=r.payload)==null?void 0:o.payload_hash)===s.hash||s.keyCount===0)return;await wt(t),Spicetify.showNotification("Syncify auto-backup complete")}catch(s){if(s instanceof H){Spicetify.showNotification("Syncify: sign in to keep backing up",!0,8e3);return}let r=s instanceof Error?s.message:String(s);console.warn("Syncify startup sync failed:",s),Spicetify.showNotification(`Syncify auto-sync skipped: ${r}`,!0,8e3)}}}async function Ur(e){let t=new Date().toLocaleDateString("en-CA");if($r()!==t)try{let n=oo(await Zi(F()));no(t),n&&e(n)}catch(n){if(n instanceof H){no(t);return}console.warn("Syncify claim check failed:",n)}}function oo(e){return(e==null?void 0:e.status)==="pending"&&!e.mine?e:null}function $r(){var e,t;return(t=(e=Spicetify.LocalStorage)==null?void 0:e.get(Ct))!=null?t:window.localStorage.getItem(Ct)}function no(e){var t;(t=Spicetify.LocalStorage)!=null&&t.set?Spicetify.LocalStorage.set(Ct,e):window.localStorage.setItem(Ct,e)}var mn="syncify:pending-restore",Kr=600*1e3,Rr=2e3,jr=15e3,Hr="marketplace:theme-installed",Fr="raw.githubusercontent.com",Yr=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],ye=null,pn=new Set,ao=new Map;function co(){return ye}function lo(e){return pn.add(e),()=>pn.delete(e)}function uo(){ye&&go(w(m({},ye),{manual:[]}))}function gn(e){try{localStorage.setItem(mn,JSON.stringify({at:Date.now(),manual:e}))}catch(t){}}function yo(){var e;gn((e=ye==null?void 0:ye.manual)!=null?e:[]),window.location.reload()}function fo(){ho()&&(document.addEventListener("load",e=>so(e.target,"load"),!0),document.addEventListener("error",e=>so(e.target,"error"),!0))}async function po(){let e=ho();if(!e)return;try{localStorage.removeItem(mn)}catch(o){}let t=Date.now(),n=await ro();for(;n.loaded<n.total&&Date.now()-t<jr;)await new Promise(o=>setTimeout(o,Rr)),n=await ro();go(w(m({at:Date.now()},n),{manual:e.manual}));let i=n.loaded===n.total&&e.manual.length===0;Spicetify.showNotification(i?`Syncify: backup restored. ${Wr(n)}.`:`Syncify: restored ${n.loaded} of ${n.total}. Open Syncify for details.`,!1,8e3)}function mo(e){let t=e.map(n=>n.type==="extension"?`spicetify config extensions ${Et(n.name)}`:n.type==="custom_app"?`spicetify config custom_apps ${Et(n.name)}`:`spicetify config current_theme ${Et(n.name)}${n.scheme?` color_scheme ${Et(n.scheme)}`:""}`);return t.length>0?[...t,"spicetify apply"]:[]}function Wr(e){return e.total===1?"It loaded":`All ${e.total} loaded`}function Et(e){return/^[\w.@+/-]+$/.test(e)?e:`"${e}"`}function go(e){ye=e;for(let t of pn)t(e)}function ho(){var e;try{let t=JSON.parse((e=localStorage.getItem(mn))!=null?e:"null");return!t||Date.now()-t.at>Kr?null:{manual:Array.isArray(t.manual)?t.manual:[]}}catch(t){return null}}function so(e,t){e instanceof HTMLScriptElement&&e.src&&ao.set(Ue(e.src),t)}async function ro(){var i;let e=await Oe(),t=(i=e[Hr])!=null?i:"",n=Y(e).filter(o=>o.type==="extension"&&o.sources.length>0||o.type==="theme"&&t.includes(o.key)||o.type==="snippet");return{loaded:n.filter(zr).length,total:n.length}}function zr(e){var t,n;if(e.type==="snippet"){let i=document.querySelector("style.marketplaceSnippets");return((t=i==null?void 0:i.textContent)==null?void 0:t.includes(`/* ${e.name} - `))===!0}if(e.type==="theme"){let i=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((n=i==null?void 0:i.textContent)!=null&&n.trim())}return qr(e.sources[0]).some(Vr)}function qr(e){let t;try{t=new URL(e)}catch(r){return[]}if(t.host!==Fr)return[Ue(t.href)];let[n,i,o,...s]=t.pathname.split("/").filter(Boolean);return!n||!i||!o||s.length===0?[]:Yr.map(r=>Ue(`https://${r}/gh/${n}/${i}@${o}/${s.join("/")}`))}function Vr(e){let t=ao.get(e);return t?t==="load":[...document.querySelectorAll("script[src]")].some(i=>Ue(i.src)===e)&&performance.getEntriesByType("resource").some(i=>Ue(i.name)===e)}function Ue(e){try{let t=new URL(e);return`${t.origin}${t.pathname}`}catch(t){return e}}var Gr="raw.githubusercontent.com",Jr={extension:"spicetify-extensions",theme:"spicetify-themes"},Xr="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",Zr="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",Qr="https://api.github.com/repos",ea=5e3,ta=20,So="syncify:repo-topics",ko=10080*60*1e3,na=200;function _t(e){return(e==null?void 0:e.kind)==="host"||(e==null?void 0:e.kind)==="repo"||(e==null?void 0:e.kind)==="blocked"||(e==null?void 0:e.kind)==="catalog"}function bo(e){let t=new Map;for(let n of e){if(n.change==="removed")continue;if(n.custom){t.set(n.key,{kind:"custom"});continue}let i=ia(n);i&&t.set(n.key,i)}return t}async function wo(e,t){let n=new Map,i=e.filter(r=>r.change!=="removed"&&r.isNew&&!t.has(r.key));if(i.length===0)return n;let o=i.filter(r=>r.type==="snippet"),s=i.filter(r=>r.type!=="snippet");if(o.length>0){let r=await aa();for(let l of o)r?r.has(vo(l.name))||n.set(l.key,{kind:"catalog"}):n.set(l.key,{kind:"unchecked"})}if(s.length>0){let r=await ra(),l=ua(),c=0;await Promise.all(s.map(async y=>{let d=oa(y),k=Jr[y.type];if(!d||!k)return;if(r===null){n.set(y.key,{kind:"unchecked"});return}if(sa(d,r)){n.set(y.key,{kind:"blocked"});return}let f=la(l,d);f===void 0&&c<ta&&(c+=1,f=await ca(d),f!==void 0&&(l[d.toLowerCase()]={topics:f,at:Date.now()})),f===void 0?n.set(y.key,{kind:"unchecked"}):(f===null||!f.includes(k))&&n.set(y.key,{kind:"catalog"})})),ya(l)}return n}function ia(e){let t=null;for(let n of e.sources){let i;try{i=new URL(n)}catch(s){return{kind:"host",host:n.slice(0,40)}}if(i.host!==Gr)return{kind:"host",host:i.host};let o=xo(i);o&&e.repo&&o.toLowerCase()!==e.repo.toLowerCase()&&(t!=null||(t=o))}return t?{kind:"repo",repo:t}:null}function oa(e){for(let t of e.sources)try{let n=xo(new URL(t));if(n)return n}catch(n){}return e.repo}function xo(e){let[t,n]=e.pathname.split("/").filter(Boolean);return t&&n?`${t}/${n}`:null}function sa(e,t){let n=`https://github.com/${e}`.toLowerCase();return t.some(i=>{let o=i.toLowerCase();if(!o.includes("*"))return o===n;let s=o.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${s}$`).test(n)})}function vo(e){return e.replace(/\n/g,"").trim().toLowerCase()}var $e=null,Ke=null;function ra(){return $e!=null||($e=Co(Xr).then(e=>{let t=e==null?void 0:e.repos;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&!n.startsWith("//")):($e=null,null)})),$e}function aa(){return Ke!=null||(Ke=Co(Zr).then(e=>Array.isArray(e)?new Set(e.flatMap(t=>typeof(t==null?void 0:t.title)=="string"?[vo(t.title)]:[])):(Ke=null,null))),Ke}async function ca(e){let t=await Eo(`${Qr}/${e}`);if((t==null?void 0:t.status)===404)return null;if(!(t!=null&&t.ok))return;let n=await t.json().catch(()=>null);return Array.isArray(n==null?void 0:n.topics)?n.topics.filter(i=>typeof i=="string"):void 0}async function Co(e){let t=await Eo(e);return t!=null&&t.ok?t.json().catch(()=>null):null}async function Eo(e){let t=typeof AbortController=="function"?new AbortController:null,n=setTimeout(()=>t==null?void 0:t.abort(),ea);try{return await fetch(e,{signal:t==null?void 0:t.signal})}catch(i){return null}finally{clearTimeout(n)}}function la(e,t){let n=e[t.toLowerCase()];return n&&Date.now()-n.at<ko?n.topics:void 0}function ua(){var e;try{let t=JSON.parse((e=localStorage.getItem(So))!=null?e:"{}");return t&&typeof t=="object"?t:{}}catch(t){return{}}}function ya(e){let t=Date.now(),n=Object.entries(e).filter(([,i])=>t-i.at<ko).sort(([,i],[,o])=>o.at-i.at).slice(0,na);try{localStorage.setItem(So,JSON.stringify(Object.fromEntries(n)))}catch(i){}}var fa="syncify:beta",_o=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function Io(){var e;return(e=window.SyncifyLoader)!=null?e:null}function da(){try{return window.localStorage.getItem(fa)==="true"}catch(e){return!1}}async function No(e){let t=da()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(t.map(i=>pa(`${e}/${i}`)))).reduce((i,o)=>o&&(!i||Sn(o,i)>0)?o:i,null)}function hn(e){return typeof e=="string"&&_o.test(e)}function Sn(e,t){let[n,i]=[e,t].map(o=>{var y;let[,s,r,l,c]=(y=_o.exec(o))!=null?y:[];return[s,r,l,c!=null?c:1/0].map(Number)});for(let o=0;o<n.length;o+=1)if(n[o]!==i[o])return n[o]<i[o]?-1:1;return 0}async function pa(e,t=3e3){let n=typeof AbortController=="function"?new AbortController:null,i=setTimeout(()=>n==null?void 0:n.abort(),t);try{let o=await fetch(e,{signal:n==null?void 0:n.signal});if(!o.ok)return null;let s=await o.json();return hn(s==null?void 0:s.version)?s.version:null}catch(o){return null}finally{clearTimeout(i)}}function Do(){var Hn,Fn,Yn,Wn,zn;let e=Spicetify.React,t=e.useEffect,n=e.useMemo,i=e.useState,o=e.useRef,[s,r]=i(()=>F()),[l,c]=i("idle"),[y,d]=i(null),[k,f]=i(0),[g,D]=i([]),[x,Z]=i([]),[U,He]=i(null),[Q,fe]=i(null),[C,Fe]=i(null),[T,Ye]=i(null),[ee,we]=i([]),[p,S]=i(null),[b,I]=i(null),[P,te]=i(!1),[ne,L]=i(!1),[bn,We]=i(!1),[ze,wn]=i(null),[W,de]=i(!1),[At,pe]=i(null),[xn,vn]=i(null),[qe,Ro]=i(!1),[E,jo]=i(()=>co()),[Ho,Cn]=i(!1),[ie,Fo]=i(!1),[En,Yo]=i(null),[_n,Ve]=i(void 0),[B,Wo]=i(null),[xe,zo]=i(null),[oe,In]=i(null),[qo,Nn]=i(!1),[Vo,Mt]=i(null),[Go,Tn]=i(!1),[O,Bt]=i(null),[N,Dt]=i(null),Pn=o(null),R=n(()=>_(),[]),me=n(()=>p?[...ee,p]:ee,[ee,p]),Lt=O?(Hn=N==null?void 0:N.backups)!=null?Hn:[]:ee,An=O?(Fn=N==null?void 0:N.safetyCopy)!=null?Fn:null:p,Mn=n(()=>{var a;return new Map([...me,...(a=N==null?void 0:N.backups)!=null?a:[],...N!=null&&N.safetyCopy?[N.safetyCopy]:[]].map(u=>[u,Y(u.marketplace_data.keys)]))},[me,N]),Ge=a=>{var u;return(u=Mn.get(a))!=null?u:Y(a.marketplace_data.keys)},Jo=a=>Ge(a).map(u=>u.key),Xo=a=>Ge(a).length,z=n(()=>ne&&b?un(Ge(b),b.spicetify_config,x,U):null,[ne,b,Mn,x,U]),q=n(()=>z?bo(z.items):null,[z]),Zo=n(()=>new Map([...ze!=null?ze:[],...q!=null?q:[]]),[ze,q]),Ot=n(()=>Ti(),[]),Bn=n(()=>Io()!==null,[]),j=l==="loading",Je=(y==null?void 0:y.kind)==="warning"||(y==null?void 0:y.kind)==="error"?y:null,Dn=!!(T&&C&&T.payload_hash!==C),ve=!!(T&&C&&T.payload_hash===C),Ln=!!(b&&C&&b.payload_hash===C),Ut=O!==null||qe||!ve||me.length<2,Qo=Ut?Lt:Lt.slice(0,1),Xe=(xe==null?void 0:xe.status)==="pending"&&!xe.mine?xe:null,es=ba(oe,B,Xe!==null),$t=(_n?((Yn=oe==null?void 0:oe.accounts)!=null?Yn:[]).filter(a=>a.status==="final"):[]).map((a,u)=>({hash:a.hash,label:`Spotify account ${u+1}${a.device_info?` \xB7 from ${a.device_info}`:""}`})).filter(a=>a.hash!==(oe==null?void 0:oe.hash)),ts=!!(C&&k>0&&!me.some(a=>a.payload_hash===C));t(()=>($().catch(()=>null).then(a=>Ve(u=>u!=null?u:a)),se({silent:!0}),rs(),lo(jo)),[]),t(()=>{if(wn(null),!z||!q)return;[...q.values()].some(_t)&&We(!0);let a=!0;return wo(z.items,q).then(u=>{a&&(wn(u),[...u.values()].some(_t)&&We(!0))}),()=>{a=!1}},[z,q]),t(()=>{if(!W)return;let a=u=>{var A;if(!((A=Pn.current)!=null&&A.isConnected)){de(!1),pe(null);return}u.preventDefault(),u.stopImmediatePropagation();let h=Ei(u);if(h.kind!=="ignore"){if(h.kind==="cancel"){de(!1),pe(null);return}if(h.kind==="error"){pe(h.message);return}if(_i(h.shortcut)){pe(`${Pe(h.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}de(!1),Kt(h.shortcut)}};return window.addEventListener("keydown",a,!0),()=>window.removeEventListener("keydown",a,!0)},[W,s]);async function On(){let a=await bt();return Fe(a.hash),f(a.installedItemCount),D(a.installedItems),Z(a.items),He(a.spicetifyConfig),fe(a.marketplaceAvailable),a}async function se(a){try{L(!1),c("loading"),a!=null&&a.silent||d({kind:"info",text:"Checking your Syncify backup\u2026"}),await On();let u,h=null;try{u=await ke(s)}catch(Ht){if(!(Ht instanceof H))throw Ht;u=Ba,h=Ht.code}let A=await $().catch(()=>null),et=A?await eo(s).catch(()=>null):null,Ce=A?await $().catch(()=>null):null;Ve(Ce),In(Ce?et:null),Wo(h),h&&vn("account"),zo(u.claim),Bt(null),Dt(null),Ye(u.payload),we(u.backups),S(u.safetyCopy),I(u.payload),te(!0),c(u.exists?"success":"idle"),!(a!=null&&a.silent)&&!h&&d(u.exists&&u.payload?{kind:"success",text:`Backup found from ${be(u.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(u){Ze(u)}}async function Un(){Nn(!0),Mt(null);try{await to(s)}catch(a){a instanceof G&&["claim_pending","claimed"].includes(a.code)||Mt(a instanceof Error?a.message:String(a))}finally{await se({silent:!0}),Nn(!1)}}function ns(a){Ve(a),!B&&T?Un():se({silent:!0})}function is(){Ve(null),In(null),Mt(null),se({silent:!0})}async function os(){Tn(!0);try{await xt(s),Spicetify.showNotification("Syncify: claim sent for review"),await se({silent:!0})}catch(a){d({kind:"error",text:a instanceof Error?a.message:String(a)})}finally{Tn(!1)}}async function ss(a){if(L(!1),Bt(a),Dt(null),!a){I(T);return}I(null);try{let u=await ke(s,a);Dt(u),I(u.payload)}catch(u){Bt(null),I(T),Ze(u)}}async function rs(){let a=R.version;if(!hn(a))return;let u=await No(R.releasesUrl);u&&Sn(u,a)>0&&Yo(u)}function as(a){let u=w(m({},s),{autoBackupEnabled:a});r(u),mt(u),d({kind:"success",text:a?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}function Kt(a){let u=w(m({},s),{shortcut:a});r(u),mt(u),on(a),pe(null),d({kind:"success",text:a?`${Pe(a)} now opens Syncify.`:"Keyboard shortcut turned off."})}function cs(a){let u=w(m({},s),{entryPoint:a});r(u),mt(u),ft(a)}function $n(a){vn(a),a!=="settings"&&de(!1)}function ls(){pe(null),de(!0)}async function us(){try{L(!1),c("loading"),d({kind:"info",text:"Backing up your extensions and themes\u2026"});let{payload:a,unchanged:u}=await wt(s);if(await On(),u){te(!0),c("success"),d({kind:"success",text:"Everything is already backed up."}),Spicetify.showNotification("Syncify: everything is already backed up");return}Ye(a),we(h=>[a,...h.filter(A=>A.payload_hash!==a.payload_hash)].slice(0,Ma)),S(h=>(h==null?void 0:h.payload_hash)===a.payload_hash?null:h),I(a),te(!0),c("success"),d({kind:"success",text:`Backed up ${a.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(a){Ze(a)}}function ys(a=b){if(Q===!1){let u="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";d({kind:"error",text:u}),Spicetify.showNotification(u,!0,6e3);return}if(!a){let u="No Syncify cloud backup was found for this Spotify account.";d({kind:"error",text:u}),Spicetify.showNotification(u,!0,6e3);return}I(a),We(!1),L(!0)}async function fs(){let a=b?un(Ge(b),b.spicetify_config,x,U).manual:[];try{L(!1),c("loading"),d({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:u,restoredCount:h}=await Qi(s,b!=null?b:void 0,O!=null?O:void 0);I(u),c("success"),d({kind:"success",text:`Restored ${h} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),gn(a),setTimeout(()=>window.location.reload(),1e3)}catch(u){Ze(u)}}async function ds(a){var u;try{await navigator.clipboard.writeText(a)}catch(h){let A=(u=Spicetify.Platform)==null?void 0:u.ClipboardAPI;if(!(A!=null&&A.copy))return;await A.copy(a)}Cn(!0),setTimeout(()=>Cn(!1),2e3)}function re(a){if(a.startsWith("mailto:")){window.location.href=a;return}window.open(a,"_blank","noopener,noreferrer")}function Ze(a){if(c("error"),a instanceof Ne){Fo(!0),d(null);return}if(a instanceof H&&a.code!=="not_linked"){d(null),se({silent:!0});return}let u=a instanceof Error?a.message:String(a);d({kind:"error",text:u}),Spicetify.showNotification(u,!0,6e3)}function Kn(a,u){let h=(b==null?void 0:b.payload_hash)===a.payload_hash,A=a.payload_hash===C,et=be(a.metadata.last_sync_datetime),Ce=Bo(Xo(a));return e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":h,"data-selected":h?"true":"false",type:"button",key:`${a.payload_hash}-${a.metadata.last_sync_datetime}`,title:u!=null&&u.isSafetyCopy?"Kept aside and updated about once a week, so a burst of new backups can't replace it":void 0,onClick:()=>{I(a),L(!1)},disabled:j},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),u!=null&&u.isSafetyCopy?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Safety copy"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 updated weekly")),e.createElement("span",{className:"syncify-muted"},et," \xB7 ",Ce)):e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-backup-date"},et),e.createElement("span",{className:"syncify-muted"},Ce," \xB7 from ",a.metadata.device_info)),A?e.createElement("span",{className:"syncify-tag",title:"What's on this device now"},"Current"):null,u!=null&&u.isSafetyCopy?e.createElement(_a,null):null)}function Rt(a){a.stopPropagation()}let ps=ie?"Update Syncify to keep backing up":B?"Sign in to restore":P?T?Dn?"Changes since your last backup":"Everything is backed up":"No backup yet":l==="error"?"Couldn't check your backup":"Checking your backup\u2026",Rn=ie?"Your backups are safe":B?B==="not_owner"?"Secured by another account":"This backup is secured":P?T?Dn?La(T,Jo(T),g,U):`Last backup ${be(T.metadata.last_sync_datetime)}`:"Save your extensions and themes so you can restore them after a reinstall or on another computer.":null,jn=!!(E&&!ie&&Date.now()-E.at<Aa),Qe=!!(E&&E.loaded===E.total),jt=mo((Wn=E==null?void 0:E.manual)!=null?Wn:[]);return e.createElement("div",{className:"syncify-panel",ref:Pn,onClick:Rt,onMouseDown:Rt,onPointerDown:Rt},ie?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,"This version of Syncify is no longer supported."),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>re(`${R.githubUrl}#updating`)},"How to update")):null,Xe?e.createElement("div",{className:"syncify-alert",role:"alert"},e.createElement("span",null,(zn=Xe.email)!=null?zn:"Someone"," is claiming this backup.",Xe.held?" Syncify is reviewing it.":null),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{os()},disabled:Go},"Not me")):null,jt.length>0?e.createElement("div",{className:"syncify-alert syncify-manual",role:"status"},e.createElement("span",{className:"syncify-manual-header"},e.createElement("span",null,E.manual.length===1?"1 isn't from Marketplace. Add it in a terminal:":`${E.manual.length} aren't from Marketplace. Add them in a terminal:`),e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:uo},e.createElement(Mo,null))),e.createElement("span",{className:"syncify-code"},e.createElement("code",null,jt.join(`
`)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{ds(jt.join(`
`))}},Ho?"Copied":"Copy"))):null,Je?e.createElement("div",{className:"syncify-alert","data-kind":Je.kind},e.createElement("span",null,Je.text),e.createElement("span",{className:"syncify-alert-actions"},Je.kind==="error"?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{se()},disabled:j},"Try again"):null,e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>d(null)},e.createElement(Mo,null)))):null,e.createElement("section",{className:"syncify-status","aria-live":"polite"},jn&&E?e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},Qe?"Backup restored":`Restored ${E.loaded} of ${E.total}`),e.createElement("p",{className:"syncify-muted"},Qe?E.total===0?"Nothing from Marketplace to load":`${E.loaded} of ${E.total} loaded`:"Missing something? Reload Spotify once more."),Qe?e.createElement("p",{className:"syncify-muted"},"Syncify saved your setup?"," ",e.createElement("button",{className:"syncify-text-button syncify-inline-button",type:"button",onClick:()=>re(R.kofiUrl)},"Support it on Ko-fi")):null):e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},ps),e.createElement("p",{className:"syncify-muted"},Rn?`${Rn} \xB7 `:"",Bo(k)," on this device")),jn&&!Qe?e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:yo},"Reload"):e.createElement("button",{className:"syncify-button",type:"button",onClick:us,disabled:j||ve||ie||B!==null,title:B?"Sign in to back up":ve?"No changes since your last backup":void 0},j?"Working\u2026":ve?"Backed up":"Back up now")),!P||B||ee.length>0||$t.length>0?e.createElement("section",{className:"syncify-section","aria-label":"Backups"},e.createElement("div",{className:"syncify-section-header"},e.createElement("h4",{className:"syncify-section-title"},"Backups"),e.createElement("span",{className:"syncify-section-controls"},!O&&ve&&me.length>1?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":qe,"aria-controls":"syncify-backup-list",onClick:()=>{Ro(!qe),L(!1)}},qe?"Show less":`Show all ${me.length}`,e.createElement(Re,null)):null,!B&&$t.length>0?e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select","aria-label":"Show backups from",value:O!=null?O:"",onChange:a=>{ss(a.currentTarget.value||null)},disabled:j},e.createElement("option",{value:""},"This Spotify account"),$t.map(a=>e.createElement("option",{key:a.hash,value:a.hash},a.label))),e.createElement(Re,null)):null)),P?B?e.createElement("p",{className:"syncify-locked"},e.createElement(Na,null),e.createElement("span",null,B==="not_owner"?"Sign in with the account that secured them":"Sign in to see and restore your backups")):O&&!N?e.createElement("p",{className:"syncify-muted"},"Loading backups\u2026"):Lt.length===0?e.createElement("p",{className:"syncify-muted"},"No backups yet."):e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-list",id:"syncify-backup-list",role:"radiogroup","aria-label":"Choose a backup to restore"},Qo.map(a=>Kn(a)),Ut&&An?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),Kn(An,{isSafetyCopy:!0})):null),Ut?Q===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to restore a backup."):ne?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},"Restore"," ",b?be(b.metadata.last_sync_datetime):"this backup","?"),z?e.createElement(ha,{preview:z,checks:Zo,expanded:bn,onToggle:()=>We(!bn)}):null,e.createElement("div",{className:"syncify-actions"},ts?e.createElement("div",{className:"syncify-alert syncify-actions-hint"},"Your current setup isn't backed up."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>L(!1),disabled:j},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:fs,disabled:j},"Restore"))):e.createElement("div",{className:"syncify-actions"},Ln?e.createElement("span",{className:"syncify-muted syncify-actions-hint"},"This backup is already current."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>ys(),disabled:j||!b||Ln},"Restore backup")):null):e.createElement("div",{className:"syncify-backup-skeleton","aria-hidden":"true"},e.createElement("span",{className:"syncify-radio"}),e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-skeleton-line"}),e.createElement("span",{className:"syncify-skeleton-line wide"})))):null,e.createElement("div",{className:"syncify-accordion"},e.createElement(Ao,{id:"account",title:"Account",openSection:xn,onToggle:$n},e.createElement(wa,{session:_n,locked:B,secure:es,securing:qo,secureError:Vo,onSecure:()=>{Un()},onSignedIn:ns,onSignedOut:is,onOpenWebsite:re})),e.createElement(Ao,{id:"settings",title:"Settings",openSection:xn,onToggle:$n},e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Back up automatically"),e.createElement("span",{className:"syncify-muted"},"When Spotify starts and something has changed")),e.createElement("input",{className:"syncify-switch",type:"checkbox",role:"switch",checked:s.autoBackupEnabled&&!ie,onChange:a=>as(a.currentTarget.checked),disabled:j||ie})),e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Open Syncify from"),Ot?s.entryPoint==="menu"&&!s.shortcut?e.createElement("span",{className:"syncify-muted"},"Keep a shortcut in case a Spotify update breaks the menu"):null:e.createElement("span",{className:"syncify-muted"},"The profile menu isn't available in this Spicetify version")),e.createElement("span",{className:"syncify-select-field"},e.createElement("select",{className:"syncify-select",value:Ot?s.entryPoint:"topbar",onChange:a=>cs(a.currentTarget.value),disabled:!Ot},Da.map(a=>e.createElement("option",{key:a.value,value:a.value},a.label))),e.createElement(Re,null))),e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Keyboard shortcut"),W&&!At?e.createElement("span",{className:"syncify-muted"},"Press a key combination, or Esc to cancel"):null),e.createElement("span",{className:"syncify-shortcut"},s.shortcut&&!W?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Kt(null)},"Turn off"):null,!s.shortcut&&!W?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Kt(Se)},"Use default"):null,e.createElement("button",{className:"syncify-key",type:"button","data-recording":W?"true":"false",onClick:()=>W?de(!1):ls(),title:"Click to change"},W?"Press keys\u2026":s.shortcut?Pe(s.shortcut):"Off"))),At?e.createElement("div",{className:"syncify-alert",role:"alert"},At):null)),e.createElement("footer",{className:"syncify-footer"},e.createElement("span",{className:"syncify-footer-version"},e.createElement("span",null,"Syncify ",R.version),En?e.createElement("button",{className:"syncify-text-button syncify-update",type:"button",onClick:()=>Bn?window.location.reload():re(`${R.githubUrl}#updating`)},En," is out \xB7 ",Bn?"Reload":"How to update"):null),e.createElement("span",{className:"syncify-footer-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>re(R.issueUrl)},"Report an issue"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>re(R.githubUrl)},"GitHub"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>re(R.kofiUrl)},"Support on Ko-fi"))))}var To={added:{mark:"+",label:"Added"},removed:{mark:"\u2212",label:"Removed"},unchanged:{mark:"=",label:"Unchanged"}},ma=[["extension","Extensions"],["theme","Themes"],["snippet","Snippets"]],ga={extension:"extension",custom_app:"custom app",theme:"theme"};function ha(e){let t=Spicetify.React,{items:n,counts:i,manual:o}=e.preview;return t.createElement(t.Fragment,null,t.createElement("div",{className:"syncify-chips","aria-label":"What changes on this device"},i.added?t.createElement("span",{className:"syncify-chip","data-change":"added"},"+",i.added," added"):null,i.removed?t.createElement("span",{className:"syncify-chip","data-change":"removed"},"\u2212",i.removed," removed"):null,i.unchanged?t.createElement("span",{className:"syncify-chip"},i.unchanged," unchanged"):null,o.length?t.createElement("span",{className:"syncify-chip"},o.length," to add manually"):null),n.length||o.length?t.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":e.expanded,"aria-controls":"syncify-restore-changes",onClick:e.onToggle},e.expanded?"Hide changes":"Show changes",t.createElement(Re,null)):null,e.expanded?t.createElement("div",{className:"syncify-changes",id:"syncify-restore-changes"},ma.map(([s,r])=>{let l=n.filter(c=>c.type===s);return l.length===0?null:t.createElement("section",{key:s,"aria-label":r},t.createElement("h5",{className:"syncify-change-group"},r),t.createElement("ul",{className:"syncify-change-list"},l.map(c=>t.createElement("li",{className:"syncify-change",key:c.key},t.createElement("span",{className:"syncify-mark","data-change":c.change,role:"img","aria-label":To[c.change].label},To[c.change].mark),t.createElement("span",{className:"syncify-change-name"},c.name,c.repo?t.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",c.repo):null),e.checks.has(c.key)?t.createElement(ka,{check:e.checks.get(c.key)}):null))))}),o.length?t.createElement("section",{"aria-label":"Add manually"},t.createElement("h5",{className:"syncify-change-group"},"Add manually"),t.createElement("ul",{className:"syncify-change-list"},o.map(s=>t.createElement("li",{className:"syncify-change",key:`${s.type}:${s.name}`},t.createElement("span",{className:"syncify-mark","aria-hidden":"true"}),t.createElement("span",{className:"syncify-change-name"},s.name,t.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",ga[s.type],s.scheme?`, ${s.scheme}`:"")))))):null):null)}var Sa={host:"Loads from outside GitHub",repo:"Its code is in a different repo than the one it names",blocked:"On Marketplace's block list",catalog:"Not in Marketplace's catalog",unchecked:"GitHub couldn't be reached to check it",custom:"A snippet made in Marketplace, not from its list"};function ka(e){let t=Spicetify.React,{check:n}=e,i=_t(n),o=n.kind==="host"?`Code from ${n.host}`:n.kind==="repo"?`Code from ${n.repo}`:n.kind==="blocked"?"Blocked by Marketplace":n.kind==="catalog"?"Not in Marketplace":n.kind==="unchecked"?"Not checked":"Custom";return t.createElement("span",{className:"syncify-source","data-warning":i?"true":"false",title:Sa[n.kind]},i?t.createElement(Ia,null):null,o)}function ba(e,t,n){var r,l;if(t==="not_owner")return{kind:"other-account"};if(!e)return n?{kind:"other-claim"}:{kind:"unknown"};let{claim:i}=e;if((i==null?void 0:i.status)==="final"){if(!i.mine)return{kind:"other-account"};let c=((r=e.accounts)!=null?r:[]).filter(y=>y.status==="final").length;return{kind:"secured",linkedCount:Math.max(c,1)}}if((i==null?void 0:i.status)==="pending")return i.mine?{kind:"pending",finalAt:i.final_at,held:i.held}:{kind:"other-claim"};let o=((l=e.accounts)!=null?l:[]).filter(c=>c.hash===e.hash),s=o[o.length-1];return(s==null?void 0:s.status)==="cancelled"&&s.cancelled_by==="owner"?{kind:"cancelled"}:{kind:"open"}}function wa(e){let t=Spicetify.React,n=t.useEffect,i=t.useState,{session:o,secure:s}=e,[r,l]=i(()=>ct()),[c,y]=i(()=>ct().email),[d,k]=i(""),[f,g]=i(!1),[D,x]=i(null),[Z,U]=i(()=>Date.now()),He=!!(r.codeSentAt&&Z-r.codeSentAt<xa),Q=Math.max(0,Math.ceil((r.retryAt-Z)/1e3)),fe=r.retryEmail===null||r.retryEmail===c.trim().toLowerCase()?Q:0;n(()=>{if(!o)return;let p=!0;return yi().then(S=>{!p||S||(x({kind:"warning",text:Ie(new v("signed_out"))}),e.onSignedOut())}).catch(()=>{}),()=>{p=!1}},[o==null?void 0:o.token]),n(()=>{if(r.retryAt<=Date.now())return;let p=setInterval(()=>{U(Date.now()),r.retryAt<=Date.now()&&clearInterval(p)},1e3);return()=>clearInterval(p)},[r.retryAt]);function C(p){let S=m(m({},ct()),p);ai(S),l(S),U(Date.now())}async function Fe(p){var b;let S=p.trim();if(!Ca.test(S)){x({kind:"error",text:"Enter a valid email address."});return}g(!0),x(null);try{let I=await li(S);C({email:S,codeSentAt:Date.now(),retryAt:Date.now()+I*1e3,retryEmail:S.toLowerCase()}),k("")}catch(I){let P=I instanceof v?I:null,te=(b=P==null?void 0:P.retryAfter)!=null?b:null,ne=te&&te<=va?Date.now()+te*1e3:0,L=(P==null?void 0:P.code)==="too_many_requests"?null:S.toLowerCase();if((P==null?void 0:P.code)==="resend_wait"){C({email:S,codeSentAt:r.email===S&&r.codeSentAt?r.codeSentAt:Date.now(),retryAt:ne,retryEmail:L});return}ne&&C({retryAt:ne,retryEmail:L}),x({kind:"error",text:Ie(I)})}finally{g(!1)}}async function T(){g(!0),x(null);try{let p=await ui(r.email,d);C({codeSentAt:null}),k(""),e.onSignedIn(p)}catch(p){x({kind:"error",text:Ie(p)});let S=p instanceof v?p.code:null;(S==="too_many_attempts"||S==="code_expired")&&k("")}finally{g(!1)}}async function Ye(){var S;let p=(S=o==null?void 0:o.email)!=null?S:"";g(!0),x(null),await fi(),C({email:p,codeSentAt:null}),y(p),g(!1),e.onSignedOut()}async function ee(){g(!0),x(null);try{e.onOpenWebsite(await di())}catch(p){let S=p instanceof v&&p.code==="signed_out";x({kind:S?"warning":"error",text:Ie(p)}),S&&e.onSignedOut()}finally{g(!1)}}let we=D?t.createElement("div",{className:"syncify-alert","data-kind":D.kind==="error"?"error":void 0,role:"alert"},D.text):null;if(o===void 0)return null;if(o){let p=s.kind==="open"||s.kind==="other-claim"||s.kind==="cancelled";return t.createElement(t.Fragment,null,t.createElement("div",{className:"syncify-setting"},t.createElement("span",{className:"syncify-setting-text"},t.createElement("span",{className:"syncify-account-email"},o.email),s.kind==="secured"?t.createElement("span",{className:"syncify-muted"},"Backup secured \xB7"," ",s.linkedCount===1?"1 Spotify account linked":`${s.linkedCount} Spotify accounts linked`):s.kind==="pending"?t.createElement("span",{className:"syncify-muted syncify-account-state"},t.createElement(Ta,null),t.createElement("span",null,"Securing this backup \xB7"," ",s.held?"in review":`final ${kn(s.finalAt)}`)):s.kind==="other-account"?t.createElement("span",{className:"syncify-muted"},"This backup is secured by another account"):t.createElement("span",{className:"syncify-muted"},"Signed in")),t.createElement("span",{className:"syncify-account-actions"},t.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-label":"Manage on the website",onClick:()=>{ee()},disabled:f},"Manage",t.createElement(Pa,null)),t.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Ye()},disabled:f},"Sign out"))),p?t.createElement("div",{className:"syncify-setting"},t.createElement("span",{className:"syncify-setting-text"},t.createElement("span",null,"Secure your backup"),t.createElement("span",{className:"syncify-muted"},"So only you can restore it")),t.createElement("button",{className:"syncify-button",type:"button",onClick:e.onSecure,disabled:f||e.securing||s.kind==="other-claim"},e.securing?"Securing\u2026":s.kind==="cancelled"?"Secure again":"Secure")):null,s.kind==="other-claim"?t.createElement("div",{className:"syncify-alert",role:"status"},"Another claim is pending. If it isn't yours, press Not me above and Syncify will review it."):s.kind==="cancelled"?t.createElement("div",{className:"syncify-alert",role:"status"},"Your claim was cancelled from this Spotify account."):null,e.secureError?t.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.secureError):null,we)}return t.createElement(t.Fragment,null,t.createElement("div",{className:"syncify-setting"},e.locked?t.createElement("span",{className:"syncify-setting-text"},t.createElement("span",null,"Sign in to restore"),t.createElement("span",{className:"syncify-muted"},"With the email that secured this backup")):t.createElement("span",{className:"syncify-setting-text"},t.createElement("span",null,"Secure your backup"),t.createElement("span",{className:"syncify-muted"},"So only you can restore it"))),t.createElement("form",{className:"syncify-confirm",noValidate:!0,onSubmit:p=>{p.preventDefault(),!f&&(He?d.length===It&&T():fe||Fe(c))}},He?t.createElement(t.Fragment,null,t.createElement("p",{className:"syncify-muted"},"Code sent to ",Ea(r.email)),t.createElement("div",{className:"syncify-field"},t.createElement("input",{className:"syncify-input syncify-code-input",type:"text",inputMode:"numeric",autoComplete:"one-time-code","aria-label":"6-digit code",placeholder:"123456",maxLength:It,value:d,onChange:p=>k(p.currentTarget.value.replace(/\D/g,"").slice(0,It)),autoFocus:!0}),t.createElement("button",{className:"syncify-button",type:"submit",disabled:f||d.length!==It},f?"Verifying\u2026":"Verify")),t.createElement("p",{className:"syncify-muted syncify-account-links"},t.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Fe(r.email)},disabled:f||Q>0},Q>0?`Resend in ${Po(Q)}`:"Resend code"),t.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{C({codeSentAt:null}),k(""),x(null)},disabled:f},"Use another email"))):t.createElement(t.Fragment,null,t.createElement("div",{className:"syncify-field"},t.createElement("input",{className:"syncify-input",type:"email",autoComplete:"email","aria-label":"Email",placeholder:"you@example.com",value:c,onChange:p=>y(p.currentTarget.value),autoFocus:!0}),t.createElement("button",{className:"syncify-button",type:"submit",disabled:f||fe>0||!c.trim()},f?"Sending\u2026":"Send code")),t.createElement("p",{className:"syncify-muted"},fe>0?`Send another code in ${Po(fe)}`:"We only email sign-in codes.")),we))}var It=6,xa=600*1e3,va=300,Ca=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function Ea(e){let t=e.lastIndexOf("@");return t<1?e:`${e[0]}***${e.slice(t)}`}function kn(e){let t=be(new Date(e).toISOString());return t.startsWith("today")?t:`on ${t}`}function Po(e){return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function Ao(e){let t=Spicetify.React,n=e.openSection===e.id,i=`syncify-section-${e.id}`;return t.createElement("section",{className:"syncify-accordion-section","aria-label":e.title},t.createElement("button",{className:"syncify-accordion-header",type:"button","aria-expanded":n,"aria-controls":i,onClick:()=>e.onToggle(n?null:e.id)},t.createElement("span",{className:"syncify-accordion-title"},e.title),t.createElement(Re,null)),n?t.createElement("div",{className:"syncify-accordion-body",id:i},e.children):null)}function _a(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-shield",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"}))}function Ia(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-warning-icon",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M12 3 2 21h20z"}),e.createElement("path",{d:"M12 10v5"}),e.createElement("path",{d:"M12 18h.01"}))}function Re(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-chevron",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"m9 6 6 6-6 6"}))}function Na(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-lock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("rect",{x:"5",y:"11",width:"14",height:"10",rx:"2"}),e.createElement("path",{d:"M8 11V7a4 4 0 0 1 8 0v4"}))}function Ta(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-clock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("circle",{cx:"12",cy:"12",r:"9"}),e.createElement("path",{d:"M12 7v5l3 2"}))}function Pa(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-external",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M14 4h6v6"}),e.createElement("path",{d:"M20 4 10 14"}),e.createElement("path",{d:"M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"}))}function Mo(){let e=Spicetify.React;return e.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M18 6 6 18"}),e.createElement("path",{d:"m6 6 12 12"}))}var Aa=600*1e3,Ma=3,Ba={exists:!1,payload:null,backups:[],safetyCopy:null,claim:null},Da=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function La(e,t,n,i){var D;let o=new Set(t),s=new Set(n),r=n.filter(x=>!o.has(x)).length,l=t.filter(x=>!s.has(x)).length,c=(D=e.spicetify_config)!=null?D:null,y=!!(i&&!c),d=!y&&(i&&c?!Di(i,c):i!==c),k=[r?`${r} added`:null,l?`${l} removed`:null,d?"Spicetify config changed":null].filter(Boolean),f=be(e.metadata.last_sync_datetime),g=k.length?`${k.join(", ")} since ${f}`:`Last backup ${f}`;return y?`${g} \xB7 Spicetify config not saved yet`:g}function Bo(e){return e===1?"1 extension or theme":`${e} extensions and themes`}function be(e){let t=new Date(e);if(Number.isNaN(t.getTime()))return e;let n=t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),i=new Date,o=new Date(i);return o.setDate(i.getDate()-1),t.toDateString()===i.toDateString()?`today, ${n}`:t.toDateString()===o.toDateString()?`yesterday, ${n}`:`${t.toLocaleDateString(void 0,{month:"short",day:"numeric",year:t.getFullYear()===i.getFullYear()?void 0:"numeric"})}, ${n}`}function Lo(e){var y;let t=Spicetify.React,n=t.useState,{claim:i}=e,[o,s]=n(!1),[r,l]=n(null);async function c(){s(!0),l(null);try{await xt(F()),Spicetify.showNotification("Syncify: claim sent for review"),e.onClose()}catch(d){l(d instanceof Error?d.message:String(d)),s(!1)}}return t.createElement("div",{className:"syncify-panel"},t.createElement("p",{className:"syncify-claim-notice"},(y=i.email)!=null?y:"Someone"," is claiming this backup."," ",i.held?"Syncify is reviewing it.":`It goes through ${kn(i.final_at)} unless you stop it.`),r?t.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},r):null,t.createElement("div",{className:"syncify-actions"},t.createElement("button",{className:"syncify-text-button",type:"button",onClick:e.onClose,disabled:o},"Close"),t.createElement("button",{className:"syncify-button",type:"button",onClick:()=>{c()},disabled:o},"Not me")))}var Nt="[Syncify]";function K(e,t){if(t===void 0){console.debug(Nt,e);return}console.debug(Nt,e,t)}function je(e,t){if(t===void 0){console.warn(Nt,e);return}console.warn(Nt,e,t)}function Oa(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var Uo="syncify-styles";function Ua(){if(document.getElementById(Uo)){K("Another copy of Syncify is running; stopping this one");return}$a();let e=F();Pi({topbarButton:Ka(),menuItem:Wa()}),ft(e.entryPoint),nn(e.shortcut,Pt),io(Va).catch(t=>{je("Startup sync check failed",t)}),po().catch(t=>{je("Restore check failed",t)})}function $a(){let e=document.createElement("style");e.id=Uo,e.textContent=Gn,document.head.appendChild(e)}function Ka(){let{extensionName:e}=_(),t=new Spicetify.Topbar.Button(e,Ft,n=>{K("Topbar button clicked",Tt(n)),Pt()},!1,!0);return $o(t),Ha(t),qa(t),K("Topbar button registered",Tt(t)),t}function $o(e){var n;let t=e;e.element.style.setProperty("-webkit-app-region","no-drag"),(n=t.button)==null||n.style.setProperty("-webkit-app-region","no-drag")}var Oo=".main-actionButtons",Ra=".Root__globalNav, .Root__top-bar",ja=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function Ha(e){if(typeof MutationObserver=="undefined")return;let t=!1,n=null,i=()=>{t=!1,s();let r=e.element,l=document.querySelector(Oo);!r||!l||l.contains(r)||(l.prepend(r),Fa(e),$o(e),K("Topbar button re-attached",Tt(e)))},o=new MutationObserver(()=>{t||(t=!0,setTimeout(i,250))}),s=()=>{var c;if(n!=null&&n.isConnected)return;let r=document.querySelector(Oo),l=(c=r==null?void 0:r.closest(Ra))!=null?c:r==null?void 0:r.parentElement;if(o.disconnect(),n=l!=null?l:null,!l){o.observe(document.body,{childList:!0,subtree:!0});return}o.observe(l,{childList:!0,subtree:!0});for(let y=l.parentElement;y;y=y.parentElement)o.observe(y,{childList:!0})};i()}function Fa(e){let t=Ya(e);if(!t||t.className&&t.className!=="undefined")return;let n=Array.from(document.querySelectorAll(ja)).find(i=>!e.element.contains(i));n!=null&&n.className&&(t.className=n.className)}function Ya(e){return e.button}function Wa(){var e;if(typeof((e=Spicetify.Menu)==null?void 0:e.Item)!="function")return null;try{return new Spicetify.Menu.Item(_().extensionName,!1,()=>Pt(),za())}catch(t){return je("Failed to create profile menu item",t),null}}function za(){return Ft.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function qa(e){Object.assign(window,{SyncifyDebug:{button:e,element:e.element,openModal:Pt,inspect:()=>Tt(e),clickElement:()=>{var t;return(t=e.element)==null?void 0:t.click()},clickInnerButton:()=>{var t;return(t=e.button)==null?void 0:t.click()},clickCallback:()=>e.onClick(e)}})}function Tt(e){var t,n,i,o,s;return{label:e.label,disabled:e.disabled,isRight:e.isRight,hasElement:!!e.element,elementConnected:(t=e.element)==null?void 0:t.isConnected,elementDisabled:(n=e.element)==null?void 0:n.disabled,elementAriaDisabled:(i=e.element)==null?void 0:i.getAttribute("aria-disabled"),elementClass:(o=e.element)==null?void 0:o.className,appRegion:e.element?getComputedStyle(e.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:e.button?getComputedStyle(e.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:e.element?getComputedStyle(e.element).pointerEvents:null,visibility:e.element?getComputedStyle(e.element).visibility:null,display:e.element?getComputedStyle(e.element).display:null,rect:(s=e.element)==null?void 0:s.getBoundingClientRect().toJSON()}}var M=null;function Pt(){if(M!=null&&M.container.isConnected){K("Closing modal"),Spicetify.PopupModal.hide();return}K("Opening modal"),Ko(Spicetify.React.createElement(Do))}function Va(e){M!=null&&M.container.isConnected||(K("Opening claim notice"),Ko(Spicetify.React.createElement(Lo,{claim:e,onClose:()=>Spicetify.PopupModal.hide()})))}function Ko(e){var n;(n=M==null?void 0:M.root)==null||n.unmount();let t=document.createElement("div");M={container:t,root:null};try{Spicetify.PopupModal.display({title:_().extensionName,content:t,isLarge:!1})}catch(i){throw je("Failed to open PopupModal",i),i}Ga(t),Xa(t,e)}function Ga(e){requestAnimationFrame(()=>{let t=Ja(e);t==null||t.classList.add("syncify-modal-shell");let n=t==null?void 0:t.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');n&&(n.classList.add("syncify-modal-close"),n.setAttribute("aria-label",`Close ${_().extensionName}`),n.title="Close",n.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function Ja(e){let t=e.parentElement;for(;t&&t!==document.body;){if(t.querySelector(".main-trackCreditsModal-header"))return t;t=t.parentElement}return e.closest('[class*="trackCreditsModal"]')}function Xa(e,t){try{if(typeof Spicetify.ReactDOM.createRoot=="function"){let n=Spicetify.ReactDOM.createRoot(e);n.render(t),(M==null?void 0:M.container)===e&&(M.root=n),K("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(t,e),K("Modal rendered",{renderer:"render"})}catch(n){throw je("Failed to render modal",n),n}}fo();(function e(){if(!Oa()){setTimeout(e,100);return}K("Spicetify APIs ready"),Ua()})();})();
