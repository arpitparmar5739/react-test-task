import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Jumbotron>
          <h1>Welcome to React Test Application</h1>
        </Jumbotron>
      </div>
    );
  }
}

export default App;