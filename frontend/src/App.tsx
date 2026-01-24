import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NewsHomePage } from './pages/NewsHomePage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewsHomePage />} />
        <Route path="/article/:id" element={<ArticleDetailPage />} />
      </Routes>
    </Router>
  );
}
