import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import API, { imageUrl } from "../../Config/api";
import axios from "axios";
import { toast } from "react-toastify";
import user_pr from "../../Images/Icon/user.png";
import { Context } from "../../Data/context";

const UserDetails = (userDetail) => {
    const [fname, setFname] = useState("");
    const [lName, setLName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const { isLoading, setIsLoading } = useContext(Context);

    //UPDATE USER PROFILE
    const onUpdateProfile = () => {
        setIsLoading(true);
        const authData = JSON.parse(localStorage.getItem("wingmen_booking"));
        const body = {
            firstName: fname,
            lastName: lName,
            gender: gender,
            genderType: gender,
            email: email,
            phone: phone,
        };
        let url = API + `updateUser`;
        const config = {
            headers: {
                Authorization: `${authData.token}`,
            },
        };
        axios
            .post(url, body, config)
            .then((response) => {
                if (response.data.success === true) {
                    console.log(response, "updateUser");
                    toast.dark(`Your profile is updated successfully.`);
                }
            })
            .catch((err) => {
                console.log("error here", err);
            })
            .finally(() => {
                setIsLoading(false)
            })
    };

    useEffect(async () => {
        setFname(userDetail.userDetail.firstName);
        setLName(userDetail.userDetail.lastName);
        setGender(userDetail.userDetail.gender);
        setEmail(userDetail.userDetail.email);
        setPhone(userDetail.userDetail.phone);
    }, [userDetail]);

    return (
        <div>
            <div className="user_image">
                <img
                    className="img-fluid"
                    src={
                        userDetail.userDetail.image === "" || null || undefined
                            ? user_pr
                            : `${imageUrl}${userDetail.userDetail.image}`
                    }
                    alt="wingmen user profile"
                />
                <div className="add_user_photo_btn">
                    <label htmlFor="userphoto">
                        <FontAwesomeIcon icon={faPen} />
                        <input type="file" name="userphoto" id="userphoto" />
                    </label>
                </div>
            </div>
            <div className="user_date">
                <h2>User Profile</h2>
                <div className="user_input">
                    <label htmlFor="fname">First Name:</label>
                    <input
                        type="text"
                        name="fname"
                        id="fname"
                        placeholder="First Name"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                    />
                </div>
                <div className="user_input">
                    <label htmlFor="lname">Last Name:</label>
                    <input
                        type="text"
                        name="lname"
                        id="lname"
                        placeholder="Last Name"
                        value={lName}
                        onChange={(e) => setLName(e.target.value)}
                    />
                </div>
                <div className="user_input">
                    <label htmlFor="gender">Gender:</label>
                    <select
                        name="gender"
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="MALE">MALE</option>
                        <option value="FEMALE">FEMALE</option>
                        <option value="NO_PREFRENCE">NO_PREFRENCE</option>
                    </select>
                </div>
                <div className="user_input">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="user_input">
                    <label htmlFor="phone">Phone No:</label>
                    <input
                        type="number"
                        name="phone"
                        id="phone"
                        placeholder="Your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                {isLoading === true ? (
                    <button className="btn_brand">
                        <div class="spinner-border text-white" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </button>
                ) : (
                    <button className="btn_brand" onClick={() => onUpdateProfile()}>
                        edit
                    </button>
                )}
            </div>
        </div>
    );
};

export default UserDetails;
