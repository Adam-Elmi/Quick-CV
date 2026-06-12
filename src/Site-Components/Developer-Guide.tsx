import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SMARK_TOKENS = {
  tokens: {
    IDENTIFIER: "#60a5fa",
    KEY: "#34d399",
    END_KEYWORD: { color: "#6366f1", bold: true },
    COMMENT: { color: "#4b4f68", italic: true },
    COMMENT_BLOCK: { color: "#4b4f68", italic: true },
    PREFIX_P: "#fb923c",
    PREFIX_JS: "#facc15",
    STATIC_KEYWORD: "#c084fc",
    RUNTIME_KEYWORD: "#c084fc",
    FOR_EACH: "#c084fc",
    IMPORT: "#c084fc",
    USE_MODULE: "#c084fc",
  },
  other: "#8b8fa8",
};

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  if (lang === "smark") {
    const hl = (window as any).SomMarkHighlight;
    const html = hl ? hl.staticHighlight(code, SMARK_TOKENS) : code;
    return (
      <pre
        className="mono text-xs leading-relaxed p-5 overflow-x-auto"
        style={{ background: "#13131A", margin: 0 }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  return (
    <SyntaxHighlighter
      language={lang}
      style={vscDarkPlus}
      customStyle={{ margin: 0, padding: "16px 20px", fontSize: "12px", lineHeight: "1.6", background: "#13131A" }}
      codeTagProps={{ className: "mono" }}
    >
      {code}
    </SyntaxHighlighter>
  );
}

const steps = [
  {
    label: "1. Create the folder",
    description: "Add a new folder under src/Templates/. The folder name becomes the template ID.",
    code: `src/Templates/
  my-template/
    my_template.smark   ← main layout
    config.ts           ← template settings
    sections/           ← reusable section files`,
    lang: "bash",
  },
  {
    label: "2. Write the layout in SomMark",
    description: "Import section files, apply styles, and place placeholders. Placeholder keys are flat strings — p{First-Name}, p{exp-1-position}, etc.",
    code: `[import = Experience: "./sections/experience.smark"][end]

@_style_@;
  body { font-family: 'Helvetica', sans-serif; }
@_end_@

# Profile
[div = fontSize: 20, fontWeight: bold]
  p{First-Name} p{Last-Name}
[end]
[div = fontSize: 13, color: "#64748b"]
  p{Title}
[end]

# Experience
[$use-module = Experience][end]`,
    lang: "smark",
  },
  {
    label: "3. Configure in config.ts",
    description: "Set the template name, fonts, demo data, field defaults, and which sections to hide.",
    code: `export const myTemplateConfig = {
  name: "My Template",
  description: "A clean one-column layout.",
  features: {
    picture: true,
    socialLinks: { max: 3 },
    skills: { max: 8 },
  },
  fonts: [
    { family: "Helvetica", label: "Helvetica" },
    { family: "Times-Roman", label: "Times Roman" },
  ],
  hiddenSections: ["Certifications"],
  demoData: {
    "First-Name": "Adam",
    "Last-Name":  "Elmi",
    "Title":      "Full-Stack Developer",
  },
  defaults: {
    "First-Name": "First Name",
    "exp-*-position": "Job Title",
  },
};`,
    lang: "typescript",
  },
  {
    label: "4. Register it",
    description: "In src/Templates/index.ts: import the smark files with ?raw, register each section as a virtual module, then add an entry to TEMPLATES with an inline builder.",
    code: `import { transpileCV, registerVirtualModule } from "../Utilities/sommarkRenderer";
import { myTemplateConfig } from "./my-template/config";
import my_template_src from "./my-template/my_template.smark?raw";
import my_experience from "./my-template/sections/experience.smark?raw";

registerVirtualModule(
  "/templates/my-template/sections/experience.smark",
  my_experience
);

export const TEMPLATES = [
  // ... existing templates
  {
    id: "my-template",
    name: myTemplateConfig.name,
    description: myTemplateConfig.description,
    tags: ["custom"],
    config: myTemplateConfig,
    builder: async (data, isLazy = false) =>
      transpileCV(
        my_template_src, data, isLazy,
        "my_template.smark",
        "/templates/my-template",
        myTemplateConfig.defaults
      ),
  },
];`,
    lang: "typescript",
  },
];

const syntax = [
  { token: "[div = marginTop: 10, color: \"#333\"]...[end]",  note: "Block element with inline styles" },
  { token: "p{First-Name}  p{exp-1-position}  p{summary}",    note: "Output a placeholder value (flat key)" },
  { token: "(bold text)->(bold)",                              note: "Inline text formatting" },
  { token: "[import = Name: \"./sections/exp.smark\"][end]",   note: "Import a section file (top of file only)" },
  { token: "[$use-module = Name][end]",                        note: "Render an imported section" },
  { token: "@_style_@; ... @_end_@",                           note: "Inject a raw CSS block" },
];

export default function DeveloperGuide() {
  return (
    <section className="bg-[#0f0f17] border-t border-[#2a2a38] py-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p className="mono text-indigo-400 text-xs font-medium tracking-widest uppercase mb-3">
            Contributing
          </p>
          <h2 className="text-white font-bold text-2xl sm:text-3xl tracking-tight mb-3">
            Adding a template.
          </h2>
          <p className="text-[#8b8fa8] text-sm leading-relaxed max-w-2xl">
            Templates are written in SomMark — a high-performance markup language designed for structured content,
            transformable into HTML and other formats. Each template is a folder with a layout file, section files, and a config.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-8 mb-16">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-6">
              <div className="sm:w-64 shrink-0">
                <p className="mono text-indigo-400 text-[10px] uppercase tracking-widest mb-1">{step.label}</p>
                <p className="text-[#8b8fa8] text-sm leading-relaxed">{step.description}</p>
              </div>
              <div className="flex-1 rounded-lg overflow-hidden border border-[#2a2a38]">
                <CodeBlock code={step.code} lang={step.lang} />
              </div>
            </div>
          ))}
        </div>

        {/* SomMark quick ref */}
        <div className="border border-[#2a2a38] rounded-lg overflow-hidden">
          <div className="px-5 py-3.5 border-b border-[#2a2a38] bg-[#13131A]">
            <p className="mono text-xs text-[#8b8fa8] uppercase tracking-widest">SomMark quick reference</p>
          </div>
          <div className="divide-y divide-[#2a2a38]">
            {syntax.map((row, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-5 py-3">
                <code className="mono text-indigo-300 text-xs sm:w-80 shrink-0">{row.token}</code>
                <span className="text-[#8b8fa8] text-sm">{row.note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="https://github.com/Adam-Elmi/Quick-CV"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded text-sm transition-colors"
          >
            <i className="fa-brands fa-github text-sm"></i>
            Fork on GitHub
          </a>
          <a
            href="https://github.com/Adam-Elmi/SomMark"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#3d3f52] hover:border-indigo-500/60 text-[#c9cbd8] hover:text-white font-semibold px-5 py-2.5 rounded text-sm transition-colors"
          >
            <i className="fa-solid fa-book text-xs"></i>
            SomMark docs
          </a>
        </div>

      </div>
    </section>
  );
}
