import React, { ChangeEvent, useState } from "react";
import { dispatchCVDataChange } from "../Utilities/cvDataStore";
import InputField from "./InputField";
import type InputFieldType from "../types/inputTypes";
import {
  SvgFont,
  SvgFontSize,
  SvgFontColor,
  SvgFormInput,
  SvgFontSyle,
} from "../Svg-Components/Svg";
const fonts = ["Helvetica", "Times-Roman", "Courier", "Roboto"];
const presetColors = [
  "#000000", "#ffffff", "#ef4444", "#f97316", "#f59e0b", "#84cc16", "#10b981",
  "#06b6d4", "#3b82f6", "#6366f1", "#8b5cf6", "#d946ef", "#f43f5e"
];
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
  const [isVisible, setIsVisible] = useState(false);
  const [color, setColor] = useState("#000000");
  const [selectedFont, setSelectedFont] = useState("Helvetica");
  const [fontSize, setFontSize] = useState("16");
  const [inputValues, setInputValues] = useState(() => {
    const values = localStorage.getItem(dataId);
    return values ? JSON.parse(values) : {
      value: "",
      color: "#000000",
      font: "Helvetica",
      size: "16"
    };
  });
  const updateState = (newValues: any) => {
    setInputValues(newValues);
    localStorage.setItem(dataId, JSON.stringify(newValues));
    dispatchCVDataChange();
  };
  const handleFontChange = (font: string) => {
    setSelectedFont(font);
    updateState({ ...inputValues, font });
  };
  const handleSizeChange = (size: string) => {
    setFontSize(size);
    updateState({ ...inputValues, size });
  };
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    updateState({ ...inputValues, color: newColor });
  };
  return (
    <>
      <div className={`w-full max-w-[400px] ${className || ""}`}>
        <InputField
          {...{ label, type, placeholder, icon, dataId }}
          input_value={inputValues.value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            updateState({ ...inputValues, value: e.target.value });
          }}
          rightElement={
            <button
              type="button"
              onClick={() => setIsVisible(true)}
              className="p-1.5 rounded-full text-slate-300 hover:text-indigo-500 hover:bg-indigo-50 transition-all duration-200"
              title="Customize Field"
            >
              <SvgFontSyle className="w-5 h-5" />
            </button>
          }
        />
      </div>
      {}
      {isVisible && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200 p-4"
          onClick={() => setIsVisible(false)}
        >
          {}
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col max-h-[90vh]"
          >
            {}
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-white z-10">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Design Field</h3>
                <div className="flex items-center gap-2 text-slate-400 text-xs mt-1">
                  <SvgFormInput />
                  <span className="font-mono text-[10px] uppercase tracking-wider">{dataId}</span>
                </div>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto p-6 space-y-8">
              {}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Live Preview</label>
                <div
                  className="w-full h-24 rounded-xl border border-slate-200 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-slate-50 flex items-center justify-center overflow-hidden relative shadow-inner"
                >
                  <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
                  <span
                    style={{
                      fontFamily: selectedFont,
                      fontSize: `${fontSize}px`,
                      color: color
                    }}
                    className="relative z-10 transition-all duration-300 max-w-full px-4 text-center truncate"
                  >
                    {inputValues.value || "Sample Text"}
                  </span>
                </div>
              </div>
              {}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <SvgFont /> Typeface
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {fonts.map((font) => (
                    <button
                      key={font}
                      type="button"
                      onClick={() => handleFontChange(font)}
                      style={{ fontFamily: font }}
                      className={`
                        h-12 flex items-center justify-center rounded-lg text-lg border transition-all duration-200
                        ${selectedFont === font
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-600 ring-1 ring-indigo-500 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm'
                        }
                      `}
                    >
                      {font}
                    </button>
                  ))}
                </div>
              </div>
              {}
              <div className="space-y-6">
                {}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <SvgFontSize /> Size
                    </label>
                    <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{fontSize}px</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="10"
                      max="72"
                      value={fontSize}
                      onChange={(e) => handleSizeChange(e.target.value)}
                      className="flex-1 val-indigo-500 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                    <input
                      type="number"
                      value={fontSize}
                      onChange={(e) => handleSizeChange(e.target.value)}
                      className="w-16 pl-2 pr-1 py-1 bg-white border border-slate-200 rounded-md text-sm text-center focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>
                {}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <SvgFontColor /> Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="w-6 h-6 rounded border-none p-0 bg-transparent cursor-pointer"
                      />
                      <span className="text-xs font-mono text-slate-500 uppercase">{color}</span>
                    </div>
                  </div>
                  {}
                  <div className="flex flex-wrap gap-2">
                    {presetColors.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => handleColorChange(c)}
                        className={`w-6 h-6 rounded-full border border-slate-200 shadow-sm transition-transform hover:scale-110 focus:ring-2 focus:ring-offset-1 focus:ring-slate-400 ${color === c ? 'scale-110 ring-2 ring-offset-1 ring-indigo-500' : ''}`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div >
            {}
            < div className="px-6 py-4 border-t border-slate-100 flex justify-between bg-slate-50/50" >
              <button
                type="button"
                onClick={() => {
                  setColor("#000000");
                  setSelectedFont("Roboto");
                  setFontSize("16");
                  updateState({ ...inputValues, color: "#000000", font: "Roboto", size: "16" });
                }}
                className="text-xs text-slate-400 hover:text-red-500 transition-colors font-semibold uppercase tracking-wider"
              >
                Reset
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-md shadow-indigo-200 transition-all hover:shadow-lg active:scale-95"
              >
                Done
              </button>
            </div >
          </div >
        </div >
      )
      }
    </>
  );
}
