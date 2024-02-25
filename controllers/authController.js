const bcrypt = require('bcrypt')
const User = require('../models/User')
const { generateToken } = require('../config/jwt')

const signup = async(req, res) => {
    try {
        const { email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ email, password: hashedPassword })
        await user.save()
        res.json({ message: 'User registered successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const login = async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if(!user || !await bcrypt.compare(password, user.password)){
            return res.status(401).json({ message: 'Invalid credentials' })
        }
        const token = generateToken({ email: user.email })
        res.json({ token })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { signup, login }