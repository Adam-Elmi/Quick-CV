import { useState, useEffect } from "react";

export default function Template() {
  const [state, setState] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (state) {
          const res = await fetch(`/public/templates/${state}`);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();
          setData(data);
          const link = document.getElementById("template-styles");
          link.href = data.styleUrl;
          console.log(link);
          
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [state]);

  function changeValue(e) {
    setState(e.target.value);
  }

  if (data) {
    console.log(data.templateId);
  }

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
          <option value="core-template/core-template.json">
            Core Template
          </option>
          <option value="creative-template/creative.json">
            Creative Template
          </option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
      <div>{data ? <h1 className="templateId">{data.templateId}</h1> : "No Template"}</div>
    </div>
  );
}
