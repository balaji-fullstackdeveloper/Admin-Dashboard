import { CssBaseline, cssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Layout from "./scenes/layout";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={<Navigate to="/dashboard" replace />}
              ></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
