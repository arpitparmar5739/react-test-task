import React, { Component, Fragment } from 'react';
import { Jumbotron, Container } from 'reactstrap';
import SignupForm from '../../components/SignupForm/SignupForm';

class Signup extends Component {
  submitHandler = (values) => {
    alert(JSON.stringify(values));
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