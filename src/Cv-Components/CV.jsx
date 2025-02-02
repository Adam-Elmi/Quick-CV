import Workflow from "../Helper-Components/Workflow";
import GenerateCV from "../Helper-Components/GenerateCv";
import Template from "./Template";

export default function CV() {
  return (
    <div className=" w-full flex flex-col justify-center items-center">
      <div className="w-full min-h-[70px] bg-slate-900 flex items-center px-2">
        <button className="text-white flex gap-2 justify-center items-center border-2 border-slate-600 p-2 rounded-md">
          <span className="fa-solid fa-arrow-left text-slate-700"></span>
          <span className="font-[500]">Templates</span>
        </button>
        <div className="flex-1 text-white text-center">
          <input type="text" className="p-2 max-w-full w-[300px] text-center focus:text-left text-slate-300 bg-transparent outline-none focus:border-b-[1.5px] border-slate-700" placeholder="Enter the name of your CV (e.g., My-CV)." />
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
