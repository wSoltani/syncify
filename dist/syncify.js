// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var Fe=Object.defineProperty,ze=Object.defineProperties;var Ye=Object.getOwnPropertyDescriptors;var ie=Object.getOwnPropertySymbols;var Ke=Object.prototype.hasOwnProperty,qe=Object.prototype.propertyIsEnumerable;var ae=(e,t,n)=>t in e?Fe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,w=(e,t)=>{for(var n in t||(t={}))Ke.call(t,n)&&ae(e,n,t[n]);if(ie)for(var n of ie(t))qe.call(t,n)&&ae(e,n,t[n]);return e},x=(e,t)=>ze(e,Ye(t));var oe=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the\r
   Spotify modal can size naturally instead of being forced/cropped. */\r
.syncify-modal-shell .main-trackCreditsModal-header,\r
.main-trackCreditsModal-header:has(+ * .syncify-panel),\r
.main-trackCreditsModal-header:has(~ * .syncify-panel) {\r
    display: flex !important;\r
    align-items: center !important;\r
    justify-content: space-between !important;\r
    gap: 12px !important;\r
    padding: 16px 20px 8px !important;\r
}\r
\r
.syncify-modal-shell .main-trackCreditsModal-header h1,\r
.main-trackCreditsModal-header:has(+ * .syncify-panel) h1,\r
.main-trackCreditsModal-header:has(~ * .syncify-panel) h1 {\r
    margin: 0 !important;\r
    font-size: 18px !important;\r
    line-height: 1.25 !important;\r
}\r
\r
.syncify-modal-shell .main-trackCreditsModal-mainSection,\r
.syncify-modal-shell .main-trackCreditsModal-content,\r
.main-trackCreditsModal-mainSection:has(.syncify-panel),\r
.main-trackCreditsModal-content:has(.syncify-panel) {\r
    box-sizing: border-box !important;\r
    max-height: calc(100vh - 140px) !important;\r
    padding: 10px 20px 18px !important;\r
    overflow-y: auto !important;\r
    overflow-x: hidden !important;\r
}\r
\r
.syncify-modal-shell .syncify-modal-close {\r
    display: inline-flex !important;\r
    align-items: center !important;\r
    justify-content: center !important;\r
    width: 32px !important;\r
    height: 32px !important;\r
    min-width: 32px !important;\r
    padding: 0 !important;\r
    border: 0 !important;\r
    border-radius: 999px !important;\r
    color: var(--spice-subtext) !important;\r
    background: transparent !important;\r
    cursor: pointer !important;\r
    transition:\r
        color 120ms ease,\r
        background-color 120ms ease,\r
        transform 120ms ease !important;\r
}\r
\r
.syncify-modal-shell .syncify-modal-close svg {\r
    width: 18px !important;\r
    height: 18px !important;\r
    fill: none !important;\r
    stroke: currentColor !important;\r
    stroke-width: 2 !important;\r
    stroke-linecap: round !important;\r
    stroke-linejoin: round !important;\r
    pointer-events: none !important;\r
}\r
\r
.syncify-modal-shell .syncify-modal-close:hover {\r
    color: var(--spice-text) !important;\r
    background: rgba(255, 255, 255, 0.12) !important;\r
}\r
\r
.syncify-modal-shell .syncify-modal-close:active {\r
    transform: scale(0.96) !important;\r
}\r
\r
.syncify-panel {\r
    box-sizing: border-box;\r
    display: flex;\r
    flex-direction: column;\r
    gap: 12px;\r
    width: 100%;\r
    max-width: 100%;\r
    min-width: 0;\r
    margin: 0;\r
    padding: 0;\r
    color: var(--spice-text);\r
}\r
\r
.syncify-hero {\r
    display: flex;\r
    flex-direction: column;\r
    gap: 8px;\r
    min-width: 0;\r
}\r
\r
.syncify-status-row,\r
.syncify-section-header {\r
    display: flex;\r
    align-items: center;\r
    justify-content: space-between;\r
    gap: 12px;\r
    min-width: 0;\r
}\r
\r
.syncify-description,\r
.syncify-card-label,\r
.syncify-backup-details {\r
    margin: 0;\r
    color: var(--spice-subtext);\r
    line-height: 1.5;\r
}\r
\r
.syncify-heading {\r
    min-width: 0;\r
    margin: 0;\r
    font-size: clamp(18px, 4vw, 23px);\r
    line-height: 1.2;\r
}\r
\r
.syncify-description {\r
    max-width: 64ch;\r
    font-size: 13px;\r
}\r
\r
.syncify-status-pill,\r
.syncify-backup-time {\r
    display: inline-flex;\r
    flex: 0 0 auto;\r
    align-items: center;\r
    justify-content: center;\r
    border-radius: 999px;\r
    font-size: 12px;\r
    font-weight: 700;\r
    line-height: 1.35;\r
    white-space: nowrap;\r
}\r
\r
.syncify-status-pill {\r
    padding: 4px 9px;\r
    color: var(--spice-subtext);\r
    background: rgba(255, 255, 255, 0.08);\r
}\r
\r
.syncify-backup-time {\r
    padding: 4px 9px;\r
    color: var(--spice-text);\r
    background: rgba(255, 255, 255, 0.09);\r
}\r
\r
.syncify-status-pill[data-kind="success"],\r
.syncify-card[data-tone="success"] .syncify-card-value {\r
    color: var(--spice-button-active, #1ed760);\r
}\r
\r
.syncify-status-pill[data-kind="warning"],\r
.syncify-card[data-tone="warning"] .syncify-card-value {\r
    color: #f6c343;\r
}\r
\r
.syncify-status-pill[data-kind="error"] {\r
    color: var(--spice-notification-error, #ff6b6b);\r
}\r
\r
.syncify-grid {\r
    display: flex;\r
    flex-wrap: wrap;\r
    gap: 10px;\r
    min-width: 0;\r
}\r
\r
.syncify-card,\r
.syncify-section {\r
    box-sizing: border-box;\r
    min-width: 0;\r
    border: 1px solid rgba(255, 255, 255, 0.1);\r
    border-radius: 12px;\r
    background: rgba(255, 255, 255, 0.045);\r
}\r
\r
.syncify-card {\r
    display: flex;\r
    flex: 1 1 calc(50% - 5px);\r
    flex-direction: column;\r
    gap: 4px;\r
    min-width: 180px;\r
    padding: 11px 12px;\r
}\r
\r
.syncify-card-label {\r
    overflow: hidden;\r
    font-size: 11px;\r
    text-overflow: ellipsis;\r
    text-transform: uppercase;\r
    white-space: nowrap;\r
}\r
\r
.syncify-card-value {\r
    overflow: hidden;\r
    color: var(--spice-text);\r
    font-size: 17px;\r
    font-weight: 700;\r
    line-height: 1.25;\r
    text-overflow: ellipsis;\r
    white-space: nowrap;\r
}\r
\r
.syncify-section {\r
    display: flex;\r
    flex-direction: column;\r
    gap: 10px;\r
    padding: 12px;\r
}\r
\r
.syncify-backup-section {\r
    background: linear-gradient(\r
        135deg,\r
        rgba(255, 255, 255, 0.07),\r
        rgba(255, 255, 255, 0.035)\r
    );\r
}\r
\r
.syncify-section-title {\r
    min-width: 0;\r
    margin: 0;\r
    font-size: 14px;\r
    line-height: 1.3;\r
}\r
\r
.syncify-backup-list {\r
    display: flex;\r
    flex-direction: column;\r
    gap: 8px;\r
}\r
\r
.syncify-backup-version {\r
    display: flex;\r
    align-items: center;\r
    justify-content: space-between;\r
    gap: 10px;\r
    min-width: 0;\r
    padding: 9px 10px;\r
    border: 1px solid rgba(255, 255, 255, 0.1);\r
    border-radius: 10px;\r
    color: var(--spice-text);\r
    background: rgba(255, 255, 255, 0.045);\r
    text-align: left;\r
    cursor: pointer;\r
    transition:\r
        border-color 120ms ease,\r
        background-color 120ms ease,\r
        opacity 120ms ease,\r
        transform 120ms ease;\r
}\r
\r
.syncify-backup-version:hover:not(:disabled),\r
.syncify-backup-version[data-selected="true"] {\r
    border-color: rgba(30, 215, 96, 0.45);\r
    background: rgba(30, 215, 96, 0.1);\r
}\r
\r
.syncify-backup-version:active:not(:disabled) {\r
    transform: scale(0.99);\r
}\r
\r
.syncify-backup-version:disabled {\r
    cursor: not-allowed;\r
    opacity: 0.65;\r
}\r
\r
.syncify-backup-version-main {\r
    display: flex;\r
    flex: 1 1 auto;\r
    flex-direction: column;\r
    gap: 2px;\r
    min-width: 0;\r
}\r
\r
.syncify-backup-version-main strong,\r
.syncify-backup-version-main span {\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
    white-space: nowrap;\r
}\r
\r
.syncify-backup-version-main span,\r
.syncify-backup-details {\r
    color: var(--spice-subtext);\r
    font-size: 12px;\r
}\r
\r
.syncify-backup-details {\r
    display: flex;\r
    flex: 0 1 auto;\r
    flex-wrap: wrap;\r
    justify-content: flex-end;\r
    gap: 8px;\r
}\r
\r
.syncify-backup-details span {\r
    display: inline-flex;\r
    align-items: center;\r
    min-width: 0;\r
    padding: 4px 8px;\r
    border-radius: 999px;\r
    background: rgba(255, 255, 255, 0.07);\r
}\r
\r
.syncify-actions,\r
.syncify-footer,\r
.syncify-footer-actions {\r
    display: flex;\r
    flex-wrap: wrap;\r
    gap: 8px;\r
}\r
\r
.syncify-actions {\r
    align-items: center;\r
}\r
\r
.syncify-confirm-restore {\r
    display: flex;\r
    flex-direction: column;\r
    gap: 8px;\r
}\r
\r
.syncify-footer {\r
    align-items: center;\r
    justify-content: space-between;\r
}\r
\r
.syncify-footer-actions {\r
    justify-content: flex-end;\r
}\r
\r
.syncify-version {\r
    color: var(--spice-subtext);\r
    font-size: 12px;\r
    line-height: 1.4;\r
}\r
\r
.syncify-button,\r
.syncify-link-button {\r
    border: 0;\r
    border-radius: 999px;\r
    font-weight: 700;\r
    line-height: 1.25;\r
    cursor: pointer;\r
    transition:\r
        color 120ms ease,\r
        background-color 120ms ease,\r
        box-shadow 120ms ease,\r
        opacity 120ms ease,\r
        transform 120ms ease;\r
}\r
\r
.syncify-button {\r
    padding: 8px 14px;\r
    color: var(--spice-button-text, #000);\r
    background: var(--spice-button, #1ed760);\r
}\r
\r
.syncify-button:hover:not(:disabled) {\r
    background: var(--spice-button-active, #1fdf64);\r
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08) inset;\r
}\r
\r
.syncify-button:active:not(:disabled),\r
.syncify-link-button:active:not(:disabled) {\r
    transform: scale(0.98);\r
}\r
\r
.syncify-button.secondary,\r
.syncify-link-button {\r
    color: var(--spice-text);\r
    background: rgba(255, 255, 255, 0.11);\r
}\r
\r
.syncify-button.secondary:hover:not(:disabled),\r
.syncify-link-button:hover:not(:disabled) {\r
    color: var(--spice-text);\r
    background: rgba(255, 255, 255, 0.18);\r
}\r
\r
.syncify-button.danger {\r
    color: #fff;\r
    background: #c92a2a;\r
}\r
\r
.syncify-button.danger:hover:not(:disabled) {\r
    background: #e03131;\r
}\r
\r
.syncify-button:disabled,\r
.syncify-link-button:disabled {\r
    cursor: not-allowed;\r
    opacity: 0.55;\r
}\r
\r
.syncify-toggle {\r
    display: flex;\r
    align-items: flex-start;\r
    gap: 7px;\r
    color: var(--spice-subtext);\r
    font-size: 12px;\r
    line-height: 1.45;\r
    cursor: pointer;\r
}\r
\r
.syncify-toggle input {\r
    flex: 0 0 auto;\r
    margin-top: 2px;\r
    cursor: pointer;\r
}\r
\r
.syncify-toggle:has(input:disabled),\r
.syncify-toggle input:disabled {\r
    cursor: not-allowed;\r
    opacity: 0.65;\r
}\r
\r
.syncify-link-button {\r
    padding: 7px 12px;\r
    font-size: 12px;\r
}\r
\r
.syncify-message {\r
    display: flex;\r
    align-items: flex-start;\r
    gap: 8px;\r
    margin: 0;\r
    padding: 8px 10px;\r
    border: 1px solid rgba(255, 255, 255, 0.1);\r
    border-radius: 10px;\r
    color: var(--spice-text);\r
    background: rgba(255, 255, 255, 0.055);\r
    font-size: 12px;\r
    line-height: 1.45;\r
}\r
\r
.syncify-message::before {\r
    flex: 0 0 auto;\r
    width: 7px;\r
    height: 7px;\r
    margin-top: 5px;\r
    border-radius: 999px;\r
    background: var(--spice-subtext);\r
    content: "";\r
}\r
\r
.syncify-message[data-kind="success"] {\r
    border-color: rgba(30, 215, 96, 0.35);\r
    background: rgba(30, 215, 96, 0.1);\r
}\r
\r
.syncify-message[data-kind="success"]::before {\r
    background: var(--spice-button-active, #1ed760);\r
}\r
\r
.syncify-message[data-kind="warning"] {\r
    border-color: rgba(246, 195, 67, 0.38);\r
    background: rgba(246, 195, 67, 0.1);\r
}\r
\r
.syncify-message[data-kind="warning"]::before {\r
    background: #f6c343;\r
}\r
\r
.syncify-message[data-kind="error"] {\r
    border-color: rgba(255, 107, 107, 0.4);\r
    background: rgba(255, 107, 107, 0.1);\r
}\r
\r
.syncify-message[data-kind="error"]::before {\r
    background: var(--spice-notification-error, #ff6b6b);\r
}\r
\r
.syncify-message.inline {\r
    padding: 7px 9px;\r
}\r
\r
@media (max-width: 560px) {\r
    .syncify-modal-shell .main-trackCreditsModal-mainSection,\r
    .syncify-modal-shell .main-trackCreditsModal-content,\r
    .main-trackCreditsModal-mainSection:has(.syncify-panel),\r
    .main-trackCreditsModal-content:has(.syncify-panel) {\r
        max-height: calc(100vh - 110px) !important;\r
        padding: 10px 14px 14px !important;\r
    }\r
\r
    .syncify-status-row,\r
    .syncify-section-header {\r
        align-items: flex-start;\r
        flex-direction: column;\r
        gap: 6px;\r
    }\r
\r
    .syncify-card {\r
        flex-basis: 100%;\r
        min-width: 0;\r
    }\r
\r
    .syncify-backup-version {\r
        align-items: flex-start;\r
        flex-direction: column;\r
    }\r
\r
    .syncify-backup-details {\r
        justify-content: flex-start;\r
    }\r
\r
    .syncify-actions,\r
    .syncify-footer,\r
    .syncify-footer-actions {\r
        flex-direction: column;\r
    }\r
\r
    .syncify-footer {\r
        align-items: stretch;\r
    }\r
\r
    .syncify-button,\r
    .syncify-link-button {\r
        width: 100%;\r
    }\r
}\r
`;var re=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>\r
`;var se="x-syncify-user-hash";async function ce(e,t,n){let i=await fetch(e,{method:"POST",headers:{"content-type":"application/json",[se]:t},body:JSON.stringify(n)});if(!i.ok)throw new Error(`Backup failed with HTTP ${i.status}.`)}async function le(e,t){var r;let n=await fetch(e,{method:"GET",headers:{[se]:t}});if(n.status===404)return{exists:!1,payload:null,backups:[]};if(!n.ok)throw new Error(`Restore failed with HTTP ${n.status}.`);let i=await n.json(),o=[i,...(r=i.backup_history)!=null?r:[]].slice(0,3);return{exists:!0,payload:i,backups:o}}var g={extensionName:"Syncify",version:"1.1.1",workerUrl:"https://syncify-worker.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"https://github.com/wSoltani/Syncify/issues/new"};function f(){var t,n,i,o,r,l;let e=window.SyncifyConfig;return{extensionName:(t=v(e==null?void 0:e.extensionName))!=null?t:g.extensionName,version:(n=ye(e==null?void 0:e.version))!=null?n:g.version,workerUrl:(i=v(e==null?void 0:e.workerUrl))!=null?i:g.workerUrl,githubUrl:(o=v(e==null?void 0:e.githubUrl))!=null?o:g.githubUrl,kofiUrl:(r=v(e==null?void 0:e.kofiUrl))!=null?r:g.kofiUrl,issueUrl:(l=v(e==null?void 0:e.issueUrl))!=null?l:g.issueUrl}}function v(e){return ye(e)}function ye(e){return typeof e=="string"&&e.trim()?e.trim():null}var P="syncify:config",Y={workerUrl:f().workerUrl,autoBackupEnabled:!1};function _(){var n,i;let e=f(),t=(i=(n=Spicetify.LocalStorage)==null?void 0:n.get(P))!=null?i:window.localStorage.getItem(P);if(!t)return x(w({},Y),{workerUrl:e.workerUrl});try{let o=JSON.parse(t);return{workerUrl:e.workerUrl,autoBackupEnabled:o.autoBackupEnabled===void 0?Y.autoBackupEnabled:!!o.autoBackupEnabled}}catch(o){return x(w({},Y),{workerUrl:e.workerUrl})}}function de(e){var n;let t=JSON.stringify({workerUrl:f().workerUrl,autoBackupEnabled:e.autoBackupEnabled});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set(P,t);return}window.localStorage.setItem(P,t)}function K(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}async function C(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return[...new Uint8Array(n)].map(i=>i.toString(16).padStart(2,"0")).join("")}function W(e){return JSON.stringify(q(e))}function q(e){return Array.isArray(e)?e.map(q):e&&typeof e=="object"?Object.keys(e).sort().reduce((t,n)=>(t[n]=q(e[n]),t),{}):e}async function $(){let e=await Ve();return C(e)}async function Ve(){var i,o,r,l,c;let e=(i=Spicetify.Platform)==null?void 0:i.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let t=await e.getUser(),n=(c=(l=(r=(o=t==null?void 0:t.username)!=null?o:t==null?void 0:t.canonicalUsername)!=null?r:t==null?void 0:t.id)!=null?l:t==null?void 0:t.uri)!=null?c:t==null?void 0:t.displayName;if(!n)throw new Error("Unable to resolve the active Spotify user.");return n}function fe(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var U="spicetify-marketplace";var N="settings";async function ue(){let e=await ge();if(e.kind!=="ok")return null;try{let t=await be(e.db,"readonly",i=>i.getAll());if(!t)return null;let n={};for(let i of t)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(n[i.key]=i.value);return n}finally{e.db.close()}}async function pe(e){let t=await ge();if(t.kind==="unavailable")return"unavailable";let n=t.kind==="ok"?t.db:await Ge();if(!n)return"failed";try{return await be(n,"readwrite",o=>{let r;for(let[l,c]of Object.entries(e))r=o.put({key:l,value:c});return r})===null?"failed":"written"}finally{n.close()}}function me(){var e;try{return(e=window.indexedDB)!=null?e:null}catch(t){return null}}async function ge(){let e=me();return e?await Je(e)?{kind:"missing"}:new Promise(t=>{let n=!1,i=e.open(U);i.onupgradeneeded=()=>{n=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),t({kind:"unavailable"})},i.onblocked=()=>t({kind:"unavailable"}),i.onsuccess=()=>{let o=i.result;if(n){o.close(),Xe(e).then(()=>t({kind:"missing"}));return}if(!o.objectStoreNames.contains(N)){o.close(),t({kind:"unavailable"});return}t({kind:"ok",db:o})}}):{kind:"unavailable"}}function Ge(){let e=me();return e?new Promise(t=>{let n=e.open(U,1);n.onupgradeneeded=()=>{let i=n.result;i.objectStoreNames.contains(N)||i.createObjectStore(N,{keyPath:"key"})},n.onerror=()=>{console.warn("Syncify could not create Marketplace storage",n.error),t(null)},n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}async function Je(e){if(typeof e.databases!="function")return!1;try{return!(await e.databases()).some(n=>n.name===U)}catch(t){return!1}}function Xe(e){return new Promise(t=>{let n=e.deleteDatabase(U);n.onsuccess=()=>t(),n.onerror=()=>t(),n.onblocked=()=>t()})}function be(e,t,n){return new Promise(i=>{let o;try{o=e.transaction(N,t)}catch(d){console.warn("Syncify could not open a Marketplace transaction",d),i(null);return}let r,l=!1,c=d=>{l||(l=!0,i(d))};o.oncomplete=()=>c(r),o.onerror=()=>{console.warn("Syncify Marketplace transaction failed",o.error),c(null)},o.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",o.error),c(null)};let y;try{y=n(o.objectStore(N))}catch(d){console.warn("Syncify Marketplace request could not be issued",d),c(null);return}y&&(y.onsuccess=()=>{r=y.result},y.onerror=()=>{console.warn("Syncify Marketplace request failed",y.error),c(null)})})}var V="marketplace:",ke=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function he(){let e=tt(),t=await ue();if(t)for(let[n,i]of Object.entries(t))n.startsWith(V)&&(e[n]=i);return e}async function T(){let e=await he();return{keyCount:Object.keys(e).length,hash:await C(W(e)),installedItemCount:Ze(e),marketplaceAvailable:et(e)}}async function Se(){let e=await he();return{schema_version:1,metadata:{last_sync_datetime:new Date().toISOString(),device_info:fe(),marketplace_key_count:Object.keys(e).length},payload_hash:await C(W(e)),marketplace_data:{keys:e}}}async function we(e){var r,l;let t={},n=(l=(r=e.marketplace_data)==null?void 0:r.keys)!=null?l:{};for(let[c,y]of Object.entries(n))c.startsWith(V)&&(t[c]=y);let i=Object.keys(t);if(i.length===0)return 0;for(let c of i)window.localStorage.setItem(c,t[c]);if(await pe(t)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try the restore again.");return i.length}function Ze(e){return ke.reduce((t,n)=>t+nt(e[n]),0)}function et(e){return!!(window.Marketplace||ke.some(n=>e[n]!==void 0)||e["marketplace:tabs"]!==void 0)}function xe(e,t){return t===0?!1:e===0?!0:e<Math.max(2,Math.floor(t*.5))}function tt(){let e={};for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);if(!(n!=null&&n.startsWith(V)))continue;let i=window.localStorage.getItem(n);i!==null&&(e[n]=i)}return e}function nt(e){if(!e)return 0;try{let t=JSON.parse(e);return Array.isArray(t)?t.length:0}catch(t){return 0}}async function I(e){if(!K(e))throw new Error("Syncify backup service is not configured.");let[t,n]=await Promise.all([$(),Se()]);if(n.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");return await ce(e.workerUrl,t,n),n}async function M(e){if(!K(e))throw new Error("Syncify backup service is not configured.");return le(e.workerUrl,await $())}async function ve(e,t){let n=t!=null?t:(await M(e)).payload;if(!n)throw new Error("No Syncify cloud backup was found for this Spotify account.");let i=await we(n);return{payload:n,restoredCount:i}}async function Ce(){var t,n,i;let e=_();if(!(!e.workerUrl||!e.autoBackupEnabled))try{let[o,r]=await Promise.all([T(),M(e)]),l=(n=(t=r.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?n:0;if(r.exists&&xe(o.keyCount,l)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((i=r.payload)==null?void 0:i.payload_hash)===o.hash||o.keyCount===0)return;await I(e),Spicetify.showNotification("Syncify auto-backup complete")}catch(o){let r=o instanceof Error?o.message:String(o);console.warn("Syncify startup sync failed:",o),Spicetify.showNotification(`Syncify auto-sync skipped: ${r}`,!0,8e3)}}function Me(){var ne;let e=Spicetify.React,t=e.useEffect,n=e.useMemo,i=e.useState,[o,r]=i(()=>_()),[l,c]=i("idle"),[y,d]=i(null),[Be,Pe]=i(0),[_e,Ue]=i(0),[k,Te]=i(null),[X,Ie]=i(null),[u,R]=i(null),[Q,Z]=i([]),[p,h]=i(null),[E,O]=i(!1),[Ae,S]=i(!1),B=n(()=>f(),[]),m=l==="loading",j=(y==null?void 0:y.kind)==="warning"||(y==null?void 0:y.kind)==="error"?y:null,De=(ne=u==null?void 0:u.metadata.marketplace_key_count)!=null?ne:0,Re=!!(u&&X&&u.payload_hash!==X);t(()=>{te({silent:!0})},[]);async function ee(){let a=await T();return Pe(a.keyCount),Ie(a.hash),Ue(a.installedItemCount),Te(a.marketplaceAvailable),a}async function te(a){try{S(!1),c("loading"),a!=null&&a.silent||d({kind:"info",text:"Checking your Syncify backup\u2026"}),await ee();let s=await M(o);R(s.payload),Z(s.backups),h(s.payload),O(!0),c(s.exists?"success":"idle"),a!=null&&a.silent||d(s.exists&&s.payload?{kind:"success",text:`Backup found from ${Ne(s.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(s){H(s)}}function Oe(a){let s=x(w({},o),{autoBackupEnabled:a});r(s),de(s),d({kind:"success",text:a?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}async function je(){try{S(!1),c("loading"),d({kind:"info",text:"Backing up your extensions and themes\u2026"});let a=await I(o);R(a),Z(s=>[a,...s.filter(z=>z.payload_hash!==a.payload_hash)].slice(0,3)),h(a),O(!0),await ee(),c("success"),d({kind:"success",text:`Backed up ${a.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(a){H(a)}}function Le(a=p){if(k===!1){let s="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";d({kind:"error",text:s}),Spicetify.showNotification(s,!0,6e3);return}if(!a){let s="No Syncify cloud backup was found for this Spotify account.";d({kind:"error",text:s}),Spicetify.showNotification(s,!0,6e3);return}h(a),S(!0)}async function He(){try{S(!1),c("loading"),d({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:a,restoredCount:s}=await ve(o,p!=null?p:void 0);R(a),h(a),O(!0),c("success"),d({kind:"success",text:`Restored ${s} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),setTimeout(()=>window.location.reload(),1e3)}catch(a){H(a)}}function L(a){if(a.startsWith("mailto:")){window.location.href=a;return}window.open(a,"_blank","noopener,noreferrer")}function H(a){let s=a instanceof Error?a.message:String(a);c("error"),d({kind:"error",text:s}),Spicetify.showNotification(s,!0,6e3)}function F(a){a.stopPropagation()}return e.createElement("div",{className:"syncify-panel",onClick:F,onMouseDown:F,onPointerDown:F},e.createElement("section",{className:"syncify-hero","aria-label":"Syncify status"},e.createElement("p",{className:"syncify-description"},"Back up your installed extensions and themes, then restore them whenever Spotify or Spicetify needs a fresh setup."),e.createElement("div",{className:"syncify-status-row"},e.createElement("h3",{className:"syncify-heading"},it(l,E)),e.createElement("span",{className:"syncify-status-pill","data-kind":ot(l)},at(l,E))),j?e.createElement("p",{className:"syncify-message","data-kind":j.kind},j.text):null),e.createElement("section",{className:"syncify-grid","aria-label":"Syncify backup details"},e.createElement(A,{label:"Backup entries",value:Be}),e.createElement(A,{label:"Extensions/themes",value:_e}),e.createElement(A,{label:"Backup",value:u?`${De} entries`:E?"None":"Checking",tone:u?"success":E?"warning":"neutral"}),e.createElement(A,{label:"Restore",value:k===null?"Checking":k?"Ready":"Missing",tone:k===null?"neutral":k?"success":"warning"})),u?e.createElement("section",{className:"syncify-section syncify-backup-section"},e.createElement("div",{className:"syncify-section-header"},e.createElement("h4",{className:"syncify-section-title"},"Version history"),e.createElement("span",{className:"syncify-backup-time"},Q.length," saved")),e.createElement("div",{className:"syncify-backup-list"},Q.map((a,s)=>{let z=(p==null?void 0:p.payload_hash)===a.payload_hash;return e.createElement("button",{className:"syncify-backup-version","data-selected":z?"true":"false",type:"button",key:`${a.payload_hash}-${a.metadata.last_sync_datetime}`,onClick:()=>h(a),disabled:m},e.createElement("span",{className:"syncify-backup-version-main"},e.createElement("strong",null,s===0?"Latest":`Backup ${s+1}`),e.createElement("span",null,Ne(a.metadata.last_sync_datetime))),e.createElement("span",{className:"syncify-backup-details"},e.createElement("span",null,a.metadata.device_info),e.createElement("span",null,a.metadata.marketplace_key_count," entries")))})),Re?e.createElement("p",{className:"syncify-message inline","data-kind":"warning"},"This device differs from your latest backup. Select any saved version to restore it, or back up to add a new version."):null):null,e.createElement("section",{className:"syncify-section compact"},e.createElement("h4",{className:"syncify-section-title"},"Sync controls"),Ae?e.createElement("div",{className:"syncify-confirm-restore"},e.createElement("p",{className:"syncify-message inline","data-kind":"warning"},"Restore will replace this device's saved extensions and themes with the selected backup, then reload Spotify."),e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>S(!1),disabled:m},"Cancel"),e.createElement("button",{className:"syncify-button danger",type:"button",onClick:He,disabled:m},"Confirm restore"))):e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button",type:"button",onClick:je,disabled:m},"Back up"),e.createElement("button",{className:"syncify-button danger",type:"button",onClick:()=>Le(),disabled:m||!p},"Restore selected"),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{te()},disabled:m},"Refresh status")),e.createElement("label",{className:"syncify-toggle"},e.createElement("input",{type:"checkbox",checked:o.autoBackupEnabled,onChange:a=>Oe(a.currentTarget.checked),disabled:m}),e.createElement("span",null,"Auto-backup extensions and themes after startup safety checks"))),e.createElement("section",{className:"syncify-footer","aria-label":"Syncify links"},e.createElement("span",{className:"syncify-version"},"v",B.version),e.createElement("div",{className:"syncify-footer-actions"},e.createElement("button",{className:"syncify-link-button",type:"button",onClick:()=>L(B.issueUrl)},"Report an issue"),e.createElement("button",{className:"syncify-link-button",type:"button",onClick:()=>L(B.githubUrl)},"GitHub"),e.createElement("button",{className:"syncify-link-button",type:"button",onClick:()=>L(B.kofiUrl)},"Ko-fi"))))}function A({label:e,value:t,tone:n="neutral"}){let i=Spicetify.React;return i.createElement("div",{className:"syncify-card","data-tone":n},i.createElement("span",{className:"syncify-card-label"},e),i.createElement("strong",{className:"syncify-card-value"},t))}function it(e,t){return e==="loading"?"Checking status\u2026":e==="error"?"Sync needs attention":e==="success"?"Backup available":e==="needs-restore"?"Restore recommended":t?"Ready to back up":"Loading Syncify"}function at(e,t){return e==="loading"?"Checking":e==="error"?"Error":e==="success"?"Synced":e==="needs-restore"?"Restore":t?"Ready":"Starting"}function ot(e){return e==="success"?"success":e==="error"?"error":e==="needs-restore"?"warning":"neutral"}function Ne(e){let t=new Date(e);if(Number.isNaN(t.getTime()))return e;let n=t.toLocaleDateString(void 0,{month:"short",day:"numeric"}),i=t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${n}, ${i}`}var D="[Syncify]";function b(e,t){if(t===void 0){console.debug(D,e);return}console.debug(D,e,t)}function J(e,t){if(t===void 0){console.warn(D,e);return}console.warn(D,e,t)}(function e(){if(!rt()){setTimeout(e,100);return}b("Spicetify APIs ready"),st()})();function rt(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}function st(){ct(),lt(),Ce().catch(e=>{J("Startup sync check failed",e)})}function ct(){let e="syncify-styles";if(document.getElementById(e))return;let t=document.createElement("style");t.id=e,t.textContent=oe,document.head.appendChild(t)}function lt(){let{extensionName:e}=f(),t=new Spicetify.Topbar.Button(e,re,n=>{b("Topbar button clicked",G(n)),Ee()},!1,!0);yt(t),dt(t),b("Topbar button registered",G(t))}function yt(e){var n;let t=e;e.element.style.setProperty("-webkit-app-region","no-drag"),(n=t.button)==null||n.style.setProperty("-webkit-app-region","no-drag")}function dt(e){Object.assign(window,{SyncifyDebug:{button:e,element:e.element,openModal:Ee,inspect:()=>G(e),clickElement:()=>{var t;return(t=e.element)==null?void 0:t.click()},clickInnerButton:()=>{var t;return(t=e.button)==null?void 0:t.click()},clickCallback:()=>e.onClick(e)}})}function G(e){var t,n,i,o,r;return{label:e.label,disabled:e.disabled,isRight:e.isRight,hasElement:!!e.element,elementConnected:(t=e.element)==null?void 0:t.isConnected,elementDisabled:(n=e.element)==null?void 0:n.disabled,elementAriaDisabled:(i=e.element)==null?void 0:i.getAttribute("aria-disabled"),elementClass:(o=e.element)==null?void 0:o.className,appRegion:e.element?getComputedStyle(e.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:e.button?getComputedStyle(e.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:e.element?getComputedStyle(e.element).pointerEvents:null,visibility:e.element?getComputedStyle(e.element).visibility:null,display:e.element?getComputedStyle(e.element).display:null,rect:(r=e.element)==null?void 0:r.getBoundingClientRect().toJSON()}}function Ee(){b("Opening modal");let e=document.createElement("div");try{Spicetify.PopupModal.display({title:f().extensionName,content:e,isLarge:!1})}catch(t){throw J("Failed to open PopupModal",t),t}ft(e),pt(e)}function ft(e){requestAnimationFrame(()=>{let t=ut(e);t==null||t.classList.add("syncify-modal-shell");let n=t==null?void 0:t.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');n&&(n.classList.add("syncify-modal-close"),n.setAttribute("aria-label",`Close ${f().extensionName}`),n.title="Close",n.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function ut(e){let t=e.parentElement;for(;t&&t!==document.body;){if(t.querySelector(".main-trackCreditsModal-header"))return t;t=t.parentElement}return e.closest('[class*="trackCreditsModal"]')}function pt(e){try{let t=Spicetify.React.createElement(Me);if(typeof Spicetify.ReactDOM.createRoot=="function"){Spicetify.ReactDOM.createRoot(e).render(t),b("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(t,e),b("Modal rendered",{renderer:"render"})}catch(t){throw J("Failed to render modal",t),t}}})();
