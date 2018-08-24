import React from 'react';

const userOutput = (props) => {
    const style = {
        border: '1px solid grey',
        padding: '10px',
        margin: '10px',
        width: '50%',
        borderRadius: '10px'
    }

    return (
        <div style={style}>
            <p>Username: {props.name}</p>
            <p>Second Paragraph</p>
        </div>
    );
}

export default userOutput;