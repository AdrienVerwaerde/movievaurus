import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router';
import { Route } from 'react-router';
import DetailedPage from './components/DetailedPage/DetailedPage';
import ActorPage from './components/DetailedPage/ActorPage/ActorPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:id" element={<DetailedPage />} />
        <Route path="/actor/:id" element={<ActorPage />} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();
