import { useState, useEffect } from "react";

export default function Languages({ languages, defaultValue }) {
  const [values, setValues] = useState(defaultValue);
  useEffect(() => {
    setValues(defaultValue);
  }, [defaultValue]);
  return (
    <div id={languages.id}>
      <div id="languages-title">{languages.title}</div>
      <div id="languages-wrapper">
        {values && Array.isArray(values)
          ? values.map((language, i) => (
              <div key={i}>
                <ul id={"language-" + (i + 1) + "wrapper"}>
                  <li id={"language-" + (i + 1)}>{language}</li>
                </ul>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
