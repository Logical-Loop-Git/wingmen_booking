import React, { useContext, useEffect, useState } from 'react'
import PhoneInput from "react-phone-input-2";
import { Col, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { Context } from '../Data/context';
import "flatpickr/dist/themes/material_green.css";
import moment from "moment-timezone";
import Flatpickr from "react-flatpickr";
import { Elements } from '@stripe/react-stripe-js';
import API, { stripLiveKey } from '../Config/api';
import { loadStripe } from '@stripe/stripe-js';
import EventCardForm from '../Components/Stripe/EventCardForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import axios from 'axios';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";


const EventBooking = () => {

    // const [coDriver, setCoDriver] = useState(false)
    const [date, setDate] = useState(moment().format('YYYY-MM-DD hh:mm:ss'))
    const [eventInfo, setEventInfo] = useState(false)
    const [eventCardInfo, setEventCardInfo] = useState(false)
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    // const [driverRate, setDriverRate] = useState("")
    const [tatolPayment, setTotalPayment] = useState("")
    const [eventId, setEventId] = useState("")
    const [pickUpLocation, setPickUpLocation] = useState({
        address: "",
        latitude: 0,
        longitude: 0,
    });
    const stripePromise = loadStripe(stripLiveKey);
    const [eventBooking, setEventBooking] = useState({
        firstName: "",
        lastName: "",
        email: "",
        countryCode: "",
        altCountryCode: "",
        phone: "",
        altPhone: "",
        eventName: "",
        driver: 0,
        coDriver: 0,
        noOfHours: 0
    })
    const {
        isLoading
        //setIsLoading
    } = useContext(Context)

    const { value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
        requestOptions: {
            /* Define search scope here */
        },
        debounce: 300
    });

    const ref = useOnclickOutside(() => {
        clearSuggestions();
    });

    // const handleChange = (e) => {
    //     setCoDriver(e.target.checked)
    // }

    const handleInputDrop = (e) => {
        setValue(e.target.value);
    };

    const handleSelectDrop = ({ description }) => () => {
        setValue(description, false);
        clearSuggestions();

        getGeocode({ address: description })
            .then((results) => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                console.log("📍 Drop coordinates: ", { lat, lng });
                setPickUpLocation({
                    address: description,
                    latitude: lat,
                    longitude: lng
                })
            })
            .catch((error) => {
                console.log("😱 Error: ", error);
            });
    };

    const renderSuggestionsDrop = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text }
            } = suggestion;

            return (
                <li key={place_id} onClick={handleSelectDrop(suggestion)}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        });

    const onPhoneNumberSignIn = (value, data) => {
        setEventBooking({
            ...eventBooking,
            phone: value.slice(data.dialCode.length),
            countryCode: `+${data.dialCode}`
        });
    }

    const onPhoneAltNumberSignIn = (value, data) => {
        setEventBooking({
            ...eventBooking,
            altPhone: value.slice(data.dialCode.length),
            altCountryCode: `+${data.dialCode}`
        });
    }

    const handleBack = () => {
        setEventInfo(true)
        setEventCardInfo(false)
    }

    const createEventBooking = () => {
        if (eventBooking.firstName === "" || eventBooking.lastName === "" || eventBooking.email === "" ||
            eventBooking.phone === "" || eventBooking.driver === "" ||
            eventBooking.eventName === "" || date === "") {
            toast.warn("Some fields are missing")
        }
        else {
            const body = {
                firstName: eventBooking.firstName,
                lastName: eventBooking.lastName,
                email: eventBooking.email,
                pickUplongitude: pickUpLocation.longitude,
                pickUplatitude: pickUpLocation.latitude,
                pickUpAddress: pickUpLocation.address,
                phone: eventBooking.phone,
                altPhone: eventBooking.altPhone,
                countryCode: eventBooking.countryCode,
                altCountryCode: eventBooking.altCountryCode,
                driver: eventBooking.driver,
                eventName: eventBooking.eventName,
                bookingDate: moment(date[0]).format('YYYY-MM-DD hh:mm:ss'),
                coDriver: eventBooking.driver,
                noOfHours: eventBooking.noOfHours
            }
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            console.log(body)
            let url = API + `createEventBooking`;
            axios
                .post(url, body, config)
                .then((response) => {
                    if (response.data.success === true) {
                        setEventCardInfo(true)
                        setEventInfo(false)
                        setEventId(response.data.data._id)
                        localStorage.setItem("eventToken", response.data.data.token)
                        fetchTotalPayment(response.data.data._id)
                    } else {
                        toast.warn(response.data.message);
                    }
                })
                .catch((err) => {
                    console.log("error here", err);
                });
        }
    }

    const fetchTotalPayment = (id1) => {
        const eventToken = localStorage.getItem("eventToken")
        const config = {
            headers: {
                Authorization: `${eventToken}`,
            },
        };
        let url = API + `getTotalAmount/${id1}`;
        axios
            .post(url, config)
            .then((response) => {
                if (response.data.success === true) {
                    setTotalPayment(response.data.data)
                } else {
                }
            })
            .catch((err) => {
                console.log("error here", err);
            });
    }

    const handleConfirmBox = () => {
        setShow(true)
    }

    const BookRide = async () => {
        setLoading(true)
        const url = API + `confirmEventBooking`
        const body = {
            eventId: eventId
        }
        await axios
            .post(url, body)
            .then((response) => {
                if (response.data.success === true) {
                    toast.success(`Your event created successfully.`)
                    setLoading(false)
                    window.location = "/eventbooking"
                } else {
                    toast.warn(response.data.message);
                    setLoading(false)
                }
            })
            .catch((err) => {
                console.log("error here", err);
                setLoading(false)
            }).finally(() => {
                setLoading(false)

            })
    }

    useEffect(() => {
        setEventInfo(true)
        // setEventCardInfo(true)
        // let url = API + `getDriverRate `;
        // axios
        //     .get(url)
        //     .then((response) => {
        //         if (response.data.success === true) {
        //             setDriverRate(response.data.data)
        //         } else {
        //         }
        //     })
        //     .catch((err) => {
        //         console.log("error here", err);
        //     });
    }, [])

    return (
        <section>
            {/* <NavBar /> */}
            {
                eventInfo &&
                <div className="container header_padd">
                    <div className="contact_block">
                        <Row>
                            <Col md={12}>
                                <div className="contact_head">
                                    <h2>Event Booking</h2>
                                </div>
                                <div className="contact_form">
                                    <Row>
                                        <Col md={6}>
                                            <div className="m-1">
                                                <Label>First Name</Label>
                                                <input
                                                    type="text"
                                                    id="fname"
                                                    value={eventBooking.firstName}
                                                    onChange={(e) => {
                                                        setEventBooking({
                                                            ...eventBooking,
                                                            firstName: e.target.value
                                                        })
                                                    }}
                                                    placeholder="First name"
                                                    required
                                                />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="m-1">
                                                <Label>Last Name</Label>
                                                <input
                                                    type="text"
                                                    id="lname"
                                                    value={eventBooking.lastName}
                                                    onChange={(e) => {
                                                        setEventBooking({
                                                            ...eventBooking,
                                                            lastName: e.target.value
                                                        })
                                                    }}
                                                    placeholder="Last name"
                                                    required
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <div className="m-1">
                                                <Label>Email</Label>
                                                <input
                                                    type="text"
                                                    id="email"
                                                    value={eventBooking.email}
                                                    onChange={(e) => {
                                                        setEventBooking({
                                                            ...eventBooking,
                                                            email: e.target.value
                                                        })
                                                    }}
                                                    placeholder="Email"
                                                    required
                                                />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div ref={ref} className="m-1">
                                                <Label>Location</Label>
                                                <input
                                                    value={value}
                                                    onChange={handleInputDrop}
                                                    name="address"
                                                    placeholder="Enter drop location"
                                                />
                                                {status === "OK" && <div className="location_suggestion_pickup" style={{ zIndex: 1 }}><ul>{renderSuggestionsDrop()}</ul></div>}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6} className="phone_input">
                                            <div className="m-1">
                                                <Label>Phone No.</Label>
                                                <PhoneInput country={"us"}
                                                    onChange={onPhoneNumberSignIn}

                                                />
                                            </div>
                                        </Col>
                                        <Col md={6} className="phone_input">
                                            <div className="m-1">
                                                <Label>Alternative Phone No.</Label>
                                                <PhoneInput country={"us"}
                                                    onChange={onPhoneAltNumberSignIn}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <div className="m-1">
                                                <Label>How many driver you want ?</Label>
                                                <input
                                                    type="number"
                                                    id="adress"
                                                    value={eventBooking.driver}
                                                    onChange={(e) => {
                                                        setEventBooking({
                                                            ...eventBooking,
                                                            driver: e.target.value
                                                        })
                                                    }}
                                                    placeholder="driver"
                                                    required
                                                />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="m-1 ">
                                                <Label>Date &amp; Time</Label>
                                                <Flatpickr
                                                    data-enable-time
                                                    value={date}
                                                    onChange={(date) => setDate(date)}
                                                    placeholder='Date And Time'
                                                />
                                            </div>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <div className="m-1">
                                                <Label>Event Name</Label>
                                                <input
                                                    type="text"
                                                    id="adress"
                                                    value={eventBooking.eventName}
                                                    onChange={(e) => {
                                                        setEventBooking({
                                                            ...eventBooking,
                                                            eventName: e.target.value
                                                        })
                                                    }}
                                                    placeholder="Event Name"
                                                    required
                                                />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="m-1">
                                                <Label>No of Hour</Label>
                                                <input
                                                    type="number"
                                                    id="adress"
                                                    value={eventBooking.noOfHours}
                                                    onChange={(e) => {
                                                        setEventBooking({
                                                            ...eventBooking,
                                                            noOfHours: e.target.value
                                                        })
                                                    }}
                                                    placeholder="No Of Hours"
                                                    required
                                                />
                                            </div>
                                        </Col>
                                        {/* <Col md={6}>
                                        <div >
                                            <div className="strip_add_card_event">
                                                <Elements stripe={stripePromise}>
                                                    <EventCardForm />
                                                </Elements>
                                            </div>
                                        </div>
                                    </Col> */}
                                    </Row>
                                    {/* <Row>
                                        <Col md={6}>
                                            <div className="m-1">
                                                <Label>Driver Per Hour ($)</Label>
                                                <input
                                                    type="text"
                                                    id="driverRate"
                                                    value={driverRate}
                                                    disabled
                                                    required
                                                />
                                            </div>
                                        </Col>
                                    </Row> */}
                                    {/* <Row>
                                    <Col md={6}>
                                        <div style={{ margin: "10px 10px 10px 10px" }}>
                                            <Label>You want co-driver?</Label>
                                            <input type="checkbox" checked={coDriver} onChange={handleChange} style={{ marginLeft: 10, height: 20, width: 20 }} />
                                        </div>
                                    </Col>
                                    {
                                        coDriver ?
                                            <Col md={6}>
                                                <div className="m-1">
                                                    <Label>Co-driver</Label>
                                                    <input
                                                        type="number"
                                                        id="adress"
                                                        value={eventBooking.driver}
                                                        placeholder="Address"
                                                        disabled
                                                        onChange={(e) => {
                                                            setEventBooking({
                                                                ...eventBooking,
                                                                coDriver: e.target.value
                                                            })
                                                        }}
                                                        required
                                                    />
                                                </div>
                                            </Col> : null
                                    }
                                </Row> */}
                                    <div style={{ marginTop: 20 }} className='d-flex justify-content-between'>
                                        {
                                            isLoading === true ? <button className="booking_next">
                                                <div class="spinner-border text-white" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div>
                                            </button> : <button className="booking_next" onClick={createEventBooking} >
                                                next
                                                <FontAwesomeIcon icon={faArrowRight} />
                                            </button>
                                        }
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            }
            {
                eventCardInfo &&
                <div className="container header_padd" >
                    <div className="contact_block" >
                        <Row>
                            <Col md="12">
                                <div className="contact_head">
                                    <h2>Payment Details</h2>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <div className="contact_form">
                                    <div>
                                        <Label>Total Payment ($)</Label>
                                        <input
                                            type="text"
                                            id="adress"
                                            value={tatolPayment}
                                            disabled
                                            required
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <div className="contact_form">
                            <div className="strip_add_card_event">
                                <Elements stripe={stripePromise} style={{ height: 400 }}>
                                    <EventCardForm />
                                </Elements>
                                <div style={{ marginTop: 20 }} className='d-flex'>
                                    {
                                        [<button className="booking_back" onClick={handleBack}>
                                            back
                                            <FontAwesomeIcon icon={faArrowLeft} />
                                        </button>, <button className="booking_next ms-2" onClick={handleConfirmBox} >
                                            Book
                                            <FontAwesomeIcon icon={faArrowRight} />
                                        </button>]
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
                <ModalHeader>Create Event</ModalHeader>
                <ModalBody className='px-sm-5 mx-50 pb-4'>
                    <h6 className="m-3">
                        Half of the total price is going to be deducted, {tatolPayment / 2}$.
                    </h6>
                    <div style={{ marginTop: 20 }} className='d-flex'>
                        <button className="event_btn ms-2" onClick={() => setShow(!show)}> Cancel</button>
                        {
                            loading === true ? <button className="event_btn ms-2">
                                <div class="spinner-border text-white" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </button> : <button className="event_btn ms-2" onClick={BookRide}> Confirm</button>
                        }

                    </div>
                </ModalBody>
            </Modal>
            {/* <Footer /> */}
        </section>
    )
}

export default EventBooking