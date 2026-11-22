// NAME: Syncify
// AUTHOR: wsoltani
// DESCRIPTION: Back up and restore Spicetify extensions and themes.
"use strict";(()=>{var Ol=Object.defineProperty,Dl=Object.defineProperties;var Ul=Object.getOwnPropertyDescriptors;var dn=Object.getOwnPropertySymbols;var Yo=Object.prototype.hasOwnProperty,Vo=Object.prototype.propertyIsEnumerable;var Wo=(e,t,n)=>t in e?Ol(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,m=(e,t)=>{for(var n in t||(t={}))Yo.call(t,n)&&Wo(e,n,t[n]);if(dn)for(var n of dn(t))Vo.call(t,n)&&Wo(e,n,t[n]);return e},b=(e,t)=>Dl(e,Ul(t));var Se=(e,t)=>{var n={};for(var i in e)Yo.call(e,i)&&t.indexOf(i)<0&&(n[i]=e[i]);if(e!=null&&dn)for(var i of dn(e))t.indexOf(i)<0&&Vo.call(e,i)&&(n[i]=e[i]);return n};var Et,B,ue,A,Nt,Q,$l,z,h;function qo(e){({createElement:Et,Fragment:B,useCallback:ue,useEffect:A,useLayoutEffect:Nt,useMemo:Q,useReducer:$l,useRef:z,useState:h}=e)}var Go=`/* Shared values for every part. Colors come from the active Spicetify theme,
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
`;var Jo=`.syncify-icon {
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
`;var Xo=`.syncify-btn,
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
`;var Zo=`.syncify-switch-control {
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
`;var Qo=`.syncify-checkbox {
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
`;var er=`/* A square ring; picked, the ring and a square inside it in the accent. */
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
`;var tr=`.syncify-setting-row {
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
`;var nr=`/* Facts on one line, wrapping between facts. Each fact is trimmed to its
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
`;var ir=`.syncify-list {
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
`;var or=`.syncify-field-group {
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
`;var rr=`.syncify-menu {
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
`;var sr=`.syncify-meter {
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
`;var ar=`.syncify-mark-square {
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
`;var cr=`.syncify-notice {
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
`;var lr=`.syncify-dialog {
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
`;var ur=`/* When the window is too narrow for every tab, the row scrolls sideways
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
`;var dr=`.syncify-pip-square {
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
`;var fr=`.syncify-section-label {
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
`;var yr=`.syncify-keycap {
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
`;var mr=`/* A bar as tall as the capitals of the text it stands in for. */
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
`;var pr=[Go,Jo,Xo,Zo,Qo,er,tr,nr,ir,or,rr,sr,ar,cr,lr,ur,dr,fr,yr,mr].join(`
`);var gr=`/* Spotify PopupModal shell tweaks scoped to Syncify. Keep these minimal so the
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
`;var hr=`/* The window fits the height Spotify's popup leaves it, so the status and
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
`;var Sr=`/* The safety copy's shield and a pinned backup's pin, after their names. */
.syncify-safety-mark {
    color: var(--syncify-color-accent);
}

/* "Current", where an older backup has its chevron. */
.syncify-row-status {
    color: var(--syncify-color-accent);
    font-size: var(--syncify-text-small);
    font-weight: 700;
}
`;var br=`/* Adds, Updates and Removes: plain colored text, not chips. */
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
`;var wr=`/* Loading a setup, the picks and your codes, split by dashed lines. */
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
`;var kr=`/* The code step's Resend and Use another email. */
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
`;var vr=`/* Turn off or Use default, then the key. */
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
`;var xr=`/* A launch notice in Spotify's popup: the dialog layout, the popup's width. */
.syncify-launch-notice {
    width: 100%;
}
`;var Cr=[pr,gr,hr,br,Sr,wr,kr,vr,xr].join(`
`);var mu="syncify",Ue="state";var Pt=class extends Error{constructor(){super("IndexedDB isn't available."),this.name="DatabaseUnavailableError"}};function fn(){let e;try{e=window.indexedDB}catch(t){return Promise.resolve(null)}return e?new Promise((t,n)=>{let i;try{i=e.open(mu,1)}catch(o){t(null);return}i.onupgradeneeded=()=>{i.result.createObjectStore(Ue)},i.onerror=()=>{var o;return n((o=i.error)!=null?o:new Error("IndexedDB failed to open."))},i.onblocked=()=>n(new Error("IndexedDB is blocked.")),i.onsuccess=()=>t(i.result)}):Promise.resolve(null)}function Si(e,t,n=!1){let i=fn().then(o=>new Promise((r,a)=>{if(!o){a(new Pt);return}try{let c=o.transaction(Ue,e),l=t(c.objectStore(Ue));c.oncomplete=()=>{o.close(),r(l.result)},c.onerror=c.onabort=()=>{var u;o.close(),a((u=c.error)!=null?u:new Error("IndexedDB failed."))}}catch(c){o.close(),a(c)}}));return n?i:Promise.race([i,new Promise((o,r)=>setTimeout(()=>r(new Error("IndexedDB took too long.")),2e3))])}function be(e,t={}){return Si("readonly",n=>n.get(e),t.wait)}async function fe(e,t){await Si("readwrite",n=>n.put(t,e))}async function yn(e){await Si("readwrite",t=>t.delete(e))}var Ie={extensionName:"Syncify",version:"1.20.2",workerUrl:"https://syncify-worker.wsoltani.com",webUrl:"https://syncify.wsoltani.com",githubUrl:"https://github.com/wSoltani/Syncify",kofiUrl:"https://ko-fi.com/wsoltani",discordUrl:"https://syncify.wsoltani.com/discord",issueUrl:"https://github.com/wSoltani/Syncify/issues/new",releasesUrl:"https://syncify-releases.wsoltani.com",shareUrl:"https://syncs.wsoltani.com"};function U(){var t,n,i,o,r,a,c,l,u,d;let e=window.SyncifyConfig;return{extensionName:(t=Me(e==null?void 0:e.extensionName))!=null?t:Ie.extensionName,version:(n=Ir(e==null?void 0:e.version))!=null?n:Ie.version,workerUrl:(i=Me(e==null?void 0:e.workerUrl))!=null?i:Ie.workerUrl,webUrl:(o=Me(e==null?void 0:e.webUrl))!=null?o:Ie.webUrl,githubUrl:(r=Me(e==null?void 0:e.githubUrl))!=null?r:Ie.githubUrl,kofiUrl:(a=Me(e==null?void 0:e.kofiUrl))!=null?a:Ie.kofiUrl,discordUrl:(c=Me(e==null?void 0:e.discordUrl))!=null?c:Ie.discordUrl,issueUrl:(l=Me(e==null?void 0:e.issueUrl))!=null?l:Ie.issueUrl,releasesUrl:(u=Me(e==null?void 0:e.releasesUrl))!=null?u:Ie.releasesUrl,shareUrl:(d=Me(e==null?void 0:e.shareUrl))!=null?d:Ie.shareUrl}}function Me(e){return Ir(e)}function Ir(e){return typeof e=="string"&&e.trim()?e.trim():null}var pu="x-syncify-version",gu="x-syncify-install",hu="x-syncify-timezone",bi="install-id",wi="syncify:install-id",$e=null;async function Rr(){let e={[pu]:U().version,[gu]:(await ki()).id},t=wu();return t&&(e[hu]=t),e}function ki(){return $e!=null||($e=Su()),$e.catch(()=>{$e=null}),$e}async function Er(){let e=await fn();if(!e)throw new Error("IndexedDB isn't available.");let t=vi();return await new Promise((n,i)=>{let o=e.transaction(Ue,"readwrite");o.objectStore(Ue).put(t,bi),o.oncomplete=()=>{e.close(),n()},o.onerror=o.onabort=()=>{var r;e.close(),i((r=o.error)!=null?r:new Error("IndexedDB failed."))}}),$e=Promise.resolve({id:t,inDatabase:!0}),$e}async function Su(){let e=await bu();if(e)return{id:e,inDatabase:!0};let t=Nr();if(t)return{id:t,inDatabase:!1};let n=vi();try{window.localStorage.setItem(wi,n)}catch(i){}return{id:n,inDatabase:!1}}async function bu(){let e=await fn();if(!e)return null;let t=await new Promise((n,i)=>{let o=null;try{let r=e.transaction(Ue,"readwrite"),a=r.objectStore(Ue),c=a.get(bi);c.onsuccess=()=>{var l;if(typeof c.result=="string"&&Pr(c.result)){o=c.result;return}o=(l=Nr())!=null?l:vi(),a.put(o,bi)},r.oncomplete=()=>{e.close(),o?n(o):i(new Error("IndexedDB failed."))},r.onerror=r.onabort=()=>{var l;e.close(),i((l=r.error)!=null?l:new Error("IndexedDB failed."))}}catch(r){e.close(),i(r)}});try{window.localStorage.removeItem(wi)}catch(n){}return t}function Nr(){try{let e=window.localStorage.getItem(wi);return e&&Pr(e)?e:null}catch(e){return null}}function vi(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t=[...e].map(n=>n.toString(16).padStart(2,"0"));return[t.slice(0,4).join(""),t.slice(4,6).join(""),t.slice(6,8).join(""),t.slice(8,10).join(""),t.slice(10).join("")].join("-")}function Pr(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(e)}function wu(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(e){return null}}var ku="syncify-signature-v1",vu={name:"ECDSA",hash:"SHA-256"};function mn(){return crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign","verify"])}async function pn(e){return xi(new Uint8Array(await crypto.subtle.exportKey("raw",e)))}async function Tt(e,t,n,i,o){let r=await xu(t,n,i,o),a=await crypto.subtle.sign(vu,e,r);return xi(new Uint8Array(a))}async function xu(e,t,n,i){let{pathname:o,search:r}=new URL(n),a=new TextEncoder,c=xi(new Uint8Array(await crypto.subtle.digest("SHA-256",a.encode(i))));return a.encode([ku,e,t.toUpperCase(),o+r,c].join(`
`))}function xi(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var Tr="device-key",Ci="session",Ar="salt",Je=null,At,_r={email:"",codeSentAt:null,retryAt:0,retryEmail:null};async function ct(e){if(Je)return Je;let t=await be(Tr,{wait:!0});return Cu(t)?(Je=Promise.resolve(t),t):e?(Je=mn().then(async n=>(await fe(Tr,n),n)),Je.catch(()=>{Je=null}),Je):null}async function te(){let e=await be(Ci,{wait:!0});return Iu(e)?e:null}function Ii(e){return fe(Ci,e)}async function Xe(){await yn(Ci).catch(()=>{})}async function gn(){if(At===void 0){let e=await be(Ar).catch(()=>{});At=typeof e=="string"?e:null}return At}async function hn(e){e!==At&&(At=e,await fe(Ar,e).catch(()=>{}))}function Sn(){return _r}function Mr(e){_r=e}function Cu(e){let t=e;return!!(t&&t.privateKey instanceof CryptoKey&&t.publicKey instanceof CryptoKey)}function Iu(e){let t=e;return!!(t&&typeof t.token=="string"&&t.token&&typeof t.email=="string")}var Br="install-key",lt=null;function Lr(){return lt!=null||(lt=Ru()),lt.catch(()=>{lt=null}),lt}async function Ru(){if(!(await ki()).inDatabase)return null;let e=await be(Br,{wait:!0}),t=Nu(e)?e:await Eu();return{privateKey:t.privateKey,publicKey:await pn(t.publicKey)}}async function Eu(){let e=await mn();return await fe(Br,e),e}function Nu(e){let t=e;return!!(t&&t.privateKey instanceof CryptoKey&&t.publicKey instanceof CryptoKey)}var Pu="/api/auth/email-otp/send-verification-otp",Tu="/api/auth/sign-in/email-otp",Au="/api/auth/get-session",_u="/api/auth/sign-out",Mu="/api/auth/link",Bu="x-syncify-device-key",Lu="x-syncify-signature",Or="x-syncify-salt",Ou="none",Du={invalid_email:"Enter a valid email address.",resend_wait:"Wait a moment before sending another code.",email_daily_limit:"Too many codes for this email today. Try again tomorrow.",emails_paused:"Sign-in codes are paused for today. Try again tomorrow.",too_many_requests:"Too many tries. Wait a minute and try again.",send_failed:"Couldn't send the code. Try again in a minute.",unavailable:"Sign-in isn't available yet.",invalid_code:"That code isn't right.",code_expired:"That code has expired. Send a new one.",too_many_attempts:"Too many wrong codes. Send a new one.",invalid_signature:"Couldn't verify this device. Try again.",stale_salt:"Couldn't verify this device. Try again.",signed_out:"You've been signed out. Sign in again.",no_device_key:"Syncify couldn't keep its sign-in key on this device.",offline:"Couldn't reach Syncify. Check your connection and try again.",link_failed:"Couldn't open the website. Try again."},D=class extends Error{constructor(n,i=null,o=null){var r;super((r=Du[n])!=null?r:"Sign-in failed. Try again.");this.code=n;this.retryAfter=i;this.share=o;this.name="AccountError"}};function He(e){return e instanceof D?e.message:"Sign-in failed. Try again."}async function Dr(e,t={}){let n=await Mt(Pu,{method:"POST",body:JSON.stringify(m({email:e,type:"sign-in"},t.nudge?{nudge:!0}:{}))});return typeof(n==null?void 0:n.resend_in)=="number"?n.resend_in:60}async function Ur(e,t){var r;let n=await ct(!0).catch(()=>{throw new D("no_device_key")}),i=await Mt(Tu,{method:"POST",body:JSON.stringify({email:e,otp:t}),keys:n,sendPublicKey:!0});if(typeof(i==null?void 0:i.token)!="string"||!i.token)throw new D("sign_in_failed");let o={token:i.token,email:typeof((r=i.user)==null?void 0:r.email)=="string"?i.user.email:e};return await Ii(o).catch(()=>{throw new D("no_device_key")}),Ri=!0,o}var Ri=!1;async function $r(){var t;let e=await te();if(!e||Ri)return e;try{let n=await bn(e,Au,"GET");Ri=!0;let i=(t=n==null?void 0:n.user)==null?void 0:t.email;if(typeof i!="string"||i===e.email)return e;let o=b(m({},e),{email:i});return await Ii(o).catch(()=>{}),o}catch(n){if(n instanceof D&&n.code==="signed_out")return null;throw n}}async function Hr(){let e=await te().catch(()=>null);e&&await bn(e,_u,"POST").catch(()=>{}),await Xe()}async function Kr(){let e=await te();if(!e)throw new D("signed_out");let t=await bn(e,Mu,"POST"),n=typeof(t==null?void 0:t.url)=="string"?t.url:"",i=new URL(U().webUrl).origin;if(!n.startsWith(`${i}/link#`))throw new D("link_failed");return n}async function _t(e,t,n){let i=await te();if(!i)throw new D("signed_out");return bn(i,e,t,n)}async function zr(e,t,n){let i=await te().catch(()=>null),o=i?await ct(!1).catch(()=>null):null;await Mt(e,m({method:"POST",body:JSON.stringify(t),headers:n,keepalive:!0},i&&o?{token:i.token,keys:o}:{}))}async function bn(e,t,n,i){let o=await ct(!1);if(!o)throw await Xe(),new D("signed_out");return Mt(t,m({method:n,token:e.token,keys:o},i===void 0?{}:{body:JSON.stringify(i)}))}async function Mt(e,t,n=!1){var f,y,S;let i=`${U().webUrl.replace(/\/+$/,"")}${e}`,o=m({},t.headers);if(t.body!==void 0&&(o["content-type"]="application/json"),t.token&&(o.authorization=`Bearer ${t.token}`),t.keys){let w=(f=await gn())!=null?f:Ou;o[Or]=w,o[Lu]=await Tt(t.keys.privateKey,w,t.method,i,(y=t.body)!=null?y:""),t.sendPublicKey&&(o[Bu]=await pn(t.keys.publicKey))}let r;try{r=await fetch(i,{method:t.method,headers:o,body:t.body,keepalive:t.keepalive})}catch(w){throw new D("offline")}let a=r.headers.get(Or);a&&await hn(a);let c=await r.json().catch(()=>null);if(r.ok)return c;let l=typeof(c==null?void 0:c.code)=="string"?c.code:r.status===503?"unavailable":"failed";if(l==="stale_salt"&&t.keys&&!n)return Mt(e,t,!0);l==="signed_out"&&await Xe();let u=Number(r.headers.get("retry-after")),d=c==null?void 0:c.share;throw new D(l,Number.isFinite(u)&&u>0?u:(S=Uu[l])!=null?S:null,typeof(d==null?void 0:d.code)=="string"?{code:d.code,link:typeof d.link=="string"?d.link:null}:null)}var Uu={resend_wait:60,too_many_requests:60,send_failed:60};var $u="x-syncify-user-hash",Hu="x-syncify-identity",Ku="x-syncify-signature",zu="x-syncify-install-key",Fu="x-syncify-install-signature",Ei="x-syncify-salt",ju="none",Wu="/restores",Yu="/sync",Vu="/settings/delete",qu="x-syncify-settings-bytes",Gu="/installs",Ju="hash",Fr=3,Bt=class extends Error{constructor(){super("This version of Syncify is no longer supported."),this.name="UnsupportedVersionError"}},ye=class extends Error{constructor(n){super(n==="not_linked"?"Couldn't read that Spotify account's backups.":"Sign in to restore this backup.");this.code=n;this.name="LockedError"}},Ze=class extends Error{constructor(){super("This Spotify account doesn't accept backups from this install. Sign in to back up."),this.name="InstallRefusedError"}};async function Yr(e,t,n,i){var c,l;let o=JSON.stringify(n),r=await Re(e,t,{method:"POST",headers:m({"content-type":"application/json"},i!==void 0?{[qu]:String(new TextEncoder().encode(i).byteLength)}:{}),body:i!==void 0?i+o:o});if(r.status===403&&((c=await r.json().catch(()=>null))==null?void 0:c.code)==="install_refused")throw new Ze;if(!r.ok)throw new Error(`Backup failed with HTTP ${r.status}.`);let a=await r.json().catch(()=>null);return{unchanged:(a==null?void 0:a.unchanged)===!0,unapproved:(a==null?void 0:a.quarantined)===!0,settings:(l=a==null?void 0:a.settings)!=null?l:null}}async function Vr(e,t,n,i){let o=await Re(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({install:n,action:i})},Gu);if(o.ok)return;let r=await o.json().catch(()=>null);if((r==null?void 0:r.code)!=="not_pending")throw new Error(`Couldn't answer with HTTP ${o.status}.`)}async function Ni(e,t,n,i){var k,E,T,P,C,_;let o=await Re(e,t,i!==void 0&&!n?{method:"POST",headers:{"content-type":"application/json"},body:i}:{method:"GET"},i!==void 0&&!n?Yu:Jr("/",n));if(o.status===404){let I=await o.json().catch(()=>null);return{settings:(k=I==null?void 0:I.settings)!=null?k:null,exists:!1,payload:null,backups:[],safetyCopy:null,pinned:[],claim:Lt(I==null?void 0:I.claim),unapproved:[],install:jr(I==null?void 0:I.install),nudge:!1}}if(!o.ok)throw new Error(`Restore failed with HTTP ${o.status}.`);let r=await o.json(),a=Lt(r.claim),c=jr(r.install),l=r.nudge===!0,u=(E=r.settings)!=null?E:null;delete r.claim,delete r.install,delete r.nudge,delete r.settings;let d=[r,...(T=r.backup_history)!=null?T:[]];if(!d.every(I=>I.backup))return{exists:!0,payload:r,backups:d.slice(0,Fr),safetyCopy:(P=d[Fr])!=null?P:null,pinned:[],claim:a,unapproved:[],install:c,nudge:l,settings:u};let f=d.filter(I=>{var M;return((M=I.backup)==null?void 0:M.kind)==="rolling"}),y=I=>{var M,Y;return((M=I.backup)==null?void 0:M.kind)==="anchor"||((Y=I.backup)==null?void 0:Y.safety_copy)===!0},S=(C=d.find(y))!=null?C:null,w=d.filter(I=>{var M;return((M=I.backup)==null?void 0:M.kind)==="pinned"&&!y(I)}),v=d.filter(I=>{var M;return((M=I.backup)==null?void 0:M.kind)==="quarantined"}),g=(_=f[0])!=null?_:S;return g?f.length===0&&S?{exists:!0,payload:g,backups:[S],safetyCopy:null,pinned:w,claim:a,unapproved:v,install:c,nudge:l,settings:u}:{exists:!0,payload:g,backups:f,safetyCopy:S,pinned:w,claim:a,unapproved:v,install:c,nudge:l,settings:u}:{exists:!1,payload:null,backups:[],safetyCopy:null,pinned:w,claim:a,unapproved:v,install:c,nudge:l,settings:u}}async function qr(e,t,n){let i=await Re(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({item:n})},Vu),o=await i.json().catch(()=>null);if(!i.ok||typeof(o==null?void 0:o.version)!="number")throw new Error(i.status===429?"Syncify can't delete more synced copies today. Try again tomorrow.":`Couldn't delete the synced copy with HTTP ${i.status}.`);return{version:o.version}}async function Gr(e,t,n,i){try{await Re(e,t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({backup_id:n}),keepalive:!0},Jr(Wu,i))}catch(o){}}async function Re(e,t,n,i="",o=!1){var v,g,k,E,T;let r=i?`${e.replace(/\/+$/,"")}${i}`:e,a=(v=n.method)!=null?v:"GET",c=await te().catch(Wr),l=c?await ct(!1).catch(Wr):null,u=await Lr(),d={},f=(g=await gn())!=null?g:ju;c&&l&&(d.authorization=`Bearer ${c.token}`,d[Ei]=f,d[Ku]=await Tt(l.privateKey,f,a,r,(k=n.body)!=null?k:"")),u&&(d[Ei]=f,d[zu]=u.publicKey,d[Fu]=await Tt(u.privateKey,f,a,r,(E=n.body)!=null?E:""));let y=await fetch(r,b(m({},n),{headers:m(b(m(m({},n.headers),await Rr()),{[$u]:t.hash,[Hu]:t.field}),d)})),S=y.headers.get(Ei);if(S&&await hn(S),y.status===426)throw new Bt;if(y.status!==401)return y;let w=(T=await y.clone().json().catch(()=>null))==null?void 0:T.code;if(!o){if(w==="stale_salt"&&(c||u))return Re(e,t,n,i,!0);if(w==="signed_out"&&c)return await Xe(),Re(e,t,n,i,!0);if(w==="install_key_mismatch"&&u)return await Er(),Re(e,t,n,i,!0)}throw w==="claimed"||w==="not_owner"||w==="not_linked"?new ye(w):(w==="signed_out"&&await Xe(),new D(typeof w=="string"?w:"failed"))}function Jr(e,t){return t?`${e}?${Ju}=${encodeURIComponent(t)}`:e}function jr(e){let t=e;if(!t||typeof t.trust!="string")return null;let n=Array.isArray(t.waiting)?t.waiting:[];return{trusted:t.trust!=="pending"&&t.trust!=="rejected",refused:t.trust==="rejected",waiting:n.flatMap(i=>{let o=i;return o&&typeof o.id=="string"&&typeof o.first_seen_at=="number"?[{id:o.id,device:typeof o.device=="string"?o.device:null,first_seen_at:o.first_seen_at}]:[]})}}function Lt(e){let t=e;return!t||typeof t.mine!="boolean"?null:t.status==="final"?{status:"final",mine:t.mine}:t.status==="undone"?typeof t.undone_at=="number"?{status:"undone",mine:!1,email:typeof t.email=="string"?t.email:null,undone_at:t.undone_at}:null:t.status!=="pending"||typeof t.final_at!="number"?null:m({status:"pending",mine:t.mine,email:typeof t.email=="string"?t.email:null,final_at:t.final_at,held:t.held===!0},t.not_me===!0?{not_me:!0}:{})}function Wr(e){if(e instanceof Pt)return null;throw e}async function wn(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return[...new Uint8Array(n)].map(i=>i.toString(16).padStart(2,"0")).join("")}function J(e){return JSON.stringify(Pi(e))}function Pi(e){return Array.isArray(e)?e.map(Pi):e&&typeof e=="object"?Object.keys(e).sort().reduce((t,n)=>(t[n]=Pi(e[n]),t),{}):e}function Xr(){let e=navigator.userAgent;return/Windows/i.test(e)?"Windows":/Mac OS|Macintosh/i.test(e)?"macOS":/Linux/i.test(e)?"Linux":e}var Xu="marketplace:installed:";function Zu(e){return{id:e.id,key:`${Xu}${e.id}`,name:e.name,kind:Qu(e.id)}}function Ot(e){return new Map(e.map(t=>[t.id,Zu(t)]))}function Qu(e){return/\.(m?js)$/i.test(e)?"extension":/\.css$/i.test(e)?"theme":"app"}var ed="registry.json",Zr="settings-registry",td=1,nd=3e3,id=["marketplace:","spicetify","syncify"],od=["spicetify","syncify"],rd="medium",Ti=null;function Ee(){return Ti||(Ti=sd().then(async e=>e?(await fe(Zr,e).catch(()=>{}),e):ts(await be(Zr).catch(()=>{})))),Ti}async function sd(){let e=typeof AbortController=="function"?new AbortController:null,t=setTimeout(()=>e==null?void 0:e.abort(),nd);try{let n=await fetch(`${U().releasesUrl}/${ed}`,{signal:e==null?void 0:e.signal});return n.ok?ts(await n.json()):null}catch(n){return null}finally{clearTimeout(t)}}function ts(e){if(!Qe(e)||e.format!==td||!Array.isArray(e.items)||!Qe(e.sizes))return null;let t={small:Number(e.sizes.small),medium:Number(e.sizes.medium),large:Number(e.sizes.large)},n=Number(e.accountLimit);return[...Object.values(t),n].every(o=>Number.isSafeInteger(o)&&o>0)?{items:e.items.flatMap(o=>{let r=ad(o,t);return r?[r]:[]}),accountLimit:n}:null}function ad(e,t){var l,u;if(!Qe(e)||typeof e.id!="string"||!e.id)return null;let n=Qr(e.keys),i=Qr((l=e.exclude)!=null?l:[]),o=dd(e.storage),r=ud(e.lists),a=(u=e.size)!=null?u:rd;if(a!=="small"&&a!=="medium"&&a!=="large"||!n||!i||!o||!r||n.length===0||o.type==="localStorage"&&n.some(fd)||o.type==="indexedDB"&&od.some(d=>o.database.startsWith(d)))return null;let c=cd(e.name)?e.name:ld(e.id);return{id:e.id,name:c,keys:n,exclude:i,storage:o,lists:r,limit:t[a]}}function cd(e){return typeof e=="string"&&e.length<=100&&/^\S(?:.*\S)?$/.test(e)}function ld(e){var i;let t=(i=e.split("/").pop())!=null?i:e,n=t.replace(/\.[^.]+$/,"")||t;return n.charAt(0).toUpperCase()+n.slice(1)}function ud(e){if(e===void 0)return{};if(!Qe(e))return null;let t={};for(let[n,i]of Object.entries(e))if(Qe(i)&&i.merge==="object")t[n]={merge:"object"};else if(Qe(i)&&i.merge==="array"&&Dt(i.id))t[n]={merge:"array",id:i.id};else return null;return t}function dd(e){return e===void 0?{type:"localStorage"}:Qe(e)?e.type==="localStorage"?{type:"localStorage"}:e.type!=="indexedDB"||!Dt(e.database)||!Dt(e.store)||e.valueField!==void 0&&!Dt(e.valueField)?null:m({type:"indexedDB",database:e.database,store:e.store},e.valueField!==void 0?{valueField:e.valueField}:{}):null}function Qr(e){return Array.isArray(e)&&e.every(t=>Dt(t)&&/^[^*\s]+\*?$/.test(t))?e:null}function Be(e,t){return e.keys.some(n=>es(n,t))&&!e.exclude.some(n=>es(n,t))}function es(e,t){return e.endsWith("*")?t.startsWith(e.slice(0,-1)):t===e}function fd(e){let t=e.endsWith("*")?e.slice(0,-1):e;return id.some(n=>t.startsWith(n)||e.endsWith("*")&&n.startsWith(t))}function Dt(e){return typeof e=="string"&&e.length>0}function Qe(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}var yd=2e3,vn="restored-settings";async function ns(e){await fe(vn,e).catch(()=>{})}async function ut(e){var i,o;let t={},n=new Set;for(let[r,a]of md(e,ss())){let c=window.localStorage.getItem(r);c!==null&&((o=t[i=a.id])!=null||(t[i]={storage:"localStorage",values:{}}),t[a.id].values[r]=c)}return await Promise.all(e.items.filter(r=>r.storage.type==="indexedDB").map(async r=>{let a=await hd(r);a===null?n.add(r.id):Object.keys(a).length>0&&(t[r.id]={storage:"indexedDB",values:a})})),{settings:t,unavailable:n}}function md(e,t){var r,a;let n=new Map,i=[];for(let c of e.items)if(c.storage.type==="localStorage")for(let l of c.keys)l.endsWith("*")?i.push([l.slice(0,-1),c]):n.set(l,c);let o=new Map;for(let c of t){let l=(a=n.get(c))!=null?a:(r=i.find(([u])=>c.startsWith(u)))==null?void 0:r[1];l&&Be(l,c)&&o.set(c,l)}return o}async function xn(e,t,n){let i=n.flatMap(r=>{let a=e.items.find(l=>l.id===r),c=a?rs(a,t[r]):null;return a&&c?[{item:a,saved:c}]:[]});for(let{item:r,saved:a}of i)r.storage.type==="indexedDB"&&await Sd(r,a);let o=ss();for(let{item:r,saved:a}of i)if(r.storage.type==="localStorage"){for(let c of o)Be(r,c)&&!(c in a)&&window.localStorage.removeItem(c);for(let[c,l]of Object.entries(a))window.localStorage.setItem(c,l)}}function pd(e,t,n){return t?e.items.flatMap(i=>{var c,l;let o=rs(i,t[i.id]);if(!o||n.unavailable.has(i.id))return[];let r=(l=(c=n.settings[i.id])==null?void 0:c.values)!=null?l:{};return[...new Set([...Object.keys(o),...Object.keys(r)])].some(u=>!gd(i,o[u],r[u]))?[i.id]:[]}):[]}async function is(e){if(!e)return[];let t=await Ee();if(!t)return[];let n=Ot(t.items);return pd(t,e,await ut(t)).flatMap(i=>{let o=n.get(i);return o?[o]:[]})}function os(e,t,n){let i=new TextEncoder,o=t+i.encode(`,${JSON.stringify("extension_settings")}:{}`).byteLength,r=Object.entries(e).map(([l,u])=>({id:l,entry:u,bytes:i.encode(`${JSON.stringify(l)}:${JSON.stringify(u)}`).byteLength})).sort((l,u)=>l.bytes-u.bytes||l.id.localeCompare(u.id)),a={},c=!0;for(let{id:l,entry:u,bytes:d}of r){let f=d+(c?0:1);if(o+f>n)break;o+=f,a[l]=u,c=!1}return a}function rs(e,t){if(!t||typeof t!="object"||t.storage!==e.storage.type||!t.values||typeof t.values!="object"||Array.isArray(t.values))return null;let n={};for(let[i,o]of Object.entries(t.values))Be(e,i)&&((e.storage.type==="localStorage"?typeof o!="string":!kn(o))||(n[i]=o));return Object.keys(n).length>0?n:null}function gd(e,t,n){if(t===void 0||n===void 0)return t===n;let i=e.storage.type==="indexedDB"?e.storage.valueField:void 0,o=r=>i&&r&&typeof r=="object"&&!Array.isArray(r)?r[i]:r;return J(o(t))===J(o(n))}function kn(e){return e===null||typeof e=="string"||typeof e=="boolean"?!0:typeof e=="number"?Number.isFinite(e):Array.isArray(e)?e.every(kn):typeof e=="object"&&Object.getPrototypeOf(e)===Object.prototype?Object.values(e).every(kn):!1}function ss(){let e=[];for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);n!==null&&e.push(n)}return e}async function hd(e){let t=e.storage;return as(t,"readonly",(n,i)=>{let o={},r=n.openCursor();r.onsuccess=()=>{let a=r.result;if(!a)return i(o);let c=a.key;typeof c=="string"&&Be(e,c)&&kn(a.value)&&(o[c]=a.value),a.continue()}}).catch(()=>null)}async function Sd(e,t){let n=e.storage;if(await as(n,"readwrite",(o,r)=>{let a=o.openCursor();a.onsuccess=()=>{let c=a.result;if(c){let l=c.key;typeof l=="string"&&Be(e,l)&&!(l in t)&&c.delete(),c.continue();return}for(let[l,u]of Object.entries(t))o.put(u,l);r(!0)}})===null)throw new Error("Syncify couldn't write an extension's settings. Restart Spotify and try again.")}function as(e,t,n){let i;try{i=window.indexedDB}catch(r){return Promise.resolve(null)}if(!i)return Promise.resolve(null);let o=i;return new Promise((r,a)=>{let c=!1,l=null,u=y=>{c||(c=!0,clearTimeout(d),y())},d=setTimeout(()=>{u(()=>a(new Error("The extension's database took too long.")));try{l==null||l.abort()}catch(y){}},yd),f;try{f=o.open(e.database)}catch(y){u(()=>r(null));return}f.onupgradeneeded=()=>{var y;return(y=f.transaction)==null?void 0:y.abort()},f.onerror=()=>{let y=f.error;u(()=>(y==null?void 0:y.name)==="AbortError"?r(null):a(y))},f.onblocked=()=>u(()=>a(new Error("The extension's database is busy."))),f.onsuccess=()=>{let y=f.result;if(y.onversionchange=()=>y.close(),c||!y.objectStoreNames.contains(e.store)){y.close(),u(()=>r(null));return}try{let S=y.transaction(e.store,t);l=S;let w=null;n(S.objectStore(e.store),v=>{w=v}),S.oncomplete=()=>{y.close(),u(()=>r(w))},S.onerror=S.onabort=()=>{y.close(),u(()=>{var v;return a((v=S.error)!=null?v:new Error("IndexedDB failed."))})}}catch(S){y.close(),u(()=>a(S))}}})}var bd=/^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/,wd=100,kd="marketplace:installed-extensions",vd="marketplace:installed-themes",xd="marketplace:theme-installed",Cd="marketplace:installed:",Id="marketplace";function _i(e){return Spicetify.Config?Mi(Spicetify.Config,e):null}function Mi(e,t){var r;let n=Ke(e),i=new Set(Rd(t)),o=((r=t[xd])==null?void 0:r.includes(Cd))===!0;return{current_theme:o?Id:n.current_theme,color_scheme:o?"":n.color_scheme,extensions:n.extensions.filter(a=>!i.has(a)),custom_apps:n.custom_apps}}function Ke(e){let t=e&&typeof e=="object"?e:{};return{current_theme:Ai(t.current_theme)?t.current_theme:"",color_scheme:Ai(t.color_scheme)?t.color_scheme:"",extensions:cs(t.extensions),custom_apps:cs(t.custom_apps)}}function ds(e,t){return J(Ke(e))===J(Ke(t))}function cs(e){return Array.isArray(e)?[...new Set(e.filter(Ai))].sort().slice(0,wd):[]}function Ai(e){return typeof e=="string"&&bd.test(e)}function Rd(e){let t=ls(e[kd]).map(i=>{var r;let o=(r=us(e[i]))==null?void 0:r.manifest;return o&&typeof o=="object"?o.main:void 0}),n=ls(e[vd]).flatMap(i=>{var r;let o=(r=us(e[i]))==null?void 0:r.include;return Array.isArray(o)?o:[]});return[...t,...n].flatMap(i=>{let o=typeof i=="string"?i.split("/").pop():void 0;return o?[o]:[]})}function ls(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function us(e){try{let t=e?JSON.parse(e):null;return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch(t){return null}}var Ed=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],Nd="marketplace:installed:",fs=`${Nd}snippet:`,Pd="wsoltani/syncify",Td="marketplace",ys={added:0,removed:1,unchanged:2};function ie(e){let t=new Map;for(let[n,i]of Ed)for(let o of Bd(e[n]))t.has(o)||t.set(o,_d(o,i,e[o]));return[...t.values()]}function Rn(e,t,n,i){let o=new Set(e.map(l=>l.key)),r=new Map(n.map(l=>[l.key,l])),a=[...e.map(l=>{let u=r.get(l.key);return b(m({},l),{change:u?"unchanged":"added",isNew:!u||u.sources.join(" ")!==l.sources.join(" ")})}),...n.filter(l=>!o.has(l.key)).map(l=>b(m({},l),{change:Ut(l,e)?"unchanged":"removed",isNew:!1}))].sort((l,u)=>ys[l.change]-ys[u.change]||l.name.localeCompare(u.name)),c={added:0,removed:0,unchanged:0};for(let l of a)c[l.change]+=1;return{items:a,counts:c,manual:Ad(t,i)}}function Ut(e,t){return e.type==="extension"&&In(e)&&!t.some(In)}function In(e){var t;return((t=e.repo)==null?void 0:t.toLowerCase())===Pd}function Ad(e,t){if(!e)return[];let n=Ke(e),i=Ke(t),o=[...n.extensions.filter(a=>!i.extensions.includes(a)).map(a=>({type:"extension",name:a})),...n.custom_apps.filter(a=>!i.custom_apps.includes(a)).map(a=>({type:"custom_app",name:a}))],r=n.current_theme;return r&&r!==Td&&(r!==i.current_theme||n.color_scheme!==i.color_scheme)&&o.push(m({type:"theme",name:r},n.color_scheme?{scheme:n.color_scheme}:{})),o}function _d(e,t,n){var l,u;let i=ms(n),o=ms(i==null?void 0:i.manifest),r=Cn(i==null?void 0:i.user),a=Cn(i==null?void 0:i.repo),c=(u=(l=Cn(i==null?void 0:i.title))!=null?l:Cn(o==null?void 0:o.name))!=null?u:e.startsWith(fs)?e.slice(fs.length):e.split("/").pop()||e;return{key:e,type:t,name:c,repo:t!=="snippet"&&r&&a?`${r}/${a}`:null,sources:Md(t,i),custom:t==="snippet"&&(i==null?void 0:i.custom)===!0}}function Md(e,t){return t?(e==="extension"?[t.extensionURL]:e==="theme"?[t.cssURL,t.schemesURL,...Array.isArray(t.include)?t.include:[]]:[]).filter(i=>typeof i=="string"&&i!==""):[]}function Cn(e){return typeof e=="string"&&e.trim()?e.trim():null}function Bd(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function ms(e){let t=e;if(typeof e=="string")try{t=JSON.parse(e)}catch(n){return null}return t&&typeof t=="object"&&!Array.isArray(t)?t:null}var En="spicetify-marketplace";var $t="settings";async function ps(){let e=await Ss();if(e.kind!=="ok")return null;try{let t=await bs(e.db,"readonly",i=>i.getAll());if(!t)return null;let n={};for(let i of t)typeof(i==null?void 0:i.key)=="string"&&typeof i.value=="string"&&(n[i.key]=i.value);return n}finally{e.db.close()}}async function gs(e,t=[]){let n=await Ss();if(n.kind==="unavailable")return"unavailable";let i=n.kind==="ok"?n.db:await Ld();if(!i)return"failed";try{return await bs(i,"readwrite",r=>{let a;for(let[c,l]of Object.entries(e))a=r.put({key:c,value:l});for(let c of t)a=r.delete(c);return a})===null?"failed":"written"}finally{i.close()}}function hs(){var e;try{return(e=window.indexedDB)!=null?e:null}catch(t){return null}}async function Ss(){let e=hs();return e?await Od(e)?{kind:"missing"}:new Promise(t=>{let n=!1,i=e.open(En);i.onupgradeneeded=()=>{n=!0},i.onerror=()=>{console.warn("Syncify could not open Marketplace storage",i.error),t({kind:"unavailable"})},i.onblocked=()=>t({kind:"unavailable"}),i.onsuccess=()=>{let o=i.result;if(n){o.close(),Dd(e).then(()=>t({kind:"missing"}));return}if(!o.objectStoreNames.contains($t)){o.close(),t({kind:"unavailable"});return}t({kind:"ok",db:o})}}):{kind:"unavailable"}}function Ld(){let e=hs();return e?new Promise(t=>{let n=e.open(En,1);n.onupgradeneeded=()=>{let i=n.result;i.objectStoreNames.contains($t)||i.createObjectStore($t,{keyPath:"key"})},n.onerror=()=>{console.warn("Syncify could not create Marketplace storage",n.error),t(null)},n.onblocked=()=>t(null),n.onsuccess=()=>t(n.result)}):Promise.resolve(null)}async function Od(e){if(typeof e.databases!="function")return!1;try{return!(await e.databases()).some(n=>n.name===En)}catch(t){return!1}}function Dd(e){return new Promise(t=>{let n=e.deleteDatabase(En);n.onsuccess=()=>t(),n.onerror=()=>t(),n.onblocked=()=>t()})}function bs(e,t,n){return new Promise(i=>{let o;try{o=e.transaction($t,t)}catch(u){console.warn("Syncify could not open a Marketplace transaction",u),i(null);return}let r,a=!1,c=u=>{a||(a=!0,i(u))};o.oncomplete=()=>c(r),o.onerror=()=>{console.warn("Syncify Marketplace transaction failed",o.error),c(null)},o.onabort=()=>{console.warn("Syncify Marketplace transaction aborted",o.error),c(null)};let l;try{l=n(o.objectStore($t))}catch(u){console.warn("Syncify Marketplace request could not be issued",u),c(null);return}l&&(l.onsuccess=()=>{r=l.result},l.onerror=()=>{console.warn("Syncify Marketplace request failed",l.error),c(null)})})}var Bi="marketplace:",Pn=["marketplace:installed-extensions","marketplace:installed-snippets","marketplace:installed-themes"];async function we(){let e=qd(),t=await ps();if(t)for(let[n,i]of Object.entries(t))n.startsWith(Bi)&&(e[n]=i);return e}var $d=new Set(["marketplace:active-tab","marketplace:sort"]),Li="marketplace:installed:",Nn="marketplace:theme-installed",Hd=["stars","tags","lastUpdated","created"],Kd=750*1024;async function Tn(e,t){let n={};for(let[i,o]of Object.entries(e))$d.has(i)||(n[i]=i.startsWith(Li)?zd(o):o);return t&&(n.spicetify_config=Ke(t)),wn(J(n))}function zd(e){try{let t=JSON.parse(e);if(!t||typeof t!="object"||Array.isArray(t))return e;for(let n of Hd)delete t[n];return t}catch(t){return e}}async function An(){let e=await we(),t=_i(e);return{keyCount:Object.keys(e).length,hash:await Tn(e,t),installedItemCount:Yd(e),installedItems:_n(e),items:ie(e),spicetifyConfig:t,marketplaceAvailable:Vd(e),activeTheme:Ht(e[Nn])}}function Ht(e){if(!e)return null;if(e.startsWith(Li))return e;try{let t=JSON.parse(e);return typeof t=="string"?t:null}catch(t){return null}}async function ws(){let[e,t]=await Promise.all([we(),Fd()]),n=_i(e),i=m({schema_version:3,metadata:{last_sync_datetime:new Date().toISOString(),device_info:Xr(),marketplace_key_count:Object.keys(e).length},payload_hash:await Tn(e,n),marketplace_data:{keys:e}},n?{spicetify_config:n}:{});if(Object.keys(t).length===0)return i;let o=new TextEncoder().encode(JSON.stringify(i)).byteLength,r=os(t,o,Kd);return Object.keys(r).length>0?b(m({},i),{extension_settings:r}):i}async function Fd(){try{let e=await Ee();return e?(await ut(e)).settings:{}}catch(e){return{}}}async function ks(e,t=[]){var r,a;let n={},i=(a=(r=e.marketplace_data)==null?void 0:r.keys)!=null?a:{};for(let[c,l]of Object.entries(i))c.startsWith(Bi)&&(n[c]=l);if(Object.keys(n).length===0)return 0;await jd(n),t.length>0&&await Wd(n,t);let o=Di(await we(),n);return await Oi(n,o),Object.keys(n).length}async function Oi(e,t=[]){for(let[i,o]of Object.entries(e))window.localStorage.setItem(i,o);for(let i of t)window.localStorage.removeItem(i);if(await gs(e,t)==="failed")throw new Error("Syncify could not write to Marketplace storage. Restart Spotify and try again.")}function Di(e,t){let n=new Set(Pn.flatMap(a=>{var c;return Mn((c=t[a])!=null?c:e[a]).map(String)})),i=_n(e).filter(a=>a.startsWith(Li)&&!n.has(a)),o=i.filter(a=>e[a]!==void 0&&t[a]===void 0),r=e[Nn];return r&&t[Nn]===void 0&&i.some(a=>r.includes(a))&&o.push(Nn),o}async function jd(e){let t=await we(),n=ie(e),i=ie(t).filter(a=>Ut(a,n));if(i.length===0)return;let o="marketplace:installed-extensions",r=Mn(e[o]).map(String);for(let a of i)r.includes(a.key)||r.push(a.key),e[a.key]=t[a.key];e[o]=JSON.stringify(r)}async function Wd(e,t){let n=await we(),i=_n(n);for(let o of Pn){if(e[o]===void 0)continue;let r=Mn(e[o]).map(String).filter(a=>!t.includes(a)||i.includes(a));e[o]=JSON.stringify(r)}for(let o of t)n[o]!==void 0?e[o]=n[o]:delete e[o]}function Yd(e){return _n(e).length}function _n(e){return Pn.flatMap(t=>Mn(e[t]).map(String))}function Vd(e){return!!(window.Marketplace||Pn.some(n=>e[n]!==void 0)||e["marketplace:tabs"]!==void 0)}function vs(e,t){return t===0?!1:e===0?!0:e<Math.max(2,Math.floor(t*.5))}function qd(){let e={};for(let t=0;t<window.localStorage.length;t+=1){let n=window.localStorage.key(t);if(!(n!=null&&n.startsWith(Bi)))continue;let i=window.localStorage.getItem(n);i!==null&&(e[n]=i)}return e}function Mn(e){if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch(t){return[]}}var Gd="raw.githubusercontent.com",Jd="cdn.jsdelivr.net",xs=".github.io";function $i(e){var n;if(e.protocol!=="https:")return null;let t=e.pathname.split("/").filter(Boolean);if(e.host===Gd)return Ui(t[0],t[1]);if(e.host===Jd)return t[0]==="gh"?Ui(t[1],(n=t[2])==null?void 0:n.split("@")[0]):null;if(e.host.endsWith(xs)){let i=e.host.slice(0,-xs.length);return i.includes(".")?null:Ui(i,t.length>1?t[0]:e.host)}return null}function Ui(e,t){return e&&t?`${e}/${t}`:null}var Xd={extension:"spicetify-extensions",theme:"spicetify-themes"},Zd="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json",Qd="https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json",ef="https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/",tf="https://api.github.com/repos",nf=5e3,of=20,Cs="syncify:repo-topics",Is=10080*60*1e3,rf=200;function dt(e){return(e==null?void 0:e.kind)==="host"||(e==null?void 0:e.kind)==="repo"||(e==null?void 0:e.kind)==="blocked"||(e==null?void 0:e.kind)==="catalog"}function ft(e){let t=new Map;for(let n of e){if(n.change==="removed")continue;if(n.custom){t.set(n.key,{kind:"custom"});continue}let i=sf(n);i&&t.set(n.key,i)}return t}async function yt(e,t){let n=new Map,i=e.filter(a=>a.change!=="removed"&&a.isNew&&!t.has(a.key));if(i.length===0)return n;let o=i.filter(a=>a.type==="snippet"),r=i.filter(a=>a.type!=="snippet");if(o.length>0){let a=await Hi();for(let c of o)a?Bn(a,c.name)||n.set(c.key,{kind:"catalog"}):n.set(c.key,{kind:"unchecked"})}if(r.length>0){let a=await lf(),c=ff(),l=0;await Promise.all(r.map(async u=>{let d=af(u),f=Xd[u.type];if(!d||!f)return;if(a===null){n.set(u.key,{kind:"unchecked"});return}if(cf(d,a)){n.set(u.key,{kind:"blocked"});return}let y=df(c,d);y===void 0&&l<of&&(l+=1,y=await uf(d),y!==void 0&&(c[d.toLowerCase()]={topics:y,at:Date.now()})),y===void 0?n.set(u.key,{kind:"unchecked"}):(y===null||!y.includes(f))&&n.set(u.key,{kind:"catalog"})})),yf(c)}return n}function sf(e){let t=null;for(let n of e.sources){let i;try{i=new URL(n)}catch(r){return{kind:"host",host:n.slice(0,40)}}let o=$i(i);if(!o)return{kind:"host",host:i.host};e.repo&&o.toLowerCase()!==e.repo.toLowerCase()&&(t!=null||(t=o))}return t?{kind:"repo",repo:t}:null}function af(e){for(let t of e.sources)try{let n=$i(new URL(t));if(n)return n}catch(n){}return e.repo}function cf(e,t){let n=`https://github.com/${e}`.toLowerCase();return t.some(i=>{let o=i.toLowerCase();if(!o.includes("*"))return o===n;let r=o.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]+");return new RegExp(`^${r}$`).test(n)})}function Rs(e){return e.replace(/\n/g,"").trim().toLowerCase()}function Bn(e,t){return e.get(Rs(t))}var Kt=null,zt=null;function lf(){return Kt!=null||(Kt=Es(Zd).then(e=>{let t=e==null?void 0:e.repos;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&!n.startsWith("//")):(Kt=null,null)})),Kt}function Hi(){return zt!=null||(zt=Es(Qd).then(e=>{if(!Array.isArray(e))return zt=null,null;let t=new Map;for(let n of e){if(typeof(n==null?void 0:n.title)!="string"||typeof n.code!="string")continue;let i=typeof n.preview=="string"?n.preview:null;t.set(Rs(n.title),m({title:n.title,code:n.code,description:typeof n.description=="string"?n.description:""},i?{imageURL:i.startsWith("http")?i:`${ef}${i}`}:{}))}return t})),zt}async function uf(e){let t=await Ns(`${tf}/${e}`);if((t==null?void 0:t.status)===404)return null;if(!(t!=null&&t.ok))return;let n=await t.json().catch(()=>null);return Array.isArray(n==null?void 0:n.topics)?n.topics.filter(i=>typeof i=="string"):void 0}async function Es(e){let t=await Ns(e);return t!=null&&t.ok?t.json().catch(()=>null):null}async function Ns(e){let t=typeof AbortController=="function"?new AbortController:null,n=setTimeout(()=>t==null?void 0:t.abort(),nf);try{return await fetch(e,{signal:t==null?void 0:t.signal})}catch(i){return null}finally{clearTimeout(n)}}function df(e,t){let n=e[t.toLowerCase()];return n&&Date.now()-n.at<Is?n.topics:void 0}function ff(){var e;try{let t=JSON.parse((e=localStorage.getItem(Cs))!=null?e:"{}");return t&&typeof t=="object"?t:{}}catch(t){return{}}}function yf(e){let t=Date.now(),n=Object.entries(e).filter(([,i])=>t-i.at<Is).sort(([,i],[,o])=>o.at-i.at).slice(0,rf);try{localStorage.setItem(Cs,JSON.stringify(Object.fromEntries(n)))}catch(i){}}var mf=/^[0-9A-HJKMNP-TV-Z]{6}$/,pf=6,gf="SYN-",_s=60,Ki=20,Ms=[["marketplace:installed-extensions","extension"],["marketplace:installed-themes","theme"],["marketplace:installed-snippets","snippet"]],et="marketplace:theme-installed",Ps="marketplace",Ts={added:0,removed:1,unchanged:2},hf=new RegExp(`^[a-z0-9][a-z0-9_-]{1,${Ki-2}}[a-z0-9]$`);function zi(e){let t=e.trim().replace(/^@/,"").toLowerCase();return/[^a-z0-9_-]/.test(t)?"Only letters, digits, _ and -":t.length<3?"At least 3 characters":!/^[a-z0-9]/.test(t)||!/[a-z0-9]$/.test(t)?"Start and end with a letter or digit":null}function Ne(e){return`${gf}${e}`}function Bs(e){let t=e.trim();if(t.length>200)return null;if(t.includes("/")){let i=t.split(/[?#]/)[0].replace(/\/+$/,"");t=i.slice(i.lastIndexOf("/")+1).replace(/\.json$/i,"")}t=t.toUpperCase().replace(/[\s-]/g,""),t.length===pf+3&&t.startsWith("SYN")&&(t=t.slice(3));let n=t.replace(/O/g,"0").replace(/[IL]/g,"1");return mf.test(n)?n:null}function Ls(e){let t=e;return!t||typeof t.code!="string"||!t.keys||typeof t.keys!="object"||!Object.values(t.keys).every(n=>typeof n=="string")?null:{code:t.code,name:typeof t.name=="string"&&t.name?t.name:null,creator:typeof t.creator=="string"&&hf.test(t.creator)?t.creator:null,updated_at:typeof t.updated_at=="number"?t.updated_at:0,keys:t.keys}}async function Os(e,t){let n=e.filter(a=>!In(a)).map(a=>b(m({},a),{change:"added",isNew:!0})),i=ft(n);for(let a of n)!i.has(a.key)&&!Sf(a,t[a.key])&&i.set(a.key,{kind:"catalog"});let o=await yt(n,i),r=new Map;for(let[a,c]of[...o,...i])c.kind!=="unchecked"&&r.set(a,c);return{items:n,leftOut:r}}function Sf(e,t){if(e.type==="snippet")return!0;if(!e.repo)return!1;let n=kf(t);return e.type==="extension"?typeof(n==null?void 0:n.extensionURL)=="string"&&n.extensionURL!=="":typeof(n==null?void 0:n.cssURL)=="string"&&n.cssURL!==""}function Ds(e,t){let n={};for(let[o,r]of Ms){let a=t.filter(c=>c.type===r&&e[c.key]!==void 0).map(c=>c.key);n[o]=JSON.stringify(a);for(let c of a)n[c]=e[c]}let i=Ht(e[et]);return i&&t.some(o=>o.key===i)&&(n[et]=e[et]),n}function Us(e,t,n,i,o,r){let a=r==="replace"?Rn(t,void 0,n,i):bf(t,n),c=Ht(e.keys[et]),l=c!==null&&t.some(d=>d.key===c)&&i!==null&&i.current_theme!==Ps,u=c!==null&&c!==o?t.find(d=>d.key===c):void 0;return m(b(m({},a),{manual:l?[{type:"theme",name:Ps}]:[]}),u?{theme:{key:u.key,name:u.name}}:{})}function bf(e,t){let n=new Set(t.map(a=>a.key)),i=new Set(e.map(a=>a.key)),o=[...e.map(a=>n.has(a.key)?b(m({},a),{change:"unchanged",isNew:!1}):b(m({},a),{change:"added",isNew:!0})),...t.filter(a=>!i.has(a.key)).map(a=>b(m({},a),{change:"unchanged",isNew:!1}))].sort((a,c)=>Ts[a.change]-Ts[c.change]||a.name.localeCompare(c.name)),r={added:0,removed:0,unchanged:0};for(let a of o)r[a.change]+=1;return{items:o,counts:r,manual:[]}}function $s(e,t){return new Set(e.items.filter(n=>n.type==="snippet"&&n.change==="added"&&(!t||!Bn(t,n.name))).map(n=>n.key))}async function Hs(e,t,n,i){let o=await we(),r=ie(o),a=ie(e.keys),c={};for(let[f,y]of Ms){let S=As(o[f]),v=[...t==="add"?S:S.filter(g=>n.includes(g)||r.some(k=>k.key===g&&Ut(k,a)))];for(let g of a){if(g.type!==y||n.includes(g.key))continue;let k=S.includes(g.key);if(t==="add"&&k)continue;let E=y==="snippet"?wf(g,i,o[g.key]):e.keys[g.key];E!==void 0&&(c[g.key]=E,v.includes(g.key)||v.push(g.key))}c[f]=JSON.stringify(v)}let l=Ht(e.keys[et]),u=As(c["marketplace:installed-themes"]);l&&u.includes(l)&&!n.includes(l)&&(c[et]=e.keys[et]);let d=Di(o,c);return await Oi(c,d),Object.keys(c).length+d.length}function wf(e,t,n){let i=t?Bn(t,e.name):void 0;return i?JSON.stringify(m({code:i.code,title:i.title,description:i.description},i.imageURL?{imageURL:i.imageURL}:{})):n}function As(e){try{let t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(t){return[]}}function kf(e){try{let t=e?JSON.parse(e):null;return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch(t){return null}}var Ft="/api/shares",vf=`${Ft}/update`,xf=`${Ft}/delete`,Cf=`${Ft}/import`,If="x-syncify-user-hash",Rf="discover/presets.json",Ef={no_code:"This code doesn't exist.",too_many_codes:"You can't make more share codes. Delete one to make another.",daily_limit:"Too many changes to share codes today. Try again tomorrow.",too_large:"This setup is too big to share.",invalid_name:"Names can be up to 60 characters.",empty:"There's nothing to share yet. Install something from Marketplace first.",invalid_items:"Syncify couldn't read some items. Reload Spotify and try again.",source:"Some items don't load from GitHub. Reload Spotify and try again.",blocked:"Some items are on Marketplace's block list. Reload Spotify and try again.",custom_snippet:"Custom snippets can't be shared. Reload Spotify and try again.",unchecked:"Couldn't check Marketplace's block list. Try again in a minute.",publish_failed:"Couldn't publish the code. Press Update on it to try again.",delete_failed:"Couldn't delete the code. Try again.",same_setup:"You already shared this setup.",invalid_handle:"Handles are 3 to 20 letters, digits, _ or -, starting and ending with a letter or digit.",reserved_handle:"That handle isn't allowed. Pick another.",handle_taken:"That handle is taken. Pick another.",unavailable:"Share codes aren't available yet."},Nf=new Set(["offline","signed_out","invalid_signature","stale_salt","no_device_key","too_many_requests"]);function jt(e,t=null){var n;return e instanceof D&&Nf.has(e.code)?He(e):e instanceof D&&e.code==="too_many_codes"&&t!==null?`You have ${t} share codes already. Delete one to make another.`:(n=e instanceof D?Ef[e.code]:void 0)!=null?n:"Something went wrong. Try again."}async function Ln(){var t;let e=await _t(Ft,"GET");return{codes:Array.isArray(e==null?void 0:e.codes)?e.codes.flatMap(n=>{let i=Pf(n);return i?[i]:[]}):[],newHearts:typeof(e==null?void 0:e.new_hearts)=="number"?e.new_hearts:0,max:typeof(e==null?void 0:e.max)=="number"?e.max:null,profile:typeof((t=e==null?void 0:e.profile)==null?void 0:t.handle)=="string"?{handle:e.profile.handle,link:typeof e.profile.link=="string"?e.profile.link:null}:null,suggestedHandle:typeof(e==null?void 0:e.suggested_handle)=="string"?e.suggested_handle:null}}async function Ks(e,t,n){return qs(await _t(Ft,"POST",m({name:e,keys:t},n===void 0?{}:{handle:n})))}function zs(e){return`${U().shareUrl.replace(/\/+$/,"")}/@${e}`}async function Fs(e,t,n){return qs(await _t(vf,"POST",{code:e,name:t,keys:n}))}async function js(e){try{await _t(xf,"POST",{code:e})}catch(t){if(t instanceof D&&t.code==="no_code")return;throw t}}async function Ws(e){let t=U().shareUrl.replace(/\/+$/,""),n;try{n=await fetch(`${t}/${e}.json`)}catch(o){throw new D("offline")}if(n.status===404||n.status===403)throw new D("no_code");if(!n.ok)throw new D("failed");let i=Ls(await n.json().catch(()=>null));if(!i||i.code!==e)throw new D("no_code");return i}async function Ys(){let e=U().shareUrl.replace(/\/+$/,"");try{let t=await fetch(`${e}/${Rf}`);if(!t.ok)return null;let n=await t.json();return Array.isArray(n.posts)?n.posts.flatMap(i=>{let o=Af(i);return o?[o]:[]}):null}catch(t){return null}}async function Vs(e,t,n=!1){try{await zr(Cf,m({code:e},n?{source:"preset"}:{}),{[If]:t.hash})}catch(i){}}function Pf(e){let t=e;return!t||typeof t.code!="string"?null:{code:t.code,name:typeof t.name=="string"&&t.name?t.name:null,link:typeof t.link=="string"?t.link:null,item_count:typeof t.item_count=="number"?t.item_count:0,imports:typeof t.imports=="number"?t.imports:0,created_at:typeof t.created_at=="number"?t.created_at:0,updated_at:typeof t.updated_at=="number"?t.updated_at:0,posted:Tf(e.post)}}function Tf(e){let t=e==null?void 0:e.status;return typeof t=="string"&&t!=="removed"}function Af(e){let t=e,n=i=>Number.isSafeInteger(i)&&i>=0?i:0;return!t||typeof t.code!="string"?null:{code:t.code,name:typeof t.name=="string"?t.name:Ne(t.code),extensions:n(t.extensions),themes:n(t.themes),snippets:n(t.snippets)}}function qs(e){let t=e;if(typeof(t==null?void 0:t.code)!="string")throw new D("failed");return{code:t.code,link:typeof t.link=="string"?t.link:null,leftOut:Array.isArray(t.left_out)?t.left_out.length:0}}var Gs="/claims",_f="/claims/cancel",Mf={no_backup:"Back up first, then secure your backup.",unsupported_identity:"This Spotify account can't be secured.",too_many_accounts:"Your account already has 10 Spotify accounts linked.",undone:"This backup can't be secured with your account.",offline:"Couldn't reach Syncify. Check your connection and try again."},ze=class extends Error{constructor(n){var i;super((i=Mf[n])!=null?i:"Couldn't secure your backup. Try again.");this.code=n;this.name="ClaimError"}};async function Js(e,t){let n=await Fi(e,t,"GET",Gs);if(!n.ok)throw new ze(await ji(n));let i=await n.json().catch(()=>null);return{claim:Lt(i==null?void 0:i.claim),accounts:Array.isArray(i==null?void 0:i.accounts)?i.accounts.filter(Bf):null}}async function Xs(e,t){let n=await Fi(e,t,"POST",Gs);if(!n.ok)throw new ze(await ji(n));let i=await n.json().catch(()=>null);return Lt(i==null?void 0:i.claim)}async function Zs(e,t){let n=await Fi(e,t,"POST",_f);if(n.status===404)return"cancelled";if(!n.ok)throw new ze(await ji(n));let i=await n.json().catch(()=>null);return(i==null?void 0:i.held)===!0?"checking":"cancelled"}async function Fi(e,t,n,i){try{return await Re(e,t,{method:n},i)}catch(o){throw o instanceof TypeError?new ze("offline"):o}}async function ji(e){let t=await e.json().catch(()=>null);return typeof(t==null?void 0:t.code)=="string"?t.code:"failed"}function Bf(e){let t=e;return!!(t&&typeof t.hash=="string"&&(t.status==="pending"||t.status==="final"||t.status==="cancelled"||t.status==="unlinked"))}var Qs="[Syncify]";function oe(e,...t){console.debug(Qs,e,...t)}function de(e,...t){console.warn(Qs,e,...t)}var pt={key:"s",ctrl:!0,alt:!0,shift:!1,meta:!1},Lf=/^([a-z0-9]|f([1-9]|1[0-2]))$/,Of=250,Df=40,Wi=null,On=null,mt=null;function ea(){return/mac/i.test(navigator.platform||navigator.userAgent)}function ta(e){if(e===null)return null;if(!e||typeof e!="object")return pt;let t=e;return typeof t.key!="string"||!Lf.test(t.key)?pt:{key:t.key,ctrl:!!t.ctrl,alt:!!t.alt,shift:!!t.shift,meta:!!t.meta}}function Wt(e){if(!e)return"Off";let t=e.key.toUpperCase();return ea()?[e.ctrl?"\u2318":"",e.alt?"\u2325":"",e.shift?"\u21E7":"",t].join(""):[e.ctrl&&"Ctrl",e.meta&&"Win",e.alt&&"Alt",e.shift&&"Shift",t].filter(Boolean).join("+")}function na(e){if(e.key==="Escape")return{kind:"cancel"};let t=Uf(e.code);if(!t)return{kind:"ignore"};let n=ea();if(n&&e.ctrlKey)return{kind:"error",message:"Control isn't supported on macOS. Use \u2318 or \u2325 instead."};let i={key:t,ctrl:n?e.metaKey:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:n?!1:e.metaKey},o=t.startsWith("f")&&t.length>1;return!i.ctrl&&!i.alt&&!i.meta&&!o?{kind:"error",message:`Include ${n?"\u2318 or \u2325":"Ctrl or Alt"} so the shortcut doesn't fire while typing.`}:{kind:"shortcut",shortcut:i}}function Uf(e){var n,i;let t=/^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(e);return t?((i=(n=t[1])!=null?n:t[2])!=null?i:t[3]).toLowerCase():null}function ia(e){var t;if(mt&&$f(mt,e))return!1;try{let n=Spicetify.Mousetrap,i=(t=n.trigger)==null?void 0:t.call(n)._directMap;if(!i)return!1;let o=Yi(e);return Object.keys(i).some(r=>r.startsWith(`${o}:`))}catch(n){return!1}}function Vi(e,t,n=0){if(Wi=t,On=e,!oa()){if(n>=Df){de("Spicetify.Keyboard unavailable; shortcut not registered");return}setTimeout(()=>Vi(On,t,n+1),Of);return}qi(On)}function qi(e){if(On=e,!oa()||!Wi)return;let t=Wi;try{if(mt&&Spicetify.Keyboard._deregisterShortcut(mt),mt=null,!e)return;Spicetify.Keyboard.registerShortcut(e,n=>{n.preventDefault(),t()}),mt=e,oe("Keyboard shortcut registered",Wt(e))}catch(n){de("Failed to register keyboard shortcut",n)}}function oa(){var e;return typeof((e=Spicetify.Keyboard)==null?void 0:e.registerShortcut)=="function"}function Yi(e){return[e.ctrl&&"mod",e.meta&&"meta",e.alt&&"alt",e.shift&&"shift",e.key].filter(Boolean).join("+")}function $f(e,t){return Yi(e)===Yi(t)}var Gi="both",Hf=["both","topbar","menu"],Yt=null,Vt=null,Dn=!1;function ra(e){return Hf.includes(e)?e:Gi}function Un(){var e;return typeof((e=Spicetify.Menu)==null?void 0:e.Item)=="function"}function sa(e){Yt=e.topbarButton,Vt=e.menuItem}function $n(e){let t=e!=="menu"||!Vt,n=e!=="topbar";if(Yt!=null&&Yt.element&&(Yt.element.style.display=t?"":"none"),!!Vt)try{n&&!Dn?(Vt.register(),Dn=!0):!n&&Dn&&(Vt.deregister(),Dn=!1)}catch(i){de("Failed to update profile menu item",i)}}var Hn="syncify:config",gt={workerUrl:U().workerUrl,autoBackupEnabled:!1,shortcut:pt,entryPoint:Gi,settingsSyncEnabled:!0,settingsSyncOff:[],shareRestoredSettings:!0};function q(){var n,i;let e=U(),t=(i=(n=Spicetify.LocalStorage)==null?void 0:n.get(Hn))!=null?i:window.localStorage.getItem(Hn);if(!t)return b(m({},gt),{workerUrl:e.workerUrl});try{let o=JSON.parse(t);return{workerUrl:e.workerUrl,autoBackupEnabled:Ji(o.autoBackupEnabled,gt.autoBackupEnabled),shortcut:o.shortcut===void 0?gt.shortcut:ta(o.shortcut),entryPoint:ra(o.entryPoint),settingsSyncEnabled:Ji(o.settingsSyncEnabled,gt.settingsSyncEnabled),settingsSyncOff:Kf(o.settingsSyncOff),shareRestoredSettings:Ji(o.shareRestoredSettings,gt.shareRestoredSettings)}}catch(o){return b(m({},gt),{workerUrl:e.workerUrl})}}function tt(e){var n;let t=JSON.stringify({workerUrl:U().workerUrl,autoBackupEnabled:e.autoBackupEnabled,shortcut:e.shortcut,entryPoint:e.entryPoint,settingsSyncEnabled:e.settingsSyncEnabled,settingsSyncOff:e.settingsSyncOff,shareRestoredSettings:e.shareRestoredSettings});if((n=Spicetify.LocalStorage)!=null&&n.set){Spicetify.LocalStorage.set(Hn,t);return}window.localStorage.setItem(Hn,t)}function Kf(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ji(e,t){return e===void 0?t:!!e}function qt(e){return typeof e.workerUrl=="string"&&e.workerUrl.length>0}var zf=["username","canonicalUsername","id","uri","displayName"];async function me(){let{value:e,field:t}=await Ff();return{hash:await wn(e),field:t}}async function Ff(){var o;let e=(o=Spicetify.Platform)==null?void 0:o.UserAPI;if(!(e!=null&&e.getUser))throw new Error("Spicetify Platform UserAPI is unavailable.");let t=await e.getUser(),n=zf.find(r=>(t==null?void 0:t[r])!=null),i=n?t[n]:void 0;if(!n||!i)throw new Error("Unable to resolve the active Spotify user.");return{value:i,field:n}}async function Jt(e,t){if(!qt(e))throw new Error("Syncify backup service is not configured.");let[n,i]=await Promise.all([me(),ws()]);if(i.metadata.marketplace_key_count===0)throw new Error("Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.");let{unchanged:o,unapproved:r,settings:a}=await Yr(e.workerUrl,n,i,t==null?void 0:t.part);return{payload:i,unchanged:o,unapproved:r,settings:a}}async function nt(e,t,n){var u;if(!qt(e))throw new Error("Syncify backup service is not configured.");let i=await Ni(e.workerUrl,await me(),t,n==null?void 0:n.part),[o,r,a,c]=await Promise.all([Promise.all(i.backups.map(Kn)),i.safetyCopy?Kn(i.safetyCopy):null,Promise.all(i.pinned.map(Kn)),Promise.all(i.unapproved.map(Kn))]),l=o.filter((d,f)=>o.findIndex(y=>y.payload_hash===d.payload_hash)===f);return b(m({},i),{payload:(u=l[0])!=null?u:null,backups:l,safetyCopy:r,pinned:a,unapproved:c.filter(d=>!l.some(f=>f.payload_hash===d.payload_hash))})}var Xi=new Map;async function Kn(e){var r,a,c;let t=(a=(r=e.marketplace_data)==null?void 0:r.keys)!=null?a:{},n=e.spicetify_config?Mi(e.spicetify_config,t):void 0,i=`${e.payload_hash} ${(c=e.metadata)==null?void 0:c.last_sync_datetime}`,o=Xi.get(i);return o||(o=Tn(t,n),Xi.set(i,o),o.catch(()=>Xi.delete(i))),b(m(m({},e),n?{spicetify_config:n}:{}),{payload_hash:await o})}async function aa(e,t){let n=await Ni(Xt(e),await me(),void 0,t==null?void 0:t.part);return{claim:n.claim,install:n.install,nudge:n.nudge,backups:n.backups,settings:n.settings}}async function ca(e,t,n,i=[],o={ids:[],share:!1}){var l;let r=t!=null?t:(await nt(e)).payload;if(!r)throw new Error("No Syncify cloud backup was found for this Spotify account.");await jf(r,o);let a=await ks(r,i),c=(l=r.backup)==null?void 0:l.id;return c&&qt(e)&&me().then(u=>Gr(e.workerUrl,u,c,n)).catch(()=>{}),{payload:r,restoredCount:a}}async function jf(e,t){if(t.ids.length===0||!e.extension_settings)return;let n=await Ee();n&&(await xn(n,e.extension_settings,t.ids),await ns(m({at:Date.now()},t)))}var Gt=class extends Error{constructor(n){super("Couldn't back up your setup first, so nothing changed.");this.reason=n;this.name="SafetyBackupError"}};async function la(e,t,n,i,o,r=!1){try{await Jt(e)}catch(c){throw new Gt(c)}let a=await Hs(t,n,i,o);return me().then(c=>Vs(t.code,c,r)).catch(()=>{}),a}async function ua(e){let t=await me(),n=await Js(Xt(e),t);return b(m({},n),{hash:t.hash})}async function da(e){await Xs(Xt(e),await me())}async function zn(e,t,n){await Vr(Xt(e),await me(),t,n)}async function Fn(e){return Zs(Xt(e),await me())}function Xt(e){if(!qt(e))throw new Error("Syncify backup service is not configured.");return e.workerUrl}var fa="syncify:nudge-hidden-until",ya="syncify:nudge-panel-shown";function ma(e=Date.now()){let t=Number(Sa(fa));return Number.isFinite(t)&&t>e}function pa(e=Date.now()){ba(fa,String(e+30*864e5))}function ga(){return Sa(ya)!==null}function ha(){ba(ya,"1")}function Sa(e){var t,n;return(n=(t=Spicetify.LocalStorage)==null?void 0:t.get(e))!=null?n:window.localStorage.getItem(e)}function ba(e,t){var n;(n=Spicetify.LocalStorage)!=null&&n.set?Spicetify.LocalStorage.set(e,t):window.localStorage.setItem(e,t)}var ka="settings-sync",Wn="syncify:settings-sync",Wf=17946e8,Yf={since:0,pulled:!1,firstSyncDone:!1,account:{},base:{},seen:{},heldSent:{},deleted:{}},wa={bytes:0,limit:0,items:[],choices:[],arrived:null,budgetDay:null},Zi=new Set;function Pe(){var t,n;let e=(n=(t=Spicetify.LocalStorage)==null?void 0:t.get(Wn))!=null?n:window.localStorage.getItem(Wn);if(!e)return wa;try{let i=JSON.parse(e);return{bytes:typeof i.bytes=="number"?i.bytes:0,limit:typeof i.limit=="number"?i.limit:0,items:Array.isArray(i.items)?i.items:[],choices:Array.isArray(i.choices)?i.choices:[],arrived:i.arrived&&Array.isArray(i.arrived.ids)?i.arrived:null,budgetDay:typeof i.budgetDay=="string"?i.budgetDay:null}}catch(i){return wa}}function ht(e){var n;let t=JSON.stringify(e);(n=Spicetify.LocalStorage)!=null&&n.set?Spicetify.LocalStorage.set(Wn,t):window.localStorage.setItem(Wn,t);for(let i of Zi)i(e)}function qn(e){return Zi.add(e),()=>Zi.delete(e)}function va(){let e=Pe();e.arrived&&ht(b(m({},e),{arrived:null}))}function xa(){let e=Pe();e.arrived&&ht(b(m({},e),{arrived:b(m({},e.arrived),{hidden:!0})}))}function Gn(e){return`${e.length>=3?`${e[0]}, ${e[1]} and ${e.length-2} more`:e.join(" and ")} ${e.length===1?"has":"have"} new extension settings`}async function Zt(e){var f;if(!e.settingsSyncEnabled||!await te().catch(()=>null))return null;let t=await Ee();if(!t)return null;let n=await Qt(),i=await Pa(t);await qf(n,i);let o=Pe(),r=new Set(e.settingsSyncOff),a=new Set(o.choices.map(y=>y.id)),c=n.pulled&&o.budgetDay!==Ba(Date.now()),l={},u=new Set;if(c)for(let y of t.items){let S=i.get(y.id);if(r.has(y.id)||a.has(y.id)||!S)continue;let w=Vn(y,S);if(w>y.limit){n.heldSent[y.id]!==w&&(l[y.id]={held:w},u.add(y.id));continue}let v=(f=n.base[y.id])!=null?f:Vf(n,y.id)?{}:void 0;if(v===void 0)continue;let g=ny(y,S,v);g&&(l[y.id]=g,u.add(y.id))}return{part:JSON.stringify(b(m({since:n.since},u.size>0?{changes:l}:{}),{installed:[...i.keys()]})),registry:t,local:i,sent:u}}function Vf(e,t){let n=e.account[t];return!n||n.off===!0||n.data===null}async function qf(e,t){var i;let n=await be(vn).catch(()=>{});if(n){if(!n.share){for(let o of n.ids){e.base[o]=(i=t.get(o))!=null?i:{};let r=e.account[o];r!=null&&r.data&&(e.seen[o]=J(r.data))}await Xn(e)}await yn(vn).catch(()=>{})}}var Gf={arrived:[],choose:!1};async function Jn(e,t,n){let i=e?Jf(t):null;if(!e||!i)return Gf;let{registry:o,local:r}=e,a=Date.now(),c=await Qt(),l=q(),u=new Set(l.settingsSyncOff),d=Pe(),f=[];for(let[g,k]of Object.entries(i.items))c.account[g]=k;c.since=i.version,c.pulled=!0;let y=new Set([...Object.entries(i.items).flatMap(([g,k])=>k.off?[g]:[]),...Object.entries(i.results).flatMap(([g,k])=>k==="off"?[g]:[])]);for(let g of y)c.deleted[g]!==void 0&&!u.has(g)||(u.add(g),Ma(c,g));for(let[g,k]of Object.entries(c.deleted))k<=i.version&&delete c.deleted[g];let S=new Map(o.items.map(g=>[g.id,g])),w=[];for(let g of o.items){let k=r.get(g.id);if(u.has(g.id)||!k)continue;let E=e.sent.has(g.id)?i.results[g.id]:void 0;if(E==="held"){c.heldSent[g.id]=Vn(g,k);continue}if(Vn(g,k)>g.limit||(delete c.heldSent[g.id],E!==void 0&&E!=="saved"))continue;let T=c.account[g.id];if(!(T!=null&&T.data)||T.off)continue;let P=Qi(T),C=J(T.data),_=c.base[g.id],I=async M=>{if(!jn(g,k,P)){if(!await Aa(o,g,T))return;(M||!T.mine)&&f.push(g.id)}c.base[g.id]=P,c.seen[g.id]=C};E==="saved"?await I(!0):_===void 0?c.firstSyncDone||jn(g,k,P)?await I(!1):w.push(g.id):c.seen[g.id]!==C&&jn(g,k,_)&&await I(!1)}w.length===0&&(c.firstSyncDone=!0);let v=Ot(o.items);return await Xn(c),u.size!==l.settingsSyncOff.length&&tt(b(m({},l),{settingsSyncOff:[...u]})),ht(b(m({},Na(o,c,r,v,i.bytes)),{choices:w.flatMap(g=>{var T;let k=v.get(g),E=S.get(g);return!k||!E?[]:[{id:g,name:k.name,kind:k.kind,localAt:Xf(E,(T=r.get(g))!=null?T:{},n,a),accountAt:Zf(c.account[g])}]}),arrived:Ca(d.arrived,f,v),budgetDay:i.budget==="used_up"?Ba(a):null})),{arrived:f.map(g=>{var k,E;return(E=(k=v.get(g))==null?void 0:k.name)!=null?E:g}),choose:w.length>0}}function Ca(e,t,n){var r;if(t.length===0)return e;let i=[...new Set([...(r=e==null?void 0:e.ids)!=null?r:[],...t])],o=new Map(e?e.ids.map((a,c)=>[a,e.names[c]]):[]);return{ids:i,names:i.map(a=>{var c,l,u;return(u=(l=(c=n.get(a))==null?void 0:c.name)!=null?l:o.get(a))!=null?u:a}),hidden:!1}}function Jf(e){if(!pe(e)||e.status!=="ok"||!Number.isSafeInteger(e.version)||typeof e.bytes!="number")return null;let t={};for(let i of Array.isArray(e.items)?e.items:[]){if(!pe(i)||typeof i.id!="string"||typeof i.size!="number")continue;let o=pe(i.data)?i.data:null;t[i.id]=m(m(m({data:o,size:i.size},typeof i.held=="number"?{held:i.held}:{}),i.off===!0?{off:!0}:{}),i.mine===!0?{mine:!0}:{})}let n={};if(pe(e.results))for(let[i,o]of Object.entries(e.results))typeof o=="string"&&(n[i]=o);return{version:e.version,bytes:e.bytes,budget:e.budget==="used_up"?"used_up":"open",results:n,items:t}}async function Ia(e){let t=await Ee();if(!t)return;let n=await Qt(),i=Pe(),o=[];for(let[a,c]of Object.entries(e)){let l=t.items.find(d=>d.id===a),u=n.account[a];!l||!(u!=null&&u.data)||u.off||(c==="account"&&await Aa(t,l,u)&&o.push(a),n.base[a]=Qi(u),n.seen[a]=J(u.data))}n.firstSyncDone=!0,await Xn(n);let r=new Map(i.choices.map(a=>[a.id,{id:a.id,key:"",name:a.name,kind:a.kind}]));ht(b(m({},i),{choices:[],arrived:Ca(i.arrived,o,r)}))}function Xf(e,t,n,i){var r;if(e.storage.type==="indexedDB"&&e.storage.valueField){let a=Object.values(t).flatMap(c=>pe(c)&&typeof c.ts=="number"?[c.ts]:[]);if(a.length>0)return Math.max(...a)}let o=i;for(let a of n){let c=(r=a.extension_settings)==null?void 0:r[e.id];if(!c||c.storage!==e.storage.type||!jn(e,t,Ta(e,c.values)))break;let l=Date.parse(a.metadata.last_sync_datetime);if(Number.isNaN(l))break;o=l}return o}function Zf(e){var t;return Math.max(0,...Object.values((t=e==null?void 0:e.data)!=null?t:{}).map(n=>n.t))}async function Ra(e,t){if(!e.workerUrl)throw new Error("Syncify backup service is not configured.");let{version:n}=await qr(e.workerUrl,await me(),t),i=await Qt();i.deleted[t]=n,i.account[t]={data:null,size:0,off:!0},Ma(i,t),await Xn(i);let o=q();o.settingsSyncOff.includes(t)||tt(b(m({},o),{settingsSyncOff:[...o.settingsSyncOff,t]}));let r=Pe();ht(b(m({},r),{items:r.items.map(a=>a.id===t?b(m({},a),{hold:null}):a)}))}async function Ea(){let e=await Ee();if(!e)return Pe().items;let[t,n]=await Promise.all([Qt(),Pa(e)]),i=Ot(e.items),o=Pe(),r=Na(e,t,n,i,o.bytes);return ht(m(m({},o),r)),r.items}function Qf(e){return[...e].sort((t,n)=>+(n.hold!==null)-+(t.hold!==null)||t.name.localeCompare(n.name))}function Na(e,t,n,i,o){let r=e.items.flatMap(a=>{var S;let c=n.get(a.id);if(!c)return[];let l=Vn(a,c),u=t.account[a.id],d=l>a.limit?{size:l,reason:"too_big"}:(u==null?void 0:u.held)!==void 0&&!u.off?{size:u.held,reason:u.held>a.limit?"too_big":"account_full"}:null,f=(S=i.get(a.id))!=null?S:{id:a.id,key:"",name:a.id,kind:"extension"},y=u&&!u.off?u.size:0;return[b(m({},f),{size:l,limit:a.limit,list:Object.keys(a.lists).length>0,accountSize:y,hold:d})]});return{bytes:o,limit:e.accountLimit,items:Qf(r)}}async function Pa(e){let{settings:t}=await ut(e),n=new Map;for(let i of e.items){let o=t[i.id];o&&n.set(i.id,Ta(i,o.values))}return n}function Ta(e,t){var i;let n={};for(let[o,r]of Object.entries(t))Be(e,o)&&(n[o]=e.lists[o]&&(i=ey(e,o,r))!=null?i:r);return n}function ey(e,t,n){let i=e.lists[t],o=n;if(e.storage.type==="localStorage"){if(typeof n!="string")return null;try{o=JSON.parse(n)}catch(r){return null}}else e.storage.valueField&&pe(n)&&(o=n[e.storage.valueField]);return Yn(i,o)?o:null}function Yn(e,t){return e?e.merge==="object"?pe(t):Array.isArray(t):!1}function ty(e,t,n){let i={};for(let[o,r]of Object.entries(t)){if(!Be(e,o))continue;let a=e.lists[o]&&Yn(e.lists[o],r);e.storage.type==="localStorage"?a?i[o]=JSON.stringify(r):typeof r=="string"&&(i[o]=r):a&&e.storage.valueField?i[o]=b(m({},pe(n[o])?n[o]:{}),{[e.storage.valueField]:r}):i[o]=r}return i}async function Aa(e,t,n){var c,l;let{settings:i}=await ut(b(m({},e),{items:[t]})),o=(l=(c=i[t.id])==null?void 0:c.values)!=null?l:{},r=ty(t,Qi(n),o);if(Object.keys(r).length===0)return!1;let a={[t.id]:{storage:t.storage.type,values:r}};try{return await xn(e,a,[t.id]),!0}catch(u){return!1}}function Qi(e){var n;let t={};for(let[i,o]of Object.entries((n=e.data)!=null?n:{}))pe(o)&&o.v!==null&&o.v!==void 0&&(t[i]=o.v);return t}function Vn(e,t){let n={};for(let[i,o]of Object.entries(t))n[i]={v:o,t:Wf};return Object.keys(n).length===0?0:new TextEncoder().encode(JSON.stringify(n)).byteLength}function jn(e,t,n){return[...new Set([...Object.keys(t),...Object.keys(n)])].every(o=>_a(e,o,t[o],n[o]))}function _a(e,t,n,i){if(n===void 0||i===void 0)return n===i;let o=e.storage.type==="indexedDB"&&!e.lists[t]?e.storage.valueField:void 0,r=a=>o&&pe(a)?a[o]:a;return J(r(n))===J(r(i))}function ny(e,t,n){let i={},o={};for(let a of new Set([...Object.keys(t),...Object.keys(n)])){let c=t[a],l=n[a];if(_a(e,a,c,l))continue;let u=e.lists[a],d=u&&c!==void 0?iy(u,c,l):null;d?o[a]=d:i[a]=c===void 0?null:c}let r=m(m({},Object.keys(i).length>0?{set:i}:{}),Object.keys(o).length>0?{lists:o}:{});return Object.keys(r).length>0?r:null}function iy(e,t,n){if(!Yn(e,t))return null;let i=Yn(e,n)?n:e.merge==="object"?{}:[];if(e.merge==="object"){let d=t,f=i,y=Object.fromEntries(Object.entries(d).filter(([w,v])=>J(v)!==J(f[w]))),S=Object.keys(f).filter(w=>!(w in d));return m(m({},Object.keys(y).length>0?{put:y}:{}),S.length>0?{remove:S}:{})}let o=d=>{let f=pe(d)?d[e.id]:void 0;return typeof f=="string"||typeof f=="number"?f:null},r=t;if(r.some(d=>o(d)===null))return null;let a=new Map(i.flatMap(d=>o(d)===null?[]:[[JSON.stringify(o(d)),d]])),c=r.filter(d=>J(d)!==J(a.get(JSON.stringify(o(d))))),l=new Set(r.map(d=>JSON.stringify(o(d)))),u=[...a.entries()].filter(([d])=>!l.has(d)).flatMap(([,d])=>{var f;return(f=o(d))!=null?f:[]});return m(m({},c.length>0?{put:c}:{}),u.length>0?{remove:u}:{})}async function Qt(){let e=await be(ka).catch(()=>{});return m(m({},structuredClone(Yf)),pe(e)?e:{})}function Xn(e){return fe(ka,e)}function Ma(e,t){delete e.base[t],delete e.seen[t],delete e.heldSent[t]}function Ba(e){return new Date(e).toISOString().slice(0,10)}function pe(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}var eo="syncify:claim-check-day",La="syncify:undone-claim-shown";async function Oa(e){var n,i;let t=q();if(va(),!!t.workerUrl){if(!t.autoBackupEnabled)return oy(e);try{let o=await Zt(t).catch(()=>null),[r,a]=await Promise.all([An(),nt(t,void 0,o)]),c=await Da(o,a);Ua(a,e,c);let l=(i=(n=a.payload)==null?void 0:n.metadata.marketplace_key_count)!=null?i:0;if(a.backups.some(f=>f.payload_hash===r.hash))return;let u=[a.safetyCopy,...a.pinned].some(f=>(f==null?void 0:f.payload_hash)===r.hash);if(a.exists&&!u&&vs(r.keyCount,l)){Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.",!0,8e3);return}if(r.keyCount===0)return;let{unapproved:d}=await Jt(t);Spicetify.showNotification(d?"Syncify: backed up, this device needs approval":"Syncify auto-backup complete")}catch(o){if(o instanceof ye||o instanceof Ze){Spicetify.showNotification("Syncify: sign in to keep backing up",!0,8e3);return}let r=o instanceof Error?o.message:String(o);console.warn("Syncify startup sync failed:",o),Spicetify.showNotification(`Syncify auto-sync skipped: ${r}`,!0,8e3)}}}async function oy(e){let t=new Date().toLocaleDateString("en-CA");if($a(eo)!==t)try{let n=q(),i=await Zt(n).catch(()=>null),o=await aa(n,i);to(eo,t);let r=await Da(i,o);Ua(o,e,r)}catch(n){if(n instanceof ye){to(eo,t);return}console.warn("Syncify claim check failed:",n)}}async function Da(e,t){if(!e)return!1;try{let n=await Jn(e,t.settings,t.backups);return n.arrived.length>0&&Spicetify.showNotification(Gn(n.arrived)),n.choose}catch(n){return console.warn("Syncify extension settings sync failed:",n),!1}}function Ua(e,t,n){var a;let i=ry(e.claim),o=sy(e.claim),r=(a=e.install)==null?void 0:a.waiting[0];i?t.onClaim(i):o?t.onUndone(o)&&to(La,String(o.undone_at)):r?t.onInstall(r):e.nudge&&!ga()?t.onNudge():n&&t.onFirstSync()}function ry(e){return(e==null?void 0:e.status)==="pending"&&!e.mine&&!e.not_me?e:null}function sy(e){return(e==null?void 0:e.status)==="undone"&&$a(La)!==String(e.undone_at)?e:null}function $a(e){var t,n;return(n=(t=Spicetify.LocalStorage)==null?void 0:t.get(e))!=null?n:window.localStorage.getItem(e)}function to(e,t){var n;(n=Spicetify.LocalStorage)!=null&&n.set?Spicetify.LocalStorage.set(e,t):window.localStorage.setItem(e,t)}var io="syncify:pending-restore",ay=600*1e3,cy=2e3,ly=15e3,uy="marketplace:theme-installed",dy="raw.githubusercontent.com",fy=["cdn.jsdelivr.net","cdn.jsdelivr.xyz"],Te=null,no=new Set,za=new Map;function Fa(){return Te}function ja(e){return no.add(e),()=>no.delete(e)}function Wa(){Te&&Ja(b(m({},Te),{manual:[]}))}function tn(e,t="restore"){try{localStorage.setItem(io,JSON.stringify({at:Date.now(),manual:e,kind:t}))}catch(n){}}function Ya(){var e;tn((e=Te==null?void 0:Te.manual)!=null?e:[],Te==null?void 0:Te.kind),window.location.reload()}function Va(){Xa()&&(document.addEventListener("load",e=>Ha(e.target,"load"),!0),document.addEventListener("error",e=>Ha(e.target,"error"),!0))}async function qa(){let e=Xa();if(!e)return;try{localStorage.removeItem(io)}catch(a){}let t=Date.now(),n=await Ka();for(;n.loaded<n.total&&Date.now()-t<ly;)await new Promise(a=>setTimeout(a,cy)),n=await Ka();Ja(b(m({kind:e.kind,at:Date.now()},n),{manual:e.manual}));let i=n.loaded===n.total&&e.manual.length===0,o=e.kind==="share"?"Setup applied":"Backup restored",r=e.kind==="share"?"loaded":"restored";Spicetify.showNotification(i?`Syncify: ${o}; ${n.total} ${n.total===1?"item":"items"}`:`Syncify: ${r} ${n.loaded} of ${n.total}. Open Syncify for details.`,!1,8e3)}function Ga(e){let t=e.map(n=>n.type==="extension"?`spicetify config extensions ${Zn(n.name)}`:n.type==="custom_app"?`spicetify config custom_apps ${Zn(n.name)}`:`spicetify config current_theme ${Zn(n.name)}${n.scheme?` color_scheme ${Zn(n.scheme)}`:""}`);return t.length>0?[...t,"spicetify apply"]:[]}function Zn(e){return/^[\w.@+/-]+$/.test(e)?e:`"${e}"`}function Ja(e){Te=e;for(let t of no)t(e)}function Xa(){var e;try{let t=JSON.parse((e=localStorage.getItem(io))!=null?e:"null");return!t||Date.now()-t.at>ay?null:{manual:Array.isArray(t.manual)?t.manual:[],kind:t.kind==="share"?"share":"restore"}}catch(t){return null}}function Ha(e,t){e instanceof HTMLScriptElement&&e.src&&za.set(en(e.src),t)}async function Ka(){var i;let e=await we(),t=(i=e[uy])!=null?i:"",n=ie(e).filter(o=>o.type==="extension"&&o.sources.length>0||o.type==="theme"&&t.includes(o.key)||o.type==="snippet");return{loaded:n.filter(yy).length,total:n.length}}function yy(e){var t,n;if(e.type==="snippet"){let i=document.querySelector("style.marketplaceSnippets");return((t=i==null?void 0:i.textContent)==null?void 0:t.includes(`/* ${e.name} - `))===!0}if(e.type==="theme"){let i=document.querySelector("style.marketplaceCSS.marketplaceUserCSS");return!!((n=i==null?void 0:i.textContent)!=null&&n.trim())}return my(e.sources[0]).some(py)}function my(e){let t;try{t=new URL(e)}catch(a){return[]}if(t.host!==dy)return[en(t.href)];let[n,i,o,...r]=t.pathname.split("/").filter(Boolean);return!n||!i||!o||r.length===0?[]:fy.map(a=>en(`https://${a}/gh/${n}/${i}@${o}/${r.join("/")}`))}function py(e){let t=za.get(e);return t?t==="load":[...document.querySelectorAll("script[src]")].some(i=>en(i.src)===e)&&performance.getEntriesByType("resource").some(i=>en(i.name)===e)}function en(e){try{let t=new URL(e);return`${t.origin}${t.pathname}`}catch(t){return e}}var oo=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sync-icon lucide-cloud-sync"><path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M17 22v-4h-4"/><path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"/><path d="M7 10v4h4"/><path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5"/></svg>
`;var Za=".main-actionButtons",hy=".Root__globalNav, .Root__top-bar",Sy=[".main-actionButtons .main-topBar-buddyFeed",".main-actionButtons .main-globalNav-buddyFeed",".main-actionButtons .main-actionButtons-button",".main-actionButtons > button"].join(", ");function Qa(e){let t=new Spicetify.Topbar.Button(U().extensionName,oo,e,!1,!0);return ec(t),by(t),t}function ec(e){var t;e.element.style.setProperty("-webkit-app-region","no-drag"),(t=e.button)==null||t.style.setProperty("-webkit-app-region","no-drag")}function by(e){if(typeof MutationObserver=="undefined")return;let t=!1,n=null,i=()=>{t=!1,r();let a=e.element,c=document.querySelector(Za);!a||!c||c.contains(a)||(c.prepend(a),wy(e),ec(e),oe("Topbar button re-attached"))},o=new MutationObserver(()=>{t||(t=!0,setTimeout(i,250))}),r=()=>{var l;if(n!=null&&n.isConnected)return;let a=document.querySelector(Za),c=(l=a==null?void 0:a.closest(hy))!=null?l:a==null?void 0:a.parentElement;if(o.disconnect(),n=c!=null?c:null,!c){o.observe(document.body,{childList:!0,subtree:!0});return}o.observe(c,{childList:!0,subtree:!0});for(let u=c.parentElement;u;u=u.parentElement)o.observe(u,{childList:!0})};i()}function wy(e){let t=e.button;if(!t||t.className&&t.className!=="undefined")return;let n=Array.from(document.querySelectorAll(Sy)).find(i=>!e.element.contains(i));n!=null&&n.className&&(t.className=n.className)}function tc(e){if(!Un())return null;try{return new Spicetify.Menu.Item(U().extensionName,!1,e,ky())}catch(t){return de("Failed to create profile menu item",t),null}}function ky(){return oo.replace(/\swidth="\d+"/,' width="16"').replace(/\sheight="\d+"/,' height="16"')}var vy="syncify:beta",nc=/^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;function ic(){var e;return(e=window.SyncifyLoader)!=null?e:null}function xy(){try{return window.localStorage.getItem(vy)==="true"}catch(e){return!1}}async function oc(e){let t=xy()?["latest-beta.json","latest.json"]:["latest.json"];return(await Promise.all(t.map(i=>Cy(`${e}/${i}`)))).reduce((i,o)=>o&&(!i||so(o,i)>0)?o:i,null)}function ro(e){return typeof e=="string"&&nc.test(e)}function so(e,t){let[n,i]=[e,t].map(o=>{var u;let[,r,a,c,l]=(u=nc.exec(o))!=null?u:[];return[r,a,c,l!=null?l:1/0].map(Number)});for(let o=0;o<n.length;o+=1)if(n[o]!==i[o])return n[o]<i[o]?-1:1;return 0}async function Cy(e,t=3e3){let n=typeof AbortController=="function"?new AbortController:null,i=setTimeout(()=>n==null?void 0:n.abort(),t);try{let o=await fetch(e,{signal:n==null?void 0:n.signal});if(!o.ok)return null;let r=await o.json();return ro(r==null?void 0:r.version)?r.version:null}catch(o){return null}finally{clearTimeout(i)}}function St(...e){return e.filter(Boolean).join(" ")}function ao(e,t){return t===void 0?e:b(m({},e),{key:t})}function s(e,t,n){let r=t,{children:i}=r,o=Se(r,["children"]);return i===void 0?Et(e,ao(o,n)):Et(e,ao(o,n),i)}function p(e,t,n){let a=t,{children:i}=a,o=Se(a,["children"]),r=Array.isArray(i)?i:[i];return Et(e,ao(o,n),...r)}var Iy={primary:"regular",secondary:"regular",danger:"regular",text:"small",subtle:"small"};function x(e){let l=e,{variant:t="primary",size:n=Iy[t],type:i="button",icon:o,children:r,className:a}=l,c=Se(l,["variant","size","type","icon","children","className"]);return p("button",b(m({className:St("syncify-btn",a),"data-variant":t,"data-size":n,type:i},c),{children:[o,s("span",{className:"syncify-cap",children:r})]}))}function co(e){return s("input",{className:"syncify-checkbox",type:"checkbox","aria-label":e.label,checked:e.checked,onChange:t=>e.onChange(t.currentTarget.checked),disabled:e.disabled})}function lo(e){return p("label",{className:"syncify-checkbox-row","data-disabled":e.disabled?"true":void 0,children:[s("input",{className:"syncify-checkbox",type:"checkbox",checked:e.checked,onChange:t=>e.onChange(t.currentTarget.checked),disabled:e.disabled}),s("span",{className:"syncify-checkbox-label",children:e.label})]})}var Ry=0;function F(e){let[t]=h(()=>`syncify-${e}-${++Ry}`);return t}function Qn(e){return p("div",{className:"syncify-dialog-content",children:[s("h2",{className:"syncify-dialog-title",id:e.titleId,children:e.title}),e.children?s("div",{className:"syncify-dialog-text",children:e.children}):null,s("div",{className:"syncify-dialog-actions",children:e.actions})]})}function nn(e){let t=z(null),n=F("dialog"),{open:i}=e,o=z(e.onClose);return Nt(()=>{o.current=e.onClose}),A(()=>{let r=t.current;if(!r||!i)return;let a=document.activeElement;r.open||r.showModal();let c=l=>{l.preventDefault(),o.current()};return r.addEventListener("cancel",c),()=>{r.removeEventListener("cancel",c),r.open&&r.close(),a instanceof HTMLElement&&a.isConnected&&a.focus()}},[i]),i?s("dialog",{className:"syncify-dialog","data-width":e.wide?"wide":void 0,ref:t,"aria-labelledby":n,children:s(Qn,{title:e.title,actions:e.actions,titleId:n,children:e.children})}):null}function Le(e){var o,r;let t=F("field"),n=`${t}-error`,i=!!e.error;return p("div",{className:"syncify-field-group",children:[s("label",{className:"syncify-field-label",htmlFor:t,children:e.label}),p("div",{className:"syncify-field-row",children:[p("span",{className:"syncify-input-box","data-invalid":i?"true":void 0,"data-disabled":e.disabled?"true":void 0,children:[e.prefix?s("span",{className:"syncify-input-prefix","aria-hidden":"true",children:e.prefix}):null,s("input",{className:"syncify-input-control",id:t,type:(o=e.type)!=null?o:"text",value:e.value,onChange:a=>e.onChange(a.currentTarget.value),onBlur:e.onBlur,placeholder:e.placeholder,inputMode:e.inputMode,autoComplete:(r=e.autoComplete)!=null?r:"off",spellCheck:!1,maxLength:e.maxLength,disabled:e.disabled,autoFocus:e.autoFocus,"aria-invalid":i||void 0,"aria-describedby":i?n:void 0,"data-mono":e.mono?"true":void 0})]}),e.action]}),i?s("span",{className:"syncify-field-error",id:n,role:"alert",children:e.error}):null]})}function Fe(e){let o=e,{children:t,className:n}=o,i=Se(o,["children","className"]);return s("svg",b(m({className:St("syncify-icon",n),viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},i),{children:t}))}function rc(e){return s(Fe,b(m({},e),{children:s("path",{d:"m9 6 6 6-6 6"})}))}function sc(e){return p(Fe,b(m({},e),{children:[s("path",{d:"M7 7h10v10"}),s("path",{d:"M7 17 17 7"})]}))}function ac(e){return s(Fe,b(m({},e),{children:s("path",{d:"m6 9 6 6 6-6"})}))}function Oe(e){return s(Fe,b(m({},e),{children:s("path",{d:"M5 12.5l4.5 4.5L19 7.5"})}))}function uo(e){return s(Fe,b(m({},e),{children:s("path",{d:"M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z"})}))}function ei(e){return p(Fe,b(m({},e),{children:[s("path",{d:"M12 17v5"}),s("path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"})]}))}function cc(e){return p(Fe,b(m({},e),{"data-filled":"true",children:[s("rect",{x:"4",y:"10.5",width:"3",height:"3",rx:"0.75"}),s("rect",{x:"10.5",y:"10.5",width:"3",height:"3",rx:"0.75"}),s("rect",{x:"17",y:"10.5",width:"3",height:"3",rx:"0.75"})]}))}function fo(e){return p(Fe,b(m({},e),{children:[s("path",{d:"M12 6v7"}),s("path",{d:"M12 17.5v.5"})]}))}function yo(e){let o=e,{keys:t,recording:n}=o,i=Se(o,["keys","recording"]);return s("button",b(m({className:"syncify-keycap",type:"button","data-recording":n?"true":void 0},i),{children:s("span",{className:"syncify-cap",children:t})}))}function G(e){return s("ul",{className:"syncify-list","aria-label":e.label,"aria-busy":e.busy?"true":void 0,"data-wrap":e.wrap?"true":void 0,children:e.children})}function je(){return s("li",{className:"syncify-list-divider",role:"presentation"})}function W(e){let t=p(B,{children:[e.leading?s("span",{className:"syncify-row-leading",children:e.leading}):null,p("span",{className:"syncify-row-name",children:[s("span",{className:"syncify-row-name-text",children:e.name}),e.nameMark]}),e.meta?s("span",{className:"syncify-row-meta",children:e.meta}):null,e.end?s("span",{className:"syncify-row-end",children:e.end}):null]}),n=e.meta?"2":"1";return s("li",{className:"syncify-list-item",children:e.onOpen?p("button",{className:"syncify-row",id:e.id,"data-lines":n,type:"button","aria-label":e.openLabel,onClick:e.onOpen,disabled:e.disabled,children:[t,e.external?s(sc,{className:"syncify-row-chevron"}):s(rc,{className:"syncify-row-chevron"})]}):s("div",{className:"syncify-row",id:e.id,"data-lines":n,"data-plain":e.plain?"true":void 0,children:t})})}function ke(e){return s("span",{className:"syncify-mark-square","data-tone":e.tone,"data-size":e.icon?"large":"small",role:e.label?"img":void 0,"aria-label":e.label,"aria-hidden":e.label?void 0:"true",children:e.icon})}function mo(e){return s("span",{className:"syncify-badge",role:"img","aria-label":e.label,children:s("span",{className:"syncify-cap",children:e.count})})}function ve(e){let t=F("menu"),[n,i]=h(!1),o=z(null),r=z(null),a=e.items.some(f=>f.checked!==void 0);A(()=>{var k,E;let f=r.current,y=o.current;if(!n||!f||!y)return;Ny(f),Ay(f,y);let S=lc(f);(E=(k=S.find(T=>T.getAttribute("aria-checked")==="true"))!=null?k:S[0])==null||E.focus();let w=()=>i(!1),v=T=>{let P=T.target;P instanceof Node&&!f.contains(P)&&!y.contains(P)&&w()},g=T=>{T.target instanceof Node&&f.contains(T.target)||w()};return document.addEventListener("pointerdown",v,!0),document.addEventListener("scroll",g,!0),window.addEventListener("resize",w),()=>{document.removeEventListener("pointerdown",v,!0),document.removeEventListener("scroll",g,!0),window.removeEventListener("resize",w),Py(f)}},[n]);function c(){var f;i(!1),(f=o.current)==null||f.focus()}function l(f){let y=lc(f.currentTarget),S=y.findIndex(v=>v===document.activeElement),w=f.key==="ArrowDown"?y[(S+1)%y.length]:f.key==="ArrowUp"?y[(S-1+y.length)%y.length]:f.key==="Home"?y[0]:f.key==="End"?y[y.length-1]:null;w?(f.preventDefault(),w.focus()):f.key==="Escape"?(f.preventDefault(),c()):f.key==="Tab"&&i(!1)}function u(f){(f.key==="ArrowDown"||f.key==="ArrowUp")&&(f.preventDefault(),i(!0))}let d={ref:o,type:"button","aria-haspopup":"menu","aria-expanded":n,"aria-controls":n?t:void 0,disabled:e.disabled,onClick:()=>i(!n),onKeyDown:u};return p(B,{children:[e.trigger==="more"?s("button",b(m({className:"syncify-icon-btn","aria-label":e.label},d),{children:s(cc,{})})):p("button",b(m({className:"syncify-menu-value","aria-label":`${e.label}: ${e.trigger.value}`},d),{children:[s("span",{className:"syncify-cap",children:e.trigger.value}),s(ac,{})]})),n?s("div",{className:"syncify-menu",id:t,ref:r,role:"menu","aria-label":e.label,popover:"manual",onKeyDown:l,children:e.items.map(f=>s(Ey,{item:f,picks:a,onPick:()=>{c(),f.onSelect()}},f.label))}):null]})}function Ey(e){let{item:t,picks:n}=e;return p("button",{className:"syncify-menu-item",type:"button",role:n?"menuitemradio":"menuitem","aria-checked":n?t.checked===!0:void 0,"data-danger":t.danger?"true":void 0,tabIndex:-1,disabled:t.disabled,onClick:e.onPick,children:[s("span",{className:"syncify-cap",children:t.label}),t.checked?s(Oe,{}):null]})}function lc(e){return[...e.querySelectorAll(".syncify-menu-item:not(:disabled)")]}function Ny(e){typeof e.showPopover=="function"&&!e.matches(":popover-open")&&e.showPopover()}function Py(e){typeof e.hidePopover=="function"&&e.matches(":popover-open")&&e.hidePopover()}var Ty=4;function Ay(e,t){let n=Ty,i=t.getBoundingClientRect(),o=e.getBoundingClientRect(),r=i.bottom+n,a=r+o.height>window.innerHeight&&i.top-n-o.height>=0?i.top-n-o.height:r,c=Math.min(Math.max(i.right-o.width,n),window.innerWidth-o.width-n);e.style.top=`${a}px`,e.style.left=`${c}px`}function _y(){return p(B,{children:[s("span",{className:"syncify-dot","aria-hidden":"true"}),s("span",{className:"syncify-visually-hidden",children:", "})]})}function j(e){let t=e.parts.filter(n=>n!=null&&n!==!1&&n!=="");return s("span",{className:St("syncify-meta",e.className),children:t.map((n,i)=>p(B,{children:[i>0?s(_y,{}):null,s("span",{className:"syncify-meta-part",children:n})]},i))})}function po(e){let t=Math.min(Math.max(e.used,0),e.max),n=`Used ${e.used} of ${e.max}`;return p("span",{className:"syncify-meter",role:"meter","aria-label":e.label,"aria-valuemin":0,"aria-valuemax":e.max,"aria-valuenow":t,"aria-valuetext":n,"data-full":e.used>=e.max?"true":void 0,children:[s("span",{className:"syncify-cap",children:n}),s("span",{className:"syncify-meter-bars","aria-hidden":"true",children:Array.from({length:e.max},(i,o)=>s("span",{className:"syncify-meter-bar","data-used":o<t?"true":void 0},o))})]})}function go(e){let t=`${xe(e.used)} of ${xe(e.max)}`,n=e.max>0?Math.min(Math.max(e.used/e.max,0),1):0;return p("span",{className:"syncify-usage",role:"meter","aria-label":"Space used","aria-valuemin":0,"aria-valuemax":e.max,"aria-valuenow":Math.min(e.used,e.max),"aria-valuetext":t,"data-warning":e.warning?"true":void 0,children:[s("span",{className:"syncify-cap",children:"Space used"}),s("span",{className:"syncify-usage-bar","aria-hidden":"true",children:s("span",{className:"syncify-usage-fill",style:{width:`${n*100}%`}})}),s("span",{className:"syncify-cap",children:t})]})}function xe(e){return`${Math.ceil(Math.max(e,0)/1024)} KB`}function O(e){let t=e.tone==="error"?"alert":e.live?"status":void 0;return p("div",{className:"syncify-notice","data-tone":e.tone,role:t,children:[p("span",{className:"syncify-notice-body",children:[e.bare?null:s("span",{className:"syncify-notice-mark",children:s(ke,{tone:e.tone})}),s("span",{className:"syncify-notice-text",children:e.children})]}),e.actions?s("span",{className:"syncify-notice-actions",children:e.actions}):null]})}function ae(e){return s("span",{className:"syncify-pip-square","data-kind":e.kind,"aria-hidden":"true"})}function ti(e){return p("label",{className:"syncify-radio-row","data-disabled":e.disabled?"true":void 0,children:[s("input",{className:"syncify-radio",type:"radio",name:e.name,checked:e.checked,onChange:()=>e.onChange(),disabled:e.disabled}),s("span",{className:"syncify-radio-label",children:e.label})]})}function re(e){return p("div",{className:"syncify-section-label",children:[s("h3",{className:"syncify-section-label-title",id:e.id,tabIndex:e.focusable?-1:void 0,children:e.title}),e.end]})}function se(e){return p("div",{className:"syncify-setting-row",children:[p("span",{className:"syncify-setting-row-text",children:[s("span",{className:"syncify-setting-row-label",children:e.label}),e.value?s("span",{className:"syncify-setting-row-value",children:e.value}):null]}),e.children]})}function on(e){return s("div",{className:"syncify-setting-group",role:"group","aria-label":e.label,children:e.children})}function Ce(e){return e.shape==="item"?s("li",{className:"syncify-list-item","aria-hidden":"true",children:p("div",{className:"syncify-row","data-lines":"1",children:[s("span",{className:"syncify-row-leading",children:s("span",{className:"syncify-skeleton","data-width":"pip"})}),s("span",{className:"syncify-row-name",children:s("span",{className:"syncify-skeleton","data-width":"name"})}),p("span",{className:"syncify-row-end",children:[s("span",{className:"syncify-skeleton","data-width":"size"}),s("span",{className:"syncify-skeleton","data-width":"switch"}),s("span",{className:"syncify-skeleton","data-width":"menu"})]})]})}):s("li",{className:"syncify-list-item","aria-hidden":"true",children:p("div",{className:"syncify-row","data-lines":"2",children:[s("span",{className:"syncify-row-name",children:s("span",{className:"syncify-skeleton","data-width":"name"})}),s("span",{className:"syncify-row-meta",children:s("span",{className:"syncify-skeleton","data-width":"meta"})})]})})}function ni(e){return s("input",{className:"syncify-switch-control",type:"checkbox",role:"switch","aria-label":e.label,checked:e.checked,onChange:t=>e.onChange(t.currentTarget.checked),disabled:e.disabled})}function rn(e){let i=e,{label:t}=i,n=Se(i,["label"]);return p("label",{className:"syncify-setting-row","data-disabled":e.disabled?"true":void 0,children:[s("span",{className:"syncify-setting-row-label",children:t}),s(ni,m({},n))]})}var uc=(e,t)=>`${e}-tab-${t}`,dc=(e,t)=>`${e}-panel-${t}`;function ho(e){let t=z(null);A(()=>{var i,o,r;(r=(o=(i=t.current)==null?void 0:i.querySelector('[aria-selected="true"]'))==null?void 0:o.scrollIntoView)==null||r.call(o,{block:"nearest",inline:"nearest"})},[e.selected]);function n(i){var c,l;let o=e.tabs.length,r=e.tabs.findIndex(u=>u.id===e.selected),a=i.key==="ArrowRight"?(r+1)%o:i.key==="ArrowLeft"?(r-1+o)%o:i.key==="Home"?0:i.key==="End"?o-1:null;a!==null&&(i.preventDefault(),e.onSelect(e.tabs[a].id),(l=(c=t.current)==null?void 0:c.querySelectorAll('[role="tab"]')[a])==null||l.focus())}return s("div",{className:"syncify-tabs",role:"tablist","aria-label":e.label,ref:t,onKeyDown:n,children:e.tabs.map(i=>{let o=i.id===e.selected;return p("button",{className:"syncify-tab",id:uc(e.idBase,i.id),type:"button",role:"tab","aria-selected":o,"aria-controls":dc(e.idBase,i.id),tabIndex:o?0:-1,onClick:()=>e.onSelect(i.id),children:[s("span",{className:"syncify-cap",children:i.label}),i.status]},i.id)})})}function X(e){return p("div",{className:"syncify-tab-panel",id:dc(e.idBase,e.id),role:"tabpanel","aria-labelledby":uc(e.idBase,e.id),children:[s("div",{className:"syncify-tab-scroll",tabIndex:0,children:e.children}),e.actions?s("div",{className:"syncify-tab-actions",children:e.actions}):null]})}function Ae(e){let t=z(e);return Nt(()=>{t.current=e}),t}function Z(e){if(e.startsWith("mailto:")){window.location.href=e;return}window.open(e,"_blank","noopener,noreferrer")}function ii(e){let t=e.lastIndexOf("@");if(t<1)return e;let n=e.slice(0,t);return n.length<=2?e:`${n[0]}${"*".repeat(n.length-2)}${n[n.length-1]}${e.slice(t)}`}function yc(e,t=new Date){let n=new Date(e);return n.toDateString()===t.toDateString()?"today":n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===t.getFullYear()?void 0:"numeric"})}function mc(e){let t=yc(e);return t==="today"?t:`on ${t}`}function fc(e){let t=yc(e);return t==="today"?t:`by ${t}`}function oi(e,t){var n;return e.not_me?{title:"Syncify is checking who is securing this backup",text:null}:{title:`${(n=e.email)!=null?n:"Someone"} is securing this backup`,text:e.held?"Syncify is checking who is securing it.":t?`If that isn't you, press Not me ${fc(e.final_at)}.`:`If that's your email, sign in to Syncify here. If it isn't, press Not me ${fc(e.final_at)}.`}}function pc(e){var t;return`This backup is no longer secured by ${(t=e.email)!=null?t:"another account"}`}function ri(e,t){return e==="checking"?"Syncify: sent for a check":t?`Syncify: ${t} won't secure this backup`:"Syncify: this backup won't be secured"}function si(e){return e.device?`Syncify on ${e.device} wants to back up this Spotify account`:"Another device wants to back up this Spotify account"}function ai(e){return e==="approve"?"Syncify: device approved":"Syncify: device refused"}function gc(e,t,n){var a,c;if(t==="not_owner")return{kind:"other-account"};if(!e)return n?{kind:"other-claim"}:{kind:"unknown"};let{claim:i}=e;if((i==null?void 0:i.status)==="final"){if(!i.mine)return{kind:"other-account"};let l=((a=e.accounts)!=null?a:[]).filter(u=>u.status==="final").length;return{kind:"secured",linkedCount:Math.max(l,1)}}if((i==null?void 0:i.status)==="pending")return i.mine?{kind:"pending",finalAt:i.final_at,held:i.held}:{kind:"other-claim"};let o=((c=e.accounts)!=null?c:[]).filter(l=>l.hash===e.hash),r=o[o.length-1];return(r==null?void 0:r.status)==="unlinked"?{kind:"ended",reason:"undone"}:(r==null?void 0:r.status)==="cancelled"&&r.cancelled_by!=="claimer"?{kind:"ended",reason:r.cancelled_by==="owner"?"owner":"admin"}:{kind:"open"}}function hc(e,t,n){return t?{kind:"warning",label:"Sign in to see your backups"}:e?n.kind==="secured"?{kind:"ok",label:"Signed in, backup secured"}:n.kind==="pending"?null:n.kind==="open"?{kind:"warning",label:"Backup not secured yet"}:n.kind==="ended"?{kind:"warning",label:"Backup not secured"}:{kind:"ok",label:"Signed in"}:null}function Sc(e){return e.held?"Syncify is checking your request to secure this backup":`Your backup will be secured ${mc(e.finalAt)}`}var sn=6,My=600*1e3,By=300,Ly=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function So(e){return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function bc(e){let[t,n]=h(()=>Sn()),[i,o]=h(()=>Sn().email),[r,a]=h(""),[c,l]=h(!1),[u,d]=h(null),[f,y]=h(()=>Date.now()),S=!!(t.codeSentAt&&f-t.codeSentAt<My),w=Math.max(0,Math.ceil((t.retryAt-f)/1e3)),v=t.retryEmail===null||t.retryEmail===i.trim().toLowerCase()?w:0;A(()=>{if(t.retryAt<=Date.now())return;let P=setInterval(()=>{y(Date.now()),t.retryAt<=Date.now()&&clearInterval(P)},1e3);return()=>clearInterval(P)},[t.retryAt]);function g(P){let C=m(m({},Sn()),P);Mr(C),n(C),y(Date.now())}async function k(P){var _;let C=P.trim();if(!Ly.test(C)){d("Enter a valid email address.");return}l(!0),d(null);try{let I=await Dr(C,{nudge:e.nudge});g({email:C,codeSentAt:Date.now(),retryAt:Date.now()+I*1e3,retryEmail:C.toLowerCase()}),a("")}catch(I){let M=I instanceof D?I:null,Y=(_=M==null?void 0:M.retryAfter)!=null?_:null,N=Y&&Y<=By?Date.now()+Y*1e3:0,L=(M==null?void 0:M.code)==="too_many_requests"?null:C.toLowerCase();if((M==null?void 0:M.code)==="resend_wait"){g({email:C,codeSentAt:t.email===C&&t.codeSentAt?t.codeSentAt:Date.now(),retryAt:N,retryEmail:L});return}N&&g({retryAt:N,retryEmail:L}),d(He(I))}finally{l(!1)}}async function E(){l(!0),d(null);try{let P=await Ur(t.email,r);g({codeSentAt:null}),a(""),e.onSignedIn(P)}catch(P){d(He(P));let C=P instanceof D?P.code:null;(C==="too_many_attempts"||C==="code_expired")&&a("")}finally{l(!1)}}async function T(P){l(!0),d(null),await Hr(),g({email:P,codeSentAt:null}),o(P),l(!1)}return{draft:t,email:i,setEmail:o,code:r,setCode:P=>a(P.replace(/\D/g,"").slice(0,sn)),busy:c,error:u,codeSent:S,waitSeconds:w,emailWaitSeconds:v,requestCode:k,verify:E,signOut:T,useAnotherEmail:()=>{g({codeSentAt:null}),a(""),d(null)}}}function wc(e){let{signIn:t}=e,{busy:n}=t;return s("form",{className:"syncify-account-form",noValidate:!0,onSubmit:i=>{i.preventDefault(),!n&&(t.codeSent?t.code.length===sn&&t.verify():t.emailWaitSeconds||t.requestCode(t.email))},children:t.codeSent?p(B,{children:[s(Le,{label:`Code sent to ${ii(t.draft.email)}`,value:t.code,onChange:t.setCode,error:t.error,placeholder:"123456",inputMode:"numeric",autoComplete:"one-time-code",maxLength:sn,mono:!0,autoFocus:!0,action:s(x,{type:"submit",disabled:n||t.code.length!==sn,children:n?"Verifying\u2026":"Verify"})}),p("span",{className:"syncify-account-resend",children:[s(x,{variant:"text",onClick:()=>{t.requestCode(t.draft.email)},disabled:n||t.waitSeconds>0,children:t.waitSeconds>0?`Resend in ${So(t.waitSeconds)}`:"Resend code"}),s(x,{variant:"text",onClick:t.useAnotherEmail,disabled:n,children:"Use another email"})]})]}):s(Le,{label:"Email for sign-in codes",type:"email",value:t.email,onChange:t.setEmail,error:t.error,placeholder:"you@example.com",autoComplete:"email",autoFocus:!0,action:s(x,{type:"submit",disabled:n||t.emailWaitSeconds>0||!t.email.trim(),children:n?"Sending\u2026":t.emailWaitSeconds>0?`Send in ${So(t.emailWaitSeconds)}`:"Send code"})})})}var Oy={owner:"This backup isn't secured. Someone using this Spotify account said it isn't yours.",admin:"This backup isn't secured. Syncify couldn't confirm it's yours.",undone:"This backup is no longer secured by your account."};function kc(e){let{session:t,secure:n,handle:i}=e,o=bc({nudge:e.nudge,onSignedIn:e.onSignedIn}),[r,a]=h(null),[c,l]=h(!1),u=Ae(k=>{t&&$r().then(E=>{!k()||E||(a({kind:"warning",text:He(new D("signed_out"))}),e.onSignedOut())}).catch(()=>{})}),d=t==null?void 0:t.token;A(()=>{let k=!0;return u.current(()=>k),()=>{k=!1}},[u,d]);let f=Ae(k=>{!t||i!==void 0||Ln().then(E=>{var T,P;k()&&e.onHandle((P=(T=E.profile)==null?void 0:T.handle)!=null?P:null)}).catch(()=>{})});A(()=>{let k=!0;return f.current(()=>k),()=>{k=!1}},[f,!!t&&i===void 0]);async function S(){l(!0),a(null);try{Z(await Kr())}catch(k){let E=k instanceof D&&k.code==="signed_out";a({kind:E?"warning":"error",text:He(k)}),E&&e.onSignedOut()}finally{l(!1)}}async function w(){var k;a(null),await o.signOut((k=t==null?void 0:t.email)!=null?k:""),e.onSignedOut()}if(t===void 0)return s(X,{idBase:e.idBase,id:"account",children:null});if(!t)return p(X,{idBase:e.idBase,id:"account",children:[s("p",{className:"syncify-tab-text",children:e.locked?"Sign in with the email that secured this backup":"Sign in to secure your backup so only you can restore it"}),r?s(O,{tone:r.kind,live:!0,children:r.text}):null,s(wc,{signIn:o})]});let v=n.kind==="open"||n.kind==="other-claim"||n.kind==="ended"&&n.reason!=="undone",g=o.busy||c;return p(X,{idBase:e.idBase,id:"account",children:[p(on,{children:[s(se,{label:"Email for sign-in codes",value:ii(t.email)}),i?s(se,{label:"Creator handle",value:`@${i}`}):null,s(se,{label:"Your account page",children:s(x,{variant:"secondary",size:"small",onClick:()=>{S()},disabled:g,children:"Open"})}),v?s(se,{label:"Secure your backup so only you can restore it",children:s(x,{onClick:e.onSecure,disabled:g||e.securing||n.kind==="other-claim",children:e.securing?"Securing\u2026":n.kind==="ended"?"Secure again":"Secure"})}):null]}),n.kind==="ended"?s(O,{tone:"warning",children:Oy[n.reason]}):null,e.secureError?s(O,{tone:"error",children:e.secureError}):null,r?s(O,{tone:r.kind,live:!0,children:r.text}):null,p("div",{className:"syncify-account-footer",children:[p("span",{className:"syncify-account-status",children:[n.kind==="secured"?s(Oe,{className:"syncify-account-check"}):null,s(j,{parts:Dy(n)})]}),s(x,{variant:"text",onClick:()=>{w()},disabled:g,children:"Sign out"})]})]})}function Dy(e){switch(e.kind){case"secured":return["This backup is secured",...e.linkedCount>1?[`${e.linkedCount} Spotify accounts linked`]:[]];case"pending":return[Sc(e)];case"other-account":return["This backup is secured by another account"];default:return["Signed in"]}}var vc=new WeakMap;function bt(e){let t=vc.get(e);return t||(t=ie(e.marketplace_data.keys),vc.set(e,t)),t}function it(e){return ot(e,"item")}function ot(e,t){return`${e} ${t}${e===1?"":"s"}`}function wt(e,t=new Date){let n=new Date(e);if(Number.isNaN(n.getTime()))return e;let i=n.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),o=new Date(t);return o.setDate(t.getDate()-1),n.toDateString()===t.toDateString()?`today, ${i}`:n.toDateString()===o.toDateString()?`yesterday, ${i}`:`${n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===t.getFullYear()?void 0:"numeric"})}, ${i}`}function ci(e){return e.length<=1?e.join(""):`${e.slice(0,-1).join(", ")} and ${e[e.length-1]}`}function bo(e,t=new Date){let n=new Date(e);if(Number.isNaN(n.getTime()))return"";let i=new Date(t);return i.setDate(t.getDate()-1),n.toDateString()===t.toDateString()?"today":n.toDateString()===i.toDateString()?"yesterday":n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===t.getFullYear()?void 0:"numeric"})}function Cc(e,t,n){var l,u;let i=wt(e.metadata.last_sync_datetime),o=it(bt(e).length),r=`from ${e.metadata.device_info}`,a=(u=(l=e.backup)==null?void 0:l.name)!=null?u:null,c=e.payload_hash===n;return t==="safety-copy"?{backup:e,kind:t,name:"Safety copy",meta:[a,i,o,"updated weekly"].filter(xc),current:c,title:`the safety copy from ${i}`}:t==="pinned"?{backup:e,kind:t,name:"Pinned",meta:[a,i,o,r].filter(xc),current:c,title:a!=null?a:`the backup pinned ${i}`}:t==="unapproved"?{backup:e,kind:t,name:"Not approved",meta:[i,o,r],current:c,title:i}:{backup:e,kind:t,name:a!=null?a:i.charAt(0).toUpperCase()+i.slice(1),meta:a?[i,o,r]:[o,r],current:c,title:a!=null?a:i}}function xc(e){return e!==null}var Ic={extension:"extension",theme:"theme",snippet:"snippet"},Uy={extension:"extension",custom_app:"app",theme:"theme"},$y={extension:"extension",custom_app:"custom app",theme:"theme"};function li(e){let{changes:t}=e,[n,i]=h(!1);return p(G,{label:e.label,children:[t.changes.map(o=>s(Hy,{change:o,includeLabel:e.includeLabel(o.name),onInclude:r=>e.onInclude(o.key,r),disabled:e.disabled},o.key)),t.manual.map(o=>s(W,{leading:s(ae,{kind:Uy[o.type]}),name:o.name,meta:s(j,{parts:[$y[o.type],o.scheme]}),end:s("span",{className:"syncify-change-label syncify-cap",children:"Add manually"})},`${o.type}:${o.name}`)),t.settings.length>0?s(je,{}):null,t.settings.map(o=>s(W,{leading:s(ae,{kind:o.kind}),name:o.name,end:s("span",{className:"syncify-change-label syncify-cap","data-change":"Updates",children:"Updates"})},`settings:${o.id}`)),t.settings.length>0&&t.unchanged.length>0?s(je,{}):null,t.unchanged.length>0?s(W,{name:p("span",{className:"syncify-change-fold",children:[t.unchanged.length," more stay the same"]}),end:s(x,{variant:"subtle","aria-expanded":n,onClick:()=>i(!n),children:n?"Hide":"Show"})}):null,n?t.unchanged.map(o=>s(Ky,{item:o},o.key)):null]})}function Hy(e){let{change:t}=e;return s(W,{leading:s(ae,{kind:Ic[t.type]}),name:t.name,meta:t.note?s(j,{parts:[t.note]}):void 0,end:p(B,{children:[s("span",{className:"syncify-change-label syncify-cap","data-change":t.fixed?void 0:t.change,children:t.fixed?"Stays off":t.change}),t.optional&&!t.fixed?s(co,{checked:t.included,onChange:e.onInclude,label:e.includeLabel,disabled:e.disabled}):null]})})}function Ky(e){return s(W,{leading:s(ae,{kind:Ic[e.item.type]}),name:e.item.name,meta:e.item.note?s(j,{parts:[e.item.note]}):void 0})}var Rc={Adds:0,Updates:1,Removes:2},zy=["blocked","host","repo","catalog","unchecked"];function ui(e,t,n){var u,d,f;let{optional:i,allowed:o}=n,r=(u=n.fixed)!=null?u:new Set,a=[],c=[];for(let y of e.items){let S=t.get(y.key),w=i.has(y.key)||r.has(y.key),v={key:y.key,name:y.name,type:y.type,note:S?wo(S):r.has(y.key)?"Not in Marketplace's list":n.unapproved&&w?"Not approved":null},g=y.change==="added"?"Adds":y.change==="removed"?"Removes":y.isNew?"Updates":null;if(g){let k=r.has(y.key);a.push(b(m({},v),{change:g,optional:w,fixed:k,included:!w||!k&&o.has(y.key)}))}else c.push(v)}a.sort((y,S)=>Rc[y.change]-Rc[S.change]);let l=(d=n.settings)!=null?d:[];return{changes:a,settings:l,unchanged:c,manual:e.manual,warnings:[...Fy(a,t,(f=n.verb)!=null?f:"Restore"),...jy(a)],count:a.filter(y=>y.included).length+l.length}}function di(e,t){return t===0?e:t===1?`${e} 1 change`:`${e} ${t} changes`}function wo(e){switch(e.kind){case"host":return`Code from ${e.host}`;case"repo":return`Code from ${e.repo}`;case"blocked":return"Blocked by Marketplace";case"catalog":return"Not in Marketplace";case"unchecked":return"Not checked";case"custom":return"Custom"}}function Fy(e,t,n){var o;let i=new Map;for(let r of e){if(r.change==="Removes"||r.fixed)continue;let a=t.get(r.key);!a||!dt(a)&&a.kind!=="unchecked"||i.set(a.kind,[...(o=i.get(a.kind))!=null?o:[],r.name])}return zy.flatMap(r=>{let a=i.get(r);return a?[Wy(r,a,n)]:[]})}function jy(e){let t=e.filter(n=>n.fixed).map(n=>n.name);return t.length===0?[]:[t.length===1?`${ci(t)} isn't in Marketplace's list anymore, so it stays off.`:`${ci(t)} aren't in Marketplace's list anymore, so they stay off.`]}function Wy(e,t,n){let i=t.length===1,o=ci(t),r=i?`${n} it only if you trust it.`:`${n} them only if you trust them.`;switch(e){case"blocked":return`${o} ${i?"is":"are"} on Marketplace's block list. ${r}`;case"host":return`${o} ${i?"loads from a site":"load from sites"} outside GitHub. ${r}`;case"repo":return i?`${o} loads its code from a different repo than the one it names. ${r}`:`${o} load their code from different repos than the ones they name. ${r}`;case"catalog":return`${o} ${i?"isn't":"aren't"} in Marketplace's catalog. ${r}`;default:return`GitHub couldn't be reached to check ${o}. ${r}`}}function Ec(e){return e.map(t=>b(m({},t),{name:`${t.name} settings`})).sort((t,n)=>t.name.localeCompare(n.name))}function Nc(e,t,n){var P;let[i,o]=h(()=>new Set),[r,a]=h(null),c=Q(()=>Rn(bt(e),e.spicetify_config,t,n),[e,t,n]),l=Q(()=>ft(c.items),[c]);A(()=>{let C=!0;return yt(c.items,l).then(_=>{C&&a({for:e,checks:_})}),()=>{C=!1}},[e,c,l]);let[u,d]=h(null);A(()=>{let C=!0;return is(e.extension_settings).catch(()=>[]).then(_=>{C&&d({for:e,items:_})}),()=>{C=!1}},[e]);let f=(r==null?void 0:r.for)===e?r.checks:null,y=Q(()=>new Map([...f!=null?f:[],...l]),[f,l]),S=((P=e.backup)==null?void 0:P.kind)==="quarantined",w=Q(()=>new Set(c.items.filter(C=>{var _;return C.change!=="removed"&&C.isNew&&(S||dt(y.get(C.key))||((_=y.get(C.key))==null?void 0:_.kind)==="unchecked")}).map(C=>C.key)),[c,y,S]),v=Q(()=>[...w].filter(C=>!i.has(C)),[w,i]),g=(u==null?void 0:u.for)===e?u.items:null,k=Q(()=>Ec(g!=null?g:[]).filter(C=>!v.includes(C.key)),[g,v]),E=Q(()=>ui(c,y,{optional:w,allowed:i,unapproved:S,settings:k.map(({id:C,name:_,kind:I})=>({id:C,name:_,kind:I}))}),[c,y,w,i,S,k]);function T(C,_){let I=new Set(i);_?I.add(C):I.delete(C),o(I)}return{preview:c,changes:E,unapproved:S,checking:f===null||g===null,skipped:v,settingsIds:E.settings.map(C=>C.id),allow:T}}function Pc(e){let{row:t,local:n}=e,i=F("restore-heading"),o=Nc(t.backup,n.items,n.spicetifyConfig),{changes:r}=o,a=!n.marketplaceAvailable,c=e.canShareSettings&&o.settingsIds.length>0;A(()=>{var u;(u=document.getElementById(i))==null||u.focus()},[i]);let l=p(B,{children:[s(x,{variant:"secondary",onClick:e.onCancel,disabled:e.restoring,children:"Cancel"}),s(x,{onClick:()=>e.onRestore({row:t,skipped:o.skipped,manual:o.preview.manual,settings:{ids:o.settingsIds,share:c&&e.shareSettings}}),disabled:e.busy||o.checking||a,children:e.restoring?"Restoring\u2026":o.checking?"Checking\u2026":di("Restore",r.count)})]});return p(X,{idBase:e.idBase,id:"backups",actions:l,children:[s(re,{title:`Restore ${t.title}`,id:i,focusable:!0}),a?s(O,{tone:"warning",children:"Install Spicetify Marketplace to restore a backup."}):null,o.unapproved?s(O,{tone:"warning",children:"An install this Spotify account hasn't approved made this backup. Its items stay off unless you turn them on."}):null,s(li,{changes:r,label:"What this restore changes",includeLabel:u=>`Restore ${u}`,onInclude:o.allow,disabled:e.busy}),r.warnings.map(u=>s(O,{tone:"warning",children:u},u)),e.localIsUnsaved?s(O,{tone:"warning",children:"Your current setup isn't backed up."}):null,c?s(lo,{label:"Use these extension settings on my other devices too",checked:e.shareSettings,onChange:e.onShareSettingsChange,disabled:e.busy}):null]})}function Tc(e){var P,C,_,I,M,Y;let{remote:t,local:n}=e,i=F("backup"),[o,r]=h(null),[a,c]=h(null),l=z(null);if(A(()=>{var N;a||!l.current||((N=document.getElementById(l.current))==null||N.focus(),l.current=null)},[a]),a&&n)return s(Pc,{idBase:e.idBase,row:a,local:n,localIsUnsaved:n.installedItemCount>0&&!Yy(n.hash,t),canShareSettings:e.canShareSettings,shareSettings:e.shareSettings,onShareSettingsChange:e.onShareSettingsChange,busy:e.busy,restoring:e.restoring,onCancel:()=>c(null),onRestore:N=>{var L;return e.onRestore(b(m({},N),{linkedHash:(L=o==null?void 0:o.hash)!=null?L:null}))}},a.backup.payload_hash);async function u(N){if(!N){r(null);return}r({hash:N,remote:null});try{let L=await nt(e.config,N);r({hash:N,remote:L})}catch(L){r(null),e.onError(L)}}let d=o?o.remote:t,f=(P=n==null?void 0:n.hash)!=null?P:null,y=N=>{var L,$;return($=(L=N.backup.backup)==null?void 0:L.id)!=null?$:`${N.kind}-${N.backup.payload_hash}-${N.backup.metadata.last_sync_datetime}`},S=N=>`${i}-${y(N)}`,w=(N,L)=>N.map($=>Cc($,L,f)),v=w((C=d==null?void 0:d.backups)!=null?C:[],"backup"),g=w((_=d==null?void 0:d.pinned)!=null?_:[],"pinned"),k=w(d!=null&&d.safetyCopy?[d.safetyCopy]:[],"safety-copy"),E=o?[]:w((I=t==null?void 0:t.unapproved)!=null?I:[],"unapproved");function T(N){var L;return s(W,{id:S(N),name:N.name,nameMark:N.kind==="safety-copy"?p(B,{children:[s(uo,{className:"syncify-safety-mark"}),(L=N.backup.backup)!=null&&L.safety_copy?s(ei,{className:"syncify-safety-mark"}):null]}):N.kind==="pinned"?s(ei,{className:"syncify-safety-mark"}):N.kind==="unapproved"?s(ke,{tone:"warning"}):void 0,meta:s(j,{parts:N.meta}),end:N.current?s("span",{className:"syncify-row-status syncify-cap",children:"Current"}):void 0,onOpen:N.current?void 0:()=>{l.current=S(N),c(N)},openLabel:`Preview restore of ${N.title}`,disabled:e.busy},y(N))}return p(X,{idBase:e.idBase,id:"backups",children:[e.notices,n&&!n.marketplaceAvailable?s(O,{tone:"warning",children:"Install Spicetify Marketplace to restore a backup."}):null,!e.lockedBy&&e.otherAccounts.length>0?s(se,{label:"Show backups from",children:s(ve,{label:"Show backups from",trigger:{value:(Y=(M=e.otherAccounts.find(N=>N.hash===(o==null?void 0:o.hash)))==null?void 0:M.label)!=null?Y:"This Spotify account"},items:[{hash:null,label:"This Spotify account"},...e.otherAccounts].map(N=>{var L;return{label:N.label,checked:((L=o==null?void 0:o.hash)!=null?L:null)===N.hash,onSelect:()=>{u(N.hash)}}}),disabled:e.busy})}):null,e.lockedBy?s("p",{className:"syncify-tab-text",children:e.lockedBy==="not_owner"?"Sign in with the account that secured them":"Sign in to see and restore your backups"}):(!t||!n)&&e.failed?null:!t||!n||o&&!o.remote?p(G,{label:"Loading backups",children:[s(Ce,{}),s(Ce,{})]}):v.length+g.length+k.length+E.length===0?o?s("p",{className:"syncify-tab-text",children:"No backups yet."}):null:p(G,{label:"Backups",children:[v.map(T),g.length>0?s(je,{}):null,g.map(T),k.length>0?s(je,{}):null,k.map(T),E.length>0?s(je,{}):null,E.map(T)]})]})}function Yy(e,t){return t?[...t.backups,...t.safetyCopy?[t.safetyCopy]:[]].some(n=>n.payload_hash===e):!1}function Ac(e){let t=F("first-sync"),[n,i]=h(()=>Object.fromEntries(e.choices.map(d=>[d.id,d.localAt>d.accountAt?"here":"account"]))),[o,r]=h(!1),[a,c]=h(null),l=d=>{var f;return(f=n[d.id])!=null?f:d.localAt>d.accountAt?"here":"account"};async function u(){r(!0),c(null);try{await Ia(Object.fromEntries(e.choices.map(d=>[d.id,l(d)]))),e.onClose()}catch(d){c(d instanceof Error?d.message:String(d))}finally{r(!1)}}return p(nn,{open:e.open,wide:!0,onClose:e.onClose,title:"Which extension settings do you want to keep?",actions:p(B,{children:[s(x,{variant:"secondary",onClick:e.onClose,disabled:o,children:"Ask me later"}),s(x,{onClick:()=>{u()},disabled:o,children:"Keep these"})]}),children:[s("p",{children:"These items have different settings in this Spotify than on your other devices. Choose the settings to keep for each item. All your devices will then use them."}),s(G,{wrap:!0,children:e.choices.map(d=>s(W,{leading:s(ae,{kind:d.kind}),name:d.name,end:p("span",{className:"syncify-first-sync-picks",role:"radiogroup","aria-label":d.name,children:[s(ti,{name:`${t}-${d.id}`,label:`This Spotify, ${bo(d.localAt)}`,checked:l(d)==="here",onChange:()=>i(f=>b(m({},f),{[d.id]:"here"})),disabled:o}),s(ti,{name:`${t}-${d.id}`,label:`Other devices, ${bo(d.accountAt)}`,checked:l(d)==="account",onChange:()=>i(f=>b(m({},f),{[d.id]:"account"})),disabled:o})]})},d.id))}),a?s(O,{tone:"error",children:a}):null]})}function rt(e,t){return e.items.filter(n=>n.hold!==null&&!t.includes(n.id))}function _c(e,t){let{hold:n}=e;if(n.reason==="account_full")return`${e.name} is held because your extension settings are over ${xe(t)}. Your other devices keep the last copy that fit. To sync it again, turn off an item or delete a synced copy in Items.`;let i=`${xe(n.size)} of its ${xe(e.limit)}`;return e.list?`${e.name}'s list is too big to sync, ${i}. Your other devices keep the last list that fit. It syncs again once the list is smaller.`:`${e.name}'s extension settings are too big to sync, ${i}. Your other devices keep the last copy that fit. They sync again once they're smaller.`}function Mc(e){return e.hold?`${xe(e.hold.size)}, too big to sync`:xe(e.size)}function Bc(e,t){let n=rt(e,t).filter(i=>i.hold.reason==="account_full");return{used:e.bytes+n.reduce((i,o)=>i+Math.max(o.hold.size-o.accountSize,0),0),over:n.length>0}}function Lc(e,t){let n=e.items,i=n.filter(r=>t.includes(r.id)).length,o=rt(e,t).length;return{syncing:n.length-i-o,held:o,off:i}}function Vy(){return`${U().webUrl.replace(/\/+$/,"")}/supported`}var qy=4;function Oc(e){let{config:t,status:n}=e,i=F("extension-settings"),o=z(null),r=rt(n,t.settingsSyncOff),a=e.secured&&t.settingsSyncEnabled&&r.length>0,c=z(a);return A(()=>{var l;c.current&&((l=o.current)==null||l.scrollIntoView({block:"start"}))},[]),p("div",{className:"syncify-sync-section","data-place":"settings",ref:o,role:"group","aria-labelledby":i,children:[s(re,{title:"Extension settings",id:i}),e.secured?p(B,{children:[s(rn,{label:"Syncing on this device",checked:t.settingsSyncEnabled,onChange:e.onEnabledChange,disabled:e.disabled}),t.settingsSyncEnabled?p(B,{children:[s(Dc,{status:n,off:t.settingsSyncOff}),s(Uc,{items:r,accountLimit:n.limit})]}):null]}):s(O,{tone:"info",bare:!0,actions:s(x,{size:"small",onClick:e.onSecure,disabled:e.securing,children:e.securing?"Securing\u2026":"Secure"}),children:"Secure your backup to sync extension settings between your devices."}),p(G,{children:[e.secured&&t.settingsSyncEnabled?n.items.length===0?s(W,{name:"None of your items have settings Syncify can sync",plain:!0}):s(W,{name:"Items",meta:s(Gy,{status:n,off:t.settingsSyncOff}),onOpen:e.onOpenItems}):null,s(W,{name:"Supported extensions",external:!0,onOpen:()=>Z(Vy())})]})]})}function Gy(e){let t=Lc(e.status,e.off);return s(j,{parts:[t.syncing>0&&`${t.syncing} syncing`,t.held>0&&p("span",{className:"syncify-sync-warning",children:[t.held," too big to sync"]}),t.off>0&&`${t.off} off`]})}function Dc(e){let{used:t,over:n}=Bc(e.status,e.off);return s(go,{used:t,max:e.status.limit,warning:n})}function Uc(e){return s(B,{children:e.items.map(t=>s(O,{tone:"warning",children:_c(t,e.accountLimit)},t.id))})}function $c(e){let{config:t,status:n}=e,i=F("items"),[o,r]=h(null),[a,c]=h([]),l=z({ids:[],names:new Map});A(()=>{var S;let y=!0;return Ea().catch(()=>n.items).then(w=>{y&&r(w)}),(S=document.getElementById(i))==null||S.focus(),()=>{y=!1}},[]);let u=z(e.onDeleted);A(()=>{u.current=e.onDeleted}),A(()=>()=>{let{ids:y,names:S}=l.current;y.length!==0&&Promise.all(y.map(w=>Ra(q(),w).catch(v=>{var k;let g=v instanceof Error?v.message:String(v);Spicetify.showNotification(`Syncify couldn't delete the synced copy of ${(k=S.get(w))!=null?k:w}. ${g}`,!0,6e3)}))).then(()=>u.current())},[]);function d(y,S){let w=S?[...a,y.id]:a.filter(v=>v!==y.id);l.current.names.set(y.id,y.name),l.current.ids=w,c(w)}let f=rt(b(m({},n),{items:o!=null?o:n.items}),t.settingsSyncOff);return p("div",{className:"syncify-sync-section",children:[s(re,{title:"Items",id:i,focusable:!0,end:s(x,{variant:"subtle",onClick:e.onBack,children:"Back to settings"})}),s(Dc,{status:n,off:t.settingsSyncOff}),s(Uc,{items:f,accountLimit:n.limit}),s(G,{label:"Items",busy:o===null,wrap:!0,children:o===null?Array.from({length:qy},(y,S)=>s(Ce,{shape:"item"},S)):o.map(y=>s(Jy,{item:y,on:!t.settingsSyncOff.includes(y.id),deleted:a.includes(y.id),onChange:S=>e.onItemChange(y.id,S),onDelete:S=>d(y,S)},y.id))})]})}function Jy(e){let{item:t}=e;return s(W,{leading:s(ae,{kind:t.kind}),name:t.name,end:e.deleted?p(B,{children:[s("span",{className:"syncify-sync-size",children:"Synced copy deleted"}),s(x,{variant:"text",onClick:()=>e.onDelete(!1),children:"Undo"})]}):p(B,{children:[s("span",{className:"syncify-sync-size","data-tone":t.hold&&e.on?"warning":void 0,children:e.on?Mc(t):xe(t.size)}),s(ni,{label:`Sync ${t.name}`,checked:e.on,onChange:e.onChange}),s(ve,{trigger:"more",label:`More for ${t.name}`,items:[{label:"Delete synced copy",danger:!0,onSelect:()=>e.onDelete(!0)}]})]})})}function Hc(e,t){let[n,i]=h(!1),[o,r]=h(null),a=Ae(t);return A(()=>{if(!n)return;let c=l=>{var d;if(!((d=document.getElementById(e))!=null&&d.isConnected)){i(!1),r(null);return}l.preventDefault(),l.stopImmediatePropagation();let u=na(l);if(u.kind!=="ignore"){if(u.kind==="cancel"){i(!1),r(null);return}if(u.kind==="error"){r(u.message);return}if(ia(u.shortcut)){r(`${Wt(u.shortcut)} is already used by Spotify or another extension. Try a different combo.`);return}i(!1),a.current(u.shortcut)}};return window.addEventListener("keydown",c,!0),()=>window.removeEventListener("keydown",c,!0)},[n,e,a]),{recording:n,error:o,clearError:()=>r(null),toggle:()=>{r(null),i(!n)}}}var Kc=[{value:"both",label:"Top bar and profile menu"},{value:"topbar",label:"Top bar"},{value:"menu",label:"Profile menu"}];function zc(e){var S,w;let{config:t}=e,[n,i]=h("settings"),[o]=h(()=>Un()),r=F("shortcut"),a=Hc(r,f),c=o?t.entryPoint:"topbar",l=a.recording?"Press keys":t.shortcut?Wt(t.shortcut):"Off";function u(v){tt(v),e.onConfigChange(v)}function d(v,g){let k=q().settingsSyncOff.filter(E=>E!==v);u(b(m({},t),{settingsSyncOff:g?k:[...k,v]}))}if(n==="items")return s(X,{idBase:e.idBase,id:"settings",children:s($c,{config:t,status:e.syncStatus,onItemChange:d,onBack:()=>i("settings"),onDeleted:()=>e.onConfigChange(q())})});function f(v){u(b(m({},t),{shortcut:v})),qi(v),a.clearError()}function y(v){u(b(m({},t),{entryPoint:v})),$n(v)}return p(X,{idBase:e.idBase,id:"settings",children:[p(on,{children:[s(rn,{label:"Automatic backup when Spotify starts",checked:t.autoBackupEnabled&&!e.unsupported,onChange:v=>u(b(m({},t),{autoBackupEnabled:v})),disabled:e.busy||e.unsupported}),s(se,{label:"Open Syncify from",children:s(ve,{label:"Open Syncify from",trigger:{value:(w=(S=Kc.find(v=>v.value===c))==null?void 0:S.label)!=null?w:""},items:Kc.map(v=>({label:v.label,checked:v.value===c,onSelect:()=>y(v.value)})),disabled:!o})}),s(se,{label:"Keyboard shortcut",value:a.recording&&!a.error?"Press a key combination, or Esc to cancel":void 0,children:p("span",{className:"syncify-settings-shortcut",children:[a.recording?null:t.shortcut?s(x,{variant:"subtle",onClick:()=>f(null),children:"Turn off"}):s(x,{variant:"subtle",onClick:()=>f(pt),children:"Use default"}),s(yo,{id:r,keys:l,recording:a.recording,"aria-label":a.recording?`${l} for a new keyboard shortcut`:`${l}, change the keyboard shortcut`,onClick:a.toggle})]})})]}),a.error?s(O,{tone:"warning",live:!0,children:a.error}):null,o?t.entryPoint==="menu"&&!t.shortcut?s(O,{tone:"warning",children:"Keep a shortcut in case a Spotify update breaks the profile menu."}):null:s(O,{tone:"info",children:"The profile menu isn't available in this Spicetify version."}),s(Oc,{config:t,status:e.syncStatus,secured:e.secured,securing:e.securing,onSecure:e.onSecure,onEnabledChange:v=>u(b(m({},t),{settingsSyncEnabled:v,settingsSyncOff:q().settingsSyncOff})),onOpenItems:()=>i("items"),disabled:e.busy})]})}function Fc(){let[e,t]=h(()=>Pe());return A(()=>qn(t),[]),e}function an(e){let t=`${U().webUrl.replace(/\/+$/,"")}/discover`;return e?`${t}?post=${encodeURIComponent(e)}`:t}function kt(e){var t;return(t=e.name)!=null?t:Ne(e.code)}function jc(e){return[`Used by ${e.imports}`,...e.posted?["On Discover"]:[]]}function Wc(e){let t=e.posted?"The code stops working and its Discover post comes down.":"The code stops working.";return e.imports===0?t:`${t} ${e.imports===1?"1 person":`${e.imports} people`} used it.`}var fi=12;function Yc(e){return[...Array(Math.min(e.extensions,fi)).fill("extension"),...Array(Math.min(e.themes,fi)).fill("theme"),...Array(Math.min(e.snippets,fi)).fill("snippet")].slice(0,fi)}var Xy={extension:"extension",theme:"theme",snippet:"snippet"};function Vc(e){var l,u;let{compose:t}=e,n=F("compose-heading"),i=(u=(l=t.compose)==null?void 0:l.code)!=null?u:null,{draft:o,saving:r}=t;A(()=>{var d;(d=document.getElementById(n))==null||d.focus()},[n]);let a=o?[...o.items].sort((d,f)=>Number(o.leftOut.has(f.key))-Number(o.leftOut.has(d.key))||d.name.localeCompare(f.name)):[],c=p(B,{children:[s(x,{variant:"secondary",onClick:t.cancel,disabled:r,children:"Cancel"}),s(x,{onClick:()=>{t.save()},disabled:!o||t.included.length===0||r,children:o?r?i?"Updating\u2026":"Creating\u2026":i?"Update code":"Create code":"Checking\u2026"})]});return p(X,{idBase:e.idBase,id:"share",actions:c,children:[s(re,{title:i?`Update ${kt(i)}`:"Create a code",id:n,focusable:!0}),t.error?s(O,{tone:"error",children:t.error}):null,s(Le,{label:"Setup name (optional)",value:t.name,onChange:t.setName,maxLength:_s,disabled:r}),t.askHandle?s(Le,{label:"Pick a handle for your profile",value:t.handle,onChange:t.setHandle,onBlur:t.checkHandle,error:t.handleError,prefix:"@",maxLength:Ki,disabled:r}):null,o&&t.included.length===0?s(O,{tone:"warning",children:"Nothing here can go in a code. Add something from Marketplace first."}):null,s(re,{title:"What goes in",end:o?s(j,{parts:[it(t.included.length)]}):void 0}),o?s(G,{label:"What goes in",children:a.map(d=>{let f=o.leftOut.get(d.key),y=[f?wo(f):null,d.repo].filter(Boolean);return s(W,{leading:s(ae,{kind:Xy[d.type]}),name:d.name,meta:y.length>0?s(j,{parts:y}):void 0,end:f?s("span",{className:"syncify-change-label syncify-cap",children:"Left out"}):void 0},d.key)})}):p(G,{label:"Checking your items",children:[s(Ce,{}),s(Ce,{})]})]})}var qc=[["add","Add to my setup"],["replace","Replace my setup"]];function Gc(e){var c,l,u,d;let{load:t}=e,n=F("share-heading"),i=(c=t.shared)==null?void 0:c.file;if(A(()=>{var f;(f=document.getElementById(n))==null||f.focus()},[n]),!i||!t.changes)return null;let o=e.marketplaceAvailable===!1,r=i.creator,a=p(B,{children:[s(x,{variant:"secondary",onClick:t.close,disabled:t.applying,children:"Cancel"}),s(x,{onClick:()=>{t.apply()},disabled:t.applying||t.checking||e.busy||o,children:t.applying?"Loading\u2026":t.checking?"Checking\u2026":di("Load",t.changes.count)})]});return p(X,{idBase:e.idBase,id:"share",actions:a,children:[s(re,{title:`Load ${(l=i.name)!=null?l:Ne(i.code)}`,id:n,focusable:!0,end:r?s(x,{variant:"text",onClick:()=>Z(zs(r)),children:`by @${r}`}):void 0}),t.applyError?s(O,{tone:"error",children:t.applyError}):null,o?s(O,{tone:"warning",children:"Install Spicetify Marketplace to load a setup."}):null,s(se,{label:"How to load it",children:s(ve,{label:"How to load it",trigger:{value:(d=(u=qc.find(([f])=>f===t.mode))==null?void 0:u[1])!=null?d:""},items:qc.map(([f,y])=>({label:y,checked:t.mode===f,onSelect:()=>t.setMode(f)})),disabled:t.applying})}),s(li,{changes:t.changes,label:"What loading it changes",includeLabel:f=>`Load ${f}`,onInclude:t.allow,disabled:t.applying}),t.theme?s(O,{tone:"info",children:`Your theme switches to ${t.theme.name}.`}):null,t.changes.warnings.map(f=>s(O,{tone:"warning",children:f},f))]})}function Jc(e){let[t,n]=h(null),[i,o]=h(null),[r,a]=h(""),[c,l]=h(""),[u,d]=h(!1),[f,y]=h(!1),[S,w]=h(null),[v,g]=h(null),k=z(0),[E,T]=h(e.token);E!==e.token&&(T(e.token),n(null),o(null),g(null));let P=t!==null&&t.code===null&&!e.hasHandle,C=P&&u?zi(c):null,_=i?i.items.filter(L=>!i.leftOut.has(L.key)):[];async function I(L){var Ye,at;let $=++k.current;n({code:L}),a((Ye=L==null?void 0:L.name)!=null?Ye:""),l((at=e.suggestedHandle)!=null?at:""),d(!1),o(null),w(null),g(null);try{let ce=await we(),xt=await Os(ie(ce),ce);$===k.current&&o(m({keys:ce},xt))}catch(ce){if($!==k.current)return;n(null),w(ce instanceof Error?ce.message:String(ce))}}function M(){k.current+=1,n(null),o(null)}function Y(){n(null),o(null)}async function N(){if(!t||!i)return;if(P&&zi(c)){d(!0);return}y(!0),w(null);let L=Ds(i.keys,_);try{let $=t.code?await Fs(t.code.code,r.trim(),L):await Ks(r.trim(),L,P?c.trim():void 0);g(b(m({},$),{outcome:t.code?"updated":"created"})),Y(),await e.reload()}catch($){if($ instanceof D&&$.code==="same_setup"&&$.share){g(b(m({},$.share),{leftOut:0,outcome:"existing"})),Y();return}e.fail($,w),$ instanceof D&&$.code==="publish_failed"&&(n(null),e.reload())}finally{y(!1)}}return{compose:t,draft:i,included:_,name:r,setName:a,askHandle:P,handle:c,setHandle:L=>l(L.replace(/^@/,"")),checkHandle:()=>d(!0),handleError:C,saving:f,error:S,saved:v,dismissSaved:()=>g(null),forgetSaved:L=>g($=>($==null?void 0:$.code)===L?null:$),start:I,cancel:M,save:N}}function Xc(e){var C;let[t,n]=h(null),[i,o]=h(null),[r,a]=h(null),[c,l]=h(null),[u,d]=h(0),f=z(!1),[y,S]=h(null),[w,v]=h(!1);function g(_,I){I(jt(_,i)),_ instanceof D&&_.code==="signed_out"&&e.onSignedOut()}async function k(){var _,I;S(null);try{let M=await Ln();n(M.codes),f.current||(f.current=!0,d(M.newHearts)),e.onCodeCount(M.codes.length),o(M.max),a(M.profile),e.onHandle((I=(_=M.profile)==null?void 0:_.handle)!=null?I:null),l(M.suggestedHandle)}catch(M){g(M,S)}}async function E(_){v(!0),S(null);try{return await js(_),await k(),!0}catch(I){return g(I,S),!1}finally{v(!1)}}let T=Ae(_=>{n(null),f.current=!1,_&&k()}),P=(C=e.session)==null?void 0:C.token;return A(()=>T.current(P!==void 0),[T,P]),{codes:t,max:i,atMax:t!==null&&i!==null&&t.length>=i,profile:r,suggestedHandle:c,newHearts:u,error:y,deleting:w,load:k,remove:E,fail:g}}function Zc(e){let[t,n]=h(""),[i,o]=h(null),[r,a]=h(null),[c,l]=h(null),[u,d]=h(null),[f,y]=h("add"),[S,w]=h(()=>new Set),[v,g]=h(null),[k,E]=h(void 0),[T,P]=h(!1),C=Q(()=>u?Us(u.file,u.items,e.localItems,e.localConfig,e.localTheme,f):null,[u,e.localItems,e.localConfig,e.localTheme,f]),_=Q(()=>{if(!C||!u)return null;let V=new Set(u.items.map(H=>H.key));return C.items.filter(H=>H.change!=="removed"&&V.has(H.key)&&(f==="replace"||H.isNew))},[C,u,f]),I=Q(()=>_?ft(_):null,[_]),M=v&&v.for===_?v.checks:null,Y=Q(()=>new Map([...M!=null?M:[],...I!=null?I:[]]),[M,I]),N=Q(()=>C&&k!==void 0?$s(C,k):new Set,[C,k]),L=Q(()=>{var V;return new Set(((V=C==null?void 0:C.items)!=null?V:[]).filter(H=>{var ne;return H.change!=="removed"&&H.isNew&&(dt(Y.get(H.key))||((ne=Y.get(H.key))==null?void 0:ne.kind)==="unchecked")}).map(H=>H.key))},[C,Y]),$=Q(()=>C?ui(C,Y,{optional:L,allowed:S,fixed:N,verb:"Load"}):null,[C,Y,L,S,N]),Ye=C!=null&&C.theme&&!N.has(C.theme.key)&&(!L.has(C.theme.key)||S.has(C.theme.key))?C.theme:null,at=C!==null&&(M===null||k===void 0);A(()=>{if(!_||!I)return;let V=!0;return yt(_,I).then(H=>{V&&g({for:_,checks:H})}),()=>{V=!1}},[_,I]);async function ce(V){let H=V!=null?V:Bs(t);if(a(null),l(null),d(null),!H){a(jt(new D("no_code")));return}o({code:H,pick:V!==void 0});try{let ne=await Ws(H);y("add"),w(new Set),d({file:ne,items:ie(ne.keys),pick:V!==void 0}),Hi().then(E)}catch(ne){a(jt(ne))}finally{o(null)}}function xt(V,H){let ne=new Set(S);H?ne.add(V):ne.delete(V),w(ne)}async function pi(){if(!u||!C)return;P(!0),l(null);let V=[...new Set([...L,...N])].filter(H=>N.has(H)||!S.has(H));try{await la(e.config,u.file,f,V,k!=null?k:null,u.pick),Spicetify.showNotification("Syncify: setup loaded. Reloading\u2026"),tn(C.manual,"share"),setTimeout(()=>window.location.reload(),1e3)}catch(H){P(!1),l(Zy(H))}}return{input:t,setInput:n,fetching:i,error:r,applyError:c,shared:u,close:()=>{d(null),l(null)},mode:f,setMode:y,changes:$,theme:Ye,checking:at,applying:T,open:ce,allow:xt,apply:pi}}function Zy(e){if(e instanceof Gt){let t=e.reason instanceof ye?"Sign in to back up.":e.reason instanceof Error?e.reason.message:String(e.reason);return`${e.message} ${t}`}return e instanceof Error?e.message:String(e)}async function yi(e){var t;try{return await navigator.clipboard.writeText(e),!0}catch(n){let i=(t=Spicetify.Platform)==null?void 0:t.ClipboardAPI;return i!=null&&i.copy?(await i.copy(e),!0):!1}}var Qy=2e3;function Qc(e){let{codes:t,compose:n}=e,[i,o]=h(null),[r,a]=h(null);A(()=>{if(!r)return;let d=setTimeout(()=>a(null),Qy);return()=>clearTimeout(d)},[r]);async function c(d,f){await yi(d)&&a(f)}async function l(){i&&await t.remove(i.code)&&(n.forgetSaved(i.code),o(null))}let u=t.codes;return p("section",{className:"syncify-share-part","aria-label":"Your codes",children:[s(re,{title:p(B,{children:["Your codes",t.newHearts>0?s("span",{className:"syncify-share-hearts",children:ot(t.newHearts,"new heart")}):null]}),end:u&&t.max!==null?s(po,{used:u.length,max:t.max,label:"Share codes"}):void 0}),t.error?s(O,{tone:"error",actions:s(x,{variant:"text",onClick:()=>{t.load()},children:"Try again"}),children:t.error}):null,n.saved?s(em,{saved:n.saved,copied:r,onCopy:(d,f)=>{c(d,f)},discoverOpen:e.discoverOpen,onDismiss:n.dismissSaved}):null,n.error&&!n.compose?s(O,{tone:"error",children:n.error}):null,u===null?t.error?null:s(G,{label:"Loading your codes",children:s(Ce,{})}):u.length>0?s(G,{label:"Your codes",children:u.map(d=>s(W,{name:kt(d),meta:s(j,{parts:[d.name?s("code",{className:"syncify-share-code",children:Ne(d.code)}):null,...jc(d)]}),end:p("span",{className:"syncify-share-code-actions",children:[s(x,{variant:"text",onClick:()=>{c(Ne(d.code),`code:${d.code}`)},children:r===`code:${d.code}`?"Copied":"Copy"}),d.link?s(x,{variant:"text",onClick:()=>{var f;c((f=d.link)!=null?f:"",`link:${d.code}`)},children:r===`link:${d.code}`?"Copied":"Get link"}):null,s(ve,{trigger:"more",label:`More for ${kt(d)}`,disabled:n.compose!==null||t.deleting,items:[{label:"Update",onSelect:()=>{n.start(d)}},...e.discoverOpen&&!d.posted?[{label:"Post to Discover",onSelect:()=>Z(an(d.code))}]:[],{label:"Delete",danger:!0,onSelect:()=>o(d)}]})]})},d.code))}):null,u!==null?s("div",{className:"syncify-share-create",children:s(x,{variant:"secondary",onClick:()=>{n.start(null)},disabled:n.compose!==null||t.atMax||e.marketplaceAvailable===!1,children:"Create a code"})}):null,s(nn,{open:i!==null,onClose:()=>o(null),title:i?`Delete ${kt(i)}`:"",actions:p(B,{children:[s(x,{variant:"secondary",onClick:()=>o(null),disabled:t.deleting,children:"Keep it"}),s(x,{variant:"danger",onClick:()=>{l()},disabled:t.deleting,children:t.deleting?"Deleting\u2026":"Delete code"})]}),children:i?Wc(i):null})]})}function em(e){let{saved:t}=e,n=Ne(t.code),i=t.link,o=t.outcome==="existing"?"You shared this setup already as":t.outcome==="updated"?"Code updated:":"Your code is ready:";return p(O,{tone:"info",live:!0,actions:p(B,{children:[s(x,{variant:"text",onClick:()=>e.onCopy(n,"saved-code"),children:e.copied==="saved-code"?"Copied":"Copy"}),i?s(x,{variant:"text",onClick:()=>e.onCopy(i,"saved-link"),children:e.copied==="saved-link"?"Copied":"Get link"}):null,t.outcome==="created"&&e.discoverOpen?s(x,{variant:"text",onClick:()=>Z(an(t.code)),children:"Post to Discover"}):null,s(x,{variant:"subtle",onClick:e.onDismiss,children:"Dismiss"})]}),children:[p("span",{children:[o," ",s("code",{className:"syncify-share-code",children:n})]}),t.leftOut>0?s("span",{className:"syncify-share-left-out",children:t.leftOut===1?"1 snippet isn't in Marketplace's list anymore, so it was left out.":`${t.leftOut} snippets aren't in Marketplace's list anymore, so they were left out.`}):null]})}function el(e){let{session:t}=e,n=Zc(e),i=Xc(e),o=Jc({token:t==null?void 0:t.token,hasHandle:i.profile!==null,suggestedHandle:i.suggestedHandle,reload:i.load,fail:i.fail}),[r,a]=h(null);if(A(()=>{Ys().then(a)},[]),n.shared)return s(Gc,{idBase:e.idBase,load:n,marketplaceAvailable:e.marketplaceAvailable,busy:e.busy});if(o.compose)return s(Vc,{idBase:e.idBase,compose:o});let c=n.input.trim();return p(X,{idBase:e.idBase,id:"share",children:[s("form",{className:"syncify-share-part",noValidate:!0,onSubmit:l=>{l.preventDefault(),!n.fetching&&c&&n.open()},children:s(Le,{label:"Load a setup",value:n.input,onChange:n.setInput,placeholder:"Paste a code or a link",error:n.error,action:s(x,{variant:"secondary",type:"submit",disabled:n.fetching!==null||!c,children:n.fetching&&!n.fetching.pick?"Loading\u2026":"Load"})})}),r?p("section",{className:"syncify-share-part","aria-label":r.length>0?"Syncify picks":"Discover",children:[r.length>0?s(re,{title:"Syncify picks"}):null,p(G,{children:[r.map(l=>{var u;return s(W,{name:l.name,meta:s(j,{parts:[s("span",{className:"syncify-share-pips",children:Yc(l).map((d,f)=>s(ae,{kind:d},f))},"pips"),((u=n.fetching)==null?void 0:u.code)===l.code?"Loading\u2026":ot(l.extensions+l.themes+l.snippets,"item")]}),onOpen:()=>{n.open(l.code)},openLabel:`Preview ${l.name}`,disabled:n.fetching!==null},l.code)}),s(W,{name:"Find more setups on Discover",end:s(x,{variant:"secondary",size:"small",onClick:()=>Z(an()),children:"Open"})})]})]}):null,t===void 0?null:t===null?s("div",{className:"syncify-share-part",children:s(se,{label:"Sign in to share this setup as a code",children:s(x,{variant:"secondary",onClick:e.onSignIn,children:"Sign in"})})}):s(Qc,{codes:i,compose:o,discoverOpen:r!==null,marketplaceAvailable:e.marketplaceAvailable})]})}var ko="syncify:share-code-count",vo="syncify:handle";function tm(){var t,n;let e=Number((n=(t=Spicetify.LocalStorage)==null?void 0:t.get(ko))!=null?n:NaN);return Number.isInteger(e)&&e>=0?e:null}function nm(){var t;let e=(t=Spicetify.LocalStorage)==null?void 0:t.get(vo);return e==null?void 0:e||null}function tl(){let[e,t]=h(()=>tm()),[n,i]=h(()=>nm()),o=ue(c=>{var l,u;c===null?(l=Spicetify.LocalStorage)==null||l.remove(ko):(u=Spicetify.LocalStorage)==null||u.set(ko,String(c)),t(c)},[]),r=ue(c=>{var l,u;c===void 0?(l=Spicetify.LocalStorage)==null||l.remove(vo):(u=Spicetify.LocalStorage)==null||u.set(vo,c!=null?c:""),i(c)},[]),a=ue(()=>{o(null),r(void 0)},[o,r]);return{codeCount:e,handle:n,saveCodeCount:o,saveHandle:r,forget:a}}var im=2e3;function nl(e){let{install:t}=e,n=!t||t.trusted?null:t.refused?"Another device on this Spotify account refused this one. Sign in to back up from it.":"This device isn't approved yet. Sign in, or approve it on your other device.";return p(B,{children:[e.nudge?s(O,{tone:"warning",actions:p(B,{children:[s(x,{variant:"subtle",size:"small",onClick:e.onHideNudge,disabled:e.securing,children:"Not now"}),s(x,{size:"small",onClick:e.onSecure,disabled:e.securing,children:e.securing?"Securing\u2026":"Secure"})]}),children:"Your backup isn't secured. Anyone who knows your Spotify username can restore it."}):null,n?s(O,{tone:"info",children:n}):null,e.restoreResult?s(om,{manual:e.restoreResult.manual}):null]})}function om(e){let[t,n]=h(!1),i=Ga(e.manual).join(`
`);if(A(()=>{if(!t)return;let r=setTimeout(()=>n(!1),im);return()=>clearTimeout(r)},[t]),!i)return null;let o=e.manual.length;return p(O,{tone:"info",actions:p(B,{children:[s(x,{variant:"text",onClick:()=>{yi(i).then(n)},children:t?"Copied":"Copy"}),s(x,{variant:"subtle",onClick:Wa,children:"Dismiss"})]}),children:[o===1?"1 isn't from Marketplace. Add it in a terminal:":`${o} aren't from Marketplace. Add them in a terminal:`,s("pre",{className:"syncify-commands",children:s("code",{children:i})})]})}function il(e){let{message:t}=e;return s(O,{tone:t.kind,actions:p(B,{children:[t.kind==="error"?s(x,{variant:"text",onClick:e.onTryAgain,disabled:e.busy,children:"Try again"}):null,s(x,{variant:"subtle",onClick:e.onDismiss,children:"Dismiss"})]}),children:t.text})}function ol(e){let t=rm(e);return t.backedUp&&e.latest?b(m({},t),{line:[`Backed up ${wt(e.latest.metadata.last_sync_datetime)}`,`${it(e.localItemCount)} on this device`]}):b(m({},t),{line:[t.title,...t.detail]})}function rm(e){let t={backedUp:!1,supportAsk:null},n=`${it(e.localItemCount)} on this device`;return e.restoreResult&&!e.unsupported?sm(e.restoreResult):e.unsupported?b(m({},t),{title:"Update Syncify to keep backing up",detail:["Your backups are safe"],action:"how-to-update"}):e.locked?b(m({},t),{title:"Sign in to restore",detail:[e.locked==="not_owner"?"Secured by another account":"This backup is secured"],action:"sign-in"}):e.activity==="backing-up"?b(m({},t),{title:"Backing up\u2026",detail:[],action:"back-up"}):e.checked?e.latest?e.localHash&&!e.backedUp?b(m({},t),{title:"Changes since your last backup",detail:am(e.latest,e.latestItems,e.localItems,e.localConfig),action:"back-up"}):b(m({},t),{title:"Everything is backed up",detail:[`Last backup ${wt(e.latest.metadata.last_sync_datetime)}`,n],action:null,backedUp:!0}):b(m({},t),{title:"No backup yet",detail:["Save your extensions and themes to restore them after a reinstall or on another computer."],action:"back-up"}):e.checkError?b(m({},t),{title:"Couldn't check your backup",detail:[e.checkError],action:"try-again"}):b(m({},t),{title:"Checking your backup\u2026",detail:[],action:null})}function sm(e){let t=e.loaded===e.total,n=e.kind==="share";return{title:t?n?"Setup loaded":"Backup restored":`${n?"Loaded":"Restored"} ${e.loaded} of ${e.total}`,detail:[t?e.total===0?"Nothing from Marketplace to load":`${e.loaded} of ${e.total} loaded`:"Missing something? Reload Spotify once more."],action:t?null:"reload",backedUp:!1,supportAsk:t?n?"Syncify set it up for you?":"Syncify saved your setup?":null}}function am(e,t,n,i){var f;let o=new Set(t),r=new Set(n),a=n.filter(y=>!o.has(y)).length,c=t.filter(y=>!r.has(y)).length,l=(f=e.spicetify_config)!=null?f:null,u=!!(i&&!l),d=!u&&(i&&l?!ds(i,l):i!==l);return[a?`${a} added`:null,c?`${c} removed`:null,d?"Spicetify config changed":null,u?"Spicetify config not saved yet":null,`Last backup ${wt(e.metadata.last_sync_datetime)}`].filter(y=>y!==null)}function rl(e,t,n){if((e==null?void 0:e.status)==="pending"&&!e.mine){let i=!e.not_me;return b(m({kind:"claim"},oi(e,n)),{canAnswer:i,signIn:i&&!n})}return t?{kind:"install",title:si(t),install:t}:null}var cm=3,xo={exists:!1,payload:null,backups:[],safetyCopy:null,pinned:[],claim:null,unapproved:[],install:null,nudge:!1},st=null;function sl(e){var d,f,y;let[t,n]=h(()=>st),[i,o]=h(void 0),r=ue(S=>{st=S,n(S)},[]),a=ue(async()=>{let S,w=null;try{S=await nt(e)}catch(E){if(!(E instanceof ye))throw E;S=xo,w=E.code}let v=await te().catch(()=>null),g=v?await ua(e).catch(()=>null):null,k=v?await te().catch(()=>null):null;return r({remote:S,lockedBy:w,claims:k?g:null}),o(k),w},[e,r]),c=ue(()=>{te().catch(()=>null).then(S=>o(w=>w!=null?w:S))},[]),l=ue(S=>{let w=st!=null?st:{remote:xo,lockedBy:null,claims:null},{remote:v}=w;r(b(m({},w),{remote:b(m({},v),{exists:!0,payload:S,backups:[S,...v.backups.filter(g=>g.payload_hash!==S.payload_hash)].slice(0,cm)})}))},[r]),u=ue(()=>{o(null),st&&r(b(m({},st),{claims:null}))},[r]);return{check:t,remote:(d=t==null?void 0:t.remote)!=null?d:xo,lockedBy:(f=t==null?void 0:t.lockedBy)!=null?f:null,claims:(y=t==null?void 0:t.claims)!=null?y:null,session:i,setSession:o,refresh:a,readSession:c,addBackup:l,forgetClaims:u}}function al(){let[e,t]=h(null),[n,i]=h(!1),o=ue(async()=>{try{let r=await An();return t(r),i(!1),r}catch(r){throw i(!0),r}},[]);return{local:e,localFailed:n,refreshLocal:o}}var lm=600*1e3;function cl(){let[e,t]=h(null);return A(()=>{let n=U();if(!ro(n.version))return;let i=!0;return oc(n.releasesUrl).then(o=>{i&&o&&so(o,n.version)>0&&t(o)}),()=>{i=!1}},[]),e}function ll(){let[e,t]=h(()=>Fa()),[n]=h(()=>Date.now());return A(()=>ja(t),[]),{result:e,recent:!!(e&&n-e.at<lm)}}function ul(e){let t=U(),n=[["Report an issue",t.issueUrl],["GitHub",t.githubUrl],["Discord",t.discordUrl],["Support on Ko-fi",t.kofiUrl]],i=[["Privacy",`${t.webUrl}/privacy`],["Terms",`${t.webUrl}/terms`]];return p("footer",{className:"syncify-window-footer",children:[p("span",{className:"syncify-window-footer-version",children:[s(j,{className:"syncify-window-footer-meta",parts:[`Syncify ${t.version}`,...i.map(([o,r])=>s(x,{variant:"subtle",size:"tiny",className:"syncify-window-footer-legal",onClick:()=>Z(r),children:o},o))]}),e.newerVersion?s(x,{variant:"text",size:"tiny",className:"syncify-window-update",onClick:()=>e.loadedByLoader?window.location.reload():Z(`${t.githubUrl}#updating`),children:s(j,{className:"syncify-window-footer-meta",parts:[`${e.newerVersion} is out`,e.loadedByLoader?"Reload":"How to update"]})}):null]}),s("span",{className:"syncify-window-footer-links",children:n.map(([o,r])=>s(x,{variant:"subtle",size:"tiny",onClick:()=>Z(r),children:o},o))})]})}var um={"back-up":"Back up now","try-again":"Try again","sign-in":"Sign in","how-to-update":"How to update",reload:"Reload"};function dl(e){let{status:t,alert:n}=e,i=t.action,o=i?s(x,{variant:i==="back-up"||i==="sign-in"?"primary":"secondary",size:n?"small":"regular",onClick:()=>e.onAction(i),disabled:e.busy,children:i==="back-up"&&e.backingUp?"Backing up\u2026":um[i]}):null;return n?p("section",{className:"syncify-status","aria-label":"Status",children:[p("div",{className:"syncify-status-alert",role:"alert",children:[s("span",{className:"syncify-status-alert-mark",children:s(ke,{tone:"warning",icon:s(fo,{})})}),p("div",{className:"syncify-status-text",children:[s("h2",{className:"syncify-status-title",children:n.title}),n.kind==="claim"&&n.text?s("p",{className:"syncify-status-sentence",children:n.text}):null]}),n.kind==="claim"?n.signIn?p("span",{className:"syncify-status-answers",children:[s(x,{variant:"secondary",onClick:e.onNotMe,disabled:e.answering,children:"Not me"}),s(x,{onClick:()=>e.onAction("sign-in"),disabled:e.answering,children:"That's me, sign in"})]}):n.canAnswer?s(x,{variant:"secondary",onClick:e.onNotMe,disabled:e.answering,children:"Not me"}):null:p("span",{className:"syncify-status-answers",children:[s(x,{variant:"secondary",onClick:()=>e.onAnswerInstall("reject"),disabled:e.answering,children:"Not mine"}),s(x,{onClick:()=>e.onAnswerInstall("approve"),disabled:e.answering,children:"Approve"})]})]}),p("div",{className:"syncify-status-line","aria-live":"polite",children:[t.backedUp?s(Oe,{className:"syncify-status-check"}):null,s(j,{parts:t.line}),o]})]}):s("section",{className:"syncify-status","aria-label":"Status",children:p("div",{className:"syncify-status-main","aria-live":"polite",children:[p("div",{className:"syncify-status-text",children:[s("h2",{className:"syncify-status-title",children:t.title}),t.detail.length>0?s(j,{parts:t.detail}):null,t.supportAsk?p("p",{className:"syncify-status-ask",children:[s("span",{children:t.supportAsk}),s(x,{variant:"text",onClick:e.onSupport,children:"Support it on Ko-fi"})]}):null]}),o]})})}function fl(e){let{codeCount:t,account:n,newerVersion:i}=e,o=[{id:"backups",label:"Backups"},{id:"share",label:"Share",status:t?s(mo,{count:t,label:ot(t,"code")}):void 0},{id:"account",label:"Account",status:n?n.kind==="ok"?s("span",{className:"syncify-tab-check",role:"img","aria-label":n.label,children:s(Oe,{})}):s(ke,{tone:"warning",label:n.label}):void 0},{id:"settings",label:"Settings",status:e.settingsHeld?s(ke,{tone:"warning",label:"An item's extension settings aren't syncing"}):i?s(ke,{tone:"info",label:`Syncify ${i} is out`}):void 0}];return s(ho,{tabs:o,selected:e.selected,onSelect:e.onSelect,idBase:e.idBase,label:"Syncify"})}var yl=!1;function cn(e){var _o,Mo,Bo,Lo,Oo,Do,Uo,$o,Ho,Ko,zo,Fo,jo;let t=F("syncify"),n=U(),[i,o]=h(()=>q()),{local:r,localFailed:a,refreshLocal:c}=al(),l=sl(i),u=tl(),d=cl(),f=ll(),y=Fc(),[S,w]=h(()=>!yl),[v]=h(()=>ic()!==null),[g,k]=h((_o=e.tab)!=null?_o:"backups"),[E,T]=h(()=>l.check?"idle":"checking"),[P,C]=h(null),[_,I]=h(null),[M,Y]=h(!1),[N,L]=h(!1),[$,Ye]=h(!1),[at,ce]=h(null),[xt,pi]=h(()=>ma()),[V,H]=h(e.secure===!0),ne=z(!1),{remote:ee,lockedBy:ge,claims:Ve,session:le}=l,Ct=E!=="idle",gi=(Mo=r==null?void 0:r.hash)!=null?Mo:null,ln=((Bo=ee.claim)==null?void 0:Bo.status)==="pending"&&!ee.claim.mine?ee.claim:null,qe=gc(Ve,ge,ln!==null),Ro=le!=null&&qe.kind==="secured",un=Ro&&i.settingsSyncEnabled,Eo=un&&y.arrived&&!y.arrived.hidden?y.arrived:null,vl=un&&rt(y,i.settingsSyncOff).length>0,xl=!!(gi&&ee.backups.some(R=>R.payload_hash===gi)),No=ol({activity:E,checked:l.check!==null,checkError:P,unsupported:M,locked:ge,latest:ee.payload,latestItems:ee.payload?bt(ee.payload).map(R=>R.key):[],backedUp:xl,localHash:gi,localItems:(Lo=r==null?void 0:r.installedItems)!=null?Lo:[],localItemCount:(Oo=r==null?void 0:r.installedItemCount)!=null?Oo:0,localConfig:(Do=r==null?void 0:r.spicetifyConfig)!=null?Do:null,restoreResult:f.recent?f.result:null}),Cl=rl(ee.claim,($o=(Uo=ee.install)==null?void 0:Uo.waiting[0])!=null?$o:null,le!=null),Il=!xt&&!ge&&ee.payload!==null&&g!=="account"&&(le?qe.kind==="open":le===null&&ee.nudge),Rl=(le?(Ho=Ve==null?void 0:Ve.accounts)!=null?Ho:[]:[]).filter(R=>R.status==="final").map((R,K)=>({hash:R.hash,label:`Spotify account ${K+1}${R.device_info?` from ${R.device_info}`:""}`})).filter(R=>R.hash!==(Ve==null?void 0:Ve.hash));async function he(R={}){try{(!R.silent||!l.check)&&T("checking"),R.silent||(I(null),C(null)),await c(),await l.refresh()&&k("account"),C(null),T("idle")}catch(K){It(K)}}function It(R){if(T("idle"),R instanceof Bt){Y(!0),I(null);return}if(R instanceof Ze){I({kind:"error",text:R.message}),he({silent:!0});return}if(R instanceof ye&&R.code!=="not_linked"){I(null),he({silent:!0});return}let K=R instanceof Error?R.message:String(R);l.check?I({kind:"error",text:K}):C(K),Spicetify.showNotification(K,!0,6e3)}async function El(){try{T("backing-up"),I(null);let R=await Zt(i).catch(()=>null),{payload:K,unchanged:Ge,unapproved:hi,settings:Ll}=await Jt(i,R);if(await Jn(R,Ll,ee.backups).catch(()=>null),await c(),hi){await he({silent:!0}),I({kind:"warning",text:"Backed up. This device needs approval before its backups count."}),Spicetify.showNotification("Syncify: backed up, this device needs approval");return}Ge||l.addBackup(K),T("idle"),Spicetify.showNotification(Ge?"Syncify: everything is already backed up":"Syncify backup complete")}catch(R){It(R)}}async function Nl(R){var K;try{T("restoring"),I(null),await ca(i,R.row.backup,(K=R.linkedHash)!=null?K:void 0,R.skipped,R.settings),Spicetify.showNotification("Syncify restore complete. Reloading\u2026"),tn(R.manual),setTimeout(()=>window.location.reload(),1e3)}catch(Ge){It(Ge)}}async function Pl(R){var Ge;let K=(Ge=ee.install)==null?void 0:Ge.waiting[0];if(K){L(!0);try{await zn(i,K.id,R),Spicetify.showNotification(ai(R)),await he({silent:!0})}catch(hi){It(hi)}finally{L(!1)}}}async function Tl(){var R;L(!0);try{Spicetify.showNotification(ri(await Fn(i),(R=ln==null?void 0:ln.email)!=null?R:null)),await he({silent:!0})}catch(K){I({kind:"error",text:K instanceof Error?K.message:String(K)})}finally{L(!1)}}async function Rt(){Ye(!0),ce(null);try{await da(i)}catch(R){R instanceof ze&&["claim_pending","claimed"].includes(R.code)||ce(R instanceof Error?R.message:String(R))}finally{await he({silent:!0}),Ye(!1)}}function Al(){le?Rt():k("account")}function _l(){H(!0),le?Rt():k("account")}function Ml(R){l.setSession(R),ne.current=!0,!ge&&ee.payload?Rt():he({silent:!0})}function Po(){u.forget(),l.forgetClaims(),ce(null),he({silent:!0})}function Bl(R){R==="back-up"?El():R==="try-again"?he():R==="sign-in"?k("account"):R==="how-to-update"?Z(`${n.githubUrl}#updating`):Ya()}A(()=>qn(()=>o(R=>b(m({},R),{settingsSyncOff:q().settingsSyncOff}))),[]);let To=Ae(()=>{l.readSession(),he({silent:!0})});A(()=>To.current(),[To]);let Ao=Ae(()=>{!e.secure||ne.current||$||!le||qe.kind!=="open"||ge||(ne.current=!0,Rt())});return A(()=>Ao.current(),[Ao,le,qe.kind,ge,$]),p("div",{className:"syncify-ui syncify-window",onClick:Co,onMouseDown:Co,onPointerDown:Co,children:[p("div",{className:"syncify-window-top",children:[s(dl,{status:No,alert:Cl,backingUp:E==="backing-up",busy:Ct||No.action==="back-up"&&ge!==null,answering:N,onAction:Bl,onNotMe:()=>{Tl()},onAnswerInstall:R=>{Pl(R)},onSupport:()=>Z(n.kofiUrl)}),_?s(il,{message:_,busy:Ct,onTryAgain:()=>{he()},onDismiss:()=>I(null)}):null,Eo?s(O,{tone:"info",actions:p(B,{children:[s(x,{variant:"subtle",size:"small",onClick:xa,children:"Not now"}),s(x,{size:"small",onClick:()=>window.location.reload(),children:"Reload Spotify"})]}),children:Gn(Eo.names)}):null,s(fl,{idBase:t,selected:g,onSelect:k,codeCount:le?u.codeCount:null,account:hc(le,ge,qe),newerVersion:d,settingsHeld:vl})]}),g==="backups"?s(Tc,{idBase:t,config:i,remote:l.check?ee:null,failed:P!==null||a,lockedBy:ge,local:r,otherAccounts:Rl,notices:s(nl,{nudge:Il,securing:$,onSecure:_l,onHideNudge:()=>{pa(),pi(!0)},install:ge||qe.kind==="secured"?null:ee.install,restoreResult:f.result}),canShareSettings:un,shareSettings:i.shareRestoredSettings,onShareSettingsChange:R=>{let K=b(m({},i),{shareRestoredSettings:R});tt(K),o(K)},busy:Ct,restoring:E==="restoring",onRestore:R=>{Nl(R)},onError:It}):g==="share"?s(el,{idBase:t,config:i,session:le,localItems:(Ko=r==null?void 0:r.items)!=null?Ko:[],localConfig:(zo=r==null?void 0:r.spicetifyConfig)!=null?zo:null,localTheme:(Fo=r==null?void 0:r.activeTheme)!=null?Fo:null,marketplaceAvailable:(jo=r==null?void 0:r.marketplaceAvailable)!=null?jo:null,busy:Ct,onSignIn:()=>k("account"),onSignedOut:Po,onCodeCount:u.saveCodeCount,onHandle:u.saveHandle}):g==="account"?s(kc,{idBase:t,session:le,locked:ge,secure:qe,securing:$,secureError:at,onSecure:()=>{Rt()},nudge:V,onSignedIn:Ml,onSignedOut:Po,handle:u.handle,onHandle:u.saveHandle}):s(zc,{idBase:t,config:i,onConfigChange:o,busy:Ct,unsupported:M,syncStatus:y,secured:Ro,securing:$,onSecure:Al}),un&&y.choices.length>0?s(Ac,{choices:y.choices,open:S,onClose:()=>{yl=!0,w(!1)}}):null,s(ul,{newerVersion:d,loadedByLoader:v})]})}function Co(e){e.stopPropagation()}var ml=`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="-2.5 -2.5 37 37" aria-hidden="true" focusable="false"><defs><mask id="syncify-mark-gap" maskUnits="userSpaceOnUse" x="-2" y="-2" width="36" height="36"><rect x="-2" y="-2" width="36" height="36" fill="#fff"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></mask></defs><g mask="url(#syncify-mark-gap)"><g transform="rotate(15 16 16)"><path d="M16 16L16 7.4A8.6 8.6 0 0 1 24.6 16Z" fill="#6cd1d1" transform="translate(0.42 -0.42)"/><path d="M16 16L24.6 16A8.6 8.6 0 0 1 16 24.6Z" fill="#efa4c1" transform="translate(0.42 0.42)"/><path d="M16 16L16 24.6A8.6 8.6 0 0 1 7.4 16Z" fill="#d3c48c" transform="translate(-0.42 0.42)"/><path d="M16 16L7.4 16A8.6 8.6 0 0 1 16 7.4Z" fill="#88bcf2" transform="translate(-0.42 -0.42)"/></g></g><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 28.03A12.4 12.4 0 1 1 28.03 19"/><path d="M32.08 17.65 27.55 20.94 25.09 15.91"/></g></svg>
`;var _e=null;function We(){return!!(_e!=null&&_e.container.isConnected)}function vt(){Spicetify.PopupModal.hide()}function De(e){pl(_e);let t=document.createElement("div");_e={container:t,root:null,watch:null};try{Spicetify.PopupModal.display({title:U().extensionName,content:t,isLarge:!1})}catch(n){throw de("Failed to open PopupModal",n),n}ym(t),pm(t,e),fm(t)}function fm(e){let t=_e;if((t==null?void 0:t.container)!==e||typeof MutationObserver!="function")return;let n=new MutationObserver(()=>{e.isConnected||pl(t)});n.observe(document.body,{childList:!0,subtree:!0}),t.watch=n}function pl(e){var t,n;e&&((t=e.watch)==null||t.disconnect(),e.watch=null,(n=e.root)==null||n.unmount(),e.root=null)}function ym(e){requestAnimationFrame(()=>{let t=mm(e);t==null||t.classList.add("syncify-modal-shell");let n=t==null?void 0:t.querySelector(".main-trackCreditsModal-header h1");if(n&&!n.querySelector(".syncify-modal-mark")){let o=document.createElement("span");o.className="syncify-modal-mark",o.innerHTML=ml,n.prepend(o)}let i=t==null?void 0:t.querySelector('button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type');i&&(i.classList.add("syncify-modal-close"),i.setAttribute("aria-label",`Close ${U().extensionName}`),i.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')})}function mm(e){let t=e.parentElement;for(;t&&t!==document.body;){if(t.querySelector(".main-trackCreditsModal-header"))return t;t=t.parentElement}return e.closest('[class*="trackCreditsModal"]')}function pm(e,t){try{if(typeof Spicetify.ReactDOM.createRoot=="function"){let n=Spicetify.ReactDOM.createRoot(e);n.render(t),(_e==null?void 0:_e.container)===e&&(_e.root=n),oe("Window rendered",{renderer:"createRoot"});return}Spicetify.ReactDOM.render(t,e),oe("Window rendered",{renderer:"render"})}catch(n){throw de("Failed to render window",n),n}}function mi(e){return s("div",{className:"syncify-ui syncify-launch-notice",children:p(Qn,{title:e.title,actions:e.actions,children:[e.children?s("p",{children:e.children}):null,e.error?s(O,{tone:"error",children:e.error}):null]})})}function gl(){let[e,t]=h(!1),[n,i]=h(null);async function o(r){t(!0),i(null);try{await r()}catch(a){i(a instanceof Error?a.message:String(a)),t(!1)}}return{busy:e,error:n,run:o}}function hl(e){let{title:t,text:n}=oi(e.claim,e.signedIn),i=gl(),o=()=>{i.run(async()=>{Spicetify.showNotification(ri(await Fn(q()),e.claim.email)),e.onClose()})};return s(mi,{title:t,error:i.error,actions:e.signedIn?p(B,{children:[s(x,{variant:"secondary",onClick:e.onClose,disabled:i.busy,children:"Close"}),s(x,{onClick:o,disabled:i.busy,children:"Not me"})]}):p(B,{children:[s(x,{variant:"secondary",onClick:o,disabled:i.busy,children:"Not me"}),s(x,{onClick:e.onSignIn,disabled:i.busy,children:"That's me, sign in"})]}),children:n})}function Sl(e){return s(mi,{title:pc(e.claim),actions:s(x,{onClick:e.onClose,children:"Close"})})}function bl(e){let t=gl(),n=i=>{t.run(async()=>{await zn(q(),e.install.id,i),Spicetify.showNotification(ai(i)),e.onDone()})};return s(mi,{title:si(e.install),error:t.error,actions:p(B,{children:[s(x,{variant:"secondary",onClick:()=>n("reject"),disabled:t.busy,children:"Not mine"}),s(x,{onClick:()=>n("approve"),disabled:t.busy,children:"Approve"})]}),children:"Approve it if it's yours."})}function wl(e){return s(mi,{title:"Your backup isn't secured",actions:p(B,{children:[s(x,{variant:"secondary",onClick:e.onClose,children:"Not now"}),s(x,{onClick:t=>{t.stopPropagation(),e.onSecure()},children:"Secure"})]}),children:"Anyone who knows your Spotify username can restore it."})}function gm(){var e;return!!(Spicetify!=null&&Spicetify.Platform&&(Spicetify!=null&&Spicetify.LocalStorage)&&((e=Spicetify==null?void 0:Spicetify.Topbar)!=null&&e.Button)&&(Spicetify!=null&&Spicetify.PopupModal)&&(Spicetify!=null&&Spicetify.React)&&(Spicetify!=null&&Spicetify.ReactDOM)&&(Spicetify!=null&&Spicetify.showNotification))}var kl="syncify-styles";function hm(){if(document.getElementById(kl)){oe("Another copy of Syncify is running; stopping this one");return}qo(Spicetify.React),Sm();let e=q();sa({topbarButton:Qa(Io),menuItem:tc(Io)}),$n(e.entryPoint),Vi(e.shortcut,Io),Oa({onClaim:bm,onUndone:wm,onInstall:km,onNudge:vm,onFirstSync:xm}).catch(t=>{de("Startup sync check failed",t)}),qa().catch(t=>{de("Restore check failed",t)})}function Sm(){let e=document.createElement("style");e.id=kl,e.textContent=Cr,document.head.appendChild(e)}function Io(){if(We()){vt();return}De(s(cn,{}))}function bm(e){We()||(oe("Opening claim notice"),te().catch(()=>null).then(t=>{We()||De(s(hl,{claim:e,signedIn:t!==null,onSignIn:()=>De(s(cn,{tab:"account"})),onClose:vt}))}))}function wm(e){return We()?!1:(oe("Opening undone claim notice"),De(s(Sl,{claim:e,onClose:vt})),!0)}function km(e){We()||(oe("Opening install notice"),De(s(bl,{install:e,onDone:vt})))}function vm(){We()||(oe("Opening nudge notice"),ha(),De(s(wl,{onSecure:()=>De(s(cn,{tab:"account",secure:!0})),onClose:vt})))}function xm(){We()||(oe("Opening first sync"),De(s(cn,{tab:"settings"})))}Va();(function e(){if(!gm()){setTimeout(e,100);return}oe("Spicetify APIs ready"),hm()})();})();
