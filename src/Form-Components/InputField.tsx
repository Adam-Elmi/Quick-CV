import type InputFieldType from "../types/inputTypes";
export default function InputField({
  label,
  type,
  placeholder,
  icon,
  dataId,
  onChange,
  input_value
}: InputFieldType) {
  return (
    <div id="input-field" className="flex flex-col gap-1">
      <label className="text-slate-500 bold flex items-center gap-2  max-w-full">
        <span className={icon + " text-sm text-gray-300"}></span>
        {label}
      </label>
      <input
      value={input_value}
        onChange={onChange}
        data-id={dataId}
        type={type}
        className="border border-gray-300 text-blue-700 placeholder:text-gray-400 py-2 px-3 mb-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder={placeholder}
      />
    </div>
  );
}
