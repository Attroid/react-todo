import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from 'shared/components/Logo';

const GuestHomeNavbar = () => (
  <Navbar bg='primary' variant='dark'>
    <Container>
      <Navbar.Brand as={Link} to='/'>
        <Logo />
      </Navbar.Brand>
      <Nav className='ms-auto'>
        <Nav.Link as={Link} to='/auth/login'>
          Login
        </Nav.Link>
        <Nav.Link as={Link} to='/auth/signup'>
          Signup
        </Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);

export default GuestHomeNavbar;
