import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ImageGallery from './components/imagegallery/imagegallery';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ImageGallery />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;