import React from 'react';

const validation = (props) => {
    let validationElement = <p>Text long enough</p>;

    if(props.textLength < 5) {
        validationElement = (
            <p>Text is too short</p>
        )
    } 
    
    return (
        <div>
            {validationElement}
        </div>
    );
}

export default validation;