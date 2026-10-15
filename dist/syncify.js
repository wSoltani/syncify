// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var xe=Object.defineProperty,we=Object.defineProperties;var ve=Object.getOwnPropertyDescriptors;var Bt=Object.getOwnPropertySymbols;var Ee=Object.prototype.hasOwnProperty,Ce=Object.prototype.propertyIsEnumerable;var _t=(t,e,n)=>e in t?xe(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,m=(t,e)=>{for(var n in e||(e={}))Ee.call(e,n)&&_t(t,n,e[n]);if(Bt)for(var n of Bt(e))Ce.call(e,n)&&_t(t,n,e[n]);return t},h=(t,e)=>we(t,ve(e));var It=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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

/* Sections */

.syncify-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 16px;
    border-top: 1px solid var(--syncify-divider);
}

.syncify-section-title {
    margin: 0 0 4px;
    color: var(--syncify-muted);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
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
`;var ut=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var Ut="x-syncify-user-hash";async function At(t,e,n){let o=await fetch(t,{method:"POST",headers:{"content-type":"application/json",[Ut]:e},body:JSON.stringify(n)});if(!o.ok)throw new Error(`Backup failed with HTTP ${o.status}.`);let r=await o.json().catch(()=>null);return{unchanged:(r==null?void 0:r.unchanged)===!0}}async function Dt(t,e){var s;let n=await fetch(t,{method:"GET",headers:{[Ut]:e}});if(n.status===404)return{exists:!1,payload:null,backups:[]};if(!n.ok)throw new Error(`Restore failed with HTTP ${n.status}.`);let o=await n.json(),r=[o,...(s=o.backup_history)!=null?s:[]].slice(0,3);return{exists:!0,payload:o,backups:r}}var v={extensionName:"Syncify",version:"1.2.1",workerUrl:"https://syncify-worker.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"https://github.com/wSoltani/Syncify/issues/new"};function p(){var e,n,o,r,s,l;let t=window.SyncifyConfig;return{extensionName:(e=T(t==null?void 0:t.extensionName))!=null?e:v.extensionName,version:(n=Ot(t==null?void 0:t.version))!=null?n:v.version,workerUrl:(o=T(t==null?void 0:t.workerUrl))!=null?o:v.workerUrl,githubUrl:(r=T(t==null?void 0:t.githubUrl))!=null?r:v.githubUrl,kofiUrl:(s=T(t==null?void 0:t.kofiUrl))!=null?s:v.kofiUrl,issueUrl:(l=T(t==null?void 0:t.issueUrl))!=null?l:v.issueUrl}}function T(t){return Ot(t)}function Ot(t){return typeof t=="string"&&t.trim()?t.trim():null}var C={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},Me=/^([a-z0-9]|f([1-9]|1[0-2]))$/,Te=250,Be=40,ft=null,L=null,E=null;function Rt(){return/mac/i.test(navigator.platform||navigator.userAgent)}function Lt(t){if(t===null)return null;if(!t||typeof t!="object")return C;let e=t;return typeof e.key!="string"||!Me.test(e.key)?C:{key:e.key,ctrl:!!e.ctrl,alt:!!e.alt,shift:!!e.shift,meta:!!e.meta}}function B(t){if(!t)return"Off";let e=t.key.toUpperCase();return Rt()?[t.ctrl?"\u2318":"",t.alt?"\u2325":"",t.shift?"\u21E7":"",e].join(""):[t.ctrl&&"Ctrl",t.meta&&"Win",t.alt&&"Alt",t.shift&&"Shift",e].filter(Boolean).join("+")}function jt(t){if(t.key==="Escape")return{kind:"cancel"};let e=_e(t.code);if(!e)return{kind:"ignore"};let n=Rt();if(n&&t.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let o={key:e,ctrl:n?t.metaKey:t.ctrlKey,alt:t.altKey,shift:t.shiftKey,meta:n?!1:t.metaKey},r=e.startsWith("f")&&e.length>1;return!o.ctrl&&!o.alt&&!o.meta&&!r?{kind:"error",message:`Include ${n?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:o}}function _e(t){var n,o;let e=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(t);return e?((o=(n=e[1])!=null?n:e[2])!=null?o:e[3]).toLowerCase():null}function Ft(t){var e;if(E&&Ie(E,t))return!1;try{let n=Spicetify.Mousetrap,o=(e=n.trigger)==null?void 0:e.call(n)._directMap;if(!o)return!1;let r=dt(t);return Object.keys(o).some(s=>s.startsWith(`${r}:`))}catch(n){return!1}}function pt(t,e,n=0){if(ft=e,L=t,!Kt()){if(n>=Be){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>pt(L,e,n+1),Te);return}mt(L)}function mt(t){if(L=t,!Kt()||!ft)return;let e=ft;try{if(E&&Spicetify.Keyboard._deregisterShortcut(E),E=null,!t)return;Spicetify.Keyboard.registerShortcut(t,n=>{n.preventDefault(),e()}),E=t,console.debug("[Syncify]","Keyboard shortcut registered",B(t))}catch(n){console.warn("[Syncify]","Failed to register keyboard shortcut",n)}}function Kt(){var t;return typeof((t=Spicetify.Keyboard)==null?void 0:t.registerShortcut)=="function"}function dt(t){return[t.ctrl&&"mod",t.meta&&"meta",t.alt&&"alt",t.shift&&"shift",t.key].filter(Boolean).join("+")}function Ie(t,e){return dt(t)===dt(e)}var ht="both",Ue=["both","topbar","menu"],_=null,I=null,j=!1;function Ht(t){return Ue.includes(t)?t:ht}function Yt(){var t;return typeof((t=Spicetify.Menu)==null?void 0:t.Item)=="function"}function Wt(t){_=t.topbarButton,I=t.menuItem}function F(t){let e=t!=="menu"||!I,n=t!=="topbar";if(_!=null&&_.element&&(_.element.style.display=e?"":"none"),!!I)try{n&&!j?(I.register(),j=!0):!n&&j&&(I.deregister(),j=!1)}catch(o){console.warn("[Syncify]","Failed to update profile menu item",o)}}var H="syncify:config",K={workerUrl:p().workerUrl,autoBackupEnabled:!1,shortcut:C,entryPoint:ht};function N(){var n,o;let t=p(),e=(o=(n=Spicetify.LocalStorage)==null?void 0:n.get(H))!=null?o:window.localStorage.getItem(H);if(!e)return h(m({},K),{workerUrl:t.workerUrl});try{let r=JSON.parse(e);return{workerUrl:t.workerUrl,autoBackupEnabled:r.autoBackupEnabled===void 0?K.autoBackupEnabled:!!r.autoBackupEnabled,shortcut:r.shortcut===void 0?K.shortcut:Lt(r.shortcut),entryPoint:Ht(r.entryPoint)}}catch(r){return h(m({},K),{workerUrl:t.workerUrl})}}function Y(t){var n;let e=JSON.stringify({workerUrl:p().workerUrl,autoBackupEnabled:t.autoBackupEnabled,shortcut:t.shortcut,entryPoint:t.entryPoint});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set(H,e);return}window.localStorage.setItem(H,e)}function gt(t){return typeof t.workerUrl=="string"&&t.workerUrl.length>0}async function W(t){let e=new TextEncoder().encode(t),n=await crypto.subtle.digest("SHA-256",e);return[...new Uint8Array(n)].map(o=>o.toString(16).padStart(2,"0")).join("")}function $t(t){return JSON.stringify(bt(t))}function bt(t){return Array.isArray(t)?t.map(bt):t&&typeof t=="object"?Object.keys(t).sort().reduce((e,n)=>(e[n]=bt(t[n]),e),{}):t}async function St(){let t=await Ae();return W(t)}async function Ae(){var o,r,s,l,c;let t=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(t!=null&&t.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let e=await t.getUser(),n=(c=(l=(s=(r=e==null?void 0:e.username)!=null?r:e==null?void 0:e.canonicalUsername)!=null?s:e==null?void 0:e.id)!=null?l:e==null?void 0:e.uri)!=null?c:e==null?void 0:e.displayName;if(!n)throw new Error("Unable to resolve the active Spotify user.");return n}function zt(){let t=navigator.userAgent;return/Windows/i.test(t)?"Windows":/Mac OS|Macintosh/i.test(t)?"macOS":/Linux/i.test(t)?"Linux":t}var $="spicetify-marketplace";var U="settings";async function qt(){let t=await Jt();if(t.kind!=="ok")return null;try{let e=await Xt(t.db,"readonly",o=>o.getAll());if(!e)return null;let n={};for(let o of e)typeof(o==null?void 0:o.key)=="string"&&typeof o.value=="string"&&(n[o.key]=o.value);return n}finally{t.db.close()}}async function Vt(t){let e=await Jt();if(e.kind==="unavailable")return"unavailable";let n=e.kind==="ok"?e.db:await De();if(!n)return"failed";try{return await Xt(n,"readwrite",r=>{let s;for(let[l,c]of Object.entries(t))s=r.put({key:l,value:c});return s})===null?"failed":"written"}finally{n.close()}}function Gt(){var t;try{return(t=window.indexedDB)!=null?t:null}catch(e){return null}}async function Jt(){let t=Gt();return t?await Oe(t)?{kind:"missing"}:new Promise(e=>{let n=!1,o=t.open($);o.onupgradeneeded=()=>{n=!0},o.onerror=()=>{console.warn("Syncify could not open Marketplace storage",o.error),e({kind:"unavailable"})},o.onblocked=()=>e({kind:"unavailable"}),o.onsuccess=()=>{let r=o.result;if(n){r.close(),Re(t).then(()=>e({kind:"missing"}));return}if(!r.objectStoreNames.contains(U)){r.close(),e({kind:"unavailable"});return}e({kind:"ok",db:r})}}):{kind:"unavailable"}}function De(){let t=Gt();return t?new Promise(e=>{let n=t.open($,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains(U)||o.createObjectStore(U,{keyPath:"key"})},n.onerror=()=>{console.warn("Syncify could not create Marketplace storage",n.error),e(null)},n.onblocked=()=>e(null),n.onsuccess=()=>e(n.result)}):Promise.resolve(null)}async function Oe(t){if(typeof t.databases!="function")return!1;try{return!(await t.databases()).some(n=>n.name===$)}catch(e){return!1}}function Re(t){return new Promise(e=>{let n=t.deleteDatabase($);n.onsuccess=()=>e(),n.onerror=()=>e(),n.onblocked=()=>e()})}function Xt(t,e,n){return new Promise(o=>{let r;try{r=t.transaction(U,e)}catch(y){console.warn("Syncify could not open a Marketplace transaction",y),o(null);return}let s,l=!1,c=y=>{l||(l=!0,o(y))};r.oncomplete=()=>c(s),r.onerror=()=>{console.warn("Syncify Marketplace transaction failed",r.error),c(null)},r.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",r.error),c(null)};let u;try{u=n(r.objectStore(U))}catch(y){console.warn("Syncify Marketplace request could not be issued",y),c(null);return}u&&(u.onsuccess=()=>{s=u.result},u.onerror=()=>{console.warn("Syncify Marketplace request failed",u.error),c(null)})})}var kt="marketplace:",Zt=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function Qt(){let t=We(),e=await qt();if(e)for(let[n,o]of Object.entries(e))n.startsWith(kt)&&(t[n]=o);return t}var je=new Set(["marketplace:active-tab","marketplace:sort"]),Fe="marketplace:installed:",Ke=["stars","tags","lastUpdated","created"];async function z(t){let e={};for(let[n,o]of Object.entries(t))je.has(n)||(e[n]=n.startsWith(Fe)?He(o):o);return W($t(e))}function He(t){try{let e=JSON.parse(t);if(!e||typeof e!="object"||Array.isArray(e))return t;for(let n of Ke)delete e[n];return e}catch(e){return t}}async function q(){let t=await Qt();return{keyCount:Object.keys(t).length,hash:await z(t),installedItemCount:V(t),marketplaceAvailable:Ye(t)}}async function te(){let t=await Qt();return{schema_version:1,metadata:{last_sync_datetime:new Date().toISOString(),device_info:zt(),marketplace_key_count:Object.keys(t).length},payload_hash:await z(t),marketplace_data:{keys:t}}}async function ee(t){var s,l;let e={},n=(l=(s=t.marketplace_data)==null?void 0:s.keys)!=null?l:{};for(let[c,u]of Object.entries(n))c.startsWith(kt)&&(e[c]=u);let o=Object.keys(e);if(o.length===0)return 0;for(let c of o)window.localStorage.setItem(c,e[c]);if(await Vt(e)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try the restore again.");return o.length}function V(t){return Zt.reduce((e,n)=>e+$e(t[n]),0)}function Ye(t){return!!(window.Marketplace||Zt.some(n=>t[n]!==void 0)||t["marketplace:tabs"]!==void 0)}function ne(t,e){return e===0?!1:t===0?!0:t<Math.max(2,Math.floor(e*.5))}function We(){let t={};for(let e=0;e<window.localStorage.length;e+=1){let n=window.localStorage.key(e);if(!(n!=null&&n.startsWith(kt)))continue;let o=window.localStorage.getItem(n);o!==null&&(t[n]=o)}return t}function $e(t){if(!t)return 0;try{let e=JSON.parse(t);return Array.isArray(e)?e.length:0}catch(e){return 0}}async function G(t){if(!gt(t))throw new Error("Syncify backup service is not configured.");let[e,n]=await Promise.all([St(),te()]);if(n.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:o}=await At(t.workerUrl,e,n);return{payload:n,unchanged:o}}async function A(t){var r;if(!gt(t))throw new Error("Syncify backup service is not configured.");let e=await Dt(t.workerUrl,await St()),n=await Promise.all(e.backups.map(ze)),o=n.filter((s,l)=>n.findIndex(c=>c.payload_hash===s.payload_hash)===l);return h(m({},e),{payload:(r=o[0])!=null?r:null,backups:o})}async function ze(t){var n,o;let e=(o=(n=t.marketplace_data)==null?void 0:n.keys)!=null?o:{};return h(m({},t),{payload_hash:await z(e)})}async function oe(t,e){let n=e!=null?e:(await A(t)).payload;if(!n)throw new Error("No Syncify cloud backup was found for this Spotify account.");let o=await ee(n);return{payload:n,restoredCount:o}}async function re(){var e,n,o;let t=N();if(!(!t.workerUrl||!t.autoBackupEnabled))try{let[r,s]=await Promise.all([q(),A(t)]),l=(n=(e=s.payload)==null?void 0:e.metadata.marketplace_key_count)!=null?n:0;if(s.exists&&ne(r.keyCount,l)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((o=s.payload)==null?void 0:o.payload_hash)===r.hash||r.keyCount===0)return;await G(t),Spicetify.showNotification("Syncify auto-backup complete")}catch(r){let s=r instanceof Error?r.message:String(r);console.warn("Syncify startup sync failed:",r),Spicetify.showNotification(`Syncify auto-sync skipped: ${s}`,!0,8e3)}}function ie(){let t=Spicetify.React,e=t.useEffect,n=t.useMemo,o=t.useState,[r,s]=o(()=>N()),[l,c]=o("idle"),[u,y]=o(null),[nt,se]=o(0),[xt,ce]=o(null),[g,le]=o(null),[k,wt]=o(null),[ot,vt]=o([]),[f,P]=o(null),[Et,rt]=o(!1),[ye,w]=o(!1),[b,D]=o(!1),[Ct,M]=o(null),O=n(()=>p(),[]),it=n(()=>Yt(),[]),S=l==="loading",R=(u==null?void 0:u.kind)==="warning"||(u==null?void 0:u.kind)==="error"?u:null,ue=!!(k&&g&&k.payload_hash!==g),at=!!(k&&g&&k.payload_hash===g),Nt=!!(f&&g&&f.payload_hash===g),fe=!!(g&&nt>0&&!ot.some(i=>i.payload_hash===g));e(()=>{Mt({silent:!0})},[]),e(()=>{if(!b)return;let i=a=>{a.preventDefault(),a.stopImmediatePropagation();let d=jt(a);if(d.kind!=="ignore"){if(d.kind==="cancel"){D(!1),M(null);return}if(d.kind==="error"){M(d.message);return}if(Ft(d.shortcut)){M(`${B(d.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}D(!1),st(d.shortcut)}};return window.addEventListener("keydown",i,!0),()=>window.removeEventListener("keydown",i,!0)},[b,r]);async function Pt(){let i=await q();return le(i.hash),se(i.installedItemCount),ce(i.marketplaceAvailable),i}async function Mt(i){try{w(!1),c("loading"),i!=null&&i.silent||y({kind:"info",text:"Checking your Syncify backup\u2026"}),await Pt();let a=await A(r);wt(a.payload),vt(a.backups),P(a.payload),rt(!0),c(a.exists?"success":"idle"),i!=null&&i.silent||y(a.exists&&a.payload?{kind:"success",text:`Backup found from ${X(a.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(a){lt(a)}}function de(i){let a=h(m({},r),{autoBackupEnabled:i});s(a),Y(a),y({kind:"success",text:i?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}function st(i){let a=h(m({},r),{shortcut:i});s(a),Y(a),mt(i),M(null),y({kind:"success",text:i?`${B(i)} now opens Syncify.`:"Keyboard shortcut turned off."})}function pe(i){let a=h(m({},r),{entryPoint:i});s(a),Y(a),F(i)}function me(){M(null),D(!0)}async function he(){try{w(!1),c("loading"),y({kind:"info",text:"Backing up your extensions and themes\u2026"});let{payload:i,unchanged:a}=await G(r);if(await Pt(),a){rt(!0),c("success"),y({kind:"success",text:"Everything is already backed up."}),Spicetify.showNotification("Syncify: everything is already backed up");return}wt(i),vt(d=>[i,...d.filter(ke=>ke.payload_hash!==i.payload_hash)].slice(0,qe)),P(i),rt(!0),c("success"),y({kind:"success",text:`Backed up ${i.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(i){lt(i)}}function ge(i=f){if(xt===!1){let a="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";y({kind:"error",text:a}),Spicetify.showNotification(a,!0,6e3);return}if(!i){let a="No Syncify cloud backup was found for this Spotify account.";y({kind:"error",text:a}),Spicetify.showNotification(a,!0,6e3);return}P(i),w(!0)}async function be(){try{w(!1),c("loading"),y({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:i,restoredCount:a}=await oe(r,f!=null?f:void 0);P(i),c("success"),y({kind:"success",text:`Restored ${a} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),setTimeout(()=>window.location.reload(),1e3)}catch(i){lt(i)}}function ct(i){if(i.startsWith("mailto:")){window.location.href=i;return}window.open(i,"_blank","noopener,noreferrer")}function lt(i){let a=i instanceof Error?i.message:String(i);c("error"),y({kind:"error",text:a}),Spicetify.showNotification(a,!0,6e3)}function yt(i){i.stopPropagation()}let Se=Et?k?ue?"Changes since your last backup":"Everything is backed up":"No backup yet":l==="error"?"Couldn't check your backup":"Checking your backup\u2026",Tt=Et?k?`Last backup ${X(k.metadata.last_sync_datetime)}`:"Save your extensions and themes so you can restore them after a reinstall or on another computer.":null;return t.createElement("div",{className:"syncify-panel",onClick:yt,onMouseDown:yt,onPointerDown:yt},t.createElement("section",{className:"syncify-status","aria-live":"polite"},t.createElement("div",{className:"syncify-status-text"},t.createElement("h3",{className:"syncify-status-title"},Se),t.createElement("p",{className:"syncify-muted"},Tt?`${Tt} \xB7 `:"",J(nt)," on this device")),t.createElement("button",{className:"syncify-button",type:"button",onClick:he,disabled:S||at,title:at?"No changes since your last backup":void 0},S?"Working\u2026":at?"Backed up":"Back up now")),R?t.createElement("div",{className:"syncify-alert","data-kind":R.kind},t.createElement("span",null,R.text),R.kind==="error"?t.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Mt()},disabled:S},"Try again"):null):null,ot.length>0?t.createElement("section",{className:"syncify-section","aria-label":"Backups"},t.createElement("h4",{className:"syncify-section-title"},"Backups"),t.createElement("div",{className:"syncify-backup-list",role:"radiogroup","aria-label":"Choose a backup to restore"},ot.map(i=>{let a=(f==null?void 0:f.payload_hash)===i.payload_hash,d=i.payload_hash===g;return t.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":a,"data-selected":a?"true":"false",type:"button",key:`${i.payload_hash}-${i.metadata.last_sync_datetime}`,onClick:()=>{P(i),w(!1)},disabled:S},t.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),t.createElement("span",{className:"syncify-backup-text"},t.createElement("span",{className:"syncify-backup-date"},X(i.metadata.last_sync_datetime)),t.createElement("span",{className:"syncify-muted"},J(V(i.marketplace_data.keys))," ","\xB7 from ",i.metadata.device_info)),d?t.createElement("span",{className:"syncify-tag",title:"What's on this device now"},"Current"):null)})),xt===!1?t.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to restore a backup."):ye?t.createElement("div",{className:"syncify-confirm"},t.createElement("p",null,"Replace this device's"," ",J(nt)," with the"," ",f?`${J(V(f.marketplace_data.keys))} from ${X(f.metadata.last_sync_datetime)}`:"selected backup","? Spotify will reload."),fe?t.createElement("p",{className:"syncify-muted","data-kind":"warning"},"Your current setup isn't backed up."):null,t.createElement("div",{className:"syncify-actions"},t.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>w(!1),disabled:S},"Cancel"),t.createElement("button",{className:"syncify-button",type:"button",onClick:be,disabled:S},"Restore"))):t.createElement("div",{className:"syncify-actions"},Nt?t.createElement("span",{className:"syncify-muted syncify-actions-hint"},"This backup is already current."):null,t.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>ge(),disabled:S||!f||Nt},"Restore backup"))):null,t.createElement("section",{className:"syncify-section","aria-label":"Settings"},t.createElement("h4",{className:"syncify-section-title"},"Settings"),t.createElement("label",{className:"syncify-setting"},t.createElement("span",{className:"syncify-setting-text"},t.createElement("span",null,"Back up automatically"),t.createElement("span",{className:"syncify-muted"},"When Spotify starts and something has changed")),t.createElement("input",{className:"syncify-switch",type:"checkbox",role:"switch",checked:r.autoBackupEnabled,onChange:i=>de(i.currentTarget.checked),disabled:S})),t.createElement("label",{className:"syncify-setting"},t.createElement("span",{className:"syncify-setting-text"},t.createElement("span",null,"Open Syncify from"),it?r.entryPoint==="menu"&&!r.shortcut?t.createElement("span",{className:"syncify-muted"},"Keep a shortcut in case a Spotify update breaks the menu"):null:t.createElement("span",{className:"syncify-muted"},"The profile menu isn't available in this Spicetify version")),t.createElement("select",{className:"syncify-select",value:it?r.entryPoint:"topbar",onChange:i=>pe(i.currentTarget.value),disabled:!it},Ve.map(i=>t.createElement("option",{key:i.value,value:i.value},i.label)))),t.createElement("div",{className:"syncify-setting"},t.createElement("span",{className:"syncify-setting-text"},t.createElement("span",null,"Keyboard shortcut"),Ct?t.createElement("span",{className:"syncify-muted","data-kind":"warning"},Ct):b?t.createElement("span",{className:"syncify-muted"},"Press a key combination, or Esc to cancel"):null),t.createElement("span",{className:"syncify-shortcut"},r.shortcut&&!b?t.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>st(null)},"Turn off"):null,!r.shortcut&&!b?t.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>st(C)},"Use default"):null,t.createElement("button",{className:"syncify-key",type:"button","data-recording":b?"true":"false",onClick:()=>b?D(!1):me(),title:"Click to change"},b?"Press keys\u2026":r.shortcut?B(r.shortcut):"Off")))),t.createElement("footer",{className:"syncify-footer"},t.createElement("span",null,"Syncify ",O.version),t.createElement("span",{className:"syncify-footer-links"},t.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ct(O.issueUrl)},"Report an issue"),t.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ct(O.githubUrl)},"GitHub"),t.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ct(O.kofiUrl)},"Support on Ko-fi"))))}var qe=3,Ve=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function J(t){return t===1?"1 extension or theme":`${t} extensions and themes`}function X(t){let e=new Date(t);if(Number.isNaN(e.getTime()))return t;let n=e.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),o=new Date,r=new Date(o);return r.setDate(o.getDate()-1),e.toDateString()===o.toDateString()?`today, ${n}`:e.toDateString()===r.toDateString()?`yesterday, ${n}`:`${e.toLocaleDateString(void 0,{month:"short",day:"numeric",year:e.getFullYear()===o.getFullYear()?void 0:"numeric"})}, ${n}`}var Z="[Syncify]";function x(t,e){if(e===void 0){console.debug(Z,t);return}console.debug(Z,t,e)}function tt(t,e){if(e===void 0){console.warn(Z,t);return}console.warn(Z,t,e)}(function t(){if(!Ge()){setTimeout(t,100);return}x("Spicetify APIs ready"),Je()})();function Ge(){var t;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((t=Spicetify==null?void 0:Spicetify.Topbar)!=null&&t.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}function Je(){Xe();let t=N();Wt({topbarButton:Ze(),menuItem:rn()}),F(t.entryPoint),pt(t.shortcut,et),re().catch(e=>{tt("Startup sync check failed",e)})}function Xe(){let t="syncify-styles";if(document.getElementById(t))return;let e=document.createElement("style");e.id=t,e.textContent=It,document.head.appendChild(e)}function Ze(){let{extensionName:t}=p(),e=new Spicetify.Topbar.Button(t,ut,n=>{x("Topbar button clicked",Q(n)),et()},!1,!0);return ae(e),en(e),sn(e),x("Topbar button registered",Q(e)),e}function ae(t){var n;let e=t;t.element.style.setProperty("-webkit-app-region","no-drag"),(n=e.button)==null||n.style.setProperty("-webkit-app-region","no-drag")}var Qe=".main-actionButtons",tn=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function en(t){if(typeof MutationObserver=="undefined")return;let e=!1,n=()=>{e=!1;let o=t.element,r=document.querySelector(Qe);!o||!r||r.contains(o)||(r.prepend(o),nn(t),ae(t),x("Topbar button re-attached",Q(t)))};new MutationObserver(()=>{e||(e=!0,setTimeout(n,250))}).observe(document.body,{childList:!0,subtree:!0}),n()}function nn(t){let e=on(t);if(!e||e.className&&e.className!=="undefined")return;let n=Array.from(document.querySelectorAll(tn)).find(o=>!t.element.contains(o));n!=null&&n.className&&(e.className=n.className)}function on(t){return t.button}function rn(){var t;if(typeof((t=Spicetify.Menu)==null?void 0:t.Item)!="function")return null;try{return new Spicetify.Menu.Item(p().extensionName,!1,()=>et(),an())}catch(e){return tt("Failed to create profile menu item",e),null}}function an(){return ut.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function sn(t){Object.assign(window,{SyncifyDebug:{button:t,element:t.element,openModal:et,inspect:()=>Q(t),clickElement:()=>{var e;return(e=t.element)==null?void 0:e.click()},clickInnerButton:()=>{var e;return(e=t.button)==null?void 0:e.click()},clickCallback:()=>t.onClick(t)}})}function Q(t){var e,n,o,r,s;return{label:t.label,disabled:t.disabled,isRight:t.isRight,hasElement:!!t.element,elementConnected:(e=t.element)==null?void 0:e.isConnected,elementDisabled:(n=t.element)==null?void 0:n.disabled,elementAriaDisabled:(o=t.element)==null?void 0:o.getAttribute("aria-disabled"),elementClass:(r=t.element)==null?void 0:r.className,appRegion:t.element?getComputedStyle(t.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:t.button?getComputedStyle(t.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:t.element?getComputedStyle(t.element).pointerEvents:null,visibility:t.element?getComputedStyle(t.element).visibility:null,display:t.element?getComputedStyle(t.element).display:null,rect:(s=t.element)==null?void 0:s.getBoundingClientRect().toJSON()}}function et(){x("Opening modal");let t=document.createElement("div");try{Spicetify.PopupModal.display({title:p().extensionName,content:t,isLarge:!1})}catch(e){throw tt("Failed to open PopupModal",e),e}cn(t),yn(t)}function cn(t){requestAnimationFrame(()=>{let e=ln(t);e==null||e.classList.add("syncify-modal-shell");let n=e==null?void 0:e.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');n&&(n.classList.add("syncify-modal-close"),n.setAttribute("aria-label",`Close ${p().extensionName}`),n.title="Close",n.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function ln(t){let e=t.parentElement;for(;e&&e!==document.body;){if(e.querySelector(".main-trackCreditsModal-header"))return e;e=e.parentElement}return t.closest('[class*="trackCreditsModal"]')}function yn(t){try{let e=Spicetify.React.createElement(ie);if(typeof Spicetify.ReactDOM.createRoot=="function"){Spicetify.ReactDOM.createRoot(t).render(e),x("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(e,t),x("Modal rendered",{renderer:"render"})}catch(e){throw tt("Failed to render modal",e),e}}})();
