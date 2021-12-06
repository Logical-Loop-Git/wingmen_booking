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
    const [bookingNote, setBookingNote] = useState('')
    const [bookingAmount, setBookingAmount] = useState('')
    const [promoCode, setPromoCode] = useState('')
    const [paymentType, setPaymentType] = useState('')
    const [estimateTime, setEstimateTime] = useState('')
    const [distance, setDistance] = useState('')
    const [cardAddedStatus, setCardAddedStatus] = useState(false)

    //POPUPS VIEW
    const [walletMoney, setwalletMoney] = useState(false)
    const [addCard, setAddCard] = useState(false)
    const [addVehical, setAddVehical] = useState(false)
    const [addVehicalStatus, setAddVehicalStatus] = useState(false)

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
                setAddVehicalStatus
            }}
        >
            {children}
        </Context.Provider>
    );
};