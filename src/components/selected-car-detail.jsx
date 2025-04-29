import React from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap';

const SelectedCarDetails = ({ selectedCar, onSelectAnotherCar }) => {
  return (
    <Col>
      <h5>Selected Car Details</h5>
      <Row>
        {/* Column for car name and image */}
        <Col md={6}>
          <div>
            <strong>
              {selectedCar.brand} - {selectedCar.car_type}{' '}
              {selectedCar.year_of_manufacture}
            </strong>
          </div>
          <Image
            variant="top"
            src={selectedCar.image_url}
            style={{
              height: '300px',
              width: '100%',
              objectFit: 'cover',
            }}
          />
        </Col>

        {/* Column for other information */}
        <Col md={6}>
          <ul>
            <br />
            <li>
              <strong>Model: </strong>
              {selectedCar.model}
            </li>
            <li>
              <strong>Detail: </strong>
              {selectedCar.details}
            </li>
            <li>
              <strong>Daily Rate: </strong>${selectedCar.avg_rate}
            </li>
          </ul>
          <Button
            variant="primary"
            style={{ marginLeft: '10px' }}
            onClick={onSelectAnotherCar}
          >
            Select another car
          </Button>
        </Col>
      </Row>
    </Col>
  );
};

export default SelectedCarDetails;
