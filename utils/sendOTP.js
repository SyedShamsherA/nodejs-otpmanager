const nodemailer = require('nodemailer')

const sendOTP = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'syedshamsher9174@gmail.com',
                pass: 'SYED@shamsher14'
            }
        })
        const mailOptions = {
            from: 'syedshamsher9174@gmail.com',
            to: email,
            subject: 'Your OTP for verification',
            text: `Your One time password is ${otp}, kindly don't share your credentials with anyone.`
        }
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.error('Error sending OTP via email:', error.message)
        throw new Error('Error sending otp via email')
    }
}

module.exports = sendOTP