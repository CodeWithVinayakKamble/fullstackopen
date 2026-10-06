// ================================== //
// Immports
// ================================== //
const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')


// ================================== //
// Morgan Logger / Custom Built Logger
// ================================== //
const requestLogger = (request, response, next) => {
  logger.info('---')
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  next()
}

// ================================== //
// Fallback for UnknownEndpoints
// ================================== //
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown Endpoint' })
}


// ================================== //
// Centrelized Error Handling System
// ================================== //
const errorHandler = (error, request, response, next) => {

  logger.info(error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'Malformatted id' })

  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })

  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })

  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  }


  next(error)
}


// ================================== //
// JWT Token Extractor
// ================================== //
const tokenExtractor = (request, response, next) => {

  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }

  next()
}

// ================================== //
//  User Extractor - Ready Made "user" , Who made the Request
// ================================== //
const userExtractor = async (request, response, next) => {

  const token = request.token

  if (!token) {
    return response.status(401).json({ error: 'Token Missing' })
  }

  const decodedToken = jwt.verify(token, SECRET)
  // The object decoded from the token contains the ""username and id fields"", which tell the server who made the request

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Invalid Token' })
  }

  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(401).json({ error: 'Invalid User' })
  }

  request.user = user

  next()

}


module.exports = { requestLogger, unknownEndpoint, errorHandler, tokenExtractor, userExtractor }