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
    getAllPersons();
  }, []);

  const personExists = (name) => {
    return persons.find((person) => {
      return person.name.toLowerCase() === name.toLowerCase();
    });
  };

  const getAllPersons = () => {
    personService
      .getAll()
      .then((persons) => {
        setPersons(persons);
      })
      .catch((error) => {
        console.log('get all persons error:', error);
        alert(`Could not get persons from the server.`);
      });
  };

  const addPerson = (personToAdd) => {
    personService
      .createPerson(personToAdd)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        alert(`${returnedPerson.name} was successfully added to the server.`);
      })
      .catch((error) => {
        console.log('add person error:', error);
        alert(`${personToAdd.name} could not be added.`);
      });
  }
  
  const updatePerson = (personToUpdate) => {
    personService
      .updatePerson(personToUpdate)
      .then((returnedPerson) => {
        setPersons(persons.map((person) => {
          return personToUpdate.id !== person.id ? person : returnedPerson;
        }));
        alert(`${returnedPerson.name} was successfully updated on the server.`)
      })
      .catch((error) => {
        console.log('update person error:', error);
        alert(`${personToUpdate.name} could not be updated.`);
      });
  };

  const deletePerson = (personToDelete) => {
    personService
      .deletePerson(personToDelete)
      .then((returnedPerson) => {
        setPersons(persons.filter((person) => {
          return personToDelete.id !== person.id;
        }));
        alert(`${personToDelete.name} was successfully deleted from the server.`);
      })
      .catch((error) => {
        console.log('delete person error:', error);
        alert(`${personToDelete.name} could not be deleted.`);
      });
  };

  const handleAddPerson = (event) => {
    event.preventDefault();
    const name = newName.trim();
    const phone = newPhone.trim();
    const existingPerson = personExists(name);
    if (!name) {
      alert('No name was given.');
      return;
    }
    if (!phone) {
      alert('No phone number was given.');
      return;
    }
    if (existingPerson && phone === existingPerson.number) {
      alert(`${name} is already in the phonebook.`);
      setNewName('');
      return;
    } else if (existingPerson) {
      const confirmUpdate = window.confirm(`${existingPerson.name} already exists. Replace phone number?`);
      if (confirmUpdate) {
        const editedPerson = {
          ...existingPerson,
          number: phone
        };
        updatePerson(editedPerson);
      } else {
        alert('No update was made.');
      }
    } else {
      const newPerson = {
        name: name,
        number: phone
      };
      addPerson(newPerson);
    }
    setNewName('');
    setNewPhone('');
  };

  const handleDeletePerson = (person) => {
    return (() => {
      const confirmDelete = window.confirm(`Delete ${person.name}?`);
      if (confirmDelete) {
        const removablePerson = {
          ...person
        };
        deletePerson(removablePerson);
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
