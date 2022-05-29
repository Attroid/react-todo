import { ListGroup, Form } from 'react-bootstrap';
import { useStores } from 'shared/store';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import TaskEditModal from './TaskEditModal';

const UserProjectTaskListListItem = ({ task }) => {
  const [show, setShow] = useState(false);
  const stores = useStores();

  const handleSubmit = async ({ name }) => {
    await stores.projects.updateTask(task.id, { name });
    handleHide();
  };

  const toggleDone = () => {
    stores.projects.updateTask(task.id, { done: !task.done });
  };

  const handleShow = (event) => {
    if (event.target.type === 'checkbox') return;
    setShow(true);
  };

  const handleHide = () => setShow(false);

  return (
    <>
      <ListGroup.Item
        className='d-flex align-items-center'
        action
        onClick={handleShow}
      >
        <Form.Check checked={task.done} onChange={toggleDone} />
        <span className='ps-2'>{task.name}</span>
      </ListGroup.Item>
      <TaskEditModal
        task={task}
        show={show}
        onHide={handleHide}
        onDelete={() => stores.projects.deleteTask(task.id)}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default observer(UserProjectTaskListListItem);
