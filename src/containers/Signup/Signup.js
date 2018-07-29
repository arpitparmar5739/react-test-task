import React, { Component, Fragment } from 'react';
import { Jumbotron, Container } from 'reactstrap';
import SignupForm from '../../components/SignupForm/SignupForm';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions';

class Signup extends Component {
  submitHandler = (values) => {
    this.props.onSignUp(values);
  }

  componentWillMount() {
    this.props.authMessageErrorReset();
  }

  render() {
    return (
      <Fragment>
        {this.props.authRedirectPath ? <Redirect to={this.props.authRedirectPath} /> : null}
        <Container>
          <Jumbotron>
            <h1 className="text-center">Sign Up</h1>
          </Jumbotron>
          <SignupForm
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
  onSignUp: (user) => dispatch(actions.auth(user)),
  authMessageErrorReset: () => dispatch(actions.authMessageErrorReset())
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);