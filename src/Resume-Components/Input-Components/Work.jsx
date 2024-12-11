import { useEffect, useState, useContext } from "react";
import { InputContext } from "../../App";

export default function Work() {
  const { setWorkValue } = useContext(InputContext);
  const workFields = [{ id: "work1" }, { id: "work2" }, { id: "work3" }];

  const [inputValue, setInputValue] = useState(() => {
    const savedData = sessionStorage.getItem("work-experience");
    return savedData
      ? JSON.parse(savedData)
      : [
        { job1: "", role1: "", start1: "", end1: "" },
        { job2: "", role2: "", start2: "", end2: "" },
        { job3: "", role3: "", start3: "", end3: "" },
      ];
  });

  const handleWork = (e, index) => {
    const { id: fieldId, value } = e.target;
    setInputValue((prev) =>
      prev.map((work, idx) =>
        idx === index ? { ...work, [fieldId]: value } : work
      )
    );
  };

  useEffect(() => {
    sessionStorage.setItem("work-experience", JSON.stringify(inputValue));
    setWorkValue(inputValue);
  }, [inputValue]);
  return (
    <>
      {/* Work Experience */}
      <div className="flex flex-col gap-5 w-full justify-center items-center">
        <h1 className="font-bold text-[2rem] w-full text-center">
          Work Experience
        </h1>
        {workFields.map((jobField, index) => (
          <div
            key={jobField.id}
            className="w-full max-w-md mx-auto mb-5 flex flex-col gap-2 border-[1.5px] p-2 border-indigo-400 rounded-md shadow-md"
          >
            <label
              htmlFor={`job${index + 1}`}
              className="font-bold text-slate-500 flex items-center gap-2 mt-3"
            >
              <span className="fa-solid fa-briefcase"></span>
              <span>Enter your work experience {index + 1}</span>
            </label>
            <div id="workContainer">
              <div className="mb-6">
                <input
                  required
                  onChange={(e) => handleWork(e, index)}
                  value={inputValue[index][`job${index + 1}`]}
                  type="text"
                  id={`job${index + 1}`}
                  placeholder="Job Title"
                  className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 mb-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />

                <input
                  required
                  type="text"
                  onChange={(e) => handleWork(e, index)}
                  value={inputValue[index][`role${index + 1}`]}
                  id={`role${index + 1}`}
                  placeholder="Role/Position"
                  className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 mb-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />

                <input
                  required
                  type="number"
                  onChange={(e) => handleWork(e, index)}
                  value={inputValue[index][`start${index + 1}`]}
                  id={`start${index + 1}`}
                  placeholder="Start Year"
                  min="1900"
                  max="2100"
                  className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 mb-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />

                <input
                  required
                  type="number"
                  onChange={(e) => handleWork(e, index)}
                  value={inputValue[index][`end${index + 1}`]}
                  id={`end${index + 1}`}
                  placeholder="End Year / Present"
                  min="1900"
                  max="2100"
                  className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 mb-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
