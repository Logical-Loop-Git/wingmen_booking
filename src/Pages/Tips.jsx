import axios from 'axios'
import React, { useState } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, ButtonGroup, Card, Col, Input, Row } from 'reactstrap'
import NavBar from '../Components/Header/NavBar'
import API from '../Config/api'
import { Context } from '../Data/context'
import tips from '../Images/tip.png'

const Tips = () => {

    const { isLoading, setIsLoading } = useContext(Context)
    const { bookingid, userid, cardid } = useParams();
    const [tip, setTip] = useState("")
    console.log(bookingid, userid, cardid);

    const handleNext = () => {
        setIsLoading(true)
        let url = API + `tipFromWebsite`;
        const body = {
            bookingId: bookingid,
            userId: userid,
            isTipPr: tip
        }
        console.log(body);
        axios
            .post(url, body)
            .then((response) => {
                console.log(response, 'tip');
                if (response.data.success === true) {
                    toast.success(response.data.message)
                    console.log(response)
                } else {
                    toast.warn(response.data.message)
                }
            })
            .catch((err) => {
                console.log("error here", err);
            })
            .finally(() => {
                setIsLoading(false)
            })

    }

    return (
        <section>
            <NavBar />
            <div className="header_padd">
                <div className="tips_block">
                    <Card>
                        <div align="center" className='tips_card'>
                            <h2>Tips</h2>
                            <h6>Leave a Tip?</h6>
                            <p>Tips are optional and split between both valets</p>
                        </div>
                        <div className='tips_footer'>
                            <div className="tips_body">
                                <ButtonGroup value={tip} onClick={(e) => setTip(e.target.value)} className="tip_btn">
                                    <Button value="0" color="white" style={{ borderRight: "1px solid lightgray" }}>No Tip</Button>
                                    <Button value="15" color="white" style={{ borderRight: "1px solid lightgray" }}>15%</Button>
                                    <Button value="20" color="white" style={{ borderRight: "1px solid lightgray" }}>20%</Button>
                                    <Button value="25" color="white" style={{ borderRight: "1px solid lightgray" }}>25%</Button>
                                    <Button color="white">
                                        <Input
                                            type="number"
                                            name="tip"
                                            id="tip"
                                            placeholder="Tip"
                                            value={tip}
                                            onChange={(e) => setTip(e.target.value)}
                                        />
                                    </Button>
                                </ButtonGroup>
                                <div className="tip_image">
                                    <img src={tips} alt="tips_iamge" />
                                </div>
                            </div>
                            <div style={{ padding: 10 }}>
                                {
                                    tip ? <Row>
                                        <Col md="12">
                                            {
                                                isLoading === true ? <button className="tips_btn">
                                                    <div class="spinner-border text-white" role="status">
                                                        <span class="visually-hidden">Loading...</span>
                                                    </div>
                                                </button> : <button className="tips_btn" onClick={handleNext}>next</button>
                                            }

                                        </Col>
                                    </Row>
                                        : null
                                }
                            </div>

                        </div>

                    </Card>
                </div>
            </div>
        </section>
    )
}

export default Tips
