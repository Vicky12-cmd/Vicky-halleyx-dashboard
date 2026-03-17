const router = require('express').Router()
const Order = require('../models/Order')


router.get('/', async(req, res) => {
    try {
        const { startDate, endDate } = req.query
        let filter = {}

        if (startDate && endDate) {
            filter.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }

        const orders = await Order.find(filter).sort({ createdAt: -1 })
        res.json(orders)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


router.post('/', async(req, res) => {
    try {
        const { quantity, unitPrice } = req.body
        const totalAmount = quantity * unitPrice
        const order = new Order({...req.body, totalAmount })
        await order.save()
        res.json(order)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


router.put('/:id', async(req, res) => {
    try {
        const { quantity, unitPrice } = req.body
        const totalAmount = Number(quantity) * Number(unitPrice)
        console.log('quantity:', quantity, 'unitPrice:', unitPrice, 'total:', totalAmount)
        const order = await Order.findByIdAndUpdate(
            req.params.id, {...req.body, totalAmount }, { new: true }
        )
        res.json(order)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


router.delete('/:id', async(req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.json({ success: true })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router