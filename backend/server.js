const app = require('./src/app')
const { connectDB } = require('./src/config/database')
const { connectRedis } = require('./src/config/redis')
const logger = require('./src/utils/logger')

const PORT = process.env.PORT || 5000

// Connect to database and Redis
const startServer = async () => {
  try {
    // Connect to MongoDB Atlas
    await connectDB()
    logger.info('✅ MongoDB Atlas connected successfully')

    // Connect to Redis
    await connectRedis()
    logger.info('✅ Redis connected successfully')

    // Start server
    const server = app.listen(PORT, () => {
      const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`
      logger.info(`🚀 Server running on ${baseUrl}`)
      logger.info(`📚 API Docs: ${baseUrl}/api-docs`)
      logger.info(`🌍 Environment: ${process.env.NODE_ENV}`)
    })

    // Graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received: closing server')
      server.close(() => {
        logger.info('HTTP server closed')
        process.exit(0)
      })
    })
  } catch (error) {
    logger.error('Failed to start server:', error)
    process.exit(1)
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', err => {
  logger.error('Unhandled Rejection:', err)
  process.exit(1)
})

// Handle uncaught exceptions
process.on('uncaughtException', err => {
  logger.error('Uncaught Exception:', err)
  process.exit(1)
})

startServer()
