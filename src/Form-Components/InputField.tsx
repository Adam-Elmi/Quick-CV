import React from "react";
type InputFieldType = {
  label: string;
  type: string;
  is_required: boolean;
  placeholder: string;
  icon: React.ReactNode;
}
export default function InputField({ label, type, is_required, placeholder, icon }: InputFieldType) {
  return (
    <div id="input-field" className="flex flex-col gap-1">
      <label className="text-slate-500 bold flex items-center gap-2">
        <span className={icon + " text-sm text-gray-300"}></span>
        {label}
        {is_required ? <span className="text-red-400">*</span> : null}
      </label>
      <input
        required={is_required}
        type={type}
        className="border border-gray-300 text-blue-700 placeholder:text-gray-400 py-2 px-3 mb-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder={placeholder}
      />
    </div>
  );
}