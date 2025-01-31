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
                <div id={"skill-" + (i + 1) + "wrapper"}>
                  <p id={"skill-" + (i + 1)}>{skill}</p>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
