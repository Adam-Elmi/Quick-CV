import { useState, createContext} from "react";
import Resume from "./Resume-Components/Resume";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Site-Components/Home";

// Create Context
export const InputContext = createContext();

function App() {
  
  // Work experience values
  const [workValue, setWorkValue] = useState(() => {
    const storedData = JSON.parse(sessionStorage.getItem("work-experience"));
    return storedData
      ? storedData
      : [
          {
            job1: "",
            role1: "",
            start1: "",
            end1: "",
          },
          {
            job2: "",
            role2: "",
            start2: "",
            end2: "",
          },
          {
            job3: "",
            role3: "",
            start3: "",
            end3: "",
          },
        ];
  });
  // Marital value
  const [maritalValue, setMaritalValue] = useState(() => {
    const storedData = sessionStorage.getItem("marital");
    return storedData ? storedData : "";
  });
  // Certification value
  const [certificateValue, setCertificateValue] = useState(() => {
    const storedData = JSON.parse(sessionStorage.getItem("certificate"));
    return storedData
      ? storedData
      : {
          certificate1: "",
          certificate2: "",
          certificate3: "",
        };
  });

  return (
    <InputContext.Provider
      value={{
        objectiveValue,
        setObjectiveValue,
        skillValue,
        setSkillValue,
        educationValue,
        setEducationValue,
        workValue,
        setWorkValue,
        maritalValue,
        setMaritalValue,
        certificateValue,
        setCertificateValue,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cv" element={<Resume />}/>
      </Routes>
    </InputContext.Provider>
  );
}

export default App;
