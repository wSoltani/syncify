import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { bindReact, useState } from "./index";
import { Fragment, jsx, jsxs } from "./jsx-runtime";

describe("the React bindings", () => {
  it("are filled in from the React they're given", () => {
    bindReact(React);
    expect(useState).toBe(React.useState);
    expect(Fragment).toBe(React.Fragment);
  });

  it("build elements the way React's own runtime does", () => {
    bindReact(React);
    const single = jsx("p", { className: "a", children: "one" }, "k");
    const list = jsxs("ul", { children: [jsx("li", { children: "a" }, "1"), jsx("li", { children: "b" }, "2")] });
    const empty = jsx(Fragment, {});

    expect(single.key).toBe("k");
    expect(renderToStaticMarkup(single)).toBe('<p class="a">one</p>');
    expect(renderToStaticMarkup(list)).toBe("<ul><li>a</li><li>b</li></ul>");
    expect(renderToStaticMarkup(empty)).toBe("");
  });
});
