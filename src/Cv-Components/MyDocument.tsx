import { Document, Page, Font } from "@react-pdf/renderer";
import HTML from "react-pdf-html";
import { useCVData } from "../Utilities/cvDataStore";
import { TEMPLATES } from "../Templates";
import { renderTemplate } from "../Utilities/placeholderRenderer";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
});

export default function MyDocument() {
  const cvData = useCVData();
  const activeTemplate = TEMPLATES.find(t => t.id === cvData.selectedTemplate) || TEMPLATES[0];

  const rawHtml = activeTemplate.builder(cvData);
  const renderedHtml = renderTemplate(rawHtml, cvData);

  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <HTML>{renderedHtml}</HTML>
      </Page>
    </Document>
  );
}
