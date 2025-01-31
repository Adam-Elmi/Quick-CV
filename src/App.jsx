import CV from "./Cv-Components/CV";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Site-Components/Layout";
import About from "./Site-Components/About";
import ContactUs from "./Site-Components/ContactUs";
import Contributors from "./Site-Components/contributors";
import TempSection from "./Site-Components/Temp-Section";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/contributors" element={<Contributors />} />
        <Route path="/templates" element={<TempSection />} />
      </Route>
      <Route path="/create-cv" element={<CV />} />
    </Routes>
  );
}

export default App;
