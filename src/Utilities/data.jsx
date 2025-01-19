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
  SvgEnvelope,
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
  {
    section_name: "Contact",
    path: "/contact",
    icon: <SvgEnvelope />,
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
Hi, my name is Adam Elmi, and I created Quick-CV. I made this tool because I was tired of the problems with other CV-making websites. Sometimes I needed to update an old CV or make a new one quickly, but the existing tools made it way harder than it needed to be.
`,
  icon: "fa-solid fa-user",
};

const aboutQuickCvProblems = {
  title: "Problems",
  text: `
A lot of CV websites have annoying features. They have too many pop-ups and ask tons of questions. Some force you to sign up for an account, which I don't like. Others let you create a CV but then make you pay before you can download it. Worst of all, many of these websites aren't flexible. If you want to go back and change something, it's really hard, and you often have to redo everything. 
`,
  icon: "fa-solid fa-bug",
};

const aboutQuickCvSolution = {
  title: "Solution",
  text: `
These things waste so much time. I realized most of these tools don't really help. I wanted something simple, fast, and easy to use—a tool where I could start from any section, edit quickly, and not deal with all the annoying stuff. That's why I created Quick-CV.
`,
  icon: "fa-solid fa-lightbulb",
};

const aboutQuickCvConclusion = {
  title: "Conclusion",
  text: `
It wasn't easy. There were times when I thought about giving up. But now, I've done it, and Quick-CV is here. It's flexible, simple, and saves you time. Thank you in advance to anyone who contributes to this project in the future.
Thank you to everyone who helped create Quick-CV. I hope it makes CV creation stress-free.
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
