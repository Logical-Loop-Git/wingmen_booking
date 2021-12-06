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
import useOnclickOutside from "react-cool-onclickoutside";
import AddVehicalPopup from '../Components/Popups/AddVehicalPopup'

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
        promoCode,
        bookingNote,
        addVehical,
        setAddVehical,
        addVehicalStatus
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

    //MAP VIEW
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

    const ref = useOnclickOutside(() => {
        if (addVehical) {
            setAddVehical(false);
        }
    });

    //VIEW ALL COMPONENTS
    const onSelectService = () => {
        if (pickupLocation.latitude === 0) {
            toast.warning(`Pleace select pickup location.`)
        } else {
            if (dropLocation.latitude === 0) {
                toast.warning(`Pleace select drop location.`)
            } else {
                setBookingView(false)
                setServiceView(true)
            }
        }
    }

    const onBackLocation = () => {
        setBookingView(true)
        setServiceView(false)
    }

    const onBookingDetail = () => {
        if (selectedServiceType.id === undefined || null || '') {
            toast.warning(`Please select service type.`)
        } else {
            if (selectedVehical._id === undefined || null || '') {
                toast.warning(`Please select your vehical type.`)
            } else {
                if (triType === '') {
                    toast.warning(`Please select your trip type.`)
                } else {
                    setServiceView(false)
                    setDisplayBookingDetail(true)
                }
            }
        }
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
    //VIEW ALL COMPONENTS END

    //API CALL FOR BOOKING RELATED
    const fetchServiceType = useCallback(() => {
        const authData = JSON.parse(localStorage.getItem("wingmen_booking"));
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

    //API CALL FOR USER VEHICAL
    const fetchVehical = useCallback(() => {
        const authData = JSON.parse(localStorage.getItem("wingmen_booking"));
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

    //API FOR CREATE BOOKING RIDE
    const onBookingRide = () => {
        if (paymentType === '' || paymentType === 'CARD') {
            toast.warning(`Please select payment type.`)
        } else {
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
                note: bookingNote,
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
                    } else {
                        toast.warn(response.data.message)
                    }
                })
                .catch((err) => {
                    console.log("error here", err);
                });
        }
    }

    useEffect(() => {
        fetchServiceType()
        fetchVehical()
        navigator.geolocation.getCurrentPosition(function (position) {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        });
        if (addVehicalStatus) {
            fetchServiceType()
            fetchVehical()
        }
    }, [addVehicalStatus])


    return (
        <section>
            {addVehical && (
                <div className="popup_open" style={{ height: "fit-content" }} ref={ref}>
                    <AddVehicalPopup />
                </div>
            )}
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
