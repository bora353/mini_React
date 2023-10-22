import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";

import DataSearchPage from "./pages/DataSearchPage";
import FileCheckPage from "./pages/FileCheckPage";
import SummaryPage from "./pages/SummaryPage";
import IntegratedDataPage from "./pages/IntegratedDataPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<DataSearchPage />} />
        <Route path="/filecheck" element={<FileCheckPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/integrateddata" element={<IntegratedDataPage />} />
      </Routes>
    </Router>
  );
}

export default App;
