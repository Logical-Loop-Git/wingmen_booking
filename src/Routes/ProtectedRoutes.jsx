import React from "react";
import { Redirect, Route } from "react-router-dom";


const ProtectedRoutes = ({ children, ...rest }) => {
    const authData = localStorage.getItem("wingmen_booking");

    return (
        <Route
            {...rest} render={({ location }) => {
                return authData !== null ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: {
                                from: location,
                            },
                        }}
                    />
                );
            }}
        />
    );
};

export default ProtectedRoutes;