import { useState, useEffect } from 'react';
export type CVValue = string;

export interface CVData {
    profile: {
        firstName: CVValue;
        lastName: CVValue;
        title: CVValue;
        email: CVValue;
        phone: CVValue;
        country: CVValue;
        city: CVValue;
        links: { id: string; value: CVValue }[];
    };
    education: {
        id: string;
        school: CVValue;
        degree: CVValue;
        city: CVValue;
        startDate: CVValue;
        endDate: CVValue;
        description: CVValue;
    }[];
    experience: {
        id: string;
        position: CVValue;
        company: CVValue;
        city: CVValue;
        startDate: CVValue;
        endDate: CVValue;
        responsibilities: CVValue;
    }[];
    skills: {
        id: string;
        name: CVValue;
    }[];
    projects: {
        id: string;
        name: CVValue;
        techStack: CVValue;
        link: CVValue;
        description: CVValue;
    }[];
    languages: {
        id: string;
        language: CVValue;
        proficiency: CVValue;
    }[];
    awards: {
        id: string;
        name: CVValue;
        organization: CVValue;
        date: CVValue;
        description: CVValue;
    }[];
    settings: {
        [key: string]: boolean;
    };
    selectedTemplate: string;
}

const getVal = (key: string): CVValue => {
    try {
        const item = localStorage.getItem(key);
        if (!item) return "";

        // Try to parse in case it's the old {value, font, size, color} format
        try {
            const parsed = JSON.parse(item);
            if (parsed && typeof parsed === 'object' && 'value' in parsed) {
                return parsed.value || "";
            }
            return String(parsed);
        } catch (e) {
            // Not JSON, just return raw string
            return item;
        }
    } catch (e) {
        return "";
    }
};
const getIds = (baseKey: string): string[] => {
    try {
        const item = localStorage.getItem(`${baseKey}_IDs`);
        if (!item) return [];
        return JSON.parse(item);
    } catch (e) {
        return [];
    }
};
const getSettings = (): { [key: string]: boolean } => {
    try {
        const item = localStorage.getItem("cv_settings");
        if (!item) {
            return {
                experience: true,
                education: true,
                skills: true,
                projects: true,
                languages: true,
                awards: true,
            };
        }
        return JSON.parse(item);
    } catch (e) {
        return {};
    }
};
export const updateCVSettings = (newSettings: { [key: string]: boolean }) => {
    localStorage.setItem("cv_settings", JSON.stringify(newSettings));
    dispatchCVDataChange();
}
export const getCVData = (): CVData => {
    return {
        profile: {
            firstName: getVal("First-Name"),
            lastName: getVal("Last-Name"),
            title: getVal("Title"),
            email: getVal("Email"),
            phone: getVal("Phone-Number"),
            country: getVal("Country"),
            city: getVal("City"),
            links: getIds("Profile_Link").map(id => ({
                id,
                value: getVal(id)
            })),
        },
        education: getIds("Education").map(id => ({
            id,
            school: getVal(`${id}_School`),
            degree: getVal(`${id}_Degree`),
            city: getVal(`${id}_City`),
            startDate: getVal(`${id}_StartDate`),
            endDate: getVal(`${id}_EndDate`),
            description: getVal(`${id}_Description`),
        })),
        experience: getIds("Experience").map(id => ({
            id,
            position: getVal(`${id}_Position`),
            company: getVal(`${id}_Company`),
            city: getVal(`${id}_City`),
            startDate: getVal(`${id}_StartDate`),
            endDate: getVal(`${id}_EndDate`),
            responsibilities: getVal(`${id}_Responsibilities`),
        })),
        skills: getIds("Skills").map(id => ({
            id,
            name: getVal(`${id}_Skill`),
        })),
        projects: getIds("Projects").map(id => ({
            id,
            name: getVal(`${id}_ProjectName`),
            techStack: getVal(`${id}_TechStack`),
            link: getVal(`${id}_ProjectLink`),
            description: getVal(`${id}_Description`),
        })),
        languages: getIds("Languages").map(id => ({
            id,
            language: getVal(`${id}_Language`),
            proficiency: getVal(`${id}_Proficiency`),
        })),
        awards: getIds("Awards").map(id => ({
            id,
            name: getVal(`${id}_AwardName`),
            organization: getVal(`${id}_Organization`),
            date: getVal(`${id}_Date`),
            description: getVal(`${id}_Description`),
        })),
        settings: getSettings(),
        selectedTemplate: getTemplateId(),
    };
};
const getTemplateId = (): string => {
    return localStorage.getItem("selected_template") || "modern";
};
export const selectTemplate = (id: string) => {
    localStorage.setItem("selected_template", id);
    dispatchCVDataChange();
};
export const CV_DATA_CHANGE_EVENT = 'cv-data-change';
export const dispatchCVDataChange = () => {
    window.dispatchEvent(new Event(CV_DATA_CHANGE_EVENT));
};
export const populateSampleData = () => {
    const sampleProfile = {
        "First-Name": "Adam",
        "Last-Name": "Elmi",
        "Title": "Senior Full Stack Engineeer",
        "Email": "adam.elmi@example.com",
        "Phone-Number": "+1 234 567 890",
        "City": "San Francisco",
        "Country": "USA",
    };
    const linkId = "link_" + Date.now();
    localStorage.setItem("Profile_Link_IDs", JSON.stringify([linkId]));
    localStorage.setItem(linkId, "github.com/adam-elmi");
    Object.entries(sampleProfile).forEach(([key, val]) => localStorage.setItem(key, val));
    const expId1 = "exp_" + Date.now();
    const expId2 = "exp_" + (Date.now() + 1);
    localStorage.setItem("Experience_IDs", JSON.stringify([expId1, expId2]));
    localStorage.setItem(`${expId1}_Position`, "Senior Developer");
    localStorage.setItem(`${expId1}_Company`, "Tech Corp");
    localStorage.setItem(`${expId1}_StartDate`, "2020");
    localStorage.setItem(`${expId1}_EndDate`, "Present");
    localStorage.setItem(`${expId1}_Description`, "Led a team of 5 developers to build a cloud-native application.");
    localStorage.setItem(`${expId1}_Responsibilities`, "• Architected microservices\n• Mentored junior devs\n• Reduced latency by 40%");
    localStorage.setItem(`${expId2}_Position`, "Web Developer");
    localStorage.setItem(`${expId2}_Company`, "Web Solutions Inc");
    localStorage.setItem(`${expId2}_StartDate`, "2018");
    localStorage.setItem(`${expId2}_EndDate`, "2020");
    localStorage.setItem(`${expId2}_Responsibilities`, "• Developed responsive websites\n• Integrated payment gateways");
    const eduId = "edu_" + Date.now();
    localStorage.setItem("Education_IDs", JSON.stringify([eduId]));
    localStorage.setItem(`${eduId}_School`, "University of Tech");
    localStorage.setItem(`${eduId}_Degree`, "B.S. Computer Science");
    localStorage.setItem(`${eduId}_StartDate`, "2014");
    localStorage.setItem(`${eduId}_EndDate`, "2018");
    const skill1 = "skill_" + Date.now();
    const skill2 = "skill_" + (Date.now() + 1);
    localStorage.setItem("Skills_IDs", JSON.stringify([skill1, skill2]));
    localStorage.setItem(`${skill1}_Skill`, "React & TypeScript");
    localStorage.setItem(`${skill2}_Skill`, "Node.js & Python");
    const projId = "proj_" + Date.now();
    localStorage.setItem("Projects_IDs", JSON.stringify([projId]));
    localStorage.setItem(`${projId}_ProjectName`, "Quick CV");
    localStorage.setItem(`${projId}_TechStack`, "React, PDF renderer");
    localStorage.setItem(`${projId}_Description`, "A real-time CV builder with PDF export.");
    const awardId = "award_" + Date.now();
    localStorage.setItem("Awards_IDs", JSON.stringify([awardId]));
    localStorage.setItem(`${awardId}_AwardName`, "Best Developer");
    localStorage.setItem(`${awardId}_Organization`, "Company");
    localStorage.setItem(`${awardId}_Date`, "2021");
    dispatchCVDataChange();
};
export function useCVData() {
    const [data, setData] = useState<CVData>(getCVData());
    useEffect(() => {
        const handleStorageChange = () => {
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
