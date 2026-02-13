import Builder from "../../Builder/builder";
export default function buildModern(data: any) {
    Builder.clear();
    Builder.setData(data);
    Builder.setDefaults({
        profile: {
            firstName: "Soplang",
            lastName: "Developer",
            title: "Creator of Soplang",
            email: "dev@soplang.com",
            phone: "+252 61 000 000",
            city: "Mogadishu",
            country: "Somalia"
        },
        experience: [],
        skills: []
    });
    Builder.css(`
        .modern-container { font-family: 'Helvetica'; padding: 20px; color: #333; }
        .header { border-bottom: 3px solid #2563eb; padding-bottom: 15px; margin-bottom: 20px; }
        .name { font-size: 32px; font-weight: bold; color: #1e293b; text-transform: uppercase; letter-spacing: 1px; }
        .role { font-size: 16px; color: #2563eb; font-weight: bold; margin-top: 5px; }
        .contact { font-size: 10px; color: #64748b; margin-top: 10px; }
        .section-title { 
            font-size: 14px; 
            font-weight: bold; 
            color: #2563eb; 
            text-transform: uppercase; 
            border-bottom: 1px solid #e2e8f0; 
            margin-top: 20px; 
            margin-bottom: 10px; 
            padding-bottom: 5px;
        }
        .exp-item { margin-bottom: 15px; }
        .exp-header { display: flex; flex-direction: row; justify-content: space-between; align-items: baseline; }
        .exp-role { font-weight: bold; font-size: 12px; }
        .exp-company { font-size: 11px; color: #475569; font-style: italic; }
        .exp-date { font-size: 10px; color: #94a3b8; }
        .exp-desc { font-size: 10px; margin-top: 5px; line-height: 1.4; }
        .chip { 
            display: inline-block; 
            background: #eff6ff; 
            color: #2563eb; 
            padding: 2px 8px; 
            border-radius: 4px; 
            font-size: 10px; 
            margin-right: 5px; 
            margin-bottom: 5px;
            border: 1px solid #bfdbfe;
        }
    `);
    Builder.html(`
        <div class="modern-container">
            <div class="header">
                <div class="name">%profile.firstName% %profile.lastName%</div>
                <div class="role">%profile.title%</div>
                <div class="contact">
                    %profile.email% | %profile.phone% | %profile.city%, %profile.country%
                </div>
            </div>
    `);
    const experience = Builder.getValue("experience") || [];
    if (experience.length > 0) {
        Builder.html(`<div class="section-title">Professional Experience</div>`);
        const render = (val: any) => val?.value || "";
        for (const exp of experience) {
            Builder.html(`
                <div class="exp-item">
                    <div class="exp-header">
                        <div class="exp-role">${render(exp.position)}</div>
                        <span class="exp-date">${render(exp.startDate)} - ${render(exp.endDate)}</span>
                    </div>
                    <div class="exp-company">${render(exp.company)}</div>
                    <div class="exp-desc">${render(exp.responsibilities)}</div>
                </div>
            `);
        }
    }
    const skills = Builder.getValue("skills") || [];
    if (skills.length > 0) {
        Builder.html(`<div class="section-title">Technical Skills</div><div>`);
        for (const skill of skills) {
            Builder.html(`<span class="chip">${skill.name?.value}</span>`);
        }
        Builder.html(`</div>`);
    }
    Builder.html(`</div>`);
    return Builder.compile();
}
