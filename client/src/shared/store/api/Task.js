import api from './api';

class Task {
  baseUrl = '/me/tasks';

  patch(taskId, body) {
    return api.patch(`${this.baseUrl}/${taskId}`, body);
  }

  post(body) {
    return api.post(this.baseUrl, body);
  }

  delete(taskId) {
    return api.delete(`${this.baseUrl}/${taskId}`);
  }
}

export default Task;
