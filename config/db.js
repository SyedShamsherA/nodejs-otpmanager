const mongoose = require('mongoose')
require('dotenv').config()
const { DB_CONNECTION_STRING } = process.env

const connectDB = async() => {
    try {
       await mongoose.connect(DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
       console.log('Connected to mongoDb') 
    } catch (error) {
        console.error('MongoDB connection failed:', error.message)
        process.exit(1)
    }
}

module.exports = connectDB