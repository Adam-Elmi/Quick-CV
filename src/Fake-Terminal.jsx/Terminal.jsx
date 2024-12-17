import { useState, useEffect, useRef } from "react";
import SvgBook from "../Svg-Components/Svg-Book";
import SvgPlay from "../Svg-Components/Svg-Play";

export default function Terminal() {
  return (
    <div className="w-full h-full min-h-screen p-4 bg-slate-950 flex justify-center items-center">
      <div className="flex flex-col border-2 shadow-lg w-[900px]">
        <CliHeader />
        <CliBody />
      </div>
    </div>
  );
}

function TerminalHeader() {
  return (
    <div className="w-full bg-slate-50 p-2 min-h[30px] overflow-hidden flex justify-between items-center">
      <h1 className="font-mono mobile:text-[0.85rem] small-mobile:text-[0.7rem]">
        C:Machine/SystemX/fake-cli.exe
      </h1>
      <div className="flex gap-2">
        <SvgPlay />
        <SvgBook />
      </div>
    </div>
  );
}

function TerminalBody() {
  return (
    <div className="flex-1 bg-[#0d1e41] h-full min-h-[500px] text-white p-2 px-3">
      <CliInput />
    </div>
  );
}

function CliInput() {
  const userInputRef = useRef(null);

  useEffect(() => {
    const userInput = userInputRef.current;

    userInput.focus();

    const handleBlur = () => {
      setTimeout(() => {
        if (document.activeElement !== userInput) {
          userInput.focus(); // Keep caret in input
        }
      }, 0);
    };

    // Add the blur event listener
    userInput.addEventListener("blur", handleBlur);

    // Cleanup on unmount
    return () => {
      userInput.removeEventListener("blur", handleBlur);
    };
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <p className="font-mono text-yellow-500 mobile:text-[0.85rem] small-mobile:text-[0.55rem]">
        C:\Users\You\Quick-CV
      </p>
      <input
        ref={userInputRef}
        id="user-input"
        type="text"
        className="font-mono text-slate-400 mobile:text-[0.85rem] small-mobile:text-[0.55rem] border-none outline-none bg-transparent overflow-hidden flex-1"
      />
    </div>
  );
}
