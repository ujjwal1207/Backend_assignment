const { connectDB } = require('../config/database')
const { hashPassword } = require('./password')
const logger = require('./logger')
const User = require('../models/User')

const createDefaultAdmin = async () => {
  try {
    // Create default admin user
    const adminExists = await User.findByEmail('admin@example.com')

    if (!adminExists) {
      const hashedPassword = await hashPassword('Admin123!')
      await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin'
      })
      logger.info(
        '✅ Default admin user created (admin@example.com / Admin123!)'
      )
    } else {
      logger.info('✅ Default admin user already exists')
    }

    logger.info('✅ Database setup completed successfully')
  } catch (error) {
    logger.error('Setup error:', error)
    throw error
  }
}

// Run setup if this file is executed directly
if (require.main === module) {
  require('dotenv').config()

  ;(async () => {
    try {
      await connectDB()
      logger.info('✅ MongoDB connected successfully')
      await createDefaultAdmin()
      process.exit(0)
    } catch (error) {
      logger.error('Failed to run setup:', error)
      process.exit(1)
    }
  })()
}

module.exports = { createDefaultAdmin }
