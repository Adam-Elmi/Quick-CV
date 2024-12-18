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
      className="flex-1 bg-[#0d1e41] h-full min-h-[500px] max-h-[700px] overflow-auto text-white p-2 px-3"
    >
      <TerminalInput />
    </div>
  );
}

function TerminalInput() {
  function createInput() {
    // New User Input
    const input = document.createElement("input");
    input.id = "user-input";
    input.type = "text";
    input.className =
      "font-mono block text-slate-400 mobile:text-[0.85rem] small-mobile:text-[0.55rem] border-none outline-none bg-transparent overflow-hidden flex-1 w-full";
    return input;
  }

  function createValidText() {
    // Valid Text
    const validText = document.createElement("pre");
    validText.className =
      "text-green-400 leading-8 p-0 m-0 mobile:text-[0.85rem] small-mobile:text-[0.55rem]";
    return validText;
  }

  function createInvalidText() {
    // Invalid Text
    const invalidText = document.createElement("pre");
    invalidText.className =
      "text-red-400 leading-6 mobile:text-[0.85rem] small-mobile:text-[0.55rem]";
    invalidText.textContent =
      "Command not found: The command you entered is invalid. Type 'help' for a list of valid options.";
    return invalidText;
  }

  function createAbsolutePath() {
    // Absolute Path (Fake)
    const absolutePath = document.createElement("p");
    absolutePath.className =
      "font-mono text-yellow-500 mobile:text-[0.85rem] small-mobile:text-[0.55rem]";
    absolutePath.textContent = "C:\\Users\\You\\Quick-CV";
    return absolutePath;
  }

  function displayResult(index, event) {
    let output;

    if (commands[index].action.length === 1) {
      output = commands[index].action(event);
    } else {
      output = commands[index].action();
    }
    return output;
  }

  function handleDataType(valid, terminal, path, userInput, output) {
    if (typeof output === "string") {
      valid.innerHTML = output.replace(/\n/g, "<br>");
      terminal.append(valid, path, userInput);
    } else {
      if (typeof output === "object") {
        valid.innerHTML = JSON.stringify(output);
        terminal.append(valid, path, userInput);
      } else {
        terminal.append(path, userInput);
      }
    }
  }

  useEffect(() => {
    // Terminal Body
    const terminalBody = document.getElementById("terminal-body");

    const handleKey = (e) => {
      // When "Enter Key is pressed"
      if (e.key === "Enter") {
        const input = createInput();
        const validText = createValidText();
        const invalidText = createInvalidText();
        const absolutePath = createAbsolutePath();

        let isCommandFound = false;

        for (let i = 0; i < commands.length; i++) {
          if (e.target.value.trim() === "") {
            return;
          }
          if (
            typeof commands[i].command === "string" &&
            commands[i].command.toLowerCase() ===
              e.target.value.trim().toLowerCase()
          ) {
            let result = displayResult(i, e);

            handleDataType(
              validText,
              terminalBody,
              absolutePath,
              input,
              result
            );

            isCommandFound = true;
            break;
          } else if (Array.isArray(commands[i].command)) {
            commands[i].command.forEach((c) => {
              let result = displayResult(i, e);
              handleDataType(
                validText,
                terminalBody,
                absolutePath,
                input,
                result
              );
            });
            isCommandFound = true;
          }
        }

        if (!isCommandFound) {
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
