import { useState } from "react";
import { Link } from "react-router-dom";
import { sections } from "../Utilities/data";
import SideBar from "./SideBar";
import SvgMenu from "../Svg-Components/Svg-Menu";

export default function Header() {
  // State management for Sidebar component
  const [isVisible, setIsVisible] = useState(false);

  // Handles or Manages sidebar visibility
  const handleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <>
    {/* Sidebar component */}
      <SideBar isVisible={isVisible} handleVisibility={handleVisibility}/>
      {/* Nav */}
      <nav
        className={`w-full flex gap-4 justify-between items-center min-h-[60px] px-4 border-b-2 shadow-sm`}
      >
        {/* Menu container */}
        <div>
          {/* Menu button */}
          <button onClick={handleVisibility} className="cursor-pointer">
            {/* Menu icon (SVG) */}
            <SvgMenu/>
          </button>
        </div>
        {/* Site sections (e.g., Home, About, etc.) */}
        <SectionComponent/>
        <h1 className="paul text-[1.5rem]">Quick CV</h1>
      </nav>
    </>
  );
}


function SectionComponent() {
  return (
     // Renders site sections
    <ul className="flex gap-8 font-mono max-md:hidden">
          {sections.map((section, id) => (
            <Link key={id} to={section.path}>
              <li className="font-semibold  hover:text-indigo-600">
                {section.section_name}
              </li>
            </Link>
          ))}
        </ul>
  )
}