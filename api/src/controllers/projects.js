const { Project, Task } = require('models');
const { catchErrors } = require('errors');
const { EntityNotFoundError } = require('errors');

const getAllProjects = catchErrors(async (req, res) => {
  const projects = await Project.findAll({
    where: { userId: req.currentUser.id },
    include: {
      model: Task,
      attributes: ['id', 'name', 'done', 'tagNumber'],
    },
  });

  res.respond(projects);
});

const createProject = catchErrors(async (req, res) => {
  const project = await Project.create(
    { ...req.body, userId: req.currentUser.id },
    {
      fields: ['name', 'abbreviation', 'userId'],
    }
  );

  res.respond(project, 201);
});

const updateProject = catchErrors(async (req, res) => {
  const project = await Project.findByPk(req.params.projectId);

  if (project === null || project.userId !== req.currentUser.id) {
    // we could also use
    // throw new InsufficientPermissionsError();
    // but we dont want to tell user that project with given id exists
    throw new EntityNotFoundError('Project');
  }

  const { name, abbreviation } = req.body;

  if (name) {
    project.name = name;
  }

  if (abbreviation) {
    project.abbreviation = abbreviation;
  }

  await project.save();

  res.respond(project);
});

const deleteProject = catchErrors(async (req, res) => {
  const project = await Project.findByPk(req.params.projectId);

  if (project.userId !== req.currentUser.id) {
    // we could also use
    // throw new InsufficientPermissionsError();
    // but we dont want to tell user that project with given id exists
    throw new EntityNotFoundError('Project');
  }

  await project.destroy();

  res.respond({
    message: 'Project delete successful.',
    code: 'No Content',
    status: 204,
    data: {},
  });
});

module.exports = {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
};
