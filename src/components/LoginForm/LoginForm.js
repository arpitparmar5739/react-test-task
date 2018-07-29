import React from 'react';
import { Button, Form, FormGroup, Label, Input, Col, FormFeedback, Alert } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import validator from 'validator';

const loginFormValidation = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!validator.isEmail(values.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Password should be atleast 6 characters long";
  }

  return errors;
};

const FormInput = ({ input, meta, label, type }) => {
  return (
    <FormGroup row>
      <Label for={input.name} sm={2}>{label}</Label>
      <Col sm={10}>
        <Input
          type={type}
          {...input}
          invalid={meta.error && meta.touched}
          valid={meta.valid}
          id={input.name} />
        <FormFeedback valid={meta.valid}>{meta.error}</FormFeedback>
      </Col>
    </FormGroup>
  );
};

const loginForm = ({ handleSubmit, submitHandler, submitMessage, submitError, underSubmission }) => {
  let alert = null;

  if (submitMessage) {
    alert = (
      <Alert color="success">
        {submitMessage}
      </Alert>
    );
  }

  if (submitError) {
    alert = (
      <Alert color="danger">
        {submitError}
      </Alert>
    );
  }

  return (
    <Form onSubmit={handleSubmit(submitHandler)}>
      <Col lg={{ size: 8, offset: 3 }}>
        {alert}
        <Field name="email" label="Email" component={FormInput} />
        <Field name="password" label="Password" type="password" component={FormInput} />
        <Col sm={{ size: 10, offset: 2 }}>
          <Button disabled={underSubmission} color="primary">Submit</Button>
        </Col>
      </Col>
    </Form>
  );
}

export default reduxForm({
  form: 'login',
  validate: loginFormValidation
})(loginForm);