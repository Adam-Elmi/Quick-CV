import React, { useState } from "react";

export default function Work() {
  const workFields = [
    { id: "work-1" },
    { id: "work-2" },
    { id: "work-3" },
  ];

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
              htmlFor={`job-title-${index}`}
              className="font-bold text-slate-500 flex items-center gap-2 mt-3"
            >
              <span className="fa-solid fa-briefcase"></span>
              <span>Enter your work experience {index + 1}</span>
            </label>
            <div id="workContainer">
              <div className="mb-6">
                <input
                  required
                  type="text"
                  id={`job-title-${index}`}
                  placeholder="Job Title"
                  className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 mb-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />

                <input
                  required
                  type="text"
                  id={`role-${index}`}
                  placeholder="Role/Position"
                  className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 mb-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />

                <input
                  required
                  type="number"
                  id={`start-year-${index}`}
                  placeholder="Start Year"
                  min="1900"
                  max="2100"
                  className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 mb-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />

                <input
                  required
                  type="number"
                  id={`end-year-${index}`}
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
