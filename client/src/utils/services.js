import http from './http-commons';

class StuffDataService {

  // ===================USER==================
  // signup
  create(data) {
    return http.post('/api/user', data);
  }

  // login
  postLogin(data) {
    return http.post(`/api/user/login`, data);
  }


  // ===================FORM API==================
  
  // save Form
  postSaveForm(data){
    return http.post('/api/forms/save', data);
  }
  
  // retrieve form lists
  // pagination page number 

  getFormList(page){
    return http.post('/api/forms/list', page);
  }

  // retrieve form by id
  getFormById(id){
    return http.get(`/api/forms/${id}`);
  }

  // update form by id
  updateForm(id){
    return http.get(`/api/forms/update/${id}`);
  }
}

export default new StuffDataService()