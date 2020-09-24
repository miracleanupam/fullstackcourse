import React, { useState, useEffect } from "react";
import PersonServices from "./services/persons";
import "./App.css";

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

const PersonDetails = ({ persons, handleRemove }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleRemove(person.id)}>Delete</button>
        </li>
      ))}
    </div>
  );
};

const Message = ({ msg }) => {
  return (
    <div>
      {msg.text !== "" ? (
        <div className={msg.isError === true ? "error" : "success"}>
          <h2>{msg.text}</h2>
        </div>
      ) : (
        <div></div>
      )}
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

  // State to store messages
  const [msg, setMsg] = useState({ text: "", isError: false });

  useEffect(() => {
    PersonServices.getAll()
      .then((initialPersons) => {
        setFilteredPersons(initialPersons);
        setAllPersons(initialPersons);
      })
      .catch((err) => {
        setNewMesg({
          text: "some error occured",
          isError: true,
        });
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const already_exists = allPersons.filter((p) => p.name === newName);

    if (already_exists.length) {
      // Its supposed to be backticks and not a quote for string formatting
      // window.alert(`'${newName}' is already added to phonebook`);

      const oldPerson = already_exists[0];
      const resp = window.confirm(
        `${newName} is already added to Phonebook. Replace old number?`
      );

      if (resp === true) {
        PersonServices.update(oldPerson.id, {
          ...oldPerson,
          number: newNumber,
        })
          .then((changedPerson) => {
            setFilteredPersons(
              filteredPersons.map((p) =>
                p.id !== oldPerson.id ? p : changedPerson
              )
            );
            setAllPersons(
              allPersons.map((p) => (p.id !== oldPerson.id ? p : changedPerson))
            );
            setNewMesg({
              text: "Successfully updated",
              isError: false,
            });
          })
          .catch((err) => {
            setNewMesg({
              text: `${oldPerson.name} could not be updated`,
              isError: true,
            });
          });
      } else {
        console.log("Opted not to update");
      }
    } else {
      const newPerson = {
        // Since state variable filteredPersons is used to store the filtered results
        // It should not be used when adding a new phonebook contact
        // allPersons should be used
        name: newName,
        number: newNumber,
      };

      PersonServices.create(newPerson)
        .then((personFromServer) => {
          // When adding a new phoneboo contact, update both filteredPersons and
          // allPersons so that the results get updated
          if (
            personFromServer.name.toLowerCase().includes(search.toLowerCase())
          ) {
            setFilteredPersons(filteredPersons.concat(personFromServer));
          }
          setAllPersons(allPersons.concat(personFromServer));
          setNewMesg({
            text: "Successfully added",
            isError: false,
          });
          setNewName("");
          setNewNumber("");
        })
        .catch((err) => {
          setNewMesg({
            text: `${newName} could not be added`,
            isError: true,
          });
        });
    }
  };

  const setNewMesg = (newMessage) => {
    setMsg(newMessage);

    setTimeout(() => {
      setMsg({
        text: "",
        isError: false,
      });
    }, 5000);
  };

  const handleRemove = (id) => {
    const nameToDel = allPersons.filter((p) => p.id === id)[0].name;
    const resp = window.confirm(`Delete ${nameToDel}`);

    if (resp === true) {
      PersonServices.remove(id)
        .then((res) => {
          setFilteredPersons(filteredPersons.filter((p) => p.id !== id));
          setAllPersons(allPersons.filter((p) => p.id !== id));
          setNewMesg({
            text: "Successfully deleted",
            isError: false,
          });
        })
        .catch((err) => {
          setNewMesg({
            text: `Information of ${nameToDel} has already been removed from server`,
            isError: true,
          });
        });
    } else {
      console.log("Opted not to delete");
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
      <Message msg={msg} />
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
      <PersonDetails persons={filteredPersons} handleRemove={handleRemove} />
    </div>
  );
};

export default App;
