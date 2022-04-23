import React, { useContext, useEffect } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { Context } from "../Data/context";
import ProtectedRoutes from "./ProtectedRoutes";
// PAGES IMPORT
import Booking from "../Pages/Booking";
import Landing from "../Pages/Landing";
import UserProfile from "../Pages/UserProfile";
import Signup from "../Pages/Signup";
import Service from "../Pages/Service";
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";
import API from "../Config/api";
import Tips from "../Pages/Tips";
import ScheduleBooking from "../Pages/ScheduleBooking";
import EventBooking from "../Pages/EventBooking";
import EventDetails from "../Pages/EventDetails";
import EventTeamBookingDetails from "../Pages/EventTeamBookingDetails";


const Routes = () => {

    const { setToken,
        setUserData,
        setIsAuthentication
    } = useContext(Context)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position.coords.latitude)
            console.log(position.coords.longitude)
        });
        const authData = JSON.parse(localStorage.getItem("wingmen_booking"))
        if (authData) {
            setToken(authData.token)
            setUserData(authData)
            setIsAuthentication(true)
        }

        // check for login time period
        if (authData) {
            fetch(`${API}checkUserAuth`, {
                method: 'GET',
                headers: {
                    Authorization: authData
                }
            })
                .then(response => response.json())
                .then(res => {
                    console.log(res);
                    if (res.message === 'Session has been expired.') {
                        localStorage.removeItem("wingmen_booking");
                        window.location = '/'
                    } else if (res.message === 'Token not found.') {
                        localStorage.removeItem("wingmen_booking");
                        window.location = '/'
                    } else if (res.message === 'Access denied.') {
                        localStorage.removeItem("wingmen_booking");
                        window.location = '/'
                    }
                })
                .catch((error) => {
                    console.error('Error:', error)
                })
        }
    }, [])


    return (
        <Switch>
            {/* NORMAL ROUTES */}
            <Route exact path="/home" component={Landing} />
            <Route exact path="/booking" component={Booking} />
            <Route exact path="/eventbooking" component={EventBooking} />
            <Route exact path="/" component={Booking} />
            {/* <Route exact path="/login" component={Login} /> */}
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/service" component={Service} />
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path="/contact" component={ContactUs} />
            <Route exact path="/tips/:bookingid/:userid/:cardid" component={Tips} />
            <Route exact path="/schedulebooking/:bookingId" component={ScheduleBooking} />
            <Route exact path="/eventbooking/:eventId" component={EventDetails} />
            <Route exact path="/eventteambooking/:eventId" component={EventTeamBookingDetails} />
            {/* NORMAL ROUTES END */}


            {/* PROTECTED ROUTE */}
            <ProtectedRoutes path="/userprofile">
                <UserProfile />
            </ProtectedRoutes>
            {/* PROTECTED ROUTE END */}

            <Redirect to="/" />
        </Switch>
    );
};

export default Routes;