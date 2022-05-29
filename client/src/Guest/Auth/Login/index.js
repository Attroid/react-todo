import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import functions from 'shared/utils/functions';

const GuestAuthLogin = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: ({ email, password }) => {
      functions.login({ email, password });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h1>Login</h1>
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
      <Form.Group controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          placeholder='Password'
          type='password'
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
        />
        <Form.Text className='text-muted'>
          {formik.touched.password && formik.errors.password}
        </Form.Text>
      </Form.Group>

      <div className='d-flex justify-content-between pt-3 pb-2'>
        <Button className='px-5' type='submit'>
          Login
        </Button>
        <Link to='/auth/forgot-password'>Forgot password?</Link>
      </div>

      <p>
        Don't have an account? <Link to='/auth/signup'>Signup</Link>
      </p>
    </Form>
  );
};

export default GuestAuthLogin;
