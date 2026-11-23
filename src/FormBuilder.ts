import type { Attributes } from "./Tag.ts";
import type { Field, Template } from "./types.ts";

export interface InputOptions extends Attributes {
  as?: "input" | "textarea";
}

const textareaDefaults: Attributes = { cols: 20, rows: 40 };

const toLabel = (name: string): string => name.charAt(0).toUpperCase() + name.slice(1);

export default class FormBuilder {
  readonly template: Template;

  readonly fields: Field[] = [];

  constructor(template: Template) {
    this.template = template;
  }

  input(name: string, options: InputOptions = {}): this {
    if (!Object.hasOwn(this.template, name)) {
      throw new Error(`Field '${name}' does not exist in the template.`);
    }

    const { as = "input", ...attributes } = options;
    const value = String(this.template[name] ?? "");
    const label = toLabel(name);

    if (as === "textarea") {
      this.fields.push({
        type: "textarea",
        name,
        label,
        value,
        attributes: { ...textareaDefaults, ...attributes },
      });
    } else {
      this.fields.push({ type: "input", name, label, value, attributes });
    }

    return this;
  }

  submit(value = "Save", attributes: Attributes = {}): this {
    this.fields.push({ type: "submit", value, attributes });

    return this;
  }
}
