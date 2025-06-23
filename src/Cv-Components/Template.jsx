import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./React-pdf";
export default function Template() {
  return (
    <>
      {/* <PDFDownloadLink document={<MyDocument />} fileName="document.pdf">
        {({ loading }) =>
          loading ? "Loading document..." : <button>Download</button>
        }
      </PDFDownloadLink> */}
      <PDFViewer width="100%" height="600">
        <MyDocument />
      </PDFViewer>
    </>
  );
}
