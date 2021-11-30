import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import selecrcar from '../../Images/Icon/selecrcar.png'
import fare from '../../Images/Icon/fare.png'
import time from '../../Images/Icon/time.png'

const BookingDetail = () => {
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
                            defaultValue={'value'}
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
                            defaultValue={'value'}
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
                                <img src={selecrcar} alt="" />
                                <p>Personal Driver</p>
                            </div>
                        </li>
                        <li className="tl-item">
                            <div className="serv_content">
                                <img src={selecrcar} alt="" />
                                <p>Personal Driver</p>
                            </div>
                        </li>
                        <li className="tl-item">
                            <div className="serv_content">
                                <img src={selecrcar} alt="" />
                                <p>Personal Driver</p>
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
                    <p>$ 8,753.16</p>
                </div>
                <div className="fare_estimate_icon">
                    <img src={time} alt="" />
                    <p>8,753.16 min</p>
                </div>
            </div>
            {/* ADD FEEDBACK  */}
            <h2>Add Feedback</h2>
            <div className="feedback">
                <input type="text" name="feedback" id="feedback" placeholder="Add Feedback" />
            </div>
        </div>
    )
}

export default BookingDetail
