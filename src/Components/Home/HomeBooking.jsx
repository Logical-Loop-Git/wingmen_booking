import React from 'react'
import { Col, Row } from 'reactstrap'
import booking from '../../Images/Home/booking_left.jpg'
import { useHistory } from 'react-router';


const HomeBooking = () => {

    const history = useHistory()

    const onBooking = () => {
        history.push(`/booking`)
    }


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
                        <div className="login_home">
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sedLorem ipsum dolor sit amet consectetur adipiscing elit sed</p>
                        </div>
                        <button
                            className="btn_brand"
                            onClick={() => onBooking()}
                        >
                            book ride
                        </button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default HomeBooking
