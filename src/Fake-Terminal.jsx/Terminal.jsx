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
  const [output, setOutput] = useState([]);
  const [input, setInput] = useState("");

  const handleKey = (e) => {
    if (e.key === "Enter") {
      if (input.trim() === "") return;
      handleCommand(input.trim());
      setInput("");
    }
  };

  function extractNumber(str) {
    const match = str.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  }

  const handleCommand = (command) => {
    if (["clear", "cls"].includes(command.toLowerCase())) {
      setOutput([]);
      return;
    }

    if (command.startsWith("skill")) {
      const skillValue = command.replace(/skill\d+\s*=\s*/, "").trim();
      const savedData = sessionStorage.getItem("skills");
      const skills = savedData ? JSON.parse(savedData) : {};
      const findKey = input.slice(0, input.indexOf("=")).trim();
      const extract = extractNumber(findKey);

      if (extract && extract <= 8) {
        skills[`skill${extract}`] = skillValue;
        sessionStorage.setItem("skills", JSON.stringify(skills));

        setOutput((prev) => [
          ...prev,
          {
            text: `Skill updated: skill${extract} = ${skillValue}`,
            path: "C:\\Users\\You\\Quick-CV",
          },
        ]);
      } else {
        setOutput((prev) => [
          ...prev,
          {
            text: "Error: Only skill1 to skill8 are allowed.",
            path: "C:\\Users\\You\\Quick-CV",
          },
        ]);
      }
      return;
    }
    const validCommands = [
      "fullname",
      "phone_number",
      "email",
      "city",
      "country",
    ];

    if (validCommands.some((cmd) => command.startsWith(cmd))) {
      const [key, value] = command.split("=").map((str) => str.trim());

      if (validCommands.includes(key)) {
        if(value) {
          console.log(`${key} = ${value}`);
        }
        return;
      }
    }

    for (const commandObj of commands) {
      if (commandObj.command.includes(command.toLowerCase())) {
        setOutput((prev) => [
          ...prev,
          { text: commandObj.action(), path: "C:\\Users\\You\\Quick-CV" },
        ]);
        return;
      }
    }

    setOutput((prev) => [
      ...prev,
      {
        text: `Error: '${command}' is not recognized as an internal command. Type 'help' to view available commands.`,
        path: "C:\\Users\\You\\Quick-CV",
      },
    ]);
  };

  useEffect(() => {
    const terminalBody = document.getElementById("terminal-body");
    const userInput = document.getElementById("user-input");

    if (userInput) userInput.focus();

    const handleFocus = () => {
      if (userInput) userInput.focus();
    };

    if (terminalBody) terminalBody.addEventListener("click", handleFocus);

    return () => {
      if (terminalBody) terminalBody.removeEventListener("click", handleFocus);
    };
  }, []);

  useEffect(() => {
    const terminalBody = document.getElementById("terminal-body");
    if (terminalBody) terminalBody.scrollTop = terminalBody.scrollHeight;
  }, [output]);

  return (
    <div className="flex flex-col gap-1">
      {output.map((line, id) => (
        <div key={id}>
          <p className="font-mono text-yellow-500 mobile:text-[0.85rem] small-mobile:text-[0.55rem]">
            {line.path}
          </p>
          <pre
            className={`${
              line.text.includes("Error") ? "text-red-400" : "text-green-400"
            }`}
          >
            {line.text}
          </pre>
        </div>
      ))}
      <p className="font-mono text-yellow-500 mobile:text-[0.85rem] small-mobile:text-[0.55rem]">
        C:\Users\You\Quick-CV
      </p>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKey}
        id="user-input"
        type="text"
        className="font-mono text-slate-400 mobile:text-[0.85rem] small-mobile:text-[0.55rem] border-none outline-none bg-transparent overflow-hidden flex-1"
      />
    </div>
  );
}
