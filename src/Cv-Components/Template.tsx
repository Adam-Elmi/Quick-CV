import { BlobProvider } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import CustomPDFPreview from "./CustomPDFPreview";

export default function Template({ html }: { html: string }) {
  return (
    <div className="w-full h-[calc(100vh-120px)]">
      <BlobProvider document={<MyDocument html={html} />}>
        {({ url }) => (
          <CustomPDFPreview url={url} />
        )}
      </BlobProvider>
    </div>
  );
}
