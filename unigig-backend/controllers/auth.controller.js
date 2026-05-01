const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models/index')
const { sendSuccess, sendError } = require('../utils/response.utils')

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return sendError(res, 'All fields are required', 400)
    }

    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return sendError(res, 'Email already registered', 400)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'client'
    })

    return sendSuccess(res, 'Registration successful', {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }, 201)

  } catch (error) {
    return sendError(res, error.message)
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return sendError(res, 'All fields are required', 400)
    }

    const user = await User.findOne({ where: { email } })
    if (!user) {
      return sendError(res, 'Invalid credentials', 401)
    }

    if (user.is_banned) {
      return sendError(res, 'Your account has been banned', 403)
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return sendError(res, 'Invalid credentials', 401)
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )

    return sendSuccess(res, 'Login successful', {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    return sendError(res, error.message)
  }
}

const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    })
    return sendSuccess(res, 'User fetched', user)
  } catch (error) {
    return sendError(res, error.message)
  }
}

module.exports = { register, login, getMe }