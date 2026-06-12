import { BlobProvider } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import CustomPDFPreview from "./CustomPDFPreview";

export default function Template({ html, pageSize, fontFamily }: { html: string; pageSize?: string; fontFamily?: string }) {
  return (
    <div className="w-full h-full">
      <BlobProvider document={<MyDocument html={html} pageSize={pageSize} fontFamily={fontFamily} />}>
        {({ url }) => (
          <CustomPDFPreview url={url} />
        )}
      </BlobProvider>
    </div>
  );
}
