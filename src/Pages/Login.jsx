import React, { useContext, useState } from "react";
import Footer from "../Components/Footer";
import NavBar from "../Components/Header/NavBar";
import logo from "../Images/Footer/logo.png";
import API from "../Config/api";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { Context } from "../Data/context";

const Login = () => {
  const history = useHistory();
  const { setToken, setUserData, isLoading, setIsLoading } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //API FOR USER LOGIN
  const onSubmit = () => {
    setIsLoading(true);
    const body = {
      deviceType: "web",
      password: password,
      phone: email,
    };
    let url = API + `signIn`;
    if (password === "" || email === "") {
      toast.dark("Please fill phone number and password to login.");
    } else {
      axios
        .post(url, body)
        .then((response) => {
          console.log(response);
          if (response.data.success === true) {
            console.log(response);
            toast.dark("Login done");
            localStorage.setItem(
              "wingmen_booking",
              JSON.stringify(response.data.data)
            );
            setUserData(response.data.data);
            setToken(response.data.data.token);
            history.push(`/booking`);
          } else if (
            response.data.message === "User does not exist." ||
            response.data.success === false
          ) {
            toast.dark(
              `User doesn't exist in our database you might enter wrong email.`
            );
          } else if (
            response.data.message === "Password is invalid." ||
            response.data.success === false
          ) {
            toast.dark(`You have entered wrong password.`);
          }
        })
        .catch((err) => {
          console.log("error here", err.response);
        })
        .finally(() => {
            setIsLoading(false)
        });
    }
  };

  //REDIRECT TO SIGN UP PAGE
  const onSignup = () => {
    history.push(`/signup`);
  };

  return (
    <section>
      <NavBar />
      <div className="container header_padd">
        <div className="login_page">
          <div className="login_part">
            <div className="login_heading">
              <img className="img-fluid" src={logo} alt="" />
              <h3>
                Get moving with <br />
                <span>Wingmen</span>
              </h3>
            </div>
            <div className="login_form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Email / Phone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                name="pass"
                id="pass"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login_forget">
              {isLoading ? (
                <button className="btn_brand">
                  <div class="spinner-border text-white" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </button>
              ) : (
                <button className="btn_brand" onClick={() => onSubmit()}>
                  login
                </button>
              )}
              <button className="forget_btn">Forget Password?</button>
            </div>
            <div className="signup">
              <h2>
                Don't have an account?
                <span onClick={() => onSignup()}>sign up</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Login;
