const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

/**
 * @description  Get user tickets
 * @route GET /api/tickets
 * @access Private
 * @param {*} req
 * @param {*} res
 */
const getTickets = asyncHandler(async (req, res) => {
  //get user using the id in the jwt
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  const tickets = await Ticket.find({ user: req.user.id })
  res.status(200).json(tickets)
})

/**
 * @description  Get a ticket
 * @route GET /api/tickets/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 */
const getTicket = asyncHandler(async (req, res) => {
  //get user using the id in the jwt
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }
  res.status(200).json(ticket)
})

/**
 * @description Create a ticket
 * @route POST /api/tickets
 * @access Private
 * @param {*} req
 * @param {*} res
 */
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body
  if (!product || !description) {
    res.status(400)
    throw new Error('PLease add a product and description')
  }
  //get user using the id in the jwt
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new',
  })
  res.status(201).json({
    ticket,
    message: 'Ticket created successfully',
  })
})

/**
 * @description  Update ticket
 * @route PUT /api/tickets/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 */
const updateTicket = asyncHandler(async (req, res) => {
  //get user using the id in the jwt
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  )

  res.status(200).json({
    updatedTicket,
    message: 'Ticket updated successfully',
  })
})

/**
 * @description  Delete ticket
 * @route DELETE /api/tickets/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 */
const deleteTicket = asyncHandler(async (req, res) => {
  //get user using the id in the jwt
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  await ticket.remove()

  res.status(200).json({ success: true })
})

module.exports = {
  getTicket,
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
}