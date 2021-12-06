import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react'
import { Context } from '../../Data/context'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CardForm from '../Stripe/CardForm';
import '@stripe/stripe-js';


const AddCardPopup = () => {

    const { addCard, setAddCard } = useContext(Context)
    const stripePromise = loadStripe("pk_test_xICCC7UvMO1QVnvHYI4pjmcM002SNKwIhE");

    //CLOSE POPUP
    const onClosePopup = () => {
        if (addCard === false) {
            setAddCard(true);
        } else {
            setAddCard(false);
        }
    };


    return (
        <div>
            <div className="popup_close">
                <button onClick={() => onClosePopup()}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
            <h2 className="popup_heading">Add Credit Card.</h2>
            <div className="strip_add_card">
                <Elements stripe={stripePromise}>
                    <CardForm />
                </Elements>
            </div>
        </div>
    )
}

export default AddCardPopup
