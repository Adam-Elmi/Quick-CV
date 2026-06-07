import { Document, Page, Font } from "@react-pdf/renderer";
import HTML from "react-pdf-html";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
});

export default function MyDocument({ html }: { html: string }) {
  return (
    <Document>
      <Page size="A4">
        <HTML>{html}</HTML>
      </Page>
    </Document>
  );
}
