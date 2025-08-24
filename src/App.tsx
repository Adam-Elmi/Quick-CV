import "./App.css";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Templates from "./pages/Templates";
import CreateCv from "./pages/CreateCv";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/about" element={<About />} />
        <Route path="/templates" element={<Templates />} />
      </Route>
      <Route path="/create-cv" element={<CreateCv />} />
    </Routes>
  );
}

export default App;
