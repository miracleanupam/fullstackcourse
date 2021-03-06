import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((res) => res.data);
};

const update = (id, newPerson) => {
  return axios.put(`${baseUrl}/${id}`, newPerson).then((res) => res.data);
};

const remove = (personId) => {
  return axios.delete(`${baseUrl}/${personId}`);
};

export default { getAll, create, remove, update };
