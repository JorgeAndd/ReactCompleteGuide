import React, { Component } from 'react';

class Course extends Component {
    state = {
        id: undefined,
        title: undefined
    }
    
    componentDidMount() {
        const id = this.props.match.params.id;
        const params = new URLSearchParams(this.props.location.search);
        const title = params.get('title');

        this.setState({id: id, title: title});
    }
    
    render () {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <p>You selected the Course with ID: {this.state.id}</p>
            </div>
        );
    }
}

export default Course;