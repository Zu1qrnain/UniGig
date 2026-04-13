const { sendError } = require('../utils/response.utils')

const isClient = (req, res, next) => {
  if (req.user.role !== 'client') {
    return sendError(res, 'Access denied. Clients only.', 403)
  }
  next()
}

const isFreelancer = (req, res, next) => {
  if (req.user.role !== 'freelancer') {
    return sendError(res, 'Access denied. Freelancers only.', 403)
  }
  next()
}

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return sendError(res, 'Access denied. Admins only.', 403)
  }
  next()
}

module.exports = { isClient, isFreelancer, isAdmin }