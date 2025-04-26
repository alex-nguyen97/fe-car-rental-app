import MenuBar from '../components/menu-bar';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Simple validation helpers
const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
const validatePhone = (phone) => /^\d{10,15}$/.test(phone);
const validateLicense = (license) => license.length >= 6;

function Reservation() {
  const { vinId } = useParams();
  const [car, setCar] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    license: '',
    startDate: '',
    rentalDays: '',
  });
  const [valid, setValid] = useState({});
  const [formReady, setFormReady] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order placed! Total price: $${car.pricePerDay * form.rentalDays}`);
    localStorage.removeItem('reservationForm');
    // Navigate to homepage or confirmation page
  };

  const handleCancel = () => {
    localStorage.removeItem('reservationForm');
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    localStorage.setItem('reservationForm', JSON.stringify(updated));

    // Live validation
    const newValid = {
      ...valid,
      name: updated.name.trim() !== '',
      phone: validatePhone(updated.phone),
      email: validateEmail(updated.email),
      license: validateLicense(updated.license),
      startDate: updated.startDate !== '',
      rentalDays: parseInt(updated.rentalDays) > 0,
    };
    setValid(newValid);
    setFormReady(Object.values(newValid).every(Boolean));
  };

  return (
    <div>
      <MenuBar></MenuBar>
      <div style={{ padding: '20px' }}>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ marginBottom: '20px' }}
        >
          <div>
            <h2>Car reservation</h2>
            <p>
              Whether you’re traveling for business or pleasure, a car is the
              most affordable mode of transport to get around Australia. Save
              time and costs with low overheads, great options, quick
              availability and easy booking management.
            </p>
          </div>
        </div>

        {vinId ? (
          <div>
            <Row className="mb-3">
              <Col>
                <h5>Selected Car Details</h5>
                <ul>
                  <li>
                    <strong>Make:</strong>
                  </li>
                  <li>
                    <strong>Model:</strong>
                  </li>
                  <li>
                    <strong>Year:</strong>
                  </li>
                  <li>
                    <strong>Color:</strong>
                  </li>
                  <li>
                    <strong>Daily Rate:</strong>
                  </li>
                </ul>
              </Col>

              <Form onSubmit={handleSubmit}>
                <h5>Rental Details</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    isValid={valid.name}
                    isInvalid={form.name && !valid.name}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    isValid={valid.phone}
                    isInvalid={form.phone && !valid.phone}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    isValid={valid.email}
                    isInvalid={form.email && !valid.email}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Driver's License</Form.Label>
                  <Form.Control
                    type="text"
                    name="license"
                    value={form.license}
                    onChange={handleChange}
                    isValid={valid.license}
                    isInvalid={form.license && !valid.license}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    isValid={valid.startDate}
                    isInvalid={form.startDate && !valid.startDate}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Rental Days</Form.Label>
                  <Form.Control
                    type="number"
                    name="rentalDays"
                    min="1"
                    value={form.rentalDays}
                    onChange={handleChange}
                    isValid={valid.rentalDays}
                    isInvalid={form.rentalDays && !valid.rentalDays}
                    required
                  />
                </Form.Group>
                {formReady && (
                  <Alert variant="success">
                    Total Price: ${car.pricePerDay * form.rentalDays}
                  </Alert>
                )}
                <Button type="submit" variant="primary" disabled={!formReady}>
                  Submit
                </Button>{' '}
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </Form>
            </Row>
          </div>
        ) : (
          <h3>No VIN ID provided</h3>
        )}
      </div>
    </div>
  );
}

export default Reservation;
