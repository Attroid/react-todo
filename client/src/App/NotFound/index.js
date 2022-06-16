import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className='d-flex flex-column align-items-center justify-content-center'>
    <h1 className='display-1'>404</h1>
    <h2 className='border-top'>Oops! Page not found</h2>
    <p>Sorry, the page you're looking for doesn't exist.</p>
    <Link to='/'>Return home</Link>
  </div>
);

export default NotFound;
