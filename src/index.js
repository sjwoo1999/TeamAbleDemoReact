// 📂 src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // App 컴포넌트 가져오기
import './index.css';     // 전역 스타일 가져오기

// root 엘리먼트 가져오기
const root = ReactDOM.createRoot(document.getElementById('root'));

// React 애플리케이션 렌더링
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
