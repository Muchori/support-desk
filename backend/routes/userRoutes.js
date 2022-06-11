const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

/**
 * Register route
 */
router.post('/', registerUser)

/**
 * Login route
 */
router.post('/login', loginUser)

/**
 * Me route
 */
router.get('/me', protect, getMe)

module.exports = router
