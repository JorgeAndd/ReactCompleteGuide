import React from 'react';

const validationComponent = (props) => {
    var validationElement = null;

    if(props.textLength < 5) {
        validationElement = (
            <p>Text is too short</p>
        )
    } else if(props.textLength > 15) {
        validationElement = (
            <p>Text is too long</p>
        )
    }

    return (
        <div>
            {validationElement}
        </div>
    );
}

export default validationComponent;