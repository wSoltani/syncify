// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var Ue=Object.defineProperty,Be=Object.defineProperties;var _e=Object.getOwnPropertyDescriptors;var V=Object.getOwnPropertySymbols;var Te=Object.prototype.hasOwnProperty,Ie=Object.prototype.propertyIsEnumerable;var q=(e,t,n)=>t in e?Ue(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,b=(e,t)=>{for(var n in t||(t={}))Te.call(t,n)&&q(e,n,t[n]);if(V)for(var n of V(t))Ie.call(t,n)&&q(e,n,t[n]);return e},k=(e,t)=>Be(e,_e(t));var X=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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

.syncify-backup-details {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    font-size: 12px;
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
.syncify-footer {
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
    justify-content: flex-end;
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

    .syncify-actions,
    .syncify-footer {
        flex-direction: column;
    }

    .syncify-button,
    .syncify-link-button {
        width: 100%;
    }
}
`;var Q=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>\r
`;var Z="x-syncify-user-hash";async function ee(e,t,n){let i=await fetch(e,{method:"POST",headers:{"content-type":"application/json",[Z]:t},body:JSON.stringify(n)});if(!i.ok)throw new Error(`Backup failed with HTTP ${i.status}.`)}async function te(e,t){let n=await fetch(e,{method:"GET",headers:{[Z]:t}});if(n.status===404)return{exists:!1,payload:null};if(!n.ok)throw new Error(`Restore failed with HTTP ${n.status}.`);return{exists:!0,payload:await n.json()}}var x={workerUrl:"https://syncify-worker.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"https://github.com/wSoltani/Syncify/issues/new"};function u(){var t,n,i,a;let e=window.SyncifyConfig;return{workerUrl:(t=v(e==null?void 0:e.workerUrl))!=null?t:x.workerUrl,githubUrl:(n=v(e==null?void 0:e.githubUrl))!=null?n:x.githubUrl,kofiUrl:(i=v(e==null?void 0:e.kofiUrl))!=null?i:x.kofiUrl,issueUrl:(a=v(e==null?void 0:e.issueUrl))!=null?a:x.issueUrl}}function v(e){return typeof e=="string"&&e.trim()?e.trim():null}var C="syncify:config",j={workerUrl:u().workerUrl,autoBackupEnabled:!1};function M(){var n,i;let e=u(),t=(i=(n=Spicetify.LocalStorage)==null?void 0:n.get(C))!=null?i:window.localStorage.getItem(C);if(!t)return k(b({},j),{workerUrl:e.workerUrl});try{let a=JSON.parse(t);return{workerUrl:e.workerUrl,autoBackupEnabled:a.autoBackupEnabled===void 0?j.autoBackupEnabled:!!a.autoBackupEnabled}}catch(a){return k(b({},j),{workerUrl:e.workerUrl})}}function ne(e){var n;let t=JSON.stringify({workerUrl:u().workerUrl,autoBackupEnabled:e.autoBackupEnabled});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set(C,t);return}window.localStorage.setItem(C,t)}function H(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}async function h(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return[...new Uint8Array(n)].map(i=>i.toString(16).padStart(2,"0")).join("")}function z(e){return JSON.stringify(D(e))}function D(e){return Array.isArray(e)?e.map(D):e&&typeof e=="object"?Object.keys(e).sort().reduce((t,n)=>(t[n]=D(e[n]),t),{}):e}async function F(){let e=await Oe();return h(e)}async function Oe(){var i,a,r,c,y;let e=(i=Spicetify.Platform)==null?void 0:i.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let t=await e.getUser(),n=(y=(c=(r=(a=t==null?void 0:t.username)!=null?a:t==null?void 0:t.canonicalUsername)!=null?r:t==null?void 0:t.id)!=null?c:t==null?void 0:t.uri)!=null?y:t==null?void 0:t.displayName;if(!n)throw new Error("Unable to resolve the active Spotify user.");return n}function ie(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var oe="marketplace:",ae=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];function re(){let e={};for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);if(!(n!=null&&n.startsWith(oe)))continue;let i=window.localStorage.getItem(n);i!==null&&(e[n]=i)}return e}async function N(){let e=re();return{keyCount:Object.keys(e).length,hash:await h(z(e))}}async function se(){let e=re();return{schema_version:1,metadata:{last_sync_datetime:new Date().toISOString(),device_info:ie(),marketplace_key_count:Object.keys(e).length},payload_hash:await h(z(e)),marketplace_data:{keys:e}}}function ce(e){var i,a;let t=(a=(i=e.marketplace_data)==null?void 0:i.keys)!=null?a:{},n=0;for(let[r,c]of Object.entries(t))r.startsWith(oe)&&(window.localStorage.setItem(r,c),n+=1);return n}function le(){return ae.reduce((e,t)=>e+je(window.localStorage.getItem(t)),0)}function ye(){return!!(window.Marketplace||ae.some(t=>window.localStorage.getItem(t)!==null)||window.localStorage.getItem("marketplace:tabs")!==null)}function de(e,t){return t===0?!1:e===0?!0:e<Math.max(2,Math.floor(t*.5))}function je(e){if(!e)return 0;try{let t=JSON.parse(e);return Array.isArray(t)?t.length:0}catch(t){return 0}}async function E(e){if(!H(e))throw new Error("Syncify backup service is not configured.");let[t,n]=await Promise.all([F(),se()]);if(n.metadata.marketplace_key_count===0)throw new Error("Syncify will not back up an empty extension/theme state.");return await ee(e.workerUrl,t,n),n}async function S(e){if(!H(e))throw new Error("Syncify backup service is not configured.");return te(e.workerUrl,await F())}async function fe(e){let t=await S(e);if(!t.exists||!t.payload)throw new Error("No Syncify cloud backup was found for this Spotify account.");let n=ce(t.payload);return{payload:t.payload,restoredCount:n}}async function pe(){var t,n,i;let e=M();if(!(!e.workerUrl||!e.autoBackupEnabled))try{let[a,r]=await Promise.all([N(),S(e)]),c=(n=(t=r.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?n:0;if(r.exists&&de(a.keyCount,c)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((i=r.payload)==null?void 0:i.payload_hash)===a.hash||a.keyCount===0)return;await E(e),Spicetify.showNotification("Syncify auto-backup complete")}catch(a){let r=a instanceof Error?a.message:String(a);console.warn("Syncify startup sync failed:",a),Spicetify.showNotification(`Syncify auto-sync skipped: ${r}`,!0,8e3)}}function me(){var J;let e=Spicetify.React,t=e.useEffect,n=e.useMemo,i=e.useState,[a,r]=i(()=>M()),[c,y]=i("idle"),[f,d]=i(null),[be,ke]=i(0),[he,Se]=i(0),[W,we]=i(null),[l,B]=i(null),[w,_]=i(!1),[xe,g]=i(!1),T=n(()=>u(),[]),p=c==="loading",I=(f==null?void 0:f.kind)==="warning"||(f==null?void 0:f.kind)==="error"?f:null,L=n(()=>ye(),[]),ve=(J=l==null?void 0:l.metadata.marketplace_key_count)!=null?J:0,Ce=!!(l&&W&&l.payload_hash!==W);t(()=>{G({silent:!0})},[]);async function $(){let o=await N();return ke(o.keyCount),we(o.hash),Se(le()),o}async function G(o){try{g(!1),y("loading"),o!=null&&o.silent||d({kind:"info",text:"Checking your Syncify backup\u2026"}),await $();let s=await S(a);B(s.payload),_(!0),y(s.exists?"success":"idle"),o!=null&&o.silent||d(s.exists&&s.payload?{kind:"success",text:`Backup found from ${ue(s.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(s){O(s)}}function Me(o){let s=k(b({},a),{autoBackupEnabled:o});r(s),ne(s),d({kind:"success",text:o?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}async function Ne(){try{g(!1),y("loading"),d({kind:"info",text:"Backing up your extensions and themes\u2026"});let o=await E(a);B(o),_(!0),await $(),y("success"),d({kind:"success",text:`Backed up ${o.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(o){O(o)}}function Ee(){if(!L){let o="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";d({kind:"error",text:o}),Spicetify.showNotification(o,!0,6e3);return}g(!0)}async function Pe(){try{g(!1),y("loading"),d({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:o,restoredCount:s}=await fe(a);B(o),_(!0),y("success"),d({kind:"success",text:`Restored ${s} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),setTimeout(()=>window.location.reload(),1e3)}catch(o){O(o)}}function A(o){if(o.startsWith("mailto:")){window.location.href=o;return}window.open(o,"_blank","noopener,noreferrer")}function O(o){let s=o instanceof Error?o.message:String(o);y("error"),d({kind:"error",text:s}),Spicetify.showNotification(s,!0,6e3)}function R(o){o.stopPropagation()}return e.createElement("div",{className:"syncify-panel",onClick:R,onMouseDown:R,onPointerDown:R},e.createElement("section",{className:"syncify-hero","aria-label":"Syncify status"},e.createElement("p",{className:"syncify-description"},"Back up your installed extensions and themes, then restore them whenever Spotify or Spicetify needs a fresh setup."),e.createElement("div",{className:"syncify-status-row"},e.createElement("h3",{className:"syncify-heading"},He(c,w)),e.createElement("span",{className:"syncify-status-pill","data-kind":ze(c)},De(c,w))),I?e.createElement("p",{className:"syncify-message","data-kind":I.kind},I.text):null),e.createElement("section",{className:"syncify-grid","aria-label":"Syncify backup details"},e.createElement(P,{label:"Backup entries",value:be}),e.createElement(P,{label:"Extensions/themes",value:he}),e.createElement(P,{label:"Backup",value:l?`${ve} entries`:w?"None":"Checking",tone:l?"success":w?"warning":"neutral"}),e.createElement(P,{label:"Restore",value:L?"Ready":"Missing",tone:L?"success":"warning"})),l?e.createElement("section",{className:"syncify-section syncify-backup-section"},e.createElement("div",{className:"syncify-section-header"},e.createElement("h4",{className:"syncify-section-title"},"Latest backup"),e.createElement("span",{className:"syncify-backup-time"},ue(l.metadata.last_sync_datetime))),e.createElement("div",{className:"syncify-backup-details"},e.createElement("span",null,l.metadata.device_info),e.createElement("span",null,l.metadata.marketplace_key_count," entries")),Ce?e.createElement("p",{className:"syncify-message inline","data-kind":"warning"},"This device differs from your backup. Restore to apply the saved extensions and themes here, or back up to replace it."):null):null,e.createElement("section",{className:"syncify-section compact"},e.createElement("h4",{className:"syncify-section-title"},"Sync controls"),xe?e.createElement("div",{className:"syncify-confirm-restore"},e.createElement("p",{className:"syncify-message inline","data-kind":"warning"},"Restore will replace this device's saved extensions and themes, then reload Spotify."),e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>g(!1),disabled:p},"Cancel"),e.createElement("button",{className:"syncify-button danger",type:"button",onClick:Pe,disabled:p},"Confirm restore"))):e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button",type:"button",onClick:Ne,disabled:p},"Back up now"),e.createElement("button",{className:"syncify-button danger",type:"button",onClick:Ee,disabled:p},"Restore backup"),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{G()},disabled:p},"Refresh status")),e.createElement("label",{className:"syncify-toggle"},e.createElement("input",{type:"checkbox",checked:a.autoBackupEnabled,onChange:o=>Me(o.currentTarget.checked),disabled:p}),e.createElement("span",null,"Auto-backup extensions and themes after startup safety checks"))),e.createElement("section",{className:"syncify-footer","aria-label":"Syncify links"},e.createElement("button",{className:"syncify-link-button",type:"button",onClick:()=>A(T.issueUrl)},"Report an issue"),e.createElement("button",{className:"syncify-link-button",type:"button",onClick:()=>A(T.githubUrl)},"GitHub"),e.createElement("button",{className:"syncify-link-button",type:"button",onClick:()=>A(T.kofiUrl)},"Ko-fi")))}function P({label:e,value:t,tone:n="neutral"}){let i=Spicetify.React;return i.createElement("div",{className:"syncify-card","data-tone":n},i.createElement("span",{className:"syncify-card-label"},e),i.createElement("strong",{className:"syncify-card-value"},t))}function He(e,t){return e==="loading"?"Checking status\u2026":e==="error"?"Sync needs attention":e==="success"?"Backup available":e==="needs-restore"?"Restore recommended":t?"Ready to back up":"Loading Syncify"}function De(e,t){return e==="loading"?"Checking":e==="error"?"Error":e==="success"?"Synced":e==="needs-restore"?"Restore":t?"Ready":"Starting"}function ze(e){return e==="success"?"success":e==="error"?"error":e==="needs-restore"?"warning":"neutral"}function ue(e){let t=new Date(e);if(Number.isNaN(t.getTime()))return e;let n=t.toLocaleDateString(void 0,{month:"short",day:"numeric"}),i=t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${n}, ${i}`}var U="[Syncify]";function m(e,t){if(t===void 0){console.debug(U,e);return}console.debug(U,e,t)}function K(e,t){if(t===void 0){console.warn(U,e);return}console.warn(U,e,t)}(function e(){if(!Fe()){setTimeout(e,100);return}m("Spicetify APIs ready"),Ye()})();function Fe(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}function Ye(){Ke(),We(),pe().catch(e=>{K("Startup sync check failed",e)})}function Ke(){let e="syncify-styles";if(document.getElementById(e))return;let t=document.createElement("style");t.id=e,t.textContent=X,document.head.appendChild(t)}function We(){let e=new Spicetify.Topbar.Button("Syncify",Q,t=>{m("Topbar button clicked",Y(t)),ge()},!1,!0);$e(e),Ge(e),m("Topbar button registered",Y(e))}function $e(e){var n;let t=e;e.element.style.setProperty("-webkit-app-region","no-drag"),(n=t.button)==null||n.style.setProperty("-webkit-app-region","no-drag")}function Ge(e){Object.assign(window,{SyncifyDebug:{button:e,element:e.element,openModal:ge,inspect:()=>Y(e),clickElement:()=>{var t;return(t=e.element)==null?void 0:t.click()},clickInnerButton:()=>{var t;return(t=e.button)==null?void 0:t.click()},clickCallback:()=>e.onClick(e)}})}function Y(e){var t,n,i,a,r;return{label:e.label,disabled:e.disabled,isRight:e.isRight,hasElement:!!e.element,elementConnected:(t=e.element)==null?void 0:t.isConnected,elementDisabled:(n=e.element)==null?void 0:n.disabled,elementAriaDisabled:(i=e.element)==null?void 0:i.getAttribute("aria-disabled"),elementClass:(a=e.element)==null?void 0:a.className,appRegion:e.element?getComputedStyle(e.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:e.button?getComputedStyle(e.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:e.element?getComputedStyle(e.element).pointerEvents:null,visibility:e.element?getComputedStyle(e.element).visibility:null,display:e.element?getComputedStyle(e.element).display:null,rect:(r=e.element)==null?void 0:r.getBoundingClientRect().toJSON()}}function ge(){m("Opening modal");let e=document.createElement("div");try{Spicetify.PopupModal.display({title:"Syncify",content:e,isLarge:!1})}catch(t){throw K("Failed to open PopupModal",t),t}Je(e),qe(e)}function Je(e){requestAnimationFrame(()=>{let t=Ve(e);t==null||t.classList.add("syncify-modal-shell");let n=t==null?void 0:t.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');n&&(n.classList.add("syncify-modal-close"),n.setAttribute("aria-label","Close Syncify"),n.title="Close",n.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function Ve(e){let t=e.parentElement;for(;t&&t!==document.body;){if(t.querySelector(".main-trackCreditsModal-header"))return t;t=t.parentElement}return e.closest('[class*="trackCreditsModal"]')}function qe(e){try{let t=Spicetify.React.createElement(me);if(typeof Spicetify.ReactDOM.createRoot=="function"){Spicetify.ReactDOM.createRoot(e).render(t),m("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(t,e),m("Modal rendered",{renderer:"render"})}catch(t){throw K("Failed to render modal",t),t}}})();
