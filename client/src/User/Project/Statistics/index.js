import { Card } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

const UserProjectStatistics = ({ project }) => {
  const { tasksDone, tasksUndone } = project.tasks.reduce(
    (acc, task) => {
      if (task.done) {
        return { ...acc, tasksDone: acc.tasksDone + 1 };
      } else {
        return { ...acc, tasksUndone: acc.tasksUndone + 1 };
      }
    },
    { tasksDone: 0, tasksUndone: 0 }
  );

  return (
    <div>
      <h5>Statistics</h5>
      <Card className='text-center bg-success bg-gradient text-white'>
        <Card.Body>
          <Card.Title className='h2'>{tasksDone}</Card.Title>
          <Card.Subtitle>Tasks completed</Card.Subtitle>
        </Card.Body>
      </Card>
      <Card className='mt-3 mb-3 text-center bg-primary bg-gradient text-white'>
        <Card.Body>
          <Card.Title>{tasksUndone}</Card.Title>
          <Card.Subtitle>Tasks in progress</Card.Subtitle>
        </Card.Body>
      </Card>
    </div>
  );
};

export default observer(UserProjectStatistics);
