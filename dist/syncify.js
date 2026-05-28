// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var Ue=Object.defineProperty,Pe=Object.defineProperties;var Be=Object.getOwnPropertyDescriptors;var J=Object.getOwnPropertySymbols;var _e=Object.prototype.hasOwnProperty,Te=Object.prototype.propertyIsEnumerable;var V=(e,t,n)=>t in e?Ue(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,b=(e,t)=>{for(var n in t||(t={}))_e.call(t,n)&&V(e,n,t[n]);if(J)for(var n of J(t))Te.call(t,n)&&V(e,n,t[n]);return e},k=(e,t)=>Pe(e,Be(t));var q=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the\r
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
.syncify-backup-details {\r
    display: flex;\r
    flex-wrap: wrap;\r
    gap: 8px;\r
    font-size: 12px;\r
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
.syncify-footer {\r
    display: flex;\r
    flex-wrap: wrap;\r
    gap: 8px;\r
}\r
\r
.syncify-actions {\r
    align-items: center;\r
}\r
\r
.syncify-footer {\r
    justify-content: flex-end;\r
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
    .syncify-actions,\r
    .syncify-footer {\r
        flex-direction: column;\r
    }\r
\r
    .syncify-button,\r
    .syncify-link-button {\r
        width: 100%;\r
    }\r
}\r
`;var X=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>\r
`;var Q="x-syncify-user-hash";async function Z(e,t,n){let i=await fetch(e,{method:"POST",headers:{"content-type":"application/json",[Q]:t},body:JSON.stringify(n)});if(!i.ok)throw new Error(`Backup failed with HTTP ${i.status}.`)}async function ee(e,t){let n=await fetch(e,{method:"GET",headers:{[Q]:t}});if(n.status===404)return{exists:!1,payload:null};if(!n.ok)throw new Error(`Restore failed with HTTP ${n.status}.`);return{exists:!0,payload:await n.json()}}var x={workerUrl:"https://syncify-worker.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"mailto:wasoltani+syncify@gmail.com"};function u(){var t,n,i,a;let e=window.SyncifyConfig;return{workerUrl:(t=C(e==null?void 0:e.workerUrl))!=null?t:x.workerUrl,githubUrl:(n=C(e==null?void 0:e.githubUrl))!=null?n:x.githubUrl,kofiUrl:(i=C(e==null?void 0:e.kofiUrl))!=null?i:x.kofiUrl,issueUrl:(a=C(e==null?void 0:e.issueUrl))!=null?a:x.issueUrl}}function C(e){return typeof e=="string"&&e.trim()?e.trim():null}var v="syncify:config",O={workerUrl:u().workerUrl,autoBackupEnabled:!1};function M(){var n,i;let e=u(),t=(i=(n=Spicetify.LocalStorage)==null?void 0:n.get(v))!=null?i:window.localStorage.getItem(v);if(!t)return k(b({},O),{workerUrl:e.workerUrl});try{let a=JSON.parse(t);return{workerUrl:e.workerUrl,autoBackupEnabled:a.autoBackupEnabled===void 0?O.autoBackupEnabled:!!a.autoBackupEnabled}}catch(a){return k(b({},O),{workerUrl:e.workerUrl})}}function te(e){var n;let t=JSON.stringify({workerUrl:u().workerUrl,autoBackupEnabled:e.autoBackupEnabled});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set(v,t);return}window.localStorage.setItem(v,t)}function j(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}async function h(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return[...new Uint8Array(n)].map(i=>i.toString(16).padStart(2,"0")).join("")}function z(e){return JSON.stringify(H(e))}function H(e){return Array.isArray(e)?e.map(H):e&&typeof e=="object"?Object.keys(e).sort().reduce((t,n)=>(t[n]=H(e[n]),t),{}):e}async function D(){let e=await Ae();return h(e)}async function Ae(){var i,a,r,c,y;let e=(i=Spicetify.Platform)==null?void 0:i.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let t=await e.getUser(),n=(y=(c=(r=(a=t==null?void 0:t.username)!=null?a:t==null?void 0:t.canonicalUsername)!=null?r:t==null?void 0:t.id)!=null?c:t==null?void 0:t.uri)!=null?y:t==null?void 0:t.displayName;if(!n)throw new Error("Unable to resolve the active Spotify user.");return n}function ne(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var ie="marketplace:",oe=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];function ae(){let e={};for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);if(!(n!=null&&n.startsWith(ie)))continue;let i=window.localStorage.getItem(n);i!==null&&(e[n]=i)}return e}async function E(){let e=ae();return{keyCount:Object.keys(e).length,hash:await h(z(e))}}async function re(){let e=ae();return{schema_version:1,metadata:{last_sync_datetime:new Date().toISOString(),device_info:ne(),marketplace_key_count:Object.keys(e).length},payload_hash:await h(z(e)),marketplace_data:{keys:e}}}function se(e){var i,a;let t=(a=(i=e.marketplace_data)==null?void 0:i.keys)!=null?a:{},n=0;for(let[r,c]of Object.entries(t))r.startsWith(ie)&&(window.localStorage.setItem(r,c),n+=1);return n}function ce(){return oe.reduce((e,t)=>e+Oe(window.localStorage.getItem(t)),0)}function le(){return!!(window.Marketplace||oe.some(t=>window.localStorage.getItem(t)!==null)||window.localStorage.getItem("marketplace:tabs")!==null)}function ye(e,t){return t===0?!1:e===0?!0:e<Math.max(2,Math.floor(t*.5))}function Oe(e){if(!e)return 0;try{let t=JSON.parse(e);return Array.isArray(t)?t.length:0}catch(t){return 0}}async function N(e){if(!j(e))throw new Error("Syncify backup service is not configured.");let[t,n]=await Promise.all([D(),re()]);if(n.metadata.marketplace_key_count===0)throw new Error("Syncify will not back up an empty extension/theme state.");return await Z(e.workerUrl,t,n),n}async function S(e){if(!j(e))throw new Error("Syncify backup service is not configured.");return ee(e.workerUrl,await D())}async function de(e){let t=await S(e);if(!t.exists||!t.payload)throw new Error("No Syncify cloud backup was found for this Spotify account.");let n=se(t.payload);return{payload:t.payload,restoredCount:n}}async function fe(){var t,n,i;let e=M();if(!(!e.workerUrl||!e.autoBackupEnabled))try{let[a,r]=await Promise.all([E(),S(e)]),c=(n=(t=r.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?n:0;if(r.exists&&ye(a.keyCount,c)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((i=r.payload)==null?void 0:i.payload_hash)===a.hash||a.keyCount===0)return;await N(e),Spicetify.showNotification("Syncify auto-backup complete")}catch(a){let r=a instanceof Error?a.message:String(a);console.warn("Syncify startup sync failed:",a),Spicetify.showNotification(`Syncify auto-sync skipped: ${r}`,!0,8e3)}}function ue(){var G;let e=Spicetify.React,t=e.useEffect,n=e.useMemo,i=e.useState,[a,r]=i(()=>M()),[c,y]=i("idle"),[f,d]=i(null),[ge,be]=i(0),[ke,he]=i(0),[K,Se]=i(null),[l,B]=i(null),[w,_]=i(!1),[we,g]=i(!1),T=n(()=>u(),[]),p=c==="loading",I=(f==null?void 0:f.kind)==="warning"||(f==null?void 0:f.kind)==="error"?f:null,L=n(()=>le(),[]),xe=(G=l==null?void 0:l.metadata.marketplace_key_count)!=null?G:0,Ce=!!(l&&K&&l.payload_hash!==K);t(()=>{$({silent:!0})},[]);async function W(){let o=await E();return be(o.keyCount),Se(o.hash),he(ce()),o}async function $(o){try{g(!1),y("loading"),o!=null&&o.silent||d({kind:"info",text:"Checking your Syncify backup\u2026"}),await W();let s=await S(a);B(s.payload),_(!0),y(s.exists?"success":"idle"),o!=null&&o.silent||d(s.exists&&s.payload?{kind:"success",text:`Backup found from ${pe(s.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(s){R(s)}}function ve(o){let s=k(b({},a),{autoBackupEnabled:o});r(s),te(s),d({kind:"success",text:o?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}async function Me(){try{g(!1),y("loading"),d({kind:"info",text:"Backing up your extensions and themes\u2026"});let o=await N(a);B(o),_(!0),await W(),y("success"),d({kind:"success",text:`Backed up ${o.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(o){R(o)}}function Ee(){if(!L){let o="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";d({kind:"error",text:o}),Spicetify.showNotification(o,!0,6e3);return}g(!0),d({kind:"warning",text:"Restore will replace this device's saved extensions and themes, then reload Spotify."})}async function Ne(){try{g(!1),y("loading"),d({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:o,restoredCount:s}=await de(a);B(o),_(!0),y("success"),d({kind:"success",text:`Restored ${s} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),setTimeout(()=>window.location.reload(),1e3)}catch(o){R(o)}}function A(o){window.open(o,"_blank","noopener,noreferrer")}function R(o){let s=o instanceof Error?o.message:String(o);y("error"),d({kind:"error",text:s}),Spicetify.showNotification(s,!0,6e3)}return e.createElement("div",{className:"syncify-panel"},e.createElement("section",{className:"syncify-hero","aria-label":"Syncify status"},e.createElement("p",{className:"syncify-description"},"Back up your installed extensions and themes, then restore them whenever Spotify or Spicetify needs a fresh setup."),e.createElement("div",{className:"syncify-status-row"},e.createElement("h3",{className:"syncify-heading"},je(c,w)),e.createElement("span",{className:"syncify-status-pill","data-kind":ze(c)},He(c,w))),I?e.createElement("p",{className:"syncify-message","data-kind":I.kind},I.text):null),e.createElement("section",{className:"syncify-grid","aria-label":"Syncify backup details"},e.createElement(U,{label:"Backup entries",value:ge}),e.createElement(U,{label:"Extensions/themes",value:ke}),e.createElement(U,{label:"Backup",value:l?`${xe} entries`:w?"None":"Checking",tone:l?"success":w?"warning":"neutral"}),e.createElement(U,{label:"Restore",value:L?"Ready":"Missing",tone:L?"success":"warning"})),l?e.createElement("section",{className:"syncify-section syncify-backup-section"},e.createElement("div",{className:"syncify-section-header"},e.createElement("h4",{className:"syncify-section-title"},"Latest backup"),e.createElement("span",{className:"syncify-backup-time"},pe(l.metadata.last_sync_datetime))),e.createElement("div",{className:"syncify-backup-details"},e.createElement("span",null,l.metadata.device_info),e.createElement("span",null,l.metadata.marketplace_key_count," entries")),Ce?e.createElement("p",{className:"syncify-message inline","data-kind":"warning"},"This device differs from your backup. Restore to apply the saved extensions and themes here, or back up to replace it."):null):null,e.createElement("section",{className:"syncify-section compact"},e.createElement("h4",{className:"syncify-section-title"},"Sync controls"),e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button",type:"button",onClick:Me,disabled:p},"Back up now"),we?e.createElement(e.Fragment,null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>g(!1),disabled:p},"Cancel"),e.createElement("button",{className:"syncify-button danger",type:"button",onClick:Ne,disabled:p},"Confirm restore")):e.createElement("button",{className:"syncify-button danger",type:"button",onClick:Ee,disabled:p},"Restore backup"),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{$()},disabled:p},"Refresh status")),e.createElement("label",{className:"syncify-toggle"},e.createElement("input",{type:"checkbox",checked:a.autoBackupEnabled,onChange:o=>ve(o.currentTarget.checked),disabled:p}),e.createElement("span",null,"Auto-backup extensions and themes after startup safety checks"))),e.createElement("section",{className:"syncify-footer","aria-label":"Syncify links"},e.createElement("button",{className:"syncify-link-button",type:"button",onClick:()=>A(T.issueUrl)},"Report an issue"),e.createElement("button",{className:"syncify-link-button",type:"button",onClick:()=>A(T.githubUrl)},"GitHub"),e.createElement("button",{className:"syncify-link-button",type:"button",onClick:()=>A(T.kofiUrl)},"Ko-fi")))}function U({label:e,value:t,tone:n="neutral"}){let i=Spicetify.React;return i.createElement("div",{className:"syncify-card","data-tone":n},i.createElement("span",{className:"syncify-card-label"},e),i.createElement("strong",{className:"syncify-card-value"},t))}function je(e,t){return e==="loading"?"Checking status\u2026":e==="error"?"Sync needs attention":e==="success"?"Backup available":e==="needs-restore"?"Restore recommended":t?"Ready to back up":"Loading Syncify"}function He(e,t){return e==="loading"?"Checking":e==="error"?"Error":e==="success"?"Synced":e==="needs-restore"?"Restore":t?"Ready":"Starting"}function ze(e){return e==="success"?"success":e==="error"?"error":e==="needs-restore"?"warning":"neutral"}function pe(e){let t=new Date(e);if(Number.isNaN(t.getTime()))return e;let n=t.toLocaleDateString(void 0,{month:"short",day:"numeric"}),i=t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${n}, ${i}`}var P="[Syncify]";function m(e,t){if(t===void 0){console.debug(P,e);return}console.debug(P,e,t)}function Y(e,t){if(t===void 0){console.warn(P,e);return}console.warn(P,e,t)}(function e(){if(!De()){setTimeout(e,100);return}m("Spicetify APIs ready"),Fe()})();function De(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}function Fe(){Ye(),Ke(),fe().catch(e=>{Y("Startup sync check failed",e)})}function Ye(){let e="syncify-styles";if(document.getElementById(e))return;let t=document.createElement("style");t.id=e,t.textContent=q,document.head.appendChild(t)}function Ke(){let e=new Spicetify.Topbar.Button("Syncify",X,t=>{m("Topbar button clicked",F(t)),me()},!1,!0);We(e),$e(e),m("Topbar button registered",F(e))}function We(e){var n;let t=e;e.element.style.setProperty("-webkit-app-region","no-drag"),(n=t.button)==null||n.style.setProperty("-webkit-app-region","no-drag")}function $e(e){Object.assign(window,{SyncifyDebug:{button:e,element:e.element,openModal:me,inspect:()=>F(e),clickElement:()=>{var t;return(t=e.element)==null?void 0:t.click()},clickInnerButton:()=>{var t;return(t=e.button)==null?void 0:t.click()},clickCallback:()=>e.onClick(e)}})}function F(e){var t,n,i,a,r;return{label:e.label,disabled:e.disabled,isRight:e.isRight,hasElement:!!e.element,elementConnected:(t=e.element)==null?void 0:t.isConnected,elementDisabled:(n=e.element)==null?void 0:n.disabled,elementAriaDisabled:(i=e.element)==null?void 0:i.getAttribute("aria-disabled"),elementClass:(a=e.element)==null?void 0:a.className,appRegion:e.element?getComputedStyle(e.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:e.button?getComputedStyle(e.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:e.element?getComputedStyle(e.element).pointerEvents:null,visibility:e.element?getComputedStyle(e.element).visibility:null,display:e.element?getComputedStyle(e.element).display:null,rect:(r=e.element)==null?void 0:r.getBoundingClientRect().toJSON()}}function me(){m("Opening modal");let e=document.createElement("div");try{Spicetify.PopupModal.display({title:"Syncify",content:e,isLarge:!1})}catch(t){throw Y("Failed to open PopupModal",t),t}Ge(e),Ve(e)}function Ge(e){requestAnimationFrame(()=>{let t=Je(e);t==null||t.classList.add("syncify-modal-shell");let n=t==null?void 0:t.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');n&&(n.classList.add("syncify-modal-close"),n.setAttribute("aria-label","Close Syncify"),n.title="Close",n.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function Je(e){let t=e.parentElement;for(;t&&t!==document.body;){if(t.querySelector(".main-trackCreditsModal-header"))return t;t=t.parentElement}return e.closest('[class*="trackCreditsModal"]')}function Ve(e){try{let t=Spicetify.React.createElement(ue);if(typeof Spicetify.ReactDOM.createRoot=="function"){Spicetify.ReactDOM.createRoot(e).render(t),m("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(t,e),m("Modal rendered",{renderer:"render"})}catch(t){throw Y("Failed to render modal",t),t}}})();
