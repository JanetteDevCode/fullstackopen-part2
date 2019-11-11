import React, { useState } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setNewFilter] = useState('');

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
      phone: phone
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
