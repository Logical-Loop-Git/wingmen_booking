import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../../Data/context';
import axios from 'axios';
import API from '../../Config/api';


const PaymentDetail = () => {

    const {
        userData,
        setSelectedCard,
        bookingAmount,
        setPromoCode,
        setPaymentType
    } = useContext(Context)
    const [cardChecked, setCardChecked] = useState(true)
    const [promoC, setPromoC] = useState('')
    const [promoAmount, setPromoAmount] = useState(0)

    const onSelectCard = (id) => {
        console.log(id, `setSelectedCard`);
        setSelectedCard(id)
    }

    const onSelectPaymentType = (checked) => {
        console.log(checked, 'onSelectPaymentType');
        setCardChecked(checked)
        if (checked === false) {
            setPaymentType('WALLET')
        } else {
            setPaymentType('CARD')
        }
    }

    const onPromoCheck = () => {
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
                if (response.data.success === true) {
                    console.log(response, 'applyPromCode');
                    setPromoAmount(response.data.data.promoAmount)
                    setPromoCode(promoC)
                }
            })
            .catch((err) => {
                console.log("error here", err);
            });
    }

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
                        Pay via Wallet (${userData.walletAmount})
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
                        {
                            userData.userCard.length < 1
                                ? "No userCard found :("
                                : userData.userCard.map((list, index) => {
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
                                })
                        }
                    </div>
                }
            </div>
            <div className="display_promo">
                <input
                    type="text"
                    name="promo"
                    id="promo"
                    placeholder="Reedom Promo Code"
                    value={promoC}
                    onChange={(e) => setPromoC(e.target.value)}
                />
                <button
                    onClick={() => onPromoCheck()}
                >
                    <FontAwesomeIcon icon={faCheck} />
                </button>
            </div>
            <div className="display_total">
                <div className="d-flex justify-content-between">
                    <h3>Tolal</h3>
                    <p>$ {bookingAmount}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <h3>PromoCode</h3>
                    <p>-$ {promoAmount}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <h3>Total</h3>
                    <p>$ {parseInt(bookingAmount - promoAmount, 0)}</p>
                </div>
            </div>
        </div>
    )
}

export default PaymentDetail
