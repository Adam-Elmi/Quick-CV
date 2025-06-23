import { Document, Page } from "@react-pdf/renderer";
import imageSrc from "../assets/media/naruto_togather.jpg";
import HTML from "react-pdf-html";
const color = "red";
const htmlContent = `
  <h1 style="color: ${color}; border: 2px dotted red">Adam Elmi</h1>
  <p>Self-taught developer from Somaliland</p>
  <img style="width: 500px" src=${imageSrc}/>
  <ul>
    <li style="color: green;">SomCheat</li>
    <li>SomBot</li>
    <li>SomGlossary</li>
  </ul>
`;

const MyDocument = () => (
  <Document>
    <Page size="A4">
      <HTML>{htmlContent}</HTML>
    </Page>
  </Document>
);

export default MyDocument;
