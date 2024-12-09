import { useEffect, useState, createContext } from "react";
import Contact from "./Contact";
import Objective from "./Objective";
import Skills from "./Skills";
import Education from "./Education";
import Work from "./Work";
import Marital from "./Marital";
import Certifications from "./Certifications";
import Template from "./Template";
import Workflow from "./Workflow";
import GenerateCV from "./GenerateCv";

export const CheckContext = createContext();

export default function Resume() {
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    const functionBtns = document.querySelectorAll(".function-btn");
    functionBtns[0].classList.add("activeBtn");

    function activeClass(event) {
      if (functionBtns) {
        functionBtns.forEach((btn) => btn.classList.remove("activeBtn"));
        event.currentTarget.classList.add("activeBtn");
      }

      switch (true) {
        case event.currentTarget.classList.contains("edit"):
          setIsPreview(false);
          break;
        case event.currentTarget.classList.contains("preview"):
          setIsPreview(true);
          break;
      }
    }
    functionBtns.forEach((btn) => btn.addEventListener("click", activeClass));

    return () =>
      functionBtns.forEach((btn) =>
        btn.removeEventListener("click", activeClass)
      );
  }, []);

  function getSaveData(name) {
    return JSON.parse(sessionStorage.getItem(name));
  }

  const [checkContact, setCheckContact] = useState(() => {
    const savedData = getSaveData("contact");
    return savedData
      ? savedData
      : {
          fullname: "",
          phone_number: "",
          email: "",
          country: "",
          city: "",
        };
  });

  const [checkObjective, setCheckObjective] = useState(() => {
    const savedData = sessionStorage.getItem("objective");
    return savedData ? savedData : "";
  });

  const [checkSkill, setCheckSkill] = useState(() => {
    const savedData = getSaveData("skills");
    return savedData
      ? savedData
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

  const [checkEduction, setCheckEducation] = useState(() => {
    const savedData = getSaveData("education");
    return savedData
      ? savedData
      : [
          { school1: "", start1: "", end1: "" },
          { school2: "", start2: "", end2: "" },
          { school3: "", start3: "", end3: "" },
          { school4: "", start4: "", end4: "" },
        ];
  });

  const [checkWork, setCheckWork] = useState(() => {
    const savedData = getSaveData("work-experience");
    return savedData
      ? savedData
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

  const [checkMarital, setCheckMarital] = useState(() => {
    const savedData = sessionStorage.getItem("marital");
    return savedData ? savedData : "";
  });

  const [checkCertificate, setCheckCertificate] = useState(() => {
    const savedData = getSaveData("certificate");
    return savedData
    ? savedData
    : {
      certificate1: "",
      certificate2: "",
      certificate3: "",
    }
  });

  return (
    <CheckContext.Provider
      value={{
        checkContact,
        setCheckContact,
        checkObjective,
        setCheckObjective,
        checkSkill,
        setCheckSkill,
        checkEduction,
        setCheckEducation,
        checkWork,
        setCheckWork,
        checkMarital,
        setCheckMarital,
        checkCertificate,
        setCheckCertificate
      }}
    >
      <div className=" w-full flex flex-col justify-center items-center p-5">
        <h1 id="hide" className="my-5 font-bold text-[2rem] w-full text-center">
          Create Your CV
        </h1>
        <div id="hide" className="flex gap-10  my-4">
          <button
            id="function-btn"
            className="edit function-btn border-[1.5px] border-slate-300 rounded-md bg-white text-black hover:bg-slate-800 hover:text-white px-4 py-2 flex gap-2 justify-center items-center"
          >
            <span className="fa-solid fa-pen-to-square"></span>
            <span className=" font-semibold rounded-md">Edit CV</span>
          </button>
          <button
            id="function-btn"
            className="preview function-btn border-[1.5px] border-slate-300 rounded-md bg-white text-black hover:bg-slate-800 hover:text-white px-4 py-2 flex gap-2 justify-center items-center"
          >
            <span className="fa-regular fa-eye"></span>
            <span className="font-semibold rounded-md">Preview CV</span>
          </button>
        </div>
        {isPreview ? (
          <Template />
        ) : (
          <>
            {/* Input Form */}
            <div className="max-w-[600px] w-full flex flex-col justify-center items-center gap-5 shadow-md px-2 mt-5 py-5 border-2 border-blue-500 rounded-md">
              <Workflow
                children={[
                  <Contact key="contact" />,
                  <Objective key="objective" />,
                  <Skills key="skills" />,
                  <Education key="education" />,
                  <Work key="work" />,
                  <Marital key="marital" />,
                  <Certifications key="certifications" />,
                  <GenerateCV key="generateCV" />,
                ]}
              />
            </div>
          </>
        )}
      </div>
    </CheckContext.Provider>
  );
}
