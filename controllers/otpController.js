const otpGenerator = require('otp-generator')
const Otp = require('../models/Otp')
const sendOTP = require('../utils/sendOTP')

const generateOTP = (length) => {
    return otpGenerator.generate(length, {digits: true, lowerCaseAlphabets: true, upperCaseAlphabets: true, specialChars: false})
}

const generateOTPController = async(req, res) => {
    try {
        const { user } = req
        if(!user){
            return res.status(401).json({ message: 'user not authenticated' })
        }
        const { email } = user
        const otpValue = generateOTP(6)
        sendOTP(email, otpValue)
        await Otp.create({ email, otp: otpValue })
        res.json({ message : 'Otp generated and sent successfully' })
    } catch (error) {
        console.error('Error generating otp:', error.message)
        res.status(500).json({ error: 'Internal server error' })
    }
}

const validateOTPController = async(req, res) => {
    try {
        const { user } = req
        const { email, otp } = req.body
        if(!user){
            return res.status(401).json({ message: 'User not authenticated' })
        }
        const storedOtp = await Otp.findOne({ email, otp })
        if(!storedOtp){
            return res.status(401).json({ message: 'Invalid OTP' })
        }
        const currentTime = new Date()
        if(storedOtp.createdAt.getTime() + (5 * 60 * 1000) < currentTime.getTime()){
            return res.status(401).json({ message : 'OTP has expired' })
        }
        await Otp.deleteOne({ email, otp })
        res.json({ message: 'OTP validated successfully' })
    } catch (error) {
        console.error('Error validating Otp:', error.message)
        res.status(500).json({ error: 'Internal server error' })
    }
}

module.exports = { generateOTP: generateOTPController, validateOTP: validateOTPController }