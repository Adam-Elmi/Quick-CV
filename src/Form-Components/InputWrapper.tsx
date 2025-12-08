import React, { ChangeEvent, useState } from "react";
import InputField from "./InputField";
import type InputFieldType from "../types/inputTypes";
import {
  SvgFont,
  SvgFontSize,
  SvgFontColor,
  SvgFontSyle,
  SvgDownArrow,
  SvgSelectPoint,
  SvgFormInput,
} from "../Svg-Components/Svg";
const fonts = ["Roboto", "Monospace", "Jetbrain", "Paul"];
// localStorage.clear()
export default function InputWrapper({
  label,
  type,
  placeholder,
  icon,
  dataId,
}: InputFieldType) {
  const [isVisible, setIsVisible] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [selectedFont, setSelectedFont] = useState("Select a font");
  const [inputValues, setInputValues] = useState(() => {
    const values = localStorage.getItem(dataId);
    return values ? JSON.parse(values) : {
      value : "",
      color,
      font : selectedFont
    }
  });
  const browser = navigator.userAgent;
  return (
    <>
      <div className="border-[1.5px] border-slate-300 p-2 rounded-lg w-full max-w-[400px]">
        <InputField
          {...{ label, type, placeholder, icon, dataId }} input_value={inputValues.value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputValues({ ...inputValues, value: e.target.value });
            localStorage.setItem(
              dataId,
              JSON.stringify({ ...inputValues, value: e.target.value }),
            );
          }}
        />
        <button
          type="button"
          onClick={() => setIsVisible((prev) => !prev)}
          className="flex gap-2 flex-wrap cursor-pointer hover:text-indigo-400"
        >
          <SvgFontSyle />
          Font Style
        </button>
      </div>
      <div
        onClick={() => {
          setIsVisible(false);
        }}
        className={`${isVisible ? "flex" : "hidden"} fixed top-0 bottom-0 left-0 right-0 bg-slate-900/70 w-full h-screen justify-center items-center`}
      >
        <div onClick={(e) => e.stopPropagation()} className="w-fit">
          <FontStyles
            {...{
              browser,
              color,
              setColor,
              dataId,
              selectedFont,
              setSelectedFont,
              inputValues,
              setInputValues
            }}
          />
        </div>
      </div>
    </>
  );
}

function FontStyles({
  browser,
  color,
  setColor,
  dataId,
  selectedFont,
  setSelectedFont,
  inputValues,
  setInputValues
}: {
  browser: string;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  dataId: string;
    selectedFont: string;
    setSelectedFont: React.Dispatch<React.SetStateAction<string>>;
  inputValues: object,
  setInputValues:React.Dispatch<React.SetStateAction<object>>
}) {
  const [showFonts, setShowFonts] = useState(false);
  return (
    <div className="flex gap-2 flex-col bg-white w-[300px] p-2 rounded-md">
      {/* Current Input */}
      <span className="text-slate-500 italic flex gap-2 text-sm items-center">
        <SvgFormInput />
        Input: {dataId}
      </span>
      {/* Fonts */}
      <div className="flex flex-col border-[1.5px] border-slate-200 p-2 bg-white">
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setShowFonts((prev) => !prev)}
            className="cursor-pointer flex gap-2 items-center border-[1.5px] border-slate-200 w-fit rounded px-2"
          >
            <SvgFont />
            <span className="text-blue-500">{selectedFont}</span>
            <SvgDownArrow
              width={18}
              height={18}
              className={`text-blue-300 ${showFonts ? "rotate-180" : "rotate-360"}`}
            />
          </button>
          <button
            type="button"
            className="text-pink-400 flex gap-2 items-center text-sm cursor-pointer"
          >
            Reset
          </button>
        </div>
        <ul
          className={`flex flex-col overflow-hidden gap-2 ${
            showFonts ? "border-[1.5px] border-slate-100 p-2 h-fit" : "h-0"
          }`}
        >
          {fonts.map((font, id) => (
            <li
              key={id}
              className={`cursor-pointer ${id < fonts.length - 1 ? "border-b-[1.5px] border-slate-200" : ""}`}
            >
              <button
                type="button"
                className="flex gap-2 items-center cursor-pointer hover:text-blue-400/90 duration-75 w-full"
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  const font = (e.target as HTMLElement).innerText;
                  setInputValues({ ...inputValues, font });
                  setSelectedFont(font);
                  localStorage.setItem(
                    dataId,
                    JSON.stringify({
                      ...inputValues,
                      font,
                    }),
                  );
                }}
              >
                <SvgSelectPoint width={16} height={16} />
                {font}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Fonts Size */}
      <div className="flex flex-col border-[1.5px] border-slate-200 p-2 bg-white overflow-hidden">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center border-[1.5px] border-slate-200 w-fit rounded px-2">
            <SvgFontSize />
            <span className="text-blue-500">Font Size:</span>
            <input
              id="font-size"
              type="text"
              className={`w-15 h-5 outline-none border border-slate-200 p-1`}
            />
            <span className="italic text-slate-400">px</span>
          </div>
          <button
            type="button"
            className="text-pink-400 flex gap-2 items-center text-sm cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
      {/* Font Color */}
      <div className="flex justify-between items-center border-[1.5px] border-slate-200 p-2">
        <div
          title="Font Color"
          className="flex gap-2 items-center border-[1.5px] border-slate-200 w-fit rounded px-2 bg-white"
        >
          <label htmlFor="color-picker" className="flex gap-2 cursor-pointer">
            <SvgFontColor />
            <span className="text-blue-500">Choose a font color:</span>
          </label>
          <input
            id="color-picker"
            type="color"
            value={color}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setInputValues({ ...inputValues, color: e.target.value });
              setColor(e.target.value)
              localStorage.setItem(
                dataId,
                JSON.stringify({
                  ...inputValues,
                  color: e.target.value,
                }),
              );
            }
              
            }
            className={`outline-none ${browser.includes("Firefox") ? "w-3.5 h-3.5" : "w-4 h-5"}`}
          />
        </div>
        <button
          type="button"
          className="text-pink-400 flex gap-2 items-center text-sm cursor-pointer"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
