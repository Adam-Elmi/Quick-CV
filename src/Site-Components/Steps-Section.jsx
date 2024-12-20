import { steps } from "../Utilities/data";
import teamImage from "/src/assets/images/team-5439.png";

export default function StepsSection() {
  return (
    // Main Container
    <div className="flex w-full justify-between flex-wrap gap-10 tablet:flex-col">
      {/* Left Section */}
      <div className="bg-white p-2 flex-1 flex items-center px-4 gap-8 flex-col w-[300px] max-w-full tablet:w-full">
        <p className="text-[1.5em] mobile:text-[1.1rem] small-mobile:text-[0.85rem] text-center text-slate-400 font-bold border-2 border-dotted p-2 mt-3 border-blue-100 rounded-full">Create and download a CV in 3 easy steps</p>
        <img src={teamImage} alt="Picture"  className="max-w-full object-cover tablet:w-full scale-110 px-4 tablet:transform-none tablet:scale-100 tablet:px-0"/>
      </div>
      {/* Right Section */}
      <StepsComponent/>
    </div>
  );
}
function StepsComponent() {
  return (
    // Side Section Container
    <div className="flex flex-col gap-5 p-2 flex-1 justify-end items-center pt-10">
      {steps.map((value, id) => (
        <div key={id} className="flex justify-between items-center shadow-lg border-2 min-h-[150px] max-w-[400px] w-full p-4 rounded-lg">
            <div className="flex flex-col gap-2">
                <span className="text-slate-500 text-[0.8rem]">{value.step}</span>
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
