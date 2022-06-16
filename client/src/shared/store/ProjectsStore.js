import { makeAutoObservable, flow } from 'mobx';
import api from './api';

const isString = (variable) => {
  return typeof variable === 'string' || variable instanceof String;
};

class ProjectsStore {
  stores = null;
  allProjects = [];

  // loading states
  projectsFetched = false;
  creatingTask = false;
  creatingProject = false;
  deletingProject = false;
  patchingProject = false;

  constructor({ stores }) {
    this.stores = stores;
    makeAutoObservable(this);
  }

  fetchProjects = flow(function* () {
    try {
      const { data } = yield api.get('/me/projects');
      this.allProjects = data;
      this.projectsFetched = true;
    } catch (err) {
      this.stores.toaster.error(err);
    }
  });

  projectPost = flow(function* (params, { redirectUrl }) {
    this.creatingProject = true;

    try {
      const { data } = yield api.post('/me/projects', params);
      yield this.fetchProjects();
      this.creatingProject = false;

      if (isString(redirectUrl)) {
        this.stores.view.navigate(`${redirectUrl}/${data.id}`);
      }
    } catch (err) {
      this.stores.toaster.error(err);
    }

    this.creatingProject = false;
  });

  projectDelete = flow(function* (projectId, { redirectUrl }) {
    this.deletingProject = true;

    try {
      yield api.delete(`/me/projects/${projectId}`);
      this.allProjects = this.allProjects.filter(
        (project) => project.id !== Number(projectId)
      );

      if (isString(redirectUrl)) {
        this.stores.view.navigate(redirectUrl);
      }
    } catch (err) {
      this.stores.toaster.error(err);
    }

    this.deletingProject = false;
  });

  projectPatch = flow(function* (projectId, params, { redirectUrl }) {
    this.patchingProject = true;

    try {
      yield api.patch(`/me/projects/${projectId}`, params);

      this.allProjects = this.allProjects.map((project) =>
        project.id === Number(projectId) ? { ...project, ...params } : project
      );

      if (isString(redirectUrl)) {
        this.stores.view.navigate(redirectUrl);
      }
    } catch (err) {
      this.stores.toaster.error(err);
    }

    this.patchingProject = false;
  });

  taskPost = flow(function* (params) {
    this.creatingTask = true;

    try {
      const { data } = yield api.post('/me/tasks', { ...params });
      this.allProjects = this.allProjects.map((project) => ({
        ...project,
        tasks:
          project.id === params.projectId
            ? project.tasks.concat(data)
            : project.tasks,
      }));
    } catch (err) {
      this.stores.toaster.error(err);
    }

    this.creatingTask = false;
  });

  taskDelete = flow(function* (taskId) {
    try {
      yield api.delete(`/me/tasks/${taskId}`);

      this.allProjects = this.allProjects.map((project) => ({
        ...project,
        tasks: project.tasks.filter((task) => task.id !== taskId),
      }));
    } catch (err) {
      this.stores.toaster.error(err);
    }
  });

  taskOptimisticDelete = flow(function* (taskId) {
    const stateClone = JSON.parse(JSON.stringify(this.allProjects));

    try {
      this.allProjects = this.allProjects.map((project) => ({
        ...project,
        tasks: project.tasks.filter((task) => task.id !== taskId),
      }));

      yield api.delete(`/me/tasks/${taskId}`);
    } catch (err) {
      this.allProjects = stateClone;
      this.stores.toaster.error(err);
    }
  });

  taskPatch = flow(function* (taskId, params) {
    try {
      yield api.patch(`/me/tasks/${taskId}`, params);

      this.allProjects = this.allProjects.map((project) => ({
        ...project,
        tasks: project.tasks.map((task) =>
          task.id === taskId ? { ...task, ...params } : task
        ),
      }));
    } catch (err) {
      this.stores.toaster.error(err);
    }
  });

  taskOptimisticPatch = flow(function* (taskId, params) {
    const stateClone = JSON.parse(JSON.stringify(this.allProjects));

    try {
      this.allProjects = this.allProjects.map((project) => ({
        ...project,
        tasks: project.tasks.map((task) =>
          task.id === taskId ? { ...task, ...params } : task
        ),
      }));

      yield api.patch(`/me/tasks/${taskId}`, params);
    } catch (err) {
      this.allProjects = stateClone;
      this.stores.toaster.error(err);
    }
  });
}

export default ProjectsStore;
