import { CVData } from "../../Utilities/cvDataStore";
import { transpileCV } from "../../Utilities/sommarkRenderer";
import templateSrc from "./modern_sidebar.smark?raw";

export default async function modern_sidebar(data: CVData) {
  return await transpileCV(templateSrc || "", data);
}
