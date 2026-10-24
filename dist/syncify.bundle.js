// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var Po=Object.defineProperty,Mo=Object.defineProperties;var Ao=Object.getOwnPropertyDescriptors;var Dt=Object.getOwnPropertySymbols;var Bo=Object.prototype.hasOwnProperty,Uo=Object.prototype.propertyIsEnumerable;var jt=(e,t,n)=>t in e?Po(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,d=(e,t)=>{for(var n in t||(t={}))Bo.call(t,n)&&jt(e,n,t[n]);if(Dt)for(var n of Dt(t))Uo.call(t,n)&&jt(e,n,t[n]);return e},g=(e,t)=>Mo(e,Ao(t));var $t=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var qe=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var R={extensionName:"Syncify",version:"1.7.0",workerUrl:"https://syncify-worker.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com"};function k(){var t,n,o,i,r,a,l;let e=window.SyncifyConfig;return{extensionName:(t=K(e==null?void 0:e.extensionName))!=null?t:R.extensionName,version:(n=Ht(e==null?void 0:e.version))!=null?n:R.version,workerUrl:(o=K(e==null?void 0:e.workerUrl))!=null?o:R.workerUrl,githubUrl:(i=K(e==null?void 0:e.githubUrl))!=null?i:R.githubUrl,kofiUrl:(r=K(e==null?void 0:e.kofiUrl))!=null?r:R.kofiUrl,issueUrl:(a=K(e==null?void 0:e.issueUrl))!=null?a:R.issueUrl,releasesUrl:(l=K(e==null?void 0:e.releasesUrl))!=null?l:R.releasesUrl}}function K(e){return Ht(e)}function Ht(e){return typeof e=="string"&&e.trim()?e.trim():null}var Oo="x-syncify-version",Do="x-syncify-install",jo="x-syncify-timezone",$o="syncify",Je="state",Ft="install-id",Kt="syncify:install-id",Ho=2e3,Se=null;async function Yt(){let e={[Oo]:k().version,[Do]:await Fo()},t=zo();return t&&(e[jo]=t),e}function Fo(){return Se!=null||(Se=Ko().catch(()=>ke())),Se}async function Ko(){let e=await Promise.race([Yo(),new Promise(t=>setTimeout(()=>t(null),Ho))]);if(e)return e;try{let t=window.localStorage.getItem(Kt);if(t&&zt(t))return t;let n=ke();return window.localStorage.setItem(Kt,n),n}catch(t){return ke()}}function Yo(){let e;try{e=window.indexedDB}catch(t){return Promise.resolve(null)}return e?new Promise(t=>{let n;try{n=e.open($o,1)}catch(o){t(null);return}n.onupgradeneeded=()=>{n.result.createObjectStore(Je)},n.onerror=()=>t(null),n.onblocked=()=>t(null),n.onsuccess=()=>{let o=n.result,i=null;try{let r=o.transaction(Je,"readwrite"),a=r.objectStore(Je),l=a.get(Ft);l.onsuccess=()=>{if(typeof l.result=="string"&&zt(l.result)){i=l.result;return}i=ke(),a.put(i,Ft)},r.oncomplete=()=>{o.close(),t(i)},r.onerror=r.onabort=()=>{o.close(),t(null)}}catch(r){o.close(),t(null)}}}):Promise.resolve(null)}function ke(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t=[...e].map(n=>n.toString(16).padStart(2,"0"));return[t.slice(0,4).join(""),t.slice(4,6).join(""),t.slice(6,8).join(""),t.slice(8,10).join(""),t.slice(10).join("")].join("-")}function zt(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(e)}function zo(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(e){return null}}var Wo="x-syncify-user-hash",Vo="x-syncify-identity",qo="/restores",Wt=3,G=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}};async function Vt(e,t,n){let o=await Ge(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(n)});if(!o.ok)throw new Error(`Backup failed with HTTP ${o.status}.`);let i=await o.json().catch(()=>null);return{unchanged:(i==null?void 0:i.unchanged)===!0}}async function qt(e,t){var l,c,y;let n=await Ge(e,t,{method:"GET"});if(n.status===404)return{exists:!1,payload:null,backups:[],safetyCopy:null};if(!n.ok)throw new Error(`Restore failed with HTTP ${n.status}.`);let o=await n.json(),i=[o,...(l=o.backup_history)!=null?l:[]];if(!i.every(f=>f.backup))return{exists:!0,payload:o,backups:i.slice(0,Wt),safetyCopy:(c=i[Wt])!=null?c:null};let r=i.filter(f=>{var S;return((S=f.backup)==null?void 0:S.kind)==="rolling"}),a=(y=i.find(f=>{var S;return((S=f.backup)==null?void 0:S.kind)==="anchor"}))!=null?y:null;return r.length===0&&a?{exists:!0,payload:o,backups:[a],safetyCopy:null}:{exists:!0,payload:o,backups:r,safetyCopy:a}}async function Jt(e,t,n){try{await Ge(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:n}),keepalive:!0},qo)}catch(o){}}async function Ge(e,t,n,o=""){let i=o?`${e.replace(/\/+$/,"")}${o}`:e,r=await fetch(i,g(d({},n),{headers:g(d(d({},n.headers),await Yt()),{[Wo]:t.hash,[Vo]:t.field})}));if(r.status===426)throw new G;return r}var z={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},Jo=/^([a-z0-9]|f([1-9]|1[0-2]))$/,Go=250,Xo=40,Xe=null,be=null,Y=null;function Gt(){return/mac/i.test(navigator.platform||navigator.userAgent)}function Xt(e){if(e===null)return null;if(!e||typeof e!="object")return z;let t=e;return typeof t.key!="string"||!Jo.test(t.key)?z:{key:t.key,ctrl:!!t.ctrl,alt:!!t.alt,shift:!!t.shift,meta:!!t.meta}}function X(e){if(!e)return"Off";let t=e.key.toUpperCase();return Gt()?[e.ctrl?"\u2318":"",e.alt?"\u2325":"",e.shift?"\u21E7":"",t].join(""):[e.ctrl&&"Ctrl",e.meta&&"Win",e.alt&&"Alt",e.shift&&"Shift",t].filter(Boolean).join("+")}function Zt(e){if(e.key==="Escape")return{kind:"cancel"};let t=Zo(e.code);if(!t)return{kind:"ignore"};let n=Gt();if(n&&e.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let o={key:t,ctrl:n?e.metaKey:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:n?!1:e.metaKey},i=t.startsWith("f")&&t.length>1;return!o.ctrl&&!o.alt&&!o.meta&&!i?{kind:"error",message:`Include ${n?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:o}}function Zo(e){var n,o;let t=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(e);return t?((o=(n=t[1])!=null?n:t[2])!=null?o:t[3]).toLowerCase():null}function Qt(e){var t;if(Y&&Qo(Y,e))return!1;try{let n=Spicetify.Mousetrap,o=(t=n.trigger)==null?void 0:t.call(n)._directMap;if(!o)return!1;let i=Ze(e);return Object.keys(o).some(r=>r.startsWith(`${i}:`))}catch(n){return!1}}function Qe(e,t,n=0){if(Xe=t,be=e,!en()){if(n>=Xo){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>Qe(be,t,n+1),Go);return}et(be)}function et(e){if(be=e,!en()||!Xe)return;let t=Xe;try{if(Y&&Spicetify.Keyboard._deregisterShortcut(Y),Y=null,!e)return;Spicetify.Keyboard.registerShortcut(e,n=>{n.preventDefault(),t()}),Y=e,console.debug("[Syncify]","Keyboard shortcut registered",X(e))}catch(n){console.warn("[Syncify]","Failed to register keyboard shortcut",n)}}function en(){var e;return typeof((e=Spicetify.Keyboard)==null?void 0:e.registerShortcut)=="function"}function Ze(e){return[e.ctrl&&"mod",e.meta&&"meta",e.alt&&"alt",e.shift&&"shift",e.key].filter(Boolean).join("+")}function Qo(e,t){return Ze(e)===Ze(t)}var tt="both",ei=["both","topbar","menu"],Z=null,Q=null,xe=!1;function tn(e){return ei.includes(e)?e:tt}function nn(){var e;return typeof((e=Spicetify.Menu)==null?void 0:e.Item)=="function"}function on(e){Z=e.topbarButton,Q=e.menuItem}function we(e){let t=e!=="menu"||!Q,n=e!=="topbar";if(Z!=null&&Z.element&&(Z.element.style.display=t?"":"none"),!!Q)try{n&&!xe?(Q.register(),xe=!0):!n&&xe&&(Q.deregister(),xe=!1)}catch(o){console.warn("[Syncify]","Failed to update profile menu item",o)}}var Ce="syncify:config",ve={workerUrl:k().workerUrl,autoBackupEnabled:!1,shortcut:z,entryPoint:tt};function W(){var n,o;let e=k(),t=(o=(n=Spicetify.LocalStorage)==null?void 0:n.get(Ce))!=null?o:window.localStorage.getItem(Ce);if(!t)return g(d({},ve),{workerUrl:e.workerUrl});try{let i=JSON.parse(t);return{workerUrl:e.workerUrl,autoBackupEnabled:i.autoBackupEnabled===void 0?ve.autoBackupEnabled:!!i.autoBackupEnabled,shortcut:i.shortcut===void 0?ve.shortcut:Xt(i.shortcut),entryPoint:tn(i.entryPoint)}}catch(i){return g(d({},ve),{workerUrl:e.workerUrl})}}function Ie(e){var n;let t=JSON.stringify({workerUrl:k().workerUrl,autoBackupEnabled:e.autoBackupEnabled,shortcut:e.shortcut,entryPoint:e.entryPoint});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set(Ce,t);return}window.localStorage.setItem(Ce,t)}function Ee(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}async function Ne(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return[...new Uint8Array(n)].map(o=>o.toString(16).padStart(2,"0")).join("")}function ee(e){return JSON.stringify(nt(e))}function nt(e){return Array.isArray(e)?e.map(nt):e&&typeof e=="object"?Object.keys(e).sort().reduce((t,n)=>(t[n]=nt(e[n]),t),{}):e}var ti=["username","canonicalUsername","id","uri","displayName"];async function Te(){let{value:e,field:t}=await ni();return{hash:await Ne(e),field:t}}async function ni(){var i;let e=(i=Spicetify.Platform)==null?void 0:i.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let t=await e.getUser(),n=ti.find(r=>(t==null?void 0:t[r])!=null),o=n?t[n]:void 0;if(!n||!o)throw new Error("Unable to resolve the active Spotify user.");return{value:o,field:n}}var oi=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,ii=100,ri="marketplace:installed-extensions",si="marketplace:installed-themes",ai="marketplace:theme-installed",ci="marketplace:installed:",li="marketplace";function it(e){return Spicetify.Config?rt(Spicetify.Config,e):null}function rt(e,t){var r;let n=A(e),o=new Set(ui(t)),i=((r=t[ai])==null?void 0:r.includes(ci))===!0;return{current_theme:i?li:n.current_theme,color_scheme:i?"":n.color_scheme,extensions:n.extensions.filter(a=>!o.has(a)),custom_apps:n.custom_apps}}function A(e){let t=e&&typeof e=="object"?e:{};return{current_theme:ot(t.current_theme)?t.current_theme:"",color_scheme:ot(t.color_scheme)?t.color_scheme:"",extensions:rn(t.extensions),custom_apps:rn(t.custom_apps)}}function cn(e,t){return ee(A(e))===ee(A(t))}function rn(e){return Array.isArray(e)?[...new Set(e.filter(ot))].sort().slice(0,ii):[]}function ot(e){return typeof e=="string"&&oi.test(e)}function ui(e){let t=sn(e[ri]).map(o=>{var r;let i=(r=an(e[o]))==null?void 0:r.manifest;return i&&typeof i=="object"?i.main:void 0}),n=sn(e[si]).flatMap(o=>{var r;let i=(r=an(e[o]))==null?void 0:r.include;return Array.isArray(i)?i:[]});return[...t,...n].flatMap(o=>{let i=typeof o=="string"?o.split("/").pop():void 0;return i?[i]:[]})}function sn(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function an(e){try{let t=e?JSON.parse(e):null;return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch(t){return null}}function ln(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var yi=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],fi="marketplace:installed:",un=`${fi}snippet:`,di="wsoltani/syncify",pi="marketplace",yn={added:0,removed:1,unchanged:2};function E(e){let t=new Map;for(let[n,o]of yi)for(let i of Si(e[n]))t.has(i)||t.set(i,gi(i,o,e[i]));return[...t.values()]}function st(e,t,n,o){let i=new Set(e.map(c=>c.key)),r=new Map(n.map(c=>[c.key,c])),a=[...e.map(c=>{let y=r.get(c.key);return g(d({},c),{change:y?"unchanged":"added",isNew:!y||y.sources.join(" ")!==c.sources.join(" ")})}),...n.filter(c=>!i.has(c.key)).map(c=>g(d({},c),{change:at(c,e)?"unchanged":"removed",isNew:!1}))].sort((c,y)=>yn[c.change]-yn[y.change]||c.name.localeCompare(y.name)),l={added:0,removed:0,unchanged:0};for(let c of a)l[c.change]+=1;return{items:a,counts:l,manual:mi(t,o)}}function at(e,t){return e.type==="extension"&&fn(e)&&!t.some(fn)}function fn(e){var t;return((t=e.repo)==null?void 0:t.toLowerCase())===di}function mi(e,t){if(!e)return[];let n=A(e),o=A(t),i=[...n.extensions.filter(a=>!o.extensions.includes(a)).map(a=>({type:"extension",name:a})),...n.custom_apps.filter(a=>!o.custom_apps.includes(a)).map(a=>({type:"custom_app",name:a}))],r=n.current_theme;return r&&r!==pi&&(r!==o.current_theme||n.color_scheme!==o.color_scheme)&&i.push(d({type:"theme",name:r},n.color_scheme?{scheme:n.color_scheme}:{})),i}function gi(e,t,n){var c,y;let o=dn(n),i=dn(o==null?void 0:o.manifest),r=_e(o==null?void 0:o.user),a=_e(o==null?void 0:o.repo),l=(y=(c=_e(o==null?void 0:o.title))!=null?c:_e(i==null?void 0:i.name))!=null?y:e.startsWith(un)?e.slice(un.length):e.split("/").pop()||e;return{key:e,type:t,name:l,repo:t!=="snippet"&&r&&a?`${r}/${a}`:null,sources:hi(t,o),custom:t==="snippet"&&(o==null?void 0:o.custom)===!0}}function hi(e,t){return t?(e==="extension"?[t.extensionURL]:e==="theme"?[t.cssURL,t.schemesURL,...Array.isArray(t.include)?t.include:[]]:[]).filter(o=>typeof o=="string"&&o!==""):[]}function _e(e){return typeof e=="string"&&e.trim()?e.trim():null}function Si(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function dn(e){let t=e;if(typeof e=="string")try{t=JSON.parse(e)}catch(n){return null}return t&&typeof t=="object"&&!Array.isArray(t)?t:null}var Pe="spicetify-marketplace";var te="settings";async function pn(){let e=await hn();if(e.kind!=="ok")return null;try{let t=await Sn(e.db,"readonly",o=>o.getAll());if(!t)return null;let n={};for(let o of t)typeof(o==null?void 0:o.key)=="string"&&typeof o.value=="string"&&(n[o.key]=o.value);return n}finally{e.db.close()}}async function mn(e){let t=await hn();if(t.kind==="unavailable")return"unavailable";let n=t.kind==="ok"?t.db:await ki();if(!n)return"failed";try{return await Sn(n,"readwrite",i=>{let r;for(let[a,l]of Object.entries(e))r=i.put({key:a,value:l});return r})===null?"failed":"written"}finally{n.close()}}function gn(){var e;try{return(e=window.indexedDB)!=null?e:null}catch(t){return null}}async function hn(){let e=gn();return e?await bi(e)?{kind:"missing"}:new Promise(t=>{let n=!1,o=e.open(Pe);o.onupgradeneeded=()=>{n=!0},o.onerror=()=>{console.warn("Syncify could not open Marketplace storage",o.error),t({kind:"unavailable"})},o.onblocked=()=>t({kind:"unavailable"}),o.onsuccess=()=>{let i=o.result;if(n){i.close(),xi(e).then(()=>t({kind:"missing"}));return}if(!i.objectStoreNames.contains(te)){i.close(),t({kind:"unavailable"});return}t({kind:"ok",db:i})}}):{kind:"unavailable"}}function ki(){let e=gn();return e?new Promise(t=>{let n=e.open(Pe,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains(te)||o.createObjectStore(te,{keyPath:"key"})},n.onerror=()=>{console.warn("Syncify could not create Marketplace storage",n.error),t(null)},n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}async function bi(e){if(typeof e.databases!="function")return!1;try{return!(await e.databases()).some(n=>n.name===Pe)}catch(t){return!1}}function xi(e){return new Promise(t=>{let n=e.deleteDatabase(Pe);n.onsuccess=()=>t(),n.onerror=()=>t(),n.onblocked=()=>t()})}function Sn(e,t,n){return new Promise(o=>{let i;try{i=e.transaction(te,t)}catch(y){console.warn("Syncify could not open a Marketplace transaction",y),o(null);return}let r,a=!1,l=y=>{a||(a=!0,o(y))};i.oncomplete=()=>l(r),i.onerror=()=>{console.warn("Syncify Marketplace transaction failed",i.error),l(null)},i.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",i.error),l(null)};let c;try{c=n(i.objectStore(te))}catch(y){console.warn("Syncify Marketplace request could not be issued",y),l(null);return}c&&(c.onsuccess=()=>{r=c.result},c.onerror=()=>{console.warn("Syncify Marketplace request failed",c.error),l(null)})})}var ct="marketplace:",kn=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function ne(){let e=Pi(),t=await pn();if(t)for(let[n,o]of Object.entries(t))n.startsWith(ct)&&(e[n]=o);return e}var vi=new Set(["marketplace:active-tab","marketplace:sort"]),Ci="marketplace:installed:",Ii=["stars","tags","lastUpdated","created"];async function Me(e,t){let n={};for(let[o,i]of Object.entries(e))vi.has(o)||(n[o]=o.startsWith(Ci)?Ei(i):i);return t&&(n.spicetify_config=A(t)),Ne(ee(n))}function Ei(e){try{let t=JSON.parse(e);if(!t||typeof t!="object"||Array.isArray(t))return e;for(let n of Ii)delete t[n];return t}catch(t){return e}}async function Ae(){let e=await ne(),t=it(e);return{keyCount:Object.keys(e).length,hash:await Me(e,t),installedItemCount:Ti(e),installedItems:wn(e),items:E(e),spicetifyConfig:t,marketplaceAvailable:_i(e)}}async function bn(){let e=await ne(),t=it(e);return d({schema_version:2,metadata:{last_sync_datetime:new Date().toISOString(),device_info:ln(),marketplace_key_count:Object.keys(e).length},payload_hash:await Me(e,t),marketplace_data:{keys:e}},t?{spicetify_config:t}:{})}async function xn(e){var r,a;let t={},n=(a=(r=e.marketplace_data)==null?void 0:r.keys)!=null?a:{};for(let[l,c]of Object.entries(n))l.startsWith(ct)&&(t[l]=c);if(Object.keys(t).length===0)return 0;await Ni(t);let o=Object.keys(t);for(let l of o)window.localStorage.setItem(l,t[l]);if(await mn(t)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try the restore again.");return o.length}async function Ni(e){let t=await ne(),n=E(e),o=E(t).filter(a=>at(a,n));if(o.length===0)return;let i="marketplace:installed-extensions",r=Cn(e[i]).map(String);for(let a of o)r.includes(a.key)||r.push(a.key),e[a.key]=t[a.key];e[i]=JSON.stringify(r)}function Ti(e){return wn(e).length}function wn(e){return kn.flatMap(t=>Cn(e[t]).map(String))}function _i(e){return!!(window.Marketplace||kn.some(n=>e[n]!==void 0)||e["marketplace:tabs"]!==void 0)}function vn(e,t){return t===0?!1:e===0?!0:e<Math.max(2,Math.floor(t*.5))}function Pi(){let e={};for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);if(!(n!=null&&n.startsWith(ct)))continue;let o=window.localStorage.getItem(n);o!==null&&(e[n]=o)}return e}function Cn(e){if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch(t){return[]}}async function Be(e){if(!Ee(e))throw new Error("Syncify backup service is not configured.");let[t,n]=await Promise.all([Te(),bn()]);if(n.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:o}=await Vt(e.workerUrl,t,n);return{payload:n,unchanged:o}}async function oe(e){var r;if(!Ee(e))throw new Error("Syncify backup service is not configured.");let t=await qt(e.workerUrl,await Te()),[n,o]=await Promise.all([Promise.all(t.backups.map(In)),t.safetyCopy?In(t.safetyCopy):null]),i=n.filter((a,l)=>n.findIndex(c=>c.payload_hash===a.payload_hash)===l);return g(d({},t),{payload:(r=i[0])!=null?r:null,backups:i,safetyCopy:o&&!i.some(a=>a.payload_hash===o.payload_hash)?o:null})}var lt=new Map;async function In(e){var r,a,l;let t=(a=(r=e.marketplace_data)==null?void 0:r.keys)!=null?a:{},n=e.spicetify_config?rt(e.spicetify_config,t):void 0,o=`${e.payload_hash} ${(l=e.metadata)==null?void 0:l.last_sync_datetime}`,i=lt.get(o);return i||(i=Me(t,n),lt.set(o,i),i.catch(()=>lt.delete(o))),g(d(d({},e),n?{spicetify_config:n}:{}),{payload_hash:await i})}async function En(e,t){var r;let n=t!=null?t:(await oe(e)).payload;if(!n)throw new Error("No Syncify cloud backup was found for this Spotify account.");let o=await xn(n),i=(r=n.backup)==null?void 0:r.id;return i&&Ee(e)&&Te().then(a=>Jt(e.workerUrl,a,i)).catch(()=>{}),{payload:n,restoredCount:o}}async function Nn(){var t,n,o;let e=W();if(!(!e.workerUrl||!e.autoBackupEnabled))try{let[i,r]=await Promise.all([Ae(),oe(e)]),a=(n=(t=r.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?n:0;if(r.exists&&vn(i.keyCount,a)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((o=r.payload)==null?void 0:o.payload_hash)===i.hash||i.keyCount===0)return;await Be(e),Spicetify.showNotification("Syncify auto-backup complete")}catch(i){let r=i instanceof Error?i.message:String(i);console.warn("Syncify startup sync failed:",i),Spicetify.showNotification(`Syncify auto-sync skipped: ${r}`,!0,8e3)}}var yt="syncify:pending-restore",Mi=600*1e3,Ai=2e3,Bi=15e3,Ui="marketplace:theme-installed",Li="raw.githubusercontent.com",Ri=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],O=null,ut=new Set,Pn=new Map;function Mn(){return O}function An(e){return ut.add(e),()=>ut.delete(e)}function Bn(){O&&Dn(g(d({},O),{manual:[]}))}function ft(e){try{localStorage.setItem(yt,JSON.stringify({at:Date.now(),manual:e}))}catch(t){}}function Un(){var e;ft((e=O==null?void 0:O.manual)!=null?e:[]),window.location.reload()}function Ln(){jn()&&(document.addEventListener("load",e=>Tn(e.target,"load"),!0),document.addEventListener("error",e=>Tn(e.target,"error"),!0))}async function Rn(){let e=jn();if(!e)return;try{localStorage.removeItem(yt)}catch(i){}let t=Date.now(),n=await _n();for(;n.loaded<n.total&&Date.now()-t<Bi;)await new Promise(i=>setTimeout(i,Ai)),n=await _n();Dn(g(d({at:Date.now()},n),{manual:e.manual}));let o=n.loaded===n.total&&e.manual.length===0;Spicetify.showNotification(o?`Syncify: backup restored. ${Oi(n)}.`:`Syncify: restored ${n.loaded} of ${n.total}. Open Syncify for details.`,!1,8e3)}function On(e){let t=e.map(n=>n.type==="extension"?`spicetify config extensions ${Ue(n.name)}`:n.type==="custom_app"?`spicetify config custom_apps ${Ue(n.name)}`:`spicetify config current_theme ${Ue(n.name)}${n.scheme?` color_scheme ${Ue(n.scheme)}`:""}`);return t.length>0?[...t,"spicetify apply"]:[]}function Oi(e){return e.total===1?"It loaded":`All ${e.total} loaded`}function Ue(e){return/^[\w.@+/-]+$/.test(e)?e:`"${e}"`}function Dn(e){O=e;for(let t of ut)t(e)}function jn(){var e;try{let t=JSON.parse((e=localStorage.getItem(yt))!=null?e:"null");return!t||Date.now()-t.at>Mi?null:{manual:Array.isArray(t.manual)?t.manual:[]}}catch(t){return null}}function Tn(e,t){e instanceof HTMLScriptElement&&e.src&&Pn.set(ie(e.src),t)}async function _n(){var o;let e=await ne(),t=(o=e[Ui])!=null?o:"",n=E(e).filter(i=>i.type==="extension"&&i.sources.length>0||i.type==="theme"&&t.includes(i.key)||i.type==="snippet");return{loaded:n.filter(Di).length,total:n.length}}function Di(e){var t,n;if(e.type==="snippet"){let o=document.querySelector("style.marketplaceSnippets");return((t=o==null?void 0:o.textContent)==null?void 0:t.includes(`/* ${e.name} - `))===!0}if(e.type==="theme"){let o=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((n=o==null?void 0:o.textContent)!=null&&n.trim())}return ji(e.sources[0]).some($i)}function ji(e){let t;try{t=new URL(e)}catch(a){return[]}if(t.host!==Li)return[ie(t.href)];let[n,o,i,...r]=t.pathname.split("/").filter(Boolean);return!n||!o||!i||r.length===0?[]:Ri.map(a=>ie(`https://${a}/gh/${n}/${o}@${i}/${r.join("/")}`))}function $i(e){let t=Pn.get(e);return t?t==="load":[...document.querySelectorAll("script[src]")].some(o=>ie(o.src)===e)&&performance.getEntriesByType("resource").some(o=>ie(o.name)===e)}function ie(e){try{let t=new URL(e);return`${t.origin}${t.pathname}`}catch(t){return e}}var Hi="raw.githubusercontent.com",Fi={extension:"spicetify-extensions",theme:"spicetify-themes"},Ki="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",Yi="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",zi="https://api.github.com/repos",Wi=5e3,Vi=20,$n="syncify:repo-topics",Hn=10080*60*1e3,qi=200;function Le(e){return(e==null?void 0:e.kind)==="host"||(e==null?void 0:e.kind)==="repo"||(e==null?void 0:e.kind)==="blocked"||(e==null?void 0:e.kind)==="catalog"}function Fn(e){let t=new Map;for(let n of e){if(n.change==="removed")continue;if(n.custom){t.set(n.key,{kind:"custom"});continue}let o=Ji(n);o&&t.set(n.key,o)}return t}async function Kn(e,t){let n=new Map,o=e.filter(a=>a.change!=="removed"&&a.isNew&&!t.has(a.key));if(o.length===0)return n;let i=o.filter(a=>a.type==="snippet"),r=o.filter(a=>a.type!=="snippet");if(i.length>0){let a=await Qi();for(let l of i)a?a.has(zn(l.name))||n.set(l.key,{kind:"catalog"}):n.set(l.key,{kind:"unchecked"})}if(r.length>0){let a=await Zi(),l=nr(),c=0;await Promise.all(r.map(async y=>{let f=Gi(y),S=Fi[y.type];if(!f||!S)return;if(a===null){n.set(y.key,{kind:"unchecked"});return}if(Xi(f,a)){n.set(y.key,{kind:"blocked"});return}let b=tr(l,f);b===void 0&&c<Vi&&(c+=1,b=await er(f),b!==void 0&&(l[f.toLowerCase()]={topics:b,at:Date.now()})),b===void 0?n.set(y.key,{kind:"unchecked"}):(b===null||!b.includes(S))&&n.set(y.key,{kind:"catalog"})})),or(l)}return n}function Ji(e){let t=null;for(let n of e.sources){let o;try{o=new URL(n)}catch(r){return{kind:"host",host:n.slice(0,40)}}if(o.host!==Hi)return{kind:"host",host:o.host};let i=Yn(o);i&&e.repo&&i.toLowerCase()!==e.repo.toLowerCase()&&(t!=null||(t=i))}return t?{kind:"repo",repo:t}:null}function Gi(e){for(let t of e.sources)try{let n=Yn(new URL(t));if(n)return n}catch(n){}return e.repo}function Yn(e){let[t,n]=e.pathname.split("/").filter(Boolean);return t&&n?`${t}/${n}`:null}function Xi(e,t){let n=`https://github.com/${e}`.toLowerCase();return t.some(o=>{let i=o.toLowerCase();if(!i.includes("*"))return i===n;let r=i.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${r}$`).test(n)})}function zn(e){return e.replace(/\n/g,"").trim().toLowerCase()}var re=null,se=null;function Zi(){return re!=null||(re=Wn(Ki).then(e=>{let t=e==null?void 0:e.repos;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&!n.startsWith("//")):(re=null,null)})),re}function Qi(){return se!=null||(se=Wn(Yi).then(e=>Array.isArray(e)?new Set(e.flatMap(t=>typeof(t==null?void 0:t.title)=="string"?[zn(t.title)]:[])):(se=null,null))),se}async function er(e){let t=await Vn(`${zi}/${e}`);if((t==null?void 0:t.status)===404)return null;if(!(t!=null&&t.ok))return;let n=await t.json().catch(()=>null);return Array.isArray(n==null?void 0:n.topics)?n.topics.filter(o=>typeof o=="string"):void 0}async function Wn(e){let t=await Vn(e);return t!=null&&t.ok?t.json().catch(()=>null):null}async function Vn(e){let t=typeof AbortController=="function"?new AbortController:null,n=setTimeout(()=>t==null?void 0:t.abort(),Wi);try{return await fetch(e,{signal:t==null?void 0:t.signal})}catch(o){return null}finally{clearTimeout(n)}}function tr(e,t){let n=e[t.toLowerCase()];return n&&Date.now()-n.at<Hn?n.topics:void 0}function nr(){var e;try{let t=JSON.parse((e=localStorage.getItem($n))!=null?e:"{}");return t&&typeof t=="object"?t:{}}catch(t){return{}}}function or(e){let t=Date.now(),n=Object.entries(e).filter(([,o])=>t-o.at<Hn).sort(([,o],[,i])=>i.at-o.at).slice(0,qi);try{localStorage.setItem($n,JSON.stringify(Object.fromEntries(n)))}catch(o){}}var ir="syncify:beta",qn=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function Jn(){var e;return(e=window.SyncifyLoader)!=null?e:null}function rr(){try{return window.localStorage.getItem(ir)==="true"}catch(e){return!1}}async function Gn(e){let t=rr()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(t.map(o=>sr(`${e}/${o}`)))).reduce((o,i)=>i&&(!o||pt(i,o)>0)?i:o,null)}function dt(e){return typeof e=="string"&&qn.test(e)}function pt(e,t){let[n,o]=[e,t].map(i=>{var y;let[,r,a,l,c]=(y=qn.exec(i))!=null?y:[];return[r,a,l,c!=null?c:1/0].map(Number)});for(let i=0;i<n.length;i+=1)if(n[i]!==o[i])return n[i]<o[i]?-1:1;return 0}async function sr(e,t=3e3){let n=typeof AbortController=="function"?new AbortController:null,o=setTimeout(()=>n==null?void 0:n.abort(),t);try{let i=await fetch(e,{signal:n==null?void 0:n.signal});if(!i.ok)return null;let r=await i.json();return dt(r==null?void 0:r.version)?r.version:null}catch(i){return null}finally{clearTimeout(o)}}function eo(){var Lt;let e=Spicetify.React,t=e.useEffect,n=e.useMemo,o=e.useState,i=e.useRef,[r,a]=o(()=>W()),[l,c]=o("idle"),[y,f]=o(null),[S,b]=o(0),[le,ue]=o([]),[B,io]=o([]),[ye,ro]=o(null),[gt,so]=o(null),[v,ao]=o(null),[C,ht]=o(null),[D,St]=o([]),[V,kt]=o(null),[m,q]=o(null),[bt,je]=o(!1),[$e,U]=o(!1),[xt,fe]=o(!1),[de,wt]=o(null),[T,j]=o(!1),[He,$]=o(null),[co,lo]=o(null),[pe,uo]=o(!1),[h,yo]=o(()=>Mn()),[fo,vt]=o(!1),[L,po]=o(!1),[Ct,mo]=o(null),It=i(null),I=n(()=>k(),[]),H=n(()=>V?[...D,V]:D,[D,V]),Et=n(()=>new Map(H.map(s=>[s,E(s.marketplace_data.keys)])),[H]),me=s=>{var u;return(u=Et.get(s))!=null?u:E(s.marketplace_data.keys)},go=s=>me(s).map(u=>u.key),ho=s=>me(s).length,_=n(()=>$e&&m?st(me(m),m.spicetify_config,B,ye):null,[$e,m,Et,B,ye]),P=n(()=>_?Fn(_.items):null,[_]),So=n(()=>new Map([...de!=null?de:[],...P!=null?P:[]]),[de,P]),Fe=n(()=>nn(),[]),Nt=n(()=>Jn()!==null,[]),M=l==="loading",ge=(y==null?void 0:y.kind)==="warning"||(y==null?void 0:y.kind)==="error"?y:null,Tt=!!(C&&v&&C.payload_hash!==v),J=!!(C&&v&&C.payload_hash===v),_t=!!(m&&v&&m.payload_hash===v),Ke=pe||!J||H.length<2,ko=Ke?D:D.slice(0,1),bo=!!(v&&S>0&&!H.some(s=>s.payload_hash===v));t(()=>(Mt({silent:!0}),xo(),An(yo)),[]),t(()=>{if(wt(null),!_||!P)return;[...P.values()].some(Le)&&fe(!0);let s=!0;return Kn(_.items,P).then(u=>{s&&(wt(u),[...u.values()].some(Le)&&fe(!0))}),()=>{s=!1}},[_,P]),t(()=>{if(!T)return;let s=u=>{var x;if(!((x=It.current)!=null&&x.isConnected)){j(!1),$(null);return}u.preventDefault(),u.stopImmediatePropagation();let p=Zt(u);if(p.kind!=="ignore"){if(p.kind==="cancel"){j(!1),$(null);return}if(p.kind==="error"){$(p.message);return}if(Qt(p.shortcut)){$(`${X(p.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}j(!1),Ye(p.shortcut)}};return window.addEventListener("keydown",s,!0),()=>window.removeEventListener("keydown",s,!0)},[T,r]);async function Pt(){let s=await Ae();return ao(s.hash),b(s.installedItemCount),ue(s.installedItems),io(s.items),ro(s.spicetifyConfig),so(s.marketplaceAvailable),s}async function Mt(s){try{U(!1),c("loading"),s!=null&&s.silent||f({kind:"info",text:"Checking your Syncify backup\u2026"}),await Pt();let u=await oe(r);ht(u.payload),St(u.backups),kt(u.safetyCopy),q(u.payload),je(!0),c(u.exists?"success":"idle"),s!=null&&s.silent||f(u.exists&&u.payload?{kind:"success",text:`Backup found from ${ae(u.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(u){ze(u)}}async function xo(){let s=I.version;if(!dt(s))return;let u=await Gn(I.releasesUrl);u&&pt(u,s)>0&&mo(u)}function wo(s){let u=g(d({},r),{autoBackupEnabled:s});a(u),Ie(u),f({kind:"success",text:s?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}function Ye(s){let u=g(d({},r),{shortcut:s});a(u),Ie(u),et(s),$(null),f({kind:"success",text:s?`${X(s)} now opens Syncify.`:"Keyboard shortcut turned off."})}function vo(s){let u=g(d({},r),{entryPoint:s});a(u),Ie(u),we(s)}function Co(){$(null),j(!0)}async function Io(){try{U(!1),c("loading"),f({kind:"info",text:"Backing up your extensions and themes\u2026"});let{payload:s,unchanged:u}=await Be(r);if(await Pt(),u){je(!0),c("success"),f({kind:"success",text:"Everything is already backed up."}),Spicetify.showNotification("Syncify: everything is already backed up");return}ht(s),St(p=>[s,...p.filter(x=>x.payload_hash!==s.payload_hash)].slice(0,gr)),kt(p=>(p==null?void 0:p.payload_hash)===s.payload_hash?null:p),q(s),je(!0),c("success"),f({kind:"success",text:`Backed up ${s.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(s){ze(s)}}function Eo(s=m){if(gt===!1){let u="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";f({kind:"error",text:u}),Spicetify.showNotification(u,!0,6e3);return}if(!s){let u="No Syncify cloud backup was found for this Spotify account.";f({kind:"error",text:u}),Spicetify.showNotification(u,!0,6e3);return}q(s),fe(!1),U(!0)}async function No(){let s=m?st(me(m),m.spicetify_config,B,ye).manual:[];try{U(!1),c("loading"),f({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:u,restoredCount:p}=await En(r,m!=null?m:void 0);q(u),c("success"),f({kind:"success",text:`Restored ${p} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),ft(s),setTimeout(()=>window.location.reload(),1e3)}catch(u){ze(u)}}async function To(s){var u;try{await navigator.clipboard.writeText(s)}catch(p){let x=(u=Spicetify.Platform)==null?void 0:u.ClipboardAPI;if(!(x!=null&&x.copy))return;await x.copy(s)}vt(!0),setTimeout(()=>vt(!1),2e3)}function F(s){if(s.startsWith("mailto:")){window.location.href=s;return}window.open(s,"_blank","noopener,noreferrer")}function ze(s){if(c("error"),s instanceof G){po(!0),f(null);return}let u=s instanceof Error?s.message:String(s);f({kind:"error",text:u}),Spicetify.showNotification(u,!0,6e3)}function At(s,u){let p=(m==null?void 0:m.payload_hash)===s.payload_hash,x=s.payload_hash===v,Rt=ae(s.metadata.last_sync_datetime),Ot=Qn(ho(s));return e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":p,"data-selected":p?"true":"false",type:"button",key:`${s.payload_hash}-${s.metadata.last_sync_datetime}`,title:u!=null&&u.isSafetyCopy?"Kept aside and updated about once a week, so a burst of new backups can't replace it":void 0,onClick:()=>{q(s),U(!1)},disabled:M},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),u!=null&&u.isSafetyCopy?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Safety copy"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 updated weekly")),e.createElement("span",{className:"syncify-muted"},Rt," \xB7 ",Ot)):e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-backup-date"},Rt),e.createElement("span",{className:"syncify-muted"},Ot," \xB7 from ",s.metadata.device_info)),x?e.createElement("span",{className:"syncify-tag",title:"What's on this device now"},"Current"):null,u!=null&&u.isSafetyCopy?e.createElement(dr,null):null)}function We(s){s.stopPropagation()}let _o=L?"Update Syncify to keep backing up":bt?C?Tt?"Changes since your last backup":"Everything is backed up":"No backup yet":l==="error"?"Couldn't check your backup":"Checking your backup\u2026",Bt=L?"Your backups are safe":bt?C?Tt?Sr(C,go(C),le,ye):`Last backup ${ae(C.metadata.last_sync_datetime)}`:"Save your extensions and themes so you can restore them after a reinstall or on another computer.":null,Ut=!!(h&&!L&&Date.now()-h.at<mr),he=!!(h&&h.loaded===h.total),Ve=On((Lt=h==null?void 0:h.manual)!=null?Lt:[]);return e.createElement("div",{className:"syncify-panel",ref:It,onClick:We,onMouseDown:We,onPointerDown:We},L?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,"This version of Syncify is no longer supported."),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>F(`${I.githubUrl}#updating`)},"How to update")):null,Ve.length>0?e.createElement("div",{className:"syncify-alert syncify-manual",role:"status"},e.createElement("span",{className:"syncify-manual-header"},e.createElement("span",null,h.manual.length===1?"1 isn't from Marketplace. Add it in a terminal:":`${h.manual.length} aren't from Marketplace. Add them in a terminal:`),e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:Bn},e.createElement(Zn,null))),e.createElement("span",{className:"syncify-code"},e.createElement("code",null,Ve.join(`
`)),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{To(Ve.join(`
`))}},fo?"Copied":"Copy"))):null,ge?e.createElement("div",{className:"syncify-alert","data-kind":ge.kind},e.createElement("span",null,ge.text),e.createElement("span",{className:"syncify-alert-actions"},ge.kind==="error"?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Mt()},disabled:M},"Try again"):null,e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>f(null)},e.createElement(Zn,null)))):null,e.createElement("section",{className:"syncify-status","aria-live":"polite"},Ut&&h?e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},he?"Backup restored":`Restored ${h.loaded} of ${h.total}`),e.createElement("p",{className:"syncify-muted"},he?h.total===0?"Nothing from Marketplace to load":`${h.loaded} of ${h.total} loaded`:"Missing something? Reload Spotify once more."),he?e.createElement("p",{className:"syncify-muted"},"Syncify saved your setup?"," ",e.createElement("button",{className:"syncify-text-button syncify-inline-button",type:"button",onClick:()=>F(I.kofiUrl)},"Support it on Ko-fi")):null):e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},_o),e.createElement("p",{className:"syncify-muted"},Bt?`${Bt} \xB7 `:"",Qn(S)," on this device")),Ut&&!he?e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:Un},"Reload"):e.createElement("button",{className:"syncify-button",type:"button",onClick:Io,disabled:M||J||L,title:J?"No changes since your last backup":void 0},M?"Working\u2026":J?"Backed up":"Back up now")),D.length>0?e.createElement("section",{className:"syncify-section","aria-label":"Backups"},e.createElement("div",{className:"syncify-section-header"},e.createElement("h4",{className:"syncify-section-title"},"Backups"),J&&H.length>1?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":pe,"aria-controls":"syncify-backup-list",onClick:()=>{uo(!pe),U(!1)}},pe?"Show less":`Show all ${H.length}`,e.createElement(mt,null)):null),e.createElement("div",{className:"syncify-backup-list",id:"syncify-backup-list",role:"radiogroup","aria-label":"Choose a backup to restore"},ko.map(s=>At(s)),Ke&&V?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),At(V,{isSafetyCopy:!0})):null),Ke?gt===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to restore a backup."):$e?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},"Restore"," ",m?ae(m.metadata.last_sync_datetime):"this backup","?"),_?e.createElement(lr,{preview:_,checks:So,expanded:xt,onToggle:()=>fe(!xt)}):null,e.createElement("div",{className:"syncify-actions"},bo?e.createElement("div",{className:"syncify-alert syncify-actions-hint"},"Your current setup isn't backed up."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>U(!1),disabled:M},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:No,disabled:M},"Restore"))):e.createElement("div",{className:"syncify-actions"},_t?e.createElement("span",{className:"syncify-muted syncify-actions-hint"},"This backup is already current."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>Eo(),disabled:M||!m||_t},"Restore backup")):null):null,e.createElement("div",{className:"syncify-accordion"},e.createElement(fr,{id:"settings",title:"Settings",openSection:co,onToggle:s=>{lo(s),s!=="settings"&&j(!1)}},e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Back up automatically"),e.createElement("span",{className:"syncify-muted"},"When Spotify starts and something has changed")),e.createElement("input",{className:"syncify-switch",type:"checkbox",role:"switch",checked:r.autoBackupEnabled&&!L,onChange:s=>wo(s.currentTarget.checked),disabled:M||L})),e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Open Syncify from"),Fe?r.entryPoint==="menu"&&!r.shortcut?e.createElement("span",{className:"syncify-muted"},"Keep a shortcut in case a Spotify update breaks the menu"):null:e.createElement("span",{className:"syncify-muted"},"The profile menu isn't available in this Spicetify version")),e.createElement("select",{className:"syncify-select",value:Fe?r.entryPoint:"topbar",onChange:s=>vo(s.currentTarget.value),disabled:!Fe},hr.map(s=>e.createElement("option",{key:s.value,value:s.value},s.label)))),e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Keyboard shortcut"),T&&!He?e.createElement("span",{className:"syncify-muted"},"Press a key combination, or Esc to cancel"):null),e.createElement("span",{className:"syncify-shortcut"},r.shortcut&&!T?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Ye(null)},"Turn off"):null,!r.shortcut&&!T?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Ye(z)},"Use default"):null,e.createElement("button",{className:"syncify-key",type:"button","data-recording":T?"true":"false",onClick:()=>T?j(!1):Co(),title:"Click to change"},T?"Press keys\u2026":r.shortcut?X(r.shortcut):"Off"))),He?e.createElement("div",{className:"syncify-alert",role:"alert"},He):null)),e.createElement("footer",{className:"syncify-footer"},e.createElement("span",{className:"syncify-footer-version"},e.createElement("span",null,"Syncify ",I.version),Ct?e.createElement("button",{className:"syncify-text-button syncify-update",type:"button",onClick:()=>Nt?window.location.reload():F(`${I.githubUrl}#updating`)},Ct," is out \xB7 ",Nt?"Reload":"How to update"):null),e.createElement("span",{className:"syncify-footer-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>F(I.issueUrl)},"Report an issue"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>F(I.githubUrl)},"GitHub"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>F(I.kofiUrl)},"Support on Ko-fi"))))}var Xn={added:{mark:"+",label:"Added"},removed:{mark:"\u2212",label:"Removed"},unchanged:{mark:"=",label:"Unchanged"}},ar=[["extension","Extensions"],["theme","Themes"],["snippet","Snippets"]],cr={extension:"extension",custom_app:"custom app",theme:"theme"};function lr(e){let t=Spicetify.React,{items:n,counts:o,manual:i}=e.preview;return t.createElement(t.Fragment,null,t.createElement("div",{className:"syncify-chips","aria-label":"What changes on this device"},o.added?t.createElement("span",{className:"syncify-chip","data-change":"added"},"+",o.added," added"):null,o.removed?t.createElement("span",{className:"syncify-chip","data-change":"removed"},"\u2212",o.removed," removed"):null,o.unchanged?t.createElement("span",{className:"syncify-chip"},o.unchanged," unchanged"):null,i.length?t.createElement("span",{className:"syncify-chip"},i.length," to add manually"):null),n.length||i.length?t.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":e.expanded,"aria-controls":"syncify-restore-changes",onClick:e.onToggle},e.expanded?"Hide changes":"Show changes",t.createElement(mt,null)):null,e.expanded?t.createElement("div",{className:"syncify-changes",id:"syncify-restore-changes"},ar.map(([r,a])=>{let l=n.filter(c=>c.type===r);return l.length===0?null:t.createElement("section",{key:r,"aria-label":a},t.createElement("h5",{className:"syncify-change-group"},a),t.createElement("ul",{className:"syncify-change-list"},l.map(c=>t.createElement("li",{className:"syncify-change",key:c.key},t.createElement("span",{className:"syncify-mark","data-change":c.change,role:"img","aria-label":Xn[c.change].label},Xn[c.change].mark),t.createElement("span",{className:"syncify-change-name"},c.name,c.repo?t.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",c.repo):null),e.checks.has(c.key)?t.createElement(yr,{check:e.checks.get(c.key)}):null))))}),i.length?t.createElement("section",{"aria-label":"Add manually"},t.createElement("h5",{className:"syncify-change-group"},"Add manually"),t.createElement("ul",{className:"syncify-change-list"},i.map(r=>t.createElement("li",{className:"syncify-change",key:`${r.type}:${r.name}`},t.createElement("span",{className:"syncify-mark","aria-hidden":"true"}),t.createElement("span",{className:"syncify-change-name"},r.name,t.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",cr[r.type],r.scheme?`, ${r.scheme}`:"")))))):null):null)}var ur={host:"Loads from outside GitHub",repo:"Its code is in a different repo than the one it names",blocked:"On Marketplace's block list",catalog:"Not in Marketplace's catalog",unchecked:"GitHub couldn't be reached to check it",custom:"A snippet made in Marketplace, not from its list"};function yr(e){let t=Spicetify.React,{check:n}=e,o=Le(n),i=n.kind==="host"?`Code from ${n.host}`:n.kind==="repo"?`Code from ${n.repo}`:n.kind==="blocked"?"Blocked by Marketplace":n.kind==="catalog"?"Not in Marketplace":n.kind==="unchecked"?"Not checked":"Custom";return t.createElement("span",{className:"syncify-source","data-warning":o?"true":"false",title:ur[n.kind]},o?t.createElement(pr,null):null,i)}function fr(e){let t=Spicetify.React,n=e.openSection===e.id,o=`syncify-section-${e.id}`;return t.createElement("section",{className:"syncify-accordion-section","aria-label":e.title},t.createElement("button",{className:"syncify-accordion-header",type:"button","aria-expanded":n,"aria-controls":o,onClick:()=>e.onToggle(n?null:e.id)},t.createElement("span",{className:"syncify-accordion-title"},e.title),t.createElement(mt,null)),n?t.createElement("div",{className:"syncify-accordion-body",id:o},e.children):null)}function dr(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-shield",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"}))}function pr(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-warning-icon",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M12 3 2 21h20z"}),e.createElement("path",{d:"M12 10v5"}),e.createElement("path",{d:"M12 18h.01"}))}function mt(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-chevron",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"m9 6 6 6-6 6"}))}function Zn(){let e=Spicetify.React;return e.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M18 6 6 18"}),e.createElement("path",{d:"m6 6 12 12"}))}var mr=600*1e3,gr=3,hr=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function Sr(e,t,n,o){var ue;let i=new Set(t),r=new Set(n),a=n.filter(B=>!i.has(B)).length,l=t.filter(B=>!r.has(B)).length,c=(ue=e.spicetify_config)!=null?ue:null,y=!!(o&&!c),f=!y&&(o&&c?!cn(o,c):o!==c),S=[a?`${a} added`:null,l?`${l} removed`:null,f?"Spicetify config changed":null].filter(Boolean),b=ae(e.metadata.last_sync_datetime),le=S.length?`${S.join(", ")} since ${b}`:`Last backup ${b}`;return y?`${le} \xB7 Spicetify config not saved yet`:le}function Qn(e){return e===1?"1 extension or theme":`${e} extensions and themes`}function ae(e){let t=new Date(e);if(Number.isNaN(t.getTime()))return e;let n=t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),o=new Date,i=new Date(o);return i.setDate(o.getDate()-1),t.toDateString()===o.toDateString()?`today, ${n}`:t.toDateString()===i.toDateString()?`yesterday, ${n}`:`${t.toLocaleDateString(void 0,{month:"short",day:"numeric",year:t.getFullYear()===o.getFullYear()?void 0:"numeric"})}, ${n}`}var Re="[Syncify]";function N(e,t){if(t===void 0){console.debug(Re,e);return}console.debug(Re,e,t)}function ce(e,t){if(t===void 0){console.warn(Re,e);return}console.warn(Re,e,t)}function kr(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var no="syncify-styles";function br(){if(document.getElementById(no)){N("Another copy of Syncify is running; stopping this one");return}xr();let e=W();on({topbarButton:wr(),menuItem:Tr()}),we(e.entryPoint),Qe(e.shortcut,De),Nn().catch(t=>{ce("Startup sync check failed",t)}),Rn().catch(t=>{ce("Restore check failed",t)})}function xr(){let e=document.createElement("style");e.id=no,e.textContent=$t,document.head.appendChild(e)}function wr(){let{extensionName:e}=k(),t=new Spicetify.Topbar.Button(e,qe,n=>{N("Topbar button clicked",Oe(n)),De()},!1,!0);return oo(t),Ir(t),Pr(t),N("Topbar button registered",Oe(t)),t}function oo(e){var n;let t=e;e.element.style.setProperty("-webkit-app-region","no-drag"),(n=t.button)==null||n.style.setProperty("-webkit-app-region","no-drag")}var to=".main-actionButtons",vr=".Root__globalNav, .Root__top-bar",Cr=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function Ir(e){if(typeof MutationObserver=="undefined")return;let t=!1,n=null,o=()=>{t=!1,r();let a=e.element,l=document.querySelector(to);!a||!l||l.contains(a)||(l.prepend(a),Er(e),oo(e),N("Topbar button re-attached",Oe(e)))},i=new MutationObserver(()=>{t||(t=!0,setTimeout(o,250))}),r=()=>{var c;if(n!=null&&n.isConnected)return;let a=document.querySelector(to),l=(c=a==null?void 0:a.closest(vr))!=null?c:a==null?void 0:a.parentElement;if(i.disconnect(),n=l!=null?l:null,!l){i.observe(document.body,{childList:!0,subtree:!0});return}i.observe(l,{childList:!0,subtree:!0});for(let y=l.parentElement;y;y=y.parentElement)i.observe(y,{childList:!0})};o()}function Er(e){let t=Nr(e);if(!t||t.className&&t.className!=="undefined")return;let n=Array.from(document.querySelectorAll(Cr)).find(o=>!e.element.contains(o));n!=null&&n.className&&(t.className=n.className)}function Nr(e){return e.button}function Tr(){var e;if(typeof((e=Spicetify.Menu)==null?void 0:e.Item)!="function")return null;try{return new Spicetify.Menu.Item(k().extensionName,!1,()=>De(),_r())}catch(t){return ce("Failed to create profile menu item",t),null}}function _r(){return qe.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function Pr(e){Object.assign(window,{SyncifyDebug:{button:e,element:e.element,openModal:De,inspect:()=>Oe(e),clickElement:()=>{var t;return(t=e.element)==null?void 0:t.click()},clickInnerButton:()=>{var t;return(t=e.button)==null?void 0:t.click()},clickCallback:()=>e.onClick(e)}})}function Oe(e){var t,n,o,i,r;return{label:e.label,disabled:e.disabled,isRight:e.isRight,hasElement:!!e.element,elementConnected:(t=e.element)==null?void 0:t.isConnected,elementDisabled:(n=e.element)==null?void 0:n.disabled,elementAriaDisabled:(o=e.element)==null?void 0:o.getAttribute("aria-disabled"),elementClass:(i=e.element)==null?void 0:i.className,appRegion:e.element?getComputedStyle(e.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:e.button?getComputedStyle(e.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:e.element?getComputedStyle(e.element).pointerEvents:null,visibility:e.element?getComputedStyle(e.element).visibility:null,display:e.element?getComputedStyle(e.element).display:null,rect:(r=e.element)==null?void 0:r.getBoundingClientRect().toJSON()}}var w=null;function De(){var t;if(w!=null&&w.container.isConnected){N("Closing modal"),Spicetify.PopupModal.hide();return}N("Opening modal"),(t=w==null?void 0:w.root)==null||t.unmount();let e=document.createElement("div");w={container:e,root:null};try{Spicetify.PopupModal.display({title:k().extensionName,content:e,isLarge:!1})}catch(n){throw ce("Failed to open PopupModal",n),n}Mr(e),Br(e)}function Mr(e){requestAnimationFrame(()=>{let t=Ar(e);t==null||t.classList.add("syncify-modal-shell");let n=t==null?void 0:t.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');n&&(n.classList.add("syncify-modal-close"),n.setAttribute("aria-label",`Close ${k().extensionName}`),n.title="Close",n.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function Ar(e){let t=e.parentElement;for(;t&&t!==document.body;){if(t.querySelector(".main-trackCreditsModal-header"))return t;t=t.parentElement}return e.closest('[class*="trackCreditsModal"]')}function Br(e){try{let t=Spicetify.React.createElement(eo);if(typeof Spicetify.ReactDOM.createRoot=="function"){let n=Spicetify.ReactDOM.createRoot(e);n.render(t),(w==null?void 0:w.container)===e&&(w.root=n),N("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(t,e),N("Modal rendered",{renderer:"render"})}catch(t){throw ce("Failed to render modal",t),t}}Ln();(function e(){if(!kr()){setTimeout(e,100);return}N("Spicetify APIs ready"),br()})();})();
