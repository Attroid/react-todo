import { makeAutoObservable, set } from 'mobx';

// stores
import ToasterStore from './ToasterStore';
import UserStore from './UserStore';
import ProjectsStore from './ProjectsStore';
import ViewStore from './ViewStore';

class RootStore {
  stores = {
    toaster: null,
    user: null,
  };

  constructor() {
    makeAutoObservable(this);
    this.setStore('toaster', new ToasterStore({ stores: this.stores }));
    this.setStore('user', new UserStore({ stores: this.stores }));
    this.setStore('projects', new ProjectsStore({ stores: this.stores }));
    this.setStore('view', new ViewStore({ stores: this.stores }));
  }

  setStore(name, instance) {
    set(this.stores, { [name]: instance });
  }
}

export default RootStore;
