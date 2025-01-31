import { useState, useEffect } from "react";

export default function Eduction({ education, defaultValue }) {
  const [values, setValues] = useState(defaultValue);
  useEffect(() => {
    setValues(defaultValue);
  }, [defaultValue]);
  return (
    <div id={education.id}>
      <div id="education-title">{education.title}</div>
      <div id="education-wrapper">
        {values && Array.isArray(values)
          ? values.map((v, i) => (
              <div key={i}>
                <div id={"degree-" + (i + 1) + "wrapper"}>
                  <p id={"degree-" + (i + 1)}>{v.degree}</p>
                </div>
                <div id={"institution-" + (i + 1) + "wrapper"}>
                  <p id={"institution-" + (i + 1)}>{v.institution}</p>
                </div>
                <div id={"ed-year-" + (i + 1) + "wrapper"}>
                  <p id={"ed-year-" + (i + 1)}>{v.year}</p>
                </div>
                <div id={"ed-details-" + (i + 1) + "wrapper"}>
                  <p id={"ed-details-" + (i + 1)}>{v.details}</p>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
