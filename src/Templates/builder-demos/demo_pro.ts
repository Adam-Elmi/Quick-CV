import Builder from "../../Builder/builder";
import htmlContent from "../raw/modern-pro/template.html?raw";
import cssContent from "../raw/modern-pro/style.css?raw";
export default function buildModernPro(data: any) {
    Builder.clear();
    Builder.setData(data);
    Builder.setDefaults({
        profile: {
            firstName: "John",
            lastName: "Doe",
            title: "Senior Product Designer",
            email: "john@design.com",
            phone: "+1 555 0100",
            city: "New York",
            country: "USA"
        }
    });
    Builder.css(cssContent);
    Builder.html(htmlContent);
    const render = (val: any) => val?.value || "";
    const fname = Builder.getValue("profile.firstName");
    const lname = Builder.getValue("profile.lastName");
    const fInit = (typeof fname === 'object' ? fname.value : fname || "J").charAt(0);
    const lInit = (typeof lname === 'object' ? lname.value : lname || "D").charAt(0);
    data.initials = `${fInit}${lInit}`;
    let expHtml = "";
    const experience = Builder.getValue("experience") || [];
    for (const exp of experience) {
        expHtml += `
            <div class="entry">
                <div class="entry-header">
                    <div class="entry-title">${render(exp.position)}</div>
                    <div class="entry-date">${render(exp.startDate)} - ${render(exp.endDate)}</div>
                </div>
                <div class="entry-subtitle">${render(exp.company)}</div>
                <div class="entry-desc">${render(exp.responsibilities)}</div>
            </div>
        `;
    }
    data.EXPERIENCE_LIST = expHtml;
    let eduHtml = "";
    const education = Builder.getValue("education") || [];
    for (const edu of education) {
        eduHtml += `
            <div class="entry">
                 <div class="entry-header">
                    <div class="entry-title">${render(edu.school)}</div>
                    <div class="entry-date">${render(edu.startDate)} - ${render(edu.endDate)}</div>
                </div>
                <div class="entry-subtitle">${render(edu.degree)}</div>
            </div>
        `;
    }
    data.EDUCATION_LIST = eduHtml;
    let skillHtml = "";
    const skills = Builder.getValue("skills") || [];
    for (const skill of skills) {
        skillHtml += `
            <div class="skill-item">
                <div class="skill-name">${render(skill.name)}</div>
                <div class="skill-bar-bg">
                    <div class="skill-bar-fill" style="width: 85%"></div>
                </div>
            </div>
        `;
    }
    data.SKILLS_LIST = skillHtml;
    let projHtml = "";
    const projects = Builder.getValue("projects") || [];
    for (const proj of projects) {
        projHtml += `
            <div class="entry">
                 <div class="entry-header">
                    <div class="entry-title">${render(proj.name)}</div>
                </div>
                 <div class="entry-subtitle">${render(proj.techStack)}</div>
                <div class="entry-desc">${render(proj.description)}</div>
            </div>
        `;
    }
    data.PROJECTS_LIST = projHtml;
    let langHtml = "";
    const languages = Builder.getValue("languages") || [];
    for (const lang of languages) {
        langHtml += `
            <div class="skill-item">
                 <div class="entry-header" style="margin-bottom:0">
                    <div class="skill-name" style="margin:0">${render(lang.language)}</div>
                    <div class="entry-date" style="background:none; color:#94a3b8; padding:0">${render(lang.proficiency)}</div>
                </div>
            </div>
        `;
    }
    data.LANGUAGES_LIST = langHtml;
    return Builder.compile();
}
