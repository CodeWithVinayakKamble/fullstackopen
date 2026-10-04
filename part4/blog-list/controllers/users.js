const userRouter = require('express').Router()
const User = require('../models/user')
const bcryptjs = require('bcryptjs')


// ========================================== //
// HTTP GET
// ========================================== //
userRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})


// ========================================== //
// HTTP POST
// ========================================== //
userRouter.post('/', async (request, response) => {

    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcryptjs.hash(password, saltRounds)

    const newUser = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
})


module.exports = userRouter