const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
require('dotenv').config()

const app = express()

connectDB()

app.use(express.json())

app.use(cors())

const authRoutes = require('./routes/authRoutes')
const otpRoutes = require('./routes/otpRoutes')

app.get('/', async(req, res) => {
    res.json(({ message : 'application started successfully' }))
})
app.use('/api/auth', authRoutes)
app.use('/api/otp', otpRoutes)

app.use( (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: 'Internal server error' })
})

const PORT = process.env.PORT || 3000 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})