import Profile from "../Form-Components/Profile";
import Workflow from "../Helper-Components/Workflow";
// import GenerateCV from "../Helper-Components/GenerateCv";
import Template from "./Template";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import { SvgHome, SvgTemplate } from "../Svg-Components/Svg";

export default function CV() {
  return (
    <div className=" w-full flex flex-col justify-center items-center">
      <div className="w-full min-h-[70px] bg-slate-900 flex justify-between items-center px-2">
        <div className="flex items-center gap-1">
          <a href="/">
            <button
              title="Home"
              className="text-white cursor-pointer flex gap-2 justify-center items-center p-2 rounded-md"
            >
              <span className="text-slate-500 text-[1.2rem]">
                <SvgHome width={28} height={28}/>
              </span>
            </button>
          </a>
          <a href="templates">
            <button
              title="Templates"
              className="text-white cursor-pointer flex gap-2 justify-center items-center p-2 rounded-md"
            >
              <span className="text-slate-500 text-[1.2rem]">
                <SvgTemplate width={20} height={20}/>
              </span>
            </button>
          </a>
        </div>
        <PDFDownloadLink document={<MyDocument />} fileName="document.pdf">
          {({ loading }) =>
            loading ? (
              "Loading document..."
            ) : (
              <button className="text-white cursor-pointer bg-indigo-600 flex gap-2 justify-center items-center border-2 border-slate-700 p-2 rounded-md">
                <span className="font-medium">Download</span>
                <span className="fa-solid fa-download"></span>
              </button>
            )
          }
        </PDFDownloadLink>
      </div>
      <div className="w-full flex max-lg:flex-col">
        {/* Input Form */}
        <div className="flex-1 flex gap-5 shadow-md">
          <Workflow
            sections={[
              <Profile key={"Profile"} />,
              (function Education() {
                return "Education"
              })(),
              (function Experience() {
                return "Experience";
              })(),
              (function Skills() {
                return "Skills";
              })(),
              (function Projects() {
                return "Projects";
              })(),
              (function Languages() {
                return "Languages";
              })(),
              (function Hobbies() {
                return "Hobbies";
              })(),
            ]}
          />
        </div>
        <Template />
      </div>
    </div>
  );
}
