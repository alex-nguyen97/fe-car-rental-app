import MenuBar from '../components/menu-bar';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import ReservationError from '../components/reservation-error';
import RentalForm from '../components/rental-form';
import SelectedCarDetails from '../components/selected-car-detail';
import { setSelectedCar } from '../storeSlice';
import { useDispatch, useSelector } from 'react-redux';

const ReservationContent = () => {
  const { vinId } = useParams();
  const [carVinId, setCarVinId] = React.useState(vinId);

  const carList = useSelector((state) => {
    return state.store.carList;
  });

  // Check if vinId is matched with the selected car in local storage
  const selectedCar = useSelector((state) => {
    return state.store.selectedCar;
  });

  const isAvailableCar = () => {
    const currentCar = carList.find((car) => {
      return car.vin_id === carVinId;
    });
    return currentCar && currentCar.availability;
  };

  if (!carVinId) {
    if (!selectedCar) {
      return <ReservationError message="No car selected for reservation." />;
    } else {
      setCarVinId(selectedCar.vin_id);
      window.history.replaceState(
        null,
        '',
        `/reservation/${selectedCar.vin_id}`
      );
    }
  }

  if (!isAvailableCar()) {
    return <ReservationError message="Car is unavailable for reservation." />;
  }

  return (
    <div>
      <Row className="mb-3">
        <Col>
          <RentalForm selectedCar={selectedCar} />
        </Col>
        {selectedCar && <SelectedCarDetails selectedCar={selectedCar} />}
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
        <ReservationContent />
      </div>
    </div>
  );
}

export default Reservation;
