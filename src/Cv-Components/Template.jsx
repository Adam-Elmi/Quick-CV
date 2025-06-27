import Preview from "../Helper-Components/Preview";
import basic_cv from "../Templates/basic-cv/basic_cv";
import { useShared } from "../Shared/SharedContext";
export default function Template() {
  const { inputValue } = useShared();
  return (
    <>
      <Preview content={basic_cv(inputValue || "Adam Elmi")}/>
    </>
  );
}
