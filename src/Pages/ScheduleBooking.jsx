import axios from "axios";
import moment from "moment-timezone";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import OtpInput from "react-otp-input";
import PhoneInput from "react-phone-input-2";
import { useParams } from "react-router-dom";
import { Button, Card, Col, Row } from "reactstrap";
import NavBar from "../Components/Header/NavBar";
import API from "../Config/api";
import { Context } from "../Data/context";
import { toast } from 'react-toastify';


const ScheduleBooking = () => {
    const { isLoading } = useContext(Context);
    const { bookingId } = useParams();

    const [phoneData, setPhoneData] = useState(false)
    const [phoneCoData, setPhoneCOData] = useState(false)
    const [userData, setUserData] = useState({})
    const [bookingData, setBookingData] = useState([])
    // const [serviceData, setServiceData] = useState([])
    const [otp, setOtp] = useState("")
    const [phoneNumber, setPhoneNumber] = useState('')
    const [countryCode, setCountryCode] = useState('')
    const [open, setOpen] = useState(false)
    const [cancelBookingDate, setCancelBookingDate] = useState("")


    const onPhoneNumberSignIn = (value, data) => {
        setPhoneNumber(value.slice(data.dialCode.length));
        setCountryCode(`+${data.dialCode}`);
    }

    const handleBooking = () => {
        const body = {
            "phone": phoneNumber,
            "countryCode": countryCode
        }
        console.log(body)
        setPhoneData(true)

        // const url = API + `assignScheduledRide`
        // axios
        //     .post(url, body)
        //     .then((response) => {
        //         console.log(response, 'booking');
        //         if (response.data.success === true) {
        //             console.log(response)
        //             setPhoneData(true)
        //             console.log(response.data.data)
        //         } else {
        //         }
        //     })
        //     .catch((err) => {
        //         console.log("error here", err);
        //     })
    }

    const handleCoDriverBooking = () => {
        const body = {
            "phone": phoneNumber,
            "countryCode": countryCode
        }
        console.log(body)
        setPhoneCOData(true)

        //const url = API + `assignScheduledRide`
        // axios
        //     .post(url, body)
        //     .then((response) => {
        //         console.log(response, 'booking');
        //         if (response.data.success === true) {
        //             console.log(response)
        //             setPhoneCOData(true)
        //             console.log(response.data.data)
        //         } else {
        //         }
        //     })
        //     .catch((err) => {
        //         console.log("error here", err);
        //     })
    }

    const handleVerifyOtp = () => {
        const body = {
            "otp": otp,
            "bookingId": bookingId
        }
        console.log(body)
        setOpen(false)
        setOtp("")
        //const url = API + `ScheduledRideVerifyOtp`
        // axios
        //     .post(url, body)
        //     .then((response) => {
        //         console.log(response, 'booking');
        //         if (response.data.success === true) {
        //             console.log(response)
        //             setOpen(false)
        //             setOtp("")
        //         } else {
        //         }
        //     })
        //     .catch((err) => {
        //         console.log("error here", err);
        //     })
    }

    const handleVerifyCoDriverOtp = () => {
        const body = {
            "otp": otp,
            "bookingId": bookingId
        }
        console.log(body)
        setOtp("")
        // const url = API + `ScheduledRideCoDriverVerifyOtp`
        // axios
        //     .post(url, body)
        //     .then((response) => {
        //         console.log(response, 'booking');
        //         if (response.data.success === true) {
        //             console.log(response)
        //             setOtp("")

        //             fetchBookingData()
        //         } else {
        //         }
        //     })
        //     .catch((err) => {
        //         console.log("error here", err);
        //     })
    }

    const fetchBookingData = () => {
        const body = {
            _id: bookingId
        }
        const url = API + `viewScheduledRide`
        axios
            .post(url, body)
            .then((response) => {
                console.log(response, 'booking');
                if (response.data.message === "Success") {
                    setBookingData(response.data.data)
                    setUserData(response.data.data.userId)
                    setCancelBookingDate(moment(response.data.data.bookingDate).subtract(2, 'h').format("lll"))
                    // setServiceData(response.data.data.seviceTypeId)
                } else {
                }
            })
            .catch((err) => {
                console.log("error here", err);
            })
    }
    
    const handleCoDriver = () => {
        const body = {
            bookingId: bookingId
        }
        console.log(body)
        toast.success(`Co Driver assign.`)

        // const url = API + `availableFreeScheduledCoDriver`
        // axios
        //     .post(url, body)
        //     .then((response) => {
        //         if (response.data.success === true) {
        //             console.log(response)
        //              toast.success(`Co Driver assign..`)
        //         } else {
        // toast.warn("Something went wrong")
        //         }
        //     })
        //     .catch((err) => {
        //         console.log("error here", err);
        //     })
    }

    const handleCancelCodriver = () => {

    }

    useEffect(() => {
        fetchBookingData()
        setOpen(true)
    }, [])

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
                                <h5 style={{ marginBottom: 20 }}>User Details</h5>
                                <h6>Name: <span>{userData.firstName} {userData.lastName}</span></h6>
                                <h6>Phone Number: <span>{userData.phone}</span></h6>
                            </div>
                            <div className="schedule_info">
                                <h5 style={{ marginBottom: 20 }}>Booking Details</h5>
                                <h6>Pick Up Address: <span>{bookingData.pickUpAddress}</span></h6>
                                <h6>Drop Up Address: <span>{bookingData.dropUpAddress}</span></h6>
                                <h6>Booking Day: <span>{bookingData.bookingDate ? moment(bookingData.bookingDate).format('MMMM Do YYYY') : ""}</span></h6>
                                <h6>Booking Time: <span>{bookingData.bookingDate ? moment(bookingData.bookingDate).format('h:mm:ss a') : ""}</span></h6>
                            </div>
                            <div>
                                {!bookingData.driverId ?
                                    <div>
                                        <div style={{ alignContent: "center", marginTop: 30 }}>
                                            {
                                                open === true ?
                                                    phoneData === true ?
                                                        <Row>
                                                            <Row>
                                                                <Col className="booking_form_otp">
                                                                    <OtpInput
                                                                        value={otp}
                                                                        onChange={(e) => setOtp(e)}
                                                                        numInputs={6}
                                                                        separator={<span> - </span>}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md="6">
                                                                    <Button className="schedule_booking_phone_btn" onClick={handleVerifyOtp}>
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
                                                                        onChange={onPhoneNumberSignIn}
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
                                                        </Row> :
                                                    bookingData.tripType === "SINGLETRIP" ?
                                                        <div className="driverinfo">
                                                            <h5>You want to assign Co-driver ? </h5>
                                                            <Button className="schedule_codriver_btn" onClick={handleCoDriver}>Yes</Button> <Button style={{ marginLeft: 5 }} className="schedule_codriver_btn" onClick={handleCancelCodriver}>No</Button>
                                                        </div> : null
                                            }
                                        </div>

                                        {/* <h6 className="schedule_driver_info">Driver is already assign for this ride</h6> */}
                                    </div>

                                    :
                                    <div>
                                        {
                                            bookingData.tripType === "SINGLETRIP" ?
                                                !bookingData.coDriverId ? <div>
                                                    <div style={{ alignContent: "center", marginTop: 30 }}>

                                                        {
                                                            phoneCoData ?
                                                                <Row>
                                                                    <Row>
                                                                        <Col className="booking_form_otp">
                                                                            <OtpInput
                                                                                value={otp}
                                                                                onChange={(e) => setOtp(e)}
                                                                                numInputs={6}
                                                                                separator={<span> - </span>}
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                    <Row>
                                                                        <Col md="6">
                                                                            <Button className="schedule_booking_phone_btn" onClick={handleVerifyCoDriverOtp}>
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
                                                                                onChange={onPhoneNumberSignIn}
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                    <Row>
                                                                        <Col md="6">
                                                                            <Button className="schedule_booking_phone_btn" onClick={handleCoDriverBooking}>
                                                                                Done
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>
                                                                </Row>
                                                        }
                                                    </div>
                                                </div> : <div>
                                                    <h6 className="schedule_driver_info">Co-driver is already assign for this ride</h6>
                                                </div>
                                                : null
                                        }
                                    </div>
                                }
                            </div>
                            <div>
                                {
                                    (moment().format("lll") >= cancelBookingDate) ? null :
                                        <Row>
                                            <Col md="12">
                                                {
                                                    isLoading === true ? <Button className="schedule_btn">
                                                        <div class="spinner-border text-white" role="status">
                                                            <span class="visually-hidden">Loading...</span>
                                                        </div>
                                                    </Button> : <Button disabled={moment().format("lll") >= cancelBookingDate} className="schedule_btn">Cancel Booking</Button>
                                                }

                                            </Col>
                                        </Row>
                                }
                            </div>
                        </div>
                    </Card>
                </div>
            </div >
        </section >
    );
};

export default ScheduleBooking;
