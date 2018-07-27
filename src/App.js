import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Welcome from './components/Welcome/Welcome';
import { SIGN_UP } from './constants/routes';
import Signup from './containers/Signup/Signup';


class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path={SIGN_UP} component={Signup} />
          <Route path="/" component={Welcome} />
        </Switch>
      </div>
    );
  }
}

export default App;