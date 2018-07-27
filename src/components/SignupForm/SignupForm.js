import React from 'react';
import { Button, Form, FormGroup, Label, Input, Col, FormFeedback, Alert } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import validator from 'validator';

const signupFormValidation = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!validator.isEmail(values.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!values.firstname) {
    errors.firstname = "Required";
  }
  
  if (!values.lastname) {
    errors.lastname = "Required";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Password should be atleast 6 characters long";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Required"
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords does not match"
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

const signupForm = ({ handleSubmit, submitHandler, submitting, error }) => {
  let alert = null;

  if (submitting) {
    alert = (
      <Alert disabled={true} color="success">
        Signing up please wait...
      </Alert>
    );
  }

  if (error) {
    alert = (
      <Alert disabled={true} color="danger">
        {error}
      </Alert>
    );
  }

  return (
    <Form onSubmit={handleSubmit(submitHandler)}>
      <Col lg={{ size: 8, offset: 3 }}>
        {alert}
        <Field name="firstname" label="First Name" component={FormInput} />
        <Field name="lastname" label="Last Name" component={FormInput} />
        <Field name="email" label="Email" component={FormInput} />
        <Field name="password" label="Password" type="password" component={FormInput} />
        <Field name="confirmPassword" label="Confirm Password" type="password" component={FormInput} />
        <Col sm={{ size: 10, offset: 2 }}>
          <Button disabled={submitting} color="primary">Submit</Button>
        </Col>
      </Col>
    </Form>
  );
}

export default reduxForm({
  form: 'signup',
  validate: signupFormValidation
})(signupForm);