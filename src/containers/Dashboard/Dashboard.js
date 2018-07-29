import React, { Component } from 'react';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LOGOUT } from '../../constants/routes';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <div>Welcome to your Dashboard buddy ;)</div>
        <div><Link to={LOGOUT}>Logout</Link></div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(actions.authLogout())
});

export default connect(null, mapDispatchToProps)(Dashboard);