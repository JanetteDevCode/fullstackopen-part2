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

  const addPerson = (personToAdd) => {
    personService
      .createPerson(personToAdd)
      .then((returnedPerson) => {
        alert(`${returnedPerson.name} was successfully added to the server.`)
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewPhone('');
      });
  }

  const deletePerson = (personToDelete) => {
    personService
      .deletePerson(personToDelete.id)
      .then((returnedPerson) => {
        console.log('returned person after delete person:', returnedPerson);
        alert(`${personToDelete.name} was successfully deleted from the server.`)
        // sync persons in browser with server
        personService
          .getAll()
          .then((updatedPersons) => {
            setPersons(updatedPersons);
        });
      })
      .catch((error) => {
        console.log('delete person error:', error);
        alert('person could not be deleted');
      });
  };

  const handleAddPerson = (event) => {
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
    addPerson(person);
  };

  const handleDeletePerson = (person) => {
    return (() => {
      console.log('handle delete person', person);
      const confirmDelete = window.confirm(`Delete ${person.name}?`);
      if (confirmDelete) {
        deletePerson(person);
      } else {
        alert('No person was deleted.');
      }
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
          handleAddPerson={handleAddPerson}
          newName={newName}
          changeName={changeName}
          newPhone={newPhone}
          changePhone={changePhone} />
        <h2>Numbers</h2>
        <Persons 
          filter={filter} 
          persons={persons} 
          handleDeletePerson={handleDeletePerson} />
    </div>
  );
};

export default App;
