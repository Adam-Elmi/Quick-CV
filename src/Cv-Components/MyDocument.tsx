import { Document, Page } from "@react-pdf/renderer";
import HTML from "react-pdf-html";
import basic_cv from "../Templates/basic-cv/basic_cv";


export default function MyDocument() {
  return (
    <Document>
      <Page size="A4">
        <HTML>{basic_cv()}</HTML>
      </Page>
    </Document>
  );
}
