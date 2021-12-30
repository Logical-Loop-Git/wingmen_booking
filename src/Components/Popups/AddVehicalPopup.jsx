import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import car from '../../Images/Icon/selecrcar.png'
import axios from 'axios'
import API from '../../Config/api'
import { toast } from 'react-toastify'
import { Context } from '../../Data/context'


const AddVehicalPopup = () => {

    const {
        addVehical,
        setAddVehical,
        setAddVehicalStatus,
        isLoading,
        setIsLoading
    } = useContext(Context)
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

    //CLOSE POPUP
    const onClosePopup = () => {
        if (addVehical === false) {
            setAddVehical(true);
        } else {
            setAddVehical(false);
        }
    };

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
        const authData = JSON.parse(localStorage.getItem("wingmen_booking"));
        // IMAGE UPLOAD
        vehicalImage.forEach((file) => {
            formData.append("image", file)
        })
        // UPLOAD IMAGE API
        let url = API + `uploadFile`;
        const config = {
            headers: {
                Authorization: `${authData.token}`,
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
                                toast.dark(`Vehicle added successfully.`)
                                onClosePopup()
                                setAddVehicalStatus(true)
                            } else {
                                toast.warn(response.data.message)
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

    useEffect(() => {
        // fetchVehical()
        // API FOR USER VHICAL LIST
        const authData = JSON.parse(localStorage.getItem("wingmen_booking"));
        let url = API + `getVehicleType`;
        const config = {
            headers: {
                Authorization: `${authData.token}`,
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
        <div className="disp_vehical">
            <h2>Add Your Vehicle</h2>
            <div className="popup_close">
                <button onClick={() => onClosePopup()}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
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
                        <label htmlFor="vehical_tr">Vehicle Transmission:</label>
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
                    {
                        isLoading === true ? <button className="btn_brand">
                            <div class="spinner-border text-white" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </button> : <button className="btn_brand" onClick={() => onAddVehical()}>add Vehicle</button>
                    }

                </div>
            </div>
        </div>
    )
}

export default AddVehicalPopup
