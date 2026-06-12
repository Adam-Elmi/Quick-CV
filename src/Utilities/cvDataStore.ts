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
        summary: string;
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
    educationTitle: string;
    experienceTitle: string;
    skillsTitle: string;
    projectsTitle: string;
    languagesTitle: string;
    awardsTitle: string;
    certificationsTitle: string;
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
    certifications: {
        name: string;
        issuer: string;
        issueDate: string;
        expiryDate: string;
        credentialId: string;
        credentialUrl: string;
    }[];
    settings: {
        [key: string]: boolean;
    };
    selectedTemplate: string;
    pageSize: string;
    fontFamily: string;
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
    defaults?: Record<string, string>;
    demoData?: Record<string, string>;
    fonts?: Array<{ family: string; src?: string; label?: string }>;
    hiddenSections?: string[];
}

export interface FieldStyle {
    color?: string;
    bold?: boolean;
    italic?: boolean;
    fontSize?: string;
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

const getStyledVal = (key: string): string => {
    const value = getVal(key);
    if (!value) return value;
    try {
        const styleStr = localStorage.getItem(`${key}_style`);
        if (!styleStr) return value;
        const s: FieldStyle = JSON.parse(styleStr);
        const css: string[] = [];
        if (s.color)    css.push(`color:${s.color}`);
        if (s.bold)     css.push(`font-weight:bold`);
        if (s.italic)   css.push(`font-style:italic`);
        if (s.fontSize) css.push(`font-size:${s.fontSize}`);
        if (!css.length) return value;
        return `<span style="${css.join(';')}">${value}</span>`;
    } catch {
        return value;
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
    const certificationsIds = JSON.parse(localStorage.getItem("Certifications_IDs") || "[]");

    const data: CVData = {
        profile: {
            firstName:    getStyledVal("First-Name"),
            lastName:     getStyledVal("Last-Name"),
            title:        getStyledVal("Title"),
            email1:       getStyledVal("Email-1"),
            email2:       getStyledVal("Email-2"),
            phone1:       getStyledVal("Phone-1"),
            phone2:       getStyledVal("Phone-2"),
            country:      getStyledVal("Country"),
            city:         getStyledVal("City"),
            street1:      getStyledVal("Street-1"),
            street2:      getStyledVal("Street-2"),
            sectionTitle: getStyledVal("Section-Title-Profile"),
            summary:      getStyledVal("Summary"),
            picture:      getVal("Profile-Picture"),
            links: profileLinksIds.map((id: string) => ({ id, value: getVal(id) })),
        },
        educationTitle:     getStyledVal("Section-Title-Education"),
        experienceTitle:    getStyledVal("Section-Title-Experience"),
        skillsTitle:        getStyledVal("Section-Title-Skills"),
        projectsTitle:      getStyledVal("Section-Title-Projects"),
        languagesTitle:     getStyledVal("Section-Title-Languages"),
        awardsTitle:        getStyledVal("Section-Title-Awards"),
        certificationsTitle: getStyledVal("Section-Title-Certifications"),
        education: educationIds.map((id: string) => ({
            school:      getStyledVal(`${id}_School`),
            degree:      getStyledVal(`${id}_Degree`),
            city:        getStyledVal(`${id}_City`),
            startDate:   getStyledVal(`${id}_StartDate`),
            endDate:     getStyledVal(`${id}_EndDate`),
            description: getStyledVal(`${id}_Description`),
        })),
        experience: experienceIds.map((id: string) => ({
            position:         getStyledVal(`${id}_Position`),
            company:          getStyledVal(`${id}_Company`),
            city:             getStyledVal(`${id}_City`),
            startDate:        getStyledVal(`${id}_StartDate`),
            endDate:          getStyledVal(`${id}_EndDate`),
            responsibilities: getStyledVal(`${id}_Responsibilities`),
        })),
        skills: skillsIds.map((id: string) => ({
            name: getStyledVal(`${id}_Skill`),
        })),
        projects: projectsIds.map((id: string) => ({
            name:        getStyledVal(`${id}_ProjectName`),
            description: getStyledVal(`${id}_Description`),
            link:        getVal(`${id}_ProjectLink`),
            techStack:   getStyledVal(`${id}_TechStack`),
        })),
        languages: languagesIds.map((id: string) => ({
            language:    getStyledVal(`${id}_Language`),
            proficiency: getStyledVal(`${id}_Proficiency`),
        })),
        awards: awardsIds.map((id: string) => ({
            name:         getStyledVal(`${id}_AwardName`),
            organization: getStyledVal(`${id}_Organization`),
            date:         getStyledVal(`${id}_Date`),
            description:  getStyledVal(`${id}_Description`),
        })),
        certifications: certificationsIds.map((id: string) => ({
            name:          getStyledVal(`${id}_CertName`),
            issuer:        getStyledVal(`${id}_Issuer`),
            issueDate:     getStyledVal(`${id}_IssueDate`),
            expiryDate:    getStyledVal(`${id}_ExpiryDate`),
            credentialId:  getVal(`${id}_CredentialId`),
            credentialUrl: getVal(`${id}_CredentialUrl`),
        })),
        settings: JSON.parse(localStorage.getItem("cv_settings") || "{}"),
        selectedTemplate: localStorage.getItem("selectedTemplate") || "basic",
        pageSize: localStorage.getItem("cv_page_size") || "A4",
        fontFamily: localStorage.getItem("cv_font_family") || "Helvetica",
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

export const updatePageSize = (size: string) => {
    localStorage.setItem("cv_page_size", size);
    cachedData = null;
    dispatchCVDataChange();
};

export const updateFontFamily = (family: string) => {
    localStorage.setItem("cv_font_family", family);
    cachedData = null;
    dispatchCVDataChange();
};

export const selectTemplate = (id: string) => {
    localStorage.setItem("selectedTemplate", id);
    cachedData = null;
    dispatchCVDataChange();
};

export const populateSampleData = (demoData?: Record<string, string>) => {
    const selectedTemplate = localStorage.getItem("selectedTemplate");
    const zoomLevel = localStorage.getItem("cv_zoom_level");
    localStorage.clear();
    if (selectedTemplate) localStorage.setItem("selectedTemplate", selectedTemplate);
    if (zoomLevel) localStorage.setItem("cv_zoom_level", zoomLevel);

    const data = demoData ?? {
        "First-Name": "Alex",
        "Last-Name":  "Johnson",
        "Title":      "Senior Software Engineer",
        "Email-1":    "alex.johnson@example.com",
        "Phone-1":    "+1 415 555 0192",
        "City":       "San Francisco",
        "Country":    "USA",
    };

    for (const [key, value] of Object.entries(data)) {
        localStorage.setItem(key, value);
    }

    cachedData = null;
    window.location.reload();
};

export const clearCVData = () => {
    const selectedTemplate = localStorage.getItem("selectedTemplate");
    const zoomLevel = localStorage.getItem("cv_zoom_level");
    localStorage.clear();
    if (selectedTemplate) localStorage.setItem("selectedTemplate", selectedTemplate);
    if (zoomLevel) localStorage.setItem("cv_zoom_level", zoomLevel);
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
