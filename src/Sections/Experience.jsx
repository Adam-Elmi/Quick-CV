import { useEffect, useState } from "react";

export default function Experience({ experience, defaultValue }) {
  const [values, setValues] = useState(defaultValue);

  useEffect(() => {
    setValues(defaultValue);
  }, [defaultValue]);
  return (
    <div id={experience.id}>
      <div id="experience-title">{experience.title}</div>
      <div id="experience-wrapper">
        {values && Array.isArray(values)
          ? values.map((v, i) => (
              <div key={i}>
                <div id={"role-" + (i + 1) + "wrapper"}>
                  <p id={"role-" + (i + 1)}>{v.role}</p>
                </div>
                <div id={"company-" + (i + 1) + "wrapper"}>
                  <p id={"company-" + (i + 1)}>{v.company}</p>
                </div>
                <div id={"ex-date-" + (i + 1) + "wrapper"}>
                  <p id={"ex-date-" + (i + 1)}>{v.duration}</p>
                </div>
                <div id={"ex-description-" + (i + 1) + "wrapper"}>
                  <p id={"ex-description-" + (i + 1)}>{v.description}</p>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
