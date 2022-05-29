import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import functions from 'shared/utils/functions';

const GuestAuthSignup = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      passwordRetype: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .min(3, 'Must be atleast 3 letters')
        .max(20, 'Must be atleast 20 letters'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string()
        .min(5, 'Must be atleast 5 letters')
        .required('Password is required'),
      passwordRetype: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password retype is required'),
    }),
    onSubmit: ({ username, email, password }) => {
      functions.register({ username, email, password });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h1>Signup</h1>
      <Form.Group controlId='username'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          placeholder='username'
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Form.Text className='text-muted'>
          {formik.touched.username && formik.errors.username}
        </Form.Text>
      </Form.Group>
      <Form.Group controlId='email'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          placeholder='Email address'
          value={formik.values.email}
          onChange={formik.handleChange}
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
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Form.Text className='text-muted'>
          {formik.touched.password && formik.errors.password}
        </Form.Text>
      </Form.Group>
      <Form.Group controlId='passwordRetype'>
        <Form.Label>Repeat password</Form.Label>
        <Form.Control
          placeholder='Retype password'
          type='password'
          value={formik.values.passwordRetype}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Form.Text className='text-muted'>
          {formik.touched.passwordRetype && formik.errors.passwordRetype}
        </Form.Text>
      </Form.Group>
      <Button className='px-5 mt-3 mb-2' type='submit'>
        Register
      </Button>
      <p>
        Already have an account? <Link to='/auth/login'>Login</Link>
      </p>
    </Form>
  );
};

export default GuestAuthSignup;
