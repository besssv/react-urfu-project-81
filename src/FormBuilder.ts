import type { Attributes } from "./Tag.ts";
import type { Field, Template } from "./types.ts";

type AttributeValue = Attributes[string];

export interface InputOptions {
  as?: "input" | "textarea";
  label?: string;
  labelHtml?: Attributes;
  [attribute: string]: AttributeValue | Attributes | undefined;
}

const toLabelText = (name: string): string => name.charAt(0).toUpperCase() + name.slice(1);

export default class FormBuilder {
  readonly template: Template;

  #fields: readonly Field[] = [];

  constructor(template: Template) {
    this.template = template;
  }

  get fields(): Field[] {
    return [...this.#fields];
  }

  input(name: string, options: InputOptions = {}): this {
    if (!Object.hasOwn(this.template, name)) {
      throw new Error(`Field '${name}' does not exist in the template.`);
    }

    const { as = "input", label = toLabelText(name), labelHtml = {}, ...rest } = options;
    const attributes = rest as Attributes;
    const common = {
      name,
      label: { text: label, attributes: labelHtml },
      value: String(this.template[name] ?? ""),
    };

    const field: Field =
      as === "textarea"
        ? { type: "textarea", ...common, attributes }
        : { type: "input", ...common, attributes };

    return this.#add(field);
  }

  submit(value = "Save", attributes: Attributes = {}): this {
    return this.#add({ type: "submit", value, attributes });
  }

  #add(field: Field): this {
    this.#fields = [...this.#fields, field];

    return this;
  }
}
