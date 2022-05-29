import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import loginSvg from './assets/login.svg';

const GuestAuthLayout = () => (
  <Container className='h-100' fluid>
    <Row className='d-flex justify-content-center align-items-center h-100'>
      <Col className='d-none d-lg-block' md={9} lg={6} xl={5} xxl={5}>
        <img src={loginSvg} className='img-fluid' alt='Sample image' />
      </Col>
      <Col md={8} lg={5} xl={4} xxl={3}>
        <Outlet />
      </Col>
    </Row>
  </Container>
);

export default GuestAuthLayout;
