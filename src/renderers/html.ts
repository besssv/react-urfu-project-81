import Tag from "../Tag.ts";
import type { Attributes } from "../Tag.ts";
import type { Field, FormState, Label } from "../types.ts";

const textareaDefaults: Attributes = { cols: 20, rows: 40 };

const renderLabel = (name: string, { text, attributes }: Label): Tag =>
  new Tag("label", { for: name, ...attributes }, text);

const renderField = (field: Field): string => {
  switch (field.type) {
    case "input": {
      const { name, label, value, attributes } = field;
      const input = new Tag("input", { name, type: "text", value, ...attributes });
      return `${renderLabel(name, label)}${input}`;
    }
    case "textarea": {
      const { name, label, value, attributes } = field;
      const textarea = new Tag("textarea", { ...textareaDefaults, name, ...attributes }, value);
      return `${renderLabel(name, label)}${textarea}`;
    }
    case "submit": {
      const { value, attributes } = field;
      return new Tag("input", { type: "submit", value, ...attributes }).toString();
    }
    default: {
      const unknownField: { type: string } = field;
      throw new Error(`Unknown field type: '${unknownField.type}'.`);
    }
  }
};

const renderHtml = ({ attributes, fields }: FormState): string =>
  new Tag("form", attributes, fields.map(renderField).join("")).toString();

export default renderHtml;
