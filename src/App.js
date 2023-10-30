import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";

import DataSearchPage from "./pages/DataSearchPage";
import FileCheckPage from "./pages/FileCheckPage";
import SummaryPage from "./pages/SummaryPage";
import IntegratedDataPage from "./pages/IntegratedDataPage";
import Rms from "./pages/Rms";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500); // 시간 변경 하기
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
          <Route path="/filecheck/*" element={<FileCheckPage />} />
          <Route path="/summary/*" element={<SummaryPage />} />
          <Route path="/integrateddata/" element={<IntegratedDataPage />} />
          <Route path="/integrateddata/rms" element={<Rms />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
