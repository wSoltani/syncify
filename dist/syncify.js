// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var yn=Object.defineProperty,un=Object.defineProperties;var fn=Object.getOwnPropertyDescriptors;var Qe=Object.getOwnPropertySymbols;var dn=Object.prototype.hasOwnProperty,pn=Object.prototype.propertyIsEnumerable;var et=(e,t,n)=>t in e?yn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,p=(e,t)=>{for(var n in t||(t={}))dn.call(t,n)&&et(e,n,t[n]);if(Qe)for(var n of Qe(t))pn.call(t,n)&&et(e,n,t[n]);return e},h=(e,t)=>un(e,fn(t));var tt=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var ve=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var N={extensionName:"Syncify",version:"1.2.4",workerUrl:"https://syncify-worker.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com"};function g(){var t,n,o,i,a,c,l;let e=window.SyncifyConfig;return{extensionName:(t=A(e==null?void 0:e.extensionName))!=null?t:N.extensionName,version:(n=nt(e==null?void 0:e.version))!=null?n:N.version,workerUrl:(o=A(e==null?void 0:e.workerUrl))!=null?o:N.workerUrl,githubUrl:(i=A(e==null?void 0:e.githubUrl))!=null?i:N.githubUrl,kofiUrl:(a=A(e==null?void 0:e.kofiUrl))!=null?a:N.kofiUrl,issueUrl:(c=A(e==null?void 0:e.issueUrl))!=null?c:N.issueUrl,releasesUrl:(l=A(e==null?void 0:e.releasesUrl))!=null?l:N.releasesUrl}}function A(e){return nt(e)}function nt(e){return typeof e=="string"&&e.trim()?e.trim():null}var gn="x-syncify-version",bn="x-syncify-install",Sn="x-syncify-timezone",kn="syncify",Ee="state",ot="install-id",it="syncify:install-id",xn=2e3,X=null;async function rt(){let e={[gn]:g().version,[bn]:await wn()},t=Cn();return t&&(e[Sn]=t),e}function wn(){return X!=null||(X=vn().catch(()=>Z())),X}async function vn(){let e=await Promise.race([En(),new Promise(t=>setTimeout(()=>t(null),xn))]);if(e)return e;try{let t=window.localStorage.getItem(it);if(t&&at(t))return t;let n=Z();return window.localStorage.setItem(it,n),n}catch(t){return Z()}}function En(){let e;try{e=window.indexedDB}catch(t){return Promise.resolve(null)}return e?new Promise(t=>{let n;try{n=e.open(kn,1)}catch(o){t(null);return}n.onupgradeneeded=()=>{n.result.createObjectStore(Ee)},n.onerror=()=>t(null),n.onblocked=()=>t(null),n.onsuccess=()=>{let o=n.result,i=null;try{let a=o.transaction(Ee,"readwrite"),c=a.objectStore(Ee),l=c.get(ot);l.onsuccess=()=>{if(typeof l.result=="string"&&at(l.result)){i=l.result;return}i=Z(),c.put(i,ot)},a.oncomplete=()=>{o.close(),t(i)},a.onerror=a.onabort=()=>{o.close(),t(null)}}catch(a){o.close(),t(null)}}}):Promise.resolve(null)}function Z(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t=[...e].map(n=>n.toString(16).padStart(2,"0"));return[t.slice(0,4).join(""),t.slice(4,6).join(""),t.slice(6,8).join(""),t.slice(8,10).join(""),t.slice(10).join("")].join("-")}function at(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(e)}function Cn(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(e){return null}}var Nn="x-syncify-user-hash",st=3,K=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}};async function ct(e,t,n){let o=await yt(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(n)});if(!o.ok)throw new Error(`Backup failed with HTTP ${o.status}.`);let i=await o.json().catch(()=>null);return{unchanged:(i==null?void 0:i.unchanged)===!0}}async function lt(e,t){var a,c;let n=await yt(e,t,{method:"GET"});if(n.status===404)return{exists:!1,payload:null,backups:[],safetyCopy:null};if(!n.ok)throw new Error(`Restore failed with HTTP ${n.status}.`);let o=await n.json(),i=[o,...(a=o.backup_history)!=null?a:[]];return{exists:!0,payload:o,backups:i.slice(0,st),safetyCopy:(c=i[st])!=null?c:null}}async function yt(e,t,n){let o=await fetch(e,h(p({},n),{headers:h(p(p({},n.headers),await rt()),{[Nn]:t})}));if(o.status===426)throw new K;return o}var D={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},Pn=/^([a-z0-9]|f([1-9]|1[0-2]))$/,Tn=250,In=40,Ce=null,Q=null,U=null;function ut(){return/mac/i.test(navigator.platform||navigator.userAgent)}function ft(e){if(e===null)return null;if(!e||typeof e!="object")return D;let t=e;return typeof t.key!="string"||!Pn.test(t.key)?D:{key:t.key,ctrl:!!t.ctrl,alt:!!t.alt,shift:!!t.shift,meta:!!t.meta}}function H(e){if(!e)return"Off";let t=e.key.toUpperCase();return ut()?[e.ctrl?"\u2318":"",e.alt?"\u2325":"",e.shift?"\u21E7":"",t].join(""):[e.ctrl&&"Ctrl",e.meta&&"Win",e.alt&&"Alt",e.shift&&"Shift",t].filter(Boolean).join("+")}function dt(e){if(e.key==="Escape")return{kind:"cancel"};let t=_n(e.code);if(!t)return{kind:"ignore"};let n=ut();if(n&&e.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let o={key:t,ctrl:n?e.metaKey:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:n?!1:e.metaKey},i=t.startsWith("f")&&t.length>1;return!o.ctrl&&!o.alt&&!o.meta&&!i?{kind:"error",message:`Include ${n?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:o}}function _n(e){var n,o;let t=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(e);return t?((o=(n=t[1])!=null?n:t[2])!=null?o:t[3]).toLowerCase():null}function pt(e){var t;if(U&&Mn(U,e))return!1;try{let n=Spicetify.Mousetrap,o=(t=n.trigger)==null?void 0:t.call(n)._directMap;if(!o)return!1;let i=Ne(e);return Object.keys(o).some(a=>a.startsWith(`${i}:`))}catch(n){return!1}}function Pe(e,t,n=0){if(Ce=t,Q=e,!mt()){if(n>=In){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>Pe(Q,t,n+1),Tn);return}Te(Q)}function Te(e){if(Q=e,!mt()||!Ce)return;let t=Ce;try{if(U&&Spicetify.Keyboard._deregisterShortcut(U),U=null,!e)return;Spicetify.Keyboard.registerShortcut(e,n=>{n.preventDefault(),t()}),U=e,console.debug("[Syncify]","Keyboard shortcut registered",H(e))}catch(n){console.warn("[Syncify]","Failed to register keyboard shortcut",n)}}function mt(){var e;return typeof((e=Spicetify.Keyboard)==null?void 0:e.registerShortcut)=="function"}function Ne(e){return[e.ctrl&&"mod",e.meta&&"meta",e.alt&&"alt",e.shift&&"shift",e.key].filter(Boolean).join("+")}function Mn(e,t){return Ne(e)===Ne(t)}var Ie="both",Bn=["both","topbar","menu"],$=null,Y=null,ee=!1;function ht(e){return Bn.includes(e)?e:Ie}function gt(){var e;return typeof((e=Spicetify.Menu)==null?void 0:e.Item)=="function"}function bt(e){$=e.topbarButton,Y=e.menuItem}function te(e){let t=e!=="menu"||!Y,n=e!=="topbar";if($!=null&&$.element&&($.element.style.display=t?"":"none"),!!Y)try{n&&!ee?(Y.register(),ee=!0):!n&&ee&&(Y.deregister(),ee=!1)}catch(o){console.warn("[Syncify]","Failed to update profile menu item",o)}}var oe="syncify:config",ne={workerUrl:g().workerUrl,autoBackupEnabled:!1,shortcut:D,entryPoint:Ie};function O(){var n,o;let e=g(),t=(o=(n=Spicetify.LocalStorage)==null?void 0:n.get(oe))!=null?o:window.localStorage.getItem(oe);if(!t)return h(p({},ne),{workerUrl:e.workerUrl});try{let i=JSON.parse(t);return{workerUrl:e.workerUrl,autoBackupEnabled:i.autoBackupEnabled===void 0?ne.autoBackupEnabled:!!i.autoBackupEnabled,shortcut:i.shortcut===void 0?ne.shortcut:ft(i.shortcut),entryPoint:ht(i.entryPoint)}}catch(i){return h(p({},ne),{workerUrl:e.workerUrl})}}function ie(e){var n;let t=JSON.stringify({workerUrl:g().workerUrl,autoBackupEnabled:e.autoBackupEnabled,shortcut:e.shortcut,entryPoint:e.entryPoint});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set(oe,t);return}window.localStorage.setItem(oe,t)}function _e(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}async function re(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return[...new Uint8Array(n)].map(o=>o.toString(16).padStart(2,"0")).join("")}function St(e){return JSON.stringify(Me(e))}function Me(e){return Array.isArray(e)?e.map(Me):e&&typeof e=="object"?Object.keys(e).sort().reduce((t,n)=>(t[n]=Me(e[n]),t),{}):e}async function Be(){let e=await An();return re(e)}async function An(){var o,i,a,c,l;let e=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let t=await e.getUser(),n=(l=(c=(a=(i=t==null?void 0:t.username)!=null?i:t==null?void 0:t.canonicalUsername)!=null?a:t==null?void 0:t.id)!=null?c:t==null?void 0:t.uri)!=null?l:t==null?void 0:t.displayName;if(!n)throw new Error("Unable to resolve the active Spotify user.");return n}function kt(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var ae="spicetify-marketplace";var z="settings";async function xt(){let e=await Et();if(e.kind!=="ok")return null;try{let t=await Ct(e.db,"readonly",o=>o.getAll());if(!t)return null;let n={};for(let o of t)typeof(o==null?void 0:o.key)=="string"&&typeof o.value=="string"&&(n[o.key]=o.value);return n}finally{e.db.close()}}async function wt(e){let t=await Et();if(t.kind==="unavailable")return"unavailable";let n=t.kind==="ok"?t.db:await Un();if(!n)return"failed";try{return await Ct(n,"readwrite",i=>{let a;for(let[c,l]of Object.entries(e))a=i.put({key:c,value:l});return a})===null?"failed":"written"}finally{n.close()}}function vt(){var e;try{return(e=window.indexedDB)!=null?e:null}catch(t){return null}}async function Et(){let e=vt();return e?await Dn(e)?{kind:"missing"}:new Promise(t=>{let n=!1,o=e.open(ae);o.onupgradeneeded=()=>{n=!0},o.onerror=()=>{console.warn("Syncify could not open Marketplace storage",o.error),t({kind:"unavailable"})},o.onblocked=()=>t({kind:"unavailable"}),o.onsuccess=()=>{let i=o.result;if(n){i.close(),On(e).then(()=>t({kind:"missing"}));return}if(!i.objectStoreNames.contains(z)){i.close(),t({kind:"unavailable"});return}t({kind:"ok",db:i})}}):{kind:"unavailable"}}function Un(){let e=vt();return e?new Promise(t=>{let n=e.open(ae,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains(z)||o.createObjectStore(z,{keyPath:"key"})},n.onerror=()=>{console.warn("Syncify could not create Marketplace storage",n.error),t(null)},n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}async function Dn(e){if(typeof e.databases!="function")return!1;try{return!(await e.databases()).some(n=>n.name===ae)}catch(t){return!1}}function On(e){return new Promise(t=>{let n=e.deleteDatabase(ae);n.onsuccess=()=>t(),n.onerror=()=>t(),n.onblocked=()=>t()})}function Ct(e,t,n){return new Promise(o=>{let i;try{i=e.transaction(z,t)}catch(u){console.warn("Syncify could not open a Marketplace transaction",u),o(null);return}let a,c=!1,l=u=>{c||(c=!0,o(u))};i.oncomplete=()=>l(a),i.onerror=()=>{console.warn("Syncify Marketplace transaction failed",i.error),l(null)},i.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",i.error),l(null)};let y;try{y=n(i.objectStore(z))}catch(u){console.warn("Syncify Marketplace request could not be issued",u),l(null);return}y&&(y.onsuccess=()=>{a=y.result},y.onerror=()=>{console.warn("Syncify Marketplace request failed",y.error),l(null)})})}var Ae="marketplace:",Nt=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function Pt(){let e=Yn(),t=await xt();if(t)for(let[n,o]of Object.entries(t))n.startsWith(Ae)&&(e[n]=o);return e}var Ln=new Set(["marketplace:active-tab","marketplace:sort"]),jn="marketplace:installed:",Fn=["stars","tags","lastUpdated","created"];async function se(e){let t={};for(let[n,o]of Object.entries(e))Ln.has(n)||(t[n]=n.startsWith(jn)?Kn(o):o);return re(St(t))}function Kn(e){try{let t=JSON.parse(e);if(!t||typeof t!="object"||Array.isArray(t))return e;for(let n of Fn)delete t[n];return t}catch(t){return e}}async function ce(){let e=await Pt();return{keyCount:Object.keys(e).length,hash:await se(e),installedItemCount:Hn(e),installedItems:V(e),marketplaceAvailable:$n(e)}}async function Tt(){let e=await Pt();return{schema_version:1,metadata:{last_sync_datetime:new Date().toISOString(),device_info:kt(),marketplace_key_count:Object.keys(e).length},payload_hash:await se(e),marketplace_data:{keys:e}}}async function It(e){var a,c;let t={},n=(c=(a=e.marketplace_data)==null?void 0:a.keys)!=null?c:{};for(let[l,y]of Object.entries(n))l.startsWith(Ae)&&(t[l]=y);let o=Object.keys(t);if(o.length===0)return 0;for(let l of o)window.localStorage.setItem(l,t[l]);if(await wt(t)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try the restore again.");return o.length}function Hn(e){return V(e).length}function V(e){return Nt.flatMap(t=>zn(e[t]).map(String))}function $n(e){return!!(window.Marketplace||Nt.some(n=>e[n]!==void 0)||e["marketplace:tabs"]!==void 0)}function _t(e,t){return t===0?!1:e===0?!0:e<Math.max(2,Math.floor(t*.5))}function Yn(){let e={};for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);if(!(n!=null&&n.startsWith(Ae)))continue;let o=window.localStorage.getItem(n);o!==null&&(e[n]=o)}return e}function zn(e){if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch(t){return[]}}async function le(e){if(!_e(e))throw new Error("Syncify backup service is not configured.");let[t,n]=await Promise.all([Be(),Tt()]);if(n.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:o}=await ct(e.workerUrl,t,n);return{payload:n,unchanged:o}}async function W(e){var a;if(!_e(e))throw new Error("Syncify backup service is not configured.");let t=await lt(e.workerUrl,await Be()),[n,o]=await Promise.all([Promise.all(t.backups.map(Mt)),t.safetyCopy?Mt(t.safetyCopy):null]),i=n.filter((c,l)=>n.findIndex(y=>y.payload_hash===c.payload_hash)===l);return h(p({},t),{payload:(a=i[0])!=null?a:null,backups:i,safetyCopy:o&&!i.some(c=>c.payload_hash===o.payload_hash)?o:null})}var Ue=new Map;async function Mt(e){var o,i,a;let t=`${e.payload_hash} ${(o=e.metadata)==null?void 0:o.last_sync_datetime}`,n=Ue.get(t);return n||(n=se((a=(i=e.marketplace_data)==null?void 0:i.keys)!=null?a:{}),Ue.set(t,n),n.catch(()=>Ue.delete(t))),h(p({},e),{payload_hash:await n})}async function Bt(e,t){let n=t!=null?t:(await W(e)).payload;if(!n)throw new Error("No Syncify cloud backup was found for this Spotify account.");let o=await It(n);return{payload:n,restoredCount:o}}async function At(){var t,n,o;let e=O();if(!(!e.workerUrl||!e.autoBackupEnabled))try{let[i,a]=await Promise.all([ce(),W(e)]),c=(n=(t=a.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?n:0;if(a.exists&&_t(i.keyCount,c)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((o=a.payload)==null?void 0:o.payload_hash)===i.hash||i.keyCount===0)return;await le(e),Spicetify.showNotification("Syncify auto-backup complete")}catch(i){let a=i instanceof Error?i.message:String(i);console.warn("Syncify startup sync failed:",i),Spicetify.showNotification(`Syncify auto-sync skipped: ${a}`,!0,8e3)}}var Ut=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function De(e){return typeof e=="string"&&Ut.test(e)}function Dt(e,t){let[n,o]=[e,t].map(i=>{var u;let[,a,c,l,y]=(u=Ut.exec(i))!=null?u:[];return[a,c,l,y!=null?y:1/0].map(Number)});for(let i=0;i<n.length;i+=1)if(n[i]!==o[i])return n[i]<o[i]?-1:1;return 0}async function Ot(e,t=3e3){let n=typeof AbortController=="function"?new AbortController:null,o=setTimeout(()=>n==null?void 0:n.abort(),t);try{let i=await fetch(e,{signal:n==null?void 0:n.signal});if(!i.ok)return null;let a=await i.json();return De(a==null?void 0:a.version)?a.version:null}catch(i){return null}finally{clearTimeout(o)}}function Rt(){let e=Spicetify.React,t=e.useEffect,n=e.useMemo,o=e.useState,i=e.useRef,[a,c]=o(()=>O()),[l,y]=o("idle"),[u,d]=o(null),[me,Kt]=o(0),[Ht,$t]=o([]),[Oe,Yt]=o(null),[S,zt]=o(null),[k,Re]=o(null),[P,Le]=o([]),[L,je]=o(null),[m,j]=o(null),[Fe,he]=o(!1),[Vt,E]=o(!1),[x,T]=o(!1),[ge,I]=o(null),[Wt,qt]=o(null),[q,Gt]=o(!1),[_,Jt]=o(!1),[Ke,Xt]=o(null),He=i(null),C=n(()=>g(),[]),M=n(()=>L?[...P,L]:P,[P,L]),Zt=n(()=>new Map(M.map(r=>[r,V(r.marketplace_data.keys)])),[M]),$e=r=>{var s;return(s=Zt.get(r))!=null?s:V(r.marketplace_data.keys)},Ye=r=>$e(r).length,be=n(()=>gt(),[]),w=l==="loading",G=(u==null?void 0:u.kind)==="warning"||(u==null?void 0:u.kind)==="error"?u:null,ze=!!(k&&S&&k.payload_hash!==S),F=!!(k&&S&&k.payload_hash===S),Ve=!!(m&&S&&m.payload_hash===S),Se=q||!F||M.length<2,Qt=Se?P:P.slice(0,1),en=!!(S&&me>0&&!M.some(r=>r.payload_hash===S));t(()=>{qe({silent:!0}),tn()},[]),t(()=>{if(!x)return;let r=s=>{var B;if(!((B=He.current)!=null&&B.isConnected)){T(!1),I(null);return}s.preventDefault(),s.stopImmediatePropagation();let f=dt(s);if(f.kind!=="ignore"){if(f.kind==="cancel"){T(!1),I(null);return}if(f.kind==="error"){I(f.message);return}if(pt(f.shortcut)){I(`${H(f.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}T(!1),ke(f.shortcut)}};return window.addEventListener("keydown",r,!0),()=>window.removeEventListener("keydown",r,!0)},[x,a]);async function We(){let r=await ce();return zt(r.hash),Kt(r.installedItemCount),$t(r.installedItems),Yt(r.marketplaceAvailable),r}async function qe(r){try{E(!1),y("loading"),r!=null&&r.silent||d({kind:"info",text:"Checking your Syncify backup\u2026"}),await We();let s=await W(a);Re(s.payload),Le(s.backups),je(s.safetyCopy),j(s.payload),he(!0),y(s.exists?"success":"idle"),r!=null&&r.silent||d(s.exists&&s.payload?{kind:"success",text:`Backup found from ${R(s.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(s){xe(s)}}async function tn(){let r=C.version;if(!De(r))return;let s=await Ot(`${C.releasesUrl}/latest.json`);s&&Dt(s,r)>0&&Xt(s)}function nn(r){let s=h(p({},a),{autoBackupEnabled:r});c(s),ie(s),d({kind:"success",text:r?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}function ke(r){let s=h(p({},a),{shortcut:r});c(s),ie(s),Te(r),I(null),d({kind:"success",text:r?`${H(r)} now opens Syncify.`:"Keyboard shortcut turned off."})}function on(r){let s=h(p({},a),{entryPoint:r});c(s),ie(s),te(r)}function rn(){I(null),T(!0)}async function an(){try{E(!1),y("loading"),d({kind:"info",text:"Backing up your extensions and themes\u2026"});let{payload:r,unchanged:s}=await le(a);if(await We(),s){he(!0),y("success"),d({kind:"success",text:"Everything is already backed up."}),Spicetify.showNotification("Syncify: everything is already backed up");return}Re(r),Le(f=>[r,...f.filter(B=>B.payload_hash!==r.payload_hash)].slice(0,Gn)),je(f=>(f==null?void 0:f.payload_hash)===r.payload_hash?null:f),j(r),he(!0),y("success"),d({kind:"success",text:`Backed up ${r.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(r){xe(r)}}function sn(r=m){if(Oe===!1){let s="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";d({kind:"error",text:s}),Spicetify.showNotification(s,!0,6e3);return}if(!r){let s="No Syncify cloud backup was found for this Spotify account.";d({kind:"error",text:s}),Spicetify.showNotification(s,!0,6e3);return}j(r),E(!0)}async function cn(){try{E(!1),y("loading"),d({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:r,restoredCount:s}=await Bt(a,m!=null?m:void 0);j(r),y("success"),d({kind:"success",text:`Restored ${s} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),setTimeout(()=>window.location.reload(),1e3)}catch(r){xe(r)}}function J(r){if(r.startsWith("mailto:")){window.location.href=r;return}window.open(r,"_blank","noopener,noreferrer")}function xe(r){if(y("error"),r instanceof K){Jt(!0),d(null);return}let s=r instanceof Error?r.message:String(r);d({kind:"error",text:s}),Spicetify.showNotification(s,!0,6e3)}function Ge(r,s){let f=(m==null?void 0:m.payload_hash)===r.payload_hash,B=r.payload_hash===S,Xe=R(r.metadata.last_sync_datetime),Ze=ye(Ye(r));return e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":f,"data-selected":f?"true":"false",type:"button",key:`${r.payload_hash}-${r.metadata.last_sync_datetime}`,title:s!=null&&s.isSafetyCopy?"Kept aside and updated about once a week, so a burst of new backups can't replace it":void 0,onClick:()=>{j(r),E(!1)},disabled:w},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),s!=null&&s.isSafetyCopy?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Safety copy"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 updated weekly")),e.createElement("span",{className:"syncify-muted"},Xe," \xB7 ",Ze)):e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-backup-date"},Xe),e.createElement("span",{className:"syncify-muted"},Ze," \xB7 from ",r.metadata.device_info)),B?e.createElement("span",{className:"syncify-tag",title:"What's on this device now"},"Current"):null,s!=null&&s.isSafetyCopy?e.createElement(Wn,null):null)}function we(r){r.stopPropagation()}let ln=_?"Update Syncify to keep backing up":Fe?k?ze?"Changes since your last backup":"Everything is backed up":"No backup yet":l==="error"?"Couldn't check your backup":"Checking your backup\u2026",Je=_?"Your backups are safe":Fe?k?ze?Xn($e(k),Ht,k.metadata.last_sync_datetime):`Last backup ${R(k.metadata.last_sync_datetime)}`:"Save your extensions and themes so you can restore them after a reinstall or on another computer.":null;return e.createElement("div",{className:"syncify-panel",ref:He,onClick:we,onMouseDown:we,onPointerDown:we},_?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,"This version of Syncify is no longer supported."),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>J(`${C.githubUrl}#updating`)},"How to update")):null,G?e.createElement("div",{className:"syncify-alert","data-kind":G.kind},e.createElement("span",null,G.text),e.createElement("span",{className:"syncify-alert-actions"},G.kind==="error"?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{qe()},disabled:w},"Try again"):null,e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>d(null)},e.createElement(qn,null)))):null,e.createElement("section",{className:"syncify-status","aria-live":"polite"},e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},ln),e.createElement("p",{className:"syncify-muted"},Je?`${Je} \xB7 `:"",ye(me)," on this device")),e.createElement("button",{className:"syncify-button",type:"button",onClick:an,disabled:w||F||_,title:F?"No changes since your last backup":void 0},w?"Working\u2026":F?"Backed up":"Back up now")),P.length>0?e.createElement("section",{className:"syncify-section","aria-label":"Backups"},e.createElement("div",{className:"syncify-section-header"},e.createElement("h4",{className:"syncify-section-title"},"Backups"),F&&M.length>1?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":q,"aria-controls":"syncify-backup-list",onClick:()=>{Gt(!q),E(!1)}},q?"Show less":`Show all ${M.length}`,e.createElement(Lt,null)):null),e.createElement("div",{className:"syncify-backup-list",id:"syncify-backup-list",role:"radiogroup","aria-label":"Choose a backup to restore"},Qt.map(r=>Ge(r)),Se&&L?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),Ge(L,{isSafetyCopy:!0})):null),Se?Oe===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to restore a backup."):Vt?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",null,"Replace this device's"," ",ye(me)," with the"," ",m?`${ye(Ye(m))} from ${R(m.metadata.last_sync_datetime)}`:"selected backup","? Spotify will reload."),en?e.createElement("div",{className:"syncify-alert"},"Your current setup isn't backed up."):null,e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>E(!1),disabled:w},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:cn,disabled:w},"Restore"))):e.createElement("div",{className:"syncify-actions"},Ve?e.createElement("span",{className:"syncify-muted syncify-actions-hint"},"This backup is already current."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>sn(),disabled:w||!m||Ve},"Restore backup")):null):null,e.createElement("div",{className:"syncify-accordion"},e.createElement(Vn,{id:"settings",title:"Settings",openSection:Wt,onToggle:r=>{qt(r),r!=="settings"&&T(!1)}},e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Back up automatically"),e.createElement("span",{className:"syncify-muted"},"When Spotify starts and something has changed")),e.createElement("input",{className:"syncify-switch",type:"checkbox",role:"switch",checked:a.autoBackupEnabled&&!_,onChange:r=>nn(r.currentTarget.checked),disabled:w||_})),e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Open Syncify from"),be?a.entryPoint==="menu"&&!a.shortcut?e.createElement("span",{className:"syncify-muted"},"Keep a shortcut in case a Spotify update breaks the menu"):null:e.createElement("span",{className:"syncify-muted"},"The profile menu isn't available in this Spicetify version")),e.createElement("select",{className:"syncify-select",value:be?a.entryPoint:"topbar",onChange:r=>on(r.currentTarget.value),disabled:!be},Jn.map(r=>e.createElement("option",{key:r.value,value:r.value},r.label)))),e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Keyboard shortcut"),x&&!ge?e.createElement("span",{className:"syncify-muted"},"Press a key combination, or Esc to cancel"):null),e.createElement("span",{className:"syncify-shortcut"},a.shortcut&&!x?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ke(null)},"Turn off"):null,!a.shortcut&&!x?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ke(D)},"Use default"):null,e.createElement("button",{className:"syncify-key",type:"button","data-recording":x?"true":"false",onClick:()=>x?T(!1):rn(),title:"Click to change"},x?"Press keys\u2026":a.shortcut?H(a.shortcut):"Off"))),ge?e.createElement("div",{className:"syncify-alert",role:"alert"},ge):null)),e.createElement("footer",{className:"syncify-footer"},e.createElement("span",{className:"syncify-footer-version"},e.createElement("span",null,"Syncify ",C.version),Ke?e.createElement("button",{className:"syncify-text-button syncify-update",type:"button",onClick:()=>window.location.reload()},Ke," is out \xB7 Reload"):null),e.createElement("span",{className:"syncify-footer-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>J(C.issueUrl)},"Report an issue"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>J(C.githubUrl)},"GitHub"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>J(C.kofiUrl)},"Support on Ko-fi"))))}function Vn(e){let t=Spicetify.React,n=e.openSection===e.id,o=`syncify-section-${e.id}`;return t.createElement("section",{className:"syncify-accordion-section","aria-label":e.title},t.createElement("button",{className:"syncify-accordion-header",type:"button","aria-expanded":n,"aria-controls":o,onClick:()=>e.onToggle(n?null:e.id)},t.createElement("span",{className:"syncify-accordion-title"},e.title),t.createElement(Lt,null)),n?t.createElement("div",{className:"syncify-accordion-body",id:o},e.children):null)}function Wn(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-shield",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"}))}function Lt(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-chevron",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"m9 6 6 6-6 6"}))}function qn(){let e=Spicetify.React;return e.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M18 6 6 18"}),e.createElement("path",{d:"m6 6 12 12"}))}var Gn=3,Jn=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function Xn(e,t,n){let o=new Set(e),i=new Set(t),a=t.filter(y=>!o.has(y)).length,c=e.filter(y=>!i.has(y)).length,l=[a?`${a} added`:null,c?`${c} removed`:null].filter(Boolean);return l.length?`${l.join(", ")} since ${R(n)}`:`Last backup ${R(n)}`}function ye(e){return e===1?"1 extension or theme":`${e} extensions and themes`}function R(e){let t=new Date(e);if(Number.isNaN(t.getTime()))return e;let n=t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),o=new Date,i=new Date(o);return i.setDate(o.getDate()-1),t.toDateString()===o.toDateString()?`today, ${n}`:t.toDateString()===i.toDateString()?`yesterday, ${n}`:`${t.toLocaleDateString(void 0,{month:"short",day:"numeric",year:t.getFullYear()===o.getFullYear()?void 0:"numeric"})}, ${n}`}var ue="[Syncify]";function v(e,t){if(t===void 0){console.debug(ue,e);return}console.debug(ue,e,t)}function de(e,t){if(t===void 0){console.warn(ue,e);return}console.warn(ue,e,t)}function Zn(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}function Qn(){eo();let e=O();bt({topbarButton:to(),menuItem:so()}),te(e.entryPoint),Pe(e.shortcut,pe),At().catch(t=>{de("Startup sync check failed",t)})}function eo(){let e="syncify-styles";if(document.getElementById(e))return;let t=document.createElement("style");t.id=e,t.textContent=tt,document.head.appendChild(t)}function to(){let{extensionName:e}=g(),t=new Spicetify.Topbar.Button(e,ve,n=>{v("Topbar button clicked",fe(n)),pe()},!1,!0);return Ft(t),io(t),lo(t),v("Topbar button registered",fe(t)),t}function Ft(e){var n;let t=e;e.element.style.setProperty("-webkit-app-region","no-drag"),(n=t.button)==null||n.style.setProperty("-webkit-app-region","no-drag")}var jt=".main-actionButtons",no=".Root__globalNav, .Root__top-bar",oo=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function io(e){if(typeof MutationObserver=="undefined")return;let t=!1,n=null,o=()=>{t=!1,a();let c=e.element,l=document.querySelector(jt);!c||!l||l.contains(c)||(l.prepend(c),ro(e),Ft(e),v("Topbar button re-attached",fe(e)))},i=new MutationObserver(()=>{t||(t=!0,setTimeout(o,250))}),a=()=>{var y;if(n!=null&&n.isConnected)return;let c=document.querySelector(jt),l=(y=c==null?void 0:c.closest(no))!=null?y:c==null?void 0:c.parentElement;if(i.disconnect(),n=l!=null?l:null,!l){i.observe(document.body,{childList:!0,subtree:!0});return}i.observe(l,{childList:!0,subtree:!0});for(let u=l.parentElement;u;u=u.parentElement)i.observe(u,{childList:!0})};o()}function ro(e){let t=ao(e);if(!t||t.className&&t.className!=="undefined")return;let n=Array.from(document.querySelectorAll(oo)).find(o=>!e.element.contains(o));n!=null&&n.className&&(t.className=n.className)}function ao(e){return e.button}function so(){var e;if(typeof((e=Spicetify.Menu)==null?void 0:e.Item)!="function")return null;try{return new Spicetify.Menu.Item(g().extensionName,!1,()=>pe(),co())}catch(t){return de("Failed to create profile menu item",t),null}}function co(){return ve.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function lo(e){Object.assign(window,{SyncifyDebug:{button:e,element:e.element,openModal:pe,inspect:()=>fe(e),clickElement:()=>{var t;return(t=e.element)==null?void 0:t.click()},clickInnerButton:()=>{var t;return(t=e.button)==null?void 0:t.click()},clickCallback:()=>e.onClick(e)}})}function fe(e){var t,n,o,i,a;return{label:e.label,disabled:e.disabled,isRight:e.isRight,hasElement:!!e.element,elementConnected:(t=e.element)==null?void 0:t.isConnected,elementDisabled:(n=e.element)==null?void 0:n.disabled,elementAriaDisabled:(o=e.element)==null?void 0:o.getAttribute("aria-disabled"),elementClass:(i=e.element)==null?void 0:i.className,appRegion:e.element?getComputedStyle(e.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:e.button?getComputedStyle(e.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:e.element?getComputedStyle(e.element).pointerEvents:null,visibility:e.element?getComputedStyle(e.element).visibility:null,display:e.element?getComputedStyle(e.element).display:null,rect:(a=e.element)==null?void 0:a.getBoundingClientRect().toJSON()}}var b=null;function pe(){var t;if(b!=null&&b.container.isConnected){v("Closing modal"),Spicetify.PopupModal.hide();return}v("Opening modal"),(t=b==null?void 0:b.root)==null||t.unmount();let e=document.createElement("div");b={container:e,root:null};try{Spicetify.PopupModal.display({title:g().extensionName,content:e,isLarge:!1})}catch(n){throw de("Failed to open PopupModal",n),n}yo(e),fo(e)}function yo(e){requestAnimationFrame(()=>{let t=uo(e);t==null||t.classList.add("syncify-modal-shell");let n=t==null?void 0:t.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');n&&(n.classList.add("syncify-modal-close"),n.setAttribute("aria-label",`Close ${g().extensionName}`),n.title="Close",n.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function uo(e){let t=e.parentElement;for(;t&&t!==document.body;){if(t.querySelector(".main-trackCreditsModal-header"))return t;t=t.parentElement}return e.closest('[class*="trackCreditsModal"]')}function fo(e){try{let t=Spicetify.React.createElement(Rt);if(typeof Spicetify.ReactDOM.createRoot=="function"){let n=Spicetify.ReactDOM.createRoot(e);n.render(t),(b==null?void 0:b.container)===e&&(b.root=n),v("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(t,e),v("Modal rendered",{renderer:"render"})}catch(t){throw de("Failed to render modal",t),t}}(function e(){if(!Zn()){setTimeout(e,100);return}v("Spicetify APIs ready"),Qn()})();})();
