import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import functions from 'shared/utils/functions';
import { useState } from 'react';
import useQuery from 'shared/hooks/useQuery';
import { Navigate } from 'react-router-dom';

const GuestAuthPasswordReset = () => {
  const query = useQuery();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      newPasswordConfirm: '',
    },
    validationSchema: Yup.object().shape({
      newPassword: Yup.string().required('Password is required'),
      newPasswordConfirm: Yup.string().oneOf(
        [Yup.ref('newPassword'), null],
        'Passwords must match'
      ),
    }),
    onSubmit: ({ newPassword }) => {
      functions.updatePassword({
        passwordResetToken: query.get('passwordResetToken'),
        password: newPassword,
      });
      setFormSubmitted(true);
    },
  });

  if (!query.get('passwordResetToken')) {
    return <Navigate to='/auth/login' replace />;
  }

  if (formSubmitted) {
    return (
      <>
        <p>Password changed</p>
        <Link to='/auth/login'>Go to login</Link>
      </>
    );
  }

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h1>Password reset</h1>

      <p>Please enter a new password for your React Todo account.</p>

      <Form.Group controlId='newPassword'>
        <Form.Label>Enter a new password</Form.Label>
        <Form.Control
          type='password'
          onChange={formik.handleChange}
          value={formik.values.newPassword}
          onBlur={formik.handleBlur}
        />
        <Form.Text className='text-muted'>
          {formik.touched.newPassword && formik.errors.newPassword}
        </Form.Text>
      </Form.Group>

      <Form.Group controlId='newPasswordConfirm'>
        <Form.Label>Confirm your new password</Form.Label>
        <Form.Control
          type='password'
          onChange={formik.handleChange}
          value={formik.values.newPasswordConfirm}
          onBlur={formik.handleBlur}
        />
        <Form.Text className='text-muted'>
          {formik.touched.newPasswordConfirm &&
            formik.errors.newPasswordConfirm}
        </Form.Text>
      </Form.Group>

      <div className='d-flex justify-content-between pt-3 pb-2'>
        <Button className='px-5' type='submit'>
          Reset my password
        </Button>
      </div>
    </Form>
  );
};

export default GuestAuthPasswordReset;
