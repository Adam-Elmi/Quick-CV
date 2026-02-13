import buildModern from "./builder-demos/demo_modern";
import buildClassic from "./builder-demos/demo_classic";
import buildModernPro from "./builder-demos/demo_pro";

export interface Template {
    id: string;
    name: string;
    description: string;
    builder: (data: any) => string;
    tags: string[];
    thumbnail?: string;
}

export const TEMPLATES: Template[] = [
    {
        id: "modern",
        name: "Modern Blue",
        description: "A clean, professional design with blue accents and pill-shaped skills.",
        builder: buildModern,
        tags: ["modern", "professional", "blue"]
    },
    {
        id: "modern-pro",
        name: "Modern Pro (HTML)",
        description: "High-end two-column layout built dynamically from an external HTML file.",
        builder: buildModernPro,
        tags: ["modern", "dark", "sidebar", "html"]
    },
    {
        id: "classic",
        name: "Classic Serif",
        description: "Traditional layout using Times New Roman. Perfect for academic or formal CVs.",
        builder: buildClassic,
        tags: ["classic", "simple", "serif"]
    }
];

export const DEFAULT_TEMPLATE_ID = "modern";
