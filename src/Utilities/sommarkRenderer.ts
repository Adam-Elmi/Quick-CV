// @ts-ignore
import SomMark, { HTML } from "sommark";

/**
 * Prepares a flat placeholders object from the structured CV data.
 * Supports static names (e.g., p{First-Name}) and dynamic names (e.g., p{link-1}).
 * 
 * @param data - The CV data object
 * @param lazyImage - If true, returns a tiny placeholder for the picture to speed up transpilation.
 */
export const preparePlaceholders = (data: any, lazyImage: boolean = false) => {
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
      p["picture"] = profile.picture || lazyPic;
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

    // Links (Static limit: 5)
    for (let i = 1; i <= 5; i++) {
      const link = profile.links && profile.links[i - 1];
      p[`link-${i}`] = link ? link.value : "";
    }
  }

  // Experience (Static limit: 10)
  for (let i = 1; i <= 10; i++) {
    const exp = (experience && experience[i - 1]) || {};
    p[`exp-${i}-position`] = exp.position || "";
    p[`exp-${i}-company`] = exp.company || "";
    p[`exp-${i}-city`] = exp.city || "";
    p[`exp-${i}-start`] = exp.startDate || "";
    p[`exp-${i}-end`] = exp.endDate || "";
    p[`exp-${i}-desc`] = exp.responsibilities || "";
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
  }

  // Awards (Static limit: 5)
  for (let i = 1; i <= 5; i++) {
    const award = (awards && awards[i - 1]) || {};
    p[`award-${i}-name`] = award.name || "";
    p[`award-${i}-org`] = award.organization || "";
    p[`award-${i}-date`] = award.date || "";
    p[`award-${i}-desc`] = award.description || "";
  }

  return p;
};

export const globalModuleCache = new Map();

export const registerVirtualModule = (path: string, src: string) => {
  try {
    const ast = new SomMark({ src, format: "html" }).parseSync();
    globalModuleCache.set(path, ast);
  } catch (err) {
    console.error(`Failed to parse virtual module: ${path}`, err);
  }
};

/**
 * Initializes the SomMark engine with CV-specific mappers.
 */
export const createCVEngine = (src: string, data: any, lazyImage: boolean = false, filename = "anonymous", baseDir = "/") => {
  const cvMapper = HTML.clone();

  const engine = new SomMark({
    src,
    format: "html",
    mapperFile: cvMapper,
    filename,
    baseDir,
    placeholders: preparePlaceholders(data, lazyImage),
    moduleCache: globalModuleCache
  });

  return engine;
};

/**
 * High-level function to transpile a CV template with data.
 */
export const transpileCV = async (templateSrc: string, data: any, lazyImage: boolean = false, filename = "anonymous", baseDir = "/") => {
  if (!templateSrc) return "";
  const engine = createCVEngine(templateSrc, data, lazyImage, filename, baseDir);
  const result = await engine.transpile();
  return result;
};
