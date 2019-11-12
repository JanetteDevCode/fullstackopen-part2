import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  return (
    axios
      .get(baseUrl)
      .then((response) => {
        console.log('get all persons successful');
        console.log('response data', response.data);
        return response.data;
      })
  );
};

const create = (newPerson) => {
  return (
    axios
      .post(baseUrl, newPerson)
      .then((response) => {
        console.log('create person successful');
        console.log('response data', response.data);
        return response.data;
      })
  );
};

export default {
  getAll,
  create
};