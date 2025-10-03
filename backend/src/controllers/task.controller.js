const TaskService = require('../services/task.service')

class TaskController {
  static async createTask (req, res, next) {
    try {
      const task = await TaskService.createTask(req.user.id, req.body)

      res.status(201).json({
        success: true,
        data: task,
        message: 'Task created successfully'
      })
    } catch (error) {
      next(error)
    }
  }

  static async getTasks (req, res, next) {
    try {
      const { status, priority, limit, offset } = req.query

      const filters = {}
      if (status) filters.status = status
      if (priority) filters.priority = priority
      if (limit) filters.limit = parseInt(limit)
      if (offset) filters.offset = parseInt(offset)

      const tasks = await TaskService.getTasks(req.user.id, filters)
      const total = await TaskService.getTaskCount(req.user.id)

      res.status(200).json({
        success: true,
        data: {
          tasks,
          pagination: {
            total,
            limit: filters.limit || total,
            offset: filters.offset || 0
          }
        }
      })
    } catch (error) {
      next(error)
    }
  }

  static async getTaskById (req, res, next) {
    try {
      const task = await TaskService.getTaskById(req.user.id, req.params.id)

      res.status(200).json({
        success: true,
        data: task
      })
    } catch (error) {
      next(error)
    }
  }

  static async updateTask (req, res, next) {
    try {
      const task = await TaskService.updateTask(
        req.user.id,
        req.params.id,
        req.body
      )

      res.status(200).json({
        success: true,
        data: task,
        message: 'Task updated successfully'
      })
    } catch (error) {
      next(error)
    }
  }

  static async deleteTask (req, res, next) {
    try {
      await TaskService.deleteTask(req.user.id, req.params.id)

      res.status(200).json({
        success: true,
        message: 'Task deleted successfully'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TaskController
