import { transpileCV, registerVirtualModule } from "../Utilities/sommarkRenderer";
import { Font } from "@react-pdf/renderer";
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
import projects_smark from "./basic-cv/sections/projects.smark?raw";
import languages_smark from "./basic-cv/sections/languages.smark?raw";
import awards_smark from "./basic-cv/sections/awards.smark?raw";
import certifications_smark from "./basic-cv/sections/certifications.smark?raw";

// Raw section imports for Modern Sidebar
import modern_profile_smark from "./modern-sidebar/sections/profile.smark?raw";
import modern_contact_smark from "./modern-sidebar/sections/contact.smark?raw";
import modern_social_links_smark from "./modern-sidebar/sections/social_links.smark?raw";
import modern_skills_smark from "./modern-sidebar/sections/skills.smark?raw";
import modern_experience_smark from "./modern-sidebar/sections/experience.smark?raw";
import modern_education_smark from "./modern-sidebar/sections/education.smark?raw";
import modern_projects_smark from "./modern-sidebar/sections/projects.smark?raw";
import modern_languages_smark from "./modern-sidebar/sections/languages.smark?raw";
import modern_awards_smark from "./modern-sidebar/sections/awards.smark?raw";
import modern_certifications_smark from "./modern-sidebar/sections/certifications.smark?raw";

// Register templates in the virtual filesystem module cache of SomMark
// Basic CV
registerVirtualModule("/templates/basic-cv/sections/profile.smark", profile_smark);
registerVirtualModule("/templates/basic-cv/sections/social_links.smark", social_links_smark);
registerVirtualModule("/templates/basic-cv/sections/experience.smark", experience_smark);
registerVirtualModule("/templates/basic-cv/sections/education.smark", education_smark);
registerVirtualModule("/templates/basic-cv/sections/skills.smark", skills_smark);
registerVirtualModule("/templates/basic-cv/sections/projects.smark", projects_smark);
registerVirtualModule("/templates/basic-cv/sections/languages.smark", languages_smark);
registerVirtualModule("/templates/basic-cv/sections/awards.smark", awards_smark);
registerVirtualModule("/templates/basic-cv/sections/certifications.smark", certifications_smark);

// Modern Sidebar
registerVirtualModule("/templates/modern-sidebar/sections/profile.smark", modern_profile_smark);
registerVirtualModule("/templates/modern-sidebar/sections/contact.smark", modern_contact_smark);
registerVirtualModule("/templates/modern-sidebar/sections/social_links.smark", modern_social_links_smark);
registerVirtualModule("/templates/modern-sidebar/sections/skills.smark", modern_skills_smark);
registerVirtualModule("/templates/modern-sidebar/sections/experience.smark", modern_experience_smark);
registerVirtualModule("/templates/modern-sidebar/sections/education.smark", modern_education_smark);
registerVirtualModule("/templates/modern-sidebar/sections/projects.smark", modern_projects_smark);
registerVirtualModule("/templates/modern-sidebar/sections/languages.smark", modern_languages_smark);
registerVirtualModule("/templates/modern-sidebar/sections/awards.smark", modern_awards_smark);
registerVirtualModule("/templates/modern-sidebar/sections/certifications.smark", modern_certifications_smark);

// Register web fonts declared by all template configs (built-ins like Helvetica need no registration)
const _allConfigs = [basicCvConfig, modernSidebarConfig];
const _registeredFonts = new Set<string>();
_allConfigs.forEach(config => {
    config.fonts?.forEach(font => {
        if (font.src && !_registeredFonts.has(font.family)) {
            Font.register({ family: font.family, src: font.src });
            _registeredFonts.add(font.family);
        }
    });
});

export interface TemplateConfig {
    name: string;
    description: string;
    features: {
        picture: boolean;
        socialLinks: { max: number };
        skills: { max: number };
    };
    requiredFields: string[];
    /**
     * Fallback values for empty placeholders, keyed by placeholder name.
     * Define these to keep your template's layout intact when a field is left blank.
     * Example: { "First-Name": "Your Name", "education_title": "EDUCATION" }
     */
    defaults?: Record<string, string>;
    fonts?: Array<{ family: string; src?: string; label?: string }>;
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
            return await transpileCV(basic_cv_src, data, isLazy, "basic_cv.smark", "/templates/basic-cv", basicCvConfig.defaults);
        },
        config: basicCvConfig
    },
    {
        id: "modern-sidebar",
        name: "Modern Sidebar",
        description: "A professional two-column layout with a bold sidebar.",
        tags: ["modern", "sidebar", "professional"],
        builder: async (data: any, isLazy: boolean = false) => {
            return await transpileCV(modern_sidebar_src, data, isLazy, "modern_sidebar.smark", "/templates/modern-sidebar", modernSidebarConfig.defaults);
        },
        config: modernSidebarConfig
    }
];
