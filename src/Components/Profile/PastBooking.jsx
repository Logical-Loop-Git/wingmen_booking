import React from 'react'
import StarRatings from 'react-star-ratings';
//IMAGES
import location_dot from '../../Images/Icon/blue_yellow_circle.svg'
import user_icon from '../../Images/Icon/user.png'
import location_icon from '../../Images/Icon/location.png'
// import { imageUrl } from '../../Config/api';


const PastBooking = (bookingList) => {
    return (
        <div className="past_booking">
            {bookingList.bookingList.length < 1
                ? "No past booking found :("
                : bookingList.bookingList.map((list, index) => {
                    return (
                        <div className="booking_box" key={index}>
                            <div className="driver_booking">
                                <div className="d-flex">
                                    <div className="driver_img">
                                        <img className="img-fluid" src={user_icon} alt="" />
                                    </div>
                                    <div className="driver_content">
                                    <h2>{list.driverData === undefined || null || '' ? 'Your Ride Cancle Before Accept.' : `${list.driverData.firstName} ${list.driverData.lastName}`}</h2>
                                        <StarRatings
                                            rating={list.driverRating}
                                            starDimension="15px"
                                            starRatedColor="#05a0e0"
                                            svgIconViewBox="0 0 576 512"
                                            svgIconPath="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                            numberOfStars={5}
                                            name='rating'
                                        />
                                        <p>{list.userVehicleData.vehicleName} ({list.userVehicleData.plateNumber})</p>
                                    </div>
                                </div>
                                <div className="booking_status">
                                    <h2>{list.bookingStatus}</h2>
                                </div>
                            </div>
                            <hr />
                            <div className="address_bookin">
                                <div className="address_map">
                                    <img className="img-fluid" src={location_icon} alt="" />
                                </div>
                                <div className="location_dot">
                                    <img className="img-fluid" src={location_dot} alt="" />
                                </div>
                                <div className="address_both">
                                    <p>{list.pickUpAddress}</p>
                                    <p>{list.dropUpAddress}</p>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}

export default PastBooking
