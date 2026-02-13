import { Document, Page, Font } from "@react-pdf/renderer";
import HTML from "react-pdf-html";
Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
});
import { useCVData } from "../Utilities/cvDataStore";
import { TEMPLATES } from "../Templates";
export default function MyDocument() {
  const cvData = useCVData();
  const activeTemplate = TEMPLATES.find(t => t.id === cvData.selectedTemplate) || TEMPLATES[0];
  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <HTML>{activeTemplate.builder(cvData)}</HTML>
      </Page>
    </Document>
  );
}
