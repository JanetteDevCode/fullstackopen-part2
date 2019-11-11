import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setNewFilter] = useState('');

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        console.log('response.data', response.data);
        setPersons(response.data);
      });
  };

  useEffect(hook, []);

  const personExists = (name) => {
    return persons.find((person) => {
      return person.name === name;
    });
  };

  const addPerson = (event) => {
    event.preventDefault();
    const name = newName.trim();
    const phone = newPhone.trim();
    if (!name) {
      alert('No name is given');
      return;
    }
    if (!phone) {
      alert('No phone number is given');
      return;
    }
    if (personExists(name)) {
      alert(`${name} is already added to phonebook`);
      setNewName('');
      return;
    }
    const person = {
      name: name,
      number: phone
    };
    setPersons(persons.concat(person));
    setNewName('');
    setNewPhone('');
  };

  const changeName = (event) => {
    setNewName(event.target.value);
  };

  const changePhone = (event) => {
    setNewPhone(event.target.value);
  };

  const changeFilter = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
        <h2>Phonebook</h2>
        <Filter filter={filter} changeFilter={changeFilter} />
        <h3>add new contact</h3>
        <PersonForm
          addPerson={addPerson}
          newName={newName}
          changeName={changeName}
          newPhone={newPhone}
          changePhone={changePhone} />
        <h2>Numbers</h2>
        <Persons filter={filter} persons={persons} />
    </div>
  );
};

export default App;
