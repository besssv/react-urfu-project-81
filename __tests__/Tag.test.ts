import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";
import Tag, { type Attributes } from "../src/Tag.ts";

interface TagCase {
  name: string;
  attributes: Attributes;
  body: string;
  expected: string;
}

const fixturePath = new URL("../__fixtures__/tags.json", import.meta.url);
const cases = JSON.parse(readFileSync(fixturePath, "utf-8")) as TagCase[];

describe("Tag", () => {
  test.each(cases)("$expected", ({ name, attributes, body, expected }) => {
    expect(new Tag(name, attributes, body).toString()).toBe(expected);
  });

  test("works with default arguments", () => {
    expect(new Tag("hr").toString()).toBe("<hr>");
    expect(new Tag("span").toString()).toBe("<span></span>");
  });

  test("ignores body for single tags", () => {
    expect(new Tag("br", {}, "ignored").toString()).toBe("<br>");
  });

  test("renders boolean and numeric attributes", () => {
    const tag = new Tag("input", { type: "checkbox", checked: true, disabled: false, tabindex: 1 });
    expect(tag.toString()).toBe('<input type="checkbox" checked tabindex="1">');
  });

  test("isSingle", () => {
    expect(new Tag("img").isSingle()).toBe(true);
    expect(new Tag("div").isSingle()).toBe(false);
  });

  test("implicit string conversion", () => {
    expect(`${new Tag("label", { for: "email" }, "Email")}`).toBe(
      '<label for="email">Email</label>',
    );
  });
});
