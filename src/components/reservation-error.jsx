import React from 'react';
import { Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

const ReservationError = ({ message }) => {
  return (
    <div>
      <p style={{ color: 'red' }}>{message}</p>
      <Button variant="primary" onClick={Navigate('/')}>
        Select a new car
      </Button>
    </div>
  );
};

export default ReservationError;
