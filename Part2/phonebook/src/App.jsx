import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Persons'

import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchVal, setSearchVal] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const found = persons.find(person => person.name === newName)
    if (found) {
      alert(`${newName} is already added to phonebook`)
      // console.log('The name ', newName, ' is already in the phonebook.')
    }
    else {
      const personObject = {
        id: String(persons.length + 1),
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
    }

    setNewName('') // restore state of newName
    setNewNumber('')

  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchVal(event.target.value)
  }

  const filtered = persons.filter(person =>
    person.name.toLowerCase().includes(searchVal.toLowerCase()))

  const displayed = searchVal ? filtered : persons

  return (
    <div>
      <Filter value={searchVal} onChange={handleSearchChange} />

      <h2>Phonebook</h2>

      <PersonForm
        onSubmit={addPerson}
        name={newName} onNameChange={handleNameChange}
        number={newNumber} onNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Person persons={displayed} />

    </div>
  )
}

export default App