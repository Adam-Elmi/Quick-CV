import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TEMPLATES } from "../Templates";
import { selectTemplate } from "../Utilities/cvDataStore";
export default function Templates() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const filteredTemplates = TEMPLATES.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );
  const handleSelect = (id: string) => {
    selectTemplate(id);
    navigate("/create-cv");
  };
  return (
    <div
      className="min-h-screen bg-[#fafafa] pb-20 relative overflow-x-hidden font-inter"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.015) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }}
    >
      {/* Header Section */}
      <div className="relative z-10 pt-16 pb-12 px-6 max-w-7xl mx-auto">
        <div className="text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-[#171717] mb-6">
            Choose your <span className="text-[#2b58d0]">starting point</span>
          </h1>
          <p className="max-w-2xl text-xl text-[#6b7280] leading-relaxed font-semibold mb-10">
            Select a high-performance template to jumpstart your career.
            Engineered for clarity and professional impact.
          </p>

          <div className="max-w-xl relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#6b7280] group-focus-within:text-[#2b58d0] transition-colors">
              <i className="fa-solid fa-search text-lg"></i>
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-md border border-[#0000001a] rounded-2xl text-[#171717] placeholder-[#9ca3af] font-semibold focus:outline-none focus:ring-2 focus:ring-[#2b58d020] focus:border-[#2b58d066] transition-all shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]"
              placeholder="Search templates (e.g. Modern, Classic)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 pb-20">
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-32 bg-white/40 backdrop-blur-sm border border-[#0000000d] rounded-3xl shadow-sm">
            <div className="text-[#9ca3af] text-6xl mb-6 opacity-50">
              <i className="fa-regular fa-folder-open"></i>
            </div>
            <h3 className="text-2xl font-black text-[#171717] tracking-tighter">No templates found</h3>
            <p className="mt-2 text-[#6b7280] font-semibold">Try adjusting your search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                onClick={() => handleSelect(template.id)}
                className="group bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-[#0000001a] shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-[#2b58d04d] transition-all duration-500 overflow-hidden flex flex-col transform hover:-translate-y-2 cursor-pointer"
              >
                {/* Preview Area */}
                <div className="h-64 bg-[#f9fafb] flex items-center justify-center relative overflow-hidden border-b border-[#00000005]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f1f5f9] to-[#f8fafc] opacity-50"></div>

                  {/* Decorative Template Icon/Thumbnail */}
                  <div className="relative z-10 w-32 h-44 bg-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] rounded-lg border border-[#0000000d] p-3 transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-500">
                    <div className="h-3 w-full bg-[#2b58d01a] mb-2 rounded-sm overflow-hidden">
                      <div className={`h-full bg-[#2b58d0] transition-all duration-700 w-0 group-hover:w-full`}></div>
                    </div>
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-1.5 w-full bg-[#f1f5f9] mb-1.5 rounded-sm"></div>
                    ))}
                    <div className="mt-4 flex gap-1">
                      <div className="h-4 w-4 rounded-full bg-[#f1f5f9]"></div>
                      <div className="h-4 w-full bg-[#f1f5f9] rounded-sm"></div>
                    </div>
                  </div>

                  {/* Hover Overlay Action */}
                  <div className="absolute inset-0 bg-[#17171705] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() => handleSelect(template.id)}
                      className="bg-[#2b58d0] text-white px-8 py-3 rounded-xl font-black text-sm shadow-[0_-3px_0_0_rgba(0,0,0,0.2)_inset,0_4px_12px_rgba(43,88,208,0.2)] hover:bg-[#3b68e0] transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 active:translate-y-px active:shadow-none"
                    >
                      Use Template
                    </button>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-black text-[#171717] tracking-tighter group-hover:text-[#2b58d0] transition-colors">
                      {template.name}
                    </h3>
                  </div>
                  <p className="text-[#6b7280] text-lg leading-relaxed font-semibold mb-8 flex-1 line-clamp-2">
                    {template.description}
                  </p>
                  <div className="flex flex-wrap gap-2.5 mt-auto">
                    {template.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-[#f3f4f6] text-[#6b7280] text-xs rounded-lg font-bold border border-[#00000008] uppercase tracking-wider transition-colors group-hover:bg-[#2b58d00d] group-hover:text-[#2b58d0]"
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
    </div>
  );
}