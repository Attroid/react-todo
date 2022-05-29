import { useState } from 'react';
import { useStores } from 'shared/store';
import { ListGroup, Modal, Button, Form, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import { Plus } from 'react-bootstrap-icons';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const UserProjectTaskListTaskCreate = () => {
  const stores = useStores();
  const [show, setShow] = useState(false);
  const { projectId } = useParams();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().min(3).max(20),
    }),
    onSubmit: async ({ name }) => {
      await stores.projects.createTask({ name, projectId });
      handleClose();
    },
  });

  const handleClose = () => setShow(false);
  const handleShow = () => {
    formik.resetForm();
    setShow(true);
  };

  return (
    <>
      <ListGroup.Item
        action
        className='d-flex align-items-center'
        onClick={handleShow}
      >
        <Plus />
        <span className='ps-2'>Add task</span>
      </ListGroup.Item>
      <Modal show={show} onHide={handleClose} backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>Add task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit} id='add-task-form'>
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
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            form='add-task-form'
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
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default observer(UserProjectTaskListTaskCreate);
