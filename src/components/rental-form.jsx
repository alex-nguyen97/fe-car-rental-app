import React, { useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { setSelectedCar, setCarList } from '../storeSlice';
import { useDispatch, useSelector } from 'react-redux';
import ToastNotification from './toast-notification';
import supabase from '../utils/api';

const RentalForm = ({ selectedCar, setRentalToast }) => {
  // Formik setup

  const [initialFormData, setInitialFormData] = React.useState({
    name: '',
    phone: '',
    email: '',
    license: '',
    startDate: '',
    rentalDays: '',
  });

  const dispatch = useDispatch();
  useEffect(() => {
    const localFormData = localStorage.getItem('rentalForm');
    if (localFormData) {
      setInitialFormData(JSON.parse(localFormData));
    }
  }, []);

  const carList = useSelector((state) => {
    return state.store.carList;
  });

  const checkAvailableCars = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select()
        .eq('vin_id', selectedCar.vin_id);
      if (error) {
        console.error('Error fetching cars:', error);
        return false;
      } else {
        const updatedCar = data[0];
        return updatedCar.availability;
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      return false;
    }
  };

  const formik = useFormik({
    initialValues: initialFormData,
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      phone: Yup.string()
        .matches(
          /^(\+61|0)[2-478](\d{8})$/,
          'Phone number must be a valid Australian phone number'
        )
        .required('Phone is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      license: Yup.string()
        .min(6, 'License must be at least 6 characters')
        .required('License is required'),
      startDate: Yup.date()
        .min(new Date(), 'Start date must be started from tomorrow')
        .required('Start date is required'),
      rentalDays: Yup.number()
        .min(1, 'Rental days must be at least 1')
        .required('Rental days are required'),
    }),
    onSubmit: async (values) => {
      const isCarAvailable = await checkAvailableCars();
      if (isCarAvailable)
        supabase
          .from('cars')
          .update({ availability: 0 })
          .eq('vin_id', selectedCar.vin_id) // Match the car by vin_id
          .then(({ data, error }) => {
            if (error) {
              setRentalToast({
                show: true,
                message: 'Error: ' + error.message,
                background: 'danger',
              });
            } else {
              setRentalToast({
                show: true,
                message:
                  'Rental form submitted successfully! Coming back to the home page...',
                background: 'success',
              });

              const rentedCar = carList.find(
                (car) => car.vin_id === selectedCar.vin_id
              );
              const updateCarList = carList.map((car) =>
                car.vin_id === selectedCar.vin_id
                  ? { ...car, availability: 0 }
                  : car
              );
              dispatch(setCarList(updateCarList));

              localStorage.removeItem('selectedCar');
              dispatch(setSelectedCar(null));

              setTimeout(() => {
                navigate('/');
              }, 2000);
            }
          });
    },
  });

  useEffect(() => {
    localStorage.setItem('rentalForm', JSON.stringify(formik.values));
  }, [formik.values]);

  const navigate = useNavigate();

  const handleClickCancel = () => {
    setRentalToast({
      show: true,
      message: 'Data is cleared! Coming back to the home page...',
    });

    // Clear data and reset form
    localStorage.clear();
    formik.resetForm();
    dispatch(setSelectedCar(null)); // Clear selected car from Redux store

    // Wait for 2 seconds before navigating
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div>
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
            min={
              new Date(new Date().setDate(new Date().getDate() + 1))
                .toISOString()
                .split('T')[0]
            } // Set min date to tomorrow
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
        <Button
          type="submit"
          variant="primary"
          disabled={
            !(
              formik.isValid &&
              Object.values(formik.values).every((value) => value !== '')
            )
          }
        >
          Submit
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleClickCancel()}
          type="button"
          style={{ marginLeft: '10px' }}
        >
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default RentalForm;
