import { Row, Col, ProgressBar } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useStores } from 'shared/store';

const UserProjectHeader = ({ project }) => {
  const stores = useStores();

  const tasksDone = project.tasks.reduce(
    (count, task) => (task.done ? count + 1 : count),
    0
  );

  return (
    <div>
      <Row className='py-3'>
        <Col>
          <div className='d-flex justify-content-between border-bottom pb-2 align-items-center'>
            <h4>{project.name}</h4>
            <span className='text-muted h4'>{new Date().toDateString()}</span>
          </div>
        </Col>
      </Row>
      <Row className='py-3'>
        <Col>
          <h5>Current status</h5>
          <ProgressBar
            now={tasksDone === 0 ? 0 : (tasksDone / project.tasks.length) * 100}
          />
        </Col>
      </Row>
    </div>
  );
};

export default observer(UserProjectHeader);
