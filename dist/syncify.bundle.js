// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var pc=Object.defineProperty,mc=Object.defineProperties;var gc=Object.getOwnPropertyDescriptors;var Ht=Object.getOwnPropertySymbols;var ii=Object.prototype.hasOwnProperty,ri=Object.prototype.propertyIsEnumerable;var oi=(e,t,n)=>t in e?pc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,m=(e,t)=>{for(var n in t||(t={}))ii.call(t,n)&&oi(e,n,t[n]);if(Ht)for(var n of Ht(t))ri.call(t,n)&&oi(e,n,t[n]);return e},b=(e,t)=>mc(e,gc(t));var le=(e,t)=>{var n={};for(var o in e)ii.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&Ht)for(var o of Ht(e))t.indexOf(o)<0&&ri.call(e,o)&&(n[o]=e[o]);return n};var ft,L,ne,T,yt,G,hc,W,g;function ai(e){({createElement:ft,Fragment:L,useCallback:ne,useEffect:T,useLayoutEffect:yt,useMemo:G,useReducer:hc,useRef:W,useState:g}=e)}var si=`/* Shared values for every part. Colors come from the active Spicetify theme,
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
`;var ci=`.syncify-icon {
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
`;var li=`.syncify-btn,
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
`;var ui=`.syncify-switch-control {
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
`;var di=`.syncify-checkbox {
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
`;var fi=`.syncify-setting-row {
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
`;var yi=`/* Facts on one line, wrapping between facts. Each fact is trimmed to its
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
`;var pi=`.syncify-list {
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
`;var mi=`.syncify-field-group {
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
`;var gi=`.syncify-menu {
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
`;var hi=`.syncify-meter {
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
`;var Si=`.syncify-mark-square {
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
`;var bi=`.syncify-notice {
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
`;var ki=`.syncify-dialog {
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
`;var wi=`.syncify-tabs {
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
`;var vi=`.syncify-pip-square {
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
`;var xi=`.syncify-section-label {
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
`;var Ci=`.syncify-keycap {
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
    /* The key's lower edge. */
    box-shadow: inset 0 calc(-2 * var(--syncify-line)) 0 var(--syncify-color-divider);
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
    box-shadow:
        inset 0 calc(-2 * var(--syncify-line)) 0 var(--syncify-color-divider),
        inset 0 0 0 var(--syncify-line) var(--syncify-color-accent);
}
`;var Ii=`/* A bar as tall as the capitals of the text it stands in for. */
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
`;var Ri=[si,ci,li,ui,di,fi,yi,pi,mi,gi,hi,Si,bi,ki,wi,vi,xi,Ci,Ii].join(`
`);var Ei=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var Pi=`/* The window fits the height Spotify's popup leaves it, so the status and
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
`;var Ni=`/* The safety copy's shield, after its name. */
.syncify-safety-mark {
    color: var(--syncify-color-accent);
}

/* "Current", where an older backup has its chevron. */
.syncify-row-status {
    color: var(--syncify-color-accent);
    font-size: var(--syncify-text-small);
    font-weight: 700;
}
`;var Ti=`/* Adds, Updates and Removes: plain colored text, not chips. */
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
`;var _i=`/* Loading a setup, the picks and your codes, split by dashed lines. */
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
`;var Ai=`/* The code step's Resend and Use another email. */
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
`;var Mi=`/* Turn off or Use default, then the key. */
.syncify-settings-shortcut {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    gap: var(--syncify-space-2);
}
`;var Bi=`/* A launch notice in Spotify's popup: the dialog layout, the popup's width. */
.syncify-launch-notice {
    width: 100%;
}
`;var Li=[Ri,Ei,Pi,Ti,Ni,_i,Ai,Mi,Bi].join(`
`);var jc="syncify",je="state";function Dn(){let e;try{e=window.indexedDB}catch(t){return Promise.resolve(null)}return e?new Promise(t=>{let n;try{n=e.open(jc,1)}catch(o){t(null);return}n.onupgradeneeded=()=>{n.result.createObjectStore(je)},n.onerror=()=>t(null),n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}function On(e,t){let n=Dn().then(o=>new Promise((i,r)=>{if(!o){r(new Error("IndexedDB isn't available."));return}try{let s=o.transaction(je,e),c=t(s.objectStore(je));s.oncomplete=()=>{o.close(),i(c.result)},s.onerror=s.onabort=()=>{var l;o.close(),r((l=s.error)!=null?l:new Error("IndexedDB failed."))}}catch(s){o.close(),r(s)}}));return Promise.race([n,new Promise((o,i)=>setTimeout(()=>i(new Error("IndexedDB took too long.")),2e3))])}function Ee(e){return On("readonly",t=>t.get(e))}async function ye(e,t){await On("readwrite",n=>n.put(t,e))}async function Di(e){await On("readwrite",t=>t.delete(e))}var pe={extensionName:"Syncify",version:"1.18.0",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",discordUrl:"https://syncify.wsoltani.com/discord",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com",shareUrl:"https://syncs.wsoltani.com"};function O(){var t,n,o,i,r,s,c,l,u,d;let e=window.SyncifyConfig;return{extensionName:(t=we(e==null?void 0:e.extensionName))!=null?t:pe.extensionName,version:(n=Oi(e==null?void 0:e.version))!=null?n:pe.version,workerUrl:(o=we(e==null?void 0:e.workerUrl))!=null?o:pe.workerUrl,webUrl:(i=we(e==null?void 0:e.webUrl))!=null?i:pe.webUrl,githubUrl:(r=we(e==null?void 0:e.githubUrl))!=null?r:pe.githubUrl,kofiUrl:(s=we(e==null?void 0:e.kofiUrl))!=null?s:pe.kofiUrl,discordUrl:(c=we(e==null?void 0:e.discordUrl))!=null?c:pe.discordUrl,issueUrl:(l=we(e==null?void 0:e.issueUrl))!=null?l:pe.issueUrl,releasesUrl:(u=we(e==null?void 0:e.releasesUrl))!=null?u:pe.releasesUrl,shareUrl:(d=we(e==null?void 0:e.shareUrl))!=null?d:pe.shareUrl}}function we(e){return Oi(e)}function Oi(e){return typeof e=="string"&&e.trim()?e.trim():null}var Yc="x-syncify-version",qc="x-syncify-install",Gc="x-syncify-timezone",Ui="install-id",$i="syncify:install-id",Vc=2e3,Kt=null;async function Hi(){let e={[Yc]:O().version,[qc]:(await Un()).id},t=Zc();return t&&(e[Gc]=t),e}function Un(){return Kt!=null||(Kt=Jc().catch(()=>({id:Ft(),inDatabase:!1}))),Kt}async function Jc(){let e=await Promise.race([Xc(),new Promise(t=>setTimeout(()=>t(null),Vc))]);if(e)return{id:e,inDatabase:!0};try{let t=window.localStorage.getItem($i);if(t&&Ki(t))return{id:t,inDatabase:!1};let n=Ft();return window.localStorage.setItem($i,n),{id:n,inDatabase:!1}}catch(t){return{id:Ft(),inDatabase:!1}}}async function Xc(){let e=await Dn();return e?new Promise(t=>{let n=null;try{let o=e.transaction(je,"readwrite"),i=o.objectStore(je),r=i.get(Ui);r.onsuccess=()=>{if(typeof r.result=="string"&&Ki(r.result)){n=r.result;return}n=Ft(),i.put(n,Ui)},o.oncomplete=()=>{e.close(),t(n)},o.onerror=o.onabort=()=>{e.close(),t(null)}}catch(o){e.close(),t(null)}}):null}function Ft(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t=[...e].map(n=>n.toString(16).padStart(2,"0"));return[t.slice(0,4).join(""),t.slice(4,6).join(""),t.slice(6,8).join(""),t.slice(8,10).join(""),t.slice(10).join("")].join("-")}function Ki(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(e)}function Zc(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(e){return null}}var Qc="syncify-signature-v1",el={name:"ECDSA",hash:"SHA-256"};function zt(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function Wt(e){return $n(new Uint8Array(await crypto.subtle.exportKey("raw",e)))}async function pt(e,t,n,o,i){let r=await tl(t,n,o,i),s=await crypto.subtle.sign(el,e,r);return $n(new Uint8Array(s))}async function tl(e,t,n,o){let{pathname:i,search:r}=new URL(n),s=new TextEncoder,c=$n(new Uint8Array(await crypto.subtle.digest("SHA-256",s.encode(o))));return s.encode([Qc,e,t.toUpperCase(),i+r,c].join(`
`))}function $n(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var Fi="device-key",Hn="session",zi="salt",Ae=null,mt,Wi={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function Ye(e){if(Ae)return Ae;let t=await Ee(Fi);return nl(t)?(Ae=Promise.resolve(t),t):e?(Ae=zt().then(async n=>(await ye(Fi,n),n)),Ae.catch(()=>{Ae=null}),Ae):null}async function ie(){let e=await Ee(Hn);return ol(e)?e:null}function Kn(e){return ye(Hn,e)}async function Me(){await Di(Hn).catch(()=>{})}async function jt(){if(mt===void 0){let e=await Ee(zi).catch(()=>{});mt=typeof e=="string"?e:null}return mt}async function Yt(e){e!==mt&&(mt=e,await ye(zi,e).catch(()=>{}))}function qt(){return Wi}function ji(e){Wi=e}function nl(e){let t=e;return!!(t&&t.privateKey instanceof CryptoKey&&t.publicKey instanceof CryptoKey)}function ol(e){let t=e;return!!(t&&typeof t.token=="string"&&t.token&&typeof t.email=="string")}var Yi="install-key",qe=null;function qi(){return qe!=null||(qe=il()),qe.catch(()=>{qe=null}),qe.catch(()=>null)}async function il(){if(!(await Un()).inDatabase)return null;let e=await Ee(Yi),t=al(e)?e:await rl();return{privateKey:t.privateKey,publicKey:await Wt(t.publicKey)}}async function rl(){let e=await zt();return await ye(Yi,e),e}function al(e){let t=e;return!!(t&&t.privateKey instanceof CryptoKey&&t.publicKey instanceof CryptoKey)}var sl="/api/auth/email-otp/send-verification-otp",cl="/api/auth/sign-in/email-otp",ll="/api/auth/get-session",ul="/api/auth/sign-out",dl="/api/auth/link",fl="x-syncify-device-key",yl="x-syncify-signature",Gi="x-syncify-salt",pl="none",ml={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again.",link_failed:"Couldn't open the website. Try again."},_=class extends Error{constructor(n,o=null,i=null){var r;super((r=ml[n])!=null?r:"Sign-in failed. Try again.");this.code=n;this.retryAfter=o;this.share=i;this.name="AccountError"}};function Pe(e){return e instanceof _?e.message:"Sign-in failed. Try again."}async function Vi(e,t={}){let n=await ht(sl,{method:"POST",body:JSON.stringify(m({email:e,type:"sign-in"},t.nudge?{nudge:!0}:{}))});return typeof(n==null?void 0:n.resend_in)=="number"?n.resend_in:60}async function Ji(e,t){var r;let n=await Ye(!0).catch(()=>{throw new _("no_device_key")}),o=await ht(cl,{method:"POST",body:JSON.stringify({email:e,otp:t}),keys:n,sendPublicKey:!0});if(typeof(o==null?void 0:o.token)!="string"||!o.token)throw new _("sign_in_failed");let i={token:o.token,email:typeof((r=o.user)==null?void 0:r.email)=="string"?o.user.email:e};return await Kn(i).catch(()=>{throw new _("no_device_key")}),Fn=!0,i}var Fn=!1;async function Xi(){var t;let e=await ie();if(!e||Fn)return e;try{let n=await Gt(e,ll,"GET");Fn=!0;let o=(t=n==null?void 0:n.user)==null?void 0:t.email;if(typeof o!="string"||o===e.email)return e;let i=b(m({},e),{email:o});return await Kn(i).catch(()=>{}),i}catch(n){if(n instanceof _&&n.code==="signed_out")return null;throw n}}async function Zi(){let e=await ie().catch(()=>null);e&&await Gt(e,ul,"POST").catch(()=>{}),await Me()}async function Qi(){let e=await ie();if(!e)throw new _("signed_out");let t=await Gt(e,dl,"POST"),n=typeof(t==null?void 0:t.url)=="string"?t.url:"",o=new URL(O().webUrl).origin;if(!n.startsWith(`${o}/link#`))throw new _("link_failed");return n}async function gt(e,t,n){let o=await ie();if(!o)throw new _("signed_out");return Gt(o,e,t,n)}async function er(e,t,n){let o=await ie().catch(()=>null),i=o?await Ye(!1).catch(()=>null):null;await ht(e,m({method:"POST",body:JSON.stringify(t),headers:n,keepalive:!0},o&&i?{token:o.token,keys:i}:{}))}async function Gt(e,t,n,o){let i=await Ye(!1);if(!i)throw await Me(),new _("signed_out");return ht(t,m({method:n,token:e.token,keys:i},o===void 0?{}:{body:JSON.stringify(o)}))}async function ht(e,t,n=!1){var f,p,v;let o=`${O().webUrl.replace(/\/+$/,"")}${e}`,i=m({},t.headers);if(t.body!==void 0&&(i["content-type"]="application/json"),t.token&&(i.authorization=`Bearer ${t.token}`),t.keys){let k=(f=await jt())!=null?f:pl;i[Gi]=k,i[yl]=await pt(t.keys.privateKey,k,t.method,o,(p=t.body)!=null?p:""),t.sendPublicKey&&(i[fl]=await Wt(t.keys.publicKey))}let r;try{r=await fetch(o,{method:t.method,headers:i,body:t.body,keepalive:t.keepalive})}catch(k){throw new _("offline")}let s=r.headers.get(Gi);s&&await Yt(s);let c=await r.json().catch(()=>null);if(r.ok)return c;let l=typeof(c==null?void 0:c.code)=="string"?c.code:r.status===503?"unavailable":"failed";if(l==="stale_salt"&&t.keys&&!n)return ht(e,t,!0);l==="signed_out"&&await Me();let u=Number(r.headers.get("retry-after")),d=c==null?void 0:c.share;throw new _(l,Number.isFinite(u)&&u>0?u:(v=gl[l])!=null?v:null,typeof(d==null?void 0:d.code)=="string"?{code:d.code,link:typeof d.link=="string"?d.link:null}:null)}var gl={resend_wait:60,too_many_requests:60,send_failed:60};var hl="x-syncify-user-hash",Sl="x-syncify-identity",bl="x-syncify-signature",kl="x-syncify-install-key",wl="x-syncify-install-signature",zn="x-syncify-salt",vl="none",xl="/restores",Cl="/installs",Il="hash",tr=3,St=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}},re=class extends Error{constructor(n){super(n==="not_linked"?"Couldn't read that Spotify account's backups.":"Sign in to restore this backup.");this.code=n;this.name="LockedError"}},Be=class extends Error{constructor(){super("This Spotify account doesn't accept backups from this install. Sign in to back up."),this.name="InstallRefusedError"}};async function or(e,t,n){var r;let o=await Ne(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(n)});if(o.status===403&&((r=await o.json().catch(()=>null))==null?void 0:r.code)==="install_refused")throw new Be;if(!o.ok)throw new Error(`Backup failed with HTTP ${o.status}.`);let i=await o.json().catch(()=>null);return{unchanged:(i==null?void 0:i.unchanged)===!0,unapproved:(i==null?void 0:i.quarantined)===!0}}async function ir(e,t,n,o){let i=await Ne(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({install:n,action:o})},Cl);if(i.ok)return;let r=await i.json().catch(()=>null);if((r==null?void 0:r.code)!=="not_pending")throw new Error(`Couldn't answer with HTTP ${i.status}.`)}async function Wn(e,t,n){var v,k,I,S;let o=await Ne(e,t,{method:"GET"},ar("/",n));if(o.status===404){let h=await o.json().catch(()=>null);return{exists:!1,payload:null,backups:[],safetyCopy:null,claim:bt(h==null?void 0:h.claim),unapproved:[],install:nr(h==null?void 0:h.install),nudge:!1}}if(!o.ok)throw new Error(`Restore failed with HTTP ${o.status}.`);let i=await o.json(),r=bt(i.claim),s=nr(i.install),c=i.nudge===!0;delete i.claim,delete i.install,delete i.nudge;let l=[i,...(v=i.backup_history)!=null?v:[]];if(!l.every(h=>h.backup))return{exists:!0,payload:i,backups:l.slice(0,tr),safetyCopy:(k=l[tr])!=null?k:null,claim:r,unapproved:[],install:s,nudge:c};let u=l.filter(h=>{var P;return((P=h.backup)==null?void 0:P.kind)==="rolling"}),d=(I=l.find(h=>{var P;return((P=h.backup)==null?void 0:P.kind)==="anchor"}))!=null?I:null,f=l.filter(h=>{var P;return((P=h.backup)==null?void 0:P.kind)==="quarantined"}),p=(S=u[0])!=null?S:d;return p?u.length===0&&d?{exists:!0,payload:p,backups:[d],safetyCopy:null,claim:r,unapproved:f,install:s,nudge:c}:{exists:!0,payload:p,backups:u,safetyCopy:d,claim:r,unapproved:f,install:s,nudge:c}:{exists:!1,payload:null,backups:[],safetyCopy:null,claim:r,unapproved:f,install:s,nudge:c}}async function rr(e,t,n,o){try{await Ne(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:n}),keepalive:!0},ar(xl,o))}catch(i){}}async function Ne(e,t,n,o="",i=!1){var I,S,h,P,U;let r=o?`${e.replace(/\/+$/,"")}${o}`:e,s=(I=n.method)!=null?I:"GET",c=await ie().catch(()=>null),l=c?await Ye(!1).catch(()=>null):null,u=await qi(),d={},f=(S=await jt())!=null?S:vl;c&&l&&(d.authorization=`Bearer ${c.token}`,d[zn]=f,d[bl]=await pt(l.privateKey,f,s,r,(h=n.body)!=null?h:"")),u&&(d[zn]=f,d[kl]=u.publicKey,d[wl]=await pt(u.privateKey,f,s,r,(P=n.body)!=null?P:""));let p=await fetch(r,b(m({},n),{headers:m(b(m(m({},n.headers),await Hi()),{[hl]:t.hash,[Sl]:t.field}),d)})),v=p.headers.get(zn);if(v&&await Yt(v),p.status===426)throw new St;if(p.status!==401)return p;let k=(U=await p.clone().json().catch(()=>null))==null?void 0:U.code;if(!i){if(k==="stale_salt"&&(c||u))return Ne(e,t,n,o,!0);if(k==="signed_out"&&c)return await Me(),Ne(e,t,n,o,!0)}throw k==="claimed"||k==="not_owner"||k==="not_linked"?new re(k):(k==="signed_out"&&await Me(),new _(typeof k=="string"?k:"failed"))}function ar(e,t){return t?`${e}?${Il}=${encodeURIComponent(t)}`:e}function nr(e){let t=e;if(!t||typeof t.trust!="string")return null;let n=Array.isArray(t.waiting)?t.waiting:[];return{trusted:t.trust!=="pending"&&t.trust!=="rejected",refused:t.trust==="rejected",waiting:n.flatMap(o=>{let i=o;return i&&typeof i.id=="string"&&typeof i.first_seen_at=="number"?[{id:i.id,device:typeof i.device=="string"?i.device:null,first_seen_at:i.first_seen_at}]:[]})}}function bt(e){let t=e;return!t||typeof t.mine!="boolean"?null:t.status==="final"?{status:"final",mine:t.mine}:t.status==="undone"?typeof t.undone_at=="number"?{status:"undone",mine:!1,email:typeof t.email=="string"?t.email:null,undone_at:t.undone_at}:null:t.status!=="pending"||typeof t.final_at!="number"?null:m({status:"pending",mine:t.mine,email:typeof t.email=="string"?t.email:null,final_at:t.final_at,held:t.held===!0},t.not_me===!0?{not_me:!0}:{})}async function Vt(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return[...new Uint8Array(n)].map(o=>o.toString(16).padStart(2,"0")).join("")}function Ge(e){return JSON.stringify(jn(e))}function jn(e){return Array.isArray(e)?e.map(jn):e&&typeof e=="object"?Object.keys(e).sort().reduce((t,n)=>(t[n]=jn(e[n]),t),{}):e}function sr(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var Rl="registry.json",cr="settings-registry",El=1,Pl=3e3,Nl=["marketplace:","spicetify","syncify"],Tl=["spicetify","syncify"],Yn=null;function Zt(){return Yn||(Yn=_l().then(async e=>e?(await ye(cr,e).catch(()=>{}),e):dr(await Ee(cr).catch(()=>{})))),Yn}async function _l(){let e=typeof AbortController=="function"?new AbortController:null,t=setTimeout(()=>e==null?void 0:e.abort(),Pl);try{let n=await fetch(`${O().releasesUrl}/${Rl}`,{signal:e==null?void 0:e.signal});return n.ok?dr(await n.json()):null}catch(n){return null}finally{clearTimeout(t)}}function dr(e){return!Xt(e)||e.format!==El||!Array.isArray(e.items)?null:{items:e.items.flatMap(n=>{let o=Al(n);return o?[o]:[]})}}function Al(e){var r;if(!Xt(e)||typeof e.id!="string"||!e.id)return null;let t=lr(e.keys),n=lr((r=e.exclude)!=null?r:[]),o=Ml(e.storage);if(!t||!n||!o||t.length===0||o.type==="localStorage"&&t.some(Bl)||o.type==="indexedDB"&&Tl.some(s=>o.database.startsWith(s)))return null;let i=Xt(e.lists)?Object.keys(e.lists):[];return{id:e.id,keys:t,exclude:n,lists:i,storage:o}}function Ml(e){return e===void 0?{type:"localStorage"}:Xt(e)?e.type==="localStorage"?{type:"localStorage"}:e.type!=="indexedDB"||!Jt(e.database)||!Jt(e.store)||e.valueField!==void 0&&!Jt(e.valueField)?null:m({type:"indexedDB",database:e.database,store:e.store},e.valueField!==void 0?{valueField:e.valueField}:{}):null}function lr(e){return Array.isArray(e)&&e.every(t=>Jt(t)&&/^[^*\s]+\*?$/.test(t))?e:null}function Ve(e,t){return e.keys.some(n=>ur(n,t))&&!e.exclude.some(n=>ur(n,t))}function ur(e,t){return e.endsWith("*")?t.startsWith(e.slice(0,-1)):t===e}function Bl(e){let t=e.endsWith("*")?e.slice(0,-1):e;return Nl.some(n=>t.startsWith(n)||e.endsWith("*")&&n.startsWith(t))}function Jt(e){return typeof e=="string"&&e.length>0}function Xt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}var Ll=2e3,Dl="restored-settings";async function fr(e){await ye(Dl,e).catch(()=>{})}async function yr(e){var o,i;let t={},n=new Set;for(let[r,s]of Ol(e,gr())){let c=window.localStorage.getItem(r);c!==null&&((i=t[o=s.id])!=null||(t[o]={storage:"localStorage",values:{}}),t[s.id].values[r]=c)}return await Promise.all(e.items.filter(r=>r.storage.type==="indexedDB").map(async r=>{let s=await $l(r);s===null?n.add(r.id):Object.keys(s).length>0&&(t[r.id]={storage:"indexedDB",values:s})})),{settings:t,unavailable:n}}function Ol(e,t){var r,s;let n=new Map,o=[];for(let c of e.items)if(c.storage.type==="localStorage")for(let l of c.keys)l.endsWith("*")?o.push([l.slice(0,-1),c]):n.set(l,c);let i=new Map;for(let c of t){let l=(s=n.get(c))!=null?s:(r=o.find(([u])=>c.startsWith(u)))==null?void 0:r[1];l&&Ve(l,c)&&i.set(c,l)}return i}async function pr(e,t,n){let o=n.flatMap(r=>{let s=e.items.find(l=>l.id===r),c=s?Ul(s,t[r]):null;return s&&c?[{item:s,saved:c}]:[]});for(let{item:r,saved:s}of o)r.storage.type==="indexedDB"&&await Hl(r,s);let i=gr();for(let{item:r,saved:s}of o)if(r.storage.type==="localStorage"){for(let c of i)Ve(r,c)&&!(c in s)&&window.localStorage.removeItem(c);for(let[c,l]of Object.entries(s))window.localStorage.setItem(c,l)}}function mr(e,t,n){let o=new TextEncoder,i=t+o.encode(`,${JSON.stringify("extension_settings")}:{}`).byteLength,r=Object.entries(e).map(([l,u])=>({id:l,entry:u,bytes:o.encode(`${JSON.stringify(l)}:${JSON.stringify(u)}`).byteLength})).sort((l,u)=>l.bytes-u.bytes||l.id.localeCompare(u.id)),s={},c=!0;for(let{id:l,entry:u,bytes:d}of r){let f=d+(c?0:1);if(i+f>n)break;i+=f,s[l]=u,c=!1}return s}function Ul(e,t){if(!t||typeof t!="object"||t.storage!==e.storage.type||!t.values||typeof t.values!="object"||Array.isArray(t.values))return null;let n={};for(let[o,i]of Object.entries(t.values))Ve(e,o)&&((e.storage.type==="localStorage"?typeof i!="string":!Qt(i))||(n[o]=i));return Object.keys(n).length>0?n:null}function Qt(e){return e===null||typeof e=="string"||typeof e=="boolean"?!0:typeof e=="number"?Number.isFinite(e):Array.isArray(e)?e.every(Qt):typeof e=="object"&&Object.getPrototypeOf(e)===Object.prototype?Object.values(e).every(Qt):!1}function gr(){let e=[];for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);n!==null&&e.push(n)}return e}async function $l(e){let t=e.storage;return hr(t,"readonly",(n,o)=>{let i={},r=n.openCursor();r.onsuccess=()=>{let s=r.result;if(!s)return o(i);let c=s.key;typeof c=="string"&&Ve(e,c)&&Qt(s.value)&&(i[c]=s.value),s.continue()}}).catch(()=>null)}async function Hl(e,t){let n=e.storage;if(await hr(n,"readwrite",(i,r)=>{let s=i.openCursor();s.onsuccess=()=>{let c=s.result;if(c){let l=c.key;typeof l=="string"&&Ve(e,l)&&!(l in t)&&c.delete(),c.continue();return}for(let[l,u]of Object.entries(t))i.put(u,l);r(!0)}})===null)throw new Error("Syncify couldn't write an extension's settings. Restart Spotify and try again.")}function hr(e,t,n){let o;try{o=window.indexedDB}catch(s){return Promise.resolve(null)}if(!o)return Promise.resolve(null);let i=o,r=new Promise((s,c)=>{let l;try{l=i.open(e.database)}catch(u){s(null);return}l.onupgradeneeded=()=>{var u;return(u=l.transaction)==null?void 0:u.abort()},l.onerror=()=>{var u;((u=l.error)==null?void 0:u.name)==="AbortError"?s(null):c(l.error)},l.onblocked=()=>c(new Error("The extension's database is busy.")),l.onsuccess=()=>{let u=l.result;if(u.onversionchange=()=>u.close(),!u.objectStoreNames.contains(e.store)){u.close(),s(null);return}try{let d=u.transaction(e.store,t),f=null;n(d.objectStore(e.store),p=>{f=p}),d.oncomplete=()=>{u.close(),s(f)},d.onerror=d.onabort=()=>{var p;u.close(),c((p=d.error)!=null?p:new Error("IndexedDB failed."))}}catch(d){u.close(),c(d)}}});return Promise.race([r,new Promise((s,c)=>setTimeout(()=>c(new Error("The extension's database took too long.")),Ll))])}var Kl=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,Fl=100,zl="marketplace:installed-extensions",Wl="marketplace:installed-themes",jl="marketplace:theme-installed",Yl="marketplace:installed:",ql="marketplace";function Gn(e){return Spicetify.Config?Vn(Spicetify.Config,e):null}function Vn(e,t){var r;let n=Te(e),o=new Set(Gl(t)),i=((r=t[jl])==null?void 0:r.includes(Yl))===!0;return{current_theme:i?ql:n.current_theme,color_scheme:i?"":n.color_scheme,extensions:n.extensions.filter(s=>!o.has(s)),custom_apps:n.custom_apps}}function Te(e){let t=e&&typeof e=="object"?e:{};return{current_theme:qn(t.current_theme)?t.current_theme:"",color_scheme:qn(t.color_scheme)?t.color_scheme:"",extensions:Sr(t.extensions),custom_apps:Sr(t.custom_apps)}}function wr(e,t){return Ge(Te(e))===Ge(Te(t))}function Sr(e){return Array.isArray(e)?[...new Set(e.filter(qn))].sort().slice(0,Fl):[]}function qn(e){return typeof e=="string"&&Kl.test(e)}function Gl(e){let t=br(e[zl]).map(o=>{var r;let i=(r=kr(e[o]))==null?void 0:r.manifest;return i&&typeof i=="object"?i.main:void 0}),n=br(e[Wl]).flatMap(o=>{var r;let i=(r=kr(e[o]))==null?void 0:r.include;return Array.isArray(i)?i:[]});return[...t,...n].flatMap(o=>{let i=typeof o=="string"?o.split("/").pop():void 0;return i?[i]:[]})}function br(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function kr(e){try{let t=e?JSON.parse(e):null;return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch(t){return null}}var Vl=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],Jl="marketplace:installed:",vr=`${Jl}snippet:`,Xl="wsoltani/syncify",Zl="marketplace",xr={added:0,removed:1,unchanged:2};function V(e){let t=new Map;for(let[n,o]of Vl)for(let i of nu(e[n]))t.has(i)||t.set(i,eu(i,o,e[i]));return[...t.values()]}function nn(e,t,n,o){let i=new Set(e.map(l=>l.key)),r=new Map(n.map(l=>[l.key,l])),s=[...e.map(l=>{let u=r.get(l.key);return b(m({},l),{change:u?"unchanged":"added",isNew:!u||u.sources.join(" ")!==l.sources.join(" ")})}),...n.filter(l=>!i.has(l.key)).map(l=>b(m({},l),{change:kt(l,e)?"unchanged":"removed",isNew:!1}))].sort((l,u)=>xr[l.change]-xr[u.change]||l.name.localeCompare(u.name)),c={added:0,removed:0,unchanged:0};for(let l of s)c[l.change]+=1;return{items:s,counts:c,manual:Ql(t,o)}}function kt(e,t){return e.type==="extension"&&tn(e)&&!t.some(tn)}function tn(e){var t;return((t=e.repo)==null?void 0:t.toLowerCase())===Xl}function Ql(e,t){if(!e)return[];let n=Te(e),o=Te(t),i=[...n.extensions.filter(s=>!o.extensions.includes(s)).map(s=>({type:"extension",name:s})),...n.custom_apps.filter(s=>!o.custom_apps.includes(s)).map(s=>({type:"custom_app",name:s}))],r=n.current_theme;return r&&r!==Zl&&(r!==o.current_theme||n.color_scheme!==o.color_scheme)&&i.push(m({type:"theme",name:r},n.color_scheme?{scheme:n.color_scheme}:{})),i}function eu(e,t,n){var l,u;let o=Cr(n),i=Cr(o==null?void 0:o.manifest),r=en(o==null?void 0:o.user),s=en(o==null?void 0:o.repo),c=(u=(l=en(o==null?void 0:o.title))!=null?l:en(i==null?void 0:i.name))!=null?u:e.startsWith(vr)?e.slice(vr.length):e.split("/").pop()||e;return{key:e,type:t,name:c,repo:t!=="snippet"&&r&&s?`${r}/${s}`:null,sources:tu(t,o),custom:t==="snippet"&&(o==null?void 0:o.custom)===!0}}function tu(e,t){return t?(e==="extension"?[t.extensionURL]:e==="theme"?[t.cssURL,t.schemesURL,...Array.isArray(t.include)?t.include:[]]:[]).filter(o=>typeof o=="string"&&o!==""):[]}function en(e){return typeof e=="string"&&e.trim()?e.trim():null}function nu(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function Cr(e){let t=e;if(typeof e=="string")try{t=JSON.parse(e)}catch(n){return null}return t&&typeof t=="object"&&!Array.isArray(t)?t:null}var on="spicetify-marketplace";var wt="settings";async function Ir(){let e=await Pr();if(e.kind!=="ok")return null;try{let t=await Nr(e.db,"readonly",o=>o.getAll());if(!t)return null;let n={};for(let o of t)typeof(o==null?void 0:o.key)=="string"&&typeof o.value=="string"&&(n[o.key]=o.value);return n}finally{e.db.close()}}async function Rr(e,t=[]){let n=await Pr();if(n.kind==="unavailable")return"unavailable";let o=n.kind==="ok"?n.db:await ou();if(!o)return"failed";try{return await Nr(o,"readwrite",r=>{let s;for(let[c,l]of Object.entries(e))s=r.put({key:c,value:l});for(let c of t)s=r.delete(c);return s})===null?"failed":"written"}finally{o.close()}}function Er(){var e;try{return(e=window.indexedDB)!=null?e:null}catch(t){return null}}async function Pr(){let e=Er();return e?await iu(e)?{kind:"missing"}:new Promise(t=>{let n=!1,o=e.open(on);o.onupgradeneeded=()=>{n=!0},o.onerror=()=>{console.warn("Syncify could not open Marketplace storage",o.error),t({kind:"unavailable"})},o.onblocked=()=>t({kind:"unavailable"}),o.onsuccess=()=>{let i=o.result;if(n){i.close(),ru(e).then(()=>t({kind:"missing"}));return}if(!i.objectStoreNames.contains(wt)){i.close(),t({kind:"unavailable"});return}t({kind:"ok",db:i})}}):{kind:"unavailable"}}function ou(){let e=Er();return e?new Promise(t=>{let n=e.open(on,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains(wt)||o.createObjectStore(wt,{keyPath:"key"})},n.onerror=()=>{console.warn("Syncify could not create Marketplace storage",n.error),t(null)},n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}async function iu(e){if(typeof e.databases!="function")return!1;try{return!(await e.databases()).some(n=>n.name===on)}catch(t){return!1}}function ru(e){return new Promise(t=>{let n=e.deleteDatabase(on);n.onsuccess=()=>t(),n.onerror=()=>t(),n.onblocked=()=>t()})}function Nr(e,t,n){return new Promise(o=>{let i;try{i=e.transaction(wt,t)}catch(u){console.warn("Syncify could not open a Marketplace transaction",u),o(null);return}let r,s=!1,c=u=>{s||(s=!0,o(u))};i.oncomplete=()=>c(r),i.onerror=()=>{console.warn("Syncify Marketplace transaction failed",i.error),c(null)},i.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",i.error),c(null)};let l;try{l=n(i.objectStore(wt))}catch(u){console.warn("Syncify Marketplace request could not be issued",u),c(null);return}l&&(l.onsuccess=()=>{r=l.result},l.onerror=()=>{console.warn("Syncify Marketplace request failed",l.error),c(null)})})}var Jn="marketplace:",an=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function ue(){let e=gu(),t=await Ir();if(t)for(let[n,o]of Object.entries(t))n.startsWith(Jn)&&(e[n]=o);return e}var su=new Set(["marketplace:active-tab","marketplace:sort"]),Xn="marketplace:installed:",rn="marketplace:theme-installed",cu=["stars","tags","lastUpdated","created"],lu=750*1024;async function sn(e,t){let n={};for(let[o,i]of Object.entries(e))su.has(o)||(n[o]=o.startsWith(Xn)?uu(i):i);return t&&(n.spicetify_config=Te(t)),Vt(Ge(n))}function uu(e){try{let t=JSON.parse(e);if(!t||typeof t!="object"||Array.isArray(t))return e;for(let n of cu)delete t[n];return t}catch(t){return e}}async function cn(){let e=await ue(),t=Gn(e);return{keyCount:Object.keys(e).length,hash:await sn(e,t),installedItemCount:pu(e),installedItems:ln(e),items:V(e),spicetifyConfig:t,marketplaceAvailable:mu(e),activeTheme:vt(e[rn])}}function vt(e){if(!e)return null;if(e.startsWith(Xn))return e;try{let t=JSON.parse(e);return typeof t=="string"?t:null}catch(t){return null}}async function Tr(){let[e,t]=await Promise.all([ue(),du()]),n=Gn(e),o=m({schema_version:3,metadata:{last_sync_datetime:new Date().toISOString(),device_info:sr(),marketplace_key_count:Object.keys(e).length},payload_hash:await sn(e,n),marketplace_data:{keys:e}},n?{spicetify_config:n}:{});if(Object.keys(t).length===0)return o;let i=new TextEncoder().encode(JSON.stringify(o)).byteLength,r=mr(t,i,lu);return Object.keys(r).length>0?b(m({},o),{extension_settings:r}):o}async function du(){try{let e=await Zt();return e?(await yr(e)).settings:{}}catch(e){return{}}}async function _r(e,t=[]){var r,s;let n={},o=(s=(r=e.marketplace_data)==null?void 0:r.keys)!=null?s:{};for(let[c,l]of Object.entries(o))c.startsWith(Jn)&&(n[c]=l);if(Object.keys(n).length===0)return 0;await fu(n),t.length>0&&await yu(n,t);let i=Qn(await ue(),n);return await Zn(n,i),Object.keys(n).length}async function Zn(e,t=[]){for(let[o,i]of Object.entries(e))window.localStorage.setItem(o,i);for(let o of t)window.localStorage.removeItem(o);if(await Rr(e,t)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try again.")}function Qn(e,t){let n=new Set(an.flatMap(s=>{var c;return un((c=t[s])!=null?c:e[s]).map(String)})),o=ln(e).filter(s=>s.startsWith(Xn)&&!n.has(s)),i=o.filter(s=>e[s]!==void 0&&t[s]===void 0),r=e[rn];return r&&t[rn]===void 0&&o.some(s=>r.includes(s))&&i.push(rn),i}async function fu(e){let t=await ue(),n=V(e),o=V(t).filter(s=>kt(s,n));if(o.length===0)return;let i="marketplace:installed-extensions",r=un(e[i]).map(String);for(let s of o)r.includes(s.key)||r.push(s.key),e[s.key]=t[s.key];e[i]=JSON.stringify(r)}async function yu(e,t){let n=await ue(),o=ln(n);for(let i of an){if(e[i]===void 0)continue;let r=un(e[i]).map(String).filter(s=>!t.includes(s)||o.includes(s));e[i]=JSON.stringify(r)}for(let i of t)n[i]!==void 0?e[i]=n[i]:delete e[i]}function pu(e){return ln(e).length}function ln(e){return an.flatMap(t=>un(e[t]).map(String))}function mu(e){return!!(window.Marketplace||an.some(n=>e[n]!==void 0)||e["marketplace:tabs"]!==void 0)}function Ar(e,t){return t===0?!1:e===0?!0:e<Math.max(2,Math.floor(t*.5))}function gu(){let e={};for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);if(!(n!=null&&n.startsWith(Jn)))continue;let o=window.localStorage.getItem(n);o!==null&&(e[n]=o)}return e}function un(e){if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch(t){return[]}}var hu="raw.githubusercontent.com",Su="cdn.jsdelivr.net",Mr=".github.io";function to(e){var n;if(e.protocol!=="https:")return null;let t=e.pathname.split("/").filter(Boolean);if(e.host===hu)return eo(t[0],t[1]);if(e.host===Su)return t[0]==="gh"?eo(t[1],(n=t[2])==null?void 0:n.split("@")[0]):null;if(e.host.endsWith(Mr)){let o=e.host.slice(0,-Mr.length);return o.includes(".")?null:eo(o,t.length>1?t[0]:e.host)}return null}function eo(e,t){return e&&t?`${e}/${t}`:null}var bu={extension:"spicetify-extensions",theme:"spicetify-themes"},ku="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",wu="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",vu="https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/",xu="https://api.github.com/repos",Cu=5e3,Iu=20,Br="syncify:repo-topics",Lr=10080*60*1e3,Ru=200;function Je(e){return(e==null?void 0:e.kind)==="host"||(e==null?void 0:e.kind)==="repo"||(e==null?void 0:e.kind)==="blocked"||(e==null?void 0:e.kind)==="catalog"}function Xe(e){let t=new Map;for(let n of e){if(n.change==="removed")continue;if(n.custom){t.set(n.key,{kind:"custom"});continue}let o=Eu(n);o&&t.set(n.key,o)}return t}async function Ze(e,t){let n=new Map,o=e.filter(s=>s.change!=="removed"&&s.isNew&&!t.has(s.key));if(o.length===0)return n;let i=o.filter(s=>s.type==="snippet"),r=o.filter(s=>s.type!=="snippet");if(i.length>0){let s=await no();for(let c of i)s?dn(s,c.name)||n.set(c.key,{kind:"catalog"}):n.set(c.key,{kind:"unchecked"})}if(r.length>0){let s=await Tu(),c=Mu(),l=0;await Promise.all(r.map(async u=>{let d=Pu(u),f=bu[u.type];if(!d||!f)return;if(s===null){n.set(u.key,{kind:"unchecked"});return}if(Nu(d,s)){n.set(u.key,{kind:"blocked"});return}let p=Au(c,d);p===void 0&&l<Iu&&(l+=1,p=await _u(d),p!==void 0&&(c[d.toLowerCase()]={topics:p,at:Date.now()})),p===void 0?n.set(u.key,{kind:"unchecked"}):(p===null||!p.includes(f))&&n.set(u.key,{kind:"catalog"})})),Bu(c)}return n}function Eu(e){let t=null;for(let n of e.sources){let o;try{o=new URL(n)}catch(r){return{kind:"host",host:n.slice(0,40)}}let i=to(o);if(!i)return{kind:"host",host:o.host};e.repo&&i.toLowerCase()!==e.repo.toLowerCase()&&(t!=null||(t=i))}return t?{kind:"repo",repo:t}:null}function Pu(e){for(let t of e.sources)try{let n=to(new URL(t));if(n)return n}catch(n){}return e.repo}function Nu(e,t){let n=`https://github.com/${e}`.toLowerCase();return t.some(o=>{let i=o.toLowerCase();if(!i.includes("*"))return i===n;let r=i.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${r}$`).test(n)})}function Dr(e){return e.replace(/\n/g,"").trim().toLowerCase()}function dn(e,t){return e.get(Dr(t))}var xt=null,Ct=null;function Tu(){return xt!=null||(xt=Or(ku).then(e=>{let t=e==null?void 0:e.repos;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&!n.startsWith("//")):(xt=null,null)})),xt}function no(){return Ct!=null||(Ct=Or(wu).then(e=>{if(!Array.isArray(e))return Ct=null,null;let t=new Map;for(let n of e){if(typeof(n==null?void 0:n.title)!="string"||typeof n.code!="string")continue;let o=typeof n.preview=="string"?n.preview:null;t.set(Dr(n.title),m({title:n.title,code:n.code,description:typeof n.description=="string"?n.description:""},o?{imageURL:o.startsWith("http")?o:`${vu}${o}`}:{}))}return t})),Ct}async function _u(e){let t=await Ur(`${xu}/${e}`);if((t==null?void 0:t.status)===404)return null;if(!(t!=null&&t.ok))return;let n=await t.json().catch(()=>null);return Array.isArray(n==null?void 0:n.topics)?n.topics.filter(o=>typeof o=="string"):void 0}async function Or(e){let t=await Ur(e);return t!=null&&t.ok?t.json().catch(()=>null):null}async function Ur(e){let t=typeof AbortController=="function"?new AbortController:null,n=setTimeout(()=>t==null?void 0:t.abort(),Cu);try{return await fetch(e,{signal:t==null?void 0:t.signal})}catch(o){return null}finally{clearTimeout(n)}}function Au(e,t){let n=e[t.toLowerCase()];return n&&Date.now()-n.at<Lr?n.topics:void 0}function Mu(){var e;try{let t=JSON.parse((e=localStorage.getItem(Br))!=null?e:"{}");return t&&typeof t=="object"?t:{}}catch(t){return{}}}function Bu(e){let t=Date.now(),n=Object.entries(e).filter(([,o])=>t-o.at<Lr).sort(([,o],[,i])=>i.at-o.at).slice(0,Ru);try{localStorage.setItem(Br,JSON.stringify(Object.fromEntries(n)))}catch(o){}}var Lu=/^[0-9A-HJKMNP-TV-Z]{6}$/,Du=6,Ou="SYN-",Fr=60,oo=20,zr=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],Le="marketplace:theme-installed",$r="marketplace",Hr={added:0,removed:1,unchanged:2},Uu=new RegExp(`^[a-z0-9][a-z0-9_-]{1,${oo-2}}[a-z0-9]$`);function io(e){let t=e.trim().replace(/^@/,"").toLowerCase();return/[^a-z0-9_-]/.test(t)?"Only letters, digits, _ and -":t.length<3?"At least 3 characters":!/^[a-z0-9]/.test(t)||!/[a-z0-9]$/.test(t)?"Start and end with a letter or digit":null}function me(e){return`${Ou}${e}`}function Wr(e){let t=e.trim();if(t.length>200)return null;if(t.includes("/")){let o=t.split(/[?#]/)[0].replace(/\/+$/,"");t=o.slice(o.lastIndexOf("/")+1).replace(/\.json$/i,"")}t=t.toUpperCase().replace(/[\s-]/g,""),t.length===Du+3&&t.startsWith("SYN")&&(t=t.slice(3));let n=t.replace(/O/g,"0").replace(/[IL]/g,"1");return Lu.test(n)?n:null}function jr(e){let t=e;return!t||typeof t.code!="string"||!t.keys||typeof t.keys!="object"||!Object.values(t.keys).every(n=>typeof n=="string")?null:{code:t.code,name:typeof t.name=="string"&&t.name?t.name:null,creator:typeof t.creator=="string"&&Uu.test(t.creator)?t.creator:null,updated_at:typeof t.updated_at=="number"?t.updated_at:0,keys:t.keys}}async function Yr(e,t){let n=e.filter(s=>!tn(s)).map(s=>b(m({},s),{change:"added",isNew:!0})),o=Xe(n);for(let s of n)!o.has(s.key)&&!$u(s,t[s.key])&&o.set(s.key,{kind:"catalog"});let i=await Ze(n,o),r=new Map;for(let[s,c]of[...i,...o])c.kind!=="unchecked"&&r.set(s,c);return{items:n,leftOut:r}}function $u(e,t){if(e.type==="snippet")return!0;if(!e.repo)return!1;let n=Fu(t);return e.type==="extension"?typeof(n==null?void 0:n.extensionURL)=="string"&&n.extensionURL!=="":typeof(n==null?void 0:n.cssURL)=="string"&&n.cssURL!==""}function qr(e,t){let n={};for(let[i,r]of zr){let s=t.filter(c=>c.type===r&&e[c.key]!==void 0).map(c=>c.key);n[i]=JSON.stringify(s);for(let c of s)n[c]=e[c]}let o=vt(e[Le]);return o&&t.some(i=>i.key===o)&&(n[Le]=e[Le]),n}function Gr(e,t,n,o,i,r){let s=r==="replace"?nn(t,void 0,n,o):Hu(t,n),c=vt(e.keys[Le]),l=c!==null&&t.some(d=>d.key===c)&&o!==null&&o.current_theme!==$r,u=c!==null&&c!==i?t.find(d=>d.key===c):void 0;return m(b(m({},s),{manual:l?[{type:"theme",name:$r}]:[]}),u?{theme:{key:u.key,name:u.name}}:{})}function Hu(e,t){let n=new Set(t.map(s=>s.key)),o=new Set(e.map(s=>s.key)),i=[...e.map(s=>n.has(s.key)?b(m({},s),{change:"unchanged",isNew:!1}):b(m({},s),{change:"added",isNew:!0})),...t.filter(s=>!o.has(s.key)).map(s=>b(m({},s),{change:"unchanged",isNew:!1}))].sort((s,c)=>Hr[s.change]-Hr[c.change]||s.name.localeCompare(c.name)),r={added:0,removed:0,unchanged:0};for(let s of i)r[s.change]+=1;return{items:i,counts:r,manual:[]}}function Vr(e,t){return new Set(e.items.filter(n=>n.type==="snippet"&&n.change==="added"&&(!t||!dn(t,n.name))).map(n=>n.key))}async function Jr(e,t,n,o){let i=await ue(),r=V(i),s=V(e.keys),c={};for(let[f,p]of zr){let v=Kr(i[f]),I=[...t==="add"?v:v.filter(S=>n.includes(S)||r.some(h=>h.key===S&&kt(h,s)))];for(let S of s){if(S.type!==p||n.includes(S.key))continue;let h=v.includes(S.key);if(t==="add"&&h)continue;let P=p==="snippet"?Ku(S,o,i[S.key]):e.keys[S.key];P!==void 0&&(c[S.key]=P,I.includes(S.key)||I.push(S.key))}c[f]=JSON.stringify(I)}let l=vt(e.keys[Le]),u=Kr(c["marketplace:installed-themes"]);l&&u.includes(l)&&!n.includes(l)&&(c[Le]=e.keys[Le]);let d=Qn(i,c);return await Zn(c,d),Object.keys(c).length+d.length}function Ku(e,t,n){let o=t?dn(t,e.name):void 0;return o?JSON.stringify(m({code:o.code,title:o.title,description:o.description},o.imageURL?{imageURL:o.imageURL}:{})):n}function Kr(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function Fu(e){try{let t=e?JSON.parse(e):null;return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch(t){return null}}var It="/api/shares",zu=`${It}/update`,Wu=`${It}/delete`,ju=`${It}/import`,Yu="x-syncify-user-hash",qu="discover/presets.json",Gu={no_code:"This code doesn't exist.",too_many_codes:"You can't make more share codes. Delete one to make another.",daily_limit:"Too many changes to share codes today. Try again tomorrow.",too_large:"This setup is too big to share.",invalid_name:"Names can be up to 60 characters.",empty:"There's nothing to share yet. Install something from Marketplace first.",invalid_items:"Syncify couldn't read some items. Reload Spotify and try again.",source:"Some items don't load from GitHub. Reload Spotify and try again.",blocked:"Some items are on Marketplace's block list. Reload Spotify and try again.",custom_snippet:"Custom snippets can't be shared. Reload Spotify and try again.",unchecked:"Couldn't check Marketplace's block list. Try again in a minute.",publish_failed:"Couldn't publish the code. Press Update on it to try again.",delete_failed:"Couldn't delete the code. Try again.",same_setup:"You already shared this setup.",invalid_handle:"Handles are 3 to 20 letters, digits, _ or -, starting and ending with a letter or digit.",reserved_handle:"That handle isn't allowed. Pick another.",handle_taken:"That handle is taken. Pick another.",unavailable:"Share codes aren't available yet."},Vu=new Set(["offline","signed_out","invalid_signature","stale_salt","no_device_key","too_many_requests"]);function Rt(e,t=null){var n;return e instanceof _&&Vu.has(e.code)?Pe(e):e instanceof _&&e.code==="too_many_codes"&&t!==null?`You have ${t} share codes already. Delete one to make another.`:(n=e instanceof _?Gu[e.code]:void 0)!=null?n:"Something went wrong. Try again."}async function fn(){var t;let e=await gt(It,"GET");return{codes:Array.isArray(e==null?void 0:e.codes)?e.codes.flatMap(n=>{let o=Ju(n);return o?[o]:[]}):[],newHearts:typeof(e==null?void 0:e.new_hearts)=="number"?e.new_hearts:0,max:typeof(e==null?void 0:e.max)=="number"?e.max:null,profile:typeof((t=e==null?void 0:e.profile)==null?void 0:t.handle)=="string"?{handle:e.profile.handle,link:typeof e.profile.link=="string"?e.profile.link:null}:null,suggestedHandle:typeof(e==null?void 0:e.suggested_handle)=="string"?e.suggested_handle:null}}async function Xr(e,t,n){return ia(await gt(It,"POST",m({name:e,keys:t},n===void 0?{}:{handle:n})))}function Zr(e){return`${O().shareUrl.replace(/\/+$/,"")}/@${e}`}async function Qr(e,t,n){return ia(await gt(zu,"POST",{code:e,name:t,keys:n}))}async function ea(e){try{await gt(Wu,"POST",{code:e})}catch(t){if(t instanceof _&&t.code==="no_code")return;throw t}}async function ta(e){let t=O().shareUrl.replace(/\/+$/,""),n;try{n=await fetch(`${t}/${e}.json`)}catch(i){throw new _("offline")}if(n.status===404||n.status===403)throw new _("no_code");if(!n.ok)throw new _("failed");let o=jr(await n.json().catch(()=>null));if(!o||o.code!==e)throw new _("no_code");return o}async function na(){let e=O().shareUrl.replace(/\/+$/,"");try{let t=await fetch(`${e}/${qu}`);if(!t.ok)return null;let n=await t.json();return Array.isArray(n.posts)?n.posts.flatMap(o=>{let i=Zu(o);return i?[i]:[]}):null}catch(t){return null}}async function oa(e,t,n=!1){try{await er(ju,m({code:e},n?{source:"preset"}:{}),{[Yu]:t.hash})}catch(o){}}function Ju(e){let t=e;return!t||typeof t.code!="string"?null:{code:t.code,name:typeof t.name=="string"&&t.name?t.name:null,link:typeof t.link=="string"?t.link:null,item_count:typeof t.item_count=="number"?t.item_count:0,imports:typeof t.imports=="number"?t.imports:0,created_at:typeof t.created_at=="number"?t.created_at:0,updated_at:typeof t.updated_at=="number"?t.updated_at:0,posted:Xu(e.post)}}function Xu(e){let t=e==null?void 0:e.status;return typeof t=="string"&&t!=="removed"}function Zu(e){let t=e,n=o=>Number.isSafeInteger(o)&&o>=0?o:0;return!t||typeof t.code!="string"?null:{code:t.code,name:typeof t.name=="string"?t.name:me(t.code),extensions:n(t.extensions),themes:n(t.themes),snippets:n(t.snippets)}}function ia(e){let t=e;if(typeof(t==null?void 0:t.code)!="string")throw new _("failed");return{code:t.code,link:typeof t.link=="string"?t.link:null,leftOut:Array.isArray(t.left_out)?t.left_out.length:0}}var ra="/claims",Qu="/claims/cancel",ed={no_backup:"Back up first, then secure your backup.",unsupported_identity:"This Spotify account can't be secured.",too_many_accounts:"Your account already has 10 Spotify accounts linked.",undone:"This backup can't be secured with your account.",offline:"Couldn't reach Syncify. Check your connection and try again."},_e=class extends Error{constructor(n){var o;super((o=ed[n])!=null?o:"Couldn't secure your backup. Try again.");this.code=n;this.name="ClaimError"}};async function aa(e,t){let n=await ro(e,t,"GET",ra);if(!n.ok)throw new _e(await ao(n));let o=await n.json().catch(()=>null);return{claim:bt(o==null?void 0:o.claim),accounts:Array.isArray(o==null?void 0:o.accounts)?o.accounts.filter(td):null}}async function sa(e,t){let n=await ro(e,t,"POST",ra);if(!n.ok)throw new _e(await ao(n));let o=await n.json().catch(()=>null);return bt(o==null?void 0:o.claim)}async function ca(e,t){let n=await ro(e,t,"POST",Qu);if(n.status===404)return"cancelled";if(!n.ok)throw new _e(await ao(n));let o=await n.json().catch(()=>null);return(o==null?void 0:o.held)===!0?"checking":"cancelled"}async function ro(e,t,n,o){try{return await Ne(e,t,{method:n},o)}catch(i){throw i instanceof TypeError?new _e("offline"):i}}async function ao(e){let t=await e.json().catch(()=>null);return typeof(t==null?void 0:t.code)=="string"?t.code:"failed"}function td(e){let t=e;return!!(t&&typeof t.hash=="string"&&(t.status==="pending"||t.status==="final"||t.status==="cancelled"||t.status==="unlinked"))}var la="[Syncify]";function ee(e,...t){console.debug(la,e,...t)}function oe(e,...t){console.warn(la,e,...t)}var et={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},nd=/^([a-z0-9]|f([1-9]|1[0-2]))$/,od=250,id=40,so=null,yn=null,Qe=null;function ua(){return/mac/i.test(navigator.platform||navigator.userAgent)}function da(e){if(e===null)return null;if(!e||typeof e!="object")return et;let t=e;return typeof t.key!="string"||!nd.test(t.key)?et:{key:t.key,ctrl:!!t.ctrl,alt:!!t.alt,shift:!!t.shift,meta:!!t.meta}}function Et(e){if(!e)return"Off";let t=e.key.toUpperCase();return ua()?[e.ctrl?"\u2318":"",e.alt?"\u2325":"",e.shift?"\u21E7":"",t].join(""):[e.ctrl&&"Ctrl",e.meta&&"Win",e.alt&&"Alt",e.shift&&"Shift",t].filter(Boolean).join("+")}function fa(e){if(e.key==="Escape")return{kind:"cancel"};let t=rd(e.code);if(!t)return{kind:"ignore"};let n=ua();if(n&&e.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let o={key:t,ctrl:n?e.metaKey:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:n?!1:e.metaKey},i=t.startsWith("f")&&t.length>1;return!o.ctrl&&!o.alt&&!o.meta&&!i?{kind:"error",message:`Include ${n?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:o}}function rd(e){var n,o;let t=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(e);return t?((o=(n=t[1])!=null?n:t[2])!=null?o:t[3]).toLowerCase():null}function ya(e){var t;if(Qe&&ad(Qe,e))return!1;try{let n=Spicetify.Mousetrap,o=(t=n.trigger)==null?void 0:t.call(n)._directMap;if(!o)return!1;let i=co(e);return Object.keys(o).some(r=>r.startsWith(`${i}:`))}catch(n){return!1}}function lo(e,t,n=0){if(so=t,yn=e,!pa()){if(n>=id){oe("Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>lo(yn,t,n+1),od);return}uo(yn)}function uo(e){if(yn=e,!pa()||!so)return;let t=so;try{if(Qe&&Spicetify.Keyboard._deregisterShortcut(Qe),Qe=null,!e)return;Spicetify.Keyboard.registerShortcut(e,n=>{n.preventDefault(),t()}),Qe=e,ee("Keyboard shortcut registered",Et(e))}catch(n){oe("Failed to register keyboard shortcut",n)}}function pa(){var e;return typeof((e=Spicetify.Keyboard)==null?void 0:e.registerShortcut)=="function"}function co(e){return[e.ctrl&&"mod",e.meta&&"meta",e.alt&&"alt",e.shift&&"shift",e.key].filter(Boolean).join("+")}function ad(e,t){return co(e)===co(t)}var fo="both",sd=["both","topbar","menu"],Pt=null,Nt=null,pn=!1;function ma(e){return sd.includes(e)?e:fo}function mn(){var e;return typeof((e=Spicetify.Menu)==null?void 0:e.Item)=="function"}function ga(e){Pt=e.topbarButton,Nt=e.menuItem}function gn(e){let t=e!=="menu"||!Nt,n=e!=="topbar";if(Pt!=null&&Pt.element&&(Pt.element.style.display=t?"":"none"),!!Nt)try{n&&!pn?(Nt.register(),pn=!0):!n&&pn&&(Nt.deregister(),pn=!1)}catch(o){oe("Failed to update profile menu item",o)}}var Sn="syncify:config",hn={workerUrl:O().workerUrl,autoBackupEnabled:!1,shortcut:et,entryPoint:fo};function ge(){var n,o;let e=O(),t=(o=(n=Spicetify.LocalStorage)==null?void 0:n.get(Sn))!=null?o:window.localStorage.getItem(Sn);if(!t)return b(m({},hn),{workerUrl:e.workerUrl});try{let i=JSON.parse(t);return{workerUrl:e.workerUrl,autoBackupEnabled:i.autoBackupEnabled===void 0?hn.autoBackupEnabled:!!i.autoBackupEnabled,shortcut:i.shortcut===void 0?hn.shortcut:da(i.shortcut),entryPoint:ma(i.entryPoint)}}catch(i){return b(m({},hn),{workerUrl:e.workerUrl})}}function ha(e){var n;let t=JSON.stringify({workerUrl:O().workerUrl,autoBackupEnabled:e.autoBackupEnabled,shortcut:e.shortcut,entryPoint:e.entryPoint});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set(Sn,t);return}window.localStorage.setItem(Sn,t)}function Tt(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}var cd=["username","canonicalUsername","id","uri","displayName"];async function he(){let{value:e,field:t}=await ld();return{hash:await Vt(e),field:t}}async function ld(){var i;let e=(i=Spicetify.Platform)==null?void 0:i.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let t=await e.getUser(),n=cd.find(r=>(t==null?void 0:t[r])!=null),o=n?t[n]:void 0;if(!n||!o)throw new Error("Unable to resolve the active Spotify user.");return{value:o,field:n}}async function At(e){if(!Tt(e))throw new Error("Syncify backup service is not configured.");let[t,n]=await Promise.all([he(),Tr()]);if(n.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:o,unapproved:i}=await or(e.workerUrl,t,n);return{payload:n,unchanged:o,unapproved:i}}async function De(e,t){var c;if(!Tt(e))throw new Error("Syncify backup service is not configured.");let n=await Wn(e.workerUrl,await he(),t),[o,i,r]=await Promise.all([Promise.all(n.backups.map(po)),n.safetyCopy?po(n.safetyCopy):null,Promise.all(n.unapproved.map(po))]),s=o.filter((l,u)=>o.findIndex(d=>d.payload_hash===l.payload_hash)===u);return b(m({},n),{payload:(c=s[0])!=null?c:null,backups:s,safetyCopy:i&&!s.some(l=>l.payload_hash===i.payload_hash)?i:null,unapproved:r.filter(l=>!s.some(u=>u.payload_hash===l.payload_hash))})}var yo=new Map;async function po(e){var r,s,c;let t=(s=(r=e.marketplace_data)==null?void 0:r.keys)!=null?s:{},n=e.spicetify_config?Vn(e.spicetify_config,t):void 0,o=`${e.payload_hash} ${(c=e.metadata)==null?void 0:c.last_sync_datetime}`,i=yo.get(o);return i||(i=sn(t,n),yo.set(o,i),i.catch(()=>yo.delete(o))),b(m(m({},e),n?{spicetify_config:n}:{}),{payload_hash:await i})}async function Sa(e){let t=await Wn(Mt(e),await he());return{claim:t.claim,install:t.install,nudge:t.nudge}}async function ba(e,t,n,o=[],i={ids:[],share:!1}){var l;let r=t!=null?t:(await De(e)).payload;if(!r)throw new Error("No Syncify cloud backup was found for this Spotify account.");await ud(r,i);let s=await _r(r,o),c=(l=r.backup)==null?void 0:l.id;return c&&Tt(e)&&he().then(u=>rr(e.workerUrl,u,c,n)).catch(()=>{}),{payload:r,restoredCount:s}}async function ud(e,t){if(t.ids.length===0||!e.extension_settings)return;let n=await Zt();n&&(await pr(n,e.extension_settings,t.ids),await fr(m({at:Date.now()},t)))}var _t=class extends Error{constructor(n){super("Couldn't back up your setup first, so nothing changed.");this.reason=n;this.name="SafetyBackupError"}};async function ka(e,t,n,o,i,r=!1){try{await At(e)}catch(c){throw new _t(c)}let s=await Jr(t,n,o,i);return he().then(c=>oa(t.code,c,r)).catch(()=>{}),s}async function wa(e){let t=await he(),n=await aa(Mt(e),t);return b(m({},n),{hash:t.hash})}async function va(e){await sa(Mt(e),await he())}async function bn(e,t,n){await ir(Mt(e),await he(),t,n)}async function kn(e){return ca(Mt(e),await he())}function Mt(e){if(!Tt(e))throw new Error("Syncify backup service is not configured.");return e.workerUrl}var xa="syncify:nudge-hidden-until",Ca="syncify:nudge-panel-shown";function Ia(e=Date.now()){let t=Number(Na(xa));return Number.isFinite(t)&&t>e}function Ra(e=Date.now()){Ta(xa,String(e+30*864e5))}function Ea(){return Na(Ca)!==null}function Pa(){Ta(Ca,"1")}function Na(e){var t,n;return(n=(t=Spicetify.LocalStorage)==null?void 0:t.get(e))!=null?n:window.localStorage.getItem(e)}function Ta(e,t){var n;(n=Spicetify.LocalStorage)!=null&&n.set?Spicetify.LocalStorage.set(e,t):window.localStorage.setItem(e,t)}var mo="syncify:claim-check-day",_a="syncify:undone-claim-shown";async function Aa(e){var n,o;let t=ge();if(t.workerUrl){if(!t.autoBackupEnabled)return dd(e);try{let[i,r]=await Promise.all([cn(),De(t)]);Ma(r,e);let s=(o=(n=r.payload)==null?void 0:n.metadata.marketplace_key_count)!=null?o:0;if(r.exists&&Ar(i.keyCount,s)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(r.backups.some(l=>l.payload_hash===i.hash)||i.keyCount===0)return;let{unapproved:c}=await At(t);Spicetify.showNotification(c?"Syncify: backed up, waiting for approval":"Syncify auto-backup complete")}catch(i){if(i instanceof re||i instanceof Be){Spicetify.showNotification("Syncify: sign in to keep backing up",!0,8e3);return}let r=i instanceof Error?i.message:String(i);console.warn("Syncify startup sync failed:",i),Spicetify.showNotification(`Syncify auto-sync skipped: ${r}`,!0,8e3)}}}async function dd(e){let t=new Date().toLocaleDateString("en-CA");if(Ba(mo)!==t)try{let n=await Sa(ge());go(mo,t),Ma(n,e)}catch(n){if(n instanceof re){go(mo,t);return}console.warn("Syncify claim check failed:",n)}}function Ma(e,t){var r;let n=fd(e.claim),o=yd(e.claim),i=(r=e.install)==null?void 0:r.waiting[0];n?t.onClaim(n):o?t.onUndone(o)&&go(_a,String(o.undone_at)):i?t.onInstall(i):e.nudge&&!Ea()&&t.onNudge()}function fd(e){return(e==null?void 0:e.status)==="pending"&&!e.mine&&!e.not_me?e:null}function yd(e){return(e==null?void 0:e.status)==="undone"&&Ba(_a)!==String(e.undone_at)?e:null}function Ba(e){var t,n;return(n=(t=Spicetify.LocalStorage)==null?void 0:t.get(e))!=null?n:window.localStorage.getItem(e)}function go(e,t){var n;(n=Spicetify.LocalStorage)!=null&&n.set?Spicetify.LocalStorage.set(e,t):window.localStorage.setItem(e,t)}var So="syncify:pending-restore",pd=600*1e3,md=2e3,gd=15e3,hd="marketplace:theme-installed",Sd="raw.githubusercontent.com",bd=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],Se=null,ho=new Set,Oa=new Map;function Ua(){return Se}function $a(e){return ho.add(e),()=>ho.delete(e)}function Ha(){Se&&ja(b(m({},Se),{manual:[]}))}function Lt(e,t="restore"){try{localStorage.setItem(So,JSON.stringify({at:Date.now(),manual:e,kind:t}))}catch(n){}}function Ka(){var e;Lt((e=Se==null?void 0:Se.manual)!=null?e:[],Se==null?void 0:Se.kind),window.location.reload()}function Fa(){Ya()&&(document.addEventListener("load",e=>La(e.target,"load"),!0),document.addEventListener("error",e=>La(e.target,"error"),!0))}async function za(){let e=Ya();if(!e)return;try{localStorage.removeItem(So)}catch(s){}let t=Date.now(),n=await Da();for(;n.loaded<n.total&&Date.now()-t<gd;)await new Promise(s=>setTimeout(s,md)),n=await Da();ja(b(m({kind:e.kind,at:Date.now()},n),{manual:e.manual}));let o=n.loaded===n.total&&e.manual.length===0,i=e.kind==="share"?"Setup applied":"Backup restored",r=e.kind==="share"?"loaded":"restored";Spicetify.showNotification(o?`Syncify: ${i}; ${n.total} ${n.total===1?"item":"items"}`:`Syncify: ${r} ${n.loaded} of ${n.total}. Open Syncify for details.`,!1,8e3)}function Wa(e){let t=e.map(n=>n.type==="extension"?`spicetify config extensions ${wn(n.name)}`:n.type==="custom_app"?`spicetify config custom_apps ${wn(n.name)}`:`spicetify config current_theme ${wn(n.name)}${n.scheme?` color_scheme ${wn(n.scheme)}`:""}`);return t.length>0?[...t,"spicetify apply"]:[]}function wn(e){return/^[\w.@+/-]+$/.test(e)?e:`"${e}"`}function ja(e){Se=e;for(let t of ho)t(e)}function Ya(){var e;try{let t=JSON.parse((e=localStorage.getItem(So))!=null?e:"null");return!t||Date.now()-t.at>pd?null:{manual:Array.isArray(t.manual)?t.manual:[],kind:t.kind==="share"?"share":"restore"}}catch(t){return null}}function La(e,t){e instanceof HTMLScriptElement&&e.src&&Oa.set(Bt(e.src),t)}async function Da(){var o;let e=await ue(),t=(o=e[hd])!=null?o:"",n=V(e).filter(i=>i.type==="extension"&&i.sources.length>0||i.type==="theme"&&t.includes(i.key)||i.type==="snippet");return{loaded:n.filter(kd).length,total:n.length}}function kd(e){var t,n;if(e.type==="snippet"){let o=document.querySelector("style.marketplaceSnippets");return((t=o==null?void 0:o.textContent)==null?void 0:t.includes(`/* ${e.name} - `))===!0}if(e.type==="theme"){let o=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((n=o==null?void 0:o.textContent)!=null&&n.trim())}return wd(e.sources[0]).some(vd)}function wd(e){let t;try{t=new URL(e)}catch(s){return[]}if(t.host!==Sd)return[Bt(t.href)];let[n,o,i,...r]=t.pathname.split("/").filter(Boolean);return!n||!o||!i||r.length===0?[]:bd.map(s=>Bt(`https://${s}/gh/${n}/${o}@${i}/${r.join("/")}`))}function vd(e){let t=Oa.get(e);return t?t==="load":[...document.querySelectorAll("script[src]")].some(o=>Bt(o.src)===e)&&performance.getEntriesByType("resource").some(o=>Bt(o.name)===e)}function Bt(e){try{let t=new URL(e);return`${t.origin}${t.pathname}`}catch(t){return e}}var bo=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var qa=".main-actionButtons",Cd=".Root__globalNav, .Root__top-bar",Id=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function Ga(e){let t=new Spicetify.Topbar.Button(O().extensionName,bo,e,!1,!0);return Va(t),Rd(t),t}function Va(e){var t;e.element.style.setProperty("-webkit-app-region","no-drag"),(t=e.button)==null||t.style.setProperty("-webkit-app-region","no-drag")}function Rd(e){if(typeof MutationObserver=="undefined")return;let t=!1,n=null,o=()=>{t=!1,r();let s=e.element,c=document.querySelector(qa);!s||!c||c.contains(s)||(c.prepend(s),Ed(e),Va(e),ee("Topbar button re-attached"))},i=new MutationObserver(()=>{t||(t=!0,setTimeout(o,250))}),r=()=>{var l;if(n!=null&&n.isConnected)return;let s=document.querySelector(qa),c=(l=s==null?void 0:s.closest(Cd))!=null?l:s==null?void 0:s.parentElement;if(i.disconnect(),n=c!=null?c:null,!c){i.observe(document.body,{childList:!0,subtree:!0});return}i.observe(c,{childList:!0,subtree:!0});for(let u=c.parentElement;u;u=u.parentElement)i.observe(u,{childList:!0})};o()}function Ed(e){let t=e.button;if(!t||t.className&&t.className!=="undefined")return;let n=Array.from(document.querySelectorAll(Id)).find(o=>!e.element.contains(o));n!=null&&n.className&&(t.className=n.className)}function Ja(e){if(!mn())return null;try{return new Spicetify.Menu.Item(O().extensionName,!1,e,Pd())}catch(t){return oe("Failed to create profile menu item",t),null}}function Pd(){return bo.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}var Nd="syncify:beta",Xa=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function Za(){var e;return(e=window.SyncifyLoader)!=null?e:null}function Td(){try{return window.localStorage.getItem(Nd)==="true"}catch(e){return!1}}async function Qa(e){let t=Td()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(t.map(o=>_d(`${e}/${o}`)))).reduce((o,i)=>i&&(!o||wo(i,o)>0)?i:o,null)}function ko(e){return typeof e=="string"&&Xa.test(e)}function wo(e,t){let[n,o]=[e,t].map(i=>{var u;let[,r,s,c,l]=(u=Xa.exec(i))!=null?u:[];return[r,s,c,l!=null?l:1/0].map(Number)});for(let i=0;i<n.length;i+=1)if(n[i]!==o[i])return n[i]<o[i]?-1:1;return 0}async function _d(e,t=3e3){let n=typeof AbortController=="function"?new AbortController:null,o=setTimeout(()=>n==null?void 0:n.abort(),t);try{let i=await fetch(e,{signal:n==null?void 0:n.signal});if(!i.ok)return null;let r=await i.json();return ko(r==null?void 0:r.version)?r.version:null}catch(i){return null}finally{clearTimeout(o)}}function tt(...e){return e.filter(Boolean).join(" ")}function vo(e,t){return t===void 0?e:b(m({},e),{key:t})}function a(e,t,n){let r=t,{children:o}=r,i=le(r,["children"]);return o===void 0?ft(e,vo(i,n)):ft(e,vo(i,n),o)}function y(e,t,n){let s=t,{children:o}=s,i=le(s,["children"]),r=Array.isArray(o)?o:[o];return ft(e,vo(i,n),...r)}var Ad={primary:"regular",secondary:"regular",danger:"regular",text:"small",subtle:"small"};function w(e){let l=e,{variant:t="primary",size:n=Ad[t],type:o="button",icon:i,children:r,className:s}=l,c=le(l,["variant","size","type","icon","children","className"]);return y("button",b(m({className:tt("syncify-btn",s),"data-variant":t,"data-size":n,type:o},c),{children:[i,a("span",{className:"syncify-cap",children:r})]}))}function xo(e){return a("input",{className:"syncify-checkbox",type:"checkbox","aria-label":e.label,checked:e.checked,onChange:t=>e.onChange(t.currentTarget.checked),disabled:e.disabled})}var Md=0;function j(e){let[t]=g(()=>`syncify-${e}-${++Md}`);return t}function vn(e){return y("div",{className:"syncify-dialog-content",children:[a("h2",{className:"syncify-dialog-title",id:e.titleId,children:e.title}),e.children?a("div",{className:"syncify-dialog-text",children:e.children}):null,a("div",{className:"syncify-dialog-actions",children:e.actions})]})}function Co(e){let t=W(null),n=j("dialog"),{open:o}=e,i=W(e.onClose);return yt(()=>{i.current=e.onClose}),T(()=>{let r=t.current;if(!r||!o)return;let s=document.activeElement;r.open||r.showModal();let c=l=>{l.preventDefault(),i.current()};return r.addEventListener("cancel",c),()=>{r.removeEventListener("cancel",c),r.open&&r.close(),s instanceof HTMLElement&&s.isConnected&&s.focus()}},[o]),o?a("dialog",{className:"syncify-dialog",ref:t,"aria-labelledby":n,children:a(vn,{title:e.title,actions:e.actions,titleId:n,children:e.children})}):null}function ve(e){var i,r;let t=j("field"),n=`${t}-error`,o=!!e.error;return y("div",{className:"syncify-field-group",children:[a("label",{className:"syncify-field-label",htmlFor:t,children:e.label}),y("div",{className:"syncify-field-row",children:[y("span",{className:"syncify-input-box","data-invalid":o?"true":void 0,"data-disabled":e.disabled?"true":void 0,children:[e.prefix?a("span",{className:"syncify-input-prefix","aria-hidden":"true",children:e.prefix}):null,a("input",{className:"syncify-input-control",id:t,type:(i=e.type)!=null?i:"text",value:e.value,onChange:s=>e.onChange(s.currentTarget.value),onBlur:e.onBlur,placeholder:e.placeholder,inputMode:e.inputMode,autoComplete:(r=e.autoComplete)!=null?r:"off",spellCheck:!1,maxLength:e.maxLength,disabled:e.disabled,autoFocus:e.autoFocus,"aria-invalid":o||void 0,"aria-describedby":o?n:void 0,"data-mono":e.mono?"true":void 0})]}),e.action]}),o?a("span",{className:"syncify-field-error",id:n,role:"alert",children:e.error}):null]})}function nt(e){let i=e,{children:t,className:n}=i,o=le(i,["children","className"]);return a("svg",b(m({className:tt("syncify-icon",n),viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},o),{children:t}))}function es(e){return a(nt,b(m({},e),{children:a("path",{d:"m9 6 6 6-6 6"})}))}function ts(e){return a(nt,b(m({},e),{children:a("path",{d:"m6 9 6 6 6-6"})}))}function xe(e){return a(nt,b(m({},e),{children:a("path",{d:"M5 12.5l4.5 4.5L19 7.5"})}))}function Io(e){return a(nt,b(m({},e),{children:a("path",{d:"M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z"})}))}function ns(e){return y(nt,b(m({},e),{"data-filled":"true",children:[a("rect",{x:"4",y:"10.5",width:"3",height:"3",rx:"0.75"}),a("rect",{x:"10.5",y:"10.5",width:"3",height:"3",rx:"0.75"}),a("rect",{x:"17",y:"10.5",width:"3",height:"3",rx:"0.75"})]}))}function Ro(e){return y(nt,b(m({},e),{children:[a("path",{d:"M12 6v7"}),a("path",{d:"M12 17.5v.5"})]}))}function Eo(e){let i=e,{keys:t,recording:n}=i,o=le(i,["keys","recording"]);return a("button",b(m({className:"syncify-keycap",type:"button","data-recording":n?"true":void 0},o),{children:a("span",{className:"syncify-cap",children:t})}))}function te(e){return a("ul",{className:"syncify-list","aria-label":e.label,children:e.children})}function xn(){return a("li",{className:"syncify-list-divider",role:"presentation"})}function J(e){let t=y(L,{children:[e.leading?a("span",{className:"syncify-row-leading",children:e.leading}):null,y("span",{className:"syncify-row-name",children:[a("span",{className:"syncify-row-name-text",children:e.name}),e.nameMark]}),e.meta?a("span",{className:"syncify-row-meta",children:e.meta}):null,e.end?a("span",{className:"syncify-row-end",children:e.end}):null]}),n=e.meta?"2":"1";return a("li",{className:"syncify-list-item",children:e.onOpen?y("button",{className:"syncify-row",id:e.id,"data-lines":n,type:"button","aria-label":e.openLabel,onClick:e.onOpen,disabled:e.disabled,children:[t,a(es,{className:"syncify-row-chevron"})]}):a("div",{className:"syncify-row",id:e.id,"data-lines":n,children:t})})}function be(e){return a("span",{className:"syncify-mark-square","data-tone":e.tone,"data-size":e.icon?"large":"small",role:e.label?"img":void 0,"aria-label":e.label,"aria-hidden":e.label?void 0:"true",children:e.icon})}function Po(e){return a("span",{className:"syncify-badge",role:"img","aria-label":e.label,children:a("span",{className:"syncify-cap",children:e.count})})}function Ce(e){let t=j("menu"),[n,o]=g(!1),i=W(null),r=W(null),s=e.items.some(f=>f.checked!==void 0);T(()=>{var h,P;let f=r.current,p=i.current;if(!n||!f||!p)return;Ld(f),Ud(f,p);let v=os(f);(P=(h=v.find(U=>U.getAttribute("aria-checked")==="true"))!=null?h:v[0])==null||P.focus();let k=()=>o(!1),I=U=>{let R=U.target;R instanceof Node&&!f.contains(R)&&!p.contains(R)&&k()},S=U=>{U.target instanceof Node&&f.contains(U.target)||k()};return document.addEventListener("pointerdown",I,!0),document.addEventListener("scroll",S,!0),window.addEventListener("resize",k),()=>{document.removeEventListener("pointerdown",I,!0),document.removeEventListener("scroll",S,!0),window.removeEventListener("resize",k),Dd(f)}},[n]);function c(){var f;o(!1),(f=i.current)==null||f.focus()}function l(f){let p=os(f.currentTarget),v=p.findIndex(I=>I===document.activeElement),k=f.key==="ArrowDown"?p[(v+1)%p.length]:f.key==="ArrowUp"?p[(v-1+p.length)%p.length]:f.key==="Home"?p[0]:f.key==="End"?p[p.length-1]:null;k?(f.preventDefault(),k.focus()):f.key==="Escape"?(f.preventDefault(),c()):f.key==="Tab"&&o(!1)}function u(f){(f.key==="ArrowDown"||f.key==="ArrowUp")&&(f.preventDefault(),o(!0))}let d={ref:i,type:"button","aria-haspopup":"menu","aria-expanded":n,"aria-controls":n?t:void 0,disabled:e.disabled,onClick:()=>o(!n),onKeyDown:u};return y(L,{children:[e.trigger==="more"?a("button",b(m({className:"syncify-icon-btn","aria-label":e.label},d),{children:a(ns,{})})):y("button",b(m({className:"syncify-menu-value","aria-label":`${e.label}: ${e.trigger.value}`},d),{children:[a("span",{className:"syncify-cap",children:e.trigger.value}),a(ts,{})]})),n?a("div",{className:"syncify-menu",id:t,ref:r,role:"menu","aria-label":e.label,popover:"manual",onKeyDown:l,children:e.items.map(f=>a(Bd,{item:f,picks:s,onPick:()=>{c(),f.onSelect()}},f.label))}):null]})}function Bd(e){let{item:t,picks:n}=e;return y("button",{className:"syncify-menu-item",type:"button",role:n?"menuitemradio":"menuitem","aria-checked":n?t.checked===!0:void 0,"data-danger":t.danger?"true":void 0,tabIndex:-1,disabled:t.disabled,onClick:e.onPick,children:[a("span",{className:"syncify-cap",children:t.label}),t.checked?a(xe,{}):null]})}function os(e){return[...e.querySelectorAll(".syncify-menu-item:not(:disabled)")]}function Ld(e){typeof e.showPopover=="function"&&!e.matches(":popover-open")&&e.showPopover()}function Dd(e){typeof e.hidePopover=="function"&&e.matches(":popover-open")&&e.hidePopover()}var Od=4;function Ud(e,t){let n=Od,o=t.getBoundingClientRect(),i=e.getBoundingClientRect(),r=o.bottom+n,s=r+i.height>window.innerHeight&&o.top-n-i.height>=0?o.top-n-i.height:r,c=Math.min(Math.max(o.right-i.width,n),window.innerWidth-i.width-n);e.style.top=`${s}px`,e.style.left=`${c}px`}function $d(){return y(L,{children:[a("span",{className:"syncify-dot","aria-hidden":"true"}),a("span",{className:"syncify-visually-hidden",children:", "})]})}function K(e){let t=e.parts.filter(n=>n!=null&&n!==!1&&n!=="");return a("span",{className:tt("syncify-meta",e.className),children:t.map((n,o)=>y(L,{children:[o>0?a($d,{}):null,a("span",{className:"syncify-meta-part",children:n})]},o))})}function No(e){let t=Math.min(Math.max(e.used,0),e.max),n=`Used ${e.used} of ${e.max}`;return y("span",{className:"syncify-meter",role:"meter","aria-label":e.label,"aria-valuemin":0,"aria-valuemax":e.max,"aria-valuenow":t,"aria-valuetext":n,"data-full":e.used>=e.max?"true":void 0,children:[a("span",{className:"syncify-cap",children:n}),a("span",{className:"syncify-meter-bars","aria-hidden":"true",children:Array.from({length:e.max},(o,i)=>a("span",{className:"syncify-meter-bar","data-used":i<t?"true":void 0},i))})]})}function M(e){let t=e.tone==="error"?"alert":e.live?"status":void 0;return y("div",{className:"syncify-notice","data-tone":e.tone,role:t,children:[y("span",{className:"syncify-notice-body",children:[a("span",{className:"syncify-notice-mark",children:a(be,{tone:e.tone})}),a("span",{className:"syncify-notice-text",children:e.children})]}),e.actions?a("span",{className:"syncify-notice-actions",children:e.actions}):null]})}function Ie(e){return a("span",{className:"syncify-pip-square","data-kind":e.kind,"aria-hidden":"true"})}function ae(e){return y("div",{className:"syncify-section-label",children:[a("h3",{className:"syncify-section-label-title",id:e.id,tabIndex:e.focusable?-1:void 0,children:e.title}),e.end]})}function X(e){return y("div",{className:"syncify-setting-row",children:[y("span",{className:"syncify-setting-row-text",children:[a("span",{className:"syncify-setting-row-label",children:e.label}),e.value?a("span",{className:"syncify-setting-row-value",children:e.value}):null]}),e.children]})}function Dt(e){return a("div",{className:"syncify-setting-group",role:"group","aria-label":e.label,children:e.children})}function Re(){return a("li",{className:"syncify-list-item","aria-hidden":"true",children:y("div",{className:"syncify-row","data-lines":"2",children:[a("span",{className:"syncify-row-name",children:a("span",{className:"syncify-skeleton","data-width":"name"})}),a("span",{className:"syncify-row-meta",children:a("span",{className:"syncify-skeleton","data-width":"meta"})})]})})}function Hd(e){return a("input",{className:"syncify-switch-control",type:"checkbox",role:"switch",checked:e.checked,onChange:t=>e.onChange(t.currentTarget.checked),disabled:e.disabled})}function To(e){let o=e,{label:t}=o,n=le(o,["label"]);return y("label",{className:"syncify-setting-row","data-disabled":e.disabled?"true":void 0,children:[a("span",{className:"syncify-setting-row-label",children:t}),a(Hd,m({},n))]})}var is=(e,t)=>`${e}-tab-${t}`,rs=(e,t)=>`${e}-panel-${t}`;function _o(e){let t=W(null);function n(o){var c,l;let i=e.tabs.length,r=e.tabs.findIndex(u=>u.id===e.selected),s=o.key==="ArrowRight"?(r+1)%i:o.key==="ArrowLeft"?(r-1+i)%i:o.key==="Home"?0:o.key==="End"?i-1:null;s!==null&&(o.preventDefault(),e.onSelect(e.tabs[s].id),(l=(c=t.current)==null?void 0:c.querySelectorAll('[role="tab"]')[s])==null||l.focus())}return a("div",{className:"syncify-tabs",role:"tablist","aria-label":e.label,ref:t,onKeyDown:n,children:e.tabs.map(o=>{let i=o.id===e.selected;return y("button",{className:"syncify-tab",id:is(e.idBase,o.id),type:"button",role:"tab","aria-selected":i,"aria-controls":rs(e.idBase,o.id),tabIndex:i?0:-1,onClick:()=>e.onSelect(o.id),children:[a("span",{className:"syncify-cap",children:o.label}),o.status]},o.id)})})}function q(e){return y("div",{className:"syncify-tab-panel",id:rs(e.idBase,e.id),role:"tabpanel","aria-labelledby":is(e.idBase,e.id),children:[a("div",{className:"syncify-tab-scroll",tabIndex:0,children:e.children}),e.actions?a("div",{className:"syncify-tab-actions",children:e.actions}):null]})}function ke(e){let t=W(e);return yt(()=>{t.current=e}),t}function Z(e){if(e.startsWith("mailto:")){window.location.href=e;return}window.open(e,"_blank","noopener,noreferrer")}function Cn(e){let t=e.lastIndexOf("@");if(t<1)return e;let n=e.slice(0,t);return n.length<=2?e:`${n[0]}${"*".repeat(n.length-2)}${n[n.length-1]}${e.slice(t)}`}function as(e,t=new Date){let n=new Date(e);return n.toDateString()===t.toDateString()?"today":n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===t.getFullYear()?void 0:"numeric"})}function ss(e){let t=as(e);return t==="today"?t:`on ${t}`}function Kd(e){let t=as(e);return t==="today"?t:`by ${t}`}function In(e){var t;return e.not_me?{title:"Syncify is checking this claim",text:null}:{title:`${(t=e.email)!=null?t:"Someone"} is securing this backup`,text:e.held?"Syncify is checking it.":`If that isn't you, press Not me ${Kd(e.final_at)}.`}}function cs(e){var t;return`This backup is no longer secured by ${(t=e.email)!=null?t:"another account"}`}function Rn(e){return e==="cancelled"?"Syncify: claim cancelled":"Syncify: sent for a check"}function En(e){return`A new install${e.device?` on ${e.device}`:""} wants to back up this Spotify account`}function ls(e,t,n){var s,c;if(t==="not_owner")return{kind:"other-account"};if(!e)return n?{kind:"other-claim"}:{kind:"unknown"};let{claim:o}=e;if((o==null?void 0:o.status)==="final"){if(!o.mine)return{kind:"other-account"};let l=((s=e.accounts)!=null?s:[]).filter(u=>u.status==="final").length;return{kind:"secured",linkedCount:Math.max(l,1)}}if((o==null?void 0:o.status)==="pending")return o.mine?{kind:"pending",finalAt:o.final_at,held:o.held}:{kind:"other-claim"};let i=((c=e.accounts)!=null?c:[]).filter(l=>l.hash===e.hash),r=i[i.length-1];return(r==null?void 0:r.status)==="unlinked"?{kind:"ended",reason:"undone"}:(r==null?void 0:r.status)==="cancelled"&&r.cancelled_by!=="claimer"?{kind:"ended",reason:r.cancelled_by==="owner"?"owner":"admin"}:{kind:"open"}}function us(e,t,n){return t?{kind:"warning",label:"Sign in to see your backups"}:e?n.kind==="secured"?{kind:"ok",label:"Signed in, backup secured"}:n.kind==="pending"?null:n.kind==="open"?{kind:"warning",label:"Backup not secured yet"}:n.kind==="ended"?{kind:"warning",label:"Backup not secured"}:{kind:"ok",label:"Signed in"}:null}function ds(e){return e.held?"Syncify is checking your request to secure this backup":`Your backup will be secured ${ss(e.finalAt)}`}var Ot=6,Fd=600*1e3,zd=300,Wd=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function Ao(e){return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function fs(e){let[t,n]=g(()=>qt()),[o,i]=g(()=>qt().email),[r,s]=g(""),[c,l]=g(!1),[u,d]=g(null),[f,p]=g(()=>Date.now()),v=!!(t.codeSentAt&&f-t.codeSentAt<Fd),k=Math.max(0,Math.ceil((t.retryAt-f)/1e3)),I=t.retryEmail===null||t.retryEmail===o.trim().toLowerCase()?k:0;T(()=>{if(t.retryAt<=Date.now())return;let R=setInterval(()=>{p(Date.now()),t.retryAt<=Date.now()&&clearInterval(R)},1e3);return()=>clearInterval(R)},[t.retryAt]);function S(R){let E=m(m({},qt()),R);ji(E),n(E),p(Date.now())}async function h(R){var D;let E=R.trim();if(!Wd.test(E)){d("Enter a valid email address.");return}l(!0),d(null);try{let x=await Vi(E,{nudge:e.nudge});S({email:E,codeSentAt:Date.now(),retryAt:Date.now()+x*1e3,retryEmail:E.toLowerCase()}),s("")}catch(x){let N=x instanceof _?x:null,F=(D=N==null?void 0:N.retryAfter)!=null?D:null,Q=F&&F<=zd?Date.now()+F*1e3:0,$=(N==null?void 0:N.code)==="too_many_requests"?null:E.toLowerCase();if((N==null?void 0:N.code)==="resend_wait"){S({email:E,codeSentAt:t.email===E&&t.codeSentAt?t.codeSentAt:Date.now(),retryAt:Q,retryEmail:$});return}Q&&S({retryAt:Q,retryEmail:$}),d(Pe(x))}finally{l(!1)}}async function P(){l(!0),d(null);try{let R=await Ji(t.email,r);S({codeSentAt:null}),s(""),e.onSignedIn(R)}catch(R){d(Pe(R));let E=R instanceof _?R.code:null;(E==="too_many_attempts"||E==="code_expired")&&s("")}finally{l(!1)}}async function U(R){l(!0),d(null),await Zi(),S({email:R,codeSentAt:null}),i(R),l(!1)}return{draft:t,email:o,setEmail:i,code:r,setCode:R=>s(R.replace(/\D/g,"").slice(0,Ot)),busy:c,error:u,codeSent:v,waitSeconds:k,emailWaitSeconds:I,requestCode:h,verify:P,signOut:U,useAnotherEmail:()=>{S({codeSentAt:null}),s(""),d(null)}}}function ys(e){let{signIn:t}=e,{busy:n}=t;return a("form",{className:"syncify-account-form",noValidate:!0,onSubmit:o=>{o.preventDefault(),!n&&(t.codeSent?t.code.length===Ot&&t.verify():t.emailWaitSeconds||t.requestCode(t.email))},children:t.codeSent?y(L,{children:[a(ve,{label:`Code sent to ${Cn(t.draft.email)}`,value:t.code,onChange:t.setCode,error:t.error,placeholder:"123456",inputMode:"numeric",autoComplete:"one-time-code",maxLength:Ot,mono:!0,autoFocus:!0,action:a(w,{type:"submit",disabled:n||t.code.length!==Ot,children:n?"Verifying\u2026":"Verify"})}),y("span",{className:"syncify-account-resend",children:[a(w,{variant:"text",onClick:()=>{t.requestCode(t.draft.email)},disabled:n||t.waitSeconds>0,children:t.waitSeconds>0?`Resend in ${Ao(t.waitSeconds)}`:"Resend code"}),a(w,{variant:"text",onClick:t.useAnotherEmail,disabled:n,children:"Use another email"})]})]}):a(ve,{label:"Email for sign-in codes",type:"email",value:t.email,onChange:t.setEmail,error:t.error,placeholder:"you@example.com",autoComplete:"email",autoFocus:!0,action:a(w,{type:"submit",disabled:n||t.emailWaitSeconds>0||!t.email.trim(),children:n?"Sending\u2026":t.emailWaitSeconds>0?`Send in ${Ao(t.emailWaitSeconds)}`:"Send code"})})})}var jd={owner:"This backup isn't secured. Someone using this Spotify account said it isn't yours.",admin:"This backup isn't secured. Syncify couldn't confirm it's yours.",undone:"This backup is no longer secured by your account."};function ps(e){let{session:t,secure:n,handle:o}=e,i=fs({nudge:e.nudge,onSignedIn:e.onSignedIn}),[r,s]=g(null),[c,l]=g(!1),u=ke(h=>{t&&Xi().then(P=>{!h()||P||(s({kind:"warning",text:Pe(new _("signed_out"))}),e.onSignedOut())}).catch(()=>{})}),d=t==null?void 0:t.token;T(()=>{let h=!0;return u.current(()=>h),()=>{h=!1}},[u,d]);let f=ke(h=>{!t||o!==void 0||fn().then(P=>{var U,R;h()&&e.onHandle((R=(U=P.profile)==null?void 0:U.handle)!=null?R:null)}).catch(()=>{})});T(()=>{let h=!0;return f.current(()=>h),()=>{h=!1}},[f,!!t&&o===void 0]);async function v(){l(!0),s(null);try{Z(await Qi())}catch(h){let P=h instanceof _&&h.code==="signed_out";s({kind:P?"warning":"error",text:Pe(h)}),P&&e.onSignedOut()}finally{l(!1)}}async function k(){var h;s(null),await i.signOut((h=t==null?void 0:t.email)!=null?h:""),e.onSignedOut()}if(t===void 0)return a(q,{idBase:e.idBase,id:"account",children:null});if(!t)return y(q,{idBase:e.idBase,id:"account",children:[a("p",{className:"syncify-tab-text",children:e.locked?"Sign in with the email that secured this backup":"Sign in to secure your backup so only you can restore it"}),r?a(M,{tone:r.kind,live:!0,children:r.text}):null,a(ys,{signIn:i})]});let I=n.kind==="open"||n.kind==="other-claim"||n.kind==="ended"&&n.reason!=="undone",S=i.busy||c;return y(q,{idBase:e.idBase,id:"account",children:[y(Dt,{children:[a(X,{label:"Email for sign-in codes",value:Cn(t.email)}),o?a(X,{label:"Creator handle",value:`@${o}`}):null,a(X,{label:"Your account page",children:a(w,{variant:"secondary",size:"small",onClick:()=>{v()},disabled:S,children:"Open"})}),I?a(X,{label:"Secure your backup so only you can restore it",children:a(w,{onClick:e.onSecure,disabled:S||e.securing||n.kind==="other-claim",children:e.securing?"Securing\u2026":n.kind==="ended"?"Secure again":"Secure"})}):null]}),n.kind==="ended"?a(M,{tone:"warning",children:jd[n.reason]}):null,e.secureError?a(M,{tone:"error",children:e.secureError}):null,r?a(M,{tone:r.kind,live:!0,children:r.text}):null,y("div",{className:"syncify-account-footer",children:[y("span",{className:"syncify-account-status",children:[n.kind==="secured"?a(xe,{className:"syncify-account-check"}):null,a(K,{parts:Yd(n)})]}),a(w,{variant:"text",onClick:()=>{k()},disabled:S,children:"Sign out"})]})]})}function Yd(e){switch(e.kind){case"secured":return["This backup is secured",...e.linkedCount>1?[`${e.linkedCount} Spotify accounts linked`]:[]];case"pending":return[ds(e)];case"other-account":return["This backup is secured by another account"];default:return["Signed in"]}}var ms=new WeakMap;function ot(e){let t=ms.get(e);return t||(t=V(e.marketplace_data.keys),ms.set(e,t)),t}function Oe(e){return Ue(e,"item")}function Ue(e,t){return`${e} ${t}${e===1?"":"s"}`}function it(e,t=new Date){let n=new Date(e);if(Number.isNaN(n.getTime()))return e;let o=n.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),i=new Date(t);return i.setDate(t.getDate()-1),n.toDateString()===t.toDateString()?`today, ${o}`:n.toDateString()===i.toDateString()?`yesterday, ${o}`:`${n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===t.getFullYear()?void 0:"numeric"})}, ${o}`}function Pn(e){return e.length<=1?e.join(""):`${e.slice(0,-1).join(", ")} and ${e[e.length-1]}`}function gs(e,t,n){var l,u;let o=it(e.metadata.last_sync_datetime),i=Oe(ot(e).length),r=`from ${e.metadata.device_info}`,s=(u=(l=e.backup)==null?void 0:l.name)!=null?u:null,c=e.payload_hash===n;return t==="safety-copy"?{backup:e,kind:t,name:"Safety copy",meta:[s,o,i,"updated weekly"].filter(qd),current:c,title:`the safety copy from ${o}`}:t==="unapproved"?{backup:e,kind:t,name:"Not approved",meta:[o,i,r],current:c,title:o}:{backup:e,kind:t,name:s!=null?s:o.charAt(0).toUpperCase()+o.slice(1),meta:s?[o,i,r]:[i,r],current:c,title:s!=null?s:o}}function qd(e){return e!==null}var hs={extension:"extension",theme:"theme",snippet:"snippet"},Gd={extension:"extension",custom_app:"app",theme:"theme"},Vd={extension:"extension",custom_app:"custom app",theme:"theme"};function Nn(e){let{changes:t}=e,[n,o]=g(!1);return y(te,{label:e.label,children:[t.changes.map(i=>a(Jd,{change:i,includeLabel:e.includeLabel(i.name),onInclude:r=>e.onInclude(i.key,r),disabled:e.disabled},i.key)),t.manual.map(i=>a(J,{leading:a(Ie,{kind:Gd[i.type]}),name:i.name,meta:a(K,{parts:[Vd[i.type],i.scheme]}),end:a("span",{className:"syncify-change-label syncify-cap",children:"Add manually"})},`${i.type}:${i.name}`)),t.unchanged.length>0?a(J,{name:y("span",{className:"syncify-change-fold",children:[t.unchanged.length," more stay the same"]}),end:a(w,{variant:"subtle","aria-expanded":n,onClick:()=>o(!n),children:n?"Hide":"Show"})}):null,n?t.unchanged.map(i=>a(Xd,{item:i},i.key)):null]})}function Jd(e){let{change:t}=e;return a(J,{leading:a(Ie,{kind:hs[t.type]}),name:t.name,meta:t.note?a(K,{parts:[t.note]}):void 0,end:y(L,{children:[a("span",{className:"syncify-change-label syncify-cap","data-change":t.fixed?void 0:t.change,children:t.fixed?"Stays off":t.change}),t.optional&&!t.fixed?a(xo,{checked:t.included,onChange:e.onInclude,label:e.includeLabel,disabled:e.disabled}):null]})})}function Xd(e){return a(J,{leading:a(Ie,{kind:hs[e.item.type]}),name:e.item.name,meta:e.item.note?a(K,{parts:[e.item.note]}):void 0})}var Ss={Adds:0,Updates:1,Removes:2},Zd=["blocked","host","repo","catalog","unchecked"];function Tn(e,t,n){var l,u;let{optional:o,allowed:i}=n,r=(l=n.fixed)!=null?l:new Set,s=[],c=[];for(let d of e.items){let f=t.get(d.key),p=o.has(d.key)||r.has(d.key),v={key:d.key,name:d.name,type:d.type,note:f?Mo(f):r.has(d.key)?"Not in Marketplace's list":n.unapproved&&p?"Not approved":null},k=d.change==="added"?"Adds":d.change==="removed"?"Removes":d.isNew?"Updates":null;if(k){let I=r.has(d.key);s.push(b(m({},v),{change:k,optional:p,fixed:I,included:!p||!I&&i.has(d.key)}))}else c.push(v)}return s.sort((d,f)=>Ss[d.change]-Ss[f.change]),{changes:s,unchanged:c,manual:e.manual,warnings:[...Qd(s,t,(u=n.verb)!=null?u:"Restore"),...ef(s)],count:s.filter(d=>d.included).length}}function _n(e,t){return t===0?e:t===1?`${e} 1 change`:`${e} ${t} changes`}function Mo(e){switch(e.kind){case"host":return`Code from ${e.host}`;case"repo":return`Code from ${e.repo}`;case"blocked":return"Blocked by Marketplace";case"catalog":return"Not in Marketplace";case"unchecked":return"Not checked";case"custom":return"Custom"}}function Qd(e,t,n){var i;let o=new Map;for(let r of e){if(r.change==="Removes"||r.fixed)continue;let s=t.get(r.key);!s||!Je(s)&&s.kind!=="unchecked"||o.set(s.kind,[...(i=o.get(s.kind))!=null?i:[],r.name])}return Zd.flatMap(r=>{let s=o.get(r);return s?[tf(r,s,n)]:[]})}function ef(e){let t=e.filter(n=>n.fixed).map(n=>n.name);return t.length===0?[]:[t.length===1?`${Pn(t)} isn't in Marketplace's list anymore, so it stays off.`:`${Pn(t)} aren't in Marketplace's list anymore, so they stay off.`]}function tf(e,t,n){let o=t.length===1,i=Pn(t),r=o?`${n} it only if you trust it.`:`${n} them only if you trust them.`;switch(e){case"blocked":return`${i} ${o?"is":"are"} on Marketplace's block list. ${r}`;case"host":return`${i} ${o?"loads from a site":"load from sites"} outside GitHub. ${r}`;case"repo":return o?`${i} loads its code from a different repo than the one it names. ${r}`:`${i} load their code from different repos than the ones they name. ${r}`;case"catalog":return`${i} ${o?"isn't":"aren't"} in Marketplace's catalog. ${r}`;default:return`GitHub couldn't be reached to check ${i}. ${r}`}}function bs(e,t,n){var I;let[o,i]=g(()=>new Set),[r,s]=g(null),c=G(()=>nn(ot(e),e.spicetify_config,t,n),[e,t,n]),l=G(()=>Xe(c.items),[c]);T(()=>{let S=!0;return Ze(c.items,l).then(h=>{S&&s({for:e,checks:h})}),()=>{S=!1}},[e,c,l]);let u=(r==null?void 0:r.for)===e?r.checks:null,d=G(()=>new Map([...u!=null?u:[],...l]),[u,l]),f=((I=e.backup)==null?void 0:I.kind)==="quarantined",p=G(()=>new Set(c.items.filter(S=>{var h;return S.change!=="removed"&&S.isNew&&(f||Je(d.get(S.key))||((h=d.get(S.key))==null?void 0:h.kind)==="unchecked")}).map(S=>S.key)),[c,d,f]),v=G(()=>Tn(c,d,{optional:p,allowed:o,unapproved:f}),[c,d,p,o,f]);function k(S,h){let P=new Set(o);h?P.add(S):P.delete(S),i(P)}return{preview:c,changes:v,unapproved:f,checking:u===null,skipped:[...p].filter(S=>!o.has(S)),allow:k}}function ks(e){let{row:t,local:n}=e,o=j("restore-heading"),i=bs(t.backup,n.items,n.spicetifyConfig),{changes:r}=i,s=!n.marketplaceAvailable;T(()=>{var l;(l=document.getElementById(o))==null||l.focus()},[o]);let c=y(L,{children:[a(w,{variant:"secondary",onClick:e.onCancel,disabled:e.restoring,children:"Cancel"}),a(w,{onClick:()=>e.onRestore({row:t,skipped:i.skipped,manual:i.preview.manual}),disabled:e.busy||i.checking||s,children:e.restoring?"Restoring\u2026":i.checking?"Checking\u2026":_n("Restore",r.count)})]});return y(q,{idBase:e.idBase,id:"backups",actions:c,children:[a(ae,{title:`Restore ${t.title}`,id:o,focusable:!0}),s?a(M,{tone:"warning",children:"Install Spicetify Marketplace to restore a backup."}):null,i.unapproved?a(M,{tone:"warning",children:"An install this Spotify account hasn't approved made this backup. Its items stay off unless you turn them on."}):null,a(Nn,{changes:r,label:"What this restore changes",includeLabel:l=>`Restore ${l}`,onInclude:i.allow,disabled:e.busy}),r.warnings.map(l=>a(M,{tone:"warning",children:l},l)),e.localIsUnsaved?a(M,{tone:"warning",children:"Your current setup isn't backed up."}):null]})}function ws(e){var P,U,R,E,D;let{remote:t,local:n}=e,o=j("backup"),[i,r]=g(null),[s,c]=g(null),l=W(null);if(T(()=>{var x;s||!l.current||((x=document.getElementById(l.current))==null||x.focus(),l.current=null)},[s]),s&&n)return a(ks,{idBase:e.idBase,row:s,local:n,localIsUnsaved:n.installedItemCount>0&&!nf(n.hash,t),busy:e.busy,restoring:e.restoring,onCancel:()=>c(null),onRestore:x=>{var N;return e.onRestore(b(m({},x),{linkedHash:(N=i==null?void 0:i.hash)!=null?N:null}))}},s.backup.payload_hash);async function u(x){if(!x){r(null);return}r({hash:x,remote:null});try{let N=await De(e.config,x);r({hash:x,remote:N})}catch(N){r(null),e.onError(N)}}let d=i?i.remote:t,f=(P=n==null?void 0:n.hash)!=null?P:null,p=x=>`${o}-${x.backup.payload_hash}`,v=(x,N)=>x.map(F=>gs(F,N,f)),k=v((U=d==null?void 0:d.backups)!=null?U:[],"backup"),I=v(d!=null&&d.safetyCopy?[d.safetyCopy]:[],"safety-copy"),S=i?[]:v((R=t==null?void 0:t.unapproved)!=null?R:[],"unapproved");function h(x){return a(J,{id:p(x),name:x.name,nameMark:x.kind==="safety-copy"?a(Io,{className:"syncify-safety-mark"}):x.kind==="unapproved"?a(be,{tone:"warning"}):void 0,meta:a(K,{parts:x.meta}),end:x.current?a("span",{className:"syncify-row-status syncify-cap",children:"Current"}):void 0,onOpen:x.current?void 0:()=>{l.current=p(x),c(x)},openLabel:`Preview restore of ${x.title}`,disabled:e.busy},`${x.kind}-${x.backup.payload_hash}-${x.backup.metadata.last_sync_datetime}`)}return y(q,{idBase:e.idBase,id:"backups",children:[e.notices,n&&!n.marketplaceAvailable?a(M,{tone:"warning",children:"Install Spicetify Marketplace to restore a backup."}):null,!e.lockedBy&&e.otherAccounts.length>0?a(X,{label:"Show backups from",children:a(Ce,{label:"Show backups from",trigger:{value:(D=(E=e.otherAccounts.find(x=>x.hash===(i==null?void 0:i.hash)))==null?void 0:E.label)!=null?D:"This Spotify account"},items:[{hash:null,label:"This Spotify account"},...e.otherAccounts].map(x=>{var N;return{label:x.label,checked:((N=i==null?void 0:i.hash)!=null?N:null)===x.hash,onSelect:()=>{u(x.hash)}}}),disabled:e.busy})}):null,e.lockedBy?a("p",{className:"syncify-tab-text",children:e.lockedBy==="not_owner"?"Sign in with the account that secured them":"Sign in to see and restore your backups"}):(!t||!n)&&e.failed?null:!t||!n||i&&!i.remote?y(te,{label:"Loading backups",children:[a(Re,{}),a(Re,{})]}):k.length+I.length+S.length===0?i?a("p",{className:"syncify-tab-text",children:"No backups yet."}):null:y(te,{label:"Backups",children:[k.map(h),I.length>0?a(xn,{}):null,I.map(h),S.length>0?a(xn,{}):null,S.map(h)]})]})}function nf(e,t){return t?[...t.backups,...t.safetyCopy?[t.safetyCopy]:[]].some(n=>n.payload_hash===e):!1}function vs(e,t){let[n,o]=g(!1),[i,r]=g(null),s=ke(t);return T(()=>{if(!n)return;let c=l=>{var d;if(!((d=document.getElementById(e))!=null&&d.isConnected)){o(!1),r(null);return}l.preventDefault(),l.stopImmediatePropagation();let u=fa(l);if(u.kind!=="ignore"){if(u.kind==="cancel"){o(!1),r(null);return}if(u.kind==="error"){r(u.message);return}if(ya(u.shortcut)){r(`${Et(u.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}o(!1),s.current(u.shortcut)}};return window.addEventListener("keydown",c,!0),()=>window.removeEventListener("keydown",c,!0)},[n,e,s]),{recording:n,error:i,clearError:()=>r(null),toggle:()=>{r(null),o(!n)}}}var xs=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function Cs(e){var d,f;let{config:t}=e,[n]=g(()=>mn()),o=j("shortcut"),i=vs(o,l),r=n?t.entryPoint:"topbar",s=i.recording?"Press keys":t.shortcut?Et(t.shortcut):"Off";function c(p){ha(p),e.onConfigChange(p)}function l(p){c(b(m({},t),{shortcut:p})),uo(p),i.clearError()}function u(p){c(b(m({},t),{entryPoint:p})),gn(p)}return y(q,{idBase:e.idBase,id:"settings",children:[y(Dt,{children:[a(To,{label:"Automatic backup when Spotify starts",checked:t.autoBackupEnabled&&!e.unsupported,onChange:p=>c(b(m({},t),{autoBackupEnabled:p})),disabled:e.busy||e.unsupported}),a(X,{label:"Open Syncify from",children:a(Ce,{label:"Open Syncify from",trigger:{value:(f=(d=xs.find(p=>p.value===r))==null?void 0:d.label)!=null?f:""},items:xs.map(p=>({label:p.label,checked:p.value===r,onSelect:()=>u(p.value)})),disabled:!n})}),a(X,{label:"Keyboard shortcut",value:i.recording&&!i.error?"Press a key combination, or Esc to cancel":void 0,children:y("span",{className:"syncify-settings-shortcut",children:[i.recording?null:t.shortcut?a(w,{variant:"subtle",onClick:()=>l(null),children:"Turn off"}):a(w,{variant:"subtle",onClick:()=>l(et),children:"Use default"}),a(Eo,{id:o,keys:s,recording:i.recording,"aria-label":i.recording?`${s} for a new keyboard shortcut`:`${s}, change the keyboard shortcut`,onClick:i.toggle})]})})]}),i.error?a(M,{tone:"warning",live:!0,children:i.error}):null,n?t.entryPoint==="menu"&&!t.shortcut?a(M,{tone:"warning",children:"Keep a shortcut in case a Spotify update breaks the profile menu."}):null:a(M,{tone:"info",children:"The profile menu isn't available in this Spicetify version."})]})}function Ut(e){let t=`${O().webUrl.replace(/\/+$/,"")}/discover`;return e?`${t}?post=${encodeURIComponent(e)}`:t}function rt(e){var t;return(t=e.name)!=null?t:me(e.code)}function Is(e){return[`Used by ${e.imports}`,...e.posted?["On Discover"]:[]]}function Rs(e){let t=e.posted?"The code stops working and its Discover post comes down.":"The code stops working.";return e.imports===0?t:`${t} ${e.imports===1?"1 person":`${e.imports} people`} used it.`}var An=12;function Es(e){return[...Array(Math.min(e.extensions,An)).fill("extension"),...Array(Math.min(e.themes,An)).fill("theme"),...Array(Math.min(e.snippets,An)).fill("snippet")].slice(0,An)}var of={extension:"extension",theme:"theme",snippet:"snippet"};function Ps(e){var l,u;let{compose:t}=e,n=j("compose-heading"),o=(u=(l=t.compose)==null?void 0:l.code)!=null?u:null,{draft:i,saving:r}=t;T(()=>{var d;(d=document.getElementById(n))==null||d.focus()},[n]);let s=i?[...i.items].sort((d,f)=>Number(i.leftOut.has(f.key))-Number(i.leftOut.has(d.key))||d.name.localeCompare(f.name)):[],c=y(L,{children:[a(w,{variant:"secondary",onClick:t.cancel,disabled:r,children:"Cancel"}),a(w,{onClick:()=>{t.save()},disabled:!i||t.included.length===0||r,children:i?r?o?"Updating\u2026":"Creating\u2026":o?"Update code":"Create code":"Checking\u2026"})]});return y(q,{idBase:e.idBase,id:"share",actions:c,children:[a(ae,{title:o?`Update ${rt(o)}`:"Create a code",id:n,focusable:!0}),t.error?a(M,{tone:"error",children:t.error}):null,a(ve,{label:"Setup name (optional)",value:t.name,onChange:t.setName,maxLength:Fr,disabled:r}),t.askHandle?a(ve,{label:"Pick a handle for your profile",value:t.handle,onChange:t.setHandle,onBlur:t.checkHandle,error:t.handleError,prefix:"@",maxLength:oo,disabled:r}):null,i&&t.included.length===0?a(M,{tone:"warning",children:"Nothing here can go in a code. Add something from Marketplace first."}):null,a(ae,{title:"What goes in",end:i?a(K,{parts:[Oe(t.included.length)]}):void 0}),i?a(te,{label:"What goes in",children:s.map(d=>{let f=i.leftOut.get(d.key),p=[f?Mo(f):null,d.repo].filter(Boolean);return a(J,{leading:a(Ie,{kind:of[d.type]}),name:d.name,meta:p.length>0?a(K,{parts:p}):void 0,end:f?a("span",{className:"syncify-change-label syncify-cap",children:"Left out"}):void 0},d.key)})}):y(te,{label:"Checking your items",children:[a(Re,{}),a(Re,{})]})]})}var Ns=[["add","Add to my setup"],["replace","Replace my setup"]];function Ts(e){var c,l,u,d;let{load:t}=e,n=j("share-heading"),o=(c=t.shared)==null?void 0:c.file;if(T(()=>{var f;(f=document.getElementById(n))==null||f.focus()},[n]),!o||!t.changes)return null;let i=e.marketplaceAvailable===!1,r=o.creator,s=y(L,{children:[a(w,{variant:"secondary",onClick:t.close,disabled:t.applying,children:"Cancel"}),a(w,{onClick:()=>{t.apply()},disabled:t.applying||t.checking||e.busy||i,children:t.applying?"Loading\u2026":t.checking?"Checking\u2026":_n("Load",t.changes.count)})]});return y(q,{idBase:e.idBase,id:"share",actions:s,children:[a(ae,{title:`Load ${(l=o.name)!=null?l:me(o.code)}`,id:n,focusable:!0,end:r?a(w,{variant:"text",onClick:()=>Z(Zr(r)),children:`by @${r}`}):void 0}),t.applyError?a(M,{tone:"error",children:t.applyError}):null,i?a(M,{tone:"warning",children:"Install Spicetify Marketplace to load a setup."}):null,a(X,{label:"How to load it",children:a(Ce,{label:"How to load it",trigger:{value:(d=(u=Ns.find(([f])=>f===t.mode))==null?void 0:u[1])!=null?d:""},items:Ns.map(([f,p])=>({label:p,checked:t.mode===f,onSelect:()=>t.setMode(f)})),disabled:t.applying})}),a(Nn,{changes:t.changes,label:"What loading it changes",includeLabel:f=>`Load ${f}`,onInclude:t.allow,disabled:t.applying}),t.theme?a(M,{tone:"info",children:`Your theme switches to ${t.theme.name}.`}):null,t.changes.warnings.map(f=>a(M,{tone:"warning",children:f},f))]})}function _s(e){let[t,n]=g(null),[o,i]=g(null),[r,s]=g(""),[c,l]=g(""),[u,d]=g(!1),[f,p]=g(!1),[v,k]=g(null),[I,S]=g(null),h=W(0),[P,U]=g(e.token);P!==e.token&&(U(e.token),n(null),i(null),S(null));let R=t!==null&&t.code===null&&!e.hasHandle,E=R&&u?io(c):null,D=o?o.items.filter($=>!o.leftOut.has($.key)):[];async function x($){var Ke,Fe;let H=++h.current;n({code:$}),s((Ke=$==null?void 0:$.name)!=null?Ke:""),l((Fe=e.suggestedHandle)!=null?Fe:""),d(!1),i(null),k(null),S(null);try{let se=await ue(),ct=await Yr(V(se),se);H===h.current&&i(m({keys:se},ct))}catch(se){if(H!==h.current)return;n(null),k(se instanceof Error?se.message:String(se))}}function N(){h.current+=1,n(null),i(null)}function F(){n(null),i(null)}async function Q(){if(!t||!o)return;if(R&&io(c)){d(!0);return}p(!0),k(null);let $=qr(o.keys,D);try{let H=t.code?await Qr(t.code.code,r.trim(),$):await Xr(r.trim(),$,R?c.trim():void 0);S(b(m({},H),{outcome:t.code?"updated":"created"})),F(),await e.reload()}catch(H){if(H instanceof _&&H.code==="same_setup"&&H.share){S(b(m({},H.share),{leftOut:0,outcome:"existing"})),F();return}e.fail(H,k),H instanceof _&&H.code==="publish_failed"&&(n(null),e.reload())}finally{p(!1)}}return{compose:t,draft:o,included:D,name:r,setName:s,askHandle:R,handle:c,setHandle:$=>l($.replace(/^@/,"")),checkHandle:()=>d(!0),handleError:E,saving:f,error:v,saved:I,dismissSaved:()=>S(null),forgetSaved:$=>S(H=>(H==null?void 0:H.code)===$?null:H),start:x,cancel:N,save:Q}}function As(e){var E;let[t,n]=g(null),[o,i]=g(null),[r,s]=g(null),[c,l]=g(null),[u,d]=g(0),f=W(!1),[p,v]=g(null),[k,I]=g(!1);function S(D,x){x(Rt(D,o)),D instanceof _&&D.code==="signed_out"&&e.onSignedOut()}async function h(){var D,x;v(null);try{let N=await fn();n(N.codes),f.current||(f.current=!0,d(N.newHearts)),e.onCodeCount(N.codes.length),i(N.max),s(N.profile),e.onHandle((x=(D=N.profile)==null?void 0:D.handle)!=null?x:null),l(N.suggestedHandle)}catch(N){S(N,v)}}async function P(D){I(!0),v(null);try{return await ea(D),await h(),!0}catch(x){return S(x,v),!1}finally{I(!1)}}let U=ke(D=>{n(null),f.current=!1,D&&h()}),R=(E=e.session)==null?void 0:E.token;return T(()=>U.current(R!==void 0),[U,R]),{codes:t,max:o,atMax:t!==null&&o!==null&&t.length>=o,profile:r,suggestedHandle:c,newHearts:u,error:p,deleting:k,load:h,remove:P,fail:S}}function Ms(e){let[t,n]=g(""),[o,i]=g(null),[r,s]=g(null),[c,l]=g(null),[u,d]=g(null),[f,p]=g("add"),[v,k]=g(()=>new Set),[I,S]=g(null),[h,P]=g(void 0),[U,R]=g(!1),E=G(()=>u?Gr(u.file,u.items,e.localItems,e.localConfig,e.localTheme,f):null,[u,e.localItems,e.localConfig,e.localTheme,f]),D=G(()=>{if(!E||!u)return null;let B=new Set(u.items.map(A=>A.key));return E.items.filter(A=>A.change!=="removed"&&B.has(A.key)&&(f==="replace"||A.isNew))},[E,u,f]),x=G(()=>D?Xe(D):null,[D]),N=I&&I.for===D?I.checks:null,F=G(()=>new Map([...N!=null?N:[],...x!=null?x:[]]),[N,x]),Q=G(()=>E&&h!==void 0?Vr(E,h):new Set,[E,h]),$=G(()=>{var B;return new Set(((B=E==null?void 0:E.items)!=null?B:[]).filter(A=>{var z;return A.change!=="removed"&&A.isNew&&(Je(F.get(A.key))||((z=F.get(A.key))==null?void 0:z.kind)==="unchecked")}).map(A=>A.key))},[E,F]),H=G(()=>E?Tn(E,F,{optional:$,allowed:v,fixed:Q,verb:"Load"}):null,[E,F,$,v,Q]),Ke=E!=null&&E.theme&&!Q.has(E.theme.key)&&(!$.has(E.theme.key)||v.has(E.theme.key))?E.theme:null,Fe=E!==null&&(N===null||h===void 0);T(()=>{if(!D||!x)return;let B=!0;return Ze(D,x).then(A=>{B&&S({for:D,checks:A})}),()=>{B=!1}},[D,x]);async function se(B){let A=B!=null?B:Wr(t);if(s(null),l(null),d(null),!A){s(Rt(new _("no_code")));return}i({code:A,pick:B!==void 0});try{let z=await ta(A);p("add"),k(new Set),d({file:z,items:V(z.keys),pick:B!==void 0}),no().then(P)}catch(z){s(Rt(z))}finally{i(null)}}function ct(B,A){let z=new Set(v);A?z.add(B):z.delete(B),k(z)}async function lt(){if(!u||!E)return;R(!0),l(null);let B=[...new Set([...$,...Q])].filter(A=>Q.has(A)||!v.has(A));try{await ka(e.config,u.file,f,B,h!=null?h:null,u.pick),Spicetify.showNotification("Syncify: setup loaded. Reloading\u2026"),Lt(E.manual,"share"),setTimeout(()=>window.location.reload(),1e3)}catch(A){R(!1),l(rf(A))}}return{input:t,setInput:n,fetching:o,error:r,applyError:c,shared:u,close:()=>{d(null),l(null)},mode:f,setMode:p,changes:H,theme:Ke,checking:Fe,applying:U,open:se,allow:ct,apply:lt}}function rf(e){if(e instanceof _t){let t=e.reason instanceof re?"Sign in to back up.":e.reason instanceof Error?e.reason.message:String(e.reason);return`${e.message} ${t}`}return e instanceof Error?e.message:String(e)}async function Mn(e){var t;try{return await navigator.clipboard.writeText(e),!0}catch(n){let o=(t=Spicetify.Platform)==null?void 0:t.ClipboardAPI;return o!=null&&o.copy?(await o.copy(e),!0):!1}}var af=2e3;function Bs(e){let{codes:t,compose:n}=e,[o,i]=g(null),[r,s]=g(null);T(()=>{if(!r)return;let d=setTimeout(()=>s(null),af);return()=>clearTimeout(d)},[r]);async function c(d,f){await Mn(d)&&s(f)}async function l(){o&&await t.remove(o.code)&&(n.forgetSaved(o.code),i(null))}let u=t.codes;return y("section",{className:"syncify-share-part","aria-label":"Your codes",children:[a(ae,{title:y(L,{children:["Your codes",t.newHearts>0?a("span",{className:"syncify-share-hearts",children:Ue(t.newHearts,"new heart")}):null]}),end:u&&t.max!==null?a(No,{used:u.length,max:t.max,label:"Share codes"}):void 0}),t.error?a(M,{tone:"error",actions:a(w,{variant:"text",onClick:()=>{t.load()},children:"Try again"}),children:t.error}):null,n.saved?a(sf,{saved:n.saved,copied:r,onCopy:(d,f)=>{c(d,f)},discoverOpen:e.discoverOpen,onDismiss:n.dismissSaved}):null,n.error&&!n.compose?a(M,{tone:"error",children:n.error}):null,u===null?t.error?null:a(te,{label:"Loading your codes",children:a(Re,{})}):u.length>0?a(te,{label:"Your codes",children:u.map(d=>a(J,{name:rt(d),meta:a(K,{parts:[d.name?a("code",{className:"syncify-share-code",children:me(d.code)}):null,...Is(d)]}),end:y("span",{className:"syncify-share-code-actions",children:[a(w,{variant:"text",onClick:()=>{c(me(d.code),`code:${d.code}`)},children:r===`code:${d.code}`?"Copied":"Copy"}),d.link?a(w,{variant:"text",onClick:()=>{var f;c((f=d.link)!=null?f:"",`link:${d.code}`)},children:r===`link:${d.code}`?"Copied":"Get link"}):null,a(Ce,{trigger:"more",label:`More for ${rt(d)}`,disabled:n.compose!==null||t.deleting,items:[{label:"Update",onSelect:()=>{n.start(d)}},...e.discoverOpen&&!d.posted?[{label:"Post to Discover",onSelect:()=>Z(Ut(d.code))}]:[],{label:"Delete",danger:!0,onSelect:()=>i(d)}]})]})},d.code))}):null,u!==null?a("div",{className:"syncify-share-create",children:a(w,{variant:"secondary",onClick:()=>{n.start(null)},disabled:n.compose!==null||t.atMax||e.marketplaceAvailable===!1,children:"Create a code"})}):null,a(Co,{open:o!==null,onClose:()=>i(null),title:o?`Delete ${rt(o)}`:"",actions:y(L,{children:[a(w,{variant:"secondary",onClick:()=>i(null),disabled:t.deleting,children:"Keep it"}),a(w,{variant:"danger",onClick:()=>{l()},disabled:t.deleting,children:t.deleting?"Deleting\u2026":"Delete code"})]}),children:o?Rs(o):null})]})}function sf(e){let{saved:t}=e,n=me(t.code),o=t.link,i=t.outcome==="existing"?"You shared this setup already as":t.outcome==="updated"?"Code updated:":"Your code is ready:";return y(M,{tone:"info",live:!0,actions:y(L,{children:[a(w,{variant:"text",onClick:()=>e.onCopy(n,"saved-code"),children:e.copied==="saved-code"?"Copied":"Copy"}),o?a(w,{variant:"text",onClick:()=>e.onCopy(o,"saved-link"),children:e.copied==="saved-link"?"Copied":"Get link"}):null,t.outcome==="created"&&e.discoverOpen?a(w,{variant:"text",onClick:()=>Z(Ut(t.code)),children:"Post to Discover"}):null,a(w,{variant:"subtle",onClick:e.onDismiss,children:"Dismiss"})]}),children:[y("span",{children:[i," ",a("code",{className:"syncify-share-code",children:n})]}),t.leftOut>0?a("span",{className:"syncify-share-left-out",children:t.leftOut===1?"1 snippet isn't in Marketplace's list anymore, so it was left out.":`${t.leftOut} snippets aren't in Marketplace's list anymore, so they were left out.`}):null]})}function Ls(e){let{session:t}=e,n=Ms(e),o=As(e),i=_s({token:t==null?void 0:t.token,hasHandle:o.profile!==null,suggestedHandle:o.suggestedHandle,reload:o.load,fail:o.fail}),[r,s]=g(null);if(T(()=>{na().then(s)},[]),n.shared)return a(Ts,{idBase:e.idBase,load:n,marketplaceAvailable:e.marketplaceAvailable,busy:e.busy});if(i.compose)return a(Ps,{idBase:e.idBase,compose:i});let c=n.input.trim();return y(q,{idBase:e.idBase,id:"share",children:[a("form",{className:"syncify-share-part",noValidate:!0,onSubmit:l=>{l.preventDefault(),!n.fetching&&c&&n.open()},children:a(ve,{label:"Load a setup",value:n.input,onChange:n.setInput,placeholder:"Paste a code or a link",error:n.error,action:a(w,{variant:"secondary",type:"submit",disabled:n.fetching!==null||!c,children:n.fetching&&!n.fetching.pick?"Loading\u2026":"Load"})})}),r?y("section",{className:"syncify-share-part","aria-label":r.length>0?"Syncify picks":"Discover",children:[r.length>0?a(ae,{title:"Syncify picks"}):null,y(te,{children:[r.map(l=>{var u;return a(J,{name:l.name,meta:a(K,{parts:[a("span",{className:"syncify-share-pips",children:Es(l).map((d,f)=>a(Ie,{kind:d},f))},"pips"),((u=n.fetching)==null?void 0:u.code)===l.code?"Loading\u2026":Ue(l.extensions+l.themes+l.snippets,"item")]}),onOpen:()=>{n.open(l.code)},openLabel:`Preview ${l.name}`,disabled:n.fetching!==null},l.code)}),a(J,{name:"Find more setups on Discover",end:a(w,{variant:"secondary",size:"small",onClick:()=>Z(Ut()),children:"Open"})})]})]}):null,t===void 0?null:t===null?a("div",{className:"syncify-share-part",children:a(X,{label:"Sign in to share this setup as a code",children:a(w,{variant:"secondary",onClick:e.onSignIn,children:"Sign in"})})}):a(Bs,{codes:o,compose:i,discoverOpen:r!==null,marketplaceAvailable:e.marketplaceAvailable})]})}var Bo="syncify:share-code-count",Lo="syncify:handle";function cf(){var t,n;let e=Number((n=(t=Spicetify.LocalStorage)==null?void 0:t.get(Bo))!=null?n:NaN);return Number.isInteger(e)&&e>=0?e:null}function lf(){var t;let e=(t=Spicetify.LocalStorage)==null?void 0:t.get(Lo);return e==null?void 0:e||null}function Ds(){let[e,t]=g(()=>cf()),[n,o]=g(()=>lf()),i=ne(c=>{var l,u;c===null?(l=Spicetify.LocalStorage)==null||l.remove(Bo):(u=Spicetify.LocalStorage)==null||u.set(Bo,String(c)),t(c)},[]),r=ne(c=>{var l,u;c===void 0?(l=Spicetify.LocalStorage)==null||l.remove(Lo):(u=Spicetify.LocalStorage)==null||u.set(Lo,c!=null?c:""),o(c)},[]),s=ne(()=>{i(null),r(void 0)},[i,r]);return{codeCount:e,handle:n,saveCodeCount:i,saveHandle:r,forget:s}}var uf=2e3;function Os(e){let{install:t}=e,n=!t||t.trusted?null:t.refused?"This Spotify account refused backups from this install. Sign in to back up from it.":"This install isn't approved yet. Its backups are kept apart until you approve it from another install or sign in.";return y(L,{children:[e.nudge?a(M,{tone:"warning",actions:y(L,{children:[a(w,{variant:"subtle",onClick:e.onHideNudge,disabled:e.securing,children:"Not now"}),a(w,{size:"small",onClick:e.onSecure,disabled:e.securing,children:e.securing?"Securing\u2026":"Secure"})]}),children:"Your backup isn't secured. Anyone who knows your Spotify username can restore it."}):null,n?a(M,{tone:"info",children:n}):null,e.restoreResult?a(df,{manual:e.restoreResult.manual}):null]})}function df(e){let[t,n]=g(!1),o=Wa(e.manual).join(`
`);if(T(()=>{if(!t)return;let r=setTimeout(()=>n(!1),uf);return()=>clearTimeout(r)},[t]),!o)return null;let i=e.manual.length;return y(M,{tone:"info",actions:y(L,{children:[a(w,{variant:"text",onClick:()=>{Mn(o).then(n)},children:t?"Copied":"Copy"}),a(w,{variant:"subtle",onClick:Ha,children:"Dismiss"})]}),children:[i===1?"1 isn't from Marketplace. Add it in a terminal:":`${i} aren't from Marketplace. Add them in a terminal:`,a("pre",{className:"syncify-commands",children:a("code",{children:o})})]})}function Us(e){let{message:t}=e;return a(M,{tone:t.kind,actions:y(L,{children:[t.kind==="error"?a(w,{variant:"text",onClick:e.onTryAgain,disabled:e.busy,children:"Try again"}):null,a(w,{variant:"subtle",onClick:e.onDismiss,children:"Dismiss"})]}),children:t.text})}function $s(e){let t=ff(e);return t.backedUp&&e.latest?b(m({},t),{line:[`Backed up ${it(e.latest.metadata.last_sync_datetime)}`,`${Oe(e.localItemCount)} on this device`]}):b(m({},t),{line:[t.title,...t.detail]})}function ff(e){let t={backedUp:!1,supportAsk:null},n=`${Oe(e.localItemCount)} on this device`;return e.restoreResult&&!e.unsupported?yf(e.restoreResult):e.unsupported?b(m({},t),{title:"Update Syncify to keep backing up",detail:["Your backups are safe"],action:"how-to-update"}):e.locked?b(m({},t),{title:"Sign in to restore",detail:[e.locked==="not_owner"?"Secured by another account":"This backup is secured"],action:"sign-in"}):e.activity==="backing-up"?b(m({},t),{title:"Backing up\u2026",detail:[],action:"back-up"}):e.checked?e.latest?e.localHash&&!e.backedUp?b(m({},t),{title:"Changes since your last backup",detail:pf(e.latest,e.latestItems,e.localItems,e.localConfig),action:"back-up"}):b(m({},t),{title:"Everything is backed up",detail:[`Last backup ${it(e.latest.metadata.last_sync_datetime)}`,n],action:null,backedUp:!0}):b(m({},t),{title:"No backup yet",detail:["Save your extensions and themes to restore them after a reinstall or on another computer."],action:"back-up"}):e.checkError?b(m({},t),{title:"Couldn't check your backup",detail:[e.checkError],action:"try-again"}):b(m({},t),{title:"Checking your backup\u2026",detail:[],action:null})}function yf(e){let t=e.loaded===e.total,n=e.kind==="share";return{title:t?n?"Setup loaded":"Backup restored":`${n?"Loaded":"Restored"} ${e.loaded} of ${e.total}`,detail:[t?e.total===0?"Nothing from Marketplace to load":`${e.loaded} of ${e.total} loaded`:"Missing something? Reload Spotify once more."],action:t?null:"reload",backedUp:!1,supportAsk:t?n?"Syncify set it up for you?":"Syncify saved your setup?":null}}function pf(e,t,n,o){var f;let i=new Set(t),r=new Set(n),s=n.filter(p=>!i.has(p)).length,c=t.filter(p=>!r.has(p)).length,l=(f=e.spicetify_config)!=null?f:null,u=!!(o&&!l),d=!u&&(o&&l?!wr(o,l):o!==l);return[s?`${s} added`:null,c?`${c} removed`:null,d?"Spicetify config changed":null,u?"Spicetify config not saved yet":null,`Last backup ${it(e.metadata.last_sync_datetime)}`].filter(p=>p!==null)}function Hs(e,t){return(e==null?void 0:e.status)==="pending"&&!e.mine?b(m({kind:"claim"},In(e)),{canAnswer:!e.not_me}):t?{kind:"install",title:En(t),install:t}:null}var mf=3,Do={exists:!1,payload:null,backups:[],safetyCopy:null,claim:null,unapproved:[],install:null,nudge:!1},$e=null;function Ks(e){var d,f,p;let[t,n]=g(()=>$e),[o,i]=g(void 0),r=ne(v=>{$e=v,n(v)},[]),s=ne(async()=>{let v,k=null;try{v=await De(e)}catch(P){if(!(P instanceof re))throw P;v=Do,k=P.code}let I=await ie().catch(()=>null),S=I?await wa(e).catch(()=>null):null,h=I?await ie().catch(()=>null):null;return r({remote:v,lockedBy:k,claims:h?S:null}),i(h),k},[e,r]),c=ne(()=>{ie().catch(()=>null).then(v=>i(k=>k!=null?k:v))},[]),l=ne(v=>{var S;let k=$e!=null?$e:{remote:Do,lockedBy:null,claims:null},{remote:I}=k;r(b(m({},k),{remote:b(m({},I),{exists:!0,payload:v,backups:[v,...I.backups.filter(h=>h.payload_hash!==v.payload_hash)].slice(0,mf),safetyCopy:((S=I.safetyCopy)==null?void 0:S.payload_hash)===v.payload_hash?null:I.safetyCopy})}))},[r]),u=ne(()=>{i(null),$e&&r(b(m({},$e),{claims:null}))},[r]);return{check:t,remote:(d=t==null?void 0:t.remote)!=null?d:Do,lockedBy:(f=t==null?void 0:t.lockedBy)!=null?f:null,claims:(p=t==null?void 0:t.claims)!=null?p:null,session:o,setSession:i,refresh:s,readSession:c,addBackup:l,forgetClaims:u}}function Fs(){let[e,t]=g(null),[n,o]=g(!1),i=ne(async()=>{try{let r=await cn();return t(r),o(!1),r}catch(r){throw o(!0),r}},[]);return{local:e,localFailed:n,refreshLocal:i}}var gf=600*1e3;function zs(){let[e,t]=g(null);return T(()=>{let n=O();if(!ko(n.version))return;let o=!0;return Qa(n.releasesUrl).then(i=>{o&&i&&wo(i,n.version)>0&&t(i)}),()=>{o=!1}},[]),e}function Ws(){let[e,t]=g(()=>Ua()),[n]=g(()=>Date.now());return T(()=>$a(t),[]),{result:e,recent:!!(e&&n-e.at<gf)}}function js(e){let t=O(),n=[["Report an issue",t.issueUrl],["GitHub",t.githubUrl],["Discord",t.discordUrl],["Support on Ko-fi",t.kofiUrl]];return y("footer",{className:"syncify-window-footer",children:[y("span",{className:"syncify-window-footer-version",children:[y("span",{children:["Syncify ",t.version]}),e.newerVersion?a(w,{variant:"text",size:"tiny",className:"syncify-window-update",onClick:()=>e.loadedByLoader?window.location.reload():Z(`${t.githubUrl}#updating`),children:a(K,{parts:[`${e.newerVersion} is out`,e.loadedByLoader?"Reload":"How to update"]})}):null]}),a("span",{className:"syncify-window-footer-links",children:n.map(([o,i])=>a(w,{variant:"subtle",size:"tiny",onClick:()=>Z(i),children:o},o))})]})}var hf={"back-up":"Back up now","try-again":"Try again","sign-in":"Sign in","how-to-update":"How to update",reload:"Reload"};function Ys(e){let{status:t,alert:n}=e,o=t.action,i=o?a(w,{variant:o==="back-up"||o==="sign-in"?"primary":"secondary",size:n?"small":"regular",onClick:()=>e.onAction(o),disabled:e.busy,children:o==="back-up"&&e.backingUp?"Backing up\u2026":hf[o]}):null;return n?y("section",{className:"syncify-status","aria-label":"Status",children:[y("div",{className:"syncify-status-alert",role:"alert",children:[a("span",{className:"syncify-status-alert-mark",children:a(be,{tone:"warning",icon:a(Ro,{})})}),y("div",{className:"syncify-status-text",children:[a("h2",{className:"syncify-status-title",children:n.title}),n.kind==="claim"&&n.text?a("p",{className:"syncify-status-sentence",children:n.text}):null]}),n.kind==="claim"?n.canAnswer?a(w,{variant:"secondary",onClick:e.onNotMe,disabled:e.answering,children:"Not me"}):null:y("span",{className:"syncify-status-answers",children:[a(w,{variant:"secondary",onClick:()=>e.onAnswerInstall("reject"),disabled:e.answering,children:"Not mine"}),a(w,{onClick:()=>e.onAnswerInstall("approve"),disabled:e.answering,children:"Approve"})]})]}),y("div",{className:"syncify-status-line","aria-live":"polite",children:[t.backedUp?a(xe,{className:"syncify-status-check"}):null,a(K,{parts:t.line}),i]})]}):a("section",{className:"syncify-status","aria-label":"Status",children:y("div",{className:"syncify-status-main","aria-live":"polite",children:[y("div",{className:"syncify-status-text",children:[a("h2",{className:"syncify-status-title",children:t.title}),t.detail.length>0?a(K,{parts:t.detail}):null,t.supportAsk?y("p",{className:"syncify-status-ask",children:[a("span",{children:t.supportAsk}),a(w,{variant:"text",onClick:e.onSupport,children:"Support it on Ko-fi"})]}):null]}),i]})})}function qs(e){let{codeCount:t,account:n,newerVersion:o}=e,i=[{id:"backups",label:"Backups"},{id:"share",label:"Share",status:t?a(Po,{count:t,label:Ue(t,"code")}):void 0},{id:"account",label:"Account",status:n?n.kind==="ok"?a("span",{className:"syncify-tab-check",role:"img","aria-label":n.label,children:a(xe,{})}):a(be,{tone:"warning",label:n.label}):void 0},{id:"settings",label:"Settings",status:o?a(be,{tone:"info",label:`Syncify ${o} is out`}):void 0}];return a(_o,{tabs:i,selected:e.selected,onSelect:e.onSelect,idBase:e.idBase,label:"Syncify"})}function Uo(e){var Wo,jo,Yo,qo,Go,Vo,Jo,Xo,Zo,Qo,ei,ti,ni;let t=j("syncify"),n=O(),[o,i]=g(()=>ge()),{local:r,localFailed:s,refreshLocal:c}=Fs(),l=Ks(o),u=Ds(),d=zs(),f=Ws(),[p]=g(()=>Za()!==null),[v,k]=g((Wo=e.tab)!=null?Wo:"backups"),[I,S]=g(()=>l.check?"idle":"checking"),[h,P]=g(null),[U,R]=g(null),[E,D]=g(!1),[x,N]=g(!1),[F,Q]=g(!1),[$,H]=g(null),[Ke,Fe]=g(()=>Ia()),[se,ct]=g(e.secure===!0),lt=W(!1),{remote:B,lockedBy:A,claims:z,session:fe}=l,ut=I!=="idle",Ln=(jo=r==null?void 0:r.hash)!=null?jo:null,tc=((Yo=B.claim)==null?void 0:Yo.status)==="pending"&&!B.claim.mine?B.claim:null,ze=ls(z,A,tc!==null),nc=!!(Ln&&B.backups.some(C=>C.payload_hash===Ln)),Ho=$s({activity:I,checked:l.check!==null,checkError:h,unsupported:E,locked:A,latest:B.payload,latestItems:B.payload?ot(B.payload).map(C=>C.key):[],backedUp:nc,localHash:Ln,localItems:(qo=r==null?void 0:r.installedItems)!=null?qo:[],localItemCount:(Go=r==null?void 0:r.installedItemCount)!=null?Go:0,localConfig:(Vo=r==null?void 0:r.spicetifyConfig)!=null?Vo:null,restoreResult:f.recent?f.result:null}),oc=Hs(B.claim,(Xo=(Jo=B.install)==null?void 0:Jo.waiting[0])!=null?Xo:null),ic=!Ke&&!A&&B.payload!==null&&v!=="account"&&(fe?ze.kind==="open":fe===null&&B.nudge),rc=(fe?(Zo=z==null?void 0:z.accounts)!=null?Zo:[]:[]).filter(C=>C.status==="final").map((C,Y)=>({hash:C.hash,label:`Spotify account ${Y+1}${C.device_info?` from ${C.device_info}`:""}`})).filter(C=>C.hash!==(z==null?void 0:z.hash));async function ce(C={}){try{(!C.silent||!l.check)&&S("checking"),C.silent||(R(null),P(null)),await c(),await l.refresh()&&k("account"),P(null),S("idle")}catch(Y){dt(Y)}}function dt(C){if(S("idle"),C instanceof St){D(!0),R(null);return}if(C instanceof Be){R({kind:"error",text:C.message}),ce({silent:!0});return}if(C instanceof re&&C.code!=="not_linked"){R(null),ce({silent:!0});return}let Y=C instanceof Error?C.message:String(C);l.check?R({kind:"error",text:Y}):P(Y),Spicetify.showNotification(Y,!0,6e3)}async function ac(){try{S("backing-up"),R(null);let{payload:C,unchanged:Y,unapproved:We}=await At(o);if(await c(),We){await ce({silent:!0}),R({kind:"warning",text:"Backed up, but kept apart until this install is approved."}),Spicetify.showNotification("Syncify: backed up, waiting for approval");return}Y||l.addBackup(C),S("idle"),Spicetify.showNotification(Y?"Syncify: everything is already backed up":"Syncify backup complete")}catch(C){dt(C)}}async function sc(C){var Y;try{S("restoring"),R(null),await ba(o,C.row.backup,(Y=C.linkedHash)!=null?Y:void 0,C.skipped),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),Lt(C.manual),setTimeout(()=>window.location.reload(),1e3)}catch(We){dt(We)}}async function cc(C){var We;let Y=(We=B.install)==null?void 0:We.waiting[0];if(Y){N(!0);try{await bn(o,Y.id,C),Spicetify.showNotification(C==="approve"?"Syncify: install approved":"Syncify: install refused"),await ce({silent:!0})}catch(yc){dt(yc)}finally{N(!1)}}}async function lc(){N(!0);try{Spicetify.showNotification(Rn(await kn(o))),await ce({silent:!0})}catch(C){R({kind:"error",text:C instanceof Error?C.message:String(C)})}finally{N(!1)}}async function $t(){Q(!0),H(null);try{await va(o)}catch(C){C instanceof _e&&["claim_pending","claimed"].includes(C.code)||H(C instanceof Error?C.message:String(C))}finally{await ce({silent:!0}),Q(!1)}}function uc(){ct(!0),fe?$t():k("account")}function dc(C){l.setSession(C),lt.current=!0,!A&&B.payload?$t():ce({silent:!0})}function Ko(){u.forget(),l.forgetClaims(),H(null),ce({silent:!0})}function fc(C){C==="back-up"?ac():C==="try-again"?ce():C==="sign-in"?k("account"):C==="how-to-update"?Z(`${n.githubUrl}#updating`):Ka()}let Fo=ke(()=>{l.readSession(),ce({silent:!0})});T(()=>Fo.current(),[Fo]);let zo=ke(()=>{!e.secure||lt.current||F||!fe||ze.kind!=="open"||A||(lt.current=!0,$t())});return T(()=>zo.current(),[zo,fe,ze.kind,A,F]),y("div",{className:"syncify-ui syncify-window",onClick:Oo,onMouseDown:Oo,onPointerDown:Oo,children:[y("div",{className:"syncify-window-top",children:[a(Ys,{status:Ho,alert:oc,backingUp:I==="backing-up",busy:ut||Ho.action==="back-up"&&A!==null,answering:x,onAction:fc,onNotMe:()=>{lc()},onAnswerInstall:C=>{cc(C)},onSupport:()=>Z(n.kofiUrl)}),U?a(Us,{message:U,busy:ut,onTryAgain:()=>{ce()},onDismiss:()=>R(null)}):null,a(qs,{idBase:t,selected:v,onSelect:k,codeCount:fe?u.codeCount:null,account:us(fe,A,ze),newerVersion:d})]}),v==="backups"?a(ws,{idBase:t,config:o,remote:l.check?B:null,failed:h!==null||s,lockedBy:A,local:r,otherAccounts:rc,notices:a(Os,{nudge:ic,securing:F,onSecure:uc,onHideNudge:()=>{Ra(),Fe(!0)},install:A||ze.kind==="secured"?null:B.install,restoreResult:f.result}),busy:ut,restoring:I==="restoring",onRestore:C=>{sc(C)},onError:dt}):v==="share"?a(Ls,{idBase:t,config:o,session:fe,localItems:(Qo=r==null?void 0:r.items)!=null?Qo:[],localConfig:(ei=r==null?void 0:r.spicetifyConfig)!=null?ei:null,localTheme:(ti=r==null?void 0:r.activeTheme)!=null?ti:null,marketplaceAvailable:(ni=r==null?void 0:r.marketplaceAvailable)!=null?ni:null,busy:ut,onSignIn:()=>k("account"),onSignedOut:Ko,onCodeCount:u.saveCodeCount,onHandle:u.saveHandle}):v==="account"?a(ps,{idBase:t,session:fe,locked:A,secure:ze,securing:F,secureError:$,onSecure:()=>{$t()},nudge:se,onSignedIn:dc,onSignedOut:Ko,handle:u.handle,onHandle:u.saveHandle}):a(Cs,{idBase:t,config:o,onConfigChange:i,busy:ut,unsupported:E}),a(js,{newerVersion:d,loadedByLoader:p})]})}function Oo(e){e.stopPropagation()}var Gs=`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="-2.5 -2.5 37 37" aria-hidden="true" focusable="false"><defs><mask id="syncify-mark-gap" maskUnits="userSpaceOnUse" x="-2" y="-2" width="36" height="36"><rect x="-2" y="-2" width="36" height="36" fill="#fff"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></mask></defs><g mask="url(#syncify-mark-gap)"><g transform="rotate(15 16 16)"><path d="M16 16L16 7.4A8.6 8.6 0 0 1 24.6 16Z" fill="#6cd1d1" transform="translate(0.42 -0.42)"/><path d="M16 16L24.6 16A8.6 8.6 0 0 1 16 24.6Z" fill="#efa4c1" transform="translate(0.42 0.42)"/><path d="M16 16L16 24.6A8.6 8.6 0 0 1 7.4 16Z" fill="#d3c48c" transform="translate(-0.42 0.42)"/><path d="M16 16L7.4 16A8.6 8.6 0 0 1 16 7.4Z" fill="#88bcf2" transform="translate(-0.42 -0.42)"/></g></g><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 28.03A12.4 12.4 0 1 1 28.03 19"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91"/></g></svg>
`;var de=null;function at(){return!!(de!=null&&de.container.isConnected)}function st(){Spicetify.PopupModal.hide()}function He(e){var n;(n=de==null?void 0:de.root)==null||n.unmount();let t=document.createElement("div");de={container:t,root:null};try{Spicetify.PopupModal.display({title:O().extensionName,content:t,isLarge:!1})}catch(o){throw oe("Failed to open PopupModal",o),o}bf(t),wf(t,e)}function bf(e){requestAnimationFrame(()=>{let t=kf(e);t==null||t.classList.add("syncify-modal-shell");let n=t==null?void 0:t.querySelector(".main-trackCreditsModal-header h1");if(n&&!n.querySelector(".syncify-modal-mark")){let i=document.createElement("span");i.className="syncify-modal-mark",i.innerHTML=Gs,n.prepend(i)}let o=t==null?void 0:t.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');o&&(o.classList.add("syncify-modal-close"),o.setAttribute("aria-label",`Close ${O().extensionName}`),o.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function kf(e){let t=e.parentElement;for(;t&&t!==document.body;){if(t.querySelector(".main-trackCreditsModal-header"))return t;t=t.parentElement}return e.closest('[class*="trackCreditsModal"]')}function wf(e,t){try{if(typeof Spicetify.ReactDOM.createRoot=="function"){let n=Spicetify.ReactDOM.createRoot(e);n.render(t),(de==null?void 0:de.container)===e&&(de.root=n),ee("Window rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(t,e),ee("Window rendered",{renderer:"render"})}catch(n){throw oe("Failed to render window",n),n}}function Bn(e){return a("div",{className:"syncify-ui syncify-launch-notice",children:y(vn,{title:e.title,actions:e.actions,children:[e.children?a("p",{children:e.children}):null,e.error?a(M,{tone:"error",children:e.error}):null]})})}function Vs(){let[e,t]=g(!1),[n,o]=g(null);async function i(r){t(!0),o(null);try{await r()}catch(s){o(s instanceof Error?s.message:String(s)),t(!1)}}return{busy:e,error:n,run:i}}function Js(e){let{title:t,text:n}=In(e.claim),o=Vs();return a(Bn,{title:t,error:o.error,actions:y(L,{children:[a(w,{variant:"secondary",onClick:e.onClose,disabled:o.busy,children:"Close"}),a(w,{onClick:()=>{o.run(async()=>{Spicetify.showNotification(Rn(await kn(ge()))),e.onClose()})},disabled:o.busy,children:"Not me"})]}),children:n})}function Xs(e){return a(Bn,{title:cs(e.claim),actions:a(w,{onClick:e.onClose,children:"Close"})})}function Zs(e){let t=Vs(),n=o=>{t.run(async()=>{await bn(ge(),e.install.id,o),Spicetify.showNotification(o==="approve"?"Syncify: install approved":"Syncify: install refused"),e.onDone()})};return a(Bn,{title:En(e.install),error:t.error,actions:y(L,{children:[a(w,{variant:"secondary",onClick:()=>n("reject"),disabled:t.busy,children:"Not mine"}),a(w,{onClick:()=>n("approve"),disabled:t.busy,children:"Approve"})]}),children:"Approve it if it's yours."})}function Qs(e){return a(Bn,{title:"Your backup isn't secured",actions:y(L,{children:[a(w,{variant:"secondary",onClick:e.onClose,children:"Not now"}),a(w,{onClick:t=>{t.stopPropagation(),e.onSecure()},children:"Secure"})]}),children:"Anyone who knows your Spotify username can restore it."})}function vf(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var ec="syncify-styles";function xf(){if(document.getElementById(ec)){ee("Another copy of Syncify is running; stopping this one");return}ai(Spicetify.React),Cf();let e=ge();ga({topbarButton:Ga($o),menuItem:Ja($o)}),gn(e.entryPoint),lo(e.shortcut,$o),Aa({onClaim:If,onUndone:Rf,onInstall:Ef,onNudge:Pf}).catch(t=>{oe("Startup sync check failed",t)}),za().catch(t=>{oe("Restore check failed",t)})}function Cf(){let e=document.createElement("style");e.id=ec,e.textContent=Li,document.head.appendChild(e)}function $o(){if(at()){st();return}He(a(Uo,{}))}function If(e){at()||(ee("Opening claim notice"),He(a(Js,{claim:e,onClose:st})))}function Rf(e){return at()?!1:(ee("Opening undone claim notice"),He(a(Xs,{claim:e,onClose:st})),!0)}function Ef(e){at()||(ee("Opening install notice"),He(a(Zs,{install:e,onDone:st})))}function Pf(){at()||(ee("Opening nudge notice"),Pa(),He(a(Qs,{onSecure:()=>He(a(Uo,{tab:"account",secure:!0})),onClose:st})))}Fa();(function e(){if(!vf()){setTimeout(e,100);return}ee("Spicetify APIs ready"),xf()})();})();
