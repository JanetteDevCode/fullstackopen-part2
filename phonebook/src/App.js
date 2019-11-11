import React, { useState } from 'react';
import Person from './components/Person';

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', phone: '040-123456'}
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

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

  const changeNewName = (event) => {
    setNewName(event.target.value);
  };

  const changeNewPhone = (event) => {
    setNewPhone(event.target.value);
  };

  return (
    <div>
        <h2>Phonebook</h2>
        <form onSubmit={addPerson}>
          <div>
            name: <input placeholder='Jane Doe' value={newName} onChange={changeNewName} />
          </div>
          <div>
            number: <input placeholder='555-867-5309' value={newPhone} onChange={changeNewPhone} />
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
