import { Navigate, Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStores } from 'shared/store';

const AppRoutesGuestRoute = ({ children }) => {
  const stores = useStores();

  if (
    stores.user.refreshing === false &&
    stores.user.loginStatus === 'authenticated'
  ) {
    return <Navigate to='/app' replace />;
  }

  return (
    <>
      {children}
      <Outlet />
    </>
  );
};

export default observer(AppRoutesGuestRoute);
