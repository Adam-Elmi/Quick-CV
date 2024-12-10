import { useState } from "react";

export default function GenerateCV() {
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
              if(key === "work_experience") key = "work";
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
          // Map specific keys before processing
          if (["fullname", "phone_number", "email", "country", "city"].includes(key)) {
            key = "contact";
          }
          else if (["skill1", "skill2", "skill3", "skill4", "skill5", "skill6", "skill7", "skill8"].includes(key)) {
            key = "skills";
          } else if (["certificate1", "certificate2", "certificate3"].includes(key)) {
            key = "certification";
          }

          // Add the updated key to emptyField if it's not already included
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

  console.log(emptyField);

  return (
    <>
      <div className="flex flex-col p-2 gap-5 justify-center items-center m-2">
        <div className="flex flex-col gap-4 justify-center items-center w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            id="Layer_1"
            width="150"
            height="150"
            fill="#000"
            version="1.1"
            viewBox="0 0 480 480"
          >
            <g id="SVGRepo_iconCarrier">
              <path d="M413.648 74.336 341.664 2.352A7.95 7.95 0 0 0 336 0H104C81.944 0 64 17.944 64 40v344c0 22.056 17.944 40 40 40h88v56h16v-56h120c4.416 0 8-3.576 8-8v-40c0-14.88 10.216-27.432 24-30.984V480h16v-56c22.056 0 40-17.944 40-40V80a7.95 7.95 0 0 0-2.352-5.664M344 27.312 388.688 72H344zM400 384c0 13.232-10.768 24-24 24v-72c0-4.424-3.584-8-8-8-26.472 0-48 21.528-48 48v32H104c-13.232 0-24-10.768-24-24V40c0-13.232 10.768-24 24-24h224v64c0 4.424 3.584 8 8 8h64z"></path>
              <path d="M224 48H112c-4.416 0-8 3.576-8 8v112c0 4.424 3.584 8 8 8h112c4.416 0 8-3.576 8-8V56c0-4.424-3.584-8-8-8m-40 112h-32v-16c0-8.824 7.176-16 16-16s16 7.176 16 16zm-24-56c0-4.416 3.592-8 8-8s8 3.584 8 8-3.592 8-8 8-8-3.584-8-8m56 56h-16v-16c0-10.488-5.136-19.72-12.952-25.56 3.064-4.032 4.952-9 4.952-14.44 0-13.232-10.768-24-24-24s-24 10.768-24 24c0 5.44 1.888 10.408 4.952 14.44C141.136 124.28 136 133.512 136 144v16h-16V64h96zM248 72h40v16h-40zM248 104h48v16h-48zM312 104h40v16h-40zM248 136h104v16H248zM144 200h64v16h-64zM224 200h48v16h-48zM288 200h80v16h-80zM112 232h64v16h-64zM192 232h128v16H192zM336 232h32v16h-32zM112 264h32v16h-32zM160 264h96v16h-96zM272 264h96v16h-96zM112 296h32v16h-32zM160 296h96v16h-96zM272 296h96v16h-96zM112 328h72v16h-72zM200 328h112v16H200zM112 360h32v16h-32zM160 360h136v16H160z"></path>
            </g>
          </svg>
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
        className={`fixed ${
          isVisible ? "flex" : "hidden"
        } bottom-0 inset-0 items-center justify-center bg-gray-800 bg-opacity-50 z-50`}
      >
        <div className="bg-white shadow-lg mx-2 rounded-lg w-full max-w-md relative p-1 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-md pb-3 relative border-2">
            <div className="text-center mb-4 flex items-center gap-4 border-b-2 py-3 px-2">
              <i className="fas fa-exclamation-circle text-indigo-500 text-[1.2rem]"></i>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 22 22"
                >
                  <defs>
                    <linearGradient id="a">
                      <stop
                        offset={0}
                        style={{
                          stopColor: "#fcd994",
                          stopOpacity: 1,
                        }}
                      />
                      <stop
                        offset={1}
                        style={{
                          stopColor: "#fff6e1",
                          stopOpacity: 1,
                        }}
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d="m11 1032.362-10 18h20zm0 2 8 15H3z"
                    style={{
                      fill: "#ffc35a",
                      fillOpacity: 1,
                      stroke: "none",
                      strokeWidth: 1,
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeOpacity: 1,
                    }}
                    transform="translate(0 -1030.362)"
                  />
                  <path
                    d="M10 1046.362h2v2h-2zM10 1045.362h2v-6h-2z"
                    style={{
                      fill: "#373737",
                      fillOpacity: 0.94117647,
                      stroke: "none",
                      strokeWidth: 1,
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeOpacity: 1,
                    }}
                    transform="translate(0 -1030.362)"
                  />
                </svg>
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          className="icon flat-line"
                          data-name="Flat Line"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M3 12h18"
                            style={{
                              fill: "none",
                              stroke: "#777",
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                            }}
                          />
                          <path
                            d="m18 15 3-3-3-3"
                            data-name="primary"
                            style={{
                              fill: "none",
                              stroke: "#777",
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                            }}
                          />
                        </svg>
                        <div className="w-full flex items-center gap-2">
                          <p className="font-semibold text-indigo-600 text-[0.9rem]">{`${
                            field[0].toUpperCase() + field.slice(1)
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
