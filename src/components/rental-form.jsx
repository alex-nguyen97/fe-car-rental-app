import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const RentalForm = ({ selectedCar }) => {
  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      license: '',
      startDate: '',
      rentalDays: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      phone: Yup.string()
        .matches(/^\d{10,15}$/, 'Phone number must be 10-15 digits')
        .required('Phone is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      license: Yup.string()
        .min(6, 'License must be at least 6 characters')
        .required('License is required'),
      startDate: Yup.date().required('Start date is required'),
      rentalDays: Yup.number()
        .min(1, 'Rental days must be at least 1')
        .required('Rental days are required'),
    }),
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      alert(`Total Price: $${selectedCar.avg_rate * values.rentalDays}`);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h5>Rental Details</h5>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.name && !!formik.errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.name}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.phone && !!formik.errors.phone}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.phone}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.email && !!formik.errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.email}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Driver's License</Form.Label>
        <Form.Control
          type="text"
          name="license"
          value={formik.values.license}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.license && !!formik.errors.license}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.license}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          name="startDate"
          value={formik.values.startDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.startDate && !!formik.errors.startDate}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.startDate}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Rental Days</Form.Label>
        <Form.Control
          type="number"
          name="rentalDays"
          min="1"
          value={formik.values.rentalDays}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.rentalDays && !!formik.errors.rentalDays}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.rentalDays}
        </Form.Control.Feedback>
      </Form.Group>
      {formik.values.rentalDays && !formik.errors.rentalDays && (
        <Alert variant="success">
          Total Price: ${selectedCar.avg_rate * formik.values.rentalDays}
        </Alert>
      )}
      <Button type="submit" variant="primary">
        Submit
      </Button>{' '}
      <Button
        variant="secondary"
        onClick={() => formik.resetForm()}
        type="button"
      >
        Cancel
      </Button>
    </Form>
  );
};

export default RentalForm;
