// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var Oe=Object.defineProperty,De=Object.defineProperties;var Re=Object.getOwnPropertyDescriptors;var Lt=Object.getOwnPropertySymbols;var Le=Object.prototype.hasOwnProperty,je=Object.prototype.propertyIsEnumerable;var jt=(t,e,n)=>e in t?Oe(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,g=(t,e)=>{for(var n in e||(e={}))Le.call(e,n)&&jt(t,n,e[n]);if(Lt)for(var n of Lt(e))je.call(e,n)&&jt(t,n,e[n]);return t},b=(t,e)=>De(t,Re(e));var Ft=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var ht=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var Kt="x-syncify-user-hash";async function Ht(t,e,n){let o=await fetch(t,{method:"POST",headers:{"content-type":"application/json",[Kt]:e},body:JSON.stringify(n)});if(!o.ok)throw new Error(`Backup failed with HTTP ${o.status}.`);let r=await o.json().catch(()=>null);return{unchanged:(r==null?void 0:r.unchanged)===!0}}async function Yt(t,e){var a;let n=await fetch(t,{method:"GET",headers:{[Kt]:e}});if(n.status===404)return{exists:!1,payload:null,backups:[]};if(!n.ok)throw new Error(`Restore failed with HTTP ${n.status}.`);let o=await n.json(),r=[o,...(a=o.backup_history)!=null?a:[]].slice(0,3);return{exists:!0,payload:o,backups:r}}var T={extensionName:"Syncify",version:"1.2.2",workerUrl:"https://syncify-worker.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"https://github.com/wSoltani/Syncify/issues/new"};function m(){var e,n,o,r,a,c;let t=window.SyncifyConfig;return{extensionName:(e=U(t==null?void 0:t.extensionName))!=null?e:T.extensionName,version:(n=$t(t==null?void 0:t.version))!=null?n:T.version,workerUrl:(o=U(t==null?void 0:t.workerUrl))!=null?o:T.workerUrl,githubUrl:(r=U(t==null?void 0:t.githubUrl))!=null?r:T.githubUrl,kofiUrl:(a=U(t==null?void 0:t.kofiUrl))!=null?a:T.kofiUrl,issueUrl:(c=U(t==null?void 0:t.issueUrl))!=null?c:T.issueUrl}}function U(t){return $t(t)}function $t(t){return typeof t=="string"&&t.trim()?t.trim():null}var B={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},He=/^([a-z0-9]|f([1-9]|1[0-2]))$/,Ye=250,$e=40,gt=null,$=null,M=null;function Wt(){return/mac/i.test(navigator.platform||navigator.userAgent)}function zt(t){if(t===null)return null;if(!t||typeof t!="object")return B;let e=t;return typeof e.key!="string"||!He.test(e.key)?B:{key:e.key,ctrl:!!e.ctrl,alt:!!e.alt,shift:!!e.shift,meta:!!e.meta}}function O(t){if(!t)return"Off";let e=t.key.toUpperCase();return Wt()?[t.ctrl?"\u2318":"",t.alt?"\u2325":"",t.shift?"\u21E7":"",e].join(""):[t.ctrl&&"Ctrl",t.meta&&"Win",t.alt&&"Alt",t.shift&&"Shift",e].filter(Boolean).join("+")}function qt(t){if(t.key==="Escape")return{kind:"cancel"};let e=We(t.code);if(!e)return{kind:"ignore"};let n=Wt();if(n&&t.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let o={key:e,ctrl:n?t.metaKey:t.ctrlKey,alt:t.altKey,shift:t.shiftKey,meta:n?!1:t.metaKey},r=e.startsWith("f")&&e.length>1;return!o.ctrl&&!o.alt&&!o.meta&&!r?{kind:"error",message:`Include ${n?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:o}}function We(t){var n,o;let e=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(t);return e?((o=(n=e[1])!=null?n:e[2])!=null?o:e[3]).toLowerCase():null}function Vt(t){var e;if(M&&ze(M,t))return!1;try{let n=Spicetify.Mousetrap,o=(e=n.trigger)==null?void 0:e.call(n)._directMap;if(!o)return!1;let r=bt(t);return Object.keys(o).some(a=>a.startsWith(`${r}:`))}catch(n){return!1}}function St(t,e,n=0){if(gt=e,$=t,!Gt()){if(n>=$e){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>St($,e,n+1),Ye);return}kt($)}function kt(t){if($=t,!Gt()||!gt)return;let e=gt;try{if(M&&Spicetify.Keyboard._deregisterShortcut(M),M=null,!t)return;Spicetify.Keyboard.registerShortcut(t,n=>{n.preventDefault(),e()}),M=t,console.debug("[Syncify]","Keyboard shortcut registered",O(t))}catch(n){console.warn("[Syncify]","Failed to register keyboard shortcut",n)}}function Gt(){var t;return typeof((t=Spicetify.Keyboard)==null?void 0:t.registerShortcut)=="function"}function bt(t){return[t.ctrl&&"mod",t.meta&&"meta",t.alt&&"alt",t.shift&&"shift",t.key].filter(Boolean).join("+")}function ze(t,e){return bt(t)===bt(e)}var xt="both",qe=["both","topbar","menu"],D=null,R=null,W=!1;function Jt(t){return qe.includes(t)?t:xt}function Xt(){var t;return typeof((t=Spicetify.Menu)==null?void 0:t.Item)=="function"}function Zt(t){D=t.topbarButton,R=t.menuItem}function z(t){let e=t!=="menu"||!R,n=t!=="topbar";if(D!=null&&D.element&&(D.element.style.display=e?"":"none"),!!R)try{n&&!W?(R.register(),W=!0):!n&&W&&(R.deregister(),W=!1)}catch(o){console.warn("[Syncify]","Failed to update profile menu item",o)}}var V="syncify:config",q={workerUrl:m().workerUrl,autoBackupEnabled:!1,shortcut:B,entryPoint:xt};function _(){var n,o;let t=m(),e=(o=(n=Spicetify.LocalStorage)==null?void 0:n.get(V))!=null?o:window.localStorage.getItem(V);if(!e)return b(g({},q),{workerUrl:t.workerUrl});try{let r=JSON.parse(e);return{workerUrl:t.workerUrl,autoBackupEnabled:r.autoBackupEnabled===void 0?q.autoBackupEnabled:!!r.autoBackupEnabled,shortcut:r.shortcut===void 0?q.shortcut:zt(r.shortcut),entryPoint:Jt(r.entryPoint)}}catch(r){return b(g({},q),{workerUrl:t.workerUrl})}}function G(t){var n;let e=JSON.stringify({workerUrl:m().workerUrl,autoBackupEnabled:t.autoBackupEnabled,shortcut:t.shortcut,entryPoint:t.entryPoint});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set(V,e);return}window.localStorage.setItem(V,e)}function wt(t){return typeof t.workerUrl=="string"&&t.workerUrl.length>0}async function J(t){let e=new TextEncoder().encode(t),n=await crypto.subtle.digest("SHA-256",e);return[...new Uint8Array(n)].map(o=>o.toString(16).padStart(2,"0")).join("")}function Qt(t){return JSON.stringify(vt(t))}function vt(t){return Array.isArray(t)?t.map(vt):t&&typeof t=="object"?Object.keys(t).sort().reduce((e,n)=>(e[n]=vt(t[n]),e),{}):t}async function Et(){let t=await Ve();return J(t)}async function Ve(){var o,r,a,c,l;let t=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(t!=null&&t.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let e=await t.getUser(),n=(l=(c=(a=(r=e==null?void 0:e.username)!=null?r:e==null?void 0:e.canonicalUsername)!=null?a:e==null?void 0:e.id)!=null?c:e==null?void 0:e.uri)!=null?l:e==null?void 0:e.displayName;if(!n)throw new Error("Unable to resolve the active Spotify user.");return n}function te(){let t=navigator.userAgent;return/Windows/i.test(t)?"Windows":/Mac OS|Macintosh/i.test(t)?"macOS":/Linux/i.test(t)?"Linux":t}var X="spicetify-marketplace";var L="settings";async function ee(){let t=await ie();if(t.kind!=="ok")return null;try{let e=await re(t.db,"readonly",o=>o.getAll());if(!e)return null;let n={};for(let o of e)typeof(o==null?void 0:o.key)=="string"&&typeof o.value=="string"&&(n[o.key]=o.value);return n}finally{t.db.close()}}async function ne(t){let e=await ie();if(e.kind==="unavailable")return"unavailable";let n=e.kind==="ok"?e.db:await Ge();if(!n)return"failed";try{return await re(n,"readwrite",r=>{let a;for(let[c,l]of Object.entries(t))a=r.put({key:c,value:l});return a})===null?"failed":"written"}finally{n.close()}}function oe(){var t;try{return(t=window.indexedDB)!=null?t:null}catch(e){return null}}async function ie(){let t=oe();return t?await Je(t)?{kind:"missing"}:new Promise(e=>{let n=!1,o=t.open(X);o.onupgradeneeded=()=>{n=!0},o.onerror=()=>{console.warn("Syncify could not open Marketplace storage",o.error),e({kind:"unavailable"})},o.onblocked=()=>e({kind:"unavailable"}),o.onsuccess=()=>{let r=o.result;if(n){r.close(),Xe(t).then(()=>e({kind:"missing"}));return}if(!r.objectStoreNames.contains(L)){r.close(),e({kind:"unavailable"});return}e({kind:"ok",db:r})}}):{kind:"unavailable"}}function Ge(){let t=oe();return t?new Promise(e=>{let n=t.open(X,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains(L)||o.createObjectStore(L,{keyPath:"key"})},n.onerror=()=>{console.warn("Syncify could not create Marketplace storage",n.error),e(null)},n.onblocked=()=>e(null),n.onsuccess=()=>e(n.result)}):Promise.resolve(null)}async function Je(t){if(typeof t.databases!="function")return!1;try{return!(await t.databases()).some(n=>n.name===X)}catch(e){return!1}}function Xe(t){return new Promise(e=>{let n=t.deleteDatabase(X);n.onsuccess=()=>e(),n.onerror=()=>e(),n.onblocked=()=>e()})}function re(t,e,n){return new Promise(o=>{let r;try{r=t.transaction(L,e)}catch(u){console.warn("Syncify could not open a Marketplace transaction",u),o(null);return}let a,c=!1,l=u=>{c||(c=!0,o(u))};r.oncomplete=()=>l(a),r.onerror=()=>{console.warn("Syncify Marketplace transaction failed",r.error),l(null)},r.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",r.error),l(null)};let y;try{y=n(r.objectStore(L))}catch(u){console.warn("Syncify Marketplace request could not be issued",u),l(null);return}y&&(y.onsuccess=()=>{a=y.result},y.onerror=()=>{console.warn("Syncify Marketplace request failed",y.error),l(null)})})}var Ct="marketplace:",ae=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function se(){let t=rn(),e=await ee();if(e)for(let[n,o]of Object.entries(e))n.startsWith(Ct)&&(t[n]=o);return t}var Qe=new Set(["marketplace:active-tab","marketplace:sort"]),tn="marketplace:installed:",en=["stars","tags","lastUpdated","created"];async function Z(t){let e={};for(let[n,o]of Object.entries(t))Qe.has(n)||(e[n]=n.startsWith(tn)?nn(o):o);return J(Qt(e))}function nn(t){try{let e=JSON.parse(t);if(!e||typeof e!="object"||Array.isArray(e))return t;for(let n of en)delete e[n];return e}catch(e){return t}}async function Q(){let t=await se();return{keyCount:Object.keys(t).length,hash:await Z(t),installedItemCount:tt(t),marketplaceAvailable:on(t)}}async function ce(){let t=await se();return{schema_version:1,metadata:{last_sync_datetime:new Date().toISOString(),device_info:te(),marketplace_key_count:Object.keys(t).length},payload_hash:await Z(t),marketplace_data:{keys:t}}}async function le(t){var a,c;let e={},n=(c=(a=t.marketplace_data)==null?void 0:a.keys)!=null?c:{};for(let[l,y]of Object.entries(n))l.startsWith(Ct)&&(e[l]=y);let o=Object.keys(e);if(o.length===0)return 0;for(let l of o)window.localStorage.setItem(l,e[l]);if(await ne(e)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try the restore again.");return o.length}function tt(t){return ae.reduce((e,n)=>e+an(t[n]),0)}function on(t){return!!(window.Marketplace||ae.some(n=>t[n]!==void 0)||t["marketplace:tabs"]!==void 0)}function ye(t,e){return e===0?!1:t===0?!0:t<Math.max(2,Math.floor(e*.5))}function rn(){let t={};for(let e=0;e<window.localStorage.length;e+=1){let n=window.localStorage.key(e);if(!(n!=null&&n.startsWith(Ct)))continue;let o=window.localStorage.getItem(n);o!==null&&(t[n]=o)}return t}function an(t){if(!t)return 0;try{let e=JSON.parse(t);return Array.isArray(e)?e.length:0}catch(e){return 0}}async function et(t){if(!wt(t))throw new Error("Syncify backup service is not configured.");let[e,n]=await Promise.all([Et(),ce()]);if(n.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:o}=await Ht(t.workerUrl,e,n);return{payload:n,unchanged:o}}async function j(t){var r;if(!wt(t))throw new Error("Syncify backup service is not configured.");let e=await Yt(t.workerUrl,await Et()),n=await Promise.all(e.backups.map(sn)),o=n.filter((a,c)=>n.findIndex(l=>l.payload_hash===a.payload_hash)===c);return b(g({},e),{payload:(r=o[0])!=null?r:null,backups:o})}var Nt=new Map;async function sn(t){var o,r,a;let e=`${t.payload_hash} ${(o=t.metadata)==null?void 0:o.last_sync_datetime}`,n=Nt.get(e);return n||(n=Z((a=(r=t.marketplace_data)==null?void 0:r.keys)!=null?a:{}),Nt.set(e,n),n.catch(()=>Nt.delete(e))),b(g({},t),{payload_hash:await n})}async function ue(t,e){let n=e!=null?e:(await j(t)).payload;if(!n)throw new Error("No Syncify cloud backup was found for this Spotify account.");let o=await le(n);return{payload:n,restoredCount:o}}async function fe(){var e,n,o;let t=_();if(!(!t.workerUrl||!t.autoBackupEnabled))try{let[r,a]=await Promise.all([Q(),j(t)]),c=(n=(e=a.payload)==null?void 0:e.metadata.marketplace_key_count)!=null?n:0;if(a.exists&&ye(r.keyCount,c)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((o=a.payload)==null?void 0:o.payload_hash)===r.hash||r.keyCount===0)return;await et(t),Spicetify.showNotification("Syncify auto-backup complete")}catch(r){let a=r instanceof Error?r.message:String(r);console.warn("Syncify startup sync failed:",r),Spicetify.showNotification(`Syncify auto-sync skipped: ${a}`,!0,8e3)}}function de(){let t=Spicetify.React,e=t.useEffect,n=t.useMemo,o=t.useState,r=t.useRef,[a,c]=o(()=>_()),[l,y]=o("idle"),[u,f]=o(null),[ct,ge]=o(0),[Pt,be]=o(null),[S,Se]=o(null),[E,Tt]=o(null),[k,Mt]=o([]),[d,I]=o(null),[Bt,lt]=o(!1),[ke,C]=o(!1),[x,N]=o(!1),[yt,P]=o(null),[xe,we]=o(null),[F,ve]=o(!1),_t=r(null),K=n(()=>m(),[]),Ee=n(()=>new Map(k.map(i=>[i,tt(i.marketplace_data.keys)])),[k]),It=i=>{var s;return(s=Ee.get(i))!=null?s:tt(i.marketplace_data.keys)},ut=n(()=>Xt(),[]),w=l==="loading",H=(u==null?void 0:u.kind)==="warning"||(u==null?void 0:u.kind)==="error"?u:null,Ce=!!(E&&S&&E.payload_hash!==S),A=!!(E&&S&&E.payload_hash===S),At=!!(d&&S&&d.payload_hash===S),Ut=F||!A||k.length<2,Ne=Ut?k:k.slice(0,1),Pe=!!(S&&ct>0&&!k.some(i=>i.payload_hash===S));e(()=>{Dt({silent:!0})},[]),e(()=>{if(!x)return;let i=s=>{var Y;if(!((Y=_t.current)!=null&&Y.isConnected)){N(!1),P(null);return}s.preventDefault(),s.stopImmediatePropagation();let p=qt(s);if(p.kind!=="ignore"){if(p.kind==="cancel"){N(!1),P(null);return}if(p.kind==="error"){P(p.message);return}if(Vt(p.shortcut)){P(`${O(p.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}N(!1),ft(p.shortcut)}};return window.addEventListener("keydown",i,!0),()=>window.removeEventListener("keydown",i,!0)},[x,a]);async function Ot(){let i=await Q();return Se(i.hash),ge(i.installedItemCount),be(i.marketplaceAvailable),i}async function Dt(i){try{C(!1),y("loading"),i!=null&&i.silent||f({kind:"info",text:"Checking your Syncify backup\u2026"}),await Ot();let s=await j(a);Tt(s.payload),Mt(s.backups),I(s.payload),lt(!0),y(s.exists?"success":"idle"),i!=null&&i.silent||f(s.exists&&s.payload?{kind:"success",text:`Backup found from ${ot(s.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(s){pt(s)}}function Te(i){let s=b(g({},a),{autoBackupEnabled:i});c(s),G(s),f({kind:"success",text:i?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}function ft(i){let s=b(g({},a),{shortcut:i});c(s),G(s),kt(i),P(null),f({kind:"success",text:i?`${O(i)} now opens Syncify.`:"Keyboard shortcut turned off."})}function Me(i){let s=b(g({},a),{entryPoint:i});c(s),G(s),z(i)}function Be(){P(null),N(!0)}async function _e(){try{C(!1),y("loading"),f({kind:"info",text:"Backing up your extensions and themes\u2026"});let{payload:i,unchanged:s}=await et(a);if(await Ot(),s){lt(!0),y("success"),f({kind:"success",text:"Everything is already backed up."}),Spicetify.showNotification("Syncify: everything is already backed up");return}Tt(i),Mt(p=>[i,...p.filter(Y=>Y.payload_hash!==i.payload_hash)].slice(0,yn)),I(i),lt(!0),y("success"),f({kind:"success",text:`Backed up ${i.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(i){pt(i)}}function Ie(i=d){if(Pt===!1){let s="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";f({kind:"error",text:s}),Spicetify.showNotification(s,!0,6e3);return}if(!i){let s="No Syncify cloud backup was found for this Spotify account.";f({kind:"error",text:s}),Spicetify.showNotification(s,!0,6e3);return}I(i),C(!0)}async function Ae(){try{C(!1),y("loading"),f({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:i,restoredCount:s}=await ue(a,d!=null?d:void 0);I(i),y("success"),f({kind:"success",text:`Restored ${s} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),setTimeout(()=>window.location.reload(),1e3)}catch(i){pt(i)}}function dt(i){if(i.startsWith("mailto:")){window.location.href=i;return}window.open(i,"_blank","noopener,noreferrer")}function pt(i){let s=i instanceof Error?i.message:String(i);y("error"),f({kind:"error",text:s}),Spicetify.showNotification(s,!0,6e3)}function mt(i){i.stopPropagation()}let Ue=Bt?E?Ce?"Changes since your last backup":"Everything is backed up":"No backup yet":l==="error"?"Couldn't check your backup":"Checking your backup\u2026",Rt=Bt?E?`Last backup ${ot(E.metadata.last_sync_datetime)}`:"Save your extensions and themes so you can restore them after a reinstall or on another computer.":null;return t.createElement("div",{className:"syncify-panel",ref:_t,onClick:mt,onMouseDown:mt,onPointerDown:mt},H?t.createElement("div",{className:"syncify-alert","data-kind":H.kind},t.createElement("span",null,H.text),t.createElement("span",{className:"syncify-alert-actions"},H.kind==="error"?t.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{Dt()},disabled:w},"Try again"):null,t.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>f(null)},t.createElement(ln,null)))):null,t.createElement("section",{className:"syncify-status","aria-live":"polite"},t.createElement("div",{className:"syncify-status-text"},t.createElement("h3",{className:"syncify-status-title"},Ue),t.createElement("p",{className:"syncify-muted"},Rt?`${Rt} \xB7 `:"",nt(ct)," on this device")),t.createElement("button",{className:"syncify-button",type:"button",onClick:_e,disabled:w||A,title:A?"No changes since your last backup":void 0},w?"Working\u2026":A?"Backed up":"Back up now")),k.length>0?t.createElement("section",{className:"syncify-section","aria-label":"Backups"},t.createElement("div",{className:"syncify-section-header"},t.createElement("h4",{className:"syncify-section-title"},"Backups"),A&&k.length>1?t.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":F,"aria-controls":"syncify-backup-list",onClick:()=>{ve(!F),C(!1)}},F?"Show less":`Show all ${k.length}`,t.createElement(pe,null)):null),t.createElement("div",{className:"syncify-backup-list",id:"syncify-backup-list",role:"radiogroup","aria-label":"Choose a backup to restore"},Ne.map(i=>{let s=(d==null?void 0:d.payload_hash)===i.payload_hash,p=i.payload_hash===S;return t.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":s,"data-selected":s?"true":"false",type:"button",key:`${i.payload_hash}-${i.metadata.last_sync_datetime}`,onClick:()=>{I(i),C(!1)},disabled:w},t.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),t.createElement("span",{className:"syncify-backup-text"},t.createElement("span",{className:"syncify-backup-date"},ot(i.metadata.last_sync_datetime)),t.createElement("span",{className:"syncify-muted"},nt(It(i))," ","\xB7 from ",i.metadata.device_info)),p?t.createElement("span",{className:"syncify-tag",title:"What's on this device now"},"Current"):null)})),Ut?Pt===!1?t.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to restore a backup."):ke?t.createElement("div",{className:"syncify-confirm"},t.createElement("p",null,"Replace this device's"," ",nt(ct)," with the"," ",d?`${nt(It(d))} from ${ot(d.metadata.last_sync_datetime)}`:"selected backup","? Spotify will reload."),Pe?t.createElement("div",{className:"syncify-alert"},"Your current setup isn't backed up."):null,t.createElement("div",{className:"syncify-actions"},t.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>C(!1),disabled:w},"Cancel"),t.createElement("button",{className:"syncify-button",type:"button",onClick:Ae,disabled:w},"Restore"))):t.createElement("div",{className:"syncify-actions"},At?t.createElement("span",{className:"syncify-muted syncify-actions-hint"},"This backup is already current."):null,t.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>Ie(),disabled:w||!d||At},"Restore backup")):null):null,t.createElement("div",{className:"syncify-accordion"},t.createElement(cn,{id:"settings",title:"Settings",openSection:xe,onToggle:i=>{we(i),i!=="settings"&&N(!1)}},t.createElement("label",{className:"syncify-setting"},t.createElement("span",{className:"syncify-setting-text"},t.createElement("span",null,"Back up automatically"),t.createElement("span",{className:"syncify-muted"},"When Spotify starts and something has changed")),t.createElement("input",{className:"syncify-switch",type:"checkbox",role:"switch",checked:a.autoBackupEnabled,onChange:i=>Te(i.currentTarget.checked),disabled:w})),t.createElement("label",{className:"syncify-setting"},t.createElement("span",{className:"syncify-setting-text"},t.createElement("span",null,"Open Syncify from"),ut?a.entryPoint==="menu"&&!a.shortcut?t.createElement("span",{className:"syncify-muted"},"Keep a shortcut in case a Spotify update breaks the menu"):null:t.createElement("span",{className:"syncify-muted"},"The profile menu isn't available in this Spicetify version")),t.createElement("select",{className:"syncify-select",value:ut?a.entryPoint:"topbar",onChange:i=>Me(i.currentTarget.value),disabled:!ut},un.map(i=>t.createElement("option",{key:i.value,value:i.value},i.label)))),t.createElement("div",{className:"syncify-setting"},t.createElement("span",{className:"syncify-setting-text"},t.createElement("span",null,"Keyboard shortcut"),x&&!yt?t.createElement("span",{className:"syncify-muted"},"Press a key combination, or Esc to cancel"):null),t.createElement("span",{className:"syncify-shortcut"},a.shortcut&&!x?t.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ft(null)},"Turn off"):null,!a.shortcut&&!x?t.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>ft(B)},"Use default"):null,t.createElement("button",{className:"syncify-key",type:"button","data-recording":x?"true":"false",onClick:()=>x?N(!1):Be(),title:"Click to change"},x?"Press keys\u2026":a.shortcut?O(a.shortcut):"Off"))),yt?t.createElement("div",{className:"syncify-alert",role:"alert"},yt):null)),t.createElement("footer",{className:"syncify-footer"},t.createElement("span",null,"Syncify ",K.version),t.createElement("span",{className:"syncify-footer-links"},t.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>dt(K.issueUrl)},"Report an issue"),t.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>dt(K.githubUrl)},"GitHub"),t.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>dt(K.kofiUrl)},"Support on Ko-fi"))))}function cn(t){let e=Spicetify.React,n=t.openSection===t.id,o=`syncify-section-${t.id}`;return e.createElement("section",{className:"syncify-accordion-section","aria-label":t.title},e.createElement("button",{className:"syncify-accordion-header",type:"button","aria-expanded":n,"aria-controls":o,onClick:()=>t.onToggle(n?null:t.id)},e.createElement("span",{className:"syncify-accordion-title"},t.title),e.createElement(pe,null)),n?e.createElement("div",{className:"syncify-accordion-body",id:o},t.children):null)}function pe(){let t=Spicetify.React;return t.createElement("svg",{className:"syncify-chevron",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},t.createElement("path",{d:"m9 6 6 6-6 6"}))}function ln(){let t=Spicetify.React;return t.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},t.createElement("path",{d:"M18 6 6 18"}),t.createElement("path",{d:"m6 6 12 12"}))}var yn=3,un=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function nt(t){return t===1?"1 extension or theme":`${t} extensions and themes`}function ot(t){let e=new Date(t);if(Number.isNaN(e.getTime()))return t;let n=e.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),o=new Date,r=new Date(o);return r.setDate(o.getDate()-1),e.toDateString()===o.toDateString()?`today, ${n}`:e.toDateString()===r.toDateString()?`yesterday, ${n}`:`${e.toLocaleDateString(void 0,{month:"short",day:"numeric",year:e.getFullYear()===o.getFullYear()?void 0:"numeric"})}, ${n}`}var it="[Syncify]";function v(t,e){if(e===void 0){console.debug(it,t);return}console.debug(it,t,e)}function at(t,e){if(e===void 0){console.warn(it,t);return}console.warn(it,t,e)}function fn(){var t;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((t=Spicetify==null?void 0:Spicetify.Topbar)!=null&&t.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}function dn(){pn();let t=_();Zt({topbarButton:mn(),menuItem:xn()}),z(t.entryPoint),St(t.shortcut,st),fe().catch(e=>{at("Startup sync check failed",e)})}function pn(){let t="syncify-styles";if(document.getElementById(t))return;let e=document.createElement("style");e.id=t,e.textContent=Ft,document.head.appendChild(e)}function mn(){let{extensionName:t}=m(),e=new Spicetify.Topbar.Button(t,ht,n=>{v("Topbar button clicked",rt(n)),st()},!1,!0);return he(e),bn(e),vn(e),v("Topbar button registered",rt(e)),e}function he(t){var n;let e=t;t.element.style.setProperty("-webkit-app-region","no-drag"),(n=e.button)==null||n.style.setProperty("-webkit-app-region","no-drag")}var me=".main-actionButtons",hn=".Root__globalNav, .Root__top-bar",gn=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function bn(t){if(typeof MutationObserver=="undefined")return;let e=!1,n=null,o=()=>{e=!1,a();let c=t.element,l=document.querySelector(me);!c||!l||l.contains(c)||(l.prepend(c),Sn(t),he(t),v("Topbar button re-attached",rt(t)))},r=new MutationObserver(()=>{e||(e=!0,setTimeout(o,250))}),a=()=>{var y;if(n!=null&&n.isConnected)return;let c=document.querySelector(me),l=(y=c==null?void 0:c.closest(hn))!=null?y:c==null?void 0:c.parentElement;if(r.disconnect(),n=l!=null?l:null,!l){r.observe(document.body,{childList:!0,subtree:!0});return}r.observe(l,{childList:!0,subtree:!0});for(let u=l.parentElement;u;u=u.parentElement)r.observe(u,{childList:!0})};o()}function Sn(t){let e=kn(t);if(!e||e.className&&e.className!=="undefined")return;let n=Array.from(document.querySelectorAll(gn)).find(o=>!t.element.contains(o));n!=null&&n.className&&(e.className=n.className)}function kn(t){return t.button}function xn(){var t;if(typeof((t=Spicetify.Menu)==null?void 0:t.Item)!="function")return null;try{return new Spicetify.Menu.Item(m().extensionName,!1,()=>st(),wn())}catch(e){return at("Failed to create profile menu item",e),null}}function wn(){return ht.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function vn(t){Object.assign(window,{SyncifyDebug:{button:t,element:t.element,openModal:st,inspect:()=>rt(t),clickElement:()=>{var e;return(e=t.element)==null?void 0:e.click()},clickInnerButton:()=>{var e;return(e=t.button)==null?void 0:e.click()},clickCallback:()=>t.onClick(t)}})}function rt(t){var e,n,o,r,a;return{label:t.label,disabled:t.disabled,isRight:t.isRight,hasElement:!!t.element,elementConnected:(e=t.element)==null?void 0:e.isConnected,elementDisabled:(n=t.element)==null?void 0:n.disabled,elementAriaDisabled:(o=t.element)==null?void 0:o.getAttribute("aria-disabled"),elementClass:(r=t.element)==null?void 0:r.className,appRegion:t.element?getComputedStyle(t.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:t.button?getComputedStyle(t.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:t.element?getComputedStyle(t.element).pointerEvents:null,visibility:t.element?getComputedStyle(t.element).visibility:null,display:t.element?getComputedStyle(t.element).display:null,rect:(a=t.element)==null?void 0:a.getBoundingClientRect().toJSON()}}var h=null;function st(){var e;if(h!=null&&h.container.isConnected){v("Closing modal"),Spicetify.PopupModal.hide();return}v("Opening modal"),(e=h==null?void 0:h.root)==null||e.unmount();let t=document.createElement("div");h={container:t,root:null};try{Spicetify.PopupModal.display({title:m().extensionName,content:t,isLarge:!1})}catch(n){throw at("Failed to open PopupModal",n),n}En(t),Nn(t)}function En(t){requestAnimationFrame(()=>{let e=Cn(t);e==null||e.classList.add("syncify-modal-shell");let n=e==null?void 0:e.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');n&&(n.classList.add("syncify-modal-close"),n.setAttribute("aria-label",`Close ${m().extensionName}`),n.title="Close",n.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function Cn(t){let e=t.parentElement;for(;e&&e!==document.body;){if(e.querySelector(".main-trackCreditsModal-header"))return e;e=e.parentElement}return t.closest('[class*="trackCreditsModal"]')}function Nn(t){try{let e=Spicetify.React.createElement(de);if(typeof Spicetify.ReactDOM.createRoot=="function"){let n=Spicetify.ReactDOM.createRoot(t);n.render(e),(h==null?void 0:h.container)===t&&(h.root=n),v("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(e,t),v("Modal rendered",{renderer:"render"})}catch(e){throw at("Failed to render modal",e),e}}(function t(){if(!fn()){setTimeout(t,100);return}v("Spicetify APIs ready"),dn()})();})();
