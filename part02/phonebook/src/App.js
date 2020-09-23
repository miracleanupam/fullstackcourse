import React, { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ search, handleSearchInput, handleSearch }) => {
  return (
    <div>
      Filter shown with <input value={search} onChange={handleSearchInput} />
    </div>
  );
};

const AddPersonForm = ({
  addPerson,
  handleNameInput,
  newName,
  newNumber,
  handleNumberInput,
}) => {
  return (
    <form onSubmit={addPerson}>
      <h4>Add a new</h4>
      <div>
        Name: <input value={newName} onChange={handleNameInput} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={handleNumberInput} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

const PersonDetails = ({ persons }) => {
  console.log(persons);
  return (
    <div>
      <h2>Numbers</h2>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        ))}
    </div>
  );
};

const App = () => {
  // this state is used to store the current/filtered details of phonebook
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  // This state is used to store entire details of persons from phonebook
  const [allPersons, setAllPersons] = useState(filteredPersons);

  const DATA_ENDPOINT = "http://localhost:3001/persons";
  
  useEffect(() => {
    axios.get(DATA_ENDPOINT).then(
      response => {
        setFilteredPersons(response.data);
        setAllPersons(response.data);
      }
    )
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const already_exists = filteredPersons.filter((p) => p.name === newName);

    if (already_exists.length) {
      // Its supposed to be backticks and not a quote for string formatting
      window.alert(`'${newName}' is already added to phonebook`);
    } else {
      const newPerson = {
        // Since state variable filteredPersons is used to store the filtered results
        // It should not be used when adding a new phonebook contact
        // allPersons should be used
        name: newName,
        number: newNumber,
      };

      axios.post('http://localhost:3001/persons', newPerson)
        .then(response => {
          // When adding a new phoneboo contact, update both filteredPersons and
          // allPersons so that the results get updated
          setFilteredPersons(allPersons.concat(response.data));
          setAllPersons(allPersons.concat(response.data));

          setNewName("");
          setNewNumber("");
        })

    }
  };

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchInput = (event) => {
    setSearch(event.target.value);
    handleSearch(event.target.value);
  };

  const handleSearch = (term) => {
    // To make the search case insensitive, each string is
    // converted to lowercase. string1.includes(string2) returns True
    // when string2 is a substring of string1
    const filterResult = allPersons.filter((p) =>
      p.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredPersons(filterResult);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        search={search}
        handleSearchInput={handleSearchInput}
        handleSearch={handleSearch}
      />

      <AddPersonForm
        newName={newName}
        handleNameInput={handleNameInput}
        newNumber={newNumber}
        handleNumberInput={handleNumberInput}
        addPerson={addPerson}
      />
      <PersonDetails persons={filteredPersons} />
    </div>
  );
};

export default App;
