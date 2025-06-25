import { ColorModeContext, useMode } from "./themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/Dashboard";
import Sidebars from "./scenes/global/Sidebars";
import SensTable from "./scenes/SensTable/";
import HumidityGraph from "./scenes/HumidityGraph";
import TVOCGraph from "./scenes/TVOCGraph";
import ECO2Graph from "./scenes/eCO2Graph";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebars />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/sensTable" element={<SensTable />} />
              <Route path="/HumData" element={<HumidityGraph />} />
              <Route path="/TVOC" element={<TVOCGraph />} />
              <Route path="/eCO2" element={<ECO2Graph />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
