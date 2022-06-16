import { ToastContainer } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useStores } from 'shared/store';
import { observer } from 'mobx-react-lite';
import Toast from './Toast';

const propTypes = {
  position: PropTypes.string,
};

const defaultProps = {
  position: undefined,
};

const Toaster = ({ position }) => {
  const stores = useStores();

  return (
    <ToastContainer position={position} className='p-3 position-fixed'>
      {stores.toaster.toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </ToastContainer>
  );
};

Toaster.propTypes = propTypes;
Toaster.defaultProps = defaultProps;

export default observer(Toaster);
