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
                <ul id={"institution-" + (i + 1) + "wrapper"}>
                  <li id={"institution-" + (i + 1)}>{v.institution}</li>
                </ul>
                <ul id={"ed-year-" + (i + 1) + "wrapper"}>
                  <li id={"ed-year-" + (i + 1)}>{v.year}</li>
                </ul>
                <ul id={"degree-" + (i + 1) + "wrapper"}>
                  <li id={"degree-" + (i + 1)}>{v.degree}</li>
                </ul>
                <ul id={"ed-details-" + (i + 1) + "wrapper"}>
                  <li id={"ed-details-" + (i + 1)}>{v.details}</li>
                </ul>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}