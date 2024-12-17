import { useState, useEffect } from "react";
import SvgBook from "../Svg-Components/Svg-Book";
import SvgPlay from "../Svg-Components/Svg-Play";
import { commands } from "./commands";

export default function Terminal() {
  return (
    <div className="w-full h-full min-h-screen p-4 bg-slate-950 flex justify-center items-center">
      <div className="flex flex-col border-2 shadow-lg w-[900px]">
        <TerminalHead />
        <TerminalBody />
      </div>
    </div>
  );
}

function TerminalHead() {
  return (
    <div className="w-full bg-slate-50 p-2 min-h[30px] overflow-hidden flex justify-between items-center">
      <h1 className="font-mono mobile:text-[0.85rem] small-mobile:text-[0.7rem]">
        C:Machine/SystemX/fake-cli.exe
      </h1>
      <div className="flex gap-2">
        <SvgBook />
        <SvgPlay />
      </div>
    </div>
  );
}

function TerminalBody() {
  return (
    <div
      id="terminal-body"
      className="flex-1 bg-[#0d1e41] h-full min-h-[500px] max-h-[700px] overflow-auto text-white p-2 px-3"
    >
      <TerminalInput />
    </div>
  );
}

function TerminalInput() {  
  useEffect(() => {
    // Terminal Body
    const terminalBody = document.getElementById("terminal-body");

    const handleKey = (e) => {
      // When "Enter Key is pressed"
      if (e.key === "Enter") {
        // New User Input
        const input = document.createElement("input");
        input.id = "user-input";
        input.type = "text";
        input.className =
          "font-mono block text-slate-400 mobile:text-[0.85rem] small-mobile:text-[0.55rem] border-none outline-none bg-transparent overflow-hidden flex-1 w-full";

        // Valid Text
        const validText = document.createElement("pre");
        validText.className = "text-green-400 leading-8 p-0 m-0 mobile:text-[0.85rem] small-mobile:text-[0.55rem]";

        // Invalid Text
        const invalidText = document.createElement("pre");
        invalidText.className = "text-red-400 leading-6 mobile:text-[0.85rem] small-mobile:text-[0.55rem]";
        invalidText.textContent =
          "Command not found: The command you entered is invalid. Type 'help' for a list of valid options.";

        // Absolute Path (Fake)
        const absolutePath = document.createElement("p");
        absolutePath.className =
          "font-mono text-yellow-500 mobile:text-[0.85rem] small-mobile:text-[0.55rem]";
        absolutePath.textContent = "C:\\Users\\You\\Quick-CV";

        let isCommandFound = false;

        for (let i = 0; i < commands.length; i++) {
          if(e.target.value.trim() === "") {
            return;
          }
          if (commands[i].command === e.target.value.trim()) {
            let result;

            if(commands[i].action.length >= 1) {
              result = commands[i].action(e);
            } else {
              result = commands[i].action()
            }
            
            if(typeof result === "string"){
              validText.innerHTML = result.replace(/\n/g, "<br>");;
              terminalBody.append(validText, absolutePath, input);
            }
            else {
              terminalBody.append(absolutePath, input);
            }
            isCommandFound = true;
            break;
          }
        };

        if(!isCommandFound) {
          terminalBody.append(invalidText, absolutePath, input);
        }

        e.target.style.display = "none";
        input.focus();
        const handleBlur = (e) => {
          setTimeout(() => {
            e.target.focus();
          }, 0);
        };
        input.addEventListener("blur", handleBlur);
      }
    };

    terminalBody.addEventListener("keydown", handleKey);
    return () => {
      terminalBody.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <p className="font-mono text-yellow-500 mobile:text-[0.85rem] small-mobile:text-[0.55rem]">
        C:\Users\You\Quick-CV
      </p>
      <input
        id="user-input"
        type="text"
        className="font-mono text-slate-400 mobile:text-[0.85rem] small-mobile:text-[0.55rem] border-none outline-none bg-transparent overflow-hidden flex-1"
      />
    </div>
  );
}
