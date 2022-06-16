import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const propTypes = {
  project: PropTypes.shape({}).isRequired,
};

const ProjectTasksStatus = ({ project }) => (
  <div>
    <Card className='text-center text-dark mt-4 mt-lg-0 shadow'>
      <Card.Body>
        <Card.Title className='display-6'>
          {project.tasks.reduce(
            (acc, task) => (task.done === true ? acc + 1 : acc),
            0
          )}
        </Card.Title>
        <Card.Subtitle>Tasks completed</Card.Subtitle>
      </Card.Body>
    </Card>
    <Card className='text-center text-dark mt-3 shadow'>
      <Card.Body>
        <Card.Title className='display-6'>
          {project.tasks.reduce(
            (acc, task) => (task.done === false ? acc + 1 : acc),
            0
          )}
        </Card.Title>
        <Card.Subtitle>Tasks in progress</Card.Subtitle>
      </Card.Body>
    </Card>
  </div>
);

ProjectTasksStatus.propTypes = propTypes;

export default ProjectTasksStatus;
