// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var xn=Object.defineProperty,wn=Object.defineProperties;var vn=Object.getOwnPropertyDescriptors;var yt=Object.getOwnPropertySymbols;var En=Object.prototype.hasOwnProperty,Cn=Object.prototype.propertyIsEnumerable;var ut=(e,t,n)=>t in e?xn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,d=(e,t)=>{for(var n in t||(t={}))En.call(t,n)&&ut(e,n,t[n]);if(yt)for(var n of yt(t))Cn.call(t,n)&&ut(e,n,t[n]);return e},m=(e,t)=>wn(e,vn(t));var ft=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var Be=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var I={extensionName:"Syncify",version:"1.4.0",workerUrl:"https://syncify-worker.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com"};function h(){var t,n,i,o,a,c,l;let e=window.SyncifyConfig;return{extensionName:(t=U(e==null?void 0:e.extensionName))!=null?t:I.extensionName,version:(n=dt(e==null?void 0:e.version))!=null?n:I.version,workerUrl:(i=U(e==null?void 0:e.workerUrl))!=null?i:I.workerUrl,githubUrl:(o=U(e==null?void 0:e.githubUrl))!=null?o:I.githubUrl,kofiUrl:(a=U(e==null?void 0:e.kofiUrl))!=null?a:I.kofiUrl,issueUrl:(c=U(e==null?void 0:e.issueUrl))!=null?c:I.issueUrl,releasesUrl:(l=U(e==null?void 0:e.releasesUrl))!=null?l:I.releasesUrl}}function U(e){return dt(e)}function dt(e){return typeof e=="string"&&e.trim()?e.trim():null}var Tn="x-syncify-version",_n="x-syncify-install",Pn="x-syncify-timezone",Bn="syncify",Me="state",pt="install-id",mt="syncify:install-id",Mn=2e3,oe=null;async function gt(){let e={[Tn]:h().version,[_n]:await An()},t=On();return t&&(e[Pn]=t),e}function An(){return oe!=null||(oe=Un().catch(()=>re())),oe}async function Un(){let e=await Promise.race([Dn(),new Promise(t=>setTimeout(()=>t(null),Mn))]);if(e)return e;try{let t=window.localStorage.getItem(mt);if(t&&ht(t))return t;let n=re();return window.localStorage.setItem(mt,n),n}catch(t){return re()}}function Dn(){let e;try{e=window.indexedDB}catch(t){return Promise.resolve(null)}return e?new Promise(t=>{let n;try{n=e.open(Bn,1)}catch(i){t(null);return}n.onupgradeneeded=()=>{n.result.createObjectStore(Me)},n.onerror=()=>t(null),n.onblocked=()=>t(null),n.onsuccess=()=>{let i=n.result,o=null;try{let a=i.transaction(Me,"readwrite"),c=a.objectStore(Me),l=c.get(pt);l.onsuccess=()=>{if(typeof l.result=="string"&&ht(l.result)){o=l.result;return}o=re(),c.put(o,pt)},a.oncomplete=()=>{i.close(),t(o)},a.onerror=a.onabort=()=>{i.close(),t(null)}}catch(a){i.close(),t(null)}}}):Promise.resolve(null)}function re(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t=[...e].map(n=>n.toString(16).padStart(2,"0"));return[t.slice(0,4).join(""),t.slice(4,6).join(""),t.slice(6,8).join(""),t.slice(8,10).join(""),t.slice(10).join("")].join("-")}function ht(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(e)}function On(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(e){return null}}var Ln="x-syncify-user-hash",Rn="x-syncify-identity",jn="/restores",St=3,H=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}};async function bt(e,t,n){let i=await Ae(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(n)});if(!i.ok)throw new Error(`Backup failed with HTTP ${i.status}.`);let o=await i.json().catch(()=>null);return{unchanged:(o==null?void 0:o.unchanged)===!0}}async function kt(e,t){var l,y,u;let n=await Ae(e,t,{method:"GET"});if(n.status===404)return{exists:!1,payload:null,backups:[],safetyCopy:null};if(!n.ok)throw new Error(`Restore failed with HTTP ${n.status}.`);let i=await n.json(),o=[i,...(l=i.backup_history)!=null?l:[]];if(!o.every(f=>f.backup))return{exists:!0,payload:i,backups:o.slice(0,St),safetyCopy:(y=o[St])!=null?y:null};let a=o.filter(f=>{var S;return((S=f.backup)==null?void 0:S.kind)==="rolling"}),c=(u=o.find(f=>{var S;return((S=f.backup)==null?void 0:S.kind)==="anchor"}))!=null?u:null;return a.length===0&&c?{exists:!0,payload:i,backups:[c],safetyCopy:null}:{exists:!0,payload:i,backups:a,safetyCopy:c}}async function xt(e,t,n){try{await Ae(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:n}),keepalive:!0},jn)}catch(i){}}async function Ae(e,t,n,i=""){let o=i?`${e.replace(/\/+$/,"")}${i}`:e,a=await fetch(o,m(d({},n),{headers:m(d(d({},n.headers),await gt()),{[Ln]:t.hash,[Rn]:t.field})}));if(a.status===426)throw new H;return a}var O={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},Fn=/^([a-z0-9]|f([1-9]|1[0-2]))$/,Kn=250,$n=40,Ue=null,ae=null,D=null;function wt(){return/mac/i.test(navigator.platform||navigator.userAgent)}function vt(e){if(e===null)return null;if(!e||typeof e!="object")return O;let t=e;return typeof t.key!="string"||!Fn.test(t.key)?O:{key:t.key,ctrl:!!t.ctrl,alt:!!t.alt,shift:!!t.shift,meta:!!t.meta}}function Y(e){if(!e)return"Off";let t=e.key.toUpperCase();return wt()?[e.ctrl?"\u2318":"",e.alt?"\u2325":"",e.shift?"\u21E7":"",t].join(""):[e.ctrl&&"Ctrl",e.meta&&"Win",e.alt&&"Alt",e.shift&&"Shift",t].filter(Boolean).join("+")}function Et(e){if(e.key==="Escape")return{kind:"cancel"};let t=Hn(e.code);if(!t)return{kind:"ignore"};let n=wt();if(n&&e.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:t,ctrl:n?e.metaKey:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:n?!1:e.metaKey},o=t.startsWith("f")&&t.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!o?{kind:"error",message:`Include ${n?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function Hn(e){var n,i;let t=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(e);return t?((i=(n=t[1])!=null?n:t[2])!=null?i:t[3]).toLowerCase():null}function Ct(e){var t;if(D&&Yn(D,e))return!1;try{let n=Spicetify.Mousetrap,i=(t=n.trigger)==null?void 0:t.call(n)._directMap;if(!i)return!1;let o=De(e);return Object.keys(i).some(a=>a.startsWith(`${o}:`))}catch(n){return!1}}function Oe(e,t,n=0){if(Ue=t,ae=e,!Nt()){if(n>=$n){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>Oe(ae,t,n+1),Kn);return}Le(ae)}function Le(e){if(ae=e,!Nt()||!Ue)return;let t=Ue;try{if(D&&Spicetify.Keyboard._deregisterShortcut(D),D=null,!e)return;Spicetify.Keyboard.registerShortcut(e,n=>{n.preventDefault(),t()}),D=e,console.debug("[Syncify]","Keyboard shortcut registered",Y(e))}catch(n){console.warn("[Syncify]","Failed to register keyboard shortcut",n)}}function Nt(){var e;return typeof((e=Spicetify.Keyboard)==null?void 0:e.registerShortcut)=="function"}function De(e){return[e.ctrl&&"mod",e.meta&&"meta",e.alt&&"alt",e.shift&&"shift",e.key].filter(Boolean).join("+")}function Yn(e,t){return De(e)===De(t)}var Re="both",zn=["both","topbar","menu"],z=null,V=null,se=!1;function It(e){return zn.includes(e)?e:Re}function Tt(){var e;return typeof((e=Spicetify.Menu)==null?void 0:e.Item)=="function"}function _t(e){z=e.topbarButton,V=e.menuItem}function ce(e){let t=e!=="menu"||!V,n=e!=="topbar";if(z!=null&&z.element&&(z.element.style.display=t?"":"none"),!!V)try{n&&!se?(V.register(),se=!0):!n&&se&&(V.deregister(),se=!1)}catch(i){console.warn("[Syncify]","Failed to update profile menu item",i)}}var ye="syncify:config",le={workerUrl:h().workerUrl,autoBackupEnabled:!1,shortcut:O,entryPoint:Re};function L(){var n,i;let e=h(),t=(i=(n=Spicetify.LocalStorage)==null?void 0:n.get(ye))!=null?i:window.localStorage.getItem(ye);if(!t)return m(d({},le),{workerUrl:e.workerUrl});try{let o=JSON.parse(t);return{workerUrl:e.workerUrl,autoBackupEnabled:o.autoBackupEnabled===void 0?le.autoBackupEnabled:!!o.autoBackupEnabled,shortcut:o.shortcut===void 0?le.shortcut:vt(o.shortcut),entryPoint:It(o.entryPoint)}}catch(o){return m(d({},le),{workerUrl:e.workerUrl})}}function ue(e){var n;let t=JSON.stringify({workerUrl:h().workerUrl,autoBackupEnabled:e.autoBackupEnabled,shortcut:e.shortcut,entryPoint:e.entryPoint});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set(ye,t);return}window.localStorage.setItem(ye,t)}function fe(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}async function de(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return[...new Uint8Array(n)].map(i=>i.toString(16).padStart(2,"0")).join("")}function W(e){return JSON.stringify(je(e))}function je(e){return Array.isArray(e)?e.map(je):e&&typeof e=="object"?Object.keys(e).sort().reduce((t,n)=>(t[n]=je(e[n]),t),{}):e}var Vn=["username","canonicalUsername","id","uri","displayName"];async function pe(){let{value:e,field:t}=await Wn();return{hash:await de(e),field:t}}async function Wn(){var o;let e=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let t=await e.getUser(),n=Vn.find(a=>(t==null?void 0:t[a])!=null),i=n?t[n]:void 0;if(!n||!i)throw new Error("Unable to resolve the active Spotify user.");return{value:i,field:n}}function Pt(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var qn=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,Jn=100,Gn="marketplace:installed-extensions";function Ke(e){let t=Spicetify.Config;if(!t)return null;let n=new Set(Xn(e)),i=Array.isArray(t.extensions)?t.extensions.filter(o=>!n.has(o)):[];return q(m(d({},t),{extensions:i}))}function q(e){let t=e&&typeof e=="object"?e:{};return{current_theme:Fe(t.current_theme)?t.current_theme:"",color_scheme:Fe(t.color_scheme)?t.color_scheme:"",extensions:Bt(t.extensions),custom_apps:Bt(t.custom_apps)}}function Mt(e,t){return W(q(e))===W(q(t))}function Bt(e){return Array.isArray(e)?[...new Set(e.filter(Fe))].sort().slice(0,Jn):[]}function Fe(e){return typeof e=="string"&&qn.test(e)}function Xn(e){return Zn(e[Gn]).flatMap(t=>{var a;let n=(a=Qn(e[t]))==null?void 0:a.manifest,i=n&&typeof n=="object"?n.main:void 0,o=typeof i=="string"?i.split("/").pop():void 0;return o?[o]:[]})}function Zn(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function Qn(e){try{let t=e?JSON.parse(e):null;return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch(t){return null}}var me="spicetify-marketplace";var J="settings";async function At(){let e=await Ot();if(e.kind!=="ok")return null;try{let t=await Lt(e.db,"readonly",i=>i.getAll());if(!t)return null;let n={};for(let i of t)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(n[i.key]=i.value);return n}finally{e.db.close()}}async function Ut(e){let t=await Ot();if(t.kind==="unavailable")return"unavailable";let n=t.kind==="ok"?t.db:await ei();if(!n)return"failed";try{return await Lt(n,"readwrite",o=>{let a;for(let[c,l]of Object.entries(e))a=o.put({key:c,value:l});return a})===null?"failed":"written"}finally{n.close()}}function Dt(){var e;try{return(e=window.indexedDB)!=null?e:null}catch(t){return null}}async function Ot(){let e=Dt();return e?await ti(e)?{kind:"missing"}:new Promise(t=>{let n=!1,i=e.open(me);i.onupgradeneeded=()=>{n=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),t({kind:"unavailable"})},i.onblocked=()=>t({kind:"unavailable"}),i.onsuccess=()=>{let o=i.result;if(n){o.close(),ni(e).then(()=>t({kind:"missing"}));return}if(!o.objectStoreNames.contains(J)){o.close(),t({kind:"unavailable"});return}t({kind:"ok",db:o})}}):{kind:"unavailable"}}function ei(){let e=Dt();return e?new Promise(t=>{let n=e.open(me,1);n.onupgradeneeded=()=>{let i=n.result;i.objectStoreNames.contains(J)||i.createObjectStore(J,{keyPath:"key"})},n.onerror=()=>{console.warn("Syncify could not create Marketplace storage",n.error),t(null)},n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}async function ti(e){if(typeof e.databases!="function")return!1;try{return!(await e.databases()).some(n=>n.name===me)}catch(t){return!1}}function ni(e){return new Promise(t=>{let n=e.deleteDatabase(me);n.onsuccess=()=>t(),n.onerror=()=>t(),n.onblocked=()=>t()})}function Lt(e,t,n){return new Promise(i=>{let o;try{o=e.transaction(J,t)}catch(u){console.warn("Syncify could not open a Marketplace transaction",u),i(null);return}let a,c=!1,l=u=>{c||(c=!0,i(u))};o.oncomplete=()=>l(a),o.onerror=()=>{console.warn("Syncify Marketplace transaction failed",o.error),l(null)},o.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",o.error),l(null)};let y;try{y=n(o.objectStore(J))}catch(u){console.warn("Syncify Marketplace request could not be issued",u),l(null);return}y&&(y.onsuccess=()=>{a=y.result},y.onerror=()=>{console.warn("Syncify Marketplace request failed",y.error),l(null)})})}var $e="marketplace:",Rt=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function jt(){let e=yi(),t=await At();if(t)for(let[n,i]of Object.entries(t))n.startsWith($e)&&(e[n]=i);return e}var oi=new Set(["marketplace:active-tab","marketplace:sort"]),ri="marketplace:installed:",ai=["stars","tags","lastUpdated","created"];async function ge(e,t){let n={};for(let[i,o]of Object.entries(e))oi.has(i)||(n[i]=i.startsWith(ri)?si(o):o);return t&&(n.spicetify_config=q(t)),de(W(n))}function si(e){try{let t=JSON.parse(e);if(!t||typeof t!="object"||Array.isArray(t))return e;for(let n of ai)delete t[n];return t}catch(t){return e}}async function he(){let e=await jt(),t=Ke(e);return{keyCount:Object.keys(e).length,hash:await ge(e,t),installedItemCount:ci(e),installedItems:G(e),spicetifyConfig:t,marketplaceAvailable:li(e)}}async function Ft(){let e=await jt(),t=Ke(e);return d({schema_version:2,metadata:{last_sync_datetime:new Date().toISOString(),device_info:Pt(),marketplace_key_count:Object.keys(e).length},payload_hash:await ge(e,t),marketplace_data:{keys:e}},t?{spicetify_config:t}:{})}async function Kt(e){var a,c;let t={},n=(c=(a=e.marketplace_data)==null?void 0:a.keys)!=null?c:{};for(let[l,y]of Object.entries(n))l.startsWith($e)&&(t[l]=y);let i=Object.keys(t);if(i.length===0)return 0;for(let l of i)window.localStorage.setItem(l,t[l]);if(await Ut(t)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try the restore again.");return i.length}function ci(e){return G(e).length}function G(e){return Rt.flatMap(t=>ui(e[t]).map(String))}function li(e){return!!(window.Marketplace||Rt.some(n=>e[n]!==void 0)||e["marketplace:tabs"]!==void 0)}function $t(e,t){return t===0?!1:e===0?!0:e<Math.max(2,Math.floor(t*.5))}function yi(){let e={};for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);if(!(n!=null&&n.startsWith($e)))continue;let i=window.localStorage.getItem(n);i!==null&&(e[n]=i)}return e}function ui(e){if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch(t){return[]}}async function Se(e){if(!fe(e))throw new Error("Syncify backup service is not configured.");let[t,n]=await Promise.all([pe(),Ft()]);if(n.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:i}=await bt(e.workerUrl,t,n);return{payload:n,unchanged:i}}async function X(e){var a;if(!fe(e))throw new Error("Syncify backup service is not configured.");let t=await kt(e.workerUrl,await pe()),[n,i]=await Promise.all([Promise.all(t.backups.map(Ht)),t.safetyCopy?Ht(t.safetyCopy):null]),o=n.filter((c,l)=>n.findIndex(y=>y.payload_hash===c.payload_hash)===l);return m(d({},t),{payload:(a=o[0])!=null?a:null,backups:o,safetyCopy:i&&!o.some(c=>c.payload_hash===i.payload_hash)?i:null})}var He=new Map;async function Ht(e){var i,o,a;let t=`${e.payload_hash} ${(i=e.metadata)==null?void 0:i.last_sync_datetime}`,n=He.get(t);return n||(n=ge((a=(o=e.marketplace_data)==null?void 0:o.keys)!=null?a:{},e.spicetify_config),He.set(t,n),n.catch(()=>He.delete(t))),m(d({},e),{payload_hash:await n})}async function Yt(e,t){var a;let n=t!=null?t:(await X(e)).payload;if(!n)throw new Error("No Syncify cloud backup was found for this Spotify account.");let i=await Kt(n),o=(a=n.backup)==null?void 0:a.id;return o&&fe(e)&&pe().then(c=>xt(e.workerUrl,c,o)).catch(()=>{}),{payload:n,restoredCount:i}}async function zt(){var t,n,i;let e=L();if(!(!e.workerUrl||!e.autoBackupEnabled))try{let[o,a]=await Promise.all([he(),X(e)]),c=(n=(t=a.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?n:0;if(a.exists&&$t(o.keyCount,c)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(((i=a.payload)==null?void 0:i.payload_hash)===o.hash||o.keyCount===0)return;await Se(e),Spicetify.showNotification("Syncify auto-backup complete")}catch(o){let a=o instanceof Error?o.message:String(o);console.warn("Syncify startup sync failed:",o),Spicetify.showNotification(`Syncify auto-sync skipped: ${a}`,!0,8e3)}}var fi="syncify:beta",Vt=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function Wt(){var e;return(e=window.SyncifyLoader)!=null?e:null}function di(){try{return window.localStorage.getItem(fi)==="true"}catch(e){return!1}}async function qt(e){let t=di()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(t.map(i=>pi(`${e}/${i}`)))).reduce((i,o)=>o&&(!i||ze(o,i)>0)?o:i,null)}function Ye(e){return typeof e=="string"&&Vt.test(e)}function ze(e,t){let[n,i]=[e,t].map(o=>{var u;let[,a,c,l,y]=(u=Vt.exec(o))!=null?u:[];return[a,c,l,y!=null?y:1/0].map(Number)});for(let o=0;o<n.length;o+=1)if(n[o]!==i[o])return n[o]<i[o]?-1:1;return 0}async function pi(e,t=3e3){let n=typeof AbortController=="function"?new AbortController:null,i=setTimeout(()=>n==null?void 0:n.abort(),t);try{let o=await fetch(e,{signal:n==null?void 0:n.signal});if(!o.ok)return null;let a=await o.json();return Ye(a==null?void 0:a.version)?a.version:null}catch(o){return null}finally{clearTimeout(i)}}function Jt(){let e=Spicetify.React,t=e.useEffect,n=e.useMemo,i=e.useState,o=e.useRef,[a,c]=i(()=>L()),[l,y]=i("idle"),[u,f]=i(null),[S,Q]=i(0),[ee,te]=i([]),[R,en]=i(null),[Ve,tn]=i(null),[k,nn]=i(null),[x,We]=i(null),[T,qe]=i([]),[j,Je]=i(null),[g,F]=i(null),[Ge,Ee]=i(!1),[on,N]=i(!1),[v,_]=i(!1),[Ce,P]=i(null),[rn,an]=i(null),[ne,sn]=i(!1),[B,cn]=i(!1),[Xe,ln]=i(null),Ze=o(null),E=n(()=>h(),[]),M=n(()=>j?[...T,j]:T,[T,j]),yn=n(()=>new Map(M.map(r=>[r,G(r.marketplace_data.keys)])),[M]),Qe=r=>{var s;return(s=yn.get(r))!=null?s:G(r.marketplace_data.keys)},et=r=>Qe(r).length,Ne=n(()=>Tt(),[]),tt=n(()=>Wt()!==null,[]),C=l==="loading",ie=(u==null?void 0:u.kind)==="warning"||(u==null?void 0:u.kind)==="error"?u:null,nt=!!(x&&k&&x.payload_hash!==k),K=!!(x&&k&&x.payload_hash===k),it=!!(g&&k&&g.payload_hash===k),Ie=ne||!K||M.length<2,un=Ie?T:T.slice(0,1),fn=!!(k&&S>0&&!M.some(r=>r.payload_hash===k));t(()=>{rt({silent:!0}),dn()},[]),t(()=>{if(!v)return;let r=s=>{var A;if(!((A=Ze.current)!=null&&A.isConnected)){_(!1),P(null);return}s.preventDefault(),s.stopImmediatePropagation();let p=Et(s);if(p.kind!=="ignore"){if(p.kind==="cancel"){_(!1),P(null);return}if(p.kind==="error"){P(p.message);return}if(Ct(p.shortcut)){P(`${Y(p.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}_(!1),Te(p.shortcut)}};return window.addEventListener("keydown",r,!0),()=>window.removeEventListener("keydown",r,!0)},[v,a]);async function ot(){let r=await he();return nn(r.hash),Q(r.installedItemCount),te(r.installedItems),en(r.spicetifyConfig),tn(r.marketplaceAvailable),r}async function rt(r){try{N(!1),y("loading"),r!=null&&r.silent||f({kind:"info",text:"Checking your Syncify backup\u2026"}),await ot();let s=await X(a);We(s.payload),qe(s.backups),Je(s.safetyCopy),F(s.payload),Ee(!0),y(s.exists?"success":"idle"),r!=null&&r.silent||f(s.exists&&s.payload?{kind:"success",text:`Backup found from ${Z(s.payload.metadata.last_sync_datetime)}.`}:{kind:"info",text:"No backup exists yet. Create one from this device when you're ready."})}catch(s){_e(s)}}async function dn(){let r=E.version;if(!Ye(r))return;let s=await qt(E.releasesUrl);s&&ze(s,r)>0&&ln(s)}function pn(r){let s=m(d({},a),{autoBackupEnabled:r});c(s),ue(s),f({kind:"success",text:r?"Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten.":"Automatic backups are off. You can still back up manually."})}function Te(r){let s=m(d({},a),{shortcut:r});c(s),ue(s),Le(r),P(null),f({kind:"success",text:r?`${Y(r)} now opens Syncify.`:"Keyboard shortcut turned off."})}function mn(r){let s=m(d({},a),{entryPoint:r});c(s),ue(s),ce(r)}function gn(){P(null),_(!0)}async function hn(){try{N(!1),y("loading"),f({kind:"info",text:"Backing up your extensions and themes\u2026"});let{payload:r,unchanged:s}=await Se(a);if(await ot(),s){Ee(!0),y("success"),f({kind:"success",text:"Everything is already backed up."}),Spicetify.showNotification("Syncify: everything is already backed up");return}We(r),qe(p=>[r,...p.filter(A=>A.payload_hash!==r.payload_hash)].slice(0,Si)),Je(p=>(p==null?void 0:p.payload_hash)===r.payload_hash?null:p),F(r),Ee(!0),y("success"),f({kind:"success",text:`Backed up ${r.metadata.marketplace_key_count} entries.`}),Spicetify.showNotification("Syncify backup complete")}catch(r){_e(r)}}function Sn(r=g){if(Ve===!1){let s="Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";f({kind:"error",text:s}),Spicetify.showNotification(s,!0,6e3);return}if(!r){let s="No Syncify cloud backup was found for this Spotify account.";f({kind:"error",text:s}),Spicetify.showNotification(s,!0,6e3);return}F(r),N(!0)}async function bn(){try{N(!1),y("loading"),f({kind:"info",text:"Restoring your extensions and themes\u2026"});let{payload:r,restoredCount:s}=await Yt(a,g!=null?g:void 0);F(r),y("success"),f({kind:"success",text:`Restored ${s} entries. Reloading Spotify\u2026`}),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),setTimeout(()=>window.location.reload(),1e3)}catch(r){_e(r)}}function $(r){if(r.startsWith("mailto:")){window.location.href=r;return}window.open(r,"_blank","noopener,noreferrer")}function _e(r){if(y("error"),r instanceof H){cn(!0),f(null);return}let s=r instanceof Error?r.message:String(r);f({kind:"error",text:s}),Spicetify.showNotification(s,!0,6e3)}function at(r,s){let p=(g==null?void 0:g.payload_hash)===r.payload_hash,A=r.payload_hash===k,ct=Z(r.metadata.last_sync_datetime),lt=be(et(r));return e.createElement("button",{className:"syncify-backup",role:"radio","aria-checked":p,"data-selected":p?"true":"false",type:"button",key:`${r.payload_hash}-${r.metadata.last_sync_datetime}`,title:s!=null&&s.isSafetyCopy?"Kept aside and updated about once a week, so a burst of new backups can't replace it":void 0,onClick:()=>{F(r),N(!1)},disabled:C},e.createElement("span",{className:"syncify-radio","aria-hidden":"true"}),s!=null&&s.isSafetyCopy?e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",null,"Safety copy"," ",e.createElement("span",{className:"syncify-backup-note"},"\xB7 updated weekly")),e.createElement("span",{className:"syncify-muted"},ct," \xB7 ",lt)):e.createElement("span",{className:"syncify-backup-text"},e.createElement("span",{className:"syncify-backup-date"},ct),e.createElement("span",{className:"syncify-muted"},lt," \xB7 from ",r.metadata.device_info)),A?e.createElement("span",{className:"syncify-tag",title:"What's on this device now"},"Current"):null,s!=null&&s.isSafetyCopy?e.createElement(gi,null):null)}function Pe(r){r.stopPropagation()}let kn=B?"Update Syncify to keep backing up":Ge?x?nt?"Changes since your last backup":"Everything is backed up":"No backup yet":l==="error"?"Couldn't check your backup":"Checking your backup\u2026",st=B?"Your backups are safe":Ge?x?nt?ki(x,Qe(x),ee,R):`Last backup ${Z(x.metadata.last_sync_datetime)}`:"Save your extensions and themes so you can restore them after a reinstall or on another computer.":null;return e.createElement("div",{className:"syncify-panel",ref:Ze,onClick:Pe,onMouseDown:Pe,onPointerDown:Pe},B?e.createElement("div",{className:"syncify-alert","data-kind":"error",role:"alert"},e.createElement("span",null,"This version of Syncify is no longer supported."),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>$(`${E.githubUrl}#updating`)},"How to update")):null,ie?e.createElement("div",{className:"syncify-alert","data-kind":ie.kind},e.createElement("span",null,ie.text),e.createElement("span",{className:"syncify-alert-actions"},ie.kind==="error"?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>{rt()},disabled:C},"Try again"):null,e.createElement("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>f(null)},e.createElement(hi,null)))):null,e.createElement("section",{className:"syncify-status","aria-live":"polite"},e.createElement("div",{className:"syncify-status-text"},e.createElement("h3",{className:"syncify-status-title"},kn),e.createElement("p",{className:"syncify-muted"},st?`${st} \xB7 `:"",be(S)," on this device")),e.createElement("button",{className:"syncify-button",type:"button",onClick:hn,disabled:C||K||B,title:K?"No changes since your last backup":void 0},C?"Working\u2026":K?"Backed up":"Back up now")),T.length>0?e.createElement("section",{className:"syncify-section","aria-label":"Backups"},e.createElement("div",{className:"syncify-section-header"},e.createElement("h4",{className:"syncify-section-title"},"Backups"),K&&M.length>1?e.createElement("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":ne,"aria-controls":"syncify-backup-list",onClick:()=>{sn(!ne),N(!1)}},ne?"Show less":`Show all ${M.length}`,e.createElement(Gt,null)):null),e.createElement("div",{className:"syncify-backup-list",id:"syncify-backup-list",role:"radiogroup","aria-label":"Choose a backup to restore"},un.map(r=>at(r)),Ie&&j?e.createElement(e.Fragment,null,e.createElement("div",{className:"syncify-backup-divider",role:"presentation"}),at(j,{isSafetyCopy:!0})):null),Ie?Ve===!1?e.createElement("p",{className:"syncify-muted"},"Install Spicetify Marketplace to restore a backup."):on?e.createElement("div",{className:"syncify-confirm"},e.createElement("p",null,"Replace this device's"," ",be(S)," with the"," ",g?`${be(et(g))} from ${Z(g.metadata.last_sync_datetime)}`:"selected backup","? Spotify will reload."),fn?e.createElement("div",{className:"syncify-alert"},"Your current setup isn't backed up."):null,e.createElement("div",{className:"syncify-actions"},e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>N(!1),disabled:C},"Cancel"),e.createElement("button",{className:"syncify-button",type:"button",onClick:bn,disabled:C},"Restore"))):e.createElement("div",{className:"syncify-actions"},it?e.createElement("span",{className:"syncify-muted syncify-actions-hint"},"This backup is already current."):null,e.createElement("button",{className:"syncify-button secondary",type:"button",onClick:()=>Sn(),disabled:C||!g||it},"Restore backup")):null):null,e.createElement("div",{className:"syncify-accordion"},e.createElement(mi,{id:"settings",title:"Settings",openSection:rn,onToggle:r=>{an(r),r!=="settings"&&_(!1)}},e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Back up automatically"),e.createElement("span",{className:"syncify-muted"},"When Spotify starts and something has changed")),e.createElement("input",{className:"syncify-switch",type:"checkbox",role:"switch",checked:a.autoBackupEnabled&&!B,onChange:r=>pn(r.currentTarget.checked),disabled:C||B})),e.createElement("label",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Open Syncify from"),Ne?a.entryPoint==="menu"&&!a.shortcut?e.createElement("span",{className:"syncify-muted"},"Keep a shortcut in case a Spotify update breaks the menu"):null:e.createElement("span",{className:"syncify-muted"},"The profile menu isn't available in this Spicetify version")),e.createElement("select",{className:"syncify-select",value:Ne?a.entryPoint:"topbar",onChange:r=>mn(r.currentTarget.value),disabled:!Ne},bi.map(r=>e.createElement("option",{key:r.value,value:r.value},r.label)))),e.createElement("div",{className:"syncify-setting"},e.createElement("span",{className:"syncify-setting-text"},e.createElement("span",null,"Keyboard shortcut"),v&&!Ce?e.createElement("span",{className:"syncify-muted"},"Press a key combination, or Esc to cancel"):null),e.createElement("span",{className:"syncify-shortcut"},a.shortcut&&!v?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Te(null)},"Turn off"):null,!a.shortcut&&!v?e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>Te(O)},"Use default"):null,e.createElement("button",{className:"syncify-key",type:"button","data-recording":v?"true":"false",onClick:()=>v?_(!1):gn(),title:"Click to change"},v?"Press keys\u2026":a.shortcut?Y(a.shortcut):"Off"))),Ce?e.createElement("div",{className:"syncify-alert",role:"alert"},Ce):null)),e.createElement("footer",{className:"syncify-footer"},e.createElement("span",{className:"syncify-footer-version"},e.createElement("span",null,"Syncify ",E.version),Xe?e.createElement("button",{className:"syncify-text-button syncify-update",type:"button",onClick:()=>tt?window.location.reload():$(`${E.githubUrl}#updating`)},Xe," is out \xB7 ",tt?"Reload":"How to update"):null),e.createElement("span",{className:"syncify-footer-links"},e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>$(E.issueUrl)},"Report an issue"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>$(E.githubUrl)},"GitHub"),e.createElement("button",{className:"syncify-text-button",type:"button",onClick:()=>$(E.kofiUrl)},"Support on Ko-fi"))))}function mi(e){let t=Spicetify.React,n=e.openSection===e.id,i=`syncify-section-${e.id}`;return t.createElement("section",{className:"syncify-accordion-section","aria-label":e.title},t.createElement("button",{className:"syncify-accordion-header",type:"button","aria-expanded":n,"aria-controls":i,onClick:()=>e.onToggle(n?null:e.id)},t.createElement("span",{className:"syncify-accordion-title"},e.title),t.createElement(Gt,null)),n?t.createElement("div",{className:"syncify-accordion-body",id:i},e.children):null)}function gi(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-shield",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"}))}function Gt(){let e=Spicetify.React;return e.createElement("svg",{className:"syncify-chevron",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"m9 6 6 6-6 6"}))}function hi(){let e=Spicetify.React;return e.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.createElement("path",{d:"M18 6 6 18"}),e.createElement("path",{d:"m6 6 12 12"}))}var Si=3,bi=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function ki(e,t,n,i){var te;let o=new Set(t),a=new Set(n),c=n.filter(R=>!o.has(R)).length,l=t.filter(R=>!a.has(R)).length,y=(te=e.spicetify_config)!=null?te:null,u=!!(i&&!y),f=!u&&(i&&y?!Mt(i,y):i!==y),S=[c?`${c} added`:null,l?`${l} removed`:null,f?"Spicetify config changed":null].filter(Boolean),Q=Z(e.metadata.last_sync_datetime),ee=S.length?`${S.join(", ")} since ${Q}`:`Last backup ${Q}`;return u?`${ee} \xB7 Spicetify config not saved yet`:ee}function be(e){return e===1?"1 extension or theme":`${e} extensions and themes`}function Z(e){let t=new Date(e);if(Number.isNaN(t.getTime()))return e;let n=t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),i=new Date,o=new Date(i);return o.setDate(i.getDate()-1),t.toDateString()===i.toDateString()?`today, ${n}`:t.toDateString()===o.toDateString()?`yesterday, ${n}`:`${t.toLocaleDateString(void 0,{month:"short",day:"numeric",year:t.getFullYear()===i.getFullYear()?void 0:"numeric"})}, ${n}`}var ke="[Syncify]";function w(e,t){if(t===void 0){console.debug(ke,e);return}console.debug(ke,e,t)}function we(e,t){if(t===void 0){console.warn(ke,e);return}console.warn(ke,e,t)}function xi(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var Zt="syncify-styles";function wi(){if(document.getElementById(Zt)){w("Another copy of Syncify is running; stopping this one");return}vi();let e=L();_t({topbarButton:Ei(),menuItem:Pi()}),ce(e.entryPoint),Oe(e.shortcut,ve),zt().catch(t=>{we("Startup sync check failed",t)})}function vi(){let e=document.createElement("style");e.id=Zt,e.textContent=ft,document.head.appendChild(e)}function Ei(){let{extensionName:e}=h(),t=new Spicetify.Topbar.Button(e,Be,n=>{w("Topbar button clicked",xe(n)),ve()},!1,!0);return Qt(t),Ii(t),Mi(t),w("Topbar button registered",xe(t)),t}function Qt(e){var n;let t=e;e.element.style.setProperty("-webkit-app-region","no-drag"),(n=t.button)==null||n.style.setProperty("-webkit-app-region","no-drag")}var Xt=".main-actionButtons",Ci=".Root__globalNav, .Root__top-bar",Ni=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function Ii(e){if(typeof MutationObserver=="undefined")return;let t=!1,n=null,i=()=>{t=!1,a();let c=e.element,l=document.querySelector(Xt);!c||!l||l.contains(c)||(l.prepend(c),Ti(e),Qt(e),w("Topbar button re-attached",xe(e)))},o=new MutationObserver(()=>{t||(t=!0,setTimeout(i,250))}),a=()=>{var y;if(n!=null&&n.isConnected)return;let c=document.querySelector(Xt),l=(y=c==null?void 0:c.closest(Ci))!=null?y:c==null?void 0:c.parentElement;if(o.disconnect(),n=l!=null?l:null,!l){o.observe(document.body,{childList:!0,subtree:!0});return}o.observe(l,{childList:!0,subtree:!0});for(let u=l.parentElement;u;u=u.parentElement)o.observe(u,{childList:!0})};i()}function Ti(e){let t=_i(e);if(!t||t.className&&t.className!=="undefined")return;let n=Array.from(document.querySelectorAll(Ni)).find(i=>!e.element.contains(i));n!=null&&n.className&&(t.className=n.className)}function _i(e){return e.button}function Pi(){var e;if(typeof((e=Spicetify.Menu)==null?void 0:e.Item)!="function")return null;try{return new Spicetify.Menu.Item(h().extensionName,!1,()=>ve(),Bi())}catch(t){return we("Failed to create profile menu item",t),null}}function Bi(){return Be.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function Mi(e){Object.assign(window,{SyncifyDebug:{button:e,element:e.element,openModal:ve,inspect:()=>xe(e),clickElement:()=>{var t;return(t=e.element)==null?void 0:t.click()},clickInnerButton:()=>{var t;return(t=e.button)==null?void 0:t.click()},clickCallback:()=>e.onClick(e)}})}function xe(e){var t,n,i,o,a;return{label:e.label,disabled:e.disabled,isRight:e.isRight,hasElement:!!e.element,elementConnected:(t=e.element)==null?void 0:t.isConnected,elementDisabled:(n=e.element)==null?void 0:n.disabled,elementAriaDisabled:(i=e.element)==null?void 0:i.getAttribute("aria-disabled"),elementClass:(o=e.element)==null?void 0:o.className,appRegion:e.element?getComputedStyle(e.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:e.button?getComputedStyle(e.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:e.element?getComputedStyle(e.element).pointerEvents:null,visibility:e.element?getComputedStyle(e.element).visibility:null,display:e.element?getComputedStyle(e.element).display:null,rect:(a=e.element)==null?void 0:a.getBoundingClientRect().toJSON()}}var b=null;function ve(){var t;if(b!=null&&b.container.isConnected){w("Closing modal"),Spicetify.PopupModal.hide();return}w("Opening modal"),(t=b==null?void 0:b.root)==null||t.unmount();let e=document.createElement("div");b={container:e,root:null};try{Spicetify.PopupModal.display({title:h().extensionName,content:e,isLarge:!1})}catch(n){throw we("Failed to open PopupModal",n),n}Ai(e),Di(e)}function Ai(e){requestAnimationFrame(()=>{let t=Ui(e);t==null||t.classList.add("syncify-modal-shell");let n=t==null?void 0:t.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');n&&(n.classList.add("syncify-modal-close"),n.setAttribute("aria-label",`Close ${h().extensionName}`),n.title="Close",n.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function Ui(e){let t=e.parentElement;for(;t&&t!==document.body;){if(t.querySelector(".main-trackCreditsModal-header"))return t;t=t.parentElement}return e.closest('[class*="trackCreditsModal"]')}function Di(e){try{let t=Spicetify.React.createElement(Jt);if(typeof Spicetify.ReactDOM.createRoot=="function"){let n=Spicetify.ReactDOM.createRoot(e);n.render(t),(b==null?void 0:b.container)===e&&(b.root=n),w("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(t,e),w("Modal rendered",{renderer:"render"})}catch(t){throw we("Failed to render modal",t),t}}(function e(){if(!xi()){setTimeout(e,100);return}w("Spicetify APIs ready"),wi()})();})();
