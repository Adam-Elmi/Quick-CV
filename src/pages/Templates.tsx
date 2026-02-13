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
    <div className="min-h-screen bg-slate-50 font-inter">
      {}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-slate-900">Choose a Template</h1>
          <p className="mt-2 text-slate-600">
            Select a professional design to get started. You can change this later.
          </p>
          {}
          <div className="mt-6 max-w-lg relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa-solid fa-search text-slate-400"></i>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow shadow-sm"
              placeholder="Search templates (e.g. Modern, Classic)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      {}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-slate-400 text-5xl mb-4">
              <i className="fa-regular fa-folder-open"></i>
            </div>
            <h3 className="text-lg font-medium text-slate-900">No templates found</h3>
            <p className="mt-1 text-slate-500">Try adjusting your search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {}
                <div className="h-48 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 opacity-50"></div>
                  {}
                  {template.id === 'modern' ? (
                    <div className="w-24 h-32 bg-white shadow-lg rounded-sm border border-slate-200 p-2 transform group-hover:scale-105 transition-transform duration-300">
                      <div className="h-2 w-full bg-blue-600 mb-2"></div>
                      <div className="h-2 w-1/2 bg-slate-200 rounded mb-1"></div>
                      <div className="h-1 w-3/4 bg-slate-100 rounded"></div>
                    </div>
                  ) : (
                    <div className="w-24 h-32 bg-white shadow-lg rounded-sm border border-slate-200 p-2 transform group-hover:scale-105 transition-transform duration-300 flex flex-col items-center">
                      <div className="h-2 w-1/2 bg-slate-800 mb-2 rounded-sm"></div>
                      <div className="h-px w-full bg-slate-300 mb-2"></div>
                      <div className="h-1 w-full bg-slate-100 rounded mb-1"></div>
                      <div className="h-1 w-full bg-slate-100 rounded"></div>
                    </div>
                  )}
                  {}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transaction-colors flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleSelect(template.id)}
                      className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-slate-50 transform translate-y-2 group-hover:translate-y-0 transition-all"
                    >
                      Use Template
                    </button>
                  </div>
                </div>
                {}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {template.name}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 mb-4 flex-1">
                    {template.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {template.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">
                        #{tag}
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