import React, { useRef, useEffect, useState } from 'react';
import { CVData } from '../Utilities/cvDataStore';
import { TEMPLATES } from '../Templates';
import { renderTemplate } from '../Utilities/placeholderRenderer';

interface LivePreviewProps {
  data: CVData;
}

export default function LivePreview({ data }: LivePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [renderedHtml, setRenderedHtml] = useState("");

  const activeTemplate = TEMPLATES.find(t => t.id === data.selectedTemplate) || TEMPLATES[0];

  useEffect(() => {
    const render = async () => {
      const html = await activeTemplate.builder(data);
      setRenderedHtml(html as string);
    };
    render();
  }, [data, activeTemplate]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length > 0 && containerRef.current) {
        const containerWidth = entries[0].contentRect.width;
        const targetWidth = 800; // Base width for A4
        const newScale = Math.min(1, (containerWidth - 40) / targetWidth);
        setScale(newScale);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const defaultFileName = (data.profile.firstName || data.profile.lastName)
    ? `${data.profile.firstName}_${data.profile.lastName}_CV.pdf`.replace(/^_+|_+$/g, '')
    : "My_CV.pdf";

  const [fileName, setFileName] = useState(() => localStorage.getItem("cv_filename") || "");

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFileName(value);
    localStorage.setItem("cv_filename", value);
    // Notify other components (like the download button)
    import("../Utilities/cvDataStore").then(m => m.dispatchCVDataChange());
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-100 overflow-hidden rounded-xl border border-slate-200 shadow-inner">
      <div className="w-full flex justify-between items-center px-4 py-2 bg-white border-b border-slate-200 shadow-sm z-10">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg border border-slate-100 text-[11px] font-bold text-slate-600 tracking-tight group">
            <i className="fa-solid fa-file-pdf text-red-500"></i>
            <input
              type="text"
              value={fileName || defaultFileName}
              onChange={handleFileNameChange}
              placeholder={defaultFileName}
              className="bg-transparent border-none outline-none focus:ring-0 w-48 hover:bg-slate-200/50 rounded px-1 transition-colors"
              title="Click to rename"
            />
          </div>
        </div>
      </div>
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center bg-slate-100/30 items-start"
      >
        <div
          className="bg-white shadow-2xl rounded-sm origin-top transition-all duration-300 overflow-hidden"
          style={{
            width: '800px',
            minWidth: '800px',
            height: '1132px', // A4 height based on 800px width
            minHeight: '1132px',
            transform: `scale(${scale})`,
            padding: '40px',
            marginBottom: `${(scale - 1) * 1132}px` // Adjust for scale offset
          }}
        >
          <div
            className="w-full h-full preview-content"
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />
        </div>
      </div>
      <style>{`
        .preview-content a { color: inherit; text-decoration: none; }
        .preview-content ul { list-style-type: disc; padding-left: 20px; }
        .preview-content h1, .preview-content h2, .preview-content h3 { margin-top: 0; }
      `}</style>
    </div>
  );
}
