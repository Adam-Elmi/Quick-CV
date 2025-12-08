import React from "react";

type InputFieldType = {
  label: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  dataId: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => unknown
  input_value?: string;
}
export default InputFieldType;