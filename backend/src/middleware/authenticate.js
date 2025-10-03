const { verifyToken } = require('../utils/jwt')
const User = require('../models/User')
const AppError = require('../utils/AppError')

const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401, 'NO_TOKEN')
    }

    const token = authHeader.split(' ')[1]

    // Verify token
    const decoded = verifyToken(token)

    if (!decoded) {
      throw new AppError('Invalid or expired token', 401, 'INVALID_TOKEN')
    }

    // Get user from database
    const user = await User.findByIdCustom(decoded.userId)

    if (!user) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND')
    }

    // Attach user to request
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authenticate
