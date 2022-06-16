import { Form } from 'react-bootstrap';
import IconButton from 'shared/components/IconButton';
import { Lock } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import { LoginStatus } from 'shared/constants/auth';
import { useStores } from 'shared/store';
import { observer } from 'mobx-react-lite';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AuthLogin = () => {
  const stores = useStores();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      // We don't want to validate login values properly
      // because now hackers can try to quess passwords that users cannot set
      email: Yup.string().required(),
      password: Yup.string().required(),
    }),
    validateOnMount: true,
    onSubmit: ({ email, password }) => {
      stores.user.login({ email, password }, { redirectUrl: '/project' });
    },
  });

  if (stores.user.loginStatus === LoginStatus.AUTHENTICATED) {
    navigate('/project/all');
  }

  return (
    <div className='d-flex justify-content-center'>
      <Form onSubmit={formik.handleSubmit} style={{ width: 300 }}>
        <h1 className='display-4'>Login</h1>
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
        <Form.Group controlId='password' className='mt-2'>
          <Form.Label>
            Password <span className='text-danger'>*</span>
          </Form.Label>
          <Form.Control
            name='password'
            type='password'
            onChange={formik.handleChange}
          />
        </Form.Group>
        <IconButton
          className='w-100 mt-4 mb-2'
          icon={<Lock />}
          loading={stores.user.loginStatus === LoginStatus.PENDING}
          disabled={formik.isValid === false}
          type='submit'
        >
          Login
        </IconButton>
        <p>
          Don't have an account? <Link to='/auth/signup'>Signup</Link>
        </p>
      </Form>
    </div>
  );
};

export default observer(AuthLogin);
