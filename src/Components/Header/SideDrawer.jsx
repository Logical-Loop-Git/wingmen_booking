import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { Context } from '../../Data/context';

import './header.css'

const sideDrawer = (props) => {

    const { userData } = useContext(Context)

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
                    <NavLink to="/service" exact activeClassName="nav_active">
                        Service
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/contact" exact activeClassName="nav_active">
                        Contact
                    </NavLink>
                </li>
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
        </nav>
    )
}

export default sideDrawer