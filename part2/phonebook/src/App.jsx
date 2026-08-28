import { useState, useEffect } from "react";
import personServices from './services/persons';

const Filter = ({ value, handler }) => {
  return (
    <>
      Filter shown with <input value={value} onChange={handler} />
    </>
  )
};

const PersonForm = ({ onSubmit, newName, userNameHandler, newNumber, userNumberHandler }) => {
  return (
    <form onSubmit={onSubmit} >

      <div>
        name: <input value={newName} onChange={userNameHandler} />
      </div>

      <div>
        number : <input value={newNumber} onChange={userNumberHandler} />
      </div>

      <div>
        <button type="submit">add</button>
      </div>

    </form>
  )
};

const Persons = ({ personsToShow, deleteHandler }) => {
  return (
    <div>
      {personsToShow.map(person => {
        const { id, name, number } = person;
        return (
          <p key={id}>{name} {number} <button onClick={() => deleteHandler(id, name)}>delete</button></p>
        )
      })}
    </div>
  )
};

const App = () => {

  // ==== useState ==== //
  const [persons, setPersons] = useState([]);
  // name
  const [newName, setNewName] = useState('');
  // number
  const [newNumber, setNewNumber] = useState('');
  // searchInput
  const [searchQuery, setSearchQuery] = useState('');

  // ==== fetching data here ==== //
  useEffect(() => {
    personServices
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])

  // ==== Functions ==== //
  const addPerson = (event) => {
    event.preventDefault();

    // Finding Entry here
    let isDuplicate = persons.find((person) => person.name === newName);

    // Checking for duplicate
    if (isDuplicate && isDuplicate.number === newNumber) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      setNewNumber('');
      return;
    };

    // Cheking for non duplicate
    if (isDuplicate && isDuplicate.number !== newNumber) {
      let confirmation = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`);

      if (confirmation) {
        let changedNumber = { ...isDuplicate, number: newNumber };
        personServices
          .update(isDuplicate.id, changedNumber)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id === isDuplicate.id ? updatedPerson : p))
            setNewName('')
            setNewNumber('')
          })
      }
      else {
        setNewName('')
        setNewNumber('')
      }
      return
    }

    // object that contains user input
    const personObject = {
      name: newName,
      number: newNumber
    };

    // Connection to the backend (fake-server)
    personServices
      .create(personObject)
      .then(returnedPerson => {
        setPersons([...persons, returnedPerson])
        setNewName('')
        setNewNumber('')
      })
  };

  // 
  const deletePersonOf = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      personServices
        .remove(id)
        .then(() => (setPersons(persons.filter(person => person.id !== id))))
    }
  };

  // Filteration on typed
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(searchQuery.toLowerCase()));


  // ==== Handlers ==== //
  // handler for name
  const handleUserName = (event) => {
    setNewName(event.target.value)
  };

  // handler for number
  const handleUserNumber = (event) => {
    setNewNumber(event.target.value)
  };

  // handler for serachBar
  const handleUserQuery = (event) => {
    setSearchQuery(event.target.value)
  };

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter value={searchQuery} handler={handleUserQuery} />

      <h2>add a new</h2>

      <PersonForm onSubmit={addPerson} newName={newName} userNameHandler={handleUserName} newNumber={newNumber} userNumberHandler={handleUserNumber} />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deleteHandler={deletePersonOf} />
    </div>
  )
};

export default App;
