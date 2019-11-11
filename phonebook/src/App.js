import React, { useState } from 'react';
import Person from './components/Person';

const App = () => {
  const [persons, setPersons] = useState([{name: 'Arto Hellas'}]);
  const [newName, setNewName] = useState('');

  const showPersons = () => {
    return persons.map((person, index) => {
      return (
        <Person key={index + 1} person={person} />
      );
    });
  };

  const personExists = (name) => {
    return persons.find((person) => {
      return person.name === name;
    });
  };

  const addPerson = (event) => {
    event.preventDefault();
    const name = newName.trim();
    if (!name) {
      alert('No name is given');
      return;
    }
    if (personExists(name)) {
      alert(`${name} is already added to phonebook`);
      setNewName('');
      return;
    }
    const person = {
      name: name
    };
    setPersons(persons.concat(person));
    setNewName('');
  };

  const changeNewName = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
        <h2>Phonebook</h2>
        <form onSubmit={addPerson}>
          <div>
            name: <input placeholder='Jane Doe' value={newName} onChange={changeNewName}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <div>{showPersons()}</div>
    </div>
  );
};

export default App;
