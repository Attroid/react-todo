import { Button } from 'react-bootstrap';
import { List } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

const defaultProps = {
  onClick: () => {},
  className: undefined,
};

const AppLayoutNavbarMenuButton = ({ onClick, className }) => (
  <Button
    className={clsx(
      'd-flex align-items-center bg-white border-0 text-dark p-2',
      className
    )}
    onClick={onClick}
  >
    <List />
  </Button>
);

AppLayoutNavbarMenuButton.propTypes = propTypes;
AppLayoutNavbarMenuButton.defaultProps = defaultProps;

export default AppLayoutNavbarMenuButton;
