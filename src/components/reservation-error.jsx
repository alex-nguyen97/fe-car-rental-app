import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const ReservationError = ({ message }) => {
  const navigate = useNavigate();
  return (
    <div>
      <p style={{ color: 'red' }}>{message}</p>
      <Button variant="primary" onClick={() => navigate('/')}>
        Select a new car
      </Button>
    </div>
  );
};

export default ReservationError;
