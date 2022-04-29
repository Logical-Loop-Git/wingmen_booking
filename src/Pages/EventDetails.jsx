import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Card } from 'reactstrap';
import API from '../Config/api';
// import { Context } from '../Data/context';

const EventDetails = () => {
    const { eventId } = useParams();
    // const {
    //     isLoading,
    //     setIsLoading
    // } = useContext(Context)
    const [eventData, setEventData] = useState({})
    const [cardIdData, setCardIdData] = useState({})
    // const cancelTime = moment(moment(eventData.bookingDate).format('YYYY-MM-DD hh:mm:ss')).subtract(5, "hour").format('YYYY-MM-DD hh:mm:ss')
    // const currentDate = moment().format('YYYY-MM-DD hh:mm:ss')

    const fetchBookingData = () => {
        const url = API + `getEventBookingById/${eventId}`
        axios
            .get(url)
            .then((response) => {
                if (response.data.success === true) {
                    setEventData(response.data.data)
                    fetchBookingCardData(response.data.data.userCard[0])
                } else {
                    toast.warn(response.data.message)
                }
            })
            .catch((err) => {
                console.log("error here", err);
            })
    }

    const fetchBookingCardData = (id) => {
        const url = API + `getCardById/${id}`
        axios
            .get(url)
            .then((response) => {
                if (response.data.success === true) {
                    setCardIdData(response.data.data)
                } else {
                }
            })
            .catch((err) => {
                console.log("error here", err);
            })
    }

    // const cancelBooking = () => {
    //     setIsLoading(true)
    //     const body = {
    //         _id: eventId
    //     }
    //     const url = API + `cancelEventBooking`
    //     axios
    //         .post(url, body)
    //         .then((response) => {
    //             if (response.data.success === true) {
    //                 toast.success("Event Successfully Cancel")
    //                 fetchBookingData()
    //             } else {
    //                 toast.warn(response.data.message)
    //                 setIsLoading(false)
    //             }
    //         })
    //         .catch((err) => {
    //             console.log("error here", err);
    //             setIsLoading(false)
    //         }).finally(() => {
    //             setIsLoading(false)

    //         })
    // }

    useEffect(() => {
        fetchBookingData()
    }, [])
    return (
        <section>
            <div className="header_padd">
                <div className="tips_block">
                    <Card>
                        <div align="center" className="schedule_card">
                            <h3>Event Booking Information</h3>
                        </div>
                        {
                            // eventData._id ?
                            // ((eventData.isDeleted === true && eventData.isDeleted) ? (<div className="schedule_booking_footer">
                            //     <div className="user_info">
                            //         <h4 style={{ marginLeft: 20 }}>Your Booking has been cancelled</h4>
                            //     </div>
                            // </div>) :
                            (<div className="schedule_booking_footer">
                                <div className="user_info">
                                    <h5 style={{ marginBottom: 20 }}>User Details</h5>
                                    <h6>Name: <span>{eventData.firstName} {eventData.lastName}</span></h6>
                                    <h6>Phone Number: <span>+{eventData.countryCode} {eventData.phone}</span></h6>
                                    {
                                        eventData.altPhone === null ? null :
                                            <h6>Alternative Phone Number: <span>+{eventData.altCountryCode} {eventData.altPhone}</span></h6>

                                    }
                                </div>
                                <div className="schedule_info">
                                    <h5 style={{ marginBottom: 20 }}>Booking Details</h5>
                                    <h6>Event Address: <span>{eventData.pickUpAddress}</span></h6>
                                    <h6>Drivers: <span>{eventData.driver}</span></h6>
                                    <h6>Co-drivers: <span>{eventData.coDriver}</span></h6>
                                    <h6>Booking No.: <span>{eventData.bookingNo}</span></h6>
                                    <h6>Booking Date: <span>{eventData.bookingDate ? moment.utc(eventData.bookingDate).format('MMMM DD YYYY') : ""}</span></h6>
                                    <h6>Booking Time: <span>{eventData.bookingDate ? moment.utc(eventData.bookingDate).format('hh:mm:ss a') : ""}</span></h6>
                                </div>
                                <div className="schedule_info">
                                    <h5 style={{ margin: "20px 0px 20px 0px" }}>Card Details</h5>
                                    <div className="display_user_card">
                                        <label>
                                            <p>•••• •••• •••• {cardIdData.last4Digits}</p>
                                            <p>{cardIdData.brand} - {cardIdData.expiryDate}</p>
                                        </label>
                                    </div>
                                </div>
                                {/* {
                                            (cancelTime < currentDate) === true ? null :

                                                <div style={{ marginTop: 20 }} className='d-flex justify-content-between'>
                                                    {
                                                        isLoading === true ? <button className="booking_next">
                                                            <div class="spinner-border text-white" role="status">
                                                                <span class="visually-hidden">Loading...</span>
                                                            </div>
                                                        </button> : <button className="booking_next" style={{ marginBottom: 20 }} onClick={cancelBooking}>
                                                            Cancel Booking
                                                        </button>
                                                    }
                                                </div>
                                        } */}
                            </div>)
                            // : <div className="d-flex justify-content-center m-3">
                            // <div className="spinner-border" style={{ color: "#05a0e0" }} role="status">
                            //     <span className="visually-hidden"></span>
                            // </div>
                            // </div>
                        }
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default EventDetails