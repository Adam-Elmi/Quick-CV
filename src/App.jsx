import CV from "./Cv-Components/CV";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Site-Components/Layout";
import About from "./Site-Components/About";
import Contributors from "./Site-Components/contributors";
import TempSection from "./Site-Components/Temp-Section";
import Markdown from "./Markdown";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/about" element={<About />} />
        <Route path="/contributors" element={<Contributors />} />
        <Route path="/templates" element={<TempSection />} />
      </Route>
      <Route path="/create-cv" element={<CV />} />
      <Route path="/mark" element={<Markdown />} />
    </Routes>
  );
}

export default App;
