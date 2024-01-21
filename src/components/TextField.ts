import { TextFieldConfig } from '../models/form-models';

function createTextInput(fieldConfig: TextFieldConfig): HTMLInputElement {
  const input = document.createElement("input") as HTMLInputElement;
  input.type = "text";
  input.id = fieldConfig.id;
  input.type = fieldConfig.type;
  input.value = String(fieldConfig.value) || "";
  input.placeholder = fieldConfig.placeholder || "";
  input.maxLength = fieldConfig.maxLength || 0;
  input.disabled = fieldConfig.disabled || false;
  return input;
}