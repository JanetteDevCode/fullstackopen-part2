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

const createPerson = (newPerson) => {
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

const deletePerson = (deletePersonID) => {
  return (
    axios
      .delete(`${baseUrl}/${deletePersonID}`)
      .then((response) => {
        console.log('delete person successful');
        console.log('response data', response.data);
        return response.data;
      })
  );
};

export default {
  getAll,
  createPerson,
  deletePerson
};