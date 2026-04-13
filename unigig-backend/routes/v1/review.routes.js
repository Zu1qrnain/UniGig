const express = require('express')
const router = express.Router()
const {
  submitReview,
  getFreelancerReviews
} = require('../../controllers/review.controller')
const { verifyToken } = require('../../middleware/auth.middleware')
const { isClient } = require('../../middleware/role.middleware')

router.post('/', verifyToken, isClient, submitReview)
router.get('/freelancer/:freelancerId', getFreelancerReviews)

module.exports = router