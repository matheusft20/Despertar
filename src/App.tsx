import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AllSpecialists from './pages/AllSpecialists';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/especialistas" element={<AllSpecialists />} />
      </Routes>
    </Router>
  );
}

export default App;