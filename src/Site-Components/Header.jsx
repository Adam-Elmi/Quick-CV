import { useState } from "react";
import { Link } from "react-router-dom";
import { sections } from "../Utilities/data";
import SideBar from "./SideBar";
import SvgMenu from "../Svg-Components/Svg-Menu";

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);

  // Handles sidebar visibility
  const handleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <>
    {/* Sidebar Component */}
      <SideBar isVisible={isVisible} handleVisibility={handleVisibility}/>
      {/* Nav */}
      <nav
        className={`w-full flex gap-4 justify-between items-center min-h-[60px] px-4 border-b-2 shadow-sm`}
      >
        <div>
          <button onClick={handleVisibility} className="cursor-pointer">
            <SvgMenu/>
          </button>
        </div>
        <SectionComponent/>
        <h1 className="paul text-[1.5rem]">Quick CV</h1>
      </nav>
    </>
  );
}


function SectionComponent() {
  return (
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