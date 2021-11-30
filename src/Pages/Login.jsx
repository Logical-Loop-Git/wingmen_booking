import React from 'react'
import Footer from '../Components/Footer'
import NavBar from '../Components/Header/NavBar'
import logo from '../Images/Footer/logo.png'

const Login = () => {
    return (
        <section>
            <NavBar />
            <div className="container header_padd">
                <div className="login_page">
                    <div className="login_part">
                        <div className="login_heading">
                            <img className="img-fluid" src={logo} alt="" />
                            <h3>Get moving with <br /><span>Wingmen</span></h3>
                        </div>
                        <div className="login_form">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Email"
                            />
                            <input
                                type="password"
                                name="pass"
                                id="pass"
                                placeholder="Password"
                            />
                        </div>
                        <div className="login_forget">
                            <button className="btn_brand">login</button>
                            <button className="forget_btn">Forget Password?</button>
                        </div>
                        <div className="signup">
                            <h2>Don't have an account?<span>sign up</span></h2>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    )
}

export default Login
