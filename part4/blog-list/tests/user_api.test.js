const { describe, test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const User = require('../models/user')
const allUsersInDb = require('./user_api_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

// ======================================== //


describe('checking db length', () => {

  test('there is a zero users at initial state', async () => {
    const usersAtStart = await allUsersInDb()

    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, usersAtStart.length)
  })
})

// ======================================== //

describe('adding fresh user with valid credintials', () => {

  test('users.length should be 1 now', async () => {

    const usersAtStart = await allUsersInDb()

    const newUser = {
      username: 'admin_fso',
      name: 'vinayak',
      password: 'admin@vinayak123'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await allUsersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    const userNames = usersAtEnd.map(user => user.username)
    assert(userNames.includes(response.body.username))

  })

})

// ======================================== //

describe('testing for duplicate user && uniqueness by default', () => {

  test('expected error `username should be unique` and db length should remain same', async () => {


    const dummyUser = {
      username: 'admin_vinayak',
      name: 'vinayak',
      password: 'admin@vinayak123'
    }

    await api.post('/api/users').send(dummyUser).expect(201)

    const usersAtStart = await allUsersInDb() // 1

    const newUser = {
      username: 'admin_vinayak',
      name: 'vinayak',
      password: 'admin@vinayak123'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await allUsersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    assert.strictEqual(response.body.error, 'expected `username` to be unique')

  })

})

// ======================================== //

describe('Invalid users testing ,if user input less than 3 char in username or in password', () => {

  test('db length should be same invalid user should not get saved in db if put short username', async () => {

    const usersAtStart = await allUsersInDb() // 2

    const newUser = {
      username: 'vi',
      name: 'Vinayak',
      password: 'shortUsername'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await allUsersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    assert.strictEqual(response.body.error, 'username must be at least 3 characters long')
  })

    // ======================================== //

  test('db length should be same invalid user should not get saved in db if put short password', async () => {

    const usersAtStart = await allUsersInDb() // 0

    const newUser = {
      username: 'admin_vinayak123',
      name: 'Vinayak',
      password: 'sh'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await allUsersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    assert.strictEqual(response.body.error, 'password must be at least 3 characters long')
  })
})

// ======================================== //

after(async () => {
  await mongoose.connection.close()
})