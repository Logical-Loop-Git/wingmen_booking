import React, { useContext, useEffect, useState } from 'react'
import Footer from '../Components/Footer'
import NavBar from '../Components/Header/NavBar'
import API, { mapKey } from '../Config/api'
import axios from 'axios';
import { toast } from "react-toastify";
import { useHistory } from 'react-router'
import { Context } from '../Data/context'
import Geocode from "react-geocode";
//PHONE INPUT
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
//OTP INPUT
import OtpInput from 'react-otp-input';
//IMAGES
import logo from '../Images/Footer/logo.png'


const Signup = () => {

    const history = useHistory()
    const { setToken, setUserData, isLoading, setIsLoading } = useContext(Context)
    //USER REGIS 
    const [phoneNumber, setPhoneNumber] = useState('')
    const [countryCode, setCountryCode] = useState('')
    const [opt, setOpt] = useState('')
    const [otpId, setOtpId] = useState('')
    //COMPONENT VIEW
    const [checkPhone, setCheckPhone] = useState(true)
    const [UserOtpView, setUserOtpView] = useState(false)
    const [userProfileView, setUserProfileView] = useState(false)
    //USER PROFILE DATA
    const [fname, setFname] = useState('')
    const [lName, setLName] = useState('')
    const [gender, setGender] = useState('MALE')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [address, setAddress] = useState('')

    //ON SIGNIN PAGE
    const onSignIn = () => {
        history.push(`/login`)
    }

    //BACK TO PHONE NUMBER
    const onBackPhone = () => {
        setCheckPhone(true)
    }

    //TAKE PHONENUMBER & COUNTRYCODE
    const onPhoneNumber = (value, data) => {
        setCountryCode(`+${data.dialCode}`);
        setPhoneNumber(value.slice(data.dialCode.length));
    }

    //API CALL FOR USER REGISTER
    const onSubmit = () => {
        setIsLoading(true)
        const body = {
            countryCode: countryCode,
            phone: phoneNumber,
            type: "mobile",
        }
        let url = API + `signUp`;
        axios
            .post(url, body)
            .then((response) => {
                console.log(response, 'signUp');
                if (response.data.success === true) {
                    console.log(response, 'signUp');
                    setOtpId(response.data.data.otpId)
                    setCheckPhone(false)
                    setUserOtpView(true)
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

    //API FOR USER OTP VERIFICATION
    const onRegister = () => {
        setIsLoading(true)
        const body = {
            otp: opt,
            otpId: otpId
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
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    //API FOR USER PROFILE DETAIL SAVE
    const onUserData = () => {
        setIsLoading(true)
        const body = {
            image: '',
            firstName: fname,
            lastName: lName,
            email: email,
            password: password,
            phone: parseInt(phoneNumber, 0),
            countryCode: countryCode,
            latitude: latitude,
            longitude: longitude,
            address: address,
            gender: gender,
            genderType: gender,
            singUpType: "mobile",
            deviceType: "web"
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
                    history.push(`/booking`)
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
        <section>
            <NavBar />
            <div className="container header_padd">
                <div className="login_page">
                    <div className="login_part">
                        <div className="login_heading">
                            <img className="img-fluid" src={logo} alt="" />
                            <h3>Get moving with <br /><span>Wingmen</span></h3>
                        </div>
                        {checkPhone &&
                            <div className="signup_form">
                                <PhoneInput
                                    // country={'in'}
                                    country={'us'}
                                    onChange={onPhoneNumber}
                                />
                                <div className="login_forget">
                                    {
                                        isLoading === true ? <button className="btn_brand">
                                            <div class="spinner-border text-white" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                        </button> : <button className="btn_brand" onClick={() => onSubmit()}>login</button>
                                    }

                                </div>
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
                                <div className="login_forget">
                                    {
                                        isLoading === true ? <button className="btn_brand">
                                            <div class="spinner-border text-white" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                        </button> : <button className="btn_brand" onClick={() => onRegister()}>create account</button>
                                    }
                                    <button className="btn_brand" onClick={() => onBackPhone()}>back</button>
                                </div>
                            </div>
                        }
                        {userProfileView &&
                            <div className="user_date signup_user_detail">
                                <h2>User Profile</h2>
                                <div className="user_input">
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
                                <div className="user_input">
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
                                <div className="user_input">
                                    <label htmlFor="gender">Gender:</label>
                                    <select
                                        name="gender"
                                        id="gender"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <option value="MALE">MALE</option>
                                        <option value="FEMALE">FEMALE</option>
                                        <option value="NO_PREFRENCE">NO_PREFRENCE</option>
                                    </select>
                                </div>
                                <div className="user_input">
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
                                <div className="user_input">
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {
                                    isLoading === true ? <button className="btn_brand">
                                        <div class="spinner-border text-white" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </button> : <button
                                        className="btn_brand"
                                        onClick={() => onUserData()}
                                    >
                                        save profile
                                    </button>
                                }

                            </div>
                        }
                        <div className="signup">
                            <h2>Don't have an account?<span onClick={() => onSignIn()}>Sign In</span></h2>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    )
}

export default Signup
