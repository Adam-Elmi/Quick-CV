import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TEMPLATES } from "../Templates";
import { selectTemplate } from "../Utilities/cvDataStore";

function TemplatePreview({ templateId, name }: { templateId: string; name: string }) {
  const [missing, setMissing] = useState(false);

  if (missing) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[#1a1a27]">
        <i className="fa-regular fa-file-lines text-3xl text-[#3d3f52]" />
        <span className="mono text-[#3d3f52] text-xs tracking-wider uppercase">{name}</span>
      </div>
    );
  }

  return (
    <img
      src={`/previews/${templateId}.png`}
      alt={`${name} preview`}
      className="w-full h-full object-cover object-top"
      onError={() => setMissing(true)}
    />
  );
}

export default function Templates() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredTemplates = TEMPLATES.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSelect = (id: string) => {
    selectTemplate(id);
    navigate("/create-cv");
  };

  return (
    <div className="min-h-screen bg-[#13131A]">
      {/* Header */}
      <section className="border-b border-[#2a2a38] py-16 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-5xl mx-auto relative">
          <p className="mono text-indigo-400 text-xs font-medium tracking-widest uppercase mb-3">
            Templates
          </p>
          <h1 className="text-white font-extrabold text-4xl sm:text-5xl tracking-tight mb-4">
            Choose your starting point.
          </h1>
          <p className="text-[#8b8fa8] text-base mb-8 max-w-lg">
            Pick a template and start filling in your details. Switch anytime without losing your data.
          </p>
          <div className="relative max-w-sm">
            <i className="fa-solid fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8b8fa8] text-xs pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates…"
              className="w-full bg-[#1a1a27] border border-[#2a2a38] focus:border-indigo-500/60 text-white text-sm placeholder-[#8b8fa8] rounded px-4 py-2.5 pl-9 outline-none transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-24 border border-[#2a2a38] rounded-lg bg-[#1a1a27]">
              <i className="fa-regular fa-folder-open text-4xl text-[#3d3f52] mb-4 block" />
              <p className="text-[#8b8fa8] text-sm">No templates match "{search}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="bg-[#1a1a27] border border-[#2a2a38] hover:border-indigo-500/50 rounded-lg overflow-hidden flex flex-col transition-colors group cursor-pointer"
                  onClick={() => handleSelect(template.id)}
                >
                  {/* Preview thumbnail */}
                  <div className="relative h-56 border-b border-[#2a2a38] overflow-hidden">
                    <TemplatePreview templateId={template.id} name={template.name} />
                    <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-600 text-white text-xs font-semibold px-4 py-2 rounded shadow-lg">
                        Use this template
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 flex flex-col gap-3">
                    <div>
                      <h3 className="text-white font-bold text-sm tracking-tight mb-1">
                        {template.name}
                      </h3>
                      <p className="text-[#8b8fa8] text-xs leading-relaxed line-clamp-2">
                        {template.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {template.tags.map((tag) => (
                        <span
                          key={tag}
                          className="mono text-[10px] px-2 py-0.5 bg-[#13131A] border border-[#2a2a38] text-[#8b8fa8] rounded uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
