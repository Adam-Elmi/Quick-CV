import { useState, useEffect } from "react";
/* Template import section */
/* Please ensure to add any new template imports here */
/* Good luck by your friend, Adam Elmi */
import coreTemp from "../../public/templates/core-template/core-template.json";
import creativeTemp from "../../public/templates/creative-template/creative.json";

export default function Template() {
  const [templates, setTemplates] = useState([]);
  const [currentJson, setCurrentJson] = useState("");
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
      localStorage.removeItem("currentPaths"); // Remove corrupt data
    }
  }
  );

  useEffect(() => {
    setTemplates([
      {
        template_name: "Core Template",
        jsonPath: coreTemp,
        cssPath: "/templates/core-template/style.css",
      },
      {
        template_name: "Creative Template",
        jsonPath: creativeTemp,
        cssPath: "/templates/creative-template/style.css",
      },
    ]);
  }, []);

  function changeValue(e) {
    setCurrentJson(e.target.value);
    const selected = templates.find((t) => t.template_name === e.target.value);
    if (selected) {
      setCurrentTemplate(selected.jsonPath);
      document.getElementById("template-styles").href = selected.cssPath; // ✅ Update the existing <link> tag
    }
  }
  useEffect(() => {
    if (currentJson) {
      const selectedTemplate = templates.find(
        (template) => template.template_name === currentJson
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
  }, [currentJson, templates]);

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
      localStorage.removeItem("currentPaths"); // Remove corrupt data
    }
  }, []);

  return (
    <div className="flex-1 border-2 border-red-500 h-[300px] p-2">
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
      <div>
        {currentTemplate ? (
          <h1 id="templateId" className="templateId">
            {currentTemplate.templateId}
          </h1>
        ) : (
          "No Template"
        )}
      </div>
    </div>
  );
}
