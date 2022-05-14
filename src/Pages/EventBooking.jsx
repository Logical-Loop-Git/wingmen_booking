import React, { useContext, useEffect, useMemo, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { Col, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { Context } from "../Data/context";
import "flatpickr/dist/themes/material_green.css";
import moment from "moment-timezone";
import Flatpickr from "react-flatpickr";
import { Elements } from "@stripe/react-stripe-js";
import API, { stripLiveKey } from "../Config/api";
import { loadStripe } from "@stripe/stripe-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import axios from "axios";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const useOptions = () => {
    const options = useMemo(
        () => ({
            style: {
                base: {
                    fontSize: "15px",
                    color: "#424770",
                    letterSpacing: "0.025em",
                    fontFamily: "Source Code Pro, monospace",
                    "::placeholder": {
                        color: "#aab7c4",
                    },
                },
                invalid: {
                    color: "#9e2146",
                },
            },
        }),
        []
    );

    return options;
};

const EventBooking = () => {

    const { totalPayment } = useContext(Context)
    const [date, setDate] = useState(moment().format("YYYY-MM-DD hh:mm:ss"));
    const [eventInfo, setEventInfo] = useState(false);
    const [eventCardInfo, setEventCardInfo] = useState(false);
    const [show, setShow] = useState(false);
    const [pickUpLocation, setPickUpLocation] = useState({
        address: "",
        latitude: 0,
        longitude: 0,
    });
    const [addCard, setAddCard] = useState(false)
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
        noOfHours: 0,
    });

    const {
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            /* Define search scope here */
        },
        debounce: 300,
    });

    const ref = useOnclickOutside(() => {
        clearSuggestions();
    });

    const handleInputDrop = (e) => {
        setValue(e.target.value);
    };

    const handleSelectDrop =
        ({ description }) =>
            () => {
                setValue(description, false);
                clearSuggestions();

                getGeocode({ address: description })
                    .then((results) => getLatLng(results[0]))
                    .then(({ lat, lng }) => {
                        console.log("📍 Drop coordinates: ", { lat, lng });
                        setPickUpLocation({
                            address: description,
                            latitude: lat,
                            longitude: lng,
                        });
                    })
                    .catch((error) => {
                        console.log("😱 Error: ", error);
                    });
            };

    const renderSuggestionsDrop = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
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
            countryCode: `+${data.dialCode}`,
        });
    };

    const onPhoneAltNumberSignIn = (value, data) => {
        setEventBooking({
            ...eventBooking,
            altPhone: value.slice(data.dialCode.length),
            altCountryCode: `+${data.dialCode}`,
        });
    };

    const handleBack = () => {
        setEventInfo(true);
        setEventCardInfo(false);
        console.log(eventBooking)
    };

    const handleNext = () => {
        if (
            eventBooking.firstName === "" ||
            eventBooking.lastName === "" ||
            eventBooking.email === "" ||
            eventBooking.phone === "" ||
            eventBooking.driver === "" ||
            eventBooking.eventName === "" ||
            eventBooking.noOfHours === "" ||
            pickUpLocation.address === "" ||
            pickUpLocation.latitude === "" ||
            pickUpLocation.longitude === "" ||
            date === ""
        ) {
            toast.warn("Some fields are missing");
        } else {
            setEventInfo(false);
            setEventCardInfo(true);
        }
    };

    const handleConfirmBox = () => {
        setShow(true);
    };

    const BookRide = async () => {
        if (addCard === true) {
            toast.success(`Your event created successfully.`);
            setShow(false);
            window.location = "/eventbooking"
        } else {
            toast.warn(`Add Card`);
        }
    };

    useEffect(() => {
        setEventInfo(true);
    }, []);

    return (
        <section>
            {eventInfo && (
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
                                                <Label>First Name<span className='text-danger'>*</span></Label>
                                                <input
                                                    type="text"
                                                    id="fname"
                                                    value={eventBooking.firstName}
                                                    onChange={(e) => {
                                                        setEventBooking({
                                                            ...eventBooking,
                                                            firstName: e.target.value,
                                                        });
                                                    }}
                                                    placeholder="First name"
                                                    required
                                                />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="m-1">
                                                <Label>Last Name<span className='text-danger'>*</span></Label>
                                                <input
                                                    type="text"
                                                    id="lname"
                                                    value={eventBooking.lastName}
                                                    onChange={(e) => {
                                                        setEventBooking({
                                                            ...eventBooking,
                                                            lastName: e.target.value,
                                                        });
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
                                                <Label>Email<span className='text-danger'>*</span></Label>
                                                <input
                                                    type="text"
                                                    id="email"
                                                    value={eventBooking.email}
                                                    onChange={(e) => {
                                                        setEventBooking({
                                                            ...eventBooking,
                                                            email: e.target.value,
                                                        });
                                                    }}
                                                    placeholder="Email"
                                                    required
                                                />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div ref={ref} className="m-1">
                                                <Label>Location<span className='text-danger'>*</span></Label>
                                                <input
                                                    value={value}
                                                    onChange={handleInputDrop}
                                                    name="address"
                                                    placeholder="Enter drop location"
                                                />
                                                {status === "OK" && (
                                                    <div
                                                        className="location_suggestion_pickup"
                                                        style={{ zIndex: 1 }}
                                                    >
                                                        <ul>{renderSuggestionsDrop()}</ul>
                                                    </div>
                                                )}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6} className="phone_input">
                                            <div className="m-1">
                                                <Label>Phone No.<span className='text-danger'>*</span></Label>
                                                <PhoneInput
                                                    country={"us"}
                                                    onChange={onPhoneNumberSignIn}
                                                    value={`${eventBooking.countryCode}${eventBooking.phone}`}
                                                />
                                            </div>
                                        </Col>
                                        <Col md={6} className="phone_input">
                                            <div className="m-1">
                                                <Label>Alternative Phone No.</Label>
                                                <PhoneInput
                                                    country={"us"}
                                                    onChange={onPhoneAltNumberSignIn}
                                                    value={`${eventBooking.altCountryCode}${eventBooking.altPhone}`}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <div className="m-1">
                                                <Label>How many driver you want ?<span className='text-danger'>*</span></Label>
                                                <input
                                                    type="number"
                                                    id="adress"
                                                    value={eventBooking.driver}
                                                    onChange={(e) => {
                                                        setEventBooking({
                                                            ...eventBooking,
                                                            driver: e.target.value,
                                                        });
                                                    }}
                                                    placeholder="driver"
                                                    required
                                                />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="m-1 ">
                                                <Label>Date &amp; Time<span className='text-danger'>*</span></Label>
                                                <Flatpickr
                                                    data-enable-time
                                                    value={date}
                                                    onChange={(date) => setDate(date)}
                                                    placeholder="Date And Time"
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <div className="m-1">
                                                <Label>Event Name<span className='text-danger'>*</span></Label>
                                                <input
                                                    type="text"
                                                    id="adress"
                                                    value={eventBooking.eventName}
                                                    onChange={(e) => {
                                                        setEventBooking({
                                                            ...eventBooking,
                                                            eventName: e.target.value,
                                                        });
                                                    }}
                                                    placeholder="Event Name"
                                                    required
                                                />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="m-1">
                                                <Label>No of Hour<span className='text-danger'>*</span></Label>
                                                <input
                                                    type="number"
                                                    id="adress"
                                                    value={eventBooking.noOfHours}
                                                    onChange={(e) => {
                                                        setEventBooking({
                                                            ...eventBooking,
                                                            noOfHours: e.target.value,
                                                        });
                                                    }}
                                                    placeholder="No Of Hours"
                                                    required
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <div
                                        style={{ marginTop: 20 }}
                                        className="d-flex justify-content-between"
                                    >

                                        <button className="booking_next" onClick={handleNext}>
                                            next
                                            <FontAwesomeIcon icon={faArrowRight} />
                                        </button>

                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            )}

            {eventCardInfo && (
                <div className="container header_padd">
                    <div className="contact_block">
                        <Row>
                            <Col md="12">
                                <div className="contact_head">
                                    <h2>Payment Details</h2>
                                </div>
                            </Col>
                        </Row>
                        <div className="contact_form">
                            <Row >
                                <h6 style={{ margin: "0px 0px 20px 0px" }}>Credit card will not be charged until the request is confirmed.</h6>
                            </Row>
                            <div className="strip_add_card_event">
                                <Elements stripe={stripePromise} style={{ height: 400 }}>
                                    <EventCardForm eventBooking={eventBooking} pickUpLocation={pickUpLocation} date={date} setAddCard={setAddCard} />
                                </Elements>
                                <div style={{ marginTop: 20 }} className="d-flex">
                                    {[
                                        <button className="booking_back" onClick={handleBack}>
                                            back
                                            <FontAwesomeIcon icon={faArrowLeft} />
                                        </button>,
                                        <button
                                            className="booking_next ms-2"
                                            onClick={handleConfirmBox}
                                        >
                                            Book
                                            <FontAwesomeIcon icon={faArrowRight} />
                                        </button>,
                                    ]}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Modal
                isOpen={show}
                toggle={() => setShow(!show)}
                className="modal-dialog-centered modal-lg"
            >
                <ModalHeader>Create Event</ModalHeader>
                <ModalBody className="px-sm-5 mx-50 pb-4">
                    <h6 className="m-3">
                        Half of the total price is going to be deducted, {totalPayment / 2}$.
                    </h6>
                    <div style={{ marginTop: 20 }} className="d-flex">
                        <button className="event_btn ms-2" onClick={() => setShow(!show)}>
                            {" "}
                            Cancel
                        </button>

                        <button className="event_btn ms-2" onClick={BookRide}>
                            {" "}
                            Confirm
                        </button>

                    </div>
                </ModalBody>
            </Modal>
        </section>
    );
};

const EventCardForm = ({ eventBooking, pickUpLocation, date, setAddCard }) => {

    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();
    const [loading, setLoading] = useState(false)
    const { setTotalPayment, setEventId } = useContext(Context)

    const fetchTotalPayment = (id) => {
        const eventToken = localStorage.getItem("eventToken");
        const config = {
            headers: {
                Authorization: `${eventToken}`,
            },
        };
        let url = API + `getTotalAmount/${id}`;
        axios
            .post(url, config)
            .then((response) => {
                if (response.data.success === true) {
                    setTotalPayment(response.data.data);
                } else {
                }
            })
            .catch((err) => {
                console.log("error here", err);
            });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
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
            bookingDate: moment(date[0]).format("YYYY-MM-DD hh:mm:ss"),
            coDriver: eventBooking.driver,
            noOfHours: eventBooking.noOfHours,
        };
        console.log(body)
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        console.log(body);
        let url = API + `createEventBooking`;
        await axios
            .post(url, body, config)
            .then(async (response) => {
                if (response.data.success === true) {
                    console.log(response, "response");
                    setEventId(response.data.data._id);
                    localStorage.setItem("eventToken", response.data.data.token);
                    if (!stripe || !elements) {
                        return;
                    }
                    const payload = await stripe.createPaymentMethod({
                        type: "card",
                        card: elements.getElement(CardElement),
                    });
                    console.log("[PaymentMethod]", payload);
                    if (payload) {
                        let url = API + `addEventCard`;
                        const config = {
                            headers: {
                                Authorization: `${response.data.data.token}`,
                            },
                        };

                        console.log(payload, "payload");
                        const bodyy = {
                            stripePaymentMethod: payload.paymentMethod.id,
                        };
                        await axios
                            .post(url, bodyy, config)
                            .then((response) => {
                                console.log(response.data.data);
                                if (response.data.success === true) {
                                    toast.success(`Your card added successfully.`);
                                    toast.success(`Your event created successfully.`);
                                    setAddCard(true)
                                    setLoading(false)
                                } else {
                                    toast.dark(`Having some trouble to add card.`);
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
                    await fetchTotalPayment(response.data.data._id)
                } else {
                    toast.warn(response.data.message);
                }
            })
            .catch((err) => {
                console.log("error here", err);
            }).finally(() => {
                setLoading(false)
            })


    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Card details<span className='text-danger'>*</span>
                <Row>
                    <Col md="10" >
                        <CardElement
                            options={options}
                            onReady={() => {
                                console.log("CardElement [ready]");
                            }}
                            onChange={(event) => {
                                console.log("CardElement [change]", event);
                            }}
                            onBlur={() => {
                                console.log("CardElement [blur]");
                            }}
                            onFocus={() => {
                                console.log("CardElement [focus]");
                            }}
                        />
                    </Col>
                    <Col md="2" style={{ marginTop: 5 }}>
                        {
                            loading === true ? <button className="btn_event_brand">
                                <div class="spinner-border text-white" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </button> : <button type="submit" className="btn_event_brand">Add</button>
                        }

                    </Col>
                </Row>
            </label>
        </form>
    );
};

export default EventBooking;
