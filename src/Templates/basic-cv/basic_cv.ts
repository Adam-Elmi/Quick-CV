import imageSrc from "../../assets/media/naruto_togather.jpg";
import config from "./config.json";
export default function basic_cv(name = "Adam Elmi") {
  const photo = config.profile_summary.photo ? `<li>${imageSrc}</li>` : "";
  const htmlContent = `
    <h1 style='font-size: 1rem; font-weight: bold; color: orange'>${name}</h1>
    <p>Self-taught developer from Somaliland</p>
    <img style="width: 500px" src='${imageSrc}'/>
    <ul>
      <li style="color: green;">SomCheat</li>
      ${photo}
      <li>SomGlossary</li>
      <div style="padding: 10px; border-radius: 100px; border: 2px solid red; width: 50px; height: 50px; text-align: center">A</div>
    </ul>
  `;
  return htmlContent;
}
