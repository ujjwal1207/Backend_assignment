const User = require('../models/User')
const Task = require('../models/Task')
const AppError = require('../utils/AppError')
const { getCache, setCache, deleteCachePattern } = require('../config/redis')
const logger = require('../utils/logger')

class AdminService {
  static async getAllUsers () {
    try {
      // Try cache first
      const cachedUsers = await getCache('admin:users:all')
      if (cachedUsers) {
        return cachedUsers
      }

      const users = await User.findAllUsers()

      // Cache for 5 minutes
      await setCache('admin:users:all', users, 300)

      logger.info('All users retrieved by admin')
      return users
    } catch (error) {
      logger.error('Get all users error:', error)
      throw error
    }
  }

  static async updateUserRole (userId, role) {
    try {
      const user = await User.findByIdCustom(userId)
      if (!user) {
        throw new AppError('User not found', 404, 'USER_NOT_FOUND')
      }

      const updatedUser = await User.updateRole(userId, role)

      // Invalidate cache
      await deleteCachePattern('admin:users:*')

      logger.info(`User role updated: ${userId} to ${role}`)
      return updatedUser
    } catch (error) {
      logger.error('Update user role error:', error)
      throw error
    }
  }

  static async deleteUser (userId) {
    try {
      const user = await User.findByIdCustom(userId)
      if (!user) {
        throw new AppError('User not found', 404, 'USER_NOT_FOUND')
      }

      // Don't allow deleting the last admin
      if (user.role === 'admin') {
        const adminCount = await User.findAllUsers()
        const admins = adminCount.filter(u => u.role === 'admin')
        if (admins.length === 1) {
          throw new AppError(
            'Cannot delete the last admin user',
            400,
            'CANNOT_DELETE_LAST_ADMIN'
          )
        }
      }

      await User.deleteUser(userId)

      // Invalidate caches
      await deleteCachePattern('admin:*')
      await deleteCachePattern(`tasks:user:${userId}:*`)

      logger.info(`User deleted: ${userId}`)
      return true
    } catch (error) {
      logger.error('Delete user error:', error)
      throw error
    }
  }

  static async getStatistics () {
    try {
      // Try cache first
      const cachedStats = await getCache('admin:stats')
      if (cachedStats) {
        return cachedStats
      }

      const userCount = await User.countUsers()
      const allTasks = await Task.findAllTasks()

      const stats = {
        totalUsers: userCount,
        totalTasks: allTasks.length,
        tasksByStatus: {
          pending: allTasks.filter(t => t.status === 'pending').length,
          in_progress: allTasks.filter(t => t.status === 'in_progress').length,
          completed: allTasks.filter(t => t.status === 'completed').length
        },
        tasksByPriority: {
          low: allTasks.filter(t => t.priority === 'low').length,
          medium: allTasks.filter(t => t.priority === 'medium').length,
          high: allTasks.filter(t => t.priority === 'high').length
        }
      }

      // Cache for 10 minutes
      await setCache('admin:stats', stats, 600)

      logger.info('Statistics retrieved by admin')
      return stats
    } catch (error) {
      logger.error('Get statistics error:', error)
      throw error
    }
  }
}

module.exports = AdminService
