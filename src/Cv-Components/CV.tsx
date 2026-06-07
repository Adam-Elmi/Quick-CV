import Profile from "../Form-Components/Profile";
import Education from "../Form-Components/Education";
import Experience from "../Form-Components/Experience";
import Skills from "../Form-Components/Skills";
import Projects from "../Form-Components/Projects";
import Languages from "../Form-Components/Languages";
import Awards from "../Form-Components/Awards";
import Workflow from "../Helper-Components/Workflow";
import Template from "./Template";
import { BlobProvider } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import { SvgHome, SvgTemplate } from "../Svg-Components/Svg";
import { useState, useEffect, useRef } from "react";
import { useCVData, updateCVSettings, selectTemplate, populateSampleData, clearCVData } from "../Utilities/cvDataStore";
import StorageTracker from "../Helper-Components/StorageTracker";
import { TEMPLATES } from "../Templates";

// Internal component to handle the BlobProvider state legally with hooks
const PDFDownloadContent = ({ url, loading, fileName, setLastPdfUrl }: { url: string | null, loading: boolean, fileName: string, setLastPdfUrl: (url: string | null) => void }) => {
  useEffect(() => {
    if (url) setLastPdfUrl(url);
  }, [url, setLastPdfUrl]);

  return (
    <button
      disabled={loading || !url}
      className="group relative flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:shadow-none active:scale-95"
      onClick={() => {
        if (url) {
          const link = document.createElement("a");
          link.href = url;
          link.download = fileName;
          link.click();
        }
      }}
    >
      <i className="fa-solid fa-download text-xs group-hover:bounce"></i>
      {loading ? "Generating..." : "Download PDF"}
    </button>
  );
};

const RenderedPDFButton = ({ html, fileName, lastPdfUrl, setLastPdfUrl }: { html: string, fileName: string, lastPdfUrl: string | null, setLastPdfUrl: (url: string | null) => void }) => {
  const [renderSnapshot, setRenderSnapshot] = useState<string | null>(null);

  // If the user types a lot after preparing, auto-reset to stop background work
  useEffect(() => {
    if (renderSnapshot && renderSnapshot !== html) {
      setRenderSnapshot(null);
    }
  }, [html, renderSnapshot]);

  if (!renderSnapshot) {
    return (
      <button
        onClick={() => setRenderSnapshot(html)}
        className="group relative flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-200 active:scale-95"
      >
        <i className="fa-solid fa-file-pdf text-xs"></i>
        Prepare PDF
      </button>
    );
  }

  return (
    <BlobProvider document={<MyDocument html={renderSnapshot} />}>
      {({ url, loading }) => (
        <button
          disabled={loading || !url}
          className="group relative flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:shadow-none active:scale-95"
          onClick={() => {
            if (url) {
              const link = document.createElement("a");
              link.href = url;
              link.download = fileName;
              link.click();
              setRenderSnapshot(null); // RESET IMMEDIATELY AFTER DOWNLOAD
            }
          }}
        >
          <i className="fa-solid fa-download text-xs"></i>
          {loading ? "Generating..." : "Download PDF"}
        </button>
      )}
    </BlobProvider>
  );
};

export default function CV() {
  const [showSettings, setShowSettings] = useState(false);
  const cvData = useCVData();
  const [debouncedData, setDebouncedData] = useState(cvData);
  const [debouncedHtml, setDebouncedHtml] = useState("");
  const [lastPdfUrl, setLastPdfUrl] = useState<string | null>(null);
  const [isLazy, setIsLazy] = useState(false);

  // Keep track of the last template ID to detect instant switches
  const prevTemplateRef = useRef(cvData.selectedTemplate);

  useEffect(() => {
    // If the template changed, update immediately to skip the debounce delay
    if (cvData.selectedTemplate !== prevTemplateRef.current) {
      setIsLazy(true); // Enable lazy mode for instant switch
      setDebouncedData(cvData);
      prevTemplateRef.current = cvData.selectedTemplate;

      // Turn off lazy mode after the initial fast render
      setTimeout(() => setIsLazy(false), 300);
      return;
    }

    // Otherwise (for typing), use the standard debounce
    const timer = setTimeout(() => {
      setDebouncedData(cvData);
    }, 1000);

    return () => clearTimeout(timer);
  }, [cvData]);

  useEffect(() => {
    const render = async () => {
      try {
        const activeTemplate = TEMPLATES.find(t => t.id === debouncedData.selectedTemplate) || TEMPLATES[0];
        const result = await activeTemplate.builder(debouncedData, isLazy);
        setDebouncedHtml(result as string);
      } catch (error: any) {
        console.error("Template Rendering Error:", error);

        const errorHtml = `
          <div style="padding: 30px; font-family: 'Helvetica', sans-serif; background-color: #fff1f2; border: 2px solid #be123c; border-radius: 8px;">
            <h1 style="color: #9f1239; font-size: 20px; margin-bottom: 10px;">⚠️ Template Rendering Failed</h1>
            <p style="color: #be123c; font-size: 14px; font-weight: bold; margin-bottom: 20px;">
              Target Template: ${debouncedData.selectedTemplate || 'Default'}
            </p>
            <div style="background-color: #ffffff; padding: 15px; border-radius: 4px; border: 1px solid #fda4af; margin-bottom: 20px;">
              <p style="color: #334155; font-size: 12px; font-weight: bold;">Error Message:</p>
              <code style="color: #e11d48; font-size: 11px;">${error.message || 'Unknown Error'}</code>
            </div>
          </div>
        `;
        setDebouncedHtml(errorHtml);
      }
    };
    render();
  }, [debouncedData, isLazy]);

  const settings = cvData.settings;
  const currentTemplateId = cvData.selectedTemplate || "modern-sidebar";
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

  const fileName = (() => {
    const manual = localStorage.getItem("cv_filename");
    if (manual && manual.trim()) return manual.endsWith(".pdf") ? manual : `${manual}.pdf`;

    const { firstName, lastName } = cvData.profile;
    if (firstName || lastName) {
      return `${firstName}_${lastName}_CV.pdf`.replace(/^_+|_+$/g, '');
    }
    return "My_CV.pdf";
  })();

  return (
    <div className=" w-full flex flex-col justify-center items-center">
      <div className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 flex justify-between items-center flex-wrap gap-3 transition-all duration-300">
        <div className="flex items-center gap-2">
          <a href="/" className="group">
            <button
              title="Home"
              className="flex items-center justify-center cursor-pointer p-2 rounded-full hover:bg-slate-100 transition-colors duration-200 group-hover:text-indigo-600 text-slate-600"
            >
              <SvgHome width={24} height={24} />
            </button>
          </a>
          <button
            title="Settings"
            onClick={() => setShowSettings(true)}
            className="flex items-center justify-center cursor-pointer p-2 rounded-full hover:bg-slate-100 transition-colors duration-200 text-slate-600 hover:text-indigo-600 mr-2"
          >
            <i className="fa-solid fa-gear text-lg"></i>
          </button>
          <div className="h-6 w-px bg-slate-300 mx-1 hidden sm:block"></div>
          <a href="templates" className="group">
            <button
              title="Templates"
              className="flex items-center justify-center cursor-pointer p-2 rounded-full hover:bg-slate-100 transition-colors duration-200 group-hover:text-indigo-600 text-slate-600"
            >
              <SvgTemplate width={22} height={22} />
              <span className="ml-2 text-sm font-medium hidden sm:block">Templates</span>
            </button>
          </a>
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
          <RenderedPDFButton html={debouncedHtml} fileName={fileName} lastPdfUrl={lastPdfUrl} setLastPdfUrl={setLastPdfUrl} />
        </div>
      </div>
      <div className="max-w-[1920px] mx-auto w-full px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
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
              ].filter(Boolean) as React.ReactNode[]}
            />

            <div className="pt-10 flex flex-col items-center gap-4 border-t border-slate-100">
              <button
                onClick={() => populateSampleData()}
                className="w-full sm:w-auto px-8 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-all active:scale-95 shadow-lg shadow-slate-200"
              >
                Populate Sample Data
              </button>
              <button
                onClick={() => clearCVData()}
                className="text-slate-400 text-sm font-medium hover:text-red-500 transition-colors"
              >
                Clear all data
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:sticky lg:top-[90px] min-w-0">
            <Template html={debouncedHtml} />
          </div>
        </div>
      </div>
      {showSettings && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 p-4"
          onClick={() => setShowSettings(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[2rem] shadow-2xl w-full sm:max-w-md flex flex-col animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-hidden"
          >
            <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100 bg-white sticky top-0 z-20">
              <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">CV Settings</h3>
              <button onClick={() => setShowSettings(false)} className="p-2 -mr-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>
            <div className="p-6 space-y-5 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-200">
              {sections.map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="font-medium text-slate-700">{label}</span>
                  <button
                    onClick={() => toggleSetting(key)}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200 border-2 active:scale-90 ${settings[key] ? 'bg-indigo-600 border-indigo-600 shadow-md shadow-indigo-100' : 'bg-white border-slate-200 hover:border-indigo-300'}`}
                  >
                    {settings[key] && <i className="fa-solid fa-check text-white text-[10px] animate-in zoom-in-50 duration-200"></i>}
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
