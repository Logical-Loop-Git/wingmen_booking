import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
    GoogleMap,
    withGoogleMap,
    withScriptjs,
    DirectionsRenderer
} from "react-google-maps";
import { withProps, compose, lifecycle } from "recompose";
import SelectLocation from '../Components/Booking/SelectLocation';
import logo from '../Images/Footer/logo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import SelectServices from '../Components/Booking/SelectServices';
import { Context } from '../Data/context';
import BookingDetail from '../Components/Booking/BookingDetail';
import API from '../Config/api';
import axios from 'axios';
import PaymentDetail from '../Components/Booking/PaymentDetail';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';


const Booking = () => {

    const {
        userData,
        pickupLocation,
        dropLocation,
        selectedServiceType,
        triType,
        selectedVehical,
        distance,
        estimateTime,
        paymentType,
        selectedCard,
        promoCode
    } = useContext(Context)
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    //BOOKING LOCATION VIEW
    const [bookingView, setBookingView] = useState(true)
    const [serviceView, setServiceView] = useState(false)
    const [displayBookingDetail, setDisplayBookingDetail] = useState(false)
    const [paymentView, setPaymentView] = useState(false)
    //BOOKING RELATED DATA
    const [serviceType, setServiceType] = useState([])
    const [userVehical, setUserVehical] = useState([])
    const google = window.google

    const MapWithADirectionsRenderer = compose(
        withProps({
            googleMapURL:
                "https://maps.googleapis.com/maps/api/js?key=AIzaSyBPnDatU8GFmaTp3-rfJAKmjLS6bPMEjrY",
            loadingElement: <div style={{ height: `100vh` }} />,
            containerElement: <div style={{ height: `100vh` }} />,
            mapElement: <div style={{ height: `100%` }} />
        }),
        withScriptjs,
        withGoogleMap,
        lifecycle({
            componentDidMount() {
                const DirectionsService = new google.maps.DirectionsService();

                DirectionsService.route(
                    {
                        origin: new google.maps.LatLng(pickupLocation.latitude, pickupLocation.longitude),
                        destination: new google.maps.LatLng(dropLocation.latitude, dropLocation.longitude),
                        travelMode: google.maps.TravelMode.DRIVING
                    },
                    (result, status) => {
                        if (status === google.maps.DirectionsStatus.OK) {
                            this.setState({
                                directions: result
                            });
                        } else {
                            console.error(`error fetching directions ${result}`);
                        }
                    }
                );
            }
        })
    )((props) => (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={new google.maps.LatLng(latitude, longitude)}
        >
            {props.directions && <DirectionsRenderer directions={props.directions} />}
        </GoogleMap>
    ));


    const onSelectService = () => {
        setBookingView(false)
        setServiceView(true)
    }

    const onBackLocation = () => {
        setBookingView(true)
        setServiceView(false)
    }

    const onBookingDetail = () => {
        setServiceView(false)
        setDisplayBookingDetail(true)
    }

    const onBackServices = () => {
        setServiceView(true)
        setDisplayBookingDetail(false)
    }

    const onPayment = () => {
        setPaymentView(true)
        setDisplayBookingDetail(false)
    }

    const onBackBookingDetail = () => {
        setDisplayBookingDetail(true)
        setPaymentView(false)
    }

    //API CALL FOR BOOKING RELATED
    const fetchServiceType = useCallback(() => {
        const authData = JSON.parse(localStorage.getItem("wingmen_booking"));
        // car getServiceType List
        let url = API + `getServiceType`;
        const config = {
            headers: {
                Authorization: `${authData.token}`,
            }
        };
        axios
            .get(url, config)
            .then((response) => {
                if (response.data.success === true) {
                    setServiceType(response.data.data)
                }
            })
            .catch((err) => {
                console.log("error here", err);
            });
    }, []);

    const fetchVehical = useCallback(() => {
        const authData = JSON.parse(localStorage.getItem("wingmen_booking"));
        // car getVehicles List
        let url = API + `getVehicles`;
        const config = {
            headers: {
                Authorization: `${authData.token}`,
            }
        };
        axios
            .get(url, config)
            .then((response) => {
                if (response.data.success === true) {
                    setUserVehical(response.data.data)
                }
            })
            .catch((err) => {
                console.log("error here", err);
            });
    }, []);

    //CREATE BOOKING API
    const onBookingRide = () => {
        const body = {
            bookingDate: new Date(),
            dropUpAddress: dropLocation.address,
            dropUplatitude: dropLocation.latitude,
            dropUplatitudeFirst: 0,
            dropUplatitudeFour: 0,
            dropUplatitudeSecond: 0,
            dropUplatitudeThird: 0,
            dropUplongitude: dropLocation.longitude,
            dropUplongitudeFirst: 0,
            dropUplongitudeFour: 0,
            dropUplongitudeSecond: 0,
            dropUplongitudeThird: 0,
            eta: estimateTime,
            genderType: "MALE",
            isSheduledBooking: false,
            isTripAllocated: true,
            note: "",
            passengerNo: 0,
            paymentMode: paymentType,
            pickUpAddress: pickupLocation.address,
            pickUplatitude: pickupLocation.latitude,
            pickUplongitude: pickupLocation.longitude,
            seviceTypeId: selectedServiceType._id,
            timezone: 330,
            totalDistance: distance * 1000,
            tripType: triType,
            vehicleId: selectedVehical._id,
            cardId: selectedCard,
            promoCode: promoCode
        }
        console.log(body, '__________CREATE BOOKING__________');
        let url = API + `createBooking`;
        const config = {
            headers: {
                Authorization: `${userData.token}`,
            }
        };
        axios
            .post(url, body, config)
            .then((response) => {
                console.log(response, 'createBooking');
                if (response.data.success === true) {
                    console.log(response, 'createBooking');
                    // setBookingCheck(response.data.data)
                    toast.dark(`Your ride create successfully.`)
                }
            })
            .catch((err) => {
                console.log("error here", err);
            });
    }

    useEffect(() => {
        fetchServiceType()
        fetchVehical()
        navigator.geolocation.getCurrentPosition(function (position) {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        });
    }, [])


    return (
        <section>
            <div className="booking_ride">
                <div className="booking_header">
                    <NavLink to="/">
                        <img src={logo} alt="" />
                    </NavLink>
                </div>
                {bookingView &&
                    <div className="select_location">
                        <SelectLocation />
                        <div className="booking_proced">
                            <button className="booking_next" onClick={() => onSelectService()}>
                                next
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </div>
                    </div>
                }
                {serviceView &&
                    <div className="select_services">
                        <SelectServices
                            serviceType={serviceType}
                            userVehical={userVehical}
                        />
                        <div className="booking_proced">
                            <button className="booking_back" onClick={() => onBackLocation()}>
                                back
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                            <button className="booking_next" onClick={() => onBookingDetail()}>
                                next
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </div>
                    </div>
                }
                {displayBookingDetail &&
                    <div className="booking_detail">
                        <BookingDetail />
                        <div className="booking_proced">
                            <button className="booking_back" onClick={() => onBackServices()}>
                                back
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                            <button className="booking_next" onClick={() => onPayment()}>
                                next
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </div>
                    </div>
                }
                {paymentView &&
                    <div className="payment_detail">
                        <PaymentDetail />
                        <div className="booking_proced">
                            <button className="booking_back" onClick={() => onBackBookingDetail()}>
                                back
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                            <button className="booking_next" onClick={() => onBookingRide()}>
                                book ride
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </div>
                    </div>
                }
            </div>
            <MapWithADirectionsRenderer />
        </section>
    )
}

export default Booking
