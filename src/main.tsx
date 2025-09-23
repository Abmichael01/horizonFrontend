import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Routes } from "@generouted/react-router";
import { Provider } from "@/components/ui/provider";
// import { theme } from "./theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider >
      <Routes />
    </Provider>
  </StrictMode>
);
