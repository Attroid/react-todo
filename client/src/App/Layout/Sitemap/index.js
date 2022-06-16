import { Nav, Button } from 'react-bootstrap';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useStores } from 'shared/store';
import { observer } from 'mobx-react-lite';
import { Plus, BoxArrowRight } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';

const propTypes = {
  onSelect: PropTypes.func,
  className: PropTypes.string,
};

const defaultProps = {
  onSelect: () => {},
  className: undefined,
};

const AppLayoutSitemap = ({ onSelect, className }) => {
  const stores = useStores();

  return (
    <Nav variant='pills' className={clsx('flex-column', className)}>
      <h2 className='fs-5'>Projects</h2>
      <hr className='m-0' />

      {stores.projects.allProjects.map(({ id, name }) => (
        <Nav.Link
          key={id}
          className='text-nowrap mt-2'
          as={NavLink}
          to={`/project/view/${id}`}
          onClick={onSelect}
        >
          {name}
        </Nav.Link>
      ))}

      <div className='d-flex justify-content-center mt-4'>
        <Button
          className='p-0 rounded-circle'
          variant='outline-primary'
          as={NavLink}
          to='/project/create'
          onClick={onSelect}
        >
          <Plus size={32} />
        </Button>
      </div>

      <hr className='d-sm-none' />

      <Nav.Link
        onClick={() => {
          onSelect();
          stores.user.logout({ redirectUrl: '/auth/login' });
        }}
        className='d-flex justify-content-center position-relative px-5 text-nowrap mt-sm-5'
      >
        <BoxArrowRight className='position-absolute start-0 ms-4 top-50 translate-middle' />
        <span>Logout</span>
      </Nav.Link>
    </Nav>
  );
};

AppLayoutSitemap.propTypes = propTypes;
AppLayoutSitemap.defaultProps = defaultProps;

export default observer(AppLayoutSitemap);
