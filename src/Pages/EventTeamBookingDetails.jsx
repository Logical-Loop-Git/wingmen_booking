import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Card, Col, Modal, ModalBody, Row } from 'reactstrap';
import API from '../Config/api';

const EventTeamBookingDetails = () => {
    const { eventId } = useParams()
    const [teamBookingData, setTeamBookingData] = useState([])
    const [bookingData, setBookingData] = useState([])
    const [eventData, setEventData] = useState([])
    const [amount, setAmount] = useState([])
    const [driverData, setDriverData] = useState([])
    const [paymentDone, setPaymentDone] = useState("")
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)

    const handleBookingData = (list) => {
        setBookingData(list)
        setDriverData(list.driverId)
        setOpen(true)
    }

    const fetchData = () => {
        const body = {
            _id: eventId
        }
        const url = API + `getAllTeamBookings`

        axios
            .post(url, body)
            .then(async (response) => {
                if (response.data.success === true) {
                    setPaymentDone(response.data.message)
                    setTeamBookingData(response.data.data)
                } else {
                    toast.warn(response.data.message)
                }
            })
            .catch((err) => {
                console.log("error here", err)
            })
    }
    const fetchEventData = () => {
        const url = API + `getEventBookingById/${eventId}`

        axios
            .get(url)
            .then(async (response) => {
                if (response.data.success === true) {
                    setEventData(response.data.data)
                    setAmount(response.data.data.totalAmount / 2)
                } else {
                    toast.warn(response.data.message)
                }
            })
            .catch((err) => {
                console.log("error here", err)
            })
    }

    const handleOpen = () => {
        setShow(true)
    }

    const handleAllPay = () => {
        setLoading(true)
        const body = {
            eventId: eventId
        }
        const url = API + `eventTotalPay`

        axios
            .post(url, body)
            .then(async (response) => {
                if (response.data.success === true) {
                    toast.success(response.data.message)
                    setLoading(false)
                    setShow(false)
                    fetchData()
                } else {
                    toast.warn(response.data.message)
                    setLoading(false)
                }
            })
            .catch((err) => {
                console.log("error here", err)
                setLoading(false)
            }).finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchData()
        fetchEventData()
    }, [])


    return (
        <section>
            <div className="header_padd">
                <div className="tips_block">
                    <Card>
                        <div align="center" className="schedule_card">
                            <h3>Event Team Booking Information</h3>
                        </div>
                        <div className="schedule_booking_footer" style={{ height: "100%" }}>
                            <Row xs="12">
                                {
                                    paymentDone === "Payment Successfull" ? null : (<Col xs={4} md={4}>
                                        {
                                            <button onClick={handleOpen} className="btn_event_brand mb-2" style={{ backgroundColor: "#05a0e0", border: "none" }} variant="contained">
                                                Pay
                                            </button>
                                        }
                                    </Col>)
                                }
                            </Row>
                            {
                                teamBookingData.map((item, index) => {
                                    return (
                                        <Card key={index} style={{ cursor: "pointer" }} onClick={() => handleBookingData(item)}>
                                            <Row style={{ margin: 20 }}>
                                                <Col xs="6" md="6">
                                                    {item.firstName} {item.lastName}
                                                </Col>
                                                <Col xs="6" md="6" >
                                                    <span className="float-end">{moment.utc(item.createdAt).format('hh:mm:ss a')}</span>
                                                </Col>
                                            </Row>
                                        </Card>
                                    );
                                })
                            }
                            <Modal isOpen={open} toggle={() => setOpen(!open)} className='modal-dialog-centered modal-lg'>
                                <ModalBody className='px-sm-5 mx-50 pb-4'>
                                    <Row>
                                        <Col md="10" xs="10">
                                            <h4 className="m-2">Details</h4>
                                        </Col>
                                        <Col md="2" xs="2">
                                            <span type="text" color="primary" style={{ cursor: "pointer" }} className=" m-2" aria-label="Close" onClick={() => setOpen(!open)}>
                                                <span aria-hidden="true" style={{ FontSize: 15 }} >&times;</span>
                                            </span>
                                        </Col>
                                    </Row>
                                    <div style={{ margin: 10 }}>
                                        <h5>User Details</h5>
                                        <h6>User: <span style={{ fontWeight: 450 }}>{bookingData.firstName} {bookingData.lastName}</span></h6>
                                        <h6>Phone No.: <span style={{ fontWeight: 450 }}>{bookingData.countryCode} {bookingData.phoneNo}</span></h6>
                                        <h6>Drop Location: <span style={{ fontWeight: 450 }}>{bookingData.dropUpAddress}</span></h6>
                                        <h5 style={{ paddingTop: 20 }}>Driver Details</h5>
                                        <h6>Driver Name: <span style={{ fontWeight: 450 }}>{driverData.firstName} {driverData.lastName}</span></h6>
                                        <h6>Phone No.: <span style={{ fontWeight: 450 }}>{driverData.countryCode} {driverData.phone}</span></h6>
                                        <h5 style={{ paddingTop: 20 }}>Ride Details</h5>
                                        <h6>Booking No. <span style={{ fontWeight: 450 }}>{bookingData.bookingNo}</span></h6>
                                        <h6>Ride Distance: <span style={{ fontWeight: 450 }}>{parseFloat(bookingData.totalDistanceInKm).toFixed(5)} Km</span></h6>
                                    </div>
                                </ModalBody>
                            </Modal>
                            <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
                                <ModalBody className='px-sm-5 mx-50 pb-4'>
                                    <Row>
                                        <Col md="10" xs="10">
                                            <h4 className="m-2">Total Pay</h4>
                                        </Col>
                                        <Col md="2" xs="2">
                                            <span type="text" color="primary" style={{ cursor: "pointer" }} className=" m-2" aria-label="Close" onClick={() => setShow(!show)}>
                                                <span aria-hidden="true" style={{ FontSize: 15 }} >&times;</span>
                                            </span>
                                        </Col>
                                    </Row>
                                    <Row className='m-1'>
                                        <h6>Other half of the total price is {amount}$</h6>
                                        <h6>Extra hours charge is {eventData.extraAmount}$</h6>
                                        <h6>Total Amount deducted will be {eventData.extraAmount + amount}$</h6>
                                    </Row>
                                    <Row>
                                        <Col md="4" xs="4">
                                            {
                                                loading === true ? <button className="btn_event_brand mb-2" style={{ backgroundColor: "#05a0e0", border: "none" }}>
                                                    <div class="spinner-border text-white" role="status">
                                                        <span class="visually-hidden">Loading...</span>
                                                    </div>
                                                </button> : <button className="btn_event_brand" onClick={handleAllPay}>
                                                    Pay
                                                </button>
                                            }
                                        </Col>
                                    </Row>
                                </ModalBody>
                            </Modal>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
}
export default EventTeamBookingDetails