import type InputFieldType from "../types/inputTypes";
interface InputFieldProps extends InputFieldType {
  rightElement?: React.ReactNode;
}
export default function InputField({
  label,
  type,
  placeholder,
  icon,
  dataId,
  onChange,
  input_value,
  rightElement
}: InputFieldProps) {
  return (
    <div className="relative w-full group">
      {}
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
        <span className={`${icon} text-slate-400 text-sm transition-colors duration-200 group-focus-within:text-indigo-500`}></span>
      </div>
      {}
      <input
        value={input_value}
        onChange={onChange}
        data-id={dataId}
        type={type}
        placeholder=" "
        className={`
          peer
          w-full pl-10 pr-10 pt-5 pb-2
          bg-white border rounded-lg
          border-slate-200 
          text-slate-700 text-sm font-medium
          outline-none
          transition-all duration-200
          placeholder-transparent
          focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
          hover:border-slate-300
        `}
      />
      {}
      <label
        className={`
          absolute left-10 top-2
          text-[10px] font-bold uppercase tracking-wider text-slate-400
          transition-all duration-200 ease-in-out
          pointer-events-none
          peer-placeholder-shown:text-sm
          peer-placeholder-shown:font-normal
          peer-placeholder-shown:normal-case
          peer-placeholder-shown:tracking-normal
          peer-placeholder-shown:text-slate-400
          peer-placeholder-shown:top-3.5
          peer-focus:top-2
          peer-focus:text-[10px]
          peer-focus:font-bold
          peer-focus:uppercase
          peer-focus:tracking-wider
          peer-focus:text-indigo-500
        `}
      >
        {label}
      </label>
      {}
      {rightElement && (
        <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
          {rightElement}
        </div>
      )}
    </div>
  );
}
