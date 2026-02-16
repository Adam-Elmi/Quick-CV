import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { sections } from "../Utilities/data";
import { SvgClose } from "../Svg-Components/Svg";

export default function SideBar({
  isVisible,
  handleVisibility,
}: {
  isVisible: boolean;
  handleVisibility: () => void;
}) {
  const stopEvent = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleVisibility}
      className={`w-full h-screen transition-all duration-300 ease-in-out z-[999] fixed top-0 left-0 bg-[rgba(0.3,0.3,0.3,0.3)] ${isVisible ? "block opacity-100 visible" : "opacity-0 invisible"
        }`}
    >
      <div
        onClick={stopEvent}
        className={`bg-[#ffffff] w-[250px] border-r border-slate-200 absolute top-0 left-0 z-[990] h-screen`}
      >
        <ul className="flex mono flex-col p-2">
          <div className="flex justify-between items-center border-b border-slate-200 p-2">
            <h1 className="bold text-blue-600 text-[1.2rem]">Menu</h1>
            <button
              onClick={handleVisibility}
              className="bold cursor-pointer text-red-500"
            >
              <SvgClose />
            </button>
          </div>
          {sections.map((section, id) => (
            <Link key={id} to={section.path}>
              <li className="bold text-slate-700 flex gap-2 items-center p-4 border-b border-slate-100 hover:text-indigo-600">
                {section.icon}
                {section.section_name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

SideBar.propTypes = {
  isVisible: PropTypes.bool,
  handleVisibility: PropTypes.func,
};
