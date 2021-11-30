import React from 'react'
import { Col, Row } from 'reactstrap'
import booking from '../../Images/Home/booking_left.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import PickupLocation from '../Location/PickupLocation';
import DropLocation from '../Location/DropLocation';


const HomeBooking = () => {

    return (
        <div className="booking_section">
            <Row>
                <Col md={6}>
                    <div className="booking_home_img">
                        <img className="img-fluid" src={booking} alt="" />
                    </div>
                </Col>
                <Col md={6}>
                    <div className="booking_home">
                        <h2>Request a <span>Driver</span> Now</h2>
                        <div className="location">
                            <div className="pickup_icone">
                                <FontAwesomeIcon icon={faLocationArrow} />
                            </div>
                            <PickupLocation />
                        </div>
                        <div className="location">
                            <div className="drop_icone">
                                <FontAwesomeIcon icon={faThumbtack} />
                            </div>
                            <DropLocation />
                        </div>
                        <button className="btn_brand">book</button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default HomeBooking
