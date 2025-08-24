import { platforms } from "../Utilities/data";
export default function Footer() {
  return (
    /* 
    ------
    Footer Container
    ------
    */
    <footer className="flex gap-2 flex-col bg-[#1a1a1a] w-full mt-auto">
      <div className="flex gap-5 justify-between items-center w-full p-4 max-[768px]:flex-col">
      {/* Left Section */}
        <div className="flex flex-col justify-center items-center gap-5 w-[150px] max-[768px]:w-full">
          <p className="paul text-[2rem] text-white">Quick Cv</p>
          <div className="flex justify-center gap-2">
            {platforms.map((platform, id) => (
              <a
                key={id}
                className={`text-white text-[1.2rem] ${platform.icon}`}
                href={platform.link}
              ></a>
            ))}
          </div>
        </div>
        {/* Right Section */}
        <div className="flex justify-center gap-5 flex-1 flex-wrap">
          {[
            {
              section_name: "Home",
              path: "/",
            },
            {
              section_name: "Templates",
              path: "/templates",
            },
            {
              section_name: "Contributors",
              path: "/contributors",
            },
            {
              section_name: "About",
              path: "/about",
            },
            {
              section_name: "License",
              path: "https://github.com/Adam-Elmi/Quick-CV/blob/master/LICENSE",
            },
          ].map((section, id) => (
            <a key={id} className="text-white leading-8 mono" href={section.path}>
              {section.section_name}
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-600 mt-5 pt-4 mx-16">
        <p className="text-center text-slate-400 text-[0.8rem] font-[500] h-10 mono">
          &copy; {new Date().getFullYear()} Quick Cv. All rights reserved.
        </p>
      </div>
      <div className="w-full bg-indigo-500 h-2"></div>
    </footer>
  );
}
