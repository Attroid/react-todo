import { Navbar } from 'react-bootstrap';
import { useStores } from 'shared/store';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

const UserLayoutNavbar = () => {
  const stores = useStores();

  return (
    <Navbar bg='body' className='border-bottom sticky-top'>
      <span className='ms-auto py-2 pe-4'>
        Logged in as <Link to='settings'>{stores.user.displayName}</Link>
      </span>
    </Navbar>
  );
};

export default observer(UserLayoutNavbar);
