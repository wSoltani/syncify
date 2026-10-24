// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var di=Object.defineProperty,pi=Object.defineProperties;var mi=Object.getOwnPropertyDescriptors;var ln=Object.getOwnPropertySymbols;var gi=Object.prototype.hasOwnProperty,hi=Object.prototype.propertyIsEnumerable;var un=(e,t,n)=>t in e?di(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,m=(e,t)=>{for(var n in t||(t={}))gi.call(t,n)&&un(e,n,t[n]);if(ln)for(var n of ln(t))hi.call(t,n)&&un(e,n,t[n]);return e},b=(e,t)=>pi(e,mi(t));var yn=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
    padding: 0;
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

.syncify-select {
    flex: 0 0 auto;
    max-width: 55%;
    padding: 6px 10px;
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
`;var mt=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var ki="syncify",ie="state";function gt(){let e;try{e=window.indexedDB}catch(t){return Promise.resolve(null)}return e?new Promise(t=>{let n;try{n=e.open(ki,1)}catch(o){t(null);return}n.onupgradeneeded=()=>{n.result.createObjectStore(ie)},n.onerror=()=>t(null),n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}function ht(e,t){let n=gt().then(o=>new Promise((i,r)=>{if(!o){r(new Error("IndexedDB isn't available."));return}try{let s=o.transaction(ie,e),l=t(s.objectStore(ie));s.oncomplete=()=>{o.close(),i(l.result)},s.onerror=s.onabort=()=>{var c;o.close(),r((c=s.error)!=null?c:new Error("IndexedDB failed."))}}catch(s){o.close(),r(s)}}));return Promise.race([n,new Promise((o,i)=>setTimeout(()=>i(new Error("IndexedDB took too long.")),2e3))])}function Me(e){return ht("readonly",t=>t.get(e))}async function Be(e,t){await ht("readwrite",n=>n.put(t,e))}async function fn(e){await ht("readwrite",t=>t.delete(e))}var H={extensionName:"Syncify",version:"1.8.0",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com"};function x(){var t,n,o,i,r,s,l,c;let e=window.SyncifyConfig;return{extensionName:(t=V(e==null?void 0:e.extensionName))!=null?t:H.extensionName,version:(n=dn(e==null?void 0:e.version))!=null?n:H.version,workerUrl:(o=V(e==null?void 0:e.workerUrl))!=null?o:H.workerUrl,webUrl:(i=V(e==null?void 0:e.webUrl))!=null?i:H.webUrl,githubUrl:(r=V(e==null?void 0:e.githubUrl))!=null?r:H.githubUrl,kofiUrl:(s=V(e==null?void 0:e.kofiUrl))!=null?s:H.kofiUrl,issueUrl:(l=V(e==null?void 0:e.issueUrl))!=null?l:H.issueUrl,releasesUrl:(c=V(e==null?void 0:e.releasesUrl))!=null?c:H.releasesUrl}}function V(e){return dn(e)}function dn(e){return typeof e=="string"&&e.trim()?e.trim():null}var wi="x-syncify-version",xi="x-syncify-install",vi="x-syncify-timezone",pn="install-id",mn="syncify:install-id",Ci=2e3,De=null;async function gn(){let e={[wi]:x().version,[xi]:await Ei()},t=Ti();return t&&(e[vi]=t),e}function Ei(){return De!=null||(De=Ii().catch(()=>Ue())),De}async function Ii(){let e=await Promise.race([_i(),new Promise(t=>setTimeout(()=>t(null),Ci))]);if(e)return e;try{let t=window.localStorage.getItem(mn);if(t&&hn(t))return t;let n=Ue();return window.localStorage.setItem(mn,n),n}catch(t){return Ue()}}async function _i(){let e=await gt();return e?new Promise(t=>{let n=null;try{let o=e.transaction(ie,"readwrite"),i=o.objectStore(ie),r=i.get(pn);r.onsuccess=()=>{if(typeof r.result=="string"&&hn(r.result)){n=r.result;return}n=Ue(),i.put(n,pn)},o.oncomplete=()=>{e.close(),t(n)},o.onerror=o.onabort=()=>{e.close(),t(null)}}catch(o){e.close(),t(null)}}):null}function Ue(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t=[...e].map(n=>n.toString(16).padStart(2,"0"));return[t.slice(0,4).join(""),t.slice(4,6).join(""),t.slice(6,8).join(""),t.slice(8,10).join(""),t.slice(10).join("")].join("-")}function hn(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(e)}function Ti(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(e){return null}}var Ni="x-syncify-user-hash",Pi="x-syncify-identity",Ai="/restores",Sn=3,ue=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}};async function bn(e,t,n){let o=await St(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(n)});if(!o.ok)throw new Error(`Backup failed with HTTP ${o.status}.`);let i=await o.json().catch(()=>null);return{unchanged:(i==null?void 0:i.unchanged)===!0}}async function kn(e,t){var l,c,y;let n=await St(e,t,{method:"GET"});if(n.status===404)return{exists:!1,payload:null,backups:[],safetyCopy:null};if(!n.ok)throw new Error(`Restore failed with HTTP ${n.status}.`);let o=await n.json(),i=[o,...(l=o.backup_history)!=null?l:[]];if(!i.every(f=>f.backup))return{exists:!0,payload:o,backups:i.slice(0,Sn),safetyCopy:(c=i[Sn])!=null?c:null};let r=i.filter(f=>{var g;return((g=f.backup)==null?void 0:g.kind)==="rolling"}),s=(y=i.find(f=>{var g;return((g=f.backup)==null?void 0:g.kind)==="anchor"}))!=null?y:null;return r.length===0&&s?{exists:!0,payload:o,backups:[s],safetyCopy:null}:{exists:!0,payload:o,backups:r,safetyCopy:s}}async function wn(e,t,n){try{await St(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:n}),keepalive:!0},Ai)}catch(o){}}async function St(e,t,n,o=""){let i=o?`${e.replace(/\/+$/,"")}${o}`:e,r=await fetch(i,b(m({},n),{headers:b(m(m({},n.headers),await gn()),{[Ni]:t.hash,[Pi]:t.field})}));if(r.status===426)throw new ue;return r}var se={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},Mi=/^([a-z0-9]|f([1-9]|1[0-2]))$/,Bi=250,Di=40,bt=null,Oe=null,re=null;function xn(){return/mac/i.test(navigator.platform||navigator.userAgent)}function vn(e){if(e===null)return null;if(!e||typeof e!="object")return se;let t=e;return typeof t.key!="string"||!Mi.test(t.key)?se:{key:t.key,ctrl:!!t.ctrl,alt:!!t.alt,shift:!!t.shift,meta:!!t.meta}}function ye(e){if(!e)return"Off";let t=e.key.toUpperCase();return xn()?[e.ctrl?"\u2318":"",e.alt?"\u2325":"",e.shift?"\u21E7":"",t].join(""):[e.ctrl&&"Ctrl",e.meta&&"Win",e.alt&&"Alt",e.shift&&"Shift",t].filter(Boolean).join("+")}function Cn(e){if(e.key==="Escape")return{kind:"cancel"};let t=Ui(e.code);if(!t)return{kind:"ignore"};let n=xn();if(n&&e.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let o={key:t,ctrl:n?e.metaKey:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:n?!1:e.metaKey},i=t.startsWith("f")&&t.length>1;return!o.ctrl&&!o.alt&&!o.meta&&!i?{kind:"error",message:`Include ${n?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:o}}function Ui(e){var n,o;let t=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(e);return t?((o=(n=t[1])!=null?n:t[2])!=null?o:t[3]).toLowerCase():null}function En(e){var t;if(re&&Oi(re,e))return!1;try{let n=Spicetify.Mousetrap,o=(t=n.trigger)==null?void 0:t.call(n)._directMap;if(!o)return!1;let i=kt(e);return Object.keys(o).some(r=>r.startsWith(`${i}:`))}catch(n){return!1}}function wt(e,t,n=0){if(bt=t,Oe=e,!In()){if(n>=Di){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>wt(Oe,t,n+1),Bi);return}xt(Oe)}function xt(e){if(Oe=e,!In()||!bt)return;let t=bt;try{if(re&&Spicetify.Keyboard._deregisterShortcut(re),re=null,!e)return;Spicetify.Keyboard.registerShortcut(e,n=>{n.preventDefault(),t()}),re=e,console.debug("[Syncify]","Keyboard shortcut registered",ye(e))}catch(n){console.warn("[Syncify]","Failed to register keyboard shortcut",n)}}function In(){var e;return typeof((e=Spicetify.Keyboard)==null?void 0:e.registerShortcut)=="function"}function kt(e){return[e.ctrl&&"mod",e.meta&&"meta",e.alt&&"alt",e.shift&&"shift",e.key].filter(Boolean).join("+")}function Oi(e,t){return kt(e)===kt(t)}var vt="both",Li=["both","topbar","menu"],fe=null,de=null,Le=!1;function _n(e){return Li.includes(e)?e:vt}function Tn(){var e;return typeof((e=Spicetify.Menu)==null?void 0:e.Item)=="function"}function Nn(e){fe=e.topbarButton,de=e.menuItem}function Re(e){let t=e!=="menu"||!de,n=e!=="topbar";if(fe!=null&&fe.element&&(fe.element.style.display=t?"":"none"),!!de)try{n&&!Le?(de.register(),Le=!0):!n&&Le&&(de.deregister(),Le=!1)}catch(o){console.warn("[Syncify]","Failed to update profile menu item",o)}}var $e="syncify:config",Ke={workerUrl:x().workerUrl,autoBackupEnabled:!1,shortcut:se,entryPoint:vt};function ae(){var n,o;let e=x(),t=(o=(n=Spicetify.LocalStorage)==null?void 0:n.get($e))!=null?o:window.localStorage.getItem($e);if(!t)return b(m({},Ke),{workerUrl:e.workerUrl});try{let i=JSON.parse(t);return{workerUrl:e.workerUrl,autoBackupEnabled:i.autoBackupEnabled===void 0?Ke.autoBackupEnabled:!!i.autoBackupEnabled,shortcut:i.shortcut===void 0?Ke.shortcut:vn(i.shortcut),entryPoint:_n(i.entryPoint)}}catch(i){return b(m({},Ke),{workerUrl:e.workerUrl})}}function je(e){var n;let t=JSON.stringify({workerUrl:x().workerUrl,autoBackupEnabled:e.autoBackupEnabled,shortcut:e.shortcut,entryPoint:e.entryPoint});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set($e,t);return}window.localStorage.setItem($e,t)}function He(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}async function Fe(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return[...new Uint8Array(n)].map(o=>o.toString(16).padStart(2,"0")).join("")}function pe(e){return JSON.stringify(Ct(e))}function Ct(e){return Array.isArray(e)?e.map(Ct):e&&typeof e=="object"?Object.keys(e).sort().reduce((t,n)=>(t[n]=Ct(e[n]),t),{}):e}var Ri=["username","canonicalUsername","id","uri","displayName"];async function Ye(){let{value:e,field:t}=await Ki();return{hash:await Fe(e),field:t}}async function Ki(){var i;let e=(i=Spicetify.Platform)==null?void 0:i.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let t=await e.getUser(),n=Ri.find(r=>(t==null?void 0:t[r])!=null),o=n?t[n]:void 0;if(!n||!o)throw new Error("Unable to resolve the active Spotify user.");return{value:o,field:n}}var $i=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,ji=100,Hi="marketplace:installed-extensions",Fi="marketplace:installed-themes",Yi="marketplace:theme-installed",zi="marketplace:installed:",Wi="marketplace";function It(e){return Spicetify.Config?_t(Spicetify.Config,e):null}function _t(e,t){var r;let n=F(e),o=new Set(qi(t)),i=((r=t[Yi])==null?void 0:r.includes(zi))===!0;return{current_theme:i?Wi:n.current_theme,color_scheme:i?"":n.color_scheme,extensions:n.extensions.filter(s=>!o.has(s)),custom_apps:n.custom_apps}}function F(e){let t=e&&typeof e=="object"?e:{};return{current_theme:Et(t.current_theme)?t.current_theme:"",color_scheme:Et(t.color_scheme)?t.color_scheme:"",extensions:Pn(t.extensions),custom_apps:Pn(t.custom_apps)}}function Bn(e,t){return pe(F(e))===pe(F(t))}function Pn(e){return Array.isArray(e)?[...new Set(e.filter(Et))].sort().slice(0,ji):[]}function Et(e){return typeof e=="string"&&$i.test(e)}function qi(e){let t=An(e[Hi]).map(o=>{var r;let i=(r=Mn(e[o]))==null?void 0:r.manifest;return i&&typeof i=="object"?i.main:void 0}),n=An(e[Fi]).flatMap(o=>{var r;let i=(r=Mn(e[o]))==null?void 0:r.include;return Array.isArray(i)?i:[]});return[...t,...n].flatMap(o=>{let i=typeof o=="string"?o.split("/").pop():void 0;return i?[i]:[]})}function An(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function Mn(e){try{let t=e?JSON.parse(e):null;return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch(t){return null}}function Dn(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var Vi=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],Gi="marketplace:installed:",Un=`${Gi}snippet:`,Ji="wsoltani/syncify",Xi="marketplace",On={added:0,removed:1,unchanged:2};function D(e){let t=new Map;for(let[n,o]of Vi)for(let i of tr(e[n]))t.has(i)||t.set(i,Qi(i,o,e[i]));return[...t.values()]}function Tt(e,t,n,o){let i=new Set(e.map(c=>c.key)),r=new Map(n.map(c=>[c.key,c])),s=[...e.map(c=>{let y=r.get(c.key);return b(m({},c),{change:y?"unchanged":"added",isNew:!y||y.sources.join(" ")!==c.sources.join(" ")})}),...n.filter(c=>!i.has(c.key)).map(c=>b(m({},c),{change:Nt(c,e)?"unchanged":"removed",isNew:!1}))].sort((c,y)=>On[c.change]-On[y.change]||c.name.localeCompare(y.name)),l={added:0,removed:0,unchanged:0};for(let c of s)l[c.change]+=1;return{items:s,counts:l,manual:Zi(t,o)}}function Nt(e,t){return e.type==="extension"&&Ln(e)&&!t.some(Ln)}function Ln(e){var t;return((t=e.repo)==null?void 0:t.toLowerCase())===Ji}function Zi(e,t){if(!e)return[];let n=F(e),o=F(t),i=[...n.extensions.filter(s=>!o.extensions.includes(s)).map(s=>({type:"extension",name:s})),...n.custom_apps.filter(s=>!o.custom_apps.includes(s)).map(s=>({type:"custom_app",name:s}))],r=n.current_theme;return r&&r!==Xi&&(r!==o.current_theme||n.color_scheme!==o.color_scheme)&&i.push(m({type:"theme",name:r},n.color_scheme?{scheme:n.color_scheme}:{})),i}function Qi(e,t,n){var c,y;let o=Rn(n),i=Rn(o==null?void 0:o.manifest),r=ze(o==null?void 0:o.user),s=ze(o==null?void 0:o.repo),l=(y=(c=ze(o==null?void 0:o.title))!=null?c:ze(i==null?void 0:i.name))!=null?y:e.startsWith(Un)?e.slice(Un.length):e.split("/").pop()||e;return{key:e,type:t,name:l,repo:t!=="snippet"&&r&&s?`${r}/${s}`:null,sources:er(t,o),custom:t==="snippet"&&(o==null?void 0:o.custom)===!0}}function er(e,t){return t?(e==="extension"?[t.extensionURL]:e==="theme"?[t.cssURL,t.schemesURL,...Array.isArray(t.include)?t.include:[]]:[]).filter(o=>typeof o=="string"&&o!==""):[]}function ze(e){return typeof e=="string"&&e.trim()?e.trim():null}function tr(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function Rn(e){let t=e;if(typeof e=="string")try{t=JSON.parse(e)}catch(n){return null}return t&&typeof t=="object"&&!Array.isArray(t)?t:null}var We="spicetify-marketplace";var me="settings";async function Kn(){let e=await Hn();if(e.kind!=="ok")return null;try{let t=await Fn(e.db,"readonly",o=>o.getAll());if(!t)return null;let n={};for(let o of t)typeof(o==null?void 0:o.key)=="string"&&typeof o.value=="string"&&(n[o.key]=o.value);return n}finally{e.db.close()}}async function $n(e){let t=await Hn();if(t.kind==="unavailable")return"unavailable";let n=t.kind==="ok"?t.db:await nr();if(!n)return"failed";try{return await Fn(n,"readwrite",i=>{let r;for(let[s,l]of Object.entries(e))r=i.put({key:s,value:l});return r})===null?"failed":"written"}finally{n.close()}}function jn(){var e;try{return(e=window.indexedDB)!=null?e:null}catch(t){return null}}async function Hn(){let e=jn();return e?await or(e)?{kind:"missing"}:new Promise(t=>{let n=!1,o=e.open(We);o.onupgradeneeded=()=>{n=!0},o.onerror=()=>{console.warn("Syncify could not open Marketplace storage",o.error),t({kind:"unavailable"})},o.onblocked=()=>t({kind:"unavailable"}),o.onsuccess=()=>{let i=o.result;if(n){i.close(),ir(e).then(()=>t({kind:"missing"}));return}if(!i.objectStoreNames.contains(me)){i.close(),t({kind:"unavailable"});return}t({kind:"ok",db:i})}}):{kind:"unavailable"}}function nr(){let e=jn();return e?new Promise(t=>{let n=e.open(We,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains(me)||o.createObjectStore(me,{keyPath:"key"})},n.onerror=()=>{console.warn("Syncify could not create Marketplace storage",n.error),t(null)},n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}async function or(e){if(typeof e.databases!="function")return!1;try{return!(await e.databases()).some(n=>n.name===We)}catch(t){return!1}}function ir(e){return new Promise(t=>{let n=e.deleteDatabase(We);n.onsuccess=()=>t(),n.onerror=()=>t(),n.onblocked=()=>t()})}function Fn(e,t,n){return new Promise(o=>{let i;try{i=e.transaction(me,t)}catch(y){console.warn("Syncify could not open a Marketplace transaction",y),o(null);return}let r,s=!1,l=y=>{s||(s=!0,o(y))};i.oncomplete=()=>l(r),i.onerror=()=>{console.warn("Syncify Marketplace transaction failed",i.error),l(null)},i.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",i.error),l(null)};let c;try{c=n(i.objectStore(me))}catch(y){console.warn("Syncify Marketplace request could not be issued",y),l(null);return}c&&(c.onsuccess=()=>{r=c.result},c.onerror=()=>{console.warn("Syncify Marketplace request failed",c.error),l(null)})})}var Pt="marketplace:",Yn=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function ge(){let e=dr(),t=await Kn();if(t)for(let[n,o]of Object.entries(t))n.startsWith(Pt)&&(e[n]=o);return e}var sr=new Set(["marketplace:active-tab","marketplace:sort"]),ar="marketplace:installed:",cr=["stars","tags","lastUpdated","created"];async function qe(e,t){let n={};for(let[o,i]of Object.entries(e))sr.has(o)||(n[o]=o.startsWith(ar)?lr(i):i);return t&&(n.spicetify_config=F(t)),Fe(pe(n))}function lr(e){try{let t=JSON.parse(e);if(!t||typeof t!="object"||Array.isArray(t))return e;for(let n of cr)delete t[n];return t}catch(t){return e}}async function Ve(){let e=await ge(),t=It(e);return{keyCount:Object.keys(e).length,hash:await qe(e,t),installedItemCount:yr(e),installedItems:qn(e),items:D(e),spicetifyConfig:t,marketplaceAvailable:fr(e)}}async function zn(){let e=await ge(),t=It(e);return m({schema_version:2,metadata:{last_sync_datetime:new Date().toISOString(),device_info:Dn(),marketplace_key_count:Object.keys(e).length},payload_hash:await qe(e,t),marketplace_data:{keys:e}},t?{spicetify_config:t}:{})}async function Wn(e){var r,s;let t={},n=(s=(r=e.marketplace_data)==null?void 0:r.keys)!=null?s:{};for(let[l,c]of Object.entries(n))l.startsWith(Pt)&&(t[l]=c);if(Object.keys(t).length===0)return 0;await ur(t);let o=Object.keys(t);for(let l of o)window.localStorage.setItem(l,t[l]);if(await $n(t)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try the restore again.");return o.length}async function ur(e){let t=await ge(),n=D(e),o=D(t).filter(s=>Nt(s,n));if(o.length===0)return;let i="marketplace:installed-extensions",r=Gn(e[i]).map(String);for(let s of o)r.includes(s.key)||r.push(s.key),e[s.key]=t[s.key];e[i]=JSON.stringify(r)}function yr(e){return qn(e).length}function qn(e){return Yn.flatMap(t=>Gn(e[t]).map(String))}function fr(e){return!!(window.Marketplace||Yn.some(n=>e[n]!==void 0)||e["marketplace:tabs"]!==void 0)}function Vn(e,t){return t===0?!1:e===0?!0:e<Math.max(2,Math.floor(t*.5))}function dr(){let e={};for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);if(!(n!=null&&n.startsWith(Pt)))continue;let o=window.localStorage.getItem(n);o!==null&&(e[n]=o)}return e}function Gn(e){if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch(t){return[]}}async function Ge(e){if(!He(e))throw new Error("Syncify backup service is not configured.");let[t,n]=await Promise.all([Ye(),zn()]);if(n.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:o}=await bn(e.workerUrl,t,n);return{payload:n,unchanged:o}}async function he(e){var r;if(!He(e))throw new Error("Syncify backup service is not configured.");let t=await kn(e.workerUrl,await Ye()),[n,o]=await Promise.all([Promise.all(t.backups.map(Jn)),t.safetyCopy?Jn(t.safetyCopy):null]),i=n.filter((s,l)=>n.findIndex(c=>c.payload_hash===s.payload_hash)===l);return b(m({},t),{payload:(r=i[0])!=null?r:null,backups:i,safetyCopy:o&&!i.some(s=>s.payload_hash===o.payload_hash)?o:null})}var At=new Map;async function Jn(e){var r,s,l;let t=(s=(r=e.marketplace_data)==null?void 0:r.keys)!=null?s:{},n=e.spicetify_config?_t(e.spicetify_config,t):void 0,o=`${e.payload_hash} ${(l=e.metadata)==null?void 0:l.last_sync_datetime}`,i=At.get(o);return i||(i=qe(t,n),At.set(o,i),i.catch(()=>At.delete(o))),b(m(m({},e),n?{spicetify_config:n}:{}),{payload_hash:await i})}async function Xn(e,t){var r;let n=t!=null?t:(await he(e)).payload;if(!n)throw new Error("No Syncify cloud backup was found for this Spotify account.");let o=await Wn(n),i=(r=n.backup)==null?void 0:r.id;return i&&He(e)&&Ye().then(s=>wn(e.workerUrl,s,i)).catch(()=>{}),{payload:n,restoredCount:o}}async function Zn(){var t,n,o;let e=ae();if(!(!e.workerUrl||!e.autoBackupEnabled))try{let[i,r]=await Promise.all([Ve(),he(e)]),s=(n=(t=r.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?n:0;if(r.exists&&Vn(i.keyCount,s)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((o=r.payload)==null?void 0:o.payload_hash)===i.hash||i.keyCount===0)return;await Ge(e),Spicetify.showNotification("Syncify auto-backup complete")}catch(i){let r=i instanceof Error?i.message:String(i);console.warn("Syncify startup sync failed:",i),Spicetify.showNotification(`Syncify auto-sync skipped: ${r}`,!0,8e3)}}var Bt="syncify:pending-restore",pr=600*1e3,mr=2e3,gr=15e3,hr="marketplace:theme-installed",Sr="raw.githubusercontent.com",br=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],G=null,Mt=new Set,to=new Map;function no(){return G}function oo(e){return Mt.add(e),()=>Mt.delete(e)}function io(){G&&lo(b(m({},G),{manual:[]}))}function Dt(e){try{localStorage.setItem(Bt,JSON.stringify({at:Date.now(),manual:e}))}catch(t){}}function ro(){var e;Dt((e=G==null?void 0:G.manual)!=null?e:[]),window.location.reload()}function so(){uo()&&(document.addEventListener("load",e=>Qn(e.target,"load"),!0),document.addEventListener("error",e=>Qn(e.target,"error"),!0))}async function ao(){let e=uo();if(!e)return;try{localStorage.removeItem(Bt)}catch(i){}let t=Date.now(),n=await eo();for(;n.loaded<n.total&&Date.now()-t<gr;)await new Promise(i=>setTimeout(i,mr)),n=await eo();lo(b(m({at:Date.now()},n),{manual:e.manual}));let o=n.loaded===n.total&&e.manual.length===0;Spicetify.showNotification(o?`Syncify: backup restored. ${kr(n)}.`:`Syncify: restored ${n.loaded} of ${n.total}. Open Syncify for details.`,!1,8e3)}function co(e){let t=e.map(n=>n.type==="extension"?`spicetify config extensions ${Je(n.name)}`:n.type==="custom_app"?`spicetify config custom_apps ${Je(n.name)}`:`spicetify config current_theme ${Je(n.name)}${n.scheme?` color_scheme ${Je(n.scheme)}`:""}`);return t.length>0?[...t,"spicetify apply"]:[]}function kr(e){return e.total===1?"It loaded":`All ${e.total} loaded`}function Je(e){return/^[\w.@+/-]+$/.test(e)?e:`"${e}"`}function lo(e){G=e;for(let t of Mt)t(e)}function uo(){var e;try{let t=JSON.parse((e=localStorage.getItem(Bt))!=null?e:"null");return!t||Date.now()-t.at>pr?null:{manual:Array.isArray(t.manual)?t.manual:[]}}catch(t){return null}}function Qn(e,t){e instanceof HTMLScriptElement&&e.src&&to.set(Se(e.src),t)}async function eo(){var o;let e=await ge(),t=(o=e[hr])!=null?o:"",n=D(e).filter(i=>i.type==="extension"&&i.sources.length>0||i.type==="theme"&&t.includes(i.key)||i.type==="snippet");return{loaded:n.filter(wr).length,total:n.length}}function wr(e){var t,n;if(e.type==="snippet"){let o=document.querySelector("style.marketplaceSnippets");return((t=o==null?void 0:o.textContent)==null?void 0:t.includes(`/* ${e.name} - `))===!0}if(e.type==="theme"){let o=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((n=o==null?void 0:o.textContent)!=null&&n.trim())}return xr(e.sources[0]).some(vr)}function xr(e){let t;try{t=new URL(e)}catch(s){return[]}if(t.host!==Sr)return[Se(t.href)];let[n,o,i,...r]=t.pathname.split("/").filter(Boolean);return!n||!o||!i||r.length===0?[]:br.map(s=>Se(`https://${s}/gh/${n}/${o}@${i}/${r.join("/")}`))}function vr(e){let t=to.get(e);return t?t==="load":[...document.querySelectorAll("script[src]")].some(o=>Se(o.src)===e)&&performance.getEntriesByType("resource").some(o=>Se(o.name)===e)}function Se(e){try{let t=new URL(e);return`${t.origin}${t.pathname}`}catch(t){return e}}var Cr="raw.githubusercontent.com",Er={extension:"spicetify-extensions",theme:"spicetify-themes"},Ir="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",_r="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",Tr="https://api.github.com/repos",Nr=5e3,Pr=20,yo="syncify:repo-topics",fo=10080*60*1e3,Ar=200;function Xe(e){return(e==null?void 0:e.kind)==="host"||(e==null?void 0:e.kind)==="repo"||(e==null?void 0:e.kind)==="blocked"||(e==null?void 0:e.kind)==="catalog"}function po(e){let t=new Map;for(let n of e){if(n.change==="removed")continue;if(n.custom){t.set(n.key,{kind:"custom"});continue}let o=Mr(n);o&&t.set(n.key,o)}return t}async function mo(e,t){let n=new Map,o=e.filter(s=>s.change!=="removed"&&s.isNew&&!t.has(s.key));if(o.length===0)return n;let i=o.filter(s=>s.type==="snippet"),r=o.filter(s=>s.type!=="snippet");if(i.length>0){let s=await Or();for(let l of i)s?s.has(ho(l.name))||n.set(l.key,{kind:"catalog"}):n.set(l.key,{kind:"unchecked"})}if(r.length>0){let s=await Ur(),l=Kr(),c=0;await Promise.all(r.map(async y=>{let f=Br(y),g=Er[y.type];if(!f||!g)return;if(s===null){n.set(y.key,{kind:"unchecked"});return}if(Dr(f,s)){n.set(y.key,{kind:"blocked"});return}let h=Rr(l,f);h===void 0&&c<Pr&&(c+=1,h=await Lr(f),h!==void 0&&(l[f.toLowerCase()]={topics:h,at:Date.now()})),h===void 0?n.set(y.key,{kind:"unchecked"}):(h===null||!h.includes(g))&&n.set(y.key,{kind:"catalog"})})),$r(l)}return n}function Mr(e){let t=null;for(let n of e.sources){let o;try{o=new URL(n)}catch(r){return{kind:"host",host:n.slice(0,40)}}if(o.host!==Cr)return{kind:"host",host:o.host};let i=go(o);i&&e.repo&&i.toLowerCase()!==e.repo.toLowerCase()&&(t!=null||(t=i))}return t?{kind:"repo",repo:t}:null}function Br(e){for(let t of e.sources)try{let n=go(new URL(t));if(n)return n}catch(n){}return e.repo}function go(e){let[t,n]=e.pathname.split("/").filter(Boolean);return t&&n?`${t}/${n}`:null}function Dr(e,t){let n=`https://github.com/${e}`.toLowerCase();return t.some(o=>{let i=o.toLowerCase();if(!i.includes("*"))return i===n;let r=i.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${r}$`).test(n)})}function ho(e){return e.replace(/\n/g,"").trim().toLowerCase()}var be=null,ke=null;function Ur(){return be!=null||(be=So(Ir).then(e=>{let t=e==null?void 0:e.repos;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&!n.startsWith("//")):(be=null,null)})),be}function Or(){return ke!=null||(ke=So(_r).then(e=>Array.isArray(e)?new Set(e.flatMap(t=>typeof(t==null?void 0:t.title)=="string"?[ho(t.title)]:[])):(ke=null,null))),ke}async function Lr(e){let t=await bo(`${Tr}/${e}`);if((t==null?void 0:t.status)===404)return null;if(!(t!=null&&t.ok))return;let n=await t.json().catch(()=>null);return Array.isArray(n==null?void 0:n.topics)?n.topics.filter(o=>typeof o=="string"):void 0}async function So(e){let t=await bo(e);return t!=null&&t.ok?t.json().catch(()=>null):null}async function bo(e){let t=typeof AbortController=="function"?new AbortController:null,n=setTimeout(()=>t==null?void 0:t.abort(),Nr);try{return await fetch(e,{signal:t==null?void 0:t.signal})}catch(o){return null}finally{clearTimeout(n)}}function Rr(e,t){let n=e[t.toLowerCase()];return n&&Date.now()-n.at<fo?n.topics:void 0}function Kr(){var e;try{let t=JSON.parse((e=localStorage.getItem(yo))!=null?e:"{}");return t&&typeof t=="object"?t:{}}catch(t){return{}}}function $r(e){let t=Date.now(),n=Object.entries(e).filter(([,o])=>t-o.at<fo).sort(([,o],[,i])=>i.at-o.at).slice(0,Ar);try{localStorage.setItem(yo,JSON.stringify(Object.fromEntries(n)))}catch(o){}}var jr="syncify-signature-v1",Hr={name:"ECDSA",hash:"SHA-256"};function ko(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function wo(e){return Ut(new Uint8Array(await crypto.subtle.exportKey("raw",e)))}async function xo(e,t,n,o,i){let r=await Fr(t,n,o,i),s=await crypto.subtle.sign(Hr,e,r);return Ut(new Uint8Array(s))}async function Fr(e,t,n,o){let{pathname:i,search:r}=new URL(n),s=new TextEncoder,l=Ut(new Uint8Array(await crypto.subtle.digest("SHA-256",s.encode(o))));return s.encode([jr,e,t.toUpperCase(),i+r,l].join(`
`))}function Ut(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var vo="device-key",Ot="session",Co="salt",J=null,we,Eo={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function Lt(e){if(J)return J;let t=await Me(vo);return Yr(t)?(J=Promise.resolve(t),t):e?(J=ko().then(async n=>(await Be(vo,n),n)),J.catch(()=>{J=null}),J):null}async function xe(){let e=await Me(Ot);return zr(e)?e:null}function Rt(e){return Be(Ot,e)}async function Ze(){await fn(Ot).catch(()=>{})}async function Io(){if(we===void 0){let e=await Me(Co).catch(()=>{});we=typeof e=="string"?e:null}return we}async function _o(e){e!==we&&(we=e,await Be(Co,e).catch(()=>{}))}function Qe(){return Eo}function To(e){Eo=e}function Yr(e){let t=e;return!!(t&&t.privateKey instanceof CryptoKey&&t.publicKey instanceof CryptoKey)}function zr(e){let t=e;return!!(t&&typeof t.token=="string"&&t.token&&typeof t.email=="string")}var Wr="/api/auth/email-otp/send-verification-otp",qr="/api/auth/sign-in/email-otp",Vr="/api/auth/get-session",Gr="/api/auth/sign-out",Jr="x-syncify-device-key",Xr="x-syncify-signature",No="x-syncify-salt",Zr="none",Qr={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again."},v=class extends Error{constructor(n,o=null){var i;super((i=Qr[n])!=null?i:"Sign-in failed. Try again.");this.code=n;this.retryAfter=o;this.name="AccountError"}};function et(e){return e instanceof v?e.message:"Sign-in failed. Try again."}async function Po(e){let t=await tt(Wr,{method:"POST",body:JSON.stringify({email:e,type:"sign-in"})});return typeof(t==null?void 0:t.resend_in)=="number"?t.resend_in:60}async function Ao(e,t){var r;let n=await Lt(!0).catch(()=>{throw new v("no_device_key")}),o=await tt(qr,{method:"POST",body:JSON.stringify({email:e,otp:t}),keys:n,sendPublicKey:!0});if(typeof(o==null?void 0:o.token)!="string"||!o.token)throw new v("sign_in_failed");let i={token:o.token,email:typeof((r=o.user)==null?void 0:r.email)=="string"?o.user.email:e};return await Rt(i).catch(()=>{throw new v("no_device_key")}),Kt=!0,i}var Kt=!1;async function Mo(){var t;let e=await xe();if(!e||Kt)return e;try{let n=await Do(e,Vr,"GET");Kt=!0;let o=(t=n==null?void 0:n.user)==null?void 0:t.email;if(typeof o!="string"||o===e.email)return e;let i=b(m({},e),{email:o});return await Rt(i).catch(()=>{}),i}catch(n){if(n instanceof v&&n.code==="signed_out")return null;throw n}}async function Bo(){let e=await xe().catch(()=>null);e&&await Do(e,Gr,"POST").catch(()=>{}),await Ze()}async function Do(e,t,n){let o=await Lt(!1);if(!o)throw await Ze(),new v("signed_out");return tt(t,{method:n,token:e.token,keys:o})}async function tt(e,t,n=!1){var f,g,h;let o=`${x().webUrl.replace(/\/+$/,"")}${e}`,i={};if(t.body!==void 0&&(i["content-type"]="application/json"),t.token&&(i.authorization=`Bearer ${t.token}`),t.keys){let E=(f=await Io())!=null?f:Zr;i[No]=E,i[Xr]=await xo(t.keys.privateKey,E,t.method,o,(g=t.body)!=null?g:""),t.sendPublicKey&&(i[Jr]=await wo(t.keys.publicKey))}let r;try{r=await fetch(o,{method:t.method,headers:i,body:t.body})}catch(E){throw new v("offline")}let s=r.headers.get(No);s&&await _o(s);let l=await r.json().catch(()=>null);if(r.ok)return l;let c=typeof(l==null?void 0:l.code)=="string"?l.code:r.status===503?"unavailable":"failed";if(c==="stale_salt"&&t.keys&&!n)return tt(e,t,!0);c==="signed_out"&&await Ze();let y=Number(r.headers.get("retry-after"));throw new v(c,Number.isFinite(y)&&y>0?y:(h=es[c])!=null?h:null)}var es={resend_wait:60,too_many_requests:60,send_failed:60};var ts="syncify:beta",Uo=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function Oo(){var e;return(e=window.SyncifyLoader)!=null?e:null}function ns(){try{return window.localStorage.getItem(ts)==="true"}catch(e){return!1}}async function Lo(e){let t=ns()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(t.map(o=>os(`${e}/${o}`)))).reduce((o,i)=>i&&(!o||jt(i,o)>0)?i:o,null)}function $t(e){return typeof e=="string"&&Uo.test(e)}function jt(e,t){let[n,o]=[e,t].map(i=>{var y;let[,r,s,l,c]=(y=Uo.exec(i))!=null?y:[];return[r,s,l,c!=null?c:1/0].map(Number)});for(let i=0;i<n.length;i+=1)if(n[i]!==o[i])return n[i]<o[i]?-1:1;return 0}async function os(e,t=3e3){let n=typeof AbortController=="function"?new AbortController:null,o=setTimeout(()=>n==null?void 0:n.abort(),t);try{let i=await fetch(e,{signal:n==null?void 0:n.signal});if(!i.ok)return null;let r=await i.json();return $t(r==null?void 0:r.version)?r.version:null}catch(i){return null}finally{clearTimeout(o)}}function Fo(){var sn;let e=Spicetify.React,t=e.useEffect,n=e.useMemo,o=e.useState,i=e.useRef,[r,s]=o(()=>ae()),[l,c]=o("idle"),[y,f]=o(null),[g,h]=o(0),[E,C]=o([]),[A,Ee]=o([]),[Y,X]=o(null),[z,O]=o(null),[I,st]=o(null),[_,ce]=o(null),[d,S]=o([]),[T,L]=o(null),[p,M]=o(null),[Z,Q]=o(!1),[at,W]=o(!1),[Ft,Ie]=o(!1),[_e,Yt]=o(null),[R,ee]=o(!1),[ct,te]=o(null),[zt,qo]=o(null),[Te,Vo]=o(!1),[w,Go]=o(()=>no()),[Jo,Wt]=o(!1),[q,Xo]=o(!1),[qt,Zo]=o(null),Vt=i(null),B=n(()=>x(),[]),ne=n(()=>T?[...d,T]:d,[d,T]),Gt=n(()=>new Map(ne.map(a=>[a,D(a.marketplace_data.keys)])),[ne]),Ne=a=>{var u;return(u=Gt.get(a))!=null?u:D(a.marketplace_data.keys)},Qo=a=>Ne(a).map(u=>u.key),ei=a=>Ne(a).length,K=n(()=>at&&p?Tt(Ne(p),p.spicetify_config,A,Y):null,[at,p,Gt,A,Y]),$=n(()=>K?po(K.items):null,[K]),ti=n(()=>new Map([..._e!=null?_e:[],...$!=null?$:[]]),[_e,$]),lt=n(()=>Tn(),[]),Jt=n(()=>Oo()!==null,[]),j=l==="loading",Pe=(y==null?void 0:y.kind)==="warning"||(y==null?void 0:y.kind)==="error"?y:null,Xt=!!(_&&I&&_.payload_hash!==I),le=!!(_&&I&&_.payload_hash===I),Zt=!!(p&&I&&p.payload_hash===I),ut=Te||!le||ne.length<2,ni=ut?d:d.slice(0,1),oi=!!(I&&g>0&&!ne.some(a=>a.payload_hash===I));t(()=>(en({silent:!0}),ii(),oo(Go)),[]),t(()=>{if(Yt(null),!K||!$)return;[...$.values()].some(Xe)&&Ie(!0);let a=!0;return mo(K.items,$).then(u=>{a&&(Yt(u),[...u.values()].some(Xe)&&Ie(!0))}),()=>{a=!1}},[K,$]),t(()=>{if(!R)return;let a=u=>{var N;if(!((N=Vt.current)!=null&&N.isConnected)){ee(!1),te(null);return}u.preventDefault(),u.stopImmediatePropagation();let k=Cn(u);if(k.kind!=="ignore"){if(k.kind==="cancel"){ee(!1),te(null);return}if(k.kind==="error"){te(k.message);return}if(En(k.shortcut)){te(`${ye(k.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}ee(!1),yt(k.shortcut)}};return window.addEventListener("keydown",a,!0),()=>window.removeEventListener("keydown",a,!0)},[R,r]);async function Qt(){let a=await Ve();return st(a.hash),h(a.installedItemCount),C(a.installedItems),Ee(a.items),X(a.spicetifyConfig),O(a.marketplaceAvailable),a}async function en(a){try{W(!1),c("loading"),a!=null&&a.silent||f({kind:"info",text:"Checking your Syncify backup\u2026"}),await Qt();let u=await he(r);ce(u.payload),S(u.backups),L(u.safetyCopy),M(u.payload),Q(!0),c(u.exists?"success":"idle"),a!=null&&a.silent||f(u.exists&&u.payload?{kind:"success",text:`Backup found from ${ve(u.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(u){ft(u)}}async function ii(){let a=B.version;if(!$t(a))return;let u=await Lo(B.releasesUrl);u&&jt(u,a)>0&&Zo(u)}function ri(a){let u=b(m({},r),{autoBackupEnabled:a});s(u),je(u),f({kind:"success",text:a?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}function yt(a){let u=b(m({},r),{shortcut:a});s(u),je(u),xt(a),te(null),f({kind:"success",text:a?`${ye(a)} now opens Syncify.`:"Keyboard shortcut turned off."})}function si(a){let u=b(m({},r),{entryPoint:a});s(u),je(u),Re(a)}function tn(a){qo(a),a!=="settings"&&ee(!1)}function ai(){te(null),ee(!0)}async function ci(){try{W(!1),c("loading"),f({kind:"info",text:"Backing up your extensions and themes\u2026"});let{payload:a,unchanged:u}=await Ge(r);if(await Qt(),u){Q(!0),c("success"),f({kind:"success",text:"Everything is already backed up."}),Spicetify.showNotification("Syncify: everything is already backed up");return}ce(a),S(k=>[a,...k.filter(N=>N.payload_hash!==a.payload_hash)].slice(0,hs)),L(k=>(k==null?void 0:k.payload_hash)===a.payload_hash?null:k),M(a),Q(!0),c("success"),f({kind:"success",text:`Backed up ${a.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(a){ft(a)}}function li(a=p){if(z===!1){let u="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";f({kind:"error",text:u}),Spicetify.showNotification(u,!0,6e3);return}if(!a){let u="No Syncify cloud backup was found for this Spotify account.";f({kind:"error",text:u}),Spicetify.showNotification(u,!0,6e3);return}M(a),Ie(!1),W(!0)}async function ui(){let a=p?Tt(Ne(p),p.spicetify_config,A,Y).manual:[];try{W(!1),c("loading"),f({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:u,restoredCount:k}=await Xn(r,p!=null?p:void 0);M(u),c("success"),f({kind:"success",text:`Restored ${k} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),Dt(a),setTimeout(()=>window.location.reload(),1e3)}catch(u){ft(u)}}async function yi(a){var u;try{await navigator.clipboard.writeText(a)}catch(k){let N=(u=Spicetify.Platform)==null?void 0:u.ClipboardAPI;if(!(N!=null&&N.copy))return;await N.copy(a)}Wt(!0),setTimeout(()=>Wt(!1),2e3)}function oe(a){if(a.startsWith("mailto:")){window.location.href=a;return}window.open(a,"_blank","noopener,noreferrer")}function ft(a){if(c("error"),a instanceof ue){Xo(!0),f(null);return}let u=a instanceof Error?a.message:String(a);f({kind:"error",text:u}),Spicetify.showNotification(u,!0,6e3)}function nn(a,u){let k=(p==null?void 0:p.payload_hash)===a.payload_hash,N=a.payload_hash===I,an=ve(a.metadata.last_sync_datetime),cn=Ho(ei(a));return e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":k,"data-selected":k?"true":"false",type:"button",key:`${a.payload_hash}-${a.metadata.last_sync_datetime}`,title:u!=null&&u.isSafetyCopy?"Kept aside and updated about once a week, so a burst of new backups can't replace it":void 0,onClick:()=>{M(a),W(!1)},disabled:j},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),u!=null&&u.isSafetyCopy?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Safety copy"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 updated weekly")),e.createElement("span",{className:"syncify-muted"},an," \xB7 ",cn)):e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-backup-date"},an),e.createElement("span",{className:"syncify-muted"},cn," \xB7 from ",a.metadata.device_info)),N?e.createElement("span",{className:"syncify-tag",title:"What's on this device now"},"Current"):null,u!=null&&u.isSafetyCopy?e.createElement(ps,null):null)}function dt(a){a.stopPropagation()}let fi=q?"Update Syncify to keep backing up":Z?_?Xt?"Changes since your last backup":"Everything is backed up":"No backup yet":l==="error"?"Couldn't check your backup":"Checking your backup\u2026",on=q?"Your backups are safe":Z?_?Xt?bs(_,Qo(_),E,Y):`Last backup ${ve(_.metadata.last_sync_datetime)}`:"Save your extensions and themes so you can restore them after a reinstall or on another computer.":null,rn=!!(w&&!q&&Date.now()-w.at<gs),Ae=!!(w&&w.loaded===w.total),pt=co((sn=w==null?void 0:w.manual)!=null?sn:[]);return e.createElement("div",{className:"syncify-panel",ref:Vt,onClick:dt,onMouseDown:dt,onPointerDown:dt},q?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,"This version of Syncify is no longer supported."),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>oe(`${B.githubUrl}#updating`)},"How to update")):null,pt.length>0?e.createElement("div",{className:"syncify-alert syncify-manual",role:"status"},e.createElement("span",{className:"syncify-manual-header"},e.createElement("span",null,w.manual.length===1?"1 isn't from Marketplace. Add it in a terminal:":`${w.manual.length} aren't from Marketplace. Add them in a terminal:`),e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:io},e.createElement(jo,null))),e.createElement("span",{className:"syncify-code"},e.createElement("code",null,pt.join(`
`)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{yi(pt.join(`
`))}},Jo?"Copied":"Copy"))):null,Pe?e.createElement("div",{className:"syncify-alert","data-kind":Pe.kind},e.createElement("span",null,Pe.text),e.createElement("span",{className:"syncify-alert-actions"},Pe.kind==="error"?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{en()},disabled:j},"Try again"):null,e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>f(null)},e.createElement(jo,null)))):null,e.createElement("section",{className:"syncify-status","aria-live":"polite"},rn&&w?e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},Ae?"Backup restored":`Restored ${w.loaded} of ${w.total}`),e.createElement("p",{className:"syncify-muted"},Ae?w.total===0?"Nothing from Marketplace to load":`${w.loaded} of ${w.total} loaded`:"Missing something? Reload Spotify once more."),Ae?e.createElement("p",{className:"syncify-muted"},"Syncify saved your setup?"," ",e.createElement("button",{className:"syncify-text-button syncify-inline-button",type:"button",onClick:()=>oe(B.kofiUrl)},"Support it on Ko-fi")):null):e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},fi),e.createElement("p",{className:"syncify-muted"},on?`${on} \xB7 `:"",Ho(g)," on this device")),rn&&!Ae?e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:ro},"Reload"):e.createElement("button",{className:"syncify-button",type:"button",onClick:ci,disabled:j||le||q,title:le?"No changes since your last backup":void 0},j?"Working\u2026":le?"Backed up":"Back up now")),d.length>0?e.createElement("section",{className:"syncify-section","aria-label":"Backups"},e.createElement("div",{className:"syncify-section-header"},e.createElement("h4",{className:"syncify-section-title"},"Backups"),le&&ne.length>1?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":Te,"aria-controls":"syncify-backup-list",onClick:()=>{Vo(!Te),W(!1)}},Te?"Show less":`Show all ${ne.length}`,e.createElement(Ht,null)):null),e.createElement("div",{className:"syncify-backup-list",id:"syncify-backup-list",role:"radiogroup","aria-label":"Choose a backup to restore"},ni.map(a=>nn(a)),ut&&T?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),nn(T,{isSafetyCopy:!0})):null),ut?z===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to restore a backup."):at?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},"Restore"," ",p?ve(p.metadata.last_sync_datetime):"this backup","?"),K?e.createElement(ss,{preview:K,checks:ti,expanded:Ft,onToggle:()=>Ie(!Ft)}):null,e.createElement("div",{className:"syncify-actions"},oi?e.createElement("div",{className:"syncify-alert syncify-actions-hint"},"Your current setup isn't backed up."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>W(!1),disabled:j},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:ui,disabled:j},"Restore"))):e.createElement("div",{className:"syncify-actions"},Zt?e.createElement("span",{className:"syncify-muted syncify-actions-hint"},"This backup is already current."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>li(),disabled:j||!p||Zt},"Restore backup")):null):null,e.createElement("div",{className:"syncify-accordion"},e.createElement($o,{id:"account",title:"Account",openSection:zt,onToggle:tn},e.createElement(ls,null)),e.createElement($o,{id:"settings",title:"Settings",openSection:zt,onToggle:tn},e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Back up automatically"),e.createElement("span",{className:"syncify-muted"},"When Spotify starts and something has changed")),e.createElement("input",{className:"syncify-switch",type:"checkbox",role:"switch",checked:r.autoBackupEnabled&&!q,onChange:a=>ri(a.currentTarget.checked),disabled:j||q})),e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Open Syncify from"),lt?r.entryPoint==="menu"&&!r.shortcut?e.createElement("span",{className:"syncify-muted"},"Keep a shortcut in case a Spotify update breaks the menu"):null:e.createElement("span",{className:"syncify-muted"},"The profile menu isn't available in this Spicetify version")),e.createElement("select",{className:"syncify-select",value:lt?r.entryPoint:"topbar",onChange:a=>si(a.currentTarget.value),disabled:!lt},Ss.map(a=>e.createElement("option",{key:a.value,value:a.value},a.label)))),e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Keyboard shortcut"),R&&!ct?e.createElement("span",{className:"syncify-muted"},"Press a key combination, or Esc to cancel"):null),e.createElement("span",{className:"syncify-shortcut"},r.shortcut&&!R?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>yt(null)},"Turn off"):null,!r.shortcut&&!R?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>yt(se)},"Use default"):null,e.createElement("button",{className:"syncify-key",type:"button","data-recording":R?"true":"false",onClick:()=>R?ee(!1):ai(),title:"Click to change"},R?"Press keys\u2026":r.shortcut?ye(r.shortcut):"Off"))),ct?e.createElement("div",{className:"syncify-alert",role:"alert"},ct):null)),e.createElement("footer",{className:"syncify-footer"},e.createElement("span",{className:"syncify-footer-version"},e.createElement("span",null,"Syncify ",B.version),qt?e.createElement("button",{className:"syncify-text-button syncify-update",type:"button",onClick:()=>Jt?window.location.reload():oe(`${B.githubUrl}#updating`)},qt," is out \xB7 ",Jt?"Reload":"How to update"):null),e.createElement("span",{className:"syncify-footer-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>oe(B.issueUrl)},"Report an issue"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>oe(B.githubUrl)},"GitHub"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>oe(B.kofiUrl)},"Support on Ko-fi"))))}var Ro={added:{mark:"+",label:"Added"},removed:{mark:"\u2212",label:"Removed"},unchanged:{mark:"=",label:"Unchanged"}},is=[["extension","Extensions"],["theme","Themes"],["snippet","Snippets"]],rs={extension:"extension",custom_app:"custom app",theme:"theme"};function ss(e){let t=Spicetify.React,{items:n,counts:o,manual:i}=e.preview;return t.createElement(t.Fragment,null,t.createElement("div",{className:"syncify-chips","aria-label":"What changes on this device"},o.added?t.createElement("span",{className:"syncify-chip","data-change":"added"},"+",o.added," added"):null,o.removed?t.createElement("span",{className:"syncify-chip","data-change":"removed"},"\u2212",o.removed," removed"):null,o.unchanged?t.createElement("span",{className:"syncify-chip"},o.unchanged," unchanged"):null,i.length?t.createElement("span",{className:"syncify-chip"},i.length," to add manually"):null),n.length||i.length?t.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":e.expanded,"aria-controls":"syncify-restore-changes",onClick:e.onToggle},e.expanded?"Hide changes":"Show changes",t.createElement(Ht,null)):null,e.expanded?t.createElement("div",{className:"syncify-changes",id:"syncify-restore-changes"},is.map(([r,s])=>{let l=n.filter(c=>c.type===r);return l.length===0?null:t.createElement("section",{key:r,"aria-label":s},t.createElement("h5",{className:"syncify-change-group"},s),t.createElement("ul",{className:"syncify-change-list"},l.map(c=>t.createElement("li",{className:"syncify-change",key:c.key},t.createElement("span",{className:"syncify-mark","data-change":c.change,role:"img","aria-label":Ro[c.change].label},Ro[c.change].mark),t.createElement("span",{className:"syncify-change-name"},c.name,c.repo?t.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",c.repo):null),e.checks.has(c.key)?t.createElement(cs,{check:e.checks.get(c.key)}):null))))}),i.length?t.createElement("section",{"aria-label":"Add manually"},t.createElement("h5",{className:"syncify-change-group"},"Add manually"),t.createElement("ul",{className:"syncify-change-list"},i.map(r=>t.createElement("li",{className:"syncify-change",key:`${r.type}:${r.name}`},t.createElement("span",{className:"syncify-mark","aria-hidden":"true"}),t.createElement("span",{className:"syncify-change-name"},r.name,t.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",rs[r.type],r.scheme?`, ${r.scheme}`:"")))))):null):null)}var as={host:"Loads from outside GitHub",repo:"Its code is in a different repo than the one it names",blocked:"On Marketplace's block list",catalog:"Not in Marketplace's catalog",unchecked:"GitHub couldn't be reached to check it",custom:"A snippet made in Marketplace, not from its list"};function cs(e){let t=Spicetify.React,{check:n}=e,o=Xe(n),i=n.kind==="host"?`Code from ${n.host}`:n.kind==="repo"?`Code from ${n.repo}`:n.kind==="blocked"?"Blocked by Marketplace":n.kind==="catalog"?"Not in Marketplace":n.kind==="unchecked"?"Not checked":"Custom";return t.createElement("span",{className:"syncify-source","data-warning":o?"true":"false",title:as[n.kind]},o?t.createElement(ms,null):null,i)}function ls(){let e=Spicetify.React,t=e.useEffect,n=e.useState,[o,i]=n(void 0),[r,s]=n(()=>Qe()),[l,c]=n(()=>Qe().email),[y,f]=n(""),[g,h]=n(!1),[E,C]=n(null),[A,Ee]=n(()=>Date.now()),Y=!!(r.codeSentAt&&A-r.codeSentAt<us),X=Math.max(0,Math.ceil((r.retryAt-A)/1e3)),z=r.retryEmail===null||r.retryEmail===l.trim().toLowerCase()?X:0;t(()=>{let d=!0;return xe().catch(()=>null).then(S=>{d&&(i(S),S&&Mo().then(T=>{d&&(i(T),T||C({kind:"warning",text:et(new v("signed_out"))}))}).catch(()=>{}))}),()=>{d=!1}},[]),t(()=>{if(r.retryAt<=Date.now())return;let d=setInterval(()=>{Ee(Date.now()),r.retryAt<=Date.now()&&clearInterval(d)},1e3);return()=>clearInterval(d)},[r.retryAt]);function O(d){let S=m(m({},Qe()),d);To(S),s(S),Ee(Date.now())}async function I(d){var T;let S=d.trim();if(!fs.test(S)){C({kind:"error",text:"Enter a valid email address."});return}h(!0),C(null);try{let L=await Po(S);O({email:S,codeSentAt:Date.now(),retryAt:Date.now()+L*1e3,retryEmail:S.toLowerCase()}),f("")}catch(L){let p=L instanceof v?L:null,M=(T=p==null?void 0:p.retryAfter)!=null?T:null,Z=M&&M<=ys?Date.now()+M*1e3:0,Q=(p==null?void 0:p.code)==="too_many_requests"?null:S.toLowerCase();if((p==null?void 0:p.code)==="resend_wait"){O({email:S,codeSentAt:r.email===S&&r.codeSentAt?r.codeSentAt:Date.now(),retryAt:Z,retryEmail:Q});return}Z&&O({retryAt:Z,retryEmail:Q}),C({kind:"error",text:et(L)})}finally{h(!1)}}async function st(){h(!0),C(null);try{let d=await Ao(r.email,y);O({codeSentAt:null}),f(""),i(d)}catch(d){C({kind:"error",text:et(d)});let S=d instanceof v?d.code:null;(S==="too_many_attempts"||S==="code_expired")&&f("")}finally{h(!1)}}async function _(){var S;let d=(S=o==null?void 0:o.email)!=null?S:"";h(!0),C(null),await Bo(),O({email:d,codeSentAt:null}),c(d),i(null),h(!1)}let ce=E?e.createElement("div",{className:"syncify-alert","data-kind":E.kind==="error"?"error":void 0,role:"alert"},E.text):null;return o===void 0?null:o?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",{className:"syncify-account-email"},o.email),e.createElement("span",{className:"syncify-muted"},"Signed in")),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{_()},disabled:g},"Sign out")),ce):e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Secure your backup"),e.createElement("span",{className:"syncify-muted"},"So only you can restore it"))),e.createElement("form",{className:"syncify-confirm",noValidate:!0,onSubmit:d=>{d.preventDefault(),!g&&(Y?y.length===nt&&st():z||I(l))}},Y?e.createElement(e.Fragment,null,e.createElement("p",{className:"syncify-muted"},"Code sent to ",ds(r.email)),e.createElement("div",{className:"syncify-field"},e.createElement("input",{className:"syncify-input syncify-code-input",type:"text",inputMode:"numeric",autoComplete:"one-time-code","aria-label":"6-digit code",placeholder:"123456",maxLength:nt,value:y,onChange:d=>f(d.currentTarget.value.replace(/\D/g,"").slice(0,nt)),autoFocus:!0}),e.createElement("button",{className:"syncify-button",type:"submit",disabled:g||y.length!==nt},g?"Verifying\u2026":"Verify")),e.createElement("p",{className:"syncify-muted syncify-account-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{I(r.email)},disabled:g||X>0},X>0?`Resend in ${Ko(X)}`:"Resend code"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{O({codeSentAt:null}),f(""),C(null)},disabled:g},"Use another email"))):e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-field"},e.createElement("input",{className:"syncify-input",type:"email",autoComplete:"email","aria-label":"Email",placeholder:"you@example.com",value:l,onChange:d=>c(d.currentTarget.value),autoFocus:!0}),e.createElement("button",{className:"syncify-button",type:"submit",disabled:g||z>0||!l.trim()},g?"Sending\u2026":"Send code")),e.createElement("p",{className:"syncify-muted"},z>0?`Send another code in ${Ko(z)}`:"We only email sign-in codes.")),ce))}var nt=6,us=600*1e3,ys=300,fs=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function ds(e){let t=e.lastIndexOf("@");return t<1?e:`${e[0]}***${e.slice(t)}`}function Ko(e){return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function $o(e){let t=Spicetify.React,n=e.openSection===e.id,o=`syncify-section-${e.id}`;return t.createElement("section",{className:"syncify-accordion-section","aria-label":e.title},t.createElement("button",{className:"syncify-accordion-header",type:"button","aria-expanded":n,"aria-controls":o,onClick:()=>e.onToggle(n?null:e.id)},t.createElement("span",{className:"syncify-accordion-title"},e.title),t.createElement(Ht,null)),n?t.createElement("div",{className:"syncify-accordion-body",id:o},e.children):null)}function ps(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-shield",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"}))}function ms(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-warning-icon",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M12 3 2 21h20z"}),e.createElement("path",{d:"M12 10v5"}),e.createElement("path",{d:"M12 18h.01"}))}function Ht(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-chevron",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"m9 6 6 6-6 6"}))}function jo(){let e=Spicetify.React;return e.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M18 6 6 18"}),e.createElement("path",{d:"m6 6 12 12"}))}var gs=600*1e3,hs=3,Ss=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function bs(e,t,n,o){var C;let i=new Set(t),r=new Set(n),s=n.filter(A=>!i.has(A)).length,l=t.filter(A=>!r.has(A)).length,c=(C=e.spicetify_config)!=null?C:null,y=!!(o&&!c),f=!y&&(o&&c?!Bn(o,c):o!==c),g=[s?`${s} added`:null,l?`${l} removed`:null,f?"Spicetify config changed":null].filter(Boolean),h=ve(e.metadata.last_sync_datetime),E=g.length?`${g.join(", ")} since ${h}`:`Last backup ${h}`;return y?`${E} \xB7 Spicetify config not saved yet`:E}function Ho(e){return e===1?"1 extension or theme":`${e} extensions and themes`}function ve(e){let t=new Date(e);if(Number.isNaN(t.getTime()))return e;let n=t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),o=new Date,i=new Date(o);return i.setDate(o.getDate()-1),t.toDateString()===o.toDateString()?`today, ${n}`:t.toDateString()===i.toDateString()?`yesterday, ${n}`:`${t.toLocaleDateString(void 0,{month:"short",day:"numeric",year:t.getFullYear()===o.getFullYear()?void 0:"numeric"})}, ${n}`}var ot="[Syncify]";function U(e,t){if(t===void 0){console.debug(ot,e);return}console.debug(ot,e,t)}function Ce(e,t){if(t===void 0){console.warn(ot,e);return}console.warn(ot,e,t)}function ks(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var zo="syncify-styles";function ws(){if(document.getElementById(zo)){U("Another copy of Syncify is running; stopping this one");return}xs();let e=ae();Nn({topbarButton:vs(),menuItem:Ns()}),Re(e.entryPoint),wt(e.shortcut,rt),Zn().catch(t=>{Ce("Startup sync check failed",t)}),ao().catch(t=>{Ce("Restore check failed",t)})}function xs(){let e=document.createElement("style");e.id=zo,e.textContent=yn,document.head.appendChild(e)}function vs(){let{extensionName:e}=x(),t=new Spicetify.Topbar.Button(e,mt,n=>{U("Topbar button clicked",it(n)),rt()},!1,!0);return Wo(t),Is(t),As(t),U("Topbar button registered",it(t)),t}function Wo(e){var n;let t=e;e.element.style.setProperty("-webkit-app-region","no-drag"),(n=t.button)==null||n.style.setProperty("-webkit-app-region","no-drag")}var Yo=".main-actionButtons",Cs=".Root__globalNav, .Root__top-bar",Es=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function Is(e){if(typeof MutationObserver=="undefined")return;let t=!1,n=null,o=()=>{t=!1,r();let s=e.element,l=document.querySelector(Yo);!s||!l||l.contains(s)||(l.prepend(s),_s(e),Wo(e),U("Topbar button re-attached",it(e)))},i=new MutationObserver(()=>{t||(t=!0,setTimeout(o,250))}),r=()=>{var c;if(n!=null&&n.isConnected)return;let s=document.querySelector(Yo),l=(c=s==null?void 0:s.closest(Cs))!=null?c:s==null?void 0:s.parentElement;if(i.disconnect(),n=l!=null?l:null,!l){i.observe(document.body,{childList:!0,subtree:!0});return}i.observe(l,{childList:!0,subtree:!0});for(let y=l.parentElement;y;y=y.parentElement)i.observe(y,{childList:!0})};o()}function _s(e){let t=Ts(e);if(!t||t.className&&t.className!=="undefined")return;let n=Array.from(document.querySelectorAll(Es)).find(o=>!e.element.contains(o));n!=null&&n.className&&(t.className=n.className)}function Ts(e){return e.button}function Ns(){var e;if(typeof((e=Spicetify.Menu)==null?void 0:e.Item)!="function")return null;try{return new Spicetify.Menu.Item(x().extensionName,!1,()=>rt(),Ps())}catch(t){return Ce("Failed to create profile menu item",t),null}}function Ps(){return mt.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function As(e){Object.assign(window,{SyncifyDebug:{button:e,element:e.element,openModal:rt,inspect:()=>it(e),clickElement:()=>{var t;return(t=e.element)==null?void 0:t.click()},clickInnerButton:()=>{var t;return(t=e.button)==null?void 0:t.click()},clickCallback:()=>e.onClick(e)}})}function it(e){var t,n,o,i,r;return{label:e.label,disabled:e.disabled,isRight:e.isRight,hasElement:!!e.element,elementConnected:(t=e.element)==null?void 0:t.isConnected,elementDisabled:(n=e.element)==null?void 0:n.disabled,elementAriaDisabled:(o=e.element)==null?void 0:o.getAttribute("aria-disabled"),elementClass:(i=e.element)==null?void 0:i.className,appRegion:e.element?getComputedStyle(e.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:e.button?getComputedStyle(e.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:e.element?getComputedStyle(e.element).pointerEvents:null,visibility:e.element?getComputedStyle(e.element).visibility:null,display:e.element?getComputedStyle(e.element).display:null,rect:(r=e.element)==null?void 0:r.getBoundingClientRect().toJSON()}}var P=null;function rt(){var t;if(P!=null&&P.container.isConnected){U("Closing modal"),Spicetify.PopupModal.hide();return}U("Opening modal"),(t=P==null?void 0:P.root)==null||t.unmount();let e=document.createElement("div");P={container:e,root:null};try{Spicetify.PopupModal.display({title:x().extensionName,content:e,isLarge:!1})}catch(n){throw Ce("Failed to open PopupModal",n),n}Ms(e),Ds(e)}function Ms(e){requestAnimationFrame(()=>{let t=Bs(e);t==null||t.classList.add("syncify-modal-shell");let n=t==null?void 0:t.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');n&&(n.classList.add("syncify-modal-close"),n.setAttribute("aria-label",`Close ${x().extensionName}`),n.title="Close",n.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function Bs(e){let t=e.parentElement;for(;t&&t!==document.body;){if(t.querySelector(".main-trackCreditsModal-header"))return t;t=t.parentElement}return e.closest('[class*="trackCreditsModal"]')}function Ds(e){try{let t=Spicetify.React.createElement(Fo);if(typeof Spicetify.ReactDOM.createRoot=="function"){let n=Spicetify.ReactDOM.createRoot(e);n.render(t),(P==null?void 0:P.container)===e&&(P.root=n),U("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(t,e),U("Modal rendered",{renderer:"render"})}catch(t){throw Ce("Failed to render modal",t),t}}so();(function e(){if(!ks()){setTimeout(e,100);return}U("Spicetify APIs ready"),ws()})();})();
