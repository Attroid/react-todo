import { Navigate, Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStores } from 'shared/store';

const AppRoutesUserRoute = ({ children }) => {
  const stores = useStores();

  if (stores.user.refreshing) {
    // Create loading screen for this
    return null;
  }

  if (stores.user.loginStatus !== 'authenticated') {
    return <Navigate to='/auth/login' replace />;
  }

  return (
    <>
      {children}
      <Outlet />
    </>
  );
};

export default observer(AppRoutesUserRoute);
