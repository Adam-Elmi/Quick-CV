import React from "react";

type InputFieldType = {
  label: string;
  type: string;
  placeholder: string;
  icon: string;
  dataId: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => unknown
  input_value?: string;
  multiline?: boolean;
  required?: boolean;
}
export default InputFieldType;