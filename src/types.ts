import type { Attributes } from "./Tag.ts";

export type Template = Record<string, unknown>;

export interface Label {
  text: string;
  attributes: Attributes;
}

export interface InputField {
  type: "input";
  name: string;
  label: Label;
  value: string;
  attributes: Attributes;
}

export interface TextareaField {
  type: "textarea";
  name: string;
  label: Label;
  value: string;
  attributes: Attributes;
}

export interface SubmitField {
  type: "submit";
  value: string;
  attributes: Attributes;
}

export type Field = InputField | TextareaField | SubmitField;

export interface FormState {
  attributes: Attributes;
  fields: Field[];
}
