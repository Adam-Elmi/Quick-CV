import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./React-pdf";
export default function Template() {
  return (
    <PDFViewer width="100%" height="600">
      <MyDocument />
    </PDFViewer>
  );
}
