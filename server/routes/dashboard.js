const router = require('express').Router()
const Dashboard = require('../models/Dashboard')


router.get('/', async(req, res) => {
    try {
        let dashboard = await Dashboard.findOne()
        if (!dashboard) {
            dashboard = await Dashboard.create({ layout: [], widgets: [] })
        }
        res.json(dashboard)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


router.post('/save', async(req, res) => {
    try {
        const { layout, widgets } = req.body
        let dashboard = await Dashboard.findOne()
        if (!dashboard) {
            dashboard = await Dashboard.create({ layout, widgets })
        } else {
            dashboard.layout = layout
            dashboard.widgets = widgets
            await dashboard.save()
        }
        res.json(dashboard)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router