const express = require('express')
const router = express.Router()
const Dashboard = require('../models/dashboard')
const verifyToken = require('../middlewares/verifyToken')

router.get('/dashboard', verifyToken, async(req, res) => {
    try {
        const dashboardData = await Dashboard.findOne()
        if(!dashboardData){
            return res.status(404).json({ message: 'Dashboard data not found' })
        }
        res.json(dashboardData)
    } catch (error) {
        console.error('error fetching dashboard data:', error.message)
        res.status(500).json({ error: 'internal server error' })
    }
})

module.exports = router