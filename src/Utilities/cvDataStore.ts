import { useState, useEffect } from 'react';
export interface StyledValue {
    value: string;
    style?: {
        fontFamily?: string;
        fontSize?: string;
        color?: string;
    };
}
export interface CVData {
    profile: {
        firstName: StyledValue;
        lastName: StyledValue;
        title: StyledValue;
        email: StyledValue;
        phone: StyledValue;
        country: StyledValue;
        city: StyledValue;
        links: { id: string; value: StyledValue }[];
    };
    education: {
        id: string;
        school: StyledValue;
        degree: StyledValue;
        city: StyledValue;
        startDate: StyledValue;
        endDate: StyledValue;
        description: StyledValue;
    }[];
    experience: {
        id: string;
        position: StyledValue;
        company: StyledValue;
        city: StyledValue;
        startDate: StyledValue;
        endDate: StyledValue;
        responsibilities: StyledValue;
    }[];
    skills: {
        id: string;
        name: StyledValue;
    }[];
    projects: {
        id: string;
        name: StyledValue;
        techStack: StyledValue;
        link: StyledValue;
        description: StyledValue;
    }[];
    languages: {
        id: string;
        language: StyledValue;
        proficiency: StyledValue;
    }[];
    awards: {
        id: string;
        name: StyledValue;
        organization: StyledValue;
        date: StyledValue;
        description: StyledValue;
    }[];
    settings: {
        [key: string]: boolean;
    };
    selectedTemplate: string;
}
const getVal = (key: string): StyledValue => {
    try {
        const item = localStorage.getItem(key);
        if (!item) return { value: "" };
        const parsed = JSON.parse(item);
        const validFonts = ["Helvetica", "Times-Roman", "Courier", "Roboto"];
        const font = validFonts.includes(parsed.font) ? parsed.font : "Helvetica";
        return {
            value: parsed.value || "",
            style: {
                fontFamily: font, 
                fontSize: parsed.size ? `${parsed.size}px` : "12px", 
                color: parsed.color || "#000000"
            }
        };
    } catch (e) {
        return { value: "" };
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
        "First-Name": JSON.stringify({ value: "Adam", font: "Courier", size: "32", color: "#2563eb" }),
        "Last-Name": JSON.stringify({ value: "Elmi", font: "Courier", size: "32", color: "#1e293b" }),
        "Title": JSON.stringify({ value: "Senior Full Stack Engineeer", font: "Helvetica", size: "16", color: "#64748b" }),
        "Email": JSON.stringify({ value: "adam.elmi@example.com", font: "Helvetica", size: "12" }),
        "Phone-Number": JSON.stringify({ value: "+1 234 567 890", font: "Helvetica", size: "12" }),
        "City": JSON.stringify({ value: "San Francisco", font: "Helvetica", size: "12" }),
        "Country": JSON.stringify({ value: "USA", font: "Helvetica", size: "12" }),
    };
    const linkId = "link_" + Date.now();
    localStorage.setItem("Profile_Link_IDs", JSON.stringify([linkId]));
    localStorage.setItem(linkId, JSON.stringify({ value: "github.com/adam-elmi", font: "Helvetica", size: "12" }));
    Object.entries(sampleProfile).forEach(([key, val]) => localStorage.setItem(key, val));
    const expId1 = "exp_" + Date.now();
    const expId2 = "exp_" + (Date.now() + 1);
    localStorage.setItem("Experience_IDs", JSON.stringify([expId1, expId2]));
    localStorage.setItem(`${expId1}_Position`, JSON.stringify({ value: "Senior Developer", font: "Helvetica", size: "14", color: "#0f172a" }));
    localStorage.setItem(`${expId1}_Company`, JSON.stringify({ value: "Tech Corp", font: "Helvetica", size: "14" }));
    localStorage.setItem(`${expId1}_StartDate`, JSON.stringify({ value: "2020", font: "Helvetica" }));
    localStorage.setItem(`${expId1}_EndDate`, JSON.stringify({ value: "Present", font: "Helvetica" }));
    localStorage.setItem(`${expId1}_Description`, JSON.stringify({ value: "Led a team of 5 developers to build a cloud-native application.", font: "Helvetica", size: "12" }));
    localStorage.setItem(`${expId1}_Responsibilities`, JSON.stringify({ value: "• Architected microservices\n• Mentored junior devs\n• Reduced latency by 40%", font: "Helvetica", size: "12" }));
    localStorage.setItem(`${expId2}_Position`, JSON.stringify({ value: "Web Developer", font: "Helvetica", size: "14", color: "#0f172a" }));
    localStorage.setItem(`${expId2}_Company`, JSON.stringify({ value: "Web Solutions Inc", font: "Helvetica", size: "14" }));
    localStorage.setItem(`${expId2}_StartDate`, JSON.stringify({ value: "2018", font: "Helvetica" }));
    localStorage.setItem(`${expId2}_EndDate`, JSON.stringify({ value: "2020", font: "Helvetica" }));
    localStorage.setItem(`${expId2}_Responsibilities`, JSON.stringify({ value: "• Developed responsive websites\n• Integrated payment gateways", font: "Helvetica", size: "12" }));
    const eduId = "edu_" + Date.now();
    localStorage.setItem("Education_IDs", JSON.stringify([eduId]));
    localStorage.setItem(`${eduId}_School`, JSON.stringify({ value: "University of Tech", font: "Helvetica", size: "14", color: "#0f172a" }));
    localStorage.setItem(`${eduId}_Degree`, JSON.stringify({ value: "B.S. Computer Science", font: "Helvetica", size: "14" }));
    localStorage.setItem(`${eduId}_StartDate`, JSON.stringify({ value: "2014", font: "Helvetica" }));
    localStorage.setItem(`${eduId}_EndDate`, JSON.stringify({ value: "2018", font: "Helvetica" }));
    const skill1 = "skill_" + Date.now();
    const skill2 = "skill_" + (Date.now() + 1);
    localStorage.setItem("Skills_IDs", JSON.stringify([skill1, skill2]));
    localStorage.setItem(`${skill1}_Skill`, JSON.stringify({ value: "React & TypeScript", font: "Helvetica", size: "12" }));
    localStorage.setItem(`${skill2}_Skill`, JSON.stringify({ value: "Node.js & Python", font: "Helvetica", size: "12" }));
    const projId = "proj_" + Date.now();
    localStorage.setItem("Projects_IDs", JSON.stringify([projId]));
    localStorage.setItem(`${projId}_ProjectName`, JSON.stringify({ value: "Quick CV", font: "Helvetica", size: "14", color: "#0f172a" }));
    localStorage.setItem(`${projId}_TechStack`, JSON.stringify({ value: "React, PDF renderer", font: "Helvetica", size: "12" }));
    localStorage.setItem(`${projId}_Description`, JSON.stringify({ value: "A real-time CV builder with PDF export.", font: "Helvetica", size: "12" }));
    const awardId = "award_" + Date.now();
    localStorage.setItem("Awards_IDs", JSON.stringify([awardId]));
    localStorage.setItem(`${awardId}_AwardName`, JSON.stringify({ value: "Best Developer", font: "Helvetica", size: "12" }));
    localStorage.setItem(`${awardId}_Organization`, JSON.stringify({ value: "Company", font: "Helvetica", size: "12" }));
    localStorage.setItem(`${awardId}_Date`, JSON.stringify({ value: "2021", font: "Helvetica", size: "12" }));
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
