import React from 'react'
import { useHistory } from 'react-router'
import { Col, Row } from 'reactstrap'
import banner from '../../Images/Home/banner_right.png'

const HomeLogin = () => {

    const history = useHistory()

    //REDIRECT TO SIGNIN PAGE
    const onSignin = () => {
        history.push(`/login`)
    }


    return (
        <div className="login_section">
            <Row>
                <Col md={6}>
                    <div className="login_home">
                        <h2><span>Ride Always</span> How you want</h2>
                        <p>Request a driver, hop into your car, and relax.</p>
                        <button className="btn_brand_home" onClick={() => onSignin()}>login as customer</button>
                    </div>
                </Col>
                <Col md={6}>
                    <div className="login_home_img">
                        <img className="img-fluid" src={banner} alt="" />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default HomeLogin
