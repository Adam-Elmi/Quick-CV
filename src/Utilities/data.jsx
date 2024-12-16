import SvgAd from "../Svg-Components/Svg-Ad";
import SvgKey from "../Svg-Components/Svg-Key";
import SvgWindows from "../Svg-Components/Svg-Windows";
import SvgFree from "../Svg-Components/Svg-Free";
import SvgFork from "../Svg-Components/Svg-Fork";
import SvgAll from "../Svg-Components/Svg-All";
import SvgTmeplate from "../Svg-Components/Svg-Template";
import SvgEdit from "../Svg-Components/Svg-Edit";
import SvgDownload from "../Svg-Components/Svg-Download";
import SvgHome from "../Svg-Components/Svg-Home";
import SvgTemplate from "../Svg-Components/Svg-Template";
import SvgTeam from "../Svg-Components/Svg-Team";
import SvgAbout from "../Svg-Components/Svg-About";

// Used in Header and Sidebar components
const sections = [
  {
    section_name: "Home",
    path: "/",
    icon: <SvgHome/>,
  },
  {
    section_name: "Templates",
    path: "/templates",
    icon: <SvgTemplate/>,
  },
  {
    section_name: "Contribution",
    path: "/contribution",
    icon: <SvgTeam/>,
  },
  {
    section_name: "About",
    path: "/about",
    icon: <SvgAbout/>,
  },
  {
    section_name: "Contact",
    path: "/contact",
    icon: "fa-solid fa-envelope",
  },
];

// Used in Hero-Section Component
const features = [
  {
    icon: <SvgAd />,
    feature: "Ad-Free",
    description: "No advertisements to distract you.",
  },
  {
    icon: <SvgKey />,
    feature: "No Sign-Ups",
    description: "Use it without creating an account.",
  },
  {
    icon: <SvgWindows />,
    feature: "No Pop-Ups",
    description: "No interruptions or unnecessary prompts.",
  },
  {
    icon: <SvgFree />,
    feature: "No Payment",
    description: "Completely free to use.",
  },
  {
    icon: <SvgFork />,
    feature: "Open Source",
    description: "Free to view, use, and contribute to the code.",
  },
  {
    icon: <SvgAll />,
    feature: "Start Anywhere",
    description: "Edit any section you want first.",
  },
];

// Used in Steps-Section Component
const steps = [
  { 
    step: "1ST Step", 
    toDo: "Choose a Template", 
    description: "Go to the templates and choose one for your CV.",
    icon: <SvgTmeplate/>,
  },
  { 
    step: "2ND Step", 
    toDo: "Fill Inputs", 
    description: "Enter your details in the input boxes.",
    icon: <SvgEdit/>,
  },
  { 
    step: "3RD Step", 
    toDo: "Download CV", 
    description: `Click 'Download' to get your CV.`,
    icon: <SvgDownload/>,
  },
];

export { sections, features, steps };
