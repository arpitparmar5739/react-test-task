import React, { Component, Fragment } from 'react';
import { Jumbotron, Container } from 'reactstrap';
import { auth, firebase } from '../../firebase';
import { SubmissionError } from 'redux-form';
import SignupForm from '../../components/SignupForm/SignupForm';

class Signup extends Component {
  submitHandler = (values) => {
    return auth.doCreateUserWithEmailAndPassword(values.email, values.password)
      .then(authUser => {
        firebase.auth.currentUser.updateProfile({
          displayName: values.firstname + " " + values.lastname
        }).then(() => {
          console.log(authUser);
        });
      })
      .catch(error => {
        throw new SubmissionError({
          _error: "Error: " + error.message
        });
      });
  }

  render() {
    return (
      <Fragment>
        <Jumbotron>
          <h1 className="text-center">Sign Up</h1>
        </Jumbotron>
        <Container>
          <SignupForm submitHandler={this.submitHandler} />
        </Container>
      </Fragment>
    );
  }
}

export default Signup;