import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Navbar from './Navbar';
import Sitemap from './Sitemap';
import Drawer from './Drawer';
import { LoginStatus } from 'shared/constants/auth';
import { useStores } from 'shared/store';
import { observer } from 'mobx-react-lite';

const BoardCol = styled(Col)`
  @media (min-width: 576px) {
    ${({ $authenticated }) =>
      $authenticated === true ? 'border-top-left-radius: 1rem;' : ''}
  }
`;

const AppContainer = styled(Container)`
  @media (min-width: 576px) {
    border-radius: 1rem;
  }
`;

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: undefined,
};

const AppLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const stores = useStores();

  const authenticated = stores.user.loginStatus === LoginStatus.AUTHENTICATED;

  return (
    <>
      <AppContainer className='bg-white mt-sm-3 overflow-hidden shadow-lg p-0 app d-flex flex-column'>
        <Navbar
          onMenuButtonClick={() => setOpen(true)}
          authenticated={authenticated}
        />
        <Row className='flex-column flex-sm-row m-0 flex-grow-1'>
          {authenticated && (
            <Col className='flex-grow-0 p-3 d-none d-sm-flex'>
              <Sitemap className='d-none d-sm-flex' />
            </Col>
          )}
          <BoardCol className='bg-light p-3' $authenticated={authenticated}>
            {children}
          </BoardCol>
        </Row>
      </AppContainer>
      <Drawer open={open} onClose={() => setOpen(false)} className='d-sm-none'>
        <Sitemap onSelect={() => setOpen(false)} />
      </Drawer>
    </>
  );
};

AppLayout.propTypes = propTypes;
AppLayout.defaultProps = defaultProps;

export default observer(AppLayout);
