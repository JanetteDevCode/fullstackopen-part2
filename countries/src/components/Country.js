import React from 'react';

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
      <p>{`capital ${country.capital}`}</p>
      <p>{`population ${country.population}`}</p>
      <h2>languages</h2>
      <ul>
        {showLanguages()}
      </ul>
    </div>
  );
};

export default Country;