import { useState, useEffect } from "react";

export default function Summary({ summary, defaultValue }) {
  const [value, setValue] = useState(defaultValue);
    useEffect(() => {
      setValue(defaultValue);
    }, [defaultValue]);
  return (
    <div id={summary.id}>
      <div id="summary-title">{summary.title}</div>
      <div id="summary-text">
        {value && Array.isArray(value) ? value[0] : ""}
      </div>
    </div>
  );
}
