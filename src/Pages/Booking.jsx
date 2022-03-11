import React, { useContext, useEffect, useState } from 'react'
import {
    GoogleMap,
    withGoogleMap,
    withScriptjs,
    DirectionsRenderer,
    Marker
} from "react-google-maps";
import { withProps, compose, lifecycle } from "recompose";
import SelectLocation from '../Components/Booking/SelectLocation';
import logo from '../Images/Footer/logo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import SelectServices from '../Components/Booking/SelectServices';
import { Context } from '../Data/context';
import BookingDetail from '../Components/Booking/BookingDetail';
import API, { mapKey } from '../Config/api';
import axios from 'axios';
import PaymentDetail from '../Components/Booking/PaymentDetail';
import { toast } from 'react-toastify';
import useOnclickOutside from "react-cool-onclickoutside";
import AddVehicalPopup from '../Components/Popups/AddVehicalPopup'
import BookingLogin from '../Components/Booking/BookingLogin';
import BookingDriver from '../Components/Booking/BookingDriver';
import { Col, Row } from 'reactstrap';

const Booking = () => {

    const {
        userData,
        setIsAuthentication,
        isAuthentication,
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
        setBookingSignin,
        bookingSignin,
        setUserData,
        setToken,
        onSignUp,
        isBookingSignup,
        checkUserAccountStatus,
        setCheckPhone,
        setUserOtpView,
        isLoading,
        setIsLoading,
        setGuestUser,
        setGuestOtpId,
        UserOtpView,
        serviceView,
        setServiceView,
        loginCheck,
        setLoginCheck,
        stopLocation,
        stopLocationTwo,
        stopLocationThree,
        stopLocationFour,
        addStops
    } = useContext(Context)
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [createdBookingId, setCreatedBookingId] = useState('')
    //BOOKING LOCATION VIEW
    const [bookingView, setBookingView] = useState(true)
    //const [loginCheck, setLoginCheck] = useState(false)
    //const [serviceView, setServiceView] = useState(false)
    const [displayBookingDetail, setDisplayBookingDetail] = useState(false)
    const [paymentView, setPaymentView] = useState(false)
    const [bookingDriverView, setBookingDriverView] = useState(false)
    const [userCreateStatusBtn, setUserCreateStatusBtn] = useState(true)

    const authData = JSON.parse(localStorage.getItem("wingmen_booking"));

    const onOnlyLocationView = () => {
        setBookingView(true)
        setDisplayBookingDetail(false)
        setPaymentView(false)
        setBookingDriverView(false)
        setServiceView(false)
        setLoginCheck(false)
    }


    //MAP VIEW
    // const google = window.google

    const MapWithADirectionsRenderer = compose(
        withProps({
            googleMapURL:
                `https://maps.googleapis.com/maps/api/js?key=${mapKey}`,
            headers: {
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Methods": 'GET'
            },
            loadingElement: <div style={{ height: `100vh` }} />,
            containerElement: <div style={{ height: `100vh` }} />,
            mapElement: <div style={{ height: `100%` }} />
        }),
        withScriptjs,
        withGoogleMap,
        lifecycle({
            componentDidMount() {
                const DirectionsService = new window.google.maps.DirectionsService();
                DirectionsService.route(
                    (addStops === 1 && stopLocation.address.length > 0 && stopLocationTwo.address === "" && stopLocationThree.address === "" && stopLocationFour.address === "") ?
                        {
                            origin: new window.google.maps.LatLng(pickupLocation.latitude, pickupLocation.longitude),
                            destination: new window.google.maps.LatLng(dropLocation.latitude, dropLocation.longitude),
                            waypoints: [
                                {
                                    location: new window.google.maps.LatLng(stopLocation.latitude, stopLocation.longitude),
                                    stopover: true,
                                },

                            ],
                            optimizeWaypoints: true,
                            travelMode: window.google.maps.TravelMode.DRIVING
                        } : (addStops === 2 && stopLocation.address.length > 0 && stopLocationTwo.address.length > 0 && stopLocationThree.address === "" && stopLocationFour.address === "") ? {
                            origin: new window.google.maps.LatLng(pickupLocation.latitude, pickupLocation.longitude),
                            destination: new window.google.maps.LatLng(dropLocation.latitude, dropLocation.longitude),
                            waypoints: [
                                {
                                    location: new window.google.maps.LatLng(stopLocation.latitude, stopLocation.longitude),
                                    stopover: true,
                                },
                                {
                                    location: new window.google.maps.LatLng(stopLocationTwo.latitude, stopLocationTwo.longitude),
                                    stopover: true,
                                },
                            ],
                            optimizeWaypoints: true,
                            travelMode: window.google.maps.TravelMode.DRIVING
                        } : (addStops === 3 && stopLocation.address.length > 0 && stopLocationTwo.address.length > 0 && stopLocationThree.address.length > 0 && stopLocationFour.address === "") ? {
                            origin: new window.google.maps.LatLng(pickupLocation.latitude, pickupLocation.longitude),
                            destination: new window.google.maps.LatLng(dropLocation.latitude, dropLocation.longitude),
                            waypoints: [
                                {
                                    location: new window.google.maps.LatLng(stopLocation.latitude, stopLocation.longitude),
                                    stopover: true,
                                },
                                {
                                    location: new window.google.maps.LatLng(stopLocationTwo.latitude, stopLocationTwo.longitude),
                                    stopover: true,
                                },
                                {
                                    location: new window.google.maps.LatLng(stopLocationThree.latitude, stopLocationThree.longitude),
                                    stopover: true,
                                },

                            ],
                            optimizeWaypoints: true,
                            travelMode: window.google.maps.TravelMode.DRIVING
                        } : (addStops === 4 && stopLocation.address.length > 0 && stopLocationTwo.address.length > 0 && stopLocationThree.address.length > 0 && stopLocationFour.address.length > 0) ? {
                            origin: new window.google.maps.LatLng(pickupLocation.latitude, pickupLocation.longitude),
                            destination: new window.google.maps.LatLng(dropLocation.latitude, dropLocation.longitude),
                            waypoints: [
                                {
                                    location: new window.google.maps.LatLng(stopLocation.latitude, stopLocation.longitude),
                                    stopover: true,
                                },
                                {
                                    location: new window.google.maps.LatLng(stopLocationTwo.latitude, stopLocationTwo.longitude),
                                    stopover: true,
                                },
                                {
                                    location: new window.google.maps.LatLng(stopLocationThree.latitude, stopLocationThree.longitude),
                                    stopover: true,
                                },
                                {
                                    location: new window.google.maps.LatLng(stopLocationFour.latitude, stopLocationFour.longitude),
                                    stopover: true,
                                }

                            ],
                            optimizeWaypoints: true,
                            travelMode: window.google.maps.TravelMode.DRIVING
                        } :
                            {
                                origin: new window.google.maps.LatLng(pickupLocation.latitude, pickupLocation.longitude),
                                destination: new window.google.maps.LatLng(dropLocation.latitude, dropLocation.longitude),
                                travelMode: window.google.maps.TravelMode.DRIVING
                            },
                    (result, status) => {
                        if (status === window.google.maps.DirectionsStatus.OK) {
                            this.setState({
                                directions: result
                            });
                        } else {
                            console.error(`error fetching directions ${result}`);
                        }
                    }
                );
                window.google.maps.event.addDomListener(window, "load", MapWithADirectionsRenderer);
            }
        })
    )((props) => (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={new window.google.maps.LatLng(latitude, longitude)}
        >
            {props.isMarkerShown && <Marker google={window.google} position={{ lat: latitude, lng: longitude }} />}
            {props.directions && <DirectionsRenderer directions={props.directions} />}
        </GoogleMap>
    ));
    const ref = useOnclickOutside(() => {
        if (addVehical) {
            setAddVehical(false);
        }
    });

    //VIEW ALL COMPONENTS
    //VIEW SERVICES COMPONENT
    const onSelectService = () => {
        if (pickupLocation.latitude === 0) {
            toast.warning(`Please select pickup location.`)
        } else {
            if (dropLocation.latitude === 0) {
                toast.warning(`Please select drop location.`)
            } else {
                setBookingView(false)
                setLoginCheck(false)
                setServiceView(true)
            }
        }
    }
    //VIEW SIGNIN & SIGNUP COMPONENT
    const onSelectLogin = () => {
        setIsLoading(true)
        if (pickupLocation.latitude === 0) {
            toast.warning(`Please select pickup location.`)
            setIsLoading(false)
        } else {
            if (dropLocation.latitude === 0) {
                toast.warning(`Please select drop location.`)
                setIsLoading(false)
            } else {
                setBookingView(false)
                setLoginCheck(true)
                setIsLoading(false)
            }
        }
    }

    //SIGNIN USER AND PASS TO OTHER COMPONENT
    const onSignin = () => {
        setIsLoading(true)
        //APIS ROUTES
        let signIn = API + `signIn`;
        let signUp = API + `signUp`;
        let checkGuestUser = API + `checkGuestUser`;
        //CREATE BODY FOR APIS
        const body = {
            "deviceType": "web",
            "password": bookingSignin.loginPassword,
            "phone": bookingSignin.loginId,
            "countryCode": bookingSignin.loginCountryCode
        }
        const otpBody = {
            "countryCode": bookingSignin.loginCountryCode,
            "phone": bookingSignin.loginId,
            "type": "web",
        }
        const guestOtpBody = {
            "countryCode": bookingSignin.loginCountryCode,
            "phone": bookingSignin.loginId,
            "type": "web",
        }
        const guestBody = {
            "phone": bookingSignin.loginId
        }
        console.log(guestBody)
        //CHECK SIGNN || SIGNUP CONDITION
        if (checkUserAccountStatus) {
            //IF USER REGISTER THEN SIGNIN
            axios
                .post(signIn, body)
                .then(response => {
                    if (response.data.success === true) {
                        toast.dark('Login done')
                        localStorage.setItem(
                            "wingmen_booking",
                            JSON.stringify(response.data.data)
                        );
                        setUserData(response.data.data)
                        setToken(response.data.data.token)
                        setCheckPhone(false)
                        onSelectService()
                    } else if (response.data.message === 'User does not exist.' || response.data.success === false) {
                        toast.dark(`User doesn't exist in our database you might enter wrong email.`)
                        setIsLoading(false)
                    } else if (response.data.message === 'Password is invalid.' || response.data.success === false) {
                        toast.dark(`You have entered wrong password.`)
                        setIsLoading(false)
                    }
                })
                .catch(err => {
                    console.log("error here", err.response)
                    setIsLoading(false)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        } else {
            //IF USER IS NOT REGISTER THEN SINGUP
            if (bookingSignin.loginPassword === '' || bookingSignin.loginId === '') {
                toast.dark('Please fill phone number and password to login.')
                setIsLoading(false)
            } else {
                //CHECK USER IF REGISTER
                axios
                    .post(checkGuestUser, guestBody)
                    .then((response) => {
                        console.log(response, 'guestUser');
                        // CHECK IF USER IS GUEST USER
                        if (response.data.status === 1) {
                            let url = API + `sendOtp`;
                            //SEND OTP TO USER PHONE NUMBER
                            axios
                                .post(url, guestOtpBody)
                                .then((response) => {
                                    if (response.data.success === true) {
                                        setGuestOtpId(response.data.data.otpId)
                                        setGuestUser(true)
                                        setUserOtpView(true)
                                    } else {
                                        toast.warn(response.data.message)
                                        setIsLoading(false)
                                    }
                                })
                                .catch((err) => {
                                    console.log("error here", err);
                                })
                            //setCheckUserAccountStatus(true)
                        } else if (response.data.status === 0) {
                            //USER IS NOT REGISTER SEND HIM OTP FOR REGISTERING
                            axios
                                .post(signUp, otpBody)
                                .then((response) => {
                                    if (response.data.success === true) {
                                        setBookingSignin({ loginOtpId: response.data.data.otpId })
                                        setCheckPhone(false)
                                        setUserOtpView(true)
                                        setUserCreateStatusBtn(false)
                                        setBookingView(false)
                                    } else {
                                        toast.warn(response.data.message)
                                        setIsLoading(false)
                                    }
                                })
                                .catch((err) => {
                                    console.log("error here", err);
                                })
                                .finally(() => {
                                    setIsLoading(false)
                                })
                        }
                    })
                    .catch(err => {
                        console.log("error here", err.response)
                    })
                    .finally(() => {
                        setIsLoading(false)
                    })
            }
        }
    }



    //BACK TO PICKUP, DROP LOCATION SELECT
    const onBackLocation = () => {
        setBookingView(true)
        setServiceView(false)
        setLoginCheck(false)
    }
    //VIEW BOOKING DETAILS COMPONENT
    const onBookingDetail = () => {
        setIsLoading(true)
        if (selectedServiceType.id === undefined || null || '') {
            toast.warning(`Please select service type.`)
            setIsLoading(false)
        } else {
            if (selectedVehical._id === undefined || null || '') {
                toast.warning(`Please select your vehical type.`)
                setIsLoading(false)
            } else {
                if (triType === '') {
                    toast.warning(`Please select your trip type.`)
                    setIsLoading(false)
                } else {
                    setServiceView(false)
                    setDisplayBookingDetail(true)
                    setIsLoading(false)
                }
            }
        }
    }
    //BACK TO SERVICE VIEW PAGE
    const onBackServices = () => {
        setServiceView(true)
        setDisplayBookingDetail(false)
    }
    //VIEW PAYMENT COMPONENT
    const onPayment = () => {
        setIsLoading(true)
        setPaymentView(true)
        setDisplayBookingDetail(false)
        setIsLoading(false)
    }
    //BACK TO BOOKING DETAILS
    const onBackBookingDetail = () => {
        setDisplayBookingDetail(true)
        setPaymentView(false)
    }
    //VIEW ALL COMPONENTS END

    //API FOR CREATE BOOKING RIDE
    const onBookingRide = () => {
        setIsLoading(true)
        if (paymentType === '') {
            toast.warning(`Please select payment type.`)
        } else {
            const body = {
                bookingDate: new Date(),
                dropUpAddressFirst: stopLocation.address,
                dropUpAddressSecond: stopLocationTwo.address,
                dropUpAddressThird: stopLocationThree.address,
                dropUpAddressFour: stopLocationFour.address,
                dropUpAddress: dropLocation.address,
                dropUplatitude: dropLocation.latitude,
                dropUplatitudeFirst: stopLocation.latitude,
                dropUplatitudeFour: stopLocationFour.latitude,
                dropUplatitudeSecond: stopLocationTwo.latitude,
                dropUplatitudeThird: stopLocationThree.latitude,
                dropUplongitude: dropLocation.longitude,
                dropUplongitudeFirst: stopLocation.longitude,
                dropUplongitudeFour: stopLocationFour.longitude,
                dropUplongitudeSecond: stopLocationTwo.longitude,
                dropUplongitudeThird: stopLocationThree.longitude,
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
                        toast.dark(`Your ride create successfully.`)
                        setCreatedBookingId(response.data.data._id)
                        setDisplayBookingDetail(false)
                        setPaymentView(false)
                        setBookingDriverView(true)
                        let url = API + `generateOtpForRide`;
                        const config = {
                            headers: {
                                Authorization: `${userData.token}`,
                            }
                        };
                        const body = {
                            "phoneNo": userData.phone,
                            "countryCode": userData.countryCode
                        }
                        axios
                            .post(url, body, config)
                            .then((response) => {
                                console.log(response, 'createBooking');
                                if (response.data.success === true) {
                                    toast.success(`Your ride is in the way. A wingmen code is send on your register number user for ride.`)
                                } else {
                                    toast.warn(response.data.message)
                                }
                            })
                            .catch((err) => {
                                console.log("error here", err);
                            })
                            .finally(() => {
                                setIsLoading(false)
                            })
                    } else {
                        toast.warn(response.data.message)
                    }
                })
                .catch((err) => {
                    console.log("error here", err);
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }

    const onLogout = () => {
        localStorage.removeItem("wingmen_booking")
        window.location = "/"
    }

    //FOR FETCHING FUNCTION AND GETING LAT LNG FROM GEOCODE
    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem("wingmen_booking"));
        console.log(authData)
        if (authData) {
            setBookingView(true)
            setIsAuthentication(true)
            setServiceView(false)
        }
        navigator.geolocation.getCurrentPosition(function (position) {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        });

        if (isBookingSignup === true) {
            // onSelectService()
            onOnlyLocationView()
        }
    }, [isBookingSignup])


    return (
        <section>
            {/* ADD VEHICLE POPUP */}
            {addVehical && (
                <div className="popup_open" style={{ height: "fit-content" }} ref={ref}>
                    <AddVehicalPopup />
                </div>
            )}
            <div className="booking_ride">
                <Row>
                    <Col md="6" xs="6">
                        <div className="booking_header">
                            <a href="https://mywngmn.com/"><img src={logo} alt="" /></a>
                        </div>
                    </Col>
                    <Col md="6" xs="6">
                        {
                            authData ?
                                <button className="logout_btn" onClick={() => onLogout()}>Log out</button> : null
                        }
                    </Col>
                </Row>

                {/* PICKUP, DROP LOCATION SELECT */}
                {bookingView &&
                    <div className="select_location">
                        <SelectLocation />
                        <div className="booking_proced">
                            {isAuthentication ?
                                (isLoading === true ? <button className="booking_next">
                                    <div class="spinner-border text-white" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </button> : <button className="booking_next" onClick={() => onSelectService()}>
                                    next
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </button>)

                                : (isLoading === true ? <button className="booking_next">
                                    <div class="spinner-border text-white" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </button> : <button className="booking_next" onClick={() => onSelectLogin()}>
                                    next
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </button>)
                            }
                        </div>
                    </div>
                }
                {/* SIGNIN, SIGNUP IS USSER NOT LOGIN */}
                {loginCheck &&
                    <div className='select_login'>
                        <BookingLogin />
                        {onSignUp &&
                            <div className="booking_proced">
                                {userCreateStatusBtn &&
                                    //     guestUser ? <div>
                                    //     <div className="signup_form_otp">
                                    //         <OtpInput
                                    //             value={opt}
                                    //             onChange={(e) => setOpt(e)}
                                    //             numInputs={6}
                                    //             separator={<span> - </span>}
                                    //         />
                                    //     </div>
                                    //     <div className="login_forget float-end">
                                    //         {
                                    //             isLoading === true ? <button className="booking_next">
                                    //                 <div class="spinner-border text-white" role="status">
                                    //                     <span class="visually-hidden">Loading...</span>
                                    //                 </div>
                                    //             </button> : <button className="btn_brand" onClick={() => onRegister()}>Verified Otp</button>
                                    //         }
                                    //     </div>
                                    // </div> :
                                    //     // UserOtpView === true ? null :
                                    //     <div>
                                    //         {guestUser ? null 
                                    //             :
                                    <div className='d-flex justify-content-between w-100'>
                                        {
                                            UserOtpView === true ? null : [<button className="booking_back" onClick={() => onBackLocation()}>
                                                back
                                                <FontAwesomeIcon icon={faArrowLeft} />
                                            </button>,
                                            isLoading === true ? <button className="booking_next">
                                                <div class="spinner-border text-white" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div>
                                            </button> : <button className="booking_next" onClick={() => onSignin()}>
                                                next
                                                <FontAwesomeIcon icon={faArrowRight} />
                                            </button>]
                                        }
                                    </div>
                                    //     }
                                    // </div>
                                }
                            </div>
                        }
                    </div>
                }
                {/* SERVICE TYPES */}
                {serviceView &&
                    <div className="select_services">
                        <SelectServices />
                        <div className="booking_proced">
                            <button className="booking_back" onClick={() => onBackLocation()}>
                                back
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                            {
                                isLoading === true ? <button className="booking_next">
                                    <div class="spinner-border text-white" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </button> : <button className="booking_next" onClick={() => onBookingDetail()}>
                                    next
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </button>
                            }
                        </div>
                    </div>
                }
                {/* BOOKING DETAILS */}
                {displayBookingDetail &&
                    <div className="booking_detail">
                        <BookingDetail />
                        <div className="booking_proced">
                            <button className="booking_back" onClick={() => onBackServices()}>
                                back
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                            {
                                isLoading === true ? <button className="booking_next">
                                    <div class="spinner-border text-white" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </button> : <button className="booking_next" onClick={() => onPayment()}>
                                    next
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </button>
                            }

                        </div>
                    </div>
                }
                {/* PAYMENT SELECT & ADD */}
                {paymentView &&
                    <div className="payment_detail">
                        <PaymentDetail />
                        <div className="booking_proced">
                            <button className="booking_back" onClick={() => onBackBookingDetail()}>
                                back
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                            {
                                isLoading === true ? <button className="booking_next">
                                    <div class="spinner-border text-white" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </button> : <button className="booking_next" onClick={() => onBookingRide()}>
                                    book ride
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </button>
                            }

                        </div>
                    </div>
                }
                {bookingDriverView &&
                    <div className='booking_driver'>
                        <BookingDriver createdBookingId={createdBookingId} />
                    </div>
                }
            </div>
            {/* MAP */}
            <MapWithADirectionsRenderer isMarkerShown />
        </section>
    )
}

export default Booking
