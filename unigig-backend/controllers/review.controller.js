const { Review, Order, User } = require('../models/index')
const { sendSuccess, sendError } = require('../utils/response.utils')
const { sequelize } = require('../config/db')

const submitReview = async (req, res) => {
  try {
    const { order_id, rating, comment } = req.body

    if (!order_id || !rating) {
      return sendError(res, 'Order ID and rating are required', 400)
    }

    const order = await Order.findByPk(order_id)
    if (!order) return sendError(res, 'Order not found', 404)

    if (order.status !== 'completed') {
      return sendError(res, 'Can only review completed orders', 400)
    }

    if (order.client_id !== req.user.id) {
      return sendError(res, 'Only the client can leave a review', 403)
    }

    const existingReview = await Review.findOne({ where: { order_id } })
    if (existingReview) {
      return sendError(res, 'Review already submitted for this order', 400)
    }

    const review = await Review.create({
      rating,
      comment,
      order_id,
      client_id: req.user.id,
      freelancer_id: order.freelancer_id,
      gig_id: order.gig_id
    })

    // Update freelancer avg_rating
    const reviews = await Review.findAll({
      where: { freelancer_id: order.freelancer_id }
    })
    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    await User.update(
      { avg_rating: avg.toFixed(2) },
      { where: { id: order.freelancer_id } }
    )

    return sendSuccess(res, 'Review submitted successfully', review, 201)
  } catch (error) {
    return sendError(res, error.message)
  }
}

const getFreelancerReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { freelancer_id: req.params.freelancerId },
      include: [{
        model: User,
        as: 'client',
        attributes: ['id', 'name']
      }],
      order: [['createdAt', 'DESC']]
    })
    return sendSuccess(res, 'Reviews fetched successfully', reviews)
  } catch (error) {
    return sendError(res, error.message)
  }
}

module.exports = { submitReview, getFreelancerReviews }