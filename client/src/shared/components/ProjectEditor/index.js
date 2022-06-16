import { Form, Button, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useStores } from 'shared/store';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { Save } from 'react-bootstrap-icons';
import IconButton from 'shared/components/IconButton';
import { Trash } from 'react-bootstrap-icons';
import clsx from 'clsx';

const propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    abbreviation: PropTypes.string,
  }),
  className: PropTypes.string,
  hasDeleteOption: PropTypes.bool,
  onDelete: PropTypes.func,
  onSubmit: PropTypes.func,
};

const defaultProps = {
  initialValues: {
    name: '',
    abbreviation: '',
  },
  className: undefined,
  hasDeleteOption: false,
  onDelete: () => {},
  onSubmit: () => {},
};

const ProjectEditor = ({
  initialValues,
  onSubmit,
  className,
  hasDeleteOption,
  onDelete,
}) => {
  const stores = useStores();
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      name: Yup.string().min(3).required(),
      abbreviation: Yup.string().min(1).required(),
    }),
    validateOnMount: true,
    onSubmit,
  });

  return (
    <Form onSubmit={formik.handleSubmit} className={className}>
      <Form.Group className='mt-3' controlId='project-name'>
        <Form.Label>
          Project name <span className='text-danger'>*</span>
        </Form.Label>
        <Form.Control
          name='name'
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <Form.Text>Project name must be atleast 3 letters long</Form.Text>
      </Form.Group>
      <Form.Group className='mt-2' controlId='project-abbreviation'>
        <Form.Label>
          Project abbreviation <span className='text-danger'>*</span>
        </Form.Label>
        <Form.Control
          name='abbreviation'
          value={formik.values.abbreviation}
          onChange={formik.handleChange}
        />
      </Form.Group>

      <IconButton
        className={clsx('w-100 mt-4', !hasDeleteOption && 'mb-5')}
        icon={<Save />}
        disabled={formik.isValid === false}
        loading={
          stores.projects.patchingProject || stores.projects.creatingProject
        }
        type='submit'
      >
        Save
      </IconButton>

      {hasDeleteOption && (
        <IconButton
          icon={<Trash />}
          variant='danger'
          className='mt-2 mb-5'
          onClick={onDelete}
          loading={stores.projects.deletingProject}
        />
      )}
    </Form>
  );
};

ProjectEditor.propTypes = propTypes;
ProjectEditor.defaultProps = defaultProps;

export default observer(ProjectEditor);
