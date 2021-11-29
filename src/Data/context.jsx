import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState({})
    const [addCarRentPopup, setAddCarRentPopup] = useState(false)
    const [addCarSealPopup, setAddCarSealPopup] = useState(false)
    const [addAddressPopup, setAddAddressPopup] = useState(false)
    const [updateUserProfilePopup, setUpdateUserProfilePopup] = useState(false)
    const [deleveryCharges, setDeleveryCharges] = useState(0)
    const [subTotal, setSubTotal] = useState(0)
    const [carWashBooking, setCarWashBooking] = useState({
        cartype: '',
        subscription: '',
        serviceDisplay: [],
        bookingDate: '',
        bookingTime: ''
    })
    const [advertisementPopup, setAdvertisementPopup] = useState(false)

    return (
        <Context.Provider
            value={{
                token,
                setToken,
                userData,
                setUserData,
                isLoggedIn,
                setIsLoggedIn,
                addCarRentPopup,
                setAddCarRentPopup,
                addCarSealPopup,
                setAddCarSealPopup,
                addAddressPopup,
                setAddAddressPopup,
                updateUserProfilePopup,
                setUpdateUserProfilePopup,
                deleveryCharges,
                setDeleveryCharges,
                subTotal,
                setSubTotal,
                carWashBooking,
                setCarWashBooking,
                advertisementPopup,
                setAdvertisementPopup
            }}
        >
            {children}
        </Context.Provider>
    );
};