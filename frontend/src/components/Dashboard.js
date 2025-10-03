import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import TaskModal from './TaskModal'
import { taskService } from '../services/api'

function Dashboard () {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [filters, setFilters] = useState({
    status: '',
    priority: ''
  })

  useEffect(() => {
    fetchTasks()
  }, [filters])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await taskService.getTasks(filters)
      setTasks(response.data.data.tasks)
      setError('')
    } catch (err) {
      setError('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async taskData => {
    try {
      await taskService.createTask(taskData)
      setSuccess('Task created successfully!')
      setIsModalOpen(false)
      fetchTasks()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to create task')
    }
  }

  const handleUpdateTask = async taskData => {
    try {
      await taskService.updateTask(editingTask.id, taskData)
      setSuccess('Task updated successfully!')
      setIsModalOpen(false)
      setEditingTask(null)
      fetchTasks()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to update task')
    }
  }

  const handleDeleteTask = async taskId => {
    if (!window.confirm('Are you sure you want to delete this task?')) return

    try {
      await taskService.deleteTask(taskId)
      setSuccess('Task deleted successfully!')
      fetchTasks()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to delete task')
    }
  }

  const openEditModal = task => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingTask(null)
  }

  const getStatusBadgeClass = status => {
    return `task-badge badge-status-${status}`
  }

  const getPriorityBadgeClass = priority => {
    return `task-badge badge-priority-${priority}`
  }

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    in_progress: tasks.filter(t => t.status === 'in_progress').length,
    completed: tasks.filter(t => t.status === 'completed').length
  }

  return (
    <>
      <Navbar />
      <div className='container'>
        <div className='dashboard-header'>
          <h1 className='dashboard-title'>My Tasks</h1>
          <button
            className='btn btn-primary'
            onClick={() => setIsModalOpen(true)}
          >
            + Create Task
          </button>
        </div>

        {success && <div className='alert alert-success'>{success}</div>}
        {error && <div className='alert alert-error'>{error}</div>}

        <div className='stats-grid'>
          <div className='stat-card'>
            <div className='stat-label'>Total Tasks</div>
            <div className='stat-value'>{stats.total}</div>
          </div>
          <div className='stat-card'>
            <div className='stat-label'>Pending</div>
            <div className='stat-value' style={{ color: '#f39c12' }}>
              {stats.pending}
            </div>
          </div>
          <div className='stat-card'>
            <div className='stat-label'>In Progress</div>
            <div className='stat-value' style={{ color: '#3498db' }}>
              {stats.in_progress}
            </div>
          </div>
          <div className='stat-card'>
            <div className='stat-label'>Completed</div>
            <div className='stat-value' style={{ color: '#27ae60' }}>
              {stats.completed}
            </div>
          </div>
        </div>

        <div className='filters'>
          <div className='filters-grid'>
            <div className='form-group' style={{ marginBottom: 0 }}>
              <label className='form-label'>Filter by Status</label>
              <select
                className='form-select'
                value={filters.status}
                onChange={e =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value=''>All Status</option>
                <option value='pending'>Pending</option>
                <option value='in_progress'>In Progress</option>
                <option value='completed'>Completed</option>
              </select>
            </div>
            <div className='form-group' style={{ marginBottom: 0 }}>
              <label className='form-label'>Filter by Priority</label>
              <select
                className='form-select'
                value={filters.priority}
                onChange={e =>
                  setFilters({ ...filters, priority: e.target.value })
                }
              >
                <option value=''>All Priorities</option>
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className='loading'>Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className='empty-state'>
            <div className='empty-state-icon'>📝</div>
            <h3 className='empty-state-title'>No tasks yet</h3>
            <p className='empty-state-description'>
              Get started by creating your first task
            </p>
            <button
              className='btn btn-primary'
              onClick={() => setIsModalOpen(true)}
            >
              Create Your First Task
            </button>
          </div>
        ) : (
          <div className='task-grid'>
            {tasks.map(task => (
              <div key={task.id} className='task-card'>
                <div className='task-header'>
                  <div>
                    <h3 className='task-title'>{task.title}</h3>
                    <div className='task-meta'>
                      <span className={getStatusBadgeClass(task.status)}>
                        {task.status.replace('_', ' ')}
                      </span>
                      <span className={getPriorityBadgeClass(task.priority)}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
                {task.description && (
                  <p className='task-description'>{task.description}</p>
                )}
                <div className='task-actions'>
                  <button
                    className='btn btn-secondary btn-sm'
                    onClick={() => openEditModal(task)}
                  >
                    Edit
                  </button>
                  <button
                    className='btn btn-danger btn-sm'
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onClose={closeModal}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        />
      )}
    </>
  )
}

export default Dashboard
