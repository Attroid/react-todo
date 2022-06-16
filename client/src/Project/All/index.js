import { observer } from 'mobx-react-lite';
import { useStores } from 'shared/store';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CursorPointerCard = styled(Card)`
  &:hover {
    cursor: pointer;
  }
`;

const ProjectAll = () => {
  const stores = useStores();
  const navigate = useNavigate();

  if (stores.projects.projectsFetched === false) {
    return <>Loading</>;
  }

  const projects = stores.projects.allProjects;

  return (
    <div>
      <div
        className='rounded-3 text-white shadow position-relative p-4'
        style={{
          backgroundImage: 'linear-gradient(62deg, #A090F8 20%, #6EA4F9 79%)',
        }}
      >
        <h1>Projects</h1>
      </div>
      {projects.length === 0 && (
        <p className='mt-3 text-muted'>
          You don't have any projects. Create one from left sidebar
        </p>
      )}

      {projects.map((project) => (
        <CursorPointerCard
          className='mt-3'
          onClick={() => navigate(`/project/view/${project.id}`)}
        >
          <Card.Header
            style={{
              backgroundImage:
                'linear-gradient(62deg, #A090F8 20%, #6EA4F9 79%)',
            }}
            as='h2'
            className='text-white'
          >
            {project.name}
          </Card.Header>
          <Card.Body>
            <Row>
              <Col xs={12} lg={6}>
                <h3>Status</h3>
                <p className='m-0'>
                  Tasks completed{' '}
                  <b>
                    {project.tasks.reduce(
                      (acc, task) => (task.done === true ? acc + 1 : acc),
                      0
                    )}
                  </b>
                </p>
                <p className='m-0'>
                  Tasks in progress{' '}
                  <b>
                    {project.tasks.reduce(
                      (acc, task) => (task.done === false ? acc + 1 : acc),
                      0
                    )}
                  </b>
                </p>
              </Col>

              <Col xs={12} lg={6} className='mt-3 mt-lg-0'>
                <h3>Todays picks</h3>
                <ul style={{ listStyleType: 'none' }} className='p-0'>
                  {project.tasks
                    .filter((task) => task.done === false)
                    .slice(0, 3)
                    .map((task) => (
                      <li>
                        <Badge>
                          {project.abbreviation}-{task.id}
                        </Badge>{' '}
                        <span className='ms-2'>{task.name}</span>
                      </li>
                    ))}
                  {project.tasks.filter((task) => task.done === false)
                    .length === 0 && <li className='text-muted'>none</li>}
                </ul>
              </Col>
            </Row>
          </Card.Body>
        </CursorPointerCard>
      ))}
    </div>
  );
};

export default observer(ProjectAll);
