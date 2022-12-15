import axios from "axios";
import authHeader from "./AuthHeader";

const getAll = (filter) => {
  let filterQuery = ''
  for (const key in filter) {
    if (filter[key]) filterQuery += key + '=' + filter[key] + '&'
  }

  if (filterQuery !== '') filterQuery = '?' + filterQuery.slice(0, -1)
  return axios.get("/visualization" + filterQuery)
    .then((response) => {
      return response.data;
    });
};

const get = id => {
  return axios.get(`/visualization/${id}`)
    .then((response) => {
      return response.data;
    });
};

const create = data => {
  return axios.post("/visualization", data)
    .then((response) => {
      return response.data;
    });
};

const update = (id, data) => {
  return axios.put(`/visualization/${id}`, data)
    .then((response) => {
      return response.data;
    });
};

const findByName = name => {
  return axios.get(`/visualization?name=${name}`)
    .then((response) => {
      return response.data;
    });
};

const VisionService = {
  getAll,
  get,
  create,
  update,
  findByName
};

export default VisionService;