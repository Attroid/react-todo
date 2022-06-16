import { makeAutoObservable, runInAction } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

class ToasterStore {
  stores = null;
  toasts = [];

  constructor({ stores }) {
    this.stores = stores;
    makeAutoObservable(this);
  }

  addToast({ variant, title, message, duration = 5 }) {
    const id = uuidv4();
    this.toasts.push({ variant, title, message, id });

    if (duration) {
      setTimeout(() => this.removeToast(id), duration * 1000);
    }
  }

  removeToast(id) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
  }

  success(message) {
    this.addToast({ variant: 'success', title: 'Success', message });
  }

  error(error) {
    this.addToast({
      variant: 'danger',
      title: 'Error',
      message: error?.message ?? error,
      duration: 0,
    });
  }
}

export default ToasterStore;
