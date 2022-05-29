import { Modal, Button } from 'react-bootstrap';

const ConfirmationModal = ({
  show = false,
  title,
  body,
  onCancel,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
  cancelVariant = 'secondary',
}) => (
  <Modal show={show}>
    <Modal.Header>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{body}</Modal.Body>
    <Modal.Footer className='d-flex justify-content-between'>
      <Button variant={cancelVariant} onClick={onCancel}>
        {cancelText}
      </Button>
      <Button variant={confirmVariant} onClick={onConfirm}>
        {confirmText}
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ConfirmationModal;
