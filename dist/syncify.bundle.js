// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var Un=Object.defineProperty,Dn=Object.defineProperties;var On=Object.getOwnPropertyDescriptors;var gt=Object.getOwnPropertySymbols;var Ln=Object.prototype.hasOwnProperty,Rn=Object.prototype.propertyIsEnumerable;var ht=(e,t,n)=>t in e?Un(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,d=(e,t)=>{for(var n in t||(t={}))Ln.call(t,n)&&ht(e,n,t[n]);if(gt)for(var n of gt(t))Rn.call(t,n)&&ht(e,n,t[n]);return e},p=(e,t)=>Dn(e,On(t));var St=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var Ue=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var T={extensionName:"Syncify",version:"1.4.0",workerUrl:"https://syncify-worker.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com"};function h(){var t,n,i,o,r,c,y;let e=window.SyncifyConfig;return{extensionName:(t=O(e==null?void 0:e.extensionName))!=null?t:T.extensionName,version:(n=bt(e==null?void 0:e.version))!=null?n:T.version,workerUrl:(i=O(e==null?void 0:e.workerUrl))!=null?i:T.workerUrl,githubUrl:(o=O(e==null?void 0:e.githubUrl))!=null?o:T.githubUrl,kofiUrl:(r=O(e==null?void 0:e.kofiUrl))!=null?r:T.kofiUrl,issueUrl:(c=O(e==null?void 0:e.issueUrl))!=null?c:T.issueUrl,releasesUrl:(y=O(e==null?void 0:e.releasesUrl))!=null?y:T.releasesUrl}}function O(e){return bt(e)}function bt(e){return typeof e=="string"&&e.trim()?e.trim():null}var $n="x-syncify-version",Kn="x-syncify-install",Hn="x-syncify-timezone",Yn="syncify",De="state",kt="install-id",xt="syncify:install-id",zn=2e3,oe=null;async function wt(){let e={[$n]:h().version,[Kn]:await Wn()},t=Jn();return t&&(e[Hn]=t),e}function Wn(){return oe!=null||(oe=Vn().catch(()=>re())),oe}async function Vn(){let e=await Promise.race([qn(),new Promise(t=>setTimeout(()=>t(null),zn))]);if(e)return e;try{let t=window.localStorage.getItem(xt);if(t&&vt(t))return t;let n=re();return window.localStorage.setItem(xt,n),n}catch(t){return re()}}function qn(){let e;try{e=window.indexedDB}catch(t){return Promise.resolve(null)}return e?new Promise(t=>{let n;try{n=e.open(Yn,1)}catch(i){t(null);return}n.onupgradeneeded=()=>{n.result.createObjectStore(De)},n.onerror=()=>t(null),n.onblocked=()=>t(null),n.onsuccess=()=>{let i=n.result,o=null;try{let r=i.transaction(De,"readwrite"),c=r.objectStore(De),y=c.get(kt);y.onsuccess=()=>{if(typeof y.result=="string"&&vt(y.result)){o=y.result;return}o=re(),c.put(o,kt)},r.oncomplete=()=>{i.close(),t(o)},r.onerror=r.onabort=()=>{i.close(),t(null)}}catch(r){i.close(),t(null)}}}):Promise.resolve(null)}function re(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t=[...e].map(n=>n.toString(16).padStart(2,"0"));return[t.slice(0,4).join(""),t.slice(4,6).join(""),t.slice(6,8).join(""),t.slice(8,10).join(""),t.slice(10).join("")].join("-")}function vt(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(e)}function Jn(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(e){return null}}var Gn="x-syncify-user-hash",Xn="x-syncify-identity",Zn="/restores",It=3,Y=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}};async function Ct(e,t,n){let i=await Oe(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(n)});if(!i.ok)throw new Error(`Backup failed with HTTP ${i.status}.`);let o=await i.json().catch(()=>null);return{unchanged:(o==null?void 0:o.unchanged)===!0}}async function Et(e,t){var y,a,f;let n=await Oe(e,t,{method:"GET"});if(n.status===404)return{exists:!1,payload:null,backups:[],safetyCopy:null};if(!n.ok)throw new Error(`Restore failed with HTTP ${n.status}.`);let i=await n.json(),o=[i,...(y=i.backup_history)!=null?y:[]];if(!o.every(u=>u.backup))return{exists:!0,payload:i,backups:o.slice(0,It),safetyCopy:(a=o[It])!=null?a:null};let r=o.filter(u=>{var S;return((S=u.backup)==null?void 0:S.kind)==="rolling"}),c=(f=o.find(u=>{var S;return((S=u.backup)==null?void 0:S.kind)==="anchor"}))!=null?f:null;return r.length===0&&c?{exists:!0,payload:i,backups:[c],safetyCopy:null}:{exists:!0,payload:i,backups:r,safetyCopy:c}}async function Nt(e,t,n){try{await Oe(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:n}),keepalive:!0},Zn)}catch(i){}}async function Oe(e,t,n,i=""){let o=i?`${e.replace(/\/+$/,"")}${i}`:e,r=await fetch(o,p(d({},n),{headers:p(d(d({},n.headers),await wt()),{[Gn]:t.hash,[Xn]:t.field})}));if(r.status===426)throw new Y;return r}var R={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},Qn=/^([a-z0-9]|f([1-9]|1[0-2]))$/,ei=250,ti=40,Le=null,se=null,L=null;function Tt(){return/mac/i.test(navigator.platform||navigator.userAgent)}function _t(e){if(e===null)return null;if(!e||typeof e!="object")return R;let t=e;return typeof t.key!="string"||!Qn.test(t.key)?R:{key:t.key,ctrl:!!t.ctrl,alt:!!t.alt,shift:!!t.shift,meta:!!t.meta}}function z(e){if(!e)return"Off";let t=e.key.toUpperCase();return Tt()?[e.ctrl?"\u2318":"",e.alt?"\u2325":"",e.shift?"\u21E7":"",t].join(""):[e.ctrl&&"Ctrl",e.meta&&"Win",e.alt&&"Alt",e.shift&&"Shift",t].filter(Boolean).join("+")}function Pt(e){if(e.key==="Escape")return{kind:"cancel"};let t=ni(e.code);if(!t)return{kind:"ignore"};let n=Tt();if(n&&e.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:t,ctrl:n?e.metaKey:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:n?!1:e.metaKey},o=t.startsWith("f")&&t.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!o?{kind:"error",message:`Include ${n?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function ni(e){var n,i;let t=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(e);return t?((i=(n=t[1])!=null?n:t[2])!=null?i:t[3]).toLowerCase():null}function Mt(e){var t;if(L&&ii(L,e))return!1;try{let n=Spicetify.Mousetrap,i=(t=n.trigger)==null?void 0:t.call(n)._directMap;if(!i)return!1;let o=Re(e);return Object.keys(i).some(r=>r.startsWith(`${o}:`))}catch(n){return!1}}function je(e,t,n=0){if(Le=t,se=e,!Bt()){if(n>=ti){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>je(se,t,n+1),ei);return}Fe(se)}function Fe(e){if(se=e,!Bt()||!Le)return;let t=Le;try{if(L&&Spicetify.Keyboard._deregisterShortcut(L),L=null,!e)return;Spicetify.Keyboard.registerShortcut(e,n=>{n.preventDefault(),t()}),L=e,console.debug("[Syncify]","Keyboard shortcut registered",z(e))}catch(n){console.warn("[Syncify]","Failed to register keyboard shortcut",n)}}function Bt(){var e;return typeof((e=Spicetify.Keyboard)==null?void 0:e.registerShortcut)=="function"}function Re(e){return[e.ctrl&&"mod",e.meta&&"meta",e.alt&&"alt",e.shift&&"shift",e.key].filter(Boolean).join("+")}function ii(e,t){return Re(e)===Re(t)}var $e="both",oi=["both","topbar","menu"],W=null,V=null,ae=!1;function At(e){return oi.includes(e)?e:$e}function Ut(){var e;return typeof((e=Spicetify.Menu)==null?void 0:e.Item)=="function"}function Dt(e){W=e.topbarButton,V=e.menuItem}function ce(e){let t=e!=="menu"||!V,n=e!=="topbar";if(W!=null&&W.element&&(W.element.style.display=t?"":"none"),!!V)try{n&&!ae?(V.register(),ae=!0):!n&&ae&&(V.deregister(),ae=!1)}catch(i){console.warn("[Syncify]","Failed to update profile menu item",i)}}var ye="syncify:config",le={workerUrl:h().workerUrl,autoBackupEnabled:!1,shortcut:R,entryPoint:$e};function j(){var n,i;let e=h(),t=(i=(n=Spicetify.LocalStorage)==null?void 0:n.get(ye))!=null?i:window.localStorage.getItem(ye);if(!t)return p(d({},le),{workerUrl:e.workerUrl});try{let o=JSON.parse(t);return{workerUrl:e.workerUrl,autoBackupEnabled:o.autoBackupEnabled===void 0?le.autoBackupEnabled:!!o.autoBackupEnabled,shortcut:o.shortcut===void 0?le.shortcut:_t(o.shortcut),entryPoint:At(o.entryPoint)}}catch(o){return p(d({},le),{workerUrl:e.workerUrl})}}function fe(e){var n;let t=JSON.stringify({workerUrl:h().workerUrl,autoBackupEnabled:e.autoBackupEnabled,shortcut:e.shortcut,entryPoint:e.entryPoint});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set(ye,t);return}window.localStorage.setItem(ye,t)}function ue(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}async function de(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return[...new Uint8Array(n)].map(i=>i.toString(16).padStart(2,"0")).join("")}function q(e){return JSON.stringify(Ke(e))}function Ke(e){return Array.isArray(e)?e.map(Ke):e&&typeof e=="object"?Object.keys(e).sort().reduce((t,n)=>(t[n]=Ke(e[n]),t),{}):e}var ri=["username","canonicalUsername","id","uri","displayName"];async function pe(){let{value:e,field:t}=await si();return{hash:await de(e),field:t}}async function si(){var o;let e=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let t=await e.getUser(),n=ri.find(r=>(t==null?void 0:t[r])!=null),i=n?t[n]:void 0;if(!n||!i)throw new Error("Unable to resolve the active Spotify user.");return{value:i,field:n}}function Ot(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var ai=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,ci=100,li="marketplace:installed-extensions";function Ye(e){let t=Spicetify.Config;if(!t)return null;let n=new Set(yi(e)),i=Array.isArray(t.extensions)?t.extensions.filter(o=>!n.has(o)):[];return E(p(d({},t),{extensions:i}))}function E(e){let t=e&&typeof e=="object"?e:{};return{current_theme:He(t.current_theme)?t.current_theme:"",color_scheme:He(t.color_scheme)?t.color_scheme:"",extensions:Lt(t.extensions),custom_apps:Lt(t.custom_apps)}}function Rt(e,t){return q(E(e))===q(E(t))}function Lt(e){return Array.isArray(e)?[...new Set(e.filter(He))].sort().slice(0,ci):[]}function He(e){return typeof e=="string"&&ai.test(e)}function yi(e){return fi(e[li]).flatMap(t=>{var r;let n=(r=ui(e[t]))==null?void 0:r.manifest,i=n&&typeof n=="object"?n.main:void 0,o=typeof i=="string"?i.split("/").pop():void 0;return o?[o]:[]})}function fi(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function ui(e){try{let t=e?JSON.parse(e):null;return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch(t){return null}}var di=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],pi="marketplace:installed:",jt=`${pi}snippet:`,mi="marketplace",Ft={added:0,removed:1,unchanged:2};function J(e){let t=new Map;for(let[n,i]of di)for(let o of Si(e[n]))t.has(o)||t.set(o,hi(o,i,e[o]));return[...t.values()]}function Kt(e,t,n,i){let o=new Set(e.map(a=>a.key)),r=new Set(n.map(a=>a.key)),c=[...e.map(a=>p(d({},a),{change:r.has(a.key)?"unchanged":"added"})),...n.filter(a=>!o.has(a.key)).map(a=>p(d({},a),{change:"removed"}))].sort((a,f)=>Ft[a.change]-Ft[f.change]||a.name.localeCompare(f.name)),y={added:0,removed:0,unchanged:0};for(let a of c)y[a.change]+=1;return{items:c,counts:y,manual:gi(t,i)}}function gi(e,t){if(!e)return[];let n=E(e),i=E(t),o=[...n.extensions.filter(c=>!i.extensions.includes(c)).map(c=>({type:"extension",name:c})),...n.custom_apps.filter(c=>!i.custom_apps.includes(c)).map(c=>({type:"custom_app",name:c}))],r=n.current_theme;return r&&r!==mi&&(r!==i.current_theme||n.color_scheme!==i.color_scheme)&&o.push(d({type:"theme",name:r},n.color_scheme?{scheme:n.color_scheme}:{})),o}function hi(e,t,n){var a,f;let i=$t(n),o=$t(i==null?void 0:i.manifest),r=me(i==null?void 0:i.user),c=me(i==null?void 0:i.repo),y=(f=(a=me(i==null?void 0:i.title))!=null?a:me(o==null?void 0:o.name))!=null?f:e.startsWith(jt)?e.slice(jt.length):e.split("/").pop()||e;return{key:e,type:t,name:y,repo:t!=="snippet"&&r&&c?`${r}/${c}`:null}}function me(e){return typeof e=="string"&&e.trim()?e.trim():null}function Si(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function $t(e){let t=e;if(typeof e=="string")try{t=JSON.parse(e)}catch(n){return null}return t&&typeof t=="object"&&!Array.isArray(t)?t:null}var ge="spicetify-marketplace";var G="settings";async function Ht(){let e=await Wt();if(e.kind!=="ok")return null;try{let t=await Vt(e.db,"readonly",i=>i.getAll());if(!t)return null;let n={};for(let i of t)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(n[i.key]=i.value);return n}finally{e.db.close()}}async function Yt(e){let t=await Wt();if(t.kind==="unavailable")return"unavailable";let n=t.kind==="ok"?t.db:await bi();if(!n)return"failed";try{return await Vt(n,"readwrite",o=>{let r;for(let[c,y]of Object.entries(e))r=o.put({key:c,value:y});return r})===null?"failed":"written"}finally{n.close()}}function zt(){var e;try{return(e=window.indexedDB)!=null?e:null}catch(t){return null}}async function Wt(){let e=zt();return e?await ki(e)?{kind:"missing"}:new Promise(t=>{let n=!1,i=e.open(ge);i.onupgradeneeded=()=>{n=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),t({kind:"unavailable"})},i.onblocked=()=>t({kind:"unavailable"}),i.onsuccess=()=>{let o=i.result;if(n){o.close(),xi(e).then(()=>t({kind:"missing"}));return}if(!o.objectStoreNames.contains(G)){o.close(),t({kind:"unavailable"});return}t({kind:"ok",db:o})}}):{kind:"unavailable"}}function bi(){let e=zt();return e?new Promise(t=>{let n=e.open(ge,1);n.onupgradeneeded=()=>{let i=n.result;i.objectStoreNames.contains(G)||i.createObjectStore(G,{keyPath:"key"})},n.onerror=()=>{console.warn("Syncify could not create Marketplace storage",n.error),t(null)},n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}async function ki(e){if(typeof e.databases!="function")return!1;try{return!(await e.databases()).some(n=>n.name===ge)}catch(t){return!1}}function xi(e){return new Promise(t=>{let n=e.deleteDatabase(ge);n.onsuccess=()=>t(),n.onerror=()=>t(),n.onblocked=()=>t()})}function Vt(e,t,n){return new Promise(i=>{let o;try{o=e.transaction(G,t)}catch(f){console.warn("Syncify could not open a Marketplace transaction",f),i(null);return}let r,c=!1,y=f=>{c||(c=!0,i(f))};o.oncomplete=()=>y(r),o.onerror=()=>{console.warn("Syncify Marketplace transaction failed",o.error),y(null)},o.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",o.error),y(null)};let a;try{a=n(o.objectStore(G))}catch(f){console.warn("Syncify Marketplace request could not be issued",f),y(null);return}a&&(a.onsuccess=()=>{r=a.result},a.onerror=()=>{console.warn("Syncify Marketplace request failed",a.error),y(null)})})}var ze="marketplace:",qt=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function Jt(){let e=_i(),t=await Ht();if(t)for(let[n,i]of Object.entries(t))n.startsWith(ze)&&(e[n]=i);return e}var vi=new Set(["marketplace:active-tab","marketplace:sort"]),Ii="marketplace:installed:",Ci=["stars","tags","lastUpdated","created"];async function he(e,t){let n={};for(let[i,o]of Object.entries(e))vi.has(i)||(n[i]=i.startsWith(Ii)?Ei(o):o);return t&&(n.spicetify_config=E(t)),de(q(n))}function Ei(e){try{let t=JSON.parse(e);if(!t||typeof t!="object"||Array.isArray(t))return e;for(let n of Ci)delete t[n];return t}catch(t){return e}}async function Se(){let e=await Jt(),t=Ye(e);return{keyCount:Object.keys(e).length,hash:await he(e,t),installedItemCount:Ni(e),installedItems:Zt(e),items:J(e),spicetifyConfig:t,marketplaceAvailable:Ti(e)}}async function Gt(){let e=await Jt(),t=Ye(e);return d({schema_version:2,metadata:{last_sync_datetime:new Date().toISOString(),device_info:Ot(),marketplace_key_count:Object.keys(e).length},payload_hash:await he(e,t),marketplace_data:{keys:e}},t?{spicetify_config:t}:{})}async function Xt(e){var r,c;let t={},n=(c=(r=e.marketplace_data)==null?void 0:r.keys)!=null?c:{};for(let[y,a]of Object.entries(n))y.startsWith(ze)&&(t[y]=a);let i=Object.keys(t);if(i.length===0)return 0;for(let y of i)window.localStorage.setItem(y,t[y]);if(await Yt(t)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try the restore again.");return i.length}function Ni(e){return Zt(e).length}function Zt(e){return qt.flatMap(t=>Pi(e[t]).map(String))}function Ti(e){return!!(window.Marketplace||qt.some(n=>e[n]!==void 0)||e["marketplace:tabs"]!==void 0)}function Qt(e,t){return t===0?!1:e===0?!0:e<Math.max(2,Math.floor(t*.5))}function _i(){let e={};for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);if(!(n!=null&&n.startsWith(ze)))continue;let i=window.localStorage.getItem(n);i!==null&&(e[n]=i)}return e}function Pi(e){if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch(t){return[]}}async function be(e){if(!ue(e))throw new Error("Syncify backup service is not configured.");let[t,n]=await Promise.all([pe(),Gt()]);if(n.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:i}=await Ct(e.workerUrl,t,n);return{payload:n,unchanged:i}}async function X(e){var r;if(!ue(e))throw new Error("Syncify backup service is not configured.");let t=await Et(e.workerUrl,await pe()),[n,i]=await Promise.all([Promise.all(t.backups.map(en)),t.safetyCopy?en(t.safetyCopy):null]),o=n.filter((c,y)=>n.findIndex(a=>a.payload_hash===c.payload_hash)===y);return p(d({},t),{payload:(r=o[0])!=null?r:null,backups:o,safetyCopy:i&&!o.some(c=>c.payload_hash===i.payload_hash)?i:null})}var We=new Map;async function en(e){var i,o,r;let t=`${e.payload_hash} ${(i=e.metadata)==null?void 0:i.last_sync_datetime}`,n=We.get(t);return n||(n=he((r=(o=e.marketplace_data)==null?void 0:o.keys)!=null?r:{},e.spicetify_config),We.set(t,n),n.catch(()=>We.delete(t))),p(d({},e),{payload_hash:await n})}async function tn(e,t){var r;let n=t!=null?t:(await X(e)).payload;if(!n)throw new Error("No Syncify cloud backup was found for this Spotify account.");let i=await Xt(n),o=(r=n.backup)==null?void 0:r.id;return o&&ue(e)&&pe().then(c=>Nt(e.workerUrl,c,o)).catch(()=>{}),{payload:n,restoredCount:i}}async function nn(){var t,n,i;let e=j();if(!(!e.workerUrl||!e.autoBackupEnabled))try{let[o,r]=await Promise.all([Se(),X(e)]),c=(n=(t=r.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?n:0;if(r.exists&&Qt(o.keyCount,c)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((i=r.payload)==null?void 0:i.payload_hash)===o.hash||o.keyCount===0)return;await be(e),Spicetify.showNotification("Syncify auto-backup complete")}catch(o){let r=o instanceof Error?o.message:String(o);console.warn("Syncify startup sync failed:",o),Spicetify.showNotification(`Syncify auto-sync skipped: ${r}`,!0,8e3)}}var Mi="syncify:beta",on=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function rn(){var e;return(e=window.SyncifyLoader)!=null?e:null}function Bi(){try{return window.localStorage.getItem(Mi)==="true"}catch(e){return!1}}async function sn(e){let t=Bi()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(t.map(i=>Ai(`${e}/${i}`)))).reduce((i,o)=>o&&(!i||qe(o,i)>0)?o:i,null)}function Ve(e){return typeof e=="string"&&on.test(e)}function qe(e,t){let[n,i]=[e,t].map(o=>{var f;let[,r,c,y,a]=(f=on.exec(o))!=null?f:[];return[r,c,y,a!=null?a:1/0].map(Number)});for(let o=0;o<n.length;o+=1)if(n[o]!==i[o])return n[o]<i[o]?-1:1;return 0}async function Ai(e,t=3e3){let n=typeof AbortController=="function"?new AbortController:null,i=setTimeout(()=>n==null?void 0:n.abort(),t);try{let o=await fetch(e,{signal:n==null?void 0:n.signal});if(!o.ok)return null;let r=await o.json();return Ve(r==null?void 0:r.version)?r.version:null}catch(o){return null}finally{clearTimeout(i)}}function ln(){let e=Spicetify.React,t=e.useEffect,n=e.useMemo,i=e.useState,o=e.useRef,[r,c]=i(()=>j()),[y,a]=i("idle"),[f,u]=i(null),[S,Q]=i(0),[ee,te]=i([]),[_,dn]=i([]),[Ie,pn]=i(null),[Ge,mn]=i(null),[k,gn]=i(null),[x,Xe]=i(null),[P,Ze]=i([]),[F,Qe]=i(null),[g,$]=i(null),[et,Ce]=i(!1),[Ee,N]=i(!1),[tt,nt]=i(!1),[v,M]=i(!1),[Ne,B]=i(null),[hn,Sn]=i(null),[ne,bn]=i(!1),[A,kn]=i(!1),[it,xn]=i(null),ot=o(null),I=n(()=>h(),[]),U=n(()=>F?[...P,F]:P,[P,F]),rt=n(()=>new Map(U.map(s=>[s,J(s.marketplace_data.keys)])),[U]),Te=s=>{var l;return(l=rt.get(s))!=null?l:J(s.marketplace_data.keys)},wn=s=>Te(s).map(l=>l.key),vn=s=>Te(s).length,st=n(()=>Ee&&g?Kt(Te(g),g.spicetify_config,_,Ie):null,[Ee,g,rt,_,Ie]),_e=n(()=>Ut(),[]),at=n(()=>rn()!==null,[]),C=y==="loading",ie=(f==null?void 0:f.kind)==="warning"||(f==null?void 0:f.kind)==="error"?f:null,ct=!!(x&&k&&x.payload_hash!==k),K=!!(x&&k&&x.payload_hash===k),lt=!!(g&&k&&g.payload_hash===k),Pe=ne||!K||U.length<2,In=Pe?P:P.slice(0,1),Cn=!!(k&&S>0&&!U.some(s=>s.payload_hash===k));t(()=>{ft({silent:!0}),En()},[]),t(()=>{if(!v)return;let s=l=>{var D;if(!((D=ot.current)!=null&&D.isConnected)){M(!1),B(null);return}l.preventDefault(),l.stopImmediatePropagation();let m=Pt(l);if(m.kind!=="ignore"){if(m.kind==="cancel"){M(!1),B(null);return}if(m.kind==="error"){B(m.message);return}if(Mt(m.shortcut)){B(`${z(m.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}M(!1),Me(m.shortcut)}};return window.addEventListener("keydown",s,!0),()=>window.removeEventListener("keydown",s,!0)},[v,r]);async function yt(){let s=await Se();return gn(s.hash),Q(s.installedItemCount),te(s.installedItems),dn(s.items),pn(s.spicetifyConfig),mn(s.marketplaceAvailable),s}async function ft(s){try{N(!1),a("loading"),s!=null&&s.silent||u({kind:"info",text:"Checking your Syncify backup\u2026"}),await yt();let l=await X(r);Xe(l.payload),Ze(l.backups),Qe(l.safetyCopy),$(l.payload),Ce(!0),a(l.exists?"success":"idle"),s!=null&&s.silent||u(l.exists&&l.payload?{kind:"success",text:`Backup found from ${Z(l.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(l){Be(l)}}async function En(){let s=I.version;if(!Ve(s))return;let l=await sn(I.releasesUrl);l&&qe(l,s)>0&&xn(l)}function Nn(s){let l=p(d({},r),{autoBackupEnabled:s});c(l),fe(l),u({kind:"success",text:s?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}function Me(s){let l=p(d({},r),{shortcut:s});c(l),fe(l),Fe(s),B(null),u({kind:"success",text:s?`${z(s)} now opens Syncify.`:"Keyboard shortcut turned off."})}function Tn(s){let l=p(d({},r),{entryPoint:s});c(l),fe(l),ce(s)}function _n(){B(null),M(!0)}async function Pn(){try{N(!1),a("loading"),u({kind:"info",text:"Backing up your extensions and themes\u2026"});let{payload:s,unchanged:l}=await be(r);if(await yt(),l){Ce(!0),a("success"),u({kind:"success",text:"Everything is already backed up."}),Spicetify.showNotification("Syncify: everything is already backed up");return}Xe(s),Ze(m=>[s,...m.filter(D=>D.payload_hash!==s.payload_hash)].slice(0,Fi)),Qe(m=>(m==null?void 0:m.payload_hash)===s.payload_hash?null:m),$(s),Ce(!0),a("success"),u({kind:"success",text:`Backed up ${s.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(s){Be(s)}}function Mn(s=g){if(Ge===!1){let l="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";u({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3);return}if(!s){let l="No Syncify cloud backup was found for this Spotify account.";u({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3);return}$(s),nt(!1),N(!0)}async function Bn(){try{N(!1),a("loading"),u({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:s,restoredCount:l}=await tn(r,g!=null?g:void 0);$(s),a("success"),u({kind:"success",text:`Restored ${l} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),setTimeout(()=>window.location.reload(),1e3)}catch(s){Be(s)}}function H(s){if(s.startsWith("mailto:")){window.location.href=s;return}window.open(s,"_blank","noopener,noreferrer")}function Be(s){if(a("error"),s instanceof Y){kn(!0),u(null);return}let l=s instanceof Error?s.message:String(s);u({kind:"error",text:l}),Spicetify.showNotification(l,!0,6e3)}function ut(s,l){let m=(g==null?void 0:g.payload_hash)===s.payload_hash,D=s.payload_hash===k,pt=Z(s.metadata.last_sync_datetime),mt=cn(vn(s));return e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":m,"data-selected":m?"true":"false",type:"button",key:`${s.payload_hash}-${s.metadata.last_sync_datetime}`,title:l!=null&&l.isSafetyCopy?"Kept aside and updated about once a week, so a burst of new backups can't replace it":void 0,onClick:()=>{$(s),N(!1)},disabled:C},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),l!=null&&l.isSafetyCopy?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Safety copy"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 updated weekly")),e.createElement("span",{className:"syncify-muted"},pt," \xB7 ",mt)):e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-backup-date"},pt),e.createElement("span",{className:"syncify-muted"},mt," \xB7 from ",s.metadata.device_info)),D?e.createElement("span",{className:"syncify-tag",title:"What's on this device now"},"Current"):null,l!=null&&l.isSafetyCopy?e.createElement(Ri,null):null)}function Ae(s){s.stopPropagation()}let An=A?"Update Syncify to keep backing up":et?x?ct?"Changes since your last backup":"Everything is backed up":"No backup yet":y==="error"?"Couldn't check your backup":"Checking your backup\u2026",dt=A?"Your backups are safe":et?x?ct?Ki(x,wn(x),ee,Ie):`Last backup ${Z(x.metadata.last_sync_datetime)}`:"Save your extensions and themes so you can restore them after a reinstall or on another computer.":null;return e.createElement("div",{className:"syncify-panel",ref:ot,onClick:Ae,onMouseDown:Ae,onPointerDown:Ae},A?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,"This version of Syncify is no longer supported."),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>H(`${I.githubUrl}#updating`)},"How to update")):null,ie?e.createElement("div",{className:"syncify-alert","data-kind":ie.kind},e.createElement("span",null,ie.text),e.createElement("span",{className:"syncify-alert-actions"},ie.kind==="error"?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{ft()},disabled:C},"Try again"):null,e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>u(null)},e.createElement(ji,null)))):null,e.createElement("section",{className:"syncify-status","aria-live":"polite"},e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},An),e.createElement("p",{className:"syncify-muted"},dt?`${dt} \xB7 `:"",cn(S)," on this device")),e.createElement("button",{className:"syncify-button",type:"button",onClick:Pn,disabled:C||K||A,title:K?"No changes since your last backup":void 0},C?"Working\u2026":K?"Backed up":"Back up now")),P.length>0?e.createElement("section",{className:"syncify-section","aria-label":"Backups"},e.createElement("div",{className:"syncify-section-header"},e.createElement("h4",{className:"syncify-section-title"},"Backups"),K&&U.length>1?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":ne,"aria-controls":"syncify-backup-list",onClick:()=>{bn(!ne),N(!1)}},ne?"Show less":`Show all ${U.length}`,e.createElement(Je,null)):null),e.createElement("div",{className:"syncify-backup-list",id:"syncify-backup-list",role:"radiogroup","aria-label":"Choose a backup to restore"},In.map(s=>ut(s)),Pe&&F?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),ut(F,{isSafetyCopy:!0})):null),Pe?Ge===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to restore a backup."):Ee?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},"Restore"," ",g?Z(g.metadata.last_sync_datetime):"this backup","?"),st?e.createElement(Oi,{preview:st,expanded:tt,onToggle:()=>nt(!tt)}):null,e.createElement("div",{className:"syncify-actions"},Cn?e.createElement("div",{className:"syncify-alert syncify-actions-hint"},"Your current setup isn't backed up."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>N(!1),disabled:C},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:Bn,disabled:C},"Restore"))):e.createElement("div",{className:"syncify-actions"},lt?e.createElement("span",{className:"syncify-muted syncify-actions-hint"},"This backup is already current."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>Mn(),disabled:C||!g||lt},"Restore backup")):null):null,e.createElement("div",{className:"syncify-accordion"},e.createElement(Li,{id:"settings",title:"Settings",openSection:hn,onToggle:s=>{Sn(s),s!=="settings"&&M(!1)}},e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Back up automatically"),e.createElement("span",{className:"syncify-muted"},"When Spotify starts and something has changed")),e.createElement("input",{className:"syncify-switch",type:"checkbox",role:"switch",checked:r.autoBackupEnabled&&!A,onChange:s=>Nn(s.currentTarget.checked),disabled:C||A})),e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Open Syncify from"),_e?r.entryPoint==="menu"&&!r.shortcut?e.createElement("span",{className:"syncify-muted"},"Keep a shortcut in case a Spotify update breaks the menu"):null:e.createElement("span",{className:"syncify-muted"},"The profile menu isn't available in this Spicetify version")),e.createElement("select",{className:"syncify-select",value:_e?r.entryPoint:"topbar",onChange:s=>Tn(s.currentTarget.value),disabled:!_e},$i.map(s=>e.createElement("option",{key:s.value,value:s.value},s.label)))),e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Keyboard shortcut"),v&&!Ne?e.createElement("span",{className:"syncify-muted"},"Press a key combination, or Esc to cancel"):null),e.createElement("span",{className:"syncify-shortcut"},r.shortcut&&!v?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Me(null)},"Turn off"):null,!r.shortcut&&!v?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Me(R)},"Use default"):null,e.createElement("button",{className:"syncify-key",type:"button","data-recording":v?"true":"false",onClick:()=>v?M(!1):_n(),title:"Click to change"},v?"Press keys\u2026":r.shortcut?z(r.shortcut):"Off"))),Ne?e.createElement("div",{className:"syncify-alert",role:"alert"},Ne):null)),e.createElement("footer",{className:"syncify-footer"},e.createElement("span",{className:"syncify-footer-version"},e.createElement("span",null,"Syncify ",I.version),it?e.createElement("button",{className:"syncify-text-button syncify-update",type:"button",onClick:()=>at?window.location.reload():H(`${I.githubUrl}#updating`)},it," is out \xB7 ",at?"Reload":"How to update"):null),e.createElement("span",{className:"syncify-footer-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>H(I.issueUrl)},"Report an issue"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>H(I.githubUrl)},"GitHub"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>H(I.kofiUrl)},"Support on Ko-fi"))))}var an={added:{mark:"+",label:"Added"},removed:{mark:"\u2212",label:"Removed"},unchanged:{mark:"=",label:"Unchanged"}},Ui=[["extension","Extensions"],["theme","Themes"],["snippet","Snippets"]],Di={extension:"extension",custom_app:"custom app",theme:"theme"};function Oi(e){let t=Spicetify.React,{items:n,counts:i,manual:o}=e.preview;return t.createElement(t.Fragment,null,t.createElement("div",{className:"syncify-chips","aria-label":"What changes on this device"},i.added?t.createElement("span",{className:"syncify-chip","data-change":"added"},"+",i.added," added"):null,i.removed?t.createElement("span",{className:"syncify-chip","data-change":"removed"},"\u2212",i.removed," removed"):null,i.unchanged?t.createElement("span",{className:"syncify-chip"},i.unchanged," unchanged"):null,o.length?t.createElement("span",{className:"syncify-chip"},o.length," to add manually"):null),n.length||o.length?t.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":e.expanded,"aria-controls":"syncify-restore-changes",onClick:e.onToggle},e.expanded?"Hide changes":"Show changes",t.createElement(Je,null)):null,e.expanded?t.createElement("div",{className:"syncify-changes",id:"syncify-restore-changes"},Ui.map(([r,c])=>{let y=n.filter(a=>a.type===r);return y.length===0?null:t.createElement("section",{key:r,"aria-label":c},t.createElement("h5",{className:"syncify-change-group"},c),t.createElement("ul",{className:"syncify-change-list"},y.map(a=>t.createElement("li",{className:"syncify-change",key:a.key},t.createElement("span",{className:"syncify-mark","data-change":a.change,role:"img","aria-label":an[a.change].label},an[a.change].mark),t.createElement("span",{className:"syncify-change-name"},a.name,a.repo?t.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",a.repo):null)))))}),o.length?t.createElement("section",{"aria-label":"Add manually"},t.createElement("h5",{className:"syncify-change-group"},"Add manually"),t.createElement("ul",{className:"syncify-change-list"},o.map(r=>t.createElement("li",{className:"syncify-change",key:`${r.type}:${r.name}`},t.createElement("span",{className:"syncify-mark","aria-hidden":"true"}),t.createElement("span",{className:"syncify-change-name"},r.name,t.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",Di[r.type],r.scheme?`, ${r.scheme}`:"")))))):null):null)}function Li(e){let t=Spicetify.React,n=e.openSection===e.id,i=`syncify-section-${e.id}`;return t.createElement("section",{className:"syncify-accordion-section","aria-label":e.title},t.createElement("button",{className:"syncify-accordion-header",type:"button","aria-expanded":n,"aria-controls":i,onClick:()=>e.onToggle(n?null:e.id)},t.createElement("span",{className:"syncify-accordion-title"},e.title),t.createElement(Je,null)),n?t.createElement("div",{className:"syncify-accordion-body",id:i},e.children):null)}function Ri(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-shield",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"}))}function Je(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-chevron",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"m9 6 6 6-6 6"}))}function ji(){let e=Spicetify.React;return e.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M18 6 6 18"}),e.createElement("path",{d:"m6 6 12 12"}))}var Fi=3,$i=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function Ki(e,t,n,i){var te;let o=new Set(t),r=new Set(n),c=n.filter(_=>!o.has(_)).length,y=t.filter(_=>!r.has(_)).length,a=(te=e.spicetify_config)!=null?te:null,f=!!(i&&!a),u=!f&&(i&&a?!Rt(i,a):i!==a),S=[c?`${c} added`:null,y?`${y} removed`:null,u?"Spicetify config changed":null].filter(Boolean),Q=Z(e.metadata.last_sync_datetime),ee=S.length?`${S.join(", ")} since ${Q}`:`Last backup ${Q}`;return f?`${ee} \xB7 Spicetify config not saved yet`:ee}function cn(e){return e===1?"1 extension or theme":`${e} extensions and themes`}function Z(e){let t=new Date(e);if(Number.isNaN(t.getTime()))return e;let n=t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),i=new Date,o=new Date(i);return o.setDate(i.getDate()-1),t.toDateString()===i.toDateString()?`today, ${n}`:t.toDateString()===o.toDateString()?`yesterday, ${n}`:`${t.toLocaleDateString(void 0,{month:"short",day:"numeric",year:t.getFullYear()===i.getFullYear()?void 0:"numeric"})}, ${n}`}var ke="[Syncify]";function w(e,t){if(t===void 0){console.debug(ke,e);return}console.debug(ke,e,t)}function we(e,t){if(t===void 0){console.warn(ke,e);return}console.warn(ke,e,t)}function Hi(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var fn="syncify-styles";function Yi(){if(document.getElementById(fn)){w("Another copy of Syncify is running; stopping this one");return}zi();let e=j();Dt({topbarButton:Wi(),menuItem:Zi()}),ce(e.entryPoint),je(e.shortcut,ve),nn().catch(t=>{we("Startup sync check failed",t)})}function zi(){let e=document.createElement("style");e.id=fn,e.textContent=St,document.head.appendChild(e)}function Wi(){let{extensionName:e}=h(),t=new Spicetify.Topbar.Button(e,Ue,n=>{w("Topbar button clicked",xe(n)),ve()},!1,!0);return un(t),Ji(t),eo(t),w("Topbar button registered",xe(t)),t}function un(e){var n;let t=e;e.element.style.setProperty("-webkit-app-region","no-drag"),(n=t.button)==null||n.style.setProperty("-webkit-app-region","no-drag")}var yn=".main-actionButtons",Vi=".Root__globalNav, .Root__top-bar",qi=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function Ji(e){if(typeof MutationObserver=="undefined")return;let t=!1,n=null,i=()=>{t=!1,r();let c=e.element,y=document.querySelector(yn);!c||!y||y.contains(c)||(y.prepend(c),Gi(e),un(e),w("Topbar button re-attached",xe(e)))},o=new MutationObserver(()=>{t||(t=!0,setTimeout(i,250))}),r=()=>{var a;if(n!=null&&n.isConnected)return;let c=document.querySelector(yn),y=(a=c==null?void 0:c.closest(Vi))!=null?a:c==null?void 0:c.parentElement;if(o.disconnect(),n=y!=null?y:null,!y){o.observe(document.body,{childList:!0,subtree:!0});return}o.observe(y,{childList:!0,subtree:!0});for(let f=y.parentElement;f;f=f.parentElement)o.observe(f,{childList:!0})};i()}function Gi(e){let t=Xi(e);if(!t||t.className&&t.className!=="undefined")return;let n=Array.from(document.querySelectorAll(qi)).find(i=>!e.element.contains(i));n!=null&&n.className&&(t.className=n.className)}function Xi(e){return e.button}function Zi(){var e;if(typeof((e=Spicetify.Menu)==null?void 0:e.Item)!="function")return null;try{return new Spicetify.Menu.Item(h().extensionName,!1,()=>ve(),Qi())}catch(t){return we("Failed to create profile menu item",t),null}}function Qi(){return Ue.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function eo(e){Object.assign(window,{SyncifyDebug:{button:e,element:e.element,openModal:ve,inspect:()=>xe(e),clickElement:()=>{var t;return(t=e.element)==null?void 0:t.click()},clickInnerButton:()=>{var t;return(t=e.button)==null?void 0:t.click()},clickCallback:()=>e.onClick(e)}})}function xe(e){var t,n,i,o,r;return{label:e.label,disabled:e.disabled,isRight:e.isRight,hasElement:!!e.element,elementConnected:(t=e.element)==null?void 0:t.isConnected,elementDisabled:(n=e.element)==null?void 0:n.disabled,elementAriaDisabled:(i=e.element)==null?void 0:i.getAttribute("aria-disabled"),elementClass:(o=e.element)==null?void 0:o.className,appRegion:e.element?getComputedStyle(e.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:e.button?getComputedStyle(e.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:e.element?getComputedStyle(e.element).pointerEvents:null,visibility:e.element?getComputedStyle(e.element).visibility:null,display:e.element?getComputedStyle(e.element).display:null,rect:(r=e.element)==null?void 0:r.getBoundingClientRect().toJSON()}}var b=null;function ve(){var t;if(b!=null&&b.container.isConnected){w("Closing modal"),Spicetify.PopupModal.hide();return}w("Opening modal"),(t=b==null?void 0:b.root)==null||t.unmount();let e=document.createElement("div");b={container:e,root:null};try{Spicetify.PopupModal.display({title:h().extensionName,content:e,isLarge:!1})}catch(n){throw we("Failed to open PopupModal",n),n}to(e),io(e)}function to(e){requestAnimationFrame(()=>{let t=no(e);t==null||t.classList.add("syncify-modal-shell");let n=t==null?void 0:t.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');n&&(n.classList.add("syncify-modal-close"),n.setAttribute("aria-label",`Close ${h().extensionName}`),n.title="Close",n.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function no(e){let t=e.parentElement;for(;t&&t!==document.body;){if(t.querySelector(".main-trackCreditsModal-header"))return t;t=t.parentElement}return e.closest('[class*="trackCreditsModal"]')}function io(e){try{let t=Spicetify.React.createElement(ln);if(typeof Spicetify.ReactDOM.createRoot=="function"){let n=Spicetify.ReactDOM.createRoot(e);n.render(t),(b==null?void 0:b.container)===e&&(b.root=n),w("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(t,e),w("Modal rendered",{renderer:"render"})}catch(t){throw we("Failed to render modal",t),t}}(function e(){if(!Hi()){setTimeout(e,100);return}w("Spicetify APIs ready"),Yi()})();})();
