import React, { useCallback, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import api from '../../config/api'
import axios from 'axios'
import { useHistory } from 'react-router';
import ShowMoreText from "react-show-more-text";


const NavBarCart = () => {

    const history = useHistory()
    const [getCartProduct, setGetCartProduct] = useState([])
    const [cartSubtotal, setCartSubtotal] = useState(0)

    const fetchCart = useCallback(() => {
        // cart product
        const authData = JSON.parse(localStorage.getItem("carWashAuth"));
        const localCart = JSON.parse(localStorage.getItem("carWashCart"))
        if (authData) {
            //server cart
            const url = api + `cart/getcart/${authData.phoneNumber}`;
            axios
                .get(url)
                .then((response) => {
                    setGetCartProduct(response.data.data.products)
                    //calculate subtotal
                    const cartPrice = []
                    for (let i = 0; i < response.data.data.products.length; i++) {
                        const element = response.data.data.products[i];
                        let total = element.products.price
                        cartPrice.push(total)
                        let sum = cartPrice.reduce((a, b) => {
                            return a + b;
                        });
                        setCartSubtotal(sum)
                    }
                })
                .catch((err) => {
                    console.log("error here", err);
                });
        } else if (localCart) {
            // local cart 
            const url = api + `cart/getcart/${localCart.cartId}`;
            axios
                .get(url)
                .then((response) => {
                    setGetCartProduct(response.data.data.products)
                    //calculate subtotal
                    const cartPrice = []
                    for (let i = 0; i < response.data.data.products.length; i++) {
                        const element = response.data.data.products[i];
                        let total = element.products.price
                        cartPrice.push(total)
                        let sum = cartPrice.reduce((a, b) => {
                            return a + b;
                        });
                        setCartSubtotal(sum)
                    }
                })
                .catch((err) => {
                    console.log("error here", err);
                });
        }
    }, []);

    const onRemoveProduct = (id) => {
        const authData = JSON.parse(localStorage.getItem("carWashAuth"));
        const localCart = JSON.parse(localStorage.getItem("carWashCart"))
        if (authData) {
            const body = {
                "type": "products",
                "products": id
            }
            let url = api + `cart/delete/${authData.phoneNumber}`;
            axios
                .post(url, body)
                .then((response) => {
                    if (response.data.message === "Product delete success") {
                        fetchCart()
                    }
                })
                .catch((err) => {
                    console.log("error here", err);
                });
        }
        if (localCart) {
            const body = {
                "type": "products",
                "products": id
            }
            let url = api + `cart/delete/${localCart.cartId}`;
            axios
                .post(url, body)
                .then((response) => {
                    if (response.data.message === "Product delete success") {
                        fetchCart()
                    }
                })
                .catch((err) => {
                    console.log("error here", err);
                });
        }
    }

    const onCart = () => {
        history.push(`/cart`)
    }

    useEffect(() => {
        fetchCart()
    }, [])


    return (
        <div className="cart_nav">
            <h2>Cart</h2>
            <hr />
            {getCartProduct.length < 1
                ? "No Product found :("
                : getCartProduct.map((list, index) => {
                    return (
                        <div className="cart_nav_product" key={index}>
                            <div className="cart_nav_product_cls">
                                <FontAwesomeIcon icon={faTimesCircle} onClick={(id) => onRemoveProduct(list.products._id)} />
                            </div>
                            <div className="cart_nav_product_name">
                                <h3>
                                    <ShowMoreText
                                        lines={1}
                                        more=" "
                                        less=" "
                                        className="content-css"
                                        anchorClass="my-anchor-css-class"
                                        onClick={this.executeOnClick}
                                        expanded={false}
                                        width={150}
                                        truncatedEndingComponent={"... "}
                                    >
                                        {list.products.name}
                                    </ShowMoreText>
                                </h3>
                                <p><span>INR</span> {list.products.price}/-</p>
                            </div>
                            <div className="cart_nav_product_img">
                                <img src={list.products.image[0]} alt="" />
                            </div>
                        </div>
                    );
                })}
            <hr />
            <div className="cart_nav_product_total">
                <h4>Subtotal: </h4>
                <p><span>INR</span> {cartSubtotal}/-</p>
            </div>
            <hr />
            <div className="cart_nav_btn">
                <button className="cart_nav_view_btn" onClick={() => onCart()}>VIEW CART</button>
                <button className="cart_nav_check_btn">CHECKOUT</button>
            </div>
        </div>
    )
}

export default NavBarCart
