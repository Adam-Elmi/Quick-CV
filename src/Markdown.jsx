import { useEffect, useState } from "react";

export default function Markdown() {
  const [data, setData] = useState("");
  useEffect(() => {
    fetch("../mark.md")
      .then((res) => res.text())
      .then((data) => setData(data));
  }, []);

  return <h1>{data}</h1>;
}
