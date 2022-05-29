import { makeAutoObservable } from 'mobx';

class ViewStore {
  stores = null;
  navigate = null;

  constructor({ stores }) {
    this.stores = stores;
    makeAutoObservable(this);
  }

  setNavigate(navigate) {
    this.navigate = navigate;
  }
}

export default ViewStore;
