import React from "react";
import { Col, Row } from "reactstrap";
import Footer from "../Components/Footer";
import NavBar from "../Components/Header/NavBar";
import { ServiceContent } from "../Data/ServiceContent";

const Service = () => {
  return (
    <section>
      <NavBar />
      <div className="container header_padd">
        <div className="service_block">
          {ServiceContent.length < 1
            ? "No homeData found"
            : ServiceContent.map((list, index) => {
                return index % 2 === 0 ? (
                  <Row className="service_row" key={index}>
                    <Col md={6}>
                      <img className="service_img" alt="" src={list.img} />
                    </Col>
                    <Col md={6}>
                      <div className="service_detail">
                        <h2>{list.title}</h2>
                        <p>{list.para}</p>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  <Row className="service_row" key={index}>
                    <Col md={6}>
                      <div className="service_detail">
                        <h2>{list.title}</h2>
                        <p>{list.para}</p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <img className="service_img" alt="" src={list.img} />
                    </Col>
                  </Row>
                );
              })}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Service;
