const { Gig, User, Review } = require('../models/index')
const { sendSuccess, sendError } = require('../utils/response.utils')
const { Op } = require('sequelize')

const createGig = async (req, res) => {
  try {
    const { title, description, category, price, delivery_days } = req.body
    if (!title || !description || !category || !price || !delivery_days) {
      return sendError(res, 'All fields are required', 400)
    }
    const gig = await Gig.create({
      title, description, category, price, delivery_days,
      freelancer_id: req.user.id
    })
    return sendSuccess(res, 'Gig created successfully', gig, 201)
  } catch (error) {
    return sendError(res, error.message)
  }
}

const getAllGigs = async (req, res) => {
  try {
    const { search, category, min_price, max_price, sort, page = 1, limit = 12 } = req.query
    const where = { is_active: true }

    if (search) where[Op.or] = [
      { title: { [Op.like]: `%${search}%` } },
      { description: { [Op.like]: `%${search}%` } }
    ]
    if (category) where.category = category
    if (min_price || max_price) {
      where.price = {}
      if (min_price) where.price[Op.gte] = parseFloat(min_price)
      if (max_price) where.price[Op.lte] = parseFloat(max_price)
    }

    const order = sort === 'price_asc'  ? [['price', 'ASC']]
                : sort === 'price_desc' ? [['price', 'DESC']]
                : [['createdAt', 'DESC']]

    const pageNum = Math.max(1, parseInt(page))
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)))
    const offset = (pageNum - 1) * limitNum

    const { count, rows: gigs } = await Gig.findAndCountAll({
      where,
      order,
      limit: limitNum,
      offset,
      include: [{
        model: User,
        as: 'freelancer',
        attributes: ['id', 'name', 'avg_rating']
      }]
    })

    return sendSuccess(res, 'Gigs fetched successfully', {
      gigs,
      totalCount: count,
      totalPages: Math.ceil(count / limitNum),
      currentPage: pageNum
    })
  } catch (error) {
    return sendError(res, error.message)
  }
}

const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'freelancer',
          attributes: ['id', 'name', 'avg_rating', 'bio', 'skills']
        },
        {
          model: Review,
          as: 'reviews',
          include: [{
            model: User,
            as: 'client',
            attributes: ['id', 'name']
          }]
        }
      ]
    })
    if (!gig) return sendError(res, 'Gig not found', 404)
    return sendSuccess(res, 'Gig fetched successfully', gig)
  } catch (error) {
    return sendError(res, error.message)
  }
}

const updateGig = async (req, res) => {
  try {
    const gig = await Gig.findByPk(req.params.id)
    if (!gig) return sendError(res, 'Gig not found', 404)
    if (gig.freelancer_id !== req.user.id) {
      return sendError(res, 'Unauthorized', 403)
    }
    await gig.update(req.body)
    return sendSuccess(res, 'Gig updated successfully', gig)
  } catch (error) {
    return sendError(res, error.message)
  }
}

const deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findByPk(req.params.id)
    if (!gig) return sendError(res, 'Gig not found', 404)
    if (gig.freelancer_id !== req.user.id) {
      return sendError(res, 'Unauthorized', 403)
    }
    await gig.update({ is_active: false })
    return sendSuccess(res, 'Gig deleted successfully')
  } catch (error) {
    return sendError(res, error.message)
  }
}

const getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.findAll({
      where: { freelancer_id: req.user.id }
    })
    return sendSuccess(res, 'Your gigs fetched', gigs)
  } catch (error) {
    return sendError(res, error.message)
  }
}

module.exports = { createGig, getAllGigs, getGigById, updateGig, deleteGig, getMyGigs }