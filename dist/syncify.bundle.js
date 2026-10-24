// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var Zn=Object.defineProperty,Qn=Object.defineProperties;var ei=Object.getOwnPropertyDescriptors;var vt=Object.getOwnPropertySymbols;var ti=Object.prototype.hasOwnProperty,ni=Object.prototype.propertyIsEnumerable;var Ct=(e,t,n)=>t in e?Zn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,d=(e,t)=>{for(var n in t||(t={}))ti.call(t,n)&&Ct(e,n,t[n]);if(vt)for(var n of vt(t))ni.call(t,n)&&Ct(e,n,t[n]);return e},g=(e,t)=>Qn(e,ei(t));var It=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var $e=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var M={extensionName:"Syncify",version:"1.6.1",workerUrl:"https://syncify-worker.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com"};function S(){var t,n,i,o,r,a,l;let e=window.SyncifyConfig;return{extensionName:(t=j(e==null?void 0:e.extensionName))!=null?t:M.extensionName,version:(n=Et(e==null?void 0:e.version))!=null?n:M.version,workerUrl:(i=j(e==null?void 0:e.workerUrl))!=null?i:M.workerUrl,githubUrl:(o=j(e==null?void 0:e.githubUrl))!=null?o:M.githubUrl,kofiUrl:(r=j(e==null?void 0:e.kofiUrl))!=null?r:M.kofiUrl,issueUrl:(a=j(e==null?void 0:e.issueUrl))!=null?a:M.issueUrl,releasesUrl:(l=j(e==null?void 0:e.releasesUrl))!=null?l:M.releasesUrl}}function j(e){return Et(e)}function Et(e){return typeof e=="string"&&e.trim()?e.trim():null}var ri="x-syncify-version",si="x-syncify-install",ai="x-syncify-timezone",ci="syncify",He="state",Tt="install-id",Nt="syncify:install-id",li=2e3,ue=null;async function _t(){let e={[ri]:S().version,[si]:await ui()},t=di();return t&&(e[ai]=t),e}function ui(){return ue!=null||(ue=yi().catch(()=>ye())),ue}async function yi(){let e=await Promise.race([fi(),new Promise(t=>setTimeout(()=>t(null),li))]);if(e)return e;try{let t=window.localStorage.getItem(Nt);if(t&&Pt(t))return t;let n=ye();return window.localStorage.setItem(Nt,n),n}catch(t){return ye()}}function fi(){let e;try{e=window.indexedDB}catch(t){return Promise.resolve(null)}return e?new Promise(t=>{let n;try{n=e.open(ci,1)}catch(i){t(null);return}n.onupgradeneeded=()=>{n.result.createObjectStore(He)},n.onerror=()=>t(null),n.onblocked=()=>t(null),n.onsuccess=()=>{let i=n.result,o=null;try{let r=i.transaction(He,"readwrite"),a=r.objectStore(He),l=a.get(Tt);l.onsuccess=()=>{if(typeof l.result=="string"&&Pt(l.result)){o=l.result;return}o=ye(),a.put(o,Tt)},r.oncomplete=()=>{i.close(),t(o)},r.onerror=r.onabort=()=>{i.close(),t(null)}}catch(r){i.close(),t(null)}}}):Promise.resolve(null)}function ye(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t=[...e].map(n=>n.toString(16).padStart(2,"0"));return[t.slice(0,4).join(""),t.slice(4,6).join(""),t.slice(6,8).join(""),t.slice(8,10).join(""),t.slice(10).join("")].join("-")}function Pt(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(e)}function di(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(e){return null}}var pi="x-syncify-user-hash",mi="x-syncify-identity",gi="/restores",Mt=3,V=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}};async function At(e,t,n){let i=await Ke(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(n)});if(!i.ok)throw new Error(`Backup failed with HTTP ${i.status}.`);let o=await i.json().catch(()=>null);return{unchanged:(o==null?void 0:o.unchanged)===!0}}async function Bt(e,t){var l,c,y;let n=await Ke(e,t,{method:"GET"});if(n.status===404)return{exists:!1,payload:null,backups:[],safetyCopy:null};if(!n.ok)throw new Error(`Restore failed with HTTP ${n.status}.`);let i=await n.json(),o=[i,...(l=i.backup_history)!=null?l:[]];if(!o.every(f=>f.backup))return{exists:!0,payload:i,backups:o.slice(0,Mt),safetyCopy:(c=o[Mt])!=null?c:null};let r=o.filter(f=>{var h;return((h=f.backup)==null?void 0:h.kind)==="rolling"}),a=(y=o.find(f=>{var h;return((h=f.backup)==null?void 0:h.kind)==="anchor"}))!=null?y:null;return r.length===0&&a?{exists:!0,payload:i,backups:[a],safetyCopy:null}:{exists:!0,payload:i,backups:r,safetyCopy:a}}async function Ut(e,t,n){try{await Ke(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:n}),keepalive:!0},gi)}catch(i){}}async function Ke(e,t,n,i=""){let o=i?`${e.replace(/\/+$/,"")}${i}`:e,r=await fetch(o,g(d({},n),{headers:g(d(d({},n.headers),await _t()),{[pi]:t.hash,[mi]:t.field})}));if(r.status===426)throw new V;return r}var $={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},hi=/^([a-z0-9]|f([1-9]|1[0-2]))$/,Si=250,ki=40,Ye=null,fe=null,F=null;function Lt(){return/mac/i.test(navigator.platform||navigator.userAgent)}function Ot(e){if(e===null)return null;if(!e||typeof e!="object")return $;let t=e;return typeof t.key!="string"||!hi.test(t.key)?$:{key:t.key,ctrl:!!t.ctrl,alt:!!t.alt,shift:!!t.shift,meta:!!t.meta}}function q(e){if(!e)return"Off";let t=e.key.toUpperCase();return Lt()?[e.ctrl?"\u2318":"",e.alt?"\u2325":"",e.shift?"\u21E7":"",t].join(""):[e.ctrl&&"Ctrl",e.meta&&"Win",e.alt&&"Alt",e.shift&&"Shift",t].filter(Boolean).join("+")}function Dt(e){if(e.key==="Escape")return{kind:"cancel"};let t=bi(e.code);if(!t)return{kind:"ignore"};let n=Lt();if(n&&e.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:t,ctrl:n?e.metaKey:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:n?!1:e.metaKey},o=t.startsWith("f")&&t.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!o?{kind:"error",message:`Include ${n?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function bi(e){var n,i;let t=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(e);return t?((i=(n=t[1])!=null?n:t[2])!=null?i:t[3]).toLowerCase():null}function Rt(e){var t;if(F&&xi(F,e))return!1;try{let n=Spicetify.Mousetrap,i=(t=n.trigger)==null?void 0:t.call(n)._directMap;if(!i)return!1;let o=ze(e);return Object.keys(i).some(r=>r.startsWith(`${o}:`))}catch(n){return!1}}function We(e,t,n=0){if(Ye=t,fe=e,!jt()){if(n>=ki){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>We(fe,t,n+1),Si);return}Ve(fe)}function Ve(e){if(fe=e,!jt()||!Ye)return;let t=Ye;try{if(F&&Spicetify.Keyboard._deregisterShortcut(F),F=null,!e)return;Spicetify.Keyboard.registerShortcut(e,n=>{n.preventDefault(),t()}),F=e,console.debug("[Syncify]","Keyboard shortcut registered",q(e))}catch(n){console.warn("[Syncify]","Failed to register keyboard shortcut",n)}}function jt(){var e;return typeof((e=Spicetify.Keyboard)==null?void 0:e.registerShortcut)=="function"}function ze(e){return[e.ctrl&&"mod",e.meta&&"meta",e.alt&&"alt",e.shift&&"shift",e.key].filter(Boolean).join("+")}function xi(e,t){return ze(e)===ze(t)}var qe="both",wi=["both","topbar","menu"],J=null,G=null,de=!1;function Ft(e){return wi.includes(e)?e:qe}function $t(){var e;return typeof((e=Spicetify.Menu)==null?void 0:e.Item)=="function"}function Ht(e){J=e.topbarButton,G=e.menuItem}function pe(e){let t=e!=="menu"||!G,n=e!=="topbar";if(J!=null&&J.element&&(J.element.style.display=t?"":"none"),!!G)try{n&&!de?(G.register(),de=!0):!n&&de&&(G.deregister(),de=!1)}catch(i){console.warn("[Syncify]","Failed to update profile menu item",i)}}var ge="syncify:config",me={workerUrl:S().workerUrl,autoBackupEnabled:!1,shortcut:$,entryPoint:qe};function H(){var n,i;let e=S(),t=(i=(n=Spicetify.LocalStorage)==null?void 0:n.get(ge))!=null?i:window.localStorage.getItem(ge);if(!t)return g(d({},me),{workerUrl:e.workerUrl});try{let o=JSON.parse(t);return{workerUrl:e.workerUrl,autoBackupEnabled:o.autoBackupEnabled===void 0?me.autoBackupEnabled:!!o.autoBackupEnabled,shortcut:o.shortcut===void 0?me.shortcut:Ot(o.shortcut),entryPoint:Ft(o.entryPoint)}}catch(o){return g(d({},me),{workerUrl:e.workerUrl})}}function he(e){var n;let t=JSON.stringify({workerUrl:S().workerUrl,autoBackupEnabled:e.autoBackupEnabled,shortcut:e.shortcut,entryPoint:e.entryPoint});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set(ge,t);return}window.localStorage.setItem(ge,t)}function Se(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}async function ke(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return[...new Uint8Array(n)].map(i=>i.toString(16).padStart(2,"0")).join("")}function X(e){return JSON.stringify(Je(e))}function Je(e){return Array.isArray(e)?e.map(Je):e&&typeof e=="object"?Object.keys(e).sort().reduce((t,n)=>(t[n]=Je(e[n]),t),{}):e}var vi=["username","canonicalUsername","id","uri","displayName"];async function be(){let{value:e,field:t}=await Ci();return{hash:await ke(e),field:t}}async function Ci(){var o;let e=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let t=await e.getUser(),n=vi.find(r=>(t==null?void 0:t[r])!=null),i=n?t[n]:void 0;if(!n||!i)throw new Error("Unable to resolve the active Spotify user.");return{value:i,field:n}}var Ii=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,Ei=100,Ti="marketplace:installed-extensions",Ni="marketplace:installed-themes",_i="marketplace:theme-installed",Pi="marketplace:installed:",Mi="marketplace";function Xe(e){return Spicetify.Config?Ze(Spicetify.Config,e):null}function Ze(e,t){var r;let n=_(e),i=new Set(Ai(t)),o=((r=t[_i])==null?void 0:r.includes(Pi))===!0;return{current_theme:o?Mi:n.current_theme,color_scheme:o?"":n.color_scheme,extensions:n.extensions.filter(a=>!i.has(a)),custom_apps:n.custom_apps}}function _(e){let t=e&&typeof e=="object"?e:{};return{current_theme:Ge(t.current_theme)?t.current_theme:"",color_scheme:Ge(t.color_scheme)?t.color_scheme:"",extensions:Kt(t.extensions),custom_apps:Kt(t.custom_apps)}}function Wt(e,t){return X(_(e))===X(_(t))}function Kt(e){return Array.isArray(e)?[...new Set(e.filter(Ge))].sort().slice(0,Ei):[]}function Ge(e){return typeof e=="string"&&Ii.test(e)}function Ai(e){let t=Yt(e[Ti]).map(i=>{var r;let o=(r=zt(e[i]))==null?void 0:r.manifest;return o&&typeof o=="object"?o.main:void 0}),n=Yt(e[Ni]).flatMap(i=>{var r;let o=(r=zt(e[i]))==null?void 0:r.include;return Array.isArray(o)?o:[]});return[...t,...n].flatMap(i=>{let o=typeof i=="string"?i.split("/").pop():void 0;return o?[o]:[]})}function Yt(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function zt(e){try{let t=e?JSON.parse(e):null;return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch(t){return null}}function Vt(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var Bi=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],Ui="marketplace:installed:",qt=`${Ui}snippet:`,Li="marketplace",Jt={added:0,removed:1,unchanged:2};function Z(e){let t=new Map;for(let[n,i]of Bi)for(let o of ji(e[n]))t.has(o)||t.set(o,Di(o,i,e[o]));return[...t.values()]}function Xt(e,t,n,i){let o=new Set(e.map(c=>c.key)),r=new Map(n.map(c=>[c.key,c])),a=[...e.map(c=>{let y=r.get(c.key);return g(d({},c),{change:y?"unchanged":"added",isNew:!y||y.sources.join(" ")!==c.sources.join(" ")})}),...n.filter(c=>!o.has(c.key)).map(c=>g(d({},c),{change:"removed",isNew:!1}))].sort((c,y)=>Jt[c.change]-Jt[y.change]||c.name.localeCompare(y.name)),l={added:0,removed:0,unchanged:0};for(let c of a)l[c.change]+=1;return{items:a,counts:l,manual:Oi(t,i)}}function Oi(e,t){if(!e)return[];let n=_(e),i=_(t),o=[...n.extensions.filter(a=>!i.extensions.includes(a)).map(a=>({type:"extension",name:a})),...n.custom_apps.filter(a=>!i.custom_apps.includes(a)).map(a=>({type:"custom_app",name:a}))],r=n.current_theme;return r&&r!==Li&&(r!==i.current_theme||n.color_scheme!==i.color_scheme)&&o.push(d({type:"theme",name:r},n.color_scheme?{scheme:n.color_scheme}:{})),o}function Di(e,t,n){var c,y;let i=Gt(n),o=Gt(i==null?void 0:i.manifest),r=xe(i==null?void 0:i.user),a=xe(i==null?void 0:i.repo),l=(y=(c=xe(i==null?void 0:i.title))!=null?c:xe(o==null?void 0:o.name))!=null?y:e.startsWith(qt)?e.slice(qt.length):e.split("/").pop()||e;return{key:e,type:t,name:l,repo:t!=="snippet"&&r&&a?`${r}/${a}`:null,sources:Ri(t,i),custom:t==="snippet"&&(i==null?void 0:i.custom)===!0}}function Ri(e,t){return t?(e==="extension"?[t.extensionURL]:e==="theme"?[t.cssURL,t.schemesURL,...Array.isArray(t.include)?t.include:[]]:[]).filter(i=>typeof i=="string"&&i!==""):[]}function xe(e){return typeof e=="string"&&e.trim()?e.trim():null}function ji(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function Gt(e){let t=e;if(typeof e=="string")try{t=JSON.parse(e)}catch(n){return null}return t&&typeof t=="object"&&!Array.isArray(t)?t:null}var we="spicetify-marketplace";var Q="settings";async function Zt(){let e=await tn();if(e.kind!=="ok")return null;try{let t=await nn(e.db,"readonly",i=>i.getAll());if(!t)return null;let n={};for(let i of t)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(n[i.key]=i.value);return n}finally{e.db.close()}}async function Qt(e){let t=await tn();if(t.kind==="unavailable")return"unavailable";let n=t.kind==="ok"?t.db:await Fi();if(!n)return"failed";try{return await nn(n,"readwrite",o=>{let r;for(let[a,l]of Object.entries(e))r=o.put({key:a,value:l});return r})===null?"failed":"written"}finally{n.close()}}function en(){var e;try{return(e=window.indexedDB)!=null?e:null}catch(t){return null}}async function tn(){let e=en();return e?await $i(e)?{kind:"missing"}:new Promise(t=>{let n=!1,i=e.open(we);i.onupgradeneeded=()=>{n=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),t({kind:"unavailable"})},i.onblocked=()=>t({kind:"unavailable"}),i.onsuccess=()=>{let o=i.result;if(n){o.close(),Hi(e).then(()=>t({kind:"missing"}));return}if(!o.objectStoreNames.contains(Q)){o.close(),t({kind:"unavailable"});return}t({kind:"ok",db:o})}}):{kind:"unavailable"}}function Fi(){let e=en();return e?new Promise(t=>{let n=e.open(we,1);n.onupgradeneeded=()=>{let i=n.result;i.objectStoreNames.contains(Q)||i.createObjectStore(Q,{keyPath:"key"})},n.onerror=()=>{console.warn("Syncify could not create Marketplace storage",n.error),t(null)},n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}async function $i(e){if(typeof e.databases!="function")return!1;try{return!(await e.databases()).some(n=>n.name===we)}catch(t){return!1}}function Hi(e){return new Promise(t=>{let n=e.deleteDatabase(we);n.onsuccess=()=>t(),n.onerror=()=>t(),n.onblocked=()=>t()})}function nn(e,t,n){return new Promise(i=>{let o;try{o=e.transaction(Q,t)}catch(y){console.warn("Syncify could not open a Marketplace transaction",y),i(null);return}let r,a=!1,l=y=>{a||(a=!0,i(y))};o.oncomplete=()=>l(r),o.onerror=()=>{console.warn("Syncify Marketplace transaction failed",o.error),l(null)},o.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",o.error),l(null)};let c;try{c=n(o.objectStore(Q))}catch(y){console.warn("Syncify Marketplace request could not be issued",y),l(null);return}c&&(c.onsuccess=()=>{r=c.result},c.onerror=()=>{console.warn("Syncify Marketplace request failed",c.error),l(null)})})}var Qe="marketplace:",on=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function rn(){let e=Gi(),t=await Zt();if(t)for(let[n,i]of Object.entries(t))n.startsWith(Qe)&&(e[n]=i);return e}var Yi=new Set(["marketplace:active-tab","marketplace:sort"]),zi="marketplace:installed:",Wi=["stars","tags","lastUpdated","created"];async function ve(e,t){let n={};for(let[i,o]of Object.entries(e))Yi.has(i)||(n[i]=i.startsWith(zi)?Vi(o):o);return t&&(n.spicetify_config=_(t)),ke(X(n))}function Vi(e){try{let t=JSON.parse(e);if(!t||typeof t!="object"||Array.isArray(t))return e;for(let n of Wi)delete t[n];return t}catch(t){return e}}async function Ce(){let e=await rn(),t=Xe(e);return{keyCount:Object.keys(e).length,hash:await ve(e,t),installedItemCount:qi(e),installedItems:cn(e),items:Z(e),spicetifyConfig:t,marketplaceAvailable:Ji(e)}}async function sn(){let e=await rn(),t=Xe(e);return d({schema_version:2,metadata:{last_sync_datetime:new Date().toISOString(),device_info:Vt(),marketplace_key_count:Object.keys(e).length},payload_hash:await ve(e,t),marketplace_data:{keys:e}},t?{spicetify_config:t}:{})}async function an(e){var r,a;let t={},n=(a=(r=e.marketplace_data)==null?void 0:r.keys)!=null?a:{};for(let[l,c]of Object.entries(n))l.startsWith(Qe)&&(t[l]=c);let i=Object.keys(t);if(i.length===0)return 0;for(let l of i)window.localStorage.setItem(l,t[l]);if(await Qt(t)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try the restore again.");return i.length}function qi(e){return cn(e).length}function cn(e){return on.flatMap(t=>Xi(e[t]).map(String))}function Ji(e){return!!(window.Marketplace||on.some(n=>e[n]!==void 0)||e["marketplace:tabs"]!==void 0)}function ln(e,t){return t===0?!1:e===0?!0:e<Math.max(2,Math.floor(t*.5))}function Gi(){let e={};for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);if(!(n!=null&&n.startsWith(Qe)))continue;let i=window.localStorage.getItem(n);i!==null&&(e[n]=i)}return e}function Xi(e){if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch(t){return[]}}async function Ie(e){if(!Se(e))throw new Error("Syncify backup service is not configured.");let[t,n]=await Promise.all([be(),sn()]);if(n.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:i}=await At(e.workerUrl,t,n);return{payload:n,unchanged:i}}async function ee(e){var r;if(!Se(e))throw new Error("Syncify backup service is not configured.");let t=await Bt(e.workerUrl,await be()),[n,i]=await Promise.all([Promise.all(t.backups.map(un)),t.safetyCopy?un(t.safetyCopy):null]),o=n.filter((a,l)=>n.findIndex(c=>c.payload_hash===a.payload_hash)===l);return g(d({},t),{payload:(r=o[0])!=null?r:null,backups:o,safetyCopy:i&&!o.some(a=>a.payload_hash===i.payload_hash)?i:null})}var et=new Map;async function un(e){var r,a,l;let t=(a=(r=e.marketplace_data)==null?void 0:r.keys)!=null?a:{},n=e.spicetify_config?Ze(e.spicetify_config,t):void 0,i=`${e.payload_hash} ${(l=e.metadata)==null?void 0:l.last_sync_datetime}`,o=et.get(i);return o||(o=ve(t,n),et.set(i,o),o.catch(()=>et.delete(i))),g(d(d({},e),n?{spicetify_config:n}:{}),{payload_hash:await o})}async function yn(e,t){var r;let n=t!=null?t:(await ee(e)).payload;if(!n)throw new Error("No Syncify cloud backup was found for this Spotify account.");let i=await an(n),o=(r=n.backup)==null?void 0:r.id;return o&&Se(e)&&be().then(a=>Ut(e.workerUrl,a,o)).catch(()=>{}),{payload:n,restoredCount:i}}async function fn(){var t,n,i;let e=H();if(!(!e.workerUrl||!e.autoBackupEnabled))try{let[o,r]=await Promise.all([Ce(),ee(e)]),a=(n=(t=r.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?n:0;if(r.exists&&ln(o.keyCount,a)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((i=r.payload)==null?void 0:i.payload_hash)===o.hash||o.keyCount===0)return;await Ie(e),Spicetify.showNotification("Syncify auto-backup complete")}catch(o){let r=o instanceof Error?o.message:String(o);console.warn("Syncify startup sync failed:",o),Spicetify.showNotification(`Syncify auto-sync skipped: ${r}`,!0,8e3)}}var Zi="raw.githubusercontent.com",Qi={extension:"spicetify-extensions",theme:"spicetify-themes"},eo="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",to="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",no="https://api.github.com/repos",io=5e3,oo=20,dn="syncify:repo-topics",pn=10080*60*1e3,ro=200;function Ee(e){return(e==null?void 0:e.kind)==="host"||(e==null?void 0:e.kind)==="repo"||(e==null?void 0:e.kind)==="blocked"||(e==null?void 0:e.kind)==="catalog"}function mn(e){let t=new Map;for(let n of e){if(n.change==="removed")continue;if(n.custom){t.set(n.key,{kind:"custom"});continue}let i=so(n);i&&t.set(n.key,i)}return t}async function gn(e,t){let n=new Map,i=e.filter(a=>a.change!=="removed"&&a.isNew&&!t.has(a.key));if(i.length===0)return n;let o=i.filter(a=>a.type==="snippet"),r=i.filter(a=>a.type!=="snippet");if(o.length>0){let a=await uo();for(let l of o)a?a.has(Sn(l.name))||n.set(l.key,{kind:"catalog"}):n.set(l.key,{kind:"unchecked"})}if(r.length>0){let a=await lo(),l=po(),c=0;await Promise.all(r.map(async y=>{let f=ao(y),h=Qi[y.type];if(!f||!h)return;if(a===null){n.set(y.key,{kind:"unchecked"});return}if(co(f,a)){n.set(y.key,{kind:"blocked"});return}let k=fo(l,f);k===void 0&&c<oo&&(c+=1,k=await yo(f),k!==void 0&&(l[f.toLowerCase()]={topics:k,at:Date.now()})),k===void 0?n.set(y.key,{kind:"unchecked"}):(k===null||!k.includes(h))&&n.set(y.key,{kind:"catalog"})})),mo(l)}return n}function so(e){let t=null;for(let n of e.sources){let i;try{i=new URL(n)}catch(r){return{kind:"host",host:n.slice(0,40)}}if(i.host!==Zi)return{kind:"host",host:i.host};let o=hn(i);o&&e.repo&&o.toLowerCase()!==e.repo.toLowerCase()&&(t!=null||(t=o))}return t?{kind:"repo",repo:t}:null}function ao(e){for(let t of e.sources)try{let n=hn(new URL(t));if(n)return n}catch(n){}return e.repo}function hn(e){let[t,n]=e.pathname.split("/").filter(Boolean);return t&&n?`${t}/${n}`:null}function co(e,t){let n=`https://github.com/${e}`.toLowerCase();return t.some(i=>{let o=i.toLowerCase();if(!o.includes("*"))return o===n;let r=o.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${r}$`).test(n)})}function Sn(e){return e.replace(/\n/g,"").trim().toLowerCase()}var te=null,ne=null;function lo(){return te!=null||(te=kn(eo).then(e=>{let t=e==null?void 0:e.repos;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&!n.startsWith("//")):(te=null,null)})),te}function uo(){return ne!=null||(ne=kn(to).then(e=>Array.isArray(e)?new Set(e.flatMap(t=>typeof(t==null?void 0:t.title)=="string"?[Sn(t.title)]:[])):(ne=null,null))),ne}async function yo(e){let t=await bn(`${no}/${e}`);if((t==null?void 0:t.status)===404)return null;if(!(t!=null&&t.ok))return;let n=await t.json().catch(()=>null);return Array.isArray(n==null?void 0:n.topics)?n.topics.filter(i=>typeof i=="string"):void 0}async function kn(e){let t=await bn(e);return t!=null&&t.ok?t.json().catch(()=>null):null}async function bn(e){let t=typeof AbortController=="function"?new AbortController:null,n=setTimeout(()=>t==null?void 0:t.abort(),io);try{return await fetch(e,{signal:t==null?void 0:t.signal})}catch(i){return null}finally{clearTimeout(n)}}function fo(e,t){let n=e[t.toLowerCase()];return n&&Date.now()-n.at<pn?n.topics:void 0}function po(){var e;try{let t=JSON.parse((e=localStorage.getItem(dn))!=null?e:"{}");return t&&typeof t=="object"?t:{}}catch(t){return{}}}function mo(e){let t=Date.now(),n=Object.entries(e).filter(([,i])=>t-i.at<pn).sort(([,i],[,o])=>o.at-i.at).slice(0,ro);try{localStorage.setItem(dn,JSON.stringify(Object.fromEntries(n)))}catch(i){}}var go="syncify:beta",xn=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function wn(){var e;return(e=window.SyncifyLoader)!=null?e:null}function ho(){try{return window.localStorage.getItem(go)==="true"}catch(e){return!1}}async function vn(e){let t=ho()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(t.map(i=>So(`${e}/${i}`)))).reduce((i,o)=>o&&(!i||nt(o,i)>0)?o:i,null)}function tt(e){return typeof e=="string"&&xn.test(e)}function nt(e,t){let[n,i]=[e,t].map(o=>{var y;let[,r,a,l,c]=(y=xn.exec(o))!=null?y:[];return[r,a,l,c!=null?c:1/0].map(Number)});for(let o=0;o<n.length;o+=1)if(n[o]!==i[o])return n[o]<i[o]?-1:1;return 0}async function So(e,t=3e3){let n=typeof AbortController=="function"?new AbortController:null,i=setTimeout(()=>n==null?void 0:n.abort(),t);try{let o=await fetch(e,{signal:n==null?void 0:n.signal});if(!o.ok)return null;let r=await o.json();return tt(r==null?void 0:r.version)?r.version:null}catch(o){return null}finally{clearTimeout(i)}}function En(){let e=Spicetify.React,t=e.useEffect,n=e.useMemo,i=e.useState,o=e.useRef,[r,a]=i(()=>H()),[l,c]=i("idle"),[y,f]=i(null),[h,k]=i(0),[oe,re]=i([]),[A,Pn]=i([]),[Me,Mn]=i(null),[ot,An]=i(null),[x,Bn]=i(null),[w,rt]=i(null),[B,st]=i([]),[K,at]=i(null),[m,Y]=i(null),[ct,Ae]=i(!1),[Be,P]=i(!1),[lt,se]=i(!1),[ae,ut]=i(null),[C,U]=i(!1),[Ue,L]=i(null),[Un,Ln]=i(null),[ce,On]=i(!1),[O,Dn]=i(!1),[yt,Rn]=i(null),ft=o(null),I=n(()=>S(),[]),D=n(()=>K?[...B,K]:B,[B,K]),dt=n(()=>new Map(D.map(s=>[s,Z(s.marketplace_data.keys)])),[D]),Le=s=>{var u;return(u=dt.get(s))!=null?u:Z(s.marketplace_data.keys)},jn=s=>Le(s).map(u=>u.key),Fn=s=>Le(s).length,E=n(()=>Be&&m?Xt(Le(m),m.spicetify_config,A,Me):null,[Be,m,dt,A,Me]),T=n(()=>E?mn(E.items):null,[E]),$n=n(()=>new Map([...ae!=null?ae:[],...T!=null?T:[]]),[ae,T]),Oe=n(()=>$t(),[]),pt=n(()=>wn()!==null,[]),N=l==="loading",le=(y==null?void 0:y.kind)==="warning"||(y==null?void 0:y.kind)==="error"?y:null,mt=!!(w&&x&&w.payload_hash!==x),z=!!(w&&x&&w.payload_hash===x),gt=!!(m&&x&&m.payload_hash===x),De=ce||!z||D.length<2,Hn=De?B:B.slice(0,1),Kn=!!(x&&h>0&&!D.some(s=>s.payload_hash===x));t(()=>{St({silent:!0}),Yn()},[]),t(()=>{if(ut(null),!E||!T)return;[...T.values()].some(Ee)&&se(!0);let s=!0;return gn(E.items,T).then(u=>{s&&(ut(u),[...u.values()].some(Ee)&&se(!0))}),()=>{s=!1}},[E,T]),t(()=>{if(!C)return;let s=u=>{var R;if(!((R=ft.current)!=null&&R.isConnected)){U(!1),L(null);return}u.preventDefault(),u.stopImmediatePropagation();let p=Dt(u);if(p.kind!=="ignore"){if(p.kind==="cancel"){U(!1),L(null);return}if(p.kind==="error"){L(p.message);return}if(Rt(p.shortcut)){L(`${q(p.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}U(!1),Re(p.shortcut)}};return window.addEventListener("keydown",s,!0),()=>window.removeEventListener("keydown",s,!0)},[C,r]);async function ht(){let s=await Ce();return Bn(s.hash),k(s.installedItemCount),re(s.installedItems),Pn(s.items),Mn(s.spicetifyConfig),An(s.marketplaceAvailable),s}async function St(s){try{P(!1),c("loading"),s!=null&&s.silent||f({kind:"info",text:"Checking your Syncify backup\u2026"}),await ht();let u=await ee(r);rt(u.payload),st(u.backups),at(u.safetyCopy),Y(u.payload),Ae(!0),c(u.exists?"success":"idle"),s!=null&&s.silent||f(u.exists&&u.payload?{kind:"success",text:`Backup found from ${ie(u.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(u){je(u)}}async function Yn(){let s=I.version;if(!tt(s))return;let u=await vn(I.releasesUrl);u&&nt(u,s)>0&&Rn(u)}function zn(s){let u=g(d({},r),{autoBackupEnabled:s});a(u),he(u),f({kind:"success",text:s?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}function Re(s){let u=g(d({},r),{shortcut:s});a(u),he(u),Ve(s),L(null),f({kind:"success",text:s?`${q(s)} now opens Syncify.`:"Keyboard shortcut turned off."})}function Wn(s){let u=g(d({},r),{entryPoint:s});a(u),he(u),pe(s)}function Vn(){L(null),U(!0)}async function qn(){try{P(!1),c("loading"),f({kind:"info",text:"Backing up your extensions and themes\u2026"});let{payload:s,unchanged:u}=await Ie(r);if(await ht(),u){Ae(!0),c("success"),f({kind:"success",text:"Everything is already backed up."}),Spicetify.showNotification("Syncify: everything is already backed up");return}rt(s),st(p=>[s,...p.filter(R=>R.payload_hash!==s.payload_hash)].slice(0,No)),at(p=>(p==null?void 0:p.payload_hash)===s.payload_hash?null:p),Y(s),Ae(!0),c("success"),f({kind:"success",text:`Backed up ${s.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(s){je(s)}}function Jn(s=m){if(ot===!1){let u="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";f({kind:"error",text:u}),Spicetify.showNotification(u,!0,6e3);return}if(!s){let u="No Syncify cloud backup was found for this Spotify account.";f({kind:"error",text:u}),Spicetify.showNotification(u,!0,6e3);return}Y(s),se(!1),P(!0)}async function Gn(){try{P(!1),c("loading"),f({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:s,restoredCount:u}=await yn(r,m!=null?m:void 0);Y(s),c("success"),f({kind:"success",text:`Restored ${u} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),setTimeout(()=>window.location.reload(),1e3)}catch(s){je(s)}}function W(s){if(s.startsWith("mailto:")){window.location.href=s;return}window.open(s,"_blank","noopener,noreferrer")}function je(s){if(c("error"),s instanceof V){Dn(!0),f(null);return}let u=s instanceof Error?s.message:String(s);f({kind:"error",text:u}),Spicetify.showNotification(u,!0,6e3)}function kt(s,u){let p=(m==null?void 0:m.payload_hash)===s.payload_hash,R=s.payload_hash===x,xt=ie(s.metadata.last_sync_datetime),wt=In(Fn(s));return e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":p,"data-selected":p?"true":"false",type:"button",key:`${s.payload_hash}-${s.metadata.last_sync_datetime}`,title:u!=null&&u.isSafetyCopy?"Kept aside and updated about once a week, so a burst of new backups can't replace it":void 0,onClick:()=>{Y(s),P(!1)},disabled:N},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),u!=null&&u.isSafetyCopy?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Safety copy"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 updated weekly")),e.createElement("span",{className:"syncify-muted"},xt," \xB7 ",wt)):e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-backup-date"},xt),e.createElement("span",{className:"syncify-muted"},wt," \xB7 from ",s.metadata.device_info)),R?e.createElement("span",{className:"syncify-tag",title:"What's on this device now"},"Current"):null,u!=null&&u.isSafetyCopy?e.createElement(Io,null):null)}function Fe(s){s.stopPropagation()}let Xn=O?"Update Syncify to keep backing up":ct?w?mt?"Changes since your last backup":"Everything is backed up":"No backup yet":l==="error"?"Couldn't check your backup":"Checking your backup\u2026",bt=O?"Your backups are safe":ct?w?mt?Po(w,jn(w),oe,Me):`Last backup ${ie(w.metadata.last_sync_datetime)}`:"Save your extensions and themes so you can restore them after a reinstall or on another computer.":null;return e.createElement("div",{className:"syncify-panel",ref:ft,onClick:Fe,onMouseDown:Fe,onPointerDown:Fe},O?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,"This version of Syncify is no longer supported."),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>W(`${I.githubUrl}#updating`)},"How to update")):null,le?e.createElement("div",{className:"syncify-alert","data-kind":le.kind},e.createElement("span",null,le.text),e.createElement("span",{className:"syncify-alert-actions"},le.kind==="error"?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{St()},disabled:N},"Try again"):null,e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>f(null)},e.createElement(To,null)))):null,e.createElement("section",{className:"syncify-status","aria-live":"polite"},e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},Xn),e.createElement("p",{className:"syncify-muted"},bt?`${bt} \xB7 `:"",In(h)," on this device")),e.createElement("button",{className:"syncify-button",type:"button",onClick:qn,disabled:N||z||O,title:z?"No changes since your last backup":void 0},N?"Working\u2026":z?"Backed up":"Back up now")),B.length>0?e.createElement("section",{className:"syncify-section","aria-label":"Backups"},e.createElement("div",{className:"syncify-section-header"},e.createElement("h4",{className:"syncify-section-title"},"Backups"),z&&D.length>1?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":ce,"aria-controls":"syncify-backup-list",onClick:()=>{On(!ce),P(!1)}},ce?"Show less":`Show all ${D.length}`,e.createElement(it,null)):null),e.createElement("div",{className:"syncify-backup-list",id:"syncify-backup-list",role:"radiogroup","aria-label":"Choose a backup to restore"},Hn.map(s=>kt(s)),De&&K?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),kt(K,{isSafetyCopy:!0})):null),De?ot===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to restore a backup."):Be?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",{className:"syncify-confirm-title"},"Restore"," ",m?ie(m.metadata.last_sync_datetime):"this backup","?"),E?e.createElement(xo,{preview:E,checks:$n,expanded:lt,onToggle:()=>se(!lt)}):null,e.createElement("div",{className:"syncify-actions"},Kn?e.createElement("div",{className:"syncify-alert syncify-actions-hint"},"Your current setup isn't backed up."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>P(!1),disabled:N},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:Gn,disabled:N},"Restore"))):e.createElement("div",{className:"syncify-actions"},gt?e.createElement("span",{className:"syncify-muted syncify-actions-hint"},"This backup is already current."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>Jn(),disabled:N||!m||gt},"Restore backup")):null):null,e.createElement("div",{className:"syncify-accordion"},e.createElement(Co,{id:"settings",title:"Settings",openSection:Un,onToggle:s=>{Ln(s),s!=="settings"&&U(!1)}},e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Back up automatically"),e.createElement("span",{className:"syncify-muted"},"When Spotify starts and something has changed")),e.createElement("input",{className:"syncify-switch",type:"checkbox",role:"switch",checked:r.autoBackupEnabled&&!O,onChange:s=>zn(s.currentTarget.checked),disabled:N||O})),e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Open Syncify from"),Oe?r.entryPoint==="menu"&&!r.shortcut?e.createElement("span",{className:"syncify-muted"},"Keep a shortcut in case a Spotify update breaks the menu"):null:e.createElement("span",{className:"syncify-muted"},"The profile menu isn't available in this Spicetify version")),e.createElement("select",{className:"syncify-select",value:Oe?r.entryPoint:"topbar",onChange:s=>Wn(s.currentTarget.value),disabled:!Oe},_o.map(s=>e.createElement("option",{key:s.value,value:s.value},s.label)))),e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Keyboard shortcut"),C&&!Ue?e.createElement("span",{className:"syncify-muted"},"Press a key combination, or Esc to cancel"):null),e.createElement("span",{className:"syncify-shortcut"},r.shortcut&&!C?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Re(null)},"Turn off"):null,!r.shortcut&&!C?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Re($)},"Use default"):null,e.createElement("button",{className:"syncify-key",type:"button","data-recording":C?"true":"false",onClick:()=>C?U(!1):Vn(),title:"Click to change"},C?"Press keys\u2026":r.shortcut?q(r.shortcut):"Off"))),Ue?e.createElement("div",{className:"syncify-alert",role:"alert"},Ue):null)),e.createElement("footer",{className:"syncify-footer"},e.createElement("span",{className:"syncify-footer-version"},e.createElement("span",null,"Syncify ",I.version),yt?e.createElement("button",{className:"syncify-text-button syncify-update",type:"button",onClick:()=>pt?window.location.reload():W(`${I.githubUrl}#updating`)},yt," is out \xB7 ",pt?"Reload":"How to update"):null),e.createElement("span",{className:"syncify-footer-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>W(I.issueUrl)},"Report an issue"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>W(I.githubUrl)},"GitHub"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>W(I.kofiUrl)},"Support on Ko-fi"))))}var Cn={added:{mark:"+",label:"Added"},removed:{mark:"\u2212",label:"Removed"},unchanged:{mark:"=",label:"Unchanged"}},ko=[["extension","Extensions"],["theme","Themes"],["snippet","Snippets"]],bo={extension:"extension",custom_app:"custom app",theme:"theme"};function xo(e){let t=Spicetify.React,{items:n,counts:i,manual:o}=e.preview;return t.createElement(t.Fragment,null,t.createElement("div",{className:"syncify-chips","aria-label":"What changes on this device"},i.added?t.createElement("span",{className:"syncify-chip","data-change":"added"},"+",i.added," added"):null,i.removed?t.createElement("span",{className:"syncify-chip","data-change":"removed"},"\u2212",i.removed," removed"):null,i.unchanged?t.createElement("span",{className:"syncify-chip"},i.unchanged," unchanged"):null,o.length?t.createElement("span",{className:"syncify-chip"},o.length," to add manually"):null),n.length||o.length?t.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":e.expanded,"aria-controls":"syncify-restore-changes",onClick:e.onToggle},e.expanded?"Hide changes":"Show changes",t.createElement(it,null)):null,e.expanded?t.createElement("div",{className:"syncify-changes",id:"syncify-restore-changes"},ko.map(([r,a])=>{let l=n.filter(c=>c.type===r);return l.length===0?null:t.createElement("section",{key:r,"aria-label":a},t.createElement("h5",{className:"syncify-change-group"},a),t.createElement("ul",{className:"syncify-change-list"},l.map(c=>t.createElement("li",{className:"syncify-change",key:c.key},t.createElement("span",{className:"syncify-mark","data-change":c.change,role:"img","aria-label":Cn[c.change].label},Cn[c.change].mark),t.createElement("span",{className:"syncify-change-name"},c.name,c.repo?t.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",c.repo):null),e.checks.has(c.key)?t.createElement(vo,{check:e.checks.get(c.key)}):null))))}),o.length?t.createElement("section",{"aria-label":"Add manually"},t.createElement("h5",{className:"syncify-change-group"},"Add manually"),t.createElement("ul",{className:"syncify-change-list"},o.map(r=>t.createElement("li",{className:"syncify-change",key:`${r.type}:${r.name}`},t.createElement("span",{className:"syncify-mark","aria-hidden":"true"}),t.createElement("span",{className:"syncify-change-name"},r.name,t.createElement("span",{className:"syncify-change-detail"}," ","\xB7 ",bo[r.type],r.scheme?`, ${r.scheme}`:"")))))):null):null)}var wo={host:"Loads from outside GitHub",repo:"Its code is in a different repo than the one it names",blocked:"On Marketplace's block list",catalog:"Not in Marketplace's catalog",unchecked:"GitHub couldn't be reached to check it",custom:"A snippet made in Marketplace, not from its list"};function vo(e){let t=Spicetify.React,{check:n}=e,i=Ee(n),o=n.kind==="host"?`Code from ${n.host}`:n.kind==="repo"?`Code from ${n.repo}`:n.kind==="blocked"?"Blocked by Marketplace":n.kind==="catalog"?"Not in Marketplace":n.kind==="unchecked"?"Not checked":"Custom";return t.createElement("span",{className:"syncify-source","data-warning":i?"true":"false",title:wo[n.kind]},i?t.createElement(Eo,null):null,o)}function Co(e){let t=Spicetify.React,n=e.openSection===e.id,i=`syncify-section-${e.id}`;return t.createElement("section",{className:"syncify-accordion-section","aria-label":e.title},t.createElement("button",{className:"syncify-accordion-header",type:"button","aria-expanded":n,"aria-controls":i,onClick:()=>e.onToggle(n?null:e.id)},t.createElement("span",{className:"syncify-accordion-title"},e.title),t.createElement(it,null)),n?t.createElement("div",{className:"syncify-accordion-body",id:i},e.children):null)}function Io(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-shield",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"}))}function Eo(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-warning-icon",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M12 3 2 21h20z"}),e.createElement("path",{d:"M12 10v5"}),e.createElement("path",{d:"M12 18h.01"}))}function it(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-chevron",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"m9 6 6 6-6 6"}))}function To(){let e=Spicetify.React;return e.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M18 6 6 18"}),e.createElement("path",{d:"m6 6 12 12"}))}var No=3,_o=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function Po(e,t,n,i){var re;let o=new Set(t),r=new Set(n),a=n.filter(A=>!o.has(A)).length,l=t.filter(A=>!r.has(A)).length,c=(re=e.spicetify_config)!=null?re:null,y=!!(i&&!c),f=!y&&(i&&c?!Wt(i,c):i!==c),h=[a?`${a} added`:null,l?`${l} removed`:null,f?"Spicetify config changed":null].filter(Boolean),k=ie(e.metadata.last_sync_datetime),oe=h.length?`${h.join(", ")} since ${k}`:`Last backup ${k}`;return y?`${oe} \xB7 Spicetify config not saved yet`:oe}function In(e){return e===1?"1 extension or theme":`${e} extensions and themes`}function ie(e){let t=new Date(e);if(Number.isNaN(t.getTime()))return e;let n=t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),i=new Date,o=new Date(i);return o.setDate(i.getDate()-1),t.toDateString()===i.toDateString()?`today, ${n}`:t.toDateString()===o.toDateString()?`yesterday, ${n}`:`${t.toLocaleDateString(void 0,{month:"short",day:"numeric",year:t.getFullYear()===i.getFullYear()?void 0:"numeric"})}, ${n}`}var Te="[Syncify]";function v(e,t){if(t===void 0){console.debug(Te,e);return}console.debug(Te,e,t)}function _e(e,t){if(t===void 0){console.warn(Te,e);return}console.warn(Te,e,t)}function Mo(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var Nn="syncify-styles";function Ao(){if(document.getElementById(Nn)){v("Another copy of Syncify is running; stopping this one");return}Bo();let e=H();Ht({topbarButton:Uo(),menuItem:Fo()}),pe(e.entryPoint),We(e.shortcut,Pe),fn().catch(t=>{_e("Startup sync check failed",t)})}function Bo(){let e=document.createElement("style");e.id=Nn,e.textContent=It,document.head.appendChild(e)}function Uo(){let{extensionName:e}=S(),t=new Spicetify.Topbar.Button(e,$e,n=>{v("Topbar button clicked",Ne(n)),Pe()},!1,!0);return _n(t),Do(t),Ho(t),v("Topbar button registered",Ne(t)),t}function _n(e){var n;let t=e;e.element.style.setProperty("-webkit-app-region","no-drag"),(n=t.button)==null||n.style.setProperty("-webkit-app-region","no-drag")}var Tn=".main-actionButtons",Lo=".Root__globalNav, .Root__top-bar",Oo=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function Do(e){if(typeof MutationObserver=="undefined")return;let t=!1,n=null,i=()=>{t=!1,r();let a=e.element,l=document.querySelector(Tn);!a||!l||l.contains(a)||(l.prepend(a),Ro(e),_n(e),v("Topbar button re-attached",Ne(e)))},o=new MutationObserver(()=>{t||(t=!0,setTimeout(i,250))}),r=()=>{var c;if(n!=null&&n.isConnected)return;let a=document.querySelector(Tn),l=(c=a==null?void 0:a.closest(Lo))!=null?c:a==null?void 0:a.parentElement;if(o.disconnect(),n=l!=null?l:null,!l){o.observe(document.body,{childList:!0,subtree:!0});return}o.observe(l,{childList:!0,subtree:!0});for(let y=l.parentElement;y;y=y.parentElement)o.observe(y,{childList:!0})};i()}function Ro(e){let t=jo(e);if(!t||t.className&&t.className!=="undefined")return;let n=Array.from(document.querySelectorAll(Oo)).find(i=>!e.element.contains(i));n!=null&&n.className&&(t.className=n.className)}function jo(e){return e.button}function Fo(){var e;if(typeof((e=Spicetify.Menu)==null?void 0:e.Item)!="function")return null;try{return new Spicetify.Menu.Item(S().extensionName,!1,()=>Pe(),$o())}catch(t){return _e("Failed to create profile menu item",t),null}}function $o(){return $e.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function Ho(e){Object.assign(window,{SyncifyDebug:{button:e,element:e.element,openModal:Pe,inspect:()=>Ne(e),clickElement:()=>{var t;return(t=e.element)==null?void 0:t.click()},clickInnerButton:()=>{var t;return(t=e.button)==null?void 0:t.click()},clickCallback:()=>e.onClick(e)}})}function Ne(e){var t,n,i,o,r;return{label:e.label,disabled:e.disabled,isRight:e.isRight,hasElement:!!e.element,elementConnected:(t=e.element)==null?void 0:t.isConnected,elementDisabled:(n=e.element)==null?void 0:n.disabled,elementAriaDisabled:(i=e.element)==null?void 0:i.getAttribute("aria-disabled"),elementClass:(o=e.element)==null?void 0:o.className,appRegion:e.element?getComputedStyle(e.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:e.button?getComputedStyle(e.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:e.element?getComputedStyle(e.element).pointerEvents:null,visibility:e.element?getComputedStyle(e.element).visibility:null,display:e.element?getComputedStyle(e.element).display:null,rect:(r=e.element)==null?void 0:r.getBoundingClientRect().toJSON()}}var b=null;function Pe(){var t;if(b!=null&&b.container.isConnected){v("Closing modal"),Spicetify.PopupModal.hide();return}v("Opening modal"),(t=b==null?void 0:b.root)==null||t.unmount();let e=document.createElement("div");b={container:e,root:null};try{Spicetify.PopupModal.display({title:S().extensionName,content:e,isLarge:!1})}catch(n){throw _e("Failed to open PopupModal",n),n}Ko(e),zo(e)}function Ko(e){requestAnimationFrame(()=>{let t=Yo(e);t==null||t.classList.add("syncify-modal-shell");let n=t==null?void 0:t.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');n&&(n.classList.add("syncify-modal-close"),n.setAttribute("aria-label",`Close ${S().extensionName}`),n.title="Close",n.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function Yo(e){let t=e.parentElement;for(;t&&t!==document.body;){if(t.querySelector(".main-trackCreditsModal-header"))return t;t=t.parentElement}return e.closest('[class*="trackCreditsModal"]')}function zo(e){try{let t=Spicetify.React.createElement(En);if(typeof Spicetify.ReactDOM.createRoot=="function"){let n=Spicetify.ReactDOM.createRoot(e);n.render(t),(b==null?void 0:b.container)===e&&(b.root=n),v("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(t,e),v("Modal rendered",{renderer:"render"})}catch(t){throw _e("Failed to render modal",t),t}}(function e(){if(!Mo()){setTimeout(e,100);return}v("Spicetify APIs ready"),Ao()})();})();
