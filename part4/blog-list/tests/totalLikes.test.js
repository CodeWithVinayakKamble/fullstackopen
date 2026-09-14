const { test, describe } = require('node:test')
const assert = require('node:assert')
const totalLikes = require('../utils/list_helper').totalLikes
const blogs = require('../utils/dummy_test_data').blogs

describe('total likes', () => {

  test('with empty blogs array is 0', () => {
    assert.strictEqual(totalLikes([]), 0)
  })

  test('with one blog array likes are 12', () => {
    assert.strictEqual(totalLikes([blogs[2]]), 12)
  })

  test('with bigger blog array total likes are 36', () => {
    assert.strictEqual(totalLikes(blogs), 36)
  })

})