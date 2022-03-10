import React, { useEffect, useState } from 'react'
import Geocode from "react-geocode";
//PHONE INPUT
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
//OTP INPUT
import OtpInput from 'react-otp-input';
import axios from 'axios';
import API, { mapKey } from '../../Config/api';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { Context } from '../../Data/context';
import { Col, Row } from 'reactstrap';


const BookingLogin = () => {

    const {
        setToken,
        setUserData,
        bookingSignin,
        setBookingSignin,
        setIsBookingSignup,
        checkUserAccountStatus,
        checkPhone,
        UserOtpView,
        setUserOtpView,
        isLoading,
        setIsLoading,
        guestUser,
        guestOtpId,
        setCheckPhone,
        setLoginCheck,
        setServiceView,
        setGuestOtpId
    } = useContext(Context)

    //USER REGIS 
    const [phoneNumber, setPhoneNumber] = useState('')
    const [countryCode, setCountryCode] = useState('')
    const [opt, setOpt] = useState('')
    //COMPONENT VIEW
    const [userProfileView, setUserProfileView] = useState(false)
    //USER PROFILE DATA
    const [fname, setFname] = useState('')
    const [lName, setLName] = useState('')
    const [email, setEmail] = useState('')
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [address, setAddress] = useState('')

    //TAKE PHONENUMBER & COUNTRYCODE
    const onPhoneNumberSignIn = (value, data) => {
        setBookingSignin({
            loginCountryCode: `+${data.dialCode}`,
            loginId: value.slice(data.dialCode.length)
        });
        setPhoneNumber(value.slice(data.dialCode.length));
        setCountryCode(`+${data.dialCode}`);
    }

    //API FOR USER OTP VERIFICATION
    const onRegister = () => {
        const body = {
            otp: opt,
            otpId: bookingSignin.loginOtpId
        }
        let url = API + `verifyOtp`;
        axios
            .post(url, body)
            .then((response) => {
                console.log(response, 'verifyOtp');
                if (response.data.success === true) {
                    console.log(response, 'verifyOtp');
                    setUserProfileView(true)
                    setUserOtpView(false)
                } else {
                    toast.warn(response.data.message)
                }
            })
            .catch((err) => {
                console.log("error here", err);
            });
    }

    //API FOR USER PROFILE DETAIL SAVE
    const onUserData = () => {
        setIsLoading(true)
        const body = {
            image: '',
            firstName: fname,
            lastName: lName,
            email: email,
            password: 'wingmenrandompassword',
            phone: parseInt(phoneNumber, 0),
            countryCode: countryCode,
            latitude: latitude,
            longitude: longitude,
            address: address,
            gender: 'MALE',
            genderType: 'MALE',
            singUpType: "mobile",
            deviceType: "web",
            guestUser: true
        }
        console.log(body, "user body");
        let url = API + `complete`;
        axios
            .post(url, body)
            .then((response) => {
                console.log(response, 'complete');
                if (response.data.success === true) {
                    console.log(response, 'complete');
                    toast.dark('Login done')
                    //SAVE USER DATA IN LOCALSTORAGE
                    localStorage.setItem(
                        "wingmen_booking",
                        JSON.stringify(response.data.data)
                    );
                    setUserData(response.data.data)
                    setToken(response.data.data.token)
                    setIsBookingSignup(true)
                } else {
                    toast.warn(response.data.message)
                    setIsLoading(false)
                }
            })
            .catch((err) => {
                console.log("error here", err);
                setIsLoading(false)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const onGuestRegister = () => {
        setIsLoading(true)
        const body = {
            otp: opt,
            otpId: guestOtpId
        }
        console.log(body)
        let url = API + `verifyOtp`;
        axios
            .post(url, body)
            .then((response) => {
                console.log(response, 'verifyOtp');
                if (response.data.success === true) {
                    console.log(response, 'verifyOtp');
                    const body2 = {
                        "deviceType": "web",
                        "password": 'wingmenrandompassword',
                        "phone": bookingSignin.loginId,
                        "countryCode": bookingSignin.loginCountryCode
                    }
                    console.log(body2);
                    let url = API + `signIn`;
                    axios
                        .post(url, body2)
                        .then((response) => {
                            console.log(response, 'signin');
                            if (response.data.success === true) {
                                console.log(response, 'signin');
                                toast.dark('Login done')
                                //SAVE USER DATA IN LOCALSTORAGE
                                localStorage.setItem(
                                    "wingmen_booking",
                                    JSON.stringify(response.data.data)
                                );
                                setUserData(response.data.data)
                                setToken(response.data.data.token)
                                setCheckPhone(false)
                                setUserOtpView(false)
                                setServiceView(true)
                                // setUserCreateStatusBtn(false)
                                setLoginCheck(false)
                            } else {
                                toast.warn(response.data.message)
                                setIsLoading(false)
                            }
                        })
                        .catch((err) => {
                            console.log("error here", err);
                            setIsLoading(false)
                        })
                } else {
                    toast.warn(response.data.message)
                    setIsLoading(false)
                }
            })
            .catch((err) => {
                console.log("error here", err);
                setIsLoading(false)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const resendQuestCode = () => {
        let url = API + `sendOtp`;
        //SEND OTP TO USER PHONE NUMBER
        const otpBody = {
            "countryCode": bookingSignin.loginCountryCode,
            "phone": bookingSignin.loginId,
            "type": "web",
        }
        axios
            .post(url, otpBody)
            .then((response) => {
                if (response.data.success === true) {
                    setGuestOtpId(response.data.data.otpId)
                    toast.success("Successfully resend wingmen code")
                } else {
                    toast.warn(response.data.message)
                    setIsLoading(false)
                }
            })
            .catch((err) => {
                console.log("error here", err);
            })
    }

    const resendCode = () => {
        let signUp = API + `signUp`;

        const otpBody = {
            "countryCode": countryCode,
            "phone": phoneNumber,
            "type": "web",
        }
        axios
            .post(signUp, otpBody)
            .then((response) => {
                if (response.data.success === true) {
                    setBookingSignin({ loginOtpId: response.data.data.otpId })
                    toast.success("Successfully resend wingmen code")
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
    //FOR FETCHING CALLBACK AND GETING LAT LNG FROM GEOCODE
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
            //GETING ADDRESS FROM LAT & LNG
            Geocode.setApiKey(mapKey);
            Geocode.enableDebug();
            Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                response => {
                    const address = response.results[0].formatted_address;
                    setAddress(address);
                },
                error => {
                    console.error(error);
                }
            );
        });
    }, [])


    return (
        <div className='booking_login'>
            <h2>Get Moving With <span>Wingmen</span></h2>
            {checkPhone &&
                <div className="login_form">
                    <PhoneInput
                        // country={'in'}
                        country={'us'}
                        onChange={onPhoneNumberSignIn}
                    />
                    {checkUserAccountStatus &&
                        <input
                            className='mt-4'
                            type="password"
                            name="pass"
                            id="pass"
                            placeholder="Password"
                            value={bookingSignin.loginPassword}
                            onChange={(e) => {
                                setBookingSignin({
                                    ...bookingSignin,
                                    loginPassword: e.target.value,
                                });
                            }}
                        />
                    }
                </div>
            }
            {UserOtpView &&
                <div>
                    <div className="signup_form_otp">
                        <OtpInput
                            value={opt}
                            onChange={(e) => setOpt(e)}
                            numInputs={6}
                            separator={<span> - </span>}
                        />
                    </div>
                    {
                        guestUser === true ?
                            <div className="login_forget ">
                                <Row style={{ justifyContent: "space-between" }}>
                                    <Col md="6" xs="6">
                                        <button className="btn_verify_brand" onClick={() => resendQuestCode()}>Resend Wingmen Code</button>
                                    </Col>
                                    <Col md="6" xs="6">
                                        <button className="btn_verify_brand" onClick={() => onGuestRegister()}>Verify Wingmen Code</button>
                                    </Col>
                                </Row>
                            </div> :
                            <div className="login_forget ">
                                <Row style={{ justifyContent: "space-between" }}>
                                    <Col md="6" xs="6">
                                        <button className="btn_verify_brand" onClick={() => resendCode()}>Resend Wingmen Code</button>
                                    </Col>
                                    <Col md="6" xs="6">
                                        <button className="btn_verify_brand" onClick={() => onRegister()}>Verify Wingmen Code</button>
                                    </Col>
                                </Row>
                            </div>
                    }
                </div>
            }
            {userProfileView &&
                <div className="user_date signup_user_detail">
                    <div className="user_input mb-0">
                        <label htmlFor="fname">First Name:</label>
                        <input
                            type="text"
                            name="fname"
                            id="fname"
                            placeholder="First Name"
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                        />
                    </div>
                    <div className="user_input mb-0">
                        <label htmlFor="lname">Last Name:</label>
                        <input
                            type="text"
                            name="lname"
                            id="lname"
                            placeholder="Last Name"
                            value={lName}
                            onChange={(e) => setLName(e.target.value)}
                        />
                    </div>
                    <div className="user_input mb-0">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="login_forget float-end mt-4">
                        {
                            isLoading === true ? <button className="btn_brand">
                                <div class="spinner-border text-white" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </button> :
                                <button
                                    className="btn_brand"
                                    onClick={() => onUserData()}
                                >
                                    next
                                </button>

                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default BookingLogin
