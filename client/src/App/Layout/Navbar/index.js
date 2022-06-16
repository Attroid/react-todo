import { Navbar } from 'react-bootstrap';
import MenuButton from './MenuButton';
import Logo from './Logo';
import PropTypes from 'prop-types';
import { useStores } from 'shared/store';

const propTypes = {
  onMenuButtonClick: PropTypes.func,
  authenticated: PropTypes.bool,
};

const defaultProps = {
  onMenuButtonClick: () => {},
};

const AppLayoutNavbar = ({ onMenuButtonClick, authenticated }) => {
  const stores = useStores();

  return (
    <Navbar className='d-flex p-3'>
      <Logo />
      {authenticated && (
        <div className='ms-auto d-flex align-items-center'>
          <p className='m-0 me-2 fs-6 d-none d-sm-block'>
            <span className='text-muted'>Logged in as </span>
            {stores.user.user.username}
          </p>
          <MenuButton className='d-sm-none' onClick={onMenuButtonClick} />
        </div>
      )}
    </Navbar>
  );
};

AppLayoutNavbar.propTypes = propTypes;
AppLayoutNavbar.defaultProps = defaultProps;

export default AppLayoutNavbar;
