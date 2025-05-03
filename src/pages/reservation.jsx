import MenuBar from '../components/menu-bar';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import ReservationError from '../components/reservation-error';
import RentalForm from '../components/rental-form';
import SelectedCarDetails from '../components/selected-car-detail';
import { setSelectedCar } from '../storeSlice';
import { useDispatch, useSelector } from 'react-redux';
import ToastNotification from '../components/toast-notification';

const ReservationContent = ({ setRentalToast }) => {
  const { vinId } = useParams();
  const [carVinId, setCarVinId] = React.useState(vinId);

  const carList = useSelector((state) => state.store.carList);

  // Check if vinId is matched with the selected car in local storage
  const selectedCar = useSelector((state) => state.store.selectedCar);

  // Helper function to check car availability
  const isAvailableCar = () => {
    const currentCar = carList.find((car) => car.vin_id === carVinId);
    return currentCar && currentCar.availability;
  };

  // Handle missing carVinId
  useEffect(() => {
    if (!carVinId && selectedCar) {
      setCarVinId(selectedCar.vin_id);
      window.history.replaceState(
        null,
        '',
        `/reservation/${selectedCar.vin_id}`
      );
    }
  }, [carVinId, selectedCar]);

  // Handle missing carVinId or unavailable car
  if (!carVinId) {
    return <ReservationError message="No car selected for reservation." />;
  }

  if (!isAvailableCar()) {
    return <ReservationError message="Car is unavailable for reservation." />;
  }

  return (
    <div>
      <Row className="mb-3">
        <Col>
          <RentalForm
            selectedCar={selectedCar}
            setRentalToast={setRentalToast}
          />
        </Col>
        {selectedCar && (
          <SelectedCarDetails
            selectedCar={selectedCar}
            setRentalToast={setRentalToast}
          />
        )}
      </Row>
    </div>
  );
};

function Reservation() {
  const dispatch = useDispatch();
  const selectedCarLocalStorage = localStorage.getItem('selectedCar');

  useEffect(() => {
    if (selectedCarLocalStorage) {
      dispatch(setSelectedCar(JSON.parse(selectedCarLocalStorage)));
    }
  }, []);

  const [toast, setToast] = React.useState({
    show: false,
    message: '',
  });

  return (
    <div>
      <MenuBar></MenuBar>
      <div style={{ padding: '20px' }}>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ marginBottom: '20px' }}
        >
          <h2>Car reservation</h2>
        </div>
        <ReservationContent setRentalToast={setToast} />
        <ToastNotification
          message={toast.message}
          showToast={toast.show}
          delay={3000}
          background={toast.background}
          position="bottom-end"
          onClose={() =>
            setToast({
              ...toast,
              show: false,
            })
          }
        />
      </div>
    </div>
  );
}

export default Reservation;
