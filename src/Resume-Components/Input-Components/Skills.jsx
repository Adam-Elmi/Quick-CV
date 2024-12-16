import { useState, useEffect } from "react";

export default function Skills() {
  const skills = [
    { id: "skill-1", placeholder: "Write Skill 1" },
    { id: "skill-2", placeholder: "Write Skill 2" },
    { id: "skill-3", placeholder: "Write Skill 3" },
    { id: "skill-4", placeholder: "Write Skill 4" },
    { id: "skill-5", placeholder: "Write Skill 5" },
    { id: "skill-6", placeholder: "Write Skill 6" },
    { id: "skill-7", placeholder: "Write Skill 7" },
    { id: "skill-8", placeholder: "Write Skill 8" },
  ];

  const [defaultValue, setDefaultValue] = useState({
    skill1: "Select a skill",
    skill2: "Select a skill",
    skill3: "Select a skill",
    skill4: "Select a skill",
    skill5: "Select a skill",
    skill6: "Select a skill",
    skill7: "Select a skill",
    skill8: "Select a skill",
  });

  const [inputValue, setInputValue] = useState(() => {
    const savedData = sessionStorage.getItem("skills");
    return savedData
      ? JSON.parse(savedData)
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

  useEffect(() => {
    sessionStorage.setItem("skills", JSON.stringify(inputValue));
  }, [inputValue]);

  useEffect(() => {
    const getValue = JSON.parse(sessionStorage.getItem("skills")) || "";
    try {
      if (getValue && getValue !== "undefined") {
        for (const key in getValue) {
          setInputValue((prev) => ({ ...prev, [key]: getValue[key] }));
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSkill = (e) => {
    setInputValue((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setDefaultValue((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    setSkillValue(inputValue);
  }, [inputValue]);

  return (
    <>
      {/* Skills */}
      <div className="flex flex-col gap-4">
        {/* Section 3 */}
        <h1 className="font-bold text-[2rem] w-full text-center">Skills</h1>
        {skills.map((skill, id) => (
          <div
            key={skill.id}
            className="w-full flex flex-col gap-2 border-[1.5px] p-2 border-blue-400 rounded-md shadow-md"
          >
            <label
              htmlFor="goal"
              className="font-bold text-slate-500 flex items-center gap-2 mt-3"
            >
              <span className="fa-solid fa-feather"></span>
              <span>Enter your skill {id + 1}</span>
            </label>
            <div className="relative">
              <select
                onChange={handleSkill}
                name="skills"
                id={`skill${id + 1}`}
                value={defaultValue[`skill${id + 1}`]}
                className="block appearance-none w-full bg-white border border-gray-300 text-indigo-500 py-3 px-4 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="Select a skill" disabled>
                  Select a skill
                </option>
                <option value="Effective Communication">
                  Effective Communication
                </option>
                <option value="Collaborative Teamwork">
                  Collaborative Teamwork
                </option>
                <option value="Creative Problem Solving">
                  Creative Problem Solving
                </option>
                <option value="Adaptability in Change">
                  Adaptability in Changing Environments
                </option>
                <option value="Innovative Thinking">Innovative Thinking</option>
                <option value="Efficient-time-management">
                  Efficient Time Management
                </option>
                <option value="Strategic Decision Making">
                  Strategic Decision Making
                </option>
                <option value="Leadership Initiative">
                  Leadership and Initiative
                </option>
                <option value="Empathy In Communication">
                  Empathy in Communication
                </option>
                <option value="Strong Negotiation Skills">
                  Strong Negotiation Skills
                </option>
                <option value="Effective Collaboration">
                  Effective Collaboration
                </option>
                <option value="Strong Work Ethic">Strong Work Ethic</option>
                <option value="Attention To Detail">
                  Attention to Detail and Precision
                </option>
                <option value="Proactive Decision Making">
                  Proactive Decision Making
                </option>
                <option value="Effective Interpersonal Skills">
                  Effective Interpersonal Skills
                </option>
                <option value="Organizational Skills">
                  Organizational and Planning Skills
                </option>
                <option value="Resolving Conflicts">
                  Resolving Conflicts Constructively
                </option>
                <option value="Customer Centered Service">
                  Customer-Centered Service
                </option>
                <option value="Long-term Strategic Planning">
                  Long-term Strategic Planning
                </option>
                <option value="Confident Public Speaking">
                  Confident Public Speaking
                </option>
                <option value="Structured Multitasking">
                  Structured Multitasking
                </option>
                <option value="Stress Management Under Pressure">
                  Stress Management Under Pressure
                </option>
                <option value="Self-driven Motivation">
                  Self-Driven Motivation
                </option>
                <option value="Flexibility with Deadlines">
                  Flexibility with Tight Deadlines
                </option>
                <option value="Positive Team Attitude">
                  Positive Team Attitude
                </option>
                <option value="Goal-Oriented Work Approach">
                  Goal-Oriented Work Approach
                </option>
                <option value="Active Listening Skills">
                  Active Listening Skills
                </option>
                <option value="Critical Analytical Skills">
                  Critical and Analytical Thinking
                </option>
                <option value="Emotional Intelligence Awareness">
                  Emotional Intelligence and Awareness
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.5 7l4 4 4-4h-8z" />
                </svg>
              </div>
            </div>
            <input
              required
              id={`skill${id + 1}`}
              onChange={handleSkill}
              value={inputValue[`skill${id + 1}`]}
              type="text"
              placeholder={skill.placeholder}
              className="border-2 w-full border-slate-100 py-2 px-4 rounded-md"
            />
          </div>
        ))}
      </div>
    </>
  );
}
