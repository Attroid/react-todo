import { makeAutoObservable, flow, set } from 'mobx';
import toast from 'react-hot-toast';

class ProjectsStore {
  stores = null;
  projects = {};
  isSavingTask = false;
  isSavingProject = false;

  constructor({ stores }) {
    this.stores = stores;
    makeAutoObservable(this);
  }

  syncWithServer = flow(function* syncWithServer() {
    try {
      const response = yield this.stores.apis.projects.loadAll();

      const projects = response.data.reduce(
        (acc, project) => ({
          ...acc,
          [project.id]: project,
        }),
        {}
      );

      this.projects = projects;
    } catch (error) {
      console.error(error);
    }
  });

  createProject = flow(function* createProject(values) {
    this.isSavingProject = true;
    try {
      yield this.stores.apis.projects.post(values);
      this.syncWithServer();
      toast.success('Created new project');
    } catch (error) {
      console.log(error);
    }
    this.isSavingProject = false;
  });

  updateProject = flow(function* updateProjec(projectId, values) {
    this.isSavingProject = true;
    try {
      yield this.stores.apis.projects.patch(projectId, values);
      this.syncWithServer();
      toast.success('Updated project');
    } catch (error) {
      console.log(error);
    }
    this.isSavingProject = false;
  });

  deleteProject = flow(function* deleteProject(projectId) {
    this.isSavingProject = true;
    try {
      yield this.stores.apis.projects.delete(projectId);
      this.syncWithServer();
      toast.success('Deleted project');
    } catch (error) {
      console.log(error);
    }
    this.isSavingProject = false;
  });

  updateTask = flow(function* updateTask(taskId, values) {
    this.isSavingTask = true;
    try {
      const response = yield this.stores.apis.task.patch(taskId, values);
      const projectId = response.data.projectId;
      const task = this.projects[projectId].tasks.find(
        (task) => Number(task.id) === Number(taskId)
      );
      set(task, values);
    } catch (error) {
      console.log(error);
    }
    this.isSavingTask = false;
  });

  createTask = flow(function* createTask({ name, projectId }) {
    this.isSavingTask = true;
    try {
      yield this.stores.apis.task.post({ name, projectId });
      yield this.syncWithServer();
      toast.success('Created new task');
    } catch (error) {
      console.log(error);
    }
    this.isSavingTask = false;
  });

  deleteTask = flow(function* deleteTask(taskId) {
    try {
      yield this.stores.apis.task.delete(taskId);
      yield this.syncWithServer();
      toast.success('Deleted task');
    } catch (error) {
      console.log(error);
    }
  });
}

export default ProjectsStore;
