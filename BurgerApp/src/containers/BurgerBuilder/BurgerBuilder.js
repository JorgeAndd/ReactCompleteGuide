import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';

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
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false
    }

    isPurchaseable = (ingredients) => {
        const sum = Object.values(ingredients)
            .reduce((sum, element) => {
                return sum + element
            });

        this.setState({
            purchaseable: sum > 0
        })
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type]++;

        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({
            totalPrice: updatedPrice,
            ingredients: updatedIngredients,
        });

        this.isPurchaseable(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };

        if (updatedIngredients[type] <= 0) {
            return;
        }


        updatedIngredients[type]--;

        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        this.setState({
            totalPrice: updatedPrice,
            ingredients: updatedIngredients
        });

        this.isPurchaseable(updatedIngredients);
    }

    purchaseHandle = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        // alert('You continue...');
        this.setState({ loading: true });

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice, // Should recalculate on server
            customer: {
                name: 'Andd',
                address: {
                    street: 'Testing',
                    zipCode: '12345',
                    country: 'Brazil'
                },
                email: 'test@test.com',
                deliveryMethod: 'fastest'
            }
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, purchasing: false })
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false })
            });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
            onCancel={this.purchaseCancelHandler}
            onContinue={this.purchaseContinueHandler} />

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandle} />
            </Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);