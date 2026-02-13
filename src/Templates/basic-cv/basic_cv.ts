import { CVData, StyledValue } from "../../Utilities/cvDataStore";
import imageSrc from "../../assets/media/naruto_togather.jpg";
export default function basic_cv(data: CVData) {
  const { profile, education, experience, skills, projects, languages, awards, settings } = data;
  const renderStyled = (item: StyledValue) => {
    if (!item || !item.value) return "";
    let fontFamily = item.style?.fontFamily || 'inherit';
    if (fontFamily === 'Monospace') fontFamily = 'Courier';
    const styleString = item.style
      ? `font-family: ${fontFamily}; font-size: ${item.style.fontSize || 'inherit'}; color: ${item.style.color || 'inherit'};`
      : "";
    return `<span style="${styleString}">${item.value}</span>`;
  };
  const fullName = `${renderStyled(profile.firstName)} ${renderStyled(profile.lastName)}`;
  const title = renderStyled(profile.title);
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
        <span>${renderStyled(edu.school)}</span>
        <span>${renderStyled(edu.startDate)} - ${renderStyled(edu.endDate)}</span>
      </div>
      <div style="font-size: 12px; font-style: italic; color: #475569;">${renderStyled(edu.degree)} ${edu.city.value ? `| ${renderStyled(edu.city)}` : ''}</div>
      ${edu.description.value ? `<div style="font-size: 11px; margin-top: 2px;">${renderStyled(edu.description)}</div>` : ''}
    </div>
  `).join('');
  const expHtml = experience.map(exp => `
    <div style="margin-bottom: 12px;">
      <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 12px; color: #1e293b;">
        <span>${renderStyled(exp.position)}</span>
        <span>${renderStyled(exp.startDate)} - ${renderStyled(exp.endDate)}</span>
      </div>
      <div style="font-size: 12px; font-style: italic; color: #475569;">${renderStyled(exp.company)} ${exp.city.value ? `| ${renderStyled(exp.city)}` : ''}</div>
      ${exp.responsibilities.value ? `<div style="font-size: 11px; margin-top: 4px; white-space: pre-wrap;">${renderStyled(exp.responsibilities)}</div>` : ''}
    </div>
  `).join('');
  const skillsHtml = skills.length ? `
    <div style="font-size: 11px;">
      <span style="font-weight: bold; color: #1e293b;">Skills: </span>
      ${skills.map(s => renderStyled(s.name)).filter(Boolean).join(', ')}
    </div>
  ` : '';
  const projHtml = projects.map(proj => `
    <div style="margin-bottom: 10px;">
      <div style="font-weight: bold; font-size: 12px; color: #1e293b;">
        ${renderStyled(proj.name)}
        ${proj.link.value ? `<a href="${proj.link.value}" style="font-weight: normal; color: #2563eb; text-decoration: none; font-size: 10px; margin-left: 5px;">[Link]</a>` : ''}
      </div>
      ${proj.techStack.value ? `<div style="font-size: 11px; color: #64748b; margin-bottom: 2px;"><em>Stack: ${renderStyled(proj.techStack)}</em></div>` : ''}
      ${proj.description.value ? `<div style="font-size: 11px;">${renderStyled(proj.description)}</div>` : ''}
    </div>
  `).join('');
  const langHtml = languages.length ? `
   <div style="font-size: 11px;">
     <span style="font-weight: bold; color: #1e293b;">Languages: </span>
     ${languages.map(l => `${renderStyled(l.language)} ${l.proficiency.value ? `(${renderStyled(l.proficiency)})` : ''}`).filter(n => n.trim().length > 0).join(', ')}
   </div>
 ` : '';
  const awardHtml = awards.map(aw => `
    <div style="margin-bottom: 8px; font-size: 11px;">
      <span style="font-weight: bold; color: #1e293b;">${renderStyled(aw.name)}</span>
      ${aw.organization.value ? `<span> | ${renderStyled(aw.organization)}</span>` : ''}
      ${aw.date.value ? `<span style="color: #64748b;"> (${renderStyled(aw.date)})</span>` : ''}
      ${aw.description.value ? `<div style="margin-top: 1px;">${renderStyled(aw.description)}</div>` : ''}
    </div>
   `).join('');
  return `
    <style>
      body { font-family: 'Helvetica', sans-serif; color: #333; line-height: 1.4; }
      p { margin: 0; padding: 0; }
    </style>
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 20px; border-bottom: 2px solid #333; padding-bottom: 15px;">
      <h1 style="font-size: 24px; font-weight: bold; text-transform: uppercase; margin: 0; color: #1e293b;">${fullName}</h1>
      <div style="font-size: 14px; color: #64748b; margin-top: 5px; font-weight: 500;">${title}</div>
      <div style="font-size: 11px; color: #475569; margin-top: 8px;">
        ${[renderStyled(profile.email), renderStyled(profile.phone), renderStyled(profile.city), renderStyled(profile.country)].filter(Boolean).join(' | ')}
      </div>
       ${profile.links.length > 0 ? `
        <div style="font-size: 11px; margin-top: 5px;">
           ${profile.links.map(l => renderStyled(l.value)).join(' | ')}
        </div>
       ` : ''}
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
