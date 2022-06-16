import { Row, Col } from 'react-bootstrap';
import Header from './Header';
import TaskList from './TaskList';
import TasksStatus from './TasksStatus';
import ProjectStatus from './ProjectStatus';
import { useMatch } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStores } from 'shared/store';
import { useMemo } from 'react';

const ProjectView = () => {
  const match = useMatch('/project/view/:projectId');
  const stores = useStores();

  const project = useMemo(() => {
    return stores.projects.allProjects.find(
      (project) => project.id === Number(match?.params?.projectId)
    );
  }, [stores.projects.allProjects, match]);

  if (stores.projects.projectsFetched === false) {
    return <>Loading</>;
  }

  if (!project) {
    return <>Project not found | 404</>;
  }

  return (
    <>
      <Header project={project} />
      <ProjectStatus project={project} className='mt-3' />
      <Row className='mt-3 flex-column-reverse flex-lg-row'>
        <Col>
          <TasksStatus project={project} />
        </Col>
        <Col>
          <h2 className='fs-4'>Tasks remaining</h2>
          <TaskList project={project} />
        </Col>
      </Row>
    </>
  );
};

export default observer(ProjectView);
