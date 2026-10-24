// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var Ie=Object.defineProperty,Ae=Object.defineProperties;var Ue=Object.getOwnPropertyDescriptors;var Ut=Object.getOwnPropertySymbols;var Oe=Object.prototype.hasOwnProperty,De=Object.prototype.propertyIsEnumerable;var Ot=(t,e,n)=>e in t?Ie(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,m=(t,e)=>{for(var n in e||(e={}))Oe.call(e,n)&&Ot(t,n,e[n]);if(Ut)for(var n of Ut(e))De.call(e,n)&&Ot(t,n,e[n]);return t},h=(t,e)=>Ae(t,Ue(e));var Dt=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var ft=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var Lt="x-syncify-user-hash";async function Rt(t,e,n){let o=await fetch(t,{method:"POST",headers:{"content-type":"application/json",[Lt]:e},body:JSON.stringify(n)});if(!o.ok)throw new Error(`Backup failed with HTTP ${o.status}.`);let i=await o.json().catch(()=>null);return{unchanged:(i==null?void 0:i.unchanged)===!0}}async function jt(t,e){var s;let n=await fetch(t,{method:"GET",headers:{[Lt]:e}});if(n.status===404)return{exists:!1,payload:null,backups:[]};if(!n.ok)throw new Error(`Restore failed with HTTP ${n.status}.`);let o=await n.json(),i=[o,...(s=o.backup_history)!=null?s:[]].slice(0,3);return{exists:!0,payload:o,backups:i}}var E={extensionName:"Syncify",version:"1.2.2",workerUrl:"https://syncify-worker.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"https://github.com/wSoltani/Syncify/issues/new"};function p(){var e,n,o,i,s,l;let t=window.SyncifyConfig;return{extensionName:(e=I(t==null?void 0:t.extensionName))!=null?e:E.extensionName,version:(n=Ft(t==null?void 0:t.version))!=null?n:E.version,workerUrl:(o=I(t==null?void 0:t.workerUrl))!=null?o:E.workerUrl,githubUrl:(i=I(t==null?void 0:t.githubUrl))!=null?i:E.githubUrl,kofiUrl:(s=I(t==null?void 0:t.kofiUrl))!=null?s:E.kofiUrl,issueUrl:(l=I(t==null?void 0:t.issueUrl))!=null?l:E.issueUrl}}function I(t){return Ft(t)}function Ft(t){return typeof t=="string"&&t.trim()?t.trim():null}var N={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},je=/^([a-z0-9]|f([1-9]|1[0-2]))$/,Fe=250,Ke=40,dt=null,K=null,C=null;function Kt(){return/mac/i.test(navigator.platform||navigator.userAgent)}function Ht(t){if(t===null)return null;if(!t||typeof t!="object")return N;let e=t;return typeof e.key!="string"||!je.test(e.key)?N:{key:e.key,ctrl:!!e.ctrl,alt:!!e.alt,shift:!!e.shift,meta:!!e.meta}}function A(t){if(!t)return"Off";let e=t.key.toUpperCase();return Kt()?[t.ctrl?"\u2318":"",t.alt?"\u2325":"",t.shift?"\u21E7":"",e].join(""):[t.ctrl&&"Ctrl",t.meta&&"Win",t.alt&&"Alt",t.shift&&"Shift",e].filter(Boolean).join("+")}function Yt(t){if(t.key==="Escape")return{kind:"cancel"};let e=He(t.code);if(!e)return{kind:"ignore"};let n=Kt();if(n&&t.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let o={key:e,ctrl:n?t.metaKey:t.ctrlKey,alt:t.altKey,shift:t.shiftKey,meta:n?!1:t.metaKey},i=e.startsWith("f")&&e.length>1;return!o.ctrl&&!o.alt&&!o.meta&&!i?{kind:"error",message:`Include ${n?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:o}}function He(t){var n,o;let e=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(t);return e?((o=(n=e[1])!=null?n:e[2])!=null?o:e[3]).toLowerCase():null}function $t(t){var e;if(C&&Ye(C,t))return!1;try{let n=Spicetify.Mousetrap,o=(e=n.trigger)==null?void 0:e.call(n)._directMap;if(!o)return!1;let i=pt(t);return Object.keys(o).some(s=>s.startsWith(`${i}:`))}catch(n){return!1}}function mt(t,e,n=0){if(dt=e,K=t,!Wt()){if(n>=Ke){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>mt(K,e,n+1),Fe);return}ht(K)}function ht(t){if(K=t,!Wt()||!dt)return;let e=dt;try{if(C&&Spicetify.Keyboard._deregisterShortcut(C),C=null,!t)return;Spicetify.Keyboard.registerShortcut(t,n=>{n.preventDefault(),e()}),C=t,console.debug("[Syncify]","Keyboard shortcut registered",A(t))}catch(n){console.warn("[Syncify]","Failed to register keyboard shortcut",n)}}function Wt(){var t;return typeof((t=Spicetify.Keyboard)==null?void 0:t.registerShortcut)=="function"}function pt(t){return[t.ctrl&&"mod",t.meta&&"meta",t.alt&&"alt",t.shift&&"shift",t.key].filter(Boolean).join("+")}function Ye(t,e){return pt(t)===pt(e)}var gt="both",$e=["both","topbar","menu"],U=null,O=null,H=!1;function zt(t){return $e.includes(t)?t:gt}function qt(){var t;return typeof((t=Spicetify.Menu)==null?void 0:t.Item)=="function"}function Vt(t){U=t.topbarButton,O=t.menuItem}function Y(t){let e=t!=="menu"||!O,n=t!=="topbar";if(U!=null&&U.element&&(U.element.style.display=e?"":"none"),!!O)try{n&&!H?(O.register(),H=!0):!n&&H&&(O.deregister(),H=!1)}catch(o){console.warn("[Syncify]","Failed to update profile menu item",o)}}var W="syncify:config",$={workerUrl:p().workerUrl,autoBackupEnabled:!1,shortcut:N,entryPoint:gt};function P(){var n,o;let t=p(),e=(o=(n=Spicetify.LocalStorage)==null?void 0:n.get(W))!=null?o:window.localStorage.getItem(W);if(!e)return h(m({},$),{workerUrl:t.workerUrl});try{let i=JSON.parse(e);return{workerUrl:t.workerUrl,autoBackupEnabled:i.autoBackupEnabled===void 0?$.autoBackupEnabled:!!i.autoBackupEnabled,shortcut:i.shortcut===void 0?$.shortcut:Ht(i.shortcut),entryPoint:zt(i.entryPoint)}}catch(i){return h(m({},$),{workerUrl:t.workerUrl})}}function z(t){var n;let e=JSON.stringify({workerUrl:p().workerUrl,autoBackupEnabled:t.autoBackupEnabled,shortcut:t.shortcut,entryPoint:t.entryPoint});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set(W,e);return}window.localStorage.setItem(W,e)}function bt(t){return typeof t.workerUrl=="string"&&t.workerUrl.length>0}async function q(t){let e=new TextEncoder().encode(t),n=await crypto.subtle.digest("SHA-256",e);return[...new Uint8Array(n)].map(o=>o.toString(16).padStart(2,"0")).join("")}function Gt(t){return JSON.stringify(St(t))}function St(t){return Array.isArray(t)?t.map(St):t&&typeof t=="object"?Object.keys(t).sort().reduce((e,n)=>(e[n]=St(t[n]),e),{}):t}async function kt(){let t=await We();return q(t)}async function We(){var o,i,s,l,c;let t=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(t!=null&&t.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let e=await t.getUser(),n=(c=(l=(s=(i=e==null?void 0:e.username)!=null?i:e==null?void 0:e.canonicalUsername)!=null?s:e==null?void 0:e.id)!=null?l:e==null?void 0:e.uri)!=null?c:e==null?void 0:e.displayName;if(!n)throw new Error("Unable to resolve the active Spotify user.");return n}function Jt(){let t=navigator.userAgent;return/Windows/i.test(t)?"Windows":/Mac OS|Macintosh/i.test(t)?"macOS":/Linux/i.test(t)?"Linux":t}var V="spicetify-marketplace";var D="settings";async function Xt(){let t=await te();if(t.kind!=="ok")return null;try{let e=await ee(t.db,"readonly",o=>o.getAll());if(!e)return null;let n={};for(let o of e)typeof(o==null?void 0:o.key)=="string"&&typeof o.value=="string"&&(n[o.key]=o.value);return n}finally{t.db.close()}}async function Zt(t){let e=await te();if(e.kind==="unavailable")return"unavailable";let n=e.kind==="ok"?e.db:await ze();if(!n)return"failed";try{return await ee(n,"readwrite",i=>{let s;for(let[l,c]of Object.entries(t))s=i.put({key:l,value:c});return s})===null?"failed":"written"}finally{n.close()}}function Qt(){var t;try{return(t=window.indexedDB)!=null?t:null}catch(e){return null}}async function te(){let t=Qt();return t?await qe(t)?{kind:"missing"}:new Promise(e=>{let n=!1,o=t.open(V);o.onupgradeneeded=()=>{n=!0},o.onerror=()=>{console.warn("Syncify could not open Marketplace storage",o.error),e({kind:"unavailable"})},o.onblocked=()=>e({kind:"unavailable"}),o.onsuccess=()=>{let i=o.result;if(n){i.close(),Ve(t).then(()=>e({kind:"missing"}));return}if(!i.objectStoreNames.contains(D)){i.close(),e({kind:"unavailable"});return}e({kind:"ok",db:i})}}):{kind:"unavailable"}}function ze(){let t=Qt();return t?new Promise(e=>{let n=t.open(V,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains(D)||o.createObjectStore(D,{keyPath:"key"})},n.onerror=()=>{console.warn("Syncify could not create Marketplace storage",n.error),e(null)},n.onblocked=()=>e(null),n.onsuccess=()=>e(n.result)}):Promise.resolve(null)}async function qe(t){if(typeof t.databases!="function")return!1;try{return!(await t.databases()).some(n=>n.name===V)}catch(e){return!1}}function Ve(t){return new Promise(e=>{let n=t.deleteDatabase(V);n.onsuccess=()=>e(),n.onerror=()=>e(),n.onblocked=()=>e()})}function ee(t,e,n){return new Promise(o=>{let i;try{i=t.transaction(D,e)}catch(y){console.warn("Syncify could not open a Marketplace transaction",y),o(null);return}let s,l=!1,c=y=>{l||(l=!0,o(y))};i.oncomplete=()=>c(s),i.onerror=()=>{console.warn("Syncify Marketplace transaction failed",i.error),c(null)},i.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",i.error),c(null)};let u;try{u=n(i.objectStore(D))}catch(y){console.warn("Syncify Marketplace request could not be issued",y),c(null);return}u&&(u.onsuccess=()=>{s=u.result},u.onerror=()=>{console.warn("Syncify Marketplace request failed",u.error),c(null)})})}var xt="marketplace:",ne=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function oe(){let t=en(),e=await Xt();if(e)for(let[n,o]of Object.entries(e))n.startsWith(xt)&&(t[n]=o);return t}var Je=new Set(["marketplace:active-tab","marketplace:sort"]),Xe="marketplace:installed:",Ze=["stars","tags","lastUpdated","created"];async function G(t){let e={};for(let[n,o]of Object.entries(t))Je.has(n)||(e[n]=n.startsWith(Xe)?Qe(o):o);return q(Gt(e))}function Qe(t){try{let e=JSON.parse(t);if(!e||typeof e!="object"||Array.isArray(e))return t;for(let n of Ze)delete e[n];return e}catch(e){return t}}async function J(){let t=await oe();return{keyCount:Object.keys(t).length,hash:await G(t),installedItemCount:X(t),marketplaceAvailable:tn(t)}}async function ie(){let t=await oe();return{schema_version:1,metadata:{last_sync_datetime:new Date().toISOString(),device_info:Jt(),marketplace_key_count:Object.keys(t).length},payload_hash:await G(t),marketplace_data:{keys:t}}}async function re(t){var s,l;let e={},n=(l=(s=t.marketplace_data)==null?void 0:s.keys)!=null?l:{};for(let[c,u]of Object.entries(n))c.startsWith(xt)&&(e[c]=u);let o=Object.keys(e);if(o.length===0)return 0;for(let c of o)window.localStorage.setItem(c,e[c]);if(await Zt(e)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try the restore again.");return o.length}function X(t){return ne.reduce((e,n)=>e+nn(t[n]),0)}function tn(t){return!!(window.Marketplace||ne.some(n=>t[n]!==void 0)||t["marketplace:tabs"]!==void 0)}function ae(t,e){return e===0?!1:t===0?!0:t<Math.max(2,Math.floor(e*.5))}function en(){let t={};for(let e=0;e<window.localStorage.length;e+=1){let n=window.localStorage.key(e);if(!(n!=null&&n.startsWith(xt)))continue;let o=window.localStorage.getItem(n);o!==null&&(t[n]=o)}return t}function nn(t){if(!t)return 0;try{let e=JSON.parse(t);return Array.isArray(e)?e.length:0}catch(e){return 0}}async function Z(t){if(!bt(t))throw new Error("Syncify backup service is not configured.");let[e,n]=await Promise.all([kt(),ie()]);if(n.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:o}=await Rt(t.workerUrl,e,n);return{payload:n,unchanged:o}}async function L(t){var i;if(!bt(t))throw new Error("Syncify backup service is not configured.");let e=await jt(t.workerUrl,await kt()),n=await Promise.all(e.backups.map(on)),o=n.filter((s,l)=>n.findIndex(c=>c.payload_hash===s.payload_hash)===l);return h(m({},e),{payload:(i=o[0])!=null?i:null,backups:o})}var wt=new Map;async function on(t){var o,i,s;let e=`${t.payload_hash} ${(o=t.metadata)==null?void 0:o.last_sync_datetime}`,n=wt.get(e);return n||(n=G((s=(i=t.marketplace_data)==null?void 0:i.keys)!=null?s:{}),wt.set(e,n),n.catch(()=>wt.delete(e))),h(m({},t),{payload_hash:await n})}async function se(t,e){let n=e!=null?e:(await L(t)).payload;if(!n)throw new Error("No Syncify cloud backup was found for this Spotify account.");let o=await re(n);return{payload:n,restoredCount:o}}async function ce(){var e,n,o;let t=P();if(!(!t.workerUrl||!t.autoBackupEnabled))try{let[i,s]=await Promise.all([J(),L(t)]),l=(n=(e=s.payload)==null?void 0:e.metadata.marketplace_key_count)!=null?n:0;if(s.exists&&ae(i.keyCount,l)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((o=s.payload)==null?void 0:o.payload_hash)===i.hash||i.keyCount===0)return;await Z(t),Spicetify.showNotification("Syncify auto-backup complete")}catch(i){let s=i instanceof Error?i.message:String(i);console.warn("Syncify startup sync failed:",i),Spicetify.showNotification(`Syncify auto-sync skipped: ${s}`,!0,8e3)}}function le(){let t=Spicetify.React,e=t.useEffect,n=t.useMemo,o=t.useState,[i,s]=o(()=>P()),[l,c]=o("idle"),[u,y]=o(null),[rt,de]=o(0),[vt,pe]=o(null),[g,me]=o(null),[x,Et]=o(null),[b,Ct]=o([]),[f,T]=o(null),[Nt,at]=o(!1),[he,w]=o(!1),[S,M]=o(!1),[Pt,B]=o(null),[ge,be]=o(null),[R,Se]=o(!1),j=n(()=>p(),[]),ke=n(()=>new Map(b.map(r=>[r,X(r.marketplace_data.keys)])),[b]),Tt=r=>{var a;return(a=ke.get(r))!=null?a:X(r.marketplace_data.keys)},st=n(()=>qt(),[]),k=l==="loading",F=(u==null?void 0:u.kind)==="warning"||(u==null?void 0:u.kind)==="error"?u:null,xe=!!(x&&g&&x.payload_hash!==g),_=!!(x&&g&&x.payload_hash===g),Mt=!!(f&&g&&f.payload_hash===g),Bt=R||!_||b.length<2,we=Bt?b:b.slice(0,1),ve=!!(g&&rt>0&&!b.some(r=>r.payload_hash===g));e(()=>{It({silent:!0})},[]),e(()=>{if(!S)return;let r=a=>{a.preventDefault(),a.stopImmediatePropagation();let d=Yt(a);if(d.kind!=="ignore"){if(d.kind==="cancel"){M(!1),B(null);return}if(d.kind==="error"){B(d.message);return}if($t(d.shortcut)){B(`${A(d.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}M(!1),ct(d.shortcut)}};return window.addEventListener("keydown",r,!0),()=>window.removeEventListener("keydown",r,!0)},[S,i]);async function _t(){let r=await J();return me(r.hash),de(r.installedItemCount),pe(r.marketplaceAvailable),r}async function It(r){try{w(!1),c("loading"),r!=null&&r.silent||y({kind:"info",text:"Checking your Syncify backup\u2026"}),await _t();let a=await L(i);Et(a.payload),Ct(a.backups),T(a.payload),at(!0),c(a.exists?"success":"idle"),r!=null&&r.silent||y(a.exists&&a.payload?{kind:"success",text:`Backup found from ${tt(a.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(a){yt(a)}}function Ee(r){let a=h(m({},i),{autoBackupEnabled:r});s(a),z(a),y({kind:"success",text:r?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}function ct(r){let a=h(m({},i),{shortcut:r});s(a),z(a),ht(r),B(null),y({kind:"success",text:r?`${A(r)} now opens Syncify.`:"Keyboard shortcut turned off."})}function Ce(r){let a=h(m({},i),{entryPoint:r});s(a),z(a),Y(r)}function Ne(){B(null),M(!0)}async function Pe(){try{w(!1),c("loading"),y({kind:"info",text:"Backing up your extensions and themes\u2026"});let{payload:r,unchanged:a}=await Z(i);if(await _t(),a){at(!0),c("success"),y({kind:"success",text:"Everything is already backed up."}),Spicetify.showNotification("Syncify: everything is already backed up");return}Et(r),Ct(d=>[r,...d.filter(_e=>_e.payload_hash!==r.payload_hash)].slice(0,sn)),T(r),at(!0),c("success"),y({kind:"success",text:`Backed up ${r.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(r){yt(r)}}function Te(r=f){if(vt===!1){let a="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";y({kind:"error",text:a}),Spicetify.showNotification(a,!0,6e3);return}if(!r){let a="No Syncify cloud backup was found for this Spotify account.";y({kind:"error",text:a}),Spicetify.showNotification(a,!0,6e3);return}T(r),w(!0)}async function Me(){try{w(!1),c("loading"),y({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:r,restoredCount:a}=await se(i,f!=null?f:void 0);T(r),c("success"),y({kind:"success",text:`Restored ${a} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),setTimeout(()=>window.location.reload(),1e3)}catch(r){yt(r)}}function lt(r){if(r.startsWith("mailto:")){window.location.href=r;return}window.open(r,"_blank","noopener,noreferrer")}function yt(r){let a=r instanceof Error?r.message:String(r);c("error"),y({kind:"error",text:a}),Spicetify.showNotification(a,!0,6e3)}function ut(r){r.stopPropagation()}let Be=Nt?x?xe?"Changes since your last backup":"Everything is backed up":"No backup yet":l==="error"?"Couldn't check your backup":"Checking your backup\u2026",At=Nt?x?`Last backup ${tt(x.metadata.last_sync_datetime)}`:"Save your extensions and themes so you can restore them after a reinstall or on another computer.":null;return t.createElement("div",{className:"syncify-panel",onClick:ut,onMouseDown:ut,onPointerDown:ut},F?t.createElement("div",{className:"syncify-alert","data-kind":F.kind},t.createElement("span",null,F.text),t.createElement("span",{className:"syncify-alert-actions"},F.kind==="error"?t.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{It()},disabled:k},"Try again"):null,t.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>y(null)},t.createElement(an,null)))):null,t.createElement("section",{className:"syncify-status","aria-live":"polite"},t.createElement("div",{className:"syncify-status-text"},t.createElement("h3",{className:"syncify-status-title"},Be),t.createElement("p",{className:"syncify-muted"},At?`${At} \xB7 `:"",Q(rt)," on this device")),t.createElement("button",{className:"syncify-button",type:"button",onClick:Pe,disabled:k||_,title:_?"No changes since your last backup":void 0},k?"Working\u2026":_?"Backed up":"Back up now")),b.length>0?t.createElement("section",{className:"syncify-section","aria-label":"Backups"},t.createElement("div",{className:"syncify-section-header"},t.createElement("h4",{className:"syncify-section-title"},"Backups"),_&&b.length>1?t.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":R,"aria-controls":"syncify-backup-list",onClick:()=>{Se(!R),w(!1)}},R?"Show less":`Show all ${b.length}`,t.createElement(ye,null)):null),t.createElement("div",{className:"syncify-backup-list",id:"syncify-backup-list",role:"radiogroup","aria-label":"Choose a backup to restore"},we.map(r=>{let a=(f==null?void 0:f.payload_hash)===r.payload_hash,d=r.payload_hash===g;return t.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":a,"data-selected":a?"true":"false",type:"button",key:`${r.payload_hash}-${r.metadata.last_sync_datetime}`,onClick:()=>{T(r),w(!1)},disabled:k},t.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),t.createElement("span",{className:"syncify-backup-text"},t.createElement("span",{className:"syncify-backup-date"},tt(r.metadata.last_sync_datetime)),t.createElement("span",{className:"syncify-muted"},Q(Tt(r))," ","\xB7 from ",r.metadata.device_info)),d?t.createElement("span",{className:"syncify-tag",title:"What's on this device now"},"Current"):null)})),Bt?vt===!1?t.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to restore a backup."):he?t.createElement("div",{className:"syncify-confirm"},t.createElement("p",null,"Replace this device's"," ",Q(rt)," with the"," ",f?`${Q(Tt(f))} from ${tt(f.metadata.last_sync_datetime)}`:"selected backup","? Spotify will reload."),ve?t.createElement("p",{className:"syncify-muted","data-kind":"warning"},"Your current setup isn't backed up."):null,t.createElement("div",{className:"syncify-actions"},t.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>w(!1),disabled:k},"Cancel"),t.createElement("button",{className:"syncify-button",type:"button",onClick:Me,disabled:k},"Restore"))):t.createElement("div",{className:"syncify-actions"},Mt?t.createElement("span",{className:"syncify-muted syncify-actions-hint"},"This backup is already current."):null,t.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>Te(),disabled:k||!f||Mt},"Restore backup")):null):null,t.createElement("div",{className:"syncify-accordion"},t.createElement(rn,{id:"settings",title:"Settings",openSection:ge,onToggle:r=>{be(r),r!=="settings"&&M(!1)}},t.createElement("label",{className:"syncify-setting"},t.createElement("span",{className:"syncify-setting-text"},t.createElement("span",null,"Back up automatically"),t.createElement("span",{className:"syncify-muted"},"When Spotify starts and something has changed")),t.createElement("input",{className:"syncify-switch",type:"checkbox",role:"switch",checked:i.autoBackupEnabled,onChange:r=>Ee(r.currentTarget.checked),disabled:k})),t.createElement("label",{className:"syncify-setting"},t.createElement("span",{className:"syncify-setting-text"},t.createElement("span",null,"Open Syncify from"),st?i.entryPoint==="menu"&&!i.shortcut?t.createElement("span",{className:"syncify-muted"},"Keep a shortcut in case a Spotify update breaks the menu"):null:t.createElement("span",{className:"syncify-muted"},"The profile menu isn't available in this Spicetify version")),t.createElement("select",{className:"syncify-select",value:st?i.entryPoint:"topbar",onChange:r=>Ce(r.currentTarget.value),disabled:!st},cn.map(r=>t.createElement("option",{key:r.value,value:r.value},r.label)))),t.createElement("div",{className:"syncify-setting"},t.createElement("span",{className:"syncify-setting-text"},t.createElement("span",null,"Keyboard shortcut"),Pt?t.createElement("span",{className:"syncify-muted","data-kind":"warning"},Pt):S?t.createElement("span",{className:"syncify-muted"},"Press a key combination, or Esc to cancel"):null),t.createElement("span",{className:"syncify-shortcut"},i.shortcut&&!S?t.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ct(null)},"Turn off"):null,!i.shortcut&&!S?t.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ct(N)},"Use default"):null,t.createElement("button",{className:"syncify-key",type:"button","data-recording":S?"true":"false",onClick:()=>S?M(!1):Ne(),title:"Click to change"},S?"Press keys\u2026":i.shortcut?A(i.shortcut):"Off"))))),t.createElement("footer",{className:"syncify-footer"},t.createElement("span",null,"Syncify ",j.version),t.createElement("span",{className:"syncify-footer-links"},t.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>lt(j.issueUrl)},"Report an issue"),t.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>lt(j.githubUrl)},"GitHub"),t.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>lt(j.kofiUrl)},"Support on Ko-fi"))))}function rn(t){let e=Spicetify.React,n=t.openSection===t.id,o=`syncify-section-${t.id}`;return e.createElement("section",{className:"syncify-accordion-section","aria-label":t.title},e.createElement("button",{className:"syncify-accordion-header",type:"button","aria-expanded":n,"aria-controls":o,onClick:()=>t.onToggle(n?null:t.id)},e.createElement("span",{className:"syncify-accordion-title"},t.title),e.createElement(ye,null)),n?e.createElement("div",{className:"syncify-accordion-body",id:o},t.children):null)}function ye(){let t=Spicetify.React;return t.createElement("svg",{className:"syncify-chevron",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},t.createElement("path",{d:"m9 6 6 6-6 6"}))}function an(){let t=Spicetify.React;return t.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},t.createElement("path",{d:"M18 6 6 18"}),t.createElement("path",{d:"m6 6 12 12"}))}var sn=3,cn=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function Q(t){return t===1?"1 extension or theme":`${t} extensions and themes`}function tt(t){let e=new Date(t);if(Number.isNaN(e.getTime()))return t;let n=e.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),o=new Date,i=new Date(o);return i.setDate(o.getDate()-1),e.toDateString()===o.toDateString()?`today, ${n}`:e.toDateString()===i.toDateString()?`yesterday, ${n}`:`${e.toLocaleDateString(void 0,{month:"short",day:"numeric",year:e.getFullYear()===o.getFullYear()?void 0:"numeric"})}, ${n}`}var et="[Syncify]";function v(t,e){if(e===void 0){console.debug(et,t);return}console.debug(et,t,e)}function ot(t,e){if(e===void 0){console.warn(et,t);return}console.warn(et,t,e)}function ln(){var t;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((t=Spicetify==null?void 0:Spicetify.Topbar)!=null&&t.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}function yn(){un();let t=P();Vt({topbarButton:fn(),menuItem:bn()}),Y(t.entryPoint),mt(t.shortcut,it),ce().catch(e=>{ot("Startup sync check failed",e)})}function un(){let t="syncify-styles";if(document.getElementById(t))return;let e=document.createElement("style");e.id=t,e.textContent=Dt,document.head.appendChild(e)}function fn(){let{extensionName:t}=p(),e=new Spicetify.Topbar.Button(t,ft,n=>{v("Topbar button clicked",nt(n)),it()},!1,!0);return fe(e),mn(e),kn(e),v("Topbar button registered",nt(e)),e}function fe(t){var n;let e=t;t.element.style.setProperty("-webkit-app-region","no-drag"),(n=e.button)==null||n.style.setProperty("-webkit-app-region","no-drag")}var ue=".main-actionButtons",dn=".Root__globalNav, .Root__top-bar",pn=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function mn(t){if(typeof MutationObserver=="undefined")return;let e=!1,n=null,o=()=>{e=!1,s();let l=t.element,c=document.querySelector(ue);!l||!c||c.contains(l)||(c.prepend(l),hn(t),fe(t),v("Topbar button re-attached",nt(t)))},i=new MutationObserver(()=>{e||(e=!0,setTimeout(o,250))}),s=()=>{var u;if(n!=null&&n.isConnected)return;let l=document.querySelector(ue),c=(u=l==null?void 0:l.closest(dn))!=null?u:l==null?void 0:l.parentElement;if(i.disconnect(),n=c!=null?c:null,!c){i.observe(document.body,{childList:!0,subtree:!0});return}i.observe(c,{childList:!0,subtree:!0});for(let y=c.parentElement;y;y=y.parentElement)i.observe(y,{childList:!0})};o()}function hn(t){let e=gn(t);if(!e||e.className&&e.className!=="undefined")return;let n=Array.from(document.querySelectorAll(pn)).find(o=>!t.element.contains(o));n!=null&&n.className&&(e.className=n.className)}function gn(t){return t.button}function bn(){var t;if(typeof((t=Spicetify.Menu)==null?void 0:t.Item)!="function")return null;try{return new Spicetify.Menu.Item(p().extensionName,!1,()=>it(),Sn())}catch(e){return ot("Failed to create profile menu item",e),null}}function Sn(){return ft.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function kn(t){Object.assign(window,{SyncifyDebug:{button:t,element:t.element,openModal:it,inspect:()=>nt(t),clickElement:()=>{var e;return(e=t.element)==null?void 0:e.click()},clickInnerButton:()=>{var e;return(e=t.button)==null?void 0:e.click()},clickCallback:()=>t.onClick(t)}})}function nt(t){var e,n,o,i,s;return{label:t.label,disabled:t.disabled,isRight:t.isRight,hasElement:!!t.element,elementConnected:(e=t.element)==null?void 0:e.isConnected,elementDisabled:(n=t.element)==null?void 0:n.disabled,elementAriaDisabled:(o=t.element)==null?void 0:o.getAttribute("aria-disabled"),elementClass:(i=t.element)==null?void 0:i.className,appRegion:t.element?getComputedStyle(t.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:t.button?getComputedStyle(t.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:t.element?getComputedStyle(t.element).pointerEvents:null,visibility:t.element?getComputedStyle(t.element).visibility:null,display:t.element?getComputedStyle(t.element).display:null,rect:(s=t.element)==null?void 0:s.getBoundingClientRect().toJSON()}}function it(){v("Opening modal");let t=document.createElement("div");try{Spicetify.PopupModal.display({title:p().extensionName,content:t,isLarge:!1})}catch(e){throw ot("Failed to open PopupModal",e),e}xn(t),vn(t)}function xn(t){requestAnimationFrame(()=>{let e=wn(t);e==null||e.classList.add("syncify-modal-shell");let n=e==null?void 0:e.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');n&&(n.classList.add("syncify-modal-close"),n.setAttribute("aria-label",`Close ${p().extensionName}`),n.title="Close",n.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function wn(t){let e=t.parentElement;for(;e&&e!==document.body;){if(e.querySelector(".main-trackCreditsModal-header"))return e;e=e.parentElement}return t.closest('[class*="trackCreditsModal"]')}function vn(t){try{let e=Spicetify.React.createElement(le);if(typeof Spicetify.ReactDOM.createRoot=="function"){Spicetify.ReactDOM.createRoot(t).render(e),v("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(e,t),v("Modal rendered",{renderer:"render"})}catch(e){throw ot("Failed to render modal",e),e}}(function t(){if(!ln()){setTimeout(t,100);return}v("Spicetify APIs ready"),yn()})();})();
