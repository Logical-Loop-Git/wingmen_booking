import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import API from '../../Config/api'
import { Context } from '../../Data/context'

const ChangePassword = () => {

    const { userData } = useContext(Context)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword1, setNewPassword1] = useState('')
    const [newPassword2, setNewPassword2] = useState('')

    const onChangePassword = () => {
        //CHECK FOR PASSWORD MATCH..
        if (oldPassword === '' || newPassword1 === '' || newPassword2 === '') {
            toast.warning(`Some field is missing.`)
        } else {
            if (newPassword1 === newPassword2) {
                //API CALL FOR UPDATE PASSWORD..
                let url = API + `changePassword`;
                const config = {
                    headers: {
                        Authorization: `${userData.token}`,
                    }
                }
                const body = {
                    newPassword: newPassword1,
                    oldPassword: oldPassword
                }
                axios
                    .post(url, body, config)
                    .then((response) => {
                        if (response.data.success === true) {
                            toast.success(`Your password updated successfully.`)
                        }
                    })
                    .catch((err) => {
                        console.log("error here", err);
                    });
            } else {
                toast.warning(`New password and confirm password doesn't matches.`)
            }
        }
    }

    return (
        <div>
            <div className="change_password">
                <h2>Change Password</h2>
                <div className="user_input">
                    <label htmlFor="vehical_m">Old Password:</label>
                    <input
                        type="password"
                        placeholder="Old Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
                <div className="user_input">
                    <label htmlFor="vehical_m">New Password:</label>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword1}
                        onChange={(e) => setNewPassword1(e.target.value)}
                    />
                </div>
                <div className="user_input">
                    <label htmlFor="vehical_m">Confirm New Password:</label>
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={newPassword2}
                        onChange={(e) => setNewPassword2(e.target.value)}
                    />
                </div>
                <button className="btn_brand" onClick={() => onChangePassword()}>update password</button>
            </div>
        </div>
    )
}

export default ChangePassword
