import React, { useContext } from 'react'
import DrawerToggleButton from './DrawerToggleButton'
import logo from "../../Images/Footer/logo.png"
import './header.css'
import { NavLink } from 'react-router-dom';
import { Context } from '../../Data/context';

const toolbar = (props) => {

    const { userData } = useContext(Context)

    return (
        <header className="toolbar">
            <nav className="toolbar__navigation">
                <div className="toolbar__toggle-button">
                    <DrawerToggleButton click={props.drawerClickHandler} />
                </div>
                <div className="logo_content">
                    <div className="toolbar__logo">
                        <NavLink to="/">
                            <img className="img-fluid" src={logo} alt="wingmen" />
                        </NavLink>
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
                                <NavLink to="/service" exact activeClassName="nav_active">
                                    Service
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
                            <li>
                                {userData.firstName === undefined ?
                                    <NavLink to="/booking" exact activeClassName="nav_active">
                                        Sign In
                                    </NavLink>
                                    :
                                    <NavLink to="/userprofile" exact activeClassName="nav_active">
                                        {userData.firstName} {userData.lastName}
                                    </NavLink>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default toolbar