import { Button, Container } from 'react-bootstrap';
import js from 'shared/utils/javascript';

const Fallback = () => (
  <Container>
    <div className='mt-5'>
      <h1>Oops!</h1>
      <p>Something went wrong</p>
      <p>
        Brace yourself till we get the error fixed. <br /> You may also refresh
        page or try again later
      </p>
      <Button className='px-5' onClick={js.refreshPage}>
        Refresh page
      </Button>
    </div>
  </Container>
);

export default Fallback;
