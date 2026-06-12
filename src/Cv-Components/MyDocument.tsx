import { Document, Page } from "@react-pdf/renderer";
import HTML from "react-pdf-html";

const TEXT_ELEMENTS = ["body", "div", "p", "span", "h1", "h2", "h3", "h4", "h5", "h6", "li", "a", "strong", "em", "b", "i"];

export default function MyDocument({ html, pageSize = "A4", fontFamily = "Helvetica" }: { html: string; pageSize?: string; fontFamily?: string }) {
  const fontStylesheet = TEXT_ELEMENTS.reduce<Record<string, { fontFamily: string }>>((acc, el) => {
    acc[el] = { fontFamily };
    return acc;
  }, {});

  return (
    <Document>
      <Page size={pageSize as any}>
        <HTML stylesheet={fontStylesheet}>{html}</HTML>
      </Page>
    </Document>
  );
}
