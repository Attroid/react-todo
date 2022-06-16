import { Button, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const propTypes = {
  icon: PropTypes.node.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  loading: PropTypes.bool,
};

const defaultProps = {
  className: undefined,
  children: undefined,
  loading: false,
};

const IconButton = ({ icon, children, className, loading, ...rest }) => (
  <Button
    className={clsx(
      'd-flex align-items-center justify-content-center',
      className,
      !children && 'p-2'
    )}
    {...rest}
    disabled={rest.disabled || loading}
  >
    {icon && (
      <span className={clsx('d-flex align-items-center', children && 'me-2')}>
        {loading ? (
          <Spinner
            as='span'
            animation='border'
            size='sm'
            role='status'
            aria-hidden='true'
          />
        ) : (
          icon
        )}
      </span>
    )}
    {children}
  </Button>
);

IconButton.propTypes = propTypes;
IconButton.defaultProps = defaultProps;

export default IconButton;
