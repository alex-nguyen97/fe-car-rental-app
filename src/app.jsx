import React from 'react';
import './app.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage></HomePage>} />
      <Route path="/search" element={<div></div>} />
      <Route path="/reservation/:vin" element={<div></div>} />
      <Route path="/confirmation/:orderId" element={<div></div>} />
    </Routes>
  );
}

export default App;
