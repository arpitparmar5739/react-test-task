import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Welcome from './components/Welcome/Welcome';
import { SIGN_UP, LOGIN, LOGOUT, ROOT } from './constants/routes';
import { connect } from 'react-redux';
import * as actions from './store/actions';

import Signup from './containers/Signup/Signup';
import Login from './containers/Login/Login';
import Dashboard from './containers/Dashboard/Dashboard';
import Logout from './containers/Logout/Logout';

import Navbar from './components/UI/Navbar/Navbar';

class App extends Component {
  componentWillMount() {
    this.props.checkAuthenticationState();
  }

  render() {
    let routes = (
      <Switch>
        <Route path={SIGN_UP} component={Signup} />
        <Route path={LOGIN} component={Login} />
        <Route path={ROOT} exact component={Welcome} />
        <Redirect to={ROOT} />
      </Switch>
    );

    if (this.props.authRedirectPath) {
      routes = (
        <Switch>
          <Route path={LOGOUT} component={Logout} />
          <Route path={this.props.authRedirectPath} component={Dashboard} />
          <Redirect to={this.props.authRedirectPath} />
        </Switch>
      );
    }

    return (
      <div>
        <Navbar
          isAuthenticated={this.props.isAuthenticated}
          activeLink={this.props.location.pathname}
          displayName={this.props.displayName || "Awesome App"} 
        />
        {routes}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authRedirectPath: state.auth.authRedirectPath,
  isAuthenticated: !!state.auth.idToken,
  displayName: state.auth.displayName
});

const mapDispatchToProps = (dispatch) => ({
  checkAuthenticationState: () => dispatch(actions.authCheckState())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));