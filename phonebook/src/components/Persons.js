import React from 'react';
import Person from './Person';

const Persons = ({ filter, persons }) => {
  // case-insensitive filter
  const filterPersons = (term) => {
    return persons.filter((person) => {
      return person.name.toLowerCase().includes(term.toLowerCase());
    });
  };

  const showPersons = () => {
    const searchTerm = filter.trim();
    const personsToShow = searchTerm ? filterPersons(searchTerm) : persons;
    return personsToShow.map((person) => {
      return (
        <Person key={person.name} person={person} />
      );
    });
  };

  return (
    <div>{showPersons()}</div>
  );
};

export default Persons;