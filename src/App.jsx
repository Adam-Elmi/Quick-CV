import { useState, createContext} from "react";
import Resume from "./Resume-Components/Resume";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Site-Components/Home";


function App() {
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
