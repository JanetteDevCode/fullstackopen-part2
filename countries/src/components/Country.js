import React from 'react';
import Weather from './Weather';

const Country = ({ country }) => {
  const showLanguages = () => {
    return country.languages.map((language) => {
      return (
        <li key={language.name}>{language.name}</li>
      );
    });
  };

  return (
    <div>
      <h1>{country.name}</h1>
      <p><strong>capital: </strong>{country.capital}</p>
      <p><strong>population: </strong>{country.population}</p>
      <h2>languages</h2>
      <ul>
        {showLanguages()}
      </ul>
      <p><img src={country.flag} alt="flag" width="150" /></p>
      <Weather country={country} />
    </div>
  );
};

export default Country;