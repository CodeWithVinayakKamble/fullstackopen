const { test } = require('node:test')
const assert = require('node:assert')
const favoriteBlog = require('../utils/list_helper').favoriteBlog
const blogs = require('../utils/dummy_test_data').blogs


test('for getting most liked blog is blog[2] with 12 likes', () => {
  assert.deepStrictEqual(favoriteBlog(blogs), blogs[2])
})
