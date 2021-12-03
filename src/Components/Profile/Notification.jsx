import React, { useCallback, useContext, useEffect, useState } from 'react'
import wingmen from '../../Images/Icon/wingmen.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Context } from '../../Data/context'
import axios from 'axios'
import API from '../../Config/api'
import { toast } from 'react-toastify'


const Notification = () => {

    const { userData } = useContext(Context)
    const [notification, setNotification] = useState([])

    //API CALL FOR USER NOTIFICATION
    const fetchUserNotification = useCallback(async () => {
        // car getAllNotification List
        let url = API + `getAllNotification`;
        const config = {
            headers: {
                Authorization: `${userData.token}`,
            }
        };
        axios
            .get(url, config)
            .then(async (response) => {
                if (response.data.success === true) {
                    setNotification(await response.data.data)
                }
            })
            .catch((err) => {
                console.log("error here", err);
            });
    }, []);

    //DELETE NOTIFICATION
    const onDeleteNotification = (id) => {
        //DELETE NOTIFICATION API
        let url = API + `clearNotification`;
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
                    fetchUserNotification()
                    toast.dark(`Notification deleted successfully.`)
                }
            })
            .catch((err) => {
                console.log("error here", err);
            });
    }

    useEffect(() => {
        fetchUserNotification()
    }, [fetchUserNotification])


    return (
        <div>
            <div className="user_notification">
                <h2>Notification</h2>
                {notification.length < 1
                    ? "No notification found :("
                    : notification.map((list, index) => {
                        return (
                            <div className="notifi_box" key={index}>
                                <h3>Your Ride is <span>{list.message}</span></h3>
                                <div className="notifi_conent">
                                    <div className="notifi_img">
                                        <img className="img-fluid" src={wingmen} alt="" />
                                        <div>
                                            <h4>{list.bookingData === undefined ? 'null' : list.bookingData.pickUpAddress}</h4>
                                            <h4>{list.bookingData === undefined ? 'null' : list.bookingData.dropUpAddress}</h4>
                                            <p>Booking Date: {list.bookingData === undefined ? 'null' : list.bookingData.createdAt}</p>
                                        </div>
                                    </div>
                                    <div className="notifi_delete">
                                        <FontAwesomeIcon icon={faTrash} onClick={(id) => onDeleteNotification(list._id)} />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default Notification
