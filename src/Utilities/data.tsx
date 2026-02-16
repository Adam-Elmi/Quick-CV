import {
  SvgAd,
  SvgKey,
  SvgWindows,
  SvgFree,
  SvgAll,
  SvgTemplate,
  SvgEdit,
  SvgDownload,
  SvgHome,
  SvgAbout,
  SvgOpen,
  SvgCreate2,
} from "../Svg-Components/Svg";

// Used in Header and Sidebar components
const sections = [
  {
    section_name: "Home",
    path: "/",
    icon: <SvgHome width={28} height={28} />,
  },
  {
    section_name: "Templates",
    path: "/templates",
    icon: <SvgTemplate width={22} height={22} />,
  },
  {
    section_name: "Create cv",
    path: "/create-cv",
    icon: <SvgCreate2 />,
  },
  {
    section_name: "About",
    path: "/about",
    icon: <SvgAbout />,
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
    icon: <SvgFree />,
    feature: "No Payment",
    description: "Completely free to use.",
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
    icon: <SvgOpen />,
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
    icon: <SvgTemplate className="text-emerald-400" />,
  },
  {
    step: "2ND Step",
    toDo: "Fill Inputs",
    description: "Enter your details in the input boxes.",
    icon: <SvgEdit />,
  },
  {
    step: "3RD Step",
    toDo: "Download CV",
    description: `Click 'Download' to get your CV.`,
    icon: <SvgDownload />,
  },
];

const platforms = [
  {
    link: "https://github.com/Adam-Elmi/Quick-CV",
    icon: "fa-brands fa-github",
  },
  {
    link: "https://discord.gg/quickcv",
    icon: "fa-brands fa-discord",
  },
  {
    link: "https://x.com",
    icon: "fa-brands fa-x-twitter",
  },
];

const aboutQuickCvIntro = {
  title: "Intro",
  text: "Quick-CV was born from a simple need: a faster, no-hassle way to build a professional CV. No complexity, just speed.",
  icon: "fa-solid fa-user",
};

const aboutQuickCvProblems = {
  title: "The Problem",
  text: "Most CV builders are filled with ads, forced sign-ups, and hidden paywalls that block your downloads.",
  icon: "fa-solid fa-circle-exclamation",
};

const aboutQuickCvSolution = {
  title: "The Solution",
  text: "A clean, open-source tool where you can start anywhere, edit instantly, and download for free.",
  icon: "fa-solid fa-lightbulb",
};

const aboutQuickCvConclusion = {
  title: "Goal",
  text: "Making professional CV creation stress-free for everyone. Open for contributions and feedback.",
  icon: "fa-solid fa-bullseye",
};

const aboutQuickCv = [
  aboutQuickCvIntro,
  aboutQuickCvProblems,
  aboutQuickCvSolution,
  aboutQuickCvConclusion,
];

export { sections, features, steps, platforms, aboutQuickCv };
