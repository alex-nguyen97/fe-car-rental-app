import React from 'react';
import './app.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage';
import Reservation from './pages/reservation';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage></HomePage>} />
      <Route path="/search" element={<div></div>} />
      <Route path="/reservation" element={<Reservation></Reservation>} />
      <Route path="/reservation/:vinId" element={<Reservation></Reservation>} />
      <Route path="/confirmation/:orderId" element={<div></div>} />
    </Routes>
  );
}

export default App;
