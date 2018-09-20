import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let ingredients = Object.keys(props.ingredients)
                            .map(key => {
                                return [...Array(props.ingredients[key])].map((_, i) => {
                                    return <BurgerIngredient key={key + '_' + i} type={key} />
                                });
                            })
                            .reduce((prev, current) => {
                                return prev.concat(current);
                            }, []);

    if (ingredients.length === 0) {
        ingredients = <p>Please start adding ingredients</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredients}
            <BurgerIngredient type="bread-bottom" />
        </div>        
    );
};

export default burger;