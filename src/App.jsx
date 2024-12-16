import Resume from "./Resume-Components/Resume";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Site-Components/Home";
import Cli from "./Fake-Cli.jsx/Cli";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cv" element={<Resume />} />
      <Route path="/cli" element={<Cli />} />
    </Routes>
  );
}

export default App;
