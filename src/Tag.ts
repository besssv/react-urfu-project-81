export type Attributes = Record<string, string | number | boolean>;

const singleTags = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "source",
  "track",
  "wbr",
]);

export default class Tag {
  readonly name: string;

  readonly attributes: Attributes;

  readonly body: string;

  constructor(name: string, attributes: Attributes = {}, body = "") {
    this.name = name;
    this.attributes = attributes;
    this.body = body;
  }

  isSingle(): boolean {
    return singleTags.has(this.name);
  }

  private buildAttributes(): string {
    const parts = Object.entries(this.attributes)
      .filter(([, value]) => value !== false)
      .map(([key, value]) => (value === true ? key : `${key}="${value}"`));

    return parts.map((part) => ` ${part}`).join("");
  }

  toString(): string {
    const openTag = `<${this.name}${this.buildAttributes()}>`;

    if (this.isSingle()) {
      return openTag;
    }

    return `${openTag}${this.body}</${this.name}>`;
  }
}
