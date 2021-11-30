import React from 'react';
import logo from "../Images/Footer/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faInstagram,
    faFacebook,
    faTwitter
} from '@fortawesome/free-brands-svg-icons';
import { Link, NavLink } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

const Footer = () => {
    return (
        <footer className='footer_bg'>
            <div className="container">
                <Row>
                    <Col md='4'>
                        <div className='footer-col'>
                            <img src={logo} alt="logo" />
                        </div>
                    </Col>
                    <Col md='2' >
                        <div className='footer-col'>
                            <div className='footer_heading'>PAGE</div>
                            <div className='content'>
                                <div className='footer_link'>
                                    <NavLink to="/" exact activeClassName="nav_active">
                                        Home
                                    </NavLink>
                                </div>
                                <div className='footer_link'>
                                    <NavLink to="/booking" exact activeClassName="nav_active">
                                        Booking
                                    </NavLink>
                                </div>
                                <div className='footer_link'>
                                    <NavLink to="/about" exact activeClassName="nav_active">
                                        About Us
                                    </NavLink>
                                </div>
                                <div className='footer_link'>
                                    <NavLink to="/contact" exact activeClassName="nav_active">
                                        Contact Us
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md='2'>
                        <div className='footer-col'>
                            <div className='footer_heading'>ABOUT US</div>
                            <div className='content'>
                                <div className='footer_link'>Newsroom</div>
                                <div className='footer_link'>Investor relations</div>
                                <div className='footer_link'>Global citizenship</div>
                                <div className='footer_link'>Safety</div>
                                <div className='footer_link'>Careers</div>
                            </div>
                        </div>
                    </Col>
                    <Col md='2'>
                        <div className='footer-col'>
                            <div className='footer_heading'>OUR SERVICE</div>
                            <div className='content'>
                                <div className='footer_link'>
                                    <NavLink to="/subscription" exact activeClassName="nav_active">
                                        Service
                                    </NavLink>
                                </div>
                                <div className='footer_link'>Forgot Password</div>
                            </div>
                        </div>
                    </Col>
                    <Col md='2'>
                        <div className='footer-col'>
                            <div className='footer_cont'>
                                <Link
                                    to={{ pathname: "tel:8460339810" }}
                                    target="_blank"
                                >
                                    +91 84603 39810
                                </Link>
                            </div>
                            <div className='footer_cont'>
                                <Link
                                    to={{ pathname: "mailto:chiragmehta900@gmail.com" }}
                                    target="_blank"
                                >
                                    chiragmehta900@gmail.com
                                </Link>
                                <p>2972 Westheimer Rd. Santa Ana, Illinois 85486 </p>
                                <div className="social_media">
                                    <FontAwesomeIcon icon={faInstagram} />
                                    <FontAwesomeIcon icon={faFacebook} />
                                    <FontAwesomeIcon icon={faTwitter} />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className='subfooter'>
                    <div className='row m-2-hor'>
                        <div className='col-md-6'>
                            <div className='copy_right_content'>
                                © Copyrights 2019-2021 wingmen All rights reserved. Develop By&nbsp;
                                <Link
                                    to={{ pathname: "https://logicalloop.com/" }}
                                    target="_blank">
                                    LogicalLoop
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;