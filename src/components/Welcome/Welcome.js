import React from 'react';
import { Link } from 'react-router-dom';
import { SIGN_UP, LOGIN } from '../../constants/routes';
import { Jumbotron, Container, Button, Col, Row } from 'reactstrap';

const welcome = (props) => (
  <div className="text-center">
    <Container>
      <Jumbotron>
        <h1>Welcome to React Test Application</h1>
      </Jumbotron>
      <Row>
        <Col xs="6" className="text-right">
          <Link to={SIGN_UP}>
            <Button color="primary">Signup</Button>
          </Link>
        </Col>
        <Col xs="6" className="text-left">
          <Link to={LOGIN}>
            <Button color="primary">Login</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  </div>
);

export default welcome;