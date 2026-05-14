import { useEffect, useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import Loader from '../../components/common/Loader'
import ErrorMessage from '../../components/common/ErrorMessage'
import { getAllUsersAPI, banUserAPI, deleteUserAPI } from '../../api/admin.api'
import { formatDate } from '../../utils/format.utils'

const ManageUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsersAPI()
        if (res.success) setUsers(res.data)
        else setError(res.message)
      } catch {
        setError('Failed to fetch users')
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleBan = async (id) => {
    try {
      const res = await banUserAPI(id)
      if (res.success) {
        setUsers(users.map(u =>
          u.id === id ? { ...u, is_banned: !u.is_banned } : u
        ))
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to ban user')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return
    try {
      const res = await deleteUserAPI(id)
      if (res.success) setUsers(users.filter(u => u.id !== id))
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user')
    }
  }

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = filter ? u.role === filter : true
    return matchSearch && matchRole
  })

  return (
    <AdminLayout title='Manage Users' subtitle={`${users.length} total users on the platform`}>

        {/* Filters */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
          flexWrap: 'wrap'
        }}>
          <input
            type='text'
            className='input'
            placeholder='Search by name or email...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: '300px' }}
          />
          <select
            className='input'
            style={{ width: 'auto', minWidth: '160px' }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value=''>All Roles</option>
            <option value='client'>Client</option>
            <option value='freelancer'>Freelancer</option>
            <option value='admin'>Admin</option>
          </select>
        </div>

        {loading && <Loader />}
        <ErrorMessage message={error} />

        {/* Table */}
        {!loading && (
          <div className='card' style={{ overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)' }}>
                    {['Name', 'Email', 'Role', 'Rating', 'Joined', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        borderBottom: '1px solid var(--border)'
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user, index) => (
                    <tr key={user.id} style={{
                      borderBottom: index < filtered.length - 1
                        ? '1px solid var(--border)' : 'none',
                      background: user.is_banned ? '#fef2f2' : 'transparent'
                    }}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'var(--primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '13px',
                            fontWeight: '600',
                            flexShrink: 0
                          }}>
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <span style={{ fontSize: '14px', fontWeight: '500' }}>
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                        {user.email}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span className='badge' style={{
                          background: user.role === 'admin'
                            ? '#fef3c7'
                            : user.role === 'freelancer'
                            ? '#eff6ff'
                            : '#f0fdf4',
                          color: user.role === 'admin'
                            ? '#92400e'
                            : user.role === 'freelancer'
                            ? 'var(--primary)'
                            : '#166534',
                          fontSize: '11px'
                        }}>
                          {user.role}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: '13px' }}>
                        ⭐ {user.avg_rating || '0.0'}
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: '13px', color: 'var(--text-muted)' }}>
                        {formatDate(user.createdAt)}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span className='badge' style={{
                          background: user.is_banned ? '#fef2f2' : '#f0fdf4',
                          color: user.is_banned ? '#ef4444' : '#10b981',
                          fontSize: '11px'
                        }}>
                          {user.is_banned ? 'Banned' : 'Active'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => handleBan(user.id)}
                            className='btn'
                            style={{
                              fontSize: '12px',
                              padding: '6px 12px',
                              background: user.is_banned ? '#f0fdf4' : '#fef2f2',
                              color: user.is_banned ? '#10b981' : '#ef4444',
                              border: `1px solid ${user.is_banned ? '#86efac' : '#fecaca'}`
                            }}
                          >
                            {user.is_banned ? 'Unban' : 'Ban'}
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className='btn btn-danger'
                            style={{ fontSize: '12px', padding: '6px 12px' }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filtered.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: '40px',
                  color: 'var(--text-muted)',
                  fontSize: '14px'
                }}>
                  No users found
                </div>
              )}
            </div>
          </div>
        )}
    </AdminLayout>
  )
}

export default ManageUsers