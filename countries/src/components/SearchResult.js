import React from 'react';
import Countries from './Countries';

const SearchResult = ({ countries, filter, selectedCountry, setSelectedCountry }) => {
  const filterCountries = (term) => {
    return countries.filter((country) => {
      return country.name.toLowerCase().includes(term.toLowerCase());
    });
  };

  const showSearchResult = () => {
    const searchTerm = filter.trim();

    // if blank, do nothing
    if (!searchTerm) { 
      return (
        <div>Specify a filter</div>
      );
    };

    const filteredCountries = filterCountries(searchTerm);

    console.log('filtered countries', filteredCountries);

    if (filteredCountries.length === 0) {
      return (
        <div>No countries found</div>
      );
    } else if (filteredCountries.length >= 10) {
      return (
        <div>Too many matches, specify another filter</div>
      );
    }
    
    return (
      <Countries 
        countries={filteredCountries} 
        selectedCountry={selectedCountry} 
        setSelectedCountry={setSelectedCountry} />
    );
  };

  return (
    <div>
      {showSearchResult()}
    </div>
  )
};

export default SearchResult;