import { React, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import ToastNotification from "./toast-notification";
import carList from "../data/cars.json";
const CarCardList = () => {
    const [toast, setToast] = useState({
        message: "Product added to cart!",
        showToast: false,
        background: "success",
    });
    return (
        <div style={{ padding: '20px' }}>
            <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '20px' }}>
                <h2 style={{ textAlign: 'left', textTransform: 'uppercase', fontSize: '24px', margin: 0 }}>
                    Car List
                </h2>
            </div>
            <Row xs={2} md={3} lg={5} className="g-3">
                {carList.map((car) => {
                    return (
                        <Col key={`car-col-${car.vin_id}`} className="d-flex justify-content-center">
                            <Card key={"1"} className="card-hover" style={{ width: "100%", maxWidth: "350px" }}>
                                <Card.Img
                                    variant="top"
                                    src={car.image_url}
                                    style={{ height: "350px", objectFit: "cover", padding: "30px" }}
                                />
                                <Card.Body className="p-2">
                                    <Card.Title style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>{car.vehicle_category}</Card.Title>
                                    <Card.Text style={{ marginBottom: '5px' }}>Price: ${car.avg_rate}</Card.Text>
                                    <Button
                                        size="sm"
                                        onClick={() => { }}
                                    >
                                        Add to Cart
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>

                    )
                })}
            </Row>
            <ToastNotification
                message={toast.message}
                showToast={toast.showToast}
                background={toast.background}
                position="bottom-end"
                onClose={() => setToast(
                    {
                        ...toast,
                        showToast: false
                    }
                )}
            />
        </div >
    );
};

export default CarCardList;
