import React, { useState, useEffect } from 'react'

function TaskModal ({ task, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium'
  })
  const [error, setError] = useState('')

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        status: task.status,
        priority: task.priority
      })
    }
  }, [task])

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')

    if (formData.title.trim().length < 3) {
      setError('Title must be at least 3 characters')
      return
    }

    try {
      await onSubmit(formData)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    }
  }

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal' onClick={e => e.stopPropagation()}>
        <div className='modal-header'>
          <h2 className='modal-title'>
            {task ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button className='modal-close' onClick={onClose}>
            ×
          </button>
        </div>

        {error && <div className='alert alert-error'>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='title' className='form-label'>
              Title *
            </label>
            <input
              type='text'
              id='title'
              name='title'
              className='form-input'
              value={formData.title}
              onChange={handleChange}
              required
              placeholder='Enter task title'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='description' className='form-label'>
              Description
            </label>
            <textarea
              id='description'
              name='description'
              className='form-textarea'
              value={formData.description}
              onChange={handleChange}
              placeholder='Enter task description'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='status' className='form-label'>
              Status *
            </label>
            <select
              id='status'
              name='status'
              className='form-select'
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value='pending'>Pending</option>
              <option value='in_progress'>In Progress</option>
              <option value='completed'>Completed</option>
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor='priority' className='form-label'>
              Priority *
            </label>
            <select
              id='priority'
              name='priority'
              className='form-select'
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value='low'>Low</option>
              <option value='medium'>Medium</option>
              <option value='high'>High</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
            <button type='submit' className='btn btn-primary'>
              {task ? 'Update Task' : 'Create Task'}
            </button>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskModal
