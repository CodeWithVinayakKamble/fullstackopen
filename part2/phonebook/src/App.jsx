import { useState, useEffect } from "react";
import axios from 'axios';

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

const Persons = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map(person => {
        const { id, name, number } = person;
        return (
          <p key={id}>{name} {number}</p>
        )
      })}
    </div>
  )
};

const App = () => {

  // 
  const [persons, setPersons] = useState([]);
  // Locked html Inputs into React state here;
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // fetching data here
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        const { data } = response;
        setPersons(data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();

    let isDuplicateName = persons.some((person) => person.name === newName);

    if (isDuplicateName) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      setNewNumber('')
      return;
    };

    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    };

    setPersons([...persons, personObject]);
    setNewName('')
    setNewNumber('')
  };

  const handleUserName = (event) => {
    setNewName(event.target.value)
  };

  const handleUserNumber = (event) => {
    setNewNumber(event.target.value)
  };

  const handleUserQuery = (event) => {
    setSearchQuery(event.target.value)
  };

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(searchQuery.toLowerCase()));


  return (
    <div>
      <h1>Phonebook</h1>

      <Filter value={searchQuery} handler={handleUserQuery} />

      <h2>add a new</h2>

      <PersonForm onSubmit={addPerson} newName={newName} userNameHandler={handleUserName} newNumber={newNumber} userNumberHandler={handleUserNumber} />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
};

export default App;