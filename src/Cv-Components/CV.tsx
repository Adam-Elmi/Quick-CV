import Profile from "../Form-Components/Profile";
import Education from "../Form-Components/Education";
import Experience from "../Form-Components/Experience";
import Skills from "../Form-Components/Skills";
import Projects from "../Form-Components/Projects";
import Languages from "../Form-Components/Languages";
import Awards from "../Form-Components/Awards";
import Certifications from "../Form-Components/Certifications";
import Workflow from "../Helper-Components/Workflow";
import Template from "./Template";
import { BlobProvider } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import { SvgHome, SvgTemplate } from "../Svg-Components/Svg";
import { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { useCVData, updatePageSize, updateFontFamily, selectTemplate, populateSampleData, clearCVData } from "../Utilities/cvDataStore";
import StorageTracker from "../Helper-Components/StorageTracker";
import { TEMPLATES } from "../Templates";

const TemplateSelector = ({ value, onChange }: { value: string; onChange: (id: string) => void }) => {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);

  const calcPos = () => {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    const menuW = 208; // w-52
    // clamp so menu never goes off the right edge
    const left = Math.min(r.left, window.innerWidth - menuW - 8);
    setMenuPos({ top: r.bottom + 6, left });
  };

  const toggle = () => {
    calcPos();
    setOpen(o => !o);
  };

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!triggerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const reposition = () => calcPos();
    document.addEventListener("pointerdown", close);
    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);
    return () => {
      document.removeEventListener("pointerdown", close);
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
    };
  }, [open]);

  const current = TEMPLATES.find(t => t.id === value) || TEMPLATES[0];

  return (
    <>
      <button
        ref={triggerRef}
        onClick={toggle}
        className={`flex items-center gap-1.5 bg-[#1a1a27] border rounded px-2 sm:px-2.5 py-1.5 transition-colors shrink-0 ${
          open ? "border-indigo-500/60 bg-[#1e1e2e]" : "border-[#2a2a38] hover:border-indigo-500/40"
        }`}
      >
        <i className="fa-solid fa-paintbrush text-[#8b8fa8] text-xs shrink-0"></i>
        <span className="hidden sm:block text-sm font-medium text-[#c9cbd8] max-w-[7rem] truncate">{current.name}</span>
        <i className={`fa-solid fa-chevron-down text-[10px] text-[#8b8fa8] transition-transform duration-150 shrink-0 ${open ? "rotate-180" : ""}`}></i>
      </button>

      {open && createPortal(
        <div
          style={{ position: "fixed", top: menuPos.top, left: menuPos.left }}
          className="w-52 bg-[#1a1a27] border border-[#2a2a38] rounded-lg shadow-2xl shadow-black/70 z-[9999] py-1 overflow-hidden"
        >
          <p className="mono text-[10px] text-[#3d3f52] uppercase tracking-widest px-3 pt-2 pb-1.5">Template</p>
          {TEMPLATES.map(t => {
            const active = t.id === value;
            return (
              <button
                key={t.id}
                onPointerDown={(e) => { e.stopPropagation(); onChange(t.id); setOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-3 text-sm text-left transition-colors ${
                  active ? "bg-indigo-600/15 text-indigo-300" : "text-[#c9cbd8] hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="w-3.5 shrink-0 flex items-center justify-center">
                  {active && <i className="fa-solid fa-check text-indigo-400 text-[10px]"></i>}
                </span>
                {t.name}
              </button>
            );
          })}
        </div>,
        document.body
      )}
    </>
  );
};

const FontSelector = ({ fonts, value, onChange }: {
  fonts: Array<{ family: string; label?: string; src?: string }>;
  value: string;
  onChange: (f: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);

  const calcPos = () => {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    setMenuPos({ top: r.bottom + 6, left: r.left });
  };

  const toggle = () => { calcPos(); setOpen(o => !o); };

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!triggerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const reposition = () => calcPos();
    document.addEventListener("pointerdown", close);
    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);
    return () => {
      document.removeEventListener("pointerdown", close);
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
    };
  }, [open]);

  const current = fonts.find(f => f.family === value) || fonts[0];

  return (
    <>
      <button
        ref={triggerRef}
        onClick={toggle}
        className={`flex items-center gap-1.5 px-2 py-0.5 rounded border transition-colors text-xs ${
          open ? "border-indigo-500/60 text-white" : "border-[#2a2a38] text-[#c9cbd8] hover:border-[#3d3f52]"
        }`}
        style={{ fontFamily: value }}
      >
        <span>{current?.label || current?.family || value}</span>
        <i className={`fa-solid fa-chevron-down text-[9px] text-[#8b8fa8] transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && createPortal(
        <div
          style={{ position: "fixed", top: menuPos.top, left: menuPos.left }}
          className="min-w-40 bg-[#1a1a27] border border-[#2a2a38] rounded-lg shadow-2xl shadow-black/70 z-[9999] py-1 overflow-hidden"
        >
          {fonts.map(font => {
            const active = font.family === value;
            return (
              <button
                key={font.family}
                onPointerDown={(e) => { e.stopPropagation(); onChange(font.family); setOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-left transition-colors ${
                  active ? "bg-indigo-600/15 text-indigo-300" : "text-[#c9cbd8] hover:bg-white/5 hover:text-white"
                }`}
                style={{ fontFamily: font.family }}
              >
                <span className="w-3.5 shrink-0 flex items-center justify-center">
                  {active && <i className="fa-solid fa-check text-indigo-400 text-[10px]" />}
                </span>
                {font.label || font.family}
              </button>
            );
          })}
        </div>,
        document.body
      )}
    </>
  );
};

const RenderedPDFButton = ({ html, fileName, pageSize, fontFamily, lastPdfUrl, setLastPdfUrl }: { html: string, fileName: string, pageSize: string, fontFamily: string, lastPdfUrl: string | null, setLastPdfUrl: (url: string | null) => void }) => {
  const [renderSnapshot, setRenderSnapshot] = useState<string | null>(null);

  useEffect(() => {
    if (renderSnapshot && renderSnapshot !== html) setRenderSnapshot(null);
  }, [html, renderSnapshot]);

  if (!renderSnapshot) {
    return (
      <button
        onClick={() => setRenderSnapshot(html)}
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 sm:px-4 py-1.5 rounded text-sm font-semibold transition-colors shrink-0"
      >
        <i className="fa-solid fa-file-pdf text-xs"></i>
        <span className="hidden xs:block sm:block">Prepare PDF</span>
      </button>
    );
  }

  return (
    <BlobProvider document={<MyDocument html={renderSnapshot} pageSize={pageSize} fontFamily={fontFamily} />}>
      {({ url, loading }) => (
        <button
          disabled={loading || !url}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white px-3 sm:px-4 py-1.5 rounded text-sm font-semibold transition-colors shrink-0"
          onClick={() => {
            if (url) {
              const link = document.createElement("a");
              link.href = url;
              link.download = fileName;
              link.click();
              setRenderSnapshot(null);
            }
          }}
        >
          <i className="fa-solid fa-download text-xs"></i>
          <span className="hidden sm:block">{loading ? "Generating…" : "Download PDF"}</span>
        </button>
      )}
    </BlobProvider>
  );
};

export default function CV() {
  const [showSettings, setShowSettings] = useState(false);
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit");
  const cvData = useCVData();
  const [debouncedData, setDebouncedData] = useState(cvData);
  const [debouncedHtml, setDebouncedHtml] = useState("");
  const [lastPdfUrl, setLastPdfUrl] = useState<string | null>(null);
  const [isLazy, setIsLazy] = useState(false);
  const prevTemplateRef = useRef(cvData.selectedTemplate);

  useEffect(() => {
    if (cvData.selectedTemplate !== prevTemplateRef.current) {
      setIsLazy(true);
      setDebouncedData(cvData);
      prevTemplateRef.current = cvData.selectedTemplate;
      setTimeout(() => setIsLazy(false), 300);
      return;
    }
    const timer = setTimeout(() => setDebouncedData(cvData), 1000);
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
        setDebouncedHtml(`
          <div style="padding:30px;font-family:'Helvetica',sans-serif;background:#fff1f2;border:2px solid #be123c;border-radius:8px;">
            <h1 style="color:#9f1239;font-size:20px;margin-bottom:10px;">⚠️ Template Rendering Failed</h1>
            <code style="color:#e11d48;font-size:11px;">${error.message || 'Unknown Error'}</code>
          </div>
        `);
      }
    };
    render();
  }, [debouncedData, isLazy]);

  const currentTemplateId = cvData.selectedTemplate || "modern-sidebar";
  const activeConfig = (TEMPLATES.find(t => t.id === currentTemplateId) || TEMPLATES[0]).config;

  const sectionList = [
    { label: "Profile",        node: <Profile        key="Profile"        /> },
    { label: "Education",      node: <Education      key="Education"      /> },
    { label: "Experience",     node: <Experience     key="Experience"     /> },
    { label: "Skills",         node: <Skills         key="Skills"         /> },
    { label: "Projects",       node: <Projects       key="Projects"       /> },
    { label: "Languages",      node: <Languages      key="Languages"      /> },
    { label: "Awards",         node: <Awards         key="Awards"         /> },
    { label: "Certifications", node: <Certifications key="Certifications" /> },
  ];

  const htmlWithFont = useMemo(() => {
    const family = cvData.fontFamily || "Helvetica";
    if (!debouncedHtml) return debouncedHtml;
    return debouncedHtml.replace(
      /(<style[^>]*>)([\s\S]*?)(<\/style>)/gi,
      (_, open, css, close) =>
        open + css.replace(/font-family:\s*[^;{}]+/g, `font-family: '${family}', sans-serif`) + close
    );
  }, [debouncedHtml, cvData.fontFamily]);

  const fileName = (() => {
    const manual = localStorage.getItem("cv_filename");
    if (manual?.trim()) return manual.endsWith(".pdf") ? manual : `${manual}.pdf`;
    const stripHtml = (s: string) => s.replace(/<[^>]*>/g, '');
    const firstName = stripHtml(cvData.profile.firstName);
    const lastName = stripHtml(cvData.profile.lastName);
    if (firstName || lastName) return `${firstName}_${lastName}_CV.pdf`.replace(/^_+|_+$/g, '');
    return "My_CV.pdf";
  })();

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#0f0f17]">

      {/* Topbar */}
      <div className="sticky top-0 z-50 w-full h-14 bg-[#13131A] border-b border-[#2a2a38] flex items-center justify-between px-3 sm:px-5 gap-2">
        <div className="flex items-center gap-0.5 sm:gap-1 min-w-0">
          <a href="/" title="Home" className="text-[#8b8fa8] hover:text-white transition-colors p-2 rounded hover:bg-white/5 shrink-0">
            <SvgHome width={18} height={18} />
          </a>

          <div className="w-px h-5 bg-[#2a2a38] mx-1 shrink-0" />

          <button
            title="Settings"
            onClick={() => setShowSettings(true)}
            className="text-[#8b8fa8] hover:text-white transition-colors p-2 rounded hover:bg-white/5 shrink-0"
          >
            <i className="fa-solid fa-gear text-sm"></i>
          </button>

          <div className="w-px h-5 bg-[#2a2a38] mx-1 hidden sm:block shrink-0" />

          <a href="/templates" title="Templates" className="hidden sm:flex items-center gap-2 text-[#8b8fa8] hover:text-white transition-colors px-3 py-1.5 rounded hover:bg-white/5 text-sm shrink-0">
            <SvgTemplate width={16} height={16} />
            Templates
          </a>

          <div className="w-px h-5 bg-[#2a2a38] mx-1 hidden sm:block shrink-0" />

          {/* Template selector */}
          <TemplateSelector value={currentTemplateId} onChange={selectTemplate} />
        </div>

        <RenderedPDFButton html={htmlWithFont} fileName={fileName} pageSize={cvData.pageSize} fontFamily={cvData.fontFamily} lastPdfUrl={lastPdfUrl} setLastPdfUrl={setLastPdfUrl} />
      </div>

      {/* CV Styles bar */}
      <div className="sticky top-14 z-40 w-full bg-[#13131A] border-b border-[#2a2a38] flex items-center gap-3 px-3 sm:px-5 h-10 overflow-x-auto shrink-0" style={{ scrollbarWidth: "none" }}>

        {/* Page size */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] text-[#4a4c5e] uppercase tracking-widest">Page</span>
          <div className="flex gap-0.5 bg-[#0f0f17] rounded p-0.5">
            {(["A4", "LETTER"] as const).map(size => (
              <button
                key={size}
                onClick={() => updatePageSize(size)}
                className={`px-2.5 py-0.5 text-[11px] font-medium rounded transition-colors ${
                  cvData.pageSize === size
                    ? "bg-indigo-600 text-white"
                    : "text-[#8b8fa8] hover:text-white"
                }`}
              >
                {size === "LETTER" ? "Letter" : "A4"}
              </button>
            ))}
          </div>
        </div>

        {activeConfig.fonts && activeConfig.fonts.length > 0 && (
          <div className="w-px h-4 bg-[#2a2a38] shrink-0" />
        )}

        {/* Font family */}
        {activeConfig.fonts && activeConfig.fonts.length > 0 && (
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] text-[#4a4c5e] uppercase tracking-widest">Font</span>
            <FontSelector
              fonts={activeConfig.fonts}
              value={cvData.fontFamily}
              onChange={updateFontFamily}
            />
          </div>
        )}
      </div>

      {/* Mobile Edit / Preview tab bar — hidden on lg+ where panels sit side by side */}
      <div className="lg:hidden sticky top-24 z-30 flex bg-[#13131A] border-b border-[#2a2a38] shrink-0">
        <button
          onClick={() => setMobileView("edit")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-medium border-b-2 transition-colors ${
            mobileView === "edit"
              ? "border-indigo-500 text-white"
              : "border-transparent text-[#8b8fa8] hover:text-[#c9cbd8]"
          }`}
        >
          <i className="fa-solid fa-pen-to-square text-xs"></i>
          Edit
        </button>
        <button
          onClick={() => setMobileView("preview")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-medium border-b-2 transition-colors ${
            mobileView === "preview"
              ? "border-indigo-500 text-white"
              : "border-transparent text-[#8b8fa8] hover:text-[#c9cbd8]"
          }`}
        >
          <i className="fa-solid fa-eye text-xs"></i>
          Preview
        </button>
      </div>

      {/* Main layout */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">

        {/* Left: form — hidden on mobile when preview tab is active */}
        <div className={`w-full lg:w-1/2 min-w-0 flex-col border-r border-[#2a2a38] ${mobileView === "preview" ? "hidden lg:flex" : "flex"}`}>
          <Workflow
            sections={sectionList.map(s => s.node)}
            labels={sectionList.map(s => s.label)}
          />

          <div className="px-4 sm:px-6 py-5 border-t border-[#2a2a38] flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              onClick={() => populateSampleData(activeConfig.demoData)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1a1a27] border border-[#2a2a38] hover:border-indigo-500/40 hover:bg-indigo-600/5 text-[#c9cbd8] hover:text-white text-sm font-medium rounded-lg transition-all"
            >
              <i className="fa-solid fa-wand-magic-sparkles text-indigo-400 text-xs"></i>
              Fill with demo data
            </button>
            <button
              onClick={() => clearCVData()}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-[#2a2a38] hover:border-rose-500/40 hover:bg-rose-600/5 text-[#8b8fa8] hover:text-rose-400 text-sm font-medium rounded-lg transition-all"
            >
              <i className="fa-solid fa-trash-can text-xs"></i>
              Clear all data
            </button>
          </div>
        </div>

        {/* Right: preview
            mobile: full viewport height minus topbar (56px) and tab bar (40px)
            desktop: sticky, full height minus topbar only */}
        <div className={`w-full lg:w-1/2 min-w-0 lg:sticky lg:top-24 lg:h-[calc(100vh-96px)] ${
          mobileView === "edit" ? "hidden lg:block" : "block h-[calc(100vh-136px)]"
        }`}>
          <Template html={htmlWithFont} pageSize={cvData.pageSize} fontFamily={cvData.fontFamily} />
        </div>
      </div>

      {/* Settings modal */}
      {showSettings && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setShowSettings(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#1a1a27] border border-[#2a2a38] rounded-lg w-full sm:max-w-sm flex flex-col max-h-[90vh] overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#2a2a38]">
              <h3 className="text-white font-bold text-sm tracking-tight">CV Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-[#8b8fa8] hover:text-white transition-colors p-1"
              >
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>

            <div className="p-4 flex flex-col gap-5 overflow-y-auto flex-1">
              <StorageTracker />
            </div>

            <div className="px-4 py-3 border-t border-[#2a2a38] flex justify-end">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded transition-colors"
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
