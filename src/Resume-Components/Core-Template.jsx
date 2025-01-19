import { useEffect, useState } from "react";

export function CoreTemplate() {
    const [templateData, setTemplateData] = useState(null);
    const [templatePath, setTemplatePath] = useState('/Templates/core-template/core-template.json');
    useEffect(() => {
      fetch(templatePath)
        .then((res) => res.json())
        .then((data) => {
          setTemplateData(data);
  
          // Load CSS dynamically
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = `/Templates/core-template/core-template.css`;
          document.head.appendChild(link);
  
          return () => {
            document.head.removeChild(link); // Clean up
          };
        });
    }, [templatePath]);
  
    if (!templateData) return <p>Loading...</p>;
  
    return (
      <div className="template-container">
        {Object.entries(templateData.fields).map(([section, fields], idx) => (
          <div key={idx} className="template-section">
            <h3>{section}</h3>
            {Object.entries(fields).map(([field, value], idx) => (
              <p key={idx} className={`${templatePath.slice(templatePath.indexOf("/Templates/"), )} field-${field}`}>
                {value || `Enter ${field}`}
              </p>
            ))}
          </div>
        ))}
      </div>
    );
  }
