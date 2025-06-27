import imageSrc from "../../assets/media/naruto_togather.jpg";

export default function basic_cv(name = "Adam Elmi") {
  const htmlContent = `
    <h1 style='font-size: 1rem; font-weight: bold; color: orange'>${name}</h1>
    <p>Self-taught developer from Somaliland</p>
    <img style="width: 500px" src='${imageSrc}'/>
    <ul>
      <li style="color: green;">SomCheat</li>
      <li>${imageSrc}</li>
      <li>SomGlossary</li>
      <div style="padding: 10px; border-radius: 100px; border: 2px solid red; width: 50px; height: 50px; text-align: center">A</div>
    </ul>
  `;
  return htmlContent;
}