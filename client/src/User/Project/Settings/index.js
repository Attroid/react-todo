import { Form, Button, Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useStores } from 'shared/store';
import ConfirmationModal from 'shared/components/ConfirmationModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProjectSettings = ({ project }) => {
  const stores = useStores();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: project.name,
      abbreviation: project.abbreviation,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().min(3).max(80),
      abbreviation: Yup.string().max(7),
    }),
    onSubmit: async (values) => {
      stores.projects.updateProject(project.id, values);
    },
  });

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleHideDeleteModal = () => setShowDeleteModal(false);

  const handleDelete = () => {
    stores.projects.deleteProject(project.id);
    handleHideDeleteModal();
    navigate('/app/projects');
  };

  return (
    <div>
      <h4 className='pt-3 pb-2 mb-0 border-bottom'>Project settings</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className='pt-3' controlId='project-name'>
          <Form.Label>Project name</Form.Label>
          <Form.Control
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group className='pt-3' controlId='project-abbreviation'>
          <Form.Label>Project abbreviation</Form.Label>
          <Form.Control
            name='abbreviation'
            value={formik.values.abbreviation}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <div className='d-flex justify-content-between pt-3'>
          <Button variant='danger' onClick={handleShowDeleteModal}>
            Delete project
          </Button>
          {(formik.values.name !== project.name ||
            formik.values.abbreviation !== project.abbreviation) && (
            <Button type='submit' disabled={stores.projects.isSavingProject}>
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
              Update
            </Button>
          )}
        </div>
      </Form>
      <ConfirmationModal
        show={showDeleteModal}
        title='Delete confirmation'
        body={
          <p>
            Do you really want to delete project "{project.name}"?
            <br />
            <b>This action is irreversible!</b>
          </p>
        }
        confirmText='Delete'
        confirmVariant='danger'
        onConfirm={handleDelete}
        onCancel={handleHideDeleteModal}
      />
    </div>
  );
};

export default observer(UserProjectSettings);
