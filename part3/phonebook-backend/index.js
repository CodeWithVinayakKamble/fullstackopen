// ================================== //
// Imports & Dependencies
// ================================== //
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

// ================================== //
// App Initialization
// ================================== //
const app = express()

// ================================== //
// Pre-Route Middlewares
// ================================== //
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
morgan.token('body', req => JSON.stringify(req.body))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

// ================================== //
// Route Handlers
// ================================== //


// ==== Route Fetching ==== //
app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(people => {
      res.json(people)
    })
    .catch(error => next(error))
})


// ==== Route Adding new Body ==== //
app.post('/api/persons', (req, res, next) => {

  const body = req.body

  if (!body.name) {
    return res.status(400).json({ error: 'Name missing' })
  }

  if (!body.number) {
    return res.status(400).json({ error: 'Number missing' })
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number
  })

  newPerson.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))

})

// ==== Route Delete ==== //
app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

// ==== Route Duplicate number update ==== //
app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const { name, number } = req.body

  Person.findByIdAndUpdate(id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => res.json(updatedPerson))
    .catch(error => next(error))
})

// ==== Route For fetch ope for single person ==== //
app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

// ==== Route for info ==== //
app.get('/info', (req, res, next) => {
  Person.countDocuments({})
    .then(count => {
      const date = new Date()
      res.send(`
            <p>Phonebook has info for ${count} people</p>
            <p>${date}</p>
        `)
    })
    .catch(error => next(error))
})


// ================================== //
// Error & Fallback Middlewares
// ================================== //

// ==== Fallback for unknownEndpoints ==== //
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// ============================================ //

// ==== Centralized Error Handling Middleware ==== //
const errorHandler = (error, req, res, next) => {

  console.log(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })

  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)




// ================================== //
// Server Listener
// ================================== //
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`server is live on : http://localhost:${PORT}`)
})