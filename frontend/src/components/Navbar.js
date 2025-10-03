import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar () {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className='navbar'>
      <div className='navbar-content'>
        <div className='navbar-brand'>📋 Task Manager</div>
        <div className='navbar-user'>
          <div className='navbar-info'>
            <div className='navbar-name'>{user?.name}</div>
            <div className='navbar-role'>{user?.role?.toUpperCase()}</div>
          </div>
          {user?.role === 'admin' && (
            <button
              className='btn btn-secondary btn-sm'
              onClick={() => navigate('/admin')}
            >
              Admin Panel
            </button>
          )}
          <button className='btn btn-secondary btn-sm' onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
