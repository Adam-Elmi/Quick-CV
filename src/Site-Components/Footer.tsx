import { Link } from "react-router-dom";
import { platforms } from "../Utilities/data";

const links = [
  { name: "Home", path: "/" },
  { name: "Templates", path: "/templates" },
  { name: "About", path: "/about" },
  { name: "License", path: "https://github.com/Adam-Elmi/Quick-CV/blob/master/LICENSE" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a10] border-t border-[#2a2a38]">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 select-none shrink-0">
          <span className="text-white font-bold text-sm tracking-tight">Quick</span>
          <span className="text-indigo-400 font-bold text-sm tracking-tight">CV</span>
        </Link>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {links.map((l, id) => (
            <a
              key={id}
              href={l.path}
              className="mono text-[#8b8fa8] hover:text-white text-xs transition-colors"
            >
              {l.name}
            </a>
          ))}
        </nav>

        {/* Social */}
        <div className="flex items-center gap-4">
          {platforms.map((p, id) => (
            <a
              key={id}
              href={p.link}
              className={`${p.icon} text-[#8b8fa8] hover:text-indigo-400 transition-colors text-base`}
              target="_blank"
              rel="noopener noreferrer"
            />
          ))}
        </div>
      </div>

      <div className="border-t border-[#1e1e2a] py-4 text-center">
        <p className="mono text-[#3d3f52] text-xs">
          © {new Date().getFullYear()} Adam Elmi — MIT License
        </p>
      </div>
    </footer>
  );
}
