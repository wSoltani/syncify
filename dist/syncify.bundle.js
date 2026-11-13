// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var bc=Object.defineProperty,kc=Object.defineProperties;var wc=Object.getOwnPropertyDescriptors;var zt=Object.getOwnPropertySymbols;var ci=Object.prototype.hasOwnProperty,li=Object.prototype.propertyIsEnumerable;var si=(e,t,n)=>t in e?bc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,m=(e,t)=>{for(var n in t||(t={}))ci.call(t,n)&&si(e,n,t[n]);if(zt)for(var n of zt(t))li.call(t,n)&&si(e,n,t[n]);return e},w=(e,t)=>kc(e,wc(t));var ue=(e,t)=>{var n={};for(var o in e)ci.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&zt)for(var o of zt(e))t.indexOf(o)<0&&li.call(e,o)&&(n[o]=e[o]);return n};var mt,D,ne,_,gt,q,vc,j,g;function ui(e){({createElement:mt,Fragment:D,useCallback:ne,useEffect:_,useLayoutEffect:gt,useMemo:q,useReducer:vc,useRef:j,useState:g}=e)}var di=`/* Shared values for every part. Colors come from the active Spicetify theme,
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
`;var fi=`.syncify-icon {
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
`;var yi=`.syncify-btn,
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
`;var pi=`.syncify-switch-control {
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
`;var mi=`.syncify-checkbox {
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

/* A checkbox and its label, centered on the label's capitals. */
.syncify-checkbox-row {
    display: flex;
    align-items: center;
    gap: var(--syncify-space-3);
    align-self: flex-start;
    min-height: var(--syncify-size-control-small);
    font-weight: 600;
    cursor: pointer;
}

.syncify-checkbox-row[data-disabled="true"] {
    cursor: default;
    opacity: 0.45;
}

.syncify-checkbox-row[data-disabled="true"] .syncify-checkbox {
    opacity: 1;
}

/* Trimmed to its capitals like .syncify-cap, but free to wrap at narrow widths. */
@supports (text-box: trim-both cap alphabetic) {
    .syncify-checkbox-label {
        text-box: trim-both cap alphabetic;
    }
}
`;var gi=`.syncify-setting-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: var(--syncify-space-2) var(--syncify-space-4);
    min-height: var(--syncify-size-row-single);
    /* The room a control already leaves in a one-line row, so a row whose
       control moved under its label keeps clear of the lines around it. */
    padding-block: calc((var(--syncify-size-row-single) - var(--syncify-size-control)) / 2);
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

.syncify-setting-row-text,
.syncify-setting-row > .syncify-setting-row-label {
    display: flex;
    /* Takes the room the control leaves; once its longest word no longer
       fits, the control moves under it instead of being cut. */
    flex: 1 1 0;
    flex-direction: column;
    min-width: min-content;
}

.syncify-setting-row-label {
    font-weight: 600;
    overflow-wrap: break-word;
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
`;var hi=`/* Facts on one line, wrapping between facts. Each fact is trimmed to its
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
`;var Si=`.syncify-list {
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
`;var bi=`.syncify-field-group {
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
`;var ki=`.syncify-menu {
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
`;var wi=`.syncify-meter {
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
`;var vi=`.syncify-mark-square {
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
`;var xi=`.syncify-notice {
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
`;var Ci=`.syncify-dialog {
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
`;var Ii=`/* When the window is too narrow for every tab, the row scrolls sideways
   instead of running off the window, without drawing a scrollbar. The open
   tab is kept in view. */
.syncify-tabs {
    display: flex;
    gap: var(--syncify-space-1);
    overflow-x: auto;
    scrollbar-width: none;
    box-shadow: inset 0 calc(-1 * var(--syncify-line)) 0 var(--syncify-color-divider);
}

.syncify-tabs::-webkit-scrollbar {
    display: none;
}

/* Drawn inside the tab, so the scrolling row never cuts it off. */
.syncify-ui .syncify-tab:focus-visible {
    outline-offset: calc(-1 * var(--syncify-ring));
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
`;var Ri=`.syncify-pip-square {
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
`;var Ei=`.syncify-section-label {
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
`;var Pi=`.syncify-keycap {
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
`;var Ti=`/* A bar as tall as the capitals of the text it stands in for. */
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
`;var Ni=[di,fi,yi,pi,mi,gi,hi,Si,bi,ki,wi,vi,xi,Ci,Ii,Ri,Ei,Pi,Ti].join(`
`);var _i=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var Ai=`/* The window fits the height Spotify's popup leaves it, so the status and
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
`;var Mi=`/* The safety copy's shield, after its name. */
.syncify-safety-mark {
    color: var(--syncify-color-accent);
}

/* "Current", where an older backup has its chevron. */
.syncify-row-status {
    color: var(--syncify-color-accent);
    font-size: var(--syncify-text-small);
    font-weight: 700;
}
`;var Bi=`/* Adds, Updates and Removes: plain colored text, not chips. */
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
`;var Li=`/* Loading a setup, the picks and your codes, split by dashed lines. */
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
`;var Di=`/* The code step's Resend and Use another email. */
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
`;var Oi=`/* Turn off or Use default, then the key. */
.syncify-settings-shortcut {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    gap: var(--syncify-space-2);
}
`;var Ui=`/* A launch notice in Spotify's popup: the dialog layout, the popup's width. */
.syncify-launch-notice {
    width: 100%;
}
`;var $i=[Ni,_i,Ai,Bi,Mi,Li,Di,Oi,Ui].join(`
`);var Jc="syncify",Ge="state";function Dn(){let e;try{e=window.indexedDB}catch(t){return Promise.resolve(null)}return e?new Promise(t=>{let n;try{n=e.open(Jc,1)}catch(o){t(null);return}n.onupgradeneeded=()=>{n.result.createObjectStore(Ge)},n.onerror=()=>t(null),n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}function On(e,t){let n=Dn().then(o=>new Promise((i,r)=>{if(!o){r(new Error("IndexedDB isn't available."));return}try{let s=o.transaction(Ge,e),c=t(s.objectStore(Ge));s.oncomplete=()=>{o.close(),i(c.result)},s.onerror=s.onabort=()=>{var l;o.close(),r((l=s.error)!=null?l:new Error("IndexedDB failed."))}}catch(s){o.close(),r(s)}}));return Promise.race([n,new Promise((o,i)=>setTimeout(()=>i(new Error("IndexedDB took too long.")),2e3))])}function Ee(e){return On("readonly",t=>t.get(e))}async function ye(e,t){await On("readwrite",n=>n.put(t,e))}async function Ki(e){await On("readwrite",t=>t.delete(e))}var pe={extensionName:"Syncify",version:"1.18.0",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",discordUrl:"https://syncify.wsoltani.com/discord",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com",shareUrl:"https://syncs.wsoltani.com"};function U(){var t,n,o,i,r,s,c,l,u,d;let e=window.SyncifyConfig;return{extensionName:(t=ve(e==null?void 0:e.extensionName))!=null?t:pe.extensionName,version:(n=Hi(e==null?void 0:e.version))!=null?n:pe.version,workerUrl:(o=ve(e==null?void 0:e.workerUrl))!=null?o:pe.workerUrl,webUrl:(i=ve(e==null?void 0:e.webUrl))!=null?i:pe.webUrl,githubUrl:(r=ve(e==null?void 0:e.githubUrl))!=null?r:pe.githubUrl,kofiUrl:(s=ve(e==null?void 0:e.kofiUrl))!=null?s:pe.kofiUrl,discordUrl:(c=ve(e==null?void 0:e.discordUrl))!=null?c:pe.discordUrl,issueUrl:(l=ve(e==null?void 0:e.issueUrl))!=null?l:pe.issueUrl,releasesUrl:(u=ve(e==null?void 0:e.releasesUrl))!=null?u:pe.releasesUrl,shareUrl:(d=ve(e==null?void 0:e.shareUrl))!=null?d:pe.shareUrl}}function ve(e){return Hi(e)}function Hi(e){return typeof e=="string"&&e.trim()?e.trim():null}var Xc="x-syncify-version",Zc="x-syncify-install",Qc="x-syncify-timezone",Fi="install-id",zi="syncify:install-id",el=2e3,Wt=null;async function Wi(){let e={[Xc]:U().version,[Zc]:(await Un()).id},t=ol();return t&&(e[Qc]=t),e}function Un(){return Wt!=null||(Wt=tl().catch(()=>({id:jt(),inDatabase:!1}))),Wt}async function tl(){let e=await Promise.race([nl(),new Promise(t=>setTimeout(()=>t(null),el))]);if(e)return{id:e,inDatabase:!0};try{let t=window.localStorage.getItem(zi);if(t&&ji(t))return{id:t,inDatabase:!1};let n=jt();return window.localStorage.setItem(zi,n),{id:n,inDatabase:!1}}catch(t){return{id:jt(),inDatabase:!1}}}async function nl(){let e=await Dn();return e?new Promise(t=>{let n=null;try{let o=e.transaction(Ge,"readwrite"),i=o.objectStore(Ge),r=i.get(Fi);r.onsuccess=()=>{if(typeof r.result=="string"&&ji(r.result)){n=r.result;return}n=jt(),i.put(n,Fi)},o.oncomplete=()=>{e.close(),t(n)},o.onerror=o.onabort=()=>{e.close(),t(null)}}catch(o){e.close(),t(null)}}):null}function jt(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t=[...e].map(n=>n.toString(16).padStart(2,"0"));return[t.slice(0,4).join(""),t.slice(4,6).join(""),t.slice(6,8).join(""),t.slice(8,10).join(""),t.slice(10).join("")].join("-")}function ji(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(e)}function ol(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(e){return null}}var il="syncify-signature-v1",rl={name:"ECDSA",hash:"SHA-256"};function Yt(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function qt(e){return $n(new Uint8Array(await crypto.subtle.exportKey("raw",e)))}async function ht(e,t,n,o,i){let r=await al(t,n,o,i),s=await crypto.subtle.sign(rl,e,r);return $n(new Uint8Array(s))}async function al(e,t,n,o){let{pathname:i,search:r}=new URL(n),s=new TextEncoder,c=$n(new Uint8Array(await crypto.subtle.digest("SHA-256",s.encode(o))));return s.encode([il,e,t.toUpperCase(),i+r,c].join(`
`))}function $n(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var Yi="device-key",Kn="session",qi="salt",Be=null,St,Gi={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function Ve(e){if(Be)return Be;let t=await Ee(Yi);return sl(t)?(Be=Promise.resolve(t),t):e?(Be=Yt().then(async n=>(await ye(Yi,n),n)),Be.catch(()=>{Be=null}),Be):null}async function ie(){let e=await Ee(Kn);return cl(e)?e:null}function Hn(e){return ye(Kn,e)}async function Le(){await Ki(Kn).catch(()=>{})}async function Gt(){if(St===void 0){let e=await Ee(qi).catch(()=>{});St=typeof e=="string"?e:null}return St}async function Vt(e){e!==St&&(St=e,await ye(qi,e).catch(()=>{}))}function Jt(){return Gi}function Vi(e){Gi=e}function sl(e){let t=e;return!!(t&&t.privateKey instanceof CryptoKey&&t.publicKey instanceof CryptoKey)}function cl(e){let t=e;return!!(t&&typeof t.token=="string"&&t.token&&typeof t.email=="string")}var Ji="install-key",Je=null;function Xi(){return Je!=null||(Je=ll()),Je.catch(()=>{Je=null}),Je.catch(()=>null)}async function ll(){if(!(await Un()).inDatabase)return null;let e=await Ee(Ji),t=dl(e)?e:await ul();return{privateKey:t.privateKey,publicKey:await qt(t.publicKey)}}async function ul(){let e=await Yt();return await ye(Ji,e),e}function dl(e){let t=e;return!!(t&&t.privateKey instanceof CryptoKey&&t.publicKey instanceof CryptoKey)}var fl="/api/auth/email-otp/send-verification-otp",yl="/api/auth/sign-in/email-otp",pl="/api/auth/get-session",ml="/api/auth/sign-out",gl="/api/auth/link",hl="x-syncify-device-key",Sl="x-syncify-signature",Zi="x-syncify-salt",bl="none",kl={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again.",link_failed:"Couldn't open the website. Try again."},A=class extends Error{constructor(n,o=null,i=null){var r;super((r=kl[n])!=null?r:"Sign-in failed. Try again.");this.code=n;this.retryAfter=o;this.share=i;this.name="AccountError"}};function Pe(e){return e instanceof A?e.message:"Sign-in failed. Try again."}async function Qi(e,t={}){let n=await kt(fl,{method:"POST",body:JSON.stringify(m({email:e,type:"sign-in"},t.nudge?{nudge:!0}:{}))});return typeof(n==null?void 0:n.resend_in)=="number"?n.resend_in:60}async function er(e,t){var r;let n=await Ve(!0).catch(()=>{throw new A("no_device_key")}),o=await kt(yl,{method:"POST",body:JSON.stringify({email:e,otp:t}),keys:n,sendPublicKey:!0});if(typeof(o==null?void 0:o.token)!="string"||!o.token)throw new A("sign_in_failed");let i={token:o.token,email:typeof((r=o.user)==null?void 0:r.email)=="string"?o.user.email:e};return await Hn(i).catch(()=>{throw new A("no_device_key")}),Fn=!0,i}var Fn=!1;async function tr(){var t;let e=await ie();if(!e||Fn)return e;try{let n=await Xt(e,pl,"GET");Fn=!0;let o=(t=n==null?void 0:n.user)==null?void 0:t.email;if(typeof o!="string"||o===e.email)return e;let i=w(m({},e),{email:o});return await Hn(i).catch(()=>{}),i}catch(n){if(n instanceof A&&n.code==="signed_out")return null;throw n}}async function nr(){let e=await ie().catch(()=>null);e&&await Xt(e,ml,"POST").catch(()=>{}),await Le()}async function or(){let e=await ie();if(!e)throw new A("signed_out");let t=await Xt(e,gl,"POST"),n=typeof(t==null?void 0:t.url)=="string"?t.url:"",o=new URL(U().webUrl).origin;if(!n.startsWith(`${o}/link#`))throw new A("link_failed");return n}async function bt(e,t,n){let o=await ie();if(!o)throw new A("signed_out");return Xt(o,e,t,n)}async function ir(e,t,n){let o=await ie().catch(()=>null),i=o?await Ve(!1).catch(()=>null):null;await kt(e,m({method:"POST",body:JSON.stringify(t),headers:n,keepalive:!0},o&&i?{token:o.token,keys:i}:{}))}async function Xt(e,t,n,o){let i=await Ve(!1);if(!i)throw await Le(),new A("signed_out");return kt(t,m({method:n,token:e.token,keys:i},o===void 0?{}:{body:JSON.stringify(o)}))}async function kt(e,t,n=!1){var f,y,h;let o=`${U().webUrl.replace(/\/+$/,"")}${e}`,i=m({},t.headers);if(t.body!==void 0&&(i["content-type"]="application/json"),t.token&&(i.authorization=`Bearer ${t.token}`),t.keys){let b=(f=await Gt())!=null?f:bl;i[Zi]=b,i[Sl]=await ht(t.keys.privateKey,b,t.method,o,(y=t.body)!=null?y:""),t.sendPublicKey&&(i[hl]=await qt(t.keys.publicKey))}let r;try{r=await fetch(o,{method:t.method,headers:i,body:t.body,keepalive:t.keepalive})}catch(b){throw new A("offline")}let s=r.headers.get(Zi);s&&await Vt(s);let c=await r.json().catch(()=>null);if(r.ok)return c;let l=typeof(c==null?void 0:c.code)=="string"?c.code:r.status===503?"unavailable":"failed";if(l==="stale_salt"&&t.keys&&!n)return kt(e,t,!0);l==="signed_out"&&await Le();let u=Number(r.headers.get("retry-after")),d=c==null?void 0:c.share;throw new A(l,Number.isFinite(u)&&u>0?u:(h=wl[l])!=null?h:null,typeof(d==null?void 0:d.code)=="string"?{code:d.code,link:typeof d.link=="string"?d.link:null}:null)}var wl={resend_wait:60,too_many_requests:60,send_failed:60};var vl="x-syncify-user-hash",xl="x-syncify-identity",Cl="x-syncify-signature",Il="x-syncify-install-key",Rl="x-syncify-install-signature",zn="x-syncify-salt",El="none",Pl="/restores",Tl="/installs",Nl="hash",rr=3,wt=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}},re=class extends Error{constructor(n){super(n==="not_linked"?"Couldn't read that Spotify account's backups.":"Sign in to restore this backup.");this.code=n;this.name="LockedError"}},De=class extends Error{constructor(){super("This Spotify account doesn't accept backups from this install. Sign in to back up."),this.name="InstallRefusedError"}};async function sr(e,t,n){var r;let o=await Te(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(n)});if(o.status===403&&((r=await o.json().catch(()=>null))==null?void 0:r.code)==="install_refused")throw new De;if(!o.ok)throw new Error(`Backup failed with HTTP ${o.status}.`);let i=await o.json().catch(()=>null);return{unchanged:(i==null?void 0:i.unchanged)===!0,unapproved:(i==null?void 0:i.quarantined)===!0}}async function cr(e,t,n,o){let i=await Te(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({install:n,action:o})},Tl);if(i.ok)return;let r=await i.json().catch(()=>null);if((r==null?void 0:r.code)!=="not_pending")throw new Error(`Couldn't answer with HTTP ${i.status}.`)}async function Wn(e,t,n){var h,b,R,v;let o=await Te(e,t,{method:"GET"},ur("/",n));if(o.status===404){let S=await o.json().catch(()=>null);return{exists:!1,payload:null,backups:[],safetyCopy:null,claim:vt(S==null?void 0:S.claim),unapproved:[],install:ar(S==null?void 0:S.install),nudge:!1}}if(!o.ok)throw new Error(`Restore failed with HTTP ${o.status}.`);let i=await o.json(),r=vt(i.claim),s=ar(i.install),c=i.nudge===!0;delete i.claim,delete i.install,delete i.nudge;let l=[i,...(h=i.backup_history)!=null?h:[]];if(!l.every(S=>S.backup))return{exists:!0,payload:i,backups:l.slice(0,rr),safetyCopy:(b=l[rr])!=null?b:null,claim:r,unapproved:[],install:s,nudge:c};let u=l.filter(S=>{var P;return((P=S.backup)==null?void 0:P.kind)==="rolling"}),d=(R=l.find(S=>{var P;return((P=S.backup)==null?void 0:P.kind)==="anchor"}))!=null?R:null,f=l.filter(S=>{var P;return((P=S.backup)==null?void 0:P.kind)==="quarantined"}),y=(v=u[0])!=null?v:d;return y?u.length===0&&d?{exists:!0,payload:y,backups:[d],safetyCopy:null,claim:r,unapproved:f,install:s,nudge:c}:{exists:!0,payload:y,backups:u,safetyCopy:d,claim:r,unapproved:f,install:s,nudge:c}:{exists:!1,payload:null,backups:[],safetyCopy:null,claim:r,unapproved:f,install:s,nudge:c}}async function lr(e,t,n,o){try{await Te(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:n}),keepalive:!0},ur(Pl,o))}catch(i){}}async function Te(e,t,n,o="",i=!1){var R,v,S,P,O;let r=o?`${e.replace(/\/+$/,"")}${o}`:e,s=(R=n.method)!=null?R:"GET",c=await ie().catch(()=>null),l=c?await Ve(!1).catch(()=>null):null,u=await Xi(),d={},f=(v=await Gt())!=null?v:El;c&&l&&(d.authorization=`Bearer ${c.token}`,d[zn]=f,d[Cl]=await ht(l.privateKey,f,s,r,(S=n.body)!=null?S:"")),u&&(d[zn]=f,d[Il]=u.publicKey,d[Rl]=await ht(u.privateKey,f,s,r,(P=n.body)!=null?P:""));let y=await fetch(r,w(m({},n),{headers:m(w(m(m({},n.headers),await Wi()),{[vl]:t.hash,[xl]:t.field}),d)})),h=y.headers.get(zn);if(h&&await Vt(h),y.status===426)throw new wt;if(y.status!==401)return y;let b=(O=await y.clone().json().catch(()=>null))==null?void 0:O.code;if(!i){if(b==="stale_salt"&&(c||u))return Te(e,t,n,o,!0);if(b==="signed_out"&&c)return await Le(),Te(e,t,n,o,!0)}throw b==="claimed"||b==="not_owner"||b==="not_linked"?new re(b):(b==="signed_out"&&await Le(),new A(typeof b=="string"?b:"failed"))}function ur(e,t){return t?`${e}?${Nl}=${encodeURIComponent(t)}`:e}function ar(e){let t=e;if(!t||typeof t.trust!="string")return null;let n=Array.isArray(t.waiting)?t.waiting:[];return{trusted:t.trust!=="pending"&&t.trust!=="rejected",refused:t.trust==="rejected",waiting:n.flatMap(o=>{let i=o;return i&&typeof i.id=="string"&&typeof i.first_seen_at=="number"?[{id:i.id,device:typeof i.device=="string"?i.device:null,first_seen_at:i.first_seen_at}]:[]})}}function vt(e){let t=e;return!t||typeof t.mine!="boolean"?null:t.status==="final"?{status:"final",mine:t.mine}:t.status==="undone"?typeof t.undone_at=="number"?{status:"undone",mine:!1,email:typeof t.email=="string"?t.email:null,undone_at:t.undone_at}:null:t.status!=="pending"||typeof t.final_at!="number"?null:m({status:"pending",mine:t.mine,email:typeof t.email=="string"?t.email:null,final_at:t.final_at,held:t.held===!0},t.not_me===!0?{not_me:!0}:{})}async function Zt(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return[...new Uint8Array(n)].map(o=>o.toString(16).padStart(2,"0")).join("")}function Ne(e){return JSON.stringify(jn(e))}function jn(e){return Array.isArray(e)?e.map(jn):e&&typeof e=="object"?Object.keys(e).sort().reduce((t,n)=>(t[n]=jn(e[n]),t),{}):e}function dr(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var _l="registry.json",fr="settings-registry",Al=1,Ml=3e3,Bl=["marketplace:","spicetify","syncify"],Ll=["spicetify","syncify"],Yn=null;function Xe(){return Yn||(Yn=Dl().then(async e=>e?(await ye(fr,e).catch(()=>{}),e):mr(await Ee(fr).catch(()=>{})))),Yn}async function Dl(){let e=typeof AbortController=="function"?new AbortController:null,t=setTimeout(()=>e==null?void 0:e.abort(),Ml);try{let n=await fetch(`${U().releasesUrl}/${_l}`,{signal:e==null?void 0:e.signal});return n.ok?mr(await n.json()):null}catch(n){return null}finally{clearTimeout(t)}}function mr(e){return!qn(e)||e.format!==Al||!Array.isArray(e.items)?null:{items:e.items.flatMap(n=>{let o=Ol(n);return o?[o]:[]})}}function Ol(e){var i;if(!qn(e)||typeof e.id!="string"||!e.id)return null;let t=yr(e.keys),n=yr((i=e.exclude)!=null?i:[]),o=Ul(e.storage);return!t||!n||!o||t.length===0||o.type==="localStorage"&&t.some($l)||o.type==="indexedDB"&&Ll.some(r=>o.database.startsWith(r))?null:{id:e.id,keys:t,exclude:n,storage:o}}function Ul(e){return e===void 0?{type:"localStorage"}:qn(e)?e.type==="localStorage"?{type:"localStorage"}:e.type!=="indexedDB"||!Qt(e.database)||!Qt(e.store)||e.valueField!==void 0&&!Qt(e.valueField)?null:m({type:"indexedDB",database:e.database,store:e.store},e.valueField!==void 0?{valueField:e.valueField}:{}):null}function yr(e){return Array.isArray(e)&&e.every(t=>Qt(t)&&/^[^*\s]+\*?$/.test(t))?e:null}function Ze(e,t){return e.keys.some(n=>pr(n,t))&&!e.exclude.some(n=>pr(n,t))}function pr(e,t){return e.endsWith("*")?t.startsWith(e.slice(0,-1)):t===e}function $l(e){let t=e.endsWith("*")?e.slice(0,-1):e;return Bl.some(n=>t.startsWith(n)||e.endsWith("*")&&n.startsWith(t))}function Qt(e){return typeof e=="string"&&e.length>0}function qn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}var Kl=2e3,Hl="restored-settings";async function gr(e){await ye(Hl,e).catch(()=>{})}async function Gn(e){var o,i;let t={},n=new Set;for(let[r,s]of Fl(e,wr())){let c=window.localStorage.getItem(r);c!==null&&((i=t[o=s.id])!=null||(t[o]={storage:"localStorage",values:{}}),t[s.id].values[r]=c)}return await Promise.all(e.items.filter(r=>r.storage.type==="indexedDB").map(async r=>{let s=await jl(r);s===null?n.add(r.id):Object.keys(s).length>0&&(t[r.id]={storage:"indexedDB",values:s})})),{settings:t,unavailable:n}}function Fl(e,t){var r,s;let n=new Map,o=[];for(let c of e.items)if(c.storage.type==="localStorage")for(let l of c.keys)l.endsWith("*")?o.push([l.slice(0,-1),c]):n.set(l,c);let i=new Map;for(let c of t){let l=(s=n.get(c))!=null?s:(r=o.find(([u])=>c.startsWith(u)))==null?void 0:r[1];l&&Ze(l,c)&&i.set(c,l)}return i}async function hr(e,t,n){let o=n.flatMap(r=>{let s=e.items.find(l=>l.id===r),c=s?kr(s,t[r]):null;return s&&c?[{item:s,saved:c}]:[]});for(let{item:r,saved:s}of o)r.storage.type==="indexedDB"&&await Yl(r,s);let i=wr();for(let{item:r,saved:s}of o)if(r.storage.type==="localStorage"){for(let c of i)Ze(r,c)&&!(c in s)&&window.localStorage.removeItem(c);for(let[c,l]of Object.entries(s))window.localStorage.setItem(c,l)}}function zl(e,t,n){return t?e.items.flatMap(o=>{var c,l;let i=kr(o,t[o.id]);if(!i||n.unavailable.has(o.id))return[];let r=(l=(c=n.settings[o.id])==null?void 0:c.values)!=null?l:{};return[...new Set([...Object.keys(i),...Object.keys(r)])].some(u=>!Wl(o,i[u],r[u]))?[o.id]:[]}):[]}async function Sr(e){if(!e)return[];let t=await Xe();return t?zl(t,e,await Gn(t)):[]}function br(e,t,n){let o=new TextEncoder,i=t+o.encode(`,${JSON.stringify("extension_settings")}:{}`).byteLength,r=Object.entries(e).map(([l,u])=>({id:l,entry:u,bytes:o.encode(`${JSON.stringify(l)}:${JSON.stringify(u)}`).byteLength})).sort((l,u)=>l.bytes-u.bytes||l.id.localeCompare(u.id)),s={},c=!0;for(let{id:l,entry:u,bytes:d}of r){let f=d+(c?0:1);if(i+f>n)break;i+=f,s[l]=u,c=!1}return s}function kr(e,t){if(!t||typeof t!="object"||t.storage!==e.storage.type||!t.values||typeof t.values!="object"||Array.isArray(t.values))return null;let n={};for(let[o,i]of Object.entries(t.values))Ze(e,o)&&((e.storage.type==="localStorage"?typeof i!="string":!en(i))||(n[o]=i));return Object.keys(n).length>0?n:null}function Wl(e,t,n){if(t===void 0||n===void 0)return t===n;let o=e.storage.type==="indexedDB"?e.storage.valueField:void 0,i=r=>o&&r&&typeof r=="object"&&!Array.isArray(r)?r[o]:r;return Ne(i(t))===Ne(i(n))}function en(e){return e===null||typeof e=="string"||typeof e=="boolean"?!0:typeof e=="number"?Number.isFinite(e):Array.isArray(e)?e.every(en):typeof e=="object"&&Object.getPrototypeOf(e)===Object.prototype?Object.values(e).every(en):!1}function wr(){let e=[];for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);n!==null&&e.push(n)}return e}async function jl(e){let t=e.storage;return vr(t,"readonly",(n,o)=>{let i={},r=n.openCursor();r.onsuccess=()=>{let s=r.result;if(!s)return o(i);let c=s.key;typeof c=="string"&&Ze(e,c)&&en(s.value)&&(i[c]=s.value),s.continue()}}).catch(()=>null)}async function Yl(e,t){let n=e.storage;if(await vr(n,"readwrite",(i,r)=>{let s=i.openCursor();s.onsuccess=()=>{let c=s.result;if(c){let l=c.key;typeof l=="string"&&Ze(e,l)&&!(l in t)&&c.delete(),c.continue();return}for(let[l,u]of Object.entries(t))i.put(u,l);r(!0)}})===null)throw new Error("Syncify couldn't write an extension's settings. Restart Spotify and try again.")}function vr(e,t,n){let o;try{o=window.indexedDB}catch(r){return Promise.resolve(null)}if(!o)return Promise.resolve(null);let i=o;return new Promise((r,s)=>{let c=!1,l=null,u=y=>{c||(c=!0,clearTimeout(d),y())},d=setTimeout(()=>{u(()=>s(new Error("The extension's database took too long.")));try{l==null||l.abort()}catch(y){}},Kl),f;try{f=i.open(e.database)}catch(y){u(()=>r(null));return}f.onupgradeneeded=()=>{var y;return(y=f.transaction)==null?void 0:y.abort()},f.onerror=()=>{let y=f.error;u(()=>(y==null?void 0:y.name)==="AbortError"?r(null):s(y))},f.onblocked=()=>u(()=>s(new Error("The extension's database is busy."))),f.onsuccess=()=>{let y=f.result;if(y.onversionchange=()=>y.close(),c||!y.objectStoreNames.contains(e.store)){y.close(),u(()=>r(null));return}try{let h=y.transaction(e.store,t);l=h;let b=null;n(h.objectStore(e.store),R=>{b=R}),h.oncomplete=()=>{y.close(),u(()=>r(b))},h.onerror=h.onabort=()=>{y.close(),u(()=>{var R;return s((R=h.error)!=null?R:new Error("IndexedDB failed."))})}}catch(h){y.close(),u(()=>s(h))}}})}var ql=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,Gl=100,Vl="marketplace:installed-extensions",Jl="marketplace:installed-themes",Xl="marketplace:theme-installed",Zl="marketplace:installed:",Ql="marketplace";function Jn(e){return Spicetify.Config?Xn(Spicetify.Config,e):null}function Xn(e,t){var r;let n=_e(e),o=new Set(eu(t)),i=((r=t[Xl])==null?void 0:r.includes(Zl))===!0;return{current_theme:i?Ql:n.current_theme,color_scheme:i?"":n.color_scheme,extensions:n.extensions.filter(s=>!o.has(s)),custom_apps:n.custom_apps}}function _e(e){let t=e&&typeof e=="object"?e:{};return{current_theme:Vn(t.current_theme)?t.current_theme:"",color_scheme:Vn(t.color_scheme)?t.color_scheme:"",extensions:xr(t.extensions),custom_apps:xr(t.custom_apps)}}function Rr(e,t){return Ne(_e(e))===Ne(_e(t))}function xr(e){return Array.isArray(e)?[...new Set(e.filter(Vn))].sort().slice(0,Gl):[]}function Vn(e){return typeof e=="string"&&ql.test(e)}function eu(e){let t=Cr(e[Vl]).map(o=>{var r;let i=(r=Ir(e[o]))==null?void 0:r.manifest;return i&&typeof i=="object"?i.main:void 0}),n=Cr(e[Jl]).flatMap(o=>{var r;let i=(r=Ir(e[o]))==null?void 0:r.include;return Array.isArray(i)?i:[]});return[...t,...n].flatMap(o=>{let i=typeof o=="string"?o.split("/").pop():void 0;return i?[i]:[]})}function Cr(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function Ir(e){try{let t=e?JSON.parse(e):null;return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch(t){return null}}var tu=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],nu="marketplace:installed:",Er=`${nu}snippet:`,ou="wsoltani/syncify",iu="marketplace",Pr={added:0,removed:1,unchanged:2};function J(e){let t=new Map;for(let[n,o]of tu)for(let i of cu(e[n]))t.has(i)||t.set(i,au(i,o,e[i]));return[...t.values()]}function on(e,t,n,o){let i=new Set(e.map(l=>l.key)),r=new Map(n.map(l=>[l.key,l])),s=[...e.map(l=>{let u=r.get(l.key);return w(m({},l),{change:u?"unchanged":"added",isNew:!u||u.sources.join(" ")!==l.sources.join(" ")})}),...n.filter(l=>!i.has(l.key)).map(l=>w(m({},l),{change:xt(l,e)?"unchanged":"removed",isNew:!1}))].sort((l,u)=>Pr[l.change]-Pr[u.change]||l.name.localeCompare(u.name)),c={added:0,removed:0,unchanged:0};for(let l of s)c[l.change]+=1;return{items:s,counts:c,manual:ru(t,o)}}function xt(e,t){return e.type==="extension"&&nn(e)&&!t.some(nn)}function nn(e){var t;return((t=e.repo)==null?void 0:t.toLowerCase())===ou}function ru(e,t){if(!e)return[];let n=_e(e),o=_e(t),i=[...n.extensions.filter(s=>!o.extensions.includes(s)).map(s=>({type:"extension",name:s})),...n.custom_apps.filter(s=>!o.custom_apps.includes(s)).map(s=>({type:"custom_app",name:s}))],r=n.current_theme;return r&&r!==iu&&(r!==o.current_theme||n.color_scheme!==o.color_scheme)&&i.push(m({type:"theme",name:r},n.color_scheme?{scheme:n.color_scheme}:{})),i}function au(e,t,n){var l,u;let o=Tr(n),i=Tr(o==null?void 0:o.manifest),r=tn(o==null?void 0:o.user),s=tn(o==null?void 0:o.repo),c=(u=(l=tn(o==null?void 0:o.title))!=null?l:tn(i==null?void 0:i.name))!=null?u:e.startsWith(Er)?e.slice(Er.length):e.split("/").pop()||e;return{key:e,type:t,name:c,repo:t!=="snippet"&&r&&s?`${r}/${s}`:null,sources:su(t,o),custom:t==="snippet"&&(o==null?void 0:o.custom)===!0}}function su(e,t){return t?(e==="extension"?[t.extensionURL]:e==="theme"?[t.cssURL,t.schemesURL,...Array.isArray(t.include)?t.include:[]]:[]).filter(o=>typeof o=="string"&&o!==""):[]}function tn(e){return typeof e=="string"&&e.trim()?e.trim():null}function cu(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function Tr(e){let t=e;if(typeof e=="string")try{t=JSON.parse(e)}catch(n){return null}return t&&typeof t=="object"&&!Array.isArray(t)?t:null}var rn="spicetify-marketplace";var Ct="settings";async function Nr(){let e=await Mr();if(e.kind!=="ok")return null;try{let t=await Br(e.db,"readonly",o=>o.getAll());if(!t)return null;let n={};for(let o of t)typeof(o==null?void 0:o.key)=="string"&&typeof o.value=="string"&&(n[o.key]=o.value);return n}finally{e.db.close()}}async function _r(e,t=[]){let n=await Mr();if(n.kind==="unavailable")return"unavailable";let o=n.kind==="ok"?n.db:await lu();if(!o)return"failed";try{return await Br(o,"readwrite",r=>{let s;for(let[c,l]of Object.entries(e))s=r.put({key:c,value:l});for(let c of t)s=r.delete(c);return s})===null?"failed":"written"}finally{o.close()}}function Ar(){var e;try{return(e=window.indexedDB)!=null?e:null}catch(t){return null}}async function Mr(){let e=Ar();return e?await uu(e)?{kind:"missing"}:new Promise(t=>{let n=!1,o=e.open(rn);o.onupgradeneeded=()=>{n=!0},o.onerror=()=>{console.warn("Syncify could not open Marketplace storage",o.error),t({kind:"unavailable"})},o.onblocked=()=>t({kind:"unavailable"}),o.onsuccess=()=>{let i=o.result;if(n){i.close(),du(e).then(()=>t({kind:"missing"}));return}if(!i.objectStoreNames.contains(Ct)){i.close(),t({kind:"unavailable"});return}t({kind:"ok",db:i})}}):{kind:"unavailable"}}function lu(){let e=Ar();return e?new Promise(t=>{let n=e.open(rn,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains(Ct)||o.createObjectStore(Ct,{keyPath:"key"})},n.onerror=()=>{console.warn("Syncify could not create Marketplace storage",n.error),t(null)},n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}async function uu(e){if(typeof e.databases!="function")return!1;try{return!(await e.databases()).some(n=>n.name===rn)}catch(t){return!1}}function du(e){return new Promise(t=>{let n=e.deleteDatabase(rn);n.onsuccess=()=>t(),n.onerror=()=>t(),n.onblocked=()=>t()})}function Br(e,t,n){return new Promise(o=>{let i;try{i=e.transaction(Ct,t)}catch(u){console.warn("Syncify could not open a Marketplace transaction",u),o(null);return}let r,s=!1,c=u=>{s||(s=!0,o(u))};i.oncomplete=()=>c(r),i.onerror=()=>{console.warn("Syncify Marketplace transaction failed",i.error),c(null)},i.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",i.error),c(null)};let l;try{l=n(i.objectStore(Ct))}catch(u){console.warn("Syncify Marketplace request could not be issued",u),c(null);return}l&&(l.onsuccess=()=>{r=l.result},l.onerror=()=>{console.warn("Syncify Marketplace request failed",l.error),c(null)})})}var Zn="marketplace:",sn=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function de(){let e=vu(),t=await Nr();if(t)for(let[n,o]of Object.entries(t))n.startsWith(Zn)&&(e[n]=o);return e}var yu=new Set(["marketplace:active-tab","marketplace:sort"]),Qn="marketplace:installed:",an="marketplace:theme-installed",pu=["stars","tags","lastUpdated","created"],mu=750*1024;async function cn(e,t){let n={};for(let[o,i]of Object.entries(e))yu.has(o)||(n[o]=o.startsWith(Qn)?gu(i):i);return t&&(n.spicetify_config=_e(t)),Zt(Ne(n))}function gu(e){try{let t=JSON.parse(e);if(!t||typeof t!="object"||Array.isArray(t))return e;for(let n of pu)delete t[n];return t}catch(t){return e}}async function ln(){let e=await de(),t=Jn(e);return{keyCount:Object.keys(e).length,hash:await cn(e,t),installedItemCount:ku(e),installedItems:un(e),items:J(e),spicetifyConfig:t,marketplaceAvailable:wu(e),activeTheme:It(e[an])}}function It(e){if(!e)return null;if(e.startsWith(Qn))return e;try{let t=JSON.parse(e);return typeof t=="string"?t:null}catch(t){return null}}async function Lr(){let[e,t]=await Promise.all([de(),hu()]),n=Jn(e),o=m({schema_version:3,metadata:{last_sync_datetime:new Date().toISOString(),device_info:dr(),marketplace_key_count:Object.keys(e).length},payload_hash:await cn(e,n),marketplace_data:{keys:e}},n?{spicetify_config:n}:{});if(Object.keys(t).length===0)return o;let i=new TextEncoder().encode(JSON.stringify(o)).byteLength,r=br(t,i,mu);return Object.keys(r).length>0?w(m({},o),{extension_settings:r}):o}async function hu(){try{let e=await Xe();return e?(await Gn(e)).settings:{}}catch(e){return{}}}async function Dr(e,t=[]){var r,s;let n={},o=(s=(r=e.marketplace_data)==null?void 0:r.keys)!=null?s:{};for(let[c,l]of Object.entries(o))c.startsWith(Zn)&&(n[c]=l);if(Object.keys(n).length===0)return 0;await Su(n),t.length>0&&await bu(n,t);let i=to(await de(),n);return await eo(n,i),Object.keys(n).length}async function eo(e,t=[]){for(let[o,i]of Object.entries(e))window.localStorage.setItem(o,i);for(let o of t)window.localStorage.removeItem(o);if(await _r(e,t)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try again.")}function to(e,t){let n=new Set(sn.flatMap(s=>{var c;return dn((c=t[s])!=null?c:e[s]).map(String)})),o=un(e).filter(s=>s.startsWith(Qn)&&!n.has(s)),i=o.filter(s=>e[s]!==void 0&&t[s]===void 0),r=e[an];return r&&t[an]===void 0&&o.some(s=>r.includes(s))&&i.push(an),i}async function Su(e){let t=await de(),n=J(e),o=J(t).filter(s=>xt(s,n));if(o.length===0)return;let i="marketplace:installed-extensions",r=dn(e[i]).map(String);for(let s of o)r.includes(s.key)||r.push(s.key),e[s.key]=t[s.key];e[i]=JSON.stringify(r)}async function bu(e,t){let n=await de(),o=un(n);for(let i of sn){if(e[i]===void 0)continue;let r=dn(e[i]).map(String).filter(s=>!t.includes(s)||o.includes(s));e[i]=JSON.stringify(r)}for(let i of t)n[i]!==void 0?e[i]=n[i]:delete e[i]}function ku(e){return un(e).length}function un(e){return sn.flatMap(t=>dn(e[t]).map(String))}function wu(e){return!!(window.Marketplace||sn.some(n=>e[n]!==void 0)||e["marketplace:tabs"]!==void 0)}function Or(e,t){return t===0?!1:e===0?!0:e<Math.max(2,Math.floor(t*.5))}function vu(){let e={};for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);if(!(n!=null&&n.startsWith(Zn)))continue;let o=window.localStorage.getItem(n);o!==null&&(e[n]=o)}return e}function dn(e){if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch(t){return[]}}var xu="raw.githubusercontent.com",Cu="cdn.jsdelivr.net",Ur=".github.io";function oo(e){var n;if(e.protocol!=="https:")return null;let t=e.pathname.split("/").filter(Boolean);if(e.host===xu)return no(t[0],t[1]);if(e.host===Cu)return t[0]==="gh"?no(t[1],(n=t[2])==null?void 0:n.split("@")[0]):null;if(e.host.endsWith(Ur)){let o=e.host.slice(0,-Ur.length);return o.includes(".")?null:no(o,t.length>1?t[0]:e.host)}return null}function no(e,t){return e&&t?`${e}/${t}`:null}var Iu={extension:"spicetify-extensions",theme:"spicetify-themes"},Ru="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",Eu="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",Pu="https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/",Tu="https://api.github.com/repos",Nu=5e3,_u=20,$r="syncify:repo-topics",Kr=10080*60*1e3,Au=200;function Qe(e){return(e==null?void 0:e.kind)==="host"||(e==null?void 0:e.kind)==="repo"||(e==null?void 0:e.kind)==="blocked"||(e==null?void 0:e.kind)==="catalog"}function et(e){let t=new Map;for(let n of e){if(n.change==="removed")continue;if(n.custom){t.set(n.key,{kind:"custom"});continue}let o=Mu(n);o&&t.set(n.key,o)}return t}async function tt(e,t){let n=new Map,o=e.filter(s=>s.change!=="removed"&&s.isNew&&!t.has(s.key));if(o.length===0)return n;let i=o.filter(s=>s.type==="snippet"),r=o.filter(s=>s.type!=="snippet");if(i.length>0){let s=await io();for(let c of i)s?fn(s,c.name)||n.set(c.key,{kind:"catalog"}):n.set(c.key,{kind:"unchecked"})}if(r.length>0){let s=await Du(),c=$u(),l=0;await Promise.all(r.map(async u=>{let d=Bu(u),f=Iu[u.type];if(!d||!f)return;if(s===null){n.set(u.key,{kind:"unchecked"});return}if(Lu(d,s)){n.set(u.key,{kind:"blocked"});return}let y=Uu(c,d);y===void 0&&l<_u&&(l+=1,y=await Ou(d),y!==void 0&&(c[d.toLowerCase()]={topics:y,at:Date.now()})),y===void 0?n.set(u.key,{kind:"unchecked"}):(y===null||!y.includes(f))&&n.set(u.key,{kind:"catalog"})})),Ku(c)}return n}function Mu(e){let t=null;for(let n of e.sources){let o;try{o=new URL(n)}catch(r){return{kind:"host",host:n.slice(0,40)}}let i=oo(o);if(!i)return{kind:"host",host:o.host};e.repo&&i.toLowerCase()!==e.repo.toLowerCase()&&(t!=null||(t=i))}return t?{kind:"repo",repo:t}:null}function Bu(e){for(let t of e.sources)try{let n=oo(new URL(t));if(n)return n}catch(n){}return e.repo}function Lu(e,t){let n=`https://github.com/${e}`.toLowerCase();return t.some(o=>{let i=o.toLowerCase();if(!i.includes("*"))return i===n;let r=i.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${r}$`).test(n)})}function Hr(e){return e.replace(/\n/g,"").trim().toLowerCase()}function fn(e,t){return e.get(Hr(t))}var Rt=null,Et=null;function Du(){return Rt!=null||(Rt=Fr(Ru).then(e=>{let t=e==null?void 0:e.repos;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&!n.startsWith("//")):(Rt=null,null)})),Rt}function io(){return Et!=null||(Et=Fr(Eu).then(e=>{if(!Array.isArray(e))return Et=null,null;let t=new Map;for(let n of e){if(typeof(n==null?void 0:n.title)!="string"||typeof n.code!="string")continue;let o=typeof n.preview=="string"?n.preview:null;t.set(Hr(n.title),m({title:n.title,code:n.code,description:typeof n.description=="string"?n.description:""},o?{imageURL:o.startsWith("http")?o:`${Pu}${o}`}:{}))}return t})),Et}async function Ou(e){let t=await zr(`${Tu}/${e}`);if((t==null?void 0:t.status)===404)return null;if(!(t!=null&&t.ok))return;let n=await t.json().catch(()=>null);return Array.isArray(n==null?void 0:n.topics)?n.topics.filter(o=>typeof o=="string"):void 0}async function Fr(e){let t=await zr(e);return t!=null&&t.ok?t.json().catch(()=>null):null}async function zr(e){let t=typeof AbortController=="function"?new AbortController:null,n=setTimeout(()=>t==null?void 0:t.abort(),Nu);try{return await fetch(e,{signal:t==null?void 0:t.signal})}catch(o){return null}finally{clearTimeout(n)}}function Uu(e,t){let n=e[t.toLowerCase()];return n&&Date.now()-n.at<Kr?n.topics:void 0}function $u(){var e;try{let t=JSON.parse((e=localStorage.getItem($r))!=null?e:"{}");return t&&typeof t=="object"?t:{}}catch(t){return{}}}function Ku(e){let t=Date.now(),n=Object.entries(e).filter(([,o])=>t-o.at<Kr).sort(([,o],[,i])=>i.at-o.at).slice(0,Au);try{localStorage.setItem($r,JSON.stringify(Object.fromEntries(n)))}catch(o){}}var Hu=/^[0-9A-HJKMNP-TV-Z]{6}$/,Fu=6,zu="SYN-",qr=60,ro=20,Gr=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],Oe="marketplace:theme-installed",Wr="marketplace",jr={added:0,removed:1,unchanged:2},Wu=new RegExp(`^[a-z0-9][a-z0-9_-]{1,${ro-2}}[a-z0-9]$`);function ao(e){let t=e.trim().replace(/^@/,"").toLowerCase();return/[^a-z0-9_-]/.test(t)?"Only letters, digits, _ and -":t.length<3?"At least 3 characters":!/^[a-z0-9]/.test(t)||!/[a-z0-9]$/.test(t)?"Start and end with a letter or digit":null}function me(e){return`${zu}${e}`}function Vr(e){let t=e.trim();if(t.length>200)return null;if(t.includes("/")){let o=t.split(/[?#]/)[0].replace(/\/+$/,"");t=o.slice(o.lastIndexOf("/")+1).replace(/\.json$/i,"")}t=t.toUpperCase().replace(/[\s-]/g,""),t.length===Fu+3&&t.startsWith("SYN")&&(t=t.slice(3));let n=t.replace(/O/g,"0").replace(/[IL]/g,"1");return Hu.test(n)?n:null}function Jr(e){let t=e;return!t||typeof t.code!="string"||!t.keys||typeof t.keys!="object"||!Object.values(t.keys).every(n=>typeof n=="string")?null:{code:t.code,name:typeof t.name=="string"&&t.name?t.name:null,creator:typeof t.creator=="string"&&Wu.test(t.creator)?t.creator:null,updated_at:typeof t.updated_at=="number"?t.updated_at:0,keys:t.keys}}async function Xr(e,t){let n=e.filter(s=>!nn(s)).map(s=>w(m({},s),{change:"added",isNew:!0})),o=et(n);for(let s of n)!o.has(s.key)&&!ju(s,t[s.key])&&o.set(s.key,{kind:"catalog"});let i=await tt(n,o),r=new Map;for(let[s,c]of[...i,...o])c.kind!=="unchecked"&&r.set(s,c);return{items:n,leftOut:r}}function ju(e,t){if(e.type==="snippet")return!0;if(!e.repo)return!1;let n=Gu(t);return e.type==="extension"?typeof(n==null?void 0:n.extensionURL)=="string"&&n.extensionURL!=="":typeof(n==null?void 0:n.cssURL)=="string"&&n.cssURL!==""}function Zr(e,t){let n={};for(let[i,r]of Gr){let s=t.filter(c=>c.type===r&&e[c.key]!==void 0).map(c=>c.key);n[i]=JSON.stringify(s);for(let c of s)n[c]=e[c]}let o=It(e[Oe]);return o&&t.some(i=>i.key===o)&&(n[Oe]=e[Oe]),n}function Qr(e,t,n,o,i,r){let s=r==="replace"?on(t,void 0,n,o):Yu(t,n),c=It(e.keys[Oe]),l=c!==null&&t.some(d=>d.key===c)&&o!==null&&o.current_theme!==Wr,u=c!==null&&c!==i?t.find(d=>d.key===c):void 0;return m(w(m({},s),{manual:l?[{type:"theme",name:Wr}]:[]}),u?{theme:{key:u.key,name:u.name}}:{})}function Yu(e,t){let n=new Set(t.map(s=>s.key)),o=new Set(e.map(s=>s.key)),i=[...e.map(s=>n.has(s.key)?w(m({},s),{change:"unchanged",isNew:!1}):w(m({},s),{change:"added",isNew:!0})),...t.filter(s=>!o.has(s.key)).map(s=>w(m({},s),{change:"unchanged",isNew:!1}))].sort((s,c)=>jr[s.change]-jr[c.change]||s.name.localeCompare(c.name)),r={added:0,removed:0,unchanged:0};for(let s of i)r[s.change]+=1;return{items:i,counts:r,manual:[]}}function ea(e,t){return new Set(e.items.filter(n=>n.type==="snippet"&&n.change==="added"&&(!t||!fn(t,n.name))).map(n=>n.key))}async function ta(e,t,n,o){let i=await de(),r=J(i),s=J(e.keys),c={};for(let[f,y]of Gr){let h=Yr(i[f]),R=[...t==="add"?h:h.filter(v=>n.includes(v)||r.some(S=>S.key===v&&xt(S,s)))];for(let v of s){if(v.type!==y||n.includes(v.key))continue;let S=h.includes(v.key);if(t==="add"&&S)continue;let P=y==="snippet"?qu(v,o,i[v.key]):e.keys[v.key];P!==void 0&&(c[v.key]=P,R.includes(v.key)||R.push(v.key))}c[f]=JSON.stringify(R)}let l=It(e.keys[Oe]),u=Yr(c["marketplace:installed-themes"]);l&&u.includes(l)&&!n.includes(l)&&(c[Oe]=e.keys[Oe]);let d=to(i,c);return await eo(c,d),Object.keys(c).length+d.length}function qu(e,t,n){let o=t?fn(t,e.name):void 0;return o?JSON.stringify(m({code:o.code,title:o.title,description:o.description},o.imageURL?{imageURL:o.imageURL}:{})):n}function Yr(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function Gu(e){try{let t=e?JSON.parse(e):null;return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch(t){return null}}var Pt="/api/shares",Vu=`${Pt}/update`,Ju=`${Pt}/delete`,Xu=`${Pt}/import`,Zu="x-syncify-user-hash",Qu="discover/presets.json",ed={no_code:"This code doesn't exist.",too_many_codes:"You can't make more share codes. Delete one to make another.",daily_limit:"Too many changes to share codes today. Try again tomorrow.",too_large:"This setup is too big to share.",invalid_name:"Names can be up to 60 characters.",empty:"There's nothing to share yet. Install something from Marketplace first.",invalid_items:"Syncify couldn't read some items. Reload Spotify and try again.",source:"Some items don't load from GitHub. Reload Spotify and try again.",blocked:"Some items are on Marketplace's block list. Reload Spotify and try again.",custom_snippet:"Custom snippets can't be shared. Reload Spotify and try again.",unchecked:"Couldn't check Marketplace's block list. Try again in a minute.",publish_failed:"Couldn't publish the code. Press Update on it to try again.",delete_failed:"Couldn't delete the code. Try again.",same_setup:"You already shared this setup.",invalid_handle:"Handles are 3 to 20 letters, digits, _ or -, starting and ending with a letter or digit.",reserved_handle:"That handle isn't allowed. Pick another.",handle_taken:"That handle is taken. Pick another.",unavailable:"Share codes aren't available yet."},td=new Set(["offline","signed_out","invalid_signature","stale_salt","no_device_key","too_many_requests"]);function Tt(e,t=null){var n;return e instanceof A&&td.has(e.code)?Pe(e):e instanceof A&&e.code==="too_many_codes"&&t!==null?`You have ${t} share codes already. Delete one to make another.`:(n=e instanceof A?ed[e.code]:void 0)!=null?n:"Something went wrong. Try again."}async function yn(){var t;let e=await bt(Pt,"GET");return{codes:Array.isArray(e==null?void 0:e.codes)?e.codes.flatMap(n=>{let o=nd(n);return o?[o]:[]}):[],newHearts:typeof(e==null?void 0:e.new_hearts)=="number"?e.new_hearts:0,max:typeof(e==null?void 0:e.max)=="number"?e.max:null,profile:typeof((t=e==null?void 0:e.profile)==null?void 0:t.handle)=="string"?{handle:e.profile.handle,link:typeof e.profile.link=="string"?e.profile.link:null}:null,suggestedHandle:typeof(e==null?void 0:e.suggested_handle)=="string"?e.suggested_handle:null}}async function na(e,t,n){return la(await bt(Pt,"POST",m({name:e,keys:t},n===void 0?{}:{handle:n})))}function oa(e){return`${U().shareUrl.replace(/\/+$/,"")}/@${e}`}async function ia(e,t,n){return la(await bt(Vu,"POST",{code:e,name:t,keys:n}))}async function ra(e){try{await bt(Ju,"POST",{code:e})}catch(t){if(t instanceof A&&t.code==="no_code")return;throw t}}async function aa(e){let t=U().shareUrl.replace(/\/+$/,""),n;try{n=await fetch(`${t}/${e}.json`)}catch(i){throw new A("offline")}if(n.status===404||n.status===403)throw new A("no_code");if(!n.ok)throw new A("failed");let o=Jr(await n.json().catch(()=>null));if(!o||o.code!==e)throw new A("no_code");return o}async function sa(){let e=U().shareUrl.replace(/\/+$/,"");try{let t=await fetch(`${e}/${Qu}`);if(!t.ok)return null;let n=await t.json();return Array.isArray(n.posts)?n.posts.flatMap(o=>{let i=id(o);return i?[i]:[]}):null}catch(t){return null}}async function ca(e,t,n=!1){try{await ir(Xu,m({code:e},n?{source:"preset"}:{}),{[Zu]:t.hash})}catch(o){}}function nd(e){let t=e;return!t||typeof t.code!="string"?null:{code:t.code,name:typeof t.name=="string"&&t.name?t.name:null,link:typeof t.link=="string"?t.link:null,item_count:typeof t.item_count=="number"?t.item_count:0,imports:typeof t.imports=="number"?t.imports:0,created_at:typeof t.created_at=="number"?t.created_at:0,updated_at:typeof t.updated_at=="number"?t.updated_at:0,posted:od(e.post)}}function od(e){let t=e==null?void 0:e.status;return typeof t=="string"&&t!=="removed"}function id(e){let t=e,n=o=>Number.isSafeInteger(o)&&o>=0?o:0;return!t||typeof t.code!="string"?null:{code:t.code,name:typeof t.name=="string"?t.name:me(t.code),extensions:n(t.extensions),themes:n(t.themes),snippets:n(t.snippets)}}function la(e){let t=e;if(typeof(t==null?void 0:t.code)!="string")throw new A("failed");return{code:t.code,link:typeof t.link=="string"?t.link:null,leftOut:Array.isArray(t.left_out)?t.left_out.length:0}}var ua="/claims",rd="/claims/cancel",ad={no_backup:"Back up first, then secure your backup.",unsupported_identity:"This Spotify account can't be secured.",too_many_accounts:"Your account already has 10 Spotify accounts linked.",undone:"This backup can't be secured with your account.",offline:"Couldn't reach Syncify. Check your connection and try again."},Ae=class extends Error{constructor(n){var o;super((o=ad[n])!=null?o:"Couldn't secure your backup. Try again.");this.code=n;this.name="ClaimError"}};async function da(e,t){let n=await so(e,t,"GET",ua);if(!n.ok)throw new Ae(await co(n));let o=await n.json().catch(()=>null);return{claim:vt(o==null?void 0:o.claim),accounts:Array.isArray(o==null?void 0:o.accounts)?o.accounts.filter(sd):null}}async function fa(e,t){let n=await so(e,t,"POST",ua);if(!n.ok)throw new Ae(await co(n));let o=await n.json().catch(()=>null);return vt(o==null?void 0:o.claim)}async function ya(e,t){let n=await so(e,t,"POST",rd);if(n.status===404)return"cancelled";if(!n.ok)throw new Ae(await co(n));let o=await n.json().catch(()=>null);return(o==null?void 0:o.held)===!0?"checking":"cancelled"}async function so(e,t,n,o){try{return await Te(e,t,{method:n},o)}catch(i){throw i instanceof TypeError?new Ae("offline"):i}}async function co(e){let t=await e.json().catch(()=>null);return typeof(t==null?void 0:t.code)=="string"?t.code:"failed"}function sd(e){let t=e;return!!(t&&typeof t.hash=="string"&&(t.status==="pending"||t.status==="final"||t.status==="cancelled"||t.status==="unlinked"))}var pa="[Syncify]";function ee(e,...t){console.debug(pa,e,...t)}function oe(e,...t){console.warn(pa,e,...t)}var ot={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},cd=/^([a-z0-9]|f([1-9]|1[0-2]))$/,ld=250,ud=40,lo=null,pn=null,nt=null;function ma(){return/mac/i.test(navigator.platform||navigator.userAgent)}function ga(e){if(e===null)return null;if(!e||typeof e!="object")return ot;let t=e;return typeof t.key!="string"||!cd.test(t.key)?ot:{key:t.key,ctrl:!!t.ctrl,alt:!!t.alt,shift:!!t.shift,meta:!!t.meta}}function Nt(e){if(!e)return"Off";let t=e.key.toUpperCase();return ma()?[e.ctrl?"\u2318":"",e.alt?"\u2325":"",e.shift?"\u21E7":"",t].join(""):[e.ctrl&&"Ctrl",e.meta&&"Win",e.alt&&"Alt",e.shift&&"Shift",t].filter(Boolean).join("+")}function ha(e){if(e.key==="Escape")return{kind:"cancel"};let t=dd(e.code);if(!t)return{kind:"ignore"};let n=ma();if(n&&e.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let o={key:t,ctrl:n?e.metaKey:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:n?!1:e.metaKey},i=t.startsWith("f")&&t.length>1;return!o.ctrl&&!o.alt&&!o.meta&&!i?{kind:"error",message:`Include ${n?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:o}}function dd(e){var n,o;let t=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(e);return t?((o=(n=t[1])!=null?n:t[2])!=null?o:t[3]).toLowerCase():null}function Sa(e){var t;if(nt&&fd(nt,e))return!1;try{let n=Spicetify.Mousetrap,o=(t=n.trigger)==null?void 0:t.call(n)._directMap;if(!o)return!1;let i=uo(e);return Object.keys(o).some(r=>r.startsWith(`${i}:`))}catch(n){return!1}}function fo(e,t,n=0){if(lo=t,pn=e,!ba()){if(n>=ud){oe("Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>fo(pn,t,n+1),ld);return}yo(pn)}function yo(e){if(pn=e,!ba()||!lo)return;let t=lo;try{if(nt&&Spicetify.Keyboard._deregisterShortcut(nt),nt=null,!e)return;Spicetify.Keyboard.registerShortcut(e,n=>{n.preventDefault(),t()}),nt=e,ee("Keyboard shortcut registered",Nt(e))}catch(n){oe("Failed to register keyboard shortcut",n)}}function ba(){var e;return typeof((e=Spicetify.Keyboard)==null?void 0:e.registerShortcut)=="function"}function uo(e){return[e.ctrl&&"mod",e.meta&&"meta",e.alt&&"alt",e.shift&&"shift",e.key].filter(Boolean).join("+")}function fd(e,t){return uo(e)===uo(t)}var po="both",yd=["both","topbar","menu"],_t=null,At=null,mn=!1;function ka(e){return yd.includes(e)?e:po}function gn(){var e;return typeof((e=Spicetify.Menu)==null?void 0:e.Item)=="function"}function wa(e){_t=e.topbarButton,At=e.menuItem}function hn(e){let t=e!=="menu"||!At,n=e!=="topbar";if(_t!=null&&_t.element&&(_t.element.style.display=t?"":"none"),!!At)try{n&&!mn?(At.register(),mn=!0):!n&&mn&&(At.deregister(),mn=!1)}catch(o){oe("Failed to update profile menu item",o)}}var Sn="syncify:config",it={workerUrl:U().workerUrl,autoBackupEnabled:!1,shortcut:ot,entryPoint:po,settingsSyncEnabled:!0,shareRestoredSettings:!0};function ge(){var n,o;let e=U(),t=(o=(n=Spicetify.LocalStorage)==null?void 0:n.get(Sn))!=null?o:window.localStorage.getItem(Sn);if(!t)return w(m({},it),{workerUrl:e.workerUrl});try{let i=JSON.parse(t);return{workerUrl:e.workerUrl,autoBackupEnabled:mo(i.autoBackupEnabled,it.autoBackupEnabled),shortcut:i.shortcut===void 0?it.shortcut:ga(i.shortcut),entryPoint:ka(i.entryPoint),settingsSyncEnabled:mo(i.settingsSyncEnabled,it.settingsSyncEnabled),shareRestoredSettings:mo(i.shareRestoredSettings,it.shareRestoredSettings)}}catch(i){return w(m({},it),{workerUrl:e.workerUrl})}}function bn(e){var n;let t=JSON.stringify({workerUrl:U().workerUrl,autoBackupEnabled:e.autoBackupEnabled,shortcut:e.shortcut,entryPoint:e.entryPoint,settingsSyncEnabled:e.settingsSyncEnabled,shareRestoredSettings:e.shareRestoredSettings});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set(Sn,t);return}window.localStorage.setItem(Sn,t)}function mo(e,t){return e===void 0?t:!!e}function Mt(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}var pd=["username","canonicalUsername","id","uri","displayName"];async function he(){let{value:e,field:t}=await md();return{hash:await Zt(e),field:t}}async function md(){var i;let e=(i=Spicetify.Platform)==null?void 0:i.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let t=await e.getUser(),n=pd.find(r=>(t==null?void 0:t[r])!=null),o=n?t[n]:void 0;if(!n||!o)throw new Error("Unable to resolve the active Spotify user.");return{value:o,field:n}}async function Lt(e){if(!Mt(e))throw new Error("Syncify backup service is not configured.");let[t,n]=await Promise.all([he(),Lr()]);if(n.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:o,unapproved:i}=await sr(e.workerUrl,t,n);return{payload:n,unchanged:o,unapproved:i}}async function Ue(e,t){var c;if(!Mt(e))throw new Error("Syncify backup service is not configured.");let n=await Wn(e.workerUrl,await he(),t),[o,i,r]=await Promise.all([Promise.all(n.backups.map(ho)),n.safetyCopy?ho(n.safetyCopy):null,Promise.all(n.unapproved.map(ho))]),s=o.filter((l,u)=>o.findIndex(d=>d.payload_hash===l.payload_hash)===u);return w(m({},n),{payload:(c=s[0])!=null?c:null,backups:s,safetyCopy:i&&!s.some(l=>l.payload_hash===i.payload_hash)?i:null,unapproved:r.filter(l=>!s.some(u=>u.payload_hash===l.payload_hash))})}var go=new Map;async function ho(e){var r,s,c;let t=(s=(r=e.marketplace_data)==null?void 0:r.keys)!=null?s:{},n=e.spicetify_config?Xn(e.spicetify_config,t):void 0,o=`${e.payload_hash} ${(c=e.metadata)==null?void 0:c.last_sync_datetime}`,i=go.get(o);return i||(i=cn(t,n),go.set(o,i),i.catch(()=>go.delete(o))),w(m(m({},e),n?{spicetify_config:n}:{}),{payload_hash:await i})}async function va(e){let t=await Wn(Dt(e),await he());return{claim:t.claim,install:t.install,nudge:t.nudge}}async function xa(e,t,n,o=[],i={ids:[],share:!1}){var l;let r=t!=null?t:(await Ue(e)).payload;if(!r)throw new Error("No Syncify cloud backup was found for this Spotify account.");await gd(r,i);let s=await Dr(r,o),c=(l=r.backup)==null?void 0:l.id;return c&&Mt(e)&&he().then(u=>lr(e.workerUrl,u,c,n)).catch(()=>{}),{payload:r,restoredCount:s}}async function gd(e,t){if(t.ids.length===0||!e.extension_settings)return;let n=await Xe();n&&(await hr(n,e.extension_settings,t.ids),await gr(m({at:Date.now()},t)))}var Bt=class extends Error{constructor(n){super("Couldn't back up your setup first, so nothing changed.");this.reason=n;this.name="SafetyBackupError"}};async function Ca(e,t,n,o,i,r=!1){try{await Lt(e)}catch(c){throw new Bt(c)}let s=await ta(t,n,o,i);return he().then(c=>ca(t.code,c,r)).catch(()=>{}),s}async function Ia(e){let t=await he(),n=await da(Dt(e),t);return w(m({},n),{hash:t.hash})}async function Ra(e){await fa(Dt(e),await he())}async function kn(e,t,n){await cr(Dt(e),await he(),t,n)}async function wn(e){return ya(Dt(e),await he())}function Dt(e){if(!Mt(e))throw new Error("Syncify backup service is not configured.");return e.workerUrl}var Ea="syncify:nudge-hidden-until",Pa="syncify:nudge-panel-shown";function Ta(e=Date.now()){let t=Number(Ma(Ea));return Number.isFinite(t)&&t>e}function Na(e=Date.now()){Ba(Ea,String(e+30*864e5))}function _a(){return Ma(Pa)!==null}function Aa(){Ba(Pa,"1")}function Ma(e){var t,n;return(n=(t=Spicetify.LocalStorage)==null?void 0:t.get(e))!=null?n:window.localStorage.getItem(e)}function Ba(e,t){var n;(n=Spicetify.LocalStorage)!=null&&n.set?Spicetify.LocalStorage.set(e,t):window.localStorage.setItem(e,t)}var So="syncify:claim-check-day",La="syncify:undone-claim-shown";async function Da(e){var n,o;let t=ge();if(t.workerUrl){if(!t.autoBackupEnabled)return hd(e);try{let[i,r]=await Promise.all([ln(),Ue(t)]);Oa(r,e);let s=(o=(n=r.payload)==null?void 0:n.metadata.marketplace_key_count)!=null?o:0;if(r.exists&&Or(i.keyCount,s)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(r.backups.some(l=>l.payload_hash===i.hash)||i.keyCount===0)return;let{unapproved:c}=await Lt(t);Spicetify.showNotification(c?"Syncify: backed up, waiting for approval":"Syncify auto-backup complete")}catch(i){if(i instanceof re||i instanceof De){Spicetify.showNotification("Syncify: sign in to keep backing up",!0,8e3);return}let r=i instanceof Error?i.message:String(i);console.warn("Syncify startup sync failed:",i),Spicetify.showNotification(`Syncify auto-sync skipped: ${r}`,!0,8e3)}}}async function hd(e){let t=new Date().toLocaleDateString("en-CA");if(Ua(So)!==t)try{let n=await va(ge());bo(So,t),Oa(n,e)}catch(n){if(n instanceof re){bo(So,t);return}console.warn("Syncify claim check failed:",n)}}function Oa(e,t){var r;let n=Sd(e.claim),o=bd(e.claim),i=(r=e.install)==null?void 0:r.waiting[0];n?t.onClaim(n):o?t.onUndone(o)&&bo(La,String(o.undone_at)):i?t.onInstall(i):e.nudge&&!_a()&&t.onNudge()}function Sd(e){return(e==null?void 0:e.status)==="pending"&&!e.mine&&!e.not_me?e:null}function bd(e){return(e==null?void 0:e.status)==="undone"&&Ua(La)!==String(e.undone_at)?e:null}function Ua(e){var t,n;return(n=(t=Spicetify.LocalStorage)==null?void 0:t.get(e))!=null?n:window.localStorage.getItem(e)}function bo(e,t){var n;(n=Spicetify.LocalStorage)!=null&&n.set?Spicetify.LocalStorage.set(e,t):window.localStorage.setItem(e,t)}var wo="syncify:pending-restore",kd=600*1e3,wd=2e3,vd=15e3,xd="marketplace:theme-installed",Cd="raw.githubusercontent.com",Id=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],Se=null,ko=new Set,Ha=new Map;function Fa(){return Se}function za(e){return ko.add(e),()=>ko.delete(e)}function Wa(){Se&&Va(w(m({},Se),{manual:[]}))}function Ut(e,t="restore"){try{localStorage.setItem(wo,JSON.stringify({at:Date.now(),manual:e,kind:t}))}catch(n){}}function ja(){var e;Ut((e=Se==null?void 0:Se.manual)!=null?e:[],Se==null?void 0:Se.kind),window.location.reload()}function Ya(){Ja()&&(document.addEventListener("load",e=>$a(e.target,"load"),!0),document.addEventListener("error",e=>$a(e.target,"error"),!0))}async function qa(){let e=Ja();if(!e)return;try{localStorage.removeItem(wo)}catch(s){}let t=Date.now(),n=await Ka();for(;n.loaded<n.total&&Date.now()-t<vd;)await new Promise(s=>setTimeout(s,wd)),n=await Ka();Va(w(m({kind:e.kind,at:Date.now()},n),{manual:e.manual}));let o=n.loaded===n.total&&e.manual.length===0,i=e.kind==="share"?"Setup applied":"Backup restored",r=e.kind==="share"?"loaded":"restored";Spicetify.showNotification(o?`Syncify: ${i}; ${n.total} ${n.total===1?"item":"items"}`:`Syncify: ${r} ${n.loaded} of ${n.total}. Open Syncify for details.`,!1,8e3)}function Ga(e){let t=e.map(n=>n.type==="extension"?`spicetify config extensions ${vn(n.name)}`:n.type==="custom_app"?`spicetify config custom_apps ${vn(n.name)}`:`spicetify config current_theme ${vn(n.name)}${n.scheme?` color_scheme ${vn(n.scheme)}`:""}`);return t.length>0?[...t,"spicetify apply"]:[]}function vn(e){return/^[\w.@+/-]+$/.test(e)?e:`"${e}"`}function Va(e){Se=e;for(let t of ko)t(e)}function Ja(){var e;try{let t=JSON.parse((e=localStorage.getItem(wo))!=null?e:"null");return!t||Date.now()-t.at>kd?null:{manual:Array.isArray(t.manual)?t.manual:[],kind:t.kind==="share"?"share":"restore"}}catch(t){return null}}function $a(e,t){e instanceof HTMLScriptElement&&e.src&&Ha.set(Ot(e.src),t)}async function Ka(){var o;let e=await de(),t=(o=e[xd])!=null?o:"",n=J(e).filter(i=>i.type==="extension"&&i.sources.length>0||i.type==="theme"&&t.includes(i.key)||i.type==="snippet");return{loaded:n.filter(Rd).length,total:n.length}}function Rd(e){var t,n;if(e.type==="snippet"){let o=document.querySelector("style.marketplaceSnippets");return((t=o==null?void 0:o.textContent)==null?void 0:t.includes(`/* ${e.name} - `))===!0}if(e.type==="theme"){let o=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((n=o==null?void 0:o.textContent)!=null&&n.trim())}return Ed(e.sources[0]).some(Pd)}function Ed(e){let t;try{t=new URL(e)}catch(s){return[]}if(t.host!==Cd)return[Ot(t.href)];let[n,o,i,...r]=t.pathname.split("/").filter(Boolean);return!n||!o||!i||r.length===0?[]:Id.map(s=>Ot(`https://${s}/gh/${n}/${o}@${i}/${r.join("/")}`))}function Pd(e){let t=Ha.get(e);return t?t==="load":[...document.querySelectorAll("script[src]")].some(o=>Ot(o.src)===e)&&performance.getEntriesByType("resource").some(o=>Ot(o.name)===e)}function Ot(e){try{let t=new URL(e);return`${t.origin}${t.pathname}`}catch(t){return e}}var vo=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var Xa=".main-actionButtons",Nd=".Root__globalNav, .Root__top-bar",_d=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function Za(e){let t=new Spicetify.Topbar.Button(U().extensionName,vo,e,!1,!0);return Qa(t),Ad(t),t}function Qa(e){var t;e.element.style.setProperty("-webkit-app-region","no-drag"),(t=e.button)==null||t.style.setProperty("-webkit-app-region","no-drag")}function Ad(e){if(typeof MutationObserver=="undefined")return;let t=!1,n=null,o=()=>{t=!1,r();let s=e.element,c=document.querySelector(Xa);!s||!c||c.contains(s)||(c.prepend(s),Md(e),Qa(e),ee("Topbar button re-attached"))},i=new MutationObserver(()=>{t||(t=!0,setTimeout(o,250))}),r=()=>{var l;if(n!=null&&n.isConnected)return;let s=document.querySelector(Xa),c=(l=s==null?void 0:s.closest(Nd))!=null?l:s==null?void 0:s.parentElement;if(i.disconnect(),n=c!=null?c:null,!c){i.observe(document.body,{childList:!0,subtree:!0});return}i.observe(c,{childList:!0,subtree:!0});for(let u=c.parentElement;u;u=u.parentElement)i.observe(u,{childList:!0})};o()}function Md(e){let t=e.button;if(!t||t.className&&t.className!=="undefined")return;let n=Array.from(document.querySelectorAll(_d)).find(o=>!e.element.contains(o));n!=null&&n.className&&(t.className=n.className)}function es(e){if(!gn())return null;try{return new Spicetify.Menu.Item(U().extensionName,!1,e,Bd())}catch(t){return oe("Failed to create profile menu item",t),null}}function Bd(){return vo.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}var Ld="syncify:beta",ts=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function ns(){var e;return(e=window.SyncifyLoader)!=null?e:null}function Dd(){try{return window.localStorage.getItem(Ld)==="true"}catch(e){return!1}}async function os(e){let t=Dd()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(t.map(o=>Od(`${e}/${o}`)))).reduce((o,i)=>i&&(!o||Co(i,o)>0)?i:o,null)}function xo(e){return typeof e=="string"&&ts.test(e)}function Co(e,t){let[n,o]=[e,t].map(i=>{var u;let[,r,s,c,l]=(u=ts.exec(i))!=null?u:[];return[r,s,c,l!=null?l:1/0].map(Number)});for(let i=0;i<n.length;i+=1)if(n[i]!==o[i])return n[i]<o[i]?-1:1;return 0}async function Od(e,t=3e3){let n=typeof AbortController=="function"?new AbortController:null,o=setTimeout(()=>n==null?void 0:n.abort(),t);try{let i=await fetch(e,{signal:n==null?void 0:n.signal});if(!i.ok)return null;let r=await i.json();return xo(r==null?void 0:r.version)?r.version:null}catch(i){return null}finally{clearTimeout(o)}}function rt(...e){return e.filter(Boolean).join(" ")}function Io(e,t){return t===void 0?e:w(m({},e),{key:t})}function a(e,t,n){let r=t,{children:o}=r,i=ue(r,["children"]);return o===void 0?mt(e,Io(i,n)):mt(e,Io(i,n),o)}function p(e,t,n){let s=t,{children:o}=s,i=ue(s,["children"]),r=Array.isArray(o)?o:[o];return mt(e,Io(i,n),...r)}var Ud={primary:"regular",secondary:"regular",danger:"regular",text:"small",subtle:"small"};function x(e){let l=e,{variant:t="primary",size:n=Ud[t],type:o="button",icon:i,children:r,className:s}=l,c=ue(l,["variant","size","type","icon","children","className"]);return p("button",w(m({className:rt("syncify-btn",s),"data-variant":t,"data-size":n,type:o},c),{children:[i,a("span",{className:"syncify-cap",children:r})]}))}function Ro(e){return a("input",{className:"syncify-checkbox",type:"checkbox","aria-label":e.label,checked:e.checked,onChange:t=>e.onChange(t.currentTarget.checked),disabled:e.disabled})}function Eo(e){return p("label",{className:"syncify-checkbox-row","data-disabled":e.disabled?"true":void 0,children:[a("input",{className:"syncify-checkbox",type:"checkbox",checked:e.checked,onChange:t=>e.onChange(t.currentTarget.checked),disabled:e.disabled}),a("span",{className:"syncify-checkbox-label",children:e.label})]})}var $d=0;function Y(e){let[t]=g(()=>`syncify-${e}-${++$d}`);return t}function xn(e){return p("div",{className:"syncify-dialog-content",children:[a("h2",{className:"syncify-dialog-title",id:e.titleId,children:e.title}),e.children?a("div",{className:"syncify-dialog-text",children:e.children}):null,a("div",{className:"syncify-dialog-actions",children:e.actions})]})}function Po(e){let t=j(null),n=Y("dialog"),{open:o}=e,i=j(e.onClose);return gt(()=>{i.current=e.onClose}),_(()=>{let r=t.current;if(!r||!o)return;let s=document.activeElement;r.open||r.showModal();let c=l=>{l.preventDefault(),i.current()};return r.addEventListener("cancel",c),()=>{r.removeEventListener("cancel",c),r.open&&r.close(),s instanceof HTMLElement&&s.isConnected&&s.focus()}},[o]),o?a("dialog",{className:"syncify-dialog",ref:t,"aria-labelledby":n,children:a(xn,{title:e.title,actions:e.actions,titleId:n,children:e.children})}):null}function xe(e){var i,r;let t=Y("field"),n=`${t}-error`,o=!!e.error;return p("div",{className:"syncify-field-group",children:[a("label",{className:"syncify-field-label",htmlFor:t,children:e.label}),p("div",{className:"syncify-field-row",children:[p("span",{className:"syncify-input-box","data-invalid":o?"true":void 0,"data-disabled":e.disabled?"true":void 0,children:[e.prefix?a("span",{className:"syncify-input-prefix","aria-hidden":"true",children:e.prefix}):null,a("input",{className:"syncify-input-control",id:t,type:(i=e.type)!=null?i:"text",value:e.value,onChange:s=>e.onChange(s.currentTarget.value),onBlur:e.onBlur,placeholder:e.placeholder,inputMode:e.inputMode,autoComplete:(r=e.autoComplete)!=null?r:"off",spellCheck:!1,maxLength:e.maxLength,disabled:e.disabled,autoFocus:e.autoFocus,"aria-invalid":o||void 0,"aria-describedby":o?n:void 0,"data-mono":e.mono?"true":void 0})]}),e.action]}),o?a("span",{className:"syncify-field-error",id:n,role:"alert",children:e.error}):null]})}function at(e){let i=e,{children:t,className:n}=i,o=ue(i,["children","className"]);return a("svg",w(m({className:rt("syncify-icon",n),viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},o),{children:t}))}function is(e){return a(at,w(m({},e),{children:a("path",{d:"m9 6 6 6-6 6"})}))}function rs(e){return a(at,w(m({},e),{children:a("path",{d:"m6 9 6 6 6-6"})}))}function Ce(e){return a(at,w(m({},e),{children:a("path",{d:"M5 12.5l4.5 4.5L19 7.5"})}))}function To(e){return a(at,w(m({},e),{children:a("path",{d:"M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z"})}))}function as(e){return p(at,w(m({},e),{"data-filled":"true",children:[a("rect",{x:"4",y:"10.5",width:"3",height:"3",rx:"0.75"}),a("rect",{x:"10.5",y:"10.5",width:"3",height:"3",rx:"0.75"}),a("rect",{x:"17",y:"10.5",width:"3",height:"3",rx:"0.75"})]}))}function No(e){return p(at,w(m({},e),{children:[a("path",{d:"M12 6v7"}),a("path",{d:"M12 17.5v.5"})]}))}function _o(e){let i=e,{keys:t,recording:n}=i,o=ue(i,["keys","recording"]);return a("button",w(m({className:"syncify-keycap",type:"button","data-recording":n?"true":void 0},o),{children:a("span",{className:"syncify-cap",children:t})}))}function te(e){return a("ul",{className:"syncify-list","aria-label":e.label,children:e.children})}function $e(){return a("li",{className:"syncify-list-divider",role:"presentation"})}function V(e){let t=p(D,{children:[e.leading?a("span",{className:"syncify-row-leading",children:e.leading}):null,p("span",{className:"syncify-row-name",children:[a("span",{className:"syncify-row-name-text",children:e.name}),e.nameMark]}),e.meta?a("span",{className:"syncify-row-meta",children:e.meta}):null,e.end?a("span",{className:"syncify-row-end",children:e.end}):null]}),n=e.meta?"2":"1";return a("li",{className:"syncify-list-item",children:e.onOpen?p("button",{className:"syncify-row",id:e.id,"data-lines":n,type:"button","aria-label":e.openLabel,onClick:e.onOpen,disabled:e.disabled,children:[t,a(is,{className:"syncify-row-chevron"})]}):a("div",{className:"syncify-row",id:e.id,"data-lines":n,children:t})})}function be(e){return a("span",{className:"syncify-mark-square","data-tone":e.tone,"data-size":e.icon?"large":"small",role:e.label?"img":void 0,"aria-label":e.label,"aria-hidden":e.label?void 0:"true",children:e.icon})}function Ao(e){return a("span",{className:"syncify-badge",role:"img","aria-label":e.label,children:a("span",{className:"syncify-cap",children:e.count})})}function Ie(e){let t=Y("menu"),[n,o]=g(!1),i=j(null),r=j(null),s=e.items.some(f=>f.checked!==void 0);_(()=>{var S,P;let f=r.current,y=i.current;if(!n||!f||!y)return;Hd(f),Wd(f,y);let h=ss(f);(P=(S=h.find(O=>O.getAttribute("aria-checked")==="true"))!=null?S:h[0])==null||P.focus();let b=()=>o(!1),R=O=>{let E=O.target;E instanceof Node&&!f.contains(E)&&!y.contains(E)&&b()},v=O=>{O.target instanceof Node&&f.contains(O.target)||b()};return document.addEventListener("pointerdown",R,!0),document.addEventListener("scroll",v,!0),window.addEventListener("resize",b),()=>{document.removeEventListener("pointerdown",R,!0),document.removeEventListener("scroll",v,!0),window.removeEventListener("resize",b),Fd(f)}},[n]);function c(){var f;o(!1),(f=i.current)==null||f.focus()}function l(f){let y=ss(f.currentTarget),h=y.findIndex(R=>R===document.activeElement),b=f.key==="ArrowDown"?y[(h+1)%y.length]:f.key==="ArrowUp"?y[(h-1+y.length)%y.length]:f.key==="Home"?y[0]:f.key==="End"?y[y.length-1]:null;b?(f.preventDefault(),b.focus()):f.key==="Escape"?(f.preventDefault(),c()):f.key==="Tab"&&o(!1)}function u(f){(f.key==="ArrowDown"||f.key==="ArrowUp")&&(f.preventDefault(),o(!0))}let d={ref:i,type:"button","aria-haspopup":"menu","aria-expanded":n,"aria-controls":n?t:void 0,disabled:e.disabled,onClick:()=>o(!n),onKeyDown:u};return p(D,{children:[e.trigger==="more"?a("button",w(m({className:"syncify-icon-btn","aria-label":e.label},d),{children:a(as,{})})):p("button",w(m({className:"syncify-menu-value","aria-label":`${e.label}: ${e.trigger.value}`},d),{children:[a("span",{className:"syncify-cap",children:e.trigger.value}),a(rs,{})]})),n?a("div",{className:"syncify-menu",id:t,ref:r,role:"menu","aria-label":e.label,popover:"manual",onKeyDown:l,children:e.items.map(f=>a(Kd,{item:f,picks:s,onPick:()=>{c(),f.onSelect()}},f.label))}):null]})}function Kd(e){let{item:t,picks:n}=e;return p("button",{className:"syncify-menu-item",type:"button",role:n?"menuitemradio":"menuitem","aria-checked":n?t.checked===!0:void 0,"data-danger":t.danger?"true":void 0,tabIndex:-1,disabled:t.disabled,onClick:e.onPick,children:[a("span",{className:"syncify-cap",children:t.label}),t.checked?a(Ce,{}):null]})}function ss(e){return[...e.querySelectorAll(".syncify-menu-item:not(:disabled)")]}function Hd(e){typeof e.showPopover=="function"&&!e.matches(":popover-open")&&e.showPopover()}function Fd(e){typeof e.hidePopover=="function"&&e.matches(":popover-open")&&e.hidePopover()}var zd=4;function Wd(e,t){let n=zd,o=t.getBoundingClientRect(),i=e.getBoundingClientRect(),r=o.bottom+n,s=r+i.height>window.innerHeight&&o.top-n-i.height>=0?o.top-n-i.height:r,c=Math.min(Math.max(o.right-i.width,n),window.innerWidth-i.width-n);e.style.top=`${s}px`,e.style.left=`${c}px`}function jd(){return p(D,{children:[a("span",{className:"syncify-dot","aria-hidden":"true"}),a("span",{className:"syncify-visually-hidden",children:", "})]})}function F(e){let t=e.parts.filter(n=>n!=null&&n!==!1&&n!=="");return a("span",{className:rt("syncify-meta",e.className),children:t.map((n,o)=>p(D,{children:[o>0?a(jd,{}):null,a("span",{className:"syncify-meta-part",children:n})]},o))})}function Mo(e){let t=Math.min(Math.max(e.used,0),e.max),n=`Used ${e.used} of ${e.max}`;return p("span",{className:"syncify-meter",role:"meter","aria-label":e.label,"aria-valuemin":0,"aria-valuemax":e.max,"aria-valuenow":t,"aria-valuetext":n,"data-full":e.used>=e.max?"true":void 0,children:[a("span",{className:"syncify-cap",children:n}),a("span",{className:"syncify-meter-bars","aria-hidden":"true",children:Array.from({length:e.max},(o,i)=>a("span",{className:"syncify-meter-bar","data-used":i<t?"true":void 0},i))})]})}function B(e){let t=e.tone==="error"?"alert":e.live?"status":void 0;return p("div",{className:"syncify-notice","data-tone":e.tone,role:t,children:[p("span",{className:"syncify-notice-body",children:[a("span",{className:"syncify-notice-mark",children:a(be,{tone:e.tone})}),a("span",{className:"syncify-notice-text",children:e.children})]}),e.actions?a("span",{className:"syncify-notice-actions",children:e.actions}):null]})}function ke(e){return a("span",{className:"syncify-pip-square","data-kind":e.kind,"aria-hidden":"true"})}function ae(e){return p("div",{className:"syncify-section-label",children:[a("h3",{className:"syncify-section-label-title",id:e.id,tabIndex:e.focusable?-1:void 0,children:e.title}),e.end]})}function X(e){return p("div",{className:"syncify-setting-row",children:[p("span",{className:"syncify-setting-row-text",children:[a("span",{className:"syncify-setting-row-label",children:e.label}),e.value?a("span",{className:"syncify-setting-row-value",children:e.value}):null]}),e.children]})}function $t(e){return a("div",{className:"syncify-setting-group",role:"group","aria-label":e.label,children:e.children})}function Re(){return a("li",{className:"syncify-list-item","aria-hidden":"true",children:p("div",{className:"syncify-row","data-lines":"2",children:[a("span",{className:"syncify-row-name",children:a("span",{className:"syncify-skeleton","data-width":"name"})}),a("span",{className:"syncify-row-meta",children:a("span",{className:"syncify-skeleton","data-width":"meta"})})]})})}function Yd(e){return a("input",{className:"syncify-switch-control",type:"checkbox",role:"switch",checked:e.checked,onChange:t=>e.onChange(t.currentTarget.checked),disabled:e.disabled})}function Bo(e){let o=e,{label:t}=o,n=ue(o,["label"]);return p("label",{className:"syncify-setting-row","data-disabled":e.disabled?"true":void 0,children:[a("span",{className:"syncify-setting-row-label",children:t}),a(Yd,m({},n))]})}var cs=(e,t)=>`${e}-tab-${t}`,ls=(e,t)=>`${e}-panel-${t}`;function Lo(e){let t=j(null);_(()=>{var o,i,r;(r=(i=(o=t.current)==null?void 0:o.querySelector('[aria-selected="true"]'))==null?void 0:i.scrollIntoView)==null||r.call(i,{block:"nearest",inline:"nearest"})},[e.selected]);function n(o){var c,l;let i=e.tabs.length,r=e.tabs.findIndex(u=>u.id===e.selected),s=o.key==="ArrowRight"?(r+1)%i:o.key==="ArrowLeft"?(r-1+i)%i:o.key==="Home"?0:o.key==="End"?i-1:null;s!==null&&(o.preventDefault(),e.onSelect(e.tabs[s].id),(l=(c=t.current)==null?void 0:c.querySelectorAll('[role="tab"]')[s])==null||l.focus())}return a("div",{className:"syncify-tabs",role:"tablist","aria-label":e.label,ref:t,onKeyDown:n,children:e.tabs.map(o=>{let i=o.id===e.selected;return p("button",{className:"syncify-tab",id:cs(e.idBase,o.id),type:"button",role:"tab","aria-selected":i,"aria-controls":ls(e.idBase,o.id),tabIndex:i?0:-1,onClick:()=>e.onSelect(o.id),children:[a("span",{className:"syncify-cap",children:o.label}),o.status]},o.id)})})}function G(e){return p("div",{className:"syncify-tab-panel",id:ls(e.idBase,e.id),role:"tabpanel","aria-labelledby":cs(e.idBase,e.id),children:[a("div",{className:"syncify-tab-scroll",tabIndex:0,children:e.children}),e.actions?a("div",{className:"syncify-tab-actions",children:e.actions}):null]})}function we(e){let t=j(e);return gt(()=>{t.current=e}),t}function Z(e){if(e.startsWith("mailto:")){window.location.href=e;return}window.open(e,"_blank","noopener,noreferrer")}function Cn(e){let t=e.lastIndexOf("@");if(t<1)return e;let n=e.slice(0,t);return n.length<=2?e:`${n[0]}${"*".repeat(n.length-2)}${n[n.length-1]}${e.slice(t)}`}function us(e,t=new Date){let n=new Date(e);return n.toDateString()===t.toDateString()?"today":n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===t.getFullYear()?void 0:"numeric"})}function ds(e){let t=us(e);return t==="today"?t:`on ${t}`}function qd(e){let t=us(e);return t==="today"?t:`by ${t}`}function In(e){var t;return e.not_me?{title:"Syncify is checking this claim",text:null}:{title:`${(t=e.email)!=null?t:"Someone"} is securing this backup`,text:e.held?"Syncify is checking it.":`If that isn't you, press Not me ${qd(e.final_at)}.`}}function fs(e){var t;return`This backup is no longer secured by ${(t=e.email)!=null?t:"another account"}`}function Rn(e){return e==="cancelled"?"Syncify: claim cancelled":"Syncify: sent for a check"}function En(e){return`A new install${e.device?` on ${e.device}`:""} wants to back up this Spotify account`}function ys(e,t,n){var s,c;if(t==="not_owner")return{kind:"other-account"};if(!e)return n?{kind:"other-claim"}:{kind:"unknown"};let{claim:o}=e;if((o==null?void 0:o.status)==="final"){if(!o.mine)return{kind:"other-account"};let l=((s=e.accounts)!=null?s:[]).filter(u=>u.status==="final").length;return{kind:"secured",linkedCount:Math.max(l,1)}}if((o==null?void 0:o.status)==="pending")return o.mine?{kind:"pending",finalAt:o.final_at,held:o.held}:{kind:"other-claim"};let i=((c=e.accounts)!=null?c:[]).filter(l=>l.hash===e.hash),r=i[i.length-1];return(r==null?void 0:r.status)==="unlinked"?{kind:"ended",reason:"undone"}:(r==null?void 0:r.status)==="cancelled"&&r.cancelled_by!=="claimer"?{kind:"ended",reason:r.cancelled_by==="owner"?"owner":"admin"}:{kind:"open"}}function ps(e,t,n){return t?{kind:"warning",label:"Sign in to see your backups"}:e?n.kind==="secured"?{kind:"ok",label:"Signed in, backup secured"}:n.kind==="pending"?null:n.kind==="open"?{kind:"warning",label:"Backup not secured yet"}:n.kind==="ended"?{kind:"warning",label:"Backup not secured"}:{kind:"ok",label:"Signed in"}:null}function ms(e){return e.held?"Syncify is checking your request to secure this backup":`Your backup will be secured ${ds(e.finalAt)}`}var Kt=6,Gd=600*1e3,Vd=300,Jd=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function Do(e){return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function gs(e){let[t,n]=g(()=>Jt()),[o,i]=g(()=>Jt().email),[r,s]=g(""),[c,l]=g(!1),[u,d]=g(null),[f,y]=g(()=>Date.now()),h=!!(t.codeSentAt&&f-t.codeSentAt<Gd),b=Math.max(0,Math.ceil((t.retryAt-f)/1e3)),R=t.retryEmail===null||t.retryEmail===o.trim().toLowerCase()?b:0;_(()=>{if(t.retryAt<=Date.now())return;let E=setInterval(()=>{y(Date.now()),t.retryAt<=Date.now()&&clearInterval(E)},1e3);return()=>clearInterval(E)},[t.retryAt]);function v(E){let k=m(m({},Jt()),E);Vi(k),n(k),y(Date.now())}async function S(E){var N;let k=E.trim();if(!Jd.test(k)){d("Enter a valid email address.");return}l(!0),d(null);try{let C=await Qi(k,{nudge:e.nudge});v({email:k,codeSentAt:Date.now(),retryAt:Date.now()+C*1e3,retryEmail:k.toLowerCase()}),s("")}catch(C){let T=C instanceof A?C:null,z=(N=T==null?void 0:T.retryAfter)!=null?N:null,Q=z&&z<=Vd?Date.now()+z*1e3:0,$=(T==null?void 0:T.code)==="too_many_requests"?null:k.toLowerCase();if((T==null?void 0:T.code)==="resend_wait"){v({email:k,codeSentAt:t.email===k&&t.codeSentAt?t.codeSentAt:Date.now(),retryAt:Q,retryEmail:$});return}Q&&v({retryAt:Q,retryEmail:$}),d(Pe(C))}finally{l(!1)}}async function P(){l(!0),d(null);try{let E=await er(t.email,r);v({codeSentAt:null}),s(""),e.onSignedIn(E)}catch(E){d(Pe(E));let k=E instanceof A?E.code:null;(k==="too_many_attempts"||k==="code_expired")&&s("")}finally{l(!1)}}async function O(E){l(!0),d(null),await nr(),v({email:E,codeSentAt:null}),i(E),l(!1)}return{draft:t,email:o,setEmail:i,code:r,setCode:E=>s(E.replace(/\D/g,"").slice(0,Kt)),busy:c,error:u,codeSent:h,waitSeconds:b,emailWaitSeconds:R,requestCode:S,verify:P,signOut:O,useAnotherEmail:()=>{v({codeSentAt:null}),s(""),d(null)}}}function hs(e){let{signIn:t}=e,{busy:n}=t;return a("form",{className:"syncify-account-form",noValidate:!0,onSubmit:o=>{o.preventDefault(),!n&&(t.codeSent?t.code.length===Kt&&t.verify():t.emailWaitSeconds||t.requestCode(t.email))},children:t.codeSent?p(D,{children:[a(xe,{label:`Code sent to ${Cn(t.draft.email)}`,value:t.code,onChange:t.setCode,error:t.error,placeholder:"123456",inputMode:"numeric",autoComplete:"one-time-code",maxLength:Kt,mono:!0,autoFocus:!0,action:a(x,{type:"submit",disabled:n||t.code.length!==Kt,children:n?"Verifying\u2026":"Verify"})}),p("span",{className:"syncify-account-resend",children:[a(x,{variant:"text",onClick:()=>{t.requestCode(t.draft.email)},disabled:n||t.waitSeconds>0,children:t.waitSeconds>0?`Resend in ${Do(t.waitSeconds)}`:"Resend code"}),a(x,{variant:"text",onClick:t.useAnotherEmail,disabled:n,children:"Use another email"})]})]}):a(xe,{label:"Email for sign-in codes",type:"email",value:t.email,onChange:t.setEmail,error:t.error,placeholder:"you@example.com",autoComplete:"email",autoFocus:!0,action:a(x,{type:"submit",disabled:n||t.emailWaitSeconds>0||!t.email.trim(),children:n?"Sending\u2026":t.emailWaitSeconds>0?`Send in ${Do(t.emailWaitSeconds)}`:"Send code"})})})}var Xd={owner:"This backup isn't secured. Someone using this Spotify account said it isn't yours.",admin:"This backup isn't secured. Syncify couldn't confirm it's yours.",undone:"This backup is no longer secured by your account."};function Ss(e){let{session:t,secure:n,handle:o}=e,i=gs({nudge:e.nudge,onSignedIn:e.onSignedIn}),[r,s]=g(null),[c,l]=g(!1),u=we(S=>{t&&tr().then(P=>{!S()||P||(s({kind:"warning",text:Pe(new A("signed_out"))}),e.onSignedOut())}).catch(()=>{})}),d=t==null?void 0:t.token;_(()=>{let S=!0;return u.current(()=>S),()=>{S=!1}},[u,d]);let f=we(S=>{!t||o!==void 0||yn().then(P=>{var O,E;S()&&e.onHandle((E=(O=P.profile)==null?void 0:O.handle)!=null?E:null)}).catch(()=>{})});_(()=>{let S=!0;return f.current(()=>S),()=>{S=!1}},[f,!!t&&o===void 0]);async function h(){l(!0),s(null);try{Z(await or())}catch(S){let P=S instanceof A&&S.code==="signed_out";s({kind:P?"warning":"error",text:Pe(S)}),P&&e.onSignedOut()}finally{l(!1)}}async function b(){var S;s(null),await i.signOut((S=t==null?void 0:t.email)!=null?S:""),e.onSignedOut()}if(t===void 0)return a(G,{idBase:e.idBase,id:"account",children:null});if(!t)return p(G,{idBase:e.idBase,id:"account",children:[a("p",{className:"syncify-tab-text",children:e.locked?"Sign in with the email that secured this backup":"Sign in to secure your backup so only you can restore it"}),r?a(B,{tone:r.kind,live:!0,children:r.text}):null,a(hs,{signIn:i})]});let R=n.kind==="open"||n.kind==="other-claim"||n.kind==="ended"&&n.reason!=="undone",v=i.busy||c;return p(G,{idBase:e.idBase,id:"account",children:[p($t,{children:[a(X,{label:"Email for sign-in codes",value:Cn(t.email)}),o?a(X,{label:"Creator handle",value:`@${o}`}):null,a(X,{label:"Your account page",children:a(x,{variant:"secondary",size:"small",onClick:()=>{h()},disabled:v,children:"Open"})}),R?a(X,{label:"Secure your backup so only you can restore it",children:a(x,{onClick:e.onSecure,disabled:v||e.securing||n.kind==="other-claim",children:e.securing?"Securing\u2026":n.kind==="ended"?"Secure again":"Secure"})}):null]}),n.kind==="ended"?a(B,{tone:"warning",children:Xd[n.reason]}):null,e.secureError?a(B,{tone:"error",children:e.secureError}):null,r?a(B,{tone:r.kind,live:!0,children:r.text}):null,p("div",{className:"syncify-account-footer",children:[p("span",{className:"syncify-account-status",children:[n.kind==="secured"?a(Ce,{className:"syncify-account-check"}):null,a(F,{parts:Zd(n)})]}),a(x,{variant:"text",onClick:()=>{b()},disabled:v,children:"Sign out"})]})]})}function Zd(e){switch(e.kind){case"secured":return["This backup is secured",...e.linkedCount>1?[`${e.linkedCount} Spotify accounts linked`]:[]];case"pending":return[ms(e)];case"other-account":return["This backup is secured by another account"];default:return["Signed in"]}}var bs=new WeakMap;function Ke(e){let t=bs.get(e);return t||(t=J(e.marketplace_data.keys),bs.set(e,t)),t}function He(e){return Fe(e,"item")}function Fe(e,t){return`${e} ${t}${e===1?"":"s"}`}function st(e,t=new Date){let n=new Date(e);if(Number.isNaN(n.getTime()))return e;let o=n.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),i=new Date(t);return i.setDate(t.getDate()-1),n.toDateString()===t.toDateString()?`today, ${o}`:n.toDateString()===i.toDateString()?`yesterday, ${o}`:`${n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===t.getFullYear()?void 0:"numeric"})}, ${o}`}function Pn(e){return e.length<=1?e.join(""):`${e.slice(0,-1).join(", ")} and ${e[e.length-1]}`}function ks(e,t,n){var l,u;let o=st(e.metadata.last_sync_datetime),i=He(Ke(e).length),r=`from ${e.metadata.device_info}`,s=(u=(l=e.backup)==null?void 0:l.name)!=null?u:null,c=e.payload_hash===n;return t==="safety-copy"?{backup:e,kind:t,name:"Safety copy",meta:[s,o,i,"updated weekly"].filter(Qd),current:c,title:`the safety copy from ${o}`}:t==="unapproved"?{backup:e,kind:t,name:"Not approved",meta:[o,i,r],current:c,title:o}:{backup:e,kind:t,name:s!=null?s:o.charAt(0).toUpperCase()+o.slice(1),meta:s?[o,i,r]:[i,r],current:c,title:s!=null?s:o}}function Qd(e){return e!==null}var ws={extension:"extension",theme:"theme",snippet:"snippet"},ef={extension:"extension",custom_app:"app",theme:"theme"},tf={extension:"extension",custom_app:"custom app",theme:"theme"};function Tn(e){let{changes:t}=e,[n,o]=g(!1);return p(te,{label:e.label,children:[t.changes.map(i=>a(nf,{change:i,includeLabel:e.includeLabel(i.name),onInclude:r=>e.onInclude(i.key,r),disabled:e.disabled},i.key)),t.manual.map(i=>a(V,{leading:a(ke,{kind:ef[i.type]}),name:i.name,meta:a(F,{parts:[tf[i.type],i.scheme]}),end:a("span",{className:"syncify-change-label syncify-cap",children:"Add manually"})},`${i.type}:${i.name}`)),t.settings.length>0?a($e,{}):null,t.settings.map(i=>a(V,{leading:a(ke,{kind:i.kind}),name:i.name,end:a("span",{className:"syncify-change-label syncify-cap","data-change":"Updates",children:"Updates"})},`settings:${i.id}`)),t.settings.length>0&&t.unchanged.length>0?a($e,{}):null,t.unchanged.length>0?a(V,{name:p("span",{className:"syncify-change-fold",children:[t.unchanged.length," more stay the same"]}),end:a(x,{variant:"subtle","aria-expanded":n,onClick:()=>o(!n),children:n?"Hide":"Show"})}):null,n?t.unchanged.map(i=>a(of,{item:i},i.key)):null]})}function nf(e){let{change:t}=e;return a(V,{leading:a(ke,{kind:ws[t.type]}),name:t.name,meta:t.note?a(F,{parts:[t.note]}):void 0,end:p(D,{children:[a("span",{className:"syncify-change-label syncify-cap","data-change":t.fixed?void 0:t.change,children:t.fixed?"Stays off":t.change}),t.optional&&!t.fixed?a(Ro,{checked:t.included,onChange:e.onInclude,label:e.includeLabel,disabled:e.disabled}):null]})})}function of(e){return a(V,{leading:a(ke,{kind:ws[e.item.type]}),name:e.item.name,meta:e.item.note?a(F,{parts:[e.item.note]}):void 0})}var vs={Adds:0,Updates:1,Removes:2},rf=["blocked","host","repo","catalog","unchecked"];function Nn(e,t,n){var u,d,f;let{optional:o,allowed:i}=n,r=(u=n.fixed)!=null?u:new Set,s=[],c=[];for(let y of e.items){let h=t.get(y.key),b=o.has(y.key)||r.has(y.key),R={key:y.key,name:y.name,type:y.type,note:h?Oo(h):r.has(y.key)?"Not in Marketplace's list":n.unapproved&&b?"Not approved":null},v=y.change==="added"?"Adds":y.change==="removed"?"Removes":y.isNew?"Updates":null;if(v){let S=r.has(y.key);s.push(w(m({},R),{change:v,optional:b,fixed:S,included:!b||!S&&i.has(y.key)}))}else c.push(R)}s.sort((y,h)=>vs[y.change]-vs[h.change]);let l=(d=n.settings)!=null?d:[];return{changes:s,settings:l,unchanged:c,manual:e.manual,warnings:[...af(s,t,(f=n.verb)!=null?f:"Restore"),...sf(s)],count:s.filter(y=>y.included).length+l.length}}function _n(e,t){return t===0?e:t===1?`${e} 1 change`:`${e} ${t} changes`}function Oo(e){switch(e.kind){case"host":return`Code from ${e.host}`;case"repo":return`Code from ${e.repo}`;case"blocked":return"Blocked by Marketplace";case"catalog":return"Not in Marketplace";case"unchecked":return"Not checked";case"custom":return"Custom"}}function af(e,t,n){var i;let o=new Map;for(let r of e){if(r.change==="Removes"||r.fixed)continue;let s=t.get(r.key);!s||!Qe(s)&&s.kind!=="unchecked"||o.set(s.kind,[...(i=o.get(s.kind))!=null?i:[],r.name])}return rf.flatMap(r=>{let s=o.get(r);return s?[cf(r,s,n)]:[]})}function sf(e){let t=e.filter(n=>n.fixed).map(n=>n.name);return t.length===0?[]:[t.length===1?`${Pn(t)} isn't in Marketplace's list anymore, so it stays off.`:`${Pn(t)} aren't in Marketplace's list anymore, so they stay off.`]}function cf(e,t,n){let o=t.length===1,i=Pn(t),r=o?`${n} it only if you trust it.`:`${n} them only if you trust them.`;switch(e){case"blocked":return`${i} ${o?"is":"are"} on Marketplace's block list. ${r}`;case"host":return`${i} ${o?"loads from a site":"load from sites"} outside GitHub. ${r}`;case"repo":return o?`${i} loads its code from a different repo than the one it names. ${r}`:`${i} load their code from different repos than the ones they name. ${r}`;case"catalog":return`${i} ${o?"isn't":"aren't"} in Marketplace's catalog. ${r}`;default:return`GitHub couldn't be reached to check ${i}. ${r}`}}var lf="marketplace:installed:";function xs(e,t,n){let o=new Map([...n,...t].map(i=>[i.key,i]));return e.map(i=>{var l;let r=`${lf}${i}`,s=o.get(r),c=(l=s==null?void 0:s.name)!=null?l:uf(i);return{id:i,key:r,name:`${c} settings`,kind:s?s.type:df(i)}}).sort((i,r)=>i.name.localeCompare(r.name))}function uf(e){var o;let t=(o=e.split("/").pop())!=null?o:e,n=t.replace(/\.[^.]+$/,"")||t;return n.charAt(0).toUpperCase()+n.slice(1)}function df(e){return/\.(m?js)$/i.test(e)?"extension":/\.css$/i.test(e)?"theme":"app"}function Cs(e,t,n){var E;let[o,i]=g(()=>new Set),[r,s]=g(null),c=q(()=>on(Ke(e),e.spicetify_config,t,n),[e,t,n]),l=q(()=>et(c.items),[c]);_(()=>{let k=!0;return tt(c.items,l).then(N=>{k&&s({for:e,checks:N})}),()=>{k=!1}},[e,c,l]);let[u,d]=g(null);_(()=>{let k=!0;return Sr(e.extension_settings).catch(()=>[]).then(N=>{k&&d({for:e,ids:N})}),()=>{k=!1}},[e]);let f=(r==null?void 0:r.for)===e?r.checks:null,y=q(()=>new Map([...f!=null?f:[],...l]),[f,l]),h=((E=e.backup)==null?void 0:E.kind)==="quarantined",b=q(()=>new Set(c.items.filter(k=>{var N;return k.change!=="removed"&&k.isNew&&(h||Qe(y.get(k.key))||((N=y.get(k.key))==null?void 0:N.kind)==="unchecked")}).map(k=>k.key)),[c,y,h]),R=q(()=>[...b].filter(k=>!o.has(k)),[b,o]),v=(u==null?void 0:u.for)===e?u.ids:null,S=q(()=>xs(v!=null?v:[],Ke(e),t).filter(k=>!R.includes(k.key)),[v,e,t,R]),P=q(()=>Nn(c,y,{optional:b,allowed:o,unapproved:h,settings:S.map(({id:k,name:N,kind:C})=>({id:k,name:N,kind:C}))}),[c,y,b,o,h,S]);function O(k,N){let C=new Set(o);N?C.add(k):C.delete(k),i(C)}return{preview:c,changes:P,unapproved:h,checking:f===null||v===null,skipped:R,settingsIds:P.settings.map(k=>k.id),allow:O}}function Is(e){let{row:t,local:n}=e,o=Y("restore-heading"),i=Cs(t.backup,n.items,n.spicetifyConfig),{changes:r}=i,s=!n.marketplaceAvailable,c=e.canShareSettings&&i.settingsIds.length>0;_(()=>{var u;(u=document.getElementById(o))==null||u.focus()},[o]);let l=p(D,{children:[a(x,{variant:"secondary",onClick:e.onCancel,disabled:e.restoring,children:"Cancel"}),a(x,{onClick:()=>e.onRestore({row:t,skipped:i.skipped,manual:i.preview.manual,settings:{ids:i.settingsIds,share:c&&e.shareSettings}}),disabled:e.busy||i.checking||s,children:e.restoring?"Restoring\u2026":i.checking?"Checking\u2026":_n("Restore",r.count)})]});return p(G,{idBase:e.idBase,id:"backups",actions:l,children:[a(ae,{title:`Restore ${t.title}`,id:o,focusable:!0}),s?a(B,{tone:"warning",children:"Install Spicetify Marketplace to restore a backup."}):null,i.unapproved?a(B,{tone:"warning",children:"An install this Spotify account hasn't approved made this backup. Its items stay off unless you turn them on."}):null,a(Tn,{changes:r,label:"What this restore changes",includeLabel:u=>`Restore ${u}`,onInclude:i.allow,disabled:e.busy}),r.warnings.map(u=>a(B,{tone:"warning",children:u},u)),e.localIsUnsaved?a(B,{tone:"warning",children:"Your current setup isn't backed up."}):null,c?a(Eo,{label:"Use these extension settings on my other devices too",checked:e.shareSettings,onChange:e.onShareSettingsChange,disabled:e.busy}):null]})}function Rs(e){var P,O,E,k,N;let{remote:t,local:n}=e,o=Y("backup"),[i,r]=g(null),[s,c]=g(null),l=j(null);if(_(()=>{var C;s||!l.current||((C=document.getElementById(l.current))==null||C.focus(),l.current=null)},[s]),s&&n)return a(Is,{idBase:e.idBase,row:s,local:n,localIsUnsaved:n.installedItemCount>0&&!ff(n.hash,t),canShareSettings:e.canShareSettings,shareSettings:e.shareSettings,onShareSettingsChange:e.onShareSettingsChange,busy:e.busy,restoring:e.restoring,onCancel:()=>c(null),onRestore:C=>{var T;return e.onRestore(w(m({},C),{linkedHash:(T=i==null?void 0:i.hash)!=null?T:null}))}},s.backup.payload_hash);async function u(C){if(!C){r(null);return}r({hash:C,remote:null});try{let T=await Ue(e.config,C);r({hash:C,remote:T})}catch(T){r(null),e.onError(T)}}let d=i?i.remote:t,f=(P=n==null?void 0:n.hash)!=null?P:null,y=C=>`${o}-${C.backup.payload_hash}`,h=(C,T)=>C.map(z=>ks(z,T,f)),b=h((O=d==null?void 0:d.backups)!=null?O:[],"backup"),R=h(d!=null&&d.safetyCopy?[d.safetyCopy]:[],"safety-copy"),v=i?[]:h((E=t==null?void 0:t.unapproved)!=null?E:[],"unapproved");function S(C){return a(V,{id:y(C),name:C.name,nameMark:C.kind==="safety-copy"?a(To,{className:"syncify-safety-mark"}):C.kind==="unapproved"?a(be,{tone:"warning"}):void 0,meta:a(F,{parts:C.meta}),end:C.current?a("span",{className:"syncify-row-status syncify-cap",children:"Current"}):void 0,onOpen:C.current?void 0:()=>{l.current=y(C),c(C)},openLabel:`Preview restore of ${C.title}`,disabled:e.busy},`${C.kind}-${C.backup.payload_hash}-${C.backup.metadata.last_sync_datetime}`)}return p(G,{idBase:e.idBase,id:"backups",children:[e.notices,n&&!n.marketplaceAvailable?a(B,{tone:"warning",children:"Install Spicetify Marketplace to restore a backup."}):null,!e.lockedBy&&e.otherAccounts.length>0?a(X,{label:"Show backups from",children:a(Ie,{label:"Show backups from",trigger:{value:(N=(k=e.otherAccounts.find(C=>C.hash===(i==null?void 0:i.hash)))==null?void 0:k.label)!=null?N:"This Spotify account"},items:[{hash:null,label:"This Spotify account"},...e.otherAccounts].map(C=>{var T;return{label:C.label,checked:((T=i==null?void 0:i.hash)!=null?T:null)===C.hash,onSelect:()=>{u(C.hash)}}}),disabled:e.busy})}):null,e.lockedBy?a("p",{className:"syncify-tab-text",children:e.lockedBy==="not_owner"?"Sign in with the account that secured them":"Sign in to see and restore your backups"}):(!t||!n)&&e.failed?null:!t||!n||i&&!i.remote?p(te,{label:"Loading backups",children:[a(Re,{}),a(Re,{})]}):b.length+R.length+v.length===0?i?a("p",{className:"syncify-tab-text",children:"No backups yet."}):null:p(te,{label:"Backups",children:[b.map(S),R.length>0?a($e,{}):null,R.map(S),v.length>0?a($e,{}):null,v.map(S)]})]})}function ff(e,t){return t?[...t.backups,...t.safetyCopy?[t.safetyCopy]:[]].some(n=>n.payload_hash===e):!1}function Es(e,t){let[n,o]=g(!1),[i,r]=g(null),s=we(t);return _(()=>{if(!n)return;let c=l=>{var d;if(!((d=document.getElementById(e))!=null&&d.isConnected)){o(!1),r(null);return}l.preventDefault(),l.stopImmediatePropagation();let u=ha(l);if(u.kind!=="ignore"){if(u.kind==="cancel"){o(!1),r(null);return}if(u.kind==="error"){r(u.message);return}if(Sa(u.shortcut)){r(`${Nt(u.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}o(!1),s.current(u.shortcut)}};return window.addEventListener("keydown",c,!0),()=>window.removeEventListener("keydown",c,!0)},[n,e,s]),{recording:n,error:i,clearError:()=>r(null),toggle:()=>{r(null),o(!n)}}}var Ps=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function Ts(e){var d,f;let{config:t}=e,[n]=g(()=>gn()),o=Y("shortcut"),i=Es(o,l),r=n?t.entryPoint:"topbar",s=i.recording?"Press keys":t.shortcut?Nt(t.shortcut):"Off";function c(y){bn(y),e.onConfigChange(y)}function l(y){c(w(m({},t),{shortcut:y})),yo(y),i.clearError()}function u(y){c(w(m({},t),{entryPoint:y})),hn(y)}return p(G,{idBase:e.idBase,id:"settings",children:[p($t,{children:[a(Bo,{label:"Automatic backup when Spotify starts",checked:t.autoBackupEnabled&&!e.unsupported,onChange:y=>c(w(m({},t),{autoBackupEnabled:y})),disabled:e.busy||e.unsupported}),a(X,{label:"Open Syncify from",children:a(Ie,{label:"Open Syncify from",trigger:{value:(f=(d=Ps.find(y=>y.value===r))==null?void 0:d.label)!=null?f:""},items:Ps.map(y=>({label:y.label,checked:y.value===r,onSelect:()=>u(y.value)})),disabled:!n})}),a(X,{label:"Keyboard shortcut",value:i.recording&&!i.error?"Press a key combination, or Esc to cancel":void 0,children:p("span",{className:"syncify-settings-shortcut",children:[i.recording?null:t.shortcut?a(x,{variant:"subtle",onClick:()=>l(null),children:"Turn off"}):a(x,{variant:"subtle",onClick:()=>l(ot),children:"Use default"}),a(_o,{id:o,keys:s,recording:i.recording,"aria-label":i.recording?`${s} for a new keyboard shortcut`:`${s}, change the keyboard shortcut`,onClick:i.toggle})]})})]}),i.error?a(B,{tone:"warning",live:!0,children:i.error}):null,n?t.entryPoint==="menu"&&!t.shortcut?a(B,{tone:"warning",children:"Keep a shortcut in case a Spotify update breaks the profile menu."}):null:a(B,{tone:"info",children:"The profile menu isn't available in this Spicetify version."})]})}function Ht(e){let t=`${U().webUrl.replace(/\/+$/,"")}/discover`;return e?`${t}?post=${encodeURIComponent(e)}`:t}function ct(e){var t;return(t=e.name)!=null?t:me(e.code)}function Ns(e){return[`Used by ${e.imports}`,...e.posted?["On Discover"]:[]]}function _s(e){let t=e.posted?"The code stops working and its Discover post comes down.":"The code stops working.";return e.imports===0?t:`${t} ${e.imports===1?"1 person":`${e.imports} people`} used it.`}var An=12;function As(e){return[...Array(Math.min(e.extensions,An)).fill("extension"),...Array(Math.min(e.themes,An)).fill("theme"),...Array(Math.min(e.snippets,An)).fill("snippet")].slice(0,An)}var yf={extension:"extension",theme:"theme",snippet:"snippet"};function Ms(e){var l,u;let{compose:t}=e,n=Y("compose-heading"),o=(u=(l=t.compose)==null?void 0:l.code)!=null?u:null,{draft:i,saving:r}=t;_(()=>{var d;(d=document.getElementById(n))==null||d.focus()},[n]);let s=i?[...i.items].sort((d,f)=>Number(i.leftOut.has(f.key))-Number(i.leftOut.has(d.key))||d.name.localeCompare(f.name)):[],c=p(D,{children:[a(x,{variant:"secondary",onClick:t.cancel,disabled:r,children:"Cancel"}),a(x,{onClick:()=>{t.save()},disabled:!i||t.included.length===0||r,children:i?r?o?"Updating\u2026":"Creating\u2026":o?"Update code":"Create code":"Checking\u2026"})]});return p(G,{idBase:e.idBase,id:"share",actions:c,children:[a(ae,{title:o?`Update ${ct(o)}`:"Create a code",id:n,focusable:!0}),t.error?a(B,{tone:"error",children:t.error}):null,a(xe,{label:"Setup name (optional)",value:t.name,onChange:t.setName,maxLength:qr,disabled:r}),t.askHandle?a(xe,{label:"Pick a handle for your profile",value:t.handle,onChange:t.setHandle,onBlur:t.checkHandle,error:t.handleError,prefix:"@",maxLength:ro,disabled:r}):null,i&&t.included.length===0?a(B,{tone:"warning",children:"Nothing here can go in a code. Add something from Marketplace first."}):null,a(ae,{title:"What goes in",end:i?a(F,{parts:[He(t.included.length)]}):void 0}),i?a(te,{label:"What goes in",children:s.map(d=>{let f=i.leftOut.get(d.key),y=[f?Oo(f):null,d.repo].filter(Boolean);return a(V,{leading:a(ke,{kind:yf[d.type]}),name:d.name,meta:y.length>0?a(F,{parts:y}):void 0,end:f?a("span",{className:"syncify-change-label syncify-cap",children:"Left out"}):void 0},d.key)})}):p(te,{label:"Checking your items",children:[a(Re,{}),a(Re,{})]})]})}var Bs=[["add","Add to my setup"],["replace","Replace my setup"]];function Ls(e){var c,l,u,d;let{load:t}=e,n=Y("share-heading"),o=(c=t.shared)==null?void 0:c.file;if(_(()=>{var f;(f=document.getElementById(n))==null||f.focus()},[n]),!o||!t.changes)return null;let i=e.marketplaceAvailable===!1,r=o.creator,s=p(D,{children:[a(x,{variant:"secondary",onClick:t.close,disabled:t.applying,children:"Cancel"}),a(x,{onClick:()=>{t.apply()},disabled:t.applying||t.checking||e.busy||i,children:t.applying?"Loading\u2026":t.checking?"Checking\u2026":_n("Load",t.changes.count)})]});return p(G,{idBase:e.idBase,id:"share",actions:s,children:[a(ae,{title:`Load ${(l=o.name)!=null?l:me(o.code)}`,id:n,focusable:!0,end:r?a(x,{variant:"text",onClick:()=>Z(oa(r)),children:`by @${r}`}):void 0}),t.applyError?a(B,{tone:"error",children:t.applyError}):null,i?a(B,{tone:"warning",children:"Install Spicetify Marketplace to load a setup."}):null,a(X,{label:"How to load it",children:a(Ie,{label:"How to load it",trigger:{value:(d=(u=Bs.find(([f])=>f===t.mode))==null?void 0:u[1])!=null?d:""},items:Bs.map(([f,y])=>({label:y,checked:t.mode===f,onSelect:()=>t.setMode(f)})),disabled:t.applying})}),a(Tn,{changes:t.changes,label:"What loading it changes",includeLabel:f=>`Load ${f}`,onInclude:t.allow,disabled:t.applying}),t.theme?a(B,{tone:"info",children:`Your theme switches to ${t.theme.name}.`}):null,t.changes.warnings.map(f=>a(B,{tone:"warning",children:f},f))]})}function Ds(e){let[t,n]=g(null),[o,i]=g(null),[r,s]=g(""),[c,l]=g(""),[u,d]=g(!1),[f,y]=g(!1),[h,b]=g(null),[R,v]=g(null),S=j(0),[P,O]=g(e.token);P!==e.token&&(O(e.token),n(null),i(null),v(null));let E=t!==null&&t.code===null&&!e.hasHandle,k=E&&u?ao(c):null,N=o?o.items.filter($=>!o.leftOut.has($.key)):[];async function C($){var je,Ye;let K=++S.current;n({code:$}),s((je=$==null?void 0:$.name)!=null?je:""),l((Ye=e.suggestedHandle)!=null?Ye:""),d(!1),i(null),b(null),v(null);try{let se=await de(),dt=await Xr(J(se),se);K===S.current&&i(m({keys:se},dt))}catch(se){if(K!==S.current)return;n(null),b(se instanceof Error?se.message:String(se))}}function T(){S.current+=1,n(null),i(null)}function z(){n(null),i(null)}async function Q(){if(!t||!o)return;if(E&&ao(c)){d(!0);return}y(!0),b(null);let $=Zr(o.keys,N);try{let K=t.code?await ia(t.code.code,r.trim(),$):await na(r.trim(),$,E?c.trim():void 0);v(w(m({},K),{outcome:t.code?"updated":"created"})),z(),await e.reload()}catch(K){if(K instanceof A&&K.code==="same_setup"&&K.share){v(w(m({},K.share),{leftOut:0,outcome:"existing"})),z();return}e.fail(K,b),K instanceof A&&K.code==="publish_failed"&&(n(null),e.reload())}finally{y(!1)}}return{compose:t,draft:o,included:N,name:r,setName:s,askHandle:E,handle:c,setHandle:$=>l($.replace(/^@/,"")),checkHandle:()=>d(!0),handleError:k,saving:f,error:h,saved:R,dismissSaved:()=>v(null),forgetSaved:$=>v(K=>(K==null?void 0:K.code)===$?null:K),start:C,cancel:T,save:Q}}function Os(e){var k;let[t,n]=g(null),[o,i]=g(null),[r,s]=g(null),[c,l]=g(null),[u,d]=g(0),f=j(!1),[y,h]=g(null),[b,R]=g(!1);function v(N,C){C(Tt(N,o)),N instanceof A&&N.code==="signed_out"&&e.onSignedOut()}async function S(){var N,C;h(null);try{let T=await yn();n(T.codes),f.current||(f.current=!0,d(T.newHearts)),e.onCodeCount(T.codes.length),i(T.max),s(T.profile),e.onHandle((C=(N=T.profile)==null?void 0:N.handle)!=null?C:null),l(T.suggestedHandle)}catch(T){v(T,h)}}async function P(N){R(!0),h(null);try{return await ra(N),await S(),!0}catch(C){return v(C,h),!1}finally{R(!1)}}let O=we(N=>{n(null),f.current=!1,N&&S()}),E=(k=e.session)==null?void 0:k.token;return _(()=>O.current(E!==void 0),[O,E]),{codes:t,max:o,atMax:t!==null&&o!==null&&t.length>=o,profile:r,suggestedHandle:c,newHearts:u,error:y,deleting:b,load:S,remove:P,fail:v}}function Us(e){let[t,n]=g(""),[o,i]=g(null),[r,s]=g(null),[c,l]=g(null),[u,d]=g(null),[f,y]=g("add"),[h,b]=g(()=>new Set),[R,v]=g(null),[S,P]=g(void 0),[O,E]=g(!1),k=q(()=>u?Qr(u.file,u.items,e.localItems,e.localConfig,e.localTheme,f):null,[u,e.localItems,e.localConfig,e.localTheme,f]),N=q(()=>{if(!k||!u)return null;let L=new Set(u.items.map(M=>M.key));return k.items.filter(M=>M.change!=="removed"&&L.has(M.key)&&(f==="replace"||M.isNew))},[k,u,f]),C=q(()=>N?et(N):null,[N]),T=R&&R.for===N?R.checks:null,z=q(()=>new Map([...T!=null?T:[],...C!=null?C:[]]),[T,C]),Q=q(()=>k&&S!==void 0?ea(k,S):new Set,[k,S]),$=q(()=>{var L;return new Set(((L=k==null?void 0:k.items)!=null?L:[]).filter(M=>{var W;return M.change!=="removed"&&M.isNew&&(Qe(z.get(M.key))||((W=z.get(M.key))==null?void 0:W.kind)==="unchecked")}).map(M=>M.key))},[k,z]),K=q(()=>k?Nn(k,z,{optional:$,allowed:h,fixed:Q,verb:"Load"}):null,[k,z,$,h,Q]),je=k!=null&&k.theme&&!Q.has(k.theme.key)&&(!$.has(k.theme.key)||h.has(k.theme.key))?k.theme:null,Ye=k!==null&&(T===null||S===void 0);_(()=>{if(!N||!C)return;let L=!0;return tt(N,C).then(M=>{L&&v({for:N,checks:M})}),()=>{L=!1}},[N,C]);async function se(L){let M=L!=null?L:Vr(t);if(s(null),l(null),d(null),!M){s(Tt(new A("no_code")));return}i({code:M,pick:L!==void 0});try{let W=await aa(M);y("add"),b(new Set),d({file:W,items:J(W.keys),pick:L!==void 0}),io().then(P)}catch(W){s(Tt(W))}finally{i(null)}}function dt(L,M){let W=new Set(h);M?W.add(L):W.delete(L),b(W)}async function ft(){if(!u||!k)return;E(!0),l(null);let L=[...new Set([...$,...Q])].filter(M=>Q.has(M)||!h.has(M));try{await Ca(e.config,u.file,f,L,S!=null?S:null,u.pick),Spicetify.showNotification("Syncify: setup loaded. Reloading\u2026"),Ut(k.manual,"share"),setTimeout(()=>window.location.reload(),1e3)}catch(M){E(!1),l(pf(M))}}return{input:t,setInput:n,fetching:o,error:r,applyError:c,shared:u,close:()=>{d(null),l(null)},mode:f,setMode:y,changes:K,theme:je,checking:Ye,applying:O,open:se,allow:dt,apply:ft}}function pf(e){if(e instanceof Bt){let t=e.reason instanceof re?"Sign in to back up.":e.reason instanceof Error?e.reason.message:String(e.reason);return`${e.message} ${t}`}return e instanceof Error?e.message:String(e)}async function Mn(e){var t;try{return await navigator.clipboard.writeText(e),!0}catch(n){let o=(t=Spicetify.Platform)==null?void 0:t.ClipboardAPI;return o!=null&&o.copy?(await o.copy(e),!0):!1}}var mf=2e3;function $s(e){let{codes:t,compose:n}=e,[o,i]=g(null),[r,s]=g(null);_(()=>{if(!r)return;let d=setTimeout(()=>s(null),mf);return()=>clearTimeout(d)},[r]);async function c(d,f){await Mn(d)&&s(f)}async function l(){o&&await t.remove(o.code)&&(n.forgetSaved(o.code),i(null))}let u=t.codes;return p("section",{className:"syncify-share-part","aria-label":"Your codes",children:[a(ae,{title:p(D,{children:["Your codes",t.newHearts>0?a("span",{className:"syncify-share-hearts",children:Fe(t.newHearts,"new heart")}):null]}),end:u&&t.max!==null?a(Mo,{used:u.length,max:t.max,label:"Share codes"}):void 0}),t.error?a(B,{tone:"error",actions:a(x,{variant:"text",onClick:()=>{t.load()},children:"Try again"}),children:t.error}):null,n.saved?a(gf,{saved:n.saved,copied:r,onCopy:(d,f)=>{c(d,f)},discoverOpen:e.discoverOpen,onDismiss:n.dismissSaved}):null,n.error&&!n.compose?a(B,{tone:"error",children:n.error}):null,u===null?t.error?null:a(te,{label:"Loading your codes",children:a(Re,{})}):u.length>0?a(te,{label:"Your codes",children:u.map(d=>a(V,{name:ct(d),meta:a(F,{parts:[d.name?a("code",{className:"syncify-share-code",children:me(d.code)}):null,...Ns(d)]}),end:p("span",{className:"syncify-share-code-actions",children:[a(x,{variant:"text",onClick:()=>{c(me(d.code),`code:${d.code}`)},children:r===`code:${d.code}`?"Copied":"Copy"}),d.link?a(x,{variant:"text",onClick:()=>{var f;c((f=d.link)!=null?f:"",`link:${d.code}`)},children:r===`link:${d.code}`?"Copied":"Get link"}):null,a(Ie,{trigger:"more",label:`More for ${ct(d)}`,disabled:n.compose!==null||t.deleting,items:[{label:"Update",onSelect:()=>{n.start(d)}},...e.discoverOpen&&!d.posted?[{label:"Post to Discover",onSelect:()=>Z(Ht(d.code))}]:[],{label:"Delete",danger:!0,onSelect:()=>i(d)}]})]})},d.code))}):null,u!==null?a("div",{className:"syncify-share-create",children:a(x,{variant:"secondary",onClick:()=>{n.start(null)},disabled:n.compose!==null||t.atMax||e.marketplaceAvailable===!1,children:"Create a code"})}):null,a(Po,{open:o!==null,onClose:()=>i(null),title:o?`Delete ${ct(o)}`:"",actions:p(D,{children:[a(x,{variant:"secondary",onClick:()=>i(null),disabled:t.deleting,children:"Keep it"}),a(x,{variant:"danger",onClick:()=>{l()},disabled:t.deleting,children:t.deleting?"Deleting\u2026":"Delete code"})]}),children:o?_s(o):null})]})}function gf(e){let{saved:t}=e,n=me(t.code),o=t.link,i=t.outcome==="existing"?"You shared this setup already as":t.outcome==="updated"?"Code updated:":"Your code is ready:";return p(B,{tone:"info",live:!0,actions:p(D,{children:[a(x,{variant:"text",onClick:()=>e.onCopy(n,"saved-code"),children:e.copied==="saved-code"?"Copied":"Copy"}),o?a(x,{variant:"text",onClick:()=>e.onCopy(o,"saved-link"),children:e.copied==="saved-link"?"Copied":"Get link"}):null,t.outcome==="created"&&e.discoverOpen?a(x,{variant:"text",onClick:()=>Z(Ht(t.code)),children:"Post to Discover"}):null,a(x,{variant:"subtle",onClick:e.onDismiss,children:"Dismiss"})]}),children:[p("span",{children:[i," ",a("code",{className:"syncify-share-code",children:n})]}),t.leftOut>0?a("span",{className:"syncify-share-left-out",children:t.leftOut===1?"1 snippet isn't in Marketplace's list anymore, so it was left out.":`${t.leftOut} snippets aren't in Marketplace's list anymore, so they were left out.`}):null]})}function Ks(e){let{session:t}=e,n=Us(e),o=Os(e),i=Ds({token:t==null?void 0:t.token,hasHandle:o.profile!==null,suggestedHandle:o.suggestedHandle,reload:o.load,fail:o.fail}),[r,s]=g(null);if(_(()=>{sa().then(s)},[]),n.shared)return a(Ls,{idBase:e.idBase,load:n,marketplaceAvailable:e.marketplaceAvailable,busy:e.busy});if(i.compose)return a(Ms,{idBase:e.idBase,compose:i});let c=n.input.trim();return p(G,{idBase:e.idBase,id:"share",children:[a("form",{className:"syncify-share-part",noValidate:!0,onSubmit:l=>{l.preventDefault(),!n.fetching&&c&&n.open()},children:a(xe,{label:"Load a setup",value:n.input,onChange:n.setInput,placeholder:"Paste a code or a link",error:n.error,action:a(x,{variant:"secondary",type:"submit",disabled:n.fetching!==null||!c,children:n.fetching&&!n.fetching.pick?"Loading\u2026":"Load"})})}),r?p("section",{className:"syncify-share-part","aria-label":r.length>0?"Syncify picks":"Discover",children:[r.length>0?a(ae,{title:"Syncify picks"}):null,p(te,{children:[r.map(l=>{var u;return a(V,{name:l.name,meta:a(F,{parts:[a("span",{className:"syncify-share-pips",children:As(l).map((d,f)=>a(ke,{kind:d},f))},"pips"),((u=n.fetching)==null?void 0:u.code)===l.code?"Loading\u2026":Fe(l.extensions+l.themes+l.snippets,"item")]}),onOpen:()=>{n.open(l.code)},openLabel:`Preview ${l.name}`,disabled:n.fetching!==null},l.code)}),a(V,{name:"Find more setups on Discover",end:a(x,{variant:"secondary",size:"small",onClick:()=>Z(Ht()),children:"Open"})})]})]}):null,t===void 0?null:t===null?a("div",{className:"syncify-share-part",children:a(X,{label:"Sign in to share this setup as a code",children:a(x,{variant:"secondary",onClick:e.onSignIn,children:"Sign in"})})}):a($s,{codes:o,compose:i,discoverOpen:r!==null,marketplaceAvailable:e.marketplaceAvailable})]})}var Uo="syncify:share-code-count",$o="syncify:handle";function hf(){var t,n;let e=Number((n=(t=Spicetify.LocalStorage)==null?void 0:t.get(Uo))!=null?n:NaN);return Number.isInteger(e)&&e>=0?e:null}function Sf(){var t;let e=(t=Spicetify.LocalStorage)==null?void 0:t.get($o);return e==null?void 0:e||null}function Hs(){let[e,t]=g(()=>hf()),[n,o]=g(()=>Sf()),i=ne(c=>{var l,u;c===null?(l=Spicetify.LocalStorage)==null||l.remove(Uo):(u=Spicetify.LocalStorage)==null||u.set(Uo,String(c)),t(c)},[]),r=ne(c=>{var l,u;c===void 0?(l=Spicetify.LocalStorage)==null||l.remove($o):(u=Spicetify.LocalStorage)==null||u.set($o,c!=null?c:""),o(c)},[]),s=ne(()=>{i(null),r(void 0)},[i,r]);return{codeCount:e,handle:n,saveCodeCount:i,saveHandle:r,forget:s}}var bf=2e3;function Fs(e){let{install:t}=e,n=!t||t.trusted?null:t.refused?"This Spotify account refused backups from this install. Sign in to back up from it.":"This install isn't approved yet. Its backups are kept apart until you approve it from another install or sign in.";return p(D,{children:[e.nudge?a(B,{tone:"warning",actions:p(D,{children:[a(x,{variant:"subtle",onClick:e.onHideNudge,disabled:e.securing,children:"Not now"}),a(x,{size:"small",onClick:e.onSecure,disabled:e.securing,children:e.securing?"Securing\u2026":"Secure"})]}),children:"Your backup isn't secured. Anyone who knows your Spotify username can restore it."}):null,n?a(B,{tone:"info",children:n}):null,e.restoreResult?a(kf,{manual:e.restoreResult.manual}):null]})}function kf(e){let[t,n]=g(!1),o=Ga(e.manual).join(`
`);if(_(()=>{if(!t)return;let r=setTimeout(()=>n(!1),bf);return()=>clearTimeout(r)},[t]),!o)return null;let i=e.manual.length;return p(B,{tone:"info",actions:p(D,{children:[a(x,{variant:"text",onClick:()=>{Mn(o).then(n)},children:t?"Copied":"Copy"}),a(x,{variant:"subtle",onClick:Wa,children:"Dismiss"})]}),children:[i===1?"1 isn't from Marketplace. Add it in a terminal:":`${i} aren't from Marketplace. Add them in a terminal:`,a("pre",{className:"syncify-commands",children:a("code",{children:o})})]})}function zs(e){let{message:t}=e;return a(B,{tone:t.kind,actions:p(D,{children:[t.kind==="error"?a(x,{variant:"text",onClick:e.onTryAgain,disabled:e.busy,children:"Try again"}):null,a(x,{variant:"subtle",onClick:e.onDismiss,children:"Dismiss"})]}),children:t.text})}function Ws(e){let t=wf(e);return t.backedUp&&e.latest?w(m({},t),{line:[`Backed up ${st(e.latest.metadata.last_sync_datetime)}`,`${He(e.localItemCount)} on this device`]}):w(m({},t),{line:[t.title,...t.detail]})}function wf(e){let t={backedUp:!1,supportAsk:null},n=`${He(e.localItemCount)} on this device`;return e.restoreResult&&!e.unsupported?vf(e.restoreResult):e.unsupported?w(m({},t),{title:"Update Syncify to keep backing up",detail:["Your backups are safe"],action:"how-to-update"}):e.locked?w(m({},t),{title:"Sign in to restore",detail:[e.locked==="not_owner"?"Secured by another account":"This backup is secured"],action:"sign-in"}):e.activity==="backing-up"?w(m({},t),{title:"Backing up\u2026",detail:[],action:"back-up"}):e.checked?e.latest?e.localHash&&!e.backedUp?w(m({},t),{title:"Changes since your last backup",detail:xf(e.latest,e.latestItems,e.localItems,e.localConfig),action:"back-up"}):w(m({},t),{title:"Everything is backed up",detail:[`Last backup ${st(e.latest.metadata.last_sync_datetime)}`,n],action:null,backedUp:!0}):w(m({},t),{title:"No backup yet",detail:["Save your extensions and themes to restore them after a reinstall or on another computer."],action:"back-up"}):e.checkError?w(m({},t),{title:"Couldn't check your backup",detail:[e.checkError],action:"try-again"}):w(m({},t),{title:"Checking your backup\u2026",detail:[],action:null})}function vf(e){let t=e.loaded===e.total,n=e.kind==="share";return{title:t?n?"Setup loaded":"Backup restored":`${n?"Loaded":"Restored"} ${e.loaded} of ${e.total}`,detail:[t?e.total===0?"Nothing from Marketplace to load":`${e.loaded} of ${e.total} loaded`:"Missing something? Reload Spotify once more."],action:t?null:"reload",backedUp:!1,supportAsk:t?n?"Syncify set it up for you?":"Syncify saved your setup?":null}}function xf(e,t,n,o){var f;let i=new Set(t),r=new Set(n),s=n.filter(y=>!i.has(y)).length,c=t.filter(y=>!r.has(y)).length,l=(f=e.spicetify_config)!=null?f:null,u=!!(o&&!l),d=!u&&(o&&l?!Rr(o,l):o!==l);return[s?`${s} added`:null,c?`${c} removed`:null,d?"Spicetify config changed":null,u?"Spicetify config not saved yet":null,`Last backup ${st(e.metadata.last_sync_datetime)}`].filter(y=>y!==null)}function js(e,t){return(e==null?void 0:e.status)==="pending"&&!e.mine?w(m({kind:"claim"},In(e)),{canAnswer:!e.not_me}):t?{kind:"install",title:En(t),install:t}:null}var Cf=3,Ko={exists:!1,payload:null,backups:[],safetyCopy:null,claim:null,unapproved:[],install:null,nudge:!1},ze=null;function Ys(e){var d,f,y;let[t,n]=g(()=>ze),[o,i]=g(void 0),r=ne(h=>{ze=h,n(h)},[]),s=ne(async()=>{let h,b=null;try{h=await Ue(e)}catch(P){if(!(P instanceof re))throw P;h=Ko,b=P.code}let R=await ie().catch(()=>null),v=R?await Ia(e).catch(()=>null):null,S=R?await ie().catch(()=>null):null;return r({remote:h,lockedBy:b,claims:S?v:null}),i(S),b},[e,r]),c=ne(()=>{ie().catch(()=>null).then(h=>i(b=>b!=null?b:h))},[]),l=ne(h=>{var v;let b=ze!=null?ze:{remote:Ko,lockedBy:null,claims:null},{remote:R}=b;r(w(m({},b),{remote:w(m({},R),{exists:!0,payload:h,backups:[h,...R.backups.filter(S=>S.payload_hash!==h.payload_hash)].slice(0,Cf),safetyCopy:((v=R.safetyCopy)==null?void 0:v.payload_hash)===h.payload_hash?null:R.safetyCopy})}))},[r]),u=ne(()=>{i(null),ze&&r(w(m({},ze),{claims:null}))},[r]);return{check:t,remote:(d=t==null?void 0:t.remote)!=null?d:Ko,lockedBy:(f=t==null?void 0:t.lockedBy)!=null?f:null,claims:(y=t==null?void 0:t.claims)!=null?y:null,session:o,setSession:i,refresh:s,readSession:c,addBackup:l,forgetClaims:u}}function qs(){let[e,t]=g(null),[n,o]=g(!1),i=ne(async()=>{try{let r=await ln();return t(r),o(!1),r}catch(r){throw o(!0),r}},[]);return{local:e,localFailed:n,refreshLocal:i}}var If=600*1e3;function Gs(){let[e,t]=g(null);return _(()=>{let n=U();if(!xo(n.version))return;let o=!0;return os(n.releasesUrl).then(i=>{o&&i&&Co(i,n.version)>0&&t(i)}),()=>{o=!1}},[]),e}function Vs(){let[e,t]=g(()=>Fa()),[n]=g(()=>Date.now());return _(()=>za(t),[]),{result:e,recent:!!(e&&n-e.at<If)}}function Js(e){let t=U(),n=[["Report an issue",t.issueUrl],["GitHub",t.githubUrl],["Discord",t.discordUrl],["Support on Ko-fi",t.kofiUrl]];return p("footer",{className:"syncify-window-footer",children:[p("span",{className:"syncify-window-footer-version",children:[p("span",{children:["Syncify ",t.version]}),e.newerVersion?a(x,{variant:"text",size:"tiny",className:"syncify-window-update",onClick:()=>e.loadedByLoader?window.location.reload():Z(`${t.githubUrl}#updating`),children:a(F,{parts:[`${e.newerVersion} is out`,e.loadedByLoader?"Reload":"How to update"]})}):null]}),a("span",{className:"syncify-window-footer-links",children:n.map(([o,i])=>a(x,{variant:"subtle",size:"tiny",onClick:()=>Z(i),children:o},o))})]})}var Rf={"back-up":"Back up now","try-again":"Try again","sign-in":"Sign in","how-to-update":"How to update",reload:"Reload"};function Xs(e){let{status:t,alert:n}=e,o=t.action,i=o?a(x,{variant:o==="back-up"||o==="sign-in"?"primary":"secondary",size:n?"small":"regular",onClick:()=>e.onAction(o),disabled:e.busy,children:o==="back-up"&&e.backingUp?"Backing up\u2026":Rf[o]}):null;return n?p("section",{className:"syncify-status","aria-label":"Status",children:[p("div",{className:"syncify-status-alert",role:"alert",children:[a("span",{className:"syncify-status-alert-mark",children:a(be,{tone:"warning",icon:a(No,{})})}),p("div",{className:"syncify-status-text",children:[a("h2",{className:"syncify-status-title",children:n.title}),n.kind==="claim"&&n.text?a("p",{className:"syncify-status-sentence",children:n.text}):null]}),n.kind==="claim"?n.canAnswer?a(x,{variant:"secondary",onClick:e.onNotMe,disabled:e.answering,children:"Not me"}):null:p("span",{className:"syncify-status-answers",children:[a(x,{variant:"secondary",onClick:()=>e.onAnswerInstall("reject"),disabled:e.answering,children:"Not mine"}),a(x,{onClick:()=>e.onAnswerInstall("approve"),disabled:e.answering,children:"Approve"})]})]}),p("div",{className:"syncify-status-line","aria-live":"polite",children:[t.backedUp?a(Ce,{className:"syncify-status-check"}):null,a(F,{parts:t.line}),i]})]}):a("section",{className:"syncify-status","aria-label":"Status",children:p("div",{className:"syncify-status-main","aria-live":"polite",children:[p("div",{className:"syncify-status-text",children:[a("h2",{className:"syncify-status-title",children:t.title}),t.detail.length>0?a(F,{parts:t.detail}):null,t.supportAsk?p("p",{className:"syncify-status-ask",children:[a("span",{children:t.supportAsk}),a(x,{variant:"text",onClick:e.onSupport,children:"Support it on Ko-fi"})]}):null]}),i]})})}function Zs(e){let{codeCount:t,account:n,newerVersion:o}=e,i=[{id:"backups",label:"Backups"},{id:"share",label:"Share",status:t?a(Ao,{count:t,label:Fe(t,"code")}):void 0},{id:"account",label:"Account",status:n?n.kind==="ok"?a("span",{className:"syncify-tab-check",role:"img","aria-label":n.label,children:a(Ce,{})}):a(be,{tone:"warning",label:n.label}):void 0},{id:"settings",label:"Settings",status:o?a(be,{tone:"info",label:`Syncify ${o} is out`}):void 0}];return a(Lo,{tabs:i,selected:e.selected,onSelect:e.onSelect,idBase:e.idBase,label:"Syncify"})}function Fo(e){var Go,Vo,Jo,Xo,Zo,Qo,ei,ti,ni,oi,ii,ri,ai;let t=Y("syncify"),n=U(),[o,i]=g(()=>ge()),{local:r,localFailed:s,refreshLocal:c}=qs(),l=Ys(o),u=Hs(),d=Gs(),f=Vs(),[y]=g(()=>ns()!==null),[h,b]=g((Go=e.tab)!=null?Go:"backups"),[R,v]=g(()=>l.check?"idle":"checking"),[S,P]=g(null),[O,E]=g(null),[k,N]=g(!1),[C,T]=g(!1),[z,Q]=g(!1),[$,K]=g(null),[je,Ye]=g(()=>Ta()),[se,dt]=g(e.secure===!0),ft=j(!1),{remote:L,lockedBy:M,claims:W,session:ce}=l,yt=R!=="idle",Ln=(Vo=r==null?void 0:r.hash)!=null?Vo:null,ac=((Jo=L.claim)==null?void 0:Jo.status)==="pending"&&!L.claim.mine?L.claim:null,Me=ys(W,M,ac!==null),sc=!!(Ln&&L.backups.some(I=>I.payload_hash===Ln)),Wo=Ws({activity:R,checked:l.check!==null,checkError:S,unsupported:k,locked:M,latest:L.payload,latestItems:L.payload?Ke(L.payload).map(I=>I.key):[],backedUp:sc,localHash:Ln,localItems:(Xo=r==null?void 0:r.installedItems)!=null?Xo:[],localItemCount:(Zo=r==null?void 0:r.installedItemCount)!=null?Zo:0,localConfig:(Qo=r==null?void 0:r.spicetifyConfig)!=null?Qo:null,restoreResult:f.recent?f.result:null}),cc=js(L.claim,(ti=(ei=L.install)==null?void 0:ei.waiting[0])!=null?ti:null),lc=!je&&!M&&L.payload!==null&&h!=="account"&&(ce?Me.kind==="open":ce===null&&L.nudge),uc=(ce?(ni=W==null?void 0:W.accounts)!=null?ni:[]:[]).filter(I=>I.status==="final").map((I,H)=>({hash:I.hash,label:`Spotify account ${H+1}${I.device_info?` from ${I.device_info}`:""}`})).filter(I=>I.hash!==(W==null?void 0:W.hash));async function le(I={}){try{(!I.silent||!l.check)&&v("checking"),I.silent||(E(null),P(null)),await c(),await l.refresh()&&b("account"),P(null),v("idle")}catch(H){pt(H)}}function pt(I){if(v("idle"),I instanceof wt){N(!0),E(null);return}if(I instanceof De){E({kind:"error",text:I.message}),le({silent:!0});return}if(I instanceof re&&I.code!=="not_linked"){E(null),le({silent:!0});return}let H=I instanceof Error?I.message:String(I);l.check?E({kind:"error",text:H}):P(H),Spicetify.showNotification(H,!0,6e3)}async function dc(){try{v("backing-up"),E(null);let{payload:I,unchanged:H,unapproved:qe}=await Lt(o);if(await c(),qe){await le({silent:!0}),E({kind:"warning",text:"Backed up, but kept apart until this install is approved."}),Spicetify.showNotification("Syncify: backed up, waiting for approval");return}H||l.addBackup(I),v("idle"),Spicetify.showNotification(H?"Syncify: everything is already backed up":"Syncify backup complete")}catch(I){pt(I)}}async function fc(I){var H;try{v("restoring"),E(null),await xa(o,I.row.backup,(H=I.linkedHash)!=null?H:void 0,I.skipped,I.settings),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),Ut(I.manual),setTimeout(()=>window.location.reload(),1e3)}catch(qe){pt(qe)}}async function yc(I){var qe;let H=(qe=L.install)==null?void 0:qe.waiting[0];if(H){T(!0);try{await kn(o,H.id,I),Spicetify.showNotification(I==="approve"?"Syncify: install approved":"Syncify: install refused"),await le({silent:!0})}catch(Sc){pt(Sc)}finally{T(!1)}}}async function pc(){T(!0);try{Spicetify.showNotification(Rn(await wn(o))),await le({silent:!0})}catch(I){E({kind:"error",text:I instanceof Error?I.message:String(I)})}finally{T(!1)}}async function Ft(){Q(!0),K(null);try{await Ra(o)}catch(I){I instanceof Ae&&["claim_pending","claimed"].includes(I.code)||K(I instanceof Error?I.message:String(I))}finally{await le({silent:!0}),Q(!1)}}function mc(){dt(!0),ce?Ft():b("account")}function gc(I){l.setSession(I),ft.current=!0,!M&&L.payload?Ft():le({silent:!0})}function jo(){u.forget(),l.forgetClaims(),K(null),le({silent:!0})}function hc(I){I==="back-up"?dc():I==="try-again"?le():I==="sign-in"?b("account"):I==="how-to-update"?Z(`${n.githubUrl}#updating`):ja()}let Yo=we(()=>{l.readSession(),le({silent:!0})});_(()=>Yo.current(),[Yo]);let qo=we(()=>{!e.secure||ft.current||z||!ce||Me.kind!=="open"||M||(ft.current=!0,Ft())});return _(()=>qo.current(),[qo,ce,Me.kind,M,z]),p("div",{className:"syncify-ui syncify-window",onClick:Ho,onMouseDown:Ho,onPointerDown:Ho,children:[p("div",{className:"syncify-window-top",children:[a(Xs,{status:Wo,alert:cc,backingUp:R==="backing-up",busy:yt||Wo.action==="back-up"&&M!==null,answering:C,onAction:hc,onNotMe:()=>{pc()},onAnswerInstall:I=>{yc(I)},onSupport:()=>Z(n.kofiUrl)}),O?a(zs,{message:O,busy:yt,onTryAgain:()=>{le()},onDismiss:()=>E(null)}):null,a(Zs,{idBase:t,selected:h,onSelect:b,codeCount:ce?u.codeCount:null,account:ps(ce,M,Me),newerVersion:d})]}),h==="backups"?a(Rs,{idBase:t,config:o,remote:l.check?L:null,failed:S!==null||s,lockedBy:M,local:r,otherAccounts:uc,notices:a(Fs,{nudge:lc,securing:z,onSecure:mc,onHideNudge:()=>{Na(),Ye(!0)},install:M||Me.kind==="secured"?null:L.install,restoreResult:f.result}),canShareSettings:ce!=null&&Me.kind==="secured"&&o.settingsSyncEnabled,shareSettings:o.shareRestoredSettings,onShareSettingsChange:I=>{let H=w(m({},o),{shareRestoredSettings:I});bn(H),i(H)},busy:yt,restoring:R==="restoring",onRestore:I=>{fc(I)},onError:pt}):h==="share"?a(Ks,{idBase:t,config:o,session:ce,localItems:(oi=r==null?void 0:r.items)!=null?oi:[],localConfig:(ii=r==null?void 0:r.spicetifyConfig)!=null?ii:null,localTheme:(ri=r==null?void 0:r.activeTheme)!=null?ri:null,marketplaceAvailable:(ai=r==null?void 0:r.marketplaceAvailable)!=null?ai:null,busy:yt,onSignIn:()=>b("account"),onSignedOut:jo,onCodeCount:u.saveCodeCount,onHandle:u.saveHandle}):h==="account"?a(Ss,{idBase:t,session:ce,locked:M,secure:Me,securing:z,secureError:$,onSecure:()=>{Ft()},nudge:se,onSignedIn:gc,onSignedOut:jo,handle:u.handle,onHandle:u.saveHandle}):a(Ts,{idBase:t,config:o,onConfigChange:i,busy:yt,unsupported:k}),a(Js,{newerVersion:d,loadedByLoader:y})]})}function Ho(e){e.stopPropagation()}var Qs=`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="-2.5 -2.5 37 37" aria-hidden="true" focusable="false"><defs><mask id="syncify-mark-gap" maskUnits="userSpaceOnUse" x="-2" y="-2" width="36" height="36"><rect x="-2" y="-2" width="36" height="36" fill="#fff"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></mask></defs><g mask="url(#syncify-mark-gap)"><g transform="rotate(15 16 16)"><path d="M16 16L16 7.4A8.6 8.6 0 0 1 24.6 16Z" fill="#6cd1d1" transform="translate(0.42 -0.42)"/><path d="M16 16L24.6 16A8.6 8.6 0 0 1 16 24.6Z" fill="#efa4c1" transform="translate(0.42 0.42)"/><path d="M16 16L16 24.6A8.6 8.6 0 0 1 7.4 16Z" fill="#d3c48c" transform="translate(-0.42 0.42)"/><path d="M16 16L7.4 16A8.6 8.6 0 0 1 16 7.4Z" fill="#88bcf2" transform="translate(-0.42 -0.42)"/></g></g><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 28.03A12.4 12.4 0 1 1 28.03 19"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91"/></g></svg>
`;var fe=null;function lt(){return!!(fe!=null&&fe.container.isConnected)}function ut(){Spicetify.PopupModal.hide()}function We(e){var n;(n=fe==null?void 0:fe.root)==null||n.unmount();let t=document.createElement("div");fe={container:t,root:null};try{Spicetify.PopupModal.display({title:U().extensionName,content:t,isLarge:!1})}catch(o){throw oe("Failed to open PopupModal",o),o}Pf(t),Nf(t,e)}function Pf(e){requestAnimationFrame(()=>{let t=Tf(e);t==null||t.classList.add("syncify-modal-shell");let n=t==null?void 0:t.querySelector(".main-trackCreditsModal-header h1");if(n&&!n.querySelector(".syncify-modal-mark")){let i=document.createElement("span");i.className="syncify-modal-mark",i.innerHTML=Qs,n.prepend(i)}let o=t==null?void 0:t.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');o&&(o.classList.add("syncify-modal-close"),o.setAttribute("aria-label",`Close ${U().extensionName}`),o.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function Tf(e){let t=e.parentElement;for(;t&&t!==document.body;){if(t.querySelector(".main-trackCreditsModal-header"))return t;t=t.parentElement}return e.closest('[class*="trackCreditsModal"]')}function Nf(e,t){try{if(typeof Spicetify.ReactDOM.createRoot=="function"){let n=Spicetify.ReactDOM.createRoot(e);n.render(t),(fe==null?void 0:fe.container)===e&&(fe.root=n),ee("Window rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(t,e),ee("Window rendered",{renderer:"render"})}catch(n){throw oe("Failed to render window",n),n}}function Bn(e){return a("div",{className:"syncify-ui syncify-launch-notice",children:p(xn,{title:e.title,actions:e.actions,children:[e.children?a("p",{children:e.children}):null,e.error?a(B,{tone:"error",children:e.error}):null]})})}function ec(){let[e,t]=g(!1),[n,o]=g(null);async function i(r){t(!0),o(null);try{await r()}catch(s){o(s instanceof Error?s.message:String(s)),t(!1)}}return{busy:e,error:n,run:i}}function tc(e){let{title:t,text:n}=In(e.claim),o=ec();return a(Bn,{title:t,error:o.error,actions:p(D,{children:[a(x,{variant:"secondary",onClick:e.onClose,disabled:o.busy,children:"Close"}),a(x,{onClick:()=>{o.run(async()=>{Spicetify.showNotification(Rn(await wn(ge()))),e.onClose()})},disabled:o.busy,children:"Not me"})]}),children:n})}function nc(e){return a(Bn,{title:fs(e.claim),actions:a(x,{onClick:e.onClose,children:"Close"})})}function oc(e){let t=ec(),n=o=>{t.run(async()=>{await kn(ge(),e.install.id,o),Spicetify.showNotification(o==="approve"?"Syncify: install approved":"Syncify: install refused"),e.onDone()})};return a(Bn,{title:En(e.install),error:t.error,actions:p(D,{children:[a(x,{variant:"secondary",onClick:()=>n("reject"),disabled:t.busy,children:"Not mine"}),a(x,{onClick:()=>n("approve"),disabled:t.busy,children:"Approve"})]}),children:"Approve it if it's yours."})}function ic(e){return a(Bn,{title:"Your backup isn't secured",actions:p(D,{children:[a(x,{variant:"secondary",onClick:e.onClose,children:"Not now"}),a(x,{onClick:t=>{t.stopPropagation(),e.onSecure()},children:"Secure"})]}),children:"Anyone who knows your Spotify username can restore it."})}function _f(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var rc="syncify-styles";function Af(){if(document.getElementById(rc)){ee("Another copy of Syncify is running; stopping this one");return}ui(Spicetify.React),Mf();let e=ge();wa({topbarButton:Za(zo),menuItem:es(zo)}),hn(e.entryPoint),fo(e.shortcut,zo),Da({onClaim:Bf,onUndone:Lf,onInstall:Df,onNudge:Of}).catch(t=>{oe("Startup sync check failed",t)}),qa().catch(t=>{oe("Restore check failed",t)})}function Mf(){let e=document.createElement("style");e.id=rc,e.textContent=$i,document.head.appendChild(e)}function zo(){if(lt()){ut();return}We(a(Fo,{}))}function Bf(e){lt()||(ee("Opening claim notice"),We(a(tc,{claim:e,onClose:ut})))}function Lf(e){return lt()?!1:(ee("Opening undone claim notice"),We(a(nc,{claim:e,onClose:ut})),!0)}function Df(e){lt()||(ee("Opening install notice"),We(a(oc,{install:e,onDone:ut})))}function Of(){lt()||(ee("Opening nudge notice"),Aa(),We(a(ic,{onSecure:()=>We(a(Fo,{tab:"account",secure:!0})),onClose:ut})))}Ya();(function e(){if(!_f()){setTimeout(e,100);return}ee("Spicetify APIs ready"),Af()})();})();
