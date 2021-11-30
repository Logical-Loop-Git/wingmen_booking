import React, { useContext, useEffect, useState } from 'react'
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

const Booking = () => {

    const { pickupLocation, dropLocation } = useContext(Context)
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    //BOOKING LOCATION VIEW
    const [bookingView, setBookingView] = useState(true)
    const [serviceView, setServiceView] = useState(false)
    const [displayBookingDetail, setDisplayBookingDetail] = useState(false)
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

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        });
    }, [])


    return (
        <section>
            <div className="booking_ride">
                <div className="booking_header">
                    <img src={logo} alt="" />
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
                        <SelectServices />
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
                            <button className="booking_next">
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
