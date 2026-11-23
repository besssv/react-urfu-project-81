import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";
import HexletCode from "../src/index.ts";

const readFixture = (name: string): string =>
  readFileSync(new URL(`../__fixtures__/${name}`, import.meta.url), "utf-8").trim();

const template = { name: "rob", job: "hexlet", gender: "m" };

describe("FormBuilder.submit", () => {
  test("adds submit button with default text", () => {
    const form = HexletCode.formFor(template, { method: "post" }, (f) => {
      f.input("name");
      f.input("job", { as: "textarea" });
      f.submit();
    });
    expect(form).toBe(readFixture("form-submit-default.html"));
  });

  test("adds submit button with custom text", () => {
    const form = HexletCode.formFor(template, { method: "post" }, (f) => {
      f.input("name");
      f.input("job", { as: "textarea" });
      f.submit("Wow");
    });
    expect(form).toBe(readFixture("form-submit-custom.html"));
  });

  test("renders submit without fields", () => {
    const form = HexletCode.formFor(template, {}, (f) => f.submit());
    expect(form).toBe('<form action="#" method="post"><input type="submit" value="Save"></form>');
  });
});
