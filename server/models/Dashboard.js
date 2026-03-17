const mongoose = require('mongoose')

const dashboardSchema = new mongoose.Schema({
    layout: { type: Array, default: [] },
    widgets: { type: Array, default: [] }
}, { timestamps: true })

module.exports = mongoose.model('Dashboard', dashboardSchema)