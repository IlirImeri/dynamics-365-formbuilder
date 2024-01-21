import { NumberFieldConfig } from './../models/form-models';

function createNumberField(NumberFieldConfig: NumberFieldConfig): HTMLInputElement {
  const input = document.createElement("input") as HTMLInputElement;
  input.id = NumberFieldConfig.id;
  input.type = NumberFieldConfig.type;
  input.value = String(NumberFieldConfig.value) || "";
  input.min = NumberFieldConfig.min || "";
  input.max = NumberFieldConfig.max || "";
  input.step = NumberFieldConfig.step || 1;
  input.placeholder = NumberFieldConfig.placeholder || "";
  input.maxLength = NumberFieldConfig.maxLength || "";
  input.disabled = NumberFieldConfig.disabled || false;
}