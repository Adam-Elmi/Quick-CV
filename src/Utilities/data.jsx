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
  SvgTeam,
  SvgAbout,
  SvgFile,
  SvgOpen,
} from "../Svg-Components/Svg";

// Used in Header and Sidebar components
const sections = [
  {
    section_name: "Home",
    path: "/",
    icon: <SvgHome />,
  },
  {
    section_name: "Templates",
    path: "/templates",
    icon: <SvgFile />,
  },
  {
    section_name: "Create cv",
    path: "/create-cv",
    icon: <SvgFile />,
  },
  {
    section_name: "Contributors",
    path: "/contributors",
    icon: <SvgTeam />,
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
    icon: <SvgTemplate />,
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
  text: `
Hi, I’m Adam Elmi, the creator of Quick-CV. I built this tool because most CV websites felt too slow or complicated. I just wanted a fast, easy way to create a CV.
`,
  icon: "fa-solid fa-user",
};

const aboutQuickCvProblems = {
  title: "Problems",
  text: `
Many CV websites are hard to use. They have too many pop-ups, make you sign up, or ask for money to download. If you want to change something, you often have to start all over again.`,
  icon: "fa-solid fa-bug",
};

const aboutQuickCvSolution = {
  title: "Solution",
  text: `
These things take too much time. Most CV tools don’t really help. I wanted something simple and quick—where I can start anywhere, change things fast, and not deal with all the problems. That’s why I made Quick-CV.`,
  icon: "fa-solid fa-lightbulb",
};

const aboutQuickCvConclusion = {
  title: "Conclusion",
  text: `
Thank you in advance to anyone who contributes to this project in the future.
I hope it makes CV creation stress-free.
`,
  icon: "fa-solid fa-check",
};

const aboutQuickCv = [
  aboutQuickCvIntro,
  aboutQuickCvProblems,
  aboutQuickCvSolution,
  aboutQuickCvConclusion,
];

export { sections, features, steps, platforms, aboutQuickCv };
