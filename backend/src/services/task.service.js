const Task = require('../models/Task')
const AppError = require('../utils/AppError')
const { getCache, setCache, deleteCachePattern } = require('../config/redis')
const logger = require('../utils/logger')

class TaskService {
  static async createTask (userId, taskData) {
    try {
      const task = await Task.create({
        userId,
        ...taskData
      })

      // Invalidate cache
      await deleteCachePattern(`tasks:user:${userId}:*`)

      logger.info(`Task created: ${task.id} by user ${userId}`)
      return task
    } catch (error) {
      logger.error('Create task error:', error)
      throw error
    }
  }

  static async getTasks (userId, filters = {}) {
    try {
      // Try to get from cache
      const cacheKey = `tasks:user:${userId}:${JSON.stringify(filters)}`
      const cachedTasks = await getCache(cacheKey)

      if (cachedTasks) {
        logger.debug(`Tasks retrieved from cache for user ${userId}`)
        return cachedTasks
      }

      // Get from database
      const tasks = await Task.findByUserId(userId, filters)

      // Cache the results
      await setCache(cacheKey, tasks, 300) // Cache for 5 minutes

      logger.info(`Tasks retrieved for user ${userId}: ${tasks.length} tasks`)
      return tasks
    } catch (error) {
      logger.error('Get tasks error:', error)
      throw error
    }
  }

  static async getTaskById (userId, taskId) {
    try {
      const task = await Task.findById(taskId)

      if (!task) {
        throw new AppError('Task not found', 404, 'TASK_NOT_FOUND')
      }

      // Check ownership (compare ObjectId to string)
      if (task.userId.toString() !== userId.toString()) {
        throw new AppError(
          'You do not have permission to access this task',
          403,
          'FORBIDDEN'
        )
      }

      return task
    } catch (error) {
      logger.error('Get task error:', error)
      throw error
    }
  }

  static async updateTask (userId, taskId, updates) {
    try {
      // Check if task exists and user owns it
      const task = await this.getTaskById(userId, taskId)

      // Update task
      const updatedTask = await Task.updateTask(taskId, updates)

      // Invalidate cache
      await deleteCachePattern(`tasks:user:${userId}:*`)

      logger.info(`Task updated: ${taskId} by user ${userId}`)
      return updatedTask
    } catch (error) {
      logger.error('Update task error:', error)
      throw error
    }
  }

  static async deleteTask (userId, taskId) {
    try {
      // Check if task exists and user owns it
      await this.getTaskById(userId, taskId)

      // Delete task
      await Task.deleteTask(taskId)

      // Invalidate cache
      await deleteCachePattern(`tasks:user:${userId}:*`)

      logger.info(`Task deleted: ${taskId} by user ${userId}`)
      return true
    } catch (error) {
      logger.error('Delete task error:', error)
      throw error
    }
  }

  static async getTaskCount (userId) {
    try {
      return await Task.countByUserId(userId)
    } catch (error) {
      logger.error('Get task count error:', error)
      throw error
    }
  }
}

module.exports = TaskService
