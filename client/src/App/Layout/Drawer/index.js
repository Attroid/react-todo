import { useEffect, useRef } from 'react';
import { CloseButton } from 'react-bootstrap';
import { Journals } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useStores } from 'shared/store';
import { observer } from 'mobx-react-lite';

const Drawer = styled.div`
  transform: translateX(${({ open }) => (open ? '0' : '-100')}%);
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  transition: all 0.3s linear 0s;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background-color: #fff;
  overflow-y: scroll;
`;

const propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

const defaultProps = {
  open: false,
  onClose: () => {},
  children: undefined,
  className: undefined,
};

const LogoWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const AppLayoutDrawer = ({ open, onClose, children, className }) => {
  const closeButtonRef = useRef();
  const navigate = useNavigate();
  const stores = useStores();

  useEffect(() => {
    if (open) {
      closeButtonRef.current.focus();
    }
  }, [open]);

  const handleFocusOnEndElement = () => {
    closeButtonRef.current.focus();
  };

  const cancelShiftTab = (event) => {
    if (event.key === 'Tab' && event.shiftKey) {
      event.preventDefault();
    }
  };

  return (
    <Drawer open={open} className={className}>
      <div className='d-flex p-3'>
        <LogoWrapper
          className='d-flex align-items-center'
          onClick={() => {
            onClose();
            navigate('/project/all');
          }}
        >
          <Journals className='me-2' />
          <span>
            React<b>Todo</b>
          </span>
        </LogoWrapper>
        <CloseButton
          onKeyDown={cancelShiftTab}
          style={{ width: 24, height: 24 }}
          ref={closeButtonRef}
          className='ms-auto'
          onClick={onClose}
        />
      </div>
      <div className='p-3'>{children}</div>

      <p className='text-center'>
        <span className='text-muted'>Logged in as</span>{' '}
        {stores.user.user.username}
      </p>

      <div onFocus={handleFocusOnEndElement} tabIndex={0} />
    </Drawer>
  );
};

AppLayoutDrawer.propTypes = propTypes;
AppLayoutDrawer.defaultProps = defaultProps;

export default observer(AppLayoutDrawer);
