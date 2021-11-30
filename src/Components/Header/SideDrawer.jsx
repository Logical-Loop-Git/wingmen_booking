import React from 'react'
import { NavLink } from 'react-router-dom';

import './header.css'

const sideDrawer = (props) => {

    let drawerClasses = 'side-drawer';
    if (props.show) {
        drawerClasses = 'side-drawer open';
    }

    return (
        <nav className={drawerClasses}>
            <ul>
                <li>
                    <NavLink to="/" exact activeClassName="nav_active">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/booking" exact activeClassName="nav_active">
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
        </nav>
    )
}

export default sideDrawer