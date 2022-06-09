const express = require('express')
const router = express.Router()
const { registerUser, loginUser } = require('../controllers/userController')

/**
 * Register router
 */
router.post('/', registerUser)

/**
 * Login router
 */
router.post('/login', loginUser)

module.exports = router
