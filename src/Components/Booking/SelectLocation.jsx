import React, { useContext } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import PickupLocation from '../Location/PickupLocation';
import DropLocation from '../Location/DropLocation';
import { Context } from '../../Data/context';
import AddStops from '../Location/AddStops';

//convert classbases components to hooks for every time rendering map

const SelectLocation = () => {
    const { addStops, setStopLocation, stopLocation, stopLocationTwo, setStopLocationTwo, stopLocationThree, setStopLocationThree,
        stopLocationFour, setStopLocationFour } = useContext(Context)
    return (
        <div className="booking_home">
            <h2>Request a <span>Driver</span> Now</h2>
            <div className="location">
                <div className="pickup_icone">
                    <FontAwesomeIcon icon={faLocationArrow} />
                </div>
                <PickupLocation />
            </div>
            {

                addStops === 1 ?

                    <div className="location">
                        <div className="drop_icone">
                            <FontAwesomeIcon icon={faThumbtack} />
                        </div>
                        <AddStops state={stopLocation} setState={setStopLocation} />
                    </div> : null
            }
            {
                addStops === 2 ? [<div className="location" >
                    <div className="drop_icone">
                        <FontAwesomeIcon icon={faThumbtack} />
                    </div>
                    <AddStops state={stopLocation} setState={setStopLocation} />
                </div>, <div className="location">
                    <div className="drop_icone">
                        <FontAwesomeIcon icon={faThumbtack} />
                    </div>
                    <AddStops state={stopLocationTwo} setState={setStopLocationTwo} />
                </div>] : null
            }
            {
                addStops === 3 ? [<div className="location" >
                    <div className="drop_icone">
                        <FontAwesomeIcon icon={faThumbtack} />
                    </div>
                    <AddStops state={stopLocation} setState={setStopLocation} />
                </div>, <div className="location">
                    <div className="drop_icone">
                        <FontAwesomeIcon icon={faThumbtack} />
                    </div>
                    <AddStops state={stopLocationTwo} setState={setStopLocationTwo} />
                </div>, <div className="location">
                    <div className="drop_icone">
                        <FontAwesomeIcon icon={faThumbtack} />
                    </div>
                    <AddStops state={stopLocationThree} setState={setStopLocationThree} />
                </div>] : null
            }
            {
                addStops >= 4 ? [<div className="location" >
                    <div className="drop_icone">
                        <FontAwesomeIcon icon={faThumbtack} />
                    </div>
                    <AddStops state={stopLocation} setState={setStopLocation} />
                </div>, <div className="location">
                    <div className="drop_icone">
                        <FontAwesomeIcon icon={faThumbtack} />
                    </div>
                    <AddStops state={stopLocationTwo} setState={setStopLocationTwo} />
                </div>, <div className="location">
                    <div className="drop_icone">
                        <FontAwesomeIcon icon={faThumbtack} />
                    </div>
                    <AddStops state={stopLocationThree} setState={setStopLocationThree} />
                </div>, <div className="location">
                    <div className="drop_icone">
                        <FontAwesomeIcon icon={faThumbtack} />
                    </div>
                    <AddStops state={stopLocationFour} setState={setStopLocationFour} />
                </div>] : null
            }

            <div className="location">
                <div className="drop_icone">
                    <FontAwesomeIcon icon={faThumbtack} />
                </div>
                <DropLocation />
            </div>
        </div >
    )
}

export default SelectLocation
