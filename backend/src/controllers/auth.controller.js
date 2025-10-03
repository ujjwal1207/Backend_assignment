const AuthService = require('../services/auth.service')

class AuthController {
  static async register (req, res, next) {
    try {
      const result = await AuthService.register(req.body)

      res.status(201).json({
        success: true,
        data: result,
        message: 'User registered successfully'
      })
    } catch (error) {
      next(error)
    }
  }

  static async login (req, res, next) {
    try {
      const result = await AuthService.login(req.body)

      res.status(200).json({
        success: true,
        data: result,
        message: 'Login successful'
      })
    } catch (error) {
      next(error)
    }
  }

  static async getProfile (req, res, next) {
    try {
      const user = await AuthService.getProfile(req.user.id)

      res.status(200).json({
        success: true,
        data: user
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AuthController
