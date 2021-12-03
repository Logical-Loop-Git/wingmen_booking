import React, { useCallback, useContext, useEffect, useState } from 'react'
import wallet from '../../Images/Icon/wallet.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import API from '../../Config/api'
import { Context } from '../../Data/context'
import useOnclickOutside from "react-cool-onclickoutside";
import AddWalletMoneyPopup from '../Popups/AddWalletMoneyPopup'
import AddCardPopup from '../Popups/AddCardPopup'


const Payment = () => {

    const { walletMoney, setwalletMoney, addCard, setAddCard } = useContext(Context)
    const [userWallet, setUserWallet] = useState('')
    const [userCard, setUserCard] = useState([])

    //API CALL FOR USER PROFILE
    const fetchUserDetail = useCallback(() => {
        const authData = JSON.parse(localStorage.getItem("wingmen_booking"));
        // car getUserProfile List
        let url = API + `getUserProfile`;
        const config = {
            headers: {
                Authorization: `${authData.token}`,
            }
        };
        axios
            .get(url, config)
            .then((response) => {
                if (response.data.success === true) {
                    setUserWallet(response.data.data.walletAmount)
                    setUserCard(response.data.data.userCard)
                }
            })
            .catch((err) => {
                console.log("error here", err);
            });
    }, []);

    const ref = useOnclickOutside(() => {
        if (walletMoney) {
            fetchUserDetail()
            setwalletMoney(false);
        }
        if (addCard) {
            fetchUserDetail()
            setAddCard(false);
        }
    });

    const onWalletPopup = () => {
        if (walletMoney === false) {
            setwalletMoney(true);
        } else {
            setwalletMoney(false);
        }
    };

    const onAddCardPopup = () => {
        if (addCard === false) {
            setAddCard(true);
        } else {
            setAddCard(false);
        }
    };

    useEffect(() => {
        fetchUserDetail()
    }, [])


    return (
        <div>
            {walletMoney && (
                <div className="popup_open" ref={ref}>
                    <AddWalletMoneyPopup />
                </div>
            )}
            {addCard && (
                <div className="popup_open" ref={ref}>
                    <AddCardPopup />
                </div>
            )}
            <div className="user_payment">
                <h2>Payment</h2>
                <div className="wallet_payment">
                    <div className="add_payment">
                        <h2>Wallet</h2>
                        <button onClick={() => onWalletPopup()}>
                            add money
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                    <div className="wallet_box">
                        <img className="img-fluid" src={wallet} alt="" />
                        <h2>$ {parseFloat(userWallet).toFixed(2)}</h2>
                    </div>
                </div>
                <div className="card_payment">
                    <div className="add_payment">
                        <h2>Card</h2>
                        <button onClick={() => onAddCardPopup()}>
                            add Card
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                    {userCard.length < 1
                        ? "No userCard found :("
                        : userCard.map((list, index) => {
                            return (
                                <div className="display_user_card" key={index}>
                                    <label htmlFor={'CARD'}>
                                        <p>•••• •••• •••• {list.last4Digits}</p>
                                        <p>{list.brand} - {list.expiryDate}</p>
                                    </label>
                                    <div className="card_delete">
                                        <button>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Payment
