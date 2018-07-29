import React, { Component, Fragment } from 'react';
import { Jumbotron, Container } from 'reactstrap';
import LoginForm from '../../components/LoginForm/LoginForm';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions';

class Login extends Component {
  submitHandler = (values) => {
    this.props.onLogin(values);
  }

  render() {
    const redirect = (
      this.props.authRedirectPath ?
        <Redirect to={this.props.authRedirectPath} /> :
        null
    );
    return (
      <Fragment>
        {redirect}
        <Container>
          <Jumbotron>
            <h1 className="text-center">Login</h1>
          </Jumbotron>
          <LoginForm
            submitHandler={this.submitHandler}
            submitError={this.props.error}
            submitMessage={this.props.message}
            underSubmission={this.props.submitting}
          />
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
  message: state.auth.message,
  submitting: state.auth.submitting,
  authRedirectPath: state.auth.authRedirectPath
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: (user) => dispatch(actions.authLogin(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);