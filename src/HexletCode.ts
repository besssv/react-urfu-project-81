import FormBuilder from "./FormBuilder.ts";
import renderHtml from "./renderers/html.ts";
import type { Template } from "./types.ts";

export interface FormOptions {
  url?: string;
  method?: string;
}

export type FormCallback = (f: FormBuilder) => void;

const formFor = (
  template: Template,
  options: FormOptions = {},
  callback: FormCallback = () => {},
): string => {
  const { url = "#", method = "post" } = options;
  const builder = new FormBuilder(template);

  callback(builder);

  return renderHtml({ attributes: { action: url, method }, fields: builder.fields });
};

export default { formFor };
