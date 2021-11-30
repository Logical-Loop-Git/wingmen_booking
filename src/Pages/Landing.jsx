import React from 'react'
import Footer from '../Components/Footer'
import NavBar from '../Components/Header/NavBar'
import HomeBooking from '../Components/Home/HomeBooking'
import HomeContent from '../Components/Home/HomeContent'
import HomeLogin from '../Components/Home/HomeLogin'


const Landing = () => {
    return (
        <section>
            <NavBar />
            <div className="container header_padd">
                <HomeLogin />
                <HomeBooking />
                <HomeContent />
            </div>
            <Footer />
        </section>
    )
}

export default Landing
