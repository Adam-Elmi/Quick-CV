import { useState } from "react";
import { Link } from "react-router-dom";
import { sections } from "../Utilities/data";
import SideBar from "./SideBar";
import { SvgMenu } from "../Svg-Components/Svg";

export default function Header() {
  /* 
  ------
  State management for Sidebar component
  ------
  */
  const [isVisible, setIsVisible] = useState(false);
  /* 
  ------
  Handles or Manages sidebar visibility
  ------
  */
  const handleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <header>
      {/*
        ------
        Sidebar Component
        ------
      */}
      <SideBar isVisible={isVisible} handleVisibility={handleVisibility} />
      {/* Nav */}
      <nav
        className={`w-full flex gap-4 justify-between items-center min-h-[60px] px-4 border-b-2 border-slate-200 shadow-sm`}
      >
        {/* Menu container */}
        <div className="hidden max-md:block">
          {/* Menu button */}
          <button onClick={handleVisibility} className="cursor-pointer">
            {/* Menu icon (SVG) */}
            <SvgMenu />
          </button>
        </div>
        {/* Logo name*/}
        <a href="/" className="paul text-[1.5rem]">Quick CV</a>
        {/* Site sections (e.g., Home, About, etc.) */}
        <SectionComponent />
      </nav>
    </header>
  );
}

function SectionComponent() {
  return (
    /* 
    ------
    Renders site sections
    ------
    */
    <ul className="flex gap-8  max-md:hidden flex-1 justify-center items-center">
      {sections.map((section, id) => (
        <Link key={id} to={section.path}>
          <li className="bold font-bold text-slate-700  hover:text-indigo-600">
            {section.section_name}
          </li>
        </Link>
      ))}
    </ul>
  );
}
