import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";
import HexletCode from "../src/index.ts";

const readFixture = (name: string): string =>
  readFileSync(new URL(`../__fixtures__/${name}`, import.meta.url), "utf-8").trim();

const template = { name: "rob", job: "hexlet", gender: "m" };

describe("FormBuilder.input", () => {
  test("generates input and textarea", () => {
    const form = HexletCode.formFor(template, { method: "post" }, (f) => {
      f.input("name");
      f.input("job", { as: "textarea" });
    });
    expect(form).toBe(readFixture("form-input-textarea.html"));
  });

  test("adds extra attributes", () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.input("name", { class: "user-input" });
      f.input("job");
    });
    expect(form).toBe(readFixture("form-input-attributes.html"));
  });

  test("uses default textarea size", () => {
    const form = HexletCode.formFor(template, {}, (f) => f.input("job", { as: "textarea" }));
    expect(form).toBe(readFixture("form-textarea-default.html"));
  });

  test("overrides default textarea size", () => {
    const form = HexletCode.formFor(template, { url: "#" }, (f) =>
      f.input("job", { as: "textarea", rows: 50, cols: 50 }),
    );
    expect(form).toBe(readFixture("form-textarea-override.html"));
  });

  test("throws when field does not exist", () => {
    expect(() =>
      HexletCode.formFor(template, { url: "/users" }, (f) => {
        f.input("name");
        f.input("job", { as: "textarea" });
        f.input("age");
      }),
    ).toThrow("Field 'age' does not exist in the template.");
  });

  test("sets label text and attributes", () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.input("name", { label: "User", labelHtml: { class: "form-label", id: "name-label" } });
      f.input("job", { as: "textarea", class: "big" });
      f.submit("Ok");
    });
    expect(form).toBe(readFixture("form-label-options.html"));
  });

  test("renders empty value for null field", () => {
    const form = HexletCode.formFor({ name: null }, {}, (f) => f.input("name"));
    expect(form).toBe(
      '<form method="post" action="#"><label for="name">Name</label><input name="name" type="text" value=""></form>',
    );
  });

  test("uses method option", () => {
    const form = HexletCode.formFor(template, { method: "get" }, () => {});
    expect(form).toBe('<form method="get" action="#"></form>');
  });
});
