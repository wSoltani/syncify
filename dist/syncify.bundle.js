// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var Fs=Object.defineProperty,Ws=Object.defineProperties;var js=Object.getOwnPropertyDescriptors;var lt=Object.getOwnPropertySymbols;var yo=Object.prototype.hasOwnProperty,fo=Object.prototype.propertyIsEnumerable;var uo=(e,n,t)=>n in e?Fs(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,p=(e,n)=>{for(var t in n||(n={}))yo.call(n,t)&&uo(e,t,n[t]);if(lt)for(var t of lt(n))fo.call(n,t)&&uo(e,t,n[t]);return e},k=(e,n)=>Ws(e,js(n));var _e=(e,n)=>{var t={};for(var i in e)yo.call(e,i)&&n.indexOf(i)<0&&(t[i]=e[i]);if(e!=null&&lt)for(var i of lt(e))n.indexOf(i)<0&&fo.call(e,i)&&(t[i]=e[i]);return t};var _n,P,ne,M,ut,X,Ys,F,m;function po(e){({createElement:_n,Fragment:P,useCallback:ne,useEffect:M,useLayoutEffect:ut,useMemo:X,useReducer:Ys,useRef:F,useState:m}=e)}var mo=`/* Shared values for every part. Colors come from the active Spicetify theme,
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
`;var go=`.syncify-icon {
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
`;var ho=`.syncify-btn,
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
`;var bo=`.syncify-switch-control {
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
`;var ko=`.syncify-checkbox {
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
`;var wo=`.syncify-setting-row {
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
`;var So=`/* Facts on one line, wrapping between facts. Each fact is trimmed to its
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
`;var vo=`.syncify-list {
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
`;var xo=`.syncify-field-group {
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
`;var Co=`.syncify-menu {
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
`;var No=`.syncify-meter {
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
`;var Io=`.syncify-mark-square {
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
`;var Eo=`.syncify-notice {
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
`;var Ro=`.syncify-dialog {
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
`;var Po=`.syncify-tabs {
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
`;var To=`.syncify-pip-square {
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
`;var _o=`.syncify-section-label {
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
`;var Ao=`.syncify-keycap {
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
`;var Mo=`/* A bar as tall as the capitals of the text it stands in for. */
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
`;var Lo=[mo,go,ho,bo,ko,wo,So,vo,xo,Co,No,Io,Eo,Ro,Po,To,_o,Ao,Mo].join(`
`);var Bo=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var Do=`/* The window fits the height Spotify's popup leaves it, so the status and
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
`;var Oo=`/* The safety copy's shield, after its name. */
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
`;var Uo=`/* Colors come from the active Spicetify theme, with Spotify's defaults as
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
`;var Ho=[Lo,Bo,Do,Oo,Uo].join(`
`);var ei=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var $o=`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="-2.5 -2.5 37 37" aria-hidden="true" focusable="false"><defs><mask id="syncify-mark-gap" maskUnits="userSpaceOnUse" x="-2" y="-2" width="36" height="36"><rect x="-2" y="-2" width="36" height="36" fill="#fff"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></mask></defs><g mask="url(#syncify-mark-gap)"><g transform="rotate(15 16 16)"><path d="M16 16L16 7.4A8.6 8.6 0 0 1 24.6 16Z" fill="#6cd1d1" transform="translate(0.42 -0.42)"/><path d="M16 16L24.6 16A8.6 8.6 0 0 1 16 24.6Z" fill="#efa4c1" transform="translate(0.42 0.42)"/><path d="M16 16L16 24.6A8.6 8.6 0 0 1 7.4 16Z" fill="#d3c48c" transform="translate(-0.42 0.42)"/><path d="M16 16L7.4 16A8.6 8.6 0 0 1 16 7.4Z" fill="#88bcf2" transform="translate(-0.42 -0.42)"/></g></g><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 28.03A12.4 12.4 0 1 1 28.03 19"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91"/></g></svg>
`;var bc="syncify",sn="state";function ni(){let e;try{e=window.indexedDB}catch(n){return Promise.resolve(null)}return e?new Promise(n=>{let t;try{t=e.open(bc,1)}catch(i){n(null);return}t.onupgradeneeded=()=>{t.result.createObjectStore(sn)},t.onerror=()=>n(null),t.onblocked=()=>n(null),t.onsuccess=()=>n(t.result)}):Promise.resolve(null)}function ti(e,n){let t=ni().then(i=>new Promise((o,r)=>{if(!i){r(new Error("IndexedDB isn't available."));return}try{let s=i.transaction(sn,e),c=n(s.objectStore(sn));s.oncomplete=()=>{i.close(),o(c.result)},s.onerror=s.onabort=()=>{var u;i.close(),r((u=s.error)!=null?u:new Error("IndexedDB failed."))}}catch(s){i.close(),r(s)}}));return Promise.race([t,new Promise((i,o)=>setTimeout(()=>o(new Error("IndexedDB took too long.")),2e3))])}function cn(e){return ti("readonly",n=>n.get(e))}async function ln(e,n){await ti("readwrite",t=>t.put(n,e))}async function Ko(e){await ti("readwrite",n=>n.delete(e))}var we={extensionName:"Syncify",version:"1.17.1",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",discordUrl:"https://syncify.wsoltani.com/discord",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com",shareUrl:"https://syncs.wsoltani.com"};function D(){var n,t,i,o,r,s,c,u,y,d;let e=window.SyncifyConfig;return{extensionName:(n=Ae(e==null?void 0:e.extensionName))!=null?n:we.extensionName,version:(t=zo(e==null?void 0:e.version))!=null?t:we.version,workerUrl:(i=Ae(e==null?void 0:e.workerUrl))!=null?i:we.workerUrl,webUrl:(o=Ae(e==null?void 0:e.webUrl))!=null?o:we.webUrl,githubUrl:(r=Ae(e==null?void 0:e.githubUrl))!=null?r:we.githubUrl,kofiUrl:(s=Ae(e==null?void 0:e.kofiUrl))!=null?s:we.kofiUrl,discordUrl:(c=Ae(e==null?void 0:e.discordUrl))!=null?c:we.discordUrl,issueUrl:(u=Ae(e==null?void 0:e.issueUrl))!=null?u:we.issueUrl,releasesUrl:(y=Ae(e==null?void 0:e.releasesUrl))!=null?y:we.releasesUrl,shareUrl:(d=Ae(e==null?void 0:e.shareUrl))!=null?d:we.shareUrl}}function Ae(e){return zo(e)}function zo(e){return typeof e=="string"&&e.trim()?e.trim():null}var kc="x-syncify-version",wc="x-syncify-install",Sc="x-syncify-timezone",Fo="install-id",Wo="syncify:install-id",vc=2e3,yt=null;async function jo(){let e={[kc]:D().version,[wc]:(await ii()).id},n=Nc();return n&&(e[Sc]=n),e}function ii(){return yt!=null||(yt=xc().catch(()=>({id:dt(),inDatabase:!1}))),yt}async function xc(){let e=await Promise.race([Cc(),new Promise(n=>setTimeout(()=>n(null),vc))]);if(e)return{id:e,inDatabase:!0};try{let n=window.localStorage.getItem(Wo);if(n&&Yo(n))return{id:n,inDatabase:!1};let t=dt();return window.localStorage.setItem(Wo,t),{id:t,inDatabase:!1}}catch(n){return{id:dt(),inDatabase:!1}}}async function Cc(){let e=await ni();return e?new Promise(n=>{let t=null;try{let i=e.transaction(sn,"readwrite"),o=i.objectStore(sn),r=o.get(Fo);r.onsuccess=()=>{if(typeof r.result=="string"&&Yo(r.result)){t=r.result;return}t=dt(),o.put(t,Fo)},i.oncomplete=()=>{e.close(),n(t)},i.onerror=i.onabort=()=>{e.close(),n(null)}}catch(i){e.close(),n(null)}}):null}function dt(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let n=[...e].map(t=>t.toString(16).padStart(2,"0"));return[n.slice(0,4).join(""),n.slice(4,6).join(""),n.slice(6,8).join(""),n.slice(8,10).join(""),n.slice(10).join("")].join("-")}function Yo(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(e)}function Nc(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(e){return null}}var Ic="syncify-signature-v1",Ec={name:"ECDSA",hash:"SHA-256"};function ft(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function pt(e){return oi(new Uint8Array(await crypto.subtle.exportKey("raw",e)))}async function An(e,n,t,i,o){let r=await Rc(n,t,i,o),s=await crypto.subtle.sign(Ec,e,r);return oi(new Uint8Array(s))}async function Rc(e,n,t,i){let{pathname:o,search:r}=new URL(t),s=new TextEncoder,c=oi(new Uint8Array(await crypto.subtle.digest("SHA-256",s.encode(i))));return s.encode([Ic,e,n.toUpperCase(),o+r,c].join(`
`))}function oi(e){let n="";for(let t=0;t<e.length;t++)n+=String.fromCharCode(e[t]);return btoa(n).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var qo="device-key",ai="session",Go="salt",Ye=null,Mn,Vo={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function un(e){if(Ye)return Ye;let n=await cn(qo);return Pc(n)?(Ye=Promise.resolve(n),n):e?(Ye=ft().then(async t=>(await ln(qo,t),t)),Ye.catch(()=>{Ye=null}),Ye):null}async function ae(){let e=await cn(ai);return Tc(e)?e:null}function ri(e){return ln(ai,e)}async function qe(){await Ko(ai).catch(()=>{})}async function mt(){if(Mn===void 0){let e=await cn(Go).catch(()=>{});Mn=typeof e=="string"?e:null}return Mn}async function gt(e){e!==Mn&&(Mn=e,await ln(Go,e).catch(()=>{}))}function ht(){return Vo}function Jo(e){Vo=e}function Pc(e){let n=e;return!!(n&&n.privateKey instanceof CryptoKey&&n.publicKey instanceof CryptoKey)}function Tc(e){let n=e;return!!(n&&typeof n.token=="string"&&n.token&&typeof n.email=="string")}var Xo="install-key",yn=null;function Zo(){return yn!=null||(yn=_c()),yn.catch(()=>{yn=null}),yn.catch(()=>null)}async function _c(){if(!(await ii()).inDatabase)return null;let e=await cn(Xo),n=Mc(e)?e:await Ac();return{privateKey:n.privateKey,publicKey:await pt(n.publicKey)}}async function Ac(){let e=await ft();return await ln(Xo,e),e}function Mc(e){let n=e;return!!(n&&n.privateKey instanceof CryptoKey&&n.publicKey instanceof CryptoKey)}var Lc="/api/auth/email-otp/send-verification-otp",Bc="/api/auth/sign-in/email-otp",Dc="/api/auth/get-session",Oc="/api/auth/sign-out",Uc="/api/auth/link",Hc="x-syncify-device-key",$c="x-syncify-signature",Qo="x-syncify-salt",Kc="none",zc={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again.",link_failed:"Couldn't open the website. Try again."},T=class extends Error{constructor(t,i=null,o=null){var r;super((r=zc[t])!=null?r:"Sign-in failed. Try again.");this.code=t;this.retryAfter=i;this.share=o;this.name="AccountError"}};function Ge(e){return e instanceof T?e.message:"Sign-in failed. Try again."}async function ea(e,n={}){let t=await Bn(Lc,{method:"POST",body:JSON.stringify(p({email:e,type:"sign-in"},n.nudge?{nudge:!0}:{}))});return typeof(t==null?void 0:t.resend_in)=="number"?t.resend_in:60}async function na(e,n){var r;let t=await un(!0).catch(()=>{throw new T("no_device_key")}),i=await Bn(Bc,{method:"POST",body:JSON.stringify({email:e,otp:n}),keys:t,sendPublicKey:!0});if(typeof(i==null?void 0:i.token)!="string"||!i.token)throw new T("sign_in_failed");let o={token:i.token,email:typeof((r=i.user)==null?void 0:r.email)=="string"?i.user.email:e};return await ri(o).catch(()=>{throw new T("no_device_key")}),si=!0,o}var si=!1;async function ta(){var n;let e=await ae();if(!e||si)return e;try{let t=await bt(e,Dc,"GET");si=!0;let i=(n=t==null?void 0:t.user)==null?void 0:n.email;if(typeof i!="string"||i===e.email)return e;let o=k(p({},e),{email:i});return await ri(o).catch(()=>{}),o}catch(t){if(t instanceof T&&t.code==="signed_out")return null;throw t}}async function ia(){let e=await ae().catch(()=>null);e&&await bt(e,Oc,"POST").catch(()=>{}),await qe()}async function oa(){let e=await ae();if(!e)throw new T("signed_out");let n=await bt(e,Uc,"POST"),t=typeof(n==null?void 0:n.url)=="string"?n.url:"",i=new URL(D().webUrl).origin;if(!t.startsWith(`${i}/link#`))throw new T("link_failed");return t}async function Ln(e,n,t){let i=await ae();if(!i)throw new T("signed_out");return bt(i,e,n,t)}async function aa(e,n,t){let i=await ae().catch(()=>null),o=i?await un(!1).catch(()=>null):null;await Bn(e,p({method:"POST",body:JSON.stringify(n),headers:t,keepalive:!0},i&&o?{token:i.token,keys:o}:{}))}async function bt(e,n,t,i){let o=await un(!1);if(!o)throw await qe(),new T("signed_out");return Bn(n,p({method:t,token:e.token,keys:o},i===void 0?{}:{body:JSON.stringify(i)}))}async function Bn(e,n,t=!1){var g,h,C;let i=`${D().webUrl.replace(/\/+$/,"")}${e}`,o=p({},n.headers);if(n.body!==void 0&&(o["content-type"]="application/json"),n.token&&(o.authorization=`Bearer ${n.token}`),n.keys){let v=(g=await mt())!=null?g:Kc;o[Qo]=v,o[$c]=await An(n.keys.privateKey,v,n.method,i,(h=n.body)!=null?h:""),n.sendPublicKey&&(o[Hc]=await pt(n.keys.publicKey))}let r;try{r=await fetch(i,{method:n.method,headers:o,body:n.body,keepalive:n.keepalive})}catch(v){throw new T("offline")}let s=r.headers.get(Qo);s&&await gt(s);let c=await r.json().catch(()=>null);if(r.ok)return c;let u=typeof(c==null?void 0:c.code)=="string"?c.code:r.status===503?"unavailable":"failed";if(u==="stale_salt"&&n.keys&&!t)return Bn(e,n,!0);u==="signed_out"&&await qe();let y=Number(r.headers.get("retry-after")),d=c==null?void 0:c.share;throw new T(u,Number.isFinite(y)&&y>0?y:(C=Fc[u])!=null?C:null,typeof(d==null?void 0:d.code)=="string"?{code:d.code,link:typeof d.link=="string"?d.link:null}:null)}var Fc={resend_wait:60,too_many_requests:60,send_failed:60};var Wc="x-syncify-user-hash",jc="x-syncify-identity",Yc="x-syncify-signature",qc="x-syncify-install-key",Gc="x-syncify-install-signature",ci="x-syncify-salt",Vc="none",Jc="/restores",Xc="/installs",Zc="hash",ra=3,Dn=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}},re=class extends Error{constructor(t){super(t==="not_linked"?"Couldn't read that Spotify account's backups.":"Sign in to restore this backup.");this.code=t;this.name="LockedError"}},Ve=class extends Error{constructor(){super("This Spotify account doesn't accept backups from this install. Sign in to back up."),this.name="InstallRefusedError"}};async function ca(e,n,t){var r;let i=await Be(e,n,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(t)});if(i.status===403&&((r=await i.json().catch(()=>null))==null?void 0:r.code)==="install_refused")throw new Ve;if(!i.ok)throw new Error(`Backup failed with HTTP ${i.status}.`);let o=await i.json().catch(()=>null);return{unchanged:(o==null?void 0:o.unchanged)===!0,unapproved:(o==null?void 0:o.quarantined)===!0}}async function la(e,n,t,i){let o=await Be(e,n,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({install:t,action:i})},Xc);if(o.ok)return;let r=await o.json().catch(()=>null);if((r==null?void 0:r.code)!=="not_pending")throw new Error(`Couldn't answer with HTTP ${o.status}.`)}async function li(e,n,t){var C,v,b,x;let i=await Be(e,n,{method:"GET"},ya("/",t));if(i.status===404){let w=await i.json().catch(()=>null);return{exists:!1,payload:null,backups:[],safetyCopy:null,claim:On(w==null?void 0:w.claim),unapproved:[],install:sa(w==null?void 0:w.install),nudge:!1}}if(!i.ok)throw new Error(`Restore failed with HTTP ${i.status}.`);let o=await i.json(),r=On(o.claim),s=sa(o.install),c=o.nudge===!0;delete o.claim,delete o.install,delete o.nudge;let u=[o,...(C=o.backup_history)!=null?C:[]];if(!u.every(w=>w.backup))return{exists:!0,payload:o,backups:u.slice(0,ra),safetyCopy:(v=u[ra])!=null?v:null,claim:r,unapproved:[],install:s,nudge:c};let y=u.filter(w=>{var E;return((E=w.backup)==null?void 0:E.kind)==="rolling"}),d=(b=u.find(w=>{var E;return((E=w.backup)==null?void 0:E.kind)==="anchor"}))!=null?b:null,g=u.filter(w=>{var E;return((E=w.backup)==null?void 0:E.kind)==="quarantined"}),h=(x=y[0])!=null?x:d;return h?y.length===0&&d?{exists:!0,payload:h,backups:[d],safetyCopy:null,claim:r,unapproved:g,install:s,nudge:c}:{exists:!0,payload:h,backups:y,safetyCopy:d,claim:r,unapproved:g,install:s,nudge:c}:{exists:!1,payload:null,backups:[],safetyCopy:null,claim:r,unapproved:g,install:s,nudge:c}}async function ua(e,n,t,i){try{await Be(e,n,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:t}),keepalive:!0},ya(Jc,i))}catch(o){}}async function Be(e,n,t,i="",o=!1){var b,x,w,E,_;let r=i?`${e.replace(/\/+$/,"")}${i}`:e,s=(b=t.method)!=null?b:"GET",c=await ae().catch(()=>null),u=c?await un(!1).catch(()=>null):null,y=await Zo(),d={},g=(x=await mt())!=null?x:Vc;c&&u&&(d.authorization=`Bearer ${c.token}`,d[ci]=g,d[Yc]=await An(u.privateKey,g,s,r,(w=t.body)!=null?w:"")),y&&(d[ci]=g,d[qc]=y.publicKey,d[Gc]=await An(y.privateKey,g,s,r,(E=t.body)!=null?E:""));let h=await fetch(r,k(p({},t),{headers:p(k(p(p({},t.headers),await jo()),{[Wc]:n.hash,[jc]:n.field}),d)})),C=h.headers.get(ci);if(C&&await gt(C),h.status===426)throw new Dn;if(h.status!==401)return h;let v=(_=await h.clone().json().catch(()=>null))==null?void 0:_.code;if(!o){if(v==="stale_salt"&&(c||y))return Be(e,n,t,i,!0);if(v==="signed_out"&&c)return await qe(),Be(e,n,t,i,!0)}throw v==="claimed"||v==="not_owner"||v==="not_linked"?new re(v):(v==="signed_out"&&await qe(),new T(typeof v=="string"?v:"failed"))}function ya(e,n){return n?`${e}?${Zc}=${encodeURIComponent(n)}`:e}function sa(e){let n=e;if(!n||typeof n.trust!="string")return null;let t=Array.isArray(n.waiting)?n.waiting:[];return{trusted:n.trust!=="pending"&&n.trust!=="rejected",refused:n.trust==="rejected",waiting:t.flatMap(i=>{let o=i;return o&&typeof o.id=="string"&&typeof o.first_seen_at=="number"?[{id:o.id,device:typeof o.device=="string"?o.device:null,first_seen_at:o.first_seen_at}]:[]})}}function On(e){let n=e;return!n||typeof n.mine!="boolean"?null:n.status==="final"?{status:"final",mine:n.mine}:n.status==="undone"?typeof n.undone_at=="number"?{status:"undone",mine:!1,email:typeof n.email=="string"?n.email:null,undone_at:n.undone_at}:null:n.status!=="pending"||typeof n.final_at!="number"?null:p({status:"pending",mine:n.mine,email:typeof n.email=="string"?n.email:null,final_at:n.final_at,held:n.held===!0},n.not_me===!0?{not_me:!0}:{})}async function kt(e){let n=new TextEncoder().encode(e),t=await crypto.subtle.digest("SHA-256",n);return[...new Uint8Array(t)].map(i=>i.toString(16).padStart(2,"0")).join("")}function Un(e){return JSON.stringify(ui(e))}function ui(e){return Array.isArray(e)?e.map(ui):e&&typeof e=="object"?Object.keys(e).sort().reduce((n,t)=>(n[t]=ui(e[t]),n),{}):e}function da(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var Qc=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,el=100,nl="marketplace:installed-extensions",tl="marketplace:installed-themes",il="marketplace:theme-installed",ol="marketplace:installed:",al="marketplace";function di(e){return Spicetify.Config?fi(Spicetify.Config,e):null}function fi(e,n){var r;let t=De(e),i=new Set(rl(n)),o=((r=n[il])==null?void 0:r.includes(ol))===!0;return{current_theme:o?al:t.current_theme,color_scheme:o?"":t.color_scheme,extensions:t.extensions.filter(s=>!i.has(s)),custom_apps:t.custom_apps}}function De(e){let n=e&&typeof e=="object"?e:{};return{current_theme:yi(n.current_theme)?n.current_theme:"",color_scheme:yi(n.color_scheme)?n.color_scheme:"",extensions:fa(n.extensions),custom_apps:fa(n.custom_apps)}}function ga(e,n){return Un(De(e))===Un(De(n))}function fa(e){return Array.isArray(e)?[...new Set(e.filter(yi))].sort().slice(0,el):[]}function yi(e){return typeof e=="string"&&Qc.test(e)}function rl(e){let n=pa(e[nl]).map(i=>{var r;let o=(r=ma(e[i]))==null?void 0:r.manifest;return o&&typeof o=="object"?o.main:void 0}),t=pa(e[tl]).flatMap(i=>{var r;let o=(r=ma(e[i]))==null?void 0:r.include;return Array.isArray(o)?o:[]});return[...n,...t].flatMap(i=>{let o=typeof i=="string"?i.split("/").pop():void 0;return o?[o]:[]})}function pa(e){try{let n=e?JSON.parse(e):[];return Array.isArray(n)?n.filter(t=>typeof t=="string"):[]}catch(n){return[]}}function ma(e){try{let n=e?JSON.parse(e):null;return n&&typeof n=="object"&&!Array.isArray(n)?n:null}catch(n){return null}}var sl=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],cl="marketplace:installed:",ha=`${cl}snippet:`,ll="wsoltani/syncify",ul="marketplace",ba={added:0,removed:1,unchanged:2};function Z(e){let n=new Map;for(let[t,i]of sl)for(let o of pl(e[t]))n.has(o)||n.set(o,dl(o,i,e[o]));return[...n.values()]}function vt(e,n,t,i){let o=new Set(e.map(u=>u.key)),r=new Map(t.map(u=>[u.key,u])),s=[...e.map(u=>{let y=r.get(u.key);return k(p({},u),{change:y?"unchanged":"added",isNew:!y||y.sources.join(" ")!==u.sources.join(" ")})}),...t.filter(u=>!o.has(u.key)).map(u=>k(p({},u),{change:Hn(u,e)?"unchanged":"removed",isNew:!1}))].sort((u,y)=>ba[u.change]-ba[y.change]||u.name.localeCompare(y.name)),c={added:0,removed:0,unchanged:0};for(let u of s)c[u.change]+=1;return{items:s,counts:c,manual:yl(n,i)}}function Hn(e,n){return e.type==="extension"&&St(e)&&!n.some(St)}function St(e){var n;return((n=e.repo)==null?void 0:n.toLowerCase())===ll}function yl(e,n){if(!e)return[];let t=De(e),i=De(n),o=[...t.extensions.filter(s=>!i.extensions.includes(s)).map(s=>({type:"extension",name:s})),...t.custom_apps.filter(s=>!i.custom_apps.includes(s)).map(s=>({type:"custom_app",name:s}))],r=t.current_theme;return r&&r!==ul&&(r!==i.current_theme||t.color_scheme!==i.color_scheme)&&o.push(p({type:"theme",name:r},t.color_scheme?{scheme:t.color_scheme}:{})),o}function dl(e,n,t){var u,y;let i=ka(t),o=ka(i==null?void 0:i.manifest),r=wt(i==null?void 0:i.user),s=wt(i==null?void 0:i.repo),c=(y=(u=wt(i==null?void 0:i.title))!=null?u:wt(o==null?void 0:o.name))!=null?y:e.startsWith(ha)?e.slice(ha.length):e.split("/").pop()||e;return{key:e,type:n,name:c,repo:n!=="snippet"&&r&&s?`${r}/${s}`:null,sources:fl(n,i),custom:n==="snippet"&&(i==null?void 0:i.custom)===!0}}function fl(e,n){return n?(e==="extension"?[n.extensionURL]:e==="theme"?[n.cssURL,n.schemesURL,...Array.isArray(n.include)?n.include:[]]:[]).filter(i=>typeof i=="string"&&i!==""):[]}function wt(e){return typeof e=="string"&&e.trim()?e.trim():null}function pl(e){try{let n=e?JSON.parse(e):[];return Array.isArray(n)?n.filter(t=>typeof t=="string"):[]}catch(n){return[]}}function ka(e){let n=e;if(typeof e=="string")try{n=JSON.parse(e)}catch(t){return null}return n&&typeof n=="object"&&!Array.isArray(n)?n:null}var xt="spicetify-marketplace";var $n="settings";async function wa(){let e=await xa();if(e.kind!=="ok")return null;try{let n=await Ca(e.db,"readonly",i=>i.getAll());if(!n)return null;let t={};for(let i of n)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(t[i.key]=i.value);return t}finally{e.db.close()}}async function Sa(e,n=[]){let t=await xa();if(t.kind==="unavailable")return"unavailable";let i=t.kind==="ok"?t.db:await ml();if(!i)return"failed";try{return await Ca(i,"readwrite",r=>{let s;for(let[c,u]of Object.entries(e))s=r.put({key:c,value:u});for(let c of n)s=r.delete(c);return s})===null?"failed":"written"}finally{i.close()}}function va(){var e;try{return(e=window.indexedDB)!=null?e:null}catch(n){return null}}async function xa(){let e=va();return e?await gl(e)?{kind:"missing"}:new Promise(n=>{let t=!1,i=e.open(xt);i.onupgradeneeded=()=>{t=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),n({kind:"unavailable"})},i.onblocked=()=>n({kind:"unavailable"}),i.onsuccess=()=>{let o=i.result;if(t){o.close(),hl(e).then(()=>n({kind:"missing"}));return}if(!o.objectStoreNames.contains($n)){o.close(),n({kind:"unavailable"});return}n({kind:"ok",db:o})}}):{kind:"unavailable"}}function ml(){let e=va();return e?new Promise(n=>{let t=e.open(xt,1);t.onupgradeneeded=()=>{let i=t.result;i.objectStoreNames.contains($n)||i.createObjectStore($n,{keyPath:"key"})},t.onerror=()=>{console.warn("Syncify could not create Marketplace storage",t.error),n(null)},t.onblocked=()=>n(null),t.onsuccess=()=>n(t.result)}):Promise.resolve(null)}async function gl(e){if(typeof e.databases!="function")return!1;try{return!(await e.databases()).some(t=>t.name===xt)}catch(n){return!1}}function hl(e){return new Promise(n=>{let t=e.deleteDatabase(xt);t.onsuccess=()=>n(),t.onerror=()=>n(),t.onblocked=()=>n()})}function Ca(e,n,t){return new Promise(i=>{let o;try{o=e.transaction($n,n)}catch(y){console.warn("Syncify could not open a Marketplace transaction",y),i(null);return}let r,s=!1,c=y=>{s||(s=!0,i(y))};o.oncomplete=()=>c(r),o.onerror=()=>{console.warn("Syncify Marketplace transaction failed",o.error),c(null)},o.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",o.error),c(null)};let u;try{u=t(o.objectStore($n))}catch(y){console.warn("Syncify Marketplace request could not be issued",y),c(null);return}u&&(u.onsuccess=()=>{r=u.result},u.onerror=()=>{console.warn("Syncify Marketplace request failed",u.error),c(null)})})}var pi="marketplace:",Nt=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function ye(){let e=Il(),n=await wa();if(n)for(let[t,i]of Object.entries(n))t.startsWith(pi)&&(e[t]=i);return e}var kl=new Set(["marketplace:active-tab","marketplace:sort"]),mi="marketplace:installed:",Ct="marketplace:theme-installed",wl=["stars","tags","lastUpdated","created"];async function It(e,n){let t={};for(let[i,o]of Object.entries(e))kl.has(i)||(t[i]=i.startsWith(mi)?Sl(o):o);return n&&(t.spicetify_config=De(n)),kt(Un(t))}function Sl(e){try{let n=JSON.parse(e);if(!n||typeof n!="object"||Array.isArray(n))return e;for(let t of wl)delete n[t];return n}catch(n){return e}}async function Et(){let e=await ye(),n=di(e);return{keyCount:Object.keys(e).length,hash:await It(e,n),installedItemCount:Cl(e),installedItems:Rt(e),items:Z(e),spicetifyConfig:n,marketplaceAvailable:Nl(e),activeTheme:Kn(e[Ct])}}function Kn(e){if(!e)return null;if(e.startsWith(mi))return e;try{let n=JSON.parse(e);return typeof n=="string"?n:null}catch(n){return null}}async function Na(){let e=await ye(),n=di(e);return p({schema_version:2,metadata:{last_sync_datetime:new Date().toISOString(),device_info:da(),marketplace_key_count:Object.keys(e).length},payload_hash:await It(e,n),marketplace_data:{keys:e}},n?{spicetify_config:n}:{})}async function Ia(e,n=[]){var r,s;let t={},i=(s=(r=e.marketplace_data)==null?void 0:r.keys)!=null?s:{};for(let[c,u]of Object.entries(i))c.startsWith(pi)&&(t[c]=u);if(Object.keys(t).length===0)return 0;await vl(t),n.length>0&&await xl(t,n);let o=hi(await ye(),t);return await gi(t,o),Object.keys(t).length}async function gi(e,n=[]){for(let[i,o]of Object.entries(e))window.localStorage.setItem(i,o);for(let i of n)window.localStorage.removeItem(i);if(await Sa(e,n)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try again.")}function hi(e,n){let t=new Set(Nt.flatMap(s=>{var c;return Pt((c=n[s])!=null?c:e[s]).map(String)})),i=Rt(e).filter(s=>s.startsWith(mi)&&!t.has(s)),o=i.filter(s=>e[s]!==void 0&&n[s]===void 0),r=e[Ct];return r&&n[Ct]===void 0&&i.some(s=>r.includes(s))&&o.push(Ct),o}async function vl(e){let n=await ye(),t=Z(e),i=Z(n).filter(s=>Hn(s,t));if(i.length===0)return;let o="marketplace:installed-extensions",r=Pt(e[o]).map(String);for(let s of i)r.includes(s.key)||r.push(s.key),e[s.key]=n[s.key];e[o]=JSON.stringify(r)}async function xl(e,n){let t=await ye(),i=Rt(t);for(let o of Nt){if(e[o]===void 0)continue;let r=Pt(e[o]).map(String).filter(s=>!n.includes(s)||i.includes(s));e[o]=JSON.stringify(r)}for(let o of n)t[o]!==void 0?e[o]=t[o]:delete e[o]}function Cl(e){return Rt(e).length}function Rt(e){return Nt.flatMap(n=>Pt(e[n]).map(String))}function Nl(e){return!!(window.Marketplace||Nt.some(t=>e[t]!==void 0)||e["marketplace:tabs"]!==void 0)}function Ea(e,n){return n===0?!1:e===0?!0:e<Math.max(2,Math.floor(n*.5))}function Il(){let e={};for(let n=0;n<window.localStorage.length;n+=1){let t=window.localStorage.key(n);if(!(t!=null&&t.startsWith(pi)))continue;let i=window.localStorage.getItem(t);i!==null&&(e[t]=i)}return e}function Pt(e){if(!e)return[];try{let n=JSON.parse(e);return Array.isArray(n)?n:[]}catch(n){return[]}}var El="raw.githubusercontent.com",Rl="cdn.jsdelivr.net",Ra=".github.io";function ki(e){var t;if(e.protocol!=="https:")return null;let n=e.pathname.split("/").filter(Boolean);if(e.host===El)return bi(n[0],n[1]);if(e.host===Rl)return n[0]==="gh"?bi(n[1],(t=n[2])==null?void 0:t.split("@")[0]):null;if(e.host.endsWith(Ra)){let i=e.host.slice(0,-Ra.length);return i.includes(".")?null:bi(i,n.length>1?n[0]:e.host)}return null}function bi(e,n){return e&&n?`${e}/${n}`:null}var Pl={extension:"spicetify-extensions",theme:"spicetify-themes"},Tl="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",_l="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",Al="https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/",Ml="https://api.github.com/repos",Ll=5e3,Bl=20,Pa="syncify:repo-topics",Ta=10080*60*1e3,Dl=200;function Se(e){return(e==null?void 0:e.kind)==="host"||(e==null?void 0:e.kind)==="repo"||(e==null?void 0:e.kind)==="blocked"||(e==null?void 0:e.kind)==="catalog"}function dn(e){let n=new Map;for(let t of e){if(t.change==="removed")continue;if(t.custom){n.set(t.key,{kind:"custom"});continue}let i=Ol(t);i&&n.set(t.key,i)}return n}async function fn(e,n){let t=new Map,i=e.filter(s=>s.change!=="removed"&&s.isNew&&!n.has(s.key));if(i.length===0)return t;let o=i.filter(s=>s.type==="snippet"),r=i.filter(s=>s.type!=="snippet");if(o.length>0){let s=await wi();for(let c of o)s?Tt(s,c.name)||t.set(c.key,{kind:"catalog"}):t.set(c.key,{kind:"unchecked"})}if(r.length>0){let s=await $l(),c=Fl(),u=0;await Promise.all(r.map(async y=>{let d=Ul(y),g=Pl[y.type];if(!d||!g)return;if(s===null){t.set(y.key,{kind:"unchecked"});return}if(Hl(d,s)){t.set(y.key,{kind:"blocked"});return}let h=zl(c,d);h===void 0&&u<Bl&&(u+=1,h=await Kl(d),h!==void 0&&(c[d.toLowerCase()]={topics:h,at:Date.now()})),h===void 0?t.set(y.key,{kind:"unchecked"}):(h===null||!h.includes(g))&&t.set(y.key,{kind:"catalog"})})),Wl(c)}return t}function Ol(e){let n=null;for(let t of e.sources){let i;try{i=new URL(t)}catch(r){return{kind:"host",host:t.slice(0,40)}}let o=ki(i);if(!o)return{kind:"host",host:i.host};e.repo&&o.toLowerCase()!==e.repo.toLowerCase()&&(n!=null||(n=o))}return n?{kind:"repo",repo:n}:null}function Ul(e){for(let n of e.sources)try{let t=ki(new URL(n));if(t)return t}catch(t){}return e.repo}function Hl(e,n){let t=`https://github.com/${e}`.toLowerCase();return n.some(i=>{let o=i.toLowerCase();if(!o.includes("*"))return o===t;let r=o.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${r}$`).test(t)})}function _a(e){return e.replace(/\n/g,"").trim().toLowerCase()}function Tt(e,n){return e.get(_a(n))}var zn=null,Fn=null;function $l(){return zn!=null||(zn=Aa(Tl).then(e=>{let n=e==null?void 0:e.repos;return Array.isArray(n)?n.filter(t=>typeof t=="string"&&!t.startsWith("//")):(zn=null,null)})),zn}function wi(){return Fn!=null||(Fn=Aa(_l).then(e=>{if(!Array.isArray(e))return Fn=null,null;let n=new Map;for(let t of e){if(typeof(t==null?void 0:t.title)!="string"||typeof t.code!="string")continue;let i=typeof t.preview=="string"?t.preview:null;n.set(_a(t.title),p({title:t.title,code:t.code,description:typeof t.description=="string"?t.description:""},i?{imageURL:i.startsWith("http")?i:`${Al}${i}`}:{}))}return n})),Fn}async function Kl(e){let n=await Ma(`${Ml}/${e}`);if((n==null?void 0:n.status)===404)return null;if(!(n!=null&&n.ok))return;let t=await n.json().catch(()=>null);return Array.isArray(t==null?void 0:t.topics)?t.topics.filter(i=>typeof i=="string"):void 0}async function Aa(e){let n=await Ma(e);return n!=null&&n.ok?n.json().catch(()=>null):null}async function Ma(e){let n=typeof AbortController=="function"?new AbortController:null,t=setTimeout(()=>n==null?void 0:n.abort(),Ll);try{return await fetch(e,{signal:n==null?void 0:n.signal})}catch(i){return null}finally{clearTimeout(t)}}function zl(e,n){let t=e[n.toLowerCase()];return t&&Date.now()-t.at<Ta?t.topics:void 0}function Fl(){var e;try{let n=JSON.parse((e=localStorage.getItem(Pa))!=null?e:"{}");return n&&typeof n=="object"?n:{}}catch(n){return{}}}function Wl(e){let n=Date.now(),t=Object.entries(e).filter(([,i])=>n-i.at<Ta).sort(([,i],[,o])=>o.at-i.at).slice(0,Dl);try{localStorage.setItem(Pa,JSON.stringify(Object.fromEntries(t)))}catch(i){}}var jl=/^[0-9A-HJKMNP-TV-Z]{6}$/,Yl=6,ql="SYN-",Oa=60,Si=20,Ua=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],Gl="marketplace:installed:",Hf=`${Gl}snippet:`,Je="marketplace:theme-installed",La="marketplace",Ba={added:0,removed:1,unchanged:2},Vl=new RegExp(`^[a-z0-9][a-z0-9_-]{1,${Si-2}}[a-z0-9]$`);function Ha(e){let n=e.trim().replace(/^@/,"").toLowerCase();return/[^a-z0-9_-]/.test(n)?"Only letters, digits, _ and -":n.length<3?"At least 3 characters":!/^[a-z0-9]/.test(n)||!/[a-z0-9]$/.test(n)?"Start and end with a letter or digit":null}function ve(e){return`${ql}${e}`}function $a(e){let n=e.trim();if(n.length>200)return null;if(n.includes("/")){let i=n.split(/[?#]/)[0].replace(/\/+$/,"");n=i.slice(i.lastIndexOf("/")+1).replace(/\.json$/i,"")}n=n.toUpperCase().replace(/[\s-]/g,""),n.length===Yl+3&&n.startsWith("SYN")&&(n=n.slice(3));let t=n.replace(/O/g,"0").replace(/[IL]/g,"1");return jl.test(t)?t:null}function Ka(e){let n=e;return!n||typeof n.code!="string"||!n.keys||typeof n.keys!="object"||!Object.values(n.keys).every(t=>typeof t=="string")?null:{code:n.code,name:typeof n.name=="string"&&n.name?n.name:null,creator:typeof n.creator=="string"&&Vl.test(n.creator)?n.creator:null,updated_at:typeof n.updated_at=="number"?n.updated_at:0,keys:n.keys}}async function za(e,n){let t=e.filter(s=>!St(s)).map(s=>k(p({},s),{change:"added",isNew:!0})),i=dn(t);for(let s of t)!i.has(s.key)&&!Jl(s,n[s.key])&&i.set(s.key,{kind:"catalog"});let o=await fn(t,i),r=new Map;for(let[s,c]of[...o,...i])c.kind!=="unchecked"&&r.set(s,c);return{items:t,leftOut:r}}function Jl(e,n){if(e.type==="snippet")return!0;if(!e.repo)return!1;let t=Ql(n);return e.type==="extension"?typeof(t==null?void 0:t.extensionURL)=="string"&&t.extensionURL!=="":typeof(t==null?void 0:t.cssURL)=="string"&&t.cssURL!==""}function Fa(e,n){let t={};for(let[o,r]of Ua){let s=n.filter(c=>c.type===r&&e[c.key]!==void 0).map(c=>c.key);t[o]=JSON.stringify(s);for(let c of s)t[c]=e[c]}let i=Kn(e[Je]);return i&&n.some(o=>o.key===i)&&(t[Je]=e[Je]),t}function Wa(e,n,t,i,o,r){let s=r==="replace"?vt(n,void 0,t,i):Xl(n,t),c=Kn(e.keys[Je]),u=c!==null&&n.some(d=>d.key===c)&&i!==null&&i.current_theme!==La,y=c!==null&&c!==o?n.find(d=>d.key===c):void 0;return p(k(p({},s),{manual:u?[{type:"theme",name:La}]:[]}),y?{theme:{key:y.key,name:y.name}}:{})}function Xl(e,n){let t=new Set(n.map(s=>s.key)),i=new Set(e.map(s=>s.key)),o=[...e.map(s=>t.has(s.key)?k(p({},s),{change:"unchanged",isNew:!1}):k(p({},s),{change:"added",isNew:!0})),...n.filter(s=>!i.has(s.key)).map(s=>k(p({},s),{change:"unchanged",isNew:!1}))].sort((s,c)=>Ba[s.change]-Ba[c.change]||s.name.localeCompare(c.name)),r={added:0,removed:0,unchanged:0};for(let s of o)r[s.change]+=1;return{items:o,counts:r,manual:[]}}function ja(e,n){return new Set(e.items.filter(t=>t.type==="snippet"&&t.change==="added"&&(!n||!Tt(n,t.name))).map(t=>t.key))}async function Ya(e,n,t,i){let o=await ye(),r=Z(o),s=Z(e.keys),c={};for(let[g,h]of Ua){let C=Da(o[g]),b=[...n==="add"?C:C.filter(x=>t.includes(x)||r.some(w=>w.key===x&&Hn(w,s)))];for(let x of s){if(x.type!==h||t.includes(x.key))continue;let w=C.includes(x.key);if(n==="add"&&w)continue;let E=h==="snippet"?Zl(x,i,o[x.key]):e.keys[x.key];E!==void 0&&(c[x.key]=E,b.includes(x.key)||b.push(x.key))}c[g]=JSON.stringify(b)}let u=Kn(e.keys[Je]),y=Da(c["marketplace:installed-themes"]);u&&y.includes(u)&&!t.includes(u)&&(c[Je]=e.keys[Je]);let d=hi(o,c);return await gi(c,d),Object.keys(c).length+d.length}function Zl(e,n,t){let i=n?Tt(n,e.name):void 0;return i?JSON.stringify(p({code:i.code,title:i.title,description:i.description},i.imageURL?{imageURL:i.imageURL}:{})):t}function Da(e){try{let n=e?JSON.parse(e):[];return Array.isArray(n)?n.filter(t=>typeof t=="string"):[]}catch(n){return[]}}function Ql(e){try{let n=e?JSON.parse(e):null;return n&&typeof n=="object"&&!Array.isArray(n)?n:null}catch(n){return null}}var Wn="/api/shares",eu=`${Wn}/update`,nu=`${Wn}/delete`,tu=`${Wn}/import`,iu="x-syncify-user-hash",ou="discover/presets.json",au={no_code:"This code doesn't exist.",too_many_codes:"You can't make more share codes. Delete one to make another.",daily_limit:"Too many changes to share codes today. Try again tomorrow.",too_large:"This setup is too big to share.",invalid_name:"Names can be up to 60 characters.",empty:"There's nothing to share yet. Install something from Marketplace first.",invalid_items:"Syncify couldn't read some items. Reload Spotify and try again.",source:"Some items don't load from GitHub. Reload Spotify and try again.",blocked:"Some items are on Marketplace's block list. Reload Spotify and try again.",custom_snippet:"Custom snippets can't be shared. Reload Spotify and try again.",unchecked:"Couldn't check Marketplace's block list. Try again in a minute.",publish_failed:"Couldn't publish the code. Press Update on it to try again.",delete_failed:"Couldn't delete the code. Try again.",same_setup:"You already shared this setup.",invalid_handle:"Handles are 3 to 20 letters, digits, _ or -, starting and ending with a letter or digit.",reserved_handle:"That handle isn't allowed. Pick another.",handle_taken:"That handle is taken. Pick another.",unavailable:"Share codes aren't available yet."},ru=new Set(["offline","signed_out","invalid_signature","stale_salt","no_device_key","too_many_requests"]);function _t(e,n=null){var t;return e instanceof T&&ru.has(e.code)?Ge(e):e instanceof T&&e.code==="too_many_codes"&&n!==null?`You have ${n} share codes already. Delete one to make another.`:(t=e instanceof T?au[e.code]:void 0)!=null?t:"Something went wrong. Try again."}async function At(){var n;let e=await Ln(Wn,"GET");return{codes:Array.isArray(e==null?void 0:e.codes)?e.codes.flatMap(t=>{let i=su(t);return i?[i]:[]}):[],newHearts:typeof(e==null?void 0:e.new_hearts)=="number"?e.new_hearts:0,max:typeof(e==null?void 0:e.max)=="number"?e.max:null,profile:typeof((n=e==null?void 0:e.profile)==null?void 0:n.handle)=="string"?{handle:e.profile.handle,link:typeof e.profile.link=="string"?e.profile.link:null}:null,suggestedHandle:typeof(e==null?void 0:e.suggested_handle)=="string"?e.suggested_handle:null}}async function qa(e,n,t){return Qa(await Ln(Wn,"POST",p({name:e,keys:n},t===void 0?{}:{handle:t})))}function Mt(e){return`${D().shareUrl.replace(/\/+$/,"")}/@${e}`}async function Ga(e,n,t){return Qa(await Ln(eu,"POST",{code:e,name:n,keys:t}))}async function Va(e){try{await Ln(nu,"POST",{code:e})}catch(n){if(n instanceof T&&n.code==="no_code")return;throw n}}async function Ja(e){let n=D().shareUrl.replace(/\/+$/,""),t;try{t=await fetch(`${n}/${e}.json`)}catch(o){throw new T("offline")}if(t.status===404||t.status===403)throw new T("no_code");if(!t.ok)throw new T("failed");let i=Ka(await t.json().catch(()=>null));if(!i||i.code!==e)throw new T("no_code");return i}async function Xa(){let e=D().shareUrl.replace(/\/+$/,"");try{let n=await fetch(`${e}/${ou}`);if(!n.ok)return null;let t=await n.json();return Array.isArray(t.posts)?t.posts.flatMap(i=>{let o=uu(i);return o?[o]:[]}):null}catch(n){return null}}async function Za(e,n,t=!1){try{await aa(tu,p({code:e},t?{source:"preset"}:{}),{[iu]:n.hash})}catch(i){}}function su(e){let n=e;return!n||typeof n.code!="string"?null:{code:n.code,name:typeof n.name=="string"&&n.name?n.name:null,link:typeof n.link=="string"?n.link:null,item_count:typeof n.item_count=="number"?n.item_count:0,imports:typeof n.imports=="number"?n.imports:0,created_at:typeof n.created_at=="number"?n.created_at:0,updated_at:typeof n.updated_at=="number"?n.updated_at:0,hearts:lu(e.post),posted:cu(e.post)}}function cu(e){let n=e==null?void 0:e.status;return typeof n=="string"&&n!=="removed"}function lu(e){let n=e;return(n==null?void 0:n.status)==="public"&&n.hidden!==!0&&typeof n.hearts=="number"?n.hearts:null}function uu(e){let n=e,t=i=>Number.isSafeInteger(i)&&i>=0?i:0;return!n||typeof n.code!="string"?null:{code:n.code,name:typeof n.name=="string"?n.name:ve(n.code),extensions:t(n.extensions),themes:t(n.themes),snippets:t(n.snippets)}}function Qa(e){let n=e;if(typeof(n==null?void 0:n.code)!="string")throw new T("failed");return{code:n.code,link:typeof n.link=="string"?n.link:null,leftOut:Array.isArray(n.left_out)?n.left_out.length:0}}var er="/claims",yu="/claims/cancel",du={no_backup:"Back up first, then secure your backup.",unsupported_identity:"This Spotify account can't be secured.",too_many_accounts:"Your account already has 10 Spotify accounts linked.",undone:"This backup can't be secured with your account.",offline:"Couldn't reach Syncify. Check your connection and try again."},Oe=class extends Error{constructor(t){var i;super((i=du[t])!=null?i:"Couldn't secure your backup. Try again.");this.code=t;this.name="ClaimError"}};async function nr(e,n){let t=await vi(e,n,"GET",er);if(!t.ok)throw new Oe(await xi(t));let i=await t.json().catch(()=>null);return{claim:On(i==null?void 0:i.claim),accounts:Array.isArray(i==null?void 0:i.accounts)?i.accounts.filter(fu):null}}async function tr(e,n){let t=await vi(e,n,"POST",er);if(!t.ok)throw new Oe(await xi(t));let i=await t.json().catch(()=>null);return On(i==null?void 0:i.claim)}async function ir(e,n){let t=await vi(e,n,"POST",yu);if(t.status===404)return"cancelled";if(!t.ok)throw new Oe(await xi(t));let i=await t.json().catch(()=>null);return(i==null?void 0:i.held)===!0?"checking":"cancelled"}async function vi(e,n,t,i){try{return await Be(e,n,{method:t},i)}catch(o){throw o instanceof TypeError?new Oe("offline"):o}}async function xi(e){let n=await e.json().catch(()=>null);return typeof(n==null?void 0:n.code)=="string"?n.code:"failed"}function fu(e){let n=e;return!!(n&&typeof n.hash=="string"&&(n.status==="pending"||n.status==="final"||n.status==="cancelled"||n.status==="unlinked"))}var mn={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},pu=/^([a-z0-9]|f([1-9]|1[0-2]))$/,mu=250,gu=40,Ci=null,Lt=null,pn=null;function or(){return/mac/i.test(navigator.platform||navigator.userAgent)}function ar(e){if(e===null)return null;if(!e||typeof e!="object")return mn;let n=e;return typeof n.key!="string"||!pu.test(n.key)?mn:{key:n.key,ctrl:!!n.ctrl,alt:!!n.alt,shift:!!n.shift,meta:!!n.meta}}function Bt(e){if(!e)return"Off";let n=e.key.toUpperCase();return or()?[e.ctrl?"\u2318":"",e.alt?"\u2325":"",e.shift?"\u21E7":"",n].join(""):[e.ctrl&&"Ctrl",e.meta&&"Win",e.alt&&"Alt",e.shift&&"Shift",n].filter(Boolean).join("+")}function rr(e){if(e.key==="Escape")return{kind:"cancel"};let n=hu(e.code);if(!n)return{kind:"ignore"};let t=or();if(t&&e.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:n,ctrl:t?e.metaKey:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:t?!1:e.metaKey},o=n.startsWith("f")&&n.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!o?{kind:"error",message:`Include ${t?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function hu(e){var t,i;let n=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(e);return n?((i=(t=n[1])!=null?t:n[2])!=null?i:n[3]).toLowerCase():null}function sr(e){var n;if(pn&&bu(pn,e))return!1;try{let t=Spicetify.Mousetrap,i=(n=t.trigger)==null?void 0:n.call(t)._directMap;if(!i)return!1;let o=Ni(e);return Object.keys(i).some(r=>r.startsWith(`${o}:`))}catch(t){return!1}}function Ii(e,n,t=0){if(Ci=n,Lt=e,!cr()){if(t>=gu){console.warn("[Syncify]","Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>Ii(Lt,n,t+1),mu);return}Ei(Lt)}function Ei(e){if(Lt=e,!cr()||!Ci)return;let n=Ci;try{if(pn&&Spicetify.Keyboard._deregisterShortcut(pn),pn=null,!e)return;Spicetify.Keyboard.registerShortcut(e,t=>{t.preventDefault(),n()}),pn=e,console.debug("[Syncify]","Keyboard shortcut registered",Bt(e))}catch(t){console.warn("[Syncify]","Failed to register keyboard shortcut",t)}}function cr(){var e;return typeof((e=Spicetify.Keyboard)==null?void 0:e.registerShortcut)=="function"}function Ni(e){return[e.ctrl&&"mod",e.meta&&"meta",e.alt&&"alt",e.shift&&"shift",e.key].filter(Boolean).join("+")}function bu(e,n){return Ni(e)===Ni(n)}var Ri="both",ku=["both","topbar","menu"],jn=null,Yn=null,Dt=!1;function lr(e){return ku.includes(e)?e:Ri}function ur(){var e;return typeof((e=Spicetify.Menu)==null?void 0:e.Item)=="function"}function yr(e){jn=e.topbarButton,Yn=e.menuItem}function Ot(e){let n=e!=="menu"||!Yn,t=e!=="topbar";if(jn!=null&&jn.element&&(jn.element.style.display=n?"":"none"),!!Yn)try{t&&!Dt?(Yn.register(),Dt=!0):!t&&Dt&&(Yn.deregister(),Dt=!1)}catch(i){console.warn("[Syncify]","Failed to update profile menu item",i)}}var Ht="syncify:config",Ut={workerUrl:D().workerUrl,autoBackupEnabled:!1,shortcut:mn,entryPoint:Ri};function de(){var t,i;let e=D(),n=(i=(t=Spicetify.LocalStorage)==null?void 0:t.get(Ht))!=null?i:window.localStorage.getItem(Ht);if(!n)return k(p({},Ut),{workerUrl:e.workerUrl});try{let o=JSON.parse(n);return{workerUrl:e.workerUrl,autoBackupEnabled:o.autoBackupEnabled===void 0?Ut.autoBackupEnabled:!!o.autoBackupEnabled,shortcut:o.shortcut===void 0?Ut.shortcut:ar(o.shortcut),entryPoint:lr(o.entryPoint)}}catch(o){return k(p({},Ut),{workerUrl:e.workerUrl})}}function dr(e){var t;let n=JSON.stringify({workerUrl:D().workerUrl,autoBackupEnabled:e.autoBackupEnabled,shortcut:e.shortcut,entryPoint:e.entryPoint});if((t=Spicetify.LocalStorage)!=null&&t.set){Spicetify.LocalStorage.set(Ht,n);return}window.localStorage.setItem(Ht,n)}function qn(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}var wu=["username","canonicalUsername","id","uri","displayName"];async function xe(){let{value:e,field:n}=await Su();return{hash:await kt(e),field:n}}async function Su(){var o;let e=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let n=await e.getUser(),t=wu.find(r=>(n==null?void 0:n[r])!=null),i=t?n[t]:void 0;if(!t||!i)throw new Error("Unable to resolve the active Spotify user.");return{value:i,field:t}}async function Vn(e){if(!qn(e))throw new Error("Syncify backup service is not configured.");let[n,t]=await Promise.all([xe(),Na()]);if(t.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:i,unapproved:o}=await ca(e.workerUrl,n,t);return{payload:t,unchanged:i,unapproved:o}}async function Xe(e,n){var c;if(!qn(e))throw new Error("Syncify backup service is not configured.");let t=await li(e.workerUrl,await xe(),n),[i,o,r]=await Promise.all([Promise.all(t.backups.map(Ti)),t.safetyCopy?Ti(t.safetyCopy):null,Promise.all(t.unapproved.map(Ti))]),s=i.filter((u,y)=>i.findIndex(d=>d.payload_hash===u.payload_hash)===y);return k(p({},t),{payload:(c=s[0])!=null?c:null,backups:s,safetyCopy:o&&!s.some(u=>u.payload_hash===o.payload_hash)?o:null,unapproved:r.filter(u=>!s.some(y=>y.payload_hash===u.payload_hash))})}var Pi=new Map;async function Ti(e){var r,s,c;let n=(s=(r=e.marketplace_data)==null?void 0:r.keys)!=null?s:{},t=e.spicetify_config?fi(e.spicetify_config,n):void 0,i=`${e.payload_hash} ${(c=e.metadata)==null?void 0:c.last_sync_datetime}`,o=Pi.get(i);return o||(o=It(n,t),Pi.set(i,o),o.catch(()=>Pi.delete(i))),k(p(p({},e),t?{spicetify_config:t}:{}),{payload_hash:await o})}async function fr(e){let n=await li(Jn(e),await xe());return{claim:n.claim,install:n.install,nudge:n.nudge}}async function pr(e,n,t,i=[]){var c;let o=n!=null?n:(await Xe(e)).payload;if(!o)throw new Error("No Syncify cloud backup was found for this Spotify account.");let r=await Ia(o,i),s=(c=o.backup)==null?void 0:c.id;return s&&qn(e)&&xe().then(u=>ua(e.workerUrl,u,s,t)).catch(()=>{}),{payload:o,restoredCount:r}}var Gn=class extends Error{constructor(t){super("Couldn't back up your setup first, so nothing changed.");this.reason=t;this.name="SafetyBackupError"}};async function mr(e,n,t,i,o,r=!1){try{await Vn(e)}catch(c){throw new Gn(c)}let s=await Ya(n,t,i,o);return xe().then(c=>Za(n.code,c,r)).catch(()=>{}),s}async function gr(e){let n=await xe(),t=await nr(Jn(e),n);return k(p({},t),{hash:n.hash})}async function hr(e){await tr(Jn(e),await xe())}async function $t(e,n,t){await la(Jn(e),await xe(),n,t)}async function Kt(e){return ir(Jn(e),await xe())}function Jn(e){if(!qn(e))throw new Error("Syncify backup service is not configured.");return e.workerUrl}var br="syncify:nudge-hidden-until",kr="syncify:nudge-panel-shown";function wr(e=Date.now()){let n=Number(Cr(br));return Number.isFinite(n)&&n>e}function Sr(e=Date.now()){Nr(br,String(e+30*864e5))}function vr(){return Cr(kr)!==null}function xr(){Nr(kr,"1")}function Cr(e){var n,t;return(t=(n=Spicetify.LocalStorage)==null?void 0:n.get(e))!=null?t:window.localStorage.getItem(e)}function Nr(e,n){var t;(t=Spicetify.LocalStorage)!=null&&t.set?Spicetify.LocalStorage.set(e,n):window.localStorage.setItem(e,n)}var _i="syncify:claim-check-day",Ir="syncify:undone-claim-shown";async function Er(e){var t,i;let n=de();if(n.workerUrl){if(!n.autoBackupEnabled)return vu(e);try{let[o,r]=await Promise.all([Et(),Xe(n)]);Rr(r,e);let s=(i=(t=r.payload)==null?void 0:t.metadata.marketplace_key_count)!=null?i:0;if(r.exists&&Ea(o.keyCount,s)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(r.backups.some(u=>u.payload_hash===o.hash)||o.keyCount===0)return;let{unapproved:c}=await Vn(n);Spicetify.showNotification(c?"Syncify: backed up, waiting for approval":"Syncify auto-backup complete")}catch(o){if(o instanceof re||o instanceof Ve){Spicetify.showNotification("Syncify: sign in to keep backing up",!0,8e3);return}let r=o instanceof Error?o.message:String(o);console.warn("Syncify startup sync failed:",o),Spicetify.showNotification(`Syncify auto-sync skipped: ${r}`,!0,8e3)}}}async function vu(e){let n=new Date().toLocaleDateString("en-CA");if(Pr(_i)!==n)try{let t=await fr(de());Ai(_i,n),Rr(t,e)}catch(t){if(t instanceof re){Ai(_i,n);return}console.warn("Syncify claim check failed:",t)}}function Rr(e,n){var r;let t=xu(e.claim),i=Cu(e.claim),o=(r=e.install)==null?void 0:r.waiting[0];t?n.onClaim(t):i?n.onUndone(i)&&Ai(Ir,String(i.undone_at)):o?n.onInstall(o):e.nudge&&!vr()&&n.onNudge()}function xu(e){return(e==null?void 0:e.status)==="pending"&&!e.mine&&!e.not_me?e:null}function Cu(e){return(e==null?void 0:e.status)==="undone"&&Pr(Ir)!==String(e.undone_at)?e:null}function Pr(e){var n,t;return(t=(n=Spicetify.LocalStorage)==null?void 0:n.get(e))!=null?t:window.localStorage.getItem(e)}function Ai(e,n){var t;(t=Spicetify.LocalStorage)!=null&&t.set?Spicetify.LocalStorage.set(e,n):window.localStorage.setItem(e,n)}var Li="syncify:pending-restore",Nu=600*1e3,Iu=2e3,Eu=15e3,Ru="marketplace:theme-installed",Pu="raw.githubusercontent.com",Tu=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],Ce=null,Mi=new Set,Ar=new Map;function Mr(){return Ce}function Lr(e){return Mi.add(e),()=>Mi.delete(e)}function Br(){Ce&&$r(k(p({},Ce),{manual:[]}))}function Zn(e,n="restore"){try{localStorage.setItem(Li,JSON.stringify({at:Date.now(),manual:e,kind:n}))}catch(t){}}function Dr(){var e;Zn((e=Ce==null?void 0:Ce.manual)!=null?e:[],Ce==null?void 0:Ce.kind),window.location.reload()}function Or(){Kr()&&(document.addEventListener("load",e=>Tr(e.target,"load"),!0),document.addEventListener("error",e=>Tr(e.target,"error"),!0))}async function Ur(){let e=Kr();if(!e)return;try{localStorage.removeItem(Li)}catch(s){}let n=Date.now(),t=await _r();for(;t.loaded<t.total&&Date.now()-n<Eu;)await new Promise(s=>setTimeout(s,Iu)),t=await _r();$r(k(p({kind:e.kind,at:Date.now()},t),{manual:e.manual}));let i=t.loaded===t.total&&e.manual.length===0,o=e.kind==="share"?"Setup applied":"Backup restored",r=e.kind==="share"?"loaded":"restored";Spicetify.showNotification(i?`Syncify: ${o}; ${t.total} ${t.total===1?"item":"items"}`:`Syncify: ${r} ${t.loaded} of ${t.total}. Open Syncify for details.`,!1,8e3)}function Hr(e){let n=e.map(t=>t.type==="extension"?`spicetify config extensions ${zt(t.name)}`:t.type==="custom_app"?`spicetify config custom_apps ${zt(t.name)}`:`spicetify config current_theme ${zt(t.name)}${t.scheme?` color_scheme ${zt(t.scheme)}`:""}`);return n.length>0?[...n,"spicetify apply"]:[]}function zt(e){return/^[\w.@+/-]+$/.test(e)?e:`"${e}"`}function $r(e){Ce=e;for(let n of Mi)n(e)}function Kr(){var e;try{let n=JSON.parse((e=localStorage.getItem(Li))!=null?e:"null");return!n||Date.now()-n.at>Nu?null:{manual:Array.isArray(n.manual)?n.manual:[],kind:n.kind==="share"?"share":"restore"}}catch(n){return null}}function Tr(e,n){e instanceof HTMLScriptElement&&e.src&&Ar.set(Xn(e.src),n)}async function _r(){var i;let e=await ye(),n=(i=e[Ru])!=null?i:"",t=Z(e).filter(o=>o.type==="extension"&&o.sources.length>0||o.type==="theme"&&n.includes(o.key)||o.type==="snippet");return{loaded:t.filter(_u).length,total:t.length}}function _u(e){var n,t;if(e.type==="snippet"){let i=document.querySelector("style.marketplaceSnippets");return((n=i==null?void 0:i.textContent)==null?void 0:n.includes(`/* ${e.name} - `))===!0}if(e.type==="theme"){let i=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((t=i==null?void 0:i.textContent)!=null&&t.trim())}return Au(e.sources[0]).some(Mu)}function Au(e){let n;try{n=new URL(e)}catch(s){return[]}if(n.host!==Pu)return[Xn(n.href)];let[t,i,o,...r]=n.pathname.split("/").filter(Boolean);return!t||!i||!o||r.length===0?[]:Tu.map(s=>Xn(`https://${s}/gh/${t}/${i}@${o}/${r.join("/")}`))}function Mu(e){let n=Ar.get(e);return n?n==="load":[...document.querySelectorAll("script[src]")].some(i=>Xn(i.src)===e)&&performance.getEntriesByType("resource").some(i=>Xn(i.name)===e)}function Xn(e){try{let n=new URL(e);return`${n.origin}${n.pathname}`}catch(n){return e}}var Lu="syncify:beta",zr=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function Fr(){var e;return(e=window.SyncifyLoader)!=null?e:null}function Bu(){try{return window.localStorage.getItem(Lu)==="true"}catch(e){return!1}}async function Wr(e){let n=Bu()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(n.map(i=>Du(`${e}/${i}`)))).reduce((i,o)=>o&&(!i||Di(o,i)>0)?o:i,null)}function Bi(e){return typeof e=="string"&&zr.test(e)}function Di(e,n){let[t,i]=[e,n].map(o=>{var y;let[,r,s,c,u]=(y=zr.exec(o))!=null?y:[];return[r,s,c,u!=null?u:1/0].map(Number)});for(let o=0;o<t.length;o+=1)if(t[o]!==i[o])return t[o]<i[o]?-1:1;return 0}async function Du(e,n=3e3){let t=typeof AbortController=="function"?new AbortController:null,i=setTimeout(()=>t==null?void 0:t.abort(),n);try{let o=await fetch(e,{signal:t==null?void 0:t.signal});if(!o.ok)return null;let r=await o.json();return Bi(r==null?void 0:r.version)?r.version:null}catch(o){return null}finally{clearTimeout(i)}}function Ze(...e){return e.filter(Boolean).join(" ")}function Oi(e,n){return n===void 0?e:k(p({},e),{key:n})}function a(e,n,t){let r=n,{children:i}=r,o=_e(r,["children"]);return i===void 0?_n(e,Oi(o,t)):_n(e,Oi(o,t),i)}function l(e,n,t){let s=n,{children:i}=s,o=_e(s,["children"]),r=Array.isArray(i)?i:[i];return _n(e,Oi(o,t),...r)}var Ou={primary:"regular",secondary:"regular",danger:"regular",text:"small",subtle:"small"};function $(e){let u=e,{variant:n="primary",size:t=Ou[n],type:i="button",icon:o,children:r,className:s}=u,c=_e(u,["variant","size","type","icon","children","className"]);return l("button",k(p({className:Ze("syncify-btn",s),"data-variant":n,"data-size":t,type:i},c),{children:[o,a("span",{className:"syncify-cap",children:r})]}))}function Ui(e){return a("input",{className:"syncify-checkbox",type:"checkbox","aria-label":e.label,checked:e.checked,onChange:n=>e.onChange(n.currentTarget.checked),disabled:e.disabled})}var Uu=0;function fe(e){let[n]=m(()=>`syncify-${e}-${++Uu}`);return n}function gn(e){let o=e,{children:n,className:t}=o,i=_e(o,["children","className"]);return a("svg",k(p({className:Ze("syncify-icon",t),viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},i),{children:n}))}function Hi(e){return a(gn,k(p({},e),{children:a("path",{d:"m9 6 6 6-6 6"})}))}function $i(e){return a(gn,k(p({},e),{children:a("path",{d:"m6 9 6 6 6-6"})}))}function Qe(e){return a(gn,k(p({},e),{children:a("path",{d:"M5 12.5l4.5 4.5L19 7.5"})}))}function Ki(e){return a(gn,k(p({},e),{children:a("path",{d:"M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z"})}))}function zi(e){return l(gn,k(p({},e),{"data-filled":"true",children:[a("rect",{x:"4",y:"10.5",width:"3",height:"3",rx:"0.75"}),a("rect",{x:"10.5",y:"10.5",width:"3",height:"3",rx:"0.75"}),a("rect",{x:"17",y:"10.5",width:"3",height:"3",rx:"0.75"})]}))}function Fi(e){return l(gn,k(p({},e),{children:[a("path",{d:"M12 6v7"}),a("path",{d:"M12 17.5v.5"})]}))}function hn(e){return a("ul",{className:"syncify-list","aria-label":e.label,children:e.children})}function Ft(){return a("li",{className:"syncify-list-divider",role:"presentation"})}function Ue(e){let n=l(P,{children:[e.leading?a("span",{className:"syncify-row-leading",children:e.leading}):null,l("span",{className:"syncify-row-name",children:[a("span",{className:"syncify-row-name-text",children:e.name}),e.nameMark]}),e.meta?a("span",{className:"syncify-row-meta",children:e.meta}):null,e.end?a("span",{className:"syncify-row-end",children:e.end}):null]}),t=e.meta?"2":"1";return a("li",{className:"syncify-list-item",children:e.onOpen?l("button",{className:"syncify-row",id:e.id,"data-lines":t,type:"button","aria-label":e.openLabel,onClick:e.onOpen,disabled:e.disabled,children:[n,a(Hi,{className:"syncify-row-chevron"})]}):a("div",{className:"syncify-row",id:e.id,"data-lines":t,children:n})})}function Ne(e){return a("span",{className:"syncify-mark-square","data-tone":e.tone,"data-size":e.icon?"large":"small",role:e.label?"img":void 0,"aria-label":e.label,"aria-hidden":e.label?void 0:"true",children:e.icon})}function Wi(e){return a("span",{className:"syncify-badge",role:"img","aria-label":e.label,children:a("span",{className:"syncify-cap",children:e.count})})}function ji(e){let n=fe("menu"),[t,i]=m(!1),o=F(null),r=F(null),s=e.items.some(g=>g.checked!==void 0);M(()=>{var w,E;let g=r.current,h=o.current;if(!t||!g||!h)return;$u(g),Fu(g,h);let C=jr(g);(E=(w=C.find(_=>_.getAttribute("aria-checked")==="true"))!=null?w:C[0])==null||E.focus();let v=()=>i(!1),b=_=>{let H=_.target;H instanceof Node&&!g.contains(H)&&!h.contains(H)&&v()},x=_=>{_.target instanceof Node&&g.contains(_.target)||v()};return document.addEventListener("pointerdown",b,!0),document.addEventListener("scroll",x,!0),window.addEventListener("resize",v),()=>{document.removeEventListener("pointerdown",b,!0),document.removeEventListener("scroll",x,!0),window.removeEventListener("resize",v),Ku(g)}},[t]);function c(){var g;i(!1),(g=o.current)==null||g.focus()}function u(g){let h=jr(g.currentTarget),C=h.findIndex(b=>b===document.activeElement),v=g.key==="ArrowDown"?h[(C+1)%h.length]:g.key==="ArrowUp"?h[(C-1+h.length)%h.length]:g.key==="Home"?h[0]:g.key==="End"?h[h.length-1]:null;v?(g.preventDefault(),v.focus()):g.key==="Escape"?(g.preventDefault(),c()):g.key==="Tab"&&i(!1)}function y(g){(g.key==="ArrowDown"||g.key==="ArrowUp")&&(g.preventDefault(),i(!0))}let d={ref:o,type:"button","aria-haspopup":"menu","aria-expanded":t,"aria-controls":t?n:void 0,disabled:e.disabled,onClick:()=>i(!t),onKeyDown:y};return l(P,{children:[e.trigger==="more"?a("button",k(p({className:"syncify-icon-btn","aria-label":e.label},d),{children:a(zi,{})})):l("button",k(p({className:"syncify-menu-value","aria-label":`${e.label}: ${e.trigger.value}`},d),{children:[a("span",{className:"syncify-cap",children:e.trigger.value}),a($i,{})]})),t?a("div",{className:"syncify-menu",id:n,ref:r,role:"menu","aria-label":e.label,popover:"manual",onKeyDown:u,children:e.items.map(g=>a(Hu,{item:g,picks:s,onPick:()=>{c(),g.onSelect()}},g.label))}):null]})}function Hu(e){let{item:n,picks:t}=e;return l("button",{className:"syncify-menu-item",type:"button",role:t?"menuitemradio":"menuitem","aria-checked":t?n.checked===!0:void 0,"data-danger":n.danger?"true":void 0,tabIndex:-1,disabled:n.disabled,onClick:e.onPick,children:[a("span",{className:"syncify-cap",children:n.label}),n.checked?a(Qe,{}):null]})}function jr(e){return[...e.querySelectorAll(".syncify-menu-item:not(:disabled)")]}function $u(e){typeof e.showPopover=="function"&&!e.matches(":popover-open")&&e.showPopover()}function Ku(e){typeof e.hidePopover=="function"&&e.matches(":popover-open")&&e.hidePopover()}var zu=4;function Fu(e,n){let t=zu,i=n.getBoundingClientRect(),o=e.getBoundingClientRect(),r=i.bottom+t,s=r+o.height>window.innerHeight&&i.top-t-o.height>=0?i.top-t-o.height:r,c=Math.min(Math.max(i.right-o.width,t),window.innerWidth-o.width-t);e.style.top=`${s}px`,e.style.left=`${c}px`}function en(){return l(P,{children:[a("span",{className:"syncify-dot","aria-hidden":"true"}),a("span",{className:"syncify-visually-hidden",children:", "})]})}function Y(e){let n=e.parts.filter(t=>t!=null&&t!==!1&&t!=="");return a("span",{className:Ze("syncify-meta",e.className),children:n.map((t,i)=>l(P,{children:[i>0?a(en,{}):null,a("span",{className:"syncify-meta-part",children:t})]},i))})}function Q(e){let n=e.tone==="error"?"alert":e.live?"status":void 0;return l("div",{className:"syncify-notice","data-tone":e.tone,role:n,children:[l("span",{className:"syncify-notice-body",children:[a("span",{className:"syncify-notice-mark",children:a(Ne,{tone:e.tone})}),a("span",{className:"syncify-notice-text",children:e.children})]}),e.actions?a("span",{className:"syncify-notice-actions",children:e.actions}):null]})}function Qn(e){return a("span",{className:"syncify-pip-square","data-kind":e.kind,"aria-hidden":"true"})}function Yi(e){return l("div",{className:"syncify-section-label",children:[a("h3",{className:"syncify-section-label-title",id:e.id,tabIndex:e.focusable?-1:void 0,children:e.title}),e.end]})}function qi(e){return l("div",{className:"syncify-setting-row",children:[l("span",{className:"syncify-setting-row-text",children:[a("span",{className:"syncify-setting-row-label",children:e.label}),e.value?a("span",{className:"syncify-setting-row-value",children:e.value}):null]}),e.children]})}function Wt(){return a("li",{className:"syncify-list-item","aria-hidden":"true",children:l("div",{className:"syncify-row","data-lines":"2",children:[a("span",{className:"syncify-row-name",children:a("span",{className:"syncify-skeleton","data-width":"name"})}),a("span",{className:"syncify-row-meta",children:a("span",{className:"syncify-skeleton","data-width":"meta"})})]})})}var Yr=(e,n)=>`${e}-tab-${n}`,qr=(e,n)=>`${e}-panel-${n}`;function Gi(e){let n=F(null);function t(i){var c,u;let o=e.tabs.length,r=e.tabs.findIndex(y=>y.id===e.selected),s=i.key==="ArrowRight"?(r+1)%o:i.key==="ArrowLeft"?(r-1+o)%o:i.key==="Home"?0:i.key==="End"?o-1:null;s!==null&&(i.preventDefault(),e.onSelect(e.tabs[s].id),(u=(c=n.current)==null?void 0:c.querySelectorAll('[role="tab"]')[s])==null||u.focus())}return a("div",{className:"syncify-tabs",role:"tablist","aria-label":e.label,ref:n,onKeyDown:t,children:e.tabs.map(i=>{let o=i.id===e.selected;return l("button",{className:"syncify-tab",id:Yr(e.idBase,i.id),type:"button",role:"tab","aria-selected":o,"aria-controls":qr(e.idBase,i.id),tabIndex:o?0:-1,onClick:()=>e.onSelect(i.id),children:[a("span",{className:"syncify-cap",children:i.label}),i.status]},i.id)})})}function Ie(e){return l("div",{className:"syncify-tab-panel",id:qr(e.idBase,e.id),role:"tabpanel","aria-labelledby":Yr(e.idBase,e.id),children:[a("div",{className:"syncify-tab-scroll",tabIndex:0,children:e.children}),e.actions?a("div",{className:"syncify-tab-actions",children:e.actions}):null]})}function Vi(){return l("svg",{className:"syncify-warning-icon",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[a("path",{d:"M12 3 2 21h20z"}),a("path",{d:"M12 10v5"}),a("path",{d:"M12 18h.01"})]})}function bn(){return a("svg",{className:"syncify-chevron",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:a("path",{d:"m9 6 6 6-6 6"})})}function Gr(){return l("svg",{className:"syncify-clock",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[a("circle",{cx:"12",cy:"12",r:"9"}),a("path",{d:"M12 7v5l3 2"})]})}function Ji(){return l("svg",{className:"syncify-external",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[a("path",{d:"M14 4h6v6"}),a("path",{d:"M20 4 10 14"}),a("path",{d:"M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"})]})}function Vr(){return l("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[a("path",{d:"M18 6 6 18"}),a("path",{d:"m6 6 12 12"})]})}function Jr(e,n=new Date){let t=new Date(e);return t.toDateString()===n.toDateString()?"today":t.toLocaleDateString(void 0,{month:"short",day:"numeric",year:t.getFullYear()===n.getFullYear()?void 0:"numeric"})}function Xr(e){let n=Jr(e);return n==="today"?n:`on ${n}`}function Wu(e){let n=Jr(e);return n==="today"?n:`by ${n}`}function Xi(e){var n;return e.not_me?{title:"Syncify is checking this claim",text:null}:{title:`${(n=e.email)!=null?n:"Someone"} is securing this backup`,text:e.held?"Syncify is checking it.":`If that isn't you, press Not me ${Wu(e.final_at)}.`}}function Zr(e){let{title:n,text:t}=Xi(e);return t?`${n}. ${t}`:`${n}.`}function Qr(e){var n;return`This backup is no longer secured by ${(n=e.email)!=null?n:"another account"}.`}function jt(e){return e==="cancelled"?"Syncify: claim cancelled":"Syncify: sent for a check"}function Yt(e){return`A new install${e.device?` on ${e.device}`:""} wants to back up this Spotify account`}function es(e,n,t){var s,c;if(n==="not_owner")return{kind:"other-account"};if(!e)return t?{kind:"other-claim"}:{kind:"unknown"};let{claim:i}=e;if((i==null?void 0:i.status)==="final"){if(!i.mine)return{kind:"other-account"};let u=((s=e.accounts)!=null?s:[]).filter(y=>y.status==="final").length;return{kind:"secured",linkedCount:Math.max(u,1)}}if((i==null?void 0:i.status)==="pending")return i.mine?{kind:"pending",finalAt:i.final_at,held:i.held}:{kind:"other-claim"};let o=((c=e.accounts)!=null?c:[]).filter(u=>u.hash===e.hash),r=o[o.length-1];return(r==null?void 0:r.status)==="unlinked"?{kind:"ended",reason:"undone"}:(r==null?void 0:r.status)==="cancelled"&&r.cancelled_by!=="claimer"?{kind:"ended",reason:r.cancelled_by==="owner"?"owner":"admin"}:{kind:"open"}}function ns(e,n,t){return n?{kind:"warning",label:"Sign in to see your backups"}:e?t.kind==="secured"?{kind:"ok",label:"Signed in, backup secured"}:t.kind==="pending"?null:t.kind==="open"?{kind:"warning",label:"Backup not secured yet"}:t.kind==="ended"?{kind:"warning",label:"Backup not secured"}:{kind:"ok",label:"Signed in"}:null}function ts(e){return e.held?"Syncify is checking your request to secure this backup":`Your backup will be secured ${Xr(e.finalAt)}`}var qt=6,ju=600*1e3,Yu=300,qu=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function Gu(e){let n=e.lastIndexOf("@");return n<1?e:`${e[0]}***${e.slice(n)}`}function is(e){return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}var Vu={owner:"This backup isn't secured. Someone using this Spotify account said it isn't yours.",admin:"This backup isn't secured. Syncify couldn't confirm it's yours.",undone:"This backup is no longer secured by your account."};function os(e){let{session:n,secure:t}=e,[i,o]=m(()=>ht()),[r,s]=m(()=>ht().email),[c,u]=m(""),[y,d]=m(!1),[g,h]=m(null),[C,v]=m(()=>Date.now()),{handle:b,onHandle:x}=e;M(()=>{if(!n||b!==void 0)return;let I=!0;return At().then(A=>{var ge,ie;I&&x((ie=(ge=A.profile)==null?void 0:ge.handle)!=null?ie:null)}).catch(()=>{}),()=>{I=!1}},[n,b]);let w=!!(i.codeSentAt&&C-i.codeSentAt<ju),E=Math.max(0,Math.ceil((i.retryAt-C)/1e3)),_=i.retryEmail===null||i.retryEmail===r.trim().toLowerCase()?E:0;M(()=>{if(!n)return;let I=!0;return ta().then(A=>{!I||A||(h({kind:"warning",text:Ge(new T("signed_out"))}),e.onSignedOut())}).catch(()=>{}),()=>{I=!1}},[n==null?void 0:n.token]),M(()=>{if(i.retryAt<=Date.now())return;let I=setInterval(()=>{v(Date.now()),i.retryAt<=Date.now()&&clearInterval(I)},1e3);return()=>clearInterval(I)},[i.retryAt]);function H(I){let A=p(p({},ht()),I);Jo(A),o(A),v(Date.now())}async function pe(I){var ge;let A=I.trim();if(!qu.test(A)){h({kind:"error",text:"Enter a valid email address."});return}d(!0),h(null);try{let ie=await ea(A,{nudge:e.nudge});H({email:A,codeSentAt:Date.now(),retryAt:Date.now()+ie*1e3,retryEmail:A.toLowerCase()}),u("")}catch(ie){let q=ie instanceof T?ie:null,se=(ge=q==null?void 0:q.retryAfter)!=null?ge:null,Ee=se&&se<=Yu?Date.now()+se*1e3:0,K=(q==null?void 0:q.code)==="too_many_requests"?null:A.toLowerCase();if((q==null?void 0:q.code)==="resend_wait"){H({email:A,codeSentAt:i.email===A&&i.codeSentAt?i.codeSentAt:Date.now(),retryAt:Ee,retryEmail:K});return}Ee&&H({retryAt:Ee,retryEmail:K}),h({kind:"error",text:Ge(ie)})}finally{d(!1)}}async function J(){d(!0),h(null);try{let I=await na(i.email,c);H({codeSentAt:null}),u(""),e.onSignedIn(I)}catch(I){h({kind:"error",text:Ge(I)});let A=I instanceof T?I.code:null;(A==="too_many_attempts"||A==="code_expired")&&u("")}finally{d(!1)}}async function R(){var A;let I=(A=n==null?void 0:n.email)!=null?A:"";d(!0),h(null),await ia(),H({email:I,codeSentAt:null}),s(I),d(!1),e.onSignedOut()}async function L(){d(!0),h(null);try{e.onOpenWebsite(await oa())}catch(I){let A=I instanceof T&&I.code==="signed_out";h({kind:A?"warning":"error",text:Ge(I)}),A&&e.onSignedOut()}finally{d(!1)}}let me=g?a("div",{className:"syncify-alert","data-kind":g.kind==="error"?"error":void 0,role:"alert",children:g.text}):null;if(n===void 0)return null;if(n){let I=t.kind==="open"||t.kind==="other-claim"||t.kind==="ended"&&t.reason!=="undone";return l(P,{children:[l("div",{className:"syncify-setting",children:[l("span",{className:"syncify-setting-text",children:[a("span",{className:"syncify-account-email",children:n.email}),t.kind==="secured"?a("span",{className:"syncify-muted",children:a(Y,{parts:["Backup secured",t.linkedCount===1?"1 Spotify account linked":`${t.linkedCount} Spotify accounts linked`]})}):t.kind==="pending"?l("span",{className:"syncify-muted syncify-account-state",children:[a(Gr,{}),a("span",{children:ts(t)})]}):t.kind==="other-account"?a("span",{className:"syncify-muted",children:"This backup is secured by another account"}):a("span",{className:"syncify-muted",children:"Signed in"})]}),l("span",{className:"syncify-account-actions",children:[l("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-label":"Manage on the website",onClick:()=>{L()},disabled:y,children:["Manage",a(Ji,{})]}),a("button",{className:"syncify-text-button",type:"button",onClick:()=>{R()},disabled:y,children:"Sign out"})]})]}),b?l("div",{className:"syncify-setting",children:[l("span",{className:"syncify-setting-text",children:[l("span",{children:["@",b]}),a("span",{className:"syncify-muted",children:"Your handle"})]}),l("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-label":"Open your profile",onClick:()=>e.onOpenWebsite(Mt(b)),children:["Profile",a(Ji,{})]})]}):null,I?l("div",{className:"syncify-setting",children:[l("span",{className:"syncify-setting-text",children:[a("span",{children:"Secure your backup"}),a("span",{className:"syncify-muted",children:"So only you can restore it"})]}),a("button",{className:"syncify-button",type:"button",onClick:e.onSecure,disabled:y||e.securing||t.kind==="other-claim",children:e.securing?"Securing\u2026":t.kind==="ended"?"Secure again":"Secure"})]}):null,t.kind==="ended"?a("div",{className:"syncify-alert",role:"status",children:Vu[t.reason]}):null,e.secureError?a("div",{className:"syncify-alert","data-kind":"error",role:"alert",children:e.secureError}):null,me]})}return l(P,{children:[a("div",{className:"syncify-setting",children:e.locked?l("span",{className:"syncify-setting-text",children:[a("span",{children:"Sign in to restore"}),a("span",{className:"syncify-muted",children:"With the email that secured this backup"})]}):l("span",{className:"syncify-setting-text",children:[a("span",{children:"Secure your backup"}),a("span",{className:"syncify-muted",children:"So only you can restore it"})]})}),l("form",{className:"syncify-confirm",noValidate:!0,onSubmit:I=>{I.preventDefault(),!y&&(w?c.length===qt&&J():_||pe(r))},children:[w?l(P,{children:[l("p",{className:"syncify-muted",children:["Code sent to ",Gu(i.email)]}),l("div",{className:"syncify-field",children:[a("input",{className:"syncify-input syncify-code-input",type:"text",inputMode:"numeric",autoComplete:"one-time-code","aria-label":"6-digit code",placeholder:"123456",maxLength:qt,value:c,onChange:I=>u(I.currentTarget.value.replace(/\D/g,"").slice(0,qt)),autoFocus:!0}),a("button",{className:"syncify-button",type:"submit",disabled:y||c.length!==qt,children:y?"Verifying\u2026":"Verify"})]}),l("p",{className:"syncify-muted syncify-account-links",children:[a("button",{className:"syncify-text-button",type:"button",onClick:()=>{pe(i.email)},disabled:y||E>0,children:E>0?`Resend in ${is(E)}`:"Resend code"}),a("button",{className:"syncify-text-button",type:"button",onClick:()=>{H({codeSentAt:null}),u(""),h(null)},disabled:y,children:"Use another email"})]})]}):l(P,{children:[l("div",{className:"syncify-field",children:[a("input",{className:"syncify-input",type:"email",autoComplete:"email","aria-label":"Email",placeholder:"you@example.com",value:r,onChange:I=>s(I.currentTarget.value),autoFocus:!0}),a("button",{className:"syncify-button",type:"submit",disabled:y||_>0||!r.trim(),children:y?"Sending\u2026":"Send code"})]}),a("p",{className:"syncify-muted",children:_>0?`Send another code in ${is(_)}`:"We only email sign-in codes."})]}),me]})]})}var as=new WeakMap;function kn(e){let n=as.get(e);return n||(n=Z(e.marketplace_data.keys),as.set(e,n)),n}function et(e){return He(e,"item")}function He(e,n){return`${e} ${n}${e===1?"":"s"}`}function wn(e,n=new Date){let t=new Date(e);if(Number.isNaN(t.getTime()))return e;let i=t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),o=new Date(n);return o.setDate(n.getDate()-1),t.toDateString()===n.toDateString()?`today, ${i}`:t.toDateString()===o.toDateString()?`yesterday, ${i}`:`${t.toLocaleDateString(void 0,{month:"short",day:"numeric",year:t.getFullYear()===n.getFullYear()?void 0:"numeric"})}, ${i}`}function rs(e){return e.length<=1?e.join(""):`${e.slice(0,-1).join(", ")} and ${e[e.length-1]}`}function ss(e,n,t){var u,y;let i=wn(e.metadata.last_sync_datetime),o=et(kn(e).length),r=`from ${e.metadata.device_info}`,s=(y=(u=e.backup)==null?void 0:u.name)!=null?y:null,c=e.payload_hash===t;return n==="safety-copy"?{backup:e,kind:n,name:"Safety copy",meta:[s,i,o,"updated weekly"].filter(Ju),current:c,title:`the safety copy from ${i}`}:n==="unapproved"?{backup:e,kind:n,name:"Not approved",meta:[i,o,r],current:c,title:i}:{backup:e,kind:n,name:s!=null?s:i.charAt(0).toUpperCase()+i.slice(1),meta:s?[i,o,r]:[o,r],current:c,title:s!=null?s:i}}function Ju(e){return e!==null}var cs={Adds:0,Updates:1,Removes:2},Xu=["blocked","host","repo","catalog","unchecked"];function ls(e,n,t,i,o){let r=[],s=[];for(let c of e.items){let u=n.get(c.key),y=t.has(c.key),d={key:c.key,name:c.name,type:c.type,note:u?Zu(u):o&&y?"Not approved":null},g=c.change==="added"?"Adds":c.change==="removed"?"Removes":c.isNew?"Updates":null;g?r.push(k(p({},d),{change:g,optional:y,included:!y||i.has(c.key)})):s.push(d)}return r.sort((c,u)=>cs[c.change]-cs[u.change]),{changes:r,unchanged:s,manual:e.manual,warnings:Qu(r,n),count:r.filter(c=>c.included).length}}function us(e){return e===0?"Restore":e===1?"Restore 1 change":`Restore ${e} changes`}function Zu(e){switch(e.kind){case"host":return`Code from ${e.host}`;case"repo":return`Code from ${e.repo}`;case"blocked":return"Blocked by Marketplace";case"catalog":return"Not in Marketplace";case"unchecked":return"Not checked";case"custom":return"Custom"}}function Qu(e,n){var i;let t=new Map;for(let o of e){if(o.change==="Removes")continue;let r=n.get(o.key);!r||!Se(r)&&r.kind!=="unchecked"||t.set(r.kind,[...(i=t.get(r.kind))!=null?i:[],o.name])}return Xu.flatMap(o=>{let r=t.get(o);return r?[ey(o,r)]:[]})}function ey(e,n){let t=n.length===1,i=rs(n),o=t?"Restore it only if you trust it.":"Restore them only if you trust them.";switch(e){case"blocked":return`${i} ${t?"is":"are"} on Marketplace's block list. ${o}`;case"host":return`${i} ${t?"loads from a site":"load from sites"} outside GitHub. ${o}`;case"repo":return t?`${i} loads its code from a different repo than the one it names. ${o}`:`${i} load their code from different repos than the ones they name. ${o}`;case"catalog":return`${i} ${t?"isn't":"aren't"} in Marketplace's catalog. ${o}`;default:return`GitHub couldn't be reached to check ${i}. ${o}`}}function ys(e,n,t){var b;let[i,o]=m(()=>new Set),[r,s]=m(null),c=X(()=>vt(kn(e),e.spicetify_config,n,t),[e,n,t]),u=X(()=>dn(c.items),[c]);M(()=>{let x=!0;return fn(c.items,u).then(w=>{x&&s({for:e,checks:w})}),()=>{x=!1}},[e,c,u]);let y=(r==null?void 0:r.for)===e?r.checks:null,d=X(()=>new Map([...y!=null?y:[],...u]),[y,u]),g=((b=e.backup)==null?void 0:b.kind)==="quarantined",h=X(()=>new Set(c.items.filter(x=>{var w;return x.change!=="removed"&&x.isNew&&(g||Se(d.get(x.key))||((w=d.get(x.key))==null?void 0:w.kind)==="unchecked")}).map(x=>x.key)),[c,d,g]),C=X(()=>ls(c,d,h,i,g),[c,d,h,i,g]);function v(x,w){let E=new Set(i);w?E.add(x):E.delete(x),o(E)}return{preview:c,changes:C,unapproved:g,checking:y===null,skipped:[...h].filter(x=>!i.has(x)),allow:v}}var ds={extension:"extension",theme:"theme",snippet:"snippet"},ny={extension:"extension",custom_app:"app",theme:"theme"},ty={extension:"extension",custom_app:"custom app",theme:"theme"};function fs(e){let{row:n,local:t}=e,i=fe("restore-heading"),o=ys(n.backup,t.items,t.spicetifyConfig),{changes:r}=o,[s,c]=m(!1),u=!t.marketplaceAvailable;M(()=>{var d;(d=document.getElementById(i))==null||d.focus()},[i]);let y=l(P,{children:[a($,{variant:"secondary",onClick:e.onCancel,disabled:e.restoring,children:"Cancel"}),a($,{onClick:()=>e.onRestore({row:n,skipped:o.skipped,manual:o.preview.manual}),disabled:e.busy||o.checking||u,children:e.restoring?"Restoring\u2026":o.checking?"Checking\u2026":us(r.count)})]});return l(Ie,{idBase:e.idBase,id:"backups",actions:y,children:[a(Yi,{title:`Restore ${n.title}`,id:i,focusable:!0}),u?a(Q,{tone:"warning",children:"Install Spicetify Marketplace to restore a backup."}):null,o.unapproved?a(Q,{tone:"warning",children:"An install this Spotify account hasn't approved made this backup. Its items stay off unless you turn them on."}):null,l(hn,{label:"What this restore changes",children:[r.changes.map(d=>a(iy,{change:d,onInclude:g=>o.allow(d.key,g),disabled:e.busy},d.key)),r.manual.map(d=>a(Ue,{leading:a(Qn,{kind:ny[d.type]}),name:d.name,meta:a(Y,{parts:[ty[d.type],d.scheme]}),end:a("span",{className:"syncify-change-label syncify-cap",children:"Add manually"})},`${d.type}:${d.name}`)),r.unchanged.length>0?a(Ue,{name:l("span",{className:"syncify-restore-fold",children:[r.unchanged.length," more stay the same"]}),end:a($,{variant:"text","aria-expanded":s,onClick:()=>c(!s),children:s?"Hide":"Show"})}):null,s?r.unchanged.map(d=>a(oy,{item:d},d.key)):null]}),r.warnings.map(d=>a(Q,{tone:"warning",children:d},d)),e.localIsUnsaved?a(Q,{tone:"warning",children:"Your current setup isn't backed up."}):null]})}function iy(e){let{change:n}=e;return a(Ue,{leading:a(Qn,{kind:ds[n.type]}),name:n.name,meta:n.note?a(Y,{parts:[n.note]}):void 0,end:l(P,{children:[a("span",{className:"syncify-change-label syncify-cap","data-change":n.change,children:n.change}),n.optional?a(Ui,{checked:n.included,onChange:e.onInclude,label:`Restore ${n.name}`,disabled:e.disabled}):null]})})}function oy(e){return a(Ue,{leading:a(Qn,{kind:ds[e.item.type]}),name:e.item.name,meta:e.item.note?a(Y,{parts:[e.item.note]}):void 0})}function ps(e){var E,_,H,pe,J;let{remote:n,local:t}=e,i=fe("backup"),[o,r]=m(null),[s,c]=m(null),u=F(null);if(M(()=>{var R;s||!u.current||((R=document.getElementById(u.current))==null||R.focus(),u.current=null)},[s]),s&&t)return a(fs,{idBase:e.idBase,row:s,local:t,localIsUnsaved:t.installedItemCount>0&&!ay(t.hash,n),busy:e.busy,restoring:e.restoring,onCancel:()=>c(null),onRestore:R=>{var L;return e.onRestore(k(p({},R),{linkedHash:(L=o==null?void 0:o.hash)!=null?L:null}))}},s.backup.payload_hash);async function y(R){if(!R){r(null);return}r({hash:R,remote:null});try{let L=await Xe(e.config,R);r({hash:R,remote:L})}catch(L){r(null),e.onError(L)}}let d=o?o.remote:n,g=(E=t==null?void 0:t.hash)!=null?E:null,h=R=>`${i}-${R.backup.payload_hash}`,C=(R,L)=>R.map(me=>ss(me,L,g)),v=C((_=d==null?void 0:d.backups)!=null?_:[],"backup"),b=C(d!=null&&d.safetyCopy?[d.safetyCopy]:[],"safety-copy"),x=o?[]:C((H=n==null?void 0:n.unapproved)!=null?H:[],"unapproved");function w(R){return a(Ue,{id:h(R),name:R.name,nameMark:R.kind==="safety-copy"?a(Ki,{className:"syncify-safety-mark"}):R.kind==="unapproved"?a(Ne,{tone:"warning"}):void 0,meta:a(Y,{parts:R.meta}),end:R.current?a("span",{className:"syncify-row-status syncify-cap",children:"Current"}):void 0,onOpen:R.current?void 0:()=>{u.current=h(R),c(R)},openLabel:`Preview restore of ${R.title}`,disabled:e.busy},`${R.kind}-${R.backup.payload_hash}-${R.backup.metadata.last_sync_datetime}`)}return l(Ie,{idBase:e.idBase,id:"backups",children:[e.notices,t&&!t.marketplaceAvailable?a(Q,{tone:"warning",children:"Install Spicetify Marketplace to restore a backup."}):null,!e.lockedBy&&e.otherAccounts.length>0?a(qi,{label:"Show backups from",children:a(ji,{label:"Show backups from",trigger:{value:(J=(pe=e.otherAccounts.find(R=>R.hash===(o==null?void 0:o.hash)))==null?void 0:pe.label)!=null?J:"This Spotify account"},items:[{hash:null,label:"This Spotify account"},...e.otherAccounts].map(R=>{var L;return{label:R.label,checked:((L=o==null?void 0:o.hash)!=null?L:null)===R.hash,onSelect:()=>{y(R.hash)}}}),disabled:e.busy})}):null,e.lockedBy?a("p",{className:"syncify-tab-text",children:e.lockedBy==="not_owner"?"Sign in with the account that secured them":"Sign in to see and restore your backups"}):!n&&e.failed?null:!n||o&&!o.remote?l(hn,{label:"Loading backups",children:[a(Wt,{}),a(Wt,{})]}):v.length+b.length+x.length===0?o?a("p",{className:"syncify-tab-text",children:"No backups yet."}):null:l(hn,{label:"Backups",children:[v.map(w),b.length>0?a(Ft,{}):null,b.map(w),x.length>0?a(Ft,{}):null,x.map(w)]})]})}function ay(e,n){return n?[...n.backups,...n.safetyCopy?[n.safetyCopy]:[]].some(t=>t.payload_hash===e):!1}var ry=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function ms(e){let{config:n}=e,t=e.busy,i=e.unsupported,[o,r]=m(!1),[s,c]=m(null),[u]=m(()=>ur()),y=F(null);M(()=>{if(!o)return;let b=x=>{var E;if(!((E=y.current)!=null&&E.isConnected)){r(!1),c(null);return}x.preventDefault(),x.stopImmediatePropagation();let w=rr(x);if(w.kind!=="ignore"){if(w.kind==="cancel"){r(!1),c(null);return}if(w.kind==="error"){c(w.message);return}if(sr(w.shortcut)){c(`${Bt(w.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}r(!1),h(w.shortcut)}};return window.addEventListener("keydown",b,!0),()=>window.removeEventListener("keydown",b,!0)},[o,n]);function d(b){dr(b),e.onConfigChange(b)}function g(b){d(k(p({},n),{autoBackupEnabled:b}))}function h(b){d(k(p({},n),{shortcut:b})),Ei(b),c(null)}function C(b){d(k(p({},n),{entryPoint:b})),Ot(b)}function v(){c(null),r(!0)}return a(Ie,{idBase:e.idBase,id:"settings",children:l("div",{className:"syncify-panel",ref:y,children:[l("label",{className:"syncify-setting",children:[l("span",{className:"syncify-setting-text",children:[a("span",{children:"Back up automatically"}),a("span",{className:"syncify-muted",children:"When Spotify starts and something has changed"})]}),a("input",{className:"syncify-switch",type:"checkbox",role:"switch",checked:n.autoBackupEnabled&&!i,onChange:b=>g(b.currentTarget.checked),disabled:t||i})]}),l("label",{className:"syncify-setting",children:[l("span",{className:"syncify-setting-text",children:[a("span",{children:"Open Syncify from"}),u?n.entryPoint==="menu"&&!n.shortcut?a("span",{className:"syncify-muted",children:"Keep a shortcut in case a Spotify update breaks the menu"}):null:a("span",{className:"syncify-muted",children:"The profile menu isn't available in this Spicetify version"})]}),l("span",{className:"syncify-select-field",children:[a("select",{className:"syncify-select",value:u?n.entryPoint:"topbar",onChange:b=>C(b.currentTarget.value),disabled:!u,children:ry.map(b=>a("option",{value:b.value,children:b.label},b.value))}),a(bn,{})]})]}),l("div",{className:"syncify-setting",children:[l("span",{className:"syncify-setting-text",children:[a("span",{children:"Keyboard shortcut"}),o&&!s?a("span",{className:"syncify-muted",children:"Press a key combination, or Esc to cancel"}):null]}),l("span",{className:"syncify-shortcut",children:[n.shortcut&&!o?a("button",{className:"syncify-text-button",type:"button",onClick:()=>h(null),children:"Turn off"}):null,!n.shortcut&&!o?a("button",{className:"syncify-text-button",type:"button",onClick:()=>h(mn),children:"Use default"}):null,a("button",{className:"syncify-key",type:"button","data-recording":o?"true":"false",onClick:()=>o?r(!1):v(),title:"Click to change",children:o?"Press keys\u2026":n.shortcut?Bt(n.shortcut):"Off"})]})]}),s?a("div",{className:"syncify-alert",role:"alert",children:s}):null]})})}async function Gt(e){var n;try{return await navigator.clipboard.writeText(e),!0}catch(t){let i=(n=Spicetify.Platform)==null?void 0:n.ClipboardAPI;return i!=null&&i.copy?(await i.copy(e),!0):!1}}var gs={added:{mark:"+",label:"Added"},removed:{mark:"\u2212",label:"Removed"},unchanged:{mark:"=",label:"Unchanged"}},Zi=[["extension","Extensions"],["theme","Themes"],["snippet","Snippets"]],sy={extension:"extension",custom_app:"custom app",theme:"theme"};function hs(e){let{items:n,counts:t,manual:i,theme:o}=e.preview,r=[...e.off].filter(s=>!e.allowed.has(s)).length;return l(P,{children:[l("div",{className:"syncify-chips","aria-label":"What changes on this device",children:[t.added?l("span",{className:"syncify-chip","data-change":"added",children:["+",t.added," added"]}):null,t.removed?l("span",{className:"syncify-chip","data-change":"removed",children:["\u2212",t.removed," removed"]}):null,t.unchanged?l("span",{className:"syncify-chip",children:[t.unchanged," unchanged"]}):null,i.length?l("span",{className:"syncify-chip",children:[i.length," to add manually"]}):null,o&&(!e.off.has(o.key)||e.allowed.has(o.key))?l("span",{className:"syncify-chip",children:["Switches your theme to ",o.name]}):null,r?l("span",{className:"syncify-chip","data-change":"off",children:[r," off"]}):null]}),n.length||i.length?l("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":e.expanded,"aria-controls":"syncify-restore-changes",onClick:e.onToggle,children:[e.expanded?"Hide changes":"Show changes",a(bn,{})]}):null,e.expanded?l("div",{className:"syncify-changes",id:"syncify-restore-changes",children:[Zi.map(([s,c])=>{let u=n.filter(y=>y.type===s);return u.length===0?null:l("section",{"aria-label":c,children:[a("h5",{className:"syncify-change-group",children:c}),a("ul",{className:"syncify-change-list",children:u.map(y=>{var d,g;return l("li",{className:"syncify-change",children:[a("span",{className:"syncify-mark","data-change":y.change,role:"img","aria-label":gs[y.change].label,children:gs[y.change].mark}),l("span",{className:"syncify-change-name",children:[y.name,y.repo?l("span",{className:"syncify-change-detail",children:[a(en,{}),y.repo]}):null]}),e.checks.has(y.key)?a(Qi,{check:e.checks.get(y.key)}):e.unapproved&&e.off.has(y.key)?l("span",{className:"syncify-source","data-warning":"true",children:[a(Vi,{}),"Not approved"]}):null,e.off.has(y.key)&&!((d=e.fixed)!=null&&d.has(y.key))?l("label",{className:"syncify-item-switch",children:[a("input",{type:"checkbox",checked:e.allowed.has(y.key),onChange:h=>e.onAllow(y.key,h.currentTarget.checked)}),(g=e.switchLabel)!=null?g:"Restore"]}):null]},y.key)})})]},s)}),i.length?l("section",{"aria-label":"Add manually",children:[a("h5",{className:"syncify-change-group",children:"Add manually"}),a("ul",{className:"syncify-change-list",children:i.map(s=>l("li",{className:"syncify-change",children:[a("span",{className:"syncify-mark","aria-hidden":"true"}),l("span",{className:"syncify-change-name",children:[s.name,l("span",{className:"syncify-change-detail",children:[a(en,{}),sy[s.type],s.scheme?`, ${s.scheme}`:""]})]})]},`${s.type}:${s.name}`))})]}):null]}):null]})}var cy={host:"Loads from outside GitHub",repo:"Its code is in a different repo than the one it names",blocked:"On Marketplace's block list",catalog:"Not in Marketplace's catalog",unchecked:"GitHub couldn't be reached to check it",custom:"A snippet made in Marketplace, not from its list"};function Qi(e){let{check:n}=e,t=Se(n),i=n.kind==="host"?`Code from ${n.host}`:n.kind==="repo"?`Code from ${n.repo}`:n.kind==="blocked"?"Blocked by Marketplace":n.kind==="catalog"?"Not in Marketplace":n.kind==="unchecked"?"Not checked":"Custom";return l("span",{className:"syncify-source","data-warning":t?"true":"false",title:cy[n.kind],children:[t?a(Vi,{}):null,i]})}var ly=600,uy=[["add","Add to my setup"],["replace","Replace my setup"]];function ks(e){var co;let{session:n}=e,[t,i]=m(""),[o,r]=m(!1),[s,c]=m(null),[u,y]=m(null),[d,g]=m(null),[h,C]=m(null),[v,b]=m("add"),[x,w]=m(!1),[E,_]=m(()=>new Set),[H,pe]=m(null),[J,R]=m(void 0),[L,me]=m(!1),[I,A]=m(null),[ge,ie]=m(0),q=F(!1),[se,Ee]=m(null),[K,ee]=m(null),[ce,oe]=m(null),[he,on]=m(""),[tt,le]=m(null),[G,be]=m(null),[vn,it]=m(""),[V,W]=m(null),[ke,xn]=m(!1),[$e,ot]=m(!1),[at,Re]=m(null),[j,Me]=m(null),[Cn,an]=m(null),[Le,Nn]=m(!1),[Ke,In]=m(null),ze=F(0),z=X(()=>u?Wa(u.file,u.items,e.localItems,e.localConfig,e.localTheme,v):null,[u,e.localItems,e.localConfig,e.localTheme,v]),Pe=X(()=>{if(!z||!u)return null;let f=new Set(u.items.map(N=>N.key));return z.items.filter(N=>N.change!=="removed"&&f.has(N.key)&&(v==="replace"||N.isNew))},[z,u,v]),ue=X(()=>Pe?dn(Pe):null,[Pe]),Fe=X(()=>new Map([...H!=null?H:[],...ue!=null?ue:[]]),[H,ue]),We=X(()=>z&&J!==void 0?ja(z,J):new Set,[z,J]),En=X(()=>{var f;return new Set([...((f=z==null?void 0:z.items)!=null?f:[]).filter(N=>{var B;return N.change!=="removed"&&N.isNew&&(Se(Fe.get(N.key))||((B=Fe.get(N.key))==null?void 0:B.kind)==="unchecked")}).map(N=>N.key),...We])},[z,Fe,We]),rt=[...En].filter(f=>We.has(f)||!E.has(f)),Rn=z!==null&&(H===null||J===void 0),rn=V?V.items.filter(f=>!V.leftOut.has(f.key)):[],Pn=!!(I&&se!==null&&I.length>=se),S=G!==null&&G.code===null&&!K,O=S?Ha(he):null,[Te,st]=m(null);M(()=>{if(!O){st(null);return}let f=window.setTimeout(()=>st(O),ly);return()=>window.clearTimeout(f)},[O]),M(()=>{if(pe(null),!Pe||!ue)return;[...ue.values()].some(Se)&&w(!0);let f=!0;return fn(Pe,ue).then(N=>{f&&(pe(N),[...N.values()].some(Se)&&w(!0))}),()=>{f=!1}},[Pe,ue]),M(()=>{Xa().then(g)},[]),M(()=>{A(null),be(null),Me(null),q.current=!1,n&&Tn()},[n==null?void 0:n.token]);async function ro(f){let N=f!=null?f:$a(t);if(c(null),y(null),!N){c(_t(new T("no_code")));return}r(!0),C(f!=null?f:null);try{let B=await Ja(N);b("add"),_(new Set),w(!1),y({file:B,items:Z(B.keys),pick:f!==void 0}),wi().then(R)}catch(B){c(_t(B))}finally{r(!1),C(null)}}async function Hs(){if(!(!u||!z)){me(!0),c(null);try{await mr(e.config,u.file,v,rt,J!=null?J:null,u.pick),Spicetify.showNotification("Syncify: setup loaded. Reloading\u2026"),Zn(z.manual,"share"),setTimeout(()=>window.location.reload(),1e3)}catch(f){me(!1),c(f instanceof Gn?`${f.message} ${dy(f.reason)}`:f instanceof Error?f.message:String(f))}}}async function Tn(){var f,N;le(null);try{let B=await At();A(B.codes),q.current||(q.current=!0,ie(B.newHearts)),e.onCodeCount(B.codes.length),Ee(B.max),ee(B.profile),e.onHandle((N=(f=B.profile)==null?void 0:f.handle)!=null?N:null),oe(B.suggestedHandle)}catch(B){Qt(B,le)}}function Qt(f,N){N(_t(f,se)),f instanceof T&&f.code==="signed_out"&&e.onSignedOut()}async function so(f){var B;let N=++ze.current;be({code:f}),it((B=f==null?void 0:f.name)!=null?B:""),on(ce!=null?ce:""),W(null),xn(!1),Re(null),Me(null),an(null);try{let je=await ye(),lo=await za(Z(je),je);if(N!==ze.current)return;W(p({keys:je},lo)),lo.leftOut.size>0&&xn(!0)}catch(je){if(N!==ze.current)return;be(null),Re(je instanceof Error?je.message:String(je))}}function $s(){ze.current+=1,be(null),W(null)}async function Ks(){if(!G||!V)return;ot(!0),Re(null);let f=Fa(V.keys,rn);try{let N=G.code?await Ga(G.code.code,vn.trim(),f):await qa(vn.trim(),f,S?he.trim():void 0);Me(k(p({},N),{outcome:G.code?"updated":"created"})),be(null),W(null),await Tn()}catch(N){if(N instanceof T&&N.code==="same_setup"&&N.share){Me(k(p({},N.share),{leftOut:0,outcome:"existing"})),be(null),W(null);return}Qt(N,Re),N instanceof T&&N.code==="publish_failed"&&(be(null),Tn())}finally{ot(!1)}}async function zs(f){Nn(!0),le(null);try{await Va(f),an(null),(j==null?void 0:j.code)===f&&Me(null),await Tn()}catch(N){Qt(N,le)}finally{Nn(!1)}}async function ct(f,N){await Gt(f)&&(In(N),setTimeout(()=>In(B=>B===N?null:B),2e3))}return l(P,{children:[l("form",{className:"syncify-field syncify-share-load",noValidate:!0,onSubmit:f=>{f.preventDefault(),!o&&!L&&t.trim()&&ro()},children:[a("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-input",children:"Load a setup"}),a("input",{className:"syncify-input syncify-share-input",id:"syncify-share-input",type:"text",placeholder:"Paste a code or a link",autoComplete:"off",spellCheck:!1,value:t,onChange:f=>i(f.currentTarget.value),disabled:L}),a("button",{className:"syncify-button secondary",type:"submit",disabled:o||L||!t.trim(),children:o?"Loading\u2026":"Preview"})]}),s?a("div",{className:"syncify-alert","data-kind":"error",role:"alert",children:s}):null,u&&z?l("div",{className:"syncify-confirm",children:[l("span",{className:"syncify-share-title",children:[l("p",{className:"syncify-confirm-title",children:["Load ",(co=u.file.name)!=null?co:ve(u.file.code),"?"]}),u.file.creator?l("button",{className:"syncify-text-button",type:"button",title:"Open their profile",onClick:()=>window.open(Mt(u.file.creator),"_blank","noopener,noreferrer"),children:["by @",u.file.creator]}):null]}),a("div",{className:"syncify-share-modes",role:"radiogroup","aria-label":"How to load it",children:uy.map(([f,N])=>l("button",{className:"syncify-backup",role:"radio","aria-checked":v===f,"data-selected":v===f?"true":"false",type:"button",onClick:()=>b(f),disabled:L,children:[a("span",{className:"syncify-radio","aria-hidden":"true"}),a("span",{className:"syncify-backup-text",children:a("span",{children:N})})]},f))}),a(hs,{preview:z,checks:Fe,off:En,fixed:We,switchLabel:"Load",allowed:E,unapproved:!1,onAllow:(f,N)=>{let B=new Set(E);N?B.add(f):B.delete(f),_(B)},expanded:x,onToggle:()=>w(!x)}),e.marketplaceAvailable===!1?a("p",{className:"syncify-muted",children:"Install Spicetify Marketplace to load a setup."}):l("div",{className:"syncify-actions",children:[a("button",{className:"syncify-button secondary",type:"button",onClick:()=>y(null),disabled:L,children:"Cancel"}),a("button",{className:"syncify-button",type:"button",onClick:()=>{Hs()},disabled:L||Rn||e.busy,children:L?"Applying\u2026":Rn?"Checking\u2026":"Apply"})]})]}):null,d?l("section",{className:"syncify-share-part","aria-label":d.length>0?"Syncify picks":"Discover",children:[d.length>0?a("h5",{className:"syncify-change-group",children:"Syncify picks"}):null,l("ul",{className:"syncify-change-list syncify-share-codes",children:[d.map(f=>l("li",{className:"syncify-setting",children:[l("span",{className:"syncify-setting-text",children:[a("span",{className:"syncify-account-email",children:f.name}),l("span",{className:"syncify-muted syncify-pick-detail",children:[a(py,{pick:f}),He(f.extensions+f.themes+f.snippets,"item")]})]}),a("button",{className:"syncify-text-button",type:"button",disabled:o||L,onClick:()=>{ro(f.code)},children:h===f.code?"Loading\u2026":"Preview"})]},f.code)),l("li",{className:"syncify-setting",children:[l("span",{className:"syncify-setting-text",children:[a("span",{children:"Find more setups"}),a("span",{className:"syncify-muted",children:"People's setups on Discover"})]}),a("button",{className:"syncify-button secondary",type:"button",onClick:()=>window.open(`${D().webUrl.replace(/\/+$/,"")}/discover`,"_blank","noopener,noreferrer"),children:"Open Discover"})]})]})]}):null,n===void 0?null:n?l(P,{children:[l("div",{className:"syncify-setting syncify-share-part",children:[l("span",{className:"syncify-setting-text",children:[a("span",{children:"Share this setup"}),a("span",{className:"syncify-muted",children:I&&I.length>0&&se!==null?fy(se-I.length):"Get a code anyone can load"})]}),a("button",{className:"syncify-button secondary",type:"button",onClick:()=>{so(null)},disabled:G!==null||I===null||Pn||e.marketplaceAvailable===!1,title:Pn?"Delete a code to make another":void 0,children:"Share"})]}),G?l("div",{className:"syncify-confirm",children:[a("p",{className:"syncify-confirm-title",children:G.code?`Update ${ve(G.code.code)} with this setup?`:"Share this setup?"}),V?l(P,{children:[l("div",{className:"syncify-chips","aria-label":"What goes in",children:[l("span",{className:"syncify-chip",children:[rn.length," going in"]}),V.leftOut.size?l("span",{className:"syncify-chip","data-change":"off",children:[V.leftOut.size," left out"]}):null]}),V.items.length?l("button",{className:"syncify-text-button syncify-disclosure",type:"button","aria-expanded":ke,"aria-controls":"syncify-share-items",onClick:()=>xn(!ke),children:[ke?"Hide items":"Show items",a(bn,{})]}):null,ke?a(yy,{items:V.items,leftOut:V.leftOut}):null,l("div",{className:"syncify-share-fields",children:[a("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-name",children:"Setup name"}),a("input",{id:"syncify-share-name",className:"syncify-input",type:"text",placeholder:"Optional",maxLength:Oa,value:vn,onChange:f=>it(f.currentTarget.value),disabled:$e}),S?l(P,{children:[a("p",{className:"syncify-muted syncify-share-handle-note",children:"It's your first time creating a share code. Pick a handle for your profile:"}),a("label",{className:"syncify-share-load-label",htmlFor:"syncify-share-handle",children:"Your handle"}),l("span",{className:"syncify-input syncify-handle-input",children:[a("span",{"aria-hidden":"true",children:"@"}),a("input",{id:"syncify-share-handle",type:"text",placeholder:"handle",autoComplete:"off",spellCheck:!1,maxLength:Si,value:he,onChange:f=>on(f.currentTarget.value.replace(/^@/,"")),disabled:$e})]}),he&&Te?a("span",{className:"syncify-share-handle-problem",role:"alert",children:Te}):null]}):null]})]}):a("p",{className:"syncify-muted",children:"Checking your items\u2026"}),l("div",{className:"syncify-actions",children:[a("button",{className:"syncify-button secondary",type:"button",onClick:$s,disabled:$e,children:"Cancel"}),a("button",{className:"syncify-button",type:"button",onClick:()=>{Ks()},disabled:!V||rn.length===0||$e||S&&O!==null,children:V?$e?G.code?"Updating\u2026":"Creating\u2026":G.code?"Update":"Create code":"Checking\u2026"})]})]}):null,at?a("div",{className:"syncify-alert","data-kind":"error",role:"alert",children:at}):null,j?l("div",{className:"syncify-confirm",children:[l("span",{className:"syncify-manual-header",children:[a("span",{className:"syncify-confirm-title",children:j.outcome==="existing"?"You already shared this setup":j.outcome==="updated"?"Code updated":"Your code is ready"}),a("button",{className:"syncify-icon-button",type:"button","aria-label":"Dismiss",title:"Dismiss",onClick:()=>Me(null),children:a(Vr,{})})]}),l("span",{className:"syncify-code syncify-share-code",children:[a("code",{children:ve(j.code)}),a("button",{className:"syncify-text-button",type:"button",onClick:()=>{ct(ve(j.code),"saved-code")},children:Ke==="saved-code"?"Copied":"Copy"}),j.link?a("button",{className:"syncify-text-button",type:"button",onClick:()=>{ct(j.link,"saved-link")},children:Ke==="saved-link"?"Copied":"Get link"}):null]}),j.leftOut?a("p",{className:"syncify-muted",children:j.leftOut===1?"1 snippet isn't in Marketplace's list anymore, so it was left out.":`${j.leftOut} snippets aren't in Marketplace's list anymore, so they were left out.`}):null,j.outcome==="created"&&d?l("div",{className:"syncify-setting",children:[l("span",{className:"syncify-setting-text",children:[a("span",{children:"Post it on Discover"}),a("span",{className:"syncify-muted",children:"Let people find it and try it"})]}),a("button",{className:"syncify-button secondary",type:"button",onClick:()=>window.open(`${D().webUrl.replace(/\/+$/,"")}/discover?post=${encodeURIComponent(j.code)}`,"_blank","noopener,noreferrer"),children:"Post"})]}):null]}):null,tt?l("div",{className:"syncify-alert","data-kind":"error",role:"alert",children:[a("span",{children:tt}),a("span",{className:"syncify-alert-actions",children:a("button",{className:"syncify-text-button",type:"button",onClick:()=>{Tn()},children:"Try again"})})]}):null,I&&I.length>0?l("section",{"aria-label":"Your codes",children:[l("h5",{className:"syncify-change-group syncify-codes-heading",children:["Your codes",ge>0?a("span",{className:"syncify-tag","data-tone":"new",children:He(ge,"new heart")}):null]}),a("ul",{className:"syncify-change-list syncify-share-codes",children:I.map(f=>{var N;return l("li",{className:"syncify-setting",children:[l("span",{className:"syncify-setting-text",children:[a("span",{className:"syncify-account-email",children:(N=f.name)!=null?N:ve(f.code)}),a("span",{className:"syncify-muted",children:Cn===f.code?f.posted?"Delete it? Its link stops working and its post comes off Discover.":"Delete it? Its link stops working.":a(Y,{parts:[f.name?ve(f.code):null,He(f.item_count,"item"),`Used by ${f.imports}`,f.hearts===null?null:He(f.hearts,"heart")]})})]}),a("span",{className:"syncify-account-actions",children:Cn===f.code?l(P,{children:[a("button",{className:"syncify-text-button",type:"button",onClick:()=>an(null),disabled:Le,children:"Cancel"}),a("button",{className:"syncify-text-button","data-danger":"true",type:"button",onClick:()=>{zs(f.code)},disabled:Le,children:Le?"Deleting\u2026":"Delete"})]}):l(P,{children:[a("button",{className:"syncify-text-button",type:"button",onClick:()=>{so(f)},disabled:G!==null||Le,children:"Update"}),a("button",{className:"syncify-text-button",type:"button",onClick:()=>{ct(ve(f.code),`code:${f.code}`)},children:Ke===`code:${f.code}`?"Copied":"Copy"}),f.link?a("button",{className:"syncify-text-button",type:"button",onClick:()=>{ct(f.link,`link:${f.code}`)},children:Ke===`link:${f.code}`?"Copied":"Get link"}):null,a("button",{className:"syncify-text-button",type:"button",onClick:()=>an(f.code),disabled:Le,children:"Delete"})]})})]},f.code)})})]}):null]}):l("div",{className:"syncify-setting syncify-share-part",children:[l("span",{className:"syncify-setting-text",children:[a("span",{children:"Share this setup"}),a("span",{className:"syncify-muted",children:"Get a code anyone can load"})]}),a("button",{className:"syncify-button secondary",type:"button",onClick:e.onSignIn,children:"Sign in to share"})]})]})}var bs={in:{mark:"+",label:"Goes in"},out:{mark:"\u2212",label:"Left out"}};function yy(e){return a("div",{className:"syncify-changes",id:"syncify-share-items",children:Zi.map(([n,t])=>{let i=e.items.filter(o=>o.type===n).sort((o,r)=>o.name.localeCompare(r.name));return i.length===0?null:l("section",{"aria-label":t,children:[a("h5",{className:"syncify-change-group",children:t}),a("ul",{className:"syncify-change-list",children:i.map(o=>{let r=e.leftOut.get(o.key),s=r?bs.out:bs.in;return l("li",{className:"syncify-change",children:[a("span",{className:"syncify-mark","data-change":r?"removed":"added",role:"img","aria-label":s.label,children:s.mark}),l("span",{className:"syncify-change-name",children:[o.name,o.repo?l("span",{className:"syncify-change-detail",children:[a(en,{}),o.repo]}):null]}),r?a(Qi,{check:r}):null]},o.key)})})]},n)})})}function dy(e){return e instanceof re?"Sign in to back up.":e instanceof Error?e.message:String(e)}function fy(e){return e<=0?"No codes left, delete one to make another":`${e} ${e===1?"code":"codes"} left`}var Vt=12;function py(e){let{extensions:n,themes:t,snippets:i}=e.pick,o=[...Array(Math.min(n,Vt)).fill("extension"),...Array(Math.min(t,Vt)).fill("theme"),...Array(Math.min(i,Vt)).fill("snippet")].slice(0,Vt);return a("span",{className:"syncify-pips","aria-hidden":"true",children:o.map((r,s)=>a("span",{className:"syncify-pip","data-kind":r},s))})}var eo="syncify:share-code-count",no="syncify:handle";function my(){var n,t;let e=Number((t=(n=Spicetify.LocalStorage)==null?void 0:n.get(eo))!=null?t:NaN);return Number.isInteger(e)&&e>=0?e:null}function gy(){var n;let e=(n=Spicetify.LocalStorage)==null?void 0:n.get(no);return e==null?void 0:e||null}function ws(){let[e,n]=m(()=>my()),[t,i]=m(()=>gy()),o=ne(c=>{var u,y;c===null?(u=Spicetify.LocalStorage)==null||u.remove(eo):(y=Spicetify.LocalStorage)==null||y.set(eo,String(c)),n(c)},[]),r=ne(c=>{var u,y;c===void 0?(u=Spicetify.LocalStorage)==null||u.remove(no):(y=Spicetify.LocalStorage)==null||y.set(no,c!=null?c:""),i(c)},[]),s=ne(()=>{o(null),r(void 0)},[o,r]);return{codeCount:e,handle:t,saveCodeCount:o,saveHandle:r,forget:s}}function to(e){let n=F(e);return ut(()=>{n.current=e}),n}var hy=2e3;function Ss(e){let{install:n}=e,t=!n||n.trusted?null:n.refused?"This Spotify account refused backups from this install. Sign in to back up from it.":"This install isn't approved yet. Its backups are kept apart until you approve it from another install or sign in.";return l(P,{children:[e.nudge?a(Q,{tone:"warning",actions:l(P,{children:[a($,{variant:"subtle",onClick:e.onHideNudge,disabled:e.securing,children:"Not now"}),a($,{size:"small",onClick:e.onSecure,disabled:e.securing,children:e.securing?"Securing\u2026":"Secure"})]}),children:"Your backup isn't secured. Anyone who knows your Spotify username can restore it."}):null,t?a(Q,{tone:"info",children:t}):null,e.restoreResult?a(by,{manual:e.restoreResult.manual}):null]})}function by(e){let[n,t]=m(!1),i=Hr(e.manual).join(`
`);if(M(()=>{if(!n)return;let r=setTimeout(()=>t(!1),hy);return()=>clearTimeout(r)},[n]),!i)return null;let o=e.manual.length;return l(Q,{tone:"info",actions:l(P,{children:[a($,{variant:"text",onClick:()=>{Gt(i).then(t)},children:n?"Copied":"Copy"}),a($,{variant:"subtle",onClick:Br,children:"Dismiss"})]}),children:[o===1?"1 isn't from Marketplace. Add it in a terminal:":`${o} aren't from Marketplace. Add them in a terminal:`,a("pre",{className:"syncify-commands",children:a("code",{children:i})})]})}function vs(e){let{message:n}=e;return a(Q,{tone:n.kind,actions:l(P,{children:[n.kind==="error"?a($,{variant:"text",onClick:e.onTryAgain,disabled:e.busy,children:"Try again"}):null,a($,{variant:"subtle",onClick:e.onDismiss,children:"Dismiss"})]}),children:n.text})}function nn(e){if(e.startsWith("mailto:")){window.location.href=e;return}window.open(e,"_blank","noopener,noreferrer")}function xs(e){let n=ky(e);return n.backedUp&&e.latest?k(p({},n),{line:[`Backed up ${wn(e.latest.metadata.last_sync_datetime)}`,`${et(e.localItemCount)} on this device`]}):k(p({},n),{line:[n.title,...n.detail]})}function ky(e){let n={backedUp:!1,supportAsk:null},t=`${et(e.localItemCount)} on this device`;return e.restoreResult&&!e.unsupported?wy(e.restoreResult):e.unsupported?k(p({},n),{title:"Update Syncify to keep backing up",detail:["Your backups are safe"],action:"how-to-update"}):e.locked?k(p({},n),{title:"Sign in to restore",detail:[e.locked==="not_owner"?"Secured by another account":"This backup is secured"],action:"sign-in"}):e.activity==="backing-up"?k(p({},n),{title:"Backing up\u2026",detail:[],action:"back-up"}):e.checked?e.latest?e.localHash&&!e.backedUp?k(p({},n),{title:"Changes since your last backup",detail:Sy(e.latest,e.latestItems,e.localItems,e.localConfig),action:"back-up"}):k(p({},n),{title:"Everything is backed up",detail:[`Last backup ${wn(e.latest.metadata.last_sync_datetime)}`,t],action:null,backedUp:!0}):k(p({},n),{title:"No backup yet",detail:["Save your extensions and themes to restore them after a reinstall or on another computer."],action:"back-up"}):e.checkError?k(p({},n),{title:"Couldn't check your backup",detail:[e.checkError],action:"try-again"}):k(p({},n),{title:"Checking your backup\u2026",detail:[],action:null})}function wy(e){let n=e.loaded===e.total,t=e.kind==="share";return{title:n?t?"Setup loaded":"Backup restored":`${t?"Loaded":"Restored"} ${e.loaded} of ${e.total}`,detail:[n?e.total===0?"Nothing from Marketplace to load":`${e.loaded} of ${e.total} loaded`:"Missing something? Reload Spotify once more."],action:n?null:"reload",backedUp:!1,supportAsk:n?t?"Syncify set it up for you?":"Syncify saved your setup?":null}}function Sy(e,n,t,i){var g;let o=new Set(n),r=new Set(t),s=t.filter(h=>!o.has(h)).length,c=n.filter(h=>!r.has(h)).length,u=(g=e.spicetify_config)!=null?g:null,y=!!(i&&!u),d=!y&&(i&&u?!ga(i,u):i!==u);return[s?`${s} added`:null,c?`${c} removed`:null,d?"Spicetify config changed":null,y?"Spicetify config not saved yet":null,`Last backup ${wn(e.metadata.last_sync_datetime)}`].filter(h=>h!==null)}function Cs(e,n){return(e==null?void 0:e.status)==="pending"&&!e.mine?k(p({kind:"claim"},Xi(e)),{canAnswer:!e.not_me}):n?{kind:"install",title:Yt(n),install:n}:null}var vy=3,io={exists:!1,payload:null,backups:[],safetyCopy:null,claim:null,unapproved:[],install:null,nudge:!1},tn=null;function Ns(e){var d,g,h;let[n,t]=m(()=>tn),[i,o]=m(void 0),r=ne(C=>{tn=C,t(C)},[]),s=ne(async()=>{let C,v=null;try{C=await Xe(e)}catch(E){if(!(E instanceof re))throw E;C=io,v=E.code}let b=await ae().catch(()=>null),x=b?await gr(e).catch(()=>null):null,w=b?await ae().catch(()=>null):null;return r({remote:C,lockedBy:v,claims:w?x:null}),o(w),v},[e,r]),c=ne(()=>{ae().catch(()=>null).then(C=>o(v=>v!=null?v:C))},[]),u=ne(C=>{var x;let v=tn!=null?tn:{remote:io,lockedBy:null,claims:null},{remote:b}=v;r(k(p({},v),{remote:k(p({},b),{exists:!0,payload:C,backups:[C,...b.backups.filter(w=>w.payload_hash!==C.payload_hash)].slice(0,vy),safetyCopy:((x=b.safetyCopy)==null?void 0:x.payload_hash)===C.payload_hash?null:b.safetyCopy})}))},[r]),y=ne(()=>{o(null),tn&&r(k(p({},tn),{claims:null}))},[r]);return{check:n,remote:(d=n==null?void 0:n.remote)!=null?d:io,lockedBy:(g=n==null?void 0:n.lockedBy)!=null?g:null,claims:(h=n==null?void 0:n.claims)!=null?h:null,session:i,setSession:o,refresh:s,readSession:c,addBackup:u,forgetClaims:y}}function Is(){let[e,n]=m(null),t=ne(async()=>{let i=await Et();return n(i),i},[]);return{local:e,refreshLocal:t}}var xy=600*1e3;function Es(){let[e,n]=m(null);return M(()=>{let t=D();if(!Bi(t.version))return;let i=!0;return Wr(t.releasesUrl).then(o=>{i&&o&&Di(o,t.version)>0&&n(o)}),()=>{i=!1}},[]),e}function Rs(){let[e,n]=m(()=>Mr()),[t]=m(()=>Date.now());return M(()=>Lr(n),[]),{result:e,recent:!!(e&&t-e.at<xy)}}function Ps(e){let n=D(),t=[["Report an issue",n.issueUrl],["GitHub",n.githubUrl],["Discord",n.discordUrl],["Support on Ko-fi",n.kofiUrl]];return l("footer",{className:"syncify-window-footer",children:[l("span",{className:"syncify-window-footer-version",children:[l("span",{children:["Syncify ",n.version]}),e.newerVersion?a($,{variant:"text",size:"tiny",className:"syncify-window-update",onClick:()=>e.loadedByLoader?window.location.reload():nn(`${n.githubUrl}#updating`),children:a(Y,{parts:[`${e.newerVersion} is out`,e.loadedByLoader?"Reload":"How to update"]})}):null]}),a("span",{className:"syncify-window-footer-links",children:t.map(([i,o])=>a($,{variant:"subtle",size:"tiny",onClick:()=>nn(o),children:i},i))})]})}var Cy={"back-up":"Back up now","try-again":"Try again","sign-in":"Sign in","how-to-update":"How to update",reload:"Reload"};function Ts(e){let{status:n,alert:t}=e,i=n.action,o=i?a($,{variant:i==="back-up"||i==="sign-in"?"primary":"secondary",size:t?"small":"regular",onClick:()=>e.onAction(i),disabled:e.busy,children:i==="back-up"&&e.backingUp?"Backing up\u2026":Cy[i]}):null;return t?l("section",{className:"syncify-status","aria-label":"Status",children:[l("div",{className:"syncify-status-alert",role:"alert",children:[a("span",{className:"syncify-status-alert-mark",children:a(Ne,{tone:"warning",icon:a(Fi,{})})}),l("div",{className:"syncify-status-text",children:[a("h2",{className:"syncify-status-title",children:t.title}),t.kind==="claim"&&t.text?a("p",{className:"syncify-status-sentence",children:t.text}):null]}),t.kind==="claim"?t.canAnswer?a($,{variant:"secondary",onClick:e.onNotMe,disabled:e.answering,children:"Not me"}):null:l("span",{className:"syncify-status-answers",children:[a($,{variant:"secondary",onClick:()=>e.onAnswerInstall("reject"),disabled:e.answering,children:"Not mine"}),a($,{onClick:()=>e.onAnswerInstall("approve"),disabled:e.answering,children:"Approve"})]})]}),l("div",{className:"syncify-status-line","aria-live":"polite",children:[n.backedUp?a(Qe,{className:"syncify-status-check"}):null,a(Y,{parts:n.line}),o]})]}):a("section",{className:"syncify-status","aria-label":"Status",children:l("div",{className:"syncify-status-main","aria-live":"polite",children:[l("div",{className:"syncify-status-text",children:[a("h2",{className:"syncify-status-title",children:n.title}),n.detail.length>0?a(Y,{parts:n.detail}):null,n.supportAsk?l("p",{className:"syncify-status-ask",children:[a("span",{children:n.supportAsk}),a($,{variant:"text",onClick:e.onSupport,children:"Support it on Ko-fi"})]}):null]}),o]})})}function _s(e){let{codeCount:n,account:t,newerVersion:i}=e,o=[{id:"backups",label:"Backups"},{id:"share",label:"Share",status:n?a(Wi,{count:n,label:He(n,"code")}):void 0},{id:"account",label:"Account",status:t?t.kind==="ok"?a("span",{className:"syncify-tab-check",role:"img","aria-label":t.label,children:a(Qe,{})}):a(Ne,{tone:"warning",label:t.label}):void 0},{id:"settings",label:"Settings",status:i?a(Ne,{tone:"info",label:`Syncify ${i} is out`}):void 0}];return a(Gi,{tabs:o,selected:e.selected,onSelect:e.onSelect,idBase:e.idBase,label:"Syncify"})}function ao(e){var Ke,In,ze,z,Pe,ue,Fe,We,En,rt,Rn,rn,Pn;let n=fe("syncify"),t=D(),[i,o]=m(()=>de()),{local:r,refreshLocal:s}=Is(),c=Ns(i),u=ws(),y=Es(),d=Rs(),[g]=m(()=>Fr()!==null),[h,C]=m((Ke=e.tab)!=null?Ke:"backups"),[v,b]=m(()=>c.check?"idle":"checking"),[x,w]=m(null),[E,_]=m(null),[H,pe]=m(!1),[J,R]=m(!1),[L,me]=m(!1),[I,A]=m(null),[ge,ie]=m(()=>wr()),[q,se]=m(e.secure===!0),Ee=F(!1),{remote:K,lockedBy:ee,claims:ce,session:oe}=c,he=v!=="idle",on=(In=r==null?void 0:r.hash)!=null?In:null,tt=((ze=K.claim)==null?void 0:ze.status)==="pending"&&!K.claim.mine?K.claim:null,le=es(ce,ee,tt!==null),G=!!(on&&K.backups.some(S=>S.payload_hash===on)),be=xs({activity:v,checked:c.check!==null,checkError:x,unsupported:H,locked:ee,latest:K.payload,latestItems:K.payload?kn(K.payload).map(S=>S.key):[],backedUp:G,localHash:on,localItems:(z=r==null?void 0:r.installedItems)!=null?z:[],localItemCount:(Pe=r==null?void 0:r.installedItemCount)!=null?Pe:0,localConfig:(ue=r==null?void 0:r.spicetifyConfig)!=null?ue:null,restoreResult:d.recent?d.result:null}),vn=Cs(K.claim,(We=(Fe=K.install)==null?void 0:Fe.waiting[0])!=null?We:null),it=!ge&&!ee&&K.payload!==null&&h!=="account"&&(oe?le.kind==="open":oe===null&&K.nudge),V=(oe?(En=ce==null?void 0:ce.accounts)!=null?En:[]:[]).filter(S=>S.status==="final").map((S,O)=>({hash:S.hash,label:`Spotify account ${O+1}${S.device_info?` from ${S.device_info}`:""}`})).filter(S=>S.hash!==(ce==null?void 0:ce.hash));async function W(S={}){try{(!S.silent||!c.check)&&b("checking"),S.silent||(_(null),w(null)),await s(),await c.refresh()&&C("account"),w(null),b("idle")}catch(O){ke(O)}}function ke(S){if(b("idle"),S instanceof Dn){pe(!0),_(null);return}if(S instanceof Ve){_({kind:"error",text:S.message}),W({silent:!0});return}if(S instanceof re&&S.code!=="not_linked"){_(null),W({silent:!0});return}let O=S instanceof Error?S.message:String(S);c.check?_({kind:"error",text:O}):w(O),Spicetify.showNotification(O,!0,6e3)}async function xn(){try{b("backing-up"),_(null);let{payload:S,unchanged:O,unapproved:Te}=await Vn(i);if(await s(),Te){await W({silent:!0}),_({kind:"warning",text:"Backed up, but kept apart until this install is approved."}),Spicetify.showNotification("Syncify: backed up, waiting for approval");return}O||c.addBackup(S),b("idle"),Spicetify.showNotification(O?"Syncify: everything is already backed up":"Syncify backup complete")}catch(S){ke(S)}}async function $e(S){var O;try{b("restoring"),_(null),await pr(i,S.row.backup,(O=S.linkedHash)!=null?O:void 0,S.skipped),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),Zn(S.manual),setTimeout(()=>window.location.reload(),1e3)}catch(Te){ke(Te)}}async function ot(S){var Te;let O=(Te=K.install)==null?void 0:Te.waiting[0];if(O){R(!0);try{await $t(i,O.id,S),Spicetify.showNotification(S==="approve"?"Syncify: install approved":"Syncify: install refused"),await W({silent:!0})}catch(st){ke(st)}finally{R(!1)}}}async function at(){R(!0);try{Spicetify.showNotification(jt(await Kt(i))),await W({silent:!0})}catch(S){_({kind:"error",text:S instanceof Error?S.message:String(S)})}finally{R(!1)}}async function Re(){me(!0),A(null);try{await hr(i)}catch(S){S instanceof Oe&&["claim_pending","claimed"].includes(S.code)||A(S instanceof Error?S.message:String(S))}finally{await W({silent:!0}),me(!1)}}function j(){se(!0),oe?Re():C("account")}function Me(S){c.setSession(S),Ee.current=!0,!ee&&K.payload?Re():W({silent:!0})}function Cn(){u.forget(),c.forgetClaims(),A(null),W({silent:!0})}function an(S){S==="back-up"?xn():S==="try-again"?W():S==="sign-in"?C("account"):S==="how-to-update"?nn(`${t.githubUrl}#updating`):Dr()}let Le=to(()=>{c.readSession(),W({silent:!0})});M(()=>Le.current(),[Le]);let Nn=to(()=>{!e.secure||Ee.current||L||!oe||le.kind!=="open"||ee||(Ee.current=!0,Re())});return M(()=>Nn.current(),[Nn,oe,le.kind,ee,L]),l("div",{className:"syncify-ui syncify-window",onClick:oo,onMouseDown:oo,onPointerDown:oo,children:[l("div",{className:"syncify-window-top",children:[a(Ts,{status:be,alert:vn,backingUp:v==="backing-up",busy:he||be.action==="back-up"&&ee!==null,answering:J,onAction:an,onNotMe:()=>{at()},onAnswerInstall:S=>{ot(S)},onSupport:()=>nn(t.kofiUrl)}),E?a(vs,{message:E,busy:he,onTryAgain:()=>{W()},onDismiss:()=>_(null)}):null,a(_s,{idBase:n,selected:h,onSelect:C,codeCount:oe?u.codeCount:null,account:ns(oe,ee,le),newerVersion:y})]}),h==="backups"?a(ps,{idBase:n,config:i,remote:c.check?K:null,failed:x!==null,lockedBy:ee,local:r,otherAccounts:V,notices:a(Ss,{nudge:it,securing:L,onSecure:j,onHideNudge:()=>{Sr(),ie(!0)},install:ee||le.kind==="secured"?null:K.install,restoreResult:d.result}),busy:he,restoring:v==="restoring",onRestore:S=>{$e(S)},onError:ke}):h==="share"?a(Ie,{idBase:n,id:"share",children:a("div",{className:"syncify-panel",children:a(ks,{config:i,session:oe,localItems:(rt=r==null?void 0:r.items)!=null?rt:[],localConfig:(Rn=r==null?void 0:r.spicetifyConfig)!=null?Rn:null,localTheme:(rn=r==null?void 0:r.activeTheme)!=null?rn:null,marketplaceAvailable:(Pn=r==null?void 0:r.marketplaceAvailable)!=null?Pn:null,busy:he,onSignIn:()=>C("account"),onSignedOut:Cn,onCodeCount:u.saveCodeCount,onHandle:u.saveHandle})})}):h==="account"?a(Ie,{idBase:n,id:"account",children:a("div",{className:"syncify-panel",children:a(os,{session:oe,locked:ee,secure:le,securing:L,secureError:I,onSecure:()=>{Re()},nudge:q,onSignedIn:Me,onSignedOut:Cn,onOpenWebsite:nn,handle:u.handle,onHandle:u.saveHandle})})}):a(ms,{idBase:n,config:i,onConfigChange:o,busy:he,unsupported:H}),a(Ps,{newerVersion:y,loadedByLoader:g})]})}function oo(e){e.stopPropagation()}function As(e){let{claim:n}=e,[t,i]=m(!1),[o,r]=m(null);async function s(){i(!0),r(null);try{Spicetify.showNotification(jt(await Kt(de()))),e.onClose()}catch(c){r(c instanceof Error?c.message:String(c)),i(!1)}}return l("div",{className:"syncify-panel",children:[a("p",{className:"syncify-claim-notice",children:Zr(n)}),o?a("div",{className:"syncify-alert","data-kind":"error",role:"alert",children:o}):null,l("div",{className:"syncify-actions",children:[a("button",{className:"syncify-text-button",type:"button",onClick:e.onClose,disabled:t,children:"Close"}),a("button",{className:"syncify-button",type:"button",onClick:()=>{s()},disabled:t,children:"Not me"})]})]})}function Ms(e){return l("div",{className:"syncify-panel",children:[a("p",{className:"syncify-claim-notice",children:Qr(e.claim)}),a("div",{className:"syncify-actions",children:a("button",{className:"syncify-button",type:"button",onClick:e.onClose,children:"Close"})})]})}function Ls(e){let{install:n}=e,[t,i]=m(!1),[o,r]=m(null);async function s(c){i(!0),r(null);try{await $t(de(),n.id,c),Spicetify.showNotification(c==="approve"?"Syncify: install approved":"Syncify: install refused"),e.onDone(c)}catch(u){r(u instanceof Error?u.message:String(u)),i(!1)}}return l(P,{children:[l("p",{className:"syncify-claim-notice",children:[Yt(n),". Approve it if it's yours."]}),o?a("div",{className:"syncify-alert","data-kind":"error",role:"alert",children:o}):null,l("div",{className:"syncify-actions",children:[a("button",{className:"syncify-text-button",type:"button",onClick:e.onClose,disabled:t,children:"Close"}),a("button",{className:"syncify-button secondary",type:"button",onClick:()=>{s("reject")},disabled:t,children:"Not mine"}),a("button",{className:"syncify-button",type:"button",onClick:()=>{s("approve")},disabled:t,children:"Approve"})]})]})}function Bs(e){return l("div",{className:"syncify-panel",children:[a("p",{className:"syncify-claim-notice",children:"Your backup isn't secured yet. Anyone who knows your Spotify username can restore it or claim it as theirs. Secure it with your email so only you can."}),l("div",{className:"syncify-actions",children:[a("button",{className:"syncify-text-button",type:"button",onClick:e.onClose,children:"Not now"}),a("button",{className:"syncify-button",type:"button",onClick:n=>{n.stopPropagation(),e.onSecure()},children:"Secure"})]})]})}var Jt="[Syncify]";function te(e,n){if(n===void 0){console.debug(Jt,e);return}console.debug(Jt,e,n)}function nt(e,n){if(n===void 0){console.warn(Jt,e);return}console.warn(Jt,e,n)}function Ny(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var Os="syncify-styles";function Iy(){if(document.getElementById(Os)){te("Another copy of Syncify is running; stopping this one");return}po(Spicetify.React),Ey();let e=de();yr({topbarButton:Ry(),menuItem:Ly()}),Ot(e.entryPoint),Ii(e.shortcut,Zt),Er({onClaim:n=>{Oy(n)},onUndone:Uy,onInstall:Hy,onNudge:$y}).catch(n=>{nt("Startup sync check failed",n)}),Ur().catch(n=>{nt("Restore check failed",n)})}function Ey(){let e=document.createElement("style");e.id=Os,e.textContent=Ho,document.head.appendChild(e)}function Ry(){let{extensionName:e}=D(),n=new Spicetify.Topbar.Button(e,ei,t=>{te("Topbar button clicked",Xt(t)),Zt()},!1,!0);return Us(n),_y(n),Dy(n),te("Topbar button registered",Xt(n)),n}function Us(e){var t;let n=e;e.element.style.setProperty("-webkit-app-region","no-drag"),(t=n.button)==null||t.style.setProperty("-webkit-app-region","no-drag")}var Ds=".main-actionButtons",Py=".Root__globalNav, .Root__top-bar",Ty=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function _y(e){if(typeof MutationObserver=="undefined")return;let n=!1,t=null,i=()=>{n=!1,r();let s=e.element,c=document.querySelector(Ds);!s||!c||c.contains(s)||(c.prepend(s),Ay(e),Us(e),te("Topbar button re-attached",Xt(e)))},o=new MutationObserver(()=>{n||(n=!0,setTimeout(i,250))}),r=()=>{var u;if(t!=null&&t.isConnected)return;let s=document.querySelector(Ds),c=(u=s==null?void 0:s.closest(Py))!=null?u:s==null?void 0:s.parentElement;if(o.disconnect(),t=c!=null?c:null,!c){o.observe(document.body,{childList:!0,subtree:!0});return}o.observe(c,{childList:!0,subtree:!0});for(let y=c.parentElement;y;y=y.parentElement)o.observe(y,{childList:!0})};i()}function Ay(e){let n=My(e);if(!n||n.className&&n.className!=="undefined")return;let t=Array.from(document.querySelectorAll(Ty)).find(i=>!e.element.contains(i));t!=null&&t.className&&(n.className=t.className)}function My(e){return e.button}function Ly(){var e;if(typeof((e=Spicetify.Menu)==null?void 0:e.Item)!="function")return null;try{return new Spicetify.Menu.Item(D().extensionName,!1,()=>Zt(),By())}catch(n){return nt("Failed to create profile menu item",n),null}}function By(){return ei.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}function Dy(e){Object.assign(window,{SyncifyDebug:{button:e,element:e.element,openModal:Zt,inspect:()=>Xt(e),clickElement:()=>{var n;return(n=e.element)==null?void 0:n.click()},clickInnerButton:()=>{var n;return(n=e.button)==null?void 0:n.click()},clickCallback:()=>e.onClick(e)}})}function Xt(e){var n,t,i,o,r;return{label:e.label,disabled:e.disabled,isRight:e.isRight,hasElement:!!e.element,elementConnected:(n=e.element)==null?void 0:n.isConnected,elementDisabled:(t=e.element)==null?void 0:t.disabled,elementAriaDisabled:(i=e.element)==null?void 0:i.getAttribute("aria-disabled"),elementClass:(o=e.element)==null?void 0:o.className,appRegion:e.element?getComputedStyle(e.element).getPropertyValue("-webkit-app-region"):null,innerButtonAppRegion:e.button?getComputedStyle(e.button).getPropertyValue("-webkit-app-region"):null,pointerEvents:e.element?getComputedStyle(e.element).pointerEvents:null,visibility:e.element?getComputedStyle(e.element).visibility:null,display:e.element?getComputedStyle(e.element).display:null,rect:(r=e.element)==null?void 0:r.getBoundingClientRect().toJSON()}}var U=null;function Zt(){if(U!=null&&U.container.isConnected){te("Closing modal"),Spicetify.PopupModal.hide();return}te("Opening modal"),Sn(a(ao,{}))}async function Oy(e){U!=null&&U.container.isConnected||(te("Opening claim notice"),Sn(a(As,{claim:e,onClose:()=>Spicetify.PopupModal.hide()})))}function Uy(e){return U!=null&&U.container.isConnected?!1:(te("Opening undone claim notice"),Sn(a(Ms,{claim:e,onClose:()=>Spicetify.PopupModal.hide()})),!0)}function Hy(e){if(U!=null&&U.container.isConnected)return;te("Opening install notice");let n=()=>Spicetify.PopupModal.hide();Sn(a("div",{className:"syncify-panel",children:a(Ls,{install:e,onDone:n,onClose:n})}))}function $y(){U!=null&&U.container.isConnected||(te("Opening nudge notice"),xr(),Sn(a(Bs,{onSecure:()=>Sn(a(ao,{tab:"account",secure:!0})),onClose:()=>Spicetify.PopupModal.hide()})))}function Sn(e){var t;(t=U==null?void 0:U.root)==null||t.unmount();let n=document.createElement("div");U={container:n,root:null};try{Spicetify.PopupModal.display({title:D().extensionName,content:n,isLarge:!1})}catch(i){throw nt("Failed to open PopupModal",i),i}Ky(n),Fy(n,e)}function Ky(e){requestAnimationFrame(()=>{let n=zy(e);n==null||n.classList.add("syncify-modal-shell");let t=n==null?void 0:n.querySelector(".main-trackCreditsModal-header h1");if(t&&!t.querySelector(".syncify-modal-mark")){let o=document.createElement("span");o.className="syncify-modal-mark",o.innerHTML=$o,t.prepend(o)}let i=n==null?void 0:n.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');i&&(i.classList.add("syncify-modal-close"),i.setAttribute("aria-label",`Close ${D().extensionName}`),i.title="Close",i.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function zy(e){let n=e.parentElement;for(;n&&n!==document.body;){if(n.querySelector(".main-trackCreditsModal-header"))return n;n=n.parentElement}return e.closest('[class*="trackCreditsModal"]')}function Fy(e,n){try{if(typeof Spicetify.ReactDOM.createRoot=="function"){let t=Spicetify.ReactDOM.createRoot(e);t.render(n),(U==null?void 0:U.container)===e&&(U.root=t),te("Modal rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(n,e),te("Modal rendered",{renderer:"render"})}catch(t){throw nt("Failed to render modal",t),t}}Or();(function e(){if(!Ny()){setTimeout(e,100);return}te("Spicetify APIs ready"),Iy()})();})();
