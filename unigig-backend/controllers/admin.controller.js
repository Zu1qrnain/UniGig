const { User, Gig, Order, Report } = require('../models/index')
const { sendSuccess, sendError } = require('../utils/response.utils')

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    })
    return sendSuccess(res, 'Users fetched successfully', users)
  } catch (error) {
    return sendError(res, error.message)
  }
}

const banUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (!user) return sendError(res, 'User not found', 404)

    const newStatus = !user.is_banned
    await user.update({ is_banned: newStatus })
    const msg = newStatus ? 'User banned' : 'User unbanned'
    return sendSuccess(res, msg, user)
  } catch (error) {
    return sendError(res, error.message)
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (!user) return sendError(res, 'User not found', 404)

    await user.destroy()
    return sendSuccess(res, 'User deleted successfully')
  } catch (error) {
    return sendError(res, error.message)
  }
}

const getAllGigs = async (req, res) => {
  try {
    const gigs = await Gig.findAll({
      include: [{
        model: User,
        as: 'freelancer',
        attributes: ['id', 'name', 'email']
      }],
      order: [['createdAt', 'DESC']]
    })
    return sendSuccess(res, 'Gigs fetched successfully', gigs)
  } catch (error) {
    return sendError(res, error.message)
  }
}

const deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findByPk(req.params.id)
    if (!gig) return sendError(res, 'Gig not found', 404)

    await gig.destroy()
    return sendSuccess(res, 'Gig deleted successfully')
  } catch (error) {
    return sendError(res, error.message)
  }
}

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, as: 'client', attributes: ['id', 'name'] },
        { model: User, as: 'freelancer', attributes: ['id', 'name'] },
        { model: Gig, as: 'gig', attributes: ['id', 'title'] }
      ],
      order: [['createdAt', 'DESC']]
    })
    return sendSuccess(res, 'Orders fetched successfully', orders)
  } catch (error) {
    return sendError(res, error.message)
  }
}

const getStats = async (req, res) => {
  try {
    const totalUsers = await User.count()
    const totalGigs = await Gig.count()
    const totalOrders = await Order.count()
    const totalReports = await Report.count()

    return sendSuccess(res, 'Stats fetched successfully', {
      totalUsers,
      totalGigs,
      totalOrders,
      totalReports
    })
  } catch (error) {
    return sendError(res, error.message)
  }
}

const getReports = async (req, res) => {
  try {
    const reports = await Report.findAll({
      include: [{
        model: User,
        as: 'reporter',
        attributes: ['id', 'name']
      }],
      order: [['createdAt', 'DESC']]
    })
    return sendSuccess(res, 'Reports fetched successfully', reports)
  } catch (error) {
    return sendError(res, error.message)
  }
}

const updateReportStatus = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id)
    if (!report) return sendError(res, 'Report not found', 404)

    await report.update({ status: req.body.status })
    return sendSuccess(res, 'Report status updated', report)
  } catch (error) {
    return sendError(res, error.message)
  }
}

module.exports = {
  getAllUsers,
  banUser,
  deleteUser,
  getAllGigs,
  deleteGig,
  getAllOrders,
  getStats,
  getReports,
  updateReportStatus
}