require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const compression = require('compression')
const morgan = require('morgan')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')

const logger = require('./utils/logger')
const swaggerDocs = require('./config/swagger')
const errorHandler = require('./middleware/errorHandler')

// Import routes
const authRoutes = require('./routes/auth.routes')
const taskRoutes = require('./routes/task.routes')
const adminRoutes = require('./routes/admin.routes')

const app = express()

// If behind a reverse proxy (e.g., Nginx/ALB), trust the first proxy
app.set('trust proxy', 1)

// Hide Express fingerprinting header
app.disable('x-powered-by')

// Security middleware
app.use(helmet())
app.use(xss())

// CORS configuration (supports comma-separated list of origins)
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map(o => o.trim())

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, internal calls)
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) return callback(null, true)
      return callback(new Error('Not allowed by CORS'))
    },
    credentials: true
  })
)

// Body parser
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Compression
app.use(compression())

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
} else {
  app.use(
    morgan('combined', {
      stream: {
        write: message => logger.info(message.trim())
      }
    })
  )
}

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX || 100),
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false
})
app.use('/api/', limiter)

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  })
})

// API routes
const API_VERSION = process.env.API_VERSION || 'v1'
app.use(`/api/${API_VERSION}/auth`, authRoutes)
app.use(`/api/${API_VERSION}/tasks`, taskRoutes)
app.use(`/api/${API_VERSION}/admin`, adminRoutes)

// Swagger documentation
swaggerDocs(app)

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: 'Route not found',
      code: 'ROUTE_NOT_FOUND'
    }
  })
})

// Error handler (must be last)
app.use(errorHandler)

module.exports = app
