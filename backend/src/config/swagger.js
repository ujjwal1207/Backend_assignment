const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend Assignment API',
      version: '1.0.0',
      description: 'Scalable REST API with Authentication & Role-Based Access',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: `${
          process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`
        }/api/v1`,
        description:
          process.env.NODE_ENV === 'production'
            ? 'Production server'
            : 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '65f8a9b2c3d4e5f6a7b8c9d0' },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john@example.com' },
            role: { type: 'string', enum: ['user', 'admin'], example: 'user' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Task: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '65f8a9b2c3d4e5f6a7b8c9d0' },
            userId: { type: 'string', example: '65f8a9b2c3d4e5f6a7b8c9d0' },
            title: { type: 'string', example: 'Complete assignment' },
            description: { type: 'string', example: 'Build REST API' },
            status: {
              type: 'string',
              enum: ['pending', 'in_progress', 'completed'],
              example: 'pending'
            },
            priority: {
              type: 'string',
              enum: ['low', 'medium', 'high'],
              example: 'high'
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: {
              type: 'object',
              properties: {
                message: { type: 'string', example: 'Error message' },
                code: { type: 'string', example: 'ERROR_CODE' }
              }
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js']
}

const swaggerSpec = swaggerJsdoc(options)

const swaggerDocs = app => {
  const enableDocs =
    (process.env.ENABLE_SWAGGER || 'true').toLowerCase() === 'true'
  if (!enableDocs && process.env.NODE_ENV === 'production') {
    return
  }

  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'Backend Assignment API Docs'
    })
  )

  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}

module.exports = swaggerDocs
