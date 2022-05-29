const authentication = require('controllers/authentication');
const personal = require('controllers/personal');
const projects = require('controllers/projects');
const tasks = require('controllers/tasks');

const attachPublicRoutes = (app) => {
  app.get('/auth/csrf-token', authentication.getCsrfToken);
  app.post('/auth/login', authentication.login);
  app.post('/auth/signup', authentication.signup);
  app.post('/auth/request-password-reset', authentication.requestPasswordReset);
  app.post('/auth/password-reset', authentication.passwordReset);
  app.post('/auth/user-delete', authentication.userDelete);
};

const attachPrivateRoutes = (app) => {
  app.get('/auth/refresh', authentication.refresh);
  app.post('/auth/request-user-delete', authentication.requestUserDelete);
  app.post('/auth/logout', authentication.logout);

  app.patch('/me/data', personal.updateData);

  app.get('/me/projects', projects.getAllProjects);
  app.patch('/me/projects/:projectId', projects.updateProject);
  app.post('/me/projects', projects.createProject);
  app.delete('/me/projects/:projectId', projects.deleteProject);

  app.post('/me/tasks', tasks.createTask);
  app.patch('/me/tasks/:taskId', tasks.updateTask);
  app.delete('/me/tasks/:taskId', tasks.deleteTask);
};

module.exports = {
  attachPublicRoutes,
  attachPrivateRoutes,
};
