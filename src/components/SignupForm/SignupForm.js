import React from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';

const FormInput = (props) => {
  return (
    <FormGroup row>
      <Label for={props.input.name} sm={2}>{props.label}</Label>
      <Col sm={10}>
        <Input type={props.type} {...props.input} id={props.input.name} />
      </Col>
    </FormGroup>
  );
};

const signupForm = ({ handleSubmit, submitHandler }) => (
  <Form onSubmit={handleSubmit(submitHandler)}>
    <Col lg={{ size: 8, offset: 3 }}>
      <Field name="email" label="Email" component={FormInput} />
      <Field name="password" label="Password" type="password" component={FormInput} />
      <Col sm={{ size: 10, offset: 2 }}>
        <Button color="primary">Submit</Button>
      </Col>
    </Col>
  </Form>
);

export default reduxForm({
  form: 'signup'
})(signupForm);