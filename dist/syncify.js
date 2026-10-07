// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var bt=Object.defineProperty,ht=Object.defineProperties;var kt=Object.getOwnPropertyDescriptors;var Ee=Object.getOwnPropertySymbols;var St=Object.prototype.hasOwnProperty,wt=Object.prototype.propertyIsEnumerable;var Ne=(e,t,n)=>t in e?bt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,h=(e,t)=>{for(var n in t||(t={}))St.call(t,n)&&Ne(e,n,t[n]);if(Ee)for(var n of Ee(t))wt.call(t,n)&&Ne(e,n,t[n]);return e},k=(e,t)=>ht(e,kt(t));var Pe=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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

.syncify-panel {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    margin: 0;
    padding: 0;
    color: var(--spice-text);
}

.syncify-hero {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
}

.syncify-status-row,
.syncify-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-width: 0;
}

.syncify-description,
.syncify-card-label,
.syncify-backup-details {
    margin: 0;
    color: var(--spice-subtext);
    line-height: 1.5;
}

.syncify-heading {
    min-width: 0;
    margin: 0;
    font-size: clamp(18px, 4vw, 23px);
    line-height: 1.2;
}

.syncify-description {
    max-width: 64ch;
    font-size: 13px;
}

.syncify-status-pill,
.syncify-backup-time {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.35;
    white-space: nowrap;
}

.syncify-status-pill {
    padding: 4px 9px;
    color: var(--spice-subtext);
    background: rgba(255, 255, 255, 0.08);
}

.syncify-backup-time {
    padding: 4px 9px;
    color: var(--spice-text);
    background: rgba(255, 255, 255, 0.09);
}

.syncify-status-pill[data-kind="success"],
.syncify-card[data-tone="success"] .syncify-card-value {
    color: var(--spice-button-active, #1ed760);
}

.syncify-status-pill[data-kind="warning"],
.syncify-card[data-tone="warning"] .syncify-card-value {
    color: #f6c343;
}

.syncify-status-pill[data-kind="error"] {
    color: var(--spice-notification-error, #ff6b6b);
}

.syncify-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    min-width: 0;
}

.syncify-card,
.syncify-section {
    box-sizing: border-box;
    min-width: 0;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.045);
}

.syncify-card {
    display: flex;
    flex: 1 1 calc(50% - 5px);
    flex-direction: column;
    gap: 4px;
    min-width: 180px;
    padding: 11px 12px;
}

.syncify-card-label {
    overflow: hidden;
    font-size: 11px;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
}

.syncify-card-value {
    overflow: hidden;
    color: var(--spice-text);
    font-size: 17px;
    font-weight: 700;
    line-height: 1.25;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.syncify-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px;
}

.syncify-backup-section {
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.07),
        rgba(255, 255, 255, 0.035)
    );
}

.syncify-section-title {
    min-width: 0;
    margin: 0;
    font-size: 14px;
    line-height: 1.3;
}

.syncify-backup-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.syncify-backup-version {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    min-width: 0;
    padding: 9px 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    color: var(--spice-text);
    background: rgba(255, 255, 255, 0.045);
    text-align: left;
    cursor: pointer;
    transition:
        border-color 120ms ease,
        background-color 120ms ease,
        opacity 120ms ease,
        transform 120ms ease;
}

.syncify-backup-version:hover:not(:disabled),
.syncify-backup-version[data-selected="true"] {
    border-color: rgba(30, 215, 96, 0.45);
    background: rgba(30, 215, 96, 0.1);
}

.syncify-backup-version:active:not(:disabled) {
    transform: scale(0.99);
}

.syncify-backup-version:disabled {
    cursor: not-allowed;
    opacity: 0.65;
}

.syncify-backup-version-main {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
}

.syncify-backup-version-main strong,
.syncify-backup-version-main span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.syncify-backup-version-main span,
.syncify-backup-details {
    color: var(--spice-subtext);
    font-size: 12px;
}

.syncify-backup-details {
    display: flex;
    flex: 0 1 auto;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 8px;
}

.syncify-backup-details span {
    display: inline-flex;
    align-items: center;
    min-width: 0;
    padding: 4px 8px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.07);
}

.syncify-actions,
.syncify-footer,
.syncify-footer-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.syncify-actions {
    align-items: center;
}

.syncify-confirm-restore {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.syncify-footer {
    align-items: center;
    justify-content: space-between;
}

.syncify-footer-actions {
    justify-content: flex-end;
}

.syncify-version {
    color: var(--spice-subtext);
    font-size: 12px;
    line-height: 1.4;
}

.syncify-button,
.syncify-link-button {
    border: 0;
    border-radius: 999px;
    font-weight: 700;
    line-height: 1.25;
    cursor: pointer;
    transition:
        color 120ms ease,
        background-color 120ms ease,
        box-shadow 120ms ease,
        opacity 120ms ease,
        transform 120ms ease;
}

.syncify-button {
    padding: 8px 14px;
    color: var(--spice-button-text, #000);
    background: var(--spice-button, #1ed760);
}

.syncify-button:hover:not(:disabled) {
    background: var(--spice-button-active, #1fdf64);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08) inset;
}

.syncify-button:active:not(:disabled),
.syncify-link-button:active:not(:disabled) {
    transform: scale(0.98);
}

.syncify-button.secondary,
.syncify-link-button {
    color: var(--spice-text);
    background: rgba(255, 255, 255, 0.11);
}

.syncify-button.secondary:hover:not(:disabled),
.syncify-link-button:hover:not(:disabled) {
    color: var(--spice-text);
    background: rgba(255, 255, 255, 0.18);
}

.syncify-button.danger {
    color: #fff;
    background: #c92a2a;
}

.syncify-button.danger:hover:not(:disabled) {
    background: #e03131;
}

.syncify-button:disabled,
.syncify-link-button:disabled {
    cursor: not-allowed;
    opacity: 0.55;
}

.syncify-toggle {
    display: flex;
    align-items: flex-start;
    gap: 7px;
    color: var(--spice-subtext);
    font-size: 12px;
    line-height: 1.45;
    cursor: pointer;
}

.syncify-toggle input {
    flex: 0 0 auto;
    margin-top: 2px;
    cursor: pointer;
}

.syncify-toggle:has(input:disabled),
.syncify-toggle input:disabled {
    cursor: not-allowed;
    opacity: 0.65;
}

.syncify-link-button {
    padding: 7px 12px;
    font-size: 12px;
}

.syncify-message {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin: 0;
    padding: 8px 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    color: var(--spice-text);
    background: rgba(255, 255, 255, 0.055);
    font-size: 12px;
    line-height: 1.45;
}

.syncify-message::before {
    flex: 0 0 auto;
    width: 7px;
    height: 7px;
    margin-top: 5px;
    border-radius: 999px;
    background: var(--spice-subtext);
    content: "";
}

.syncify-message[data-kind="success"] {
    border-color: rgba(30, 215, 96, 0.35);
    background: rgba(30, 215, 96, 0.1);
}

.syncify-message[data-kind="success"]::before {
    background: var(--spice-button-active, #1ed760);
}

.syncify-message[data-kind="warning"] {
    border-color: rgba(246, 195, 67, 0.38);
    background: rgba(246, 195, 67, 0.1);
}

.syncify-message[data-kind="warning"]::before {
    background: #f6c343;
}

.syncify-message[data-kind="error"] {
    border-color: rgba(255, 107, 107, 0.4);
    background: rgba(255, 107, 107, 0.1);
}

.syncify-message[data-kind="error"]::before {
    background: var(--spice-notification-error, #ff6b6b);
}

.syncify-message.inline {
    padding: 7px 9px;
}

@media (max-width: 560px) {
    .syncify-modal-shell .main-trackCreditsModal-mainSection,
    .syncify-modal-shell .main-trackCreditsModal-content,
    .main-trackCreditsModal-mainSection:has(.syncify-panel),
    .main-trackCreditsModal-content:has(.syncify-panel) {
        max-height: calc(100vh - 110px) !important;
        padding: 10px 14px 14px !important;
    }

    .syncify-status-row,
    .syncify-section-header {
        align-items: flex-start;
        flex-direction: column;
        gap: 6px;
    }

    .syncify-card {
        flex-basis: 100%;
        min-width: 0;
    }

    .syncify-backup-version {
        align-items: flex-start;
        flex-direction: column;
    }

    .syncify-backup-details {
        justify-content: flex-start;
    }

    .syncify-actions,
    .syncify-footer,
    .syncify-footer-actions {
        flex-direction: column;
    }

    .syncify-footer {
        align-items: stretch;
    }

    .syncify-button,
    .syncify-link-button {
        width: 100%;
    }
}

.syncify-shortcut-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
}

.syncify-shortcut-key {
    min-width: 96px;
    padding: 6px 10px;
    border-radius: 6px;
    color: var(--spice-text);
    background: rgba(255, 255, 255, 0.07);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12) inset;
    font-family: inherit;
    font-size: 13px;
    font-weight: 700;
    text-align: center;
}

.syncify-shortcut-key[data-recording="true"] {
    color: var(--spice-button, #1ed760);
    box-shadow: 0 0 0 1px var(--spice-button, #1ed760) inset;
}

.syncify-choice-group {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 16px;
}
`;var ae=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var Me="x-syncify-user-hash";async function Te(e,t,n){let i=await fetch(e,{method:"POST",headers:{"content-type":"application/json",[Me]:t},body:JSON.stringify(n)});if(!i.ok)throw new Error(`Backup failed with HTTP ${i.status}.`)}async function Be(e,t){var s;let n=await fetch(e,{method:"GET",headers:{[Me]:t}});if(n.status===404)return{exists:!1,payload:null,backups:[]};if(!n.ok)throw new Error(`Restore failed with HTTP ${n.status}.`);let i=await n.json(),r=[i,...(s=i.backup_history)!=null?s:[]].slice(0,3);return{exists:!0,payload:i,backups:r}}var C={extensionName:"Syncify",version:"1.1.2",workerUrl:"https://syncify-worker.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"https://github.com/wSoltani/Syncify/issues/new"};function d(){var t,n,i,r,s,l;let e=window.SyncifyConfig;return{extensionName:(t=B(e==null?void 0:e.extensionName))!=null?t:C.extensionName,version:(n=_e(e==null?void 0:e.version))!=null?n:C.version,workerUrl:(i=B(e==null?void 0:e.workerUrl))!=null?i:C.workerUrl,githubUrl:(r=B(e==null?void 0:e.githubUrl))!=null?r:C.githubUrl,kofiUrl:(s=B(e==null?void 0:e.kofiUrl))!=null?s:C.kofiUrl,issueUrl:(l=B(e==null?void 0:e.issueUrl))!=null?l:C.issueUrl}}function B(e){return _e(e)}function _e(e){return typeof e=="string"&&e.trim()?e.trim():null}var S={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},Ct=/^([a-z0-9]|f([1-9]|1[0-2]))$/,Et=250,Nt=40,se=null,j=null,E=null;function Ie(){return/mac/i.test(navigator.platform||navigator.userAgent)}function Ue(e){if(e===null)return null;if(!e||typeof e!="object")return S;let t=e;return typeof t.key!="string"||!Ct.test(t.key)?S:{key:t.key,ctrl:!!t.ctrl,alt:!!t.alt,shift:!!t.shift,meta:!!t.meta}}function w(e){if(!e)return"Off";let t=e.key.toUpperCase();return Ie()?[e.ctrl?"\u2318":"",e.alt?"\u2325":"",e.shift?"\u21E7":"",t].join(""):[e.ctrl&&"Ctrl",e.meta&&"Win",e.alt&&"Alt",e.shift&&"Shift",t].filter(Boolean).join("+")}function Ae(e){if(e.key==="Escape")return{kind:"cancel"};let t=Pt(e.code);if(!t)return{kind:"ignore"};let n=Ie();if(n&&e.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:t,ctrl:n?e.metaKey:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:n?!1:e.metaKey},r=t.startsWith("f")&&t.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!r?{kind:"error",message:`Include ${n?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function Pt(e){var n,i;let t=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(e);return t?((i=(n=t[1])!=null?n:t[2])!=null?i:t[3]).toLowerCase():null}function Oe(e){var t;if(E&&Mt(E,e))return!1;try{let n=Spicetify.Mousetrap,i=(t=n.trigger)==null?void 0:t.call(n)._directMap;if(!i)return!1;let r=ce(e);return Object.keys(i).some(s=>s.startsWith(`${r}:`))}catch(n){return!1}}function le(e,t,n=0){if(se=t,j=e,!De()){if(n>=Nt){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>le(j,t,n+1),Et);return}ye(j)}function ye(e){if(j=e,!De()||!se)return;let t=se;try{if(E&&Spicetify.Keyboard._deregisterShortcut(E),E=null,!e)return;Spicetify.Keyboard.registerShortcut(e,n=>{n.preventDefault(),t()}),E=e,console.debug("[Syncify]","Keyboard shortcut registered",w(e))}catch(n){console.warn("[Syncify]","Failed to register keyboard shortcut",n)}}function De(){var e;return typeof((e=Spicetify.Keyboard)==null?void 0:e.registerShortcut)=="function"}function ce(e){return[e.ctrl&&"mod",e.meta&&"meta",e.alt&&"alt",e.shift&&"shift",e.key].filter(Boolean).join("+")}function Mt(e,t){return ce(e)===ce(t)}var ue="both",Tt=["both","topbar","menu"],_=null,I=null,F=!1;function Le(e){return Tt.includes(e)?e:ue}function Re(){var e;return typeof((e=Spicetify.Menu)==null?void 0:e.Item)=="function"}function je(e){_=e.topbarButton,I=e.menuItem}function K(e){let t=e!=="menu"||!I,n=e!=="topbar";if(_!=null&&_.element&&(_.element.style.display=t?"":"none"),!!I)try{n&&!F?(I.register(),F=!0):!n&&F&&(I.deregister(),F=!1)}catch(i){console.warn("[Syncify]","Failed to update profile menu item",i)}}var Y="syncify:config",H={workerUrl:d().workerUrl,autoBackupEnabled:!1,shortcut:S,entryPoint:ue};function N(){var n,i;let e=d(),t=(i=(n=Spicetify.LocalStorage)==null?void 0:n.get(Y))!=null?i:window.localStorage.getItem(Y);if(!t)return k(h({},H),{workerUrl:e.workerUrl});try{let r=JSON.parse(t);return{workerUrl:e.workerUrl,autoBackupEnabled:r.autoBackupEnabled===void 0?H.autoBackupEnabled:!!r.autoBackupEnabled,shortcut:r.shortcut===void 0?H.shortcut:Ue(r.shortcut),entryPoint:Le(r.entryPoint)}}catch(r){return k(h({},H),{workerUrl:e.workerUrl})}}function z(e){var n;let t=JSON.stringify({workerUrl:d().workerUrl,autoBackupEnabled:e.autoBackupEnabled,shortcut:e.shortcut,entryPoint:e.entryPoint});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set(Y,t);return}window.localStorage.setItem(Y,t)}function fe(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}async function U(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return[...new Uint8Array(n)].map(i=>i.toString(16).padStart(2,"0")).join("")}function pe(e){return JSON.stringify(de(e))}function de(e){return Array.isArray(e)?e.map(de):e&&typeof e=="object"?Object.keys(e).sort().reduce((t,n)=>(t[n]=de(e[n]),t),{}):e}async function me(){let e=await Bt();return U(e)}async function Bt(){var i,r,s,l,c;let e=(i=Spicetify.Platform)==null?void 0:i.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let t=await e.getUser(),n=(c=(l=(s=(r=t==null?void 0:t.username)!=null?r:t==null?void 0:t.canonicalUsername)!=null?s:t==null?void 0:t.id)!=null?l:t==null?void 0:t.uri)!=null?c:t==null?void 0:t.displayName;if(!n)throw new Error("Unable to resolve the active Spotify user.");return n}function Fe(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var W="spicetify-marketplace";var A="settings";async function Ke(){let e=await ze();if(e.kind!=="ok")return null;try{let t=await We(e.db,"readonly",i=>i.getAll());if(!t)return null;let n={};for(let i of t)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(n[i.key]=i.value);return n}finally{e.db.close()}}async function He(e){let t=await ze();if(t.kind==="unavailable")return"unavailable";let n=t.kind==="ok"?t.db:await _t();if(!n)return"failed";try{return await We(n,"readwrite",r=>{let s;for(let[l,c]of Object.entries(e))s=r.put({key:l,value:c});return s})===null?"failed":"written"}finally{n.close()}}function Ye(){var e;try{return(e=window.indexedDB)!=null?e:null}catch(t){return null}}async function ze(){let e=Ye();return e?await It(e)?{kind:"missing"}:new Promise(t=>{let n=!1,i=e.open(W);i.onupgradeneeded=()=>{n=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),t({kind:"unavailable"})},i.onblocked=()=>t({kind:"unavailable"}),i.onsuccess=()=>{let r=i.result;if(n){r.close(),Ut(e).then(()=>t({kind:"missing"}));return}if(!r.objectStoreNames.contains(A)){r.close(),t({kind:"unavailable"});return}t({kind:"ok",db:r})}}):{kind:"unavailable"}}function _t(){let e=Ye();return e?new Promise(t=>{let n=e.open(W,1);n.onupgradeneeded=()=>{let i=n.result;i.objectStoreNames.contains(A)||i.createObjectStore(A,{keyPath:"key"})},n.onerror=()=>{console.warn("Syncify could not create Marketplace storage",n.error),t(null)},n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}async function It(e){if(typeof e.databases!="function")return!1;try{return!(await e.databases()).some(n=>n.name===W)}catch(t){return!1}}function Ut(e){return new Promise(t=>{let n=e.deleteDatabase(W);n.onsuccess=()=>t(),n.onerror=()=>t(),n.onblocked=()=>t()})}function We(e,t,n){return new Promise(i=>{let r;try{r=e.transaction(A,t)}catch(y){console.warn("Syncify could not open a Marketplace transaction",y),i(null);return}let s,l=!1,c=y=>{l||(l=!0,i(y))};r.oncomplete=()=>c(s),r.onerror=()=>{console.warn("Syncify Marketplace transaction failed",r.error),c(null)},r.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",r.error),c(null)};let u;try{u=n(r.objectStore(A))}catch(y){console.warn("Syncify Marketplace request could not be issued",y),c(null);return}u&&(u.onsuccess=()=>{s=u.result},u.onerror=()=>{console.warn("Syncify Marketplace request failed",u.error),c(null)})})}var ge="marketplace:",$e=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function qe(){let e=Lt(),t=await Ke();if(t)for(let[n,i]of Object.entries(t))n.startsWith(ge)&&(e[n]=i);return e}async function $(){let e=await qe();return{keyCount:Object.keys(e).length,hash:await U(pe(e)),installedItemCount:Ot(e),marketplaceAvailable:Dt(e)}}async function Ve(){let e=await qe();return{schema_version:1,metadata:{last_sync_datetime:new Date().toISOString(),device_info:Fe(),marketplace_key_count:Object.keys(e).length},payload_hash:await U(pe(e)),marketplace_data:{keys:e}}}async function Ge(e){var s,l;let t={},n=(l=(s=e.marketplace_data)==null?void 0:s.keys)!=null?l:{};for(let[c,u]of Object.entries(n))c.startsWith(ge)&&(t[c]=u);let i=Object.keys(t);if(i.length===0)return 0;for(let c of i)window.localStorage.setItem(c,t[c]);if(await He(t)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try the restore again.");return i.length}function Ot(e){return $e.reduce((t,n)=>t+Rt(e[n]),0)}function Dt(e){return!!(window.Marketplace||$e.some(n=>e[n]!==void 0)||e["marketplace:tabs"]!==void 0)}function Je(e,t){return t===0?!1:e===0?!0:e<Math.max(2,Math.floor(t*.5))}function Lt(){let e={};for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);if(!(n!=null&&n.startsWith(ge)))continue;let i=window.localStorage.getItem(n);i!==null&&(e[n]=i)}return e}function Rt(e){if(!e)return 0;try{let t=JSON.parse(e);return Array.isArray(t)?t.length:0}catch(t){return 0}}async function q(e){if(!fe(e))throw new Error("Syncify backup service is not configured.");let[t,n]=await Promise.all([me(),Ve()]);if(n.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");return await Te(e.workerUrl,t,n),n}async function O(e){if(!fe(e))throw new Error("Syncify backup service is not configured.");return Be(e.workerUrl,await me())}async function Xe(e,t){let n=t!=null?t:(await O(e)).payload;if(!n)throw new Error("No Syncify cloud backup was found for this Spotify account.");let i=await Ge(n);return{payload:n,restoredCount:i}}async function Ze(){var t,n,i;let e=N();if(!(!e.workerUrl||!e.autoBackupEnabled))try{let[r,s]=await Promise.all([$(),O(e)]),l=(n=(t=s.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?n:0;if(s.exists&&Je(r.keyCount,l)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((i=s.payload)==null?void 0:i.payload_hash)===r.hash||r.keyCount===0)return;await q(e),Spicetify.showNotification("Syncify auto-backup complete")}catch(r){let s=r instanceof Error?r.message:String(r);console.warn("Syncify startup sync failed:",r),Spicetify.showNotification(`Syncify auto-sync skipped: ${s}`,!0,8e3)}}function et(){var Ce;let e=Spicetify.React,t=e.useEffect,n=e.useMemo,i=e.useState,[r,s]=i(()=>N()),[l,c]=i("idle"),[u,y]=i(null),[nt,it]=i(0),[ot,rt]=i(0),[P,at]=i(null),[be,st]=i(null),[p,Q]=i(null),[he,ke]=i([]),[m,M]=i(null),[D,ee]=i(!1),[ct,T]=i(!1),[g,L]=i(!1),[Se,v]=i(null),R=n(()=>d(),[]),we=n(()=>Re(),[]),b=l==="loading",te=(u==null?void 0:u.kind)==="warning"||(u==null?void 0:u.kind)==="error"?u:null,lt=(Ce=p==null?void 0:p.metadata.marketplace_key_count)!=null?Ce:0,yt=!!(p&&be&&p.payload_hash!==be);t(()=>{ve({silent:!0})},[]),t(()=>{if(!g)return;let o=a=>{a.preventDefault(),a.stopImmediatePropagation();let f=Ae(a);if(f.kind!=="ignore"){if(f.kind==="cancel"){L(!1),v(null);return}if(f.kind==="error"){v(f.message);return}if(Oe(f.shortcut)){v(`${w(f.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}L(!1),ne(f.shortcut)}};return window.addEventListener("keydown",o,!0),()=>window.removeEventListener("keydown",o,!0)},[g,r]);async function xe(){let o=await $();return it(o.keyCount),st(o.hash),rt(o.installedItemCount),at(o.marketplaceAvailable),o}async function ve(o){try{T(!1),c("loading"),o!=null&&o.silent||y({kind:"info",text:"Checking your Syncify backup\u2026"}),await xe();let a=await O(r);Q(a.payload),ke(a.backups),M(a.payload),ee(!0),c(a.exists?"success":"idle"),o!=null&&o.silent||y(a.exists&&a.payload?{kind:"success",text:`Backup found from ${Qe(a.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(a){oe(a)}}function ut(o){let a=k(h({},r),{autoBackupEnabled:o});s(a),z(a),y({kind:"success",text:o?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}function ne(o){let a=k(h({},r),{shortcut:o});s(a),z(a),ye(o),v(null),y({kind:"success",text:o?`${w(o)} now opens Syncify.`:"Keyboard shortcut turned off."})}function ft(o){let a=k(h({},r),{entryPoint:o});s(a),z(a),K(o)}function dt(){v(null),L(!0)}async function pt(){try{T(!1),c("loading"),y({kind:"info",text:"Backing up your extensions and themes\u2026"});let o=await q(r);Q(o),ke(a=>[o,...a.filter(f=>f.payload_hash!==o.payload_hash)].slice(0,3)),M(o),ee(!0),await xe(),c("success"),y({kind:"success",text:`Backed up ${o.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(o){oe(o)}}function mt(o=m){if(P===!1){let a="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";y({kind:"error",text:a}),Spicetify.showNotification(a,!0,6e3);return}if(!o){let a="No Syncify cloud backup was found for this Spotify account.";y({kind:"error",text:a}),Spicetify.showNotification(a,!0,6e3);return}M(o),T(!0)}async function gt(){try{T(!1),c("loading"),y({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:o,restoredCount:a}=await Xe(r,m!=null?m:void 0);Q(o),M(o),ee(!0),c("success"),y({kind:"success",text:`Restored ${a} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),setTimeout(()=>window.location.reload(),1e3)}catch(o){oe(o)}}function ie(o){if(o.startsWith("mailto:")){window.location.href=o;return}window.open(o,"_blank","noopener,noreferrer")}function oe(o){let a=o instanceof Error?o.message:String(o);c("error"),y({kind:"error",text:a}),Spicetify.showNotification(a,!0,6e3)}function re(o){o.stopPropagation()}return e.createElement("div",{className:"syncify-panel",onClick:re,onMouseDown:re,onPointerDown:re},e.createElement("section",{className:"syncify-hero","aria-label":"Syncify status"},e.createElement("p",{className:"syncify-description"},"Back up your installed extensions and themes, then restore them whenever Spotify or Spicetify needs a fresh setup."),e.createElement("div",{className:"syncify-status-row"},e.createElement("h3",{className:"syncify-heading"},Ft(l,D)),e.createElement("span",{className:"syncify-status-pill","data-kind":Ht(l)},Kt(l,D))),te?e.createElement("p",{className:"syncify-message","data-kind":te.kind},te.text):null),e.createElement("section",{className:"syncify-grid","aria-label":"Syncify backup details"},e.createElement(V,{label:"Backup entries",value:nt}),e.createElement(V,{label:"Extensions/themes",value:ot}),e.createElement(V,{label:"Backup",value:p?`${lt} entries`:D?"None":"Checking",tone:p?"success":D?"warning":"neutral"}),e.createElement(V,{label:"Restore",value:P===null?"Checking":P?"Ready":"Missing",tone:P===null?"neutral":P?"success":"warning"})),p?e.createElement("section",{className:"syncify-section syncify-backup-section"},e.createElement("div",{className:"syncify-section-header"},e.createElement("h4",{className:"syncify-section-title"},"Version history"),e.createElement("span",{className:"syncify-backup-time"},he.length," saved")),e.createElement("div",{className:"syncify-backup-list"},he.map((o,a)=>{let f=(m==null?void 0:m.payload_hash)===o.payload_hash;return e.createElement("button",{className:"syncify-backup-version","data-selected":f?"true":"false",type:"button",key:`${o.payload_hash}-${o.metadata.last_sync_datetime}`,onClick:()=>M(o),disabled:b},e.createElement("span",{className:"syncify-backup-version-main"},e.createElement("strong",null,a===0?"Latest":`Backup ${a+1}`),e.createElement("span",null,Qe(o.metadata.last_sync_datetime))),e.createElement("span",{className:"syncify-backup-details"},e.createElement("span",null,o.metadata.device_info),e.createElement("span",null,o.metadata.marketplace_key_count," entries")))})),yt?e.createElement("p",{className:"syncify-message inline","data-kind":"warning"},"This device differs from your latest backup. Select any saved version to restore it, or back up to add a new version."):null):null,e.createElement("section",{className:"syncify-section compact"},e.createElement("h4",{className:"syncify-section-title"},"Sync controls"),ct?e.createElement("div",{className:"syncify-confirm-restore"},e.createElement("p",{className:"syncify-message inline","data-kind":"warning"},"Restore will replace this device's saved extensions and themes with the selected backup, then reload Spotify."),e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>T(!1),disabled:b},"Cancel"),e.createElement("button",{className:"syncify-button danger",type:"button",onClick:gt,disabled:b},"Confirm restore"))):e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button",type:"button",onClick:pt,disabled:b},"Back up"),e.createElement("button",{className:"syncify-button danger",type:"button",onClick:()=>mt(),disabled:b||!m},"Restore selected"),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{ve()},disabled:b},"Refresh status")),e.createElement("label",{className:"syncify-toggle"},e.createElement("input",{type:"checkbox",checked:r.autoBackupEnabled,onChange:o=>ut(o.currentTarget.checked),disabled:b}),e.createElement("span",null,"Auto-backup extensions and themes after startup safety checks"))),e.createElement("section",{className:"syncify-section compact"},e.createElement("h4",{className:"syncify-section-title"},"Show Syncify in"),e.createElement("div",{className:"syncify-choice-group",role:"radiogroup","aria-label":"Where Syncify appears"},jt.map(o=>{let a=o.value!=="topbar";return e.createElement("label",{className:"syncify-toggle",key:o.value},e.createElement("input",{type:"radio",name:"syncify-entry-point",value:o.value,checked:r.entryPoint===o.value,onChange:()=>ft(o.value),disabled:a&&!we}),e.createElement("span",null,o.label))})),we?r.entryPoint==="menu"&&!r.shortcut?e.createElement("p",{className:"syncify-message inline","data-kind":"warning"},"If the profile menu breaks after a Spotify update, turn the keyboard shortcut back on so you can still open Syncify."):null:e.createElement("p",{className:"syncify-message inline","data-kind":"warning"},"The profile menu isn't available in this Spicetify version, so Syncify stays in the top bar.")),e.createElement("section",{className:"syncify-section compact"},e.createElement("h4",{className:"syncify-section-title"},"Keyboard shortcut"),e.createElement("div",{className:"syncify-shortcut-row"},e.createElement("kbd",{className:"syncify-shortcut-key","data-recording":g?"true":"false"},g?"Press keys\u2026":w(r.shortcut)),e.createElement("div",{className:"syncify-actions"},g?e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{L(!1),v(null)}},"Cancel"):e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:dt},"Change"),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>ne(S),disabled:g||w(r.shortcut)===w(S)},"Reset"),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>ne(null),disabled:g||!r.shortcut},"Turn off"))),Se?e.createElement("p",{className:"syncify-message inline","data-kind":"warning"},Se):null),e.createElement("section",{className:"syncify-footer","aria-label":"Syncify links"},e.createElement("span",{className:"syncify-version"},"v",R.version),e.createElement("div",{className:"syncify-footer-actions"},e.createElement("button",{className:"syncify-link-button",type:"button",onClick:()=>ie(R.issueUrl)},"Report an issue"),e.createElement("button",{className:"syncify-link-button",type:"button",onClick:()=>ie(R.githubUrl)},"GitHub"),e.createElement("button",{className:"syncify-link-button",type:"button",onClick:()=>ie(R.kofiUrl)},"Ko-fi"))))}var jt=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar only"},{value:"menu",label:"Profile menu only"}];function V({label:e,value:t,tone:n="neutral"}){let i=Spicetify.React;return i.createElement("div",{className:"syncify-card","data-tone":n},i.createElement("span",{className:"syncify-card-label"},e),i.createElement("strong",{className:"syncify-card-value"},t))}function Ft(e,t){return e==="loading"?"Checking status\u2026":e==="error"?"Sync needs attention":e==="success"?"Backup available":e==="needs-restore"?"Restore recommended":t?"Ready to back up":"Loading Syncify"}function Kt(e,t){return e==="loading"?"Checking":e==="error"?"Error":e==="success"?"Synced":e==="needs-restore"?"Restore":t?"Ready":"Starting"}function Ht(e){return e==="success"?"success":e==="error"?"error":e==="needs-restore"?"warning":"neutral"}function Qe(e){let t=new Date(e);if(Number.isNaN(t.getTime()))return e;let n=t.toLocaleDateString(void 0,{month:"short",day:"numeric"}),i=t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${n}, ${i}`}var G="[Syncify]";function x(e,t){if(t===void 0){console.debug(G,e);return}console.debug(G,e,t)}function X(e,t){if(t===void 0){console.warn(G,e);return}console.warn(G,e,t)}(function e(){if(!Yt()){setTimeout(e,100);return}x("Spicetify APIs ready"),zt()})();function Yt(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}function zt(){Wt();let e=N();je({topbarButton:$t(),menuItem:Zt()}),K(e.entryPoint),le(e.shortcut,Z),Ze().catch(t=>{X("Startup sync check failed",t)})}function Wt(){let e="syncify-styles";if(document.getElementById(e))return;let t=document.createElement("style");t.id=e,t.textContent=Pe,document.head.appendChild(t)}function $t(){let{extensionName:e}=d(),t=new Spicetify.Topbar.Button(e,ae,n=>{x("Topbar button clicked",J(n)),Z()},!1,!0);return tt(t),Gt(t),en(t),x("Topbar button registered",J(t)),t}function tt(e){var n;let t=e;e.element.style.setProperty("-webkit-app-region","no-drag"),(n=t.button)==null||n.style.setProperty("-webkit-app-region","no-drag")}var qt=".main-actionButtons",Vt=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function Gt(e){if(typeof MutationObserver=="undefined")return;let t=!1,n=()=>{t=!1;let i=e.element,r=document.querySelector(qt);!i||!r||r.contains(i)||(r.prepend(i),Jt(e),tt(e),x("Topbar button re-attached",J(e)))};new MutationObserver(()=>{t||(t=!0,setTimeout(n,250))}).observe(document.body,{childList:!0,subtree:!0}),n()}function Jt(e){let t=Xt(e);if(!t||t.className&&t.className!=="undefined")return;let n=Array.from(document.querySelectorAll(Vt)).find(i=>!e.element.contains(i));n!=null&&n.className&&(t.className=n.className)}function Xt(e){return e.button}function Zt(){var e;if(typeof((e=Spicetify.Menu)==null?void 0:e.Item)!="function")return null;try{return new Spicetify.Menu.Item(d().extensionName,!1,()=>Z(),Qt())}catch(t){return X("Failed to create profile menu item",t),null}}function Qt(){return ae.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function en(e){Object.assign(window,{SyncifyDebug:{button:e,element:e.element,openModal:Z,inspect:()=>J(e),clickElement:()=>{var t;return(t=e.element)==null?void 0:t.click()},clickInnerButton:()=>{var t;return(t=e.button)==null?void 0:t.click()},clickCallback:()=>e.onClick(e)}})}function J(e){var t,n,i,r,s;return{label:e.label,disabled:e.disabled,isRight:e.isRight,hasElement:!!e.element,elementConnected:(t=e.element)==null?void 0:t.isConnected,elementDisabled:(n=e.element)==null?void 0:n.disabled,elementAriaDisabled:(i=e.element)==null?void 0:i.getAttribute("aria-disabled"),elementClass:(r=e.element)==null?void 0:r.className,appRegion:e.element?getComputedStyle(e.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:e.button?getComputedStyle(e.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:e.element?getComputedStyle(e.element).pointerEvents:null,visibility:e.element?getComputedStyle(e.element).visibility:null,display:e.element?getComputedStyle(e.element).display:null,rect:(s=e.element)==null?void 0:s.getBoundingClientRect().toJSON()}}function Z(){x("Opening modal");let e=document.createElement("div");try{Spicetify.PopupModal.display({title:d().extensionName,content:e,isLarge:!1})}catch(t){throw X("Failed to open PopupModal",t),t}tn(e),on(e)}function tn(e){requestAnimationFrame(()=>{let t=nn(e);t==null||t.classList.add("syncify-modal-shell");let n=t==null?void 0:t.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');n&&(n.classList.add("syncify-modal-close"),n.setAttribute("aria-label",`Close ${d().extensionName}`),n.title="Close",n.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function nn(e){let t=e.parentElement;for(;t&&t!==document.body;){if(t.querySelector(".main-trackCreditsModal-header"))return t;t=t.parentElement}return e.closest('[class*="trackCreditsModal"]')}function on(e){try{let t=Spicetify.React.createElement(et);if(typeof Spicetify.ReactDOM.createRoot=="function"){Spicetify.ReactDOM.createRoot(e).render(t),x("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(t,e),x("Modal rendered",{renderer:"render"})}catch(t){throw X("Failed to render modal",t),t}}})();
