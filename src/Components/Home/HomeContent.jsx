import React from 'react'
import { Col, Row } from 'reactstrap'
import { homeData } from '../../Data/HomeContent'
import play from '../../Images/Home/play_store.png'
import app from '../../Images/Home/app_store.png'
import app_hand from '../../Images/Home/app_hand.png'

const HomeContent = () => {

    return (
        <div className="home_content">
            <div className="home_service">
                <h2>Why Ride With <span>WINGMEN</span></h2>
                <Row>
                    {homeData.length < 1
                        ? "No homeData found :("
                        : homeData.map((list, index) => {
                            return (
                                <Col md={4} key={index}>
                                    <div className="services">
                                        <img className="img-fluid" src={list.img} alt="" />
                                        <h3>{list.title}</h3>
                                        <p>{list.para}</p>
                                    </div>
                                </Col>
                            );
                        })
                    }
                </Row>
            </div>
            <div className="home_download">
                <Row>
                    <Col md={6}>
                        <div className="app_download">
                            <h2>Download Now <span>Start Ride</span></h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sedLorem ipsum dolor sit amet consectetur adipiscing elit sed</p>
                            <div className="app_play_store">
                                <button>
                                    <img className="img-fluid" src={play} alt="" />
                                </button>
                                <button>
                                    <img className="img-fluid" src={app} alt="" />
                                </button>
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="app_download_img">
                            <img className="img-fluid" src={app_hand} alt="" />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default HomeContent
