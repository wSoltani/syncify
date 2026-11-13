// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var Xs=Object.defineProperty,Zs=Object.defineProperties;var Qs=Object.getOwnPropertyDescriptors;var Ot=Object.getOwnPropertySymbols;var ei=Object.prototype.hasOwnProperty,ti=Object.prototype.propertyIsEnumerable;var Qo=(e,t,n)=>t in e?Xs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,g=(e,t)=>{for(var n in t||(t={}))ei.call(t,n)&&Qo(e,n,t[n]);if(Ot)for(var n of Ot(t))ti.call(t,n)&&Qo(e,n,t[n]);return e},b=(e,t)=>Zs(e,Qs(t));var le=(e,t)=>{var n={};for(var o in e)ei.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&Ot)for(var o of Ot(e))t.indexOf(o)<0&&ti.call(e,o)&&(n[o]=e[o]);return n};var st,L,ne,T,ct,V,ec,j,m;function ni(e){({createElement:st,Fragment:L,useCallback:ne,useEffect:T,useLayoutEffect:ct,useMemo:V,useReducer:ec,useRef:j,useState:m}=e)}var oi=`/* Shared values for every part. Colors come from the active Spicetify theme,
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
`;var ii=`.syncify-icon {
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
`;var ri=`.syncify-btn,
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
`;var ai=`.syncify-switch-control {
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
`;var si=`.syncify-checkbox {
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
`;var ci=`.syncify-setting-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--syncify-space-4);
    min-height: var(--syncify-size-row-single);
}

/* A row with its value under the label is as tall as a two-line list row. */
.syncify-setting-row:has(.syncify-setting-row-value) {
    min-height: var(--syncify-size-row);
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
`;var li=`/* Facts on one line, wrapping between facts. Each fact is trimmed to its
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
`;var ui=`.syncify-list {
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
`;var di=`.syncify-field-group {
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
`;var yi=`.syncify-menu {
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
`;var fi=`.syncify-meter {
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
`;var pi=`.syncify-mark-square {
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
`;var mi=`.syncify-notice {
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
`;var gi=`.syncify-dialog {
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
`;var hi=`.syncify-tabs {
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
`;var Si=`.syncify-pip-square {
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
`;var bi=`.syncify-section-label {
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
`;var ki=`.syncify-keycap {
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
`;var wi=`/* A bar as tall as the capitals of the text it stands in for. */
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
`;var vi=[oi,ii,ri,ai,si,ci,li,ui,di,yi,fi,pi,mi,gi,hi,Si,bi,ki,wi].join(`
`);var xi=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
   Spotify modal can size naturally instead of being forced/cropped. */
.syncify-modal-shell .main-trackCreditsModal-header,
.main-trackCreditsModal-header:has(+ * .syncify-ui),
.main-trackCreditsModal-header:has(~ * .syncify-ui) {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 12px !important;
    padding: 16px 20px 8px !important;
}

.syncify-modal-shell .main-trackCreditsModal-header h1,
.main-trackCreditsModal-header:has(+ * .syncify-ui) h1,
.main-trackCreditsModal-header:has(~ * .syncify-ui) h1 {
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
.main-trackCreditsModal-mainSection:has(.syncify-ui),
.main-trackCreditsModal-content:has(.syncify-ui) {
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
    .main-trackCreditsModal-mainSection:has(.syncify-ui),
    .main-trackCreditsModal-content:has(.syncify-ui) {
        --syncify-shell-height: calc(100vh - 110px);
        --syncify-shell-padding-bottom: 14px;

        padding: var(--syncify-shell-padding-top) 14px var(--syncify-shell-padding-bottom) !important;
    }
}
`;var Ci=`/* The window fits the height Spotify's popup leaves it, so the status and
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
`;var Ii=`/* The safety copy's shield, after its name. */
.syncify-safety-mark {
    color: var(--syncify-color-accent);
}

/* "Current", where an older backup has its chevron. */
.syncify-row-status {
    color: var(--syncify-color-accent);
    font-size: var(--syncify-text-small);
    font-weight: 700;
}
`;var Ei=`/* Adds, Updates and Removes: plain colored text, not chips. */
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
`;var Ri=`/* Loading a setup, the picks and your codes, split by dashed lines. */
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
`;var Pi=`/* The code step's Resend and Use another email. */
.syncify-account-resend {
    display: flex;
    flex-wrap: wrap;
    gap: var(--syncify-space-3);
}

.syncify-account-form {
    display: flex;
    flex-direction: column;
    gap: var(--syncify-space-2);
}

/* Where securing this backup stands on the left, Sign out on the right. */
.syncify-account-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--syncify-space-4);
}

.syncify-account-status {
    display: inline-flex;
    align-items: center;
    gap: var(--syncify-space-2);
    min-width: 0;
}

.syncify-account-check {
    flex: 0 0 auto;
    color: var(--syncify-color-accent);
}
`;var Ni=`/* Turn off or Use default, then the key. */
.syncify-settings-shortcut {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    gap: var(--syncify-space-2);
}
`;var Ti=`/* A launch notice in Spotify's popup: the dialog layout, the popup's width. */
.syncify-launch-notice {
    width: 100%;
}
`;var _i=[vi,xi,Ci,Ei,Ii,Ri,Pi,Ni,Ti].join(`
`);var _n=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var Ai=`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="-2.5 -2.5 37 37" aria-hidden="true" focusable="false"><defs><mask id="syncify-mark-gap" maskUnits="userSpaceOnUse" x="-2" y="-2" width="36" height="36"><rect x="-2" y="-2" width="36" height="36" fill="#fff"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></mask></defs><g mask="url(#syncify-mark-gap)"><g transform="rotate(15 16 16)"><path d="M16 16L16 7.4A8.6 8.6 0 0 1 24.6 16Z" fill="#6cd1d1" transform="translate(0.42 -0.42)"/><path d="M16 16L24.6 16A8.6 8.6 0 0 1 16 24.6Z" fill="#efa4c1" transform="translate(0.42 0.42)"/><path d="M16 16L16 24.6A8.6 8.6 0 0 1 7.4 16Z" fill="#d3c48c" transform="translate(-0.42 0.42)"/><path d="M16 16L7.4 16A8.6 8.6 0 0 1 16 7.4Z" fill="#88bcf2" transform="translate(-0.42 -0.42)"/></g></g><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 28.03A12.4 12.4 0 1 1 28.03 19"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91"/></g></svg>
`;var Tc="syncify",ze="state";function An(){let e;try{e=window.indexedDB}catch(t){return Promise.resolve(null)}return e?new Promise(t=>{let n;try{n=e.open(Tc,1)}catch(o){t(null);return}n.onupgradeneeded=()=>{n.result.createObjectStore(ze)},n.onerror=()=>t(null),n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}function Mn(e,t){let n=An().then(o=>new Promise((i,a)=>{if(!o){a(new Error("IndexedDB isn't available."));return}try{let s=o.transaction(ze,e),c=t(s.objectStore(ze));s.oncomplete=()=>{o.close(),i(c.result)},s.onerror=s.onabort=()=>{var l;o.close(),a((l=s.error)!=null?l:new Error("IndexedDB failed."))}}catch(s){o.close(),a(s)}}));return Promise.race([n,new Promise((o,i)=>setTimeout(()=>i(new Error("IndexedDB took too long.")),2e3))])}function Fe(e){return Mn("readonly",t=>t.get(e))}async function We(e,t){await Mn("readwrite",n=>n.put(t,e))}async function Mi(e){await Mn("readwrite",t=>t.delete(e))}var ye={extensionName:"Syncify",version:"1.17.1",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",discordUrl:"https://syncify.wsoltani.com/discord",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com",shareUrl:"https://syncs.wsoltani.com"};function U(){var t,n,o,i,a,s,c,l,d,u;let e=window.SyncifyConfig;return{extensionName:(t=be(e==null?void 0:e.extensionName))!=null?t:ye.extensionName,version:(n=Bi(e==null?void 0:e.version))!=null?n:ye.version,workerUrl:(o=be(e==null?void 0:e.workerUrl))!=null?o:ye.workerUrl,webUrl:(i=be(e==null?void 0:e.webUrl))!=null?i:ye.webUrl,githubUrl:(a=be(e==null?void 0:e.githubUrl))!=null?a:ye.githubUrl,kofiUrl:(s=be(e==null?void 0:e.kofiUrl))!=null?s:ye.kofiUrl,discordUrl:(c=be(e==null?void 0:e.discordUrl))!=null?c:ye.discordUrl,issueUrl:(l=be(e==null?void 0:e.issueUrl))!=null?l:ye.issueUrl,releasesUrl:(d=be(e==null?void 0:e.releasesUrl))!=null?d:ye.releasesUrl,shareUrl:(u=be(e==null?void 0:e.shareUrl))!=null?u:ye.shareUrl}}function be(e){return Bi(e)}function Bi(e){return typeof e=="string"&&e.trim()?e.trim():null}var _c="x-syncify-version",Ac="x-syncify-install",Mc="x-syncify-timezone",Li="install-id",Di="syncify:install-id",Bc=2e3,Ut=null;async function Oi(){let e={[_c]:U().version,[Ac]:(await Bn()).id},t=Oc();return t&&(e[Mc]=t),e}function Bn(){return Ut!=null||(Ut=Lc().catch(()=>({id:Ht(),inDatabase:!1}))),Ut}async function Lc(){let e=await Promise.race([Dc(),new Promise(t=>setTimeout(()=>t(null),Bc))]);if(e)return{id:e,inDatabase:!0};try{let t=window.localStorage.getItem(Di);if(t&&Ui(t))return{id:t,inDatabase:!1};let n=Ht();return window.localStorage.setItem(Di,n),{id:n,inDatabase:!1}}catch(t){return{id:Ht(),inDatabase:!1}}}async function Dc(){let e=await An();return e?new Promise(t=>{let n=null;try{let o=e.transaction(ze,"readwrite"),i=o.objectStore(ze),a=i.get(Li);a.onsuccess=()=>{if(typeof a.result=="string"&&Ui(a.result)){n=a.result;return}n=Ht(),i.put(n,Li)},o.oncomplete=()=>{e.close(),t(n)},o.onerror=o.onabort=()=>{e.close(),t(null)}}catch(o){e.close(),t(null)}}):null}function Ht(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t=[...e].map(n=>n.toString(16).padStart(2,"0"));return[t.slice(0,4).join(""),t.slice(4,6).join(""),t.slice(6,8).join(""),t.slice(8,10).join(""),t.slice(10).join("")].join("-")}function Ui(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(e)}function Oc(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(e){return null}}var Uc="syncify-signature-v1",Hc={name:"ECDSA",hash:"SHA-256"};function $t(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function Kt(e){return Ln(new Uint8Array(await crypto.subtle.exportKey("raw",e)))}async function lt(e,t,n,o,i){let a=await $c(t,n,o,i),s=await crypto.subtle.sign(Hc,e,a);return Ln(new Uint8Array(s))}async function $c(e,t,n,o){let{pathname:i,search:a}=new URL(n),s=new TextEncoder,c=Ln(new Uint8Array(await crypto.subtle.digest("SHA-256",s.encode(o))));return s.encode([Uc,e,t.toUpperCase(),i+a,c].join(`
`))}function Ln(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var Hi="device-key",Dn="session",$i="salt",Ne=null,ut,Ki={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function je(e){if(Ne)return Ne;let t=await Fe(Hi);return Kc(t)?(Ne=Promise.resolve(t),t):e?(Ne=$t().then(async n=>(await We(Hi,n),n)),Ne.catch(()=>{Ne=null}),Ne):null}async function ie(){let e=await Fe(Dn);return zc(e)?e:null}function On(e){return We(Dn,e)}async function Te(){await Mi(Dn).catch(()=>{})}async function zt(){if(ut===void 0){let e=await Fe($i).catch(()=>{});ut=typeof e=="string"?e:null}return ut}async function Ft(e){e!==ut&&(ut=e,await We($i,e).catch(()=>{}))}function Wt(){return Ki}function zi(e){Ki=e}function Kc(e){let t=e;return!!(t&&t.privateKey instanceof CryptoKey&&t.publicKey instanceof CryptoKey)}function zc(e){let t=e;return!!(t&&typeof t.token=="string"&&t.token&&typeof t.email=="string")}var Fi="install-key",Ye=null;function Wi(){return Ye!=null||(Ye=Fc()),Ye.catch(()=>{Ye=null}),Ye.catch(()=>null)}async function Fc(){if(!(await Bn()).inDatabase)return null;let e=await Fe(Fi),t=jc(e)?e:await Wc();return{privateKey:t.privateKey,publicKey:await Kt(t.publicKey)}}async function Wc(){let e=await $t();return await We(Fi,e),e}function jc(e){let t=e;return!!(t&&t.privateKey instanceof CryptoKey&&t.publicKey instanceof CryptoKey)}var Yc="/api/auth/email-otp/send-verification-otp",qc="/api/auth/sign-in/email-otp",Gc="/api/auth/get-session",Vc="/api/auth/sign-out",Jc="/api/auth/link",Xc="x-syncify-device-key",Zc="x-syncify-signature",ji="x-syncify-salt",Qc="none",el={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again.",link_failed:"Couldn't open the website. Try again."},_=class extends Error{constructor(n,o=null,i=null){var a;super((a=el[n])!=null?a:"Sign-in failed. Try again.");this.code=n;this.retryAfter=o;this.share=i;this.name="AccountError"}};function Ie(e){return e instanceof _?e.message:"Sign-in failed. Try again."}async function Yi(e,t={}){let n=await yt(Yc,{method:"POST",body:JSON.stringify(g({email:e,type:"sign-in"},t.nudge?{nudge:!0}:{}))});return typeof(n==null?void 0:n.resend_in)=="number"?n.resend_in:60}async function qi(e,t){var a;let n=await je(!0).catch(()=>{throw new _("no_device_key")}),o=await yt(qc,{method:"POST",body:JSON.stringify({email:e,otp:t}),keys:n,sendPublicKey:!0});if(typeof(o==null?void 0:o.token)!="string"||!o.token)throw new _("sign_in_failed");let i={token:o.token,email:typeof((a=o.user)==null?void 0:a.email)=="string"?o.user.email:e};return await On(i).catch(()=>{throw new _("no_device_key")}),Un=!0,i}var Un=!1;async function Gi(){var t;let e=await ie();if(!e||Un)return e;try{let n=await jt(e,Gc,"GET");Un=!0;let o=(t=n==null?void 0:n.user)==null?void 0:t.email;if(typeof o!="string"||o===e.email)return e;let i=b(g({},e),{email:o});return await On(i).catch(()=>{}),i}catch(n){if(n instanceof _&&n.code==="signed_out")return null;throw n}}async function Vi(){let e=await ie().catch(()=>null);e&&await jt(e,Vc,"POST").catch(()=>{}),await Te()}async function Ji(){let e=await ie();if(!e)throw new _("signed_out");let t=await jt(e,Jc,"POST"),n=typeof(t==null?void 0:t.url)=="string"?t.url:"",o=new URL(U().webUrl).origin;if(!n.startsWith(`${o}/link#`))throw new _("link_failed");return n}async function dt(e,t,n){let o=await ie();if(!o)throw new _("signed_out");return jt(o,e,t,n)}async function Xi(e,t,n){let o=await ie().catch(()=>null),i=o?await je(!1).catch(()=>null):null;await yt(e,g({method:"POST",body:JSON.stringify(t),headers:n,keepalive:!0},o&&i?{token:o.token,keys:i}:{}))}async function jt(e,t,n,o){let i=await je(!1);if(!i)throw await Te(),new _("signed_out");return yt(t,g({method:n,token:e.token,keys:i},o===void 0?{}:{body:JSON.stringify(o)}))}async function yt(e,t,n=!1){var y,p,w;let o=`${U().webUrl.replace(/\/+$/,"")}${e}`,i=g({},t.headers);if(t.body!==void 0&&(i["content-type"]="application/json"),t.token&&(i.authorization=`Bearer ${t.token}`),t.keys){let v=(y=await zt())!=null?y:Qc;i[ji]=v,i[Zc]=await lt(t.keys.privateKey,v,t.method,o,(p=t.body)!=null?p:""),t.sendPublicKey&&(i[Xc]=await Kt(t.keys.publicKey))}let a;try{a=await fetch(o,{method:t.method,headers:i,body:t.body,keepalive:t.keepalive})}catch(v){throw new _("offline")}let s=a.headers.get(ji);s&&await Ft(s);let c=await a.json().catch(()=>null);if(a.ok)return c;let l=typeof(c==null?void 0:c.code)=="string"?c.code:a.status===503?"unavailable":"failed";if(l==="stale_salt"&&t.keys&&!n)return yt(e,t,!0);l==="signed_out"&&await Te();let d=Number(a.headers.get("retry-after")),u=c==null?void 0:c.share;throw new _(l,Number.isFinite(d)&&d>0?d:(w=tl[l])!=null?w:null,typeof(u==null?void 0:u.code)=="string"?{code:u.code,link:typeof u.link=="string"?u.link:null}:null)}var tl={resend_wait:60,too_many_requests:60,send_failed:60};var nl="x-syncify-user-hash",ol="x-syncify-identity",il="x-syncify-signature",rl="x-syncify-install-key",al="x-syncify-install-signature",Hn="x-syncify-salt",sl="none",cl="/restores",ll="/installs",ul="hash",Zi=3,ft=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}},re=class extends Error{constructor(n){super(n==="not_linked"?"Couldn't read that Spotify account's backups.":"Sign in to restore this backup.");this.code=n;this.name="LockedError"}},_e=class extends Error{constructor(){super("This Spotify account doesn't accept backups from this install. Sign in to back up."),this.name="InstallRefusedError"}};async function er(e,t,n){var a;let o=await Ee(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(n)});if(o.status===403&&((a=await o.json().catch(()=>null))==null?void 0:a.code)==="install_refused")throw new _e;if(!o.ok)throw new Error(`Backup failed with HTTP ${o.status}.`);let i=await o.json().catch(()=>null);return{unchanged:(i==null?void 0:i.unchanged)===!0,unapproved:(i==null?void 0:i.quarantined)===!0}}async function tr(e,t,n,o){let i=await Ee(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({install:n,action:o})},ll);if(i.ok)return;let a=await i.json().catch(()=>null);if((a==null?void 0:a.code)!=="not_pending")throw new Error(`Couldn't answer with HTTP ${i.status}.`)}async function $n(e,t,n){var w,v,I,S;let o=await Ee(e,t,{method:"GET"},or("/",n));if(o.status===404){let h=await o.json().catch(()=>null);return{exists:!1,payload:null,backups:[],safetyCopy:null,claim:pt(h==null?void 0:h.claim),unapproved:[],install:Qi(h==null?void 0:h.install),nudge:!1}}if(!o.ok)throw new Error(`Restore failed with HTTP ${o.status}.`);let i=await o.json(),a=pt(i.claim),s=Qi(i.install),c=i.nudge===!0;delete i.claim,delete i.install,delete i.nudge;let l=[i,...(w=i.backup_history)!=null?w:[]];if(!l.every(h=>h.backup))return{exists:!0,payload:i,backups:l.slice(0,Zi),safetyCopy:(v=l[Zi])!=null?v:null,claim:a,unapproved:[],install:s,nudge:c};let d=l.filter(h=>{var P;return((P=h.backup)==null?void 0:P.kind)==="rolling"}),u=(I=l.find(h=>{var P;return((P=h.backup)==null?void 0:P.kind)==="anchor"}))!=null?I:null,y=l.filter(h=>{var P;return((P=h.backup)==null?void 0:P.kind)==="quarantined"}),p=(S=d[0])!=null?S:u;return p?d.length===0&&u?{exists:!0,payload:p,backups:[u],safetyCopy:null,claim:a,unapproved:y,install:s,nudge:c}:{exists:!0,payload:p,backups:d,safetyCopy:u,claim:a,unapproved:y,install:s,nudge:c}:{exists:!1,payload:null,backups:[],safetyCopy:null,claim:a,unapproved:y,install:s,nudge:c}}async function nr(e,t,n,o){try{await Ee(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:n}),keepalive:!0},or(cl,o))}catch(i){}}async function Ee(e,t,n,o="",i=!1){var I,S,h,P,O;let a=o?`${e.replace(/\/+$/,"")}${o}`:e,s=(I=n.method)!=null?I:"GET",c=await ie().catch(()=>null),l=c?await je(!1).catch(()=>null):null,d=await Wi(),u={},y=(S=await zt())!=null?S:sl;c&&l&&(u.authorization=`Bearer ${c.token}`,u[Hn]=y,u[il]=await lt(l.privateKey,y,s,a,(h=n.body)!=null?h:"")),d&&(u[Hn]=y,u[rl]=d.publicKey,u[al]=await lt(d.privateKey,y,s,a,(P=n.body)!=null?P:""));let p=await fetch(a,b(g({},n),{headers:g(b(g(g({},n.headers),await Oi()),{[nl]:t.hash,[ol]:t.field}),u)})),w=p.headers.get(Hn);if(w&&await Ft(w),p.status===426)throw new ft;if(p.status!==401)return p;let v=(O=await p.clone().json().catch(()=>null))==null?void 0:O.code;if(!i){if(v==="stale_salt"&&(c||d))return Ee(e,t,n,o,!0);if(v==="signed_out"&&c)return await Te(),Ee(e,t,n,o,!0)}throw v==="claimed"||v==="not_owner"||v==="not_linked"?new re(v):(v==="signed_out"&&await Te(),new _(typeof v=="string"?v:"failed"))}function or(e,t){return t?`${e}?${ul}=${encodeURIComponent(t)}`:e}function Qi(e){let t=e;if(!t||typeof t.trust!="string")return null;let n=Array.isArray(t.waiting)?t.waiting:[];return{trusted:t.trust!=="pending"&&t.trust!=="rejected",refused:t.trust==="rejected",waiting:n.flatMap(o=>{let i=o;return i&&typeof i.id=="string"&&typeof i.first_seen_at=="number"?[{id:i.id,device:typeof i.device=="string"?i.device:null,first_seen_at:i.first_seen_at}]:[]})}}function pt(e){let t=e;return!t||typeof t.mine!="boolean"?null:t.status==="final"?{status:"final",mine:t.mine}:t.status==="undone"?typeof t.undone_at=="number"?{status:"undone",mine:!1,email:typeof t.email=="string"?t.email:null,undone_at:t.undone_at}:null:t.status!=="pending"||typeof t.final_at!="number"?null:g({status:"pending",mine:t.mine,email:typeof t.email=="string"?t.email:null,final_at:t.final_at,held:t.held===!0},t.not_me===!0?{not_me:!0}:{})}async function Yt(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return[...new Uint8Array(n)].map(o=>o.toString(16).padStart(2,"0")).join("")}function mt(e){return JSON.stringify(Kn(e))}function Kn(e){return Array.isArray(e)?e.map(Kn):e&&typeof e=="object"?Object.keys(e).sort().reduce((t,n)=>(t[n]=Kn(e[n]),t),{}):e}function ir(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var dl=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,yl=100,fl="marketplace:installed-extensions",pl="marketplace:installed-themes",ml="marketplace:theme-installed",gl="marketplace:installed:",hl="marketplace";function Fn(e){return Spicetify.Config?Wn(Spicetify.Config,e):null}function Wn(e,t){var a;let n=Re(e),o=new Set(Sl(t)),i=((a=t[ml])==null?void 0:a.includes(gl))===!0;return{current_theme:i?hl:n.current_theme,color_scheme:i?"":n.color_scheme,extensions:n.extensions.filter(s=>!o.has(s)),custom_apps:n.custom_apps}}function Re(e){let t=e&&typeof e=="object"?e:{};return{current_theme:zn(t.current_theme)?t.current_theme:"",color_scheme:zn(t.color_scheme)?t.color_scheme:"",extensions:rr(t.extensions),custom_apps:rr(t.custom_apps)}}function cr(e,t){return mt(Re(e))===mt(Re(t))}function rr(e){return Array.isArray(e)?[...new Set(e.filter(zn))].sort().slice(0,yl):[]}function zn(e){return typeof e=="string"&&dl.test(e)}function Sl(e){let t=ar(e[fl]).map(o=>{var a;let i=(a=sr(e[o]))==null?void 0:a.manifest;return i&&typeof i=="object"?i.main:void 0}),n=ar(e[pl]).flatMap(o=>{var a;let i=(a=sr(e[o]))==null?void 0:a.include;return Array.isArray(i)?i:[]});return[...t,...n].flatMap(o=>{let i=typeof o=="string"?o.split("/").pop():void 0;return i?[i]:[]})}function ar(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function sr(e){try{let t=e?JSON.parse(e):null;return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch(t){return null}}var bl=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],kl="marketplace:installed:",lr=`${kl}snippet:`,wl="wsoltani/syncify",vl="marketplace",ur={added:0,removed:1,unchanged:2};function J(e){let t=new Map;for(let[n,o]of bl)for(let i of El(e[n]))t.has(i)||t.set(i,Cl(i,o,e[i]));return[...t.values()]}function Vt(e,t,n,o){let i=new Set(e.map(l=>l.key)),a=new Map(n.map(l=>[l.key,l])),s=[...e.map(l=>{let d=a.get(l.key);return b(g({},l),{change:d?"unchanged":"added",isNew:!d||d.sources.join(" ")!==l.sources.join(" ")})}),...n.filter(l=>!i.has(l.key)).map(l=>b(g({},l),{change:gt(l,e)?"unchanged":"removed",isNew:!1}))].sort((l,d)=>ur[l.change]-ur[d.change]||l.name.localeCompare(d.name)),c={added:0,removed:0,unchanged:0};for(let l of s)c[l.change]+=1;return{items:s,counts:c,manual:xl(t,o)}}function gt(e,t){return e.type==="extension"&&Gt(e)&&!t.some(Gt)}function Gt(e){var t;return((t=e.repo)==null?void 0:t.toLowerCase())===wl}function xl(e,t){if(!e)return[];let n=Re(e),o=Re(t),i=[...n.extensions.filter(s=>!o.extensions.includes(s)).map(s=>({type:"extension",name:s})),...n.custom_apps.filter(s=>!o.custom_apps.includes(s)).map(s=>({type:"custom_app",name:s}))],a=n.current_theme;return a&&a!==vl&&(a!==o.current_theme||n.color_scheme!==o.color_scheme)&&i.push(g({type:"theme",name:a},n.color_scheme?{scheme:n.color_scheme}:{})),i}function Cl(e,t,n){var l,d;let o=dr(n),i=dr(o==null?void 0:o.manifest),a=qt(o==null?void 0:o.user),s=qt(o==null?void 0:o.repo),c=(d=(l=qt(o==null?void 0:o.title))!=null?l:qt(i==null?void 0:i.name))!=null?d:e.startsWith(lr)?e.slice(lr.length):e.split("/").pop()||e;return{key:e,type:t,name:c,repo:t!=="snippet"&&a&&s?`${a}/${s}`:null,sources:Il(t,o),custom:t==="snippet"&&(o==null?void 0:o.custom)===!0}}function Il(e,t){return t?(e==="extension"?[t.extensionURL]:e==="theme"?[t.cssURL,t.schemesURL,...Array.isArray(t.include)?t.include:[]]:[]).filter(o=>typeof o=="string"&&o!==""):[]}function qt(e){return typeof e=="string"&&e.trim()?e.trim():null}function El(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function dr(e){let t=e;if(typeof e=="string")try{t=JSON.parse(e)}catch(n){return null}return t&&typeof t=="object"&&!Array.isArray(t)?t:null}var Jt="spicetify-marketplace";var ht="settings";async function yr(){let e=await mr();if(e.kind!=="ok")return null;try{let t=await gr(e.db,"readonly",o=>o.getAll());if(!t)return null;let n={};for(let o of t)typeof(o==null?void 0:o.key)=="string"&&typeof o.value=="string"&&(n[o.key]=o.value);return n}finally{e.db.close()}}async function fr(e,t=[]){let n=await mr();if(n.kind==="unavailable")return"unavailable";let o=n.kind==="ok"?n.db:await Rl();if(!o)return"failed";try{return await gr(o,"readwrite",a=>{let s;for(let[c,l]of Object.entries(e))s=a.put({key:c,value:l});for(let c of t)s=a.delete(c);return s})===null?"failed":"written"}finally{o.close()}}function pr(){var e;try{return(e=window.indexedDB)!=null?e:null}catch(t){return null}}async function mr(){let e=pr();return e?await Pl(e)?{kind:"missing"}:new Promise(t=>{let n=!1,o=e.open(Jt);o.onupgradeneeded=()=>{n=!0},o.onerror=()=>{console.warn("Syncify could not open Marketplace storage",o.error),t({kind:"unavailable"})},o.onblocked=()=>t({kind:"unavailable"}),o.onsuccess=()=>{let i=o.result;if(n){i.close(),Nl(e).then(()=>t({kind:"missing"}));return}if(!i.objectStoreNames.contains(ht)){i.close(),t({kind:"unavailable"});return}t({kind:"ok",db:i})}}):{kind:"unavailable"}}function Rl(){let e=pr();return e?new Promise(t=>{let n=e.open(Jt,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains(ht)||o.createObjectStore(ht,{keyPath:"key"})},n.onerror=()=>{console.warn("Syncify could not create Marketplace storage",n.error),t(null)},n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}async function Pl(e){if(typeof e.databases!="function")return!1;try{return!(await e.databases()).some(n=>n.name===Jt)}catch(t){return!1}}function Nl(e){return new Promise(t=>{let n=e.deleteDatabase(Jt);n.onsuccess=()=>t(),n.onerror=()=>t(),n.onblocked=()=>t()})}function gr(e,t,n){return new Promise(o=>{let i;try{i=e.transaction(ht,t)}catch(d){console.warn("Syncify could not open a Marketplace transaction",d),o(null);return}let a,s=!1,c=d=>{s||(s=!0,o(d))};i.oncomplete=()=>c(a),i.onerror=()=>{console.warn("Syncify Marketplace transaction failed",i.error),c(null)},i.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",i.error),c(null)};let l;try{l=n(i.objectStore(ht))}catch(d){console.warn("Syncify Marketplace request could not be issued",d),c(null);return}l&&(l.onsuccess=()=>{a=l.result},l.onerror=()=>{console.warn("Syncify Marketplace request failed",l.error),c(null)})})}var jn="marketplace:",Zt=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function ue(){let e=Ul(),t=await yr();if(t)for(let[n,o]of Object.entries(t))n.startsWith(jn)&&(e[n]=o);return e}var _l=new Set(["marketplace:active-tab","marketplace:sort"]),Yn="marketplace:installed:",Xt="marketplace:theme-installed",Al=["stars","tags","lastUpdated","created"];async function Qt(e,t){let n={};for(let[o,i]of Object.entries(e))_l.has(o)||(n[o]=o.startsWith(Yn)?Ml(i):i);return t&&(n.spicetify_config=Re(t)),Yt(mt(n))}function Ml(e){try{let t=JSON.parse(e);if(!t||typeof t!="object"||Array.isArray(t))return e;for(let n of Al)delete t[n];return t}catch(t){return e}}async function en(){let e=await ue(),t=Fn(e);return{keyCount:Object.keys(e).length,hash:await Qt(e,t),installedItemCount:Dl(e),installedItems:tn(e),items:J(e),spicetifyConfig:t,marketplaceAvailable:Ol(e),activeTheme:St(e[Xt])}}function St(e){if(!e)return null;if(e.startsWith(Yn))return e;try{let t=JSON.parse(e);return typeof t=="string"?t:null}catch(t){return null}}async function hr(){let e=await ue(),t=Fn(e);return g({schema_version:2,metadata:{last_sync_datetime:new Date().toISOString(),device_info:ir(),marketplace_key_count:Object.keys(e).length},payload_hash:await Qt(e,t),marketplace_data:{keys:e}},t?{spicetify_config:t}:{})}async function Sr(e,t=[]){var a,s;let n={},o=(s=(a=e.marketplace_data)==null?void 0:a.keys)!=null?s:{};for(let[c,l]of Object.entries(o))c.startsWith(jn)&&(n[c]=l);if(Object.keys(n).length===0)return 0;await Bl(n),t.length>0&&await Ll(n,t);let i=Gn(await ue(),n);return await qn(n,i),Object.keys(n).length}async function qn(e,t=[]){for(let[o,i]of Object.entries(e))window.localStorage.setItem(o,i);for(let o of t)window.localStorage.removeItem(o);if(await fr(e,t)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try again.")}function Gn(e,t){let n=new Set(Zt.flatMap(s=>{var c;return nn((c=t[s])!=null?c:e[s]).map(String)})),o=tn(e).filter(s=>s.startsWith(Yn)&&!n.has(s)),i=o.filter(s=>e[s]!==void 0&&t[s]===void 0),a=e[Xt];return a&&t[Xt]===void 0&&o.some(s=>a.includes(s))&&i.push(Xt),i}async function Bl(e){let t=await ue(),n=J(e),o=J(t).filter(s=>gt(s,n));if(o.length===0)return;let i="marketplace:installed-extensions",a=nn(e[i]).map(String);for(let s of o)a.includes(s.key)||a.push(s.key),e[s.key]=t[s.key];e[i]=JSON.stringify(a)}async function Ll(e,t){let n=await ue(),o=tn(n);for(let i of Zt){if(e[i]===void 0)continue;let a=nn(e[i]).map(String).filter(s=>!t.includes(s)||o.includes(s));e[i]=JSON.stringify(a)}for(let i of t)n[i]!==void 0?e[i]=n[i]:delete e[i]}function Dl(e){return tn(e).length}function tn(e){return Zt.flatMap(t=>nn(e[t]).map(String))}function Ol(e){return!!(window.Marketplace||Zt.some(n=>e[n]!==void 0)||e["marketplace:tabs"]!==void 0)}function br(e,t){return t===0?!1:e===0?!0:e<Math.max(2,Math.floor(t*.5))}function Ul(){let e={};for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);if(!(n!=null&&n.startsWith(jn)))continue;let o=window.localStorage.getItem(n);o!==null&&(e[n]=o)}return e}function nn(e){if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch(t){return[]}}var Hl="raw.githubusercontent.com",$l="cdn.jsdelivr.net",kr=".github.io";function Jn(e){var n;if(e.protocol!=="https:")return null;let t=e.pathname.split("/").filter(Boolean);if(e.host===Hl)return Vn(t[0],t[1]);if(e.host===$l)return t[0]==="gh"?Vn(t[1],(n=t[2])==null?void 0:n.split("@")[0]):null;if(e.host.endsWith(kr)){let o=e.host.slice(0,-kr.length);return o.includes(".")?null:Vn(o,t.length>1?t[0]:e.host)}return null}function Vn(e,t){return e&&t?`${e}/${t}`:null}var Kl={extension:"spicetify-extensions",theme:"spicetify-themes"},zl="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",Fl="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",Wl="https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/",jl="https://api.github.com/repos",Yl=5e3,ql=20,wr="syncify:repo-topics",vr=10080*60*1e3,Gl=200;function qe(e){return(e==null?void 0:e.kind)==="host"||(e==null?void 0:e.kind)==="repo"||(e==null?void 0:e.kind)==="blocked"||(e==null?void 0:e.kind)==="catalog"}function Ge(e){let t=new Map;for(let n of e){if(n.change==="removed")continue;if(n.custom){t.set(n.key,{kind:"custom"});continue}let o=Vl(n);o&&t.set(n.key,o)}return t}async function Ve(e,t){let n=new Map,o=e.filter(s=>s.change!=="removed"&&s.isNew&&!t.has(s.key));if(o.length===0)return n;let i=o.filter(s=>s.type==="snippet"),a=o.filter(s=>s.type!=="snippet");if(i.length>0){let s=await Xn();for(let c of i)s?on(s,c.name)||n.set(c.key,{kind:"catalog"}):n.set(c.key,{kind:"unchecked"})}if(a.length>0){let s=await Zl(),c=tu(),l=0;await Promise.all(a.map(async d=>{let u=Jl(d),y=Kl[d.type];if(!u||!y)return;if(s===null){n.set(d.key,{kind:"unchecked"});return}if(Xl(u,s)){n.set(d.key,{kind:"blocked"});return}let p=eu(c,u);p===void 0&&l<ql&&(l+=1,p=await Ql(u),p!==void 0&&(c[u.toLowerCase()]={topics:p,at:Date.now()})),p===void 0?n.set(d.key,{kind:"unchecked"}):(p===null||!p.includes(y))&&n.set(d.key,{kind:"catalog"})})),nu(c)}return n}function Vl(e){let t=null;for(let n of e.sources){let o;try{o=new URL(n)}catch(a){return{kind:"host",host:n.slice(0,40)}}let i=Jn(o);if(!i)return{kind:"host",host:o.host};e.repo&&i.toLowerCase()!==e.repo.toLowerCase()&&(t!=null||(t=i))}return t?{kind:"repo",repo:t}:null}function Jl(e){for(let t of e.sources)try{let n=Jn(new URL(t));if(n)return n}catch(n){}return e.repo}function Xl(e,t){let n=`https://github.com/${e}`.toLowerCase();return t.some(o=>{let i=o.toLowerCase();if(!i.includes("*"))return i===n;let a=i.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${a}$`).test(n)})}function xr(e){return e.replace(/\n/g,"").trim().toLowerCase()}function on(e,t){return e.get(xr(t))}var bt=null,kt=null;function Zl(){return bt!=null||(bt=Cr(zl).then(e=>{let t=e==null?void 0:e.repos;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&!n.startsWith("//")):(bt=null,null)})),bt}function Xn(){return kt!=null||(kt=Cr(Fl).then(e=>{if(!Array.isArray(e))return kt=null,null;let t=new Map;for(let n of e){if(typeof(n==null?void 0:n.title)!="string"||typeof n.code!="string")continue;let o=typeof n.preview=="string"?n.preview:null;t.set(xr(n.title),g({title:n.title,code:n.code,description:typeof n.description=="string"?n.description:""},o?{imageURL:o.startsWith("http")?o:`${Wl}${o}`}:{}))}return t})),kt}async function Ql(e){let t=await Ir(`${jl}/${e}`);if((t==null?void 0:t.status)===404)return null;if(!(t!=null&&t.ok))return;let n=await t.json().catch(()=>null);return Array.isArray(n==null?void 0:n.topics)?n.topics.filter(o=>typeof o=="string"):void 0}async function Cr(e){let t=await Ir(e);return t!=null&&t.ok?t.json().catch(()=>null):null}async function Ir(e){let t=typeof AbortController=="function"?new AbortController:null,n=setTimeout(()=>t==null?void 0:t.abort(),Yl);try{return await fetch(e,{signal:t==null?void 0:t.signal})}catch(o){return null}finally{clearTimeout(n)}}function eu(e,t){let n=e[t.toLowerCase()];return n&&Date.now()-n.at<vr?n.topics:void 0}function tu(){var e;try{let t=JSON.parse((e=localStorage.getItem(wr))!=null?e:"{}");return t&&typeof t=="object"?t:{}}catch(t){return{}}}function nu(e){let t=Date.now(),n=Object.entries(e).filter(([,o])=>t-o.at<vr).sort(([,o],[,i])=>i.at-o.at).slice(0,Gl);try{localStorage.setItem(wr,JSON.stringify(Object.fromEntries(n)))}catch(o){}}var ou=/^[0-9A-HJKMNP-TV-Z]{6}$/,iu=6,ru="SYN-",Nr=60,Zn=20,Tr=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],au="marketplace:installed:",Qf=`${au}snippet:`,Ae="marketplace:theme-installed",Er="marketplace",Rr={added:0,removed:1,unchanged:2},su=new RegExp(`^[a-z0-9][a-z0-9_-]{1,${Zn-2}}[a-z0-9]$`);function Qn(e){let t=e.trim().replace(/^@/,"").toLowerCase();return/[^a-z0-9_-]/.test(t)?"Only letters, digits, _ and -":t.length<3?"At least 3 characters":!/^[a-z0-9]/.test(t)||!/[a-z0-9]$/.test(t)?"Start and end with a letter or digit":null}function fe(e){return`${ru}${e}`}function _r(e){let t=e.trim();if(t.length>200)return null;if(t.includes("/")){let o=t.split(/[?#]/)[0].replace(/\/+$/,"");t=o.slice(o.lastIndexOf("/")+1).replace(/\.json$/i,"")}t=t.toUpperCase().replace(/[\s-]/g,""),t.length===iu+3&&t.startsWith("SYN")&&(t=t.slice(3));let n=t.replace(/O/g,"0").replace(/[IL]/g,"1");return ou.test(n)?n:null}function Ar(e){let t=e;return!t||typeof t.code!="string"||!t.keys||typeof t.keys!="object"||!Object.values(t.keys).every(n=>typeof n=="string")?null:{code:t.code,name:typeof t.name=="string"&&t.name?t.name:null,creator:typeof t.creator=="string"&&su.test(t.creator)?t.creator:null,updated_at:typeof t.updated_at=="number"?t.updated_at:0,keys:t.keys}}async function Mr(e,t){let n=e.filter(s=>!Gt(s)).map(s=>b(g({},s),{change:"added",isNew:!0})),o=Ge(n);for(let s of n)!o.has(s.key)&&!cu(s,t[s.key])&&o.set(s.key,{kind:"catalog"});let i=await Ve(n,o),a=new Map;for(let[s,c]of[...i,...o])c.kind!=="unchecked"&&a.set(s,c);return{items:n,leftOut:a}}function cu(e,t){if(e.type==="snippet")return!0;if(!e.repo)return!1;let n=du(t);return e.type==="extension"?typeof(n==null?void 0:n.extensionURL)=="string"&&n.extensionURL!=="":typeof(n==null?void 0:n.cssURL)=="string"&&n.cssURL!==""}function Br(e,t){let n={};for(let[i,a]of Tr){let s=t.filter(c=>c.type===a&&e[c.key]!==void 0).map(c=>c.key);n[i]=JSON.stringify(s);for(let c of s)n[c]=e[c]}let o=St(e[Ae]);return o&&t.some(i=>i.key===o)&&(n[Ae]=e[Ae]),n}function Lr(e,t,n,o,i,a){let s=a==="replace"?Vt(t,void 0,n,o):lu(t,n),c=St(e.keys[Ae]),l=c!==null&&t.some(u=>u.key===c)&&o!==null&&o.current_theme!==Er,d=c!==null&&c!==i?t.find(u=>u.key===c):void 0;return g(b(g({},s),{manual:l?[{type:"theme",name:Er}]:[]}),d?{theme:{key:d.key,name:d.name}}:{})}function lu(e,t){let n=new Set(t.map(s=>s.key)),o=new Set(e.map(s=>s.key)),i=[...e.map(s=>n.has(s.key)?b(g({},s),{change:"unchanged",isNew:!1}):b(g({},s),{change:"added",isNew:!0})),...t.filter(s=>!o.has(s.key)).map(s=>b(g({},s),{change:"unchanged",isNew:!1}))].sort((s,c)=>Rr[s.change]-Rr[c.change]||s.name.localeCompare(c.name)),a={added:0,removed:0,unchanged:0};for(let s of i)a[s.change]+=1;return{items:i,counts:a,manual:[]}}function Dr(e,t){return new Set(e.items.filter(n=>n.type==="snippet"&&n.change==="added"&&(!t||!on(t,n.name))).map(n=>n.key))}async function Or(e,t,n,o){let i=await ue(),a=J(i),s=J(e.keys),c={};for(let[y,p]of Tr){let w=Pr(i[y]),I=[...t==="add"?w:w.filter(S=>n.includes(S)||a.some(h=>h.key===S&&gt(h,s)))];for(let S of s){if(S.type!==p||n.includes(S.key))continue;let h=w.includes(S.key);if(t==="add"&&h)continue;let P=p==="snippet"?uu(S,o,i[S.key]):e.keys[S.key];P!==void 0&&(c[S.key]=P,I.includes(S.key)||I.push(S.key))}c[y]=JSON.stringify(I)}let l=St(e.keys[Ae]),d=Pr(c["marketplace:installed-themes"]);l&&d.includes(l)&&!n.includes(l)&&(c[Ae]=e.keys[Ae]);let u=Gn(i,c);return await qn(c,u),Object.keys(c).length+u.length}function uu(e,t,n){let o=t?on(t,e.name):void 0;return o?JSON.stringify(g({code:o.code,title:o.title,description:o.description},o.imageURL?{imageURL:o.imageURL}:{})):n}function Pr(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function du(e){try{let t=e?JSON.parse(e):null;return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch(t){return null}}var wt="/api/shares",yu=`${wt}/update`,fu=`${wt}/delete`,pu=`${wt}/import`,mu="x-syncify-user-hash",gu="discover/presets.json",hu={no_code:"This code doesn't exist.",too_many_codes:"You can't make more share codes. Delete one to make another.",daily_limit:"Too many changes to share codes today. Try again tomorrow.",too_large:"This setup is too big to share.",invalid_name:"Names can be up to 60 characters.",empty:"There's nothing to share yet. Install something from Marketplace first.",invalid_items:"Syncify couldn't read some items. Reload Spotify and try again.",source:"Some items don't load from GitHub. Reload Spotify and try again.",blocked:"Some items are on Marketplace's block list. Reload Spotify and try again.",custom_snippet:"Custom snippets can't be shared. Reload Spotify and try again.",unchecked:"Couldn't check Marketplace's block list. Try again in a minute.",publish_failed:"Couldn't publish the code. Press Update on it to try again.",delete_failed:"Couldn't delete the code. Try again.",same_setup:"You already shared this setup.",invalid_handle:"Handles are 3 to 20 letters, digits, _ or -, starting and ending with a letter or digit.",reserved_handle:"That handle isn't allowed. Pick another.",handle_taken:"That handle is taken. Pick another.",unavailable:"Share codes aren't available yet."},Su=new Set(["offline","signed_out","invalid_signature","stale_salt","no_device_key","too_many_requests"]);function vt(e,t=null){var n;return e instanceof _&&Su.has(e.code)?Ie(e):e instanceof _&&e.code==="too_many_codes"&&t!==null?`You have ${t} share codes already. Delete one to make another.`:(n=e instanceof _?hu[e.code]:void 0)!=null?n:"Something went wrong. Try again."}async function rn(){var t;let e=await dt(wt,"GET");return{codes:Array.isArray(e==null?void 0:e.codes)?e.codes.flatMap(n=>{let o=bu(n);return o?[o]:[]}):[],newHearts:typeof(e==null?void 0:e.new_hearts)=="number"?e.new_hearts:0,max:typeof(e==null?void 0:e.max)=="number"?e.max:null,profile:typeof((t=e==null?void 0:e.profile)==null?void 0:t.handle)=="string"?{handle:e.profile.handle,link:typeof e.profile.link=="string"?e.profile.link:null}:null,suggestedHandle:typeof(e==null?void 0:e.suggested_handle)=="string"?e.suggested_handle:null}}async function Ur(e,t,n){return jr(await dt(wt,"POST",g({name:e,keys:t},n===void 0?{}:{handle:n})))}function Hr(e){return`${U().shareUrl.replace(/\/+$/,"")}/@${e}`}async function $r(e,t,n){return jr(await dt(yu,"POST",{code:e,name:t,keys:n}))}async function Kr(e){try{await dt(fu,"POST",{code:e})}catch(t){if(t instanceof _&&t.code==="no_code")return;throw t}}async function zr(e){let t=U().shareUrl.replace(/\/+$/,""),n;try{n=await fetch(`${t}/${e}.json`)}catch(i){throw new _("offline")}if(n.status===404||n.status===403)throw new _("no_code");if(!n.ok)throw new _("failed");let o=Ar(await n.json().catch(()=>null));if(!o||o.code!==e)throw new _("no_code");return o}async function Fr(){let e=U().shareUrl.replace(/\/+$/,"");try{let t=await fetch(`${e}/${gu}`);if(!t.ok)return null;let n=await t.json();return Array.isArray(n.posts)?n.posts.flatMap(o=>{let i=wu(o);return i?[i]:[]}):null}catch(t){return null}}async function Wr(e,t,n=!1){try{await Xi(pu,g({code:e},n?{source:"preset"}:{}),{[mu]:t.hash})}catch(o){}}function bu(e){let t=e;return!t||typeof t.code!="string"?null:{code:t.code,name:typeof t.name=="string"&&t.name?t.name:null,link:typeof t.link=="string"?t.link:null,item_count:typeof t.item_count=="number"?t.item_count:0,imports:typeof t.imports=="number"?t.imports:0,created_at:typeof t.created_at=="number"?t.created_at:0,updated_at:typeof t.updated_at=="number"?t.updated_at:0,posted:ku(e.post)}}function ku(e){let t=e==null?void 0:e.status;return typeof t=="string"&&t!=="removed"}function wu(e){let t=e,n=o=>Number.isSafeInteger(o)&&o>=0?o:0;return!t||typeof t.code!="string"?null:{code:t.code,name:typeof t.name=="string"?t.name:fe(t.code),extensions:n(t.extensions),themes:n(t.themes),snippets:n(t.snippets)}}function jr(e){let t=e;if(typeof(t==null?void 0:t.code)!="string")throw new _("failed");return{code:t.code,link:typeof t.link=="string"?t.link:null,leftOut:Array.isArray(t.left_out)?t.left_out.length:0}}var Yr="/claims",vu="/claims/cancel",xu={no_backup:"Back up first, then secure your backup.",unsupported_identity:"This Spotify account can't be secured.",too_many_accounts:"Your account already has 10 Spotify accounts linked.",undone:"This backup can't be secured with your account.",offline:"Couldn't reach Syncify. Check your connection and try again."},Pe=class extends Error{constructor(n){var o;super((o=xu[n])!=null?o:"Couldn't secure your backup. Try again.");this.code=n;this.name="ClaimError"}};async function qr(e,t){let n=await eo(e,t,"GET",Yr);if(!n.ok)throw new Pe(await to(n));let o=await n.json().catch(()=>null);return{claim:pt(o==null?void 0:o.claim),accounts:Array.isArray(o==null?void 0:o.accounts)?o.accounts.filter(Cu):null}}async function Gr(e,t){let n=await eo(e,t,"POST",Yr);if(!n.ok)throw new Pe(await to(n));let o=await n.json().catch(()=>null);return pt(o==null?void 0:o.claim)}async function Vr(e,t){let n=await eo(e,t,"POST",vu);if(n.status===404)return"cancelled";if(!n.ok)throw new Pe(await to(n));let o=await n.json().catch(()=>null);return(o==null?void 0:o.held)===!0?"checking":"cancelled"}async function eo(e,t,n,o){try{return await Ee(e,t,{method:n},o)}catch(i){throw i instanceof TypeError?new Pe("offline"):i}}async function to(e){let t=await e.json().catch(()=>null);return typeof(t==null?void 0:t.code)=="string"?t.code:"failed"}function Cu(e){let t=e;return!!(t&&typeof t.hash=="string"&&(t.status==="pending"||t.status==="final"||t.status==="cancelled"||t.status==="unlinked"))}var Xe={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},Iu=/^([a-z0-9]|f([1-9]|1[0-2]))$/,Eu=250,Ru=40,no=null,an=null,Je=null;function Jr(){return/mac/i.test(navigator.platform||navigator.userAgent)}function Xr(e){if(e===null)return null;if(!e||typeof e!="object")return Xe;let t=e;return typeof t.key!="string"||!Iu.test(t.key)?Xe:{key:t.key,ctrl:!!t.ctrl,alt:!!t.alt,shift:!!t.shift,meta:!!t.meta}}function xt(e){if(!e)return"Off";let t=e.key.toUpperCase();return Jr()?[e.ctrl?"\u2318":"",e.alt?"\u2325":"",e.shift?"\u21E7":"",t].join(""):[e.ctrl&&"Ctrl",e.meta&&"Win",e.alt&&"Alt",e.shift&&"Shift",t].filter(Boolean).join("+")}function Zr(e){if(e.key==="Escape")return{kind:"cancel"};let t=Pu(e.code);if(!t)return{kind:"ignore"};let n=Jr();if(n&&e.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let o={key:t,ctrl:n?e.metaKey:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:n?!1:e.metaKey},i=t.startsWith("f")&&t.length>1;return!o.ctrl&&!o.alt&&!o.meta&&!i?{kind:"error",message:`Include ${n?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:o}}function Pu(e){var n,o;let t=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(e);return t?((o=(n=t[1])!=null?n:t[2])!=null?o:t[3]).toLowerCase():null}function Qr(e){var t;if(Je&&Nu(Je,e))return!1;try{let n=Spicetify.Mousetrap,o=(t=n.trigger)==null?void 0:t.call(n)._directMap;if(!o)return!1;let i=oo(e);return Object.keys(o).some(a=>a.startsWith(`${i}:`))}catch(n){return!1}}function io(e,t,n=0){if(no=t,an=e,!ea()){if(n>=Ru){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>io(an,t,n+1),Eu);return}ro(an)}function ro(e){if(an=e,!ea()||!no)return;let t=no;try{if(Je&&Spicetify.Keyboard._deregisterShortcut(Je),Je=null,!e)return;Spicetify.Keyboard.registerShortcut(e,n=>{n.preventDefault(),t()}),Je=e,console.debug("[Syncify]","Keyboard shortcut registered",xt(e))}catch(n){console.warn("[Syncify]","Failed to register keyboard shortcut",n)}}function ea(){var e;return typeof((e=Spicetify.Keyboard)==null?void 0:e.registerShortcut)=="function"}function oo(e){return[e.ctrl&&"mod",e.meta&&"meta",e.alt&&"alt",e.shift&&"shift",e.key].filter(Boolean).join("+")}function Nu(e,t){return oo(e)===oo(t)}var ao="both",Tu=["both","topbar","menu"],Ct=null,It=null,sn=!1;function ta(e){return Tu.includes(e)?e:ao}function na(){var e;return typeof((e=Spicetify.Menu)==null?void 0:e.Item)=="function"}function oa(e){Ct=e.topbarButton,It=e.menuItem}function cn(e){let t=e!=="menu"||!It,n=e!=="topbar";if(Ct!=null&&Ct.element&&(Ct.element.style.display=t?"":"none"),!!It)try{n&&!sn?(It.register(),sn=!0):!n&&sn&&(It.deregister(),sn=!1)}catch(o){console.warn("[Syncify]","Failed to update profile menu item",o)}}var un="syncify:config",ln={workerUrl:U().workerUrl,autoBackupEnabled:!1,shortcut:Xe,entryPoint:ao};function pe(){var n,o;let e=U(),t=(o=(n=Spicetify.LocalStorage)==null?void 0:n.get(un))!=null?o:window.localStorage.getItem(un);if(!t)return b(g({},ln),{workerUrl:e.workerUrl});try{let i=JSON.parse(t);return{workerUrl:e.workerUrl,autoBackupEnabled:i.autoBackupEnabled===void 0?ln.autoBackupEnabled:!!i.autoBackupEnabled,shortcut:i.shortcut===void 0?ln.shortcut:Xr(i.shortcut),entryPoint:ta(i.entryPoint)}}catch(i){return b(g({},ln),{workerUrl:e.workerUrl})}}function ia(e){var n;let t=JSON.stringify({workerUrl:U().workerUrl,autoBackupEnabled:e.autoBackupEnabled,shortcut:e.shortcut,entryPoint:e.entryPoint});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set(un,t);return}window.localStorage.setItem(un,t)}function Et(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}var _u=["username","canonicalUsername","id","uri","displayName"];async function me(){let{value:e,field:t}=await Au();return{hash:await Yt(e),field:t}}async function Au(){var i;let e=(i=Spicetify.Platform)==null?void 0:i.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let t=await e.getUser(),n=_u.find(a=>(t==null?void 0:t[a])!=null),o=n?t[n]:void 0;if(!n||!o)throw new Error("Unable to resolve the active Spotify user.");return{value:o,field:n}}async function Pt(e){if(!Et(e))throw new Error("Syncify backup service is not configured.");let[t,n]=await Promise.all([me(),hr()]);if(n.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:o,unapproved:i}=await er(e.workerUrl,t,n);return{payload:n,unchanged:o,unapproved:i}}async function Me(e,t){var c;if(!Et(e))throw new Error("Syncify backup service is not configured.");let n=await $n(e.workerUrl,await me(),t),[o,i,a]=await Promise.all([Promise.all(n.backups.map(co)),n.safetyCopy?co(n.safetyCopy):null,Promise.all(n.unapproved.map(co))]),s=o.filter((l,d)=>o.findIndex(u=>u.payload_hash===l.payload_hash)===d);return b(g({},n),{payload:(c=s[0])!=null?c:null,backups:s,safetyCopy:i&&!s.some(l=>l.payload_hash===i.payload_hash)?i:null,unapproved:a.filter(l=>!s.some(d=>d.payload_hash===l.payload_hash))})}var so=new Map;async function co(e){var a,s,c;let t=(s=(a=e.marketplace_data)==null?void 0:a.keys)!=null?s:{},n=e.spicetify_config?Wn(e.spicetify_config,t):void 0,o=`${e.payload_hash} ${(c=e.metadata)==null?void 0:c.last_sync_datetime}`,i=so.get(o);return i||(i=Qt(t,n),so.set(o,i),i.catch(()=>so.delete(o))),b(g(g({},e),n?{spicetify_config:n}:{}),{payload_hash:await i})}async function ra(e){let t=await $n(Nt(e),await me());return{claim:t.claim,install:t.install,nudge:t.nudge}}async function aa(e,t,n,o=[]){var c;let i=t!=null?t:(await Me(e)).payload;if(!i)throw new Error("No Syncify cloud backup was found for this Spotify account.");let a=await Sr(i,o),s=(c=i.backup)==null?void 0:c.id;return s&&Et(e)&&me().then(l=>nr(e.workerUrl,l,s,n)).catch(()=>{}),{payload:i,restoredCount:a}}var Rt=class extends Error{constructor(n){super("Couldn't back up your setup first, so nothing changed.");this.reason=n;this.name="SafetyBackupError"}};async function sa(e,t,n,o,i,a=!1){try{await Pt(e)}catch(c){throw new Rt(c)}let s=await Or(t,n,o,i);return me().then(c=>Wr(t.code,c,a)).catch(()=>{}),s}async function ca(e){let t=await me(),n=await qr(Nt(e),t);return b(g({},n),{hash:t.hash})}async function la(e){await Gr(Nt(e),await me())}async function dn(e,t,n){await tr(Nt(e),await me(),t,n)}async function yn(e){return Vr(Nt(e),await me())}function Nt(e){if(!Et(e))throw new Error("Syncify backup service is not configured.");return e.workerUrl}var ua="syncify:nudge-hidden-until",da="syncify:nudge-panel-shown";function ya(e=Date.now()){let t=Number(ga(ua));return Number.isFinite(t)&&t>e}function fa(e=Date.now()){ha(ua,String(e+30*864e5))}function pa(){return ga(da)!==null}function ma(){ha(da,"1")}function ga(e){var t,n;return(n=(t=Spicetify.LocalStorage)==null?void 0:t.get(e))!=null?n:window.localStorage.getItem(e)}function ha(e,t){var n;(n=Spicetify.LocalStorage)!=null&&n.set?Spicetify.LocalStorage.set(e,t):window.localStorage.setItem(e,t)}var lo="syncify:claim-check-day",Sa="syncify:undone-claim-shown";async function ba(e){var n,o;let t=pe();if(t.workerUrl){if(!t.autoBackupEnabled)return Mu(e);try{let[i,a]=await Promise.all([en(),Me(t)]);ka(a,e);let s=(o=(n=a.payload)==null?void 0:n.metadata.marketplace_key_count)!=null?o:0;if(a.exists&&br(i.keyCount,s)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(a.backups.some(l=>l.payload_hash===i.hash)||i.keyCount===0)return;let{unapproved:c}=await Pt(t);Spicetify.showNotification(c?"Syncify: backed up, waiting for approval":"Syncify auto-backup complete")}catch(i){if(i instanceof re||i instanceof _e){Spicetify.showNotification("Syncify: sign in to keep backing up",!0,8e3);return}let a=i instanceof Error?i.message:String(i);console.warn("Syncify startup sync failed:",i),Spicetify.showNotification(`Syncify auto-sync skipped: ${a}`,!0,8e3)}}}async function Mu(e){let t=new Date().toLocaleDateString("en-CA");if(wa(lo)!==t)try{let n=await ra(pe());uo(lo,t),ka(n,e)}catch(n){if(n instanceof re){uo(lo,t);return}console.warn("Syncify claim check failed:",n)}}function ka(e,t){var a;let n=Bu(e.claim),o=Lu(e.claim),i=(a=e.install)==null?void 0:a.waiting[0];n?t.onClaim(n):o?t.onUndone(o)&&uo(Sa,String(o.undone_at)):i?t.onInstall(i):e.nudge&&!pa()&&t.onNudge()}function Bu(e){return(e==null?void 0:e.status)==="pending"&&!e.mine&&!e.not_me?e:null}function Lu(e){return(e==null?void 0:e.status)==="undone"&&wa(Sa)!==String(e.undone_at)?e:null}function wa(e){var t,n;return(n=(t=Spicetify.LocalStorage)==null?void 0:t.get(e))!=null?n:window.localStorage.getItem(e)}function uo(e,t){var n;(n=Spicetify.LocalStorage)!=null&&n.set?Spicetify.LocalStorage.set(e,t):window.localStorage.setItem(e,t)}var fo="syncify:pending-restore",Du=600*1e3,Ou=2e3,Uu=15e3,Hu="marketplace:theme-installed",$u="raw.githubusercontent.com",Ku=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],ge=null,yo=new Set,Ca=new Map;function Ia(){return ge}function Ea(e){return yo.add(e),()=>yo.delete(e)}function Ra(){ge&&Aa(b(g({},ge),{manual:[]}))}function _t(e,t="restore"){try{localStorage.setItem(fo,JSON.stringify({at:Date.now(),manual:e,kind:t}))}catch(n){}}function Pa(){var e;_t((e=ge==null?void 0:ge.manual)!=null?e:[],ge==null?void 0:ge.kind),window.location.reload()}function Na(){Ma()&&(document.addEventListener("load",e=>va(e.target,"load"),!0),document.addEventListener("error",e=>va(e.target,"error"),!0))}async function Ta(){let e=Ma();if(!e)return;try{localStorage.removeItem(fo)}catch(s){}let t=Date.now(),n=await xa();for(;n.loaded<n.total&&Date.now()-t<Uu;)await new Promise(s=>setTimeout(s,Ou)),n=await xa();Aa(b(g({kind:e.kind,at:Date.now()},n),{manual:e.manual}));let o=n.loaded===n.total&&e.manual.length===0,i=e.kind==="share"?"Setup applied":"Backup restored",a=e.kind==="share"?"loaded":"restored";Spicetify.showNotification(o?`Syncify: ${i}; ${n.total} ${n.total===1?"item":"items"}`:`Syncify: ${a} ${n.loaded} of ${n.total}. Open Syncify for details.`,!1,8e3)}function _a(e){let t=e.map(n=>n.type==="extension"?`spicetify config extensions ${fn(n.name)}`:n.type==="custom_app"?`spicetify config custom_apps ${fn(n.name)}`:`spicetify config current_theme ${fn(n.name)}${n.scheme?` color_scheme ${fn(n.scheme)}`:""}`);return t.length>0?[...t,"spicetify apply"]:[]}function fn(e){return/^[\w.@+/-]+$/.test(e)?e:`"${e}"`}function Aa(e){ge=e;for(let t of yo)t(e)}function Ma(){var e;try{let t=JSON.parse((e=localStorage.getItem(fo))!=null?e:"null");return!t||Date.now()-t.at>Du?null:{manual:Array.isArray(t.manual)?t.manual:[],kind:t.kind==="share"?"share":"restore"}}catch(t){return null}}function va(e,t){e instanceof HTMLScriptElement&&e.src&&Ca.set(Tt(e.src),t)}async function xa(){var o;let e=await ue(),t=(o=e[Hu])!=null?o:"",n=J(e).filter(i=>i.type==="extension"&&i.sources.length>0||i.type==="theme"&&t.includes(i.key)||i.type==="snippet");return{loaded:n.filter(zu).length,total:n.length}}function zu(e){var t,n;if(e.type==="snippet"){let o=document.querySelector("style.marketplaceSnippets");return((t=o==null?void 0:o.textContent)==null?void 0:t.includes(`/* ${e.name} - `))===!0}if(e.type==="theme"){let o=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((n=o==null?void 0:o.textContent)!=null&&n.trim())}return Fu(e.sources[0]).some(Wu)}function Fu(e){let t;try{t=new URL(e)}catch(s){return[]}if(t.host!==$u)return[Tt(t.href)];let[n,o,i,...a]=t.pathname.split("/").filter(Boolean);return!n||!o||!i||a.length===0?[]:Ku.map(s=>Tt(`https://${s}/gh/${n}/${o}@${i}/${a.join("/")}`))}function Wu(e){let t=Ca.get(e);return t?t==="load":[...document.querySelectorAll("script[src]")].some(o=>Tt(o.src)===e)&&performance.getEntriesByType("resource").some(o=>Tt(o.name)===e)}function Tt(e){try{let t=new URL(e);return`${t.origin}${t.pathname}`}catch(t){return e}}var ju="syncify:beta",Ba=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function La(){var e;return(e=window.SyncifyLoader)!=null?e:null}function Yu(){try{return window.localStorage.getItem(ju)==="true"}catch(e){return!1}}async function Da(e){let t=Yu()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(t.map(o=>qu(`${e}/${o}`)))).reduce((o,i)=>i&&(!o||mo(i,o)>0)?i:o,null)}function po(e){return typeof e=="string"&&Ba.test(e)}function mo(e,t){let[n,o]=[e,t].map(i=>{var d;let[,a,s,c,l]=(d=Ba.exec(i))!=null?d:[];return[a,s,c,l!=null?l:1/0].map(Number)});for(let i=0;i<n.length;i+=1)if(n[i]!==o[i])return n[i]<o[i]?-1:1;return 0}async function qu(e,t=3e3){let n=typeof AbortController=="function"?new AbortController:null,o=setTimeout(()=>n==null?void 0:n.abort(),t);try{let i=await fetch(e,{signal:n==null?void 0:n.signal});if(!i.ok)return null;let a=await i.json();return po(a==null?void 0:a.version)?a.version:null}catch(i){return null}finally{clearTimeout(o)}}function Be(...e){return e.filter(Boolean).join(" ")}function go(e,t){return t===void 0?e:b(g({},e),{key:t})}function r(e,t,n){let a=t,{children:o}=a,i=le(a,["children"]);return o===void 0?st(e,go(i,n)):st(e,go(i,n),o)}function f(e,t,n){let s=t,{children:o}=s,i=le(s,["children"]),a=Array.isArray(o)?o:[o];return st(e,go(i,n),...a)}var Gu={primary:"regular",secondary:"regular",danger:"regular",text:"small",subtle:"small"};function k(e){let l=e,{variant:t="primary",size:n=Gu[t],type:o="button",icon:i,children:a,className:s}=l,c=le(l,["variant","size","type","icon","children","className"]);return f("button",b(g({className:Be("syncify-btn",s),"data-variant":t,"data-size":n,type:o},c),{children:[i,r("span",{className:"syncify-cap",children:a})]}))}function ho(e){return r("input",{className:"syncify-checkbox",type:"checkbox","aria-label":e.label,checked:e.checked,onChange:t=>e.onChange(t.currentTarget.checked),disabled:e.disabled})}var Vu=0;function Y(e){let[t]=m(()=>`syncify-${e}-${++Vu}`);return t}function pn(e){return f("div",{className:"syncify-dialog-content",children:[r("h2",{className:"syncify-dialog-title",id:e.titleId,children:e.title}),e.children?r("div",{className:"syncify-dialog-text",children:e.children}):null,r("div",{className:"syncify-dialog-actions",children:e.actions})]})}function So(e){let t=j(null),n=Y("dialog"),{open:o}=e,i=j(e.onClose);return ct(()=>{i.current=e.onClose}),T(()=>{let a=t.current;if(!a||!o)return;let s=document.activeElement;a.open||a.showModal();let c=l=>{l.preventDefault(),i.current()};return a.addEventListener("cancel",c),()=>{a.removeEventListener("cancel",c),a.open&&a.close(),s instanceof HTMLElement&&s.isConnected&&s.focus()}},[o]),o?r("dialog",{className:"syncify-dialog",ref:t,"aria-labelledby":n,children:r(pn,{title:e.title,actions:e.actions,titleId:n,children:e.children})}):null}function ke(e){var i,a;let t=Y("field"),n=`${t}-error`,o=!!e.error;return f("div",{className:"syncify-field-group",children:[r("label",{className:"syncify-field-label",htmlFor:t,children:e.label}),f("div",{className:"syncify-field-row",children:[f("span",{className:"syncify-input-box","data-invalid":o?"true":void 0,"data-disabled":e.disabled?"true":void 0,children:[e.prefix?r("span",{className:"syncify-input-prefix","aria-hidden":"true",children:e.prefix}):null,r("input",{className:"syncify-input-control",id:t,type:(i=e.type)!=null?i:"text",value:e.value,onChange:s=>e.onChange(s.currentTarget.value),onBlur:e.onBlur,placeholder:e.placeholder,inputMode:e.inputMode,autoComplete:(a=e.autoComplete)!=null?a:"off",spellCheck:!1,maxLength:e.maxLength,disabled:e.disabled,autoFocus:e.autoFocus,"aria-invalid":o||void 0,"aria-describedby":o?n:void 0,"data-mono":e.mono?"true":void 0})]}),e.action]}),o?r("span",{className:"syncify-field-error",id:n,role:"alert",children:e.error}):null]})}function Ze(e){let i=e,{children:t,className:n}=i,o=le(i,["children","className"]);return r("svg",b(g({className:Be("syncify-icon",n),viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},o),{children:t}))}function bo(e){return r(Ze,b(g({},e),{children:r("path",{d:"m9 6 6 6-6 6"})}))}function ko(e){return r(Ze,b(g({},e),{children:r("path",{d:"m6 9 6 6 6-6"})}))}function we(e){return r(Ze,b(g({},e),{children:r("path",{d:"M5 12.5l4.5 4.5L19 7.5"})}))}function wo(e){return r(Ze,b(g({},e),{children:r("path",{d:"M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z"})}))}function vo(e){return f(Ze,b(g({},e),{"data-filled":"true",children:[r("rect",{x:"4",y:"10.5",width:"3",height:"3",rx:"0.75"}),r("rect",{x:"10.5",y:"10.5",width:"3",height:"3",rx:"0.75"}),r("rect",{x:"17",y:"10.5",width:"3",height:"3",rx:"0.75"})]}))}function xo(e){return f(Ze,b(g({},e),{children:[r("path",{d:"M12 6v7"}),r("path",{d:"M12 17.5v.5"})]}))}function Co(e){let i=e,{keys:t,recording:n}=i,o=le(i,["keys","recording"]);return r("button",b(g({className:"syncify-keycap",type:"button","data-recording":n?"true":void 0},o),{children:r("span",{className:"syncify-cap",children:t})}))}function te(e){return r("ul",{className:"syncify-list","aria-label":e.label,children:e.children})}function mn(){return r("li",{className:"syncify-list-divider",role:"presentation"})}function X(e){let t=f(L,{children:[e.leading?r("span",{className:"syncify-row-leading",children:e.leading}):null,f("span",{className:"syncify-row-name",children:[r("span",{className:"syncify-row-name-text",children:e.name}),e.nameMark]}),e.meta?r("span",{className:"syncify-row-meta",children:e.meta}):null,e.end?r("span",{className:"syncify-row-end",children:e.end}):null]}),n=e.meta?"2":"1";return r("li",{className:"syncify-list-item",children:e.onOpen?f("button",{className:"syncify-row",id:e.id,"data-lines":n,type:"button","aria-label":e.openLabel,onClick:e.onOpen,disabled:e.disabled,children:[t,r(bo,{className:"syncify-row-chevron"})]}):r("div",{className:"syncify-row",id:e.id,"data-lines":n,children:t})})}function he(e){return r("span",{className:"syncify-mark-square","data-tone":e.tone,"data-size":e.icon?"large":"small",role:e.label?"img":void 0,"aria-label":e.label,"aria-hidden":e.label?void 0:"true",children:e.icon})}function Io(e){return r("span",{className:"syncify-badge",role:"img","aria-label":e.label,children:r("span",{className:"syncify-cap",children:e.count})})}function ve(e){let t=Y("menu"),[n,o]=m(!1),i=j(null),a=j(null),s=e.items.some(y=>y.checked!==void 0);T(()=>{var h,P;let y=a.current,p=i.current;if(!n||!y||!p)return;Xu(y),ed(y,p);let w=Oa(y);(P=(h=w.find(O=>O.getAttribute("aria-checked")==="true"))!=null?h:w[0])==null||P.focus();let v=()=>o(!1),I=O=>{let E=O.target;E instanceof Node&&!y.contains(E)&&!p.contains(E)&&v()},S=O=>{O.target instanceof Node&&y.contains(O.target)||v()};return document.addEventListener("pointerdown",I,!0),document.addEventListener("scroll",S,!0),window.addEventListener("resize",v),()=>{document.removeEventListener("pointerdown",I,!0),document.removeEventListener("scroll",S,!0),window.removeEventListener("resize",v),Zu(y)}},[n]);function c(){var y;o(!1),(y=i.current)==null||y.focus()}function l(y){let p=Oa(y.currentTarget),w=p.findIndex(I=>I===document.activeElement),v=y.key==="ArrowDown"?p[(w+1)%p.length]:y.key==="ArrowUp"?p[(w-1+p.length)%p.length]:y.key==="Home"?p[0]:y.key==="End"?p[p.length-1]:null;v?(y.preventDefault(),v.focus()):y.key==="Escape"?(y.preventDefault(),c()):y.key==="Tab"&&o(!1)}function d(y){(y.key==="ArrowDown"||y.key==="ArrowUp")&&(y.preventDefault(),o(!0))}let u={ref:i,type:"button","aria-haspopup":"menu","aria-expanded":n,"aria-controls":n?t:void 0,disabled:e.disabled,onClick:()=>o(!n),onKeyDown:d};return f(L,{children:[e.trigger==="more"?r("button",b(g({className:"syncify-icon-btn","aria-label":e.label},u),{children:r(vo,{})})):f("button",b(g({className:"syncify-menu-value","aria-label":`${e.label}: ${e.trigger.value}`},u),{children:[r("span",{className:"syncify-cap",children:e.trigger.value}),r(ko,{})]})),n?r("div",{className:"syncify-menu",id:t,ref:a,role:"menu","aria-label":e.label,popover:"manual",onKeyDown:l,children:e.items.map(y=>r(Ju,{item:y,picks:s,onPick:()=>{c(),y.onSelect()}},y.label))}):null]})}function Ju(e){let{item:t,picks:n}=e;return f("button",{className:"syncify-menu-item",type:"button",role:n?"menuitemradio":"menuitem","aria-checked":n?t.checked===!0:void 0,"data-danger":t.danger?"true":void 0,tabIndex:-1,disabled:t.disabled,onClick:e.onPick,children:[r("span",{className:"syncify-cap",children:t.label}),t.checked?r(we,{}):null]})}function Oa(e){return[...e.querySelectorAll(".syncify-menu-item:not(:disabled)")]}function Xu(e){typeof e.showPopover=="function"&&!e.matches(":popover-open")&&e.showPopover()}function Zu(e){typeof e.hidePopover=="function"&&e.matches(":popover-open")&&e.hidePopover()}var Qu=4;function ed(e,t){let n=Qu,o=t.getBoundingClientRect(),i=e.getBoundingClientRect(),a=o.bottom+n,s=a+i.height>window.innerHeight&&o.top-n-i.height>=0?o.top-n-i.height:a,c=Math.min(Math.max(o.right-i.width,n),window.innerWidth-i.width-n);e.style.top=`${s}px`,e.style.left=`${c}px`}function Ua(){return f(L,{children:[r("span",{className:"syncify-dot","aria-hidden":"true"}),r("span",{className:"syncify-visually-hidden",children:", "})]})}function z(e){let t=e.parts.filter(n=>n!=null&&n!==!1&&n!=="");return r("span",{className:Be("syncify-meta",e.className),children:t.map((n,o)=>f(L,{children:[o>0?r(Ua,{}):null,r("span",{className:"syncify-meta-part",children:n})]},o))})}function Eo(e){let t=Math.min(Math.max(e.used,0),e.max),n=`Used ${e.used} of ${e.max}`;return f("span",{className:"syncify-meter",role:"meter","aria-label":e.label,"aria-valuemin":0,"aria-valuemax":e.max,"aria-valuenow":t,"aria-valuetext":n,"data-full":e.used>=e.max?"true":void 0,children:[r("span",{className:"syncify-cap",children:n}),r("span",{className:"syncify-meter-bars","aria-hidden":"true",children:Array.from({length:e.max},(o,i)=>r("span",{className:"syncify-meter-bar","data-used":i<t?"true":void 0},i))})]})}function M(e){let t=e.tone==="error"?"alert":e.live?"status":void 0;return f("div",{className:"syncify-notice","data-tone":e.tone,role:t,children:[f("span",{className:"syncify-notice-body",children:[r("span",{className:"syncify-notice-mark",children:r(he,{tone:e.tone})}),r("span",{className:"syncify-notice-text",children:e.children})]}),e.actions?r("span",{className:"syncify-notice-actions",children:e.actions}):null]})}function xe(e){return r("span",{className:"syncify-pip-square","data-kind":e.kind,"aria-hidden":"true"})}function ae(e){return f("div",{className:"syncify-section-label",children:[r("h3",{className:"syncify-section-label-title",id:e.id,tabIndex:e.focusable?-1:void 0,children:e.title}),e.end]})}function Z(e){return f("div",{className:"syncify-setting-row",children:[f("span",{className:"syncify-setting-row-text",children:[r("span",{className:"syncify-setting-row-label",children:e.label}),e.value?r("span",{className:"syncify-setting-row-value",children:e.value}):null]}),e.children]})}function At(e){return r("div",{className:"syncify-setting-group",role:"group","aria-label":e.label,children:e.children})}function Ce(){return r("li",{className:"syncify-list-item","aria-hidden":"true",children:f("div",{className:"syncify-row","data-lines":"2",children:[r("span",{className:"syncify-row-name",children:r("span",{className:"syncify-skeleton","data-width":"name"})}),r("span",{className:"syncify-row-meta",children:r("span",{className:"syncify-skeleton","data-width":"meta"})})]})})}function Ha(e){return r("input",{className:"syncify-switch-control",type:"checkbox",role:"switch",checked:e.checked,onChange:t=>e.onChange(t.currentTarget.checked),disabled:e.disabled})}function Ro(e){let o=e,{label:t}=o,n=le(o,["label"]);return f("label",{className:"syncify-setting-row","data-disabled":e.disabled?"true":void 0,children:[r("span",{className:"syncify-setting-row-label",children:t}),r(Ha,g({},n))]})}var $a=(e,t)=>`${e}-tab-${t}`,Ka=(e,t)=>`${e}-panel-${t}`;function Po(e){let t=j(null);function n(o){var c,l;let i=e.tabs.length,a=e.tabs.findIndex(d=>d.id===e.selected),s=o.key==="ArrowRight"?(a+1)%i:o.key==="ArrowLeft"?(a-1+i)%i:o.key==="Home"?0:o.key==="End"?i-1:null;s!==null&&(o.preventDefault(),e.onSelect(e.tabs[s].id),(l=(c=t.current)==null?void 0:c.querySelectorAll('[role="tab"]')[s])==null||l.focus())}return r("div",{className:"syncify-tabs",role:"tablist","aria-label":e.label,ref:t,onKeyDown:n,children:e.tabs.map(o=>{let i=o.id===e.selected;return f("button",{className:"syncify-tab",id:$a(e.idBase,o.id),type:"button",role:"tab","aria-selected":i,"aria-controls":Ka(e.idBase,o.id),tabIndex:i?0:-1,onClick:()=>e.onSelect(o.id),children:[r("span",{className:"syncify-cap",children:o.label}),o.status]},o.id)})})}function G(e){return f("div",{className:"syncify-tab-panel",id:Ka(e.idBase,e.id),role:"tabpanel","aria-labelledby":$a(e.idBase,e.id),children:[r("div",{className:"syncify-tab-scroll",tabIndex:0,children:e.children}),e.actions?r("div",{className:"syncify-tab-actions",children:e.actions}):null]})}function Se(e){let t=j(e);return ct(()=>{t.current=e}),t}function Q(e){if(e.startsWith("mailto:")){window.location.href=e;return}window.open(e,"_blank","noopener,noreferrer")}function gn(e){let t=e.lastIndexOf("@");if(t<1)return e;let n=e.slice(0,t);return n.length<=2?e:`${n[0]}${"*".repeat(n.length-2)}${n[n.length-1]}${e.slice(t)}`}function za(e,t=new Date){let n=new Date(e);return n.toDateString()===t.toDateString()?"today":n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===t.getFullYear()?void 0:"numeric"})}function Fa(e){let t=za(e);return t==="today"?t:`on ${t}`}function td(e){let t=za(e);return t==="today"?t:`by ${t}`}function hn(e){var t;return e.not_me?{title:"Syncify is checking this claim",text:null}:{title:`${(t=e.email)!=null?t:"Someone"} is securing this backup`,text:e.held?"Syncify is checking it.":`If that isn't you, press Not me ${td(e.final_at)}.`}}function Wa(e){var t;return`This backup is no longer secured by ${(t=e.email)!=null?t:"another account"}`}function Sn(e){return e==="cancelled"?"Syncify: claim cancelled":"Syncify: sent for a check"}function bn(e){return`A new install${e.device?` on ${e.device}`:""} wants to back up this Spotify account`}function ja(e,t,n){var s,c;if(t==="not_owner")return{kind:"other-account"};if(!e)return n?{kind:"other-claim"}:{kind:"unknown"};let{claim:o}=e;if((o==null?void 0:o.status)==="final"){if(!o.mine)return{kind:"other-account"};let l=((s=e.accounts)!=null?s:[]).filter(d=>d.status==="final").length;return{kind:"secured",linkedCount:Math.max(l,1)}}if((o==null?void 0:o.status)==="pending")return o.mine?{kind:"pending",finalAt:o.final_at,held:o.held}:{kind:"other-claim"};let i=((c=e.accounts)!=null?c:[]).filter(l=>l.hash===e.hash),a=i[i.length-1];return(a==null?void 0:a.status)==="unlinked"?{kind:"ended",reason:"undone"}:(a==null?void 0:a.status)==="cancelled"&&a.cancelled_by!=="claimer"?{kind:"ended",reason:a.cancelled_by==="owner"?"owner":"admin"}:{kind:"open"}}function Ya(e,t,n){return t?{kind:"warning",label:"Sign in to see your backups"}:e?n.kind==="secured"?{kind:"ok",label:"Signed in, backup secured"}:n.kind==="pending"?null:n.kind==="open"?{kind:"warning",label:"Backup not secured yet"}:n.kind==="ended"?{kind:"warning",label:"Backup not secured"}:{kind:"ok",label:"Signed in"}:null}function qa(e){return e.held?"Syncify is checking your request to secure this backup":`Your backup will be secured ${Fa(e.finalAt)}`}var Mt=6,nd=600*1e3,od=300,id=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function No(e){return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function Ga(e){let[t,n]=m(()=>Wt()),[o,i]=m(()=>Wt().email),[a,s]=m(""),[c,l]=m(!1),[d,u]=m(null),[y,p]=m(()=>Date.now()),w=!!(t.codeSentAt&&y-t.codeSentAt<nd),v=Math.max(0,Math.ceil((t.retryAt-y)/1e3)),I=t.retryEmail===null||t.retryEmail===o.trim().toLowerCase()?v:0;T(()=>{if(t.retryAt<=Date.now())return;let E=setInterval(()=>{p(Date.now()),t.retryAt<=Date.now()&&clearInterval(E)},1e3);return()=>clearInterval(E)},[t.retryAt]);function S(E){let R=g(g({},Wt()),E);zi(R),n(R),p(Date.now())}async function h(E){var D;let R=E.trim();if(!id.test(R)){u("Enter a valid email address.");return}l(!0),u(null);try{let x=await Yi(R,{nudge:e.nudge});S({email:R,codeSentAt:Date.now(),retryAt:Date.now()+x*1e3,retryEmail:R.toLowerCase()}),s("")}catch(x){let N=x instanceof _?x:null,F=(D=N==null?void 0:N.retryAfter)!=null?D:null,ee=F&&F<=od?Date.now()+F*1e3:0,H=(N==null?void 0:N.code)==="too_many_requests"?null:R.toLowerCase();if((N==null?void 0:N.code)==="resend_wait"){S({email:R,codeSentAt:t.email===R&&t.codeSentAt?t.codeSentAt:Date.now(),retryAt:ee,retryEmail:H});return}ee&&S({retryAt:ee,retryEmail:H}),u(Ie(x))}finally{l(!1)}}async function P(){l(!0),u(null);try{let E=await qi(t.email,a);S({codeSentAt:null}),s(""),e.onSignedIn(E)}catch(E){u(Ie(E));let R=E instanceof _?E.code:null;(R==="too_many_attempts"||R==="code_expired")&&s("")}finally{l(!1)}}async function O(E){l(!0),u(null),await Vi(),S({email:E,codeSentAt:null}),i(E),l(!1)}return{draft:t,email:o,setEmail:i,code:a,setCode:E=>s(E.replace(/\D/g,"").slice(0,Mt)),busy:c,error:d,codeSent:w,waitSeconds:v,emailWaitSeconds:I,requestCode:h,verify:P,signOut:O,useAnotherEmail:()=>{S({codeSentAt:null}),s(""),u(null)}}}function Va(e){let{signIn:t}=e,{busy:n}=t;return r("form",{className:"syncify-account-form",noValidate:!0,onSubmit:o=>{o.preventDefault(),!n&&(t.codeSent?t.code.length===Mt&&t.verify():t.emailWaitSeconds||t.requestCode(t.email))},children:t.codeSent?f(L,{children:[r(ke,{label:`Code sent to ${gn(t.draft.email)}`,value:t.code,onChange:t.setCode,error:t.error,placeholder:"123456",inputMode:"numeric",autoComplete:"one-time-code",maxLength:Mt,mono:!0,autoFocus:!0,action:r(k,{type:"submit",disabled:n||t.code.length!==Mt,children:n?"Verifying\u2026":"Verify"})}),f("span",{className:"syncify-account-resend",children:[r(k,{variant:"text",onClick:()=>{t.requestCode(t.draft.email)},disabled:n||t.waitSeconds>0,children:t.waitSeconds>0?`Resend in ${No(t.waitSeconds)}`:"Resend code"}),r(k,{variant:"text",onClick:t.useAnotherEmail,disabled:n,children:"Use another email"})]})]}):r(ke,{label:"Email for sign-in codes",type:"email",value:t.email,onChange:t.setEmail,error:t.error,placeholder:"you@example.com",autoComplete:"email",autoFocus:!0,action:r(k,{type:"submit",disabled:n||t.emailWaitSeconds>0||!t.email.trim(),children:n?"Sending\u2026":t.emailWaitSeconds>0?`Send in ${No(t.emailWaitSeconds)}`:"Send code"})})})}var rd={owner:"This backup isn't secured. Someone using this Spotify account said it isn't yours.",admin:"This backup isn't secured. Syncify couldn't confirm it's yours.",undone:"This backup is no longer secured by your account."};function Ja(e){let{session:t,secure:n,handle:o}=e,i=Ga({nudge:e.nudge,onSignedIn:e.onSignedIn}),[a,s]=m(null),[c,l]=m(!1),d=Se(h=>{t&&Gi().then(P=>{!h()||P||(s({kind:"warning",text:Ie(new _("signed_out"))}),e.onSignedOut())}).catch(()=>{})}),u=t==null?void 0:t.token;T(()=>{let h=!0;return d.current(()=>h),()=>{h=!1}},[d,u]);let y=Se(h=>{!t||o!==void 0||rn().then(P=>{var O,E;h()&&e.onHandle((E=(O=P.profile)==null?void 0:O.handle)!=null?E:null)}).catch(()=>{})});T(()=>{let h=!0;return y.current(()=>h),()=>{h=!1}},[y,!!t&&o===void 0]);async function w(){l(!0),s(null);try{Q(await Ji())}catch(h){let P=h instanceof _&&h.code==="signed_out";s({kind:P?"warning":"error",text:Ie(h)}),P&&e.onSignedOut()}finally{l(!1)}}async function v(){var h;s(null),await i.signOut((h=t==null?void 0:t.email)!=null?h:""),e.onSignedOut()}if(t===void 0)return r(G,{idBase:e.idBase,id:"account",children:null});if(!t)return f(G,{idBase:e.idBase,id:"account",children:[r("p",{className:"syncify-tab-text",children:e.locked?"Sign in with the email that secured this backup":"Sign in to secure your backup so only you can restore it"}),a?r(M,{tone:a.kind,live:!0,children:a.text}):null,r(Va,{signIn:i})]});let I=n.kind==="open"||n.kind==="other-claim"||n.kind==="ended"&&n.reason!=="undone",S=i.busy||c;return f(G,{idBase:e.idBase,id:"account",children:[f(At,{children:[r(Z,{label:"Email for sign-in codes",value:gn(t.email),children:r(k,{variant:"secondary",size:"small",onClick:()=>{w()},disabled:S,children:"Change"})}),o?r(Z,{label:"Creator handle",value:`@${o}`,children:r(k,{variant:"secondary",size:"small",onClick:()=>{w()},disabled:S,children:"Change"})}):null,r(Z,{label:"Your account page",children:r(k,{variant:"secondary",size:"small",onClick:()=>{w()},disabled:S,children:"Open"})}),I?r(Z,{label:"Secure your backup so only you can restore it",children:r(k,{onClick:e.onSecure,disabled:S||e.securing||n.kind==="other-claim",children:e.securing?"Securing\u2026":n.kind==="ended"?"Secure again":"Secure"})}):null]}),n.kind==="ended"?r(M,{tone:"warning",children:rd[n.reason]}):null,e.secureError?r(M,{tone:"error",children:e.secureError}):null,a?r(M,{tone:a.kind,live:!0,children:a.text}):null,f("div",{className:"syncify-account-footer",children:[f("span",{className:"syncify-account-status",children:[n.kind==="secured"?r(we,{className:"syncify-account-check"}):null,r(z,{parts:ad(n)})]}),r(k,{variant:"text",onClick:()=>{v()},disabled:S,children:"Sign out"})]})]})}function ad(e){switch(e.kind){case"secured":return["This backup is secured",...e.linkedCount>1?[`${e.linkedCount} Spotify accounts linked`]:[]];case"pending":return[qa(e)];case"other-account":return["This backup is secured by another account"];default:return["Signed in"]}}var Xa=new WeakMap;function Qe(e){let t=Xa.get(e);return t||(t=J(e.marketplace_data.keys),Xa.set(e,t)),t}function Le(e){return De(e,"item")}function De(e,t){return`${e} ${t}${e===1?"":"s"}`}function et(e,t=new Date){let n=new Date(e);if(Number.isNaN(n.getTime()))return e;let o=n.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),i=new Date(t);return i.setDate(t.getDate()-1),n.toDateString()===t.toDateString()?`today, ${o}`:n.toDateString()===i.toDateString()?`yesterday, ${o}`:`${n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===t.getFullYear()?void 0:"numeric"})}, ${o}`}function kn(e){return e.length<=1?e.join(""):`${e.slice(0,-1).join(", ")} and ${e[e.length-1]}`}function Za(e,t,n){var l,d;let o=et(e.metadata.last_sync_datetime),i=Le(Qe(e).length),a=`from ${e.metadata.device_info}`,s=(d=(l=e.backup)==null?void 0:l.name)!=null?d:null,c=e.payload_hash===n;return t==="safety-copy"?{backup:e,kind:t,name:"Safety copy",meta:[s,o,i,"updated weekly"].filter(sd),current:c,title:`the safety copy from ${o}`}:t==="unapproved"?{backup:e,kind:t,name:"Not approved",meta:[o,i,a],current:c,title:o}:{backup:e,kind:t,name:s!=null?s:o.charAt(0).toUpperCase()+o.slice(1),meta:s?[o,i,a]:[i,a],current:c,title:s!=null?s:o}}function sd(e){return e!==null}var Qa={extension:"extension",theme:"theme",snippet:"snippet"},cd={extension:"extension",custom_app:"app",theme:"theme"},ld={extension:"extension",custom_app:"custom app",theme:"theme"};function wn(e){let{changes:t}=e,[n,o]=m(!1);return f(te,{label:e.label,children:[t.changes.map(i=>r(ud,{change:i,includeLabel:e.includeLabel(i.name),onInclude:a=>e.onInclude(i.key,a),disabled:e.disabled},i.key)),t.manual.map(i=>r(X,{leading:r(xe,{kind:cd[i.type]}),name:i.name,meta:r(z,{parts:[ld[i.type],i.scheme]}),end:r("span",{className:"syncify-change-label syncify-cap",children:"Add manually"})},`${i.type}:${i.name}`)),t.unchanged.length>0?r(X,{name:f("span",{className:"syncify-change-fold",children:[t.unchanged.length," more stay the same"]}),end:r(k,{variant:"text","aria-expanded":n,onClick:()=>o(!n),children:n?"Hide":"Show"})}):null,n?t.unchanged.map(i=>r(dd,{item:i},i.key)):null]})}function ud(e){let{change:t}=e;return r(X,{leading:r(xe,{kind:Qa[t.type]}),name:t.name,meta:t.note?r(z,{parts:[t.note]}):void 0,end:f(L,{children:[r("span",{className:"syncify-change-label syncify-cap","data-change":t.fixed?void 0:t.change,children:t.fixed?"Stays off":t.change}),t.optional&&!t.fixed?r(ho,{checked:t.included,onChange:e.onInclude,label:e.includeLabel,disabled:e.disabled}):null]})})}function dd(e){return r(X,{leading:r(xe,{kind:Qa[e.item.type]}),name:e.item.name,meta:e.item.note?r(z,{parts:[e.item.note]}):void 0})}var es={Adds:0,Updates:1,Removes:2},yd=["blocked","host","repo","catalog","unchecked"];function vn(e,t,n){var l,d;let{optional:o,allowed:i}=n,a=(l=n.fixed)!=null?l:new Set,s=[],c=[];for(let u of e.items){let y=t.get(u.key),p=o.has(u.key)||a.has(u.key),w={key:u.key,name:u.name,type:u.type,note:y?To(y):a.has(u.key)?"Not in Marketplace's list":n.unapproved&&p?"Not approved":null},v=u.change==="added"?"Adds":u.change==="removed"?"Removes":u.isNew?"Updates":null;if(v){let I=a.has(u.key);s.push(b(g({},w),{change:v,optional:p,fixed:I,included:!p||!I&&i.has(u.key)}))}else c.push(w)}return s.sort((u,y)=>es[u.change]-es[y.change]),{changes:s,unchanged:c,manual:e.manual,warnings:[...fd(s,t,(d=n.verb)!=null?d:"Restore"),...pd(s)],count:s.filter(u=>u.included).length}}function xn(e,t){return t===0?e:t===1?`${e} 1 change`:`${e} ${t} changes`}function To(e){switch(e.kind){case"host":return`Code from ${e.host}`;case"repo":return`Code from ${e.repo}`;case"blocked":return"Blocked by Marketplace";case"catalog":return"Not in Marketplace";case"unchecked":return"Not checked";case"custom":return"Custom"}}function fd(e,t,n){var i;let o=new Map;for(let a of e){if(a.change==="Removes"||a.fixed)continue;let s=t.get(a.key);!s||!qe(s)&&s.kind!=="unchecked"||o.set(s.kind,[...(i=o.get(s.kind))!=null?i:[],a.name])}return yd.flatMap(a=>{let s=o.get(a);return s?[md(a,s,n)]:[]})}function pd(e){let t=e.filter(n=>n.fixed).map(n=>n.name);return t.length===0?[]:[t.length===1?`${kn(t)} isn't in Marketplace's list anymore, so it stays off.`:`${kn(t)} aren't in Marketplace's list anymore, so they stay off.`]}function md(e,t,n){let o=t.length===1,i=kn(t),a=o?`${n} it only if you trust it.`:`${n} them only if you trust them.`;switch(e){case"blocked":return`${i} ${o?"is":"are"} on Marketplace's block list. ${a}`;case"host":return`${i} ${o?"loads from a site":"load from sites"} outside GitHub. ${a}`;case"repo":return o?`${i} loads its code from a different repo than the one it names. ${a}`:`${i} load their code from different repos than the ones they name. ${a}`;case"catalog":return`${i} ${o?"isn't":"aren't"} in Marketplace's catalog. ${a}`;default:return`GitHub couldn't be reached to check ${i}. ${a}`}}function ts(e,t,n){var I;let[o,i]=m(()=>new Set),[a,s]=m(null),c=V(()=>Vt(Qe(e),e.spicetify_config,t,n),[e,t,n]),l=V(()=>Ge(c.items),[c]);T(()=>{let S=!0;return Ve(c.items,l).then(h=>{S&&s({for:e,checks:h})}),()=>{S=!1}},[e,c,l]);let d=(a==null?void 0:a.for)===e?a.checks:null,u=V(()=>new Map([...d!=null?d:[],...l]),[d,l]),y=((I=e.backup)==null?void 0:I.kind)==="quarantined",p=V(()=>new Set(c.items.filter(S=>{var h;return S.change!=="removed"&&S.isNew&&(y||qe(u.get(S.key))||((h=u.get(S.key))==null?void 0:h.kind)==="unchecked")}).map(S=>S.key)),[c,u,y]),w=V(()=>vn(c,u,{optional:p,allowed:o,unapproved:y}),[c,u,p,o,y]);function v(S,h){let P=new Set(o);h?P.add(S):P.delete(S),i(P)}return{preview:c,changes:w,unapproved:y,checking:d===null,skipped:[...p].filter(S=>!o.has(S)),allow:v}}function ns(e){let{row:t,local:n}=e,o=Y("restore-heading"),i=ts(t.backup,n.items,n.spicetifyConfig),{changes:a}=i,s=!n.marketplaceAvailable;T(()=>{var l;(l=document.getElementById(o))==null||l.focus()},[o]);let c=f(L,{children:[r(k,{variant:"secondary",onClick:e.onCancel,disabled:e.restoring,children:"Cancel"}),r(k,{onClick:()=>e.onRestore({row:t,skipped:i.skipped,manual:i.preview.manual}),disabled:e.busy||i.checking||s,children:e.restoring?"Restoring\u2026":i.checking?"Checking\u2026":xn("Restore",a.count)})]});return f(G,{idBase:e.idBase,id:"backups",actions:c,children:[r(ae,{title:`Restore ${t.title}`,id:o,focusable:!0}),s?r(M,{tone:"warning",children:"Install Spicetify Marketplace to restore a backup."}):null,i.unapproved?r(M,{tone:"warning",children:"An install this Spotify account hasn't approved made this backup. Its items stay off unless you turn them on."}):null,r(wn,{changes:a,label:"What this restore changes",includeLabel:l=>`Restore ${l}`,onInclude:i.allow,disabled:e.busy}),a.warnings.map(l=>r(M,{tone:"warning",children:l},l)),e.localIsUnsaved?r(M,{tone:"warning",children:"Your current setup isn't backed up."}):null]})}function os(e){var P,O,E,R,D;let{remote:t,local:n}=e,o=Y("backup"),[i,a]=m(null),[s,c]=m(null),l=j(null);if(T(()=>{var x;s||!l.current||((x=document.getElementById(l.current))==null||x.focus(),l.current=null)},[s]),s&&n)return r(ns,{idBase:e.idBase,row:s,local:n,localIsUnsaved:n.installedItemCount>0&&!gd(n.hash,t),busy:e.busy,restoring:e.restoring,onCancel:()=>c(null),onRestore:x=>{var N;return e.onRestore(b(g({},x),{linkedHash:(N=i==null?void 0:i.hash)!=null?N:null}))}},s.backup.payload_hash);async function d(x){if(!x){a(null);return}a({hash:x,remote:null});try{let N=await Me(e.config,x);a({hash:x,remote:N})}catch(N){a(null),e.onError(N)}}let u=i?i.remote:t,y=(P=n==null?void 0:n.hash)!=null?P:null,p=x=>`${o}-${x.backup.payload_hash}`,w=(x,N)=>x.map(F=>Za(F,N,y)),v=w((O=u==null?void 0:u.backups)!=null?O:[],"backup"),I=w(u!=null&&u.safetyCopy?[u.safetyCopy]:[],"safety-copy"),S=i?[]:w((E=t==null?void 0:t.unapproved)!=null?E:[],"unapproved");function h(x){return r(X,{id:p(x),name:x.name,nameMark:x.kind==="safety-copy"?r(wo,{className:"syncify-safety-mark"}):x.kind==="unapproved"?r(he,{tone:"warning"}):void 0,meta:r(z,{parts:x.meta}),end:x.current?r("span",{className:"syncify-row-status syncify-cap",children:"Current"}):void 0,onOpen:x.current?void 0:()=>{l.current=p(x),c(x)},openLabel:`Preview restore of ${x.title}`,disabled:e.busy},`${x.kind}-${x.backup.payload_hash}-${x.backup.metadata.last_sync_datetime}`)}return f(G,{idBase:e.idBase,id:"backups",children:[e.notices,n&&!n.marketplaceAvailable?r(M,{tone:"warning",children:"Install Spicetify Marketplace to restore a backup."}):null,!e.lockedBy&&e.otherAccounts.length>0?r(Z,{label:"Show backups from",children:r(ve,{label:"Show backups from",trigger:{value:(D=(R=e.otherAccounts.find(x=>x.hash===(i==null?void 0:i.hash)))==null?void 0:R.label)!=null?D:"This Spotify account"},items:[{hash:null,label:"This Spotify account"},...e.otherAccounts].map(x=>{var N;return{label:x.label,checked:((N=i==null?void 0:i.hash)!=null?N:null)===x.hash,onSelect:()=>{d(x.hash)}}}),disabled:e.busy})}):null,e.lockedBy?r("p",{className:"syncify-tab-text",children:e.lockedBy==="not_owner"?"Sign in with the account that secured them":"Sign in to see and restore your backups"}):(!t||!n)&&e.failed?null:!t||!n||i&&!i.remote?f(te,{label:"Loading backups",children:[r(Ce,{}),r(Ce,{})]}):v.length+I.length+S.length===0?i?r("p",{className:"syncify-tab-text",children:"No backups yet."}):null:f(te,{label:"Backups",children:[v.map(h),I.length>0?r(mn,{}):null,I.map(h),S.length>0?r(mn,{}):null,S.map(h)]})]})}function gd(e,t){return t?[...t.backups,...t.safetyCopy?[t.safetyCopy]:[]].some(n=>n.payload_hash===e):!1}function is(e,t){let[n,o]=m(!1),[i,a]=m(null),s=Se(t);return T(()=>{if(!n)return;let c=l=>{var u;if(!((u=document.getElementById(e))!=null&&u.isConnected)){o(!1),a(null);return}l.preventDefault(),l.stopImmediatePropagation();let d=Zr(l);if(d.kind!=="ignore"){if(d.kind==="cancel"){o(!1),a(null);return}if(d.kind==="error"){a(d.message);return}if(Qr(d.shortcut)){a(`${xt(d.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}o(!1),s.current(d.shortcut)}};return window.addEventListener("keydown",c,!0),()=>window.removeEventListener("keydown",c,!0)},[n,e,s]),{recording:n,error:i,clearError:()=>a(null),toggle:()=>{a(null),o(!n)}}}var rs=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function as(e){var u,y;let{config:t}=e,[n]=m(()=>na()),o=Y("shortcut"),i=is(o,l),a=n?t.entryPoint:"topbar",s=i.recording?"Press keys":t.shortcut?xt(t.shortcut):"Off";function c(p){ia(p),e.onConfigChange(p)}function l(p){c(b(g({},t),{shortcut:p})),ro(p),i.clearError()}function d(p){c(b(g({},t),{entryPoint:p})),cn(p)}return f(G,{idBase:e.idBase,id:"settings",children:[f(At,{children:[r(Ro,{label:"Automatic backup when Spotify starts",checked:t.autoBackupEnabled&&!e.unsupported,onChange:p=>c(b(g({},t),{autoBackupEnabled:p})),disabled:e.busy||e.unsupported}),r(Z,{label:"Open Syncify from",children:r(ve,{label:"Open Syncify from",trigger:{value:(y=(u=rs.find(p=>p.value===a))==null?void 0:u.label)!=null?y:""},items:rs.map(p=>({label:p.label,checked:p.value===a,onSelect:()=>d(p.value)})),disabled:!n})}),r(Z,{label:"Keyboard shortcut",value:i.recording&&!i.error?"Press a key combination, or Esc to cancel":void 0,children:f("span",{className:"syncify-settings-shortcut",children:[i.recording?null:t.shortcut?r(k,{variant:"text",onClick:()=>l(null),children:"Turn off"}):r(k,{variant:"text",onClick:()=>l(Xe),children:"Use default"}),r(Co,{id:o,keys:s,recording:i.recording,"aria-label":i.recording?`${s} for a new keyboard shortcut`:`${s}, change the keyboard shortcut`,onClick:i.toggle})]})})]}),i.error?r(M,{tone:"warning",live:!0,children:i.error}):null,n?t.entryPoint==="menu"&&!t.shortcut?r(M,{tone:"warning",children:"Keep a shortcut in case a Spotify update breaks the profile menu."}):null:r(M,{tone:"info",children:"The profile menu isn't available in this Spicetify version."})]})}function Bt(e){let t=`${U().webUrl.replace(/\/+$/,"")}/discover`;return e?`${t}?post=${encodeURIComponent(e)}`:t}function tt(e){var t;return(t=e.name)!=null?t:fe(e.code)}function ss(e){return[`Used by ${e.imports}`,...e.posted?["On Discover"]:[]]}function cs(e){let t=e.posted?"The code stops working and its Discover post comes down.":"The code stops working.";return e.imports===0?t:`${t} ${e.imports===1?"1 person":`${e.imports} people`} used it.`}var Cn=12;function ls(e){return[...Array(Math.min(e.extensions,Cn)).fill("extension"),...Array(Math.min(e.themes,Cn)).fill("theme"),...Array(Math.min(e.snippets,Cn)).fill("snippet")].slice(0,Cn)}var hd={extension:"extension",theme:"theme",snippet:"snippet"};function us(e){var l,d;let{compose:t}=e,n=Y("compose-heading"),o=(d=(l=t.compose)==null?void 0:l.code)!=null?d:null,{draft:i,saving:a}=t;T(()=>{var u;(u=document.getElementById(n))==null||u.focus()},[n]);let s=i?[...i.items].sort((u,y)=>Number(i.leftOut.has(y.key))-Number(i.leftOut.has(u.key))||u.name.localeCompare(y.name)):[],c=f(L,{children:[r(k,{variant:"secondary",onClick:t.cancel,disabled:a,children:"Cancel"}),r(k,{onClick:()=>{t.save()},disabled:!i||t.included.length===0||a,children:i?a?o?"Updating\u2026":"Creating\u2026":o?"Update code":"Create code":"Checking\u2026"})]});return f(G,{idBase:e.idBase,id:"share",actions:c,children:[r(ae,{title:o?`Update ${tt(o)}`:"Create a code",id:n,focusable:!0}),t.error?r(M,{tone:"error",children:t.error}):null,r(ke,{label:"Setup name (optional)",value:t.name,onChange:t.setName,maxLength:Nr,disabled:a}),t.askHandle?r(ke,{label:"Pick a handle for your profile",value:t.handle,onChange:t.setHandle,onBlur:t.checkHandle,error:t.handleError,prefix:"@",maxLength:Zn,disabled:a}):null,i&&t.included.length===0?r(M,{tone:"warning",children:"Nothing here can go in a code. Add something from Marketplace first."}):null,r(ae,{title:"What goes in",end:i?r(z,{parts:[Le(t.included.length)]}):void 0}),i?r(te,{label:"What goes in",children:s.map(u=>{let y=i.leftOut.get(u.key),p=[y?To(y):null,u.repo].filter(Boolean);return r(X,{leading:r(xe,{kind:hd[u.type]}),name:u.name,meta:p.length>0?r(z,{parts:p}):void 0,end:y?r("span",{className:"syncify-change-label syncify-cap",children:"Left out"}):void 0},u.key)})}):f(te,{label:"Checking your items",children:[r(Ce,{}),r(Ce,{})]})]})}var ds=[["add","Add to my setup"],["replace","Replace my setup"]];function ys(e){var c,l,d,u;let{load:t}=e,n=Y("share-heading"),o=(c=t.shared)==null?void 0:c.file;if(T(()=>{var y;(y=document.getElementById(n))==null||y.focus()},[n]),!o||!t.changes)return null;let i=e.marketplaceAvailable===!1,a=o.creator,s=f(L,{children:[r(k,{variant:"secondary",onClick:t.close,disabled:t.applying,children:"Cancel"}),r(k,{onClick:()=>{t.apply()},disabled:t.applying||t.checking||e.busy||i,children:t.applying?"Loading\u2026":t.checking?"Checking\u2026":xn("Load",t.changes.count)})]});return f(G,{idBase:e.idBase,id:"share",actions:s,children:[r(ae,{title:`Load ${(l=o.name)!=null?l:fe(o.code)}`,id:n,focusable:!0,end:a?r(k,{variant:"text",onClick:()=>Q(Hr(a)),children:`by @${a}`}):void 0}),t.applyError?r(M,{tone:"error",children:t.applyError}):null,i?r(M,{tone:"warning",children:"Install Spicetify Marketplace to load a setup."}):null,r(Z,{label:"How to load it",children:r(ve,{label:"How to load it",trigger:{value:(u=(d=ds.find(([y])=>y===t.mode))==null?void 0:d[1])!=null?u:""},items:ds.map(([y,p])=>({label:p,checked:t.mode===y,onSelect:()=>t.setMode(y)})),disabled:t.applying})}),r(wn,{changes:t.changes,label:"What loading it changes",includeLabel:y=>`Load ${y}`,onInclude:t.allow,disabled:t.applying}),t.theme?r(M,{tone:"info",children:`Your theme switches to ${t.theme.name}.`}):null,t.changes.warnings.map(y=>r(M,{tone:"warning",children:y},y))]})}function fs(e){let[t,n]=m(null),[o,i]=m(null),[a,s]=m(""),[c,l]=m(""),[d,u]=m(!1),[y,p]=m(!1),[w,v]=m(null),[I,S]=m(null),h=j(0),[P,O]=m(e.token);P!==e.token&&(O(e.token),n(null),i(null),S(null));let E=t!==null&&t.code===null&&!e.hasHandle,R=E&&d?Qn(c):null,D=o?o.items.filter(H=>!o.leftOut.has(H.key)):[];async function x(H){var Ue,He;let $=++h.current;n({code:H}),s((Ue=H==null?void 0:H.name)!=null?Ue:""),l((He=e.suggestedHandle)!=null?He:""),u(!1),i(null),v(null),S(null);try{let se=await ue(),ot=await Mr(J(se),se);$===h.current&&i(g({keys:se},ot))}catch(se){if($!==h.current)return;n(null),v(se instanceof Error?se.message:String(se))}}function N(){h.current+=1,n(null),i(null)}function F(){n(null),i(null)}async function ee(){if(!t||!o)return;if(E&&Qn(c)){u(!0);return}p(!0),v(null);let H=Br(o.keys,D);try{let $=t.code?await $r(t.code.code,a.trim(),H):await Ur(a.trim(),H,E?c.trim():void 0);S(b(g({},$),{outcome:t.code?"updated":"created"})),F(),await e.reload()}catch($){if($ instanceof _&&$.code==="same_setup"&&$.share){S(b(g({},$.share),{leftOut:0,outcome:"existing"})),F();return}e.fail($,v),$ instanceof _&&$.code==="publish_failed"&&(n(null),e.reload())}finally{p(!1)}}return{compose:t,draft:o,included:D,name:a,setName:s,askHandle:E,handle:c,setHandle:H=>l(H.replace(/^@/,"")),checkHandle:()=>u(!0),handleError:R,saving:y,error:w,saved:I,dismissSaved:()=>S(null),forgetSaved:H=>S($=>($==null?void 0:$.code)===H?null:$),start:x,cancel:N,save:ee}}function ps(e){var R;let[t,n]=m(null),[o,i]=m(null),[a,s]=m(null),[c,l]=m(null),[d,u]=m(0),y=j(!1),[p,w]=m(null),[v,I]=m(!1);function S(D,x){x(vt(D,o)),D instanceof _&&D.code==="signed_out"&&e.onSignedOut()}async function h(){var D,x;w(null);try{let N=await rn();n(N.codes),y.current||(y.current=!0,u(N.newHearts)),e.onCodeCount(N.codes.length),i(N.max),s(N.profile),e.onHandle((x=(D=N.profile)==null?void 0:D.handle)!=null?x:null),l(N.suggestedHandle)}catch(N){S(N,w)}}async function P(D){I(!0),w(null);try{return await Kr(D),await h(),!0}catch(x){return S(x,w),!1}finally{I(!1)}}let O=Se(D=>{n(null),y.current=!1,D&&h()}),E=(R=e.session)==null?void 0:R.token;return T(()=>O.current(E!==void 0),[O,E]),{codes:t,max:o,atMax:t!==null&&o!==null&&t.length>=o,profile:a,suggestedHandle:c,newHearts:d,error:p,deleting:v,load:h,remove:P,fail:S}}function ms(e){let[t,n]=m(""),[o,i]=m(null),[a,s]=m(null),[c,l]=m(null),[d,u]=m(null),[y,p]=m("add"),[w,v]=m(()=>new Set),[I,S]=m(null),[h,P]=m(void 0),[O,E]=m(!1),R=V(()=>d?Lr(d.file,d.items,e.localItems,e.localConfig,e.localTheme,y):null,[d,e.localItems,e.localConfig,e.localTheme,y]),D=V(()=>{if(!R||!d)return null;let B=new Set(d.items.map(A=>A.key));return R.items.filter(A=>A.change!=="removed"&&B.has(A.key)&&(y==="replace"||A.isNew))},[R,d,y]),x=V(()=>D?Ge(D):null,[D]),N=I&&I.for===D?I.checks:null,F=V(()=>new Map([...N!=null?N:[],...x!=null?x:[]]),[N,x]),ee=V(()=>R&&h!==void 0?Dr(R,h):new Set,[R,h]),H=V(()=>{var B;return new Set(((B=R==null?void 0:R.items)!=null?B:[]).filter(A=>{var W;return A.change!=="removed"&&A.isNew&&(qe(F.get(A.key))||((W=F.get(A.key))==null?void 0:W.kind)==="unchecked")}).map(A=>A.key))},[R,F]),$=V(()=>R?vn(R,F,{optional:H,allowed:w,fixed:ee,verb:"Load"}):null,[R,F,H,w,ee]),Ue=R!=null&&R.theme&&!ee.has(R.theme.key)&&(!H.has(R.theme.key)||w.has(R.theme.key))?R.theme:null,He=R!==null&&(N===null||h===void 0);T(()=>{if(!D||!x)return;let B=!0;return Ve(D,x).then(A=>{B&&S({for:D,checks:A})}),()=>{B=!1}},[D,x]);async function se(B){let A=B!=null?B:_r(t);if(s(null),l(null),u(null),!A){s(vt(new _("no_code")));return}i({code:A,pick:B!==void 0});try{let W=await zr(A);p("add"),v(new Set),u({file:W,items:J(W.keys),pick:B!==void 0}),Xn().then(P)}catch(W){s(vt(W))}finally{i(null)}}function ot(B,A){let W=new Set(w);A?W.add(B):W.delete(B),v(W)}async function it(){if(!d||!R)return;E(!0),l(null);let B=[...new Set([...H,...ee])].filter(A=>ee.has(A)||!w.has(A));try{await sa(e.config,d.file,y,B,h!=null?h:null,d.pick),Spicetify.showNotification("Syncify: setup loaded. Reloading\u2026"),_t(R.manual,"share"),setTimeout(()=>window.location.reload(),1e3)}catch(A){E(!1),l(Sd(A))}}return{input:t,setInput:n,fetching:o,error:a,applyError:c,shared:d,close:()=>{u(null),l(null)},mode:y,setMode:p,changes:$,theme:Ue,checking:He,applying:O,open:se,allow:ot,apply:it}}function Sd(e){if(e instanceof Rt){let t=e.reason instanceof re?"Sign in to back up.":e.reason instanceof Error?e.reason.message:String(e.reason);return`${e.message} ${t}`}return e instanceof Error?e.message:String(e)}async function In(e){var t;try{return await navigator.clipboard.writeText(e),!0}catch(n){let o=(t=Spicetify.Platform)==null?void 0:t.ClipboardAPI;return o!=null&&o.copy?(await o.copy(e),!0):!1}}var bd=2e3;function gs(e){let{codes:t,compose:n}=e,[o,i]=m(null),[a,s]=m(null);T(()=>{if(!a)return;let u=setTimeout(()=>s(null),bd);return()=>clearTimeout(u)},[a]);async function c(u,y){await In(u)&&s(y)}async function l(){o&&await t.remove(o.code)&&(n.forgetSaved(o.code),i(null))}let d=t.codes;return f("section",{className:"syncify-share-part","aria-label":"Your codes",children:[r(ae,{title:f(L,{children:["Your codes",t.newHearts>0?r("span",{className:"syncify-share-hearts",children:De(t.newHearts,"new heart")}):null]}),end:d&&t.max!==null?r(Eo,{used:d.length,max:t.max,label:"Share codes"}):void 0}),t.error?r(M,{tone:"error",actions:r(k,{variant:"text",onClick:()=>{t.load()},children:"Try again"}),children:t.error}):null,n.saved?r(kd,{saved:n.saved,copied:a,onCopy:(u,y)=>{c(u,y)},discoverOpen:e.discoverOpen,onDismiss:n.dismissSaved}):null,n.error&&!n.compose?r(M,{tone:"error",children:n.error}):null,d===null?t.error?null:r(te,{label:"Loading your codes",children:r(Ce,{})}):d.length>0?r(te,{label:"Your codes",children:d.map(u=>r(X,{name:tt(u),meta:r(z,{parts:[u.name?r("code",{className:"syncify-share-code",children:fe(u.code)}):null,...ss(u)]}),end:f("span",{className:"syncify-share-code-actions",children:[r(k,{variant:"text",onClick:()=>{c(fe(u.code),`code:${u.code}`)},children:a===`code:${u.code}`?"Copied":"Copy"}),u.link?r(k,{variant:"text",onClick:()=>{var y;c((y=u.link)!=null?y:"",`link:${u.code}`)},children:a===`link:${u.code}`?"Copied":"Get link"}):null,r(ve,{trigger:"more",label:`More for ${tt(u)}`,disabled:n.compose!==null||t.deleting,items:[{label:"Update",onSelect:()=>{n.start(u)}},...e.discoverOpen&&!u.posted?[{label:"Post to Discover",onSelect:()=>Q(Bt(u.code))}]:[],{label:"Delete",danger:!0,onSelect:()=>i(u)}]})]})},u.code))}):null,d!==null?r("div",{className:"syncify-share-create",children:r(k,{variant:"secondary",onClick:()=>{n.start(null)},disabled:n.compose!==null||t.atMax||e.marketplaceAvailable===!1,children:"Create a code"})}):null,r(So,{open:o!==null,onClose:()=>i(null),title:o?`Delete ${tt(o)}`:"",actions:f(L,{children:[r(k,{variant:"secondary",onClick:()=>i(null),disabled:t.deleting,children:"Keep it"}),r(k,{variant:"danger",onClick:()=>{l()},disabled:t.deleting,children:t.deleting?"Deleting\u2026":"Delete code"})]}),children:o?cs(o):null})]})}function kd(e){let{saved:t}=e,n=fe(t.code),o=t.link,i=t.outcome==="existing"?"You shared this setup already as":t.outcome==="updated"?"Code updated:":"Your code is ready:";return f(M,{tone:"info",live:!0,actions:f(L,{children:[r(k,{variant:"text",onClick:()=>e.onCopy(n,"saved-code"),children:e.copied==="saved-code"?"Copied":"Copy"}),o?r(k,{variant:"text",onClick:()=>e.onCopy(o,"saved-link"),children:e.copied==="saved-link"?"Copied":"Get link"}):null,t.outcome==="created"&&e.discoverOpen?r(k,{variant:"text",onClick:()=>Q(Bt(t.code)),children:"Post to Discover"}):null,r(k,{variant:"subtle",onClick:e.onDismiss,children:"Dismiss"})]}),children:[f("span",{children:[i," ",r("code",{className:"syncify-share-code",children:n})]}),t.leftOut>0?r("span",{className:"syncify-share-left-out",children:t.leftOut===1?"1 snippet isn't in Marketplace's list anymore, so it was left out.":`${t.leftOut} snippets aren't in Marketplace's list anymore, so they were left out.`}):null]})}function hs(e){let{session:t}=e,n=ms(e),o=ps(e),i=fs({token:t==null?void 0:t.token,hasHandle:o.profile!==null,suggestedHandle:o.suggestedHandle,reload:o.load,fail:o.fail}),[a,s]=m(null);if(T(()=>{Fr().then(s)},[]),n.shared)return r(ys,{idBase:e.idBase,load:n,marketplaceAvailable:e.marketplaceAvailable,busy:e.busy});if(i.compose)return r(us,{idBase:e.idBase,compose:i});let c=n.input.trim();return f(G,{idBase:e.idBase,id:"share",children:[r("form",{className:"syncify-share-part",noValidate:!0,onSubmit:l=>{l.preventDefault(),!n.fetching&&c&&n.open()},children:r(ke,{label:"Load a setup",value:n.input,onChange:n.setInput,placeholder:"Paste a code or a link",error:n.error,action:r(k,{variant:"secondary",type:"submit",disabled:n.fetching!==null||!c,children:n.fetching&&!n.fetching.pick?"Loading\u2026":"Load"})})}),a?f("section",{className:"syncify-share-part","aria-label":a.length>0?"Syncify picks":"Discover",children:[a.length>0?r(ae,{title:"Syncify picks"}):null,f(te,{children:[a.map(l=>{var d;return r(X,{name:l.name,meta:r(z,{parts:[r("span",{className:"syncify-share-pips",children:ls(l).map((u,y)=>r(xe,{kind:u},y))},"pips"),((d=n.fetching)==null?void 0:d.code)===l.code?"Loading\u2026":De(l.extensions+l.themes+l.snippets,"item")]}),onOpen:()=>{n.open(l.code)},openLabel:`Preview ${l.name}`,disabled:n.fetching!==null},l.code)}),r(X,{name:"Find more setups on Discover",end:r(k,{variant:"secondary",size:"small",onClick:()=>Q(Bt()),children:"Open"})})]})]}):null,t===void 0?null:t===null?r("div",{className:"syncify-share-part",children:r(Z,{label:"Sign in to share this setup as a code",children:r(k,{variant:"secondary",onClick:e.onSignIn,children:"Sign in"})})}):r(gs,{codes:o,compose:i,discoverOpen:a!==null,marketplaceAvailable:e.marketplaceAvailable})]})}var _o="syncify:share-code-count",Ao="syncify:handle";function wd(){var t,n;let e=Number((n=(t=Spicetify.LocalStorage)==null?void 0:t.get(_o))!=null?n:NaN);return Number.isInteger(e)&&e>=0?e:null}function vd(){var t;let e=(t=Spicetify.LocalStorage)==null?void 0:t.get(Ao);return e==null?void 0:e||null}function Ss(){let[e,t]=m(()=>wd()),[n,o]=m(()=>vd()),i=ne(c=>{var l,d;c===null?(l=Spicetify.LocalStorage)==null||l.remove(_o):(d=Spicetify.LocalStorage)==null||d.set(_o,String(c)),t(c)},[]),a=ne(c=>{var l,d;c===void 0?(l=Spicetify.LocalStorage)==null||l.remove(Ao):(d=Spicetify.LocalStorage)==null||d.set(Ao,c!=null?c:""),o(c)},[]),s=ne(()=>{i(null),a(void 0)},[i,a]);return{codeCount:e,handle:n,saveCodeCount:i,saveHandle:a,forget:s}}var xd=2e3;function bs(e){let{install:t}=e,n=!t||t.trusted?null:t.refused?"This Spotify account refused backups from this install. Sign in to back up from it.":"This install isn't approved yet. Its backups are kept apart until you approve it from another install or sign in.";return f(L,{children:[e.nudge?r(M,{tone:"warning",actions:f(L,{children:[r(k,{variant:"subtle",onClick:e.onHideNudge,disabled:e.securing,children:"Not now"}),r(k,{size:"small",onClick:e.onSecure,disabled:e.securing,children:e.securing?"Securing\u2026":"Secure"})]}),children:"Your backup isn't secured. Anyone who knows your Spotify username can restore it."}):null,n?r(M,{tone:"info",children:n}):null,e.restoreResult?r(Cd,{manual:e.restoreResult.manual}):null]})}function Cd(e){let[t,n]=m(!1),o=_a(e.manual).join(`
`);if(T(()=>{if(!t)return;let a=setTimeout(()=>n(!1),xd);return()=>clearTimeout(a)},[t]),!o)return null;let i=e.manual.length;return f(M,{tone:"info",actions:f(L,{children:[r(k,{variant:"text",onClick:()=>{In(o).then(n)},children:t?"Copied":"Copy"}),r(k,{variant:"subtle",onClick:Ra,children:"Dismiss"})]}),children:[i===1?"1 isn't from Marketplace. Add it in a terminal:":`${i} aren't from Marketplace. Add them in a terminal:`,r("pre",{className:"syncify-commands",children:r("code",{children:o})})]})}function ks(e){let{message:t}=e;return r(M,{tone:t.kind,actions:f(L,{children:[t.kind==="error"?r(k,{variant:"text",onClick:e.onTryAgain,disabled:e.busy,children:"Try again"}):null,r(k,{variant:"subtle",onClick:e.onDismiss,children:"Dismiss"})]}),children:t.text})}function ws(e){let t=Id(e);return t.backedUp&&e.latest?b(g({},t),{line:[`Backed up ${et(e.latest.metadata.last_sync_datetime)}`,`${Le(e.localItemCount)} on this device`]}):b(g({},t),{line:[t.title,...t.detail]})}function Id(e){let t={backedUp:!1,supportAsk:null},n=`${Le(e.localItemCount)} on this device`;return e.restoreResult&&!e.unsupported?Ed(e.restoreResult):e.unsupported?b(g({},t),{title:"Update Syncify to keep backing up",detail:["Your backups are safe"],action:"how-to-update"}):e.locked?b(g({},t),{title:"Sign in to restore",detail:[e.locked==="not_owner"?"Secured by another account":"This backup is secured"],action:"sign-in"}):e.activity==="backing-up"?b(g({},t),{title:"Backing up\u2026",detail:[],action:"back-up"}):e.checked?e.latest?e.localHash&&!e.backedUp?b(g({},t),{title:"Changes since your last backup",detail:Rd(e.latest,e.latestItems,e.localItems,e.localConfig),action:"back-up"}):b(g({},t),{title:"Everything is backed up",detail:[`Last backup ${et(e.latest.metadata.last_sync_datetime)}`,n],action:null,backedUp:!0}):b(g({},t),{title:"No backup yet",detail:["Save your extensions and themes to restore them after a reinstall or on another computer."],action:"back-up"}):e.checkError?b(g({},t),{title:"Couldn't check your backup",detail:[e.checkError],action:"try-again"}):b(g({},t),{title:"Checking your backup\u2026",detail:[],action:null})}function Ed(e){let t=e.loaded===e.total,n=e.kind==="share";return{title:t?n?"Setup loaded":"Backup restored":`${n?"Loaded":"Restored"} ${e.loaded} of ${e.total}`,detail:[t?e.total===0?"Nothing from Marketplace to load":`${e.loaded} of ${e.total} loaded`:"Missing something? Reload Spotify once more."],action:t?null:"reload",backedUp:!1,supportAsk:t?n?"Syncify set it up for you?":"Syncify saved your setup?":null}}function Rd(e,t,n,o){var y;let i=new Set(t),a=new Set(n),s=n.filter(p=>!i.has(p)).length,c=t.filter(p=>!a.has(p)).length,l=(y=e.spicetify_config)!=null?y:null,d=!!(o&&!l),u=!d&&(o&&l?!cr(o,l):o!==l);return[s?`${s} added`:null,c?`${c} removed`:null,u?"Spicetify config changed":null,d?"Spicetify config not saved yet":null,`Last backup ${et(e.metadata.last_sync_datetime)}`].filter(p=>p!==null)}function vs(e,t){return(e==null?void 0:e.status)==="pending"&&!e.mine?b(g({kind:"claim"},hn(e)),{canAnswer:!e.not_me}):t?{kind:"install",title:bn(t),install:t}:null}var Pd=3,Mo={exists:!1,payload:null,backups:[],safetyCopy:null,claim:null,unapproved:[],install:null,nudge:!1},Oe=null;function xs(e){var u,y,p;let[t,n]=m(()=>Oe),[o,i]=m(void 0),a=ne(w=>{Oe=w,n(w)},[]),s=ne(async()=>{let w,v=null;try{w=await Me(e)}catch(P){if(!(P instanceof re))throw P;w=Mo,v=P.code}let I=await ie().catch(()=>null),S=I?await ca(e).catch(()=>null):null,h=I?await ie().catch(()=>null):null;return a({remote:w,lockedBy:v,claims:h?S:null}),i(h),v},[e,a]),c=ne(()=>{ie().catch(()=>null).then(w=>i(v=>v!=null?v:w))},[]),l=ne(w=>{var S;let v=Oe!=null?Oe:{remote:Mo,lockedBy:null,claims:null},{remote:I}=v;a(b(g({},v),{remote:b(g({},I),{exists:!0,payload:w,backups:[w,...I.backups.filter(h=>h.payload_hash!==w.payload_hash)].slice(0,Pd),safetyCopy:((S=I.safetyCopy)==null?void 0:S.payload_hash)===w.payload_hash?null:I.safetyCopy})}))},[a]),d=ne(()=>{i(null),Oe&&a(b(g({},Oe),{claims:null}))},[a]);return{check:t,remote:(u=t==null?void 0:t.remote)!=null?u:Mo,lockedBy:(y=t==null?void 0:t.lockedBy)!=null?y:null,claims:(p=t==null?void 0:t.claims)!=null?p:null,session:o,setSession:i,refresh:s,readSession:c,addBackup:l,forgetClaims:d}}function Cs(){let[e,t]=m(null),[n,o]=m(!1),i=ne(async()=>{try{let a=await en();return t(a),o(!1),a}catch(a){throw o(!0),a}},[]);return{local:e,localFailed:n,refreshLocal:i}}var Nd=600*1e3;function Is(){let[e,t]=m(null);return T(()=>{let n=U();if(!po(n.version))return;let o=!0;return Da(n.releasesUrl).then(i=>{o&&i&&mo(i,n.version)>0&&t(i)}),()=>{o=!1}},[]),e}function Es(){let[e,t]=m(()=>Ia()),[n]=m(()=>Date.now());return T(()=>Ea(t),[]),{result:e,recent:!!(e&&n-e.at<Nd)}}function Rs(e){let t=U(),n=[["Report an issue",t.issueUrl],["GitHub",t.githubUrl],["Discord",t.discordUrl],["Support on Ko-fi",t.kofiUrl]];return f("footer",{className:"syncify-window-footer",children:[f("span",{className:"syncify-window-footer-version",children:[f("span",{children:["Syncify ",t.version]}),e.newerVersion?r(k,{variant:"text",size:"tiny",className:"syncify-window-update",onClick:()=>e.loadedByLoader?window.location.reload():Q(`${t.githubUrl}#updating`),children:r(z,{parts:[`${e.newerVersion} is out`,e.loadedByLoader?"Reload":"How to update"]})}):null]}),r("span",{className:"syncify-window-footer-links",children:n.map(([o,i])=>r(k,{variant:"subtle",size:"tiny",onClick:()=>Q(i),children:o},o))})]})}var Td={"back-up":"Back up now","try-again":"Try again","sign-in":"Sign in","how-to-update":"How to update",reload:"Reload"};function Ps(e){let{status:t,alert:n}=e,o=t.action,i=o?r(k,{variant:o==="back-up"||o==="sign-in"?"primary":"secondary",size:n?"small":"regular",onClick:()=>e.onAction(o),disabled:e.busy,children:o==="back-up"&&e.backingUp?"Backing up\u2026":Td[o]}):null;return n?f("section",{className:"syncify-status","aria-label":"Status",children:[f("div",{className:"syncify-status-alert",role:"alert",children:[r("span",{className:"syncify-status-alert-mark",children:r(he,{tone:"warning",icon:r(xo,{})})}),f("div",{className:"syncify-status-text",children:[r("h2",{className:"syncify-status-title",children:n.title}),n.kind==="claim"&&n.text?r("p",{className:"syncify-status-sentence",children:n.text}):null]}),n.kind==="claim"?n.canAnswer?r(k,{variant:"secondary",onClick:e.onNotMe,disabled:e.answering,children:"Not me"}):null:f("span",{className:"syncify-status-answers",children:[r(k,{variant:"secondary",onClick:()=>e.onAnswerInstall("reject"),disabled:e.answering,children:"Not mine"}),r(k,{onClick:()=>e.onAnswerInstall("approve"),disabled:e.answering,children:"Approve"})]})]}),f("div",{className:"syncify-status-line","aria-live":"polite",children:[t.backedUp?r(we,{className:"syncify-status-check"}):null,r(z,{parts:t.line}),i]})]}):r("section",{className:"syncify-status","aria-label":"Status",children:f("div",{className:"syncify-status-main","aria-live":"polite",children:[f("div",{className:"syncify-status-text",children:[r("h2",{className:"syncify-status-title",children:t.title}),t.detail.length>0?r(z,{parts:t.detail}):null,t.supportAsk?f("p",{className:"syncify-status-ask",children:[r("span",{children:t.supportAsk}),r(k,{variant:"text",onClick:e.onSupport,children:"Support it on Ko-fi"})]}):null]}),i]})})}function Ns(e){let{codeCount:t,account:n,newerVersion:o}=e,i=[{id:"backups",label:"Backups"},{id:"share",label:"Share",status:t?r(Io,{count:t,label:De(t,"code")}):void 0},{id:"account",label:"Account",status:n?n.kind==="ok"?r("span",{className:"syncify-tab-check",role:"img","aria-label":n.label,children:r(we,{})}):r(he,{tone:"warning",label:n.label}):void 0},{id:"settings",label:"Settings",status:o?r(he,{tone:"info",label:`Syncify ${o} is out`}):void 0}];return r(Po,{tabs:i,selected:e.selected,onSelect:e.onSelect,idBase:e.idBase,label:"Syncify"})}function Lo(e){var $o,Ko,zo,Fo,Wo,jo,Yo,qo,Go,Vo,Jo,Xo,Zo;let t=Y("syncify"),n=U(),[o,i]=m(()=>pe()),{local:a,localFailed:s,refreshLocal:c}=Cs(),l=xs(o),d=Ss(),u=Is(),y=Es(),[p]=m(()=>La()!==null),[w,v]=m(($o=e.tab)!=null?$o:"backups"),[I,S]=m(()=>l.check?"idle":"checking"),[h,P]=m(null),[O,E]=m(null),[R,D]=m(!1),[x,N]=m(!1),[F,ee]=m(!1),[H,$]=m(null),[Ue,He]=m(()=>ya()),[se,ot]=m(e.secure===!0),it=j(!1),{remote:B,lockedBy:A,claims:W,session:de}=l,rt=I!=="idle",Tn=(Ko=a==null?void 0:a.hash)!=null?Ko:null,Us=((zo=B.claim)==null?void 0:zo.status)==="pending"&&!B.claim.mine?B.claim:null,$e=ja(W,A,Us!==null),Hs=!!(Tn&&B.backups.some(C=>C.payload_hash===Tn)),Do=ws({activity:I,checked:l.check!==null,checkError:h,unsupported:R,locked:A,latest:B.payload,latestItems:B.payload?Qe(B.payload).map(C=>C.key):[],backedUp:Hs,localHash:Tn,localItems:(Fo=a==null?void 0:a.installedItems)!=null?Fo:[],localItemCount:(Wo=a==null?void 0:a.installedItemCount)!=null?Wo:0,localConfig:(jo=a==null?void 0:a.spicetifyConfig)!=null?jo:null,restoreResult:y.recent?y.result:null}),$s=vs(B.claim,(qo=(Yo=B.install)==null?void 0:Yo.waiting[0])!=null?qo:null),Ks=!Ue&&!A&&B.payload!==null&&w!=="account"&&(de?$e.kind==="open":de===null&&B.nudge),zs=(de?(Go=W==null?void 0:W.accounts)!=null?Go:[]:[]).filter(C=>C.status==="final").map((C,q)=>({hash:C.hash,label:`Spotify account ${q+1}${C.device_info?` from ${C.device_info}`:""}`})).filter(C=>C.hash!==(W==null?void 0:W.hash));async function ce(C={}){try{(!C.silent||!l.check)&&S("checking"),C.silent||(E(null),P(null)),await c(),await l.refresh()&&v("account"),P(null),S("idle")}catch(q){at(q)}}function at(C){if(S("idle"),C instanceof ft){D(!0),E(null);return}if(C instanceof _e){E({kind:"error",text:C.message}),ce({silent:!0});return}if(C instanceof re&&C.code!=="not_linked"){E(null),ce({silent:!0});return}let q=C instanceof Error?C.message:String(C);l.check?E({kind:"error",text:q}):P(q),Spicetify.showNotification(q,!0,6e3)}async function Fs(){try{S("backing-up"),E(null);let{payload:C,unchanged:q,unapproved:Ke}=await Pt(o);if(await c(),Ke){await ce({silent:!0}),E({kind:"warning",text:"Backed up, but kept apart until this install is approved."}),Spicetify.showNotification("Syncify: backed up, waiting for approval");return}q||l.addBackup(C),S("idle"),Spicetify.showNotification(q?"Syncify: everything is already backed up":"Syncify backup complete")}catch(C){at(C)}}async function Ws(C){var q;try{S("restoring"),E(null),await aa(o,C.row.backup,(q=C.linkedHash)!=null?q:void 0,C.skipped),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),_t(C.manual),setTimeout(()=>window.location.reload(),1e3)}catch(Ke){at(Ke)}}async function js(C){var Ke;let q=(Ke=B.install)==null?void 0:Ke.waiting[0];if(q){N(!0);try{await dn(o,q.id,C),Spicetify.showNotification(C==="approve"?"Syncify: install approved":"Syncify: install refused"),await ce({silent:!0})}catch(Js){at(Js)}finally{N(!1)}}}async function Ys(){N(!0);try{Spicetify.showNotification(Sn(await yn(o))),await ce({silent:!0})}catch(C){E({kind:"error",text:C instanceof Error?C.message:String(C)})}finally{N(!1)}}async function Dt(){ee(!0),$(null);try{await la(o)}catch(C){C instanceof Pe&&["claim_pending","claimed"].includes(C.code)||$(C instanceof Error?C.message:String(C))}finally{await ce({silent:!0}),ee(!1)}}function qs(){ot(!0),de?Dt():v("account")}function Gs(C){l.setSession(C),it.current=!0,!A&&B.payload?Dt():ce({silent:!0})}function Oo(){d.forget(),l.forgetClaims(),$(null),ce({silent:!0})}function Vs(C){C==="back-up"?Fs():C==="try-again"?ce():C==="sign-in"?v("account"):C==="how-to-update"?Q(`${n.githubUrl}#updating`):Pa()}let Uo=Se(()=>{l.readSession(),ce({silent:!0})});T(()=>Uo.current(),[Uo]);let Ho=Se(()=>{!e.secure||it.current||F||!de||$e.kind!=="open"||A||(it.current=!0,Dt())});return T(()=>Ho.current(),[Ho,de,$e.kind,A,F]),f("div",{className:"syncify-ui syncify-window",onClick:Bo,onMouseDown:Bo,onPointerDown:Bo,children:[f("div",{className:"syncify-window-top",children:[r(Ps,{status:Do,alert:$s,backingUp:I==="backing-up",busy:rt||Do.action==="back-up"&&A!==null,answering:x,onAction:Vs,onNotMe:()=>{Ys()},onAnswerInstall:C=>{js(C)},onSupport:()=>Q(n.kofiUrl)}),O?r(ks,{message:O,busy:rt,onTryAgain:()=>{ce()},onDismiss:()=>E(null)}):null,r(Ns,{idBase:t,selected:w,onSelect:v,codeCount:de?d.codeCount:null,account:Ya(de,A,$e),newerVersion:u})]}),w==="backups"?r(os,{idBase:t,config:o,remote:l.check?B:null,failed:h!==null||s,lockedBy:A,local:a,otherAccounts:zs,notices:r(bs,{nudge:Ks,securing:F,onSecure:qs,onHideNudge:()=>{fa(),He(!0)},install:A||$e.kind==="secured"?null:B.install,restoreResult:y.result}),busy:rt,restoring:I==="restoring",onRestore:C=>{Ws(C)},onError:at}):w==="share"?r(hs,{idBase:t,config:o,session:de,localItems:(Vo=a==null?void 0:a.items)!=null?Vo:[],localConfig:(Jo=a==null?void 0:a.spicetifyConfig)!=null?Jo:null,localTheme:(Xo=a==null?void 0:a.activeTheme)!=null?Xo:null,marketplaceAvailable:(Zo=a==null?void 0:a.marketplaceAvailable)!=null?Zo:null,busy:rt,onSignIn:()=>v("account"),onSignedOut:Oo,onCodeCount:d.saveCodeCount,onHandle:d.saveHandle}):w==="account"?r(Ja,{idBase:t,session:de,locked:A,secure:$e,securing:F,secureError:H,onSecure:()=>{Dt()},nudge:se,onSignedIn:Gs,onSignedOut:Oo,handle:d.handle,onHandle:d.saveHandle}):r(as,{idBase:t,config:o,onConfigChange:i,busy:rt,unsupported:R}),r(Rs,{newerVersion:u,loadedByLoader:p})]})}function Bo(e){e.stopPropagation()}function En(e){return r("div",{className:"syncify-ui syncify-launch-notice",children:f(pn,{title:e.title,actions:e.actions,children:[e.children?r("p",{children:e.children}):null,e.error?r(M,{tone:"error",children:e.error}):null]})})}function Ts(){let[e,t]=m(!1),[n,o]=m(null);async function i(a){t(!0),o(null);try{await a()}catch(s){o(s instanceof Error?s.message:String(s)),t(!1)}}return{busy:e,error:n,run:i}}function _s(e){let{title:t,text:n}=hn(e.claim),o=Ts();return r(En,{title:t,error:o.error,actions:f(L,{children:[r(k,{variant:"secondary",onClick:e.onClose,disabled:o.busy,children:"Close"}),r(k,{onClick:()=>{o.run(async()=>{Spicetify.showNotification(Sn(await yn(pe()))),e.onClose()})},disabled:o.busy,children:"Not me"})]}),children:n})}function As(e){return r(En,{title:Wa(e.claim),actions:r(k,{onClick:e.onClose,children:"Close"})})}function Ms(e){let t=Ts(),n=o=>{t.run(async()=>{await dn(pe(),e.install.id,o),Spicetify.showNotification(o==="approve"?"Syncify: install approved":"Syncify: install refused"),e.onDone()})};return r(En,{title:bn(e.install),error:t.error,actions:f(L,{children:[r(k,{variant:"secondary",onClick:()=>n("reject"),disabled:t.busy,children:"Not mine"}),r(k,{onClick:()=>n("approve"),disabled:t.busy,children:"Approve"})]}),children:"Approve it if it's yours."})}function Bs(e){return r(En,{title:"Your backup isn't secured",actions:f(L,{children:[r(k,{variant:"secondary",onClick:e.onClose,children:"Not now"}),r(k,{onClick:t=>{t.stopPropagation(),e.onSecure()},children:"Secure"})]}),children:"Anyone who knows your Spotify username can restore it."})}var Rn="[Syncify]";function oe(e,t){if(t===void 0){console.debug(Rn,e);return}console.debug(Rn,e,t)}function Lt(e,t){if(t===void 0){console.warn(Rn,e);return}console.warn(Rn,e,t)}function _d(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var Ds="syncify-styles";function Ad(){if(document.getElementById(Ds)){oe("Another copy of Syncify is running; stopping this one");return}ni(Spicetify.React),Md();let e=pe();oa({topbarButton:Bd(),menuItem:$d()}),cn(e.entryPoint),io(e.shortcut,Nn),ba({onClaim:t=>{Fd(t)},onUndone:Wd,onInstall:jd,onNudge:Yd}).catch(t=>{Lt("Startup sync check failed",t)}),Ta().catch(t=>{Lt("Restore check failed",t)})}function Md(){let e=document.createElement("style");e.id=Ds,e.textContent=_i,document.head.appendChild(e)}function Bd(){let{extensionName:e}=U(),t=new Spicetify.Topbar.Button(e,_n,n=>{oe("Topbar button clicked",Pn(n)),Nn()},!1,!0);return Os(t),Od(t),zd(t),oe("Topbar button registered",Pn(t)),t}function Os(e){var n;let t=e;e.element.style.setProperty("-webkit-app-region","no-drag"),(n=t.button)==null||n.style.setProperty("-webkit-app-region","no-drag")}var Ls=".main-actionButtons",Ld=".Root__globalNav, .Root__top-bar",Dd=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function Od(e){if(typeof MutationObserver=="undefined")return;let t=!1,n=null,o=()=>{t=!1,a();let s=e.element,c=document.querySelector(Ls);!s||!c||c.contains(s)||(c.prepend(s),Ud(e),Os(e),oe("Topbar button re-attached",Pn(e)))},i=new MutationObserver(()=>{t||(t=!0,setTimeout(o,250))}),a=()=>{var l;if(n!=null&&n.isConnected)return;let s=document.querySelector(Ls),c=(l=s==null?void 0:s.closest(Ld))!=null?l:s==null?void 0:s.parentElement;if(i.disconnect(),n=c!=null?c:null,!c){i.observe(document.body,{childList:!0,subtree:!0});return}i.observe(c,{childList:!0,subtree:!0});for(let d=c.parentElement;d;d=d.parentElement)i.observe(d,{childList:!0})};o()}function Ud(e){let t=Hd(e);if(!t||t.className&&t.className!=="undefined")return;let n=Array.from(document.querySelectorAll(Dd)).find(o=>!e.element.contains(o));n!=null&&n.className&&(t.className=n.className)}function Hd(e){return e.button}function $d(){var e;if(typeof((e=Spicetify.Menu)==null?void 0:e.Item)!="function")return null;try{return new Spicetify.Menu.Item(U().extensionName,!1,()=>Nn(),Kd())}catch(t){return Lt("Failed to create profile menu item",t),null}}function Kd(){return _n.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function zd(e){Object.assign(window,{SyncifyDebug:{button:e,element:e.element,openModal:Nn,inspect:()=>Pn(e),clickElement:()=>{var t;return(t=e.element)==null?void 0:t.click()},clickInnerButton:()=>{var t;return(t=e.button)==null?void 0:t.click()},clickCallback:()=>e.onClick(e)}})}function Pn(e){var t,n,o,i,a;return{label:e.label,disabled:e.disabled,isRight:e.isRight,hasElement:!!e.element,elementConnected:(t=e.element)==null?void 0:t.isConnected,elementDisabled:(n=e.element)==null?void 0:n.disabled,elementAriaDisabled:(o=e.element)==null?void 0:o.getAttribute("aria-disabled"),elementClass:(i=e.element)==null?void 0:i.className,appRegion:e.element?getComputedStyle(e.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:e.button?getComputedStyle(e.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:e.element?getComputedStyle(e.element).pointerEvents:null,visibility:e.element?getComputedStyle(e.element).visibility:null,display:e.element?getComputedStyle(e.element).display:null,rect:(a=e.element)==null?void 0:a.getBoundingClientRect().toJSON()}}var K=null;function Nn(){if(K!=null&&K.container.isConnected){oe("Closing modal"),Spicetify.PopupModal.hide();return}oe("Opening modal"),nt(r(Lo,{}))}async function Fd(e){K!=null&&K.container.isConnected||(oe("Opening claim notice"),nt(r(_s,{claim:e,onClose:()=>Spicetify.PopupModal.hide()})))}function Wd(e){return K!=null&&K.container.isConnected?!1:(oe("Opening undone claim notice"),nt(r(As,{claim:e,onClose:()=>Spicetify.PopupModal.hide()})),!0)}function jd(e){K!=null&&K.container.isConnected||(oe("Opening install notice"),nt(r(Ms,{install:e,onDone:()=>Spicetify.PopupModal.hide()})))}function Yd(){K!=null&&K.container.isConnected||(oe("Opening nudge notice"),ma(),nt(r(Bs,{onSecure:()=>nt(r(Lo,{tab:"account",secure:!0})),onClose:()=>Spicetify.PopupModal.hide()})))}function nt(e){var n;(n=K==null?void 0:K.root)==null||n.unmount();let t=document.createElement("div");K={container:t,root:null};try{Spicetify.PopupModal.display({title:U().extensionName,content:t,isLarge:!1})}catch(o){throw Lt("Failed to open PopupModal",o),o}qd(t),Vd(t,e)}function qd(e){requestAnimationFrame(()=>{let t=Gd(e);t==null||t.classList.add("syncify-modal-shell");let n=t==null?void 0:t.querySelector(".main-trackCreditsModal-header h1");if(n&&!n.querySelector(".syncify-modal-mark")){let i=document.createElement("span");i.className="syncify-modal-mark",i.innerHTML=Ai,n.prepend(i)}let o=t==null?void 0:t.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');o&&(o.classList.add("syncify-modal-close"),o.setAttribute("aria-label",`Close ${U().extensionName}`),o.title="Close",o.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function Gd(e){let t=e.parentElement;for(;t&&t!==document.body;){if(t.querySelector(".main-trackCreditsModal-header"))return t;t=t.parentElement}return e.closest('[class*="trackCreditsModal"]')}function Vd(e,t){try{if(typeof Spicetify.ReactDOM.createRoot=="function"){let n=Spicetify.ReactDOM.createRoot(e);n.render(t),(K==null?void 0:K.container)===e&&(K.root=n),oe("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(t,e),oe("Modal rendered",{renderer:"render"})}catch(n){throw Lt("Failed to render modal",n),n}}Na();(function e(){if(!_d()){setTimeout(e,100);return}oe("Spicetify APIs ready"),Ad()})();})();
