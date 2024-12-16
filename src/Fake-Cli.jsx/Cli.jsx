import { useState } from "react";
import SvgBook from "../Svg-Components/Svg-Book";

export default function Cli() {
  return (
    <div className="w-full h-full min-h-screen p-4 bg-slate-950 flex justify-center items-center">
      <div className="flex flex-col border-2 shadow-lg w-[900px]">
        <CliHeader />
        <CliBody />
      </div>
    </div>
  );
}

function CliHeader() {
  return (
    <div className="w-full bg-slate-50 p-2 min-h[30px] overflow-hidden flex justify-between items-center">
      <h1 className="font-mono mobile:text-[0.85rem] small-mobile:text-[0.7rem]">
        C:Machine/SystemX/fake-cli.exe
      </h1>
      <SvgBook />
    </div>
  );
}

function CliBody() {
    const handleKey = (e) => {
        if (e.key === "Enter") {
          e.preventDefault(); // Stops the default behavior
          console.log("Enter key is pressed, but default action is prevented!");
        }
      };
      
  return (
    <div className="flex-1 bg-[#0d1e41] h-full min-h-[500px] text-white p-2 px-3">
      <div className="flex gap-4">
        <p className="font-mono text-yellow-500 mobile:text-[0.85rem] small-mobile:text-[0.7rem]">
          C:\Users\You\Quick-CV
        </p>
        <div
          onKeyDown={handleKey}
          contentEditable={true}
          spellCheck={false}
          className="font-mono text-slate-400 mobile:text-[0.85rem] small-mobile:text-[0.7rem] border-none outline-none bg-transparent overflow-hidden flex-1"
        ></div>
      </div>
    </div>
  );
}
