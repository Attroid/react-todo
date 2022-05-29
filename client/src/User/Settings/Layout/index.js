import { Outlet } from 'react-router-dom';
import Breadcrumb from './Breadcrump';

const UserSettingsLayout = () => (
  <>
    <Breadcrumb />
    <Outlet />
  </>
);

export default UserSettingsLayout;
