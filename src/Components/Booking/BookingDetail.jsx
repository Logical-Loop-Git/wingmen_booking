import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import API, { imageUrl } from '../../Config/api';
import { Context } from '../../Data/context';
import axios from 'axios';
//IMAGES
import fare from '../../Images/Icon/fare.png'
import time from '../../Images/Icon/time.png'
import oneway from '../../Images/Icon/oneway.png'
import returnjourney from '../../Images/Icon/returnjourney.png'

const BookingDetail = () => {

    const {
        pickupLocation,
        dropLocation,
        selectedServiceType,
        selectedVehical,
        triType,
        setBookingAmount,
        setEstimateTime,
        setDistance,
        bookingNote,
        setBookingNote
    } = useContext(Context)
    const [bookingCheck, setBookingCheck] = useState({})

    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem("wingmen_booking"));
        //CALCUTAE DISTANCE IN KM
        const deg2rad = (deg) => {
            return deg * (Math.PI / 180)
        }

        const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(lat2 - lat1);  // deg2rad below
            var dLon = deg2rad(lon2 - lon1);
            var a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2)
                ;
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c; // Distance in km
            return d;
        }

        const distance = getDistanceFromLatLonInKm(pickupLocation.latitude, pickupLocation.longitude, dropLocation.latitude, dropLocation.longitude)
        const estimateTime = parseFloat((distance / 50) * 60).toFixed(2)
        //CALCUTAE DISTANCE IN KM END

        //SET VALUE IN CONTEXT
        setDistance(distance)
        setEstimateTime(estimateTime)

        //API CALL FOR BOOKING CHECK
        const body = {
            "bookingDate": new Date(),
            "dropUpAddress": dropLocation.address,
            "dropUplatitude": dropLocation.latitude,
            "dropUplongitude": dropLocation.longitude,
            "eta": parseInt(estimateTime, 10),
            "genderType": "NO_PREFRENCE",
            // "paymentMode": "WALLET",
            "pickUpAddress": pickupLocation.address,
            "pickUplatitude": pickupLocation.latitude,
            "pickUplongitude": pickupLocation.longitude,
            "timezone": 330,
            "totalDistance": distance * 1000,
            "seviceTypeId": selectedServiceType._id,
            "tripType": triType,
            "vehicleId": selectedVehical._id
        }
        console.log(body);
        let url = API + `createBookingPaymentCheck`;
        const config = {
            headers: {
                Authorization: `${authData.token}`,
            }
        };
        axios
            .post(url, body, config)
            .then((response) => {
                if (response.data.success === true) {
                    console.log(response, 'createBookingPaymentCheck');
                    setBookingCheck(response.data.data)
                    setBookingAmount(response.data.data.totalAmount)
                }
            })
            .catch((err) => {
                console.log("error here", err);
            });
    }, [])


    return (
        <div className="display_details">
            <h2>Preview Booking</h2>
            {/* SELECTED LOCATION  */}

            <div className="display_loc">
                <div className="location">
                    <div className="pickup_icone">
                        <FontAwesomeIcon icon={faLocationArrow} />
                    </div>
                    <div className="location_input">
                        <p>Choose Your Pickup Location</p>
                        <input
                            defaultValue={pickupLocation.address}
                            disabled
                            name="address"
                            placeholder="Enter pickup location"
                        />
                    </div>
                </div>
                <div className="location">
                    <div className="drop_icone">
                        <FontAwesomeIcon icon={faThumbtack} />
                    </div>
                    <div className="location_input">
                        <p>Choose Your Drop Location</p>
                        <input
                            defaultValue={dropLocation.address}
                            disabled
                            name="address"
                            placeholder="Enter drop location"
                        />
                    </div>
                </div>
            </div>
            {/* SELECTED SERVICE */}

            <h2>Selected Services</h2>
            <div className="display_sele_service">
                <div className="history-tl-container">
                    <ul className="tl">
                        <li className="tl-item">
                            <div className="serv_content">
                                <img src={`${imageUrl}${selectedServiceType.image}`} alt="" />
                                <p>{selectedServiceType.serviceName}</p>
                            </div>
                        </li>
                        <li className="tl-item">
                            <div className="serv_content">
                                <img src={`${imageUrl}${selectedVehical.vehicleImage}`} alt="" />
                                <p>{selectedVehical.plateNumber}</p>
                            </div>
                        </li>
                        <li className="tl-item">
                            <div className="serv_content">
                                {triType === 'SINGLETRIP' ? <img src={oneway} alt="" /> : <img src={returnjourney} alt="" />}
                                <p>{triType}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {/* FARE ESTIMATE  */}

            <h2>Fare Estimate</h2>
            <div className="fare_estimate">
                <div className="fare_estimate_icon">
                    <img src={fare} alt="" />
                    <p>$ {bookingCheck.totalAmount}</p>
                </div>
                <div className="fare_estimate_icon">
                    <img src={time} alt="" />
                    <p>{bookingCheck.eta} min</p>
                </div>
            </div>
            {/* ADD NOTE  */}

            <h2>Add Note</h2>
            <div className="feedback">
                <input
                    type="text"
                    name="add_note"
                    id="add_note"
                    placeholder="Add Note"
                    value={bookingNote}
                    onChange={(e) => setBookingNote(e.target.value)}
                />
            </div>
        </div>
    )
}

export default BookingDetail
