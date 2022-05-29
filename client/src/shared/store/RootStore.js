import { makeAutoObservable, set } from 'mobx';

// stores
import UserStore from './UserStore';
import ViewStore from './ViewStore';
import ProjectsStore from './ProjectsStore';

// apis
import Auth from './api/Auth';
import Projects from './api/Projects';
import Task from './api/Task';

class RootStore {
  // All stores must be set here initially for reactions/observations to work!
  stores = {
    user: null,
    view: null,
    apis: {
      auth: new Auth(),
      projects: new Projects(),
      task: new Task(),
    },
  };

  constructor() {
    makeAutoObservable(this);
    this.setStore('user', new UserStore({ stores: this.stores }));
    this.setStore('view', new ViewStore({ stores: this.stores }));
    this.setStore('projects', new ProjectsStore({ stores: this.stores }));
  }

  setStore(name, instance) {
    set(this.stores, { [name]: instance });
  }
}

export default RootStore;
