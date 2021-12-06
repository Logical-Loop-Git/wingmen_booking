import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Col, Row } from 'reactstrap';
import API from '../../Config/api';
import { Context } from '../../Data/context'

const AddWalletMoneyPopup = () => {

    const { 
        userData, 
        walletMoney, 
        setwalletMoney
     } = useContext(Context)
    const [userCard, setUserCard] = useState([])
    const [selectedCardid, setSelectedCardid] = useState('')
    const [rechargeAmount, setRechargeAmount] = useState(0)

    //API CALL FOR USER PROFILE
    const fetchUserDetail = useCallback(() => {
        // car getUserProfile List
        let url = API + `getUserProfile`;
        const config = {
            headers: {
                Authorization: `${userData.token}`,
            }
        };
        axios
            .get(url, config)
            .then((response) => {
                if (response.data.success === true) {
                    setUserCard(response.data.data.userCard)
                }
            })
            .catch((err) => {
                console.log("error here", err);
            });
    }, []);

    //CLOSE POPUP
    const onClosePopup = () => {
        if (walletMoney === false) {
            setwalletMoney(true);
        } else {
            setwalletMoney(false);
        }
    };

    //SELECT USER CARD
    const onSelectCard = (id) => {
        console.log(id, `setSelectedCard`);
        setSelectedCardid(id)
    }

    //API FOR ADD MONEY IN WALLET
    const onAddMoney = () => {
        const body = {
            "cardId": selectedCardid,
            "amount": parseInt(rechargeAmount, 0)
        }
        const config = {
            headers: {
                Authorization: `${userData.token}`,
            }
        };
        if (selectedCardid === '' || rechargeAmount === 0) {
            toast.dark(`You have not select any card or amount.`)
        } else {
            let url = API + `chargeWallet`;
            axios
                .post(url, body, config)
                .then((response) => {
                    console.log(response, 'chargeWallet');
                    if (response.data.success === true) {
                        console.log(response, 'chargeWallet');
                        toast.dark(`Your wallet recharge successfully.`)
                        onClosePopup()
                    } else if (response.data.message === "Invalid Card.") {
                        toast.dark(`Your card might be expire.`)
                    }
                })
                .catch((err) => {
                    console.log("error here", err);
                });
        }
    }

    useEffect(() => {
        fetchUserDetail()
    }, [])


    return (
        <div>
            <div className="popup_close">
                <button onClick={() => onClosePopup()}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
            <h2 className="popup_heading">Add Payment in Wallet.</h2>
            <div>
                <Row>
                    <Col md={6}>
                        <div className="wallet_field">
                            <h3>Fill Amount</h3>
                            <div className="user_input">
                                <label htmlFor="wallet_amount">Add Amount:</label>
                                <input
                                    type="number"
                                    name="wallet_amount"
                                    id="wallet_amount"
                                    placeholder="Add Amount"
                                    value={rechargeAmount}
                                    onChange={(e) => setRechargeAmount(e.target.value)}
                                />
                                <button
                                    className="btn_brand"
                                    onClick={() => onAddMoney()}
                                >
                                    Add in wallet
                                </button>
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="card_field">
                            <h3>Your Cards</h3>
                            {userCard.length < 1
                                ? "No userCard found :("
                                : userCard.map((list, index) => {
                                    return (
                                        <div className="display_user_card" key={index}>
                                            <input
                                                type="radio"
                                                name="card"
                                                id={'CARD'}
                                                onChange={(id) => onSelectCard(list._id)}
                                            />
                                            <label htmlFor={'CARD'}>
                                                <p>•••• •••• •••• {list.last4Digits}</p>
                                                <p>{list.brand} - {list.expiryDate}</p>
                                            </label>
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

export default AddWalletMoneyPopup
