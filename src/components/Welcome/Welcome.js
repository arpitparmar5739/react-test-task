import React from 'react';
import { Link } from 'react-router-dom';
import { SIGN_UP } from '../../constants/routes';
import { Jumbotron, Container, Button } from 'reactstrap';

const welcome = (props) => (
  <div className="text-center">
    <Jumbotron>
      <h1>Welcome to React Test Application</h1>
    </Jumbotron>
    <Container>
      <Link to={SIGN_UP}>
        <Button color="primary">Signup</Button>
      </Link>
    </Container>
  </div>
);

export default welcome;