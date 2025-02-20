import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AppProvider from "./context/app-provider.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <ToastContainer />
      <App />
    </AppProvider>
  </StrictMode>
);
