import Preview from "../Helper-Components/Preview";
import basic_cv from "../Templates/basic-cv/basic_cv";
export default function Template() {
  return (
    <>
      <Preview content={basic_cv("Adam Elmi")}/>
    </>
  );
}
