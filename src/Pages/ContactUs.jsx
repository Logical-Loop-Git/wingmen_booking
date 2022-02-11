import React, { useContext } from "react";
import PhoneInput from "react-phone-input-2";
import { Col, Row } from "reactstrap";
import Footer from "../Components/Footer";
import NavBar from "../Components/Header/NavBar";
import wing from "../Images/Service/wing.jpg";
import care from "../Images/Service/care.jpg";
import Events from "../Images/Service/Events.jpg";
import { Context } from "../Data/context";

const ContactUs = () => {

  const {
    isLoading,
    //setIsLoading
  } = useContext(Context)

  return (
    <section>
      <NavBar />
      <div className="container header_padd">
        <div className="contact_block">
          <Row>
            <Col md={4}>
              <div className="contact_bg">
                <div className="contact_img">
                  <img alt="" className="contact_image1" src={wing} />
                  <img alt="" className="contact_image2" src={care} />
                  <img alt="" className="contact_image3" src={Events} />
                </div>
              </div>
            </Col>
            <Col md={8}>
              <div className="contact_head">
                <h2>Contact Us</h2>
                <p>
                  One of our work space expert will reach out to you based on
                  your communication preferences.
                </p>
              </div>
              <div className="contact_form">
                <p>Your details</p>
                <Row>
                  <Col md={6}>
                    <input
                      type="text"
                      id="fname"
                      placeholder="First name"
                      required
                    />
                  </Col>
                  <Col md={6}>
                    <input
                      type="text"
                      id="lname"
                      placeholder="Last name"
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <input
                      type="text"
                      id="email"
                      placeholder="Email"
                      required
                    />
                  </Col>
                  <Col md={6} className="phone_input">
                    <PhoneInput country={"us"} />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <input
                      type="text"
                      id="companyname"
                      placeholder="Company name"
                      required
                    />
                  </Col>
                  <Col md={6}>
                    <select
                      name="companysize"
                      id="companysize"
                      placeholder="Company size"
                    >
                      <option
                        selected="selected"
                        value=""
                      >
                        Company size
                      </option>
                      <option value="">50</option>
                      <option value="">100</option>
                    </select>
                  </Col>
                </Row>
                <input
                  type="text"
                  id="additionalinfo"
                  placeholder="Additional info"
                  required
                />
                <p>
                  By clicking the below button you agree to our Terms of
                  Service.
                </p>
                <div>
                  {
                    isLoading === true ? <button className="btn_brand">
                      <div class="spinner-border text-white" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </button> : <button className="btn_brand">Get in touch</button>
                  }
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default ContactUs;
