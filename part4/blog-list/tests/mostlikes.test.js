const { test } = require('node:test')
const assert = require('node:assert')
const mostLikes = require('../utils/list_helper').mostLikes
const blogs = require('../utils/dummy_test_data').blogs

test('for getting most liked blogger who is { author: \'Edsger W. Dijkstra\', likes: 17 }', () => {
  assert.deepStrictEqual(mostLikes(blogs), { author: 'Edsger W. Dijkstra', likes: 17 })
})

