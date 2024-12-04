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
            <input
              required
              type="text"
              placeholder={skill.placeholder}
              id={skill.id}
              className="border-2 w-full border-slate-100 py-2 px-4 rounded-md"
            />
            <div className="relative">
              <select
                name="skills"
                id="skills"
                className="block appearance-none w-full bg-white border border-gray-300 text-indigo-500 py-3 px-4 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option disabled selected>
                  Select a skill
                </option>
                <option value="effective-communication">
                  Effective Communication
                </option>
                <option value="collaborative-teamwork">
                  Collaborative Teamwork
                </option>
                <option value="creative-problem-solving">
                  Creative Problem Solving
                </option>
                <option value="adaptability-in-change">
                  Adaptability in Changing Environments
                </option>
                <option value="innovative-thinking">Innovative Thinking</option>
                <option value="efficient-time-management">
                  Efficient Time Management
                </option>
                <option value="strategic-decision-making">
                  Strategic Decision Making
                </option>
                <option value="leadership-initiative">
                  Leadership and Initiative
                </option>
                <option value="empathy-in-communication">
                  Empathy in Communication
                </option>
                <option value="strong-negotiation-skills">
                  Strong Negotiation Skills
                </option>
                <option value="effective-collaboration">
                  Effective Collaboration
                </option>
                <option value="strong-work-ethic">Strong Work Ethic</option>
                <option value="attention-to-detail">
                  Attention to Detail and Precision
                </option>
                <option value="proactive-decision-making">
                  Proactive Decision Making
                </option>
                <option value="effective-interpersonal-skills">
                  Effective Interpersonal Skills
                </option>
                <option value="organizational-skills">
                  Organizational and Planning Skills
                </option>
                <option value="resolving-conflicts">
                  Resolving Conflicts Constructively
                </option>
                <option value="customer-centered-service">
                  Customer-Centered Service
                </option>
                <option value="long-term-strategic-planning">
                  Long-term Strategic Planning
                </option>
                <option value="confident-public-speaking">
                  Confident Public Speaking
                </option>
                <option value="structured-multitasking">
                  Structured Multitasking
                </option>
                <option value="stress-management-under-pressure">
                  Stress Management Under Pressure
                </option>
                <option value="self-driven-motivation">
                  Self-Driven Motivation
                </option>
                <option value="flexibility-with-deadlines">
                  Flexibility with Tight Deadlines
                </option>
                <option value="positive-team-attitude">
                  Positive Team Attitude
                </option>
                <option value="goal-oriented-work-approach">
                  Goal-Oriented Work Approach
                </option>
                <option value="active-listening-skills">
                  Active Listening Skills
                </option>
                <option value="critical-analytical-skills">
                  Critical and Analytical Thinking
                </option>
                <option value="emotional-intelligence-awareness">
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
          </div>
        ))}
      </div>
    </>
  );
}
