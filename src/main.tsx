import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRoutes } from "./routes";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "./theme/muiTheme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={muiTheme}>
      <ReactQueryProvider>
        <AppRoutes />
      </ReactQueryProvider>
    </ThemeProvider>
  </StrictMode>
);
