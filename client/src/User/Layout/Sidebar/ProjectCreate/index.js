import { Button, Modal, Form, Spinner } from 'react-bootstrap';
import { useStores } from 'shared/store';
import { observer } from 'mobx-react-lite';
import { Plus } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import { useId, useState } from 'react';
import * as Yup from 'yup';

const UserLayoutSidebarProjectCreate = () => {
  const controlId = useId();
  const stores = useStores();
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      abbreviation: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().min(3).max(80),
      abbreviation: Yup.string().max(7),
    }),
    onSubmit: async (values) => {
      await stores.projects.createProject(values);
      handleHide();
    },
  });

  const handleShow = () => {
    formik.resetForm();
    setShow(true);
  };

  const handleHide = () => {
    setShow(false);
  };

  return (
    <>
      <Button
        className='mt-2 text-nowrap w-100 p-0'
        variant='outline-primary'
        onClick={handleShow}
      >
        <Plus size={32} />
      </Button>
      <Modal show={show} onClose={handleHide} backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>Create project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit} id={`${controlId}-form`}>
            <Form.Group controlId={`${controlId}-name`}>
              <Form.Label>Project name</Form.Label>
              <Form.Control
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </Form.Group>
            <Form.Group
              className='pt-3'
              controlId={`${controlId}-abbreviation`}
            >
              <Form.Label>Project abbreviation</Form.Label>
              <Form.Control
                name='abbreviation'
                value={formik.values.abbreviation}
                onChange={formik.handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleHide}>
            Close
          </Button>
          <Button
            form={`${controlId}-form`}
            type='submit'
            disabled={stores.projects.isSavingProject}
          >
            {stores.projects.isSavingProject && (
              <Spinner
                as='span'
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
                className='me-2'
              />
            )}
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default observer(UserLayoutSidebarProjectCreate);
