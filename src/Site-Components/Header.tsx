import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { sections } from "../Utilities/data";
import SideBar from "./SideBar";
import { SvgMenu } from "../Svg-Components/Svg";

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  return (
    <header className="w-full bg-[#13131A] border-b border-[#2a2a38] sticky top-0 z-50">
      <SideBar isVisible={isVisible} handleVisibility={() => setIsVisible(p => !p)} />
      <nav className="max-w-7xl mx-auto flex items-center h-14 px-5 gap-4">
        {/* Mobile menu button — takes up a fixed width slot so logo stays centered */}
        <div className="md:hidden w-8 shrink-0">
          <button
            onClick={() => setIsVisible(p => !p)}
            className="text-[#8b8fa8] hover:text-white transition-colors p-1"
          >
            <SvgMenu />
          </button>
        </div>

        {/* Logo — centered on mobile, left-aligned on desktop */}
        <Link to="/" className="flex items-center gap-1 select-none md:mr-6">
          <span className="text-white font-bold text-base tracking-tight">Quick</span>
          <span className="text-indigo-400 font-bold text-base tracking-tight">CV</span>
        </Link>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-1 flex-1">
          {sections.map((section, id) => {
            const active = location.pathname === section.path;
            return (
              <li key={id}>
                <Link
                  to={section.path}
                  className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
                    active
                      ? "text-white bg-white/10"
                      : "text-[#8b8fa8] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {section.section_name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Spacer on mobile so logo is centered */}
        <div className="md:hidden flex-1" />

        {/* CTA */}
        <Link
          to="/create-cv"
          className="hidden md:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-1.5 rounded transition-colors ml-auto"
        >
          Build CV
        </Link>
      </nav>
    </header>
  );
}
