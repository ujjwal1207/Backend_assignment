import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Register () {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
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
      await register(formData.name, formData.email, formData.password)
      navigate('/dashboard')
    } catch (err) {
      setError(
        err.response?.data?.error?.message ||
          'Registration failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <h1 className='auth-title'>Create Account</h1>
        <p className='auth-subtitle'>
          Sign up to get started with Task Manager
        </p>

        {error && <div className='alert alert-error'>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name' className='form-label'>
              Full Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              className='form-input'
              value={formData.name}
              onChange={handleChange}
              required
              placeholder='John Doe'
            />
          </div>

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
            <p style={{ fontSize: '12px', color: '#718096', marginTop: '4px' }}>
              Must contain uppercase, lowercase, number, and special character
            </p>
          </div>

          <button type='submit' className='btn btn-primary' disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#718096' }}>
          Already have an account?{' '}
          <Link to='/login' className='link'>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
