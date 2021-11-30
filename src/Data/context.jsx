import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState({})
    const [pickupLocation, setPickupLocation] = useState({
        address: '',
        latitude: 0,
        longitude: 0
    })
    const [dropLocation, setDropLocation] = useState({
        address: '',
        latitude: 0,
        longitude: 0
    })

    return (
        <Context.Provider
            value={{
                token,
                setToken,
                userData,
                setUserData,
                pickupLocation,
                setPickupLocation,
                dropLocation,
                setDropLocation
            }}
        >
            {children}
        </Context.Provider>
    );
};