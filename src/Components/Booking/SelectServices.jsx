import React, { useContext } from 'react'
import oneway from '../../Images/Icon/oneway.png'
import returnjourney from '../../Images/Icon/returnjourney.png'
import { imageUrl } from '../../Config/api'
import { Context } from '../../Data/context'

const SelectServices = (serviceType) => {
    console.log(serviceType);

    const { setSelectedVehical, setSelectedServiceType, setTriType } = useContext(Context)

    const onServiceType = (list) => {
        console.log(list, 'seviceTypeId');
        setSelectedServiceType(list)
    }

    const onSelectVehical = (list) => {
        console.log(list, 'onSelectVehical');
        setSelectedVehical(list)
    }

    const onTripType = (e) => {
        console.log(e, 'onTripType');
        setTriType(e)
    }


    return (
        <div className="display_service">
            <div className="drive_service">
                <h2>Services</h2>
                {serviceType.serviceType.length < 1
                    ? "No serviceType found :("
                    : serviceType.serviceType.map((list, index) => {
                        return (
                            <div key={index}>
                                <input
                                    className="input-hidden"
                                    type="radio"
                                    name="service"
                                    id={list._id}
                                    onChange={(id) => onServiceType(list)}
                                />
                                <label for={list._id}>
                                    <img
                                        src={`${imageUrl}${list.image}`}
                                        alt="I'm sad" />
                                    <p>{list.serviceName}</p>
                                </label>
                            </div>
                        );
                    })
                }
            </div>
            <div className="car_service">
                <h2>Select Car</h2>
                {serviceType.userVehical.length < 1
                    ? "No userVehical found :("
                    : serviceType.userVehical.map((list, index) => {
                        return (
                            <div key={index}>
                                <input
                                    className="input-hidden"
                                    type="radio"
                                    name="vehical"
                                    id={list._id}
                                    onChange={(id) => onSelectVehical(list)}
                                />
                                <label for={list._id}>
                                    <img
                                        src={`${imageUrl}${list.vehicleImage}`}
                                        alt="I'm sad" />
                                    <p>{list.plateNumber}</p>
                                </label>
                            </div>
                        );
                    })
                }
            </div>
            <div className="trip_service">
                <h2>Trip Type</h2>
                <input
                    type="radio"
                    name="trip_s"
                    id="oneway"
                    className="input-hidden"
                    value="SINGLETRIP"
                    onChange={(e) => onTripType(e.target.value)}
                />
                <label for="oneway">
                    <img
                        src={oneway}
                        alt="I'm sad" />
                    <p>Oneway Trip</p>
                </label>
                <input
                    type="radio"
                    name="trip_s"
                    id="returnjourney"
                    className="input-hidden"
                    value="ROUNDTRIP"
                    onChange={(e) => onTripType(e.target.value)}
                />
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
