import { Pencil } from 'react-bootstrap-icons';
import { ListGroup } from 'react-bootstrap';
import IconButton from 'shared/components/IconButton';
import Checkbox from 'shared/components/Checkbox';
import PropTypes from 'prop-types';
import { useState } from 'react';
import TaskEditor from 'shared/components/TaskEditor';
import { useStores } from 'shared/store';

const propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    task: PropTypes.string,
    done: PropTypes.bool,
  }).isRequired,
};

const ProjectTaskListListItem = ({ task, onTaskPatch }) => {
  const stores = useStores();
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const editorOpen = () => {
    setIsEditorOpen(true);
  };

  const editorClose = () => {
    setIsEditorOpen(false);
  };

  const taskDelete = async (taskId) => {
    stores.projects.taskOptimisticDelete(taskId);
  };

  const taskPatch = async (taskId, params) => {
    onTaskPatch(taskId, params);
    editorClose();
  };

  return (
    <ListGroup.Item className='bg-transparent'>
      {isEditorOpen === false && (
        <div className='d-flex align-items-center'>
          <Checkbox
            className='me-2'
            checked={task.done}
            onChange={(ev) => onTaskPatch(task.id, { done: ev.target.value })}
          />
          <span>{task.name}</span>
          <IconButton
            icon={<Pencil />}
            className='ms-auto'
            variant='light'
            onClick={editorOpen}
          />
        </div>
      )}
      {isEditorOpen === true && (
        <TaskEditor
          initialValues={{ name: task.name }}
          hasDeleteOption
          onSubmit={(params) => taskPatch(task.id, params)}
          onCancel={editorClose}
          onDelete={() => taskDelete(task.id)}
        />
      )}
    </ListGroup.Item>
  );
};

ProjectTaskListListItem.propTypes = propTypes;

export default ProjectTaskListListItem;
