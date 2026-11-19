// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var Nl=Object.defineProperty,Pl=Object.defineProperties;var Tl=Object.getOwnPropertyDescriptors;var an=Object.getOwnPropertySymbols;var Ho=Object.prototype.hasOwnProperty,Ko=Object.prototype.propertyIsEnumerable;var $o=(e,t,n)=>t in e?Nl(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,m=(e,t)=>{for(var n in t||(t={}))Ho.call(t,n)&&$o(e,n,t[n]);if(an)for(var n of an(t))Ko.call(t,n)&&$o(e,n,t[n]);return e},w=(e,t)=>Pl(e,Tl(t));var Se=(e,t)=>{var n={};for(var i in e)Ho.call(e,i)&&t.indexOf(i)<0&&(n[i]=e[i]);if(e!=null&&an)for(var i of an(e))t.indexOf(i)<0&&Ko.call(e,i)&&(n[i]=e[i]);return n};var Rt,M,le,T,Et,J,Al,H,h;function zo(e){({createElement:Rt,Fragment:M,useCallback:le,useEffect:T,useLayoutEffect:Et,useMemo:J,useReducer:Al,useRef:H,useState:h}=e)}var Fo=`/* Shared values for every part. Colors come from the active Spicetify theme,
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
`;var jo=`.syncify-icon {
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
`;var Wo=`.syncify-btn,
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
`;var Yo=`.syncify-switch-control {
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
`;var Vo=`.syncify-checkbox {
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
`;var qo=`/* A square ring; picked, the ring and a square inside it in the accent. */
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
`;var Go=`.syncify-setting-row {
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
`;var Jo=`/* Facts on one line, wrapping between facts. Each fact is trimmed to its
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
`;var Xo=`.syncify-list {
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
`;var Zo=`.syncify-field-group {
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
`;var Qo=`.syncify-menu {
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
`;var er=`.syncify-meter {
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
`;var tr=`.syncify-mark-square {
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
`;var nr=`.syncify-notice {
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
`;var ir=`.syncify-dialog {
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
`;var or=`/* When the window is too narrow for every tab, the row scrolls sideways
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
`;var rr=`.syncify-pip-square {
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
`;var sr=`.syncify-section-label {
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
`;var ar=`.syncify-keycap {
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
`;var cr=`/* A bar as tall as the capitals of the text it stands in for. */
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
`;var lr=[Fo,jo,Wo,Yo,Vo,qo,Go,Jo,Xo,Zo,Qo,er,tr,nr,ir,or,rr,sr,ar,cr].join(`
`);var ur=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var dr=`/* The window fits the height Spotify's popup leaves it, so the status and
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
`;var fr=`/* The safety copy's shield, after its name. */
.syncify-safety-mark {
    color: var(--syncify-color-accent);
}

/* "Current", where an older backup has its chevron. */
.syncify-row-status {
    color: var(--syncify-color-accent);
    font-size: var(--syncify-text-small);
    font-weight: 700;
}
`;var yr=`/* Adds, Updates and Removes: plain colored text, not chips. */
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
`;var mr=`/* Loading a setup, the picks and your codes, split by dashed lines. */
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
`;var pr=`/* The code step's Resend and Use another email. */
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
`;var gr=`/* Turn off or Use default, then the key. */
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
`;var hr=`/* A launch notice in Spotify's popup: the dialog layout, the popup's width. */
.syncify-launch-notice {
    width: 100%;
}
`;var Sr=[lr,ur,dr,yr,fr,mr,pr,gr,hr].join(`
`);var su="syncify",st="state";function yi(){let e;try{e=window.indexedDB}catch(t){return Promise.resolve(null)}return e?new Promise(t=>{let n;try{n=e.open(su,1)}catch(i){t(null);return}n.onupgradeneeded=()=>{n.result.createObjectStore(st)},n.onerror=()=>t(null),n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}function mi(e,t){let n=yi().then(i=>new Promise((o,r)=>{if(!i){r(new Error("IndexedDB isn't available."));return}try{let s=i.transaction(st,e),c=t(s.objectStore(st));s.oncomplete=()=>{i.close(),o(c.result)},s.onerror=s.onabort=()=>{var l;i.close(),r((l=s.error)!=null?l:new Error("IndexedDB failed."))}}catch(s){i.close(),r(s)}}));return Promise.race([n,new Promise((i,o)=>setTimeout(()=>o(new Error("IndexedDB took too long.")),2e3))])}function be(e){return mi("readonly",t=>t.get(e))}async function fe(e,t){await mi("readwrite",n=>n.put(t,e))}async function cn(e){await mi("readwrite",t=>t.delete(e))}var Ie={extensionName:"Syncify",version:"1.19.0",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",discordUrl:"https://syncify.wsoltani.com/discord",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com",shareUrl:"https://syncs.wsoltani.com"};function O(){var t,n,i,o,r,s,c,l,u,d;let e=window.SyncifyConfig;return{extensionName:(t=_e(e==null?void 0:e.extensionName))!=null?t:Ie.extensionName,version:(n=br(e==null?void 0:e.version))!=null?n:Ie.version,workerUrl:(i=_e(e==null?void 0:e.workerUrl))!=null?i:Ie.workerUrl,webUrl:(o=_e(e==null?void 0:e.webUrl))!=null?o:Ie.webUrl,githubUrl:(r=_e(e==null?void 0:e.githubUrl))!=null?r:Ie.githubUrl,kofiUrl:(s=_e(e==null?void 0:e.kofiUrl))!=null?s:Ie.kofiUrl,discordUrl:(c=_e(e==null?void 0:e.discordUrl))!=null?c:Ie.discordUrl,issueUrl:(l=_e(e==null?void 0:e.issueUrl))!=null?l:Ie.issueUrl,releasesUrl:(u=_e(e==null?void 0:e.releasesUrl))!=null?u:Ie.releasesUrl,shareUrl:(d=_e(e==null?void 0:e.shareUrl))!=null?d:Ie.shareUrl}}function _e(e){return br(e)}function br(e){return typeof e=="string"&&e.trim()?e.trim():null}var au="x-syncify-version",cu="x-syncify-install",lu="x-syncify-timezone",wr="install-id",kr="syncify:install-id",uu=2e3,ln=null;async function vr(){let e={[au]:O().version,[cu]:(await pi()).id},t=yu();return t&&(e[lu]=t),e}function pi(){return ln!=null||(ln=du().catch(()=>({id:un(),inDatabase:!1}))),ln}async function du(){let e=await Promise.race([fu(),new Promise(t=>setTimeout(()=>t(null),uu))]);if(e)return{id:e,inDatabase:!0};try{let t=window.localStorage.getItem(kr);if(t&&xr(t))return{id:t,inDatabase:!1};let n=un();return window.localStorage.setItem(kr,n),{id:n,inDatabase:!1}}catch(t){return{id:un(),inDatabase:!1}}}async function fu(){let e=await yi();return e?new Promise(t=>{let n=null;try{let i=e.transaction(st,"readwrite"),o=i.objectStore(st),r=o.get(wr);r.onsuccess=()=>{if(typeof r.result=="string"&&xr(r.result)){n=r.result;return}n=un(),o.put(n,wr)},i.oncomplete=()=>{e.close(),t(n)},i.onerror=i.onabort=()=>{e.close(),t(null)}}catch(i){e.close(),t(null)}}):null}function un(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t=[...e].map(n=>n.toString(16).padStart(2,"0"));return[t.slice(0,4).join(""),t.slice(4,6).join(""),t.slice(6,8).join(""),t.slice(8,10).join(""),t.slice(10).join("")].join("-")}function xr(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(e)}function yu(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(e){return null}}var mu="syncify-signature-v1",pu={name:"ECDSA",hash:"SHA-256"};function dn(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function fn(e){return gi(new Uint8Array(await crypto.subtle.exportKey("raw",e)))}async function Nt(e,t,n,i,o){let r=await gu(t,n,i,o),s=await crypto.subtle.sign(pu,e,r);return gi(new Uint8Array(s))}async function gu(e,t,n,i){let{pathname:o,search:r}=new URL(n),s=new TextEncoder,c=gi(new Uint8Array(await crypto.subtle.digest("SHA-256",s.encode(i))));return s.encode([mu,e,t.toUpperCase(),o+r,c].join(`
`))}function gi(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var Cr="device-key",hi="session",Ir="salt",We=null,Pt,Rr={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function at(e){if(We)return We;let t=await be(Cr);return hu(t)?(We=Promise.resolve(t),t):e?(We=dn().then(async n=>(await fe(Cr,n),n)),We.catch(()=>{We=null}),We):null}async function re(){let e=await be(hi);return Su(e)?e:null}function Si(e){return fe(hi,e)}async function Ye(){await cn(hi).catch(()=>{})}async function yn(){if(Pt===void 0){let e=await be(Ir).catch(()=>{});Pt=typeof e=="string"?e:null}return Pt}async function mn(e){e!==Pt&&(Pt=e,await fe(Ir,e).catch(()=>{}))}function pn(){return Rr}function Er(e){Rr=e}function hu(e){let t=e;return!!(t&&t.privateKey instanceof CryptoKey&&t.publicKey instanceof CryptoKey)}function Su(e){let t=e;return!!(t&&typeof t.token=="string"&&t.token&&typeof t.email=="string")}var Nr="install-key",ct=null;function Pr(){return ct!=null||(ct=bu()),ct.catch(()=>{ct=null}),ct.catch(()=>null)}async function bu(){if(!(await pi()).inDatabase)return null;let e=await be(Nr),t=ku(e)?e:await wu();return{privateKey:t.privateKey,publicKey:await fn(t.publicKey)}}async function wu(){let e=await dn();return await fe(Nr,e),e}function ku(e){let t=e;return!!(t&&t.privateKey instanceof CryptoKey&&t.publicKey instanceof CryptoKey)}var vu="/api/auth/email-otp/send-verification-otp",xu="/api/auth/sign-in/email-otp",Cu="/api/auth/get-session",Iu="/api/auth/sign-out",Ru="/api/auth/link",Eu="x-syncify-device-key",Nu="x-syncify-signature",Tr="x-syncify-salt",Pu="none",Tu={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again.",link_failed:"Couldn't open the website. Try again."},B=class extends Error{constructor(n,i=null,o=null){var r;super((r=Tu[n])!=null?r:"Sign-in failed. Try again.");this.code=n;this.retryAfter=i;this.share=o;this.name="AccountError"}};function De(e){return e instanceof B?e.message:"Sign-in failed. Try again."}async function Ar(e,t={}){let n=await At(vu,{method:"POST",body:JSON.stringify(m({email:e,type:"sign-in"},t.nudge?{nudge:!0}:{}))});return typeof(n==null?void 0:n.resend_in)=="number"?n.resend_in:60}async function _r(e,t){var r;let n=await at(!0).catch(()=>{throw new B("no_device_key")}),i=await At(xu,{method:"POST",body:JSON.stringify({email:e,otp:t}),keys:n,sendPublicKey:!0});if(typeof(i==null?void 0:i.token)!="string"||!i.token)throw new B("sign_in_failed");let o={token:i.token,email:typeof((r=i.user)==null?void 0:r.email)=="string"?i.user.email:e};return await Si(o).catch(()=>{throw new B("no_device_key")}),bi=!0,o}var bi=!1;async function Mr(){var t;let e=await re();if(!e||bi)return e;try{let n=await gn(e,Cu,"GET");bi=!0;let i=(t=n==null?void 0:n.user)==null?void 0:t.email;if(typeof i!="string"||i===e.email)return e;let o=w(m({},e),{email:i});return await Si(o).catch(()=>{}),o}catch(n){if(n instanceof B&&n.code==="signed_out")return null;throw n}}async function Lr(){let e=await re().catch(()=>null);e&&await gn(e,Iu,"POST").catch(()=>{}),await Ye()}async function Br(){let e=await re();if(!e)throw new B("signed_out");let t=await gn(e,Ru,"POST"),n=typeof(t==null?void 0:t.url)=="string"?t.url:"",i=new URL(O().webUrl).origin;if(!n.startsWith(`${i}/link#`))throw new B("link_failed");return n}async function Tt(e,t,n){let i=await re();if(!i)throw new B("signed_out");return gn(i,e,t,n)}async function Or(e,t,n){let i=await re().catch(()=>null),o=i?await at(!1).catch(()=>null):null;await At(e,m({method:"POST",body:JSON.stringify(t),headers:n,keepalive:!0},i&&o?{token:i.token,keys:o}:{}))}async function gn(e,t,n,i){let o=await at(!1);if(!o)throw await Ye(),new B("signed_out");return At(t,m({method:n,token:e.token,keys:o},i===void 0?{}:{body:JSON.stringify(i)}))}async function At(e,t,n=!1){var f,y,S;let i=`${O().webUrl.replace(/\/+$/,"")}${e}`,o=m({},t.headers);if(t.body!==void 0&&(o["content-type"]="application/json"),t.token&&(o.authorization=`Bearer ${t.token}`),t.keys){let k=(f=await yn())!=null?f:Pu;o[Tr]=k,o[Nu]=await Nt(t.keys.privateKey,k,t.method,i,(y=t.body)!=null?y:""),t.sendPublicKey&&(o[Eu]=await fn(t.keys.publicKey))}let r;try{r=await fetch(i,{method:t.method,headers:o,body:t.body,keepalive:t.keepalive})}catch(k){throw new B("offline")}let s=r.headers.get(Tr);s&&await mn(s);let c=await r.json().catch(()=>null);if(r.ok)return c;let l=typeof(c==null?void 0:c.code)=="string"?c.code:r.status===503?"unavailable":"failed";if(l==="stale_salt"&&t.keys&&!n)return At(e,t,!0);l==="signed_out"&&await Ye();let u=Number(r.headers.get("retry-after")),d=c==null?void 0:c.share;throw new B(l,Number.isFinite(u)&&u>0?u:(S=Au[l])!=null?S:null,typeof(d==null?void 0:d.code)=="string"?{code:d.code,link:typeof d.link=="string"?d.link:null}:null)}var Au={resend_wait:60,too_many_requests:60,send_failed:60};var _u="x-syncify-user-hash",Mu="x-syncify-identity",Lu="x-syncify-signature",Bu="x-syncify-install-key",Ou="x-syncify-install-signature",wi="x-syncify-salt",Du="none",Uu="/restores",$u="/sync",Hu="/settings/delete",Ku="x-syncify-settings-bytes",zu="/installs",Fu="hash",Dr=3,_t=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}},ye=class extends Error{constructor(n){super(n==="not_linked"?"Couldn't read that Spotify account's backups.":"Sign in to restore this backup.");this.code=n;this.name="LockedError"}},Ve=class extends Error{constructor(){super("This Spotify account doesn't accept backups from this install. Sign in to back up."),this.name="InstallRefusedError"}};async function $r(e,t,n,i){var c,l;let o=JSON.stringify(n),r=await Me(e,t,{method:"POST",headers:m({"content-type":"application/json"},i!==void 0?{[Ku]:String(new TextEncoder().encode(i).byteLength)}:{}),body:i!==void 0?i+o:o});if(r.status===403&&((c=await r.json().catch(()=>null))==null?void 0:c.code)==="install_refused")throw new Ve;if(!r.ok)throw new Error(`Backup failed with HTTP ${r.status}.`);let s=await r.json().catch(()=>null);return{unchanged:(s==null?void 0:s.unchanged)===!0,unapproved:(s==null?void 0:s.quarantined)===!0,settings:(l=s==null?void 0:s.settings)!=null?l:null}}async function Hr(e,t,n,i){let o=await Me(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({install:n,action:i})},zu);if(o.ok)return;let r=await o.json().catch(()=>null);if((r==null?void 0:r.code)!=="not_pending")throw new Error(`Couldn't answer with HTTP ${o.status}.`)}async function ki(e,t,n,i){var x,g,b,E,A,P;let o=await Me(e,t,i!==void 0&&!n?{method:"POST",headers:{"content-type":"application/json"},body:i}:{method:"GET"},i!==void 0&&!n?$u:Fr("/",n));if(o.status===404){let v=await o.json().catch(()=>null);return{settings:(x=v==null?void 0:v.settings)!=null?x:null,exists:!1,payload:null,backups:[],safetyCopy:null,claim:Mt(v==null?void 0:v.claim),unapproved:[],install:Ur(v==null?void 0:v.install),nudge:!1}}if(!o.ok)throw new Error(`Restore failed with HTTP ${o.status}.`);let r=await o.json(),s=Mt(r.claim),c=Ur(r.install),l=r.nudge===!0,u=(g=r.settings)!=null?g:null;delete r.claim,delete r.install,delete r.nudge,delete r.settings;let d=[r,...(b=r.backup_history)!=null?b:[]];if(!d.every(v=>v.backup))return{exists:!0,payload:r,backups:d.slice(0,Dr),safetyCopy:(E=d[Dr])!=null?E:null,claim:s,unapproved:[],install:c,nudge:l,settings:u};let f=d.filter(v=>{var N;return((N=v.backup)==null?void 0:N.kind)==="rolling"}),y=(A=d.find(v=>{var N;return((N=v.backup)==null?void 0:N.kind)==="anchor"}))!=null?A:null,S=d.filter(v=>{var N;return((N=v.backup)==null?void 0:N.kind)==="quarantined"}),k=(P=f[0])!=null?P:y;return k?f.length===0&&y?{exists:!0,payload:k,backups:[y],safetyCopy:null,claim:s,unapproved:S,install:c,nudge:l,settings:u}:{exists:!0,payload:k,backups:f,safetyCopy:y,claim:s,unapproved:S,install:c,nudge:l,settings:u}:{exists:!1,payload:null,backups:[],safetyCopy:null,claim:s,unapproved:S,install:c,nudge:l,settings:u}}async function Kr(e,t,n){let i=await Me(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({item:n})},Hu),o=await i.json().catch(()=>null);if(!i.ok||typeof(o==null?void 0:o.version)!="number")throw new Error(i.status===429?"Syncify can't delete more synced copies today. Try again tomorrow.":`Couldn't delete the synced copy with HTTP ${i.status}.`);return{version:o.version}}async function zr(e,t,n,i){try{await Me(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:n}),keepalive:!0},Fr(Uu,i))}catch(o){}}async function Me(e,t,n,i="",o=!1){var x,g,b,E,A;let r=i?`${e.replace(/\/+$/,"")}${i}`:e,s=(x=n.method)!=null?x:"GET",c=await re().catch(()=>null),l=c?await at(!1).catch(()=>null):null,u=await Pr(),d={},f=(g=await yn())!=null?g:Du;c&&l&&(d.authorization=`Bearer ${c.token}`,d[wi]=f,d[Lu]=await Nt(l.privateKey,f,s,r,(b=n.body)!=null?b:"")),u&&(d[wi]=f,d[Bu]=u.publicKey,d[Ou]=await Nt(u.privateKey,f,s,r,(E=n.body)!=null?E:""));let y=await fetch(r,w(m({},n),{headers:m(w(m(m({},n.headers),await vr()),{[_u]:t.hash,[Mu]:t.field}),d)})),S=y.headers.get(wi);if(S&&await mn(S),y.status===426)throw new _t;if(y.status!==401)return y;let k=(A=await y.clone().json().catch(()=>null))==null?void 0:A.code;if(!o){if(k==="stale_salt"&&(c||u))return Me(e,t,n,i,!0);if(k==="signed_out"&&c)return await Ye(),Me(e,t,n,i,!0)}throw k==="claimed"||k==="not_owner"||k==="not_linked"?new ye(k):(k==="signed_out"&&await Ye(),new B(typeof k=="string"?k:"failed"))}function Fr(e,t){return t?`${e}?${Fu}=${encodeURIComponent(t)}`:e}function Ur(e){let t=e;if(!t||typeof t.trust!="string")return null;let n=Array.isArray(t.waiting)?t.waiting:[];return{trusted:t.trust!=="pending"&&t.trust!=="rejected",refused:t.trust==="rejected",waiting:n.flatMap(i=>{let o=i;return o&&typeof o.id=="string"&&typeof o.first_seen_at=="number"?[{id:o.id,device:typeof o.device=="string"?o.device:null,first_seen_at:o.first_seen_at}]:[]})}}function Mt(e){let t=e;return!t||typeof t.mine!="boolean"?null:t.status==="final"?{status:"final",mine:t.mine}:t.status==="undone"?typeof t.undone_at=="number"?{status:"undone",mine:!1,email:typeof t.email=="string"?t.email:null,undone_at:t.undone_at}:null:t.status!=="pending"||typeof t.final_at!="number"?null:m({status:"pending",mine:t.mine,email:typeof t.email=="string"?t.email:null,final_at:t.final_at,held:t.held===!0},t.not_me===!0?{not_me:!0}:{})}async function hn(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return[...new Uint8Array(n)].map(i=>i.toString(16).padStart(2,"0")).join("")}function q(e){return JSON.stringify(vi(e))}function vi(e){return Array.isArray(e)?e.map(vi):e&&typeof e=="object"?Object.keys(e).sort().reduce((t,n)=>(t[n]=vi(e[n]),t),{}):e}function jr(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var ju="marketplace:installed:";function Wu(e){return{id:e.id,key:`${ju}${e.id}`,name:e.name,kind:Yu(e.id)}}function Lt(e){return new Map(e.map(t=>[t.id,Wu(t)]))}function Yu(e){return/\.(m?js)$/i.test(e)?"extension":/\.css$/i.test(e)?"theme":"app"}var Vu="registry.json",Wr="settings-registry",qu=1,Gu=3e3,Ju=["marketplace:","spicetify","syncify"],Xu=["spicetify","syncify"],Zu="medium",xi=null;function Re(){return xi||(xi=Qu().then(async e=>e?(await fe(Wr,e).catch(()=>{}),e):qr(await be(Wr).catch(()=>{})))),xi}async function Qu(){let e=typeof AbortController=="function"?new AbortController:null,t=setTimeout(()=>e==null?void 0:e.abort(),Gu);try{let n=await fetch(`${O().releasesUrl}/${Vu}`,{signal:e==null?void 0:e.signal});return n.ok?qr(await n.json()):null}catch(n){return null}finally{clearTimeout(t)}}function qr(e){if(!qe(e)||e.format!==qu||!Array.isArray(e.items)||!qe(e.sizes))return null;let t={small:Number(e.sizes.small),medium:Number(e.sizes.medium),large:Number(e.sizes.large)},n=Number(e.accountLimit);return[...Object.values(t),n].every(o=>Number.isSafeInteger(o)&&o>0)?{items:e.items.flatMap(o=>{let r=ed(o,t);return r?[r]:[]}),accountLimit:n}:null}function ed(e,t){var l,u;if(!qe(e)||typeof e.id!="string"||!e.id)return null;let n=Yr(e.keys),i=Yr((l=e.exclude)!=null?l:[]),o=od(e.storage),r=id(e.lists),s=(u=e.size)!=null?u:Zu;if(s!=="small"&&s!=="medium"&&s!=="large"||!n||!i||!o||!r||n.length===0||o.type==="localStorage"&&n.some(rd)||o.type==="indexedDB"&&Xu.some(d=>o.database.startsWith(d)))return null;let c=td(e.name)?e.name:nd(e.id);return{id:e.id,name:c,keys:n,exclude:i,storage:o,lists:r,limit:t[s]}}function td(e){return typeof e=="string"&&e.length<=100&&/^\S(?:.*\S)?$/.test(e)}function nd(e){var i;let t=(i=e.split("/").pop())!=null?i:e,n=t.replace(/\.[^.]+$/,"")||t;return n.charAt(0).toUpperCase()+n.slice(1)}function id(e){if(e===void 0)return{};if(!qe(e))return null;let t={};for(let[n,i]of Object.entries(e))if(qe(i)&&i.merge==="object")t[n]={merge:"object"};else if(qe(i)&&i.merge==="array"&&Bt(i.id))t[n]={merge:"array",id:i.id};else return null;return t}function od(e){return e===void 0?{type:"localStorage"}:qe(e)?e.type==="localStorage"?{type:"localStorage"}:e.type!=="indexedDB"||!Bt(e.database)||!Bt(e.store)||e.valueField!==void 0&&!Bt(e.valueField)?null:m({type:"indexedDB",database:e.database,store:e.store},e.valueField!==void 0?{valueField:e.valueField}:{}):null}function Yr(e){return Array.isArray(e)&&e.every(t=>Bt(t)&&/^[^*\s]+\*?$/.test(t))?e:null}function Le(e,t){return e.keys.some(n=>Vr(n,t))&&!e.exclude.some(n=>Vr(n,t))}function Vr(e,t){return e.endsWith("*")?t.startsWith(e.slice(0,-1)):t===e}function rd(e){let t=e.endsWith("*")?e.slice(0,-1):e;return Ju.some(n=>t.startsWith(n)||e.endsWith("*")&&n.startsWith(t))}function Bt(e){return typeof e=="string"&&e.length>0}function qe(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}var sd=2e3,bn="restored-settings";async function Gr(e){await fe(bn,e).catch(()=>{})}async function lt(e){var i,o;let t={},n=new Set;for(let[r,s]of ad(e,Qr())){let c=window.localStorage.getItem(r);c!==null&&((o=t[i=s.id])!=null||(t[i]={storage:"localStorage",values:{}}),t[s.id].values[r]=c)}return await Promise.all(e.items.filter(r=>r.storage.type==="indexedDB").map(async r=>{let s=await ud(r);s===null?n.add(r.id):Object.keys(s).length>0&&(t[r.id]={storage:"indexedDB",values:s})})),{settings:t,unavailable:n}}function ad(e,t){var r,s;let n=new Map,i=[];for(let c of e.items)if(c.storage.type==="localStorage")for(let l of c.keys)l.endsWith("*")?i.push([l.slice(0,-1),c]):n.set(l,c);let o=new Map;for(let c of t){let l=(s=n.get(c))!=null?s:(r=i.find(([u])=>c.startsWith(u)))==null?void 0:r[1];l&&Le(l,c)&&o.set(c,l)}return o}async function wn(e,t,n){let i=n.flatMap(r=>{let s=e.items.find(l=>l.id===r),c=s?Zr(s,t[r]):null;return s&&c?[{item:s,saved:c}]:[]});for(let{item:r,saved:s}of i)r.storage.type==="indexedDB"&&await dd(r,s);let o=Qr();for(let{item:r,saved:s}of i)if(r.storage.type==="localStorage"){for(let c of o)Le(r,c)&&!(c in s)&&window.localStorage.removeItem(c);for(let[c,l]of Object.entries(s))window.localStorage.setItem(c,l)}}function cd(e,t,n){return t?e.items.flatMap(i=>{var c,l;let o=Zr(i,t[i.id]);if(!o||n.unavailable.has(i.id))return[];let r=(l=(c=n.settings[i.id])==null?void 0:c.values)!=null?l:{};return[...new Set([...Object.keys(o),...Object.keys(r)])].some(u=>!ld(i,o[u],r[u]))?[i.id]:[]}):[]}async function Jr(e){if(!e)return[];let t=await Re();if(!t)return[];let n=Lt(t.items);return cd(t,e,await lt(t)).flatMap(i=>{let o=n.get(i);return o?[o]:[]})}function Xr(e,t,n){let i=new TextEncoder,o=t+i.encode(`,${JSON.stringify("extension_settings")}:{}`).byteLength,r=Object.entries(e).map(([l,u])=>({id:l,entry:u,bytes:i.encode(`${JSON.stringify(l)}:${JSON.stringify(u)}`).byteLength})).sort((l,u)=>l.bytes-u.bytes||l.id.localeCompare(u.id)),s={},c=!0;for(let{id:l,entry:u,bytes:d}of r){let f=d+(c?0:1);if(o+f>n)break;o+=f,s[l]=u,c=!1}return s}function Zr(e,t){if(!t||typeof t!="object"||t.storage!==e.storage.type||!t.values||typeof t.values!="object"||Array.isArray(t.values))return null;let n={};for(let[i,o]of Object.entries(t.values))Le(e,i)&&((e.storage.type==="localStorage"?typeof o!="string":!Sn(o))||(n[i]=o));return Object.keys(n).length>0?n:null}function ld(e,t,n){if(t===void 0||n===void 0)return t===n;let i=e.storage.type==="indexedDB"?e.storage.valueField:void 0,o=r=>i&&r&&typeof r=="object"&&!Array.isArray(r)?r[i]:r;return q(o(t))===q(o(n))}function Sn(e){return e===null||typeof e=="string"||typeof e=="boolean"?!0:typeof e=="number"?Number.isFinite(e):Array.isArray(e)?e.every(Sn):typeof e=="object"&&Object.getPrototypeOf(e)===Object.prototype?Object.values(e).every(Sn):!1}function Qr(){let e=[];for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);n!==null&&e.push(n)}return e}async function ud(e){let t=e.storage;return es(t,"readonly",(n,i)=>{let o={},r=n.openCursor();r.onsuccess=()=>{let s=r.result;if(!s)return i(o);let c=s.key;typeof c=="string"&&Le(e,c)&&Sn(s.value)&&(o[c]=s.value),s.continue()}}).catch(()=>null)}async function dd(e,t){let n=e.storage;if(await es(n,"readwrite",(o,r)=>{let s=o.openCursor();s.onsuccess=()=>{let c=s.result;if(c){let l=c.key;typeof l=="string"&&Le(e,l)&&!(l in t)&&c.delete(),c.continue();return}for(let[l,u]of Object.entries(t))o.put(u,l);r(!0)}})===null)throw new Error("Syncify couldn't write an extension's settings. Restart Spotify and try again.")}function es(e,t,n){let i;try{i=window.indexedDB}catch(r){return Promise.resolve(null)}if(!i)return Promise.resolve(null);let o=i;return new Promise((r,s)=>{let c=!1,l=null,u=y=>{c||(c=!0,clearTimeout(d),y())},d=setTimeout(()=>{u(()=>s(new Error("The extension's database took too long.")));try{l==null||l.abort()}catch(y){}},sd),f;try{f=o.open(e.database)}catch(y){u(()=>r(null));return}f.onupgradeneeded=()=>{var y;return(y=f.transaction)==null?void 0:y.abort()},f.onerror=()=>{let y=f.error;u(()=>(y==null?void 0:y.name)==="AbortError"?r(null):s(y))},f.onblocked=()=>u(()=>s(new Error("The extension's database is busy."))),f.onsuccess=()=>{let y=f.result;if(y.onversionchange=()=>y.close(),c||!y.objectStoreNames.contains(e.store)){y.close(),u(()=>r(null));return}try{let S=y.transaction(e.store,t);l=S;let k=null;n(S.objectStore(e.store),x=>{k=x}),S.oncomplete=()=>{y.close(),u(()=>r(k))},S.onerror=S.onabort=()=>{y.close(),u(()=>{var x;return s((x=S.error)!=null?x:new Error("IndexedDB failed."))})}}catch(S){y.close(),u(()=>s(S))}}})}var fd=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,yd=100,md="marketplace:installed-extensions",pd="marketplace:installed-themes",gd="marketplace:theme-installed",hd="marketplace:installed:",Sd="marketplace";function Ii(e){return Spicetify.Config?Ri(Spicetify.Config,e):null}function Ri(e,t){var r;let n=Ue(e),i=new Set(bd(t)),o=((r=t[gd])==null?void 0:r.includes(hd))===!0;return{current_theme:o?Sd:n.current_theme,color_scheme:o?"":n.color_scheme,extensions:n.extensions.filter(s=>!i.has(s)),custom_apps:n.custom_apps}}function Ue(e){let t=e&&typeof e=="object"?e:{};return{current_theme:Ci(t.current_theme)?t.current_theme:"",color_scheme:Ci(t.color_scheme)?t.color_scheme:"",extensions:ts(t.extensions),custom_apps:ts(t.custom_apps)}}function os(e,t){return q(Ue(e))===q(Ue(t))}function ts(e){return Array.isArray(e)?[...new Set(e.filter(Ci))].sort().slice(0,yd):[]}function Ci(e){return typeof e=="string"&&fd.test(e)}function bd(e){let t=ns(e[md]).map(i=>{var r;let o=(r=is(e[i]))==null?void 0:r.manifest;return o&&typeof o=="object"?o.main:void 0}),n=ns(e[pd]).flatMap(i=>{var r;let o=(r=is(e[i]))==null?void 0:r.include;return Array.isArray(o)?o:[]});return[...t,...n].flatMap(i=>{let o=typeof i=="string"?i.split("/").pop():void 0;return o?[o]:[]})}function ns(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function is(e){try{let t=e?JSON.parse(e):null;return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch(t){return null}}var wd=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],kd="marketplace:installed:",rs=`${kd}snippet:`,vd="wsoltani/syncify",xd="marketplace",ss={added:0,removed:1,unchanged:2};function te(e){let t=new Map;for(let[n,i]of wd)for(let o of Ed(e[n]))t.has(o)||t.set(o,Id(o,i,e[o]));return[...t.values()]}function xn(e,t,n,i){let o=new Set(e.map(l=>l.key)),r=new Map(n.map(l=>[l.key,l])),s=[...e.map(l=>{let u=r.get(l.key);return w(m({},l),{change:u?"unchanged":"added",isNew:!u||u.sources.join(" ")!==l.sources.join(" ")})}),...n.filter(l=>!o.has(l.key)).map(l=>w(m({},l),{change:Ot(l,e)?"unchanged":"removed",isNew:!1}))].sort((l,u)=>ss[l.change]-ss[u.change]||l.name.localeCompare(u.name)),c={added:0,removed:0,unchanged:0};for(let l of s)c[l.change]+=1;return{items:s,counts:c,manual:Cd(t,i)}}function Ot(e,t){return e.type==="extension"&&vn(e)&&!t.some(vn)}function vn(e){var t;return((t=e.repo)==null?void 0:t.toLowerCase())===vd}function Cd(e,t){if(!e)return[];let n=Ue(e),i=Ue(t),o=[...n.extensions.filter(s=>!i.extensions.includes(s)).map(s=>({type:"extension",name:s})),...n.custom_apps.filter(s=>!i.custom_apps.includes(s)).map(s=>({type:"custom_app",name:s}))],r=n.current_theme;return r&&r!==xd&&(r!==i.current_theme||n.color_scheme!==i.color_scheme)&&o.push(m({type:"theme",name:r},n.color_scheme?{scheme:n.color_scheme}:{})),o}function Id(e,t,n){var l,u;let i=as(n),o=as(i==null?void 0:i.manifest),r=kn(i==null?void 0:i.user),s=kn(i==null?void 0:i.repo),c=(u=(l=kn(i==null?void 0:i.title))!=null?l:kn(o==null?void 0:o.name))!=null?u:e.startsWith(rs)?e.slice(rs.length):e.split("/").pop()||e;return{key:e,type:t,name:c,repo:t!=="snippet"&&r&&s?`${r}/${s}`:null,sources:Rd(t,i),custom:t==="snippet"&&(i==null?void 0:i.custom)===!0}}function Rd(e,t){return t?(e==="extension"?[t.extensionURL]:e==="theme"?[t.cssURL,t.schemesURL,...Array.isArray(t.include)?t.include:[]]:[]).filter(i=>typeof i=="string"&&i!==""):[]}function kn(e){return typeof e=="string"&&e.trim()?e.trim():null}function Ed(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function as(e){let t=e;if(typeof e=="string")try{t=JSON.parse(e)}catch(n){return null}return t&&typeof t=="object"&&!Array.isArray(t)?t:null}var Cn="spicetify-marketplace";var Dt="settings";async function cs(){let e=await ds();if(e.kind!=="ok")return null;try{let t=await fs(e.db,"readonly",i=>i.getAll());if(!t)return null;let n={};for(let i of t)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(n[i.key]=i.value);return n}finally{e.db.close()}}async function ls(e,t=[]){let n=await ds();if(n.kind==="unavailable")return"unavailable";let i=n.kind==="ok"?n.db:await Nd();if(!i)return"failed";try{return await fs(i,"readwrite",r=>{let s;for(let[c,l]of Object.entries(e))s=r.put({key:c,value:l});for(let c of t)s=r.delete(c);return s})===null?"failed":"written"}finally{i.close()}}function us(){var e;try{return(e=window.indexedDB)!=null?e:null}catch(t){return null}}async function ds(){let e=us();return e?await Pd(e)?{kind:"missing"}:new Promise(t=>{let n=!1,i=e.open(Cn);i.onupgradeneeded=()=>{n=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),t({kind:"unavailable"})},i.onblocked=()=>t({kind:"unavailable"}),i.onsuccess=()=>{let o=i.result;if(n){o.close(),Td(e).then(()=>t({kind:"missing"}));return}if(!o.objectStoreNames.contains(Dt)){o.close(),t({kind:"unavailable"});return}t({kind:"ok",db:o})}}):{kind:"unavailable"}}function Nd(){let e=us();return e?new Promise(t=>{let n=e.open(Cn,1);n.onupgradeneeded=()=>{let i=n.result;i.objectStoreNames.contains(Dt)||i.createObjectStore(Dt,{keyPath:"key"})},n.onerror=()=>{console.warn("Syncify could not create Marketplace storage",n.error),t(null)},n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}async function Pd(e){if(typeof e.databases!="function")return!1;try{return!(await e.databases()).some(n=>n.name===Cn)}catch(t){return!1}}function Td(e){return new Promise(t=>{let n=e.deleteDatabase(Cn);n.onsuccess=()=>t(),n.onerror=()=>t(),n.onblocked=()=>t()})}function fs(e,t,n){return new Promise(i=>{let o;try{o=e.transaction(Dt,t)}catch(u){console.warn("Syncify could not open a Marketplace transaction",u),i(null);return}let r,s=!1,c=u=>{s||(s=!0,i(u))};o.oncomplete=()=>c(r),o.onerror=()=>{console.warn("Syncify Marketplace transaction failed",o.error),c(null)},o.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",o.error),c(null)};let l;try{l=n(o.objectStore(Dt))}catch(u){console.warn("Syncify Marketplace request could not be issued",u),c(null);return}l&&(l.onsuccess=()=>{r=l.result},l.onerror=()=>{console.warn("Syncify Marketplace request failed",l.error),c(null)})})}var Ei="marketplace:",Rn=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function we(){let e=Kd(),t=await cs();if(t)for(let[n,i]of Object.entries(t))n.startsWith(Ei)&&(e[n]=i);return e}var _d=new Set(["marketplace:active-tab","marketplace:sort"]),Ni="marketplace:installed:",In="marketplace:theme-installed",Md=["stars","tags","lastUpdated","created"],Ld=750*1024;async function En(e,t){let n={};for(let[i,o]of Object.entries(e))_d.has(i)||(n[i]=i.startsWith(Ni)?Bd(o):o);return t&&(n.spicetify_config=Ue(t)),hn(q(n))}function Bd(e){try{let t=JSON.parse(e);if(!t||typeof t!="object"||Array.isArray(t))return e;for(let n of Md)delete t[n];return t}catch(t){return e}}async function Nn(){let e=await we(),t=Ii(e);return{keyCount:Object.keys(e).length,hash:await En(e,t),installedItemCount:$d(e),installedItems:Pn(e),items:te(e),spicetifyConfig:t,marketplaceAvailable:Hd(e),activeTheme:Ut(e[In])}}function Ut(e){if(!e)return null;if(e.startsWith(Ni))return e;try{let t=JSON.parse(e);return typeof t=="string"?t:null}catch(t){return null}}async function ys(){let[e,t]=await Promise.all([we(),Od()]),n=Ii(e),i=m({schema_version:3,metadata:{last_sync_datetime:new Date().toISOString(),device_info:jr(),marketplace_key_count:Object.keys(e).length},payload_hash:await En(e,n),marketplace_data:{keys:e}},n?{spicetify_config:n}:{});if(Object.keys(t).length===0)return i;let o=new TextEncoder().encode(JSON.stringify(i)).byteLength,r=Xr(t,o,Ld);return Object.keys(r).length>0?w(m({},i),{extension_settings:r}):i}async function Od(){try{let e=await Re();return e?(await lt(e)).settings:{}}catch(e){return{}}}async function ms(e,t=[]){var r,s;let n={},i=(s=(r=e.marketplace_data)==null?void 0:r.keys)!=null?s:{};for(let[c,l]of Object.entries(i))c.startsWith(Ei)&&(n[c]=l);if(Object.keys(n).length===0)return 0;await Dd(n),t.length>0&&await Ud(n,t);let o=Ti(await we(),n);return await Pi(n,o),Object.keys(n).length}async function Pi(e,t=[]){for(let[i,o]of Object.entries(e))window.localStorage.setItem(i,o);for(let i of t)window.localStorage.removeItem(i);if(await ls(e,t)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try again.")}function Ti(e,t){let n=new Set(Rn.flatMap(s=>{var c;return Tn((c=t[s])!=null?c:e[s]).map(String)})),i=Pn(e).filter(s=>s.startsWith(Ni)&&!n.has(s)),o=i.filter(s=>e[s]!==void 0&&t[s]===void 0),r=e[In];return r&&t[In]===void 0&&i.some(s=>r.includes(s))&&o.push(In),o}async function Dd(e){let t=await we(),n=te(e),i=te(t).filter(s=>Ot(s,n));if(i.length===0)return;let o="marketplace:installed-extensions",r=Tn(e[o]).map(String);for(let s of i)r.includes(s.key)||r.push(s.key),e[s.key]=t[s.key];e[o]=JSON.stringify(r)}async function Ud(e,t){let n=await we(),i=Pn(n);for(let o of Rn){if(e[o]===void 0)continue;let r=Tn(e[o]).map(String).filter(s=>!t.includes(s)||i.includes(s));e[o]=JSON.stringify(r)}for(let o of t)n[o]!==void 0?e[o]=n[o]:delete e[o]}function $d(e){return Pn(e).length}function Pn(e){return Rn.flatMap(t=>Tn(e[t]).map(String))}function Hd(e){return!!(window.Marketplace||Rn.some(n=>e[n]!==void 0)||e["marketplace:tabs"]!==void 0)}function ps(e,t){return t===0?!1:e===0?!0:e<Math.max(2,Math.floor(t*.5))}function Kd(){let e={};for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);if(!(n!=null&&n.startsWith(Ei)))continue;let i=window.localStorage.getItem(n);i!==null&&(e[n]=i)}return e}function Tn(e){if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch(t){return[]}}var zd="raw.githubusercontent.com",Fd="cdn.jsdelivr.net",gs=".github.io";function _i(e){var n;if(e.protocol!=="https:")return null;let t=e.pathname.split("/").filter(Boolean);if(e.host===zd)return Ai(t[0],t[1]);if(e.host===Fd)return t[0]==="gh"?Ai(t[1],(n=t[2])==null?void 0:n.split("@")[0]):null;if(e.host.endsWith(gs)){let i=e.host.slice(0,-gs.length);return i.includes(".")?null:Ai(i,t.length>1?t[0]:e.host)}return null}function Ai(e,t){return e&&t?`${e}/${t}`:null}var jd={extension:"spicetify-extensions",theme:"spicetify-themes"},Wd="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",Yd="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",Vd="https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/",qd="https://api.github.com/repos",Gd=5e3,Jd=20,hs="syncify:repo-topics",Ss=10080*60*1e3,Xd=200;function ut(e){return(e==null?void 0:e.kind)==="host"||(e==null?void 0:e.kind)==="repo"||(e==null?void 0:e.kind)==="blocked"||(e==null?void 0:e.kind)==="catalog"}function dt(e){let t=new Map;for(let n of e){if(n.change==="removed")continue;if(n.custom){t.set(n.key,{kind:"custom"});continue}let i=Zd(n);i&&t.set(n.key,i)}return t}async function ft(e,t){let n=new Map,i=e.filter(s=>s.change!=="removed"&&s.isNew&&!t.has(s.key));if(i.length===0)return n;let o=i.filter(s=>s.type==="snippet"),r=i.filter(s=>s.type!=="snippet");if(o.length>0){let s=await Mi();for(let c of o)s?An(s,c.name)||n.set(c.key,{kind:"catalog"}):n.set(c.key,{kind:"unchecked"})}if(r.length>0){let s=await tf(),c=rf(),l=0;await Promise.all(r.map(async u=>{let d=Qd(u),f=jd[u.type];if(!d||!f)return;if(s===null){n.set(u.key,{kind:"unchecked"});return}if(ef(d,s)){n.set(u.key,{kind:"blocked"});return}let y=of(c,d);y===void 0&&l<Jd&&(l+=1,y=await nf(d),y!==void 0&&(c[d.toLowerCase()]={topics:y,at:Date.now()})),y===void 0?n.set(u.key,{kind:"unchecked"}):(y===null||!y.includes(f))&&n.set(u.key,{kind:"catalog"})})),sf(c)}return n}function Zd(e){let t=null;for(let n of e.sources){let i;try{i=new URL(n)}catch(r){return{kind:"host",host:n.slice(0,40)}}let o=_i(i);if(!o)return{kind:"host",host:i.host};e.repo&&o.toLowerCase()!==e.repo.toLowerCase()&&(t!=null||(t=o))}return t?{kind:"repo",repo:t}:null}function Qd(e){for(let t of e.sources)try{let n=_i(new URL(t));if(n)return n}catch(n){}return e.repo}function ef(e,t){let n=`https://github.com/${e}`.toLowerCase();return t.some(i=>{let o=i.toLowerCase();if(!o.includes("*"))return o===n;let r=o.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${r}$`).test(n)})}function bs(e){return e.replace(/\n/g,"").trim().toLowerCase()}function An(e,t){return e.get(bs(t))}var $t=null,Ht=null;function tf(){return $t!=null||($t=ws(Wd).then(e=>{let t=e==null?void 0:e.repos;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&!n.startsWith("//")):($t=null,null)})),$t}function Mi(){return Ht!=null||(Ht=ws(Yd).then(e=>{if(!Array.isArray(e))return Ht=null,null;let t=new Map;for(let n of e){if(typeof(n==null?void 0:n.title)!="string"||typeof n.code!="string")continue;let i=typeof n.preview=="string"?n.preview:null;t.set(bs(n.title),m({title:n.title,code:n.code,description:typeof n.description=="string"?n.description:""},i?{imageURL:i.startsWith("http")?i:`${Vd}${i}`}:{}))}return t})),Ht}async function nf(e){let t=await ks(`${qd}/${e}`);if((t==null?void 0:t.status)===404)return null;if(!(t!=null&&t.ok))return;let n=await t.json().catch(()=>null);return Array.isArray(n==null?void 0:n.topics)?n.topics.filter(i=>typeof i=="string"):void 0}async function ws(e){let t=await ks(e);return t!=null&&t.ok?t.json().catch(()=>null):null}async function ks(e){let t=typeof AbortController=="function"?new AbortController:null,n=setTimeout(()=>t==null?void 0:t.abort(),Gd);try{return await fetch(e,{signal:t==null?void 0:t.signal})}catch(i){return null}finally{clearTimeout(n)}}function of(e,t){let n=e[t.toLowerCase()];return n&&Date.now()-n.at<Ss?n.topics:void 0}function rf(){var e;try{let t=JSON.parse((e=localStorage.getItem(hs))!=null?e:"{}");return t&&typeof t=="object"?t:{}}catch(t){return{}}}function sf(e){let t=Date.now(),n=Object.entries(e).filter(([,i])=>t-i.at<Ss).sort(([,i],[,o])=>o.at-i.at).slice(0,Xd);try{localStorage.setItem(hs,JSON.stringify(Object.fromEntries(n)))}catch(i){}}var af=/^[0-9A-HJKMNP-TV-Z]{6}$/,cf=6,lf="SYN-",Is=60,Li=20,Rs=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],Ge="marketplace:theme-installed",vs="marketplace",xs={added:0,removed:1,unchanged:2},uf=new RegExp(`^[a-z0-9][a-z0-9_-]{1,${Li-2}}[a-z0-9]$`);function Bi(e){let t=e.trim().replace(/^@/,"").toLowerCase();return/[^a-z0-9_-]/.test(t)?"Only letters, digits, _ and -":t.length<3?"At least 3 characters":!/^[a-z0-9]/.test(t)||!/[a-z0-9]$/.test(t)?"Start and end with a letter or digit":null}function Ee(e){return`${lf}${e}`}function Es(e){let t=e.trim();if(t.length>200)return null;if(t.includes("/")){let i=t.split(/[?#]/)[0].replace(/\/+$/,"");t=i.slice(i.lastIndexOf("/")+1).replace(/\.json$/i,"")}t=t.toUpperCase().replace(/[\s-]/g,""),t.length===cf+3&&t.startsWith("SYN")&&(t=t.slice(3));let n=t.replace(/O/g,"0").replace(/[IL]/g,"1");return af.test(n)?n:null}function Ns(e){let t=e;return!t||typeof t.code!="string"||!t.keys||typeof t.keys!="object"||!Object.values(t.keys).every(n=>typeof n=="string")?null:{code:t.code,name:typeof t.name=="string"&&t.name?t.name:null,creator:typeof t.creator=="string"&&uf.test(t.creator)?t.creator:null,updated_at:typeof t.updated_at=="number"?t.updated_at:0,keys:t.keys}}async function Ps(e,t){let n=e.filter(s=>!vn(s)).map(s=>w(m({},s),{change:"added",isNew:!0})),i=dt(n);for(let s of n)!i.has(s.key)&&!df(s,t[s.key])&&i.set(s.key,{kind:"catalog"});let o=await ft(n,i),r=new Map;for(let[s,c]of[...o,...i])c.kind!=="unchecked"&&r.set(s,c);return{items:n,leftOut:r}}function df(e,t){if(e.type==="snippet")return!0;if(!e.repo)return!1;let n=mf(t);return e.type==="extension"?typeof(n==null?void 0:n.extensionURL)=="string"&&n.extensionURL!=="":typeof(n==null?void 0:n.cssURL)=="string"&&n.cssURL!==""}function Ts(e,t){let n={};for(let[o,r]of Rs){let s=t.filter(c=>c.type===r&&e[c.key]!==void 0).map(c=>c.key);n[o]=JSON.stringify(s);for(let c of s)n[c]=e[c]}let i=Ut(e[Ge]);return i&&t.some(o=>o.key===i)&&(n[Ge]=e[Ge]),n}function As(e,t,n,i,o,r){let s=r==="replace"?xn(t,void 0,n,i):ff(t,n),c=Ut(e.keys[Ge]),l=c!==null&&t.some(d=>d.key===c)&&i!==null&&i.current_theme!==vs,u=c!==null&&c!==o?t.find(d=>d.key===c):void 0;return m(w(m({},s),{manual:l?[{type:"theme",name:vs}]:[]}),u?{theme:{key:u.key,name:u.name}}:{})}function ff(e,t){let n=new Set(t.map(s=>s.key)),i=new Set(e.map(s=>s.key)),o=[...e.map(s=>n.has(s.key)?w(m({},s),{change:"unchanged",isNew:!1}):w(m({},s),{change:"added",isNew:!0})),...t.filter(s=>!i.has(s.key)).map(s=>w(m({},s),{change:"unchanged",isNew:!1}))].sort((s,c)=>xs[s.change]-xs[c.change]||s.name.localeCompare(c.name)),r={added:0,removed:0,unchanged:0};for(let s of o)r[s.change]+=1;return{items:o,counts:r,manual:[]}}function _s(e,t){return new Set(e.items.filter(n=>n.type==="snippet"&&n.change==="added"&&(!t||!An(t,n.name))).map(n=>n.key))}async function Ms(e,t,n,i){let o=await we(),r=te(o),s=te(e.keys),c={};for(let[f,y]of Rs){let S=Cs(o[f]),x=[...t==="add"?S:S.filter(g=>n.includes(g)||r.some(b=>b.key===g&&Ot(b,s)))];for(let g of s){if(g.type!==y||n.includes(g.key))continue;let b=S.includes(g.key);if(t==="add"&&b)continue;let E=y==="snippet"?yf(g,i,o[g.key]):e.keys[g.key];E!==void 0&&(c[g.key]=E,x.includes(g.key)||x.push(g.key))}c[f]=JSON.stringify(x)}let l=Ut(e.keys[Ge]),u=Cs(c["marketplace:installed-themes"]);l&&u.includes(l)&&!n.includes(l)&&(c[Ge]=e.keys[Ge]);let d=Ti(o,c);return await Pi(c,d),Object.keys(c).length+d.length}function yf(e,t,n){let i=t?An(t,e.name):void 0;return i?JSON.stringify(m({code:i.code,title:i.title,description:i.description},i.imageURL?{imageURL:i.imageURL}:{})):n}function Cs(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function mf(e){try{let t=e?JSON.parse(e):null;return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch(t){return null}}var Kt="/api/shares",pf=`${Kt}/update`,gf=`${Kt}/delete`,hf=`${Kt}/import`,Sf="x-syncify-user-hash",bf="discover/presets.json",wf={no_code:"This code doesn't exist.",too_many_codes:"You can't make more share codes. Delete one to make another.",daily_limit:"Too many changes to share codes today. Try again tomorrow.",too_large:"This setup is too big to share.",invalid_name:"Names can be up to 60 characters.",empty:"There's nothing to share yet. Install something from Marketplace first.",invalid_items:"Syncify couldn't read some items. Reload Spotify and try again.",source:"Some items don't load from GitHub. Reload Spotify and try again.",blocked:"Some items are on Marketplace's block list. Reload Spotify and try again.",custom_snippet:"Custom snippets can't be shared. Reload Spotify and try again.",unchecked:"Couldn't check Marketplace's block list. Try again in a minute.",publish_failed:"Couldn't publish the code. Press Update on it to try again.",delete_failed:"Couldn't delete the code. Try again.",same_setup:"You already shared this setup.",invalid_handle:"Handles are 3 to 20 letters, digits, _ or -, starting and ending with a letter or digit.",reserved_handle:"That handle isn't allowed. Pick another.",handle_taken:"That handle is taken. Pick another.",unavailable:"Share codes aren't available yet."},kf=new Set(["offline","signed_out","invalid_signature","stale_salt","no_device_key","too_many_requests"]);function zt(e,t=null){var n;return e instanceof B&&kf.has(e.code)?De(e):e instanceof B&&e.code==="too_many_codes"&&t!==null?`You have ${t} share codes already. Delete one to make another.`:(n=e instanceof B?wf[e.code]:void 0)!=null?n:"Something went wrong. Try again."}async function _n(){var t;let e=await Tt(Kt,"GET");return{codes:Array.isArray(e==null?void 0:e.codes)?e.codes.flatMap(n=>{let i=vf(n);return i?[i]:[]}):[],newHearts:typeof(e==null?void 0:e.new_hearts)=="number"?e.new_hearts:0,max:typeof(e==null?void 0:e.max)=="number"?e.max:null,profile:typeof((t=e==null?void 0:e.profile)==null?void 0:t.handle)=="string"?{handle:e.profile.handle,link:typeof e.profile.link=="string"?e.profile.link:null}:null,suggestedHandle:typeof(e==null?void 0:e.suggested_handle)=="string"?e.suggested_handle:null}}async function Ls(e,t,n){return Ks(await Tt(Kt,"POST",m({name:e,keys:t},n===void 0?{}:{handle:n})))}function Bs(e){return`${O().shareUrl.replace(/\/+$/,"")}/@${e}`}async function Os(e,t,n){return Ks(await Tt(pf,"POST",{code:e,name:t,keys:n}))}async function Ds(e){try{await Tt(gf,"POST",{code:e})}catch(t){if(t instanceof B&&t.code==="no_code")return;throw t}}async function Us(e){let t=O().shareUrl.replace(/\/+$/,""),n;try{n=await fetch(`${t}/${e}.json`)}catch(o){throw new B("offline")}if(n.status===404||n.status===403)throw new B("no_code");if(!n.ok)throw new B("failed");let i=Ns(await n.json().catch(()=>null));if(!i||i.code!==e)throw new B("no_code");return i}async function $s(){let e=O().shareUrl.replace(/\/+$/,"");try{let t=await fetch(`${e}/${bf}`);if(!t.ok)return null;let n=await t.json();return Array.isArray(n.posts)?n.posts.flatMap(i=>{let o=Cf(i);return o?[o]:[]}):null}catch(t){return null}}async function Hs(e,t,n=!1){try{await Or(hf,m({code:e},n?{source:"preset"}:{}),{[Sf]:t.hash})}catch(i){}}function vf(e){let t=e;return!t||typeof t.code!="string"?null:{code:t.code,name:typeof t.name=="string"&&t.name?t.name:null,link:typeof t.link=="string"?t.link:null,item_count:typeof t.item_count=="number"?t.item_count:0,imports:typeof t.imports=="number"?t.imports:0,created_at:typeof t.created_at=="number"?t.created_at:0,updated_at:typeof t.updated_at=="number"?t.updated_at:0,posted:xf(e.post)}}function xf(e){let t=e==null?void 0:e.status;return typeof t=="string"&&t!=="removed"}function Cf(e){let t=e,n=i=>Number.isSafeInteger(i)&&i>=0?i:0;return!t||typeof t.code!="string"?null:{code:t.code,name:typeof t.name=="string"?t.name:Ee(t.code),extensions:n(t.extensions),themes:n(t.themes),snippets:n(t.snippets)}}function Ks(e){let t=e;if(typeof(t==null?void 0:t.code)!="string")throw new B("failed");return{code:t.code,link:typeof t.link=="string"?t.link:null,leftOut:Array.isArray(t.left_out)?t.left_out.length:0}}var zs="/claims",If="/claims/cancel",Rf={no_backup:"Back up first, then secure your backup.",unsupported_identity:"This Spotify account can't be secured.",too_many_accounts:"Your account already has 10 Spotify accounts linked.",undone:"This backup can't be secured with your account.",offline:"Couldn't reach Syncify. Check your connection and try again."},$e=class extends Error{constructor(n){var i;super((i=Rf[n])!=null?i:"Couldn't secure your backup. Try again.");this.code=n;this.name="ClaimError"}};async function Fs(e,t){let n=await Oi(e,t,"GET",zs);if(!n.ok)throw new $e(await Di(n));let i=await n.json().catch(()=>null);return{claim:Mt(i==null?void 0:i.claim),accounts:Array.isArray(i==null?void 0:i.accounts)?i.accounts.filter(Ef):null}}async function js(e,t){let n=await Oi(e,t,"POST",zs);if(!n.ok)throw new $e(await Di(n));let i=await n.json().catch(()=>null);return Mt(i==null?void 0:i.claim)}async function Ws(e,t){let n=await Oi(e,t,"POST",If);if(n.status===404)return"cancelled";if(!n.ok)throw new $e(await Di(n));let i=await n.json().catch(()=>null);return(i==null?void 0:i.held)===!0?"checking":"cancelled"}async function Oi(e,t,n,i){try{return await Me(e,t,{method:n},i)}catch(o){throw o instanceof TypeError?new $e("offline"):o}}async function Di(e){let t=await e.json().catch(()=>null);return typeof(t==null?void 0:t.code)=="string"?t.code:"failed"}function Ef(e){let t=e;return!!(t&&typeof t.hash=="string"&&(t.status==="pending"||t.status==="final"||t.status==="cancelled"||t.status==="unlinked"))}var Ys="[Syncify]";function ne(e,...t){console.debug(Ys,e,...t)}function ue(e,...t){console.warn(Ys,e,...t)}var mt={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},Nf=/^([a-z0-9]|f([1-9]|1[0-2]))$/,Pf=250,Tf=40,Ui=null,Mn=null,yt=null;function Vs(){return/mac/i.test(navigator.platform||navigator.userAgent)}function qs(e){if(e===null)return null;if(!e||typeof e!="object")return mt;let t=e;return typeof t.key!="string"||!Nf.test(t.key)?mt:{key:t.key,ctrl:!!t.ctrl,alt:!!t.alt,shift:!!t.shift,meta:!!t.meta}}function Ft(e){if(!e)return"Off";let t=e.key.toUpperCase();return Vs()?[e.ctrl?"\u2318":"",e.alt?"\u2325":"",e.shift?"\u21E7":"",t].join(""):[e.ctrl&&"Ctrl",e.meta&&"Win",e.alt&&"Alt",e.shift&&"Shift",t].filter(Boolean).join("+")}function Gs(e){if(e.key==="Escape")return{kind:"cancel"};let t=Af(e.code);if(!t)return{kind:"ignore"};let n=Vs();if(n&&e.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:t,ctrl:n?e.metaKey:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:n?!1:e.metaKey},o=t.startsWith("f")&&t.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!o?{kind:"error",message:`Include ${n?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function Af(e){var n,i;let t=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(e);return t?((i=(n=t[1])!=null?n:t[2])!=null?i:t[3]).toLowerCase():null}function Js(e){var t;if(yt&&_f(yt,e))return!1;try{let n=Spicetify.Mousetrap,i=(t=n.trigger)==null?void 0:t.call(n)._directMap;if(!i)return!1;let o=$i(e);return Object.keys(i).some(r=>r.startsWith(`${o}:`))}catch(n){return!1}}function Hi(e,t,n=0){if(Ui=t,Mn=e,!Xs()){if(n>=Tf){ue("Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>Hi(Mn,t,n+1),Pf);return}Ki(Mn)}function Ki(e){if(Mn=e,!Xs()||!Ui)return;let t=Ui;try{if(yt&&Spicetify.Keyboard._deregisterShortcut(yt),yt=null,!e)return;Spicetify.Keyboard.registerShortcut(e,n=>{n.preventDefault(),t()}),yt=e,ne("Keyboard shortcut registered",Ft(e))}catch(n){ue("Failed to register keyboard shortcut",n)}}function Xs(){var e;return typeof((e=Spicetify.Keyboard)==null?void 0:e.registerShortcut)=="function"}function $i(e){return[e.ctrl&&"mod",e.meta&&"meta",e.alt&&"alt",e.shift&&"shift",e.key].filter(Boolean).join("+")}function _f(e,t){return $i(e)===$i(t)}var zi="both",Mf=["both","topbar","menu"],jt=null,Wt=null,Ln=!1;function Zs(e){return Mf.includes(e)?e:zi}function Bn(){var e;return typeof((e=Spicetify.Menu)==null?void 0:e.Item)=="function"}function Qs(e){jt=e.topbarButton,Wt=e.menuItem}function On(e){let t=e!=="menu"||!Wt,n=e!=="topbar";if(jt!=null&&jt.element&&(jt.element.style.display=t?"":"none"),!!Wt)try{n&&!Ln?(Wt.register(),Ln=!0):!n&&Ln&&(Wt.deregister(),Ln=!1)}catch(i){ue("Failed to update profile menu item",i)}}var Dn="syncify:config",pt={workerUrl:O().workerUrl,autoBackupEnabled:!1,shortcut:mt,entryPoint:zi,settingsSyncEnabled:!0,settingsSyncOff:[],shareRestoredSettings:!0};function Y(){var n,i;let e=O(),t=(i=(n=Spicetify.LocalStorage)==null?void 0:n.get(Dn))!=null?i:window.localStorage.getItem(Dn);if(!t)return w(m({},pt),{workerUrl:e.workerUrl});try{let o=JSON.parse(t);return{workerUrl:e.workerUrl,autoBackupEnabled:Fi(o.autoBackupEnabled,pt.autoBackupEnabled),shortcut:o.shortcut===void 0?pt.shortcut:qs(o.shortcut),entryPoint:Zs(o.entryPoint),settingsSyncEnabled:Fi(o.settingsSyncEnabled,pt.settingsSyncEnabled),settingsSyncOff:Lf(o.settingsSyncOff),shareRestoredSettings:Fi(o.shareRestoredSettings,pt.shareRestoredSettings)}}catch(o){return w(m({},pt),{workerUrl:e.workerUrl})}}function Je(e){var n;let t=JSON.stringify({workerUrl:O().workerUrl,autoBackupEnabled:e.autoBackupEnabled,shortcut:e.shortcut,entryPoint:e.entryPoint,settingsSyncEnabled:e.settingsSyncEnabled,settingsSyncOff:e.settingsSyncOff,shareRestoredSettings:e.shareRestoredSettings});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set(Dn,t);return}window.localStorage.setItem(Dn,t)}function Lf(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Fi(e,t){return e===void 0?t:!!e}function Yt(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}var Bf=["username","canonicalUsername","id","uri","displayName"];async function me(){let{value:e,field:t}=await Of();return{hash:await hn(e),field:t}}async function Of(){var o;let e=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let t=await e.getUser(),n=Bf.find(r=>(t==null?void 0:t[r])!=null),i=n?t[n]:void 0;if(!n||!i)throw new Error("Unable to resolve the active Spotify user.");return{value:i,field:n}}async function qt(e,t){if(!Yt(e))throw new Error("Syncify backup service is not configured.");let[n,i]=await Promise.all([me(),ys()]);if(i.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:o,unapproved:r,settings:s}=await $r(e.workerUrl,n,i,t==null?void 0:t.part);return{payload:i,unchanged:o,unapproved:r,settings:s}}async function Xe(e,t,n){var l;if(!Yt(e))throw new Error("Syncify backup service is not configured.");let i=await ki(e.workerUrl,await me(),t,n==null?void 0:n.part),[o,r,s]=await Promise.all([Promise.all(i.backups.map(Wi)),i.safetyCopy?Wi(i.safetyCopy):null,Promise.all(i.unapproved.map(Wi))]),c=o.filter((u,d)=>o.findIndex(f=>f.payload_hash===u.payload_hash)===d);return w(m({},i),{payload:(l=c[0])!=null?l:null,backups:c,safetyCopy:r&&!c.some(u=>u.payload_hash===r.payload_hash)?r:null,unapproved:s.filter(u=>!c.some(d=>d.payload_hash===u.payload_hash))})}var ji=new Map;async function Wi(e){var r,s,c;let t=(s=(r=e.marketplace_data)==null?void 0:r.keys)!=null?s:{},n=e.spicetify_config?Ri(e.spicetify_config,t):void 0,i=`${e.payload_hash} ${(c=e.metadata)==null?void 0:c.last_sync_datetime}`,o=ji.get(i);return o||(o=En(t,n),ji.set(i,o),o.catch(()=>ji.delete(i))),w(m(m({},e),n?{spicetify_config:n}:{}),{payload_hash:await o})}async function ea(e,t){let n=await ki(Gt(e),await me(),void 0,t==null?void 0:t.part);return{claim:n.claim,install:n.install,nudge:n.nudge,backups:n.backups,settings:n.settings}}async function ta(e,t,n,i=[],o={ids:[],share:!1}){var l;let r=t!=null?t:(await Xe(e)).payload;if(!r)throw new Error("No Syncify cloud backup was found for this Spotify account.");await Df(r,o);let s=await ms(r,i),c=(l=r.backup)==null?void 0:l.id;return c&&Yt(e)&&me().then(u=>zr(e.workerUrl,u,c,n)).catch(()=>{}),{payload:r,restoredCount:s}}async function Df(e,t){if(t.ids.length===0||!e.extension_settings)return;let n=await Re();n&&(await wn(n,e.extension_settings,t.ids),await Gr(m({at:Date.now()},t)))}var Vt=class extends Error{constructor(n){super("Couldn't back up your setup first, so nothing changed.");this.reason=n;this.name="SafetyBackupError"}};async function na(e,t,n,i,o,r=!1){try{await qt(e)}catch(c){throw new Vt(c)}let s=await Ms(t,n,i,o);return me().then(c=>Hs(t.code,c,r)).catch(()=>{}),s}async function ia(e){let t=await me(),n=await Fs(Gt(e),t);return w(m({},n),{hash:t.hash})}async function oa(e){await js(Gt(e),await me())}async function Un(e,t,n){await Hr(Gt(e),await me(),t,n)}async function $n(e){return Ws(Gt(e),await me())}function Gt(e){if(!Yt(e))throw new Error("Syncify backup service is not configured.");return e.workerUrl}var ra="syncify:nudge-hidden-until",sa="syncify:nudge-panel-shown";function aa(e=Date.now()){let t=Number(da(ra));return Number.isFinite(t)&&t>e}function ca(e=Date.now()){fa(ra,String(e+30*864e5))}function la(){return da(sa)!==null}function ua(){fa(sa,"1")}function da(e){var t,n;return(n=(t=Spicetify.LocalStorage)==null?void 0:t.get(e))!=null?n:window.localStorage.getItem(e)}function fa(e,t){var n;(n=Spicetify.LocalStorage)!=null&&n.set?Spicetify.LocalStorage.set(e,t):window.localStorage.setItem(e,t)}var ma="settings-sync",Kn="syncify:settings-sync",Uf=17946e8,$f={since:0,pulled:!1,firstSyncDone:!1,account:{},base:{},seen:{},heldSent:{},deleted:{}},ya={bytes:0,limit:0,items:[],choices:[],arrived:null,budgetDay:null},Yi=new Set;function Ne(){var t,n;let e=(n=(t=Spicetify.LocalStorage)==null?void 0:t.get(Kn))!=null?n:window.localStorage.getItem(Kn);if(!e)return ya;try{let i=JSON.parse(e);return{bytes:typeof i.bytes=="number"?i.bytes:0,limit:typeof i.limit=="number"?i.limit:0,items:Array.isArray(i.items)?i.items:[],choices:Array.isArray(i.choices)?i.choices:[],arrived:i.arrived&&Array.isArray(i.arrived.ids)?i.arrived:null,budgetDay:typeof i.budgetDay=="string"?i.budgetDay:null}}catch(i){return ya}}function gt(e){var n;let t=JSON.stringify(e);(n=Spicetify.LocalStorage)!=null&&n.set?Spicetify.LocalStorage.set(Kn,t):window.localStorage.setItem(Kn,t);for(let i of Yi)i(e)}function jn(e){return Yi.add(e),()=>Yi.delete(e)}function pa(){let e=Ne();e.arrived&&gt(w(m({},e),{arrived:null}))}function ga(){let e=Ne();e.arrived&&gt(w(m({},e),{arrived:w(m({},e.arrived),{hidden:!0})}))}function Wn(e){return`${e.length>=3?`${e[0]}, ${e[1]} and ${e.length-2} more`:e.join(" and ")} ${e.length===1?"has":"have"} new extension settings`}async function Jt(e){var f;if(!e.settingsSyncEnabled||!await re().catch(()=>null))return null;let t=await Re();if(!t)return null;let n=await Xt(),i=await va(t);await Kf(n,i);let o=Ne(),r=new Set(e.settingsSyncOff),s=new Set(o.choices.map(y=>y.id)),c=n.pulled&&o.budgetDay!==Ea(Date.now()),l={},u=new Set;if(c)for(let y of t.items){let S=i.get(y.id);if(r.has(y.id)||s.has(y.id)||!S)continue;let k=Fn(y,S);if(k>y.limit){n.heldSent[y.id]!==k&&(l[y.id]={held:k},u.add(y.id));continue}let x=(f=n.base[y.id])!=null?f:Hf(n,y.id)?{}:void 0;if(x===void 0)continue;let g=Gf(y,S,x);g&&(l[y.id]=g,u.add(y.id))}return{part:JSON.stringify(w(m({since:n.since},u.size>0?{changes:l}:{}),{installed:[...i.keys()]})),registry:t,local:i,sent:u}}function Hf(e,t){let n=e.account[t];return!n||n.off===!0||n.data===null}async function Kf(e,t){var i;let n=await be(bn).catch(()=>{});if(n){if(!n.share){for(let o of n.ids){e.base[o]=(i=t.get(o))!=null?i:{};let r=e.account[o];r!=null&&r.data&&(e.seen[o]=q(r.data))}await Vn(e)}await cn(bn).catch(()=>{})}}var zf={arrived:[],choose:!1};async function Yn(e,t,n){let i=e?Ff(t):null;if(!e||!i)return zf;let{registry:o,local:r}=e,s=Date.now(),c=await Xt(),l=Y(),u=new Set(l.settingsSyncOff),d=Ne(),f=[];for(let[g,b]of Object.entries(i.items))c.account[g]=b;c.since=i.version,c.pulled=!0;let y=new Set([...Object.entries(i.items).flatMap(([g,b])=>b.off?[g]:[]),...Object.entries(i.results).flatMap(([g,b])=>b==="off"?[g]:[])]);for(let g of y)c.deleted[g]!==void 0&&!u.has(g)||(u.add(g),Ra(c,g));for(let[g,b]of Object.entries(c.deleted))b<=i.version&&delete c.deleted[g];let S=new Map(o.items.map(g=>[g.id,g])),k=[];for(let g of o.items){let b=r.get(g.id);if(u.has(g.id)||!b)continue;let E=e.sent.has(g.id)?i.results[g.id]:void 0;if(E==="held"){c.heldSent[g.id]=Fn(g,b);continue}if(Fn(g,b)>g.limit||(delete c.heldSent[g.id],E!==void 0&&E!=="saved"))continue;let A=c.account[g.id];if(!(A!=null&&A.data)||A.off)continue;let P=Vi(A),v=q(A.data),N=c.base[g.id],C=async _=>{if(!Hn(g,b,P)){if(!await Ca(o,g,A))return;(_||!A.mine)&&f.push(g.id)}c.base[g.id]=P,c.seen[g.id]=v};E==="saved"?await C(!0):N===void 0?c.firstSyncDone||Hn(g,b,P)?await C(!1):k.push(g.id):c.seen[g.id]!==v&&Hn(g,b,N)&&await C(!1)}k.length===0&&(c.firstSyncDone=!0);let x=Lt(o.items);return await Vn(c),u.size!==l.settingsSyncOff.length&&Je(w(m({},l),{settingsSyncOff:[...u]})),gt(w(m({},ka(o,c,r,x,i.bytes)),{choices:k.flatMap(g=>{var A;let b=x.get(g),E=S.get(g);return!b||!E?[]:[{id:g,name:b.name,kind:b.kind,localAt:jf(E,(A=r.get(g))!=null?A:{},n,s),accountAt:Wf(c.account[g])}]}),arrived:ha(d.arrived,f,x),budgetDay:i.budget==="used_up"?Ea(s):null})),{arrived:f.map(g=>{var b,E;return(E=(b=x.get(g))==null?void 0:b.name)!=null?E:g}),choose:k.length>0}}function ha(e,t,n){var r;if(t.length===0)return e;let i=[...new Set([...(r=e==null?void 0:e.ids)!=null?r:[],...t])],o=new Map(e?e.ids.map((s,c)=>[s,e.names[c]]):[]);return{ids:i,names:i.map(s=>{var c,l,u;return(u=(l=(c=n.get(s))==null?void 0:c.name)!=null?l:o.get(s))!=null?u:s}),hidden:!1}}function Ff(e){if(!pe(e)||e.status!=="ok"||!Number.isSafeInteger(e.version)||typeof e.bytes!="number")return null;let t={};for(let i of Array.isArray(e.items)?e.items:[]){if(!pe(i)||typeof i.id!="string"||typeof i.size!="number")continue;let o=pe(i.data)?i.data:null;t[i.id]=m(m(m({data:o,size:i.size},typeof i.held=="number"?{held:i.held}:{}),i.off===!0?{off:!0}:{}),i.mine===!0?{mine:!0}:{})}let n={};if(pe(e.results))for(let[i,o]of Object.entries(e.results))typeof o=="string"&&(n[i]=o);return{version:e.version,bytes:e.bytes,budget:e.budget==="used_up"?"used_up":"open",results:n,items:t}}async function Sa(e){let t=await Re();if(!t)return;let n=await Xt(),i=Ne(),o=[];for(let[s,c]of Object.entries(e)){let l=t.items.find(d=>d.id===s),u=n.account[s];!l||!(u!=null&&u.data)||u.off||(c==="account"&&await Ca(t,l,u)&&o.push(s),n.base[s]=Vi(u),n.seen[s]=q(u.data))}n.firstSyncDone=!0,await Vn(n);let r=new Map(i.choices.map(s=>[s.id,{id:s.id,key:"",name:s.name,kind:s.kind}]));gt(w(m({},i),{choices:[],arrived:ha(i.arrived,o,r)}))}function jf(e,t,n,i){var r;if(e.storage.type==="indexedDB"&&e.storage.valueField){let s=Object.values(t).flatMap(c=>pe(c)&&typeof c.ts=="number"?[c.ts]:[]);if(s.length>0)return Math.max(...s)}let o=i;for(let s of n){let c=(r=s.extension_settings)==null?void 0:r[e.id];if(!c||c.storage!==e.storage.type||!Hn(e,t,xa(e,c.values)))break;let l=Date.parse(s.metadata.last_sync_datetime);if(Number.isNaN(l))break;o=l}return o}function Wf(e){var t;return Math.max(0,...Object.values((t=e==null?void 0:e.data)!=null?t:{}).map(n=>n.t))}async function ba(e,t){if(!e.workerUrl)throw new Error("Syncify backup service is not configured.");let{version:n}=await Kr(e.workerUrl,await me(),t),i=await Xt();i.deleted[t]=n,i.account[t]={data:null,size:0,off:!0},Ra(i,t),await Vn(i);let o=Y();o.settingsSyncOff.includes(t)||Je(w(m({},o),{settingsSyncOff:[...o.settingsSyncOff,t]}));let r=Ne();gt(w(m({},r),{items:r.items.map(s=>s.id===t?w(m({},s),{hold:null}):s)}))}async function wa(){let e=await Re();if(!e)return Ne().items;let[t,n]=await Promise.all([Xt(),va(e)]),i=Lt(e.items),o=Ne(),r=ka(e,t,n,i,o.bytes);return gt(m(m({},o),r)),r.items}function Yf(e){return[...e].sort((t,n)=>+(n.hold!==null)-+(t.hold!==null)||t.name.localeCompare(n.name))}function ka(e,t,n,i,o){let r=e.items.flatMap(s=>{var S;let c=n.get(s.id);if(!c)return[];let l=Fn(s,c),u=t.account[s.id],d=l>s.limit?{size:l,reason:"too_big"}:(u==null?void 0:u.held)!==void 0&&!u.off?{size:u.held,reason:u.held>s.limit?"too_big":"account_full"}:null,f=(S=i.get(s.id))!=null?S:{id:s.id,key:"",name:s.id,kind:"extension"},y=u&&!u.off?u.size:0;return[w(m({},f),{size:l,limit:s.limit,list:Object.keys(s.lists).length>0,accountSize:y,hold:d})]});return{bytes:o,limit:e.accountLimit,items:Yf(r)}}async function va(e){let{settings:t}=await lt(e),n=new Map;for(let i of e.items){let o=t[i.id];o&&n.set(i.id,xa(i,o.values))}return n}function xa(e,t){var i;let n={};for(let[o,r]of Object.entries(t))Le(e,o)&&(n[o]=e.lists[o]&&(i=Vf(e,o,r))!=null?i:r);return n}function Vf(e,t,n){let i=e.lists[t],o=n;if(e.storage.type==="localStorage"){if(typeof n!="string")return null;try{o=JSON.parse(n)}catch(r){return null}}else e.storage.valueField&&pe(n)&&(o=n[e.storage.valueField]);return zn(i,o)?o:null}function zn(e,t){return e?e.merge==="object"?pe(t):Array.isArray(t):!1}function qf(e,t,n){let i={};for(let[o,r]of Object.entries(t)){if(!Le(e,o))continue;let s=e.lists[o]&&zn(e.lists[o],r);e.storage.type==="localStorage"?s?i[o]=JSON.stringify(r):typeof r=="string"&&(i[o]=r):s&&e.storage.valueField?i[o]=w(m({},pe(n[o])?n[o]:{}),{[e.storage.valueField]:r}):i[o]=r}return i}async function Ca(e,t,n){var c,l;let{settings:i}=await lt(w(m({},e),{items:[t]})),o=(l=(c=i[t.id])==null?void 0:c.values)!=null?l:{},r=qf(t,Vi(n),o);if(Object.keys(r).length===0)return!1;let s={[t.id]:{storage:t.storage.type,values:r}};try{return await wn(e,s,[t.id]),!0}catch(u){return!1}}function Vi(e){var n;let t={};for(let[i,o]of Object.entries((n=e.data)!=null?n:{}))pe(o)&&o.v!==null&&o.v!==void 0&&(t[i]=o.v);return t}function Fn(e,t){let n={};for(let[i,o]of Object.entries(t))n[i]={v:o,t:Uf};return Object.keys(n).length===0?0:new TextEncoder().encode(JSON.stringify(n)).byteLength}function Hn(e,t,n){return[...new Set([...Object.keys(t),...Object.keys(n)])].every(o=>Ia(e,o,t[o],n[o]))}function Ia(e,t,n,i){if(n===void 0||i===void 0)return n===i;let o=e.storage.type==="indexedDB"&&!e.lists[t]?e.storage.valueField:void 0,r=s=>o&&pe(s)?s[o]:s;return q(r(n))===q(r(i))}function Gf(e,t,n){let i={},o={};for(let s of new Set([...Object.keys(t),...Object.keys(n)])){let c=t[s],l=n[s];if(Ia(e,s,c,l))continue;let u=e.lists[s],d=u&&c!==void 0?Jf(u,c,l):null;d?o[s]=d:i[s]=c===void 0?null:c}let r=m(m({},Object.keys(i).length>0?{set:i}:{}),Object.keys(o).length>0?{lists:o}:{});return Object.keys(r).length>0?r:null}function Jf(e,t,n){if(!zn(e,t))return null;let i=zn(e,n)?n:e.merge==="object"?{}:[];if(e.merge==="object"){let d=t,f=i,y=Object.fromEntries(Object.entries(d).filter(([k,x])=>q(x)!==q(f[k]))),S=Object.keys(f).filter(k=>!(k in d));return m(m({},Object.keys(y).length>0?{put:y}:{}),S.length>0?{remove:S}:{})}let o=d=>{let f=pe(d)?d[e.id]:void 0;return typeof f=="string"||typeof f=="number"?f:null},r=t;if(r.some(d=>o(d)===null))return null;let s=new Map(i.flatMap(d=>o(d)===null?[]:[[JSON.stringify(o(d)),d]])),c=r.filter(d=>q(d)!==q(s.get(JSON.stringify(o(d))))),l=new Set(r.map(d=>JSON.stringify(o(d)))),u=[...s.entries()].filter(([d])=>!l.has(d)).flatMap(([,d])=>{var f;return(f=o(d))!=null?f:[]});return m(m({},c.length>0?{put:c}:{}),u.length>0?{remove:u}:{})}async function Xt(){let e=await be(ma).catch(()=>{});return m(m({},structuredClone($f)),pe(e)?e:{})}function Vn(e){return fe(ma,e)}function Ra(e,t){delete e.base[t],delete e.seen[t],delete e.heldSent[t]}function Ea(e){return new Date(e).toISOString().slice(0,10)}function pe(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}var qi="syncify:claim-check-day",Na="syncify:undone-claim-shown";async function Pa(e){var n,i;let t=Y();if(pa(),!!t.workerUrl){if(!t.autoBackupEnabled)return Xf(e);try{let o=await Jt(t).catch(()=>null),[r,s]=await Promise.all([Nn(),Xe(t,void 0,o)]),c=await Ta(o,s);Aa(s,e,c);let l=(i=(n=s.payload)==null?void 0:n.metadata.marketplace_key_count)!=null?i:0;if(s.exists&&ps(r.keyCount,l)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(s.backups.some(d=>d.payload_hash===r.hash)||r.keyCount===0)return;let{unapproved:u}=await qt(t);Spicetify.showNotification(u?"Syncify: backed up, waiting for approval":"Syncify auto-backup complete")}catch(o){if(o instanceof ye||o instanceof Ve){Spicetify.showNotification("Syncify: sign in to keep backing up",!0,8e3);return}let r=o instanceof Error?o.message:String(o);console.warn("Syncify startup sync failed:",o),Spicetify.showNotification(`Syncify auto-sync skipped: ${r}`,!0,8e3)}}}async function Xf(e){let t=new Date().toLocaleDateString("en-CA");if(_a(qi)!==t)try{let n=Y(),i=await Jt(n).catch(()=>null),o=await ea(n,i);Gi(qi,t);let r=await Ta(i,o);Aa(o,e,r)}catch(n){if(n instanceof ye){Gi(qi,t);return}console.warn("Syncify claim check failed:",n)}}async function Ta(e,t){if(!e)return!1;try{let n=await Yn(e,t.settings,t.backups);return n.arrived.length>0&&Spicetify.showNotification(Wn(n.arrived)),n.choose}catch(n){return console.warn("Syncify extension settings sync failed:",n),!1}}function Aa(e,t,n){var s;let i=Zf(e.claim),o=Qf(e.claim),r=(s=e.install)==null?void 0:s.waiting[0];i?t.onClaim(i):o?t.onUndone(o)&&Gi(Na,String(o.undone_at)):r?t.onInstall(r):e.nudge&&!la()?t.onNudge():n&&t.onFirstSync()}function Zf(e){return(e==null?void 0:e.status)==="pending"&&!e.mine&&!e.not_me?e:null}function Qf(e){return(e==null?void 0:e.status)==="undone"&&_a(Na)!==String(e.undone_at)?e:null}function _a(e){var t,n;return(n=(t=Spicetify.LocalStorage)==null?void 0:t.get(e))!=null?n:window.localStorage.getItem(e)}function Gi(e,t){var n;(n=Spicetify.LocalStorage)!=null&&n.set?Spicetify.LocalStorage.set(e,t):window.localStorage.setItem(e,t)}var Xi="syncify:pending-restore",ey=600*1e3,ty=2e3,ny=15e3,iy="marketplace:theme-installed",oy="raw.githubusercontent.com",ry=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],Pe=null,Ji=new Set,Ba=new Map;function Oa(){return Pe}function Da(e){return Ji.add(e),()=>Ji.delete(e)}function Ua(){Pe&&Fa(w(m({},Pe),{manual:[]}))}function Qt(e,t="restore"){try{localStorage.setItem(Xi,JSON.stringify({at:Date.now(),manual:e,kind:t}))}catch(n){}}function $a(){var e;Qt((e=Pe==null?void 0:Pe.manual)!=null?e:[],Pe==null?void 0:Pe.kind),window.location.reload()}function Ha(){ja()&&(document.addEventListener("load",e=>Ma(e.target,"load"),!0),document.addEventListener("error",e=>Ma(e.target,"error"),!0))}async function Ka(){let e=ja();if(!e)return;try{localStorage.removeItem(Xi)}catch(s){}let t=Date.now(),n=await La();for(;n.loaded<n.total&&Date.now()-t<ny;)await new Promise(s=>setTimeout(s,ty)),n=await La();Fa(w(m({kind:e.kind,at:Date.now()},n),{manual:e.manual}));let i=n.loaded===n.total&&e.manual.length===0,o=e.kind==="share"?"Setup applied":"Backup restored",r=e.kind==="share"?"loaded":"restored";Spicetify.showNotification(i?`Syncify: ${o}; ${n.total} ${n.total===1?"item":"items"}`:`Syncify: ${r} ${n.loaded} of ${n.total}. Open Syncify for details.`,!1,8e3)}function za(e){let t=e.map(n=>n.type==="extension"?`spicetify config extensions ${qn(n.name)}`:n.type==="custom_app"?`spicetify config custom_apps ${qn(n.name)}`:`spicetify config current_theme ${qn(n.name)}${n.scheme?` color_scheme ${qn(n.scheme)}`:""}`);return t.length>0?[...t,"spicetify apply"]:[]}function qn(e){return/^[\w.@+/-]+$/.test(e)?e:`"${e}"`}function Fa(e){Pe=e;for(let t of Ji)t(e)}function ja(){var e;try{let t=JSON.parse((e=localStorage.getItem(Xi))!=null?e:"null");return!t||Date.now()-t.at>ey?null:{manual:Array.isArray(t.manual)?t.manual:[],kind:t.kind==="share"?"share":"restore"}}catch(t){return null}}function Ma(e,t){e instanceof HTMLScriptElement&&e.src&&Ba.set(Zt(e.src),t)}async function La(){var i;let e=await we(),t=(i=e[iy])!=null?i:"",n=te(e).filter(o=>o.type==="extension"&&o.sources.length>0||o.type==="theme"&&t.includes(o.key)||o.type==="snippet");return{loaded:n.filter(sy).length,total:n.length}}function sy(e){var t,n;if(e.type==="snippet"){let i=document.querySelector("style.marketplaceSnippets");return((t=i==null?void 0:i.textContent)==null?void 0:t.includes(`/* ${e.name} - `))===!0}if(e.type==="theme"){let i=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((n=i==null?void 0:i.textContent)!=null&&n.trim())}return ay(e.sources[0]).some(cy)}function ay(e){let t;try{t=new URL(e)}catch(s){return[]}if(t.host!==oy)return[Zt(t.href)];let[n,i,o,...r]=t.pathname.split("/").filter(Boolean);return!n||!i||!o||r.length===0?[]:ry.map(s=>Zt(`https://${s}/gh/${n}/${i}@${o}/${r.join("/")}`))}function cy(e){let t=Ba.get(e);return t?t==="load":[...document.querySelectorAll("script[src]")].some(i=>Zt(i.src)===e)&&performance.getEntriesByType("resource").some(i=>Zt(i.name)===e)}function Zt(e){try{let t=new URL(e);return`${t.origin}${t.pathname}`}catch(t){return e}}var Zi=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var Wa=".main-actionButtons",uy=".Root__globalNav, .Root__top-bar",dy=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function Ya(e){let t=new Spicetify.Topbar.Button(O().extensionName,Zi,e,!1,!0);return Va(t),fy(t),t}function Va(e){var t;e.element.style.setProperty("-webkit-app-region","no-drag"),(t=e.button)==null||t.style.setProperty("-webkit-app-region","no-drag")}function fy(e){if(typeof MutationObserver=="undefined")return;let t=!1,n=null,i=()=>{t=!1,r();let s=e.element,c=document.querySelector(Wa);!s||!c||c.contains(s)||(c.prepend(s),yy(e),Va(e),ne("Topbar button re-attached"))},o=new MutationObserver(()=>{t||(t=!0,setTimeout(i,250))}),r=()=>{var l;if(n!=null&&n.isConnected)return;let s=document.querySelector(Wa),c=(l=s==null?void 0:s.closest(uy))!=null?l:s==null?void 0:s.parentElement;if(o.disconnect(),n=c!=null?c:null,!c){o.observe(document.body,{childList:!0,subtree:!0});return}o.observe(c,{childList:!0,subtree:!0});for(let u=c.parentElement;u;u=u.parentElement)o.observe(u,{childList:!0})};i()}function yy(e){let t=e.button;if(!t||t.className&&t.className!=="undefined")return;let n=Array.from(document.querySelectorAll(dy)).find(i=>!e.element.contains(i));n!=null&&n.className&&(t.className=n.className)}function qa(e){if(!Bn())return null;try{return new Spicetify.Menu.Item(O().extensionName,!1,e,my())}catch(t){return ue("Failed to create profile menu item",t),null}}function my(){return Zi.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}var py="syncify:beta",Ga=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function Ja(){var e;return(e=window.SyncifyLoader)!=null?e:null}function gy(){try{return window.localStorage.getItem(py)==="true"}catch(e){return!1}}async function Xa(e){let t=gy()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(t.map(i=>hy(`${e}/${i}`)))).reduce((i,o)=>o&&(!i||eo(o,i)>0)?o:i,null)}function Qi(e){return typeof e=="string"&&Ga.test(e)}function eo(e,t){let[n,i]=[e,t].map(o=>{var u;let[,r,s,c,l]=(u=Ga.exec(o))!=null?u:[];return[r,s,c,l!=null?l:1/0].map(Number)});for(let o=0;o<n.length;o+=1)if(n[o]!==i[o])return n[o]<i[o]?-1:1;return 0}async function hy(e,t=3e3){let n=typeof AbortController=="function"?new AbortController:null,i=setTimeout(()=>n==null?void 0:n.abort(),t);try{let o=await fetch(e,{signal:n==null?void 0:n.signal});if(!o.ok)return null;let r=await o.json();return Qi(r==null?void 0:r.version)?r.version:null}catch(o){return null}finally{clearTimeout(i)}}function ht(...e){return e.filter(Boolean).join(" ")}function to(e,t){return t===void 0?e:w(m({},e),{key:t})}function a(e,t,n){let r=t,{children:i}=r,o=Se(r,["children"]);return i===void 0?Rt(e,to(o,n)):Rt(e,to(o,n),i)}function p(e,t,n){let s=t,{children:i}=s,o=Se(s,["children"]),r=Array.isArray(i)?i:[i];return Rt(e,to(o,n),...r)}var Sy={primary:"regular",secondary:"regular",danger:"regular",text:"small",subtle:"small"};function I(e){let l=e,{variant:t="primary",size:n=Sy[t],type:i="button",icon:o,children:r,className:s}=l,c=Se(l,["variant","size","type","icon","children","className"]);return p("button",w(m({className:ht("syncify-btn",s),"data-variant":t,"data-size":n,type:i},c),{children:[o,a("span",{className:"syncify-cap",children:r})]}))}function no(e){return a("input",{className:"syncify-checkbox",type:"checkbox","aria-label":e.label,checked:e.checked,onChange:t=>e.onChange(t.currentTarget.checked),disabled:e.disabled})}function io(e){return p("label",{className:"syncify-checkbox-row","data-disabled":e.disabled?"true":void 0,children:[a("input",{className:"syncify-checkbox",type:"checkbox",checked:e.checked,onChange:t=>e.onChange(t.currentTarget.checked),disabled:e.disabled}),a("span",{className:"syncify-checkbox-label",children:e.label})]})}var by=0;function K(e){let[t]=h(()=>`syncify-${e}-${++by}`);return t}function Gn(e){return p("div",{className:"syncify-dialog-content",children:[a("h2",{className:"syncify-dialog-title",id:e.titleId,children:e.title}),e.children?a("div",{className:"syncify-dialog-text",children:e.children}):null,a("div",{className:"syncify-dialog-actions",children:e.actions})]})}function en(e){let t=H(null),n=K("dialog"),{open:i}=e,o=H(e.onClose);return Et(()=>{o.current=e.onClose}),T(()=>{let r=t.current;if(!r||!i)return;let s=document.activeElement;r.open||r.showModal();let c=l=>{l.preventDefault(),o.current()};return r.addEventListener("cancel",c),()=>{r.removeEventListener("cancel",c),r.open&&r.close(),s instanceof HTMLElement&&s.isConnected&&s.focus()}},[i]),i?a("dialog",{className:"syncify-dialog","data-width":e.wide?"wide":void 0,ref:t,"aria-labelledby":n,children:a(Gn,{title:e.title,actions:e.actions,titleId:n,children:e.children})}):null}function Be(e){var o,r;let t=K("field"),n=`${t}-error`,i=!!e.error;return p("div",{className:"syncify-field-group",children:[a("label",{className:"syncify-field-label",htmlFor:t,children:e.label}),p("div",{className:"syncify-field-row",children:[p("span",{className:"syncify-input-box","data-invalid":i?"true":void 0,"data-disabled":e.disabled?"true":void 0,children:[e.prefix?a("span",{className:"syncify-input-prefix","aria-hidden":"true",children:e.prefix}):null,a("input",{className:"syncify-input-control",id:t,type:(o=e.type)!=null?o:"text",value:e.value,onChange:s=>e.onChange(s.currentTarget.value),onBlur:e.onBlur,placeholder:e.placeholder,inputMode:e.inputMode,autoComplete:(r=e.autoComplete)!=null?r:"off",spellCheck:!1,maxLength:e.maxLength,disabled:e.disabled,autoFocus:e.autoFocus,"aria-invalid":i||void 0,"aria-describedby":i?n:void 0,"data-mono":e.mono?"true":void 0})]}),e.action]}),i?a("span",{className:"syncify-field-error",id:n,role:"alert",children:e.error}):null]})}function Ze(e){let o=e,{children:t,className:n}=o,i=Se(o,["children","className"]);return a("svg",w(m({className:ht("syncify-icon",n),viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},i),{children:t}))}function Za(e){return a(Ze,w(m({},e),{children:a("path",{d:"m9 6 6 6-6 6"})}))}function Qa(e){return p(Ze,w(m({},e),{children:[a("path",{d:"M7 7h10v10"}),a("path",{d:"M7 17 17 7"})]}))}function ec(e){return a(Ze,w(m({},e),{children:a("path",{d:"m6 9 6 6 6-6"})}))}function Oe(e){return a(Ze,w(m({},e),{children:a("path",{d:"M5 12.5l4.5 4.5L19 7.5"})}))}function oo(e){return a(Ze,w(m({},e),{children:a("path",{d:"M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z"})}))}function tc(e){return p(Ze,w(m({},e),{"data-filled":"true",children:[a("rect",{x:"4",y:"10.5",width:"3",height:"3",rx:"0.75"}),a("rect",{x:"10.5",y:"10.5",width:"3",height:"3",rx:"0.75"}),a("rect",{x:"17",y:"10.5",width:"3",height:"3",rx:"0.75"})]}))}function ro(e){return p(Ze,w(m({},e),{children:[a("path",{d:"M12 6v7"}),a("path",{d:"M12 17.5v.5"})]}))}function so(e){let o=e,{keys:t,recording:n}=o,i=Se(o,["keys","recording"]);return a("button",w(m({className:"syncify-keycap",type:"button","data-recording":n?"true":void 0},i),{children:a("span",{className:"syncify-cap",children:t})}))}function V(e){return a("ul",{className:"syncify-list","aria-label":e.label,"aria-busy":e.busy?"true":void 0,"data-wrap":e.wrap?"true":void 0,children:e.children})}function Qe(){return a("li",{className:"syncify-list-divider",role:"presentation"})}function z(e){let t=p(M,{children:[e.leading?a("span",{className:"syncify-row-leading",children:e.leading}):null,p("span",{className:"syncify-row-name",children:[a("span",{className:"syncify-row-name-text",children:e.name}),e.nameMark]}),e.meta?a("span",{className:"syncify-row-meta",children:e.meta}):null,e.end?a("span",{className:"syncify-row-end",children:e.end}):null]}),n=e.meta?"2":"1";return a("li",{className:"syncify-list-item",children:e.onOpen?p("button",{className:"syncify-row",id:e.id,"data-lines":n,type:"button","aria-label":e.openLabel,onClick:e.onOpen,disabled:e.disabled,children:[t,e.external?a(Qa,{className:"syncify-row-chevron"}):a(Za,{className:"syncify-row-chevron"})]}):a("div",{className:"syncify-row",id:e.id,"data-lines":n,"data-plain":e.plain?"true":void 0,children:t})})}function ke(e){return a("span",{className:"syncify-mark-square","data-tone":e.tone,"data-size":e.icon?"large":"small",role:e.label?"img":void 0,"aria-label":e.label,"aria-hidden":e.label?void 0:"true",children:e.icon})}function ao(e){return a("span",{className:"syncify-badge",role:"img","aria-label":e.label,children:a("span",{className:"syncify-cap",children:e.count})})}function ve(e){let t=K("menu"),[n,i]=h(!1),o=H(null),r=H(null),s=e.items.some(f=>f.checked!==void 0);T(()=>{var b,E;let f=r.current,y=o.current;if(!n||!f||!y)return;ky(f),Cy(f,y);let S=nc(f);(E=(b=S.find(A=>A.getAttribute("aria-checked")==="true"))!=null?b:S[0])==null||E.focus();let k=()=>i(!1),x=A=>{let P=A.target;P instanceof Node&&!f.contains(P)&&!y.contains(P)&&k()},g=A=>{A.target instanceof Node&&f.contains(A.target)||k()};return document.addEventListener("pointerdown",x,!0),document.addEventListener("scroll",g,!0),window.addEventListener("resize",k),()=>{document.removeEventListener("pointerdown",x,!0),document.removeEventListener("scroll",g,!0),window.removeEventListener("resize",k),vy(f)}},[n]);function c(){var f;i(!1),(f=o.current)==null||f.focus()}function l(f){let y=nc(f.currentTarget),S=y.findIndex(x=>x===document.activeElement),k=f.key==="ArrowDown"?y[(S+1)%y.length]:f.key==="ArrowUp"?y[(S-1+y.length)%y.length]:f.key==="Home"?y[0]:f.key==="End"?y[y.length-1]:null;k?(f.preventDefault(),k.focus()):f.key==="Escape"?(f.preventDefault(),c()):f.key==="Tab"&&i(!1)}function u(f){(f.key==="ArrowDown"||f.key==="ArrowUp")&&(f.preventDefault(),i(!0))}let d={ref:o,type:"button","aria-haspopup":"menu","aria-expanded":n,"aria-controls":n?t:void 0,disabled:e.disabled,onClick:()=>i(!n),onKeyDown:u};return p(M,{children:[e.trigger==="more"?a("button",w(m({className:"syncify-icon-btn","aria-label":e.label},d),{children:a(tc,{})})):p("button",w(m({className:"syncify-menu-value","aria-label":`${e.label}: ${e.trigger.value}`},d),{children:[a("span",{className:"syncify-cap",children:e.trigger.value}),a(ec,{})]})),n?a("div",{className:"syncify-menu",id:t,ref:r,role:"menu","aria-label":e.label,popover:"manual",onKeyDown:l,children:e.items.map(f=>a(wy,{item:f,picks:s,onPick:()=>{c(),f.onSelect()}},f.label))}):null]})}function wy(e){let{item:t,picks:n}=e;return p("button",{className:"syncify-menu-item",type:"button",role:n?"menuitemradio":"menuitem","aria-checked":n?t.checked===!0:void 0,"data-danger":t.danger?"true":void 0,tabIndex:-1,disabled:t.disabled,onClick:e.onPick,children:[a("span",{className:"syncify-cap",children:t.label}),t.checked?a(Oe,{}):null]})}function nc(e){return[...e.querySelectorAll(".syncify-menu-item:not(:disabled)")]}function ky(e){typeof e.showPopover=="function"&&!e.matches(":popover-open")&&e.showPopover()}function vy(e){typeof e.hidePopover=="function"&&e.matches(":popover-open")&&e.hidePopover()}var xy=4;function Cy(e,t){let n=xy,i=t.getBoundingClientRect(),o=e.getBoundingClientRect(),r=i.bottom+n,s=r+o.height>window.innerHeight&&i.top-n-o.height>=0?i.top-n-o.height:r,c=Math.min(Math.max(i.right-o.width,n),window.innerWidth-o.width-n);e.style.top=`${s}px`,e.style.left=`${c}px`}function Iy(){return p(M,{children:[a("span",{className:"syncify-dot","aria-hidden":"true"}),a("span",{className:"syncify-visually-hidden",children:", "})]})}function F(e){let t=e.parts.filter(n=>n!=null&&n!==!1&&n!=="");return a("span",{className:ht("syncify-meta",e.className),children:t.map((n,i)=>p(M,{children:[i>0?a(Iy,{}):null,a("span",{className:"syncify-meta-part",children:n})]},i))})}function co(e){let t=Math.min(Math.max(e.used,0),e.max),n=`Used ${e.used} of ${e.max}`;return p("span",{className:"syncify-meter",role:"meter","aria-label":e.label,"aria-valuemin":0,"aria-valuemax":e.max,"aria-valuenow":t,"aria-valuetext":n,"data-full":e.used>=e.max?"true":void 0,children:[a("span",{className:"syncify-cap",children:n}),a("span",{className:"syncify-meter-bars","aria-hidden":"true",children:Array.from({length:e.max},(i,o)=>a("span",{className:"syncify-meter-bar","data-used":o<t?"true":void 0},o))})]})}function lo(e){let t=`${xe(e.used)} of ${xe(e.max)}`,n=e.max>0?Math.min(Math.max(e.used/e.max,0),1):0;return p("span",{className:"syncify-usage",role:"meter","aria-label":"Space used","aria-valuemin":0,"aria-valuemax":e.max,"aria-valuenow":Math.min(e.used,e.max),"aria-valuetext":t,"data-warning":e.warning?"true":void 0,children:[a("span",{className:"syncify-cap",children:"Space used"}),a("span",{className:"syncify-usage-bar","aria-hidden":"true",children:a("span",{className:"syncify-usage-fill",style:{width:`${n*100}%`}})}),a("span",{className:"syncify-cap",children:t})]})}function xe(e){return`${Math.ceil(Math.max(e,0)/1024)} KB`}function L(e){let t=e.tone==="error"?"alert":e.live?"status":void 0;return p("div",{className:"syncify-notice","data-tone":e.tone,role:t,children:[p("span",{className:"syncify-notice-body",children:[e.bare?null:a("span",{className:"syncify-notice-mark",children:a(ke,{tone:e.tone})}),a("span",{className:"syncify-notice-text",children:e.children})]}),e.actions?a("span",{className:"syncify-notice-actions",children:e.actions}):null]})}function se(e){return a("span",{className:"syncify-pip-square","data-kind":e.kind,"aria-hidden":"true"})}function Jn(e){return p("label",{className:"syncify-radio-row","data-disabled":e.disabled?"true":void 0,children:[a("input",{className:"syncify-radio",type:"radio",name:e.name,checked:e.checked,onChange:()=>e.onChange(),disabled:e.disabled}),a("span",{className:"syncify-radio-label",children:e.label})]})}function ie(e){return p("div",{className:"syncify-section-label",children:[a("h3",{className:"syncify-section-label-title",id:e.id,tabIndex:e.focusable?-1:void 0,children:e.title}),e.end]})}function oe(e){return p("div",{className:"syncify-setting-row",children:[p("span",{className:"syncify-setting-row-text",children:[a("span",{className:"syncify-setting-row-label",children:e.label}),e.value?a("span",{className:"syncify-setting-row-value",children:e.value}):null]}),e.children]})}function tn(e){return a("div",{className:"syncify-setting-group",role:"group","aria-label":e.label,children:e.children})}function Ce(e){return e.shape==="item"?a("li",{className:"syncify-list-item","aria-hidden":"true",children:p("div",{className:"syncify-row","data-lines":"1",children:[a("span",{className:"syncify-row-leading",children:a("span",{className:"syncify-skeleton","data-width":"pip"})}),a("span",{className:"syncify-row-name",children:a("span",{className:"syncify-skeleton","data-width":"name"})}),p("span",{className:"syncify-row-end",children:[a("span",{className:"syncify-skeleton","data-width":"size"}),a("span",{className:"syncify-skeleton","data-width":"switch"}),a("span",{className:"syncify-skeleton","data-width":"menu"})]})]})}):a("li",{className:"syncify-list-item","aria-hidden":"true",children:p("div",{className:"syncify-row","data-lines":"2",children:[a("span",{className:"syncify-row-name",children:a("span",{className:"syncify-skeleton","data-width":"name"})}),a("span",{className:"syncify-row-meta",children:a("span",{className:"syncify-skeleton","data-width":"meta"})})]})})}function Xn(e){return a("input",{className:"syncify-switch-control",type:"checkbox",role:"switch","aria-label":e.label,checked:e.checked,onChange:t=>e.onChange(t.currentTarget.checked),disabled:e.disabled})}function nn(e){let i=e,{label:t}=i,n=Se(i,["label"]);return p("label",{className:"syncify-setting-row","data-disabled":e.disabled?"true":void 0,children:[a("span",{className:"syncify-setting-row-label",children:t}),a(Xn,m({},n))]})}var ic=(e,t)=>`${e}-tab-${t}`,oc=(e,t)=>`${e}-panel-${t}`;function uo(e){let t=H(null);T(()=>{var i,o,r;(r=(o=(i=t.current)==null?void 0:i.querySelector('[aria-selected="true"]'))==null?void 0:o.scrollIntoView)==null||r.call(o,{block:"nearest",inline:"nearest"})},[e.selected]);function n(i){var c,l;let o=e.tabs.length,r=e.tabs.findIndex(u=>u.id===e.selected),s=i.key==="ArrowRight"?(r+1)%o:i.key==="ArrowLeft"?(r-1+o)%o:i.key==="Home"?0:i.key==="End"?o-1:null;s!==null&&(i.preventDefault(),e.onSelect(e.tabs[s].id),(l=(c=t.current)==null?void 0:c.querySelectorAll('[role="tab"]')[s])==null||l.focus())}return a("div",{className:"syncify-tabs",role:"tablist","aria-label":e.label,ref:t,onKeyDown:n,children:e.tabs.map(i=>{let o=i.id===e.selected;return p("button",{className:"syncify-tab",id:ic(e.idBase,i.id),type:"button",role:"tab","aria-selected":o,"aria-controls":oc(e.idBase,i.id),tabIndex:o?0:-1,onClick:()=>e.onSelect(i.id),children:[a("span",{className:"syncify-cap",children:i.label}),i.status]},i.id)})})}function G(e){return p("div",{className:"syncify-tab-panel",id:oc(e.idBase,e.id),role:"tabpanel","aria-labelledby":ic(e.idBase,e.id),children:[a("div",{className:"syncify-tab-scroll",tabIndex:0,children:e.children}),e.actions?a("div",{className:"syncify-tab-actions",children:e.actions}):null]})}function Te(e){let t=H(e);return Et(()=>{t.current=e}),t}function X(e){if(e.startsWith("mailto:")){window.location.href=e;return}window.open(e,"_blank","noopener,noreferrer")}function Zn(e){let t=e.lastIndexOf("@");if(t<1)return e;let n=e.slice(0,t);return n.length<=2?e:`${n[0]}${"*".repeat(n.length-2)}${n[n.length-1]}${e.slice(t)}`}function rc(e,t=new Date){let n=new Date(e);return n.toDateString()===t.toDateString()?"today":n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===t.getFullYear()?void 0:"numeric"})}function sc(e){let t=rc(e);return t==="today"?t:`on ${t}`}function Ry(e){let t=rc(e);return t==="today"?t:`by ${t}`}function Qn(e){var t;return e.not_me?{title:"Syncify is checking this claim",text:null}:{title:`${(t=e.email)!=null?t:"Someone"} is securing this backup`,text:e.held?"Syncify is checking it.":`If that isn't you, press Not me ${Ry(e.final_at)}.`}}function ac(e){var t;return`This backup is no longer secured by ${(t=e.email)!=null?t:"another account"}`}function ei(e){return e==="cancelled"?"Syncify: claim cancelled":"Syncify: sent for a check"}function ti(e){return`A new install${e.device?` on ${e.device}`:""} wants to back up this Spotify account`}function cc(e,t,n){var s,c;if(t==="not_owner")return{kind:"other-account"};if(!e)return n?{kind:"other-claim"}:{kind:"unknown"};let{claim:i}=e;if((i==null?void 0:i.status)==="final"){if(!i.mine)return{kind:"other-account"};let l=((s=e.accounts)!=null?s:[]).filter(u=>u.status==="final").length;return{kind:"secured",linkedCount:Math.max(l,1)}}if((i==null?void 0:i.status)==="pending")return i.mine?{kind:"pending",finalAt:i.final_at,held:i.held}:{kind:"other-claim"};let o=((c=e.accounts)!=null?c:[]).filter(l=>l.hash===e.hash),r=o[o.length-1];return(r==null?void 0:r.status)==="unlinked"?{kind:"ended",reason:"undone"}:(r==null?void 0:r.status)==="cancelled"&&r.cancelled_by!=="claimer"?{kind:"ended",reason:r.cancelled_by==="owner"?"owner":"admin"}:{kind:"open"}}function lc(e,t,n){return t?{kind:"warning",label:"Sign in to see your backups"}:e?n.kind==="secured"?{kind:"ok",label:"Signed in, backup secured"}:n.kind==="pending"?null:n.kind==="open"?{kind:"warning",label:"Backup not secured yet"}:n.kind==="ended"?{kind:"warning",label:"Backup not secured"}:{kind:"ok",label:"Signed in"}:null}function uc(e){return e.held?"Syncify is checking your request to secure this backup":`Your backup will be secured ${sc(e.finalAt)}`}var on=6,Ey=600*1e3,Ny=300,Py=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function fo(e){return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function dc(e){let[t,n]=h(()=>pn()),[i,o]=h(()=>pn().email),[r,s]=h(""),[c,l]=h(!1),[u,d]=h(null),[f,y]=h(()=>Date.now()),S=!!(t.codeSentAt&&f-t.codeSentAt<Ey),k=Math.max(0,Math.ceil((t.retryAt-f)/1e3)),x=t.retryEmail===null||t.retryEmail===i.trim().toLowerCase()?k:0;T(()=>{if(t.retryAt<=Date.now())return;let P=setInterval(()=>{y(Date.now()),t.retryAt<=Date.now()&&clearInterval(P)},1e3);return()=>clearInterval(P)},[t.retryAt]);function g(P){let v=m(m({},pn()),P);Er(v),n(v),y(Date.now())}async function b(P){var N;let v=P.trim();if(!Py.test(v)){d("Enter a valid email address.");return}l(!0),d(null);try{let C=await Ar(v,{nudge:e.nudge});g({email:v,codeSentAt:Date.now(),retryAt:Date.now()+C*1e3,retryEmail:v.toLowerCase()}),s("")}catch(C){let _=C instanceof B?C:null,Z=(N=_==null?void 0:_.retryAfter)!=null?N:null,ae=Z&&Z<=Ny?Date.now()+Z*1e3:0,U=(_==null?void 0:_.code)==="too_many_requests"?null:v.toLowerCase();if((_==null?void 0:_.code)==="resend_wait"){g({email:v,codeSentAt:t.email===v&&t.codeSentAt?t.codeSentAt:Date.now(),retryAt:ae,retryEmail:U});return}ae&&g({retryAt:ae,retryEmail:U}),d(De(C))}finally{l(!1)}}async function E(){l(!0),d(null);try{let P=await _r(t.email,r);g({codeSentAt:null}),s(""),e.onSignedIn(P)}catch(P){d(De(P));let v=P instanceof B?P.code:null;(v==="too_many_attempts"||v==="code_expired")&&s("")}finally{l(!1)}}async function A(P){l(!0),d(null),await Lr(),g({email:P,codeSentAt:null}),o(P),l(!1)}return{draft:t,email:i,setEmail:o,code:r,setCode:P=>s(P.replace(/\D/g,"").slice(0,on)),busy:c,error:u,codeSent:S,waitSeconds:k,emailWaitSeconds:x,requestCode:b,verify:E,signOut:A,useAnotherEmail:()=>{g({codeSentAt:null}),s(""),d(null)}}}function fc(e){let{signIn:t}=e,{busy:n}=t;return a("form",{className:"syncify-account-form",noValidate:!0,onSubmit:i=>{i.preventDefault(),!n&&(t.codeSent?t.code.length===on&&t.verify():t.emailWaitSeconds||t.requestCode(t.email))},children:t.codeSent?p(M,{children:[a(Be,{label:`Code sent to ${Zn(t.draft.email)}`,value:t.code,onChange:t.setCode,error:t.error,placeholder:"123456",inputMode:"numeric",autoComplete:"one-time-code",maxLength:on,mono:!0,autoFocus:!0,action:a(I,{type:"submit",disabled:n||t.code.length!==on,children:n?"Verifying\u2026":"Verify"})}),p("span",{className:"syncify-account-resend",children:[a(I,{variant:"text",onClick:()=>{t.requestCode(t.draft.email)},disabled:n||t.waitSeconds>0,children:t.waitSeconds>0?`Resend in ${fo(t.waitSeconds)}`:"Resend code"}),a(I,{variant:"text",onClick:t.useAnotherEmail,disabled:n,children:"Use another email"})]})]}):a(Be,{label:"Email for sign-in codes",type:"email",value:t.email,onChange:t.setEmail,error:t.error,placeholder:"you@example.com",autoComplete:"email",autoFocus:!0,action:a(I,{type:"submit",disabled:n||t.emailWaitSeconds>0||!t.email.trim(),children:n?"Sending\u2026":t.emailWaitSeconds>0?`Send in ${fo(t.emailWaitSeconds)}`:"Send code"})})})}var Ty={owner:"This backup isn't secured. Someone using this Spotify account said it isn't yours.",admin:"This backup isn't secured. Syncify couldn't confirm it's yours.",undone:"This backup is no longer secured by your account."};function yc(e){let{session:t,secure:n,handle:i}=e,o=dc({nudge:e.nudge,onSignedIn:e.onSignedIn}),[r,s]=h(null),[c,l]=h(!1),u=Te(b=>{t&&Mr().then(E=>{!b()||E||(s({kind:"warning",text:De(new B("signed_out"))}),e.onSignedOut())}).catch(()=>{})}),d=t==null?void 0:t.token;T(()=>{let b=!0;return u.current(()=>b),()=>{b=!1}},[u,d]);let f=Te(b=>{!t||i!==void 0||_n().then(E=>{var A,P;b()&&e.onHandle((P=(A=E.profile)==null?void 0:A.handle)!=null?P:null)}).catch(()=>{})});T(()=>{let b=!0;return f.current(()=>b),()=>{b=!1}},[f,!!t&&i===void 0]);async function S(){l(!0),s(null);try{X(await Br())}catch(b){let E=b instanceof B&&b.code==="signed_out";s({kind:E?"warning":"error",text:De(b)}),E&&e.onSignedOut()}finally{l(!1)}}async function k(){var b;s(null),await o.signOut((b=t==null?void 0:t.email)!=null?b:""),e.onSignedOut()}if(t===void 0)return a(G,{idBase:e.idBase,id:"account",children:null});if(!t)return p(G,{idBase:e.idBase,id:"account",children:[a("p",{className:"syncify-tab-text",children:e.locked?"Sign in with the email that secured this backup":"Sign in to secure your backup so only you can restore it"}),r?a(L,{tone:r.kind,live:!0,children:r.text}):null,a(fc,{signIn:o})]});let x=n.kind==="open"||n.kind==="other-claim"||n.kind==="ended"&&n.reason!=="undone",g=o.busy||c;return p(G,{idBase:e.idBase,id:"account",children:[p(tn,{children:[a(oe,{label:"Email for sign-in codes",value:Zn(t.email)}),i?a(oe,{label:"Creator handle",value:`@${i}`}):null,a(oe,{label:"Your account page",children:a(I,{variant:"secondary",size:"small",onClick:()=>{S()},disabled:g,children:"Open"})}),x?a(oe,{label:"Secure your backup so only you can restore it",children:a(I,{onClick:e.onSecure,disabled:g||e.securing||n.kind==="other-claim",children:e.securing?"Securing\u2026":n.kind==="ended"?"Secure again":"Secure"})}):null]}),n.kind==="ended"?a(L,{tone:"warning",children:Ty[n.reason]}):null,e.secureError?a(L,{tone:"error",children:e.secureError}):null,r?a(L,{tone:r.kind,live:!0,children:r.text}):null,p("div",{className:"syncify-account-footer",children:[p("span",{className:"syncify-account-status",children:[n.kind==="secured"?a(Oe,{className:"syncify-account-check"}):null,a(F,{parts:Ay(n)})]}),a(I,{variant:"text",onClick:()=>{k()},disabled:g,children:"Sign out"})]})]})}function Ay(e){switch(e.kind){case"secured":return["This backup is secured",...e.linkedCount>1?[`${e.linkedCount} Spotify accounts linked`]:[]];case"pending":return[uc(e)];case"other-account":return["This backup is secured by another account"];default:return["Signed in"]}}var mc=new WeakMap;function St(e){let t=mc.get(e);return t||(t=te(e.marketplace_data.keys),mc.set(e,t)),t}function et(e){return tt(e,"item")}function tt(e,t){return`${e} ${t}${e===1?"":"s"}`}function bt(e,t=new Date){let n=new Date(e);if(Number.isNaN(n.getTime()))return e;let i=n.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),o=new Date(t);return o.setDate(t.getDate()-1),n.toDateString()===t.toDateString()?`today, ${i}`:n.toDateString()===o.toDateString()?`yesterday, ${i}`:`${n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===t.getFullYear()?void 0:"numeric"})}, ${i}`}function ni(e){return e.length<=1?e.join(""):`${e.slice(0,-1).join(", ")} and ${e[e.length-1]}`}function yo(e,t=new Date){let n=new Date(e);if(Number.isNaN(n.getTime()))return"";let i=new Date(t);return i.setDate(t.getDate()-1),n.toDateString()===t.toDateString()?"today":n.toDateString()===i.toDateString()?"yesterday":n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===t.getFullYear()?void 0:"numeric"})}function pc(e,t,n){var l,u;let i=bt(e.metadata.last_sync_datetime),o=et(St(e).length),r=`from ${e.metadata.device_info}`,s=(u=(l=e.backup)==null?void 0:l.name)!=null?u:null,c=e.payload_hash===n;return t==="safety-copy"?{backup:e,kind:t,name:"Safety copy",meta:[s,i,o,"updated weekly"].filter(_y),current:c,title:`the safety copy from ${i}`}:t==="unapproved"?{backup:e,kind:t,name:"Not approved",meta:[i,o,r],current:c,title:i}:{backup:e,kind:t,name:s!=null?s:i.charAt(0).toUpperCase()+i.slice(1),meta:s?[i,o,r]:[o,r],current:c,title:s!=null?s:i}}function _y(e){return e!==null}var gc={extension:"extension",theme:"theme",snippet:"snippet"},My={extension:"extension",custom_app:"app",theme:"theme"},Ly={extension:"extension",custom_app:"custom app",theme:"theme"};function ii(e){let{changes:t}=e,[n,i]=h(!1);return p(V,{label:e.label,children:[t.changes.map(o=>a(By,{change:o,includeLabel:e.includeLabel(o.name),onInclude:r=>e.onInclude(o.key,r),disabled:e.disabled},o.key)),t.manual.map(o=>a(z,{leading:a(se,{kind:My[o.type]}),name:o.name,meta:a(F,{parts:[Ly[o.type],o.scheme]}),end:a("span",{className:"syncify-change-label syncify-cap",children:"Add manually"})},`${o.type}:${o.name}`)),t.settings.length>0?a(Qe,{}):null,t.settings.map(o=>a(z,{leading:a(se,{kind:o.kind}),name:o.name,end:a("span",{className:"syncify-change-label syncify-cap","data-change":"Updates",children:"Updates"})},`settings:${o.id}`)),t.settings.length>0&&t.unchanged.length>0?a(Qe,{}):null,t.unchanged.length>0?a(z,{name:p("span",{className:"syncify-change-fold",children:[t.unchanged.length," more stay the same"]}),end:a(I,{variant:"subtle","aria-expanded":n,onClick:()=>i(!n),children:n?"Hide":"Show"})}):null,n?t.unchanged.map(o=>a(Oy,{item:o},o.key)):null]})}function By(e){let{change:t}=e;return a(z,{leading:a(se,{kind:gc[t.type]}),name:t.name,meta:t.note?a(F,{parts:[t.note]}):void 0,end:p(M,{children:[a("span",{className:"syncify-change-label syncify-cap","data-change":t.fixed?void 0:t.change,children:t.fixed?"Stays off":t.change}),t.optional&&!t.fixed?a(no,{checked:t.included,onChange:e.onInclude,label:e.includeLabel,disabled:e.disabled}):null]})})}function Oy(e){return a(z,{leading:a(se,{kind:gc[e.item.type]}),name:e.item.name,meta:e.item.note?a(F,{parts:[e.item.note]}):void 0})}var hc={Adds:0,Updates:1,Removes:2},Dy=["blocked","host","repo","catalog","unchecked"];function oi(e,t,n){var u,d,f;let{optional:i,allowed:o}=n,r=(u=n.fixed)!=null?u:new Set,s=[],c=[];for(let y of e.items){let S=t.get(y.key),k=i.has(y.key)||r.has(y.key),x={key:y.key,name:y.name,type:y.type,note:S?mo(S):r.has(y.key)?"Not in Marketplace's list":n.unapproved&&k?"Not approved":null},g=y.change==="added"?"Adds":y.change==="removed"?"Removes":y.isNew?"Updates":null;if(g){let b=r.has(y.key);s.push(w(m({},x),{change:g,optional:k,fixed:b,included:!k||!b&&o.has(y.key)}))}else c.push(x)}s.sort((y,S)=>hc[y.change]-hc[S.change]);let l=(d=n.settings)!=null?d:[];return{changes:s,settings:l,unchanged:c,manual:e.manual,warnings:[...Uy(s,t,(f=n.verb)!=null?f:"Restore"),...$y(s)],count:s.filter(y=>y.included).length+l.length}}function ri(e,t){return t===0?e:t===1?`${e} 1 change`:`${e} ${t} changes`}function mo(e){switch(e.kind){case"host":return`Code from ${e.host}`;case"repo":return`Code from ${e.repo}`;case"blocked":return"Blocked by Marketplace";case"catalog":return"Not in Marketplace";case"unchecked":return"Not checked";case"custom":return"Custom"}}function Uy(e,t,n){var o;let i=new Map;for(let r of e){if(r.change==="Removes"||r.fixed)continue;let s=t.get(r.key);!s||!ut(s)&&s.kind!=="unchecked"||i.set(s.kind,[...(o=i.get(s.kind))!=null?o:[],r.name])}return Dy.flatMap(r=>{let s=i.get(r);return s?[Hy(r,s,n)]:[]})}function $y(e){let t=e.filter(n=>n.fixed).map(n=>n.name);return t.length===0?[]:[t.length===1?`${ni(t)} isn't in Marketplace's list anymore, so it stays off.`:`${ni(t)} aren't in Marketplace's list anymore, so they stay off.`]}function Hy(e,t,n){let i=t.length===1,o=ni(t),r=i?`${n} it only if you trust it.`:`${n} them only if you trust them.`;switch(e){case"blocked":return`${o} ${i?"is":"are"} on Marketplace's block list. ${r}`;case"host":return`${o} ${i?"loads from a site":"load from sites"} outside GitHub. ${r}`;case"repo":return i?`${o} loads its code from a different repo than the one it names. ${r}`:`${o} load their code from different repos than the ones they name. ${r}`;case"catalog":return`${o} ${i?"isn't":"aren't"} in Marketplace's catalog. ${r}`;default:return`GitHub couldn't be reached to check ${o}. ${r}`}}function Sc(e){return e.map(t=>w(m({},t),{name:`${t.name} settings`})).sort((t,n)=>t.name.localeCompare(n.name))}function bc(e,t,n){var P;let[i,o]=h(()=>new Set),[r,s]=h(null),c=J(()=>xn(St(e),e.spicetify_config,t,n),[e,t,n]),l=J(()=>dt(c.items),[c]);T(()=>{let v=!0;return ft(c.items,l).then(N=>{v&&s({for:e,checks:N})}),()=>{v=!1}},[e,c,l]);let[u,d]=h(null);T(()=>{let v=!0;return Jr(e.extension_settings).catch(()=>[]).then(N=>{v&&d({for:e,items:N})}),()=>{v=!1}},[e]);let f=(r==null?void 0:r.for)===e?r.checks:null,y=J(()=>new Map([...f!=null?f:[],...l]),[f,l]),S=((P=e.backup)==null?void 0:P.kind)==="quarantined",k=J(()=>new Set(c.items.filter(v=>{var N;return v.change!=="removed"&&v.isNew&&(S||ut(y.get(v.key))||((N=y.get(v.key))==null?void 0:N.kind)==="unchecked")}).map(v=>v.key)),[c,y,S]),x=J(()=>[...k].filter(v=>!i.has(v)),[k,i]),g=(u==null?void 0:u.for)===e?u.items:null,b=J(()=>Sc(g!=null?g:[]).filter(v=>!x.includes(v.key)),[g,x]),E=J(()=>oi(c,y,{optional:k,allowed:i,unapproved:S,settings:b.map(({id:v,name:N,kind:C})=>({id:v,name:N,kind:C}))}),[c,y,k,i,S,b]);function A(v,N){let C=new Set(i);N?C.add(v):C.delete(v),o(C)}return{preview:c,changes:E,unapproved:S,checking:f===null||g===null,skipped:x,settingsIds:E.settings.map(v=>v.id),allow:A}}function wc(e){let{row:t,local:n}=e,i=K("restore-heading"),o=bc(t.backup,n.items,n.spicetifyConfig),{changes:r}=o,s=!n.marketplaceAvailable,c=e.canShareSettings&&o.settingsIds.length>0;T(()=>{var u;(u=document.getElementById(i))==null||u.focus()},[i]);let l=p(M,{children:[a(I,{variant:"secondary",onClick:e.onCancel,disabled:e.restoring,children:"Cancel"}),a(I,{onClick:()=>e.onRestore({row:t,skipped:o.skipped,manual:o.preview.manual,settings:{ids:o.settingsIds,share:c&&e.shareSettings}}),disabled:e.busy||o.checking||s,children:e.restoring?"Restoring\u2026":o.checking?"Checking\u2026":ri("Restore",r.count)})]});return p(G,{idBase:e.idBase,id:"backups",actions:l,children:[a(ie,{title:`Restore ${t.title}`,id:i,focusable:!0}),s?a(L,{tone:"warning",children:"Install Spicetify Marketplace to restore a backup."}):null,o.unapproved?a(L,{tone:"warning",children:"An install this Spotify account hasn't approved made this backup. Its items stay off unless you turn them on."}):null,a(ii,{changes:r,label:"What this restore changes",includeLabel:u=>`Restore ${u}`,onInclude:o.allow,disabled:e.busy}),r.warnings.map(u=>a(L,{tone:"warning",children:u},u)),e.localIsUnsaved?a(L,{tone:"warning",children:"Your current setup isn't backed up."}):null,c?a(io,{label:"Use these extension settings on my other devices too",checked:e.shareSettings,onChange:e.onShareSettingsChange,disabled:e.busy}):null]})}function kc(e){var E,A,P,v,N;let{remote:t,local:n}=e,i=K("backup"),[o,r]=h(null),[s,c]=h(null),l=H(null);if(T(()=>{var C;s||!l.current||((C=document.getElementById(l.current))==null||C.focus(),l.current=null)},[s]),s&&n)return a(wc,{idBase:e.idBase,row:s,local:n,localIsUnsaved:n.installedItemCount>0&&!Ky(n.hash,t),canShareSettings:e.canShareSettings,shareSettings:e.shareSettings,onShareSettingsChange:e.onShareSettingsChange,busy:e.busy,restoring:e.restoring,onCancel:()=>c(null),onRestore:C=>{var _;return e.onRestore(w(m({},C),{linkedHash:(_=o==null?void 0:o.hash)!=null?_:null}))}},s.backup.payload_hash);async function u(C){if(!C){r(null);return}r({hash:C,remote:null});try{let _=await Xe(e.config,C);r({hash:C,remote:_})}catch(_){r(null),e.onError(_)}}let d=o?o.remote:t,f=(E=n==null?void 0:n.hash)!=null?E:null,y=C=>`${i}-${C.backup.payload_hash}`,S=(C,_)=>C.map(Z=>pc(Z,_,f)),k=S((A=d==null?void 0:d.backups)!=null?A:[],"backup"),x=S(d!=null&&d.safetyCopy?[d.safetyCopy]:[],"safety-copy"),g=o?[]:S((P=t==null?void 0:t.unapproved)!=null?P:[],"unapproved");function b(C){return a(z,{id:y(C),name:C.name,nameMark:C.kind==="safety-copy"?a(oo,{className:"syncify-safety-mark"}):C.kind==="unapproved"?a(ke,{tone:"warning"}):void 0,meta:a(F,{parts:C.meta}),end:C.current?a("span",{className:"syncify-row-status syncify-cap",children:"Current"}):void 0,onOpen:C.current?void 0:()=>{l.current=y(C),c(C)},openLabel:`Preview restore of ${C.title}`,disabled:e.busy},`${C.kind}-${C.backup.payload_hash}-${C.backup.metadata.last_sync_datetime}`)}return p(G,{idBase:e.idBase,id:"backups",children:[e.notices,n&&!n.marketplaceAvailable?a(L,{tone:"warning",children:"Install Spicetify Marketplace to restore a backup."}):null,!e.lockedBy&&e.otherAccounts.length>0?a(oe,{label:"Show backups from",children:a(ve,{label:"Show backups from",trigger:{value:(N=(v=e.otherAccounts.find(C=>C.hash===(o==null?void 0:o.hash)))==null?void 0:v.label)!=null?N:"This Spotify account"},items:[{hash:null,label:"This Spotify account"},...e.otherAccounts].map(C=>{var _;return{label:C.label,checked:((_=o==null?void 0:o.hash)!=null?_:null)===C.hash,onSelect:()=>{u(C.hash)}}}),disabled:e.busy})}):null,e.lockedBy?a("p",{className:"syncify-tab-text",children:e.lockedBy==="not_owner"?"Sign in with the account that secured them":"Sign in to see and restore your backups"}):(!t||!n)&&e.failed?null:!t||!n||o&&!o.remote?p(V,{label:"Loading backups",children:[a(Ce,{}),a(Ce,{})]}):k.length+x.length+g.length===0?o?a("p",{className:"syncify-tab-text",children:"No backups yet."}):null:p(V,{label:"Backups",children:[k.map(b),x.length>0?a(Qe,{}):null,x.map(b),g.length>0?a(Qe,{}):null,g.map(b)]})]})}function Ky(e,t){return t?[...t.backups,...t.safetyCopy?[t.safetyCopy]:[]].some(n=>n.payload_hash===e):!1}function vc(e){let t=K("first-sync"),[n,i]=h(()=>Object.fromEntries(e.choices.map(d=>[d.id,d.localAt>d.accountAt?"here":"account"]))),[o,r]=h(!1),[s,c]=h(null),l=d=>{var f;return(f=n[d.id])!=null?f:d.localAt>d.accountAt?"here":"account"};async function u(){r(!0),c(null);try{await Sa(Object.fromEntries(e.choices.map(d=>[d.id,l(d)]))),e.onClose()}catch(d){c(d instanceof Error?d.message:String(d))}finally{r(!1)}}return p(en,{open:e.open,wide:!0,onClose:e.onClose,title:"Which extension settings do you want to keep?",actions:p(M,{children:[a(I,{variant:"secondary",onClick:e.onClose,disabled:o,children:"Ask me later"}),a(I,{onClick:()=>{u()},disabled:o,children:"Keep these"})]}),children:[a("p",{children:"These items have different settings in this Spotify than on your other devices. Choose the settings to keep for each item. All your devices will then use them."}),a(V,{wrap:!0,children:e.choices.map(d=>a(z,{leading:a(se,{kind:d.kind}),name:d.name,end:p("span",{className:"syncify-first-sync-picks",role:"radiogroup","aria-label":d.name,children:[a(Jn,{name:`${t}-${d.id}`,label:`This Spotify, ${yo(d.localAt)}`,checked:l(d)==="here",onChange:()=>i(f=>w(m({},f),{[d.id]:"here"})),disabled:o}),a(Jn,{name:`${t}-${d.id}`,label:`Other devices, ${yo(d.accountAt)}`,checked:l(d)==="account",onChange:()=>i(f=>w(m({},f),{[d.id]:"account"})),disabled:o})]})},d.id))}),s?a(L,{tone:"error",children:s}):null]})}function nt(e,t){return e.items.filter(n=>n.hold!==null&&!t.includes(n.id))}function xc(e,t){let{hold:n}=e;if(n.reason==="account_full")return`${e.name} is held because your extension settings are over ${xe(t)}. Your other devices keep the last copy that fit. To sync it again, turn off an item or delete a synced copy in Items.`;let i=`${xe(n.size)} of its ${xe(e.limit)}`;return e.list?`${e.name}'s list is too big to sync, ${i}. Your other devices keep the last list that fit. It syncs again once the list is smaller.`:`${e.name}'s extension settings are too big to sync, ${i}. Your other devices keep the last copy that fit. They sync again once they're smaller.`}function Cc(e){return e.hold?`${xe(e.hold.size)}, too big to sync`:xe(e.size)}function Ic(e,t){let n=nt(e,t).filter(i=>i.hold.reason==="account_full");return{used:e.bytes+n.reduce((i,o)=>i+Math.max(o.hold.size-o.accountSize,0),0),over:n.length>0}}function Rc(e,t){let n=e.items,i=n.filter(r=>t.includes(r.id)).length,o=nt(e,t).length;return{syncing:n.length-i-o,held:o,off:i}}function zy(){return`${O().webUrl.replace(/\/+$/,"")}/supported`}var Fy=4;function Ec(e){let{config:t,status:n}=e,i=K("extension-settings"),o=H(null),r=nt(n,t.settingsSyncOff),s=e.secured&&t.settingsSyncEnabled&&r.length>0,c=H(s);return T(()=>{var l;c.current&&((l=o.current)==null||l.scrollIntoView({block:"start"}))},[]),p("div",{className:"syncify-sync-section","data-place":"settings",ref:o,role:"group","aria-labelledby":i,children:[a(ie,{title:"Extension settings",id:i}),e.secured?p(M,{children:[a(nn,{label:"Syncing on this device",checked:t.settingsSyncEnabled,onChange:e.onEnabledChange,disabled:e.disabled}),t.settingsSyncEnabled?p(M,{children:[a(Nc,{status:n,off:t.settingsSyncOff}),a(Pc,{items:r,accountLimit:n.limit})]}):null]}):a(L,{tone:"info",bare:!0,actions:a(I,{size:"small",onClick:e.onSecure,disabled:e.securing,children:e.securing?"Securing\u2026":"Secure"}),children:"Secure your backup to sync extension settings between your devices."}),p(V,{children:[e.secured&&t.settingsSyncEnabled?n.items.length===0?a(z,{name:"None of your items have settings Syncify can sync",plain:!0}):a(z,{name:"Items",meta:a(jy,{status:n,off:t.settingsSyncOff}),onOpen:e.onOpenItems}):null,a(z,{name:"Supported extensions",external:!0,onOpen:()=>X(zy())})]})]})}function jy(e){let t=Rc(e.status,e.off);return a(F,{parts:[t.syncing>0&&`${t.syncing} syncing`,t.held>0&&p("span",{className:"syncify-sync-warning",children:[t.held," too big to sync"]}),t.off>0&&`${t.off} off`]})}function Nc(e){let{used:t,over:n}=Ic(e.status,e.off);return a(lo,{used:t,max:e.status.limit,warning:n})}function Pc(e){return a(M,{children:e.items.map(t=>a(L,{tone:"warning",children:xc(t,e.accountLimit)},t.id))})}function Tc(e){let{config:t,status:n}=e,i=K("items"),[o,r]=h(null),[s,c]=h([]),l=H({ids:[],names:new Map});T(()=>{var S;let y=!0;return wa().catch(()=>n.items).then(k=>{y&&r(k)}),(S=document.getElementById(i))==null||S.focus(),()=>{y=!1}},[]);let u=H(e.onDeleted);T(()=>{u.current=e.onDeleted}),T(()=>()=>{let{ids:y,names:S}=l.current;y.length!==0&&Promise.all(y.map(k=>ba(Y(),k).catch(x=>{var b;let g=x instanceof Error?x.message:String(x);Spicetify.showNotification(`Syncify couldn't delete the synced copy of ${(b=S.get(k))!=null?b:k}. ${g}`,!0,6e3)}))).then(()=>u.current())},[]);function d(y,S){let k=S?[...s,y.id]:s.filter(x=>x!==y.id);l.current.names.set(y.id,y.name),l.current.ids=k,c(k)}let f=nt(w(m({},n),{items:o!=null?o:n.items}),t.settingsSyncOff);return p("div",{className:"syncify-sync-section",children:[a(ie,{title:"Items",id:i,focusable:!0,end:a(I,{variant:"subtle",onClick:e.onBack,children:"Back to settings"})}),a(Nc,{status:n,off:t.settingsSyncOff}),a(Pc,{items:f,accountLimit:n.limit}),a(V,{label:"Items",busy:o===null,wrap:!0,children:o===null?Array.from({length:Fy},(y,S)=>a(Ce,{shape:"item"},S)):o.map(y=>a(Wy,{item:y,on:!t.settingsSyncOff.includes(y.id),deleted:s.includes(y.id),onChange:S=>e.onItemChange(y.id,S),onDelete:S=>d(y,S)},y.id))})]})}function Wy(e){let{item:t}=e;return a(z,{leading:a(se,{kind:t.kind}),name:t.name,end:e.deleted?p(M,{children:[a("span",{className:"syncify-sync-size",children:"Synced copy deleted"}),a(I,{variant:"text",onClick:()=>e.onDelete(!1),children:"Undo"})]}):p(M,{children:[a("span",{className:"syncify-sync-size","data-tone":t.hold&&e.on?"warning":void 0,children:e.on?Cc(t):xe(t.size)}),a(Xn,{label:`Sync ${t.name}`,checked:e.on,onChange:e.onChange}),a(ve,{trigger:"more",label:`More for ${t.name}`,items:[{label:"Delete synced copy",danger:!0,onSelect:()=>e.onDelete(!0)}]})]})})}function Ac(e,t){let[n,i]=h(!1),[o,r]=h(null),s=Te(t);return T(()=>{if(!n)return;let c=l=>{var d;if(!((d=document.getElementById(e))!=null&&d.isConnected)){i(!1),r(null);return}l.preventDefault(),l.stopImmediatePropagation();let u=Gs(l);if(u.kind!=="ignore"){if(u.kind==="cancel"){i(!1),r(null);return}if(u.kind==="error"){r(u.message);return}if(Js(u.shortcut)){r(`${Ft(u.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}i(!1),s.current(u.shortcut)}};return window.addEventListener("keydown",c,!0),()=>window.removeEventListener("keydown",c,!0)},[n,e,s]),{recording:n,error:o,clearError:()=>r(null),toggle:()=>{r(null),i(!n)}}}var _c=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function Mc(e){var S,k;let{config:t}=e,[n,i]=h("settings"),[o]=h(()=>Bn()),r=K("shortcut"),s=Ac(r,f),c=o?t.entryPoint:"topbar",l=s.recording?"Press keys":t.shortcut?Ft(t.shortcut):"Off";function u(x){Je(x),e.onConfigChange(x)}function d(x,g){let b=Y().settingsSyncOff.filter(E=>E!==x);u(w(m({},t),{settingsSyncOff:g?b:[...b,x]}))}if(n==="items")return a(G,{idBase:e.idBase,id:"settings",children:a(Tc,{config:t,status:e.syncStatus,onItemChange:d,onBack:()=>i("settings"),onDeleted:()=>e.onConfigChange(Y())})});function f(x){u(w(m({},t),{shortcut:x})),Ki(x),s.clearError()}function y(x){u(w(m({},t),{entryPoint:x})),On(x)}return p(G,{idBase:e.idBase,id:"settings",children:[p(tn,{children:[a(nn,{label:"Automatic backup when Spotify starts",checked:t.autoBackupEnabled&&!e.unsupported,onChange:x=>u(w(m({},t),{autoBackupEnabled:x})),disabled:e.busy||e.unsupported}),a(oe,{label:"Open Syncify from",children:a(ve,{label:"Open Syncify from",trigger:{value:(k=(S=_c.find(x=>x.value===c))==null?void 0:S.label)!=null?k:""},items:_c.map(x=>({label:x.label,checked:x.value===c,onSelect:()=>y(x.value)})),disabled:!o})}),a(oe,{label:"Keyboard shortcut",value:s.recording&&!s.error?"Press a key combination, or Esc to cancel":void 0,children:p("span",{className:"syncify-settings-shortcut",children:[s.recording?null:t.shortcut?a(I,{variant:"subtle",onClick:()=>f(null),children:"Turn off"}):a(I,{variant:"subtle",onClick:()=>f(mt),children:"Use default"}),a(so,{id:r,keys:l,recording:s.recording,"aria-label":s.recording?`${l} for a new keyboard shortcut`:`${l}, change the keyboard shortcut`,onClick:s.toggle})]})})]}),s.error?a(L,{tone:"warning",live:!0,children:s.error}):null,o?t.entryPoint==="menu"&&!t.shortcut?a(L,{tone:"warning",children:"Keep a shortcut in case a Spotify update breaks the profile menu."}):null:a(L,{tone:"info",children:"The profile menu isn't available in this Spicetify version."}),a(Ec,{config:t,status:e.syncStatus,secured:e.secured,securing:e.securing,onSecure:e.onSecure,onEnabledChange:x=>u(w(m({},t),{settingsSyncEnabled:x,settingsSyncOff:Y().settingsSyncOff})),onOpenItems:()=>i("items"),disabled:e.busy})]})}function Lc(){let[e,t]=h(()=>Ne());return T(()=>jn(t),[]),e}function rn(e){let t=`${O().webUrl.replace(/\/+$/,"")}/discover`;return e?`${t}?post=${encodeURIComponent(e)}`:t}function wt(e){var t;return(t=e.name)!=null?t:Ee(e.code)}function Bc(e){return[`Used by ${e.imports}`,...e.posted?["On Discover"]:[]]}function Oc(e){let t=e.posted?"The code stops working and its Discover post comes down.":"The code stops working.";return e.imports===0?t:`${t} ${e.imports===1?"1 person":`${e.imports} people`} used it.`}var si=12;function Dc(e){return[...Array(Math.min(e.extensions,si)).fill("extension"),...Array(Math.min(e.themes,si)).fill("theme"),...Array(Math.min(e.snippets,si)).fill("snippet")].slice(0,si)}var Yy={extension:"extension",theme:"theme",snippet:"snippet"};function Uc(e){var l,u;let{compose:t}=e,n=K("compose-heading"),i=(u=(l=t.compose)==null?void 0:l.code)!=null?u:null,{draft:o,saving:r}=t;T(()=>{var d;(d=document.getElementById(n))==null||d.focus()},[n]);let s=o?[...o.items].sort((d,f)=>Number(o.leftOut.has(f.key))-Number(o.leftOut.has(d.key))||d.name.localeCompare(f.name)):[],c=p(M,{children:[a(I,{variant:"secondary",onClick:t.cancel,disabled:r,children:"Cancel"}),a(I,{onClick:()=>{t.save()},disabled:!o||t.included.length===0||r,children:o?r?i?"Updating\u2026":"Creating\u2026":i?"Update code":"Create code":"Checking\u2026"})]});return p(G,{idBase:e.idBase,id:"share",actions:c,children:[a(ie,{title:i?`Update ${wt(i)}`:"Create a code",id:n,focusable:!0}),t.error?a(L,{tone:"error",children:t.error}):null,a(Be,{label:"Setup name (optional)",value:t.name,onChange:t.setName,maxLength:Is,disabled:r}),t.askHandle?a(Be,{label:"Pick a handle for your profile",value:t.handle,onChange:t.setHandle,onBlur:t.checkHandle,error:t.handleError,prefix:"@",maxLength:Li,disabled:r}):null,o&&t.included.length===0?a(L,{tone:"warning",children:"Nothing here can go in a code. Add something from Marketplace first."}):null,a(ie,{title:"What goes in",end:o?a(F,{parts:[et(t.included.length)]}):void 0}),o?a(V,{label:"What goes in",children:s.map(d=>{let f=o.leftOut.get(d.key),y=[f?mo(f):null,d.repo].filter(Boolean);return a(z,{leading:a(se,{kind:Yy[d.type]}),name:d.name,meta:y.length>0?a(F,{parts:y}):void 0,end:f?a("span",{className:"syncify-change-label syncify-cap",children:"Left out"}):void 0},d.key)})}):p(V,{label:"Checking your items",children:[a(Ce,{}),a(Ce,{})]})]})}var $c=[["add","Add to my setup"],["replace","Replace my setup"]];function Hc(e){var c,l,u,d;let{load:t}=e,n=K("share-heading"),i=(c=t.shared)==null?void 0:c.file;if(T(()=>{var f;(f=document.getElementById(n))==null||f.focus()},[n]),!i||!t.changes)return null;let o=e.marketplaceAvailable===!1,r=i.creator,s=p(M,{children:[a(I,{variant:"secondary",onClick:t.close,disabled:t.applying,children:"Cancel"}),a(I,{onClick:()=>{t.apply()},disabled:t.applying||t.checking||e.busy||o,children:t.applying?"Loading\u2026":t.checking?"Checking\u2026":ri("Load",t.changes.count)})]});return p(G,{idBase:e.idBase,id:"share",actions:s,children:[a(ie,{title:`Load ${(l=i.name)!=null?l:Ee(i.code)}`,id:n,focusable:!0,end:r?a(I,{variant:"text",onClick:()=>X(Bs(r)),children:`by @${r}`}):void 0}),t.applyError?a(L,{tone:"error",children:t.applyError}):null,o?a(L,{tone:"warning",children:"Install Spicetify Marketplace to load a setup."}):null,a(oe,{label:"How to load it",children:a(ve,{label:"How to load it",trigger:{value:(d=(u=$c.find(([f])=>f===t.mode))==null?void 0:u[1])!=null?d:""},items:$c.map(([f,y])=>({label:y,checked:t.mode===f,onSelect:()=>t.setMode(f)})),disabled:t.applying})}),a(ii,{changes:t.changes,label:"What loading it changes",includeLabel:f=>`Load ${f}`,onInclude:t.allow,disabled:t.applying}),t.theme?a(L,{tone:"info",children:`Your theme switches to ${t.theme.name}.`}):null,t.changes.warnings.map(f=>a(L,{tone:"warning",children:f},f))]})}function Kc(e){let[t,n]=h(null),[i,o]=h(null),[r,s]=h(""),[c,l]=h(""),[u,d]=h(!1),[f,y]=h(!1),[S,k]=h(null),[x,g]=h(null),b=H(0),[E,A]=h(e.token);E!==e.token&&(A(e.token),n(null),o(null),g(null));let P=t!==null&&t.code===null&&!e.hasHandle,v=P&&u?Bi(c):null,N=i?i.items.filter(U=>!i.leftOut.has(U.key)):[];async function C(U){var Ke,rt;let $=++b.current;n({code:U}),s((Ke=U==null?void 0:U.name)!=null?Ke:""),l((rt=e.suggestedHandle)!=null?rt:""),d(!1),o(null),k(null),g(null);try{let ce=await we(),vt=await Ps(te(ce),ce);$===b.current&&o(m({keys:ce},vt))}catch(ce){if($!==b.current)return;n(null),k(ce instanceof Error?ce.message:String(ce))}}function _(){b.current+=1,n(null),o(null)}function Z(){n(null),o(null)}async function ae(){if(!t||!i)return;if(P&&Bi(c)){d(!0);return}y(!0),k(null);let U=Ts(i.keys,N);try{let $=t.code?await Os(t.code.code,r.trim(),U):await Ls(r.trim(),U,P?c.trim():void 0);g(w(m({},$),{outcome:t.code?"updated":"created"})),Z(),await e.reload()}catch($){if($ instanceof B&&$.code==="same_setup"&&$.share){g(w(m({},$.share),{leftOut:0,outcome:"existing"})),Z();return}e.fail($,k),$ instanceof B&&$.code==="publish_failed"&&(n(null),e.reload())}finally{y(!1)}}return{compose:t,draft:i,included:N,name:r,setName:s,askHandle:P,handle:c,setHandle:U=>l(U.replace(/^@/,"")),checkHandle:()=>d(!0),handleError:v,saving:f,error:S,saved:x,dismissSaved:()=>g(null),forgetSaved:U=>g($=>($==null?void 0:$.code)===U?null:$),start:C,cancel:_,save:ae}}function zc(e){var v;let[t,n]=h(null),[i,o]=h(null),[r,s]=h(null),[c,l]=h(null),[u,d]=h(0),f=H(!1),[y,S]=h(null),[k,x]=h(!1);function g(N,C){C(zt(N,i)),N instanceof B&&N.code==="signed_out"&&e.onSignedOut()}async function b(){var N,C;S(null);try{let _=await _n();n(_.codes),f.current||(f.current=!0,d(_.newHearts)),e.onCodeCount(_.codes.length),o(_.max),s(_.profile),e.onHandle((C=(N=_.profile)==null?void 0:N.handle)!=null?C:null),l(_.suggestedHandle)}catch(_){g(_,S)}}async function E(N){x(!0),S(null);try{return await Ds(N),await b(),!0}catch(C){return g(C,S),!1}finally{x(!1)}}let A=Te(N=>{n(null),f.current=!1,N&&b()}),P=(v=e.session)==null?void 0:v.token;return T(()=>A.current(P!==void 0),[A,P]),{codes:t,max:i,atMax:t!==null&&i!==null&&t.length>=i,profile:r,suggestedHandle:c,newHearts:u,error:y,deleting:k,load:b,remove:E,fail:g}}function Fc(e){let[t,n]=h(""),[i,o]=h(null),[r,s]=h(null),[c,l]=h(null),[u,d]=h(null),[f,y]=h("add"),[S,k]=h(()=>new Set),[x,g]=h(null),[b,E]=h(void 0),[A,P]=h(!1),v=J(()=>u?As(u.file,u.items,e.localItems,e.localConfig,e.localTheme,f):null,[u,e.localItems,e.localConfig,e.localTheme,f]),N=J(()=>{if(!v||!u)return null;let j=new Set(u.items.map(D=>D.key));return v.items.filter(D=>D.change!=="removed"&&j.has(D.key)&&(f==="replace"||D.isNew))},[v,u,f]),C=J(()=>N?dt(N):null,[N]),_=x&&x.for===N?x.checks:null,Z=J(()=>new Map([..._!=null?_:[],...C!=null?C:[]]),[_,C]),ae=J(()=>v&&b!==void 0?_s(v,b):new Set,[v,b]),U=J(()=>{var j;return new Set(((j=v==null?void 0:v.items)!=null?j:[]).filter(D=>{var ee;return D.change!=="removed"&&D.isNew&&(ut(Z.get(D.key))||((ee=Z.get(D.key))==null?void 0:ee.kind)==="unchecked")}).map(D=>D.key))},[v,Z]),$=J(()=>v?oi(v,Z,{optional:U,allowed:S,fixed:ae,verb:"Load"}):null,[v,Z,U,S,ae]),Ke=v!=null&&v.theme&&!ae.has(v.theme.key)&&(!U.has(v.theme.key)||S.has(v.theme.key))?v.theme:null,rt=v!==null&&(_===null||b===void 0);T(()=>{if(!N||!C)return;let j=!0;return ft(N,C).then(D=>{j&&g({for:N,checks:D})}),()=>{j=!1}},[N,C]);async function ce(j){let D=j!=null?j:Es(t);if(s(null),l(null),d(null),!D){s(zt(new B("no_code")));return}o({code:D,pick:j!==void 0});try{let ee=await Us(D);y("add"),k(new Set),d({file:ee,items:te(ee.keys),pick:j!==void 0}),Mi().then(E)}catch(ee){s(zt(ee))}finally{o(null)}}function vt(j,D){let ee=new Set(S);D?ee.add(j):ee.delete(j),k(ee)}async function ui(){if(!u||!v)return;P(!0),l(null);let j=[...new Set([...U,...ae])].filter(D=>ae.has(D)||!S.has(D));try{await na(e.config,u.file,f,j,b!=null?b:null,u.pick),Spicetify.showNotification("Syncify: setup loaded. Reloading\u2026"),Qt(v.manual,"share"),setTimeout(()=>window.location.reload(),1e3)}catch(D){P(!1),l(Vy(D))}}return{input:t,setInput:n,fetching:i,error:r,applyError:c,shared:u,close:()=>{d(null),l(null)},mode:f,setMode:y,changes:$,theme:Ke,checking:rt,applying:A,open:ce,allow:vt,apply:ui}}function Vy(e){if(e instanceof Vt){let t=e.reason instanceof ye?"Sign in to back up.":e.reason instanceof Error?e.reason.message:String(e.reason);return`${e.message} ${t}`}return e instanceof Error?e.message:String(e)}async function ai(e){var t;try{return await navigator.clipboard.writeText(e),!0}catch(n){let i=(t=Spicetify.Platform)==null?void 0:t.ClipboardAPI;return i!=null&&i.copy?(await i.copy(e),!0):!1}}var qy=2e3;function jc(e){let{codes:t,compose:n}=e,[i,o]=h(null),[r,s]=h(null);T(()=>{if(!r)return;let d=setTimeout(()=>s(null),qy);return()=>clearTimeout(d)},[r]);async function c(d,f){await ai(d)&&s(f)}async function l(){i&&await t.remove(i.code)&&(n.forgetSaved(i.code),o(null))}let u=t.codes;return p("section",{className:"syncify-share-part","aria-label":"Your codes",children:[a(ie,{title:p(M,{children:["Your codes",t.newHearts>0?a("span",{className:"syncify-share-hearts",children:tt(t.newHearts,"new heart")}):null]}),end:u&&t.max!==null?a(co,{used:u.length,max:t.max,label:"Share codes"}):void 0}),t.error?a(L,{tone:"error",actions:a(I,{variant:"text",onClick:()=>{t.load()},children:"Try again"}),children:t.error}):null,n.saved?a(Gy,{saved:n.saved,copied:r,onCopy:(d,f)=>{c(d,f)},discoverOpen:e.discoverOpen,onDismiss:n.dismissSaved}):null,n.error&&!n.compose?a(L,{tone:"error",children:n.error}):null,u===null?t.error?null:a(V,{label:"Loading your codes",children:a(Ce,{})}):u.length>0?a(V,{label:"Your codes",children:u.map(d=>a(z,{name:wt(d),meta:a(F,{parts:[d.name?a("code",{className:"syncify-share-code",children:Ee(d.code)}):null,...Bc(d)]}),end:p("span",{className:"syncify-share-code-actions",children:[a(I,{variant:"text",onClick:()=>{c(Ee(d.code),`code:${d.code}`)},children:r===`code:${d.code}`?"Copied":"Copy"}),d.link?a(I,{variant:"text",onClick:()=>{var f;c((f=d.link)!=null?f:"",`link:${d.code}`)},children:r===`link:${d.code}`?"Copied":"Get link"}):null,a(ve,{trigger:"more",label:`More for ${wt(d)}`,disabled:n.compose!==null||t.deleting,items:[{label:"Update",onSelect:()=>{n.start(d)}},...e.discoverOpen&&!d.posted?[{label:"Post to Discover",onSelect:()=>X(rn(d.code))}]:[],{label:"Delete",danger:!0,onSelect:()=>o(d)}]})]})},d.code))}):null,u!==null?a("div",{className:"syncify-share-create",children:a(I,{variant:"secondary",onClick:()=>{n.start(null)},disabled:n.compose!==null||t.atMax||e.marketplaceAvailable===!1,children:"Create a code"})}):null,a(en,{open:i!==null,onClose:()=>o(null),title:i?`Delete ${wt(i)}`:"",actions:p(M,{children:[a(I,{variant:"secondary",onClick:()=>o(null),disabled:t.deleting,children:"Keep it"}),a(I,{variant:"danger",onClick:()=>{l()},disabled:t.deleting,children:t.deleting?"Deleting\u2026":"Delete code"})]}),children:i?Oc(i):null})]})}function Gy(e){let{saved:t}=e,n=Ee(t.code),i=t.link,o=t.outcome==="existing"?"You shared this setup already as":t.outcome==="updated"?"Code updated:":"Your code is ready:";return p(L,{tone:"info",live:!0,actions:p(M,{children:[a(I,{variant:"text",onClick:()=>e.onCopy(n,"saved-code"),children:e.copied==="saved-code"?"Copied":"Copy"}),i?a(I,{variant:"text",onClick:()=>e.onCopy(i,"saved-link"),children:e.copied==="saved-link"?"Copied":"Get link"}):null,t.outcome==="created"&&e.discoverOpen?a(I,{variant:"text",onClick:()=>X(rn(t.code)),children:"Post to Discover"}):null,a(I,{variant:"subtle",onClick:e.onDismiss,children:"Dismiss"})]}),children:[p("span",{children:[o," ",a("code",{className:"syncify-share-code",children:n})]}),t.leftOut>0?a("span",{className:"syncify-share-left-out",children:t.leftOut===1?"1 snippet isn't in Marketplace's list anymore, so it was left out.":`${t.leftOut} snippets aren't in Marketplace's list anymore, so they were left out.`}):null]})}function Wc(e){let{session:t}=e,n=Fc(e),i=zc(e),o=Kc({token:t==null?void 0:t.token,hasHandle:i.profile!==null,suggestedHandle:i.suggestedHandle,reload:i.load,fail:i.fail}),[r,s]=h(null);if(T(()=>{$s().then(s)},[]),n.shared)return a(Hc,{idBase:e.idBase,load:n,marketplaceAvailable:e.marketplaceAvailable,busy:e.busy});if(o.compose)return a(Uc,{idBase:e.idBase,compose:o});let c=n.input.trim();return p(G,{idBase:e.idBase,id:"share",children:[a("form",{className:"syncify-share-part",noValidate:!0,onSubmit:l=>{l.preventDefault(),!n.fetching&&c&&n.open()},children:a(Be,{label:"Load a setup",value:n.input,onChange:n.setInput,placeholder:"Paste a code or a link",error:n.error,action:a(I,{variant:"secondary",type:"submit",disabled:n.fetching!==null||!c,children:n.fetching&&!n.fetching.pick?"Loading\u2026":"Load"})})}),r?p("section",{className:"syncify-share-part","aria-label":r.length>0?"Syncify picks":"Discover",children:[r.length>0?a(ie,{title:"Syncify picks"}):null,p(V,{children:[r.map(l=>{var u;return a(z,{name:l.name,meta:a(F,{parts:[a("span",{className:"syncify-share-pips",children:Dc(l).map((d,f)=>a(se,{kind:d},f))},"pips"),((u=n.fetching)==null?void 0:u.code)===l.code?"Loading\u2026":tt(l.extensions+l.themes+l.snippets,"item")]}),onOpen:()=>{n.open(l.code)},openLabel:`Preview ${l.name}`,disabled:n.fetching!==null},l.code)}),a(z,{name:"Find more setups on Discover",end:a(I,{variant:"secondary",size:"small",onClick:()=>X(rn()),children:"Open"})})]})]}):null,t===void 0?null:t===null?a("div",{className:"syncify-share-part",children:a(oe,{label:"Sign in to share this setup as a code",children:a(I,{variant:"secondary",onClick:e.onSignIn,children:"Sign in"})})}):a(jc,{codes:i,compose:o,discoverOpen:r!==null,marketplaceAvailable:e.marketplaceAvailable})]})}var po="syncify:share-code-count",go="syncify:handle";function Jy(){var t,n;let e=Number((n=(t=Spicetify.LocalStorage)==null?void 0:t.get(po))!=null?n:NaN);return Number.isInteger(e)&&e>=0?e:null}function Xy(){var t;let e=(t=Spicetify.LocalStorage)==null?void 0:t.get(go);return e==null?void 0:e||null}function Yc(){let[e,t]=h(()=>Jy()),[n,i]=h(()=>Xy()),o=le(c=>{var l,u;c===null?(l=Spicetify.LocalStorage)==null||l.remove(po):(u=Spicetify.LocalStorage)==null||u.set(po,String(c)),t(c)},[]),r=le(c=>{var l,u;c===void 0?(l=Spicetify.LocalStorage)==null||l.remove(go):(u=Spicetify.LocalStorage)==null||u.set(go,c!=null?c:""),i(c)},[]),s=le(()=>{o(null),r(void 0)},[o,r]);return{codeCount:e,handle:n,saveCodeCount:o,saveHandle:r,forget:s}}var Zy=2e3;function Vc(e){let{install:t}=e,n=!t||t.trusted?null:t.refused?"This Spotify account refused backups from this install. Sign in to back up from it.":"This install isn't approved yet. Its backups are kept apart until you approve it from another install or sign in.";return p(M,{children:[e.nudge?a(L,{tone:"warning",actions:p(M,{children:[a(I,{variant:"subtle",size:"small",onClick:e.onHideNudge,disabled:e.securing,children:"Not now"}),a(I,{size:"small",onClick:e.onSecure,disabled:e.securing,children:e.securing?"Securing\u2026":"Secure"})]}),children:"Your backup isn't secured. Anyone who knows your Spotify username can restore it."}):null,n?a(L,{tone:"info",children:n}):null,e.restoreResult?a(Qy,{manual:e.restoreResult.manual}):null]})}function Qy(e){let[t,n]=h(!1),i=za(e.manual).join(`
`);if(T(()=>{if(!t)return;let r=setTimeout(()=>n(!1),Zy);return()=>clearTimeout(r)},[t]),!i)return null;let o=e.manual.length;return p(L,{tone:"info",actions:p(M,{children:[a(I,{variant:"text",onClick:()=>{ai(i).then(n)},children:t?"Copied":"Copy"}),a(I,{variant:"subtle",onClick:Ua,children:"Dismiss"})]}),children:[o===1?"1 isn't from Marketplace. Add it in a terminal:":`${o} aren't from Marketplace. Add them in a terminal:`,a("pre",{className:"syncify-commands",children:a("code",{children:i})})]})}function qc(e){let{message:t}=e;return a(L,{tone:t.kind,actions:p(M,{children:[t.kind==="error"?a(I,{variant:"text",onClick:e.onTryAgain,disabled:e.busy,children:"Try again"}):null,a(I,{variant:"subtle",onClick:e.onDismiss,children:"Dismiss"})]}),children:t.text})}function Gc(e){let t=em(e);return t.backedUp&&e.latest?w(m({},t),{line:[`Backed up ${bt(e.latest.metadata.last_sync_datetime)}`,`${et(e.localItemCount)} on this device`]}):w(m({},t),{line:[t.title,...t.detail]})}function em(e){let t={backedUp:!1,supportAsk:null},n=`${et(e.localItemCount)} on this device`;return e.restoreResult&&!e.unsupported?tm(e.restoreResult):e.unsupported?w(m({},t),{title:"Update Syncify to keep backing up",detail:["Your backups are safe"],action:"how-to-update"}):e.locked?w(m({},t),{title:"Sign in to restore",detail:[e.locked==="not_owner"?"Secured by another account":"This backup is secured"],action:"sign-in"}):e.activity==="backing-up"?w(m({},t),{title:"Backing up\u2026",detail:[],action:"back-up"}):e.checked?e.latest?e.localHash&&!e.backedUp?w(m({},t),{title:"Changes since your last backup",detail:nm(e.latest,e.latestItems,e.localItems,e.localConfig),action:"back-up"}):w(m({},t),{title:"Everything is backed up",detail:[`Last backup ${bt(e.latest.metadata.last_sync_datetime)}`,n],action:null,backedUp:!0}):w(m({},t),{title:"No backup yet",detail:["Save your extensions and themes to restore them after a reinstall or on another computer."],action:"back-up"}):e.checkError?w(m({},t),{title:"Couldn't check your backup",detail:[e.checkError],action:"try-again"}):w(m({},t),{title:"Checking your backup\u2026",detail:[],action:null})}function tm(e){let t=e.loaded===e.total,n=e.kind==="share";return{title:t?n?"Setup loaded":"Backup restored":`${n?"Loaded":"Restored"} ${e.loaded} of ${e.total}`,detail:[t?e.total===0?"Nothing from Marketplace to load":`${e.loaded} of ${e.total} loaded`:"Missing something? Reload Spotify once more."],action:t?null:"reload",backedUp:!1,supportAsk:t?n?"Syncify set it up for you?":"Syncify saved your setup?":null}}function nm(e,t,n,i){var f;let o=new Set(t),r=new Set(n),s=n.filter(y=>!o.has(y)).length,c=t.filter(y=>!r.has(y)).length,l=(f=e.spicetify_config)!=null?f:null,u=!!(i&&!l),d=!u&&(i&&l?!os(i,l):i!==l);return[s?`${s} added`:null,c?`${c} removed`:null,d?"Spicetify config changed":null,u?"Spicetify config not saved yet":null,`Last backup ${bt(e.metadata.last_sync_datetime)}`].filter(y=>y!==null)}function Jc(e,t){return(e==null?void 0:e.status)==="pending"&&!e.mine?w(m({kind:"claim"},Qn(e)),{canAnswer:!e.not_me}):t?{kind:"install",title:ti(t),install:t}:null}var im=3,ho={exists:!1,payload:null,backups:[],safetyCopy:null,claim:null,unapproved:[],install:null,nudge:!1},it=null;function Xc(e){var d,f,y;let[t,n]=h(()=>it),[i,o]=h(void 0),r=le(S=>{it=S,n(S)},[]),s=le(async()=>{let S,k=null;try{S=await Xe(e)}catch(E){if(!(E instanceof ye))throw E;S=ho,k=E.code}let x=await re().catch(()=>null),g=x?await ia(e).catch(()=>null):null,b=x?await re().catch(()=>null):null;return r({remote:S,lockedBy:k,claims:b?g:null}),o(b),k},[e,r]),c=le(()=>{re().catch(()=>null).then(S=>o(k=>k!=null?k:S))},[]),l=le(S=>{var g;let k=it!=null?it:{remote:ho,lockedBy:null,claims:null},{remote:x}=k;r(w(m({},k),{remote:w(m({},x),{exists:!0,payload:S,backups:[S,...x.backups.filter(b=>b.payload_hash!==S.payload_hash)].slice(0,im),safetyCopy:((g=x.safetyCopy)==null?void 0:g.payload_hash)===S.payload_hash?null:x.safetyCopy})}))},[r]),u=le(()=>{o(null),it&&r(w(m({},it),{claims:null}))},[r]);return{check:t,remote:(d=t==null?void 0:t.remote)!=null?d:ho,lockedBy:(f=t==null?void 0:t.lockedBy)!=null?f:null,claims:(y=t==null?void 0:t.claims)!=null?y:null,session:i,setSession:o,refresh:s,readSession:c,addBackup:l,forgetClaims:u}}function Zc(){let[e,t]=h(null),[n,i]=h(!1),o=le(async()=>{try{let r=await Nn();return t(r),i(!1),r}catch(r){throw i(!0),r}},[]);return{local:e,localFailed:n,refreshLocal:o}}var om=600*1e3;function Qc(){let[e,t]=h(null);return T(()=>{let n=O();if(!Qi(n.version))return;let i=!0;return Xa(n.releasesUrl).then(o=>{i&&o&&eo(o,n.version)>0&&t(o)}),()=>{i=!1}},[]),e}function el(){let[e,t]=h(()=>Oa()),[n]=h(()=>Date.now());return T(()=>Da(t),[]),{result:e,recent:!!(e&&n-e.at<om)}}function tl(e){let t=O(),n=[["Report an issue",t.issueUrl],["GitHub",t.githubUrl],["Discord",t.discordUrl],["Support on Ko-fi",t.kofiUrl],["Privacy",`${t.webUrl}/privacy`],["Terms",`${t.webUrl}/terms`]];return p("footer",{className:"syncify-window-footer",children:[p("span",{className:"syncify-window-footer-version",children:[p("span",{children:["Syncify ",t.version]}),e.newerVersion?a(I,{variant:"text",size:"tiny",className:"syncify-window-update",onClick:()=>e.loadedByLoader?window.location.reload():X(`${t.githubUrl}#updating`),children:a(F,{parts:[`${e.newerVersion} is out`,e.loadedByLoader?"Reload":"How to update"]})}):null]}),a("span",{className:"syncify-window-footer-links",children:n.map(([i,o])=>a(I,{variant:"subtle",size:"tiny",onClick:()=>X(o),children:i},i))})]})}var rm={"back-up":"Back up now","try-again":"Try again","sign-in":"Sign in","how-to-update":"How to update",reload:"Reload"};function nl(e){let{status:t,alert:n}=e,i=t.action,o=i?a(I,{variant:i==="back-up"||i==="sign-in"?"primary":"secondary",size:n?"small":"regular",onClick:()=>e.onAction(i),disabled:e.busy,children:i==="back-up"&&e.backingUp?"Backing up\u2026":rm[i]}):null;return n?p("section",{className:"syncify-status","aria-label":"Status",children:[p("div",{className:"syncify-status-alert",role:"alert",children:[a("span",{className:"syncify-status-alert-mark",children:a(ke,{tone:"warning",icon:a(ro,{})})}),p("div",{className:"syncify-status-text",children:[a("h2",{className:"syncify-status-title",children:n.title}),n.kind==="claim"&&n.text?a("p",{className:"syncify-status-sentence",children:n.text}):null]}),n.kind==="claim"?n.canAnswer?a(I,{variant:"secondary",onClick:e.onNotMe,disabled:e.answering,children:"Not me"}):null:p("span",{className:"syncify-status-answers",children:[a(I,{variant:"secondary",onClick:()=>e.onAnswerInstall("reject"),disabled:e.answering,children:"Not mine"}),a(I,{onClick:()=>e.onAnswerInstall("approve"),disabled:e.answering,children:"Approve"})]})]}),p("div",{className:"syncify-status-line","aria-live":"polite",children:[t.backedUp?a(Oe,{className:"syncify-status-check"}):null,a(F,{parts:t.line}),o]})]}):a("section",{className:"syncify-status","aria-label":"Status",children:p("div",{className:"syncify-status-main","aria-live":"polite",children:[p("div",{className:"syncify-status-text",children:[a("h2",{className:"syncify-status-title",children:t.title}),t.detail.length>0?a(F,{parts:t.detail}):null,t.supportAsk?p("p",{className:"syncify-status-ask",children:[a("span",{children:t.supportAsk}),a(I,{variant:"text",onClick:e.onSupport,children:"Support it on Ko-fi"})]}):null]}),o]})})}function il(e){let{codeCount:t,account:n,newerVersion:i}=e,o=[{id:"backups",label:"Backups"},{id:"share",label:"Share",status:t?a(ao,{count:t,label:tt(t,"code")}):void 0},{id:"account",label:"Account",status:n?n.kind==="ok"?a("span",{className:"syncify-tab-check",role:"img","aria-label":n.label,children:a(Oe,{})}):a(ke,{tone:"warning",label:n.label}):void 0},{id:"settings",label:"Settings",status:e.settingsHeld?a(ke,{tone:"warning",label:"An item's extension settings aren't syncing"}):i?a(ke,{tone:"info",label:`Syncify ${i} is out`}):void 0}];return a(uo,{tabs:o,selected:e.selected,onSelect:e.onSelect,idBase:e.idBase,label:"Syncify"})}var ol=!1;function ci(e){var Ro,Eo,No,Po,To,Ao,_o,Mo,Lo,Bo,Oo,Do,Uo;let t=K("syncify"),n=O(),[i,o]=h(()=>Y()),{local:r,localFailed:s,refreshLocal:c}=Zc(),l=Xc(i),u=Yc(),d=Qc(),f=el(),y=Lc(),[S,k]=h(()=>!ol),[x]=h(()=>Ja()!==null),[g,b]=h((Ro=e.tab)!=null?Ro:"backups"),[E,A]=h(()=>l.check?"idle":"checking"),[P,v]=h(null),[N,C]=h(null),[_,Z]=h(!1),[ae,U]=h(!1),[$,Ke]=h(!1),[rt,ce]=h(null),[vt,ui]=h(()=>aa()),[j,D]=h(e.secure===!0),ee=H(!1),{remote:Q,lockedBy:ge,claims:ze,session:de}=l,xt=E!=="idle",di=(Eo=r==null?void 0:r.hash)!=null?Eo:null,yl=((No=Q.claim)==null?void 0:No.status)==="pending"&&!Q.claim.mine?Q.claim:null,Fe=cc(ze,ge,yl!==null),wo=de!=null&&Fe.kind==="secured",sn=wo&&i.settingsSyncEnabled,ko=sn&&y.arrived&&!y.arrived.hidden?y.arrived:null,ml=sn&&nt(y,i.settingsSyncOff).length>0,pl=!!(di&&Q.backups.some(R=>R.payload_hash===di)),vo=Gc({activity:E,checked:l.check!==null,checkError:P,unsupported:_,locked:ge,latest:Q.payload,latestItems:Q.payload?St(Q.payload).map(R=>R.key):[],backedUp:pl,localHash:di,localItems:(Po=r==null?void 0:r.installedItems)!=null?Po:[],localItemCount:(To=r==null?void 0:r.installedItemCount)!=null?To:0,localConfig:(Ao=r==null?void 0:r.spicetifyConfig)!=null?Ao:null,restoreResult:f.recent?f.result:null}),gl=Jc(Q.claim,(Mo=(_o=Q.install)==null?void 0:_o.waiting[0])!=null?Mo:null),hl=!vt&&!ge&&Q.payload!==null&&g!=="account"&&(de?Fe.kind==="open":de===null&&Q.nudge),Sl=(de?(Lo=ze==null?void 0:ze.accounts)!=null?Lo:[]:[]).filter(R=>R.status==="final").map((R,W)=>({hash:R.hash,label:`Spotify account ${W+1}${R.device_info?` from ${R.device_info}`:""}`})).filter(R=>R.hash!==(ze==null?void 0:ze.hash));async function he(R={}){try{(!R.silent||!l.check)&&A("checking"),R.silent||(C(null),v(null)),await c(),await l.refresh()&&b("account"),v(null),A("idle")}catch(W){Ct(W)}}function Ct(R){if(A("idle"),R instanceof _t){Z(!0),C(null);return}if(R instanceof Ve){C({kind:"error",text:R.message}),he({silent:!0});return}if(R instanceof ye&&R.code!=="not_linked"){C(null),he({silent:!0});return}let W=R instanceof Error?R.message:String(R);l.check?C({kind:"error",text:W}):v(W),Spicetify.showNotification(W,!0,6e3)}async function bl(){try{A("backing-up"),C(null);let R=await Jt(i).catch(()=>null),{payload:W,unchanged:je,unapproved:fi,settings:El}=await qt(i,R);if(await Yn(R,El,Q.backups).catch(()=>null),await c(),fi){await he({silent:!0}),C({kind:"warning",text:"Backed up, but kept apart until this install is approved."}),Spicetify.showNotification("Syncify: backed up, waiting for approval");return}je||l.addBackup(W),A("idle"),Spicetify.showNotification(je?"Syncify: everything is already backed up":"Syncify backup complete")}catch(R){Ct(R)}}async function wl(R){var W;try{A("restoring"),C(null),await ta(i,R.row.backup,(W=R.linkedHash)!=null?W:void 0,R.skipped,R.settings),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),Qt(R.manual),setTimeout(()=>window.location.reload(),1e3)}catch(je){Ct(je)}}async function kl(R){var je;let W=(je=Q.install)==null?void 0:je.waiting[0];if(W){U(!0);try{await Un(i,W.id,R),Spicetify.showNotification(R==="approve"?"Syncify: install approved":"Syncify: install refused"),await he({silent:!0})}catch(fi){Ct(fi)}finally{U(!1)}}}async function vl(){U(!0);try{Spicetify.showNotification(ei(await $n(i))),await he({silent:!0})}catch(R){C({kind:"error",text:R instanceof Error?R.message:String(R)})}finally{U(!1)}}async function It(){Ke(!0),ce(null);try{await oa(i)}catch(R){R instanceof $e&&["claim_pending","claimed"].includes(R.code)||ce(R instanceof Error?R.message:String(R))}finally{await he({silent:!0}),Ke(!1)}}function xl(){de?It():b("account")}function Cl(){D(!0),de?It():b("account")}function Il(R){l.setSession(R),ee.current=!0,!ge&&Q.payload?It():he({silent:!0})}function xo(){u.forget(),l.forgetClaims(),ce(null),he({silent:!0})}function Rl(R){R==="back-up"?bl():R==="try-again"?he():R==="sign-in"?b("account"):R==="how-to-update"?X(`${n.githubUrl}#updating`):$a()}T(()=>jn(()=>o(R=>w(m({},R),{settingsSyncOff:Y().settingsSyncOff}))),[]);let Co=Te(()=>{l.readSession(),he({silent:!0})});T(()=>Co.current(),[Co]);let Io=Te(()=>{!e.secure||ee.current||$||!de||Fe.kind!=="open"||ge||(ee.current=!0,It())});return T(()=>Io.current(),[Io,de,Fe.kind,ge,$]),p("div",{className:"syncify-ui syncify-window",onClick:So,onMouseDown:So,onPointerDown:So,children:[p("div",{className:"syncify-window-top",children:[a(nl,{status:vo,alert:gl,backingUp:E==="backing-up",busy:xt||vo.action==="back-up"&&ge!==null,answering:ae,onAction:Rl,onNotMe:()=>{vl()},onAnswerInstall:R=>{kl(R)},onSupport:()=>X(n.kofiUrl)}),N?a(qc,{message:N,busy:xt,onTryAgain:()=>{he()},onDismiss:()=>C(null)}):null,ko?a(L,{tone:"info",actions:p(M,{children:[a(I,{variant:"subtle",size:"small",onClick:ga,children:"Not now"}),a(I,{size:"small",onClick:()=>window.location.reload(),children:"Reload Spotify"})]}),children:Wn(ko.names)}):null,a(il,{idBase:t,selected:g,onSelect:b,codeCount:de?u.codeCount:null,account:lc(de,ge,Fe),newerVersion:d,settingsHeld:ml})]}),g==="backups"?a(kc,{idBase:t,config:i,remote:l.check?Q:null,failed:P!==null||s,lockedBy:ge,local:r,otherAccounts:Sl,notices:a(Vc,{nudge:hl,securing:$,onSecure:Cl,onHideNudge:()=>{ca(),ui(!0)},install:ge||Fe.kind==="secured"?null:Q.install,restoreResult:f.result}),canShareSettings:sn,shareSettings:i.shareRestoredSettings,onShareSettingsChange:R=>{let W=w(m({},i),{shareRestoredSettings:R});Je(W),o(W)},busy:xt,restoring:E==="restoring",onRestore:R=>{wl(R)},onError:Ct}):g==="share"?a(Wc,{idBase:t,config:i,session:de,localItems:(Bo=r==null?void 0:r.items)!=null?Bo:[],localConfig:(Oo=r==null?void 0:r.spicetifyConfig)!=null?Oo:null,localTheme:(Do=r==null?void 0:r.activeTheme)!=null?Do:null,marketplaceAvailable:(Uo=r==null?void 0:r.marketplaceAvailable)!=null?Uo:null,busy:xt,onSignIn:()=>b("account"),onSignedOut:xo,onCodeCount:u.saveCodeCount,onHandle:u.saveHandle}):g==="account"?a(yc,{idBase:t,session:de,locked:ge,secure:Fe,securing:$,secureError:rt,onSecure:()=>{It()},nudge:j,onSignedIn:Il,onSignedOut:xo,handle:u.handle,onHandle:u.saveHandle}):a(Mc,{idBase:t,config:i,onConfigChange:o,busy:xt,unsupported:_,syncStatus:y,secured:wo,securing:$,onSecure:xl}),sn&&y.choices.length>0?a(vc,{choices:y.choices,open:S,onClose:()=>{ol=!0,k(!1)}}):null,a(tl,{newerVersion:d,loadedByLoader:x})]})}function So(e){e.stopPropagation()}var rl=`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="-2.5 -2.5 37 37" aria-hidden="true" focusable="false"><defs><mask id="syncify-mark-gap" maskUnits="userSpaceOnUse" x="-2" y="-2" width="36" height="36"><rect x="-2" y="-2" width="36" height="36" fill="#fff"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></mask></defs><g mask="url(#syncify-mark-gap)"><g transform="rotate(15 16 16)"><path d="M16 16L16 7.4A8.6 8.6 0 0 1 24.6 16Z" fill="#6cd1d1" transform="translate(0.42 -0.42)"/><path d="M16 16L24.6 16A8.6 8.6 0 0 1 16 24.6Z" fill="#efa4c1" transform="translate(0.42 0.42)"/><path d="M16 16L16 24.6A8.6 8.6 0 0 1 7.4 16Z" fill="#d3c48c" transform="translate(-0.42 0.42)"/><path d="M16 16L7.4 16A8.6 8.6 0 0 1 16 7.4Z" fill="#88bcf2" transform="translate(-0.42 -0.42)"/></g></g><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 28.03A12.4 12.4 0 1 1 28.03 19"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91"/></g></svg>
`;var Ae=null;function ot(){return!!(Ae!=null&&Ae.container.isConnected)}function kt(){Spicetify.PopupModal.hide()}function He(e){sl(Ae);let t=document.createElement("div");Ae={container:t,root:null,watch:null};try{Spicetify.PopupModal.display({title:O().extensionName,content:t,isLarge:!1})}catch(n){throw ue("Failed to open PopupModal",n),n}cm(t),um(t,e),am(t)}function am(e){let t=Ae;if((t==null?void 0:t.container)!==e||typeof MutationObserver!="function")return;let n=new MutationObserver(()=>{e.isConnected||sl(t)});n.observe(document.body,{childList:!0,subtree:!0}),t.watch=n}function sl(e){var t,n;e&&((t=e.watch)==null||t.disconnect(),e.watch=null,(n=e.root)==null||n.unmount(),e.root=null)}function cm(e){requestAnimationFrame(()=>{let t=lm(e);t==null||t.classList.add("syncify-modal-shell");let n=t==null?void 0:t.querySelector(".main-trackCreditsModal-header h1");if(n&&!n.querySelector(".syncify-modal-mark")){let o=document.createElement("span");o.className="syncify-modal-mark",o.innerHTML=rl,n.prepend(o)}let i=t==null?void 0:t.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');i&&(i.classList.add("syncify-modal-close"),i.setAttribute("aria-label",`Close ${O().extensionName}`),i.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function lm(e){let t=e.parentElement;for(;t&&t!==document.body;){if(t.querySelector(".main-trackCreditsModal-header"))return t;t=t.parentElement}return e.closest('[class*="trackCreditsModal"]')}function um(e,t){try{if(typeof Spicetify.ReactDOM.createRoot=="function"){let n=Spicetify.ReactDOM.createRoot(e);n.render(t),(Ae==null?void 0:Ae.container)===e&&(Ae.root=n),ne("Window rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(t,e),ne("Window rendered",{renderer:"render"})}catch(n){throw ue("Failed to render window",n),n}}function li(e){return a("div",{className:"syncify-ui syncify-launch-notice",children:p(Gn,{title:e.title,actions:e.actions,children:[e.children?a("p",{children:e.children}):null,e.error?a(L,{tone:"error",children:e.error}):null]})})}function al(){let[e,t]=h(!1),[n,i]=h(null);async function o(r){t(!0),i(null);try{await r()}catch(s){i(s instanceof Error?s.message:String(s)),t(!1)}}return{busy:e,error:n,run:o}}function cl(e){let{title:t,text:n}=Qn(e.claim),i=al();return a(li,{title:t,error:i.error,actions:p(M,{children:[a(I,{variant:"secondary",onClick:e.onClose,disabled:i.busy,children:"Close"}),a(I,{onClick:()=>{i.run(async()=>{Spicetify.showNotification(ei(await $n(Y()))),e.onClose()})},disabled:i.busy,children:"Not me"})]}),children:n})}function ll(e){return a(li,{title:ac(e.claim),actions:a(I,{onClick:e.onClose,children:"Close"})})}function ul(e){let t=al(),n=i=>{t.run(async()=>{await Un(Y(),e.install.id,i),Spicetify.showNotification(i==="approve"?"Syncify: install approved":"Syncify: install refused"),e.onDone()})};return a(li,{title:ti(e.install),error:t.error,actions:p(M,{children:[a(I,{variant:"secondary",onClick:()=>n("reject"),disabled:t.busy,children:"Not mine"}),a(I,{onClick:()=>n("approve"),disabled:t.busy,children:"Approve"})]}),children:"Approve it if it's yours."})}function dl(e){return a(li,{title:"Your backup isn't secured",actions:p(M,{children:[a(I,{variant:"secondary",onClick:e.onClose,children:"Not now"}),a(I,{onClick:t=>{t.stopPropagation(),e.onSecure()},children:"Secure"})]}),children:"Anyone who knows your Spotify username can restore it."})}function dm(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var fl="syncify-styles";function fm(){if(document.getElementById(fl)){ne("Another copy of Syncify is running; stopping this one");return}zo(Spicetify.React),ym();let e=Y();Qs({topbarButton:Ya(bo),menuItem:qa(bo)}),On(e.entryPoint),Hi(e.shortcut,bo),Pa({onClaim:mm,onUndone:pm,onInstall:gm,onNudge:hm,onFirstSync:Sm}).catch(t=>{ue("Startup sync check failed",t)}),Ka().catch(t=>{ue("Restore check failed",t)})}function ym(){let e=document.createElement("style");e.id=fl,e.textContent=Sr,document.head.appendChild(e)}function bo(){if(ot()){kt();return}He(a(ci,{}))}function mm(e){ot()||(ne("Opening claim notice"),He(a(cl,{claim:e,onClose:kt})))}function pm(e){return ot()?!1:(ne("Opening undone claim notice"),He(a(ll,{claim:e,onClose:kt})),!0)}function gm(e){ot()||(ne("Opening install notice"),He(a(ul,{install:e,onDone:kt})))}function hm(){ot()||(ne("Opening nudge notice"),ua(),He(a(dl,{onSecure:()=>He(a(ci,{tab:"account",secure:!0})),onClose:kt})))}function Sm(){ot()||(ne("Opening first sync"),He(a(ci,{tab:"settings"})))}Ha();(function e(){if(!dm()){setTimeout(e,100);return}ne("Spicetify APIs ready"),fm()})();})();
