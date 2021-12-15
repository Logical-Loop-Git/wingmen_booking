import React, { useContext, useEffect } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { Context } from "../Data/context";
import ProtectedRoutes from "./ProtectedRoutes";
// PAGES IMPORT
import Booking from "../Pages/Booking";
import Landing from "../Pages/Landing";
import Login from "../Pages/Login";
import UserProfile from "../Pages/UserProfile";
import Signup from "../Pages/Signup";
import Service from "../Pages/Service";
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";
import { imageUrl } from "../Config/api";


const Routes = () => {

    const { setToken,
        setUserData,
        setIsAuthentication
    } = useContext(Context)

    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem("wingmen_booking"))
        if (authData) {
            setToken(authData.token)
            setUserData(authData)
            setIsAuthentication(true)
        }

        // check for login time period
        try {
            if (authData) {
                fetch(`${imageUrl}api/v1/admin/checkAdmin`, {
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
        } catch (error) {
            console.log(error, "ERROR");
            localStorage.removeItem("wingmen_booking");
        }
    }, [])


    return (
        <Switch>
            {/* NORMAL ROUTES */}
            <Route exact path="/" component={Landing} />
            <Route exact path="/booking" component={Booking} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/service" component={Service} />
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path="/contact" component={ContactUs} />
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