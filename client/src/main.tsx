import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import LoggedInUserContextProvider from "./contexts/UserContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LoggedInUserContextProvider>
      <ThemeProvider
        defaultTheme="dark"
        storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </LoggedInUserContextProvider>
  </React.StrictMode>
);
