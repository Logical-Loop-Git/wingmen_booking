import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import UserDetails from '../Components/Profile/UserDetails';
import MyCar from '../Components/Profile/MyCar';
import MyBooking from '../Components/Profile/MyBooking';
import Payment from '../Components/Profile/Payment';
import Notification from '../Components/Profile/Notification';
import ChangePassword from '../Components/Profile/ChangePassword';
import NavBar from '../Components/Header/NavBar'
import { Col, Row } from 'reactstrap'
import API, { imageUrl } from '../Config/api';
import axios from 'axios';
import { Context } from '../Data/context';
import user_pr from '../Images/Icon/user.png'


const UserProfile = () => {

    const history = useHistory()
    const { userData } = useContext(Context)
    const [userDetail, setUserDetail] = useState({})
    //USER DETAILS VIEW
    const [userDetails, setUserDetails] = useState(true)
    const [myCars, setMyCars] = useState(false)
    const [payment, setPayment] = useState(false)
    const [notification, setNotification] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const [myBookings, setMyBookings] = useState(false)

    //API CALL FOR USER PROFILE
    const fetchUserDetail = useCallback(() => {
        const authData = JSON.parse(localStorage.getItem("wingmen_booking"));
        let url = API + `getUserProfile`;
        const config = {
            headers: {
                Authorization: `${authData.token}`,
            }
        };
        axios
            .get(url, config)
            .then((response) => {
                if (response.data.success === true) {
                    setUserDetail(response.data.data)
                    console.log(response.data.data)
                    console.log(userData)
                }
            })
            .catch((err) => {
                console.log("error here", err);
            });
    }, []);

    //VIEW OTHER COMPONENTS
    const onUserDetail = () => {
        setUserDetails(true)
        setMyCars(false)
        setPayment(false)
        setNotification(false)
        setChangePassword(false)
        setMyBookings(false)
    }
    const onMyCar = () => {
        setMyCars(true)
        setUserDetails(false)
        setPayment(false)
        setNotification(false)
        setChangePassword(false)
        setMyBookings(false)
    }
    const onPayment = () => {
        setPayment(true)
        setMyCars(false)
        setUserDetails(false)
        setNotification(false)
        setChangePassword(false)
        setMyBookings(false)
    }
    const onNotification = () => {
        setNotification(true)
        setPayment(false)
        setMyCars(false)
        setUserDetails(false)
        setChangePassword(false)
        setMyBookings(false)
    }
    const onChangePassword = () => {
        setChangePassword(true)
        setNotification(false)
        setPayment(false)
        setMyCars(false)
        setUserDetails(false)
        setMyBookings(false)
    }
    const onMyBooking = () => {
        setMyBookings(true)
        setChangePassword(false)
        setNotification(false)
        setPayment(false)
        setMyCars(false)
        setUserDetails(false)
    }
    const onRequestRide = () => {
        history.push(`/booking`)
    }
    const onLogout = () => {
        localStorage.removeItem("wingmen_booking")
        window.location = "/"
    }
    //VIEW OTHER COMPONENTS END

    useEffect(() => {
        fetchUserDetail()
    }, [])


    return (
        <section>
            <NavBar />
            <div className="user_profile">
                <div className="container header_padd">
                    <Row>
                        <Col md="4">
                            <div className="profile_navigation">
                                <div className="user_name">
                                    <div className="user_name_img">
                                        <img className="img-fluid" src={userDetail.image === '' || null || undefined ? user_pr : `${imageUrl}${userDetail.image}`} alt="" />
                                    </div>
                                    <div className="user_name_cot" onClick={() => onUserDetail()}>
                                        <h2>{userDetail.firstName} {userDetail.lastName}</h2>
                                        <p>({userDetail.avgRating} Star Rating)</p>
                                    </div>
                                </div>
                                <div className="profile_pages">
                                    <ul>
                                        <li className={`${myCars ? 'active_bar' : ''}`} onClick={() => onMyCar()}>
                                            My Car
                                        </li>
                                        <li className={`${myBookings ? 'active_bar' : ''}`} onClick={() => onMyBooking()}>
                                            My Bookings
                                        </li>
                                        <li onClick={() => onRequestRide()}>
                                            Request Ride
                                        </li>
                                        <li className={`${payment ? 'active_bar' : ''}`} onClick={() => onPayment()}>
                                            Payment
                                        </li>
                                        <li className={`${notification ? 'active_bar' : ''}`} onClick={() => onNotification()}>
                                            Notification
                                        </li>
                                        <li className={`${changePassword ? 'active_bar' : ''}`} onClick={() => onChangePassword()}>
                                            Change Password
                                        </li>
                                        <li onClick={() => onLogout()}>
                                            Log Out
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col md="8">
                            <div className="user_info">
                                {userDetails &&
                                    <UserDetails userDetail={userDetail} />
                                }
                                {myCars &&
                                    <MyCar />
                                }
                                {myBookings &&
                                    <MyBooking />
                                }
                                {payment &&
                                    <Payment />
                                }
                                {notification &&
                                    <Notification />
                                }
                                {changePassword &&
                                    <ChangePassword />
                                }
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </section>
    )
}

export default UserProfile
