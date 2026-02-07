import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Placeholder Routes for future implementation */}
        <Route path="/dashboard" element={<div className="p-20 text-center text-white">Dashboard Implementation Pending...</div>} />
        <Route path="/live" element={<div className="p-20 text-center text-white">Live Feed Implementation Pending...</div>} />
        <Route path="/orbit" element={<div className="p-20 text-center text-white">3D View Implementation Pending...</div>} />
        <Route path="/community" element={<div className="p-20 text-center text-white">Community Implementation Pending...</div>} />
      </Routes>
    </Router>
  );
}

export default App;
