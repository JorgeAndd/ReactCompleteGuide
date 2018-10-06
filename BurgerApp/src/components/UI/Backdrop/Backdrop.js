import React from 'react';

import classes from './Backdrop.css';

const backdrop = (props) => {
    const backdrop = <div 
                        className={classes.Backdrop} 
                        onClick={props.clicked}>
                    </div>;

    return props.show ? backdrop : null;
};

export default backdrop;