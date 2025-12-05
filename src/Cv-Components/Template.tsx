import { BlobProvider } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";

function Template() {
  return (
    <div className="w-[595px] max-lg:w-full h-screen p-3">
      <BlobProvider document={<MyDocument />}>
        {({ url, loading }) => {
          if (loading) return <span>Generating PDF…</span>;

          return (
            <div>
              <button
                className="bg-blue-500 p-2 text-white cursor-pointer hover:text-blue-200 rounded-lg"
                onClick={() => {
                  if (url) window.open(url, "_blank", "noopener,noreferrer");
                }}
              >
                Preview PDF
              </button>

              <div style={{ marginTop: 20, height: "100vh" }}>
                <embed
                  src={url ? url : undefined}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          );
        }}
      </BlobProvider>
    </div>
  );
}

export default Template;
