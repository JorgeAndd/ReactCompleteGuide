import React, { Component } from 'react';

import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

class App extends Component {
  state = {
    usernames: ['John', 'Jane']
  }

  changeUsernameHandler = () => {
      this.setState({
        usernames: ['John Doe', 'Jane Doe']
      })
  }

  usernameChangedHandler = (event) => {
      this.setState({
        usernames: [event.target.value, this.state.usernames[1]]
      })
  }

  render() {
    const buttonStyle = {
      background: 'cornflowerblue',
      padding: '4px'
    }

    return (
      <div>
        <UserInput 
          changed={this.usernameChangedHandler}
          username={this.state.usernames[0]}></UserInput>
        <button 
          style={buttonStyle}
          onClick={this.changeUsernameHandler}>Change username</button>
        <UserOutput 
          name={this.state.usernames[0]}></UserOutput>
        <UserOutput 
          name={this.state.usernames[1]}></UserOutput>
      </div>
    );
  }
}

export default App;
