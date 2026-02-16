import { CVData } from "../../Utilities/cvDataStore";

export default function modern_sidebar(data: CVData) {
    const { education, experience, skills, projects, languages, awards, settings } = data;

    const renderSection = (title: string, content: string) => {
        if (!content) return "";
        return `
      <div style="margin-bottom: 25px;">
        <h3 style="border-bottom: 2px solid #2563eb; padding-bottom: 5px; margin-bottom: 12px; color: #1e3a8a; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">${title}</h3>
        ${content}
      </div>
    `;
    };

    const eduHtml = education.map(edu => `
    <div style="margin-bottom: 15px;">
      <div style="font-weight: bold; font-size: 12px; color: #1e293b;">${edu.school}</div>
      <div style="display: flex; justify-content: space-between; font-size: 11px; color: #2563eb; margin: 2px 0;">
        <span>${edu.degree}</span>
        <span>${edu.startDate} - ${edu.endDate}</span>
      </div>
      ${edu.description ? `<div style="font-size: 11px; line-height: 1.5;">${edu.description}</div>` : ''}
    </div>
  `).join('');

    const expHtml = experience.map(exp => `
    <div style="margin-bottom: 18px;">
      <div style="font-weight: bold; font-size: 13px; color: #1e293b;">${exp.position}</div>
      <div style="display: flex; justify-content: space-between; font-size: 11px; color: #2563eb; margin: 2px 0; font-weight: 600;">
        <span>${exp.company}</span>
        <span>${exp.startDate} - ${exp.endDate}</span>
      </div>
      ${exp.responsibilities ? `<div style="font-size: 11px; margin-top: 4px; line-height: 1.5; white-space: pre-wrap;">${exp.responsibilities}</div>` : ''}
    </div>
  `).join('');

    const skillsHtml = skills.length ? `
    <div style="display: flex; flex-wrap: wrap; gap: 5px;">
      ${skills.map(s => `<span style="background: rgba(255,255,255,0.15); padding: 3px 8px; border-radius: 4px; font-size: 10px; color: white;">${s.name}</span>`).join('')}
    </div>
  ` : '';

    const projHtml = projects.map(proj => `
    <div style="margin-bottom: 15px;">
      <div style="font-weight: bold; font-size: 12px; color: #1e293b;">${proj.name}</div>
      ${proj.techStack ? `<div style="font-size: 10px; color: #64748b; margin-top: 1px;"><em>${proj.techStack}</em></div>` : ''}
      ${proj.description ? `<div style="font-size: 11px; margin-top: 3px; line-height: 1.4;">${proj.description}</div>` : ''}
    </div>
  `).join('');

    const langHtml = languages.map(l => `
    <div style="margin-bottom: 6px; font-size: 11px; display: flex; justify-content: space-between;">
      <span style="font-weight: 500;">${l.language}</span>
      <span style="opacity: 0.8;">${l.proficiency}</span>
    </div>
  `).join('');

    const getLinkIcon = (url: string) => {
        const lowerUrl = url.toLowerCase();
        if (lowerUrl.includes("github.com")) return '<i class="fa-brands fa-github"></i>';
        if (lowerUrl.includes("linkedin.com")) return '<i class="fa-brands fa-linkedin"></i>';
        if (lowerUrl.includes("twitter.com") || lowerUrl.includes("x.com")) return '<i class="fa-brands fa-twitter"></i>';
        return '<i class="fa-solid fa-link"></i>';
    };

    const linksHtml = data.profile.links && data.profile.links.length > 0 ? `
    <div style="margin-top: 15px; display: flex; flex-direction: column; gap: 8px;">
      ${data.profile.links.map(l => `
        <div style="display: flex; items-center gap: 8px; font-size: 10px; color: rgba(255,255,255,0.9);">
          <span style="width: 14px; text-align: center;">${getLinkIcon(l.value)}</span>
          <span>${l.value.replace(/https?:\/\/(www\.)?/, '')}</span>
        </div>
      `).join('')}
    </div>
  ` : '';

    return `
    <style>
      body { font-family: 'Helvetica', sans-serif; color: #333; margin: 0; padding: 0; }
    </style>
    <div style="display: flex; min-height: 100%;">
      <!-- Sidebar -->
      <div style="width: 32%; background-color: #1e3a8a; color: white; padding: 30px 20px;">
        <div style="margin-bottom: 30px;">
          <h1 style="font-size: 22px; font-weight: 900; margin: 0; text-transform: uppercase; letter-spacing: 1px;">{profile.firstName}<br/>{profile.lastName}</h1>
          <div style="font-size: 12px; margin-top: 8px; opacity: 0.9; font-weight: 500; text-transform: uppercase;">{profile.title}</div>
        </div>

        <div style="margin-bottom: 25px;">
          <h4 style="font-size: 12px; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 5px; margin-bottom: 12px; letter-spacing: 1px;">Contact</h4>
          <div style="font-size: 10px; display: flex; flex-direction: column; gap: 6px; opacity: 0.9;">
            <div style="display: flex; gap: 10px;"><i class="fa-solid fa-envelope" style="width: 12px;"></i> {profile.email}</div>
            <div style="display: flex; gap: 10px;"><i class="fa-solid fa-phone" style="width: 12px;"></i> {profile.phone}</div>
            <div style="display: flex; gap: 10px;"><i class="fa-solid fa-location-dot" style="width: 12px;"></i> {profile.city}, {profile.country}</div>
          </div>
          ${linksHtml}
        </div>

        ${(settings.skills && skillsHtml) ? `
          <div style="margin-bottom: 25px;">
            <h4 style="font-size: 12px; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 5px; margin-bottom: 12px; letter-spacing: 1px;">Skills</h4>
            ${skillsHtml}
          </div>
        ` : ''}

        ${(settings.languages && langHtml) ? `
          <div>
            <h4 style="font-size: 12px; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 5px; margin-bottom: 12px; letter-spacing: 1px;">Languages</h4>
            ${langHtml}
          </div>
        ` : ''}
      </div>

      <!-- Main Content -->
      <div style="width: 68%; padding: 40px 30px; background: white;">
        ${(settings.experience && expHtml) ? renderSection("Work Experience", expHtml) : ''}
        ${(settings.education && eduHtml) ? renderSection("Education", eduHtml) : ''}
        ${(settings.projects && projHtml) ? renderSection("Key Projects", projHtml) : ''}
        ${(settings.awards && data.awards.length > 0) ? renderSection("Awards & Certifications", awards.map(a => `<div style="font-size: 11px; margin-bottom: 8px;"><strong>${a.name}</strong> (${a.date})</div>`).join('')) : ''}
      </div>
    </div>
  `;
}
