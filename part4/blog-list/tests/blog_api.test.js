const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const initialBlogs = require('./blog_api_helper').initialBlogs
const allBlogsInDb = require('./blog_api_helper').blogsAtEnd


const api = supertest(app)

// ==== BeforEach (wipes previous DB data  & inserts initialBlogs) ==== //
beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})


describe('Space for testing HTTP GET Request', () => {

    // ==== Request Hitting HTTP GET Request inbehalf of react and rest/postman ==== //
    test("HTTP GET Request", async () => {
        await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    })

    // ==== Response cachening and testing HTTP GET Request ==== //
    test("all blogs return with expected length", async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, initialBlogs.length)
    })

    test("HTTP GET request and testing response data has parsed json id insted of object id", async () => {
        const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
        assert("id" in response.body[0])
        assert.strictEqual(response.body[0]._id, undefined)
    })

})

describe('space for testing HTTP POST request', () => {

    test("saved new Blog into db succesfully", async () => {

        const newBlog = {
            title: "testing blog 4 : cheking HTTP Post Request",
            author: "codeWithVinayakKamble",
            url: "http//:codeWithVinayakKamble.github.com",
            likes: 20
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsInDb = await allBlogsInDb()
        assert.strictEqual(blogsInDb.length, initialBlogs.length + 1)

        // ==== verification test that actually post is saved in db ==== //
        const titles = blogsInDb.map(blog => blog.title)
        assert(titles.includes(response.body.title))
    })

    test("test case for likes if missed in request it should be deafult to 0", async () => {

        const newBlog = {
            title: "testing blog 5 : for missing content should be redirect for default value",
            author: "codeWithVinyakKamble",
            url: "http://codeWithVinayakKamble.github.com"
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.likes, 0)
    })
})


describe("space for HTTP POST testing bad request", () => {

    test("test for bad request title missing", async () => {

        const newBlog = {
            author: "codeWithVinayakKamble",
            url: "http//:codeWithVinayakKamble.github.com",
            likes: 25
        }

        await api.post('/api/blogs').send(newBlog).expect(400)
        const blogsInDb = await allBlogsInDb()
        assert.strictEqual(blogsInDb.length, initialBlogs.length)
    })

    test("test for bad request URL missing", async () => {

        const newBlog = {
            title: "testing blog 6 : url missing bad request",
            author: "codeWithVinayakKamble",
            likes: 25
        }

        await api.post('/api/blogs').send(newBlog).expect(400)
        const blogsInDb = await allBlogsInDb()
        assert.strictEqual(blogsInDb.length, initialBlogs.length)
    })

})

after(async () => {
    await mongoose.connection.close()
})