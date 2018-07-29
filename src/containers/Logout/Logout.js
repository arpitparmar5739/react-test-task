import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ROOT } from '../../constants/routes';
import * as actions from '../../store/actions';

class Logout extends Component {
  componentWillMount() {
    this.props.onLogout();
  }

  render() {
    return (<Redirect to={ROOT} />);
  }
}

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => {
    return dispatch(actions.authLogout())
  }
});

export default connect(null, mapDispatchToProps)(Logout);