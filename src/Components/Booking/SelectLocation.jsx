import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import PickupLocation from '../Location/PickupLocation';
import DropLocation from '../Location/DropLocation';


const SelectLocation = () => {
    return (
        <div className="booking_home">
            <h2>Request a <span>Driver</span> Now</h2>
            <div className="location">
                <div className="pickup_icone">
                    <FontAwesomeIcon icon={faLocationArrow} />
                </div>
                <PickupLocation />
            </div>
            <div className="location">
                <div className="drop_icone">
                    <FontAwesomeIcon icon={faThumbtack} />
                </div>
                <DropLocation />
            </div>
        </div>
    )
}

export default SelectLocation
