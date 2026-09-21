require('dotenv').config()

const MONGODB_URL = process.env.MONGODB_URI
const TEST_MONGODB_URI = process.env.TEST_MONGODB_URI

const MONGODB_URI = process.env.NODE_ENV === "test" ? TEST_MONGODB_URI : MONGODB_URL
const PORT = process.env.PORT || 3003

module.exports = { MONGODB_URI, PORT }