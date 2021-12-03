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
    const [selectedVehical, setSelectedVehical] = useState({})
    const [selectedServiceType, setSelectedServiceType] = useState({})
    const [triType, setTriType] = useState('')
    const [selectedCard, setSelectedCard] = useState('')
    const [bookingAmount, setBookingAmount] = useState('')
    const [promoCode, setPromoCode] = useState('')
    const [paymentType, setPaymentType] = useState('')
    const [estimateTime, setEstimateTime] = useState('')
    const [distance, setDistance] = useState('')

    //POPUPS VIEW
    const [walletMoney, setwalletMoney] = useState(false)
    const [addCard, setAddCard] = useState(false)

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
                setAddCard
            }}
        >
            {children}
        </Context.Provider>
    );
};