import React, { useMemo, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import API from "../../Config/api";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";

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

const EventCardForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)

        if (!stripe || !elements) {
            return;
        }
        const payload = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });
        console.log("[PaymentMethod]", payload);

        if (payload) {
            let url = API + `addEventCard`;
            const eventToken = localStorage.getItem("eventToken")
            const config = {
                headers: {
                    Authorization: `${eventToken}`,
                },
            };

            console.log(payload, "payload");
            const body = {
                stripePaymentMethod: payload.paymentMethod.id,
            };
            console.log(body)
            axios
                .post(url, body, config)
                .then((response) => {
                    console.log(response.data.data);
                    if (response.data.success === true) {
                        toast.success(`Your card added successfully.`);
                        setLoading(false)
                    } else {
                        toast.dark(`Having some trouble to add card.`);
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
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Card details
                <Row>
                    <Col md="10" >
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
                    </Col>
                    <Col md="2" style={{ marginTop: 5 }}>
                        {
                            loading === true ? <button className="btn_event_brand">
                                <div class="spinner-border text-white" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </button> : <button type="submit" className="btn_event_brand">Add</button>
                        }

                    </Col>
                </Row>
            </label>
        </form>
    );
};

export default EventCardForm;
