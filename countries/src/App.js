import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import SearchResult from './components/SearchResult';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({});

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        setCountries(response.data);
      });
  };

  useEffect(hook, []);

  const changeFilter = (event) => {
    setFilter(event.target.value);
    setSelectedCountry({});
  };

  return (
    <div>
      <Filter filter={filter} changeFilter={changeFilter} />
      <SearchResult 
        countries={countries} 
        filter={filter}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry} />
    </div>
  );
};

export default App;
