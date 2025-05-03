import React, { useEffect } from 'react';
import './app.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage';
import Reservation from './pages/reservation';

import { useDispatch } from 'react-redux';
import { setCarList, setCarOptions } from './storeSlice';
import supabase from './utils/api';

function App() {
  const dispatch = useDispatch();
  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select()
        .order('vehicle_category', { ascending: true });
      if (error) {
        console.error('Error fetching cars:', error);
      } else {
        dispatch(setCarList(data));
        dispatch(setCarOptions(data));
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  useEffect(() => {
    fetchCars();
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
