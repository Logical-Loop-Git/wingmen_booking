import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState({})
    const [isAuthentication, setIsAuthentication] = useState(false)
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
    const [selectedVehical, setSelectedVehical] = useState({})
    const [selectedServiceType, setSelectedServiceType] = useState({})
    const [triType, setTriType] = useState('')
    const [selectedCard, setSelectedCard] = useState('')
    const [bookingNote, setBookingNote] = useState('')
    const [bookingAmount, setBookingAmount] = useState('')
    const [promoCode, setPromoCode] = useState('')
    const [paymentType, setPaymentType] = useState('')
    const [estimateTime, setEstimateTime] = useState('')
    const [distance, setDistance] = useState('')
    const [cardAddedStatus, setCardAddedStatus] = useState(false)
    const [bookingSignin, setBookingSignin] = useState({
        loginId: '',
        loginPassword: ''
    })
    const [isBookingSignup, setIsBookingSignup] = useState(false)

    //POPUPS VIEW
    const [walletMoney, setwalletMoney] = useState(false)
    const [addCard, setAddCard] = useState(false)
    const [addVehical, setAddVehical] = useState(false)
    const [addVehicalStatus, setAddVehicalStatus] = useState(false)
    const [onSignUp, setOnSignUp] = useState(true)

    return (
        <Context.Provider
            value={{
                token,
                setToken,
                userData,
                setUserData,
                isAuthentication,
                setIsAuthentication,
                pickupLocation,
                setPickupLocation,
                dropLocation,
                setDropLocation,
                selectedVehical,
                setSelectedVehical,
                selectedServiceType,
                setSelectedServiceType,
                triType,
                setTriType,
                selectedCard,
                setSelectedCard,
                bookingAmount,
                setBookingAmount,
                bookingNote,
                setBookingNote,
                promoCode,
                setPromoCode,
                paymentType,
                setPaymentType,
                estimateTime,
                setEstimateTime,
                distance,
                setDistance,
                walletMoney,
                setwalletMoney,
                addCard,
                setAddCard,
                cardAddedStatus,
                setCardAddedStatus,
                addVehical,
                setAddVehical,
                addVehicalStatus,
                setAddVehicalStatus,
                bookingSignin,
                setBookingSignin,
                isBookingSignup,
                setIsBookingSignup,
                onSignUp, setOnSignUp
            }}
        >
            {children}
        </Context.Provider>
    );
};