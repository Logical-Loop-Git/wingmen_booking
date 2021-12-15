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
                        <div className='footer-col mb-5 d-flex justify-content-center'>
                            <img src={logo} alt="logo" />
                        </div>
                    </Col>
                    <Col md={2} sm={6} xs={6} >
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
                                    <NavLink to="/aboutus" exact activeClassName="nav_active">
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
                    <Col md={2} sm={6} xs={6}>
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
                                    <NavLink to="/service" exact activeClassName="nav_active">
                                        Service
                                    </NavLink>
                                </div>
                                <div className='footer_link'>Forgot Password</div>
                            </div>
                        </div>
                    </Col>
                    <Col md='2'>
                        <div className='footer-col fo_mt'>
                            <div className='footer_cont'>
                                <Link
                                    to={{ pathname: "tel:+1 00000 00000" }}
                                    target="_blank"
                                >
                                    +1 855-Mywngmn
                                </Link>
                            </div>
                            <div className='footer_cont'>
                                <Link
                                    to={{ pathname: "mailto:support@mywngmn.com" }}
                                    target="_blank"
                                >
                                    support@mywngmn.com
                                </Link>
                                <p>626 RexCorp Plaza 6th Floor Uniondale New York 11556.</p>
                                <div className="social_media">
                                    <FontAwesomeIcon
                                        icon={faInstagram}
                                        onClick={() => window.open('https://www.instagram.com/mywngmn')}
                                        target="_blank"
                                    />
                                    <FontAwesomeIcon
                                        icon={faFacebook}
                                        onClick={() => window.open('https://www.instagram.com/mywngmn')}
                                        target="_blank"
                                    />
                                    <FontAwesomeIcon
                                        icon={faTwitter}
                                        onClick={() => window.open('https://twitter.com/mywngmn')}
                                        target="_blank"
                                    />
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