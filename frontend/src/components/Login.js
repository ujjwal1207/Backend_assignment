import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login () {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(formData.email, formData.password)
      navigate('/dashboard')
    } catch (err) {
      setError(
        err.response?.data?.error?.message || 'Login failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <h1 className='auth-title'>Welcome Back</h1>
        <p className='auth-subtitle'>Sign in to continue to Task Manager</p>

        {error && <div className='alert alert-error'>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='email' className='form-label'>
              Email Address
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className='form-input'
              value={formData.email}
              onChange={handleChange}
              required
              placeholder='john@example.com'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className='form-input'
              value={formData.password}
              onChange={handleChange}
              required
              placeholder='••••••••'
            />
          </div>

          <button type='submit' className='btn btn-primary' disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#718096' }}>
          Don't have an account?{' '}
          <Link to='/register' className='link'>
            Sign up
          </Link>
        </p>

        <div
          style={{
            marginTop: '30px',
            padding: '15px',
            background: '#f7fafc',
            borderRadius: '8px'
          }}
        >
          <p
            style={{ fontSize: '13px', color: '#718096', marginBottom: '8px' }}
          >
            <strong>Demo Credentials:</strong>
          </p>
          <p style={{ fontSize: '12px', color: '#718096' }}>
            Admin: admin@example.com / Admin123!
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
