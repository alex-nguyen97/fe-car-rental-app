import { React, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import ToastNotification from './toast-notification';
import carList from '../data/cars.json';

const CarCardList = () => {
  const [toast, setToast] = useState({
    message: 'Product added to cart!',
    showToast: false,
    background: 'success',
  });
  return (
    <div style={{ padding: '20px' }}>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ marginBottom: '20px' }}
      >
        <div>
          <div>
            <h2 class="mb-4">Car rental Australia</h2>
            <p>
              Whether you’re traveling for business or pleasure, a car is the
              most affordable mode of transport to get around Australia. Save
              time and costs with low overheads, great options, quick
              availability and easy booking management.
            </p>
          </div>
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
                key={'1'}
                className="card-hover"
                style={{ width: '100%', height: '450px', position: 'relative' }}
              >
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
                      filter: 'brightness(50%)',
                    }}
                  />
                </div>
                <Card.Body
                  className="p-2 d-flex flex-column justify-content-between"
                  style={{
                    color: 'white',
                    position: 'relative',
                    textAlign: 'left',
                  }}
                >
                  <Card.Title
                    style={{
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
                        Brand: {car.brand}
                      </Card.Text>
                      <Card.Text style={{ marginBottom: '5px' }}>
                        Model: {car.model}
                      </Card.Text>
                      <Card.Text style={{ marginBottom: '5px' }}>
                        Car Type: {car.car_type}
                      </Card.Text>
                      <Card.Text style={{ marginBottom: '5px' }}>
                        Category Type: {car.category_type}
                      </Card.Text>
                      <Card.Text style={{ marginBottom: '5px' }}>
                        Price: ${car.avg_rate} / day
                      </Card.Text>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {}}
                      style={{
                        borderRadius: '20px',
                        backgroundColor: 'orange',
                        borderColor: 'orange',
                        alignSelf: 'end',
                        marginBottom: '10px',
                        padding: '10px 50px',
                        fontSize: '16px',
                      }}
                    >
                      Select
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
