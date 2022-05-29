const { Project, Task } = require('models');
const { catchErrors } = require('errors');
const { EntityNotFoundError } = require('errors');

const createTask = catchErrors(async (req, res) => {
  const project = await Project.findByPk(req.body.projectId);

  if (project === null || project.userId !== req.currentUser.id) {
    // we could also use
    // throw new InsufficientPermissionsError();
    // but we dont want to tell user that project with given id exists
    throw new EntityNotFoundError('Project');
  }

  const task = await Task.create(
    { ...req.body, tagNumber: project.createdTaskCount + 1 },
    { fields: ['projectId', 'name', 'tagNumber'] }
  );

  project.createdTaskCount++;
  await project.save();

  res.respond(task);
});

const updateTask = catchErrors(async (req, res) => {
  const task = await Task.findByPk(req.params.taskId);

  if (task === null) {
    throw new EntityNotFoundError('Task');
  }

  const project = await Project.findByPk(task.projectId);

  if (project === null || project.userId !== req.currentUser.id) {
    // we could also use
    // throw new InsufficientPermissionsError();
    // but we dont want to tell user that task with given id exists
    throw new EntityNotFoundError('Task');
  }

  const { name, done } = req.body;

  if (name) {
    task.name = name;
  }

  if (done !== undefined) {
    task.done = done;
  }

  await task.save();

  res.respond(task);
});

const deleteTask = catchErrors(async (req, res) => {
  const task = await Task.findByPk(req.params.taskId);

  if (task === null) {
    throw new EntityNotFoundError('Task');
  }

  const project = await Project.findByPk(task.projectId);

  if (project === null || project.userId !== req.currentUser.id) {
    // we could also use
    // throw new InsufficientPermissionsError();
    // but we dont want to tell user that task with given id exists
    throw new EntityNotFoundError('Task');
  }

  await task.destroy();

  res.respond({
    message: 'Task delete successful.',
    code: 'No Content',
    status: 204,
    data: {},
  });
});

module.exports = {
  createTask,
  updateTask,
  deleteTask,
};
