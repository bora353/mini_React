import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DataSearchPage from "./pages/DataSearchPage";
import FileCheckPage from "./pages/FileCheckPage";
import IntegratedDataPage from "./pages/IntegratedDataPage";
import Rms from "./pages/Rms";
import Loading from "./components/Loading";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<DataSearchPage />} />
        <Route path="/dmdata/*" exact element={<DataSearchPage />} />
        <Route path="/filecheck/*" element={<FileCheckPage />} />
        <Route path="/integrateddata/" element={<IntegratedDataPage />} />
        <Route path="/integrateddata/rms" element={<Rms />} />
      </Routes>
    </Router>
  );
}

export default App;
