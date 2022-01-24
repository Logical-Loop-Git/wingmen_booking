import React, { useContext, useState } from "react";
import OtpInput from "react-otp-input";
import PhoneInput from "react-phone-input-2";
import { Button, Card, Col, Row } from "reactstrap";
import NavBar from "../Components/Header/NavBar";
import { Context } from "../Data/context";

const ScheduleBooking = () => {
    const { isLoading } = useContext(Context);

    const [phoneData, setPhoneData] = useState(false)

    const handleBooking = () => {
        setPhoneData(true)
    }

    return (
        <section>
            <NavBar />
            <div className="header_padd">
                <div className="tips_block">
                    <Card>
                        <div align="center" className="schedule_card">
                            <h3>Schedule Booking Information</h3>
                        </div>
                        <div className="schedule_booking_footer">
                            <div className="user_info">
                                <p>User name</p>
                                <p>User Address</p>
                                <p>User Phone Number</p>
                            </div>
                            <div className="schedule_info">
                                <p>Source Address</p>
                                <p>Destination Address</p>
                                <p>Booking Time</p>
                            </div>
                            <div className="driverinfo">
                                <p>Driver Name</p>
                            </div>
                            <div style={{ alignContent: "center" }}>

                                {
                                    phoneData ?
                                        <Row>
                                            <Row>
                                                <Col className="booking_form_otp">
                                                    <OtpInput
                                                        // value={opt}
                                                        // onChange={(e) => setOpt(e)}
                                                        numInputs={6}
                                                        separator={<span> - </span>}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="6">
                                                    <Button className="schedule_booking_phone_btn" >
                                                        Verified OTP
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Row>
                                        : <Row>
                                            <Row>
                                                <Col >
                                                    <PhoneInput
                                                        country={"in"}
                                                    // country={'us'}
                                                    // onChange={onPhoneNumberSignIn}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="6">
                                                    <Button className="schedule_booking_phone_btn" onClick={handleBooking}>
                                                        Done
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Row>
                                }
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default ScheduleBooking;
