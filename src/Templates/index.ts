import basic_cv from "./basic-cv/basic_cv";
import modern_sidebar from "./modern-sidebar/modern_sidebar";

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
        id: "basic",
        name: "Basic CV",
        description: "A simple, clean layout that is easy to read.",
        builder: basic_cv,
        tags: ["basic", "simple", "clean"]
    },
    {
        id: "modern-sidebar",
        name: "Modern Sidebar",
        description: "A professional two-column layout with a bold sidebar.",
        builder: modern_sidebar,
        tags: ["modern", "sidebar", "professional"]
    }
];

export const DEFAULT_TEMPLATE_ID = "basic";
