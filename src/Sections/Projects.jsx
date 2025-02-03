import { useState, useEffect } from "react";

export default function Projects({ projects, defaultValue }) {
  const [values, setValues] = useState(defaultValue);
  useEffect(() => {
    setValues(defaultValue);
  }, [defaultValue]);
  return (
    <div id={projects.id}>
      <div id="projects-title">{projects.title}</div>
      <div id="projects-wrapper">
        {values && Array.isArray(values)
          ? values.map((v, i) => (
              <div key={i}>
                <div id={"project-title-" + (i + 1) + "wrapper"}>
                  <p id={"project-title-" + (i + 1)}>{v.title}</p>
                </div>
                <div id={"project-date-" + (i + 1) + "wrapper"}>
                  <p id={"project-date-" + (i + 1)}>{v.date}</p>
                </div>
                <div id={"project-description-" + (i + 1) + "wrapper"}>
                  <p id={"project-description-" + (i + 1)}>{v.description}</p>
                </div>
                <div id={"project-link-" + (i + 1) + "wrapper"}>
                  <a href={`${v.link}`} id={"project-link-" + (i + 1)}>
                    {v.link}
                  </a>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}