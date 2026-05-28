// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var Ee=Object.defineProperty,Ne=Object.defineProperties;var Ue=Object.getOwnPropertyDescriptors;var G=Object.getOwnPropertySymbols;var Pe=Object.prototype.hasOwnProperty,Be=Object.prototype.propertyIsEnumerable;var J=(e,t,n)=>t in e?Ee(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,m=(e,t)=>{for(var n in t||(t={}))Pe.call(t,n)&&J(e,n,t[n]);if(G)for(var n of G(t))Be.call(t,n)&&J(e,n,t[n]);return e},g=(e,t)=>Ne(e,Ue(t));var V=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the\r
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
`;var q=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>\r
`;var X="x-syncify-user-hash";async function Q(e,t,n){let i=await fetch(e,{method:"POST",headers:{"content-type":"application/json",[X]:t},body:JSON.stringify(n)});if(!i.ok)throw new Error(`Backup failed with HTTP ${i.status}.`)}async function Z(e,t){let n=await fetch(e,{method:"GET",headers:{[X]:t}});if(n.status===404)return{exists:!1,payload:null};if(!n.ok)throw new Error(`Restore failed with HTTP ${n.status}.`);return{exists:!0,payload:await n.json()}}var w={workerUrl:"https://syncify-worker.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"mailto:wasoltani+syncify@gmail.com"};function p(){var t,n,i,o;let e=window.SyncifyConfig;return{workerUrl:(t=x(e==null?void 0:e.workerUrl))!=null?t:w.workerUrl,githubUrl:(n=x(e==null?void 0:e.githubUrl))!=null?n:w.githubUrl,kofiUrl:(i=x(e==null?void 0:e.kofiUrl))!=null?i:w.kofiUrl,issueUrl:(o=x(e==null?void 0:e.issueUrl))!=null?o:w.issueUrl}}function x(e){return typeof e=="string"&&e.trim()?e.trim():null}var v="syncify:config",R={workerUrl:p().workerUrl,autoBackupEnabled:!0};function C(){var n,i;let e=p(),t=(i=(n=Spicetify.LocalStorage)==null?void 0:n.get(v))!=null?i:window.localStorage.getItem(v);if(!t)return g(m({},R),{workerUrl:e.workerUrl});try{let o=JSON.parse(t);return{workerUrl:e.workerUrl,autoBackupEnabled:o.autoBackupEnabled===void 0?R.autoBackupEnabled:!!o.autoBackupEnabled}}catch(o){return g(m({},R),{workerUrl:e.workerUrl})}}function ee(e){var n;let t=JSON.stringify({workerUrl:p().workerUrl,autoBackupEnabled:e.autoBackupEnabled});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set(v,t);return}window.localStorage.setItem(v,t)}function O(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}async function b(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return[...new Uint8Array(n)].map(i=>i.toString(16).padStart(2,"0")).join("")}function H(e){return JSON.stringify(j(e))}function j(e){return Array.isArray(e)?e.map(j):e&&typeof e=="object"?Object.keys(e).sort().reduce((t,n)=>(t[n]=j(e[n]),t),{}):e}async function z(){let e=await Ie();return b(e)}async function Ie(){var i,o,s,c,y;let e=(i=Spicetify.Platform)==null?void 0:i.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let t=await e.getUser(),n=(y=(c=(s=(o=t==null?void 0:t.username)!=null?o:t==null?void 0:t.canonicalUsername)!=null?s:t==null?void 0:t.id)!=null?c:t==null?void 0:t.uri)!=null?y:t==null?void 0:t.displayName;if(!n)throw new Error("Unable to resolve the active Spotify user.");return n}function te(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var ne="marketplace:",ie=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];function oe(){let e={};for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);if(!(n!=null&&n.startsWith(ne)))continue;let i=window.localStorage.getItem(n);i!==null&&(e[n]=i)}return e}async function M(){let e=oe();return{keyCount:Object.keys(e).length,hash:await b(H(e))}}async function ae(){let e=oe();return{schema_version:1,metadata:{last_sync_datetime:new Date().toISOString(),device_info:te(),marketplace_key_count:Object.keys(e).length},payload_hash:await b(H(e)),marketplace_data:{keys:e}}}function re(e){var i,o;let t=(o=(i=e.marketplace_data)==null?void 0:i.keys)!=null?o:{},n=0;for(let[s,c]of Object.entries(t))s.startsWith(ne)&&(window.localStorage.setItem(s,c),n+=1);return n}function se(){return ie.reduce((e,t)=>e+Ae(window.localStorage.getItem(t)),0)}function ce(){return!!(window.Marketplace||ie.some(t=>window.localStorage.getItem(t)!==null)||window.localStorage.getItem("marketplace:tabs")!==null)}function le(e,t){return t===0?!1:e===0?!0:e<Math.max(2,Math.floor(t*.5))}function Ae(e){if(!e)return 0;try{let t=JSON.parse(e);return Array.isArray(t)?t.length:0}catch(t){return 0}}async function E(e){if(!O(e))throw new Error("Syncify backup service is not configured.");let[t,n]=await Promise.all([z(),ae()]);if(n.metadata.marketplace_key_count===0)throw new Error("Syncify will not back up an empty extension/theme state.");return await Q(e.workerUrl,t,n),n}async function k(e){if(!O(e))throw new Error("Syncify backup service is not configured.");return Z(e.workerUrl,await z())}async function ye(e){let t=await k(e);if(!t.exists||!t.payload)throw new Error("No Syncify cloud backup was found for this Spotify account.");let n=re(t.payload);return{payload:t.payload,restoredCount:n}}async function de(){var t,n,i;let e=C();if(!(!e.workerUrl||!e.autoBackupEnabled))try{let[o,s]=await Promise.all([M(),k(e)]),c=(n=(t=s.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?n:0;if(s.exists&&le(o.keyCount,c)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((i=s.payload)==null?void 0:i.payload_hash)===o.hash||o.keyCount===0)return;await E(e),Spicetify.showNotification("Syncify auto-backup complete")}catch(o){let s=o instanceof Error?o.message:String(o);console.warn("Syncify startup sync failed:",o),Spicetify.showNotification(`Syncify auto-sync skipped: ${s}`,!0,8e3)}}function pe(){var $;let e=Spicetify.React,t=e.useEffect,n=e.useMemo,i=e.useState,[o,s]=i(()=>C()),[c,y]=i("idle"),[f,d]=i(null),[me,ge]=i(0),[be,ke]=i(0),[Y,he]=i(null),[l,P]=i(null),[h,B]=i(!1),_=n(()=>p(),[]),S=c==="loading",T=(f==null?void 0:f.kind)==="warning"||(f==null?void 0:f.kind)==="error"?f:null,I=n(()=>ce(),[]),Se=($=l==null?void 0:l.metadata.marketplace_key_count)!=null?$:0,we=!!(l&&Y&&l.payload_hash!==Y);t(()=>{W({silent:!0})},[]);async function K(){let a=await M();return ge(a.keyCount),he(a.hash),ke(se()),a}async function W(a){try{y("loading"),a!=null&&a.silent||d({kind:"info",text:"Checking your Syncify backup\u2026"}),await K();let r=await k(o);P(r.payload),B(!0),y(r.exists?"success":"idle"),a!=null&&a.silent||d(r.exists&&r.payload?{kind:"success",text:`Backup found from ${fe(r.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(r){A(r)}}function xe(a){let r=g(m({},o),{autoBackupEnabled:a});s(r),ee(r),d({kind:"success",text:a?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}async function ve(){try{y("loading"),d({kind:"info",text:"Backing up your extensions and themes\u2026"});let a=await E(o);P(a),B(!0),await K(),y("success"),d({kind:"success",text:`Backed up ${a.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(a){A(a)}}async function Ce(){if(!I){let r="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";d({kind:"error",text:r}),Spicetify.showNotification(r,!0,6e3);return}if(window.confirm("Restore your Syncify backup? This will replace your saved extensions and themes on this device, then reload Spotify."))try{y("loading"),d({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:r,restoredCount:Me}=await ye(o);P(r),B(!0),y("success"),d({kind:"success",text:`Restored ${Me} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),setTimeout(()=>window.location.reload(),1e3)}catch(r){A(r)}}function L(a){window.open(a,"_blank","noopener,noreferrer")}function A(a){let r=a instanceof Error?a.message:String(a);y("error"),d({kind:"error",text:r}),Spicetify.showNotification(r,!0,6e3)}return e.createElement("div",{className:"syncify-panel"},e.createElement("section",{className:"syncify-hero","aria-label":"Syncify status"},e.createElement("p",{className:"syncify-description"},"Back up your installed extensions and themes, then restore them whenever Spotify or Spicetify needs a fresh setup."),e.createElement("div",{className:"syncify-status-row"},e.createElement("h3",{className:"syncify-heading"},Re(c,h)),e.createElement("span",{className:"syncify-status-pill","data-kind":je(c)},Oe(c,h))),T?e.createElement("p",{className:"syncify-message","data-kind":T.kind},T.text):null),e.createElement("section",{className:"syncify-grid","aria-label":"Syncify backup details"},e.createElement(N,{label:"Backup entries",value:me}),e.createElement(N,{label:"Extensions/themes",value:be}),e.createElement(N,{label:"Backup",value:l?`${Se} entries`:h?"None":"Checking",tone:l?"success":h?"warning":"neutral"}),e.createElement(N,{label:"Restore",value:I?"Ready":"Missing",tone:I?"success":"warning"})),l?e.createElement("section",{className:"syncify-section syncify-backup-section"},e.createElement("div",{className:"syncify-section-header"},e.createElement("h4",{className:"syncify-section-title"},"Latest backup"),e.createElement("span",{className:"syncify-backup-time"},fe(l.metadata.last_sync_datetime))),e.createElement("div",{className:"syncify-backup-details"},e.createElement("span",null,l.metadata.device_info),e.createElement("span",null,l.metadata.marketplace_key_count," entries")),we?e.createElement("p",{className:"syncify-message inline","data-kind":"warning"},"This device differs from your backup. Restore to apply the saved extensions and themes here, or back up to replace it."):null):null,e.createElement("section",{className:"syncify-section compact"},e.createElement("h4",{className:"syncify-section-title"},"Sync controls"),e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button",type:"button",onClick:ve,disabled:S},"Back up now"),e.createElement("button",{className:"syncify-button danger",type:"button",onClick:Ce,disabled:S},"Restore backup"),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{W()},disabled:S},"Refresh status")),e.createElement("label",{className:"syncify-toggle"},e.createElement("input",{type:"checkbox",checked:o.autoBackupEnabled,onChange:a=>xe(a.currentTarget.checked),disabled:S}),e.createElement("span",null,"Auto-backup extensions and themes after startup safety checks"))),e.createElement("section",{className:"syncify-footer","aria-label":"Syncify links"},e.createElement("button",{className:"syncify-link-button",type:"button",onClick:()=>L(_.issueUrl)},"Report an issue"),e.createElement("button",{className:"syncify-link-button",type:"button",onClick:()=>L(_.githubUrl)},"GitHub"),e.createElement("button",{className:"syncify-link-button",type:"button",onClick:()=>L(_.kofiUrl)},"Ko-fi")))}function N({label:e,value:t,tone:n="neutral"}){let i=Spicetify.React;return i.createElement("div",{className:"syncify-card","data-tone":n},i.createElement("span",{className:"syncify-card-label"},e),i.createElement("strong",{className:"syncify-card-value"},t))}function Re(e,t){return e==="loading"?"Checking status\u2026":e==="error"?"Sync needs attention":e==="success"?"Backup available":e==="needs-restore"?"Restore recommended":t?"Ready to back up":"Loading Syncify"}function Oe(e,t){return e==="loading"?"Checking":e==="error"?"Error":e==="success"?"Synced":e==="needs-restore"?"Restore":t?"Ready":"Starting"}function je(e){return e==="success"?"success":e==="error"?"error":e==="needs-restore"?"warning":"neutral"}function fe(e){let t=new Date(e);if(Number.isNaN(t.getTime()))return e;let n=t.toLocaleDateString(void 0,{month:"short",day:"numeric"}),i=t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${n}, ${i}`}var U="[Syncify]";function u(e,t){if(t===void 0){console.debug(U,e);return}console.debug(U,e,t)}function F(e,t){if(t===void 0){console.warn(U,e);return}console.warn(U,e,t)}(function e(){if(!He()){setTimeout(e,100);return}u("Spicetify APIs ready"),ze()})();function He(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}function ze(){De(),Fe(),de().catch(e=>{F("Startup sync check failed",e)})}function De(){let e="syncify-styles";if(document.getElementById(e))return;let t=document.createElement("style");t.id=e,t.textContent=V,document.head.appendChild(t)}function Fe(){let e=new Spicetify.Topbar.Button("Syncify",q,t=>{u("Topbar button clicked",D(t)),ue()},!1,!0);Ye(e),Ke(e),u("Topbar button registered",D(e))}function Ye(e){var n;let t=e;e.element.style.setProperty("-webkit-app-region","no-drag"),(n=t.button)==null||n.style.setProperty("-webkit-app-region","no-drag")}function Ke(e){Object.assign(window,{SyncifyDebug:{button:e,element:e.element,openModal:ue,inspect:()=>D(e),clickElement:()=>{var t;return(t=e.element)==null?void 0:t.click()},clickInnerButton:()=>{var t;return(t=e.button)==null?void 0:t.click()},clickCallback:()=>e.onClick(e)}})}function D(e){var t,n,i,o,s;return{label:e.label,disabled:e.disabled,isRight:e.isRight,hasElement:!!e.element,elementConnected:(t=e.element)==null?void 0:t.isConnected,elementDisabled:(n=e.element)==null?void 0:n.disabled,elementAriaDisabled:(i=e.element)==null?void 0:i.getAttribute("aria-disabled"),elementClass:(o=e.element)==null?void 0:o.className,appRegion:e.element?getComputedStyle(e.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:e.button?getComputedStyle(e.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:e.element?getComputedStyle(e.element).pointerEvents:null,visibility:e.element?getComputedStyle(e.element).visibility:null,display:e.element?getComputedStyle(e.element).display:null,rect:(s=e.element)==null?void 0:s.getBoundingClientRect().toJSON()}}function ue(){u("Opening modal");let e=document.createElement("div");try{Spicetify.PopupModal.display({title:"Syncify",content:e,isLarge:!1})}catch(t){throw F("Failed to open PopupModal",t),t}We(e),Ge(e)}function We(e){requestAnimationFrame(()=>{let t=$e(e);t==null||t.classList.add("syncify-modal-shell");let n=t==null?void 0:t.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');n&&(n.classList.add("syncify-modal-close"),n.setAttribute("aria-label","Close Syncify"),n.title="Close",n.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function $e(e){let t=e.parentElement;for(;t&&t!==document.body;){if(t.querySelector(".main-trackCreditsModal-header"))return t;t=t.parentElement}return e.closest('[class*="trackCreditsModal"]')}function Ge(e){try{let t=Spicetify.React.createElement(pe);if(typeof Spicetify.ReactDOM.createRoot=="function"){Spicetify.ReactDOM.createRoot(e).render(t),u("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(t,e),u("Modal rendered",{renderer:"render"})}catch(t){throw F("Failed to render modal",t),t}}})();
