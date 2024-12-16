import { useState, useEffect } from "react";

export default function Certifications() {
  const certificate = [
    { id: "certificate1" },
    { id: "certificate2" },
    { id: "certificate3" },
  ];

  const [inputValue, setInputValue] = useState(() => {
    const savedData = sessionStorage.getItem("certificate");
    return savedData 
    ? JSON.parse(savedData)
    : {
      certificate1: "",
      certificate2: "",
      certificate3: "",
    }
  });

  const handleCertificate = (e) => {
    setInputValue(prev => ({...prev, [e.target.id] : e.target.value }));
  };

  useEffect(() => {
    sessionStorage.setItem("certificate", JSON.stringify(inputValue));
  }, [inputValue])

  return (
    <>
      {/* Certifications */}
      <div className="flex flex-col gap-5 w-full justify-center items-center">
        {/* Section 6 */}
        <h1 className="font-bold text-[2rem] w-full text-center">
          Certifications
        </h1>
        {certificate.map((cert, id) => (
          <div
            key={cert.id}
            className="w-full max-w-md mx-auto my-5 flex flex-col gap-2 border-[1.5px] p-2 border-indigo-400 rounded-md shadow-md"
          >
            <label
              htmlFor="goal"
              className="font-bold text-slate-500 flex items-center gap-2 mt-3"
            >
              <span className="fa-solid fa-graduation-cap"></span>
              <span>Certification Entry {id + 1}</span>
            </label>
            <div id="certificationContainer">
              <div className="mb-6">
                <input
                  required
                  onChange={handleCertificate}
                  value={inputValue[`certificate${id + 1}`]}
                  type="text"
                  id={`certificate${id + 1}`}
                  placeholder="Name of Certification"
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
