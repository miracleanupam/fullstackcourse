import React, { useState, useEffect } from "react";
import axios from "axios";

const apiKey = process.env.REACT_APP_WEATHER_API;
console.log("hello from gloabal", apiKey);

// Component for getting serch term
const Search = ({ value, handleSearchInput }) => {
  return (
    <div>
      find countries <input value={value} onChange={handleSearchInput} />
    </div>
  );
};

const WeatherData = ({ city }) => {
  const [temp, setTemp] = useState("loading...");
  const [wind, setWind] = useState("loading...");

  const getWeatherData = () => {


    // This part of code, work only half of the time
    // It gives me an error that https_access_restricted
    // But I dont' see where I have used https request
    // The same get request works every time if I use 
    // some other client for making the http request


    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}&units=m`
      )
      .then((response) => {
        // console.log(response);
        console.log(response.data.current.temperature);
        // console.log(
        // response.data.current.wind_speed,
        // "kph direction ",
        // response.data.current.wind_dir
        // );
      });
  };

  useEffect(getWeatherData, []);

  return (
    <div>
      <h3>Weather in {city}</h3>
      <h4>temperature: {temp}</h4>
      <h4>Wind: {wind}</h4>
    </div>
  );
};

// Component to show the detailed information about a country
const CountryDetail = ({ data }) => {
  return (
    <div>
      <h2>{data.name}</h2>
      <p>Capital {data.capital}</p>
      <p>Population {data.population}</p>
      <h3>Languages</h3>
      <ul>
        {data.languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img
        src={data.flag}
        alt={data.name + "'s flag"}
        width="150"
        height="150"
      ></img>
      <WeatherData city={data.capital} />
    </div>
  );
};

const CountryList = ({ data, buttonHandler }) => {
  return (
    <div>
      <ul>
        {data.map((c) => (
          <li key={c.name}>
            {c.name}
            <button onClick={() => buttonHandler(c.name)}>show</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [tooManyMatch, setTooManyMatch] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const COUNTRIES_DATA_ENDPOINT = "https://restcountries.eu/rest/v2/all";

  useEffect(() => {
    axios
      .get(COUNTRIES_DATA_ENDPOINT)
      .then((response) => setCountryData(response.data));
  }, []);

  const performSearch = (term) => {
    const filteredResult = countryData.filter((country) => {
      return country.name.toLowerCase().includes(term.toLowerCase());
    });

    if (filteredResult.length > 10) {
      setTooManyMatch(true);
    } else {
      setTooManyMatch(false);
    }
    setSearchResults(filteredResult);
    setShowResults(true);
  };

  const handleSearchInput = (event) => {
    // Set the state of search term
    // I feel like this was not needed but there's no harm in storing this info
    // Also, there might be advantages of controlling the value of search input from here
    setSearchTerm(event.target.value);

    if (event.target.value === "") {
      //If the search term is empty, turn of result section
      setShowResults(false);
    } else {
      // Else call search function
      performSearch(event.target.value);
    }
  };

  const showSpecificCountryData = (name) => {
    // Get the country name when the show button is clicked
    // Behind the scenes, just person the person with the name which is only get one result
    // Except for the corner cases like Sudan
    performSearch(name);
  };

  // Looks confusing but here is the summary
  // showResult ? Logic for showing results : Don't so anything
  // Logic for showing results:
  // tooManyResults ? Display the respective message : Logic for showing detail or list
  // Logic for showing detail or list:
  // serachResults.length === 1: show details ? show list
  return (
    <div>
      <Search value={searchTerm} handleSearchInput={handleSearchInput} />

      {showResults ? (
        tooManyMatch ? (
          <p>Too many matches, specify another filter</p>
        ) : searchResults.length === 1 ? (
          <CountryDetail data={searchResults[0]} />
        ) : (
          <CountryList
            data={searchResults}
            buttonHandler={showSpecificCountryData}
          />
        )
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
