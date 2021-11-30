import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
// pages import
import Booking from "../Pages/Booking";
import Landing from "../Pages/Landing";
import Login from "../Pages/Login";

const Routes = () => {


    return (
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/booking" component={Booking} />
            <Route exact path="/login" component={Login} />
            <Redirect to="/" />
        </Switch>
    );
};

export default Routes;