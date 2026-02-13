import Builder from "../../Builder/builder";
export default function buildClassic(data: any) {
    Builder.clear();
    Builder.setData(data);
    Builder.css(`
        .classic-container { font-family: 'Times-Roman'; color: #000; padding: 30px; line-height: 1.6; }
        .header { text-align: center; border-bottom: 1px solid #000; padding-bottom: 20px; margin-bottom: 20px; }
        .name { font-size: 28px; font-weight: bold; text-transform: uppercase; margin-bottom: 5px; }
        .info { font-size: 11px; font-style: italic; }
        .section-header { 
            text-align: center; 
            font-size: 14px; 
            font-weight: bold; 
            text-transform: uppercase; 
            margin: 20px 0 10px 0; 
            text-decoration: underline;
        }
        .edu-item { margin-bottom: 10px; }
        .edu-school { font-weight: bold; font-size: 12px; }
        .edu-details { font-size: 12px; }
        .list-item { font-size: 12px; margin-bottom: 5px; }
    `);
    Builder.html(`
        <div class="classic-container">
            <div class="header">
                <div class="name">%profile.firstName.value% %profile.lastName.value%</div>
                <div class="info">%profile.title.value%</div>
                <div class="info">%profile.email.value% &bull; %profile.phone.value%</div>
            </div>
    `);
    const education = Builder.getValue("education") || [];
    if (education.length > 0) {
        Builder.html(`<div class="section-header">Education</div>`);
        for (const edu of education) {
            Builder.html(`
                <div class="edu-item">
                    <div class="edu-school">${edu.school?.value}</div>
                    <div class="edu-details">
                        ${edu.degree?.value}, ${edu.city?.value} (${edu.startDate?.value} - ${edu.endDate?.value})
                    </div>
                </div>
            `);
        }
    }
    const projects = Builder.getValue("projects") || [];
    if (projects.length > 0) {
        Builder.html(`<div class="section-header">Notable Projects</div>`);
        for (const proj of projects) {
            Builder.html(`
                <div class="list-item">
                    <strong>${proj.name?.value}:</strong> ${proj.description?.value}
                </div>
             `);
        }
    }
    Builder.html(`</div>`);
    return Builder.compile();
}
