import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import car from '../../Images/Icon/selecrcar.png'
import axios from 'axios'
import API, { imageUrl } from '../../Config/api'
import { toast } from 'react-toastify'
import { Context } from '../../Data/context'


const MyCar = () => {

    const { userData, isLoading, setIsLoading } = useContext(Context)
    const [userVehical, setUserVehical] = useState([])
    const [vehicaltype, setVehicaltype] = useState([])
    const [vehicalTransmission, setVehicalTransmission] = useState([])
    const [viewCar, setViewCar] = useState(car)
    const [vehicalImage, setVehicalImage] = useState([])
    //VEHICAL ADD FORM
    const [vehicalName, setVehicalName] = useState('')
    const [plateNumber, setPlateNumber] = useState('')
    const [vehicalTypeId, setVehicalTypeId] = useState('')
    const [vehicalTransm, setVehicalTransm] = useState('')
    const formData = new FormData()

    //API CALL FOR VEHICAL LIST
    const fetchVehical = useCallback(() => {
        // car getVehicles List
        let url = API + `getVehicles`;
        const config = {
            headers: {
                Authorization: `${userData.token}`,
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

    //DELETE VEHICAL
    const onDeleteVehical = (id) => {
        //DELETE VEHICAL API
        let url = API + `deleteVehicle`;
        const body = {
            _id: id
        }
        const config = {
            headers: {
                Authorization: `${userData.token}`,
            }
        };
        axios
            .post(url, body, config)
            .then((response) => {
                if (response.data.success === true) {
                    fetchVehical()
                    toast.dark(`Vehicle deleted successfully.`)
                }
            })
            .catch((err) => {
                console.log("error here", err);
            })
    }

    //FETCH IMAGE
    const addImage = (event) => {
        // display image
        const reader = new FileReader(),
            filesToDisplay = event.target.files
        reader.onload = function () {
            setViewCar(reader.result)
        }
        reader.readAsDataURL(filesToDisplay[0])
        // add file for upload
        event.preventDefault()
        const files = event.target.files
        const tempImages = [...vehicalImage]

        for (let index = 0; index < files.length; index++) {
            const file = files[index]
            const duplicate = false
            if (!duplicate) tempImages.push(file)
        }
        setVehicalImage([...tempImages])
        console.log([...tempImages])
    }

    //ADD VEHICAL
    const onAddVehical = () => {
        setIsLoading(true)
        if (vehicalName === '' || plateNumber === '' || vehicalTypeId === '' || vehicalTransm === '') {
            toast.warn(`Some fiels are missing.`)
            setIsLoading(false)
        } else {
            // IMAGE UPLOAD
            vehicalImage.forEach((file) => {
                formData.append("image", file)
            })
            // UPLOAD IMAGE API
            let url = API + `uploadFile`;
            const config = {
                headers: {
                    Authorization: `${userData.token}`,
                }
            };
            axios.post(url, formData, config)
                .then(response => {
                    console.log(response, 'imageupload');
                    const imageUrl = response.data.data
                    if (response.data.success === true) {
                        // ADD NEW VEHICAL API
                        const body = {
                            "vehicleName": vehicalName,
                            "plateNumber": plateNumber,
                            "vehicleImage": imageUrl,
                            "vehicleTypeId": vehicalTypeId,
                            "transmissionTypeId": vehicalTransm,
                        }
                        console.log(body);
                        let url2 = API + `addVehicle`;
                        axios.post(url2, body, config)
                            .then(response => {
                                if (response.data.success === true) {
                                    fetchVehical()
                                    toast.dark(`Vehicle added successfully.`)
                                }
                            })
                            .catch(err => {
                                console.log("error here", err)
                                toast.error(`Vehicle adding fail.`)
                            })
                            .finally(() => {
                                setIsLoading(false)
                            })
                    }
                })
                .catch(err => {
                    console.log("error here", err)
                    toast.error(`Image uploading fail.`)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }

    useEffect(() => {
        fetchVehical()
        // API FOR USER VHICAL LIST
        let url = API + `getVehicleType`;
        const config = {
            headers: {
                Authorization: `${userData.token}`,
            }
        };
        axios
            .get(url, config)
            .then((response) => {
                if (response.data.success === true) {
                    setVehicaltype(response.data.data.vehicleTypeData)
                    setVehicalTransmission(response.data.data.trannsmissionTypeData)
                    setVehicalTypeId(response.data.data.vehicleTypeData[0]._id)
                    setVehicalTransm(response.data.data.trannsmissionTypeData[0]._id)
                }
            })
            .catch((err) => {
                console.log("error here", err);
            });
    }, [])


    return (
        <div>
            <div className="disp_vehical">
                <h2>Your Vehicle</h2>
                <Row>
                    <Col md={6}>
                        <div className="add_vehical">
                            <div className="user_image">
                                <img className="img-fluid" src={viewCar} alt="wingmen user profile" />
                                <div className="add_user_photo_btn">
                                    <label htmlFor="userphoto">
                                        <FontAwesomeIcon icon={faPlus} />
                                        <input
                                            type="file"
                                            name="userphoto"
                                            id="userphoto"
                                            onChange={addImage}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="vehical_form">
                                <div className="user_input">
                                    <label htmlFor="vehical_m">Vehicle Name:</label>
                                    <input
                                        type="text"
                                        name="vehical_m"
                                        id="vehical_m"
                                        placeholder="Vehicle Name"
                                        value={vehicalName}
                                        onChange={(e) => setVehicalName(e.target.value)}
                                    />
                                </div>
                                <div className="user_input">
                                    <label htmlFor="plate_n">Plate Number:</label>
                                    <input
                                        type="text"
                                        name="plate_n"
                                        id="plate_n"
                                        placeholder="Plate Number"
                                        value={plateNumber}
                                        onChange={(e) => setPlateNumber(e.target.value)}
                                    />
                                </div>
                                <div className="user_input">
                                    <label htmlFor="vehical_ty">Vehicle Type:</label>
                                    <select
                                        name="vehical_ty"
                                        id="vehical_ty"
                                        onChange={(e) => setVehicalTypeId(e.target.value)}
                                    >
                                        {vehicaltype.length < 1
                                            ? "No vehicletype found :("
                                            : vehicaltype.map((list, index) => {
                                                return (
                                                    <option defaultValue={list._id} value={list._id} key={index}>{list.vehicleTypeName}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="user_input">
                                    <label htmlFor="vehical_tr">Vehicle Transmission:</label>
                                    <select
                                        name="vehical_tr"
                                        id="vehical_tr"
                                        onChange={(e) => setVehicalTransm(e.target.value)}
                                    >
                                        {vehicalTransmission.length < 1
                                            ? "No vehicle Transmission found :("
                                            : vehicalTransmission.map((list, index) => {
                                                return (
                                                    <option value={list._id} key={index}>{list.transmissionTypeName}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                                {
                                    isLoading === true ? <button className="btn_brand">
                                        <div class="spinner-border text-white" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </button> : <button className="btn_brand" onClick={() => onAddVehical()}>add Vehicle</button>
                                }
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="view_vehical">
                            {userVehical.length < 1
                                ? "No userVehicle found :("
                                : userVehical.map((list, index) => {
                                    return (
                                        <div className="vehical_list" key={index}>
                                            <div className="vehical_info">
                                                <img src={`${imageUrl}${list.vehicleImage}`} alt="" />
                                                <div className="vehical_list_name">
                                                    <h2>{list.vehicleName}</h2>
                                                    <p>{list.plateNumber}</p>
                                                </div>
                                            </div>
                                            <div className="vedical_ed_de">
                                                <FontAwesomeIcon icon={faPen} />
                                                <FontAwesomeIcon icon={faTrash} onClick={(id) => onDeleteVehical(list._id)} />                                                                                          
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default MyCar
