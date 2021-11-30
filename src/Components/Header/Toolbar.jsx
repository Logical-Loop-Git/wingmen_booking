import React from 'react'
import DrawerToggleButton from './DrawerToggleButton'
import logo from "../../Images/Footer/logo.png"
import './header.css'
import { NavLink } from 'react-router-dom';

const toolbar = (props) => {

    return (
        <header className="toolbar">
            <nav className="toolbar__navigation">
                <div className="toolbar__toggle-button">
                    <DrawerToggleButton click={props.drawerClickHandler} />
                </div>
                <div className="logo_content">
                    <div className="toolbar__logo">
                        <a href="/">
                            <img className="img-fluid" src={logo} alt="wash-clean" />
                        </a>
                    </div>
                    <div className="toolbar_navigation-items">
                        <ul>
                            <li>
                                <NavLink to="/" exact activeClassName="nav_active">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/booking" className="dropdown" exact activeClassName="nav_active">
                                    Booking
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" exact activeClassName="nav_active">
                                    About Us
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" exact activeClassName="nav_active">
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="toolbar_navigation-items">
                        <ul>
                            <NavLink to="/login" exact activeClassName="nav_active">
                                Sign In
                            </NavLink>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default toolbar