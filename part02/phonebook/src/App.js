import React, { useState } from "react";

const Filter = ({ search, handleSearchInput, handleSearch }) => {
  return (
    <div>
      <form onSubmit={handleSearch}>
        Filter shown with <input value={search} onChange={handleSearchInput} />
      </form>
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
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  // this state is used to store the current/filtered details of phonebook
  const [filteredPersons, setFilteredPersons] = useState([
    { id: 1, name: "Arto Hellas", number: "040-123456" },
    { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
    { id: 3, name: "Dan Abramov", number: "12-43-234345" },
    { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  // This state is used to store entire details of persons from phonebook
  const [allPersons, setAllPersons] = useState(filteredPersons);


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
        id: allPersons.length + 1,
        name: newName,
        number: newNumber,
      };

      // When adding a new phoneboo contact, update both filteredPersons and
      // allPersons so that the results get updated
      setFilteredPersons(allPersons.concat(newPerson));
      setAllPersons(allPersons.concat(newPerson));
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchInput = (event) => {
    setSearch(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // To make the search case insensitive, each string is 
    // converted to lowercase. string1.includes(string2) returns True 
    // when string2 is a substring of string1
    const filterResult = allPersons.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
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
