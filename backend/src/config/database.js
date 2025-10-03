const mongoose = require('mongoose')
const logger = require('../utils/logger')

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Mongoose 6+ doesn't need these options anymore, but including for compatibility
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    })

    logger.info(`MongoDB Connected: ${conn.connection.host}`)
    return true
  } catch (error) {
    logger.error('MongoDB connection error:', error)
    throw error
  }
}

// Mongoose connection events
mongoose.connection.on('connected', () => {
  logger.info('Mongoose connected to MongoDB')
})

mongoose.connection.on('error', err => {
  logger.error('Mongoose connection error:', err)
})

mongoose.connection.on('disconnected', () => {
  logger.info('Mongoose disconnected from MongoDB')
})

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close()
  logger.info('Mongoose connection closed through app termination')
  process.exit(0)
})

module.exports = {
  connectDB,
  mongoose
}
