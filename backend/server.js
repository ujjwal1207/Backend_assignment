const app = require('./src/app')
const { connectDB } = require('./src/config/database')
const { connectRedis } = require('./src/config/redis')
const logger = require('./src/utils/logger')

const PORT = process.env.PORT || 5000

// Connect to database and Redis
const startServer = async () => {
  try {
    // Connect to MongoDB Atlas first
    await connectDB()
    logger.info('✅ MongoDB Atlas connected successfully')

    // Start server immediately after DB is ready
    const server = app.listen(PORT, () => {
      const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`
      logger.info(`🚀 Server running on ${baseUrl}`)
      logger.info(`📚 API Docs: ${baseUrl}/api-docs`)
      logger.info(`🌍 Environment: ${process.env.NODE_ENV}`)
    })

    // Connect to Redis in background (non-blocking)
    ;(async () => {
      const redisEnabled = (process.env.REDIS_ENABLED || 'true').toLowerCase() === 'true'
      if (!redisEnabled) {
        logger.info('ℹ️ Redis disabled via REDIS_ENABLED=false')
        return
      }
      const client = await connectRedis()
      if (client) {
        logger.info('✅ Redis connected successfully')
      } else {
        logger.warn('⚠️ Redis not connected; continuing without cache')
      }
    })().catch(err => logger.error('Redis async connect error:', err))

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
