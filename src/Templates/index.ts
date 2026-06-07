import { transpileCV, registerVirtualModule } from "../Utilities/sommarkRenderer";
import basic_cv_src from "./basic-cv/basic_cv.smark?raw";
import modern_sidebar_src from "./modern-sidebar/modern_sidebar.smark?raw";
import { basicCvConfig } from "./basic-cv/config";
import { modernSidebarConfig } from "./modern-sidebar/config";

// Raw section imports for Basic CV
import profile_smark from "./basic-cv/sections/profile.smark?raw";
import social_links_smark from "./basic-cv/sections/social_links.smark?raw";
import experience_smark from "./basic-cv/sections/experience.smark?raw";
import education_smark from "./basic-cv/sections/education.smark?raw";
import skills_smark from "./basic-cv/sections/skills.smark?raw";

// Raw section imports for Modern Sidebar
import modern_profile_smark from "./modern-sidebar/sections/profile.smark?raw";
import modern_contact_smark from "./modern-sidebar/sections/contact.smark?raw";
import modern_social_links_smark from "./modern-sidebar/sections/social_links.smark?raw";
import modern_skills_smark from "./modern-sidebar/sections/skills.smark?raw";
import modern_experience_smark from "./modern-sidebar/sections/experience.smark?raw";
import modern_education_smark from "./modern-sidebar/sections/education.smark?raw";

// Register templates in the virtual filesystem module cache of SomMark
// Basic CV
registerVirtualModule("/templates/basic-cv/sections/profile.smark", profile_smark);
registerVirtualModule("/templates/basic-cv/sections/social_links.smark", social_links_smark);
registerVirtualModule("/templates/basic-cv/sections/experience.smark", experience_smark);
registerVirtualModule("/templates/basic-cv/sections/education.smark", education_smark);
registerVirtualModule("/templates/basic-cv/sections/skills.smark", skills_smark);

// Modern Sidebar
registerVirtualModule("/templates/modern-sidebar/sections/profile.smark", modern_profile_smark);
registerVirtualModule("/templates/modern-sidebar/sections/contact.smark", modern_contact_smark);
registerVirtualModule("/templates/modern-sidebar/sections/social_links.smark", modern_social_links_smark);
registerVirtualModule("/templates/modern-sidebar/sections/skills.smark", modern_skills_smark);
registerVirtualModule("/templates/modern-sidebar/sections/experience.smark", modern_experience_smark);
registerVirtualModule("/templates/modern-sidebar/sections/education.smark", modern_education_smark);

export interface TemplateConfig {
    name: string;
    description: string;
    features: {
        picture: boolean;
        socialLinks: { max: number };
        skills: { max: number };
    };
    requiredFields: string[];
}

export interface Template {
    id: string;
    name: string;
    description: string;
    tags: string[];
    builder: (data: any, isLazy?: boolean) => Promise<string>;
    config: TemplateConfig;
}

export const TEMPLATES: Template[] = [
    {
        id: "basic",
        name: "Basic CV",
        description: "A clean, standard academic and professional layout.",
        tags: ["basic", "simple", "clean"],
        builder: async (data: any, isLazy: boolean = false) => {
            return await transpileCV(basic_cv_src, data, isLazy, "basic_cv.smark", "/templates/basic-cv");
        },
        config: basicCvConfig
    },
    {
        id: "modern-sidebar",
        name: "Modern Sidebar",
        description: "A professional two-column layout with a bold sidebar.",
        tags: ["modern", "sidebar", "professional"],
        builder: async (data: any, isLazy: boolean = false) => {
            return await transpileCV(modern_sidebar_src, data, isLazy, "modern_sidebar.smark", "/templates/modern-sidebar");
        },
        config: modernSidebarConfig
    }
];
