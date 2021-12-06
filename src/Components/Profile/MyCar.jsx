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

    const { userData } = useContext(Context)
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
                    toast.dark(`Vehiacl deleted successfully.`)
                }
            })
            .catch((err) => {
                console.log("error here", err);
            });
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
                                toast.dark(`Vehiacl added successfully.`)
                            }
                        })
                        .catch(err => {
                            console.log("error here", err)
                            toast.error(`Vehical addeding fail.`)
                        })
                }
            })
            .catch(err => {
                console.log("error here", err)
                toast.error(`Image uploading fail.`)
            })
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
                }
            })
            .catch((err) => {
                console.log("error here", err);
            });
    }, [])


    return (
        <div>
            <div className="disp_vehical">
                <h2>Your Vehical</h2>
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
                                    <label htmlFor="vehical_m">Vehical Name:</label>
                                    <input
                                        type="text"
                                        name="vehical_m"
                                        id="vehical_m"
                                        placeholder="Vehical Name"
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
                                    <label htmlFor="vehical_ty">Vehical Type:</label>
                                    <select
                                        name="vehical_ty"
                                        id="vehical_ty"
                                        onChange={(e) => setVehicalTypeId(e.target.value)}
                                    >
                                        {vehicaltype.length < 1
                                            ? "No vehicaltype found :("
                                            : vehicaltype.map((list, index) => {
                                                return (
                                                    <option value={list._id} key={index}>{list.vehicleTypeName}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="user_input">
                                    <label htmlFor="vehical_tr">Vehical Transmission:</label>
                                    <select
                                        name="vehical_tr"
                                        id="vehical_tr"
                                        onChange={(e) => setVehicalTransm(e.target.value)}
                                    >
                                        {vehicalTransmission.length < 1
                                            ? "No vehicalTransmission found :("
                                            : vehicalTransmission.map((list, index) => {
                                                return (
                                                    <option value={list._id} key={index}>{list.transmissionTypeName}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                                <button className="btn_brand" onClick={() => onAddVehical()}>add vehical</button>
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="view_vehical">
                            {userVehical.length < 1
                                ? "No userVehical found :("
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
