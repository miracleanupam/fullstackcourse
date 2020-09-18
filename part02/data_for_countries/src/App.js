import React, { useState, useEffect } from "react";
import axios from "axios";

// Component for getting serch term
const Search = ({ value, handleSearchInput }) => {
  return (
    <div>
      find countries <input value={value} onChange={handleSearchInput} />
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
          <ListItem key={lang.name} name={lang.name} />
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

const ListItem = ({ name }) => {
  return <li>{name}</li>;
};

const DisplayDetails = ({ showResults, tooManyMatch, searchResults }) => {
  // Looks confusing but here is the summary
  // showResult ? Logic for showing results : Don't so anything
  // Logic for showing results:
  // tooManyResults ? Display the respective message : Logic for showing detail or list
  // Logic for showing detail or list:
  // serachResults.length === 1: show details ? show list
  return (
    <div>
      {showResults ? (
        tooManyMatch ? (
          <p>Too many matches, specify another filter</p>
        ) : searchResults.length === 1 ? (
          <div>
            <CountryDetail data={searchResults[0]} />
          </div>
        ) : (
          <div>
            <ul>
              {searchResults.map((c) => (
                <ListItem key={c.name} name={c.name} />
              ))}
            </ul>
          </div>
        )
      ) : (
        <div></div>
      )}
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

  return (
    <div>
      <Search value={searchTerm} handleSearchInput={handleSearchInput} />
      <DisplayDetails
        showResults={showResults}
        tooManyMatch={tooManyMatch}
        searchResults={searchResults}
      />
    </div>
  );
}

export default App;
