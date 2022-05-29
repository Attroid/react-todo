import { useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useStores } from 'shared/store';
import UserRoute from './UserRoute';
import GuestRoute from './GuestRoute';

//
// Guest views
//
import Home from 'Guest/Home';

// Auth
import AuthLayout from 'Guest/Auth/Layout';
import Login from 'Guest/Auth/Login';
import Signup from 'Guest/Auth/Signup';
import AccountDelete from 'Guest/Auth/AccountDelete';
import ForgotPassword from 'Guest/Auth/ForgotPassword';
import PasswordReset from 'Guest/Auth/PasswordReset';

//
// User views
//
import UserLayout from 'User/Layout';
import Project from 'User/Project';

// Settings
import SettingsLayout from 'User/Settings/Layout';
import SettingsMenu from 'User/Settings/Menu';
import SettingsAccount from 'User/Settings/Account';
import SettingsGeneral from 'User/Settings/General';
import SettingsPersonalization from 'User/Settings/Personalization';

const AppRoutes = () => {
  const navigate = useNavigate();
  const stores = useStores();

  useEffect(() => {
    // HACK to provide navigate function to mobx store
    stores.view.setNavigate(navigate);
  }, [navigate]);

  return (
    <Routes>
      <Route path='/'>
        <Route element={<GuestRoute />}>
          <Route index element={<Home />} />
          <Route path='auth'>
            <Route element={<AuthLayout />}>
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<Signup />} />
            </Route>
          </Route>
        </Route>
      </Route>

      <Route path='auth'>
        <Route element={<AuthLayout />}>
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='password-reset' element={<PasswordReset />} />
          <Route path='user-delete' element={<AccountDelete />} />
        </Route>
      </Route>

      <Route path='app'>
        <Route element={<UserRoute />}>
          <Route element={<UserLayout />}>
            <Route index element={<Navigate to='projects' replace />} />
            <Route path='projects' element={null} />
            <Route path='projects/:projectId' element={<Project />} />
            <Route path='settings'>
              <Route element={<SettingsLayout />}>
                <Route index element={<SettingsMenu />} />
                <Route path='account' element={<SettingsAccount />} />
                <Route path='general' element={<SettingsGeneral />} />
                <Route
                  path='personalization'
                  element={<SettingsPersonalization />}
                />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
