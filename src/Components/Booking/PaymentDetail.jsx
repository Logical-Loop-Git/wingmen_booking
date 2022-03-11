import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../../Data/context';
import axios from 'axios';
import API, { stripLiveKey } from '../../Config/api';
import { toast } from 'react-toastify';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CardForm from '../Stripe/CardForm';

const PaymentDetail = () => {

    const {
        userData,
        setSelectedCard,
        bookingAmount,
        setPromoCode,
        setPaymentType,
        cardAddedStatus
    } = useContext(Context)
    const stripePromise = loadStripe(stripLiveKey);
    const [cardChecked, setCardChecked] = useState(true)
    const [userProfileDetail, setUserProfileDetail] = useState({})
    const [userCard, setUserCard] = useState([])
    const [promoC, setPromoC] = useState('')
    const [promoAmount, setPromoAmount] = useState(0)
    const [loading, setLoading] = useState(false)

    //API CALL FOR USER PROFILE
    const fetchUserProfile = useCallback(() => {
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
                    setUserProfileDetail(response.data.data)
                    setUserCard(response.data.data.userCard)
                }
            })
            .catch((err) => {
                console.log("error here", err);
            });
    }, []);

    //CHECK FOR PAYMENT METHOD
    const onSelectPaymentType = (checked) => {
        console.log(checked, 'onSelectPaymentType');
        setCardChecked(checked)
        if (checked === false) {
            setPaymentType('WALLET')
        } else if (checked === true) {
            setPaymentType('CARD')
        }
    }

    //SELECT USER CARD ID
    const onSelectCard = (id) => {
        console.log(id, `setSelectedCard`);
        setSelectedCard(id)
    }

    //APPLY FOR PROMO CODE
    const onPromoCheck = () => {
        setLoading(true)
        //API CALL FOR PROMO CHECK
        const body = {
            "promoCode": promoC,
            "booKingAmount": bookingAmount
        }
        console.log(body);
        let url = API + `applyPromCode`;
        const config = {
            headers: {
                Authorization: `${userData.token}`,
            }
        };
        axios
            .post(url, body, config)
            .then((response) => {
                console.log(response, 'applyPromCode');
                if (response.data.success === true) {
                    setPromoAmount(response.data.data.promoAmount)
                    setPromoCode(promoC)
                    toast.success(`Your promo code applied successfully.`)
                    setLoading(false)
                } else {
                    toast.warn(response.data.message)
                    setLoading(false)
                }
            })
            .catch((err) => {
                console.log("error here", err);
                setLoading(false)
            }).finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchUserProfile()
        if (cardAddedStatus) {
            fetchUserProfile()
        }
    }, [cardAddedStatus])

    return (
        <div className="display_payment">
            <h2>Payment</h2>
            <div className="payment_wallet">
                <h3>Wallet Payment</h3>
                <div className="payment_option">
                    <input
                        type="radio"
                        name="payment"
                        id={'WALLET'}
                        onChange={() => onSelectPaymentType(false)}
                    />
                    <label for={'WALLET'}>
                        Pay via Wallet (${parseFloat(userProfileDetail.walletAmount, 0).toFixed(2)})
                    </label>
                </div>
            </div>
            <div className="payment_card">
                <h3>Card Payment</h3>
                <div className="payment_option">
                    <input
                        type="radio"
                        name="payment"
                        checked={cardChecked}
                        id={'CARD'}
                        onChange={() => onSelectPaymentType(true)}
                    />
                    <label for={'CARD'}>
                        Pay via Card
                    </label>
                </div>
                {cardChecked &&
                    <div>
                        {userCard.length < 1
                            ? (<div className="strip_add_card">
                                <Elements stripe={stripePromise}>
                                    <CardForm />
                                </Elements>
                            </div>)
                            : (userCard.map((list, index) => {
                                return (
                                    <div className="display_user_card" key={index}>
                                        <input
                                            type="radio"
                                            name="card"
                                            id={'CARD'}
                                            onChange={(id) => onSelectCard(list._id)}
                                        />
                                        <label for={'CARD'}>
                                            <p>•••• •••• •••• {list.last4Digits}</p>
                                            <p>{list.brand} - {list.expiryDate}</p>
                                        </label>
                                    </div>
                                );
                            }))
                        }
                    </div>
                }
            </div>
            <div className="display_promo">
                <input
                    type="text"
                    name="promo"
                    id="promo"
                    placeholder="Redeem Promo Code"
                    value={promoC}
                    onChange={(e) => setPromoC(e.target.value)}
                />
                {
                    loading === true ? <button>
                        <div class="spinner-border text-white" role="status" style={{ height: 20, width: 20 }}>
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </button> : <button
                        onClick={() => onPromoCheck()}
                    >
                        <FontAwesomeIcon icon={faCheck} />
                    </button>
                }

            </div>
            <div className="display_total">
                <div className="d-flex justify-content-between">
                    <h3>Total</h3>
                    <p>$ {bookingAmount}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <h3>Promo Code</h3>
                    <p>-$ {promoAmount}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <h3>Total</h3>
                    <p>$ {bookingAmount - promoAmount}</p>
                </div>
            </div>
        </div>
    )
}

export default PaymentDetail
