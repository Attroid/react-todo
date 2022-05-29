import { Container, Row, Col } from 'react-bootstrap';
import { useStores } from 'shared/store';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import TaskList from './TaskList';
import Settings from './Settings';
import Statistics from './Statistics';
import Header from './Header';

const UserProject = () => {
  const stores = useStores();
  const { projectId } = useParams();

  const project = stores.projects.projects[projectId];

  if (project === undefined) {
    return null;
  }

  return (
    <Container className='pt-4'>
      <Header project={project} />

      <Row className='py-3'>
        <Col>
          <Statistics project={project} />
          <Settings project={project} />
        </Col>
        <Col>
          <TaskList />
        </Col>
      </Row>
    </Container>
  );
};

export default observer(UserProject);
