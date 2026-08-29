import { useState, useEffect } from "react";
import personServices from './services/persons';
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {

  // ==== useState ==== //
  const [persons, setPersons] = useState([]);
  // name
  const [newName, setNewName] = useState('');
  // number
  const [newNumber, setNewNumber] = useState('');
  // searchInput
  const [searchQuery, setSearchQuery] = useState('');
  // message
  const [notification, setNotification] = useState()

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
      setNewName('');
      setNewNumber('');
      setNotification({
        message: `${newName} is already added to phonebook`,
        type: 'success'
      })
      setTimeout(() => { setNotification(null) }, 2000)
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
            setNotification({
              message: `Updated ${newNumber}`,
              type: 'success'
            })
            setTimeout(() => { setNotification(null) }, 2000)
          })
          .catch(err => {
            setNotification({
              message: `Information of ${isDuplicate.name} has already been removed from server`,
              type: 'error'
            })
            setTimeout(() => { setNotification(null) }, 2000)
            setNewName('')
            setNewNumber('')
            setPersons(persons.filter(person => person.id !== isDuplicate.id))
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

    // Sending data from react app to the backend (fake-server)
    personServices
      .create(personObject)
      .then(returnedPerson => {
        setPersons([...persons, returnedPerson])
        setNewName('')
        setNewNumber('')
        setNotification({
          message: `Added ${newName}`,
          type: 'success'
        })
        setTimeout(() => { setNotification(null) }, 2000)
      })
  };

  // 
  const deletePersonOf = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      personServices
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotification({
            message: `Deleted ${name}`,
            type: 'delete'
          })
          setTimeout(() => { setNotification(null) }, 2000)
        })
        .catch(err => {
          setNotification({
            message: `Information of ${name} has already been removed from server`,
            type:'error'
          })
          setTimeout(() => { setNotification(null) }, 2000)
          setPersons(persons.filter(person => person.id !== id))
        })
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
      <Notification notification={notification} />
      <Filter value={searchQuery} handler={handleUserQuery} />

      <h2>add a new</h2>

      <PersonForm onSubmit={addPerson} newName={newName} userNameHandler={handleUserName} newNumber={newNumber} userNumberHandler={handleUserNumber} />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deleteHandler={deletePersonOf} />
    </div>
  )
};

export default App;
