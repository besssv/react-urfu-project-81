import Tag from "../Tag.ts";
import type { Field, FormState } from "../types.ts";

const renderField = (field: Field): string => {
  switch (field.type) {
    case "input": {
      const { name, label, value, attributes } = field;
      const labelTag = new Tag("label", { for: name }, label);
      const inputTag = new Tag("input", { name, type: "text", value, ...attributes });
      return `${labelTag}${inputTag}`;
    }
    case "textarea": {
      const { name, label, value, attributes } = field;
      const labelTag = new Tag("label", { for: name }, label);
      const textareaTag = new Tag("textarea", { ...attributes, name }, value);
      return `${labelTag}${textareaTag}`;
    }
    case "submit":
      return new Tag("input", {
        type: "submit",
        value: field.value,
        ...field.attributes,
      }).toString();
  }
};

const renderHtml = ({ attributes, fields }: FormState): string =>
  new Tag("form", attributes, fields.map(renderField).join("")).toString();

export default renderHtml;
