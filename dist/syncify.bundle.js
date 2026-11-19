// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var Tl=Object.defineProperty,Al=Object.defineProperties;var _l=Object.getOwnPropertyDescriptors;var an=Object.getOwnPropertySymbols;var Ko=Object.prototype.hasOwnProperty,zo=Object.prototype.propertyIsEnumerable;var Ho=(e,t,n)=>t in e?Tl(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,m=(e,t)=>{for(var n in t||(t={}))Ko.call(t,n)&&Ho(e,n,t[n]);if(an)for(var n of an(t))zo.call(t,n)&&Ho(e,n,t[n]);return e},w=(e,t)=>Al(e,_l(t));var Se=(e,t)=>{var n={};for(var i in e)Ko.call(e,i)&&t.indexOf(i)<0&&(n[i]=e[i]);if(e!=null&&an)for(var i of an(e))t.indexOf(i)<0&&zo.call(e,i)&&(n[i]=e[i]);return n};var Rt,M,le,A,Et,Z,Ml,z,S;function Fo(e){({createElement:Rt,Fragment:M,useCallback:le,useEffect:A,useLayoutEffect:Et,useMemo:Z,useReducer:Ml,useRef:z,useState:S}=e)}var jo=`/* Shared values for every part. Colors come from the active Spicetify theme,
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
`;var Wo=`.syncify-icon {
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
`;var Yo=`.syncify-btn,
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
`;var Vo=`.syncify-switch-control {
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
`;var qo=`.syncify-checkbox {
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
`;var Go=`/* A square ring; picked, the ring and a square inside it in the accent. */
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
`;var Jo=`.syncify-setting-row {
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
`;var Xo=`/* Facts on one line, wrapping between facts. Each fact is trimmed to its
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
`;var Zo=`.syncify-list {
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
`;var Qo=`.syncify-field-group {
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
`;var er=`.syncify-menu {
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
`;var tr=`.syncify-meter {
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
`;var nr=`.syncify-mark-square {
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
`;var ir=`.syncify-notice {
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
`;var or=`.syncify-dialog {
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

.syncify-dialog-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: var(--syncify-space-2);
}
`;var rr=`/* When the window is too narrow for every tab, the row scrolls sideways
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
`;var sr=`.syncify-pip-square {
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
`;var ar=`.syncify-section-label {
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
`;var cr=`.syncify-keycap {
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
`;var lr=`/* A bar as tall as the capitals of the text it stands in for. */
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
`;var ur=[jo,Wo,Yo,Vo,qo,Go,Jo,Xo,Zo,Qo,er,tr,nr,ir,or,rr,sr,ar,cr,lr].join(`
`);var dr=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var fr=`/* The window fits the height Spotify's popup leaves it, so the status and
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
`;var yr=`/* The safety copy's shield and a pinned backup's pin, after their names. */
.syncify-safety-mark {
    color: var(--syncify-color-accent);
}

/* "Current", where an older backup has its chevron. */
.syncify-row-status {
    color: var(--syncify-color-accent);
    font-size: var(--syncify-text-small);
    font-weight: 700;
}
`;var mr=`/* Adds, Updates and Removes: plain colored text, not chips. */
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
`;var pr=`/* Loading a setup, the picks and your codes, split by dashed lines. */
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
`;var gr=`/* The code step's Resend and Use another email. */
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
`;var hr=`/* Turn off or Use default, then the key. */
.syncify-settings-shortcut {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    gap: var(--syncify-space-2);
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
`;var Sr=`/* A launch notice in Spotify's popup: the dialog layout, the popup's width. */
.syncify-launch-notice {
    width: 100%;
}
`;var br=[ur,dr,fr,mr,yr,pr,gr,hr,Sr].join(`
`);var cu="syncify",st="state";function mi(){let e;try{e=window.indexedDB}catch(t){return Promise.resolve(null)}return e?new Promise(t=>{let n;try{n=e.open(cu,1)}catch(i){t(null);return}n.onupgradeneeded=()=>{n.result.createObjectStore(st)},n.onerror=()=>t(null),n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}function pi(e,t){let n=mi().then(i=>new Promise((o,r)=>{if(!i){r(new Error("IndexedDB isn't available."));return}try{let s=i.transaction(st,e),c=t(s.objectStore(st));s.oncomplete=()=>{i.close(),o(c.result)},s.onerror=s.onabort=()=>{var l;i.close(),r((l=s.error)!=null?l:new Error("IndexedDB failed."))}}catch(s){i.close(),r(s)}}));return Promise.race([n,new Promise((i,o)=>setTimeout(()=>o(new Error("IndexedDB took too long.")),2e3))])}function be(e){return pi("readonly",t=>t.get(e))}async function fe(e,t){await pi("readwrite",n=>n.put(t,e))}async function cn(e){await pi("readwrite",t=>t.delete(e))}var Ie={extensionName:"Syncify",version:"1.19.0",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",discordUrl:"https://syncify.wsoltani.com/discord",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com",shareUrl:"https://syncs.wsoltani.com"};function D(){var t,n,i,o,r,s,c,l,u,d;let e=window.SyncifyConfig;return{extensionName:(t=_e(e==null?void 0:e.extensionName))!=null?t:Ie.extensionName,version:(n=wr(e==null?void 0:e.version))!=null?n:Ie.version,workerUrl:(i=_e(e==null?void 0:e.workerUrl))!=null?i:Ie.workerUrl,webUrl:(o=_e(e==null?void 0:e.webUrl))!=null?o:Ie.webUrl,githubUrl:(r=_e(e==null?void 0:e.githubUrl))!=null?r:Ie.githubUrl,kofiUrl:(s=_e(e==null?void 0:e.kofiUrl))!=null?s:Ie.kofiUrl,discordUrl:(c=_e(e==null?void 0:e.discordUrl))!=null?c:Ie.discordUrl,issueUrl:(l=_e(e==null?void 0:e.issueUrl))!=null?l:Ie.issueUrl,releasesUrl:(u=_e(e==null?void 0:e.releasesUrl))!=null?u:Ie.releasesUrl,shareUrl:(d=_e(e==null?void 0:e.shareUrl))!=null?d:Ie.shareUrl}}function _e(e){return wr(e)}function wr(e){return typeof e=="string"&&e.trim()?e.trim():null}var lu="x-syncify-version",uu="x-syncify-install",du="x-syncify-timezone",kr="install-id",vr="syncify:install-id",fu=2e3,ln=null;async function xr(){let e={[lu]:D().version,[uu]:(await gi()).id},t=pu();return t&&(e[du]=t),e}function gi(){return ln!=null||(ln=yu().catch(()=>({id:un(),inDatabase:!1}))),ln}async function yu(){let e=await Promise.race([mu(),new Promise(t=>setTimeout(()=>t(null),fu))]);if(e)return{id:e,inDatabase:!0};try{let t=window.localStorage.getItem(vr);if(t&&Cr(t))return{id:t,inDatabase:!1};let n=un();return window.localStorage.setItem(vr,n),{id:n,inDatabase:!1}}catch(t){return{id:un(),inDatabase:!1}}}async function mu(){let e=await mi();return e?new Promise(t=>{let n=null;try{let i=e.transaction(st,"readwrite"),o=i.objectStore(st),r=o.get(kr);r.onsuccess=()=>{if(typeof r.result=="string"&&Cr(r.result)){n=r.result;return}n=un(),o.put(n,kr)},i.oncomplete=()=>{e.close(),t(n)},i.onerror=i.onabort=()=>{e.close(),t(null)}}catch(i){e.close(),t(null)}}):null}function un(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t=[...e].map(n=>n.toString(16).padStart(2,"0"));return[t.slice(0,4).join(""),t.slice(4,6).join(""),t.slice(6,8).join(""),t.slice(8,10).join(""),t.slice(10).join("")].join("-")}function Cr(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(e)}function pu(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(e){return null}}var gu="syncify-signature-v1",hu={name:"ECDSA",hash:"SHA-256"};function dn(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function fn(e){return hi(new Uint8Array(await crypto.subtle.exportKey("raw",e)))}async function Nt(e,t,n,i,o){let r=await Su(t,n,i,o),s=await crypto.subtle.sign(hu,e,r);return hi(new Uint8Array(s))}async function Su(e,t,n,i){let{pathname:o,search:r}=new URL(n),s=new TextEncoder,c=hi(new Uint8Array(await crypto.subtle.digest("SHA-256",s.encode(i))));return s.encode([gu,e,t.toUpperCase(),o+r,c].join(`
`))}function hi(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var Ir="device-key",Si="session",Rr="salt",Ve=null,Pt,Er={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function at(e){if(Ve)return Ve;let t=await be(Ir);return bu(t)?(Ve=Promise.resolve(t),t):e?(Ve=dn().then(async n=>(await fe(Ir,n),n)),Ve.catch(()=>{Ve=null}),Ve):null}async function se(){let e=await be(Si);return wu(e)?e:null}function bi(e){return fe(Si,e)}async function qe(){await cn(Si).catch(()=>{})}async function yn(){if(Pt===void 0){let e=await be(Rr).catch(()=>{});Pt=typeof e=="string"?e:null}return Pt}async function mn(e){e!==Pt&&(Pt=e,await fe(Rr,e).catch(()=>{}))}function pn(){return Er}function Nr(e){Er=e}function bu(e){let t=e;return!!(t&&t.privateKey instanceof CryptoKey&&t.publicKey instanceof CryptoKey)}function wu(e){let t=e;return!!(t&&typeof t.token=="string"&&t.token&&typeof t.email=="string")}var Pr="install-key",ct=null;function Tr(){return ct!=null||(ct=ku()),ct.catch(()=>{ct=null}),ct.catch(()=>null)}async function ku(){if(!(await gi()).inDatabase)return null;let e=await be(Pr),t=xu(e)?e:await vu();return{privateKey:t.privateKey,publicKey:await fn(t.publicKey)}}async function vu(){let e=await dn();return await fe(Pr,e),e}function xu(e){let t=e;return!!(t&&t.privateKey instanceof CryptoKey&&t.publicKey instanceof CryptoKey)}var Cu="/api/auth/email-otp/send-verification-otp",Iu="/api/auth/sign-in/email-otp",Ru="/api/auth/get-session",Eu="/api/auth/sign-out",Nu="/api/auth/link",Pu="x-syncify-device-key",Tu="x-syncify-signature",Ar="x-syncify-salt",Au="none",_u={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again.",link_failed:"Couldn't open the website. Try again."},B=class extends Error{constructor(n,i=null,o=null){var r;super((r=_u[n])!=null?r:"Sign-in failed. Try again.");this.code=n;this.retryAfter=i;this.share=o;this.name="AccountError"}};function De(e){return e instanceof B?e.message:"Sign-in failed. Try again."}async function _r(e,t={}){let n=await At(Cu,{method:"POST",body:JSON.stringify(m({email:e,type:"sign-in"},t.nudge?{nudge:!0}:{}))});return typeof(n==null?void 0:n.resend_in)=="number"?n.resend_in:60}async function Mr(e,t){var r;let n=await at(!0).catch(()=>{throw new B("no_device_key")}),i=await At(Iu,{method:"POST",body:JSON.stringify({email:e,otp:t}),keys:n,sendPublicKey:!0});if(typeof(i==null?void 0:i.token)!="string"||!i.token)throw new B("sign_in_failed");let o={token:i.token,email:typeof((r=i.user)==null?void 0:r.email)=="string"?i.user.email:e};return await bi(o).catch(()=>{throw new B("no_device_key")}),wi=!0,o}var wi=!1;async function Lr(){var t;let e=await se();if(!e||wi)return e;try{let n=await gn(e,Ru,"GET");wi=!0;let i=(t=n==null?void 0:n.user)==null?void 0:t.email;if(typeof i!="string"||i===e.email)return e;let o=w(m({},e),{email:i});return await bi(o).catch(()=>{}),o}catch(n){if(n instanceof B&&n.code==="signed_out")return null;throw n}}async function Br(){let e=await se().catch(()=>null);e&&await gn(e,Eu,"POST").catch(()=>{}),await qe()}async function Or(){let e=await se();if(!e)throw new B("signed_out");let t=await gn(e,Nu,"POST"),n=typeof(t==null?void 0:t.url)=="string"?t.url:"",i=new URL(D().webUrl).origin;if(!n.startsWith(`${i}/link#`))throw new B("link_failed");return n}async function Tt(e,t,n){let i=await se();if(!i)throw new B("signed_out");return gn(i,e,t,n)}async function Dr(e,t,n){let i=await se().catch(()=>null),o=i?await at(!1).catch(()=>null):null;await At(e,m({method:"POST",body:JSON.stringify(t),headers:n,keepalive:!0},i&&o?{token:i.token,keys:o}:{}))}async function gn(e,t,n,i){let o=await at(!1);if(!o)throw await qe(),new B("signed_out");return At(t,m({method:n,token:e.token,keys:o},i===void 0?{}:{body:JSON.stringify(i)}))}async function At(e,t,n=!1){var f,y,h;let i=`${D().webUrl.replace(/\/+$/,"")}${e}`,o=m({},t.headers);if(t.body!==void 0&&(o["content-type"]="application/json"),t.token&&(o.authorization=`Bearer ${t.token}`),t.keys){let k=(f=await yn())!=null?f:Au;o[Ar]=k,o[Tu]=await Nt(t.keys.privateKey,k,t.method,i,(y=t.body)!=null?y:""),t.sendPublicKey&&(o[Pu]=await fn(t.keys.publicKey))}let r;try{r=await fetch(i,{method:t.method,headers:o,body:t.body,keepalive:t.keepalive})}catch(k){throw new B("offline")}let s=r.headers.get(Ar);s&&await mn(s);let c=await r.json().catch(()=>null);if(r.ok)return c;let l=typeof(c==null?void 0:c.code)=="string"?c.code:r.status===503?"unavailable":"failed";if(l==="stale_salt"&&t.keys&&!n)return At(e,t,!0);l==="signed_out"&&await qe();let u=Number(r.headers.get("retry-after")),d=c==null?void 0:c.share;throw new B(l,Number.isFinite(u)&&u>0?u:(h=Mu[l])!=null?h:null,typeof(d==null?void 0:d.code)=="string"?{code:d.code,link:typeof d.link=="string"?d.link:null}:null)}var Mu={resend_wait:60,too_many_requests:60,send_failed:60};var Lu="x-syncify-user-hash",Bu="x-syncify-identity",Ou="x-syncify-signature",Du="x-syncify-install-key",Uu="x-syncify-install-signature",ki="x-syncify-salt",$u="none",Hu="/restores",Ku="/sync",zu="/settings/delete",Fu="x-syncify-settings-bytes",ju="/installs",Wu="hash",Ur=3,_t=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}},ye=class extends Error{constructor(n){super(n==="not_linked"?"Couldn't read that Spotify account's backups.":"Sign in to restore this backup.");this.code=n;this.name="LockedError"}},Ge=class extends Error{constructor(){super("This Spotify account doesn't accept backups from this install. Sign in to back up."),this.name="InstallRefusedError"}};async function Hr(e,t,n,i){var c,l;let o=JSON.stringify(n),r=await Me(e,t,{method:"POST",headers:m({"content-type":"application/json"},i!==void 0?{[Fu]:String(new TextEncoder().encode(i).byteLength)}:{}),body:i!==void 0?i+o:o});if(r.status===403&&((c=await r.json().catch(()=>null))==null?void 0:c.code)==="install_refused")throw new Ge;if(!r.ok)throw new Error(`Backup failed with HTTP ${r.status}.`);let s=await r.json().catch(()=>null);return{unchanged:(s==null?void 0:s.unchanged)===!0,unapproved:(s==null?void 0:s.quarantined)===!0,settings:(l=s==null?void 0:s.settings)!=null?l:null}}async function Kr(e,t,n,i){let o=await Me(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({install:n,action:i})},ju);if(o.ok)return;let r=await o.json().catch(()=>null);if((r==null?void 0:r.code)!=="not_pending")throw new Error(`Couldn't answer with HTTP ${o.status}.`)}async function vi(e,t,n,i){var g,b,N,_,P,x;let o=await Me(e,t,i!==void 0&&!n?{method:"POST",headers:{"content-type":"application/json"},body:i}:{method:"GET"},i!==void 0&&!n?Ku:jr("/",n));if(o.status===404){let I=await o.json().catch(()=>null);return{settings:(g=I==null?void 0:I.settings)!=null?g:null,exists:!1,payload:null,backups:[],safetyCopy:null,pinned:[],claim:Mt(I==null?void 0:I.claim),unapproved:[],install:$r(I==null?void 0:I.install),nudge:!1}}if(!o.ok)throw new Error(`Restore failed with HTTP ${o.status}.`);let r=await o.json(),s=Mt(r.claim),c=$r(r.install),l=r.nudge===!0,u=(b=r.settings)!=null?b:null;delete r.claim,delete r.install,delete r.nudge,delete r.settings;let d=[r,...(N=r.backup_history)!=null?N:[]];if(!d.every(I=>I.backup))return{exists:!0,payload:r,backups:d.slice(0,Ur),safetyCopy:(_=d[Ur])!=null?_:null,pinned:[],claim:s,unapproved:[],install:c,nudge:l,settings:u};let f=d.filter(I=>{var E;return((E=I.backup)==null?void 0:E.kind)==="rolling"}),y=(P=d.find(I=>{var E;return((E=I.backup)==null?void 0:E.kind)==="anchor"}))!=null?P:null,h=d.filter(I=>{var E;return((E=I.backup)==null?void 0:E.kind)==="pinned"}),k=d.filter(I=>{var E;return((E=I.backup)==null?void 0:E.kind)==="quarantined"}),v=(x=f[0])!=null?x:y;return v?f.length===0&&y?{exists:!0,payload:v,backups:[y],safetyCopy:null,pinned:h,claim:s,unapproved:k,install:c,nudge:l,settings:u}:{exists:!0,payload:v,backups:f,safetyCopy:y,pinned:h,claim:s,unapproved:k,install:c,nudge:l,settings:u}:{exists:!1,payload:null,backups:[],safetyCopy:null,pinned:h,claim:s,unapproved:k,install:c,nudge:l,settings:u}}async function zr(e,t,n){let i=await Me(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({item:n})},zu),o=await i.json().catch(()=>null);if(!i.ok||typeof(o==null?void 0:o.version)!="number")throw new Error(i.status===429?"Syncify can't delete more synced copies today. Try again tomorrow.":`Couldn't delete the synced copy with HTTP ${i.status}.`);return{version:o.version}}async function Fr(e,t,n,i){try{await Me(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:n}),keepalive:!0},jr(Hu,i))}catch(o){}}async function Me(e,t,n,i="",o=!1){var v,g,b,N,_;let r=i?`${e.replace(/\/+$/,"")}${i}`:e,s=(v=n.method)!=null?v:"GET",c=await se().catch(()=>null),l=c?await at(!1).catch(()=>null):null,u=await Tr(),d={},f=(g=await yn())!=null?g:$u;c&&l&&(d.authorization=`Bearer ${c.token}`,d[ki]=f,d[Ou]=await Nt(l.privateKey,f,s,r,(b=n.body)!=null?b:"")),u&&(d[ki]=f,d[Du]=u.publicKey,d[Uu]=await Nt(u.privateKey,f,s,r,(N=n.body)!=null?N:""));let y=await fetch(r,w(m({},n),{headers:m(w(m(m({},n.headers),await xr()),{[Lu]:t.hash,[Bu]:t.field}),d)})),h=y.headers.get(ki);if(h&&await mn(h),y.status===426)throw new _t;if(y.status!==401)return y;let k=(_=await y.clone().json().catch(()=>null))==null?void 0:_.code;if(!o){if(k==="stale_salt"&&(c||u))return Me(e,t,n,i,!0);if(k==="signed_out"&&c)return await qe(),Me(e,t,n,i,!0)}throw k==="claimed"||k==="not_owner"||k==="not_linked"?new ye(k):(k==="signed_out"&&await qe(),new B(typeof k=="string"?k:"failed"))}function jr(e,t){return t?`${e}?${Wu}=${encodeURIComponent(t)}`:e}function $r(e){let t=e;if(!t||typeof t.trust!="string")return null;let n=Array.isArray(t.waiting)?t.waiting:[];return{trusted:t.trust!=="pending"&&t.trust!=="rejected",refused:t.trust==="rejected",waiting:n.flatMap(i=>{let o=i;return o&&typeof o.id=="string"&&typeof o.first_seen_at=="number"?[{id:o.id,device:typeof o.device=="string"?o.device:null,first_seen_at:o.first_seen_at}]:[]})}}function Mt(e){let t=e;return!t||typeof t.mine!="boolean"?null:t.status==="final"?{status:"final",mine:t.mine}:t.status==="undone"?typeof t.undone_at=="number"?{status:"undone",mine:!1,email:typeof t.email=="string"?t.email:null,undone_at:t.undone_at}:null:t.status!=="pending"||typeof t.final_at!="number"?null:m({status:"pending",mine:t.mine,email:typeof t.email=="string"?t.email:null,final_at:t.final_at,held:t.held===!0},t.not_me===!0?{not_me:!0}:{})}async function hn(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return[...new Uint8Array(n)].map(i=>i.toString(16).padStart(2,"0")).join("")}function J(e){return JSON.stringify(xi(e))}function xi(e){return Array.isArray(e)?e.map(xi):e&&typeof e=="object"?Object.keys(e).sort().reduce((t,n)=>(t[n]=xi(e[n]),t),{}):e}function Wr(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var Yu="marketplace:installed:";function Vu(e){return{id:e.id,key:`${Yu}${e.id}`,name:e.name,kind:qu(e.id)}}function Lt(e){return new Map(e.map(t=>[t.id,Vu(t)]))}function qu(e){return/\.(m?js)$/i.test(e)?"extension":/\.css$/i.test(e)?"theme":"app"}var Gu="registry.json",Yr="settings-registry",Ju=1,Xu=3e3,Zu=["marketplace:","spicetify","syncify"],Qu=["spicetify","syncify"],ed="medium",Ci=null;function Re(){return Ci||(Ci=td().then(async e=>e?(await fe(Yr,e).catch(()=>{}),e):Gr(await be(Yr).catch(()=>{})))),Ci}async function td(){let e=typeof AbortController=="function"?new AbortController:null,t=setTimeout(()=>e==null?void 0:e.abort(),Xu);try{let n=await fetch(`${D().releasesUrl}/${Gu}`,{signal:e==null?void 0:e.signal});return n.ok?Gr(await n.json()):null}catch(n){return null}finally{clearTimeout(t)}}function Gr(e){if(!Je(e)||e.format!==Ju||!Array.isArray(e.items)||!Je(e.sizes))return null;let t={small:Number(e.sizes.small),medium:Number(e.sizes.medium),large:Number(e.sizes.large)},n=Number(e.accountLimit);return[...Object.values(t),n].every(o=>Number.isSafeInteger(o)&&o>0)?{items:e.items.flatMap(o=>{let r=nd(o,t);return r?[r]:[]}),accountLimit:n}:null}function nd(e,t){var l,u;if(!Je(e)||typeof e.id!="string"||!e.id)return null;let n=Vr(e.keys),i=Vr((l=e.exclude)!=null?l:[]),o=sd(e.storage),r=rd(e.lists),s=(u=e.size)!=null?u:ed;if(s!=="small"&&s!=="medium"&&s!=="large"||!n||!i||!o||!r||n.length===0||o.type==="localStorage"&&n.some(ad)||o.type==="indexedDB"&&Qu.some(d=>o.database.startsWith(d)))return null;let c=id(e.name)?e.name:od(e.id);return{id:e.id,name:c,keys:n,exclude:i,storage:o,lists:r,limit:t[s]}}function id(e){return typeof e=="string"&&e.length<=100&&/^\S(?:.*\S)?$/.test(e)}function od(e){var i;let t=(i=e.split("/").pop())!=null?i:e,n=t.replace(/\.[^.]+$/,"")||t;return n.charAt(0).toUpperCase()+n.slice(1)}function rd(e){if(e===void 0)return{};if(!Je(e))return null;let t={};for(let[n,i]of Object.entries(e))if(Je(i)&&i.merge==="object")t[n]={merge:"object"};else if(Je(i)&&i.merge==="array"&&Bt(i.id))t[n]={merge:"array",id:i.id};else return null;return t}function sd(e){return e===void 0?{type:"localStorage"}:Je(e)?e.type==="localStorage"?{type:"localStorage"}:e.type!=="indexedDB"||!Bt(e.database)||!Bt(e.store)||e.valueField!==void 0&&!Bt(e.valueField)?null:m({type:"indexedDB",database:e.database,store:e.store},e.valueField!==void 0?{valueField:e.valueField}:{}):null}function Vr(e){return Array.isArray(e)&&e.every(t=>Bt(t)&&/^[^*\s]+\*?$/.test(t))?e:null}function Le(e,t){return e.keys.some(n=>qr(n,t))&&!e.exclude.some(n=>qr(n,t))}function qr(e,t){return e.endsWith("*")?t.startsWith(e.slice(0,-1)):t===e}function ad(e){let t=e.endsWith("*")?e.slice(0,-1):e;return Zu.some(n=>t.startsWith(n)||e.endsWith("*")&&n.startsWith(t))}function Bt(e){return typeof e=="string"&&e.length>0}function Je(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}var cd=2e3,bn="restored-settings";async function Jr(e){await fe(bn,e).catch(()=>{})}async function lt(e){var i,o;let t={},n=new Set;for(let[r,s]of ld(e,es())){let c=window.localStorage.getItem(r);c!==null&&((o=t[i=s.id])!=null||(t[i]={storage:"localStorage",values:{}}),t[s.id].values[r]=c)}return await Promise.all(e.items.filter(r=>r.storage.type==="indexedDB").map(async r=>{let s=await fd(r);s===null?n.add(r.id):Object.keys(s).length>0&&(t[r.id]={storage:"indexedDB",values:s})})),{settings:t,unavailable:n}}function ld(e,t){var r,s;let n=new Map,i=[];for(let c of e.items)if(c.storage.type==="localStorage")for(let l of c.keys)l.endsWith("*")?i.push([l.slice(0,-1),c]):n.set(l,c);let o=new Map;for(let c of t){let l=(s=n.get(c))!=null?s:(r=i.find(([u])=>c.startsWith(u)))==null?void 0:r[1];l&&Le(l,c)&&o.set(c,l)}return o}async function wn(e,t,n){let i=n.flatMap(r=>{let s=e.items.find(l=>l.id===r),c=s?Qr(s,t[r]):null;return s&&c?[{item:s,saved:c}]:[]});for(let{item:r,saved:s}of i)r.storage.type==="indexedDB"&&await yd(r,s);let o=es();for(let{item:r,saved:s}of i)if(r.storage.type==="localStorage"){for(let c of o)Le(r,c)&&!(c in s)&&window.localStorage.removeItem(c);for(let[c,l]of Object.entries(s))window.localStorage.setItem(c,l)}}function ud(e,t,n){return t?e.items.flatMap(i=>{var c,l;let o=Qr(i,t[i.id]);if(!o||n.unavailable.has(i.id))return[];let r=(l=(c=n.settings[i.id])==null?void 0:c.values)!=null?l:{};return[...new Set([...Object.keys(o),...Object.keys(r)])].some(u=>!dd(i,o[u],r[u]))?[i.id]:[]}):[]}async function Xr(e){if(!e)return[];let t=await Re();if(!t)return[];let n=Lt(t.items);return ud(t,e,await lt(t)).flatMap(i=>{let o=n.get(i);return o?[o]:[]})}function Zr(e,t,n){let i=new TextEncoder,o=t+i.encode(`,${JSON.stringify("extension_settings")}:{}`).byteLength,r=Object.entries(e).map(([l,u])=>({id:l,entry:u,bytes:i.encode(`${JSON.stringify(l)}:${JSON.stringify(u)}`).byteLength})).sort((l,u)=>l.bytes-u.bytes||l.id.localeCompare(u.id)),s={},c=!0;for(let{id:l,entry:u,bytes:d}of r){let f=d+(c?0:1);if(o+f>n)break;o+=f,s[l]=u,c=!1}return s}function Qr(e,t){if(!t||typeof t!="object"||t.storage!==e.storage.type||!t.values||typeof t.values!="object"||Array.isArray(t.values))return null;let n={};for(let[i,o]of Object.entries(t.values))Le(e,i)&&((e.storage.type==="localStorage"?typeof o!="string":!Sn(o))||(n[i]=o));return Object.keys(n).length>0?n:null}function dd(e,t,n){if(t===void 0||n===void 0)return t===n;let i=e.storage.type==="indexedDB"?e.storage.valueField:void 0,o=r=>i&&r&&typeof r=="object"&&!Array.isArray(r)?r[i]:r;return J(o(t))===J(o(n))}function Sn(e){return e===null||typeof e=="string"||typeof e=="boolean"?!0:typeof e=="number"?Number.isFinite(e):Array.isArray(e)?e.every(Sn):typeof e=="object"&&Object.getPrototypeOf(e)===Object.prototype?Object.values(e).every(Sn):!1}function es(){let e=[];for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);n!==null&&e.push(n)}return e}async function fd(e){let t=e.storage;return ts(t,"readonly",(n,i)=>{let o={},r=n.openCursor();r.onsuccess=()=>{let s=r.result;if(!s)return i(o);let c=s.key;typeof c=="string"&&Le(e,c)&&Sn(s.value)&&(o[c]=s.value),s.continue()}}).catch(()=>null)}async function yd(e,t){let n=e.storage;if(await ts(n,"readwrite",(o,r)=>{let s=o.openCursor();s.onsuccess=()=>{let c=s.result;if(c){let l=c.key;typeof l=="string"&&Le(e,l)&&!(l in t)&&c.delete(),c.continue();return}for(let[l,u]of Object.entries(t))o.put(u,l);r(!0)}})===null)throw new Error("Syncify couldn't write an extension's settings. Restart Spotify and try again.")}function ts(e,t,n){let i;try{i=window.indexedDB}catch(r){return Promise.resolve(null)}if(!i)return Promise.resolve(null);let o=i;return new Promise((r,s)=>{let c=!1,l=null,u=y=>{c||(c=!0,clearTimeout(d),y())},d=setTimeout(()=>{u(()=>s(new Error("The extension's database took too long.")));try{l==null||l.abort()}catch(y){}},cd),f;try{f=o.open(e.database)}catch(y){u(()=>r(null));return}f.onupgradeneeded=()=>{var y;return(y=f.transaction)==null?void 0:y.abort()},f.onerror=()=>{let y=f.error;u(()=>(y==null?void 0:y.name)==="AbortError"?r(null):s(y))},f.onblocked=()=>u(()=>s(new Error("The extension's database is busy."))),f.onsuccess=()=>{let y=f.result;if(y.onversionchange=()=>y.close(),c||!y.objectStoreNames.contains(e.store)){y.close(),u(()=>r(null));return}try{let h=y.transaction(e.store,t);l=h;let k=null;n(h.objectStore(e.store),v=>{k=v}),h.oncomplete=()=>{y.close(),u(()=>r(k))},h.onerror=h.onabort=()=>{y.close(),u(()=>{var v;return s((v=h.error)!=null?v:new Error("IndexedDB failed."))})}}catch(h){y.close(),u(()=>s(h))}}})}var md=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,pd=100,gd="marketplace:installed-extensions",hd="marketplace:installed-themes",Sd="marketplace:theme-installed",bd="marketplace:installed:",wd="marketplace";function Ri(e){return Spicetify.Config?Ei(Spicetify.Config,e):null}function Ei(e,t){var r;let n=Ue(e),i=new Set(kd(t)),o=((r=t[Sd])==null?void 0:r.includes(bd))===!0;return{current_theme:o?wd:n.current_theme,color_scheme:o?"":n.color_scheme,extensions:n.extensions.filter(s=>!i.has(s)),custom_apps:n.custom_apps}}function Ue(e){let t=e&&typeof e=="object"?e:{};return{current_theme:Ii(t.current_theme)?t.current_theme:"",color_scheme:Ii(t.color_scheme)?t.color_scheme:"",extensions:ns(t.extensions),custom_apps:ns(t.custom_apps)}}function rs(e,t){return J(Ue(e))===J(Ue(t))}function ns(e){return Array.isArray(e)?[...new Set(e.filter(Ii))].sort().slice(0,pd):[]}function Ii(e){return typeof e=="string"&&md.test(e)}function kd(e){let t=is(e[gd]).map(i=>{var r;let o=(r=os(e[i]))==null?void 0:r.manifest;return o&&typeof o=="object"?o.main:void 0}),n=is(e[hd]).flatMap(i=>{var r;let o=(r=os(e[i]))==null?void 0:r.include;return Array.isArray(o)?o:[]});return[...t,...n].flatMap(i=>{let o=typeof i=="string"?i.split("/").pop():void 0;return o?[o]:[]})}function is(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function os(e){try{let t=e?JSON.parse(e):null;return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch(t){return null}}var vd=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],xd="marketplace:installed:",ss=`${xd}snippet:`,Cd="wsoltani/syncify",Id="marketplace",as={added:0,removed:1,unchanged:2};function ne(e){let t=new Map;for(let[n,i]of vd)for(let o of Pd(e[n]))t.has(o)||t.set(o,Ed(o,i,e[o]));return[...t.values()]}function xn(e,t,n,i){let o=new Set(e.map(l=>l.key)),r=new Map(n.map(l=>[l.key,l])),s=[...e.map(l=>{let u=r.get(l.key);return w(m({},l),{change:u?"unchanged":"added",isNew:!u||u.sources.join(" ")!==l.sources.join(" ")})}),...n.filter(l=>!o.has(l.key)).map(l=>w(m({},l),{change:Ot(l,e)?"unchanged":"removed",isNew:!1}))].sort((l,u)=>as[l.change]-as[u.change]||l.name.localeCompare(u.name)),c={added:0,removed:0,unchanged:0};for(let l of s)c[l.change]+=1;return{items:s,counts:c,manual:Rd(t,i)}}function Ot(e,t){return e.type==="extension"&&vn(e)&&!t.some(vn)}function vn(e){var t;return((t=e.repo)==null?void 0:t.toLowerCase())===Cd}function Rd(e,t){if(!e)return[];let n=Ue(e),i=Ue(t),o=[...n.extensions.filter(s=>!i.extensions.includes(s)).map(s=>({type:"extension",name:s})),...n.custom_apps.filter(s=>!i.custom_apps.includes(s)).map(s=>({type:"custom_app",name:s}))],r=n.current_theme;return r&&r!==Id&&(r!==i.current_theme||n.color_scheme!==i.color_scheme)&&o.push(m({type:"theme",name:r},n.color_scheme?{scheme:n.color_scheme}:{})),o}function Ed(e,t,n){var l,u;let i=cs(n),o=cs(i==null?void 0:i.manifest),r=kn(i==null?void 0:i.user),s=kn(i==null?void 0:i.repo),c=(u=(l=kn(i==null?void 0:i.title))!=null?l:kn(o==null?void 0:o.name))!=null?u:e.startsWith(ss)?e.slice(ss.length):e.split("/").pop()||e;return{key:e,type:t,name:c,repo:t!=="snippet"&&r&&s?`${r}/${s}`:null,sources:Nd(t,i),custom:t==="snippet"&&(i==null?void 0:i.custom)===!0}}function Nd(e,t){return t?(e==="extension"?[t.extensionURL]:e==="theme"?[t.cssURL,t.schemesURL,...Array.isArray(t.include)?t.include:[]]:[]).filter(i=>typeof i=="string"&&i!==""):[]}function kn(e){return typeof e=="string"&&e.trim()?e.trim():null}function Pd(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function cs(e){let t=e;if(typeof e=="string")try{t=JSON.parse(e)}catch(n){return null}return t&&typeof t=="object"&&!Array.isArray(t)?t:null}var Cn="spicetify-marketplace";var Dt="settings";async function ls(){let e=await fs();if(e.kind!=="ok")return null;try{let t=await ys(e.db,"readonly",i=>i.getAll());if(!t)return null;let n={};for(let i of t)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(n[i.key]=i.value);return n}finally{e.db.close()}}async function us(e,t=[]){let n=await fs();if(n.kind==="unavailable")return"unavailable";let i=n.kind==="ok"?n.db:await Td();if(!i)return"failed";try{return await ys(i,"readwrite",r=>{let s;for(let[c,l]of Object.entries(e))s=r.put({key:c,value:l});for(let c of t)s=r.delete(c);return s})===null?"failed":"written"}finally{i.close()}}function ds(){var e;try{return(e=window.indexedDB)!=null?e:null}catch(t){return null}}async function fs(){let e=ds();return e?await Ad(e)?{kind:"missing"}:new Promise(t=>{let n=!1,i=e.open(Cn);i.onupgradeneeded=()=>{n=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),t({kind:"unavailable"})},i.onblocked=()=>t({kind:"unavailable"}),i.onsuccess=()=>{let o=i.result;if(n){o.close(),_d(e).then(()=>t({kind:"missing"}));return}if(!o.objectStoreNames.contains(Dt)){o.close(),t({kind:"unavailable"});return}t({kind:"ok",db:o})}}):{kind:"unavailable"}}function Td(){let e=ds();return e?new Promise(t=>{let n=e.open(Cn,1);n.onupgradeneeded=()=>{let i=n.result;i.objectStoreNames.contains(Dt)||i.createObjectStore(Dt,{keyPath:"key"})},n.onerror=()=>{console.warn("Syncify could not create Marketplace storage",n.error),t(null)},n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}async function Ad(e){if(typeof e.databases!="function")return!1;try{return!(await e.databases()).some(n=>n.name===Cn)}catch(t){return!1}}function _d(e){return new Promise(t=>{let n=e.deleteDatabase(Cn);n.onsuccess=()=>t(),n.onerror=()=>t(),n.onblocked=()=>t()})}function ys(e,t,n){return new Promise(i=>{let o;try{o=e.transaction(Dt,t)}catch(u){console.warn("Syncify could not open a Marketplace transaction",u),i(null);return}let r,s=!1,c=u=>{s||(s=!0,i(u))};o.oncomplete=()=>c(r),o.onerror=()=>{console.warn("Syncify Marketplace transaction failed",o.error),c(null)},o.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",o.error),c(null)};let l;try{l=n(o.objectStore(Dt))}catch(u){console.warn("Syncify Marketplace request could not be issued",u),c(null);return}l&&(l.onsuccess=()=>{r=l.result},l.onerror=()=>{console.warn("Syncify Marketplace request failed",l.error),c(null)})})}var Ni="marketplace:",Rn=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function we(){let e=Fd(),t=await ls();if(t)for(let[n,i]of Object.entries(t))n.startsWith(Ni)&&(e[n]=i);return e}var Ld=new Set(["marketplace:active-tab","marketplace:sort"]),Pi="marketplace:installed:",In="marketplace:theme-installed",Bd=["stars","tags","lastUpdated","created"],Od=750*1024;async function En(e,t){let n={};for(let[i,o]of Object.entries(e))Ld.has(i)||(n[i]=i.startsWith(Pi)?Dd(o):o);return t&&(n.spicetify_config=Ue(t)),hn(J(n))}function Dd(e){try{let t=JSON.parse(e);if(!t||typeof t!="object"||Array.isArray(t))return e;for(let n of Bd)delete t[n];return t}catch(t){return e}}async function Nn(){let e=await we(),t=Ri(e);return{keyCount:Object.keys(e).length,hash:await En(e,t),installedItemCount:Kd(e),installedItems:Pn(e),items:ne(e),spicetifyConfig:t,marketplaceAvailable:zd(e),activeTheme:Ut(e[In])}}function Ut(e){if(!e)return null;if(e.startsWith(Pi))return e;try{let t=JSON.parse(e);return typeof t=="string"?t:null}catch(t){return null}}async function ms(){let[e,t]=await Promise.all([we(),Ud()]),n=Ri(e),i=m({schema_version:3,metadata:{last_sync_datetime:new Date().toISOString(),device_info:Wr(),marketplace_key_count:Object.keys(e).length},payload_hash:await En(e,n),marketplace_data:{keys:e}},n?{spicetify_config:n}:{});if(Object.keys(t).length===0)return i;let o=new TextEncoder().encode(JSON.stringify(i)).byteLength,r=Zr(t,o,Od);return Object.keys(r).length>0?w(m({},i),{extension_settings:r}):i}async function Ud(){try{let e=await Re();return e?(await lt(e)).settings:{}}catch(e){return{}}}async function ps(e,t=[]){var r,s;let n={},i=(s=(r=e.marketplace_data)==null?void 0:r.keys)!=null?s:{};for(let[c,l]of Object.entries(i))c.startsWith(Ni)&&(n[c]=l);if(Object.keys(n).length===0)return 0;await $d(n),t.length>0&&await Hd(n,t);let o=Ai(await we(),n);return await Ti(n,o),Object.keys(n).length}async function Ti(e,t=[]){for(let[i,o]of Object.entries(e))window.localStorage.setItem(i,o);for(let i of t)window.localStorage.removeItem(i);if(await us(e,t)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try again.")}function Ai(e,t){let n=new Set(Rn.flatMap(s=>{var c;return Tn((c=t[s])!=null?c:e[s]).map(String)})),i=Pn(e).filter(s=>s.startsWith(Pi)&&!n.has(s)),o=i.filter(s=>e[s]!==void 0&&t[s]===void 0),r=e[In];return r&&t[In]===void 0&&i.some(s=>r.includes(s))&&o.push(In),o}async function $d(e){let t=await we(),n=ne(e),i=ne(t).filter(s=>Ot(s,n));if(i.length===0)return;let o="marketplace:installed-extensions",r=Tn(e[o]).map(String);for(let s of i)r.includes(s.key)||r.push(s.key),e[s.key]=t[s.key];e[o]=JSON.stringify(r)}async function Hd(e,t){let n=await we(),i=Pn(n);for(let o of Rn){if(e[o]===void 0)continue;let r=Tn(e[o]).map(String).filter(s=>!t.includes(s)||i.includes(s));e[o]=JSON.stringify(r)}for(let o of t)n[o]!==void 0?e[o]=n[o]:delete e[o]}function Kd(e){return Pn(e).length}function Pn(e){return Rn.flatMap(t=>Tn(e[t]).map(String))}function zd(e){return!!(window.Marketplace||Rn.some(n=>e[n]!==void 0)||e["marketplace:tabs"]!==void 0)}function gs(e,t){return t===0?!1:e===0?!0:e<Math.max(2,Math.floor(t*.5))}function Fd(){let e={};for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);if(!(n!=null&&n.startsWith(Ni)))continue;let i=window.localStorage.getItem(n);i!==null&&(e[n]=i)}return e}function Tn(e){if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch(t){return[]}}var jd="raw.githubusercontent.com",Wd="cdn.jsdelivr.net",hs=".github.io";function Mi(e){var n;if(e.protocol!=="https:")return null;let t=e.pathname.split("/").filter(Boolean);if(e.host===jd)return _i(t[0],t[1]);if(e.host===Wd)return t[0]==="gh"?_i(t[1],(n=t[2])==null?void 0:n.split("@")[0]):null;if(e.host.endsWith(hs)){let i=e.host.slice(0,-hs.length);return i.includes(".")?null:_i(i,t.length>1?t[0]:e.host)}return null}function _i(e,t){return e&&t?`${e}/${t}`:null}var Yd={extension:"spicetify-extensions",theme:"spicetify-themes"},Vd="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",qd="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",Gd="https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/",Jd="https://api.github.com/repos",Xd=5e3,Zd=20,Ss="syncify:repo-topics",bs=10080*60*1e3,Qd=200;function ut(e){return(e==null?void 0:e.kind)==="host"||(e==null?void 0:e.kind)==="repo"||(e==null?void 0:e.kind)==="blocked"||(e==null?void 0:e.kind)==="catalog"}function dt(e){let t=new Map;for(let n of e){if(n.change==="removed")continue;if(n.custom){t.set(n.key,{kind:"custom"});continue}let i=ef(n);i&&t.set(n.key,i)}return t}async function ft(e,t){let n=new Map,i=e.filter(s=>s.change!=="removed"&&s.isNew&&!t.has(s.key));if(i.length===0)return n;let o=i.filter(s=>s.type==="snippet"),r=i.filter(s=>s.type!=="snippet");if(o.length>0){let s=await Li();for(let c of o)s?An(s,c.name)||n.set(c.key,{kind:"catalog"}):n.set(c.key,{kind:"unchecked"})}if(r.length>0){let s=await of(),c=af(),l=0;await Promise.all(r.map(async u=>{let d=tf(u),f=Yd[u.type];if(!d||!f)return;if(s===null){n.set(u.key,{kind:"unchecked"});return}if(nf(d,s)){n.set(u.key,{kind:"blocked"});return}let y=sf(c,d);y===void 0&&l<Zd&&(l+=1,y=await rf(d),y!==void 0&&(c[d.toLowerCase()]={topics:y,at:Date.now()})),y===void 0?n.set(u.key,{kind:"unchecked"}):(y===null||!y.includes(f))&&n.set(u.key,{kind:"catalog"})})),cf(c)}return n}function ef(e){let t=null;for(let n of e.sources){let i;try{i=new URL(n)}catch(r){return{kind:"host",host:n.slice(0,40)}}let o=Mi(i);if(!o)return{kind:"host",host:i.host};e.repo&&o.toLowerCase()!==e.repo.toLowerCase()&&(t!=null||(t=o))}return t?{kind:"repo",repo:t}:null}function tf(e){for(let t of e.sources)try{let n=Mi(new URL(t));if(n)return n}catch(n){}return e.repo}function nf(e,t){let n=`https://github.com/${e}`.toLowerCase();return t.some(i=>{let o=i.toLowerCase();if(!o.includes("*"))return o===n;let r=o.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${r}$`).test(n)})}function ws(e){return e.replace(/\n/g,"").trim().toLowerCase()}function An(e,t){return e.get(ws(t))}var $t=null,Ht=null;function of(){return $t!=null||($t=ks(Vd).then(e=>{let t=e==null?void 0:e.repos;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&!n.startsWith("//")):($t=null,null)})),$t}function Li(){return Ht!=null||(Ht=ks(qd).then(e=>{if(!Array.isArray(e))return Ht=null,null;let t=new Map;for(let n of e){if(typeof(n==null?void 0:n.title)!="string"||typeof n.code!="string")continue;let i=typeof n.preview=="string"?n.preview:null;t.set(ws(n.title),m({title:n.title,code:n.code,description:typeof n.description=="string"?n.description:""},i?{imageURL:i.startsWith("http")?i:`${Gd}${i}`}:{}))}return t})),Ht}async function rf(e){let t=await vs(`${Jd}/${e}`);if((t==null?void 0:t.status)===404)return null;if(!(t!=null&&t.ok))return;let n=await t.json().catch(()=>null);return Array.isArray(n==null?void 0:n.topics)?n.topics.filter(i=>typeof i=="string"):void 0}async function ks(e){let t=await vs(e);return t!=null&&t.ok?t.json().catch(()=>null):null}async function vs(e){let t=typeof AbortController=="function"?new AbortController:null,n=setTimeout(()=>t==null?void 0:t.abort(),Xd);try{return await fetch(e,{signal:t==null?void 0:t.signal})}catch(i){return null}finally{clearTimeout(n)}}function sf(e,t){let n=e[t.toLowerCase()];return n&&Date.now()-n.at<bs?n.topics:void 0}function af(){var e;try{let t=JSON.parse((e=localStorage.getItem(Ss))!=null?e:"{}");return t&&typeof t=="object"?t:{}}catch(t){return{}}}function cf(e){let t=Date.now(),n=Object.entries(e).filter(([,i])=>t-i.at<bs).sort(([,i],[,o])=>o.at-i.at).slice(0,Qd);try{localStorage.setItem(Ss,JSON.stringify(Object.fromEntries(n)))}catch(i){}}var lf=/^[0-9A-HJKMNP-TV-Z]{6}$/,uf=6,df="SYN-",Rs=60,Bi=20,Es=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],Xe="marketplace:theme-installed",xs="marketplace",Cs={added:0,removed:1,unchanged:2},ff=new RegExp(`^[a-z0-9][a-z0-9_-]{1,${Bi-2}}[a-z0-9]$`);function Oi(e){let t=e.trim().replace(/^@/,"").toLowerCase();return/[^a-z0-9_-]/.test(t)?"Only letters, digits, _ and -":t.length<3?"At least 3 characters":!/^[a-z0-9]/.test(t)||!/[a-z0-9]$/.test(t)?"Start and end with a letter or digit":null}function Ee(e){return`${df}${e}`}function Ns(e){let t=e.trim();if(t.length>200)return null;if(t.includes("/")){let i=t.split(/[?#]/)[0].replace(/\/+$/,"");t=i.slice(i.lastIndexOf("/")+1).replace(/\.json$/i,"")}t=t.toUpperCase().replace(/[\s-]/g,""),t.length===uf+3&&t.startsWith("SYN")&&(t=t.slice(3));let n=t.replace(/O/g,"0").replace(/[IL]/g,"1");return lf.test(n)?n:null}function Ps(e){let t=e;return!t||typeof t.code!="string"||!t.keys||typeof t.keys!="object"||!Object.values(t.keys).every(n=>typeof n=="string")?null:{code:t.code,name:typeof t.name=="string"&&t.name?t.name:null,creator:typeof t.creator=="string"&&ff.test(t.creator)?t.creator:null,updated_at:typeof t.updated_at=="number"?t.updated_at:0,keys:t.keys}}async function Ts(e,t){let n=e.filter(s=>!vn(s)).map(s=>w(m({},s),{change:"added",isNew:!0})),i=dt(n);for(let s of n)!i.has(s.key)&&!yf(s,t[s.key])&&i.set(s.key,{kind:"catalog"});let o=await ft(n,i),r=new Map;for(let[s,c]of[...o,...i])c.kind!=="unchecked"&&r.set(s,c);return{items:n,leftOut:r}}function yf(e,t){if(e.type==="snippet")return!0;if(!e.repo)return!1;let n=gf(t);return e.type==="extension"?typeof(n==null?void 0:n.extensionURL)=="string"&&n.extensionURL!=="":typeof(n==null?void 0:n.cssURL)=="string"&&n.cssURL!==""}function As(e,t){let n={};for(let[o,r]of Es){let s=t.filter(c=>c.type===r&&e[c.key]!==void 0).map(c=>c.key);n[o]=JSON.stringify(s);for(let c of s)n[c]=e[c]}let i=Ut(e[Xe]);return i&&t.some(o=>o.key===i)&&(n[Xe]=e[Xe]),n}function _s(e,t,n,i,o,r){let s=r==="replace"?xn(t,void 0,n,i):mf(t,n),c=Ut(e.keys[Xe]),l=c!==null&&t.some(d=>d.key===c)&&i!==null&&i.current_theme!==xs,u=c!==null&&c!==o?t.find(d=>d.key===c):void 0;return m(w(m({},s),{manual:l?[{type:"theme",name:xs}]:[]}),u?{theme:{key:u.key,name:u.name}}:{})}function mf(e,t){let n=new Set(t.map(s=>s.key)),i=new Set(e.map(s=>s.key)),o=[...e.map(s=>n.has(s.key)?w(m({},s),{change:"unchanged",isNew:!1}):w(m({},s),{change:"added",isNew:!0})),...t.filter(s=>!i.has(s.key)).map(s=>w(m({},s),{change:"unchanged",isNew:!1}))].sort((s,c)=>Cs[s.change]-Cs[c.change]||s.name.localeCompare(c.name)),r={added:0,removed:0,unchanged:0};for(let s of o)r[s.change]+=1;return{items:o,counts:r,manual:[]}}function Ms(e,t){return new Set(e.items.filter(n=>n.type==="snippet"&&n.change==="added"&&(!t||!An(t,n.name))).map(n=>n.key))}async function Ls(e,t,n,i){let o=await we(),r=ne(o),s=ne(e.keys),c={};for(let[f,y]of Es){let h=Is(o[f]),v=[...t==="add"?h:h.filter(g=>n.includes(g)||r.some(b=>b.key===g&&Ot(b,s)))];for(let g of s){if(g.type!==y||n.includes(g.key))continue;let b=h.includes(g.key);if(t==="add"&&b)continue;let N=y==="snippet"?pf(g,i,o[g.key]):e.keys[g.key];N!==void 0&&(c[g.key]=N,v.includes(g.key)||v.push(g.key))}c[f]=JSON.stringify(v)}let l=Ut(e.keys[Xe]),u=Is(c["marketplace:installed-themes"]);l&&u.includes(l)&&!n.includes(l)&&(c[Xe]=e.keys[Xe]);let d=Ai(o,c);return await Ti(c,d),Object.keys(c).length+d.length}function pf(e,t,n){let i=t?An(t,e.name):void 0;return i?JSON.stringify(m({code:i.code,title:i.title,description:i.description},i.imageURL?{imageURL:i.imageURL}:{})):n}function Is(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function gf(e){try{let t=e?JSON.parse(e):null;return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch(t){return null}}var Kt="/api/shares",hf=`${Kt}/update`,Sf=`${Kt}/delete`,bf=`${Kt}/import`,wf="x-syncify-user-hash",kf="discover/presets.json",vf={no_code:"This code doesn't exist.",too_many_codes:"You can't make more share codes. Delete one to make another.",daily_limit:"Too many changes to share codes today. Try again tomorrow.",too_large:"This setup is too big to share.",invalid_name:"Names can be up to 60 characters.",empty:"There's nothing to share yet. Install something from Marketplace first.",invalid_items:"Syncify couldn't read some items. Reload Spotify and try again.",source:"Some items don't load from GitHub. Reload Spotify and try again.",blocked:"Some items are on Marketplace's block list. Reload Spotify and try again.",custom_snippet:"Custom snippets can't be shared. Reload Spotify and try again.",unchecked:"Couldn't check Marketplace's block list. Try again in a minute.",publish_failed:"Couldn't publish the code. Press Update on it to try again.",delete_failed:"Couldn't delete the code. Try again.",same_setup:"You already shared this setup.",invalid_handle:"Handles are 3 to 20 letters, digits, _ or -, starting and ending with a letter or digit.",reserved_handle:"That handle isn't allowed. Pick another.",handle_taken:"That handle is taken. Pick another.",unavailable:"Share codes aren't available yet."},xf=new Set(["offline","signed_out","invalid_signature","stale_salt","no_device_key","too_many_requests"]);function zt(e,t=null){var n;return e instanceof B&&xf.has(e.code)?De(e):e instanceof B&&e.code==="too_many_codes"&&t!==null?`You have ${t} share codes already. Delete one to make another.`:(n=e instanceof B?vf[e.code]:void 0)!=null?n:"Something went wrong. Try again."}async function _n(){var t;let e=await Tt(Kt,"GET");return{codes:Array.isArray(e==null?void 0:e.codes)?e.codes.flatMap(n=>{let i=Cf(n);return i?[i]:[]}):[],newHearts:typeof(e==null?void 0:e.new_hearts)=="number"?e.new_hearts:0,max:typeof(e==null?void 0:e.max)=="number"?e.max:null,profile:typeof((t=e==null?void 0:e.profile)==null?void 0:t.handle)=="string"?{handle:e.profile.handle,link:typeof e.profile.link=="string"?e.profile.link:null}:null,suggestedHandle:typeof(e==null?void 0:e.suggested_handle)=="string"?e.suggested_handle:null}}async function Bs(e,t,n){return zs(await Tt(Kt,"POST",m({name:e,keys:t},n===void 0?{}:{handle:n})))}function Os(e){return`${D().shareUrl.replace(/\/+$/,"")}/@${e}`}async function Ds(e,t,n){return zs(await Tt(hf,"POST",{code:e,name:t,keys:n}))}async function Us(e){try{await Tt(Sf,"POST",{code:e})}catch(t){if(t instanceof B&&t.code==="no_code")return;throw t}}async function $s(e){let t=D().shareUrl.replace(/\/+$/,""),n;try{n=await fetch(`${t}/${e}.json`)}catch(o){throw new B("offline")}if(n.status===404||n.status===403)throw new B("no_code");if(!n.ok)throw new B("failed");let i=Ps(await n.json().catch(()=>null));if(!i||i.code!==e)throw new B("no_code");return i}async function Hs(){let e=D().shareUrl.replace(/\/+$/,"");try{let t=await fetch(`${e}/${kf}`);if(!t.ok)return null;let n=await t.json();return Array.isArray(n.posts)?n.posts.flatMap(i=>{let o=Rf(i);return o?[o]:[]}):null}catch(t){return null}}async function Ks(e,t,n=!1){try{await Dr(bf,m({code:e},n?{source:"preset"}:{}),{[wf]:t.hash})}catch(i){}}function Cf(e){let t=e;return!t||typeof t.code!="string"?null:{code:t.code,name:typeof t.name=="string"&&t.name?t.name:null,link:typeof t.link=="string"?t.link:null,item_count:typeof t.item_count=="number"?t.item_count:0,imports:typeof t.imports=="number"?t.imports:0,created_at:typeof t.created_at=="number"?t.created_at:0,updated_at:typeof t.updated_at=="number"?t.updated_at:0,posted:If(e.post)}}function If(e){let t=e==null?void 0:e.status;return typeof t=="string"&&t!=="removed"}function Rf(e){let t=e,n=i=>Number.isSafeInteger(i)&&i>=0?i:0;return!t||typeof t.code!="string"?null:{code:t.code,name:typeof t.name=="string"?t.name:Ee(t.code),extensions:n(t.extensions),themes:n(t.themes),snippets:n(t.snippets)}}function zs(e){let t=e;if(typeof(t==null?void 0:t.code)!="string")throw new B("failed");return{code:t.code,link:typeof t.link=="string"?t.link:null,leftOut:Array.isArray(t.left_out)?t.left_out.length:0}}var Fs="/claims",Ef="/claims/cancel",Nf={no_backup:"Back up first, then secure your backup.",unsupported_identity:"This Spotify account can't be secured.",too_many_accounts:"Your account already has 10 Spotify accounts linked.",undone:"This backup can't be secured with your account.",offline:"Couldn't reach Syncify. Check your connection and try again."},$e=class extends Error{constructor(n){var i;super((i=Nf[n])!=null?i:"Couldn't secure your backup. Try again.");this.code=n;this.name="ClaimError"}};async function js(e,t){let n=await Di(e,t,"GET",Fs);if(!n.ok)throw new $e(await Ui(n));let i=await n.json().catch(()=>null);return{claim:Mt(i==null?void 0:i.claim),accounts:Array.isArray(i==null?void 0:i.accounts)?i.accounts.filter(Pf):null}}async function Ws(e,t){let n=await Di(e,t,"POST",Fs);if(!n.ok)throw new $e(await Ui(n));let i=await n.json().catch(()=>null);return Mt(i==null?void 0:i.claim)}async function Ys(e,t){let n=await Di(e,t,"POST",Ef);if(n.status===404)return"cancelled";if(!n.ok)throw new $e(await Ui(n));let i=await n.json().catch(()=>null);return(i==null?void 0:i.held)===!0?"checking":"cancelled"}async function Di(e,t,n,i){try{return await Me(e,t,{method:n},i)}catch(o){throw o instanceof TypeError?new $e("offline"):o}}async function Ui(e){let t=await e.json().catch(()=>null);return typeof(t==null?void 0:t.code)=="string"?t.code:"failed"}function Pf(e){let t=e;return!!(t&&typeof t.hash=="string"&&(t.status==="pending"||t.status==="final"||t.status==="cancelled"||t.status==="unlinked"))}var Vs="[Syncify]";function ie(e,...t){console.debug(Vs,e,...t)}function ue(e,...t){console.warn(Vs,e,...t)}var mt={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},Tf=/^([a-z0-9]|f([1-9]|1[0-2]))$/,Af=250,_f=40,$i=null,Mn=null,yt=null;function qs(){return/mac/i.test(navigator.platform||navigator.userAgent)}function Gs(e){if(e===null)return null;if(!e||typeof e!="object")return mt;let t=e;return typeof t.key!="string"||!Tf.test(t.key)?mt:{key:t.key,ctrl:!!t.ctrl,alt:!!t.alt,shift:!!t.shift,meta:!!t.meta}}function Ft(e){if(!e)return"Off";let t=e.key.toUpperCase();return qs()?[e.ctrl?"\u2318":"",e.alt?"\u2325":"",e.shift?"\u21E7":"",t].join(""):[e.ctrl&&"Ctrl",e.meta&&"Win",e.alt&&"Alt",e.shift&&"Shift",t].filter(Boolean).join("+")}function Js(e){if(e.key==="Escape")return{kind:"cancel"};let t=Mf(e.code);if(!t)return{kind:"ignore"};let n=qs();if(n&&e.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:t,ctrl:n?e.metaKey:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:n?!1:e.metaKey},o=t.startsWith("f")&&t.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!o?{kind:"error",message:`Include ${n?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function Mf(e){var n,i;let t=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(e);return t?((i=(n=t[1])!=null?n:t[2])!=null?i:t[3]).toLowerCase():null}function Xs(e){var t;if(yt&&Lf(yt,e))return!1;try{let n=Spicetify.Mousetrap,i=(t=n.trigger)==null?void 0:t.call(n)._directMap;if(!i)return!1;let o=Hi(e);return Object.keys(i).some(r=>r.startsWith(`${o}:`))}catch(n){return!1}}function Ki(e,t,n=0){if($i=t,Mn=e,!Zs()){if(n>=_f){ue("Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>Ki(Mn,t,n+1),Af);return}zi(Mn)}function zi(e){if(Mn=e,!Zs()||!$i)return;let t=$i;try{if(yt&&Spicetify.Keyboard._deregisterShortcut(yt),yt=null,!e)return;Spicetify.Keyboard.registerShortcut(e,n=>{n.preventDefault(),t()}),yt=e,ie("Keyboard shortcut registered",Ft(e))}catch(n){ue("Failed to register keyboard shortcut",n)}}function Zs(){var e;return typeof((e=Spicetify.Keyboard)==null?void 0:e.registerShortcut)=="function"}function Hi(e){return[e.ctrl&&"mod",e.meta&&"meta",e.alt&&"alt",e.shift&&"shift",e.key].filter(Boolean).join("+")}function Lf(e,t){return Hi(e)===Hi(t)}var Fi="both",Bf=["both","topbar","menu"],jt=null,Wt=null,Ln=!1;function Qs(e){return Bf.includes(e)?e:Fi}function Bn(){var e;return typeof((e=Spicetify.Menu)==null?void 0:e.Item)=="function"}function ea(e){jt=e.topbarButton,Wt=e.menuItem}function On(e){let t=e!=="menu"||!Wt,n=e!=="topbar";if(jt!=null&&jt.element&&(jt.element.style.display=t?"":"none"),!!Wt)try{n&&!Ln?(Wt.register(),Ln=!0):!n&&Ln&&(Wt.deregister(),Ln=!1)}catch(i){ue("Failed to update profile menu item",i)}}var Dn="syncify:config",pt={workerUrl:D().workerUrl,autoBackupEnabled:!1,shortcut:mt,entryPoint:Fi,settingsSyncEnabled:!0,settingsSyncOff:[],shareRestoredSettings:!0};function q(){var n,i;let e=D(),t=(i=(n=Spicetify.LocalStorage)==null?void 0:n.get(Dn))!=null?i:window.localStorage.getItem(Dn);if(!t)return w(m({},pt),{workerUrl:e.workerUrl});try{let o=JSON.parse(t);return{workerUrl:e.workerUrl,autoBackupEnabled:ji(o.autoBackupEnabled,pt.autoBackupEnabled),shortcut:o.shortcut===void 0?pt.shortcut:Gs(o.shortcut),entryPoint:Qs(o.entryPoint),settingsSyncEnabled:ji(o.settingsSyncEnabled,pt.settingsSyncEnabled),settingsSyncOff:Of(o.settingsSyncOff),shareRestoredSettings:ji(o.shareRestoredSettings,pt.shareRestoredSettings)}}catch(o){return w(m({},pt),{workerUrl:e.workerUrl})}}function Ze(e){var n;let t=JSON.stringify({workerUrl:D().workerUrl,autoBackupEnabled:e.autoBackupEnabled,shortcut:e.shortcut,entryPoint:e.entryPoint,settingsSyncEnabled:e.settingsSyncEnabled,settingsSyncOff:e.settingsSyncOff,shareRestoredSettings:e.shareRestoredSettings});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set(Dn,t);return}window.localStorage.setItem(Dn,t)}function Of(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ji(e,t){return e===void 0?t:!!e}function Yt(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}var Df=["username","canonicalUsername","id","uri","displayName"];async function me(){let{value:e,field:t}=await Uf();return{hash:await hn(e),field:t}}async function Uf(){var o;let e=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let t=await e.getUser(),n=Df.find(r=>(t==null?void 0:t[r])!=null),i=n?t[n]:void 0;if(!n||!i)throw new Error("Unable to resolve the active Spotify user.");return{value:i,field:n}}async function qt(e,t){if(!Yt(e))throw new Error("Syncify backup service is not configured.");let[n,i]=await Promise.all([me(),ms()]);if(i.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:o,unapproved:r,settings:s}=await Hr(e.workerUrl,n,i,t==null?void 0:t.part);return{payload:i,unchanged:o,unapproved:r,settings:s}}async function Qe(e,t,n){var u;if(!Yt(e))throw new Error("Syncify backup service is not configured.");let i=await vi(e.workerUrl,await me(),t,n==null?void 0:n.part),[o,r,s,c]=await Promise.all([Promise.all(i.backups.map(Un)),i.safetyCopy?Un(i.safetyCopy):null,Promise.all(i.pinned.map(Un)),Promise.all(i.unapproved.map(Un))]),l=o.filter((d,f)=>o.findIndex(y=>y.payload_hash===d.payload_hash)===f);return w(m({},i),{payload:(u=l[0])!=null?u:null,backups:l,safetyCopy:r&&!l.some(d=>d.payload_hash===r.payload_hash)?r:null,pinned:s,unapproved:c.filter(d=>!l.some(f=>f.payload_hash===d.payload_hash))})}var Wi=new Map;async function Un(e){var r,s,c;let t=(s=(r=e.marketplace_data)==null?void 0:r.keys)!=null?s:{},n=e.spicetify_config?Ei(e.spicetify_config,t):void 0,i=`${e.payload_hash} ${(c=e.metadata)==null?void 0:c.last_sync_datetime}`,o=Wi.get(i);return o||(o=En(t,n),Wi.set(i,o),o.catch(()=>Wi.delete(i))),w(m(m({},e),n?{spicetify_config:n}:{}),{payload_hash:await o})}async function ta(e,t){let n=await vi(Gt(e),await me(),void 0,t==null?void 0:t.part);return{claim:n.claim,install:n.install,nudge:n.nudge,backups:n.backups,settings:n.settings}}async function na(e,t,n,i=[],o={ids:[],share:!1}){var l;let r=t!=null?t:(await Qe(e)).payload;if(!r)throw new Error("No Syncify cloud backup was found for this Spotify account.");await $f(r,o);let s=await ps(r,i),c=(l=r.backup)==null?void 0:l.id;return c&&Yt(e)&&me().then(u=>Fr(e.workerUrl,u,c,n)).catch(()=>{}),{payload:r,restoredCount:s}}async function $f(e,t){if(t.ids.length===0||!e.extension_settings)return;let n=await Re();n&&(await wn(n,e.extension_settings,t.ids),await Jr(m({at:Date.now()},t)))}var Vt=class extends Error{constructor(n){super("Couldn't back up your setup first, so nothing changed.");this.reason=n;this.name="SafetyBackupError"}};async function ia(e,t,n,i,o,r=!1){try{await qt(e)}catch(c){throw new Vt(c)}let s=await Ls(t,n,i,o);return me().then(c=>Ks(t.code,c,r)).catch(()=>{}),s}async function oa(e){let t=await me(),n=await js(Gt(e),t);return w(m({},n),{hash:t.hash})}async function ra(e){await Ws(Gt(e),await me())}async function $n(e,t,n){await Kr(Gt(e),await me(),t,n)}async function Hn(e){return Ys(Gt(e),await me())}function Gt(e){if(!Yt(e))throw new Error("Syncify backup service is not configured.");return e.workerUrl}var sa="syncify:nudge-hidden-until",aa="syncify:nudge-panel-shown";function ca(e=Date.now()){let t=Number(fa(sa));return Number.isFinite(t)&&t>e}function la(e=Date.now()){ya(sa,String(e+30*864e5))}function ua(){return fa(aa)!==null}function da(){ya(aa,"1")}function fa(e){var t,n;return(n=(t=Spicetify.LocalStorage)==null?void 0:t.get(e))!=null?n:window.localStorage.getItem(e)}function ya(e,t){var n;(n=Spicetify.LocalStorage)!=null&&n.set?Spicetify.LocalStorage.set(e,t):window.localStorage.setItem(e,t)}var pa="settings-sync",zn="syncify:settings-sync",Hf=17946e8,Kf={since:0,pulled:!1,firstSyncDone:!1,account:{},base:{},seen:{},heldSent:{},deleted:{}},ma={bytes:0,limit:0,items:[],choices:[],arrived:null,budgetDay:null},Yi=new Set;function Ne(){var t,n;let e=(n=(t=Spicetify.LocalStorage)==null?void 0:t.get(zn))!=null?n:window.localStorage.getItem(zn);if(!e)return ma;try{let i=JSON.parse(e);return{bytes:typeof i.bytes=="number"?i.bytes:0,limit:typeof i.limit=="number"?i.limit:0,items:Array.isArray(i.items)?i.items:[],choices:Array.isArray(i.choices)?i.choices:[],arrived:i.arrived&&Array.isArray(i.arrived.ids)?i.arrived:null,budgetDay:typeof i.budgetDay=="string"?i.budgetDay:null}}catch(i){return ma}}function gt(e){var n;let t=JSON.stringify(e);(n=Spicetify.LocalStorage)!=null&&n.set?Spicetify.LocalStorage.set(zn,t):window.localStorage.setItem(zn,t);for(let i of Yi)i(e)}function Wn(e){return Yi.add(e),()=>Yi.delete(e)}function ga(){let e=Ne();e.arrived&&gt(w(m({},e),{arrived:null}))}function ha(){let e=Ne();e.arrived&&gt(w(m({},e),{arrived:w(m({},e.arrived),{hidden:!0})}))}function Yn(e){return`${e.length>=3?`${e[0]}, ${e[1]} and ${e.length-2} more`:e.join(" and ")} ${e.length===1?"has":"have"} new extension settings`}async function Jt(e){var f;if(!e.settingsSyncEnabled||!await se().catch(()=>null))return null;let t=await Re();if(!t)return null;let n=await Xt(),i=await xa(t);await Ff(n,i);let o=Ne(),r=new Set(e.settingsSyncOff),s=new Set(o.choices.map(y=>y.id)),c=n.pulled&&o.budgetDay!==Na(Date.now()),l={},u=new Set;if(c)for(let y of t.items){let h=i.get(y.id);if(r.has(y.id)||s.has(y.id)||!h)continue;let k=jn(y,h);if(k>y.limit){n.heldSent[y.id]!==k&&(l[y.id]={held:k},u.add(y.id));continue}let v=(f=n.base[y.id])!=null?f:zf(n,y.id)?{}:void 0;if(v===void 0)continue;let g=Xf(y,h,v);g&&(l[y.id]=g,u.add(y.id))}return{part:JSON.stringify(w(m({since:n.since},u.size>0?{changes:l}:{}),{installed:[...i.keys()]})),registry:t,local:i,sent:u}}function zf(e,t){let n=e.account[t];return!n||n.off===!0||n.data===null}async function Ff(e,t){var i;let n=await be(bn).catch(()=>{});if(n){if(!n.share){for(let o of n.ids){e.base[o]=(i=t.get(o))!=null?i:{};let r=e.account[o];r!=null&&r.data&&(e.seen[o]=J(r.data))}await qn(e)}await cn(bn).catch(()=>{})}}var jf={arrived:[],choose:!1};async function Vn(e,t,n){let i=e?Wf(t):null;if(!e||!i)return jf;let{registry:o,local:r}=e,s=Date.now(),c=await Xt(),l=q(),u=new Set(l.settingsSyncOff),d=Ne(),f=[];for(let[g,b]of Object.entries(i.items))c.account[g]=b;c.since=i.version,c.pulled=!0;let y=new Set([...Object.entries(i.items).flatMap(([g,b])=>b.off?[g]:[]),...Object.entries(i.results).flatMap(([g,b])=>b==="off"?[g]:[])]);for(let g of y)c.deleted[g]!==void 0&&!u.has(g)||(u.add(g),Ea(c,g));for(let[g,b]of Object.entries(c.deleted))b<=i.version&&delete c.deleted[g];let h=new Map(o.items.map(g=>[g.id,g])),k=[];for(let g of o.items){let b=r.get(g.id);if(u.has(g.id)||!b)continue;let N=e.sent.has(g.id)?i.results[g.id]:void 0;if(N==="held"){c.heldSent[g.id]=jn(g,b);continue}if(jn(g,b)>g.limit||(delete c.heldSent[g.id],N!==void 0&&N!=="saved"))continue;let _=c.account[g.id];if(!(_!=null&&_.data)||_.off)continue;let P=Vi(_),x=J(_.data),I=c.base[g.id],E=async O=>{if(!Kn(g,b,P)){if(!await Ia(o,g,_))return;(O||!_.mine)&&f.push(g.id)}c.base[g.id]=P,c.seen[g.id]=x};N==="saved"?await E(!0):I===void 0?c.firstSyncDone||Kn(g,b,P)?await E(!1):k.push(g.id):c.seen[g.id]!==x&&Kn(g,b,I)&&await E(!1)}k.length===0&&(c.firstSyncDone=!0);let v=Lt(o.items);return await qn(c),u.size!==l.settingsSyncOff.length&&Ze(w(m({},l),{settingsSyncOff:[...u]})),gt(w(m({},va(o,c,r,v,i.bytes)),{choices:k.flatMap(g=>{var _;let b=v.get(g),N=h.get(g);return!b||!N?[]:[{id:g,name:b.name,kind:b.kind,localAt:Yf(N,(_=r.get(g))!=null?_:{},n,s),accountAt:Vf(c.account[g])}]}),arrived:Sa(d.arrived,f,v),budgetDay:i.budget==="used_up"?Na(s):null})),{arrived:f.map(g=>{var b,N;return(N=(b=v.get(g))==null?void 0:b.name)!=null?N:g}),choose:k.length>0}}function Sa(e,t,n){var r;if(t.length===0)return e;let i=[...new Set([...(r=e==null?void 0:e.ids)!=null?r:[],...t])],o=new Map(e?e.ids.map((s,c)=>[s,e.names[c]]):[]);return{ids:i,names:i.map(s=>{var c,l,u;return(u=(l=(c=n.get(s))==null?void 0:c.name)!=null?l:o.get(s))!=null?u:s}),hidden:!1}}function Wf(e){if(!pe(e)||e.status!=="ok"||!Number.isSafeInteger(e.version)||typeof e.bytes!="number")return null;let t={};for(let i of Array.isArray(e.items)?e.items:[]){if(!pe(i)||typeof i.id!="string"||typeof i.size!="number")continue;let o=pe(i.data)?i.data:null;t[i.id]=m(m(m({data:o,size:i.size},typeof i.held=="number"?{held:i.held}:{}),i.off===!0?{off:!0}:{}),i.mine===!0?{mine:!0}:{})}let n={};if(pe(e.results))for(let[i,o]of Object.entries(e.results))typeof o=="string"&&(n[i]=o);return{version:e.version,bytes:e.bytes,budget:e.budget==="used_up"?"used_up":"open",results:n,items:t}}async function ba(e){let t=await Re();if(!t)return;let n=await Xt(),i=Ne(),o=[];for(let[s,c]of Object.entries(e)){let l=t.items.find(d=>d.id===s),u=n.account[s];!l||!(u!=null&&u.data)||u.off||(c==="account"&&await Ia(t,l,u)&&o.push(s),n.base[s]=Vi(u),n.seen[s]=J(u.data))}n.firstSyncDone=!0,await qn(n);let r=new Map(i.choices.map(s=>[s.id,{id:s.id,key:"",name:s.name,kind:s.kind}]));gt(w(m({},i),{choices:[],arrived:Sa(i.arrived,o,r)}))}function Yf(e,t,n,i){var r;if(e.storage.type==="indexedDB"&&e.storage.valueField){let s=Object.values(t).flatMap(c=>pe(c)&&typeof c.ts=="number"?[c.ts]:[]);if(s.length>0)return Math.max(...s)}let o=i;for(let s of n){let c=(r=s.extension_settings)==null?void 0:r[e.id];if(!c||c.storage!==e.storage.type||!Kn(e,t,Ca(e,c.values)))break;let l=Date.parse(s.metadata.last_sync_datetime);if(Number.isNaN(l))break;o=l}return o}function Vf(e){var t;return Math.max(0,...Object.values((t=e==null?void 0:e.data)!=null?t:{}).map(n=>n.t))}async function wa(e,t){if(!e.workerUrl)throw new Error("Syncify backup service is not configured.");let{version:n}=await zr(e.workerUrl,await me(),t),i=await Xt();i.deleted[t]=n,i.account[t]={data:null,size:0,off:!0},Ea(i,t),await qn(i);let o=q();o.settingsSyncOff.includes(t)||Ze(w(m({},o),{settingsSyncOff:[...o.settingsSyncOff,t]}));let r=Ne();gt(w(m({},r),{items:r.items.map(s=>s.id===t?w(m({},s),{hold:null}):s)}))}async function ka(){let e=await Re();if(!e)return Ne().items;let[t,n]=await Promise.all([Xt(),xa(e)]),i=Lt(e.items),o=Ne(),r=va(e,t,n,i,o.bytes);return gt(m(m({},o),r)),r.items}function qf(e){return[...e].sort((t,n)=>+(n.hold!==null)-+(t.hold!==null)||t.name.localeCompare(n.name))}function va(e,t,n,i,o){let r=e.items.flatMap(s=>{var h;let c=n.get(s.id);if(!c)return[];let l=jn(s,c),u=t.account[s.id],d=l>s.limit?{size:l,reason:"too_big"}:(u==null?void 0:u.held)!==void 0&&!u.off?{size:u.held,reason:u.held>s.limit?"too_big":"account_full"}:null,f=(h=i.get(s.id))!=null?h:{id:s.id,key:"",name:s.id,kind:"extension"},y=u&&!u.off?u.size:0;return[w(m({},f),{size:l,limit:s.limit,list:Object.keys(s.lists).length>0,accountSize:y,hold:d})]});return{bytes:o,limit:e.accountLimit,items:qf(r)}}async function xa(e){let{settings:t}=await lt(e),n=new Map;for(let i of e.items){let o=t[i.id];o&&n.set(i.id,Ca(i,o.values))}return n}function Ca(e,t){var i;let n={};for(let[o,r]of Object.entries(t))Le(e,o)&&(n[o]=e.lists[o]&&(i=Gf(e,o,r))!=null?i:r);return n}function Gf(e,t,n){let i=e.lists[t],o=n;if(e.storage.type==="localStorage"){if(typeof n!="string")return null;try{o=JSON.parse(n)}catch(r){return null}}else e.storage.valueField&&pe(n)&&(o=n[e.storage.valueField]);return Fn(i,o)?o:null}function Fn(e,t){return e?e.merge==="object"?pe(t):Array.isArray(t):!1}function Jf(e,t,n){let i={};for(let[o,r]of Object.entries(t)){if(!Le(e,o))continue;let s=e.lists[o]&&Fn(e.lists[o],r);e.storage.type==="localStorage"?s?i[o]=JSON.stringify(r):typeof r=="string"&&(i[o]=r):s&&e.storage.valueField?i[o]=w(m({},pe(n[o])?n[o]:{}),{[e.storage.valueField]:r}):i[o]=r}return i}async function Ia(e,t,n){var c,l;let{settings:i}=await lt(w(m({},e),{items:[t]})),o=(l=(c=i[t.id])==null?void 0:c.values)!=null?l:{},r=Jf(t,Vi(n),o);if(Object.keys(r).length===0)return!1;let s={[t.id]:{storage:t.storage.type,values:r}};try{return await wn(e,s,[t.id]),!0}catch(u){return!1}}function Vi(e){var n;let t={};for(let[i,o]of Object.entries((n=e.data)!=null?n:{}))pe(o)&&o.v!==null&&o.v!==void 0&&(t[i]=o.v);return t}function jn(e,t){let n={};for(let[i,o]of Object.entries(t))n[i]={v:o,t:Hf};return Object.keys(n).length===0?0:new TextEncoder().encode(JSON.stringify(n)).byteLength}function Kn(e,t,n){return[...new Set([...Object.keys(t),...Object.keys(n)])].every(o=>Ra(e,o,t[o],n[o]))}function Ra(e,t,n,i){if(n===void 0||i===void 0)return n===i;let o=e.storage.type==="indexedDB"&&!e.lists[t]?e.storage.valueField:void 0,r=s=>o&&pe(s)?s[o]:s;return J(r(n))===J(r(i))}function Xf(e,t,n){let i={},o={};for(let s of new Set([...Object.keys(t),...Object.keys(n)])){let c=t[s],l=n[s];if(Ra(e,s,c,l))continue;let u=e.lists[s],d=u&&c!==void 0?Zf(u,c,l):null;d?o[s]=d:i[s]=c===void 0?null:c}let r=m(m({},Object.keys(i).length>0?{set:i}:{}),Object.keys(o).length>0?{lists:o}:{});return Object.keys(r).length>0?r:null}function Zf(e,t,n){if(!Fn(e,t))return null;let i=Fn(e,n)?n:e.merge==="object"?{}:[];if(e.merge==="object"){let d=t,f=i,y=Object.fromEntries(Object.entries(d).filter(([k,v])=>J(v)!==J(f[k]))),h=Object.keys(f).filter(k=>!(k in d));return m(m({},Object.keys(y).length>0?{put:y}:{}),h.length>0?{remove:h}:{})}let o=d=>{let f=pe(d)?d[e.id]:void 0;return typeof f=="string"||typeof f=="number"?f:null},r=t;if(r.some(d=>o(d)===null))return null;let s=new Map(i.flatMap(d=>o(d)===null?[]:[[JSON.stringify(o(d)),d]])),c=r.filter(d=>J(d)!==J(s.get(JSON.stringify(o(d))))),l=new Set(r.map(d=>JSON.stringify(o(d)))),u=[...s.entries()].filter(([d])=>!l.has(d)).flatMap(([,d])=>{var f;return(f=o(d))!=null?f:[]});return m(m({},c.length>0?{put:c}:{}),u.length>0?{remove:u}:{})}async function Xt(){let e=await be(pa).catch(()=>{});return m(m({},structuredClone(Kf)),pe(e)?e:{})}function qn(e){return fe(pa,e)}function Ea(e,t){delete e.base[t],delete e.seen[t],delete e.heldSent[t]}function Na(e){return new Date(e).toISOString().slice(0,10)}function pe(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}var qi="syncify:claim-check-day",Pa="syncify:undone-claim-shown";async function Ta(e){var n,i;let t=q();if(ga(),!!t.workerUrl){if(!t.autoBackupEnabled)return Qf(e);try{let o=await Jt(t).catch(()=>null),[r,s]=await Promise.all([Nn(),Qe(t,void 0,o)]),c=await Aa(o,s);_a(s,e,c);let l=(i=(n=s.payload)==null?void 0:n.metadata.marketplace_key_count)!=null?i:0;if(s.exists&&gs(r.keyCount,l)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(s.backups.some(d=>d.payload_hash===r.hash)||r.keyCount===0)return;let{unapproved:u}=await qt(t);Spicetify.showNotification(u?"Syncify: backed up, waiting for approval":"Syncify auto-backup complete")}catch(o){if(o instanceof ye||o instanceof Ge){Spicetify.showNotification("Syncify: sign in to keep backing up",!0,8e3);return}let r=o instanceof Error?o.message:String(o);console.warn("Syncify startup sync failed:",o),Spicetify.showNotification(`Syncify auto-sync skipped: ${r}`,!0,8e3)}}}async function Qf(e){let t=new Date().toLocaleDateString("en-CA");if(Ma(qi)!==t)try{let n=q(),i=await Jt(n).catch(()=>null),o=await ta(n,i);Gi(qi,t);let r=await Aa(i,o);_a(o,e,r)}catch(n){if(n instanceof ye){Gi(qi,t);return}console.warn("Syncify claim check failed:",n)}}async function Aa(e,t){if(!e)return!1;try{let n=await Vn(e,t.settings,t.backups);return n.arrived.length>0&&Spicetify.showNotification(Yn(n.arrived)),n.choose}catch(n){return console.warn("Syncify extension settings sync failed:",n),!1}}function _a(e,t,n){var s;let i=ey(e.claim),o=ty(e.claim),r=(s=e.install)==null?void 0:s.waiting[0];i?t.onClaim(i):o?t.onUndone(o)&&Gi(Pa,String(o.undone_at)):r?t.onInstall(r):e.nudge&&!ua()?t.onNudge():n&&t.onFirstSync()}function ey(e){return(e==null?void 0:e.status)==="pending"&&!e.mine&&!e.not_me?e:null}function ty(e){return(e==null?void 0:e.status)==="undone"&&Ma(Pa)!==String(e.undone_at)?e:null}function Ma(e){var t,n;return(n=(t=Spicetify.LocalStorage)==null?void 0:t.get(e))!=null?n:window.localStorage.getItem(e)}function Gi(e,t){var n;(n=Spicetify.LocalStorage)!=null&&n.set?Spicetify.LocalStorage.set(e,t):window.localStorage.setItem(e,t)}var Xi="syncify:pending-restore",ny=600*1e3,iy=2e3,oy=15e3,ry="marketplace:theme-installed",sy="raw.githubusercontent.com",ay=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],Pe=null,Ji=new Set,Oa=new Map;function Da(){return Pe}function Ua(e){return Ji.add(e),()=>Ji.delete(e)}function $a(){Pe&&ja(w(m({},Pe),{manual:[]}))}function Qt(e,t="restore"){try{localStorage.setItem(Xi,JSON.stringify({at:Date.now(),manual:e,kind:t}))}catch(n){}}function Ha(){var e;Qt((e=Pe==null?void 0:Pe.manual)!=null?e:[],Pe==null?void 0:Pe.kind),window.location.reload()}function Ka(){Wa()&&(document.addEventListener("load",e=>La(e.target,"load"),!0),document.addEventListener("error",e=>La(e.target,"error"),!0))}async function za(){let e=Wa();if(!e)return;try{localStorage.removeItem(Xi)}catch(s){}let t=Date.now(),n=await Ba();for(;n.loaded<n.total&&Date.now()-t<oy;)await new Promise(s=>setTimeout(s,iy)),n=await Ba();ja(w(m({kind:e.kind,at:Date.now()},n),{manual:e.manual}));let i=n.loaded===n.total&&e.manual.length===0,o=e.kind==="share"?"Setup applied":"Backup restored",r=e.kind==="share"?"loaded":"restored";Spicetify.showNotification(i?`Syncify: ${o}; ${n.total} ${n.total===1?"item":"items"}`:`Syncify: ${r} ${n.loaded} of ${n.total}. Open Syncify for details.`,!1,8e3)}function Fa(e){let t=e.map(n=>n.type==="extension"?`spicetify config extensions ${Gn(n.name)}`:n.type==="custom_app"?`spicetify config custom_apps ${Gn(n.name)}`:`spicetify config current_theme ${Gn(n.name)}${n.scheme?` color_scheme ${Gn(n.scheme)}`:""}`);return t.length>0?[...t,"spicetify apply"]:[]}function Gn(e){return/^[\w.@+/-]+$/.test(e)?e:`"${e}"`}function ja(e){Pe=e;for(let t of Ji)t(e)}function Wa(){var e;try{let t=JSON.parse((e=localStorage.getItem(Xi))!=null?e:"null");return!t||Date.now()-t.at>ny?null:{manual:Array.isArray(t.manual)?t.manual:[],kind:t.kind==="share"?"share":"restore"}}catch(t){return null}}function La(e,t){e instanceof HTMLScriptElement&&e.src&&Oa.set(Zt(e.src),t)}async function Ba(){var i;let e=await we(),t=(i=e[ry])!=null?i:"",n=ne(e).filter(o=>o.type==="extension"&&o.sources.length>0||o.type==="theme"&&t.includes(o.key)||o.type==="snippet");return{loaded:n.filter(cy).length,total:n.length}}function cy(e){var t,n;if(e.type==="snippet"){let i=document.querySelector("style.marketplaceSnippets");return((t=i==null?void 0:i.textContent)==null?void 0:t.includes(`/* ${e.name} - `))===!0}if(e.type==="theme"){let i=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((n=i==null?void 0:i.textContent)!=null&&n.trim())}return ly(e.sources[0]).some(uy)}function ly(e){let t;try{t=new URL(e)}catch(s){return[]}if(t.host!==sy)return[Zt(t.href)];let[n,i,o,...r]=t.pathname.split("/").filter(Boolean);return!n||!i||!o||r.length===0?[]:ay.map(s=>Zt(`https://${s}/gh/${n}/${i}@${o}/${r.join("/")}`))}function uy(e){let t=Oa.get(e);return t?t==="load":[...document.querySelectorAll("script[src]")].some(i=>Zt(i.src)===e)&&performance.getEntriesByType("resource").some(i=>Zt(i.name)===e)}function Zt(e){try{let t=new URL(e);return`${t.origin}${t.pathname}`}catch(t){return e}}var Zi=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var Ya=".main-actionButtons",fy=".Root__globalNav, .Root__top-bar",yy=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function Va(e){let t=new Spicetify.Topbar.Button(D().extensionName,Zi,e,!1,!0);return qa(t),my(t),t}function qa(e){var t;e.element.style.setProperty("-webkit-app-region","no-drag"),(t=e.button)==null||t.style.setProperty("-webkit-app-region","no-drag")}function my(e){if(typeof MutationObserver=="undefined")return;let t=!1,n=null,i=()=>{t=!1,r();let s=e.element,c=document.querySelector(Ya);!s||!c||c.contains(s)||(c.prepend(s),py(e),qa(e),ie("Topbar button re-attached"))},o=new MutationObserver(()=>{t||(t=!0,setTimeout(i,250))}),r=()=>{var l;if(n!=null&&n.isConnected)return;let s=document.querySelector(Ya),c=(l=s==null?void 0:s.closest(fy))!=null?l:s==null?void 0:s.parentElement;if(o.disconnect(),n=c!=null?c:null,!c){o.observe(document.body,{childList:!0,subtree:!0});return}o.observe(c,{childList:!0,subtree:!0});for(let u=c.parentElement;u;u=u.parentElement)o.observe(u,{childList:!0})};i()}function py(e){let t=e.button;if(!t||t.className&&t.className!=="undefined")return;let n=Array.from(document.querySelectorAll(yy)).find(i=>!e.element.contains(i));n!=null&&n.className&&(t.className=n.className)}function Ga(e){if(!Bn())return null;try{return new Spicetify.Menu.Item(D().extensionName,!1,e,gy())}catch(t){return ue("Failed to create profile menu item",t),null}}function gy(){return Zi.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}var hy="syncify:beta",Ja=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function Xa(){var e;return(e=window.SyncifyLoader)!=null?e:null}function Sy(){try{return window.localStorage.getItem(hy)==="true"}catch(e){return!1}}async function Za(e){let t=Sy()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(t.map(i=>by(`${e}/${i}`)))).reduce((i,o)=>o&&(!i||eo(o,i)>0)?o:i,null)}function Qi(e){return typeof e=="string"&&Ja.test(e)}function eo(e,t){let[n,i]=[e,t].map(o=>{var u;let[,r,s,c,l]=(u=Ja.exec(o))!=null?u:[];return[r,s,c,l!=null?l:1/0].map(Number)});for(let o=0;o<n.length;o+=1)if(n[o]!==i[o])return n[o]<i[o]?-1:1;return 0}async function by(e,t=3e3){let n=typeof AbortController=="function"?new AbortController:null,i=setTimeout(()=>n==null?void 0:n.abort(),t);try{let o=await fetch(e,{signal:n==null?void 0:n.signal});if(!o.ok)return null;let r=await o.json();return Qi(r==null?void 0:r.version)?r.version:null}catch(o){return null}finally{clearTimeout(i)}}function ht(...e){return e.filter(Boolean).join(" ")}function to(e,t){return t===void 0?e:w(m({},e),{key:t})}function a(e,t,n){let r=t,{children:i}=r,o=Se(r,["children"]);return i===void 0?Rt(e,to(o,n)):Rt(e,to(o,n),i)}function p(e,t,n){let s=t,{children:i}=s,o=Se(s,["children"]),r=Array.isArray(i)?i:[i];return Rt(e,to(o,n),...r)}var wy={primary:"regular",secondary:"regular",danger:"regular",text:"small",subtle:"small"};function C(e){let l=e,{variant:t="primary",size:n=wy[t],type:i="button",icon:o,children:r,className:s}=l,c=Se(l,["variant","size","type","icon","children","className"]);return p("button",w(m({className:ht("syncify-btn",s),"data-variant":t,"data-size":n,type:i},c),{children:[o,a("span",{className:"syncify-cap",children:r})]}))}function no(e){return a("input",{className:"syncify-checkbox",type:"checkbox","aria-label":e.label,checked:e.checked,onChange:t=>e.onChange(t.currentTarget.checked),disabled:e.disabled})}function io(e){return p("label",{className:"syncify-checkbox-row","data-disabled":e.disabled?"true":void 0,children:[a("input",{className:"syncify-checkbox",type:"checkbox",checked:e.checked,onChange:t=>e.onChange(t.currentTarget.checked),disabled:e.disabled}),a("span",{className:"syncify-checkbox-label",children:e.label})]})}var ky=0;function F(e){let[t]=S(()=>`syncify-${e}-${++ky}`);return t}function Jn(e){return p("div",{className:"syncify-dialog-content",children:[a("h2",{className:"syncify-dialog-title",id:e.titleId,children:e.title}),e.children?a("div",{className:"syncify-dialog-text",children:e.children}):null,a("div",{className:"syncify-dialog-actions",children:e.actions})]})}function en(e){let t=z(null),n=F("dialog"),{open:i}=e,o=z(e.onClose);return Et(()=>{o.current=e.onClose}),A(()=>{let r=t.current;if(!r||!i)return;let s=document.activeElement;r.open||r.showModal();let c=l=>{l.preventDefault(),o.current()};return r.addEventListener("cancel",c),()=>{r.removeEventListener("cancel",c),r.open&&r.close(),s instanceof HTMLElement&&s.isConnected&&s.focus()}},[i]),i?a("dialog",{className:"syncify-dialog","data-width":e.wide?"wide":void 0,ref:t,"aria-labelledby":n,children:a(Jn,{title:e.title,actions:e.actions,titleId:n,children:e.children})}):null}function Be(e){var o,r;let t=F("field"),n=`${t}-error`,i=!!e.error;return p("div",{className:"syncify-field-group",children:[a("label",{className:"syncify-field-label",htmlFor:t,children:e.label}),p("div",{className:"syncify-field-row",children:[p("span",{className:"syncify-input-box","data-invalid":i?"true":void 0,"data-disabled":e.disabled?"true":void 0,children:[e.prefix?a("span",{className:"syncify-input-prefix","aria-hidden":"true",children:e.prefix}):null,a("input",{className:"syncify-input-control",id:t,type:(o=e.type)!=null?o:"text",value:e.value,onChange:s=>e.onChange(s.currentTarget.value),onBlur:e.onBlur,placeholder:e.placeholder,inputMode:e.inputMode,autoComplete:(r=e.autoComplete)!=null?r:"off",spellCheck:!1,maxLength:e.maxLength,disabled:e.disabled,autoFocus:e.autoFocus,"aria-invalid":i||void 0,"aria-describedby":i?n:void 0,"data-mono":e.mono?"true":void 0})]}),e.action]}),i?a("span",{className:"syncify-field-error",id:n,role:"alert",children:e.error}):null]})}function He(e){let o=e,{children:t,className:n}=o,i=Se(o,["children","className"]);return a("svg",w(m({className:ht("syncify-icon",n),viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},i),{children:t}))}function Qa(e){return a(He,w(m({},e),{children:a("path",{d:"m9 6 6 6-6 6"})}))}function ec(e){return p(He,w(m({},e),{children:[a("path",{d:"M7 7h10v10"}),a("path",{d:"M7 17 17 7"})]}))}function tc(e){return a(He,w(m({},e),{children:a("path",{d:"m6 9 6 6 6-6"})}))}function Oe(e){return a(He,w(m({},e),{children:a("path",{d:"M5 12.5l4.5 4.5L19 7.5"})}))}function oo(e){return a(He,w(m({},e),{children:a("path",{d:"M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z"})}))}function ro(e){return p(He,w(m({},e),{children:[a("path",{d:"M12 17v5"}),a("path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"})]}))}function nc(e){return p(He,w(m({},e),{"data-filled":"true",children:[a("rect",{x:"4",y:"10.5",width:"3",height:"3",rx:"0.75"}),a("rect",{x:"10.5",y:"10.5",width:"3",height:"3",rx:"0.75"}),a("rect",{x:"17",y:"10.5",width:"3",height:"3",rx:"0.75"})]}))}function so(e){return p(He,w(m({},e),{children:[a("path",{d:"M12 6v7"}),a("path",{d:"M12 17.5v.5"})]}))}function ao(e){let o=e,{keys:t,recording:n}=o,i=Se(o,["keys","recording"]);return a("button",w(m({className:"syncify-keycap",type:"button","data-recording":n?"true":void 0},i),{children:a("span",{className:"syncify-cap",children:t})}))}function G(e){return a("ul",{className:"syncify-list","aria-label":e.label,"aria-busy":e.busy?"true":void 0,"data-wrap":e.wrap?"true":void 0,children:e.children})}function Ke(){return a("li",{className:"syncify-list-divider",role:"presentation"})}function j(e){let t=p(M,{children:[e.leading?a("span",{className:"syncify-row-leading",children:e.leading}):null,p("span",{className:"syncify-row-name",children:[a("span",{className:"syncify-row-name-text",children:e.name}),e.nameMark]}),e.meta?a("span",{className:"syncify-row-meta",children:e.meta}):null,e.end?a("span",{className:"syncify-row-end",children:e.end}):null]}),n=e.meta?"2":"1";return a("li",{className:"syncify-list-item",children:e.onOpen?p("button",{className:"syncify-row",id:e.id,"data-lines":n,type:"button","aria-label":e.openLabel,onClick:e.onOpen,disabled:e.disabled,children:[t,e.external?a(ec,{className:"syncify-row-chevron"}):a(Qa,{className:"syncify-row-chevron"})]}):a("div",{className:"syncify-row",id:e.id,"data-lines":n,"data-plain":e.plain?"true":void 0,children:t})})}function ke(e){return a("span",{className:"syncify-mark-square","data-tone":e.tone,"data-size":e.icon?"large":"small",role:e.label?"img":void 0,"aria-label":e.label,"aria-hidden":e.label?void 0:"true",children:e.icon})}function co(e){return a("span",{className:"syncify-badge",role:"img","aria-label":e.label,children:a("span",{className:"syncify-cap",children:e.count})})}function ve(e){let t=F("menu"),[n,i]=S(!1),o=z(null),r=z(null),s=e.items.some(f=>f.checked!==void 0);A(()=>{var b,N;let f=r.current,y=o.current;if(!n||!f||!y)return;xy(f),Ry(f,y);let h=ic(f);(N=(b=h.find(_=>_.getAttribute("aria-checked")==="true"))!=null?b:h[0])==null||N.focus();let k=()=>i(!1),v=_=>{let P=_.target;P instanceof Node&&!f.contains(P)&&!y.contains(P)&&k()},g=_=>{_.target instanceof Node&&f.contains(_.target)||k()};return document.addEventListener("pointerdown",v,!0),document.addEventListener("scroll",g,!0),window.addEventListener("resize",k),()=>{document.removeEventListener("pointerdown",v,!0),document.removeEventListener("scroll",g,!0),window.removeEventListener("resize",k),Cy(f)}},[n]);function c(){var f;i(!1),(f=o.current)==null||f.focus()}function l(f){let y=ic(f.currentTarget),h=y.findIndex(v=>v===document.activeElement),k=f.key==="ArrowDown"?y[(h+1)%y.length]:f.key==="ArrowUp"?y[(h-1+y.length)%y.length]:f.key==="Home"?y[0]:f.key==="End"?y[y.length-1]:null;k?(f.preventDefault(),k.focus()):f.key==="Escape"?(f.preventDefault(),c()):f.key==="Tab"&&i(!1)}function u(f){(f.key==="ArrowDown"||f.key==="ArrowUp")&&(f.preventDefault(),i(!0))}let d={ref:o,type:"button","aria-haspopup":"menu","aria-expanded":n,"aria-controls":n?t:void 0,disabled:e.disabled,onClick:()=>i(!n),onKeyDown:u};return p(M,{children:[e.trigger==="more"?a("button",w(m({className:"syncify-icon-btn","aria-label":e.label},d),{children:a(nc,{})})):p("button",w(m({className:"syncify-menu-value","aria-label":`${e.label}: ${e.trigger.value}`},d),{children:[a("span",{className:"syncify-cap",children:e.trigger.value}),a(tc,{})]})),n?a("div",{className:"syncify-menu",id:t,ref:r,role:"menu","aria-label":e.label,popover:"manual",onKeyDown:l,children:e.items.map(f=>a(vy,{item:f,picks:s,onPick:()=>{c(),f.onSelect()}},f.label))}):null]})}function vy(e){let{item:t,picks:n}=e;return p("button",{className:"syncify-menu-item",type:"button",role:n?"menuitemradio":"menuitem","aria-checked":n?t.checked===!0:void 0,"data-danger":t.danger?"true":void 0,tabIndex:-1,disabled:t.disabled,onClick:e.onPick,children:[a("span",{className:"syncify-cap",children:t.label}),t.checked?a(Oe,{}):null]})}function ic(e){return[...e.querySelectorAll(".syncify-menu-item:not(:disabled)")]}function xy(e){typeof e.showPopover=="function"&&!e.matches(":popover-open")&&e.showPopover()}function Cy(e){typeof e.hidePopover=="function"&&e.matches(":popover-open")&&e.hidePopover()}var Iy=4;function Ry(e,t){let n=Iy,i=t.getBoundingClientRect(),o=e.getBoundingClientRect(),r=i.bottom+n,s=r+o.height>window.innerHeight&&i.top-n-o.height>=0?i.top-n-o.height:r,c=Math.min(Math.max(i.right-o.width,n),window.innerWidth-o.width-n);e.style.top=`${s}px`,e.style.left=`${c}px`}function Ey(){return p(M,{children:[a("span",{className:"syncify-dot","aria-hidden":"true"}),a("span",{className:"syncify-visually-hidden",children:", "})]})}function W(e){let t=e.parts.filter(n=>n!=null&&n!==!1&&n!=="");return a("span",{className:ht("syncify-meta",e.className),children:t.map((n,i)=>p(M,{children:[i>0?a(Ey,{}):null,a("span",{className:"syncify-meta-part",children:n})]},i))})}function lo(e){let t=Math.min(Math.max(e.used,0),e.max),n=`Used ${e.used} of ${e.max}`;return p("span",{className:"syncify-meter",role:"meter","aria-label":e.label,"aria-valuemin":0,"aria-valuemax":e.max,"aria-valuenow":t,"aria-valuetext":n,"data-full":e.used>=e.max?"true":void 0,children:[a("span",{className:"syncify-cap",children:n}),a("span",{className:"syncify-meter-bars","aria-hidden":"true",children:Array.from({length:e.max},(i,o)=>a("span",{className:"syncify-meter-bar","data-used":o<t?"true":void 0},o))})]})}function uo(e){let t=`${xe(e.used)} of ${xe(e.max)}`,n=e.max>0?Math.min(Math.max(e.used/e.max,0),1):0;return p("span",{className:"syncify-usage",role:"meter","aria-label":"Space used","aria-valuemin":0,"aria-valuemax":e.max,"aria-valuenow":Math.min(e.used,e.max),"aria-valuetext":t,"data-warning":e.warning?"true":void 0,children:[a("span",{className:"syncify-cap",children:"Space used"}),a("span",{className:"syncify-usage-bar","aria-hidden":"true",children:a("span",{className:"syncify-usage-fill",style:{width:`${n*100}%`}})}),a("span",{className:"syncify-cap",children:t})]})}function xe(e){return`${Math.ceil(Math.max(e,0)/1024)} KB`}function L(e){let t=e.tone==="error"?"alert":e.live?"status":void 0;return p("div",{className:"syncify-notice","data-tone":e.tone,role:t,children:[p("span",{className:"syncify-notice-body",children:[e.bare?null:a("span",{className:"syncify-notice-mark",children:a(ke,{tone:e.tone})}),a("span",{className:"syncify-notice-text",children:e.children})]}),e.actions?a("span",{className:"syncify-notice-actions",children:e.actions}):null]})}function ae(e){return a("span",{className:"syncify-pip-square","data-kind":e.kind,"aria-hidden":"true"})}function Xn(e){return p("label",{className:"syncify-radio-row","data-disabled":e.disabled?"true":void 0,children:[a("input",{className:"syncify-radio",type:"radio",name:e.name,checked:e.checked,onChange:()=>e.onChange(),disabled:e.disabled}),a("span",{className:"syncify-radio-label",children:e.label})]})}function oe(e){return p("div",{className:"syncify-section-label",children:[a("h3",{className:"syncify-section-label-title",id:e.id,tabIndex:e.focusable?-1:void 0,children:e.title}),e.end]})}function re(e){return p("div",{className:"syncify-setting-row",children:[p("span",{className:"syncify-setting-row-text",children:[a("span",{className:"syncify-setting-row-label",children:e.label}),e.value?a("span",{className:"syncify-setting-row-value",children:e.value}):null]}),e.children]})}function tn(e){return a("div",{className:"syncify-setting-group",role:"group","aria-label":e.label,children:e.children})}function Ce(e){return e.shape==="item"?a("li",{className:"syncify-list-item","aria-hidden":"true",children:p("div",{className:"syncify-row","data-lines":"1",children:[a("span",{className:"syncify-row-leading",children:a("span",{className:"syncify-skeleton","data-width":"pip"})}),a("span",{className:"syncify-row-name",children:a("span",{className:"syncify-skeleton","data-width":"name"})}),p("span",{className:"syncify-row-end",children:[a("span",{className:"syncify-skeleton","data-width":"size"}),a("span",{className:"syncify-skeleton","data-width":"switch"}),a("span",{className:"syncify-skeleton","data-width":"menu"})]})]})}):a("li",{className:"syncify-list-item","aria-hidden":"true",children:p("div",{className:"syncify-row","data-lines":"2",children:[a("span",{className:"syncify-row-name",children:a("span",{className:"syncify-skeleton","data-width":"name"})}),a("span",{className:"syncify-row-meta",children:a("span",{className:"syncify-skeleton","data-width":"meta"})})]})})}function Zn(e){return a("input",{className:"syncify-switch-control",type:"checkbox",role:"switch","aria-label":e.label,checked:e.checked,onChange:t=>e.onChange(t.currentTarget.checked),disabled:e.disabled})}function nn(e){let i=e,{label:t}=i,n=Se(i,["label"]);return p("label",{className:"syncify-setting-row","data-disabled":e.disabled?"true":void 0,children:[a("span",{className:"syncify-setting-row-label",children:t}),a(Zn,m({},n))]})}var oc=(e,t)=>`${e}-tab-${t}`,rc=(e,t)=>`${e}-panel-${t}`;function fo(e){let t=z(null);A(()=>{var i,o,r;(r=(o=(i=t.current)==null?void 0:i.querySelector('[aria-selected="true"]'))==null?void 0:o.scrollIntoView)==null||r.call(o,{block:"nearest",inline:"nearest"})},[e.selected]);function n(i){var c,l;let o=e.tabs.length,r=e.tabs.findIndex(u=>u.id===e.selected),s=i.key==="ArrowRight"?(r+1)%o:i.key==="ArrowLeft"?(r-1+o)%o:i.key==="Home"?0:i.key==="End"?o-1:null;s!==null&&(i.preventDefault(),e.onSelect(e.tabs[s].id),(l=(c=t.current)==null?void 0:c.querySelectorAll('[role="tab"]')[s])==null||l.focus())}return a("div",{className:"syncify-tabs",role:"tablist","aria-label":e.label,ref:t,onKeyDown:n,children:e.tabs.map(i=>{let o=i.id===e.selected;return p("button",{className:"syncify-tab",id:oc(e.idBase,i.id),type:"button",role:"tab","aria-selected":o,"aria-controls":rc(e.idBase,i.id),tabIndex:o?0:-1,onClick:()=>e.onSelect(i.id),children:[a("span",{className:"syncify-cap",children:i.label}),i.status]},i.id)})})}function X(e){return p("div",{className:"syncify-tab-panel",id:rc(e.idBase,e.id),role:"tabpanel","aria-labelledby":oc(e.idBase,e.id),children:[a("div",{className:"syncify-tab-scroll",tabIndex:0,children:e.children}),e.actions?a("div",{className:"syncify-tab-actions",children:e.actions}):null]})}function Te(e){let t=z(e);return Et(()=>{t.current=e}),t}function Q(e){if(e.startsWith("mailto:")){window.location.href=e;return}window.open(e,"_blank","noopener,noreferrer")}function Qn(e){let t=e.lastIndexOf("@");if(t<1)return e;let n=e.slice(0,t);return n.length<=2?e:`${n[0]}${"*".repeat(n.length-2)}${n[n.length-1]}${e.slice(t)}`}function sc(e,t=new Date){let n=new Date(e);return n.toDateString()===t.toDateString()?"today":n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===t.getFullYear()?void 0:"numeric"})}function ac(e){let t=sc(e);return t==="today"?t:`on ${t}`}function Ny(e){let t=sc(e);return t==="today"?t:`by ${t}`}function ei(e){var t;return e.not_me?{title:"Syncify is checking this claim",text:null}:{title:`${(t=e.email)!=null?t:"Someone"} is securing this backup`,text:e.held?"Syncify is checking it.":`If that isn't you, press Not me ${Ny(e.final_at)}.`}}function cc(e){var t;return`This backup is no longer secured by ${(t=e.email)!=null?t:"another account"}`}function ti(e){return e==="cancelled"?"Syncify: claim cancelled":"Syncify: sent for a check"}function ni(e){return`A new install${e.device?` on ${e.device}`:""} wants to back up this Spotify account`}function lc(e,t,n){var s,c;if(t==="not_owner")return{kind:"other-account"};if(!e)return n?{kind:"other-claim"}:{kind:"unknown"};let{claim:i}=e;if((i==null?void 0:i.status)==="final"){if(!i.mine)return{kind:"other-account"};let l=((s=e.accounts)!=null?s:[]).filter(u=>u.status==="final").length;return{kind:"secured",linkedCount:Math.max(l,1)}}if((i==null?void 0:i.status)==="pending")return i.mine?{kind:"pending",finalAt:i.final_at,held:i.held}:{kind:"other-claim"};let o=((c=e.accounts)!=null?c:[]).filter(l=>l.hash===e.hash),r=o[o.length-1];return(r==null?void 0:r.status)==="unlinked"?{kind:"ended",reason:"undone"}:(r==null?void 0:r.status)==="cancelled"&&r.cancelled_by!=="claimer"?{kind:"ended",reason:r.cancelled_by==="owner"?"owner":"admin"}:{kind:"open"}}function uc(e,t,n){return t?{kind:"warning",label:"Sign in to see your backups"}:e?n.kind==="secured"?{kind:"ok",label:"Signed in, backup secured"}:n.kind==="pending"?null:n.kind==="open"?{kind:"warning",label:"Backup not secured yet"}:n.kind==="ended"?{kind:"warning",label:"Backup not secured"}:{kind:"ok",label:"Signed in"}:null}function dc(e){return e.held?"Syncify is checking your request to secure this backup":`Your backup will be secured ${ac(e.finalAt)}`}var on=6,Py=600*1e3,Ty=300,Ay=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function yo(e){return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function fc(e){let[t,n]=S(()=>pn()),[i,o]=S(()=>pn().email),[r,s]=S(""),[c,l]=S(!1),[u,d]=S(null),[f,y]=S(()=>Date.now()),h=!!(t.codeSentAt&&f-t.codeSentAt<Py),k=Math.max(0,Math.ceil((t.retryAt-f)/1e3)),v=t.retryEmail===null||t.retryEmail===i.trim().toLowerCase()?k:0;A(()=>{if(t.retryAt<=Date.now())return;let P=setInterval(()=>{y(Date.now()),t.retryAt<=Date.now()&&clearInterval(P)},1e3);return()=>clearInterval(P)},[t.retryAt]);function g(P){let x=m(m({},pn()),P);Nr(x),n(x),y(Date.now())}async function b(P){var I;let x=P.trim();if(!Ay.test(x)){d("Enter a valid email address.");return}l(!0),d(null);try{let E=await _r(x,{nudge:e.nudge});g({email:x,codeSentAt:Date.now(),retryAt:Date.now()+E*1e3,retryEmail:x.toLowerCase()}),s("")}catch(E){let O=E instanceof B?E:null,T=(I=O==null?void 0:O.retryAfter)!=null?I:null,H=T&&T<=Ty?Date.now()+T*1e3:0,U=(O==null?void 0:O.code)==="too_many_requests"?null:x.toLowerCase();if((O==null?void 0:O.code)==="resend_wait"){g({email:x,codeSentAt:t.email===x&&t.codeSentAt?t.codeSentAt:Date.now(),retryAt:H,retryEmail:U});return}H&&g({retryAt:H,retryEmail:U}),d(De(E))}finally{l(!1)}}async function N(){l(!0),d(null);try{let P=await Mr(t.email,r);g({codeSentAt:null}),s(""),e.onSignedIn(P)}catch(P){d(De(P));let x=P instanceof B?P.code:null;(x==="too_many_attempts"||x==="code_expired")&&s("")}finally{l(!1)}}async function _(P){l(!0),d(null),await Br(),g({email:P,codeSentAt:null}),o(P),l(!1)}return{draft:t,email:i,setEmail:o,code:r,setCode:P=>s(P.replace(/\D/g,"").slice(0,on)),busy:c,error:u,codeSent:h,waitSeconds:k,emailWaitSeconds:v,requestCode:b,verify:N,signOut:_,useAnotherEmail:()=>{g({codeSentAt:null}),s(""),d(null)}}}function yc(e){let{signIn:t}=e,{busy:n}=t;return a("form",{className:"syncify-account-form",noValidate:!0,onSubmit:i=>{i.preventDefault(),!n&&(t.codeSent?t.code.length===on&&t.verify():t.emailWaitSeconds||t.requestCode(t.email))},children:t.codeSent?p(M,{children:[a(Be,{label:`Code sent to ${Qn(t.draft.email)}`,value:t.code,onChange:t.setCode,error:t.error,placeholder:"123456",inputMode:"numeric",autoComplete:"one-time-code",maxLength:on,mono:!0,autoFocus:!0,action:a(C,{type:"submit",disabled:n||t.code.length!==on,children:n?"Verifying\u2026":"Verify"})}),p("span",{className:"syncify-account-resend",children:[a(C,{variant:"text",onClick:()=>{t.requestCode(t.draft.email)},disabled:n||t.waitSeconds>0,children:t.waitSeconds>0?`Resend in ${yo(t.waitSeconds)}`:"Resend code"}),a(C,{variant:"text",onClick:t.useAnotherEmail,disabled:n,children:"Use another email"})]})]}):a(Be,{label:"Email for sign-in codes",type:"email",value:t.email,onChange:t.setEmail,error:t.error,placeholder:"you@example.com",autoComplete:"email",autoFocus:!0,action:a(C,{type:"submit",disabled:n||t.emailWaitSeconds>0||!t.email.trim(),children:n?"Sending\u2026":t.emailWaitSeconds>0?`Send in ${yo(t.emailWaitSeconds)}`:"Send code"})})})}var _y={owner:"This backup isn't secured. Someone using this Spotify account said it isn't yours.",admin:"This backup isn't secured. Syncify couldn't confirm it's yours.",undone:"This backup is no longer secured by your account."};function mc(e){let{session:t,secure:n,handle:i}=e,o=fc({nudge:e.nudge,onSignedIn:e.onSignedIn}),[r,s]=S(null),[c,l]=S(!1),u=Te(b=>{t&&Lr().then(N=>{!b()||N||(s({kind:"warning",text:De(new B("signed_out"))}),e.onSignedOut())}).catch(()=>{})}),d=t==null?void 0:t.token;A(()=>{let b=!0;return u.current(()=>b),()=>{b=!1}},[u,d]);let f=Te(b=>{!t||i!==void 0||_n().then(N=>{var _,P;b()&&e.onHandle((P=(_=N.profile)==null?void 0:_.handle)!=null?P:null)}).catch(()=>{})});A(()=>{let b=!0;return f.current(()=>b),()=>{b=!1}},[f,!!t&&i===void 0]);async function h(){l(!0),s(null);try{Q(await Or())}catch(b){let N=b instanceof B&&b.code==="signed_out";s({kind:N?"warning":"error",text:De(b)}),N&&e.onSignedOut()}finally{l(!1)}}async function k(){var b;s(null),await o.signOut((b=t==null?void 0:t.email)!=null?b:""),e.onSignedOut()}if(t===void 0)return a(X,{idBase:e.idBase,id:"account",children:null});if(!t)return p(X,{idBase:e.idBase,id:"account",children:[a("p",{className:"syncify-tab-text",children:e.locked?"Sign in with the email that secured this backup":"Sign in to secure your backup so only you can restore it"}),r?a(L,{tone:r.kind,live:!0,children:r.text}):null,a(yc,{signIn:o})]});let v=n.kind==="open"||n.kind==="other-claim"||n.kind==="ended"&&n.reason!=="undone",g=o.busy||c;return p(X,{idBase:e.idBase,id:"account",children:[p(tn,{children:[a(re,{label:"Email for sign-in codes",value:Qn(t.email)}),i?a(re,{label:"Creator handle",value:`@${i}`}):null,a(re,{label:"Your account page",children:a(C,{variant:"secondary",size:"small",onClick:()=>{h()},disabled:g,children:"Open"})}),v?a(re,{label:"Secure your backup so only you can restore it",children:a(C,{onClick:e.onSecure,disabled:g||e.securing||n.kind==="other-claim",children:e.securing?"Securing\u2026":n.kind==="ended"?"Secure again":"Secure"})}):null]}),n.kind==="ended"?a(L,{tone:"warning",children:_y[n.reason]}):null,e.secureError?a(L,{tone:"error",children:e.secureError}):null,r?a(L,{tone:r.kind,live:!0,children:r.text}):null,p("div",{className:"syncify-account-footer",children:[p("span",{className:"syncify-account-status",children:[n.kind==="secured"?a(Oe,{className:"syncify-account-check"}):null,a(W,{parts:My(n)})]}),a(C,{variant:"text",onClick:()=>{k()},disabled:g,children:"Sign out"})]})]})}function My(e){switch(e.kind){case"secured":return["This backup is secured",...e.linkedCount>1?[`${e.linkedCount} Spotify accounts linked`]:[]];case"pending":return[dc(e)];case"other-account":return["This backup is secured by another account"];default:return["Signed in"]}}var pc=new WeakMap;function St(e){let t=pc.get(e);return t||(t=ne(e.marketplace_data.keys),pc.set(e,t)),t}function et(e){return tt(e,"item")}function tt(e,t){return`${e} ${t}${e===1?"":"s"}`}function bt(e,t=new Date){let n=new Date(e);if(Number.isNaN(n.getTime()))return e;let i=n.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),o=new Date(t);return o.setDate(t.getDate()-1),n.toDateString()===t.toDateString()?`today, ${i}`:n.toDateString()===o.toDateString()?`yesterday, ${i}`:`${n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===t.getFullYear()?void 0:"numeric"})}, ${i}`}function ii(e){return e.length<=1?e.join(""):`${e.slice(0,-1).join(", ")} and ${e[e.length-1]}`}function mo(e,t=new Date){let n=new Date(e);if(Number.isNaN(n.getTime()))return"";let i=new Date(t);return i.setDate(t.getDate()-1),n.toDateString()===t.toDateString()?"today":n.toDateString()===i.toDateString()?"yesterday":n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===t.getFullYear()?void 0:"numeric"})}function hc(e,t,n){var l,u;let i=bt(e.metadata.last_sync_datetime),o=et(St(e).length),r=`from ${e.metadata.device_info}`,s=(u=(l=e.backup)==null?void 0:l.name)!=null?u:null,c=e.payload_hash===n;return t==="safety-copy"?{backup:e,kind:t,name:"Safety copy",meta:[s,i,o,"updated weekly"].filter(gc),current:c,title:`the safety copy from ${i}`}:t==="pinned"?{backup:e,kind:t,name:"Pinned",meta:[s,i,o,r].filter(gc),current:c,title:s!=null?s:`the backup pinned ${i}`}:t==="unapproved"?{backup:e,kind:t,name:"Not approved",meta:[i,o,r],current:c,title:i}:{backup:e,kind:t,name:s!=null?s:i.charAt(0).toUpperCase()+i.slice(1),meta:s?[i,o,r]:[o,r],current:c,title:s!=null?s:i}}function gc(e){return e!==null}var Sc={extension:"extension",theme:"theme",snippet:"snippet"},Ly={extension:"extension",custom_app:"app",theme:"theme"},By={extension:"extension",custom_app:"custom app",theme:"theme"};function oi(e){let{changes:t}=e,[n,i]=S(!1);return p(G,{label:e.label,children:[t.changes.map(o=>a(Oy,{change:o,includeLabel:e.includeLabel(o.name),onInclude:r=>e.onInclude(o.key,r),disabled:e.disabled},o.key)),t.manual.map(o=>a(j,{leading:a(ae,{kind:Ly[o.type]}),name:o.name,meta:a(W,{parts:[By[o.type],o.scheme]}),end:a("span",{className:"syncify-change-label syncify-cap",children:"Add manually"})},`${o.type}:${o.name}`)),t.settings.length>0?a(Ke,{}):null,t.settings.map(o=>a(j,{leading:a(ae,{kind:o.kind}),name:o.name,end:a("span",{className:"syncify-change-label syncify-cap","data-change":"Updates",children:"Updates"})},`settings:${o.id}`)),t.settings.length>0&&t.unchanged.length>0?a(Ke,{}):null,t.unchanged.length>0?a(j,{name:p("span",{className:"syncify-change-fold",children:[t.unchanged.length," more stay the same"]}),end:a(C,{variant:"subtle","aria-expanded":n,onClick:()=>i(!n),children:n?"Hide":"Show"})}):null,n?t.unchanged.map(o=>a(Dy,{item:o},o.key)):null]})}function Oy(e){let{change:t}=e;return a(j,{leading:a(ae,{kind:Sc[t.type]}),name:t.name,meta:t.note?a(W,{parts:[t.note]}):void 0,end:p(M,{children:[a("span",{className:"syncify-change-label syncify-cap","data-change":t.fixed?void 0:t.change,children:t.fixed?"Stays off":t.change}),t.optional&&!t.fixed?a(no,{checked:t.included,onChange:e.onInclude,label:e.includeLabel,disabled:e.disabled}):null]})})}function Dy(e){return a(j,{leading:a(ae,{kind:Sc[e.item.type]}),name:e.item.name,meta:e.item.note?a(W,{parts:[e.item.note]}):void 0})}var bc={Adds:0,Updates:1,Removes:2},Uy=["blocked","host","repo","catalog","unchecked"];function ri(e,t,n){var u,d,f;let{optional:i,allowed:o}=n,r=(u=n.fixed)!=null?u:new Set,s=[],c=[];for(let y of e.items){let h=t.get(y.key),k=i.has(y.key)||r.has(y.key),v={key:y.key,name:y.name,type:y.type,note:h?po(h):r.has(y.key)?"Not in Marketplace's list":n.unapproved&&k?"Not approved":null},g=y.change==="added"?"Adds":y.change==="removed"?"Removes":y.isNew?"Updates":null;if(g){let b=r.has(y.key);s.push(w(m({},v),{change:g,optional:k,fixed:b,included:!k||!b&&o.has(y.key)}))}else c.push(v)}s.sort((y,h)=>bc[y.change]-bc[h.change]);let l=(d=n.settings)!=null?d:[];return{changes:s,settings:l,unchanged:c,manual:e.manual,warnings:[...$y(s,t,(f=n.verb)!=null?f:"Restore"),...Hy(s)],count:s.filter(y=>y.included).length+l.length}}function si(e,t){return t===0?e:t===1?`${e} 1 change`:`${e} ${t} changes`}function po(e){switch(e.kind){case"host":return`Code from ${e.host}`;case"repo":return`Code from ${e.repo}`;case"blocked":return"Blocked by Marketplace";case"catalog":return"Not in Marketplace";case"unchecked":return"Not checked";case"custom":return"Custom"}}function $y(e,t,n){var o;let i=new Map;for(let r of e){if(r.change==="Removes"||r.fixed)continue;let s=t.get(r.key);!s||!ut(s)&&s.kind!=="unchecked"||i.set(s.kind,[...(o=i.get(s.kind))!=null?o:[],r.name])}return Uy.flatMap(r=>{let s=i.get(r);return s?[Ky(r,s,n)]:[]})}function Hy(e){let t=e.filter(n=>n.fixed).map(n=>n.name);return t.length===0?[]:[t.length===1?`${ii(t)} isn't in Marketplace's list anymore, so it stays off.`:`${ii(t)} aren't in Marketplace's list anymore, so they stay off.`]}function Ky(e,t,n){let i=t.length===1,o=ii(t),r=i?`${n} it only if you trust it.`:`${n} them only if you trust them.`;switch(e){case"blocked":return`${o} ${i?"is":"are"} on Marketplace's block list. ${r}`;case"host":return`${o} ${i?"loads from a site":"load from sites"} outside GitHub. ${r}`;case"repo":return i?`${o} loads its code from a different repo than the one it names. ${r}`:`${o} load their code from different repos than the ones they name. ${r}`;case"catalog":return`${o} ${i?"isn't":"aren't"} in Marketplace's catalog. ${r}`;default:return`GitHub couldn't be reached to check ${o}. ${r}`}}function wc(e){return e.map(t=>w(m({},t),{name:`${t.name} settings`})).sort((t,n)=>t.name.localeCompare(n.name))}function kc(e,t,n){var P;let[i,o]=S(()=>new Set),[r,s]=S(null),c=Z(()=>xn(St(e),e.spicetify_config,t,n),[e,t,n]),l=Z(()=>dt(c.items),[c]);A(()=>{let x=!0;return ft(c.items,l).then(I=>{x&&s({for:e,checks:I})}),()=>{x=!1}},[e,c,l]);let[u,d]=S(null);A(()=>{let x=!0;return Xr(e.extension_settings).catch(()=>[]).then(I=>{x&&d({for:e,items:I})}),()=>{x=!1}},[e]);let f=(r==null?void 0:r.for)===e?r.checks:null,y=Z(()=>new Map([...f!=null?f:[],...l]),[f,l]),h=((P=e.backup)==null?void 0:P.kind)==="quarantined",k=Z(()=>new Set(c.items.filter(x=>{var I;return x.change!=="removed"&&x.isNew&&(h||ut(y.get(x.key))||((I=y.get(x.key))==null?void 0:I.kind)==="unchecked")}).map(x=>x.key)),[c,y,h]),v=Z(()=>[...k].filter(x=>!i.has(x)),[k,i]),g=(u==null?void 0:u.for)===e?u.items:null,b=Z(()=>wc(g!=null?g:[]).filter(x=>!v.includes(x.key)),[g,v]),N=Z(()=>ri(c,y,{optional:k,allowed:i,unapproved:h,settings:b.map(({id:x,name:I,kind:E})=>({id:x,name:I,kind:E}))}),[c,y,k,i,h,b]);function _(x,I){let E=new Set(i);I?E.add(x):E.delete(x),o(E)}return{preview:c,changes:N,unapproved:h,checking:f===null||g===null,skipped:v,settingsIds:N.settings.map(x=>x.id),allow:_}}function vc(e){let{row:t,local:n}=e,i=F("restore-heading"),o=kc(t.backup,n.items,n.spicetifyConfig),{changes:r}=o,s=!n.marketplaceAvailable,c=e.canShareSettings&&o.settingsIds.length>0;A(()=>{var u;(u=document.getElementById(i))==null||u.focus()},[i]);let l=p(M,{children:[a(C,{variant:"secondary",onClick:e.onCancel,disabled:e.restoring,children:"Cancel"}),a(C,{onClick:()=>e.onRestore({row:t,skipped:o.skipped,manual:o.preview.manual,settings:{ids:o.settingsIds,share:c&&e.shareSettings}}),disabled:e.busy||o.checking||s,children:e.restoring?"Restoring\u2026":o.checking?"Checking\u2026":si("Restore",r.count)})]});return p(X,{idBase:e.idBase,id:"backups",actions:l,children:[a(oe,{title:`Restore ${t.title}`,id:i,focusable:!0}),s?a(L,{tone:"warning",children:"Install Spicetify Marketplace to restore a backup."}):null,o.unapproved?a(L,{tone:"warning",children:"An install this Spotify account hasn't approved made this backup. Its items stay off unless you turn them on."}):null,a(oi,{changes:r,label:"What this restore changes",includeLabel:u=>`Restore ${u}`,onInclude:o.allow,disabled:e.busy}),r.warnings.map(u=>a(L,{tone:"warning",children:u},u)),e.localIsUnsaved?a(L,{tone:"warning",children:"Your current setup isn't backed up."}):null,c?a(io,{label:"Use these extension settings on my other devices too",checked:e.shareSettings,onChange:e.onShareSettingsChange,disabled:e.busy}):null]})}function xc(e){var _,P,x,I,E,O;let{remote:t,local:n}=e,i=F("backup"),[o,r]=S(null),[s,c]=S(null),l=z(null);if(A(()=>{var T;s||!l.current||((T=document.getElementById(l.current))==null||T.focus(),l.current=null)},[s]),s&&n)return a(vc,{idBase:e.idBase,row:s,local:n,localIsUnsaved:n.installedItemCount>0&&!zy(n.hash,t),canShareSettings:e.canShareSettings,shareSettings:e.shareSettings,onShareSettingsChange:e.onShareSettingsChange,busy:e.busy,restoring:e.restoring,onCancel:()=>c(null),onRestore:T=>{var H;return e.onRestore(w(m({},T),{linkedHash:(H=o==null?void 0:o.hash)!=null?H:null}))}},s.backup.payload_hash);async function u(T){if(!T){r(null);return}r({hash:T,remote:null});try{let H=await Qe(e.config,T);r({hash:T,remote:H})}catch(H){r(null),e.onError(H)}}let d=o?o.remote:t,f=(_=n==null?void 0:n.hash)!=null?_:null,y=T=>`${i}-${T.backup.payload_hash}`,h=(T,H)=>T.map(U=>hc(U,H,f)),k=h((P=d==null?void 0:d.backups)!=null?P:[],"backup"),v=h((x=d==null?void 0:d.pinned)!=null?x:[],"pinned"),g=h(d!=null&&d.safetyCopy?[d.safetyCopy]:[],"safety-copy"),b=o?[]:h((I=t==null?void 0:t.unapproved)!=null?I:[],"unapproved");function N(T){return a(j,{id:y(T),name:T.name,nameMark:T.kind==="safety-copy"?a(oo,{className:"syncify-safety-mark"}):T.kind==="pinned"?a(ro,{className:"syncify-safety-mark"}):T.kind==="unapproved"?a(ke,{tone:"warning"}):void 0,meta:a(W,{parts:T.meta}),end:T.current?a("span",{className:"syncify-row-status syncify-cap",children:"Current"}):void 0,onOpen:T.current?void 0:()=>{l.current=y(T),c(T)},openLabel:`Preview restore of ${T.title}`,disabled:e.busy},`${T.kind}-${T.backup.payload_hash}-${T.backup.metadata.last_sync_datetime}`)}return p(X,{idBase:e.idBase,id:"backups",children:[e.notices,n&&!n.marketplaceAvailable?a(L,{tone:"warning",children:"Install Spicetify Marketplace to restore a backup."}):null,!e.lockedBy&&e.otherAccounts.length>0?a(re,{label:"Show backups from",children:a(ve,{label:"Show backups from",trigger:{value:(O=(E=e.otherAccounts.find(T=>T.hash===(o==null?void 0:o.hash)))==null?void 0:E.label)!=null?O:"This Spotify account"},items:[{hash:null,label:"This Spotify account"},...e.otherAccounts].map(T=>{var H;return{label:T.label,checked:((H=o==null?void 0:o.hash)!=null?H:null)===T.hash,onSelect:()=>{u(T.hash)}}}),disabled:e.busy})}):null,e.lockedBy?a("p",{className:"syncify-tab-text",children:e.lockedBy==="not_owner"?"Sign in with the account that secured them":"Sign in to see and restore your backups"}):(!t||!n)&&e.failed?null:!t||!n||o&&!o.remote?p(G,{label:"Loading backups",children:[a(Ce,{}),a(Ce,{})]}):k.length+v.length+g.length+b.length===0?o?a("p",{className:"syncify-tab-text",children:"No backups yet."}):null:p(G,{label:"Backups",children:[k.map(N),v.length>0?a(Ke,{}):null,v.map(N),g.length>0?a(Ke,{}):null,g.map(N),b.length>0?a(Ke,{}):null,b.map(N)]})]})}function zy(e,t){return t?[...t.backups,...t.safetyCopy?[t.safetyCopy]:[]].some(n=>n.payload_hash===e):!1}function Cc(e){let t=F("first-sync"),[n,i]=S(()=>Object.fromEntries(e.choices.map(d=>[d.id,d.localAt>d.accountAt?"here":"account"]))),[o,r]=S(!1),[s,c]=S(null),l=d=>{var f;return(f=n[d.id])!=null?f:d.localAt>d.accountAt?"here":"account"};async function u(){r(!0),c(null);try{await ba(Object.fromEntries(e.choices.map(d=>[d.id,l(d)]))),e.onClose()}catch(d){c(d instanceof Error?d.message:String(d))}finally{r(!1)}}return p(en,{open:e.open,wide:!0,onClose:e.onClose,title:"Which extension settings do you want to keep?",actions:p(M,{children:[a(C,{variant:"secondary",onClick:e.onClose,disabled:o,children:"Ask me later"}),a(C,{onClick:()=>{u()},disabled:o,children:"Keep these"})]}),children:[a("p",{children:"These items have different settings in this Spotify than on your other devices. Choose the settings to keep for each item. All your devices will then use them."}),a(G,{wrap:!0,children:e.choices.map(d=>a(j,{leading:a(ae,{kind:d.kind}),name:d.name,end:p("span",{className:"syncify-first-sync-picks",role:"radiogroup","aria-label":d.name,children:[a(Xn,{name:`${t}-${d.id}`,label:`This Spotify, ${mo(d.localAt)}`,checked:l(d)==="here",onChange:()=>i(f=>w(m({},f),{[d.id]:"here"})),disabled:o}),a(Xn,{name:`${t}-${d.id}`,label:`Other devices, ${mo(d.accountAt)}`,checked:l(d)==="account",onChange:()=>i(f=>w(m({},f),{[d.id]:"account"})),disabled:o})]})},d.id))}),s?a(L,{tone:"error",children:s}):null]})}function nt(e,t){return e.items.filter(n=>n.hold!==null&&!t.includes(n.id))}function Ic(e,t){let{hold:n}=e;if(n.reason==="account_full")return`${e.name} is held because your extension settings are over ${xe(t)}. Your other devices keep the last copy that fit. To sync it again, turn off an item or delete a synced copy in Items.`;let i=`${xe(n.size)} of its ${xe(e.limit)}`;return e.list?`${e.name}'s list is too big to sync, ${i}. Your other devices keep the last list that fit. It syncs again once the list is smaller.`:`${e.name}'s extension settings are too big to sync, ${i}. Your other devices keep the last copy that fit. They sync again once they're smaller.`}function Rc(e){return e.hold?`${xe(e.hold.size)}, too big to sync`:xe(e.size)}function Ec(e,t){let n=nt(e,t).filter(i=>i.hold.reason==="account_full");return{used:e.bytes+n.reduce((i,o)=>i+Math.max(o.hold.size-o.accountSize,0),0),over:n.length>0}}function Nc(e,t){let n=e.items,i=n.filter(r=>t.includes(r.id)).length,o=nt(e,t).length;return{syncing:n.length-i-o,held:o,off:i}}function Fy(){return`${D().webUrl.replace(/\/+$/,"")}/supported`}var jy=4;function Pc(e){let{config:t,status:n}=e,i=F("extension-settings"),o=z(null),r=nt(n,t.settingsSyncOff),s=e.secured&&t.settingsSyncEnabled&&r.length>0,c=z(s);return A(()=>{var l;c.current&&((l=o.current)==null||l.scrollIntoView({block:"start"}))},[]),p("div",{className:"syncify-sync-section","data-place":"settings",ref:o,role:"group","aria-labelledby":i,children:[a(oe,{title:"Extension settings",id:i}),e.secured?p(M,{children:[a(nn,{label:"Syncing on this device",checked:t.settingsSyncEnabled,onChange:e.onEnabledChange,disabled:e.disabled}),t.settingsSyncEnabled?p(M,{children:[a(Tc,{status:n,off:t.settingsSyncOff}),a(Ac,{items:r,accountLimit:n.limit})]}):null]}):a(L,{tone:"info",bare:!0,actions:a(C,{size:"small",onClick:e.onSecure,disabled:e.securing,children:e.securing?"Securing\u2026":"Secure"}),children:"Secure your backup to sync extension settings between your devices."}),p(G,{children:[e.secured&&t.settingsSyncEnabled?n.items.length===0?a(j,{name:"None of your items have settings Syncify can sync",plain:!0}):a(j,{name:"Items",meta:a(Wy,{status:n,off:t.settingsSyncOff}),onOpen:e.onOpenItems}):null,a(j,{name:"Supported extensions",external:!0,onOpen:()=>Q(Fy())})]})]})}function Wy(e){let t=Nc(e.status,e.off);return a(W,{parts:[t.syncing>0&&`${t.syncing} syncing`,t.held>0&&p("span",{className:"syncify-sync-warning",children:[t.held," too big to sync"]}),t.off>0&&`${t.off} off`]})}function Tc(e){let{used:t,over:n}=Ec(e.status,e.off);return a(uo,{used:t,max:e.status.limit,warning:n})}function Ac(e){return a(M,{children:e.items.map(t=>a(L,{tone:"warning",children:Ic(t,e.accountLimit)},t.id))})}function _c(e){let{config:t,status:n}=e,i=F("items"),[o,r]=S(null),[s,c]=S([]),l=z({ids:[],names:new Map});A(()=>{var h;let y=!0;return ka().catch(()=>n.items).then(k=>{y&&r(k)}),(h=document.getElementById(i))==null||h.focus(),()=>{y=!1}},[]);let u=z(e.onDeleted);A(()=>{u.current=e.onDeleted}),A(()=>()=>{let{ids:y,names:h}=l.current;y.length!==0&&Promise.all(y.map(k=>wa(q(),k).catch(v=>{var b;let g=v instanceof Error?v.message:String(v);Spicetify.showNotification(`Syncify couldn't delete the synced copy of ${(b=h.get(k))!=null?b:k}. ${g}`,!0,6e3)}))).then(()=>u.current())},[]);function d(y,h){let k=h?[...s,y.id]:s.filter(v=>v!==y.id);l.current.names.set(y.id,y.name),l.current.ids=k,c(k)}let f=nt(w(m({},n),{items:o!=null?o:n.items}),t.settingsSyncOff);return p("div",{className:"syncify-sync-section",children:[a(oe,{title:"Items",id:i,focusable:!0,end:a(C,{variant:"subtle",onClick:e.onBack,children:"Back to settings"})}),a(Tc,{status:n,off:t.settingsSyncOff}),a(Ac,{items:f,accountLimit:n.limit}),a(G,{label:"Items",busy:o===null,wrap:!0,children:o===null?Array.from({length:jy},(y,h)=>a(Ce,{shape:"item"},h)):o.map(y=>a(Yy,{item:y,on:!t.settingsSyncOff.includes(y.id),deleted:s.includes(y.id),onChange:h=>e.onItemChange(y.id,h),onDelete:h=>d(y,h)},y.id))})]})}function Yy(e){let{item:t}=e;return a(j,{leading:a(ae,{kind:t.kind}),name:t.name,end:e.deleted?p(M,{children:[a("span",{className:"syncify-sync-size",children:"Synced copy deleted"}),a(C,{variant:"text",onClick:()=>e.onDelete(!1),children:"Undo"})]}):p(M,{children:[a("span",{className:"syncify-sync-size","data-tone":t.hold&&e.on?"warning":void 0,children:e.on?Rc(t):xe(t.size)}),a(Zn,{label:`Sync ${t.name}`,checked:e.on,onChange:e.onChange}),a(ve,{trigger:"more",label:`More for ${t.name}`,items:[{label:"Delete synced copy",danger:!0,onSelect:()=>e.onDelete(!0)}]})]})})}function Mc(e,t){let[n,i]=S(!1),[o,r]=S(null),s=Te(t);return A(()=>{if(!n)return;let c=l=>{var d;if(!((d=document.getElementById(e))!=null&&d.isConnected)){i(!1),r(null);return}l.preventDefault(),l.stopImmediatePropagation();let u=Js(l);if(u.kind!=="ignore"){if(u.kind==="cancel"){i(!1),r(null);return}if(u.kind==="error"){r(u.message);return}if(Xs(u.shortcut)){r(`${Ft(u.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}i(!1),s.current(u.shortcut)}};return window.addEventListener("keydown",c,!0),()=>window.removeEventListener("keydown",c,!0)},[n,e,s]),{recording:n,error:o,clearError:()=>r(null),toggle:()=>{r(null),i(!n)}}}var Lc=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function Bc(e){var h,k;let{config:t}=e,[n,i]=S("settings"),[o]=S(()=>Bn()),r=F("shortcut"),s=Mc(r,f),c=o?t.entryPoint:"topbar",l=s.recording?"Press keys":t.shortcut?Ft(t.shortcut):"Off";function u(v){Ze(v),e.onConfigChange(v)}function d(v,g){let b=q().settingsSyncOff.filter(N=>N!==v);u(w(m({},t),{settingsSyncOff:g?b:[...b,v]}))}if(n==="items")return a(X,{idBase:e.idBase,id:"settings",children:a(_c,{config:t,status:e.syncStatus,onItemChange:d,onBack:()=>i("settings"),onDeleted:()=>e.onConfigChange(q())})});function f(v){u(w(m({},t),{shortcut:v})),zi(v),s.clearError()}function y(v){u(w(m({},t),{entryPoint:v})),On(v)}return p(X,{idBase:e.idBase,id:"settings",children:[p(tn,{children:[a(nn,{label:"Automatic backup when Spotify starts",checked:t.autoBackupEnabled&&!e.unsupported,onChange:v=>u(w(m({},t),{autoBackupEnabled:v})),disabled:e.busy||e.unsupported}),a(re,{label:"Open Syncify from",children:a(ve,{label:"Open Syncify from",trigger:{value:(k=(h=Lc.find(v=>v.value===c))==null?void 0:h.label)!=null?k:""},items:Lc.map(v=>({label:v.label,checked:v.value===c,onSelect:()=>y(v.value)})),disabled:!o})}),a(re,{label:"Keyboard shortcut",value:s.recording&&!s.error?"Press a key combination, or Esc to cancel":void 0,children:p("span",{className:"syncify-settings-shortcut",children:[s.recording?null:t.shortcut?a(C,{variant:"subtle",onClick:()=>f(null),children:"Turn off"}):a(C,{variant:"subtle",onClick:()=>f(mt),children:"Use default"}),a(ao,{id:r,keys:l,recording:s.recording,"aria-label":s.recording?`${l} for a new keyboard shortcut`:`${l}, change the keyboard shortcut`,onClick:s.toggle})]})})]}),s.error?a(L,{tone:"warning",live:!0,children:s.error}):null,o?t.entryPoint==="menu"&&!t.shortcut?a(L,{tone:"warning",children:"Keep a shortcut in case a Spotify update breaks the profile menu."}):null:a(L,{tone:"info",children:"The profile menu isn't available in this Spicetify version."}),a(Pc,{config:t,status:e.syncStatus,secured:e.secured,securing:e.securing,onSecure:e.onSecure,onEnabledChange:v=>u(w(m({},t),{settingsSyncEnabled:v,settingsSyncOff:q().settingsSyncOff})),onOpenItems:()=>i("items"),disabled:e.busy})]})}function Oc(){let[e,t]=S(()=>Ne());return A(()=>Wn(t),[]),e}function rn(e){let t=`${D().webUrl.replace(/\/+$/,"")}/discover`;return e?`${t}?post=${encodeURIComponent(e)}`:t}function wt(e){var t;return(t=e.name)!=null?t:Ee(e.code)}function Dc(e){return[`Used by ${e.imports}`,...e.posted?["On Discover"]:[]]}function Uc(e){let t=e.posted?"The code stops working and its Discover post comes down.":"The code stops working.";return e.imports===0?t:`${t} ${e.imports===1?"1 person":`${e.imports} people`} used it.`}var ai=12;function $c(e){return[...Array(Math.min(e.extensions,ai)).fill("extension"),...Array(Math.min(e.themes,ai)).fill("theme"),...Array(Math.min(e.snippets,ai)).fill("snippet")].slice(0,ai)}var Vy={extension:"extension",theme:"theme",snippet:"snippet"};function Hc(e){var l,u;let{compose:t}=e,n=F("compose-heading"),i=(u=(l=t.compose)==null?void 0:l.code)!=null?u:null,{draft:o,saving:r}=t;A(()=>{var d;(d=document.getElementById(n))==null||d.focus()},[n]);let s=o?[...o.items].sort((d,f)=>Number(o.leftOut.has(f.key))-Number(o.leftOut.has(d.key))||d.name.localeCompare(f.name)):[],c=p(M,{children:[a(C,{variant:"secondary",onClick:t.cancel,disabled:r,children:"Cancel"}),a(C,{onClick:()=>{t.save()},disabled:!o||t.included.length===0||r,children:o?r?i?"Updating\u2026":"Creating\u2026":i?"Update code":"Create code":"Checking\u2026"})]});return p(X,{idBase:e.idBase,id:"share",actions:c,children:[a(oe,{title:i?`Update ${wt(i)}`:"Create a code",id:n,focusable:!0}),t.error?a(L,{tone:"error",children:t.error}):null,a(Be,{label:"Setup name (optional)",value:t.name,onChange:t.setName,maxLength:Rs,disabled:r}),t.askHandle?a(Be,{label:"Pick a handle for your profile",value:t.handle,onChange:t.setHandle,onBlur:t.checkHandle,error:t.handleError,prefix:"@",maxLength:Bi,disabled:r}):null,o&&t.included.length===0?a(L,{tone:"warning",children:"Nothing here can go in a code. Add something from Marketplace first."}):null,a(oe,{title:"What goes in",end:o?a(W,{parts:[et(t.included.length)]}):void 0}),o?a(G,{label:"What goes in",children:s.map(d=>{let f=o.leftOut.get(d.key),y=[f?po(f):null,d.repo].filter(Boolean);return a(j,{leading:a(ae,{kind:Vy[d.type]}),name:d.name,meta:y.length>0?a(W,{parts:y}):void 0,end:f?a("span",{className:"syncify-change-label syncify-cap",children:"Left out"}):void 0},d.key)})}):p(G,{label:"Checking your items",children:[a(Ce,{}),a(Ce,{})]})]})}var Kc=[["add","Add to my setup"],["replace","Replace my setup"]];function zc(e){var c,l,u,d;let{load:t}=e,n=F("share-heading"),i=(c=t.shared)==null?void 0:c.file;if(A(()=>{var f;(f=document.getElementById(n))==null||f.focus()},[n]),!i||!t.changes)return null;let o=e.marketplaceAvailable===!1,r=i.creator,s=p(M,{children:[a(C,{variant:"secondary",onClick:t.close,disabled:t.applying,children:"Cancel"}),a(C,{onClick:()=>{t.apply()},disabled:t.applying||t.checking||e.busy||o,children:t.applying?"Loading\u2026":t.checking?"Checking\u2026":si("Load",t.changes.count)})]});return p(X,{idBase:e.idBase,id:"share",actions:s,children:[a(oe,{title:`Load ${(l=i.name)!=null?l:Ee(i.code)}`,id:n,focusable:!0,end:r?a(C,{variant:"text",onClick:()=>Q(Os(r)),children:`by @${r}`}):void 0}),t.applyError?a(L,{tone:"error",children:t.applyError}):null,o?a(L,{tone:"warning",children:"Install Spicetify Marketplace to load a setup."}):null,a(re,{label:"How to load it",children:a(ve,{label:"How to load it",trigger:{value:(d=(u=Kc.find(([f])=>f===t.mode))==null?void 0:u[1])!=null?d:""},items:Kc.map(([f,y])=>({label:y,checked:t.mode===f,onSelect:()=>t.setMode(f)})),disabled:t.applying})}),a(oi,{changes:t.changes,label:"What loading it changes",includeLabel:f=>`Load ${f}`,onInclude:t.allow,disabled:t.applying}),t.theme?a(L,{tone:"info",children:`Your theme switches to ${t.theme.name}.`}):null,t.changes.warnings.map(f=>a(L,{tone:"warning",children:f},f))]})}function Fc(e){let[t,n]=S(null),[i,o]=S(null),[r,s]=S(""),[c,l]=S(""),[u,d]=S(!1),[f,y]=S(!1),[h,k]=S(null),[v,g]=S(null),b=z(0),[N,_]=S(e.token);N!==e.token&&(_(e.token),n(null),o(null),g(null));let P=t!==null&&t.code===null&&!e.hasHandle,x=P&&u?Oi(c):null,I=i?i.items.filter(U=>!i.leftOut.has(U.key)):[];async function E(U){var Fe,rt;let K=++b.current;n({code:U}),s((Fe=U==null?void 0:U.name)!=null?Fe:""),l((rt=e.suggestedHandle)!=null?rt:""),d(!1),o(null),k(null),g(null);try{let ce=await we(),vt=await Ts(ne(ce),ce);K===b.current&&o(m({keys:ce},vt))}catch(ce){if(K!==b.current)return;n(null),k(ce instanceof Error?ce.message:String(ce))}}function O(){b.current+=1,n(null),o(null)}function T(){n(null),o(null)}async function H(){if(!t||!i)return;if(P&&Oi(c)){d(!0);return}y(!0),k(null);let U=As(i.keys,I);try{let K=t.code?await Ds(t.code.code,r.trim(),U):await Bs(r.trim(),U,P?c.trim():void 0);g(w(m({},K),{outcome:t.code?"updated":"created"})),T(),await e.reload()}catch(K){if(K instanceof B&&K.code==="same_setup"&&K.share){g(w(m({},K.share),{leftOut:0,outcome:"existing"})),T();return}e.fail(K,k),K instanceof B&&K.code==="publish_failed"&&(n(null),e.reload())}finally{y(!1)}}return{compose:t,draft:i,included:I,name:r,setName:s,askHandle:P,handle:c,setHandle:U=>l(U.replace(/^@/,"")),checkHandle:()=>d(!0),handleError:x,saving:f,error:h,saved:v,dismissSaved:()=>g(null),forgetSaved:U=>g(K=>(K==null?void 0:K.code)===U?null:K),start:E,cancel:O,save:H}}function jc(e){var x;let[t,n]=S(null),[i,o]=S(null),[r,s]=S(null),[c,l]=S(null),[u,d]=S(0),f=z(!1),[y,h]=S(null),[k,v]=S(!1);function g(I,E){E(zt(I,i)),I instanceof B&&I.code==="signed_out"&&e.onSignedOut()}async function b(){var I,E;h(null);try{let O=await _n();n(O.codes),f.current||(f.current=!0,d(O.newHearts)),e.onCodeCount(O.codes.length),o(O.max),s(O.profile),e.onHandle((E=(I=O.profile)==null?void 0:I.handle)!=null?E:null),l(O.suggestedHandle)}catch(O){g(O,h)}}async function N(I){v(!0),h(null);try{return await Us(I),await b(),!0}catch(E){return g(E,h),!1}finally{v(!1)}}let _=Te(I=>{n(null),f.current=!1,I&&b()}),P=(x=e.session)==null?void 0:x.token;return A(()=>_.current(P!==void 0),[_,P]),{codes:t,max:i,atMax:t!==null&&i!==null&&t.length>=i,profile:r,suggestedHandle:c,newHearts:u,error:y,deleting:k,load:b,remove:N,fail:g}}function Wc(e){let[t,n]=S(""),[i,o]=S(null),[r,s]=S(null),[c,l]=S(null),[u,d]=S(null),[f,y]=S("add"),[h,k]=S(()=>new Set),[v,g]=S(null),[b,N]=S(void 0),[_,P]=S(!1),x=Z(()=>u?_s(u.file,u.items,e.localItems,e.localConfig,e.localTheme,f):null,[u,e.localItems,e.localConfig,e.localTheme,f]),I=Z(()=>{if(!x||!u)return null;let Y=new Set(u.items.map($=>$.key));return x.items.filter($=>$.change!=="removed"&&Y.has($.key)&&(f==="replace"||$.isNew))},[x,u,f]),E=Z(()=>I?dt(I):null,[I]),O=v&&v.for===I?v.checks:null,T=Z(()=>new Map([...O!=null?O:[],...E!=null?E:[]]),[O,E]),H=Z(()=>x&&b!==void 0?Ms(x,b):new Set,[x,b]),U=Z(()=>{var Y;return new Set(((Y=x==null?void 0:x.items)!=null?Y:[]).filter($=>{var te;return $.change!=="removed"&&$.isNew&&(ut(T.get($.key))||((te=T.get($.key))==null?void 0:te.kind)==="unchecked")}).map($=>$.key))},[x,T]),K=Z(()=>x?ri(x,T,{optional:U,allowed:h,fixed:H,verb:"Load"}):null,[x,T,U,h,H]),Fe=x!=null&&x.theme&&!H.has(x.theme.key)&&(!U.has(x.theme.key)||h.has(x.theme.key))?x.theme:null,rt=x!==null&&(O===null||b===void 0);A(()=>{if(!I||!E)return;let Y=!0;return ft(I,E).then($=>{Y&&g({for:I,checks:$})}),()=>{Y=!1}},[I,E]);async function ce(Y){let $=Y!=null?Y:Ns(t);if(s(null),l(null),d(null),!$){s(zt(new B("no_code")));return}o({code:$,pick:Y!==void 0});try{let te=await $s($);y("add"),k(new Set),d({file:te,items:ne(te.keys),pick:Y!==void 0}),Li().then(N)}catch(te){s(zt(te))}finally{o(null)}}function vt(Y,$){let te=new Set(h);$?te.add(Y):te.delete(Y),k(te)}async function di(){if(!u||!x)return;P(!0),l(null);let Y=[...new Set([...U,...H])].filter($=>H.has($)||!h.has($));try{await ia(e.config,u.file,f,Y,b!=null?b:null,u.pick),Spicetify.showNotification("Syncify: setup loaded. Reloading\u2026"),Qt(x.manual,"share"),setTimeout(()=>window.location.reload(),1e3)}catch($){P(!1),l(qy($))}}return{input:t,setInput:n,fetching:i,error:r,applyError:c,shared:u,close:()=>{d(null),l(null)},mode:f,setMode:y,changes:K,theme:Fe,checking:rt,applying:_,open:ce,allow:vt,apply:di}}function qy(e){if(e instanceof Vt){let t=e.reason instanceof ye?"Sign in to back up.":e.reason instanceof Error?e.reason.message:String(e.reason);return`${e.message} ${t}`}return e instanceof Error?e.message:String(e)}async function ci(e){var t;try{return await navigator.clipboard.writeText(e),!0}catch(n){let i=(t=Spicetify.Platform)==null?void 0:t.ClipboardAPI;return i!=null&&i.copy?(await i.copy(e),!0):!1}}var Gy=2e3;function Yc(e){let{codes:t,compose:n}=e,[i,o]=S(null),[r,s]=S(null);A(()=>{if(!r)return;let d=setTimeout(()=>s(null),Gy);return()=>clearTimeout(d)},[r]);async function c(d,f){await ci(d)&&s(f)}async function l(){i&&await t.remove(i.code)&&(n.forgetSaved(i.code),o(null))}let u=t.codes;return p("section",{className:"syncify-share-part","aria-label":"Your codes",children:[a(oe,{title:p(M,{children:["Your codes",t.newHearts>0?a("span",{className:"syncify-share-hearts",children:tt(t.newHearts,"new heart")}):null]}),end:u&&t.max!==null?a(lo,{used:u.length,max:t.max,label:"Share codes"}):void 0}),t.error?a(L,{tone:"error",actions:a(C,{variant:"text",onClick:()=>{t.load()},children:"Try again"}),children:t.error}):null,n.saved?a(Jy,{saved:n.saved,copied:r,onCopy:(d,f)=>{c(d,f)},discoverOpen:e.discoverOpen,onDismiss:n.dismissSaved}):null,n.error&&!n.compose?a(L,{tone:"error",children:n.error}):null,u===null?t.error?null:a(G,{label:"Loading your codes",children:a(Ce,{})}):u.length>0?a(G,{label:"Your codes",children:u.map(d=>a(j,{name:wt(d),meta:a(W,{parts:[d.name?a("code",{className:"syncify-share-code",children:Ee(d.code)}):null,...Dc(d)]}),end:p("span",{className:"syncify-share-code-actions",children:[a(C,{variant:"text",onClick:()=>{c(Ee(d.code),`code:${d.code}`)},children:r===`code:${d.code}`?"Copied":"Copy"}),d.link?a(C,{variant:"text",onClick:()=>{var f;c((f=d.link)!=null?f:"",`link:${d.code}`)},children:r===`link:${d.code}`?"Copied":"Get link"}):null,a(ve,{trigger:"more",label:`More for ${wt(d)}`,disabled:n.compose!==null||t.deleting,items:[{label:"Update",onSelect:()=>{n.start(d)}},...e.discoverOpen&&!d.posted?[{label:"Post to Discover",onSelect:()=>Q(rn(d.code))}]:[],{label:"Delete",danger:!0,onSelect:()=>o(d)}]})]})},d.code))}):null,u!==null?a("div",{className:"syncify-share-create",children:a(C,{variant:"secondary",onClick:()=>{n.start(null)},disabled:n.compose!==null||t.atMax||e.marketplaceAvailable===!1,children:"Create a code"})}):null,a(en,{open:i!==null,onClose:()=>o(null),title:i?`Delete ${wt(i)}`:"",actions:p(M,{children:[a(C,{variant:"secondary",onClick:()=>o(null),disabled:t.deleting,children:"Keep it"}),a(C,{variant:"danger",onClick:()=>{l()},disabled:t.deleting,children:t.deleting?"Deleting\u2026":"Delete code"})]}),children:i?Uc(i):null})]})}function Jy(e){let{saved:t}=e,n=Ee(t.code),i=t.link,o=t.outcome==="existing"?"You shared this setup already as":t.outcome==="updated"?"Code updated:":"Your code is ready:";return p(L,{tone:"info",live:!0,actions:p(M,{children:[a(C,{variant:"text",onClick:()=>e.onCopy(n,"saved-code"),children:e.copied==="saved-code"?"Copied":"Copy"}),i?a(C,{variant:"text",onClick:()=>e.onCopy(i,"saved-link"),children:e.copied==="saved-link"?"Copied":"Get link"}):null,t.outcome==="created"&&e.discoverOpen?a(C,{variant:"text",onClick:()=>Q(rn(t.code)),children:"Post to Discover"}):null,a(C,{variant:"subtle",onClick:e.onDismiss,children:"Dismiss"})]}),children:[p("span",{children:[o," ",a("code",{className:"syncify-share-code",children:n})]}),t.leftOut>0?a("span",{className:"syncify-share-left-out",children:t.leftOut===1?"1 snippet isn't in Marketplace's list anymore, so it was left out.":`${t.leftOut} snippets aren't in Marketplace's list anymore, so they were left out.`}):null]})}function Vc(e){let{session:t}=e,n=Wc(e),i=jc(e),o=Fc({token:t==null?void 0:t.token,hasHandle:i.profile!==null,suggestedHandle:i.suggestedHandle,reload:i.load,fail:i.fail}),[r,s]=S(null);if(A(()=>{Hs().then(s)},[]),n.shared)return a(zc,{idBase:e.idBase,load:n,marketplaceAvailable:e.marketplaceAvailable,busy:e.busy});if(o.compose)return a(Hc,{idBase:e.idBase,compose:o});let c=n.input.trim();return p(X,{idBase:e.idBase,id:"share",children:[a("form",{className:"syncify-share-part",noValidate:!0,onSubmit:l=>{l.preventDefault(),!n.fetching&&c&&n.open()},children:a(Be,{label:"Load a setup",value:n.input,onChange:n.setInput,placeholder:"Paste a code or a link",error:n.error,action:a(C,{variant:"secondary",type:"submit",disabled:n.fetching!==null||!c,children:n.fetching&&!n.fetching.pick?"Loading\u2026":"Load"})})}),r?p("section",{className:"syncify-share-part","aria-label":r.length>0?"Syncify picks":"Discover",children:[r.length>0?a(oe,{title:"Syncify picks"}):null,p(G,{children:[r.map(l=>{var u;return a(j,{name:l.name,meta:a(W,{parts:[a("span",{className:"syncify-share-pips",children:$c(l).map((d,f)=>a(ae,{kind:d},f))},"pips"),((u=n.fetching)==null?void 0:u.code)===l.code?"Loading\u2026":tt(l.extensions+l.themes+l.snippets,"item")]}),onOpen:()=>{n.open(l.code)},openLabel:`Preview ${l.name}`,disabled:n.fetching!==null},l.code)}),a(j,{name:"Find more setups on Discover",end:a(C,{variant:"secondary",size:"small",onClick:()=>Q(rn()),children:"Open"})})]})]}):null,t===void 0?null:t===null?a("div",{className:"syncify-share-part",children:a(re,{label:"Sign in to share this setup as a code",children:a(C,{variant:"secondary",onClick:e.onSignIn,children:"Sign in"})})}):a(Yc,{codes:i,compose:o,discoverOpen:r!==null,marketplaceAvailable:e.marketplaceAvailable})]})}var go="syncify:share-code-count",ho="syncify:handle";function Xy(){var t,n;let e=Number((n=(t=Spicetify.LocalStorage)==null?void 0:t.get(go))!=null?n:NaN);return Number.isInteger(e)&&e>=0?e:null}function Zy(){var t;let e=(t=Spicetify.LocalStorage)==null?void 0:t.get(ho);return e==null?void 0:e||null}function qc(){let[e,t]=S(()=>Xy()),[n,i]=S(()=>Zy()),o=le(c=>{var l,u;c===null?(l=Spicetify.LocalStorage)==null||l.remove(go):(u=Spicetify.LocalStorage)==null||u.set(go,String(c)),t(c)},[]),r=le(c=>{var l,u;c===void 0?(l=Spicetify.LocalStorage)==null||l.remove(ho):(u=Spicetify.LocalStorage)==null||u.set(ho,c!=null?c:""),i(c)},[]),s=le(()=>{o(null),r(void 0)},[o,r]);return{codeCount:e,handle:n,saveCodeCount:o,saveHandle:r,forget:s}}var Qy=2e3;function Gc(e){let{install:t}=e,n=!t||t.trusted?null:t.refused?"This Spotify account refused backups from this install. Sign in to back up from it.":"This install isn't approved yet. Its backups are kept apart until you approve it from another install or sign in.";return p(M,{children:[e.nudge?a(L,{tone:"warning",actions:p(M,{children:[a(C,{variant:"subtle",size:"small",onClick:e.onHideNudge,disabled:e.securing,children:"Not now"}),a(C,{size:"small",onClick:e.onSecure,disabled:e.securing,children:e.securing?"Securing\u2026":"Secure"})]}),children:"Your backup isn't secured. Anyone who knows your Spotify username can restore it."}):null,n?a(L,{tone:"info",children:n}):null,e.restoreResult?a(em,{manual:e.restoreResult.manual}):null]})}function em(e){let[t,n]=S(!1),i=Fa(e.manual).join(`
`);if(A(()=>{if(!t)return;let r=setTimeout(()=>n(!1),Qy);return()=>clearTimeout(r)},[t]),!i)return null;let o=e.manual.length;return p(L,{tone:"info",actions:p(M,{children:[a(C,{variant:"text",onClick:()=>{ci(i).then(n)},children:t?"Copied":"Copy"}),a(C,{variant:"subtle",onClick:$a,children:"Dismiss"})]}),children:[o===1?"1 isn't from Marketplace. Add it in a terminal:":`${o} aren't from Marketplace. Add them in a terminal:`,a("pre",{className:"syncify-commands",children:a("code",{children:i})})]})}function Jc(e){let{message:t}=e;return a(L,{tone:t.kind,actions:p(M,{children:[t.kind==="error"?a(C,{variant:"text",onClick:e.onTryAgain,disabled:e.busy,children:"Try again"}):null,a(C,{variant:"subtle",onClick:e.onDismiss,children:"Dismiss"})]}),children:t.text})}function Xc(e){let t=tm(e);return t.backedUp&&e.latest?w(m({},t),{line:[`Backed up ${bt(e.latest.metadata.last_sync_datetime)}`,`${et(e.localItemCount)} on this device`]}):w(m({},t),{line:[t.title,...t.detail]})}function tm(e){let t={backedUp:!1,supportAsk:null},n=`${et(e.localItemCount)} on this device`;return e.restoreResult&&!e.unsupported?nm(e.restoreResult):e.unsupported?w(m({},t),{title:"Update Syncify to keep backing up",detail:["Your backups are safe"],action:"how-to-update"}):e.locked?w(m({},t),{title:"Sign in to restore",detail:[e.locked==="not_owner"?"Secured by another account":"This backup is secured"],action:"sign-in"}):e.activity==="backing-up"?w(m({},t),{title:"Backing up\u2026",detail:[],action:"back-up"}):e.checked?e.latest?e.localHash&&!e.backedUp?w(m({},t),{title:"Changes since your last backup",detail:im(e.latest,e.latestItems,e.localItems,e.localConfig),action:"back-up"}):w(m({},t),{title:"Everything is backed up",detail:[`Last backup ${bt(e.latest.metadata.last_sync_datetime)}`,n],action:null,backedUp:!0}):w(m({},t),{title:"No backup yet",detail:["Save your extensions and themes to restore them after a reinstall or on another computer."],action:"back-up"}):e.checkError?w(m({},t),{title:"Couldn't check your backup",detail:[e.checkError],action:"try-again"}):w(m({},t),{title:"Checking your backup\u2026",detail:[],action:null})}function nm(e){let t=e.loaded===e.total,n=e.kind==="share";return{title:t?n?"Setup loaded":"Backup restored":`${n?"Loaded":"Restored"} ${e.loaded} of ${e.total}`,detail:[t?e.total===0?"Nothing from Marketplace to load":`${e.loaded} of ${e.total} loaded`:"Missing something? Reload Spotify once more."],action:t?null:"reload",backedUp:!1,supportAsk:t?n?"Syncify set it up for you?":"Syncify saved your setup?":null}}function im(e,t,n,i){var f;let o=new Set(t),r=new Set(n),s=n.filter(y=>!o.has(y)).length,c=t.filter(y=>!r.has(y)).length,l=(f=e.spicetify_config)!=null?f:null,u=!!(i&&!l),d=!u&&(i&&l?!rs(i,l):i!==l);return[s?`${s} added`:null,c?`${c} removed`:null,d?"Spicetify config changed":null,u?"Spicetify config not saved yet":null,`Last backup ${bt(e.metadata.last_sync_datetime)}`].filter(y=>y!==null)}function Zc(e,t){return(e==null?void 0:e.status)==="pending"&&!e.mine?w(m({kind:"claim"},ei(e)),{canAnswer:!e.not_me}):t?{kind:"install",title:ni(t),install:t}:null}var om=3,So={exists:!1,payload:null,backups:[],safetyCopy:null,pinned:[],claim:null,unapproved:[],install:null,nudge:!1},it=null;function Qc(e){var d,f,y;let[t,n]=S(()=>it),[i,o]=S(void 0),r=le(h=>{it=h,n(h)},[]),s=le(async()=>{let h,k=null;try{h=await Qe(e)}catch(N){if(!(N instanceof ye))throw N;h=So,k=N.code}let v=await se().catch(()=>null),g=v?await oa(e).catch(()=>null):null,b=v?await se().catch(()=>null):null;return r({remote:h,lockedBy:k,claims:b?g:null}),o(b),k},[e,r]),c=le(()=>{se().catch(()=>null).then(h=>o(k=>k!=null?k:h))},[]),l=le(h=>{var g;let k=it!=null?it:{remote:So,lockedBy:null,claims:null},{remote:v}=k;r(w(m({},k),{remote:w(m({},v),{exists:!0,payload:h,backups:[h,...v.backups.filter(b=>b.payload_hash!==h.payload_hash)].slice(0,om),safetyCopy:((g=v.safetyCopy)==null?void 0:g.payload_hash)===h.payload_hash?null:v.safetyCopy})}))},[r]),u=le(()=>{o(null),it&&r(w(m({},it),{claims:null}))},[r]);return{check:t,remote:(d=t==null?void 0:t.remote)!=null?d:So,lockedBy:(f=t==null?void 0:t.lockedBy)!=null?f:null,claims:(y=t==null?void 0:t.claims)!=null?y:null,session:i,setSession:o,refresh:s,readSession:c,addBackup:l,forgetClaims:u}}function el(){let[e,t]=S(null),[n,i]=S(!1),o=le(async()=>{try{let r=await Nn();return t(r),i(!1),r}catch(r){throw i(!0),r}},[]);return{local:e,localFailed:n,refreshLocal:o}}var rm=600*1e3;function tl(){let[e,t]=S(null);return A(()=>{let n=D();if(!Qi(n.version))return;let i=!0;return Za(n.releasesUrl).then(o=>{i&&o&&eo(o,n.version)>0&&t(o)}),()=>{i=!1}},[]),e}function nl(){let[e,t]=S(()=>Da()),[n]=S(()=>Date.now());return A(()=>Ua(t),[]),{result:e,recent:!!(e&&n-e.at<rm)}}function il(e){let t=D(),n=[["Report an issue",t.issueUrl],["GitHub",t.githubUrl],["Discord",t.discordUrl],["Support on Ko-fi",t.kofiUrl],["Privacy",`${t.webUrl}/privacy`],["Terms",`${t.webUrl}/terms`]];return p("footer",{className:"syncify-window-footer",children:[p("span",{className:"syncify-window-footer-version",children:[p("span",{children:["Syncify ",t.version]}),e.newerVersion?a(C,{variant:"text",size:"tiny",className:"syncify-window-update",onClick:()=>e.loadedByLoader?window.location.reload():Q(`${t.githubUrl}#updating`),children:a(W,{parts:[`${e.newerVersion} is out`,e.loadedByLoader?"Reload":"How to update"]})}):null]}),a("span",{className:"syncify-window-footer-links",children:n.map(([i,o])=>a(C,{variant:"subtle",size:"tiny",onClick:()=>Q(o),children:i},i))})]})}var sm={"back-up":"Back up now","try-again":"Try again","sign-in":"Sign in","how-to-update":"How to update",reload:"Reload"};function ol(e){let{status:t,alert:n}=e,i=t.action,o=i?a(C,{variant:i==="back-up"||i==="sign-in"?"primary":"secondary",size:n?"small":"regular",onClick:()=>e.onAction(i),disabled:e.busy,children:i==="back-up"&&e.backingUp?"Backing up\u2026":sm[i]}):null;return n?p("section",{className:"syncify-status","aria-label":"Status",children:[p("div",{className:"syncify-status-alert",role:"alert",children:[a("span",{className:"syncify-status-alert-mark",children:a(ke,{tone:"warning",icon:a(so,{})})}),p("div",{className:"syncify-status-text",children:[a("h2",{className:"syncify-status-title",children:n.title}),n.kind==="claim"&&n.text?a("p",{className:"syncify-status-sentence",children:n.text}):null]}),n.kind==="claim"?n.canAnswer?a(C,{variant:"secondary",onClick:e.onNotMe,disabled:e.answering,children:"Not me"}):null:p("span",{className:"syncify-status-answers",children:[a(C,{variant:"secondary",onClick:()=>e.onAnswerInstall("reject"),disabled:e.answering,children:"Not mine"}),a(C,{onClick:()=>e.onAnswerInstall("approve"),disabled:e.answering,children:"Approve"})]})]}),p("div",{className:"syncify-status-line","aria-live":"polite",children:[t.backedUp?a(Oe,{className:"syncify-status-check"}):null,a(W,{parts:t.line}),o]})]}):a("section",{className:"syncify-status","aria-label":"Status",children:p("div",{className:"syncify-status-main","aria-live":"polite",children:[p("div",{className:"syncify-status-text",children:[a("h2",{className:"syncify-status-title",children:t.title}),t.detail.length>0?a(W,{parts:t.detail}):null,t.supportAsk?p("p",{className:"syncify-status-ask",children:[a("span",{children:t.supportAsk}),a(C,{variant:"text",onClick:e.onSupport,children:"Support it on Ko-fi"})]}):null]}),o]})})}function rl(e){let{codeCount:t,account:n,newerVersion:i}=e,o=[{id:"backups",label:"Backups"},{id:"share",label:"Share",status:t?a(co,{count:t,label:tt(t,"code")}):void 0},{id:"account",label:"Account",status:n?n.kind==="ok"?a("span",{className:"syncify-tab-check",role:"img","aria-label":n.label,children:a(Oe,{})}):a(ke,{tone:"warning",label:n.label}):void 0},{id:"settings",label:"Settings",status:e.settingsHeld?a(ke,{tone:"warning",label:"An item's extension settings aren't syncing"}):i?a(ke,{tone:"info",label:`Syncify ${i} is out`}):void 0}];return a(fo,{tabs:o,selected:e.selected,onSelect:e.onSelect,idBase:e.idBase,label:"Syncify"})}var sl=!1;function li(e){var Eo,No,Po,To,Ao,_o,Mo,Lo,Bo,Oo,Do,Uo,$o;let t=F("syncify"),n=D(),[i,o]=S(()=>q()),{local:r,localFailed:s,refreshLocal:c}=el(),l=Qc(i),u=qc(),d=tl(),f=nl(),y=Oc(),[h,k]=S(()=>!sl),[v]=S(()=>Xa()!==null),[g,b]=S((Eo=e.tab)!=null?Eo:"backups"),[N,_]=S(()=>l.check?"idle":"checking"),[P,x]=S(null),[I,E]=S(null),[O,T]=S(!1),[H,U]=S(!1),[K,Fe]=S(!1),[rt,ce]=S(null),[vt,di]=S(()=>ca()),[Y,$]=S(e.secure===!0),te=z(!1),{remote:ee,lockedBy:ge,claims:je,session:de}=l,xt=N!=="idle",fi=(No=r==null?void 0:r.hash)!=null?No:null,pl=((Po=ee.claim)==null?void 0:Po.status)==="pending"&&!ee.claim.mine?ee.claim:null,We=lc(je,ge,pl!==null),ko=de!=null&&We.kind==="secured",sn=ko&&i.settingsSyncEnabled,vo=sn&&y.arrived&&!y.arrived.hidden?y.arrived:null,gl=sn&&nt(y,i.settingsSyncOff).length>0,hl=!!(fi&&ee.backups.some(R=>R.payload_hash===fi)),xo=Xc({activity:N,checked:l.check!==null,checkError:P,unsupported:O,locked:ge,latest:ee.payload,latestItems:ee.payload?St(ee.payload).map(R=>R.key):[],backedUp:hl,localHash:fi,localItems:(To=r==null?void 0:r.installedItems)!=null?To:[],localItemCount:(Ao=r==null?void 0:r.installedItemCount)!=null?Ao:0,localConfig:(_o=r==null?void 0:r.spicetifyConfig)!=null?_o:null,restoreResult:f.recent?f.result:null}),Sl=Zc(ee.claim,(Lo=(Mo=ee.install)==null?void 0:Mo.waiting[0])!=null?Lo:null),bl=!vt&&!ge&&ee.payload!==null&&g!=="account"&&(de?We.kind==="open":de===null&&ee.nudge),wl=(de?(Bo=je==null?void 0:je.accounts)!=null?Bo:[]:[]).filter(R=>R.status==="final").map((R,V)=>({hash:R.hash,label:`Spotify account ${V+1}${R.device_info?` from ${R.device_info}`:""}`})).filter(R=>R.hash!==(je==null?void 0:je.hash));async function he(R={}){try{(!R.silent||!l.check)&&_("checking"),R.silent||(E(null),x(null)),await c(),await l.refresh()&&b("account"),x(null),_("idle")}catch(V){Ct(V)}}function Ct(R){if(_("idle"),R instanceof _t){T(!0),E(null);return}if(R instanceof Ge){E({kind:"error",text:R.message}),he({silent:!0});return}if(R instanceof ye&&R.code!=="not_linked"){E(null),he({silent:!0});return}let V=R instanceof Error?R.message:String(R);l.check?E({kind:"error",text:V}):x(V),Spicetify.showNotification(V,!0,6e3)}async function kl(){try{_("backing-up"),E(null);let R=await Jt(i).catch(()=>null),{payload:V,unchanged:Ye,unapproved:yi,settings:Pl}=await qt(i,R);if(await Vn(R,Pl,ee.backups).catch(()=>null),await c(),yi){await he({silent:!0}),E({kind:"warning",text:"Backed up, but kept apart until this install is approved."}),Spicetify.showNotification("Syncify: backed up, waiting for approval");return}Ye||l.addBackup(V),_("idle"),Spicetify.showNotification(Ye?"Syncify: everything is already backed up":"Syncify backup complete")}catch(R){Ct(R)}}async function vl(R){var V;try{_("restoring"),E(null),await na(i,R.row.backup,(V=R.linkedHash)!=null?V:void 0,R.skipped,R.settings),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),Qt(R.manual),setTimeout(()=>window.location.reload(),1e3)}catch(Ye){Ct(Ye)}}async function xl(R){var Ye;let V=(Ye=ee.install)==null?void 0:Ye.waiting[0];if(V){U(!0);try{await $n(i,V.id,R),Spicetify.showNotification(R==="approve"?"Syncify: install approved":"Syncify: install refused"),await he({silent:!0})}catch(yi){Ct(yi)}finally{U(!1)}}}async function Cl(){U(!0);try{Spicetify.showNotification(ti(await Hn(i))),await he({silent:!0})}catch(R){E({kind:"error",text:R instanceof Error?R.message:String(R)})}finally{U(!1)}}async function It(){Fe(!0),ce(null);try{await ra(i)}catch(R){R instanceof $e&&["claim_pending","claimed"].includes(R.code)||ce(R instanceof Error?R.message:String(R))}finally{await he({silent:!0}),Fe(!1)}}function Il(){de?It():b("account")}function Rl(){$(!0),de?It():b("account")}function El(R){l.setSession(R),te.current=!0,!ge&&ee.payload?It():he({silent:!0})}function Co(){u.forget(),l.forgetClaims(),ce(null),he({silent:!0})}function Nl(R){R==="back-up"?kl():R==="try-again"?he():R==="sign-in"?b("account"):R==="how-to-update"?Q(`${n.githubUrl}#updating`):Ha()}A(()=>Wn(()=>o(R=>w(m({},R),{settingsSyncOff:q().settingsSyncOff}))),[]);let Io=Te(()=>{l.readSession(),he({silent:!0})});A(()=>Io.current(),[Io]);let Ro=Te(()=>{!e.secure||te.current||K||!de||We.kind!=="open"||ge||(te.current=!0,It())});return A(()=>Ro.current(),[Ro,de,We.kind,ge,K]),p("div",{className:"syncify-ui syncify-window",onClick:bo,onMouseDown:bo,onPointerDown:bo,children:[p("div",{className:"syncify-window-top",children:[a(ol,{status:xo,alert:Sl,backingUp:N==="backing-up",busy:xt||xo.action==="back-up"&&ge!==null,answering:H,onAction:Nl,onNotMe:()=>{Cl()},onAnswerInstall:R=>{xl(R)},onSupport:()=>Q(n.kofiUrl)}),I?a(Jc,{message:I,busy:xt,onTryAgain:()=>{he()},onDismiss:()=>E(null)}):null,vo?a(L,{tone:"info",actions:p(M,{children:[a(C,{variant:"subtle",size:"small",onClick:ha,children:"Not now"}),a(C,{size:"small",onClick:()=>window.location.reload(),children:"Reload Spotify"})]}),children:Yn(vo.names)}):null,a(rl,{idBase:t,selected:g,onSelect:b,codeCount:de?u.codeCount:null,account:uc(de,ge,We),newerVersion:d,settingsHeld:gl})]}),g==="backups"?a(xc,{idBase:t,config:i,remote:l.check?ee:null,failed:P!==null||s,lockedBy:ge,local:r,otherAccounts:wl,notices:a(Gc,{nudge:bl,securing:K,onSecure:Rl,onHideNudge:()=>{la(),di(!0)},install:ge||We.kind==="secured"?null:ee.install,restoreResult:f.result}),canShareSettings:sn,shareSettings:i.shareRestoredSettings,onShareSettingsChange:R=>{let V=w(m({},i),{shareRestoredSettings:R});Ze(V),o(V)},busy:xt,restoring:N==="restoring",onRestore:R=>{vl(R)},onError:Ct}):g==="share"?a(Vc,{idBase:t,config:i,session:de,localItems:(Oo=r==null?void 0:r.items)!=null?Oo:[],localConfig:(Do=r==null?void 0:r.spicetifyConfig)!=null?Do:null,localTheme:(Uo=r==null?void 0:r.activeTheme)!=null?Uo:null,marketplaceAvailable:($o=r==null?void 0:r.marketplaceAvailable)!=null?$o:null,busy:xt,onSignIn:()=>b("account"),onSignedOut:Co,onCodeCount:u.saveCodeCount,onHandle:u.saveHandle}):g==="account"?a(mc,{idBase:t,session:de,locked:ge,secure:We,securing:K,secureError:rt,onSecure:()=>{It()},nudge:Y,onSignedIn:El,onSignedOut:Co,handle:u.handle,onHandle:u.saveHandle}):a(Bc,{idBase:t,config:i,onConfigChange:o,busy:xt,unsupported:O,syncStatus:y,secured:ko,securing:K,onSecure:Il}),sn&&y.choices.length>0?a(Cc,{choices:y.choices,open:h,onClose:()=>{sl=!0,k(!1)}}):null,a(il,{newerVersion:d,loadedByLoader:v})]})}function bo(e){e.stopPropagation()}var al=`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="-2.5 -2.5 37 37" aria-hidden="true" focusable="false"><defs><mask id="syncify-mark-gap" maskUnits="userSpaceOnUse" x="-2" y="-2" width="36" height="36"><rect x="-2" y="-2" width="36" height="36" fill="#fff"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></mask></defs><g mask="url(#syncify-mark-gap)"><g transform="rotate(15 16 16)"><path d="M16 16L16 7.4A8.6 8.6 0 0 1 24.6 16Z" fill="#6cd1d1" transform="translate(0.42 -0.42)"/><path d="M16 16L24.6 16A8.6 8.6 0 0 1 16 24.6Z" fill="#efa4c1" transform="translate(0.42 0.42)"/><path d="M16 16L16 24.6A8.6 8.6 0 0 1 7.4 16Z" fill="#d3c48c" transform="translate(-0.42 0.42)"/><path d="M16 16L7.4 16A8.6 8.6 0 0 1 16 7.4Z" fill="#88bcf2" transform="translate(-0.42 -0.42)"/></g></g><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 28.03A12.4 12.4 0 1 1 28.03 19"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91"/></g></svg>
`;var Ae=null;function ot(){return!!(Ae!=null&&Ae.container.isConnected)}function kt(){Spicetify.PopupModal.hide()}function ze(e){cl(Ae);let t=document.createElement("div");Ae={container:t,root:null,watch:null};try{Spicetify.PopupModal.display({title:D().extensionName,content:t,isLarge:!1})}catch(n){throw ue("Failed to open PopupModal",n),n}lm(t),dm(t,e),cm(t)}function cm(e){let t=Ae;if((t==null?void 0:t.container)!==e||typeof MutationObserver!="function")return;let n=new MutationObserver(()=>{e.isConnected||cl(t)});n.observe(document.body,{childList:!0,subtree:!0}),t.watch=n}function cl(e){var t,n;e&&((t=e.watch)==null||t.disconnect(),e.watch=null,(n=e.root)==null||n.unmount(),e.root=null)}function lm(e){requestAnimationFrame(()=>{let t=um(e);t==null||t.classList.add("syncify-modal-shell");let n=t==null?void 0:t.querySelector(".main-trackCreditsModal-header h1");if(n&&!n.querySelector(".syncify-modal-mark")){let o=document.createElement("span");o.className="syncify-modal-mark",o.innerHTML=al,n.prepend(o)}let i=t==null?void 0:t.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');i&&(i.classList.add("syncify-modal-close"),i.setAttribute("aria-label",`Close ${D().extensionName}`),i.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function um(e){let t=e.parentElement;for(;t&&t!==document.body;){if(t.querySelector(".main-trackCreditsModal-header"))return t;t=t.parentElement}return e.closest('[class*="trackCreditsModal"]')}function dm(e,t){try{if(typeof Spicetify.ReactDOM.createRoot=="function"){let n=Spicetify.ReactDOM.createRoot(e);n.render(t),(Ae==null?void 0:Ae.container)===e&&(Ae.root=n),ie("Window rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(t,e),ie("Window rendered",{renderer:"render"})}catch(n){throw ue("Failed to render window",n),n}}function ui(e){return a("div",{className:"syncify-ui syncify-launch-notice",children:p(Jn,{title:e.title,actions:e.actions,children:[e.children?a("p",{children:e.children}):null,e.error?a(L,{tone:"error",children:e.error}):null]})})}function ll(){let[e,t]=S(!1),[n,i]=S(null);async function o(r){t(!0),i(null);try{await r()}catch(s){i(s instanceof Error?s.message:String(s)),t(!1)}}return{busy:e,error:n,run:o}}function ul(e){let{title:t,text:n}=ei(e.claim),i=ll();return a(ui,{title:t,error:i.error,actions:p(M,{children:[a(C,{variant:"secondary",onClick:e.onClose,disabled:i.busy,children:"Close"}),a(C,{onClick:()=>{i.run(async()=>{Spicetify.showNotification(ti(await Hn(q()))),e.onClose()})},disabled:i.busy,children:"Not me"})]}),children:n})}function dl(e){return a(ui,{title:cc(e.claim),actions:a(C,{onClick:e.onClose,children:"Close"})})}function fl(e){let t=ll(),n=i=>{t.run(async()=>{await $n(q(),e.install.id,i),Spicetify.showNotification(i==="approve"?"Syncify: install approved":"Syncify: install refused"),e.onDone()})};return a(ui,{title:ni(e.install),error:t.error,actions:p(M,{children:[a(C,{variant:"secondary",onClick:()=>n("reject"),disabled:t.busy,children:"Not mine"}),a(C,{onClick:()=>n("approve"),disabled:t.busy,children:"Approve"})]}),children:"Approve it if it's yours."})}function yl(e){return a(ui,{title:"Your backup isn't secured",actions:p(M,{children:[a(C,{variant:"secondary",onClick:e.onClose,children:"Not now"}),a(C,{onClick:t=>{t.stopPropagation(),e.onSecure()},children:"Secure"})]}),children:"Anyone who knows your Spotify username can restore it."})}function fm(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var ml="syncify-styles";function ym(){if(document.getElementById(ml)){ie("Another copy of Syncify is running; stopping this one");return}Fo(Spicetify.React),mm();let e=q();ea({topbarButton:Va(wo),menuItem:Ga(wo)}),On(e.entryPoint),Ki(e.shortcut,wo),Ta({onClaim:pm,onUndone:gm,onInstall:hm,onNudge:Sm,onFirstSync:bm}).catch(t=>{ue("Startup sync check failed",t)}),za().catch(t=>{ue("Restore check failed",t)})}function mm(){let e=document.createElement("style");e.id=ml,e.textContent=br,document.head.appendChild(e)}function wo(){if(ot()){kt();return}ze(a(li,{}))}function pm(e){ot()||(ie("Opening claim notice"),ze(a(ul,{claim:e,onClose:kt})))}function gm(e){return ot()?!1:(ie("Opening undone claim notice"),ze(a(dl,{claim:e,onClose:kt})),!0)}function hm(e){ot()||(ie("Opening install notice"),ze(a(fl,{install:e,onDone:kt})))}function Sm(){ot()||(ie("Opening nudge notice"),da(),ze(a(yl,{onSecure:()=>ze(a(li,{tab:"account",secure:!0})),onClose:kt})))}function bm(){ot()||(ie("Opening first sync"),ze(a(li,{tab:"settings"})))}Ka();(function e(){if(!fm()){setTimeout(e,100);return}ie("Spicetify APIs ready"),ym()})();})();
