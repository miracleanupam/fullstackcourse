import React, { useState, useEffect } from "react";
import axios from "axios";

// Since I'm using my own API for for weather data, commenting this
// const apiKey = process.env.REACT_APP_WEATHER_API;

// Component for getting serch term
const Search = ({ value, handleSearchInput }) => {
  return (
    <div>
      find countries <input value={value} onChange={handleSearchInput} />
    </div>
  );
};

// Using weather stack directly only worked half of the time, might be problems with either my
// Implementation, or axios/fetch or weather stack api backend. I don't know which one
// So, I hosted my own API, which queried from weatherstack and gave the response to this app
// So, I still have used the weather stack api but I've put a intermediary now
const WeatherData = ({ city }) => {
  const [temp, setTemp] = useState("loading...");
  const [wind, setWind] = useState("loading...");
  const [imges, setImges] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://angrezi.herokuapp.com/api/v1/weather',
      params: {
        city: city
      },
    })
      .then((response) => {
        setTemp(response.data.current.temperature);
        setWind(
          `${response.data.current.wind_speed} kph direction ${response.data.current.wind_dir}`
        );
        setImges(response.data.current.weather_icons);
      });
  }, [city])

  return (
    <div>
      <h3>Weather in {city}</h3>
      <h4>temperature: {temp} Celcius</h4>
      {imges.map((im, idx) => <img key={idx} src={im} alt="" />)}
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
  const [capital, setCapital] = useState(['']);

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
    if (filteredResult.length === 1) {
      setCapital(filteredResult[0].capital);
    }
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
          <div>  
            <CountryDetail data={searchResults[0]} />
            <WeatherData city={capital} />
          </div>
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
