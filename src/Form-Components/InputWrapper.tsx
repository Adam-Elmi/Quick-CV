import React, { ChangeEvent } from "react";
import { dispatchCVDataChange } from "../Utilities/cvDataStore";
import InputField from "./InputField";
import type InputFieldType from "../types/inputTypes";

interface InputWrapperProps extends InputFieldType {
  className?: string;
}

export default function InputWrapper({
  label,
  type,
  placeholder,
  icon,
  dataId,
  className,
}: InputWrapperProps) {
  const inputValue = (() => {
    const item = localStorage.getItem(dataId);
    if (!item) return "";
    try {
      const parsed = JSON.parse(item);
      if (parsed && typeof parsed === 'object' && 'value' in parsed) {
        return parsed.value || "";
      }
      return String(parsed);
    } catch (e) {
      console.error(e);
      return item;
    }
  })();

  const updateValue = (newValue: string) => {
    localStorage.setItem(dataId, newValue);
    dispatchCVDataChange();
  };

  return (
    <div className={`w-full max-w-[400px] ${className || ""}`}>
      <InputField
        {...{ label, type, placeholder, icon, dataId }}
        input_value={inputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          updateValue(e.target.value);
        }}
      />
    </div>
  );
}
