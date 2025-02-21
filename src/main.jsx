import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppProvider from "./context/app-provider.jsx";
import { ToastContainer } from "react-toastify";
import RenderApp from "./components/render-app.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <ToastContainer />
      <RenderApp />
    </AppProvider>
  </StrictMode>
);
