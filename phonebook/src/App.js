import React, { useState } from 'react';
import Person from './components/Person';

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

  const showPersons = () => {
    const searchTerm = filter.trim();
    const personsToShow = searchTerm ? filterPersons(searchTerm) : persons;
    return personsToShow.map((person, index) => {
      return (
        <Person key={index + 1} person={person} />
      );
    });
  };

  // case-insensitive filter
  const filterPersons = (term) => {
    return persons.filter((person) => {
      return person.name.toLowerCase().includes(term.toLowerCase());
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
        <div>
          filter shown with <input value={filter} onChange={changeFilter} />
        </div>
        <h3>add new contact</h3>
        <form onSubmit={addPerson}>
          <div>
            name: <input placeholder='Jane Doe' value={newName} onChange={changeName} />
          </div>
          <div>
            number: <input placeholder='555-867-5309' value={newPhone} onChange={changePhone} />
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
