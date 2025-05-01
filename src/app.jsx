import React, { useEffect } from 'react';
import './app.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage';
import Reservation from './pages/reservation';

import { useDispatch } from 'react-redux';
import { setCarList, setCarOptions } from './storeSlice';
import api from './utils/api';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    api
      .get('/cars')
      .then((response) => {
        dispatch(setCarList(response.data.data));
        dispatch(setCarOptions(response.data.data));
      })
      .catch((error) => {
        console.error('Failed to load cars:', error);
      });
  }, []);

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
