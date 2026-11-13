// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var tc=Object.defineProperty,ic=Object.defineProperties;var oc=Object.getOwnPropertyDescriptors;var ft=Object.getOwnPropertySymbols;var bo=Object.prototype.hasOwnProperty,ko=Object.prototype.propertyIsEnumerable;var ho=(e,n,t)=>n in e?tc(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,p=(e,n)=>{for(var t in n||(n={}))bo.call(n,t)&&ho(e,t,n[t]);if(ft)for(var t of ft(n))ko.call(n,t)&&ho(e,t,n[t]);return e},w=(e,n)=>ic(e,oc(n));var le=(e,n)=>{var t={};for(var i in e)bo.call(e,i)&&n.indexOf(i)<0&&(t[i]=e[i]);if(e!=null&&ft)for(var i of ft(e))n.indexOf(i)<0&&ko.call(e,i)&&(t[i]=e[i]);return t};var _n,A,ie,M,pt,Q,ac,q,m;function wo(e){({createElement:_n,Fragment:A,useCallback:ie,useEffect:M,useLayoutEffect:pt,useMemo:Q,useReducer:ac,useRef:q,useState:m}=e)}var So=`/* Shared values for every part. Colors come from the active Spicetify theme,
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
`;var vo=`.syncify-icon {
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
`;var xo=`.syncify-btn,
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
`;var Co=`.syncify-switch-control {
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
`;var Io=`.syncify-checkbox {
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
`;var No=`.syncify-setting-row {
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
`;var Ro=`/* Facts on one line, wrapping between facts. Each fact is trimmed to its
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
`;var Eo=`.syncify-list {
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
`;var Po=`.syncify-field-group {
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
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    letter-spacing: 0.05em;
}

.syncify-field-error {
    color: var(--syncify-color-error);
    font-size: var(--syncify-text-small);
}
`;var To=`.syncify-menu {
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
`;var _o=`.syncify-meter {
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
`;var Ao=`.syncify-mark-square {
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
`;var Mo=`.syncify-notice {
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
`;var Bo=`.syncify-dialog {
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
`;var Lo=`.syncify-tabs {
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
`;var Do=`.syncify-pip-square {
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
`;var Oo=`.syncify-section-label {
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
`;var Uo=`.syncify-keycap {
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
`;var Ho=`/* A bar as tall as the capitals of the text it stands in for. */
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
`;var $o=[So,vo,xo,Co,Io,No,Ro,Eo,Po,To,_o,Ao,Mo,Bo,Lo,Do,Oo,Uo,Ho].join(`
`);var Ko=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var zo=`/* The window fits the height Spotify's popup leaves it, so the status and
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
    font-family: ui-monospace, Consolas, monospace;
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
`;var Fo=`/* The safety copy's shield, after its name. */
.syncify-safety-mark {
    color: var(--syncify-color-accent);
}

/* "Current", where an older backup has its chevron. */
.syncify-row-status {
    color: var(--syncify-color-accent);
    font-size: var(--syncify-text-small);
    font-weight: 700;
}

/* Adds, Updates and Removes: plain colored text, not chips. */
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

.syncify-restore-fold {
    color: var(--syncify-color-muted);
    font-weight: 400;
}
`;var jo=`/* The code step's Resend and Use another email. */
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
`;var Wo=`/* Turn off or Use default, then the key. */
.syncify-settings-shortcut {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    gap: var(--syncify-space-2);
}
`;var Yo=`/* A launch notice in Spotify's popup: the dialog layout, the popup's width. */
.syncify-launch-notice {
    width: 100%;
}
`;var qo=`/* Colors come from the active Spicetify theme, with Spotify's defaults as
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

.syncify-code {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 8px 10px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.35);
}

.syncify-code code {
    flex: 1 1 auto;
    min-width: 0;
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    font-size: 12px;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    user-select: all;
}

.syncify-alert .syncify-code .syncify-text-button {
    font-weight: 700;
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

.syncify-backup-text > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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

.syncify-confirm-title {
    font-weight: 700;
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

.syncify-account-email {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.syncify-external {
    flex: 0 0 auto;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
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

/* Restore preview */

.syncify-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.syncify-chip {
    padding: 2px 10px;
    border-radius: 999px;
    color: var(--syncify-muted);
    background: var(--syncify-surface-hover);
    font-size: 12px;
    font-weight: 700;
}

.syncify-chip[data-change="added"],
.syncify-mark[data-change="added"] {
    color: var(--syncify-accent);
}

.syncify-chip[data-change="removed"],
.syncify-mark[data-change="removed"] {
    color: var(--syncify-error);
}

.syncify-chip[data-change="off"] {
    color: var(--syncify-warning);
}

.syncify-changes {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.syncify-change-group {
    margin: 0 0 2px;
    color: var(--syncify-muted);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.syncify-change-list {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    list-style: none;
}

.syncify-change {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 28px;
    font-size: 13px;
}

.syncify-mark {
    flex: 0 0 auto;
    width: 16px;
    color: var(--syncify-muted);
    font-weight: 700;
    text-align: center;
}

.syncify-change-name {
    flex: 1 1 auto;
    min-width: 0;
    overflow-wrap: anywhere;
}

.syncify-change-detail {
    color: var(--syncify-muted);
}

.syncify-source {
    display: inline-flex;
    flex: 0 1 auto;
    align-items: center;
    max-width: 50%;
    overflow-wrap: anywhere;
    gap: 4px;
    color: var(--syncify-muted);
    font-size: 12px;
}

/* Turns on an item a restore leaves off by default. */
.syncify-item-switch {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 4px;
    color: var(--syncify-muted);
    font-size: 12px;
    cursor: pointer;
}

.syncify-item-switch input {
    margin: 0;
    accent-color: var(--syncify-accent);
}

.syncify-warning-icon {
    flex: 0 0 auto;
    width: 14px;
    height: 14px;
    fill: none;
    stroke: var(--syncify-warning);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.syncify-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
}

/* Share codes */

.syncify-share-code code {
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    letter-spacing: 0.05em;
}

/* The code field: as tall and round as the Preview button beside it, in the
   code font once something is typed. */
.syncify-share-input {
    height: 40px;
    padding: 0 16px;
    border-radius: 999px;
    box-shadow: inset 0 0 0 1px transparent;
    transition: box-shadow 120ms ease;
}

.syncify-share-input:not(:placeholder-shown) {
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    letter-spacing: 0.05em;
}

.syncify-share-input:hover:not(:disabled) {
    box-shadow: inset 0 0 0 1px var(--syncify-muted);
}

.syncify-share-input + .syncify-button {
    height: 40px;
}

/* Add to my setup and Replace my setup, side by side. */
.syncify-share-modes {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.syncify-share-modes .syncify-backup {
    flex: 1 1 160px;
    width: auto;
}

/* Loading a code, then sharing this setup, split by a dashed line: solid
   lines only split sections. */
.syncify-share-load {
    flex-wrap: wrap;
    gap: 8px 12px;
}

.syncify-share-load-label {
    flex: 0 0 auto;
    color: var(--syncify-text);
}

.syncify-share-title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
}

/* A first code's handle and the code's name: labels in one column, inputs
   sized for what they hold rather than the whole row. */
.syncify-share-handle-note {
    grid-column: 1 / -1;
    /* Wraps within the columns instead of widening them. */
    contain: inline-size;
    margin: 4px 0 0;
}

.syncify-share-handle-problem {
    grid-column: 2;
    color: var(--syncify-error);
}

.syncify-share-fields {
    display: grid;
    grid-template-columns: max-content minmax(0, 260px);
    justify-content: start;
    align-items: center;
    gap: 8px 12px;
}

/* A first code's handle: the @ stays put in front of what's typed. */
.syncify-handle-input {
    display: flex;
    align-items: center;
    gap: 2px;
    color: var(--syncify-muted);
}

.syncify-handle-input:has(input:focus-visible) {
    outline: 2px solid var(--syncify-text);
    outline-offset: 2px;
}

.syncify-handle-input input {
    flex: 1 1 auto;
    min-width: 0;
    padding: 0;
    border: 0;
    color: var(--syncify-text);
    background: none;
    font: inherit;
}

.syncify-panel .syncify-handle-input input:focus-visible {
    outline: 0;
}

.syncify-share-part {
    margin-top: 4px;
    padding-top: 12px;
    border-top: 1px dashed var(--syncify-divider);
}

.syncify-share-code {
    align-items: center;
}

.syncify-share-code code {
    font-size: 14px;
    font-weight: 700;
}

.syncify-text-button[data-danger="true"],
.syncify-text-button[data-danger="true"]:hover:not(:disabled) {
    color: var(--syncify-error);
}

/* Your codes, one card with a row per code. */
section[aria-label="Your codes"] {
    margin-top: 8px;
}

.syncify-share-codes {
    padding: 0 12px;
    border-radius: 8px;
    background: var(--syncify-surface);
}

.syncify-share-codes > li {
    padding: 10px 0;
}

/* Syncify picks: each item a square in its kind's color (Syncify's kind
   colors, as on the website), then the count. */
.syncify-pick-detail {
    display: flex;
    align-items: center;
    gap: 8px;
}

.syncify-pips {
    display: inline-flex;
    gap: 3px;
}

.syncify-pip {
    width: 8px;
    height: 8px;
    border-radius: 2px;
}

.syncify-pip[data-kind="extension"] {
    background: #6cd1d1;
}

.syncify-pip[data-kind="theme"] {
    background: #efa4c1;
}

.syncify-pip[data-kind="snippet"] {
    background: #d3c48c;
}

/* Your codes, with new hearts beside it when there are any. */
.syncify-codes-heading {
    display: flex;
    align-items: center;
    gap: 8px;
}

.syncify-codes-heading .syncify-tag {
    letter-spacing: normal;
    text-transform: none;
}

.syncify-tag[data-tone="new"] {
    color: var(--syncify-accent-text);
    background: var(--syncify-accent);
}

.syncify-share-codes > li + li {
    border-top: 1px dashed var(--syncify-divider);
}

/* Spotify turns text selection off; a code's name and code can be selected. */
.syncify-share-codes .syncify-setting-text {
    user-select: text;
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
}
`;var Go=[$o,Ko,zo,Fo,jo,Wo,Yo,qo].join(`
`);var ci=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var Vo=`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="-2.5 -2.5 37 37" aria-hidden="true" focusable="false"><defs><mask id="syncify-mark-gap" maskUnits="userSpaceOnUse" x="-2" y="-2" width="36" height="36"><rect x="-2" y="-2" width="36" height="36" fill="#fff"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></mask></defs><g mask="url(#syncify-mark-gap)"><g transform="rotate(15 16 16)"><path d="M16 16L16 7.4A8.6 8.6 0 0 1 24.6 16Z" fill="#6cd1d1" transform="translate(0.42 -0.42)"/><path d="M16 16L24.6 16A8.6 8.6 0 0 1 16 24.6Z" fill="#efa4c1" transform="translate(0.42 0.42)"/><path d="M16 16L16 24.6A8.6 8.6 0 0 1 7.4 16Z" fill="#d3c48c" transform="translate(-0.42 0.42)"/><path d="M16 16L7.4 16A8.6 8.6 0 0 1 16 7.4Z" fill="#88bcf2" transform="translate(-0.42 -0.42)"/></g></g><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 28.03A12.4 12.4 0 1 1 28.03 19"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91"/></g></svg>
`;var Bc="syncify",ln="state";function li(){let e;try{e=window.indexedDB}catch(n){return Promise.resolve(null)}return e?new Promise(n=>{let t;try{t=e.open(Bc,1)}catch(i){n(null);return}t.onupgradeneeded=()=>{t.result.createObjectStore(ln)},t.onerror=()=>n(null),t.onblocked=()=>n(null),t.onsuccess=()=>n(t.result)}):Promise.resolve(null)}function ui(e,n){let t=li().then(i=>new Promise((o,r)=>{if(!i){r(new Error("IndexedDB isn't available."));return}try{let s=i.transaction(ln,e),c=n(s.objectStore(ln));s.oncomplete=()=>{i.close(),o(c.result)},s.onerror=s.onabort=()=>{var l;i.close(),r((l=s.error)!=null?l:new Error("IndexedDB failed."))}}catch(s){i.close(),r(s)}}));return Promise.race([t,new Promise((i,o)=>setTimeout(()=>o(new Error("IndexedDB took too long.")),2e3))])}function un(e){return ui("readonly",n=>n.get(e))}async function yn(e,n){await ui("readwrite",t=>t.put(n,e))}async function Jo(e){await ui("readwrite",n=>n.delete(e))}var de={extensionName:"Syncify",version:"1.17.1",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",discordUrl:"https://syncify.wsoltani.com/discord",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com",shareUrl:"https://syncs.wsoltani.com"};function L(){var n,t,i,o,r,s,c,l,y,d;let e=window.SyncifyConfig;return{extensionName:(n=Ce(e==null?void 0:e.extensionName))!=null?n:de.extensionName,version:(t=Xo(e==null?void 0:e.version))!=null?t:de.version,workerUrl:(i=Ce(e==null?void 0:e.workerUrl))!=null?i:de.workerUrl,webUrl:(o=Ce(e==null?void 0:e.webUrl))!=null?o:de.webUrl,githubUrl:(r=Ce(e==null?void 0:e.githubUrl))!=null?r:de.githubUrl,kofiUrl:(s=Ce(e==null?void 0:e.kofiUrl))!=null?s:de.kofiUrl,discordUrl:(c=Ce(e==null?void 0:e.discordUrl))!=null?c:de.discordUrl,issueUrl:(l=Ce(e==null?void 0:e.issueUrl))!=null?l:de.issueUrl,releasesUrl:(y=Ce(e==null?void 0:e.releasesUrl))!=null?y:de.releasesUrl,shareUrl:(d=Ce(e==null?void 0:e.shareUrl))!=null?d:de.shareUrl}}function Ce(e){return Xo(e)}function Xo(e){return typeof e=="string"&&e.trim()?e.trim():null}var Lc="x-syncify-version",Dc="x-syncify-install",Oc="x-syncify-timezone",Zo="install-id",Qo="syncify:install-id",Uc=2e3,mt=null;async function ea(){let e={[Lc]:L().version,[Dc]:(await yi()).id},n=Kc();return n&&(e[Oc]=n),e}function yi(){return mt!=null||(mt=Hc().catch(()=>({id:gt(),inDatabase:!1}))),mt}async function Hc(){let e=await Promise.race([$c(),new Promise(n=>setTimeout(()=>n(null),Uc))]);if(e)return{id:e,inDatabase:!0};try{let n=window.localStorage.getItem(Qo);if(n&&na(n))return{id:n,inDatabase:!1};let t=gt();return window.localStorage.setItem(Qo,t),{id:t,inDatabase:!1}}catch(n){return{id:gt(),inDatabase:!1}}}async function $c(){let e=await li();return e?new Promise(n=>{let t=null;try{let i=e.transaction(ln,"readwrite"),o=i.objectStore(ln),r=o.get(Zo);r.onsuccess=()=>{if(typeof r.result=="string"&&na(r.result)){t=r.result;return}t=gt(),o.put(t,Zo)},i.oncomplete=()=>{e.close(),n(t)},i.onerror=i.onabort=()=>{e.close(),n(null)}}catch(i){e.close(),n(null)}}):null}function gt(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let n=[...e].map(t=>t.toString(16).padStart(2,"0"));return[n.slice(0,4).join(""),n.slice(4,6).join(""),n.slice(6,8).join(""),n.slice(8,10).join(""),n.slice(10).join("")].join("-")}function na(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(e)}function Kc(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(e){return null}}var zc="syncify-signature-v1",Fc={name:"ECDSA",hash:"SHA-256"};function ht(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function bt(e){return di(new Uint8Array(await crypto.subtle.exportKey("raw",e)))}async function An(e,n,t,i,o){let r=await jc(n,t,i,o),s=await crypto.subtle.sign(Fc,e,r);return di(new Uint8Array(s))}async function jc(e,n,t,i){let{pathname:o,search:r}=new URL(t),s=new TextEncoder,c=di(new Uint8Array(await crypto.subtle.digest("SHA-256",s.encode(i))));return s.encode([zc,e,n.toUpperCase(),o+r,c].join(`
`))}function di(e){let n="";for(let t=0;t<e.length;t++)n+=String.fromCharCode(e[t]);return btoa(n).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var ta="device-key",fi="session",ia="salt",Ge=null,Mn,oa={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function dn(e){if(Ge)return Ge;let n=await un(ta);return Wc(n)?(Ge=Promise.resolve(n),n):e?(Ge=ht().then(async t=>(await yn(ta,t),t)),Ge.catch(()=>{Ge=null}),Ge):null}async function re(){let e=await un(fi);return Yc(e)?e:null}function pi(e){return yn(fi,e)}async function Ve(){await Jo(fi).catch(()=>{})}async function kt(){if(Mn===void 0){let e=await un(ia).catch(()=>{});Mn=typeof e=="string"?e:null}return Mn}async function wt(e){e!==Mn&&(Mn=e,await yn(ia,e).catch(()=>{}))}function St(){return oa}function aa(e){oa=e}function Wc(e){let n=e;return!!(n&&n.privateKey instanceof CryptoKey&&n.publicKey instanceof CryptoKey)}function Yc(e){let n=e;return!!(n&&typeof n.token=="string"&&n.token&&typeof n.email=="string")}var ra="install-key",fn=null;function sa(){return fn!=null||(fn=qc()),fn.catch(()=>{fn=null}),fn.catch(()=>null)}async function qc(){if(!(await yi()).inDatabase)return null;let e=await un(ra),n=Vc(e)?e:await Gc();return{privateKey:n.privateKey,publicKey:await bt(n.publicKey)}}async function Gc(){let e=await ht();return await yn(ra,e),e}function Vc(e){let n=e;return!!(n&&n.privateKey instanceof CryptoKey&&n.publicKey instanceof CryptoKey)}var Jc="/api/auth/email-otp/send-verification-otp",Xc="/api/auth/sign-in/email-otp",Zc="/api/auth/get-session",Qc="/api/auth/sign-out",el="/api/auth/link",nl="x-syncify-device-key",tl="x-syncify-signature",ca="x-syncify-salt",il="none",ol={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again.",link_failed:"Couldn't open the website. Try again."},T=class extends Error{constructor(t,i=null,o=null){var r;super((r=ol[t])!=null?r:"Sign-in failed. Try again.");this.code=t;this.retryAfter=i;this.share=o;this.name="AccountError"}};function Ee(e){return e instanceof T?e.message:"Sign-in failed. Try again."}async function la(e,n={}){let t=await Ln(Jc,{method:"POST",body:JSON.stringify(p({email:e,type:"sign-in"},n.nudge?{nudge:!0}:{}))});return typeof(t==null?void 0:t.resend_in)=="number"?t.resend_in:60}async function ua(e,n){var r;let t=await dn(!0).catch(()=>{throw new T("no_device_key")}),i=await Ln(Xc,{method:"POST",body:JSON.stringify({email:e,otp:n}),keys:t,sendPublicKey:!0});if(typeof(i==null?void 0:i.token)!="string"||!i.token)throw new T("sign_in_failed");let o={token:i.token,email:typeof((r=i.user)==null?void 0:r.email)=="string"?i.user.email:e};return await pi(o).catch(()=>{throw new T("no_device_key")}),mi=!0,o}var mi=!1;async function ya(){var n;let e=await re();if(!e||mi)return e;try{let t=await vt(e,Zc,"GET");mi=!0;let i=(n=t==null?void 0:t.user)==null?void 0:n.email;if(typeof i!="string"||i===e.email)return e;let o=w(p({},e),{email:i});return await pi(o).catch(()=>{}),o}catch(t){if(t instanceof T&&t.code==="signed_out")return null;throw t}}async function da(){let e=await re().catch(()=>null);e&&await vt(e,Qc,"POST").catch(()=>{}),await Ve()}async function fa(){let e=await re();if(!e)throw new T("signed_out");let n=await vt(e,el,"POST"),t=typeof(n==null?void 0:n.url)=="string"?n.url:"",i=new URL(L().webUrl).origin;if(!t.startsWith(`${i}/link#`))throw new T("link_failed");return t}async function Bn(e,n,t){let i=await re();if(!i)throw new T("signed_out");return vt(i,e,n,t)}async function pa(e,n,t){let i=await re().catch(()=>null),o=i?await dn(!1).catch(()=>null):null;await Ln(e,p({method:"POST",body:JSON.stringify(n),headers:t,keepalive:!0},i&&o?{token:i.token,keys:o}:{}))}async function vt(e,n,t,i){let o=await dn(!1);if(!o)throw await Ve(),new T("signed_out");return Ln(n,p({method:t,token:e.token,keys:o},i===void 0?{}:{body:JSON.stringify(i)}))}async function Ln(e,n,t=!1){var g,h,x;let i=`${L().webUrl.replace(/\/+$/,"")}${e}`,o=p({},n.headers);if(n.body!==void 0&&(o["content-type"]="application/json"),n.token&&(o.authorization=`Bearer ${n.token}`),n.keys){let v=(g=await kt())!=null?g:il;o[ca]=v,o[tl]=await An(n.keys.privateKey,v,n.method,i,(h=n.body)!=null?h:""),n.sendPublicKey&&(o[nl]=await bt(n.keys.publicKey))}let r;try{r=await fetch(i,{method:n.method,headers:o,body:n.body,keepalive:n.keepalive})}catch(v){throw new T("offline")}let s=r.headers.get(ca);s&&await wt(s);let c=await r.json().catch(()=>null);if(r.ok)return c;let l=typeof(c==null?void 0:c.code)=="string"?c.code:r.status===503?"unavailable":"failed";if(l==="stale_salt"&&n.keys&&!t)return Ln(e,n,!0);l==="signed_out"&&await Ve();let y=Number(r.headers.get("retry-after")),d=c==null?void 0:c.share;throw new T(l,Number.isFinite(y)&&y>0?y:(x=al[l])!=null?x:null,typeof(d==null?void 0:d.code)=="string"?{code:d.code,link:typeof d.link=="string"?d.link:null}:null)}var al={resend_wait:60,too_many_requests:60,send_failed:60};var rl="x-syncify-user-hash",sl="x-syncify-identity",cl="x-syncify-signature",ll="x-syncify-install-key",ul="x-syncify-install-signature",gi="x-syncify-salt",yl="none",dl="/restores",fl="/installs",pl="hash",ma=3,Dn=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}},se=class extends Error{constructor(t){super(t==="not_linked"?"Couldn't read that Spotify account's backups.":"Sign in to restore this backup.");this.code=t;this.name="LockedError"}},Je=class extends Error{constructor(){super("This Spotify account doesn't accept backups from this install. Sign in to back up."),this.name="InstallRefusedError"}};async function ha(e,n,t){var r;let i=await Pe(e,n,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(t)});if(i.status===403&&((r=await i.json().catch(()=>null))==null?void 0:r.code)==="install_refused")throw new Je;if(!i.ok)throw new Error(`Backup failed with HTTP ${i.status}.`);let o=await i.json().catch(()=>null);return{unchanged:(o==null?void 0:o.unchanged)===!0,unapproved:(o==null?void 0:o.quarantined)===!0}}async function ba(e,n,t,i){let o=await Pe(e,n,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({install:t,action:i})},fl);if(o.ok)return;let r=await o.json().catch(()=>null);if((r==null?void 0:r.code)!=="not_pending")throw new Error(`Couldn't answer with HTTP ${o.status}.`)}async function hi(e,n,t){var x,v,P,b;let i=await Pe(e,n,{method:"GET"},wa("/",t));if(i.status===404){let k=await i.json().catch(()=>null);return{exists:!1,payload:null,backups:[],safetyCopy:null,claim:On(k==null?void 0:k.claim),unapproved:[],install:ga(k==null?void 0:k.install),nudge:!1}}if(!i.ok)throw new Error(`Restore failed with HTTP ${i.status}.`);let o=await i.json(),r=On(o.claim),s=ga(o.install),c=o.nudge===!0;delete o.claim,delete o.install,delete o.nudge;let l=[o,...(x=o.backup_history)!=null?x:[]];if(!l.every(k=>k.backup))return{exists:!0,payload:o,backups:l.slice(0,ma),safetyCopy:(v=l[ma])!=null?v:null,claim:r,unapproved:[],install:s,nudge:c};let y=l.filter(k=>{var I;return((I=k.backup)==null?void 0:I.kind)==="rolling"}),d=(P=l.find(k=>{var I;return((I=k.backup)==null?void 0:I.kind)==="anchor"}))!=null?P:null,g=l.filter(k=>{var I;return((I=k.backup)==null?void 0:I.kind)==="quarantined"}),h=(b=y[0])!=null?b:d;return h?y.length===0&&d?{exists:!0,payload:h,backups:[d],safetyCopy:null,claim:r,unapproved:g,install:s,nudge:c}:{exists:!0,payload:h,backups:y,safetyCopy:d,claim:r,unapproved:g,install:s,nudge:c}:{exists:!1,payload:null,backups:[],safetyCopy:null,claim:r,unapproved:g,install:s,nudge:c}}async function ka(e,n,t,i){try{await Pe(e,n,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:t}),keepalive:!0},wa(dl,i))}catch(o){}}async function Pe(e,n,t,i="",o=!1){var P,b,k,I,O;let r=i?`${e.replace(/\/+$/,"")}${i}`:e,s=(P=t.method)!=null?P:"GET",c=await re().catch(()=>null),l=c?await dn(!1).catch(()=>null):null,y=await sa(),d={},g=(b=await kt())!=null?b:yl;c&&l&&(d.authorization=`Bearer ${c.token}`,d[gi]=g,d[cl]=await An(l.privateKey,g,s,r,(k=t.body)!=null?k:"")),y&&(d[gi]=g,d[ll]=y.publicKey,d[ul]=await An(y.privateKey,g,s,r,(I=t.body)!=null?I:""));let h=await fetch(r,w(p({},t),{headers:p(w(p(p({},t.headers),await ea()),{[rl]:n.hash,[sl]:n.field}),d)})),x=h.headers.get(gi);if(x&&await wt(x),h.status===426)throw new Dn;if(h.status!==401)return h;let v=(O=await h.clone().json().catch(()=>null))==null?void 0:O.code;if(!o){if(v==="stale_salt"&&(c||y))return Pe(e,n,t,i,!0);if(v==="signed_out"&&c)return await Ve(),Pe(e,n,t,i,!0)}throw v==="claimed"||v==="not_owner"||v==="not_linked"?new se(v):(v==="signed_out"&&await Ve(),new T(typeof v=="string"?v:"failed"))}function wa(e,n){return n?`${e}?${pl}=${encodeURIComponent(n)}`:e}function ga(e){let n=e;if(!n||typeof n.trust!="string")return null;let t=Array.isArray(n.waiting)?n.waiting:[];return{trusted:n.trust!=="pending"&&n.trust!=="rejected",refused:n.trust==="rejected",waiting:t.flatMap(i=>{let o=i;return o&&typeof o.id=="string"&&typeof o.first_seen_at=="number"?[{id:o.id,device:typeof o.device=="string"?o.device:null,first_seen_at:o.first_seen_at}]:[]})}}function On(e){let n=e;return!n||typeof n.mine!="boolean"?null:n.status==="final"?{status:"final",mine:n.mine}:n.status==="undone"?typeof n.undone_at=="number"?{status:"undone",mine:!1,email:typeof n.email=="string"?n.email:null,undone_at:n.undone_at}:null:n.status!=="pending"||typeof n.final_at!="number"?null:p({status:"pending",mine:n.mine,email:typeof n.email=="string"?n.email:null,final_at:n.final_at,held:n.held===!0},n.not_me===!0?{not_me:!0}:{})}async function xt(e){let n=new TextEncoder().encode(e),t=await crypto.subtle.digest("SHA-256",n);return[...new Uint8Array(t)].map(i=>i.toString(16).padStart(2,"0")).join("")}function Un(e){return JSON.stringify(bi(e))}function bi(e){return Array.isArray(e)?e.map(bi):e&&typeof e=="object"?Object.keys(e).sort().reduce((n,t)=>(n[t]=bi(e[t]),n),{}):e}function Sa(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var ml=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,gl=100,hl="marketplace:installed-extensions",bl="marketplace:installed-themes",kl="marketplace:theme-installed",wl="marketplace:installed:",Sl="marketplace";function wi(e){return Spicetify.Config?Si(Spicetify.Config,e):null}function Si(e,n){var r;let t=Te(e),i=new Set(vl(n)),o=((r=n[kl])==null?void 0:r.includes(wl))===!0;return{current_theme:o?Sl:t.current_theme,color_scheme:o?"":t.color_scheme,extensions:t.extensions.filter(s=>!i.has(s)),custom_apps:t.custom_apps}}function Te(e){let n=e&&typeof e=="object"?e:{};return{current_theme:ki(n.current_theme)?n.current_theme:"",color_scheme:ki(n.color_scheme)?n.color_scheme:"",extensions:va(n.extensions),custom_apps:va(n.custom_apps)}}function Ia(e,n){return Un(Te(e))===Un(Te(n))}function va(e){return Array.isArray(e)?[...new Set(e.filter(ki))].sort().slice(0,gl):[]}function ki(e){return typeof e=="string"&&ml.test(e)}function vl(e){let n=xa(e[hl]).map(i=>{var r;let o=(r=Ca(e[i]))==null?void 0:r.manifest;return o&&typeof o=="object"?o.main:void 0}),t=xa(e[bl]).flatMap(i=>{var r;let o=(r=Ca(e[i]))==null?void 0:r.include;return Array.isArray(o)?o:[]});return[...n,...t].flatMap(i=>{let o=typeof i=="string"?i.split("/").pop():void 0;return o?[o]:[]})}function xa(e){try{let n=e?JSON.parse(e):[];return Array.isArray(n)?n.filter(t=>typeof t=="string"):[]}catch(n){return[]}}function Ca(e){try{let n=e?JSON.parse(e):null;return n&&typeof n=="object"&&!Array.isArray(n)?n:null}catch(n){return null}}var xl=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],Cl="marketplace:installed:",Na=`${Cl}snippet:`,Il="wsoltani/syncify",Nl="marketplace",Ra={added:0,removed:1,unchanged:2};function ee(e){let n=new Map;for(let[t,i]of xl)for(let o of Tl(e[t]))n.has(o)||n.set(o,El(o,i,e[o]));return[...n.values()]}function Nt(e,n,t,i){let o=new Set(e.map(l=>l.key)),r=new Map(t.map(l=>[l.key,l])),s=[...e.map(l=>{let y=r.get(l.key);return w(p({},l),{change:y?"unchanged":"added",isNew:!y||y.sources.join(" ")!==l.sources.join(" ")})}),...t.filter(l=>!o.has(l.key)).map(l=>w(p({},l),{change:Hn(l,e)?"unchanged":"removed",isNew:!1}))].sort((l,y)=>Ra[l.change]-Ra[y.change]||l.name.localeCompare(y.name)),c={added:0,removed:0,unchanged:0};for(let l of s)c[l.change]+=1;return{items:s,counts:c,manual:Rl(n,i)}}function Hn(e,n){return e.type==="extension"&&It(e)&&!n.some(It)}function It(e){var n;return((n=e.repo)==null?void 0:n.toLowerCase())===Il}function Rl(e,n){if(!e)return[];let t=Te(e),i=Te(n),o=[...t.extensions.filter(s=>!i.extensions.includes(s)).map(s=>({type:"extension",name:s})),...t.custom_apps.filter(s=>!i.custom_apps.includes(s)).map(s=>({type:"custom_app",name:s}))],r=t.current_theme;return r&&r!==Nl&&(r!==i.current_theme||t.color_scheme!==i.color_scheme)&&o.push(p({type:"theme",name:r},t.color_scheme?{scheme:t.color_scheme}:{})),o}function El(e,n,t){var l,y;let i=Ea(t),o=Ea(i==null?void 0:i.manifest),r=Ct(i==null?void 0:i.user),s=Ct(i==null?void 0:i.repo),c=(y=(l=Ct(i==null?void 0:i.title))!=null?l:Ct(o==null?void 0:o.name))!=null?y:e.startsWith(Na)?e.slice(Na.length):e.split("/").pop()||e;return{key:e,type:n,name:c,repo:n!=="snippet"&&r&&s?`${r}/${s}`:null,sources:Pl(n,i),custom:n==="snippet"&&(i==null?void 0:i.custom)===!0}}function Pl(e,n){return n?(e==="extension"?[n.extensionURL]:e==="theme"?[n.cssURL,n.schemesURL,...Array.isArray(n.include)?n.include:[]]:[]).filter(i=>typeof i=="string"&&i!==""):[]}function Ct(e){return typeof e=="string"&&e.trim()?e.trim():null}function Tl(e){try{let n=e?JSON.parse(e):[];return Array.isArray(n)?n.filter(t=>typeof t=="string"):[]}catch(n){return[]}}function Ea(e){let n=e;if(typeof e=="string")try{n=JSON.parse(e)}catch(t){return null}return n&&typeof n=="object"&&!Array.isArray(n)?n:null}var Rt="spicetify-marketplace";var $n="settings";async function Pa(){let e=await Aa();if(e.kind!=="ok")return null;try{let n=await Ma(e.db,"readonly",i=>i.getAll());if(!n)return null;let t={};for(let i of n)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(t[i.key]=i.value);return t}finally{e.db.close()}}async function Ta(e,n=[]){let t=await Aa();if(t.kind==="unavailable")return"unavailable";let i=t.kind==="ok"?t.db:await _l();if(!i)return"failed";try{return await Ma(i,"readwrite",r=>{let s;for(let[c,l]of Object.entries(e))s=r.put({key:c,value:l});for(let c of n)s=r.delete(c);return s})===null?"failed":"written"}finally{i.close()}}function _a(){var e;try{return(e=window.indexedDB)!=null?e:null}catch(n){return null}}async function Aa(){let e=_a();return e?await Al(e)?{kind:"missing"}:new Promise(n=>{let t=!1,i=e.open(Rt);i.onupgradeneeded=()=>{t=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),n({kind:"unavailable"})},i.onblocked=()=>n({kind:"unavailable"}),i.onsuccess=()=>{let o=i.result;if(t){o.close(),Ml(e).then(()=>n({kind:"missing"}));return}if(!o.objectStoreNames.contains($n)){o.close(),n({kind:"unavailable"});return}n({kind:"ok",db:o})}}):{kind:"unavailable"}}function _l(){let e=_a();return e?new Promise(n=>{let t=e.open(Rt,1);t.onupgradeneeded=()=>{let i=t.result;i.objectStoreNames.contains($n)||i.createObjectStore($n,{keyPath:"key"})},t.onerror=()=>{console.warn("Syncify could not create Marketplace storage",t.error),n(null)},t.onblocked=()=>n(null),t.onsuccess=()=>n(t.result)}):Promise.resolve(null)}async function Al(e){if(typeof e.databases!="function")return!1;try{return!(await e.databases()).some(t=>t.name===Rt)}catch(n){return!1}}function Ml(e){return new Promise(n=>{let t=e.deleteDatabase(Rt);t.onsuccess=()=>n(),t.onerror=()=>n(),t.onblocked=()=>n()})}function Ma(e,n,t){return new Promise(i=>{let o;try{o=e.transaction($n,n)}catch(y){console.warn("Syncify could not open a Marketplace transaction",y),i(null);return}let r,s=!1,c=y=>{s||(s=!0,i(y))};o.oncomplete=()=>c(r),o.onerror=()=>{console.warn("Syncify Marketplace transaction failed",o.error),c(null)},o.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",o.error),c(null)};let l;try{l=t(o.objectStore($n))}catch(y){console.warn("Syncify Marketplace request could not be issued",y),c(null);return}l&&(l.onsuccess=()=>{r=l.result},l.onerror=()=>{console.warn("Syncify Marketplace request failed",l.error),c(null)})})}var vi="marketplace:",Pt=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function ue(){let e=zl(),n=await Pa();if(n)for(let[t,i]of Object.entries(n))t.startsWith(vi)&&(e[t]=i);return e}var Ll=new Set(["marketplace:active-tab","marketplace:sort"]),xi="marketplace:installed:",Et="marketplace:theme-installed",Dl=["stars","tags","lastUpdated","created"];async function Tt(e,n){let t={};for(let[i,o]of Object.entries(e))Ll.has(i)||(t[i]=i.startsWith(xi)?Ol(o):o);return n&&(t.spicetify_config=Te(n)),xt(Un(t))}function Ol(e){try{let n=JSON.parse(e);if(!n||typeof n!="object"||Array.isArray(n))return e;for(let t of Dl)delete n[t];return n}catch(n){return e}}async function _t(){let e=await ue(),n=wi(e);return{keyCount:Object.keys(e).length,hash:await Tt(e,n),installedItemCount:$l(e),installedItems:At(e),items:ee(e),spicetifyConfig:n,marketplaceAvailable:Kl(e),activeTheme:Kn(e[Et])}}function Kn(e){if(!e)return null;if(e.startsWith(xi))return e;try{let n=JSON.parse(e);return typeof n=="string"?n:null}catch(n){return null}}async function Ba(){let e=await ue(),n=wi(e);return p({schema_version:2,metadata:{last_sync_datetime:new Date().toISOString(),device_info:Sa(),marketplace_key_count:Object.keys(e).length},payload_hash:await Tt(e,n),marketplace_data:{keys:e}},n?{spicetify_config:n}:{})}async function La(e,n=[]){var r,s;let t={},i=(s=(r=e.marketplace_data)==null?void 0:r.keys)!=null?s:{};for(let[c,l]of Object.entries(i))c.startsWith(vi)&&(t[c]=l);if(Object.keys(t).length===0)return 0;await Ul(t),n.length>0&&await Hl(t,n);let o=Ii(await ue(),t);return await Ci(t,o),Object.keys(t).length}async function Ci(e,n=[]){for(let[i,o]of Object.entries(e))window.localStorage.setItem(i,o);for(let i of n)window.localStorage.removeItem(i);if(await Ta(e,n)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try again.")}function Ii(e,n){let t=new Set(Pt.flatMap(s=>{var c;return Mt((c=n[s])!=null?c:e[s]).map(String)})),i=At(e).filter(s=>s.startsWith(xi)&&!t.has(s)),o=i.filter(s=>e[s]!==void 0&&n[s]===void 0),r=e[Et];return r&&n[Et]===void 0&&i.some(s=>r.includes(s))&&o.push(Et),o}async function Ul(e){let n=await ue(),t=ee(e),i=ee(n).filter(s=>Hn(s,t));if(i.length===0)return;let o="marketplace:installed-extensions",r=Mt(e[o]).map(String);for(let s of i)r.includes(s.key)||r.push(s.key),e[s.key]=n[s.key];e[o]=JSON.stringify(r)}async function Hl(e,n){let t=await ue(),i=At(t);for(let o of Pt){if(e[o]===void 0)continue;let r=Mt(e[o]).map(String).filter(s=>!n.includes(s)||i.includes(s));e[o]=JSON.stringify(r)}for(let o of n)t[o]!==void 0?e[o]=t[o]:delete e[o]}function $l(e){return At(e).length}function At(e){return Pt.flatMap(n=>Mt(e[n]).map(String))}function Kl(e){return!!(window.Marketplace||Pt.some(t=>e[t]!==void 0)||e["marketplace:tabs"]!==void 0)}function Da(e,n){return n===0?!1:e===0?!0:e<Math.max(2,Math.floor(n*.5))}function zl(){let e={};for(let n=0;n<window.localStorage.length;n+=1){let t=window.localStorage.key(n);if(!(t!=null&&t.startsWith(vi)))continue;let i=window.localStorage.getItem(t);i!==null&&(e[t]=i)}return e}function Mt(e){if(!e)return[];try{let n=JSON.parse(e);return Array.isArray(n)?n:[]}catch(n){return[]}}var Fl="raw.githubusercontent.com",jl="cdn.jsdelivr.net",Oa=".github.io";function Ri(e){var t;if(e.protocol!=="https:")return null;let n=e.pathname.split("/").filter(Boolean);if(e.host===Fl)return Ni(n[0],n[1]);if(e.host===jl)return n[0]==="gh"?Ni(n[1],(t=n[2])==null?void 0:t.split("@")[0]):null;if(e.host.endsWith(Oa)){let i=e.host.slice(0,-Oa.length);return i.includes(".")?null:Ni(i,n.length>1?n[0]:e.host)}return null}function Ni(e,n){return e&&n?`${e}/${n}`:null}var Wl={extension:"spicetify-extensions",theme:"spicetify-themes"},Yl="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",ql="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",Gl="https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/",Vl="https://api.github.com/repos",Jl=5e3,Xl=20,Ua="syncify:repo-topics",Ha=10080*60*1e3,Zl=200;function fe(e){return(e==null?void 0:e.kind)==="host"||(e==null?void 0:e.kind)==="repo"||(e==null?void 0:e.kind)==="blocked"||(e==null?void 0:e.kind)==="catalog"}function pn(e){let n=new Map;for(let t of e){if(t.change==="removed")continue;if(t.custom){n.set(t.key,{kind:"custom"});continue}let i=Ql(t);i&&n.set(t.key,i)}return n}async function mn(e,n){let t=new Map,i=e.filter(s=>s.change!=="removed"&&s.isNew&&!n.has(s.key));if(i.length===0)return t;let o=i.filter(s=>s.type==="snippet"),r=i.filter(s=>s.type!=="snippet");if(o.length>0){let s=await Ei();for(let c of o)s?Bt(s,c.name)||t.set(c.key,{kind:"catalog"}):t.set(c.key,{kind:"unchecked"})}if(r.length>0){let s=await tu(),c=au(),l=0;await Promise.all(r.map(async y=>{let d=eu(y),g=Wl[y.type];if(!d||!g)return;if(s===null){t.set(y.key,{kind:"unchecked"});return}if(nu(d,s)){t.set(y.key,{kind:"blocked"});return}let h=ou(c,d);h===void 0&&l<Xl&&(l+=1,h=await iu(d),h!==void 0&&(c[d.toLowerCase()]={topics:h,at:Date.now()})),h===void 0?t.set(y.key,{kind:"unchecked"}):(h===null||!h.includes(g))&&t.set(y.key,{kind:"catalog"})})),ru(c)}return t}function Ql(e){let n=null;for(let t of e.sources){let i;try{i=new URL(t)}catch(r){return{kind:"host",host:t.slice(0,40)}}let o=Ri(i);if(!o)return{kind:"host",host:i.host};e.repo&&o.toLowerCase()!==e.repo.toLowerCase()&&(n!=null||(n=o))}return n?{kind:"repo",repo:n}:null}function eu(e){for(let n of e.sources)try{let t=Ri(new URL(n));if(t)return t}catch(t){}return e.repo}function nu(e,n){let t=`https://github.com/${e}`.toLowerCase();return n.some(i=>{let o=i.toLowerCase();if(!o.includes("*"))return o===t;let r=o.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${r}$`).test(t)})}function $a(e){return e.replace(/\n/g,"").trim().toLowerCase()}function Bt(e,n){return e.get($a(n))}var zn=null,Fn=null;function tu(){return zn!=null||(zn=Ka(Yl).then(e=>{let n=e==null?void 0:e.repos;return Array.isArray(n)?n.filter(t=>typeof t=="string"&&!t.startsWith("//")):(zn=null,null)})),zn}function Ei(){return Fn!=null||(Fn=Ka(ql).then(e=>{if(!Array.isArray(e))return Fn=null,null;let n=new Map;for(let t of e){if(typeof(t==null?void 0:t.title)!="string"||typeof t.code!="string")continue;let i=typeof t.preview=="string"?t.preview:null;n.set($a(t.title),p({title:t.title,code:t.code,description:typeof t.description=="string"?t.description:""},i?{imageURL:i.startsWith("http")?i:`${Gl}${i}`}:{}))}return n})),Fn}async function iu(e){let n=await za(`${Vl}/${e}`);if((n==null?void 0:n.status)===404)return null;if(!(n!=null&&n.ok))return;let t=await n.json().catch(()=>null);return Array.isArray(t==null?void 0:t.topics)?t.topics.filter(i=>typeof i=="string"):void 0}async function Ka(e){let n=await za(e);return n!=null&&n.ok?n.json().catch(()=>null):null}async function za(e){let n=typeof AbortController=="function"?new AbortController:null,t=setTimeout(()=>n==null?void 0:n.abort(),Jl);try{return await fetch(e,{signal:n==null?void 0:n.signal})}catch(i){return null}finally{clearTimeout(t)}}function ou(e,n){let t=e[n.toLowerCase()];return t&&Date.now()-t.at<Ha?t.topics:void 0}function au(){var e;try{let n=JSON.parse((e=localStorage.getItem(Ua))!=null?e:"{}");return n&&typeof n=="object"?n:{}}catch(n){return{}}}function ru(e){let n=Date.now(),t=Object.entries(e).filter(([,i])=>n-i.at<Ha).sort(([,i],[,o])=>o.at-i.at).slice(0,Zl);try{localStorage.setItem(Ua,JSON.stringify(Object.fromEntries(t)))}catch(i){}}var su=/^[0-9A-HJKMNP-TV-Z]{6}$/,cu=6,lu="SYN-",Ya=60,Pi=20,qa=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],uu="marketplace:installed:",rp=`${uu}snippet:`,Xe="marketplace:theme-installed",Fa="marketplace",ja={added:0,removed:1,unchanged:2},yu=new RegExp(`^[a-z0-9][a-z0-9_-]{1,${Pi-2}}[a-z0-9]$`);function Ga(e){let n=e.trim().replace(/^@/,"").toLowerCase();return/[^a-z0-9_-]/.test(n)?"Only letters, digits, _ and -":n.length<3?"At least 3 characters":!/^[a-z0-9]/.test(n)||!/[a-z0-9]$/.test(n)?"Start and end with a letter or digit":null}function pe(e){return`${lu}${e}`}function Va(e){let n=e.trim();if(n.length>200)return null;if(n.includes("/")){let i=n.split(/[?#]/)[0].replace(/\/+$/,"");n=i.slice(i.lastIndexOf("/")+1).replace(/\.json$/i,"")}n=n.toUpperCase().replace(/[\s-]/g,""),n.length===cu+3&&n.startsWith("SYN")&&(n=n.slice(3));let t=n.replace(/O/g,"0").replace(/[IL]/g,"1");return su.test(t)?t:null}function Ja(e){let n=e;return!n||typeof n.code!="string"||!n.keys||typeof n.keys!="object"||!Object.values(n.keys).every(t=>typeof t=="string")?null:{code:n.code,name:typeof n.name=="string"&&n.name?n.name:null,creator:typeof n.creator=="string"&&yu.test(n.creator)?n.creator:null,updated_at:typeof n.updated_at=="number"?n.updated_at:0,keys:n.keys}}async function Xa(e,n){let t=e.filter(s=>!It(s)).map(s=>w(p({},s),{change:"added",isNew:!0})),i=pn(t);for(let s of t)!i.has(s.key)&&!du(s,n[s.key])&&i.set(s.key,{kind:"catalog"});let o=await mn(t,i),r=new Map;for(let[s,c]of[...o,...i])c.kind!=="unchecked"&&r.set(s,c);return{items:t,leftOut:r}}function du(e,n){if(e.type==="snippet")return!0;if(!e.repo)return!1;let t=mu(n);return e.type==="extension"?typeof(t==null?void 0:t.extensionURL)=="string"&&t.extensionURL!=="":typeof(t==null?void 0:t.cssURL)=="string"&&t.cssURL!==""}function Za(e,n){let t={};for(let[o,r]of qa){let s=n.filter(c=>c.type===r&&e[c.key]!==void 0).map(c=>c.key);t[o]=JSON.stringify(s);for(let c of s)t[c]=e[c]}let i=Kn(e[Xe]);return i&&n.some(o=>o.key===i)&&(t[Xe]=e[Xe]),t}function Qa(e,n,t,i,o,r){let s=r==="replace"?Nt(n,void 0,t,i):fu(n,t),c=Kn(e.keys[Xe]),l=c!==null&&n.some(d=>d.key===c)&&i!==null&&i.current_theme!==Fa,y=c!==null&&c!==o?n.find(d=>d.key===c):void 0;return p(w(p({},s),{manual:l?[{type:"theme",name:Fa}]:[]}),y?{theme:{key:y.key,name:y.name}}:{})}function fu(e,n){let t=new Set(n.map(s=>s.key)),i=new Set(e.map(s=>s.key)),o=[...e.map(s=>t.has(s.key)?w(p({},s),{change:"unchanged",isNew:!1}):w(p({},s),{change:"added",isNew:!0})),...n.filter(s=>!i.has(s.key)).map(s=>w(p({},s),{change:"unchanged",isNew:!1}))].sort((s,c)=>ja[s.change]-ja[c.change]||s.name.localeCompare(c.name)),r={added:0,removed:0,unchanged:0};for(let s of o)r[s.change]+=1;return{items:o,counts:r,manual:[]}}function er(e,n){return new Set(e.items.filter(t=>t.type==="snippet"&&t.change==="added"&&(!n||!Bt(n,t.name))).map(t=>t.key))}async function nr(e,n,t,i){let o=await ue(),r=ee(o),s=ee(e.keys),c={};for(let[g,h]of qa){let x=Wa(o[g]),P=[...n==="add"?x:x.filter(b=>t.includes(b)||r.some(k=>k.key===b&&Hn(k,s)))];for(let b of s){if(b.type!==h||t.includes(b.key))continue;let k=x.includes(b.key);if(n==="add"&&k)continue;let I=h==="snippet"?pu(b,i,o[b.key]):e.keys[b.key];I!==void 0&&(c[b.key]=I,P.includes(b.key)||P.push(b.key))}c[g]=JSON.stringify(P)}let l=Kn(e.keys[Xe]),y=Wa(c["marketplace:installed-themes"]);l&&y.includes(l)&&!t.includes(l)&&(c[Xe]=e.keys[Xe]);let d=Ii(o,c);return await Ci(c,d),Object.keys(c).length+d.length}function pu(e,n,t){let i=n?Bt(n,e.name):void 0;return i?JSON.stringify(p({code:i.code,title:i.title,description:i.description},i.imageURL?{imageURL:i.imageURL}:{})):t}function Wa(e){try{let n=e?JSON.parse(e):[];return Array.isArray(n)?n.filter(t=>typeof t=="string"):[]}catch(n){return[]}}function mu(e){try{let n=e?JSON.parse(e):null;return n&&typeof n=="object"&&!Array.isArray(n)?n:null}catch(n){return null}}var jn="/api/shares",gu=`${jn}/update`,hu=`${jn}/delete`,bu=`${jn}/import`,ku="x-syncify-user-hash",wu="discover/presets.json",Su={no_code:"This code doesn't exist.",too_many_codes:"You can't make more share codes. Delete one to make another.",daily_limit:"Too many changes to share codes today. Try again tomorrow.",too_large:"This setup is too big to share.",invalid_name:"Names can be up to 60 characters.",empty:"There's nothing to share yet. Install something from Marketplace first.",invalid_items:"Syncify couldn't read some items. Reload Spotify and try again.",source:"Some items don't load from GitHub. Reload Spotify and try again.",blocked:"Some items are on Marketplace's block list. Reload Spotify and try again.",custom_snippet:"Custom snippets can't be shared. Reload Spotify and try again.",unchecked:"Couldn't check Marketplace's block list. Try again in a minute.",publish_failed:"Couldn't publish the code. Press Update on it to try again.",delete_failed:"Couldn't delete the code. Try again.",same_setup:"You already shared this setup.",invalid_handle:"Handles are 3 to 20 letters, digits, _ or -, starting and ending with a letter or digit.",reserved_handle:"That handle isn't allowed. Pick another.",handle_taken:"That handle is taken. Pick another.",unavailable:"Share codes aren't available yet."},vu=new Set(["offline","signed_out","invalid_signature","stale_salt","no_device_key","too_many_requests"]);function Lt(e,n=null){var t;return e instanceof T&&vu.has(e.code)?Ee(e):e instanceof T&&e.code==="too_many_codes"&&n!==null?`You have ${n} share codes already. Delete one to make another.`:(t=e instanceof T?Su[e.code]:void 0)!=null?t:"Something went wrong. Try again."}async function Dt(){var n;let e=await Bn(jn,"GET");return{codes:Array.isArray(e==null?void 0:e.codes)?e.codes.flatMap(t=>{let i=xu(t);return i?[i]:[]}):[],newHearts:typeof(e==null?void 0:e.new_hearts)=="number"?e.new_hearts:0,max:typeof(e==null?void 0:e.max)=="number"?e.max:null,profile:typeof((n=e==null?void 0:e.profile)==null?void 0:n.handle)=="string"?{handle:e.profile.handle,link:typeof e.profile.link=="string"?e.profile.link:null}:null,suggestedHandle:typeof(e==null?void 0:e.suggested_handle)=="string"?e.suggested_handle:null}}async function tr(e,n,t){return lr(await Bn(jn,"POST",p({name:e,keys:n},t===void 0?{}:{handle:t})))}function ir(e){return`${L().shareUrl.replace(/\/+$/,"")}/@${e}`}async function or(e,n,t){return lr(await Bn(gu,"POST",{code:e,name:n,keys:t}))}async function ar(e){try{await Bn(hu,"POST",{code:e})}catch(n){if(n instanceof T&&n.code==="no_code")return;throw n}}async function rr(e){let n=L().shareUrl.replace(/\/+$/,""),t;try{t=await fetch(`${n}/${e}.json`)}catch(o){throw new T("offline")}if(t.status===404||t.status===403)throw new T("no_code");if(!t.ok)throw new T("failed");let i=Ja(await t.json().catch(()=>null));if(!i||i.code!==e)throw new T("no_code");return i}async function sr(){let e=L().shareUrl.replace(/\/+$/,"");try{let n=await fetch(`${e}/${wu}`);if(!n.ok)return null;let t=await n.json();return Array.isArray(t.posts)?t.posts.flatMap(i=>{let o=Nu(i);return o?[o]:[]}):null}catch(n){return null}}async function cr(e,n,t=!1){try{await pa(bu,p({code:e},t?{source:"preset"}:{}),{[ku]:n.hash})}catch(i){}}function xu(e){let n=e;return!n||typeof n.code!="string"?null:{code:n.code,name:typeof n.name=="string"&&n.name?n.name:null,link:typeof n.link=="string"?n.link:null,item_count:typeof n.item_count=="number"?n.item_count:0,imports:typeof n.imports=="number"?n.imports:0,created_at:typeof n.created_at=="number"?n.created_at:0,updated_at:typeof n.updated_at=="number"?n.updated_at:0,hearts:Iu(e.post),posted:Cu(e.post)}}function Cu(e){let n=e==null?void 0:e.status;return typeof n=="string"&&n!=="removed"}function Iu(e){let n=e;return(n==null?void 0:n.status)==="public"&&n.hidden!==!0&&typeof n.hearts=="number"?n.hearts:null}function Nu(e){let n=e,t=i=>Number.isSafeInteger(i)&&i>=0?i:0;return!n||typeof n.code!="string"?null:{code:n.code,name:typeof n.name=="string"?n.name:pe(n.code),extensions:t(n.extensions),themes:t(n.themes),snippets:t(n.snippets)}}function lr(e){let n=e;if(typeof(n==null?void 0:n.code)!="string")throw new T("failed");return{code:n.code,link:typeof n.link=="string"?n.link:null,leftOut:Array.isArray(n.left_out)?n.left_out.length:0}}var ur="/claims",Ru="/claims/cancel",Eu={no_backup:"Back up first, then secure your backup.",unsupported_identity:"This Spotify account can't be secured.",too_many_accounts:"Your account already has 10 Spotify accounts linked.",undone:"This backup can't be secured with your account.",offline:"Couldn't reach Syncify. Check your connection and try again."},_e=class extends Error{constructor(t){var i;super((i=Eu[t])!=null?i:"Couldn't secure your backup. Try again.");this.code=t;this.name="ClaimError"}};async function yr(e,n){let t=await Ti(e,n,"GET",ur);if(!t.ok)throw new _e(await _i(t));let i=await t.json().catch(()=>null);return{claim:On(i==null?void 0:i.claim),accounts:Array.isArray(i==null?void 0:i.accounts)?i.accounts.filter(Pu):null}}async function dr(e,n){let t=await Ti(e,n,"POST",ur);if(!t.ok)throw new _e(await _i(t));let i=await t.json().catch(()=>null);return On(i==null?void 0:i.claim)}async function fr(e,n){let t=await Ti(e,n,"POST",Ru);if(t.status===404)return"cancelled";if(!t.ok)throw new _e(await _i(t));let i=await t.json().catch(()=>null);return(i==null?void 0:i.held)===!0?"checking":"cancelled"}async function Ti(e,n,t,i){try{return await Pe(e,n,{method:t},i)}catch(o){throw o instanceof TypeError?new _e("offline"):o}}async function _i(e){let n=await e.json().catch(()=>null);return typeof(n==null?void 0:n.code)=="string"?n.code:"failed"}function Pu(e){let n=e;return!!(n&&typeof n.hash=="string"&&(n.status==="pending"||n.status==="final"||n.status==="cancelled"||n.status==="unlinked"))}var hn={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},Tu=/^([a-z0-9]|f([1-9]|1[0-2]))$/,_u=250,Au=40,Ai=null,Ot=null,gn=null;function pr(){return/mac/i.test(navigator.platform||navigator.userAgent)}function mr(e){if(e===null)return null;if(!e||typeof e!="object")return hn;let n=e;return typeof n.key!="string"||!Tu.test(n.key)?hn:{key:n.key,ctrl:!!n.ctrl,alt:!!n.alt,shift:!!n.shift,meta:!!n.meta}}function Wn(e){if(!e)return"Off";let n=e.key.toUpperCase();return pr()?[e.ctrl?"\u2318":"",e.alt?"\u2325":"",e.shift?"\u21E7":"",n].join(""):[e.ctrl&&"Ctrl",e.meta&&"Win",e.alt&&"Alt",e.shift&&"Shift",n].filter(Boolean).join("+")}function gr(e){if(e.key==="Escape")return{kind:"cancel"};let n=Mu(e.code);if(!n)return{kind:"ignore"};let t=pr();if(t&&e.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:n,ctrl:t?e.metaKey:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:t?!1:e.metaKey},o=n.startsWith("f")&&n.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!o?{kind:"error",message:`Include ${t?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function Mu(e){var t,i;let n=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(e);return n?((i=(t=n[1])!=null?t:n[2])!=null?i:n[3]).toLowerCase():null}function hr(e){var n;if(gn&&Bu(gn,e))return!1;try{let t=Spicetify.Mousetrap,i=(n=t.trigger)==null?void 0:n.call(t)._directMap;if(!i)return!1;let o=Mi(e);return Object.keys(i).some(r=>r.startsWith(`${o}:`))}catch(t){return!1}}function Bi(e,n,t=0){if(Ai=n,Ot=e,!br()){if(t>=Au){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>Bi(Ot,n,t+1),_u);return}Li(Ot)}function Li(e){if(Ot=e,!br()||!Ai)return;let n=Ai;try{if(gn&&Spicetify.Keyboard._deregisterShortcut(gn),gn=null,!e)return;Spicetify.Keyboard.registerShortcut(e,t=>{t.preventDefault(),n()}),gn=e,console.debug("[Syncify]","Keyboard shortcut registered",Wn(e))}catch(t){console.warn("[Syncify]","Failed to register keyboard shortcut",t)}}function br(){var e;return typeof((e=Spicetify.Keyboard)==null?void 0:e.registerShortcut)=="function"}function Mi(e){return[e.ctrl&&"mod",e.meta&&"meta",e.alt&&"alt",e.shift&&"shift",e.key].filter(Boolean).join("+")}function Bu(e,n){return Mi(e)===Mi(n)}var Di="both",Lu=["both","topbar","menu"],Yn=null,qn=null,Ut=!1;function kr(e){return Lu.includes(e)?e:Di}function wr(){var e;return typeof((e=Spicetify.Menu)==null?void 0:e.Item)=="function"}function Sr(e){Yn=e.topbarButton,qn=e.menuItem}function Ht(e){let n=e!=="menu"||!qn,t=e!=="topbar";if(Yn!=null&&Yn.element&&(Yn.element.style.display=n?"":"none"),!!qn)try{t&&!Ut?(qn.register(),Ut=!0):!t&&Ut&&(qn.deregister(),Ut=!1)}catch(i){console.warn("[Syncify]","Failed to update profile menu item",i)}}var Kt="syncify:config",$t={workerUrl:L().workerUrl,autoBackupEnabled:!1,shortcut:hn,entryPoint:Di};function me(){var t,i;let e=L(),n=(i=(t=Spicetify.LocalStorage)==null?void 0:t.get(Kt))!=null?i:window.localStorage.getItem(Kt);if(!n)return w(p({},$t),{workerUrl:e.workerUrl});try{let o=JSON.parse(n);return{workerUrl:e.workerUrl,autoBackupEnabled:o.autoBackupEnabled===void 0?$t.autoBackupEnabled:!!o.autoBackupEnabled,shortcut:o.shortcut===void 0?$t.shortcut:mr(o.shortcut),entryPoint:kr(o.entryPoint)}}catch(o){return w(p({},$t),{workerUrl:e.workerUrl})}}function vr(e){var t;let n=JSON.stringify({workerUrl:L().workerUrl,autoBackupEnabled:e.autoBackupEnabled,shortcut:e.shortcut,entryPoint:e.entryPoint});if((t=Spicetify.LocalStorage)!=null&&t.set){Spicetify.LocalStorage.set(Kt,n);return}window.localStorage.setItem(Kt,n)}function Gn(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}var Du=["username","canonicalUsername","id","uri","displayName"];async function ge(){let{value:e,field:n}=await Ou();return{hash:await xt(e),field:n}}async function Ou(){var o;let e=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let n=await e.getUser(),t=Du.find(r=>(n==null?void 0:n[r])!=null),i=t?n[t]:void 0;if(!t||!i)throw new Error("Unable to resolve the active Spotify user.");return{value:i,field:t}}async function Jn(e){if(!Gn(e))throw new Error("Syncify backup service is not configured.");let[n,t]=await Promise.all([ge(),Ba()]);if(t.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:i,unapproved:o}=await ha(e.workerUrl,n,t);return{payload:t,unchanged:i,unapproved:o}}async function Ze(e,n){var c;if(!Gn(e))throw new Error("Syncify backup service is not configured.");let t=await hi(e.workerUrl,await ge(),n),[i,o,r]=await Promise.all([Promise.all(t.backups.map(Ui)),t.safetyCopy?Ui(t.safetyCopy):null,Promise.all(t.unapproved.map(Ui))]),s=i.filter((l,y)=>i.findIndex(d=>d.payload_hash===l.payload_hash)===y);return w(p({},t),{payload:(c=s[0])!=null?c:null,backups:s,safetyCopy:o&&!s.some(l=>l.payload_hash===o.payload_hash)?o:null,unapproved:r.filter(l=>!s.some(y=>y.payload_hash===l.payload_hash))})}var Oi=new Map;async function Ui(e){var r,s,c;let n=(s=(r=e.marketplace_data)==null?void 0:r.keys)!=null?s:{},t=e.spicetify_config?Si(e.spicetify_config,n):void 0,i=`${e.payload_hash} ${(c=e.metadata)==null?void 0:c.last_sync_datetime}`,o=Oi.get(i);return o||(o=Tt(n,t),Oi.set(i,o),o.catch(()=>Oi.delete(i))),w(p(p({},e),t?{spicetify_config:t}:{}),{payload_hash:await o})}async function xr(e){let n=await hi(Xn(e),await ge());return{claim:n.claim,install:n.install,nudge:n.nudge}}async function Cr(e,n,t,i=[]){var c;let o=n!=null?n:(await Ze(e)).payload;if(!o)throw new Error("No Syncify cloud backup was found for this Spotify account.");let r=await La(o,i),s=(c=o.backup)==null?void 0:c.id;return s&&Gn(e)&&ge().then(l=>ka(e.workerUrl,l,s,t)).catch(()=>{}),{payload:o,restoredCount:r}}var Vn=class extends Error{constructor(t){super("Couldn't back up your setup first, so nothing changed.");this.reason=t;this.name="SafetyBackupError"}};async function Ir(e,n,t,i,o,r=!1){try{await Jn(e)}catch(c){throw new Vn(c)}let s=await nr(n,t,i,o);return ge().then(c=>cr(n.code,c,r)).catch(()=>{}),s}async function Nr(e){let n=await ge(),t=await yr(Xn(e),n);return w(p({},t),{hash:n.hash})}async function Rr(e){await dr(Xn(e),await ge())}async function zt(e,n,t){await ba(Xn(e),await ge(),n,t)}async function Ft(e){return fr(Xn(e),await ge())}function Xn(e){if(!Gn(e))throw new Error("Syncify backup service is not configured.");return e.workerUrl}var Er="syncify:nudge-hidden-until",Pr="syncify:nudge-panel-shown";function Tr(e=Date.now()){let n=Number(Br(Er));return Number.isFinite(n)&&n>e}function _r(e=Date.now()){Lr(Er,String(e+30*864e5))}function Ar(){return Br(Pr)!==null}function Mr(){Lr(Pr,"1")}function Br(e){var n,t;return(t=(n=Spicetify.LocalStorage)==null?void 0:n.get(e))!=null?t:window.localStorage.getItem(e)}function Lr(e,n){var t;(t=Spicetify.LocalStorage)!=null&&t.set?Spicetify.LocalStorage.set(e,n):window.localStorage.setItem(e,n)}var Hi="syncify:claim-check-day",Dr="syncify:undone-claim-shown";async function Or(e){var t,i;let n=me();if(n.workerUrl){if(!n.autoBackupEnabled)return Uu(e);try{let[o,r]=await Promise.all([_t(),Ze(n)]);Ur(r,e);let s=(i=(t=r.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?i:0;if(r.exists&&Da(o.keyCount,s)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(r.backups.some(l=>l.payload_hash===o.hash)||o.keyCount===0)return;let{unapproved:c}=await Jn(n);Spicetify.showNotification(c?"Syncify: backed up, waiting for approval":"Syncify auto-backup complete")}catch(o){if(o instanceof se||o instanceof Je){Spicetify.showNotification("Syncify: sign in to keep backing up",!0,8e3);return}let r=o instanceof Error?o.message:String(o);console.warn("Syncify startup sync failed:",o),Spicetify.showNotification(`Syncify auto-sync skipped: ${r}`,!0,8e3)}}}async function Uu(e){let n=new Date().toLocaleDateString("en-CA");if(Hr(Hi)!==n)try{let t=await xr(me());$i(Hi,n),Ur(t,e)}catch(t){if(t instanceof se){$i(Hi,n);return}console.warn("Syncify claim check failed:",t)}}function Ur(e,n){var r;let t=Hu(e.claim),i=$u(e.claim),o=(r=e.install)==null?void 0:r.waiting[0];t?n.onClaim(t):i?n.onUndone(i)&&$i(Dr,String(i.undone_at)):o?n.onInstall(o):e.nudge&&!Ar()&&n.onNudge()}function Hu(e){return(e==null?void 0:e.status)==="pending"&&!e.mine&&!e.not_me?e:null}function $u(e){return(e==null?void 0:e.status)==="undone"&&Hr(Dr)!==String(e.undone_at)?e:null}function Hr(e){var n,t;return(t=(n=Spicetify.LocalStorage)==null?void 0:n.get(e))!=null?t:window.localStorage.getItem(e)}function $i(e,n){var t;(t=Spicetify.LocalStorage)!=null&&t.set?Spicetify.LocalStorage.set(e,n):window.localStorage.setItem(e,n)}var zi="syncify:pending-restore",Ku=600*1e3,zu=2e3,Fu=15e3,ju="marketplace:theme-installed",Wu="raw.githubusercontent.com",Yu=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],he=null,Ki=new Set,zr=new Map;function Fr(){return he}function jr(e){return Ki.add(e),()=>Ki.delete(e)}function Wr(){he&&Jr(w(p({},he),{manual:[]}))}function Qn(e,n="restore"){try{localStorage.setItem(zi,JSON.stringify({at:Date.now(),manual:e,kind:n}))}catch(t){}}function Yr(){var e;Qn((e=he==null?void 0:he.manual)!=null?e:[],he==null?void 0:he.kind),window.location.reload()}function qr(){Xr()&&(document.addEventListener("load",e=>$r(e.target,"load"),!0),document.addEventListener("error",e=>$r(e.target,"error"),!0))}async function Gr(){let e=Xr();if(!e)return;try{localStorage.removeItem(zi)}catch(s){}let n=Date.now(),t=await Kr();for(;t.loaded<t.total&&Date.now()-n<Fu;)await new Promise(s=>setTimeout(s,zu)),t=await Kr();Jr(w(p({kind:e.kind,at:Date.now()},t),{manual:e.manual}));let i=t.loaded===t.total&&e.manual.length===0,o=e.kind==="share"?"Setup applied":"Backup restored",r=e.kind==="share"?"loaded":"restored";Spicetify.showNotification(i?`Syncify: ${o}; ${t.total} ${t.total===1?"item":"items"}`:`Syncify: ${r} ${t.loaded} of ${t.total}. Open Syncify for details.`,!1,8e3)}function Vr(e){let n=e.map(t=>t.type==="extension"?`spicetify config extensions ${jt(t.name)}`:t.type==="custom_app"?`spicetify config custom_apps ${jt(t.name)}`:`spicetify config current_theme ${jt(t.name)}${t.scheme?` color_scheme ${jt(t.scheme)}`:""}`);return n.length>0?[...n,"spicetify apply"]:[]}function jt(e){return/^[\w.@+/-]+$/.test(e)?e:`"${e}"`}function Jr(e){he=e;for(let n of Ki)n(e)}function Xr(){var e;try{let n=JSON.parse((e=localStorage.getItem(zi))!=null?e:"null");return!n||Date.now()-n.at>Ku?null:{manual:Array.isArray(n.manual)?n.manual:[],kind:n.kind==="share"?"share":"restore"}}catch(n){return null}}function $r(e,n){e instanceof HTMLScriptElement&&e.src&&zr.set(Zn(e.src),n)}async function Kr(){var i;let e=await ue(),n=(i=e[ju])!=null?i:"",t=ee(e).filter(o=>o.type==="extension"&&o.sources.length>0||o.type==="theme"&&n.includes(o.key)||o.type==="snippet");return{loaded:t.filter(qu).length,total:t.length}}function qu(e){var n,t;if(e.type==="snippet"){let i=document.querySelector("style.marketplaceSnippets");return((n=i==null?void 0:i.textContent)==null?void 0:n.includes(`/* ${e.name} - `))===!0}if(e.type==="theme"){let i=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((t=i==null?void 0:i.textContent)!=null&&t.trim())}return Gu(e.sources[0]).some(Vu)}function Gu(e){let n;try{n=new URL(e)}catch(s){return[]}if(n.host!==Wu)return[Zn(n.href)];let[t,i,o,...r]=n.pathname.split("/").filter(Boolean);return!t||!i||!o||r.length===0?[]:Yu.map(s=>Zn(`https://${s}/gh/${t}/${i}@${o}/${r.join("/")}`))}function Vu(e){let n=zr.get(e);return n?n==="load":[...document.querySelectorAll("script[src]")].some(i=>Zn(i.src)===e)&&performance.getEntriesByType("resource").some(i=>Zn(i.name)===e)}function Zn(e){try{let n=new URL(e);return`${n.origin}${n.pathname}`}catch(n){return e}}var Ju="syncify:beta",Zr=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function Qr(){var e;return(e=window.SyncifyLoader)!=null?e:null}function Xu(){try{return window.localStorage.getItem(Ju)==="true"}catch(e){return!1}}async function es(e){let n=Xu()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(n.map(i=>Zu(`${e}/${i}`)))).reduce((i,o)=>o&&(!i||ji(o,i)>0)?o:i,null)}function Fi(e){return typeof e=="string"&&Zr.test(e)}function ji(e,n){let[t,i]=[e,n].map(o=>{var y;let[,r,s,c,l]=(y=Zr.exec(o))!=null?y:[];return[r,s,c,l!=null?l:1/0].map(Number)});for(let o=0;o<t.length;o+=1)if(t[o]!==i[o])return t[o]<i[o]?-1:1;return 0}async function Zu(e,n=3e3){let t=typeof AbortController=="function"?new AbortController:null,i=setTimeout(()=>t==null?void 0:t.abort(),n);try{let o=await fetch(e,{signal:t==null?void 0:t.signal});if(!o.ok)return null;let r=await o.json();return Fi(r==null?void 0:r.version)?r.version:null}catch(o){return null}finally{clearTimeout(i)}}function Qe(...e){return e.filter(Boolean).join(" ")}function Wi(e,n){return n===void 0?e:w(p({},e),{key:n})}function a(e,n,t){let r=n,{children:i}=r,o=le(r,["children"]);return i===void 0?_n(e,Wi(o,t)):_n(e,Wi(o,t),i)}function u(e,n,t){let s=n,{children:i}=s,o=le(s,["children"]),r=Array.isArray(i)?i:[i];return _n(e,Wi(o,t),...r)}var Qu={primary:"regular",secondary:"regular",danger:"regular",text:"small",subtle:"small"};function R(e){let l=e,{variant:n="primary",size:t=Qu[n],type:i="button",icon:o,children:r,className:s}=l,c=le(l,["variant","size","type","icon","children","className"]);return u("button",w(p({className:Qe("syncify-btn",s),"data-variant":n,"data-size":t,type:i},c),{children:[o,a("span",{className:"syncify-cap",children:r})]}))}function Yi(e){return a("input",{className:"syncify-checkbox",type:"checkbox","aria-label":e.label,checked:e.checked,onChange:n=>e.onChange(n.currentTarget.checked),disabled:e.disabled})}var ey=0;function ne(e){let[n]=m(()=>`syncify-${e}-${++ey}`);return n}function qi(e){return u("div",{className:"syncify-dialog-content",children:[a("h2",{className:"syncify-dialog-title",id:e.titleId,children:e.title}),e.children?a("div",{className:"syncify-dialog-text",children:e.children}):null,a("div",{className:"syncify-dialog-actions",children:e.actions})]})}function Wt(e){var o,r;let n=ne("field"),t=`${n}-error`,i=!!e.error;return u("div",{className:"syncify-field-group",children:[a("label",{className:"syncify-field-label",htmlFor:n,children:e.label}),u("div",{className:"syncify-field-row",children:[u("span",{className:"syncify-input-box","data-invalid":i?"true":void 0,"data-disabled":e.disabled?"true":void 0,children:[e.prefix?a("span",{className:"syncify-input-prefix","aria-hidden":"true",children:e.prefix}):null,a("input",{className:"syncify-input-control",id:n,type:(o=e.type)!=null?o:"text",value:e.value,onChange:s=>e.onChange(s.currentTarget.value),onBlur:e.onBlur,placeholder:e.placeholder,inputMode:e.inputMode,autoComplete:(r=e.autoComplete)!=null?r:"off",spellCheck:!1,maxLength:e.maxLength,disabled:e.disabled,autoFocus:e.autoFocus,"aria-invalid":i||void 0,"aria-describedby":i?t:void 0,"data-mono":e.mono?"true":void 0})]}),e.action]}),i?a("span",{className:"syncify-field-error",id:t,role:"alert",children:e.error}):null]})}function bn(e){let o=e,{children:n,className:t}=o,i=le(o,["children","className"]);return a("svg",w(p({className:Qe("syncify-icon",t),viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},i),{children:n}))}function Gi(e){return a(bn,w(p({},e),{children:a("path",{d:"m9 6 6 6-6 6"})}))}function Vi(e){return a(bn,w(p({},e),{children:a("path",{d:"m6 9 6 6 6-6"})}))}function Ie(e){return a(bn,w(p({},e),{children:a("path",{d:"M5 12.5l4.5 4.5L19 7.5"})}))}function Ji(e){return a(bn,w(p({},e),{children:a("path",{d:"M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z"})}))}function Xi(e){return u(bn,w(p({},e),{"data-filled":"true",children:[a("rect",{x:"4",y:"10.5",width:"3",height:"3",rx:"0.75"}),a("rect",{x:"10.5",y:"10.5",width:"3",height:"3",rx:"0.75"}),a("rect",{x:"17",y:"10.5",width:"3",height:"3",rx:"0.75"})]}))}function Zi(e){return u(bn,w(p({},e),{children:[a("path",{d:"M12 6v7"}),a("path",{d:"M12 17.5v.5"})]}))}function Qi(e){let o=e,{keys:n,recording:t}=o,i=le(o,["keys","recording"]);return a("button",w(p({className:"syncify-keycap",type:"button","data-recording":t?"true":void 0},i),{children:a("span",{className:"syncify-cap",children:n})}))}function kn(e){return a("ul",{className:"syncify-list","aria-label":e.label,children:e.children})}function Yt(){return a("li",{className:"syncify-list-divider",role:"presentation"})}function Ae(e){let n=u(A,{children:[e.leading?a("span",{className:"syncify-row-leading",children:e.leading}):null,u("span",{className:"syncify-row-name",children:[a("span",{className:"syncify-row-name-text",children:e.name}),e.nameMark]}),e.meta?a("span",{className:"syncify-row-meta",children:e.meta}):null,e.end?a("span",{className:"syncify-row-end",children:e.end}):null]}),t=e.meta?"2":"1";return a("li",{className:"syncify-list-item",children:e.onOpen?u("button",{className:"syncify-row",id:e.id,"data-lines":t,type:"button","aria-label":e.openLabel,onClick:e.onOpen,disabled:e.disabled,children:[n,a(Gi,{className:"syncify-row-chevron"})]}):a("div",{className:"syncify-row",id:e.id,"data-lines":t,children:n})})}function be(e){return a("span",{className:"syncify-mark-square","data-tone":e.tone,"data-size":e.icon?"large":"small",role:e.label?"img":void 0,"aria-label":e.label,"aria-hidden":e.label?void 0:"true",children:e.icon})}function eo(e){return a("span",{className:"syncify-badge",role:"img","aria-label":e.label,children:a("span",{className:"syncify-cap",children:e.count})})}function et(e){let n=ne("menu"),[t,i]=m(!1),o=q(null),r=q(null),s=e.items.some(g=>g.checked!==void 0);M(()=>{var k,I;let g=r.current,h=o.current;if(!t||!g||!h)return;ty(g),ay(g,h);let x=ns(g);(I=(k=x.find(O=>O.getAttribute("aria-checked")==="true"))!=null?k:x[0])==null||I.focus();let v=()=>i(!1),P=O=>{let N=O.target;N instanceof Node&&!g.contains(N)&&!h.contains(N)&&v()},b=O=>{O.target instanceof Node&&g.contains(O.target)||v()};return document.addEventListener("pointerdown",P,!0),document.addEventListener("scroll",b,!0),window.addEventListener("resize",v),()=>{document.removeEventListener("pointerdown",P,!0),document.removeEventListener("scroll",b,!0),window.removeEventListener("resize",v),iy(g)}},[t]);function c(){var g;i(!1),(g=o.current)==null||g.focus()}function l(g){let h=ns(g.currentTarget),x=h.findIndex(P=>P===document.activeElement),v=g.key==="ArrowDown"?h[(x+1)%h.length]:g.key==="ArrowUp"?h[(x-1+h.length)%h.length]:g.key==="Home"?h[0]:g.key==="End"?h[h.length-1]:null;v?(g.preventDefault(),v.focus()):g.key==="Escape"?(g.preventDefault(),c()):g.key==="Tab"&&i(!1)}function y(g){(g.key==="ArrowDown"||g.key==="ArrowUp")&&(g.preventDefault(),i(!0))}let d={ref:o,type:"button","aria-haspopup":"menu","aria-expanded":t,"aria-controls":t?n:void 0,disabled:e.disabled,onClick:()=>i(!t),onKeyDown:y};return u(A,{children:[e.trigger==="more"?a("button",w(p({className:"syncify-icon-btn","aria-label":e.label},d),{children:a(Xi,{})})):u("button",w(p({className:"syncify-menu-value","aria-label":`${e.label}: ${e.trigger.value}`},d),{children:[a("span",{className:"syncify-cap",children:e.trigger.value}),a(Vi,{})]})),t?a("div",{className:"syncify-menu",id:n,ref:r,role:"menu","aria-label":e.label,popover:"manual",onKeyDown:l,children:e.items.map(g=>a(ny,{item:g,picks:s,onPick:()=>{c(),g.onSelect()}},g.label))}):null]})}function ny(e){let{item:n,picks:t}=e;return u("button",{className:"syncify-menu-item",type:"button",role:t?"menuitemradio":"menuitem","aria-checked":t?n.checked===!0:void 0,"data-danger":n.danger?"true":void 0,tabIndex:-1,disabled:n.disabled,onClick:e.onPick,children:[a("span",{className:"syncify-cap",children:n.label}),n.checked?a(Ie,{}):null]})}function ns(e){return[...e.querySelectorAll(".syncify-menu-item:not(:disabled)")]}function ty(e){typeof e.showPopover=="function"&&!e.matches(":popover-open")&&e.showPopover()}function iy(e){typeof e.hidePopover=="function"&&e.matches(":popover-open")&&e.hidePopover()}var oy=4;function ay(e,n){let t=oy,i=n.getBoundingClientRect(),o=e.getBoundingClientRect(),r=i.bottom+t,s=r+o.height>window.innerHeight&&i.top-t-o.height>=0?i.top-t-o.height:r,c=Math.min(Math.max(i.right-o.width,t),window.innerWidth-o.width-t);e.style.top=`${s}px`,e.style.left=`${c}px`}function en(){return u(A,{children:[a("span",{className:"syncify-dot","aria-hidden":"true"}),a("span",{className:"syncify-visually-hidden",children:", "})]})}function G(e){let n=e.parts.filter(t=>t!=null&&t!==!1&&t!=="");return a("span",{className:Qe("syncify-meta",e.className),children:n.map((t,i)=>u(A,{children:[i>0?a(en,{}):null,a("span",{className:"syncify-meta-part",children:t})]},i))})}function D(e){let n=e.tone==="error"?"alert":e.live?"status":void 0;return u("div",{className:"syncify-notice","data-tone":e.tone,role:n,children:[u("span",{className:"syncify-notice-body",children:[a("span",{className:"syncify-notice-mark",children:a(be,{tone:e.tone})}),a("span",{className:"syncify-notice-text",children:e.children})]}),e.actions?a("span",{className:"syncify-notice-actions",children:e.actions}):null]})}function nt(e){return a("span",{className:"syncify-pip-square","data-kind":e.kind,"aria-hidden":"true"})}function no(e){return u("div",{className:"syncify-section-label",children:[a("h3",{className:"syncify-section-label-title",id:e.id,tabIndex:e.focusable?-1:void 0,children:e.title}),e.end]})}function ye(e){return u("div",{className:"syncify-setting-row",children:[u("span",{className:"syncify-setting-row-text",children:[a("span",{className:"syncify-setting-row-label",children:e.label}),e.value?a("span",{className:"syncify-setting-row-value",children:e.value}):null]}),e.children]})}function tt(e){return a("div",{className:"syncify-setting-group",role:"group","aria-label":e.label,children:e.children})}function qt(){return a("li",{className:"syncify-list-item","aria-hidden":"true",children:u("div",{className:"syncify-row","data-lines":"2",children:[a("span",{className:"syncify-row-name",children:a("span",{className:"syncify-skeleton","data-width":"name"})}),a("span",{className:"syncify-row-meta",children:a("span",{className:"syncify-skeleton","data-width":"meta"})})]})})}function ts(e){return a("input",{className:"syncify-switch-control",type:"checkbox",role:"switch",checked:e.checked,onChange:n=>e.onChange(n.currentTarget.checked),disabled:e.disabled})}function to(e){let i=e,{label:n}=i,t=le(i,["label"]);return u("label",{className:"syncify-setting-row","data-disabled":e.disabled?"true":void 0,children:[a("span",{className:"syncify-setting-row-label",children:n}),a(ts,p({},t))]})}var is=(e,n)=>`${e}-tab-${n}`,os=(e,n)=>`${e}-panel-${n}`;function io(e){let n=q(null);function t(i){var c,l;let o=e.tabs.length,r=e.tabs.findIndex(y=>y.id===e.selected),s=i.key==="ArrowRight"?(r+1)%o:i.key==="ArrowLeft"?(r-1+o)%o:i.key==="Home"?0:i.key==="End"?o-1:null;s!==null&&(i.preventDefault(),e.onSelect(e.tabs[s].id),(l=(c=n.current)==null?void 0:c.querySelectorAll('[role="tab"]')[s])==null||l.focus())}return a("div",{className:"syncify-tabs",role:"tablist","aria-label":e.label,ref:n,onKeyDown:t,children:e.tabs.map(i=>{let o=i.id===e.selected;return u("button",{className:"syncify-tab",id:is(e.idBase,i.id),type:"button",role:"tab","aria-selected":o,"aria-controls":os(e.idBase,i.id),tabIndex:o?0:-1,onClick:()=>e.onSelect(i.id),children:[a("span",{className:"syncify-cap",children:i.label}),i.status]},i.id)})})}function oe(e){return u("div",{className:"syncify-tab-panel",id:os(e.idBase,e.id),role:"tabpanel","aria-labelledby":is(e.idBase,e.id),children:[a("div",{className:"syncify-tab-scroll",tabIndex:0,children:e.children}),e.actions?a("div",{className:"syncify-tab-actions",children:e.actions}):null]})}function Me(e){let n=q(e);return pt(()=>{n.current=e}),n}function Be(e){if(e.startsWith("mailto:")){window.location.href=e;return}window.open(e,"_blank","noopener,noreferrer")}function Gt(e){let n=e.lastIndexOf("@");if(n<1)return e;let t=e.slice(0,n);return t.length<=2?e:`${t[0]}${"*".repeat(t.length-2)}${t[t.length-1]}${e.slice(n)}`}function as(e,n=new Date){let t=new Date(e);return t.toDateString()===n.toDateString()?"today":t.toLocaleDateString(void 0,{month:"short",day:"numeric",year:t.getFullYear()===n.getFullYear()?void 0:"numeric"})}function rs(e){let n=as(e);return n==="today"?n:`on ${n}`}function ry(e){let n=as(e);return n==="today"?n:`by ${n}`}function Vt(e){var n;return e.not_me?{title:"Syncify is checking this claim",text:null}:{title:`${(n=e.email)!=null?n:"Someone"} is securing this backup`,text:e.held?"Syncify is checking it.":`If that isn't you, press Not me ${ry(e.final_at)}.`}}function ss(e){var n;return`This backup is no longer secured by ${(n=e.email)!=null?n:"another account"}`}function Jt(e){return e==="cancelled"?"Syncify: claim cancelled":"Syncify: sent for a check"}function Xt(e){return`A new install${e.device?` on ${e.device}`:""} wants to back up this Spotify account`}function cs(e,n,t){var s,c;if(n==="not_owner")return{kind:"other-account"};if(!e)return t?{kind:"other-claim"}:{kind:"unknown"};let{claim:i}=e;if((i==null?void 0:i.status)==="final"){if(!i.mine)return{kind:"other-account"};let l=((s=e.accounts)!=null?s:[]).filter(y=>y.status==="final").length;return{kind:"secured",linkedCount:Math.max(l,1)}}if((i==null?void 0:i.status)==="pending")return i.mine?{kind:"pending",finalAt:i.final_at,held:i.held}:{kind:"other-claim"};let o=((c=e.accounts)!=null?c:[]).filter(l=>l.hash===e.hash),r=o[o.length-1];return(r==null?void 0:r.status)==="unlinked"?{kind:"ended",reason:"undone"}:(r==null?void 0:r.status)==="cancelled"&&r.cancelled_by!=="claimer"?{kind:"ended",reason:r.cancelled_by==="owner"?"owner":"admin"}:{kind:"open"}}function ls(e,n,t){return n?{kind:"warning",label:"Sign in to see your backups"}:e?t.kind==="secured"?{kind:"ok",label:"Signed in, backup secured"}:t.kind==="pending"?null:t.kind==="open"?{kind:"warning",label:"Backup not secured yet"}:t.kind==="ended"?{kind:"warning",label:"Backup not secured"}:{kind:"ok",label:"Signed in"}:null}function us(e){return e.held?"Syncify is checking your request to secure this backup":`Your backup will be secured ${rs(e.finalAt)}`}var it=6,sy=600*1e3,cy=300,ly=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function oo(e){return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function ys(e){let[n,t]=m(()=>St()),[i,o]=m(()=>St().email),[r,s]=m(""),[c,l]=m(!1),[y,d]=m(null),[g,h]=m(()=>Date.now()),x=!!(n.codeSentAt&&g-n.codeSentAt<sy),v=Math.max(0,Math.ceil((n.retryAt-g)/1e3)),P=n.retryEmail===null||n.retryEmail===i.trim().toLowerCase()?v:0;M(()=>{if(n.retryAt<=Date.now())return;let N=setInterval(()=>{h(Date.now()),n.retryAt<=Date.now()&&clearInterval(N)},1e3);return()=>clearInterval(N)},[n.retryAt]);function b(N){let H=p(p({},St()),N);aa(H),t(H),h(Date.now())}async function k(N){var V;let H=N.trim();if(!ly.test(H)){d("Enter a valid email address.");return}l(!0),d(null);try{let E=await la(H,{nudge:e.nudge});b({email:H,codeSentAt:Date.now(),retryAt:Date.now()+E*1e3,retryEmail:H.toLowerCase()}),s("")}catch(E){let _=E instanceof T?E:null,te=(V=_==null?void 0:_.retryAfter)!=null?V:null,W=te&&te<=cy?Date.now()+te*1e3:0,De=(_==null?void 0:_.code)==="too_many_requests"?null:H.toLowerCase();if((_==null?void 0:_.code)==="resend_wait"){b({email:H,codeSentAt:n.email===H&&n.codeSentAt?n.codeSentAt:Date.now(),retryAt:W,retryEmail:De});return}W&&b({retryAt:W,retryEmail:De}),d(Ee(E))}finally{l(!1)}}async function I(){l(!0),d(null);try{let N=await ua(n.email,r);b({codeSentAt:null}),s(""),e.onSignedIn(N)}catch(N){d(Ee(N));let H=N instanceof T?N.code:null;(H==="too_many_attempts"||H==="code_expired")&&s("")}finally{l(!1)}}async function O(N){l(!0),d(null),await da(),b({email:N,codeSentAt:null}),o(N),l(!1)}return{draft:n,email:i,setEmail:o,code:r,setCode:N=>s(N.replace(/\D/g,"").slice(0,it)),busy:c,error:y,codeSent:x,waitSeconds:v,emailWaitSeconds:P,requestCode:k,verify:I,signOut:O,useAnotherEmail:()=>{b({codeSentAt:null}),s(""),d(null)}}}function ds(e){let{signIn:n}=e,{busy:t}=n;return a("form",{className:"syncify-account-form",noValidate:!0,onSubmit:i=>{i.preventDefault(),!t&&(n.codeSent?n.code.length===it&&n.verify():n.emailWaitSeconds||n.requestCode(n.email))},children:n.codeSent?u(A,{children:[a(Wt,{label:`Code sent to ${Gt(n.draft.email)}`,value:n.code,onChange:n.setCode,error:n.error,placeholder:"123456",inputMode:"numeric",autoComplete:"one-time-code",maxLength:it,mono:!0,autoFocus:!0,action:a(R,{type:"submit",disabled:t||n.code.length!==it,children:t?"Verifying\u2026":"Verify"})}),u("span",{className:"syncify-account-resend",children:[a(R,{variant:"text",onClick:()=>{n.requestCode(n.draft.email)},disabled:t||n.waitSeconds>0,children:n.waitSeconds>0?`Resend in ${oo(n.waitSeconds)}`:"Resend code"}),a(R,{variant:"text",onClick:n.useAnotherEmail,disabled:t,children:"Use another email"})]})]}):a(Wt,{label:"Email for sign-in codes",type:"email",value:n.email,onChange:n.setEmail,error:n.error,placeholder:"you@example.com",autoComplete:"email",autoFocus:!0,action:a(R,{type:"submit",disabled:t||n.emailWaitSeconds>0||!n.email.trim(),children:t?"Sending\u2026":n.emailWaitSeconds>0?`Send in ${oo(n.emailWaitSeconds)}`:"Send code"})})})}var uy={owner:"This backup isn't secured. Someone using this Spotify account said it isn't yours.",admin:"This backup isn't secured. Syncify couldn't confirm it's yours.",undone:"This backup is no longer secured by your account."};function fs(e){let{session:n,secure:t,handle:i}=e,o=ys({nudge:e.nudge,onSignedIn:e.onSignedIn}),[r,s]=m(null),[c,l]=m(!1),y=Me(k=>{n&&ya().then(I=>{!k()||I||(s({kind:"warning",text:Ee(new T("signed_out"))}),e.onSignedOut())}).catch(()=>{})}),d=n==null?void 0:n.token;M(()=>{let k=!0;return y.current(()=>k),()=>{k=!1}},[y,d]);let g=Me(k=>{!n||i!==void 0||Dt().then(I=>{var O,N;k()&&e.onHandle((N=(O=I.profile)==null?void 0:O.handle)!=null?N:null)}).catch(()=>{})});M(()=>{let k=!0;return g.current(()=>k),()=>{k=!1}},[g,!!n&&i===void 0]);async function x(){l(!0),s(null);try{Be(await fa())}catch(k){let I=k instanceof T&&k.code==="signed_out";s({kind:I?"warning":"error",text:Ee(k)}),I&&e.onSignedOut()}finally{l(!1)}}async function v(){var k;s(null),await o.signOut((k=n==null?void 0:n.email)!=null?k:""),e.onSignedOut()}if(n===void 0)return a(oe,{idBase:e.idBase,id:"account",children:null});if(!n)return u(oe,{idBase:e.idBase,id:"account",children:[a("p",{className:"syncify-tab-text",children:e.locked?"Sign in with the email that secured this backup":"Sign in to secure your backup so only you can restore it"}),r?a(D,{tone:r.kind,live:!0,children:r.text}):null,a(ds,{signIn:o})]});let P=t.kind==="open"||t.kind==="other-claim"||t.kind==="ended"&&t.reason!=="undone",b=o.busy||c;return u(oe,{idBase:e.idBase,id:"account",children:[u(tt,{children:[a(ye,{label:"Email for sign-in codes",value:Gt(n.email),children:a(R,{variant:"secondary",size:"small",onClick:()=>{x()},disabled:b,children:"Change"})}),i?a(ye,{label:"Creator handle",value:`@${i}`,children:a(R,{variant:"secondary",size:"small",onClick:()=>{x()},disabled:b,children:"Change"})}):null,a(ye,{label:"Your account page",children:a(R,{variant:"secondary",size:"small",onClick:()=>{x()},disabled:b,children:"Open"})}),P?a(ye,{label:"Secure your backup so only you can restore it",children:a(R,{onClick:e.onSecure,disabled:b||e.securing||t.kind==="other-claim",children:e.securing?"Securing\u2026":t.kind==="ended"?"Secure again":"Secure"})}):null]}),t.kind==="ended"?a(D,{tone:"warning",children:uy[t.reason]}):null,e.secureError?a(D,{tone:"error",children:e.secureError}):null,r?a(D,{tone:r.kind,live:!0,children:r.text}):null,u("div",{className:"syncify-account-footer",children:[u("span",{className:"syncify-account-status",children:[t.kind==="secured"?a(Ie,{className:"syncify-account-check"}):null,a(G,{parts:yy(t)})]}),a(R,{variant:"text",onClick:()=>{v()},disabled:b,children:"Sign out"})]})]})}function yy(e){switch(e.kind){case"secured":return["This backup is secured",...e.linkedCount>1?[`${e.linkedCount} Spotify accounts linked`]:[]];case"pending":return[us(e)];case"other-account":return["This backup is secured by another account"];default:return["Signed in"]}}var ps=new WeakMap;function wn(e){let n=ps.get(e);return n||(n=ee(e.marketplace_data.keys),ps.set(e,n)),n}function ot(e){return Le(e,"item")}function Le(e,n){return`${e} ${n}${e===1?"":"s"}`}function Sn(e,n=new Date){let t=new Date(e);if(Number.isNaN(t.getTime()))return e;let i=t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),o=new Date(n);return o.setDate(n.getDate()-1),t.toDateString()===n.toDateString()?`today, ${i}`:t.toDateString()===o.toDateString()?`yesterday, ${i}`:`${t.toLocaleDateString(void 0,{month:"short",day:"numeric",year:t.getFullYear()===n.getFullYear()?void 0:"numeric"})}, ${i}`}function ms(e){return e.length<=1?e.join(""):`${e.slice(0,-1).join(", ")} and ${e[e.length-1]}`}function gs(e,n,t){var l,y;let i=Sn(e.metadata.last_sync_datetime),o=ot(wn(e).length),r=`from ${e.metadata.device_info}`,s=(y=(l=e.backup)==null?void 0:l.name)!=null?y:null,c=e.payload_hash===t;return n==="safety-copy"?{backup:e,kind:n,name:"Safety copy",meta:[s,i,o,"updated weekly"].filter(dy),current:c,title:`the safety copy from ${i}`}:n==="unapproved"?{backup:e,kind:n,name:"Not approved",meta:[i,o,r],current:c,title:i}:{backup:e,kind:n,name:s!=null?s:i.charAt(0).toUpperCase()+i.slice(1),meta:s?[i,o,r]:[o,r],current:c,title:s!=null?s:i}}function dy(e){return e!==null}var hs={Adds:0,Updates:1,Removes:2},fy=["blocked","host","repo","catalog","unchecked"];function bs(e,n,t,i,o){let r=[],s=[];for(let c of e.items){let l=n.get(c.key),y=t.has(c.key),d={key:c.key,name:c.name,type:c.type,note:l?py(l):o&&y?"Not approved":null},g=c.change==="added"?"Adds":c.change==="removed"?"Removes":c.isNew?"Updates":null;g?r.push(w(p({},d),{change:g,optional:y,included:!y||i.has(c.key)})):s.push(d)}return r.sort((c,l)=>hs[c.change]-hs[l.change]),{changes:r,unchanged:s,manual:e.manual,warnings:my(r,n),count:r.filter(c=>c.included).length}}function ks(e){return e===0?"Restore":e===1?"Restore 1 change":`Restore ${e} changes`}function py(e){switch(e.kind){case"host":return`Code from ${e.host}`;case"repo":return`Code from ${e.repo}`;case"blocked":return"Blocked by Marketplace";case"catalog":return"Not in Marketplace";case"unchecked":return"Not checked";case"custom":return"Custom"}}function my(e,n){var i;let t=new Map;for(let o of e){if(o.change==="Removes")continue;let r=n.get(o.key);!r||!fe(r)&&r.kind!=="unchecked"||t.set(r.kind,[...(i=t.get(r.kind))!=null?i:[],o.name])}return fy.flatMap(o=>{let r=t.get(o);return r?[gy(o,r)]:[]})}function gy(e,n){let t=n.length===1,i=ms(n),o=t?"Restore it only if you trust it.":"Restore them only if you trust them.";switch(e){case"blocked":return`${i} ${t?"is":"are"} on Marketplace's block list. ${o}`;case"host":return`${i} ${t?"loads from a site":"load from sites"} outside GitHub. ${o}`;case"repo":return t?`${i} loads its code from a different repo than the one it names. ${o}`:`${i} load their code from different repos than the ones they name. ${o}`;case"catalog":return`${i} ${t?"isn't":"aren't"} in Marketplace's catalog. ${o}`;default:return`GitHub couldn't be reached to check ${i}. ${o}`}}function ws(e,n,t){var P;let[i,o]=m(()=>new Set),[r,s]=m(null),c=Q(()=>Nt(wn(e),e.spicetify_config,n,t),[e,n,t]),l=Q(()=>pn(c.items),[c]);M(()=>{let b=!0;return mn(c.items,l).then(k=>{b&&s({for:e,checks:k})}),()=>{b=!1}},[e,c,l]);let y=(r==null?void 0:r.for)===e?r.checks:null,d=Q(()=>new Map([...y!=null?y:[],...l]),[y,l]),g=((P=e.backup)==null?void 0:P.kind)==="quarantined",h=Q(()=>new Set(c.items.filter(b=>{var k;return b.change!=="removed"&&b.isNew&&(g||fe(d.get(b.key))||((k=d.get(b.key))==null?void 0:k.kind)==="unchecked")}).map(b=>b.key)),[c,d,g]),x=Q(()=>bs(c,d,h,i,g),[c,d,h,i,g]);function v(b,k){let I=new Set(i);k?I.add(b):I.delete(b),o(I)}return{preview:c,changes:x,unapproved:g,checking:y===null,skipped:[...h].filter(b=>!i.has(b)),allow:v}}var Ss={extension:"extension",theme:"theme",snippet:"snippet"},hy={extension:"extension",custom_app:"app",theme:"theme"},by={extension:"extension",custom_app:"custom app",theme:"theme"};function vs(e){let{row:n,local:t}=e,i=ne("restore-heading"),o=ws(n.backup,t.items,t.spicetifyConfig),{changes:r}=o,[s,c]=m(!1),l=!t.marketplaceAvailable;M(()=>{var d;(d=document.getElementById(i))==null||d.focus()},[i]);let y=u(A,{children:[a(R,{variant:"secondary",onClick:e.onCancel,disabled:e.restoring,children:"Cancel"}),a(R,{onClick:()=>e.onRestore({row:n,skipped:o.skipped,manual:o.preview.manual}),disabled:e.busy||o.checking||l,children:e.restoring?"Restoring\u2026":o.checking?"Checking\u2026":ks(r.count)})]});return u(oe,{idBase:e.idBase,id:"backups",actions:y,children:[a(no,{title:`Restore ${n.title}`,id:i,focusable:!0}),l?a(D,{tone:"warning",children:"Install Spicetify Marketplace to restore a backup."}):null,o.unapproved?a(D,{tone:"warning",children:"An install this Spotify account hasn't approved made this backup. Its items stay off unless you turn them on."}):null,u(kn,{label:"What this restore changes",children:[r.changes.map(d=>a(ky,{change:d,onInclude:g=>o.allow(d.key,g),disabled:e.busy},d.key)),r.manual.map(d=>a(Ae,{leading:a(nt,{kind:hy[d.type]}),name:d.name,meta:a(G,{parts:[by[d.type],d.scheme]}),end:a("span",{className:"syncify-change-label syncify-cap",children:"Add manually"})},`${d.type}:${d.name}`)),r.unchanged.length>0?a(Ae,{name:u("span",{className:"syncify-restore-fold",children:[r.unchanged.length," more stay the same"]}),end:a(R,{variant:"text","aria-expanded":s,onClick:()=>c(!s),children:s?"Hide":"Show"})}):null,s?r.unchanged.map(d=>a(wy,{item:d},d.key)):null]}),r.warnings.map(d=>a(D,{tone:"warning",children:d},d)),e.localIsUnsaved?a(D,{tone:"warning",children:"Your current setup isn't backed up."}):null]})}function ky(e){let{change:n}=e;return a(Ae,{leading:a(nt,{kind:Ss[n.type]}),name:n.name,meta:n.note?a(G,{parts:[n.note]}):void 0,end:u(A,{children:[a("span",{className:"syncify-change-label syncify-cap","data-change":n.change,children:n.change}),n.optional?a(Yi,{checked:n.included,onChange:e.onInclude,label:`Restore ${n.name}`,disabled:e.disabled}):null]})})}function wy(e){return a(Ae,{leading:a(nt,{kind:Ss[e.item.type]}),name:e.item.name,meta:e.item.note?a(G,{parts:[e.item.note]}):void 0})}function xs(e){var I,O,N,H,V;let{remote:n,local:t}=e,i=ne("backup"),[o,r]=m(null),[s,c]=m(null),l=q(null);if(M(()=>{var E;s||!l.current||((E=document.getElementById(l.current))==null||E.focus(),l.current=null)},[s]),s&&t)return a(vs,{idBase:e.idBase,row:s,local:t,localIsUnsaved:t.installedItemCount>0&&!Sy(t.hash,n),busy:e.busy,restoring:e.restoring,onCancel:()=>c(null),onRestore:E=>{var _;return e.onRestore(w(p({},E),{linkedHash:(_=o==null?void 0:o.hash)!=null?_:null}))}},s.backup.payload_hash);async function y(E){if(!E){r(null);return}r({hash:E,remote:null});try{let _=await Ze(e.config,E);r({hash:E,remote:_})}catch(_){r(null),e.onError(_)}}let d=o?o.remote:n,g=(I=t==null?void 0:t.hash)!=null?I:null,h=E=>`${i}-${E.backup.payload_hash}`,x=(E,_)=>E.map(te=>gs(te,_,g)),v=x((O=d==null?void 0:d.backups)!=null?O:[],"backup"),P=x(d!=null&&d.safetyCopy?[d.safetyCopy]:[],"safety-copy"),b=o?[]:x((N=n==null?void 0:n.unapproved)!=null?N:[],"unapproved");function k(E){return a(Ae,{id:h(E),name:E.name,nameMark:E.kind==="safety-copy"?a(Ji,{className:"syncify-safety-mark"}):E.kind==="unapproved"?a(be,{tone:"warning"}):void 0,meta:a(G,{parts:E.meta}),end:E.current?a("span",{className:"syncify-row-status syncify-cap",children:"Current"}):void 0,onOpen:E.current?void 0:()=>{l.current=h(E),c(E)},openLabel:`Preview restore of ${E.title}`,disabled:e.busy},`${E.kind}-${E.backup.payload_hash}-${E.backup.metadata.last_sync_datetime}`)}return u(oe,{idBase:e.idBase,id:"backups",children:[e.notices,t&&!t.marketplaceAvailable?a(D,{tone:"warning",children:"Install Spicetify Marketplace to restore a backup."}):null,!e.lockedBy&&e.otherAccounts.length>0?a(ye,{label:"Show backups from",children:a(et,{label:"Show backups from",trigger:{value:(V=(H=e.otherAccounts.find(E=>E.hash===(o==null?void 0:o.hash)))==null?void 0:H.label)!=null?V:"This Spotify account"},items:[{hash:null,label:"This Spotify account"},...e.otherAccounts].map(E=>{var _;return{label:E.label,checked:((_=o==null?void 0:o.hash)!=null?_:null)===E.hash,onSelect:()=>{y(E.hash)}}}),disabled:e.busy})}):null,e.lockedBy?a("p",{className:"syncify-tab-text",children:e.lockedBy==="not_owner"?"Sign in with the account that secured them":"Sign in to see and restore your backups"}):(!n||!t)&&e.failed?null:!n||!t||o&&!o.remote?u(kn,{label:"Loading backups",children:[a(qt,{}),a(qt,{})]}):v.length+P.length+b.length===0?o?a("p",{className:"syncify-tab-text",children:"No backups yet."}):null:u(kn,{label:"Backups",children:[v.map(k),P.length>0?a(Yt,{}):null,P.map(k),b.length>0?a(Yt,{}):null,b.map(k)]})]})}function Sy(e,n){return n?[...n.backups,...n.safetyCopy?[n.safetyCopy]:[]].some(t=>t.payload_hash===e):!1}function Cs(e,n){let[t,i]=m(!1),[o,r]=m(null),s=Me(n);return M(()=>{if(!t)return;let c=l=>{var d;if(!((d=document.getElementById(e))!=null&&d.isConnected)){i(!1),r(null);return}l.preventDefault(),l.stopImmediatePropagation();let y=gr(l);if(y.kind!=="ignore"){if(y.kind==="cancel"){i(!1),r(null);return}if(y.kind==="error"){r(y.message);return}if(hr(y.shortcut)){r(`${Wn(y.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}i(!1),s.current(y.shortcut)}};return window.addEventListener("keydown",c,!0),()=>window.removeEventListener("keydown",c,!0)},[t,e,s]),{recording:t,error:o,clearError:()=>r(null),toggle:()=>{r(null),i(!t)}}}var Is=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function Ns(e){var d,g;let{config:n}=e,[t]=m(()=>wr()),i=ne("shortcut"),o=Cs(i,l),r=t?n.entryPoint:"topbar",s=o.recording?"Press keys":n.shortcut?Wn(n.shortcut):"Off";function c(h){vr(h),e.onConfigChange(h)}function l(h){c(w(p({},n),{shortcut:h})),Li(h),o.clearError()}function y(h){c(w(p({},n),{entryPoint:h})),Ht(h)}return u(oe,{idBase:e.idBase,id:"settings",children:[u(tt,{children:[a(to,{label:"Automatic backup when Spotify starts",checked:n.autoBackupEnabled&&!e.unsupported,onChange:h=>c(w(p({},n),{autoBackupEnabled:h})),disabled:e.busy||e.unsupported}),a(ye,{label:"Open Syncify from",children:a(et,{label:"Open Syncify from",trigger:{value:(g=(d=Is.find(h=>h.value===r))==null?void 0:d.label)!=null?g:""},items:Is.map(h=>({label:h.label,checked:h.value===r,onSelect:()=>y(h.value)})),disabled:!t})}),a(ye,{label:"Keyboard shortcut",value:o.recording&&!o.error?"Press a key combination, or Esc to cancel":void 0,children:u("span",{className:"syncify-settings-shortcut",children:[o.recording?null:n.shortcut?a(R,{variant:"text",onClick:()=>l(null),children:"Turn off"}):a(R,{variant:"text",onClick:()=>l(hn),children:"Use default"}),a(Qi,{id:i,keys:s,recording:o.recording,"aria-label":o.recording?`${s} for a new keyboard shortcut`:`${s}, change the keyboard shortcut`,onClick:o.toggle})]})})]}),o.error?a(D,{tone:"warning",live:!0,children:o.error}):null,t?n.entryPoint==="menu"&&!n.shortcut?a(D,{tone:"warning",children:"Keep a shortcut in case a Spotify update breaks the profile menu."}):null:a(D,{tone:"info",children:"The profile menu isn't available in this Spicetify version."})]})}async function Zt(e){var n;try{return await navigator.clipboard.writeText(e),!0}catch(t){let i=(n=Spicetify.Platform)==null?void 0:n.ClipboardAPI;return i!=null&&i.copy?(await i.copy(e),!0):!1}}function ao(){return u("svg",{className:"syncify-warning-icon",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[a("path",{d:"M12 3 2 21h20z"}),a("path",{d:"M12 10v5"}),a("path",{d:"M12 18h.01"})]})}function Qt(){return a("svg",{className:"syncify-chevron",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:a("path",{d:"m9 6 6 6-6 6"})})}function Rs(){return u("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[a("path",{d:"M18 6 6 18"}),a("path",{d:"m6 6 12 12"})]})}var Es={added:{mark:"+",label:"Added"},removed:{mark:"\u2212",label:"Removed"},unchanged:{mark:"=",label:"Unchanged"}},ro=[["extension","Extensions"],["theme","Themes"],["snippet","Snippets"]],vy={extension:"extension",custom_app:"custom app",theme:"theme"};function Ps(e){let{items:n,counts:t,manual:i,theme:o}=e.preview,r=[...e.off].filter(s=>!e.allowed.has(s)).length;return u(A,{children:[u("div",{className:"syncify-chips","aria-label":"What changes on this device",children:[t.added?u("span",{className:"syncify-chip","data-change":"added",children:["+",t.added," added"]}):null,t.removed?u("span",{className:"syncify-chip","data-change":"removed",children:["\u2212",t.removed," removed"]}):null,t.unchanged?u("span",{className:"syncify-chip",children:[t.unchanged," unchanged"]}):null,i.length?u("span",{className:"syncify-chip",children:[i.length," to add manually"]}):null,o&&(!e.off.has(o.key)||e.allowed.has(o.key))?u("span",{className:"syncify-chip",children:["Switches your theme to ",o.name]}):null,r?u("span",{className:"syncify-chip","data-change":"off",children:[r," off"]}):null]}),n.length||i.length?u("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":e.expanded,"aria-controls":"syncify-restore-changes",onClick:e.onToggle,children:[e.expanded?"Hide changes":"Show changes",a(Qt,{})]}):null,e.expanded?u("div",{className:"syncify-changes",id:"syncify-restore-changes",children:[ro.map(([s,c])=>{let l=n.filter(y=>y.type===s);return l.length===0?null:u("section",{"aria-label":c,children:[a("h5",{className:"syncify-change-group",children:c}),a("ul",{className:"syncify-change-list",children:l.map(y=>{var d,g;return u("li",{className:"syncify-change",children:[a("span",{className:"syncify-mark","data-change":y.change,role:"img","aria-label":Es[y.change].label,children:Es[y.change].mark}),u("span",{className:"syncify-change-name",children:[y.name,y.repo?u("span",{className:"syncify-change-detail",children:[a(en,{}),y.repo]}):null]}),e.checks.has(y.key)?a(so,{check:e.checks.get(y.key)}):e.unapproved&&e.off.has(y.key)?u("span",{className:"syncify-source","data-warning":"true",children:[a(ao,{}),"Not approved"]}):null,e.off.has(y.key)&&!((d=e.fixed)!=null&&d.has(y.key))?u("label",{className:"syncify-item-switch",children:[a("input",{type:"checkbox",checked:e.allowed.has(y.key),onChange:h=>e.onAllow(y.key,h.currentTarget.checked)}),(g=e.switchLabel)!=null?g:"Restore"]}):null]},y.key)})})]},s)}),i.length?u("section",{"aria-label":"Add manually",children:[a("h5",{className:"syncify-change-group",children:"Add manually"}),a("ul",{className:"syncify-change-list",children:i.map(s=>u("li",{className:"syncify-change",children:[a("span",{className:"syncify-mark","aria-hidden":"true"}),u("span",{className:"syncify-change-name",children:[s.name,u("span",{className:"syncify-change-detail",children:[a(en,{}),vy[s.type],s.scheme?`, ${s.scheme}`:""]})]})]},`${s.type}:${s.name}`))})]}):null]}):null]})}var xy={host:"Loads from outside GitHub",repo:"Its code is in a different repo than the one it names",blocked:"On Marketplace's block list",catalog:"Not in Marketplace's catalog",unchecked:"GitHub couldn't be reached to check it",custom:"A snippet made in Marketplace, not from its list"};function so(e){let{check:n}=e,t=fe(n),i=n.kind==="host"?`Code from ${n.host}`:n.kind==="repo"?`Code from ${n.repo}`:n.kind==="blocked"?"Blocked by Marketplace":n.kind==="catalog"?"Not in Marketplace":n.kind==="unchecked"?"Not checked":"Custom";return u("span",{className:"syncify-source","data-warning":t?"true":"false",title:xy[n.kind],children:[t?a(ao,{}):null,i]})}var Cy=600,Iy=[["add","Add to my setup"],["replace","Replace my setup"]];function _s(e){var mo;let{session:n}=e,[t,i]=m(""),[o,r]=m(!1),[s,c]=m(null),[l,y]=m(null),[d,g]=m(null),[h,x]=m(null),[v,P]=m("add"),[b,k]=m(!1),[I,O]=m(()=>new Set),[N,H]=m(null),[V,E]=m(void 0),[_,te]=m(!1),[W,De]=m(null),[tn,ai]=m(0),xn=q(!1),[Oe,ri]=m(null),[Cn,j]=m(null),[J,ke]=m(null),[X,Ne]=m(""),[on,an]=m(null),[K,we]=m(null),[rn,rt]=m(""),[Z,Ue]=m(null),[Y,Se]=m(!1),[He,st]=m(!1),[ct,sn]=m(null),[z,Re]=m(null),[lt,$e]=m(null),[Ke,In]=m(!1),[ze,Nn]=m(null),Fe=q(0),F=Q(()=>l?Qa(l.file,l.items,e.localItems,e.localConfig,e.localTheme,v):null,[l,e.localItems,e.localConfig,e.localTheme,v]),ve=Q(()=>{if(!F||!l)return null;let f=new Set(l.items.map(C=>C.key));return F.items.filter(C=>C.change!=="removed"&&f.has(C.key)&&(v==="replace"||C.isNew))},[F,l,v]),ce=Q(()=>ve?pn(ve):null,[ve]),je=Q(()=>new Map([...N!=null?N:[],...ce!=null?ce:[]]),[N,ce]),We=Q(()=>F&&V!==void 0?er(F,V):new Set,[F,V]),Rn=Q(()=>{var f;return new Set([...((f=F==null?void 0:F.items)!=null?f:[]).filter(C=>{var B;return C.change!=="removed"&&C.isNew&&(fe(je.get(C.key))||((B=je.get(C.key))==null?void 0:B.kind)==="unchecked")}).map(C=>C.key),...We])},[F,je,We]),ut=[...Rn].filter(f=>We.has(f)||!I.has(f)),En=F!==null&&(N===null||V===void 0),cn=Z?Z.items.filter(f=>!Z.leftOut.has(f.key)):[],Pn=!!(W&&Oe!==null&&W.length>=Oe),Ye=K!==null&&K.code===null&&!Cn,S=Ye?Ga(X):null,[$,xe]=m(null);M(()=>{if(!S){xe(null);return}let f=window.setTimeout(()=>xe(S),Cy);return()=>window.clearTimeout(f)},[S]),M(()=>{if(H(null),!ve||!ce)return;[...ce.values()].some(fe)&&k(!0);let f=!0;return mn(ve,ce).then(C=>{f&&(H(C),[...C.values()].some(fe)&&k(!0))}),()=>{f=!1}},[ve,ce]),M(()=>{sr().then(g)},[]),M(()=>{De(null),we(null),Re(null),xn.current=!1,n&&Tn()},[n==null?void 0:n.token]);async function yt(f){let C=f!=null?f:Va(t);if(c(null),y(null),!C){c(Lt(new T("no_code")));return}r(!0),x(f!=null?f:null);try{let B=await rr(C);P("add"),O(new Set),k(!1),y({file:B,items:ee(B.keys),pick:f!==void 0}),Ei().then(E)}catch(B){c(Lt(B))}finally{r(!1),x(null)}}async function Zs(){if(!(!l||!F)){te(!0),c(null);try{await Ir(e.config,l.file,v,ut,V!=null?V:null,l.pick),Spicetify.showNotification("Syncify: setup loaded. Reloading\u2026"),Qn(F.manual,"share"),setTimeout(()=>window.location.reload(),1e3)}catch(f){te(!1),c(f instanceof Vn?`${f.message} ${Ry(f.reason)}`:f instanceof Error?f.message:String(f))}}}async function Tn(){var f,C;an(null);try{let B=await Dt();De(B.codes),xn.current||(xn.current=!0,ai(B.newHearts)),e.onCodeCount(B.codes.length),ri(B.max),j(B.profile),e.onHandle((C=(f=B.profile)==null?void 0:f.handle)!=null?C:null),ke(B.suggestedHandle)}catch(B){si(B,an)}}function si(f,C){C(Lt(f,Oe)),f instanceof T&&f.code==="signed_out"&&e.onSignedOut()}async function po(f){var B;let C=++Fe.current;we({code:f}),rt((B=f==null?void 0:f.name)!=null?B:""),Ne(J!=null?J:""),Ue(null),Se(!1),sn(null),Re(null),$e(null);try{let qe=await ue(),go=await Xa(ee(qe),qe);if(C!==Fe.current)return;Ue(p({keys:qe},go)),go.leftOut.size>0&&Se(!0)}catch(qe){if(C!==Fe.current)return;we(null),sn(qe instanceof Error?qe.message:String(qe))}}function Qs(){Fe.current+=1,we(null),Ue(null)}async function ec(){if(!K||!Z)return;st(!0),sn(null);let f=Za(Z.keys,cn);try{let C=K.code?await or(K.code.code,rn.trim(),f):await tr(rn.trim(),f,Ye?X.trim():void 0);Re(w(p({},C),{outcome:K.code?"updated":"created"})),we(null),Ue(null),await Tn()}catch(C){if(C instanceof T&&C.code==="same_setup"&&C.share){Re(w(p({},C.share),{leftOut:0,outcome:"existing"})),we(null),Ue(null);return}si(C,sn),C instanceof T&&C.code==="publish_failed"&&(we(null),Tn())}finally{st(!1)}}async function nc(f){In(!0),an(null);try{await ar(f),$e(null),(z==null?void 0:z.code)===f&&Re(null),await Tn()}catch(C){si(C,an)}finally{In(!1)}}async function dt(f,C){await Zt(f)&&(Nn(C),setTimeout(()=>Nn(B=>B===C?null:B),2e3))}return u(A,{children:[u("form",{className:"syncify-field syncify-share-load",noValidate:!0,onSubmit:f=>{f.preventDefault(),!o&&!_&&t.trim()&&yt()},children:[a("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-input",children:"Load a setup"}),a("input",{className:"syncify-input syncify-share-input",id:"syncify-share-input",type:"text",placeholder:"Paste a code or a link",autoComplete:"off",spellCheck:!1,value:t,onChange:f=>i(f.currentTarget.value),disabled:_}),a("button",{className:"syncify-button secondary",type:"submit",disabled:o||_||!t.trim(),children:o?"Loading\u2026":"Preview"})]}),s?a("div",{className:"syncify-alert","data-kind":"error",role:"alert",children:s}):null,l&&F?u("div",{className:"syncify-confirm",children:[u("span",{className:"syncify-share-title",children:[u("p",{className:"syncify-confirm-title",children:["Load ",(mo=l.file.name)!=null?mo:pe(l.file.code),"?"]}),l.file.creator?u("button",{className:"syncify-text-button",type:"button",title:"Open their profile",onClick:()=>window.open(ir(l.file.creator),"_blank","noopener,noreferrer"),children:["by @",l.file.creator]}):null]}),a("div",{className:"syncify-share-modes",role:"radiogroup","aria-label":"How to load it",children:Iy.map(([f,C])=>u("button",{className:"syncify-backup",role:"radio","aria-checked":v===f,"data-selected":v===f?"true":"false",type:"button",onClick:()=>P(f),disabled:_,children:[a("span",{className:"syncify-radio","aria-hidden":"true"}),a("span",{className:"syncify-backup-text",children:a("span",{children:C})})]},f))}),a(Ps,{preview:F,checks:je,off:Rn,fixed:We,switchLabel:"Load",allowed:I,unapproved:!1,onAllow:(f,C)=>{let B=new Set(I);C?B.add(f):B.delete(f),O(B)},expanded:b,onToggle:()=>k(!b)}),e.marketplaceAvailable===!1?a("p",{className:"syncify-muted",children:"Install Spicetify Marketplace to load a setup."}):u("div",{className:"syncify-actions",children:[a("button",{className:"syncify-button secondary",type:"button",onClick:()=>y(null),disabled:_,children:"Cancel"}),a("button",{className:"syncify-button",type:"button",onClick:()=>{Zs()},disabled:_||En||e.busy,children:_?"Applying\u2026":En?"Checking\u2026":"Apply"})]})]}):null,d?u("section",{className:"syncify-share-part","aria-label":d.length>0?"Syncify picks":"Discover",children:[d.length>0?a("h5",{className:"syncify-change-group",children:"Syncify picks"}):null,u("ul",{className:"syncify-change-list syncify-share-codes",children:[d.map(f=>u("li",{className:"syncify-setting",children:[u("span",{className:"syncify-setting-text",children:[a("span",{className:"syncify-account-email",children:f.name}),u("span",{className:"syncify-muted syncify-pick-detail",children:[a(Py,{pick:f}),Le(f.extensions+f.themes+f.snippets,"item")]})]}),a("button",{className:"syncify-text-button",type:"button",disabled:o||_,onClick:()=>{yt(f.code)},children:h===f.code?"Loading\u2026":"Preview"})]},f.code)),u("li",{className:"syncify-setting",children:[u("span",{className:"syncify-setting-text",children:[a("span",{children:"Find more setups"}),a("span",{className:"syncify-muted",children:"People's setups on Discover"})]}),a("button",{className:"syncify-button secondary",type:"button",onClick:()=>window.open(`${L().webUrl.replace(/\/+$/,"")}/discover`,"_blank","noopener,noreferrer"),children:"Open Discover"})]})]})]}):null,n===void 0?null:n?u(A,{children:[u("div",{className:"syncify-setting syncify-share-part",children:[u("span",{className:"syncify-setting-text",children:[a("span",{children:"Share this setup"}),a("span",{className:"syncify-muted",children:W&&W.length>0&&Oe!==null?Ey(Oe-W.length):"Get a code anyone can load"})]}),a("button",{className:"syncify-button secondary",type:"button",onClick:()=>{po(null)},disabled:K!==null||W===null||Pn||e.marketplaceAvailable===!1,title:Pn?"Delete a code to make another":void 0,children:"Share"})]}),K?u("div",{className:"syncify-confirm",children:[a("p",{className:"syncify-confirm-title",children:K.code?`Update ${pe(K.code.code)} with this setup?`:"Share this setup?"}),Z?u(A,{children:[u("div",{className:"syncify-chips","aria-label":"What goes in",children:[u("span",{className:"syncify-chip",children:[cn.length," going in"]}),Z.leftOut.size?u("span",{className:"syncify-chip","data-change":"off",children:[Z.leftOut.size," left out"]}):null]}),Z.items.length?u("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":Y,"aria-controls":"syncify-share-items",onClick:()=>Se(!Y),children:[Y?"Hide items":"Show items",a(Qt,{})]}):null,Y?a(Ny,{items:Z.items,leftOut:Z.leftOut}):null,u("div",{className:"syncify-share-fields",children:[a("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-name",children:"Setup name"}),a("input",{id:"syncify-share-name",className:"syncify-input",type:"text",placeholder:"Optional",maxLength:Ya,value:rn,onChange:f=>rt(f.currentTarget.value),disabled:He}),Ye?u(A,{children:[a("p",{className:"syncify-muted syncify-share-handle-note",children:"It's your first time creating a share code. Pick a handle for your profile:"}),a("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-handle",children:"Your handle"}),u("span",{className:"syncify-input syncify-handle-input",children:[a("span",{"aria-hidden":"true",children:"@"}),a("input",{id:"syncify-share-handle",type:"text",placeholder:"handle",autoComplete:"off",spellCheck:!1,maxLength:Pi,value:X,onChange:f=>Ne(f.currentTarget.value.replace(/^@/,"")),disabled:He})]}),X&&$?a("span",{className:"syncify-share-handle-problem",role:"alert",children:$}):null]}):null]})]}):a("p",{className:"syncify-muted",children:"Checking your items\u2026"}),u("div",{className:"syncify-actions",children:[a("button",{className:"syncify-button secondary",type:"button",onClick:Qs,disabled:He,children:"Cancel"}),a("button",{className:"syncify-button",type:"button",onClick:()=>{ec()},disabled:!Z||cn.length===0||He||Ye&&S!==null,children:Z?He?K.code?"Updating\u2026":"Creating\u2026":K.code?"Update":"Create code":"Checking\u2026"})]})]}):null,ct?a("div",{className:"syncify-alert","data-kind":"error",role:"alert",children:ct}):null,z?u("div",{className:"syncify-confirm",children:[u("span",{className:"syncify-manual-header",children:[a("span",{className:"syncify-confirm-title",children:z.outcome==="existing"?"You already shared this setup":z.outcome==="updated"?"Code updated":"Your code is ready"}),a("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>Re(null),children:a(Rs,{})})]}),u("span",{className:"syncify-code syncify-share-code",children:[a("code",{children:pe(z.code)}),a("button",{className:"syncify-text-button",type:"button",onClick:()=>{dt(pe(z.code),"saved-code")},children:ze==="saved-code"?"Copied":"Copy"}),z.link?a("button",{className:"syncify-text-button",type:"button",onClick:()=>{dt(z.link,"saved-link")},children:ze==="saved-link"?"Copied":"Get link"}):null]}),z.leftOut?a("p",{className:"syncify-muted",children:z.leftOut===1?"1 snippet isn't in Marketplace's list anymore, so it was left out.":`${z.leftOut} snippets aren't in Marketplace's list anymore, so they were left out.`}):null,z.outcome==="created"&&d?u("div",{className:"syncify-setting",children:[u("span",{className:"syncify-setting-text",children:[a("span",{children:"Post it on Discover"}),a("span",{className:"syncify-muted",children:"Let people find it and try it"})]}),a("button",{className:"syncify-button secondary",type:"button",onClick:()=>window.open(`${L().webUrl.replace(/\/+$/,"")}/discover?post=${encodeURIComponent(z.code)}`,"_blank","noopener,noreferrer"),children:"Post"})]}):null]}):null,on?u("div",{className:"syncify-alert","data-kind":"error",role:"alert",children:[a("span",{children:on}),a("span",{className:"syncify-alert-actions",children:a("button",{className:"syncify-text-button",type:"button",onClick:()=>{Tn()},children:"Try again"})})]}):null,W&&W.length>0?u("section",{"aria-label":"Your codes",children:[u("h5",{className:"syncify-change-group syncify-codes-heading",children:["Your codes",tn>0?a("span",{className:"syncify-tag","data-tone":"new",children:Le(tn,"new heart")}):null]}),a("ul",{className:"syncify-change-list syncify-share-codes",children:W.map(f=>{var C;return u("li",{className:"syncify-setting",children:[u("span",{className:"syncify-setting-text",children:[a("span",{className:"syncify-account-email",children:(C=f.name)!=null?C:pe(f.code)}),a("span",{className:"syncify-muted",children:lt===f.code?f.posted?"Delete it? Its link stops working and its post comes off Discover.":"Delete it? Its link stops working.":a(G,{parts:[f.name?pe(f.code):null,Le(f.item_count,"item"),`Used by ${f.imports}`,f.hearts===null?null:Le(f.hearts,"heart")]})})]}),a("span",{className:"syncify-account-actions",children:lt===f.code?u(A,{children:[a("button",{className:"syncify-text-button",type:"button",onClick:()=>$e(null),disabled:Ke,children:"Cancel"}),a("button",{className:"syncify-text-button","data-danger":"true",type:"button",onClick:()=>{nc(f.code)},disabled:Ke,children:Ke?"Deleting\u2026":"Delete"})]}):u(A,{children:[a("button",{className:"syncify-text-button",type:"button",onClick:()=>{po(f)},disabled:K!==null||Ke,children:"Update"}),a("button",{className:"syncify-text-button",type:"button",onClick:()=>{dt(pe(f.code),`code:${f.code}`)},children:ze===`code:${f.code}`?"Copied":"Copy"}),f.link?a("button",{className:"syncify-text-button",type:"button",onClick:()=>{dt(f.link,`link:${f.code}`)},children:ze===`link:${f.code}`?"Copied":"Get link"}):null,a("button",{className:"syncify-text-button",type:"button",onClick:()=>$e(f.code),disabled:Ke,children:"Delete"})]})})]},f.code)})})]}):null]}):u("div",{className:"syncify-setting syncify-share-part",children:[u("span",{className:"syncify-setting-text",children:[a("span",{children:"Share this setup"}),a("span",{className:"syncify-muted",children:"Get a code anyone can load"})]}),a("button",{className:"syncify-button secondary",type:"button",onClick:e.onSignIn,children:"Sign in to share"})]})]})}var Ts={in:{mark:"+",label:"Goes in"},out:{mark:"\u2212",label:"Left out"}};function Ny(e){return a("div",{className:"syncify-changes",id:"syncify-share-items",children:ro.map(([n,t])=>{let i=e.items.filter(o=>o.type===n).sort((o,r)=>o.name.localeCompare(r.name));return i.length===0?null:u("section",{"aria-label":t,children:[a("h5",{className:"syncify-change-group",children:t}),a("ul",{className:"syncify-change-list",children:i.map(o=>{let r=e.leftOut.get(o.key),s=r?Ts.out:Ts.in;return u("li",{className:"syncify-change",children:[a("span",{className:"syncify-mark","data-change":r?"removed":"added",role:"img","aria-label":s.label,children:s.mark}),u("span",{className:"syncify-change-name",children:[o.name,o.repo?u("span",{className:"syncify-change-detail",children:[a(en,{}),o.repo]}):null]}),r?a(so,{check:r}):null]},o.key)})})]},n)})})}function Ry(e){return e instanceof se?"Sign in to back up.":e instanceof Error?e.message:String(e)}function Ey(e){return e<=0?"No codes left, delete one to make another":`${e} ${e===1?"code":"codes"} left`}var ei=12;function Py(e){let{extensions:n,themes:t,snippets:i}=e.pick,o=[...Array(Math.min(n,ei)).fill("extension"),...Array(Math.min(t,ei)).fill("theme"),...Array(Math.min(i,ei)).fill("snippet")].slice(0,ei);return a("span",{className:"syncify-pips","aria-hidden":"true",children:o.map((r,s)=>a("span",{className:"syncify-pip","data-kind":r},s))})}var co="syncify:share-code-count",lo="syncify:handle";function Ty(){var n,t;let e=Number((t=(n=Spicetify.LocalStorage)==null?void 0:n.get(co))!=null?t:NaN);return Number.isInteger(e)&&e>=0?e:null}function _y(){var n;let e=(n=Spicetify.LocalStorage)==null?void 0:n.get(lo);return e==null?void 0:e||null}function As(){let[e,n]=m(()=>Ty()),[t,i]=m(()=>_y()),o=ie(c=>{var l,y;c===null?(l=Spicetify.LocalStorage)==null||l.remove(co):(y=Spicetify.LocalStorage)==null||y.set(co,String(c)),n(c)},[]),r=ie(c=>{var l,y;c===void 0?(l=Spicetify.LocalStorage)==null||l.remove(lo):(y=Spicetify.LocalStorage)==null||y.set(lo,c!=null?c:""),i(c)},[]),s=ie(()=>{o(null),r(void 0)},[o,r]);return{codeCount:e,handle:t,saveCodeCount:o,saveHandle:r,forget:s}}var Ay=2e3;function Ms(e){let{install:n}=e,t=!n||n.trusted?null:n.refused?"This Spotify account refused backups from this install. Sign in to back up from it.":"This install isn't approved yet. Its backups are kept apart until you approve it from another install or sign in.";return u(A,{children:[e.nudge?a(D,{tone:"warning",actions:u(A,{children:[a(R,{variant:"subtle",onClick:e.onHideNudge,disabled:e.securing,children:"Not now"}),a(R,{size:"small",onClick:e.onSecure,disabled:e.securing,children:e.securing?"Securing\u2026":"Secure"})]}),children:"Your backup isn't secured. Anyone who knows your Spotify username can restore it."}):null,t?a(D,{tone:"info",children:t}):null,e.restoreResult?a(My,{manual:e.restoreResult.manual}):null]})}function My(e){let[n,t]=m(!1),i=Vr(e.manual).join(`
`);if(M(()=>{if(!n)return;let r=setTimeout(()=>t(!1),Ay);return()=>clearTimeout(r)},[n]),!i)return null;let o=e.manual.length;return u(D,{tone:"info",actions:u(A,{children:[a(R,{variant:"text",onClick:()=>{Zt(i).then(t)},children:n?"Copied":"Copy"}),a(R,{variant:"subtle",onClick:Wr,children:"Dismiss"})]}),children:[o===1?"1 isn't from Marketplace. Add it in a terminal:":`${o} aren't from Marketplace. Add them in a terminal:`,a("pre",{className:"syncify-commands",children:a("code",{children:i})})]})}function Bs(e){let{message:n}=e;return a(D,{tone:n.kind,actions:u(A,{children:[n.kind==="error"?a(R,{variant:"text",onClick:e.onTryAgain,disabled:e.busy,children:"Try again"}):null,a(R,{variant:"subtle",onClick:e.onDismiss,children:"Dismiss"})]}),children:n.text})}function Ls(e){let n=By(e);return n.backedUp&&e.latest?w(p({},n),{line:[`Backed up ${Sn(e.latest.metadata.last_sync_datetime)}`,`${ot(e.localItemCount)} on this device`]}):w(p({},n),{line:[n.title,...n.detail]})}function By(e){let n={backedUp:!1,supportAsk:null},t=`${ot(e.localItemCount)} on this device`;return e.restoreResult&&!e.unsupported?Ly(e.restoreResult):e.unsupported?w(p({},n),{title:"Update Syncify to keep backing up",detail:["Your backups are safe"],action:"how-to-update"}):e.locked?w(p({},n),{title:"Sign in to restore",detail:[e.locked==="not_owner"?"Secured by another account":"This backup is secured"],action:"sign-in"}):e.activity==="backing-up"?w(p({},n),{title:"Backing up\u2026",detail:[],action:"back-up"}):e.checked?e.latest?e.localHash&&!e.backedUp?w(p({},n),{title:"Changes since your last backup",detail:Dy(e.latest,e.latestItems,e.localItems,e.localConfig),action:"back-up"}):w(p({},n),{title:"Everything is backed up",detail:[`Last backup ${Sn(e.latest.metadata.last_sync_datetime)}`,t],action:null,backedUp:!0}):w(p({},n),{title:"No backup yet",detail:["Save your extensions and themes to restore them after a reinstall or on another computer."],action:"back-up"}):e.checkError?w(p({},n),{title:"Couldn't check your backup",detail:[e.checkError],action:"try-again"}):w(p({},n),{title:"Checking your backup\u2026",detail:[],action:null})}function Ly(e){let n=e.loaded===e.total,t=e.kind==="share";return{title:n?t?"Setup loaded":"Backup restored":`${t?"Loaded":"Restored"} ${e.loaded} of ${e.total}`,detail:[n?e.total===0?"Nothing from Marketplace to load":`${e.loaded} of ${e.total} loaded`:"Missing something? Reload Spotify once more."],action:n?null:"reload",backedUp:!1,supportAsk:n?t?"Syncify set it up for you?":"Syncify saved your setup?":null}}function Dy(e,n,t,i){var g;let o=new Set(n),r=new Set(t),s=t.filter(h=>!o.has(h)).length,c=n.filter(h=>!r.has(h)).length,l=(g=e.spicetify_config)!=null?g:null,y=!!(i&&!l),d=!y&&(i&&l?!Ia(i,l):i!==l);return[s?`${s} added`:null,c?`${c} removed`:null,d?"Spicetify config changed":null,y?"Spicetify config not saved yet":null,`Last backup ${Sn(e.metadata.last_sync_datetime)}`].filter(h=>h!==null)}function Ds(e,n){return(e==null?void 0:e.status)==="pending"&&!e.mine?w(p({kind:"claim"},Vt(e)),{canAnswer:!e.not_me}):n?{kind:"install",title:Xt(n),install:n}:null}var Oy=3,uo={exists:!1,payload:null,backups:[],safetyCopy:null,claim:null,unapproved:[],install:null,nudge:!1},nn=null;function Os(e){var d,g,h;let[n,t]=m(()=>nn),[i,o]=m(void 0),r=ie(x=>{nn=x,t(x)},[]),s=ie(async()=>{let x,v=null;try{x=await Ze(e)}catch(I){if(!(I instanceof se))throw I;x=uo,v=I.code}let P=await re().catch(()=>null),b=P?await Nr(e).catch(()=>null):null,k=P?await re().catch(()=>null):null;return r({remote:x,lockedBy:v,claims:k?b:null}),o(k),v},[e,r]),c=ie(()=>{re().catch(()=>null).then(x=>o(v=>v!=null?v:x))},[]),l=ie(x=>{var b;let v=nn!=null?nn:{remote:uo,lockedBy:null,claims:null},{remote:P}=v;r(w(p({},v),{remote:w(p({},P),{exists:!0,payload:x,backups:[x,...P.backups.filter(k=>k.payload_hash!==x.payload_hash)].slice(0,Oy),safetyCopy:((b=P.safetyCopy)==null?void 0:b.payload_hash)===x.payload_hash?null:P.safetyCopy})}))},[r]),y=ie(()=>{o(null),nn&&r(w(p({},nn),{claims:null}))},[r]);return{check:n,remote:(d=n==null?void 0:n.remote)!=null?d:uo,lockedBy:(g=n==null?void 0:n.lockedBy)!=null?g:null,claims:(h=n==null?void 0:n.claims)!=null?h:null,session:i,setSession:o,refresh:s,readSession:c,addBackup:l,forgetClaims:y}}function Us(){let[e,n]=m(null),[t,i]=m(!1),o=ie(async()=>{try{let r=await _t();return n(r),i(!1),r}catch(r){throw i(!0),r}},[]);return{local:e,localFailed:t,refreshLocal:o}}var Uy=600*1e3;function Hs(){let[e,n]=m(null);return M(()=>{let t=L();if(!Fi(t.version))return;let i=!0;return es(t.releasesUrl).then(o=>{i&&o&&ji(o,t.version)>0&&n(o)}),()=>{i=!1}},[]),e}function $s(){let[e,n]=m(()=>Fr()),[t]=m(()=>Date.now());return M(()=>jr(n),[]),{result:e,recent:!!(e&&t-e.at<Uy)}}function Ks(e){let n=L(),t=[["Report an issue",n.issueUrl],["GitHub",n.githubUrl],["Discord",n.discordUrl],["Support on Ko-fi",n.kofiUrl]];return u("footer",{className:"syncify-window-footer",children:[u("span",{className:"syncify-window-footer-version",children:[u("span",{children:["Syncify ",n.version]}),e.newerVersion?a(R,{variant:"text",size:"tiny",className:"syncify-window-update",onClick:()=>e.loadedByLoader?window.location.reload():Be(`${n.githubUrl}#updating`),children:a(G,{parts:[`${e.newerVersion} is out`,e.loadedByLoader?"Reload":"How to update"]})}):null]}),a("span",{className:"syncify-window-footer-links",children:t.map(([i,o])=>a(R,{variant:"subtle",size:"tiny",onClick:()=>Be(o),children:i},i))})]})}var Hy={"back-up":"Back up now","try-again":"Try again","sign-in":"Sign in","how-to-update":"How to update",reload:"Reload"};function zs(e){let{status:n,alert:t}=e,i=n.action,o=i?a(R,{variant:i==="back-up"||i==="sign-in"?"primary":"secondary",size:t?"small":"regular",onClick:()=>e.onAction(i),disabled:e.busy,children:i==="back-up"&&e.backingUp?"Backing up\u2026":Hy[i]}):null;return t?u("section",{className:"syncify-status","aria-label":"Status",children:[u("div",{className:"syncify-status-alert",role:"alert",children:[a("span",{className:"syncify-status-alert-mark",children:a(be,{tone:"warning",icon:a(Zi,{})})}),u("div",{className:"syncify-status-text",children:[a("h2",{className:"syncify-status-title",children:t.title}),t.kind==="claim"&&t.text?a("p",{className:"syncify-status-sentence",children:t.text}):null]}),t.kind==="claim"?t.canAnswer?a(R,{variant:"secondary",onClick:e.onNotMe,disabled:e.answering,children:"Not me"}):null:u("span",{className:"syncify-status-answers",children:[a(R,{variant:"secondary",onClick:()=>e.onAnswerInstall("reject"),disabled:e.answering,children:"Not mine"}),a(R,{onClick:()=>e.onAnswerInstall("approve"),disabled:e.answering,children:"Approve"})]})]}),u("div",{className:"syncify-status-line","aria-live":"polite",children:[n.backedUp?a(Ie,{className:"syncify-status-check"}):null,a(G,{parts:n.line}),o]})]}):a("section",{className:"syncify-status","aria-label":"Status",children:u("div",{className:"syncify-status-main","aria-live":"polite",children:[u("div",{className:"syncify-status-text",children:[a("h2",{className:"syncify-status-title",children:n.title}),n.detail.length>0?a(G,{parts:n.detail}):null,n.supportAsk?u("p",{className:"syncify-status-ask",children:[a("span",{children:n.supportAsk}),a(R,{variant:"text",onClick:e.onSupport,children:"Support it on Ko-fi"})]}):null]}),o]})})}function Fs(e){let{codeCount:n,account:t,newerVersion:i}=e,o=[{id:"backups",label:"Backups"},{id:"share",label:"Share",status:n?a(eo,{count:n,label:Le(n,"code")}):void 0},{id:"account",label:"Account",status:t?t.kind==="ok"?a("span",{className:"syncify-tab-check",role:"img","aria-label":t.label,children:a(Ie,{})}):a(be,{tone:"warning",label:t.label}):void 0},{id:"settings",label:"Settings",status:i?a(be,{tone:"info",label:`Syncify ${i} is out`}):void 0}];return a(io,{tabs:o,selected:e.selected,onSelect:e.onSelect,idBase:e.idBase,label:"Syncify"})}function fo(e){var Nn,Fe,F,ve,ce,je,We,Rn,ut,En,cn,Pn,Ye;let n=ne("syncify"),t=L(),[i,o]=m(()=>me()),{local:r,localFailed:s,refreshLocal:c}=Us(),l=Os(i),y=As(),d=Hs(),g=$s(),[h]=m(()=>Qr()!==null),[x,v]=m((Nn=e.tab)!=null?Nn:"backups"),[P,b]=m(()=>l.check?"idle":"checking"),[k,I]=m(null),[O,N]=m(null),[H,V]=m(!1),[E,_]=m(!1),[te,W]=m(!1),[De,tn]=m(null),[ai,xn]=m(()=>Tr()),[Oe,ri]=m(e.secure===!0),Cn=q(!1),{remote:j,lockedBy:J,claims:ke,session:X}=l,Ne=P!=="idle",on=(Fe=r==null?void 0:r.hash)!=null?Fe:null,an=((F=j.claim)==null?void 0:F.status)==="pending"&&!j.claim.mine?j.claim:null,K=cs(ke,J,an!==null),we=!!(on&&j.backups.some(S=>S.payload_hash===on)),rn=Ls({activity:P,checked:l.check!==null,checkError:k,unsupported:H,locked:J,latest:j.payload,latestItems:j.payload?wn(j.payload).map(S=>S.key):[],backedUp:we,localHash:on,localItems:(ve=r==null?void 0:r.installedItems)!=null?ve:[],localItemCount:(ce=r==null?void 0:r.installedItemCount)!=null?ce:0,localConfig:(je=r==null?void 0:r.spicetifyConfig)!=null?je:null,restoreResult:g.recent?g.result:null}),rt=Ds(j.claim,(Rn=(We=j.install)==null?void 0:We.waiting[0])!=null?Rn:null),Z=!ai&&!J&&j.payload!==null&&x!=="account"&&(X?K.kind==="open":X===null&&j.nudge),Ue=(X?(ut=ke==null?void 0:ke.accounts)!=null?ut:[]:[]).filter(S=>S.status==="final").map((S,$)=>({hash:S.hash,label:`Spotify account ${$+1}${S.device_info?` from ${S.device_info}`:""}`})).filter(S=>S.hash!==(ke==null?void 0:ke.hash));async function Y(S={}){try{(!S.silent||!l.check)&&b("checking"),S.silent||(N(null),I(null)),await c(),await l.refresh()&&v("account"),I(null),b("idle")}catch($){Se($)}}function Se(S){if(b("idle"),S instanceof Dn){V(!0),N(null);return}if(S instanceof Je){N({kind:"error",text:S.message}),Y({silent:!0});return}if(S instanceof se&&S.code!=="not_linked"){N(null),Y({silent:!0});return}let $=S instanceof Error?S.message:String(S);l.check?N({kind:"error",text:$}):I($),Spicetify.showNotification($,!0,6e3)}async function He(){try{b("backing-up"),N(null);let{payload:S,unchanged:$,unapproved:xe}=await Jn(i);if(await c(),xe){await Y({silent:!0}),N({kind:"warning",text:"Backed up, but kept apart until this install is approved."}),Spicetify.showNotification("Syncify: backed up, waiting for approval");return}$||l.addBackup(S),b("idle"),Spicetify.showNotification($?"Syncify: everything is already backed up":"Syncify backup complete")}catch(S){Se(S)}}async function st(S){var $;try{b("restoring"),N(null),await Cr(i,S.row.backup,($=S.linkedHash)!=null?$:void 0,S.skipped),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),Qn(S.manual),setTimeout(()=>window.location.reload(),1e3)}catch(xe){Se(xe)}}async function ct(S){var xe;let $=(xe=j.install)==null?void 0:xe.waiting[0];if($){_(!0);try{await zt(i,$.id,S),Spicetify.showNotification(S==="approve"?"Syncify: install approved":"Syncify: install refused"),await Y({silent:!0})}catch(yt){Se(yt)}finally{_(!1)}}}async function sn(){_(!0);try{Spicetify.showNotification(Jt(await Ft(i))),await Y({silent:!0})}catch(S){N({kind:"error",text:S instanceof Error?S.message:String(S)})}finally{_(!1)}}async function z(){W(!0),tn(null);try{await Rr(i)}catch(S){S instanceof _e&&["claim_pending","claimed"].includes(S.code)||tn(S instanceof Error?S.message:String(S))}finally{await Y({silent:!0}),W(!1)}}function Re(){ri(!0),X?z():v("account")}function lt(S){l.setSession(S),Cn.current=!0,!J&&j.payload?z():Y({silent:!0})}function $e(){y.forget(),l.forgetClaims(),tn(null),Y({silent:!0})}function Ke(S){S==="back-up"?He():S==="try-again"?Y():S==="sign-in"?v("account"):S==="how-to-update"?Be(`${t.githubUrl}#updating`):Yr()}let In=Me(()=>{l.readSession(),Y({silent:!0})});M(()=>In.current(),[In]);let ze=Me(()=>{!e.secure||Cn.current||te||!X||K.kind!=="open"||J||(Cn.current=!0,z())});return M(()=>ze.current(),[ze,X,K.kind,J,te]),u("div",{className:"syncify-ui syncify-window",onClick:yo,onMouseDown:yo,onPointerDown:yo,children:[u("div",{className:"syncify-window-top",children:[a(zs,{status:rn,alert:rt,backingUp:P==="backing-up",busy:Ne||rn.action==="back-up"&&J!==null,answering:E,onAction:Ke,onNotMe:()=>{sn()},onAnswerInstall:S=>{ct(S)},onSupport:()=>Be(t.kofiUrl)}),O?a(Bs,{message:O,busy:Ne,onTryAgain:()=>{Y()},onDismiss:()=>N(null)}):null,a(Fs,{idBase:n,selected:x,onSelect:v,codeCount:X?y.codeCount:null,account:ls(X,J,K),newerVersion:d})]}),x==="backups"?a(xs,{idBase:n,config:i,remote:l.check?j:null,failed:k!==null||s,lockedBy:J,local:r,otherAccounts:Ue,notices:a(Ms,{nudge:Z,securing:te,onSecure:Re,onHideNudge:()=>{_r(),xn(!0)},install:J||K.kind==="secured"?null:j.install,restoreResult:g.result}),busy:Ne,restoring:P==="restoring",onRestore:S=>{st(S)},onError:Se}):x==="share"?a(oe,{idBase:n,id:"share",children:a("div",{className:"syncify-panel",children:a(_s,{config:i,session:X,localItems:(En=r==null?void 0:r.items)!=null?En:[],localConfig:(cn=r==null?void 0:r.spicetifyConfig)!=null?cn:null,localTheme:(Pn=r==null?void 0:r.activeTheme)!=null?Pn:null,marketplaceAvailable:(Ye=r==null?void 0:r.marketplaceAvailable)!=null?Ye:null,busy:Ne,onSignIn:()=>v("account"),onSignedOut:$e,onCodeCount:y.saveCodeCount,onHandle:y.saveHandle})})}):x==="account"?a(fs,{idBase:n,session:X,locked:J,secure:K,securing:te,secureError:De,onSecure:()=>{z()},nudge:Oe,onSignedIn:lt,onSignedOut:$e,handle:y.handle,onHandle:y.saveHandle}):a(Ns,{idBase:n,config:i,onConfigChange:o,busy:Ne,unsupported:H}),a(Ks,{newerVersion:d,loadedByLoader:h})]})}function yo(e){e.stopPropagation()}function ni(e){return a("div",{className:"syncify-ui syncify-launch-notice",children:u(qi,{title:e.title,actions:e.actions,children:[e.children?a("p",{children:e.children}):null,e.error?a(D,{tone:"error",children:e.error}):null]})})}function js(){let[e,n]=m(!1),[t,i]=m(null);async function o(r){n(!0),i(null);try{await r()}catch(s){i(s instanceof Error?s.message:String(s)),n(!1)}}return{busy:e,error:t,run:o}}function Ws(e){let{title:n,text:t}=Vt(e.claim),i=js();return a(ni,{title:n,error:i.error,actions:u(A,{children:[a(R,{variant:"secondary",onClick:e.onClose,disabled:i.busy,children:"Close"}),a(R,{onClick:()=>{i.run(async()=>{Spicetify.showNotification(Jt(await Ft(me()))),e.onClose()})},disabled:i.busy,children:"Not me"})]}),children:t})}function Ys(e){return a(ni,{title:ss(e.claim),actions:a(R,{onClick:e.onClose,children:"Close"})})}function qs(e){let n=js(),t=i=>{n.run(async()=>{await zt(me(),e.install.id,i),Spicetify.showNotification(i==="approve"?"Syncify: install approved":"Syncify: install refused"),e.onDone()})};return a(ni,{title:Xt(e.install),error:n.error,actions:u(A,{children:[a(R,{variant:"secondary",onClick:()=>t("reject"),disabled:n.busy,children:"Not mine"}),a(R,{onClick:()=>t("approve"),disabled:n.busy,children:"Approve"})]}),children:"Approve it if it's yours."})}function Gs(e){return a(ni,{title:"Your backup isn't secured",actions:u(A,{children:[a(R,{variant:"secondary",onClick:e.onClose,children:"Not now"}),a(R,{onClick:n=>{n.stopPropagation(),e.onSecure()},children:"Secure"})]}),children:"Anyone who knows your Spotify username can restore it."})}var ti="[Syncify]";function ae(e,n){if(n===void 0){console.debug(ti,e);return}console.debug(ti,e,n)}function at(e,n){if(n===void 0){console.warn(ti,e);return}console.warn(ti,e,n)}function $y(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var Js="syncify-styles";function Ky(){if(document.getElementById(Js)){ae("Another copy of Syncify is running; stopping this one");return}wo(Spicetify.React),zy();let e=me();Sr({topbarButton:Fy(),menuItem:Vy()}),Ht(e.entryPoint),Bi(e.shortcut,oi),Or({onClaim:n=>{Zy(n)},onUndone:Qy,onInstall:ed,onNudge:nd}).catch(n=>{at("Startup sync check failed",n)}),Gr().catch(n=>{at("Restore check failed",n)})}function zy(){let e=document.createElement("style");e.id=Js,e.textContent=Go,document.head.appendChild(e)}function Fy(){let{extensionName:e}=L(),n=new Spicetify.Topbar.Button(e,ci,t=>{ae("Topbar button clicked",ii(t)),oi()},!1,!0);return Xs(n),Yy(n),Xy(n),ae("Topbar button registered",ii(n)),n}function Xs(e){var t;let n=e;e.element.style.setProperty("-webkit-app-region","no-drag"),(t=n.button)==null||t.style.setProperty("-webkit-app-region","no-drag")}var Vs=".main-actionButtons",jy=".Root__globalNav, .Root__top-bar",Wy=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function Yy(e){if(typeof MutationObserver=="undefined")return;let n=!1,t=null,i=()=>{n=!1,r();let s=e.element,c=document.querySelector(Vs);!s||!c||c.contains(s)||(c.prepend(s),qy(e),Xs(e),ae("Topbar button re-attached",ii(e)))},o=new MutationObserver(()=>{n||(n=!0,setTimeout(i,250))}),r=()=>{var l;if(t!=null&&t.isConnected)return;let s=document.querySelector(Vs),c=(l=s==null?void 0:s.closest(jy))!=null?l:s==null?void 0:s.parentElement;if(o.disconnect(),t=c!=null?c:null,!c){o.observe(document.body,{childList:!0,subtree:!0});return}o.observe(c,{childList:!0,subtree:!0});for(let y=c.parentElement;y;y=y.parentElement)o.observe(y,{childList:!0})};i()}function qy(e){let n=Gy(e);if(!n||n.className&&n.className!=="undefined")return;let t=Array.from(document.querySelectorAll(Wy)).find(i=>!e.element.contains(i));t!=null&&t.className&&(n.className=t.className)}function Gy(e){return e.button}function Vy(){var e;if(typeof((e=Spicetify.Menu)==null?void 0:e.Item)!="function")return null;try{return new Spicetify.Menu.Item(L().extensionName,!1,()=>oi(),Jy())}catch(n){return at("Failed to create profile menu item",n),null}}function Jy(){return ci.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function Xy(e){Object.assign(window,{SyncifyDebug:{button:e,element:e.element,openModal:oi,inspect:()=>ii(e),clickElement:()=>{var n;return(n=e.element)==null?void 0:n.click()},clickInnerButton:()=>{var n;return(n=e.button)==null?void 0:n.click()},clickCallback:()=>e.onClick(e)}})}function ii(e){var n,t,i,o,r;return{label:e.label,disabled:e.disabled,isRight:e.isRight,hasElement:!!e.element,elementConnected:(n=e.element)==null?void 0:n.isConnected,elementDisabled:(t=e.element)==null?void 0:t.disabled,elementAriaDisabled:(i=e.element)==null?void 0:i.getAttribute("aria-disabled"),elementClass:(o=e.element)==null?void 0:o.className,appRegion:e.element?getComputedStyle(e.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:e.button?getComputedStyle(e.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:e.element?getComputedStyle(e.element).pointerEvents:null,visibility:e.element?getComputedStyle(e.element).visibility:null,display:e.element?getComputedStyle(e.element).display:null,rect:(r=e.element)==null?void 0:r.getBoundingClientRect().toJSON()}}var U=null;function oi(){if(U!=null&&U.container.isConnected){ae("Closing modal"),Spicetify.PopupModal.hide();return}ae("Opening modal"),vn(a(fo,{}))}async function Zy(e){U!=null&&U.container.isConnected||(ae("Opening claim notice"),vn(a(Ws,{claim:e,onClose:()=>Spicetify.PopupModal.hide()})))}function Qy(e){return U!=null&&U.container.isConnected?!1:(ae("Opening undone claim notice"),vn(a(Ys,{claim:e,onClose:()=>Spicetify.PopupModal.hide()})),!0)}function ed(e){U!=null&&U.container.isConnected||(ae("Opening install notice"),vn(a(qs,{install:e,onDone:()=>Spicetify.PopupModal.hide()})))}function nd(){U!=null&&U.container.isConnected||(ae("Opening nudge notice"),Mr(),vn(a(Gs,{onSecure:()=>vn(a(fo,{tab:"account",secure:!0})),onClose:()=>Spicetify.PopupModal.hide()})))}function vn(e){var t;(t=U==null?void 0:U.root)==null||t.unmount();let n=document.createElement("div");U={container:n,root:null};try{Spicetify.PopupModal.display({title:L().extensionName,content:n,isLarge:!1})}catch(i){throw at("Failed to open PopupModal",i),i}td(n),od(n,e)}function td(e){requestAnimationFrame(()=>{let n=id(e);n==null||n.classList.add("syncify-modal-shell");let t=n==null?void 0:n.querySelector(".main-trackCreditsModal-header h1");if(t&&!t.querySelector(".syncify-modal-mark")){let o=document.createElement("span");o.className="syncify-modal-mark",o.innerHTML=Vo,t.prepend(o)}let i=n==null?void 0:n.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');i&&(i.classList.add("syncify-modal-close"),i.setAttribute("aria-label",`Close ${L().extensionName}`),i.title="Close",i.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function id(e){let n=e.parentElement;for(;n&&n!==document.body;){if(n.querySelector(".main-trackCreditsModal-header"))return n;n=n.parentElement}return e.closest('[class*="trackCreditsModal"]')}function od(e,n){try{if(typeof Spicetify.ReactDOM.createRoot=="function"){let t=Spicetify.ReactDOM.createRoot(e);t.render(n),(U==null?void 0:U.container)===e&&(U.root=t),ae("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(n,e),ae("Modal rendered",{renderer:"render"})}catch(t){throw at("Failed to render modal",t),t}}qr();(function e(){if(!$y()){setTimeout(e,100);return}ae("Spicetify APIs ready"),Ky()})();})();
