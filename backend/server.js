const express = require('express')
const path = require('path')
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

/**
 * Routes
 */
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

/**
 * Serve frontend
 */
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  // FIX: below code fixes app crashing on refresh in deployment
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Support Desk API' })
  })
}

/**
 * Error Middleware
 */
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
