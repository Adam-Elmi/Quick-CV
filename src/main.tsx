import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SharedProvider } from "./Shared/SharedContext";
createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <SharedProvider>
        <App />
      </SharedProvider>
    </BrowserRouter>
  </StrictMode>,
);
