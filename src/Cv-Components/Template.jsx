import { useState, useEffect } from "react";
import React from "react";
import Header from "../Sections/Header";
import Contact from "../Sections/Contact";
import Summary from "../Sections/Summary";
import Skills from "../Sections/Skills";
import Experience from "../Sections/Experience";
import Eduction from "../Sections/Education";
import Projects from "../Sections/Projects";
import Languages from "../Sections/Languages";
import GroupOne from "../Groups/Group-1";
import GroupTwo from "../Groups/Group-2";
import GroupThree from "../Groups/Group-3";
/* Template import section */
/* Please ensure to add any new template imports here */
/* Good luck by your friend, Adam Elmi */
import coreTemp from "../Templates/core-template/core-template.json";
import creativeTemp from "../Templates/creative-template/creative.json";
export default function Template() {
  const [renderGroupOne, setRenderGroupOne] = useState(null);
  const [renderGroupTwo, setRenderGroupTwo] = useState(null);
  const [renderGroupThree, setRenderGroupThree] = useState(null);
  const [sections, setSections] = useState({});
  const [memberOne, setMemberOne] = useState([]);
  const [memberTwo, setMemberTwo] = useState([]);
  const [memberThree, setMemberThree] = useState([]);
  const [defaultValues, setDefaultValues] = useState({});
  const [group, setGroup] = useState({});
  const [templates, setTemplates] = useState([]);
  const [currentTemplate, setCurrentTemplate] = useState(() => {
    try {
      const storedPaths = localStorage.getItem("currentPaths");
      if (storedPaths) {
        const currentPaths = JSON.parse(storedPaths);
        if (currentPaths.json) {
          return currentPaths.json;
        } else {
          return coreTemp;
        }
      }
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
      localStorage.removeItem("currentPaths");
    }
  });

  useEffect(() => {
    setTemplates([
      {
        template_name: coreTemp.templateId,
        jsonPath: coreTemp,
        cssPath: "src/Templates/core-template/style.css",
      },
      {
        template_name: creativeTemp.templateId,
        jsonPath: creativeTemp,
        cssPath: "src/Templates/creative-template/style.css",
      },
    ]);
  }, []);

  function changeValue(e) {
    const selected = templates.find((t) => t.template_name === e.target.value);
    if (selected) {
      setCurrentTemplate(selected.jsonPath);
      document.getElementById("template-styles").href = selected.cssPath;
    }
  }
  useEffect(() => {
    if (currentTemplate) {
      const selectedTemplate = templates.find(
        (template) => template.template_name === currentTemplate.templateId
      );
      if (selectedTemplate) {
        setCurrentTemplate(selectedTemplate.jsonPath);
        localStorage.setItem(
          "currentPaths",
          JSON.stringify({
            css: selectedTemplate.cssPath,
            json: selectedTemplate.jsonPath,
          })
        );
      }
    }
  }, [templates, currentTemplate]);

  useEffect(() => {
    try {
      const storedPaths = localStorage.getItem("currentPaths");
      if (storedPaths) {
        const currentPaths = JSON.parse(storedPaths);
        if (currentPaths.css) {
          document.getElementById("template-styles").href = currentPaths.css;
        }
      }
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
      localStorage.removeItem("currentPaths");
    }
  }, []);

  useEffect(() => {
    try {
      const properties = currentTemplate?.config?.defaultValues || {};
      const groups = currentTemplate?.groups;
      setDefaultValues({
        summary: properties.summary,
        skills: properties.skills,
        header: properties.header,
        contact: properties.contact,
        experience: properties.experience,
        education: properties.education,
        languages: properties.languages,
        projects: properties.projects,
      });
      setGroup(groups);
    } catch (error) {
      console.error("Error parsing default values:", error.message);
      setDefaultValues({});
    }
  }, [currentTemplate]);

  useEffect(() => {
    try {
      setSections({});
      if (currentTemplate) {
        for (const [key, value] of Object.entries(currentTemplate)) {
          // Section property
          if (key === "sections") {
            if (value) {
              value.forEach((prop) => {
                // Header property
                if (prop && prop.id === "header") {
                  setSections((prev) => ({
                    ...prev,
                    header: (
                      <Header
                        header={prop}
                        defaultValue={defaultValues.header}
                      />
                    ),
                  }));
                }
                // Contact Property
                if (prop.id === "contact") {
                  setSections((prev) => ({
                    ...prev,
                    contact: <Contact contact={prop} defaultValue={defaultValues.contact}/>,
                  }));
                }
                // Summary Property
                if (prop.id === "summary") {
                  setSections((prev) => ({
                    ...prev,
                    summary: <Summary summary={prop} defaultValue={defaultValues.summary} />,
                  }));
                }
                // Experience property
                if (prop.id === "experience") {
                  setSections((prev) => ({
                    ...prev,
                    experience: (
                      <Experience
                        experience={prop}
                        defaultValue={defaultValues.experience}
                      />
                    ),
                  }));
                }
                // Education property
                if (prop.id === "education") {
                  setSections((prev) => ({
                    ...prev,
                    education: (
                      <Eduction
                        education={prop}
                        defaultValue={defaultValues.education}
                      />
                    ),
                  }));
                }
                // Skills property
                if (prop.id === "skills") {
                  setSections((prev) => ({
                    ...prev,
                    skills: (
                      <Skills
                        skills={prop}
                        defaultValue={defaultValues.skills}
                      />
                    ),
                  }));
                }
                // Languages property
                if (prop.id === "languages") {
                  setSections((prev) => ({
                    ...prev,
                    languages: (
                      <Languages
                        languages={prop}
                        defaultValue={defaultValues.languages}
                      />
                    ),
                  }));
                }
                // Projects property
                if (prop.id === "projects") {
                  setSections((prev) => ({
                    ...prev,
                    projects: (
                      <Projects
                        projects={prop}
                        defaultValue={defaultValues.projects}
                      />
                    ),
                  }));
                }
              });
            }
          }
          if (key) {
          }
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  }, [currentTemplate, defaultValues, group]);

  useEffect(() => {
    try {
      if (!sections || Object.keys(sections).length === 0) {
        setMemberOne([]);
        setMemberTwo([]);
        setMemberThree([]);
      }
      if (currentTemplate) {
        for (const [key, value] of Object.entries(currentTemplate)) {
          if (key === "groups") {
            value.forEach((group) => {
              if (group.groupId === "group-1") {
                if (sections) {
                  const newElements = Object.entries(sections);

                  const uniqueElements = new Set();
                  for (const [k, v] of newElements) {
                    if (group.sections.includes(k)) {
                      uniqueElements.add({ key: k, element: v });
                    }
                  }
                  setMemberOne(
                    Array.from(uniqueElements).map(({ key, element }) =>
                      React.cloneElement(element, { key })
                    )
                  );
                }
              }
              if (group.groupId === "group-2") {
                if (sections) {
                  const newElements = Object.entries(sections);

                  const uniqueElements = new Set();
                  for (const [k, v] of newElements) {
                    if (group.sections.includes(k)) {
                      uniqueElements.add({ key: k, element: v });
                    }
                  }
                  setMemberTwo(
                    Array.from(uniqueElements).map(({ key, element }) =>
                      React.cloneElement(element, { key })
                    )
                  );
                }
              }
              if (group.groupId === "group-3") {
                if (sections) {
                  const newElements = Object.entries(sections);

                  const uniqueElements = new Set();
                  for (const [k, v] of newElements) {
                    if (group.sections.includes(k)) {
                      uniqueElements.add({ key: k, element: v });
                    }
                  }
                  setMemberThree(
                    Array.from(uniqueElements).map(({ key, element }) =>
                      React.cloneElement(element, { key })
                    )
                  );
                }
              }
            });
          }
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  }, [sections, currentTemplate]);

  useEffect(() => {
    try {
      if (GroupOne && GroupTwo && GroupThree) {
        setRenderGroupOne(<GroupOne members={memberOne} />);
        setRenderGroupTwo(<GroupTwo members={memberTwo} />);
        setRenderGroupThree(<GroupThree members={memberThree} />);
      }
    } catch (error) {
      console.error(error.message);
    }
  }, [memberOne, memberTwo, memberThree]);
  return (
    <div className="flex-1 bg-black">
       <div className="relative inline-block w-full">
        <select
          onChange={(e) => changeValue(e)}
          name="template-selection"
          id="template-selection"
          defaultValue="Choose"
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option disabled={true} value="Choose">
            Choose a template
          </option>
          {templates && Array.isArray(templates)
            ? templates.map((temp, id) => (
                <option key={id} value={temp.template_name}>
                  {temp.template_name}
                </option>
              ))
            : ""}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
      <div className="flex-1 min-h-screen bg-white border-2 p-2 transform w-[794px] h-[1123px]">
        <div className="w-full flex-1">
          <div id="group-container">
            {renderGroupOne}
            <div id="group-wrapper">
              {renderGroupTwo}
              {renderGroupThree}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
