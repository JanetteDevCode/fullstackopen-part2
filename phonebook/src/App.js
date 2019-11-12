import React, { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setNewFilter] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      });
  }, []);

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
    const newPerson = {
      name: name,
      number: phone
    };
    personService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewPhone('');
      });
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
