// ================================== //
// Imports & Dependencies
// ================================== //
const express = require('express')
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const config = require('./utils/config')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')


// ================================== //
// App Initialization
// ================================== //
const app = express()

// ================================== //
// Data base (MongoDb) connection init
// ================================== //
logger.info('connecting to MongoDB')
mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('Successfully connected to MongoDB Atlas (Cloud)...'))
  .catch(error => logger.error(`Error connection to MongoDB : ${error.message}`))
//

// ================================== //
// Pre-Route Middlewares
// ================================== //
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app