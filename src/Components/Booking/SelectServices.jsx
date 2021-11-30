import React from 'react'
import oneway from '../../Images/Icon/oneway.png'
import returnjourney from '../../Images/Icon/returnjourney.png'
import drivermappin from '../../Images/Icon/drivermappin.png'
import selecrcar from '../../Images/Icon/selecrcar.png'

const SelectServices = () => {
    return (
        <div className="display_service">
            <div className="drive_service">
                <h2>Services</h2>
                <input
                    type="checkbox" name="service"
                    id="service" class="input-hidden" />
                <label for="service">
                    <img
                        src={drivermappin}
                        alt="I'm sad" />
                    <p>Personal Driver</p>
                </label>
            </div>
            <div className="car_service">
                <h2>Select Car</h2>
                <input
                    type="checkbox" name="service_car"
                    id="car_1" class="input-hidden" />
                <label for="car_1">
                    <img
                        src={selecrcar}
                        alt="I'm sad" />
                    <p>Select Car</p>
                </label>
            </div>
            <div className="trip_service">
                <h2>Trip Type</h2>
                <input
                    type="checkbox" name="service_trip_oneway"
                    id="oneway" class="input-hidden" />
                <label for="oneway">
                    <img
                        src={oneway}
                        alt="I'm sad" />
                    <p>Oneway Trip</p>
                </label>
                <input
                    type="checkbox" name="service_trip_return"
                    id="returnjourney" class="input-hidden" />
                <label for="returnjourney">
                    <img
                        src={returnjourney}
                        alt="I'm sad" />
                    <p>Round Trip</p>
                </label>
            </div>
        </div>
    )
}

export default SelectServices
