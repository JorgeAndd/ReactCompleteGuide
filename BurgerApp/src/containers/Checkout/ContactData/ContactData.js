import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price, // Should recalculate on server
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
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false })
            });
    }

    render() {
        let form = undefined;
        if(this.state.loading) {
            form = <Spinner />
        } else {
            form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Your Postal Code" />
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