import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { CheckIcon, ChevronDownIcon, MoreIcon } from "./icons";
import { useStableId } from "./useStableId";

export interface MenuItem {
  label: string;
  onSelect(): void;
  /** Destructive, drawn in red. */
  danger?: boolean;
  /** Set on every item of a menu that picks one of several. */
  checked?: boolean;
  disabled?: boolean;
}

export interface MenuProps {
  items: MenuItem[];
  /** What the menu is for, read out on its button. */
  label: string;
  /**
   * "more": a ⋯ button for a row's rarer actions. "value": a button showing
   * the current choice, for a setting with one of several values.
   */
  trigger: "more" | { value: string };
  disabled?: boolean;
}

/**
 * A button that opens a list of actions above everything else, so a row near
 * the window's edge can't cut it off. It closes on a pick, Escape, a click
 * elsewhere or a scroll, and gives focus back to its button.
 */
export function Menu(props: MenuProps) {
  const id = useStableId("menu");
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const picks = props.items.some((item) => item.checked !== undefined);

  useEffect(() => {
    const popover = popoverRef.current;
    const button = buttonRef.current;
    if (!open || !popover || !button) return;

    showPopover(popover);
    placePopover(popover, button);
    const items = menuItems(popover);
    (items.find((item) => item.getAttribute("aria-checked") === "true") ?? items[0])?.focus();

    const close = () => setOpen(false);
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (!popover.contains(target) && !button.contains(target)) close();
    };
    // The page moving leaves the menu behind; scrolling inside it doesn't.
    const onScroll = (event: Event) => {
      if (event.target instanceof Node && popover.contains(event.target)) return;
      close();
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", close);
      hidePopover(popover);
    };
  }, [open]);

  function closeAndFocusButton() {
    setOpen(false);
    buttonRef.current?.focus();
  }

  function onMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const items = menuItems(event.currentTarget);
    const index = items.findIndex((item) => item === document.activeElement);
    const next =
      event.key === "ArrowDown"
        ? items[(index + 1) % items.length]
        : event.key === "ArrowUp"
          ? items[(index - 1 + items.length) % items.length]
          : event.key === "Home"
            ? items[0]
            : event.key === "End"
              ? items[items.length - 1]
              : null;
    if (next) {
      event.preventDefault();
      next.focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeAndFocusButton();
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  }

  function onButtonKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
    }
  }

  const buttonProps = {
    ref: buttonRef,
    type: "button" as const,
    "aria-haspopup": "menu" as const,
    "aria-expanded": open,
    "aria-controls": open ? id : undefined,
    disabled: props.disabled,
    onClick: () => setOpen(!open),
    onKeyDown: onButtonKeyDown,
  };

  return (
    <>
      {props.trigger === "more" ? (
        <button className="syncify-icon-btn" aria-label={props.label} {...buttonProps}>
          <MoreIcon />
        </button>
      ) : (
        <button className="syncify-menu-value" aria-label={`${props.label}: ${props.trigger.value}`} {...buttonProps}>
          <span className="syncify-cap">{props.trigger.value}</span>
          <ChevronDownIcon />
        </button>
      )}
      {open ? (
        <div
          className="syncify-menu"
          id={id}
          ref={popoverRef}
          role="menu"
          aria-label={props.label}
          popover="manual"
          onKeyDown={onMenuKeyDown}
        >
          {props.items.map((item) => (
            <MenuEntry
              key={item.label}
              item={item}
              picks={picks}
              onPick={() => {
                closeAndFocusButton();
                item.onSelect();
              }}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}

function MenuEntry(props: { item: MenuItem; picks: boolean; onPick(): void }): ReactNode {
  const { item, picks } = props;
  return (
    <button
      className="syncify-menu-item"
      type="button"
      role={picks ? "menuitemradio" : "menuitem"}
      aria-checked={picks ? item.checked === true : undefined}
      data-danger={item.danger ? "true" : undefined}
      tabIndex={-1}
      disabled={item.disabled}
      onClick={props.onPick}
    >
      <span className="syncify-cap">{item.label}</span>
      {item.checked ? <CheckIcon /> : null}
    </button>
  );
}

function menuItems(menu: HTMLElement): HTMLElement[] {
  return [...menu.querySelectorAll<HTMLElement>(".syncify-menu-item:not(:disabled)")];
}

// The top layer keeps the menu over the window's scrolling content. Where
// popovers aren't supported, the menu is fixed in place instead.
function showPopover(popover: HTMLElement): void {
  if (typeof popover.showPopover === "function" && !popover.matches(":popover-open")) {
    popover.showPopover();
  }
}

function hidePopover(popover: HTMLElement): void {
  if (typeof popover.hidePopover === "function" && popover.matches(":popover-open")) {
    popover.hidePopover();
  }
}

// Space between the button and its menu, and the menu and the screen's edge.
const POPOVER_GAP_PX = 4;

/** Under the button, its right edges lined up; above it when there's no room below. */
function placePopover(popover: HTMLElement, button: HTMLElement): void {
  const gap = POPOVER_GAP_PX;
  const anchor = button.getBoundingClientRect();
  const size = popover.getBoundingClientRect();
  const below = anchor.bottom + gap;
  const top =
    below + size.height > window.innerHeight && anchor.top - gap - size.height >= 0
      ? anchor.top - gap - size.height
      : below;
  const left = Math.min(
    Math.max(anchor.right - size.width, gap),
    window.innerWidth - size.width - gap,
  );
  popover.style.top = `${top}px`;
  popover.style.left = `${left}px`;
}
