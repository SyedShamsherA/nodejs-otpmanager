const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')
const otpController = require('../controllers/otpController')

router.post('/generate-otp', verifyToken, otpController.generateOTP)
router.post('/validate-otp', verifyToken, otpController.validateOTP)

module.exports = router