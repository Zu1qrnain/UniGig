const express = require('express')
const router = express.Router()
const { verifyToken } = require('../../middleware/auth.middleware')
const { Message } = require('../../models/index')
const { sendSuccess, sendError } = require('../../utils/response.utils')

router.get('/:orderId', verifyToken, async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: { order_id: req.params.orderId },
      order: [['createdAt', 'ASC']]
    })
    return sendSuccess(res, 'Messages fetched', messages)
  } catch (error) {
    return sendError(res, error.message)
  }
})

module.exports = router