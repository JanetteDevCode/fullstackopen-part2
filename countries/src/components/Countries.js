import React from 'react';
import Country from './Country';

const Countries = ({ countries }) => {
  const showCountries = () => {
    return countries.map((country) => {
      return (
        <p key={country.name}>{country.name}</p>
      );
    });
  };

  const showCountryDetail = (country) => {
    return (
      <Country country={country} />
    );
  };

  if (countries.length === 1) {
    return (
      <>{showCountryDetail(countries[0])}</>
    );
  }
  return (
    <div>{showCountries()}</div>
  );
  
};

export default Countries;