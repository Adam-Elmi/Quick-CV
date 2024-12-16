import { Link } from "react-router-dom";
import { sections } from "../Utilities/data";
import SvgClose from "../Svg-Components/Svg-Close";

export default function SideBar({isVisible, handleVisibility}) {
  // To prevent the child element to have the same event action of the parent[Container Element] -> Event(Onclick)
  const stopEvent = (e) => {
    e.stopPropagation();
  };

  return (
    // Container - Background Element - [rgba(0.3,0.3,0.3,0.3)]
    <div
      onClick={handleVisibility}
      className={`w-full h-screen transition-all duration-300 ease-in-out fixed top-0 left-0 bg-[rgba(0.3,0.3,0.3,0.3)] ${
        isVisible ? "block opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        onClick={stopEvent}
        className={`bg-[#ffffff] w-[250px] border-r absolute top-0 left-0 z-[990] h-screen`}
      >
        <ul className="flex font-mono flex-col p-2">
          <div className="flex justify-between items-center border-b p-2">
            <h1 className="font-bold text-blue-600 text-[1.2rem]">Menu</h1>
            <button
              onClick={handleVisibility}
              className="font-mono font-semibold text-red-500"
            >
             <SvgClose/>
            </button>
          </div>
          {sections.map((section, id) => (
            <Link key={id} to={section.path}>
              <li className="font-semibold flex gap-4 items-center p-4 border-b hover:text-indigo-600">
                <span className={`${section.icon}`}></span>
                {section.section_name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};
