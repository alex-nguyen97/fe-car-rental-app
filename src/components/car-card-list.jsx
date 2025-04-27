import { React, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import ToastNotification from './toast-notification';
import carList from '../data/cars.json';
import { useNavigate } from 'react-router-dom';
import {
  FaGasPump,
  FaBolt,
  FaSeedling,
  FaPowerOff,
  FaBurn,
} from 'react-icons/fa';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const CarCardList = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({
    message: 'Product added to cart!',
    showToast: false,
    background: 'success',
  });

  const handleClickRentCar = (vinId) => {
    navigate('/reservation/' + vinId);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ marginBottom: '20px' }}
      >
        <div>
          <h2>Car rental Australia</h2>
          <p>
            Whether you’re traveling for business or pleasure, a car is the most
            affordable mode of transport to get around Australia. Save time and
            costs with low overheads, great options, quick availability and easy
            booking management.
          </p>
        </div>
      </div>
      <Row xs={1} md={3} lg={3} className="g-3">
        {carList.map((car) => {
          return (
            <Col
              key={`car-col-${car.vin_id}`}
              className="d-flex justify-content-center"
              md={4}
            >
              <Card
                key={car.vin_id}
                className="card-hover"
                style={{ width: '100%', height: '450px', position: 'relative' }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    display: 'flex',
                    gap: '5px',
                    zIndex: 2,
                  }}
                >
                  {car.is_hybrid === 1 && (
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="tooltip-hybrid">
                          This car is a Hybrid
                        </Tooltip>
                      }
                    >
                      <FaSeedling
                        style={{ color: 'beige', fontSize: '20px' }}
                      />
                    </OverlayTrigger>
                  )}
                  {car.is_diesel === 1 && (
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="tooltip-diesel">
                          This car uses Diesel
                        </Tooltip>
                      }
                    >
                      <FaBurn style={{ color: 'beige', fontSize: '20px' }} />
                    </OverlayTrigger>
                  )}
                  {car.is_petrol === 1 && (
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="tooltip-petrol">
                          This car uses Petrol
                        </Tooltip>
                      }
                    >
                      <FaGasPump style={{ color: 'beige', fontSize: '20px' }} />
                    </OverlayTrigger>
                  )}
                  {car.is_electric === 1 && (
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="tooltip-electric">
                          This car is Electric
                        </Tooltip>
                      }
                    >
                      <FaBolt style={{ color: 'beige', fontSize: '20px' }} />
                    </OverlayTrigger>
                  )}
                  {car.is_automatic === 1 && (
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="tooltip-automatic">
                          This car is Automatic
                        </Tooltip>
                      }
                    >
                      <FaPowerOff
                        style={{ color: 'beige', fontSize: '20px' }}
                      />
                    </OverlayTrigger>
                  )}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={car.image_url}
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(60%)',
                    }}
                  />
                </div>
                <Card.Body
                  className="p-2 d-flex flex-column justify-content-between"
                  style={{
                    position: 'relative',
                    textAlign: 'left',
                    color: 'white',
                  }}
                >
                  <Card.Title
                    style={{
                      color: 'white',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {car.vehicle_category}
                  </Card.Title>
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{ width: '100%' }}
                  >
                    <div>
                      <Card.Text style={{ marginBottom: '5px' }}>
                        Brand: {car.brand} (Model: {car.model} - Type:{' '}
                        {car.car_type})
                      </Card.Text>
                      <Card.Text style={{ marginBottom: '5px' }}>
                        Price: ${car.avg_rate} / day
                      </Card.Text>
                      <Card.Text
                        style={{ marginBottom: '5px', color: '#d3d3d3' }}
                      >
                        Year of Manufacture: {car.year_of_manufacture}
                      </Card.Text>
                      <Card.Text
                        style={{ marginBottom: '5px', color: '#d3d3d3' }}
                      >
                        Mileage : {car.mileage} km
                      </Card.Text>
                      <Card.Text
                        style={{ marginBottom: '5px', color: '#d3d3d3' }}
                      >
                        {car.details}
                      </Card.Text>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleClickRentCar(car.vin_id)}
                      style={{
                        borderRadius: '20px',
                        backgroundColor: 'orange',
                        borderColor: 'orange',
                        alignSelf: 'end',
                        marginBottom: '10px',
                        padding: '5px 30px',
                        fontSize: '16px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Rent Now
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <ToastNotification
        message={toast.message}
        showToast={toast.showToast}
        background={toast.background}
        position="bottom-end"
        onClose={() =>
          setToast({
            ...toast,
            showToast: false,
          })
        }
      />
    </div>
  );
};

export default CarCardList;
