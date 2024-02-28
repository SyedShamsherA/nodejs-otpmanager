const mongoose = require('mongoose')

const dashboardSchema = new mongoose.Schema({
    userCount: {
        type: Number,
        default: 0
    },
    orderCount:{
        type: Number,
        default: 0
    }
})

const Dashboard = mongoose.model('Dashboard', dashboardSchema)
module.exports = Dashboard