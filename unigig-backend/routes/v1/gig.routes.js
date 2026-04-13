const express = require('express')
const router = express.Router()
const {
  createGig,
  getAllGigs,
  getGigById,
  updateGig,
  deleteGig,
  getMyGigs
} = require('../../controllers/gig.controller')
const { verifyToken } = require('../../middleware/auth.middleware')
const { isFreelancer } = require('../../middleware/role.middleware')

// Public routes
router.get('/', getAllGigs)
router.get('/:id', getGigById)

// Freelancer only routes
router.post('/', verifyToken, isFreelancer, createGig)
router.put('/:id', verifyToken, isFreelancer, updateGig)
router.delete('/:id', verifyToken, isFreelancer, deleteGig)
router.get('/freelancer/my-gigs', verifyToken, isFreelancer, getMyGigs)

module.exports = router