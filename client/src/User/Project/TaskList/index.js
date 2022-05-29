import { ListGroup, Form } from 'react-bootstrap';
import { useStores } from 'shared/store';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import TaskCreate from './TaskCreate';
import ListItem from './ListItem';
import { useState } from 'react';

const UserProjectTaskList = () => {
  const [filterCompletedTasks, setFilterCompletedTasks] = useState(false);
  const stores = useStores();
  const { projectId } = useParams();

  const toggleFilterCompletedTasks = () => {
    setFilterCompletedTasks(!filterCompletedTasks);
  };

  const project = stores.projects.projects[projectId];

  if (project === undefined) {
    return null;
  }

  const filteredTasks = filterCompletedTasks
    ? project.tasks.filter((task) => task.done === false)
    : project.tasks;

  return (
    <>
      <h5>Tasks remaining</h5>
      <Form.Check
        value={filterCompletedTasks}
        onChange={toggleFilterCompletedTasks}
        label='Filter completed tasks'
      />
      <ListGroup>
        {filteredTasks.map((task) => (
          <ListItem key={task.id} task={task} />
        ))}
        <TaskCreate />
      </ListGroup>
    </>
  );
};

export default observer(UserProjectTaskList);
