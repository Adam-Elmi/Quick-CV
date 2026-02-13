import Profile from "../Form-Components/Profile";
import Education from "../Form-Components/Education";
import Experience from "../Form-Components/Experience";
import Skills from "../Form-Components/Skills";
import Projects from "../Form-Components/Projects";
import Languages from "../Form-Components/Languages";
import Awards from "../Form-Components/Awards";
import Workflow from "../Helper-Components/Workflow";
import Template from "./Template";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import { SvgHome, SvgTemplate } from "../Svg-Components/Svg";
import { useState } from "react";
import { useCVData, updateCVSettings, selectTemplate } from "../Utilities/cvDataStore";
import StorageTracker from "../Helper-Components/StorageTracker";
import { TEMPLATES } from "../Templates";
export default function CV() {
  const [showSettings, setShowSettings] = useState(false);
  const cvData = useCVData();
  const settings = cvData.settings;
  const currentTemplateId = cvData.selectedTemplate || "modern";
  const toggleSetting = (key: string) => {
    updateCVSettings({
      ...settings,
      [key]: !settings[key]
    });
  };
  const sections = [
    { key: "experience", label: "Experience" },
    { key: "education", label: "Education" },
    { key: "projects", label: "Projects" },
    { key: "skills", label: "Skills" },
    { key: "languages", label: "Languages" },
    { key: "awards", label: "Awards" },
  ];
  return (
    <div className=" w-full flex flex-col justify-center items-center">
      <div className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-2">
          {}
          <button
            title="Settings"
            onClick={() => setShowSettings(true)}
            className="flex items-center justify-center p-2 rounded-full hover:bg-slate-100 transition-colors duration-200 text-slate-600 hover:text-indigo-600 mr-2"
          >
            <i className="fa-solid fa-gear text-lg"></i>
          </button>
          <a href="/" className="group">
            <button
              title="Home"
              className="flex items-center justify-center p-2 rounded-full hover:bg-slate-100 transition-colors duration-200 group-hover:text-indigo-600 text-slate-600"
            >
              <SvgHome width={24} height={24} />
            </button>
          </a>
          <div className="h-6 w-px bg-slate-300 mx-1 hidden sm:block"></div>
          <a href="templates" className="group">
            <button
              title="Templates"
              className="flex items-center justify-center p-2 rounded-full hover:bg-slate-100 transition-colors duration-200 group-hover:text-indigo-600 text-slate-600"
            >
              <SvgTemplate width={22} height={22} />
              <span className="ml-2 text-sm font-medium hidden sm:block">Templates</span>
            </button>
          </a>
          {}
          <div className="h-6 w-px bg-slate-300 mx-1 hidden sm:block"></div>
          <div className="relative group flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 hover:border-indigo-300 transition-colors">
            <i className="fa-solid fa-paintbrush text-slate-400 text-xs mr-2"></i>
            <select
              value={currentTemplateId}
              onChange={(e) => selectTemplate(e.target.value)}
              className="appearance-none bg-transparent pr-8 py-1.5 text-sm font-medium text-slate-700 hover:text-indigo-600 focus:outline-none cursor-pointer w-32"
            >
              {TEMPLATES.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            <i className="fa-solid fa-chevron-down absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none group-hover:text-indigo-600"></i>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <PDFDownloadLink document={<MyDocument />} fileName="document.pdf">
            {({ loading }) =>
              loading ? (
                <button disabled className="px-6 py-2 rounded-full bg-slate-100 text-slate-400 font-medium text-sm">
                  Loading...
                </button>
              ) : (
                <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 font-medium text-sm">
                  <span>Download PDF</span>
                  <i className="fa-solid fa-download text-xs"></i>
                </button>
              )
            }
          </PDFDownloadLink>
        </div>
      </div>
      <div className="max-w-[1920px] mx-auto w-full px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {}
          <div className="w-full lg:w-1/2 min-w-0">
            <Workflow
              sections={[
                <Profile key={"Profile"} />,
                settings.education && <Education key={"Education"} />,
                settings.experience && <Experience key={"Experience"} />,
                settings.skills && <Skills key={"Skills"} />,
                settings.projects && <Projects key={"Projects"} />,
                settings.languages && <Languages key={"Languages"} />,
                settings.awards && <Awards key={"Awards"} />,
              ].filter(Boolean)}
            />
          </div>
          {}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-[90px] min-w-0">
            <Template />
          </div>
        </div>
      </div>
      {}
      {showSettings && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200 p-4"
          onClick={() => setShowSettings(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col"
          >
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-white">
              <h3 className="text-lg font-bold text-slate-800">CV Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-500 mb-4">Toggle visibility of sections in your PDF.</p>
              {sections.map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="font-medium text-slate-700">{label}</span>
                  <button
                    onClick={() => toggleSetting(key)}
                    className={`w-11 h-6 flex items-center rounded-full transition-colors duration-300 focus:outline-none ${settings[key] ? 'bg-indigo-600' : 'bg-slate-300'}`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${settings[key] ? 'translate-x-6' : 'translate-x-1'}`}
                    ></div>
                  </button>
                </div>
              ))}
              <hr className="border-slate-100 my-2" />
              <StorageTracker />
            </div>
            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
