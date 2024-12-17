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
        <SvgPlay />
        <SvgBook />
      </div>
    </div>
  );
}

function TerminalBody() {
  return (
    <div
      id="terminal-body"
      className="flex-1 bg-[#0d1e41] h-full min-h-[500px] text-white p-2 px-3"
    >
      <TerminalInput />
    </div>
  );
}

function TerminalInput() {
  useEffect(() => {
    const userInput = document.getElementById("user-input");

    userInput.focus();

    const handleBlur = () => {
      setTimeout(() => {
        if (document.activeElement !== userInput) {
          userInput.focus(); // Keep caret in input
        }
      }, 0);
    };
    userInput.addEventListener("blur", handleBlur);

    return () => {
      userInput.removeEventListener("blur", handleBlur);
    };
  }, []);

  useEffect(() => {
    const userInput = document.getElementById("user-input");
    const handleKey = (e) => {
      if (e.key === "Enter") {
        const input = document.createElement("input");
        input.id = "user-input";
        input.type = "text";
        input.className =
          "font-mono block text-slate-400 mobile:text-[0.85rem] small-mobile:text-[0.55rem] border-none outline-none bg-transparent overflow-hidden flex-1";
        // Valid Text
        const validText = document.createElement("pre");
        validText.className = "text-green-400 leading-8 p-0 m-0";
        // Invalid Text
        const invalidText = document.createElement("pre");
        invalidText.className = "text-red-400 leading-8";
        invalidText.textContent =
          "Invalid Command: The command you entered is not found.";
        // Absolute Path (Fake)
        const absolutePath = document.createElement("p");
        absolutePath.className =
          "font-mono text-yellow-500 mobile:text-[0.85rem] small-mobile:text-[0.55rem]";
        absolutePath.textContent = "C:\\Users\\You\\Quick-CV";

        Object.values(commands).forEach((c) => {
          if (c.command === userInput.value.trim()) {
            validText.innerHTML = c.text.replace(/\n/g, "<br>");
            terminalBody.append(validText, absolutePath, input);
          } else {
            terminalBody.append(invalidText, absolutePath, input);
          }
        });
        console.log(userInput.value.trim());
        
        const allInputs = document.querySelectorAll("#user-input");

        try {
          if (allInputs) {
            allInputs.forEach((input) => {
              input.disabled = true;
              input.style.display = "none";
            });
            allInputs[allInputs.length - 1].disabled = false;
            allInputs[allInputs.length - 1].style.display = "block";
          }
        } catch (error) {
          console.error(`Something wrong was happend: ${error}`);
        }
      }
    };

    const terminalBody = document.getElementById("terminal-body");
    if (userInput) {
      userInput.addEventListener("keydown", handleKey);
    }
    return () => {
      if (userInput) {
        userInput.removeEventListener("keydown", handleKey);
      }
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
