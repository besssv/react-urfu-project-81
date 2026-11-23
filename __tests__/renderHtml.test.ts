import { expect, test } from "vitest";
import { renderHtml, type Field } from "../src/index.ts";

test("throws on unknown field type", () => {
  const field = { type: "checkbox", value: "", attributes: {} } as unknown as Field;
  expect(() => renderHtml({ attributes: {}, fields: [field] })).toThrow(
    "Unknown field type: 'checkbox'.",
  );
});
