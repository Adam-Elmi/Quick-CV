import { CVData } from "../../Utilities/cvDataStore";
import { transpileCV } from "../../Utilities/sommarkRenderer";
import templateSrc from "./basic_cv.smark?raw";

export default async function basic_cv(data: CVData) {
  return await transpileCV(templateSrc || "", data);
}
