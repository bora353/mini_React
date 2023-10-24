import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";

import DataSearchPage from "./pages/DataSearchPage";
import FileCheckPage from "./pages/FileCheckPage";
import SummaryPage from "./pages/SummaryPage";
import IntegratedDataPage from "./pages/IntegratedDataPage";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <Router>
      {isLoading ? (
        <div className="modal-container">
          <div className="modal-content">
            <img
              src="https://cdn.pixabay.com/photo/2016/08/20/09/50/board-1607174_1280.jpg"
              alt="로딩 중"
            />
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="*" exact element={<DataSearchPage />} />
          <Route path="/filecheck" element={<FileCheckPage />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="/integrateddata" element={<IntegratedDataPage />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
