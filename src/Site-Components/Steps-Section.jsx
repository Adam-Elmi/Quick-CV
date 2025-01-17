import { steps } from "../Utilities/data";
import video from "/src/assets/media/vinland-saga.mp4";
import { SvgProcess } from "../Svg-Components/Svg";

export default function StepsSection() {
  return (
    // Main Container
    <div className="flex w-full justify-between flex-wrap gap-10 max-lg:flex-col">
      {/* Left Section */}
      <div className="bg-white p-2 flex flex-1 justify-center items-center px-4 gap-8 flex-col w-[500px] max-w-full max-lg:w-full">
        <div className="flex flex-col gap-4 border-2 border-indigo-300 p-4 rounded-lg shadow-lg">
          <p className="text-[1.5em] flex  justify-center items-center gap-4 mobile:text-[1.1rem] small-mobile:text-[0.85rem] text-center text-slate-400 font-bold p-2 mt-3 rounded-full">
            <SvgProcess/>
            Create a CV in 3 easy steps
          </p>
          <video
            src={video}
            controls={true}
            alt="Video"
            className="max-w-full mt-2 object-cover max-lg:w-full max-lg:transform-none max-lg:scale-100 max-lg:px-0 rounded-lg shadow-lg border border-gray-300"
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
    <div className="flex flex-col gap-5 p-2 w-[500px] max-lg:w-full max-w-full justify-end items-center pt-10">
      {steps.map((value, id) => (
        <div
          key={id}
          className="flex justify-between items-center shadow-lg border-2 min-h-[150px] max-w-[400px] w-full p-4 rounded-lg"
        >
          <div className="flex flex-col gap-2">
            <span className="text-indigo-300 text-[0.8rem] font-semibold">{value.step}</span>
            <h2 className="text-[1.2rem] font-bold">{value.toDo}</h2>
            <p className="text-slate-400">{value.description}</p>
          </div>
          {/* Icon property stores SVG element (Utilities -> data.jsx) */}
          {value.icon}
        </div>
      ))}
    </div>
  );
}
