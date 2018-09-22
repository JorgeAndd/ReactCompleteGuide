import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.8,
    meat: 1.5,
    bacon: 1
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }
    
    addIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type]++;

        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        
        this.setState({
            totalPrice: updatedPrice,
            ingredients: updatedIngredients
        });
    }

    removeIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };

        if(updatedIngredients[type]  <= 0)
            return;

        updatedIngredients[type]--;

        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        
        this.setState({
            totalPrice: updatedPrice,
            ingredients: updatedIngredients
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler} 
                    disabled={disabledInfo}
                    price={this.state.totalPrice} />
            </Fragment>
        );
    }
}

export default BurgerBuilder;