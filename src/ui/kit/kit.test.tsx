import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { classNames } from "./classNames";
import { Dialog } from "./Dialog";
import { Field } from "./Field";
import { Menu } from "./Menu";
import { Meta } from "./Meta";
import { Meter } from "./Meter";
import { SwitchRow } from "./Switch";
import { TabPanel, Tabs } from "./Tabs";

describe("classNames", () => {
  it("joins only the names that are set", () => {
    expect(classNames("a", false, null, undefined, "b")).toBe("a b");
  });
});

describe("Meta", () => {
  it("leaves out empty facts and draws a dot between the rest", () => {
    const { container } = render(<Meta parts={["14 items", null, false, "", "from Windows"]} />);
    expect(container.querySelectorAll(".syncify-meta-part")).toHaveLength(2);
    expect(container.querySelectorAll(".syncify-dot")).toHaveLength(1);
    expect(container.textContent).not.toContain("·");
  });
});

describe("Meter", () => {
  it("says how much of the limit is used", () => {
    render(<Meter used={2} max={5} label="Codes" />);
    const meter = screen.getByRole("meter", { name: "Codes" });
    expect(meter.getAttribute("aria-valuenow")).toBe("2");
    expect(meter.getAttribute("aria-valuemax")).toBe("5");
    expect(meter.textContent).toContain("Used 2 of 5");
    expect(meter.querySelectorAll('[data-used="true"]')).toHaveLength(2);
  });
});

describe("Field", () => {
  it("has a visible label and ties its error to the input", () => {
    render(<Field label="Creator handle" value="ab" onChange={() => {}} error="Use 3 to 20 letters" />);
    const input = screen.getByLabelText("Creator handle");
    expect(input.getAttribute("aria-invalid")).toBe("true");
    const error = document.getElementById(input.getAttribute("aria-describedby") ?? "");
    expect(error?.textContent).toBe("Use 3 to 20 letters");
  });

  it("checks on leaving the field, not while typing", () => {
    const onBlur = vi.fn();
    const onChange = vi.fn();
    render(<Field label="Name" value="" onChange={onChange} onBlur={onBlur} />);
    const input = screen.getByLabelText("Name");
    fireEvent.change(input, { target: { value: "x" } });
    expect(onChange).toHaveBeenCalledWith("x");
    expect(onBlur).not.toHaveBeenCalled();
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalledOnce();
  });
});

describe("SwitchRow", () => {
  it("turns on from anywhere on the row", () => {
    const onChange = vi.fn();
    render(<SwitchRow label="Automatic backup when Spotify starts" checked={false} onChange={onChange} />);
    fireEvent.click(screen.getByText("Automatic backup when Spotify starts"));
    expect(onChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole("switch", { name: "Automatic backup when Spotify starts" })).toBeTruthy();
  });
});

function TabsHarness() {
  const [selected, setSelected] = useState<"a" | "b" | "c">("a");
  return (
    <>
      <Tabs
        idBase="t"
        label="Sections"
        selected={selected}
        onSelect={setSelected}
        tabs={[
          { id: "a", label: "Backups" },
          { id: "b", label: "Share" },
          { id: "c", label: "Account" },
        ]}
      />
      <TabPanel idBase="t" id={selected}>
        {selected}
      </TabPanel>
    </>
  );
}

describe("Tabs", () => {
  it("moves with the arrow keys and opens the tab it lands on", () => {
    render(<TabsHarness />);
    const backups = screen.getByRole("tab", { name: "Backups" });
    backups.focus();
    fireEvent.keyDown(backups, { key: "ArrowLeft" });
    const account = screen.getByRole("tab", { name: "Account" });
    expect(account.getAttribute("aria-selected")).toBe("true");
    expect(document.activeElement).toBe(account);
    expect(screen.getByRole("tabpanel").getAttribute("aria-labelledby")).toBe(account.id);
    fireEvent.keyDown(account, { key: "Home" });
    expect(backups.getAttribute("aria-selected")).toBe("true");
  });

  it("keeps only the open tab in the Tab order", () => {
    render(<TabsHarness />);
    const tabIndexes = screen.getAllByRole("tab").map((tab) => tab.tabIndex);
    expect(tabIndexes).toEqual([0, -1, -1]);
  });
});

describe("Menu", () => {
  it("opens on its focused first item, moves with arrows and gives focus back on Escape", () => {
    render(
      <Menu
        label="More for Clean and quiet"
        trigger="more"
        items={[
          { label: "Update", onSelect: () => {} },
          { label: "Delete", onSelect: () => {}, danger: true },
        ]}
      />,
    );
    const button = screen.getByRole("button", { name: "More for Clean and quiet" });
    fireEvent.click(button);
    const items = screen.getAllByRole("menuitem");
    expect(document.activeElement).toBe(items[0]);
    fireEvent.keyDown(items[0], { key: "ArrowDown" });
    expect(document.activeElement).toBe(items[1]);
    expect(items[1].getAttribute("data-danger")).toBe("true");
    fireEvent.keyDown(items[1], { key: "Escape" });
    expect(screen.queryByRole("menu")).toBeNull();
    expect(document.activeElement).toBe(button);
  });

  it("runs the picked item and closes", () => {
    const onSelect = vi.fn();
    render(
      <Menu
        label="Open Syncify from"
        trigger={{ value: "Top bar" }}
        items={[
          { label: "Top bar", onSelect: () => {}, checked: true },
          { label: "Profile menu", onSelect, checked: false },
        ]}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Open Syncify from: Top bar" }));
    const picked = screen.getByRole("menuitemradio", { name: "Top bar" });
    expect(picked.getAttribute("aria-checked")).toBe("true");
    expect(document.activeElement).toBe(picked);
    fireEvent.click(screen.getByRole("menuitemradio", { name: "Profile menu" }));
    expect(onSelect).toHaveBeenCalledOnce();
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("closes on a click elsewhere", () => {
    render(<Menu label="More" trigger="more" items={[{ label: "Update", onSelect: () => {} }]} />);
    fireEvent.click(screen.getByRole("button", { name: "More" }));
    expect(screen.getByRole("menu")).toBeTruthy();
    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole("menu")).toBeNull();
  });
});

describe("Dialog", () => {
  it("opens modal, closes on Escape and gives focus back", () => {
    const onClose = vi.fn();
    const opener = document.createElement("button");
    document.body.append(opener);
    opener.focus();
    const { rerender } = render(
      <Dialog open title="Delete Clean and quiet" onClose={onClose} actions={<button type="button">Keep it</button>}>
        The code stops working.
      </Dialog>,
    );
    const dialog = screen.getByRole("dialog", { name: "Delete Clean and quiet" });
    expect((dialog as HTMLDialogElement).open).toBe(true);
    fireEvent(dialog, new Event("cancel", { cancelable: true }));
    expect(onClose).toHaveBeenCalledOnce();
    rerender(
      <Dialog open={false} title="Delete Clean and quiet" onClose={onClose} actions={null}>
        The code stops working.
      </Dialog>,
    );
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(opener);
    opener.remove();
  });
});
