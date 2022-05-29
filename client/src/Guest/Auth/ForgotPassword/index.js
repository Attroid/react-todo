import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import functions from 'shared/utils/functions';
import { useState } from 'react';

const GuestAuthForgotPassword = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Email is required'),
    }),
    onSubmit: ({ email }) => {
      functions.requestPasswordReset({ email });
      setFormSubmitted(true);
    },
  });

  if (formSubmitted) {
    return (
      <>
        <p>You've been emailed a password reset link.</p>
        <Link to='/auth/login'>Go to login</Link>
      </>
    );
  }

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h1>Forgot your password?</h1>
      <p>
        To reset your password, please enter the email address of your React
        Todo account.
      </p>
      <Form.Group controlId='email'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          placeholder='Email address'
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
        />
        <Form.Text className='text-muted'>
          {formik.touched.email && formik.errors.email}
        </Form.Text>
      </Form.Group>

      <div className='d-flex justify-content-between pt-3 pb-2'>
        <Button className='px-5' type='submit'>
          Reset my password
        </Button>
        <Link to='/auth/login'>Go to login</Link>
      </div>
    </Form>
  );
};

export default GuestAuthForgotPassword;
