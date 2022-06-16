import { Trash, Save } from 'react-bootstrap-icons';
import { Form, Button, FormControl, Spinner } from 'react-bootstrap';
import IconButton from 'shared/components/IconButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useStores } from 'shared/store';
import { observer } from 'mobx-react-lite';

const propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  hasDeleteOption: PropTypes.bool,
  className: PropTypes.string,
};

const defaultProps = {
  initialValues: {
    name: '',
  },
  onSubmit: () => {},
  onCancel: () => {},
  onDelete: () => {},
  hasDeleteOption: false,
  className: undefined,
};

const ProjectTaskListTaskEditor = ({
  initialValues,
  onSubmit,
  onCancel,
  onDelete,
  hasDeleteOption,
  className,
}) => {
  const stores = useStores();
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      name: Yup.string().min(3).required(),
    }),
    validateOnMount: true,
    onSubmit,
  });

  const processing = stores.projects.creatingTask;

  return (
    <Form onSubmit={formik.handleSubmit} className={className}>
      <FormControl
        placeholder='Task name'
        name='name'
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      <div className='d-flex mt-2'>
        {hasDeleteOption === true && (
          <IconButton
            icon={<Trash />}
            variant='light'
            disabled={processing}
            onClick={onDelete}
          />
        )}
        <Button
          variant='light'
          className='ms-auto me-2'
          disabled={processing}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <IconButton
          icon={
            processing ? (
              <Spinner
                as='span'
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
              />
            ) : (
              <Save />
            )
          }
          type='submit'
          disabled={formik.isValid === false || processing}
        >
          Save
        </IconButton>
      </div>
    </Form>
  );
};

ProjectTaskListTaskEditor.propTypes = propTypes;
ProjectTaskListTaskEditor.defaultProps = defaultProps;

export default observer(ProjectTaskListTaskEditor);
