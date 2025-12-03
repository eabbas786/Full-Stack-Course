


import personServices from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Persons'

import { useState, useEffect } from 'react'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchVal, setSearchVal] = useState('')

  useEffect(() => {
    console.log('effect')
    personServices
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  // console.log(persons.length, 'persons rendered')

  const addPerson = (event) => {
    event.preventDefault()


    const original = persons.find(person => person.name === newName)
    if (original) {
      const warning = `${newName} is already added to phonebook, replace the old number with a new one?`
      window.confirm(warning)
      personServices
        .replace(original.id, { ...original, "number": newNumber })
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id === original.id ? returnedPerson : p))
        })

    }
    else {
      // id: String(persons.length + 1)
      // 
      const personObject = {
        name: newName,
        number: newNumber
      }
      personServices
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }

    setNewName('') // restore state of newName
    setNewNumber('')

  }

  const deletePerson = (id, name) => {
    console.log(id)
    console.log(name)
    window.confirm(`Delete ${name}?`)
    personServices
      .remove(id)
      .then(setPersons(persons.filter(p => p.id != id)))

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

  // console.log(persons)
  const filtered = persons.filter(person =>
    person.name.toLowerCase().includes(searchVal.toLowerCase()))

  const displayed = searchVal ? filtered : persons

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter value={searchVal} onChange={handleSearchChange} />

      <h2>Add a new person</h2>

      <PersonForm
        onSubmit={addPerson}
        name={newName} onNameChange={handleNameChange}
        number={newNumber} onNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Person persons={displayed} handleDelete={deletePerson} />

    </div>
  )
}

export default App