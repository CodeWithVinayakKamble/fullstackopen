const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const initialBlogs = require('./blog_api_helper').initialBlogs

const api = supertest(app)

describe('Testing environment for blog_api.test by TEST_MONGO_DB', () => {

    // ==== BeforEach ==== //
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(initialBlogs)
    })

    // ==== Hitting HTTP GET Request inbehalf ui and rest/postman ==== //
    test("HTTP GET Request", async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    // ==== Testing against HTTP GET Request ==== //
    test("all blogs return with expected length", async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, initialBlogs.length)
    })

})

after(async () => {
    await mongoose.connection.close()
})