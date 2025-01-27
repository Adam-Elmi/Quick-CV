import { useEffect, useState } from "react";
import Workflow from "../Helper-Components/Workflow";
import GenerateCV from "../Helper-Components/GenerateCv";
import { CoreTemplate } from "./Core-Template";

export default function Resume() {
  

  return (
    <div className=" w-full flex flex-col justify-center items-center p-5">
      <h1 id="hide" className="my-5 font-bold text-[2rem] w-full text-center">
        Create Your CV
      </h1>
        <div className="w-full flex gap-5 justify-between items-center">
          {/* Input Form */}
          <div className="max-w-[600px] flex-1 flex flex-col justify-center items-center gap-5 shadow-md px-2 mt-5 py-5 border-2 border-blue-500 rounded-md">
            <Workflow
              children={[
                "Personal Information",
                "Education",
                "Experience",
                "Skills",
                "Projects",
                "Languages",
                "Hobbies",
              ]}
            />
          </div>
          <CoreTemplate />
        </div>
    </div>
  );
}
