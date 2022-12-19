import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

// import pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import App from './pages/App';
import SummaryPage from './pages/SummaryPage';
import DetailPage from './pages/DetailPage';

// import react-router-dom
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/app" element={<App />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<SummaryPage />} />
      <Route path="/detail/:deviceId" element={<DetailPage />} />
    </Routes>
  </BrowserRouter>
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
