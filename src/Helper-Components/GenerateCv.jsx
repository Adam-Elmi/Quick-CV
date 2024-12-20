import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SvgCv from "../Svg-Components/Svg-Cv";
import SvgWarn from "../Svg-Components/Svg-Warn";
import SvgArrow from "../Svg-Components/Svg-Arrow";

export default function GenerateCV() {
  const navigate = useNavigate();
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

  const [checkEducation, setCheckEducation] = useState(() => {
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
      };
  });

  const checkValues = {
    ...checkContact,
    objective: checkObjective,
    ...checkSkill,
    education: checkEducation,
    work_experience: checkWork,
    marital: checkMarital,
    ...checkCertificate,
  };

  const [isVisible, setIsVisible] = useState(false);
  const [emptyField, setEmptyField] = useState([]);

  const handleClick = () => {
    let hasInvalidValue = false;

    if (checkValues && typeof checkValues === "object") {
      Object.entries(checkValues).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((child) => {
            Object.values(child).forEach((prop) => {
              if (prop === "" || prop === "undefined" || prop == null) {
                if (key === "work_experience") key = "work";
                setEmptyField((prev) => {
                  if (!prev.includes(key)) {
                    return [...prev, key];
                  }
                  return prev;
                });
                hasInvalidValue = true;
              }
            });
          });
        } else {
          if (value === "" || value === "undefined" || value == null) {
            if (
              ["fullname", "phone_number", "email", "country", "city"].includes(
                key
              )
            ) {
              key = "contact";
            } else if (
              [
                "skill1",
                "skill2",
                "skill3",
                "skill4",
                "skill5",
                "skill6",
                "skill7",
                "skill8",
              ].includes(key)
            ) {
              key = "skills";
            } else if (
              ["certificate1", "certificate2", "certificate3"].includes(key)
            ) {
              key = "certification";
            }

            setEmptyField((prev) => {
              if (!prev.includes(key)) {
                return [...prev, key];
              }
              return prev;
            });
            hasInvalidValue = true;
          }
        }
      });
    }

    setIsVisible(hasInvalidValue);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const resumeSections = [
    "contact",
    "objective",
    "skills",
    "education",
    "work",
    "marital",
    "certification",
  ];
  const refreshPage = () => {
    navigate(0); // Refreshes the current route
  };
  useEffect(() => {
    const emptySections = document.querySelectorAll(".empty-sections");

    const change_current_index = (index) => {
      sessionStorage.setItem("current", index);
      handleClose();
      refreshPage();
    };

    const handleSection = (e) => {
      if (resumeSections) {
        const index = resumeSections.findIndex(
          (value) => value === e.target.id
        );
        resumeSections.includes(e.target.id);
        change_current_index(index);
      }
    };

    if (emptySections) {
      emptySections.forEach((section) => {
        section.addEventListener("click", handleSection);
      });

      return () => {
        if (emptySections) {
          emptySections.forEach((section) => {
            section.removeEventListener("click", handleSection);
          });
        }
      };
    }
  }, [checkValues]);

  return (
    <>
      <div className="flex flex-col p-2 gap-5 justify-center items-center m-2">
        <div className="flex flex-col gap-4 justify-center items-center w-full">
          <SvgCv />
          <p className="text-[1.2rem]">Create generate your cv</p>
        </div>
        <button
          onClick={handleClick}
          className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
        >
          Generate CV
        </button>
      </div>
      <div
        className={`fixed ${isVisible ? "flex" : "hidden"
          } bottom-0 inset-0 items-center justify-center bg-gray-800 bg-opacity-50 z-50`}
      >
        <div className="bg-white shadow-lg mx-2 rounded-lg w-full max-w-md relative p-1 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-md pb-3 relative border-2">
            <div className="text-center mb-4 flex items-center gap-4 border-b-2 py-3 px-2">
              <span className="fas fa-exclamation-circle text-indigo-500 text-[1.2rem]"></span>
              <h2 className="text-[1.2rem] font-semibold text-gray-800 font-mono">
                Please Fill All Inputs
              </h2>
              <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                <span
                  onClick={handleClose}
                  className="fas fa-times text-xl"
                ></span>
              </button>
            </div>
            <div className="w-full p-2">
              <div className="flex items-center justify-center gap-2">
                <SvgWarn />
                <h2 className="font-semibold text-slate-700">
                  Inputs that have not been filled
                </h2>
              </div>
              <div className="w-full max-h-[380px] overflow-y-scroll">
                {emptyField
                  ? emptyField.map((field, id) => (
                    <div
                      key={id}
                      className="w-full flex items-center gap-2 my-2 border-[1.5px] hover:border-indigo-500 p-2 rounded-lg"
                    >
                      <SvgArrow />
                      <div className="w-full flex items-center gap-2">
                        <p
                          id={field}
                          className="empty-sections font-semibold text-indigo-600 text-[0.9rem] hover:text-green-600 cursor-pointer"
                        >{`${field[0].toUpperCase() + field.slice(1)
                          } Section`}</p>
                        <span className="text-[0.7rem] text-slate-500 font-mono">
                          - Fill this section.
                        </span>
                      </div>
                    </div>
                  ))
                  : ""}
              </div>
            </div>
            <div className="mt-2 text-center">
              <button
                onClick={handleClose}
                className="bg-slate-800 font-mono shadow-md hover:bg-indigo-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 text-white py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
