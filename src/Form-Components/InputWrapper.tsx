import React, { useState, useEffect } from "react";
import { dispatchCVDataChange, CV_DATA_CHANGE_EVENT } from "../Utilities/cvDataStore";
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
  multiline,
  required
}: InputWrapperProps) {
  const getStoredValue = () => {
    const item = localStorage.getItem(dataId);
    if (!item) return "";
    try {
      const parsed = JSON.parse(item);
      if (parsed && typeof parsed === 'object' && 'value' in parsed) {
        return parsed.value || "";
      }
      return String(parsed);
    } catch (e) {
      return item;
    }
  };

  const [value, setValue] = useState(getStoredValue);

  // Sync from localStorage if it changes externally (e.g. Load Sample)
  useEffect(() => {
    const handleSync = () => {
      const newValue = getStoredValue();
      if (newValue !== value) {
        setValue(newValue);
      }
    };
    window.addEventListener(CV_DATA_CHANGE_EVENT, handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener(CV_DATA_CHANGE_EVENT, handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, [value, dataId]);

  // Immediate sync TO localStorage
  const handleUpdate = (newValue: string) => {
    setValue(newValue);
    localStorage.setItem(dataId, newValue);
    dispatchCVDataChange();
  };

  return (
    <div className={`w-full max-w-[400px] ${className || ""}`}>
      <InputField
        {...{ label, type, placeholder, icon, dataId, multiline, required }}
        input_value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          handleUpdate(e.target.value);
        }}
      />
    </div>
  );
}
