import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const UserLayout = () => (
  <Container className='h-100' fluid>
    <Row className='h-100'>
      <Col className='border-end flex-grow-0'>
        <Sidebar />
      </Col>
      <Col className='p-0 bg-light pb-4'>
        <Navbar />
        <Container>
          <Outlet />
        </Container>
      </Col>
    </Row>
  </Container>
);

export default UserLayout;
