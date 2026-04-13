const express = require('express')
const router = express.Router()
const {
  placeOrder,
  updateOrderStatus,
  getMyOrders,
  getOrderById
} = require('../../controllers/order.controller')
const { verifyToken } = require('../../middleware/auth.middleware')
const { isClient } = require('../../middleware/role.middleware')

router.post('/', verifyToken, isClient, placeOrder)
router.put('/:id/status', verifyToken, updateOrderStatus)
router.get('/my-orders', verifyToken, getMyOrders)
router.get('/:id', verifyToken, getOrderById)

module.exports = router