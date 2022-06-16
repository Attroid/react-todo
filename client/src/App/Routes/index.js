import { Routes, Route, Navigate } from 'react-router-dom';
import NotFound from '../NotFound';

// Auth
import AuthLogin from 'Auth/Login';
import AuthSignup from 'Auth/Signup';

// Project
import ProjectView from 'Project/View';
import ProjectCreate from 'Project/Create';
import ProjectEdit from 'Project/Edit';
import ProjectAll from 'Project/All';

const AppRoutes = () => (
  <Routes>
    <Route path='auth'>
      <Route path='login' element={<AuthLogin />} />
      <Route path='signup' element={<AuthSignup />} />
    </Route>

    <Route path='project'>
      <Route path='all' element={<ProjectAll />} />
      <Route index element={<Navigate to='all' />} />
      <Route path='view' element={<Navigate to='all' />} />

      <Route path='view/*' element={<ProjectView />} />

      <Route path='create' element={<ProjectCreate />} />

      <Route path='edit' element={<Navigate to='/project' />} />
      <Route path='edit/*' element={<ProjectEdit />} />
    </Route>

    <Route index element={<Navigate to='auth/login' />} />
    <Route path='*' element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
