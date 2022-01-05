import React, { useContext, useMemo } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Context } from "../../Data/context";
import axios from "axios";
import API from "../../Config/api";
import { toast } from "react-toastify";

const useOptions = () => {
    const options = useMemo(
        () => ({
            style: {
                base: {
                    fontSize: "15px",
                    color: "#424770",
                    letterSpacing: "0.025em",
                    fontFamily: "Source Code Pro, monospace",
                    "::placeholder": {
                        color: "#aab7c4",
                    },
                },
                invalid: {
                    color: "#9e2146",
                },
            },
        }),
        []
    );

    return options;
};

const CardForm = () => {
    const { userData, setCardAddedStatus } = useContext(Context);
    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const payload = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });
        console.log("[PaymentMethod]", payload);

        if (payload) {
            let url = API + `addCard`;
            const config = {
                headers: {
                    Authorization: `${userData.token}`,
                },
            };
            const body = {
                stripePaymentMethod: payload.paymentMethod.id,
            };
            axios
                .post(url, body, config)
                .then((response) => {
                    console.log(response.data.data);
                    if (response.data.success === true) {
                        toast.dark(`Your card added successfully.`);
                        setCardAddedStatus(true);
                    } else {
                        toast.dark(`Having some trouble to add card.`);
                    }
                })
                .catch((err) => {
                    console.log("error here", err);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Card details
                <CardElement
                    options={options}
                    onReady={() => {
                        console.log("CardElement [ready]");
                    }}
                    onChange={(event) => {
                        console.log("CardElement [change]", event);
                    }}
                    onBlur={() => {
                        console.log("CardElement [blur]");
                    }}
                    onFocus={() => {
                        console.log("CardElement [focus]");
                    }}
                />
            </label>{" "}
            <button className="btn_brand" type="submit" disabled={!stripe}>
                Add
            </button>
        </form>
    );
};

export default CardForm;
