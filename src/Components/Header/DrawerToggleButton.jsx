import React from 'react'
import './header.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";


const drawerToggleButton = props => (
    <button className="toggle-button" onClick={props.click}>
        <FontAwesomeIcon icon={faBars} size="2x" color="#0A9BE2" />
    </button>
)

export default drawerToggleButton