import React from "react";
import { Redirect, Route } from "react-router-dom";


const ProtectedRoutes = ({ children, ...rest }) => {
    var authData = localStorage.getItem("carWashAuth");

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