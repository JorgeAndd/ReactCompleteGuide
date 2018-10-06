import React, { Fragment } from 'react';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(ingredient => {
            return <li key={ingredient}>
                    <span style={{ textTransform: 'capitalize' }}>
                        {ingredient}: {props.ingredients[ingredient]}
                    </span>
                    </li >
        });

return (
    <Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
            {ingredientSummary}
        </ul>
        <p>Proceede to Checkout?</p>
    </Fragment>
);
};

export default orderSummary;