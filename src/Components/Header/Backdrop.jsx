import React from 'react';

import './header.css';

const backdrop = props => (
    <div className="backdrop" onClick={props.click} />
);

export default backdrop;