import { useState, useEffect } from "react";

export default function Skills({ skills, defaultValue }) {
  const [values, setValues] = useState(defaultValue);
  useEffect(() => {
    setValues(defaultValue);
  }, [defaultValue]);
  return (
    <div id={skills.id}>
      <div id="skills-title">
        {skills.title}
      </div>
      <div id="skills-wrapper">
        {values && Array.isArray(values)
          ? values.map((skill, i) => (
              <div key={i}>
                <ul id={"skill-" + (i + 1) + "wrapper"}>
                  <li className="all-skills" id={"skill-" + (i + 1)}>{skill}</li>
                </ul>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
