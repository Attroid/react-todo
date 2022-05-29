import api from './api';

class Projects {
  baseUrl = '/me/projects';

  loadAll() {
    return api.get(this.baseUrl);
  }

  post(body) {
    return api.post(this.baseUrl, body);
  }

  patch(projectId, body) {
    return api.patch(`${this.baseUrl}/${projectId}`, body);
  }

  delete(projectId) {
    return api.delete(`${this.baseUrl}/${projectId}`);
  }
}

export default Projects;
