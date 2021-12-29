import axios from 'axios';
import React, { useState } from 'react'
import API, { imageUrl } from '../../Config/api';
import user_pr from '../../Images/Icon/user.png'
import Lottie from 'react-lottie';
import car from '../../Images/Animation/lf30_editor_qssfdpmp.json'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const BookingDriver = ({ createdBookingId }) => {

    const history = useHistory()
    const [driverDetails, setDriverDetails] = useState({})
    const [showDriver, setShowDriver] = useState(false)
    const [stopWhenDataGet, setStopWhenDataGet] = useState(6000)

    //LOTTIE ANIMATION
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: car,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    //LOGOUT 
    const onLogout = () => {
        localStorage.removeItem("wingmen_booking")
        window.location = "/"
    }

    //CANCLE BOOKING
    const onCancleBooking = () => {
        const authData = JSON.parse(localStorage.getItem("wingmen_booking"));
        let url = API + `cancelBooking`;
        const config = {
            headers: {
                Authorization: `${authData.token}`,
            }
        };
        const body = {
            bookingId: createdBookingId
        }
        axios
            .post(url, body, config)
            .then((response) => {
                if (response.data.success === true) {
                    console.log(response, 'createBookingPaymentCheck');
                    history.push(`/`)
                }
            })
            .catch((err) => {
                console.log("error here", err);
            });
    }

    //API CALL FOR BOOKING DETAILS
    useEffect(() => {
        const interval = setInterval(() => {
            console.log('interval');
            const authData = JSON.parse(localStorage.getItem("wingmen_booking"));
            let url = API + `getBookingDetails`;
            const config = {
                headers: {
                    Authorization: `${authData.token}`,
                }
            };
            console.log(createdBookingId);
            const body = {
                _id: createdBookingId
                // _id: '61b6d867c385843910afc3a4'
            }
            axios
                .post(url, body, config)
                .then((response) => {
                    console.log(response);
                    if (response.data.success === true) {
                        // console.log(response.data.data.driverData)
                        if (response.data.data.driverData !== undefined || null || '') {
                            setDriverDetails(response.data.data.driverData)
                            setShowDriver(true)
                            setStopWhenDataGet(9000000)
                        }
                    }
                })
                .catch((err) => {
                    console.log("error here", err);
                });
        }, stopWhenDataGet);

        return () => clearInterval(interval);
    }, [createdBookingId])


    return (
        <div className='driver_display'>
            {showDriver ? <div>
                <h2>Your Wingmen.</h2>
                <div className='d-grid w-100'>
                    <div className='driver_data'>
                        <img className="img-fluid" src={driverDetails.image === '' || null || undefined ? user_pr : `${imageUrl}${driverDetails.image}`} alt="wingmen user profile" />
                        <h2>{driverDetails.firstName} {driverDetails.lastName}</h2>
                        <p>{driverDetails.countryCode} {driverDetails.phone}</p>
                    </div>
                    <div className='m-auto'>
                        <button className='btn_brand' onClick={() => onLogout()}>Logout</button>
                    </div>
                </div>
            </div>
                : <div>
                    <h2>Your Wingmen Is On The Way.</h2>
                    <Lottie options={defaultOptions}
                        height={250}
                        width={250}
                    />
                    <div className='m-auto'>
                        <button className='btn_brand' onClick={() => onCancleBooking()}>Cancle Booking</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default BookingDriver
