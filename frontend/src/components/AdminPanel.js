import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { adminService } from '../services/api'

function AdminPanel () {
  const [users, setUsers] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [usersRes, statsRes] = await Promise.all([
        adminService.getUsers(),
        adminService.getStatistics()
      ])
      setUsers(usersRes.data.data)
      setStats(statsRes.data.data)
      setError('')
    } catch (err) {
      setError('Failed to load admin data')
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin'
    if (!window.confirm(`Change user role to ${newRole}?`)) return

    try {
      await adminService.updateUserRole(userId, newRole)
      setSuccess('User role updated successfully!')
      fetchData()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to update role')
    }
  }

  const handleDeleteUser = async userId => {
    if (!window.confirm('Are you sure you want to delete this user?')) return

    try {
      await adminService.deleteUser(userId)
      setSuccess('User deleted successfully!')
      fetchData()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to delete user')
    }
  }

  return (
    <>
      <Navbar />
      <div className='container'>
        <div className='dashboard-header'>
          <h1 className='dashboard-title'>Admin Panel</h1>
          <button
            className='btn btn-secondary'
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </button>
        </div>

        {success && <div className='alert alert-success'>{success}</div>}
        {error && <div className='alert alert-error'>{error}</div>}

        {loading ? (
          <div className='loading'>Loading admin data...</div>
        ) : (
          <>
            {stats && (
              <div className='stats-grid'>
                <div className='stat-card'>
                  <div className='stat-label'>Total Users</div>
                  <div className='stat-value'>{stats.totalUsers}</div>
                </div>
                <div className='stat-card'>
                  <div className='stat-label'>Total Tasks</div>
                  <div className='stat-value'>{stats.totalTasks}</div>
                </div>
                <div className='stat-card'>
                  <div className='stat-label'>Pending Tasks</div>
                  <div className='stat-value' style={{ color: '#f39c12' }}>
                    {stats.tasksByStatus.pending}
                  </div>
                </div>
                <div className='stat-card'>
                  <div className='stat-label'>Completed Tasks</div>
                  <div className='stat-value' style={{ color: '#27ae60' }}>
                    {stats.tasksByStatus.completed}
                  </div>
                </div>
              </div>
            )}

            <div style={{ marginTop: '40px' }}>
              <h2
                style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '20px'
                }}
              >
                User Management
              </h2>

              <div
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}
              >
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead
                    style={{
                      background: '#f7fafc',
                      borderBottom: '2px solid #e2e8f0'
                    }}
                  >
                    <tr>
                      <th
                        style={{
                          padding: '16px',
                          textAlign: 'left',
                          fontWeight: '600'
                        }}
                      >
                        ID
                      </th>
                      <th
                        style={{
                          padding: '16px',
                          textAlign: 'left',
                          fontWeight: '600'
                        }}
                      >
                        Name
                      </th>
                      <th
                        style={{
                          padding: '16px',
                          textAlign: 'left',
                          fontWeight: '600'
                        }}
                      >
                        Email
                      </th>
                      <th
                        style={{
                          padding: '16px',
                          textAlign: 'left',
                          fontWeight: '600'
                        }}
                      >
                        Role
                      </th>
                      <th
                        style={{
                          padding: '16px',
                          textAlign: 'left',
                          fontWeight: '600'
                        }}
                      >
                        Joined
                      </th>
                      <th
                        style={{
                          padding: '16px',
                          textAlign: 'center',
                          fontWeight: '600'
                        }}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr
                        key={user.id}
                        style={{ borderBottom: '1px solid #e2e8f0' }}
                      >
                        <td style={{ padding: '16px' }}>{user.id}</td>
                        <td style={{ padding: '16px' }}>{user.name}</td>
                        <td style={{ padding: '16px' }}>{user.email}</td>
                        <td style={{ padding: '16px' }}>
                          <span
                            className='task-badge'
                            style={{
                              background:
                                user.role === 'admin' ? '#fee' : '#edf2f7',
                              color:
                                user.role === 'admin' ? '#e53e3e' : '#718096'
                            }}
                          >
                            {user.role.toUpperCase()}
                          </span>
                        </td>
                        <td style={{ padding: '16px' }}>
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '16px' }}>
                          <div
                            style={{
                              display: 'flex',
                              gap: '8px',
                              justifyContent: 'center'
                            }}
                          >
                            <button
                              className='btn btn-secondary btn-sm'
                              onClick={() =>
                                handleRoleChange(user.id, user.role)
                              }
                            >
                              Change Role
                            </button>
                            <button
                              className='btn btn-danger btn-sm'
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default AdminPanel
