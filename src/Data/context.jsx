import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState({});
  const [isAuthentication, setIsAuthentication] = useState(false);
  const [pickupLocation, setPickupLocation] = useState({
    address: "",
    latitude: 0,
    longitude: 0,
  });
  const [dropLocation, setDropLocation] = useState({
    address: "",
    latitude: 0,
    longitude: 0,
  });
  const [stopLocation, setStopLocation] = useState({
    address: "",
    latitude: 0,
    longitude: 0,
  });
  const [stopLocationTwo, setStopLocationTwo] = useState({
    address: "",
    latitude: 0,
    longitude: 0,
  });
  const [stopLocationThree, setStopLocationThree] = useState({
    address: "",
    latitude: 0,
    longitude: 0,
  });
  const [stopLocationFour, setStopLocationFour] = useState({
    address: "",
    latitude: 0,
    longitude: 0,
  });
  const [selectedVehical, setSelectedVehical] = useState({});
  const [selectedServiceType, setSelectedServiceType] = useState({ serviceName: "Personal Driver" });
  const [triType, setTriType] = useState("");
  const [selectedCard, setSelectedCard] = useState("");
  const [bookingNote, setBookingNote] = useState("");
  const [bookingAmount, setBookingAmount] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [paymentType, setPaymentType] = useState("CARD");
  const [estimateTime, setEstimateTime] = useState("");
  const [distance, setDistance] = useState("");
  const [cardAddedStatus, setCardAddedStatus] = useState(false);
  const [bookingSignin, setBookingSignin] = useState({
    loginId: "",
    loginPassword: "",
    loginCountryCode: "",
    loginOtp: "",
    loginOtpId: "",
  });
  const [isBookingSignup, setIsBookingSignup] = useState(false);
  const [checkUserAccountStatus, setCheckUserAccountStatus] = useState(false);
  const [checkPhone, setCheckPhone] = useState(true);
  const [UserOtpView, setUserOtpView] = useState(false);

  //POPUPS VIEW
  const [walletMoney, setwalletMoney] = useState(false);
  const [addCard, setAddCard] = useState(false);
  const [addVehical, setAddVehical] = useState(false);
  const [addVehicalStatus, setAddVehicalStatus] = useState(false);
  const [onSignUp, setOnSignUp] = useState(true);
  const [guestUser, setGuestUser] = useState(false);
  const [guestOtpId, setGuestOtpId] = useState("")
  const [serviceView, setServiceView] = useState(false)
  const [loginCheck, setLoginCheck] = useState(false)
  const [addStops, setAddStops] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)
  const [eventId, setEventId] = useState("")

  return (
    <Context.Provider
      value={{
        isLoading,
        setIsLoading,
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
        onSignUp,
        setOnSignUp,
        checkUserAccountStatus,
        setCheckUserAccountStatus,
        checkPhone,
        setCheckPhone,
        UserOtpView,
        setUserOtpView,
        guestUser,
        setGuestUser,
        guestOtpId,
        setGuestOtpId,
        serviceView,
        setServiceView,
        loginCheck,
        setLoginCheck,
        addStops,
        setAddStops,
        stopLocation,
        setStopLocation,
        stopLocationTwo,
        setStopLocationTwo,
        stopLocationThree, setStopLocationThree,
        stopLocationFour, setStopLocationFour,
        totalPayment, setTotalPayment,
        eventId, setEventId
      }}
    >
      {children}
    </Context.Provider>
  );
};
