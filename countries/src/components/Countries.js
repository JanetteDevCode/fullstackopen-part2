import React from 'react';
import Country from './Country';

const Countries = ({ countries, selectedCountry, setSelectedCountry }) => {
  const showCountriesList = () => {
    return countries.map((country) => {
      return (
        <p key={country.name}>
          {country.name}
          <button onClick={setCountryToShow(country)}>show</button>
        </p>
      );
    });
  };

  const setCountryToShow = (country) => {
    return () => {
      setSelectedCountry(country);
    };
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
  } else if ("name" in selectedCountry) {
    return (
      <div>
        {showCountriesList()}
        {showCountryDetail(selectedCountry)}
      </div>
    );
  }

  return (
    <div>{showCountriesList()}</div>
  );
  
};

export default Countries;