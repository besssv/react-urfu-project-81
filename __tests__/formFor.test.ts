import { describe, expect, test } from "vitest";
import HexletCode from "../src/index.ts";

const template = { name: "rob", job: "hexlet", gender: "m" };

describe("HexletCode.formFor", () => {
  test("generates empty form with default action", () => {
    const form = HexletCode.formFor(template, {}, () => {});
    expect(form).toBe('<form method="post" action="#"></form>');
  });

  test("uses url as form action", () => {
    const form = HexletCode.formFor(template, { url: "/users" }, () => {});
    expect(form).toBe('<form method="post" action="/users"></form>');
  });

  test("works without options", () => {
    const form = HexletCode.formFor(template, undefined, () => {});
    expect(form).toBe('<form method="post" action="#"></form>');
  });

  test("works without callback", () => {
    expect(HexletCode.formFor(template)).toBe('<form method="post" action="#"></form>');
  });

  test("passes builder to callback", () => {
    let called = false;
    HexletCode.formFor(template, {}, (f) => {
      called = true;
      expect(f).toBeDefined();
    });
    expect(called).toBe(true);
  });
});
