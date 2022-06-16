import { Form } from 'react-bootstrap';
import IconButton from 'shared/components/IconButton';
import { PersonBadge } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { LoginStatus } from 'shared/constants/auth';
import { useStores } from 'shared/store';
import { observer } from 'mobx-react-lite';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AuthSignup = () => {
  const stores = useStores();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: '',
      retype: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required(),
      username: Yup.string().required(),
      password: Yup.string().min(7).required(),
      retype: Yup.string()
        .oneOf([Yup.ref('password'), null])
        .required(),
    }),
    validateOnMount: true,
    onSubmit: ({ email, username, password }) => {
      stores.user.signup(
        { email, username, password },
        { redirectUrl: '/project' }
      );
    },
  });

  return (
    <div className='d-flex justify-content-center'>
      <Form onSubmit={formik.handleSubmit} style={{ width: 300 }}>
        <h1 className='display-4'>Signup</h1>
        <Form.Group controlId='email' className='mt-2'>
          <Form.Label>
            Email <span className='text-danger'>*</span>
          </Form.Label>
          <Form.Control
            name='email'
            type='text'
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group controlId='username' className='mt-2'>
          <Form.Label>
            Username <span className='text-danger'>*</span>
          </Form.Label>
          <Form.Control
            name='username'
            type='text'
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group controlId='password' className='mt-2'>
          <Form.Label>
            Password <span className='text-danger'>*</span>
          </Form.Label>
          <Form.Control
            name='password'
            type='password'
            onChange={formik.handleChange}
          />
          <Form.Text>Password must be atleast 7 characters long</Form.Text>
        </Form.Group>
        <Form.Group controlId='retype' className='mt-2'>
          <Form.Label>
            Password retype <span className='text-danger'>*</span>
          </Form.Label>
          <Form.Control
            name='retype'
            type='password'
            onChange={formik.handleChange}
          />
          <Form.Text>Password retype must match password</Form.Text>
        </Form.Group>
        <IconButton
          className='w-100 mt-4 mb-2'
          icon={<PersonBadge />}
          loading={stores.user.loginStatus === LoginStatus.PENDING}
          disabled={formik.isValid === false}
          type='submit'
        >
          Signup
        </IconButton>
        <p>
          Already have an account? <Link to='/auth/login'>Login</Link>
        </p>
      </Form>
    </div>
  );
};

export default observer(AuthSignup);
