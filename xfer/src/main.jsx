import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.jsx";
import { FrappeProvider } from "frappe-react-sdk";

const getSiteName = () => {
  // @ts-ignore
  if (
    window.frappe?.boot?.versions?.frappe &&
    (window.frappe.boot.versions.frappe.startsWith("15") ||
      window.frappe.boot.versions.frappe.startsWith("16"))
  ) {
    // @ts-ignore
    return window.frappe?.boot?.sitename ?? import.meta.env.VITE_SITE_NAME;
  }
  return import.meta.env.VITE_SITE_NAME;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FrappeProvider
      socketPort={import.meta.env.VITE_SOCKET_PORT}
      siteName={getSiteName()}
    >
      <BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
        <App />
      </BrowserRouter>
    </FrappeProvider>
  </StrictMode>
);
