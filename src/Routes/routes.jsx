import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
// pages import
import Booking from "../Pages/Booking";
import Landing from "../Pages/Landing";

const Routes = () => {


    return (
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/booking" component={Booking} />
            <Redirect to="/" />
        </Switch>
    );
};

export default Routes;