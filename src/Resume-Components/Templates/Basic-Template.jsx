import { useState } from "react";

export default function BasicTemplate() {
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
    return storedData ? storedData : "";
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
    <>
      {/* CV */}
      <div
        id="page"
        className="w-[595px] h-auto max-w-full border p-3 max-md:w-full"
      >
        {/* Header */}
        <div
          id="header-page"
          className="bg-gray-800 max-w-full w-[650px] min-h-[80px] text-white p-2 flex gap-5 justify-between m-auto"
        >
          {/* Name section */}
          <div className="min-h-full flex justify-center items-center px-2">
            <p className="text-[0.9rem] font-bold">
              {contactValue?.fullname?.trim() || "Please enter your name"}
            </p>
          </div>
          {/* Contact section */}
          <div className="flex flex-col gap-2">
            {/* Phone Number */}
            <div className="flex gap-1">
              <span className="text-slate-400 font-semibold text-[0.8rem]">
                Phone Number:{" "}
              </span>
              <span className="text-white text-[0.8rem]">
                {contactValue?.phone_number?.trim() ||
                  "Please enter your phone number"}
              </span>
            </div>
            {/* Email address */}
            <div className="flex gap-1">
              <span className="text-slate-400 font-semibold text-[0.8rem]">
                Email:{" "}
              </span>
              <span className="text-white text-[0.8rem]">
                {contactValue?.email?.trim() || "Please enter your email"}
              </span>
            </div>
            {/* Address */}
            <div className="flex gap-1">
              <span className="text-slate-400 font-semibold text-[0.8rem]">
                Address:{" "}
              </span>
              <span className="text-white text-[0.8rem]">
                {`${contactValue?.city?.trim() || "Please enter your city"}, ${contactValue?.country?.trim() || " and country "
                  }`}
              </span>
            </div>
          </div>
        </div>

        {/* Objective */}
        <h1 className="text-[1rem] underline font-bold mt-2 p-2">Objective</h1>
        <div className="mb-5">
          <p className="pl-2 text-[0.9rem]">
            {objectiveValue?.trim() || "Please write your objective or goal"}
          </p>
        </div>
        {/* Skills */}
        <h1 className="text-[1rem] underline font-bold mt-2 p-2">Skills</h1>
        <div className="flex gap-16 w-full items-center justify-between p-2">
          <ul className="flex flex-col gap-2 w-full pl-4">
            <li className="list-disc text-[0.8rem]">
              {skillValue?.skill1?.trim() || "Enter your skill 1"}
            </li>
            <li className="list-disc text-[0.8rem]">
              {skillValue?.skill2?.trim() || "Enter your skill 2"}
            </li>
            <li className="list-disc text-[0.8rem]">
              {skillValue?.skill3?.trim() || "Enter your skill 3"}
            </li>
            <li className="list-disc text-[0.8rem]">
              {skillValue?.skill4?.trim() || "Enter your skill 4"}
            </li>
          </ul>
          <ul className="flex flex-col gap-2 w-full">
            <li className="list-disc text-[0.8rem]">
              {skillValue?.skill5?.trim() || "Enter your skill 5"}
            </li>
            <li className="list-disc text-[0.8rem]">
              {skillValue?.skill6?.trim() || "Enter your skill 6"}
            </li>
            <li className="list-disc text-[0.8rem]">
              {skillValue?.skill7?.trim() || "Enter your skill 7"}
            </li>
            <li className="list-disc text-[0.8rem]">
              {skillValue?.skill8?.trim() || "Enter your skill 8"}
            </li>
          </ul>
        </div>

        {/* Education */}
        <h1 className="text-[1rem] underline font-bold mt-2 p-2">Education</h1>
        <div>
          <div className="flex justify-between">
            <ul className="flex-1 pl-4">
              <li className="font-bold text-[0.8rem] text-slate-700 list-disc">
                {educationValue[0]?.school1?.trim() || "Enter your college 1"}
              </li>
              <span className="text-[0.8rem]">{`(${educationValue[0]?.start1?.trim() || "Start year"
                } - ${educationValue[0]?.end1?.trim() || "End year"})`}</span>
            </ul>
            <ul className="flex-1">
              <li className="font-bold text-[0.8rem] text-slate-700 list-disc">
                {educationValue[1]?.school2?.trim() || "Enter your college 2"}
              </li>
              <span className="text-[0.8rem]">{`(${educationValue[1]?.start2?.trim() || "Start year"
                } - ${educationValue[1]?.end2?.trim() || "End year"})`}</span>
            </ul>
          </div>
          <div className="flex justify-center items-center my-2">
            <div className="w-[7px] h-[7px] bg-[rgba(0.3,0.3,0.3,0.2)] rounded-full"></div>
            <div className="w-full h-[2px] bg-[rgba(0.3,0.3,0.3,0.2)]"></div>
            <div className="w-[7px] h-[7px] bg-[rgba(0.3,0.3,0.3,0.2)] rounded-full"></div>
          </div>
        </div>

        {/* Work Experience */}
        <h1 className="text-[1rem] underline font-bold mt-2 p-2">
          Work Experience
        </h1>
        <div className="overflow-hidden rounded-lg border border-gray-300">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-3 text-left text-sm">Company name</th>
                <th className="py-2 px-3 text-left text-sm">Role</th>
                <th className="py-2 px-3 text-left text-sm">Start Year</th>
                <th className="py-2 px-3 text-left text-sm">End Year</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              <tr className="hover:bg-gray-100 transition-colors duration-200">
                <td className="py-2 px-3 border-b">
                  {workValue[0]?.job1?.trim() || "Enter company name"}
                </td>
                <td className="py-2 px-3 border-b">
                  {workValue[0]?.role1?.trim() || "Enter position"}
                </td>
                <td className="py-2 px-3 border-b">
                  {workValue[0]?.start1?.trim() || "Start year"}
                </td>
                <td className="py-2 px-3 border-b">
                  {workValue[0]?.end1?.trim() || "End year"}
                </td>
              </tr>
              <tr className="hover:bg-gray-100 transition-colors duration-200">
                <td className="py-2 px-3 border-b">
                  {workValue[1]?.job2?.trim() || "Enter company name"}
                </td>
                <td className="py-2 px-3 border-b">
                  {workValue[1]?.role2?.trim() || "Enter position"}
                </td>
                <td className="py-2 px-3 border-b">
                  {workValue[1]?.start2?.trim() || "Start year"}
                </td>
                <td className="py-2 px-3 border-b">
                  {workValue[1]?.end2?.trim() || "End year"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Marital Status */}
        <h1 className="text-[1rem] underline font-bold mt-2 p-2">
          Marital Status
        </h1>
        <ul className="pl-4">
          <li className="list-disc">
            {maritalValue?.trim() || "Enter marital status"}
          </li>
        </ul>

        {/* Certifications */}
        <h1 className="text-[1rem] underline font-bold mt-2 p-2">
          Certifications
        </h1>
        <div className="flex justify-between pl-4 gap-">
          <ul className="flex flex-col gap-2">
            <li className="list-disc text-[0.8rem]">
              {certificateValue?.certificate1?.trim() ||
                "Enter your certificate"}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
