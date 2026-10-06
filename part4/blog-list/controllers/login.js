const loginRouter = require('express').Router()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { SECRET } = require('../utils/config')


loginRouter.post('/', async (request, response) => {

  const { username, password } = request.body

  const user = await User.findOne({ username })

  const passwordCheck = user !== null ? await bcryptjs.compare(password, user.passwordHash) : false

  if (!(user && passwordCheck)) {
    return response.status(401).json({ error: 'Invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, SECRET)


  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter