// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var zl=Object.defineProperty,Fl=Object.defineProperties;var jl=Object.getOwnPropertyDescriptors;var dn=Object.getOwnPropertySymbols;var qo=Object.prototype.hasOwnProperty,Jo=Object.prototype.propertyIsEnumerable;var Go=(e,t,n)=>t in e?zl(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,g=(e,t)=>{for(var n in t||(t={}))qo.call(t,n)&&Go(e,n,t[n]);if(dn)for(var n of dn(t))Jo.call(t,n)&&Go(e,n,t[n]);return e},w=(e,t)=>Fl(e,jl(t));var me=(e,t)=>{var n={};for(var i in e)qo.call(e,i)&&t.indexOf(i)<0&&(n[i]=e[i]);if(e!=null&&dn)for(var i of dn(e))t.indexOf(i)<0&&Jo.call(e,i)&&(n[i]=e[i]);return n};var It,R,ue,P,Et,Q,Ei,H,h;function Xo(e){({createElement:It,Fragment:R,useCallback:ue,useEffect:P,useLayoutEffect:Et,useMemo:Q,useReducer:Ei,useRef:H,useState:h}=e)}var Zo=`/* Shared values for every part. Colors come from the active Spicetify theme,
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
    --syncify-size-switch-width: 32px;
    --syncify-size-switch-height: 18px;
    /* The shortest line a notice's text keeps before its actions move under it. */
    --syncify-notice-text-min: 24ch;
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
`;var Qo=`.syncify-icon {
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
`;var er=`.syncify-btn,
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
`;var tr=`.syncify-switch-control {
    --syncify-switch-width: var(--syncify-size-switch-width);
    --syncify-switch-height: var(--syncify-size-switch-height);
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
`;var nr=`.syncify-checkbox {
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
`;var ir=`/* A square ring; picked, the ring and a square inside it in the accent. */
.syncify-radio {
    --syncify-radio-dot: 8px;

    position: relative;
    display: grid;
    flex: 0 0 auto;
    place-items: center;
    width: var(--syncify-size-check);
    height: var(--syncify-size-check);
    margin: 0;
    border-radius: calc(var(--syncify-size-check) * var(--syncify-corner));
    box-shadow: inset 0 0 0 var(--syncify-ring) var(--syncify-color-muted);
    appearance: none;
    cursor: pointer;
}

.syncify-radio:checked {
    box-shadow: inset 0 0 0 var(--syncify-ring) var(--syncify-color-accent);
}

.syncify-radio:checked::before {
    width: var(--syncify-radio-dot);
    height: var(--syncify-radio-dot);
    border-radius: calc(var(--syncify-radio-dot) * var(--syncify-corner));
    background: var(--syncify-color-accent);
    content: "";
}

.syncify-radio:disabled {
    cursor: default;
    opacity: 0.45;
}

/* A radio and its label, centered on the label's capitals. */
.syncify-radio-row {
    display: inline-flex;
    align-items: center;
    gap: var(--syncify-space-2);
    min-height: var(--syncify-size-control-small);
    font-size: var(--syncify-text-small);
    font-weight: 600;
    white-space: nowrap;
    cursor: pointer;
}

.syncify-radio-row[data-disabled="true"] {
    cursor: default;
    opacity: 0.45;
}

@supports (text-box: trim-both cap alphabetic) {
    .syncify-radio-label {
        text-box: trim-both cap alphabetic;
    }
}
`;var or=`.syncify-setting-row {
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
`;var rr=`/* Facts on one line, wrapping between facts. Each fact is trimmed to its
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
`;var sr=`.syncify-list {
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

.syncify-row[data-plain="true"] .syncify-row-name {
    font-weight: 400;
}

/* A list whose row ends move under the name when there's no room beside it. */
.syncify-list[data-wrap="true"] {
    container-type: inline-size;
}

@container (width < 480px) {
    .syncify-list[data-wrap="true"] .syncify-row[data-lines="1"] {
        grid-template-rows: auto auto;
        row-gap: var(--syncify-space-1);
    }

    .syncify-list[data-wrap="true"] .syncify-row-end {
        flex-wrap: wrap;
        grid-column: 2 / -1;
        grid-row: 2;
        gap: 0 var(--syncify-space-4);
        margin-left: 0;
    }
}
`;var ar=`.syncify-field-group {
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
`;var cr=`.syncify-menu {
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
`;var lr=`.syncify-meter {
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

/* Space used: one bar that fills, between its label and the numbers. */
.syncify-usage {
    --syncify-usage-bar-height: 8px;

    display: flex;
    align-items: center;
    gap: var(--syncify-space-4);
    min-height: var(--syncify-size-control-small);
    color: var(--syncify-color-muted);
    font-size: var(--syncify-text-small);
    font-weight: 600;
}

.syncify-usage-bar {
    display: flex;
    flex: 1 1 auto;
    min-width: var(--syncify-size-control);
    height: var(--syncify-usage-bar-height);
    overflow: hidden;
    border-radius: calc(var(--syncify-usage-bar-height) * var(--syncify-corner));
    background: var(--syncify-color-surface-strong);
}

.syncify-usage-fill {
    display: block;
    height: 100%;
    background: var(--syncify-color-accent);
}

.syncify-usage[data-warning="true"] .syncify-usage-fill {
    background: var(--syncify-color-warning);
}
`;var ur=`.syncify-mark-square {
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
`;var dr=`.syncify-notice {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--syncify-space-3);
    padding: var(--syncify-space-3) var(--syncify-space-3) var(--syncify-space-3) var(--syncify-space-4);
    border-radius: var(--syncify-radius-surface);
    background: var(--syncify-color-surface);
}

.syncify-notice[data-tone="warning"] {
    background: var(--syncify-color-warning-surface);
}

/*
 * The mark sits on the first line's capitals, however many lines follow.
 * Narrower than a short line of text, the actions move under it.
 */
.syncify-notice-body {
    display: flex;
    flex: 1 1 var(--syncify-notice-text-min);
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
    margin-left: auto;
    align-items: center;
    gap: var(--syncify-space-2);
}
`;var fr=`.syncify-dialog {
    --syncify-dialog-width: 420px;

    width: min(var(--syncify-dialog-width), 100% - 2 * var(--syncify-space-4));
    margin: auto;
    padding: var(--syncify-space-6);
    border: 0;
    border-radius: var(--syncify-radius-surface);
    color: var(--syncify-color-text);
    background: var(--syncify-color-raised);
}

.syncify-dialog[data-width="wide"] {
    --syncify-dialog-width: 600px;
}

/* A wide dialog holds a list under its sentence: they stand apart like the title. */
.syncify-dialog[data-width="wide"] .syncify-dialog-text {
    gap: var(--syncify-space-4);
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

/* A field under the dialog's sentence stands apart from it like the title. */
.syncify-dialog-text > p + .syncify-field-group {
    margin-top: var(--syncify-space-2);
}

.syncify-dialog-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: var(--syncify-space-2);
}
`;var yr=`/* When the window is too narrow for every tab, the row scrolls sideways
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
`;var mr=`.syncify-pip-square {
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
`;var pr=`.syncify-section-label {
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
`;var gr=`.syncify-keycap {
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
`;var hr=`/* A bar as tall as the capitals of the text it stands in for. */
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

/* An item row's parts, each the size of what it stands in for. */
.syncify-skeleton[data-width="pip"] {
    width: var(--syncify-size-pip);
    height: var(--syncify-size-pip);
    border-radius: calc(var(--syncify-size-pip) * var(--syncify-corner));
}

/* As wide as a short size, such as "12 KB". */
.syncify-skeleton[data-width="size"] {
    width: 5ch;
    margin-right: var(--syncify-space-2);
}

.syncify-skeleton[data-width="switch"] {
    width: var(--syncify-size-switch-width);
    height: var(--syncify-size-switch-height);
    border-radius: calc(var(--syncify-size-switch-height) * var(--syncify-corner));
}

/* A bar as wide as the menu button, like its dots. */
.syncify-skeleton[data-width="menu"] {
    width: var(--syncify-size-control-small);
}
`;var Sr=[Zo,Qo,er,tr,nr,ir,or,rr,sr,ar,cr,lr,ur,dr,fr,yr,mr,pr,gr,hr].join(`
`);var br=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var wr=`/* The window fits the height Spotify's popup leaves it, so the status and
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
/* Narrower than a short line of text, the answers move under it, as in a notice. */
.syncify-status-alert {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: var(--syncify-space-3);
    padding: var(--syncify-space-4);
    border-radius: var(--syncify-radius-surface);
    background: var(--syncify-color-warning-surface);
}

.syncify-status-alert .syncify-status-title {
    font-size: var(--syncify-text-heading);
}

/* The mark sits on the title's capitals, however many lines follow. */
.syncify-status-alert-body {
    display: flex;
    flex: 1 1 var(--syncify-notice-text-min);
    align-items: flex-start;
    gap: var(--syncify-space-3);
    min-width: 0;
}

.syncify-status-alert .syncify-status-text {
    overflow-wrap: anywhere;
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
    margin-left: auto;
}

.syncify-status-answers {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: var(--syncify-space-2);
    max-width: 100%;
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

/* Help links: the button padding hangs outside the row, so their text lines up
   with the version's edges on one line and when wrapped. */
.syncify-window-footer-links {
    margin-inline: calc(-1 * var(--syncify-space-2));
}

.syncify-window-footer-meta {
    font-size: inherit;
}

/* Privacy and Terms read as part of the version line, not as buttons. */
.syncify-ui .syncify-window-footer-legal {
    padding: 0;
    font-size: inherit;
    font-weight: inherit;
}

.syncify-ui .syncify-window-footer-legal:hover:not(:disabled) {
    background: transparent;
    text-decoration: underline;
}

.syncify-ui .syncify-window-update {
    margin-inline-start: calc(-1 * var(--syncify-space-2));
    color: var(--syncify-color-accent);
    font-weight: 700;
}

/* The update's facts take the button's color, not the meta's muted one. */
.syncify-window-update .syncify-meta {
    color: inherit;
}

/* The Account tab's check, centered on its label's capitals. */
.syncify-tab-check {
    display: inline-flex;
}
`;var kr=`/* The safety copy's shield and a pinned backup's pin, after their names. */
.syncify-safety-mark {
    color: var(--syncify-color-accent);
}

/* "Current", where an older backup has its chevron. */
.syncify-row-status {
    color: var(--syncify-color-accent);
    font-size: var(--syncify-text-small);
    font-weight: 700;
}
`;var vr=`/* Adds, Updates and Removes: plain colored text, not chips. */
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
`;var xr=`/* Loading a setup, the picks and your codes, split by dashed lines. */
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
`;var Cr=`/* The code step's Resend and Use another email. */
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
`;var Ir=`/* Turn off or Use default, then the key. */
.syncify-settings-shortcut {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    gap: var(--syncify-space-2);
}

/* This Syncify's code, in the code font, never split over two lines. */
.syncify-settings-code {
    font-family: var(--syncify-font-mono);
    white-space: nowrap;
}

/* The Extension settings section and the Items list in its place. */
.syncify-sync-section {
    display: flex;
    flex-direction: column;
    gap: var(--syncify-space-3);
}

/* An item's size, switch and menu, spaced apart like the settings rows. */
.syncify-sync-section .syncify-row-end {
    gap: var(--syncify-space-3);
}

/* An item's size at its row's end, before its switch. */
.syncify-sync-size {
    color: var(--syncify-color-muted);
    font-size: var(--syncify-text-small);
    white-space: nowrap;
}

@supports (text-box: trim-both cap alphabetic) {
    .syncify-sync-size {
        text-box: trim-both cap alphabetic;
    }
}

/* Under the name when narrow, the size, switch and menu stay on one line: the size wraps instead. */
@container (width < 480px) {
    .syncify-sync-section .syncify-list[data-wrap="true"] .syncify-row-end {
        flex-wrap: nowrap;
    }

    .syncify-sync-section .syncify-sync-size {
        white-space: normal;
    }
}

.syncify-sync-size[data-tone="warning"],
.syncify-sync-warning {
    color: var(--syncify-color-warning);
}

/* Under the other settings, a little apart from them. */
.syncify-sync-section[data-place="settings"] {
    margin-top: var(--syncify-space-1);
}

/* The first-sync choice: the two copies side by side, under the name when narrow. */
.syncify-first-sync-picks {
    display: flex;
    flex-wrap: wrap;
    gap: 0 var(--syncify-space-4);
}

/* Its rows line up with the text above them. */
.syncify-dialog .syncify-list {
    margin-inline: calc(-1 * var(--syncify-space-3));
}
`;var Er=`/* A launch notice in Spotify's popup: the dialog layout, the popup's width. */
.syncify-launch-notice {
    width: 100%;
}
`;var Rr=[Sr,br,wr,vr,kr,xr,Cr,Ir,Er].join(`
`);var bu="syncify",Le="state";var fn={durability:"strict"},He=class extends Error{constructor(){super("IndexedDB isn't available."),this.name="DatabaseUnavailableError"}},Tr="syncify:database-opened";function yn(){let e;try{e=window.indexedDB}catch(t){return Promise.resolve(null)}return e?new Promise((t,n)=>{let i;try{i=e.open(bu,1)}catch(o){t(null);return}i.onupgradeneeded=()=>{i.result.createObjectStore(Le)},i.onerror=()=>{var o;Pr()?n((o=i.error)!=null?o:new Error("IndexedDB failed to open.")):t(null)},i.onsuccess=()=>{vu(),ku(),t(i.result)}}):Promise.resolve(null)}var wu=[500,1500,4e3];async function mn(e){for(let t of wu)try{return await e()}catch(n){await new Promise(i=>setTimeout(i,t))}return e()}var Nr=!1;function ku(){var e,t;if(!Nr){Nr=!0;try{(t=(e=navigator.storage)==null?void 0:e.persist)==null||t.call(e).catch(()=>!1)}catch(n){}}}function Pr(){try{return window.localStorage.getItem(Tr)==="true"}catch(e){return!1}}function vu(){try{Pr()||window.localStorage.setItem(Tr,"true")}catch(e){}}function Ri(e,t,n=!1){let i=n&&e==="readwrite"?fn:void 0,o=yn().then(r=>new Promise((a,c)=>{if(!r){c(new He);return}try{let l=r.transaction(Le,e,i),u=t(l.objectStore(Le));l.oncomplete=()=>{r.close(),a(u.result)},l.onerror=l.onabort=()=>{var d;r.close(),c((d=l.error)!=null?d:new Error("IndexedDB failed."))}}catch(l){r.close(),c(l)}}));return n?o:Promise.race([o,new Promise((r,a)=>setTimeout(()=>a(new Error("IndexedDB took too long.")),2e3))])}function pe(e,t={}){return Ri("readonly",n=>n.get(e),t.wait)}async function de(e,t,n={}){await Ri("readwrite",i=>i.put(t,e),n.wait)}async function pn(e){await Ri("readwrite",t=>t.delete(e))}var xe={extensionName:"Syncify",version:"1.20.6",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",discordUrl:"https://syncify.wsoltani.com/discord",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com",shareUrl:"https://syncs.wsoltani.com"};function $(){var t,n,i,o,r,a,c,l,u,d;let e=window.SyncifyConfig;return{extensionName:(t=Ae(e==null?void 0:e.extensionName))!=null?t:xe.extensionName,version:(n=Ar(e==null?void 0:e.version))!=null?n:xe.version,workerUrl:(i=Ae(e==null?void 0:e.workerUrl))!=null?i:xe.workerUrl,webUrl:(o=Ae(e==null?void 0:e.webUrl))!=null?o:xe.webUrl,githubUrl:(r=Ae(e==null?void 0:e.githubUrl))!=null?r:xe.githubUrl,kofiUrl:(a=Ae(e==null?void 0:e.kofiUrl))!=null?a:xe.kofiUrl,discordUrl:(c=Ae(e==null?void 0:e.discordUrl))!=null?c:xe.discordUrl,issueUrl:(l=Ae(e==null?void 0:e.issueUrl))!=null?l:xe.issueUrl,releasesUrl:(u=Ae(e==null?void 0:e.releasesUrl))!=null?u:xe.releasesUrl,shareUrl:(d=Ae(e==null?void 0:e.shareUrl))!=null?d:xe.shareUrl}}function Ae(e){return Ar(e)}function Ar(e){return typeof e=="string"&&e.trim()?e.trim():null}var xu="x-syncify-version",Cu="x-syncify-install",Iu="x-syncify-timezone",Eu="x-syncify-trust",Ru="2",Ni="install-id",Ti="syncify:install-id",rt=null;async function _r(){let e={[xu]:$().version,[Cu]:(await gn()).id,[Eu]:Ru},t=Pu();return t&&(e[Iu]=t),e}function gn(){if(!rt){let e=Nu();rt=e,e.catch(()=>{rt===e&&(rt=null)})}return rt}var Rt=null;function Mr(e){return Rt!=null||(Rt=(async()=>{if((await gn()).id!==e)return;let t=await yn();if(!t)throw new Error("IndexedDB isn't available.");let n=Pi();await new Promise((i,o)=>{let r=t.transaction(Le,"readwrite",fn);r.objectStore(Le).put(n,Ni),r.oncomplete=()=>{t.close(),i()},r.onerror=r.onabort=()=>{var a;t.close(),o((a=r.error)!=null?a:new Error("IndexedDB failed."))}}),rt=Promise.resolve({id:n,inDatabase:!0})})().finally(()=>{Rt=null})),Rt}async function Nu(){let e=await mn(Tu);if(e)return{id:e,inDatabase:!0};let t=Lr();if(t)return{id:t,inDatabase:!1};let n=Pi();try{window.localStorage.setItem(Ti,n)}catch(i){}return{id:n,inDatabase:!1}}async function Tu(){let e=await yn();if(!e)return null;let t=await new Promise((n,i)=>{let o=null;try{let r=e.transaction(Le,"readwrite",fn),a=r.objectStore(Le),c=a.get(Ni);c.onsuccess=()=>{var l;if(typeof c.result=="string"&&Br(c.result)){o=c.result;return}o=(l=Lr())!=null?l:Pi(),a.put(o,Ni)},r.oncomplete=()=>{e.close(),o?n(o):i(new Error("IndexedDB failed."))},r.onerror=r.onabort=()=>{var l;e.close(),i((l=r.error)!=null?l:new Error("IndexedDB failed."))}}catch(r){e.close(),i(r)}});try{window.localStorage.removeItem(Ti)}catch(n){}return t}function Lr(){try{let e=window.localStorage.getItem(Ti);return e&&Br(e)?e:null}catch(e){return null}}function Pi(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t=[...e].map(n=>n.toString(16).padStart(2,"0"));return[t.slice(0,4).join(""),t.slice(4,6).join(""),t.slice(6,8).join(""),t.slice(8,10).join(""),t.slice(10).join("")].join("-")}function Br(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(e)}function Pu(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(e){return null}}var Au="syncify-signature-v1",_u={name:"ECDSA",hash:"SHA-256"};function hn(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function Sn(e){return Ai(new Uint8Array(await crypto.subtle.exportKey("raw",e)))}async function Nt(e,t,n,i,o){let r=await Mu(t,n,i,o),a=await crypto.subtle.sign(_u,e,r);return Ai(new Uint8Array(a))}async function Mu(e,t,n,i){let{pathname:o,search:r}=new URL(n),a=new TextEncoder,c=Ai(new Uint8Array(await crypto.subtle.digest("SHA-256",a.encode(i))));return a.encode([Au,e,t.toUpperCase(),o+r,c].join(`
`))}function Ai(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var Dr="device-key",_i="session",Or="salt",Ke=null,Tt,Ur={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function st(e){if(Ke)return Ke;let t=await pe(Dr,{wait:!0});return Lu(t)?(Ke=Promise.resolve(t),t):e?(Ke=hn().then(async n=>(await de(Dr,n,{wait:!0}),n)),Ke.catch(()=>{Ke=null}),Ke):null}async function te(){let e=await pe(_i,{wait:!0});return Bu(e)?e:null}function Mi(e){return de(_i,e,{wait:!0})}async function ze(){await pn(_i).catch(()=>{})}async function bn(){if(Tt===void 0){let e=await pe(Or).catch(()=>{});Tt=typeof e=="string"?e:null}return Tt}async function wn(e){e!==Tt&&(Tt=e,await de(Or,e).catch(()=>{}))}function kn(){return Ur}function $r(e){Ur=e}function Lu(e){let t=e;return!!(t&&t.privateKey instanceof CryptoKey&&t.publicKey instanceof CryptoKey)}function Bu(e){let t=e;return!!(t&&typeof t.token=="string"&&t.token&&typeof t.email=="string")}var Hr="install-key",Pt=null;function vn(){if(!Pt){let e=Du();Pt=e,e.catch(()=>{Pt===e&&(Pt=null)})}return Pt}async function Du(){if(!(await gn()).inDatabase)return null;let e=await mn(()=>pe(Hr,{wait:!0})),t=Uu(e)?e:await Ou();return{privateKey:t.privateKey,publicKey:await Sn(t.publicKey)}}async function Ou(){let e=await hn();return await de(Hr,e,{wait:!0}),e}function Uu(e){let t=e;return!!(t&&t.privateKey instanceof CryptoKey&&t.publicKey instanceof CryptoKey)}var $u="/api/auth/email-otp/send-verification-otp",Hu="/api/auth/sign-in/email-otp",Ku="/api/auth/get-session",zu="/api/auth/sign-out",Fu="/api/auth/link",ju="x-syncify-device-key",Wu="x-syncify-signature",Kr="x-syncify-salt",Yu="none",Vu={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again.",link_failed:"Couldn't open the website. Try again."},U=class extends Error{constructor(n,i=null,o=null){var r;super((r=Vu[n])!=null?r:"Sign-in failed. Try again.");this.code=n;this.retryAfter=i;this.share=o;this.name="AccountError"}};function Be(e){return e instanceof U?e.message:"Sign-in failed. Try again."}async function zr(e,t={}){let n=await _t($u,{method:"POST",body:JSON.stringify(g({email:e,type:"sign-in"},t.nudge?{nudge:!0}:{}))});return typeof(n==null?void 0:n.resend_in)=="number"?n.resend_in:60}async function Fr(e,t){var r;let n=await st(!0).catch(()=>{throw new U("no_device_key")}),i=await _t(Hu,{method:"POST",body:JSON.stringify({email:e,otp:t}),keys:n,sendPublicKey:!0});if(typeof(i==null?void 0:i.token)!="string"||!i.token)throw new U("sign_in_failed");let o={token:i.token,email:typeof((r=i.user)==null?void 0:r.email)=="string"?i.user.email:e};return await Mi(o).catch(()=>{throw new U("no_device_key")}),Li=!0,o}var Li=!1;async function jr(){var t;let e=await te();if(!e||Li)return e;try{let n=await xn(e,Ku,"GET");Li=!0;let i=(t=n==null?void 0:n.user)==null?void 0:t.email;if(typeof i!="string"||i===e.email)return e;let o=w(g({},e),{email:i});return await Mi(o).catch(()=>{}),o}catch(n){if(n instanceof U&&n.code==="signed_out")return null;throw n}}async function Wr(){let e=await te().catch(()=>null);e&&await xn(e,zu,"POST").catch(()=>{}),await ze()}async function Yr(){let e=await te();if(!e)throw new U("signed_out");let t=await xn(e,Fu,"POST"),n=typeof(t==null?void 0:t.url)=="string"?t.url:"",i=new URL($().webUrl).origin;if(!n.startsWith(`${i}/link#`))throw new U("link_failed");return n}async function At(e,t,n){let i=await te();if(!i)throw new U("signed_out");return xn(i,e,t,n)}async function Vr(e,t,n){let i=await te().catch(()=>null),o=i?await st(!1).catch(()=>null):null;await _t(e,g({method:"POST",body:JSON.stringify(t),headers:n,keepalive:!0},i&&o?{token:i.token,keys:o}:{}))}async function xn(e,t,n,i){let o=await st(!1);if(!o)throw await ze(),new U("signed_out");return _t(t,g({method:n,token:e.token,keys:o},i===void 0?{}:{body:JSON.stringify(i)}))}async function _t(e,t,n=!1){var y,f,S;let i=`${$().webUrl.replace(/\/+$/,"")}${e}`,o=g({},t.headers);if(t.body!==void 0&&(o["content-type"]="application/json"),t.token&&(o.authorization=`Bearer ${t.token}`),t.keys){let b=(y=await bn())!=null?y:Yu;o[Kr]=b,o[Wu]=await Nt(t.keys.privateKey,b,t.method,i,(f=t.body)!=null?f:""),t.sendPublicKey&&(o[ju]=await Sn(t.keys.publicKey))}let r;try{r=await fetch(i,{method:t.method,headers:o,body:t.body,keepalive:t.keepalive})}catch(b){throw new U("offline")}let a=r.headers.get(Kr);a&&await wn(a);let c=await r.json().catch(()=>null);if(r.ok)return c;let l=typeof(c==null?void 0:c.code)=="string"?c.code:r.status===503?"unavailable":"failed";if(l==="stale_salt"&&t.keys&&!n)return _t(e,t,!0);l==="signed_out"&&await ze();let u=Number(r.headers.get("retry-after")),d=c==null?void 0:c.share;throw new U(l,Number.isFinite(u)&&u>0?u:(S=Gu[l])!=null?S:null,typeof(d==null?void 0:d.code)=="string"?{code:d.code,link:typeof d.link=="string"?d.link:null}:null)}var Gu={resend_wait:60,too_many_requests:60,send_failed:60};var qu="x-syncify-user-hash",Ju="x-syncify-identity",Xu="x-syncify-signature",Zu="x-syncify-install",Qu="x-syncify-install-key",ed="x-syncify-install-signature",Bi="x-syncify-salt",td="none",nd="/restores",id="/sync",od="/settings/delete",rd="x-syncify-settings-bytes",sd="/installs",ad="hash",Gr=3,Mt=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}},at=class extends Error{constructor(t=!1){super(t?"Too many wrong codes today. Try again tomorrow.":"That code doesn't match. Check it in that Syncify's Settings and try again."),this.name="PairingCodeError"}},Lt=class extends Error{constructor(n){super("Backup failed with HTTP 429.");this.retryAfter=n;this.name="BackupLimitedError"}};async function Zr(e,t,n,i){var c;let o=JSON.stringify(n),r=await Ce(e,t,{method:"POST",headers:g({"content-type":"application/json"},i!==void 0?{[rd]:String(new TextEncoder().encode(i).byteLength)}:{}),body:i!==void 0?i+o:o});if(r.status===429){let l=Number(r.headers.get("retry-after"));throw new Lt(Number.isFinite(l)&&l>0?l:null)}if(!r.ok)throw new Error(`Backup failed with HTTP ${r.status}.`);let a=await r.json().catch(()=>null);return{unchanged:(a==null?void 0:a.unchanged)===!0,settings:(c=a==null?void 0:a.settings)!=null?c:null}}async function Qr(e,t,n,i){let o=await Ce(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(g({install:n},i))},sd);if(o.ok)return;let r=await o.json().catch(()=>null);if((r==null?void 0:r.code)!=="not_pending")throw(r==null?void 0:r.code)==="code_mismatch"?new at:(r==null?void 0:r.code)==="daily_limit"?new at(!0):new Error(o.status===429?"Too many tries. Wait a minute and try again.":`Couldn't answer with HTTP ${o.status}.`)}async function Oi(e,t,n,i){var A,T,C,I,M;let o=await Ce(e,t,i!==void 0&&!n?{method:"POST",headers:{"content-type":"application/json"},body:i}:{method:"GET"},i!==void 0&&!n?id:ns("/",n));if(o.status===404){let N=await o.json().catch(()=>null);return{settings:(A=N==null?void 0:N.settings)!=null?A:null,exists:!1,payload:null,backups:[],safetyCopy:null,pinned:[],borrowed:!1,others:[],claim:Cn(N==null?void 0:N.claim),unapproved:[],install:Jr(N==null?void 0:N.install),nudge:!1}}if(!o.ok)throw new Error(`Restore failed with HTTP ${o.status}.`);let r=await o.json(),a=Cn(r.claim),c=Jr(r.install),l=r.nudge===!0,u=(T=r.settings)!=null?T:null;delete r.claim,delete r.install,delete r.nudge,delete r.settings;let d=[r,...(C=r.backup_history)!=null?C:[]],y={claim:a,install:c,nudge:l,settings:u};if(!d.every(N=>N.backup))return w(g({},y),{exists:!0,payload:r,backups:d.slice(0,Gr),safetyCopy:(I=d[Gr])!=null?I:null,pinned:[],borrowed:!1,others:[],unapproved:[]});let f=d.filter(In),S=qr(d.filter(N=>{var B;return!((B=N.backup)!=null&&B.other)&&!In(N)})),b=d.filter(N=>{var B;return((B=N.backup)==null?void 0:B.other)===!0}),k=S.backups.length+S.pinned.length===0&&!S.safetyCopy&&b.length>0,m=k?qr(b):S,v=(M=m.backups[0])!=null?M:m.safetyCopy;return v?w(g({},y),{exists:!0,payload:v,backups:m.backups.length>0?m.backups:[v],safetyCopy:m.backups.length>0?m.safetyCopy:null,pinned:m.pinned,borrowed:k,others:k?[]:b.sort(Di),unapproved:f}):w(g({},y),{exists:!1,payload:null,backups:[],safetyCopy:null,pinned:m.pinned,borrowed:k,others:[],unapproved:f})}var Di=(e,t)=>Date.parse(t.metadata.last_sync_datetime)-Date.parse(e.metadata.last_sync_datetime);function qr(e){var i;let t=o=>{var r,a;return((r=o.backup)==null?void 0:r.kind)==="anchor"||((a=o.backup)==null?void 0:a.safety_copy)===!0},n=(i=e.filter(t).sort(Di)[0])!=null?i:null;return{backups:e.filter(o=>{var r,a,c;return((r=o.backup)==null?void 0:r.kind)==="rolling"||((a=o.backup)==null?void 0:a.kind)==="quarantined"||t(o)&&o!==n&&((c=o.backup)==null?void 0:c.kind)==="anchor"}).sort(Di),safetyCopy:n,pinned:e.filter(o=>{var r;return((r=o.backup)==null?void 0:r.kind)==="pinned"&&o!==n})}}async function es(e,t,n){let i=await Ce(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({item:n})},od),o=await i.json().catch(()=>null);if(!i.ok||typeof(o==null?void 0:o.version)!="number")throw new Error(i.status===429?"Syncify can't delete more synced copies today. Try again tomorrow.":`Couldn't delete the synced copy with HTTP ${i.status}.`);return{version:o.version}}async function ts(e,t,n,i){try{await Ce(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:n}),keepalive:!0},ns(nd,i))}catch(o){}}async function Ce(e,t,n,i="",o=!1){var v,A,T,C,I;let r=i?`${e.replace(/\/+$/,"")}${i}`:e,a=(v=n.method)!=null?v:"GET",c=await te().catch(Xr),l=c?await st(!1).catch(Xr):null,u=await vn(),d={},y=(A=await bn())!=null?A:td;c&&l&&(d.authorization=`Bearer ${c.token}`,d[Bi]=y,d[Xu]=await Nt(l.privateKey,y,a,r,(T=n.body)!=null?T:"")),u&&(d[Bi]=y,d[Qu]=u.publicKey,d[ed]=await Nt(u.privateKey,y,a,r,(C=n.body)!=null?C:""));let f=await _r(),S=f[Zu],b=await fetch(r,w(g({},n),{headers:g(w(g(g({},n.headers),f),{[qu]:t.hash,[Ju]:t.field}),d)})),k=b.headers.get(Bi);if(k&&await wn(k),b.status===426)throw new Mt;if(b.status!==401)return b;let m=(I=await b.clone().json().catch(()=>null))==null?void 0:I.code;if(!o){if(m==="stale_salt"&&(c||u))return Ce(e,t,n,i,!0);if(m==="signed_out"&&c)return await ze(),Ce(e,t,n,i,!0);if(m==="install_key_mismatch"&&u)return await Mr(S),Ce(e,t,n,i,!0)}throw m==="not_linked"?new Error("Couldn't read that Spotify username's backups."):(m==="signed_out"&&await ze(),new U(typeof m=="string"?m:"failed"))}function ns(e,t){return t?`${e}?${ad}=${encodeURIComponent(t)}`:e}function Jr(e){let t=e;return!t||typeof t.trust!="string"?null:{waiting:(Array.isArray(t.waiting)?t.waiting:[]).flatMap(i=>{let o=i;return o&&typeof o.id=="string"&&typeof o.first_seen_at=="number"?[{id:o.id,device:typeof o.device=="string"?o.device:null,first_seen_at:o.first_seen_at}]:[]})}}function Cn(e){let t=e;if((t==null?void 0:t.status)!=="final"||typeof t.mine!="boolean")return null;if(t.mine)return{status:"final",mine:!0};let n=Array.isArray(t.emails)?t.emails.filter(i=>typeof i=="string"):[];return n.length>0?{status:"final",mine:!1,emails:n}:null}function Xr(e){if(e instanceof He)return null;throw e}function In(e){var t;return((t=e.backup)==null?void 0:t.kind)==="quarantined"&&e.backup.mine!==!0}async function En(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return[...new Uint8Array(n)].map(i=>i.toString(16).padStart(2,"0")).join("")}function q(e){return JSON.stringify(Ui(e))}function Ui(e){return Array.isArray(e)?e.map(Ui):e&&typeof e=="object"?Object.keys(e).sort().reduce((t,n)=>(t[n]=Ui(e[n]),t),{}):e}function is(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var cd="marketplace:installed:";function ld(e){return{id:e.id,key:`${cd}${e.id}`,name:e.name,kind:ud(e.id)}}function Bt(e){return new Map(e.map(t=>[t.id,ld(t)]))}function ud(e){return/\.(m?js)$/i.test(e)?"extension":/\.css$/i.test(e)?"theme":"app"}var dd="registry.json",os="settings-registry",fd=1,yd=3e3,md=["marketplace:","spicetify","syncify"],pd=["spicetify","syncify"],gd="medium",$i=null;function Ie(){return $i||($i=hd().then(async e=>e?(await de(os,e).catch(()=>{}),e):as(await pe(os).catch(()=>{})))),$i}async function hd(){let e=typeof AbortController=="function"?new AbortController:null,t=setTimeout(()=>e==null?void 0:e.abort(),yd);try{let n=await fetch(`${$().releasesUrl}/${dd}`,{signal:e==null?void 0:e.signal});return n.ok?as(await n.json()):null}catch(n){return null}finally{clearTimeout(t)}}function as(e){if(!Fe(e)||e.format!==fd||!Array.isArray(e.items)||!Fe(e.sizes))return null;let t={small:Number(e.sizes.small),medium:Number(e.sizes.medium),large:Number(e.sizes.large)},n=Number(e.accountLimit);return[...Object.values(t),n].every(o=>Number.isSafeInteger(o)&&o>0)?{items:e.items.flatMap(o=>{let r=Sd(o,t);return r?[r]:[]}),accountLimit:n}:null}function Sd(e,t){var l,u;if(!Fe(e)||typeof e.id!="string"||!e.id)return null;let n=rs(e.keys),i=rs((l=e.exclude)!=null?l:[]),o=vd(e.storage),r=kd(e.lists),a=(u=e.size)!=null?u:gd;if(a!=="small"&&a!=="medium"&&a!=="large"||!n||!i||!o||!r||n.length===0||o.type==="localStorage"&&n.some(xd)||o.type==="indexedDB"&&pd.some(d=>o.database.startsWith(d)))return null;let c=bd(e.name)?e.name:wd(e.id);return{id:e.id,name:c,keys:n,exclude:i,storage:o,lists:r,limit:t[a]}}function bd(e){return typeof e=="string"&&e.length<=100&&/^\S(?:.*\S)?$/.test(e)}function wd(e){var i;let t=(i=e.split("/").pop())!=null?i:e,n=t.replace(/\.[^.]+$/,"")||t;return n.charAt(0).toUpperCase()+n.slice(1)}function kd(e){if(e===void 0)return{};if(!Fe(e))return null;let t={};for(let[n,i]of Object.entries(e))if(Fe(i)&&i.merge==="object")t[n]={merge:"object"};else if(Fe(i)&&i.merge==="array"&&Dt(i.id))t[n]={merge:"array",id:i.id};else return null;return t}function vd(e){return e===void 0?{type:"localStorage"}:Fe(e)?e.type==="localStorage"?{type:"localStorage"}:e.type!=="indexedDB"||!Dt(e.database)||!Dt(e.store)||e.valueField!==void 0&&!Dt(e.valueField)?null:g({type:"indexedDB",database:e.database,store:e.store},e.valueField!==void 0?{valueField:e.valueField}:{}):null}function rs(e){return Array.isArray(e)&&e.every(t=>Dt(t)&&/^[^*\s]+\*?$/.test(t))?e:null}function _e(e,t){return e.keys.some(n=>ss(n,t))&&!e.exclude.some(n=>ss(n,t))}function ss(e,t){return e.endsWith("*")?t.startsWith(e.slice(0,-1)):t===e}function xd(e){let t=e.endsWith("*")?e.slice(0,-1):e;return md.some(n=>t.startsWith(n)||e.endsWith("*")&&n.startsWith(t))}function Dt(e){return typeof e=="string"&&e.length>0}function Fe(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}var Cd=2e3,Nn="restored-settings";async function cs(e){await de(Nn,e).catch(()=>{})}async function ct(e){var i,o;let t={},n=new Set;for(let[r,a]of Id(e,fs())){let c=window.localStorage.getItem(r);c!==null&&((o=t[i=a.id])!=null||(t[i]={storage:"localStorage",values:{}}),t[a.id].values[r]=c)}return await Promise.all(e.items.filter(r=>r.storage.type==="indexedDB").map(async r=>{let a=await Nd(r);a===null?n.add(r.id):Object.keys(a).length>0&&(t[r.id]={storage:"indexedDB",values:a})})),{settings:t,unavailable:n}}function Id(e,t){var r,a;let n=new Map,i=[];for(let c of e.items)if(c.storage.type==="localStorage")for(let l of c.keys)l.endsWith("*")?i.push([l.slice(0,-1),c]):n.set(l,c);let o=new Map;for(let c of t){let l=(a=n.get(c))!=null?a:(r=i.find(([u])=>c.startsWith(u)))==null?void 0:r[1];l&&_e(l,c)&&o.set(c,l)}return o}async function Tn(e,t,n){let i=n.flatMap(r=>{let a=e.items.find(l=>l.id===r),c=a?ds(a,t[r]):null;return a&&c?[{item:a,saved:c}]:[]});for(let{item:r,saved:a}of i)r.storage.type==="indexedDB"&&await Td(r,a);let o=fs();for(let{item:r,saved:a}of i)if(r.storage.type==="localStorage"){for(let c of o)_e(r,c)&&!(c in a)&&window.localStorage.removeItem(c);for(let[c,l]of Object.entries(a))window.localStorage.setItem(c,l)}}function Ed(e,t,n){return t?e.items.flatMap(i=>{var c,l;let o=ds(i,t[i.id]);if(!o||n.unavailable.has(i.id))return[];let r=(l=(c=n.settings[i.id])==null?void 0:c.values)!=null?l:{};return[...new Set([...Object.keys(o),...Object.keys(r)])].some(u=>!Rd(i,o[u],r[u]))?[i.id]:[]}):[]}async function ls(e){if(!e)return[];let t=await Ie();if(!t)return[];let n=Bt(t.items);return Ed(t,e,await ct(t)).flatMap(i=>{let o=n.get(i);return o?[o]:[]})}function us(e,t,n){let i=new TextEncoder,o=t+i.encode(`,${JSON.stringify("extension_settings")}:{}`).byteLength,r=Object.entries(e).map(([l,u])=>({id:l,entry:u,bytes:i.encode(`${JSON.stringify(l)}:${JSON.stringify(u)}`).byteLength})).sort((l,u)=>l.bytes-u.bytes||l.id.localeCompare(u.id)),a={},c=!0;for(let{id:l,entry:u,bytes:d}of r){let y=d+(c?0:1);if(o+y>n)break;o+=y,a[l]=u,c=!1}return a}function ds(e,t){if(!t||typeof t!="object"||t.storage!==e.storage.type||!t.values||typeof t.values!="object"||Array.isArray(t.values))return null;let n={};for(let[i,o]of Object.entries(t.values))_e(e,i)&&((e.storage.type==="localStorage"?typeof o!="string":!Rn(o))||(n[i]=o));return Object.keys(n).length>0?n:null}function Rd(e,t,n){if(t===void 0||n===void 0)return t===n;let i=e.storage.type==="indexedDB"?e.storage.valueField:void 0,o=r=>i&&r&&typeof r=="object"&&!Array.isArray(r)?r[i]:r;return q(o(t))===q(o(n))}function Rn(e){return e===null||typeof e=="string"||typeof e=="boolean"?!0:typeof e=="number"?Number.isFinite(e):Array.isArray(e)?e.every(Rn):typeof e=="object"&&Object.getPrototypeOf(e)===Object.prototype?Object.values(e).every(Rn):!1}function fs(){let e=[];for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);n!==null&&e.push(n)}return e}async function Nd(e){let t=e.storage;return ys(t,"readonly",(n,i)=>{let o={},r=n.openCursor();r.onsuccess=()=>{let a=r.result;if(!a)return i(o);let c=a.key;typeof c=="string"&&_e(e,c)&&Rn(a.value)&&(o[c]=a.value),a.continue()}}).catch(()=>null)}async function Td(e,t){let n=e.storage;if(await ys(n,"readwrite",(o,r)=>{let a=o.openCursor();a.onsuccess=()=>{let c=a.result;if(c){let l=c.key;typeof l=="string"&&_e(e,l)&&!(l in t)&&c.delete(),c.continue();return}for(let[l,u]of Object.entries(t))o.put(u,l);r(!0)}})===null)throw new Error("Syncify couldn't write an extension's settings. Restart Spotify and try again.")}function ys(e,t,n){let i;try{i=window.indexedDB}catch(r){return Promise.resolve(null)}if(!i)return Promise.resolve(null);let o=i;return new Promise((r,a)=>{let c=!1,l=null,u=f=>{c||(c=!0,clearTimeout(d),f())},d=setTimeout(()=>{u(()=>a(new Error("The extension's database took too long.")));try{l==null||l.abort()}catch(f){}},Cd),y;try{y=o.open(e.database)}catch(f){u(()=>r(null));return}y.onupgradeneeded=()=>{var f;return(f=y.transaction)==null?void 0:f.abort()},y.onerror=()=>{let f=y.error;u(()=>(f==null?void 0:f.name)==="AbortError"?r(null):a(f))},y.onblocked=()=>u(()=>a(new Error("The extension's database is busy."))),y.onsuccess=()=>{let f=y.result;if(f.onversionchange=()=>f.close(),c||!f.objectStoreNames.contains(e.store)){f.close(),u(()=>r(null));return}try{let S=f.transaction(e.store,t);l=S;let b=null;n(S.objectStore(e.store),k=>{b=k}),S.oncomplete=()=>{f.close(),u(()=>r(b))},S.onerror=S.onabort=()=>{f.close(),u(()=>{var k;return a((k=S.error)!=null?k:new Error("IndexedDB failed."))})}}catch(S){f.close(),u(()=>a(S))}}})}var Pd=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,Ad=100,_d="marketplace:installed-extensions",Md="marketplace:installed-themes",Ld="marketplace:theme-installed",Bd="marketplace:installed:",Dd="marketplace";function Ki(e){return Spicetify.Config?zi(Spicetify.Config,e):null}function zi(e,t){var r;let n=De(e),i=new Set(Od(t)),o=((r=t[Ld])==null?void 0:r.includes(Bd))===!0;return{current_theme:o?Dd:n.current_theme,color_scheme:o?"":n.color_scheme,extensions:n.extensions.filter(a=>!i.has(a)),custom_apps:n.custom_apps}}function De(e){let t=e&&typeof e=="object"?e:{};return{current_theme:Hi(t.current_theme)?t.current_theme:"",color_scheme:Hi(t.color_scheme)?t.color_scheme:"",extensions:ms(t.extensions),custom_apps:ms(t.custom_apps)}}function hs(e,t){return q(De(e))===q(De(t))}function ms(e){return Array.isArray(e)?[...new Set(e.filter(Hi))].sort().slice(0,Ad):[]}function Hi(e){return typeof e=="string"&&Pd.test(e)}function Od(e){let t=ps(e[_d]).map(i=>{var r;let o=(r=gs(e[i]))==null?void 0:r.manifest;return o&&typeof o=="object"?o.main:void 0}),n=ps(e[Md]).flatMap(i=>{var r;let o=(r=gs(e[i]))==null?void 0:r.include;return Array.isArray(o)?o:[]});return[...t,...n].flatMap(i=>{let o=typeof i=="string"?i.split("/").pop():void 0;return o?[o]:[]})}function ps(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function gs(e){try{let t=e?JSON.parse(e):null;return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch(t){return null}}var Ud=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],$d="marketplace:installed:",Ss=`${$d}snippet:`,Hd="wsoltani/syncify",Kd="marketplace",bs={added:0,removed:1,unchanged:2};function oe(e){let t=new Map;for(let[n,i]of Ud)for(let o of Wd(e[n]))t.has(o)||t.set(o,Fd(o,i,e[o]));return[...t.values()]}function _n(e,t,n,i){let o=new Set(e.map(l=>l.key)),r=new Map(n.map(l=>[l.key,l])),a=[...e.map(l=>{let u=r.get(l.key);return w(g({},l),{change:u?"unchanged":"added",isNew:!u||u.sources.join(" ")!==l.sources.join(" ")})}),...n.filter(l=>!o.has(l.key)).map(l=>w(g({},l),{change:Ot(l,e)?"unchanged":"removed",isNew:!1}))].sort((l,u)=>bs[l.change]-bs[u.change]||l.name.localeCompare(u.name)),c={added:0,removed:0,unchanged:0};for(let l of a)c[l.change]+=1;return{items:a,counts:c,manual:zd(t,i)}}function Ot(e,t){return e.type==="extension"&&An(e)&&!t.some(An)}function An(e){var t;return((t=e.repo)==null?void 0:t.toLowerCase())===Hd}function zd(e,t){if(!e)return[];let n=De(e),i=De(t),o=[...n.extensions.filter(a=>!i.extensions.includes(a)).map(a=>({type:"extension",name:a})),...n.custom_apps.filter(a=>!i.custom_apps.includes(a)).map(a=>({type:"custom_app",name:a}))],r=n.current_theme;return r&&r!==Kd&&(r!==i.current_theme||n.color_scheme!==i.color_scheme)&&o.push(g({type:"theme",name:r},n.color_scheme?{scheme:n.color_scheme}:{})),o}function Fd(e,t,n){var l,u;let i=ws(n),o=ws(i==null?void 0:i.manifest),r=Pn(i==null?void 0:i.user),a=Pn(i==null?void 0:i.repo),c=(u=(l=Pn(i==null?void 0:i.title))!=null?l:Pn(o==null?void 0:o.name))!=null?u:e.startsWith(Ss)?e.slice(Ss.length):e.split("/").pop()||e;return{key:e,type:t,name:c,repo:t!=="snippet"&&r&&a?`${r}/${a}`:null,sources:jd(t,i),custom:t==="snippet"&&(i==null?void 0:i.custom)===!0}}function jd(e,t){return t?(e==="extension"?[t.extensionURL]:e==="theme"?[t.cssURL,t.schemesURL,...Array.isArray(t.include)?t.include:[]]:[]).filter(i=>typeof i=="string"&&i!==""):[]}function Pn(e){return typeof e=="string"&&e.trim()?e.trim():null}function Wd(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function ws(e){let t=e;if(typeof e=="string")try{t=JSON.parse(e)}catch(n){return null}return t&&typeof t=="object"&&!Array.isArray(t)?t:null}var Mn="spicetify-marketplace";var Ut="settings";async function ks(){let e=await Cs();if(e.kind!=="ok")return null;try{let t=await Is(e.db,"readonly",i=>i.getAll());if(!t)return null;let n={};for(let i of t)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(n[i.key]=i.value);return n}finally{e.db.close()}}async function vs(e,t=[]){let n=await Cs();if(n.kind==="unavailable")return"unavailable";let i=n.kind==="ok"?n.db:await Yd();if(!i)return"failed";try{return await Is(i,"readwrite",r=>{let a;for(let[c,l]of Object.entries(e))a=r.put({key:c,value:l});for(let c of t)a=r.delete(c);return a})===null?"failed":"written"}finally{i.close()}}function xs(){var e;try{return(e=window.indexedDB)!=null?e:null}catch(t){return null}}async function Cs(){let e=xs();return e?await Vd(e)?{kind:"missing"}:new Promise(t=>{let n=!1,i=e.open(Mn);i.onupgradeneeded=()=>{n=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),t({kind:"unavailable"})},i.onblocked=()=>t({kind:"unavailable"}),i.onsuccess=()=>{let o=i.result;if(n){o.close(),Gd(e).then(()=>t({kind:"missing"}));return}if(!o.objectStoreNames.contains(Ut)){o.close(),t({kind:"unavailable"});return}t({kind:"ok",db:o})}}):{kind:"unavailable"}}function Yd(){let e=xs();return e?new Promise(t=>{let n=e.open(Mn,1);n.onupgradeneeded=()=>{let i=n.result;i.objectStoreNames.contains(Ut)||i.createObjectStore(Ut,{keyPath:"key"})},n.onerror=()=>{console.warn("Syncify could not create Marketplace storage",n.error),t(null)},n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}async function Vd(e){if(typeof e.databases!="function")return!1;try{return!(await e.databases()).some(n=>n.name===Mn)}catch(t){return!1}}function Gd(e){return new Promise(t=>{let n=e.deleteDatabase(Mn);n.onsuccess=()=>t(),n.onerror=()=>t(),n.onblocked=()=>t()})}function Is(e,t,n){return new Promise(i=>{let o;try{o=e.transaction(Ut,t)}catch(u){console.warn("Syncify could not open a Marketplace transaction",u),i(null);return}let r,a=!1,c=u=>{a||(a=!0,i(u))};o.oncomplete=()=>c(r),o.onerror=()=>{console.warn("Syncify Marketplace transaction failed",o.error),c(null)},o.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",o.error),c(null)};let l;try{l=n(o.objectStore(Ut))}catch(u){console.warn("Syncify Marketplace request could not be issued",u),c(null);return}l&&(l.onsuccess=()=>{r=l.result},l.onerror=()=>{console.warn("Syncify Marketplace request failed",l.error),c(null)})})}var Fi="marketplace:",Bn=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function ge(){let e=sf(),t=await ks();if(t)for(let[n,i]of Object.entries(t))n.startsWith(Fi)&&(e[n]=i);return e}var Jd=new Set(["marketplace:active-tab","marketplace:sort"]),ji="marketplace:installed:",Ln="marketplace:theme-installed",Xd=["stars","tags","lastUpdated","created"],Zd=750*1024;async function Dn(e,t){let n={};for(let[i,o]of Object.entries(e))Jd.has(i)||(n[i]=i.startsWith(ji)?Qd(o):o);return t&&(n.spicetify_config=De(t)),En(q(n))}function Qd(e){try{let t=JSON.parse(e);if(!t||typeof t!="object"||Array.isArray(t))return e;for(let n of Xd)delete t[n];return t}catch(t){return e}}async function On(){let e=await ge(),t=Ki(e);return{keyCount:Object.keys(e).length,hash:await Dn(e,t),installedItemCount:of(e),installedItems:Un(e),items:oe(e),spicetifyConfig:t,marketplaceAvailable:rf(e),activeTheme:$t(e[Ln])}}function $t(e){if(!e)return null;if(e.startsWith(ji))return e;try{let t=JSON.parse(e);return typeof t=="string"?t:null}catch(t){return null}}async function Es(){let[e,t]=await Promise.all([ge(),ef()]),n=Ki(e),i=g({schema_version:3,metadata:{last_sync_datetime:new Date().toISOString(),device_info:is(),marketplace_key_count:Object.keys(e).length},payload_hash:await Dn(e,n),marketplace_data:{keys:e}},n?{spicetify_config:n}:{});if(Object.keys(t).length===0)return i;let o=new TextEncoder().encode(JSON.stringify(i)).byteLength,r=us(t,o,Zd);return Object.keys(r).length>0?w(g({},i),{extension_settings:r}):i}async function ef(){try{let e=await Ie();return e?(await ct(e)).settings:{}}catch(e){return{}}}async function Rs(e,t=[]){var r,a;let n={},i=(a=(r=e.marketplace_data)==null?void 0:r.keys)!=null?a:{};for(let[c,l]of Object.entries(i))c.startsWith(Fi)&&(n[c]=l);if(Object.keys(n).length===0)return 0;await tf(n),t.length>0&&await nf(n,t);let o=Yi(await ge(),n);return await Wi(n,o),Object.keys(n).length}async function Wi(e,t=[]){for(let[i,o]of Object.entries(e))window.localStorage.setItem(i,o);for(let i of t)window.localStorage.removeItem(i);if(await vs(e,t)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try again.")}function Yi(e,t){let n=new Set(Bn.flatMap(a=>{var c;return $n((c=t[a])!=null?c:e[a]).map(String)})),i=Un(e).filter(a=>a.startsWith(ji)&&!n.has(a)),o=i.filter(a=>e[a]!==void 0&&t[a]===void 0),r=e[Ln];return r&&t[Ln]===void 0&&i.some(a=>r.includes(a))&&o.push(Ln),o}async function tf(e){let t=await ge(),n=oe(e),i=oe(t).filter(a=>Ot(a,n));if(i.length===0)return;let o="marketplace:installed-extensions",r=$n(e[o]).map(String);for(let a of i)r.includes(a.key)||r.push(a.key),e[a.key]=t[a.key];e[o]=JSON.stringify(r)}async function nf(e,t){let n=await ge(),i=Un(n);for(let o of Bn){if(e[o]===void 0)continue;let r=$n(e[o]).map(String).filter(a=>!t.includes(a)||i.includes(a));e[o]=JSON.stringify(r)}for(let o of t)n[o]!==void 0?e[o]=n[o]:delete e[o]}function of(e){return Un(e).length}function Un(e){return Bn.flatMap(t=>$n(e[t]).map(String))}function rf(e){return!!(window.Marketplace||Bn.some(n=>e[n]!==void 0)||e["marketplace:tabs"]!==void 0)}function Ns(e,t){return t===0?!1:e===0?!0:e<Math.max(2,Math.floor(t*.5))}function sf(){let e={};for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);if(!(n!=null&&n.startsWith(Fi)))continue;let i=window.localStorage.getItem(n);i!==null&&(e[n]=i)}return e}function $n(e){if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch(t){return[]}}var af="raw.githubusercontent.com",cf="cdn.jsdelivr.net",Ts=".github.io";function Gi(e){var n;if(e.protocol!=="https:")return null;let t=e.pathname.split("/").filter(Boolean);if(e.host===af)return Vi(t[0],t[1]);if(e.host===cf)return t[0]==="gh"?Vi(t[1],(n=t[2])==null?void 0:n.split("@")[0]):null;if(e.host.endsWith(Ts)){let i=e.host.slice(0,-Ts.length);return i.includes(".")?null:Vi(i,t.length>1?t[0]:e.host)}return null}function Vi(e,t){return e&&t?`${e}/${t}`:null}var lf={extension:"spicetify-extensions",theme:"spicetify-themes"},uf="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",df="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",ff="https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/",yf="https://api.github.com/repos",mf=5e3,pf=20,Ps="syncify:repo-topics",As=10080*60*1e3,gf=200;function lt(e){return(e==null?void 0:e.kind)==="host"||(e==null?void 0:e.kind)==="repo"||(e==null?void 0:e.kind)==="blocked"||(e==null?void 0:e.kind)==="catalog"}function ut(e){let t=new Map;for(let n of e){if(n.change==="removed")continue;if(n.custom){t.set(n.key,{kind:"custom"});continue}let i=hf(n);i&&t.set(n.key,i)}return t}async function dt(e,t){let n=new Map,i=e.filter(a=>a.change!=="removed"&&a.isNew&&!t.has(a.key));if(i.length===0)return n;let o=i.filter(a=>a.type==="snippet"),r=i.filter(a=>a.type!=="snippet");if(o.length>0){let a=await qi();for(let c of o)a?Hn(a,c.name)||n.set(c.key,{kind:"catalog"}):n.set(c.key,{kind:"unchecked"})}if(r.length>0){let a=await wf(),c=xf(),l=0;await Promise.all(r.map(async u=>{let d=Sf(u),y=lf[u.type];if(!d||!y)return;if(a===null){n.set(u.key,{kind:"unchecked"});return}if(bf(d,a)){n.set(u.key,{kind:"blocked"});return}let f=vf(c,d);f===void 0&&l<pf&&(l+=1,f=await kf(d),f!==void 0&&(c[d.toLowerCase()]={topics:f,at:Date.now()})),f===void 0?n.set(u.key,{kind:"unchecked"}):(f===null||!f.includes(y))&&n.set(u.key,{kind:"catalog"})})),Cf(c)}return n}function hf(e){let t=null;for(let n of e.sources){let i;try{i=new URL(n)}catch(r){return{kind:"host",host:n.slice(0,40)}}let o=Gi(i);if(!o)return{kind:"host",host:i.host};e.repo&&o.toLowerCase()!==e.repo.toLowerCase()&&(t!=null||(t=o))}return t?{kind:"repo",repo:t}:null}function Sf(e){for(let t of e.sources)try{let n=Gi(new URL(t));if(n)return n}catch(n){}return e.repo}function bf(e,t){let n=`https://github.com/${e}`.toLowerCase();return t.some(i=>{let o=i.toLowerCase();if(!o.includes("*"))return o===n;let r=o.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${r}$`).test(n)})}function _s(e){return e.replace(/\n/g,"").trim().toLowerCase()}function Hn(e,t){return e.get(_s(t))}var Ht=null,Kt=null;function wf(){return Ht!=null||(Ht=Ms(uf).then(e=>{let t=e==null?void 0:e.repos;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&!n.startsWith("//")):(Ht=null,null)})),Ht}function qi(){return Kt!=null||(Kt=Ms(df).then(e=>{if(!Array.isArray(e))return Kt=null,null;let t=new Map;for(let n of e){if(typeof(n==null?void 0:n.title)!="string"||typeof n.code!="string")continue;let i=typeof n.preview=="string"?n.preview:null;t.set(_s(n.title),g({title:n.title,code:n.code,description:typeof n.description=="string"?n.description:""},i?{imageURL:i.startsWith("http")?i:`${ff}${i}`}:{}))}return t})),Kt}async function kf(e){let t=await Ls(`${yf}/${e}`);if((t==null?void 0:t.status)===404)return null;if(!(t!=null&&t.ok))return;let n=await t.json().catch(()=>null);return Array.isArray(n==null?void 0:n.topics)?n.topics.filter(i=>typeof i=="string"):void 0}async function Ms(e){let t=await Ls(e);return t!=null&&t.ok?t.json().catch(()=>null):null}async function Ls(e){let t=typeof AbortController=="function"?new AbortController:null,n=setTimeout(()=>t==null?void 0:t.abort(),mf);try{return await fetch(e,{signal:t==null?void 0:t.signal})}catch(i){return null}finally{clearTimeout(n)}}function vf(e,t){let n=e[t.toLowerCase()];return n&&Date.now()-n.at<As?n.topics:void 0}function xf(){var e;try{let t=JSON.parse((e=localStorage.getItem(Ps))!=null?e:"{}");return t&&typeof t=="object"?t:{}}catch(t){return{}}}function Cf(e){let t=Date.now(),n=Object.entries(e).filter(([,i])=>t-i.at<As).sort(([,i],[,o])=>o.at-i.at).slice(0,gf);try{localStorage.setItem(Ps,JSON.stringify(Object.fromEntries(n)))}catch(i){}}var If=/^[0-9A-HJKMNP-TV-Z]{6}$/,Ef=6,Rf="SYN-",Us=60,Ji=20,$s=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],je="marketplace:theme-installed",Bs="marketplace",Ds={added:0,removed:1,unchanged:2},Nf=new RegExp(`^[a-z0-9][a-z0-9_-]{1,${Ji-2}}[a-z0-9]$`);function Xi(e){let t=e.trim().replace(/^@/,"").toLowerCase();return/[^a-z0-9_-]/.test(t)?"Only letters, digits, _ and -":t.length<3?"At least 3 characters":!/^[a-z0-9]/.test(t)||!/[a-z0-9]$/.test(t)?"Start and end with a letter or digit":null}function Ee(e){return`${Rf}${e}`}function Hs(e){let t=e.trim();if(t.length>200)return null;if(t.includes("/")){let i=t.split(/[?#]/)[0].replace(/\/+$/,"");t=i.slice(i.lastIndexOf("/")+1).replace(/\.json$/i,"")}t=t.toUpperCase().replace(/[\s-]/g,""),t.length===Ef+3&&t.startsWith("SYN")&&(t=t.slice(3));let n=t.replace(/O/g,"0").replace(/[IL]/g,"1");return If.test(n)?n:null}function Ks(e){let t=e;return!t||typeof t.code!="string"||!t.keys||typeof t.keys!="object"||!Object.values(t.keys).every(n=>typeof n=="string")?null:{code:t.code,name:typeof t.name=="string"&&t.name?t.name:null,creator:typeof t.creator=="string"&&Nf.test(t.creator)?t.creator:null,updated_at:typeof t.updated_at=="number"?t.updated_at:0,keys:t.keys}}async function zs(e,t){let n=e.filter(a=>!An(a)).map(a=>w(g({},a),{change:"added",isNew:!0})),i=ut(n);for(let a of n)!i.has(a.key)&&!Tf(a,t[a.key])&&i.set(a.key,{kind:"catalog"});let o=await dt(n,i),r=new Map;for(let[a,c]of[...o,...i])c.kind!=="unchecked"&&r.set(a,c);return{items:n,leftOut:r}}function Tf(e,t){if(e.type==="snippet")return!0;if(!e.repo)return!1;let n=_f(t);return e.type==="extension"?typeof(n==null?void 0:n.extensionURL)=="string"&&n.extensionURL!=="":typeof(n==null?void 0:n.cssURL)=="string"&&n.cssURL!==""}function Fs(e,t){let n={};for(let[o,r]of $s){let a=t.filter(c=>c.type===r&&e[c.key]!==void 0).map(c=>c.key);n[o]=JSON.stringify(a);for(let c of a)n[c]=e[c]}let i=$t(e[je]);return i&&t.some(o=>o.key===i)&&(n[je]=e[je]),n}function js(e,t,n,i,o,r){let a=r==="replace"?_n(t,void 0,n,i):Pf(t,n),c=$t(e.keys[je]),l=c!==null&&t.some(d=>d.key===c)&&i!==null&&i.current_theme!==Bs,u=c!==null&&c!==o?t.find(d=>d.key===c):void 0;return g(w(g({},a),{manual:l?[{type:"theme",name:Bs}]:[]}),u?{theme:{key:u.key,name:u.name}}:{})}function Pf(e,t){let n=new Set(t.map(a=>a.key)),i=new Set(e.map(a=>a.key)),o=[...e.map(a=>n.has(a.key)?w(g({},a),{change:"unchanged",isNew:!1}):w(g({},a),{change:"added",isNew:!0})),...t.filter(a=>!i.has(a.key)).map(a=>w(g({},a),{change:"unchanged",isNew:!1}))].sort((a,c)=>Ds[a.change]-Ds[c.change]||a.name.localeCompare(c.name)),r={added:0,removed:0,unchanged:0};for(let a of o)r[a.change]+=1;return{items:o,counts:r,manual:[]}}function Ws(e,t){return new Set(e.items.filter(n=>n.type==="snippet"&&n.change==="added"&&(!t||!Hn(t,n.name))).map(n=>n.key))}async function Ys(e,t,n,i){let o=await ge(),r=oe(o),a=oe(e.keys),c={};for(let[y,f]of $s){let S=Os(o[y]),k=[...t==="add"?S:S.filter(m=>n.includes(m)||r.some(v=>v.key===m&&Ot(v,a)))];for(let m of a){if(m.type!==f||n.includes(m.key))continue;let v=S.includes(m.key);if(t==="add"&&v)continue;let A=f==="snippet"?Af(m,i,o[m.key]):e.keys[m.key];A!==void 0&&(c[m.key]=A,k.includes(m.key)||k.push(m.key))}c[y]=JSON.stringify(k)}let l=$t(e.keys[je]),u=Os(c["marketplace:installed-themes"]);l&&u.includes(l)&&!n.includes(l)&&(c[je]=e.keys[je]);let d=Yi(o,c);return await Wi(c,d),Object.keys(c).length+d.length}function Af(e,t,n){let i=t?Hn(t,e.name):void 0;return i?JSON.stringify(g({code:i.code,title:i.title,description:i.description},i.imageURL?{imageURL:i.imageURL}:{})):n}function Os(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function _f(e){try{let t=e?JSON.parse(e):null;return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch(t){return null}}var zt="/api/shares",Mf=`${zt}/update`,Lf=`${zt}/delete`,Bf=`${zt}/import`,Df="x-syncify-user-hash",Of="discover/presets.json",Uf={no_code:"This code doesn't exist.",too_many_codes:"You can't make more share codes. Delete one to make another.",daily_limit:"Too many changes to share codes today. Try again tomorrow.",too_large:"This setup is too big to share.",invalid_name:"Names can be up to 60 characters.",empty:"There's nothing to share yet. Install something from Marketplace first.",invalid_items:"Syncify couldn't read some items. Reload Spotify and try again.",source:"Some items don't load from GitHub. Reload Spotify and try again.",blocked:"Some items are on Marketplace's block list. Reload Spotify and try again.",custom_snippet:"Custom snippets can't be shared. Reload Spotify and try again.",unchecked:"Couldn't check Marketplace's block list. Try again in a minute.",publish_failed:"Couldn't publish the code. Press Update on it to try again.",delete_failed:"Couldn't delete the code. Try again.",same_setup:"You already shared this setup.",invalid_handle:"Handles are 3 to 20 letters, digits, _ or -, starting and ending with a letter or digit.",reserved_handle:"That handle isn't allowed. Pick another.",handle_taken:"That handle is taken. Pick another.",unavailable:"Share codes aren't available yet."},$f=new Set(["offline","signed_out","invalid_signature","stale_salt","no_device_key","too_many_requests"]);function Ft(e,t=null){var n;return e instanceof U&&$f.has(e.code)?Be(e):e instanceof U&&e.code==="too_many_codes"&&t!==null?`You have ${t} share codes already. Delete one to make another.`:(n=e instanceof U?Uf[e.code]:void 0)!=null?n:"Something went wrong. Try again."}async function Kn(){var t;let e=await At(zt,"GET");return{codes:Array.isArray(e==null?void 0:e.codes)?e.codes.flatMap(n=>{let i=Hf(n);return i?[i]:[]}):[],newHearts:typeof(e==null?void 0:e.new_hearts)=="number"?e.new_hearts:0,max:typeof(e==null?void 0:e.max)=="number"?e.max:null,profile:typeof((t=e==null?void 0:e.profile)==null?void 0:t.handle)=="string"?{handle:e.profile.handle,link:typeof e.profile.link=="string"?e.profile.link:null}:null,suggestedHandle:typeof(e==null?void 0:e.suggested_handle)=="string"?e.suggested_handle:null}}async function Vs(e,t,n){return ea(await At(zt,"POST",g({name:e,keys:t},n===void 0?{}:{handle:n})))}function Gs(e){return`${$().shareUrl.replace(/\/+$/,"")}/@${e}`}async function qs(e,t,n){return ea(await At(Mf,"POST",{code:e,name:t,keys:n}))}async function Js(e){try{await At(Lf,"POST",{code:e})}catch(t){if(t instanceof U&&t.code==="no_code")return;throw t}}async function Xs(e){let t=$().shareUrl.replace(/\/+$/,""),n;try{n=await fetch(`${t}/${e}.json`)}catch(o){throw new U("offline")}if(n.status===404||n.status===403)throw new U("no_code");if(!n.ok)throw new U("failed");let i=Ks(await n.json().catch(()=>null));if(!i||i.code!==e)throw new U("no_code");return i}async function Zs(){let e=$().shareUrl.replace(/\/+$/,"");try{let t=await fetch(`${e}/${Of}`);if(!t.ok)return null;let n=await t.json();return Array.isArray(n.posts)?n.posts.flatMap(i=>{let o=zf(i);return o?[o]:[]}):null}catch(t){return null}}async function Qs(e,t,n=!1){try{await Vr(Bf,g({code:e},n?{source:"preset"}:{}),{[Df]:t.hash})}catch(i){}}function Hf(e){let t=e;return!t||typeof t.code!="string"?null:{code:t.code,name:typeof t.name=="string"&&t.name?t.name:null,link:typeof t.link=="string"?t.link:null,item_count:typeof t.item_count=="number"?t.item_count:0,imports:typeof t.imports=="number"?t.imports:0,created_at:typeof t.created_at=="number"?t.created_at:0,updated_at:typeof t.updated_at=="number"?t.updated_at:0,posted:Kf(e.post)}}function Kf(e){let t=e==null?void 0:e.status;return typeof t=="string"&&t!=="removed"}function zf(e){let t=e,n=i=>Number.isSafeInteger(i)&&i>=0?i:0;return!t||typeof t.code!="string"?null:{code:t.code,name:typeof t.name=="string"?t.name:Ee(t.code),extensions:n(t.extensions),themes:n(t.themes),snippets:n(t.snippets)}}function ea(e){let t=e;if(typeof(t==null?void 0:t.code)!="string")throw new U("failed");return{code:t.code,link:typeof t.link=="string"?t.link:null,leftOut:Array.isArray(t.left_out)?t.left_out.length:0}}var Ff="/claims",jf={no_backup:"Back up first, then secure your backup.",unsupported_identity:"This backup can't be secured.",too_many_accounts:"Your account already secures 10 backups.",accounts_full:"This backup is already secured by 3 Syncify accounts.",undone:"This backup can't be secured with your account.",offline:"Couldn't reach Syncify. Check your connection and try again."},jt=class extends Error{constructor(n){var i;super((i=jf[n])!=null?i:"Couldn't secure your backup. Try again.");this.code=n;this.name="ClaimError"}};async function ta(e,t){let n=await ia(e,t,"GET");if(!n.ok)throw new jt(await oa(n));let i=await n.json().catch(()=>null);return{claim:Cn(i==null?void 0:i.claim),accounts:Array.isArray(i==null?void 0:i.accounts)?i.accounts.filter(Wf):null}}async function na(e,t){let n=await ia(e,t,"POST");if(!n.ok)throw new jt(await oa(n))}async function ia(e,t,n){try{return await Ce(e,t,{method:n},Ff)}catch(i){throw i instanceof TypeError?new jt("offline"):i}}async function oa(e){let t=await e.json().catch(()=>null);return typeof(t==null?void 0:t.code)=="string"?t.code:"failed"}function Wf(e){let t=e;return!!(t&&typeof t.hash=="string"&&(t.status==="final"||t.status==="unlinked"))}var ra="[Syncify]";function re(e,...t){console.debug(ra,e,...t)}function se(e,...t){console.warn(ra,e,...t)}var yt={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},Yf=/^([a-z0-9]|f([1-9]|1[0-2]))$/,Vf=250,Gf=40,Zi=null,zn=null,ft=null;function sa(){return/mac/i.test(navigator.platform||navigator.userAgent)}function aa(e){if(e===null)return null;if(!e||typeof e!="object")return yt;let t=e;return typeof t.key!="string"||!Yf.test(t.key)?yt:{key:t.key,ctrl:!!t.ctrl,alt:!!t.alt,shift:!!t.shift,meta:!!t.meta}}function Wt(e){if(!e)return"Off";let t=e.key.toUpperCase();return sa()?[e.ctrl?"\u2318":"",e.alt?"\u2325":"",e.shift?"\u21E7":"",t].join(""):[e.ctrl&&"Ctrl",e.meta&&"Win",e.alt&&"Alt",e.shift&&"Shift",t].filter(Boolean).join("+")}function ca(e){if(e.key==="Escape")return{kind:"cancel"};let t=qf(e.code);if(!t)return{kind:"ignore"};let n=sa();if(n&&e.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:t,ctrl:n?e.metaKey:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:n?!1:e.metaKey},o=t.startsWith("f")&&t.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!o?{kind:"error",message:`Include ${n?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function qf(e){var n,i;let t=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(e);return t?((i=(n=t[1])!=null?n:t[2])!=null?i:t[3]).toLowerCase():null}function la(e){var t;if(ft&&Jf(ft,e))return!1;try{let n=Spicetify.Mousetrap,i=(t=n.trigger)==null?void 0:t.call(n)._directMap;if(!i)return!1;let o=Qi(e);return Object.keys(i).some(r=>r.startsWith(`${o}:`))}catch(n){return!1}}function eo(e,t,n=0){if(Zi=t,zn=e,!ua()){if(n>=Gf){se("Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>eo(zn,t,n+1),Vf);return}to(zn)}function to(e){if(zn=e,!ua()||!Zi)return;let t=Zi;try{if(ft&&Spicetify.Keyboard._deregisterShortcut(ft),ft=null,!e)return;Spicetify.Keyboard.registerShortcut(e,n=>{n.preventDefault(),t()}),ft=e,re("Keyboard shortcut registered",Wt(e))}catch(n){se("Failed to register keyboard shortcut",n)}}function ua(){var e;return typeof((e=Spicetify.Keyboard)==null?void 0:e.registerShortcut)=="function"}function Qi(e){return[e.ctrl&&"mod",e.meta&&"meta",e.alt&&"alt",e.shift&&"shift",e.key].filter(Boolean).join("+")}function Jf(e,t){return Qi(e)===Qi(t)}var no="both",Xf=["both","topbar","menu"],Yt=null,Vt=null,Fn=!1;function da(e){return Xf.includes(e)?e:no}function jn(){var e;return typeof((e=Spicetify.Menu)==null?void 0:e.Item)=="function"}function fa(e){Yt=e.topbarButton,Vt=e.menuItem}function Wn(e){let t=e!=="menu"||!Vt,n=e!=="topbar";if(Yt!=null&&Yt.element&&(Yt.element.style.display=t?"":"none"),!!Vt)try{n&&!Fn?(Vt.register(),Fn=!0):!n&&Fn&&(Vt.deregister(),Fn=!1)}catch(i){se("Failed to update profile menu item",i)}}var Yn="syncify:config",mt={workerUrl:$().workerUrl,autoBackupEnabled:!1,shortcut:yt,entryPoint:no,settingsSyncEnabled:!0,settingsSyncOff:[],shareRestoredSettings:!0};function G(){var n,i;let e=$(),t=(i=(n=Spicetify.LocalStorage)==null?void 0:n.get(Yn))!=null?i:window.localStorage.getItem(Yn);if(!t)return w(g({},mt),{workerUrl:e.workerUrl});try{let o=JSON.parse(t);return{workerUrl:e.workerUrl,autoBackupEnabled:io(o.autoBackupEnabled,mt.autoBackupEnabled),shortcut:o.shortcut===void 0?mt.shortcut:aa(o.shortcut),entryPoint:da(o.entryPoint),settingsSyncEnabled:io(o.settingsSyncEnabled,mt.settingsSyncEnabled),settingsSyncOff:Zf(o.settingsSyncOff),shareRestoredSettings:io(o.shareRestoredSettings,mt.shareRestoredSettings)}}catch(o){return w(g({},mt),{workerUrl:e.workerUrl})}}function We(e){var n;let t=JSON.stringify({workerUrl:$().workerUrl,autoBackupEnabled:e.autoBackupEnabled,shortcut:e.shortcut,entryPoint:e.entryPoint,settingsSyncEnabled:e.settingsSyncEnabled,settingsSyncOff:e.settingsSyncOff,shareRestoredSettings:e.shareRestoredSettings});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set(Yn,t);return}window.localStorage.setItem(Yn,t)}function Zf(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function io(e,t){return e===void 0?t:!!e}function Gt(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}var Qf=["username","canonicalUsername","id","uri","displayName"];async function he(){let{value:e,field:t}=await ey();return{hash:await En(e),field:t}}async function ey(){var o;let e=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let t=await e.getUser(),n=Qf.find(r=>(t==null?void 0:t[r])!=null),i=n?t[n]:void 0;if(!n||!i)throw new Error("Unable to resolve the active Spotify user.");return{value:i,field:n}}async function Ye(e,t){if(!Gt(e))throw new Error("Syncify backup service is not configured.");let[n,i]=await Promise.all([he(),Es()]);if(i.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:o,settings:r}=await Zr(e.workerUrl,n,i,t==null?void 0:t.part);return{payload:i,unchanged:o,settings:r}}async function Ve(e,t,n){var f;if(!Gt(e))throw new Error("Syncify backup service is not configured.");let i=await Oi(e.workerUrl,await he(),t,n==null?void 0:n.part),[o,r,a,c,l]=await Promise.all([Promise.all(i.backups.map(qt)),i.safetyCopy?qt(i.safetyCopy):null,Promise.all(i.pinned.map(qt)),Promise.all(i.others.map(qt)),Promise.all(i.unapproved.map(qt))]),u=S=>S.filter((b,k)=>S.findIndex(m=>m.payload_hash===b.payload_hash)===k),d=u(o),y=S=>!d.some(b=>b.payload_hash===S.payload_hash);return w(g({},i),{payload:(f=d[0])!=null?f:null,backups:d,safetyCopy:r,pinned:a,others:u(c).filter(y),unapproved:l.filter(y)})}var oo=new Map;async function qt(e){var r,a,c;let t=(a=(r=e.marketplace_data)==null?void 0:r.keys)!=null?a:{},n=e.spicetify_config?zi(e.spicetify_config,t):void 0,i=`${e.payload_hash} ${(c=e.metadata)==null?void 0:c.last_sync_datetime}`,o=oo.get(i);return o||(o=Dn(t,n),oo.set(i,o),o.catch(()=>oo.delete(i))),w(g(g({},e),n?{spicetify_config:n}:{}),{payload_hash:await o})}async function ya(e,t){let n=await Oi(Vn(e),await he(),void 0,t==null?void 0:t.part);return{claim:n.claim,install:n.install,nudge:n.nudge,backups:n.backups,settings:n.settings}}async function ma(e,t,n,i=[],o={ids:[],share:!1}){var l;let r=t!=null?t:(await Ve(e)).payload;if(!r)throw new Error("No Syncify cloud backup was found for this Spotify username.");await ty(r,o);let a=await Rs(r,i),c=(l=r.backup)==null?void 0:l.id;return c&&Gt(e)&&he().then(u=>ts(e.workerUrl,u,c,n)).catch(()=>{}),{payload:r,restoredCount:a}}async function ty(e,t){if(t.ids.length===0||!e.extension_settings)return;let n=await Ie();n&&(await Tn(n,e.extension_settings,t.ids),await cs(g({at:Date.now()},t)))}var Jt=class extends Error{constructor(n){super("Couldn't back up your setup first, so nothing changed.");this.reason=n;this.name="SafetyBackupError"}};async function pa(e,t,n,i,o,r=!1){try{await Ye(e)}catch(c){throw new Jt(c)}let a=await Ys(t,n,i,o);return he().then(c=>Qs(t.code,c,r)).catch(()=>{}),a}async function ga(e){let t=await he(),n=await ta(Vn(e),t);return w(g({},n),{hash:t.hash})}async function ha(e){await na(Vn(e),await he())}async function Sa(e,t,n){await Qr(Vn(e),await he(),t,n)}function Vn(e){if(!Gt(e))throw new Error("Syncify backup service is not configured.");return e.workerUrl}function Ge(e){var t,n;return(n=(t=Spicetify.LocalStorage)==null?void 0:t.get(e))!=null?n:window.localStorage.getItem(e)}function qe(e,t){var n;(n=Spicetify.LocalStorage)!=null&&n.set?Spicetify.LocalStorage.set(e,t):window.localStorage.setItem(e,t)}var ba="syncify:claim-not-me";function Xt(e){return!e||e.mine||Ge(ba)===wa(e)?null:e}function Gn(e){qe(ba,wa(e))}function wa(e){return`final ${e.emails.join(" ")}`}var ka="syncify:nudge-hidden-until",va="syncify:nudge-panel-shown",ny=30,iy=864e5;function xa(e=Date.now()){let t=Number(Ge(ka));return Number.isFinite(t)&&t>e}function Ca(e=Date.now()){qe(ka,String(e+ny*iy))}function Ia(){return Ge(va)!==null}function Ea(){qe(va,"1")}var Na="settings-sync",Jn="syncify:settings-sync",oy=17946e8,ry={since:0,pulled:!1,firstSyncDone:!1,account:{},base:{},seen:{},heldSent:{},deleted:{}},Ra={bytes:0,limit:0,items:[],choices:[],arrived:null,budgetDay:null},ro=new Set;function Re(){var t,n;let e=(n=(t=Spicetify.LocalStorage)==null?void 0:t.get(Jn))!=null?n:window.localStorage.getItem(Jn);if(!e)return Ra;try{let i=JSON.parse(e);return{bytes:typeof i.bytes=="number"?i.bytes:0,limit:typeof i.limit=="number"?i.limit:0,items:Array.isArray(i.items)?i.items:[],choices:Array.isArray(i.choices)?i.choices:[],arrived:i.arrived&&Array.isArray(i.arrived.ids)?i.arrived:null,budgetDay:typeof i.budgetDay=="string"?i.budgetDay:null}}catch(i){return Ra}}function pt(e){var n;let t=JSON.stringify(e);(n=Spicetify.LocalStorage)!=null&&n.set?Spicetify.LocalStorage.set(Jn,t):window.localStorage.setItem(Jn,t);for(let i of ro)i(e)}function Qn(e){return ro.add(e),()=>ro.delete(e)}function Ta(){let e=Re();e.arrived&&pt(w(g({},e),{arrived:null}))}function Pa(){let e=Re();e.arrived&&pt(w(g({},e),{arrived:w(g({},e.arrived),{hidden:!0})}))}function ei(e){return`${e.length>=3?`${e[0]}, ${e[1]} and ${e.length-2} more`:e.join(" and ")} ${e.length===1?"has":"have"} new extension settings`}async function Zt(e){var y;if(!e.settingsSyncEnabled||!await te().catch(()=>null))return null;let t=await Ie();if(!t)return null;let n=await Qt(),i=await Da(t);await ay(n,i);let o=Re(),r=new Set(e.settingsSyncOff),a=new Set(o.choices.map(f=>f.id)),c=n.pulled&&o.budgetDay!==Ka(Date.now()),l={},u=new Set;if(c)for(let f of t.items){let S=i.get(f.id);if(r.has(f.id)||a.has(f.id)||!S)continue;let b=Zn(S);if(b>f.limit){n.heldSent[f.id]!==b&&(l[f.id]={held:b},u.add(f.id));continue}let k=(y=n.base[f.id])!=null?y:sy(n,f.id)?{}:void 0;if(k===void 0)continue;let m=py(f,S,k);m&&(l[f.id]=m,u.add(f.id))}return{part:JSON.stringify(w(g({since:n.since},u.size>0?{changes:l}:{}),{installed:[...i.keys()]})),registry:t,local:i,sent:u}}function sy(e,t){let n=e.account[t];return!n||n.off===!0||n.data===null}async function ay(e,t){var i;let n=await pe(Nn).catch(()=>{});if(n){if(!n.share){for(let o of n.ids){e.base[o]=(i=t.get(o))!=null?i:{};let r=e.account[o];r!=null&&r.data&&(e.seen[o]=q(r.data))}await ni(e)}await pn(Nn).catch(()=>{})}}var cy={arrived:[],choose:!1};async function ti(e,t,n){let i=e?ly(t):null;if(!e||!i)return cy;let{registry:o,local:r}=e,a=Date.now(),c=await Qt(),l=G(),u=new Set(l.settingsSyncOff),d=Re(),y=[];for(let[m,v]of Object.entries(i.items))c.account[m]=v;c.since=i.version,c.pulled=!0;let f=new Set([...Object.entries(i.items).flatMap(([m,v])=>v.off?[m]:[]),...Object.entries(i.results).flatMap(([m,v])=>v==="off"?[m]:[])]);for(let m of f)c.deleted[m]!==void 0&&!u.has(m)||(u.add(m),Ha(c,m));for(let[m,v]of Object.entries(c.deleted))v<=i.version&&delete c.deleted[m];let S=new Map(o.items.map(m=>[m.id,m])),b=[];for(let m of o.items){let v=r.get(m.id);if(u.has(m.id)||!v)continue;let A=e.sent.has(m.id)?i.results[m.id]:void 0;if(A==="held"){c.heldSent[m.id]=Zn(v);continue}if(Zn(v)>m.limit||(delete c.heldSent[m.id],A!==void 0&&A!=="saved"))continue;let T=c.account[m.id];if(!(T!=null&&T.data)||T.off)continue;let C=so(T),I=q(T.data),M=c.base[m.id],N=async B=>{if(!qn(m,v,C)){if(!await Ua(o,m,T))return;(B||!T.mine)&&y.push(m.id)}c.base[m.id]=C,c.seen[m.id]=I};A==="saved"?await N(!0):M===void 0?c.firstSyncDone||qn(m,v,C)?await N(!1):b.push(m.id):c.seen[m.id]!==I&&qn(m,v,M)&&await N(!1)}b.length===0&&(c.firstSyncDone=!0);let k=Bt(o.items);return await ni(c),u.size!==l.settingsSyncOff.length&&We(w(g({},l),{settingsSyncOff:[...u]})),pt(w(g({},Ba(o,c,r,k,i.bytes)),{choices:b.flatMap(m=>{var T;let v=k.get(m),A=S.get(m);return!v||!A?[]:[{id:m,name:v.name,kind:v.kind,localAt:uy(A,(T=r.get(m))!=null?T:{},n,a),accountAt:dy(c.account[m])}]}),arrived:Aa(d.arrived,y,k),budgetDay:i.budget==="used_up"?Ka(a):null})),{arrived:y.map(m=>{var v,A;return(A=(v=k.get(m))==null?void 0:v.name)!=null?A:m}),choose:b.length>0}}function Aa(e,t,n){var r;if(t.length===0)return e;let i=[...new Set([...(r=e==null?void 0:e.ids)!=null?r:[],...t])],o=new Map(e?e.ids.map((a,c)=>[a,e.names[c]]):[]);return{ids:i,names:i.map(a=>{var c,l,u;return(u=(l=(c=n.get(a))==null?void 0:c.name)!=null?l:o.get(a))!=null?u:a}),hidden:!1}}function ly(e){if(!fe(e)||e.status!=="ok"||!Number.isSafeInteger(e.version)||typeof e.bytes!="number")return null;let t={};for(let i of Array.isArray(e.items)?e.items:[]){if(!fe(i)||typeof i.id!="string"||typeof i.size!="number")continue;let o=fe(i.data)?i.data:null;t[i.id]=g(g(g({data:o,size:i.size},typeof i.held=="number"?{held:i.held}:{}),i.off===!0?{off:!0}:{}),i.mine===!0?{mine:!0}:{})}let n={};if(fe(e.results))for(let[i,o]of Object.entries(e.results))typeof o=="string"&&(n[i]=o);return{version:e.version,bytes:e.bytes,budget:e.budget==="used_up"?"used_up":"open",results:n,items:t}}async function _a(e){let t=await Ie();if(!t)return;let n=await Qt(),i=Re(),o=[];for(let[a,c]of Object.entries(e)){let l=t.items.find(d=>d.id===a),u=n.account[a];!l||!(u!=null&&u.data)||u.off||(c==="account"&&await Ua(t,l,u)&&o.push(a),n.base[a]=so(u),n.seen[a]=q(u.data))}n.firstSyncDone=!0,await ni(n);let r=new Map(i.choices.map(a=>[a.id,{id:a.id,key:"",name:a.name,kind:a.kind}]));pt(w(g({},i),{choices:[],arrived:Aa(i.arrived,o,r)}))}function uy(e,t,n,i){var r;if(e.storage.type==="indexedDB"&&e.storage.valueField){let a=Object.values(t).flatMap(c=>fe(c)&&typeof c.ts=="number"?[c.ts]:[]);if(a.length>0)return Math.max(...a)}let o=i;for(let a of n){let c=(r=a.extension_settings)==null?void 0:r[e.id];if(!c||c.storage!==e.storage.type||!qn(e,t,Oa(e,c.values)))break;let l=Date.parse(a.metadata.last_sync_datetime);if(Number.isNaN(l))break;o=l}return o}function dy(e){var t;return Math.max(0,...Object.values((t=e==null?void 0:e.data)!=null?t:{}).map(n=>n.t))}async function Ma(e,t){if(!e.workerUrl)throw new Error("Syncify backup service is not configured.");let{version:n}=await es(e.workerUrl,await he(),t),i=await Qt();i.deleted[t]=n,i.account[t]={data:null,size:0,off:!0},Ha(i,t),await ni(i);let o=G();o.settingsSyncOff.includes(t)||We(w(g({},o),{settingsSyncOff:[...o.settingsSyncOff,t]}));let r=Re();pt(w(g({},r),{items:r.items.map(a=>a.id===t?w(g({},a),{hold:null}):a)}))}async function La(){let e=await Ie();if(!e)return Re().items;let[t,n]=await Promise.all([Qt(),Da(e)]),i=Bt(e.items),o=Re(),r=Ba(e,t,n,i,o.bytes);return pt(g(g({},o),r)),r.items}function fy(e){return[...e].sort((t,n)=>+(n.hold!==null)-+(t.hold!==null)||t.name.localeCompare(n.name))}function Ba(e,t,n,i,o){let r=e.items.flatMap(a=>{var S;let c=n.get(a.id);if(!c)return[];let l=Zn(c),u=t.account[a.id],d=l>a.limit?{size:l,reason:"too_big"}:(u==null?void 0:u.held)!==void 0&&!u.off?{size:u.held,reason:u.held>a.limit?"too_big":"account_full"}:null,y=(S=i.get(a.id))!=null?S:{id:a.id,key:"",name:a.id,kind:"extension"},f=u&&!u.off?u.size:0;return[w(g({},y),{size:l,limit:a.limit,list:Object.keys(a.lists).length>0,accountSize:f,hold:d})]});return{bytes:o,limit:e.accountLimit,items:fy(r)}}async function Da(e){let{settings:t}=await ct(e),n=new Map;for(let i of e.items){let o=t[i.id];o&&n.set(i.id,Oa(i,o.values))}return n}function Oa(e,t){var i;let n={};for(let[o,r]of Object.entries(t))_e(e,o)&&(n[o]=e.lists[o]&&(i=yy(e,o,r))!=null?i:r);return n}function yy(e,t,n){let i=e.lists[t],o=n;if(e.storage.type==="localStorage"){if(typeof n!="string")return null;try{o=JSON.parse(n)}catch(r){return null}}else e.storage.valueField&&fe(n)&&(o=n[e.storage.valueField]);return Xn(i,o)?o:null}function Xn(e,t){return e?e.merge==="object"?fe(t):Array.isArray(t):!1}function my(e,t,n){let i={};for(let[o,r]of Object.entries(t)){if(!_e(e,o))continue;let a=e.lists[o]&&Xn(e.lists[o],r);e.storage.type==="localStorage"?a?i[o]=JSON.stringify(r):typeof r=="string"&&(i[o]=r):a&&e.storage.valueField?i[o]=w(g({},fe(n[o])?n[o]:{}),{[e.storage.valueField]:r}):i[o]=r}return i}async function Ua(e,t,n){var c,l;let{settings:i}=await ct(w(g({},e),{items:[t]})),o=(l=(c=i[t.id])==null?void 0:c.values)!=null?l:{},r=my(t,so(n),o);if(Object.keys(r).length===0)return!1;let a={[t.id]:{storage:t.storage.type,values:r}};try{return await Tn(e,a,[t.id]),!0}catch(u){return!1}}function so(e){var n;let t={};for(let[i,o]of Object.entries((n=e.data)!=null?n:{}))fe(o)&&o.v!==null&&o.v!==void 0&&(t[i]=o.v);return t}function Zn(e){let t={};for(let[n,i]of Object.entries(e))t[n]={v:i,t:oy};return Object.keys(t).length===0?0:new TextEncoder().encode(JSON.stringify(t)).byteLength}function qn(e,t,n){return[...new Set([...Object.keys(t),...Object.keys(n)])].every(o=>$a(e,o,t[o],n[o]))}function $a(e,t,n,i){if(n===void 0||i===void 0)return n===i;let o=e.storage.type==="indexedDB"&&!e.lists[t]?e.storage.valueField:void 0,r=a=>o&&fe(a)?a[o]:a;return q(r(n))===q(r(i))}function py(e,t,n){let i={},o={};for(let a of new Set([...Object.keys(t),...Object.keys(n)])){let c=t[a],l=n[a];if($a(e,a,c,l))continue;let u=e.lists[a],d=u&&c!==void 0?gy(u,c,l):null;d?o[a]=d:i[a]=c===void 0?null:c}let r=g(g({},Object.keys(i).length>0?{set:i}:{}),Object.keys(o).length>0?{lists:o}:{});return Object.keys(r).length>0?r:null}function gy(e,t,n){if(!Xn(e,t))return null;let i=Xn(e,n)?n:e.merge==="object"?{}:[];if(e.merge==="object"){let d=t,y=i,f=Object.fromEntries(Object.entries(d).filter(([b,k])=>q(k)!==q(y[b]))),S=Object.keys(y).filter(b=>!(b in d));return g(g({},Object.keys(f).length>0?{put:f}:{}),S.length>0?{remove:S}:{})}let o=d=>{let y=fe(d)?d[e.id]:void 0;return typeof y=="string"||typeof y=="number"?y:null},r=t;if(r.some(d=>o(d)===null))return null;let a=new Map(i.flatMap(d=>o(d)===null?[]:[[JSON.stringify(o(d)),d]])),c=r.filter(d=>q(d)!==q(a.get(JSON.stringify(o(d))))),l=new Set(r.map(d=>JSON.stringify(o(d)))),u=[...a.entries()].filter(([d])=>!l.has(d)).flatMap(([,d])=>{var y;return(y=o(d))!=null?y:[]});return g(g({},c.length>0?{put:c}:{}),u.length>0?{remove:u}:{})}async function Qt(){let e=await pe(Na).catch(()=>{});return g(g({},structuredClone(ry)),fe(e)?e:{})}function ni(e){return de(Na,e)}function Ha(e,t){delete e.base[t],delete e.seen[t],delete e.heldSent[t]}function Ka(e){return new Date(e).toISOString().slice(0,10)}function fe(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}var hy=60,za="syncify:claim-check-day";async function Fa(e){var n,i;let t=G();if(Ta(),!!t.workerUrl){if(!t.autoBackupEnabled)return Sy(e);try{let o=await Zt(t).catch(()=>null),[r,a]=await Promise.all([On(),Ve(t,void 0,o)]),c=await ja(o,a);if(Wa(a,e,c),Xt(a.claim)&&!a.exists)return;let l=(i=(n=a.payload)==null?void 0:n.metadata.marketplace_key_count)!=null?i:0;if(!a.borrowed&&a.backups.some(d=>d.payload_hash===r.hash))return;let u=[a.safetyCopy,...a.pinned].some(d=>(d==null?void 0:d.payload_hash)===r.hash);if(a.exists&&!u&&Ns(r.keyCount,l)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(r.keyCount===0)return;try{await Ye(t)}catch(d){let y=d instanceof Lt?d.retryAfter:null;if(y===null||y>hy)throw d;await new Promise(f=>setTimeout(f,y*1e3)),await Ye(t)}Spicetify.showNotification("Syncify auto-backup complete")}catch(o){let r=o instanceof Error?o.message:String(o);console.warn("Syncify startup sync failed:",o),Spicetify.showNotification(`Syncify auto-sync skipped: ${r}`,!0,8e3)}}}async function Sy(e){let t=new Date().toLocaleDateString("en-CA");if(Ge(za)!==t)try{let n=G(),i=await Zt(n).catch(()=>null),o=await ya(n,i);qe(za,t);let r=await ja(i,o);Wa(o,e,r)}catch(n){console.warn("Syncify launch check failed:",n)}}async function ja(e,t){if(!e)return!1;try{let n=await ti(e,t.settings,t.backups);return n.arrived.length>0&&Spicetify.showNotification(ei(n.arrived)),n.choose}catch(n){return console.warn("Syncify extension settings sync failed:",n),!1}}function Wa(e,t,n){var r;let i=Xt(e.claim),o=(r=e.install)==null?void 0:r.waiting[0];i?t.onSecuredElsewhere(i):o?t.onInstall(o):e.nudge&&!Ia()?t.onNudge():n&&t.onFirstSync()}var co="syncify:pending-restore",by=600*1e3,wy=2e3,ky=15e3,vy="marketplace:theme-installed",xy="raw.githubusercontent.com",Cy=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],Ne=null,ao=new Set,Ga=new Map;function qa(){return Ne}function Ja(e){return ao.add(e),()=>ao.delete(e)}function Xa(){Ne&&nc(w(g({},Ne),{manual:[]}))}function tn(e,t="restore"){try{localStorage.setItem(co,JSON.stringify({at:Date.now(),manual:e,kind:t}))}catch(n){}}function Za(){var e;tn((e=Ne==null?void 0:Ne.manual)!=null?e:[],Ne==null?void 0:Ne.kind),window.location.reload()}function Qa(){ic()&&(document.addEventListener("load",e=>Ya(e.target,"load"),!0),document.addEventListener("error",e=>Ya(e.target,"error"),!0))}async function ec(){let e=ic();if(!e)return;try{localStorage.removeItem(co)}catch(a){}let t=Date.now(),n=await Va();for(;n.loaded<n.total&&Date.now()-t<ky;)await new Promise(a=>setTimeout(a,wy)),n=await Va();nc(w(g({kind:e.kind,at:Date.now()},n),{manual:e.manual}));let i=n.loaded===n.total&&e.manual.length===0,o=e.kind==="share"?"Setup applied":"Backup restored",r=e.kind==="share"?"loaded":"restored";Spicetify.showNotification(i?`Syncify: ${o}; ${n.total} ${n.total===1?"item":"items"}`:`Syncify: ${r} ${n.loaded} of ${n.total}. Open Syncify for details.`,!1,8e3)}function tc(e){let t=e.map(n=>n.type==="extension"?`spicetify config extensions ${ii(n.name)}`:n.type==="custom_app"?`spicetify config custom_apps ${ii(n.name)}`:`spicetify config current_theme ${ii(n.name)}${n.scheme?` color_scheme ${ii(n.scheme)}`:""}`);return t.length>0?[...t,"spicetify apply"]:[]}function ii(e){return/^[\w.@+/-]+$/.test(e)?e:`"${e}"`}function nc(e){Ne=e;for(let t of ao)t(e)}function ic(){var e;try{let t=JSON.parse((e=localStorage.getItem(co))!=null?e:"null");return!t||Date.now()-t.at>by?null:{manual:Array.isArray(t.manual)?t.manual:[],kind:t.kind==="share"?"share":"restore"}}catch(t){return null}}function Ya(e,t){e instanceof HTMLScriptElement&&e.src&&Ga.set(en(e.src),t)}async function Va(){var i;let e=await ge(),t=(i=e[vy])!=null?i:"",n=oe(e).filter(o=>o.type==="extension"&&o.sources.length>0||o.type==="theme"&&t.includes(o.key)||o.type==="snippet");return{loaded:n.filter(Iy).length,total:n.length}}function Iy(e){var t,n;if(e.type==="snippet"){let i=document.querySelector("style.marketplaceSnippets");return((t=i==null?void 0:i.textContent)==null?void 0:t.includes(`/* ${e.name} - `))===!0}if(e.type==="theme"){let i=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((n=i==null?void 0:i.textContent)!=null&&n.trim())}return Ey(e.sources[0]).some(Ry)}function Ey(e){let t;try{t=new URL(e)}catch(a){return[]}if(t.host!==xy)return[en(t.href)];let[n,i,o,...r]=t.pathname.split("/").filter(Boolean);return!n||!i||!o||r.length===0?[]:Cy.map(a=>en(`https://${a}/gh/${n}/${i}@${o}/${r.join("/")}`))}function Ry(e){let t=Ga.get(e);return t?t==="load":[...document.querySelectorAll("script[src]")].some(i=>en(i.src)===e)&&performance.getEntriesByType("resource").some(i=>en(i.name)===e)}function en(e){try{let t=new URL(e);return`${t.origin}${t.pathname}`}catch(t){return e}}var lo=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var oc=".main-actionButtons",Ty=".Root__globalNav, .Root__top-bar",Py=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function rc(e){let t=new Spicetify.Topbar.Button($().extensionName,lo,e,!1,!0);return sc(t),Ay(t),t}function sc(e){var t;e.element.style.setProperty("-webkit-app-region","no-drag"),(t=e.button)==null||t.style.setProperty("-webkit-app-region","no-drag")}function Ay(e){if(typeof MutationObserver=="undefined")return;let t=!1,n=null,i=()=>{t=!1,r();let a=e.element,c=document.querySelector(oc);!a||!c||c.contains(a)||(c.prepend(a),_y(e),sc(e),re("Topbar button re-attached"))},o=new MutationObserver(()=>{t||(t=!0,setTimeout(i,250))}),r=()=>{var l;if(n!=null&&n.isConnected)return;let a=document.querySelector(oc),c=(l=a==null?void 0:a.closest(Ty))!=null?l:a==null?void 0:a.parentElement;if(o.disconnect(),n=c!=null?c:null,!c){o.observe(document.body,{childList:!0,subtree:!0});return}o.observe(c,{childList:!0,subtree:!0});for(let u=c.parentElement;u;u=u.parentElement)o.observe(u,{childList:!0})};i()}function _y(e){let t=e.button;if(!t||t.className&&t.className!=="undefined")return;let n=Array.from(document.querySelectorAll(Py)).find(i=>!e.element.contains(i));n!=null&&n.className&&(t.className=n.className)}function ac(e){if(!jn())return null;try{return new Spicetify.Menu.Item($().extensionName,!1,e,My())}catch(t){return se("Failed to create profile menu item",t),null}}function My(){return lo.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}var Ly="syncify:beta",cc=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function lc(){var e;return(e=window.SyncifyLoader)!=null?e:null}function By(){try{return window.localStorage.getItem(Ly)==="true"}catch(e){return!1}}async function uc(e){let t=By()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(t.map(i=>Dy(`${e}/${i}`)))).reduce((i,o)=>o&&(!i||fo(o,i)>0)?o:i,null)}function uo(e){return typeof e=="string"&&cc.test(e)}function fo(e,t){let[n,i]=[e,t].map(o=>{var u;let[,r,a,c,l]=(u=cc.exec(o))!=null?u:[];return[r,a,c,l!=null?l:1/0].map(Number)});for(let o=0;o<n.length;o+=1)if(n[o]!==i[o])return n[o]<i[o]?-1:1;return 0}async function Dy(e,t=3e3){let n=typeof AbortController=="function"?new AbortController:null,i=setTimeout(()=>n==null?void 0:n.abort(),t);try{let o=await fetch(e,{signal:n==null?void 0:n.signal});if(!o.ok)return null;let r=await o.json();return uo(r==null?void 0:r.version)?r.version:null}catch(o){return null}finally{clearTimeout(i)}}function gt(...e){return e.filter(Boolean).join(" ")}function yo(e,t){return t===void 0?e:w(g({},e),{key:t})}function s(e,t,n){let r=t,{children:i}=r,o=me(r,["children"]);return i===void 0?It(e,yo(o,n)):It(e,yo(o,n),i)}function p(e,t,n){let a=t,{children:i}=a,o=me(a,["children"]),r=Array.isArray(i)?i:[i];return It(e,yo(o,n),...r)}var Oy={primary:"regular",secondary:"regular",danger:"regular",text:"small",subtle:"small"};function x(e){let l=e,{variant:t="primary",size:n=Oy[t],type:i="button",icon:o,children:r,className:a}=l,c=me(l,["variant","size","type","icon","children","className"]);return p("button",w(g({className:gt("syncify-btn",a),"data-variant":t,"data-size":n,type:i},c),{children:[o,s("span",{className:"syncify-cap",children:r})]}))}function mo(e){return s("input",{className:"syncify-checkbox",type:"checkbox","aria-label":e.label,checked:e.checked,onChange:t=>e.onChange(t.currentTarget.checked),disabled:e.disabled})}function po(e){return p("label",{className:"syncify-checkbox-row","data-disabled":e.disabled?"true":void 0,children:[s("input",{className:"syncify-checkbox",type:"checkbox",checked:e.checked,onChange:t=>e.onChange(t.currentTarget.checked),disabled:e.disabled}),s("span",{className:"syncify-checkbox-label",children:e.label})]})}var Uy=0;function K(e){let[t]=h(()=>`syncify-${e}-${++Uy}`);return t}function oi(e){let{onSubmit:t}=e,n=p(R,{children:[s("h2",{className:"syncify-dialog-title",id:e.titleId,children:e.title}),e.children?s("div",{className:"syncify-dialog-text",children:e.children}):null,s("div",{className:"syncify-dialog-actions",children:e.actions})]});return t?s("form",{className:"syncify-dialog-content",noValidate:!0,onSubmit:i=>{i.preventDefault(),t()},children:n}):s("div",{className:"syncify-dialog-content",children:n})}function Je(e){let t=H(null),n=K("dialog"),{open:i}=e,o=H(e.onClose);return Et(()=>{o.current=e.onClose}),P(()=>{let r=t.current;if(!r||!i)return;let a=document.activeElement;r.open||r.showModal();let c=l=>{l.preventDefault(),o.current()};return r.addEventListener("cancel",c),()=>{r.removeEventListener("cancel",c),r.open&&r.close(),a instanceof HTMLElement&&a.isConnected&&a.focus()}},[i]),i?s("dialog",{className:"syncify-dialog","data-width":e.wide?"wide":void 0,ref:t,"aria-labelledby":n,children:s(oi,{title:e.title,actions:e.actions,titleId:n,onSubmit:e.onSubmit,children:e.children})}):null}function Se(e){var o,r;let t=K("field"),n=`${t}-error`,i=!!e.error;return p("div",{className:"syncify-field-group",children:[s("label",{className:"syncify-field-label",htmlFor:t,children:e.label}),p("div",{className:"syncify-field-row",children:[p("span",{className:"syncify-input-box","data-invalid":i?"true":void 0,"data-disabled":e.disabled?"true":void 0,children:[e.prefix?s("span",{className:"syncify-input-prefix","aria-hidden":"true",children:e.prefix}):null,s("input",{className:"syncify-input-control",id:t,type:(o=e.type)!=null?o:"text",value:e.value,onChange:a=>e.onChange(a.currentTarget.value),onBlur:e.onBlur,placeholder:e.placeholder,inputMode:e.inputMode,autoComplete:(r=e.autoComplete)!=null?r:"off",spellCheck:!1,maxLength:e.maxLength,disabled:e.disabled,autoFocus:e.autoFocus,"aria-invalid":i||void 0,"aria-describedby":i?n:void 0,"data-mono":e.mono?"true":void 0})]}),e.action]}),i?s("span",{className:"syncify-field-error",id:n,role:"alert",children:e.error}):null]})}function Oe(e){let o=e,{children:t,className:n}=o,i=me(o,["children","className"]);return s("svg",w(g({className:gt("syncify-icon",n),viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},i),{children:t}))}function dc(e){return s(Oe,w(g({},e),{children:s("path",{d:"m9 6 6 6-6 6"})}))}function fc(e){return p(Oe,w(g({},e),{children:[s("path",{d:"M7 7h10v10"}),s("path",{d:"M7 17 17 7"})]}))}function yc(e){return s(Oe,w(g({},e),{children:s("path",{d:"m6 9 6 6 6-6"})}))}function Me(e){return s(Oe,w(g({},e),{children:s("path",{d:"M5 12.5l4.5 4.5L19 7.5"})}))}function go(e){return s(Oe,w(g({},e),{children:s("path",{d:"M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z"})}))}function ri(e){return p(Oe,w(g({},e),{children:[s("path",{d:"M12 17v5"}),s("path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"})]}))}function mc(e){return p(Oe,w(g({},e),{"data-filled":"true",children:[s("rect",{x:"4",y:"10.5",width:"3",height:"3",rx:"0.75"}),s("rect",{x:"10.5",y:"10.5",width:"3",height:"3",rx:"0.75"}),s("rect",{x:"17",y:"10.5",width:"3",height:"3",rx:"0.75"})]}))}function ho(e){return p(Oe,w(g({},e),{children:[s("path",{d:"M12 6v7"}),s("path",{d:"M12 17.5v.5"})]}))}function So(e){let o=e,{keys:t,recording:n}=o,i=me(o,["keys","recording"]);return s("button",w(g({className:"syncify-keycap",type:"button","data-recording":n?"true":void 0},i),{children:s("span",{className:"syncify-cap",children:t})}))}function Y(e){return s("ul",{className:"syncify-list","aria-label":e.label,"aria-busy":e.busy?"true":void 0,"data-wrap":e.wrap?"true":void 0,children:e.children})}function Xe(){return s("li",{className:"syncify-list-divider",role:"presentation"})}function F(e){let t=p(R,{children:[e.leading?s("span",{className:"syncify-row-leading",children:e.leading}):null,p("span",{className:"syncify-row-name",children:[s("span",{className:"syncify-row-name-text",children:e.name}),e.nameMark]}),e.meta?s("span",{className:"syncify-row-meta",children:e.meta}):null,e.end?s("span",{className:"syncify-row-end",children:e.end}):null]}),n=e.meta?"2":"1";return s("li",{className:"syncify-list-item",children:e.onOpen?p("button",{className:"syncify-row",id:e.id,"data-lines":n,type:"button","aria-label":e.openLabel,onClick:e.onOpen,disabled:e.disabled,children:[t,e.external?s(fc,{className:"syncify-row-chevron"}):s(dc,{className:"syncify-row-chevron"})]}):s("div",{className:"syncify-row",id:e.id,"data-lines":n,"data-plain":e.plain?"true":void 0,children:t})})}function be(e){return s("span",{className:"syncify-mark-square","data-tone":e.tone,"data-size":e.icon?"large":"small",role:e.label?"img":void 0,"aria-label":e.label,"aria-hidden":e.label?void 0:"true",children:e.icon})}function bo(e){return s("span",{className:"syncify-badge",role:"img","aria-label":e.label,children:s("span",{className:"syncify-cap",children:e.count})})}function we(e){let t=K("menu"),[n,i]=h(!1),o=H(null),r=H(null),a=e.items.some(y=>y.checked!==void 0);P(()=>{var v,A;let y=r.current,f=o.current;if(!n||!y||!f)return;Hy(y),Fy(y,f);let S=pc(y);(A=(v=S.find(T=>T.getAttribute("aria-checked")==="true"))!=null?v:S[0])==null||A.focus();let b=()=>i(!1),k=T=>{let C=T.target;C instanceof Node&&!y.contains(C)&&!f.contains(C)&&b()},m=T=>{T.target instanceof Node&&y.contains(T.target)||b()};return document.addEventListener("pointerdown",k,!0),document.addEventListener("scroll",m,!0),window.addEventListener("resize",b),()=>{document.removeEventListener("pointerdown",k,!0),document.removeEventListener("scroll",m,!0),window.removeEventListener("resize",b),Ky(y)}},[n]);function c(){var y;i(!1),(y=o.current)==null||y.focus()}function l(y){let f=pc(y.currentTarget),S=f.findIndex(k=>k===document.activeElement),b=y.key==="ArrowDown"?f[(S+1)%f.length]:y.key==="ArrowUp"?f[(S-1+f.length)%f.length]:y.key==="Home"?f[0]:y.key==="End"?f[f.length-1]:null;b?(y.preventDefault(),b.focus()):y.key==="Escape"?(y.preventDefault(),c()):y.key==="Tab"&&i(!1)}function u(y){(y.key==="ArrowDown"||y.key==="ArrowUp")&&(y.preventDefault(),i(!0))}let d={ref:o,type:"button","aria-haspopup":"menu","aria-expanded":n,"aria-controls":n?t:void 0,disabled:e.disabled,onClick:()=>i(!n),onKeyDown:u};return p(R,{children:[e.trigger==="more"?s("button",w(g({className:"syncify-icon-btn","aria-label":e.label},d),{children:s(mc,{})})):p("button",w(g({className:"syncify-menu-value","aria-label":`${e.label}: ${e.trigger.value}`},d),{children:[s("span",{className:"syncify-cap",children:e.trigger.value}),s(yc,{})]})),n?s("div",{className:"syncify-menu",id:t,ref:r,role:"menu","aria-label":e.label,popover:"manual",onKeyDown:l,children:e.items.map(y=>s($y,{item:y,picks:a,onPick:()=>{c(),y.onSelect()}},y.label))}):null]})}function $y(e){let{item:t,picks:n}=e;return p("button",{className:"syncify-menu-item",type:"button",role:n?"menuitemradio":"menuitem","aria-checked":n?t.checked===!0:void 0,"data-danger":t.danger?"true":void 0,tabIndex:-1,disabled:t.disabled,onClick:e.onPick,children:[s("span",{className:"syncify-cap",children:t.label}),t.checked?s(Me,{}):null]})}function pc(e){return[...e.querySelectorAll(".syncify-menu-item:not(:disabled)")]}function Hy(e){typeof e.showPopover=="function"&&!e.matches(":popover-open")&&e.showPopover()}function Ky(e){typeof e.hidePopover=="function"&&e.matches(":popover-open")&&e.hidePopover()}var zy=4;function Fy(e,t){let n=zy,i=t.getBoundingClientRect(),o=e.getBoundingClientRect(),r=i.bottom+n,a=r+o.height>window.innerHeight&&i.top-n-o.height>=0?i.top-n-o.height:r,c=Math.min(Math.max(i.right-o.width,n),window.innerWidth-o.width-n);e.style.top=`${a}px`,e.style.left=`${c}px`}function jy(){return p(R,{children:[s("span",{className:"syncify-dot","aria-hidden":"true"}),s("span",{className:"syncify-visually-hidden",children:", "})]})}function z(e){let t=e.parts.filter(n=>n!=null&&n!==!1&&n!=="");return s("span",{className:gt("syncify-meta",e.className),children:t.map((n,i)=>p(R,{children:[i>0?s(jy,{}):null,s("span",{className:"syncify-meta-part",children:n})]},i))})}function wo(e){let t=Math.min(Math.max(e.used,0),e.max),n=`Used ${e.used} of ${e.max}`;return p("span",{className:"syncify-meter",role:"meter","aria-label":e.label,"aria-valuemin":0,"aria-valuemax":e.max,"aria-valuenow":t,"aria-valuetext":n,"data-full":e.used>=e.max?"true":void 0,children:[s("span",{className:"syncify-cap",children:n}),s("span",{className:"syncify-meter-bars","aria-hidden":"true",children:Array.from({length:e.max},(i,o)=>s("span",{className:"syncify-meter-bar","data-used":o<t?"true":void 0},o))})]})}function ko(e){let t=`${ke(e.used)} of ${ke(e.max)}`,n=e.max>0?Math.min(Math.max(e.used/e.max,0),1):0;return p("span",{className:"syncify-usage",role:"meter","aria-label":"Space used","aria-valuemin":0,"aria-valuemax":e.max,"aria-valuenow":Math.min(e.used,e.max),"aria-valuetext":t,"data-warning":e.warning?"true":void 0,children:[s("span",{className:"syncify-cap",children:"Space used"}),s("span",{className:"syncify-usage-bar","aria-hidden":"true",children:s("span",{className:"syncify-usage-fill",style:{width:`${n*100}%`}})}),s("span",{className:"syncify-cap",children:t})]})}function ke(e){return`${Math.ceil(Math.max(e,0)/1024)} KB`}function L(e){let t=e.tone==="error"?"alert":e.live?"status":void 0;return p("div",{className:"syncify-notice","data-tone":e.tone,role:t,children:[p("span",{className:"syncify-notice-body",children:[e.bare?null:s("span",{className:"syncify-notice-mark",children:s(be,{tone:e.tone})}),s("span",{className:"syncify-notice-text",children:e.children})]}),e.actions?s("span",{className:"syncify-notice-actions",children:e.actions}):null]})}function ae(e){return s("span",{className:"syncify-pip-square","data-kind":e.kind,"aria-hidden":"true"})}function si(e){return p("label",{className:"syncify-radio-row","data-disabled":e.disabled?"true":void 0,children:[s("input",{className:"syncify-radio",type:"radio",name:e.name,checked:e.checked,onChange:()=>e.onChange(),disabled:e.disabled}),s("span",{className:"syncify-radio-label",children:e.label})]})}function ee(e){return p("div",{className:"syncify-section-label",children:[s("h3",{className:"syncify-section-label-title",id:e.id,tabIndex:e.focusable?-1:void 0,children:e.title}),e.end]})}function ne(e){return p("div",{className:"syncify-setting-row",children:[p("span",{className:"syncify-setting-row-text",children:[s("span",{className:"syncify-setting-row-label",children:e.label}),e.value?s("span",{className:"syncify-setting-row-value",children:e.value}):null]}),e.children]})}function nn(e){return s("div",{className:"syncify-setting-group",role:"group","aria-label":e.label,children:e.children})}function ve(e){return e.shape==="item"?s("li",{className:"syncify-list-item","aria-hidden":"true",children:p("div",{className:"syncify-row","data-lines":"1",children:[s("span",{className:"syncify-row-leading",children:s("span",{className:"syncify-skeleton","data-width":"pip"})}),s("span",{className:"syncify-row-name",children:s("span",{className:"syncify-skeleton","data-width":"name"})}),p("span",{className:"syncify-row-end",children:[s("span",{className:"syncify-skeleton","data-width":"size"}),s("span",{className:"syncify-skeleton","data-width":"switch"}),s("span",{className:"syncify-skeleton","data-width":"menu"})]})]})}):s("li",{className:"syncify-list-item","aria-hidden":"true",children:p("div",{className:"syncify-row","data-lines":"2",children:[s("span",{className:"syncify-row-name",children:s("span",{className:"syncify-skeleton","data-width":"name"})}),s("span",{className:"syncify-row-meta",children:s("span",{className:"syncify-skeleton","data-width":"meta"})})]})})}function ai(e){return s("input",{className:"syncify-switch-control",type:"checkbox",role:"switch","aria-label":e.label,checked:e.checked,onChange:t=>e.onChange(t.currentTarget.checked),disabled:e.disabled})}function on(e){let i=e,{label:t}=i,n=me(i,["label"]);return p("label",{className:"syncify-setting-row","data-disabled":e.disabled?"true":void 0,children:[s("span",{className:"syncify-setting-row-label",children:t}),s(ai,g({},n))]})}var gc=(e,t)=>`${e}-tab-${t}`,hc=(e,t)=>`${e}-panel-${t}`;function vo(e){let t=H(null);P(()=>{var i,o,r;(r=(o=(i=t.current)==null?void 0:i.querySelector('[aria-selected="true"]'))==null?void 0:o.scrollIntoView)==null||r.call(o,{block:"nearest",inline:"nearest"})},[e.selected]);function n(i){var c,l;let o=e.tabs.length,r=e.tabs.findIndex(u=>u.id===e.selected),a=i.key==="ArrowRight"?(r+1)%o:i.key==="ArrowLeft"?(r-1+o)%o:i.key==="Home"?0:i.key==="End"?o-1:null;a!==null&&(i.preventDefault(),e.onSelect(e.tabs[a].id),(l=(c=t.current)==null?void 0:c.querySelectorAll('[role="tab"]')[a])==null||l.focus())}return s("div",{className:"syncify-tabs",role:"tablist","aria-label":e.label,ref:t,onKeyDown:n,children:e.tabs.map(i=>{let o=i.id===e.selected;return p("button",{className:"syncify-tab",id:gc(e.idBase,i.id),type:"button",role:"tab","aria-selected":o,"aria-controls":hc(e.idBase,i.id),tabIndex:o?0:-1,onClick:()=>e.onSelect(i.id),children:[s("span",{className:"syncify-cap",children:i.label}),i.status]},i.id)})})}function J(e){return p("div",{className:"syncify-tab-panel",id:hc(e.idBase,e.id),role:"tabpanel","aria-labelledby":gc(e.idBase,e.id),children:[s("div",{className:"syncify-tab-scroll",tabIndex:0,children:e.children}),e.actions?s("div",{className:"syncify-tab-actions",children:e.actions}):null]})}function Te(e){let t=H(e);return Et(()=>{t.current=e}),t}function X(e){if(e.startsWith("mailto:")){window.location.href=e;return}window.open(e,"_blank","noopener,noreferrer")}function ci(e){let t=e.lastIndexOf("@");if(t<1)return e;let n=e.slice(0,t);return n.length<=2?e:`${n[0]}${"*".repeat(n.length-2)}${n[n.length-1]}${e.slice(t)}`}var rn=6,Wy=600*1e3,Yy=300,Vy=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function xo(e){return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function Sc(e){let[t,n]=h(()=>kn()),[i,o]=h(()=>kn().email),[r,a]=h(""),[c,l]=h(!1),[u,d]=h(null),[y,f]=h(()=>Date.now()),S=!!(t.codeSentAt&&y-t.codeSentAt<Wy),b=Math.max(0,Math.ceil((t.retryAt-y)/1e3)),k=t.retryEmail===null||t.retryEmail===i.trim().toLowerCase()?b:0;P(()=>{if(t.retryAt<=Date.now())return;let C=setInterval(()=>{f(Date.now()),t.retryAt<=Date.now()&&clearInterval(C)},1e3);return()=>clearInterval(C)},[t.retryAt]);function m(C){let I=g(g({},kn()),C);$r(I),n(I),f(Date.now())}async function v(C){var M;let I=C.trim();if(!Vy.test(I)){d("Enter a valid email address.");return}l(!0),d(null);try{let N=await zr(I,{nudge:e.nudge});m({email:I,codeSentAt:Date.now(),retryAt:Date.now()+N*1e3,retryEmail:I.toLowerCase()}),a("")}catch(N){let B=N instanceof U?N:null,Z=(M=B==null?void 0:B.retryAfter)!=null?M:null,W=Z&&Z<=Yy?Date.now()+Z*1e3:0,E=(B==null?void 0:B.code)==="too_many_requests"?null:I.toLowerCase();if((B==null?void 0:B.code)==="resend_wait"){m({email:I,codeSentAt:t.email===I&&t.codeSentAt?t.codeSentAt:Date.now(),retryAt:W,retryEmail:E});return}W&&m({retryAt:W,retryEmail:E}),d(Be(N))}finally{l(!1)}}async function A(){l(!0),d(null);try{let C=await Fr(t.email,r);m({codeSentAt:null}),a(""),e.onSignedIn(C)}catch(C){d(Be(C));let I=C instanceof U?C.code:null;(I==="too_many_attempts"||I==="code_expired")&&a("")}finally{l(!1)}}async function T(C){l(!0),d(null),await Wr(),m({email:C,codeSentAt:null}),o(C),l(!1)}return{draft:t,email:i,setEmail:o,code:r,setCode:C=>a(C.replace(/\D/g,"").slice(0,rn)),busy:c,error:u,codeSent:S,waitSeconds:b,emailWaitSeconds:k,requestCode:v,verify:A,signOut:T,useAnotherEmail:()=>{m({codeSentAt:null}),a(""),d(null)}}}function bc(e){let{signIn:t}=e,{busy:n}=t;return s("form",{className:"syncify-account-form",noValidate:!0,onSubmit:i=>{i.preventDefault(),!n&&(t.codeSent?t.code.length===rn&&t.verify():t.emailWaitSeconds||t.requestCode(t.email))},children:t.codeSent?p(R,{children:[s(Se,{label:`Code sent to ${ci(t.draft.email)}`,value:t.code,onChange:t.setCode,error:t.error,placeholder:"123456",inputMode:"numeric",autoComplete:"one-time-code",maxLength:rn,mono:!0,autoFocus:!0,action:s(x,{type:"submit",disabled:n||t.code.length!==rn,children:n?"Verifying\u2026":"Verify"})}),p("span",{className:"syncify-account-resend",children:[s(x,{variant:"text",onClick:()=>{t.requestCode(t.draft.email)},disabled:n||t.waitSeconds>0,children:t.waitSeconds>0?`Resend in ${xo(t.waitSeconds)}`:"Resend code"}),s(x,{variant:"text",onClick:t.useAnotherEmail,disabled:n,children:"Use another email"})]})]}):s(Se,{label:"Email for sign-in codes",type:"email",value:t.email,onChange:t.setEmail,error:t.error,placeholder:"you@example.com",autoComplete:"email",autoFocus:!0,action:s(x,{type:"submit",disabled:n||t.emailWaitSeconds>0||!t.email.trim(),children:n?"Sending\u2026":t.emailWaitSeconds>0?`Send in ${xo(t.emailWaitSeconds)}`:"Send code"})})})}function wc(e){let{session:t,secure:n,handle:i}=e,o=Sc({nudge:e.nudge,onSignedIn:e.onSignedIn}),[r,a]=h(null),[c,l]=h(!1),u=Te(m=>{t&&jr().then(v=>{!m()||v||(a({kind:"warning",text:Be(new U("signed_out"))}),e.onSignedOut())}).catch(()=>{})}),d=t==null?void 0:t.token;P(()=>{let m=!0;return u.current(()=>m),()=>{m=!1}},[u,d]);let y=Te(m=>{!t||i!==void 0||Kn().then(v=>{var A,T;m()&&e.onHandle((T=(A=v.profile)==null?void 0:A.handle)!=null?T:null)}).catch(()=>{})});P(()=>{let m=!0;return y.current(()=>m),()=>{m=!1}},[y,!!t&&i===void 0]);async function S(){l(!0),a(null);try{X(await Yr())}catch(m){let v=m instanceof U&&m.code==="signed_out";a({kind:v?"warning":"error",text:Be(m)}),v&&e.onSignedOut()}finally{l(!1)}}async function b(){var m;a(null),await o.signOut((m=t==null?void 0:t.email)!=null?m:""),e.onSignedOut()}if(t===void 0)return s(J,{idBase:e.idBase,id:"account",children:null});if(!t)return p(J,{idBase:e.idBase,id:"account",children:[s("p",{className:"syncify-tab-text",children:e.securedElsewhere?"Sign in with the email that secured this backup":"Sign in to secure your backup so only you can restore it"}),r?s(L,{tone:r.kind,live:!0,children:r.text}):null,s(bc,{signIn:o})]});let k=o.busy||c;return p(J,{idBase:e.idBase,id:"account",children:[p(nn,{children:[s(ne,{label:"Email for sign-in codes",value:ci(t.email)}),i?s(ne,{label:"Creator handle",value:`@${i}`}):null,s(ne,{label:"Your account page",children:s(x,{variant:"secondary",size:"small",onClick:()=>{S()},disabled:k,children:"Open"})}),n.kind==="open"?s(ne,{label:"Secure your backup so only you can restore it",children:s(x,{onClick:e.onSecure,disabled:k||e.securing,children:e.securing?"Securing\u2026":"Secure"})}):null]}),n.kind==="undone"?s(L,{tone:"warning",children:"This backup is no longer secured by your account."}):null,e.secureError?s(L,{tone:"error",children:e.secureError}):null,r?s(L,{tone:r.kind,live:!0,children:r.text}):null,p("div",{className:"syncify-account-footer",children:[p("span",{className:"syncify-account-status",children:[n.kind==="secured"?s(Me,{className:"syncify-account-check"}):null,s(z,{parts:Gy(n)})]}),s(x,{variant:"text",onClick:()=>{b()},disabled:k,children:"Sign out"})]})]})}function Gy(e){return e.kind!=="secured"?["Signed in"]:["This backup is secured",...e.linkedCount>1?[`${e.linkedCount} Spotify usernames linked`]:[]]}function kc(e){var i,o;if(!e)return{kind:"unknown"};let t=(i=e.accounts)!=null?i:[];if((o=e.claim)!=null&&o.mine){let r=t.filter(a=>a.status==="final").length;return{kind:"secured",linkedCount:Math.max(r,1)}}return{kind:t.some(r=>r.hash===e.hash&&r.status==="unlinked")?"undone":"open"}}function vc(e,t,n){return e?n.kind==="secured"?{kind:"ok",label:"Signed in, backup secured"}:n.kind==="open"?{kind:"warning",label:"Backup not secured yet"}:n.kind==="undone"?{kind:"warning",label:"Backup not secured"}:{kind:"ok",label:"Signed in"}:t?{kind:"warning",label:"Sign in to see your backups"}:null}var xc=new WeakMap;function ht(e){let t=xc.get(e);return t||(t=oe(e.marketplace_data.keys),xc.set(e,t)),t}function Ze(e){return Qe(e,"item")}function Qe(e,t){return`${e} ${t}${e===1?"":"s"}`}function St(e,t=new Date){let n=new Date(e);if(Number.isNaN(n.getTime()))return e;let i=n.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),o=new Date(t);return o.setDate(t.getDate()-1),n.toDateString()===t.toDateString()?`today, ${i}`:n.toDateString()===o.toDateString()?`yesterday, ${i}`:`${n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===t.getFullYear()?void 0:"numeric"})}, ${i}`}function li(e){return e.length<=1?e.join(""):`${e.slice(0,-1).join(", ")} and ${e[e.length-1]}`}function Co(e,t=new Date){let n=new Date(e);if(Number.isNaN(n.getTime()))return"";let i=new Date(t);return i.setDate(t.getDate()-1),n.toDateString()===t.toDateString()?"today":n.toDateString()===i.toDateString()?"yesterday":n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===t.getFullYear()?void 0:"numeric"})}function Ic(e,t,n){var l,u;let i=St(e.metadata.last_sync_datetime),o=Ze(ht(e).length),r=`from ${e.metadata.device_info}`,a=(u=(l=e.backup)==null?void 0:l.name)!=null?u:null,c=e.payload_hash===n;return t==="safety-copy"?{backup:e,kind:t,name:"Safety copy",meta:[a,i,o,"updated weekly"].filter(Cc),current:c,title:`the safety copy from ${i}`}:t==="pinned"?{backup:e,kind:t,name:"Pinned",meta:[a,i,o,r].filter(Cc),current:c,title:a!=null?a:`the backup pinned ${i}`}:t==="unapproved"?{backup:e,kind:t,name:"Unconfirmed",meta:[i,o,r],current:c,title:i}:{backup:e,kind:t,name:a!=null?a:i.charAt(0).toUpperCase()+i.slice(1),meta:a?[i,o,r]:[o,r],current:c,title:a!=null?a:i}}function Cc(e){return e!==null}var Ec={extension:"extension",theme:"theme",snippet:"snippet"},qy={extension:"extension",custom_app:"app",theme:"theme"},Jy={extension:"extension",custom_app:"custom app",theme:"theme"};function ui(e){let{changes:t}=e,[n,i]=h(!1);return p(Y,{label:e.label,children:[t.changes.map(o=>s(Xy,{change:o,includeLabel:e.includeLabel(o.name),onInclude:r=>e.onInclude(o.key,r),disabled:e.disabled},o.key)),t.manual.map(o=>s(F,{leading:s(ae,{kind:qy[o.type]}),name:o.name,meta:s(z,{parts:[Jy[o.type],o.scheme]}),end:s("span",{className:"syncify-change-label syncify-cap",children:"Add manually"})},`${o.type}:${o.name}`)),t.settings.length>0?s(Xe,{}):null,t.settings.map(o=>s(F,{leading:s(ae,{kind:o.kind}),name:o.name,end:s("span",{className:"syncify-change-label syncify-cap","data-change":"Updates",children:"Updates"})},`settings:${o.id}`)),t.settings.length>0&&t.unchanged.length>0?s(Xe,{}):null,t.unchanged.length>0?s(F,{name:p("span",{className:"syncify-change-fold",children:[t.unchanged.length," more stay the same"]}),end:s(x,{variant:"subtle","aria-expanded":n,onClick:()=>i(!n),children:n?"Hide":"Show"})}):null,n?t.unchanged.map(o=>s(Zy,{item:o},o.key)):null]})}function Xy(e){let{change:t}=e;return s(F,{leading:s(ae,{kind:Ec[t.type]}),name:t.name,meta:t.note?s(z,{parts:[t.note]}):void 0,end:p(R,{children:[s("span",{className:"syncify-change-label syncify-cap","data-change":t.fixed?void 0:t.change,children:t.fixed?"Stays off":t.change}),t.optional&&!t.fixed?s(mo,{checked:t.included,onChange:e.onInclude,label:e.includeLabel,disabled:e.disabled}):null]})})}function Zy(e){return s(F,{leading:s(ae,{kind:Ec[e.item.type]}),name:e.item.name,meta:e.item.note?s(z,{parts:[e.item.note]}):void 0})}var Rc={Adds:0,Updates:1,Removes:2},Qy=["blocked","host","repo","catalog","unchecked"];function di(e,t,n){var u,d,y;let{optional:i,allowed:o}=n,r=(u=n.fixed)!=null?u:new Set,a=[],c=[];for(let f of e.items){let S=t.get(f.key),b=i.has(f.key)||r.has(f.key),k={key:f.key,name:f.name,type:f.type,note:S?Io(S):r.has(f.key)?"Not in Marketplace's list":n.unapproved&&b?"Unconfirmed":null},m=f.change==="added"?"Adds":f.change==="removed"?"Removes":f.isNew?"Updates":null;if(m){let v=r.has(f.key);a.push(w(g({},k),{change:m,optional:b,fixed:v,included:!b||!v&&o.has(f.key)}))}else c.push(k)}a.sort((f,S)=>Rc[f.change]-Rc[S.change]);let l=(d=n.settings)!=null?d:[];return{changes:a,settings:l,unchanged:c,manual:e.manual,warnings:[...em(a,t,(y=n.verb)!=null?y:"Restore"),...tm(a)],count:a.filter(f=>f.included).length+l.length}}function fi(e,t){return t===0?e:t===1?`${e} 1 change`:`${e} ${t} changes`}function Io(e){switch(e.kind){case"host":return`Code from ${e.host}`;case"repo":return`Code from ${e.repo}`;case"blocked":return"Blocked by Marketplace";case"catalog":return"Not in Marketplace";case"unchecked":return"Not checked";case"custom":return"Custom"}}function em(e,t,n){var o;let i=new Map;for(let r of e){if(r.change==="Removes"||r.fixed)continue;let a=t.get(r.key);!a||!lt(a)&&a.kind!=="unchecked"||i.set(a.kind,[...(o=i.get(a.kind))!=null?o:[],r.name])}return Qy.flatMap(r=>{let a=i.get(r);return a?[nm(r,a,n)]:[]})}function tm(e){let t=e.filter(n=>n.fixed).map(n=>n.name);return t.length===0?[]:[t.length===1?`${li(t)} isn't in Marketplace's list anymore, so it stays off.`:`${li(t)} aren't in Marketplace's list anymore, so they stay off.`]}function nm(e,t,n){let i=t.length===1,o=li(t),r=i?`${n} it only if you trust it.`:`${n} them only if you trust them.`;switch(e){case"blocked":return`${o} ${i?"is":"are"} on Marketplace's block list. ${r}`;case"host":return`${o} ${i?"loads from a site":"load from sites"} outside GitHub. ${r}`;case"repo":return i?`${o} loads its code from a different repo than the one it names. ${r}`:`${o} load their code from different repos than the ones they name. ${r}`;case"catalog":return`${o} ${i?"isn't":"aren't"} in Marketplace's catalog. ${r}`;default:return`GitHub couldn't be reached to check ${o}. ${r}`}}function Nc(e){return e.map(t=>w(g({},t),{name:`${t.name} settings`})).sort((t,n)=>t.name.localeCompare(n.name))}function Tc(e,t,n){let[i,o]=h(()=>new Set),[r,a]=h(null),c=Q(()=>_n(ht(e),e.spicetify_config,t,n),[e,t,n]),l=Q(()=>ut(c.items),[c]);P(()=>{let C=!0;return dt(c.items,l).then(I=>{C&&a({for:e,checks:I})}),()=>{C=!1}},[e,c,l]);let[u,d]=h(null);P(()=>{let C=!0;return ls(e.extension_settings).catch(()=>[]).then(I=>{C&&d({for:e,items:I})}),()=>{C=!1}},[e]);let y=(r==null?void 0:r.for)===e?r.checks:null,f=Q(()=>new Map([...y!=null?y:[],...l]),[y,l]),S=In(e),b=Q(()=>new Set(c.items.filter(C=>{var I;return C.change!=="removed"&&C.isNew&&(S||lt(f.get(C.key))||((I=f.get(C.key))==null?void 0:I.kind)==="unchecked")}).map(C=>C.key)),[c,f,S]),k=Q(()=>[...b].filter(C=>!i.has(C)),[b,i]),m=(u==null?void 0:u.for)===e?u.items:null,v=Q(()=>Nc(m!=null?m:[]).filter(C=>!k.includes(C.key)),[m,k]),A=Q(()=>di(c,f,{optional:b,allowed:i,unapproved:S,settings:v.map(({id:C,name:I,kind:M})=>({id:C,name:I,kind:M}))}),[c,f,b,i,S,v]);function T(C,I){let M=new Set(i);I?M.add(C):M.delete(C),o(M)}return{preview:c,changes:A,unapproved:S,checking:y===null||m===null,skipped:k,settingsIds:A.settings.map(C=>C.id),allow:T}}function Pc(e){let{row:t,local:n}=e,i=K("restore-heading"),o=Tc(t.backup,n.items,n.spicetifyConfig),{changes:r}=o,a=!n.marketplaceAvailable,c=e.canShareSettings&&o.settingsIds.length>0;P(()=>{var u;(u=document.getElementById(i))==null||u.focus()},[i]);let l=p(R,{children:[s(x,{variant:"secondary",onClick:e.onCancel,disabled:e.restoring,children:"Cancel"}),s(x,{onClick:()=>e.onRestore({row:t,skipped:o.skipped,manual:o.preview.manual,settings:{ids:o.settingsIds,share:c&&e.shareSettings}}),disabled:e.busy||o.checking||a,children:e.restoring?"Restoring\u2026":o.checking?"Checking\u2026":fi("Restore",r.count)})]});return p(J,{idBase:e.idBase,id:"backups",actions:l,children:[s(ee,{title:`Restore ${t.title}`,id:i,focusable:!0}),a?s(L,{tone:"warning",children:"Install Spicetify Marketplace to restore a backup."}):null,o.unapproved?s(L,{tone:"warning",children:"This backup is unconfirmed. Its items stay off unless you turn them on."}):null,s(ui,{changes:r,label:"What this restore changes",includeLabel:u=>`Restore ${u}`,onInclude:o.allow,disabled:e.busy}),r.warnings.map(u=>s(L,{tone:"warning",children:u},u)),e.localIsUnsaved?s(L,{tone:"warning",children:"Your current setup isn't backed up."}):null,c?s(po,{label:"Use these extension settings on my other devices too",checked:e.shareSettings,onChange:e.onShareSettingsChange,disabled:e.busy}):null]})}var Ac="Other backups on your Spotify username";function _c(e){var C,I,M,N,B,Z,W;let{remote:t,local:n}=e,i=K("backup"),[o,r]=h(null),[a,c]=h(null),l=H(null);if(P(()=>{var E;a||!l.current||((E=document.getElementById(l.current))==null||E.focus(),l.current=null)},[a]),a&&n)return s(Pc,{idBase:e.idBase,row:a,local:n,localIsUnsaved:n.installedItemCount>0&&!im(n.hash,t),canShareSettings:e.canShareSettings,shareSettings:e.shareSettings,onShareSettingsChange:e.onShareSettingsChange,busy:e.busy,restoring:e.restoring,onCancel:()=>c(null),onRestore:E=>{var O;return e.onRestore(w(g({},E),{linkedHash:(O=o==null?void 0:o.hash)!=null?O:null}))}},a.backup.payload_hash);async function u(E){if(!E){r(null);return}r({hash:E,remote:null});try{let O=await Ve(e.config,E);r({hash:E,remote:O})}catch(O){r(null),e.onError(O)}}let d=o?o.remote:t,y=(C=n==null?void 0:n.hash)!=null?C:null,f=E=>{var O,ce;return(ce=(O=E.backup.backup)==null?void 0:O.id)!=null?ce:`${E.kind}-${E.backup.payload_hash}-${E.backup.metadata.last_sync_datetime}`},S=E=>`${i}-${f(E)}`,b=(E,O)=>E.map(ce=>Ic(ce,O,y)),k=b((I=d==null?void 0:d.backups)!=null?I:[],"backup"),m=b((M=d==null?void 0:d.pinned)!=null?M:[],"pinned"),v=b(d!=null&&d.safetyCopy?[d.safetyCopy]:[],"safety-copy"),A=o?[]:[...b((N=t==null?void 0:t.others)!=null?N:[],"other"),...b((B=t==null?void 0:t.unapproved)!=null?B:[],"unapproved")];function T(E){var O;return s(F,{id:S(E),name:E.name,nameMark:E.kind==="safety-copy"?p(R,{children:[s(go,{className:"syncify-safety-mark"}),(O=E.backup.backup)!=null&&O.safety_copy?s(ri,{className:"syncify-safety-mark"}):null]}):E.kind==="pinned"?s(ri,{className:"syncify-safety-mark"}):E.kind==="unapproved"?s(be,{tone:"warning"}):void 0,meta:s(z,{parts:E.meta}),end:E.current?s("span",{className:"syncify-row-status syncify-cap",children:"Current"}):void 0,onOpen:E.current?void 0:()=>{l.current=S(E),c(E)},openLabel:`Preview restore of ${E.title}`,disabled:e.busy},f(E))}return p(J,{idBase:e.idBase,id:"backups",children:[e.notices,n&&!n.marketplaceAvailable?s(L,{tone:"warning",children:"Install Spicetify Marketplace to restore a backup."}):null,e.otherAccounts.length>0?s(ne,{label:"Show backups from",children:s(we,{label:"Show backups from",trigger:{value:(W=(Z=e.otherAccounts.find(E=>E.hash===(o==null?void 0:o.hash)))==null?void 0:Z.label)!=null?W:"This Spotify username"},items:[{hash:null,label:"This Spotify username"},...e.otherAccounts].map(E=>{var O;return{label:E.label,checked:((O=o==null?void 0:o.hash)!=null?O:null)===E.hash,onSelect:()=>{u(E.hash)}}}),disabled:e.busy})}):null,(!t||!n)&&e.failed?null:!t||!n||o&&!o.remote?p(Y,{label:"Loading backups",children:[s(ve,{}),s(ve,{})]}):k.length+m.length+v.length+A.length===0?o?s("p",{className:"syncify-tab-text",children:"No backups yet."}):null:p(R,{children:[k.length+m.length+v.length>0?p(Y,{label:"Backups",children:[k.map(T),m.length>0&&k.length>0?s(Xe,{}):null,m.map(T),v.length>0&&k.length+m.length>0?s(Xe,{}):null,v.map(T)]}):null,A.length>0?p(R,{children:[s(ee,{title:Ac}),s(Y,{label:Ac,children:A.map(T)})]}):null]})]})}function im(e,t){return t?[...t.backups,...t.safetyCopy?[t.safetyCopy]:[]].some(n=>n.payload_hash===e):!1}function Mc(e){let t=K("first-sync"),[n,i]=h(()=>Object.fromEntries(e.choices.map(d=>[d.id,d.localAt>d.accountAt?"here":"account"]))),[o,r]=h(!1),[a,c]=h(null),l=d=>{var y;return(y=n[d.id])!=null?y:d.localAt>d.accountAt?"here":"account"};async function u(){r(!0),c(null);try{await _a(Object.fromEntries(e.choices.map(d=>[d.id,l(d)]))),e.onClose()}catch(d){c(d instanceof Error?d.message:String(d))}finally{r(!1)}}return p(Je,{open:e.open,wide:!0,onClose:e.onClose,title:"Which extension settings do you want to keep?",actions:p(R,{children:[s(x,{variant:"secondary",onClick:e.onClose,disabled:o,children:"Ask me later"}),s(x,{onClick:()=>{u()},disabled:o,children:"Keep these"})]}),children:[s("p",{children:"These items have different settings in this Spotify than on your other devices. Choose the settings to keep for each item. All your devices will then use them."}),s(Y,{wrap:!0,children:e.choices.map(d=>s(F,{leading:s(ae,{kind:d.kind}),name:d.name,end:p("span",{className:"syncify-first-sync-picks",role:"radiogroup","aria-label":d.name,children:[s(si,{name:`${t}-${d.id}`,label:`This Spotify, ${Co(d.localAt)}`,checked:l(d)==="here",onChange:()=>i(y=>w(g({},y),{[d.id]:"here"})),disabled:o}),s(si,{name:`${t}-${d.id}`,label:`Other devices, ${Co(d.accountAt)}`,checked:l(d)==="account",onChange:()=>i(y=>w(g({},y),{[d.id]:"account"})),disabled:o})]})},d.id))}),a?s(L,{tone:"error",children:a}):null]})}var om="0123456789ABCDEFGHJKMNPQRSTVWXYZ";async function Lc(e){let t=new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(e))),n=(t[0]<<24|t[1]<<16|t[2]<<8|t[3])>>>2,i="";for(let o=5;o>=0;o--)i+=om[n>>>o*5&31];return i}function Bc(e){return`${e.slice(0,3)} ${e.slice(3)}`}function Dc(e){return e.toUpperCase().replace(/[\s-]/g,"")}function et(e,t){return e.items.filter(n=>n.hold!==null&&!t.includes(n.id))}function Oc(e,t){let{hold:n}=e;if(n.reason==="account_full")return`${e.name} is held because your extension settings are over ${ke(t)}. Your other devices keep the last copy that fit. To sync it again, turn off an item or delete a synced copy in Items.`;let i=`${ke(n.size)} of its ${ke(e.limit)}`;return e.list?`${e.name}'s list is too big to sync, ${i}. Your other devices keep the last list that fit. It syncs again once the list is smaller.`:`${e.name}'s extension settings are too big to sync, ${i}. Your other devices keep the last copy that fit. They sync again once they're smaller.`}function Uc(e){return e.hold?`${ke(e.hold.size)}, too big to sync`:ke(e.size)}function $c(e,t){let n=et(e,t).filter(i=>i.hold.reason==="account_full");return{used:e.bytes+n.reduce((i,o)=>i+Math.max(o.hold.size-o.accountSize,0),0),over:n.length>0}}function Hc(e,t){let n=e.items,i=n.filter(r=>t.includes(r.id)).length,o=et(e,t).length;return{syncing:n.length-i-o,held:o,off:i}}function rm(){return`${$().webUrl.replace(/\/+$/,"")}/supported`}var sm=4;function Kc(e){let{config:t,status:n}=e,i=K("extension-settings"),o=H(null),r=et(n,t.settingsSyncOff),a=e.secured&&t.settingsSyncEnabled&&r.length>0,c=H(a);return P(()=>{var l;c.current&&((l=o.current)==null||l.scrollIntoView({block:"start"}))},[]),p("div",{className:"syncify-sync-section","data-place":"settings",ref:o,role:"group","aria-labelledby":i,children:[s(ee,{title:"Extension settings",id:i}),e.secured?p(R,{children:[s(on,{label:"Syncing on this device",checked:t.settingsSyncEnabled,onChange:e.onEnabledChange,disabled:e.disabled}),t.settingsSyncEnabled?p(R,{children:[s(zc,{status:n,off:t.settingsSyncOff}),s(Fc,{items:r,accountLimit:n.limit})]}):null]}):s(L,{tone:"info",bare:!0,actions:s(x,{size:"small",onClick:e.onSecure,disabled:e.securing,children:e.securing?"Securing\u2026":"Secure"}),children:"Secure your backup to sync extension settings between your devices."}),p(Y,{children:[e.secured&&t.settingsSyncEnabled?n.items.length===0?s(F,{name:"None of your items have settings Syncify can sync",plain:!0}):s(F,{name:"Items",meta:s(am,{status:n,off:t.settingsSyncOff}),onOpen:e.onOpenItems}):null,s(F,{name:"Supported extensions",external:!0,onOpen:()=>X(rm())})]})]})}function am(e){let t=Hc(e.status,e.off);return s(z,{parts:[t.syncing>0&&`${t.syncing} syncing`,t.held>0&&p("span",{className:"syncify-sync-warning",children:[t.held," too big to sync"]}),t.off>0&&`${t.off} off`]})}function zc(e){let{used:t,over:n}=$c(e.status,e.off);return s(ko,{used:t,max:e.status.limit,warning:n})}function Fc(e){return s(R,{children:e.items.map(t=>s(L,{tone:"warning",children:Oc(t,e.accountLimit)},t.id))})}function jc(e){let{config:t,status:n}=e,i=K("items"),[o,r]=h(null),[a,c]=h([]),l=H({ids:[],names:new Map});P(()=>{var S;let f=!0;return La().catch(()=>n.items).then(b=>{f&&r(b)}),(S=document.getElementById(i))==null||S.focus(),()=>{f=!1}},[]);let u=H(e.onDeleted);P(()=>{u.current=e.onDeleted}),P(()=>()=>{let{ids:f,names:S}=l.current;f.length!==0&&Promise.all(f.map(b=>Ma(G(),b).catch(k=>{var v;let m=k instanceof Error?k.message:String(k);Spicetify.showNotification(`Syncify couldn't delete the synced copy of ${(v=S.get(b))!=null?v:b}. ${m}`,!0,6e3)}))).then(()=>u.current())},[]);function d(f,S){let b=S?[...a,f.id]:a.filter(k=>k!==f.id);l.current.names.set(f.id,f.name),l.current.ids=b,c(b)}let y=et(w(g({},n),{items:o!=null?o:n.items}),t.settingsSyncOff);return p("div",{className:"syncify-sync-section",children:[s(ee,{title:"Items",id:i,focusable:!0,end:s(x,{variant:"subtle",onClick:e.onBack,children:"Back to settings"})}),s(zc,{status:n,off:t.settingsSyncOff}),s(Fc,{items:y,accountLimit:n.limit}),s(Y,{label:"Items",busy:o===null,wrap:!0,children:o===null?Array.from({length:sm},(f,S)=>s(ve,{shape:"item"},S)):o.map(f=>s(cm,{item:f,on:!t.settingsSyncOff.includes(f.id),deleted:a.includes(f.id),onChange:S=>e.onItemChange(f.id,S),onDelete:S=>d(f,S)},f.id))})]})}function cm(e){let{item:t}=e;return s(F,{leading:s(ae,{kind:t.kind}),name:t.name,end:e.deleted?p(R,{children:[s("span",{className:"syncify-sync-size",children:"Synced copy deleted"}),s(x,{variant:"text",onClick:()=>e.onDelete(!1),children:"Undo"})]}):p(R,{children:[s("span",{className:"syncify-sync-size","data-tone":t.hold&&e.on?"warning":void 0,children:e.on?Uc(t):ke(t.size)}),s(ai,{label:`Sync ${t.name}`,checked:e.on,onChange:e.onChange}),s(we,{trigger:"more",label:`More for ${t.name}`,items:[{label:"Delete synced copy",danger:!0,onSelect:()=>e.onDelete(!0)}]})]})})}function Wc(e,t){let[n,i]=h(!1),[o,r]=h(null),a=Te(t);return P(()=>{if(!n)return;let c=l=>{var d;if(!((d=document.getElementById(e))!=null&&d.isConnected)){i(!1),r(null);return}l.preventDefault(),l.stopImmediatePropagation();let u=ca(l);if(u.kind!=="ignore"){if(u.kind==="cancel"){i(!1),r(null);return}if(u.kind==="error"){r(u.message);return}if(la(u.shortcut)){r(`${Wt(u.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}i(!1),a.current(u.shortcut)}};return window.addEventListener("keydown",c,!0),()=>window.removeEventListener("keydown",c,!0)},[n,e,a]),{recording:n,error:o,clearError:()=>r(null),toggle:()=>{r(null),i(!n)}}}var Yc=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function lm(){let[e,t]=h(null);return P(()=>{let n=!0;return vn().then(i=>i?Lc(i.publicKey):null).then(i=>{n&&t(i)}).catch(()=>{}),()=>{n=!1}},[]),e}function Vc(e){var b,k;let{config:t}=e,[n,i]=h("settings"),[o]=h(()=>jn()),r=K("shortcut"),a=Wc(r,f),c=lm(),l=o?t.entryPoint:"topbar",u=a.recording?"Press keys":t.shortcut?Wt(t.shortcut):"Off";function d(m){We(m),e.onConfigChange(m)}function y(m,v){let A=G().settingsSyncOff.filter(T=>T!==m);d(w(g({},t),{settingsSyncOff:v?A:[...A,m]}))}if(n==="items")return s(J,{idBase:e.idBase,id:"settings",children:s(jc,{config:t,status:e.syncStatus,onItemChange:y,onBack:()=>i("settings"),onDeleted:()=>e.onConfigChange(G())})});function f(m){d(w(g({},t),{shortcut:m})),to(m),a.clearError()}function S(m){d(w(g({},t),{entryPoint:m})),Wn(m)}return p(J,{idBase:e.idBase,id:"settings",children:[p(nn,{children:[s(on,{label:"Automatic backup when Spotify starts",checked:t.autoBackupEnabled&&!e.unsupported,onChange:m=>d(w(g({},t),{autoBackupEnabled:m})),disabled:e.busy||e.unsupported}),s(ne,{label:"Open Syncify from",children:s(we,{label:"Open Syncify from",trigger:{value:(k=(b=Yc.find(m=>m.value===l))==null?void 0:b.label)!=null?k:""},items:Yc.map(m=>({label:m.label,checked:m.value===l,onSelect:()=>S(m.value)})),disabled:!o})}),s(ne,{label:"Keyboard shortcut",value:a.recording&&!a.error?"Press a key combination, or Esc to cancel":void 0,children:p("span",{className:"syncify-settings-shortcut",children:[a.recording?null:t.shortcut?s(x,{variant:"subtle",onClick:()=>f(null),children:"Turn off"}):s(x,{variant:"subtle",onClick:()=>f(yt),children:"Use default"}),s(So,{id:r,keys:u,recording:a.recording,"aria-label":a.recording?`${u} for a new keyboard shortcut`:`${u}, change the keyboard shortcut`,onClick:a.toggle})]})}),c?s(ne,{label:"Code to confirm this Syncify is yours",children:s("span",{className:"syncify-settings-code",children:Bc(c)})}):null]}),a.error?s(L,{tone:"warning",live:!0,children:a.error}):null,o?t.entryPoint==="menu"&&!t.shortcut?s(L,{tone:"warning",children:"Keep a shortcut in case a Spotify update breaks the profile menu."}):null:s(L,{tone:"info",children:"The profile menu isn't available in this Spicetify version."}),s(Kc,{config:t,status:e.syncStatus,secured:e.secured,securing:e.securing,onSecure:e.onSecure,onEnabledChange:m=>d(w(g({},t),{settingsSyncEnabled:m,settingsSyncOff:G().settingsSyncOff})),onOpenItems:()=>i("items"),disabled:e.busy})]})}function Gc(){let[e,t]=h(()=>Re());return P(()=>Qn(t),[]),e}function sn(e){let t=`${$().webUrl.replace(/\/+$/,"")}/discover`;return e?`${t}?post=${encodeURIComponent(e)}`:t}function bt(e){var t;return(t=e.name)!=null?t:Ee(e.code)}function qc(e){return[`Used by ${e.imports}`,...e.posted?["On Discover"]:[]]}function Jc(e){let t=e.posted?"The code stops working and its Discover post comes down.":"The code stops working.";return e.imports===0?t:`${t} ${e.imports===1?"1 person":`${e.imports} people`} used it.`}var yi=12;function Xc(e){return[...Array(Math.min(e.extensions,yi)).fill("extension"),...Array(Math.min(e.themes,yi)).fill("theme"),...Array(Math.min(e.snippets,yi)).fill("snippet")].slice(0,yi)}var um={extension:"extension",theme:"theme",snippet:"snippet"};function Zc(e){var l,u;let{compose:t}=e,n=K("compose-heading"),i=(u=(l=t.compose)==null?void 0:l.code)!=null?u:null,{draft:o,saving:r}=t;P(()=>{var d;(d=document.getElementById(n))==null||d.focus()},[n]);let a=o?[...o.items].sort((d,y)=>Number(o.leftOut.has(y.key))-Number(o.leftOut.has(d.key))||d.name.localeCompare(y.name)):[],c=p(R,{children:[s(x,{variant:"secondary",onClick:t.cancel,disabled:r,children:"Cancel"}),s(x,{onClick:()=>{t.save()},disabled:!o||t.included.length===0||r,children:o?r?i?"Updating\u2026":"Creating\u2026":i?"Update code":"Create code":"Checking\u2026"})]});return p(J,{idBase:e.idBase,id:"share",actions:c,children:[s(ee,{title:i?`Update ${bt(i)}`:"Create a code",id:n,focusable:!0}),t.error?s(L,{tone:"error",children:t.error}):null,s(Se,{label:"Setup name (optional)",value:t.name,onChange:t.setName,maxLength:Us,disabled:r}),t.askHandle?s(Se,{label:"Pick a handle for your profile",value:t.handle,onChange:t.setHandle,onBlur:t.checkHandle,error:t.handleError,prefix:"@",maxLength:Ji,disabled:r}):null,o&&t.included.length===0?s(L,{tone:"warning",children:"Nothing here can go in a code. Add something from Marketplace first."}):null,s(ee,{title:"What goes in",end:o?s(z,{parts:[Ze(t.included.length)]}):void 0}),o?s(Y,{label:"What goes in",children:a.map(d=>{let y=o.leftOut.get(d.key),f=[y?Io(y):null,d.repo].filter(Boolean);return s(F,{leading:s(ae,{kind:um[d.type]}),name:d.name,meta:f.length>0?s(z,{parts:f}):void 0,end:y?s("span",{className:"syncify-change-label syncify-cap",children:"Left out"}):void 0},d.key)})}):p(Y,{label:"Checking your items",children:[s(ve,{}),s(ve,{})]})]})}var Qc=[["add","Add to my setup"],["replace","Replace my setup"]];function el(e){var c,l,u,d;let{load:t}=e,n=K("share-heading"),i=(c=t.shared)==null?void 0:c.file;if(P(()=>{var y;(y=document.getElementById(n))==null||y.focus()},[n]),!i||!t.changes)return null;let o=e.marketplaceAvailable===!1,r=i.creator,a=p(R,{children:[s(x,{variant:"secondary",onClick:t.close,disabled:t.applying,children:"Cancel"}),s(x,{onClick:()=>{t.apply()},disabled:t.applying||t.checking||e.busy||o,children:t.applying?"Loading\u2026":t.checking?"Checking\u2026":fi("Load",t.changes.count)})]});return p(J,{idBase:e.idBase,id:"share",actions:a,children:[s(ee,{title:`Load ${(l=i.name)!=null?l:Ee(i.code)}`,id:n,focusable:!0,end:r?s(x,{variant:"text",onClick:()=>X(Gs(r)),children:`by @${r}`}):void 0}),t.applyError?s(L,{tone:"error",children:t.applyError}):null,o?s(L,{tone:"warning",children:"Install Spicetify Marketplace to load a setup."}):null,s(ne,{label:"How to load it",children:s(we,{label:"How to load it",trigger:{value:(d=(u=Qc.find(([y])=>y===t.mode))==null?void 0:u[1])!=null?d:""},items:Qc.map(([y,f])=>({label:f,checked:t.mode===y,onSelect:()=>t.setMode(y)})),disabled:t.applying})}),s(ui,{changes:t.changes,label:"What loading it changes",includeLabel:y=>`Load ${y}`,onInclude:t.allow,disabled:t.applying}),t.theme?s(L,{tone:"info",children:`Your theme switches to ${t.theme.name}.`}):null,t.changes.warnings.map(y=>s(L,{tone:"warning",children:y},y))]})}function tl(e){let[t,n]=h(null),[i,o]=h(null),[r,a]=h(""),[c,l]=h(""),[u,d]=h(!1),[y,f]=h(!1),[S,b]=h(null),[k,m]=h(null),v=H(0),[A,T]=h(e.token);A!==e.token&&(T(e.token),n(null),o(null),m(null));let C=t!==null&&t.code===null&&!e.hasHandle,I=C&&u?Xi(c):null,M=i?i.items.filter(E=>!i.leftOut.has(E.key)):[];async function N(E){var ce,it;let O=++v.current;n({code:E}),a((ce=E==null?void 0:E.name)!=null?ce:""),l((it=e.suggestedHandle)!=null?it:""),d(!1),o(null),b(null),m(null);try{let ye=await ge(),wt=await zs(oe(ye),ye);O===v.current&&o(g({keys:ye},wt))}catch(ye){if(O!==v.current)return;n(null),b(ye instanceof Error?ye.message:String(ye))}}function B(){v.current+=1,n(null),o(null)}function Z(){n(null),o(null)}async function W(){if(!t||!i)return;if(C&&Xi(c)){d(!0);return}f(!0),b(null);let E=Fs(i.keys,M);try{let O=t.code?await qs(t.code.code,r.trim(),E):await Vs(r.trim(),E,C?c.trim():void 0);m(w(g({},O),{outcome:t.code?"updated":"created"})),Z(),await e.reload()}catch(O){if(O instanceof U&&O.code==="same_setup"&&O.share){m(w(g({},O.share),{leftOut:0,outcome:"existing"})),Z();return}e.fail(O,b),O instanceof U&&O.code==="publish_failed"&&(n(null),e.reload())}finally{f(!1)}}return{compose:t,draft:i,included:M,name:r,setName:a,askHandle:C,handle:c,setHandle:E=>l(E.replace(/^@/,"")),checkHandle:()=>d(!0),handleError:I,saving:y,error:S,saved:k,dismissSaved:()=>m(null),forgetSaved:E=>m(O=>(O==null?void 0:O.code)===E?null:O),start:N,cancel:B,save:W}}function nl(e){var I;let[t,n]=h(null),[i,o]=h(null),[r,a]=h(null),[c,l]=h(null),[u,d]=h(0),y=H(!1),[f,S]=h(null),[b,k]=h(!1);function m(M,N){N(Ft(M,i)),M instanceof U&&M.code==="signed_out"&&e.onSignedOut()}async function v(){var M,N;S(null);try{let B=await Kn();n(B.codes),y.current||(y.current=!0,d(B.newHearts)),e.onCodeCount(B.codes.length),o(B.max),a(B.profile),e.onHandle((N=(M=B.profile)==null?void 0:M.handle)!=null?N:null),l(B.suggestedHandle)}catch(B){m(B,S)}}async function A(M){k(!0),S(null);try{return await Js(M),await v(),!0}catch(N){return m(N,S),!1}finally{k(!1)}}let T=Te(M=>{n(null),y.current=!1,M&&v()}),C=(I=e.session)==null?void 0:I.token;return P(()=>T.current(C!==void 0),[T,C]),{codes:t,max:i,atMax:t!==null&&i!==null&&t.length>=i,profile:r,suggestedHandle:c,newHearts:u,error:f,deleting:b,load:v,remove:A,fail:m}}function il(e){let[t,n]=h(""),[i,o]=h(null),[r,a]=h(null),[c,l]=h(null),[u,d]=h(null),[y,f]=h("add"),[S,b]=h(()=>new Set),[k,m]=h(null),[v,A]=h(void 0),[T,C]=h(!1),I=Q(()=>u?js(u.file,u.items,e.localItems,e.localConfig,e.localTheme,y):null,[u,e.localItems,e.localConfig,e.localTheme,y]),M=Q(()=>{if(!I||!u)return null;let j=new Set(u.items.map(D=>D.key));return I.items.filter(D=>D.change!=="removed"&&j.has(D.key)&&(y==="replace"||D.isNew))},[I,u,y]),N=Q(()=>M?ut(M):null,[M]),B=k&&k.for===M?k.checks:null,Z=Q(()=>new Map([...B!=null?B:[],...N!=null?N:[]]),[B,N]),W=Q(()=>I&&v!==void 0?Ws(I,v):new Set,[I,v]),E=Q(()=>{var j;return new Set(((j=I==null?void 0:I.items)!=null?j:[]).filter(D=>{var V;return D.change!=="removed"&&D.isNew&&(lt(Z.get(D.key))||((V=Z.get(D.key))==null?void 0:V.kind)==="unchecked")}).map(D=>D.key))},[I,Z]),O=Q(()=>I?di(I,Z,{optional:E,allowed:S,fixed:W,verb:"Load"}):null,[I,Z,E,S,W]),ce=I!=null&&I.theme&&!W.has(I.theme.key)&&(!E.has(I.theme.key)||S.has(I.theme.key))?I.theme:null,it=I!==null&&(B===null||v===void 0);P(()=>{if(!M||!N)return;let j=!0;return dt(M,N).then(D=>{j&&m({for:M,checks:D})}),()=>{j=!1}},[M,N]);async function ye(j){let D=j!=null?j:Hs(t);if(a(null),l(null),d(null),!D){a(Ft(new U("no_code")));return}o({code:D,pick:j!==void 0});try{let V=await Xs(D);f("add"),b(new Set),d({file:V,items:oe(V.keys),pick:j!==void 0}),qi().then(A)}catch(V){a(Ft(V))}finally{o(null)}}function wt(j,D){let V=new Set(S);D?V.add(j):V.delete(j),b(V)}async function xi(){if(!u||!I)return;C(!0),l(null);let j=[...new Set([...E,...W])].filter(D=>W.has(D)||!S.has(D));try{await pa(e.config,u.file,y,j,v!=null?v:null,u.pick),Spicetify.showNotification("Syncify: setup loaded. Reloading\u2026"),tn(I.manual,"share"),setTimeout(()=>window.location.reload(),1e3)}catch(D){C(!1),l(dm(D))}}return{input:t,setInput:n,fetching:i,error:r,applyError:c,shared:u,close:()=>{d(null),l(null)},mode:y,setMode:f,changes:O,theme:ce,checking:it,applying:T,open:ye,allow:wt,apply:xi}}function dm(e){if(e instanceof Jt){let t=e.reason instanceof Error?e.reason.message:String(e.reason);return`${e.message} ${t}`}return e instanceof Error?e.message:String(e)}async function mi(e){var t;try{return await navigator.clipboard.writeText(e),!0}catch(n){let i=(t=Spicetify.Platform)==null?void 0:t.ClipboardAPI;return i!=null&&i.copy?(await i.copy(e),!0):!1}}var fm=2e3;function ol(e){let{codes:t,compose:n}=e,[i,o]=h(null),[r,a]=h(null);P(()=>{if(!r)return;let d=setTimeout(()=>a(null),fm);return()=>clearTimeout(d)},[r]);async function c(d,y){await mi(d)&&a(y)}async function l(){i&&await t.remove(i.code)&&(n.forgetSaved(i.code),o(null))}let u=t.codes;return p("section",{className:"syncify-share-part","aria-label":"Your codes",children:[s(ee,{title:p(R,{children:["Your codes",t.newHearts>0?s("span",{className:"syncify-share-hearts",children:Qe(t.newHearts,"new heart")}):null]}),end:u&&t.max!==null?s(wo,{used:u.length,max:t.max,label:"Share codes"}):void 0}),t.error?s(L,{tone:"error",actions:s(x,{variant:"text",onClick:()=>{t.load()},children:"Try again"}),children:t.error}):null,n.saved?s(ym,{saved:n.saved,copied:r,onCopy:(d,y)=>{c(d,y)},discoverOpen:e.discoverOpen,onDismiss:n.dismissSaved}):null,n.error&&!n.compose?s(L,{tone:"error",children:n.error}):null,u===null?t.error?null:s(Y,{label:"Loading your codes",children:s(ve,{})}):u.length>0?s(Y,{label:"Your codes",children:u.map(d=>s(F,{name:bt(d),meta:s(z,{parts:[d.name?s("code",{className:"syncify-share-code",children:Ee(d.code)}):null,...qc(d)]}),end:p("span",{className:"syncify-share-code-actions",children:[s(x,{variant:"text",onClick:()=>{c(Ee(d.code),`code:${d.code}`)},children:r===`code:${d.code}`?"Copied":"Copy"}),d.link?s(x,{variant:"text",onClick:()=>{var y;c((y=d.link)!=null?y:"",`link:${d.code}`)},children:r===`link:${d.code}`?"Copied":"Get link"}):null,s(we,{trigger:"more",label:`More for ${bt(d)}`,disabled:n.compose!==null||t.deleting,items:[{label:"Update",onSelect:()=>{n.start(d)}},...e.discoverOpen&&!d.posted?[{label:"Post to Discover",onSelect:()=>X(sn(d.code))}]:[],{label:"Delete",danger:!0,onSelect:()=>o(d)}]})]})},d.code))}):null,u!==null?s("div",{className:"syncify-share-create",children:s(x,{variant:"secondary",onClick:()=>{n.start(null)},disabled:n.compose!==null||t.atMax||e.marketplaceAvailable===!1,children:"Create a code"})}):null,s(Je,{open:i!==null,onClose:()=>o(null),title:i?`Delete ${bt(i)}`:"",actions:p(R,{children:[s(x,{variant:"secondary",onClick:()=>o(null),disabled:t.deleting,children:"Keep it"}),s(x,{variant:"danger",onClick:()=>{l()},disabled:t.deleting,children:t.deleting?"Deleting\u2026":"Delete code"})]}),children:i?Jc(i):null})]})}function ym(e){let{saved:t}=e,n=Ee(t.code),i=t.link,o=t.outcome==="existing"?"You shared this setup already as":t.outcome==="updated"?"Code updated:":"Your code is ready:";return p(L,{tone:"info",live:!0,actions:p(R,{children:[s(x,{variant:"text",onClick:()=>e.onCopy(n,"saved-code"),children:e.copied==="saved-code"?"Copied":"Copy"}),i?s(x,{variant:"text",onClick:()=>e.onCopy(i,"saved-link"),children:e.copied==="saved-link"?"Copied":"Get link"}):null,t.outcome==="created"&&e.discoverOpen?s(x,{variant:"text",onClick:()=>X(sn(t.code)),children:"Post to Discover"}):null,s(x,{variant:"subtle",onClick:e.onDismiss,children:"Dismiss"})]}),children:[p("span",{children:[o," ",s("code",{className:"syncify-share-code",children:n})]}),t.leftOut>0?s("span",{className:"syncify-share-left-out",children:t.leftOut===1?"1 snippet isn't in Marketplace's list anymore, so it was left out.":`${t.leftOut} snippets aren't in Marketplace's list anymore, so they were left out.`}):null]})}function rl(e){let{session:t}=e,n=il(e),i=nl(e),o=tl({token:t==null?void 0:t.token,hasHandle:i.profile!==null,suggestedHandle:i.suggestedHandle,reload:i.load,fail:i.fail}),[r,a]=h(null);if(P(()=>{Zs().then(a)},[]),n.shared)return s(el,{idBase:e.idBase,load:n,marketplaceAvailable:e.marketplaceAvailable,busy:e.busy});if(o.compose)return s(Zc,{idBase:e.idBase,compose:o});let c=n.input.trim();return p(J,{idBase:e.idBase,id:"share",children:[s("form",{className:"syncify-share-part",noValidate:!0,onSubmit:l=>{l.preventDefault(),!n.fetching&&c&&n.open()},children:s(Se,{label:"Load a setup",value:n.input,onChange:n.setInput,placeholder:"Paste a code or a link",error:n.error,action:s(x,{variant:"secondary",type:"submit",disabled:n.fetching!==null||!c,children:n.fetching&&!n.fetching.pick?"Loading\u2026":"Load"})})}),r?p("section",{className:"syncify-share-part","aria-label":r.length>0?"Syncify picks":"Discover",children:[r.length>0?s(ee,{title:"Syncify picks"}):null,p(Y,{children:[r.map(l=>{var u;return s(F,{name:l.name,meta:s(z,{parts:[s("span",{className:"syncify-share-pips",children:Xc(l).map((d,y)=>s(ae,{kind:d},y))},"pips"),((u=n.fetching)==null?void 0:u.code)===l.code?"Loading\u2026":Qe(l.extensions+l.themes+l.snippets,"item")]}),onOpen:()=>{n.open(l.code)},openLabel:`Preview ${l.name}`,disabled:n.fetching!==null},l.code)}),s(F,{name:"Find more setups on Discover",end:s(x,{variant:"secondary",size:"small",onClick:()=>X(sn()),children:"Open"})})]})]}):null,t===void 0?null:t===null?s("div",{className:"syncify-share-part",children:s(ne,{label:"Sign in to share this setup as a code",children:s(x,{variant:"secondary",onClick:e.onSignIn,children:"Sign in"})})}):s(ol,{codes:i,compose:o,discoverOpen:r!==null,marketplaceAvailable:e.marketplaceAvailable})]})}var Eo="syncify:share-code-count",Ro="syncify:handle";function mm(){var t,n;let e=Number((n=(t=Spicetify.LocalStorage)==null?void 0:t.get(Eo))!=null?n:NaN);return Number.isInteger(e)&&e>=0?e:null}function pm(){var t;let e=(t=Spicetify.LocalStorage)==null?void 0:t.get(Ro);return e==null?void 0:e||null}function sl(){let[e,t]=h(()=>mm()),[n,i]=h(()=>pm()),o=ue(c=>{var l,u;c===null?(l=Spicetify.LocalStorage)==null||l.remove(Eo):(u=Spicetify.LocalStorage)==null||u.set(Eo,String(c)),t(c)},[]),r=ue(c=>{var l,u;c===void 0?(l=Spicetify.LocalStorage)==null||l.remove(Ro):(u=Spicetify.LocalStorage)==null||u.set(Ro,c!=null?c:""),i(c)},[]),a=ue(()=>{o(null),r(void 0)},[o,r]);return{codeCount:e,handle:n,saveCodeCount:o,saveHandle:r,forget:a}}var gm=2e3;function al(e){return p(R,{children:[e.nudge?s(L,{tone:"warning",actions:p(R,{children:[s(x,{variant:"subtle",size:"small",onClick:e.onHideNudge,disabled:e.securing,children:"Not now"}),s(x,{size:"small",onClick:e.onSecure,disabled:e.securing,children:e.securing?"Securing\u2026":"Secure"})]}),children:"Your backup isn't secured. Anyone who knows your Spotify username can restore it."}):null,e.restoreResult?s(hm,{manual:e.restoreResult.manual}):null]})}function hm(e){let[t,n]=h(!1),i=tc(e.manual).join(`
`);if(P(()=>{if(!t)return;let r=setTimeout(()=>n(!1),gm);return()=>clearTimeout(r)},[t]),!i)return null;let o=e.manual.length;return p(L,{tone:"info",actions:p(R,{children:[s(x,{variant:"text",onClick:()=>{mi(i).then(n)},children:t?"Copied":"Copy"}),s(x,{variant:"subtle",onClick:Xa,children:"Dismiss"})]}),children:[o===1?"1 isn't from Marketplace. Add it in a terminal:":`${o} aren't from Marketplace. Add them in a terminal:`,s("pre",{className:"syncify-commands",children:s("code",{children:i})})]})}function cl(e){let{message:t}=e;return s(L,{tone:t.kind,actions:p(R,{children:[t.kind==="error"?s(x,{variant:"text",onClick:e.onTryAgain,disabled:e.busy,children:"Try again"}):null,s(x,{variant:"subtle",onClick:e.onDismiss,children:"Dismiss"})]}),children:t.text})}function Sm(e,t=new Date){let n=new Date(e);return n.toDateString()===t.toDateString()?"today":n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===t.getFullYear()?void 0:"numeric"})}function bm(e){let t=e[e.length-1];return e.length===1?t:`${e.slice(0,-1).join(", ")} and ${t}`}function pi(e,t){let n=e.emails.length>1;return{title:`This backup is secured by ${bm(e.emails)}`,text:t?"You're signed in with a different email. The backups you make here stay yours.":n?"If one of them is your email, sign in to see your backups. If none is, the backups you make here stay yours.":"If that's your email, sign in to see your backups. If it isn't, the backups you make here stay yours."}}var wm=new Set(["Windows","macOS","Linux"]);function gi(e,t=new Date){let n=Sm(e.first_seen_at,t),i=n==="today"?n:`on ${n}`;return e.device&&wm.has(e.device)?`Did you back up from ${e.device} ${i}?`:`Did you back up with Syncify ${i}?`}var hi="Syncify keeps those backups apart from yours. If they're yours, press That's me to bring them together.",Si="Enter the code from that Syncify",ll="It's in Settings, in the Syncify that made those backups.";function ul(e){return e==="approve"?"Syncify: backups brought together":"Syncify: backups kept apart"}function dl(e){let t=km(e);return t.backedUp&&e.latest?w(g({},t),{line:[`Backed up ${St(e.latest.metadata.last_sync_datetime)}`,`${Ze(e.localItemCount)} on this device`]}):w(g({},t),{line:[t.title,...t.detail]})}function km(e){let t={backedUp:!1,supportAsk:null},n=`${Ze(e.localItemCount)} on this device`;return e.restoreResult&&!e.unsupported?vm(e.restoreResult):e.unsupported?w(g({},t),{title:"Update Syncify to keep backing up",detail:["Your backups are safe"],action:"how-to-update"}):e.activity==="backing-up"?w(g({},t),{title:"Backing up\u2026",detail:[],action:"back-up"}):e.checked?e.latest?e.localHash&&!e.backedUp?w(g({},t),{title:"Changes since your last backup",detail:xm(e.latest,e.latestItems,e.localItems,e.localConfig),action:"back-up"}):w(g({},t),{title:"Everything is backed up",detail:[`Last backup ${St(e.latest.metadata.last_sync_datetime)}`,n],action:null,backedUp:!0}):w(g({},t),{title:"No backup yet",detail:["Save your extensions and themes to restore them after a reinstall or on another computer."],action:"back-up"}):e.checkError?w(g({},t),{title:"Couldn't check your backup",detail:[e.checkError],action:"try-again"}):w(g({},t),{title:"Checking your backup\u2026",detail:[],action:null})}function vm(e){let t=e.loaded===e.total,n=e.kind==="share";return{title:t?n?"Setup loaded":"Backup restored":`${n?"Loaded":"Restored"} ${e.loaded} of ${e.total}`,detail:[t?e.total===0?"Nothing from Marketplace to load":`${e.loaded} of ${e.total} loaded`:"Missing something? Reload Spotify once more."],action:t?null:"reload",backedUp:!1,supportAsk:t?n?"Syncify set it up for you?":"Syncify saved your setup?":null}}function xm(e,t,n,i){var y;let o=new Set(t),r=new Set(n),a=n.filter(f=>!o.has(f)).length,c=t.filter(f=>!r.has(f)).length,l=(y=e.spicetify_config)!=null?y:null,u=!!(i&&!l),d=!u&&(i&&l?!hs(i,l):i!==l);return[a?`${a} added`:null,c?`${c} removed`:null,d?"Spicetify config changed":null,u?"Spicetify config not saved yet":null,`Last backup ${St(e.metadata.last_sync_datetime)}`].filter(f=>f!==null)}function fl(e,t,n){return e?w(g({kind:"claim"},pi(e,n)),{signIn:!n}):t?{kind:"install",title:gi(t),text:hi,install:t}:null}var Cm=3,yl={exists:!1,payload:null,backups:[],safetyCopy:null,pinned:[],borrowed:!1,others:[],claim:null,unapproved:[],install:null,nudge:!1},tt=null;function ml(e){var d,y;let[t,n]=h(()=>tt),[i,o]=h(void 0),r=ue(f=>{tt=f,n(f)},[]),a=ue(async()=>{let f=await Ve(e),S=await te().catch(()=>null),b=S?await ga(e).catch(()=>null):null,k=S?await te().catch(()=>null):null;r({remote:f,claims:k?b:null}),o(k)},[e,r]),c=ue(()=>{te().catch(()=>null).then(f=>o(S=>S!=null?S:f))},[]),l=ue(f=>{let S=tt!=null?tt:{remote:yl,claims:null},{remote:b}=S,k=b.borrowed?[...b.backups,...b.safetyCopy?[b.safetyCopy]:[],...b.pinned]:b.others;r(w(g({},S),{remote:w(g(w(g({},b),{exists:!0,payload:f,backups:b.borrowed?[f]:[f,...b.backups.filter(m=>m.payload_hash!==f.payload_hash)].slice(0,Cm)}),b.borrowed?{safetyCopy:null,pinned:[]}:{}),{borrowed:!1,others:k.filter(m=>m.payload_hash!==f.payload_hash)})}))},[r]),u=ue(()=>{o(null),tt&&r(w(g({},tt),{claims:null}))},[r]);return{check:t,remote:(d=t==null?void 0:t.remote)!=null?d:yl,claims:(y=t==null?void 0:t.claims)!=null?y:null,session:i,setSession:o,refresh:a,readSession:c,addBackup:l,forgetClaims:u}}function pl(){let[e,t]=h(null),[n,i]=h(!1),o=ue(async()=>{try{let r=await On();return t(r),i(!1),r}catch(r){throw i(!0),r}},[]);return{local:e,localFailed:n,refreshLocal:o}}var Im=600*1e3;function gl(){let[e,t]=h(null);return P(()=>{let n=$();if(!uo(n.version))return;let i=!0;return uc(n.releasesUrl).then(o=>{i&&o&&fo(o,n.version)>0&&t(o)}),()=>{i=!1}},[]),e}function hl(){let[e,t]=h(()=>qa()),[n]=h(()=>Date.now());return P(()=>Ja(t),[]),{result:e,recent:!!(e&&n-e.at<Im)}}function Sl(e){let t=$(),n=[["Report an issue",t.issueUrl],["GitHub",t.githubUrl],["Discord",t.discordUrl],["Support on Ko-fi",t.kofiUrl]],i=[["Privacy",`${t.webUrl}/privacy`],["Terms",`${t.webUrl}/terms`]];return p("footer",{className:"syncify-window-footer",children:[p("span",{className:"syncify-window-footer-version",children:[s(z,{className:"syncify-window-footer-meta",parts:[`Syncify ${t.version}`,...i.map(([o,r])=>s(x,{variant:"subtle",size:"tiny",className:"syncify-window-footer-legal",onClick:()=>X(r),children:o},o))]}),e.newerVersion?s(x,{variant:"text",size:"tiny",className:"syncify-window-update",onClick:()=>e.loadedByLoader?window.location.reload():X(`${t.githubUrl}#updating`),children:s(z,{className:"syncify-window-footer-meta",parts:[`${e.newerVersion} is out`,e.loadedByLoader?"Reload":"How to update"]})}):null]}),s("span",{className:"syncify-window-footer-links",children:n.map(([o,r])=>s(x,{variant:"subtle",size:"tiny",onClick:()=>X(r),children:o},o))})]})}function bi(e,t){let[n,i]=h("ask"),[o,r]=h(""),[a,c]=h(!1),[l,u]=h(null),[d,y]=h(null),f=Dc(o);async function S(b){c(!0),u(null),y(null);try{await Sa(G(),e.id,b),Spicetify.showNotification(ul(b.action)),await t.onDone(),i("ask"),r("")}catch(k){k instanceof at?y(k.message):t.onError?t.onError(k):u(k instanceof Error?k.message:String(k))}finally{c(!1)}}return{step:n,code:o,busy:a,error:l,codeError:d,complete:f.length===6,setCode(b){r(b),y(null)},askForCode:()=>i("code"),back(){i("ask"),y(null)},notMe:()=>{S({action:"reject"})},confirm(){f.length===6&&!a&&S({action:"approve",code:f})}}}function wi(e){let{answer:t}=e;return p(R,{children:[s("p",{children:ll}),s(Se,{label:"Code",value:t.code,onChange:t.setCode,error:t.codeError,maxLength:7,disabled:t.busy,mono:!0,autoFocus:!0})]})}function ki(e){let{answer:t}=e;return p(R,{children:[s(x,{variant:"secondary",onClick:t.back,disabled:t.busy,children:"Back"}),s(x,{type:"submit",disabled:t.busy||!t.complete,children:"That's me"})]})}var Em={"back-up":"Back up now","try-again":"Try again","how-to-update":"How to update",reload:"Reload"};function bl(e){let{status:t,alert:n}=e,i=t.action,o=i?s(x,{variant:i==="back-up"?"primary":"secondary",size:n?"small":"regular",onClick:()=>e.onAction(i),disabled:e.busy,children:i==="back-up"&&e.backingUp?"Backing up\u2026":Em[i]}):null;return n?p("section",{className:"syncify-status","aria-label":"Status",children:[p("div",{className:"syncify-status-alert",role:"alert",children:[p("div",{className:"syncify-status-alert-body",children:[s("span",{className:"syncify-status-alert-mark",children:s(be,{tone:"warning",icon:s(ho,{})})}),p("div",{className:"syncify-status-text",children:[s("h2",{className:"syncify-status-title",children:n.title}),n.text?s("p",{className:"syncify-status-sentence",children:n.text}):null]})]}),n.kind==="claim"?n.signIn?p("span",{className:"syncify-status-answers",children:[s(x,{variant:"secondary",onClick:e.onNotMe,children:"Not me"}),s(x,{onClick:e.onSignIn,children:"That's me, sign in"})]}):s(x,{variant:"secondary",onClick:e.onNotMe,children:"Not me"}):s(Rm,{install:n.install,onDone:e.onInstallAnswered,onError:e.onError},n.install.id)]}),p("div",{className:"syncify-status-line","aria-live":"polite",children:[t.backedUp?s(Me,{className:"syncify-status-check"}):null,s(z,{parts:t.line}),o]})]}):s("section",{className:"syncify-status","aria-label":"Status",children:p("div",{className:"syncify-status-main","aria-live":"polite",children:[p("div",{className:"syncify-status-text",children:[s("h2",{className:"syncify-status-title",children:t.title}),t.detail.length>0?s(z,{parts:t.detail}):null,t.supportAsk?p("p",{className:"syncify-status-ask",children:[s("span",{children:t.supportAsk}),s(x,{variant:"text",onClick:e.onSupport,children:"Support it on Ko-fi"})]}):null]}),o]})})}function Rm(e){let t=bi(e.install,{onDone:e.onDone,onError:e.onError});return p(R,{children:[p("span",{className:"syncify-status-answers",children:[s(x,{variant:"secondary",onClick:t.notMe,disabled:t.busy,children:"Not me"}),s(x,{onClick:t.askForCode,disabled:t.busy,children:"That's me"})]}),s(Je,{open:t.step==="code",title:Si,actions:s(ki,{answer:t}),onClose:t.back,onSubmit:t.confirm,children:s(wi,{answer:t})})]})}function wl(e){let{codeCount:t,account:n,newerVersion:i}=e,o=[{id:"backups",label:"Backups"},{id:"share",label:"Share",status:t?s(bo,{count:t,label:Qe(t,"code")}):void 0},{id:"account",label:"Account",status:n?n.kind==="ok"?s("span",{className:"syncify-tab-check",role:"img","aria-label":n.label,children:s(Me,{})}):s(be,{tone:"warning",label:n.label}):void 0},{id:"settings",label:"Settings",status:e.settingsHeld?s(be,{tone:"warning",label:"An item's extension settings aren't syncing"}):i?s(be,{tone:"info",label:`Syncify ${i} is out`}):void 0}];return s(vo,{tabs:o,selected:e.selected,onSelect:e.onSelect,idBase:e.idBase,label:"Syncify"})}var kl=!1;function an(e){var Do,Oo,Uo,$o,Ho,Ko,zo,Fo,jo,Wo,Yo,Vo;let t=K("syncify"),n=$(),[i,o]=h(()=>G()),{local:r,localFailed:a,refreshLocal:c}=pl(),l=ml(i),u=sl(),d=gl(),y=hl(),f=Gc(),[S,b]=h(()=>!kl),[k]=h(()=>lc()!==null),[m,v]=h((Do=e.tab)!=null?Do:"backups"),[A,T]=h(()=>l.check?"idle":"checking"),[C,I]=h(null),[M,N]=h(null),[B,Z]=h(!1),[W,E]=h(!1),[O,ce]=h(null),[it,ye]=h(()=>xa()),[wt,xi]=h(e.secure===!0),j=H(!1),{remote:D,claims:V,session:le}=l,kt=A!=="idle",Ci=(Oo=r==null?void 0:r.hash)!=null?Oo:null,[,Nl]=Ei(_=>_+1,0),vt=Xt(D.claim),ot=kc(V),Ao=le!=null&&ot.kind==="secured",ln=Ao&&i.settingsSyncEnabled,_o=ln&&f.arrived&&!f.arrived.hidden?f.arrived:null,Tl=ln&&et(f,i.settingsSyncOff).length>0,Ii=!!(Ci&&D.backups.some(_=>_.payload_hash===Ci)),Pl=dl({activity:A,checked:l.check!==null,checkError:C,unsupported:B,latest:D.payload,latestItems:D.payload?ht(D.payload).map(_=>_.key):[],backedUp:Ii,localHash:Ci,localItems:(Uo=r==null?void 0:r.installedItems)!=null?Uo:[],localItemCount:($o=r==null?void 0:r.installedItemCount)!=null?$o:0,localConfig:(Ho=r==null?void 0:r.spicetifyConfig)!=null?Ho:null,restoreResult:y.recent?y.result:null}),Al=fl(vt,(zo=(Ko=D.install)==null?void 0:Ko.waiting[0])!=null?zo:null,le!=null),_l=!it&&D.payload!==null&&m!=="account"&&(le?ot.kind==="open":le===null&&D.nudge),Ml=(le?(Fo=V==null?void 0:V.accounts)!=null?Fo:[]:[]).filter(_=>_.status==="final").map((_,ie)=>({hash:_.hash,label:`Spotify username ${ie+1}${_.device_info?` from ${_.device_info}`:""}`})).filter(_=>_.hash!==(V==null?void 0:V.hash));async function $e(_={}){try{(!_.silent||!l.check)&&T("checking"),_.silent||(N(null),I(null)),await c(),await l.refresh(),I(null),T("idle")}catch(ie){xt(ie)}}function xt(_){if(T("idle"),_ instanceof Mt){Z(!0),N(null);return}let ie=_ instanceof Error?_.message:String(_);l.check?N({kind:"error",text:ie}):I(ie),Spicetify.showNotification(ie,!0,6e3)}async function Ll(){try{T("backing-up"),N(null);let _=await Zt(i).catch(()=>null),{payload:ie,unchanged:un,settings:Kl}=await Ye(i,_);await ti(_,Kl,D.backups).catch(()=>null),await c(),un||l.addBackup(ie),T("idle"),Spicetify.showNotification(un?"Syncify: everything is already backed up":"Syncify backup complete")}catch(_){xt(_)}}async function Bl(_){var ie;try{T("restoring"),N(null),await ma(i,_.row.backup,(ie=_.linkedHash)!=null?ie:void 0,_.skipped,_.settings),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),tn(_.manual),setTimeout(()=>window.location.reload(),1e3)}catch(un){xt(un)}}function Dl(){vt&&(Gn(vt),Nl())}async function Ct(){E(!0),ce(null);try{D.borrowed&&Ii&&await Ye(i),await ha(i)}catch(_){ce(_ instanceof Error?_.message:String(_))}finally{await $e({silent:!0}),E(!1)}}function Ol(){le?Ct():v("account")}function Ul(){xi(!0),le?Ct():v("account")}function $l(_){l.setSession(_),j.current=!0,D.claim===null&&D.payload&&(!D.borrowed||Ii)?Ct():$e({silent:!0})}function Mo(){u.forget(),l.forgetClaims(),ce(null),$e({silent:!0})}function Hl(_){_==="back-up"?Ll():_==="try-again"?$e():_==="how-to-update"?X(`${n.githubUrl}#updating`):Za()}P(()=>Qn(()=>o(_=>w(g({},_),{settingsSyncOff:G().settingsSyncOff}))),[]);let Lo=Te(()=>{l.readSession(),$e({silent:!0})});P(()=>Lo.current(),[Lo]);let Bo=Te(()=>{!e.secure||j.current||W||!le||ot.kind!=="open"||(j.current=!0,Ct())});return P(()=>Bo.current(),[Bo,le,ot.kind,W]),p("div",{className:"syncify-ui syncify-window",onClick:To,onMouseDown:To,onPointerDown:To,children:[p("div",{className:"syncify-window-top",children:[s(bl,{status:Pl,alert:Al,backingUp:A==="backing-up",busy:kt,onAction:Hl,onSignIn:()=>v("account"),onNotMe:Dl,onInstallAnswered:()=>$e({silent:!0}),onError:xt,onSupport:()=>X(n.kofiUrl)}),M?s(cl,{message:M,busy:kt,onTryAgain:()=>{$e()},onDismiss:()=>N(null)}):null,_o?s(L,{tone:"info",actions:p(R,{children:[s(x,{variant:"subtle",size:"small",onClick:Pa,children:"Not now"}),s(x,{size:"small",onClick:()=>window.location.reload(),children:"Reload Spotify"})]}),children:ei(_o.names)}):null,s(wl,{idBase:t,selected:m,onSelect:v,codeCount:le?u.codeCount:null,account:vc(le,vt!==null,ot),newerVersion:d,settingsHeld:Tl})]}),m==="backups"?s(_c,{idBase:t,config:i,remote:l.check?D:null,failed:C!==null||a,local:r,otherAccounts:Ml,notices:s(al,{nudge:_l,securing:W,onSecure:Ul,onHideNudge:()=>{Ca(),ye(!0)},restoreResult:y.result}),canShareSettings:ln,shareSettings:i.shareRestoredSettings,onShareSettingsChange:_=>{let ie=w(g({},i),{shareRestoredSettings:_});We(ie),o(ie)},busy:kt,restoring:A==="restoring",onRestore:_=>{Bl(_)},onError:xt}):m==="share"?s(rl,{idBase:t,config:i,session:le,localItems:(jo=r==null?void 0:r.items)!=null?jo:[],localConfig:(Wo=r==null?void 0:r.spicetifyConfig)!=null?Wo:null,localTheme:(Yo=r==null?void 0:r.activeTheme)!=null?Yo:null,marketplaceAvailable:(Vo=r==null?void 0:r.marketplaceAvailable)!=null?Vo:null,busy:kt,onSignIn:()=>v("account"),onSignedOut:Mo,onCodeCount:u.saveCodeCount,onHandle:u.saveHandle}):m==="account"?s(wc,{idBase:t,session:le,securedElsewhere:vt!==null,secure:ot,securing:W,secureError:O,onSecure:()=>{Ct()},nudge:wt,onSignedIn:$l,onSignedOut:Mo,handle:u.handle,onHandle:u.saveHandle}):s(Vc,{idBase:t,config:i,onConfigChange:o,busy:kt,unsupported:B,syncStatus:f,secured:Ao,securing:W,onSecure:Ol}),ln&&f.choices.length>0?s(Mc,{choices:f.choices,open:S,onClose:()=>{kl=!0,b(!1)}}):null,s(Sl,{newerVersion:d,loadedByLoader:k})]})}function To(e){e.stopPropagation()}var vl=`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="-2.5 -2.5 37 37" aria-hidden="true" focusable="false"><defs><mask id="syncify-mark-gap" maskUnits="userSpaceOnUse" x="-2" y="-2" width="36" height="36"><rect x="-2" y="-2" width="36" height="36" fill="#fff"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></mask></defs><g mask="url(#syncify-mark-gap)"><g transform="rotate(15 16 16)"><path d="M16 16L16 7.4A8.6 8.6 0 0 1 24.6 16Z" fill="#6cd1d1" transform="translate(0.42 -0.42)"/><path d="M16 16L24.6 16A8.6 8.6 0 0 1 16 24.6Z" fill="#efa4c1" transform="translate(0.42 0.42)"/><path d="M16 16L16 24.6A8.6 8.6 0 0 1 7.4 16Z" fill="#d3c48c" transform="translate(-0.42 0.42)"/><path d="M16 16L7.4 16A8.6 8.6 0 0 1 16 7.4Z" fill="#88bcf2" transform="translate(-0.42 -0.42)"/></g></g><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 28.03A12.4 12.4 0 1 1 28.03 19"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91"/></g></svg>
`;var Pe=null;function nt(){return!!(Pe!=null&&Pe.container.isConnected)}function cn(){Spicetify.PopupModal.hide()}function Ue(e){xl(Pe);let t=document.createElement("div");Pe={container:t,root:null,watch:null};try{Spicetify.PopupModal.display({title:$().extensionName,content:t,isLarge:!1})}catch(n){throw se("Failed to open PopupModal",n),n}Pm(t),_m(t,e),Tm(t)}function Tm(e){let t=Pe;if((t==null?void 0:t.container)!==e||typeof MutationObserver!="function")return;let n=new MutationObserver(()=>{e.isConnected||xl(t)});n.observe(document.body,{childList:!0,subtree:!0}),t.watch=n}function xl(e){var t,n;e&&((t=e.watch)==null||t.disconnect(),e.watch=null,(n=e.root)==null||n.unmount(),e.root=null)}function Pm(e){requestAnimationFrame(()=>{let t=Am(e);t==null||t.classList.add("syncify-modal-shell");let n=t==null?void 0:t.querySelector(".main-trackCreditsModal-header h1");if(n&&!n.querySelector(".syncify-modal-mark")){let o=document.createElement("span");o.className="syncify-modal-mark",o.innerHTML=vl,n.prepend(o)}let i=t==null?void 0:t.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');i&&(i.classList.add("syncify-modal-close"),i.setAttribute("aria-label",`Close ${$().extensionName}`),i.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function Am(e){let t=e.parentElement;for(;t&&t!==document.body;){if(t.querySelector(".main-trackCreditsModal-header"))return t;t=t.parentElement}return e.closest('[class*="trackCreditsModal"]')}function _m(e,t){try{if(typeof Spicetify.ReactDOM.createRoot=="function"){let n=Spicetify.ReactDOM.createRoot(e);n.render(t),(Pe==null?void 0:Pe.container)===e&&(Pe.root=n),re("Window rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(t,e),re("Window rendered",{renderer:"render"})}catch(n){throw se("Failed to render window",n),n}}function vi(e){return s("div",{className:"syncify-ui syncify-launch-notice",children:p(oi,{title:e.title,actions:e.actions,onSubmit:e.onSubmit,children:[typeof e.children=="string"?s("p",{children:e.children}):e.children,e.error?s(L,{tone:"error",children:e.error}):null]})})}function Cl(e){let{title:t,text:n}=pi(e.claim,e.signedIn),i=()=>{Gn(e.claim),e.onClose()};return s(vi,{title:t,actions:e.signedIn?p(R,{children:[s(x,{variant:"secondary",onClick:e.onClose,children:"Close"}),s(x,{onClick:i,children:"Not me"})]}):p(R,{children:[s(x,{variant:"secondary",onClick:i,children:"Not me"}),s(x,{onClick:e.onSignIn,children:"That's me, sign in"})]}),children:n})}function Il(e){let t=bi(e.install,{onDone:e.onDone});return t.step==="code"?s(vi,{title:Si,error:t.error,actions:s(ki,{answer:t}),onSubmit:t.confirm,children:s(wi,{answer:t})}):s(vi,{title:gi(e.install),error:t.error,actions:p(R,{children:[s(x,{variant:"secondary",onClick:t.notMe,disabled:t.busy,children:"Not me"}),s(x,{onClick:t.askForCode,disabled:t.busy,children:"That's me"})]}),children:hi})}function El(e){return s(vi,{title:"Your backup isn't secured",actions:p(R,{children:[s(x,{variant:"secondary",onClick:e.onClose,children:"Not now"}),s(x,{onClick:t=>{t.stopPropagation(),e.onSecure()},children:"Secure"})]}),children:"Anyone who knows your Spotify username can restore it."})}function Mm(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var Rl="syncify-styles";function Lm(){if(document.getElementById(Rl)){re("Another copy of Syncify is running; stopping this one");return}Xo(Spicetify.React),Bm();let e=G();fa({topbarButton:rc(Po),menuItem:ac(Po)}),Wn(e.entryPoint),eo(e.shortcut,Po),Fa({onSecuredElsewhere:Dm,onInstall:Om,onNudge:Um,onFirstSync:$m}).catch(t=>{se("Startup sync check failed",t)}),ec().catch(t=>{se("Restore check failed",t)})}function Bm(){let e=document.createElement("style");e.id=Rl,e.textContent=Rr,document.head.appendChild(e)}function Po(){if(nt()){cn();return}Ue(s(an,{}))}function Dm(e){nt()||(re("Opening secured notice"),te().catch(t=>{if(t instanceof He)return null;throw t}).then(t=>{nt()||Ue(s(Cl,{claim:e,signedIn:t!==null,onSignIn:()=>Ue(s(an,{tab:"account"})),onClose:cn}))},t=>se("Secured notice skipped",t)))}function Om(e){nt()||(re("Opening install notice"),Ue(s(Il,{install:e,onDone:cn})))}function Um(){nt()||(re("Opening nudge notice"),Ea(),Ue(s(El,{onSecure:()=>Ue(s(an,{tab:"account",secure:!0})),onClose:cn})))}function $m(){nt()||(re("Opening first sync"),Ue(s(an,{tab:"settings"})))}Qa();(function e(){if(!Mm()){setTimeout(e,100);return}re("Spicetify APIs ready"),Lm()})();})();
