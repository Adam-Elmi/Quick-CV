import { useState, createContext} from "react";
import Resume from "./Resume-Components/Resume";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Site-Components/Home";

// Create Context
export const InputContext = createContext();

function App() {
  // Contact values
  const [contactValue, setContactValue] = useState(() => {
    const initialValue = {
      fullname: "",
      phone_number: "",
      email: "",
      country: "",
      city: "",
    };
    const storedData = JSON.parse(sessionStorage.getItem("contact"));
    return storedData ? storedData : initialValue;
  });
  // Objective values
  const [objectiveValue, setObjectiveValue] = useState(() => {
    const storedData = sessionStorage.getItem("objective");
    return storedData
      ? storedData
      : "";
  });
  // Skills values
  const [skillValue, setSkillValue] = useState(() => {
    const storedData = JSON.parse(sessionStorage.getItem("skills"));
    return storedData
      ? storedData
      : {
          skill1: "",
          skill2: "",
          skill3: "",
          skill4: "",
          skill5: "",
          skill6: "",
          skill7: "",
          skill8: "",
        };
  });
  // Education values
  const [educationValue, setEducationValue] = useState(() => {
    const storedData = JSON.parse(sessionStorage.getItem("education"));
    return storedData
      ? storedData
      : [
          {
            school1: "",
            start1: "",
            end1: "",
          },
          {
            school2: "",
            start2: "",
            end2: "",
          },
          {
            school3: "",
            start3: "",
            end3: "",
          },
          {
            school4: "",
            start4: "",
            end4: "",
          },
        ];
  });
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
        contactValue,
        setContactValue,
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
        <Route path="/" element={<Resume />}/>
        <Route path="/tool" element={<Home />}/>
      </Routes>
    </InputContext.Provider>
  );
}

export default App;
