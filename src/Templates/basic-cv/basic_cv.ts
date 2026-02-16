import { CVData } from "../../Utilities/cvDataStore";

export default function basic_cv(data: CVData) {
  const { education, experience, skills, projects, languages, awards, settings } = data;

  const renderSection = (title: string, content: string) => {
    if (!content) return "";
    return `
      <div style="margin-bottom: 20px;">
        <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 10px; color: #334155; font-size: 14px; font-weight: bold; text-transform: uppercase;">${title}</h3>
        ${content}
      </div>
    `;
  };

  const eduHtml = education.map(edu => `
    <div style="margin-bottom: 10px;">
      <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 12px; color: #1e293b;">
        <span>${edu.school}</span>
        <span>${edu.startDate} - ${edu.endDate}</span>
      </div>
      <div style="font-size: 12px; font-style: italic; color: #475569;">${edu.degree} ${edu.city ? `| ${edu.city}` : ''}</div>
      ${edu.description ? `<div style="font-size: 11px; margin-top: 2px;">${edu.description}</div>` : ''}
    </div>
  `).join('');

  const expHtml = experience.map(exp => `
    <div style="margin-bottom: 12px;">
      <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 12px; color: #1e293b;">
        <span>${exp.position}</span>
        <span>${exp.startDate} - ${exp.endDate}</span>
      </div>
      <div style="font-size: 12px; font-style: italic; color: #475569;">${exp.company} ${exp.city ? `| ${exp.city}` : ''}</div>
      ${exp.responsibilities ? `<div style="font-size: 11px; margin-top: 4px; white-space: pre-wrap;">${exp.responsibilities}</div>` : ''}
    </div>
  `).join('');

  const skillsHtml = skills.length ? `
    <div style="font-size: 11px;">
      <span style="font-weight: bold; color: #1e293b;">Skills: </span>
      ${skills.map(s => s.name).filter(Boolean).join(', ')}
    </div>
  ` : '';

  const projHtml = projects.map(proj => `
    <div style="margin-bottom: 10px;">
      <div style="font-weight: bold; font-size: 12px; color: #1e293b;">
        ${proj.name}
        ${proj.link ? `<a href="${proj.link}" style="font-weight: normal; color: #2563eb; text-decoration: none; font-size: 10px; margin-left: 5px;">[Link]</a>` : ''}
      </div>
      ${proj.techStack ? `<div style="font-size: 11px; color: #64748b; margin-bottom: 2px;"><em>Stack: ${proj.techStack}</em></div>` : ''}
      ${proj.description ? `<div style="font-size: 11px;">${proj.description}</div>` : ''}
    </div>
  `).join('');

  const langHtml = languages.length ? `
   <div style="font-size: 11px;">
     <span style="font-weight: bold; color: #1e293b;">Languages: </span>
     ${languages.map(l => `${l.language} ${l.proficiency ? `(${l.proficiency})` : ''}`).filter(n => n.trim().length > 0).join(', ')}
   </div>
 ` : '';

  const awardHtml = awards.map(aw => `
    <div style="margin-bottom: 8px; font-size: 11px;">
      <span style="font-weight: bold; color: #1e293b;">${aw.name}</span>
      ${aw.organization ? `<span> | ${aw.organization}</span>` : ''}
      ${aw.date ? `<span style="color: #64748b;"> (${aw.date})</span>` : ''}
      ${aw.description ? `<div style="margin-top: 1px;">${aw.description}</div>` : ''}
    </div>
   `).join('');

  const getLinkIcon = (url: string) => {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes("github.com")) return '<i class="fa-brands fa-github"></i>';
    if (lowerUrl.includes("linkedin.com")) return '<i class="fa-brands fa-linkedin"></i>';
    if (lowerUrl.includes("twitter.com") || lowerUrl.includes("x.com")) return '<i class="fa-brands fa-twitter"></i>';
    if (lowerUrl.includes("facebook.com")) return '<i class="fa-brands fa-facebook"></i>';
    if (lowerUrl.includes("instagram.com")) return '<i class="fa-brands fa-instagram"></i>';
    if (lowerUrl.includes("youtube.com")) return '<i class="fa-brands fa-youtube"></i>';
    return '<i class="fa-solid fa-link"></i>';
  };

  const linksHtml = data.profile.links && data.profile.links.length > 0 ? `
    <div style="font-size: 10px; margin-top: 8px; display: flex; gap: 12px; justify-content: center; color: #475569;">
      ${data.profile.links.map(l => `
        <span style="display: flex; items-center gap: 4px;">
          ${getLinkIcon(l.value)} ${l.value.replace(/https?:\/\/(www\.)?/, '')}
        </span>
      `).join('')}
    </div>
  ` : '';

  return `
    <style>
      body { font-family: 'Helvetica', sans-serif; color: #333; line-height: 1.4; }
      p { margin: 0; padding: 0; }
    </style>
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 20px; border-bottom: 2px solid #333; padding-bottom: 15px;">
      <h1 style="font-size: 24px; font-weight: bold; text-transform: uppercase; margin: 0; color: #1e293b;">{profile.firstName} {profile.lastName}</h1>
      <div style="font-size: 14px; color: #64748b; margin-top: 5px; font-weight: 500;">{profile.title}</div>
      <div style="font-size: 11px; color: #475569; margin-top: 8px;">
        {profile.email} | {profile.phone} | {profile.city} | {profile.country}
      </div>
      ${linksHtml}
    </div>
    <!-- Content -->
    ${(settings.experience && expHtml) ? renderSection("Experience", expHtml) : ''}
    ${(settings.education && eduHtml) ? renderSection("Education", eduHtml) : ''}
    ${(settings.projects && projHtml) ? renderSection("Projects", projHtml) : ''}
    ${(settings.awards && awardHtml) ? renderSection("Awards", awardHtml) : ''}
    ${((settings.skills && skillsHtml) || (settings.languages && langHtml)) ? `
      <div style="margin-bottom: 20px;">
        <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 10px; color: #334155; font-size: 14px; font-weight: bold; text-transform: uppercase;">Skills & Languages</h3>
        ${(settings.skills && skillsHtml) ? skillsHtml : ''}
        ${(settings.skills && skillsHtml && settings.languages && langHtml) ? '<div style="height: 5px;"></div>' : ''}
        ${(settings.languages && langHtml) ? langHtml : ''}
      </div>
    ` : ''}
  `;
}
