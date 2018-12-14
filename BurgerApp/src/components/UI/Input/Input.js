import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputElement = null;

    switch(props.elementType) {
        case 'input':
            inputElement = <input 
                className={classes.InputElement} 
                value={props.value}                 
                {...props.elementConfig} />;
            break;
        case 'textarea':
            inputElement = <textarea
                className={classes.InputElement} 
                value={props.value} 
                {...props.elementConfig} />;
            break;
        case 'select':
            inputElement = (
                <select
                    className={classes.InputElement} 
                    value={props.value}>
                    {props.elementConfig.options.map(op => (
                        <option 
                            value={op.value}
                            key={op.value}>
                                {op.displayValue}
                        </option>
                    ))}
                    <option ></option>
                </select>
            );
            break;
        default:
            inputElement = <input 
                className={classes.InputElement} 
                value={props.value} 
                {...props.elementConfig} />;
    }

    return (
        <div>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;