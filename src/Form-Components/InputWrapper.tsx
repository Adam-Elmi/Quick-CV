import React, { useState, useEffect, useRef } from "react";
import { HexColorPicker } from "react-colorful";
import { FieldStyle, dispatchCVDataChange, CV_DATA_CHANGE_EVENT } from "../Utilities/cvDataStore";
import InputField from "./InputField";
import type InputFieldType from "../types/inputTypes";

interface InputWrapperProps extends InputFieldType {
  className?: string;
}

export default function InputWrapper({
  label, type, placeholder, icon, dataId, className, multiline, required
}: InputWrapperProps) {
  const getStoredValue = () => {
    const item = localStorage.getItem(dataId);
    if (!item) return "";
    try {
      const parsed = JSON.parse(item);
      if (parsed && typeof parsed === "object" && "value" in parsed) return parsed.value || "";
      return String(parsed);
    } catch { return item; }
  };

  const getStoredStyle = (): FieldStyle => {
    try {
      const item = localStorage.getItem(`${dataId}_style`);
      return item ? JSON.parse(item) : {};
    } catch { return {}; }
  };

  const [value, setValue] = useState(getStoredValue);
  const [fieldStyle, setFieldStyle] = useState<FieldStyle>(getStoredStyle);
  const [isFocused, setIsFocused] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const colorBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!showColorPicker) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !colorPickerRef.current?.contains(target) &&
        !colorBtnRef.current?.contains(target)
      ) {
        setShowColorPicker(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showColorPicker]);

  useEffect(() => {
    const handleSync = () => {
      const newVal = getStoredValue();
      if (newVal !== value) setValue(newVal);
      setFieldStyle(getStoredStyle());
    };
    window.addEventListener(CV_DATA_CHANGE_EVENT, handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener(CV_DATA_CHANGE_EVENT, handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, [value, dataId]);

const handleUpdate = (newValue: string) => {
    setValue(newValue);
    localStorage.setItem(dataId, newValue);
    dispatchCVDataChange();
  };

  const saveStyle = (newStyle: FieldStyle) => {
    setFieldStyle(newStyle);
    const hasStyle = newStyle.bold || newStyle.italic || newStyle.color || newStyle.fontSize;
    if (hasStyle) {
      localStorage.setItem(`${dataId}_style`, JSON.stringify(newStyle));
    } else {
      localStorage.removeItem(`${dataId}_style`);
    }
    dispatchCVDataChange();
  };

  const hasStyle = fieldStyle.bold || fieldStyle.italic || fieldStyle.color || fieldStyle.fontSize;

  return (
    <div
      className={`w-full max-w-[400px] ${className || ""}`}
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsFocused(false);
      }}
    >
      <InputField
        {...{ label, type, placeholder, icon, dataId, multiline, required }}
        input_value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleUpdate(e.target.value)}
      />

      {isFocused && (
        <div className="mt-2 px-0.5">
          <p className="text-[10px] text-[#4a4c5e] uppercase tracking-widest mb-1.5 select-none">
            Style this text in the CV
          </p>
          <div className="flex items-center gap-1.5 flex-wrap">

            {/* Bold */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => saveStyle({ ...fieldStyle, bold: !fieldStyle.bold })}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition-colors border ${
                fieldStyle.bold
                  ? "bg-indigo-600/30 text-indigo-300 border-indigo-500/40"
                  : "text-[#8b8fa8] border-[#2a2a38] hover:text-white hover:border-[#3a3a4a] hover:bg-white/5"
              }`}
            >
              <i className="fa-solid fa-bold text-[10px]" />
              <span className="font-bold">Bold</span>
            </button>

            {/* Italic */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => saveStyle({ ...fieldStyle, italic: !fieldStyle.italic })}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition-colors border ${
                fieldStyle.italic
                  ? "bg-indigo-600/30 text-indigo-300 border-indigo-500/40"
                  : "text-[#8b8fa8] border-[#2a2a38] hover:text-white hover:border-[#3a3a4a] hover:bg-white/5"
              }`}
            >
              <i className="fa-solid fa-italic text-[10px]" />
              <span className="italic">Italic</span>
            </button>

            {/* Color */}
            <div className="relative">
              <button
                ref={colorBtnRef}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setShowColorPicker(v => !v)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition-colors border ${
                  showColorPicker || fieldStyle.color
                    ? "bg-indigo-600/30 text-indigo-300 border-indigo-500/40"
                    : "text-[#8b8fa8] border-[#2a2a38] hover:text-white hover:border-[#3a3a4a] hover:bg-white/5"
                }`}
              >
                <i className="fa-solid fa-palette text-[10px]" />
                <span>Text color</span>
                <span
                  className="w-3 h-3 rounded-full border border-white/20 ml-0.5"
                  style={{ backgroundColor: fieldStyle.color || "#8b8fa8" }}
                />
              </button>
              {showColorPicker && (
                <div
                  ref={colorPickerRef}
                  className="absolute left-0 top-full mt-1 z-50 shadow-2xl rounded-lg overflow-hidden border border-[#2a2a38]"
                >
                  <HexColorPicker
                    color={fieldStyle.color || "#c9cbd8"}
                    onChange={(color) => saveStyle({ ...fieldStyle, color })}
                  />
                </div>
              )}
            </div>

            {/* Clear */}
            {hasStyle && (
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => { saveStyle({}); setShowColorPicker(false); }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium border border-[#2a2a38] text-[#5a5c70] hover:text-rose-400 hover:border-rose-500/30 transition-colors"
              >
                <i className="fa-solid fa-xmark text-[10px]" />
                <span>Clear style</span>
              </button>
            )}
          </div>

          {/* Font size */}
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[10px] text-[#4a4c5e] uppercase tracking-widest select-none">Size</span>
            <div className="flex items-center bg-[#0f0f17] border border-[#2a2a38] rounded overflow-hidden focus-within:border-indigo-500/60 transition-colors">
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  const cur = fieldStyle.fontSize ? parseInt(fieldStyle.fontSize) : 11;
                  saveStyle({ ...fieldStyle, fontSize: `${Math.max(6, cur - 1)}pt` });
                }}
                className="px-2 py-1 text-[#8b8fa8] hover:text-white hover:bg-white/10 transition-colors select-none text-sm leading-none"
              >
                −
              </button>
              <input
                type="text"
                inputMode="numeric"
                maxLength={2}
                value={fieldStyle.fontSize ? parseInt(fieldStyle.fontSize) : ""}
onMouseDown={(e) => e.stopPropagation()}
                onWheel={(e) => e.currentTarget.blur()}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  if (!raw) {
                    saveStyle({ ...fieldStyle, fontSize: undefined });
                  } else {
                    const n = Math.max(6, Math.min(96, parseInt(raw)));
                    saveStyle({ ...fieldStyle, fontSize: `${n}pt` });
                  }
                }}
                className="w-8 bg-transparent text-center text-xs text-[#c9cbd8] outline-none border-x border-[#2a2a38] py-1"
              />
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  const cur = fieldStyle.fontSize ? parseInt(fieldStyle.fontSize) : 11;
                  saveStyle({ ...fieldStyle, fontSize: `${Math.min(96, cur + 1)}pt` });
                }}
                className="px-2 py-1 text-[#8b8fa8] hover:text-white hover:bg-white/10 transition-colors select-none text-sm leading-none"
              >
                +
              </button>
            </div>
            <span className="text-[10px] text-[#4a4c5e]">pt</span>
          </div>
        </div>
      )}
    </div>
  );
}
