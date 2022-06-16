import { Toast } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useStores } from 'shared/store';
import { observer } from 'mobx-react-lite';
import { CheckCircleFill, ExclamationCircleFill } from 'react-bootstrap-icons';

const propTypes = {
  id: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

const ToasterToast = ({ id, variant, title, message }) => {
  const stores = useStores();

  return (
    <Toast
      bg={variant}
      className={`round overflow-hidden border border-${variant}`}
      onClose={() => stores.toaster.removeToast(id)}
    >
      <Toast.Header className='border-bottom-0'>
        <div className={`me-auto text-${variant} d-flex align-items-center`}>
          {variant === 'success' && <CheckCircleFill size={20} />}
          {variant === 'danger' && <ExclamationCircleFill size={20} />}
          <b className='ps-2'>{title}</b>
        </div>
      </Toast.Header>
      <Toast.Body className='text-white'>{message}</Toast.Body>
    </Toast>
  );
};

ToasterToast.propTypes = propTypes;

export default observer(ToasterToast);
