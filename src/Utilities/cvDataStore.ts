import { useState, useEffect } from "react";

export const CV_DATA_CHANGE_EVENT = 'cv-data-change';

export const dispatchCVDataChange = () => {
    window.dispatchEvent(new CustomEvent(CV_DATA_CHANGE_EVENT));
};

type CVValue = string;

export interface CVData {
    profile: {
        firstName: string;
        lastName: string;
        title: string;
        email1: string;
        email2: string;
        phone1: string;
        phone2: string;
        country: string;
        city: string;
        street1: string;
        street2: string;
        links: { id: string; value: string }[];
        picture: string;
        sectionTitle: string;
    };
    education: {
        school: string;
        degree: string;
        city: string;
        startDate: string;
        endDate: string;
        description: string;
    }[];
    experience: {
        position: string;
        company: string;
        city: string;
        startDate: string;
        endDate: string;
        responsibilities: string;
    }[];
    skills: { name: string }[];
    projects: {
        name: string;
        description: string;
        link: string;
        techStack: string;
    }[];
    languages: {
        language: string;
        proficiency: string;
    }[];
    awards: {
        name: string;
        organization: string;
        date: string;
        description: string;
    }[];
    settings: {
        [key: string]: boolean;
    };
    selectedTemplate: string;
}

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

// Memory cache to prevent expensive localStorage lookups on every keystroke
let cachedData: CVData | null = null;

const getVal = (key: string): CVValue => {
    try {
        const item = localStorage.getItem(key);
        if (!item) return "";

        if (item.startsWith('data:image') || item.length > 500) return item;

        try {
            const parsed = JSON.parse(item);
            if (parsed && typeof parsed === 'object' && 'value' in parsed) {
                return parsed.value || "";
            }
            return String(parsed);
        } catch {
            return item;
        }
    } catch (e) {
        return "";
    }
};

export const getCVData = (): CVData => {
    const t1 = performance.now();
    if (cachedData) return cachedData;

    const profileLinksIds = JSON.parse(localStorage.getItem("Profile_Link_IDs") || "[]");
    const skillsIds = JSON.parse(localStorage.getItem("Skills_IDs") || "[]");
    const educationIds = JSON.parse(localStorage.getItem("Education_IDs") || "[]");
    const experienceIds = JSON.parse(localStorage.getItem("Experience_IDs") || "[]");
    const projectsIds = JSON.parse(localStorage.getItem("Projects_IDs") || "[]");
    const languagesIds = JSON.parse(localStorage.getItem("Languages_IDs") || "[]");
    const awardsIds = JSON.parse(localStorage.getItem("Awards_IDs") || "[]");

    const data: CVData = {
        profile: {
            firstName: getVal("First-Name"),
            lastName: getVal("Last-Name"),
            title: getVal("Title"),
            email1: getVal("Email-1"),
            email2: getVal("Email-2"),
            phone1: getVal("Phone-1"),
            phone2: getVal("Phone-2"),
            country: getVal("Country"),
            city: getVal("City"),
            street1: getVal("Street-1"),
            street2: getVal("Street-2"),
            sectionTitle: getVal("Section-Title-Profile"),
            picture: getVal("Profile-Picture"),
            links: profileLinksIds.map((id: string) => ({ id, value: getVal(id) })),
        },
        education: educationIds.map((id: string) => ({
            school: getVal(`${id}_School`),
            degree: getVal(`${id}_Degree`),
            city: getVal(`${id}_City`),
            startDate: getVal(`${id}_Start-Date`),
            endDate: getVal(`${id}_End-Date`),
            description: getVal(`${id}_Description`),
        })),
        experience: experienceIds.map((id: string) => ({
            position: getVal(`${id}_Position`),
            company: getVal(`${id}_Company`),
            city: getVal(`${id}_City`),
            startDate: getVal(`${id}_Start-Date`),
            endDate: getVal(`${id}_End-Date`),
            responsibilities: getVal(`${id}_Responsibilities`),
        })),
        skills: skillsIds.map((id: string) => ({
            name: getVal(`${id}_Skill`),
        })),
        projects: projectsIds.map((id: string) => ({
            name: getVal(`${id}_Project-Name`),
            description: getVal(`${id}_Description`),
            link: getVal(`${id}_Link`),
            techStack: getVal(`${id}_Tech-Stack`),
        })),
        languages: languagesIds.map((id: string) => ({
            language: getVal(`${id}_Language`),
            proficiency: getVal(`${id}_Proficiency`),
        })),
        awards: awardsIds.map((id: string) => ({
            name: getVal(`${id}_Award-Name`),
            organization: getVal(`${id}_Organization`),
            date: getVal(`${id}_Date`),
            description: getVal(`${id}_Description`),
        })),
        settings: JSON.parse(localStorage.getItem("cv_settings") || "{\"education\":true, \"experience\":true, \"skills\":true, \"projects\":true, \"languages\":false, \"awards\":false}"),
        selectedTemplate: localStorage.getItem("selectedTemplate") || "modern-sidebar",
    };

    cachedData = data;
    const t2 = performance.now();
    if (t2 - t1 > 10) {
        console.warn(`[PERF] getCVData took ${(t2 - t1).toFixed(2)}ms! This is likely the lag source.`);
    }
    return data;
};

// ACTIONS
export const updateCVSettings = (settings: any) => {
    localStorage.setItem("cv_settings", JSON.stringify(settings));
    cachedData = null;
    dispatchCVDataChange();
};

export const selectTemplate = (id: string) => {
    localStorage.setItem("selectedTemplate", id);
    cachedData = null;
    dispatchCVDataChange();
};

export const populateSampleData = () => {
    localStorage.setItem("First-Name", "Adam");
    localStorage.setItem("Last-Name", "Elmi");
    localStorage.setItem("Title", "Senior Software Engineer");
    localStorage.setItem("Email-1", "adam@example.com");
    localStorage.setItem("Phone-1", "+1 234 567 890");
    localStorage.setItem("City", "New York");
    localStorage.setItem("Country", "USA");
    cachedData = null;
    dispatchCVDataChange();
};

export const clearCVData = () => {
    localStorage.clear();
    cachedData = null;
    dispatchCVDataChange();
    window.location.reload();
};

export function useCVData() {
    const [data, setData] = useState<CVData>(getCVData());
    useEffect(() => {
        const handleStorageChange = () => {
            cachedData = null;
            setData(getCVData());
        };
        window.addEventListener(CV_DATA_CHANGE_EVENT, handleStorageChange);
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener(CV_DATA_CHANGE_EVENT, handleStorageChange);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);
    return data;
}

import { TEMPLATES } from '../Templates';

export function useActiveTemplateConfig(): TemplateConfig {
    const data = useCVData();
    const activeTemplate = TEMPLATES.find(t => t.id === data.selectedTemplate) || TEMPLATES[0];
    return activeTemplate.config;
}
