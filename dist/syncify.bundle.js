// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var iu=Object.defineProperty,ou=Object.defineProperties;var ru=Object.getOwnPropertyDescriptors;var pn=Object.getOwnPropertySymbols;var nr=Object.prototype.hasOwnProperty,ir=Object.prototype.propertyIsEnumerable;var tr=(e,t,n)=>t in e?iu(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,p=(e,t)=>{for(var n in t||(t={}))nr.call(t,n)&&tr(e,n,t[n]);if(pn)for(var n of pn(t))ir.call(t,n)&&tr(e,n,t[n]);return e},w=(e,t)=>ou(e,ru(t));var ge=(e,t)=>{var n={};for(var i in e)nr.call(e,i)&&t.indexOf(i)<0&&(n[i]=e[i]);if(e!=null&&pn)for(var i of pn(e))t.indexOf(i)<0&&ir.call(e,i)&&(n[i]=e[i]);return n};var Nt,E,de,_,Tt,X,Ni,H,h;function or(e){({createElement:Nt,Fragment:E,useCallback:de,useEffect:_,useLayoutEffect:Tt,useMemo:X,useReducer:Ni,useRef:H,useState:h}=e)}var rr=`/* Shared values for every part. Colors come from the active Spicetify theme,
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
`;var sr=`.syncify-icon {
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
`;var ar=`.syncify-btn,
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
`;var cr=`.syncify-switch-control {
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
`;var lr=`.syncify-checkbox {
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
`;var ur=`/* A square ring; picked, the ring and a square inside it in the accent. */
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
`;var dr=`.syncify-setting-row {
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
`;var fr=`/* Facts on one line, wrapping between facts. Each fact is trimmed to its
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
`;var yr=`.syncify-list {
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
`;var mr=`.syncify-field-group {
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
`;var pr=`.syncify-menu {
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
`;var gr=`.syncify-meter {
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
`;var hr=`.syncify-mark-square {
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
`;var Sr=`.syncify-notice {
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
`;var br=`.syncify-dialog {
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
`;var wr=`/* When the window is too narrow for every tab, the row scrolls sideways
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
`;var kr=`.syncify-pip-square {
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
`;var vr=`.syncify-section-label {
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
`;var xr=`.syncify-keycap {
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
`;var Cr=`/* A bar as tall as the capitals of the text it stands in for. */
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
`;var Ir=[rr,sr,ar,cr,lr,ur,dr,fr,yr,mr,pr,gr,hr,Sr,br,wr,kr,vr,xr,Cr].join(`
`);var Rr=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var Er=`/* The window fits the height Spotify's popup leaves it, so the status and
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
`;var Nr=`/* The safety copy's shield and a pinned backup's pin, after their names. */
.syncify-safety-mark {
    color: var(--syncify-color-accent);
}

/* "Current", where an older backup has its chevron. */
.syncify-row-status {
    color: var(--syncify-color-accent);
    font-size: var(--syncify-text-small);
    font-weight: 700;
}
`;var Tr=`/* Adds, Updates and Removes: plain colored text, not chips. */
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
`;var Pr=`/* Loading a setup, the picks and your codes, split by dashed lines. */
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
`;var Ar=`/* The code step's Resend and Use another email. */
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
`;var _r=`/* Turn off or Use default, then the key. */
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
`;var Mr=`/* A launch notice in Spotify's popup: the dialog layout, the popup's width. */
.syncify-launch-notice {
    width: 100%;
}
`;var Lr=[Ir,Rr,Er,Tr,Nr,Pr,Ar,_r,Mr].join(`
`);var Lu="syncify",Ue="state";var gn={durability:"strict"},Ve=class extends Error{constructor(){super("IndexedDB isn't available."),this.name="DatabaseUnavailableError"}},Br="syncify:database-opened";function hn(){let e;try{e=window.indexedDB}catch(t){return Promise.resolve(null)}return e?new Promise((t,n)=>{let i;try{i=e.open(Lu,1)}catch(o){t(null);return}i.onupgradeneeded=()=>{i.result.createObjectStore(Ue)},i.onerror=()=>{var o;Dr()?n((o=i.error)!=null?o:new Error("IndexedDB failed to open.")):t(null)},i.onsuccess=()=>{Du(),Bu(),t(i.result)}}):Promise.resolve(null)}var Ou=[500,1500,4e3];async function Sn(e){for(let t of Ou)try{return await e()}catch(n){await new Promise(i=>setTimeout(i,t))}return e()}var Or=!1;function Bu(){var e,t;if(!Or){Or=!0;try{(t=(e=navigator.storage)==null?void 0:e.persist)==null||t.call(e).catch(()=>!1)}catch(n){}}}function Dr(){try{return window.localStorage.getItem(Br)==="true"}catch(e){return!1}}function Du(){try{Dr()||window.localStorage.setItem(Br,"true")}catch(e){}}function Ti(e,t,n=!1){let i=n&&e==="readwrite"?gn:void 0,o=hn().then(r=>new Promise((a,c)=>{if(!r){c(new Ve);return}try{let l=r.transaction(Ue,e,i),u=t(l.objectStore(Ue));l.oncomplete=()=>{r.close(),a(u.result)},l.onerror=l.onabort=()=>{var d;r.close(),c((d=l.error)!=null?d:new Error("IndexedDB failed."))}}catch(l){r.close(),c(l)}}));return n?o:Promise.race([o,new Promise((r,a)=>setTimeout(()=>a(new Error("IndexedDB took too long.")),2e3))])}function he(e,t={}){return Ti("readonly",n=>n.get(e),t.wait)}async function ye(e,t,n={}){await Ti("readwrite",i=>i.put(t,e),n.wait)}async function bn(e){await Ti("readwrite",t=>t.delete(e))}var Ce={extensionName:"Syncify",version:"1.20.5",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",discordUrl:"https://syncify.wsoltani.com/discord",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com",shareUrl:"https://syncs.wsoltani.com"};function U(){var t,n,i,o,r,a,c,l,u,d;let e=window.SyncifyConfig;return{extensionName:(t=Me(e==null?void 0:e.extensionName))!=null?t:Ce.extensionName,version:(n=Ur(e==null?void 0:e.version))!=null?n:Ce.version,workerUrl:(i=Me(e==null?void 0:e.workerUrl))!=null?i:Ce.workerUrl,webUrl:(o=Me(e==null?void 0:e.webUrl))!=null?o:Ce.webUrl,githubUrl:(r=Me(e==null?void 0:e.githubUrl))!=null?r:Ce.githubUrl,kofiUrl:(a=Me(e==null?void 0:e.kofiUrl))!=null?a:Ce.kofiUrl,discordUrl:(c=Me(e==null?void 0:e.discordUrl))!=null?c:Ce.discordUrl,issueUrl:(l=Me(e==null?void 0:e.issueUrl))!=null?l:Ce.issueUrl,releasesUrl:(u=Me(e==null?void 0:e.releasesUrl))!=null?u:Ce.releasesUrl,shareUrl:(d=Me(e==null?void 0:e.shareUrl))!=null?d:Ce.shareUrl}}function Me(e){return Ur(e)}function Ur(e){return typeof e=="string"&&e.trim()?e.trim():null}var Uu="x-syncify-version",$u="x-syncify-install",Hu="x-syncify-timezone",Ku="x-syncify-trust",zu="2",Pi="install-id",Ai="syncify:install-id",ct=null;async function $r(){let e={[Uu]:U().version,[$u]:(await wn()).id,[Ku]:zu},t=Wu();return t&&(e[Hu]=t),e}function wn(){if(!ct){let e=Fu();ct=e,e.catch(()=>{ct===e&&(ct=null)})}return ct}var Pt=null;function Hr(e){return Pt!=null||(Pt=(async()=>{if((await wn()).id!==e)return;let t=await hn();if(!t)throw new Error("IndexedDB isn't available.");let n=_i();await new Promise((i,o)=>{let r=t.transaction(Ue,"readwrite",gn);r.objectStore(Ue).put(n,Pi),r.oncomplete=()=>{t.close(),i()},r.onerror=r.onabort=()=>{var a;t.close(),o((a=r.error)!=null?a:new Error("IndexedDB failed."))}}),ct=Promise.resolve({id:n,inDatabase:!0})})().finally(()=>{Pt=null})),Pt}async function Fu(){let e=await Sn(ju);if(e)return{id:e,inDatabase:!0};let t=Kr();if(t)return{id:t,inDatabase:!1};let n=_i();try{window.localStorage.setItem(Ai,n)}catch(i){}return{id:n,inDatabase:!1}}async function ju(){let e=await hn();if(!e)return null;let t=await new Promise((n,i)=>{let o=null;try{let r=e.transaction(Ue,"readwrite",gn),a=r.objectStore(Ue),c=a.get(Pi);c.onsuccess=()=>{var l;if(typeof c.result=="string"&&zr(c.result)){o=c.result;return}o=(l=Kr())!=null?l:_i(),a.put(o,Pi)},r.oncomplete=()=>{e.close(),o?n(o):i(new Error("IndexedDB failed."))},r.onerror=r.onabort=()=>{var l;e.close(),i((l=r.error)!=null?l:new Error("IndexedDB failed."))}}catch(r){e.close(),i(r)}});try{window.localStorage.removeItem(Ai)}catch(n){}return t}function Kr(){try{let e=window.localStorage.getItem(Ai);return e&&zr(e)?e:null}catch(e){return null}}function _i(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t=[...e].map(n=>n.toString(16).padStart(2,"0"));return[t.slice(0,4).join(""),t.slice(4,6).join(""),t.slice(6,8).join(""),t.slice(8,10).join(""),t.slice(10).join("")].join("-")}function zr(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(e)}function Wu(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(e){return null}}var Yu="syncify-signature-v1",Vu={name:"ECDSA",hash:"SHA-256"};function kn(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function vn(e){return Mi(new Uint8Array(await crypto.subtle.exportKey("raw",e)))}async function At(e,t,n,i,o){let r=await Gu(t,n,i,o),a=await crypto.subtle.sign(Vu,e,r);return Mi(new Uint8Array(a))}async function Gu(e,t,n,i){let{pathname:o,search:r}=new URL(n),a=new TextEncoder,c=Mi(new Uint8Array(await crypto.subtle.digest("SHA-256",a.encode(i))));return a.encode([Yu,e,t.toUpperCase(),o+r,c].join(`
`))}function Mi(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var Fr="device-key",Li="session",jr="salt",Ge=null,_t,Wr={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function lt(e){if(Ge)return Ge;let t=await he(Fr,{wait:!0});return qu(t)?(Ge=Promise.resolve(t),t):e?(Ge=kn().then(async n=>(await ye(Fr,n,{wait:!0}),n)),Ge.catch(()=>{Ge=null}),Ge):null}async function te(){let e=await he(Li,{wait:!0});return Ju(e)?e:null}function Oi(e){return ye(Li,e,{wait:!0})}async function qe(){await bn(Li).catch(()=>{})}async function xn(){if(_t===void 0){let e=await he(jr).catch(()=>{});_t=typeof e=="string"?e:null}return _t}async function Cn(e){e!==_t&&(_t=e,await ye(jr,e).catch(()=>{}))}function In(){return Wr}function Yr(e){Wr=e}function qu(e){let t=e;return!!(t&&t.privateKey instanceof CryptoKey&&t.publicKey instanceof CryptoKey)}function Ju(e){let t=e;return!!(t&&typeof t.token=="string"&&t.token&&typeof t.email=="string")}var Vr="install-key",Mt=null;function Rn(){if(!Mt){let e=Xu();Mt=e,e.catch(()=>{Mt===e&&(Mt=null)})}return Mt}async function Xu(){if(!(await wn()).inDatabase)return null;let e=await Sn(()=>he(Vr,{wait:!0})),t=Qu(e)?e:await Zu();return{privateKey:t.privateKey,publicKey:await vn(t.publicKey)}}async function Zu(){let e=await kn();return await ye(Vr,e,{wait:!0}),e}function Qu(e){let t=e;return!!(t&&t.privateKey instanceof CryptoKey&&t.publicKey instanceof CryptoKey)}var ed="/api/auth/email-otp/send-verification-otp",td="/api/auth/sign-in/email-otp",nd="/api/auth/get-session",id="/api/auth/sign-out",od="/api/auth/link",rd="x-syncify-device-key",sd="x-syncify-signature",Gr="x-syncify-salt",ad="none",cd={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again.",link_failed:"Couldn't open the website. Try again."},D=class extends Error{constructor(n,i=null,o=null){var r;super((r=cd[n])!=null?r:"Sign-in failed. Try again.");this.code=n;this.retryAfter=i;this.share=o;this.name="AccountError"}};function $e(e){return e instanceof D?e.message:"Sign-in failed. Try again."}async function qr(e,t={}){let n=await Ot(ed,{method:"POST",body:JSON.stringify(p({email:e,type:"sign-in"},t.nudge?{nudge:!0}:{}))});return typeof(n==null?void 0:n.resend_in)=="number"?n.resend_in:60}async function Jr(e,t){var r;let n=await lt(!0).catch(()=>{throw new D("no_device_key")}),i=await Ot(td,{method:"POST",body:JSON.stringify({email:e,otp:t}),keys:n,sendPublicKey:!0});if(typeof(i==null?void 0:i.token)!="string"||!i.token)throw new D("sign_in_failed");let o={token:i.token,email:typeof((r=i.user)==null?void 0:r.email)=="string"?i.user.email:e};return await Oi(o).catch(()=>{throw new D("no_device_key")}),Bi=!0,o}var Bi=!1;async function Xr(){var t;let e=await te();if(!e||Bi)return e;try{let n=await En(e,nd,"GET");Bi=!0;let i=(t=n==null?void 0:n.user)==null?void 0:t.email;if(typeof i!="string"||i===e.email)return e;let o=w(p({},e),{email:i});return await Oi(o).catch(()=>{}),o}catch(n){if(n instanceof D&&n.code==="signed_out")return null;throw n}}async function Zr(){let e=await te().catch(()=>null);e&&await En(e,id,"POST").catch(()=>{}),await qe()}async function Qr(){let e=await te();if(!e)throw new D("signed_out");let t=await En(e,od,"POST"),n=typeof(t==null?void 0:t.url)=="string"?t.url:"",i=new URL(U().webUrl).origin;if(!n.startsWith(`${i}/link#`))throw new D("link_failed");return n}async function Lt(e,t,n){let i=await te();if(!i)throw new D("signed_out");return En(i,e,t,n)}async function es(e,t,n){let i=await te().catch(()=>null),o=i?await lt(!1).catch(()=>null):null;await Ot(e,p({method:"POST",body:JSON.stringify(t),headers:n,keepalive:!0},i&&o?{token:i.token,keys:o}:{}))}async function En(e,t,n,i){let o=await lt(!1);if(!o)throw await qe(),new D("signed_out");return Ot(t,p({method:n,token:e.token,keys:o},i===void 0?{}:{body:JSON.stringify(i)}))}async function Ot(e,t,n=!1){var y,f,S;let i=`${U().webUrl.replace(/\/+$/,"")}${e}`,o=p({},t.headers);if(t.body!==void 0&&(o["content-type"]="application/json"),t.token&&(o.authorization=`Bearer ${t.token}`),t.keys){let b=(y=await xn())!=null?y:ad;o[Gr]=b,o[sd]=await At(t.keys.privateKey,b,t.method,i,(f=t.body)!=null?f:""),t.sendPublicKey&&(o[rd]=await vn(t.keys.publicKey))}let r;try{r=await fetch(i,{method:t.method,headers:o,body:t.body,keepalive:t.keepalive})}catch(b){throw new D("offline")}let a=r.headers.get(Gr);a&&await Cn(a);let c=await r.json().catch(()=>null);if(r.ok)return c;let l=typeof(c==null?void 0:c.code)=="string"?c.code:r.status===503?"unavailable":"failed";if(l==="stale_salt"&&t.keys&&!n)return Ot(e,t,!0);l==="signed_out"&&await qe();let u=Number(r.headers.get("retry-after")),d=c==null?void 0:c.share;throw new D(l,Number.isFinite(u)&&u>0?u:(S=ld[l])!=null?S:null,typeof(d==null?void 0:d.code)=="string"?{code:d.code,link:typeof d.link=="string"?d.link:null}:null)}var ld={resend_wait:60,too_many_requests:60,send_failed:60};var ud="x-syncify-user-hash",dd="x-syncify-identity",fd="x-syncify-signature",yd="x-syncify-install",md="x-syncify-install-key",pd="x-syncify-install-signature",Di="x-syncify-salt",gd="none",hd="/restores",Sd="/sync",bd="/settings/delete",wd="x-syncify-settings-bytes",kd="/installs",vd="hash",ts=3,Bt=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}},ut=class extends Error{constructor(t=!1){super(t?"Too many wrong codes today. Try again tomorrow.":"That code doesn't match. Check it in that Syncify's Settings and try again."),this.name="PairingCodeError"}};async function rs(e,t,n,i){var c;let o=JSON.stringify(n),r=await Ie(e,t,{method:"POST",headers:p({"content-type":"application/json"},i!==void 0?{[wd]:String(new TextEncoder().encode(i).byteLength)}:{}),body:i!==void 0?i+o:o});if(!r.ok)throw new Error(`Backup failed with HTTP ${r.status}.`);let a=await r.json().catch(()=>null);return{unchanged:(a==null?void 0:a.unchanged)===!0,settings:(c=a==null?void 0:a.settings)!=null?c:null}}async function ss(e,t,n,i){let o=await Ie(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(p({install:n},i))},kd);if(o.ok)return;let r=await o.json().catch(()=>null);if((r==null?void 0:r.code)!=="not_pending")throw(r==null?void 0:r.code)==="code_mismatch"?new ut:(r==null?void 0:r.code)==="daily_limit"?new ut(!0):new Error(o.status===429?"Too many tries. Wait a minute and try again.":`Couldn't answer with HTTP ${o.status}.`)}async function $i(e,t,n,i){var P,A,C,I,M;let o=await Ie(e,t,i!==void 0&&!n?{method:"POST",headers:{"content-type":"application/json"},body:i}:{method:"GET"},i!==void 0&&!n?Sd:ls("/",n));if(o.status===404){let T=await o.json().catch(()=>null);return{settings:(P=T==null?void 0:T.settings)!=null?P:null,exists:!1,payload:null,backups:[],safetyCopy:null,pinned:[],borrowed:!1,others:[],claim:Dt(T==null?void 0:T.claim),unapproved:[],install:is(T==null?void 0:T.install),nudge:!1}}if(!o.ok)throw new Error(`Restore failed with HTTP ${o.status}.`);let r=await o.json(),a=Dt(r.claim),c=is(r.install),l=r.nudge===!0,u=(A=r.settings)!=null?A:null;delete r.claim,delete r.install,delete r.nudge,delete r.settings;let d=[r,...(C=r.backup_history)!=null?C:[]],y={claim:a,install:c,nudge:l,settings:u};if(!d.every(T=>T.backup))return w(p({},y),{exists:!0,payload:r,backups:d.slice(0,ts),safetyCopy:(I=d[ts])!=null?I:null,pinned:[],borrowed:!1,others:[],unapproved:[]});let f=d.filter(Nn),S=ns(d.filter(T=>{var B;return!((B=T.backup)!=null&&B.other)&&!Nn(T)})),b=d.filter(T=>{var B;return((B=T.backup)==null?void 0:B.other)===!0}),x=S.backups.length+S.pinned.length===0&&!S.safetyCopy&&b.length>0,m=x?ns(b):S,k=(M=m.backups[0])!=null?M:m.safetyCopy;return k?w(p({},y),{exists:!0,payload:k,backups:m.backups.length>0?m.backups:[k],safetyCopy:m.backups.length>0?m.safetyCopy:null,pinned:m.pinned,borrowed:x,others:x?[]:b.sort(Ui),unapproved:f}):w(p({},y),{exists:!1,payload:null,backups:[],safetyCopy:null,pinned:m.pinned,borrowed:x,others:[],unapproved:f})}var Ui=(e,t)=>Date.parse(t.metadata.last_sync_datetime)-Date.parse(e.metadata.last_sync_datetime);function ns(e){var i;let t=o=>{var r,a;return((r=o.backup)==null?void 0:r.kind)==="anchor"||((a=o.backup)==null?void 0:a.safety_copy)===!0},n=(i=e.filter(t).sort(Ui)[0])!=null?i:null;return{backups:e.filter(o=>{var r,a,c;return((r=o.backup)==null?void 0:r.kind)==="rolling"||((a=o.backup)==null?void 0:a.kind)==="quarantined"||t(o)&&o!==n&&((c=o.backup)==null?void 0:c.kind)==="anchor"}).sort(Ui),safetyCopy:n,pinned:e.filter(o=>{var r;return((r=o.backup)==null?void 0:r.kind)==="pinned"&&o!==n})}}async function as(e,t,n){let i=await Ie(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({item:n})},bd),o=await i.json().catch(()=>null);if(!i.ok||typeof(o==null?void 0:o.version)!="number")throw new Error(i.status===429?"Syncify can't delete more synced copies today. Try again tomorrow.":`Couldn't delete the synced copy with HTTP ${i.status}.`);return{version:o.version}}async function cs(e,t,n,i){try{await Ie(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:n}),keepalive:!0},ls(hd,i))}catch(o){}}async function Ie(e,t,n,i="",o=!1){var k,P,A,C,I;let r=i?`${e.replace(/\/+$/,"")}${i}`:e,a=(k=n.method)!=null?k:"GET",c=await te().catch(os),l=c?await lt(!1).catch(os):null,u=await Rn(),d={},y=(P=await xn())!=null?P:gd;c&&l&&(d.authorization=`Bearer ${c.token}`,d[Di]=y,d[fd]=await At(l.privateKey,y,a,r,(A=n.body)!=null?A:"")),u&&(d[Di]=y,d[md]=u.publicKey,d[pd]=await At(u.privateKey,y,a,r,(C=n.body)!=null?C:""));let f=await $r(),S=f[yd],b=await fetch(r,w(p({},n),{headers:p(w(p(p({},n.headers),f),{[ud]:t.hash,[dd]:t.field}),d)})),x=b.headers.get(Di);if(x&&await Cn(x),b.status===426)throw new Bt;if(b.status!==401)return b;let m=(I=await b.clone().json().catch(()=>null))==null?void 0:I.code;if(!o){if(m==="stale_salt"&&(c||u))return Ie(e,t,n,i,!0);if(m==="signed_out"&&c)return await qe(),Ie(e,t,n,i,!0);if(m==="install_key_mismatch"&&u)return await Hr(S),Ie(e,t,n,i,!0)}throw m==="not_linked"?new Error("Couldn't read that Spotify account's backups."):(m==="signed_out"&&await qe(),new D(typeof m=="string"?m:"failed"))}function ls(e,t){return t?`${e}?${vd}=${encodeURIComponent(t)}`:e}function is(e){let t=e;return!t||typeof t.trust!="string"?null:{waiting:(Array.isArray(t.waiting)?t.waiting:[]).flatMap(i=>{let o=i;return o&&typeof o.id=="string"&&typeof o.first_seen_at=="number"?[{id:o.id,device:typeof o.device=="string"?o.device:null,first_seen_at:o.first_seen_at}]:[]})}}function Dt(e){let t=e;if(!t||typeof t.mine!="boolean")return null;let n=typeof t.email=="string"?t.email:null;return t.status==="final"?p({status:"final",mine:t.mine},t.mine?{}:{email:n}):t.status==="undone"?typeof t.undone_at=="number"?{status:"undone",mine:!1,email:n,undone_at:t.undone_at}:null:t.status!=="pending"||typeof t.final_at!="number"?null:{status:"pending",mine:t.mine,email:n,final_at:t.final_at,held:t.held===!0,can_cancel:t.can_cancel===!0}}function os(e){if(e instanceof Ve)return null;throw e}function Nn(e){var t;return((t=e.backup)==null?void 0:t.kind)==="quarantined"&&e.backup.mine!==!0}async function Tn(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return[...new Uint8Array(n)].map(i=>i.toString(16).padStart(2,"0")).join("")}function V(e){return JSON.stringify(Hi(e))}function Hi(e){return Array.isArray(e)?e.map(Hi):e&&typeof e=="object"?Object.keys(e).sort().reduce((t,n)=>(t[n]=Hi(e[n]),t),{}):e}function us(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var xd="marketplace:installed:";function Cd(e){return{id:e.id,key:`${xd}${e.id}`,name:e.name,kind:Id(e.id)}}function Ut(e){return new Map(e.map(t=>[t.id,Cd(t)]))}function Id(e){return/\.(m?js)$/i.test(e)?"extension":/\.css$/i.test(e)?"theme":"app"}var Rd="registry.json",ds="settings-registry",Ed=1,Nd=3e3,Td=["marketplace:","spicetify","syncify"],Pd=["spicetify","syncify"],Ad="medium",Ki=null;function Re(){return Ki||(Ki=_d().then(async e=>e?(await ye(ds,e).catch(()=>{}),e):ms(await he(ds).catch(()=>{})))),Ki}async function _d(){let e=typeof AbortController=="function"?new AbortController:null,t=setTimeout(()=>e==null?void 0:e.abort(),Nd);try{let n=await fetch(`${U().releasesUrl}/${Rd}`,{signal:e==null?void 0:e.signal});return n.ok?ms(await n.json()):null}catch(n){return null}finally{clearTimeout(t)}}function ms(e){if(!Je(e)||e.format!==Ed||!Array.isArray(e.items)||!Je(e.sizes))return null;let t={small:Number(e.sizes.small),medium:Number(e.sizes.medium),large:Number(e.sizes.large)},n=Number(e.accountLimit);return[...Object.values(t),n].every(o=>Number.isSafeInteger(o)&&o>0)?{items:e.items.flatMap(o=>{let r=Md(o,t);return r?[r]:[]}),accountLimit:n}:null}function Md(e,t){var l,u;if(!Je(e)||typeof e.id!="string"||!e.id)return null;let n=fs(e.keys),i=fs((l=e.exclude)!=null?l:[]),o=Dd(e.storage),r=Bd(e.lists),a=(u=e.size)!=null?u:Ad;if(a!=="small"&&a!=="medium"&&a!=="large"||!n||!i||!o||!r||n.length===0||o.type==="localStorage"&&n.some(Ud)||o.type==="indexedDB"&&Pd.some(d=>o.database.startsWith(d)))return null;let c=Ld(e.name)?e.name:Od(e.id);return{id:e.id,name:c,keys:n,exclude:i,storage:o,lists:r,limit:t[a]}}function Ld(e){return typeof e=="string"&&e.length<=100&&/^\S(?:.*\S)?$/.test(e)}function Od(e){var i;let t=(i=e.split("/").pop())!=null?i:e,n=t.replace(/\.[^.]+$/,"")||t;return n.charAt(0).toUpperCase()+n.slice(1)}function Bd(e){if(e===void 0)return{};if(!Je(e))return null;let t={};for(let[n,i]of Object.entries(e))if(Je(i)&&i.merge==="object")t[n]={merge:"object"};else if(Je(i)&&i.merge==="array"&&$t(i.id))t[n]={merge:"array",id:i.id};else return null;return t}function Dd(e){return e===void 0?{type:"localStorage"}:Je(e)?e.type==="localStorage"?{type:"localStorage"}:e.type!=="indexedDB"||!$t(e.database)||!$t(e.store)||e.valueField!==void 0&&!$t(e.valueField)?null:p({type:"indexedDB",database:e.database,store:e.store},e.valueField!==void 0?{valueField:e.valueField}:{}):null}function fs(e){return Array.isArray(e)&&e.every(t=>$t(t)&&/^[^*\s]+\*?$/.test(t))?e:null}function Le(e,t){return e.keys.some(n=>ys(n,t))&&!e.exclude.some(n=>ys(n,t))}function ys(e,t){return e.endsWith("*")?t.startsWith(e.slice(0,-1)):t===e}function Ud(e){let t=e.endsWith("*")?e.slice(0,-1):e;return Td.some(n=>t.startsWith(n)||e.endsWith("*")&&n.startsWith(t))}function $t(e){return typeof e=="string"&&e.length>0}function Je(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}var $d=2e3,An="restored-settings";async function ps(e){await ye(An,e).catch(()=>{})}async function dt(e){var i,o;let t={},n=new Set;for(let[r,a]of Hd(e,bs())){let c=window.localStorage.getItem(r);c!==null&&((o=t[i=a.id])!=null||(t[i]={storage:"localStorage",values:{}}),t[a.id].values[r]=c)}return await Promise.all(e.items.filter(r=>r.storage.type==="indexedDB").map(async r=>{let a=await Fd(r);a===null?n.add(r.id):Object.keys(a).length>0&&(t[r.id]={storage:"indexedDB",values:a})})),{settings:t,unavailable:n}}function Hd(e,t){var r,a;let n=new Map,i=[];for(let c of e.items)if(c.storage.type==="localStorage")for(let l of c.keys)l.endsWith("*")?i.push([l.slice(0,-1),c]):n.set(l,c);let o=new Map;for(let c of t){let l=(a=n.get(c))!=null?a:(r=i.find(([u])=>c.startsWith(u)))==null?void 0:r[1];l&&Le(l,c)&&o.set(c,l)}return o}async function _n(e,t,n){let i=n.flatMap(r=>{let a=e.items.find(l=>l.id===r),c=a?Ss(a,t[r]):null;return a&&c?[{item:a,saved:c}]:[]});for(let{item:r,saved:a}of i)r.storage.type==="indexedDB"&&await jd(r,a);let o=bs();for(let{item:r,saved:a}of i)if(r.storage.type==="localStorage"){for(let c of o)Le(r,c)&&!(c in a)&&window.localStorage.removeItem(c);for(let[c,l]of Object.entries(a))window.localStorage.setItem(c,l)}}function Kd(e,t,n){return t?e.items.flatMap(i=>{var c,l;let o=Ss(i,t[i.id]);if(!o||n.unavailable.has(i.id))return[];let r=(l=(c=n.settings[i.id])==null?void 0:c.values)!=null?l:{};return[...new Set([...Object.keys(o),...Object.keys(r)])].some(u=>!zd(i,o[u],r[u]))?[i.id]:[]}):[]}async function gs(e){if(!e)return[];let t=await Re();if(!t)return[];let n=Ut(t.items);return Kd(t,e,await dt(t)).flatMap(i=>{let o=n.get(i);return o?[o]:[]})}function hs(e,t,n){let i=new TextEncoder,o=t+i.encode(`,${JSON.stringify("extension_settings")}:{}`).byteLength,r=Object.entries(e).map(([l,u])=>({id:l,entry:u,bytes:i.encode(`${JSON.stringify(l)}:${JSON.stringify(u)}`).byteLength})).sort((l,u)=>l.bytes-u.bytes||l.id.localeCompare(u.id)),a={},c=!0;for(let{id:l,entry:u,bytes:d}of r){let y=d+(c?0:1);if(o+y>n)break;o+=y,a[l]=u,c=!1}return a}function Ss(e,t){if(!t||typeof t!="object"||t.storage!==e.storage.type||!t.values||typeof t.values!="object"||Array.isArray(t.values))return null;let n={};for(let[i,o]of Object.entries(t.values))Le(e,i)&&((e.storage.type==="localStorage"?typeof o!="string":!Pn(o))||(n[i]=o));return Object.keys(n).length>0?n:null}function zd(e,t,n){if(t===void 0||n===void 0)return t===n;let i=e.storage.type==="indexedDB"?e.storage.valueField:void 0,o=r=>i&&r&&typeof r=="object"&&!Array.isArray(r)?r[i]:r;return V(o(t))===V(o(n))}function Pn(e){return e===null||typeof e=="string"||typeof e=="boolean"?!0:typeof e=="number"?Number.isFinite(e):Array.isArray(e)?e.every(Pn):typeof e=="object"&&Object.getPrototypeOf(e)===Object.prototype?Object.values(e).every(Pn):!1}function bs(){let e=[];for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);n!==null&&e.push(n)}return e}async function Fd(e){let t=e.storage;return ws(t,"readonly",(n,i)=>{let o={},r=n.openCursor();r.onsuccess=()=>{let a=r.result;if(!a)return i(o);let c=a.key;typeof c=="string"&&Le(e,c)&&Pn(a.value)&&(o[c]=a.value),a.continue()}}).catch(()=>null)}async function jd(e,t){let n=e.storage;if(await ws(n,"readwrite",(o,r)=>{let a=o.openCursor();a.onsuccess=()=>{let c=a.result;if(c){let l=c.key;typeof l=="string"&&Le(e,l)&&!(l in t)&&c.delete(),c.continue();return}for(let[l,u]of Object.entries(t))o.put(u,l);r(!0)}})===null)throw new Error("Syncify couldn't write an extension's settings. Restart Spotify and try again.")}function ws(e,t,n){let i;try{i=window.indexedDB}catch(r){return Promise.resolve(null)}if(!i)return Promise.resolve(null);let o=i;return new Promise((r,a)=>{let c=!1,l=null,u=f=>{c||(c=!0,clearTimeout(d),f())},d=setTimeout(()=>{u(()=>a(new Error("The extension's database took too long.")));try{l==null||l.abort()}catch(f){}},$d),y;try{y=o.open(e.database)}catch(f){u(()=>r(null));return}y.onupgradeneeded=()=>{var f;return(f=y.transaction)==null?void 0:f.abort()},y.onerror=()=>{let f=y.error;u(()=>(f==null?void 0:f.name)==="AbortError"?r(null):a(f))},y.onblocked=()=>u(()=>a(new Error("The extension's database is busy."))),y.onsuccess=()=>{let f=y.result;if(f.onversionchange=()=>f.close(),c||!f.objectStoreNames.contains(e.store)){f.close(),u(()=>r(null));return}try{let S=f.transaction(e.store,t);l=S;let b=null;n(S.objectStore(e.store),x=>{b=x}),S.oncomplete=()=>{f.close(),u(()=>r(b))},S.onerror=S.onabort=()=>{f.close(),u(()=>{var x;return a((x=S.error)!=null?x:new Error("IndexedDB failed."))})}}catch(S){f.close(),u(()=>a(S))}}})}var Wd=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,Yd=100,Vd="marketplace:installed-extensions",Gd="marketplace:installed-themes",qd="marketplace:theme-installed",Jd="marketplace:installed:",Xd="marketplace";function Fi(e){return Spicetify.Config?ji(Spicetify.Config,e):null}function ji(e,t){var r;let n=He(e),i=new Set(Zd(t)),o=((r=t[qd])==null?void 0:r.includes(Jd))===!0;return{current_theme:o?Xd:n.current_theme,color_scheme:o?"":n.color_scheme,extensions:n.extensions.filter(a=>!i.has(a)),custom_apps:n.custom_apps}}function He(e){let t=e&&typeof e=="object"?e:{};return{current_theme:zi(t.current_theme)?t.current_theme:"",color_scheme:zi(t.color_scheme)?t.color_scheme:"",extensions:ks(t.extensions),custom_apps:ks(t.custom_apps)}}function Cs(e,t){return V(He(e))===V(He(t))}function ks(e){return Array.isArray(e)?[...new Set(e.filter(zi))].sort().slice(0,Yd):[]}function zi(e){return typeof e=="string"&&Wd.test(e)}function Zd(e){let t=vs(e[Vd]).map(i=>{var r;let o=(r=xs(e[i]))==null?void 0:r.manifest;return o&&typeof o=="object"?o.main:void 0}),n=vs(e[Gd]).flatMap(i=>{var r;let o=(r=xs(e[i]))==null?void 0:r.include;return Array.isArray(o)?o:[]});return[...t,...n].flatMap(i=>{let o=typeof i=="string"?i.split("/").pop():void 0;return o?[o]:[]})}function vs(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function xs(e){try{let t=e?JSON.parse(e):null;return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch(t){return null}}var Qd=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],ef="marketplace:installed:",Is=`${ef}snippet:`,tf="wsoltani/syncify",nf="marketplace",Rs={added:0,removed:1,unchanged:2};function oe(e){let t=new Map;for(let[n,i]of Qd)for(let o of af(e[n]))t.has(o)||t.set(o,rf(o,i,e[o]));return[...t.values()]}function On(e,t,n,i){let o=new Set(e.map(l=>l.key)),r=new Map(n.map(l=>[l.key,l])),a=[...e.map(l=>{let u=r.get(l.key);return w(p({},l),{change:u?"unchanged":"added",isNew:!u||u.sources.join(" ")!==l.sources.join(" ")})}),...n.filter(l=>!o.has(l.key)).map(l=>w(p({},l),{change:Ht(l,e)?"unchanged":"removed",isNew:!1}))].sort((l,u)=>Rs[l.change]-Rs[u.change]||l.name.localeCompare(u.name)),c={added:0,removed:0,unchanged:0};for(let l of a)c[l.change]+=1;return{items:a,counts:c,manual:of(t,i)}}function Ht(e,t){return e.type==="extension"&&Ln(e)&&!t.some(Ln)}function Ln(e){var t;return((t=e.repo)==null?void 0:t.toLowerCase())===tf}function of(e,t){if(!e)return[];let n=He(e),i=He(t),o=[...n.extensions.filter(a=>!i.extensions.includes(a)).map(a=>({type:"extension",name:a})),...n.custom_apps.filter(a=>!i.custom_apps.includes(a)).map(a=>({type:"custom_app",name:a}))],r=n.current_theme;return r&&r!==nf&&(r!==i.current_theme||n.color_scheme!==i.color_scheme)&&o.push(p({type:"theme",name:r},n.color_scheme?{scheme:n.color_scheme}:{})),o}function rf(e,t,n){var l,u;let i=Es(n),o=Es(i==null?void 0:i.manifest),r=Mn(i==null?void 0:i.user),a=Mn(i==null?void 0:i.repo),c=(u=(l=Mn(i==null?void 0:i.title))!=null?l:Mn(o==null?void 0:o.name))!=null?u:e.startsWith(Is)?e.slice(Is.length):e.split("/").pop()||e;return{key:e,type:t,name:c,repo:t!=="snippet"&&r&&a?`${r}/${a}`:null,sources:sf(t,i),custom:t==="snippet"&&(i==null?void 0:i.custom)===!0}}function sf(e,t){return t?(e==="extension"?[t.extensionURL]:e==="theme"?[t.cssURL,t.schemesURL,...Array.isArray(t.include)?t.include:[]]:[]).filter(i=>typeof i=="string"&&i!==""):[]}function Mn(e){return typeof e=="string"&&e.trim()?e.trim():null}function af(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function Es(e){let t=e;if(typeof e=="string")try{t=JSON.parse(e)}catch(n){return null}return t&&typeof t=="object"&&!Array.isArray(t)?t:null}var Bn="spicetify-marketplace";var Kt="settings";async function Ns(){let e=await As();if(e.kind!=="ok")return null;try{let t=await _s(e.db,"readonly",i=>i.getAll());if(!t)return null;let n={};for(let i of t)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(n[i.key]=i.value);return n}finally{e.db.close()}}async function Ts(e,t=[]){let n=await As();if(n.kind==="unavailable")return"unavailable";let i=n.kind==="ok"?n.db:await cf();if(!i)return"failed";try{return await _s(i,"readwrite",r=>{let a;for(let[c,l]of Object.entries(e))a=r.put({key:c,value:l});for(let c of t)a=r.delete(c);return a})===null?"failed":"written"}finally{i.close()}}function Ps(){var e;try{return(e=window.indexedDB)!=null?e:null}catch(t){return null}}async function As(){let e=Ps();return e?await lf(e)?{kind:"missing"}:new Promise(t=>{let n=!1,i=e.open(Bn);i.onupgradeneeded=()=>{n=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),t({kind:"unavailable"})},i.onblocked=()=>t({kind:"unavailable"}),i.onsuccess=()=>{let o=i.result;if(n){o.close(),uf(e).then(()=>t({kind:"missing"}));return}if(!o.objectStoreNames.contains(Kt)){o.close(),t({kind:"unavailable"});return}t({kind:"ok",db:o})}}):{kind:"unavailable"}}function cf(){let e=Ps();return e?new Promise(t=>{let n=e.open(Bn,1);n.onupgradeneeded=()=>{let i=n.result;i.objectStoreNames.contains(Kt)||i.createObjectStore(Kt,{keyPath:"key"})},n.onerror=()=>{console.warn("Syncify could not create Marketplace storage",n.error),t(null)},n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}async function lf(e){if(typeof e.databases!="function")return!1;try{return!(await e.databases()).some(n=>n.name===Bn)}catch(t){return!1}}function uf(e){return new Promise(t=>{let n=e.deleteDatabase(Bn);n.onsuccess=()=>t(),n.onerror=()=>t(),n.onblocked=()=>t()})}function _s(e,t,n){return new Promise(i=>{let o;try{o=e.transaction(Kt,t)}catch(u){console.warn("Syncify could not open a Marketplace transaction",u),i(null);return}let r,a=!1,c=u=>{a||(a=!0,i(u))};o.oncomplete=()=>c(r),o.onerror=()=>{console.warn("Syncify Marketplace transaction failed",o.error),c(null)},o.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",o.error),c(null)};let l;try{l=n(o.objectStore(Kt))}catch(u){console.warn("Syncify Marketplace request could not be issued",u),c(null);return}l&&(l.onsuccess=()=>{r=l.result},l.onerror=()=>{console.warn("Syncify Marketplace request failed",l.error),c(null)})})}var Wi="marketplace:",Un=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function Se(){let e=kf(),t=await Ns();if(t)for(let[n,i]of Object.entries(t))n.startsWith(Wi)&&(e[n]=i);return e}var ff=new Set(["marketplace:active-tab","marketplace:sort"]),Yi="marketplace:installed:",Dn="marketplace:theme-installed",yf=["stars","tags","lastUpdated","created"],mf=750*1024;async function $n(e,t){let n={};for(let[i,o]of Object.entries(e))ff.has(i)||(n[i]=i.startsWith(Yi)?pf(o):o);return t&&(n.spicetify_config=He(t)),Tn(V(n))}function pf(e){try{let t=JSON.parse(e);if(!t||typeof t!="object"||Array.isArray(t))return e;for(let n of yf)delete t[n];return t}catch(t){return e}}async function Hn(){let e=await Se(),t=Fi(e);return{keyCount:Object.keys(e).length,hash:await $n(e,t),installedItemCount:bf(e),installedItems:Kn(e),items:oe(e),spicetifyConfig:t,marketplaceAvailable:wf(e),activeTheme:zt(e[Dn])}}function zt(e){if(!e)return null;if(e.startsWith(Yi))return e;try{let t=JSON.parse(e);return typeof t=="string"?t:null}catch(t){return null}}async function Ms(){let[e,t]=await Promise.all([Se(),gf()]),n=Fi(e),i=p({schema_version:3,metadata:{last_sync_datetime:new Date().toISOString(),device_info:us(),marketplace_key_count:Object.keys(e).length},payload_hash:await $n(e,n),marketplace_data:{keys:e}},n?{spicetify_config:n}:{});if(Object.keys(t).length===0)return i;let o=new TextEncoder().encode(JSON.stringify(i)).byteLength,r=hs(t,o,mf);return Object.keys(r).length>0?w(p({},i),{extension_settings:r}):i}async function gf(){try{let e=await Re();return e?(await dt(e)).settings:{}}catch(e){return{}}}async function Ls(e,t=[]){var r,a;let n={},i=(a=(r=e.marketplace_data)==null?void 0:r.keys)!=null?a:{};for(let[c,l]of Object.entries(i))c.startsWith(Wi)&&(n[c]=l);if(Object.keys(n).length===0)return 0;await hf(n),t.length>0&&await Sf(n,t);let o=Gi(await Se(),n);return await Vi(n,o),Object.keys(n).length}async function Vi(e,t=[]){for(let[i,o]of Object.entries(e))window.localStorage.setItem(i,o);for(let i of t)window.localStorage.removeItem(i);if(await Ts(e,t)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try again.")}function Gi(e,t){let n=new Set(Un.flatMap(a=>{var c;return zn((c=t[a])!=null?c:e[a]).map(String)})),i=Kn(e).filter(a=>a.startsWith(Yi)&&!n.has(a)),o=i.filter(a=>e[a]!==void 0&&t[a]===void 0),r=e[Dn];return r&&t[Dn]===void 0&&i.some(a=>r.includes(a))&&o.push(Dn),o}async function hf(e){let t=await Se(),n=oe(e),i=oe(t).filter(a=>Ht(a,n));if(i.length===0)return;let o="marketplace:installed-extensions",r=zn(e[o]).map(String);for(let a of i)r.includes(a.key)||r.push(a.key),e[a.key]=t[a.key];e[o]=JSON.stringify(r)}async function Sf(e,t){let n=await Se(),i=Kn(n);for(let o of Un){if(e[o]===void 0)continue;let r=zn(e[o]).map(String).filter(a=>!t.includes(a)||i.includes(a));e[o]=JSON.stringify(r)}for(let o of t)n[o]!==void 0?e[o]=n[o]:delete e[o]}function bf(e){return Kn(e).length}function Kn(e){return Un.flatMap(t=>zn(e[t]).map(String))}function wf(e){return!!(window.Marketplace||Un.some(n=>e[n]!==void 0)||e["marketplace:tabs"]!==void 0)}function Os(e,t){return t===0?!1:e===0?!0:e<Math.max(2,Math.floor(t*.5))}function kf(){let e={};for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);if(!(n!=null&&n.startsWith(Wi)))continue;let i=window.localStorage.getItem(n);i!==null&&(e[n]=i)}return e}function zn(e){if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch(t){return[]}}var vf="raw.githubusercontent.com",xf="cdn.jsdelivr.net",Bs=".github.io";function Ji(e){var n;if(e.protocol!=="https:")return null;let t=e.pathname.split("/").filter(Boolean);if(e.host===vf)return qi(t[0],t[1]);if(e.host===xf)return t[0]==="gh"?qi(t[1],(n=t[2])==null?void 0:n.split("@")[0]):null;if(e.host.endsWith(Bs)){let i=e.host.slice(0,-Bs.length);return i.includes(".")?null:qi(i,t.length>1?t[0]:e.host)}return null}function qi(e,t){return e&&t?`${e}/${t}`:null}var Cf={extension:"spicetify-extensions",theme:"spicetify-themes"},If="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",Rf="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",Ef="https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/",Nf="https://api.github.com/repos",Tf=5e3,Pf=20,Ds="syncify:repo-topics",Us=10080*60*1e3,Af=200;function ft(e){return(e==null?void 0:e.kind)==="host"||(e==null?void 0:e.kind)==="repo"||(e==null?void 0:e.kind)==="blocked"||(e==null?void 0:e.kind)==="catalog"}function yt(e){let t=new Map;for(let n of e){if(n.change==="removed")continue;if(n.custom){t.set(n.key,{kind:"custom"});continue}let i=_f(n);i&&t.set(n.key,i)}return t}async function mt(e,t){let n=new Map,i=e.filter(a=>a.change!=="removed"&&a.isNew&&!t.has(a.key));if(i.length===0)return n;let o=i.filter(a=>a.type==="snippet"),r=i.filter(a=>a.type!=="snippet");if(o.length>0){let a=await Xi();for(let c of o)a?Fn(a,c.name)||n.set(c.key,{kind:"catalog"}):n.set(c.key,{kind:"unchecked"})}if(r.length>0){let a=await Of(),c=Uf(),l=0;await Promise.all(r.map(async u=>{let d=Mf(u),y=Cf[u.type];if(!d||!y)return;if(a===null){n.set(u.key,{kind:"unchecked"});return}if(Lf(d,a)){n.set(u.key,{kind:"blocked"});return}let f=Df(c,d);f===void 0&&l<Pf&&(l+=1,f=await Bf(d),f!==void 0&&(c[d.toLowerCase()]={topics:f,at:Date.now()})),f===void 0?n.set(u.key,{kind:"unchecked"}):(f===null||!f.includes(y))&&n.set(u.key,{kind:"catalog"})})),$f(c)}return n}function _f(e){let t=null;for(let n of e.sources){let i;try{i=new URL(n)}catch(r){return{kind:"host",host:n.slice(0,40)}}let o=Ji(i);if(!o)return{kind:"host",host:i.host};e.repo&&o.toLowerCase()!==e.repo.toLowerCase()&&(t!=null||(t=o))}return t?{kind:"repo",repo:t}:null}function Mf(e){for(let t of e.sources)try{let n=Ji(new URL(t));if(n)return n}catch(n){}return e.repo}function Lf(e,t){let n=`https://github.com/${e}`.toLowerCase();return t.some(i=>{let o=i.toLowerCase();if(!o.includes("*"))return o===n;let r=o.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${r}$`).test(n)})}function $s(e){return e.replace(/\n/g,"").trim().toLowerCase()}function Fn(e,t){return e.get($s(t))}var Ft=null,jt=null;function Of(){return Ft!=null||(Ft=Hs(If).then(e=>{let t=e==null?void 0:e.repos;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&!n.startsWith("//")):(Ft=null,null)})),Ft}function Xi(){return jt!=null||(jt=Hs(Rf).then(e=>{if(!Array.isArray(e))return jt=null,null;let t=new Map;for(let n of e){if(typeof(n==null?void 0:n.title)!="string"||typeof n.code!="string")continue;let i=typeof n.preview=="string"?n.preview:null;t.set($s(n.title),p({title:n.title,code:n.code,description:typeof n.description=="string"?n.description:""},i?{imageURL:i.startsWith("http")?i:`${Ef}${i}`}:{}))}return t})),jt}async function Bf(e){let t=await Ks(`${Nf}/${e}`);if((t==null?void 0:t.status)===404)return null;if(!(t!=null&&t.ok))return;let n=await t.json().catch(()=>null);return Array.isArray(n==null?void 0:n.topics)?n.topics.filter(i=>typeof i=="string"):void 0}async function Hs(e){let t=await Ks(e);return t!=null&&t.ok?t.json().catch(()=>null):null}async function Ks(e){let t=typeof AbortController=="function"?new AbortController:null,n=setTimeout(()=>t==null?void 0:t.abort(),Tf);try{return await fetch(e,{signal:t==null?void 0:t.signal})}catch(i){return null}finally{clearTimeout(n)}}function Df(e,t){let n=e[t.toLowerCase()];return n&&Date.now()-n.at<Us?n.topics:void 0}function Uf(){var e;try{let t=JSON.parse((e=localStorage.getItem(Ds))!=null?e:"{}");return t&&typeof t=="object"?t:{}}catch(t){return{}}}function $f(e){let t=Date.now(),n=Object.entries(e).filter(([,i])=>t-i.at<Us).sort(([,i],[,o])=>o.at-i.at).slice(0,Af);try{localStorage.setItem(Ds,JSON.stringify(Object.fromEntries(n)))}catch(i){}}var Hf=/^[0-9A-HJKMNP-TV-Z]{6}$/,Kf=6,zf="SYN-",Ws=60,Zi=20,Ys=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],Xe="marketplace:theme-installed",zs="marketplace",Fs={added:0,removed:1,unchanged:2},Ff=new RegExp(`^[a-z0-9][a-z0-9_-]{1,${Zi-2}}[a-z0-9]$`);function Qi(e){let t=e.trim().replace(/^@/,"").toLowerCase();return/[^a-z0-9_-]/.test(t)?"Only letters, digits, _ and -":t.length<3?"At least 3 characters":!/^[a-z0-9]/.test(t)||!/[a-z0-9]$/.test(t)?"Start and end with a letter or digit":null}function Ee(e){return`${zf}${e}`}function Vs(e){let t=e.trim();if(t.length>200)return null;if(t.includes("/")){let i=t.split(/[?#]/)[0].replace(/\/+$/,"");t=i.slice(i.lastIndexOf("/")+1).replace(/\.json$/i,"")}t=t.toUpperCase().replace(/[\s-]/g,""),t.length===Kf+3&&t.startsWith("SYN")&&(t=t.slice(3));let n=t.replace(/O/g,"0").replace(/[IL]/g,"1");return Hf.test(n)?n:null}function Gs(e){let t=e;return!t||typeof t.code!="string"||!t.keys||typeof t.keys!="object"||!Object.values(t.keys).every(n=>typeof n=="string")?null:{code:t.code,name:typeof t.name=="string"&&t.name?t.name:null,creator:typeof t.creator=="string"&&Ff.test(t.creator)?t.creator:null,updated_at:typeof t.updated_at=="number"?t.updated_at:0,keys:t.keys}}async function qs(e,t){let n=e.filter(a=>!Ln(a)).map(a=>w(p({},a),{change:"added",isNew:!0})),i=yt(n);for(let a of n)!i.has(a.key)&&!jf(a,t[a.key])&&i.set(a.key,{kind:"catalog"});let o=await mt(n,i),r=new Map;for(let[a,c]of[...o,...i])c.kind!=="unchecked"&&r.set(a,c);return{items:n,leftOut:r}}function jf(e,t){if(e.type==="snippet")return!0;if(!e.repo)return!1;let n=Vf(t);return e.type==="extension"?typeof(n==null?void 0:n.extensionURL)=="string"&&n.extensionURL!=="":typeof(n==null?void 0:n.cssURL)=="string"&&n.cssURL!==""}function Js(e,t){let n={};for(let[o,r]of Ys){let a=t.filter(c=>c.type===r&&e[c.key]!==void 0).map(c=>c.key);n[o]=JSON.stringify(a);for(let c of a)n[c]=e[c]}let i=zt(e[Xe]);return i&&t.some(o=>o.key===i)&&(n[Xe]=e[Xe]),n}function Xs(e,t,n,i,o,r){let a=r==="replace"?On(t,void 0,n,i):Wf(t,n),c=zt(e.keys[Xe]),l=c!==null&&t.some(d=>d.key===c)&&i!==null&&i.current_theme!==zs,u=c!==null&&c!==o?t.find(d=>d.key===c):void 0;return p(w(p({},a),{manual:l?[{type:"theme",name:zs}]:[]}),u?{theme:{key:u.key,name:u.name}}:{})}function Wf(e,t){let n=new Set(t.map(a=>a.key)),i=new Set(e.map(a=>a.key)),o=[...e.map(a=>n.has(a.key)?w(p({},a),{change:"unchanged",isNew:!1}):w(p({},a),{change:"added",isNew:!0})),...t.filter(a=>!i.has(a.key)).map(a=>w(p({},a),{change:"unchanged",isNew:!1}))].sort((a,c)=>Fs[a.change]-Fs[c.change]||a.name.localeCompare(c.name)),r={added:0,removed:0,unchanged:0};for(let a of o)r[a.change]+=1;return{items:o,counts:r,manual:[]}}function Zs(e,t){return new Set(e.items.filter(n=>n.type==="snippet"&&n.change==="added"&&(!t||!Fn(t,n.name))).map(n=>n.key))}async function Qs(e,t,n,i){let o=await Se(),r=oe(o),a=oe(e.keys),c={};for(let[y,f]of Ys){let S=js(o[y]),x=[...t==="add"?S:S.filter(m=>n.includes(m)||r.some(k=>k.key===m&&Ht(k,a)))];for(let m of a){if(m.type!==f||n.includes(m.key))continue;let k=S.includes(m.key);if(t==="add"&&k)continue;let P=f==="snippet"?Yf(m,i,o[m.key]):e.keys[m.key];P!==void 0&&(c[m.key]=P,x.includes(m.key)||x.push(m.key))}c[y]=JSON.stringify(x)}let l=zt(e.keys[Xe]),u=js(c["marketplace:installed-themes"]);l&&u.includes(l)&&!n.includes(l)&&(c[Xe]=e.keys[Xe]);let d=Gi(o,c);return await Vi(c,d),Object.keys(c).length+d.length}function Yf(e,t,n){let i=t?Fn(t,e.name):void 0;return i?JSON.stringify(p({code:i.code,title:i.title,description:i.description},i.imageURL?{imageURL:i.imageURL}:{})):n}function js(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function Vf(e){try{let t=e?JSON.parse(e):null;return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch(t){return null}}var Wt="/api/shares",Gf=`${Wt}/update`,qf=`${Wt}/delete`,Jf=`${Wt}/import`,Xf="x-syncify-user-hash",Zf="discover/presets.json",Qf={no_code:"This code doesn't exist.",too_many_codes:"You can't make more share codes. Delete one to make another.",daily_limit:"Too many changes to share codes today. Try again tomorrow.",too_large:"This setup is too big to share.",invalid_name:"Names can be up to 60 characters.",empty:"There's nothing to share yet. Install something from Marketplace first.",invalid_items:"Syncify couldn't read some items. Reload Spotify and try again.",source:"Some items don't load from GitHub. Reload Spotify and try again.",blocked:"Some items are on Marketplace's block list. Reload Spotify and try again.",custom_snippet:"Custom snippets can't be shared. Reload Spotify and try again.",unchecked:"Couldn't check Marketplace's block list. Try again in a minute.",publish_failed:"Couldn't publish the code. Press Update on it to try again.",delete_failed:"Couldn't delete the code. Try again.",same_setup:"You already shared this setup.",invalid_handle:"Handles are 3 to 20 letters, digits, _ or -, starting and ending with a letter or digit.",reserved_handle:"That handle isn't allowed. Pick another.",handle_taken:"That handle is taken. Pick another.",unavailable:"Share codes aren't available yet."},ey=new Set(["offline","signed_out","invalid_signature","stale_salt","no_device_key","too_many_requests"]);function Yt(e,t=null){var n;return e instanceof D&&ey.has(e.code)?$e(e):e instanceof D&&e.code==="too_many_codes"&&t!==null?`You have ${t} share codes already. Delete one to make another.`:(n=e instanceof D?Qf[e.code]:void 0)!=null?n:"Something went wrong. Try again."}async function jn(){var t;let e=await Lt(Wt,"GET");return{codes:Array.isArray(e==null?void 0:e.codes)?e.codes.flatMap(n=>{let i=ty(n);return i?[i]:[]}):[],newHearts:typeof(e==null?void 0:e.new_hearts)=="number"?e.new_hearts:0,max:typeof(e==null?void 0:e.max)=="number"?e.max:null,profile:typeof((t=e==null?void 0:e.profile)==null?void 0:t.handle)=="string"?{handle:e.profile.handle,link:typeof e.profile.link=="string"?e.profile.link:null}:null,suggestedHandle:typeof(e==null?void 0:e.suggested_handle)=="string"?e.suggested_handle:null}}async function ea(e,t,n){return aa(await Lt(Wt,"POST",p({name:e,keys:t},n===void 0?{}:{handle:n})))}function ta(e){return`${U().shareUrl.replace(/\/+$/,"")}/@${e}`}async function na(e,t,n){return aa(await Lt(Gf,"POST",{code:e,name:t,keys:n}))}async function ia(e){try{await Lt(qf,"POST",{code:e})}catch(t){if(t instanceof D&&t.code==="no_code")return;throw t}}async function oa(e){let t=U().shareUrl.replace(/\/+$/,""),n;try{n=await fetch(`${t}/${e}.json`)}catch(o){throw new D("offline")}if(n.status===404||n.status===403)throw new D("no_code");if(!n.ok)throw new D("failed");let i=Gs(await n.json().catch(()=>null));if(!i||i.code!==e)throw new D("no_code");return i}async function ra(){let e=U().shareUrl.replace(/\/+$/,"");try{let t=await fetch(`${e}/${Zf}`);if(!t.ok)return null;let n=await t.json();return Array.isArray(n.posts)?n.posts.flatMap(i=>{let o=iy(i);return o?[o]:[]}):null}catch(t){return null}}async function sa(e,t,n=!1){try{await es(Jf,p({code:e},n?{source:"preset"}:{}),{[Xf]:t.hash})}catch(i){}}function ty(e){let t=e;return!t||typeof t.code!="string"?null:{code:t.code,name:typeof t.name=="string"&&t.name?t.name:null,link:typeof t.link=="string"?t.link:null,item_count:typeof t.item_count=="number"?t.item_count:0,imports:typeof t.imports=="number"?t.imports:0,created_at:typeof t.created_at=="number"?t.created_at:0,updated_at:typeof t.updated_at=="number"?t.updated_at:0,posted:ny(e.post)}}function ny(e){let t=e==null?void 0:e.status;return typeof t=="string"&&t!=="removed"}function iy(e){let t=e,n=i=>Number.isSafeInteger(i)&&i>=0?i:0;return!t||typeof t.code!="string"?null:{code:t.code,name:typeof t.name=="string"?t.name:Ee(t.code),extensions:n(t.extensions),themes:n(t.themes),snippets:n(t.snippets)}}function aa(e){let t=e;if(typeof(t==null?void 0:t.code)!="string")throw new D("failed");return{code:t.code,link:typeof t.link=="string"?t.link:null,leftOut:Array.isArray(t.left_out)?t.left_out.length:0}}var ca="/claims",oy="/claims/cancel",ry={no_backup:"Back up first, then secure your backup.",unsupported_identity:"This backup can't be secured.",too_many_accounts:"Your account already secures 10 backups.",undone:"This backup can't be secured with your account.",offline:"Couldn't reach Syncify. Check your connection and try again."},Ke=class extends Error{constructor(n){var i;super((i=ry[n])!=null?i:"Couldn't secure your backup. Try again.");this.code=n;this.name="ClaimError"}};async function la(e,t){let n=await eo(e,t,"GET",ca);if(!n.ok)throw new Ke(await to(n));let i=await n.json().catch(()=>null);return{claim:Dt(i==null?void 0:i.claim),accounts:Array.isArray(i==null?void 0:i.accounts)?i.accounts.filter(sy):null}}async function ua(e,t){let n=await eo(e,t,"POST",ca);if(!n.ok)throw new Ke(await to(n));let i=await n.json().catch(()=>null);return Dt(i==null?void 0:i.claim)}async function da(e,t){let n=await eo(e,t,"POST",oy);if(n.status===404)return"cancelled";if(!n.ok)throw new Ke(await to(n));let i=await n.json().catch(()=>null);return(i==null?void 0:i.cancelled)===!1?"unchanged":"cancelled"}async function eo(e,t,n,i){try{return await Ie(e,t,{method:n},i)}catch(o){throw o instanceof TypeError?new Ke("offline"):o}}async function to(e){let t=await e.json().catch(()=>null);return typeof(t==null?void 0:t.code)=="string"?t.code:"failed"}function sy(e){let t=e;return!!(t&&typeof t.hash=="string"&&(t.status==="pending"||t.status==="final"||t.status==="cancelled"||t.status==="unlinked"))}var fa="[Syncify]";function re(e,...t){console.debug(fa,e,...t)}function ae(e,...t){console.warn(fa,e,...t)}var gt={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},ay=/^([a-z0-9]|f([1-9]|1[0-2]))$/,cy=250,ly=40,no=null,Wn=null,pt=null;function ya(){return/mac/i.test(navigator.platform||navigator.userAgent)}function ma(e){if(e===null)return null;if(!e||typeof e!="object")return gt;let t=e;return typeof t.key!="string"||!ay.test(t.key)?gt:{key:t.key,ctrl:!!t.ctrl,alt:!!t.alt,shift:!!t.shift,meta:!!t.meta}}function Vt(e){if(!e)return"Off";let t=e.key.toUpperCase();return ya()?[e.ctrl?"\u2318":"",e.alt?"\u2325":"",e.shift?"\u21E7":"",t].join(""):[e.ctrl&&"Ctrl",e.meta&&"Win",e.alt&&"Alt",e.shift&&"Shift",t].filter(Boolean).join("+")}function pa(e){if(e.key==="Escape")return{kind:"cancel"};let t=uy(e.code);if(!t)return{kind:"ignore"};let n=ya();if(n&&e.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:t,ctrl:n?e.metaKey:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:n?!1:e.metaKey},o=t.startsWith("f")&&t.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!o?{kind:"error",message:`Include ${n?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function uy(e){var n,i;let t=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(e);return t?((i=(n=t[1])!=null?n:t[2])!=null?i:t[3]).toLowerCase():null}function ga(e){var t;if(pt&&dy(pt,e))return!1;try{let n=Spicetify.Mousetrap,i=(t=n.trigger)==null?void 0:t.call(n)._directMap;if(!i)return!1;let o=io(e);return Object.keys(i).some(r=>r.startsWith(`${o}:`))}catch(n){return!1}}function oo(e,t,n=0){if(no=t,Wn=e,!ha()){if(n>=ly){ae("Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>oo(Wn,t,n+1),cy);return}ro(Wn)}function ro(e){if(Wn=e,!ha()||!no)return;let t=no;try{if(pt&&Spicetify.Keyboard._deregisterShortcut(pt),pt=null,!e)return;Spicetify.Keyboard.registerShortcut(e,n=>{n.preventDefault(),t()}),pt=e,re("Keyboard shortcut registered",Vt(e))}catch(n){ae("Failed to register keyboard shortcut",n)}}function ha(){var e;return typeof((e=Spicetify.Keyboard)==null?void 0:e.registerShortcut)=="function"}function io(e){return[e.ctrl&&"mod",e.meta&&"meta",e.alt&&"alt",e.shift&&"shift",e.key].filter(Boolean).join("+")}function dy(e,t){return io(e)===io(t)}var so="both",fy=["both","topbar","menu"],Gt=null,qt=null,Yn=!1;function Sa(e){return fy.includes(e)?e:so}function Vn(){var e;return typeof((e=Spicetify.Menu)==null?void 0:e.Item)=="function"}function ba(e){Gt=e.topbarButton,qt=e.menuItem}function Gn(e){let t=e!=="menu"||!qt,n=e!=="topbar";if(Gt!=null&&Gt.element&&(Gt.element.style.display=t?"":"none"),!!qt)try{n&&!Yn?(qt.register(),Yn=!0):!n&&Yn&&(qt.deregister(),Yn=!1)}catch(i){ae("Failed to update profile menu item",i)}}var qn="syncify:config",ht={workerUrl:U().workerUrl,autoBackupEnabled:!1,shortcut:gt,entryPoint:so,settingsSyncEnabled:!0,settingsSyncOff:[],shareRestoredSettings:!0};function j(){var n,i;let e=U(),t=(i=(n=Spicetify.LocalStorage)==null?void 0:n.get(qn))!=null?i:window.localStorage.getItem(qn);if(!t)return w(p({},ht),{workerUrl:e.workerUrl});try{let o=JSON.parse(t);return{workerUrl:e.workerUrl,autoBackupEnabled:ao(o.autoBackupEnabled,ht.autoBackupEnabled),shortcut:o.shortcut===void 0?ht.shortcut:ma(o.shortcut),entryPoint:Sa(o.entryPoint),settingsSyncEnabled:ao(o.settingsSyncEnabled,ht.settingsSyncEnabled),settingsSyncOff:yy(o.settingsSyncOff),shareRestoredSettings:ao(o.shareRestoredSettings,ht.shareRestoredSettings)}}catch(o){return w(p({},ht),{workerUrl:e.workerUrl})}}function Ze(e){var n;let t=JSON.stringify({workerUrl:U().workerUrl,autoBackupEnabled:e.autoBackupEnabled,shortcut:e.shortcut,entryPoint:e.entryPoint,settingsSyncEnabled:e.settingsSyncEnabled,settingsSyncOff:e.settingsSyncOff,shareRestoredSettings:e.shareRestoredSettings});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set(qn,t);return}window.localStorage.setItem(qn,t)}function yy(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ao(e,t){return e===void 0?t:!!e}function Jt(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}var my=["username","canonicalUsername","id","uri","displayName"];async function me(){let{value:e,field:t}=await py();return{hash:await Tn(e),field:t}}async function py(){var o;let e=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let t=await e.getUser(),n=my.find(r=>(t==null?void 0:t[r])!=null),i=n?t[n]:void 0;if(!n||!i)throw new Error("Unable to resolve the active Spotify user.");return{value:i,field:n}}async function Qt(e,t){if(!Jt(e))throw new Error("Syncify backup service is not configured.");let[n,i]=await Promise.all([me(),Ms()]);if(i.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:o,settings:r}=await rs(e.workerUrl,n,i,t==null?void 0:t.part);return{payload:i,unchanged:o,settings:r}}async function Qe(e,t,n){var f;if(!Jt(e))throw new Error("Syncify backup service is not configured.");let i=await $i(e.workerUrl,await me(),t,n==null?void 0:n.part),[o,r,a,c,l]=await Promise.all([Promise.all(i.backups.map(Xt)),i.safetyCopy?Xt(i.safetyCopy):null,Promise.all(i.pinned.map(Xt)),Promise.all(i.others.map(Xt)),Promise.all(i.unapproved.map(Xt))]),u=S=>S.filter((b,x)=>S.findIndex(m=>m.payload_hash===b.payload_hash)===x),d=u(o),y=S=>!d.some(b=>b.payload_hash===S.payload_hash);return w(p({},i),{payload:(f=d[0])!=null?f:null,backups:d,safetyCopy:r,pinned:a,others:u(c).filter(y),unapproved:l.filter(y)})}var co=new Map;async function Xt(e){var r,a,c;let t=(a=(r=e.marketplace_data)==null?void 0:r.keys)!=null?a:{},n=e.spicetify_config?ji(e.spicetify_config,t):void 0,i=`${e.payload_hash} ${(c=e.metadata)==null?void 0:c.last_sync_datetime}`,o=co.get(i);return o||(o=$n(t,n),co.set(i,o),o.catch(()=>co.delete(i))),w(p(p({},e),n?{spicetify_config:n}:{}),{payload_hash:await o})}async function wa(e,t){let n=await $i(en(e),await me(),void 0,t==null?void 0:t.part);return{claim:n.claim,install:n.install,nudge:n.nudge,backups:n.backups,settings:n.settings}}async function ka(e,t,n,i=[],o={ids:[],share:!1}){var l;let r=t!=null?t:(await Qe(e)).payload;if(!r)throw new Error("No Syncify cloud backup was found for this Spotify account.");await gy(r,o);let a=await Ls(r,i),c=(l=r.backup)==null?void 0:l.id;return c&&Jt(e)&&me().then(u=>cs(e.workerUrl,u,c,n)).catch(()=>{}),{payload:r,restoredCount:a}}async function gy(e,t){if(t.ids.length===0||!e.extension_settings)return;let n=await Re();n&&(await _n(n,e.extension_settings,t.ids),await ps(p({at:Date.now()},t)))}var Zt=class extends Error{constructor(n){super("Couldn't back up your setup first, so nothing changed.");this.reason=n;this.name="SafetyBackupError"}};async function va(e,t,n,i,o,r=!1){try{await Qt(e)}catch(c){throw new Zt(c)}let a=await Qs(t,n,i,o);return me().then(c=>sa(t.code,c,r)).catch(()=>{}),a}async function xa(e){let t=await me(),n=await la(en(e),t);return w(p({},n),{hash:t.hash})}async function Ca(e){await ua(en(e),await me())}async function Ia(e,t,n){await ss(en(e),await me(),t,n)}async function Jn(e){return da(en(e),await me())}function en(e){if(!Jt(e))throw new Error("Syncify backup service is not configured.");return e.workerUrl}function ze(e){var t,n;return(n=(t=Spicetify.LocalStorage)==null?void 0:t.get(e))!=null?n:window.localStorage.getItem(e)}function Fe(e,t){var n;(n=Spicetify.LocalStorage)!=null&&n.set?Spicetify.LocalStorage.set(e,t):window.localStorage.setItem(e,t)}var Ra="syncify:claim-not-me";function tn(e){return!e||e.mine||e.status==="undone"||ze(Ra)===Ea(e)?null:e}function Xn(e){Fe(Ra,Ea(e))}function Ea(e){var t,n;return e.status==="pending"?`pending ${(t=e.email)!=null?t:""} ${e.final_at}`:`final ${(n=e.email)!=null?n:""}`}var Na="syncify:nudge-hidden-until",Ta="syncify:nudge-panel-shown",hy=30,Sy=864e5;function Pa(e=Date.now()){let t=Number(ze(Na));return Number.isFinite(t)&&t>e}function Aa(e=Date.now()){Fe(Na,String(e+hy*Sy))}function _a(){return ze(Ta)!==null}function Ma(){Fe(Ta,"1")}var Oa="settings-sync",Qn="syncify:settings-sync",by=17946e8,wy={since:0,pulled:!1,firstSyncDone:!1,account:{},base:{},seen:{},heldSent:{},deleted:{}},La={bytes:0,limit:0,items:[],choices:[],arrived:null,budgetDay:null},lo=new Set;function Ne(){var t,n;let e=(n=(t=Spicetify.LocalStorage)==null?void 0:t.get(Qn))!=null?n:window.localStorage.getItem(Qn);if(!e)return La;try{let i=JSON.parse(e);return{bytes:typeof i.bytes=="number"?i.bytes:0,limit:typeof i.limit=="number"?i.limit:0,items:Array.isArray(i.items)?i.items:[],choices:Array.isArray(i.choices)?i.choices:[],arrived:i.arrived&&Array.isArray(i.arrived.ids)?i.arrived:null,budgetDay:typeof i.budgetDay=="string"?i.budgetDay:null}}catch(i){return La}}function St(e){var n;let t=JSON.stringify(e);(n=Spicetify.LocalStorage)!=null&&n.set?Spicetify.LocalStorage.set(Qn,t):window.localStorage.setItem(Qn,t);for(let i of lo)i(e)}function ni(e){return lo.add(e),()=>lo.delete(e)}function Ba(){let e=Ne();e.arrived&&St(w(p({},e),{arrived:null}))}function Da(){let e=Ne();e.arrived&&St(w(p({},e),{arrived:w(p({},e.arrived),{hidden:!0})}))}function ii(e){return`${e.length>=3?`${e[0]}, ${e[1]} and ${e.length-2} more`:e.join(" and ")} ${e.length===1?"has":"have"} new extension settings`}async function nn(e){var y;if(!e.settingsSyncEnabled||!await te().catch(()=>null))return null;let t=await Re();if(!t)return null;let n=await on(),i=await Fa(t);await vy(n,i);let o=Ne(),r=new Set(e.settingsSyncOff),a=new Set(o.choices.map(f=>f.id)),c=n.pulled&&o.budgetDay!==Ga(Date.now()),l={},u=new Set;if(c)for(let f of t.items){let S=i.get(f.id);if(r.has(f.id)||a.has(f.id)||!S)continue;let b=ti(f,S);if(b>f.limit){n.heldSent[f.id]!==b&&(l[f.id]={held:b},u.add(f.id));continue}let x=(y=n.base[f.id])!=null?y:ky(n,f.id)?{}:void 0;if(x===void 0)continue;let m=Py(f,S,x);m&&(l[f.id]=m,u.add(f.id))}return{part:JSON.stringify(w(p({since:n.since},u.size>0?{changes:l}:{}),{installed:[...i.keys()]})),registry:t,local:i,sent:u}}function ky(e,t){let n=e.account[t];return!n||n.off===!0||n.data===null}async function vy(e,t){var i;let n=await he(An).catch(()=>{});if(n){if(!n.share){for(let o of n.ids){e.base[o]=(i=t.get(o))!=null?i:{};let r=e.account[o];r!=null&&r.data&&(e.seen[o]=V(r.data))}await ri(e)}await bn(An).catch(()=>{})}}var xy={arrived:[],choose:!1};async function oi(e,t,n){let i=e?Cy(t):null;if(!e||!i)return xy;let{registry:o,local:r}=e,a=Date.now(),c=await on(),l=j(),u=new Set(l.settingsSyncOff),d=Ne(),y=[];for(let[m,k]of Object.entries(i.items))c.account[m]=k;c.since=i.version,c.pulled=!0;let f=new Set([...Object.entries(i.items).flatMap(([m,k])=>k.off?[m]:[]),...Object.entries(i.results).flatMap(([m,k])=>k==="off"?[m]:[])]);for(let m of f)c.deleted[m]!==void 0&&!u.has(m)||(u.add(m),Va(c,m));for(let[m,k]of Object.entries(c.deleted))k<=i.version&&delete c.deleted[m];let S=new Map(o.items.map(m=>[m.id,m])),b=[];for(let m of o.items){let k=r.get(m.id);if(u.has(m.id)||!k)continue;let P=e.sent.has(m.id)?i.results[m.id]:void 0;if(P==="held"){c.heldSent[m.id]=ti(m,k);continue}if(ti(m,k)>m.limit||(delete c.heldSent[m.id],P!==void 0&&P!=="saved"))continue;let A=c.account[m.id];if(!(A!=null&&A.data)||A.off)continue;let C=uo(A),I=V(A.data),M=c.base[m.id],T=async B=>{if(!Zn(m,k,C)){if(!await Wa(o,m,A))return;(B||!A.mine)&&y.push(m.id)}c.base[m.id]=C,c.seen[m.id]=I};P==="saved"?await T(!0):M===void 0?c.firstSyncDone||Zn(m,k,C)?await T(!1):b.push(m.id):c.seen[m.id]!==I&&Zn(m,k,M)&&await T(!1)}b.length===0&&(c.firstSyncDone=!0);let x=Ut(o.items);return await ri(c),u.size!==l.settingsSyncOff.length&&Ze(w(p({},l),{settingsSyncOff:[...u]})),St(w(p({},za(o,c,r,x,i.bytes)),{choices:b.flatMap(m=>{var A;let k=x.get(m),P=S.get(m);return!k||!P?[]:[{id:m,name:k.name,kind:k.kind,localAt:Iy(P,(A=r.get(m))!=null?A:{},n,a),accountAt:Ry(c.account[m])}]}),arrived:Ua(d.arrived,y,x),budgetDay:i.budget==="used_up"?Ga(a):null})),{arrived:y.map(m=>{var k,P;return(P=(k=x.get(m))==null?void 0:k.name)!=null?P:m}),choose:b.length>0}}function Ua(e,t,n){var r;if(t.length===0)return e;let i=[...new Set([...(r=e==null?void 0:e.ids)!=null?r:[],...t])],o=new Map(e?e.ids.map((a,c)=>[a,e.names[c]]):[]);return{ids:i,names:i.map(a=>{var c,l,u;return(u=(l=(c=n.get(a))==null?void 0:c.name)!=null?l:o.get(a))!=null?u:a}),hidden:!1}}function Cy(e){if(!pe(e)||e.status!=="ok"||!Number.isSafeInteger(e.version)||typeof e.bytes!="number")return null;let t={};for(let i of Array.isArray(e.items)?e.items:[]){if(!pe(i)||typeof i.id!="string"||typeof i.size!="number")continue;let o=pe(i.data)?i.data:null;t[i.id]=p(p(p({data:o,size:i.size},typeof i.held=="number"?{held:i.held}:{}),i.off===!0?{off:!0}:{}),i.mine===!0?{mine:!0}:{})}let n={};if(pe(e.results))for(let[i,o]of Object.entries(e.results))typeof o=="string"&&(n[i]=o);return{version:e.version,bytes:e.bytes,budget:e.budget==="used_up"?"used_up":"open",results:n,items:t}}async function $a(e){let t=await Re();if(!t)return;let n=await on(),i=Ne(),o=[];for(let[a,c]of Object.entries(e)){let l=t.items.find(d=>d.id===a),u=n.account[a];!l||!(u!=null&&u.data)||u.off||(c==="account"&&await Wa(t,l,u)&&o.push(a),n.base[a]=uo(u),n.seen[a]=V(u.data))}n.firstSyncDone=!0,await ri(n);let r=new Map(i.choices.map(a=>[a.id,{id:a.id,key:"",name:a.name,kind:a.kind}]));St(w(p({},i),{choices:[],arrived:Ua(i.arrived,o,r)}))}function Iy(e,t,n,i){var r;if(e.storage.type==="indexedDB"&&e.storage.valueField){let a=Object.values(t).flatMap(c=>pe(c)&&typeof c.ts=="number"?[c.ts]:[]);if(a.length>0)return Math.max(...a)}let o=i;for(let a of n){let c=(r=a.extension_settings)==null?void 0:r[e.id];if(!c||c.storage!==e.storage.type||!Zn(e,t,ja(e,c.values)))break;let l=Date.parse(a.metadata.last_sync_datetime);if(Number.isNaN(l))break;o=l}return o}function Ry(e){var t;return Math.max(0,...Object.values((t=e==null?void 0:e.data)!=null?t:{}).map(n=>n.t))}async function Ha(e,t){if(!e.workerUrl)throw new Error("Syncify backup service is not configured.");let{version:n}=await as(e.workerUrl,await me(),t),i=await on();i.deleted[t]=n,i.account[t]={data:null,size:0,off:!0},Va(i,t),await ri(i);let o=j();o.settingsSyncOff.includes(t)||Ze(w(p({},o),{settingsSyncOff:[...o.settingsSyncOff,t]}));let r=Ne();St(w(p({},r),{items:r.items.map(a=>a.id===t?w(p({},a),{hold:null}):a)}))}async function Ka(){let e=await Re();if(!e)return Ne().items;let[t,n]=await Promise.all([on(),Fa(e)]),i=Ut(e.items),o=Ne(),r=za(e,t,n,i,o.bytes);return St(p(p({},o),r)),r.items}function Ey(e){return[...e].sort((t,n)=>+(n.hold!==null)-+(t.hold!==null)||t.name.localeCompare(n.name))}function za(e,t,n,i,o){let r=e.items.flatMap(a=>{var S;let c=n.get(a.id);if(!c)return[];let l=ti(a,c),u=t.account[a.id],d=l>a.limit?{size:l,reason:"too_big"}:(u==null?void 0:u.held)!==void 0&&!u.off?{size:u.held,reason:u.held>a.limit?"too_big":"account_full"}:null,y=(S=i.get(a.id))!=null?S:{id:a.id,key:"",name:a.id,kind:"extension"},f=u&&!u.off?u.size:0;return[w(p({},y),{size:l,limit:a.limit,list:Object.keys(a.lists).length>0,accountSize:f,hold:d})]});return{bytes:o,limit:e.accountLimit,items:Ey(r)}}async function Fa(e){let{settings:t}=await dt(e),n=new Map;for(let i of e.items){let o=t[i.id];o&&n.set(i.id,ja(i,o.values))}return n}function ja(e,t){var i;let n={};for(let[o,r]of Object.entries(t))Le(e,o)&&(n[o]=e.lists[o]&&(i=Ny(e,o,r))!=null?i:r);return n}function Ny(e,t,n){let i=e.lists[t],o=n;if(e.storage.type==="localStorage"){if(typeof n!="string")return null;try{o=JSON.parse(n)}catch(r){return null}}else e.storage.valueField&&pe(n)&&(o=n[e.storage.valueField]);return ei(i,o)?o:null}function ei(e,t){return e?e.merge==="object"?pe(t):Array.isArray(t):!1}function Ty(e,t,n){let i={};for(let[o,r]of Object.entries(t)){if(!Le(e,o))continue;let a=e.lists[o]&&ei(e.lists[o],r);e.storage.type==="localStorage"?a?i[o]=JSON.stringify(r):typeof r=="string"&&(i[o]=r):a&&e.storage.valueField?i[o]=w(p({},pe(n[o])?n[o]:{}),{[e.storage.valueField]:r}):i[o]=r}return i}async function Wa(e,t,n){var c,l;let{settings:i}=await dt(w(p({},e),{items:[t]})),o=(l=(c=i[t.id])==null?void 0:c.values)!=null?l:{},r=Ty(t,uo(n),o);if(Object.keys(r).length===0)return!1;let a={[t.id]:{storage:t.storage.type,values:r}};try{return await _n(e,a,[t.id]),!0}catch(u){return!1}}function uo(e){var n;let t={};for(let[i,o]of Object.entries((n=e.data)!=null?n:{}))pe(o)&&o.v!==null&&o.v!==void 0&&(t[i]=o.v);return t}function ti(e,t){let n={};for(let[i,o]of Object.entries(t))n[i]={v:o,t:by};return Object.keys(n).length===0?0:new TextEncoder().encode(JSON.stringify(n)).byteLength}function Zn(e,t,n){return[...new Set([...Object.keys(t),...Object.keys(n)])].every(o=>Ya(e,o,t[o],n[o]))}function Ya(e,t,n,i){if(n===void 0||i===void 0)return n===i;let o=e.storage.type==="indexedDB"&&!e.lists[t]?e.storage.valueField:void 0,r=a=>o&&pe(a)?a[o]:a;return V(r(n))===V(r(i))}function Py(e,t,n){let i={},o={};for(let a of new Set([...Object.keys(t),...Object.keys(n)])){let c=t[a],l=n[a];if(Ya(e,a,c,l))continue;let u=e.lists[a],d=u&&c!==void 0?Ay(u,c,l):null;d?o[a]=d:i[a]=c===void 0?null:c}let r=p(p({},Object.keys(i).length>0?{set:i}:{}),Object.keys(o).length>0?{lists:o}:{});return Object.keys(r).length>0?r:null}function Ay(e,t,n){if(!ei(e,t))return null;let i=ei(e,n)?n:e.merge==="object"?{}:[];if(e.merge==="object"){let d=t,y=i,f=Object.fromEntries(Object.entries(d).filter(([b,x])=>V(x)!==V(y[b]))),S=Object.keys(y).filter(b=>!(b in d));return p(p({},Object.keys(f).length>0?{put:f}:{}),S.length>0?{remove:S}:{})}let o=d=>{let y=pe(d)?d[e.id]:void 0;return typeof y=="string"||typeof y=="number"?y:null},r=t;if(r.some(d=>o(d)===null))return null;let a=new Map(i.flatMap(d=>o(d)===null?[]:[[JSON.stringify(o(d)),d]])),c=r.filter(d=>V(d)!==V(a.get(JSON.stringify(o(d))))),l=new Set(r.map(d=>JSON.stringify(o(d)))),u=[...a.entries()].filter(([d])=>!l.has(d)).flatMap(([,d])=>{var y;return(y=o(d))!=null?y:[]});return p(p({},c.length>0?{put:c}:{}),u.length>0?{remove:u}:{})}async function on(){let e=await he(Oa).catch(()=>{});return p(p({},structuredClone(wy)),pe(e)?e:{})}function ri(e){return ye(Oa,e)}function Va(e,t){delete e.base[t],delete e.seen[t],delete e.heldSent[t]}function Ga(e){return new Date(e).toISOString().slice(0,10)}function pe(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}var qa="syncify:claim-check-day",Ja="syncify:undone-claim-shown";async function Xa(e){var n,i,o;let t=j();if(Ba(),!!t.workerUrl){if(!t.autoBackupEnabled)return _y(e);try{let r=await nn(t).catch(()=>null),[a,c]=await Promise.all([Hn(),Qe(t,void 0,r)]),l=await Za(r,c);if(Qa(c,e,l),((n=tn(c.claim))==null?void 0:n.status)==="final"&&!c.exists)return;let u=(o=(i=c.payload)==null?void 0:i.metadata.marketplace_key_count)!=null?o:0;if(c.backups.some(y=>y.payload_hash===a.hash))return;let d=[c.safetyCopy,...c.pinned].some(y=>(y==null?void 0:y.payload_hash)===a.hash);if(c.exists&&!d&&Os(a.keyCount,u)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(a.keyCount===0)return;await Qt(t),Spicetify.showNotification("Syncify auto-backup complete")}catch(r){let a=r instanceof Error?r.message:String(r);console.warn("Syncify startup sync failed:",r),Spicetify.showNotification(`Syncify auto-sync skipped: ${a}`,!0,8e3)}}}async function _y(e){let t=new Date().toLocaleDateString("en-CA");if(ze(qa)!==t)try{let n=j(),i=await nn(n).catch(()=>null),o=await wa(n,i);Fe(qa,t);let r=await Za(i,o);Qa(o,e,r)}catch(n){console.warn("Syncify claim check failed:",n)}}async function Za(e,t){if(!e)return!1;try{let n=await oi(e,t.settings,t.backups);return n.arrived.length>0&&Spicetify.showNotification(ii(n.arrived)),n.choose}catch(n){return console.warn("Syncify extension settings sync failed:",n),!1}}function Qa(e,t,n){var a;let i=tn(e.claim),o=My(e.claim),r=(a=e.install)==null?void 0:a.waiting[0];i?t.onClaim(i):o?t.onUndone(o)&&Fe(Ja,String(o.undone_at)):r?t.onInstall(r):e.nudge&&!_a()?t.onNudge():n&&t.onFirstSync()}function My(e){return(e==null?void 0:e.status)==="undone"&&ze(Ja)!==String(e.undone_at)?e:null}var yo="syncify:pending-restore",Ly=600*1e3,Oy=2e3,By=15e3,Dy="marketplace:theme-installed",Uy="raw.githubusercontent.com",$y=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],Te=null,fo=new Set,nc=new Map;function ic(){return Te}function oc(e){return fo.add(e),()=>fo.delete(e)}function rc(){Te&&uc(w(p({},Te),{manual:[]}))}function sn(e,t="restore"){try{localStorage.setItem(yo,JSON.stringify({at:Date.now(),manual:e,kind:t}))}catch(n){}}function sc(){var e;sn((e=Te==null?void 0:Te.manual)!=null?e:[],Te==null?void 0:Te.kind),window.location.reload()}function ac(){dc()&&(document.addEventListener("load",e=>ec(e.target,"load"),!0),document.addEventListener("error",e=>ec(e.target,"error"),!0))}async function cc(){let e=dc();if(!e)return;try{localStorage.removeItem(yo)}catch(a){}let t=Date.now(),n=await tc();for(;n.loaded<n.total&&Date.now()-t<By;)await new Promise(a=>setTimeout(a,Oy)),n=await tc();uc(w(p({kind:e.kind,at:Date.now()},n),{manual:e.manual}));let i=n.loaded===n.total&&e.manual.length===0,o=e.kind==="share"?"Setup applied":"Backup restored",r=e.kind==="share"?"loaded":"restored";Spicetify.showNotification(i?`Syncify: ${o}; ${n.total} ${n.total===1?"item":"items"}`:`Syncify: ${r} ${n.loaded} of ${n.total}. Open Syncify for details.`,!1,8e3)}function lc(e){let t=e.map(n=>n.type==="extension"?`spicetify config extensions ${si(n.name)}`:n.type==="custom_app"?`spicetify config custom_apps ${si(n.name)}`:`spicetify config current_theme ${si(n.name)}${n.scheme?` color_scheme ${si(n.scheme)}`:""}`);return t.length>0?[...t,"spicetify apply"]:[]}function si(e){return/^[\w.@+/-]+$/.test(e)?e:`"${e}"`}function uc(e){Te=e;for(let t of fo)t(e)}function dc(){var e;try{let t=JSON.parse((e=localStorage.getItem(yo))!=null?e:"null");return!t||Date.now()-t.at>Ly?null:{manual:Array.isArray(t.manual)?t.manual:[],kind:t.kind==="share"?"share":"restore"}}catch(t){return null}}function ec(e,t){e instanceof HTMLScriptElement&&e.src&&nc.set(rn(e.src),t)}async function tc(){var i;let e=await Se(),t=(i=e[Dy])!=null?i:"",n=oe(e).filter(o=>o.type==="extension"&&o.sources.length>0||o.type==="theme"&&t.includes(o.key)||o.type==="snippet");return{loaded:n.filter(Hy).length,total:n.length}}function Hy(e){var t,n;if(e.type==="snippet"){let i=document.querySelector("style.marketplaceSnippets");return((t=i==null?void 0:i.textContent)==null?void 0:t.includes(`/* ${e.name} - `))===!0}if(e.type==="theme"){let i=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((n=i==null?void 0:i.textContent)!=null&&n.trim())}return Ky(e.sources[0]).some(zy)}function Ky(e){let t;try{t=new URL(e)}catch(a){return[]}if(t.host!==Uy)return[rn(t.href)];let[n,i,o,...r]=t.pathname.split("/").filter(Boolean);return!n||!i||!o||r.length===0?[]:$y.map(a=>rn(`https://${a}/gh/${n}/${i}@${o}/${r.join("/")}`))}function zy(e){let t=nc.get(e);return t?t==="load":[...document.querySelectorAll("script[src]")].some(i=>rn(i.src)===e)&&performance.getEntriesByType("resource").some(i=>rn(i.name)===e)}function rn(e){try{let t=new URL(e);return`${t.origin}${t.pathname}`}catch(t){return e}}var mo=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var fc=".main-actionButtons",jy=".Root__globalNav, .Root__top-bar",Wy=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function yc(e){let t=new Spicetify.Topbar.Button(U().extensionName,mo,e,!1,!0);return mc(t),Yy(t),t}function mc(e){var t;e.element.style.setProperty("-webkit-app-region","no-drag"),(t=e.button)==null||t.style.setProperty("-webkit-app-region","no-drag")}function Yy(e){if(typeof MutationObserver=="undefined")return;let t=!1,n=null,i=()=>{t=!1,r();let a=e.element,c=document.querySelector(fc);!a||!c||c.contains(a)||(c.prepend(a),Vy(e),mc(e),re("Topbar button re-attached"))},o=new MutationObserver(()=>{t||(t=!0,setTimeout(i,250))}),r=()=>{var l;if(n!=null&&n.isConnected)return;let a=document.querySelector(fc),c=(l=a==null?void 0:a.closest(jy))!=null?l:a==null?void 0:a.parentElement;if(o.disconnect(),n=c!=null?c:null,!c){o.observe(document.body,{childList:!0,subtree:!0});return}o.observe(c,{childList:!0,subtree:!0});for(let u=c.parentElement;u;u=u.parentElement)o.observe(u,{childList:!0})};i()}function Vy(e){let t=e.button;if(!t||t.className&&t.className!=="undefined")return;let n=Array.from(document.querySelectorAll(Wy)).find(i=>!e.element.contains(i));n!=null&&n.className&&(t.className=n.className)}function pc(e){if(!Vn())return null;try{return new Spicetify.Menu.Item(U().extensionName,!1,e,Gy())}catch(t){return ae("Failed to create profile menu item",t),null}}function Gy(){return mo.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}var qy="syncify:beta",gc=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function hc(){var e;return(e=window.SyncifyLoader)!=null?e:null}function Jy(){try{return window.localStorage.getItem(qy)==="true"}catch(e){return!1}}async function Sc(e){let t=Jy()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(t.map(i=>Xy(`${e}/${i}`)))).reduce((i,o)=>o&&(!i||go(o,i)>0)?o:i,null)}function po(e){return typeof e=="string"&&gc.test(e)}function go(e,t){let[n,i]=[e,t].map(o=>{var u;let[,r,a,c,l]=(u=gc.exec(o))!=null?u:[];return[r,a,c,l!=null?l:1/0].map(Number)});for(let o=0;o<n.length;o+=1)if(n[o]!==i[o])return n[o]<i[o]?-1:1;return 0}async function Xy(e,t=3e3){let n=typeof AbortController=="function"?new AbortController:null,i=setTimeout(()=>n==null?void 0:n.abort(),t);try{let o=await fetch(e,{signal:n==null?void 0:n.signal});if(!o.ok)return null;let r=await o.json();return po(r==null?void 0:r.version)?r.version:null}catch(o){return null}finally{clearTimeout(i)}}function bt(...e){return e.filter(Boolean).join(" ")}function ho(e,t){return t===void 0?e:w(p({},e),{key:t})}function s(e,t,n){let r=t,{children:i}=r,o=ge(r,["children"]);return i===void 0?Nt(e,ho(o,n)):Nt(e,ho(o,n),i)}function g(e,t,n){let a=t,{children:i}=a,o=ge(a,["children"]),r=Array.isArray(i)?i:[i];return Nt(e,ho(o,n),...r)}var Zy={primary:"regular",secondary:"regular",danger:"regular",text:"small",subtle:"small"};function v(e){let l=e,{variant:t="primary",size:n=Zy[t],type:i="button",icon:o,children:r,className:a}=l,c=ge(l,["variant","size","type","icon","children","className"]);return g("button",w(p({className:bt("syncify-btn",a),"data-variant":t,"data-size":n,type:i},c),{children:[o,s("span",{className:"syncify-cap",children:r})]}))}function So(e){return s("input",{className:"syncify-checkbox",type:"checkbox","aria-label":e.label,checked:e.checked,onChange:t=>e.onChange(t.currentTarget.checked),disabled:e.disabled})}function bo(e){return g("label",{className:"syncify-checkbox-row","data-disabled":e.disabled?"true":void 0,children:[s("input",{className:"syncify-checkbox",type:"checkbox",checked:e.checked,onChange:t=>e.onChange(t.currentTarget.checked),disabled:e.disabled}),s("span",{className:"syncify-checkbox-label",children:e.label})]})}var Qy=0;function K(e){let[t]=h(()=>`syncify-${e}-${++Qy}`);return t}function ai(e){let{onSubmit:t}=e,n=g(E,{children:[s("h2",{className:"syncify-dialog-title",id:e.titleId,children:e.title}),e.children?s("div",{className:"syncify-dialog-text",children:e.children}):null,s("div",{className:"syncify-dialog-actions",children:e.actions})]});return t?s("form",{className:"syncify-dialog-content",noValidate:!0,onSubmit:i=>{i.preventDefault(),t()},children:n}):s("div",{className:"syncify-dialog-content",children:n})}function et(e){let t=H(null),n=K("dialog"),{open:i}=e,o=H(e.onClose);return Tt(()=>{o.current=e.onClose}),_(()=>{let r=t.current;if(!r||!i)return;let a=document.activeElement;r.open||r.showModal();let c=l=>{l.preventDefault(),o.current()};return r.addEventListener("cancel",c),()=>{r.removeEventListener("cancel",c),r.open&&r.close(),a instanceof HTMLElement&&a.isConnected&&a.focus()}},[i]),i?s("dialog",{className:"syncify-dialog","data-width":e.wide?"wide":void 0,ref:t,"aria-labelledby":n,children:s(ai,{title:e.title,actions:e.actions,titleId:n,onSubmit:e.onSubmit,children:e.children})}):null}function be(e){var o,r;let t=K("field"),n=`${t}-error`,i=!!e.error;return g("div",{className:"syncify-field-group",children:[s("label",{className:"syncify-field-label",htmlFor:t,children:e.label}),g("div",{className:"syncify-field-row",children:[g("span",{className:"syncify-input-box","data-invalid":i?"true":void 0,"data-disabled":e.disabled?"true":void 0,children:[e.prefix?s("span",{className:"syncify-input-prefix","aria-hidden":"true",children:e.prefix}):null,s("input",{className:"syncify-input-control",id:t,type:(o=e.type)!=null?o:"text",value:e.value,onChange:a=>e.onChange(a.currentTarget.value),onBlur:e.onBlur,placeholder:e.placeholder,inputMode:e.inputMode,autoComplete:(r=e.autoComplete)!=null?r:"off",spellCheck:!1,maxLength:e.maxLength,disabled:e.disabled,autoFocus:e.autoFocus,"aria-invalid":i||void 0,"aria-describedby":i?n:void 0,"data-mono":e.mono?"true":void 0})]}),e.action]}),i?s("span",{className:"syncify-field-error",id:n,role:"alert",children:e.error}):null]})}function je(e){let o=e,{children:t,className:n}=o,i=ge(o,["children","className"]);return s("svg",w(p({className:bt("syncify-icon",n),viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},i),{children:t}))}function bc(e){return s(je,w(p({},e),{children:s("path",{d:"m9 6 6 6-6 6"})}))}function wc(e){return g(je,w(p({},e),{children:[s("path",{d:"M7 7h10v10"}),s("path",{d:"M7 17 17 7"})]}))}function kc(e){return s(je,w(p({},e),{children:s("path",{d:"m6 9 6 6 6-6"})}))}function Oe(e){return s(je,w(p({},e),{children:s("path",{d:"M5 12.5l4.5 4.5L19 7.5"})}))}function wo(e){return s(je,w(p({},e),{children:s("path",{d:"M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z"})}))}function ci(e){return g(je,w(p({},e),{children:[s("path",{d:"M12 17v5"}),s("path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"})]}))}function vc(e){return g(je,w(p({},e),{"data-filled":"true",children:[s("rect",{x:"4",y:"10.5",width:"3",height:"3",rx:"0.75"}),s("rect",{x:"10.5",y:"10.5",width:"3",height:"3",rx:"0.75"}),s("rect",{x:"17",y:"10.5",width:"3",height:"3",rx:"0.75"})]}))}function ko(e){return g(je,w(p({},e),{children:[s("path",{d:"M12 6v7"}),s("path",{d:"M12 17.5v.5"})]}))}function vo(e){let o=e,{keys:t,recording:n}=o,i=ge(o,["keys","recording"]);return s("button",w(p({className:"syncify-keycap",type:"button","data-recording":n?"true":void 0},i),{children:s("span",{className:"syncify-cap",children:t})}))}function Y(e){return s("ul",{className:"syncify-list","aria-label":e.label,"aria-busy":e.busy?"true":void 0,"data-wrap":e.wrap?"true":void 0,children:e.children})}function tt(){return s("li",{className:"syncify-list-divider",role:"presentation"})}function F(e){let t=g(E,{children:[e.leading?s("span",{className:"syncify-row-leading",children:e.leading}):null,g("span",{className:"syncify-row-name",children:[s("span",{className:"syncify-row-name-text",children:e.name}),e.nameMark]}),e.meta?s("span",{className:"syncify-row-meta",children:e.meta}):null,e.end?s("span",{className:"syncify-row-end",children:e.end}):null]}),n=e.meta?"2":"1";return s("li",{className:"syncify-list-item",children:e.onOpen?g("button",{className:"syncify-row",id:e.id,"data-lines":n,type:"button","aria-label":e.openLabel,onClick:e.onOpen,disabled:e.disabled,children:[t,e.external?s(wc,{className:"syncify-row-chevron"}):s(bc,{className:"syncify-row-chevron"})]}):s("div",{className:"syncify-row",id:e.id,"data-lines":n,"data-plain":e.plain?"true":void 0,children:t})})}function we(e){return s("span",{className:"syncify-mark-square","data-tone":e.tone,"data-size":e.icon?"large":"small",role:e.label?"img":void 0,"aria-label":e.label,"aria-hidden":e.label?void 0:"true",children:e.icon})}function xo(e){return s("span",{className:"syncify-badge",role:"img","aria-label":e.label,children:s("span",{className:"syncify-cap",children:e.count})})}function ke(e){let t=K("menu"),[n,i]=h(!1),o=H(null),r=H(null),a=e.items.some(y=>y.checked!==void 0);_(()=>{var k,P;let y=r.current,f=o.current;if(!n||!y||!f)return;tm(y),om(y,f);let S=xc(y);(P=(k=S.find(A=>A.getAttribute("aria-checked")==="true"))!=null?k:S[0])==null||P.focus();let b=()=>i(!1),x=A=>{let C=A.target;C instanceof Node&&!y.contains(C)&&!f.contains(C)&&b()},m=A=>{A.target instanceof Node&&y.contains(A.target)||b()};return document.addEventListener("pointerdown",x,!0),document.addEventListener("scroll",m,!0),window.addEventListener("resize",b),()=>{document.removeEventListener("pointerdown",x,!0),document.removeEventListener("scroll",m,!0),window.removeEventListener("resize",b),nm(y)}},[n]);function c(){var y;i(!1),(y=o.current)==null||y.focus()}function l(y){let f=xc(y.currentTarget),S=f.findIndex(x=>x===document.activeElement),b=y.key==="ArrowDown"?f[(S+1)%f.length]:y.key==="ArrowUp"?f[(S-1+f.length)%f.length]:y.key==="Home"?f[0]:y.key==="End"?f[f.length-1]:null;b?(y.preventDefault(),b.focus()):y.key==="Escape"?(y.preventDefault(),c()):y.key==="Tab"&&i(!1)}function u(y){(y.key==="ArrowDown"||y.key==="ArrowUp")&&(y.preventDefault(),i(!0))}let d={ref:o,type:"button","aria-haspopup":"menu","aria-expanded":n,"aria-controls":n?t:void 0,disabled:e.disabled,onClick:()=>i(!n),onKeyDown:u};return g(E,{children:[e.trigger==="more"?s("button",w(p({className:"syncify-icon-btn","aria-label":e.label},d),{children:s(vc,{})})):g("button",w(p({className:"syncify-menu-value","aria-label":`${e.label}: ${e.trigger.value}`},d),{children:[s("span",{className:"syncify-cap",children:e.trigger.value}),s(kc,{})]})),n?s("div",{className:"syncify-menu",id:t,ref:r,role:"menu","aria-label":e.label,popover:"manual",onKeyDown:l,children:e.items.map(y=>s(em,{item:y,picks:a,onPick:()=>{c(),y.onSelect()}},y.label))}):null]})}function em(e){let{item:t,picks:n}=e;return g("button",{className:"syncify-menu-item",type:"button",role:n?"menuitemradio":"menuitem","aria-checked":n?t.checked===!0:void 0,"data-danger":t.danger?"true":void 0,tabIndex:-1,disabled:t.disabled,onClick:e.onPick,children:[s("span",{className:"syncify-cap",children:t.label}),t.checked?s(Oe,{}):null]})}function xc(e){return[...e.querySelectorAll(".syncify-menu-item:not(:disabled)")]}function tm(e){typeof e.showPopover=="function"&&!e.matches(":popover-open")&&e.showPopover()}function nm(e){typeof e.hidePopover=="function"&&e.matches(":popover-open")&&e.hidePopover()}var im=4;function om(e,t){let n=im,i=t.getBoundingClientRect(),o=e.getBoundingClientRect(),r=i.bottom+n,a=r+o.height>window.innerHeight&&i.top-n-o.height>=0?i.top-n-o.height:r,c=Math.min(Math.max(i.right-o.width,n),window.innerWidth-o.width-n);e.style.top=`${a}px`,e.style.left=`${c}px`}function rm(){return g(E,{children:[s("span",{className:"syncify-dot","aria-hidden":"true"}),s("span",{className:"syncify-visually-hidden",children:", "})]})}function z(e){let t=e.parts.filter(n=>n!=null&&n!==!1&&n!=="");return s("span",{className:bt("syncify-meta",e.className),children:t.map((n,i)=>g(E,{children:[i>0?s(rm,{}):null,s("span",{className:"syncify-meta-part",children:n})]},i))})}function Co(e){let t=Math.min(Math.max(e.used,0),e.max),n=`Used ${e.used} of ${e.max}`;return g("span",{className:"syncify-meter",role:"meter","aria-label":e.label,"aria-valuemin":0,"aria-valuemax":e.max,"aria-valuenow":t,"aria-valuetext":n,"data-full":e.used>=e.max?"true":void 0,children:[s("span",{className:"syncify-cap",children:n}),s("span",{className:"syncify-meter-bars","aria-hidden":"true",children:Array.from({length:e.max},(i,o)=>s("span",{className:"syncify-meter-bar","data-used":o<t?"true":void 0},o))})]})}function Io(e){let t=`${ve(e.used)} of ${ve(e.max)}`,n=e.max>0?Math.min(Math.max(e.used/e.max,0),1):0;return g("span",{className:"syncify-usage",role:"meter","aria-label":"Space used","aria-valuemin":0,"aria-valuemax":e.max,"aria-valuenow":Math.min(e.used,e.max),"aria-valuetext":t,"data-warning":e.warning?"true":void 0,children:[s("span",{className:"syncify-cap",children:"Space used"}),s("span",{className:"syncify-usage-bar","aria-hidden":"true",children:s("span",{className:"syncify-usage-fill",style:{width:`${n*100}%`}})}),s("span",{className:"syncify-cap",children:t})]})}function ve(e){return`${Math.ceil(Math.max(e,0)/1024)} KB`}function O(e){let t=e.tone==="error"?"alert":e.live?"status":void 0;return g("div",{className:"syncify-notice","data-tone":e.tone,role:t,children:[g("span",{className:"syncify-notice-body",children:[e.bare?null:s("span",{className:"syncify-notice-mark",children:s(we,{tone:e.tone})}),s("span",{className:"syncify-notice-text",children:e.children})]}),e.actions?s("span",{className:"syncify-notice-actions",children:e.actions}):null]})}function ce(e){return s("span",{className:"syncify-pip-square","data-kind":e.kind,"aria-hidden":"true"})}function li(e){return g("label",{className:"syncify-radio-row","data-disabled":e.disabled?"true":void 0,children:[s("input",{className:"syncify-radio",type:"radio",name:e.name,checked:e.checked,onChange:()=>e.onChange(),disabled:e.disabled}),s("span",{className:"syncify-radio-label",children:e.label})]})}function Z(e){return g("div",{className:"syncify-section-label",children:[s("h3",{className:"syncify-section-label-title",id:e.id,tabIndex:e.focusable?-1:void 0,children:e.title}),e.end]})}function ne(e){return g("div",{className:"syncify-setting-row",children:[g("span",{className:"syncify-setting-row-text",children:[s("span",{className:"syncify-setting-row-label",children:e.label}),e.value?s("span",{className:"syncify-setting-row-value",children:e.value}):null]}),e.children]})}function an(e){return s("div",{className:"syncify-setting-group",role:"group","aria-label":e.label,children:e.children})}function xe(e){return e.shape==="item"?s("li",{className:"syncify-list-item","aria-hidden":"true",children:g("div",{className:"syncify-row","data-lines":"1",children:[s("span",{className:"syncify-row-leading",children:s("span",{className:"syncify-skeleton","data-width":"pip"})}),s("span",{className:"syncify-row-name",children:s("span",{className:"syncify-skeleton","data-width":"name"})}),g("span",{className:"syncify-row-end",children:[s("span",{className:"syncify-skeleton","data-width":"size"}),s("span",{className:"syncify-skeleton","data-width":"switch"}),s("span",{className:"syncify-skeleton","data-width":"menu"})]})]})}):s("li",{className:"syncify-list-item","aria-hidden":"true",children:g("div",{className:"syncify-row","data-lines":"2",children:[s("span",{className:"syncify-row-name",children:s("span",{className:"syncify-skeleton","data-width":"name"})}),s("span",{className:"syncify-row-meta",children:s("span",{className:"syncify-skeleton","data-width":"meta"})})]})})}function ui(e){return s("input",{className:"syncify-switch-control",type:"checkbox",role:"switch","aria-label":e.label,checked:e.checked,onChange:t=>e.onChange(t.currentTarget.checked),disabled:e.disabled})}function cn(e){let i=e,{label:t}=i,n=ge(i,["label"]);return g("label",{className:"syncify-setting-row","data-disabled":e.disabled?"true":void 0,children:[s("span",{className:"syncify-setting-row-label",children:t}),s(ui,p({},n))]})}var Cc=(e,t)=>`${e}-tab-${t}`,Ic=(e,t)=>`${e}-panel-${t}`;function Ro(e){let t=H(null);_(()=>{var i,o,r;(r=(o=(i=t.current)==null?void 0:i.querySelector('[aria-selected="true"]'))==null?void 0:o.scrollIntoView)==null||r.call(o,{block:"nearest",inline:"nearest"})},[e.selected]);function n(i){var c,l;let o=e.tabs.length,r=e.tabs.findIndex(u=>u.id===e.selected),a=i.key==="ArrowRight"?(r+1)%o:i.key==="ArrowLeft"?(r-1+o)%o:i.key==="Home"?0:i.key==="End"?o-1:null;a!==null&&(i.preventDefault(),e.onSelect(e.tabs[a].id),(l=(c=t.current)==null?void 0:c.querySelectorAll('[role="tab"]')[a])==null||l.focus())}return s("div",{className:"syncify-tabs",role:"tablist","aria-label":e.label,ref:t,onKeyDown:n,children:e.tabs.map(i=>{let o=i.id===e.selected;return g("button",{className:"syncify-tab",id:Cc(e.idBase,i.id),type:"button",role:"tab","aria-selected":o,"aria-controls":Ic(e.idBase,i.id),tabIndex:o?0:-1,onClick:()=>e.onSelect(i.id),children:[s("span",{className:"syncify-cap",children:i.label}),i.status]},i.id)})})}function G(e){return g("div",{className:"syncify-tab-panel",id:Ic(e.idBase,e.id),role:"tabpanel","aria-labelledby":Cc(e.idBase,e.id),children:[s("div",{className:"syncify-tab-scroll",tabIndex:0,children:e.children}),e.actions?s("div",{className:"syncify-tab-actions",children:e.actions}):null]})}function Pe(e){let t=H(e);return Tt(()=>{t.current=e}),t}function q(e){if(e.startsWith("mailto:")){window.location.href=e;return}window.open(e,"_blank","noopener,noreferrer")}function di(e){let t=e.lastIndexOf("@");if(t<1)return e;let n=e.slice(0,t);return n.length<=2?e:`${n[0]}${"*".repeat(n.length-2)}${n[n.length-1]}${e.slice(t)}`}function Eo(e,t=new Date){let n=new Date(e);return n.toDateString()===t.toDateString()?"today":n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===t.getFullYear()?void 0:"numeric"})}function Ec(e){let t=Eo(e);return t==="today"?t:`on ${t}`}function Rc(e){let t=Eo(e);return t==="today"?t:`by ${t}`}function fi(e,t){var i;if(e.status==="final")return{title:e.email?`This backup is secured by ${e.email}`:"This backup is secured",text:t?"You're signed in with a different email. The backups you make here stay yours.":"If that's your email, sign in to see your backups. If it isn't, the backups you make here stay yours."};let n=`${(i=e.email)!=null?i:"Someone"} is securing this backup`;return e.held?{title:n,text:"Syncify is checking who is securing it."}:e.can_cancel?{title:n,text:t?`If that isn't you, press Not me ${Rc(e.final_at)} to stop them.`:`If that's your email, sign in. If it isn't, press Not me ${Rc(e.final_at)} to stop them.`}:{title:n,text:t?"The backups you made here stay yours.":"If that's your email, sign in. If it isn't, the backups you made here stay yours."}}function Nc(e){return e.email?`This backup is no longer secured by ${e.email}`:"This backup is no longer secured"}function yi(e){return e?`Syncify: ${e} won't secure this backup`:"Syncify: this backup won't be secured"}var sm=new Set(["Windows","macOS","Linux"]);function mi(e,t=new Date){let n=Eo(e.first_seen_at,t),i=n==="today"?n:`on ${n}`;return e.device&&sm.has(e.device)?`Did you back up from ${e.device} ${i}?`:`Did you back up with Syncify ${i}?`}var pi="Syncify keeps those backups apart from yours. If they're yours, press That's me to bring them together.",gi="Enter the code from that Syncify",Tc="It's in Settings, in the Syncify that made those backups.";function Pc(e){return e==="approve"?"Syncify: backups brought together":"Syncify: backups kept apart"}function Ac(e,t){var r,a;if(!e)return t?{kind:"other-claim"}:{kind:"unknown"};let{claim:n}=e;if((n==null?void 0:n.status)==="final"){if(!n.mine)return{kind:"other-account"};let c=((r=e.accounts)!=null?r:[]).filter(l=>l.status==="final").length;return{kind:"secured",linkedCount:Math.max(c,1)}}if((n==null?void 0:n.status)==="pending")return n.mine?{kind:"pending",finalAt:n.final_at,held:n.held}:{kind:"other-claim"};let i=((a=e.accounts)!=null?a:[]).filter(c=>c.hash===e.hash),o=i[i.length-1];return(o==null?void 0:o.status)==="unlinked"?{kind:"ended",reason:"undone"}:(o==null?void 0:o.status)==="cancelled"&&o.cancelled_by!=="claimer"?{kind:"ended",reason:o.cancelled_by==="owner"?"owner":"admin"}:{kind:"open"}}function _c(e,t,n){return e?n.kind==="secured"?{kind:"ok",label:"Signed in, backup secured"}:n.kind==="pending"?null:n.kind==="open"?{kind:"warning",label:"Backup not secured yet"}:n.kind==="ended"?{kind:"warning",label:"Backup not secured"}:{kind:"ok",label:"Signed in"}:t?{kind:"warning",label:"Sign in to see your backups"}:null}function Mc(e){return e.held?"Syncify is checking your request to secure this backup":`Your backup will be secured ${Ec(e.finalAt)}`}var ln=6,am=600*1e3,cm=300,lm=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function No(e){return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function Lc(e){let[t,n]=h(()=>In()),[i,o]=h(()=>In().email),[r,a]=h(""),[c,l]=h(!1),[u,d]=h(null),[y,f]=h(()=>Date.now()),S=!!(t.codeSentAt&&y-t.codeSentAt<am),b=Math.max(0,Math.ceil((t.retryAt-y)/1e3)),x=t.retryEmail===null||t.retryEmail===i.trim().toLowerCase()?b:0;_(()=>{if(t.retryAt<=Date.now())return;let C=setInterval(()=>{f(Date.now()),t.retryAt<=Date.now()&&clearInterval(C)},1e3);return()=>clearInterval(C)},[t.retryAt]);function m(C){let I=p(p({},In()),C);Yr(I),n(I),f(Date.now())}async function k(C){var M;let I=C.trim();if(!lm.test(I)){d("Enter a valid email address.");return}l(!0),d(null);try{let T=await qr(I,{nudge:e.nudge});m({email:I,codeSentAt:Date.now(),retryAt:Date.now()+T*1e3,retryEmail:I.toLowerCase()}),a("")}catch(T){let B=T instanceof D?T:null,J=(M=B==null?void 0:B.retryAfter)!=null?M:null,Q=J&&J<=cm?Date.now()+J*1e3:0,R=(B==null?void 0:B.code)==="too_many_requests"?null:I.toLowerCase();if((B==null?void 0:B.code)==="resend_wait"){m({email:I,codeSentAt:t.email===I&&t.codeSentAt?t.codeSentAt:Date.now(),retryAt:Q,retryEmail:R});return}Q&&m({retryAt:Q,retryEmail:R}),d($e(T))}finally{l(!1)}}async function P(){l(!0),d(null);try{let C=await Jr(t.email,r);m({codeSentAt:null}),a(""),e.onSignedIn(C)}catch(C){d($e(C));let I=C instanceof D?C.code:null;(I==="too_many_attempts"||I==="code_expired")&&a("")}finally{l(!1)}}async function A(C){l(!0),d(null),await Zr(),m({email:C,codeSentAt:null}),o(C),l(!1)}return{draft:t,email:i,setEmail:o,code:r,setCode:C=>a(C.replace(/\D/g,"").slice(0,ln)),busy:c,error:u,codeSent:S,waitSeconds:b,emailWaitSeconds:x,requestCode:k,verify:P,signOut:A,useAnotherEmail:()=>{m({codeSentAt:null}),a(""),d(null)}}}function Oc(e){let{signIn:t}=e,{busy:n}=t;return s("form",{className:"syncify-account-form",noValidate:!0,onSubmit:i=>{i.preventDefault(),!n&&(t.codeSent?t.code.length===ln&&t.verify():t.emailWaitSeconds||t.requestCode(t.email))},children:t.codeSent?g(E,{children:[s(be,{label:`Code sent to ${di(t.draft.email)}`,value:t.code,onChange:t.setCode,error:t.error,placeholder:"123456",inputMode:"numeric",autoComplete:"one-time-code",maxLength:ln,mono:!0,autoFocus:!0,action:s(v,{type:"submit",disabled:n||t.code.length!==ln,children:n?"Verifying\u2026":"Verify"})}),g("span",{className:"syncify-account-resend",children:[s(v,{variant:"text",onClick:()=>{t.requestCode(t.draft.email)},disabled:n||t.waitSeconds>0,children:t.waitSeconds>0?`Resend in ${No(t.waitSeconds)}`:"Resend code"}),s(v,{variant:"text",onClick:t.useAnotherEmail,disabled:n,children:"Use another email"})]})]}):s(be,{label:"Email for sign-in codes",type:"email",value:t.email,onChange:t.setEmail,error:t.error,placeholder:"you@example.com",autoComplete:"email",autoFocus:!0,action:s(v,{type:"submit",disabled:n||t.emailWaitSeconds>0||!t.email.trim(),children:n?"Sending\u2026":t.emailWaitSeconds>0?`Send in ${No(t.emailWaitSeconds)}`:"Send code"})})})}var um={owner:"This backup isn't secured. Someone pressed Not me when you tried to secure it.",admin:"This backup isn't secured. Syncify couldn't confirm it's yours.",undone:"This backup is no longer secured by your account."};function Bc(e){let{session:t,secure:n,handle:i}=e,o=Lc({nudge:e.nudge,onSignedIn:e.onSignedIn}),[r,a]=h(null),[c,l]=h(!1),u=Pe(k=>{t&&Xr().then(P=>{!k()||P||(a({kind:"warning",text:$e(new D("signed_out"))}),e.onSignedOut())}).catch(()=>{})}),d=t==null?void 0:t.token;_(()=>{let k=!0;return u.current(()=>k),()=>{k=!1}},[u,d]);let y=Pe(k=>{!t||i!==void 0||jn().then(P=>{var A,C;k()&&e.onHandle((C=(A=P.profile)==null?void 0:A.handle)!=null?C:null)}).catch(()=>{})});_(()=>{let k=!0;return y.current(()=>k),()=>{k=!1}},[y,!!t&&i===void 0]);async function S(){l(!0),a(null);try{q(await Qr())}catch(k){let P=k instanceof D&&k.code==="signed_out";a({kind:P?"warning":"error",text:$e(k)}),P&&e.onSignedOut()}finally{l(!1)}}async function b(){var k;a(null),await o.signOut((k=t==null?void 0:t.email)!=null?k:""),e.onSignedOut()}if(t===void 0)return s(G,{idBase:e.idBase,id:"account",children:null});if(!t)return g(G,{idBase:e.idBase,id:"account",children:[s("p",{className:"syncify-tab-text",children:e.securedElsewhere?"Sign in with the email that secured this backup":"Sign in to secure your backup so only you can restore it"}),r?s(O,{tone:r.kind,live:!0,children:r.text}):null,s(Oc,{signIn:o})]});let x=n.kind==="open"||n.kind==="other-claim"||n.kind==="ended"&&n.reason!=="undone",m=o.busy||c;return g(G,{idBase:e.idBase,id:"account",children:[g(an,{children:[s(ne,{label:"Email for sign-in codes",value:di(t.email)}),i?s(ne,{label:"Creator handle",value:`@${i}`}):null,s(ne,{label:"Your account page",children:s(v,{variant:"secondary",size:"small",onClick:()=>{S()},disabled:m,children:"Open"})}),x?s(ne,{label:"Secure your backup so only you can restore it",children:s(v,{onClick:e.onSecure,disabled:m||e.securing||n.kind==="other-claim",children:e.securing?"Securing\u2026":n.kind==="ended"?"Secure again":"Secure"})}):null]}),n.kind==="ended"?s(O,{tone:"warning",children:um[n.reason]}):null,e.secureError?s(O,{tone:"error",children:e.secureError}):null,r?s(O,{tone:r.kind,live:!0,children:r.text}):null,g("div",{className:"syncify-account-footer",children:[g("span",{className:"syncify-account-status",children:[n.kind==="secured"?s(Oe,{className:"syncify-account-check"}):null,s(z,{parts:dm(n)})]}),s(v,{variant:"text",onClick:()=>{b()},disabled:m,children:"Sign out"})]})]})}function dm(e){switch(e.kind){case"secured":return["This backup is secured",...e.linkedCount>1?[`${e.linkedCount} Spotify accounts linked`]:[]];case"pending":return[Mc(e)];case"other-account":return["This backup is secured with a different email"];default:return["Signed in"]}}var Dc=new WeakMap;function wt(e){let t=Dc.get(e);return t||(t=oe(e.marketplace_data.keys),Dc.set(e,t)),t}function nt(e){return it(e,"item")}function it(e,t){return`${e} ${t}${e===1?"":"s"}`}function kt(e,t=new Date){let n=new Date(e);if(Number.isNaN(n.getTime()))return e;let i=n.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),o=new Date(t);return o.setDate(t.getDate()-1),n.toDateString()===t.toDateString()?`today, ${i}`:n.toDateString()===o.toDateString()?`yesterday, ${i}`:`${n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===t.getFullYear()?void 0:"numeric"})}, ${i}`}function hi(e){return e.length<=1?e.join(""):`${e.slice(0,-1).join(", ")} and ${e[e.length-1]}`}function To(e,t=new Date){let n=new Date(e);if(Number.isNaN(n.getTime()))return"";let i=new Date(t);return i.setDate(t.getDate()-1),n.toDateString()===t.toDateString()?"today":n.toDateString()===i.toDateString()?"yesterday":n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===t.getFullYear()?void 0:"numeric"})}function $c(e,t,n){var l,u;let i=kt(e.metadata.last_sync_datetime),o=nt(wt(e).length),r=`from ${e.metadata.device_info}`,a=(u=(l=e.backup)==null?void 0:l.name)!=null?u:null,c=e.payload_hash===n;return t==="safety-copy"?{backup:e,kind:t,name:"Safety copy",meta:[a,i,o,"updated weekly"].filter(Uc),current:c,title:`the safety copy from ${i}`}:t==="pinned"?{backup:e,kind:t,name:"Pinned",meta:[a,i,o,r].filter(Uc),current:c,title:a!=null?a:`the backup pinned ${i}`}:t==="unapproved"?{backup:e,kind:t,name:"Unconfirmed",meta:[i,o,r],current:c,title:i}:{backup:e,kind:t,name:a!=null?a:i.charAt(0).toUpperCase()+i.slice(1),meta:a?[i,o,r]:[o,r],current:c,title:a!=null?a:i}}function Uc(e){return e!==null}var Hc={extension:"extension",theme:"theme",snippet:"snippet"},fm={extension:"extension",custom_app:"app",theme:"theme"},ym={extension:"extension",custom_app:"custom app",theme:"theme"};function Si(e){let{changes:t}=e,[n,i]=h(!1);return g(Y,{label:e.label,children:[t.changes.map(o=>s(mm,{change:o,includeLabel:e.includeLabel(o.name),onInclude:r=>e.onInclude(o.key,r),disabled:e.disabled},o.key)),t.manual.map(o=>s(F,{leading:s(ce,{kind:fm[o.type]}),name:o.name,meta:s(z,{parts:[ym[o.type],o.scheme]}),end:s("span",{className:"syncify-change-label syncify-cap",children:"Add manually"})},`${o.type}:${o.name}`)),t.settings.length>0?s(tt,{}):null,t.settings.map(o=>s(F,{leading:s(ce,{kind:o.kind}),name:o.name,end:s("span",{className:"syncify-change-label syncify-cap","data-change":"Updates",children:"Updates"})},`settings:${o.id}`)),t.settings.length>0&&t.unchanged.length>0?s(tt,{}):null,t.unchanged.length>0?s(F,{name:g("span",{className:"syncify-change-fold",children:[t.unchanged.length," more stay the same"]}),end:s(v,{variant:"subtle","aria-expanded":n,onClick:()=>i(!n),children:n?"Hide":"Show"})}):null,n?t.unchanged.map(o=>s(pm,{item:o},o.key)):null]})}function mm(e){let{change:t}=e;return s(F,{leading:s(ce,{kind:Hc[t.type]}),name:t.name,meta:t.note?s(z,{parts:[t.note]}):void 0,end:g(E,{children:[s("span",{className:"syncify-change-label syncify-cap","data-change":t.fixed?void 0:t.change,children:t.fixed?"Stays off":t.change}),t.optional&&!t.fixed?s(So,{checked:t.included,onChange:e.onInclude,label:e.includeLabel,disabled:e.disabled}):null]})})}function pm(e){return s(F,{leading:s(ce,{kind:Hc[e.item.type]}),name:e.item.name,meta:e.item.note?s(z,{parts:[e.item.note]}):void 0})}var Kc={Adds:0,Updates:1,Removes:2},gm=["blocked","host","repo","catalog","unchecked"];function bi(e,t,n){var u,d,y;let{optional:i,allowed:o}=n,r=(u=n.fixed)!=null?u:new Set,a=[],c=[];for(let f of e.items){let S=t.get(f.key),b=i.has(f.key)||r.has(f.key),x={key:f.key,name:f.name,type:f.type,note:S?Po(S):r.has(f.key)?"Not in Marketplace's list":n.unapproved&&b?"Unconfirmed":null},m=f.change==="added"?"Adds":f.change==="removed"?"Removes":f.isNew?"Updates":null;if(m){let k=r.has(f.key);a.push(w(p({},x),{change:m,optional:b,fixed:k,included:!b||!k&&o.has(f.key)}))}else c.push(x)}a.sort((f,S)=>Kc[f.change]-Kc[S.change]);let l=(d=n.settings)!=null?d:[];return{changes:a,settings:l,unchanged:c,manual:e.manual,warnings:[...hm(a,t,(y=n.verb)!=null?y:"Restore"),...Sm(a)],count:a.filter(f=>f.included).length+l.length}}function wi(e,t){return t===0?e:t===1?`${e} 1 change`:`${e} ${t} changes`}function Po(e){switch(e.kind){case"host":return`Code from ${e.host}`;case"repo":return`Code from ${e.repo}`;case"blocked":return"Blocked by Marketplace";case"catalog":return"Not in Marketplace";case"unchecked":return"Not checked";case"custom":return"Custom"}}function hm(e,t,n){var o;let i=new Map;for(let r of e){if(r.change==="Removes"||r.fixed)continue;let a=t.get(r.key);!a||!ft(a)&&a.kind!=="unchecked"||i.set(a.kind,[...(o=i.get(a.kind))!=null?o:[],r.name])}return gm.flatMap(r=>{let a=i.get(r);return a?[bm(r,a,n)]:[]})}function Sm(e){let t=e.filter(n=>n.fixed).map(n=>n.name);return t.length===0?[]:[t.length===1?`${hi(t)} isn't in Marketplace's list anymore, so it stays off.`:`${hi(t)} aren't in Marketplace's list anymore, so they stay off.`]}function bm(e,t,n){let i=t.length===1,o=hi(t),r=i?`${n} it only if you trust it.`:`${n} them only if you trust them.`;switch(e){case"blocked":return`${o} ${i?"is":"are"} on Marketplace's block list. ${r}`;case"host":return`${o} ${i?"loads from a site":"load from sites"} outside GitHub. ${r}`;case"repo":return i?`${o} loads its code from a different repo than the one it names. ${r}`:`${o} load their code from different repos than the ones they name. ${r}`;case"catalog":return`${o} ${i?"isn't":"aren't"} in Marketplace's catalog. ${r}`;default:return`GitHub couldn't be reached to check ${o}. ${r}`}}function zc(e){return e.map(t=>w(p({},t),{name:`${t.name} settings`})).sort((t,n)=>t.name.localeCompare(n.name))}function Fc(e,t,n){let[i,o]=h(()=>new Set),[r,a]=h(null),c=X(()=>On(wt(e),e.spicetify_config,t,n),[e,t,n]),l=X(()=>yt(c.items),[c]);_(()=>{let C=!0;return mt(c.items,l).then(I=>{C&&a({for:e,checks:I})}),()=>{C=!1}},[e,c,l]);let[u,d]=h(null);_(()=>{let C=!0;return gs(e.extension_settings).catch(()=>[]).then(I=>{C&&d({for:e,items:I})}),()=>{C=!1}},[e]);let y=(r==null?void 0:r.for)===e?r.checks:null,f=X(()=>new Map([...y!=null?y:[],...l]),[y,l]),S=Nn(e),b=X(()=>new Set(c.items.filter(C=>{var I;return C.change!=="removed"&&C.isNew&&(S||ft(f.get(C.key))||((I=f.get(C.key))==null?void 0:I.kind)==="unchecked")}).map(C=>C.key)),[c,f,S]),x=X(()=>[...b].filter(C=>!i.has(C)),[b,i]),m=(u==null?void 0:u.for)===e?u.items:null,k=X(()=>zc(m!=null?m:[]).filter(C=>!x.includes(C.key)),[m,x]),P=X(()=>bi(c,f,{optional:b,allowed:i,unapproved:S,settings:k.map(({id:C,name:I,kind:M})=>({id:C,name:I,kind:M}))}),[c,f,b,i,S,k]);function A(C,I){let M=new Set(i);I?M.add(C):M.delete(C),o(M)}return{preview:c,changes:P,unapproved:S,checking:y===null||m===null,skipped:x,settingsIds:P.settings.map(C=>C.id),allow:A}}function jc(e){let{row:t,local:n}=e,i=K("restore-heading"),o=Fc(t.backup,n.items,n.spicetifyConfig),{changes:r}=o,a=!n.marketplaceAvailable,c=e.canShareSettings&&o.settingsIds.length>0;_(()=>{var u;(u=document.getElementById(i))==null||u.focus()},[i]);let l=g(E,{children:[s(v,{variant:"secondary",onClick:e.onCancel,disabled:e.restoring,children:"Cancel"}),s(v,{onClick:()=>e.onRestore({row:t,skipped:o.skipped,manual:o.preview.manual,settings:{ids:o.settingsIds,share:c&&e.shareSettings}}),disabled:e.busy||o.checking||a,children:e.restoring?"Restoring\u2026":o.checking?"Checking\u2026":wi("Restore",r.count)})]});return g(G,{idBase:e.idBase,id:"backups",actions:l,children:[s(Z,{title:`Restore ${t.title}`,id:i,focusable:!0}),a?s(O,{tone:"warning",children:"Install Spicetify Marketplace to restore a backup."}):null,o.unapproved?s(O,{tone:"warning",children:"An install this Spotify account hasn't approved made this backup. Its items stay off unless you turn them on."}):null,s(Si,{changes:r,label:"What this restore changes",includeLabel:u=>`Restore ${u}`,onInclude:o.allow,disabled:e.busy}),r.warnings.map(u=>s(O,{tone:"warning",children:u},u)),e.localIsUnsaved?s(O,{tone:"warning",children:"Your current setup isn't backed up."}):null,c?s(bo,{label:"Use these extension settings on my other devices too",checked:e.shareSettings,onChange:e.onShareSettingsChange,disabled:e.busy}):null]})}var Wc="Other backups on your Spotify username";function Yc(e){var C,I,M,T,B,J,Q;let{remote:t,local:n}=e,i=K("backup"),[o,r]=h(null),[a,c]=h(null),l=H(null);if(_(()=>{var R;a||!l.current||((R=document.getElementById(l.current))==null||R.focus(),l.current=null)},[a]),a&&n)return s(jc,{idBase:e.idBase,row:a,local:n,localIsUnsaved:n.installedItemCount>0&&!wm(n.hash,t),canShareSettings:e.canShareSettings,shareSettings:e.shareSettings,onShareSettingsChange:e.onShareSettingsChange,busy:e.busy,restoring:e.restoring,onCancel:()=>c(null),onRestore:R=>{var L;return e.onRestore(w(p({},R),{linkedHash:(L=o==null?void 0:o.hash)!=null?L:null}))}},a.backup.payload_hash);async function u(R){if(!R){r(null);return}r({hash:R,remote:null});try{let L=await Qe(e.config,R);r({hash:R,remote:L})}catch(L){r(null),e.onError(L)}}let d=o?o.remote:t,y=(C=n==null?void 0:n.hash)!=null?C:null,f=R=>{var L,fe;return(fe=(L=R.backup.backup)==null?void 0:L.id)!=null?fe:`${R.kind}-${R.backup.payload_hash}-${R.backup.metadata.last_sync_datetime}`},S=R=>`${i}-${f(R)}`,b=(R,L)=>R.map(fe=>$c(fe,L,y)),x=b((I=d==null?void 0:d.backups)!=null?I:[],"backup"),m=b((M=d==null?void 0:d.pinned)!=null?M:[],"pinned"),k=b(d!=null&&d.safetyCopy?[d.safetyCopy]:[],"safety-copy"),P=o?[]:[...b((T=t==null?void 0:t.others)!=null?T:[],"other"),...b((B=t==null?void 0:t.unapproved)!=null?B:[],"unapproved")];function A(R){var L;return s(F,{id:S(R),name:R.name,nameMark:R.kind==="safety-copy"?g(E,{children:[s(wo,{className:"syncify-safety-mark"}),(L=R.backup.backup)!=null&&L.safety_copy?s(ci,{className:"syncify-safety-mark"}):null]}):R.kind==="pinned"?s(ci,{className:"syncify-safety-mark"}):R.kind==="unapproved"?s(we,{tone:"warning"}):void 0,meta:s(z,{parts:R.meta}),end:R.current?s("span",{className:"syncify-row-status syncify-cap",children:"Current"}):void 0,onOpen:R.current?void 0:()=>{l.current=S(R),c(R)},openLabel:`Preview restore of ${R.title}`,disabled:e.busy},f(R))}return g(G,{idBase:e.idBase,id:"backups",children:[e.notices,n&&!n.marketplaceAvailable?s(O,{tone:"warning",children:"Install Spicetify Marketplace to restore a backup."}):null,e.otherAccounts.length>0?s(ne,{label:"Show backups from",children:s(ke,{label:"Show backups from",trigger:{value:(Q=(J=e.otherAccounts.find(R=>R.hash===(o==null?void 0:o.hash)))==null?void 0:J.label)!=null?Q:"This Spotify account"},items:[{hash:null,label:"This Spotify account"},...e.otherAccounts].map(R=>{var L;return{label:R.label,checked:((L=o==null?void 0:o.hash)!=null?L:null)===R.hash,onSelect:()=>{u(R.hash)}}}),disabled:e.busy})}):null,(!t||!n)&&e.failed?null:!t||!n||o&&!o.remote?g(Y,{label:"Loading backups",children:[s(xe,{}),s(xe,{})]}):x.length+m.length+k.length+P.length===0?o?s("p",{className:"syncify-tab-text",children:"No backups yet."}):null:g(E,{children:[x.length+m.length+k.length>0?g(Y,{label:"Backups",children:[x.map(A),m.length>0&&x.length>0?s(tt,{}):null,m.map(A),k.length>0&&x.length+m.length>0?s(tt,{}):null,k.map(A)]}):null,P.length>0?g(E,{children:[s(Z,{title:Wc}),s(Y,{label:Wc,children:P.map(A)})]}):null]})]})}function wm(e,t){return t?[...t.backups,...t.safetyCopy?[t.safetyCopy]:[]].some(n=>n.payload_hash===e):!1}function Vc(e){let t=K("first-sync"),[n,i]=h(()=>Object.fromEntries(e.choices.map(d=>[d.id,d.localAt>d.accountAt?"here":"account"]))),[o,r]=h(!1),[a,c]=h(null),l=d=>{var y;return(y=n[d.id])!=null?y:d.localAt>d.accountAt?"here":"account"};async function u(){r(!0),c(null);try{await $a(Object.fromEntries(e.choices.map(d=>[d.id,l(d)]))),e.onClose()}catch(d){c(d instanceof Error?d.message:String(d))}finally{r(!1)}}return g(et,{open:e.open,wide:!0,onClose:e.onClose,title:"Which extension settings do you want to keep?",actions:g(E,{children:[s(v,{variant:"secondary",onClick:e.onClose,disabled:o,children:"Ask me later"}),s(v,{onClick:()=>{u()},disabled:o,children:"Keep these"})]}),children:[s("p",{children:"These items have different settings in this Spotify than on your other devices. Choose the settings to keep for each item. All your devices will then use them."}),s(Y,{wrap:!0,children:e.choices.map(d=>s(F,{leading:s(ce,{kind:d.kind}),name:d.name,end:g("span",{className:"syncify-first-sync-picks",role:"radiogroup","aria-label":d.name,children:[s(li,{name:`${t}-${d.id}`,label:`This Spotify, ${To(d.localAt)}`,checked:l(d)==="here",onChange:()=>i(y=>w(p({},y),{[d.id]:"here"})),disabled:o}),s(li,{name:`${t}-${d.id}`,label:`Other devices, ${To(d.accountAt)}`,checked:l(d)==="account",onChange:()=>i(y=>w(p({},y),{[d.id]:"account"})),disabled:o})]})},d.id))}),a?s(O,{tone:"error",children:a}):null]})}var km="0123456789ABCDEFGHJKMNPQRSTVWXYZ";async function Gc(e){let t=new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(e))),n=(t[0]<<24|t[1]<<16|t[2]<<8|t[3])>>>2,i="";for(let o=5;o>=0;o--)i+=km[n>>>o*5&31];return i}function qc(e){return`${e.slice(0,3)} ${e.slice(3)}`}function Jc(e){return e.toUpperCase().replace(/[\s-]/g,"")}function ot(e,t){return e.items.filter(n=>n.hold!==null&&!t.includes(n.id))}function Xc(e,t){let{hold:n}=e;if(n.reason==="account_full")return`${e.name} is held because your extension settings are over ${ve(t)}. Your other devices keep the last copy that fit. To sync it again, turn off an item or delete a synced copy in Items.`;let i=`${ve(n.size)} of its ${ve(e.limit)}`;return e.list?`${e.name}'s list is too big to sync, ${i}. Your other devices keep the last list that fit. It syncs again once the list is smaller.`:`${e.name}'s extension settings are too big to sync, ${i}. Your other devices keep the last copy that fit. They sync again once they're smaller.`}function Zc(e){return e.hold?`${ve(e.hold.size)}, too big to sync`:ve(e.size)}function Qc(e,t){let n=ot(e,t).filter(i=>i.hold.reason==="account_full");return{used:e.bytes+n.reduce((i,o)=>i+Math.max(o.hold.size-o.accountSize,0),0),over:n.length>0}}function el(e,t){let n=e.items,i=n.filter(r=>t.includes(r.id)).length,o=ot(e,t).length;return{syncing:n.length-i-o,held:o,off:i}}function vm(){return`${U().webUrl.replace(/\/+$/,"")}/supported`}var xm=4;function tl(e){let{config:t,status:n}=e,i=K("extension-settings"),o=H(null),r=ot(n,t.settingsSyncOff),a=e.secured&&t.settingsSyncEnabled&&r.length>0,c=H(a);return _(()=>{var l;c.current&&((l=o.current)==null||l.scrollIntoView({block:"start"}))},[]),g("div",{className:"syncify-sync-section","data-place":"settings",ref:o,role:"group","aria-labelledby":i,children:[s(Z,{title:"Extension settings",id:i}),e.secured?g(E,{children:[s(cn,{label:"Syncing on this device",checked:t.settingsSyncEnabled,onChange:e.onEnabledChange,disabled:e.disabled}),t.settingsSyncEnabled?g(E,{children:[s(nl,{status:n,off:t.settingsSyncOff}),s(il,{items:r,accountLimit:n.limit})]}):null]}):s(O,{tone:"info",bare:!0,actions:s(v,{size:"small",onClick:e.onSecure,disabled:e.securing,children:e.securing?"Securing\u2026":"Secure"}),children:"Secure your backup to sync extension settings between your devices."}),g(Y,{children:[e.secured&&t.settingsSyncEnabled?n.items.length===0?s(F,{name:"None of your items have settings Syncify can sync",plain:!0}):s(F,{name:"Items",meta:s(Cm,{status:n,off:t.settingsSyncOff}),onOpen:e.onOpenItems}):null,s(F,{name:"Supported extensions",external:!0,onOpen:()=>q(vm())})]})]})}function Cm(e){let t=el(e.status,e.off);return s(z,{parts:[t.syncing>0&&`${t.syncing} syncing`,t.held>0&&g("span",{className:"syncify-sync-warning",children:[t.held," too big to sync"]}),t.off>0&&`${t.off} off`]})}function nl(e){let{used:t,over:n}=Qc(e.status,e.off);return s(Io,{used:t,max:e.status.limit,warning:n})}function il(e){return s(E,{children:e.items.map(t=>s(O,{tone:"warning",children:Xc(t,e.accountLimit)},t.id))})}function ol(e){let{config:t,status:n}=e,i=K("items"),[o,r]=h(null),[a,c]=h([]),l=H({ids:[],names:new Map});_(()=>{var S;let f=!0;return Ka().catch(()=>n.items).then(b=>{f&&r(b)}),(S=document.getElementById(i))==null||S.focus(),()=>{f=!1}},[]);let u=H(e.onDeleted);_(()=>{u.current=e.onDeleted}),_(()=>()=>{let{ids:f,names:S}=l.current;f.length!==0&&Promise.all(f.map(b=>Ha(j(),b).catch(x=>{var k;let m=x instanceof Error?x.message:String(x);Spicetify.showNotification(`Syncify couldn't delete the synced copy of ${(k=S.get(b))!=null?k:b}. ${m}`,!0,6e3)}))).then(()=>u.current())},[]);function d(f,S){let b=S?[...a,f.id]:a.filter(x=>x!==f.id);l.current.names.set(f.id,f.name),l.current.ids=b,c(b)}let y=ot(w(p({},n),{items:o!=null?o:n.items}),t.settingsSyncOff);return g("div",{className:"syncify-sync-section",children:[s(Z,{title:"Items",id:i,focusable:!0,end:s(v,{variant:"subtle",onClick:e.onBack,children:"Back to settings"})}),s(nl,{status:n,off:t.settingsSyncOff}),s(il,{items:y,accountLimit:n.limit}),s(Y,{label:"Items",busy:o===null,wrap:!0,children:o===null?Array.from({length:xm},(f,S)=>s(xe,{shape:"item"},S)):o.map(f=>s(Im,{item:f,on:!t.settingsSyncOff.includes(f.id),deleted:a.includes(f.id),onChange:S=>e.onItemChange(f.id,S),onDelete:S=>d(f,S)},f.id))})]})}function Im(e){let{item:t}=e;return s(F,{leading:s(ce,{kind:t.kind}),name:t.name,end:e.deleted?g(E,{children:[s("span",{className:"syncify-sync-size",children:"Synced copy deleted"}),s(v,{variant:"text",onClick:()=>e.onDelete(!1),children:"Undo"})]}):g(E,{children:[s("span",{className:"syncify-sync-size","data-tone":t.hold&&e.on?"warning":void 0,children:e.on?Zc(t):ve(t.size)}),s(ui,{label:`Sync ${t.name}`,checked:e.on,onChange:e.onChange}),s(ke,{trigger:"more",label:`More for ${t.name}`,items:[{label:"Delete synced copy",danger:!0,onSelect:()=>e.onDelete(!0)}]})]})})}function rl(e,t){let[n,i]=h(!1),[o,r]=h(null),a=Pe(t);return _(()=>{if(!n)return;let c=l=>{var d;if(!((d=document.getElementById(e))!=null&&d.isConnected)){i(!1),r(null);return}l.preventDefault(),l.stopImmediatePropagation();let u=pa(l);if(u.kind!=="ignore"){if(u.kind==="cancel"){i(!1),r(null);return}if(u.kind==="error"){r(u.message);return}if(ga(u.shortcut)){r(`${Vt(u.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}i(!1),a.current(u.shortcut)}};return window.addEventListener("keydown",c,!0),()=>window.removeEventListener("keydown",c,!0)},[n,e,a]),{recording:n,error:o,clearError:()=>r(null),toggle:()=>{r(null),i(!n)}}}var sl=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function Rm(){let[e,t]=h(null);return _(()=>{let n=!0;return Rn().then(i=>i?Gc(i.publicKey):null).then(i=>{n&&t(i)}).catch(()=>{}),()=>{n=!1}},[]),e}function al(e){var b,x;let{config:t}=e,[n,i]=h("settings"),[o]=h(()=>Vn()),r=K("shortcut"),a=rl(r,f),c=Rm(),l=o?t.entryPoint:"topbar",u=a.recording?"Press keys":t.shortcut?Vt(t.shortcut):"Off";function d(m){Ze(m),e.onConfigChange(m)}function y(m,k){let P=j().settingsSyncOff.filter(A=>A!==m);d(w(p({},t),{settingsSyncOff:k?P:[...P,m]}))}if(n==="items")return s(G,{idBase:e.idBase,id:"settings",children:s(ol,{config:t,status:e.syncStatus,onItemChange:y,onBack:()=>i("settings"),onDeleted:()=>e.onConfigChange(j())})});function f(m){d(w(p({},t),{shortcut:m})),ro(m),a.clearError()}function S(m){d(w(p({},t),{entryPoint:m})),Gn(m)}return g(G,{idBase:e.idBase,id:"settings",children:[g(an,{children:[s(cn,{label:"Automatic backup when Spotify starts",checked:t.autoBackupEnabled&&!e.unsupported,onChange:m=>d(w(p({},t),{autoBackupEnabled:m})),disabled:e.busy||e.unsupported}),s(ne,{label:"Open Syncify from",children:s(ke,{label:"Open Syncify from",trigger:{value:(x=(b=sl.find(m=>m.value===l))==null?void 0:b.label)!=null?x:""},items:sl.map(m=>({label:m.label,checked:m.value===l,onSelect:()=>S(m.value)})),disabled:!o})}),s(ne,{label:"Keyboard shortcut",value:a.recording&&!a.error?"Press a key combination, or Esc to cancel":void 0,children:g("span",{className:"syncify-settings-shortcut",children:[a.recording?null:t.shortcut?s(v,{variant:"subtle",onClick:()=>f(null),children:"Turn off"}):s(v,{variant:"subtle",onClick:()=>f(gt),children:"Use default"}),s(vo,{id:r,keys:u,recording:a.recording,"aria-label":a.recording?`${u} for a new keyboard shortcut`:`${u}, change the keyboard shortcut`,onClick:a.toggle})]})}),c?s(ne,{label:"Code to confirm this Syncify is yours",children:s("span",{className:"syncify-settings-code",children:qc(c)})}):null]}),a.error?s(O,{tone:"warning",live:!0,children:a.error}):null,o?t.entryPoint==="menu"&&!t.shortcut?s(O,{tone:"warning",children:"Keep a shortcut in case a Spotify update breaks the profile menu."}):null:s(O,{tone:"info",children:"The profile menu isn't available in this Spicetify version."}),s(tl,{config:t,status:e.syncStatus,secured:e.secured,securing:e.securing,onSecure:e.onSecure,onEnabledChange:m=>d(w(p({},t),{settingsSyncEnabled:m,settingsSyncOff:j().settingsSyncOff})),onOpenItems:()=>i("items"),disabled:e.busy})]})}function cl(){let[e,t]=h(()=>Ne());return _(()=>ni(t),[]),e}function un(e){let t=`${U().webUrl.replace(/\/+$/,"")}/discover`;return e?`${t}?post=${encodeURIComponent(e)}`:t}function vt(e){var t;return(t=e.name)!=null?t:Ee(e.code)}function ll(e){return[`Used by ${e.imports}`,...e.posted?["On Discover"]:[]]}function ul(e){let t=e.posted?"The code stops working and its Discover post comes down.":"The code stops working.";return e.imports===0?t:`${t} ${e.imports===1?"1 person":`${e.imports} people`} used it.`}var ki=12;function dl(e){return[...Array(Math.min(e.extensions,ki)).fill("extension"),...Array(Math.min(e.themes,ki)).fill("theme"),...Array(Math.min(e.snippets,ki)).fill("snippet")].slice(0,ki)}var Em={extension:"extension",theme:"theme",snippet:"snippet"};function fl(e){var l,u;let{compose:t}=e,n=K("compose-heading"),i=(u=(l=t.compose)==null?void 0:l.code)!=null?u:null,{draft:o,saving:r}=t;_(()=>{var d;(d=document.getElementById(n))==null||d.focus()},[n]);let a=o?[...o.items].sort((d,y)=>Number(o.leftOut.has(y.key))-Number(o.leftOut.has(d.key))||d.name.localeCompare(y.name)):[],c=g(E,{children:[s(v,{variant:"secondary",onClick:t.cancel,disabled:r,children:"Cancel"}),s(v,{onClick:()=>{t.save()},disabled:!o||t.included.length===0||r,children:o?r?i?"Updating\u2026":"Creating\u2026":i?"Update code":"Create code":"Checking\u2026"})]});return g(G,{idBase:e.idBase,id:"share",actions:c,children:[s(Z,{title:i?`Update ${vt(i)}`:"Create a code",id:n,focusable:!0}),t.error?s(O,{tone:"error",children:t.error}):null,s(be,{label:"Setup name (optional)",value:t.name,onChange:t.setName,maxLength:Ws,disabled:r}),t.askHandle?s(be,{label:"Pick a handle for your profile",value:t.handle,onChange:t.setHandle,onBlur:t.checkHandle,error:t.handleError,prefix:"@",maxLength:Zi,disabled:r}):null,o&&t.included.length===0?s(O,{tone:"warning",children:"Nothing here can go in a code. Add something from Marketplace first."}):null,s(Z,{title:"What goes in",end:o?s(z,{parts:[nt(t.included.length)]}):void 0}),o?s(Y,{label:"What goes in",children:a.map(d=>{let y=o.leftOut.get(d.key),f=[y?Po(y):null,d.repo].filter(Boolean);return s(F,{leading:s(ce,{kind:Em[d.type]}),name:d.name,meta:f.length>0?s(z,{parts:f}):void 0,end:y?s("span",{className:"syncify-change-label syncify-cap",children:"Left out"}):void 0},d.key)})}):g(Y,{label:"Checking your items",children:[s(xe,{}),s(xe,{})]})]})}var yl=[["add","Add to my setup"],["replace","Replace my setup"]];function ml(e){var c,l,u,d;let{load:t}=e,n=K("share-heading"),i=(c=t.shared)==null?void 0:c.file;if(_(()=>{var y;(y=document.getElementById(n))==null||y.focus()},[n]),!i||!t.changes)return null;let o=e.marketplaceAvailable===!1,r=i.creator,a=g(E,{children:[s(v,{variant:"secondary",onClick:t.close,disabled:t.applying,children:"Cancel"}),s(v,{onClick:()=>{t.apply()},disabled:t.applying||t.checking||e.busy||o,children:t.applying?"Loading\u2026":t.checking?"Checking\u2026":wi("Load",t.changes.count)})]});return g(G,{idBase:e.idBase,id:"share",actions:a,children:[s(Z,{title:`Load ${(l=i.name)!=null?l:Ee(i.code)}`,id:n,focusable:!0,end:r?s(v,{variant:"text",onClick:()=>q(ta(r)),children:`by @${r}`}):void 0}),t.applyError?s(O,{tone:"error",children:t.applyError}):null,o?s(O,{tone:"warning",children:"Install Spicetify Marketplace to load a setup."}):null,s(ne,{label:"How to load it",children:s(ke,{label:"How to load it",trigger:{value:(d=(u=yl.find(([y])=>y===t.mode))==null?void 0:u[1])!=null?d:""},items:yl.map(([y,f])=>({label:f,checked:t.mode===y,onSelect:()=>t.setMode(y)})),disabled:t.applying})}),s(Si,{changes:t.changes,label:"What loading it changes",includeLabel:y=>`Load ${y}`,onInclude:t.allow,disabled:t.applying}),t.theme?s(O,{tone:"info",children:`Your theme switches to ${t.theme.name}.`}):null,t.changes.warnings.map(y=>s(O,{tone:"warning",children:y},y))]})}function pl(e){let[t,n]=h(null),[i,o]=h(null),[r,a]=h(""),[c,l]=h(""),[u,d]=h(!1),[y,f]=h(!1),[S,b]=h(null),[x,m]=h(null),k=H(0),[P,A]=h(e.token);P!==e.token&&(A(e.token),n(null),o(null),m(null));let C=t!==null&&t.code===null&&!e.hasHandle,I=C&&u?Qi(c):null,M=i?i.items.filter(R=>!i.leftOut.has(R.key)):[];async function T(R){var fe,st;let L=++k.current;n({code:R}),a((fe=R==null?void 0:R.name)!=null?fe:""),l((st=e.suggestedHandle)!=null?st:""),d(!1),o(null),b(null),m(null);try{let le=await Se(),Ct=await qs(oe(le),le);L===k.current&&o(p({keys:le},Ct))}catch(le){if(L!==k.current)return;n(null),b(le instanceof Error?le.message:String(le))}}function B(){k.current+=1,n(null),o(null)}function J(){n(null),o(null)}async function Q(){if(!t||!i)return;if(C&&Qi(c)){d(!0);return}f(!0),b(null);let R=Js(i.keys,M);try{let L=t.code?await na(t.code.code,r.trim(),R):await ea(r.trim(),R,C?c.trim():void 0);m(w(p({},L),{outcome:t.code?"updated":"created"})),J(),await e.reload()}catch(L){if(L instanceof D&&L.code==="same_setup"&&L.share){m(w(p({},L.share),{leftOut:0,outcome:"existing"})),J();return}e.fail(L,b),L instanceof D&&L.code==="publish_failed"&&(n(null),e.reload())}finally{f(!1)}}return{compose:t,draft:i,included:M,name:r,setName:a,askHandle:C,handle:c,setHandle:R=>l(R.replace(/^@/,"")),checkHandle:()=>d(!0),handleError:I,saving:y,error:S,saved:x,dismissSaved:()=>m(null),forgetSaved:R=>m(L=>(L==null?void 0:L.code)===R?null:L),start:T,cancel:B,save:Q}}function gl(e){var I;let[t,n]=h(null),[i,o]=h(null),[r,a]=h(null),[c,l]=h(null),[u,d]=h(0),y=H(!1),[f,S]=h(null),[b,x]=h(!1);function m(M,T){T(Yt(M,i)),M instanceof D&&M.code==="signed_out"&&e.onSignedOut()}async function k(){var M,T;S(null);try{let B=await jn();n(B.codes),y.current||(y.current=!0,d(B.newHearts)),e.onCodeCount(B.codes.length),o(B.max),a(B.profile),e.onHandle((T=(M=B.profile)==null?void 0:M.handle)!=null?T:null),l(B.suggestedHandle)}catch(B){m(B,S)}}async function P(M){x(!0),S(null);try{return await ia(M),await k(),!0}catch(T){return m(T,S),!1}finally{x(!1)}}let A=Pe(M=>{n(null),y.current=!1,M&&k()}),C=(I=e.session)==null?void 0:I.token;return _(()=>A.current(C!==void 0),[A,C]),{codes:t,max:i,atMax:t!==null&&i!==null&&t.length>=i,profile:r,suggestedHandle:c,newHearts:u,error:f,deleting:b,load:k,remove:P,fail:m}}function hl(e){let[t,n]=h(""),[i,o]=h(null),[r,a]=h(null),[c,l]=h(null),[u,d]=h(null),[y,f]=h("add"),[S,b]=h(()=>new Set),[x,m]=h(null),[k,P]=h(void 0),[A,C]=h(!1),I=X(()=>u?Xs(u.file,u.items,e.localItems,e.localConfig,e.localTheme,y):null,[u,e.localItems,e.localConfig,e.localTheme,y]),M=X(()=>{if(!I||!u)return null;let W=new Set(u.items.map($=>$.key));return I.items.filter($=>$.change!=="removed"&&W.has($.key)&&(y==="replace"||$.isNew))},[I,u,y]),T=X(()=>M?yt(M):null,[M]),B=x&&x.for===M?x.checks:null,J=X(()=>new Map([...B!=null?B:[],...T!=null?T:[]]),[B,T]),Q=X(()=>I&&k!==void 0?Zs(I,k):new Set,[I,k]),R=X(()=>{var W;return new Set(((W=I==null?void 0:I.items)!=null?W:[]).filter($=>{var ie;return $.change!=="removed"&&$.isNew&&(ft(J.get($.key))||((ie=J.get($.key))==null?void 0:ie.kind)==="unchecked")}).map($=>$.key))},[I,J]),L=X(()=>I?bi(I,J,{optional:R,allowed:S,fixed:Q,verb:"Load"}):null,[I,J,R,S,Q]),fe=I!=null&&I.theme&&!Q.has(I.theme.key)&&(!R.has(I.theme.key)||S.has(I.theme.key))?I.theme:null,st=I!==null&&(B===null||k===void 0);_(()=>{if(!M||!T)return;let W=!0;return mt(M,T).then($=>{W&&m({for:M,checks:$})}),()=>{W=!1}},[M,T]);async function le(W){let $=W!=null?W:Vs(t);if(a(null),l(null),d(null),!$){a(Yt(new D("no_code")));return}o({code:$,pick:W!==void 0});try{let ie=await oa($);f("add"),b(new Set),d({file:ie,items:oe(ie.keys),pick:W!==void 0}),Xi().then(P)}catch(ie){a(Yt(ie))}finally{o(null)}}function Ct(W,$){let ie=new Set(S);$?ie.add(W):ie.delete(W),b(ie)}async function Ri(){if(!u||!I)return;C(!0),l(null);let W=[...new Set([...R,...Q])].filter($=>Q.has($)||!S.has($));try{await va(e.config,u.file,y,W,k!=null?k:null,u.pick),Spicetify.showNotification("Syncify: setup loaded. Reloading\u2026"),sn(I.manual,"share"),setTimeout(()=>window.location.reload(),1e3)}catch($){C(!1),l(Nm($))}}return{input:t,setInput:n,fetching:i,error:r,applyError:c,shared:u,close:()=>{d(null),l(null)},mode:y,setMode:f,changes:L,theme:fe,checking:st,applying:A,open:le,allow:Ct,apply:Ri}}function Nm(e){if(e instanceof Zt){let t=e.reason instanceof Error?e.reason.message:String(e.reason);return`${e.message} ${t}`}return e instanceof Error?e.message:String(e)}async function vi(e){var t;try{return await navigator.clipboard.writeText(e),!0}catch(n){let i=(t=Spicetify.Platform)==null?void 0:t.ClipboardAPI;return i!=null&&i.copy?(await i.copy(e),!0):!1}}var Tm=2e3;function Sl(e){let{codes:t,compose:n}=e,[i,o]=h(null),[r,a]=h(null);_(()=>{if(!r)return;let d=setTimeout(()=>a(null),Tm);return()=>clearTimeout(d)},[r]);async function c(d,y){await vi(d)&&a(y)}async function l(){i&&await t.remove(i.code)&&(n.forgetSaved(i.code),o(null))}let u=t.codes;return g("section",{className:"syncify-share-part","aria-label":"Your codes",children:[s(Z,{title:g(E,{children:["Your codes",t.newHearts>0?s("span",{className:"syncify-share-hearts",children:it(t.newHearts,"new heart")}):null]}),end:u&&t.max!==null?s(Co,{used:u.length,max:t.max,label:"Share codes"}):void 0}),t.error?s(O,{tone:"error",actions:s(v,{variant:"text",onClick:()=>{t.load()},children:"Try again"}),children:t.error}):null,n.saved?s(Pm,{saved:n.saved,copied:r,onCopy:(d,y)=>{c(d,y)},discoverOpen:e.discoverOpen,onDismiss:n.dismissSaved}):null,n.error&&!n.compose?s(O,{tone:"error",children:n.error}):null,u===null?t.error?null:s(Y,{label:"Loading your codes",children:s(xe,{})}):u.length>0?s(Y,{label:"Your codes",children:u.map(d=>s(F,{name:vt(d),meta:s(z,{parts:[d.name?s("code",{className:"syncify-share-code",children:Ee(d.code)}):null,...ll(d)]}),end:g("span",{className:"syncify-share-code-actions",children:[s(v,{variant:"text",onClick:()=>{c(Ee(d.code),`code:${d.code}`)},children:r===`code:${d.code}`?"Copied":"Copy"}),d.link?s(v,{variant:"text",onClick:()=>{var y;c((y=d.link)!=null?y:"",`link:${d.code}`)},children:r===`link:${d.code}`?"Copied":"Get link"}):null,s(ke,{trigger:"more",label:`More for ${vt(d)}`,disabled:n.compose!==null||t.deleting,items:[{label:"Update",onSelect:()=>{n.start(d)}},...e.discoverOpen&&!d.posted?[{label:"Post to Discover",onSelect:()=>q(un(d.code))}]:[],{label:"Delete",danger:!0,onSelect:()=>o(d)}]})]})},d.code))}):null,u!==null?s("div",{className:"syncify-share-create",children:s(v,{variant:"secondary",onClick:()=>{n.start(null)},disabled:n.compose!==null||t.atMax||e.marketplaceAvailable===!1,children:"Create a code"})}):null,s(et,{open:i!==null,onClose:()=>o(null),title:i?`Delete ${vt(i)}`:"",actions:g(E,{children:[s(v,{variant:"secondary",onClick:()=>o(null),disabled:t.deleting,children:"Keep it"}),s(v,{variant:"danger",onClick:()=>{l()},disabled:t.deleting,children:t.deleting?"Deleting\u2026":"Delete code"})]}),children:i?ul(i):null})]})}function Pm(e){let{saved:t}=e,n=Ee(t.code),i=t.link,o=t.outcome==="existing"?"You shared this setup already as":t.outcome==="updated"?"Code updated:":"Your code is ready:";return g(O,{tone:"info",live:!0,actions:g(E,{children:[s(v,{variant:"text",onClick:()=>e.onCopy(n,"saved-code"),children:e.copied==="saved-code"?"Copied":"Copy"}),i?s(v,{variant:"text",onClick:()=>e.onCopy(i,"saved-link"),children:e.copied==="saved-link"?"Copied":"Get link"}):null,t.outcome==="created"&&e.discoverOpen?s(v,{variant:"text",onClick:()=>q(un(t.code)),children:"Post to Discover"}):null,s(v,{variant:"subtle",onClick:e.onDismiss,children:"Dismiss"})]}),children:[g("span",{children:[o," ",s("code",{className:"syncify-share-code",children:n})]}),t.leftOut>0?s("span",{className:"syncify-share-left-out",children:t.leftOut===1?"1 snippet isn't in Marketplace's list anymore, so it was left out.":`${t.leftOut} snippets aren't in Marketplace's list anymore, so they were left out.`}):null]})}function bl(e){let{session:t}=e,n=hl(e),i=gl(e),o=pl({token:t==null?void 0:t.token,hasHandle:i.profile!==null,suggestedHandle:i.suggestedHandle,reload:i.load,fail:i.fail}),[r,a]=h(null);if(_(()=>{ra().then(a)},[]),n.shared)return s(ml,{idBase:e.idBase,load:n,marketplaceAvailable:e.marketplaceAvailable,busy:e.busy});if(o.compose)return s(fl,{idBase:e.idBase,compose:o});let c=n.input.trim();return g(G,{idBase:e.idBase,id:"share",children:[s("form",{className:"syncify-share-part",noValidate:!0,onSubmit:l=>{l.preventDefault(),!n.fetching&&c&&n.open()},children:s(be,{label:"Load a setup",value:n.input,onChange:n.setInput,placeholder:"Paste a code or a link",error:n.error,action:s(v,{variant:"secondary",type:"submit",disabled:n.fetching!==null||!c,children:n.fetching&&!n.fetching.pick?"Loading\u2026":"Load"})})}),r?g("section",{className:"syncify-share-part","aria-label":r.length>0?"Syncify picks":"Discover",children:[r.length>0?s(Z,{title:"Syncify picks"}):null,g(Y,{children:[r.map(l=>{var u;return s(F,{name:l.name,meta:s(z,{parts:[s("span",{className:"syncify-share-pips",children:dl(l).map((d,y)=>s(ce,{kind:d},y))},"pips"),((u=n.fetching)==null?void 0:u.code)===l.code?"Loading\u2026":it(l.extensions+l.themes+l.snippets,"item")]}),onOpen:()=>{n.open(l.code)},openLabel:`Preview ${l.name}`,disabled:n.fetching!==null},l.code)}),s(F,{name:"Find more setups on Discover",end:s(v,{variant:"secondary",size:"small",onClick:()=>q(un()),children:"Open"})})]})]}):null,t===void 0?null:t===null?s("div",{className:"syncify-share-part",children:s(ne,{label:"Sign in to share this setup as a code",children:s(v,{variant:"secondary",onClick:e.onSignIn,children:"Sign in"})})}):s(Sl,{codes:i,compose:o,discoverOpen:r!==null,marketplaceAvailable:e.marketplaceAvailable})]})}var Ao="syncify:share-code-count",_o="syncify:handle";function Am(){var t,n;let e=Number((n=(t=Spicetify.LocalStorage)==null?void 0:t.get(Ao))!=null?n:NaN);return Number.isInteger(e)&&e>=0?e:null}function _m(){var t;let e=(t=Spicetify.LocalStorage)==null?void 0:t.get(_o);return e==null?void 0:e||null}function wl(){let[e,t]=h(()=>Am()),[n,i]=h(()=>_m()),o=de(c=>{var l,u;c===null?(l=Spicetify.LocalStorage)==null||l.remove(Ao):(u=Spicetify.LocalStorage)==null||u.set(Ao,String(c)),t(c)},[]),r=de(c=>{var l,u;c===void 0?(l=Spicetify.LocalStorage)==null||l.remove(_o):(u=Spicetify.LocalStorage)==null||u.set(_o,c!=null?c:""),i(c)},[]),a=de(()=>{o(null),r(void 0)},[o,r]);return{codeCount:e,handle:n,saveCodeCount:o,saveHandle:r,forget:a}}var Mm=2e3;function kl(e){return g(E,{children:[e.nudge?s(O,{tone:"warning",actions:g(E,{children:[s(v,{variant:"subtle",size:"small",onClick:e.onHideNudge,disabled:e.securing,children:"Not now"}),s(v,{size:"small",onClick:e.onSecure,disabled:e.securing,children:e.securing?"Securing\u2026":"Secure"})]}),children:"Your backup isn't secured. Anyone who knows your Spotify username can restore it."}):null,e.restoreResult?s(Lm,{manual:e.restoreResult.manual}):null]})}function Lm(e){let[t,n]=h(!1),i=lc(e.manual).join(`
`);if(_(()=>{if(!t)return;let r=setTimeout(()=>n(!1),Mm);return()=>clearTimeout(r)},[t]),!i)return null;let o=e.manual.length;return g(O,{tone:"info",actions:g(E,{children:[s(v,{variant:"text",onClick:()=>{vi(i).then(n)},children:t?"Copied":"Copy"}),s(v,{variant:"subtle",onClick:rc,children:"Dismiss"})]}),children:[o===1?"1 isn't from Marketplace. Add it in a terminal:":`${o} aren't from Marketplace. Add them in a terminal:`,s("pre",{className:"syncify-commands",children:s("code",{children:i})})]})}function vl(e){let{message:t}=e;return s(O,{tone:t.kind,actions:g(E,{children:[t.kind==="error"?s(v,{variant:"text",onClick:e.onTryAgain,disabled:e.busy,children:"Try again"}):null,s(v,{variant:"subtle",onClick:e.onDismiss,children:"Dismiss"})]}),children:t.text})}function xl(e){let t=Om(e);return t.backedUp&&e.latest?w(p({},t),{line:[`Backed up ${kt(e.latest.metadata.last_sync_datetime)}`,`${nt(e.localItemCount)} on this device`]}):w(p({},t),{line:[t.title,...t.detail]})}function Om(e){let t={backedUp:!1,supportAsk:null},n=`${nt(e.localItemCount)} on this device`;return e.restoreResult&&!e.unsupported?Bm(e.restoreResult):e.unsupported?w(p({},t),{title:"Update Syncify to keep backing up",detail:["Your backups are safe"],action:"how-to-update"}):e.activity==="backing-up"?w(p({},t),{title:"Backing up\u2026",detail:[],action:"back-up"}):e.checked?e.latest?e.localHash&&!e.backedUp?w(p({},t),{title:"Changes since your last backup",detail:Dm(e.latest,e.latestItems,e.localItems,e.localConfig),action:"back-up"}):w(p({},t),{title:"Everything is backed up",detail:[`Last backup ${kt(e.latest.metadata.last_sync_datetime)}`,n],action:null,backedUp:!0}):w(p({},t),{title:"No backup yet",detail:["Save your extensions and themes to restore them after a reinstall or on another computer."],action:"back-up"}):e.checkError?w(p({},t),{title:"Couldn't check your backup",detail:[e.checkError],action:"try-again"}):w(p({},t),{title:"Checking your backup\u2026",detail:[],action:null})}function Bm(e){let t=e.loaded===e.total,n=e.kind==="share";return{title:t?n?"Setup loaded":"Backup restored":`${n?"Loaded":"Restored"} ${e.loaded} of ${e.total}`,detail:[t?e.total===0?"Nothing from Marketplace to load":`${e.loaded} of ${e.total} loaded`:"Missing something? Reload Spotify once more."],action:t?null:"reload",backedUp:!1,supportAsk:t?n?"Syncify set it up for you?":"Syncify saved your setup?":null}}function Dm(e,t,n,i){var y;let o=new Set(t),r=new Set(n),a=n.filter(f=>!o.has(f)).length,c=t.filter(f=>!r.has(f)).length,l=(y=e.spicetify_config)!=null?y:null,u=!!(i&&!l),d=!u&&(i&&l?!Cs(i,l):i!==l);return[a?`${a} added`:null,c?`${c} removed`:null,d?"Spicetify config changed":null,u?"Spicetify config not saved yet":null,`Last backup ${kt(e.metadata.last_sync_datetime)}`].filter(f=>f!==null)}function Cl(e,t,n){return e?w(p({kind:"claim"},fi(e,n)),{signIn:!n}):t?{kind:"install",title:mi(t),text:pi,install:t}:null}var Um=3,Il={exists:!1,payload:null,backups:[],safetyCopy:null,pinned:[],borrowed:!1,others:[],claim:null,unapproved:[],install:null,nudge:!1},rt=null;function Rl(e){var d,y;let[t,n]=h(()=>rt),[i,o]=h(void 0),r=de(f=>{rt=f,n(f)},[]),a=de(async()=>{let f=await Qe(e),S=await te().catch(()=>null),b=S?await xa(e).catch(()=>null):null,x=S?await te().catch(()=>null):null;r({remote:f,claims:x?b:null}),o(x)},[e,r]),c=de(()=>{te().catch(()=>null).then(f=>o(S=>S!=null?S:f))},[]),l=de(f=>{let S=rt!=null?rt:{remote:Il,claims:null},{remote:b}=S,x=b.borrowed?[...b.backups,...b.safetyCopy?[b.safetyCopy]:[],...b.pinned]:b.others;r(w(p({},S),{remote:w(p(w(p({},b),{exists:!0,payload:f,backups:b.borrowed?[f]:[f,...b.backups.filter(m=>m.payload_hash!==f.payload_hash)].slice(0,Um)}),b.borrowed?{safetyCopy:null,pinned:[]}:{}),{borrowed:!1,others:x.filter(m=>m.payload_hash!==f.payload_hash)})}))},[r]),u=de(()=>{o(null),rt&&r(w(p({},rt),{claims:null}))},[r]);return{check:t,remote:(d=t==null?void 0:t.remote)!=null?d:Il,claims:(y=t==null?void 0:t.claims)!=null?y:null,session:i,setSession:o,refresh:a,readSession:c,addBackup:l,forgetClaims:u}}function El(){let[e,t]=h(null),[n,i]=h(!1),o=de(async()=>{try{let r=await Hn();return t(r),i(!1),r}catch(r){throw i(!0),r}},[]);return{local:e,localFailed:n,refreshLocal:o}}var $m=600*1e3;function Nl(){let[e,t]=h(null);return _(()=>{let n=U();if(!po(n.version))return;let i=!0;return Sc(n.releasesUrl).then(o=>{i&&o&&go(o,n.version)>0&&t(o)}),()=>{i=!1}},[]),e}function Tl(){let[e,t]=h(()=>ic()),[n]=h(()=>Date.now());return _(()=>oc(t),[]),{result:e,recent:!!(e&&n-e.at<$m)}}function Pl(e){let t=U(),n=[["Report an issue",t.issueUrl],["GitHub",t.githubUrl],["Discord",t.discordUrl],["Support on Ko-fi",t.kofiUrl]],i=[["Privacy",`${t.webUrl}/privacy`],["Terms",`${t.webUrl}/terms`]];return g("footer",{className:"syncify-window-footer",children:[g("span",{className:"syncify-window-footer-version",children:[s(z,{className:"syncify-window-footer-meta",parts:[`Syncify ${t.version}`,...i.map(([o,r])=>s(v,{variant:"subtle",size:"tiny",className:"syncify-window-footer-legal",onClick:()=>q(r),children:o},o))]}),e.newerVersion?s(v,{variant:"text",size:"tiny",className:"syncify-window-update",onClick:()=>e.loadedByLoader?window.location.reload():q(`${t.githubUrl}#updating`),children:s(z,{className:"syncify-window-footer-meta",parts:[`${e.newerVersion} is out`,e.loadedByLoader?"Reload":"How to update"]})}):null]}),s("span",{className:"syncify-window-footer-links",children:n.map(([o,r])=>s(v,{variant:"subtle",size:"tiny",onClick:()=>q(r),children:o},o))})]})}function xi(e,t){let[n,i]=h("ask"),[o,r]=h(""),[a,c]=h(!1),[l,u]=h(null),[d,y]=h(null),f=Jc(o);async function S(b){c(!0),u(null),y(null);try{await Ia(j(),e.id,b),Spicetify.showNotification(Pc(b.action)),await t.onDone(),i("ask"),r("")}catch(x){x instanceof ut?y(x.message):t.onError?t.onError(x):u(x instanceof Error?x.message:String(x))}finally{c(!1)}}return{step:n,code:o,busy:a,error:l,codeError:d,complete:f.length===6,setCode(b){r(b),y(null)},askForCode:()=>i("code"),back(){i("ask"),y(null)},notMe:()=>{S({action:"reject"})},confirm(){f.length===6&&!a&&S({action:"approve",code:f})}}}function Ci(e){let{answer:t}=e;return g(E,{children:[s("p",{children:Tc}),s(be,{label:"Code",value:t.code,onChange:t.setCode,error:t.codeError,maxLength:7,disabled:t.busy,mono:!0,autoFocus:!0})]})}function Ii(e){let{answer:t}=e;return g(E,{children:[s(v,{variant:"secondary",onClick:t.back,disabled:t.busy,children:"Back"}),s(v,{type:"submit",disabled:t.busy||!t.complete,children:"That's me"})]})}var Hm={"back-up":"Back up now","try-again":"Try again","how-to-update":"How to update",reload:"Reload"};function Al(e){let{status:t,alert:n}=e,i=t.action,o=i?s(v,{variant:i==="back-up"?"primary":"secondary",size:n?"small":"regular",onClick:()=>e.onAction(i),disabled:e.busy,children:i==="back-up"&&e.backingUp?"Backing up\u2026":Hm[i]}):null;return n?g("section",{className:"syncify-status","aria-label":"Status",children:[g("div",{className:"syncify-status-alert",role:"alert",children:[g("div",{className:"syncify-status-alert-body",children:[s("span",{className:"syncify-status-alert-mark",children:s(we,{tone:"warning",icon:s(ko,{})})}),g("div",{className:"syncify-status-text",children:[s("h2",{className:"syncify-status-title",children:n.title}),n.text?s("p",{className:"syncify-status-sentence",children:n.text}):null]})]}),n.kind==="claim"?n.signIn?g("span",{className:"syncify-status-answers",children:[s(v,{variant:"secondary",onClick:e.onNotMe,disabled:e.answering,children:"Not me"}),s(v,{onClick:e.onSignIn,disabled:e.answering,children:"That's me, sign in"})]}):s(v,{variant:"secondary",onClick:e.onNotMe,disabled:e.answering,children:"Not me"}):s(Km,{install:n.install,onDone:e.onInstallAnswered,onError:e.onError},n.install.id)]}),g("div",{className:"syncify-status-line","aria-live":"polite",children:[t.backedUp?s(Oe,{className:"syncify-status-check"}):null,s(z,{parts:t.line}),o]})]}):s("section",{className:"syncify-status","aria-label":"Status",children:g("div",{className:"syncify-status-main","aria-live":"polite",children:[g("div",{className:"syncify-status-text",children:[s("h2",{className:"syncify-status-title",children:t.title}),t.detail.length>0?s(z,{parts:t.detail}):null,t.supportAsk?g("p",{className:"syncify-status-ask",children:[s("span",{children:t.supportAsk}),s(v,{variant:"text",onClick:e.onSupport,children:"Support it on Ko-fi"})]}):null]}),o]})})}function Km(e){let t=xi(e.install,{onDone:e.onDone,onError:e.onError});return g(E,{children:[g("span",{className:"syncify-status-answers",children:[s(v,{variant:"secondary",onClick:t.notMe,disabled:t.busy,children:"Not me"}),s(v,{onClick:t.askForCode,disabled:t.busy,children:"That's me"})]}),s(et,{open:t.step==="code",title:gi,actions:s(Ii,{answer:t}),onClose:t.back,onSubmit:t.confirm,children:s(Ci,{answer:t})})]})}function _l(e){let{codeCount:t,account:n,newerVersion:i}=e,o=[{id:"backups",label:"Backups"},{id:"share",label:"Share",status:t?s(xo,{count:t,label:it(t,"code")}):void 0},{id:"account",label:"Account",status:n?n.kind==="ok"?s("span",{className:"syncify-tab-check",role:"img","aria-label":n.label,children:s(Oe,{})}):s(we,{tone:"warning",label:n.label}):void 0},{id:"settings",label:"Settings",status:e.settingsHeld?s(we,{tone:"warning",label:"An item's extension settings aren't syncing"}):i?s(we,{tone:"info",label:`Syncify ${i} is out`}):void 0}];return s(Ro,{tabs:o,selected:e.selected,onSelect:e.onSelect,idBase:e.idBase,label:"Syncify"})}var Ml=!1;function dn(e){var zo,Fo,jo,Wo,Yo,Vo,Go,qo,Jo,Xo,Zo,Qo,er;let t=K("syncify"),n=U(),[i,o]=h(()=>j()),{local:r,localFailed:a,refreshLocal:c}=El(),l=Rl(i),u=wl(),d=Nl(),y=Tl(),f=cl(),[S,b]=h(()=>!Ml),[x]=h(()=>hc()!==null),[m,k]=h((zo=e.tab)!=null?zo:"backups"),[P,A]=h(()=>l.check?"idle":"checking"),[C,I]=h(null),[M,T]=h(null),[B,J]=h(!1),[Q,R]=h(!1),[L,fe]=h(!1),[st,le]=h(null),[Ct,Ri]=h(()=>Pa()),[W,$]=h(e.secure===!0),ie=H(!1),{remote:se,claims:Ye,session:ue}=l,It=P!=="idle",Ei=(Fo=r==null?void 0:r.hash)!=null?Fo:null,[,Kl]=Ni(N=>N+1,0),_e=tn(se.claim),zl=((jo=se.claim)==null?void 0:jo.status)==="pending"&&!se.claim.mine,at=Ac(Ye,zl),Bo=(_e==null?void 0:_e.status)==="final",Do=ue!=null&&at.kind==="secured",yn=Do&&i.settingsSyncEnabled,Uo=yn&&f.arrived&&!f.arrived.hidden?f.arrived:null,Fl=yn&&ot(f,i.settingsSyncOff).length>0,jl=!!(Ei&&se.backups.some(N=>N.payload_hash===Ei)),Wl=xl({activity:P,checked:l.check!==null,checkError:C,unsupported:B,latest:se.payload,latestItems:se.payload?wt(se.payload).map(N=>N.key):[],backedUp:jl,localHash:Ei,localItems:(Wo=r==null?void 0:r.installedItems)!=null?Wo:[],localItemCount:(Yo=r==null?void 0:r.installedItemCount)!=null?Yo:0,localConfig:(Vo=r==null?void 0:r.spicetifyConfig)!=null?Vo:null,restoreResult:y.recent?y.result:null}),Yl=Cl(_e,(qo=(Go=se.install)==null?void 0:Go.waiting[0])!=null?qo:null,ue!=null),Vl=!Ct&&se.payload!==null&&m!=="account"&&(ue?at.kind==="open":ue===null&&se.nudge),Gl=(ue?(Jo=Ye==null?void 0:Ye.accounts)!=null?Jo:[]:[]).filter(N=>N.status==="final").map((N,ee)=>({hash:N.hash,label:`Spotify account ${ee+1}${N.device_info?` from ${N.device_info}`:""}`})).filter(N=>N.hash!==(Ye==null?void 0:Ye.hash));async function De(N={}){try{(!N.silent||!l.check)&&A("checking"),N.silent||(T(null),I(null)),await c(),await l.refresh(),I(null),A("idle")}catch(ee){Rt(ee)}}function Rt(N){if(A("idle"),N instanceof Bt){J(!0),T(null);return}let ee=N instanceof Error?N.message:String(N);l.check?T({kind:"error",text:ee}):I(ee),Spicetify.showNotification(ee,!0,6e3)}async function ql(){try{A("backing-up"),T(null);let N=await nn(i).catch(()=>null),{payload:ee,unchanged:mn,settings:nu}=await Qt(i,N);await oi(N,nu,se.backups).catch(()=>null),await c(),mn||l.addBackup(ee),A("idle"),Spicetify.showNotification(mn?"Syncify: everything is already backed up":"Syncify backup complete")}catch(N){Rt(N)}}async function Jl(N){var ee;try{A("restoring"),T(null),await ka(i,N.row.backup,(ee=N.linkedHash)!=null?ee:void 0,N.skipped,N.settings),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),sn(N.manual),setTimeout(()=>window.location.reload(),1e3)}catch(mn){Rt(mn)}}async function Xl(){if(_e){R(!0);try{_e.status==="pending"&&_e.can_cancel&&await Jn(i)==="cancelled"?(Spicetify.showNotification(yi(_e.email)),await De({silent:!0})):(Xn(_e),Kl())}catch(N){T({kind:"error",text:N instanceof Error?N.message:String(N)})}finally{R(!1)}}}async function Et(){fe(!0),le(null);try{await Ca(i)}catch(N){N instanceof Ke&&["claim_pending","claimed"].includes(N.code)||le(N instanceof Error?N.message:String(N))}finally{await De({silent:!0}),fe(!1)}}function Zl(){ue?Et():k("account")}function Ql(){$(!0),ue?Et():k("account")}function eu(N){l.setSession(N),ie.current=!0,se.claim===null&&se.payload?Et():De({silent:!0})}function $o(){u.forget(),l.forgetClaims(),le(null),De({silent:!0})}function tu(N){N==="back-up"?ql():N==="try-again"?De():N==="how-to-update"?q(`${n.githubUrl}#updating`):sc()}_(()=>ni(()=>o(N=>w(p({},N),{settingsSyncOff:j().settingsSyncOff}))),[]);let Ho=Pe(()=>{l.readSession(),De({silent:!0})});_(()=>Ho.current(),[Ho]);let Ko=Pe(()=>{!e.secure||ie.current||L||!ue||at.kind!=="open"||(ie.current=!0,Et())});return _(()=>Ko.current(),[Ko,ue,at.kind,L]),g("div",{className:"syncify-ui syncify-window",onClick:Lo,onMouseDown:Lo,onPointerDown:Lo,children:[g("div",{className:"syncify-window-top",children:[s(Al,{status:Wl,alert:Yl,backingUp:P==="backing-up",busy:It,answering:Q,onAction:tu,onSignIn:()=>k("account"),onNotMe:()=>{Xl()},onInstallAnswered:()=>De({silent:!0}),onError:Rt,onSupport:()=>q(n.kofiUrl)}),M?s(vl,{message:M,busy:It,onTryAgain:()=>{De()},onDismiss:()=>T(null)}):null,Uo?s(O,{tone:"info",actions:g(E,{children:[s(v,{variant:"subtle",size:"small",onClick:Da,children:"Not now"}),s(v,{size:"small",onClick:()=>window.location.reload(),children:"Reload Spotify"})]}),children:ii(Uo.names)}):null,s(_l,{idBase:t,selected:m,onSelect:k,codeCount:ue?u.codeCount:null,account:_c(ue,Bo,at),newerVersion:d,settingsHeld:Fl})]}),m==="backups"?s(Yc,{idBase:t,config:i,remote:l.check?se:null,failed:C!==null||a,local:r,otherAccounts:Gl,notices:s(kl,{nudge:Vl,securing:L,onSecure:Ql,onHideNudge:()=>{Aa(),Ri(!0)},restoreResult:y.result}),canShareSettings:yn,shareSettings:i.shareRestoredSettings,onShareSettingsChange:N=>{let ee=w(p({},i),{shareRestoredSettings:N});Ze(ee),o(ee)},busy:It,restoring:P==="restoring",onRestore:N=>{Jl(N)},onError:Rt}):m==="share"?s(bl,{idBase:t,config:i,session:ue,localItems:(Xo=r==null?void 0:r.items)!=null?Xo:[],localConfig:(Zo=r==null?void 0:r.spicetifyConfig)!=null?Zo:null,localTheme:(Qo=r==null?void 0:r.activeTheme)!=null?Qo:null,marketplaceAvailable:(er=r==null?void 0:r.marketplaceAvailable)!=null?er:null,busy:It,onSignIn:()=>k("account"),onSignedOut:$o,onCodeCount:u.saveCodeCount,onHandle:u.saveHandle}):m==="account"?s(Bc,{idBase:t,session:ue,securedElsewhere:Bo,secure:at,securing:L,secureError:st,onSecure:()=>{Et()},nudge:W,onSignedIn:eu,onSignedOut:$o,handle:u.handle,onHandle:u.saveHandle}):s(al,{idBase:t,config:i,onConfigChange:o,busy:It,unsupported:B,syncStatus:f,secured:Do,securing:L,onSecure:Zl}),yn&&f.choices.length>0?s(Vc,{choices:f.choices,open:S,onClose:()=>{Ml=!0,b(!1)}}):null,s(Pl,{newerVersion:d,loadedByLoader:x})]})}function Lo(e){e.stopPropagation()}var Ll=`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="-2.5 -2.5 37 37" aria-hidden="true" focusable="false"><defs><mask id="syncify-mark-gap" maskUnits="userSpaceOnUse" x="-2" y="-2" width="36" height="36"><rect x="-2" y="-2" width="36" height="36" fill="#fff"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></mask></defs><g mask="url(#syncify-mark-gap)"><g transform="rotate(15 16 16)"><path d="M16 16L16 7.4A8.6 8.6 0 0 1 24.6 16Z" fill="#6cd1d1" transform="translate(0.42 -0.42)"/><path d="M16 16L24.6 16A8.6 8.6 0 0 1 16 24.6Z" fill="#efa4c1" transform="translate(0.42 0.42)"/><path d="M16 16L16 24.6A8.6 8.6 0 0 1 7.4 16Z" fill="#d3c48c" transform="translate(-0.42 0.42)"/><path d="M16 16L7.4 16A8.6 8.6 0 0 1 16 7.4Z" fill="#88bcf2" transform="translate(-0.42 -0.42)"/></g></g><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 28.03A12.4 12.4 0 1 1 28.03 19"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91"/></g></svg>
`;var Ae=null;function We(){return!!(Ae!=null&&Ae.container.isConnected)}function xt(){Spicetify.PopupModal.hide()}function Be(e){Ol(Ae);let t=document.createElement("div");Ae={container:t,root:null,watch:null};try{Spicetify.PopupModal.display({title:U().extensionName,content:t,isLarge:!1})}catch(n){throw ae("Failed to open PopupModal",n),n}jm(t),Ym(t,e),Fm(t)}function Fm(e){let t=Ae;if((t==null?void 0:t.container)!==e||typeof MutationObserver!="function")return;let n=new MutationObserver(()=>{e.isConnected||Ol(t)});n.observe(document.body,{childList:!0,subtree:!0}),t.watch=n}function Ol(e){var t,n;e&&((t=e.watch)==null||t.disconnect(),e.watch=null,(n=e.root)==null||n.unmount(),e.root=null)}function jm(e){requestAnimationFrame(()=>{let t=Wm(e);t==null||t.classList.add("syncify-modal-shell");let n=t==null?void 0:t.querySelector(".main-trackCreditsModal-header h1");if(n&&!n.querySelector(".syncify-modal-mark")){let o=document.createElement("span");o.className="syncify-modal-mark",o.innerHTML=Ll,n.prepend(o)}let i=t==null?void 0:t.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');i&&(i.classList.add("syncify-modal-close"),i.setAttribute("aria-label",`Close ${U().extensionName}`),i.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function Wm(e){let t=e.parentElement;for(;t&&t!==document.body;){if(t.querySelector(".main-trackCreditsModal-header"))return t;t=t.parentElement}return e.closest('[class*="trackCreditsModal"]')}function Ym(e,t){try{if(typeof Spicetify.ReactDOM.createRoot=="function"){let n=Spicetify.ReactDOM.createRoot(e);n.render(t),(Ae==null?void 0:Ae.container)===e&&(Ae.root=n),re("Window rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(t,e),re("Window rendered",{renderer:"render"})}catch(n){throw ae("Failed to render window",n),n}}function fn(e){return s("div",{className:"syncify-ui syncify-launch-notice",children:g(ai,{title:e.title,actions:e.actions,onSubmit:e.onSubmit,children:[typeof e.children=="string"?s("p",{children:e.children}):e.children,e.error?s(O,{tone:"error",children:e.error}):null]})})}function Vm(){let[e,t]=h(!1),[n,i]=h(null);async function o(r){t(!0),i(null);try{await r()}catch(a){i(a instanceof Error?a.message:String(a)),t(!1)}}return{busy:e,error:n,run:o}}function Bl(e){let{claim:t}=e,{title:n,text:i}=fi(t,e.signedIn),o=Vm(),r=()=>{o.run(async()=>{t.status==="pending"&&t.can_cancel&&await Jn(j())==="cancelled"?Spicetify.showNotification(yi(t.email)):Xn(t),e.onClose()})};return s(fn,{title:n,error:o.error,actions:e.signedIn?g(E,{children:[s(v,{variant:"secondary",onClick:e.onClose,disabled:o.busy,children:"Close"}),s(v,{onClick:r,disabled:o.busy,children:"Not me"})]}):g(E,{children:[s(v,{variant:"secondary",onClick:r,disabled:o.busy,children:"Not me"}),s(v,{onClick:e.onSignIn,disabled:o.busy,children:"That's me, sign in"})]}),children:i})}function Dl(e){return s(fn,{title:Nc(e.claim),actions:s(v,{onClick:e.onClose,children:"Close"})})}function Ul(e){let t=xi(e.install,{onDone:e.onDone});return t.step==="code"?s(fn,{title:gi,error:t.error,actions:s(Ii,{answer:t}),onSubmit:t.confirm,children:s(Ci,{answer:t})}):s(fn,{title:mi(e.install),error:t.error,actions:g(E,{children:[s(v,{variant:"secondary",onClick:t.notMe,disabled:t.busy,children:"Not me"}),s(v,{onClick:t.askForCode,disabled:t.busy,children:"That's me"})]}),children:pi})}function $l(e){return s(fn,{title:"Your backup isn't secured",actions:g(E,{children:[s(v,{variant:"secondary",onClick:e.onClose,children:"Not now"}),s(v,{onClick:t=>{t.stopPropagation(),e.onSecure()},children:"Secure"})]}),children:"Anyone who knows your Spotify username can restore it."})}function Gm(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var Hl="syncify-styles";function qm(){if(document.getElementById(Hl)){re("Another copy of Syncify is running; stopping this one");return}or(Spicetify.React),Jm();let e=j();ba({topbarButton:yc(Oo),menuItem:pc(Oo)}),Gn(e.entryPoint),oo(e.shortcut,Oo),Xa({onClaim:Xm,onUndone:Zm,onInstall:Qm,onNudge:ep,onFirstSync:tp}).catch(t=>{ae("Startup sync check failed",t)}),cc().catch(t=>{ae("Restore check failed",t)})}function Jm(){let e=document.createElement("style");e.id=Hl,e.textContent=Lr,document.head.appendChild(e)}function Oo(){if(We()){xt();return}Be(s(dn,{}))}function Xm(e){We()||(re("Opening claim notice"),te().catch(t=>{if(t instanceof Ve)return null;throw t}).then(t=>{We()||Be(s(Bl,{claim:e,signedIn:t!==null,onSignIn:()=>Be(s(dn,{tab:"account"})),onClose:xt}))},t=>ae("Claim notice skipped",t)))}function Zm(e){return We()?!1:(re("Opening undone claim notice"),Be(s(Dl,{claim:e,onClose:xt})),!0)}function Qm(e){We()||(re("Opening install notice"),Be(s(Ul,{install:e,onDone:xt})))}function ep(){We()||(re("Opening nudge notice"),Ma(),Be(s($l,{onSecure:()=>Be(s(dn,{tab:"account",secure:!0})),onClose:xt})))}function tp(){We()||(re("Opening first sync"),Be(s(dn,{tab:"settings"})))}ac();(function e(){if(!Gm()){setTimeout(e,100);return}re("Spicetify APIs ready"),qm()})();})();
