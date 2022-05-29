import { Form, Modal, Badge, Button, Spinner } from 'react-bootstrap';
import { useStores } from 'shared/store';
import { observer } from 'mobx-react-lite';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserProjectTaskListListItemTaskEditModal = ({
  task,
  show,
  onHide,
  onDelete,
  onSubmit,
}) => {
  const stores = useStores();
  const { projectId } = useParams();

  const project = stores.projects.projects[projectId];

  const formik = useFormik({
    initialValues: {
      name: task.name,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().min(3).max(20),
    }),
    onSubmit,
  });

  useEffect(() => {
    if (show === true) {
      formik.resetForm();
      formik.setValues({ name: task.name });
    }
  }, [show]);

  return (
    <Modal show={show} onHide={onHide} backdrop='static'>
      <Modal.Header closeButton>
        <Modal.Title>
          <Badge>
            {project.abbreviation}-{task.tagNumber}
          </Badge>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} id='edit-task-form'>
          <Form.Group controlId='task-name'>
            <Form.Label>Task name</Form.Label>
            <Form.Control
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <Form.Text className='text-muted'>
              {formik.touched.name && formik.errors.name}
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className='justify-content-between'>
        <Button variant='danger' onClick={onDelete}>
          Delete
        </Button>
        <div>
          <Button variant='secondary' onClick={onHide}>
            Close
          </Button>
          <Button
            className='ms-2'
            form='edit-task-form'
            type='submit'
            disabled={stores.projects.isSavingTask}
          >
            {stores.projects.isSavingTask && (
              <Spinner
                as='span'
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
                className='me-2'
              />
            )}
            Save
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default observer(UserProjectTaskListListItemTaskEditModal);
