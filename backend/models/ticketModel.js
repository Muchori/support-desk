const mogoose = require('mongoose')

const ticketSchema = mogoose.Schema(
  {
    user: {
      type: mogoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    product: {
      type: String,
      required: [true, 'Please select a product'],
      enum: ['iPhone', 'Macbook Pro', 'Samsung', 'iPad', 'Google Plus'],
    },
    description: {
      type: String,
      required: [true, 'Please enter a description of the issue'],
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'open', 'close'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mogoose.model('Ticket', ticketSchema)
