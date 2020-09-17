import React, { useState } from "react";

const AddPersonForm = ({ addPerson, handleNameInput, newName }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input value={newName} onChange={handleNameInput} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

const AllPersons = ({ persons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([{ id: 0, name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const already_exists = persons.filter(p => p.name === newName);

    if (already_exists.length) {
      // Its supposed to be backticks and not a quote for string formatting
      window.alert(`'${newName}' is already added to phonebook`);
    } else {
      const newPerson = {
        id: persons.length + 1,
        name: newName,
      };
      setPersons(persons.concat(newPerson));
    }
    setNewName("");
  };

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <AddPersonForm
        newName={newName}
        handleNameInput={handleNameInput}
        addPerson={addPerson}
      />
      <AllPersons persons={persons} />
    </div>
  );
};

export default App;
