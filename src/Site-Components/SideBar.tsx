import React from "react";
import { Link, useLocation } from "react-router-dom";
import { sections } from "../Utilities/data";
import { SvgClose } from "../Svg-Components/Svg";

export default function SideBar({
  isVisible,
  handleVisibility,
}: {
  isVisible: boolean;
  handleVisibility: () => void;
}) {
  const location = useLocation();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleVisibility}
        className={`fixed inset-0 z-[998] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        onClick={(e: React.SyntheticEvent) => e.stopPropagation()}
        className={`fixed top-0 left-0 h-screen w-64 z-[999] bg-[#13131A] border-r border-[#2a2a38] flex flex-col transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-[#2a2a38] shrink-0">
          <Link to="/" onClick={handleVisibility} className="flex items-center gap-1 select-none">
            <span className="text-white font-bold text-sm tracking-tight">Quick</span>
            <span className="text-indigo-400 font-bold text-sm tracking-tight">CV</span>
          </Link>
          <button
            onClick={handleVisibility}
            className="text-[#8b8fa8] hover:text-white transition-colors p-1"
          >
            <SvgClose />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 overflow-y-auto">
          <ul className="flex flex-col gap-0.5">
            {sections.map((section, id) => {
              const active = location.pathname === section.path;
              return (
                <li key={id}>
                  <Link
                    to={section.path}
                    onClick={handleVisibility}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                      active
                        ? "bg-indigo-600/20 text-indigo-300"
                        : "text-[#8b8fa8] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="text-base shrink-0">{section.icon}</span>
                    {section.section_name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[#2a2a38] shrink-0">
          <Link
            to="/create-cv"
            onClick={handleVisibility}
            className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2.5 rounded transition-colors"
          >
            Build CV
          </Link>
        </div>
      </div>
    </>
  );
}
