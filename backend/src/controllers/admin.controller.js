const AdminService = require('../services/admin.service')

class AdminController {
  static async getAllUsers (req, res, next) {
    try {
      const users = await AdminService.getAllUsers()

      res.status(200).json({
        success: true,
        data: users
      })
    } catch (error) {
      next(error)
    }
  }

  static async updateUserRole (req, res, next) {
    try {
      const { role } = req.body
      const user = await AdminService.updateUserRole(req.params.id, role)

      res.status(200).json({
        success: true,
        data: user,
        message: 'User role updated successfully'
      })
    } catch (error) {
      next(error)
    }
  }

  static async deleteUser (req, res, next) {
    try {
      await AdminService.deleteUser(req.params.id)

      res.status(200).json({
        success: true,
        message: 'User deleted successfully'
      })
    } catch (error) {
      next(error)
    }
  }

  static async getStatistics (req, res, next) {
    try {
      const stats = await AdminService.getStatistics()

      res.status(200).json({
        success: true,
        data: stats
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AdminController
