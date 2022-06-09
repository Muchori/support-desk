const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMilddleware')
const coonectDB = require('./config/db')

const PORT = process.env.PORT || 8000
/**
 * DB connection
 */
coonectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.status(2000).json({ message: 'Welcome to Support Desk API' })
})

/**
 * Routes
 */
app.use('/api/users', require('./routes/userRoutes'))

/**
 * Error Middleware
 */
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
