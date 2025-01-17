import Resume from "./Resume-Components/Resume";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Site-Components/Layout";
import About from "./Site-Components/About";
import ContactUs from "./Site-Components/ContactUs";
import Contributors from "./Site-Components/contributors";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/contributors" element={<Contributors />} />
      </Route>
      <Route path="/cv" element={<Resume />} />
    </Routes>
  );
}

export default App;
