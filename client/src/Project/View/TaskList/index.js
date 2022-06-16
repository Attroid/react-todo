import { useState } from 'react';
import { Plus } from 'react-bootstrap-icons';
import { Button, ListGroup } from 'react-bootstrap';
import TaskEditor from 'shared/components/TaskEditor';
import PropTypes from 'prop-types';
import { useStores } from 'shared/store';
import ListItem from './ListItem';

const propTypes = {
  project: PropTypes.shape({}).isRequired,
};

const ProjectTaskList = ({ project }) => {
  const [editorOpen, setEditorOpen] = useState(false);
  const stores = useStores();

  const taskOptimisticPatch = async (taskId, params) => {
    await stores.projects.taskOptimisticPatch(taskId, params);
  };

  const taskPost = async (params) => {
    await stores.projects.taskPost({ ...params, projectId: project.id });
    setEditorOpen(false);
  };

  const editorClose = () => {
    setEditorOpen(false);
  };

  return (
    <ListGroup variant='flush'>
      {project.tasks.map((task) => (
        <ListItem key={task.id} task={task} onTaskPatch={taskOptimisticPatch} />
      ))}
      <ListGroup.Item className='bg-transparent'>
        {editorOpen === true && (
          <TaskEditor onSubmit={taskPost} onCancel={editorClose} />
        )}
        {editorOpen === false && (
          <div
            className='d-flex justify-content-center mt-2'
            style={{ marginBottom: 42 }}
          >
            <Button
              className='p-0 rounded-circle'
              variant='outline-primary'
              onClick={() => setEditorOpen(true)}
            >
              <Plus size={32} />
            </Button>
          </div>
        )}
      </ListGroup.Item>
    </ListGroup>
  );
};

ProjectTaskList.propTypes = propTypes;

export default ProjectTaskList;
