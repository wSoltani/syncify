// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var bt=Object.defineProperty,ht=Object.defineProperties;var kt=Object.getOwnPropertyDescriptors;var Ee=Object.getOwnPropertySymbols;var St=Object.prototype.hasOwnProperty,wt=Object.prototype.propertyIsEnumerable;var Ne=(e,t,n)=>t in e?bt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,h=(e,t)=>{for(var n in t||(t={}))St.call(t,n)&&Ne(e,n,t[n]);if(Ee)for(var n of Ee(t))wt.call(t,n)&&Ne(e,n,t[n]);return e},k=(e,t)=>ht(e,kt(t));var Pe=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the\r
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
\r
.syncify-shortcut-row {\r
    display: flex;\r
    flex-wrap: wrap;\r
    align-items: center;\r
    justify-content: space-between;\r
    gap: 8px;\r
}\r
\r
.syncify-shortcut-key {\r
    min-width: 96px;\r
    padding: 6px 10px;\r
    border-radius: 6px;\r
    color: var(--spice-text);\r
    background: rgba(255, 255, 255, 0.07);\r
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12) inset;\r
    font-family: inherit;\r
    font-size: 13px;\r
    font-weight: 700;\r
    text-align: center;\r
}\r
\r
.syncify-shortcut-key[data-recording="true"] {\r
    color: var(--spice-button, #1ed760);\r
    box-shadow: 0 0 0 1px var(--spice-button, #1ed760) inset;\r
}\r
\r
.syncify-choice-group {\r
    display: flex;\r
    flex-wrap: wrap;\r
    gap: 6px 16px;\r
}\r
`;var ae=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>\r
`;var Me="x-syncify-user-hash";async function Te(e,t,n){let i=await fetch(e,{method:"POST",headers:{"content-type":"application/json",[Me]:t},body:JSON.stringify(n)});if(!i.ok)throw new Error(`Backup failed with HTTP ${i.status}.`)}async function Be(e,t){var s;let n=await fetch(e,{method:"GET",headers:{[Me]:t}});if(n.status===404)return{exists:!1,payload:null,backups:[]};if(!n.ok)throw new Error(`Restore failed with HTTP ${n.status}.`);let i=await n.json(),r=[i,...(s=i.backup_history)!=null?s:[]].slice(0,3);return{exists:!0,payload:i,backups:r}}var C={extensionName:"Syncify",version:"1.1.2",workerUrl:"https://syncify-worker.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"https://github.com/wSoltani/Syncify/issues/new"};function d(){var t,n,i,r,s,l;let e=window.SyncifyConfig;return{extensionName:(t=B(e==null?void 0:e.extensionName))!=null?t:C.extensionName,version:(n=_e(e==null?void 0:e.version))!=null?n:C.version,workerUrl:(i=B(e==null?void 0:e.workerUrl))!=null?i:C.workerUrl,githubUrl:(r=B(e==null?void 0:e.githubUrl))!=null?r:C.githubUrl,kofiUrl:(s=B(e==null?void 0:e.kofiUrl))!=null?s:C.kofiUrl,issueUrl:(l=B(e==null?void 0:e.issueUrl))!=null?l:C.issueUrl}}function B(e){return _e(e)}function _e(e){return typeof e=="string"&&e.trim()?e.trim():null}var S={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},Ct=/^([a-z0-9]|f([1-9]|1[0-2]))$/,Et=250,Nt=40,se=null,j=null,E=null;function Ie(){return/mac/i.test(navigator.platform||navigator.userAgent)}function Ue(e){if(e===null)return null;if(!e||typeof e!="object")return S;let t=e;return typeof t.key!="string"||!Ct.test(t.key)?S:{key:t.key,ctrl:!!t.ctrl,alt:!!t.alt,shift:!!t.shift,meta:!!t.meta}}function w(e){if(!e)return"Off";let t=e.key.toUpperCase();return Ie()?[e.ctrl?"\u2318":"",e.alt?"\u2325":"",e.shift?"\u21E7":"",t].join(""):[e.ctrl&&"Ctrl",e.meta&&"Win",e.alt&&"Alt",e.shift&&"Shift",t].filter(Boolean).join("+")}function Ae(e){if(e.key==="Escape")return{kind:"cancel"};let t=Pt(e.code);if(!t)return{kind:"ignore"};let n=Ie();if(n&&e.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:t,ctrl:n?e.metaKey:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:n?!1:e.metaKey},r=t.startsWith("f")&&t.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!r?{kind:"error",message:`Include ${n?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function Pt(e){var n,i;let t=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(e);return t?((i=(n=t[1])!=null?n:t[2])!=null?i:t[3]).toLowerCase():null}function Oe(e){var t;if(E&&Mt(E,e))return!1;try{let n=Spicetify.Mousetrap,i=(t=n.trigger)==null?void 0:t.call(n)._directMap;if(!i)return!1;let r=ce(e);return Object.keys(i).some(s=>s.startsWith(`${r}:`))}catch(n){return!1}}function le(e,t,n=0){if(se=t,j=e,!De()){if(n>=Nt){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>le(j,t,n+1),Et);return}ye(j)}function ye(e){if(j=e,!De()||!se)return;let t=se;try{if(E&&Spicetify.Keyboard._deregisterShortcut(E),E=null,!e)return;Spicetify.Keyboard.registerShortcut(e,n=>{n.preventDefault(),t()}),E=e,console.debug("[Syncify]","Keyboard shortcut registered",w(e))}catch(n){console.warn("[Syncify]","Failed to register keyboard shortcut",n)}}function De(){var e;return typeof((e=Spicetify.Keyboard)==null?void 0:e.registerShortcut)=="function"}function ce(e){return[e.ctrl&&"mod",e.meta&&"meta",e.alt&&"alt",e.shift&&"shift",e.key].filter(Boolean).join("+")}function Mt(e,t){return ce(e)===ce(t)}var ue="both",Tt=["both","topbar","menu"],_=null,I=null,F=!1;function Le(e){return Tt.includes(e)?e:ue}function Re(){var e;return typeof((e=Spicetify.Menu)==null?void 0:e.Item)=="function"}function je(e){_=e.topbarButton,I=e.menuItem}function K(e){let t=e!=="menu"||!I,n=e!=="topbar";if(_!=null&&_.element&&(_.element.style.display=t?"":"none"),!!I)try{n&&!F?(I.register(),F=!0):!n&&F&&(I.deregister(),F=!1)}catch(i){console.warn("[Syncify]","Failed to update profile menu item",i)}}var Y="syncify:config",H={workerUrl:d().workerUrl,autoBackupEnabled:!1,shortcut:S,entryPoint:ue};function N(){var n,i;let e=d(),t=(i=(n=Spicetify.LocalStorage)==null?void 0:n.get(Y))!=null?i:window.localStorage.getItem(Y);if(!t)return k(h({},H),{workerUrl:e.workerUrl});try{let r=JSON.parse(t);return{workerUrl:e.workerUrl,autoBackupEnabled:r.autoBackupEnabled===void 0?H.autoBackupEnabled:!!r.autoBackupEnabled,shortcut:r.shortcut===void 0?H.shortcut:Ue(r.shortcut),entryPoint:Le(r.entryPoint)}}catch(r){return k(h({},H),{workerUrl:e.workerUrl})}}function z(e){var n;let t=JSON.stringify({workerUrl:d().workerUrl,autoBackupEnabled:e.autoBackupEnabled,shortcut:e.shortcut,entryPoint:e.entryPoint});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set(Y,t);return}window.localStorage.setItem(Y,t)}function fe(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}async function U(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return[...new Uint8Array(n)].map(i=>i.toString(16).padStart(2,"0")).join("")}function pe(e){return JSON.stringify(de(e))}function de(e){return Array.isArray(e)?e.map(de):e&&typeof e=="object"?Object.keys(e).sort().reduce((t,n)=>(t[n]=de(e[n]),t),{}):e}async function me(){let e=await Bt();return U(e)}async function Bt(){var i,r,s,l,c;let e=(i=Spicetify.Platform)==null?void 0:i.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let t=await e.getUser(),n=(c=(l=(s=(r=t==null?void 0:t.username)!=null?r:t==null?void 0:t.canonicalUsername)!=null?s:t==null?void 0:t.id)!=null?l:t==null?void 0:t.uri)!=null?c:t==null?void 0:t.displayName;if(!n)throw new Error("Unable to resolve the active Spotify user.");return n}function Fe(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var W="spicetify-marketplace";var A="settings";async function Ke(){let e=await ze();if(e.kind!=="ok")return null;try{let t=await We(e.db,"readonly",i=>i.getAll());if(!t)return null;let n={};for(let i of t)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(n[i.key]=i.value);return n}finally{e.db.close()}}async function He(e){let t=await ze();if(t.kind==="unavailable")return"unavailable";let n=t.kind==="ok"?t.db:await _t();if(!n)return"failed";try{return await We(n,"readwrite",r=>{let s;for(let[l,c]of Object.entries(e))s=r.put({key:l,value:c});return s})===null?"failed":"written"}finally{n.close()}}function Ye(){var e;try{return(e=window.indexedDB)!=null?e:null}catch(t){return null}}async function ze(){let e=Ye();return e?await It(e)?{kind:"missing"}:new Promise(t=>{let n=!1,i=e.open(W);i.onupgradeneeded=()=>{n=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),t({kind:"unavailable"})},i.onblocked=()=>t({kind:"unavailable"}),i.onsuccess=()=>{let r=i.result;if(n){r.close(),Ut(e).then(()=>t({kind:"missing"}));return}if(!r.objectStoreNames.contains(A)){r.close(),t({kind:"unavailable"});return}t({kind:"ok",db:r})}}):{kind:"unavailable"}}function _t(){let e=Ye();return e?new Promise(t=>{let n=e.open(W,1);n.onupgradeneeded=()=>{let i=n.result;i.objectStoreNames.contains(A)||i.createObjectStore(A,{keyPath:"key"})},n.onerror=()=>{console.warn("Syncify could not create Marketplace storage",n.error),t(null)},n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}async function It(e){if(typeof e.databases!="function")return!1;try{return!(await e.databases()).some(n=>n.name===W)}catch(t){return!1}}function Ut(e){return new Promise(t=>{let n=e.deleteDatabase(W);n.onsuccess=()=>t(),n.onerror=()=>t(),n.onblocked=()=>t()})}function We(e,t,n){return new Promise(i=>{let r;try{r=e.transaction(A,t)}catch(y){console.warn("Syncify could not open a Marketplace transaction",y),i(null);return}let s,l=!1,c=y=>{l||(l=!0,i(y))};r.oncomplete=()=>c(s),r.onerror=()=>{console.warn("Syncify Marketplace transaction failed",r.error),c(null)},r.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",r.error),c(null)};let u;try{u=n(r.objectStore(A))}catch(y){console.warn("Syncify Marketplace request could not be issued",y),c(null);return}u&&(u.onsuccess=()=>{s=u.result},u.onerror=()=>{console.warn("Syncify Marketplace request failed",u.error),c(null)})})}var ge="marketplace:",$e=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function qe(){let e=Lt(),t=await Ke();if(t)for(let[n,i]of Object.entries(t))n.startsWith(ge)&&(e[n]=i);return e}async function $(){let e=await qe();return{keyCount:Object.keys(e).length,hash:await U(pe(e)),installedItemCount:Ot(e),marketplaceAvailable:Dt(e)}}async function Ve(){let e=await qe();return{schema_version:1,metadata:{last_sync_datetime:new Date().toISOString(),device_info:Fe(),marketplace_key_count:Object.keys(e).length},payload_hash:await U(pe(e)),marketplace_data:{keys:e}}}async function Ge(e){var s,l;let t={},n=(l=(s=e.marketplace_data)==null?void 0:s.keys)!=null?l:{};for(let[c,u]of Object.entries(n))c.startsWith(ge)&&(t[c]=u);let i=Object.keys(t);if(i.length===0)return 0;for(let c of i)window.localStorage.setItem(c,t[c]);if(await He(t)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try the restore again.");return i.length}function Ot(e){return $e.reduce((t,n)=>t+Rt(e[n]),0)}function Dt(e){return!!(window.Marketplace||$e.some(n=>e[n]!==void 0)||e["marketplace:tabs"]!==void 0)}function Je(e,t){return t===0?!1:e===0?!0:e<Math.max(2,Math.floor(t*.5))}function Lt(){let e={};for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);if(!(n!=null&&n.startsWith(ge)))continue;let i=window.localStorage.getItem(n);i!==null&&(e[n]=i)}return e}function Rt(e){if(!e)return 0;try{let t=JSON.parse(e);return Array.isArray(t)?t.length:0}catch(t){return 0}}async function q(e){if(!fe(e))throw new Error("Syncify backup service is not configured.");let[t,n]=await Promise.all([me(),Ve()]);if(n.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");return await Te(e.workerUrl,t,n),n}async function O(e){if(!fe(e))throw new Error("Syncify backup service is not configured.");return Be(e.workerUrl,await me())}async function Xe(e,t){let n=t!=null?t:(await O(e)).payload;if(!n)throw new Error("No Syncify cloud backup was found for this Spotify account.");let i=await Ge(n);return{payload:n,restoredCount:i}}async function Ze(){var t,n,i;let e=N();if(!(!e.workerUrl||!e.autoBackupEnabled))try{let[r,s]=await Promise.all([$(),O(e)]),l=(n=(t=s.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?n:0;if(s.exists&&Je(r.keyCount,l)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((i=s.payload)==null?void 0:i.payload_hash)===r.hash||r.keyCount===0)return;await q(e),Spicetify.showNotification("Syncify auto-backup complete")}catch(r){let s=r instanceof Error?r.message:String(r);console.warn("Syncify startup sync failed:",r),Spicetify.showNotification(`Syncify auto-sync skipped: ${s}`,!0,8e3)}}function et(){var Ce;let e=Spicetify.React,t=e.useEffect,n=e.useMemo,i=e.useState,[r,s]=i(()=>N()),[l,c]=i("idle"),[u,y]=i(null),[nt,it]=i(0),[ot,rt]=i(0),[P,at]=i(null),[be,st]=i(null),[p,Q]=i(null),[he,ke]=i([]),[m,M]=i(null),[D,ee]=i(!1),[ct,T]=i(!1),[g,L]=i(!1),[Se,v]=i(null),R=n(()=>d(),[]),we=n(()=>Re(),[]),b=l==="loading",te=(u==null?void 0:u.kind)==="warning"||(u==null?void 0:u.kind)==="error"?u:null,lt=(Ce=p==null?void 0:p.metadata.marketplace_key_count)!=null?Ce:0,yt=!!(p&&be&&p.payload_hash!==be);t(()=>{ve({silent:!0})},[]),t(()=>{if(!g)return;let o=a=>{a.preventDefault(),a.stopImmediatePropagation();let f=Ae(a);if(f.kind!=="ignore"){if(f.kind==="cancel"){L(!1),v(null);return}if(f.kind==="error"){v(f.message);return}if(Oe(f.shortcut)){v(`${w(f.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}L(!1),ne(f.shortcut)}};return window.addEventListener("keydown",o,!0),()=>window.removeEventListener("keydown",o,!0)},[g,r]);async function xe(){let o=await $();return it(o.keyCount),st(o.hash),rt(o.installedItemCount),at(o.marketplaceAvailable),o}async function ve(o){try{T(!1),c("loading"),o!=null&&o.silent||y({kind:"info",text:"Checking your Syncify backup\u2026"}),await xe();let a=await O(r);Q(a.payload),ke(a.backups),M(a.payload),ee(!0),c(a.exists?"success":"idle"),o!=null&&o.silent||y(a.exists&&a.payload?{kind:"success",text:`Backup found from ${Qe(a.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(a){oe(a)}}function ut(o){let a=k(h({},r),{autoBackupEnabled:o});s(a),z(a),y({kind:"success",text:o?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}function ne(o){let a=k(h({},r),{shortcut:o});s(a),z(a),ye(o),v(null),y({kind:"success",text:o?`${w(o)} now opens Syncify.`:"Keyboard shortcut turned off."})}function ft(o){let a=k(h({},r),{entryPoint:o});s(a),z(a),K(o)}function dt(){v(null),L(!0)}async function pt(){try{T(!1),c("loading"),y({kind:"info",text:"Backing up your extensions and themes\u2026"});let o=await q(r);Q(o),ke(a=>[o,...a.filter(f=>f.payload_hash!==o.payload_hash)].slice(0,3)),M(o),ee(!0),await xe(),c("success"),y({kind:"success",text:`Backed up ${o.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(o){oe(o)}}function mt(o=m){if(P===!1){let a="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";y({kind:"error",text:a}),Spicetify.showNotification(a,!0,6e3);return}if(!o){let a="No Syncify cloud backup was found for this Spotify account.";y({kind:"error",text:a}),Spicetify.showNotification(a,!0,6e3);return}M(o),T(!0)}async function gt(){try{T(!1),c("loading"),y({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:o,restoredCount:a}=await Xe(r,m!=null?m:void 0);Q(o),M(o),ee(!0),c("success"),y({kind:"success",text:`Restored ${a} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),setTimeout(()=>window.location.reload(),1e3)}catch(o){oe(o)}}function ie(o){if(o.startsWith("mailto:")){window.location.href=o;return}window.open(o,"_blank","noopener,noreferrer")}function oe(o){let a=o instanceof Error?o.message:String(o);c("error"),y({kind:"error",text:a}),Spicetify.showNotification(a,!0,6e3)}function re(o){o.stopPropagation()}return e.createElement("div",{className:"syncify-panel",onClick:re,onMouseDown:re,onPointerDown:re},e.createElement("section",{className:"syncify-hero","aria-label":"Syncify status"},e.createElement("p",{className:"syncify-description"},"Back up your installed extensions and themes, then restore them whenever Spotify or Spicetify needs a fresh setup."),e.createElement("div",{className:"syncify-status-row"},e.createElement("h3",{className:"syncify-heading"},Ft(l,D)),e.createElement("span",{className:"syncify-status-pill","data-kind":Ht(l)},Kt(l,D))),te?e.createElement("p",{className:"syncify-message","data-kind":te.kind},te.text):null),e.createElement("section",{className:"syncify-grid","aria-label":"Syncify backup details"},e.createElement(V,{label:"Backup entries",value:nt}),e.createElement(V,{label:"Extensions/themes",value:ot}),e.createElement(V,{label:"Backup",value:p?`${lt} entries`:D?"None":"Checking",tone:p?"success":D?"warning":"neutral"}),e.createElement(V,{label:"Restore",value:P===null?"Checking":P?"Ready":"Missing",tone:P===null?"neutral":P?"success":"warning"})),p?e.createElement("section",{className:"syncify-section syncify-backup-section"},e.createElement("div",{className:"syncify-section-header"},e.createElement("h4",{className:"syncify-section-title"},"Version history"),e.createElement("span",{className:"syncify-backup-time"},he.length," saved")),e.createElement("div",{className:"syncify-backup-list"},he.map((o,a)=>{let f=(m==null?void 0:m.payload_hash)===o.payload_hash;return e.createElement("button",{className:"syncify-backup-version","data-selected":f?"true":"false",type:"button",key:`${o.payload_hash}-${o.metadata.last_sync_datetime}`,onClick:()=>M(o),disabled:b},e.createElement("span",{className:"syncify-backup-version-main"},e.createElement("strong",null,a===0?"Latest":`Backup ${a+1}`),e.createElement("span",null,Qe(o.metadata.last_sync_datetime))),e.createElement("span",{className:"syncify-backup-details"},e.createElement("span",null,o.metadata.device_info),e.createElement("span",null,o.metadata.marketplace_key_count," entries")))})),yt?e.createElement("p",{className:"syncify-message inline","data-kind":"warning"},"This device differs from your latest backup. Select any saved version to restore it, or back up to add a new version."):null):null,e.createElement("section",{className:"syncify-section compact"},e.createElement("h4",{className:"syncify-section-title"},"Sync controls"),ct?e.createElement("div",{className:"syncify-confirm-restore"},e.createElement("p",{className:"syncify-message inline","data-kind":"warning"},"Restore will replace this device's saved extensions and themes with the selected backup, then reload Spotify."),e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>T(!1),disabled:b},"Cancel"),e.createElement("button",{className:"syncify-button danger",type:"button",onClick:gt,disabled:b},"Confirm restore"))):e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button",type:"button",onClick:pt,disabled:b},"Back up"),e.createElement("button",{className:"syncify-button danger",type:"button",onClick:()=>mt(),disabled:b||!m},"Restore selected"),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{ve()},disabled:b},"Refresh status")),e.createElement("label",{className:"syncify-toggle"},e.createElement("input",{type:"checkbox",checked:r.autoBackupEnabled,onChange:o=>ut(o.currentTarget.checked),disabled:b}),e.createElement("span",null,"Auto-backup extensions and themes after startup safety checks"))),e.createElement("section",{className:"syncify-section compact"},e.createElement("h4",{className:"syncify-section-title"},"Show Syncify in"),e.createElement("div",{className:"syncify-choice-group",role:"radiogroup","aria-label":"Where Syncify appears"},jt.map(o=>{let a=o.value!=="topbar";return e.createElement("label",{className:"syncify-toggle",key:o.value},e.createElement("input",{type:"radio",name:"syncify-entry-point",value:o.value,checked:r.entryPoint===o.value,onChange:()=>ft(o.value),disabled:a&&!we}),e.createElement("span",null,o.label))})),we?r.entryPoint==="menu"&&!r.shortcut?e.createElement("p",{className:"syncify-message inline","data-kind":"warning"},"If the profile menu breaks after a Spotify update, turn the keyboard shortcut back on so you can still open Syncify."):null:e.createElement("p",{className:"syncify-message inline","data-kind":"warning"},"The profile menu isn't available in this Spicetify version, so Syncify stays in the top bar.")),e.createElement("section",{className:"syncify-section compact"},e.createElement("h4",{className:"syncify-section-title"},"Keyboard shortcut"),e.createElement("div",{className:"syncify-shortcut-row"},e.createElement("kbd",{className:"syncify-shortcut-key","data-recording":g?"true":"false"},g?"Press keys\u2026":w(r.shortcut)),e.createElement("div",{className:"syncify-actions"},g?e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>{L(!1),v(null)}},"Cancel"):e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:dt},"Change"),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>ne(S),disabled:g||w(r.shortcut)===w(S)},"Reset"),e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>ne(null),disabled:g||!r.shortcut},"Turn off"))),Se?e.createElement("p",{className:"syncify-message inline","data-kind":"warning"},Se):null),e.createElement("section",{className:"syncify-footer","aria-label":"Syncify links"},e.createElement("span",{className:"syncify-version"},"v",R.version),e.createElement("div",{className:"syncify-footer-actions"},e.createElement("button",{className:"syncify-link-button",type:"button",onClick:()=>ie(R.issueUrl)},"Report an issue"),e.createElement("button",{className:"syncify-link-button",type:"button",onClick:()=>ie(R.githubUrl)},"GitHub"),e.createElement("button",{className:"syncify-link-button",type:"button",onClick:()=>ie(R.kofiUrl)},"Ko-fi"))))}var jt=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar only"},{value:"menu",label:"Profile menu only"}];function V({label:e,value:t,tone:n="neutral"}){let i=Spicetify.React;return i.createElement("div",{className:"syncify-card","data-tone":n},i.createElement("span",{className:"syncify-card-label"},e),i.createElement("strong",{className:"syncify-card-value"},t))}function Ft(e,t){return e==="loading"?"Checking status\u2026":e==="error"?"Sync needs attention":e==="success"?"Backup available":e==="needs-restore"?"Restore recommended":t?"Ready to back up":"Loading Syncify"}function Kt(e,t){return e==="loading"?"Checking":e==="error"?"Error":e==="success"?"Synced":e==="needs-restore"?"Restore":t?"Ready":"Starting"}function Ht(e){return e==="success"?"success":e==="error"?"error":e==="needs-restore"?"warning":"neutral"}function Qe(e){let t=new Date(e);if(Number.isNaN(t.getTime()))return e;let n=t.toLocaleDateString(void 0,{month:"short",day:"numeric"}),i=t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${n}, ${i}`}var G="[Syncify]";function x(e,t){if(t===void 0){console.debug(G,e);return}console.debug(G,e,t)}function X(e,t){if(t===void 0){console.warn(G,e);return}console.warn(G,e,t)}(function e(){if(!Yt()){setTimeout(e,100);return}x("Spicetify APIs ready"),zt()})();function Yt(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}function zt(){Wt();let e=N();je({topbarButton:$t(),menuItem:Zt()}),K(e.entryPoint),le(e.shortcut,Z),Ze().catch(t=>{X("Startup sync check failed",t)})}function Wt(){let e="syncify-styles";if(document.getElementById(e))return;let t=document.createElement("style");t.id=e,t.textContent=Pe,document.head.appendChild(t)}function $t(){let{extensionName:e}=d(),t=new Spicetify.Topbar.Button(e,ae,n=>{x("Topbar button clicked",J(n)),Z()},!1,!0);return tt(t),Gt(t),en(t),x("Topbar button registered",J(t)),t}function tt(e){var n;let t=e;e.element.style.setProperty("-webkit-app-region","no-drag"),(n=t.button)==null||n.style.setProperty("-webkit-app-region","no-drag")}var qt=".main-actionButtons",Vt=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function Gt(e){if(typeof MutationObserver=="undefined")return;let t=!1,n=()=>{t=!1;let i=e.element,r=document.querySelector(qt);!i||!r||r.contains(i)||(r.prepend(i),Jt(e),tt(e),x("Topbar button re-attached",J(e)))};new MutationObserver(()=>{t||(t=!0,setTimeout(n,250))}).observe(document.body,{childList:!0,subtree:!0}),n()}function Jt(e){let t=Xt(e);if(!t||t.className&&t.className!=="undefined")return;let n=Array.from(document.querySelectorAll(Vt)).find(i=>!e.element.contains(i));n!=null&&n.className&&(t.className=n.className)}function Xt(e){return e.button}function Zt(){var e;if(typeof((e=Spicetify.Menu)==null?void 0:e.Item)!="function")return null;try{return new Spicetify.Menu.Item(d().extensionName,!1,()=>Z(),Qt())}catch(t){return X("Failed to create profile menu item",t),null}}function Qt(){return ae.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function en(e){Object.assign(window,{SyncifyDebug:{button:e,element:e.element,openModal:Z,inspect:()=>J(e),clickElement:()=>{var t;return(t=e.element)==null?void 0:t.click()},clickInnerButton:()=>{var t;return(t=e.button)==null?void 0:t.click()},clickCallback:()=>e.onClick(e)}})}function J(e){var t,n,i,r,s;return{label:e.label,disabled:e.disabled,isRight:e.isRight,hasElement:!!e.element,elementConnected:(t=e.element)==null?void 0:t.isConnected,elementDisabled:(n=e.element)==null?void 0:n.disabled,elementAriaDisabled:(i=e.element)==null?void 0:i.getAttribute("aria-disabled"),elementClass:(r=e.element)==null?void 0:r.className,appRegion:e.element?getComputedStyle(e.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:e.button?getComputedStyle(e.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:e.element?getComputedStyle(e.element).pointerEvents:null,visibility:e.element?getComputedStyle(e.element).visibility:null,display:e.element?getComputedStyle(e.element).display:null,rect:(s=e.element)==null?void 0:s.getBoundingClientRect().toJSON()}}function Z(){x("Opening modal");let e=document.createElement("div");try{Spicetify.PopupModal.display({title:d().extensionName,content:e,isLarge:!1})}catch(t){throw X("Failed to open PopupModal",t),t}tn(e),on(e)}function tn(e){requestAnimationFrame(()=>{let t=nn(e);t==null||t.classList.add("syncify-modal-shell");let n=t==null?void 0:t.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');n&&(n.classList.add("syncify-modal-close"),n.setAttribute("aria-label",`Close ${d().extensionName}`),n.title="Close",n.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function nn(e){let t=e.parentElement;for(;t&&t!==document.body;){if(t.querySelector(".main-trackCreditsModal-header"))return t;t=t.parentElement}return e.closest('[class*="trackCreditsModal"]')}function on(e){try{let t=Spicetify.React.createElement(et);if(typeof Spicetify.ReactDOM.createRoot=="function"){Spicetify.ReactDOM.createRoot(e).render(t),x("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(t,e),x("Modal rendered",{renderer:"render"})}catch(t){throw X("Failed to render modal",t),t}}})();
