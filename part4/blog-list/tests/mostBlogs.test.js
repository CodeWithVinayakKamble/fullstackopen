const { test } = require('node:test')
const assert = require('node:assert')
const mostBlogs = require('../utils/list_helper').mostBlogs
const blogs = require('../utils/dummy_test_data').blogs


test('for getting most blogger person who is Robert C. Martin with 3 blogs ', () => {
  assert.deepStrictEqual(mostBlogs(blogs), { author: 'Robert C. Martin', blogs: 3 })
})
