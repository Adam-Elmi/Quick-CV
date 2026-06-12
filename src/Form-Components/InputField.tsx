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
  rightElement,
  multiline,
  required
}: InputFieldProps) {
  return (
    <div className="relative w-full group">
      {/* Icon */}
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
        <span className={`${icon} text-[#8b8fa8] text-sm transition-colors duration-200 group-focus-within:text-indigo-400`}></span>
      </div>

      {multiline ? (
        <textarea
          value={input_value}
          onChange={onChange}
          data-id={dataId}
          placeholder=" "
          className={`
            peer
            w-full pl-10 pr-10 pt-5 pb-2
            bg-[#13131A] border rounded-lg
            border-[#2a2a38]
            text-[#c9cbd8] text-sm font-medium
            outline-none
            transition-all duration-200
            placeholder-transparent
            focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30
            hover:border-[#3d3f52]
            min-h-[100px] resize-y
          `}
        />
      ) : (
        <input
          value={input_value}
          onChange={onChange}
          data-id={dataId}
          type={type}
          placeholder=" "
          className={`
            peer
            w-full pl-10 pr-10 pt-5 pb-2
            bg-[#13131A] border rounded-lg
            border-[#2a2a38]
            text-[#c9cbd8] text-sm font-medium
            outline-none
            transition-all duration-200
            placeholder-transparent
            focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30
            hover:border-[#3d3f52]
          `}
        />
      )}

      <label
        className={`
          absolute left-10 top-2 right-3
          truncate
          text-[10px] font-bold uppercase tracking-wider text-[#8b8fa8]
          transition-all duration-200 ease-in-out
          pointer-events-none
          peer-placeholder-shown:text-sm
          peer-placeholder-shown:font-normal
          peer-placeholder-shown:normal-case
          peer-placeholder-shown:tracking-normal
          peer-placeholder-shown:text-[#8b8fa8]
          peer-placeholder-shown:top-3.5
          peer-focus:top-2
          peer-focus:text-[10px]
          peer-focus:font-bold
          peer-focus:uppercase
          peer-focus:tracking-wider
          peer-focus:text-indigo-400
          ${multiline ? 'peer-focus:top-2' : ''}
        `}
      >
        {label}
        {required && <span className="text-rose-400 ml-1 font-bold">*</span>}
      </label>

      {/* Right Element (Optional) */}
      {rightElement && (
        <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
          {rightElement}
        </div>
      )}
    </div>
  );
}
