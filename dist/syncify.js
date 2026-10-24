// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var sn=Object.defineProperty,cn=Object.defineProperties;var ln=Object.getOwnPropertyDescriptors;var Je=Object.getOwnPropertySymbols;var yn=Object.prototype.hasOwnProperty,un=Object.prototype.propertyIsEnumerable;var Xe=(e,t,n)=>t in e?sn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,d=(e,t)=>{for(var n in t||(t={}))yn.call(t,n)&&Xe(e,n,t[n]);if(Je)for(var n of Je(t))un.call(t,n)&&Xe(e,n,t[n]);return e},m=(e,t)=>cn(e,ln(t));var Ze=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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

.syncify-muted[data-kind="warning"] {
    color: var(--syncify-warning);
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
    fill: none;
    stroke: var(--syncify-muted);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
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
`;var ke=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var v={extensionName:"Syncify",version:"1.2.1",workerUrl:"https://syncify-worker.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com"};function h(){var t,n,o,i,a,l,s;let e=window.SyncifyConfig;return{extensionName:(t=T(e==null?void 0:e.extensionName))!=null?t:v.extensionName,version:(n=Qe(e==null?void 0:e.version))!=null?n:v.version,workerUrl:(o=T(e==null?void 0:e.workerUrl))!=null?o:v.workerUrl,githubUrl:(i=T(e==null?void 0:e.githubUrl))!=null?i:v.githubUrl,kofiUrl:(a=T(e==null?void 0:e.kofiUrl))!=null?a:v.kofiUrl,issueUrl:(l=T(e==null?void 0:e.issueUrl))!=null?l:v.issueUrl,releasesUrl:(s=T(e==null?void 0:e.releasesUrl))!=null?s:v.releasesUrl}}function T(e){return Qe(e)}function Qe(e){return typeof e=="string"&&e.trim()?e.trim():null}var pn="x-syncify-version",mn="x-syncify-install",hn="x-syncify-timezone",gn="syncify",xe="state",et="install-id",tt="syncify:install-id",bn=2e3,q=null;async function nt(){let e={[pn]:h().version,[mn]:await Sn()},t=wn();return t&&(e[hn]=t),e}function Sn(){return q!=null||(q=kn().catch(()=>G())),q}async function kn(){let e=await Promise.race([xn(),new Promise(t=>setTimeout(()=>t(null),bn))]);if(e)return e;try{let t=window.localStorage.getItem(tt);if(t&&ot(t))return t;let n=G();return window.localStorage.setItem(tt,n),n}catch(t){return G()}}function xn(){let e;try{e=window.indexedDB}catch(t){return Promise.resolve(null)}return e?new Promise(t=>{let n;try{n=e.open(gn,1)}catch(o){t(null);return}n.onupgradeneeded=()=>{n.result.createObjectStore(xe)},n.onerror=()=>t(null),n.onblocked=()=>t(null),n.onsuccess=()=>{let o=n.result,i=null;try{let a=o.transaction(xe,"readwrite"),l=a.objectStore(xe),s=l.get(et);s.onsuccess=()=>{if(typeof s.result=="string"&&ot(s.result)){i=s.result;return}i=G(),l.put(i,et)},a.oncomplete=()=>{o.close(),t(i)},a.onerror=a.onabort=()=>{o.close(),t(null)}}catch(a){o.close(),t(null)}}}):Promise.resolve(null)}function G(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t=[...e].map(n=>n.toString(16).padStart(2,"0"));return[t.slice(0,4).join(""),t.slice(4,6).join(""),t.slice(6,8).join(""),t.slice(8,10).join(""),t.slice(10).join("")].join("-")}function ot(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(e)}function wn(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(e){return null}}var vn="x-syncify-user-hash",it=3,j=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}};async function rt(e,t,n){let o=await st(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(n)});if(!o.ok)throw new Error(`Backup failed with HTTP ${o.status}.`);let i=await o.json().catch(()=>null);return{unchanged:(i==null?void 0:i.unchanged)===!0}}async function at(e,t){var a,l;let n=await st(e,t,{method:"GET"});if(n.status===404)return{exists:!1,payload:null,backups:[],safetyCopy:null};if(!n.ok)throw new Error(`Restore failed with HTTP ${n.status}.`);let o=await n.json(),i=[o,...(a=o.backup_history)!=null?a:[]];return{exists:!0,payload:o,backups:i.slice(0,it),safetyCopy:(l=i[it])!=null?l:null}}async function st(e,t,n){let o=await fetch(e,m(d({},n),{headers:m(d(d({},n.headers),await nt()),{[vn]:t})}));if(o.status===426)throw new j;return o}var _={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},En=/^([a-z0-9]|f([1-9]|1[0-2]))$/,Cn=250,Nn=40,we=null,J=null,I=null;function ct(){return/mac/i.test(navigator.platform||navigator.userAgent)}function lt(e){if(e===null)return null;if(!e||typeof e!="object")return _;let t=e;return typeof t.key!="string"||!En.test(t.key)?_:{key:t.key,ctrl:!!t.ctrl,alt:!!t.alt,shift:!!t.shift,meta:!!t.meta}}function R(e){if(!e)return"Off";let t=e.key.toUpperCase();return ct()?[e.ctrl?"\u2318":"",e.alt?"\u2325":"",e.shift?"\u21E7":"",t].join(""):[e.ctrl&&"Ctrl",e.meta&&"Win",e.alt&&"Alt",e.shift&&"Shift",t].filter(Boolean).join("+")}function yt(e){if(e.key==="Escape")return{kind:"cancel"};let t=Pn(e.code);if(!t)return{kind:"ignore"};let n=ct();if(n&&e.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let o={key:t,ctrl:n?e.metaKey:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:n?!1:e.metaKey},i=t.startsWith("f")&&t.length>1;return!o.ctrl&&!o.alt&&!o.meta&&!i?{kind:"error",message:`Include ${n?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:o}}function Pn(e){var n,o;let t=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(e);return t?((o=(n=t[1])!=null?n:t[2])!=null?o:t[3]).toLowerCase():null}function ut(e){var t;if(I&&Tn(I,e))return!1;try{let n=Spicetify.Mousetrap,o=(t=n.trigger)==null?void 0:t.call(n)._directMap;if(!o)return!1;let i=ve(e);return Object.keys(o).some(a=>a.startsWith(`${i}:`))}catch(n){return!1}}function Ee(e,t,n=0){if(we=t,J=e,!ft()){if(n>=Nn){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>Ee(J,t,n+1),Cn);return}Ce(J)}function Ce(e){if(J=e,!ft()||!we)return;let t=we;try{if(I&&Spicetify.Keyboard._deregisterShortcut(I),I=null,!e)return;Spicetify.Keyboard.registerShortcut(e,n=>{n.preventDefault(),t()}),I=e,console.debug("[Syncify]","Keyboard shortcut registered",R(e))}catch(n){console.warn("[Syncify]","Failed to register keyboard shortcut",n)}}function ft(){var e;return typeof((e=Spicetify.Keyboard)==null?void 0:e.registerShortcut)=="function"}function ve(e){return[e.ctrl&&"mod",e.meta&&"meta",e.alt&&"alt",e.shift&&"shift",e.key].filter(Boolean).join("+")}function Tn(e,t){return ve(e)===ve(t)}var Ne="both",In=["both","topbar","menu"],F=null,K=null,X=!1;function dt(e){return In.includes(e)?e:Ne}function pt(){var e;return typeof((e=Spicetify.Menu)==null?void 0:e.Item)=="function"}function mt(e){F=e.topbarButton,K=e.menuItem}function Z(e){let t=e!=="menu"||!K,n=e!=="topbar";if(F!=null&&F.element&&(F.element.style.display=t?"":"none"),!!K)try{n&&!X?(K.register(),X=!0):!n&&X&&(K.deregister(),X=!1)}catch(o){console.warn("[Syncify]","Failed to update profile menu item",o)}}var ee="syncify:config",Q={workerUrl:h().workerUrl,autoBackupEnabled:!1,shortcut:_,entryPoint:Ne};function M(){var n,o;let e=h(),t=(o=(n=Spicetify.LocalStorage)==null?void 0:n.get(ee))!=null?o:window.localStorage.getItem(ee);if(!t)return m(d({},Q),{workerUrl:e.workerUrl});try{let i=JSON.parse(t);return{workerUrl:e.workerUrl,autoBackupEnabled:i.autoBackupEnabled===void 0?Q.autoBackupEnabled:!!i.autoBackupEnabled,shortcut:i.shortcut===void 0?Q.shortcut:lt(i.shortcut),entryPoint:dt(i.entryPoint)}}catch(i){return m(d({},Q),{workerUrl:e.workerUrl})}}function te(e){var n;let t=JSON.stringify({workerUrl:h().workerUrl,autoBackupEnabled:e.autoBackupEnabled,shortcut:e.shortcut,entryPoint:e.entryPoint});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set(ee,t);return}window.localStorage.setItem(ee,t)}function Pe(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}async function ne(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return[...new Uint8Array(n)].map(o=>o.toString(16).padStart(2,"0")).join("")}function ht(e){return JSON.stringify(Te(e))}function Te(e){return Array.isArray(e)?e.map(Te):e&&typeof e=="object"?Object.keys(e).sort().reduce((t,n)=>(t[n]=Te(e[n]),t),{}):e}async function Ie(){let e=await _n();return ne(e)}async function _n(){var o,i,a,l,s;let e=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let t=await e.getUser(),n=(s=(l=(a=(i=t==null?void 0:t.username)!=null?i:t==null?void 0:t.canonicalUsername)!=null?a:t==null?void 0:t.id)!=null?l:t==null?void 0:t.uri)!=null?s:t==null?void 0:t.displayName;if(!n)throw new Error("Unable to resolve the active Spotify user.");return n}function gt(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var oe="spicetify-marketplace";var H="settings";async function bt(){let e=await xt();if(e.kind!=="ok")return null;try{let t=await wt(e.db,"readonly",o=>o.getAll());if(!t)return null;let n={};for(let o of t)typeof(o==null?void 0:o.key)=="string"&&typeof o.value=="string"&&(n[o.key]=o.value);return n}finally{e.db.close()}}async function St(e){let t=await xt();if(t.kind==="unavailable")return"unavailable";let n=t.kind==="ok"?t.db:await Mn();if(!n)return"failed";try{return await wt(n,"readwrite",i=>{let a;for(let[l,s]of Object.entries(e))a=i.put({key:l,value:s});return a})===null?"failed":"written"}finally{n.close()}}function kt(){var e;try{return(e=window.indexedDB)!=null?e:null}catch(t){return null}}async function xt(){let e=kt();return e?await Bn(e)?{kind:"missing"}:new Promise(t=>{let n=!1,o=e.open(oe);o.onupgradeneeded=()=>{n=!0},o.onerror=()=>{console.warn("Syncify could not open Marketplace storage",o.error),t({kind:"unavailable"})},o.onblocked=()=>t({kind:"unavailable"}),o.onsuccess=()=>{let i=o.result;if(n){i.close(),An(e).then(()=>t({kind:"missing"}));return}if(!i.objectStoreNames.contains(H)){i.close(),t({kind:"unavailable"});return}t({kind:"ok",db:i})}}):{kind:"unavailable"}}function Mn(){let e=kt();return e?new Promise(t=>{let n=e.open(oe,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains(H)||o.createObjectStore(H,{keyPath:"key"})},n.onerror=()=>{console.warn("Syncify could not create Marketplace storage",n.error),t(null)},n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}async function Bn(e){if(typeof e.databases!="function")return!1;try{return!(await e.databases()).some(n=>n.name===oe)}catch(t){return!1}}function An(e){return new Promise(t=>{let n=e.deleteDatabase(oe);n.onsuccess=()=>t(),n.onerror=()=>t(),n.onblocked=()=>t()})}function wt(e,t,n){return new Promise(o=>{let i;try{i=e.transaction(H,t)}catch(u){console.warn("Syncify could not open a Marketplace transaction",u),o(null);return}let a,l=!1,s=u=>{l||(l=!0,o(u))};i.oncomplete=()=>s(a),i.onerror=()=>{console.warn("Syncify Marketplace transaction failed",i.error),s(null)},i.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",i.error),s(null)};let y;try{y=n(i.objectStore(H))}catch(u){console.warn("Syncify Marketplace request could not be issued",u),s(null);return}y&&(y.onsuccess=()=>{a=y.result},y.onerror=()=>{console.warn("Syncify Marketplace request failed",y.error),s(null)})})}var _e="marketplace:",vt=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function Et(){let e=Kn(),t=await bt();if(t)for(let[n,o]of Object.entries(t))n.startsWith(_e)&&(e[n]=o);return e}var On=new Set(["marketplace:active-tab","marketplace:sort"]),Dn="marketplace:installed:",Ln=["stars","tags","lastUpdated","created"];async function ie(e){let t={};for(let[n,o]of Object.entries(e))On.has(n)||(t[n]=n.startsWith(Dn)?jn(o):o);return ne(ht(t))}function jn(e){try{let t=JSON.parse(e);if(!t||typeof t!="object"||Array.isArray(t))return e;for(let n of Ln)delete t[n];return t}catch(t){return e}}async function re(){let e=await Et();return{keyCount:Object.keys(e).length,hash:await ie(e),installedItemCount:Rn(e),installedItems:$(e),marketplaceAvailable:Fn(e)}}async function Ct(){let e=await Et();return{schema_version:1,metadata:{last_sync_datetime:new Date().toISOString(),device_info:gt(),marketplace_key_count:Object.keys(e).length},payload_hash:await ie(e),marketplace_data:{keys:e}}}async function Nt(e){var a,l;let t={},n=(l=(a=e.marketplace_data)==null?void 0:a.keys)!=null?l:{};for(let[s,y]of Object.entries(n))s.startsWith(_e)&&(t[s]=y);let o=Object.keys(t);if(o.length===0)return 0;for(let s of o)window.localStorage.setItem(s,t[s]);if(await St(t)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try the restore again.");return o.length}function Rn(e){return $(e).length}function $(e){return vt.flatMap(t=>Hn(e[t]).map(String))}function Fn(e){return!!(window.Marketplace||vt.some(n=>e[n]!==void 0)||e["marketplace:tabs"]!==void 0)}function Pt(e,t){return t===0?!1:e===0?!0:e<Math.max(2,Math.floor(t*.5))}function Kn(){let e={};for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);if(!(n!=null&&n.startsWith(_e)))continue;let o=window.localStorage.getItem(n);o!==null&&(e[n]=o)}return e}function Hn(e){if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch(t){return[]}}async function ae(e){if(!Pe(e))throw new Error("Syncify backup service is not configured.");let[t,n]=await Promise.all([Ie(),Ct()]);if(n.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:o}=await rt(e.workerUrl,t,n);return{payload:n,unchanged:o}}async function Y(e){var a;if(!Pe(e))throw new Error("Syncify backup service is not configured.");let t=await at(e.workerUrl,await Ie()),[n,o]=await Promise.all([Promise.all(t.backups.map(Tt)),t.safetyCopy?Tt(t.safetyCopy):null]),i=n.filter((l,s)=>n.findIndex(y=>y.payload_hash===l.payload_hash)===s);return m(d({},t),{payload:(a=i[0])!=null?a:null,backups:i,safetyCopy:o&&!i.some(l=>l.payload_hash===o.payload_hash)?o:null})}var Me=new Map;async function Tt(e){var o,i,a;let t=`${e.payload_hash} ${(o=e.metadata)==null?void 0:o.last_sync_datetime}`,n=Me.get(t);return n||(n=ie((a=(i=e.marketplace_data)==null?void 0:i.keys)!=null?a:{}),Me.set(t,n),n.catch(()=>Me.delete(t))),m(d({},e),{payload_hash:await n})}async function It(e,t){let n=t!=null?t:(await Y(e)).payload;if(!n)throw new Error("No Syncify cloud backup was found for this Spotify account.");let o=await Nt(n);return{payload:n,restoredCount:o}}async function _t(){var t,n,o;let e=M();if(!(!e.workerUrl||!e.autoBackupEnabled))try{let[i,a]=await Promise.all([re(),Y(e)]),l=(n=(t=a.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?n:0;if(a.exists&&Pt(i.keyCount,l)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((o=a.payload)==null?void 0:o.payload_hash)===i.hash||i.keyCount===0)return;await ae(e),Spicetify.showNotification("Syncify auto-backup complete")}catch(i){let a=i instanceof Error?i.message:String(i);console.warn("Syncify startup sync failed:",i),Spicetify.showNotification(`Syncify auto-sync skipped: ${a}`,!0,8e3)}}var Mt=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function Be(e){return typeof e=="string"&&Mt.test(e)}function Bt(e,t){let[n,o]=[e,t].map(i=>{var u;let[,a,l,s,y]=(u=Mt.exec(i))!=null?u:[];return[a,l,s,y!=null?y:1/0].map(Number)});for(let i=0;i<n.length;i+=1)if(n[i]!==o[i])return n[i]<o[i]?-1:1;return 0}async function At(e,t=3e3){let n=typeof AbortController=="function"?new AbortController:null,o=setTimeout(()=>n==null?void 0:n.abort(),t);try{let i=await fetch(e,{signal:n==null?void 0:n.signal});if(!i.ok)return null;let a=await i.json();return Be(a==null?void 0:a.version)?a.version:null}catch(i){return null}finally{clearTimeout(o)}}function Ut(){let e=Spicetify.React,t=e.useEffect,n=e.useMemo,o=e.useState,[i,a]=o(()=>M()),[l,s]=o("idle"),[y,u]=o(null),[fe,jt]=o(0),[Rt,Ft]=o([]),[Ae,Kt]=o(null),[g,Ht]=o(null),[b,Ue]=o(null),[C,Oe]=o([]),[A,De]=o(null),[p,U]=o(null),[Le,de]=o(!1),[$t,x]=o(!1),[S,O]=o(!1),[je,D]=o(null),[Yt,zt]=o(null),[z,Vt]=o(!1),[N,Wt]=o(!1),[Re,qt]=o(null),w=n(()=>h(),[]),P=n(()=>A?[...C,A]:C,[C,A]),Gt=n(()=>new Map(P.map(r=>[r,$(r.marketplace_data.keys)])),[P]),Fe=r=>{var c;return(c=Gt.get(r))!=null?c:$(r.marketplace_data.keys)},Ke=r=>Fe(r).length,pe=n(()=>pt(),[]),k=l==="loading",V=(y==null?void 0:y.kind)==="warning"||(y==null?void 0:y.kind)==="error"?y:null,He=!!(b&&g&&b.payload_hash!==g),L=!!(b&&g&&b.payload_hash===g),$e=!!(p&&g&&p.payload_hash===g),me=z||!L||P.length<2,Jt=me?C:C.slice(0,1),Xt=!!(g&&fe>0&&!P.some(r=>r.payload_hash===g));t(()=>{ze({silent:!0}),Zt()},[]),t(()=>{if(!S)return;let r=c=>{c.preventDefault(),c.stopImmediatePropagation();let f=yt(c);if(f.kind!=="ignore"){if(f.kind==="cancel"){O(!1),D(null);return}if(f.kind==="error"){D(f.message);return}if(ut(f.shortcut)){D(`${R(f.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}O(!1),he(f.shortcut)}};return window.addEventListener("keydown",r,!0),()=>window.removeEventListener("keydown",r,!0)},[S,i]);async function Ye(){let r=await re();return Ht(r.hash),jt(r.installedItemCount),Ft(r.installedItems),Kt(r.marketplaceAvailable),r}async function ze(r){try{x(!1),s("loading"),r!=null&&r.silent||u({kind:"info",text:"Checking your Syncify backup\u2026"}),await Ye();let c=await Y(i);Ue(c.payload),Oe(c.backups),De(c.safetyCopy),U(c.payload),de(!0),s(c.exists?"success":"idle"),r!=null&&r.silent||u(c.exists&&c.payload?{kind:"success",text:`Backup found from ${B(c.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(c){ge(c)}}async function Zt(){let r=w.version;if(!Be(r))return;let c=await At(`${w.releasesUrl}/latest.json`);c&&Bt(c,r)>0&&qt(c)}function Qt(r){let c=m(d({},i),{autoBackupEnabled:r});a(c),te(c),u({kind:"success",text:r?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}function he(r){let c=m(d({},i),{shortcut:r});a(c),te(c),Ce(r),D(null),u({kind:"success",text:r?`${R(r)} now opens Syncify.`:"Keyboard shortcut turned off."})}function en(r){let c=m(d({},i),{entryPoint:r});a(c),te(c),Z(r)}function tn(){D(null),O(!0)}async function nn(){try{x(!1),s("loading"),u({kind:"info",text:"Backing up your extensions and themes\u2026"});let{payload:r,unchanged:c}=await ae(i);if(await Ye(),c){de(!0),s("success"),u({kind:"success",text:"Everything is already backed up."}),Spicetify.showNotification("Syncify: everything is already backed up");return}Ue(r),Oe(f=>[r,...f.filter(Se=>Se.payload_hash!==r.payload_hash)].slice(0,Vn)),De(f=>(f==null?void 0:f.payload_hash)===r.payload_hash?null:f),U(r),de(!0),s("success"),u({kind:"success",text:`Backed up ${r.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(r){ge(r)}}function on(r=p){if(Ae===!1){let c="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";u({kind:"error",text:c}),Spicetify.showNotification(c,!0,6e3);return}if(!r){let c="No Syncify cloud backup was found for this Spotify account.";u({kind:"error",text:c}),Spicetify.showNotification(c,!0,6e3);return}U(r),x(!0)}async function rn(){try{x(!1),s("loading"),u({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:r,restoredCount:c}=await It(i,p!=null?p:void 0);U(r),s("success"),u({kind:"success",text:`Restored ${c} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),setTimeout(()=>window.location.reload(),1e3)}catch(r){ge(r)}}function W(r){if(r.startsWith("mailto:")){window.location.href=r;return}window.open(r,"_blank","noopener,noreferrer")}function ge(r){if(s("error"),r instanceof j){Wt(!0),u(null);return}let c=r instanceof Error?r.message:String(r);u({kind:"error",text:c}),Spicetify.showNotification(c,!0,6e3)}function Ve(r,c){let f=(p==null?void 0:p.payload_hash)===r.payload_hash,Se=r.payload_hash===g,qe=B(r.metadata.last_sync_datetime),Ge=se(Ke(r));return e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":f,"data-selected":f?"true":"false",type:"button",key:`${r.payload_hash}-${r.metadata.last_sync_datetime}`,title:c!=null&&c.isSafetyCopy?"Kept aside and updated about once a week, so a burst of new backups can't replace it":void 0,onClick:()=>{U(r),x(!1)},disabled:k},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),c!=null&&c.isSafetyCopy?e.createElement(e.Fragment,null,e.createElement(Yn,null),e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Safety copy"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 updated weekly")),e.createElement("span",{className:"syncify-muted"},qe," \xB7 ",Ge))):e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-backup-date"},qe),e.createElement("span",{className:"syncify-muted"},Ge," \xB7 from ",r.metadata.device_info)),Se?e.createElement("span",{className:"syncify-tag",title:"What's on this device now"},"Current"):null)}function be(r){r.stopPropagation()}let an=N?"Update Syncify to keep backing up":Le?b?He?"Changes since your last backup":"Everything is backed up":"No backup yet":l==="error"?"Couldn't check your backup":"Checking your backup\u2026",We=N?"Your backups are safe":Le?b?He?qn(Fe(b),Rt,b.metadata.last_sync_datetime):`Last backup ${B(b.metadata.last_sync_datetime)}`:"Save your extensions and themes so you can restore them after a reinstall or on another computer.":null;return e.createElement("div",{className:"syncify-panel",onClick:be,onMouseDown:be,onPointerDown:be},N?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,"This version of Syncify is no longer supported."),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>W(`${w.githubUrl}#updating`)},"How to update")):null,V?e.createElement("div",{className:"syncify-alert","data-kind":V.kind},e.createElement("span",null,V.text),e.createElement("span",{className:"syncify-alert-actions"},V.kind==="error"?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{ze()},disabled:k},"Try again"):null,e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>u(null)},e.createElement(zn,null)))):null,e.createElement("section",{className:"syncify-status","aria-live":"polite"},e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},an),e.createElement("p",{className:"syncify-muted"},We?`${We} \xB7 `:"",se(fe)," on this device")),e.createElement("button",{className:"syncify-button",type:"button",onClick:nn,disabled:k||L||N,title:L?"No changes since your last backup":void 0},k?"Working\u2026":L?"Backed up":"Back up now")),C.length>0?e.createElement("section",{className:"syncify-section","aria-label":"Backups"},e.createElement("div",{className:"syncify-section-header"},e.createElement("h4",{className:"syncify-section-title"},"Backups"),L&&P.length>1?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":z,"aria-controls":"syncify-backup-list",onClick:()=>{Vt(!z),x(!1)}},z?"Show less":`Show all ${P.length}`,e.createElement(Ot,null)):null),e.createElement("div",{className:"syncify-backup-list",id:"syncify-backup-list",role:"radiogroup","aria-label":"Choose a backup to restore"},Jt.map(r=>Ve(r)),me&&A?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),Ve(A,{isSafetyCopy:!0})):null),me?Ae===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to restore a backup."):$t?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",null,"Replace this device's"," ",se(fe)," with the"," ",p?`${se(Ke(p))} from ${B(p.metadata.last_sync_datetime)}`:"selected backup","? Spotify will reload."),Xt?e.createElement("p",{className:"syncify-muted","data-kind":"warning"},"Your current setup isn't backed up."):null,e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>x(!1),disabled:k},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:rn,disabled:k},"Restore"))):e.createElement("div",{className:"syncify-actions"},$e?e.createElement("span",{className:"syncify-muted syncify-actions-hint"},"This backup is already current."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>on(),disabled:k||!p||$e},"Restore backup")):null):null,e.createElement("div",{className:"syncify-accordion"},e.createElement($n,{id:"settings",title:"Settings",openSection:Yt,onToggle:r=>{zt(r),r!=="settings"&&O(!1)}},e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Back up automatically"),e.createElement("span",{className:"syncify-muted"},"When Spotify starts and something has changed")),e.createElement("input",{className:"syncify-switch",type:"checkbox",role:"switch",checked:i.autoBackupEnabled&&!N,onChange:r=>Qt(r.currentTarget.checked),disabled:k||N})),e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Open Syncify from"),pe?i.entryPoint==="menu"&&!i.shortcut?e.createElement("span",{className:"syncify-muted"},"Keep a shortcut in case a Spotify update breaks the menu"):null:e.createElement("span",{className:"syncify-muted"},"The profile menu isn't available in this Spicetify version")),e.createElement("select",{className:"syncify-select",value:pe?i.entryPoint:"topbar",onChange:r=>en(r.currentTarget.value),disabled:!pe},Wn.map(r=>e.createElement("option",{key:r.value,value:r.value},r.label)))),e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Keyboard shortcut"),je?e.createElement("span",{className:"syncify-muted","data-kind":"warning"},je):S?e.createElement("span",{className:"syncify-muted"},"Press a key combination, or Esc to cancel"):null),e.createElement("span",{className:"syncify-shortcut"},i.shortcut&&!S?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>he(null)},"Turn off"):null,!i.shortcut&&!S?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>he(_)},"Use default"):null,e.createElement("button",{className:"syncify-key",type:"button","data-recording":S?"true":"false",onClick:()=>S?O(!1):tn(),title:"Click to change"},S?"Press keys\u2026":i.shortcut?R(i.shortcut):"Off"))))),e.createElement("footer",{className:"syncify-footer"},e.createElement("span",{className:"syncify-footer-version"},e.createElement("span",null,"Syncify ",w.version),Re?e.createElement("button",{className:"syncify-text-button syncify-update",type:"button",onClick:()=>window.location.reload()},Re," is out \xB7 Reload"):null),e.createElement("span",{className:"syncify-footer-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>W(w.issueUrl)},"Report an issue"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>W(w.githubUrl)},"GitHub"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>W(w.kofiUrl)},"Support on Ko-fi"))))}function $n(e){let t=Spicetify.React,n=e.openSection===e.id,o=`syncify-section-${e.id}`;return t.createElement("section",{className:"syncify-accordion-section","aria-label":e.title},t.createElement("button",{className:"syncify-accordion-header",type:"button","aria-expanded":n,"aria-controls":o,onClick:()=>e.onToggle(n?null:e.id)},t.createElement("span",{className:"syncify-accordion-title"},e.title),t.createElement(Ot,null)),n?t.createElement("div",{className:"syncify-accordion-body",id:o},e.children):null)}function Yn(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-shield",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"}))}function Ot(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-chevron",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"m9 6 6 6-6 6"}))}function zn(){let e=Spicetify.React;return e.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M18 6 6 18"}),e.createElement("path",{d:"m6 6 12 12"}))}var Vn=3,Wn=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function qn(e,t,n){let o=new Set(e),i=new Set(t),a=t.filter(y=>!o.has(y)).length,l=e.filter(y=>!i.has(y)).length,s=[a?`${a} added`:null,l?`${l} removed`:null].filter(Boolean);return s.length?`${s.join(", ")} since ${B(n)}`:`Last backup ${B(n)}`}function se(e){return e===1?"1 extension or theme":`${e} extensions and themes`}function B(e){let t=new Date(e);if(Number.isNaN(t.getTime()))return e;let n=t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),o=new Date,i=new Date(o);return i.setDate(o.getDate()-1),t.toDateString()===o.toDateString()?`today, ${n}`:t.toDateString()===i.toDateString()?`yesterday, ${n}`:`${t.toLocaleDateString(void 0,{month:"short",day:"numeric",year:t.getFullYear()===o.getFullYear()?void 0:"numeric"})}, ${n}`}var ce="[Syncify]";function E(e,t){if(t===void 0){console.debug(ce,e);return}console.debug(ce,e,t)}function ye(e,t){if(t===void 0){console.warn(ce,e);return}console.warn(ce,e,t)}function Gn(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}function Jn(){Xn();let e=M();mt({topbarButton:Zn(),menuItem:io()}),Z(e.entryPoint),Ee(e.shortcut,ue),_t().catch(t=>{ye("Startup sync check failed",t)})}function Xn(){let e="syncify-styles";if(document.getElementById(e))return;let t=document.createElement("style");t.id=e,t.textContent=Ze,document.head.appendChild(t)}function Zn(){let{extensionName:e}=h(),t=new Spicetify.Topbar.Button(e,ke,n=>{E("Topbar button clicked",le(n)),ue()},!1,!0);return Lt(t),to(t),ao(t),E("Topbar button registered",le(t)),t}function Lt(e){var n;let t=e;e.element.style.setProperty("-webkit-app-region","no-drag"),(n=t.button)==null||n.style.setProperty("-webkit-app-region","no-drag")}var Dt=".main-actionButtons",Qn=".Root__globalNav, .Root__top-bar",eo=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function to(e){if(typeof MutationObserver=="undefined")return;let t=!1,n=null,o=()=>{t=!1,a();let l=e.element,s=document.querySelector(Dt);!l||!s||s.contains(l)||(s.prepend(l),no(e),Lt(e),E("Topbar button re-attached",le(e)))},i=new MutationObserver(()=>{t||(t=!0,setTimeout(o,250))}),a=()=>{var y;if(n!=null&&n.isConnected)return;let l=document.querySelector(Dt),s=(y=l==null?void 0:l.closest(Qn))!=null?y:l==null?void 0:l.parentElement;if(i.disconnect(),n=s!=null?s:null,!s){i.observe(document.body,{childList:!0,subtree:!0});return}i.observe(s,{childList:!0,subtree:!0});for(let u=s.parentElement;u;u=u.parentElement)i.observe(u,{childList:!0})};o()}function no(e){let t=oo(e);if(!t||t.className&&t.className!=="undefined")return;let n=Array.from(document.querySelectorAll(eo)).find(o=>!e.element.contains(o));n!=null&&n.className&&(t.className=n.className)}function oo(e){return e.button}function io(){var e;if(typeof((e=Spicetify.Menu)==null?void 0:e.Item)!="function")return null;try{return new Spicetify.Menu.Item(h().extensionName,!1,()=>ue(),ro())}catch(t){return ye("Failed to create profile menu item",t),null}}function ro(){return ke.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function ao(e){Object.assign(window,{SyncifyDebug:{button:e,element:e.element,openModal:ue,inspect:()=>le(e),clickElement:()=>{var t;return(t=e.element)==null?void 0:t.click()},clickInnerButton:()=>{var t;return(t=e.button)==null?void 0:t.click()},clickCallback:()=>e.onClick(e)}})}function le(e){var t,n,o,i,a;return{label:e.label,disabled:e.disabled,isRight:e.isRight,hasElement:!!e.element,elementConnected:(t=e.element)==null?void 0:t.isConnected,elementDisabled:(n=e.element)==null?void 0:n.disabled,elementAriaDisabled:(o=e.element)==null?void 0:o.getAttribute("aria-disabled"),elementClass:(i=e.element)==null?void 0:i.className,appRegion:e.element?getComputedStyle(e.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:e.button?getComputedStyle(e.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:e.element?getComputedStyle(e.element).pointerEvents:null,visibility:e.element?getComputedStyle(e.element).visibility:null,display:e.element?getComputedStyle(e.element).display:null,rect:(a=e.element)==null?void 0:a.getBoundingClientRect().toJSON()}}function ue(){E("Opening modal");let e=document.createElement("div");try{Spicetify.PopupModal.display({title:h().extensionName,content:e,isLarge:!1})}catch(t){throw ye("Failed to open PopupModal",t),t}so(e),lo(e)}function so(e){requestAnimationFrame(()=>{let t=co(e);t==null||t.classList.add("syncify-modal-shell");let n=t==null?void 0:t.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');n&&(n.classList.add("syncify-modal-close"),n.setAttribute("aria-label",`Close ${h().extensionName}`),n.title="Close",n.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function co(e){let t=e.parentElement;for(;t&&t!==document.body;){if(t.querySelector(".main-trackCreditsModal-header"))return t;t=t.parentElement}return e.closest('[class*="trackCreditsModal"]')}function lo(e){try{let t=Spicetify.React.createElement(Ut);if(typeof Spicetify.ReactDOM.createRoot=="function"){Spicetify.ReactDOM.createRoot(e).render(t),E("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(t,e),E("Modal rendered",{renderer:"render"})}catch(t){throw ye("Failed to render modal",t),t}}(function e(){if(!Gn()){setTimeout(e,100);return}E("Spicetify APIs ready"),Jn()})();})();
