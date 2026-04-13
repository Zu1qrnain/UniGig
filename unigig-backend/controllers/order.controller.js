const { Order, Gig, User } = require('../models/index')
const { sendSuccess, sendError } = require('../utils/response.utils')

const placeOrder = async (req, res) => {
  try {
    const { gig_id, requirements } = req.body

    if (!gig_id || !requirements) {
      return sendError(res, 'All fields are required', 400)
    }

    const gig = await Gig.findByPk(gig_id)
    if (!gig) return sendError(res, 'Gig not found', 404)
    if (!gig.is_active) return sendError(res, 'Gig is not available', 400)

    const order = await Order.create({
      requirements,
      price: gig.price,
      client_id: req.user.id,
      freelancer_id: gig.freelancer_id,
      gig_id
    })

    return sendSuccess(res, 'Order placed successfully', order, 201)
  } catch (error) {
    return sendError(res, error.message)
  }
}

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body
    const order = await Order.findByPk(req.params.id)

    if (!order) return sendError(res, 'Order not found', 404)

    const validTransitions = {
      pending:   ['accepted', 'cancelled'],
      accepted:  ['completed', 'cancelled'],
      completed: [],
      cancelled: []
    }

    if (!validTransitions[order.status].includes(status)) {
      return sendError(res, `Cannot move from ${order.status} to ${status}`, 400)
    }

    // Only freelancer can accept/complete, both can cancel
    if (status === 'accepted' || status === 'completed') {
      if (order.freelancer_id !== req.user.id) {
        return sendError(res, 'Only freelancer can perform this action', 403)
      }
    }

    await order.update({ status })
    return sendSuccess(res, 'Order status updated', order)
  } catch (error) {
    return sendError(res, error.message)
  }
}

const getMyOrders = async (req, res) => {
  try {
    const where = req.user.role === 'client'
      ? { client_id: req.user.id }
      : { freelancer_id: req.user.id }

    const orders = await Order.findAll({
      where,
      include: [
        { model: Gig, as: 'gig', attributes: ['id', 'title', 'category'] },
        { model: User, as: 'client', attributes: ['id', 'name'] },
        { model: User, as: 'freelancer', attributes: ['id', 'name'] }
      ],
      order: [['createdAt', 'DESC']]
    })

    return sendSuccess(res, 'Orders fetched successfully', orders)
  } catch (error) {
    return sendError(res, error.message)
  }
}

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        { model: Gig, as: 'gig' },
        { model: User, as: 'client', attributes: ['id', 'name'] },
        { model: User, as: 'freelancer', attributes: ['id', 'name'] }
      ]
    })

    if (!order) return sendError(res, 'Order not found', 404)

    if (order.client_id !== req.user.id && order.freelancer_id !== req.user.id) {
      return sendError(res, 'Unauthorized', 403)
    }

    return sendSuccess(res, 'Order fetched successfully', order)
  } catch (error) {
    return sendError(res, error.message)
  }
}

module.exports = { placeOrder, updateOrderStatus, getMyOrders, getOrderById }