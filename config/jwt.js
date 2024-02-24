const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env

const generateToken = (data) => jwt.sign(data, JWT_SECRET, {expiresIn: '1h'})

const verifyToken = (token) => jwt.verify(token, JWT_SECRET)

module.exports = { generateToken, verifyToken } ;