interface BaseFieldConfig {
  type: string;
  label: string;
  id: string;
  value?: string | number | boolean;
  disabled?: boolean;
  events?: Record<string, (event: Event) => void>;
  required?: boolean;
  placeholder?: string;
  rowIndex: number;
  columnIndex: number;
}

export interface TextFieldConfig extends BaseFieldConfig {
  type: "text";
  maxLength?: number;
}

export interface NumberFieldConfig extends BaseFieldConfig {
  type: "number";
  min?: number;
  max?: number;
  step?: number;
  maxLength?: number;
}

export interface DateFieldConfig extends BaseFieldConfig {
  type: "date" | "datetime-local";
  min?: string;
  max?: string;
}

export interface SelectFieldConfig extends BaseFieldConfig {
  type: "select";
  options: string[];
}

export interface TextareaFieldConfig extends BaseFieldConfig {
  type: "textarea";
  rows?: number;
  cols?: number;
}

export interface LookupFieldConfig extends BaseFieldConfig {
  type: "lookup";
  onLookupClick: (id: string) => void;
}

export type FormFieldConfig =
  | TextFieldConfig
  | NumberFieldConfig
  | DateFieldConfig
  | SelectFieldConfig
  | TextareaFieldConfig
  | LookupFieldConfig;

export interface FormConfig {
  rows: number;
  columns: number;
  fields: FormFieldConfig[];
}
