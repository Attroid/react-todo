import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import functions from 'shared/utils/functions';
import { useState } from 'react';
import useQuery from 'shared/hooks/useQuery';
import { Navigate } from 'react-router-dom';

const GuestAuthAccountDelete = () => {
  const query = useQuery();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: Yup.object().shape({
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: ({ password }) => {
      functions.deleteAccount({
        password,
        userDeleteToken: query.get('userDeleteToken'),
      });
      setFormSubmitted(true);
    },
  });

  if (!query.get('userDeleteToken')) {
    return <Navigate to='/auth/login' replace />;
  }

  if (formSubmitted) {
    return (
      <p>
        Account deleted. <Link to='/'>return to homepage</Link>
      </p>
    );
  }

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h1>Delete account</h1>
      <p>
        <b>Warning:</b> you are going to delete your account
      </p>

      <Form.Group controlId='password'>
        <Form.Label>Current password</Form.Label>
        <Form.Control
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
          Delete account
        </Button>
      </div>
    </Form>
  );
};

export default GuestAuthAccountDelete;
