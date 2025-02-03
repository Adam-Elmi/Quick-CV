import Workflow from "../Helper-Components/Workflow";
import GenerateCV from "../Helper-Components/GenerateCv";
import Template from "./Template";

export default function CV() {
  return (
    <div className=" w-full flex flex-col justify-center items-center">
      <div className="w-full min-h-[70px] bg-slate-900 flex justify-between items-center px-2">
        <div className="flex gap-5">
          <button title="Home" className="text-white flex gap-2 justify-center items-center p-2 rounded-md">
            <span className="fa-solid fa-home text-slate-700 text-[1.2rem]"></span>
          </button>
          <button title="Templates" className="text-white flex gap-2 justify-center items-center p-2 rounded-md">
            <span className="fa-solid fa-file text-slate-700 text-[1.2rem]"></span>
          </button>
        </div>
        <button className="text-white bg-indigo-600 flex gap-2 justify-center items-center border-2 border-slate-700 p-2 rounded-md">
          <span className="font-[500]">Download</span>
          <span className="fa-solid fa-download"></span>
        </button>
      </div>
      <div className="w-full flex">
        {/* Input Form */}
        <div className="flex-1 min-h-screen flex gap-5 shadow-md">
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
        <Template />
      </div>
    </div>
  );
}
