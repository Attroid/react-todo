import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import Navbar from './Navbar';

const GuestHome = () => (
  <>
    <Navbar />
    <Container className='pt-5'>
      <h1 className='text-center'>Organize it all with React Todo</h1>
      <div className='d-flex justify-content-center pt-5'>
        <Button as={Link} to='/auth/signup'>
          Get started
        </Button>
      </div>
    </Container>
  </>
);

export default GuestHome;
