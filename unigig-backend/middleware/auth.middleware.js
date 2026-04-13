const jwt = require('jsonwebtoken')
const { sendError } = require('../utils/response.utils')

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 'No token provided', 401)
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return sendError(res, 'Invalid or expired token', 401)
  }
}

module.exports = { verifyToken }