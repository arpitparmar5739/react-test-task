import React, { Component } from 'react';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import LeftSidebar from './LeftSidebar/LeftSidebar';

class Dashboard extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <Row style={{ marginTop: "70px" }}>
        <Col lg="2">
          <LeftSidebar
            displayName={this.props.displayName}
            status={this.props.status}
          />
        </Col>
        <Col style={{ background: "rgb(230,230,230)", border: "1px solid black" }} lg="7">
          <div>
            <h1>Middle</h1>
          </div>
        </Col>
        <Col lg="3">
          <div style={{ background: "red", color: "white" }}>
            <h3>Right</h3>
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  displayName: state.auth.displayName,
  profilePiture: state.auth.profilePiture,
  status: state.user.status
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(actions.authLogout()),
  loadUser: () => dispatch(actions.loadUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);