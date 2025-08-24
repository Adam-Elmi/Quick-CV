import { steps } from "../Utilities/data";
import video from "/src/assets/media/vinland-saga.mp4";
import { SvgProcess } from "../Svg-Components/Svg";

export default function StepsSection() {
  return (
    // Main Container
    <div className="flex w-full justify-between flex-wrap gap-10 max-[990px]:flex-col">
      {/* Left Section */}
      <div className="bg-white p-2 flex flex-1 justify-center items-center px-4 gap-8 flex-col w-[500px] max-w-full max-[990px]:w-full">
        <div className="flex flex-col gap-4 border-2 border-indigo-300 p-4 rounded-lg shadow-lg">
          <p className="text-[1.5em] flex  justify-center items-center gap-4 mobile:text-[1.1rem] max-[368px]:text-[0.85rem] text-center text-slate-400 font-bold p-2 mt-3 rounded-full">
            <SvgProcess/>
            Create a CV in 3 easy steps
          </p>
          <video
            src={video}
            controls={true}
            className="max-w-full mt-2 object-cover max-[990px]:w-full max-[990px]:transform-none max-[990px]:scale-100 max-[990px]:px-0 rounded-lg shadow-lg border border-gray-300"
            style={{
              aspectRatio: "16/9",
              backgroundColor: "#000",
            }}
          ></video>
        </div>
      </div>
      {/* Right Section */}
      <StepsComponent />
    </div>
  );
}
function StepsComponent() {
  return (
    // Side Section Container
    <div className="flex flex-col gap-5 p-2 mb-8 w-[500px] max-[990px]:w-full max-w-full justify-end items-center pt-10">
      {steps.map((value, id) => (
        <div
          key={id}
          className="flex justify-between items-center shadow-lg border-2 border-slate-200 min-h-[150px] max-w-[400px] w-full p-4 rounded-lg"
        >
          <div className="flex flex-col gap-2">
            <span className="text-indigo-300 text-[0.8rem] bold">{value.step}</span>
            <h2 className="text-[1.2rem] bold text-slate-600">{value.toDo}</h2>
            <p className="text-slate-400">{value.description}</p>
          </div>
          {/* Icon property stores SVG element (Utilities -> data.jsx) */}
          {value.icon}
        </div>
      ))}
    </div>
  );
}
