import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.jsx";
import { FrappeProvider } from "frappe-react-sdk";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FrappeProvider
      url={import.meta.env.VITE_FRAPPE_PATH ?? ""}
      socketPort={
        import.meta.env.VITE_SOCKET_PORT
          ? import.meta.env.VITE_SOCKET_PORT
          : undefined
      }
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FrappeProvider>
  </StrictMode>
);
