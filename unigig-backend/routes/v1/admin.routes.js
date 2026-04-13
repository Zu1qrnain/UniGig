const express = require('express')
const router = express.Router()
const {
  getAllUsers,
  banUser,
  deleteUser,
  getAllGigs,
  deleteGig,
  getAllOrders,
  getStats,
  getReports,
  updateReportStatus
} = require('../../controllers/admin.controller')
const { verifyToken } = require('../../middleware/auth.middleware')
const { isAdmin } = require('../../middleware/role.middleware')

// All admin routes are protected
router.use(verifyToken, isAdmin)

// Stats
router.get('/stats', getStats)

// Users
router.get('/users', getAllUsers)
router.put('/users/:id/ban', banUser)
router.delete('/users/:id', deleteUser)

// Gigs
router.get('/gigs', getAllGigs)
router.delete('/gigs/:id', deleteGig)

// Orders
router.get('/orders', getAllOrders)

// Reports
router.get('/reports', getReports)
router.put('/reports/:id', updateReportStatus)

module.exports = router