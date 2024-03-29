const mongoose = require('mongoose')

//mongo db connection
const connectDB = async () => {
 try {
   const conn = await mongoose.connect(process.env.DATABASE_URI)
   console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
 } catch (error) {
   console.log(`Error: ${error.message}`.red.underline.bold)

   process.exit(1)
 } 
}
module.exports = connectDB
