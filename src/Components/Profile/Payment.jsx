import React, { useCallback, useContext, useEffect, useState } from 'react'
import wallet from '../../Images/Icon/wallet.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import API, { stripLiveKey } from '../../Config/api'
import { Context } from '../../Data/context'
import useOnclickOutside from "react-cool-onclickoutside";
import AddWalletMoneyPopup from '../Popups/AddWalletMoneyPopup'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CardForm from '../Stripe/CardForm';
import { toast } from 'react-toastify'


const Payment = () => {

    const {
        userData,
        walletMoney,
        setwalletMoney,
        cardAddedStatus,
        setIsLoading,
        isLoading
    } = useContext(Context)
    const [userWallet, setUserWallet] = useState('')
    const [userCard, setUserCard] = useState([])
    const stripePromise = loadStripe(stripLiveKey);
    const [addCreditCard, setAddCreditCard] = useState(false)


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
    });

    //OPEN WALLET POPUP
    const onWalletPopup = () => {
        if (walletMoney === false) {
            setwalletMoney(true);
        } else {
            setwalletMoney(false);
        }
    };

    //ADD USER CARD
    const onAddCard = () => {
        //API FOR CARD CREATE INTENT
        setAddCreditCard(true)
        let url = API + `setUpIntent`;
        const config = {
            headers: {
                Authorization: `${userData.token}`,
            }
        };
        axios
            .post(url, {}, config)
            .then((response) => {
                if (response.data.success === true) {
                    console.log(response.data.data.setupIntent)
                }
            })
            .catch((err) => {
                console.log("error here", err);
            })
    }

    //DELETE USER CARD
    const onDeleteCard = (id) => {
        setIsLoading(true)
        //API FOR DELETE USER CARD
        let url = API + `deleteCard`;
        const config = {
            headers: {
                Authorization: `${userData.token}`,
            }
        };
        const body = {
            cardId: id
        }
        axios
            .post(url, body, config)
            .then((response) => {
                if (response.data.success === true) {
                    toast.dark(`Your card deleted successfully.`)
                    fetchUserDetail()
                }
            })
            .catch((err) => {
                console.log("error here", err);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        fetchUserDetail()
        if (cardAddedStatus) {
            fetchUserDetail()
        }
    }, [cardAddedStatus])


    return (
        <div>
            {walletMoney && (
                <div className="popup_open" ref={ref}>
                    <AddWalletMoneyPopup />
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
                        <button onClick={() => onAddCard()}>
                            add Card
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                    {addCreditCard &&
                        <div className="strip_add_card">
                            <Elements stripe={stripePromise}>
                                <CardForm />
                            </Elements>
                        </div>
                    }
                    {userCard.length < 1
                        ? "No userCard found :("
                        : userCard.map((list, index) => {
                            return (
                                <div className="display_user_card" key={index}>
                                    <label htmlFor={'CARD'}>
                                        <p>•••• •••• •••• {list.last4Digits}</p>
                                        <p>{list.brand} - {list.expiryDate}</p>
                                    </label>
                                    {
                                        isLoading === true ? <button className="btn_brand">
                                            <div class="spinner-border text-white" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                        </button> : <div className="card_delete">
                                            <button onClick={() => onDeleteCard(list._id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    }

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
