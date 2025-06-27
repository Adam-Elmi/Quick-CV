import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { SharedProvider } from "./Shared/SharedContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SharedProvider>
        <App />
      </SharedProvider>
    </BrowserRouter>
  </StrictMode>,
);
