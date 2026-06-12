// @ts-ignore
import SomMark, { HTML } from "sommark/browser";

/**
 * Prepares a flat placeholders object from the structured CV data.
 * Supports static names (e.g., p{First-Name}) and dynamic names (e.g., p{link-1}).
 *
 * @param data - The CV data object
 * @param lazyImage - If true, returns a tiny placeholder for the picture to speed up transpilation.
 * @param defaults - Per-template defaults applied as a final overlay for any empty placeholder.
 *                   Contributors define these in their template's config file.
 */
export const preparePlaceholders = (data: any, lazyImage: boolean = false, defaults: Record<string, string> = {}) => {
  const p: Record<string, string> = {};
  const { profile, education, experience, skills, projects, languages, awards } = data;

  // Profile (Static)
  if (profile) {
    p["First-Name"] = profile.firstName || "";
    p["Last-Name"] = profile.lastName || "";
    p["profile_title"] = profile.sectionTitle || "";
    
    // Transparent 1x1 pixel placeholder for lazy loading
    const lazyPic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";
    
    if (lazyImage) {
      p["picture"] = lazyPic;
    } else {
      // Leave empty when no picture so the defaults overlay can apply a template-defined avatar
      p["picture"] = profile.picture || "";
    }

    p["email-1"] = profile.email1 || "";
    p["email-2"] = profile.email2 || "";
    p["phone-1"] = profile.phone1 || "";
    p["phone-2"] = profile.phone2 || "";
    p["street-1"] = profile.street1 || "";
    p["street-2"] = profile.street2 || "";
    p["Title"] = profile.title || "";
    p["Email"] = profile.email1 || "";
    p["Phone"] = profile.phone1 || "";
    p["Country"] = profile.country || "";
    p["City"] = profile.city || "";
    p["summary"] = profile.summary || "";

    // Links (Static limit: 5)
    for (let i = 1; i <= 5; i++) {
      const link = profile.links && profile.links[i - 1];
      p[`link-${i}`] = link ? link.value : "";
    }
  }

  // Section titles — raw values; templates supply defaults via their config
  p["education_title"]  = data.educationTitle  || "";
  p["experience_title"] = data.experienceTitle || "";
  p["skills_title"]     = data.skillsTitle     || "";
  p["projects_title"]   = data.projectsTitle   || "";
  p["languages_title"]  = data.languagesTitle  || "";
  p["awards_title"]         = data.awardsTitle         || "";
  p["certifications_title"] = data.certificationsTitle || "";

  // Experience (Static limit: 10)
  for (let i = 1; i <= 10; i++) {
    const exp = (experience && experience[i - 1]) || {};
    p[`exp-${i}-position`] = exp.position || "";
    p[`exp-${i}-company`] = exp.company || "";
    p[`exp-${i}-city`] = exp.city || "";
    p[`exp-${i}-start`] = exp.startDate || "";
    p[`exp-${i}-end`] = exp.endDate || "";
    p[`exp-${i}-desc`] = exp.responsibilities || "";
    // Pre-combined: empty when both sides are empty so div:empty hides correctly
    p[`exp-${i}-date-range`] = [exp.startDate, exp.endDate].filter(Boolean).join(" – ");
    p[`exp-${i}-company-city`] = [exp.company, exp.city].filter(Boolean).join(" · ");
  }

  // Education (Static limit: 5)
  for (let i = 1; i <= 5; i++) {
    const edu = (education && education[i - 1]) || {};
    p[`edu-${i}-school`] = edu.school || "";
    p[`edu-${i}-degree`] = edu.degree || "";
    p[`edu-${i}-city`] = edu.city || "";
    p[`edu-${i}-start`] = edu.startDate || "";
    p[`edu-${i}-end`] = edu.endDate || "";
    p[`edu-${i}-desc`] = edu.description || "";
    p[`edu-${i}-date-range`] = [edu.startDate, edu.endDate].filter(Boolean).join(" – ");
    p[`edu-${i}-degree-city`] = [edu.degree, edu.city].filter(Boolean).join(" · ");
  }

  // Skills (Static limit: 20)
  for (let i = 1; i <= 20; i++) {
    const skill = (skills && skills[i - 1]) || {};
    p[`skill-${i}`] = skill.name || "";
  }
  p["Skills-Joined"] = (skills || []).map((s: any) => s.name).filter(Boolean).join(", ");

  // Projects (Static limit: 5)
  for (let i = 1; i <= 5; i++) {
    const proj = (projects && projects[i - 1]) || {};
    p[`proj-${i}-name`] = proj.name || "";
    p[`proj-${i}-tech`] = proj.techStack || "";
    p[`proj-${i}-link`] = proj.link || "";
    p[`proj-${i}-desc`] = proj.description || "";
  }

  // Languages (Static limit: 5)
  for (let i = 1; i <= 5; i++) {
    const lang = (languages && languages[i - 1]) || {};
    p[`lang-${i}-name`] = lang.language || "";
    p[`lang-${i}-level`] = lang.proficiency || "";
    // Combined: "English: Native" — empty when both sides are empty
    p[`lang-${i}`] = [lang.language, lang.proficiency].filter(Boolean).join(": ");
  }

  // Awards (Static limit: 5)
  for (let i = 1; i <= 5; i++) {
    const award = (awards && awards[i - 1]) || {};
    p[`award-${i}-name`] = award.name || "";
    p[`award-${i}-org`] = award.organization || "";
    p[`award-${i}-date`] = award.date || "";
    p[`award-${i}-desc`] = award.description || "";
  }

  // Certifications (Static limit: 5)
  const { certifications } = data;
  for (let i = 1; i <= 5; i++) {
    const cert = (certifications && certifications[i - 1]) || {};
    p[`cert-${i}-name`]        = cert.name         || "";
    p[`cert-${i}-issuer`]      = cert.issuer        || "";
    p[`cert-${i}-issue-date`]  = cert.issueDate     || "";
    p[`cert-${i}-expiry-date`] = cert.expiryDate    || "";
    p[`cert-${i}-id`]          = cert.credentialId  || "";
    p[`cert-${i}-url`]         = cert.credentialUrl || "";
  }

  // Apply template-defined defaults: fill any placeholder that is still empty.
  // Keys containing "*" are treated as wildcard patterns matching any digit sequence
  // (e.g. "edu-*-school" matches "edu-1-school", "edu-2-school", ...).
  for (const [key, fallback] of Object.entries(defaults)) {
    if (key.includes("*")) {
      const re = new RegExp(`^${key.replace(/\*/g, "\\d+")}$`);
      for (const pKey of Object.keys(p)) {
        if (re.test(pKey) && !p[pKey]) p[pKey] = fallback;
      }
    } else {
      if (!p[key]) p[key] = fallback;
    }
  }

  return p;
};

const virtualFiles: Record<string, string> = {};

export const registerVirtualModule = (path: string, src: string) => {
  virtualFiles[path] = src;
};

/**
 * Initializes the SomMark engine with CV-specific mappers.
 */
export const createCVEngine = (src: string, data: any, lazyImage: boolean = false, filename = "anonymous", baseDir = "/", defaults: Record<string, string> = {}) => {
  const cvMapper = HTML.clone();

  const engine = new SomMark({
    src,
    format: "html",
    mapperFile: cvMapper,
    filename,
    baseDir,
    placeholders: preparePlaceholders(data, lazyImage, defaults),
    files: virtualFiles,
  });

  return engine;
};

/**
 * After SomMark rendering, finds every HTML-escaped styled span produced by
 * getStyledVal and restores them as real inline-style spans so react-pdf-html
 * can process them via convertElementStyle.
 */
const injectFieldStyles = (html: string): string => {
  return html.replace(
    /&lt;span style=&quot;([^&]*)&quot;&gt;([\s\S]*?)&lt;\/span&gt;/g,
    (_, css, content) => `<span style="${css}">${content}</span>`
  );
};

/**
 * High-level function to transpile a CV template with data.
 */
export const transpileCV = async (templateSrc: string, data: any, lazyImage: boolean = false, filename = "anonymous", baseDir = "/", defaults: Record<string, string> = {}) => {
  if (!templateSrc) return "";
  const engine = createCVEngine(templateSrc, data, lazyImage, filename, baseDir, defaults);
  const result = await engine.transpile();
  // SomMark escapes placeholder values via escapeHTML. Convert the escaped
  // styled spans into CSS class rules injected into the <style> block so that
  // react-pdf-html applies color and font styles reliably.
  return injectFieldStyles(result);
};
