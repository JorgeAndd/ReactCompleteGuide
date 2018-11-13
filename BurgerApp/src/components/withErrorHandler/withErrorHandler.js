import React, { Component, Fragment } from 'react';

import Modal from '../UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        
        componentWillMount() {
            axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req;
            });  

            axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error })
            });
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Fragment>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : ''}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }
    }
}

export default withErrorHandler;