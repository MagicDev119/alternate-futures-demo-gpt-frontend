import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_URL + '/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.request.use(function (config) {

  const accessToken = localStorage.getItem('token')

  if (accessToken) {
    config.headers.Authorization = `${accessToken}`
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default {}