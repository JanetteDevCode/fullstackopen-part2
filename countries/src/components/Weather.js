import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiKeys from '../apiKeys';

const Weather = ({ country }) => {
  const [weather, setWeather] = useState();

  const queryCapital = country.capital.replace(/\s/g, '+');
  const queryCountry = country.name.replace(/\s/g, '+');

  const url = 'http://api.weatherstack.com/current?'
    .concat('access_key=', apiKeys.weather_key, '&query=', queryCapital, '+', queryCountry);

  const hook = () => {
    axios
      .get(url)
      .then((response) => {
        console.log('received response from url:', url);
        setWeather(response.data);
      });
  };

  useEffect(hook, [country]);

  console.log('weather:', weather);

  if (weather === undefined) {
    return(
      <div>Weather not available</div>
    );
  } 

  return (
    <div>
      <h2>Weather in {weather.location.name}, {weather.location.country}</h2>
      <p><strong>temperature: </strong> {weather.current.temperature} &deg;C</p>
      <p><img src={weather.current.weather_icons[0]} alt="weather icon"/></p>
      <p><strong>wind: </strong> {weather.current.wind_speed} kph direction {weather.current.wind_dir}</p>
    </div>
  );
};

export default Weather;