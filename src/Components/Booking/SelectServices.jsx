import React, { useCallback, useContext, useState } from 'react'
import oneway from '../../Images/Icon/oneway.png'
import returnjourney from '../../Images/Icon/returnjourney.png'
import API, { imageUrl } from '../../Config/api'
import { Context } from '../../Data/context'
import car from '../../Images/Icon/selecrcar.png'
import { Col, Row } from 'reactstrap'
import { useEffect } from 'react'
import axios from 'axios'

const SelectServices = () => {

    const {
        setSelectedVehical,
        setSelectedServiceType,
        setTriType,
        addVehical,
        setAddVehical,
        addVehicalStatus
    } = useContext(Context)
    const [serviceType, setServiceType] = useState([])
    const [userVehical, setUserVehical] = useState([])
    const [adminVehicle, setAdminVehicle] = useState([])


    //API CALL FOR BOOKING RELATED
    const fetchServiceType = useCallback(() => {
        const authData = JSON.parse(localStorage.getItem("wingmen_booking"));
        let url = API + `getServiceType`;
        const config = {
            headers: {
                Authorization: `${authData.token}`,
            }
        };
        axios
            .get(url, config)
            .then((response) => {
                if (response.data.success === true) {
                    setServiceType(response.data.data)
                }
            })
            .catch((err) => {
                console.log("error here", err);
            });
    }, []);

    // API CALL FOR DEFAULT VEHICLE
    const fetchAdminVehicle = useCallback(() => {
        const authData = JSON.parse(localStorage.getItem("wingmen_booking"));
        let url = API + `getAdminVehicle`;
        const config = {
            headers: {
                Authorization: `${authData.token}`,
            }
        };
        axios
            .get(url, config)
            .then((response) => {
                if (response.data.status === 200) {
                    setAdminVehicle(response.data.data)
                }
            })
            .catch((err) => {
                console.log("error here", err);
            });
        console.log(adminVehicle)
    }, []);

    //API CALL FOR USER VEHICAL
    const fetchVehical = useCallback(() => {
        const authData = JSON.parse(localStorage.getItem("wingmen_booking"));
        let url = API + `getVehicles`;
        const config = {
            headers: {
                Authorization: `${authData.token}`,
            }
        };
        axios
            .get(url, config)
            .then((response) => {
                if (response.data.success === true) {
                    setUserVehical(response.data.data)
                }
            })
            .catch((err) => {
                console.log("error here", err);
            });
    }, []);

    //OPEN VEHICAL POPUP
    const onVehicalPopup = () => {
        if (addVehical === false) {
            setAddVehical(true);
        } else {
            setAddVehical(false);
        }
    };

    //SELECT SERVICE TYPE
    const onServiceType = (list) => {
        console.log(list, 'seviceTypeId');
        setSelectedServiceType(list)
    }

    //SELECT VEHICAL TYPE
    const onSelectVehical = (list, index) => {
        console.log(list, 'onSelectVehical');
        setSelectedVehical(list)

    }

    //SELECT TRIP TYPE
    const onTripType = (e) => {
        console.log(e, 'onTripType');
        setTriType(e)
    }

    //FOR FETCHING CALLBACK
    useEffect(() => {
        fetchServiceType()
        fetchVehical()
        fetchAdminVehicle()
        if (addVehicalStatus) {
            fetchServiceType()
            fetchVehical()
            fetchAdminVehicle()
        }
    }, [addVehicalStatus])


    return (
        <div className="display_service">
            {/* SERVICE TYPE */}
            <div className="drive_service">
                <h2>Services</h2>
                <Row>
                    {serviceType.length < 1
                        ? "No serviceType found :("
                        : serviceType.map((list, index) => {
                            return (
                                <Col md={4} sm={4} xs={4} key={index}>
                                    <div>
                                        <input
                                            className="input-hidden"
                                            type="radio"
                                            checked={list._id}
                                            id={list._id}
                                            value={list._id}
                                            onChange={
                                                onServiceType(list)
                                            }
                                        />
                                        <label defaultChecked htmlFor={list._id}>
                                            <img
                                                src={`${imageUrl}${list.image}` || car}
                                                alt="I'm sad" />
                                            <p>{list.serviceName}</p>
                                        </label>
                                    </div>
                                </Col>
                            );
                        })
                    }
                </Row>
            </div>
            {/* VEHICAL TYPE */}
            <div className="car_service">
                <h2>Select Transmission</h2>
                <Row>
                    {userVehical.length < 1
                        ? adminVehicle.slice(0).reverse().map((list, index) => {
                            return (
                                <Col md={4} sm={4} xs={4} key={index}>
                                    <div>
                                        <input
                                            className="input-hidden"
                                            type="radio"
                                            name="vehical"
                                            id={list._id}
                                            onChange={(id) => onSelectVehical(list, index)}
                                        />
                                        <label htmlFor={list._id}>
                                            <img
                                                src={`${imageUrl}${list.vehicleImage}`}
                                                alt="I'm sad" />
                                            <p>{list.plateNumber}</p>
                                        </label>
                                    </div>
                                </Col>

                            )
                        })
                        : userVehical.map((list, index) => {
                            return (
                                <Col md={4} sm={4} xs={4} key={index}>
                                    <div >
                                        <input
                                            className="input-hidden"
                                            type="radio"
                                            name="vehical"
                                            id={list._id}
                                            onChange={(id) => onSelectVehical(list)}
                                        />
                                        <label htmlFor={list._id}>
                                            <img
                                                src={`${imageUrl}${list.vehicleImage}`}
                                                alt="I'm sad" />
                                            <p>{list.plateNumber}</p>
                                        </label>
                                    </div>
                                </Col>
                            );
                        })
                    }
                    {
                        userVehical.length > 0 ? null : <Col md={4} sm={4} xs={4}>
                            <div className="add_vehical_btn" onClick={() => onVehicalPopup()}>
                                <label>
                                    <img
                                        src={car}
                                        alt="I'm sad" />
                                    <p>Add Vehicle</p>
                                </label>
                            </div>
                        </Col>
                    }
                </Row>
            </div>
            {/* TRIP TYPE */}
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
                <label htmlFor="oneway">
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
                <label htmlFor="returnjourney">
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
