// ================================== //
// Cutom Logger,Error & Fallback Middlewares
// ================================== //

const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('---')
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  next()
}


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown Endpoint' })
}


const errorHandler = (error, request, response, next) => {

  logger.info(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.messgae })
  }

  next(error)

}


module.exports = { requestLogger, unknownEndpoint, errorHandler }