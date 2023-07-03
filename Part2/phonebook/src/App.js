import { useState } from 'react'

const Names = ({ nameObject }) => {
  return (
    <li>{nameObject.name}: {nameObject.number}</li>
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

const Persons = ({personAfterFillter}) => {
  return (
    <ul>
        {
          personAfterFillter.map(person => 
            <Names key ={person.name} nameObject={person}/>)
        }
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    const find = persons.find(object => object.name === nameObject.name)
    if (find) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
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
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>

      <h2>Add a new</h2>
      <PersonForm addName={addName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personAfterFillter={personAfterFillter}/>
    </div>
  )
}

export default App;
