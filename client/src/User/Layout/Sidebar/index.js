import { Nav } from 'react-bootstrap';
import Logo from 'shared/components/Logo';
import { useStores } from 'shared/store';
import { useLocation } from 'react-router-dom';
import { Toggles } from 'react-bootstrap-icons';
import { observer } from 'mobx-react-lite';
import ProjectCreate from './ProjectCreate';

const UserLayoutSidebar = () => {
  const stores = useStores();
  const { pathname } = useLocation();

  const handleSelect = (eventKey) => {
    stores.view.navigate(eventKey);
  };

  return (
    <div className='sticky-top px-2 py-4'>
      <Logo variant='primary' />
      <Nav onSelect={handleSelect} variant='pills' className='pt-2'>
        <div className='d-flex align-items-center border-bottom pb-1 w-100 mt-2'>
          <span className='ms-2'>Projects</span>
        </div>
        {Object.values(stores.projects.projects).map((project) => (
          <Nav.Item key={project.id} className='w-100 pt-2'>
            <Nav.Link
              active={pathname.startsWith(`/app/projects/${project.id}`)}
              eventKey={`/app/projects/${project.id}`}
              className='d-flex align-items-center'
            >
              <span className='ms-1 text-nowrap'>
                {project.name.slice(0, 20)}
                {project.name.length > 20 && '...'}
              </span>
            </Nav.Link>
          </Nav.Item>
        ))}
        <ProjectCreate />
        <div className='d-flex align-items-center border-bottom pb-1 w-100 mt-4'>
          <span className='ms-2'>Setup</span>
        </div>
        <Nav.Item className='w-100 pt-2'>
          <Nav.Link
            active={pathname.startsWith('/app/settings')}
            eventKey='/app/settings'
            className='d-flex align-items-center'
          >
            <Toggles />
            <span className='ms-1'>Settings</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default observer(UserLayoutSidebar);
