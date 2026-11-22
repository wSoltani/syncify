// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var Dl=Object.defineProperty,Ul=Object.defineProperties;var $l=Object.getOwnPropertyDescriptors;var fn=Object.getOwnPropertySymbols;var Vo=Object.prototype.hasOwnProperty,qo=Object.prototype.propertyIsEnumerable;var Yo=(e,t,n)=>t in e?Dl(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,m=(e,t)=>{for(var n in t||(t={}))Vo.call(t,n)&&Yo(e,n,t[n]);if(fn)for(var n of fn(t))qo.call(t,n)&&Yo(e,n,t[n]);return e},b=(e,t)=>Ul(e,$l(t));var Se=(e,t)=>{var n={};for(var i in e)Vo.call(e,i)&&t.indexOf(i)<0&&(n[i]=e[i]);if(e!=null&&fn)for(var i of fn(e))t.indexOf(i)<0&&qo.call(e,i)&&(n[i]=e[i]);return n};var Et,B,de,A,Nt,Q,Hl,z,h;function Go(e){({createElement:Et,Fragment:B,useCallback:de,useEffect:A,useLayoutEffect:Nt,useMemo:Q,useReducer:Hl,useRef:z,useState:h}=e)}var Jo=`/* Shared values for every part. Colors come from the active Spicetify theme,
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
`;var Xo=`.syncify-icon {
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
`;var Zo=`.syncify-btn,
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
`;var Qo=`.syncify-switch-control {
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
`;var er=`.syncify-checkbox {
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
`;var tr=`/* A square ring; picked, the ring and a square inside it in the accent. */
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
`;var nr=`.syncify-setting-row {
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
`;var ir=`/* Facts on one line, wrapping between facts. Each fact is trimmed to its
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
`;var or=`.syncify-list {
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
`;var rr=`.syncify-field-group {
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
`;var sr=`.syncify-menu {
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
`;var ar=`.syncify-meter {
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
`;var cr=`.syncify-mark-square {
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
`;var lr=`.syncify-notice {
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
`;var ur=`.syncify-dialog {
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
`;var dr=`/* When the window is too narrow for every tab, the row scrolls sideways
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
`;var fr=`.syncify-pip-square {
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
`;var yr=`.syncify-section-label {
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
`;var mr=`.syncify-keycap {
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
`;var pr=`/* A bar as tall as the capitals of the text it stands in for. */
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
`;var gr=[Jo,Xo,Zo,Qo,er,tr,nr,ir,or,rr,sr,ar,cr,lr,ur,dr,fr,yr,mr,pr].join(`
`);var hr=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var Sr=`/* The window fits the height Spotify's popup leaves it, so the status and
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
`;var br=`/* The safety copy's shield and a pinned backup's pin, after their names. */
.syncify-safety-mark {
    color: var(--syncify-color-accent);
}

/* "Current", where an older backup has its chevron. */
.syncify-row-status {
    color: var(--syncify-color-accent);
    font-size: var(--syncify-text-small);
    font-weight: 700;
}
`;var wr=`/* Adds, Updates and Removes: plain colored text, not chips. */
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
`;var kr=`/* Loading a setup, the picks and your codes, split by dashed lines. */
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
`;var vr=`/* The code step's Resend and Use another email. */
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
`;var xr=`/* Turn off or Use default, then the key. */
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
`;var Cr=`/* A launch notice in Spotify's popup: the dialog layout, the popup's width. */
.syncify-launch-notice {
    width: 100%;
}
`;var Ir=[gr,hr,Sr,wr,br,kr,vr,xr,Cr].join(`
`);var pu="syncify",Ue="state";var Ge=class extends Error{constructor(){super("IndexedDB isn't available."),this.name="DatabaseUnavailableError"}};function yn(){let e;try{e=window.indexedDB}catch(t){return Promise.resolve(null)}return e?new Promise(t=>{let n;try{n=e.open(pu,1)}catch(i){t(null);return}n.onupgradeneeded=()=>{n.result.createObjectStore(Ue)},n.onerror=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}function wi(e,t,n=!1){let i=yn().then(o=>new Promise((r,s)=>{if(!o){s(new Ge);return}try{let c=o.transaction(Ue,e),l=t(c.objectStore(Ue));c.oncomplete=()=>{o.close(),r(l.result)},c.onerror=c.onabort=()=>{var u;o.close(),s((u=c.error)!=null?u:new Error("IndexedDB failed."))}}catch(c){o.close(),s(c)}}));return n?i:Promise.race([i,new Promise((o,r)=>setTimeout(()=>r(new Error("IndexedDB took too long.")),2e3))])}function be(e,t={}){return wi("readonly",n=>n.get(e),t.wait)}async function fe(e,t){await wi("readwrite",n=>n.put(t,e))}async function mn(e){await wi("readwrite",t=>t.delete(e))}var Ie={extensionName:"Syncify",version:"1.20.2",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",discordUrl:"https://syncify.wsoltani.com/discord",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com",shareUrl:"https://syncs.wsoltani.com"};function U(){var t,n,i,o,r,s,c,l,u,d;let e=window.SyncifyConfig;return{extensionName:(t=Me(e==null?void 0:e.extensionName))!=null?t:Ie.extensionName,version:(n=Rr(e==null?void 0:e.version))!=null?n:Ie.version,workerUrl:(i=Me(e==null?void 0:e.workerUrl))!=null?i:Ie.workerUrl,webUrl:(o=Me(e==null?void 0:e.webUrl))!=null?o:Ie.webUrl,githubUrl:(r=Me(e==null?void 0:e.githubUrl))!=null?r:Ie.githubUrl,kofiUrl:(s=Me(e==null?void 0:e.kofiUrl))!=null?s:Ie.kofiUrl,discordUrl:(c=Me(e==null?void 0:e.discordUrl))!=null?c:Ie.discordUrl,issueUrl:(l=Me(e==null?void 0:e.issueUrl))!=null?l:Ie.issueUrl,releasesUrl:(u=Me(e==null?void 0:e.releasesUrl))!=null?u:Ie.releasesUrl,shareUrl:(d=Me(e==null?void 0:e.shareUrl))!=null?d:Ie.shareUrl}}function Me(e){return Rr(e)}function Rr(e){return typeof e=="string"&&e.trim()?e.trim():null}var gu="x-syncify-version",hu="x-syncify-install",Su="x-syncify-timezone",ki="install-id",vi="syncify:install-id",ct=null;async function Er(){let e={[gu]:U().version,[hu]:(await pn()).id},t=ku();return t&&(e[Su]=t),e}function pn(){if(!ct){let e=bu();ct=e,e.catch(()=>{ct===e&&(ct=null)})}return ct}var Pt=null;function Nr(e){return Pt!=null||(Pt=(async()=>{if((await pn()).id!==e)return;let t=await yn();if(!t)throw new Error("IndexedDB isn't available.");let n=xi();await new Promise((i,o)=>{let r=t.transaction(Ue,"readwrite");r.objectStore(Ue).put(n,ki),r.oncomplete=()=>{t.close(),i()},r.onerror=r.onabort=()=>{var s;t.close(),o((s=r.error)!=null?s:new Error("IndexedDB failed."))}}),ct=Promise.resolve({id:n,inDatabase:!0})})().finally(()=>{Pt=null})),Pt}async function bu(){let e=await wu();if(e)return{id:e,inDatabase:!0};let t=Pr();if(t)return{id:t,inDatabase:!1};let n=xi();try{window.localStorage.setItem(vi,n)}catch(i){}return{id:n,inDatabase:!1}}async function wu(){let e=await yn();if(!e)return null;let t=await new Promise((n,i)=>{let o=null;try{let r=e.transaction(Ue,"readwrite"),s=r.objectStore(Ue),c=s.get(ki);c.onsuccess=()=>{var l;if(typeof c.result=="string"&&Tr(c.result)){o=c.result;return}o=(l=Pr())!=null?l:xi(),s.put(o,ki)},r.oncomplete=()=>{e.close(),o?n(o):i(new Error("IndexedDB failed."))},r.onerror=r.onabort=()=>{var l;e.close(),i((l=r.error)!=null?l:new Error("IndexedDB failed."))}}catch(r){e.close(),i(r)}});try{window.localStorage.removeItem(vi)}catch(n){}return t}function Pr(){try{let e=window.localStorage.getItem(vi);return e&&Tr(e)?e:null}catch(e){return null}}function xi(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t=[...e].map(n=>n.toString(16).padStart(2,"0"));return[t.slice(0,4).join(""),t.slice(4,6).join(""),t.slice(6,8).join(""),t.slice(8,10).join(""),t.slice(10).join("")].join("-")}function Tr(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(e)}function ku(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(e){return null}}var vu="syncify-signature-v1",xu={name:"ECDSA",hash:"SHA-256"};function gn(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function hn(e){return Ci(new Uint8Array(await crypto.subtle.exportKey("raw",e)))}async function Tt(e,t,n,i,o){let r=await Cu(t,n,i,o),s=await crypto.subtle.sign(xu,e,r);return Ci(new Uint8Array(s))}async function Cu(e,t,n,i){let{pathname:o,search:r}=new URL(n),s=new TextEncoder,c=Ci(new Uint8Array(await crypto.subtle.digest("SHA-256",s.encode(i))));return s.encode([vu,e,t.toUpperCase(),o+r,c].join(`
`))}function Ci(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var Ar="device-key",Ii="session",_r="salt",Je=null,At,Mr={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function lt(e){if(Je)return Je;let t=await be(Ar,{wait:!0});return Iu(t)?(Je=Promise.resolve(t),t):e?(Je=gn().then(async n=>(await fe(Ar,n),n)),Je.catch(()=>{Je=null}),Je):null}async function te(){let e=await be(Ii,{wait:!0});return Ru(e)?e:null}function Ri(e){return fe(Ii,e)}async function Xe(){await mn(Ii).catch(()=>{})}async function Sn(){if(At===void 0){let e=await be(_r).catch(()=>{});At=typeof e=="string"?e:null}return At}async function bn(e){e!==At&&(At=e,await fe(_r,e).catch(()=>{}))}function wn(){return Mr}function Br(e){Mr=e}function Iu(e){let t=e;return!!(t&&t.privateKey instanceof CryptoKey&&t.publicKey instanceof CryptoKey)}function Ru(e){let t=e;return!!(t&&typeof t.token=="string"&&t.token&&typeof t.email=="string")}var Lr="install-key",_t=null;function Or(){if(!_t){let e=Eu();_t=e,e.catch(()=>{_t===e&&(_t=null)})}return _t}async function Eu(){if(!(await pn()).inDatabase)return null;let e=await be(Lr,{wait:!0}),t=Pu(e)?e:await Nu();return{privateKey:t.privateKey,publicKey:await hn(t.publicKey)}}async function Nu(){let e=await gn();return await fe(Lr,e),e}function Pu(e){let t=e;return!!(t&&t.privateKey instanceof CryptoKey&&t.publicKey instanceof CryptoKey)}var Tu="/api/auth/email-otp/send-verification-otp",Au="/api/auth/sign-in/email-otp",_u="/api/auth/get-session",Mu="/api/auth/sign-out",Bu="/api/auth/link",Lu="x-syncify-device-key",Ou="x-syncify-signature",Dr="x-syncify-salt",Du="none",Uu={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again.",link_failed:"Couldn't open the website. Try again."},D=class extends Error{constructor(n,i=null,o=null){var r;super((r=Uu[n])!=null?r:"Sign-in failed. Try again.");this.code=n;this.retryAfter=i;this.share=o;this.name="AccountError"}};function $e(e){return e instanceof D?e.message:"Sign-in failed. Try again."}async function Ur(e,t={}){let n=await Bt(Tu,{method:"POST",body:JSON.stringify(m({email:e,type:"sign-in"},t.nudge?{nudge:!0}:{}))});return typeof(n==null?void 0:n.resend_in)=="number"?n.resend_in:60}async function $r(e,t){var r;let n=await lt(!0).catch(()=>{throw new D("no_device_key")}),i=await Bt(Au,{method:"POST",body:JSON.stringify({email:e,otp:t}),keys:n,sendPublicKey:!0});if(typeof(i==null?void 0:i.token)!="string"||!i.token)throw new D("sign_in_failed");let o={token:i.token,email:typeof((r=i.user)==null?void 0:r.email)=="string"?i.user.email:e};return await Ri(o).catch(()=>{throw new D("no_device_key")}),Ei=!0,o}var Ei=!1;async function Hr(){var t;let e=await te();if(!e||Ei)return e;try{let n=await kn(e,_u,"GET");Ei=!0;let i=(t=n==null?void 0:n.user)==null?void 0:t.email;if(typeof i!="string"||i===e.email)return e;let o=b(m({},e),{email:i});return await Ri(o).catch(()=>{}),o}catch(n){if(n instanceof D&&n.code==="signed_out")return null;throw n}}async function Kr(){let e=await te().catch(()=>null);e&&await kn(e,Mu,"POST").catch(()=>{}),await Xe()}async function zr(){let e=await te();if(!e)throw new D("signed_out");let t=await kn(e,Bu,"POST"),n=typeof(t==null?void 0:t.url)=="string"?t.url:"",i=new URL(U().webUrl).origin;if(!n.startsWith(`${i}/link#`))throw new D("link_failed");return n}async function Mt(e,t,n){let i=await te();if(!i)throw new D("signed_out");return kn(i,e,t,n)}async function Fr(e,t,n){let i=await te().catch(()=>null),o=i?await lt(!1).catch(()=>null):null;await Bt(e,m({method:"POST",body:JSON.stringify(t),headers:n,keepalive:!0},i&&o?{token:i.token,keys:o}:{}))}async function kn(e,t,n,i){let o=await lt(!1);if(!o)throw await Xe(),new D("signed_out");return Bt(t,m({method:n,token:e.token,keys:o},i===void 0?{}:{body:JSON.stringify(i)}))}async function Bt(e,t,n=!1){var f,y,S;let i=`${U().webUrl.replace(/\/+$/,"")}${e}`,o=m({},t.headers);if(t.body!==void 0&&(o["content-type"]="application/json"),t.token&&(o.authorization=`Bearer ${t.token}`),t.keys){let k=(f=await Sn())!=null?f:Du;o[Dr]=k,o[Ou]=await Tt(t.keys.privateKey,k,t.method,i,(y=t.body)!=null?y:""),t.sendPublicKey&&(o[Lu]=await hn(t.keys.publicKey))}let r;try{r=await fetch(i,{method:t.method,headers:o,body:t.body,keepalive:t.keepalive})}catch(k){throw new D("offline")}let s=r.headers.get(Dr);s&&await bn(s);let c=await r.json().catch(()=>null);if(r.ok)return c;let l=typeof(c==null?void 0:c.code)=="string"?c.code:r.status===503?"unavailable":"failed";if(l==="stale_salt"&&t.keys&&!n)return Bt(e,t,!0);l==="signed_out"&&await Xe();let u=Number(r.headers.get("retry-after")),d=c==null?void 0:c.share;throw new D(l,Number.isFinite(u)&&u>0?u:(S=$u[l])!=null?S:null,typeof(d==null?void 0:d.code)=="string"?{code:d.code,link:typeof d.link=="string"?d.link:null}:null)}var $u={resend_wait:60,too_many_requests:60,send_failed:60};var Hu="x-syncify-user-hash",Ku="x-syncify-identity",zu="x-syncify-signature",Fu="x-syncify-install",ju="x-syncify-install-key",Wu="x-syncify-install-signature",Ni="x-syncify-salt",Yu="none",Vu="/restores",qu="/sync",Gu="/settings/delete",Ju="x-syncify-settings-bytes",Xu="/installs",Zu="hash",jr=3,Lt=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}},ye=class extends Error{constructor(n){super(n==="not_linked"?"Couldn't read that Spotify account's backups.":"Sign in to restore this backup.");this.code=n;this.name="LockedError"}},Ze=class extends Error{constructor(){super("This Spotify account doesn't accept backups from this install. Sign in to back up."),this.name="InstallRefusedError"}};async function Vr(e,t,n,i){var c,l;let o=JSON.stringify(n),r=await Re(e,t,{method:"POST",headers:m({"content-type":"application/json"},i!==void 0?{[Ju]:String(new TextEncoder().encode(i).byteLength)}:{}),body:i!==void 0?i+o:o});if(r.status===403&&((c=await r.json().catch(()=>null))==null?void 0:c.code)==="install_refused")throw new Ze;if(!r.ok)throw new Error(`Backup failed with HTTP ${r.status}.`);let s=await r.json().catch(()=>null);return{unchanged:(s==null?void 0:s.unchanged)===!0,unapproved:(s==null?void 0:s.quarantined)===!0,settings:(l=s==null?void 0:s.settings)!=null?l:null}}async function qr(e,t,n,i){let o=await Re(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({install:n,action:i})},Xu);if(o.ok)return;let r=await o.json().catch(()=>null);if((r==null?void 0:r.code)!=="not_pending")throw new Error(`Couldn't answer with HTTP ${o.status}.`)}async function Pi(e,t,n,i){var w,E,T,N,x,_;let o=await Re(e,t,i!==void 0&&!n?{method:"POST",headers:{"content-type":"application/json"},body:i}:{method:"GET"},i!==void 0&&!n?qu:Xr("/",n));if(o.status===404){let I=await o.json().catch(()=>null);return{settings:(w=I==null?void 0:I.settings)!=null?w:null,exists:!1,payload:null,backups:[],safetyCopy:null,pinned:[],claim:Ot(I==null?void 0:I.claim),unapproved:[],install:Wr(I==null?void 0:I.install),nudge:!1}}if(!o.ok)throw new Error(`Restore failed with HTTP ${o.status}.`);let r=await o.json(),s=Ot(r.claim),c=Wr(r.install),l=r.nudge===!0,u=(E=r.settings)!=null?E:null;delete r.claim,delete r.install,delete r.nudge,delete r.settings;let d=[r,...(T=r.backup_history)!=null?T:[]];if(!d.every(I=>I.backup))return{exists:!0,payload:r,backups:d.slice(0,jr),safetyCopy:(N=d[jr])!=null?N:null,pinned:[],claim:s,unapproved:[],install:c,nudge:l,settings:u};let f=d.filter(I=>{var M;return((M=I.backup)==null?void 0:M.kind)==="rolling"}),y=I=>{var M,Y;return((M=I.backup)==null?void 0:M.kind)==="anchor"||((Y=I.backup)==null?void 0:Y.safety_copy)===!0},S=(x=d.find(y))!=null?x:null,k=d.filter(I=>{var M;return((M=I.backup)==null?void 0:M.kind)==="pinned"&&!y(I)}),v=d.filter(I=>{var M;return((M=I.backup)==null?void 0:M.kind)==="quarantined"}),g=(_=f[0])!=null?_:S;return g?f.length===0&&S?{exists:!0,payload:g,backups:[S],safetyCopy:null,pinned:k,claim:s,unapproved:v,install:c,nudge:l,settings:u}:{exists:!0,payload:g,backups:f,safetyCopy:S,pinned:k,claim:s,unapproved:v,install:c,nudge:l,settings:u}:{exists:!1,payload:null,backups:[],safetyCopy:null,pinned:k,claim:s,unapproved:v,install:c,nudge:l,settings:u}}async function Gr(e,t,n){let i=await Re(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({item:n})},Gu),o=await i.json().catch(()=>null);if(!i.ok||typeof(o==null?void 0:o.version)!="number")throw new Error(i.status===429?"Syncify can't delete more synced copies today. Try again tomorrow.":`Couldn't delete the synced copy with HTTP ${i.status}.`);return{version:o.version}}async function Jr(e,t,n,i){try{await Re(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:n}),keepalive:!0},Xr(Vu,i))}catch(o){}}async function Re(e,t,n,i="",o=!1){var w,E,T,N,x;let r=i?`${e.replace(/\/+$/,"")}${i}`:e,s=(w=n.method)!=null?w:"GET",c=await te().catch(Yr),l=c?await lt(!1).catch(Yr):null,u=await Or(),d={},f=(E=await Sn())!=null?E:Yu;c&&l&&(d.authorization=`Bearer ${c.token}`,d[Ni]=f,d[zu]=await Tt(l.privateKey,f,s,r,(T=n.body)!=null?T:"")),u&&(d[Ni]=f,d[ju]=u.publicKey,d[Wu]=await Tt(u.privateKey,f,s,r,(N=n.body)!=null?N:""));let y=await Er(),S=y[Fu],k=await fetch(r,b(m({},n),{headers:m(b(m(m({},n.headers),y),{[Hu]:t.hash,[Ku]:t.field}),d)})),v=k.headers.get(Ni);if(v&&await bn(v),k.status===426)throw new Lt;if(k.status!==401)return k;let g=(x=await k.clone().json().catch(()=>null))==null?void 0:x.code;if(!o){if(g==="stale_salt"&&(c||u))return Re(e,t,n,i,!0);if(g==="signed_out"&&c)return await Xe(),Re(e,t,n,i,!0);if(g==="install_key_mismatch"&&u)return await Nr(S),Re(e,t,n,i,!0)}throw g==="claimed"||g==="not_owner"||g==="not_linked"?new ye(g):(g==="signed_out"&&await Xe(),new D(typeof g=="string"?g:"failed"))}function Xr(e,t){return t?`${e}?${Zu}=${encodeURIComponent(t)}`:e}function Wr(e){let t=e;if(!t||typeof t.trust!="string")return null;let n=Array.isArray(t.waiting)?t.waiting:[];return{trusted:t.trust!=="pending"&&t.trust!=="rejected",refused:t.trust==="rejected",waiting:n.flatMap(i=>{let o=i;return o&&typeof o.id=="string"&&typeof o.first_seen_at=="number"?[{id:o.id,device:typeof o.device=="string"?o.device:null,first_seen_at:o.first_seen_at}]:[]})}}function Ot(e){let t=e;return!t||typeof t.mine!="boolean"?null:t.status==="final"?{status:"final",mine:t.mine}:t.status==="undone"?typeof t.undone_at=="number"?{status:"undone",mine:!1,email:typeof t.email=="string"?t.email:null,undone_at:t.undone_at}:null:t.status!=="pending"||typeof t.final_at!="number"?null:m({status:"pending",mine:t.mine,email:typeof t.email=="string"?t.email:null,final_at:t.final_at,held:t.held===!0},t.not_me===!0?{not_me:!0}:{})}function Yr(e){if(e instanceof Ge)return null;throw e}async function vn(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return[...new Uint8Array(n)].map(i=>i.toString(16).padStart(2,"0")).join("")}function J(e){return JSON.stringify(Ti(e))}function Ti(e){return Array.isArray(e)?e.map(Ti):e&&typeof e=="object"?Object.keys(e).sort().reduce((t,n)=>(t[n]=Ti(e[n]),t),{}):e}function Zr(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var Qu="marketplace:installed:";function ed(e){return{id:e.id,key:`${Qu}${e.id}`,name:e.name,kind:td(e.id)}}function Dt(e){return new Map(e.map(t=>[t.id,ed(t)]))}function td(e){return/\.(m?js)$/i.test(e)?"extension":/\.css$/i.test(e)?"theme":"app"}var nd="registry.json",Qr="settings-registry",id=1,od=3e3,rd=["marketplace:","spicetify","syncify"],sd=["spicetify","syncify"],ad="medium",Ai=null;function Ee(){return Ai||(Ai=cd().then(async e=>e?(await fe(Qr,e).catch(()=>{}),e):ns(await be(Qr).catch(()=>{})))),Ai}async function cd(){let e=typeof AbortController=="function"?new AbortController:null,t=setTimeout(()=>e==null?void 0:e.abort(),od);try{let n=await fetch(`${U().releasesUrl}/${nd}`,{signal:e==null?void 0:e.signal});return n.ok?ns(await n.json()):null}catch(n){return null}finally{clearTimeout(t)}}function ns(e){if(!Qe(e)||e.format!==id||!Array.isArray(e.items)||!Qe(e.sizes))return null;let t={small:Number(e.sizes.small),medium:Number(e.sizes.medium),large:Number(e.sizes.large)},n=Number(e.accountLimit);return[...Object.values(t),n].every(o=>Number.isSafeInteger(o)&&o>0)?{items:e.items.flatMap(o=>{let r=ld(o,t);return r?[r]:[]}),accountLimit:n}:null}function ld(e,t){var l,u;if(!Qe(e)||typeof e.id!="string"||!e.id)return null;let n=es(e.keys),i=es((l=e.exclude)!=null?l:[]),o=yd(e.storage),r=fd(e.lists),s=(u=e.size)!=null?u:ad;if(s!=="small"&&s!=="medium"&&s!=="large"||!n||!i||!o||!r||n.length===0||o.type==="localStorage"&&n.some(md)||o.type==="indexedDB"&&sd.some(d=>o.database.startsWith(d)))return null;let c=ud(e.name)?e.name:dd(e.id);return{id:e.id,name:c,keys:n,exclude:i,storage:o,lists:r,limit:t[s]}}function ud(e){return typeof e=="string"&&e.length<=100&&/^\S(?:.*\S)?$/.test(e)}function dd(e){var i;let t=(i=e.split("/").pop())!=null?i:e,n=t.replace(/\.[^.]+$/,"")||t;return n.charAt(0).toUpperCase()+n.slice(1)}function fd(e){if(e===void 0)return{};if(!Qe(e))return null;let t={};for(let[n,i]of Object.entries(e))if(Qe(i)&&i.merge==="object")t[n]={merge:"object"};else if(Qe(i)&&i.merge==="array"&&Ut(i.id))t[n]={merge:"array",id:i.id};else return null;return t}function yd(e){return e===void 0?{type:"localStorage"}:Qe(e)?e.type==="localStorage"?{type:"localStorage"}:e.type!=="indexedDB"||!Ut(e.database)||!Ut(e.store)||e.valueField!==void 0&&!Ut(e.valueField)?null:m({type:"indexedDB",database:e.database,store:e.store},e.valueField!==void 0?{valueField:e.valueField}:{}):null}function es(e){return Array.isArray(e)&&e.every(t=>Ut(t)&&/^[^*\s]+\*?$/.test(t))?e:null}function Be(e,t){return e.keys.some(n=>ts(n,t))&&!e.exclude.some(n=>ts(n,t))}function ts(e,t){return e.endsWith("*")?t.startsWith(e.slice(0,-1)):t===e}function md(e){let t=e.endsWith("*")?e.slice(0,-1):e;return rd.some(n=>t.startsWith(n)||e.endsWith("*")&&n.startsWith(t))}function Ut(e){return typeof e=="string"&&e.length>0}function Qe(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}var pd=2e3,Cn="restored-settings";async function is(e){await fe(Cn,e).catch(()=>{})}async function ut(e){var i,o;let t={},n=new Set;for(let[r,s]of gd(e,as())){let c=window.localStorage.getItem(r);c!==null&&((o=t[i=s.id])!=null||(t[i]={storage:"localStorage",values:{}}),t[s.id].values[r]=c)}return await Promise.all(e.items.filter(r=>r.storage.type==="indexedDB").map(async r=>{let s=await bd(r);s===null?n.add(r.id):Object.keys(s).length>0&&(t[r.id]={storage:"indexedDB",values:s})})),{settings:t,unavailable:n}}function gd(e,t){var r,s;let n=new Map,i=[];for(let c of e.items)if(c.storage.type==="localStorage")for(let l of c.keys)l.endsWith("*")?i.push([l.slice(0,-1),c]):n.set(l,c);let o=new Map;for(let c of t){let l=(s=n.get(c))!=null?s:(r=i.find(([u])=>c.startsWith(u)))==null?void 0:r[1];l&&Be(l,c)&&o.set(c,l)}return o}async function In(e,t,n){let i=n.flatMap(r=>{let s=e.items.find(l=>l.id===r),c=s?ss(s,t[r]):null;return s&&c?[{item:s,saved:c}]:[]});for(let{item:r,saved:s}of i)r.storage.type==="indexedDB"&&await wd(r,s);let o=as();for(let{item:r,saved:s}of i)if(r.storage.type==="localStorage"){for(let c of o)Be(r,c)&&!(c in s)&&window.localStorage.removeItem(c);for(let[c,l]of Object.entries(s))window.localStorage.setItem(c,l)}}function hd(e,t,n){return t?e.items.flatMap(i=>{var c,l;let o=ss(i,t[i.id]);if(!o||n.unavailable.has(i.id))return[];let r=(l=(c=n.settings[i.id])==null?void 0:c.values)!=null?l:{};return[...new Set([...Object.keys(o),...Object.keys(r)])].some(u=>!Sd(i,o[u],r[u]))?[i.id]:[]}):[]}async function os(e){if(!e)return[];let t=await Ee();if(!t)return[];let n=Dt(t.items);return hd(t,e,await ut(t)).flatMap(i=>{let o=n.get(i);return o?[o]:[]})}function rs(e,t,n){let i=new TextEncoder,o=t+i.encode(`,${JSON.stringify("extension_settings")}:{}`).byteLength,r=Object.entries(e).map(([l,u])=>({id:l,entry:u,bytes:i.encode(`${JSON.stringify(l)}:${JSON.stringify(u)}`).byteLength})).sort((l,u)=>l.bytes-u.bytes||l.id.localeCompare(u.id)),s={},c=!0;for(let{id:l,entry:u,bytes:d}of r){let f=d+(c?0:1);if(o+f>n)break;o+=f,s[l]=u,c=!1}return s}function ss(e,t){if(!t||typeof t!="object"||t.storage!==e.storage.type||!t.values||typeof t.values!="object"||Array.isArray(t.values))return null;let n={};for(let[i,o]of Object.entries(t.values))Be(e,i)&&((e.storage.type==="localStorage"?typeof o!="string":!xn(o))||(n[i]=o));return Object.keys(n).length>0?n:null}function Sd(e,t,n){if(t===void 0||n===void 0)return t===n;let i=e.storage.type==="indexedDB"?e.storage.valueField:void 0,o=r=>i&&r&&typeof r=="object"&&!Array.isArray(r)?r[i]:r;return J(o(t))===J(o(n))}function xn(e){return e===null||typeof e=="string"||typeof e=="boolean"?!0:typeof e=="number"?Number.isFinite(e):Array.isArray(e)?e.every(xn):typeof e=="object"&&Object.getPrototypeOf(e)===Object.prototype?Object.values(e).every(xn):!1}function as(){let e=[];for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);n!==null&&e.push(n)}return e}async function bd(e){let t=e.storage;return cs(t,"readonly",(n,i)=>{let o={},r=n.openCursor();r.onsuccess=()=>{let s=r.result;if(!s)return i(o);let c=s.key;typeof c=="string"&&Be(e,c)&&xn(s.value)&&(o[c]=s.value),s.continue()}}).catch(()=>null)}async function wd(e,t){let n=e.storage;if(await cs(n,"readwrite",(o,r)=>{let s=o.openCursor();s.onsuccess=()=>{let c=s.result;if(c){let l=c.key;typeof l=="string"&&Be(e,l)&&!(l in t)&&c.delete(),c.continue();return}for(let[l,u]of Object.entries(t))o.put(u,l);r(!0)}})===null)throw new Error("Syncify couldn't write an extension's settings. Restart Spotify and try again.")}function cs(e,t,n){let i;try{i=window.indexedDB}catch(r){return Promise.resolve(null)}if(!i)return Promise.resolve(null);let o=i;return new Promise((r,s)=>{let c=!1,l=null,u=y=>{c||(c=!0,clearTimeout(d),y())},d=setTimeout(()=>{u(()=>s(new Error("The extension's database took too long.")));try{l==null||l.abort()}catch(y){}},pd),f;try{f=o.open(e.database)}catch(y){u(()=>r(null));return}f.onupgradeneeded=()=>{var y;return(y=f.transaction)==null?void 0:y.abort()},f.onerror=()=>{let y=f.error;u(()=>(y==null?void 0:y.name)==="AbortError"?r(null):s(y))},f.onblocked=()=>u(()=>s(new Error("The extension's database is busy."))),f.onsuccess=()=>{let y=f.result;if(y.onversionchange=()=>y.close(),c||!y.objectStoreNames.contains(e.store)){y.close(),u(()=>r(null));return}try{let S=y.transaction(e.store,t);l=S;let k=null;n(S.objectStore(e.store),v=>{k=v}),S.oncomplete=()=>{y.close(),u(()=>r(k))},S.onerror=S.onabort=()=>{y.close(),u(()=>{var v;return s((v=S.error)!=null?v:new Error("IndexedDB failed."))})}}catch(S){y.close(),u(()=>s(S))}}})}var kd=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,vd=100,xd="marketplace:installed-extensions",Cd="marketplace:installed-themes",Id="marketplace:theme-installed",Rd="marketplace:installed:",Ed="marketplace";function Mi(e){return Spicetify.Config?Bi(Spicetify.Config,e):null}function Bi(e,t){var r;let n=He(e),i=new Set(Nd(t)),o=((r=t[Id])==null?void 0:r.includes(Rd))===!0;return{current_theme:o?Ed:n.current_theme,color_scheme:o?"":n.color_scheme,extensions:n.extensions.filter(s=>!i.has(s)),custom_apps:n.custom_apps}}function He(e){let t=e&&typeof e=="object"?e:{};return{current_theme:_i(t.current_theme)?t.current_theme:"",color_scheme:_i(t.color_scheme)?t.color_scheme:"",extensions:ls(t.extensions),custom_apps:ls(t.custom_apps)}}function fs(e,t){return J(He(e))===J(He(t))}function ls(e){return Array.isArray(e)?[...new Set(e.filter(_i))].sort().slice(0,vd):[]}function _i(e){return typeof e=="string"&&kd.test(e)}function Nd(e){let t=us(e[xd]).map(i=>{var r;let o=(r=ds(e[i]))==null?void 0:r.manifest;return o&&typeof o=="object"?o.main:void 0}),n=us(e[Cd]).flatMap(i=>{var r;let o=(r=ds(e[i]))==null?void 0:r.include;return Array.isArray(o)?o:[]});return[...t,...n].flatMap(i=>{let o=typeof i=="string"?i.split("/").pop():void 0;return o?[o]:[]})}function us(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function ds(e){try{let t=e?JSON.parse(e):null;return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch(t){return null}}var Pd=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],Td="marketplace:installed:",ys=`${Td}snippet:`,Ad="wsoltani/syncify",_d="marketplace",ms={added:0,removed:1,unchanged:2};function ie(e){let t=new Map;for(let[n,i]of Pd)for(let o of Od(e[n]))t.has(o)||t.set(o,Bd(o,i,e[o]));return[...t.values()]}function Nn(e,t,n,i){let o=new Set(e.map(l=>l.key)),r=new Map(n.map(l=>[l.key,l])),s=[...e.map(l=>{let u=r.get(l.key);return b(m({},l),{change:u?"unchanged":"added",isNew:!u||u.sources.join(" ")!==l.sources.join(" ")})}),...n.filter(l=>!o.has(l.key)).map(l=>b(m({},l),{change:$t(l,e)?"unchanged":"removed",isNew:!1}))].sort((l,u)=>ms[l.change]-ms[u.change]||l.name.localeCompare(u.name)),c={added:0,removed:0,unchanged:0};for(let l of s)c[l.change]+=1;return{items:s,counts:c,manual:Md(t,i)}}function $t(e,t){return e.type==="extension"&&En(e)&&!t.some(En)}function En(e){var t;return((t=e.repo)==null?void 0:t.toLowerCase())===Ad}function Md(e,t){if(!e)return[];let n=He(e),i=He(t),o=[...n.extensions.filter(s=>!i.extensions.includes(s)).map(s=>({type:"extension",name:s})),...n.custom_apps.filter(s=>!i.custom_apps.includes(s)).map(s=>({type:"custom_app",name:s}))],r=n.current_theme;return r&&r!==_d&&(r!==i.current_theme||n.color_scheme!==i.color_scheme)&&o.push(m({type:"theme",name:r},n.color_scheme?{scheme:n.color_scheme}:{})),o}function Bd(e,t,n){var l,u;let i=ps(n),o=ps(i==null?void 0:i.manifest),r=Rn(i==null?void 0:i.user),s=Rn(i==null?void 0:i.repo),c=(u=(l=Rn(i==null?void 0:i.title))!=null?l:Rn(o==null?void 0:o.name))!=null?u:e.startsWith(ys)?e.slice(ys.length):e.split("/").pop()||e;return{key:e,type:t,name:c,repo:t!=="snippet"&&r&&s?`${r}/${s}`:null,sources:Ld(t,i),custom:t==="snippet"&&(i==null?void 0:i.custom)===!0}}function Ld(e,t){return t?(e==="extension"?[t.extensionURL]:e==="theme"?[t.cssURL,t.schemesURL,...Array.isArray(t.include)?t.include:[]]:[]).filter(i=>typeof i=="string"&&i!==""):[]}function Rn(e){return typeof e=="string"&&e.trim()?e.trim():null}function Od(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function ps(e){let t=e;if(typeof e=="string")try{t=JSON.parse(e)}catch(n){return null}return t&&typeof t=="object"&&!Array.isArray(t)?t:null}var Pn="spicetify-marketplace";var Ht="settings";async function gs(){let e=await bs();if(e.kind!=="ok")return null;try{let t=await ws(e.db,"readonly",i=>i.getAll());if(!t)return null;let n={};for(let i of t)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(n[i.key]=i.value);return n}finally{e.db.close()}}async function hs(e,t=[]){let n=await bs();if(n.kind==="unavailable")return"unavailable";let i=n.kind==="ok"?n.db:await Dd();if(!i)return"failed";try{return await ws(i,"readwrite",r=>{let s;for(let[c,l]of Object.entries(e))s=r.put({key:c,value:l});for(let c of t)s=r.delete(c);return s})===null?"failed":"written"}finally{i.close()}}function Ss(){var e;try{return(e=window.indexedDB)!=null?e:null}catch(t){return null}}async function bs(){let e=Ss();return e?await Ud(e)?{kind:"missing"}:new Promise(t=>{let n=!1,i=e.open(Pn);i.onupgradeneeded=()=>{n=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),t({kind:"unavailable"})},i.onblocked=()=>t({kind:"unavailable"}),i.onsuccess=()=>{let o=i.result;if(n){o.close(),$d(e).then(()=>t({kind:"missing"}));return}if(!o.objectStoreNames.contains(Ht)){o.close(),t({kind:"unavailable"});return}t({kind:"ok",db:o})}}):{kind:"unavailable"}}function Dd(){let e=Ss();return e?new Promise(t=>{let n=e.open(Pn,1);n.onupgradeneeded=()=>{let i=n.result;i.objectStoreNames.contains(Ht)||i.createObjectStore(Ht,{keyPath:"key"})},n.onerror=()=>{console.warn("Syncify could not create Marketplace storage",n.error),t(null)},n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}async function Ud(e){if(typeof e.databases!="function")return!1;try{return!(await e.databases()).some(n=>n.name===Pn)}catch(t){return!1}}function $d(e){return new Promise(t=>{let n=e.deleteDatabase(Pn);n.onsuccess=()=>t(),n.onerror=()=>t(),n.onblocked=()=>t()})}function ws(e,t,n){return new Promise(i=>{let o;try{o=e.transaction(Ht,t)}catch(u){console.warn("Syncify could not open a Marketplace transaction",u),i(null);return}let r,s=!1,c=u=>{s||(s=!0,i(u))};o.oncomplete=()=>c(r),o.onerror=()=>{console.warn("Syncify Marketplace transaction failed",o.error),c(null)},o.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",o.error),c(null)};let l;try{l=n(o.objectStore(Ht))}catch(u){console.warn("Syncify Marketplace request could not be issued",u),c(null);return}l&&(l.onsuccess=()=>{r=l.result},l.onerror=()=>{console.warn("Syncify Marketplace request failed",l.error),c(null)})})}var Li="marketplace:",An=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function we(){let e=Jd(),t=await gs();if(t)for(let[n,i]of Object.entries(t))n.startsWith(Li)&&(e[n]=i);return e}var Kd=new Set(["marketplace:active-tab","marketplace:sort"]),Oi="marketplace:installed:",Tn="marketplace:theme-installed",zd=["stars","tags","lastUpdated","created"],Fd=750*1024;async function _n(e,t){let n={};for(let[i,o]of Object.entries(e))Kd.has(i)||(n[i]=i.startsWith(Oi)?jd(o):o);return t&&(n.spicetify_config=He(t)),vn(J(n))}function jd(e){try{let t=JSON.parse(e);if(!t||typeof t!="object"||Array.isArray(t))return e;for(let n of zd)delete t[n];return t}catch(t){return e}}async function Mn(){let e=await we(),t=Mi(e);return{keyCount:Object.keys(e).length,hash:await _n(e,t),installedItemCount:qd(e),installedItems:Bn(e),items:ie(e),spicetifyConfig:t,marketplaceAvailable:Gd(e),activeTheme:Kt(e[Tn])}}function Kt(e){if(!e)return null;if(e.startsWith(Oi))return e;try{let t=JSON.parse(e);return typeof t=="string"?t:null}catch(t){return null}}async function ks(){let[e,t]=await Promise.all([we(),Wd()]),n=Mi(e),i=m({schema_version:3,metadata:{last_sync_datetime:new Date().toISOString(),device_info:Zr(),marketplace_key_count:Object.keys(e).length},payload_hash:await _n(e,n),marketplace_data:{keys:e}},n?{spicetify_config:n}:{});if(Object.keys(t).length===0)return i;let o=new TextEncoder().encode(JSON.stringify(i)).byteLength,r=rs(t,o,Fd);return Object.keys(r).length>0?b(m({},i),{extension_settings:r}):i}async function Wd(){try{let e=await Ee();return e?(await ut(e)).settings:{}}catch(e){return{}}}async function vs(e,t=[]){var r,s;let n={},i=(s=(r=e.marketplace_data)==null?void 0:r.keys)!=null?s:{};for(let[c,l]of Object.entries(i))c.startsWith(Li)&&(n[c]=l);if(Object.keys(n).length===0)return 0;await Yd(n),t.length>0&&await Vd(n,t);let o=Ui(await we(),n);return await Di(n,o),Object.keys(n).length}async function Di(e,t=[]){for(let[i,o]of Object.entries(e))window.localStorage.setItem(i,o);for(let i of t)window.localStorage.removeItem(i);if(await hs(e,t)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try again.")}function Ui(e,t){let n=new Set(An.flatMap(s=>{var c;return Ln((c=t[s])!=null?c:e[s]).map(String)})),i=Bn(e).filter(s=>s.startsWith(Oi)&&!n.has(s)),o=i.filter(s=>e[s]!==void 0&&t[s]===void 0),r=e[Tn];return r&&t[Tn]===void 0&&i.some(s=>r.includes(s))&&o.push(Tn),o}async function Yd(e){let t=await we(),n=ie(e),i=ie(t).filter(s=>$t(s,n));if(i.length===0)return;let o="marketplace:installed-extensions",r=Ln(e[o]).map(String);for(let s of i)r.includes(s.key)||r.push(s.key),e[s.key]=t[s.key];e[o]=JSON.stringify(r)}async function Vd(e,t){let n=await we(),i=Bn(n);for(let o of An){if(e[o]===void 0)continue;let r=Ln(e[o]).map(String).filter(s=>!t.includes(s)||i.includes(s));e[o]=JSON.stringify(r)}for(let o of t)n[o]!==void 0?e[o]=n[o]:delete e[o]}function qd(e){return Bn(e).length}function Bn(e){return An.flatMap(t=>Ln(e[t]).map(String))}function Gd(e){return!!(window.Marketplace||An.some(n=>e[n]!==void 0)||e["marketplace:tabs"]!==void 0)}function xs(e,t){return t===0?!1:e===0?!0:e<Math.max(2,Math.floor(t*.5))}function Jd(){let e={};for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);if(!(n!=null&&n.startsWith(Li)))continue;let i=window.localStorage.getItem(n);i!==null&&(e[n]=i)}return e}function Ln(e){if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch(t){return[]}}var Xd="raw.githubusercontent.com",Zd="cdn.jsdelivr.net",Cs=".github.io";function Hi(e){var n;if(e.protocol!=="https:")return null;let t=e.pathname.split("/").filter(Boolean);if(e.host===Xd)return $i(t[0],t[1]);if(e.host===Zd)return t[0]==="gh"?$i(t[1],(n=t[2])==null?void 0:n.split("@")[0]):null;if(e.host.endsWith(Cs)){let i=e.host.slice(0,-Cs.length);return i.includes(".")?null:$i(i,t.length>1?t[0]:e.host)}return null}function $i(e,t){return e&&t?`${e}/${t}`:null}var Qd={extension:"spicetify-extensions",theme:"spicetify-themes"},ef="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",tf="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",nf="https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/",of="https://api.github.com/repos",rf=5e3,sf=20,Is="syncify:repo-topics",Rs=10080*60*1e3,af=200;function dt(e){return(e==null?void 0:e.kind)==="host"||(e==null?void 0:e.kind)==="repo"||(e==null?void 0:e.kind)==="blocked"||(e==null?void 0:e.kind)==="catalog"}function ft(e){let t=new Map;for(let n of e){if(n.change==="removed")continue;if(n.custom){t.set(n.key,{kind:"custom"});continue}let i=cf(n);i&&t.set(n.key,i)}return t}async function yt(e,t){let n=new Map,i=e.filter(s=>s.change!=="removed"&&s.isNew&&!t.has(s.key));if(i.length===0)return n;let o=i.filter(s=>s.type==="snippet"),r=i.filter(s=>s.type!=="snippet");if(o.length>0){let s=await Ki();for(let c of o)s?On(s,c.name)||n.set(c.key,{kind:"catalog"}):n.set(c.key,{kind:"unchecked"})}if(r.length>0){let s=await df(),c=mf(),l=0;await Promise.all(r.map(async u=>{let d=lf(u),f=Qd[u.type];if(!d||!f)return;if(s===null){n.set(u.key,{kind:"unchecked"});return}if(uf(d,s)){n.set(u.key,{kind:"blocked"});return}let y=yf(c,d);y===void 0&&l<sf&&(l+=1,y=await ff(d),y!==void 0&&(c[d.toLowerCase()]={topics:y,at:Date.now()})),y===void 0?n.set(u.key,{kind:"unchecked"}):(y===null||!y.includes(f))&&n.set(u.key,{kind:"catalog"})})),pf(c)}return n}function cf(e){let t=null;for(let n of e.sources){let i;try{i=new URL(n)}catch(r){return{kind:"host",host:n.slice(0,40)}}let o=Hi(i);if(!o)return{kind:"host",host:i.host};e.repo&&o.toLowerCase()!==e.repo.toLowerCase()&&(t!=null||(t=o))}return t?{kind:"repo",repo:t}:null}function lf(e){for(let t of e.sources)try{let n=Hi(new URL(t));if(n)return n}catch(n){}return e.repo}function uf(e,t){let n=`https://github.com/${e}`.toLowerCase();return t.some(i=>{let o=i.toLowerCase();if(!o.includes("*"))return o===n;let r=o.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${r}$`).test(n)})}function Es(e){return e.replace(/\n/g,"").trim().toLowerCase()}function On(e,t){return e.get(Es(t))}var zt=null,Ft=null;function df(){return zt!=null||(zt=Ns(ef).then(e=>{let t=e==null?void 0:e.repos;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&!n.startsWith("//")):(zt=null,null)})),zt}function Ki(){return Ft!=null||(Ft=Ns(tf).then(e=>{if(!Array.isArray(e))return Ft=null,null;let t=new Map;for(let n of e){if(typeof(n==null?void 0:n.title)!="string"||typeof n.code!="string")continue;let i=typeof n.preview=="string"?n.preview:null;t.set(Es(n.title),m({title:n.title,code:n.code,description:typeof n.description=="string"?n.description:""},i?{imageURL:i.startsWith("http")?i:`${nf}${i}`}:{}))}return t})),Ft}async function ff(e){let t=await Ps(`${of}/${e}`);if((t==null?void 0:t.status)===404)return null;if(!(t!=null&&t.ok))return;let n=await t.json().catch(()=>null);return Array.isArray(n==null?void 0:n.topics)?n.topics.filter(i=>typeof i=="string"):void 0}async function Ns(e){let t=await Ps(e);return t!=null&&t.ok?t.json().catch(()=>null):null}async function Ps(e){let t=typeof AbortController=="function"?new AbortController:null,n=setTimeout(()=>t==null?void 0:t.abort(),rf);try{return await fetch(e,{signal:t==null?void 0:t.signal})}catch(i){return null}finally{clearTimeout(n)}}function yf(e,t){let n=e[t.toLowerCase()];return n&&Date.now()-n.at<Rs?n.topics:void 0}function mf(){var e;try{let t=JSON.parse((e=localStorage.getItem(Is))!=null?e:"{}");return t&&typeof t=="object"?t:{}}catch(t){return{}}}function pf(e){let t=Date.now(),n=Object.entries(e).filter(([,i])=>t-i.at<Rs).sort(([,i],[,o])=>o.at-i.at).slice(0,af);try{localStorage.setItem(Is,JSON.stringify(Object.fromEntries(n)))}catch(i){}}var gf=/^[0-9A-HJKMNP-TV-Z]{6}$/,hf=6,Sf="SYN-",Ms=60,zi=20,Bs=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],et="marketplace:theme-installed",Ts="marketplace",As={added:0,removed:1,unchanged:2},bf=new RegExp(`^[a-z0-9][a-z0-9_-]{1,${zi-2}}[a-z0-9]$`);function Fi(e){let t=e.trim().replace(/^@/,"").toLowerCase();return/[^a-z0-9_-]/.test(t)?"Only letters, digits, _ and -":t.length<3?"At least 3 characters":!/^[a-z0-9]/.test(t)||!/[a-z0-9]$/.test(t)?"Start and end with a letter or digit":null}function Ne(e){return`${Sf}${e}`}function Ls(e){let t=e.trim();if(t.length>200)return null;if(t.includes("/")){let i=t.split(/[?#]/)[0].replace(/\/+$/,"");t=i.slice(i.lastIndexOf("/")+1).replace(/\.json$/i,"")}t=t.toUpperCase().replace(/[\s-]/g,""),t.length===hf+3&&t.startsWith("SYN")&&(t=t.slice(3));let n=t.replace(/O/g,"0").replace(/[IL]/g,"1");return gf.test(n)?n:null}function Os(e){let t=e;return!t||typeof t.code!="string"||!t.keys||typeof t.keys!="object"||!Object.values(t.keys).every(n=>typeof n=="string")?null:{code:t.code,name:typeof t.name=="string"&&t.name?t.name:null,creator:typeof t.creator=="string"&&bf.test(t.creator)?t.creator:null,updated_at:typeof t.updated_at=="number"?t.updated_at:0,keys:t.keys}}async function Ds(e,t){let n=e.filter(s=>!En(s)).map(s=>b(m({},s),{change:"added",isNew:!0})),i=ft(n);for(let s of n)!i.has(s.key)&&!wf(s,t[s.key])&&i.set(s.key,{kind:"catalog"});let o=await yt(n,i),r=new Map;for(let[s,c]of[...o,...i])c.kind!=="unchecked"&&r.set(s,c);return{items:n,leftOut:r}}function wf(e,t){if(e.type==="snippet")return!0;if(!e.repo)return!1;let n=xf(t);return e.type==="extension"?typeof(n==null?void 0:n.extensionURL)=="string"&&n.extensionURL!=="":typeof(n==null?void 0:n.cssURL)=="string"&&n.cssURL!==""}function Us(e,t){let n={};for(let[o,r]of Bs){let s=t.filter(c=>c.type===r&&e[c.key]!==void 0).map(c=>c.key);n[o]=JSON.stringify(s);for(let c of s)n[c]=e[c]}let i=Kt(e[et]);return i&&t.some(o=>o.key===i)&&(n[et]=e[et]),n}function $s(e,t,n,i,o,r){let s=r==="replace"?Nn(t,void 0,n,i):kf(t,n),c=Kt(e.keys[et]),l=c!==null&&t.some(d=>d.key===c)&&i!==null&&i.current_theme!==Ts,u=c!==null&&c!==o?t.find(d=>d.key===c):void 0;return m(b(m({},s),{manual:l?[{type:"theme",name:Ts}]:[]}),u?{theme:{key:u.key,name:u.name}}:{})}function kf(e,t){let n=new Set(t.map(s=>s.key)),i=new Set(e.map(s=>s.key)),o=[...e.map(s=>n.has(s.key)?b(m({},s),{change:"unchanged",isNew:!1}):b(m({},s),{change:"added",isNew:!0})),...t.filter(s=>!i.has(s.key)).map(s=>b(m({},s),{change:"unchanged",isNew:!1}))].sort((s,c)=>As[s.change]-As[c.change]||s.name.localeCompare(c.name)),r={added:0,removed:0,unchanged:0};for(let s of o)r[s.change]+=1;return{items:o,counts:r,manual:[]}}function Hs(e,t){return new Set(e.items.filter(n=>n.type==="snippet"&&n.change==="added"&&(!t||!On(t,n.name))).map(n=>n.key))}async function Ks(e,t,n,i){let o=await we(),r=ie(o),s=ie(e.keys),c={};for(let[f,y]of Bs){let S=_s(o[f]),v=[...t==="add"?S:S.filter(g=>n.includes(g)||r.some(w=>w.key===g&&$t(w,s)))];for(let g of s){if(g.type!==y||n.includes(g.key))continue;let w=S.includes(g.key);if(t==="add"&&w)continue;let E=y==="snippet"?vf(g,i,o[g.key]):e.keys[g.key];E!==void 0&&(c[g.key]=E,v.includes(g.key)||v.push(g.key))}c[f]=JSON.stringify(v)}let l=Kt(e.keys[et]),u=_s(c["marketplace:installed-themes"]);l&&u.includes(l)&&!n.includes(l)&&(c[et]=e.keys[et]);let d=Ui(o,c);return await Di(c,d),Object.keys(c).length+d.length}function vf(e,t,n){let i=t?On(t,e.name):void 0;return i?JSON.stringify(m({code:i.code,title:i.title,description:i.description},i.imageURL?{imageURL:i.imageURL}:{})):n}function _s(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function xf(e){try{let t=e?JSON.parse(e):null;return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch(t){return null}}var jt="/api/shares",Cf=`${jt}/update`,If=`${jt}/delete`,Rf=`${jt}/import`,Ef="x-syncify-user-hash",Nf="discover/presets.json",Pf={no_code:"This code doesn't exist.",too_many_codes:"You can't make more share codes. Delete one to make another.",daily_limit:"Too many changes to share codes today. Try again tomorrow.",too_large:"This setup is too big to share.",invalid_name:"Names can be up to 60 characters.",empty:"There's nothing to share yet. Install something from Marketplace first.",invalid_items:"Syncify couldn't read some items. Reload Spotify and try again.",source:"Some items don't load from GitHub. Reload Spotify and try again.",blocked:"Some items are on Marketplace's block list. Reload Spotify and try again.",custom_snippet:"Custom snippets can't be shared. Reload Spotify and try again.",unchecked:"Couldn't check Marketplace's block list. Try again in a minute.",publish_failed:"Couldn't publish the code. Press Update on it to try again.",delete_failed:"Couldn't delete the code. Try again.",same_setup:"You already shared this setup.",invalid_handle:"Handles are 3 to 20 letters, digits, _ or -, starting and ending with a letter or digit.",reserved_handle:"That handle isn't allowed. Pick another.",handle_taken:"That handle is taken. Pick another.",unavailable:"Share codes aren't available yet."},Tf=new Set(["offline","signed_out","invalid_signature","stale_salt","no_device_key","too_many_requests"]);function Wt(e,t=null){var n;return e instanceof D&&Tf.has(e.code)?$e(e):e instanceof D&&e.code==="too_many_codes"&&t!==null?`You have ${t} share codes already. Delete one to make another.`:(n=e instanceof D?Pf[e.code]:void 0)!=null?n:"Something went wrong. Try again."}async function Dn(){var t;let e=await Mt(jt,"GET");return{codes:Array.isArray(e==null?void 0:e.codes)?e.codes.flatMap(n=>{let i=Af(n);return i?[i]:[]}):[],newHearts:typeof(e==null?void 0:e.new_hearts)=="number"?e.new_hearts:0,max:typeof(e==null?void 0:e.max)=="number"?e.max:null,profile:typeof((t=e==null?void 0:e.profile)==null?void 0:t.handle)=="string"?{handle:e.profile.handle,link:typeof e.profile.link=="string"?e.profile.link:null}:null,suggestedHandle:typeof(e==null?void 0:e.suggested_handle)=="string"?e.suggested_handle:null}}async function zs(e,t,n){return Gs(await Mt(jt,"POST",m({name:e,keys:t},n===void 0?{}:{handle:n})))}function Fs(e){return`${U().shareUrl.replace(/\/+$/,"")}/@${e}`}async function js(e,t,n){return Gs(await Mt(Cf,"POST",{code:e,name:t,keys:n}))}async function Ws(e){try{await Mt(If,"POST",{code:e})}catch(t){if(t instanceof D&&t.code==="no_code")return;throw t}}async function Ys(e){let t=U().shareUrl.replace(/\/+$/,""),n;try{n=await fetch(`${t}/${e}.json`)}catch(o){throw new D("offline")}if(n.status===404||n.status===403)throw new D("no_code");if(!n.ok)throw new D("failed");let i=Os(await n.json().catch(()=>null));if(!i||i.code!==e)throw new D("no_code");return i}async function Vs(){let e=U().shareUrl.replace(/\/+$/,"");try{let t=await fetch(`${e}/${Nf}`);if(!t.ok)return null;let n=await t.json();return Array.isArray(n.posts)?n.posts.flatMap(i=>{let o=Mf(i);return o?[o]:[]}):null}catch(t){return null}}async function qs(e,t,n=!1){try{await Fr(Rf,m({code:e},n?{source:"preset"}:{}),{[Ef]:t.hash})}catch(i){}}function Af(e){let t=e;return!t||typeof t.code!="string"?null:{code:t.code,name:typeof t.name=="string"&&t.name?t.name:null,link:typeof t.link=="string"?t.link:null,item_count:typeof t.item_count=="number"?t.item_count:0,imports:typeof t.imports=="number"?t.imports:0,created_at:typeof t.created_at=="number"?t.created_at:0,updated_at:typeof t.updated_at=="number"?t.updated_at:0,posted:_f(e.post)}}function _f(e){let t=e==null?void 0:e.status;return typeof t=="string"&&t!=="removed"}function Mf(e){let t=e,n=i=>Number.isSafeInteger(i)&&i>=0?i:0;return!t||typeof t.code!="string"?null:{code:t.code,name:typeof t.name=="string"?t.name:Ne(t.code),extensions:n(t.extensions),themes:n(t.themes),snippets:n(t.snippets)}}function Gs(e){let t=e;if(typeof(t==null?void 0:t.code)!="string")throw new D("failed");return{code:t.code,link:typeof t.link=="string"?t.link:null,leftOut:Array.isArray(t.left_out)?t.left_out.length:0}}var Js="/claims",Bf="/claims/cancel",Lf={no_backup:"Back up first, then secure your backup.",unsupported_identity:"This Spotify account can't be secured.",too_many_accounts:"Your account already has 10 Spotify accounts linked.",undone:"This backup can't be secured with your account.",offline:"Couldn't reach Syncify. Check your connection and try again."},Ke=class extends Error{constructor(n){var i;super((i=Lf[n])!=null?i:"Couldn't secure your backup. Try again.");this.code=n;this.name="ClaimError"}};async function Xs(e,t){let n=await ji(e,t,"GET",Js);if(!n.ok)throw new Ke(await Wi(n));let i=await n.json().catch(()=>null);return{claim:Ot(i==null?void 0:i.claim),accounts:Array.isArray(i==null?void 0:i.accounts)?i.accounts.filter(Of):null}}async function Zs(e,t){let n=await ji(e,t,"POST",Js);if(!n.ok)throw new Ke(await Wi(n));let i=await n.json().catch(()=>null);return Ot(i==null?void 0:i.claim)}async function Qs(e,t){let n=await ji(e,t,"POST",Bf);if(n.status===404)return"cancelled";if(!n.ok)throw new Ke(await Wi(n));let i=await n.json().catch(()=>null);return(i==null?void 0:i.held)===!0?"checking":"cancelled"}async function ji(e,t,n,i){try{return await Re(e,t,{method:n},i)}catch(o){throw o instanceof TypeError?new Ke("offline"):o}}async function Wi(e){let t=await e.json().catch(()=>null);return typeof(t==null?void 0:t.code)=="string"?t.code:"failed"}function Of(e){let t=e;return!!(t&&typeof t.hash=="string"&&(t.status==="pending"||t.status==="final"||t.status==="cancelled"||t.status==="unlinked"))}var ea="[Syncify]";function oe(e,...t){console.debug(ea,e,...t)}function ae(e,...t){console.warn(ea,e,...t)}var pt={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},Df=/^([a-z0-9]|f([1-9]|1[0-2]))$/,Uf=250,$f=40,Yi=null,Un=null,mt=null;function ta(){return/mac/i.test(navigator.platform||navigator.userAgent)}function na(e){if(e===null)return null;if(!e||typeof e!="object")return pt;let t=e;return typeof t.key!="string"||!Df.test(t.key)?pt:{key:t.key,ctrl:!!t.ctrl,alt:!!t.alt,shift:!!t.shift,meta:!!t.meta}}function Yt(e){if(!e)return"Off";let t=e.key.toUpperCase();return ta()?[e.ctrl?"\u2318":"",e.alt?"\u2325":"",e.shift?"\u21E7":"",t].join(""):[e.ctrl&&"Ctrl",e.meta&&"Win",e.alt&&"Alt",e.shift&&"Shift",t].filter(Boolean).join("+")}function ia(e){if(e.key==="Escape")return{kind:"cancel"};let t=Hf(e.code);if(!t)return{kind:"ignore"};let n=ta();if(n&&e.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:t,ctrl:n?e.metaKey:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:n?!1:e.metaKey},o=t.startsWith("f")&&t.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!o?{kind:"error",message:`Include ${n?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function Hf(e){var n,i;let t=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(e);return t?((i=(n=t[1])!=null?n:t[2])!=null?i:t[3]).toLowerCase():null}function oa(e){var t;if(mt&&Kf(mt,e))return!1;try{let n=Spicetify.Mousetrap,i=(t=n.trigger)==null?void 0:t.call(n)._directMap;if(!i)return!1;let o=Vi(e);return Object.keys(i).some(r=>r.startsWith(`${o}:`))}catch(n){return!1}}function qi(e,t,n=0){if(Yi=t,Un=e,!ra()){if(n>=$f){ae("Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>qi(Un,t,n+1),Uf);return}Gi(Un)}function Gi(e){if(Un=e,!ra()||!Yi)return;let t=Yi;try{if(mt&&Spicetify.Keyboard._deregisterShortcut(mt),mt=null,!e)return;Spicetify.Keyboard.registerShortcut(e,n=>{n.preventDefault(),t()}),mt=e,oe("Keyboard shortcut registered",Yt(e))}catch(n){ae("Failed to register keyboard shortcut",n)}}function ra(){var e;return typeof((e=Spicetify.Keyboard)==null?void 0:e.registerShortcut)=="function"}function Vi(e){return[e.ctrl&&"mod",e.meta&&"meta",e.alt&&"alt",e.shift&&"shift",e.key].filter(Boolean).join("+")}function Kf(e,t){return Vi(e)===Vi(t)}var Ji="both",zf=["both","topbar","menu"],Vt=null,qt=null,$n=!1;function sa(e){return zf.includes(e)?e:Ji}function Hn(){var e;return typeof((e=Spicetify.Menu)==null?void 0:e.Item)=="function"}function aa(e){Vt=e.topbarButton,qt=e.menuItem}function Kn(e){let t=e!=="menu"||!qt,n=e!=="topbar";if(Vt!=null&&Vt.element&&(Vt.element.style.display=t?"":"none"),!!qt)try{n&&!$n?(qt.register(),$n=!0):!n&&$n&&(qt.deregister(),$n=!1)}catch(i){ae("Failed to update profile menu item",i)}}var zn="syncify:config",gt={workerUrl:U().workerUrl,autoBackupEnabled:!1,shortcut:pt,entryPoint:Ji,settingsSyncEnabled:!0,settingsSyncOff:[],shareRestoredSettings:!0};function q(){var n,i;let e=U(),t=(i=(n=Spicetify.LocalStorage)==null?void 0:n.get(zn))!=null?i:window.localStorage.getItem(zn);if(!t)return b(m({},gt),{workerUrl:e.workerUrl});try{let o=JSON.parse(t);return{workerUrl:e.workerUrl,autoBackupEnabled:Xi(o.autoBackupEnabled,gt.autoBackupEnabled),shortcut:o.shortcut===void 0?gt.shortcut:na(o.shortcut),entryPoint:sa(o.entryPoint),settingsSyncEnabled:Xi(o.settingsSyncEnabled,gt.settingsSyncEnabled),settingsSyncOff:Ff(o.settingsSyncOff),shareRestoredSettings:Xi(o.shareRestoredSettings,gt.shareRestoredSettings)}}catch(o){return b(m({},gt),{workerUrl:e.workerUrl})}}function tt(e){var n;let t=JSON.stringify({workerUrl:U().workerUrl,autoBackupEnabled:e.autoBackupEnabled,shortcut:e.shortcut,entryPoint:e.entryPoint,settingsSyncEnabled:e.settingsSyncEnabled,settingsSyncOff:e.settingsSyncOff,shareRestoredSettings:e.shareRestoredSettings});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set(zn,t);return}window.localStorage.setItem(zn,t)}function Ff(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Xi(e,t){return e===void 0?t:!!e}function Gt(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}var jf=["username","canonicalUsername","id","uri","displayName"];async function me(){let{value:e,field:t}=await Wf();return{hash:await vn(e),field:t}}async function Wf(){var o;let e=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let t=await e.getUser(),n=jf.find(r=>(t==null?void 0:t[r])!=null),i=n?t[n]:void 0;if(!n||!i)throw new Error("Unable to resolve the active Spotify user.");return{value:i,field:n}}async function Xt(e,t){if(!Gt(e))throw new Error("Syncify backup service is not configured.");let[n,i]=await Promise.all([me(),ks()]);if(i.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:o,unapproved:r,settings:s}=await Vr(e.workerUrl,n,i,t==null?void 0:t.part);return{payload:i,unchanged:o,unapproved:r,settings:s}}async function nt(e,t,n){var u;if(!Gt(e))throw new Error("Syncify backup service is not configured.");let i=await Pi(e.workerUrl,await me(),t,n==null?void 0:n.part),[o,r,s,c]=await Promise.all([Promise.all(i.backups.map(Fn)),i.safetyCopy?Fn(i.safetyCopy):null,Promise.all(i.pinned.map(Fn)),Promise.all(i.unapproved.map(Fn))]),l=o.filter((d,f)=>o.findIndex(y=>y.payload_hash===d.payload_hash)===f);return b(m({},i),{payload:(u=l[0])!=null?u:null,backups:l,safetyCopy:r,pinned:s,unapproved:c.filter(d=>!l.some(f=>f.payload_hash===d.payload_hash))})}var Zi=new Map;async function Fn(e){var r,s,c;let t=(s=(r=e.marketplace_data)==null?void 0:r.keys)!=null?s:{},n=e.spicetify_config?Bi(e.spicetify_config,t):void 0,i=`${e.payload_hash} ${(c=e.metadata)==null?void 0:c.last_sync_datetime}`,o=Zi.get(i);return o||(o=_n(t,n),Zi.set(i,o),o.catch(()=>Zi.delete(i))),b(m(m({},e),n?{spicetify_config:n}:{}),{payload_hash:await o})}async function ca(e,t){let n=await Pi(Zt(e),await me(),void 0,t==null?void 0:t.part);return{claim:n.claim,install:n.install,nudge:n.nudge,backups:n.backups,settings:n.settings}}async function la(e,t,n,i=[],o={ids:[],share:!1}){var l;let r=t!=null?t:(await nt(e)).payload;if(!r)throw new Error("No Syncify cloud backup was found for this Spotify account.");await Yf(r,o);let s=await vs(r,i),c=(l=r.backup)==null?void 0:l.id;return c&&Gt(e)&&me().then(u=>Jr(e.workerUrl,u,c,n)).catch(()=>{}),{payload:r,restoredCount:s}}async function Yf(e,t){if(t.ids.length===0||!e.extension_settings)return;let n=await Ee();n&&(await In(n,e.extension_settings,t.ids),await is(m({at:Date.now()},t)))}var Jt=class extends Error{constructor(n){super("Couldn't back up your setup first, so nothing changed.");this.reason=n;this.name="SafetyBackupError"}};async function ua(e,t,n,i,o,r=!1){try{await Xt(e)}catch(c){throw new Jt(c)}let s=await Ks(t,n,i,o);return me().then(c=>qs(t.code,c,r)).catch(()=>{}),s}async function da(e){let t=await me(),n=await Xs(Zt(e),t);return b(m({},n),{hash:t.hash})}async function fa(e){await Zs(Zt(e),await me())}async function jn(e,t,n){await qr(Zt(e),await me(),t,n)}async function Wn(e){return Qs(Zt(e),await me())}function Zt(e){if(!Gt(e))throw new Error("Syncify backup service is not configured.");return e.workerUrl}var ya="syncify:nudge-hidden-until",ma="syncify:nudge-panel-shown";function pa(e=Date.now()){let t=Number(ba(ya));return Number.isFinite(t)&&t>e}function ga(e=Date.now()){wa(ya,String(e+30*864e5))}function ha(){return ba(ma)!==null}function Sa(){wa(ma,"1")}function ba(e){var t,n;return(n=(t=Spicetify.LocalStorage)==null?void 0:t.get(e))!=null?n:window.localStorage.getItem(e)}function wa(e,t){var n;(n=Spicetify.LocalStorage)!=null&&n.set?Spicetify.LocalStorage.set(e,t):window.localStorage.setItem(e,t)}var va="settings-sync",Vn="syncify:settings-sync",Vf=17946e8,qf={since:0,pulled:!1,firstSyncDone:!1,account:{},base:{},seen:{},heldSent:{},deleted:{}},ka={bytes:0,limit:0,items:[],choices:[],arrived:null,budgetDay:null},Qi=new Set;function Pe(){var t,n;let e=(n=(t=Spicetify.LocalStorage)==null?void 0:t.get(Vn))!=null?n:window.localStorage.getItem(Vn);if(!e)return ka;try{let i=JSON.parse(e);return{bytes:typeof i.bytes=="number"?i.bytes:0,limit:typeof i.limit=="number"?i.limit:0,items:Array.isArray(i.items)?i.items:[],choices:Array.isArray(i.choices)?i.choices:[],arrived:i.arrived&&Array.isArray(i.arrived.ids)?i.arrived:null,budgetDay:typeof i.budgetDay=="string"?i.budgetDay:null}}catch(i){return ka}}function ht(e){var n;let t=JSON.stringify(e);(n=Spicetify.LocalStorage)!=null&&n.set?Spicetify.LocalStorage.set(Vn,t):window.localStorage.setItem(Vn,t);for(let i of Qi)i(e)}function Jn(e){return Qi.add(e),()=>Qi.delete(e)}function xa(){let e=Pe();e.arrived&&ht(b(m({},e),{arrived:null}))}function Ca(){let e=Pe();e.arrived&&ht(b(m({},e),{arrived:b(m({},e.arrived),{hidden:!0})}))}function Xn(e){return`${e.length>=3?`${e[0]}, ${e[1]} and ${e.length-2} more`:e.join(" and ")} ${e.length===1?"has":"have"} new extension settings`}async function Qt(e){var f;if(!e.settingsSyncEnabled||!await te().catch(()=>null))return null;let t=await Ee();if(!t)return null;let n=await en(),i=await Ta(t);await Jf(n,i);let o=Pe(),r=new Set(e.settingsSyncOff),s=new Set(o.choices.map(y=>y.id)),c=n.pulled&&o.budgetDay!==La(Date.now()),l={},u=new Set;if(c)for(let y of t.items){let S=i.get(y.id);if(r.has(y.id)||s.has(y.id)||!S)continue;let k=Gn(y,S);if(k>y.limit){n.heldSent[y.id]!==k&&(l[y.id]={held:k},u.add(y.id));continue}let v=(f=n.base[y.id])!=null?f:Gf(n,y.id)?{}:void 0;if(v===void 0)continue;let g=oy(y,S,v);g&&(l[y.id]=g,u.add(y.id))}return{part:JSON.stringify(b(m({since:n.since},u.size>0?{changes:l}:{}),{installed:[...i.keys()]})),registry:t,local:i,sent:u}}function Gf(e,t){let n=e.account[t];return!n||n.off===!0||n.data===null}async function Jf(e,t){var i;let n=await be(Cn).catch(()=>{});if(n){if(!n.share){for(let o of n.ids){e.base[o]=(i=t.get(o))!=null?i:{};let r=e.account[o];r!=null&&r.data&&(e.seen[o]=J(r.data))}await Qn(e)}await mn(Cn).catch(()=>{})}}var Xf={arrived:[],choose:!1};async function Zn(e,t,n){let i=e?Zf(t):null;if(!e||!i)return Xf;let{registry:o,local:r}=e,s=Date.now(),c=await en(),l=q(),u=new Set(l.settingsSyncOff),d=Pe(),f=[];for(let[g,w]of Object.entries(i.items))c.account[g]=w;c.since=i.version,c.pulled=!0;let y=new Set([...Object.entries(i.items).flatMap(([g,w])=>w.off?[g]:[]),...Object.entries(i.results).flatMap(([g,w])=>w==="off"?[g]:[])]);for(let g of y)c.deleted[g]!==void 0&&!u.has(g)||(u.add(g),Ba(c,g));for(let[g,w]of Object.entries(c.deleted))w<=i.version&&delete c.deleted[g];let S=new Map(o.items.map(g=>[g.id,g])),k=[];for(let g of o.items){let w=r.get(g.id);if(u.has(g.id)||!w)continue;let E=e.sent.has(g.id)?i.results[g.id]:void 0;if(E==="held"){c.heldSent[g.id]=Gn(g,w);continue}if(Gn(g,w)>g.limit||(delete c.heldSent[g.id],E!==void 0&&E!=="saved"))continue;let T=c.account[g.id];if(!(T!=null&&T.data)||T.off)continue;let N=eo(T),x=J(T.data),_=c.base[g.id],I=async M=>{if(!Yn(g,w,N)){if(!await _a(o,g,T))return;(M||!T.mine)&&f.push(g.id)}c.base[g.id]=N,c.seen[g.id]=x};E==="saved"?await I(!0):_===void 0?c.firstSyncDone||Yn(g,w,N)?await I(!1):k.push(g.id):c.seen[g.id]!==x&&Yn(g,w,_)&&await I(!1)}k.length===0&&(c.firstSyncDone=!0);let v=Dt(o.items);return await Qn(c),u.size!==l.settingsSyncOff.length&&tt(b(m({},l),{settingsSyncOff:[...u]})),ht(b(m({},Pa(o,c,r,v,i.bytes)),{choices:k.flatMap(g=>{var T;let w=v.get(g),E=S.get(g);return!w||!E?[]:[{id:g,name:w.name,kind:w.kind,localAt:Qf(E,(T=r.get(g))!=null?T:{},n,s),accountAt:ey(c.account[g])}]}),arrived:Ia(d.arrived,f,v),budgetDay:i.budget==="used_up"?La(s):null})),{arrived:f.map(g=>{var w,E;return(E=(w=v.get(g))==null?void 0:w.name)!=null?E:g}),choose:k.length>0}}function Ia(e,t,n){var r;if(t.length===0)return e;let i=[...new Set([...(r=e==null?void 0:e.ids)!=null?r:[],...t])],o=new Map(e?e.ids.map((s,c)=>[s,e.names[c]]):[]);return{ids:i,names:i.map(s=>{var c,l,u;return(u=(l=(c=n.get(s))==null?void 0:c.name)!=null?l:o.get(s))!=null?u:s}),hidden:!1}}function Zf(e){if(!pe(e)||e.status!=="ok"||!Number.isSafeInteger(e.version)||typeof e.bytes!="number")return null;let t={};for(let i of Array.isArray(e.items)?e.items:[]){if(!pe(i)||typeof i.id!="string"||typeof i.size!="number")continue;let o=pe(i.data)?i.data:null;t[i.id]=m(m(m({data:o,size:i.size},typeof i.held=="number"?{held:i.held}:{}),i.off===!0?{off:!0}:{}),i.mine===!0?{mine:!0}:{})}let n={};if(pe(e.results))for(let[i,o]of Object.entries(e.results))typeof o=="string"&&(n[i]=o);return{version:e.version,bytes:e.bytes,budget:e.budget==="used_up"?"used_up":"open",results:n,items:t}}async function Ra(e){let t=await Ee();if(!t)return;let n=await en(),i=Pe(),o=[];for(let[s,c]of Object.entries(e)){let l=t.items.find(d=>d.id===s),u=n.account[s];!l||!(u!=null&&u.data)||u.off||(c==="account"&&await _a(t,l,u)&&o.push(s),n.base[s]=eo(u),n.seen[s]=J(u.data))}n.firstSyncDone=!0,await Qn(n);let r=new Map(i.choices.map(s=>[s.id,{id:s.id,key:"",name:s.name,kind:s.kind}]));ht(b(m({},i),{choices:[],arrived:Ia(i.arrived,o,r)}))}function Qf(e,t,n,i){var r;if(e.storage.type==="indexedDB"&&e.storage.valueField){let s=Object.values(t).flatMap(c=>pe(c)&&typeof c.ts=="number"?[c.ts]:[]);if(s.length>0)return Math.max(...s)}let o=i;for(let s of n){let c=(r=s.extension_settings)==null?void 0:r[e.id];if(!c||c.storage!==e.storage.type||!Yn(e,t,Aa(e,c.values)))break;let l=Date.parse(s.metadata.last_sync_datetime);if(Number.isNaN(l))break;o=l}return o}function ey(e){var t;return Math.max(0,...Object.values((t=e==null?void 0:e.data)!=null?t:{}).map(n=>n.t))}async function Ea(e,t){if(!e.workerUrl)throw new Error("Syncify backup service is not configured.");let{version:n}=await Gr(e.workerUrl,await me(),t),i=await en();i.deleted[t]=n,i.account[t]={data:null,size:0,off:!0},Ba(i,t),await Qn(i);let o=q();o.settingsSyncOff.includes(t)||tt(b(m({},o),{settingsSyncOff:[...o.settingsSyncOff,t]}));let r=Pe();ht(b(m({},r),{items:r.items.map(s=>s.id===t?b(m({},s),{hold:null}):s)}))}async function Na(){let e=await Ee();if(!e)return Pe().items;let[t,n]=await Promise.all([en(),Ta(e)]),i=Dt(e.items),o=Pe(),r=Pa(e,t,n,i,o.bytes);return ht(m(m({},o),r)),r.items}function ty(e){return[...e].sort((t,n)=>+(n.hold!==null)-+(t.hold!==null)||t.name.localeCompare(n.name))}function Pa(e,t,n,i,o){let r=e.items.flatMap(s=>{var S;let c=n.get(s.id);if(!c)return[];let l=Gn(s,c),u=t.account[s.id],d=l>s.limit?{size:l,reason:"too_big"}:(u==null?void 0:u.held)!==void 0&&!u.off?{size:u.held,reason:u.held>s.limit?"too_big":"account_full"}:null,f=(S=i.get(s.id))!=null?S:{id:s.id,key:"",name:s.id,kind:"extension"},y=u&&!u.off?u.size:0;return[b(m({},f),{size:l,limit:s.limit,list:Object.keys(s.lists).length>0,accountSize:y,hold:d})]});return{bytes:o,limit:e.accountLimit,items:ty(r)}}async function Ta(e){let{settings:t}=await ut(e),n=new Map;for(let i of e.items){let o=t[i.id];o&&n.set(i.id,Aa(i,o.values))}return n}function Aa(e,t){var i;let n={};for(let[o,r]of Object.entries(t))Be(e,o)&&(n[o]=e.lists[o]&&(i=ny(e,o,r))!=null?i:r);return n}function ny(e,t,n){let i=e.lists[t],o=n;if(e.storage.type==="localStorage"){if(typeof n!="string")return null;try{o=JSON.parse(n)}catch(r){return null}}else e.storage.valueField&&pe(n)&&(o=n[e.storage.valueField]);return qn(i,o)?o:null}function qn(e,t){return e?e.merge==="object"?pe(t):Array.isArray(t):!1}function iy(e,t,n){let i={};for(let[o,r]of Object.entries(t)){if(!Be(e,o))continue;let s=e.lists[o]&&qn(e.lists[o],r);e.storage.type==="localStorage"?s?i[o]=JSON.stringify(r):typeof r=="string"&&(i[o]=r):s&&e.storage.valueField?i[o]=b(m({},pe(n[o])?n[o]:{}),{[e.storage.valueField]:r}):i[o]=r}return i}async function _a(e,t,n){var c,l;let{settings:i}=await ut(b(m({},e),{items:[t]})),o=(l=(c=i[t.id])==null?void 0:c.values)!=null?l:{},r=iy(t,eo(n),o);if(Object.keys(r).length===0)return!1;let s={[t.id]:{storage:t.storage.type,values:r}};try{return await In(e,s,[t.id]),!0}catch(u){return!1}}function eo(e){var n;let t={};for(let[i,o]of Object.entries((n=e.data)!=null?n:{}))pe(o)&&o.v!==null&&o.v!==void 0&&(t[i]=o.v);return t}function Gn(e,t){let n={};for(let[i,o]of Object.entries(t))n[i]={v:o,t:Vf};return Object.keys(n).length===0?0:new TextEncoder().encode(JSON.stringify(n)).byteLength}function Yn(e,t,n){return[...new Set([...Object.keys(t),...Object.keys(n)])].every(o=>Ma(e,o,t[o],n[o]))}function Ma(e,t,n,i){if(n===void 0||i===void 0)return n===i;let o=e.storage.type==="indexedDB"&&!e.lists[t]?e.storage.valueField:void 0,r=s=>o&&pe(s)?s[o]:s;return J(r(n))===J(r(i))}function oy(e,t,n){let i={},o={};for(let s of new Set([...Object.keys(t),...Object.keys(n)])){let c=t[s],l=n[s];if(Ma(e,s,c,l))continue;let u=e.lists[s],d=u&&c!==void 0?ry(u,c,l):null;d?o[s]=d:i[s]=c===void 0?null:c}let r=m(m({},Object.keys(i).length>0?{set:i}:{}),Object.keys(o).length>0?{lists:o}:{});return Object.keys(r).length>0?r:null}function ry(e,t,n){if(!qn(e,t))return null;let i=qn(e,n)?n:e.merge==="object"?{}:[];if(e.merge==="object"){let d=t,f=i,y=Object.fromEntries(Object.entries(d).filter(([k,v])=>J(v)!==J(f[k]))),S=Object.keys(f).filter(k=>!(k in d));return m(m({},Object.keys(y).length>0?{put:y}:{}),S.length>0?{remove:S}:{})}let o=d=>{let f=pe(d)?d[e.id]:void 0;return typeof f=="string"||typeof f=="number"?f:null},r=t;if(r.some(d=>o(d)===null))return null;let s=new Map(i.flatMap(d=>o(d)===null?[]:[[JSON.stringify(o(d)),d]])),c=r.filter(d=>J(d)!==J(s.get(JSON.stringify(o(d))))),l=new Set(r.map(d=>JSON.stringify(o(d)))),u=[...s.entries()].filter(([d])=>!l.has(d)).flatMap(([,d])=>{var f;return(f=o(d))!=null?f:[]});return m(m({},c.length>0?{put:c}:{}),u.length>0?{remove:u}:{})}async function en(){let e=await be(va).catch(()=>{});return m(m({},structuredClone(qf)),pe(e)?e:{})}function Qn(e){return fe(va,e)}function Ba(e,t){delete e.base[t],delete e.seen[t],delete e.heldSent[t]}function La(e){return new Date(e).toISOString().slice(0,10)}function pe(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}var to="syncify:claim-check-day",Oa="syncify:undone-claim-shown";async function Da(e){var n,i;let t=q();if(xa(),!!t.workerUrl){if(!t.autoBackupEnabled)return sy(e);try{let o=await Qt(t).catch(()=>null),[r,s]=await Promise.all([Mn(),nt(t,void 0,o)]),c=await Ua(o,s);$a(s,e,c);let l=(i=(n=s.payload)==null?void 0:n.metadata.marketplace_key_count)!=null?i:0;if(s.backups.some(f=>f.payload_hash===r.hash))return;let u=[s.safetyCopy,...s.pinned].some(f=>(f==null?void 0:f.payload_hash)===r.hash);if(s.exists&&!u&&xs(r.keyCount,l)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(r.keyCount===0)return;let{unapproved:d}=await Xt(t);Spicetify.showNotification(d?"Syncify: backed up, this device needs approval":"Syncify auto-backup complete")}catch(o){if(o instanceof ye||o instanceof Ze){Spicetify.showNotification("Syncify: sign in to keep backing up",!0,8e3);return}let r=o instanceof Error?o.message:String(o);console.warn("Syncify startup sync failed:",o),Spicetify.showNotification(`Syncify auto-sync skipped: ${r}`,!0,8e3)}}}async function sy(e){let t=new Date().toLocaleDateString("en-CA");if(Ha(to)!==t)try{let n=q(),i=await Qt(n).catch(()=>null),o=await ca(n,i);no(to,t);let r=await Ua(i,o);$a(o,e,r)}catch(n){if(n instanceof ye){no(to,t);return}console.warn("Syncify claim check failed:",n)}}async function Ua(e,t){if(!e)return!1;try{let n=await Zn(e,t.settings,t.backups);return n.arrived.length>0&&Spicetify.showNotification(Xn(n.arrived)),n.choose}catch(n){return console.warn("Syncify extension settings sync failed:",n),!1}}function $a(e,t,n){var s;let i=ay(e.claim),o=cy(e.claim),r=(s=e.install)==null?void 0:s.waiting[0];i?t.onClaim(i):o?t.onUndone(o)&&no(Oa,String(o.undone_at)):r?t.onInstall(r):e.nudge&&!ha()?t.onNudge():n&&t.onFirstSync()}function ay(e){return(e==null?void 0:e.status)==="pending"&&!e.mine&&!e.not_me?e:null}function cy(e){return(e==null?void 0:e.status)==="undone"&&Ha(Oa)!==String(e.undone_at)?e:null}function Ha(e){var t,n;return(n=(t=Spicetify.LocalStorage)==null?void 0:t.get(e))!=null?n:window.localStorage.getItem(e)}function no(e,t){var n;(n=Spicetify.LocalStorage)!=null&&n.set?Spicetify.LocalStorage.set(e,t):window.localStorage.setItem(e,t)}var oo="syncify:pending-restore",ly=600*1e3,uy=2e3,dy=15e3,fy="marketplace:theme-installed",yy="raw.githubusercontent.com",my=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],Te=null,io=new Set,Fa=new Map;function ja(){return Te}function Wa(e){return io.add(e),()=>io.delete(e)}function Ya(){Te&&Xa(b(m({},Te),{manual:[]}))}function nn(e,t="restore"){try{localStorage.setItem(oo,JSON.stringify({at:Date.now(),manual:e,kind:t}))}catch(n){}}function Va(){var e;nn((e=Te==null?void 0:Te.manual)!=null?e:[],Te==null?void 0:Te.kind),window.location.reload()}function qa(){Za()&&(document.addEventListener("load",e=>Ka(e.target,"load"),!0),document.addEventListener("error",e=>Ka(e.target,"error"),!0))}async function Ga(){let e=Za();if(!e)return;try{localStorage.removeItem(oo)}catch(s){}let t=Date.now(),n=await za();for(;n.loaded<n.total&&Date.now()-t<dy;)await new Promise(s=>setTimeout(s,uy)),n=await za();Xa(b(m({kind:e.kind,at:Date.now()},n),{manual:e.manual}));let i=n.loaded===n.total&&e.manual.length===0,o=e.kind==="share"?"Setup applied":"Backup restored",r=e.kind==="share"?"loaded":"restored";Spicetify.showNotification(i?`Syncify: ${o}; ${n.total} ${n.total===1?"item":"items"}`:`Syncify: ${r} ${n.loaded} of ${n.total}. Open Syncify for details.`,!1,8e3)}function Ja(e){let t=e.map(n=>n.type==="extension"?`spicetify config extensions ${ei(n.name)}`:n.type==="custom_app"?`spicetify config custom_apps ${ei(n.name)}`:`spicetify config current_theme ${ei(n.name)}${n.scheme?` color_scheme ${ei(n.scheme)}`:""}`);return t.length>0?[...t,"spicetify apply"]:[]}function ei(e){return/^[\w.@+/-]+$/.test(e)?e:`"${e}"`}function Xa(e){Te=e;for(let t of io)t(e)}function Za(){var e;try{let t=JSON.parse((e=localStorage.getItem(oo))!=null?e:"null");return!t||Date.now()-t.at>ly?null:{manual:Array.isArray(t.manual)?t.manual:[],kind:t.kind==="share"?"share":"restore"}}catch(t){return null}}function Ka(e,t){e instanceof HTMLScriptElement&&e.src&&Fa.set(tn(e.src),t)}async function za(){var i;let e=await we(),t=(i=e[fy])!=null?i:"",n=ie(e).filter(o=>o.type==="extension"&&o.sources.length>0||o.type==="theme"&&t.includes(o.key)||o.type==="snippet");return{loaded:n.filter(py).length,total:n.length}}function py(e){var t,n;if(e.type==="snippet"){let i=document.querySelector("style.marketplaceSnippets");return((t=i==null?void 0:i.textContent)==null?void 0:t.includes(`/* ${e.name} - `))===!0}if(e.type==="theme"){let i=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((n=i==null?void 0:i.textContent)!=null&&n.trim())}return gy(e.sources[0]).some(hy)}function gy(e){let t;try{t=new URL(e)}catch(s){return[]}if(t.host!==yy)return[tn(t.href)];let[n,i,o,...r]=t.pathname.split("/").filter(Boolean);return!n||!i||!o||r.length===0?[]:my.map(s=>tn(`https://${s}/gh/${n}/${i}@${o}/${r.join("/")}`))}function hy(e){let t=Fa.get(e);return t?t==="load":[...document.querySelectorAll("script[src]")].some(i=>tn(i.src)===e)&&performance.getEntriesByType("resource").some(i=>tn(i.name)===e)}function tn(e){try{let t=new URL(e);return`${t.origin}${t.pathname}`}catch(t){return e}}var ro=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var Qa=".main-actionButtons",by=".Root__globalNav, .Root__top-bar",wy=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function ec(e){let t=new Spicetify.Topbar.Button(U().extensionName,ro,e,!1,!0);return tc(t),ky(t),t}function tc(e){var t;e.element.style.setProperty("-webkit-app-region","no-drag"),(t=e.button)==null||t.style.setProperty("-webkit-app-region","no-drag")}function ky(e){if(typeof MutationObserver=="undefined")return;let t=!1,n=null,i=()=>{t=!1,r();let s=e.element,c=document.querySelector(Qa);!s||!c||c.contains(s)||(c.prepend(s),vy(e),tc(e),oe("Topbar button re-attached"))},o=new MutationObserver(()=>{t||(t=!0,setTimeout(i,250))}),r=()=>{var l;if(n!=null&&n.isConnected)return;let s=document.querySelector(Qa),c=(l=s==null?void 0:s.closest(by))!=null?l:s==null?void 0:s.parentElement;if(o.disconnect(),n=c!=null?c:null,!c){o.observe(document.body,{childList:!0,subtree:!0});return}o.observe(c,{childList:!0,subtree:!0});for(let u=c.parentElement;u;u=u.parentElement)o.observe(u,{childList:!0})};i()}function vy(e){let t=e.button;if(!t||t.className&&t.className!=="undefined")return;let n=Array.from(document.querySelectorAll(wy)).find(i=>!e.element.contains(i));n!=null&&n.className&&(t.className=n.className)}function nc(e){if(!Hn())return null;try{return new Spicetify.Menu.Item(U().extensionName,!1,e,xy())}catch(t){return ae("Failed to create profile menu item",t),null}}function xy(){return ro.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}var Cy="syncify:beta",ic=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function oc(){var e;return(e=window.SyncifyLoader)!=null?e:null}function Iy(){try{return window.localStorage.getItem(Cy)==="true"}catch(e){return!1}}async function rc(e){let t=Iy()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(t.map(i=>Ry(`${e}/${i}`)))).reduce((i,o)=>o&&(!i||ao(o,i)>0)?o:i,null)}function so(e){return typeof e=="string"&&ic.test(e)}function ao(e,t){let[n,i]=[e,t].map(o=>{var u;let[,r,s,c,l]=(u=ic.exec(o))!=null?u:[];return[r,s,c,l!=null?l:1/0].map(Number)});for(let o=0;o<n.length;o+=1)if(n[o]!==i[o])return n[o]<i[o]?-1:1;return 0}async function Ry(e,t=3e3){let n=typeof AbortController=="function"?new AbortController:null,i=setTimeout(()=>n==null?void 0:n.abort(),t);try{let o=await fetch(e,{signal:n==null?void 0:n.signal});if(!o.ok)return null;let r=await o.json();return so(r==null?void 0:r.version)?r.version:null}catch(o){return null}finally{clearTimeout(i)}}function St(...e){return e.filter(Boolean).join(" ")}function co(e,t){return t===void 0?e:b(m({},e),{key:t})}function a(e,t,n){let r=t,{children:i}=r,o=Se(r,["children"]);return i===void 0?Et(e,co(o,n)):Et(e,co(o,n),i)}function p(e,t,n){let s=t,{children:i}=s,o=Se(s,["children"]),r=Array.isArray(i)?i:[i];return Et(e,co(o,n),...r)}var Ey={primary:"regular",secondary:"regular",danger:"regular",text:"small",subtle:"small"};function C(e){let l=e,{variant:t="primary",size:n=Ey[t],type:i="button",icon:o,children:r,className:s}=l,c=Se(l,["variant","size","type","icon","children","className"]);return p("button",b(m({className:St("syncify-btn",s),"data-variant":t,"data-size":n,type:i},c),{children:[o,a("span",{className:"syncify-cap",children:r})]}))}function lo(e){return a("input",{className:"syncify-checkbox",type:"checkbox","aria-label":e.label,checked:e.checked,onChange:t=>e.onChange(t.currentTarget.checked),disabled:e.disabled})}function uo(e){return p("label",{className:"syncify-checkbox-row","data-disabled":e.disabled?"true":void 0,children:[a("input",{className:"syncify-checkbox",type:"checkbox",checked:e.checked,onChange:t=>e.onChange(t.currentTarget.checked),disabled:e.disabled}),a("span",{className:"syncify-checkbox-label",children:e.label})]})}var Ny=0;function F(e){let[t]=h(()=>`syncify-${e}-${++Ny}`);return t}function ti(e){return p("div",{className:"syncify-dialog-content",children:[a("h2",{className:"syncify-dialog-title",id:e.titleId,children:e.title}),e.children?a("div",{className:"syncify-dialog-text",children:e.children}):null,a("div",{className:"syncify-dialog-actions",children:e.actions})]})}function on(e){let t=z(null),n=F("dialog"),{open:i}=e,o=z(e.onClose);return Nt(()=>{o.current=e.onClose}),A(()=>{let r=t.current;if(!r||!i)return;let s=document.activeElement;r.open||r.showModal();let c=l=>{l.preventDefault(),o.current()};return r.addEventListener("cancel",c),()=>{r.removeEventListener("cancel",c),r.open&&r.close(),s instanceof HTMLElement&&s.isConnected&&s.focus()}},[i]),i?a("dialog",{className:"syncify-dialog","data-width":e.wide?"wide":void 0,ref:t,"aria-labelledby":n,children:a(ti,{title:e.title,actions:e.actions,titleId:n,children:e.children})}):null}function Le(e){var o,r;let t=F("field"),n=`${t}-error`,i=!!e.error;return p("div",{className:"syncify-field-group",children:[a("label",{className:"syncify-field-label",htmlFor:t,children:e.label}),p("div",{className:"syncify-field-row",children:[p("span",{className:"syncify-input-box","data-invalid":i?"true":void 0,"data-disabled":e.disabled?"true":void 0,children:[e.prefix?a("span",{className:"syncify-input-prefix","aria-hidden":"true",children:e.prefix}):null,a("input",{className:"syncify-input-control",id:t,type:(o=e.type)!=null?o:"text",value:e.value,onChange:s=>e.onChange(s.currentTarget.value),onBlur:e.onBlur,placeholder:e.placeholder,inputMode:e.inputMode,autoComplete:(r=e.autoComplete)!=null?r:"off",spellCheck:!1,maxLength:e.maxLength,disabled:e.disabled,autoFocus:e.autoFocus,"aria-invalid":i||void 0,"aria-describedby":i?n:void 0,"data-mono":e.mono?"true":void 0})]}),e.action]}),i?a("span",{className:"syncify-field-error",id:n,role:"alert",children:e.error}):null]})}function ze(e){let o=e,{children:t,className:n}=o,i=Se(o,["children","className"]);return a("svg",b(m({className:St("syncify-icon",n),viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},i),{children:t}))}function sc(e){return a(ze,b(m({},e),{children:a("path",{d:"m9 6 6 6-6 6"})}))}function ac(e){return p(ze,b(m({},e),{children:[a("path",{d:"M7 7h10v10"}),a("path",{d:"M7 17 17 7"})]}))}function cc(e){return a(ze,b(m({},e),{children:a("path",{d:"m6 9 6 6 6-6"})}))}function Oe(e){return a(ze,b(m({},e),{children:a("path",{d:"M5 12.5l4.5 4.5L19 7.5"})}))}function fo(e){return a(ze,b(m({},e),{children:a("path",{d:"M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z"})}))}function ni(e){return p(ze,b(m({},e),{children:[a("path",{d:"M12 17v5"}),a("path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"})]}))}function lc(e){return p(ze,b(m({},e),{"data-filled":"true",children:[a("rect",{x:"4",y:"10.5",width:"3",height:"3",rx:"0.75"}),a("rect",{x:"10.5",y:"10.5",width:"3",height:"3",rx:"0.75"}),a("rect",{x:"17",y:"10.5",width:"3",height:"3",rx:"0.75"})]}))}function yo(e){return p(ze,b(m({},e),{children:[a("path",{d:"M12 6v7"}),a("path",{d:"M12 17.5v.5"})]}))}function mo(e){let o=e,{keys:t,recording:n}=o,i=Se(o,["keys","recording"]);return a("button",b(m({className:"syncify-keycap",type:"button","data-recording":n?"true":void 0},i),{children:a("span",{className:"syncify-cap",children:t})}))}function G(e){return a("ul",{className:"syncify-list","aria-label":e.label,"aria-busy":e.busy?"true":void 0,"data-wrap":e.wrap?"true":void 0,children:e.children})}function Fe(){return a("li",{className:"syncify-list-divider",role:"presentation"})}function W(e){let t=p(B,{children:[e.leading?a("span",{className:"syncify-row-leading",children:e.leading}):null,p("span",{className:"syncify-row-name",children:[a("span",{className:"syncify-row-name-text",children:e.name}),e.nameMark]}),e.meta?a("span",{className:"syncify-row-meta",children:e.meta}):null,e.end?a("span",{className:"syncify-row-end",children:e.end}):null]}),n=e.meta?"2":"1";return a("li",{className:"syncify-list-item",children:e.onOpen?p("button",{className:"syncify-row",id:e.id,"data-lines":n,type:"button","aria-label":e.openLabel,onClick:e.onOpen,disabled:e.disabled,children:[t,e.external?a(ac,{className:"syncify-row-chevron"}):a(sc,{className:"syncify-row-chevron"})]}):a("div",{className:"syncify-row",id:e.id,"data-lines":n,"data-plain":e.plain?"true":void 0,children:t})})}function ke(e){return a("span",{className:"syncify-mark-square","data-tone":e.tone,"data-size":e.icon?"large":"small",role:e.label?"img":void 0,"aria-label":e.label,"aria-hidden":e.label?void 0:"true",children:e.icon})}function po(e){return a("span",{className:"syncify-badge",role:"img","aria-label":e.label,children:a("span",{className:"syncify-cap",children:e.count})})}function ve(e){let t=F("menu"),[n,i]=h(!1),o=z(null),r=z(null),s=e.items.some(f=>f.checked!==void 0);A(()=>{var w,E;let f=r.current,y=o.current;if(!n||!f||!y)return;Ty(f),My(f,y);let S=uc(f);(E=(w=S.find(T=>T.getAttribute("aria-checked")==="true"))!=null?w:S[0])==null||E.focus();let k=()=>i(!1),v=T=>{let N=T.target;N instanceof Node&&!f.contains(N)&&!y.contains(N)&&k()},g=T=>{T.target instanceof Node&&f.contains(T.target)||k()};return document.addEventListener("pointerdown",v,!0),document.addEventListener("scroll",g,!0),window.addEventListener("resize",k),()=>{document.removeEventListener("pointerdown",v,!0),document.removeEventListener("scroll",g,!0),window.removeEventListener("resize",k),Ay(f)}},[n]);function c(){var f;i(!1),(f=o.current)==null||f.focus()}function l(f){let y=uc(f.currentTarget),S=y.findIndex(v=>v===document.activeElement),k=f.key==="ArrowDown"?y[(S+1)%y.length]:f.key==="ArrowUp"?y[(S-1+y.length)%y.length]:f.key==="Home"?y[0]:f.key==="End"?y[y.length-1]:null;k?(f.preventDefault(),k.focus()):f.key==="Escape"?(f.preventDefault(),c()):f.key==="Tab"&&i(!1)}function u(f){(f.key==="ArrowDown"||f.key==="ArrowUp")&&(f.preventDefault(),i(!0))}let d={ref:o,type:"button","aria-haspopup":"menu","aria-expanded":n,"aria-controls":n?t:void 0,disabled:e.disabled,onClick:()=>i(!n),onKeyDown:u};return p(B,{children:[e.trigger==="more"?a("button",b(m({className:"syncify-icon-btn","aria-label":e.label},d),{children:a(lc,{})})):p("button",b(m({className:"syncify-menu-value","aria-label":`${e.label}: ${e.trigger.value}`},d),{children:[a("span",{className:"syncify-cap",children:e.trigger.value}),a(cc,{})]})),n?a("div",{className:"syncify-menu",id:t,ref:r,role:"menu","aria-label":e.label,popover:"manual",onKeyDown:l,children:e.items.map(f=>a(Py,{item:f,picks:s,onPick:()=>{c(),f.onSelect()}},f.label))}):null]})}function Py(e){let{item:t,picks:n}=e;return p("button",{className:"syncify-menu-item",type:"button",role:n?"menuitemradio":"menuitem","aria-checked":n?t.checked===!0:void 0,"data-danger":t.danger?"true":void 0,tabIndex:-1,disabled:t.disabled,onClick:e.onPick,children:[a("span",{className:"syncify-cap",children:t.label}),t.checked?a(Oe,{}):null]})}function uc(e){return[...e.querySelectorAll(".syncify-menu-item:not(:disabled)")]}function Ty(e){typeof e.showPopover=="function"&&!e.matches(":popover-open")&&e.showPopover()}function Ay(e){typeof e.hidePopover=="function"&&e.matches(":popover-open")&&e.hidePopover()}var _y=4;function My(e,t){let n=_y,i=t.getBoundingClientRect(),o=e.getBoundingClientRect(),r=i.bottom+n,s=r+o.height>window.innerHeight&&i.top-n-o.height>=0?i.top-n-o.height:r,c=Math.min(Math.max(i.right-o.width,n),window.innerWidth-o.width-n);e.style.top=`${s}px`,e.style.left=`${c}px`}function By(){return p(B,{children:[a("span",{className:"syncify-dot","aria-hidden":"true"}),a("span",{className:"syncify-visually-hidden",children:", "})]})}function j(e){let t=e.parts.filter(n=>n!=null&&n!==!1&&n!=="");return a("span",{className:St("syncify-meta",e.className),children:t.map((n,i)=>p(B,{children:[i>0?a(By,{}):null,a("span",{className:"syncify-meta-part",children:n})]},i))})}function go(e){let t=Math.min(Math.max(e.used,0),e.max),n=`Used ${e.used} of ${e.max}`;return p("span",{className:"syncify-meter",role:"meter","aria-label":e.label,"aria-valuemin":0,"aria-valuemax":e.max,"aria-valuenow":t,"aria-valuetext":n,"data-full":e.used>=e.max?"true":void 0,children:[a("span",{className:"syncify-cap",children:n}),a("span",{className:"syncify-meter-bars","aria-hidden":"true",children:Array.from({length:e.max},(i,o)=>a("span",{className:"syncify-meter-bar","data-used":o<t?"true":void 0},o))})]})}function ho(e){let t=`${xe(e.used)} of ${xe(e.max)}`,n=e.max>0?Math.min(Math.max(e.used/e.max,0),1):0;return p("span",{className:"syncify-usage",role:"meter","aria-label":"Space used","aria-valuemin":0,"aria-valuemax":e.max,"aria-valuenow":Math.min(e.used,e.max),"aria-valuetext":t,"data-warning":e.warning?"true":void 0,children:[a("span",{className:"syncify-cap",children:"Space used"}),a("span",{className:"syncify-usage-bar","aria-hidden":"true",children:a("span",{className:"syncify-usage-fill",style:{width:`${n*100}%`}})}),a("span",{className:"syncify-cap",children:t})]})}function xe(e){return`${Math.ceil(Math.max(e,0)/1024)} KB`}function O(e){let t=e.tone==="error"?"alert":e.live?"status":void 0;return p("div",{className:"syncify-notice","data-tone":e.tone,role:t,children:[p("span",{className:"syncify-notice-body",children:[e.bare?null:a("span",{className:"syncify-notice-mark",children:a(ke,{tone:e.tone})}),a("span",{className:"syncify-notice-text",children:e.children})]}),e.actions?a("span",{className:"syncify-notice-actions",children:e.actions}):null]})}function ce(e){return a("span",{className:"syncify-pip-square","data-kind":e.kind,"aria-hidden":"true"})}function ii(e){return p("label",{className:"syncify-radio-row","data-disabled":e.disabled?"true":void 0,children:[a("input",{className:"syncify-radio",type:"radio",name:e.name,checked:e.checked,onChange:()=>e.onChange(),disabled:e.disabled}),a("span",{className:"syncify-radio-label",children:e.label})]})}function re(e){return p("div",{className:"syncify-section-label",children:[a("h3",{className:"syncify-section-label-title",id:e.id,tabIndex:e.focusable?-1:void 0,children:e.title}),e.end]})}function se(e){return p("div",{className:"syncify-setting-row",children:[p("span",{className:"syncify-setting-row-text",children:[a("span",{className:"syncify-setting-row-label",children:e.label}),e.value?a("span",{className:"syncify-setting-row-value",children:e.value}):null]}),e.children]})}function rn(e){return a("div",{className:"syncify-setting-group",role:"group","aria-label":e.label,children:e.children})}function Ce(e){return e.shape==="item"?a("li",{className:"syncify-list-item","aria-hidden":"true",children:p("div",{className:"syncify-row","data-lines":"1",children:[a("span",{className:"syncify-row-leading",children:a("span",{className:"syncify-skeleton","data-width":"pip"})}),a("span",{className:"syncify-row-name",children:a("span",{className:"syncify-skeleton","data-width":"name"})}),p("span",{className:"syncify-row-end",children:[a("span",{className:"syncify-skeleton","data-width":"size"}),a("span",{className:"syncify-skeleton","data-width":"switch"}),a("span",{className:"syncify-skeleton","data-width":"menu"})]})]})}):a("li",{className:"syncify-list-item","aria-hidden":"true",children:p("div",{className:"syncify-row","data-lines":"2",children:[a("span",{className:"syncify-row-name",children:a("span",{className:"syncify-skeleton","data-width":"name"})}),a("span",{className:"syncify-row-meta",children:a("span",{className:"syncify-skeleton","data-width":"meta"})})]})})}function oi(e){return a("input",{className:"syncify-switch-control",type:"checkbox",role:"switch","aria-label":e.label,checked:e.checked,onChange:t=>e.onChange(t.currentTarget.checked),disabled:e.disabled})}function sn(e){let i=e,{label:t}=i,n=Se(i,["label"]);return p("label",{className:"syncify-setting-row","data-disabled":e.disabled?"true":void 0,children:[a("span",{className:"syncify-setting-row-label",children:t}),a(oi,m({},n))]})}var dc=(e,t)=>`${e}-tab-${t}`,fc=(e,t)=>`${e}-panel-${t}`;function So(e){let t=z(null);A(()=>{var i,o,r;(r=(o=(i=t.current)==null?void 0:i.querySelector('[aria-selected="true"]'))==null?void 0:o.scrollIntoView)==null||r.call(o,{block:"nearest",inline:"nearest"})},[e.selected]);function n(i){var c,l;let o=e.tabs.length,r=e.tabs.findIndex(u=>u.id===e.selected),s=i.key==="ArrowRight"?(r+1)%o:i.key==="ArrowLeft"?(r-1+o)%o:i.key==="Home"?0:i.key==="End"?o-1:null;s!==null&&(i.preventDefault(),e.onSelect(e.tabs[s].id),(l=(c=t.current)==null?void 0:c.querySelectorAll('[role="tab"]')[s])==null||l.focus())}return a("div",{className:"syncify-tabs",role:"tablist","aria-label":e.label,ref:t,onKeyDown:n,children:e.tabs.map(i=>{let o=i.id===e.selected;return p("button",{className:"syncify-tab",id:dc(e.idBase,i.id),type:"button",role:"tab","aria-selected":o,"aria-controls":fc(e.idBase,i.id),tabIndex:o?0:-1,onClick:()=>e.onSelect(i.id),children:[a("span",{className:"syncify-cap",children:i.label}),i.status]},i.id)})})}function X(e){return p("div",{className:"syncify-tab-panel",id:fc(e.idBase,e.id),role:"tabpanel","aria-labelledby":dc(e.idBase,e.id),children:[a("div",{className:"syncify-tab-scroll",tabIndex:0,children:e.children}),e.actions?a("div",{className:"syncify-tab-actions",children:e.actions}):null]})}function Ae(e){let t=z(e);return Nt(()=>{t.current=e}),t}function Z(e){if(e.startsWith("mailto:")){window.location.href=e;return}window.open(e,"_blank","noopener,noreferrer")}function ri(e){let t=e.lastIndexOf("@");if(t<1)return e;let n=e.slice(0,t);return n.length<=2?e:`${n[0]}${"*".repeat(n.length-2)}${n[n.length-1]}${e.slice(t)}`}function mc(e,t=new Date){let n=new Date(e);return n.toDateString()===t.toDateString()?"today":n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===t.getFullYear()?void 0:"numeric"})}function pc(e){let t=mc(e);return t==="today"?t:`on ${t}`}function yc(e){let t=mc(e);return t==="today"?t:`by ${t}`}function si(e,t){var n;return e.not_me?{title:"Syncify is checking who is securing this backup",text:null}:{title:`${(n=e.email)!=null?n:"Someone"} is securing this backup`,text:e.held?"Syncify is checking who is securing it.":t?`If that isn't you, press Not me ${yc(e.final_at)}.`:`If that's your email, sign in to Syncify here. If it isn't, press Not me ${yc(e.final_at)}.`}}function gc(e){var t;return`This backup is no longer secured by ${(t=e.email)!=null?t:"another account"}`}function ai(e,t){return e==="checking"?"Syncify: sent for a check":t?`Syncify: ${t} won't secure this backup`:"Syncify: this backup won't be secured"}function ci(e){return e.device?`Syncify on ${e.device} wants to back up this Spotify account`:"Another device wants to back up this Spotify account"}function li(e){return e==="approve"?"Syncify: device approved":"Syncify: device refused"}function hc(e,t,n){var s,c;if(t==="not_owner")return{kind:"other-account"};if(!e)return n?{kind:"other-claim"}:{kind:"unknown"};let{claim:i}=e;if((i==null?void 0:i.status)==="final"){if(!i.mine)return{kind:"other-account"};let l=((s=e.accounts)!=null?s:[]).filter(u=>u.status==="final").length;return{kind:"secured",linkedCount:Math.max(l,1)}}if((i==null?void 0:i.status)==="pending")return i.mine?{kind:"pending",finalAt:i.final_at,held:i.held}:{kind:"other-claim"};let o=((c=e.accounts)!=null?c:[]).filter(l=>l.hash===e.hash),r=o[o.length-1];return(r==null?void 0:r.status)==="unlinked"?{kind:"ended",reason:"undone"}:(r==null?void 0:r.status)==="cancelled"&&r.cancelled_by!=="claimer"?{kind:"ended",reason:r.cancelled_by==="owner"?"owner":"admin"}:{kind:"open"}}function Sc(e,t,n){return t?{kind:"warning",label:"Sign in to see your backups"}:e?n.kind==="secured"?{kind:"ok",label:"Signed in, backup secured"}:n.kind==="pending"?null:n.kind==="open"?{kind:"warning",label:"Backup not secured yet"}:n.kind==="ended"?{kind:"warning",label:"Backup not secured"}:{kind:"ok",label:"Signed in"}:null}function bc(e){return e.held?"Syncify is checking your request to secure this backup":`Your backup will be secured ${pc(e.finalAt)}`}var an=6,Ly=600*1e3,Oy=300,Dy=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function bo(e){return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function wc(e){let[t,n]=h(()=>wn()),[i,o]=h(()=>wn().email),[r,s]=h(""),[c,l]=h(!1),[u,d]=h(null),[f,y]=h(()=>Date.now()),S=!!(t.codeSentAt&&f-t.codeSentAt<Ly),k=Math.max(0,Math.ceil((t.retryAt-f)/1e3)),v=t.retryEmail===null||t.retryEmail===i.trim().toLowerCase()?k:0;A(()=>{if(t.retryAt<=Date.now())return;let N=setInterval(()=>{y(Date.now()),t.retryAt<=Date.now()&&clearInterval(N)},1e3);return()=>clearInterval(N)},[t.retryAt]);function g(N){let x=m(m({},wn()),N);Br(x),n(x),y(Date.now())}async function w(N){var _;let x=N.trim();if(!Dy.test(x)){d("Enter a valid email address.");return}l(!0),d(null);try{let I=await Ur(x,{nudge:e.nudge});g({email:x,codeSentAt:Date.now(),retryAt:Date.now()+I*1e3,retryEmail:x.toLowerCase()}),s("")}catch(I){let M=I instanceof D?I:null,Y=(_=M==null?void 0:M.retryAfter)!=null?_:null,P=Y&&Y<=Oy?Date.now()+Y*1e3:0,L=(M==null?void 0:M.code)==="too_many_requests"?null:x.toLowerCase();if((M==null?void 0:M.code)==="resend_wait"){g({email:x,codeSentAt:t.email===x&&t.codeSentAt?t.codeSentAt:Date.now(),retryAt:P,retryEmail:L});return}P&&g({retryAt:P,retryEmail:L}),d($e(I))}finally{l(!1)}}async function E(){l(!0),d(null);try{let N=await $r(t.email,r);g({codeSentAt:null}),s(""),e.onSignedIn(N)}catch(N){d($e(N));let x=N instanceof D?N.code:null;(x==="too_many_attempts"||x==="code_expired")&&s("")}finally{l(!1)}}async function T(N){l(!0),d(null),await Kr(),g({email:N,codeSentAt:null}),o(N),l(!1)}return{draft:t,email:i,setEmail:o,code:r,setCode:N=>s(N.replace(/\D/g,"").slice(0,an)),busy:c,error:u,codeSent:S,waitSeconds:k,emailWaitSeconds:v,requestCode:w,verify:E,signOut:T,useAnotherEmail:()=>{g({codeSentAt:null}),s(""),d(null)}}}function kc(e){let{signIn:t}=e,{busy:n}=t;return a("form",{className:"syncify-account-form",noValidate:!0,onSubmit:i=>{i.preventDefault(),!n&&(t.codeSent?t.code.length===an&&t.verify():t.emailWaitSeconds||t.requestCode(t.email))},children:t.codeSent?p(B,{children:[a(Le,{label:`Code sent to ${ri(t.draft.email)}`,value:t.code,onChange:t.setCode,error:t.error,placeholder:"123456",inputMode:"numeric",autoComplete:"one-time-code",maxLength:an,mono:!0,autoFocus:!0,action:a(C,{type:"submit",disabled:n||t.code.length!==an,children:n?"Verifying\u2026":"Verify"})}),p("span",{className:"syncify-account-resend",children:[a(C,{variant:"text",onClick:()=>{t.requestCode(t.draft.email)},disabled:n||t.waitSeconds>0,children:t.waitSeconds>0?`Resend in ${bo(t.waitSeconds)}`:"Resend code"}),a(C,{variant:"text",onClick:t.useAnotherEmail,disabled:n,children:"Use another email"})]})]}):a(Le,{label:"Email for sign-in codes",type:"email",value:t.email,onChange:t.setEmail,error:t.error,placeholder:"you@example.com",autoComplete:"email",autoFocus:!0,action:a(C,{type:"submit",disabled:n||t.emailWaitSeconds>0||!t.email.trim(),children:n?"Sending\u2026":t.emailWaitSeconds>0?`Send in ${bo(t.emailWaitSeconds)}`:"Send code"})})})}var Uy={owner:"This backup isn't secured. Someone using this Spotify account said it isn't yours.",admin:"This backup isn't secured. Syncify couldn't confirm it's yours.",undone:"This backup is no longer secured by your account."};function vc(e){let{session:t,secure:n,handle:i}=e,o=wc({nudge:e.nudge,onSignedIn:e.onSignedIn}),[r,s]=h(null),[c,l]=h(!1),u=Ae(w=>{t&&Hr().then(E=>{!w()||E||(s({kind:"warning",text:$e(new D("signed_out"))}),e.onSignedOut())}).catch(()=>{})}),d=t==null?void 0:t.token;A(()=>{let w=!0;return u.current(()=>w),()=>{w=!1}},[u,d]);let f=Ae(w=>{!t||i!==void 0||Dn().then(E=>{var T,N;w()&&e.onHandle((N=(T=E.profile)==null?void 0:T.handle)!=null?N:null)}).catch(()=>{})});A(()=>{let w=!0;return f.current(()=>w),()=>{w=!1}},[f,!!t&&i===void 0]);async function S(){l(!0),s(null);try{Z(await zr())}catch(w){let E=w instanceof D&&w.code==="signed_out";s({kind:E?"warning":"error",text:$e(w)}),E&&e.onSignedOut()}finally{l(!1)}}async function k(){var w;s(null),await o.signOut((w=t==null?void 0:t.email)!=null?w:""),e.onSignedOut()}if(t===void 0)return a(X,{idBase:e.idBase,id:"account",children:null});if(!t)return p(X,{idBase:e.idBase,id:"account",children:[a("p",{className:"syncify-tab-text",children:e.locked?"Sign in with the email that secured this backup":"Sign in to secure your backup so only you can restore it"}),r?a(O,{tone:r.kind,live:!0,children:r.text}):null,a(kc,{signIn:o})]});let v=n.kind==="open"||n.kind==="other-claim"||n.kind==="ended"&&n.reason!=="undone",g=o.busy||c;return p(X,{idBase:e.idBase,id:"account",children:[p(rn,{children:[a(se,{label:"Email for sign-in codes",value:ri(t.email)}),i?a(se,{label:"Creator handle",value:`@${i}`}):null,a(se,{label:"Your account page",children:a(C,{variant:"secondary",size:"small",onClick:()=>{S()},disabled:g,children:"Open"})}),v?a(se,{label:"Secure your backup so only you can restore it",children:a(C,{onClick:e.onSecure,disabled:g||e.securing||n.kind==="other-claim",children:e.securing?"Securing\u2026":n.kind==="ended"?"Secure again":"Secure"})}):null]}),n.kind==="ended"?a(O,{tone:"warning",children:Uy[n.reason]}):null,e.secureError?a(O,{tone:"error",children:e.secureError}):null,r?a(O,{tone:r.kind,live:!0,children:r.text}):null,p("div",{className:"syncify-account-footer",children:[p("span",{className:"syncify-account-status",children:[n.kind==="secured"?a(Oe,{className:"syncify-account-check"}):null,a(j,{parts:$y(n)})]}),a(C,{variant:"text",onClick:()=>{k()},disabled:g,children:"Sign out"})]})]})}function $y(e){switch(e.kind){case"secured":return["This backup is secured",...e.linkedCount>1?[`${e.linkedCount} Spotify accounts linked`]:[]];case"pending":return[bc(e)];case"other-account":return["This backup is secured by another account"];default:return["Signed in"]}}var xc=new WeakMap;function bt(e){let t=xc.get(e);return t||(t=ie(e.marketplace_data.keys),xc.set(e,t)),t}function it(e){return ot(e,"item")}function ot(e,t){return`${e} ${t}${e===1?"":"s"}`}function wt(e,t=new Date){let n=new Date(e);if(Number.isNaN(n.getTime()))return e;let i=n.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),o=new Date(t);return o.setDate(t.getDate()-1),n.toDateString()===t.toDateString()?`today, ${i}`:n.toDateString()===o.toDateString()?`yesterday, ${i}`:`${n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===t.getFullYear()?void 0:"numeric"})}, ${i}`}function ui(e){return e.length<=1?e.join(""):`${e.slice(0,-1).join(", ")} and ${e[e.length-1]}`}function wo(e,t=new Date){let n=new Date(e);if(Number.isNaN(n.getTime()))return"";let i=new Date(t);return i.setDate(t.getDate()-1),n.toDateString()===t.toDateString()?"today":n.toDateString()===i.toDateString()?"yesterday":n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===t.getFullYear()?void 0:"numeric"})}function Ic(e,t,n){var l,u;let i=wt(e.metadata.last_sync_datetime),o=it(bt(e).length),r=`from ${e.metadata.device_info}`,s=(u=(l=e.backup)==null?void 0:l.name)!=null?u:null,c=e.payload_hash===n;return t==="safety-copy"?{backup:e,kind:t,name:"Safety copy",meta:[s,i,o,"updated weekly"].filter(Cc),current:c,title:`the safety copy from ${i}`}:t==="pinned"?{backup:e,kind:t,name:"Pinned",meta:[s,i,o,r].filter(Cc),current:c,title:s!=null?s:`the backup pinned ${i}`}:t==="unapproved"?{backup:e,kind:t,name:"Not approved",meta:[i,o,r],current:c,title:i}:{backup:e,kind:t,name:s!=null?s:i.charAt(0).toUpperCase()+i.slice(1),meta:s?[i,o,r]:[o,r],current:c,title:s!=null?s:i}}function Cc(e){return e!==null}var Rc={extension:"extension",theme:"theme",snippet:"snippet"},Hy={extension:"extension",custom_app:"app",theme:"theme"},Ky={extension:"extension",custom_app:"custom app",theme:"theme"};function di(e){let{changes:t}=e,[n,i]=h(!1);return p(G,{label:e.label,children:[t.changes.map(o=>a(zy,{change:o,includeLabel:e.includeLabel(o.name),onInclude:r=>e.onInclude(o.key,r),disabled:e.disabled},o.key)),t.manual.map(o=>a(W,{leading:a(ce,{kind:Hy[o.type]}),name:o.name,meta:a(j,{parts:[Ky[o.type],o.scheme]}),end:a("span",{className:"syncify-change-label syncify-cap",children:"Add manually"})},`${o.type}:${o.name}`)),t.settings.length>0?a(Fe,{}):null,t.settings.map(o=>a(W,{leading:a(ce,{kind:o.kind}),name:o.name,end:a("span",{className:"syncify-change-label syncify-cap","data-change":"Updates",children:"Updates"})},`settings:${o.id}`)),t.settings.length>0&&t.unchanged.length>0?a(Fe,{}):null,t.unchanged.length>0?a(W,{name:p("span",{className:"syncify-change-fold",children:[t.unchanged.length," more stay the same"]}),end:a(C,{variant:"subtle","aria-expanded":n,onClick:()=>i(!n),children:n?"Hide":"Show"})}):null,n?t.unchanged.map(o=>a(Fy,{item:o},o.key)):null]})}function zy(e){let{change:t}=e;return a(W,{leading:a(ce,{kind:Rc[t.type]}),name:t.name,meta:t.note?a(j,{parts:[t.note]}):void 0,end:p(B,{children:[a("span",{className:"syncify-change-label syncify-cap","data-change":t.fixed?void 0:t.change,children:t.fixed?"Stays off":t.change}),t.optional&&!t.fixed?a(lo,{checked:t.included,onChange:e.onInclude,label:e.includeLabel,disabled:e.disabled}):null]})})}function Fy(e){return a(W,{leading:a(ce,{kind:Rc[e.item.type]}),name:e.item.name,meta:e.item.note?a(j,{parts:[e.item.note]}):void 0})}var Ec={Adds:0,Updates:1,Removes:2},jy=["blocked","host","repo","catalog","unchecked"];function fi(e,t,n){var u,d,f;let{optional:i,allowed:o}=n,r=(u=n.fixed)!=null?u:new Set,s=[],c=[];for(let y of e.items){let S=t.get(y.key),k=i.has(y.key)||r.has(y.key),v={key:y.key,name:y.name,type:y.type,note:S?ko(S):r.has(y.key)?"Not in Marketplace's list":n.unapproved&&k?"Not approved":null},g=y.change==="added"?"Adds":y.change==="removed"?"Removes":y.isNew?"Updates":null;if(g){let w=r.has(y.key);s.push(b(m({},v),{change:g,optional:k,fixed:w,included:!k||!w&&o.has(y.key)}))}else c.push(v)}s.sort((y,S)=>Ec[y.change]-Ec[S.change]);let l=(d=n.settings)!=null?d:[];return{changes:s,settings:l,unchanged:c,manual:e.manual,warnings:[...Wy(s,t,(f=n.verb)!=null?f:"Restore"),...Yy(s)],count:s.filter(y=>y.included).length+l.length}}function yi(e,t){return t===0?e:t===1?`${e} 1 change`:`${e} ${t} changes`}function ko(e){switch(e.kind){case"host":return`Code from ${e.host}`;case"repo":return`Code from ${e.repo}`;case"blocked":return"Blocked by Marketplace";case"catalog":return"Not in Marketplace";case"unchecked":return"Not checked";case"custom":return"Custom"}}function Wy(e,t,n){var o;let i=new Map;for(let r of e){if(r.change==="Removes"||r.fixed)continue;let s=t.get(r.key);!s||!dt(s)&&s.kind!=="unchecked"||i.set(s.kind,[...(o=i.get(s.kind))!=null?o:[],r.name])}return jy.flatMap(r=>{let s=i.get(r);return s?[Vy(r,s,n)]:[]})}function Yy(e){let t=e.filter(n=>n.fixed).map(n=>n.name);return t.length===0?[]:[t.length===1?`${ui(t)} isn't in Marketplace's list anymore, so it stays off.`:`${ui(t)} aren't in Marketplace's list anymore, so they stay off.`]}function Vy(e,t,n){let i=t.length===1,o=ui(t),r=i?`${n} it only if you trust it.`:`${n} them only if you trust them.`;switch(e){case"blocked":return`${o} ${i?"is":"are"} on Marketplace's block list. ${r}`;case"host":return`${o} ${i?"loads from a site":"load from sites"} outside GitHub. ${r}`;case"repo":return i?`${o} loads its code from a different repo than the one it names. ${r}`:`${o} load their code from different repos than the ones they name. ${r}`;case"catalog":return`${o} ${i?"isn't":"aren't"} in Marketplace's catalog. ${r}`;default:return`GitHub couldn't be reached to check ${o}. ${r}`}}function Nc(e){return e.map(t=>b(m({},t),{name:`${t.name} settings`})).sort((t,n)=>t.name.localeCompare(n.name))}function Pc(e,t,n){var N;let[i,o]=h(()=>new Set),[r,s]=h(null),c=Q(()=>Nn(bt(e),e.spicetify_config,t,n),[e,t,n]),l=Q(()=>ft(c.items),[c]);A(()=>{let x=!0;return yt(c.items,l).then(_=>{x&&s({for:e,checks:_})}),()=>{x=!1}},[e,c,l]);let[u,d]=h(null);A(()=>{let x=!0;return os(e.extension_settings).catch(()=>[]).then(_=>{x&&d({for:e,items:_})}),()=>{x=!1}},[e]);let f=(r==null?void 0:r.for)===e?r.checks:null,y=Q(()=>new Map([...f!=null?f:[],...l]),[f,l]),S=((N=e.backup)==null?void 0:N.kind)==="quarantined",k=Q(()=>new Set(c.items.filter(x=>{var _;return x.change!=="removed"&&x.isNew&&(S||dt(y.get(x.key))||((_=y.get(x.key))==null?void 0:_.kind)==="unchecked")}).map(x=>x.key)),[c,y,S]),v=Q(()=>[...k].filter(x=>!i.has(x)),[k,i]),g=(u==null?void 0:u.for)===e?u.items:null,w=Q(()=>Nc(g!=null?g:[]).filter(x=>!v.includes(x.key)),[g,v]),E=Q(()=>fi(c,y,{optional:k,allowed:i,unapproved:S,settings:w.map(({id:x,name:_,kind:I})=>({id:x,name:_,kind:I}))}),[c,y,k,i,S,w]);function T(x,_){let I=new Set(i);_?I.add(x):I.delete(x),o(I)}return{preview:c,changes:E,unapproved:S,checking:f===null||g===null,skipped:v,settingsIds:E.settings.map(x=>x.id),allow:T}}function Tc(e){let{row:t,local:n}=e,i=F("restore-heading"),o=Pc(t.backup,n.items,n.spicetifyConfig),{changes:r}=o,s=!n.marketplaceAvailable,c=e.canShareSettings&&o.settingsIds.length>0;A(()=>{var u;(u=document.getElementById(i))==null||u.focus()},[i]);let l=p(B,{children:[a(C,{variant:"secondary",onClick:e.onCancel,disabled:e.restoring,children:"Cancel"}),a(C,{onClick:()=>e.onRestore({row:t,skipped:o.skipped,manual:o.preview.manual,settings:{ids:o.settingsIds,share:c&&e.shareSettings}}),disabled:e.busy||o.checking||s,children:e.restoring?"Restoring\u2026":o.checking?"Checking\u2026":yi("Restore",r.count)})]});return p(X,{idBase:e.idBase,id:"backups",actions:l,children:[a(re,{title:`Restore ${t.title}`,id:i,focusable:!0}),s?a(O,{tone:"warning",children:"Install Spicetify Marketplace to restore a backup."}):null,o.unapproved?a(O,{tone:"warning",children:"An install this Spotify account hasn't approved made this backup. Its items stay off unless you turn them on."}):null,a(di,{changes:r,label:"What this restore changes",includeLabel:u=>`Restore ${u}`,onInclude:o.allow,disabled:e.busy}),r.warnings.map(u=>a(O,{tone:"warning",children:u},u)),e.localIsUnsaved?a(O,{tone:"warning",children:"Your current setup isn't backed up."}):null,c?a(uo,{label:"Use these extension settings on my other devices too",checked:e.shareSettings,onChange:e.onShareSettingsChange,disabled:e.busy}):null]})}function Ac(e){var N,x,_,I,M,Y;let{remote:t,local:n}=e,i=F("backup"),[o,r]=h(null),[s,c]=h(null),l=z(null);if(A(()=>{var P;s||!l.current||((P=document.getElementById(l.current))==null||P.focus(),l.current=null)},[s]),s&&n)return a(Tc,{idBase:e.idBase,row:s,local:n,localIsUnsaved:n.installedItemCount>0&&!qy(n.hash,t),canShareSettings:e.canShareSettings,shareSettings:e.shareSettings,onShareSettingsChange:e.onShareSettingsChange,busy:e.busy,restoring:e.restoring,onCancel:()=>c(null),onRestore:P=>{var L;return e.onRestore(b(m({},P),{linkedHash:(L=o==null?void 0:o.hash)!=null?L:null}))}},s.backup.payload_hash);async function u(P){if(!P){r(null);return}r({hash:P,remote:null});try{let L=await nt(e.config,P);r({hash:P,remote:L})}catch(L){r(null),e.onError(L)}}let d=o?o.remote:t,f=(N=n==null?void 0:n.hash)!=null?N:null,y=P=>{var L,$;return($=(L=P.backup.backup)==null?void 0:L.id)!=null?$:`${P.kind}-${P.backup.payload_hash}-${P.backup.metadata.last_sync_datetime}`},S=P=>`${i}-${y(P)}`,k=(P,L)=>P.map($=>Ic($,L,f)),v=k((x=d==null?void 0:d.backups)!=null?x:[],"backup"),g=k((_=d==null?void 0:d.pinned)!=null?_:[],"pinned"),w=k(d!=null&&d.safetyCopy?[d.safetyCopy]:[],"safety-copy"),E=o?[]:k((I=t==null?void 0:t.unapproved)!=null?I:[],"unapproved");function T(P){var L;return a(W,{id:S(P),name:P.name,nameMark:P.kind==="safety-copy"?p(B,{children:[a(fo,{className:"syncify-safety-mark"}),(L=P.backup.backup)!=null&&L.safety_copy?a(ni,{className:"syncify-safety-mark"}):null]}):P.kind==="pinned"?a(ni,{className:"syncify-safety-mark"}):P.kind==="unapproved"?a(ke,{tone:"warning"}):void 0,meta:a(j,{parts:P.meta}),end:P.current?a("span",{className:"syncify-row-status syncify-cap",children:"Current"}):void 0,onOpen:P.current?void 0:()=>{l.current=S(P),c(P)},openLabel:`Preview restore of ${P.title}`,disabled:e.busy},y(P))}return p(X,{idBase:e.idBase,id:"backups",children:[e.notices,n&&!n.marketplaceAvailable?a(O,{tone:"warning",children:"Install Spicetify Marketplace to restore a backup."}):null,!e.lockedBy&&e.otherAccounts.length>0?a(se,{label:"Show backups from",children:a(ve,{label:"Show backups from",trigger:{value:(Y=(M=e.otherAccounts.find(P=>P.hash===(o==null?void 0:o.hash)))==null?void 0:M.label)!=null?Y:"This Spotify account"},items:[{hash:null,label:"This Spotify account"},...e.otherAccounts].map(P=>{var L;return{label:P.label,checked:((L=o==null?void 0:o.hash)!=null?L:null)===P.hash,onSelect:()=>{u(P.hash)}}}),disabled:e.busy})}):null,e.lockedBy?a("p",{className:"syncify-tab-text",children:e.lockedBy==="not_owner"?"Sign in with the account that secured them":"Sign in to see and restore your backups"}):(!t||!n)&&e.failed?null:!t||!n||o&&!o.remote?p(G,{label:"Loading backups",children:[a(Ce,{}),a(Ce,{})]}):v.length+g.length+w.length+E.length===0?o?a("p",{className:"syncify-tab-text",children:"No backups yet."}):null:p(G,{label:"Backups",children:[v.map(T),g.length>0?a(Fe,{}):null,g.map(T),w.length>0?a(Fe,{}):null,w.map(T),E.length>0?a(Fe,{}):null,E.map(T)]})]})}function qy(e,t){return t?[...t.backups,...t.safetyCopy?[t.safetyCopy]:[]].some(n=>n.payload_hash===e):!1}function _c(e){let t=F("first-sync"),[n,i]=h(()=>Object.fromEntries(e.choices.map(d=>[d.id,d.localAt>d.accountAt?"here":"account"]))),[o,r]=h(!1),[s,c]=h(null),l=d=>{var f;return(f=n[d.id])!=null?f:d.localAt>d.accountAt?"here":"account"};async function u(){r(!0),c(null);try{await Ra(Object.fromEntries(e.choices.map(d=>[d.id,l(d)]))),e.onClose()}catch(d){c(d instanceof Error?d.message:String(d))}finally{r(!1)}}return p(on,{open:e.open,wide:!0,onClose:e.onClose,title:"Which extension settings do you want to keep?",actions:p(B,{children:[a(C,{variant:"secondary",onClick:e.onClose,disabled:o,children:"Ask me later"}),a(C,{onClick:()=>{u()},disabled:o,children:"Keep these"})]}),children:[a("p",{children:"These items have different settings in this Spotify than on your other devices. Choose the settings to keep for each item. All your devices will then use them."}),a(G,{wrap:!0,children:e.choices.map(d=>a(W,{leading:a(ce,{kind:d.kind}),name:d.name,end:p("span",{className:"syncify-first-sync-picks",role:"radiogroup","aria-label":d.name,children:[a(ii,{name:`${t}-${d.id}`,label:`This Spotify, ${wo(d.localAt)}`,checked:l(d)==="here",onChange:()=>i(f=>b(m({},f),{[d.id]:"here"})),disabled:o}),a(ii,{name:`${t}-${d.id}`,label:`Other devices, ${wo(d.accountAt)}`,checked:l(d)==="account",onChange:()=>i(f=>b(m({},f),{[d.id]:"account"})),disabled:o})]})},d.id))}),s?a(O,{tone:"error",children:s}):null]})}function rt(e,t){return e.items.filter(n=>n.hold!==null&&!t.includes(n.id))}function Mc(e,t){let{hold:n}=e;if(n.reason==="account_full")return`${e.name} is held because your extension settings are over ${xe(t)}. Your other devices keep the last copy that fit. To sync it again, turn off an item or delete a synced copy in Items.`;let i=`${xe(n.size)} of its ${xe(e.limit)}`;return e.list?`${e.name}'s list is too big to sync, ${i}. Your other devices keep the last list that fit. It syncs again once the list is smaller.`:`${e.name}'s extension settings are too big to sync, ${i}. Your other devices keep the last copy that fit. They sync again once they're smaller.`}function Bc(e){return e.hold?`${xe(e.hold.size)}, too big to sync`:xe(e.size)}function Lc(e,t){let n=rt(e,t).filter(i=>i.hold.reason==="account_full");return{used:e.bytes+n.reduce((i,o)=>i+Math.max(o.hold.size-o.accountSize,0),0),over:n.length>0}}function Oc(e,t){let n=e.items,i=n.filter(r=>t.includes(r.id)).length,o=rt(e,t).length;return{syncing:n.length-i-o,held:o,off:i}}function Gy(){return`${U().webUrl.replace(/\/+$/,"")}/supported`}var Jy=4;function Dc(e){let{config:t,status:n}=e,i=F("extension-settings"),o=z(null),r=rt(n,t.settingsSyncOff),s=e.secured&&t.settingsSyncEnabled&&r.length>0,c=z(s);return A(()=>{var l;c.current&&((l=o.current)==null||l.scrollIntoView({block:"start"}))},[]),p("div",{className:"syncify-sync-section","data-place":"settings",ref:o,role:"group","aria-labelledby":i,children:[a(re,{title:"Extension settings",id:i}),e.secured?p(B,{children:[a(sn,{label:"Syncing on this device",checked:t.settingsSyncEnabled,onChange:e.onEnabledChange,disabled:e.disabled}),t.settingsSyncEnabled?p(B,{children:[a(Uc,{status:n,off:t.settingsSyncOff}),a($c,{items:r,accountLimit:n.limit})]}):null]}):a(O,{tone:"info",bare:!0,actions:a(C,{size:"small",onClick:e.onSecure,disabled:e.securing,children:e.securing?"Securing\u2026":"Secure"}),children:"Secure your backup to sync extension settings between your devices."}),p(G,{children:[e.secured&&t.settingsSyncEnabled?n.items.length===0?a(W,{name:"None of your items have settings Syncify can sync",plain:!0}):a(W,{name:"Items",meta:a(Xy,{status:n,off:t.settingsSyncOff}),onOpen:e.onOpenItems}):null,a(W,{name:"Supported extensions",external:!0,onOpen:()=>Z(Gy())})]})]})}function Xy(e){let t=Oc(e.status,e.off);return a(j,{parts:[t.syncing>0&&`${t.syncing} syncing`,t.held>0&&p("span",{className:"syncify-sync-warning",children:[t.held," too big to sync"]}),t.off>0&&`${t.off} off`]})}function Uc(e){let{used:t,over:n}=Lc(e.status,e.off);return a(ho,{used:t,max:e.status.limit,warning:n})}function $c(e){return a(B,{children:e.items.map(t=>a(O,{tone:"warning",children:Mc(t,e.accountLimit)},t.id))})}function Hc(e){let{config:t,status:n}=e,i=F("items"),[o,r]=h(null),[s,c]=h([]),l=z({ids:[],names:new Map});A(()=>{var S;let y=!0;return Na().catch(()=>n.items).then(k=>{y&&r(k)}),(S=document.getElementById(i))==null||S.focus(),()=>{y=!1}},[]);let u=z(e.onDeleted);A(()=>{u.current=e.onDeleted}),A(()=>()=>{let{ids:y,names:S}=l.current;y.length!==0&&Promise.all(y.map(k=>Ea(q(),k).catch(v=>{var w;let g=v instanceof Error?v.message:String(v);Spicetify.showNotification(`Syncify couldn't delete the synced copy of ${(w=S.get(k))!=null?w:k}. ${g}`,!0,6e3)}))).then(()=>u.current())},[]);function d(y,S){let k=S?[...s,y.id]:s.filter(v=>v!==y.id);l.current.names.set(y.id,y.name),l.current.ids=k,c(k)}let f=rt(b(m({},n),{items:o!=null?o:n.items}),t.settingsSyncOff);return p("div",{className:"syncify-sync-section",children:[a(re,{title:"Items",id:i,focusable:!0,end:a(C,{variant:"subtle",onClick:e.onBack,children:"Back to settings"})}),a(Uc,{status:n,off:t.settingsSyncOff}),a($c,{items:f,accountLimit:n.limit}),a(G,{label:"Items",busy:o===null,wrap:!0,children:o===null?Array.from({length:Jy},(y,S)=>a(Ce,{shape:"item"},S)):o.map(y=>a(Zy,{item:y,on:!t.settingsSyncOff.includes(y.id),deleted:s.includes(y.id),onChange:S=>e.onItemChange(y.id,S),onDelete:S=>d(y,S)},y.id))})]})}function Zy(e){let{item:t}=e;return a(W,{leading:a(ce,{kind:t.kind}),name:t.name,end:e.deleted?p(B,{children:[a("span",{className:"syncify-sync-size",children:"Synced copy deleted"}),a(C,{variant:"text",onClick:()=>e.onDelete(!1),children:"Undo"})]}):p(B,{children:[a("span",{className:"syncify-sync-size","data-tone":t.hold&&e.on?"warning":void 0,children:e.on?Bc(t):xe(t.size)}),a(oi,{label:`Sync ${t.name}`,checked:e.on,onChange:e.onChange}),a(ve,{trigger:"more",label:`More for ${t.name}`,items:[{label:"Delete synced copy",danger:!0,onSelect:()=>e.onDelete(!0)}]})]})})}function Kc(e,t){let[n,i]=h(!1),[o,r]=h(null),s=Ae(t);return A(()=>{if(!n)return;let c=l=>{var d;if(!((d=document.getElementById(e))!=null&&d.isConnected)){i(!1),r(null);return}l.preventDefault(),l.stopImmediatePropagation();let u=ia(l);if(u.kind!=="ignore"){if(u.kind==="cancel"){i(!1),r(null);return}if(u.kind==="error"){r(u.message);return}if(oa(u.shortcut)){r(`${Yt(u.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}i(!1),s.current(u.shortcut)}};return window.addEventListener("keydown",c,!0),()=>window.removeEventListener("keydown",c,!0)},[n,e,s]),{recording:n,error:o,clearError:()=>r(null),toggle:()=>{r(null),i(!n)}}}var zc=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function Fc(e){var S,k;let{config:t}=e,[n,i]=h("settings"),[o]=h(()=>Hn()),r=F("shortcut"),s=Kc(r,f),c=o?t.entryPoint:"topbar",l=s.recording?"Press keys":t.shortcut?Yt(t.shortcut):"Off";function u(v){tt(v),e.onConfigChange(v)}function d(v,g){let w=q().settingsSyncOff.filter(E=>E!==v);u(b(m({},t),{settingsSyncOff:g?w:[...w,v]}))}if(n==="items")return a(X,{idBase:e.idBase,id:"settings",children:a(Hc,{config:t,status:e.syncStatus,onItemChange:d,onBack:()=>i("settings"),onDeleted:()=>e.onConfigChange(q())})});function f(v){u(b(m({},t),{shortcut:v})),Gi(v),s.clearError()}function y(v){u(b(m({},t),{entryPoint:v})),Kn(v)}return p(X,{idBase:e.idBase,id:"settings",children:[p(rn,{children:[a(sn,{label:"Automatic backup when Spotify starts",checked:t.autoBackupEnabled&&!e.unsupported,onChange:v=>u(b(m({},t),{autoBackupEnabled:v})),disabled:e.busy||e.unsupported}),a(se,{label:"Open Syncify from",children:a(ve,{label:"Open Syncify from",trigger:{value:(k=(S=zc.find(v=>v.value===c))==null?void 0:S.label)!=null?k:""},items:zc.map(v=>({label:v.label,checked:v.value===c,onSelect:()=>y(v.value)})),disabled:!o})}),a(se,{label:"Keyboard shortcut",value:s.recording&&!s.error?"Press a key combination, or Esc to cancel":void 0,children:p("span",{className:"syncify-settings-shortcut",children:[s.recording?null:t.shortcut?a(C,{variant:"subtle",onClick:()=>f(null),children:"Turn off"}):a(C,{variant:"subtle",onClick:()=>f(pt),children:"Use default"}),a(mo,{id:r,keys:l,recording:s.recording,"aria-label":s.recording?`${l} for a new keyboard shortcut`:`${l}, change the keyboard shortcut`,onClick:s.toggle})]})})]}),s.error?a(O,{tone:"warning",live:!0,children:s.error}):null,o?t.entryPoint==="menu"&&!t.shortcut?a(O,{tone:"warning",children:"Keep a shortcut in case a Spotify update breaks the profile menu."}):null:a(O,{tone:"info",children:"The profile menu isn't available in this Spicetify version."}),a(Dc,{config:t,status:e.syncStatus,secured:e.secured,securing:e.securing,onSecure:e.onSecure,onEnabledChange:v=>u(b(m({},t),{settingsSyncEnabled:v,settingsSyncOff:q().settingsSyncOff})),onOpenItems:()=>i("items"),disabled:e.busy})]})}function jc(){let[e,t]=h(()=>Pe());return A(()=>Jn(t),[]),e}function cn(e){let t=`${U().webUrl.replace(/\/+$/,"")}/discover`;return e?`${t}?post=${encodeURIComponent(e)}`:t}function kt(e){var t;return(t=e.name)!=null?t:Ne(e.code)}function Wc(e){return[`Used by ${e.imports}`,...e.posted?["On Discover"]:[]]}function Yc(e){let t=e.posted?"The code stops working and its Discover post comes down.":"The code stops working.";return e.imports===0?t:`${t} ${e.imports===1?"1 person":`${e.imports} people`} used it.`}var mi=12;function Vc(e){return[...Array(Math.min(e.extensions,mi)).fill("extension"),...Array(Math.min(e.themes,mi)).fill("theme"),...Array(Math.min(e.snippets,mi)).fill("snippet")].slice(0,mi)}var Qy={extension:"extension",theme:"theme",snippet:"snippet"};function qc(e){var l,u;let{compose:t}=e,n=F("compose-heading"),i=(u=(l=t.compose)==null?void 0:l.code)!=null?u:null,{draft:o,saving:r}=t;A(()=>{var d;(d=document.getElementById(n))==null||d.focus()},[n]);let s=o?[...o.items].sort((d,f)=>Number(o.leftOut.has(f.key))-Number(o.leftOut.has(d.key))||d.name.localeCompare(f.name)):[],c=p(B,{children:[a(C,{variant:"secondary",onClick:t.cancel,disabled:r,children:"Cancel"}),a(C,{onClick:()=>{t.save()},disabled:!o||t.included.length===0||r,children:o?r?i?"Updating\u2026":"Creating\u2026":i?"Update code":"Create code":"Checking\u2026"})]});return p(X,{idBase:e.idBase,id:"share",actions:c,children:[a(re,{title:i?`Update ${kt(i)}`:"Create a code",id:n,focusable:!0}),t.error?a(O,{tone:"error",children:t.error}):null,a(Le,{label:"Setup name (optional)",value:t.name,onChange:t.setName,maxLength:Ms,disabled:r}),t.askHandle?a(Le,{label:"Pick a handle for your profile",value:t.handle,onChange:t.setHandle,onBlur:t.checkHandle,error:t.handleError,prefix:"@",maxLength:zi,disabled:r}):null,o&&t.included.length===0?a(O,{tone:"warning",children:"Nothing here can go in a code. Add something from Marketplace first."}):null,a(re,{title:"What goes in",end:o?a(j,{parts:[it(t.included.length)]}):void 0}),o?a(G,{label:"What goes in",children:s.map(d=>{let f=o.leftOut.get(d.key),y=[f?ko(f):null,d.repo].filter(Boolean);return a(W,{leading:a(ce,{kind:Qy[d.type]}),name:d.name,meta:y.length>0?a(j,{parts:y}):void 0,end:f?a("span",{className:"syncify-change-label syncify-cap",children:"Left out"}):void 0},d.key)})}):p(G,{label:"Checking your items",children:[a(Ce,{}),a(Ce,{})]})]})}var Gc=[["add","Add to my setup"],["replace","Replace my setup"]];function Jc(e){var c,l,u,d;let{load:t}=e,n=F("share-heading"),i=(c=t.shared)==null?void 0:c.file;if(A(()=>{var f;(f=document.getElementById(n))==null||f.focus()},[n]),!i||!t.changes)return null;let o=e.marketplaceAvailable===!1,r=i.creator,s=p(B,{children:[a(C,{variant:"secondary",onClick:t.close,disabled:t.applying,children:"Cancel"}),a(C,{onClick:()=>{t.apply()},disabled:t.applying||t.checking||e.busy||o,children:t.applying?"Loading\u2026":t.checking?"Checking\u2026":yi("Load",t.changes.count)})]});return p(X,{idBase:e.idBase,id:"share",actions:s,children:[a(re,{title:`Load ${(l=i.name)!=null?l:Ne(i.code)}`,id:n,focusable:!0,end:r?a(C,{variant:"text",onClick:()=>Z(Fs(r)),children:`by @${r}`}):void 0}),t.applyError?a(O,{tone:"error",children:t.applyError}):null,o?a(O,{tone:"warning",children:"Install Spicetify Marketplace to load a setup."}):null,a(se,{label:"How to load it",children:a(ve,{label:"How to load it",trigger:{value:(d=(u=Gc.find(([f])=>f===t.mode))==null?void 0:u[1])!=null?d:""},items:Gc.map(([f,y])=>({label:y,checked:t.mode===f,onSelect:()=>t.setMode(f)})),disabled:t.applying})}),a(di,{changes:t.changes,label:"What loading it changes",includeLabel:f=>`Load ${f}`,onInclude:t.allow,disabled:t.applying}),t.theme?a(O,{tone:"info",children:`Your theme switches to ${t.theme.name}.`}):null,t.changes.warnings.map(f=>a(O,{tone:"warning",children:f},f))]})}function Xc(e){let[t,n]=h(null),[i,o]=h(null),[r,s]=h(""),[c,l]=h(""),[u,d]=h(!1),[f,y]=h(!1),[S,k]=h(null),[v,g]=h(null),w=z(0),[E,T]=h(e.token);E!==e.token&&(T(e.token),n(null),o(null),g(null));let N=t!==null&&t.code===null&&!e.hasHandle,x=N&&u?Fi(c):null,_=i?i.items.filter(L=>!i.leftOut.has(L.key)):[];async function I(L){var We,at;let $=++w.current;n({code:L}),s((We=L==null?void 0:L.name)!=null?We:""),l((at=e.suggestedHandle)!=null?at:""),d(!1),o(null),k(null),g(null);try{let le=await we(),xt=await Ds(ie(le),le);$===w.current&&o(m({keys:le},xt))}catch(le){if($!==w.current)return;n(null),k(le instanceof Error?le.message:String(le))}}function M(){w.current+=1,n(null),o(null)}function Y(){n(null),o(null)}async function P(){if(!t||!i)return;if(N&&Fi(c)){d(!0);return}y(!0),k(null);let L=Us(i.keys,_);try{let $=t.code?await js(t.code.code,r.trim(),L):await zs(r.trim(),L,N?c.trim():void 0);g(b(m({},$),{outcome:t.code?"updated":"created"})),Y(),await e.reload()}catch($){if($ instanceof D&&$.code==="same_setup"&&$.share){g(b(m({},$.share),{leftOut:0,outcome:"existing"})),Y();return}e.fail($,k),$ instanceof D&&$.code==="publish_failed"&&(n(null),e.reload())}finally{y(!1)}}return{compose:t,draft:i,included:_,name:r,setName:s,askHandle:N,handle:c,setHandle:L=>l(L.replace(/^@/,"")),checkHandle:()=>d(!0),handleError:x,saving:f,error:S,saved:v,dismissSaved:()=>g(null),forgetSaved:L=>g($=>($==null?void 0:$.code)===L?null:$),start:I,cancel:M,save:P}}function Zc(e){var x;let[t,n]=h(null),[i,o]=h(null),[r,s]=h(null),[c,l]=h(null),[u,d]=h(0),f=z(!1),[y,S]=h(null),[k,v]=h(!1);function g(_,I){I(Wt(_,i)),_ instanceof D&&_.code==="signed_out"&&e.onSignedOut()}async function w(){var _,I;S(null);try{let M=await Dn();n(M.codes),f.current||(f.current=!0,d(M.newHearts)),e.onCodeCount(M.codes.length),o(M.max),s(M.profile),e.onHandle((I=(_=M.profile)==null?void 0:_.handle)!=null?I:null),l(M.suggestedHandle)}catch(M){g(M,S)}}async function E(_){v(!0),S(null);try{return await Ws(_),await w(),!0}catch(I){return g(I,S),!1}finally{v(!1)}}let T=Ae(_=>{n(null),f.current=!1,_&&w()}),N=(x=e.session)==null?void 0:x.token;return A(()=>T.current(N!==void 0),[T,N]),{codes:t,max:i,atMax:t!==null&&i!==null&&t.length>=i,profile:r,suggestedHandle:c,newHearts:u,error:y,deleting:k,load:w,remove:E,fail:g}}function Qc(e){let[t,n]=h(""),[i,o]=h(null),[r,s]=h(null),[c,l]=h(null),[u,d]=h(null),[f,y]=h("add"),[S,k]=h(()=>new Set),[v,g]=h(null),[w,E]=h(void 0),[T,N]=h(!1),x=Q(()=>u?$s(u.file,u.items,e.localItems,e.localConfig,e.localTheme,f):null,[u,e.localItems,e.localConfig,e.localTheme,f]),_=Q(()=>{if(!x||!u)return null;let V=new Set(u.items.map(H=>H.key));return x.items.filter(H=>H.change!=="removed"&&V.has(H.key)&&(f==="replace"||H.isNew))},[x,u,f]),I=Q(()=>_?ft(_):null,[_]),M=v&&v.for===_?v.checks:null,Y=Q(()=>new Map([...M!=null?M:[],...I!=null?I:[]]),[M,I]),P=Q(()=>x&&w!==void 0?Hs(x,w):new Set,[x,w]),L=Q(()=>{var V;return new Set(((V=x==null?void 0:x.items)!=null?V:[]).filter(H=>{var ne;return H.change!=="removed"&&H.isNew&&(dt(Y.get(H.key))||((ne=Y.get(H.key))==null?void 0:ne.kind)==="unchecked")}).map(H=>H.key))},[x,Y]),$=Q(()=>x?fi(x,Y,{optional:L,allowed:S,fixed:P,verb:"Load"}):null,[x,Y,L,S,P]),We=x!=null&&x.theme&&!P.has(x.theme.key)&&(!L.has(x.theme.key)||S.has(x.theme.key))?x.theme:null,at=x!==null&&(M===null||w===void 0);A(()=>{if(!_||!I)return;let V=!0;return yt(_,I).then(H=>{V&&g({for:_,checks:H})}),()=>{V=!1}},[_,I]);async function le(V){let H=V!=null?V:Ls(t);if(s(null),l(null),d(null),!H){s(Wt(new D("no_code")));return}o({code:H,pick:V!==void 0});try{let ne=await Ys(H);y("add"),k(new Set),d({file:ne,items:ie(ne.keys),pick:V!==void 0}),Ki().then(E)}catch(ne){s(Wt(ne))}finally{o(null)}}function xt(V,H){let ne=new Set(S);H?ne.add(V):ne.delete(V),k(ne)}async function hi(){if(!u||!x)return;N(!0),l(null);let V=[...new Set([...L,...P])].filter(H=>P.has(H)||!S.has(H));try{await ua(e.config,u.file,f,V,w!=null?w:null,u.pick),Spicetify.showNotification("Syncify: setup loaded. Reloading\u2026"),nn(x.manual,"share"),setTimeout(()=>window.location.reload(),1e3)}catch(H){N(!1),l(em(H))}}return{input:t,setInput:n,fetching:i,error:r,applyError:c,shared:u,close:()=>{d(null),l(null)},mode:f,setMode:y,changes:$,theme:We,checking:at,applying:T,open:le,allow:xt,apply:hi}}function em(e){if(e instanceof Jt){let t=e.reason instanceof ye?"Sign in to back up.":e.reason instanceof Error?e.reason.message:String(e.reason);return`${e.message} ${t}`}return e instanceof Error?e.message:String(e)}async function pi(e){var t;try{return await navigator.clipboard.writeText(e),!0}catch(n){let i=(t=Spicetify.Platform)==null?void 0:t.ClipboardAPI;return i!=null&&i.copy?(await i.copy(e),!0):!1}}var tm=2e3;function el(e){let{codes:t,compose:n}=e,[i,o]=h(null),[r,s]=h(null);A(()=>{if(!r)return;let d=setTimeout(()=>s(null),tm);return()=>clearTimeout(d)},[r]);async function c(d,f){await pi(d)&&s(f)}async function l(){i&&await t.remove(i.code)&&(n.forgetSaved(i.code),o(null))}let u=t.codes;return p("section",{className:"syncify-share-part","aria-label":"Your codes",children:[a(re,{title:p(B,{children:["Your codes",t.newHearts>0?a("span",{className:"syncify-share-hearts",children:ot(t.newHearts,"new heart")}):null]}),end:u&&t.max!==null?a(go,{used:u.length,max:t.max,label:"Share codes"}):void 0}),t.error?a(O,{tone:"error",actions:a(C,{variant:"text",onClick:()=>{t.load()},children:"Try again"}),children:t.error}):null,n.saved?a(nm,{saved:n.saved,copied:r,onCopy:(d,f)=>{c(d,f)},discoverOpen:e.discoverOpen,onDismiss:n.dismissSaved}):null,n.error&&!n.compose?a(O,{tone:"error",children:n.error}):null,u===null?t.error?null:a(G,{label:"Loading your codes",children:a(Ce,{})}):u.length>0?a(G,{label:"Your codes",children:u.map(d=>a(W,{name:kt(d),meta:a(j,{parts:[d.name?a("code",{className:"syncify-share-code",children:Ne(d.code)}):null,...Wc(d)]}),end:p("span",{className:"syncify-share-code-actions",children:[a(C,{variant:"text",onClick:()=>{c(Ne(d.code),`code:${d.code}`)},children:r===`code:${d.code}`?"Copied":"Copy"}),d.link?a(C,{variant:"text",onClick:()=>{var f;c((f=d.link)!=null?f:"",`link:${d.code}`)},children:r===`link:${d.code}`?"Copied":"Get link"}):null,a(ve,{trigger:"more",label:`More for ${kt(d)}`,disabled:n.compose!==null||t.deleting,items:[{label:"Update",onSelect:()=>{n.start(d)}},...e.discoverOpen&&!d.posted?[{label:"Post to Discover",onSelect:()=>Z(cn(d.code))}]:[],{label:"Delete",danger:!0,onSelect:()=>o(d)}]})]})},d.code))}):null,u!==null?a("div",{className:"syncify-share-create",children:a(C,{variant:"secondary",onClick:()=>{n.start(null)},disabled:n.compose!==null||t.atMax||e.marketplaceAvailable===!1,children:"Create a code"})}):null,a(on,{open:i!==null,onClose:()=>o(null),title:i?`Delete ${kt(i)}`:"",actions:p(B,{children:[a(C,{variant:"secondary",onClick:()=>o(null),disabled:t.deleting,children:"Keep it"}),a(C,{variant:"danger",onClick:()=>{l()},disabled:t.deleting,children:t.deleting?"Deleting\u2026":"Delete code"})]}),children:i?Yc(i):null})]})}function nm(e){let{saved:t}=e,n=Ne(t.code),i=t.link,o=t.outcome==="existing"?"You shared this setup already as":t.outcome==="updated"?"Code updated:":"Your code is ready:";return p(O,{tone:"info",live:!0,actions:p(B,{children:[a(C,{variant:"text",onClick:()=>e.onCopy(n,"saved-code"),children:e.copied==="saved-code"?"Copied":"Copy"}),i?a(C,{variant:"text",onClick:()=>e.onCopy(i,"saved-link"),children:e.copied==="saved-link"?"Copied":"Get link"}):null,t.outcome==="created"&&e.discoverOpen?a(C,{variant:"text",onClick:()=>Z(cn(t.code)),children:"Post to Discover"}):null,a(C,{variant:"subtle",onClick:e.onDismiss,children:"Dismiss"})]}),children:[p("span",{children:[o," ",a("code",{className:"syncify-share-code",children:n})]}),t.leftOut>0?a("span",{className:"syncify-share-left-out",children:t.leftOut===1?"1 snippet isn't in Marketplace's list anymore, so it was left out.":`${t.leftOut} snippets aren't in Marketplace's list anymore, so they were left out.`}):null]})}function tl(e){let{session:t}=e,n=Qc(e),i=Zc(e),o=Xc({token:t==null?void 0:t.token,hasHandle:i.profile!==null,suggestedHandle:i.suggestedHandle,reload:i.load,fail:i.fail}),[r,s]=h(null);if(A(()=>{Vs().then(s)},[]),n.shared)return a(Jc,{idBase:e.idBase,load:n,marketplaceAvailable:e.marketplaceAvailable,busy:e.busy});if(o.compose)return a(qc,{idBase:e.idBase,compose:o});let c=n.input.trim();return p(X,{idBase:e.idBase,id:"share",children:[a("form",{className:"syncify-share-part",noValidate:!0,onSubmit:l=>{l.preventDefault(),!n.fetching&&c&&n.open()},children:a(Le,{label:"Load a setup",value:n.input,onChange:n.setInput,placeholder:"Paste a code or a link",error:n.error,action:a(C,{variant:"secondary",type:"submit",disabled:n.fetching!==null||!c,children:n.fetching&&!n.fetching.pick?"Loading\u2026":"Load"})})}),r?p("section",{className:"syncify-share-part","aria-label":r.length>0?"Syncify picks":"Discover",children:[r.length>0?a(re,{title:"Syncify picks"}):null,p(G,{children:[r.map(l=>{var u;return a(W,{name:l.name,meta:a(j,{parts:[a("span",{className:"syncify-share-pips",children:Vc(l).map((d,f)=>a(ce,{kind:d},f))},"pips"),((u=n.fetching)==null?void 0:u.code)===l.code?"Loading\u2026":ot(l.extensions+l.themes+l.snippets,"item")]}),onOpen:()=>{n.open(l.code)},openLabel:`Preview ${l.name}`,disabled:n.fetching!==null},l.code)}),a(W,{name:"Find more setups on Discover",end:a(C,{variant:"secondary",size:"small",onClick:()=>Z(cn()),children:"Open"})})]})]}):null,t===void 0?null:t===null?a("div",{className:"syncify-share-part",children:a(se,{label:"Sign in to share this setup as a code",children:a(C,{variant:"secondary",onClick:e.onSignIn,children:"Sign in"})})}):a(el,{codes:i,compose:o,discoverOpen:r!==null,marketplaceAvailable:e.marketplaceAvailable})]})}var vo="syncify:share-code-count",xo="syncify:handle";function im(){var t,n;let e=Number((n=(t=Spicetify.LocalStorage)==null?void 0:t.get(vo))!=null?n:NaN);return Number.isInteger(e)&&e>=0?e:null}function om(){var t;let e=(t=Spicetify.LocalStorage)==null?void 0:t.get(xo);return e==null?void 0:e||null}function nl(){let[e,t]=h(()=>im()),[n,i]=h(()=>om()),o=de(c=>{var l,u;c===null?(l=Spicetify.LocalStorage)==null||l.remove(vo):(u=Spicetify.LocalStorage)==null||u.set(vo,String(c)),t(c)},[]),r=de(c=>{var l,u;c===void 0?(l=Spicetify.LocalStorage)==null||l.remove(xo):(u=Spicetify.LocalStorage)==null||u.set(xo,c!=null?c:""),i(c)},[]),s=de(()=>{o(null),r(void 0)},[o,r]);return{codeCount:e,handle:n,saveCodeCount:o,saveHandle:r,forget:s}}var rm=2e3;function il(e){let{install:t}=e,n=!t||t.trusted?null:t.refused?"Another device on this Spotify account refused this one. Sign in to back up from it.":"This device isn't approved yet. Sign in, or approve it on your other device.";return p(B,{children:[e.nudge?a(O,{tone:"warning",actions:p(B,{children:[a(C,{variant:"subtle",size:"small",onClick:e.onHideNudge,disabled:e.securing,children:"Not now"}),a(C,{size:"small",onClick:e.onSecure,disabled:e.securing,children:e.securing?"Securing\u2026":"Secure"})]}),children:"Your backup isn't secured. Anyone who knows your Spotify username can restore it."}):null,n?a(O,{tone:"info",children:n}):null,e.restoreResult?a(sm,{manual:e.restoreResult.manual}):null]})}function sm(e){let[t,n]=h(!1),i=Ja(e.manual).join(`
`);if(A(()=>{if(!t)return;let r=setTimeout(()=>n(!1),rm);return()=>clearTimeout(r)},[t]),!i)return null;let o=e.manual.length;return p(O,{tone:"info",actions:p(B,{children:[a(C,{variant:"text",onClick:()=>{pi(i).then(n)},children:t?"Copied":"Copy"}),a(C,{variant:"subtle",onClick:Ya,children:"Dismiss"})]}),children:[o===1?"1 isn't from Marketplace. Add it in a terminal:":`${o} aren't from Marketplace. Add them in a terminal:`,a("pre",{className:"syncify-commands",children:a("code",{children:i})})]})}function ol(e){let{message:t}=e;return a(O,{tone:t.kind,actions:p(B,{children:[t.kind==="error"?a(C,{variant:"text",onClick:e.onTryAgain,disabled:e.busy,children:"Try again"}):null,a(C,{variant:"subtle",onClick:e.onDismiss,children:"Dismiss"})]}),children:t.text})}function rl(e){let t=am(e);return t.backedUp&&e.latest?b(m({},t),{line:[`Backed up ${wt(e.latest.metadata.last_sync_datetime)}`,`${it(e.localItemCount)} on this device`]}):b(m({},t),{line:[t.title,...t.detail]})}function am(e){let t={backedUp:!1,supportAsk:null},n=`${it(e.localItemCount)} on this device`;return e.restoreResult&&!e.unsupported?cm(e.restoreResult):e.unsupported?b(m({},t),{title:"Update Syncify to keep backing up",detail:["Your backups are safe"],action:"how-to-update"}):e.locked?b(m({},t),{title:"Sign in to restore",detail:[e.locked==="not_owner"?"Secured by another account":"This backup is secured"],action:"sign-in"}):e.activity==="backing-up"?b(m({},t),{title:"Backing up\u2026",detail:[],action:"back-up"}):e.checked?e.latest?e.localHash&&!e.backedUp?b(m({},t),{title:"Changes since your last backup",detail:lm(e.latest,e.latestItems,e.localItems,e.localConfig),action:"back-up"}):b(m({},t),{title:"Everything is backed up",detail:[`Last backup ${wt(e.latest.metadata.last_sync_datetime)}`,n],action:null,backedUp:!0}):b(m({},t),{title:"No backup yet",detail:["Save your extensions and themes to restore them after a reinstall or on another computer."],action:"back-up"}):e.checkError?b(m({},t),{title:"Couldn't check your backup",detail:[e.checkError],action:"try-again"}):b(m({},t),{title:"Checking your backup\u2026",detail:[],action:null})}function cm(e){let t=e.loaded===e.total,n=e.kind==="share";return{title:t?n?"Setup loaded":"Backup restored":`${n?"Loaded":"Restored"} ${e.loaded} of ${e.total}`,detail:[t?e.total===0?"Nothing from Marketplace to load":`${e.loaded} of ${e.total} loaded`:"Missing something? Reload Spotify once more."],action:t?null:"reload",backedUp:!1,supportAsk:t?n?"Syncify set it up for you?":"Syncify saved your setup?":null}}function lm(e,t,n,i){var f;let o=new Set(t),r=new Set(n),s=n.filter(y=>!o.has(y)).length,c=t.filter(y=>!r.has(y)).length,l=(f=e.spicetify_config)!=null?f:null,u=!!(i&&!l),d=!u&&(i&&l?!fs(i,l):i!==l);return[s?`${s} added`:null,c?`${c} removed`:null,d?"Spicetify config changed":null,u?"Spicetify config not saved yet":null,`Last backup ${wt(e.metadata.last_sync_datetime)}`].filter(y=>y!==null)}function sl(e,t,n){if((e==null?void 0:e.status)==="pending"&&!e.mine){let i=!e.not_me;return b(m({kind:"claim"},si(e,n)),{canAnswer:i,signIn:i&&!n})}return t?{kind:"install",title:ci(t),install:t}:null}var um=3,Co={exists:!1,payload:null,backups:[],safetyCopy:null,pinned:[],claim:null,unapproved:[],install:null,nudge:!1},st=null;function al(e){var d,f,y;let[t,n]=h(()=>st),[i,o]=h(void 0),r=de(S=>{st=S,n(S)},[]),s=de(async()=>{let S,k=null;try{S=await nt(e)}catch(E){if(!(E instanceof ye))throw E;S=Co,k=E.code}let v=await te().catch(()=>null),g=v?await da(e).catch(()=>null):null,w=v?await te().catch(()=>null):null;return r({remote:S,lockedBy:k,claims:w?g:null}),o(w),k},[e,r]),c=de(()=>{te().catch(()=>null).then(S=>o(k=>k!=null?k:S))},[]),l=de(S=>{let k=st!=null?st:{remote:Co,lockedBy:null,claims:null},{remote:v}=k;r(b(m({},k),{remote:b(m({},v),{exists:!0,payload:S,backups:[S,...v.backups.filter(g=>g.payload_hash!==S.payload_hash)].slice(0,um)})}))},[r]),u=de(()=>{o(null),st&&r(b(m({},st),{claims:null}))},[r]);return{check:t,remote:(d=t==null?void 0:t.remote)!=null?d:Co,lockedBy:(f=t==null?void 0:t.lockedBy)!=null?f:null,claims:(y=t==null?void 0:t.claims)!=null?y:null,session:i,setSession:o,refresh:s,readSession:c,addBackup:l,forgetClaims:u}}function cl(){let[e,t]=h(null),[n,i]=h(!1),o=de(async()=>{try{let r=await Mn();return t(r),i(!1),r}catch(r){throw i(!0),r}},[]);return{local:e,localFailed:n,refreshLocal:o}}var dm=600*1e3;function ll(){let[e,t]=h(null);return A(()=>{let n=U();if(!so(n.version))return;let i=!0;return rc(n.releasesUrl).then(o=>{i&&o&&ao(o,n.version)>0&&t(o)}),()=>{i=!1}},[]),e}function ul(){let[e,t]=h(()=>ja()),[n]=h(()=>Date.now());return A(()=>Wa(t),[]),{result:e,recent:!!(e&&n-e.at<dm)}}function dl(e){let t=U(),n=[["Report an issue",t.issueUrl],["GitHub",t.githubUrl],["Discord",t.discordUrl],["Support on Ko-fi",t.kofiUrl]],i=[["Privacy",`${t.webUrl}/privacy`],["Terms",`${t.webUrl}/terms`]];return p("footer",{className:"syncify-window-footer",children:[p("span",{className:"syncify-window-footer-version",children:[a(j,{className:"syncify-window-footer-meta",parts:[`Syncify ${t.version}`,...i.map(([o,r])=>a(C,{variant:"subtle",size:"tiny",className:"syncify-window-footer-legal",onClick:()=>Z(r),children:o},o))]}),e.newerVersion?a(C,{variant:"text",size:"tiny",className:"syncify-window-update",onClick:()=>e.loadedByLoader?window.location.reload():Z(`${t.githubUrl}#updating`),children:a(j,{className:"syncify-window-footer-meta",parts:[`${e.newerVersion} is out`,e.loadedByLoader?"Reload":"How to update"]})}):null]}),a("span",{className:"syncify-window-footer-links",children:n.map(([o,r])=>a(C,{variant:"subtle",size:"tiny",onClick:()=>Z(r),children:o},o))})]})}var fm={"back-up":"Back up now","try-again":"Try again","sign-in":"Sign in","how-to-update":"How to update",reload:"Reload"};function fl(e){let{status:t,alert:n}=e,i=t.action,o=i?a(C,{variant:i==="back-up"||i==="sign-in"?"primary":"secondary",size:n?"small":"regular",onClick:()=>e.onAction(i),disabled:e.busy,children:i==="back-up"&&e.backingUp?"Backing up\u2026":fm[i]}):null;return n?p("section",{className:"syncify-status","aria-label":"Status",children:[p("div",{className:"syncify-status-alert",role:"alert",children:[a("span",{className:"syncify-status-alert-mark",children:a(ke,{tone:"warning",icon:a(yo,{})})}),p("div",{className:"syncify-status-text",children:[a("h2",{className:"syncify-status-title",children:n.title}),n.kind==="claim"&&n.text?a("p",{className:"syncify-status-sentence",children:n.text}):null]}),n.kind==="claim"?n.signIn?p("span",{className:"syncify-status-answers",children:[a(C,{variant:"secondary",onClick:e.onNotMe,disabled:e.answering,children:"Not me"}),a(C,{onClick:()=>e.onAction("sign-in"),disabled:e.answering,children:"That's me, sign in"})]}):n.canAnswer?a(C,{variant:"secondary",onClick:e.onNotMe,disabled:e.answering,children:"Not me"}):null:p("span",{className:"syncify-status-answers",children:[a(C,{variant:"secondary",onClick:()=>e.onAnswerInstall("reject"),disabled:e.answering,children:"Not mine"}),a(C,{onClick:()=>e.onAnswerInstall("approve"),disabled:e.answering,children:"Approve"})]})]}),p("div",{className:"syncify-status-line","aria-live":"polite",children:[t.backedUp?a(Oe,{className:"syncify-status-check"}):null,a(j,{parts:t.line}),o]})]}):a("section",{className:"syncify-status","aria-label":"Status",children:p("div",{className:"syncify-status-main","aria-live":"polite",children:[p("div",{className:"syncify-status-text",children:[a("h2",{className:"syncify-status-title",children:t.title}),t.detail.length>0?a(j,{parts:t.detail}):null,t.supportAsk?p("p",{className:"syncify-status-ask",children:[a("span",{children:t.supportAsk}),a(C,{variant:"text",onClick:e.onSupport,children:"Support it on Ko-fi"})]}):null]}),o]})})}function yl(e){let{codeCount:t,account:n,newerVersion:i}=e,o=[{id:"backups",label:"Backups"},{id:"share",label:"Share",status:t?a(po,{count:t,label:ot(t,"code")}):void 0},{id:"account",label:"Account",status:n?n.kind==="ok"?a("span",{className:"syncify-tab-check",role:"img","aria-label":n.label,children:a(Oe,{})}):a(ke,{tone:"warning",label:n.label}):void 0},{id:"settings",label:"Settings",status:e.settingsHeld?a(ke,{tone:"warning",label:"An item's extension settings aren't syncing"}):i?a(ke,{tone:"info",label:`Syncify ${i} is out`}):void 0}];return a(So,{tabs:o,selected:e.selected,onSelect:e.onSelect,idBase:e.idBase,label:"Syncify"})}var ml=!1;function ln(e){var Mo,Bo,Lo,Oo,Do,Uo,$o,Ho,Ko,zo,Fo,jo,Wo;let t=F("syncify"),n=U(),[i,o]=h(()=>q()),{local:r,localFailed:s,refreshLocal:c}=cl(),l=al(i),u=nl(),d=ll(),f=ul(),y=jc(),[S,k]=h(()=>!ml),[v]=h(()=>oc()!==null),[g,w]=h((Mo=e.tab)!=null?Mo:"backups"),[E,T]=h(()=>l.check?"idle":"checking"),[N,x]=h(null),[_,I]=h(null),[M,Y]=h(!1),[P,L]=h(!1),[$,We]=h(!1),[at,le]=h(null),[xt,hi]=h(()=>pa()),[V,H]=h(e.secure===!0),ne=z(!1),{remote:ee,lockedBy:ge,claims:Ye,session:ue}=l,Ct=E!=="idle",Si=(Bo=r==null?void 0:r.hash)!=null?Bo:null,un=((Lo=ee.claim)==null?void 0:Lo.status)==="pending"&&!ee.claim.mine?ee.claim:null,Ve=hc(Ye,ge,un!==null),Eo=ue!=null&&Ve.kind==="secured",dn=Eo&&i.settingsSyncEnabled,No=dn&&y.arrived&&!y.arrived.hidden?y.arrived:null,xl=dn&&rt(y,i.settingsSyncOff).length>0,Cl=!!(Si&&ee.backups.some(R=>R.payload_hash===Si)),Po=rl({activity:E,checked:l.check!==null,checkError:N,unsupported:M,locked:ge,latest:ee.payload,latestItems:ee.payload?bt(ee.payload).map(R=>R.key):[],backedUp:Cl,localHash:Si,localItems:(Oo=r==null?void 0:r.installedItems)!=null?Oo:[],localItemCount:(Do=r==null?void 0:r.installedItemCount)!=null?Do:0,localConfig:(Uo=r==null?void 0:r.spicetifyConfig)!=null?Uo:null,restoreResult:f.recent?f.result:null}),Il=sl(ee.claim,(Ho=($o=ee.install)==null?void 0:$o.waiting[0])!=null?Ho:null,ue!=null),Rl=!xt&&!ge&&ee.payload!==null&&g!=="account"&&(ue?Ve.kind==="open":ue===null&&ee.nudge),El=(ue?(Ko=Ye==null?void 0:Ye.accounts)!=null?Ko:[]:[]).filter(R=>R.status==="final").map((R,K)=>({hash:R.hash,label:`Spotify account ${K+1}${R.device_info?` from ${R.device_info}`:""}`})).filter(R=>R.hash!==(Ye==null?void 0:Ye.hash));async function he(R={}){try{(!R.silent||!l.check)&&T("checking"),R.silent||(I(null),x(null)),await c(),await l.refresh()&&w("account"),x(null),T("idle")}catch(K){It(K)}}function It(R){if(T("idle"),R instanceof Lt){Y(!0),I(null);return}if(R instanceof Ze){I({kind:"error",text:R.message}),he({silent:!0});return}if(R instanceof ye&&R.code!=="not_linked"){I(null),he({silent:!0});return}let K=R instanceof Error?R.message:String(R);l.check?I({kind:"error",text:K}):x(K),Spicetify.showNotification(K,!0,6e3)}async function Nl(){try{T("backing-up"),I(null);let R=await Qt(i).catch(()=>null),{payload:K,unchanged:qe,unapproved:bi,settings:Ol}=await Xt(i,R);if(await Zn(R,Ol,ee.backups).catch(()=>null),await c(),bi){await he({silent:!0}),I({kind:"warning",text:"Backed up. This device needs approval before its backups count."}),Spicetify.showNotification("Syncify: backed up, this device needs approval");return}qe||l.addBackup(K),T("idle"),Spicetify.showNotification(qe?"Syncify: everything is already backed up":"Syncify backup complete")}catch(R){It(R)}}async function Pl(R){var K;try{T("restoring"),I(null),await la(i,R.row.backup,(K=R.linkedHash)!=null?K:void 0,R.skipped,R.settings),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),nn(R.manual),setTimeout(()=>window.location.reload(),1e3)}catch(qe){It(qe)}}async function Tl(R){var qe;let K=(qe=ee.install)==null?void 0:qe.waiting[0];if(K){L(!0);try{await jn(i,K.id,R),Spicetify.showNotification(li(R)),await he({silent:!0})}catch(bi){It(bi)}finally{L(!1)}}}async function Al(){var R;L(!0);try{Spicetify.showNotification(ai(await Wn(i),(R=un==null?void 0:un.email)!=null?R:null)),await he({silent:!0})}catch(K){I({kind:"error",text:K instanceof Error?K.message:String(K)})}finally{L(!1)}}async function Rt(){We(!0),le(null);try{await fa(i)}catch(R){R instanceof Ke&&["claim_pending","claimed"].includes(R.code)||le(R instanceof Error?R.message:String(R))}finally{await he({silent:!0}),We(!1)}}function _l(){ue?Rt():w("account")}function Ml(){H(!0),ue?Rt():w("account")}function Bl(R){l.setSession(R),ne.current=!0,!ge&&ee.payload?Rt():he({silent:!0})}function To(){u.forget(),l.forgetClaims(),le(null),he({silent:!0})}function Ll(R){R==="back-up"?Nl():R==="try-again"?he():R==="sign-in"?w("account"):R==="how-to-update"?Z(`${n.githubUrl}#updating`):Va()}A(()=>Jn(()=>o(R=>b(m({},R),{settingsSyncOff:q().settingsSyncOff}))),[]);let Ao=Ae(()=>{l.readSession(),he({silent:!0})});A(()=>Ao.current(),[Ao]);let _o=Ae(()=>{!e.secure||ne.current||$||!ue||Ve.kind!=="open"||ge||(ne.current=!0,Rt())});return A(()=>_o.current(),[_o,ue,Ve.kind,ge,$]),p("div",{className:"syncify-ui syncify-window",onClick:Io,onMouseDown:Io,onPointerDown:Io,children:[p("div",{className:"syncify-window-top",children:[a(fl,{status:Po,alert:Il,backingUp:E==="backing-up",busy:Ct||Po.action==="back-up"&&ge!==null,answering:P,onAction:Ll,onNotMe:()=>{Al()},onAnswerInstall:R=>{Tl(R)},onSupport:()=>Z(n.kofiUrl)}),_?a(ol,{message:_,busy:Ct,onTryAgain:()=>{he()},onDismiss:()=>I(null)}):null,No?a(O,{tone:"info",actions:p(B,{children:[a(C,{variant:"subtle",size:"small",onClick:Ca,children:"Not now"}),a(C,{size:"small",onClick:()=>window.location.reload(),children:"Reload Spotify"})]}),children:Xn(No.names)}):null,a(yl,{idBase:t,selected:g,onSelect:w,codeCount:ue?u.codeCount:null,account:Sc(ue,ge,Ve),newerVersion:d,settingsHeld:xl})]}),g==="backups"?a(Ac,{idBase:t,config:i,remote:l.check?ee:null,failed:N!==null||s,lockedBy:ge,local:r,otherAccounts:El,notices:a(il,{nudge:Rl,securing:$,onSecure:Ml,onHideNudge:()=>{ga(),hi(!0)},install:ge||Ve.kind==="secured"?null:ee.install,restoreResult:f.result}),canShareSettings:dn,shareSettings:i.shareRestoredSettings,onShareSettingsChange:R=>{let K=b(m({},i),{shareRestoredSettings:R});tt(K),o(K)},busy:Ct,restoring:E==="restoring",onRestore:R=>{Pl(R)},onError:It}):g==="share"?a(tl,{idBase:t,config:i,session:ue,localItems:(zo=r==null?void 0:r.items)!=null?zo:[],localConfig:(Fo=r==null?void 0:r.spicetifyConfig)!=null?Fo:null,localTheme:(jo=r==null?void 0:r.activeTheme)!=null?jo:null,marketplaceAvailable:(Wo=r==null?void 0:r.marketplaceAvailable)!=null?Wo:null,busy:Ct,onSignIn:()=>w("account"),onSignedOut:To,onCodeCount:u.saveCodeCount,onHandle:u.saveHandle}):g==="account"?a(vc,{idBase:t,session:ue,locked:ge,secure:Ve,securing:$,secureError:at,onSecure:()=>{Rt()},nudge:V,onSignedIn:Bl,onSignedOut:To,handle:u.handle,onHandle:u.saveHandle}):a(Fc,{idBase:t,config:i,onConfigChange:o,busy:Ct,unsupported:M,syncStatus:y,secured:Eo,securing:$,onSecure:_l}),dn&&y.choices.length>0?a(_c,{choices:y.choices,open:S,onClose:()=>{ml=!0,k(!1)}}):null,a(dl,{newerVersion:d,loadedByLoader:v})]})}function Io(e){e.stopPropagation()}var pl=`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="-2.5 -2.5 37 37" aria-hidden="true" focusable="false"><defs><mask id="syncify-mark-gap" maskUnits="userSpaceOnUse" x="-2" y="-2" width="36" height="36"><rect x="-2" y="-2" width="36" height="36" fill="#fff"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></mask></defs><g mask="url(#syncify-mark-gap)"><g transform="rotate(15 16 16)"><path d="M16 16L16 7.4A8.6 8.6 0 0 1 24.6 16Z" fill="#6cd1d1" transform="translate(0.42 -0.42)"/><path d="M16 16L24.6 16A8.6 8.6 0 0 1 16 24.6Z" fill="#efa4c1" transform="translate(0.42 0.42)"/><path d="M16 16L16 24.6A8.6 8.6 0 0 1 7.4 16Z" fill="#d3c48c" transform="translate(-0.42 0.42)"/><path d="M16 16L7.4 16A8.6 8.6 0 0 1 16 7.4Z" fill="#88bcf2" transform="translate(-0.42 -0.42)"/></g></g><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 28.03A12.4 12.4 0 1 1 28.03 19"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91"/></g></svg>
`;var _e=null;function je(){return!!(_e!=null&&_e.container.isConnected)}function vt(){Spicetify.PopupModal.hide()}function De(e){gl(_e);let t=document.createElement("div");_e={container:t,root:null,watch:null};try{Spicetify.PopupModal.display({title:U().extensionName,content:t,isLarge:!1})}catch(n){throw ae("Failed to open PopupModal",n),n}pm(t),hm(t,e),mm(t)}function mm(e){let t=_e;if((t==null?void 0:t.container)!==e||typeof MutationObserver!="function")return;let n=new MutationObserver(()=>{e.isConnected||gl(t)});n.observe(document.body,{childList:!0,subtree:!0}),t.watch=n}function gl(e){var t,n;e&&((t=e.watch)==null||t.disconnect(),e.watch=null,(n=e.root)==null||n.unmount(),e.root=null)}function pm(e){requestAnimationFrame(()=>{let t=gm(e);t==null||t.classList.add("syncify-modal-shell");let n=t==null?void 0:t.querySelector(".main-trackCreditsModal-header h1");if(n&&!n.querySelector(".syncify-modal-mark")){let o=document.createElement("span");o.className="syncify-modal-mark",o.innerHTML=pl,n.prepend(o)}let i=t==null?void 0:t.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');i&&(i.classList.add("syncify-modal-close"),i.setAttribute("aria-label",`Close ${U().extensionName}`),i.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function gm(e){let t=e.parentElement;for(;t&&t!==document.body;){if(t.querySelector(".main-trackCreditsModal-header"))return t;t=t.parentElement}return e.closest('[class*="trackCreditsModal"]')}function hm(e,t){try{if(typeof Spicetify.ReactDOM.createRoot=="function"){let n=Spicetify.ReactDOM.createRoot(e);n.render(t),(_e==null?void 0:_e.container)===e&&(_e.root=n),oe("Window rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(t,e),oe("Window rendered",{renderer:"render"})}catch(n){throw ae("Failed to render window",n),n}}function gi(e){return a("div",{className:"syncify-ui syncify-launch-notice",children:p(ti,{title:e.title,actions:e.actions,children:[e.children?a("p",{children:e.children}):null,e.error?a(O,{tone:"error",children:e.error}):null]})})}function hl(){let[e,t]=h(!1),[n,i]=h(null);async function o(r){t(!0),i(null);try{await r()}catch(s){i(s instanceof Error?s.message:String(s)),t(!1)}}return{busy:e,error:n,run:o}}function Sl(e){let{title:t,text:n}=si(e.claim,e.signedIn),i=hl(),o=()=>{i.run(async()=>{Spicetify.showNotification(ai(await Wn(q()),e.claim.email)),e.onClose()})};return a(gi,{title:t,error:i.error,actions:e.signedIn?p(B,{children:[a(C,{variant:"secondary",onClick:e.onClose,disabled:i.busy,children:"Close"}),a(C,{onClick:o,disabled:i.busy,children:"Not me"})]}):p(B,{children:[a(C,{variant:"secondary",onClick:o,disabled:i.busy,children:"Not me"}),a(C,{onClick:e.onSignIn,disabled:i.busy,children:"That's me, sign in"})]}),children:n})}function bl(e){return a(gi,{title:gc(e.claim),actions:a(C,{onClick:e.onClose,children:"Close"})})}function wl(e){let t=hl(),n=i=>{t.run(async()=>{await jn(q(),e.install.id,i),Spicetify.showNotification(li(i)),e.onDone()})};return a(gi,{title:ci(e.install),error:t.error,actions:p(B,{children:[a(C,{variant:"secondary",onClick:()=>n("reject"),disabled:t.busy,children:"Not mine"}),a(C,{onClick:()=>n("approve"),disabled:t.busy,children:"Approve"})]}),children:"Approve it if it's yours."})}function kl(e){return a(gi,{title:"Your backup isn't secured",actions:p(B,{children:[a(C,{variant:"secondary",onClick:e.onClose,children:"Not now"}),a(C,{onClick:t=>{t.stopPropagation(),e.onSecure()},children:"Secure"})]}),children:"Anyone who knows your Spotify username can restore it."})}function Sm(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var vl="syncify-styles";function bm(){if(document.getElementById(vl)){oe("Another copy of Syncify is running; stopping this one");return}Go(Spicetify.React),wm();let e=q();aa({topbarButton:ec(Ro),menuItem:nc(Ro)}),Kn(e.entryPoint),qi(e.shortcut,Ro),Da({onClaim:km,onUndone:vm,onInstall:xm,onNudge:Cm,onFirstSync:Im}).catch(t=>{ae("Startup sync check failed",t)}),Ga().catch(t=>{ae("Restore check failed",t)})}function wm(){let e=document.createElement("style");e.id=vl,e.textContent=Ir,document.head.appendChild(e)}function Ro(){if(je()){vt();return}De(a(ln,{}))}function km(e){je()||(oe("Opening claim notice"),te().catch(t=>{if(t instanceof Ge)return null;throw t}).then(t=>{je()||De(a(Sl,{claim:e,signedIn:t!==null,onSignIn:()=>De(a(ln,{tab:"account"})),onClose:vt}))},t=>ae("Claim notice skipped",t)))}function vm(e){return je()?!1:(oe("Opening undone claim notice"),De(a(bl,{claim:e,onClose:vt})),!0)}function xm(e){je()||(oe("Opening install notice"),De(a(wl,{install:e,onDone:vt})))}function Cm(){je()||(oe("Opening nudge notice"),Sa(),De(a(kl,{onSecure:()=>De(a(ln,{tab:"account",secure:!0})),onClose:vt})))}function Im(){je()||(oe("Opening first sync"),De(a(ln,{tab:"settings"})))}qa();(function e(){if(!Sm()){setTimeout(e,100);return}oe("Spicetify APIs ready"),bm()})();})();
