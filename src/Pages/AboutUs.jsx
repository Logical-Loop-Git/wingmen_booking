import React from "react";
import Footer from "../Components/Footer";
import NavBar from "../Components/Header/NavBar";

const AboutUs = () => {
  return (
    <section>
      <NavBar />
      <div className="container header_padd">
        <div className="aboutus_block">
          <div className="aboutus_detail">
            <h2>About Us</h2>
            <p>
              Wingmen Technologies Inc is obsessed with freeing our customers
              from the most mundane but necessary tasks of life. Wingmen was
              born out of a desire to give a safe, commonsense, and affordable
              option to our customers to get them and/or their cars to wherever
              they may need. Our customers deserve to enjoy their lives safely
              and without regret. We understand that life is more busy than ever
              before, and every moment is valuable. Whether it be taking your
              car to get serviced or giving you a ride home in your car from
              your best friend’s wedding, a wingman will be there to help.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default AboutUs;
