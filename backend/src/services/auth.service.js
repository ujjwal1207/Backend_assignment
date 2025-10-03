const User = require('../models/User')
const { hashPassword, comparePassword } = require('../utils/password')
const { generateToken } = require('../utils/jwt')
const AppError = require('../utils/AppError')
const logger = require('../utils/logger')

class AuthService {
  static async register ({ name, email, password }) {
    try {
      // Check if user already exists
      const existingUser = await User.findByEmail(email)
      if (existingUser) {
        throw new AppError('Email already registered', 400, 'EMAIL_EXISTS')
      }

      // Hash password
      const hashedPassword = await hashPassword(password)

      // Create user
      const user = await User.create({
        name,
        email,
        password: hashedPassword
      })

      // Generate token
      const token = generateToken({ userId: user.id, role: user.role })

      logger.info(`User registered: ${email}`)

      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    } catch (error) {
      logger.error('Registration error:', error)
      throw error
    }
  }

  static async login ({ email, password }) {
    try {
      // Find user
      const user = await User.findByEmail(email)
      if (!user) {
        throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS')
      }

      // Check password
      const isPasswordValid = await comparePassword(password, user.password)
      if (!isPasswordValid) {
        throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS')
      }

      // Generate token
      const token = generateToken({ userId: user.id, role: user.role })

      logger.info(`User logged in: ${email}`)

      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    } catch (error) {
      logger.error('Login error:', error)
      throw error
    }
  }

  static async getProfile (userId) {
    try {
      const user = await User.findByIdCustom(userId)
      if (!user) {
        throw new AppError('User not found', 404, 'USER_NOT_FOUND')
      }

      return user
    } catch (error) {
      logger.error('Get profile error:', error)
      throw error
    }
  }
}

module.exports = AuthService
