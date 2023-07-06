import { useState, useEffect } from 'react'
import axios from 'axios'
import phoneBookSerice from './services/Phonebook'

const Names = ({ nameObject, onCLickHandle}) => {
  return (
    <li>{nameObject.name}: {nameObject.number} <button onClick={(e)=>onCLickHandle(nameObject, e)}>delete</button></li>
  )
}

const Filter = ({newFilter, handleFilterChange}) => {
  return (
    <div>
        filter shown with: <input value={newFilter}
                            onChange={handleFilterChange}
                            />

    </div>
  )
}

const PersonForm = ({addName, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addName}>
        <div>
          name: <input value={newName}
            onChange={handleNameChange}
            />
        </div>
        <div>
          number: <input value ={newNumber}
          onChange={handleNumberChange}
        /></div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const Persons = ({personAfterFillter, deletePerson}) => {
  return (
    <ul>
        {
          personAfterFillter.map(person => 
            <Names key ={person.name} nameObject={person} onCLickHandle={deletePerson}/>)
        }
    </ul>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 48
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [operateMessage, setOperateMessage] = useState('')

  const hook = () => {
    phoneBookSerice
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    const find = persons.find(object => object.name === nameObject.name)
    if (find) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
        nameObject.id = find.id
        console.log(nameObject)
        phoneBookSerice
          .update(find.id, nameObject)
          .then(returnPerson => {
            setPersons(persons.map(person => person.id !== find.id ? person : returnPerson))
            setOperateMessage(`Modified ${returnPerson.name}`)
            setTimeout(() => {
              setOperateMessage('')
            }, 5000)
          })
      }
    } else {
      phoneBookSerice
        .create(nameObject)
        .then(returnPerson => {
          //setPersons(persons.concat(nameObject))
          setPersons(persons.concat(returnPerson))
          setOperateMessage(`Add ${returnPerson.name}`)
          setTimeout(() => {
            setOperateMessage('')
          }, 5000)
      })

    }
  }

  const deletePerson = (nameObject, e) => {
    if (window.confirm("Do you really want to delete " + nameObject.name + " ?")) {
    axios
      .delete(`http://localhost:3001/persons/${nameObject.id}`)
      .then(response => {
        setPersons(persons.filter(person => person.id !== nameObject.id))
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personAfterFillter = (newFilter === '') ? 
                              persons
                              : persons.filter(person => person.name.match(newFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={operateMessage}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm addName={addName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personAfterFillter={personAfterFillter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App;
