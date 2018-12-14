import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';

import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        orderForm: {
                name: this.generateInputConfig('input', 'text', 'Your name', '', true),
                street: this.generateInputConfig('input', 'text', 'Street', '', true),
                zipCode: this.generateInputConfig('input', 'text', 'ZIP Code', '', true),
                country: this.generateInputConfig('input', 'text', 'Country', '', true),
                email: this.generateInputConfig('input', 'email', 'Your mail', '', true),
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    }
                }
        },
        loading: false
    }

    generateInputConfig(type, configType, placeholder, value = '', required = false) {
        const config = {
            elementType: type, 
            elementConfig: {
                type: configType,
                placeholder: placeholder
            },
            value: value,
            validation: {
                required: required,
                valid: false,
                touched: false
            }            
        };

        return config;
    }


    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });

        const formData = {};
        for(let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, purchasing: false })
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false })
            });
    }

    checkValidity(value, rules) {
        if(! rules.touched)
            return true

        let isValid = false;

        if(rules && rules.required) {
            isValid = value.trim() !== '';
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.validation.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.validation.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        this.setState({orderForm: updatedOrderForm});
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = undefined;
        if(this.state.loading) {
            form = <Spinner />
        } else {
            form = (
                <form onSubmit={this.orderHandler}>
                    {formElementsArray.map(elem => (
                        <Input 
                            key={elem.id}
                            elementType={elem.config.elementType}
                            elementConfig={elem.config.elementConfig}
                            value={elem.config.value} 
                            changed={(event) => this.inputChangedHandler(event, elem.id)}
                            validation={elem.config.validation}/>
                    ))}
                    <Button type="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>);
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;