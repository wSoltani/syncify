// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var zs=Object.defineProperty,Fs=Object.defineProperties;var Ws=Object.getOwnPropertyDescriptors;var Lt=Object.getOwnPropertySymbols;var Vi=Object.prototype.hasOwnProperty,Gi=Object.prototype.propertyIsEnumerable;var qi=(e,t,n)=>t in e?zs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,m=(e,t)=>{for(var n in t||(t={}))Vi.call(t,n)&&qi(e,n,t[n]);if(Lt)for(var n of Lt(t))Gi.call(t,n)&&qi(e,n,t[n]);return e},S=(e,t)=>Fs(e,Ws(t));var ke=(e,t)=>{var n={};for(var i in e)Vi.call(e,i)&&t.indexOf(i)<0&&(n[i]=e[i]);if(e!=null&&Lt)for(var i of Lt(e))t.indexOf(i)<0&&Gi.call(e,i)&&(n[i]=e[i]);return n};var at,B,oe,_,st,Z,js,F,p;function Ji(e){({createElement:at,Fragment:B,useCallback:oe,useEffect:_,useLayoutEffect:st,useMemo:Z,useReducer:js,useRef:F,useState:p}=e)}var Xi=`/* Shared values for every part. Colors come from the active Spicetify theme,
   with Spotify's own as fallbacks, so Syncify fits any theme. Every corner is
   a quarter of the side it sits on, like Syncify's pips. */
.syncify-ui {
    --syncify-color-text: var(--spice-text, #fff);
    --syncify-color-muted: var(--spice-subtext, #b3b3b3);
    --syncify-color-accent: var(--spice-button, #1ed760);
    --syncify-color-on-accent: var(--spice-button-text, #000);
    --syncify-color-warning: #f6c343;
    --syncify-color-error: var(--spice-notification-error, #f15e6c);
    --syncify-color-surface: rgba(var(--spice-rgb-text, 255, 255, 255), 0.07);
    --syncify-color-surface-strong: rgba(var(--spice-rgb-text, 255, 255, 255), 0.12);
    --syncify-color-divider: rgba(var(--spice-rgb-text, 255, 255, 255), 0.1);
    --syncify-color-warning-surface: color-mix(in srgb, var(--syncify-color-warning) 10%, transparent);
    --syncify-color-raised: color-mix(in srgb, var(--spice-card, #282828), var(--syncify-color-text) 6%);
    --syncify-color-backdrop: rgba(0, 0, 0, 0.6);

    /* Syncify's kind colors, the same as on the website. */
    --syncify-kind-extension: #6cd1d1;
    --syncify-kind-theme: #efa4c1;
    --syncify-kind-snippet: #d3c48c;
    --syncify-kind-app: #88bcf2;

    --syncify-corner: 0.25;
    --syncify-radius-surface: 10px;

    --syncify-size-control: 36px;
    --syncify-size-control-medium: 32px;
    --syncify-size-control-small: 28px;
    --syncify-size-control-tiny: 24px;
    --syncify-size-tab: 40px;
    --syncify-size-row: 56px;
    --syncify-size-row-single: 44px;
    --syncify-size-check: 18px;
    --syncify-size-pip: 12px;
    --syncify-size-mark: 8px;
    --syncify-size-mark-large: 20px;
    --syncify-size-dot: 4px;
    --syncify-size-icon: 16px;
    --syncify-size-menu: 200px;
    --syncify-line: 1px;
    --syncify-ring: 2px;

    --syncify-space-0: 2px;
    --syncify-space-1: 4px;
    --syncify-space-2: 8px;
    --syncify-space-3: 12px;
    --syncify-space-4: 16px;
    --syncify-space-5: 20px;
    --syncify-space-6: 24px;

    --syncify-text-title: 20px;
    --syncify-text-heading: 18px;
    --syncify-text-body: 14px;
    /* Codes and commands. */
    --syncify-font-mono: ui-monospace, SFMono-Regular, Consolas, monospace;
    --syncify-text-small: 13px;
    --syncify-text-label: 12px;
    --syncify-text-tiny: 11px;

    color: var(--syncify-color-text);
    font-size: var(--syncify-text-body);
    line-height: 1.45;
}

.syncify-ui *,
.syncify-ui *::before,
.syncify-ui *::after {
    box-sizing: border-box;
}

.syncify-ui :focus-visible {
    outline: var(--syncify-ring) solid var(--syncify-color-text);
    outline-offset: var(--syncify-ring);
}

/* Text inside a control is trimmed to its capitals, so centering the box
   centers the capitals and an icon beside them sits on their middle. */
.syncify-cap {
    white-space: nowrap;
}

@supports (text-box: trim-both cap alphabetic) {
    .syncify-cap {
        text-box: trim-both cap alphabetic;
    }
}

/* Read by screen readers, not shown. */
.syncify-visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: pre;
    border: 0;
}
`;var Zi=`.syncify-icon {
    flex: 0 0 auto;
    width: var(--syncify-size-icon);
    height: var(--syncify-size-icon);
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.syncify-icon[data-filled="true"] {
    fill: currentColor;
    stroke: none;
}
`;var Qi=`.syncify-btn,
.syncify-icon-btn {
    --syncify-btn-size: var(--syncify-size-control);

    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    gap: var(--syncify-space-2);
    height: var(--syncify-btn-size);
    margin: 0;
    padding: 0 var(--syncify-space-4);
    border: 0;
    border-radius: calc(var(--syncify-btn-size) * var(--syncify-corner));
    color: var(--syncify-color-on-accent);
    background: var(--syncify-color-accent);
    font: inherit;
    font-weight: 700;
    cursor: pointer;
    transition:
        filter 100ms ease,
        background-color 100ms ease,
        color 100ms ease;
}

.syncify-btn[data-size="small"] {
    --syncify-btn-size: var(--syncify-size-control-small);
    padding: 0 var(--syncify-space-3);
    font-size: var(--syncify-text-small);
}

.syncify-btn[data-size="tiny"] {
    --syncify-btn-size: var(--syncify-size-control-tiny);
    padding: 0 var(--syncify-space-2);
    font-size: var(--syncify-text-label);
}

.syncify-btn[data-variant="secondary"] {
    color: var(--syncify-color-text);
    background: var(--syncify-color-surface-strong);
}

.syncify-btn[data-variant="danger"] {
    color: var(--syncify-color-on-accent);
    background: var(--syncify-color-error);
}

.syncify-btn[data-variant="text"],
.syncify-btn[data-variant="subtle"] {
    padding: 0 var(--syncify-space-2);
    color: var(--syncify-color-text);
    background: transparent;
    font-weight: 600;
}

.syncify-btn[data-variant="subtle"] {
    color: var(--syncify-color-muted);
}

.syncify-btn:is([data-variant="primary"], [data-variant="danger"]):hover:not(:disabled) {
    filter: brightness(1.08);
}

.syncify-btn[data-variant="secondary"]:hover:not(:disabled) {
    background: color-mix(in srgb, var(--syncify-color-surface-strong), var(--syncify-color-text) 8%);
}

.syncify-btn:is([data-variant="text"], [data-variant="subtle"]):hover:not(:disabled),
.syncify-icon-btn:hover:not(:disabled) {
    color: var(--syncify-color-text);
    background: var(--syncify-color-surface);
}

.syncify-icon-btn {
    --syncify-btn-size: var(--syncify-size-control-small);

    width: var(--syncify-btn-size);
    padding: 0;
    color: var(--syncify-color-muted);
    background: transparent;
}

.syncify-btn:disabled,
.syncify-icon-btn:disabled {
    cursor: default;
    opacity: 0.45;
}
`;var eo=`.syncify-switch-control {
    --syncify-switch-width: 32px;
    --syncify-switch-height: 18px;
    --syncify-switch-knob: 12px;
    --syncify-switch-inset: calc((var(--syncify-switch-height) - var(--syncify-switch-knob)) / 2);

    position: relative;
    flex: 0 0 auto;
    width: var(--syncify-switch-width);
    height: var(--syncify-switch-height);
    margin: 0;
    border-radius: calc(var(--syncify-switch-height) * var(--syncify-corner));
    background: var(--syncify-color-surface-strong);
    appearance: none;
    cursor: pointer;
    transition: background-color 150ms ease;
}

.syncify-switch-control::before {
    position: absolute;
    top: var(--syncify-switch-inset);
    left: var(--syncify-switch-inset);
    width: var(--syncify-switch-knob);
    height: var(--syncify-switch-knob);
    border-radius: calc(var(--syncify-switch-knob) * var(--syncify-corner));
    background: var(--syncify-color-muted);
    content: "";
    transition:
        transform 150ms ease,
        background-color 150ms ease;
}

.syncify-switch-control:checked {
    background: var(--syncify-color-accent);
}

.syncify-switch-control:checked::before {
    background: var(--syncify-color-on-accent);
    transform: translateX(
        calc(var(--syncify-switch-width) - var(--syncify-switch-knob) - 2 * var(--syncify-switch-inset))
    );
}

.syncify-switch-control:disabled {
    cursor: default;
    opacity: 0.45;
}
`;var to=`.syncify-checkbox {
    --syncify-checkbox-glyph: 12px;

    position: relative;
    flex: 0 0 auto;
    width: var(--syncify-size-check);
    height: var(--syncify-size-check);
    margin: 0;
    border-radius: calc(var(--syncify-size-check) * var(--syncify-corner));
    box-shadow: inset 0 0 0 var(--syncify-ring) var(--syncify-color-muted);
    appearance: none;
    cursor: pointer;
}

.syncify-checkbox:checked {
    background: var(--syncify-color-accent);
    box-shadow: none;
}

/* The check, drawn in the color that sits on the accent. */
.syncify-checkbox:checked::before {
    position: absolute;
    inset: 0;
    background: var(--syncify-color-on-accent);
    content: "";
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12.5l4.5 4.5L19 7.5'/%3E%3C/svg%3E")
        center / var(--syncify-checkbox-glyph) no-repeat;
}

.syncify-checkbox:disabled {
    cursor: default;
    opacity: 0.45;
}
`;var no=`.syncify-setting-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--syncify-space-4);
    min-height: var(--syncify-size-row-single);
}

label.syncify-setting-row {
    cursor: pointer;
}

label.syncify-setting-row[data-disabled="true"] {
    cursor: default;
}

.syncify-setting-row-text {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-width: 0;
}

.syncify-setting-row-label {
    font-weight: 600;
    overflow-wrap: anywhere;
}

.syncify-setting-row-value {
    color: var(--syncify-color-muted);
    font-size: var(--syncify-text-small);
    overflow-wrap: anywhere;
}

/* Inside a group, the dashed line; solid lines only split sections. */
.syncify-setting-group {
    display: flex;
    flex-direction: column;
}

/* Drawn over the row's edge, so the line doesn't move the row's content. */
.syncify-setting-group > * + * {
    position: relative;
}

.syncify-setting-group > * + *::before {
    position: absolute;
    inset: 0 0 auto;
    border-top: var(--syncify-line) dashed var(--syncify-color-divider);
    content: "";
}
`;var io=`/* Facts on one line, wrapping between facts. Each fact is trimmed to its
   capitals, so the dots sit on their middle; the row gap gives back the
   space the trim takes from a wrapped line. */
.syncify-meta {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    column-gap: var(--syncify-space-2);
    min-width: 0;
    color: var(--syncify-color-muted);
    font-size: var(--syncify-text-small);
}

@supports (text-box: trim-both cap alphabetic) {
    .syncify-meta {
        row-gap: calc(1lh - 1cap);
    }

    .syncify-meta-part {
        text-box: trim-both cap alphabetic;
    }
}

.syncify-dot {
    flex: 0 0 auto;
    width: var(--syncify-size-dot);
    height: var(--syncify-size-dot);
    border-radius: calc(var(--syncify-size-dot) * var(--syncify-corner));
    background: currentColor;
    opacity: 0.7;
}
`;var oo=`.syncify-list {
    display: flex;
    flex-direction: column;
    gap: var(--syncify-space-0);
    margin: 0;
    padding: 0;
    list-style: none;
}

.syncify-list-item {
    display: flex;
    flex-direction: column;
}

.syncify-list-divider {
    margin: var(--syncify-space-1) var(--syncify-space-3);
    border-top: var(--syncify-line) dashed var(--syncify-color-divider);
}

/* A grid: the leading pip shares the name's line, the facts go under the
   name, and the end and the chevron center on the whole row. Parts a row
   doesn't have take no space. */
.syncify-row {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto auto;
    grid-template-rows: auto auto;
    align-content: center;
    align-items: center;
    width: 100%;
    min-height: var(--syncify-size-row);
    margin: 0;
    padding: var(--syncify-space-2) var(--syncify-space-3);
    border: 0;
    border-radius: var(--syncify-radius-surface);
    color: inherit;
    background: none;
    font: inherit;
    text-align: left;
}

.syncify-row[data-lines="1"] {
    grid-template-rows: auto;
    min-height: var(--syncify-size-row-single);
}

button.syncify-row {
    cursor: pointer;
}

button.syncify-row:hover:not(:disabled) {
    background: var(--syncify-color-surface);
}

button.syncify-row:disabled {
    cursor: default;
    opacity: 0.6;
}

.syncify-row-leading {
    display: flex;
    grid-column: 1;
    grid-row: 1;
    align-items: center;
    margin-right: var(--syncify-space-3);
}

.syncify-row-name {
    display: flex;
    grid-column: 2;
    grid-row: 1;
    align-items: center;
    gap: var(--syncify-space-2);
    min-width: 0;
    font-weight: 600;
}

.syncify-row-name-text {
    min-width: 0;
    overflow-wrap: anywhere;
}

/* A mark after the name, and the pip before it, sit on its capitals' middle. */
@supports (text-box: trim-both cap alphabetic) {
    .syncify-row-name {
        padding-block: calc((1lh - 1cap) / 2);
    }

    .syncify-row-name-text {
        text-box: trim-both cap alphabetic;
    }
}

/* A block, so the facts keep a full line's height under the name. */
.syncify-row-meta {
    display: block;
    grid-column: 2;
    grid-row: 2;
    min-width: 0;
}

.syncify-row-end {
    display: flex;
    grid-column: 3;
    grid-row: 1 / -1;
    align-items: center;
    gap: var(--syncify-space-1);
    margin-left: var(--syncify-space-3);
}

.syncify-row-chevron {
    grid-column: 4;
    grid-row: 1 / -1;
    margin-left: var(--syncify-space-3);
    color: var(--syncify-color-muted);
}
`;var ro=`.syncify-field-group {
    display: flex;
    flex-direction: column;
    gap: var(--syncify-space-2);
    min-width: 0;
}

.syncify-field-label {
    align-self: flex-start;
    font-size: var(--syncify-text-small);
    font-weight: 700;
}

.syncify-field-row {
    display: flex;
    align-items: center;
    gap: var(--syncify-space-2);
}

.syncify-input-box {
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    min-width: 0;
    height: var(--syncify-size-control);
    padding: 0 var(--syncify-space-3);
    border-radius: calc(var(--syncify-size-control) * var(--syncify-corner));
    color: var(--syncify-color-muted);
    background: var(--syncify-color-surface);
    cursor: text;
}

.syncify-input-box:focus-within {
    outline: var(--syncify-ring) solid var(--syncify-color-text);
    outline-offset: var(--syncify-ring);
}

.syncify-input-box[data-invalid="true"] {
    box-shadow: inset 0 0 0 var(--syncify-ring) var(--syncify-color-error);
}

.syncify-input-box[data-disabled="true"] {
    cursor: default;
    opacity: 0.6;
}

.syncify-input-control {
    flex: 1 1 auto;
    width: 100%;
    min-width: 0;
    height: 100%;
    margin: 0;
    padding: 0;
    border: 0;
    color: var(--syncify-color-text);
    background: none;
    font: inherit;
}

.syncify-ui .syncify-input-control:focus-visible {
    outline: 0;
}

.syncify-input-control::placeholder {
    color: var(--syncify-color-muted);
    opacity: 1;
}

.syncify-input-control[data-mono="true"]:not(:placeholder-shown) {
    font-family: var(--syncify-font-mono);
    letter-spacing: 0.05em;
}

.syncify-field-error {
    color: var(--syncify-color-error);
    font-size: var(--syncify-text-small);
}
`;var ao=`.syncify-menu {
    position: fixed;
    inset: auto;
    z-index: 1;
    display: flex;
    flex-direction: column;
    /* Grows to fit its longest choice, never wider than the window. */
    width: max-content;
    min-width: var(--syncify-size-menu);
    max-width: calc(100vw - 2 * var(--syncify-space-1));
    margin: 0;
    padding: var(--syncify-space-1);
    border: 0;
    border-radius: var(--syncify-radius-surface);
    color: var(--syncify-color-text);
    background: var(--syncify-color-raised);
    box-shadow: 0 0 0 var(--syncify-line) var(--syncify-color-divider);
}

.syncify-menu-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--syncify-space-2);
    width: 100%;
    height: var(--syncify-size-control);
    margin: 0;
    padding: 0 var(--syncify-space-3);
    border: 0;
    border-radius: calc(var(--syncify-size-control) * var(--syncify-corner));
    color: inherit;
    background: none;
    font: inherit;
    font-weight: 600;
    text-align: left;
    white-space: nowrap;
    cursor: pointer;
}

.syncify-menu-item:hover:not(:disabled),
.syncify-menu-item:focus-visible {
    background: var(--syncify-color-surface);
}

.syncify-ui .syncify-menu-item:focus-visible {
    outline-offset: calc(-1 * var(--syncify-ring));
}

.syncify-menu-item[data-danger="true"] {
    color: var(--syncify-color-error);
}

.syncify-menu-item[aria-checked="true"] .syncify-icon {
    color: var(--syncify-color-accent);
}

.syncify-menu-item:disabled {
    cursor: default;
    opacity: 0.45;
}

/* The button that shows a setting's current choice. */
.syncify-menu-value {
    display: inline-flex;
    flex: 0 1 auto;
    align-items: center;
    gap: var(--syncify-space-2);
    min-width: 0;
    height: var(--syncify-size-control-medium);
    margin: 0;
    padding: 0 var(--syncify-space-3);
    border: 0;
    border-radius: calc(var(--syncify-size-control-medium) * var(--syncify-corner));
    color: var(--syncify-color-text);
    background: var(--syncify-color-surface);
    font: inherit;
    font-size: var(--syncify-text-small);
    font-weight: 600;
    cursor: pointer;
}

.syncify-menu-value:hover:not(:disabled) {
    background: var(--syncify-color-surface-strong);
}

.syncify-menu-value .syncify-icon {
    color: var(--syncify-color-muted);
}

.syncify-menu-value:disabled {
    cursor: default;
    opacity: 0.45;
}
`;var so=`.syncify-meter {
    --syncify-meter-bar-width: 16px;
    --syncify-meter-bar-height: 8px;
    --syncify-meter-bar-gap: 3px;

    display: inline-flex;
    align-items: center;
    gap: var(--syncify-space-3);
    color: var(--syncify-color-muted);
    font-size: var(--syncify-text-small);
    font-weight: 600;
}

.syncify-meter-bars {
    display: flex;
    gap: var(--syncify-meter-bar-gap);
}

.syncify-meter-bar {
    width: var(--syncify-meter-bar-width);
    height: var(--syncify-meter-bar-height);
    border-radius: calc(var(--syncify-meter-bar-height) * var(--syncify-corner));
    background: var(--syncify-color-surface-strong);
}

.syncify-meter-bar[data-used="true"] {
    background: var(--syncify-color-accent);
}

/* Full: the count says so in the warning color. */
.syncify-meter[data-full="true"] {
    color: var(--syncify-color-warning);
}

.syncify-meter[data-full="true"] .syncify-meter-bar[data-used="true"] {
    background: var(--syncify-color-warning);
}
`;var co=`.syncify-mark-square {
    --syncify-mark-size: var(--syncify-size-mark);
    --syncify-mark-color: var(--syncify-color-accent);

    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: var(--syncify-mark-size);
    height: var(--syncify-mark-size);
    border-radius: calc(var(--syncify-mark-size) * var(--syncify-corner));
    color: var(--syncify-color-on-accent);
    background: var(--syncify-mark-color);
}

.syncify-mark-square[data-size="large"] {
    --syncify-mark-size: var(--syncify-size-mark-large);
}

.syncify-mark-square[data-tone="warning"] {
    --syncify-mark-color: var(--syncify-color-warning);
}

.syncify-mark-square[data-tone="error"] {
    --syncify-mark-color: var(--syncify-color-error);
}

.syncify-mark-square .syncify-icon {
    --syncify-size-icon: calc(var(--syncify-mark-size) * 0.7);

    stroke-width: 3;
}

.syncify-badge {
    --syncify-badge-size: var(--syncify-size-check);

    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    min-width: var(--syncify-badge-size);
    height: var(--syncify-badge-size);
    padding: 0 var(--syncify-space-1);
    border-radius: calc(var(--syncify-badge-size) * var(--syncify-corner));
    color: var(--syncify-color-text);
    background: var(--syncify-color-surface-strong);
    font-size: var(--syncify-text-tiny);
    font-weight: 700;
}
`;var lo=`.syncify-notice {
    display: flex;
    align-items: center;
    gap: var(--syncify-space-3);
    padding: var(--syncify-space-3) var(--syncify-space-3) var(--syncify-space-3) var(--syncify-space-4);
    border-radius: var(--syncify-radius-surface);
    background: var(--syncify-color-surface);
}

.syncify-notice[data-tone="warning"] {
    background: var(--syncify-color-warning-surface);
}

/* The mark sits on the first line's capitals, however many lines follow. */
.syncify-notice-body {
    display: flex;
    flex: 1 1 auto;
    align-items: flex-start;
    gap: var(--syncify-space-3);
    min-width: 0;
}

.syncify-notice-mark {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    height: 1lh;
}

.syncify-notice-text {
    flex: 1 1 auto;
    min-width: 0;
    overflow-wrap: anywhere;
}

@supports (text-box: trim-both cap alphabetic) {
    .syncify-notice-mark {
        height: 1cap;
    }

    .syncify-notice-text {
        text-box: trim-both cap alphabetic;
    }
}

.syncify-notice-actions {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: var(--syncify-space-2);
}
`;var uo=`.syncify-dialog {
    --syncify-dialog-width: 420px;

    width: min(var(--syncify-dialog-width), 100% - 2 * var(--syncify-space-4));
    margin: auto;
    padding: var(--syncify-space-6);
    border: 0;
    border-radius: var(--syncify-radius-surface);
    color: var(--syncify-color-text);
    background: var(--syncify-color-raised);
}

.syncify-dialog::backdrop {
    background: var(--syncify-color-backdrop);
}

.syncify-dialog-content {
    display: flex;
    flex-direction: column;
    gap: var(--syncify-space-4);
}

.syncify-dialog-title {
    margin: 0;
    font-size: var(--syncify-text-heading);
    font-weight: 700;
    line-height: 1.25;
    overflow-wrap: anywhere;
}

.syncify-dialog-text {
    display: flex;
    flex-direction: column;
    gap: var(--syncify-space-2);
}

.syncify-dialog-text p {
    margin: 0;
}

.syncify-dialog-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: var(--syncify-space-2);
}
`;var yo=`.syncify-tabs {
    display: flex;
    gap: var(--syncify-space-1);
    box-shadow: inset 0 calc(-1 * var(--syncify-line)) 0 var(--syncify-color-divider);
}

/* The open tab's bar is drawn over its bottom edge, so it doesn't move the
   label off center. */
.syncify-tab {
    --syncify-tab-bar: var(--syncify-ring);

    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    gap: var(--syncify-space-2);
    height: var(--syncify-size-tab);
    margin: 0;
    padding: 0 var(--syncify-space-3);
    border: 0;
    color: var(--syncify-color-muted);
    background: none;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
}

.syncify-tab:hover {
    color: var(--syncify-color-text);
}

.syncify-tab[aria-selected="true"] {
    color: var(--syncify-color-text);
    box-shadow: inset 0 calc(-1 * var(--syncify-tab-bar)) 0 var(--syncify-color-accent);
}

.syncify-tab .syncify-icon {
    color: var(--syncify-color-accent);
    stroke-width: 3;
}

/* Fills the window's height left under the tabs. The scroll area is padded
   by the focus ring's reach, so a focused row's ring is never cut off. */
.syncify-tab-panel {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-height: 0;
}

.syncify-tab-scroll {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: var(--syncify-space-3);
    min-height: 0;
    margin: 0 calc(-1 * var(--syncify-space-1));
    padding: var(--syncify-space-3) var(--syncify-space-1);
    overflow-y: auto;
}

.syncify-ui .syncify-tab-scroll:focus-visible {
    outline-offset: calc(-1 * var(--syncify-ring));
}

.syncify-tab-actions {
    display: flex;
    flex: 0 0 auto;
    justify-content: flex-end;
    gap: var(--syncify-space-2);
    padding-top: var(--syncify-space-3);
}
`;var fo=`.syncify-pip-square {
    flex: 0 0 auto;
    width: var(--syncify-size-pip);
    height: var(--syncify-size-pip);
    border-radius: calc(var(--syncify-size-pip) * var(--syncify-corner));
    background: var(--syncify-kind-extension);
}

.syncify-pip-square[data-kind="theme"] {
    background: var(--syncify-kind-theme);
}

.syncify-pip-square[data-kind="snippet"] {
    background: var(--syncify-kind-snippet);
}

.syncify-pip-square[data-kind="app"] {
    background: var(--syncify-kind-app);
}
`;var po=`.syncify-section-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--syncify-space-3);
    min-height: var(--syncify-size-control-small);
}

.syncify-section-label-title {
    margin: 0;
    color: var(--syncify-color-muted);
    font-size: var(--syncify-text-label);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

/* Focus moves here when a view opens in place; it isn't a control. */
.syncify-ui .syncify-section-label-title:focus-visible {
    outline: none;
}
`;var mo=`.syncify-keycap {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    height: var(--syncify-size-control-medium);
    margin: 0;
    padding: 0 var(--syncify-space-3);
    border: 0;
    border-radius: calc(var(--syncify-size-control-medium) * var(--syncify-corner));
    color: var(--syncify-color-text);
    background: var(--syncify-color-surface);
    font: inherit;
    font-size: var(--syncify-text-small);
    font-weight: 700;
    cursor: pointer;
}

.syncify-keycap:hover {
    background: var(--syncify-color-surface-strong);
}

.syncify-keycap[data-recording="true"] {
    color: var(--syncify-color-accent);
    box-shadow: inset 0 0 0 var(--syncify-line) var(--syncify-color-accent);
}
`;var go=`/* A bar as tall as the capitals of the text it stands in for. */
.syncify-skeleton {
    display: block;
    width: 30%;
    height: 1cap;
    border-radius: calc(1cap * var(--syncify-corner));
    background: var(--syncify-color-surface-strong);
}

/* The meta line isn't trimmed like the name, so its bar keeps the line's height. */
.syncify-skeleton[data-width="meta"] {
    width: 50%;
    margin-block: calc((1lh - 1cap) / 2);
    font-size: var(--syncify-text-small);
}
`;var ho=[Xi,Zi,Qi,eo,to,no,io,oo,ro,ao,so,co,lo,uo,yo,fo,po,mo,go].join(`
`);var bo=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
   Spotify modal can size naturally instead of being forced/cropped. */
.syncify-modal-shell .main-trackCreditsModal-header,
.main-trackCreditsModal-header:has(+ * :is(.syncify-panel, .syncify-window)),
.main-trackCreditsModal-header:has(~ * :is(.syncify-panel, .syncify-window)) {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 12px !important;
    padding: 16px 20px 8px !important;
}

.syncify-modal-shell .main-trackCreditsModal-header h1,
.main-trackCreditsModal-header:has(+ * :is(.syncify-panel, .syncify-window)) h1,
.main-trackCreditsModal-header:has(~ * :is(.syncify-panel, .syncify-window)) h1 {
    margin: 0 !important;
    font-size: 18px !important;
    line-height: 1.25 !important;
}

/* The mark before the title. */
.syncify-modal-shell .main-trackCreditsModal-header h1 {
    display: flex !important;
    align-items: center !important;
    gap: 10px !important;
}

.syncify-modal-mark {
    display: inline-flex;
    flex: 0 0 auto;
}

.syncify-modal-shell .main-trackCreditsModal-mainSection,
.syncify-modal-shell .main-trackCreditsModal-content,
.main-trackCreditsModal-mainSection:has(.syncify-panel),
.main-trackCreditsModal-content:has(.syncify-panel) {
    /* The window reads these to fit inside without the shell scrolling. */
    --syncify-shell-height: calc(100vh - 140px);
    --syncify-shell-padding-top: 10px;
    --syncify-shell-padding-bottom: 18px;

    box-sizing: border-box !important;
    max-height: var(--syncify-shell-height) !important;
    padding: var(--syncify-shell-padding-top) 20px var(--syncify-shell-padding-bottom) !important;
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
    /* A tall window reaches up under Spotify's title bar, which drags the
       window and takes the clicks. */
    -webkit-app-region: no-drag !important;
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

@media (max-width: 560px) {
    .syncify-modal-shell .main-trackCreditsModal-mainSection,
    .syncify-modal-shell .main-trackCreditsModal-content,
    .main-trackCreditsModal-mainSection:has(.syncify-panel),
    .main-trackCreditsModal-content:has(.syncify-panel) {
        --syncify-shell-height: calc(100vh - 110px);
        --syncify-shell-padding-bottom: 14px;

        padding: var(--syncify-shell-padding-top) 14px var(--syncify-shell-padding-bottom) !important;
    }
}
`;var ko=`/* The window fits the height Spotify's popup leaves it, so the status and
   tabs stay put and only the open tab scrolls. Without the popup's sizes it
   grows with its content and the popup scrolls instead. */
.syncify-window {
    display: flex;
    flex-direction: column;
    gap: var(--syncify-space-4);
    width: 100%;
    min-width: 0;
    max-height: calc(
        var(--syncify-shell-height) - var(--syncify-shell-padding-top) - var(--syncify-shell-padding-bottom)
    );
}

.syncify-window-top {
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: var(--syncify-space-5);
}

/* Status */

.syncify-status {
    display: flex;
    flex-direction: column;
    gap: var(--syncify-space-3);
}

.syncify-status-main {
    display: flex;
    align-items: center;
    gap: var(--syncify-space-4);
}

.syncify-status-text {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: var(--syncify-space-2);
    min-width: 0;
}

.syncify-status-title {
    margin: 0;
    font-size: var(--syncify-text-title);
    font-weight: 700;
    line-height: 1.25;
    overflow-wrap: anywhere;
}

.syncify-status-sentence {
    margin: 0;
}

.syncify-status-ask {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--syncify-space-1) var(--syncify-space-2);
    margin: 0;
    color: var(--syncify-color-muted);
    font-size: var(--syncify-text-small);
}

/* An alert that needs an answer takes the status's place. Its mark sits on
   the title's capitals, however many lines follow. */
.syncify-status-alert {
    display: flex;
    align-items: flex-start;
    gap: var(--syncify-space-3);
    padding: var(--syncify-space-4);
    border-radius: var(--syncify-radius-surface);
    background: var(--syncify-color-warning-surface);
}

.syncify-status-alert .syncify-status-title {
    font-size: var(--syncify-text-heading);
}

.syncify-status-alert-mark {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    height: 1lh;
    font-size: var(--syncify-text-heading);
    line-height: 1.25;
}

@supports (text-box: trim-both cap alphabetic) {
    .syncify-status-alert-mark {
        height: 1cap;
    }

    .syncify-status-alert .syncify-status-title,
    .syncify-status-alert .syncify-status-sentence {
        text-box: trim-both cap alphabetic;
    }

    .syncify-status-alert .syncify-status-text {
        gap: calc(1lh - 1cap);
    }
}

.syncify-status-alert > .syncify-btn,
.syncify-status-answers {
    flex: 0 0 auto;
    align-self: center;
}

.syncify-status-answers {
    display: flex;
    gap: var(--syncify-space-2);
}

/* The status in one line under an alert. */
.syncify-status-line {
    display: flex;
    align-items: center;
    gap: var(--syncify-space-2);
    min-height: var(--syncify-size-control-small);
}

.syncify-status-line > .syncify-btn {
    margin-left: auto;
}

.syncify-status-check {
    color: var(--syncify-color-accent);
    stroke-width: 3;
}

/* Tabs */

.syncify-tab-text {
    margin: 0;
}

.syncify-commands {
    margin: var(--syncify-space-2) 0 0;
    padding: var(--syncify-space-2) var(--syncify-space-3);
    border-radius: calc(var(--syncify-size-control) * var(--syncify-corner));
    background: var(--syncify-color-surface);
    font-family: var(--syncify-font-mono);
    font-size: var(--syncify-text-small);
    white-space: pre-wrap;
    overflow-wrap: anywhere;
}

/* Footer */

.syncify-window-footer {
    display: flex;
    flex: 0 0 auto;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--syncify-space-2) var(--syncify-space-4);
    padding-top: var(--syncify-space-3);
    border-top: var(--syncify-line) solid var(--syncify-color-divider);
    color: var(--syncify-color-muted);
    font-size: var(--syncify-text-label);
}

.syncify-window-footer-version,
.syncify-window-footer-links {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--syncify-space-1);
}

.syncify-window-footer-version {
    gap: var(--syncify-space-3);
}

.syncify-ui .syncify-window-update {
    color: var(--syncify-color-accent);
    font-weight: 700;
}

/* The Account tab's check, centered on its label's capitals. */
.syncify-tab-check {
    display: inline-flex;
}
`;var So=`/* The safety copy's shield, after its name. */
.syncify-safety-mark {
    color: var(--syncify-color-accent);
}

/* "Current", where an older backup has its chevron. */
.syncify-row-status {
    color: var(--syncify-color-accent);
    font-size: var(--syncify-text-small);
    font-weight: 700;
}
`;var wo=`/* Adds, Updates and Removes: plain colored text, not chips. */
.syncify-change-label {
    color: var(--syncify-color-muted);
    font-size: var(--syncify-text-small);
    font-weight: 700;
}

.syncify-change-label[data-change="Adds"] {
    color: var(--syncify-color-accent);
}

.syncify-change-label[data-change="Updates"] {
    color: var(--syncify-kind-app);
}

.syncify-change-label[data-change="Removes"] {
    color: var(--syncify-color-error);
}

.syncify-change-label + .syncify-checkbox {
    margin-left: var(--syncify-space-2);
}

.syncify-change-fold {
    color: var(--syncify-color-muted);
    font-weight: 400;
}
`;var vo=`/* Loading a setup, the picks and your codes, split by dashed lines. */
.syncify-share-part {
    display: flex;
    flex-direction: column;
    gap: var(--syncify-space-3);
}

.syncify-share-part + .syncify-share-part {
    padding-top: var(--syncify-space-4);
    border-top: var(--syncify-line) dashed var(--syncify-color-divider);
}

/* A share code, in the code font. */
.syncify-share-code {
    font-family: var(--syncify-font-mono);
    font-size: inherit;
}

/* "3 new hearts", after Your codes: plain accent text, not a chip. */
.syncify-share-hearts {
    margin-left: var(--syncify-space-2);
    color: var(--syncify-color-accent);
    letter-spacing: normal;
    text-transform: none;
}

.syncify-share-code-actions {
    display: inline-flex;
    align-items: center;
    gap: var(--syncify-space-1);
}

.syncify-share-create {
    display: flex;
}

/* A pick's items as kind squares, as on the website's cards. */
.syncify-share-pips {
    display: inline-flex;
    align-items: center;
    gap: var(--syncify-space-0);
}

.syncify-share-left-out {
    display: block;
    margin-top: var(--syncify-space-1);
}
`;var xo=`/* Colors come from the active Spicetify theme, with Spotify's defaults as
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

/* The claim notice shown when Spotify starts */

.syncify-claim-notice {
    margin: 0;
}

.syncify-muted {
    margin: 0;
    color: var(--syncify-muted);
    font-size: 13px;
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

.syncify-confirm > .syncify-disclosure {
    align-self: flex-start;
}

/* Account */

.syncify-field {
    display: flex;
    align-items: center;
    gap: 8px;
}

.syncify-input {
    flex: 1 1 auto;
    min-width: 0;
    padding: 8px 10px;
    border: 0;
    border-radius: 4px;
    color: var(--syncify-text);
    background: var(--syncify-surface-hover);
    font: inherit;
    font-size: 14px;
}

.syncify-input::placeholder {
    color: var(--syncify-muted);
    opacity: 1;
}

.syncify-code-input {
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    letter-spacing: 0.3em;
}

.syncify-account-links {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.syncify-account-email {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.syncify-account-state {
    display: inline-flex;
    align-items: center;
    gap: 6px;
}

.syncify-clock,
.syncify-external {
    flex: 0 0 auto;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.syncify-clock {
    width: 14px;
    height: 14px;
}

.syncify-external {
    width: 12px;
    height: 12px;
}

.syncify-account-actions {
    display: flex;
    flex: 0 0 auto;
    flex-wrap: wrap;
    gap: 16px;
}

.syncify-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
}

.syncify-text-button[data-danger="true"],
.syncify-text-button[data-danger="true"]:hover:not(:disabled) {
    color: var(--syncify-error);
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

.syncify-text-button:disabled {
    cursor: default;
    opacity: 0.6;
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

/* Selects draw their own chevron, away from the edge. */
.syncify-select-field {
    position: relative;
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    max-width: 55%;
    min-width: 0;
}

.syncify-select-field .syncify-chevron {
    position: absolute;
    right: 10px;
    width: 14px;
    height: 14px;
    color: var(--syncify-muted);
    transform: rotate(90deg);
    pointer-events: none;
}

.syncify-select {
    max-width: 100%;
    padding: 6px 32px 6px 10px;
    appearance: none;
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

@media (max-width: 560px) {
    .syncify-setting {
        align-items: stretch;
        flex-direction: column;
        gap: 10px;
    }

    .syncify-select {
        max-width: none;
    }
}
`;var Co=[ho,bo,ko,wo,So,vo,xo].join(`
`);var Nn=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var Io=`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="-2.5 -2.5 37 37" aria-hidden="true" focusable="false"><defs><mask id="syncify-mark-gap" maskUnits="userSpaceOnUse" x="-2" y="-2" width="36" height="36"><rect x="-2" y="-2" width="36" height="36" fill="#fff"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></mask></defs><g mask="url(#syncify-mark-gap)"><g transform="rotate(15 16 16)"><path d="M16 16L16 7.4A8.6 8.6 0 0 1 24.6 16Z" fill="#6cd1d1" transform="translate(0.42 -0.42)"/><path d="M16 16L24.6 16A8.6 8.6 0 0 1 16 24.6Z" fill="#efa4c1" transform="translate(0.42 0.42)"/><path d="M16 16L16 24.6A8.6 8.6 0 0 1 7.4 16Z" fill="#d3c48c" transform="translate(-0.42 0.42)"/><path d="M16 16L7.4 16A8.6 8.6 0 0 1 16 7.4Z" fill="#88bcf2" transform="translate(-0.42 -0.42)"/></g></g><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 28.03A12.4 12.4 0 1 1 28.03 19"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91"/></g></svg>
`;var kc="syncify",ze="state";function Rn(){let e;try{e=window.indexedDB}catch(t){return Promise.resolve(null)}return e?new Promise(t=>{let n;try{n=e.open(kc,1)}catch(i){t(null);return}n.onupgradeneeded=()=>{n.result.createObjectStore(ze)},n.onerror=()=>t(null),n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}function Pn(e,t){let n=Rn().then(i=>new Promise((o,a)=>{if(!i){a(new Error("IndexedDB isn't available."));return}try{let s=i.transaction(ze,e),c=t(s.objectStore(ze));s.oncomplete=()=>{i.close(),o(c.result)},s.onerror=s.onabort=()=>{var l;i.close(),a((l=s.error)!=null?l:new Error("IndexedDB failed."))}}catch(s){i.close(),a(s)}}));return Promise.race([n,new Promise((i,o)=>setTimeout(()=>o(new Error("IndexedDB took too long.")),2e3))])}function Fe(e){return Pn("readonly",t=>t.get(e))}async function We(e,t){await Pn("readwrite",n=>n.put(t,e))}async function Eo(e){await Pn("readwrite",t=>t.delete(e))}var fe={extensionName:"Syncify",version:"1.17.1",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",discordUrl:"https://syncify.wsoltani.com/discord",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com",shareUrl:"https://syncs.wsoltani.com"};function $(){var t,n,i,o,a,s,c,l,d,u;let e=window.SyncifyConfig;return{extensionName:(t=Se(e==null?void 0:e.extensionName))!=null?t:fe.extensionName,version:(n=No(e==null?void 0:e.version))!=null?n:fe.version,workerUrl:(i=Se(e==null?void 0:e.workerUrl))!=null?i:fe.workerUrl,webUrl:(o=Se(e==null?void 0:e.webUrl))!=null?o:fe.webUrl,githubUrl:(a=Se(e==null?void 0:e.githubUrl))!=null?a:fe.githubUrl,kofiUrl:(s=Se(e==null?void 0:e.kofiUrl))!=null?s:fe.kofiUrl,discordUrl:(c=Se(e==null?void 0:e.discordUrl))!=null?c:fe.discordUrl,issueUrl:(l=Se(e==null?void 0:e.issueUrl))!=null?l:fe.issueUrl,releasesUrl:(d=Se(e==null?void 0:e.releasesUrl))!=null?d:fe.releasesUrl,shareUrl:(u=Se(e==null?void 0:e.shareUrl))!=null?u:fe.shareUrl}}function Se(e){return No(e)}function No(e){return typeof e=="string"&&e.trim()?e.trim():null}var Sc="x-syncify-version",wc="x-syncify-install",vc="x-syncify-timezone",Ro="install-id",Po="syncify:install-id",xc=2e3,Bt=null;async function To(){let e={[Sc]:$().version,[wc]:(await Tn()).id},t=Ec();return t&&(e[vc]=t),e}function Tn(){return Bt!=null||(Bt=Cc().catch(()=>({id:Dt(),inDatabase:!1}))),Bt}async function Cc(){let e=await Promise.race([Ic(),new Promise(t=>setTimeout(()=>t(null),xc))]);if(e)return{id:e,inDatabase:!0};try{let t=window.localStorage.getItem(Po);if(t&&_o(t))return{id:t,inDatabase:!1};let n=Dt();return window.localStorage.setItem(Po,n),{id:n,inDatabase:!1}}catch(t){return{id:Dt(),inDatabase:!1}}}async function Ic(){let e=await Rn();return e?new Promise(t=>{let n=null;try{let i=e.transaction(ze,"readwrite"),o=i.objectStore(ze),a=o.get(Ro);a.onsuccess=()=>{if(typeof a.result=="string"&&_o(a.result)){n=a.result;return}n=Dt(),o.put(n,Ro)},i.oncomplete=()=>{e.close(),t(n)},i.onerror=i.onabort=()=>{e.close(),t(null)}}catch(i){e.close(),t(null)}}):null}function Dt(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t=[...e].map(n=>n.toString(16).padStart(2,"0"));return[t.slice(0,4).join(""),t.slice(4,6).join(""),t.slice(6,8).join(""),t.slice(8,10).join(""),t.slice(10).join("")].join("-")}function _o(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(e)}function Ec(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(e){return null}}var Nc="syncify-signature-v1",Rc={name:"ECDSA",hash:"SHA-256"};function Ot(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function Ut(e){return _n(new Uint8Array(await crypto.subtle.exportKey("raw",e)))}async function ct(e,t,n,i,o){let a=await Pc(t,n,i,o),s=await crypto.subtle.sign(Rc,e,a);return _n(new Uint8Array(s))}async function Pc(e,t,n,i){let{pathname:o,search:a}=new URL(n),s=new TextEncoder,c=_n(new Uint8Array(await crypto.subtle.digest("SHA-256",s.encode(i))));return s.encode([Nc,e,t.toUpperCase(),o+a,c].join(`
`))}function _n(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var Ao="device-key",An="session",Mo="salt",Ne=null,lt,Lo={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function je(e){if(Ne)return Ne;let t=await Fe(Ao);return Tc(t)?(Ne=Promise.resolve(t),t):e?(Ne=Ot().then(async n=>(await We(Ao,n),n)),Ne.catch(()=>{Ne=null}),Ne):null}async function ae(){let e=await Fe(An);return _c(e)?e:null}function Mn(e){return We(An,e)}async function Re(){await Eo(An).catch(()=>{})}async function Ht(){if(lt===void 0){let e=await Fe(Mo).catch(()=>{});lt=typeof e=="string"?e:null}return lt}async function $t(e){e!==lt&&(lt=e,await We(Mo,e).catch(()=>{}))}function Kt(){return Lo}function Bo(e){Lo=e}function Tc(e){let t=e;return!!(t&&t.privateKey instanceof CryptoKey&&t.publicKey instanceof CryptoKey)}function _c(e){let t=e;return!!(t&&typeof t.token=="string"&&t.token&&typeof t.email=="string")}var Do="install-key",Ye=null;function Oo(){return Ye!=null||(Ye=Ac()),Ye.catch(()=>{Ye=null}),Ye.catch(()=>null)}async function Ac(){if(!(await Tn()).inDatabase)return null;let e=await Fe(Do),t=Lc(e)?e:await Mc();return{privateKey:t.privateKey,publicKey:await Ut(t.publicKey)}}async function Mc(){let e=await Ot();return await We(Do,e),e}function Lc(e){let t=e;return!!(t&&t.privateKey instanceof CryptoKey&&t.publicKey instanceof CryptoKey)}var Bc="/api/auth/email-otp/send-verification-otp",Dc="/api/auth/sign-in/email-otp",Oc="/api/auth/get-session",Uc="/api/auth/sign-out",Hc="/api/auth/link",$c="x-syncify-device-key",Kc="x-syncify-signature",Uo="x-syncify-salt",zc="none",Fc={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again.",link_failed:"Couldn't open the website. Try again."},A=class extends Error{constructor(n,i=null,o=null){var a;super((a=Fc[n])!=null?a:"Sign-in failed. Try again.");this.code=n;this.retryAfter=i;this.share=o;this.name="AccountError"}};function Pe(e){return e instanceof A?e.message:"Sign-in failed. Try again."}async function Ho(e,t={}){let n=await dt(Bc,{method:"POST",body:JSON.stringify(m({email:e,type:"sign-in"},t.nudge?{nudge:!0}:{}))});return typeof(n==null?void 0:n.resend_in)=="number"?n.resend_in:60}async function $o(e,t){var a;let n=await je(!0).catch(()=>{throw new A("no_device_key")}),i=await dt(Dc,{method:"POST",body:JSON.stringify({email:e,otp:t}),keys:n,sendPublicKey:!0});if(typeof(i==null?void 0:i.token)!="string"||!i.token)throw new A("sign_in_failed");let o={token:i.token,email:typeof((a=i.user)==null?void 0:a.email)=="string"?i.user.email:e};return await Mn(o).catch(()=>{throw new A("no_device_key")}),Ln=!0,o}var Ln=!1;async function Ko(){var t;let e=await ae();if(!e||Ln)return e;try{let n=await zt(e,Oc,"GET");Ln=!0;let i=(t=n==null?void 0:n.user)==null?void 0:t.email;if(typeof i!="string"||i===e.email)return e;let o=S(m({},e),{email:i});return await Mn(o).catch(()=>{}),o}catch(n){if(n instanceof A&&n.code==="signed_out")return null;throw n}}async function zo(){let e=await ae().catch(()=>null);e&&await zt(e,Uc,"POST").catch(()=>{}),await Re()}async function Fo(){let e=await ae();if(!e)throw new A("signed_out");let t=await zt(e,Hc,"POST"),n=typeof(t==null?void 0:t.url)=="string"?t.url:"",i=new URL($().webUrl).origin;if(!n.startsWith(`${i}/link#`))throw new A("link_failed");return n}async function ut(e,t,n){let i=await ae();if(!i)throw new A("signed_out");return zt(i,e,t,n)}async function Wo(e,t,n){let i=await ae().catch(()=>null),o=i?await je(!1).catch(()=>null):null;await dt(e,m({method:"POST",body:JSON.stringify(t),headers:n,keepalive:!0},i&&o?{token:i.token,keys:o}:{}))}async function zt(e,t,n,i){let o=await je(!1);if(!o)throw await Re(),new A("signed_out");return dt(t,m({method:n,token:e.token,keys:o},i===void 0?{}:{body:JSON.stringify(i)}))}async function dt(e,t,n=!1){var f,g,w;let i=`${$().webUrl.replace(/\/+$/,"")}${e}`,o=m({},t.headers);if(t.body!==void 0&&(o["content-type"]="application/json"),t.token&&(o.authorization=`Bearer ${t.token}`),t.keys){let v=(f=await Ht())!=null?f:zc;o[Uo]=v,o[Kc]=await ct(t.keys.privateKey,v,t.method,i,(g=t.body)!=null?g:""),t.sendPublicKey&&(o[$c]=await Ut(t.keys.publicKey))}let a;try{a=await fetch(i,{method:t.method,headers:o,body:t.body,keepalive:t.keepalive})}catch(v){throw new A("offline")}let s=a.headers.get(Uo);s&&await $t(s);let c=await a.json().catch(()=>null);if(a.ok)return c;let l=typeof(c==null?void 0:c.code)=="string"?c.code:a.status===503?"unavailable":"failed";if(l==="stale_salt"&&t.keys&&!n)return dt(e,t,!0);l==="signed_out"&&await Re();let d=Number(a.headers.get("retry-after")),u=c==null?void 0:c.share;throw new A(l,Number.isFinite(d)&&d>0?d:(w=Wc[l])!=null?w:null,typeof(u==null?void 0:u.code)=="string"?{code:u.code,link:typeof u.link=="string"?u.link:null}:null)}var Wc={resend_wait:60,too_many_requests:60,send_failed:60};var jc="x-syncify-user-hash",Yc="x-syncify-identity",qc="x-syncify-signature",Vc="x-syncify-install-key",Gc="x-syncify-install-signature",Bn="x-syncify-salt",Jc="none",Xc="/restores",Zc="/installs",Qc="hash",jo=3,yt=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}},se=class extends Error{constructor(n){super(n==="not_linked"?"Couldn't read that Spotify account's backups.":"Sign in to restore this backup.");this.code=n;this.name="LockedError"}},Te=class extends Error{constructor(){super("This Spotify account doesn't accept backups from this install. Sign in to back up."),this.name="InstallRefusedError"}};async function qo(e,t,n){var a;let i=await Ce(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(n)});if(i.status===403&&((a=await i.json().catch(()=>null))==null?void 0:a.code)==="install_refused")throw new Te;if(!i.ok)throw new Error(`Backup failed with HTTP ${i.status}.`);let o=await i.json().catch(()=>null);return{unchanged:(o==null?void 0:o.unchanged)===!0,unapproved:(o==null?void 0:o.quarantined)===!0}}async function Vo(e,t,n,i){let o=await Ce(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({install:n,action:i})},Zc);if(o.ok)return;let a=await o.json().catch(()=>null);if((a==null?void 0:a.code)!=="not_pending")throw new Error(`Couldn't answer with HTTP ${o.status}.`)}async function Dn(e,t,n){var w,v,h,k;let i=await Ce(e,t,{method:"GET"},Jo("/",n));if(i.status===404){let b=await i.json().catch(()=>null);return{exists:!1,payload:null,backups:[],safetyCopy:null,claim:ft(b==null?void 0:b.claim),unapproved:[],install:Yo(b==null?void 0:b.install),nudge:!1}}if(!i.ok)throw new Error(`Restore failed with HTTP ${i.status}.`);let o=await i.json(),a=ft(o.claim),s=Yo(o.install),c=o.nudge===!0;delete o.claim,delete o.install,delete o.nudge;let l=[o,...(w=o.backup_history)!=null?w:[]];if(!l.every(b=>b.backup))return{exists:!0,payload:o,backups:l.slice(0,jo),safetyCopy:(v=l[jo])!=null?v:null,claim:a,unapproved:[],install:s,nudge:c};let d=l.filter(b=>{var I;return((I=b.backup)==null?void 0:I.kind)==="rolling"}),u=(h=l.find(b=>{var I;return((I=b.backup)==null?void 0:I.kind)==="anchor"}))!=null?h:null,f=l.filter(b=>{var I;return((I=b.backup)==null?void 0:I.kind)==="quarantined"}),g=(k=d[0])!=null?k:u;return g?d.length===0&&u?{exists:!0,payload:g,backups:[u],safetyCopy:null,claim:a,unapproved:f,install:s,nudge:c}:{exists:!0,payload:g,backups:d,safetyCopy:u,claim:a,unapproved:f,install:s,nudge:c}:{exists:!1,payload:null,backups:[],safetyCopy:null,claim:a,unapproved:f,install:s,nudge:c}}async function Go(e,t,n,i){try{await Ce(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:n}),keepalive:!0},Jo(Xc,i))}catch(o){}}async function Ce(e,t,n,i="",o=!1){var h,k,b,I,H;let a=i?`${e.replace(/\/+$/,"")}${i}`:e,s=(h=n.method)!=null?h:"GET",c=await ae().catch(()=>null),l=c?await je(!1).catch(()=>null):null,d=await Oo(),u={},f=(k=await Ht())!=null?k:Jc;c&&l&&(u.authorization=`Bearer ${c.token}`,u[Bn]=f,u[qc]=await ct(l.privateKey,f,s,a,(b=n.body)!=null?b:"")),d&&(u[Bn]=f,u[Vc]=d.publicKey,u[Gc]=await ct(d.privateKey,f,s,a,(I=n.body)!=null?I:""));let g=await fetch(a,S(m({},n),{headers:m(S(m(m({},n.headers),await To()),{[jc]:t.hash,[Yc]:t.field}),u)})),w=g.headers.get(Bn);if(w&&await $t(w),g.status===426)throw new yt;if(g.status!==401)return g;let v=(H=await g.clone().json().catch(()=>null))==null?void 0:H.code;if(!o){if(v==="stale_salt"&&(c||d))return Ce(e,t,n,i,!0);if(v==="signed_out"&&c)return await Re(),Ce(e,t,n,i,!0)}throw v==="claimed"||v==="not_owner"||v==="not_linked"?new se(v):(v==="signed_out"&&await Re(),new A(typeof v=="string"?v:"failed"))}function Jo(e,t){return t?`${e}?${Qc}=${encodeURIComponent(t)}`:e}function Yo(e){let t=e;if(!t||typeof t.trust!="string")return null;let n=Array.isArray(t.waiting)?t.waiting:[];return{trusted:t.trust!=="pending"&&t.trust!=="rejected",refused:t.trust==="rejected",waiting:n.flatMap(i=>{let o=i;return o&&typeof o.id=="string"&&typeof o.first_seen_at=="number"?[{id:o.id,device:typeof o.device=="string"?o.device:null,first_seen_at:o.first_seen_at}]:[]})}}function ft(e){let t=e;return!t||typeof t.mine!="boolean"?null:t.status==="final"?{status:"final",mine:t.mine}:t.status==="undone"?typeof t.undone_at=="number"?{status:"undone",mine:!1,email:typeof t.email=="string"?t.email:null,undone_at:t.undone_at}:null:t.status!=="pending"||typeof t.final_at!="number"?null:m({status:"pending",mine:t.mine,email:typeof t.email=="string"?t.email:null,final_at:t.final_at,held:t.held===!0},t.not_me===!0?{not_me:!0}:{})}async function Ft(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return[...new Uint8Array(n)].map(i=>i.toString(16).padStart(2,"0")).join("")}function pt(e){return JSON.stringify(On(e))}function On(e){return Array.isArray(e)?e.map(On):e&&typeof e=="object"?Object.keys(e).sort().reduce((t,n)=>(t[n]=On(e[n]),t),{}):e}function Xo(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var el=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,tl=100,nl="marketplace:installed-extensions",il="marketplace:installed-themes",ol="marketplace:theme-installed",rl="marketplace:installed:",al="marketplace";function Hn(e){return Spicetify.Config?$n(Spicetify.Config,e):null}function $n(e,t){var a;let n=Ie(e),i=new Set(sl(t)),o=((a=t[ol])==null?void 0:a.includes(rl))===!0;return{current_theme:o?al:n.current_theme,color_scheme:o?"":n.color_scheme,extensions:n.extensions.filter(s=>!i.has(s)),custom_apps:n.custom_apps}}function Ie(e){let t=e&&typeof e=="object"?e:{};return{current_theme:Un(t.current_theme)?t.current_theme:"",color_scheme:Un(t.color_scheme)?t.color_scheme:"",extensions:Zo(t.extensions),custom_apps:Zo(t.custom_apps)}}function tr(e,t){return pt(Ie(e))===pt(Ie(t))}function Zo(e){return Array.isArray(e)?[...new Set(e.filter(Un))].sort().slice(0,tl):[]}function Un(e){return typeof e=="string"&&el.test(e)}function sl(e){let t=Qo(e[nl]).map(i=>{var a;let o=(a=er(e[i]))==null?void 0:a.manifest;return o&&typeof o=="object"?o.main:void 0}),n=Qo(e[il]).flatMap(i=>{var a;let o=(a=er(e[i]))==null?void 0:a.include;return Array.isArray(o)?o:[]});return[...t,...n].flatMap(i=>{let o=typeof i=="string"?i.split("/").pop():void 0;return o?[o]:[]})}function Qo(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function er(e){try{let t=e?JSON.parse(e):null;return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch(t){return null}}var cl=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],ll="marketplace:installed:",nr=`${ll}snippet:`,ul="wsoltani/syncify",dl="marketplace",ir={added:0,removed:1,unchanged:2};function Q(e){let t=new Map;for(let[n,i]of cl)for(let o of ml(e[n]))t.has(o)||t.set(o,fl(o,i,e[o]));return[...t.values()]}function Yt(e,t,n,i){let o=new Set(e.map(l=>l.key)),a=new Map(n.map(l=>[l.key,l])),s=[...e.map(l=>{let d=a.get(l.key);return S(m({},l),{change:d?"unchanged":"added",isNew:!d||d.sources.join(" ")!==l.sources.join(" ")})}),...n.filter(l=>!o.has(l.key)).map(l=>S(m({},l),{change:mt(l,e)?"unchanged":"removed",isNew:!1}))].sort((l,d)=>ir[l.change]-ir[d.change]||l.name.localeCompare(d.name)),c={added:0,removed:0,unchanged:0};for(let l of s)c[l.change]+=1;return{items:s,counts:c,manual:yl(t,i)}}function mt(e,t){return e.type==="extension"&&jt(e)&&!t.some(jt)}function jt(e){var t;return((t=e.repo)==null?void 0:t.toLowerCase())===ul}function yl(e,t){if(!e)return[];let n=Ie(e),i=Ie(t),o=[...n.extensions.filter(s=>!i.extensions.includes(s)).map(s=>({type:"extension",name:s})),...n.custom_apps.filter(s=>!i.custom_apps.includes(s)).map(s=>({type:"custom_app",name:s}))],a=n.current_theme;return a&&a!==dl&&(a!==i.current_theme||n.color_scheme!==i.color_scheme)&&o.push(m({type:"theme",name:a},n.color_scheme?{scheme:n.color_scheme}:{})),o}function fl(e,t,n){var l,d;let i=or(n),o=or(i==null?void 0:i.manifest),a=Wt(i==null?void 0:i.user),s=Wt(i==null?void 0:i.repo),c=(d=(l=Wt(i==null?void 0:i.title))!=null?l:Wt(o==null?void 0:o.name))!=null?d:e.startsWith(nr)?e.slice(nr.length):e.split("/").pop()||e;return{key:e,type:t,name:c,repo:t!=="snippet"&&a&&s?`${a}/${s}`:null,sources:pl(t,i),custom:t==="snippet"&&(i==null?void 0:i.custom)===!0}}function pl(e,t){return t?(e==="extension"?[t.extensionURL]:e==="theme"?[t.cssURL,t.schemesURL,...Array.isArray(t.include)?t.include:[]]:[]).filter(i=>typeof i=="string"&&i!==""):[]}function Wt(e){return typeof e=="string"&&e.trim()?e.trim():null}function ml(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function or(e){let t=e;if(typeof e=="string")try{t=JSON.parse(e)}catch(n){return null}return t&&typeof t=="object"&&!Array.isArray(t)?t:null}var qt="spicetify-marketplace";var gt="settings";async function rr(){let e=await cr();if(e.kind!=="ok")return null;try{let t=await lr(e.db,"readonly",i=>i.getAll());if(!t)return null;let n={};for(let i of t)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(n[i.key]=i.value);return n}finally{e.db.close()}}async function ar(e,t=[]){let n=await cr();if(n.kind==="unavailable")return"unavailable";let i=n.kind==="ok"?n.db:await gl();if(!i)return"failed";try{return await lr(i,"readwrite",a=>{let s;for(let[c,l]of Object.entries(e))s=a.put({key:c,value:l});for(let c of t)s=a.delete(c);return s})===null?"failed":"written"}finally{i.close()}}function sr(){var e;try{return(e=window.indexedDB)!=null?e:null}catch(t){return null}}async function cr(){let e=sr();return e?await hl(e)?{kind:"missing"}:new Promise(t=>{let n=!1,i=e.open(qt);i.onupgradeneeded=()=>{n=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),t({kind:"unavailable"})},i.onblocked=()=>t({kind:"unavailable"}),i.onsuccess=()=>{let o=i.result;if(n){o.close(),bl(e).then(()=>t({kind:"missing"}));return}if(!o.objectStoreNames.contains(gt)){o.close(),t({kind:"unavailable"});return}t({kind:"ok",db:o})}}):{kind:"unavailable"}}function gl(){let e=sr();return e?new Promise(t=>{let n=e.open(qt,1);n.onupgradeneeded=()=>{let i=n.result;i.objectStoreNames.contains(gt)||i.createObjectStore(gt,{keyPath:"key"})},n.onerror=()=>{console.warn("Syncify could not create Marketplace storage",n.error),t(null)},n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}async function hl(e){if(typeof e.databases!="function")return!1;try{return!(await e.databases()).some(n=>n.name===qt)}catch(t){return!1}}function bl(e){return new Promise(t=>{let n=e.deleteDatabase(qt);n.onsuccess=()=>t(),n.onerror=()=>t(),n.onblocked=()=>t()})}function lr(e,t,n){return new Promise(i=>{let o;try{o=e.transaction(gt,t)}catch(d){console.warn("Syncify could not open a Marketplace transaction",d),i(null);return}let a,s=!1,c=d=>{s||(s=!0,i(d))};o.oncomplete=()=>c(a),o.onerror=()=>{console.warn("Syncify Marketplace transaction failed",o.error),c(null)},o.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",o.error),c(null)};let l;try{l=n(o.objectStore(gt))}catch(d){console.warn("Syncify Marketplace request could not be issued",d),c(null);return}l&&(l.onsuccess=()=>{a=l.result},l.onerror=()=>{console.warn("Syncify Marketplace request failed",l.error),c(null)})})}var Kn="marketplace:",Gt=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function ue(){let e=Nl(),t=await rr();if(t)for(let[n,i]of Object.entries(t))n.startsWith(Kn)&&(e[n]=i);return e}var Sl=new Set(["marketplace:active-tab","marketplace:sort"]),zn="marketplace:installed:",Vt="marketplace:theme-installed",wl=["stars","tags","lastUpdated","created"];async function Jt(e,t){let n={};for(let[i,o]of Object.entries(e))Sl.has(i)||(n[i]=i.startsWith(zn)?vl(o):o);return t&&(n.spicetify_config=Ie(t)),Ft(pt(n))}function vl(e){try{let t=JSON.parse(e);if(!t||typeof t!="object"||Array.isArray(t))return e;for(let n of wl)delete t[n];return t}catch(t){return e}}async function Xt(){let e=await ue(),t=Hn(e);return{keyCount:Object.keys(e).length,hash:await Jt(e,t),installedItemCount:Il(e),installedItems:Zt(e),items:Q(e),spicetifyConfig:t,marketplaceAvailable:El(e),activeTheme:ht(e[Vt])}}function ht(e){if(!e)return null;if(e.startsWith(zn))return e;try{let t=JSON.parse(e);return typeof t=="string"?t:null}catch(t){return null}}async function ur(){let e=await ue(),t=Hn(e);return m({schema_version:2,metadata:{last_sync_datetime:new Date().toISOString(),device_info:Xo(),marketplace_key_count:Object.keys(e).length},payload_hash:await Jt(e,t),marketplace_data:{keys:e}},t?{spicetify_config:t}:{})}async function dr(e,t=[]){var a,s;let n={},i=(s=(a=e.marketplace_data)==null?void 0:a.keys)!=null?s:{};for(let[c,l]of Object.entries(i))c.startsWith(Kn)&&(n[c]=l);if(Object.keys(n).length===0)return 0;await xl(n),t.length>0&&await Cl(n,t);let o=Wn(await ue(),n);return await Fn(n,o),Object.keys(n).length}async function Fn(e,t=[]){for(let[i,o]of Object.entries(e))window.localStorage.setItem(i,o);for(let i of t)window.localStorage.removeItem(i);if(await ar(e,t)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try again.")}function Wn(e,t){let n=new Set(Gt.flatMap(s=>{var c;return Qt((c=t[s])!=null?c:e[s]).map(String)})),i=Zt(e).filter(s=>s.startsWith(zn)&&!n.has(s)),o=i.filter(s=>e[s]!==void 0&&t[s]===void 0),a=e[Vt];return a&&t[Vt]===void 0&&i.some(s=>a.includes(s))&&o.push(Vt),o}async function xl(e){let t=await ue(),n=Q(e),i=Q(t).filter(s=>mt(s,n));if(i.length===0)return;let o="marketplace:installed-extensions",a=Qt(e[o]).map(String);for(let s of i)a.includes(s.key)||a.push(s.key),e[s.key]=t[s.key];e[o]=JSON.stringify(a)}async function Cl(e,t){let n=await ue(),i=Zt(n);for(let o of Gt){if(e[o]===void 0)continue;let a=Qt(e[o]).map(String).filter(s=>!t.includes(s)||i.includes(s));e[o]=JSON.stringify(a)}for(let o of t)n[o]!==void 0?e[o]=n[o]:delete e[o]}function Il(e){return Zt(e).length}function Zt(e){return Gt.flatMap(t=>Qt(e[t]).map(String))}function El(e){return!!(window.Marketplace||Gt.some(n=>e[n]!==void 0)||e["marketplace:tabs"]!==void 0)}function yr(e,t){return t===0?!1:e===0?!0:e<Math.max(2,Math.floor(t*.5))}function Nl(){let e={};for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);if(!(n!=null&&n.startsWith(Kn)))continue;let i=window.localStorage.getItem(n);i!==null&&(e[n]=i)}return e}function Qt(e){if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch(t){return[]}}var Rl="raw.githubusercontent.com",Pl="cdn.jsdelivr.net",fr=".github.io";function Yn(e){var n;if(e.protocol!=="https:")return null;let t=e.pathname.split("/").filter(Boolean);if(e.host===Rl)return jn(t[0],t[1]);if(e.host===Pl)return t[0]==="gh"?jn(t[1],(n=t[2])==null?void 0:n.split("@")[0]):null;if(e.host.endsWith(fr)){let i=e.host.slice(0,-fr.length);return i.includes(".")?null:jn(i,t.length>1?t[0]:e.host)}return null}function jn(e,t){return e&&t?`${e}/${t}`:null}var Tl={extension:"spicetify-extensions",theme:"spicetify-themes"},_l="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",Al="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",Ml="https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/",Ll="https://api.github.com/repos",Bl=5e3,Dl=20,pr="syncify:repo-topics",mr=10080*60*1e3,Ol=200;function qe(e){return(e==null?void 0:e.kind)==="host"||(e==null?void 0:e.kind)==="repo"||(e==null?void 0:e.kind)==="blocked"||(e==null?void 0:e.kind)==="catalog"}function Ve(e){let t=new Map;for(let n of e){if(n.change==="removed")continue;if(n.custom){t.set(n.key,{kind:"custom"});continue}let i=Ul(n);i&&t.set(n.key,i)}return t}async function Ge(e,t){let n=new Map,i=e.filter(s=>s.change!=="removed"&&s.isNew&&!t.has(s.key));if(i.length===0)return n;let o=i.filter(s=>s.type==="snippet"),a=i.filter(s=>s.type!=="snippet");if(o.length>0){let s=await qn();for(let c of o)s?en(s,c.name)||n.set(c.key,{kind:"catalog"}):n.set(c.key,{kind:"unchecked"})}if(a.length>0){let s=await Kl(),c=Wl(),l=0;await Promise.all(a.map(async d=>{let u=Hl(d),f=Tl[d.type];if(!u||!f)return;if(s===null){n.set(d.key,{kind:"unchecked"});return}if($l(u,s)){n.set(d.key,{kind:"blocked"});return}let g=Fl(c,u);g===void 0&&l<Dl&&(l+=1,g=await zl(u),g!==void 0&&(c[u.toLowerCase()]={topics:g,at:Date.now()})),g===void 0?n.set(d.key,{kind:"unchecked"}):(g===null||!g.includes(f))&&n.set(d.key,{kind:"catalog"})})),jl(c)}return n}function Ul(e){let t=null;for(let n of e.sources){let i;try{i=new URL(n)}catch(a){return{kind:"host",host:n.slice(0,40)}}let o=Yn(i);if(!o)return{kind:"host",host:i.host};e.repo&&o.toLowerCase()!==e.repo.toLowerCase()&&(t!=null||(t=o))}return t?{kind:"repo",repo:t}:null}function Hl(e){for(let t of e.sources)try{let n=Yn(new URL(t));if(n)return n}catch(n){}return e.repo}function $l(e,t){let n=`https://github.com/${e}`.toLowerCase();return t.some(i=>{let o=i.toLowerCase();if(!o.includes("*"))return o===n;let a=o.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${a}$`).test(n)})}function gr(e){return e.replace(/\n/g,"").trim().toLowerCase()}function en(e,t){return e.get(gr(t))}var bt=null,kt=null;function Kl(){return bt!=null||(bt=hr(_l).then(e=>{let t=e==null?void 0:e.repos;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&!n.startsWith("//")):(bt=null,null)})),bt}function qn(){return kt!=null||(kt=hr(Al).then(e=>{if(!Array.isArray(e))return kt=null,null;let t=new Map;for(let n of e){if(typeof(n==null?void 0:n.title)!="string"||typeof n.code!="string")continue;let i=typeof n.preview=="string"?n.preview:null;t.set(gr(n.title),m({title:n.title,code:n.code,description:typeof n.description=="string"?n.description:""},i?{imageURL:i.startsWith("http")?i:`${Ml}${i}`}:{}))}return t})),kt}async function zl(e){let t=await br(`${Ll}/${e}`);if((t==null?void 0:t.status)===404)return null;if(!(t!=null&&t.ok))return;let n=await t.json().catch(()=>null);return Array.isArray(n==null?void 0:n.topics)?n.topics.filter(i=>typeof i=="string"):void 0}async function hr(e){let t=await br(e);return t!=null&&t.ok?t.json().catch(()=>null):null}async function br(e){let t=typeof AbortController=="function"?new AbortController:null,n=setTimeout(()=>t==null?void 0:t.abort(),Bl);try{return await fetch(e,{signal:t==null?void 0:t.signal})}catch(i){return null}finally{clearTimeout(n)}}function Fl(e,t){let n=e[t.toLowerCase()];return n&&Date.now()-n.at<mr?n.topics:void 0}function Wl(){var e;try{let t=JSON.parse((e=localStorage.getItem(pr))!=null?e:"{}");return t&&typeof t=="object"?t:{}}catch(t){return{}}}function jl(e){let t=Date.now(),n=Object.entries(e).filter(([,i])=>t-i.at<mr).sort(([,i],[,o])=>o.at-i.at).slice(0,Ol);try{localStorage.setItem(pr,JSON.stringify(Object.fromEntries(n)))}catch(i){}}var Yl=/^[0-9A-HJKMNP-TV-Z]{6}$/,ql=6,Vl="SYN-",vr=60,Vn=20,xr=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],Gl="marketplace:installed:",Hf=`${Gl}snippet:`,_e="marketplace:theme-installed",kr="marketplace",Sr={added:0,removed:1,unchanged:2},Jl=new RegExp(`^[a-z0-9][a-z0-9_-]{1,${Vn-2}}[a-z0-9]$`);function Gn(e){let t=e.trim().replace(/^@/,"").toLowerCase();return/[^a-z0-9_-]/.test(t)?"Only letters, digits, _ and -":t.length<3?"At least 3 characters":!/^[a-z0-9]/.test(t)||!/[a-z0-9]$/.test(t)?"Start and end with a letter or digit":null}function pe(e){return`${Vl}${e}`}function Cr(e){let t=e.trim();if(t.length>200)return null;if(t.includes("/")){let i=t.split(/[?#]/)[0].replace(/\/+$/,"");t=i.slice(i.lastIndexOf("/")+1).replace(/\.json$/i,"")}t=t.toUpperCase().replace(/[\s-]/g,""),t.length===ql+3&&t.startsWith("SYN")&&(t=t.slice(3));let n=t.replace(/O/g,"0").replace(/[IL]/g,"1");return Yl.test(n)?n:null}function Ir(e){let t=e;return!t||typeof t.code!="string"||!t.keys||typeof t.keys!="object"||!Object.values(t.keys).every(n=>typeof n=="string")?null:{code:t.code,name:typeof t.name=="string"&&t.name?t.name:null,creator:typeof t.creator=="string"&&Jl.test(t.creator)?t.creator:null,updated_at:typeof t.updated_at=="number"?t.updated_at:0,keys:t.keys}}async function Er(e,t){let n=e.filter(s=>!jt(s)).map(s=>S(m({},s),{change:"added",isNew:!0})),i=Ve(n);for(let s of n)!i.has(s.key)&&!Xl(s,t[s.key])&&i.set(s.key,{kind:"catalog"});let o=await Ge(n,i),a=new Map;for(let[s,c]of[...o,...i])c.kind!=="unchecked"&&a.set(s,c);return{items:n,leftOut:a}}function Xl(e,t){if(e.type==="snippet")return!0;if(!e.repo)return!1;let n=eu(t);return e.type==="extension"?typeof(n==null?void 0:n.extensionURL)=="string"&&n.extensionURL!=="":typeof(n==null?void 0:n.cssURL)=="string"&&n.cssURL!==""}function Nr(e,t){let n={};for(let[o,a]of xr){let s=t.filter(c=>c.type===a&&e[c.key]!==void 0).map(c=>c.key);n[o]=JSON.stringify(s);for(let c of s)n[c]=e[c]}let i=ht(e[_e]);return i&&t.some(o=>o.key===i)&&(n[_e]=e[_e]),n}function Rr(e,t,n,i,o,a){let s=a==="replace"?Yt(t,void 0,n,i):Zl(t,n),c=ht(e.keys[_e]),l=c!==null&&t.some(u=>u.key===c)&&i!==null&&i.current_theme!==kr,d=c!==null&&c!==o?t.find(u=>u.key===c):void 0;return m(S(m({},s),{manual:l?[{type:"theme",name:kr}]:[]}),d?{theme:{key:d.key,name:d.name}}:{})}function Zl(e,t){let n=new Set(t.map(s=>s.key)),i=new Set(e.map(s=>s.key)),o=[...e.map(s=>n.has(s.key)?S(m({},s),{change:"unchanged",isNew:!1}):S(m({},s),{change:"added",isNew:!0})),...t.filter(s=>!i.has(s.key)).map(s=>S(m({},s),{change:"unchanged",isNew:!1}))].sort((s,c)=>Sr[s.change]-Sr[c.change]||s.name.localeCompare(c.name)),a={added:0,removed:0,unchanged:0};for(let s of o)a[s.change]+=1;return{items:o,counts:a,manual:[]}}function Pr(e,t){return new Set(e.items.filter(n=>n.type==="snippet"&&n.change==="added"&&(!t||!en(t,n.name))).map(n=>n.key))}async function Tr(e,t,n,i){let o=await ue(),a=Q(o),s=Q(e.keys),c={};for(let[f,g]of xr){let w=wr(o[f]),h=[...t==="add"?w:w.filter(k=>n.includes(k)||a.some(b=>b.key===k&&mt(b,s)))];for(let k of s){if(k.type!==g||n.includes(k.key))continue;let b=w.includes(k.key);if(t==="add"&&b)continue;let I=g==="snippet"?Ql(k,i,o[k.key]):e.keys[k.key];I!==void 0&&(c[k.key]=I,h.includes(k.key)||h.push(k.key))}c[f]=JSON.stringify(h)}let l=ht(e.keys[_e]),d=wr(c["marketplace:installed-themes"]);l&&d.includes(l)&&!n.includes(l)&&(c[_e]=e.keys[_e]);let u=Wn(o,c);return await Fn(c,u),Object.keys(c).length+u.length}function Ql(e,t,n){let i=t?en(t,e.name):void 0;return i?JSON.stringify(m({code:i.code,title:i.title,description:i.description},i.imageURL?{imageURL:i.imageURL}:{})):n}function wr(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function eu(e){try{let t=e?JSON.parse(e):null;return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch(t){return null}}var St="/api/shares",tu=`${St}/update`,nu=`${St}/delete`,iu=`${St}/import`,ou="x-syncify-user-hash",ru="discover/presets.json",au={no_code:"This code doesn't exist.",too_many_codes:"You can't make more share codes. Delete one to make another.",daily_limit:"Too many changes to share codes today. Try again tomorrow.",too_large:"This setup is too big to share.",invalid_name:"Names can be up to 60 characters.",empty:"There's nothing to share yet. Install something from Marketplace first.",invalid_items:"Syncify couldn't read some items. Reload Spotify and try again.",source:"Some items don't load from GitHub. Reload Spotify and try again.",blocked:"Some items are on Marketplace's block list. Reload Spotify and try again.",custom_snippet:"Custom snippets can't be shared. Reload Spotify and try again.",unchecked:"Couldn't check Marketplace's block list. Try again in a minute.",publish_failed:"Couldn't publish the code. Press Update on it to try again.",delete_failed:"Couldn't delete the code. Try again.",same_setup:"You already shared this setup.",invalid_handle:"Handles are 3 to 20 letters, digits, _ or -, starting and ending with a letter or digit.",reserved_handle:"That handle isn't allowed. Pick another.",handle_taken:"That handle is taken. Pick another.",unavailable:"Share codes aren't available yet."},su=new Set(["offline","signed_out","invalid_signature","stale_salt","no_device_key","too_many_requests"]);function wt(e,t=null){var n;return e instanceof A&&su.has(e.code)?Pe(e):e instanceof A&&e.code==="too_many_codes"&&t!==null?`You have ${t} share codes already. Delete one to make another.`:(n=e instanceof A?au[e.code]:void 0)!=null?n:"Something went wrong. Try again."}async function tn(){var t;let e=await ut(St,"GET");return{codes:Array.isArray(e==null?void 0:e.codes)?e.codes.flatMap(n=>{let i=cu(n);return i?[i]:[]}):[],newHearts:typeof(e==null?void 0:e.new_hearts)=="number"?e.new_hearts:0,max:typeof(e==null?void 0:e.max)=="number"?e.max:null,profile:typeof((t=e==null?void 0:e.profile)==null?void 0:t.handle)=="string"?{handle:e.profile.handle,link:typeof e.profile.link=="string"?e.profile.link:null}:null,suggestedHandle:typeof(e==null?void 0:e.suggested_handle)=="string"?e.suggested_handle:null}}async function _r(e,t,n){return Or(await ut(St,"POST",m({name:e,keys:t},n===void 0?{}:{handle:n})))}function nn(e){return`${$().shareUrl.replace(/\/+$/,"")}/@${e}`}async function Ar(e,t,n){return Or(await ut(tu,"POST",{code:e,name:t,keys:n}))}async function Mr(e){try{await ut(nu,"POST",{code:e})}catch(t){if(t instanceof A&&t.code==="no_code")return;throw t}}async function Lr(e){let t=$().shareUrl.replace(/\/+$/,""),n;try{n=await fetch(`${t}/${e}.json`)}catch(o){throw new A("offline")}if(n.status===404||n.status===403)throw new A("no_code");if(!n.ok)throw new A("failed");let i=Ir(await n.json().catch(()=>null));if(!i||i.code!==e)throw new A("no_code");return i}async function Br(){let e=$().shareUrl.replace(/\/+$/,"");try{let t=await fetch(`${e}/${ru}`);if(!t.ok)return null;let n=await t.json();return Array.isArray(n.posts)?n.posts.flatMap(i=>{let o=uu(i);return o?[o]:[]}):null}catch(t){return null}}async function Dr(e,t,n=!1){try{await Wo(iu,m({code:e},n?{source:"preset"}:{}),{[ou]:t.hash})}catch(i){}}function cu(e){let t=e;return!t||typeof t.code!="string"?null:{code:t.code,name:typeof t.name=="string"&&t.name?t.name:null,link:typeof t.link=="string"?t.link:null,item_count:typeof t.item_count=="number"?t.item_count:0,imports:typeof t.imports=="number"?t.imports:0,created_at:typeof t.created_at=="number"?t.created_at:0,updated_at:typeof t.updated_at=="number"?t.updated_at:0,posted:lu(e.post)}}function lu(e){let t=e==null?void 0:e.status;return typeof t=="string"&&t!=="removed"}function uu(e){let t=e,n=i=>Number.isSafeInteger(i)&&i>=0?i:0;return!t||typeof t.code!="string"?null:{code:t.code,name:typeof t.name=="string"?t.name:pe(t.code),extensions:n(t.extensions),themes:n(t.themes),snippets:n(t.snippets)}}function Or(e){let t=e;if(typeof(t==null?void 0:t.code)!="string")throw new A("failed");return{code:t.code,link:typeof t.link=="string"?t.link:null,leftOut:Array.isArray(t.left_out)?t.left_out.length:0}}var Ur="/claims",du="/claims/cancel",yu={no_backup:"Back up first, then secure your backup.",unsupported_identity:"This Spotify account can't be secured.",too_many_accounts:"Your account already has 10 Spotify accounts linked.",undone:"This backup can't be secured with your account.",offline:"Couldn't reach Syncify. Check your connection and try again."},Ee=class extends Error{constructor(n){var i;super((i=yu[n])!=null?i:"Couldn't secure your backup. Try again.");this.code=n;this.name="ClaimError"}};async function Hr(e,t){let n=await Jn(e,t,"GET",Ur);if(!n.ok)throw new Ee(await Xn(n));let i=await n.json().catch(()=>null);return{claim:ft(i==null?void 0:i.claim),accounts:Array.isArray(i==null?void 0:i.accounts)?i.accounts.filter(fu):null}}async function $r(e,t){let n=await Jn(e,t,"POST",Ur);if(!n.ok)throw new Ee(await Xn(n));let i=await n.json().catch(()=>null);return ft(i==null?void 0:i.claim)}async function Kr(e,t){let n=await Jn(e,t,"POST",du);if(n.status===404)return"cancelled";if(!n.ok)throw new Ee(await Xn(n));let i=await n.json().catch(()=>null);return(i==null?void 0:i.held)===!0?"checking":"cancelled"}async function Jn(e,t,n,i){try{return await Ce(e,t,{method:n},i)}catch(o){throw o instanceof TypeError?new Ee("offline"):o}}async function Xn(e){let t=await e.json().catch(()=>null);return typeof(t==null?void 0:t.code)=="string"?t.code:"failed"}function fu(e){let t=e;return!!(t&&typeof t.hash=="string"&&(t.status==="pending"||t.status==="final"||t.status==="cancelled"||t.status==="unlinked"))}var Xe={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},pu=/^([a-z0-9]|f([1-9]|1[0-2]))$/,mu=250,gu=40,Zn=null,on=null,Je=null;function zr(){return/mac/i.test(navigator.platform||navigator.userAgent)}function Fr(e){if(e===null)return null;if(!e||typeof e!="object")return Xe;let t=e;return typeof t.key!="string"||!pu.test(t.key)?Xe:{key:t.key,ctrl:!!t.ctrl,alt:!!t.alt,shift:!!t.shift,meta:!!t.meta}}function rn(e){if(!e)return"Off";let t=e.key.toUpperCase();return zr()?[e.ctrl?"\u2318":"",e.alt?"\u2325":"",e.shift?"\u21E7":"",t].join(""):[e.ctrl&&"Ctrl",e.meta&&"Win",e.alt&&"Alt",e.shift&&"Shift",t].filter(Boolean).join("+")}function Wr(e){if(e.key==="Escape")return{kind:"cancel"};let t=hu(e.code);if(!t)return{kind:"ignore"};let n=zr();if(n&&e.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:t,ctrl:n?e.metaKey:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:n?!1:e.metaKey},o=t.startsWith("f")&&t.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!o?{kind:"error",message:`Include ${n?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function hu(e){var n,i;let t=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(e);return t?((i=(n=t[1])!=null?n:t[2])!=null?i:t[3]).toLowerCase():null}function jr(e){var t;if(Je&&bu(Je,e))return!1;try{let n=Spicetify.Mousetrap,i=(t=n.trigger)==null?void 0:t.call(n)._directMap;if(!i)return!1;let o=Qn(e);return Object.keys(i).some(a=>a.startsWith(`${o}:`))}catch(n){return!1}}function ei(e,t,n=0){if(Zn=t,on=e,!Yr()){if(n>=gu){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>ei(on,t,n+1),mu);return}ti(on)}function ti(e){if(on=e,!Yr()||!Zn)return;let t=Zn;try{if(Je&&Spicetify.Keyboard._deregisterShortcut(Je),Je=null,!e)return;Spicetify.Keyboard.registerShortcut(e,n=>{n.preventDefault(),t()}),Je=e,console.debug("[Syncify]","Keyboard shortcut registered",rn(e))}catch(n){console.warn("[Syncify]","Failed to register keyboard shortcut",n)}}function Yr(){var e;return typeof((e=Spicetify.Keyboard)==null?void 0:e.registerShortcut)=="function"}function Qn(e){return[e.ctrl&&"mod",e.meta&&"meta",e.alt&&"alt",e.shift&&"shift",e.key].filter(Boolean).join("+")}function bu(e,t){return Qn(e)===Qn(t)}var ni="both",ku=["both","topbar","menu"],vt=null,xt=null,an=!1;function qr(e){return ku.includes(e)?e:ni}function Vr(){var e;return typeof((e=Spicetify.Menu)==null?void 0:e.Item)=="function"}function Gr(e){vt=e.topbarButton,xt=e.menuItem}function sn(e){let t=e!=="menu"||!xt,n=e!=="topbar";if(vt!=null&&vt.element&&(vt.element.style.display=t?"":"none"),!!xt)try{n&&!an?(xt.register(),an=!0):!n&&an&&(xt.deregister(),an=!1)}catch(i){console.warn("[Syncify]","Failed to update profile menu item",i)}}var ln="syncify:config",cn={workerUrl:$().workerUrl,autoBackupEnabled:!1,shortcut:Xe,entryPoint:ni};function de(){var n,i;let e=$(),t=(i=(n=Spicetify.LocalStorage)==null?void 0:n.get(ln))!=null?i:window.localStorage.getItem(ln);if(!t)return S(m({},cn),{workerUrl:e.workerUrl});try{let o=JSON.parse(t);return{workerUrl:e.workerUrl,autoBackupEnabled:o.autoBackupEnabled===void 0?cn.autoBackupEnabled:!!o.autoBackupEnabled,shortcut:o.shortcut===void 0?cn.shortcut:Fr(o.shortcut),entryPoint:qr(o.entryPoint)}}catch(o){return S(m({},cn),{workerUrl:e.workerUrl})}}function Jr(e){var n;let t=JSON.stringify({workerUrl:$().workerUrl,autoBackupEnabled:e.autoBackupEnabled,shortcut:e.shortcut,entryPoint:e.entryPoint});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set(ln,t);return}window.localStorage.setItem(ln,t)}function Ct(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}var Su=["username","canonicalUsername","id","uri","displayName"];async function me(){let{value:e,field:t}=await wu();return{hash:await Ft(e),field:t}}async function wu(){var o;let e=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let t=await e.getUser(),n=Su.find(a=>(t==null?void 0:t[a])!=null),i=n?t[n]:void 0;if(!n||!i)throw new Error("Unable to resolve the active Spotify user.");return{value:i,field:n}}async function Et(e){if(!Ct(e))throw new Error("Syncify backup service is not configured.");let[t,n]=await Promise.all([me(),ur()]);if(n.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:i,unapproved:o}=await qo(e.workerUrl,t,n);return{payload:n,unchanged:i,unapproved:o}}async function Ae(e,t){var c;if(!Ct(e))throw new Error("Syncify backup service is not configured.");let n=await Dn(e.workerUrl,await me(),t),[i,o,a]=await Promise.all([Promise.all(n.backups.map(oi)),n.safetyCopy?oi(n.safetyCopy):null,Promise.all(n.unapproved.map(oi))]),s=i.filter((l,d)=>i.findIndex(u=>u.payload_hash===l.payload_hash)===d);return S(m({},n),{payload:(c=s[0])!=null?c:null,backups:s,safetyCopy:o&&!s.some(l=>l.payload_hash===o.payload_hash)?o:null,unapproved:a.filter(l=>!s.some(d=>d.payload_hash===l.payload_hash))})}var ii=new Map;async function oi(e){var a,s,c;let t=(s=(a=e.marketplace_data)==null?void 0:a.keys)!=null?s:{},n=e.spicetify_config?$n(e.spicetify_config,t):void 0,i=`${e.payload_hash} ${(c=e.metadata)==null?void 0:c.last_sync_datetime}`,o=ii.get(i);return o||(o=Jt(t,n),ii.set(i,o),o.catch(()=>ii.delete(i))),S(m(m({},e),n?{spicetify_config:n}:{}),{payload_hash:await o})}async function Xr(e){let t=await Dn(Nt(e),await me());return{claim:t.claim,install:t.install,nudge:t.nudge}}async function Zr(e,t,n,i=[]){var c;let o=t!=null?t:(await Ae(e)).payload;if(!o)throw new Error("No Syncify cloud backup was found for this Spotify account.");let a=await dr(o,i),s=(c=o.backup)==null?void 0:c.id;return s&&Ct(e)&&me().then(l=>Go(e.workerUrl,l,s,n)).catch(()=>{}),{payload:o,restoredCount:a}}var It=class extends Error{constructor(n){super("Couldn't back up your setup first, so nothing changed.");this.reason=n;this.name="SafetyBackupError"}};async function Qr(e,t,n,i,o,a=!1){try{await Et(e)}catch(c){throw new It(c)}let s=await Tr(t,n,i,o);return me().then(c=>Dr(t.code,c,a)).catch(()=>{}),s}async function ea(e){let t=await me(),n=await Hr(Nt(e),t);return S(m({},n),{hash:t.hash})}async function ta(e){await $r(Nt(e),await me())}async function un(e,t,n){await Vo(Nt(e),await me(),t,n)}async function dn(e){return Kr(Nt(e),await me())}function Nt(e){if(!Ct(e))throw new Error("Syncify backup service is not configured.");return e.workerUrl}var na="syncify:nudge-hidden-until",ia="syncify:nudge-panel-shown";function oa(e=Date.now()){let t=Number(ca(na));return Number.isFinite(t)&&t>e}function ra(e=Date.now()){la(na,String(e+30*864e5))}function aa(){return ca(ia)!==null}function sa(){la(ia,"1")}function ca(e){var t,n;return(n=(t=Spicetify.LocalStorage)==null?void 0:t.get(e))!=null?n:window.localStorage.getItem(e)}function la(e,t){var n;(n=Spicetify.LocalStorage)!=null&&n.set?Spicetify.LocalStorage.set(e,t):window.localStorage.setItem(e,t)}var ri="syncify:claim-check-day",ua="syncify:undone-claim-shown";async function da(e){var n,i;let t=de();if(t.workerUrl){if(!t.autoBackupEnabled)return vu(e);try{let[o,a]=await Promise.all([Xt(),Ae(t)]);ya(a,e);let s=(i=(n=a.payload)==null?void 0:n.metadata.marketplace_key_count)!=null?i:0;if(a.exists&&yr(o.keyCount,s)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(a.backups.some(l=>l.payload_hash===o.hash)||o.keyCount===0)return;let{unapproved:c}=await Et(t);Spicetify.showNotification(c?"Syncify: backed up, waiting for approval":"Syncify auto-backup complete")}catch(o){if(o instanceof se||o instanceof Te){Spicetify.showNotification("Syncify: sign in to keep backing up",!0,8e3);return}let a=o instanceof Error?o.message:String(o);console.warn("Syncify startup sync failed:",o),Spicetify.showNotification(`Syncify auto-sync skipped: ${a}`,!0,8e3)}}}async function vu(e){let t=new Date().toLocaleDateString("en-CA");if(fa(ri)!==t)try{let n=await Xr(de());ai(ri,t),ya(n,e)}catch(n){if(n instanceof se){ai(ri,t);return}console.warn("Syncify claim check failed:",n)}}function ya(e,t){var a;let n=xu(e.claim),i=Cu(e.claim),o=(a=e.install)==null?void 0:a.waiting[0];n?t.onClaim(n):i?t.onUndone(i)&&ai(ua,String(i.undone_at)):o?t.onInstall(o):e.nudge&&!aa()&&t.onNudge()}function xu(e){return(e==null?void 0:e.status)==="pending"&&!e.mine&&!e.not_me?e:null}function Cu(e){return(e==null?void 0:e.status)==="undone"&&fa(ua)!==String(e.undone_at)?e:null}function fa(e){var t,n;return(n=(t=Spicetify.LocalStorage)==null?void 0:t.get(e))!=null?n:window.localStorage.getItem(e)}function ai(e,t){var n;(n=Spicetify.LocalStorage)!=null&&n.set?Spicetify.LocalStorage.set(e,t):window.localStorage.setItem(e,t)}var ci="syncify:pending-restore",Iu=600*1e3,Eu=2e3,Nu=15e3,Ru="marketplace:theme-installed",Pu="raw.githubusercontent.com",Tu=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],ge=null,si=new Set,ga=new Map;function ha(){return ge}function ba(e){return si.add(e),()=>si.delete(e)}function ka(){ge&&Ca(S(m({},ge),{manual:[]}))}function Pt(e,t="restore"){try{localStorage.setItem(ci,JSON.stringify({at:Date.now(),manual:e,kind:t}))}catch(n){}}function Sa(){var e;Pt((e=ge==null?void 0:ge.manual)!=null?e:[],ge==null?void 0:ge.kind),window.location.reload()}function wa(){Ia()&&(document.addEventListener("load",e=>pa(e.target,"load"),!0),document.addEventListener("error",e=>pa(e.target,"error"),!0))}async function va(){let e=Ia();if(!e)return;try{localStorage.removeItem(ci)}catch(s){}let t=Date.now(),n=await ma();for(;n.loaded<n.total&&Date.now()-t<Nu;)await new Promise(s=>setTimeout(s,Eu)),n=await ma();Ca(S(m({kind:e.kind,at:Date.now()},n),{manual:e.manual}));let i=n.loaded===n.total&&e.manual.length===0,o=e.kind==="share"?"Setup applied":"Backup restored",a=e.kind==="share"?"loaded":"restored";Spicetify.showNotification(i?`Syncify: ${o}; ${n.total} ${n.total===1?"item":"items"}`:`Syncify: ${a} ${n.loaded} of ${n.total}. Open Syncify for details.`,!1,8e3)}function xa(e){let t=e.map(n=>n.type==="extension"?`spicetify config extensions ${yn(n.name)}`:n.type==="custom_app"?`spicetify config custom_apps ${yn(n.name)}`:`spicetify config current_theme ${yn(n.name)}${n.scheme?` color_scheme ${yn(n.scheme)}`:""}`);return t.length>0?[...t,"spicetify apply"]:[]}function yn(e){return/^[\w.@+/-]+$/.test(e)?e:`"${e}"`}function Ca(e){ge=e;for(let t of si)t(e)}function Ia(){var e;try{let t=JSON.parse((e=localStorage.getItem(ci))!=null?e:"null");return!t||Date.now()-t.at>Iu?null:{manual:Array.isArray(t.manual)?t.manual:[],kind:t.kind==="share"?"share":"restore"}}catch(t){return null}}function pa(e,t){e instanceof HTMLScriptElement&&e.src&&ga.set(Rt(e.src),t)}async function ma(){var i;let e=await ue(),t=(i=e[Ru])!=null?i:"",n=Q(e).filter(o=>o.type==="extension"&&o.sources.length>0||o.type==="theme"&&t.includes(o.key)||o.type==="snippet");return{loaded:n.filter(_u).length,total:n.length}}function _u(e){var t,n;if(e.type==="snippet"){let i=document.querySelector("style.marketplaceSnippets");return((t=i==null?void 0:i.textContent)==null?void 0:t.includes(`/* ${e.name} - `))===!0}if(e.type==="theme"){let i=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((n=i==null?void 0:i.textContent)!=null&&n.trim())}return Au(e.sources[0]).some(Mu)}function Au(e){let t;try{t=new URL(e)}catch(s){return[]}if(t.host!==Pu)return[Rt(t.href)];let[n,i,o,...a]=t.pathname.split("/").filter(Boolean);return!n||!i||!o||a.length===0?[]:Tu.map(s=>Rt(`https://${s}/gh/${n}/${i}@${o}/${a.join("/")}`))}function Mu(e){let t=ga.get(e);return t?t==="load":[...document.querySelectorAll("script[src]")].some(i=>Rt(i.src)===e)&&performance.getEntriesByType("resource").some(i=>Rt(i.name)===e)}function Rt(e){try{let t=new URL(e);return`${t.origin}${t.pathname}`}catch(t){return e}}var Lu="syncify:beta",Ea=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function Na(){var e;return(e=window.SyncifyLoader)!=null?e:null}function Bu(){try{return window.localStorage.getItem(Lu)==="true"}catch(e){return!1}}async function Ra(e){let t=Bu()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(t.map(i=>Du(`${e}/${i}`)))).reduce((i,o)=>o&&(!i||ui(o,i)>0)?o:i,null)}function li(e){return typeof e=="string"&&Ea.test(e)}function ui(e,t){let[n,i]=[e,t].map(o=>{var d;let[,a,s,c,l]=(d=Ea.exec(o))!=null?d:[];return[a,s,c,l!=null?l:1/0].map(Number)});for(let o=0;o<n.length;o+=1)if(n[o]!==i[o])return n[o]<i[o]?-1:1;return 0}async function Du(e,t=3e3){let n=typeof AbortController=="function"?new AbortController:null,i=setTimeout(()=>n==null?void 0:n.abort(),t);try{let o=await fetch(e,{signal:n==null?void 0:n.signal});if(!o.ok)return null;let a=await o.json();return li(a==null?void 0:a.version)?a.version:null}catch(o){return null}finally{clearTimeout(i)}}function Me(...e){return e.filter(Boolean).join(" ")}function di(e,t){return t===void 0?e:S(m({},e),{key:t})}function r(e,t,n){let a=t,{children:i}=a,o=ke(a,["children"]);return i===void 0?at(e,di(o,n)):at(e,di(o,n),i)}function y(e,t,n){let s=t,{children:i}=s,o=ke(s,["children"]),a=Array.isArray(i)?i:[i];return at(e,di(o,n),...a)}var Ou={primary:"regular",secondary:"regular",danger:"regular",text:"small",subtle:"small"};function E(e){let l=e,{variant:t="primary",size:n=Ou[t],type:i="button",icon:o,children:a,className:s}=l,c=ke(l,["variant","size","type","icon","children","className"]);return y("button",S(m({className:Me("syncify-btn",s),"data-variant":t,"data-size":n,type:i},c),{children:[o,r("span",{className:"syncify-cap",children:a})]}))}function yi(e){return r("input",{className:"syncify-checkbox",type:"checkbox","aria-label":e.label,checked:e.checked,onChange:t=>e.onChange(t.currentTarget.checked),disabled:e.disabled})}var Uu=0;function V(e){let[t]=p(()=>`syncify-${e}-${++Uu}`);return t}function Pa(e){return y("div",{className:"syncify-dialog-content",children:[r("h2",{className:"syncify-dialog-title",id:e.titleId,children:e.title}),r("div",{className:"syncify-dialog-text",children:e.children}),r("div",{className:"syncify-dialog-actions",children:e.actions})]})}function fi(e){let t=F(null),n=V("dialog"),{open:i}=e,o=F(e.onClose);return st(()=>{o.current=e.onClose}),_(()=>{let a=t.current;if(!a||!i)return;let s=document.activeElement;a.open||a.showModal();let c=l=>{l.preventDefault(),o.current()};return a.addEventListener("cancel",c),()=>{a.removeEventListener("cancel",c),a.open&&a.close(),s instanceof HTMLElement&&s.isConnected&&s.focus()}},[i]),i?r("dialog",{className:"syncify-dialog",ref:t,"aria-labelledby":n,children:r(Pa,{title:e.title,actions:e.actions,titleId:n,children:e.children})}):null}function Ze(e){var o,a;let t=V("field"),n=`${t}-error`,i=!!e.error;return y("div",{className:"syncify-field-group",children:[r("label",{className:"syncify-field-label",htmlFor:t,children:e.label}),y("div",{className:"syncify-field-row",children:[y("span",{className:"syncify-input-box","data-invalid":i?"true":void 0,"data-disabled":e.disabled?"true":void 0,children:[e.prefix?r("span",{className:"syncify-input-prefix","aria-hidden":"true",children:e.prefix}):null,r("input",{className:"syncify-input-control",id:t,type:(o=e.type)!=null?o:"text",value:e.value,onChange:s=>e.onChange(s.currentTarget.value),onBlur:e.onBlur,placeholder:e.placeholder,inputMode:e.inputMode,autoComplete:(a=e.autoComplete)!=null?a:"off",spellCheck:!1,maxLength:e.maxLength,disabled:e.disabled,autoFocus:e.autoFocus,"aria-invalid":i||void 0,"aria-describedby":i?n:void 0,"data-mono":e.mono?"true":void 0})]}),e.action]}),i?r("span",{className:"syncify-field-error",id:n,role:"alert",children:e.error}):null]})}function Qe(e){let o=e,{children:t,className:n}=o,i=ke(o,["children","className"]);return r("svg",S(m({className:Me("syncify-icon",n),viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},i),{children:t}))}function pi(e){return r(Qe,S(m({},e),{children:r("path",{d:"m9 6 6 6-6 6"})}))}function mi(e){return r(Qe,S(m({},e),{children:r("path",{d:"m6 9 6 6 6-6"})}))}function Le(e){return r(Qe,S(m({},e),{children:r("path",{d:"M5 12.5l4.5 4.5L19 7.5"})}))}function gi(e){return r(Qe,S(m({},e),{children:r("path",{d:"M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z"})}))}function hi(e){return y(Qe,S(m({},e),{"data-filled":"true",children:[r("rect",{x:"4",y:"10.5",width:"3",height:"3",rx:"0.75"}),r("rect",{x:"10.5",y:"10.5",width:"3",height:"3",rx:"0.75"}),r("rect",{x:"17",y:"10.5",width:"3",height:"3",rx:"0.75"})]}))}function bi(e){return y(Qe,S(m({},e),{children:[r("path",{d:"M12 6v7"}),r("path",{d:"M12 17.5v.5"})]}))}function ne(e){return r("ul",{className:"syncify-list","aria-label":e.label,children:e.children})}function fn(){return r("li",{className:"syncify-list-divider",role:"presentation"})}function ee(e){let t=y(B,{children:[e.leading?r("span",{className:"syncify-row-leading",children:e.leading}):null,y("span",{className:"syncify-row-name",children:[r("span",{className:"syncify-row-name-text",children:e.name}),e.nameMark]}),e.meta?r("span",{className:"syncify-row-meta",children:e.meta}):null,e.end?r("span",{className:"syncify-row-end",children:e.end}):null]}),n=e.meta?"2":"1";return r("li",{className:"syncify-list-item",children:e.onOpen?y("button",{className:"syncify-row",id:e.id,"data-lines":n,type:"button","aria-label":e.openLabel,onClick:e.onOpen,disabled:e.disabled,children:[t,r(pi,{className:"syncify-row-chevron"})]}):r("div",{className:"syncify-row",id:e.id,"data-lines":n,children:t})})}function he(e){return r("span",{className:"syncify-mark-square","data-tone":e.tone,"data-size":e.icon?"large":"small",role:e.label?"img":void 0,"aria-label":e.label,"aria-hidden":e.label?void 0:"true",children:e.icon})}function ki(e){return r("span",{className:"syncify-badge",role:"img","aria-label":e.label,children:r("span",{className:"syncify-cap",children:e.count})})}function Be(e){let t=V("menu"),[n,i]=p(!1),o=F(null),a=F(null),s=e.items.some(f=>f.checked!==void 0);_(()=>{var b,I;let f=a.current,g=o.current;if(!n||!f||!g)return;$u(f),Fu(f,g);let w=Ta(f);(I=(b=w.find(H=>H.getAttribute("aria-checked")==="true"))!=null?b:w[0])==null||I.focus();let v=()=>i(!1),h=H=>{let L=H.target;L instanceof Node&&!f.contains(L)&&!g.contains(L)&&v()},k=H=>{H.target instanceof Node&&f.contains(H.target)||v()};return document.addEventListener("pointerdown",h,!0),document.addEventListener("scroll",k,!0),window.addEventListener("resize",v),()=>{document.removeEventListener("pointerdown",h,!0),document.removeEventListener("scroll",k,!0),window.removeEventListener("resize",v),Ku(f)}},[n]);function c(){var f;i(!1),(f=o.current)==null||f.focus()}function l(f){let g=Ta(f.currentTarget),w=g.findIndex(h=>h===document.activeElement),v=f.key==="ArrowDown"?g[(w+1)%g.length]:f.key==="ArrowUp"?g[(w-1+g.length)%g.length]:f.key==="Home"?g[0]:f.key==="End"?g[g.length-1]:null;v?(f.preventDefault(),v.focus()):f.key==="Escape"?(f.preventDefault(),c()):f.key==="Tab"&&i(!1)}function d(f){(f.key==="ArrowDown"||f.key==="ArrowUp")&&(f.preventDefault(),i(!0))}let u={ref:o,type:"button","aria-haspopup":"menu","aria-expanded":n,"aria-controls":n?t:void 0,disabled:e.disabled,onClick:()=>i(!n),onKeyDown:d};return y(B,{children:[e.trigger==="more"?r("button",S(m({className:"syncify-icon-btn","aria-label":e.label},u),{children:r(hi,{})})):y("button",S(m({className:"syncify-menu-value","aria-label":`${e.label}: ${e.trigger.value}`},u),{children:[r("span",{className:"syncify-cap",children:e.trigger.value}),r(mi,{})]})),n?r("div",{className:"syncify-menu",id:t,ref:a,role:"menu","aria-label":e.label,popover:"manual",onKeyDown:l,children:e.items.map(f=>r(Hu,{item:f,picks:s,onPick:()=>{c(),f.onSelect()}},f.label))}):null]})}function Hu(e){let{item:t,picks:n}=e;return y("button",{className:"syncify-menu-item",type:"button",role:n?"menuitemradio":"menuitem","aria-checked":n?t.checked===!0:void 0,"data-danger":t.danger?"true":void 0,tabIndex:-1,disabled:t.disabled,onClick:e.onPick,children:[r("span",{className:"syncify-cap",children:t.label}),t.checked?r(Le,{}):null]})}function Ta(e){return[...e.querySelectorAll(".syncify-menu-item:not(:disabled)")]}function $u(e){typeof e.showPopover=="function"&&!e.matches(":popover-open")&&e.showPopover()}function Ku(e){typeof e.hidePopover=="function"&&e.matches(":popover-open")&&e.hidePopover()}var zu=4;function Fu(e,t){let n=zu,i=t.getBoundingClientRect(),o=e.getBoundingClientRect(),a=i.bottom+n,s=a+o.height>window.innerHeight&&i.top-n-o.height>=0?i.top-n-o.height:a,c=Math.min(Math.max(i.right-o.width,n),window.innerWidth-o.width-n);e.style.top=`${s}px`,e.style.left=`${c}px`}function _a(){return y(B,{children:[r("span",{className:"syncify-dot","aria-hidden":"true"}),r("span",{className:"syncify-visually-hidden",children:", "})]})}function W(e){let t=e.parts.filter(n=>n!=null&&n!==!1&&n!=="");return r("span",{className:Me("syncify-meta",e.className),children:t.map((n,i)=>y(B,{children:[i>0?r(_a,{}):null,r("span",{className:"syncify-meta-part",children:n})]},i))})}function Si(e){let t=Math.min(Math.max(e.used,0),e.max),n=`Used ${e.used} of ${e.max}`;return y("span",{className:"syncify-meter",role:"meter","aria-label":e.label,"aria-valuemin":0,"aria-valuemax":e.max,"aria-valuenow":t,"aria-valuetext":n,"data-full":e.used>=e.max?"true":void 0,children:[r("span",{className:"syncify-cap",children:n}),r("span",{className:"syncify-meter-bars","aria-hidden":"true",children:Array.from({length:e.max},(i,o)=>r("span",{className:"syncify-meter-bar","data-used":o<t?"true":void 0},o))})]})}function K(e){let t=e.tone==="error"?"alert":e.live?"status":void 0;return y("div",{className:"syncify-notice","data-tone":e.tone,role:t,children:[y("span",{className:"syncify-notice-body",children:[r("span",{className:"syncify-notice-mark",children:r(he,{tone:e.tone})}),r("span",{className:"syncify-notice-text",children:e.children})]}),e.actions?r("span",{className:"syncify-notice-actions",children:e.actions}):null]})}function we(e){return r("span",{className:"syncify-pip-square","data-kind":e.kind,"aria-hidden":"true"})}function ce(e){return y("div",{className:"syncify-section-label",children:[r("h3",{className:"syncify-section-label-title",id:e.id,tabIndex:e.focusable?-1:void 0,children:e.title}),e.end]})}function De(e){return y("div",{className:"syncify-setting-row",children:[y("span",{className:"syncify-setting-row-text",children:[r("span",{className:"syncify-setting-row-label",children:e.label}),e.value?r("span",{className:"syncify-setting-row-value",children:e.value}):null]}),e.children]})}function ve(){return r("li",{className:"syncify-list-item","aria-hidden":"true",children:y("div",{className:"syncify-row","data-lines":"2",children:[r("span",{className:"syncify-row-name",children:r("span",{className:"syncify-skeleton","data-width":"name"})}),r("span",{className:"syncify-row-meta",children:r("span",{className:"syncify-skeleton","data-width":"meta"})})]})})}var Aa=(e,t)=>`${e}-tab-${t}`,Ma=(e,t)=>`${e}-panel-${t}`;function wi(e){let t=F(null);function n(i){var c,l;let o=e.tabs.length,a=e.tabs.findIndex(d=>d.id===e.selected),s=i.key==="ArrowRight"?(a+1)%o:i.key==="ArrowLeft"?(a-1+o)%o:i.key==="Home"?0:i.key==="End"?o-1:null;s!==null&&(i.preventDefault(),e.onSelect(e.tabs[s].id),(l=(c=t.current)==null?void 0:c.querySelectorAll('[role="tab"]')[s])==null||l.focus())}return r("div",{className:"syncify-tabs",role:"tablist","aria-label":e.label,ref:t,onKeyDown:n,children:e.tabs.map(i=>{let o=i.id===e.selected;return y("button",{className:"syncify-tab",id:Aa(e.idBase,i.id),type:"button",role:"tab","aria-selected":o,"aria-controls":Ma(e.idBase,i.id),tabIndex:o?0:-1,onClick:()=>e.onSelect(i.id),children:[r("span",{className:"syncify-cap",children:i.label}),i.status]},i.id)})})}function te(e){return y("div",{className:"syncify-tab-panel",id:Ma(e.idBase,e.id),role:"tabpanel","aria-labelledby":Aa(e.idBase,e.id),children:[r("div",{className:"syncify-tab-scroll",tabIndex:0,children:e.children}),e.actions?r("div",{className:"syncify-tab-actions",children:e.actions}):null]})}function La(){return r("svg",{className:"syncify-chevron",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:r("path",{d:"m9 6 6 6-6 6"})})}function Ba(){return y("svg",{className:"syncify-clock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[r("circle",{cx:"12",cy:"12",r:"9"}),r("path",{d:"M12 7v5l3 2"})]})}function vi(){return y("svg",{className:"syncify-external",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[r("path",{d:"M14 4h6v6"}),r("path",{d:"M20 4 10 14"}),r("path",{d:"M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"})]})}function Da(e,t=new Date){let n=new Date(e);return n.toDateString()===t.toDateString()?"today":n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===t.getFullYear()?void 0:"numeric"})}function Oa(e){let t=Da(e);return t==="today"?t:`on ${t}`}function Wu(e){let t=Da(e);return t==="today"?t:`by ${t}`}function xi(e){var t;return e.not_me?{title:"Syncify is checking this claim",text:null}:{title:`${(t=e.email)!=null?t:"Someone"} is securing this backup`,text:e.held?"Syncify is checking it.":`If that isn't you, press Not me ${Wu(e.final_at)}.`}}function Ua(e){let{title:t,text:n}=xi(e);return n?`${t}. ${n}`:`${t}.`}function Ha(e){var t;return`This backup is no longer secured by ${(t=e.email)!=null?t:"another account"}.`}function pn(e){return e==="cancelled"?"Syncify: claim cancelled":"Syncify: sent for a check"}function mn(e){return`A new install${e.device?` on ${e.device}`:""} wants to back up this Spotify account`}function $a(e,t,n){var s,c;if(t==="not_owner")return{kind:"other-account"};if(!e)return n?{kind:"other-claim"}:{kind:"unknown"};let{claim:i}=e;if((i==null?void 0:i.status)==="final"){if(!i.mine)return{kind:"other-account"};let l=((s=e.accounts)!=null?s:[]).filter(d=>d.status==="final").length;return{kind:"secured",linkedCount:Math.max(l,1)}}if((i==null?void 0:i.status)==="pending")return i.mine?{kind:"pending",finalAt:i.final_at,held:i.held}:{kind:"other-claim"};let o=((c=e.accounts)!=null?c:[]).filter(l=>l.hash===e.hash),a=o[o.length-1];return(a==null?void 0:a.status)==="unlinked"?{kind:"ended",reason:"undone"}:(a==null?void 0:a.status)==="cancelled"&&a.cancelled_by!=="claimer"?{kind:"ended",reason:a.cancelled_by==="owner"?"owner":"admin"}:{kind:"open"}}function Ka(e,t,n){return t?{kind:"warning",label:"Sign in to see your backups"}:e?n.kind==="secured"?{kind:"ok",label:"Signed in, backup secured"}:n.kind==="pending"?null:n.kind==="open"?{kind:"warning",label:"Backup not secured yet"}:n.kind==="ended"?{kind:"warning",label:"Backup not secured"}:{kind:"ok",label:"Signed in"}:null}function za(e){return e.held?"Syncify is checking your request to secure this backup":`Your backup will be secured ${Oa(e.finalAt)}`}var gn=6,ju=600*1e3,Yu=300,qu=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function Vu(e){let t=e.lastIndexOf("@");return t<1?e:`${e[0]}***${e.slice(t)}`}function Fa(e){return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}var Gu={owner:"This backup isn't secured. Someone using this Spotify account said it isn't yours.",admin:"This backup isn't secured. Syncify couldn't confirm it's yours.",undone:"This backup is no longer secured by your account."};function Wa(e){let{session:t,secure:n}=e,[i,o]=p(()=>Kt()),[a,s]=p(()=>Kt().email),[c,l]=p(""),[d,u]=p(!1),[f,g]=p(null),[w,v]=p(()=>Date.now()),{handle:h,onHandle:k}=e;_(()=>{if(!t||h!==void 0)return;let N=!0;return tn().then(R=>{var U,J;N&&k((J=(U=R.profile)==null?void 0:U.handle)!=null?J:null)}).catch(()=>{}),()=>{N=!1}},[t,h]);let b=!!(i.codeSentAt&&w-i.codeSentAt<ju),I=Math.max(0,Math.ceil((i.retryAt-w)/1e3)),H=i.retryEmail===null||i.retryEmail===a.trim().toLowerCase()?I:0;_(()=>{if(!t)return;let N=!0;return Ko().then(R=>{!N||R||(g({kind:"warning",text:Pe(new A("signed_out"))}),e.onSignedOut())}).catch(()=>{}),()=>{N=!1}},[t==null?void 0:t.token]),_(()=>{if(i.retryAt<=Date.now())return;let N=setInterval(()=>{v(Date.now()),i.retryAt<=Date.now()&&clearInterval(N)},1e3);return()=>clearInterval(N)},[i.retryAt]);function L(N){let R=m(m({},Kt()),N);Bo(R),o(R),v(Date.now())}async function P(N){var U;let R=N.trim();if(!qu.test(R)){g({kind:"error",text:"Enter a valid email address."});return}u(!0),g(null);try{let J=await Ho(R,{nudge:e.nudge});L({email:R,codeSentAt:Date.now(),retryAt:Date.now()+J*1e3,retryEmail:R.toLowerCase()}),l("")}catch(J){let G=J instanceof A?J:null,X=(U=G==null?void 0:G.retryAfter)!=null?U:null,be=X&&X<=Yu?Date.now()+X*1e3:0,xe=(G==null?void 0:G.code)==="too_many_requests"?null:R.toLowerCase();if((G==null?void 0:G.code)==="resend_wait"){L({email:R,codeSentAt:i.email===R&&i.codeSentAt?i.codeSentAt:Date.now(),retryAt:be,retryEmail:xe});return}be&&L({retryAt:be,retryEmail:xe}),g({kind:"error",text:Pe(J)})}finally{u(!1)}}async function O(){u(!0),g(null);try{let N=await $o(i.email,c);L({codeSentAt:null}),l(""),e.onSignedIn(N)}catch(N){g({kind:"error",text:Pe(N)});let R=N instanceof A?N.code:null;(R==="too_many_attempts"||R==="code_expired")&&l("")}finally{u(!1)}}async function C(){var R;let N=(R=t==null?void 0:t.email)!=null?R:"";u(!0),g(null),await zo(),L({email:N,codeSentAt:null}),s(N),u(!1),e.onSignedOut()}async function M(){u(!0),g(null);try{e.onOpenWebsite(await Fo())}catch(N){let R=N instanceof A&&N.code==="signed_out";g({kind:R?"warning":"error",text:Pe(N)}),R&&e.onSignedOut()}finally{u(!1)}}let Y=f?r("div",{className:"syncify-alert","data-kind":f.kind==="error"?"error":void 0,role:"alert",children:f.text}):null;if(t===void 0)return null;if(t){let N=n.kind==="open"||n.kind==="other-claim"||n.kind==="ended"&&n.reason!=="undone";return y(B,{children:[y("div",{className:"syncify-setting",children:[y("span",{className:"syncify-setting-text",children:[r("span",{className:"syncify-account-email",children:t.email}),n.kind==="secured"?r("span",{className:"syncify-muted",children:r(W,{parts:["Backup secured",n.linkedCount===1?"1 Spotify account linked":`${n.linkedCount} Spotify accounts linked`]})}):n.kind==="pending"?y("span",{className:"syncify-muted syncify-account-state",children:[r(Ba,{}),r("span",{children:za(n)})]}):n.kind==="other-account"?r("span",{className:"syncify-muted",children:"This backup is secured by another account"}):r("span",{className:"syncify-muted",children:"Signed in"})]}),y("span",{className:"syncify-account-actions",children:[y("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-label":"Manage on the website",onClick:()=>{M()},disabled:d,children:["Manage",r(vi,{})]}),r("button",{className:"syncify-text-button",type:"button",onClick:()=>{C()},disabled:d,children:"Sign out"})]})]}),h?y("div",{className:"syncify-setting",children:[y("span",{className:"syncify-setting-text",children:[y("span",{children:["@",h]}),r("span",{className:"syncify-muted",children:"Your handle"})]}),y("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-label":"Open your profile",onClick:()=>e.onOpenWebsite(nn(h)),children:["Profile",r(vi,{})]})]}):null,N?y("div",{className:"syncify-setting",children:[y("span",{className:"syncify-setting-text",children:[r("span",{children:"Secure your backup"}),r("span",{className:"syncify-muted",children:"So only you can restore it"})]}),r("button",{className:"syncify-button",type:"button",onClick:e.onSecure,disabled:d||e.securing||n.kind==="other-claim",children:e.securing?"Securing\u2026":n.kind==="ended"?"Secure again":"Secure"})]}):null,n.kind==="ended"?r("div",{className:"syncify-alert",role:"status",children:Gu[n.reason]}):null,e.secureError?r("div",{className:"syncify-alert","data-kind":"error",role:"alert",children:e.secureError}):null,Y]})}return y(B,{children:[r("div",{className:"syncify-setting",children:e.locked?y("span",{className:"syncify-setting-text",children:[r("span",{children:"Sign in to restore"}),r("span",{className:"syncify-muted",children:"With the email that secured this backup"})]}):y("span",{className:"syncify-setting-text",children:[r("span",{children:"Secure your backup"}),r("span",{className:"syncify-muted",children:"So only you can restore it"})]})}),y("form",{className:"syncify-confirm",noValidate:!0,onSubmit:N=>{N.preventDefault(),!d&&(b?c.length===gn&&O():H||P(a))},children:[b?y(B,{children:[y("p",{className:"syncify-muted",children:["Code sent to ",Vu(i.email)]}),y("div",{className:"syncify-field",children:[r("input",{className:"syncify-input syncify-code-input",type:"text",inputMode:"numeric",autoComplete:"one-time-code","aria-label":"6-digit code",placeholder:"123456",maxLength:gn,value:c,onChange:N=>l(N.currentTarget.value.replace(/\D/g,"").slice(0,gn)),autoFocus:!0}),r("button",{className:"syncify-button",type:"submit",disabled:d||c.length!==gn,children:d?"Verifying\u2026":"Verify"})]}),y("p",{className:"syncify-muted syncify-account-links",children:[r("button",{className:"syncify-text-button",type:"button",onClick:()=>{P(i.email)},disabled:d||I>0,children:I>0?`Resend in ${Fa(I)}`:"Resend code"}),r("button",{className:"syncify-text-button",type:"button",onClick:()=>{L({codeSentAt:null}),l(""),g(null)},disabled:d,children:"Use another email"})]})]}):y(B,{children:[y("div",{className:"syncify-field",children:[r("input",{className:"syncify-input",type:"email",autoComplete:"email","aria-label":"Email",placeholder:"you@example.com",value:a,onChange:N=>s(N.currentTarget.value),autoFocus:!0}),r("button",{className:"syncify-button",type:"submit",disabled:d||H>0||!a.trim(),children:d?"Sending\u2026":"Send code"})]}),r("p",{className:"syncify-muted",children:H>0?`Send another code in ${Fa(H)}`:"We only email sign-in codes."})]}),Y]})]})}var ja=new WeakMap;function et(e){let t=ja.get(e);return t||(t=Q(e.marketplace_data.keys),ja.set(e,t)),t}function Oe(e){return Ue(e,"item")}function Ue(e,t){return`${e} ${t}${e===1?"":"s"}`}function tt(e,t=new Date){let n=new Date(e);if(Number.isNaN(n.getTime()))return e;let i=n.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),o=new Date(t);return o.setDate(t.getDate()-1),n.toDateString()===t.toDateString()?`today, ${i}`:n.toDateString()===o.toDateString()?`yesterday, ${i}`:`${n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===t.getFullYear()?void 0:"numeric"})}, ${i}`}function hn(e){return e.length<=1?e.join(""):`${e.slice(0,-1).join(", ")} and ${e[e.length-1]}`}function Ya(e,t,n){var l,d;let i=tt(e.metadata.last_sync_datetime),o=Oe(et(e).length),a=`from ${e.metadata.device_info}`,s=(d=(l=e.backup)==null?void 0:l.name)!=null?d:null,c=e.payload_hash===n;return t==="safety-copy"?{backup:e,kind:t,name:"Safety copy",meta:[s,i,o,"updated weekly"].filter(Ju),current:c,title:`the safety copy from ${i}`}:t==="unapproved"?{backup:e,kind:t,name:"Not approved",meta:[i,o,a],current:c,title:i}:{backup:e,kind:t,name:s!=null?s:i.charAt(0).toUpperCase()+i.slice(1),meta:s?[i,o,a]:[o,a],current:c,title:s!=null?s:i}}function Ju(e){return e!==null}var qa={extension:"extension",theme:"theme",snippet:"snippet"},Xu={extension:"extension",custom_app:"app",theme:"theme"},Zu={extension:"extension",custom_app:"custom app",theme:"theme"};function bn(e){let{changes:t}=e,[n,i]=p(!1);return y(ne,{label:e.label,children:[t.changes.map(o=>r(Qu,{change:o,includeLabel:e.includeLabel(o.name),onInclude:a=>e.onInclude(o.key,a),disabled:e.disabled},o.key)),t.manual.map(o=>r(ee,{leading:r(we,{kind:Xu[o.type]}),name:o.name,meta:r(W,{parts:[Zu[o.type],o.scheme]}),end:r("span",{className:"syncify-change-label syncify-cap",children:"Add manually"})},`${o.type}:${o.name}`)),t.unchanged.length>0?r(ee,{name:y("span",{className:"syncify-change-fold",children:[t.unchanged.length," more stay the same"]}),end:r(E,{variant:"text","aria-expanded":n,onClick:()=>i(!n),children:n?"Hide":"Show"})}):null,n?t.unchanged.map(o=>r(ed,{item:o},o.key)):null]})}function Qu(e){let{change:t}=e;return r(ee,{leading:r(we,{kind:qa[t.type]}),name:t.name,meta:t.note?r(W,{parts:[t.note]}):void 0,end:y(B,{children:[r("span",{className:"syncify-change-label syncify-cap","data-change":t.fixed?void 0:t.change,children:t.fixed?"Stays off":t.change}),t.optional&&!t.fixed?r(yi,{checked:t.included,onChange:e.onInclude,label:e.includeLabel,disabled:e.disabled}):null]})})}function ed(e){return r(ee,{leading:r(we,{kind:qa[e.item.type]}),name:e.item.name,meta:e.item.note?r(W,{parts:[e.item.note]}):void 0})}var Va={Adds:0,Updates:1,Removes:2},td=["blocked","host","repo","catalog","unchecked"];function kn(e,t,n){var l,d;let{optional:i,allowed:o}=n,a=(l=n.fixed)!=null?l:new Set,s=[],c=[];for(let u of e.items){let f=t.get(u.key),g=i.has(u.key)||a.has(u.key),w={key:u.key,name:u.name,type:u.type,note:f?Ci(f):a.has(u.key)?"Not in Marketplace's list":n.unapproved&&g?"Not approved":null},v=u.change==="added"?"Adds":u.change==="removed"?"Removes":u.isNew?"Updates":null;if(v){let h=a.has(u.key);s.push(S(m({},w),{change:v,optional:g,fixed:h,included:!g||!h&&o.has(u.key)}))}else c.push(w)}return s.sort((u,f)=>Va[u.change]-Va[f.change]),{changes:s,unchanged:c,manual:e.manual,warnings:[...nd(s,t,(d=n.verb)!=null?d:"Restore"),...id(s)],count:s.filter(u=>u.included).length}}function Sn(e,t){return t===0?e:t===1?`${e} 1 change`:`${e} ${t} changes`}function Ci(e){switch(e.kind){case"host":return`Code from ${e.host}`;case"repo":return`Code from ${e.repo}`;case"blocked":return"Blocked by Marketplace";case"catalog":return"Not in Marketplace";case"unchecked":return"Not checked";case"custom":return"Custom"}}function nd(e,t,n){var o;let i=new Map;for(let a of e){if(a.change==="Removes"||a.fixed)continue;let s=t.get(a.key);!s||!qe(s)&&s.kind!=="unchecked"||i.set(s.kind,[...(o=i.get(s.kind))!=null?o:[],a.name])}return td.flatMap(a=>{let s=i.get(a);return s?[od(a,s,n)]:[]})}function id(e){let t=e.filter(n=>n.fixed).map(n=>n.name);return t.length===0?[]:[t.length===1?`${hn(t)} isn't in Marketplace's list anymore, so it stays off.`:`${hn(t)} aren't in Marketplace's list anymore, so they stay off.`]}function od(e,t,n){let i=t.length===1,o=hn(t),a=i?`${n} it only if you trust it.`:`${n} them only if you trust them.`;switch(e){case"blocked":return`${o} ${i?"is":"are"} on Marketplace's block list. ${a}`;case"host":return`${o} ${i?"loads from a site":"load from sites"} outside GitHub. ${a}`;case"repo":return i?`${o} loads its code from a different repo than the one it names. ${a}`:`${o} load their code from different repos than the ones they name. ${a}`;case"catalog":return`${o} ${i?"isn't":"aren't"} in Marketplace's catalog. ${a}`;default:return`GitHub couldn't be reached to check ${o}. ${a}`}}function Ga(e,t,n){var h;let[i,o]=p(()=>new Set),[a,s]=p(null),c=Z(()=>Yt(et(e),e.spicetify_config,t,n),[e,t,n]),l=Z(()=>Ve(c.items),[c]);_(()=>{let k=!0;return Ge(c.items,l).then(b=>{k&&s({for:e,checks:b})}),()=>{k=!1}},[e,c,l]);let d=(a==null?void 0:a.for)===e?a.checks:null,u=Z(()=>new Map([...d!=null?d:[],...l]),[d,l]),f=((h=e.backup)==null?void 0:h.kind)==="quarantined",g=Z(()=>new Set(c.items.filter(k=>{var b;return k.change!=="removed"&&k.isNew&&(f||qe(u.get(k.key))||((b=u.get(k.key))==null?void 0:b.kind)==="unchecked")}).map(k=>k.key)),[c,u,f]),w=Z(()=>kn(c,u,{optional:g,allowed:i,unapproved:f}),[c,u,g,i,f]);function v(k,b){let I=new Set(i);b?I.add(k):I.delete(k),o(I)}return{preview:c,changes:w,unapproved:f,checking:d===null,skipped:[...g].filter(k=>!i.has(k)),allow:v}}function Ja(e){let{row:t,local:n}=e,i=V("restore-heading"),o=Ga(t.backup,n.items,n.spicetifyConfig),{changes:a}=o,s=!n.marketplaceAvailable;_(()=>{var l;(l=document.getElementById(i))==null||l.focus()},[i]);let c=y(B,{children:[r(E,{variant:"secondary",onClick:e.onCancel,disabled:e.restoring,children:"Cancel"}),r(E,{onClick:()=>e.onRestore({row:t,skipped:o.skipped,manual:o.preview.manual}),disabled:e.busy||o.checking||s,children:e.restoring?"Restoring\u2026":o.checking?"Checking\u2026":Sn("Restore",a.count)})]});return y(te,{idBase:e.idBase,id:"backups",actions:c,children:[r(ce,{title:`Restore ${t.title}`,id:i,focusable:!0}),s?r(K,{tone:"warning",children:"Install Spicetify Marketplace to restore a backup."}):null,o.unapproved?r(K,{tone:"warning",children:"An install this Spotify account hasn't approved made this backup. Its items stay off unless you turn them on."}):null,r(bn,{changes:a,label:"What this restore changes",includeLabel:l=>`Restore ${l}`,onInclude:o.allow,disabled:e.busy}),a.warnings.map(l=>r(K,{tone:"warning",children:l},l)),e.localIsUnsaved?r(K,{tone:"warning",children:"Your current setup isn't backed up."}):null]})}function Xa(e){var I,H,L,P,O;let{remote:t,local:n}=e,i=V("backup"),[o,a]=p(null),[s,c]=p(null),l=F(null);if(_(()=>{var C;s||!l.current||((C=document.getElementById(l.current))==null||C.focus(),l.current=null)},[s]),s&&n)return r(Ja,{idBase:e.idBase,row:s,local:n,localIsUnsaved:n.installedItemCount>0&&!rd(n.hash,t),busy:e.busy,restoring:e.restoring,onCancel:()=>c(null),onRestore:C=>{var M;return e.onRestore(S(m({},C),{linkedHash:(M=o==null?void 0:o.hash)!=null?M:null}))}},s.backup.payload_hash);async function d(C){if(!C){a(null);return}a({hash:C,remote:null});try{let M=await Ae(e.config,C);a({hash:C,remote:M})}catch(M){a(null),e.onError(M)}}let u=o?o.remote:t,f=(I=n==null?void 0:n.hash)!=null?I:null,g=C=>`${i}-${C.backup.payload_hash}`,w=(C,M)=>C.map(Y=>Ya(Y,M,f)),v=w((H=u==null?void 0:u.backups)!=null?H:[],"backup"),h=w(u!=null&&u.safetyCopy?[u.safetyCopy]:[],"safety-copy"),k=o?[]:w((L=t==null?void 0:t.unapproved)!=null?L:[],"unapproved");function b(C){return r(ee,{id:g(C),name:C.name,nameMark:C.kind==="safety-copy"?r(gi,{className:"syncify-safety-mark"}):C.kind==="unapproved"?r(he,{tone:"warning"}):void 0,meta:r(W,{parts:C.meta}),end:C.current?r("span",{className:"syncify-row-status syncify-cap",children:"Current"}):void 0,onOpen:C.current?void 0:()=>{l.current=g(C),c(C)},openLabel:`Preview restore of ${C.title}`,disabled:e.busy},`${C.kind}-${C.backup.payload_hash}-${C.backup.metadata.last_sync_datetime}`)}return y(te,{idBase:e.idBase,id:"backups",children:[e.notices,n&&!n.marketplaceAvailable?r(K,{tone:"warning",children:"Install Spicetify Marketplace to restore a backup."}):null,!e.lockedBy&&e.otherAccounts.length>0?r(De,{label:"Show backups from",children:r(Be,{label:"Show backups from",trigger:{value:(O=(P=e.otherAccounts.find(C=>C.hash===(o==null?void 0:o.hash)))==null?void 0:P.label)!=null?O:"This Spotify account"},items:[{hash:null,label:"This Spotify account"},...e.otherAccounts].map(C=>{var M;return{label:C.label,checked:((M=o==null?void 0:o.hash)!=null?M:null)===C.hash,onSelect:()=>{d(C.hash)}}}),disabled:e.busy})}):null,e.lockedBy?r("p",{className:"syncify-tab-text",children:e.lockedBy==="not_owner"?"Sign in with the account that secured them":"Sign in to see and restore your backups"}):(!t||!n)&&e.failed?null:!t||!n||o&&!o.remote?y(ne,{label:"Loading backups",children:[r(ve,{}),r(ve,{})]}):v.length+h.length+k.length===0?o?r("p",{className:"syncify-tab-text",children:"No backups yet."}):null:y(ne,{label:"Backups",children:[v.map(b),h.length>0?r(fn,{}):null,h.map(b),k.length>0?r(fn,{}):null,k.map(b)]})]})}function rd(e,t){return t?[...t.backups,...t.safetyCopy?[t.safetyCopy]:[]].some(n=>n.payload_hash===e):!1}var ad=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function Za(e){let{config:t}=e,n=e.busy,i=e.unsupported,[o,a]=p(!1),[s,c]=p(null),[l]=p(()=>Vr()),d=F(null);_(()=>{if(!o)return;let h=k=>{var I;if(!((I=d.current)!=null&&I.isConnected)){a(!1),c(null);return}k.preventDefault(),k.stopImmediatePropagation();let b=Wr(k);if(b.kind!=="ignore"){if(b.kind==="cancel"){a(!1),c(null);return}if(b.kind==="error"){c(b.message);return}if(jr(b.shortcut)){c(`${rn(b.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}a(!1),g(b.shortcut)}};return window.addEventListener("keydown",h,!0),()=>window.removeEventListener("keydown",h,!0)},[o,t]);function u(h){Jr(h),e.onConfigChange(h)}function f(h){u(S(m({},t),{autoBackupEnabled:h}))}function g(h){u(S(m({},t),{shortcut:h})),ti(h),c(null)}function w(h){u(S(m({},t),{entryPoint:h})),sn(h)}function v(){c(null),a(!0)}return r(te,{idBase:e.idBase,id:"settings",children:y("div",{className:"syncify-panel",ref:d,children:[y("label",{className:"syncify-setting",children:[y("span",{className:"syncify-setting-text",children:[r("span",{children:"Back up automatically"}),r("span",{className:"syncify-muted",children:"When Spotify starts and something has changed"})]}),r("input",{className:"syncify-switch",type:"checkbox",role:"switch",checked:t.autoBackupEnabled&&!i,onChange:h=>f(h.currentTarget.checked),disabled:n||i})]}),y("label",{className:"syncify-setting",children:[y("span",{className:"syncify-setting-text",children:[r("span",{children:"Open Syncify from"}),l?t.entryPoint==="menu"&&!t.shortcut?r("span",{className:"syncify-muted",children:"Keep a shortcut in case a Spotify update breaks the menu"}):null:r("span",{className:"syncify-muted",children:"The profile menu isn't available in this Spicetify version"})]}),y("span",{className:"syncify-select-field",children:[r("select",{className:"syncify-select",value:l?t.entryPoint:"topbar",onChange:h=>w(h.currentTarget.value),disabled:!l,children:ad.map(h=>r("option",{value:h.value,children:h.label},h.value))}),r(La,{})]})]}),y("div",{className:"syncify-setting",children:[y("span",{className:"syncify-setting-text",children:[r("span",{children:"Keyboard shortcut"}),o&&!s?r("span",{className:"syncify-muted",children:"Press a key combination, or Esc to cancel"}):null]}),y("span",{className:"syncify-shortcut",children:[t.shortcut&&!o?r("button",{className:"syncify-text-button",type:"button",onClick:()=>g(null),children:"Turn off"}):null,!t.shortcut&&!o?r("button",{className:"syncify-text-button",type:"button",onClick:()=>g(Xe),children:"Use default"}):null,r("button",{className:"syncify-key",type:"button","data-recording":o?"true":"false",onClick:()=>o?a(!1):v(),title:"Click to change",children:o?"Press keys\u2026":t.shortcut?rn(t.shortcut):"Off"})]})]}),s?r("div",{className:"syncify-alert",role:"alert",children:s}):null]})})}function ie(e){if(e.startsWith("mailto:")){window.location.href=e;return}window.open(e,"_blank","noopener,noreferrer")}function Tt(e){let t=`${$().webUrl.replace(/\/+$/,"")}/discover`;return e?`${t}?post=${encodeURIComponent(e)}`:t}function nt(e){var t;return(t=e.name)!=null?t:pe(e.code)}function Qa(e){return[`Used by ${e.imports}`,...e.posted?["On Discover"]:[]]}function es(e){let t=e.posted?"The code stops working and its Discover post comes down.":"The code stops working.";return e.imports===0?t:`${t} ${e.imports===1?"1 person":`${e.imports} people`} used it.`}var wn=12;function ts(e){return[...Array(Math.min(e.extensions,wn)).fill("extension"),...Array(Math.min(e.themes,wn)).fill("theme"),...Array(Math.min(e.snippets,wn)).fill("snippet")].slice(0,wn)}var sd={extension:"extension",theme:"theme",snippet:"snippet"};function ns(e){var l,d;let{compose:t}=e,n=V("compose-heading"),i=(d=(l=t.compose)==null?void 0:l.code)!=null?d:null,{draft:o,saving:a}=t;_(()=>{var u;(u=document.getElementById(n))==null||u.focus()},[n]);let s=o?[...o.items].sort((u,f)=>Number(o.leftOut.has(f.key))-Number(o.leftOut.has(u.key))||u.name.localeCompare(f.name)):[],c=y(B,{children:[r(E,{variant:"secondary",onClick:t.cancel,disabled:a,children:"Cancel"}),r(E,{onClick:()=>{t.save()},disabled:!o||t.included.length===0||a,children:o?a?i?"Updating\u2026":"Creating\u2026":i?"Update code":"Create code":"Checking\u2026"})]});return y(te,{idBase:e.idBase,id:"share",actions:c,children:[r(ce,{title:i?`Update ${nt(i)}`:"Create a code",id:n,focusable:!0}),t.error?r(K,{tone:"error",children:t.error}):null,r(Ze,{label:"Setup name (optional)",value:t.name,onChange:t.setName,maxLength:vr,disabled:a}),t.askHandle?r(Ze,{label:"Pick a handle for your profile",value:t.handle,onChange:t.setHandle,onBlur:t.checkHandle,error:t.handleError,prefix:"@",maxLength:Vn,disabled:a}):null,o&&t.included.length===0?r(K,{tone:"warning",children:"Nothing here can go in a code. Add something from Marketplace first."}):null,r(ce,{title:"What goes in",end:o?r(W,{parts:[Oe(t.included.length)]}):void 0}),o?r(ne,{label:"What goes in",children:s.map(u=>{let f=o.leftOut.get(u.key),g=[f?Ci(f):null,u.repo].filter(Boolean);return r(ee,{leading:r(we,{kind:sd[u.type]}),name:u.name,meta:g.length>0?r(W,{parts:g}):void 0,end:f?r("span",{className:"syncify-change-label syncify-cap",children:"Left out"}):void 0},u.key)})}):y(ne,{label:"Checking your items",children:[r(ve,{}),r(ve,{})]})]})}var is=[["add","Add to my setup"],["replace","Replace my setup"]];function os(e){var c,l,d,u;let{load:t}=e,n=V("share-heading"),i=(c=t.shared)==null?void 0:c.file;if(_(()=>{var f;(f=document.getElementById(n))==null||f.focus()},[n]),!i||!t.changes)return null;let o=e.marketplaceAvailable===!1,a=i.creator,s=y(B,{children:[r(E,{variant:"secondary",onClick:t.close,disabled:t.applying,children:"Cancel"}),r(E,{onClick:()=>{t.apply()},disabled:t.applying||t.checking||e.busy||o,children:t.applying?"Loading\u2026":t.checking?"Checking\u2026":Sn("Load",t.changes.count)})]});return y(te,{idBase:e.idBase,id:"share",actions:s,children:[r(ce,{title:`Load ${(l=i.name)!=null?l:pe(i.code)}`,id:n,focusable:!0,end:a?r(E,{variant:"text",onClick:()=>ie(nn(a)),children:`by @${a}`}):void 0}),t.applyError?r(K,{tone:"error",children:t.applyError}):null,o?r(K,{tone:"warning",children:"Install Spicetify Marketplace to load a setup."}):null,r(De,{label:"How to load it",children:r(Be,{label:"How to load it",trigger:{value:(u=(d=is.find(([f])=>f===t.mode))==null?void 0:d[1])!=null?u:""},items:is.map(([f,g])=>({label:g,checked:t.mode===f,onSelect:()=>t.setMode(f)})),disabled:t.applying})}),r(bn,{changes:t.changes,label:"What loading it changes",includeLabel:f=>`Load ${f}`,onInclude:t.allow,disabled:t.applying}),t.theme?r(K,{tone:"info",children:`Your theme switches to ${t.theme.name}.`}):null,t.changes.warnings.map(f=>r(K,{tone:"warning",children:f},f))]})}function rs(e){let[t,n]=p(null),[i,o]=p(null),[a,s]=p(""),[c,l]=p(""),[d,u]=p(!1),[f,g]=p(!1),[w,v]=p(null),[h,k]=p(null),b=F(0),[I,H]=p(e.token);I!==e.token&&(H(e.token),n(null),o(null),k(null));let L=t!==null&&t.code===null&&!e.hasHandle,P=L&&d?Gn(c):null,O=i?i.items.filter(R=>!i.leftOut.has(R.key)):[];async function C(R){var J,G;let U=++b.current;n({code:R}),s((J=R==null?void 0:R.name)!=null?J:""),l((G=e.suggestedHandle)!=null?G:""),u(!1),o(null),v(null),k(null);try{let X=await ue(),be=await Er(Q(X),X);U===b.current&&o(m({keys:X},be))}catch(X){if(U!==b.current)return;n(null),v(X instanceof Error?X.message:String(X))}}function M(){b.current+=1,n(null),o(null)}function Y(){n(null),o(null)}async function N(){if(!t||!i)return;if(L&&Gn(c)){u(!0);return}g(!0),v(null);let R=Nr(i.keys,O);try{let U=t.code?await Ar(t.code.code,a.trim(),R):await _r(a.trim(),R,L?c.trim():void 0);k(S(m({},U),{outcome:t.code?"updated":"created"})),Y(),await e.reload()}catch(U){if(U instanceof A&&U.code==="same_setup"&&U.share){k(S(m({},U.share),{leftOut:0,outcome:"existing"})),Y();return}e.fail(U,v),U instanceof A&&U.code==="publish_failed"&&(n(null),e.reload())}finally{g(!1)}}return{compose:t,draft:i,included:O,name:a,setName:s,askHandle:L,handle:c,setHandle:R=>l(R.replace(/^@/,"")),checkHandle:()=>u(!0),handleError:P,saving:f,error:w,saved:h,dismissSaved:()=>k(null),forgetSaved:R=>k(U=>(U==null?void 0:U.code)===R?null:U),start:C,cancel:M,save:N}}function _t(e){let t=F(e);return st(()=>{t.current=e}),t}function as(e){var P;let[t,n]=p(null),[i,o]=p(null),[a,s]=p(null),[c,l]=p(null),[d,u]=p(0),f=F(!1),[g,w]=p(null),[v,h]=p(!1);function k(O,C){C(wt(O,i)),O instanceof A&&O.code==="signed_out"&&e.onSignedOut()}async function b(){var O,C;w(null);try{let M=await tn();n(M.codes),f.current||(f.current=!0,u(M.newHearts)),e.onCodeCount(M.codes.length),o(M.max),s(M.profile),e.onHandle((C=(O=M.profile)==null?void 0:O.handle)!=null?C:null),l(M.suggestedHandle)}catch(M){k(M,w)}}async function I(O){h(!0),w(null);try{return await Mr(O),await b(),!0}catch(C){return k(C,w),!1}finally{h(!1)}}let H=_t(O=>{n(null),f.current=!1,O&&b()}),L=(P=e.session)==null?void 0:P.token;return _(()=>H.current(L!==void 0),[H,L]),{codes:t,max:i,atMax:t!==null&&i!==null&&t.length>=i,profile:a,suggestedHandle:c,newHearts:d,error:g,deleting:v,load:b,remove:I,fail:k}}function ss(e){let[t,n]=p(""),[i,o]=p(null),[a,s]=p(null),[c,l]=p(null),[d,u]=p(null),[f,g]=p("add"),[w,v]=p(()=>new Set),[h,k]=p(null),[b,I]=p(void 0),[H,L]=p(!1),P=Z(()=>d?Rr(d.file,d.items,e.localItems,e.localConfig,e.localTheme,f):null,[d,e.localItems,e.localConfig,e.localTheme,f]),O=Z(()=>{if(!P||!d)return null;let D=new Set(d.items.map(T=>T.key));return P.items.filter(T=>T.change!=="removed"&&D.has(T.key)&&(f==="replace"||T.isNew))},[P,d,f]),C=Z(()=>O?Ve(O):null,[O]),M=h&&h.for===O?h.checks:null,Y=Z(()=>new Map([...M!=null?M:[],...C!=null?C:[]]),[M,C]),N=Z(()=>P&&b!==void 0?Pr(P,b):new Set,[P,b]),R=Z(()=>{var D;return new Set(((D=P==null?void 0:P.items)!=null?D:[]).filter(T=>{var j;return T.change!=="removed"&&T.isNew&&(qe(Y.get(T.key))||((j=Y.get(T.key))==null?void 0:j.kind)==="unchecked")}).map(T=>T.key))},[P,Y]),U=Z(()=>P?kn(P,Y,{optional:R,allowed:w,fixed:N,verb:"Load"}):null,[P,Y,R,w,N]),J=P!=null&&P.theme&&!N.has(P.theme.key)&&(!R.has(P.theme.key)||w.has(P.theme.key))?P.theme:null,G=P!==null&&(M===null||b===void 0);_(()=>{if(!O||!C)return;let D=!0;return Ge(O,C).then(T=>{D&&k({for:O,checks:T})}),()=>{D=!1}},[O,C]);async function X(D){let T=D!=null?D:Cr(t);if(s(null),l(null),u(null),!T){s(wt(new A("no_code")));return}o({code:T,pick:D!==void 0});try{let j=await Lr(T);g("add"),v(new Set),u({file:j,items:Q(j.keys),pick:D!==void 0}),qn().then(I)}catch(j){s(wt(j))}finally{o(null)}}function be(D,T){let j=new Set(w);T?j.add(D):j.delete(D),v(j)}async function xe(){if(!d||!P)return;L(!0),l(null);let D=[...new Set([...R,...N])].filter(T=>N.has(T)||!w.has(T));try{await Qr(e.config,d.file,f,D,b!=null?b:null,d.pick),Spicetify.showNotification("Syncify: setup loaded. Reloading\u2026"),Pt(P.manual,"share"),setTimeout(()=>window.location.reload(),1e3)}catch(T){L(!1),l(cd(T))}}return{input:t,setInput:n,fetching:i,error:a,applyError:c,shared:d,close:()=>{u(null),l(null)},mode:f,setMode:g,changes:U,theme:J,checking:G,applying:H,open:X,allow:be,apply:xe}}function cd(e){if(e instanceof It){let t=e.reason instanceof se?"Sign in to back up.":e.reason instanceof Error?e.reason.message:String(e.reason);return`${e.message} ${t}`}return e instanceof Error?e.message:String(e)}async function vn(e){var t;try{return await navigator.clipboard.writeText(e),!0}catch(n){let i=(t=Spicetify.Platform)==null?void 0:t.ClipboardAPI;return i!=null&&i.copy?(await i.copy(e),!0):!1}}var ld=2e3;function cs(e){let{codes:t,compose:n}=e,[i,o]=p(null),[a,s]=p(null);_(()=>{if(!a)return;let u=setTimeout(()=>s(null),ld);return()=>clearTimeout(u)},[a]);async function c(u,f){await vn(u)&&s(f)}async function l(){i&&await t.remove(i.code)&&(n.forgetSaved(i.code),o(null))}let d=t.codes;return y("section",{className:"syncify-share-part","aria-label":"Your codes",children:[r(ce,{title:y(B,{children:["Your codes",t.newHearts>0?r("span",{className:"syncify-share-hearts",children:Ue(t.newHearts,"new heart")}):null]}),end:d&&t.max!==null?r(Si,{used:d.length,max:t.max,label:"Share codes"}):void 0}),t.error?r(K,{tone:"error",actions:r(E,{variant:"text",onClick:()=>{t.load()},children:"Try again"}),children:t.error}):null,n.saved?r(ud,{saved:n.saved,copied:a,onCopy:(u,f)=>{c(u,f)},discoverOpen:e.discoverOpen,onDismiss:n.dismissSaved}):null,n.error&&!n.compose?r(K,{tone:"error",children:n.error}):null,d===null?t.error?null:r(ne,{label:"Loading your codes",children:r(ve,{})}):d.length>0?r(ne,{label:"Your codes",children:d.map(u=>r(ee,{name:nt(u),meta:r(W,{parts:[u.name?r("code",{className:"syncify-share-code",children:pe(u.code)}):null,...Qa(u)]}),end:y("span",{className:"syncify-share-code-actions",children:[r(E,{variant:"text",onClick:()=>{c(pe(u.code),`code:${u.code}`)},children:a===`code:${u.code}`?"Copied":"Copy"}),u.link?r(E,{variant:"text",onClick:()=>{var f;c((f=u.link)!=null?f:"",`link:${u.code}`)},children:a===`link:${u.code}`?"Copied":"Get link"}):null,r(Be,{trigger:"more",label:`More for ${nt(u)}`,disabled:n.compose!==null||t.deleting,items:[{label:"Update",onSelect:()=>{n.start(u)}},...e.discoverOpen&&!u.posted?[{label:"Post to Discover",onSelect:()=>ie(Tt(u.code))}]:[],{label:"Delete",danger:!0,onSelect:()=>o(u)}]})]})},u.code))}):null,d!==null?r("div",{className:"syncify-share-create",children:r(E,{variant:"secondary",onClick:()=>{n.start(null)},disabled:n.compose!==null||t.atMax||e.marketplaceAvailable===!1,children:"Create a code"})}):null,r(fi,{open:i!==null,onClose:()=>o(null),title:i?`Delete ${nt(i)}`:"",actions:y(B,{children:[r(E,{variant:"secondary",onClick:()=>o(null),disabled:t.deleting,children:"Keep it"}),r(E,{variant:"danger",onClick:()=>{l()},disabled:t.deleting,children:t.deleting?"Deleting\u2026":"Delete code"})]}),children:i?es(i):null})]})}function ud(e){let{saved:t}=e,n=pe(t.code),i=t.link,o=t.outcome==="existing"?"You shared this setup already as":t.outcome==="updated"?"Code updated:":"Your code is ready:";return y(K,{tone:"info",live:!0,actions:y(B,{children:[r(E,{variant:"text",onClick:()=>e.onCopy(n,"saved-code"),children:e.copied==="saved-code"?"Copied":"Copy"}),i?r(E,{variant:"text",onClick:()=>e.onCopy(i,"saved-link"),children:e.copied==="saved-link"?"Copied":"Get link"}):null,t.outcome==="created"&&e.discoverOpen?r(E,{variant:"text",onClick:()=>ie(Tt(t.code)),children:"Post to Discover"}):null,r(E,{variant:"subtle",onClick:e.onDismiss,children:"Dismiss"})]}),children:[y("span",{children:[o," ",r("code",{className:"syncify-share-code",children:n})]}),t.leftOut>0?r("span",{className:"syncify-share-left-out",children:t.leftOut===1?"1 snippet isn't in Marketplace's list anymore, so it was left out.":`${t.leftOut} snippets aren't in Marketplace's list anymore, so they were left out.`}):null]})}function ls(e){let{session:t}=e,n=ss(e),i=as(e),o=rs({token:t==null?void 0:t.token,hasHandle:i.profile!==null,suggestedHandle:i.suggestedHandle,reload:i.load,fail:i.fail}),[a,s]=p(null);if(_(()=>{Br().then(s)},[]),n.shared)return r(os,{idBase:e.idBase,load:n,marketplaceAvailable:e.marketplaceAvailable,busy:e.busy});if(o.compose)return r(ns,{idBase:e.idBase,compose:o});let c=n.input.trim();return y(te,{idBase:e.idBase,id:"share",children:[r("form",{className:"syncify-share-part",noValidate:!0,onSubmit:l=>{l.preventDefault(),!n.fetching&&c&&n.open()},children:r(Ze,{label:"Load a setup",value:n.input,onChange:n.setInput,placeholder:"Paste a code or a link",error:n.error,action:r(E,{variant:"secondary",type:"submit",disabled:n.fetching!==null||!c,children:n.fetching&&!n.fetching.pick?"Loading\u2026":"Load"})})}),a?y("section",{className:"syncify-share-part","aria-label":a.length>0?"Syncify picks":"Discover",children:[a.length>0?r(ce,{title:"Syncify picks"}):null,y(ne,{children:[a.map(l=>{var d;return r(ee,{name:l.name,meta:r(W,{parts:[r("span",{className:"syncify-share-pips",children:ts(l).map((u,f)=>r(we,{kind:u},f))},"pips"),((d=n.fetching)==null?void 0:d.code)===l.code?"Loading\u2026":Ue(l.extensions+l.themes+l.snippets,"item")]}),onOpen:()=>{n.open(l.code)},openLabel:`Preview ${l.name}`,disabled:n.fetching!==null},l.code)}),r(ee,{name:"Find more setups on Discover",end:r(E,{variant:"secondary",size:"small",onClick:()=>ie(Tt()),children:"Open"})})]})]}):null,t===void 0?null:t===null?r("div",{className:"syncify-share-part",children:r(De,{label:"Sign in to share this setup as a code",children:r(E,{variant:"secondary",onClick:e.onSignIn,children:"Sign in"})})}):r(cs,{codes:i,compose:o,discoverOpen:a!==null,marketplaceAvailable:e.marketplaceAvailable})]})}var Ii="syncify:share-code-count",Ei="syncify:handle";function dd(){var t,n;let e=Number((n=(t=Spicetify.LocalStorage)==null?void 0:t.get(Ii))!=null?n:NaN);return Number.isInteger(e)&&e>=0?e:null}function yd(){var t;let e=(t=Spicetify.LocalStorage)==null?void 0:t.get(Ei);return e==null?void 0:e||null}function us(){let[e,t]=p(()=>dd()),[n,i]=p(()=>yd()),o=oe(c=>{var l,d;c===null?(l=Spicetify.LocalStorage)==null||l.remove(Ii):(d=Spicetify.LocalStorage)==null||d.set(Ii,String(c)),t(c)},[]),a=oe(c=>{var l,d;c===void 0?(l=Spicetify.LocalStorage)==null||l.remove(Ei):(d=Spicetify.LocalStorage)==null||d.set(Ei,c!=null?c:""),i(c)},[]),s=oe(()=>{o(null),a(void 0)},[o,a]);return{codeCount:e,handle:n,saveCodeCount:o,saveHandle:a,forget:s}}var fd=2e3;function ds(e){let{install:t}=e,n=!t||t.trusted?null:t.refused?"This Spotify account refused backups from this install. Sign in to back up from it.":"This install isn't approved yet. Its backups are kept apart until you approve it from another install or sign in.";return y(B,{children:[e.nudge?r(K,{tone:"warning",actions:y(B,{children:[r(E,{variant:"subtle",onClick:e.onHideNudge,disabled:e.securing,children:"Not now"}),r(E,{size:"small",onClick:e.onSecure,disabled:e.securing,children:e.securing?"Securing\u2026":"Secure"})]}),children:"Your backup isn't secured. Anyone who knows your Spotify username can restore it."}):null,n?r(K,{tone:"info",children:n}):null,e.restoreResult?r(pd,{manual:e.restoreResult.manual}):null]})}function pd(e){let[t,n]=p(!1),i=xa(e.manual).join(`
`);if(_(()=>{if(!t)return;let a=setTimeout(()=>n(!1),fd);return()=>clearTimeout(a)},[t]),!i)return null;let o=e.manual.length;return y(K,{tone:"info",actions:y(B,{children:[r(E,{variant:"text",onClick:()=>{vn(i).then(n)},children:t?"Copied":"Copy"}),r(E,{variant:"subtle",onClick:ka,children:"Dismiss"})]}),children:[o===1?"1 isn't from Marketplace. Add it in a terminal:":`${o} aren't from Marketplace. Add them in a terminal:`,r("pre",{className:"syncify-commands",children:r("code",{children:i})})]})}function ys(e){let{message:t}=e;return r(K,{tone:t.kind,actions:y(B,{children:[t.kind==="error"?r(E,{variant:"text",onClick:e.onTryAgain,disabled:e.busy,children:"Try again"}):null,r(E,{variant:"subtle",onClick:e.onDismiss,children:"Dismiss"})]}),children:t.text})}function fs(e){let t=md(e);return t.backedUp&&e.latest?S(m({},t),{line:[`Backed up ${tt(e.latest.metadata.last_sync_datetime)}`,`${Oe(e.localItemCount)} on this device`]}):S(m({},t),{line:[t.title,...t.detail]})}function md(e){let t={backedUp:!1,supportAsk:null},n=`${Oe(e.localItemCount)} on this device`;return e.restoreResult&&!e.unsupported?gd(e.restoreResult):e.unsupported?S(m({},t),{title:"Update Syncify to keep backing up",detail:["Your backups are safe"],action:"how-to-update"}):e.locked?S(m({},t),{title:"Sign in to restore",detail:[e.locked==="not_owner"?"Secured by another account":"This backup is secured"],action:"sign-in"}):e.activity==="backing-up"?S(m({},t),{title:"Backing up\u2026",detail:[],action:"back-up"}):e.checked?e.latest?e.localHash&&!e.backedUp?S(m({},t),{title:"Changes since your last backup",detail:hd(e.latest,e.latestItems,e.localItems,e.localConfig),action:"back-up"}):S(m({},t),{title:"Everything is backed up",detail:[`Last backup ${tt(e.latest.metadata.last_sync_datetime)}`,n],action:null,backedUp:!0}):S(m({},t),{title:"No backup yet",detail:["Save your extensions and themes to restore them after a reinstall or on another computer."],action:"back-up"}):e.checkError?S(m({},t),{title:"Couldn't check your backup",detail:[e.checkError],action:"try-again"}):S(m({},t),{title:"Checking your backup\u2026",detail:[],action:null})}function gd(e){let t=e.loaded===e.total,n=e.kind==="share";return{title:t?n?"Setup loaded":"Backup restored":`${n?"Loaded":"Restored"} ${e.loaded} of ${e.total}`,detail:[t?e.total===0?"Nothing from Marketplace to load":`${e.loaded} of ${e.total} loaded`:"Missing something? Reload Spotify once more."],action:t?null:"reload",backedUp:!1,supportAsk:t?n?"Syncify set it up for you?":"Syncify saved your setup?":null}}function hd(e,t,n,i){var f;let o=new Set(t),a=new Set(n),s=n.filter(g=>!o.has(g)).length,c=t.filter(g=>!a.has(g)).length,l=(f=e.spicetify_config)!=null?f:null,d=!!(i&&!l),u=!d&&(i&&l?!tr(i,l):i!==l);return[s?`${s} added`:null,c?`${c} removed`:null,u?"Spicetify config changed":null,d?"Spicetify config not saved yet":null,`Last backup ${tt(e.metadata.last_sync_datetime)}`].filter(g=>g!==null)}function ps(e,t){return(e==null?void 0:e.status)==="pending"&&!e.mine?S(m({kind:"claim"},xi(e)),{canAnswer:!e.not_me}):t?{kind:"install",title:mn(t),install:t}:null}var bd=3,Ni={exists:!1,payload:null,backups:[],safetyCopy:null,claim:null,unapproved:[],install:null,nudge:!1},He=null;function ms(e){var u,f,g;let[t,n]=p(()=>He),[i,o]=p(void 0),a=oe(w=>{He=w,n(w)},[]),s=oe(async()=>{let w,v=null;try{w=await Ae(e)}catch(I){if(!(I instanceof se))throw I;w=Ni,v=I.code}let h=await ae().catch(()=>null),k=h?await ea(e).catch(()=>null):null,b=h?await ae().catch(()=>null):null;return a({remote:w,lockedBy:v,claims:b?k:null}),o(b),v},[e,a]),c=oe(()=>{ae().catch(()=>null).then(w=>o(v=>v!=null?v:w))},[]),l=oe(w=>{var k;let v=He!=null?He:{remote:Ni,lockedBy:null,claims:null},{remote:h}=v;a(S(m({},v),{remote:S(m({},h),{exists:!0,payload:w,backups:[w,...h.backups.filter(b=>b.payload_hash!==w.payload_hash)].slice(0,bd),safetyCopy:((k=h.safetyCopy)==null?void 0:k.payload_hash)===w.payload_hash?null:h.safetyCopy})}))},[a]),d=oe(()=>{o(null),He&&a(S(m({},He),{claims:null}))},[a]);return{check:t,remote:(u=t==null?void 0:t.remote)!=null?u:Ni,lockedBy:(f=t==null?void 0:t.lockedBy)!=null?f:null,claims:(g=t==null?void 0:t.claims)!=null?g:null,session:i,setSession:o,refresh:s,readSession:c,addBackup:l,forgetClaims:d}}function gs(){let[e,t]=p(null),[n,i]=p(!1),o=oe(async()=>{try{let a=await Xt();return t(a),i(!1),a}catch(a){throw i(!0),a}},[]);return{local:e,localFailed:n,refreshLocal:o}}var kd=600*1e3;function hs(){let[e,t]=p(null);return _(()=>{let n=$();if(!li(n.version))return;let i=!0;return Ra(n.releasesUrl).then(o=>{i&&o&&ui(o,n.version)>0&&t(o)}),()=>{i=!1}},[]),e}function bs(){let[e,t]=p(()=>ha()),[n]=p(()=>Date.now());return _(()=>ba(t),[]),{result:e,recent:!!(e&&n-e.at<kd)}}function ks(e){let t=$(),n=[["Report an issue",t.issueUrl],["GitHub",t.githubUrl],["Discord",t.discordUrl],["Support on Ko-fi",t.kofiUrl]];return y("footer",{className:"syncify-window-footer",children:[y("span",{className:"syncify-window-footer-version",children:[y("span",{children:["Syncify ",t.version]}),e.newerVersion?r(E,{variant:"text",size:"tiny",className:"syncify-window-update",onClick:()=>e.loadedByLoader?window.location.reload():ie(`${t.githubUrl}#updating`),children:r(W,{parts:[`${e.newerVersion} is out`,e.loadedByLoader?"Reload":"How to update"]})}):null]}),r("span",{className:"syncify-window-footer-links",children:n.map(([i,o])=>r(E,{variant:"subtle",size:"tiny",onClick:()=>ie(o),children:i},i))})]})}var Sd={"back-up":"Back up now","try-again":"Try again","sign-in":"Sign in","how-to-update":"How to update",reload:"Reload"};function Ss(e){let{status:t,alert:n}=e,i=t.action,o=i?r(E,{variant:i==="back-up"||i==="sign-in"?"primary":"secondary",size:n?"small":"regular",onClick:()=>e.onAction(i),disabled:e.busy,children:i==="back-up"&&e.backingUp?"Backing up\u2026":Sd[i]}):null;return n?y("section",{className:"syncify-status","aria-label":"Status",children:[y("div",{className:"syncify-status-alert",role:"alert",children:[r("span",{className:"syncify-status-alert-mark",children:r(he,{tone:"warning",icon:r(bi,{})})}),y("div",{className:"syncify-status-text",children:[r("h2",{className:"syncify-status-title",children:n.title}),n.kind==="claim"&&n.text?r("p",{className:"syncify-status-sentence",children:n.text}):null]}),n.kind==="claim"?n.canAnswer?r(E,{variant:"secondary",onClick:e.onNotMe,disabled:e.answering,children:"Not me"}):null:y("span",{className:"syncify-status-answers",children:[r(E,{variant:"secondary",onClick:()=>e.onAnswerInstall("reject"),disabled:e.answering,children:"Not mine"}),r(E,{onClick:()=>e.onAnswerInstall("approve"),disabled:e.answering,children:"Approve"})]})]}),y("div",{className:"syncify-status-line","aria-live":"polite",children:[t.backedUp?r(Le,{className:"syncify-status-check"}):null,r(W,{parts:t.line}),o]})]}):r("section",{className:"syncify-status","aria-label":"Status",children:y("div",{className:"syncify-status-main","aria-live":"polite",children:[y("div",{className:"syncify-status-text",children:[r("h2",{className:"syncify-status-title",children:t.title}),t.detail.length>0?r(W,{parts:t.detail}):null,t.supportAsk?y("p",{className:"syncify-status-ask",children:[r("span",{children:t.supportAsk}),r(E,{variant:"text",onClick:e.onSupport,children:"Support it on Ko-fi"})]}):null]}),o]})})}function ws(e){let{codeCount:t,account:n,newerVersion:i}=e,o=[{id:"backups",label:"Backups"},{id:"share",label:"Share",status:t?r(ki,{count:t,label:Ue(t,"code")}):void 0},{id:"account",label:"Account",status:n?n.kind==="ok"?r("span",{className:"syncify-tab-check",role:"img","aria-label":n.label,children:r(Le,{})}):r(he,{tone:"warning",label:n.label}):void 0},{id:"settings",label:"Settings",status:i?r(he,{tone:"info",label:`Syncify ${i} is out`}):void 0}];return r(wi,{tabs:o,selected:e.selected,onSelect:e.onSelect,idBase:e.idBase,label:"Syncify"})}function Pi(e){var Li,Bi,Di,Oi,Ui,Hi,$i,Ki,zi,Fi,Wi,ji,Yi;let t=V("syncify"),n=$(),[i,o]=p(()=>de()),{local:a,localFailed:s,refreshLocal:c}=gs(),l=ms(i),d=us(),u=hs(),f=bs(),[g]=p(()=>Na()!==null),[w,v]=p((Li=e.tab)!=null?Li:"backups"),[h,k]=p(()=>l.check?"idle":"checking"),[b,I]=p(null),[H,L]=p(null),[P,O]=p(!1),[C,M]=p(!1),[Y,N]=p(!1),[R,U]=p(null),[J,G]=p(()=>oa()),[X,be]=p(e.secure===!0),xe=F(!1),{remote:D,lockedBy:T,claims:j,session:ye}=l,ot=h!=="idle",En=(Bi=a==null?void 0:a.hash)!=null?Bi:null,Ps=((Di=D.claim)==null?void 0:Di.status)==="pending"&&!D.claim.mine?D.claim:null,$e=$a(j,T,Ps!==null),Ts=!!(En&&D.backups.some(x=>x.payload_hash===En)),Ti=fs({activity:h,checked:l.check!==null,checkError:b,unsupported:P,locked:T,latest:D.payload,latestItems:D.payload?et(D.payload).map(x=>x.key):[],backedUp:Ts,localHash:En,localItems:(Oi=a==null?void 0:a.installedItems)!=null?Oi:[],localItemCount:(Ui=a==null?void 0:a.installedItemCount)!=null?Ui:0,localConfig:(Hi=a==null?void 0:a.spicetifyConfig)!=null?Hi:null,restoreResult:f.recent?f.result:null}),_s=ps(D.claim,(Ki=($i=D.install)==null?void 0:$i.waiting[0])!=null?Ki:null),As=!J&&!T&&D.payload!==null&&w!=="account"&&(ye?$e.kind==="open":ye===null&&D.nudge),Ms=(ye?(zi=j==null?void 0:j.accounts)!=null?zi:[]:[]).filter(x=>x.status==="final").map((x,q)=>({hash:x.hash,label:`Spotify account ${q+1}${x.device_info?` from ${x.device_info}`:""}`})).filter(x=>x.hash!==(j==null?void 0:j.hash));async function le(x={}){try{(!x.silent||!l.check)&&k("checking"),x.silent||(L(null),I(null)),await c(),await l.refresh()&&v("account"),I(null),k("idle")}catch(q){rt(q)}}function rt(x){if(k("idle"),x instanceof yt){O(!0),L(null);return}if(x instanceof Te){L({kind:"error",text:x.message}),le({silent:!0});return}if(x instanceof se&&x.code!=="not_linked"){L(null),le({silent:!0});return}let q=x instanceof Error?x.message:String(x);l.check?L({kind:"error",text:q}):I(q),Spicetify.showNotification(q,!0,6e3)}async function Ls(){try{k("backing-up"),L(null);let{payload:x,unchanged:q,unapproved:Ke}=await Et(i);if(await c(),Ke){await le({silent:!0}),L({kind:"warning",text:"Backed up, but kept apart until this install is approved."}),Spicetify.showNotification("Syncify: backed up, waiting for approval");return}q||l.addBackup(x),k("idle"),Spicetify.showNotification(q?"Syncify: everything is already backed up":"Syncify backup complete")}catch(x){rt(x)}}async function Bs(x){var q;try{k("restoring"),L(null),await Zr(i,x.row.backup,(q=x.linkedHash)!=null?q:void 0,x.skipped),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),Pt(x.manual),setTimeout(()=>window.location.reload(),1e3)}catch(Ke){rt(Ke)}}async function Ds(x){var Ke;let q=(Ke=D.install)==null?void 0:Ke.waiting[0];if(q){M(!0);try{await un(i,q.id,x),Spicetify.showNotification(x==="approve"?"Syncify: install approved":"Syncify: install refused"),await le({silent:!0})}catch(Ks){rt(Ks)}finally{M(!1)}}}async function Os(){M(!0);try{Spicetify.showNotification(pn(await dn(i))),await le({silent:!0})}catch(x){L({kind:"error",text:x instanceof Error?x.message:String(x)})}finally{M(!1)}}async function Mt(){N(!0),U(null);try{await ta(i)}catch(x){x instanceof Ee&&["claim_pending","claimed"].includes(x.code)||U(x instanceof Error?x.message:String(x))}finally{await le({silent:!0}),N(!1)}}function Us(){be(!0),ye?Mt():v("account")}function Hs(x){l.setSession(x),xe.current=!0,!T&&D.payload?Mt():le({silent:!0})}function _i(){d.forget(),l.forgetClaims(),U(null),le({silent:!0})}function $s(x){x==="back-up"?Ls():x==="try-again"?le():x==="sign-in"?v("account"):x==="how-to-update"?ie(`${n.githubUrl}#updating`):Sa()}let Ai=_t(()=>{l.readSession(),le({silent:!0})});_(()=>Ai.current(),[Ai]);let Mi=_t(()=>{!e.secure||xe.current||Y||!ye||$e.kind!=="open"||T||(xe.current=!0,Mt())});return _(()=>Mi.current(),[Mi,ye,$e.kind,T,Y]),y("div",{className:"syncify-ui syncify-window",onClick:Ri,onMouseDown:Ri,onPointerDown:Ri,children:[y("div",{className:"syncify-window-top",children:[r(Ss,{status:Ti,alert:_s,backingUp:h==="backing-up",busy:ot||Ti.action==="back-up"&&T!==null,answering:C,onAction:$s,onNotMe:()=>{Os()},onAnswerInstall:x=>{Ds(x)},onSupport:()=>ie(n.kofiUrl)}),H?r(ys,{message:H,busy:ot,onTryAgain:()=>{le()},onDismiss:()=>L(null)}):null,r(ws,{idBase:t,selected:w,onSelect:v,codeCount:ye?d.codeCount:null,account:Ka(ye,T,$e),newerVersion:u})]}),w==="backups"?r(Xa,{idBase:t,config:i,remote:l.check?D:null,failed:b!==null||s,lockedBy:T,local:a,otherAccounts:Ms,notices:r(ds,{nudge:As,securing:Y,onSecure:Us,onHideNudge:()=>{ra(),G(!0)},install:T||$e.kind==="secured"?null:D.install,restoreResult:f.result}),busy:ot,restoring:h==="restoring",onRestore:x=>{Bs(x)},onError:rt}):w==="share"?r(ls,{idBase:t,config:i,session:ye,localItems:(Fi=a==null?void 0:a.items)!=null?Fi:[],localConfig:(Wi=a==null?void 0:a.spicetifyConfig)!=null?Wi:null,localTheme:(ji=a==null?void 0:a.activeTheme)!=null?ji:null,marketplaceAvailable:(Yi=a==null?void 0:a.marketplaceAvailable)!=null?Yi:null,busy:ot,onSignIn:()=>v("account"),onSignedOut:_i,onCodeCount:d.saveCodeCount,onHandle:d.saveHandle}):w==="account"?r(te,{idBase:t,id:"account",children:r("div",{className:"syncify-panel",children:r(Wa,{session:ye,locked:T,secure:$e,securing:Y,secureError:R,onSecure:()=>{Mt()},nudge:X,onSignedIn:Hs,onSignedOut:_i,onOpenWebsite:ie,handle:d.handle,onHandle:d.saveHandle})})}):r(Za,{idBase:t,config:i,onConfigChange:o,busy:ot,unsupported:P}),r(ks,{newerVersion:u,loadedByLoader:g})]})}function Ri(e){e.stopPropagation()}function vs(e){let{claim:t}=e,[n,i]=p(!1),[o,a]=p(null);async function s(){i(!0),a(null);try{Spicetify.showNotification(pn(await dn(de()))),e.onClose()}catch(c){a(c instanceof Error?c.message:String(c)),i(!1)}}return y("div",{className:"syncify-panel",children:[r("p",{className:"syncify-claim-notice",children:Ua(t)}),o?r("div",{className:"syncify-alert","data-kind":"error",role:"alert",children:o}):null,y("div",{className:"syncify-actions",children:[r("button",{className:"syncify-text-button",type:"button",onClick:e.onClose,disabled:n,children:"Close"}),r("button",{className:"syncify-button",type:"button",onClick:()=>{s()},disabled:n,children:"Not me"})]})]})}function xs(e){return y("div",{className:"syncify-panel",children:[r("p",{className:"syncify-claim-notice",children:Ha(e.claim)}),r("div",{className:"syncify-actions",children:r("button",{className:"syncify-button",type:"button",onClick:e.onClose,children:"Close"})})]})}function Cs(e){let{install:t}=e,[n,i]=p(!1),[o,a]=p(null);async function s(c){i(!0),a(null);try{await un(de(),t.id,c),Spicetify.showNotification(c==="approve"?"Syncify: install approved":"Syncify: install refused"),e.onDone(c)}catch(l){a(l instanceof Error?l.message:String(l)),i(!1)}}return y(B,{children:[y("p",{className:"syncify-claim-notice",children:[mn(t),". Approve it if it's yours."]}),o?r("div",{className:"syncify-alert","data-kind":"error",role:"alert",children:o}):null,y("div",{className:"syncify-actions",children:[r("button",{className:"syncify-text-button",type:"button",onClick:e.onClose,disabled:n,children:"Close"}),r("button",{className:"syncify-button secondary",type:"button",onClick:()=>{s("reject")},disabled:n,children:"Not mine"}),r("button",{className:"syncify-button",type:"button",onClick:()=>{s("approve")},disabled:n,children:"Approve"})]})]})}function Is(e){return y("div",{className:"syncify-panel",children:[r("p",{className:"syncify-claim-notice",children:"Your backup isn't secured yet. Anyone who knows your Spotify username can restore it or claim it as theirs. Secure it with your email so only you can."}),y("div",{className:"syncify-actions",children:[r("button",{className:"syncify-text-button",type:"button",onClick:e.onClose,children:"Not now"}),r("button",{className:"syncify-button",type:"button",onClick:t=>{t.stopPropagation(),e.onSecure()},children:"Secure"})]})]})}var xn="[Syncify]";function re(e,t){if(t===void 0){console.debug(xn,e);return}console.debug(xn,e,t)}function At(e,t){if(t===void 0){console.warn(xn,e);return}console.warn(xn,e,t)}function wd(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var Ns="syncify-styles";function vd(){if(document.getElementById(Ns)){re("Another copy of Syncify is running; stopping this one");return}Ji(Spicetify.React),xd();let e=de();Gr({topbarButton:Cd(),menuItem:Td()}),sn(e.entryPoint),ei(e.shortcut,In),da({onClaim:t=>{Md(t)},onUndone:Ld,onInstall:Bd,onNudge:Dd}).catch(t=>{At("Startup sync check failed",t)}),va().catch(t=>{At("Restore check failed",t)})}function xd(){let e=document.createElement("style");e.id=Ns,e.textContent=Co,document.head.appendChild(e)}function Cd(){let{extensionName:e}=$(),t=new Spicetify.Topbar.Button(e,Nn,n=>{re("Topbar button clicked",Cn(n)),In()},!1,!0);return Rs(t),Nd(t),Ad(t),re("Topbar button registered",Cn(t)),t}function Rs(e){var n;let t=e;e.element.style.setProperty("-webkit-app-region","no-drag"),(n=t.button)==null||n.style.setProperty("-webkit-app-region","no-drag")}var Es=".main-actionButtons",Id=".Root__globalNav, .Root__top-bar",Ed=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function Nd(e){if(typeof MutationObserver=="undefined")return;let t=!1,n=null,i=()=>{t=!1,a();let s=e.element,c=document.querySelector(Es);!s||!c||c.contains(s)||(c.prepend(s),Rd(e),Rs(e),re("Topbar button re-attached",Cn(e)))},o=new MutationObserver(()=>{t||(t=!0,setTimeout(i,250))}),a=()=>{var l;if(n!=null&&n.isConnected)return;let s=document.querySelector(Es),c=(l=s==null?void 0:s.closest(Id))!=null?l:s==null?void 0:s.parentElement;if(o.disconnect(),n=c!=null?c:null,!c){o.observe(document.body,{childList:!0,subtree:!0});return}o.observe(c,{childList:!0,subtree:!0});for(let d=c.parentElement;d;d=d.parentElement)o.observe(d,{childList:!0})};i()}function Rd(e){let t=Pd(e);if(!t||t.className&&t.className!=="undefined")return;let n=Array.from(document.querySelectorAll(Ed)).find(i=>!e.element.contains(i));n!=null&&n.className&&(t.className=n.className)}function Pd(e){return e.button}function Td(){var e;if(typeof((e=Spicetify.Menu)==null?void 0:e.Item)!="function")return null;try{return new Spicetify.Menu.Item($().extensionName,!1,()=>In(),_d())}catch(t){return At("Failed to create profile menu item",t),null}}function _d(){return Nn.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function Ad(e){Object.assign(window,{SyncifyDebug:{button:e,element:e.element,openModal:In,inspect:()=>Cn(e),clickElement:()=>{var t;return(t=e.element)==null?void 0:t.click()},clickInnerButton:()=>{var t;return(t=e.button)==null?void 0:t.click()},clickCallback:()=>e.onClick(e)}})}function Cn(e){var t,n,i,o,a;return{label:e.label,disabled:e.disabled,isRight:e.isRight,hasElement:!!e.element,elementConnected:(t=e.element)==null?void 0:t.isConnected,elementDisabled:(n=e.element)==null?void 0:n.disabled,elementAriaDisabled:(i=e.element)==null?void 0:i.getAttribute("aria-disabled"),elementClass:(o=e.element)==null?void 0:o.className,appRegion:e.element?getComputedStyle(e.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:e.button?getComputedStyle(e.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:e.element?getComputedStyle(e.element).pointerEvents:null,visibility:e.element?getComputedStyle(e.element).visibility:null,display:e.element?getComputedStyle(e.element).display:null,rect:(a=e.element)==null?void 0:a.getBoundingClientRect().toJSON()}}var z=null;function In(){if(z!=null&&z.container.isConnected){re("Closing modal"),Spicetify.PopupModal.hide();return}re("Opening modal"),it(r(Pi,{}))}async function Md(e){z!=null&&z.container.isConnected||(re("Opening claim notice"),it(r(vs,{claim:e,onClose:()=>Spicetify.PopupModal.hide()})))}function Ld(e){return z!=null&&z.container.isConnected?!1:(re("Opening undone claim notice"),it(r(xs,{claim:e,onClose:()=>Spicetify.PopupModal.hide()})),!0)}function Bd(e){if(z!=null&&z.container.isConnected)return;re("Opening install notice");let t=()=>Spicetify.PopupModal.hide();it(r("div",{className:"syncify-panel",children:r(Cs,{install:e,onDone:t,onClose:t})}))}function Dd(){z!=null&&z.container.isConnected||(re("Opening nudge notice"),sa(),it(r(Is,{onSecure:()=>it(r(Pi,{tab:"account",secure:!0})),onClose:()=>Spicetify.PopupModal.hide()})))}function it(e){var n;(n=z==null?void 0:z.root)==null||n.unmount();let t=document.createElement("div");z={container:t,root:null};try{Spicetify.PopupModal.display({title:$().extensionName,content:t,isLarge:!1})}catch(i){throw At("Failed to open PopupModal",i),i}Od(t),Hd(t,e)}function Od(e){requestAnimationFrame(()=>{let t=Ud(e);t==null||t.classList.add("syncify-modal-shell");let n=t==null?void 0:t.querySelector(".main-trackCreditsModal-header h1");if(n&&!n.querySelector(".syncify-modal-mark")){let o=document.createElement("span");o.className="syncify-modal-mark",o.innerHTML=Io,n.prepend(o)}let i=t==null?void 0:t.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');i&&(i.classList.add("syncify-modal-close"),i.setAttribute("aria-label",`Close ${$().extensionName}`),i.title="Close",i.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function Ud(e){let t=e.parentElement;for(;t&&t!==document.body;){if(t.querySelector(".main-trackCreditsModal-header"))return t;t=t.parentElement}return e.closest('[class*="trackCreditsModal"]')}function Hd(e,t){try{if(typeof Spicetify.ReactDOM.createRoot=="function"){let n=Spicetify.ReactDOM.createRoot(e);n.render(t),(z==null?void 0:z.container)===e&&(z.root=n),re("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(t,e),re("Modal rendered",{renderer:"render"})}catch(n){throw At("Failed to render modal",n),n}}wa();(function e(){if(!wd()){setTimeout(e,100);return}re("Spicetify APIs ready"),vd()})();})();
