import { BlobProvider } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import CustomPDFPreview from "./CustomPDFPreview";
function Template() {
  return (
    <div className="w-full h-[calc(100vh-120px)] lg:h-[calc(100vh-120px)] flex flex-col">
      <BlobProvider document={<MyDocument />}>
        {({ url, loading }) => {
          if (loading) return (
            <div className="flex items-center justify-center h-full bg-slate-50 rounded-xl border border-slate-200 text-slate-400 font-medium">
              Generating PDF...
            </div>
          );
          return (
            <div className="flex flex-col h-full gap-4">
              <div className="flex-1 min-h-0 bg-slate-100 rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                {}
                <CustomPDFPreview url={url} />
              </div>
              <div className="flex justify-end">
                <button
                  className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 hover:bg-slate-50 hover:text-indigo-600 rounded-lg text-sm font-medium transition-colors shadow-sm"
                  onClick={() => {
                    if (url) window.open(url, "_blank", "noopener,noreferrer");
                  }}
                >
                  <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                  Open in New Tab
                </button>
              </div>
            </div>
          );
        }}
      </BlobProvider>
    </div>
  );
}
export default Template;
