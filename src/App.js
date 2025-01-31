// 📂 src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import QuestionPage from "./components/QuestionPage";
import ResultPage from "./components/ResultPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* 루트("/")에 접속하면 자동으로 /test로 이동 */}
        <Route path="/" element={<Navigate to="/test" replace />} />

        {/* 테스트 진행 페이지 */}
        <Route path="/test" element={<QuestionPage />} />

        {/* 결과 페이지 */}
        <Route path="/result" element={<ResultPage />} />

        {/* 404 페이지 (잘못된 경로 입력 시) */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
